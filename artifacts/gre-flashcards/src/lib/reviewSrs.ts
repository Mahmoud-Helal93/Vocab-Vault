// ─────────────────────────────────────────────────────────────────────────────
// Review-tab SM-2 (Phase 4)
//
// This module owns the per-word "review card" state used by the Review tab
// (Smart Review scheduling, due dates, lapses). It is intentionally separate
// from `lib/srs.ts`, which schedules the broader Word object used by
// Learn/Test. Keeping them apart means rating a card here cannot accidentally
// disturb mastery progression elsewhere.
// ─────────────────────────────────────────────────────────────────────────────

export type RatingValue = 1 | 2 | 3 | 4 | 5;
export type RatingLabel = "again" | "hard" | "good" | "easy" | "perfect";

export const RATING_LABELS: Record<RatingValue, RatingLabel> = {
  1: "again",
  2: "hard",
  3: "good",
  4: "easy",
  5: "perfect",
};

export interface RatingHistoryEntry {
  rating: RatingValue;
  label: RatingLabel;
  reviewedAt: string;
}

export interface ReviewCardState {
  wordId: string;
  repetitions: number;
  interval: number; // in days
  easeFactor: number;
  dueDate: string; // ISO
  lastReviewedAt?: string;
  ratingHistory: RatingHistoryEntry[];
  lapses: number;
}

export const REVIEW_CARDS_KEY = "gre_review_cards";

const MIN_EASE = 1.3;
const STARTING_EASE = 2.5;
const MAX_INTERVAL_DAYS = 365;
const WEAK_RECENT_WINDOW = 3;

// ─── Storage helpers ────────────────────────────────────────────────────────

export function loadReviewCards(): Record<string, ReviewCardState> {
  try {
    const raw = localStorage.getItem(REVIEW_CARDS_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<string, ReviewCardState>;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

export function saveReviewCards(map: Record<string, ReviewCardState>): void {
  try {
    localStorage.setItem(REVIEW_CARDS_KEY, JSON.stringify(map));
  } catch {
    /* ignore */
  }
}

export function getReviewState(wordId: string): ReviewCardState | undefined {
  return loadReviewCards()[wordId];
}

// ─── SM-2-style scheduling ──────────────────────────────────────────────────

function startOfDay(d: Date): Date {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function addDaysIso(now: Date, days: number): string {
  const d = new Date(now);
  d.setDate(d.getDate() + Math.max(0, days));
  return d.toISOString();
}

/**
 * Compute the next ReviewCardState for a word given a rating.
 *
 * The rating mapping is:
 *   1 = Again   → reset, +1 lapse, due tomorrow
 *   2 = Hard    → small bump, ease drops a little
 *   3 = Good    → standard SM-2 progression
 *   4 = Easy    → bigger bump, ease rises slightly
 *   5 = Perfect → biggest bump, ease rises more
 */
export function applyRating(
  prev: ReviewCardState | undefined,
  wordId: string,
  rating: RatingValue,
  now: Date = new Date(),
): ReviewCardState {
  const base: ReviewCardState = prev ?? {
    wordId,
    repetitions: 0,
    interval: 0,
    easeFactor: STARTING_EASE,
    dueDate: now.toISOString(),
    ratingHistory: [],
    lapses: 0,
  };

  let { repetitions, interval, easeFactor, lapses } = base;

  if (rating === 1) {
    // Again — short lapse, reset learning streak.
    lapses += 1;
    repetitions = 0;
    interval = 1;
    easeFactor = Math.max(MIN_EASE, easeFactor - 0.2);
  } else if (rating === 2) {
    // Hard — small step, ease dips.
    if (repetitions === 0) {
      interval = 1;
    } else {
      interval = Math.max(1, Math.round(interval * 1.2));
    }
    repetitions += 1;
    easeFactor = Math.max(MIN_EASE, easeFactor - 0.15);
  } else if (rating === 3) {
    // Good — classic SM-2 progression.
    if (repetitions === 0) interval = 1;
    else if (repetitions === 1) interval = 6;
    else interval = Math.round(interval * easeFactor);
    repetitions += 1;
    // ease unchanged
  } else if (rating === 4) {
    // Easy — longer interval, slight ease bonus.
    if (repetitions === 0) interval = 4;
    else if (repetitions === 1) interval = 10;
    else interval = Math.round(interval * easeFactor * 1.3);
    repetitions += 1;
    easeFactor = Math.min(easeFactor + 0.1, 3.0);
  } else {
    // 5 = Perfect — longest interval, larger ease bonus.
    if (repetitions === 0) interval = 7;
    else if (repetitions === 1) interval = 15;
    else interval = Math.round(interval * easeFactor * 1.5);
    repetitions += 1;
    easeFactor = Math.min(easeFactor + 0.15, 3.0);
  }

  interval = Math.max(1, Math.min(interval, MAX_INTERVAL_DAYS));

  const dueDate = addDaysIso(startOfDay(now), interval);
  const lastReviewedAt = now.toISOString();

  const history: RatingHistoryEntry[] = [
    ...base.ratingHistory,
    { rating, label: RATING_LABELS[rating], reviewedAt: lastReviewedAt },
  ].slice(-50);

  return {
    wordId,
    repetitions,
    interval,
    easeFactor,
    dueDate,
    lastReviewedAt,
    ratingHistory: history,
    lapses,
  };
}

/** Apply a rating and persist it. Returns the new state. */
export function recordRating(
  wordId: string,
  rating: RatingValue,
  now: Date = new Date(),
): ReviewCardState {
  const map = loadReviewCards();
  const next = applyRating(map[wordId], wordId, rating, now);
  map[wordId] = next;
  saveReviewCards(map);
  return next;
}

/** Preview the interval (in days) a rating *would* produce, without saving. */
export function previewIntervalDays(
  prev: ReviewCardState | undefined,
  rating: RatingValue,
): number {
  return applyRating(prev, prev?.wordId ?? "_preview_", rating).interval;
}

// ─── Filter predicates used by Smart Review ────────────────────────────────

/** A card with no review state (never reviewed in the Review tab). */
export function isNew(state: ReviewCardState | undefined): boolean {
  return !state || (state.repetitions === 0 && state.ratingHistory.length === 0);
}

/** Due if dueDate <= end-of-today. New cards count as not due here. */
export function isDue(
  state: ReviewCardState | undefined,
  now: Date = new Date(),
): boolean {
  if (!state) return false;
  const endOfToday = startOfDay(now);
  endOfToday.setDate(endOfToday.getDate() + 1);
  return new Date(state.dueDate).getTime() < endOfToday.getTime();
}

/**
 * Weak = has any lapse, OR any of the last `WEAK_RECENT_WINDOW` ratings was
 * Again/Hard. New cards are never weak.
 */
export function isWeak(state: ReviewCardState | undefined): boolean {
  if (!state) return false;
  if (state.lapses > 0) return true;
  const recent = state.ratingHistory.slice(-WEAK_RECENT_WINDOW);
  return recent.some((r) => r.rating <= 2);
}

// ─── Pause / Resume storage ────────────────────────────────────────────────
//
// A resumable session captures everything needed to drop the user back into
// the same flashcard, in the same order, with the same ratings and timer
// already applied. The shape is intentionally serialisable.
// ─────────────────────────────────────────────────────────────────────────────

export const RESUME_SESSION_KEY = "gre_review_resume_session";

export interface ResumeRatingEntry {
  wordId: string;
  rating: RatingValue;
  label: string; // "Again" | "Hard" | "Good" | "Easy" | "Perfect"
  reviewedAt: string;
  cardMode: "front" | "back";
  reviewMode: "cumulative" | "smart";
}

// We keep the config payload loose here to avoid a circular import with
// ReviewSession (which owns the canonical ReviewSessionConfig type). The
// session page narrows it back when it reads the resume payload.
export interface ResumeSessionRecord {
  savedAt: string;
  startedAt: number; // Date.now() snapshot
  elapsedAtSave: number; // seconds
  config: Record<string, unknown>;
  orderedWordIds: string[];
  index: number;
  ratings: ResumeRatingEntry[];
}

export function loadResumeSession(): ResumeSessionRecord | null {
  try {
    const raw = localStorage.getItem(RESUME_SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ResumeSessionRecord;
    if (!parsed || typeof parsed !== "object") return null;
    if (!Array.isArray(parsed.orderedWordIds)) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveResumeSession(record: ResumeSessionRecord): void {
  try {
    localStorage.setItem(RESUME_SESSION_KEY, JSON.stringify(record));
  } catch {
    /* ignore */
  }
}

export function clearResumeSession(): void {
  try {
    localStorage.removeItem(RESUME_SESSION_KEY);
  } catch {
    /* ignore */
  }
}
