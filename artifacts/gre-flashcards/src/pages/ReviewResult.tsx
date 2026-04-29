import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Sparkles,
  Clock,
  RotateCcw,
  RotateCw,
  AlertTriangle,
  Calendar,
  CalendarClock,
  CalendarDays,
  ChevronRight,
  ListChecks,
  CheckCircle2,
  Volume2,
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import type { Word } from "@/data/words";
import {
  loadReviewCards,
  type ReviewCardState,
} from "@/lib/reviewSrs";
import type {
  RatingEntry,
  RatingValue,
  RatingLabel,
  ReviewSessionConfig,
} from "@/pages/ReviewSession";

// ─── Props ──────────────────────────────────────────────────────────────────

interface ReviewResultProps {
  ratings: RatingEntry[];
  total: number;
  elapsed: number;
  timerEnabled: boolean;
  config: ReviewSessionConfig;
  onBack: () => void;
  onNavigate: (page: string, params?: Record<string, unknown>) => void;
}

// ─── Rating presentation ────────────────────────────────────────────────────

interface RatingMeta {
  value: RatingValue;
  label: RatingLabel;
  baseCls: string;
  textCls: string;
  dotCls: string;
  chipCls: string;
}

const RATING_META: RatingMeta[] = [
  {
    value: 1,
    label: "Again",
    baseCls:
      "border-rose-300 bg-rose-50 dark:border-rose-800/60 dark:bg-rose-500/10",
    textCls: "text-rose-700 dark:text-rose-300",
    dotCls: "bg-rose-500",
    chipCls:
      "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300 border-rose-300 dark:border-rose-800/60",
  },
  {
    value: 2,
    label: "Hard",
    baseCls:
      "border-amber-300 bg-amber-50 dark:border-amber-800/60 dark:bg-amber-500/10",
    textCls: "text-amber-700 dark:text-amber-300",
    dotCls: "bg-amber-500",
    chipCls:
      "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300 border-amber-300 dark:border-amber-800/60",
  },
  {
    value: 3,
    label: "Good",
    baseCls:
      "border-sky-300 bg-sky-50 dark:border-sky-800/60 dark:bg-sky-500/10",
    textCls: "text-sky-700 dark:text-sky-300",
    dotCls: "bg-sky-500",
    chipCls:
      "bg-sky-100 text-sky-700 dark:bg-sky-500/20 dark:text-sky-300 border-sky-300 dark:border-sky-800/60",
  },
  {
    value: 4,
    label: "Easy",
    baseCls:
      "border-emerald-300 bg-emerald-50 dark:border-emerald-800/60 dark:bg-emerald-500/10",
    textCls: "text-emerald-700 dark:text-emerald-300",
    dotCls: "bg-emerald-500",
    chipCls:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800/60",
  },
  {
    value: 5,
    label: "Perfect",
    baseCls:
      "border-violet-300 bg-violet-50 dark:border-violet-800/60 dark:bg-violet-500/10",
    textCls: "text-violet-700 dark:text-violet-300",
    dotCls: "bg-violet-500",
    chipCls:
      "bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-300 border-violet-300 dark:border-violet-800/60",
  },
];

const META_BY_VALUE: Record<RatingValue, RatingMeta> = RATING_META.reduce(
  (acc, m) => {
    acc[m.value] = m;
    return acc;
  },
  {} as Record<RatingValue, RatingMeta>,
);

// ─── Helpers ────────────────────────────────────────────────────────────────

function formatClock(secs: number): string {
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function startOfDay(d: Date): Date {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

/** Days from "today" until the given ISO due date. Negative for overdue. */
function daysUntilDue(dueIso: string, now: Date = new Date()): number | null {
  if (!dueIso) return null;
  const due = new Date(dueIso);
  if (Number.isNaN(due.getTime())) return null;
  const today = startOfDay(now).getTime();
  const dueDay = startOfDay(due).getTime();
  return Math.round((dueDay - today) / (24 * 60 * 60 * 1000));
}

/** Friendly absolute due-date label for a per-word row. */
function formatDueLabel(state: ReviewCardState | undefined): string {
  if (!state || !state.dueDate) return "—";
  const d = daysUntilDue(state.dueDate);
  if (d === null) return "—";
  if (d <= 0) return "Today";
  if (d === 1) return "Tomorrow";
  if (d < 7) return `In ${d} days`;
  if (d < 14) return "In 1 week";
  if (d < 30) return `In ${Math.round(d / 7)} weeks`;
  if (d < 60) return "In 1 month";
  return `In ${Math.round(d / 30)} months`;
}

type ScheduleBucketKey = "tomorrow" | "in3" | "in7" | "later";
interface ScheduleBucket {
  key: ScheduleBucketKey;
  label: string;
  icon: React.ReactNode;
  minDays: number;
  maxDays: number; // inclusive; Infinity for the open-ended "Later"
}

const SCHEDULE_BUCKETS: ScheduleBucket[] = [
  {
    key: "tomorrow",
    label: "Tomorrow",
    icon: <Calendar size={14} />,
    minDays: 0,
    maxDays: 1,
  },
  {
    key: "in3",
    label: "In 3 days",
    icon: <Calendar size={14} />,
    minDays: 2,
    maxDays: 3,
  },
  {
    key: "in7",
    label: "In 7 days",
    icon: <CalendarClock size={14} />,
    minDays: 4,
    maxDays: 7,
  },
  {
    key: "later",
    label: "Later",
    icon: <CalendarDays size={14} />,
    minDays: 8,
    maxDays: Infinity,
  },
];

function speakWord(word: string) {
  if (typeof window === "undefined") return;
  if (!("speechSynthesis" in window)) return;
  try {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(word);
    u.lang = "en-US";
    u.rate = 0.95;
    window.speechSynthesis.speak(u);
  } catch {
    /* best-effort */
  }
}

// ─── Component ──────────────────────────────────────────────────────────────

export default function ReviewResult({
  ratings,
  total,
  elapsed,
  timerEnabled,
  config,
  onBack,
  onNavigate,
}: ReviewResultProps) {
  const { words } = useApp();

  // Look up word objects by id (skip any that no longer exist).
  const wordsById = useMemo(
    () => new Map(words.map((w) => [w.id, w] as const)),
    [words],
  );

  // Read the latest SM-2 state for each rated card. Done once per render —
  // localStorage is the source of truth and is already updated by the session.
  const reviewCards: Record<string, ReviewCardState> = useMemo(
    () => loadReviewCards(),
    [],
  );

  // ── Counts per rating ──
  const ratingCounts = useMemo<Record<RatingValue, number>>(() => {
    const counts: Record<RatingValue, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    for (const r of ratings) counts[r.rating] += 1;
    return counts;
  }, [ratings]);

  const reviewedCount = ratings.length;

  // ── Words rated Again / Hard ──
  const againWordIds = useMemo(
    () => ratings.filter((r) => r.rating === 1).map((r) => r.wordId),
    [ratings],
  );
  const hardWordIds = useMemo(
    () => ratings.filter((r) => r.rating === 2).map((r) => r.wordId),
    [ratings],
  );
  // De-dupe across again+hard while preserving order.
  const againOrHardWordIds = useMemo(() => {
    const seen = new Set<string>();
    const out: string[] = [];
    for (const r of ratings) {
      if ((r.rating === 1 || r.rating === 2) && !seen.has(r.wordId)) {
        seen.add(r.wordId);
        out.push(r.wordId);
      }
    }
    return out;
  }, [ratings]);

  // Latest rating per word (so a word reviewed twice shows only the last).
  const latestRatingByWord = useMemo(() => {
    const map = new Map<string, RatingEntry>();
    for (const r of ratings) map.set(r.wordId, r);
    return map;
  }, [ratings]);

  // ── Words to Review Again rows (Again + Hard, deduped, latest entry) ──
  const reviewAgainRows = useMemo(() => {
    const out: Array<{ word: Word; entry: RatingEntry }> = [];
    for (const id of againOrHardWordIds) {
      const word = wordsById.get(id);
      const entry = latestRatingByWord.get(id);
      if (word && entry) out.push({ word, entry });
    }
    return out;
  }, [againOrHardWordIds, wordsById, latestRatingByWord]);

  // ── Per-word recap rows (every rated word, in session order, deduped) ──
  const recapRows = useMemo(() => {
    const seen = new Set<string>();
    const out: Array<{ word: Word; entry: RatingEntry }> = [];
    for (const r of ratings) {
      if (seen.has(r.wordId)) continue;
      seen.add(r.wordId);
      const word = wordsById.get(r.wordId);
      if (!word) continue;
      const latest = latestRatingByWord.get(r.wordId) ?? r;
      out.push({ word, entry: latest });
    }
    return out;
  }, [ratings, wordsById, latestRatingByWord]);

  // ── Next Review Schedule (Smart Review only, requires SM-2 due dates) ──
  const scheduleData = useMemo(() => {
    if (config.mode !== "smart") return null;

    const buckets: Record<
      ScheduleBucketKey,
      { count: number; previewWords: string[] }
    > = {
      tomorrow: { count: 0, previewWords: [] },
      in3: { count: 0, previewWords: [] },
      in7: { count: 0, previewWords: [] },
      later: { count: 0, previewWords: [] },
    };

    let placedCount = 0;
    for (const r of ratings) {
      const state = reviewCards[r.wordId];
      if (!state) continue;
      const d = daysUntilDue(state.dueDate);
      if (d === null) continue;
      const bucket = SCHEDULE_BUCKETS.find(
        (b) => d >= b.minDays && d <= b.maxDays,
      );
      if (!bucket) continue;
      const slot = buckets[bucket.key];
      slot.count += 1;
      placedCount += 1;
      const w = wordsById.get(r.wordId);
      if (w && slot.previewWords.length < 5) slot.previewWords.push(w.word);
    }

    if (placedCount === 0) return null;
    return buckets;
  }, [config.mode, ratings, reviewCards, wordsById]);

  // ── Action handlers ──
  const startNewSession = (
    wordIds: string[],
    overrideTitle: string,
  ): void => {
    if (wordIds.length === 0) return;
    const newConfig: ReviewSessionConfig = {
      ...config,
      overrideWordIds: wordIds,
      overrideTitle,
    };
    onNavigate("review-session", { config: newConfig });
  };

  const handleStartAnother = () => onNavigate("review");
  const handleBackToCenter = () => onBack();

  const headerScopeLabel = (() => {
    if (config.overrideTitle) return config.overrideTitle;
    if (config.mode === "cumulative") {
      const m = config.cumulativeMission ?? 1;
      return `Cumulative Review · Missions 1–${m}`;
    }
    return `Smart Review · Belt ${config.smartBelt ?? 1}`;
  })();

  const showTime = timerEnabled || elapsed > 0;

  // ─── Render ─────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Sticky header */}
      <div className="sticky top-0 z-10 bg-card/80 backdrop-blur border-b border-border">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-3">
          <button
            onClick={handleBackToCenter}
            aria-label="Back to Review Center"
            className="p-2 rounded-xl hover:bg-muted text-muted-foreground shrink-0"
          >
            <ArrowLeft size={18} />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="text-base sm:text-lg font-bold truncate">
              Review Result
            </h1>
            <div className="text-xs text-muted-foreground truncate">
              {headerScopeLabel}
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <main className="flex-1">
        <div className="max-w-[1100px] mx-auto px-6 py-6 lg:py-8 space-y-7">
          {/* SECTION 1 — HERO SUMMARY */}
          <motion.section
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden"
          >
            <div className="bg-brand-gradient-soft px-6 sm:px-8 py-6 sm:py-8 border-b border-border">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-2xl bg-brand-gradient text-white flex items-center justify-center shadow-sm shrink-0">
                  <Sparkles size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                    Review complete
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    You reviewed{" "}
                    <span className="font-semibold text-foreground">
                      {reviewedCount}
                    </span>{" "}
                    word{reviewedCount === 1 ? "" : "s"}
                    {reviewedCount < total ? (
                      <>
                        {" "}of{" "}
                        <span className="font-semibold text-foreground">
                          {total}
                        </span>
                      </>
                    ) : null}
                    .
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-5">
              <div
                className={`grid gap-2 sm:gap-3 grid-cols-2 sm:grid-cols-3 ${
                  showTime ? "lg:grid-cols-7" : "lg:grid-cols-6"
                }`}
              >
                <MetricCard label="Reviewed" value={reviewedCount} />
                {RATING_META.map((m) => (
                  <MetricCard
                    key={m.value}
                    label={m.label}
                    value={ratingCounts[m.value]}
                    accentDot={m.dotCls}
                    accentText={m.textCls}
                  />
                ))}
                {showTime && (
                  <MetricCard
                    label="Time spent"
                    value={formatClock(elapsed)}
                    icon={<Clock size={14} />}
                  />
                )}
              </div>
            </div>
          </motion.section>

          {/* SECTION 2 — RATING BREAKDOWN */}
          <section className="rounded-2xl border border-border bg-card shadow-sm p-5 sm:p-6">
            <SectionHeader
              icon={<ListChecks size={16} />}
              title="Rating breakdown"
              subtitle="How your recall split across the five rating buckets."
            />
            <ul className="mt-4 space-y-2">
              {RATING_META.map((m) => {
                const count = ratingCounts[m.value];
                const pct =
                  reviewedCount > 0
                    ? Math.round((count / reviewedCount) * 100)
                    : 0;
                return (
                  <li
                    key={m.value}
                    className="flex items-center gap-3 rounded-xl border border-border bg-background/60 px-3.5 py-2.5 shadow-sm"
                  >
                    <span
                      className={`h-2.5 w-2.5 rounded-full shrink-0 ${m.dotCls}`}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className={`text-sm font-bold ${m.textCls}`}>
                          {m.label}
                        </span>
                        <span className="text-xs font-semibold text-muted-foreground tabular-nums">
                          <span className="text-foreground">{count}</span>
                          <span className="text-muted-foreground/70"> · {pct}%</span>
                        </span>
                      </div>
                      <div className="mt-2 h-2 rounded-full bg-muted overflow-hidden">
                        <div
                          className={`h-full ${m.dotCls} rounded-full transition-all`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>

          {/* SECTION 3 — WORDS TO REVIEW AGAIN */}
          <section className="rounded-2xl border border-border bg-card shadow-sm p-5 sm:p-6">
            <SectionHeader
              icon={<AlertTriangle size={16} />}
              title="Words to review again"
              subtitle="Cards you rated Again or Hard."
              right={
                reviewAgainRows.length > 0 ? (
                  <span className="text-xs font-semibold text-muted-foreground tabular-nums">
                    {reviewAgainRows.length} card
                    {reviewAgainRows.length === 1 ? "" : "s"}
                  </span>
                ) : null
              }
            />

            {reviewAgainRows.length === 0 ? (
              <div className="mt-4 rounded-xl border border-dashed border-border bg-muted/20 p-5 flex items-start gap-3">
                <div className="h-9 w-9 rounded-xl bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 flex items-center justify-center shrink-0">
                  <CheckCircle2 size={18} />
                </div>
                <div>
                  <div className="text-sm font-semibold">
                    Great work — no urgent cards to review again.
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    Nothing was rated Again or Hard in this session.
                  </div>
                </div>
              </div>
            ) : (
              <ul className="mt-4 space-y-2">
                {reviewAgainRows.map(({ word, entry }) => (
                  <WordRow
                    key={word.id}
                    word={word}
                    entry={entry}
                    state={reviewCards[word.id]}
                  />
                ))}
              </ul>
            )}

            {/* Review Again options */}
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-2">
              <ReviewAgainButton
                label="Review Again cards"
                count={againWordIds.length}
                onClick={() =>
                  startNewSession(againWordIds, "Review Again cards")
                }
              />
              <ReviewAgainButton
                label="Review Hard cards"
                count={hardWordIds.length}
                onClick={() => startNewSession(hardWordIds, "Review Hard cards")}
              />
              <ReviewAgainButton
                label="Review Again + Hard cards"
                count={againOrHardWordIds.length}
                onClick={() =>
                  startNewSession(
                    againOrHardWordIds,
                    "Review Again + Hard cards",
                  )
                }
                primary
              />
            </div>
          </section>

          {/* SECTION 4 — NEXT REVIEW SCHEDULE */}
          {config.mode === "smart" ? (
            <section className="rounded-2xl border border-border bg-card shadow-sm p-5 sm:p-6">
              <SectionHeader
                icon={<CalendarClock size={16} />}
                title="Next review schedule"
                subtitle="When these cards come back, based on your ratings."
              />
              {scheduleData ? (
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {SCHEDULE_BUCKETS.map((bucket) => {
                    const slot = scheduleData[bucket.key];
                    const isEmpty = slot.count === 0;
                    return (
                      <div
                        key={bucket.key}
                        className={`rounded-xl border p-4 transition ${
                          isEmpty
                            ? "border-border bg-muted/20"
                            : "border-border bg-background/60 shadow-sm"
                        }`}
                      >
                        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                          <span className="text-muted-foreground/80">
                            {bucket.icon}
                          </span>
                          {bucket.label}
                        </div>
                        <div className="mt-2 flex items-baseline gap-1.5">
                          <span
                            className={`text-3xl font-extrabold tabular-nums leading-none ${
                              isEmpty ? "text-muted-foreground/60" : "text-foreground"
                            }`}
                          >
                            {slot.count}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            card{slot.count === 1 ? "" : "s"}
                          </span>
                        </div>
                        {slot.previewWords.length > 0 && (
                          <div className="mt-2.5 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                            {slot.previewWords.join(" · ")}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="mt-4 rounded-xl border border-dashed border-border bg-muted/20 p-4 text-sm text-muted-foreground">
                  No schedule data yet for this session.
                </div>
              )}
            </section>
          ) : (
            <section className="rounded-2xl border border-border bg-card shadow-sm p-5 sm:p-6">
              <SectionHeader
                icon={<CalendarClock size={16} />}
                title="Next review schedule"
                subtitle="Spaced-repetition scheduling powers Smart Review."
              />
              <div className="mt-4 rounded-xl border border-dashed border-border bg-muted/20 p-4 text-sm text-muted-foreground">
                Scheduling buckets are tracked in Smart Review.
              </div>
            </section>
          )}

          {/* SECTION 5 — PER-WORD RECAP */}
          <section className="rounded-2xl border border-border bg-card shadow-sm p-5 sm:p-6">
            <SectionHeader
              icon={<ListChecks size={16} />}
              title="Per-word recap"
              subtitle="Every word you rated this session."
              right={
                recapRows.length > 0 ? (
                  <span className="text-xs font-semibold text-muted-foreground tabular-nums">
                    {recapRows.length} word{recapRows.length === 1 ? "" : "s"}
                  </span>
                ) : null
              }
            />
            {recapRows.length === 0 ? (
              <div className="mt-4 rounded-xl border border-dashed border-border bg-muted/20 p-4 text-sm text-muted-foreground">
                No words were rated in this session.
              </div>
            ) : (
              <ul className="mt-4 space-y-2">
                {recapRows.map(({ word, entry }) => (
                  <WordRow
                    key={word.id}
                    word={word}
                    entry={entry}
                    state={reviewCards[word.id]}
                  />
                ))}
              </ul>
            )}
          </section>

          {/* SECTION 6 — MAIN ACTION BUTTONS */}
          <section className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2.5 pt-1">
            <button
              onClick={handleBackToCenter}
              className="h-11 px-5 rounded-xl text-sm font-medium border border-border bg-card hover:bg-muted text-foreground inline-flex items-center justify-center gap-2"
            >
              <ArrowLeft size={14} />
              Back to Review Center
            </button>
            <button
              onClick={handleStartAnother}
              className="h-12 px-6 rounded-xl text-base font-bold btn-brand shadow-sm inline-flex items-center justify-center gap-2"
            >
              <RotateCw size={16} />
              Start another review
            </button>
          </section>
        </div>
      </main>
    </div>
  );
}

// ─── Small subcomponents ────────────────────────────────────────────────────

function SectionHeader({
  icon,
  title,
  subtitle,
  right,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="h-8 w-8 rounded-xl bg-muted text-muted-foreground flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-bold">{title}</h3>
        {subtitle && (
          <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
        )}
      </div>
      {right && <div className="shrink-0">{right}</div>}
    </div>
  );
}

function MetricCard({
  label,
  value,
  accentDot,
  accentText,
  icon,
}: {
  label: string;
  value: string | number;
  accentDot?: string;
  accentText?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border bg-background/60 px-3.5 py-3 flex flex-col gap-2 shadow-sm">
      <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
        {accentDot && <span className={`h-1.5 w-1.5 rounded-full ${accentDot}`} />}
        {icon && <span className="text-muted-foreground/80">{icon}</span>}
        <span>{label}</span>
      </div>
      <div
        className={`text-xl sm:text-2xl font-extrabold tabular-nums leading-none ${
          accentText ?? "text-foreground"
        }`}
      >
        {value}
      </div>
    </div>
  );
}

function ReviewAgainButton({
  label,
  count,
  onClick,
  primary,
}: {
  label: string;
  count: number;
  onClick: () => void;
  primary?: boolean;
}) {
  const disabled = count === 0;
  const baseCls = primary
    ? "btn-brand"
    : "border border-border bg-card hover:bg-muted text-foreground";
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`h-11 px-4 rounded-xl text-sm font-semibold inline-flex items-center justify-center gap-2 transition shadow-sm ${baseCls} disabled:opacity-40 disabled:cursor-not-allowed`}
    >
      <RotateCcw size={14} />
      <span>{label}</span>
      <span
        className={`inline-flex items-center justify-center min-w-6 h-5 px-1.5 rounded-md text-[11px] font-bold tabular-nums ${
          primary
            ? "bg-white/25 text-white"
            : "bg-muted text-muted-foreground border border-border"
        }`}
      >
        {count}
      </span>
    </button>
  );
}

function WordRow({
  word,
  entry,
  state,
}: {
  word: Word;
  entry: RatingEntry;
  state: ReviewCardState | undefined;
}) {
  const meta = META_BY_VALUE[entry.rating];
  const dueLabel = formatDueLabel(state);
  const onSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    speakWord(word.word);
  };

  return (
    <li className="rounded-xl border border-border bg-background/60 px-4 py-3 flex items-center gap-3 shadow-sm hover:bg-background/80 transition">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-bold">{word.word}</span>
          <span className="text-[11px] font-semibold italic text-muted-foreground">
            {word.pos}
          </span>
          <button
            onClick={onSpeak}
            aria-label={`Pronounce ${word.word}`}
            title="Pronounce"
            className="inline-flex items-center justify-center h-7 w-7 rounded-md border border-border bg-card hover:bg-muted text-muted-foreground"
          >
            <Volume2 size={12} />
          </button>
        </div>
        <div className="text-[11px] text-muted-foreground mt-1 flex items-center gap-2 flex-wrap">
          <span>
            Mission {word.day} · Set {word.group}
          </span>
          <span className="text-muted-foreground/60">·</span>
          <span className="inline-flex items-center gap-1">
            <ChevronRight size={10} />
            Next: <span className="font-semibold text-foreground">{dueLabel}</span>
          </span>
        </div>
      </div>
      <span
        className={`shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold border ${meta.chipCls}`}
      >
        <span className={`h-1.5 w-1.5 rounded-full ${meta.dotCls}`} />
        {meta.label}
      </span>
    </li>
  );
}
