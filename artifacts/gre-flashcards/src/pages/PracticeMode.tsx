import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Lightbulb,
  HelpCircle,
  Sparkles,
  RefreshCw,
  RotateCcw,
  Flag,
  ChevronRight,
  Trophy,
  BookOpenText,
  Pencil,
  ToggleLeft,
  Target,
  Brain,
  Lock,
  Languages,
  Plus,
  Check,
  ListChecks,
  Timer as TimerIcon,
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { type Word } from "@/data/words";
import { ENRICHMENT } from "@/data/enrichment";
import {
  type Question,
  type QuestionKind,
  type MCQQuestion,
  type FillBlankQuestion,
  type TrueFalseQuestion,
  type SynonymPairQuestion,
  buildAllForWord,
  isAnswerCorrect,
} from "@/lib/questionEngine";
import {
  rebuildSessionFromQuestions,
  DEFAULT_SESSION_CONFIG,
  type SessionConfig,
} from "@/lib/testSelection";

// ─────────────────────────────────────────────────────────────────────────────
// Props
// ─────────────────────────────────────────────────────────────────────────────

interface PracticeModeProps {
  onBack: () => void;
  onNavigate: (page: string, params?: Record<string, unknown>) => void;
  /**
   * Pre-built question list (preferred path — comes from the new Custom
   * Practice setup). When supplied, takes precedence over `wordIds`.
   */
  questions?: Question[];
  wordIds?: string[];
  sessionTitle?: string;
  /** Optional initial set of question kinds. Defaults to all (legacy path). */
  initialKinds?: QuestionKind[];
  /** Behavior toggles forwarded from Custom Practice setup. */
  sessionConfig?: SessionConfig;
}

// ─── Question kind metadata for the toolbar ────────────────────────────────

const KIND_META: Record<
  QuestionKind,
  { label: string; short: string; icon: React.ReactNode }
> = {
  "word-to-def": {
    label: "Word → Definition",
    short: "Word → Def",
    icon: <BookOpenText size={13} />,
  },
  "def-to-word": {
    label: "Definition → Word",
    short: "Def → Word",
    icon: <Target size={13} />,
  },
  "fill-blank": {
    label: "Fill in the Blank",
    short: "Fill blank",
    icon: <Pencil size={13} />,
  },
  "synonym-mcq": {
    label: "Synonym",
    short: "Synonym",
    icon: <Sparkles size={13} />,
  },
  "antonym-mcq": {
    label: "Antonym",
    short: "Antonym",
    icon: <RefreshCw size={13} />,
  },
  "synonym-pair": {
    label: "Select All Synonyms",
    short: "Pair",
    icon: <ListChecks size={13} />,
  },
  "tf-definition": {
    label: "T/F · Definition",
    short: "T/F Def",
    icon: <ToggleLeft size={13} />,
  },
  "tf-synonym": {
    label: "T/F · Synonym",
    short: "T/F Syn",
    icon: <ToggleLeft size={13} />,
  },
  "tf-antonym": {
    label: "T/F · Antonym",
    short: "T/F Ant",
    icon: <ToggleLeft size={13} />,
  },
  "tf-arabic": {
    label: "T/F · Arabic",
    short: "T/F AR",
    icon: <Languages size={13} />,
  },
  // Tone questions are no longer surfaced via Custom Practice; the kind
  // remains in the engine for legacy callers but is never rendered here.
  "tf-tone": {
    label: "T/F · Tone",
    short: "T/F Tone",
    icon: <ToggleLeft size={13} />,
  },
};

/**
 * Active kinds for the legacy `wordIds` fallback path. Tone questions are
 * intentionally excluded — Custom Practice no longer surfaces them.
 */
const ALL_KINDS: QuestionKind[] = [
  "word-to-def",
  "def-to-word",
  "fill-blank",
  "synonym-mcq",
  "antonym-mcq",
  "synonym-pair",
  "tf-definition",
  "tf-synonym",
  "tf-antonym",
  "tf-arabic",
];

// ─── Confidence ────────────────────────────────────────────────────────────

type Confidence = "knew" | "guessed" | "forgot";

const CONFIDENCE_META: Record<
  Confidence,
  { label: string; description: string; tone: string }
> = {
  knew: {
    label: "I knew it",
    description: "Confident — keep this gap wide.",
    tone:
      "border-emerald-300 dark:border-emerald-500/50 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-800 dark:text-emerald-200 hover:bg-emerald-100 dark:hover:bg-emerald-500/20",
  },
  guessed: {
    label: "I guessed",
    description: "Lucky — show me again sooner.",
    tone:
      "border-amber-300 dark:border-amber-500/50 bg-amber-50 dark:bg-amber-500/10 text-amber-800 dark:text-amber-200 hover:bg-amber-100 dark:hover:bg-amber-500/20",
  },
  forgot: {
    label: "I forgot it",
    description: "Reset — review this one soon.",
    tone:
      "border-rose-300 dark:border-rose-500/50 bg-rose-50 dark:bg-rose-500/10 text-rose-800 dark:text-rose-200 hover:bg-rose-100 dark:hover:bg-rose-500/20",
  },
};

/** Map (confidence + correctness) → SM-2 quality. */
function confidenceToQuality(conf: Confidence, correct: boolean): number {
  if (conf === "knew") return correct ? 5 : 2;
  if (conf === "guessed") return correct ? 3 : 0;
  return 0; // forgot
}

// ─── Per-question state ────────────────────────────────────────────────────

interface ResponseState {
  /** Final response (after retries). null = unanswered. Arrays are used for synonym-pair. */
  response: string | boolean | string[] | null;
  /** Was the FIRST attempt correct? */
  firstCorrect: boolean | null;
  /** Was the FINAL response correct? */
  finalCorrect: boolean | null;
  /** Wrong choices the user has tried (for MCQ retry pruning). */
  wrongTried: string[];
  /** Was a hint revealed for this question? */
  hintShown: boolean;
  /** Did the user click "I don't know"? */
  iDontKnow: boolean;
  /** Was the user's confidence rating recorded? */
  confidence: Confidence | null;
  /** Was this word added to difficult words via the button? */
  markedDifficult: boolean;
}

const EMPTY_RESPONSE: ResponseState = {
  response: null,
  firstCorrect: null,
  finalCorrect: null,
  wrongTried: [],
  hintShown: false,
  iDontKnow: false,
  confidence: null,
  markedDifficult: false,
};

// ─── Question generation ───────────────────────────────────────────────────

function buildQueue(words: Word[], kinds: QuestionKind[]): Question[] {
  if (words.length === 0 || kinds.length === 0) return [];
  const out: Question[] = [];
  // Round-robin: try kinds in rotating order so the session stays varied.
  for (let i = 0; i < words.length; i++) {
    const w = words[i];
    const rotated = [
      ...kinds.slice(i % kinds.length),
      ...kinds.slice(0, i % kinds.length),
    ];
    const candidates = buildAllForWord(w, { pool: words, include: rotated });
    if (candidates.length === 0) continue;
    // Take the first kind that produced a question (preserves the rotation).
    const ordered = rotated
      .map((k) => candidates.find((q) => q.kind === k))
      .filter(Boolean) as Question[];
    if (ordered[0]) out.push(ordered[0]);
  }
  return out;
}

function uniqId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

// ─── Main component ────────────────────────────────────────────────────────

export default function PracticeMode({
  onBack,
  questions,
  wordIds,
  sessionTitle,
  initialKinds,
  sessionConfig,
}: PracticeModeProps) {
  const { words, updateWord, markWordReviewed } = useApp();
  const config: SessionConfig = sessionConfig ?? DEFAULT_SESSION_CONFIG;

  const usingPrebuiltQueue = Array.isArray(questions) && questions.length > 0;

  // Session words — used by the legacy `wordIds` queue builder and by the
  // wrong-rationale helper so it can look up other words by definition.
  const sessionWords = useMemo<Word[]>(() => {
    if (usingPrebuiltQueue) {
      const seen = new Set<string>();
      const out: Word[] = [];
      for (const q of questions!) {
        if (seen.has(q.word.id)) continue;
        seen.add(q.word.id);
        out.push(q.word);
      }
      return out;
    }
    if (!wordIds || wordIds.length === 0) return words.slice(0, 20);
    const byId = new Map(words.map((w) => [w.id, w]));
    return wordIds.map((id) => byId.get(id)).filter(Boolean) as Word[];
  }, [usingPrebuiltQueue, questions, wordIds, words]);

  // For the legacy wordIds path the user used to flip kinds via a chip
  // toolbar. Kinds are now chosen up-front in Test Selection, so we just keep
  // the state as a default-all set used by `buildQueue`.
  const [selectedKinds] = useState<Set<QuestionKind>>(
    () => new Set(initialKinds && initialKinds.length > 0 ? initialKinds : ALL_KINDS),
  );

  // Bump this when the user wants a fresh queue (restart-with-wrong-only, etc).
  const [queueSeed, setQueueSeed] = useState<string>(uniqId());
  // Optional override that replaces the queue (used by "Retry wrong only").
  const [queueOverride, setQueueOverride] = useState<Question[] | null>(null);

  const queue = useMemo<Question[]>(() => {
    if (queueOverride) return queueOverride;
    if (usingPrebuiltQueue) return questions!;
    return buildQueue(
      sessionWords,
      Array.from(selectedKinds).filter((k) => ALL_KINDS.includes(k)),
    );
    // queueSeed is included intentionally to allow forced rebuilds
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    queueOverride,
    usingPrebuiltQueue,
    questions,
    sessionWords,
    selectedKinds,
    queueSeed,
  ]);

  const [currentIdx, setCurrentIdx] = useState(0);
  const [responses, setResponses] = useState<Record<string, ResponseState>>({});
  const [finished, setFinished] = useState(false);

  // If the queue shrinks, clamp the cursor.
  useEffect(() => {
    setCurrentIdx((i) => Math.min(i, Math.max(0, queue.length - 1)));
  }, [queue.length]);

  const currentQ = queue[currentIdx];
  const currentResponse = currentQ
    ? (responses[currentQ.id] ?? EMPTY_RESPONSE)
    : EMPTY_RESPONSE;

  const setResponse = useCallback(
    (qid: string, updater: (prev: ResponseState) => ResponseState) => {
      setResponses((prev) => ({
        ...prev,
        [qid]: updater(prev[qid] ?? EMPTY_RESPONSE),
      }));
    },
    [],
  );

  // ─── Answer handler (immediate feedback) ─────────────────────────────────

  const submitAnswer = useCallback(
    (q: Question, value: string | boolean | string[]) => {
      const correct = isAnswerCorrect(q, value);
      // Synonym-pair is one-shot — there is no meaningful retry once the user
      // submits their full selection.
      if (q.kind === "synonym-pair") {
        setResponse(q.id, (prev) => {
          if (prev.finalCorrect !== null) return prev;
          return {
            ...prev,
            response: value,
            firstCorrect: correct,
            finalCorrect: correct,
          };
        });
        return;
      }
      const tracked = Array.isArray(value)
        ? value.join("|")
        : String(value);
      setResponse(q.id, (prev) => {
        // Already finalized — no-op.
        if (prev.finalCorrect !== null && prev.iDontKnow === false) return prev;
        // Already wrong-once but retry path:
        if (prev.firstCorrect === false && !correct) {
          return {
            ...prev,
            response: value,
            wrongTried: prev.wrongTried.includes(tracked)
              ? prev.wrongTried
              : [...prev.wrongTried, tracked],
          };
        }
        if (prev.firstCorrect === false && correct) {
          return {
            ...prev,
            response: value,
            finalCorrect: true,
          };
        }
        // First attempt
        return {
          ...prev,
          response: value,
          firstCorrect: correct,
          finalCorrect: correct ? true : null,
          wrongTried: correct ? prev.wrongTried : [tracked],
        };
      });
    },
    [setResponse],
  );

  // ─── I don't know ────────────────────────────────────────────────────────

  const iDontKnow = useCallback(
    (q: Question) => {
      setResponse(q.id, (prev) => ({
        ...prev,
        iDontKnow: true,
        firstCorrect: prev.firstCorrect ?? false,
        finalCorrect: false,
      }));
    },
    [setResponse],
  );

  // ─── Retry (clear final state, keep wrongTried) ──────────────────────────

  const retry = useCallback(
    (q: Question) => {
      setResponse(q.id, (prev) => ({
        ...prev,
        response: null,
        finalCorrect: null,
        // keep firstCorrect=false, keep wrongTried so we can grey out tried options
      }));
    },
    [setResponse],
  );

  // ─── Confidence rating + SRS write-back ──────────────────────────────────

  const recordConfidence = useCallback(
    (q: Question, conf: Confidence) => {
      const r = responses[q.id] ?? EMPTY_RESPONSE;
      const finalCorrect =
        r.finalCorrect ?? r.firstCorrect ?? false;
      const quality = confidenceToQuality(conf, finalCorrect);
      markWordReviewed(q.word.id, quality, {
        confidence: conf,
        questionKind: q.kind,
      });
      setResponse(q.id, (prev) => ({ ...prev, confidence: conf }));
    },
    [markWordReviewed, responses, setResponse],
  );

  // ─── Mark difficult ──────────────────────────────────────────────────────

  const addToDifficult = useCallback(
    (q: Question) => {
      // Bump difficulty up so the word qualifies for `isDifficultWord` (>=3)
      // and the difficult-words filter / preset.
      updateWord(q.word.id, {
        difficulty: Math.max(q.word.difficulty ?? 0, 5),
      });
      setResponse(q.id, (prev) => ({ ...prev, markedDifficult: true }));
    },
    [updateWord, setResponse],
  );

  // ─── Navigation ──────────────────────────────────────────────────────────

  const goNext = useCallback(() => {
    if (currentIdx >= queue.length - 1) {
      setFinished(true);
    } else {
      setCurrentIdx((i) => i + 1);
    }
  }, [currentIdx, queue.length]);

  const restart = useCallback(() => {
    setResponses({});
    setCurrentIdx(0);
    setFinished(false);
    setQueueOverride(null);
    setQueueSeed(uniqId());
  }, []);

  /** Re-run only the questions the user got wrong / skipped. */
  const retryWrongOnly = useCallback(() => {
    const wrong: Question[] = [];
    for (const q of queue) {
      const r = responses[q.id];
      if (!r) continue;
      const finalCorrect = r.finalCorrect === true;
      if (!finalCorrect) wrong.push(q);
    }
    if (wrong.length === 0) return;
    const fresh = rebuildSessionFromQuestions(wrong, words, true);
    if (fresh.length === 0) return;
    setQueueOverride(fresh);
    setResponses({});
    setCurrentIdx(0);
    setFinished(false);
  }, [queue, responses, words]);

  /** Re-enter the session as a read-only review of every question. */
  const reviewIncorrect = useCallback(() => {
    setFinished(false);
    // Jump to the first wrong/skipped question if any, otherwise to start.
    const firstWrongIdx = queue.findIndex((q) => {
      const r = responses[q.id];
      return r && r.finalCorrect !== true;
    });
    setCurrentIdx(firstWrongIdx >= 0 ? firstWrongIdx : 0);
  }, [queue, responses]);

  // ─── Stats for the header ────────────────────────────────────────────────

  const stats = useMemo(() => {
    let answered = 0;
    let correct = 0;
    let firstTryCorrect = 0;
    for (const q of queue) {
      const r = responses[q.id];
      if (!r) continue;
      if (r.finalCorrect !== null || r.iDontKnow) answered++;
      if (r.finalCorrect) correct++;
      if (r.firstCorrect) firstTryCorrect++;
    }
    return { answered, correct, firstTryCorrect, total: queue.length };
  }, [queue, responses]);

  // ─── Empty-state guards ──────────────────────────────────────────────────

  if (sessionWords.length === 0) {
    return (
      <Shell onBack={onBack} title={sessionTitle ?? "Practice"} stats={null}>
        <EmptyCard
          title="No words in this session"
          body="Head back to the Test Center and pick a Quick Practice preset or a Custom selection."
        />
      </Shell>
    );
  }

  if (queue.length === 0) {
    return (
      <Shell onBack={onBack} title={sessionTitle ?? "Practice"} stats={null}>
        <EmptyCard
          title="No questions can be built from these words"
          body="Head back to Test Selection and pick at least one question type with available questions."
        />
      </Shell>
    );
  }

  // ─── End-of-session summary ──────────────────────────────────────────────

  if (finished) {
    return (
      <Shell
        onBack={onBack}
        title={sessionTitle ?? "Practice"}
        stats={stats}
      >
        <SessionSummary
          stats={stats}
          queue={queue}
          responses={responses}
          onRestart={restart}
          onReview={reviewIncorrect}
          onRetryWrong={retryWrongOnly}
          onExit={onBack}
        />
      </Shell>
    );
  }

  // ─── Active question ─────────────────────────────────────────────────────

  return (
    <Shell
      onBack={onBack}
      title={sessionTitle ?? "Practice"}
      stats={stats}
      showTimer={config.showTimer}
      timerActive={!finished}
    >
      <ProgressBar current={currentIdx + 1} total={queue.length} />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQ!.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.18 }}
        >
          <QuestionCard
            q={currentQ!}
            response={currentResponse}
            pool={sessionWords}
            showHints={config.showHints}
            confidenceRating={config.confidenceRating}
            onAnswer={(v) => submitAnswer(currentQ!, v)}
            onRetry={() => retry(currentQ!)}
            onIDontKnow={() => iDontKnow(currentQ!)}
            onAddDifficult={() => addToDifficult(currentQ!)}
            onConfidence={(c) => recordConfidence(currentQ!, c)}
            onHint={() =>
              setResponse(currentQ!.id, (prev) => ({
                ...prev,
                hintShown: true,
              }))
            }
            onNext={goNext}
            isLast={currentIdx === queue.length - 1}
          />
        </motion.div>
      </AnimatePresence>
    </Shell>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Shell — header + toolbar + content frame
// ─────────────────────────────────────────────────────────────────────────────

function Shell({
  onBack,
  title,
  stats,
  toolbar,
  children,
  showTimer,
  timerActive,
}: {
  onBack: () => void;
  title: string;
  stats: {
    answered: number;
    correct: number;
    total: number;
    firstTryCorrect: number;
  } | null;
  toolbar?: React.ReactNode;
  children: React.ReactNode;
  showTimer?: boolean;
  timerActive?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-[1000px] mx-auto px-6 py-6 space-y-5"
    >
      <header className="rounded-2xl border border-border bg-brand-gradient-soft px-5 py-3 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
          <div className="min-w-0">
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors mb-1"
            >
              <ArrowLeft size={14} />
              Back
            </button>
            <div className="text-[10px] font-extrabold uppercase tracking-wider text-brand-gradient">
              Practice Mode
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold leading-tight text-foreground mt-0.5 truncate">
              {title}
            </h1>
          </div>
          <div className="flex items-center gap-2 text-xs flex-wrap sm:justify-end w-full sm:w-auto">
            {showTimer && <SessionTimer running={Boolean(timerActive)} />}
            {stats && (
              <>
                <StatChip
                  label="Done"
                  value={`${stats.answered}/${stats.total}`}
                />
                <StatChip
                  label="Correct"
                  value={`${stats.correct}`}
                  tone="emerald"
                />
                <StatChip
                  label="First-try"
                  value={`${stats.firstTryCorrect}`}
                  tone="amber"
                />
              </>
            )}
          </div>
        </div>
      </header>

      {toolbar}

      {children}
    </motion.div>
  );
}

function SessionTimer({ running }: { running: boolean }) {
  const [start] = useState(() => Date.now());
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [running]);
  const elapsed = Math.max(0, Math.floor((now - start) / 1000));
  const mm = String(Math.floor(elapsed / 60)).padStart(2, "0");
  const ss = String(elapsed % 60).padStart(2, "0");
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-card border border-border text-foreground font-extrabold text-[11px] tabular-nums">
      <TimerIcon size={12} className="text-orange-500" />
      {mm}:{ss}
    </span>
  );
}

function StatChip({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: "emerald" | "amber";
}) {
  const toneClass =
    tone === "emerald"
      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300"
      : tone === "amber"
        ? "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300"
        : "bg-card border border-border text-foreground";
  return (
    <span
      className={`px-2.5 py-1 rounded-full font-extrabold text-[11px] ${toneClass}`}
    >
      <span className="opacity-60 mr-1">{label}</span>
      {value}
    </span>
  );
}

function ProgressBar({ current, total }: { current: number; total: number }) {
  const safeTotal = Math.max(1, total);
  const safeCurrent = Math.max(0, Math.min(current, safeTotal));
  // Visualise "you have completed N of M" using a 1-indexed current.
  const pct = ((safeCurrent - 1) / safeTotal) * 100;
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-[11px] font-extrabold">
        <span className="uppercase tracking-wider text-muted-foreground">
          Progress
        </span>
        <span className="tabular-nums text-foreground">
          {safeCurrent}
          <span className="text-muted-foreground"> / {safeTotal}</span>
        </span>
      </div>
      <div className="h-2.5 w-full bg-muted/70 rounded-full overflow-hidden">
        <div
          className="h-full bg-brand-gradient rounded-full transition-all duration-300 ease-out"
          style={{ width: `${Math.max(0, Math.min(100, pct))}%` }}
        />
      </div>
    </div>
  );
}

function EmptyCard({ title, body }: { title: string; body: string }) {
  return (
    <section className="rounded-2xl border border-dashed border-border bg-card/60 p-10 text-center">
      <h2 className="text-base font-extrabold text-foreground">{title}</h2>
      <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">
        {body}
      </p>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Question card (dispatches by kind)
// ─────────────────────────────────────────────────────────────────────────────

interface QuestionCardProps {
  q: Question;
  response: ResponseState;
  pool: Word[];
  /** When false the Hint button is hidden. Defaults to true. */
  showHints?: boolean;
  /** When false the post-answer confidence picker is hidden. Defaults to true. */
  confidenceRating?: boolean;
  onAnswer: (value: string | boolean | string[]) => void;
  onRetry: () => void;
  onIDontKnow: () => void;
  onAddDifficult: () => void;
  onConfidence: (c: Confidence) => void;
  onHint: () => void;
  onNext: () => void;
  isLast: boolean;
}

function QuestionCard(props: QuestionCardProps) {
  const { q, response } = props;
  const isAnswered =
    response.finalCorrect !== null || response.iDontKnow === true;
  const allowRetry =
    !isAnswered && response.firstCorrect === false && !response.iDontKnow;

  return (
    <article className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
      {/* 1. Top metadata row */}
      <CardMetaRow q={q} />

      {/* 2. Prompt area */}
      <div className="px-5 sm:px-6 pt-4">
        <PromptBlock q={q} />
      </div>

      {/* 3. Answer area (per-type UI untouched) */}
      <div className="px-5 sm:px-6 pt-5">
        <AnswerArea {...props} />
      </div>

      {/* Hint reveal */}
      {response.hintShown && !isAnswered && (
        <div className="px-5 sm:px-6 pt-3">
          <HintBlock q={q} />
        </div>
      )}

      {/* 4. Action / helper row (pre-answer) */}
      {!isAnswered && (
        <div className="px-5 sm:px-6 py-4 mt-1 border-t border-border bg-muted/30 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            {props.showHints !== false && (
              <button
                type="button"
                onClick={props.onHint}
                disabled={response.hintShown}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-amber-50 dark:bg-amber-500/10 text-amber-800 dark:text-amber-200 border border-amber-200 dark:border-amber-500/40 hover:bg-amber-100 dark:hover:bg-amber-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Lightbulb size={13} />
                {response.hintShown ? "Hint shown" : "Hint"}
              </button>
            )}
            <button
              type="button"
              onClick={props.onIDontKnow}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-card text-foreground/80 border border-border hover:bg-muted/70 transition-colors"
            >
              <HelpCircle size={13} />
              I don&apos;t know
            </button>
          </div>
          {allowRetry ? (
            <span className="text-[11px] text-amber-700 dark:text-amber-300 font-bold">
              Try once more — pick a different option.
            </span>
          ) : (
            <span className="text-[11px] text-muted-foreground">
              Pick an answer to see immediate feedback.
            </span>
          )}
        </div>
      )}

      {/* 5. Feedback area (unchanged) */}
      {isAnswered && (
        <div className="border-t border-border">
          <FeedbackPanel {...props} />
        </div>
      )}
    </article>
  );
}

// ─── Shared card meta row (type pill + source meta) ────────────────────────

function CardMetaRow({ q }: { q: Question }) {
  const meta = KIND_META[q.kind];
  return (
    <div className="px-5 sm:px-6 pt-5 pb-1 flex items-center justify-between gap-3">
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-gradient-soft text-foreground text-[11px] font-extrabold border border-border/60">
        <span className="text-orange-600 dark:text-orange-300 flex items-center">
          {meta.icon}
        </span>
        <span className="tracking-wide">{meta.label}</span>
      </span>
      <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-muted-foreground">
        <span className="px-1.5 py-0.5 rounded-md bg-muted text-foreground/70 tabular-nums">
          M{q.word.day}
        </span>
        <span className="opacity-50">·</span>
        <span className="px-1.5 py-0.5 rounded-md bg-muted text-foreground/70 tabular-nums">
          S{q.word.group}
        </span>
        <span className="opacity-50">·</span>
        <span className="italic text-muted-foreground">{q.word.pos}</span>
      </span>
    </div>
  );
}

// ─── Prompt rendering per kind ─────────────────────────────────────────────

function PromptBlock({ q }: { q: Question }) {
  if (q.kind === "fill-blank") {
    const fb = q as FillBlankQuestion;
    return (
      <>
        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          {q.prompt}
        </p>
        <p className="mt-2 text-lg sm:text-xl font-bold text-foreground leading-relaxed">
          {fb.sentence}
        </p>
      </>
    );
  }
  if (
    q.kind === "tf-definition" ||
    q.kind === "tf-synonym" ||
    q.kind === "tf-antonym" ||
    q.kind === "tf-arabic"
  ) {
    const tf = q as TrueFalseQuestion;
    return (
      <>
        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          True or False?
        </p>
        <p className="mt-2 text-lg sm:text-xl font-bold text-foreground leading-relaxed">
          {tf.statement}
        </p>
      </>
    );
  }
  if (q.kind === "synonym-pair") {
    const sp = q as SynonymPairQuestion;
    return (
      <>
        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Select all synonyms of
        </p>
        <p className="mt-2 text-lg sm:text-xl font-bold text-foreground leading-relaxed">
          {sp.word.word}
        </p>
      </>
    );
  }
  // MCQ — first line of prompt is the question, second (if any) is a quoted def
  const lines = q.prompt.split("\n");
  return (
    <>
      <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
        {lines[0]}
      </p>
      {lines.slice(1).map((line, i) => (
        <p
          key={i}
          className="mt-2 text-lg sm:text-xl font-bold text-foreground leading-relaxed"
        >
          {line.replace(/^"|"$/g, "")}
        </p>
      ))}
    </>
  );
}

// ─── Answer area ───────────────────────────────────────────────────────────

function AnswerArea(props: QuestionCardProps) {
  const { q, response, onAnswer } = props;
  const isAnswered =
    response.finalCorrect !== null || response.iDontKnow === true;

  if (
    q.kind === "tf-definition" ||
    q.kind === "tf-synonym" ||
    q.kind === "tf-antonym" ||
    q.kind === "tf-arabic"
  ) {
    const tf = q as TrueFalseQuestion;
    const userPick =
      response.response === true
        ? "true"
        : response.response === false
          ? "false"
          : null;
    return (
      <div className="space-y-2.5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {(["true", "false"] as const).map((v) => {
            const value = v === "true";
            const tried = response.wrongTried.includes(String(value));
            const isUserPick = userPick === v;
            const isCorrectChoice = tf.answer === value;
            return (
              <ChoiceButton
                key={v}
                label={v === "true" ? "True" : "False"}
                size="lg"
                onClick={() => onAnswer(value)}
                disabled={isAnswered || (tried && !isUserPick)}
                state={
                  !isAnswered
                    ? tried
                      ? "wrong-tried"
                      : "default"
                    : isCorrectChoice
                      ? "correct"
                      : isUserPick
                        ? "wrong"
                        : "default"
                }
              />
            );
          })}
        </div>
        {isAnswered && userPick && (
          <TFAnswerSummary
            userPickedTrue={userPick === "true"}
            correctIsTrue={tf.answer === true}
          />
        )}
      </div>
    );
  }

  if (q.kind === "synonym-pair") {
    return <SynonymPairPicker {...props} />;
  }

  if (q.kind === "fill-blank") {
    return <FillBlankInput {...props} />;
  }

  // MCQ
  const mcq = q as MCQQuestion;
  const userPick =
    typeof response.response === "string" ? response.response : null;
  return (
    <div className="grid grid-cols-1 gap-2.5">
      {mcq.choices.map((choice) => {
        const tried = response.wrongTried.includes(choice);
        const isUserPick = userPick === choice;
        const isCorrectChoice = choice === mcq.correct;
        return (
          <ChoiceButton
            key={choice}
            label={choice}
            multiline
            onClick={() => onAnswer(choice)}
            disabled={isAnswered || (tried && !isUserPick)}
            state={
              !isAnswered
                ? tried
                  ? "wrong-tried"
                  : "default"
                : isCorrectChoice
                  ? "correct"
                  : isUserPick
                    ? "wrong"
                    : "default"
            }
          />
        );
      })}
    </div>
  );
}

function TFAnswerSummary({
  userPickedTrue,
  correctIsTrue,
}: {
  userPickedTrue: boolean;
  correctIsTrue: boolean;
}) {
  const isCorrect = userPickedTrue === correctIsTrue;
  if (isCorrect) return null;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
      <div className="rounded-lg border border-rose-200 dark:border-rose-500/40 bg-rose-50/60 dark:bg-rose-500/10 px-3 py-2">
        <div className="uppercase tracking-wider font-extrabold text-rose-700 dark:text-rose-300">
          Your answer
        </div>
        <div className="font-bold text-rose-900 dark:text-rose-100 mt-0.5">
          {userPickedTrue ? "True" : "False"}
        </div>
      </div>
      <div className="rounded-lg border border-emerald-200 dark:border-emerald-500/40 bg-emerald-50/60 dark:bg-emerald-500/10 px-3 py-2">
        <div className="uppercase tracking-wider font-extrabold text-emerald-700 dark:text-emerald-300">
          Correct answer
        </div>
        <div className="font-bold text-emerald-900 dark:text-emerald-100 mt-0.5">
          {correctIsTrue ? "True" : "False"}
        </div>
      </div>
    </div>
  );
}

function ChoiceButton({
  label,
  onClick,
  disabled,
  state,
  multiline,
  size = "md",
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  state: "default" | "selected" | "correct" | "wrong" | "wrong-tried";
  multiline?: boolean;
  size?: "md" | "lg";
}) {
  const cls =
    state === "correct"
      ? "border-emerald-400 dark:border-emerald-500/60 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-900 dark:text-emerald-100 shadow-sm shadow-emerald-100/50 dark:shadow-none"
      : state === "wrong"
        ? "border-rose-400 dark:border-rose-500/60 bg-rose-50 dark:bg-rose-500/10 text-rose-900 dark:text-rose-100 shadow-sm shadow-rose-100/50 dark:shadow-none"
        : state === "wrong-tried"
          ? "border-border bg-muted/60 text-muted-foreground line-through"
          : state === "selected"
            ? "border-orange-400 dark:border-orange-500/60 bg-orange-50 dark:bg-orange-500/10 text-orange-900 dark:text-orange-100 shadow-sm"
            : "border-border bg-card text-foreground hover:border-orange-300 hover:bg-orange-50/50 dark:hover:border-orange-500/40 dark:hover:bg-orange-500/5";
  const sizeCls =
    size === "lg"
      ? "px-4 py-4 sm:py-5 text-base sm:text-lg"
      : "px-3.5 py-3 text-sm";
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`w-full ${multiline ? "text-left" : "text-center"} ${sizeCls} rounded-xl border-2 font-bold transition-all duration-150 disabled:cursor-not-allowed ${cls}`}
    >
      <span
        className={`flex items-center gap-2 ${multiline ? "" : "justify-center"}`}
      >
        {state === "correct" && (
          <CheckCircle2
            size={size === "lg" ? 20 : 16}
            className="text-emerald-600 shrink-0"
          />
        )}
        {state === "wrong" && (
          <XCircle
            size={size === "lg" ? 20 : 16}
            className="text-rose-600 shrink-0"
          />
        )}
        {state === "selected" && (
          <Check
            size={size === "lg" ? 20 : 16}
            className="text-orange-600 shrink-0"
          />
        )}
        <span className="flex-1">{label}</span>
      </span>
    </button>
  );
}

function SynonymPairPicker(props: QuestionCardProps) {
  const { q, response, onAnswer } = props;
  const sp = q as SynonymPairQuestion;
  const isAnswered =
    response.finalCorrect !== null || response.iDontKnow === true;
  const finalSelection: string[] = Array.isArray(response.response)
    ? response.response
    : [];
  const correctSet = useMemo(
    () => new Set(sp.correctAnswers.map((c) => c.toLowerCase())),
    [sp.correctAnswers],
  );
  const [picked, setPicked] = useState<Set<string>>(() => new Set());

  // Reset on retry / new question.
  useEffect(() => {
    if (response.response === null) setPicked(new Set());
  }, [response.response, q.id]);

  const toggle = (choice: string) => {
    if (isAnswered) return;
    setPicked((prev) => {
      const next = new Set(prev);
      if (next.has(choice)) next.delete(choice);
      else next.add(choice);
      return next;
    });
  };

  const submit = () => {
    if (isAnswered) return;
    onAnswer(Array.from(picked));
  };

  return (
    <div className="space-y-3">
      {!isAnswered && (
        <p className="text-[11px] text-muted-foreground">
          Choose all that apply, then press Submit.
        </p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {sp.options.map((choice) => {
          const isPicked = isAnswered
            ? finalSelection
                .map((s) => s.toLowerCase())
                .includes(choice.toLowerCase())
            : picked.has(choice);
          const isCorrectChoice = correctSet.has(choice.toLowerCase());
          let state:
            | "default"
            | "correct"
            | "missed"
            | "wrong"
            | "picked" = "default";
          if (isAnswered) {
            if (isCorrectChoice && isPicked) state = "correct";
            else if (isCorrectChoice && !isPicked) state = "missed";
            else if (isPicked) state = "wrong";
          } else if (isPicked) {
            state = "picked";
          }
          const cls =
            state === "correct"
              ? "border-emerald-400 dark:border-emerald-500/60 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-900 dark:text-emerald-100 shadow-sm"
              : state === "missed"
                ? "border-emerald-400 border-dashed bg-emerald-50/40 dark:bg-emerald-500/5 text-emerald-900 dark:text-emerald-100"
                : state === "wrong"
                  ? "border-rose-400 dark:border-rose-500/60 bg-rose-50 dark:bg-rose-500/10 text-rose-900 dark:text-rose-100 shadow-sm"
                  : state === "picked"
                    ? "border-orange-400 dark:border-orange-500/60 bg-orange-50 dark:bg-orange-500/10 text-orange-900 dark:text-orange-100 shadow-sm"
                    : "border-border bg-card text-foreground hover:border-orange-300 hover:bg-orange-50/50 dark:hover:border-orange-500/40 dark:hover:bg-orange-500/5";
          return (
            <button
              key={choice}
              type="button"
              onClick={() => toggle(choice)}
              disabled={isAnswered}
              aria-pressed={isPicked}
              className={`w-full text-left px-3.5 py-3 rounded-xl border-2 text-sm font-bold transition-all duration-150 disabled:cursor-not-allowed ${cls}`}
            >
              <span className="flex items-center gap-2">
                {state === "correct" && (
                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                )}
                {state === "missed" && (
                  <CheckCircle2
                    size={16}
                    className="text-emerald-600/70 shrink-0"
                  />
                )}
                {state === "wrong" && (
                  <XCircle size={16} className="text-rose-600 shrink-0" />
                )}
                {state === "picked" && (
                  <Check size={16} className="text-orange-600 shrink-0" />
                )}
                <span className="flex-1">{choice}</span>
                {state === "missed" && (
                  <span className="ml-auto text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                    Missed
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>
      {!isAnswered && (
        <div className="flex items-center justify-between gap-2">
          <p className="text-[11px] text-muted-foreground">
            Selected{" "}
            <span className="font-extrabold text-foreground">
              {picked.size}
            </span>{" "}
            option{picked.size === 1 ? "" : "s"}
          </p>
          <button
            type="button"
            onClick={submit}
            disabled={picked.size === 0}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-extrabold btn-brand disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
          >
            Submit
            <ChevronRight size={14} />
          </button>
        </div>
      )}
    </div>
  );
}

function FillBlankInput(props: QuestionCardProps) {
  const { q, response, onAnswer } = props;
  const fb = q as FillBlankQuestion;
  const [text, setText] = useState<string>("");
  const isAnswered =
    response.finalCorrect !== null || response.iDontKnow === true;
  const allowRetry =
    !isAnswered && response.firstCorrect === false && !response.iDontKnow;
  const showInlineHint =
    props.showHints !== false && fb.hintSynonyms.length > 0;

  const inputRef = useRef<HTMLInputElement>(null);
  // Reset on retry / new question
  useEffect(() => {
    if (response.response === null) {
      setText("");
      inputRef.current?.focus();
    }
  }, [response.response, q.id]);

  const inputState = isAnswered
    ? response.finalCorrect
      ? "correct"
      : "wrong"
    : "default";
  const inputStateCls =
    inputState === "correct"
      ? "border-emerald-400 bg-emerald-50/40 dark:bg-emerald-500/10 text-emerald-900 dark:text-emerald-100"
      : inputState === "wrong"
        ? "border-rose-400 bg-rose-50/40 dark:bg-rose-500/10 text-rose-900 dark:text-rose-100"
        : "border-border bg-background text-foreground focus:border-orange-400 hover:border-orange-300";

  return (
    <div className="space-y-3">
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <input
            ref={inputRef}
            type="text"
            value={
              isAnswered && typeof response.response === "string"
                ? response.response
                : text
            }
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && text.trim() && !isAnswered) {
                onAnswer(text.trim());
              }
            }}
            disabled={isAnswered}
            placeholder="Type the missing word…"
            className={`w-full px-4 py-3.5 sm:py-4 rounded-xl border-2 text-base font-bold focus:outline-none transition-colors disabled:opacity-90 ${inputStateCls}`}
            autoFocus
          />
          {isAnswered && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2">
              {response.finalCorrect ? (
                <CheckCircle2 size={18} className="text-emerald-600" />
              ) : (
                <XCircle size={18} className="text-rose-600" />
              )}
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={() => text.trim() && onAnswer(text.trim())}
          disabled={isAnswered || text.trim().length === 0}
          className="inline-flex items-center justify-center gap-1.5 px-5 py-3.5 sm:py-4 rounded-xl text-sm font-extrabold btn-brand disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
        >
          {allowRetry ? "Try again" : "Submit"}
          <ChevronRight size={14} />
        </button>
      </div>

      {!isAnswered && showInlineHint && (
        <p className="text-[11px] text-muted-foreground">
          Synonyms hint:{" "}
          <span className="font-bold text-foreground/70">
            {fb.hintSynonyms.join(", ")}
          </span>
        </p>
      )}

      {isAnswered && (
        <FillBlankAnswerReveal
          sentence={fb.sentence}
          answer={fb.answer}
          correct={Boolean(response.finalCorrect)}
        />
      )}
    </div>
  );
}

function FillBlankAnswerReveal({
  sentence,
  answer,
  correct,
}: {
  sentence: string;
  answer: string;
  correct: boolean;
}) {
  // Replace the first run of underscores with the highlighted answer.
  const parts = sentence.split(/_{2,}/);
  return (
    <div className="rounded-xl border border-border bg-muted/30 px-4 py-3 space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">
          Sentence
        </span>
        <span
          className={`text-[10px] font-extrabold uppercase tracking-wider ${correct ? "text-emerald-700 dark:text-emerald-300" : "text-rose-700 dark:text-rose-300"}`}
        >
          Answer · {answer}
        </span>
      </div>
      <p className="text-sm sm:text-base text-foreground leading-relaxed">
        {parts.length > 1 ? (
          <>
            {parts[0]}
            <span
              className={`px-1.5 py-0.5 rounded-md font-extrabold ${correct ? "bg-emerald-100 text-emerald-900 dark:bg-emerald-500/20 dark:text-emerald-100" : "bg-orange-100 text-orange-900 dark:bg-orange-500/20 dark:text-orange-100"}`}
            >
              {answer}
            </span>
            {parts.slice(1).join("")}
          </>
        ) : (
          sentence
        )}
      </p>
    </div>
  );
}

// ─── Hint block ────────────────────────────────────────────────────────────

function HintBlock({ q }: { q: Question }) {
  const enrichment = ENRICHMENT[q.word.word.toLowerCase()];
  const lines: string[] = [];
  if (q.kind === "word-to-def" || q.kind === "tf-definition") {
    lines.push(
      `It's a ${q.word.pos}.`,
      `First letter: "${q.word.word[0].toUpperCase()}"`,
    );
    if (enrichment?.shortDef) lines.push(`Short hint: ${enrichment.shortDef}`);
  } else if (q.kind === "def-to-word") {
    lines.push(
      `Looking for a ${q.word.pos}.`,
      `Starts with "${q.word.word[0].toUpperCase()}".`,
    );
  } else if (q.kind === "fill-blank") {
    lines.push(
      `It's a ${q.word.pos}.`,
      `Starts with "${q.word.word[0].toUpperCase()}" and has ${q.word.word.length} letters.`,
    );
  } else if (q.kind === "synonym-mcq" || q.kind === "tf-synonym") {
    lines.push(`"${q.word.word}" means: ${q.word.definition}`);
  } else if (q.kind === "antonym-mcq" || q.kind === "tf-antonym") {
    lines.push(`"${q.word.word}" means: ${q.word.definition}`);
    lines.push(`Look for the OPPOSITE.`);
  } else if (q.kind === "tf-arabic") {
    lines.push(`"${q.word.word}" means: ${q.word.definition}`);
  } else if (q.kind === "synonym-pair") {
    const sp = q as SynonymPairQuestion;
    lines.push(`"${q.word.word}" means: ${q.word.definition}`);
    lines.push(
      `There ${sp.correctAnswers.length === 1 ? "is" : "are"} ${sp.correctAnswers.length} correct synonym${sp.correctAnswers.length === 1 ? "" : "s"} hiding among the options.`,
    );
  }
  if (enrichment?.mnemonic) lines.push(`Mnemonic: ${enrichment.mnemonic}`);

  return (
    <div className="rounded-xl border border-amber-200 dark:border-amber-500/40 bg-amber-50 dark:bg-amber-500/10 p-3.5">
      <div className="flex items-center gap-1.5 mb-1.5">
        <Lightbulb
          size={14}
          className="text-amber-600 dark:text-amber-400"
        />
        <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-800 dark:text-amber-200">
          Hint
        </span>
      </div>
      <ul className="space-y-1 text-sm text-amber-900 dark:text-amber-100">
        {lines.map((l, i) => (
          <li key={i}>· {l}</li>
        ))}
      </ul>
    </div>
  );
}

// ─── Feedback panel ────────────────────────────────────────────────────────

function FeedbackPanel(props: QuestionCardProps) {
  const {
    q,
    response,
    pool,
    onRetry,
    onAddDifficult,
    onConfidence,
    onNext,
    isLast,
    confidenceRating,
  } = props;
  const showConfidence = confidenceRating !== false;
  const finalCorrect =
    response.finalCorrect ?? response.firstCorrect ?? false;
  const iDontKnow = response.iDontKnow;
  const correctOnRetry =
    finalCorrect && response.firstCorrect === false && !iDontKnow;

  // For MCQ, find the rationale for the wrong choice the user picked.
  const wrongRationale = useMemo(
    () => buildWrongRationale(q, response, pool),
    [q, response, pool],
  );

  type BannerTone = "correct" | "incorrect" | "skipped";
  const bannerTone: BannerTone = iDontKnow
    ? "skipped"
    : finalCorrect
      ? "correct"
      : "incorrect";

  const bannerCls =
    bannerTone === "correct"
      ? "border-emerald-200 dark:border-emerald-500/40 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-800 dark:text-emerald-200"
      : bannerTone === "incorrect"
        ? "border-rose-200 dark:border-rose-500/40 bg-rose-50 dark:bg-rose-500/10 text-rose-800 dark:text-rose-200"
        : "border-amber-200 dark:border-amber-500/30 bg-amber-50/70 dark:bg-amber-500/10 text-amber-800 dark:text-amber-200";

  const bannerIcon =
    bannerTone === "correct" ? (
      <CheckCircle2 size={16} />
    ) : bannerTone === "incorrect" ? (
      <XCircle size={16} />
    ) : (
      <HelpCircle size={16} />
    );

  const bannerText =
    bannerTone === "skipped"
      ? "Skipped — here's the answer."
      : bannerTone === "correct"
        ? correctOnRetry
          ? "Correct on retry."
          : "Correct!"
        : "Incorrect — here's the right answer.";

  return (
    <div>
      {/* Body */}
      <div className="px-5 sm:px-6 py-4 space-y-3">
        {/* Compact result banner + correct answer row */}
        <div
          className={`rounded-xl border ${bannerCls} px-3.5 py-2.5 flex flex-wrap items-center justify-between gap-x-3 gap-y-1`}
        >
          <span className="inline-flex items-center gap-1.5 font-extrabold text-sm">
            {bannerIcon}
            {bannerText}
          </span>
          <CorrectAnswerLine q={q} tone={bannerTone} />
        </div>

        {wrongRationale && (
          <div className="rounded-xl border border-rose-200 dark:border-rose-500/40 bg-rose-50/60 dark:bg-rose-500/10 px-3.5 py-2.5">
            <div className="flex items-center gap-1.5 mb-0.5">
              <XCircle size={13} className="text-rose-600 dark:text-rose-400" />
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-rose-800 dark:text-rose-200">
                Why your answer was wrong
              </span>
            </div>
            <p className="text-[13px] leading-snug text-rose-900 dark:text-rose-100">
              {wrongRationale}
            </p>
          </div>
        )}

        {q.explanation && (
          <div className="rounded-xl border border-border bg-muted/40 px-3.5 py-2.5">
            <div className="flex items-center gap-1.5 mb-0.5">
              <Brain size={13} className="text-muted-foreground" />
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">
                Explanation
              </span>
            </div>
            <p className="text-[13px] leading-snug text-foreground/90">
              {q.explanation}
            </p>
          </div>
        )}

        <WordCard word={q.word} />

        {/* Retry — only after first wrong attempt, not after I-don't-know */}
        {response.firstCorrect === false &&
          !iDontKnow &&
          response.finalCorrect === null && (
            <button
              type="button"
              onClick={onRetry}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-extrabold bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-200 border border-amber-300 dark:border-amber-500/40 hover:bg-amber-200/60"
            >
              <RotateCcw size={13} />
              Try again
            </button>
          )}

        {/* Confidence + add to difficult + next — once finalized */}
        {(response.finalCorrect !== null || iDontKnow) && (
          <>
            {showConfidence && (
              <ConfidenceRow
                value={response.confidence}
                onPick={onConfidence}
              />
            )}

            <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-2 pt-1">
              <button
                type="button"
                onClick={onAddDifficult}
                disabled={response.markedDifficult}
                aria-pressed={response.markedDifficult}
                className={`inline-flex items-center justify-center sm:justify-start gap-1.5 px-3 py-2.5 rounded-xl text-xs font-extrabold border transition-colors disabled:cursor-not-allowed ${
                  response.markedDifficult
                    ? "bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-500/40"
                    : "bg-card text-foreground border-border hover:bg-muted/60 hover:border-rose-200 dark:hover:border-rose-500/40"
                }`}
              >
                {response.markedDifficult ? (
                  <>
                    <Check size={13} />
                    Added to difficult
                  </>
                ) : (
                  <>
                    <Plus size={13} />
                    Add to difficult words
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={onNext}
                className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-extrabold btn-brand"
              >
                {isLast ? "Finish session" : "Next question"}
                <ChevronRight size={14} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function CorrectAnswerLine({
  q,
  tone = "incorrect",
}: {
  q: Question;
  tone?: "correct" | "incorrect" | "skipped";
}) {
  let label = "Correct answer";
  let value = "";
  if (
    q.kind === "tf-definition" ||
    q.kind === "tf-synonym" ||
    q.kind === "tf-antonym" ||
    q.kind === "tf-arabic"
  ) {
    const tf = q as TrueFalseQuestion;
    value = tf.answer ? "True" : "False";
  } else if (q.kind === "fill-blank") {
    value = (q as FillBlankQuestion).answer;
  } else if (q.kind === "synonym-pair") {
    label = "Correct synonyms";
    value = (q as SynonymPairQuestion).correctAnswers.join(", ");
  } else {
    value = (q as MCQQuestion).correct;
  }

  const valueCls =
    tone === "correct"
      ? "text-emerald-900 dark:text-emerald-100"
      : tone === "incorrect"
        ? "text-rose-900 dark:text-rose-100"
        : "text-amber-900 dark:text-amber-100";

  const labelCls =
    tone === "correct"
      ? "text-emerald-700/80 dark:text-emerald-200/70"
      : tone === "incorrect"
        ? "text-rose-700/80 dark:text-rose-200/70"
        : "text-amber-700/80 dark:text-amber-200/70";

  return (
    <span className="text-[13px] leading-tight">
      <span className={`font-bold ${labelCls}`}>{label}:</span>{" "}
      <span className={`font-extrabold ${valueCls}`}>{value}</span>
    </span>
  );
}

function WordCard({ word }: { word: Word }) {
  return (
    <section className="rounded-xl border border-border bg-card px-4 py-3 space-y-1.5">
      {/* Top row: word + POS badge (left) · Arabic (right) */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <h4 className="text-base font-extrabold text-foreground truncate">
            {word.word}
          </h4>
          <span className="shrink-0 px-1.5 py-0.5 rounded-md bg-muted text-foreground/70 text-[10px] font-extrabold uppercase tracking-wider">
            {word.pos}
          </span>
        </div>
        {word.arabic && (
          <span
            className="text-sm font-bold text-muted-foreground truncate text-right"
            dir="rtl"
          >
            {word.arabic}
          </span>
        )}
      </div>

      {/* Definition */}
      <p className="text-[13px] leading-snug text-foreground/90">
        {word.definition}
      </p>

      {/* Example */}
      {word.examples?.[0] && (
        <p className="text-[12px] leading-snug text-muted-foreground italic">
          “{word.examples[0]}”
        </p>
      )}

      {/* Synonyms footer */}
      {word.synonyms?.length > 0 && (
        <p className="text-[11px] text-muted-foreground pt-0.5">
          <span className="font-extrabold uppercase tracking-wider text-foreground/60 mr-1">
            Synonyms
          </span>
          {word.synonyms.join(", ")}
        </p>
      )}
    </section>
  );
}

function ConfidenceRow({
  value,
  onPick,
}: {
  value: Confidence | null;
  onPick: (c: Confidence) => void;
}) {
  const OPTIONS: {
    key: Confidence;
    label: string;
    subtitle: string;
    base: string;
    active: string;
  }[] = [
    {
      key: "knew",
      label: "I knew it",
      subtitle: "Confident",
      base: "border-emerald-200 dark:border-emerald-500/40 text-emerald-800 dark:text-emerald-200 hover:bg-emerald-50 dark:hover:bg-emerald-500/10",
      active:
        "border-emerald-400 dark:border-emerald-500/70 bg-emerald-50 dark:bg-emerald-500/15 text-emerald-900 dark:text-emerald-100 shadow-sm",
    },
    {
      key: "guessed",
      label: "I guessed",
      subtitle: "Not sure",
      base: "border-amber-200 dark:border-amber-500/40 text-amber-800 dark:text-amber-200 hover:bg-amber-50 dark:hover:bg-amber-500/10",
      active:
        "border-amber-400 dark:border-amber-500/70 bg-amber-50 dark:bg-amber-500/15 text-amber-900 dark:text-amber-100 shadow-sm",
    },
    {
      key: "forgot",
      label: "I forgot it",
      subtitle: "Needs review",
      base: "border-rose-200 dark:border-rose-500/40 text-rose-800 dark:text-rose-200 hover:bg-rose-50 dark:hover:bg-rose-500/10",
      active:
        "border-rose-400 dark:border-rose-500/70 bg-rose-50 dark:bg-rose-500/15 text-rose-900 dark:text-rose-100 shadow-sm",
    },
  ];
  return (
    <div className="rounded-xl border border-border bg-muted/30 px-3 py-2.5">
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">
          How did that feel?
        </span>
        <span className="text-[10px] text-muted-foreground">Optional</span>
      </div>
      <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
        {OPTIONS.map((o) => {
          const active = value === o.key;
          return (
            <button
              key={o.key}
              type="button"
              onClick={() => onPick(o.key)}
              aria-pressed={active}
              className={`rounded-xl border-2 px-2 py-2 text-center transition-all duration-150 bg-card ${active ? o.active : o.base}`}
            >
              <div className="text-[12px] sm:text-sm font-extrabold flex items-center justify-center gap-1">
                {active && <CheckCircle2 size={13} className="shrink-0" />}
                <span className="truncate">{o.label}</span>
              </div>
              <div className="text-[10px] opacity-80 mt-0.5 truncate">
                {o.subtitle}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Wrong-answer rationale builder ────────────────────────────────────────

function buildWrongRationale(
  q: Question,
  r: ResponseState,
  pool: Word[],
): string | null {
  if (r.iDontKnow) return null;
  if (r.firstCorrect !== false) return null;

  // Pull the user's *first* wrong choice from wrongTried; fall back to response.
  const wrong = r.wrongTried[0];
  if (!wrong) return null;

  const norm = wrong.toLowerCase().trim();

  if (q.kind === "word-to-def") {
    // Choice was a definition string. Find which word's definition that is.
    const w = pool.find((x) => x.definition.toLowerCase().trim() === norm);
    if (w) {
      return `That's the definition of "${w.word}" — not "${q.word.word}".`;
    }
  }
  if (q.kind === "def-to-word") {
    const w = pool.find((x) => x.word.toLowerCase().trim() === norm);
    if (w) {
      return `"${w.word}" means: ${w.definition}`;
    }
  }
  if (q.kind === "synonym-mcq") {
    // Was the wrong choice a synonym of some other word in the pool?
    const w = pool.find((x) =>
      (x.synonyms ?? []).some((s) => s.toLowerCase().trim() === norm),
    );
    if (w && w.id !== q.word.id) {
      return `"${wrong}" is a synonym of "${w.word}" — not of "${q.word.word}".`;
    }
    return `"${wrong}" doesn't mean the same thing as "${q.word.word}".`;
  }
  if (q.kind === "antonym-mcq") {
    // If the choice is one of the target's own synonyms, flag that.
    if ((q.word.synonyms ?? []).some((s) => s.toLowerCase().trim() === norm)) {
      return `"${wrong}" is actually a synonym of "${q.word.word}" — the opposite of what we want.`;
    }
    const w = pool.find((x) =>
      (x.synonyms ?? []).some((s) => s.toLowerCase().trim() === norm),
    );
    if (w) {
      return `"${wrong}" relates to "${w.word}" and isn't an opposite of "${q.word.word}".`;
    }
    return `"${wrong}" isn't an opposite of "${q.word.word}".`;
  }
  if (q.kind === "fill-blank") {
    return `"${wrong}" doesn't fit the sentence. The blank is filled by "${q.word.word}".`;
  }
  if (
    q.kind === "tf-definition" ||
    q.kind === "tf-synonym" ||
    q.kind === "tf-antonym" ||
    q.kind === "tf-arabic"
  ) {
    const tf = q as TrueFalseQuestion;
    return tf.answer
      ? `The statement was true — the candidate really does match "${q.word.word}".`
      : `The statement was false — the candidate doesn't match "${q.word.word}".`;
  }
  if (q.kind === "synonym-pair") {
    const sp = q as SynonymPairQuestion;
    const picked = Array.isArray(r.response) ? r.response : [];
    const correctSet = new Set(sp.correctAnswers.map((s) => s.toLowerCase()));
    const wrongPicks = picked.filter(
      (p) => !correctSet.has(p.toLowerCase()),
    );
    const missed = sp.correctAnswers.filter(
      (c) => !picked.map((p) => p.toLowerCase()).includes(c.toLowerCase()),
    );
    const parts: string[] = [];
    if (wrongPicks.length > 0) {
      parts.push(
        `${wrongPicks.length === 1 ? "This option isn't" : "These options aren't"} a synonym of "${q.word.word}": ${wrongPicks.join(", ")}.`,
      );
    }
    if (missed.length > 0) {
      parts.push(
        `${missed.length === 1 ? "You missed" : "You missed"}: ${missed.join(", ")}.`,
      );
    }
    return parts.length > 0 ? parts.join(" ") : null;
  }
  return null;
}

// ─────────────────────────────────────────────────────────────────────────────
// Session summary
// ─────────────────────────────────────────────────────────────────────────────

function SessionSummary({
  stats,
  queue,
  responses,
  onRestart,
  onReview,
  onRetryWrong,
  onExit,
}: {
  stats: { answered: number; correct: number; firstTryCorrect: number; total: number };
  queue: Question[];
  responses: Record<string, ResponseState>;
  onRestart: () => void;
  onReview: () => void;
  onRetryWrong: () => void;
  onExit: () => void;
}) {
  const accuracy =
    stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
  const firstTryAccuracy =
    stats.total > 0
      ? Math.round((stats.firstTryCorrect / stats.total) * 100)
      : 0;

  // Group review by word so users see per-word outcomes.
  const wordRows = useMemo(() => {
    const seen = new Set<string>();
    const rows: Array<{ word: Word; q: Question; r: ResponseState }> = [];
    for (const q of queue) {
      if (seen.has(q.word.id)) continue;
      seen.add(q.word.id);
      rows.push({
        word: q.word,
        q,
        r: responses[q.id] ?? EMPTY_RESPONSE,
      });
    }
    return rows;
  }, [queue, responses]);

  const wrongCount = wordRows.filter((row) => !row.r.finalCorrect).length;

  return (
    <div className="space-y-5">
      <section className="rounded-2xl border border-border bg-brand-gradient-soft p-6 shadow-sm text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-gradient mb-3 shadow-md">
          <Trophy size={26} className="text-white" strokeWidth={2.5} />
        </div>
        <h2 className="text-2xl font-extrabold text-foreground">
          Session complete
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          You finished {stats.total} question{stats.total === 1 ? "" : "s"}.
        </p>
        <div className="grid grid-cols-3 gap-3 mt-5 max-w-md mx-auto">
          <SummaryStat label="Accuracy" value={`${accuracy}%`} />
          <SummaryStat label="First-try" value={`${firstTryAccuracy}%`} />
          <SummaryStat
            label="To review"
            value={`${wrongCount}`}
            tone={wrongCount > 0 ? "rose" : "emerald"}
          />
        </div>

        <div className="flex flex-wrap justify-center gap-2 mt-5">
          {wrongCount > 0 && (
            <button
              type="button"
              onClick={onRetryWrong}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-extrabold btn-brand"
            >
              <RotateCcw size={14} />
              Retry wrong only ({wrongCount})
            </button>
          )}
          <button
            type="button"
            onClick={onRestart}
            className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-extrabold ${
              wrongCount > 0
                ? "bg-card text-foreground border border-border hover:bg-muted/60"
                : "btn-brand"
            }`}
          >
            <RefreshCw size={14} />
            Practice again
          </button>
          {wrongCount > 0 && (
            <button
              type="button"
              onClick={onReview}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-extrabold bg-card text-foreground border border-border hover:bg-muted/60"
            >
              <BookOpenText size={14} />
              Review incorrect
            </button>
          )}
          <button
            type="button"
            onClick={onExit}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-extrabold bg-muted text-foreground/80 hover:bg-muted/70"
          >
            <Flag size={14} />
            Exit
          </button>
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-card shadow-sm p-5">
        <h3 className="text-sm font-extrabold text-foreground mb-3">
          Per-word recap
        </h3>
        <ul className="divide-y divide-border">
          {wordRows.map((row) => {
            const tone = row.r.iDontKnow
              ? "text-slate-600"
              : row.r.finalCorrect
                ? row.r.firstCorrect
                  ? "text-emerald-600"
                  : "text-amber-600"
                : "text-rose-600";
            const label = row.r.iDontKnow
              ? "Skipped"
              : row.r.finalCorrect
                ? row.r.firstCorrect
                  ? "Correct"
                  : "Correct on retry"
                : "Incorrect";
            return (
              <li
                key={row.word.id}
                className="py-2.5 flex items-center justify-between gap-3"
              >
                <div className="min-w-0">
                  <div className="text-sm font-extrabold text-foreground truncate">
                    {row.word.word}
                  </div>
                  <div className="text-[11px] text-muted-foreground truncate">
                    {row.word.pos} · M{row.word.day}·S{row.word.group}
                    {row.r.markedDifficult && (
                      <span className="ml-2 text-rose-600 font-bold">
                        · marked difficult
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs font-extrabold shrink-0">
                  {row.r.confidence && (
                    <span className="text-[10px] text-muted-foreground font-bold">
                      {CONFIDENCE_META[row.r.confidence].label}
                    </span>
                  )}
                  <span className={tone}>{label}</span>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}

function SummaryStat({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: "emerald" | "rose";
}) {
  const valueClass =
    tone === "emerald"
      ? "text-emerald-600 dark:text-emerald-400"
      : tone === "rose"
        ? "text-rose-600 dark:text-rose-400"
        : "text-foreground";
  return (
    <div className="rounded-xl border border-border bg-card px-3 py-2.5">
      <div className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
      <div className={`text-xl font-extrabold mt-0.5 ${valueClass}`}>
        {value}
      </div>
    </div>
  );
}

// Re-export for convenience (lock icon used elsewhere if needed)
export { Lock };
