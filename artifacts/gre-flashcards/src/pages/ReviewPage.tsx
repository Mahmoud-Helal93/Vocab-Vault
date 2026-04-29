import { useMemo, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useApp } from "@/context/AppContext";
import {
  TOTAL_BELTS,
  MISSIONS_PER_BELT,
  BELT_NAMES,
  missionsForBelt,
} from "@/lib/wordSelection";
import { TOTAL_DAYS } from "@/data/words";
import {
  RotateCcw,
  Brain,
  ChevronLeft,
  ChevronRight,
  Layers,
  Shuffle,
  Timer,
  Play,
  Sparkles,
  Filter,
  ListOrdered,
  AlertTriangle,
  X,
  Trash2,
} from "lucide-react";
import type {
  ReviewSessionConfig,
  ReviewMode,
  CardMode,
  ShuffleMode,
  SmartFilter,
  SmartSize,
} from "@/pages/ReviewSession";
import {
  loadReviewCards,
  loadResumeSession,
  clearResumeSession,
  isDue as isCardDue,
  isNew as isCardNew,
  isWeak as isCardWeak,
  type ResumeSessionRecord,
} from "@/lib/reviewSrs";

interface ReviewPageProps {
  onNavigate: (page: string, params?: Record<string, unknown>) => void;
}

const WORDS_PER_MISSION = 30;
const WORDS_PER_BELT = MISSIONS_PER_BELT * WORDS_PER_MISSION; // 210
const LARGE_SESSION_THRESHOLD = 300;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function estimateMinutes(cardCount: number): { lo: number; hi: number } {
  // ~10–14 sec/card. We always guarantee `hi > lo` so the range is meaningful
  // and we never collapse a 1260-card session to a 0-minute display.
  if (cardCount <= 0) return { lo: 0, hi: 0 };
  const loRaw = (cardCount * 10) / 60;
  const hiRaw = (cardCount * 14) / 60;
  const loExact = Math.max(1, Math.round(loRaw));
  const hiExact = Math.max(loExact + 1, Math.round(hiRaw));
  // Tidy big sessions to the nearest 5 minutes (without collapsing the range).
  if (cardCount >= 100) {
    const round5 = (n: number) => Math.max(5, Math.round(n / 5) * 5);
    const lo = round5(loExact);
    const hi = Math.max(lo + 5, round5(hiExact));
    return { lo, hi };
  }
  return { lo: loExact, hi: hiExact };
}

function formatTimeRange(cardCount: number): string {
  if (cardCount <= 0) return "—";
  const { lo, hi } = estimateMinutes(cardCount);
  return `${lo}–${hi} min`;
}

function smartSizeToNumber(size: SmartSize, custom: number, pool: number): number {
  if (size === "all") return pool;
  if (size === "custom") return Math.max(0, Math.min(custom, pool));
  return Math.min(parseInt(size, 10), pool);
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ReviewPage({ onNavigate }: ReviewPageProps) {
  const { words } = useApp();

  // Mode + selections
  const [reviewMode, setReviewMode] = useState<ReviewMode>("cumulative");
  const [cumulativeMission, setCumulativeMission] = useState<number>(1);
  const [smartBelt, setSmartBelt] = useState<number>(1);
  const [smartFilter, setSmartFilter] = useState<SmartFilter>("due");
  const [smartSize, setSmartSize] = useState<SmartSize>("all");
  const [smartCustomSize, setSmartCustomSize] = useState<number>(20);

  // Card / options
  const [cardMode, setCardMode] = useState<CardMode>("front");
  const [shuffleMode, setShuffleMode] = useState<ShuffleMode>("within-mission");
  const [shuffleTouched, setShuffleTouched] = useState(false);
  const [timerEnabled, setTimerEnabled] = useState(false);

  // Confirmation
  const [confirmOpen, setConfirmOpen] = useState(false);

  // Resume session (read from localStorage). Bumping `resumeVersion` forces a
  // re-read after Discard or after returning from a session that completed.
  const [resumeVersion, setResumeVersion] = useState(0);
  const resume: ResumeSessionRecord | null = useMemo(
    () => loadResumeSession(),
    [resumeVersion],
  );

  // Re-check the resume snapshot whenever the tab regains focus — after the
  // user returns from a finished session, the storage key will be cleared.
  useEffect(() => {
    const onFocus = () => setResumeVersion((v) => v + 1);
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, []);

  const discardResume = useCallback(() => {
    clearResumeSession();
    setResumeVersion((v) => v + 1);
  }, []);

  const resumeSession = useCallback(() => {
    if (!resume) return;
    onNavigate("review-session", {
      config: resume.config as unknown as ReviewSessionConfig,
      resume,
    });
  }, [resume, onNavigate]);

  // Apply default shuffle per mode if user hasn't touched it.
  const effectiveShuffle: ShuffleMode = shuffleTouched
    ? shuffleMode
    : reviewMode === "cumulative"
      ? "within-mission"
      : "within-all";

  // ── Cumulative summary ──
  const cumulativeWordCount = cumulativeMission * WORDS_PER_MISSION;

  // ── Smart Review filter counts (computed from existing word data) ──
  const beltMissions = useMemo(() => missionsForBelt(smartBelt), [smartBelt]);
  const beltWords = useMemo(
    () => words.filter((w) => beltMissions.includes(w.day)),
    [words, beltMissions],
  );

  const filterCounts = useMemo(() => {
    const reviewCards = loadReviewCards();
    const now = new Date();

    let due = 0;
    let newDue = 0;
    let weak = 0;
    for (const w of beltWords) {
      const state = reviewCards[w.id];
      const dueNow = isCardDue(state, now);
      const newNow = isCardNew(state);
      if (dueNow) due += 1;
      if (newNow || dueNow) newDue += 1;
      if (isCardWeak(state)) weak += 1;
    }
    const all = beltWords.length || WORDS_PER_BELT;
    return { due, all, newDue, weak };
    // resumeVersion bump also re-counts after a session changes review states.
  }, [beltWords, resumeVersion]);

  const smartPool: number =
    smartFilter === "due"
      ? filterCounts.due
      : smartFilter === "all"
        ? filterCounts.all
        : smartFilter === "new-due"
          ? filterCounts.newDue
          : filterCounts.weak;

  const smartSessionCount = smartSizeToNumber(
    smartSize,
    smartCustomSize,
    smartPool,
  );

  const totalWords =
    reviewMode === "cumulative" ? cumulativeWordCount : smartSessionCount;

  const startDisabled = totalWords <= 0;

  // ── Start handler with large-session confirmation ──
  const handleStart = () => {
    if (startDisabled) return;
    if (totalWords >= LARGE_SESSION_THRESHOLD) {
      setConfirmOpen(true);
      return;
    }
    actuallyStart();
  };

  const actuallyStart = () => {
    setConfirmOpen(false);
    const config: ReviewSessionConfig = {
      mode: reviewMode,
      cumulativeMission:
        reviewMode === "cumulative" ? cumulativeMission : undefined,
      smartBelt: reviewMode === "smart" ? smartBelt : undefined,
      smartFilter: reviewMode === "smart" ? smartFilter : undefined,
      smartSize: reviewMode === "smart" ? smartSize : undefined,
      smartCustomSize:
        reviewMode === "smart" && smartSize === "custom"
          ? smartCustomSize
          : undefined,
      cardMode,
      shuffleMode: effectiveShuffle,
      timerEnabled,
    };
    onNavigate("review-session", { config });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border bg-card/60 backdrop-blur">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-2xl bg-brand-gradient text-white flex items-center justify-center shadow-sm">
              <RotateCcw size={20} strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                Review Center
              </h1>
              <p className="text-sm text-muted-foreground">
                Configure a focused review session — cumulative or
                spaced‑repetition smart review.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-6 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-6">
        {/* MAIN COLUMN */}
        <div className="space-y-6 min-w-0">
          {/* SECTION 1 — REVIEW MODE */}
          <SectionShell
            title="Review Mode"
            subtitle="Pick how cards are sourced for this session."
            icon={<Layers size={16} />}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <ModeCard
                active={reviewMode === "cumulative"}
                onClick={() => setReviewMode("cumulative")}
                icon={<Layers size={18} />}
                title="Cumulative Review"
                description="Review all words from Mission 1 up to your selected mission."
                badge="Classic"
              />
              <ModeCard
                active={reviewMode === "smart"}
                onClick={() => setReviewMode("smart")}
                icon={<Brain size={18} />}
                title="Smart Review"
                description="Review a selected belt using spaced repetition."
                badge="SM‑2"
              />
            </div>

            {/* Cumulative selector */}
            {reviewMode === "cumulative" && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 rounded-2xl border border-border bg-muted/30 p-4"
              >
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div>
                    <div className="text-sm font-semibold">Select mission</div>
                    <div className="text-xs text-muted-foreground">
                      You will review missions 1 → {cumulativeMission}.
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <IconBtn
                      ariaLabel="Previous mission"
                      onClick={() =>
                        setCumulativeMission((m) => Math.max(1, m - 1))
                      }
                      disabled={cumulativeMission <= 1}
                    >
                      <ChevronLeft size={16} />
                    </IconBtn>
                    <select
                      value={cumulativeMission}
                      onChange={(e) =>
                        setCumulativeMission(parseInt(e.target.value, 10))
                      }
                      className="h-9 min-w-[140px] rounded-xl border border-border bg-card px-3 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400/40"
                    >
                      {Array.from({ length: TOTAL_DAYS }, (_, i) => i + 1).map(
                        (n) => (
                          <option key={n} value={n}>
                            Mission {n}
                          </option>
                        ),
                      )}
                    </select>
                    <IconBtn
                      ariaLabel="Next mission"
                      onClick={() =>
                        setCumulativeMission((m) =>
                          Math.min(TOTAL_DAYS, m + 1),
                        )
                      }
                      disabled={cumulativeMission >= TOTAL_DAYS}
                    >
                      <ChevronRight size={16} />
                    </IconBtn>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2">
                  <MiniStat
                    label="Missions included"
                    value={`1–${cumulativeMission}`}
                  />
                  <MiniStat
                    label="Total missions"
                    value={String(cumulativeMission)}
                  />
                  <MiniStat
                    label="Total words"
                    value={cumulativeWordCount.toLocaleString()}
                  />
                </div>
              </motion.div>
            )}

            {/* Smart selector */}
            {reviewMode === "smart" && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 rounded-2xl border border-border bg-muted/30 p-4"
              >
                <div className="text-sm font-semibold mb-2">Select belt</div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {Array.from({ length: TOTAL_BELTS }, (_, i) => i + 1).map(
                    (b) => {
                      const active = smartBelt === b;
                      return (
                        <button
                          key={b}
                          onClick={() => setSmartBelt(b)}
                          className={`rounded-xl border px-3 py-2.5 text-left transition ${
                            active
                              ? "border-orange-400 bg-orange-50 dark:bg-orange-500/10 ring-1 ring-orange-400/40"
                              : "border-border bg-card hover:bg-muted"
                          }`}
                        >
                          <div className="text-[11px] uppercase tracking-wide text-muted-foreground">
                            Belt {b}
                          </div>
                          <div className="text-sm font-semibold">
                            {BELT_NAMES[b - 1]}
                          </div>
                        </button>
                      );
                    },
                  )}
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2">
                  <MiniStat
                    label="Selected belt"
                    value={BELT_NAMES[smartBelt - 1]}
                  />
                  <MiniStat
                    label="Missions"
                    value={`${beltMissions[0]}–${beltMissions[beltMissions.length - 1]}`}
                  />
                  <MiniStat
                    label="Total words"
                    value={String(WORDS_PER_BELT)}
                  />
                </div>

                {/* Smart filter */}
                <div className="mt-5">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <Filter size={14} className="text-muted-foreground" />
                    Source filter
                  </div>
                  <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <FilterRow
                      active={smartFilter === "due"}
                      onClick={() => setSmartFilter("due")}
                      label="Due cards only"
                      hint="Default · scheduled by SRS"
                      count={filterCounts.due}
                    />
                    <FilterRow
                      active={smartFilter === "all"}
                      onClick={() => setSmartFilter("all")}
                      label="All cards in belt"
                      hint="Every word in this belt"
                      count={filterCounts.all}
                    />
                    <FilterRow
                      active={smartFilter === "new-due"}
                      onClick={() => setSmartFilter("new-due")}
                      label="New + due cards"
                      hint="Unseen plus scheduled"
                      count={filterCounts.newDue}
                    />
                    <FilterRow
                      active={smartFilter === "weak"}
                      onClick={() => setSmartFilter("weak")}
                      label="Weak cards only"
                      hint="Low‑mastery words"
                      count={filterCounts.weak}
                    />
                  </div>
                </div>

                {/* Session size */}
                <div className="mt-5">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <ListOrdered size={14} className="text-muted-foreground" />
                    Session size
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {(
                      [
                        { id: "all", label: "Review all" },
                        { id: "20", label: "20" },
                        { id: "30", label: "30" },
                        { id: "50", label: "50" },
                        { id: "custom", label: "Custom" },
                      ] as Array<{ id: SmartSize; label: string }>
                    ).map((opt) => {
                      const active = smartSize === opt.id;
                      return (
                        <button
                          key={opt.id}
                          onClick={() => setSmartSize(opt.id)}
                          className={`px-3 h-9 rounded-xl text-sm font-medium border transition ${
                            active
                              ? "bg-foreground text-background border-foreground"
                              : "bg-card border-border hover:bg-muted"
                          }`}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                    {smartSize === "custom" && (
                      <input
                        type="number"
                        min={1}
                        max={Math.max(1, smartPool || WORDS_PER_BELT)}
                        value={smartCustomSize}
                        onChange={(e) => {
                          const raw = e.target.value;
                          const n = parseInt(raw, 10);
                          if (!Number.isFinite(n) || n < 1) {
                            setSmartCustomSize(1);
                          } else {
                            setSmartCustomSize(
                              Math.min(
                                n,
                                Math.max(1, smartPool || WORDS_PER_BELT),
                              ),
                            );
                          }
                        }}
                        className="h-9 w-24 rounded-xl border border-border bg-card px-3 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400/40"
                      />
                    )}
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Pool: {smartPool} card{smartPool === 1 ? "" : "s"} · Session:{" "}
                    {smartSessionCount} card
                    {smartSessionCount === 1 ? "" : "s"}
                  </p>
                </div>
              </motion.div>
            )}
          </SectionShell>

          {/* SECTION 2 — CARD MODE */}
          <SectionShell
            title="Card Mode"
            subtitle="Choose which side of the flashcard appears first."
            icon={<Sparkles size={16} />}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <CardModeOption
                active={cardMode === "front"}
                onClick={() => setCardMode("front")}
                title="Front First"
                front={["Word", "Part of Speech", "Arabic", "Pronunciation"]}
                back={["Definition", "Synonyms"]}
              />
              <CardModeOption
                active={cardMode === "back"}
                onClick={() => setCardMode("back")}
                title="Back First"
                front={["Definition", "Synonyms"]}
                back={["Word", "Part of Speech", "Arabic", "Pronunciation"]}
              />
            </div>
          </SectionShell>

          {/* SECTION 3 — REVIEW OPTIONS */}
          <SectionShell
            title="Review Options"
            subtitle="Tune shuffle behavior and the timer."
            icon={<Shuffle size={16} />}
          >
            <div className="space-y-5">
              <div>
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div>
                    <div className="text-sm font-semibold">Shuffle words</div>
                    <div className="text-xs text-muted-foreground">
                      {effectiveShuffle === "within-mission"
                        ? "Mission order is preserved · words shuffled inside each mission."
                        : "All selected words are shuffled together."}
                    </div>
                  </div>
                  <Segmented
                    value={effectiveShuffle}
                    onChange={(v) => {
                      setShuffleMode(v as ShuffleMode);
                      setShuffleTouched(true);
                    }}
                    options={[
                      { value: "within-mission", label: "Within each mission" },
                      { value: "within-all", label: "Within all missions" },
                    ]}
                  />
                </div>
              </div>

              <div className="border-t border-border pt-5">
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div className="flex items-start gap-3">
                    <div className="h-9 w-9 rounded-xl bg-muted text-muted-foreground flex items-center justify-center">
                      <Timer size={16} />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">Timer</div>
                      <div className="text-xs text-muted-foreground">
                        Track time spent during the review session.
                      </div>
                    </div>
                  </div>
                  <ToggleSwitch
                    checked={timerEnabled}
                    onChange={setTimerEnabled}
                    label="Timer"
                  />
                </div>
              </div>
            </div>
          </SectionShell>

          {/* Resume previous review */}
          {resume ? (
            <ResumeCard
              resume={resume}
              onResume={resumeSession}
              onDiscard={discardResume}
            />
          ) : (
            <div className="rounded-2xl border border-dashed border-border bg-muted/20 p-4 flex items-center gap-3 text-sm text-muted-foreground">
              <RotateCcw size={16} className="shrink-0" />
              <div>
                <span className="font-medium text-foreground">
                  Resume previous review
                </span>{" "}
                · No paused session. If you leave a session mid‑way, it will
                appear here so you can pick up where you left off.
              </div>
            </div>
          )}
        </div>

        {/* RIGHT SIDEBAR — REVIEW SUMMARY */}
        <aside className="lg:sticky lg:top-6 self-start">
          <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-border bg-brand-gradient-soft">
              <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Review Summary
              </div>
              <div className="mt-1 text-lg font-bold">
                {reviewMode === "cumulative"
                  ? "Cumulative Review"
                  : "Smart Review"}
              </div>
            </div>
            <div className="p-5 space-y-3 text-sm">
              {reviewMode === "cumulative" ? (
                <>
                  <SummaryRow
                    label="Selected mission"
                    value={`Mission ${cumulativeMission}`}
                  />
                  <SummaryRow
                    label="Missions included"
                    value={`1–${cumulativeMission}`}
                  />
                  <SummaryRow
                    label="Words included"
                    value={cumulativeWordCount.toLocaleString()}
                  />
                </>
              ) : (
                <>
                  <SummaryRow
                    label="Selected belt"
                    value={`${BELT_NAMES[smartBelt - 1]} (Belt ${smartBelt})`}
                  />
                  <SummaryRow
                    label="Missions included"
                    value={`${beltMissions[0]}–${beltMissions[beltMissions.length - 1]}`}
                  />
                  <SummaryRow
                    label="Words in belt"
                    value={String(WORDS_PER_BELT)}
                  />
                  <SummaryRow
                    label="Filter"
                    value={
                      smartFilter === "due"
                        ? "Due cards only"
                        : smartFilter === "all"
                          ? "All cards in belt"
                          : smartFilter === "new-due"
                            ? "New + due cards"
                            : "Weak cards only"
                    }
                  />
                  <SummaryRow
                    label="Session size"
                    value={
                      smartSize === "all"
                        ? "All available"
                        : smartSize === "custom"
                          ? `${smartCustomSize} (custom)`
                          : smartSize
                    }
                  />
                  <SummaryRow
                    label="Words this session"
                    value={String(smartSessionCount)}
                  />
                </>
              )}

              <div className="border-t border-border my-2" />

              <SummaryRow
                label="Card mode"
                value={cardMode === "front" ? "Front First" : "Back First"}
              />
              <SummaryRow
                label="Shuffle"
                value={
                  effectiveShuffle === "within-mission"
                    ? "Within each mission"
                    : "Within all missions"
                }
              />
              <SummaryRow
                label="Timer"
                value={timerEnabled ? "On" : "Off"}
              />

              <div className="border-t border-border my-2" />

              <SummaryRow
                label="Estimated time"
                value={formatTimeRange(totalWords)}
                strong
              />
            </div>

            <div className="p-5 pt-0">
              <button
                onClick={handleStart}
                disabled={startDisabled}
                className={`w-full h-11 rounded-xl font-semibold flex items-center justify-center gap-2 transition ${
                  startDisabled
                    ? "bg-muted text-muted-foreground cursor-not-allowed"
                    : "btn-brand"
                }`}
              >
                <Play size={16} />
                Start Review
              </button>
              {totalWords >= LARGE_SESSION_THRESHOLD && !startDisabled && (
                <p className="mt-2 text-[11px] text-muted-foreground flex items-center gap-1.5">
                  <AlertTriangle size={12} className="text-amber-500" />
                  Large session — you'll be asked to confirm.
                </p>
              )}
            </div>
          </div>
        </aside>
      </div>

      {/* Large session confirmation */}
      {confirmOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setConfirmOpen(false)}
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
                <div className="font-semibold text-base">
                  Large review session
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  You are about to review{" "}
                  <span className="font-semibold text-foreground">
                    {totalWords.toLocaleString()} words
                  </span>
                  . This may take{" "}
                  <span className="font-semibold text-foreground">
                    {formatTimeRange(totalWords)}
                  </span>
                  . Continue?
                </p>
              </div>
              <button
                onClick={() => setConfirmOpen(false)}
                className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground"
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>
            <div className="p-4 flex justify-end gap-2 bg-muted/30">
              <button
                onClick={() => setConfirmOpen(false)}
                className="h-10 px-4 rounded-xl text-sm font-medium border border-border bg-card hover:bg-muted"
              >
                Cancel
              </button>
              <button
                onClick={actuallyStart}
                className="h-10 px-4 rounded-xl text-sm font-semibold btn-brand"
              >
                Yes, start review
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function SectionShell({
  title,
  subtitle,
  icon,
  children,
}: {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-border bg-card shadow-sm">
      <header className="px-5 py-4 border-b border-border flex items-center gap-3">
        <div className="h-8 w-8 rounded-xl bg-muted text-foreground flex items-center justify-center">
          {icon}
        </div>
        <div className="min-w-0">
          <h2 className="text-base font-semibold leading-tight">{title}</h2>
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        </div>
      </header>
      <div className="p-5">{children}</div>
    </section>
  );
}

function ModeCard({
  active,
  onClick,
  icon,
  title,
  description,
  badge,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  title: string;
  description: string;
  badge?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`text-left rounded-2xl border p-4 transition shadow-sm ${
        active
          ? "border-orange-400 bg-orange-50/60 dark:bg-orange-500/10 ring-1 ring-orange-400/40"
          : "border-border bg-card hover:bg-muted"
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${
            active
              ? "bg-brand-gradient text-white"
              : "bg-muted text-foreground"
          }`}
        >
          {icon}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <div className="font-semibold">{title}</div>
            {badge && (
              <span className="text-[10px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded-md bg-muted text-muted-foreground">
                {badge}
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </button>
  );
}

function CardModeOption({
  active,
  onClick,
  title,
  front,
  back,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  front: string[];
  back: string[];
}) {
  return (
    <button
      onClick={onClick}
      className={`text-left rounded-2xl border p-4 transition shadow-sm ${
        active
          ? "border-orange-400 bg-orange-50/60 dark:bg-orange-500/10 ring-1 ring-orange-400/40"
          : "border-border bg-card hover:bg-muted"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="font-semibold">{title}</div>
        {active && (
          <span className="text-[10px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded-md bg-brand-gradient text-white">
            Selected
          </span>
        )}
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <MiniSide label="First side" items={front} highlight />
        <MiniSide label="After flip" items={back} />
      </div>
    </button>
  );
}

function MiniSide({
  label,
  items,
  highlight,
}: {
  label: string;
  items: string[];
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border p-3 ${
        highlight
          ? "border-border bg-card"
          : "border-border bg-muted/40"
      }`}
    >
      <div className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </div>
      <ul className="mt-1.5 space-y-0.5 text-[11px] text-foreground">
        {items.map((it) => (
          <li key={it} className="flex items-center gap-1.5">
            <span className="h-1 w-1 rounded-full bg-orange-400" />
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-card px-3 py-2">
      <div className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </div>
      <div className="text-sm font-bold mt-0.5 truncate">{value}</div>
    </div>
  );
}

function FilterRow({
  active,
  onClick,
  label,
  hint,
  count,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  hint: string;
  count: number;
}) {
  return (
    <button
      onClick={onClick}
      className={`text-left rounded-xl border px-3 py-2.5 flex items-center justify-between gap-3 transition ${
        active
          ? "border-orange-400 bg-orange-50/60 dark:bg-orange-500/10 ring-1 ring-orange-400/40"
          : "border-border bg-card hover:bg-muted"
      }`}
    >
      <div className="min-w-0">
        <div className="text-sm font-semibold truncate">{label}</div>
        <div className="text-[11px] text-muted-foreground truncate">{hint}</div>
      </div>
      <div
        className={`shrink-0 rounded-md px-2 py-0.5 text-xs font-bold ${
          active
            ? "bg-orange-500 text-white"
            : "bg-muted text-muted-foreground"
        }`}
      >
        {count}
      </div>
    </button>
  );
}

function Segmented<T extends string>({
  value,
  onChange,
  options,
}: {
  value: T;
  onChange: (v: T) => void;
  options: Array<{ value: T; label: string }>;
}) {
  return (
    <div className="inline-flex p-0.5 rounded-xl border border-border bg-muted/50">
      {options.map((opt) => {
        const active = value === opt.value;
        return (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={`h-8 px-3 rounded-lg text-xs font-semibold transition ${
              active
                ? "bg-card text-foreground shadow-sm border border-border"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

function ToggleSwitch({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-11 rounded-full transition-colors ${
        checked ? "bg-brand-gradient" : "bg-muted"
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
          checked ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}

function IconBtn({
  children,
  onClick,
  disabled,
  ariaLabel,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  ariaLabel: string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className="h-9 w-9 rounded-xl border border-border bg-card text-foreground flex items-center justify-center hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed"
    >
      {children}
    </button>
  );
}

function SummaryRow({
  label,
  value,
  strong,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span
        className={`text-sm ${strong ? "font-bold text-foreground" : "font-semibold text-foreground"} text-right truncate`}
      >
        {value}
      </span>
    </div>
  );
}

// ─── Resume previous review ────────────────────────────────────────────────

function ResumeCard({
  resume,
  onResume,
  onDiscard,
}: {
  resume: ResumeSessionRecord;
  onResume: () => void;
  onDiscard: () => void;
}) {
  const total = resume.orderedWordIds.length;
  const done = Math.min(resume.index, total);
  const remaining = Math.max(0, total - done);
  const cfg = resume.config as Record<string, unknown>;
  const mode = (cfg.mode as ReviewMode) ?? "smart";
  const titleMode =
    mode === "cumulative" ? "Cumulative Review" : "Smart Review";

  // Friendly scope label
  let scope = "";
  if (mode === "cumulative") {
    scope = `Missions 1–${cfg.cumulativeMission ?? "?"}`;
  } else {
    const beltNum = (cfg.smartBelt as number) ?? 1;
    scope = `Belt ${beltNum} · ${BELT_NAMES[beltNum - 1] ?? ""}`;
  }

  // Saved time (relative)
  const savedAgo = (() => {
    try {
      const ms = Date.now() - new Date(resume.savedAt).getTime();
      const min = Math.max(1, Math.round(ms / 60000));
      if (min < 60) return `${min} min ago`;
      const hr = Math.round(min / 60);
      if (hr < 24) return `${hr} hr ago`;
      const day = Math.round(hr / 24);
      return `${day} day${day === 1 ? "" : "s"} ago`;
    } catch {
      return "recently";
    }
  })();

  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-orange-300/70 dark:border-orange-500/40 bg-brand-gradient-soft shadow-sm p-4 sm:p-5"
    >
      <div className="flex items-start gap-3">
        <div className="h-10 w-10 rounded-2xl bg-brand-gradient text-white flex items-center justify-center shadow-sm shrink-0">
          <RotateCcw size={18} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <div className="text-sm font-bold">Resume previous review</div>
            <span className="text-[10px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded-md bg-card border border-border text-muted-foreground">
              {titleMode}
            </span>
          </div>
          <div className="text-xs text-muted-foreground mt-0.5 truncate">
            {scope} · paused {savedAgo}
          </div>
          <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
            <span>
              <span className="font-semibold text-foreground tabular-nums">
                {done}
              </span>
              /{total} done
            </span>
            <span className="text-muted-foreground/60">·</span>
            <span>
              <span className="font-semibold text-foreground tabular-nums">
                {remaining}
              </span>{" "}
              left
            </span>
          </div>
          <div className="mt-2 h-1.5 rounded-full bg-card border border-border overflow-hidden">
            <div
              className="h-full bg-brand-gradient transition-all"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 flex-wrap">
        <button
          onClick={onResume}
          className="h-10 px-4 rounded-xl text-sm font-semibold btn-brand inline-flex items-center gap-2"
        >
          <Play size={14} />
          Resume previous review
        </button>
        <button
          onClick={onDiscard}
          className="h-10 px-3 rounded-xl text-sm font-medium border border-border bg-card hover:bg-muted text-muted-foreground inline-flex items-center gap-2"
        >
          <Trash2 size={14} />
          Discard saved review
        </button>
      </div>
    </motion.div>
  );
}
