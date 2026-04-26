export interface StoryAttempt {
  score: number;
  total: number;
  attemptedAt: number;
}

const STORAGE_KEY = "gre_story_attempts";

export const STORY_MASTERY_THRESHOLD = 0.8;

export function attemptKey(day: number, group: number): string {
  return `${day}-${group}`;
}

export function getAllAttempts(): Record<string, StoryAttempt> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      return parsed as Record<string, StoryAttempt>;
    }
    return {};
  } catch {
    return {};
  }
}

export function getAttempt(
  day: number,
  group: number,
): StoryAttempt | null {
  return getAllAttempts()[attemptKey(day, group)] ?? null;
}

export function recordAttempt(
  day: number,
  group: number,
  attempt: StoryAttempt,
): void {
  if (typeof window === "undefined") return;
  try {
    const all = getAllAttempts();
    all[attemptKey(day, group)] = attempt;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  } catch {
    /* ignore quota / serialization errors */
  }
}

export type StoryStatus = "unpracticed" | "needs-review" | "mastered";

export function statusForAttempt(
  attempt: StoryAttempt | null | undefined,
): StoryStatus {
  if (!attempt || attempt.total <= 0) return "unpracticed";
  return attempt.score / attempt.total >= STORY_MASTERY_THRESHOLD
    ? "mastered"
    : "needs-review";
}
