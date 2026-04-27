import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Flag,
  Clock,
  ListChecks,
  Send,
  RotateCcw,
  AlertTriangle,
  ChevronRight,
  Trophy,
  Target,
  Layers,
  Pencil,
  ToggleLeft,
  Sparkles,
  RefreshCw,
  BookOpenText,
  Languages,
  Smile,
  Hash,
  Eye,
  CheckSquare,
  Square,
  Award,
  TimerReset,
  Circle,
  ChevronLeft,
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { type Word } from "@/data/words";
import {
  type Question,
  type QuestionKind,
  type MCQQuestion,
  type FillBlankQuestion,
  type TrueFalseQuestion,
  buildAllForWord,
  isAnswerCorrect,
} from "@/lib/questionEngine";
import {
  type Scope,
  TOTAL_BELTS,
  BELT_NAMES,
  beltForMission,
  allBelts,
  selectByScope,
} from "@/lib/wordSelection";
import { shuffleArray } from "@/lib/srs";
import {
  type TestHistoryRecord,
  type TestQuestionRecord,
  addTestHistoryRecord,
  loadTestHistory,
} from "@/lib/storage";
import {
  accuracyByBelt,
  accuracyByKind,
  accuracyByMission,
  accuracyBySet,
  difficultWords,
  fastWrongAnswers,
  flattenHistory,
  mistakeWordsList,
  recommendedReview,
  rollupWordPerformance,
  slowCorrectAnswers,
  suggestedNextSession,
  weakestWords,
  type AccuracyBucket,
  type PacingEntry,
  type WordPerformance,
  type SuggestedSession,
} from "@/lib/testAnalytics";

// ─────────────────────────────────────────────────────────────────────────────
// Props & local types
// ─────────────────────────────────────────────────────────────────────────────

interface TestModeProps {
  onBack: () => void;
  onNavigate: (page: string, params?: Record<string, unknown>) => void;
}

type Phase = "setup" | "taking" | "review" | "results";

interface QuestionResult {
  q: Question;
  /** User's selected response (string for MCQ/fill-blank, boolean for T/F). */
  response: string | boolean | null;
  flagged: boolean;
  /** Cumulative time spent on this question, in ms. */
  timeSpentMs: number;
}

interface SourceState {
  scope: Scope;
}

const ALL_KINDS: QuestionKind[] = [
  "word-to-def",
  "def-to-word",
  "fill-blank",
  "synonym-mcq",
  "antonym-mcq",
  "tf-definition",
  "tf-synonym",
  "tf-antonym",
  "tf-arabic",
  "tf-tone",
];

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
  "tf-tone": {
    label: "T/F · Tone",
    short: "T/F Tone",
    icon: <Smile size={13} />,
  },
};

const QUESTION_COUNT_PRESETS = [10, 20, 30, 50] as const;

type TimeMode = "suggested" | "custom" | "none";

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

function formatClock(ms: number): string {
  const totalSec = Math.max(0, Math.floor(ms / 1000));
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function formatShortDuration(ms: number): string {
  if (ms < 1000) return "<1s";
  const totalSec = Math.round(ms / 1000);
  if (totalSec < 60) return `${totalSec}s`;
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return s === 0 ? `${m}m` : `${m}m ${s}s`;
}

function suggestedSecondsPerQuestion(kinds: Set<QuestionKind>): number {
  // Fill-blank takes longer than T/F. Estimate from selected mix.
  let sum = 0;
  let n = 0;
  kinds.forEach((k) => {
    if (k === "fill-blank") sum += 60;
    else if (k.startsWith("tf-")) sum += 25;
    else sum += 45;
    n++;
  });
  return n === 0 ? 45 : Math.round(sum / n);
}

/** Build a non-repeating round-robin queue. Same (word, kind) pair never repeats. */
function buildTestQueue(
  pool: Word[],
  kinds: QuestionKind[],
  count: number,
): Question[] {
  if (pool.length === 0 || kinds.length === 0 || count <= 0) return [];
  const kindSet = new Set(kinds);
  const wordsShuffled = shuffleArray(pool);
  // For each word, build all candidate questions in those kinds, then shuffle
  // the per-word list so kind order isn't predictable across words.
  const remaining: Question[][] = wordsShuffled.map((w) => {
    const all = buildAllForWord(w, { pool, include: kinds }).filter((q) =>
      kindSet.has(q.kind),
    );
    return shuffleArray(all);
  });

  const queue: Question[] = [];
  let pass = 0;
  // Each pass gives every word a chance to contribute its next question.
  while (queue.length < count) {
    let progressed = false;
    for (let i = 0; i < wordsShuffled.length && queue.length < count; i++) {
      const list = remaining[i];
      if (list.length > pass) {
        queue.push(list[pass]);
        progressed = true;
      }
    }
    if (!progressed) break;
    pass++;
  }
  return queue;
}

/** Compute upper bound for how many distinct (word, kind) questions we can build. */
function buildableCeiling(pool: Word[], kinds: QuestionKind[]): number {
  if (pool.length === 0 || kinds.length === 0) return 0;
  const kindSet = new Set(kinds);
  let total = 0;
  for (const w of pool) {
    const list = buildAllForWord(w, { pool, include: kinds }).filter((q) =>
      kindSet.has(q.kind),
    );
    total += list.length;
  }
  return total;
}

// ─────────────────────────────────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────────────────────────────────

export default function TestMode({ onBack, onNavigate }: TestModeProps) {
  const { words, markWordReviewed } = useApp();

  // Phase state machine
  const [phase, setPhase] = useState<Phase>("setup");

  // Setup state ─────────────────────────────────────────────
  // Default source = belt-level, all belts selected (comprehensive).
  const [source, setSource] = useState<SourceState>({
    scope: { kind: "belt", beltIds: allBelts() },
  });
  const [kinds, setKinds] = useState<Set<QuestionKind>>(
    () => new Set<QuestionKind>(ALL_KINDS),
  );
  const [numQuestions, setNumQuestions] = useState<number>(20);
  const [timeMode, setTimeMode] = useState<TimeMode>("suggested");
  const [customMinutes, setCustomMinutes] = useState<number>(15);

  // Live test state ─────────────────────────────────────────
  const [results, setResults] = useState<QuestionResult[]>([]);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [startedAtMs, setStartedAtMs] = useState<number | null>(null);
  const [endedAtMs, setEndedAtMs] = useState<number | null>(null);
  const [limitMs, setLimitMs] = useState<number | null>(null);
  const [nowMs, setNowMs] = useState<number>(() => Date.now());

  // Track when the user entered the current question, so we can attribute time.
  const enteredAtRef = useRef<number | null>(null);
  // Cache the count of source words for the live preview on the setup screen.
  const sourceWords = useMemo(
    () => selectByScope(words, source.scope),
    [words, source.scope],
  );

  // Human-readable label used in the test history record.
  const scopeLabel = useMemo(() => {
    const s = source.scope;
    if (s.kind === "all") return "All vocabulary";
    if (s.kind === "belt") {
      const ids = s.beltIds ?? [];
      if (ids.length === 0) return "No belts";
      if (ids.length === TOTAL_BELTS) return "All belts";
      if (ids.length === 1) return `${BELT_NAMES[ids[0] - 1]} Belt`;
      return `${ids.length} belts`;
    }
    if (s.kind === "mission") {
      const days = s.missionDays ?? [];
      if (days.length === 1) return `Mission ${days[0]}`;
      return `${days.length} missions`;
    }
    if (s.kind === "set") {
      const sets = s.sets ?? [];
      if (sets.length === 1) {
        const ref = sets[0];
        return `M${ref.day} · S${ref.group}`;
      }
      return `${sets.length} sets`;
    }
    return `Days ${s.fromDay}–${s.toDay}`;
  }, [source.scope]);

  const ceiling = useMemo(
    () => buildableCeiling(sourceWords, Array.from(kinds)),
    [sourceWords, kinds],
  );

  const effectiveCount = Math.min(numQuestions, ceiling);
  const canStart = effectiveCount > 0 && kinds.size > 0;

  // Suggested total time (when "suggested" mode is chosen).
  const suggestedSecPerQ = useMemo(() => suggestedSecondsPerQuestion(kinds), [
    kinds,
  ]);

  // Tick the clock once per second while taking the test (and on review).
  useEffect(() => {
    if (phase !== "taking" && phase !== "review") return;
    const id = window.setInterval(() => setNowMs(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [phase]);

  // Snapshot time spent on the current question whenever the index changes.
  const checkpointTime = useCallback(() => {
    if (enteredAtRef.current === null) return;
    const delta = Date.now() - enteredAtRef.current;
    enteredAtRef.current = Date.now();
    setResults((prev) => {
      if (currentIdx < 0 || currentIdx >= prev.length) return prev;
      const next = prev.slice();
      next[currentIdx] = {
        ...next[currentIdx],
        timeSpentMs: next[currentIdx].timeSpentMs + delta,
      };
      return next;
    });
  }, [currentIdx]);

  // When we navigate to a new question, attribute prior elapsed time, then
  // reset the entry timestamp.
  const navigateTo = useCallback(
    (idx: number) => {
      if (idx < 0 || idx >= results.length) return;
      checkpointTime();
      setCurrentIdx(idx);
      enteredAtRef.current = Date.now();
    },
    [results.length, checkpointTime],
  );

  // Auto-submit when the timer runs out.
  const computeRemainingMs = useCallback(() => {
    if (limitMs === null || startedAtMs === null) return null;
    return Math.max(0, limitMs - (nowMs - startedAtMs));
  }, [limitMs, startedAtMs, nowMs]);

  const finalizeAndShowResults = useCallback(() => {
    const endedAt = Date.now();

    // 1) Attribute any time spent on the currently-open question.
    let finalResults = results;
    if (
      enteredAtRef.current !== null &&
      currentIdx >= 0 &&
      currentIdx < results.length
    ) {
      const delta = endedAt - enteredAtRef.current;
      enteredAtRef.current = null;
      finalResults = results.map((r, i) =>
        i === currentIdx
          ? { ...r, timeSpentMs: r.timeSpentMs + delta }
          : r,
      );
      setResults(finalResults);
    }

    // 2) Commit results into the spaced-repetition engine.
    finalResults.forEach((r) => {
      const correct = isAnswerCorrect(r.q, r.response);
      const quality = correct ? 5 : r.response === null ? 0 : 1;
      markWordReviewed(r.q.word.id, quality);
    });

    // 3) Persist a TestHistoryRecord locally so analytics can pull from it.
    const startedIso = startedAtMs
      ? new Date(startedAtMs).toISOString()
      : new Date(endedAt).toISOString();
    const record = buildTestHistoryRecord(
      finalResults,
      startedIso,
      new Date(endedAt).toISOString(),
      endedAt - (startedAtMs ?? endedAt),
      scopeLabel,
      Array.from(kinds),
    );
    addTestHistoryRecord(record);

    // 4) Advance to the results phase.
    setEndedAtMs(endedAt);
    setPhase("results");
  }, [results, currentIdx, markWordReviewed, startedAtMs, scopeLabel, kinds]);

  // Watch the timer; auto-submit when it expires.
  useEffect(() => {
    if (phase !== "taking" && phase !== "review") return;
    const remaining = computeRemainingMs();
    if (remaining === null) return;
    if (remaining <= 0) {
      finalizeAndShowResults();
    }
  }, [phase, computeRemainingMs, finalizeAndShowResults]);

  // ─── Actions ────────────────────────────────────────────

  const startTest = useCallback(() => {
    const queue = buildTestQueue(
      sourceWords,
      Array.from(kinds),
      Math.max(1, Math.min(numQuestions, ceiling)),
    );
    if (queue.length === 0) return;
    const seeded: QuestionResult[] = queue.map((q) => ({
      q,
      response: null,
      flagged: false,
      timeSpentMs: 0,
    }));
    setResults(seeded);
    setCurrentIdx(0);
    const now = Date.now();
    setStartedAtMs(now);
    setEndedAtMs(null);
    enteredAtRef.current = now;
    setNowMs(now);
    if (timeMode === "none") {
      setLimitMs(null);
    } else if (timeMode === "custom") {
      setLimitMs(Math.max(1, customMinutes) * 60 * 1000);
    } else {
      setLimitMs(queue.length * suggestedSecPerQ * 1000);
    }
    setPhase("taking");
  }, [
    sourceWords,
    kinds,
    numQuestions,
    ceiling,
    timeMode,
    customMinutes,
    suggestedSecPerQ,
  ]);

  const setResponse = useCallback(
    (value: string | boolean) => {
      setResults((prev) => {
        if (currentIdx < 0 || currentIdx >= prev.length) return prev;
        const next = prev.slice();
        next[currentIdx] = { ...next[currentIdx], response: value };
        return next;
      });
    },
    [currentIdx],
  );

  const clearResponse = useCallback(() => {
    setResults((prev) => {
      if (currentIdx < 0 || currentIdx >= prev.length) return prev;
      const next = prev.slice();
      next[currentIdx] = { ...next[currentIdx], response: null };
      return next;
    });
  }, [currentIdx]);

  const toggleFlag = useCallback(() => {
    setResults((prev) => {
      if (currentIdx < 0 || currentIdx >= prev.length) return prev;
      const next = prev.slice();
      next[currentIdx] = {
        ...next[currentIdx],
        flagged: !next[currentIdx].flagged,
      };
      return next;
    });
  }, [currentIdx]);

  const goNext = useCallback(() => {
    if (currentIdx < results.length - 1) navigateTo(currentIdx + 1);
  }, [currentIdx, results.length, navigateTo]);

  const goPrev = useCallback(() => {
    if (currentIdx > 0) navigateTo(currentIdx - 1);
  }, [currentIdx, navigateTo]);

  const enterReview = useCallback(() => {
    checkpointTime();
    enteredAtRef.current = null;
    setPhase("review");
  }, [checkpointTime]);

  const exitReview = useCallback(
    (idx?: number) => {
      const target = idx ?? currentIdx;
      setCurrentIdx(target);
      enteredAtRef.current = Date.now();
      setPhase("taking");
    },
    [currentIdx],
  );

  const restart = useCallback(() => {
    setResults([]);
    setCurrentIdx(0);
    setStartedAtMs(null);
    setEndedAtMs(null);
    setLimitMs(null);
    enteredAtRef.current = null;
    setPhase("setup");
  }, []);

  // ─── Render ─────────────────────────────────────────────

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-[1080px] mx-auto px-4 lg:px-6 py-6 space-y-5"
    >
      <Header
        onBack={onBack}
        phase={phase}
        timer={
          phase === "taking" || phase === "review"
            ? {
                limitMs,
                elapsedMs:
                  startedAtMs === null ? 0 : nowMs - startedAtMs,
                remainingMs: computeRemainingMs(),
              }
            : null
        }
      />

      <AnimatePresence mode="wait">
        {phase === "setup" && (
          <motion.div
            key="setup"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
          >
            <SetupScreen
              source={source}
              onSourceChange={setSource}
              kinds={kinds}
              onKindsChange={setKinds}
              numQuestions={numQuestions}
              onNumQuestionsChange={setNumQuestions}
              timeMode={timeMode}
              onTimeModeChange={setTimeMode}
              customMinutes={customMinutes}
              onCustomMinutesChange={setCustomMinutes}
              sourceCount={sourceWords.length}
              ceiling={ceiling}
              effectiveCount={effectiveCount}
              suggestedSecPerQ={suggestedSecPerQ}
              canStart={canStart}
              onStart={startTest}
            />
          </motion.div>
        )}

        {phase === "taking" && results.length > 0 && (
          <motion.div
            key="taking"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="space-y-4"
          >
            <ProgressStrip
              results={results}
              currentIdx={currentIdx}
              onJump={navigateTo}
            />
            <TakingScreen
              result={results[currentIdx]}
              currentIdx={currentIdx}
              total={results.length}
              onAnswer={setResponse}
              onClear={clearResponse}
              onFlag={toggleFlag}
              onPrev={goPrev}
              onNext={goNext}
              onReview={enterReview}
              isFirst={currentIdx === 0}
              isLast={currentIdx === results.length - 1}
            />
          </motion.div>
        )}

        {phase === "review" && (
          <motion.div
            key="review"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
          >
            <ReviewScreen
              results={results}
              onJump={(idx) => exitReview(idx)}
              onBackToTest={() => exitReview()}
              onSubmit={finalizeAndShowResults}
            />
          </motion.div>
        )}

        {phase === "results" && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
          >
            <ResultsScreen
              results={results}
              startedAtMs={startedAtMs}
              endedAtMs={endedAtMs}
              scopeLabel={scopeLabel}
              words={words}
              onRestart={restart}
              onBack={onBack}
              onNavigate={onNavigate}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Header (with timer)
// ─────────────────────────────────────────────────────────────────────────────

function Header({
  onBack,
  phase,
  timer,
}: {
  onBack: () => void;
  phase: Phase;
  timer: {
    limitMs: number | null;
    elapsedMs: number;
    remainingMs: number | null;
  } | null;
}) {
  const phaseLabel: Record<Phase, string> = {
    setup: "Build your test",
    taking: "Test in progress",
    review: "Review before submit",
    results: "Results",
  };

  // Determine timer warning state (under 1 minute = warn, under 10s = danger).
  let timerTone: "default" | "warn" | "danger" = "default";
  if (timer && timer.remainingMs !== null) {
    if (timer.remainingMs <= 10_000) timerTone = "danger";
    else if (timer.remainingMs <= 60_000) timerTone = "warn";
  }
  const timerToneClass =
    timerTone === "danger"
      ? "bg-rose-500 text-white"
      : timerTone === "warn"
        ? "bg-amber-500 text-white"
        : "bg-card border border-border text-foreground";

  return (
    <header className="rounded-2xl border border-border bg-brand-gradient-soft px-5 py-4 shadow-sm">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors mb-2"
      >
        <ArrowLeft size={14} />
        Back to Test Center
      </button>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-[10px] font-extrabold uppercase tracking-wider text-brand-gradient">
            Timed Test
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold leading-tight text-foreground mt-0.5">
            {phaseLabel[phase]}
          </h1>
        </div>
        {timer && (
          <div className="flex items-center gap-2">
            {timer.remainingMs !== null ? (
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-extrabold tabular-nums ${timerToneClass}`}
                title="Time remaining"
              >
                <Clock size={14} />
                {formatClock(timer.remainingMs)}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-extrabold tabular-nums bg-card border border-border text-foreground">
                <Clock size={14} />
                {formatClock(timer.elapsedMs)}
              </span>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Setup screen
// ─────────────────────────────────────────────────────────────────────────────

function SetupScreen({
  source,
  onSourceChange,
  kinds,
  onKindsChange,
  numQuestions,
  onNumQuestionsChange,
  timeMode,
  onTimeModeChange,
  customMinutes,
  onCustomMinutesChange,
  sourceCount,
  ceiling,
  effectiveCount,
  suggestedSecPerQ,
  canStart,
  onStart,
}: {
  source: SourceState;
  onSourceChange: (next: SourceState) => void;
  kinds: Set<QuestionKind>;
  onKindsChange: (next: Set<QuestionKind>) => void;
  numQuestions: number;
  onNumQuestionsChange: (n: number) => void;
  timeMode: TimeMode;
  onTimeModeChange: (m: TimeMode) => void;
  customMinutes: number;
  onCustomMinutesChange: (n: number) => void;
  sourceCount: number;
  ceiling: number;
  effectiveCount: number;
  suggestedSecPerQ: number;
  canStart: boolean;
  onStart: () => void;
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-5">
      {/* Left: configuration */}
      <div className="lg:col-span-2 space-y-4">
        <SourcePicker source={source} onChange={onSourceChange} />
        <KindPicker selected={kinds} onChange={onKindsChange} />
        <CountPicker
          value={numQuestions}
          onChange={onNumQuestionsChange}
          ceiling={ceiling}
        />
        <TimePicker
          mode={timeMode}
          onModeChange={onTimeModeChange}
          customMinutes={customMinutes}
          onCustomMinutesChange={onCustomMinutesChange}
          numQuestions={effectiveCount}
          secPerQ={suggestedSecPerQ}
        />
      </div>

      {/* Right: live summary + start */}
      <aside className="lg:col-span-1">
        <div className="lg:sticky lg:top-4 space-y-4">
          <SetupSummary
            sourceCount={sourceCount}
            kindsCount={kinds.size}
            ceiling={ceiling}
            requested={numQuestions}
            effective={effectiveCount}
            timeMode={timeMode}
            customMinutes={customMinutes}
            secPerQ={suggestedSecPerQ}
          />
          <StartTestButton
            disabled={!canStart}
            count={effectiveCount}
            onClick={onStart}
          />
        </div>
      </aside>
    </div>
  );
}

function Section({
  icon,
  title,
  description,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-border bg-card shadow-sm p-4 sm:p-5">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-orange-600 dark:text-orange-400">{icon}</span>
        <h2 className="text-sm font-extrabold text-foreground">{title}</h2>
      </div>
      {description && (
        <p className="text-xs text-muted-foreground mb-3">{description}</p>
      )}
      <div className={description ? "" : "mt-1"}>{children}</div>
    </section>
  );
}

function SourcePicker({
  source,
  onChange,
}: {
  source: SourceState;
  onChange: (next: SourceState) => void;
}) {
  const beltIds =
    source.scope.kind === "belt" ? source.scope.beltIds : allBelts();
  const isAllScope = source.scope.kind === "all";

  return (
    <Section
      icon={<Award size={14} />}
      title="Word source"
      description="Default is belt-level — pick one or more belts so the test pulls from a comprehensive vocabulary pool."
    >
      <div className="flex items-center gap-2 mb-3">
        <ScopeToggle
          active={!isAllScope}
          onClick={() => onChange({ scope: { kind: "belt", beltIds } })}
          label="By belt"
        />
        <ScopeToggle
          active={isAllScope}
          onClick={() => onChange({ scope: { kind: "all" } })}
          label="All vocabulary"
        />
      </div>

      {!isAllScope && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-muted-foreground">
              Belts
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  onChange({ scope: { kind: "belt", beltIds: allBelts() } })
                }
                className="text-[11px] font-bold text-orange-600 hover:text-orange-700 dark:text-orange-400"
              >
                All
              </button>
              <span className="text-muted-foreground/40">·</span>
              <button
                type="button"
                onClick={() =>
                  onChange({ scope: { kind: "belt", beltIds: [] } })
                }
                className="text-[11px] font-bold text-muted-foreground hover:text-foreground"
              >
                None
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
            {Array.from({ length: TOTAL_BELTS }, (_, i) => i + 1).map(
              (belt) => {
                const checked = beltIds.includes(belt);
                return (
                  <button
                    key={belt}
                    type="button"
                    onClick={() => {
                      const next = checked
                        ? beltIds.filter((b) => b !== belt)
                        : [...beltIds, belt].sort((a, b) => a - b);
                      onChange({ scope: { kind: "belt", beltIds: next } });
                    }}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl border-2 text-xs font-bold transition-colors ${
                      checked
                        ? "border-orange-300 dark:border-orange-500/50 bg-orange-50 dark:bg-orange-500/10 text-orange-800 dark:text-orange-200"
                        : "border-border bg-card text-foreground hover:bg-muted/60"
                    }`}
                  >
                    {checked ? (
                      <CheckSquare size={14} />
                    ) : (
                      <Square size={14} />
                    )}
                    <span className="truncate">{BELT_NAMES[belt - 1]}</span>
                  </button>
                );
              },
            )}
          </div>
        </div>
      )}
    </Section>
  );
}

function ScopeToggle({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-1.5 rounded-xl text-[11px] font-extrabold transition-colors ${
        active
          ? "bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-300"
          : "bg-muted text-muted-foreground hover:bg-muted/70 hover:text-foreground"
      }`}
    >
      {label}
    </button>
  );
}

function KindPicker({
  selected,
  onChange,
}: {
  selected: Set<QuestionKind>;
  onChange: (next: Set<QuestionKind>) => void;
}) {
  const allOn = ALL_KINDS.every((k) => selected.has(k));
  return (
    <Section
      icon={<Layers size={14} />}
      title="Question types"
      description="Pick which kinds of questions can appear. The test never repeats the same type for the same word in one session."
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] font-extrabold uppercase tracking-wider text-muted-foreground">
          {selected.size} of {ALL_KINDS.length} selected
        </span>
        <button
          type="button"
          onClick={() =>
            onChange(allOn ? new Set([ALL_KINDS[0]]) : new Set(ALL_KINDS))
          }
          className="text-[11px] font-bold text-orange-600 hover:text-orange-700 dark:text-orange-400"
        >
          {allOn ? "Only first" : "All on"}
        </button>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {ALL_KINDS.map((k) => {
          const active = selected.has(k);
          const meta = KIND_META[k];
          return (
            <button
              key={k}
              type="button"
              onClick={() => {
                const next = new Set(selected);
                if (next.has(k)) next.delete(k);
                else next.add(k);
                if (next.size === 0) next.add(k);
                onChange(next);
              }}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-[11px] font-bold transition-colors ${
                active
                  ? "bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-300"
                  : "bg-muted text-muted-foreground hover:bg-muted/70 hover:text-foreground"
              }`}
              title={meta.label}
            >
              {meta.icon}
              {meta.short}
            </button>
          );
        })}
      </div>
    </Section>
  );
}

function CountPicker({
  value,
  onChange,
  ceiling,
}: {
  value: number;
  onChange: (n: number) => void;
  ceiling: number;
}) {
  const overshoot = ceiling > 0 && value > ceiling;
  return (
    <Section
      icon={<Hash size={14} />}
      title="Number of questions"
      description="Pick a preset or enter your own count. We'll cap it at the largest non-repeating pool we can build."
    >
      <div className="flex flex-wrap items-center gap-1.5 mb-3">
        {QUESTION_COUNT_PRESETS.map((preset) => {
          const active = value === preset;
          return (
            <button
              key={preset}
              type="button"
              onClick={() => onChange(preset)}
              className={`px-3 py-1.5 rounded-xl text-[12px] font-extrabold transition-colors ${
                active
                  ? "bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-300"
                  : "bg-muted text-muted-foreground hover:bg-muted/70 hover:text-foreground"
              }`}
            >
              {preset}
            </button>
          );
        })}
      </div>
      <label className="flex items-center gap-3">
        <span className="text-xs font-bold text-muted-foreground">Custom:</span>
        <input
          type="number"
          min={1}
          max={200}
          value={value}
          onChange={(e) => {
            const n = Math.max(1, Math.min(200, Number(e.target.value) || 1));
            onChange(n);
          }}
          className="w-24 px-3 py-1.5 rounded-xl border border-border bg-background text-sm font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-orange-300 dark:focus:ring-orange-500/50"
        />
        <span className="text-xs text-muted-foreground">
          questions {ceiling > 0 ? `(pool max: ${ceiling})` : ""}
        </span>
      </label>
      {overshoot && (
        <p className="text-[11px] text-amber-600 dark:text-amber-400 font-bold mt-2 inline-flex items-center gap-1">
          <AlertTriangle size={12} />
          Pool only supports {ceiling} unique questions — we'll use that.
        </p>
      )}
    </Section>
  );
}

function TimePicker({
  mode,
  onModeChange,
  customMinutes,
  onCustomMinutesChange,
  numQuestions,
  secPerQ,
}: {
  mode: TimeMode;
  onModeChange: (m: TimeMode) => void;
  customMinutes: number;
  onCustomMinutesChange: (n: number) => void;
  numQuestions: number;
  secPerQ: number;
}) {
  const suggestedTotalSec = Math.max(60, numQuestions * secPerQ);
  return (
    <Section
      icon={<TimerReset size={14} />}
      title="Time limit"
      description="The whole test runs against one clock. Per-question time is also tracked for the results screen."
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        <TimeOption
          active={mode === "suggested"}
          onClick={() => onModeChange("suggested")}
          title="Suggested"
          subtitle={`~${secPerQ}s per question · ${formatClock(
            suggestedTotalSec * 1000,
          )}`}
        />
        <TimeOption
          active={mode === "custom"}
          onClick={() => onModeChange("custom")}
          title="Custom"
          subtitle="Set your own minutes"
        />
        <TimeOption
          active={mode === "none"}
          onClick={() => onModeChange("none")}
          title="No limit"
          subtitle="Counts up — submit when ready"
        />
      </div>
      {mode === "custom" && (
        <div className="mt-3 flex items-center gap-3">
          <span className="text-xs font-bold text-muted-foreground">
            Minutes:
          </span>
          <input
            type="number"
            min={1}
            max={180}
            value={customMinutes}
            onChange={(e) => {
              const n = Math.max(
                1,
                Math.min(180, Number(e.target.value) || 1),
              );
              onCustomMinutesChange(n);
            }}
            className="w-24 px-3 py-1.5 rounded-xl border border-border bg-background text-sm font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-orange-300 dark:focus:ring-orange-500/50"
          />
          <span className="text-xs text-muted-foreground">
            for the entire test
          </span>
        </div>
      )}
    </Section>
  );
}

function TimeOption({
  active,
  onClick,
  title,
  subtitle,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  subtitle: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-left px-3 py-2.5 rounded-xl border-2 transition-colors ${
        active
          ? "border-orange-300 dark:border-orange-500/50 bg-orange-50 dark:bg-orange-500/10"
          : "border-border bg-card hover:bg-muted/50"
      }`}
    >
      <div className="text-xs font-extrabold text-foreground">{title}</div>
      <div className="text-[11px] text-muted-foreground mt-0.5">{subtitle}</div>
    </button>
  );
}

function SetupSummary({
  sourceCount,
  kindsCount,
  ceiling,
  requested,
  effective,
  timeMode,
  customMinutes,
  secPerQ,
}: {
  sourceCount: number;
  kindsCount: number;
  ceiling: number;
  requested: number;
  effective: number;
  timeMode: TimeMode;
  customMinutes: number;
  secPerQ: number;
}) {
  let timeLabel: string;
  if (timeMode === "none") {
    timeLabel = "No limit (counts up)";
  } else if (timeMode === "custom") {
    timeLabel = `${customMinutes} min`;
  } else {
    const total = Math.max(60, effective * secPerQ);
    timeLabel = `${formatClock(total * 1000)} (suggested)`;
  }
  return (
    <section className="rounded-2xl border border-border bg-card shadow-sm p-4">
      <h3 className="text-[11px] font-extrabold uppercase tracking-wider text-muted-foreground mb-3">
        Test summary
      </h3>
      <ul className="space-y-2 text-xs">
        <SummaryLine label="Source pool" value={`${sourceCount} words`} />
        <SummaryLine label="Question types" value={`${kindsCount} selected`} />
        <SummaryLine
          label="Questions"
          value={
            requested === effective
              ? `${effective}`
              : `${effective} (capped from ${requested})`
          }
        />
        <SummaryLine label="Pool ceiling" value={`${ceiling} max`} />
        <SummaryLine label="Time limit" value={timeLabel} />
      </ul>
      {effective === 0 && (
        <p className="text-[11px] text-rose-600 dark:text-rose-400 font-bold mt-3 inline-flex items-center gap-1">
          <AlertTriangle size={12} />
          No questions can be built — adjust source or types.
        </p>
      )}
    </section>
  );
}

function SummaryLine({ label, value }: { label: string; value: string }) {
  return (
    <li className="flex items-center justify-between gap-3">
      <span className="text-muted-foreground font-medium">{label}</span>
      <span className="font-extrabold text-foreground tabular-nums">
        {value}
      </span>
    </li>
  );
}

function StartTestButton({
  disabled,
  count,
  onClick,
}: {
  disabled: boolean;
  count: number;
  onClick: () => void;
}) {
  return (
    <div>
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl text-sm font-extrabold transition-colors btn-brand disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
      >
        Start timed test ({count})
        <ChevronRight size={16} />
      </button>
      <p className="text-[11px] text-muted-foreground text-center mt-2">
        Feedback is held until you submit. Flag questions to revisit them.
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Progress strip (during test)
// ─────────────────────────────────────────────────────────────────────────────

function ProgressStrip({
  results,
  currentIdx,
  onJump,
}: {
  results: QuestionResult[];
  currentIdx: number;
  onJump: (idx: number) => void;
}) {
  const answered = results.filter((r) => r.response !== null).length;
  const flagged = results.filter((r) => r.flagged).length;
  const unanswered = results.length - answered;

  return (
    <section className="rounded-2xl border border-border bg-card shadow-sm p-3.5">
      <div className="flex items-center justify-between mb-2.5 gap-3">
        <div className="flex items-center gap-3 text-[11px] font-bold text-muted-foreground">
          <Stat label="Answered" value={answered} icon={<CheckCircle2 size={12} className="text-emerald-500" />} />
          <Stat label="Unanswered" value={unanswered} icon={<Circle size={12} className="text-muted-foreground" />} />
          <Stat label="Flagged" value={flagged} icon={<Flag size={12} className="text-amber-500" />} />
        </div>
        <span className="text-[11px] text-muted-foreground font-bold">
          Question {currentIdx + 1} / {results.length}
        </span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {results.map((r, i) => {
          const isCurrent = i === currentIdx;
          const answered = r.response !== null;
          const baseTone = answered
            ? "bg-emerald-500 text-white border-emerald-500"
            : "bg-card text-muted-foreground border-border";
          const currentRing = isCurrent
            ? "ring-2 ring-orange-400 ring-offset-1 ring-offset-card"
            : "";
          return (
            <button
              key={i}
              type="button"
              onClick={() => onJump(i)}
              title={`Question ${i + 1}${r.flagged ? " · flagged" : ""}${
                answered ? " · answered" : ""
              }`}
              className={`relative w-7 h-7 rounded-md border-2 text-[11px] font-extrabold transition-colors hover-elevate ${baseTone} ${currentRing}`}
            >
              {i + 1}
              {r.flagged && (
                <span className="absolute -top-1 -right-1">
                  <Flag
                    size={10}
                    className="text-amber-500 fill-amber-500"
                  />
                </span>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}

function Stat({
  label,
  value,
  icon,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-1.5">
      {icon}
      <span className="font-extrabold text-foreground tabular-nums">
        {value}
      </span>
      <span>{label}</span>
    </span>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Taking screen (one question, no immediate feedback)
// ─────────────────────────────────────────────────────────────────────────────

function TakingScreen({
  result,
  currentIdx,
  total,
  onAnswer,
  onClear,
  onFlag,
  onPrev,
  onNext,
  onReview,
  isFirst,
  isLast,
}: {
  result: QuestionResult;
  currentIdx: number;
  total: number;
  onAnswer: (value: string | boolean) => void;
  onClear: () => void;
  onFlag: () => void;
  onPrev: () => void;
  onNext: () => void;
  onReview: () => void;
  isFirst: boolean;
  isLast: boolean;
}) {
  const { q, response, flagged } = result;

  return (
    <article className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
      <div className="px-5 sm:px-6 pt-5 flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-muted text-foreground/80 text-[11px] font-extrabold">
          {KIND_META[q.kind].icon}
          {KIND_META[q.kind].label}
        </span>
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-muted-foreground font-bold">
            M{q.word.day} · S{q.word.group} · {q.word.pos}
          </span>
          <button
            type="button"
            onClick={onFlag}
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-extrabold transition-colors ${
              flagged
                ? "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300"
                : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
            title={flagged ? "Unflag this question" : "Flag for review"}
          >
            <Flag
              size={11}
              className={flagged ? "fill-amber-500 text-amber-500" : ""}
            />
            {flagged ? "Flagged" : "Flag"}
          </button>
        </div>
      </div>

      <div className="px-5 sm:px-6 pt-4">
        <PromptBlock q={q} />
      </div>

      <div className="px-5 sm:px-6 pt-5 pb-3">
        <NeutralAnswerArea q={q} response={response} onAnswer={onAnswer} />
      </div>

      {/* Per-question footer: clear + nav + submit-trigger */}
      <div className="px-5 sm:px-6 py-4 border-t border-border bg-muted/20 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onClear}
          disabled={response === null}
          className="text-[11px] font-bold text-muted-foreground hover:text-foreground inline-flex items-center gap-1 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <RotateCcw size={12} />
          Clear answer
        </button>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onPrev}
            disabled={isFirst}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-border bg-card text-xs font-bold text-foreground hover-elevate disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={14} /> Prev
          </button>
          {isLast ? (
            <button
              type="button"
              onClick={onReview}
              className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-xl text-xs font-extrabold btn-brand"
            >
              Review &amp; submit <Eye size={14} />
            </button>
          ) : (
            <button
              type="button"
              onClick={onNext}
              className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-xl text-xs font-extrabold btn-brand"
            >
              Next <ChevronRight size={14} />
            </button>
          )}
          <button
            type="button"
            onClick={onReview}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-border bg-card text-xs font-bold text-foreground hover-elevate"
            title="Open the review screen"
          >
            <ListChecks size={14} /> Review ({currentIdx + 1}/{total})
          </button>
        </div>
      </div>
    </article>
  );
}

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
    q.kind === "tf-arabic" ||
    q.kind === "tf-tone"
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

/** Answer area that only shows selection state — never green/red during the test. */
function NeutralAnswerArea({
  q,
  response,
  onAnswer,
}: {
  q: Question;
  response: string | boolean | null;
  onAnswer: (value: string | boolean) => void;
}) {
  if (
    q.kind === "tf-definition" ||
    q.kind === "tf-synonym" ||
    q.kind === "tf-antonym" ||
    q.kind === "tf-arabic" ||
    q.kind === "tf-tone"
  ) {
    return (
      <div className="grid grid-cols-2 gap-2.5">
        {(["true", "false"] as const).map((v) => {
          const value = v === "true";
          const selected = response === value;
          return (
            <NeutralChoice
              key={v}
              label={v === "true" ? "True" : "False"}
              selected={selected}
              onClick={() => onAnswer(value)}
            />
          );
        })}
      </div>
    );
  }
  if (q.kind === "fill-blank") {
    const fb = q as FillBlankQuestion;
    return <FillBlankInput fb={fb} response={response} onAnswer={onAnswer} />;
  }
  // MCQ
  const mcq = q as MCQQuestion;
  return (
    <div className="grid grid-cols-1 gap-2.5">
      {mcq.choices.map((choice) => {
        const selected = response === choice;
        return (
          <NeutralChoice
            key={choice}
            label={choice}
            multiline
            selected={selected}
            onClick={() => onAnswer(choice)}
          />
        );
      })}
    </div>
  );
}

function NeutralChoice({
  label,
  selected,
  onClick,
  multiline,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
  multiline?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full ${
        multiline ? "text-left" : "text-center"
      } px-3.5 py-3 rounded-xl border-2 text-sm font-bold transition-colors ${
        selected
          ? "border-orange-400 dark:border-orange-500/70 bg-orange-50 dark:bg-orange-500/15 text-foreground"
          : "border-border bg-card text-foreground hover:bg-muted/60"
      }`}
    >
      <span className="flex items-center gap-2">
        {selected ? (
          <CheckSquare size={16} className="text-orange-500 shrink-0" />
        ) : (
          <Square size={16} className="text-muted-foreground/60 shrink-0" />
        )}
        <span className="flex-1">{label}</span>
      </span>
    </button>
  );
}

function FillBlankInput({
  fb,
  response,
  onAnswer,
}: {
  fb: FillBlankQuestion;
  response: string | boolean | null;
  onAnswer: (value: string) => void;
}) {
  // Local input state so typing is responsive. Sync from response when navigating between questions.
  const [text, setText] = useState<string>(
    typeof response === "string" ? response : "",
  );
  const lastFbId = useRef<string>(fb.id);
  useEffect(() => {
    if (lastFbId.current !== fb.id) {
      lastFbId.current = fb.id;
      setText(typeof response === "string" ? response : "");
    }
  }, [fb.id, response]);

  return (
    <div className="space-y-2">
      <input
        type="text"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          onAnswer(e.target.value);
        }}
        placeholder="Type the missing word…"
        className="w-full px-4 py-3 rounded-xl border-2 border-border bg-background text-base font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-orange-300 dark:focus:ring-orange-500/50 focus:border-orange-300 dark:focus:border-orange-500/50"
      />
      {fb.hintSynonyms.length > 0 && (
        <p className="text-[11px] text-muted-foreground italic">
          Hint synonyms hidden until results — guess from context.
        </p>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Review screen (before submit)
// ─────────────────────────────────────────────────────────────────────────────

function ReviewScreen({
  results,
  onJump,
  onBackToTest,
  onSubmit,
}: {
  results: QuestionResult[];
  onJump: (idx: number) => void;
  onBackToTest: () => void;
  onSubmit: () => void;
}) {
  const [confirming, setConfirming] = useState(false);
  const answered = results.filter((r) => r.response !== null).length;
  const flagged = results.filter((r) => r.flagged).length;
  const unanswered = results.length - answered;

  return (
    <section className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
      <div className="px-5 sm:px-6 py-4 border-b border-border bg-brand-gradient-soft">
        <h2 className="text-base font-extrabold text-foreground">
          Review your test
        </h2>
        <p className="text-xs text-muted-foreground mt-0.5">
          Jump back to any question or submit when you're ready. Submission is final.
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <SummaryChip
            tone="emerald"
            icon={<CheckCircle2 size={12} />}
            label="Answered"
            value={answered}
          />
          <SummaryChip
            tone="muted"
            icon={<Circle size={12} />}
            label="Unanswered"
            value={unanswered}
          />
          <SummaryChip
            tone="amber"
            icon={<Flag size={12} />}
            label="Flagged"
            value={flagged}
          />
        </div>
      </div>

      <ul className="divide-y divide-border">
        {results.map((r, i) => {
          const answered = r.response !== null;
          return (
            <li
              key={r.q.id}
              className="px-5 sm:px-6 py-3 flex items-center gap-3 hover:bg-muted/30 transition-colors"
            >
              <span
                className={`w-7 h-7 rounded-md border-2 inline-flex items-center justify-center text-[11px] font-extrabold shrink-0 ${
                  answered
                    ? "bg-emerald-500 text-white border-emerald-500"
                    : "bg-card text-muted-foreground border-border"
                }`}
              >
                {i + 1}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 text-[11px] font-bold text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    {KIND_META[r.q.kind].icon}
                    {KIND_META[r.q.kind].short}
                  </span>
                  <span>·</span>
                  <span>
                    M{r.q.word.day} · S{r.q.word.group}
                  </span>
                  {r.flagged && (
                    <>
                      <span>·</span>
                      <span className="inline-flex items-center gap-1 text-amber-600 dark:text-amber-400">
                        <Flag size={10} className="fill-amber-500 text-amber-500" />
                        Flagged
                      </span>
                    </>
                  )}
                </div>
                <p className="text-sm font-bold text-foreground truncate mt-0.5">
                  {snippet(r.q)}
                </p>
              </div>
              <span
                className={`text-[11px] font-extrabold px-2.5 py-1 rounded-full shrink-0 ${
                  answered
                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {answered ? "Answered" : "Unanswered"}
              </span>
              <button
                type="button"
                onClick={() => onJump(i)}
                className="text-[11px] font-bold text-orange-600 hover:text-orange-700 dark:text-orange-400 inline-flex items-center gap-0.5 shrink-0"
              >
                Open <ArrowRight size={12} />
              </button>
            </li>
          );
        })}
      </ul>

      <div className="px-5 sm:px-6 py-4 border-t border-border flex flex-wrap items-center justify-between gap-3 bg-muted/20">
        <button
          type="button"
          onClick={onBackToTest}
          className="inline-flex items-center gap-1 px-3.5 py-2 rounded-xl border border-border bg-card text-xs font-bold text-foreground hover-elevate"
        >
          <ChevronLeft size={14} /> Back to test
        </button>

        {!confirming ? (
          <button
            type="button"
            onClick={() => setConfirming(true)}
            className="inline-flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-extrabold btn-brand"
          >
            <Send size={14} /> Submit test
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-foreground">
              {unanswered > 0
                ? `${unanswered} unanswered — submit anyway?`
                : "Submit your test?"}
            </span>
            <button
              type="button"
              onClick={() => setConfirming(false)}
              className="px-3 py-1.5 rounded-xl border border-border bg-card text-[11px] font-bold text-foreground hover-elevate"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onSubmit}
              className="px-3.5 py-1.5 rounded-xl text-[11px] font-extrabold btn-brand"
            >
              Confirm submit
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function SummaryChip({
  tone,
  icon,
  label,
  value,
}: {
  tone: "emerald" | "amber" | "muted";
  icon: React.ReactNode;
  label: string;
  value: number;
}) {
  const cls =
    tone === "emerald"
      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300"
      : tone === "amber"
        ? "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300"
        : "bg-muted text-muted-foreground";
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-extrabold ${cls}`}
    >
      {icon}
      {value} {label}
    </span>
  );
}

function snippet(q: Question): string {
  if (q.kind === "fill-blank") {
    const fb = q as FillBlankQuestion;
    return fb.sentence;
  }
  if (
    q.kind === "tf-definition" ||
    q.kind === "tf-synonym" ||
    q.kind === "tf-antonym" ||
    q.kind === "tf-arabic" ||
    q.kind === "tf-tone"
  ) {
    return (q as TrueFalseQuestion).statement;
  }
  return q.prompt.split("\n").slice(1).join(" ").replace(/"/g, "") || q.prompt;
}

// ─────────────────────────────────────────────────────────────────────────────
// Results screen (after submit)
// ─────────────────────────────────────────────────────────────────────────────

function ResultsScreen({
  results,
  startedAtMs,
  endedAtMs,
  scopeLabel,
  words,
  onRestart,
  onBack,
  onNavigate,
}: {
  results: QuestionResult[];
  startedAtMs: number | null;
  endedAtMs: number | null;
  scopeLabel: string;
  words: Word[];
  onRestart: () => void;
  onBack: () => void;
  onNavigate: (page: string, params?: Record<string, unknown>) => void;
}) {
  const total = results.length;
  const correct = results.filter((r) => isAnswerCorrect(r.q, r.response)).length;
  const wrong = results.filter(
    (r) => r.response !== null && !isAnswerCorrect(r.q, r.response),
  ).length;
  const unanswered = results.filter((r) => r.response === null).length;
  const accuracy = total === 0 ? 0 : Math.round((correct / total) * 100);
  const totalTimeMs =
    startedAtMs !== null && endedAtMs !== null ? endedAtMs - startedAtMs : 0;
  const avgPerQ = total === 0 ? 0 : Math.round(totalTimeMs / total);

  // Snapshot the local question records for this test (after the parent has
  // already persisted history). We compute everything locally so the screen
  // works even if persistence silently fails.
  const currentRecords = useMemo<TestQuestionRecord[]>(
    () => questionsFromResults(results),
    [results],
  );

  // Pull all history once on mount; the latest record is index 0.
  const allHistory = useMemo(() => loadTestHistory(), []);
  const latestRecord = allHistory[0] ?? null;
  const flatAll = useMemo(() => flattenHistory(allHistory), [allHistory]);
  const allPerf = useMemo<WordPerformance[]>(
    () => rollupWordPerformance(flatAll.questions, flatAll.timestampPerQuestion),
    [flatAll],
  );

  const byKind = useMemo<AccuracyBucket[]>(
    () => accuracyByKind(currentRecords),
    [currentRecords],
  );
  const byBelt = useMemo<AccuracyBucket[]>(
    () => accuracyByBelt(currentRecords),
    [currentRecords],
  );
  const byMission = useMemo<AccuracyBucket[]>(
    () => accuracyByMission(currentRecords),
    [currentRecords],
  );
  const bySet = useMemo<AccuracyBucket[]>(
    () => accuracyBySet(currentRecords),
    [currentRecords],
  );

  const slowCorrect = useMemo<PacingEntry[]>(
    () => slowCorrectAnswers(currentRecords, 5),
    [currentRecords],
  );
  const fastWrong = useMemo<PacingEntry[]>(
    () => fastWrongAnswers(currentRecords, 5),
    [currentRecords],
  );

  const weakWords = useMemo<WordPerformance[]>(
    () => weakestWords(allPerf, 8),
    [allPerf],
  );
  const difficult = useMemo<Word[]>(
    () => difficultWords(words, 8),
    [words],
  );
  const mistakes = useMemo<Word[]>(
    () => mistakeWordsList(words, 8),
    [words],
  );
  const dueReview = useMemo<Word[]>(
    () => recommendedReview(words, 12),
    [words],
  );
  const suggested = useMemo<SuggestedSession | null>(
    () => suggestedNextSession(latestRecord, allHistory, words),
    [latestRecord, allHistory, words],
  );

  const hasMistakesInTest = wrong + unanswered > 0;

  const launchPracticeFor = useCallback(
    (wordIds: string[], sessionTitle: string) => {
      if (wordIds.length === 0) return;
      onNavigate("practice", { wordIds, sessionTitle });
    },
    [onNavigate],
  );

  return (
    <div className="space-y-4">
      {/* ─── Hero ─────────────────────────────────────────────────────── */}
      <section className="rounded-2xl border border-border bg-brand-gradient-soft px-5 py-5 shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-2xl bg-brand-gradient flex items-center justify-center shadow-md">
            <Trophy size={22} className="text-white" strokeWidth={2.5} />
          </div>
          <div>
            <div className="text-[10px] font-extrabold uppercase tracking-wider text-brand-gradient">
              Test complete · {scopeLabel}
            </div>
            <h2 className="text-2xl font-extrabold text-foreground">
              {accuracy}% · {correct}/{total}
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <ResultStat label="Correct" value={`${correct}`} tone="emerald" />
          <ResultStat label="Wrong" value={`${wrong}`} tone="rose" />
          <ResultStat
            label="Unanswered"
            value={`${unanswered}`}
            tone="muted"
          />
          <ResultStat
            label="Total time"
            value={formatClock(totalTimeMs)}
            tone="default"
          />
        </div>
        <p className="text-[11px] text-muted-foreground font-bold mt-3 inline-flex items-center gap-1">
          <Clock size={12} /> Avg {formatShortDuration(avgPerQ)} per question
        </p>
      </section>

      {/* ─── Suggested next practice ──────────────────────────────────── */}
      {suggested && suggested.wordIds.length > 0 && (
        <section className="rounded-2xl border border-border bg-card shadow-sm p-5">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-gradient flex items-center justify-center shrink-0 shadow-md">
              <Sparkles size={18} className="text-white" strokeWidth={2.5} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-brand-gradient">
                Suggested next practice
              </div>
              <h3 className="text-base font-extrabold text-foreground mt-0.5">
                {suggested.title}
              </h3>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                {suggested.rationale}
              </p>
              <div className="text-[11px] font-bold text-muted-foreground mt-2">
                {suggested.wordIds.length} word
                {suggested.wordIds.length === 1 ? "" : "s"} queued
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-3">
            <button
              type="button"
              onClick={() =>
                launchPracticeFor(suggested.wordIds, suggested.title)
              }
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-extrabold btn-brand"
            >
              <Sparkles size={14} /> Start practice
            </button>
          </div>
        </section>
      )}

      {/* ─── Accuracy breakdowns ──────────────────────────────────────── */}
      {byKind.length > 0 && (
        <BucketCard
          title="Accuracy by question type"
          icon={<ListChecks size={14} />}
          buckets={byKind}
          renderLabel={(b) => (
            <span className="inline-flex items-center gap-1.5">
              {KIND_META[b.key as QuestionKind]?.icon}
              {KIND_META[b.key as QuestionKind]?.label ?? b.label}
            </span>
          )}
        />
      )}

      <div className="grid sm:grid-cols-2 gap-3">
        {byBelt.length > 0 && (
          <BucketCard
            title="By belt"
            icon={<Award size={14} />}
            buckets={byBelt}
          />
        )}
        {byMission.length > 0 && (
          <BucketCard
            title="By mission"
            icon={<Target size={14} />}
            buckets={byMission}
            collapsedAfter={5}
          />
        )}
      </div>

      {bySet.length > 0 && (
        <BucketCard
          title="By set"
          icon={<Layers size={14} />}
          buckets={bySet}
          collapsedAfter={6}
        />
      )}

      {/* ─── Pacing analysis ──────────────────────────────────────────── */}
      {(slowCorrect.length > 0 || fastWrong.length > 0) && (
        <div className="grid sm:grid-cols-2 gap-3">
          {slowCorrect.length > 0 && (
            <PacingCard
              title="Slow correct answers"
              subtitle="You landed it but pacing felt heavy."
              tone="amber"
              icon={<TimerReset size={14} />}
              entries={slowCorrect}
            />
          )}
          {fastWrong.length > 0 && (
            <PacingCard
              title="Fast wrong answers"
              subtitle="Quick misses — slow down on these."
              tone="rose"
              icon={<AlertTriangle size={14} />}
              entries={fastWrong}
            />
          )}
        </div>
      )}

      {/* ─── Word weakness lists ──────────────────────────────────────── */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <WordListCard
          title="Weak words"
          subtitle="Lowest accuracy across all your tests."
          icon={<XCircle size={14} className="text-rose-500" />}
          empty="Take a few more tests to surface weak words."
          items={weakWords.map((w) => ({
            id: w.wordId,
            primary: w.word,
            meta: `${w.correct}/${w.attempts} · ${w.accuracy}%`,
          }))}
          ctaLabel="Practice these"
          ctaWordIds={weakWords.map((w) => w.wordId)}
          onPractice={launchPracticeFor}
          ctaTitle="Weak words"
        />
        <WordListCard
          title="Difficult words"
          subtitle="Flagged as difficult by the SRS engine."
          icon={<AlertTriangle size={14} className="text-amber-500" />}
          empty="No difficult words yet."
          items={difficult.map((w) => ({
            id: w.id,
            primary: w.word,
            meta: `D${w.difficulty ?? 0} · ${w.incorrectCount} miss${w.incorrectCount === 1 ? "" : "es"}`,
          }))}
          ctaLabel="Practice these"
          ctaWordIds={difficult.map((w) => w.id)}
          onPractice={launchPracticeFor}
          ctaTitle="Difficult words"
        />
        <WordListCard
          title="Mistake words"
          subtitle="Words you've ever gotten wrong."
          icon={<RotateCcw size={14} className="text-brand-gradient" />}
          empty="No mistake history yet — nice work."
          items={mistakes.map((w) => ({
            id: w.id,
            primary: w.word,
            meta: `${w.incorrectCount} miss${w.incorrectCount === 1 ? "" : "es"}`,
          }))}
          ctaLabel="Practice these"
          ctaWordIds={mistakes.map((w) => w.id)}
          onPractice={launchPracticeFor}
          ctaTitle="Mistake words"
        />
      </div>

      {/* ─── Recommended next review ──────────────────────────────────── */}
      <section className="rounded-2xl border border-border bg-card shadow-sm p-5">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center shrink-0">
            <RefreshCw
              size={16}
              className="text-emerald-600 dark:text-emerald-300"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-extrabold text-foreground">
              Recommended next review
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Words your spaced-repetition schedule says are due now.
            </p>
          </div>
          {dueReview.length > 0 && (
            <button
              type="button"
              onClick={() =>
                launchPracticeFor(
                  dueReview.map((w) => w.id),
                  "Due for review",
                )
              }
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-[11px] font-extrabold btn-brand"
            >
              <Sparkles size={12} /> Review now
            </button>
          )}
        </div>
        {dueReview.length === 0 ? (
          <p className="text-xs text-muted-foreground">
            Nothing is due right now. You're all caught up.
          </p>
        ) : (
          <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {dueReview.map((w) => (
              <li
                key={w.id}
                className="rounded-lg border border-border bg-muted/30 px-2.5 py-2"
              >
                <div className="text-xs font-extrabold text-foreground truncate">
                  {w.word}
                </div>
                <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider mt-0.5">
                  M{w.day} · S{w.group} · {w.pos}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* ─── Question-by-question breakdown (existing) ────────────────── */}
      <section className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
        <div className="px-5 sm:px-6 py-4 border-b border-border">
          <h3 className="text-base font-extrabold text-foreground">
            Question-by-question breakdown
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Your answer, the correct answer, and the time you spent on each.
          </p>
        </div>
        <ul className="divide-y divide-border">
          {results.map((r, i) => (
            <ResultRow key={r.q.id} result={r} index={i} />
          ))}
        </ul>
      </section>

      {/* ─── Footer actions ───────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1 px-3.5 py-2 rounded-xl border border-border bg-card text-xs font-bold text-foreground hover-elevate"
        >
          <ChevronLeft size={14} /> Back to Test Center
        </button>
        <div className="flex items-center gap-2 flex-wrap">
          {hasMistakesInTest && (
            <button
              type="button"
              onClick={() => {
                const ids = Array.from(
                  new Set(
                    results
                      .filter((r) => !isAnswerCorrect(r.q, r.response))
                      .map((r) => r.q.word.id),
                  ),
                );
                launchPracticeFor(ids, "Redo wrong + skipped");
              }}
              className="inline-flex items-center gap-1 px-3.5 py-2 rounded-xl border border-border bg-card text-xs font-bold text-foreground hover-elevate"
            >
              <RotateCcw size={14} /> Redo wrong
            </button>
          )}
          <button
            type="button"
            onClick={() => onNavigate("test-history")}
            className="inline-flex items-center gap-1 px-3.5 py-2 rounded-xl border border-border bg-card text-xs font-bold text-foreground hover-elevate"
          >
            <ListChecks size={14} /> Test history
          </button>
          <button
            type="button"
            onClick={onRestart}
            className="inline-flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-extrabold btn-brand"
          >
            <RotateCcw size={14} /> New test
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Helpers used by the results screen ─────────────────────────────────

function questionsFromResults(results: QuestionResult[]): TestQuestionRecord[] {
  return results.map((r) => {
    const correct = isAnswerCorrect(r.q, r.response);
    const answered =
      r.response !== null &&
      (typeof r.response !== "string" || r.response.trim() !== "");
    return {
      questionId: r.q.id,
      kind: r.q.kind,
      wordId: r.q.word.id,
      word: r.q.word.word,
      day: r.q.word.day,
      group: r.q.word.group,
      pos: r.q.word.pos,
      prompt: snippet(r.q),
      userAnswer: formatResponse(r.response),
      correctAnswer: correctAnswerText(r.q),
      correct,
      answered,
      flagged: r.flagged,
      timeSpentMs: r.timeSpentMs,
    };
  });
}

function buildTestHistoryRecord(
  results: QuestionResult[],
  startedAt: string,
  endedAt: string,
  durationMs: number,
  scopeLabel: string,
  selectedKinds: QuestionKind[],
): TestHistoryRecord {
  const questions = questionsFromResults(results);
  const numQuestions = questions.length;
  let numCorrect = 0;
  let numWrong = 0;
  let numUnanswered = 0;
  for (const q of questions) {
    if (q.correct) numCorrect += 1;
    else if (q.answered) numWrong += 1;
    else numUnanswered += 1;
  }
  const accuracy =
    numQuestions === 0 ? 0 : Math.round((numCorrect / numQuestions) * 100);
  return {
    id: `test-${Date.parse(endedAt)}-${Math.random().toString(36).slice(2, 7)}`,
    startedAt,
    endedAt,
    durationMs,
    scopeLabel,
    selectedKinds,
    numQuestions,
    numCorrect,
    numWrong,
    numUnanswered,
    accuracy,
    questions,
  };
}

// ─── Small re-usable cards used by the results screen ───────────────────

function BucketCard({
  title,
  icon,
  buckets,
  renderLabel,
  collapsedAfter,
}: {
  title: string;
  icon?: React.ReactNode;
  buckets: AccuracyBucket[];
  renderLabel?: (b: AccuracyBucket) => React.ReactNode;
  collapsedAfter?: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const showAll = expanded || !collapsedAfter || buckets.length <= collapsedAfter;
  const visible = showAll ? buckets : buckets.slice(0, collapsedAfter);
  return (
    <section className="rounded-2xl border border-border bg-card shadow-sm p-4">
      <h3 className="text-[11px] font-extrabold uppercase tracking-wider text-muted-foreground mb-3 inline-flex items-center gap-1.5">
        {icon}
        {title}
      </h3>
      <ul className="space-y-2">
        {visible.map((b) => {
          const tone =
            b.accuracy >= 80
              ? "text-emerald-600 dark:text-emerald-300"
              : b.accuracy >= 60
                ? "text-foreground"
                : "text-rose-600 dark:text-rose-300";
          return (
            <li
              key={b.key}
              className="flex items-center justify-between gap-3 text-xs"
            >
              <span className="inline-flex items-center gap-1.5 font-bold text-foreground min-w-0 truncate">
                {renderLabel ? renderLabel(b) : b.label}
              </span>
              <span className="tabular-nums font-bold inline-flex items-center gap-1.5 shrink-0">
                <span className="text-muted-foreground">
                  {b.correct}/{b.total}
                </span>
                <span className={tone}>· {b.accuracy}%</span>
              </span>
            </li>
          );
        })}
      </ul>
      {!showAll && (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className="mt-2 text-[11px] font-extrabold text-brand-gradient hover-elevate rounded-md px-1.5 py-0.5"
        >
          Show all {buckets.length}
        </button>
      )}
    </section>
  );
}

function PacingCard({
  title,
  subtitle,
  tone,
  icon,
  entries,
}: {
  title: string;
  subtitle: string;
  tone: "amber" | "rose";
  icon: React.ReactNode;
  entries: PacingEntry[];
}) {
  const headerCls =
    tone === "amber"
      ? "text-amber-600 dark:text-amber-300"
      : "text-rose-600 dark:text-rose-300";
  return (
    <section className="rounded-2xl border border-border bg-card shadow-sm p-4">
      <h3
        className={`text-[11px] font-extrabold uppercase tracking-wider mb-1 inline-flex items-center gap-1.5 ${headerCls}`}
      >
        {icon}
        {title}
      </h3>
      <p className="text-[11px] text-muted-foreground mb-2">{subtitle}</p>
      <ul className="space-y-1.5">
        {entries.map((e) => (
          <li
            key={e.questionId}
            className="rounded-lg border border-border bg-muted/30 px-2.5 py-1.5"
          >
            <div className="flex items-center justify-between gap-2 text-xs">
              <span className="font-extrabold text-foreground truncate">
                {e.word}
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] tabular-nums font-bold text-muted-foreground shrink-0">
                <Clock size={10} /> {formatShortDuration(e.timeSpentMs)}
              </span>
            </div>
            <div className="text-[10px] text-muted-foreground mt-0.5 truncate">
              {KIND_META[e.kind as QuestionKind]?.short ?? e.kind} · M{e.day} · S
              {e.group}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function WordListCard({
  title,
  subtitle,
  icon,
  empty,
  items,
  ctaLabel,
  ctaWordIds,
  ctaTitle,
  onPractice,
}: {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  empty: string;
  items: { id: string; primary: string; meta: string }[];
  ctaLabel: string;
  ctaWordIds: string[];
  ctaTitle: string;
  onPractice: (wordIds: string[], sessionTitle: string) => void;
}) {
  return (
    <section className="rounded-2xl border border-border bg-card shadow-sm p-4 flex flex-col">
      <h3 className="text-sm font-extrabold text-foreground inline-flex items-center gap-1.5">
        {icon}
        {title}
      </h3>
      <p className="text-[11px] text-muted-foreground mb-2">{subtitle}</p>
      {items.length === 0 ? (
        <p className="text-xs text-muted-foreground italic">{empty}</p>
      ) : (
        <ul className="space-y-1 flex-1">
          {items.map((it) => (
            <li
              key={it.id}
              className="flex items-center justify-between gap-2 text-xs rounded-md px-1.5 py-1 hover:bg-muted/40"
            >
              <span className="font-extrabold text-foreground truncate">
                {it.primary}
              </span>
              <span className="text-[10px] tabular-nums text-muted-foreground font-bold shrink-0">
                {it.meta}
              </span>
            </li>
          ))}
        </ul>
      )}
      {items.length > 0 && (
        <button
          type="button"
          onClick={() => onPractice(ctaWordIds, ctaTitle)}
          className="mt-3 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-extrabold border border-border bg-card text-foreground hover-elevate"
        >
          <Sparkles size={12} /> {ctaLabel}
        </button>
      )}
    </section>
  );
}

function ResultStat({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "emerald" | "rose" | "muted" | "default";
}) {
  const cls =
    tone === "emerald"
      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300"
      : tone === "rose"
        ? "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300"
        : tone === "muted"
          ? "bg-muted text-muted-foreground"
          : "bg-card border border-border text-foreground";
  return (
    <div className={`rounded-xl px-3 py-2 ${cls}`}>
      <div className="text-[10px] font-extrabold uppercase tracking-wider opacity-80">
        {label}
      </div>
      <div className="text-base font-extrabold tabular-nums">{value}</div>
    </div>
  );
}

function ResultRow({ result, index }: { result: QuestionResult; index: number }) {
  const { q, response, timeSpentMs, flagged } = result;
  const correct = isAnswerCorrect(q, response);
  const unanswered = response === null;
  const userText = formatResponse(response);
  const correctText = correctAnswerText(q);

  const statusTone = correct
    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300"
    : unanswered
      ? "bg-muted text-muted-foreground"
      : "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300";

  return (
    <li className="px-5 sm:px-6 py-3.5">
      <div className="flex items-start gap-3">
        <span
          className={`w-7 h-7 rounded-md border-2 inline-flex items-center justify-center text-[11px] font-extrabold shrink-0 ${
            correct
              ? "bg-emerald-500 text-white border-emerald-500"
              : unanswered
                ? "bg-card text-muted-foreground border-border"
                : "bg-rose-500 text-white border-rose-500"
          }`}
        >
          {index + 1}
        </span>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 text-[11px] font-bold text-muted-foreground flex-wrap">
            <span className="inline-flex items-center gap-1">
              {KIND_META[q.kind].icon}
              {KIND_META[q.kind].short}
            </span>
            <span>·</span>
            <span>
              M{q.word.day} · S{q.word.group} · {q.word.pos}
            </span>
            {flagged && (
              <>
                <span>·</span>
                <span className="inline-flex items-center gap-1 text-amber-600 dark:text-amber-400">
                  <Flag size={10} className="fill-amber-500 text-amber-500" />
                  Flagged
                </span>
              </>
            )}
            <span>·</span>
            <span className="inline-flex items-center gap-1">
              <Clock size={10} /> {formatShortDuration(timeSpentMs)}
            </span>
          </div>
          <p className="text-sm font-bold text-foreground mt-1 leading-snug">
            {snippet(q)}
          </p>

          <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div
              className={`rounded-lg border px-3 py-2 text-xs ${
                correct
                  ? "border-emerald-200 dark:border-emerald-500/30 bg-emerald-50/60 dark:bg-emerald-500/5"
                  : unanswered
                    ? "border-border bg-muted/40"
                    : "border-rose-200 dark:border-rose-500/30 bg-rose-50/60 dark:bg-rose-500/5"
              }`}
            >
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground mb-0.5 inline-flex items-center gap-1">
                {correct ? (
                  <CheckCircle2 size={11} className="text-emerald-500" />
                ) : unanswered ? (
                  <Circle size={11} />
                ) : (
                  <XCircle size={11} className="text-rose-500" />
                )}
                Your answer
              </div>
              <div className="font-bold text-foreground break-words">
                {userText}
              </div>
            </div>
            <div className="rounded-lg border border-emerald-200 dark:border-emerald-500/30 bg-emerald-50/60 dark:bg-emerald-500/5 px-3 py-2 text-xs">
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 dark:text-emerald-300 mb-0.5 inline-flex items-center gap-1">
                <CheckCircle2 size={11} />
                Correct answer
              </div>
              <div className="font-bold text-foreground break-words">
                {correctText}
              </div>
            </div>
          </div>

          {q.explanation && (
            <p className="mt-2 text-[11px] text-muted-foreground italic leading-snug">
              {q.explanation}
            </p>
          )}
        </div>

        <span
          className={`text-[11px] font-extrabold px-2.5 py-1 rounded-full shrink-0 ${statusTone}`}
        >
          {correct ? "Correct" : unanswered ? "Skipped" : "Wrong"}
        </span>
      </div>
    </li>
  );
}

function formatResponse(response: string | boolean | null): string {
  if (response === null || response === undefined) return "— no answer —";
  if (typeof response === "boolean") return response ? "True" : "False";
  return response.trim() === "" ? "— no answer —" : response;
}

function correctAnswerText(q: Question): string {
  if (q.kind === "fill-blank") {
    const fb = q as FillBlankQuestion;
    return fb.answer;
  }
  if (
    q.kind === "tf-definition" ||
    q.kind === "tf-synonym" ||
    q.kind === "tf-antonym" ||
    q.kind === "tf-arabic" ||
    q.kind === "tf-tone"
  ) {
    return (q as TrueFalseQuestion).answer ? "True" : "False";
  }
  return (q as MCQQuestion).correct;
}
