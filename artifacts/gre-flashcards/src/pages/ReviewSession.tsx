import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { Word, TOTAL_DAYS } from "@/data/words";
import {
  TOTAL_BELTS,
  MISSIONS_PER_BELT,
  BELT_NAMES,
  missionsForBelt,
} from "@/lib/wordSelection";
import {
  ArrowLeft,
  Volume2,
  Clock,
  X,
  RotateCw,
  Sparkles,
  AlertTriangle,
} from "lucide-react";
import {
  loadReviewCards,
  recordRating,
  saveResumeSession,
  clearResumeSession,
  isDue as isCardDue,
  isNew as isCardNew,
  isWeak as isCardWeak,
  type ResumeSessionRecord,
  type ResumeRatingEntry,
} from "@/lib/reviewSrs";

// ─── Types shared with ReviewPage ────────────────────────────────────────────

export type ReviewMode = "cumulative" | "smart";
export type CardMode = "front" | "back";
export type ShuffleMode = "within-mission" | "within-all";
export type SmartFilter = "due" | "all" | "new-due" | "weak";
export type SmartSize = "all" | "20" | "30" | "50" | "custom";

export interface ReviewSessionConfig {
  mode: ReviewMode;
  cumulativeMission?: number; // 1..42
  smartBelt?: number; // 1..6
  smartFilter?: SmartFilter;
  smartSize?: SmartSize;
  smartCustomSize?: number;
  cardMode: CardMode;
  shuffleMode: ShuffleMode;
  timerEnabled: boolean;
}

interface ReviewSessionProps {
  config: ReviewSessionConfig;
  onBack: () => void;
  /** When provided, restore an interrupted session instead of building a new one. */
  resume?: ResumeSessionRecord | null;
}

// ─── Rating model (Phase 3 placeholder intervals) ───────────────────────────

export type RatingValue = 1 | 2 | 3 | 4 | 5;
export type RatingLabel = "Again" | "Hard" | "Good" | "Easy" | "Perfect";

export interface RatingEntry {
  wordId: string;
  rating: RatingValue;
  label: RatingLabel;
  reviewedAt: string; // ISO
  cardMode: CardMode;
  reviewMode: ReviewMode;
}

interface RatingDef {
  value: RatingValue;
  label: RatingLabel;
  intervalDays: number;
  // Tailwind classes — full strings so the JIT picks them up.
  baseCls: string;
  hoverCls: string;
  ringCls: string;
  dotCls: string;
  textCls: string;
  hotkey: string;
}

// Intervals are placeholder values for Phase 3. Phase 4 swaps in real SM‑2.
const RATINGS: RatingDef[] = [
  {
    value: 1,
    label: "Again",
    intervalDays: 1,
    baseCls:
      "border-rose-300 bg-rose-50 dark:border-rose-800/60 dark:bg-rose-500/10",
    hoverCls: "hover:bg-rose-100 dark:hover:bg-rose-500/20",
    ringCls: "focus-visible:ring-rose-400",
    dotCls: "bg-rose-500",
    textCls: "text-rose-700 dark:text-rose-300",
    hotkey: "1",
  },
  {
    value: 2,
    label: "Hard",
    intervalDays: 3,
    baseCls:
      "border-amber-300 bg-amber-50 dark:border-amber-800/60 dark:bg-amber-500/10",
    hoverCls: "hover:bg-amber-100 dark:hover:bg-amber-500/20",
    ringCls: "focus-visible:ring-amber-400",
    dotCls: "bg-amber-500",
    textCls: "text-amber-700 dark:text-amber-300",
    hotkey: "2",
  },
  {
    value: 3,
    label: "Good",
    intervalDays: 6,
    baseCls:
      "border-sky-300 bg-sky-50 dark:border-sky-800/60 dark:bg-sky-500/10",
    hoverCls: "hover:bg-sky-100 dark:hover:bg-sky-500/20",
    ringCls: "focus-visible:ring-sky-400",
    dotCls: "bg-sky-500",
    textCls: "text-sky-700 dark:text-sky-300",
    hotkey: "3",
  },
  {
    value: 4,
    label: "Easy",
    intervalDays: 10,
    baseCls:
      "border-emerald-300 bg-emerald-50 dark:border-emerald-800/60 dark:bg-emerald-500/10",
    hoverCls: "hover:bg-emerald-100 dark:hover:bg-emerald-500/20",
    ringCls: "focus-visible:ring-emerald-400",
    dotCls: "bg-emerald-500",
    textCls: "text-emerald-700 dark:text-emerald-300",
    hotkey: "4",
  },
  {
    value: 5,
    label: "Perfect",
    intervalDays: 15,
    baseCls:
      "border-violet-300 bg-violet-50 dark:border-violet-800/60 dark:bg-violet-500/10",
    hoverCls: "hover:bg-violet-100 dark:hover:bg-violet-500/20",
    ringCls: "focus-visible:ring-violet-400",
    dotCls: "bg-violet-500",
    textCls: "text-violet-700 dark:text-violet-300",
    hotkey: "5",
  },
];

function intervalLabel(days: number): string {
  if (days === 1) return "1 day";
  return `${days} days`;
}

const SMART_FILTER_LABEL: Record<SmartFilter, string> = {
  due: "Due cards only",
  all: "All cards in belt",
  "new-due": "New + due cards",
  weak: "Weak cards only",
};

// ─── Helpers ────────────────────────────────────────────────────────────────

function shuffle<T>(arr: T[]): T[] {
  const out = arr.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function beltOfDay(day: number): number {
  return Math.min(
    TOTAL_BELTS,
    Math.max(1, Math.floor((day - 1) / MISSIONS_PER_BELT) + 1),
  );
}

function buildSessionWords(
  config: ReviewSessionConfig,
  allWords: Word[],
): Word[] {
  if (config.mode === "cumulative") {
    const m = Math.max(1, Math.min(TOTAL_DAYS, config.cumulativeMission ?? 1));
    const pool = allWords.filter((w) => w.day <= m);

    if (config.shuffleMode === "within-all") {
      return shuffle(pool);
    }
    // Within Each Mission: keep mission order chronological, shuffle inside.
    const byDay = new Map<number, Word[]>();
    for (const w of pool) {
      const list = byDay.get(w.day) ?? [];
      list.push(w);
      byDay.set(w.day, list);
    }
    const out: Word[] = [];
    for (let day = 1; day <= m; day++) {
      const list = byDay.get(day);
      if (!list || list.length === 0) continue;
      out.push(...shuffle(list));
    }
    return out;
  }

  // Smart Review
  const belt = Math.max(1, Math.min(TOTAL_BELTS, config.smartBelt ?? 1));
  const beltDays = missionsForBelt(belt);
  let pool = allWords.filter((w) => beltDays.includes(w.day));

  // Phase 4 — apply the Smart Review source filter using stored review state.
  const reviewCards = loadReviewCards();
  const now = new Date();
  const filter = config.smartFilter ?? "due";
  if (filter === "due") {
    pool = pool.filter((w) => isCardDue(reviewCards[w.id], now));
  } else if (filter === "new-due") {
    pool = pool.filter(
      (w) => isCardNew(reviewCards[w.id]) || isCardDue(reviewCards[w.id], now),
    );
  } else if (filter === "weak") {
    pool = pool.filter((w) => isCardWeak(reviewCards[w.id]));
  }
  // "all" → entire belt, no filtering.

  if (pool.length === 0) return [];

  if (config.shuffleMode === "within-mission") {
    const byDay = new Map<number, Word[]>();
    for (const w of pool) {
      const list = byDay.get(w.day) ?? [];
      list.push(w);
      byDay.set(w.day, list);
    }
    pool = [];
    for (const day of beltDays) {
      const list = byDay.get(day);
      if (!list) continue;
      pool.push(...shuffle(list));
    }
  } else {
    pool = shuffle(pool);
  }

  const size = config.smartSize ?? "all";
  let limit = pool.length;
  if (size === "20") limit = 20;
  else if (size === "30") limit = 30;
  else if (size === "50") limit = 50;
  else if (size === "custom") limit = Math.max(1, config.smartCustomSize ?? 20);
  return pool.slice(0, Math.min(limit, pool.length));
}

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
    // no-op; pronunciation is best-effort
  }
}

function formatClock(secs: number): string {
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function ReviewSession({
  config,
  onBack,
  resume,
}: ReviewSessionProps) {
  const { words } = useApp();

  // When resuming, rebuild the same card order from saved IDs so the user
  // returns to the exact same card. Otherwise build a fresh session.
  const sessionWords = useMemo(
    () => {
      if (resume && resume.orderedWordIds.length > 0) {
        const byId = new Map(words.map((w) => [w.id, w] as const));
        const restored: Word[] = [];
        for (const id of resume.orderedWordIds) {
          const w = byId.get(id);
          if (w) restored.push(w);
        }
        if (restored.length > 0) return restored;
      }
      return buildSessionWords(config, words);
    },
    // build once per mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const [index, setIndex] = useState(() =>
    resume
      ? Math.min(Math.max(0, resume.index), sessionWords.length)
      : 0,
  );
  const [flipped, setFlipped] = useState(false);
  const [exitOpen, setExitOpen] = useState(false);
  const [elapsed, setElapsed] = useState(() => resume?.elapsedAtSave ?? 0);
  const [ratings, setRatings] = useState<RatingEntry[]>(() =>
    resume
      ? resume.ratings.map((r) => ({
          wordId: r.wordId,
          rating: r.rating,
          label: r.label as RatingLabel,
          reviewedAt: r.reviewedAt,
          cardMode: r.cardMode,
          reviewMode: r.reviewMode,
        }))
      : [],
  );
  // Anchor the timer so resumed sessions appear to continue from where they
  // left off rather than restarting at 0.
  const startedAt = useRef<number>(
    resume ? Date.now() - (resume.elapsedAtSave ?? 0) * 1000 : Date.now(),
  );

  const total = sessionWords.length;
  const current = sessionWords[index];
  const isLast = index >= total - 1;
  const isComplete = total === 0 || index >= total;

  // Counts per rating value (1..5)
  const ratingCounts = useMemo(() => {
    const counts: Record<RatingValue, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    for (const r of ratings) counts[r.rating] += 1;
    return counts;
  }, [ratings]);

  const title = config.mode === "cumulative" ? "Cumulative Review" : "Smart Review";
  const directionLabel =
    config.cardMode === "front" ? "Word → Meaning" : "Meaning → Word";

  // ── Timer (display-only; tracks elapsed time) ──
  useEffect(() => {
    if (!config.timerEnabled) return;
    const id = window.setInterval(() => {
      setElapsed(Math.floor((Date.now() - startedAt.current) / 1000));
    }, 1000);
    return () => window.clearInterval(id);
  }, [config.timerEnabled]);

  // ── Reset flip whenever the card changes ──
  useEffect(() => {
    setFlipped(false);
  }, [index]);

  // ── Word-side visibility (depends on cardMode + flipped) ──
  // Front side = the side that contains the WORD (word/pos/arabic/pronunciation).
  // Back side  = definition + synonyms.
  // If cardMode === "front", word side shows when !flipped.
  // If cardMode === "back",  word side shows when flipped.
  const wordSideVisible =
    config.cardMode === "front" ? !flipped : flipped;

  // ── Actions ──
  const flip = useCallback(() => {
    setFlipped((f) => !f);
  }, []);

  const requestExit = useCallback(() => setExitOpen(true), []);

  const submitRating = useCallback(
    (value: RatingValue) => {
      if (!current) return;
      const def = RATINGS.find((r) => r.value === value);
      if (!def) return;
      // Persist SM-2 state for this word right away. We persist for both
      // Cumulative and Smart Review so rating history is uniform; Smart
      // Review is the mode that consumes due dates for filtering.
      try {
        recordRating(current.id, value);
      } catch {
        /* localStorage best-effort */
      }
      const entry: RatingEntry = {
        wordId: current.id,
        rating: value,
        label: def.label,
        reviewedAt: new Date().toISOString(),
        cardMode: config.cardMode,
        reviewMode: config.mode,
      };
      setRatings((prev) => [...prev, entry]);
      // Advance to next card (or to completion). Flip resets via effect on `index`.
      setIndex((i) => Math.min(total, i + 1));
    },
    [current, config.cardMode, config.mode, total],
  );

  // ── Keyboard shortcuts ──
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (exitOpen) {
        if (e.key === "Escape") setExitOpen(false);
        return;
      }
      if (isComplete) return;
      if (e.key === " " || e.code === "Space") {
        e.preventDefault();
        flip();
      } else if (e.key === "p" || e.key === "P") {
        if (wordSideVisible && current?.word) {
          speakWord(current.word);
        }
      } else if (e.key === "Escape") {
        e.preventDefault();
        requestExit();
      } else if (flipped && /^[1-5]$/.test(e.key)) {
        // Rating keys are only active AFTER the card is flipped.
        e.preventDefault();
        submitRating(parseInt(e.key, 10) as RatingValue);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [
    flip,
    requestExit,
    wordSideVisible,
    current,
    exitOpen,
    isComplete,
    flipped,
    submitRating,
  ]);

  // ── Pause / Resume persistence ──
  // Build a serialisable snapshot of the live session.
  const buildResumeRecord = useCallback(
    (currentElapsed: number): ResumeSessionRecord => ({
      savedAt: new Date().toISOString(),
      startedAt: startedAt.current,
      elapsedAtSave: currentElapsed,
      config: { ...config } as Record<string, unknown>,
      orderedWordIds: sessionWords.map((w) => w.id),
      index,
      ratings: ratings.map(
        (r): ResumeRatingEntry => ({
          wordId: r.wordId,
          rating: r.rating,
          label: r.label,
          reviewedAt: r.reviewedAt,
          cardMode: r.cardMode,
          reviewMode: r.reviewMode,
        }),
      ),
    }),
    [config, sessionWords, index, ratings],
  );

  // Persist progress whenever the user advances or rates. This snapshot drives
  // the "Resume previous review" entry on the Review Center.
  useEffect(() => {
    // Don't snapshot empty sessions or completed sessions — those are handled
    // by the dedicated branches below.
    if (sessionWords.length === 0) return;
    if (index >= sessionWords.length) return;
    saveResumeSession(buildResumeRecord(elapsed));
    // Note: `elapsed` is intentionally NOT in deps — re-saving every second
    // when the timer is on would be wasteful. We capture the current elapsed
    // value at each rating step via the closure above, and on exit (below).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, ratings, sessionWords.length, buildResumeRecord]);

  // Clear the resume snapshot the moment the session is finished.
  useEffect(() => {
    if (sessionWords.length > 0 && index >= sessionWords.length) {
      clearResumeSession();
    }
  }, [index, sessionWords.length]);

  // ── Cumulative grouping progress ──
  const groupingProgress = useMemo(() => {
    if (config.mode !== "cumulative" || isComplete || !current) return null;
    const m = Math.max(1, Math.min(TOTAL_DAYS, config.cumulativeMission ?? 1));
    // Count how many distinct missions the session covers (those that actually have words)
    const missionsWithCards = new Set(sessionWords.map((w) => w.day));
    const orderedMissions = Array.from(missionsWithCards).sort((a, b) => a - b);
    const currentMissionIdx = orderedMissions.indexOf(current.day) + 1; // 1-based
    const totalMissionsInSession = orderedMissions.length;

    const wordsInCurrentMission = sessionWords.filter(
      (w) => w.day === current.day,
    );
    const positionInMission =
      wordsInCurrentMission.findIndex((w) => w.id === current.id) + 1;

    return {
      maxMission: m,
      currentMission: current.day,
      currentMissionIdx,
      totalMissionsInSession,
      positionInMission,
      missionTotal: wordsInCurrentMission.length,
    };
  }, [config.mode, config.cumulativeMission, current, sessionWords, isComplete]);

  // ── Empty / completion screens ──
  if (total === 0) {
    let emptyMessage = "No words match this review configuration.";
    if (config.mode === "smart") {
      const f = config.smartFilter ?? "due";
      if (f === "due") {
        emptyMessage =
          "No due cards in this belt today. Try New + due cards or All cards in belt.";
      } else if (f === "weak") {
        emptyMessage =
          "No weak cards in this belt yet. Try Due cards or All cards in belt.";
      } else if (f === "new-due") {
        emptyMessage =
          "No new or due cards in this belt. Try All cards in belt.";
      }
    }
    return (
      <EmptyOrComplete
        title={title}
        message={emptyMessage}
        primaryLabel="Back to Review Center"
        onPrimary={onBack}
      />
    );
  }

  if (isComplete) {
    return (
      <CompletionScreen
        title={title}
        total={total}
        ratings={ratings}
        ratingCounts={ratingCounts}
        elapsed={elapsed}
        timerEnabled={config.timerEnabled}
        onBack={onBack}
      />
    );
  }

  const progressPct = ((index + 1) / total) * 100;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* HEADER */}
      <div className="sticky top-0 z-20 bg-card/80 backdrop-blur border-b border-border">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-3">
          <button
            onClick={requestExit}
            aria-label="Back to Review Center"
            className="p-2 rounded-xl hover:bg-muted text-muted-foreground shrink-0"
          >
            <ArrowLeft size={18} />
          </button>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-base sm:text-lg font-bold truncate">
                {title}
              </h1>
              <span className="text-[11px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-md bg-muted text-muted-foreground">
                {directionLabel}
              </span>
              {config.mode === "smart" && (
                <>
                  <span className="text-[11px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-md bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-300">
                    Belt {config.smartBelt} · {BELT_NAMES[(config.smartBelt ?? 1) - 1]}
                  </span>
                  {config.smartFilter && (
                    <span className="text-[11px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-md bg-muted text-muted-foreground">
                      {SMART_FILTER_LABEL[config.smartFilter]}
                    </span>
                  )}
                </>
              )}
            </div>
            <div className="text-xs text-muted-foreground mt-0.5 flex items-center gap-3 flex-wrap">
              <span>
                Card{" "}
                <span className="font-semibold text-foreground">
                  {index + 1}
                </span>{" "}
                / {total}
              </span>
              <span>·</span>
              <span>
                {total - (index + 1)} card{total - (index + 1) === 1 ? "" : "s"} left
              </span>
              {groupingProgress && (
                <>
                  <span>·</span>
                  <span>
                    Mission{" "}
                    <span className="font-semibold text-foreground">
                      {groupingProgress.currentMissionIdx}
                    </span>{" "}
                    / {groupingProgress.totalMissionsInSession}{" "}
                    <span className="text-muted-foreground/80">
                      (M{groupingProgress.currentMission})
                    </span>
                  </span>
                  <span>·</span>
                  <span>
                    {groupingProgress.positionInMission} /{" "}
                    {groupingProgress.missionTotal} in mission
                  </span>
                </>
              )}
            </div>
          </div>

          {config.timerEnabled && (
            <div className="hidden sm:flex items-center gap-1.5 px-3 h-9 rounded-xl border border-border bg-muted/50 text-sm font-semibold tabular-nums">
              <Clock size={14} className="text-muted-foreground" />
              {formatClock(elapsed)}
            </div>
          )}

          <button
            onClick={requestExit}
            aria-label="Exit session"
            className="p-2 rounded-xl hover:bg-muted text-muted-foreground shrink-0"
          >
            <X size={18} />
          </button>
        </div>

        {/* Progress bar */}
        <div className="px-4 sm:px-6 lg:px-8 pb-3">
          <div className="max-w-[1100px] mx-auto h-1.5 rounded-full bg-muted overflow-hidden">
            <motion.div
              className="h-full bg-brand-gradient rounded-full"
              initial={false}
              animate={{ width: `${progressPct}%` }}
              transition={{ type: "tween", duration: 0.35 }}
            />
          </div>
          {/* Compact rating-count strip */}
          {ratings.length > 0 && (
            <div className="max-w-[1100px] mx-auto mt-2 flex items-center justify-center gap-1.5 sm:gap-3 flex-wrap text-[11px]">
              {RATINGS.map((r) => (
                <span
                  key={r.value}
                  className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-muted/50 border border-border"
                  title={`${r.label}: ${ratingCounts[r.value]} card${ratingCounts[r.value] === 1 ? "" : "s"}`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${r.dotCls}`} />
                  <span className="font-semibold text-muted-foreground">
                    {r.label}
                  </span>
                  <span className="font-bold text-foreground tabular-nums">
                    {ratingCounts[r.value]}
                  </span>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* MOBILE timer pill */}
      {config.timerEnabled && (
        <div className="sm:hidden px-4 pt-3">
          <div className="inline-flex items-center gap-1.5 px-2.5 h-7 rounded-lg border border-border bg-muted/50 text-xs font-semibold tabular-nums">
            <Clock size={12} className="text-muted-foreground" />
            {formatClock(elapsed)}
          </div>
        </div>
      )}

      {/* CARD AREA */}
      <main className="flex-1 flex items-start justify-center px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <div className="w-full max-w-[920px]">
          {/* Helper text */}
          <div className="text-center mb-4">
            <p className="text-sm text-muted-foreground">
              {flipped
                ? "Did you recall it correctly?"
                : "Try to recall the other side before flipping."}
            </p>
            {!flipped && (
              <p className="text-xs text-muted-foreground/80 mt-1">
                Click the card or press{" "}
                <kbd className="px-1.5 py-0.5 rounded border border-border bg-muted text-[10px] font-semibold">
                  Space
                </kbd>{" "}
                to reveal.
              </p>
            )}
          </div>

          {/* Flip card */}
          <div
            role="button"
            tabIndex={0}
            onClick={flip}
            onKeyDown={(e) => {
              if (e.key === "Enter") flip();
            }}
            className="cursor-pointer select-none"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={flipped ? "back" : "front"}
                initial={{ opacity: 0, rotateX: 8, y: 6 }}
                animate={{ opacity: 1, rotateX: 0, y: 0 }}
                exit={{ opacity: 0, rotateX: -8, y: -6 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="rounded-3xl border border-border bg-card shadow-sm min-h-[320px] sm:min-h-[400px] p-6 sm:p-10 flex"
              >
                {wordSideVisible ? (
                  <FrontFace word={current} />
                ) : (
                  <BackFace word={current} />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Rating row — only after flip */}
          <div className="mt-6 min-h-[88px]">
            {flipped ? (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground text-center mb-2">
                  How well did you recall it?
                </div>
                <div
                  role="group"
                  aria-label="Rate your recall"
                  className="grid grid-cols-2 sm:grid-cols-5 gap-2"
                >
                  {RATINGS.map((r) => (
                    <button
                      key={r.value}
                      onClick={() => submitRating(r.value)}
                      aria-label={`${r.label} — next review in ${intervalLabel(r.intervalDays)} (key ${r.hotkey})`}
                      className={`relative rounded-xl border px-3 py-3 text-center transition shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-offset-background ${r.baseCls} ${r.hoverCls} ${r.ringCls}`}
                    >
                      <span className="absolute top-1.5 left-2 inline-flex items-center justify-center h-4 min-w-4 px-1 rounded text-[9px] font-bold bg-card border border-border text-muted-foreground">
                        {r.hotkey}
                      </span>
                      <div className="flex items-center justify-center gap-1.5">
                        <span className={`h-2 w-2 rounded-full ${r.dotCls}`} />
                        <span className={`text-sm font-bold ${r.textCls}`}>
                          {r.label}
                        </span>
                      </div>
                      <div className="text-[11px] text-muted-foreground mt-0.5 tabular-nums">
                        {intervalLabel(r.intervalDays)}
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <div className="flex items-center justify-center">
                <button
                  onClick={flip}
                  className="h-11 px-5 rounded-xl text-sm font-semibold btn-brand inline-flex items-center gap-2"
                >
                  <RotateCw size={14} />
                  Reveal answer
                </button>
              </div>
            )}
          </div>

          {/* Keyboard legend */}
          <div className="mt-5 text-xs text-muted-foreground flex items-center justify-center gap-2 flex-wrap">
            <kbd className="px-1.5 py-0.5 rounded border border-border bg-muted font-semibold">
              Space
            </kbd>
            <span>Flip</span>
            <span className="text-muted-foreground/60">·</span>
            <kbd className="px-1.5 py-0.5 rounded border border-border bg-muted font-semibold">
              1–5
            </kbd>
            <span>Rate (after flip)</span>
            <span className="text-muted-foreground/60">·</span>
            <kbd className="px-1.5 py-0.5 rounded border border-border bg-muted font-semibold">
              P
            </kbd>
            <span>Pronounce (word side)</span>
            <span className="text-muted-foreground/60">·</span>
            <kbd className="px-1.5 py-0.5 rounded border border-border bg-muted font-semibold">
              Esc
            </kbd>
            <span>Exit</span>
          </div>
        </div>
      </main>

      {/* EXIT CONFIRMATION */}
      {exitOpen && (
        <ExitConfirm
          onCancel={() => setExitOpen(false)}
          onConfirm={() => {
            // Capture the most recent timer reading on the way out so Resume
            // continues from the right elapsed time.
            if (sessionWords.length > 0 && index < sessionWords.length) {
              try {
                saveResumeSession(buildResumeRecord(elapsed));
              } catch {
                /* best-effort */
              }
            }
            setExitOpen(false);
            onBack();
          }}
        />
      )}
    </div>
  );
}

// ─── Card faces ─────────────────────────────────────────────────────────────

function FrontFace({ word }: { word: Word }) {
  const onSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    speakWord(word.word);
  };
  return (
    <div className="m-auto w-full max-w-[640px] text-center">
      <div className="flex items-center justify-center gap-2 mb-4">
        <span className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-md bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-300">
          Mission {word.day}
        </span>
        <span className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-md bg-muted text-muted-foreground">
          Set {word.group}
        </span>
        <span className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-md bg-muted text-muted-foreground">
          Belt {beltOfDay(word.day)}
        </span>
      </div>

      <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-brand-gradient">
        {word.word}
      </h2>

      <div className="mt-3 flex items-center justify-center gap-3 flex-wrap">
        <span className="text-xs sm:text-sm font-semibold italic text-muted-foreground">
          {word.pos}
        </span>
        <button
          onClick={onSpeak}
          aria-label="Pronounce word"
          title="Pronounce (P)"
          className="inline-flex items-center gap-1.5 h-8 px-3 rounded-full border border-border bg-card hover:bg-muted text-sm font-medium"
        >
          <Volume2 size={14} />
          Pronounce
        </button>
      </div>

      {word.arabic && (
        <div
          dir="rtl"
          lang="ar"
          className="mt-6 text-2xl sm:text-3xl font-semibold text-foreground/90"
        >
          {word.arabic}
        </div>
      )}
    </div>
  );
}

function BackFace({ word }: { word: Word }) {
  const synonyms =
    Array.isArray(word.synonyms) && word.synonyms.length > 0
      ? word.synonyms
      : [];

  return (
    <div className="m-auto w-full max-w-[720px]">
      <div className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground mb-2">
        Definition
      </div>
      <p className="text-xl sm:text-2xl font-semibold leading-snug text-foreground">
        {word.definition}
      </p>

      {synonyms.length > 0 && (
        <div className="mt-7">
          <div className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground mb-2">
            Synonyms
          </div>
          <div className="flex flex-wrap gap-2">
            {synonyms.map((s) => (
              <span
                key={s}
                className="px-3 py-1.5 rounded-full text-sm font-medium border border-border bg-muted/40 text-foreground"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Exit confirmation ──────────────────────────────────────────────────────

function ExitConfirm({
  onCancel,
  onConfirm,
}: {
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onCancel}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-2xl border border-border bg-card shadow-xl overflow-hidden"
      >
        <div className="p-5 flex items-start gap-3 border-b border-border">
          <div className="h-10 w-10 rounded-xl bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-300 flex items-center justify-center shrink-0">
            <AlertTriangle size={18} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-base">Leave review session?</div>
            <p className="text-sm text-muted-foreground mt-1">
              Progress for reviewed cards will be saved.
            </p>
          </div>
          <button
            onClick={onCancel}
            className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>
        <div className="p-4 flex justify-end gap-2 bg-muted/30">
          <button
            onClick={onCancel}
            className="h-10 px-4 rounded-xl text-sm font-medium border border-border bg-card hover:bg-muted"
          >
            Stay in session
          </button>
          <button
            onClick={onConfirm}
            className="h-10 px-4 rounded-xl text-sm font-semibold btn-brand"
          >
            Leave
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Empty / complete state ─────────────────────────────────────────────────

function EmptyOrComplete({
  title,
  message,
  primaryLabel,
  onPrimary,
}: {
  title: string;
  message: string;
  primaryLabel: string;
  onPrimary: () => void;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <div className="sticky top-0 z-10 bg-card/80 backdrop-blur border-b border-border">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-3">
          <button
            onClick={onPrimary}
            aria-label="Back to Review Center"
            className="p-2 rounded-xl hover:bg-muted text-muted-foreground shrink-0"
          >
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-base sm:text-lg font-bold">{title}</h1>
        </div>
      </div>
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-md text-center rounded-2xl border border-border bg-card shadow-sm p-8">
          <div className="mx-auto h-12 w-12 rounded-2xl bg-brand-gradient text-white flex items-center justify-center mb-4">
            <Sparkles size={20} />
          </div>
          <h2 className="text-lg font-bold">Session complete</h2>
          <p className="mt-2 text-sm text-muted-foreground">{message}</p>
          <button
            onClick={onPrimary}
            className="mt-5 h-11 px-5 rounded-xl text-sm font-semibold btn-brand inline-flex items-center gap-2"
          >
            {primaryLabel}
          </button>
        </div>
      </main>
    </div>
  );
}

// ─── Completion screen with rating breakdown ────────────────────────────────

function CompletionScreen({
  title,
  total,
  ratings,
  ratingCounts,
  elapsed,
  timerEnabled,
  onBack,
}: {
  title: string;
  total: number;
  ratings: RatingEntry[];
  ratingCounts: Record<RatingValue, number>;
  elapsed: number;
  timerEnabled: boolean;
  onBack: () => void;
}) {
  const rated = ratings.length;
  const skipped = Math.max(0, total - rated);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <div className="sticky top-0 z-10 bg-card/80 backdrop-blur border-b border-border">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-3">
          <button
            onClick={onBack}
            aria-label="Back to Review Center"
            className="p-2 rounded-xl hover:bg-muted text-muted-foreground shrink-0"
          >
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-base sm:text-lg font-bold">{title}</h1>
        </div>
      </div>

      <main className="flex-1 px-4 py-8 sm:py-12">
        <div className="max-w-[640px] mx-auto">
          {/* Hero */}
          <div className="text-center rounded-3xl border border-border bg-card shadow-sm p-6 sm:p-8">
            <div className="mx-auto h-12 w-12 rounded-2xl bg-brand-gradient text-white flex items-center justify-center mb-4">
              <Sparkles size={20} />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold">
              Nice work — session complete
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              You rated{" "}
              <span className="font-semibold text-foreground">{rated}</span> of{" "}
              <span className="font-semibold text-foreground">{total}</span>{" "}
              card{total === 1 ? "" : "s"}
              {skipped > 0 ? (
                <>
                  {" "}· <span className="font-semibold">{skipped}</span> skipped
                </>
              ) : null}
              {timerEnabled ? (
                <>
                  {" "}· <span className="font-semibold tabular-nums">{formatClock(elapsed)}</span>
                </>
              ) : null}
              .
            </p>
          </div>

          {/* Rating breakdown */}
          <div className="mt-6 rounded-2xl border border-border bg-card shadow-sm p-5 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold">Rating breakdown</h3>
              <span className="text-[11px] text-muted-foreground">
                Placeholder intervals
              </span>
            </div>
            <ul className="space-y-2">
              {RATINGS.map((r) => {
                const count = ratingCounts[r.value];
                const pct = rated > 0 ? (count / rated) * 100 : 0;
                return (
                  <li
                    key={r.value}
                    className="flex items-center gap-3 rounded-xl border border-border bg-background/50 px-3 py-2"
                  >
                    <span className={`h-2.5 w-2.5 rounded-full ${r.dotCls}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className={`text-sm font-bold ${r.textCls}`}>
                          {r.label}
                        </span>
                        <span className="text-xs text-muted-foreground tabular-nums">
                          {count} · {intervalLabel(r.intervalDays)}
                        </span>
                      </div>
                      <div className="mt-1.5 h-1.5 rounded-full bg-muted overflow-hidden">
                        <div
                          className={`h-full ${r.dotCls} rounded-full transition-all`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="mt-4 rounded-xl border border-dashed border-border bg-muted/20 p-3 text-[11px] text-muted-foreground flex items-center gap-2">
              <Sparkles size={12} className="shrink-0" />
              The full Review Result page (with progress impact and next due
              dates) lands in a later phase.
            </div>
          </div>

          {/* Action */}
          <div className="mt-6 flex justify-center">
            <button
              onClick={onBack}
              className="h-11 px-5 rounded-xl text-sm font-semibold btn-brand inline-flex items-center gap-2"
            >
              Back to Review Center
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
