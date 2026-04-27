import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Send,
  CheckCircle2,
  XCircle,
  RotateCcw,
  GraduationCap,
  AlignLeft,
  Layers,
  Shuffle,
  Trophy,
  AlertTriangle,
  Square,
  CheckSquare,
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import {
  type GREQuestion,
  type GRESimMode,
  type GREResponse,
  type TextCompletionQuestion,
  type SentenceEquivalenceQuestion,
  buildGRESimulation,
  isGREAnswerCorrect,
  isGREResponseComplete,
  recordsForGREQuestion,
} from "@/lib/greSimulation";
import {
  type TestHistoryRecord,
  type TestQuestionRecord,
  addTestHistoryRecord,
} from "@/lib/storage";

// ─────────────────────────────────────────────────────────────────────────────
// Props & local types
// ─────────────────────────────────────────────────────────────────────────────

interface GRESimulationProps {
  onBack: () => void;
  onNavigate: (page: string, params?: Record<string, unknown>) => void;
}

type Phase = "setup" | "taking" | "results";

interface GradedItem {
  q: GREQuestion;
  response: GREResponse | null;
  correct: boolean;
}

const MODE_META: Record<
  GRESimMode,
  { title: string; subtitle: string; icon: React.ReactNode }
> = {
  "text-completion": {
    title: "Text Completion",
    subtitle: "Fill the blanks in a short passage using context clues.",
    icon: <AlignLeft size={18} />,
  },
  "sentence-equivalence": {
    title: "Sentence Equivalence",
    subtitle: "Pick two synonyms that produce equivalent sentence meanings.",
    icon: <Layers size={18} />,
  },
  mixed: {
    title: "Mixed GRE Vocabulary",
    subtitle:
      "An exam-style mix of Text Completion and Sentence Equivalence questions.",
    icon: <Shuffle size={18} />,
  },
};

const COUNT_OPTIONS = [5, 10, 15, 20];
const TIME_OPTIONS = [
  { id: "untimed", label: "Untimed", seconds: null as number | null },
  { id: "10m", label: "10 min", seconds: 10 * 60 },
  { id: "20m", label: "20 min", seconds: 20 * 60 },
  { id: "30m", label: "30 min", seconds: 30 * 60 },
];

function formatClock(secs: number): string {
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

// ─────────────────────────────────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────────────────────────────────

export default function GRESimulation({ onBack, onNavigate }: GRESimulationProps) {
  const { words } = useApp();

  // ── Setup state ────────────────────────────────────────────────────────────
  const [mode, setMode] = useState<GRESimMode>("mixed");
  const [count, setCount] = useState<number>(10);
  const [timeId, setTimeId] = useState<string>("untimed");
  const timeOption = TIME_OPTIONS.find((t) => t.id === timeId) ?? TIME_OPTIONS[0];

  // ── Live state ─────────────────────────────────────────────────────────────
  const [phase, setPhase] = useState<Phase>("setup");
  const [questions, setQuestions] = useState<GREQuestion[]>([]);
  const [responses, setResponses] = useState<Record<string, GREResponse>>({});
  const [currentIdx, setCurrentIdx] = useState(0);
  const [startedAtMs, setStartedAtMs] = useState<number | null>(null);
  const [endedAtMs, setEndedAtMs] = useState<number | null>(null);
  const [nowMs, setNowMs] = useState<number>(() => Date.now());
  const [savedHistoryId, setSavedHistoryId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Accumulated time spent on each question (keyed by question id). The clock
  // starts ticking when a question becomes current and stops when the learner
  // moves to a different question or submits.
  const timePerQuestionRef = useRef<Record<string, number>>({});
  const questionEnteredAtRef = useRef<number | null>(null);

  // (Re)start the per-question timer whenever the current question changes
  // while in the taking phase.
  useEffect(() => {
    if (phase !== "taking") return;
    questionEnteredAtRef.current = Date.now();
    return () => {
      const enteredAt = questionEnteredAtRef.current;
      const q = questions[currentIdx];
      if (enteredAt !== null && q) {
        const elapsed = Date.now() - enteredAt;
        timePerQuestionRef.current[q.id] =
          (timePerQuestionRef.current[q.id] ?? 0) + Math.max(0, elapsed);
      }
      questionEnteredAtRef.current = null;
    };
  }, [phase, currentIdx, questions]);

  // ── Tick the clock once per second while taking the test ───────────────────
  useEffect(() => {
    if (phase !== "taking") return;
    const id = window.setInterval(() => setNowMs(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [phase]);

  // ── Auto-submit on time-out ────────────────────────────────────────────────
  const remainingSec = useMemo(() => {
    if (phase !== "taking" || timeOption.seconds === null || startedAtMs === null) {
      return null;
    }
    const elapsed = Math.floor((nowMs - startedAtMs) / 1000);
    return Math.max(0, timeOption.seconds - elapsed);
  }, [phase, nowMs, startedAtMs, timeOption.seconds]);

  // ── Start a session ────────────────────────────────────────────────────────
  const startSession = useCallback(() => {
    const built = buildGRESimulation({
      mode,
      numQuestions: count,
      pool: words,
    });
    if (built.length === 0) return;
    setQuestions(built);
    setResponses({});
    setCurrentIdx(0);
    setStartedAtMs(Date.now());
    setEndedAtMs(null);
    setSavedHistoryId(null);
    timePerQuestionRef.current = {};
    questionEnteredAtRef.current = null;
    setPhase("taking");
  }, [mode, count, words]);

  // ── Answer handlers ────────────────────────────────────────────────────────
  const updateTCAnswer = useCallback(
    (q: TextCompletionQuestion, blankIdx: number, choice: string) => {
      setResponses((prev) => {
        const existing =
          prev[q.id]?.kind === "text-completion"
            ? (prev[q.id] as Extract<GREResponse, { kind: "text-completion" }>)
            : { kind: "text-completion" as const, selected: q.blanks.map(() => null as string | null) };
        const selected = [...existing.selected];
        selected[blankIdx] = choice;
        return { ...prev, [q.id]: { kind: "text-completion", selected } };
      });
    },
    [],
  );

  const toggleSEAnswer = useCallback(
    (q: SentenceEquivalenceQuestion, choice: string) => {
      setResponses((prev) => {
        const existing =
          prev[q.id]?.kind === "sentence-equivalence"
            ? (prev[q.id] as Extract<GREResponse, { kind: "sentence-equivalence" }>)
            : { kind: "sentence-equivalence" as const, selected: [] as string[] };
        const has = existing.selected.includes(choice);
        let next: string[];
        if (has) {
          next = existing.selected.filter((c) => c !== choice);
        } else if (existing.selected.length < 2) {
          next = [...existing.selected, choice];
        } else {
          // Already 2 selected — replace the oldest pick.
          next = [existing.selected[1], choice];
        }
        return { ...prev, [q.id]: { kind: "sentence-equivalence", selected: next } };
      });
    },
    [],
  );

  // ── Navigation ─────────────────────────────────────────────────────────────
  const goNext = useCallback(() => {
    setCurrentIdx((i) => Math.min(i + 1, questions.length - 1));
    containerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [questions.length]);
  const goPrev = useCallback(() => {
    setCurrentIdx((i) => Math.max(i - 1, 0));
    containerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // ── Submit ─────────────────────────────────────────────────────────────────
  const submit = useCallback(() => {
    // Make sure the in-flight question's elapsed time is folded in before we
    // serialize the run. The "taking" useEffect cleanup also fires on phase
    // change but order-of-operations matters when we read the ref below.
    const enteredAt = questionEnteredAtRef.current;
    const liveQ = questions[currentIdx];
    if (enteredAt !== null && liveQ) {
      timePerQuestionRef.current[liveQ.id] =
        (timePerQuestionRef.current[liveQ.id] ?? 0) +
        Math.max(0, Date.now() - enteredAt);
      questionEnteredAtRef.current = null;
    }

    const endedMs = Date.now();
    const startedMs = startedAtMs ?? endedMs;

    // Translate every GRE question into one or more TestQuestionRecord entries
    // and persist a TestHistoryRecord so the result rolls into the analytics
    // shown on the Test History page.
    const allRecords: TestQuestionRecord[] = [];
    let itemsCorrect = 0;
    for (const q of questions) {
      const r = responses[q.id] ?? null;
      const elapsed = timePerQuestionRef.current[q.id] ?? 0;
      const recs = recordsForGREQuestion(q, r, elapsed);
      allRecords.push(...recs);
      if (isGREAnswerCorrect(q, r)) itemsCorrect += 1;
    }

    if (questions.length > 0) {
      const numQuestions = allRecords.length;
      const numCorrect = allRecords.filter((q) => q.correct).length;
      const numWrong = allRecords.filter((q) => q.answered && !q.correct).length;
      const numUnanswered = allRecords.filter((q) => !q.answered).length;
      const accuracy =
        numQuestions === 0 ? 0 : Math.round((numCorrect / numQuestions) * 100);
      const modeLabel =
        mode === "text-completion"
          ? "Text Completion"
          : mode === "sentence-equivalence"
            ? "Sentence Equivalence"
            : "Mixed";
      const blankCount = allRecords.filter((q) => q.kind === "text-completion").length;
      const seCount = allRecords.filter((q) => q.kind === "sentence-equivalence").length;
      const detail = [
        `${itemsCorrect}/${questions.length} items`,
        blankCount > 0 ? `${blankCount} blank${blankCount === 1 ? "" : "s"}` : null,
        seCount > 0 ? `${seCount} SE pair${seCount === 1 ? "" : "s"}` : null,
      ]
        .filter(Boolean)
        .join(" · ");
      const selectedKinds = Array.from(new Set(allRecords.map((r) => r.kind)));
      const record: TestHistoryRecord = {
        id: `gre-sim-${endedMs}-${Math.random().toString(36).slice(2, 8)}`,
        startedAt: new Date(startedMs).toISOString(),
        endedAt: new Date(endedMs).toISOString(),
        durationMs: Math.max(0, endedMs - startedMs),
        scopeLabel: `GRE Simulation · ${modeLabel} · ${detail}`,
        selectedKinds,
        numQuestions,
        numCorrect,
        numWrong,
        numUnanswered,
        accuracy,
        questions: allRecords,
      };
      addTestHistoryRecord(record);
      setSavedHistoryId(record.id);
    }

    setEndedAtMs(endedMs);
    setPhase("results");
  }, [currentIdx, mode, questions, responses, startedAtMs]);

  useEffect(() => {
    if (remainingSec === 0 && phase === "taking") submit();
  }, [remainingSec, phase, submit]);

  // ── Computed values ────────────────────────────────────────────────────────
  const answeredCount = useMemo(
    () =>
      questions.filter((q) => isGREResponseComplete(q, responses[q.id] ?? null))
        .length,
    [questions, responses],
  );

  const graded: GradedItem[] = useMemo(
    () =>
      questions.map((q) => {
        const r = responses[q.id] ?? null;
        return { q, response: r, correct: isGREAnswerCorrect(q, r) };
      }),
    [questions, responses],
  );

  const numCorrect = graded.filter((g) => g.correct).length;
  const accuracy = questions.length === 0 ? 0 : Math.round((numCorrect / questions.length) * 100);

  // ── Phase: setup ───────────────────────────────────────────────────────────
  if (phase === "setup") {
    return (
      <SetupScreen
        mode={mode}
        setMode={setMode}
        count={count}
        setCount={setCount}
        timeId={timeId}
        setTimeId={setTimeId}
        onBack={onBack}
        onStart={startSession}
      />
    );
  }

  // ── Phase: taking ──────────────────────────────────────────────────────────
  if (phase === "taking") {
    const q = questions[currentIdx];
    if (!q) return null;
    const isLast = currentIdx === questions.length - 1;
    return (
      <div ref={containerRef} className="min-h-screen bg-slate-50 dark:bg-slate-950">
        <ExamHeader
          mode={mode}
          questionIndex={currentIdx}
          totalQuestions={questions.length}
          answeredCount={answeredCount}
          remainingSec={remainingSec}
          onAbort={() => setPhase("setup")}
        />

        <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
          <div className="font-serif text-slate-900 dark:text-slate-100">
            {q.kind === "text-completion" ? (
              <TCQuestionView
                q={q}
                response={
                  responses[q.id]?.kind === "text-completion"
                    ? (responses[q.id] as Extract<GREResponse, { kind: "text-completion" }>)
                    : null
                }
                onPick={updateTCAnswer}
              />
            ) : (
              <SEQuestionView
                q={q}
                response={
                  responses[q.id]?.kind === "sentence-equivalence"
                    ? (responses[q.id] as Extract<GREResponse, { kind: "sentence-equivalence" }>)
                    : null
                }
                onToggle={toggleSEAnswer}
              />
            )}
          </div>

          <ExamFooter
            currentIdx={currentIdx}
            totalQuestions={questions.length}
            isLast={isLast}
            onPrev={goPrev}
            onNext={goNext}
            onSubmit={submit}
            answeredCount={answeredCount}
          />
        </main>
      </div>
    );
  }

  // ── Phase: results ─────────────────────────────────────────────────────────
  return (
    <ResultsScreen
      mode={mode}
      questions={questions}
      graded={graded}
      numCorrect={numCorrect}
      accuracy={accuracy}
      durationMs={(endedAtMs ?? Date.now()) - (startedAtMs ?? Date.now())}
      savedHistoryId={savedHistoryId}
      onRestart={() => setPhase("setup")}
      onBack={onBack}
      onViewHistory={() => onNavigate("test-history")}
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Setup screen
// ─────────────────────────────────────────────────────────────────────────────

interface SetupScreenProps {
  mode: GRESimMode;
  setMode: (m: GRESimMode) => void;
  count: number;
  setCount: (n: number) => void;
  timeId: string;
  setTimeId: (id: string) => void;
  onBack: () => void;
  onStart: () => void;
}

function SetupScreen({
  mode,
  setMode,
  count,
  setCount,
  timeId,
  setTimeId,
  onBack,
  onStart,
}: SetupScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto px-4 lg:px-6 py-8 space-y-8"
    >
      {/* Back */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft size={16} />
        Back to Test Center
      </button>

      {/* Hero */}
      <header className="rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-slate-900 dark:bg-slate-100 flex items-center justify-center shrink-0">
            <GraduationCap
              size={26}
              className="text-white dark:text-slate-900"
              strokeWidth={2.2}
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
              GRE Simulation
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold leading-tight text-slate-900 dark:text-slate-100 mt-1">
              Verbal · Vocabulary
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2 max-w-2xl">
              An exam-style session: Text Completion passages and Sentence
              Equivalence pairs drawn from your active word bank. Each item is
              scored all-or-nothing — no partial credit.
            </p>
          </div>
        </div>
      </header>

      {/* Mode picker */}
      <section className="space-y-3">
        <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Question type
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {(Object.keys(MODE_META) as GRESimMode[]).map((m) => {
            const meta = MODE_META[m];
            const active = m === mode;
            return (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                className={`text-left rounded-xl border p-4 transition-all ${
                  active
                    ? "border-slate-900 dark:border-slate-100 bg-slate-100 dark:bg-slate-800 shadow-sm"
                    : "border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-slate-400 dark:hover:border-slate-600"
                }`}
              >
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
                  {meta.icon}
                  <span className="text-sm font-bold">{meta.title}</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                  {meta.subtitle}
                </p>
              </button>
            );
          })}
        </div>
      </section>

      {/* Count + time */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-3">
          <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Number of questions
          </h2>
          <div className="grid grid-cols-4 gap-2">
            {COUNT_OPTIONS.map((n) => {
              const active = n === count;
              return (
                <button
                  key={n}
                  type="button"
                  onClick={() => setCount(n)}
                  className={`rounded-lg border py-2 text-sm font-bold transition-colors tabular-nums ${
                    active
                      ? "border-slate-900 dark:border-slate-100 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900"
                      : "border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-600"
                  }`}
                >
                  {n}
                </button>
              );
            })}
          </div>
        </div>
        <div className="space-y-3">
          <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Time limit
          </h2>
          <div className="grid grid-cols-4 gap-2">
            {TIME_OPTIONS.map((t) => {
              const active = t.id === timeId;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTimeId(t.id)}
                  className={`rounded-lg border py-2 text-xs font-bold transition-colors ${
                    active
                      ? "border-slate-900 dark:border-slate-100 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900"
                      : "border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-600"
                  }`}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Rules card */}
      <section className="rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 text-sm text-slate-700 dark:text-slate-300">
        <div className="flex items-center gap-2 mb-3 text-slate-900 dark:text-slate-100 font-bold">
          <AlertTriangle size={16} className="text-amber-500" />
          Test rules
        </div>
        <ul className="space-y-2 list-disc pl-5 text-slate-600 dark:text-slate-400">
          <li>
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              Text Completion:
            </span>{" "}
            single-blank items have 5 choices; multi-blank items have 3 choices
            per blank. Every blank must be correct to earn the point.
          </li>
          <li>
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              Sentence Equivalence:
            </span>{" "}
            select <em>two</em> answers that produce equivalent sentence
            meanings. Both must be correct.
          </li>
          <li>No partial credit. You may revisit and change answers until you submit.</li>
        </ul>
      </section>

      {/* Start */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onStart}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-sm font-extrabold shadow-sm hover:bg-slate-800 dark:hover:bg-white transition-colors"
        >
          Begin simulation
          <ArrowRight size={16} />
        </button>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Exam header (during taking phase)
// ─────────────────────────────────────────────────────────────────────────────

interface ExamHeaderProps {
  mode: GRESimMode;
  questionIndex: number;
  totalQuestions: number;
  answeredCount: number;
  remainingSec: number | null;
  onAbort: () => void;
}

function ExamHeader({
  mode,
  questionIndex,
  totalQuestions,
  answeredCount,
  remainingSec,
  onAbort,
}: ExamHeaderProps) {
  const meta = MODE_META[mode];
  const lowTime = remainingSec !== null && remainingSec <= 60;
  return (
    <header className="sticky top-0 z-20 bg-white dark:bg-slate-900 border-b border-slate-300 dark:border-slate-700">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <button
            type="button"
            onClick={onAbort}
            title="Exit simulation"
            className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors"
          >
            <ArrowLeft size={18} />
          </button>
          <div className="hidden sm:flex items-center gap-2 text-slate-700 dark:text-slate-200">
            {meta.icon}
            <span className="text-sm font-bold">{meta.title}</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-xs font-bold tabular-nums text-slate-700 dark:text-slate-200">
            <span className="text-slate-500 dark:text-slate-400">Q</span>{" "}
            {questionIndex + 1}
            <span className="text-slate-400"> / </span>
            {totalQuestions}
          </div>
          <div className="hidden sm:block text-xs font-medium text-slate-500 dark:text-slate-400 tabular-nums">
            {answeredCount} answered
          </div>
          {remainingSec !== null && (
            <div
              className={`flex items-center gap-1.5 text-sm font-extrabold tabular-nums px-2.5 py-1 rounded-md ${
                lowTime
                  ? "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300"
                  : "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200"
              }`}
            >
              <Clock size={14} />
              {formatClock(remainingSec)}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Exam footer (during taking phase)
// ─────────────────────────────────────────────────────────────────────────────

interface ExamFooterProps {
  currentIdx: number;
  totalQuestions: number;
  isLast: boolean;
  onPrev: () => void;
  onNext: () => void;
  onSubmit: () => void;
  answeredCount: number;
}

function ExamFooter({
  currentIdx,
  totalQuestions,
  isLast,
  onPrev,
  onNext,
  onSubmit,
  answeredCount,
}: ExamFooterProps) {
  return (
    <div className="mt-10 pt-6 border-t border-slate-300 dark:border-slate-700 flex items-center justify-between gap-3">
      <button
        type="button"
        onClick={onPrev}
        disabled={currentIdx === 0}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-bold text-slate-700 dark:text-slate-200 hover:border-slate-500 dark:hover:border-slate-500 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <ArrowLeft size={14} />
        Previous
      </button>
      <div className="text-xs font-medium text-slate-500 dark:text-slate-400 tabular-nums">
        {answeredCount} / {totalQuestions} answered
      </div>
      {isLast ? (
        <button
          type="button"
          onClick={onSubmit}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-sm font-extrabold hover:bg-slate-800 dark:hover:bg-white transition-colors"
        >
          <Send size={14} />
          Submit test
        </button>
      ) : (
        <button
          type="button"
          onClick={onNext}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-sm font-extrabold hover:bg-slate-800 dark:hover:bg-white transition-colors"
        >
          Next
          <ArrowRight size={14} />
        </button>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Text Completion question view
// ─────────────────────────────────────────────────────────────────────────────

interface TCQuestionViewProps {
  q: TextCompletionQuestion;
  response: Extract<GREResponse, { kind: "text-completion" }> | null;
  onPick: (q: TextCompletionQuestion, blankIdx: number, choice: string) => void;
}

function TCQuestionView({ q, response, onPick }: TCQuestionViewProps) {
  const selected = response?.selected ?? q.blanks.map(() => null);
  return (
    <article className="space-y-6">
      <div className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
        Text Completion · {q.numBlanks === 1 ? "single blank" : `${q.numBlanks} blanks`} · clue: {q.clueLabel}
      </div>
      <PassageWithBlanks passage={q.passage} blanks={q.blanks} selected={selected} />
      <div className="space-y-5">
        {q.blanks.map((b, i) => (
          <div key={i} className="space-y-2">
            <div className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Blank ({i + 1})
            </div>
            <div className={`grid gap-2 ${q.numBlanks === 1 ? "sm:grid-cols-1" : "sm:grid-cols-1"}`}>
              {b.choices.map((c) => {
                const isSelected = selected[i] === c;
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => onPick(q, i, c)}
                    className={`text-left px-4 py-3 rounded-lg border text-sm transition-all font-serif ${
                      isSelected
                        ? "border-slate-900 dark:border-slate-100 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 shadow-sm"
                        : "border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:border-slate-500 dark:hover:border-slate-500"
                    }`}
                  >
                    <span className="inline-block w-6 text-xs font-bold text-slate-400 dark:text-slate-500 sans">
                      {String.fromCharCode(65 + b.choices.indexOf(c))}
                    </span>
                    {c}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}

interface PassageWithBlanksProps {
  passage: string;
  blanks: TextCompletionQuestion["blanks"];
  selected: (string | null)[];
}

function PassageWithBlanks({ passage, blanks, selected }: PassageWithBlanksProps) {
  // Replace `[1]`, `[2]`, `[3]` markers with inline blank pills.
  const parts: React.ReactNode[] = [];
  const re = /\[(\d)\]/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  while ((match = re.exec(passage)) !== null) {
    if (match.index > last) {
      parts.push(
        <span key={`t${key++}`}>{passage.slice(last, match.index)}</span>,
      );
    }
    const idx = parseInt(match[1], 10) - 1;
    const filled = selected[idx];
    const totalBlanks = blanks.length;
    parts.push(
      <span
        key={`b${key++}`}
        className={`inline-block align-baseline mx-1 px-3 py-0.5 rounded-md border-2 border-dashed ${
          filled
            ? "border-slate-900 dark:border-slate-100 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
            : "border-slate-400 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-400 dark:text-slate-500"
        }`}
      >
        {filled ?? (totalBlanks > 1 ? `(${idx + 1})` : "_____")}
      </span>,
    );
    last = match.index + match[0].length;
  }
  if (last < passage.length) {
    parts.push(<span key={`t${key++}`}>{passage.slice(last)}</span>);
  }
  return (
    <p className="text-lg sm:text-xl leading-relaxed text-slate-900 dark:text-slate-100">
      {parts}
    </p>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Sentence Equivalence question view
// ─────────────────────────────────────────────────────────────────────────────

interface SEQuestionViewProps {
  q: SentenceEquivalenceQuestion;
  response: Extract<GREResponse, { kind: "sentence-equivalence" }> | null;
  onToggle: (q: SentenceEquivalenceQuestion, choice: string) => void;
}

function SEQuestionView({ q, response, onToggle }: SEQuestionViewProps) {
  const selected = new Set(response?.selected ?? []);
  return (
    <article className="space-y-6">
      <div className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
        Sentence Equivalence · select <strong>two</strong> answers
      </div>
      <p className="text-lg sm:text-xl leading-relaxed text-slate-900 dark:text-slate-100">
        {q.sentence.split("_____").map((part, i, arr) => (
          <span key={i}>
            {part}
            {i < arr.length - 1 && (
              <span className="inline-block align-baseline mx-1 px-3 py-0.5 rounded-md border-2 border-dashed border-slate-400 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-400 dark:text-slate-500">
                _____
              </span>
            )}
          </span>
        ))}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {q.choices.map((c, i) => {
          const isSelected = selected.has(c);
          return (
            <button
              key={c}
              type="button"
              onClick={() => onToggle(q, c)}
              className={`text-left flex items-center gap-3 px-4 py-3 rounded-lg border text-sm transition-all font-serif ${
                isSelected
                  ? "border-slate-900 dark:border-slate-100 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 shadow-sm"
                  : "border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:border-slate-500 dark:hover:border-slate-500"
              }`}
            >
              {isSelected ? (
                <CheckSquare size={16} className="text-slate-900 dark:text-slate-100 shrink-0" />
              ) : (
                <Square size={16} className="text-slate-400 dark:text-slate-500 shrink-0" />
              )}
              <span className="inline-block w-5 text-xs font-bold text-slate-400 dark:text-slate-500 sans">
                {String.fromCharCode(65 + i)}
              </span>
              {c}
            </button>
          );
        })}
      </div>
      <div className="text-xs text-slate-500 dark:text-slate-400">
        {selected.size === 0 && "Select two answers."}
        {selected.size === 1 && "Select one more answer."}
        {selected.size === 2 && "Two answers selected — both must be correct."}
      </div>
    </article>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Results screen
// ─────────────────────────────────────────────────────────────────────────────

interface ResultsScreenProps {
  mode: GRESimMode;
  questions: GREQuestion[];
  graded: GradedItem[];
  numCorrect: number;
  accuracy: number;
  durationMs: number;
  savedHistoryId: string | null;
  onRestart: () => void;
  onBack: () => void;
  onViewHistory: () => void;
}

function ResultsScreen({
  mode,
  questions,
  graded,
  numCorrect,
  accuracy,
  durationMs,
  savedHistoryId,
  onRestart,
  onBack,
  onViewHistory,
}: ResultsScreenProps) {
  const minutes = Math.floor(durationMs / 60000);
  const seconds = Math.floor((durationMs % 60000) / 1000);
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto px-4 lg:px-6 py-8 space-y-6"
    >
      {/* Header */}
      <header className="rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 sm:p-8">
        <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 text-[11px] font-extrabold uppercase tracking-[0.18em]">
          <Trophy size={14} />
          GRE Simulation · Results
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 dark:text-slate-100 mt-2 tabular-nums">
          {numCorrect} / {questions.length}
          <span className="text-lg font-bold text-slate-500 dark:text-slate-400 ml-3">
            {accuracy}%
          </span>
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
          {MODE_META[mode].title} · finished in{" "}
          <span className="tabular-nums font-semibold">
            {minutes}m {seconds.toString().padStart(2, "0")}s
          </span>
          . No partial credit was awarded.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={onRestart}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-sm font-extrabold hover:bg-slate-800 dark:hover:bg-white transition-colors"
          >
            <RotateCcw size={14} />
            New simulation
          </button>
          {savedHistoryId && (
            <button
              type="button"
              onClick={onViewHistory}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-bold text-slate-700 dark:text-slate-200 hover:border-slate-500 dark:hover:border-slate-500 transition-colors"
            >
              <Trophy size={14} />
              View Test History
            </button>
          )}
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-bold text-slate-700 dark:text-slate-200 hover:border-slate-500 dark:hover:border-slate-500 transition-colors"
          >
            <ArrowLeft size={14} />
            Back to Test Center
          </button>
        </div>
        {savedHistoryId && (
          <p className="mt-4 text-xs font-medium text-slate-500 dark:text-slate-400">
            Saved to your test history. Per-blank and per-pair results feed your
            analytics breakdown alongside Practice and Test Mode sessions.
          </p>
        )}
      </header>

      {/* Per-question review */}
      <section className="space-y-4">
        <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Question review
        </h2>
        {graded.map((g, i) => (
          <ReviewCard key={g.q.id} index={i} item={g} />
        ))}
      </section>
    </motion.div>
  );
}

interface ReviewCardProps {
  index: number;
  item: GradedItem;
}

function ReviewCard({ index, item }: ReviewCardProps) {
  const { q, response, correct } = item;
  return (
    <article className="rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 p-5">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold tabular-nums text-slate-500 dark:text-slate-400">
            Q{index + 1}
          </span>
          <span className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
            {q.kind === "text-completion"
              ? `Text Completion · ${q.numBlanks} blank${q.numBlanks > 1 ? "s" : ""}`
              : "Sentence Equivalence"}
          </span>
        </div>
        {correct ? (
          <span className="inline-flex items-center gap-1 text-xs font-extrabold text-emerald-700 dark:text-emerald-300">
            <CheckCircle2 size={14} />
            Correct
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-xs font-extrabold text-rose-700 dark:text-rose-300">
            <XCircle size={14} />
            Incorrect
          </span>
        )}
      </div>

      {q.kind === "text-completion" ? (
        <TCReview q={q} response={response} />
      ) : (
        <SEReview q={q} response={response} />
      )}
    </article>
  );
}

function TCReview({
  q,
  response,
}: {
  q: TextCompletionQuestion;
  response: GREResponse | null;
}) {
  const selected =
    response?.kind === "text-completion" ? response.selected : q.blanks.map(() => null);
  return (
    <div className="space-y-4 font-serif text-slate-800 dark:text-slate-200 text-base leading-relaxed">
      <p>{q.passage.replace(/\[(\d)\]/g, (_, n) => `(${n})`)}</p>
      <ul className="space-y-1.5 text-sm">
        {q.blanks.map((b, i) => {
          const got = selected[i];
          const isRight = got === b.correct;
          return (
            <li key={i} className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 tabular-nums">
                ({i + 1})
              </span>
              <span className="text-slate-500 dark:text-slate-400">your answer:</span>
              <span
                className={`px-2 py-0.5 rounded ${
                  got === null
                    ? "bg-slate-100 dark:bg-slate-800 text-slate-500 italic"
                    : isRight
                      ? "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-200"
                      : "bg-rose-100 dark:bg-rose-500/20 text-rose-800 dark:text-rose-200 line-through"
                }`}
              >
                {got ?? "skipped"}
              </span>
              {!isRight && (
                <>
                  <span className="text-slate-500 dark:text-slate-400">correct:</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-200">
                    {b.correct}
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function SEReview({
  q,
  response,
}: {
  q: SentenceEquivalenceQuestion;
  response: GREResponse | null;
}) {
  const selected = response?.kind === "sentence-equivalence" ? response.selected : [];
  const correctSet = new Set(q.correctPair.map((c) => c.toLowerCase()));
  return (
    <div className="space-y-3 font-serif text-slate-800 dark:text-slate-200 text-base leading-relaxed">
      <p>{q.sentence}</p>
      <div className="flex flex-wrap gap-2 text-sm">
        <span className="text-slate-500 dark:text-slate-400">your selection:</span>
        {selected.length === 0 ? (
          <span className="text-slate-500 italic">none</span>
        ) : (
          selected.map((s) => {
            const isRight = correctSet.has(s.toLowerCase());
            return (
              <span
                key={s}
                className={`px-2 py-0.5 rounded ${
                  isRight
                    ? "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-200"
                    : "bg-rose-100 dark:bg-rose-500/20 text-rose-800 dark:text-rose-200"
                }`}
              >
                {s}
              </span>
            );
          })
        )}
      </div>
      <div className="flex flex-wrap gap-2 text-sm">
        <span className="text-slate-500 dark:text-slate-400">correct pair:</span>
        {q.correctPair.map((s) => (
          <span
            key={s}
            className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-200"
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}
