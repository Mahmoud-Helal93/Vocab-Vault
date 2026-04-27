import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ListChecks,
  Trophy,
  Clock,
  CheckCircle2,
  XCircle,
  Circle,
  Sparkles,
  RefreshCw,
  Trash2,
  ChevronDown,
  ChevronUp,
  Award,
  Target,
  Layers,
  TimerReset,
  AlertTriangle,
  Flag,
  RotateCcw,
  History,
  Brain,
} from "lucide-react";
import {
  loadTestHistory,
  clearTestHistory,
  formatRelativeTime,
  type TestHistoryRecord,
  type TestQuestionRecord,
} from "@/lib/storage";
import {
  accuracyByBelt,
  accuracyByKind,
  accuracyByMission,
  accuracyBySet,
  difficultWords,
  fastWrongAnswers,
  flattenHistory,
  formatClock,
  formatShortDuration,
  mistakeWordsList,
  recommendedReview,
  rollupWordPerformance,
  slowCorrectAnswers,
  suggestedNextSession,
  weakestWords,
  type AccuracyBucket,
  type PacingEntry,
  type WordPerformance,
} from "@/lib/testAnalytics";
import { useApp } from "@/context/AppContext";

interface TestHistoryProps {
  onBack: () => void;
  onNavigate: (page: string, params?: Record<string, unknown>) => void;
}

export default function TestHistory({ onBack, onNavigate }: TestHistoryProps) {
  const { words } = useApp();
  const [records, setRecords] = useState<TestHistoryRecord[]>(() =>
    loadTestHistory(),
  );
  const [openId, setOpenId] = useState<string | null>(null);

  const flat = useMemo(() => flattenHistory(records), [records]);
  const allPerf = useMemo<WordPerformance[]>(
    () => rollupWordPerformance(flat.questions, flat.timestampPerQuestion),
    [flat],
  );

  const totals = useMemo(() => {
    const tests = records.length;
    let questions = 0;
    let correct = 0;
    let wrong = 0;
    let unanswered = 0;
    let timeMs = 0;
    for (const r of records) {
      questions += r.numQuestions;
      correct += r.numCorrect;
      wrong += r.numWrong;
      unanswered += r.numUnanswered;
      timeMs += r.durationMs;
    }
    const accuracy = questions === 0 ? 0 : Math.round((correct / questions) * 100);
    return { tests, questions, correct, wrong, unanswered, timeMs, accuracy };
  }, [records]);

  const byKind = useMemo<AccuracyBucket[]>(
    () => accuracyByKind(flat.questions),
    [flat],
  );
  const byBelt = useMemo<AccuracyBucket[]>(
    () => accuracyByBelt(flat.questions),
    [flat],
  );
  const byMission = useMemo<AccuracyBucket[]>(
    () => accuracyByMission(flat.questions),
    [flat],
  );
  const bySet = useMemo<AccuracyBucket[]>(
    () => accuracyBySet(flat.questions),
    [flat],
  );

  const slowCorrect = useMemo<PacingEntry[]>(
    () => slowCorrectAnswers(flat.questions, 6),
    [flat],
  );
  const fastWrong = useMemo<PacingEntry[]>(
    () => fastWrongAnswers(flat.questions, 6),
    [flat],
  );

  const weak = useMemo<WordPerformance[]>(
    () => weakestWords(allPerf, 12),
    [allPerf],
  );
  const difficult = useMemo(() => difficultWords(words, 12), [words]);
  const mistakes = useMemo(() => mistakeWordsList(words, 12), [words]);
  const dueReview = useMemo(() => recommendedReview(words, 12), [words]);
  const suggested = useMemo(
    () => suggestedNextSession(records[0] ?? null, records, words),
    [records, words],
  );

  const launchPracticeFor = (wordIds: string[], sessionTitle: string) => {
    if (wordIds.length === 0) return;
    onNavigate("practice", { wordIds, sessionTitle });
  };

  const handleClear = () => {
    if (
      window.confirm(
        "Clear all saved test history? Your spaced-repetition progress is not affected.",
      )
    ) {
      clearTestHistory();
      setRecords([]);
      setOpenId(null);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-[1240px] mx-auto px-4 lg:px-6 py-6 space-y-5"
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-border bg-card text-xs font-bold text-foreground hover-elevate"
        >
          <ArrowLeft size={14} /> Back
        </button>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onNavigate("gre-simulation")}
            className="inline-flex items-center gap-1 px-3 py-2 rounded-xl border border-border bg-card text-xs font-bold text-foreground hover-elevate"
          >
            <Brain size={14} /> GRE Sim
          </button>
          <button
            type="button"
            onClick={() => onNavigate("test-mode")}
            className="inline-flex items-center gap-1 px-3.5 py-2 rounded-xl text-xs font-extrabold btn-brand"
          >
            <Sparkles size={14} /> New test
          </button>
          {records.length > 0 && (
            <button
              type="button"
              onClick={handleClear}
              className="inline-flex items-center gap-1 px-3 py-2 rounded-xl border border-border bg-card text-xs font-bold text-rose-600 dark:text-rose-300 hover-elevate"
            >
              <Trash2 size={14} /> Clear
            </button>
          )}
        </div>
      </div>

      {/* Hero */}
      <section className="rounded-2xl border border-border bg-brand-gradient-soft px-5 sm:px-7 py-6 sm:py-7 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-brand-gradient flex items-center justify-center shadow-md shrink-0">
            <History size={26} className="text-white" strokeWidth={2.5} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[11px] font-extrabold uppercase tracking-wider text-brand-gradient">
              Test history & analytics
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold leading-tight text-foreground mt-1">
              {records.length === 0
                ? "No tests yet"
                : `${totals.tests} test${totals.tests === 1 ? "" : "s"} · ${totals.accuracy}% lifetime`}
            </h1>
            <p className="text-sm text-muted-foreground mt-1.5 max-w-2xl">
              {records.length === 0
                ? "Take your first timed test and your results, weak words, and pacing analytics will live here."
                : "Every timed test you complete is saved on this device. Drill down by belt, mission, set, or jump straight back into focused practice."}
            </p>
          </div>
        </div>
        {records.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 mt-5">
            <Stat label="Questions" value={`${totals.questions}`} tone="default" />
            <Stat label="Correct" value={`${totals.correct}`} tone="emerald" />
            <Stat label="Wrong" value={`${totals.wrong}`} tone="rose" />
            <Stat
              label="Unanswered"
              value={`${totals.unanswered}`}
              tone="muted"
            />
            <Stat
              label="Total time"
              value={formatShortDuration(totals.timeMs)}
              tone="default"
            />
          </div>
        )}
      </section>

      {records.length === 0 ? (
        <section className="rounded-2xl border border-dashed border-border bg-card p-10 text-center">
          <div className="w-12 h-12 rounded-2xl bg-muted mx-auto flex items-center justify-center">
            <ListChecks size={22} className="text-muted-foreground" />
          </div>
          <h3 className="text-base font-extrabold text-foreground mt-3">
            Nothing here yet
          </h3>
          <p className="text-sm text-muted-foreground mt-1 max-w-md mx-auto">
            Once you finish a timed test, you'll see overall scores, accuracy
            breakdowns, weak-word lists, and pacing analysis here.
          </p>
          <button
            type="button"
            onClick={() => onNavigate("test-mode")}
            className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-extrabold btn-brand"
          >
            <Sparkles size={14} /> Start a test
          </button>
        </section>
      ) : (
        <>
          {/* Suggested next practice */}
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

          {/* Accuracy breakdowns */}
          {byKind.length > 0 && (
            <BucketCard
              title="Accuracy by question type"
              icon={<ListChecks size={14} />}
              buckets={byKind}
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
                collapsedAfter={6}
              />
            )}
          </div>
          {bySet.length > 0 && (
            <BucketCard
              title="By set"
              icon={<Layers size={14} />}
              buckets={bySet}
              collapsedAfter={8}
            />
          )}

          {/* Pacing */}
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

          {/* Word lists */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <WordListCard
              title="Weak words"
              subtitle="Lowest accuracy across your tests."
              icon={<XCircle size={14} className="text-rose-500" />}
              empty="Take more tests to surface weak words."
              items={weak.map((w) => ({
                id: w.wordId,
                primary: w.word,
                meta: `${w.correct}/${w.attempts} · ${w.accuracy}%`,
              }))}
              ctaLabel="Practice these"
              ctaWordIds={weak.map((w) => w.wordId)}
              ctaTitle="Weak words"
              onPractice={launchPracticeFor}
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
              ctaTitle="Difficult words"
              onPractice={launchPracticeFor}
            />
            <WordListCard
              title="Mistake words"
              subtitle="Words you've ever gotten wrong."
              icon={<RotateCcw size={14} className="text-orange-500" />}
              empty="No mistake history yet — nice work."
              items={mistakes.map((w) => ({
                id: w.id,
                primary: w.word,
                meta: `${w.incorrectCount} miss${w.incorrectCount === 1 ? "" : "es"}`,
              }))}
              ctaLabel="Practice these"
              ctaWordIds={mistakes.map((w) => w.id)}
              ctaTitle="Mistake words"
              onPractice={launchPracticeFor}
            />
          </div>

          {/* Recommended next review */}
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
              <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
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

          {/* Test list */}
          <section className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
            <div className="px-5 sm:px-6 py-4 border-b border-border">
              <h3 className="text-base font-extrabold text-foreground">
                Past tests
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Tap a row to expand its question-by-question breakdown.
              </p>
            </div>
            <ul className="divide-y divide-border">
              {records.map((r) => (
                <TestRow
                  key={r.id}
                  record={r}
                  open={openId === r.id}
                  onToggle={() =>
                    setOpenId((prev) => (prev === r.id ? null : r.id))
                  }
                  onRedoMissed={() => {
                    const ids = Array.from(
                      new Set(
                        r.questions.filter((q) => !q.correct).map((q) => q.wordId),
                      ),
                    );
                    launchPracticeFor(ids, "Redo wrong + skipped");
                  }}
                />
              ))}
            </ul>
          </section>
        </>
      )}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

function Stat({
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

function BucketCard({
  title,
  icon,
  buckets,
  collapsedAfter,
}: {
  title: string;
  icon?: React.ReactNode;
  buckets: AccuracyBucket[];
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
              <span className="font-bold text-foreground min-w-0 truncate">
                {b.label}
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
              M{e.day} · S{e.group}
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

function TestRow({
  record,
  open,
  onToggle,
  onRedoMissed,
}: {
  record: TestHistoryRecord;
  open: boolean;
  onToggle: () => void;
  onRedoMissed: () => void;
}) {
  const accuracyTone =
    record.accuracy >= 80
      ? "text-emerald-600 dark:text-emerald-300"
      : record.accuracy >= 60
        ? "text-foreground"
        : "text-rose-600 dark:text-rose-300";

  return (
    <li>
      <button
        type="button"
        onClick={onToggle}
        className="w-full text-left px-5 sm:px-6 py-3.5 hover:bg-muted/40 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-brand-gradient flex items-center justify-center shrink-0 shadow-sm">
            <Trophy size={16} className="text-white" strokeWidth={2.5} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-extrabold text-foreground">
                {record.scopeLabel}
              </span>
              <span className="text-[11px] font-bold text-muted-foreground">
                {formatRelativeTime(record.endedAt)}
              </span>
            </div>
            <div className="text-[11px] font-bold text-muted-foreground mt-0.5 inline-flex items-center gap-2 flex-wrap">
              <span>{record.numQuestions} Q</span>
              <span>·</span>
              <span className="inline-flex items-center gap-1">
                <Clock size={10} /> {formatClock(record.durationMs)}
              </span>
              <span>·</span>
              <span>{record.numCorrect} correct</span>
              <span>·</span>
              <span>{record.numWrong} wrong</span>
              {record.numUnanswered > 0 && (
                <>
                  <span>·</span>
                  <span>{record.numUnanswered} skipped</span>
                </>
              )}
            </div>
          </div>
          <span
            className={`tabular-nums text-base font-extrabold shrink-0 ${accuracyTone}`}
          >
            {record.accuracy}%
          </span>
          <span className="shrink-0 text-muted-foreground">
            {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </span>
        </div>
      </button>

      {open && (
        <div className="px-5 sm:px-6 pb-4 space-y-3">
          <div className="flex items-center justify-end gap-2">
            {record.numCorrect < record.numQuestions && (
              <button
                type="button"
                onClick={onRedoMissed}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-[11px] font-extrabold border border-border bg-card text-foreground hover-elevate"
              >
                <RotateCcw size={12} /> Redo wrong
              </button>
            )}
          </div>
          <ul className="divide-y divide-border rounded-xl border border-border overflow-hidden">
            {record.questions.map((q, i) => (
              <QuestionRow key={q.questionId} q={q} index={i} />
            ))}
          </ul>
        </div>
      )}
    </li>
  );
}

function QuestionRow({
  q,
  index,
}: {
  q: TestQuestionRecord;
  index: number;
}) {
  const statusTone = q.correct
    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300"
    : !q.answered
      ? "bg-muted text-muted-foreground"
      : "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300";
  return (
    <li className="px-3.5 py-3 bg-card">
      <div className="flex items-start gap-3">
        <span
          className={`w-6 h-6 rounded-md border-2 inline-flex items-center justify-center text-[10px] font-extrabold shrink-0 ${
            q.correct
              ? "bg-emerald-500 text-white border-emerald-500"
              : !q.answered
                ? "bg-card text-muted-foreground border-border"
                : "bg-rose-500 text-white border-rose-500"
          }`}
        >
          {index + 1}
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground flex-wrap uppercase tracking-wider">
            <span>{q.kind}</span>
            <span>·</span>
            <span>
              M{q.day} · S{q.group} · {q.pos}
            </span>
            {q.flagged && (
              <>
                <span>·</span>
                <span className="inline-flex items-center gap-1 text-amber-600 dark:text-amber-400 normal-case tracking-normal">
                  <Flag size={9} className="fill-amber-500 text-amber-500" />
                  Flagged
                </span>
              </>
            )}
            <span>·</span>
            <span className="inline-flex items-center gap-1 normal-case tracking-normal">
              <Clock size={9} /> {formatShortDuration(q.timeSpentMs)}
            </span>
          </div>
          <p className="text-xs font-bold text-foreground mt-1 leading-snug">
            {q.prompt}
          </p>
          <div className="mt-1.5 grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            <div
              className={`rounded-md border px-2 py-1.5 text-[11px] ${
                q.correct
                  ? "border-emerald-200 dark:border-emerald-500/30 bg-emerald-50/60 dark:bg-emerald-500/5"
                  : !q.answered
                    ? "border-border bg-muted/40"
                    : "border-rose-200 dark:border-rose-500/30 bg-rose-50/60 dark:bg-rose-500/5"
              }`}
            >
              <div className="text-[9px] font-extrabold uppercase tracking-wider text-muted-foreground mb-0.5 inline-flex items-center gap-1">
                {q.correct ? (
                  <CheckCircle2 size={10} className="text-emerald-500" />
                ) : !q.answered ? (
                  <Circle size={10} />
                ) : (
                  <XCircle size={10} className="text-rose-500" />
                )}
                Your answer
              </div>
              <div className="font-bold text-foreground break-words">
                {q.userAnswer}
              </div>
            </div>
            <div className="rounded-md border border-emerald-200 dark:border-emerald-500/30 bg-emerald-50/60 dark:bg-emerald-500/5 px-2 py-1.5 text-[11px]">
              <div className="text-[9px] font-extrabold uppercase tracking-wider text-emerald-700 dark:text-emerald-300 mb-0.5 inline-flex items-center gap-1">
                <CheckCircle2 size={10} />
                Correct answer
              </div>
              <div className="font-bold text-foreground break-words">
                {q.correctAnswer}
              </div>
            </div>
          </div>
        </div>
        <span
          className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full shrink-0 ${statusTone}`}
        >
          {q.correct ? "Correct" : !q.answered ? "Skipped" : "Wrong"}
        </span>
      </div>
    </li>
  );
}
