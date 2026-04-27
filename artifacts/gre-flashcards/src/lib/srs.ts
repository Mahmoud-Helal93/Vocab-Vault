import {
  Word,
  MasteryLevel,
  ConfidenceTag,
  PerformanceByType,
} from "@/data/words";

// ─────────────────────────────────────────────────────────────────────────────
// Adaptive review tuning constants
// ─────────────────────────────────────────────────────────────────────────────

/** Below this response time (ms), a correct answer is treated as "fast". */
const FAST_RESPONSE_MS = 3_000;
/** Above this response time (ms), a correct answer is treated as "slow". */
const SLOW_RESPONSE_MS = 8_000;
/** Hard floor on the ease factor (matches classic SM-2). */
const MIN_EASE = 1.3;
/** Cap how far the next interval can stretch in days, to avoid runaway. */
const MAX_INTERVAL_DAYS = 365;

/** Question kinds that require typing or rich context — gate Mastered on these. */
const TYPED_OR_CONTEXT_KINDS = new Set<string>([
  "fill-blank",
  "def-to-word",
]);

/** Mastered requires this many distinct question kinds answered correctly. */
const MASTERED_DISTINCT_KINDS = 3;
/** Mastered requires this many lifetime correct attempts. */
const MASTERED_MIN_CORRECT = 5;
/** Mastered requires this overall accuracy at minimum. */
const MASTERED_MIN_ACCURACY = 0.85;
/** Mastered requires the interval to be this many days at minimum. */
const MASTERED_MIN_INTERVAL = 21;
/** Mastered requires this many of the recent quality entries to be ≥ 3. */
const MASTERED_RECENT_WINDOW = 5;
const MASTERED_RECENT_REQUIRED = 4;

// ─────────────────────────────────────────────────────────────────────────────
// Adaptive SM-2 — context-aware
// ─────────────────────────────────────────────────────────────────────────────

export interface ReviewContext {
  /** Time the learner spent answering, in ms. */
  responseTimeMs?: number;
  /** Confidence the learner reported alongside the answer. */
  confidence?: ConfidenceTag;
  /** The question kind this attempt belongs to (e.g. "fill-blank"). */
  questionKind?: string;
}

/**
 * Compute the next state for a word given an SM-2 quality rating and an
 * optional adaptive context. Returns a partial Word so the caller can merge.
 *
 * Adaptive rules layered on top of SM-2:
 *  - Wrong answer       → review soon (interval = 1, repetitions reset).
 *  - Slow correct       → review again soon (next interval halved, min 1).
 *  - Fast correct       → review later (small ease bonus).
 *  - Repeated correct   → exponential growth via SM-2 (unchanged).
 *  - Low-confidence ok  → still needs review (interval capped at ≤ 3 days).
 *  - Mastered promotion → only when multi-criterion bar is met (see below).
 */
export function calculateNextReview(
  word: Word,
  quality: number,
  context: ReviewContext = {},
): Partial<Word> {
  const isCorrect = quality >= 3;
  const now = new Date();
  const nowIso = now.toISOString();

  // ── Base SM-2 calculation ─────────────────────────────────────────────────
  let newEaseFactor: number;
  let newInterval: number;
  let newRepetitions: number;

  if (isCorrect) {
    newEaseFactor = Math.max(
      MIN_EASE,
      word.easeFactor + 0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02),
    );
    if (word.repetitions === 0) {
      newInterval = 1;
    } else if (word.repetitions === 1) {
      newInterval = 6;
    } else {
      newInterval = Math.round(word.interval * newEaseFactor);
    }
    newRepetitions = word.repetitions + 1;
  } else {
    // Wrong answer → review soon, EF unchanged, repetitions reset.
    newEaseFactor = word.easeFactor;
    newRepetitions = 0;
    newInterval = 1;
  }

  // ── Adaptive overrides based on response time and confidence ──────────────
  if (isCorrect) {
    if (
      typeof context.responseTimeMs === "number" &&
      context.responseTimeMs >= SLOW_RESPONSE_MS
    ) {
      // Slow correct → schedule sooner (don't trust this is solid yet).
      newInterval = Math.max(1, Math.round(newInterval / 2));
    } else if (
      typeof context.responseTimeMs === "number" &&
      context.responseTimeMs > 0 &&
      context.responseTimeMs <= FAST_RESPONSE_MS
    ) {
      // Fast correct → small ease bonus pushes future intervals out further.
      newEaseFactor = Math.min(newEaseFactor + 0.05, 3.0);
    }

    if (context.confidence === "guessed") {
      // Lucky guess — still needs review soon.
      newInterval = Math.min(newInterval, 3);
    } else if (context.confidence === "forgot") {
      // Reported "forgot" but we got here — treat conservatively.
      newInterval = 1;
    }
  }

  newInterval = Math.min(newInterval, MAX_INTERVAL_DAYS);

  const nextReviewDate = new Date(now);
  nextReviewDate.setDate(nextReviewDate.getDate() + newInterval);
  const nextReviewIso = nextReviewDate.toISOString();

  // ── Counters & rolling histories ──────────────────────────────────────────
  const correctAttempts = (word.correctAttempts ?? word.correctCount ?? 0) +
    (isCorrect ? 1 : 0);
  const wrongAttempts = (word.wrongAttempts ?? word.incorrectCount ?? 0) +
    (isCorrect ? 0 : 1);
  const totalAttempts = correctAttempts + wrongAttempts;
  const accuracy = totalAttempts > 0 ? correctAttempts / totalAttempts : 0;

  const newQualityHistory = [...(word.qualityHistory ?? []), quality].slice(-10);

  const newConfidenceHistory = context.confidence
    ? [...(word.confidenceHistory ?? []), context.confidence].slice(-10)
    : (word.confidenceHistory ?? []);

  // Rolling average response time (only when we got a sample).
  let avgResponseTimeMs = word.avgResponseTimeMs ?? 0;
  let responseTimeSamples = word.responseTimeSamples ?? 0;
  if (
    typeof context.responseTimeMs === "number" &&
    context.responseTimeMs > 0
  ) {
    const total = avgResponseTimeMs * responseTimeSamples + context.responseTimeMs;
    responseTimeSamples += 1;
    avgResponseTimeMs = Math.round(total / responseTimeSamples);
  }

  // Per-question-kind breakdown.
  const performanceByType: Record<string, PerformanceByType> = {
    ...(word.performanceByType ?? {}),
  };
  if (context.questionKind) {
    const prev = performanceByType[context.questionKind] ?? {
      attempts: 0,
      correct: 0,
      wrong: 0,
      avgMs: 0,
    };
    const nextAttempts = prev.attempts + 1;
    let nextAvg = prev.avgMs;
    if (
      typeof context.responseTimeMs === "number" &&
      context.responseTimeMs > 0
    ) {
      const totalMs = prev.avgMs * prev.attempts + context.responseTimeMs;
      nextAvg = Math.round(totalMs / nextAttempts);
    }
    performanceByType[context.questionKind] = {
      attempts: nextAttempts,
      correct: prev.correct + (isCorrect ? 1 : 0),
      wrong: prev.wrong + (isCorrect ? 0 : 1),
      avgMs: nextAvg,
    };
  }

  // Mistake counter & last-incorrect timestamp.
  const mistakeCount = (word.mistakeCount ?? word.incorrectCount ?? 0) +
    (isCorrect ? 0 : 1);
  const lastIncorrect = isCorrect ? (word.lastIncorrect ?? null) : nowIso;

  // Difficulty drift (kept in sync with the legacy `difficulty` integer).
  const newDifficulty = isCorrect
    ? Math.max((word.difficulty ?? 0) - 1, 0)
    : Math.min((word.difficulty ?? 0) + 1, 10);
  const isDifficult =
    newDifficulty >= 3 ||
    wrongAttempts >= 3 ||
    (word.isDifficult ?? false) && newDifficulty >= 2;

  // ── Mastery level & legacy status ─────────────────────────────────────────
  const masteryLevel = computeMasteryLevel({
    totalAttempts,
    correctAttempts,
    accuracy,
    repetitions: newRepetitions,
    interval: newInterval,
    qualityHistory: newQualityHistory,
    performanceByType,
    isCorrect,
    confidence: context.confidence,
    previousLevel: word.masteryLevel,
  });
  const status = legacyStatusFromMastery(masteryLevel, newInterval, newRepetitions);

  return {
    easeFactor: newEaseFactor,
    interval: newInterval,
    repetitions: newRepetitions,
    lastReviewed: nowIso,
    nextReview: nextReviewIso,
    nextReviewDate: nextReviewIso,
    status,
    masteryLevel,
    difficulty: newDifficulty,
    isDifficult,
    correctCount: correctAttempts,
    incorrectCount: wrongAttempts,
    correctAttempts,
    wrongAttempts,
    totalAttempts,
    accuracy,
    mistakeCount,
    qualityHistory: newQualityHistory,
    confidenceHistory: newConfidenceHistory,
    avgResponseTimeMs,
    responseTimeSamples,
    performanceByType,
    lastPracticed: nowIso,
    lastIncorrect,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Mastery-level classifier
// ─────────────────────────────────────────────────────────────────────────────

interface MasteryInputs {
  totalAttempts: number;
  correctAttempts: number;
  accuracy: number;
  repetitions: number;
  interval: number;
  qualityHistory: number[];
  performanceByType: Record<string, PerformanceByType>;
  isCorrect: boolean;
  confidence?: ConfidenceTag;
  previousLevel?: MasteryLevel;
}

/**
 * Decide a word's mastery level from its accumulated stats. The level only
 * reaches "mastered" when the learner has answered correctly across multiple
 * question types — including at least one typed/context-based kind — with
 * sustained accuracy and a long review interval.
 */
export function computeMasteryLevel(input: MasteryInputs): MasteryLevel {
  const {
    totalAttempts,
    correctAttempts,
    accuracy,
    repetitions,
    interval,
    qualityHistory,
    performanceByType,
    isCorrect,
    confidence,
    previousLevel,
  } = input;

  if (totalAttempts === 0) return "new";

  // Distinct kinds the learner has answered correctly at least once.
  const kindsCorrect = Object.entries(performanceByType).filter(
    ([, perf]) => perf.correct > 0,
  );
  const distinctKindsCorrect = kindsCorrect.length;
  const hasTypedOrContextCorrect = kindsCorrect.some(([kind]) =>
    TYPED_OR_CONTEXT_KINDS.has(kind),
  );

  // Recent quality window — the tail of qualityHistory.
  const recent = qualityHistory.slice(-MASTERED_RECENT_WINDOW);
  const recentCorrect = recent.filter((q) => q >= 3).length;
  const lastTwoCorrect =
    qualityHistory.length >= 2 &&
    qualityHistory.slice(-2).every((q) => q >= 3);

  const meetsMastered =
    correctAttempts >= MASTERED_MIN_CORRECT &&
    accuracy >= MASTERED_MIN_ACCURACY &&
    interval >= MASTERED_MIN_INTERVAL &&
    distinctKindsCorrect >= MASTERED_DISTINCT_KINDS &&
    hasTypedOrContextCorrect &&
    recent.length >= MASTERED_RECENT_WINDOW &&
    recentCorrect >= MASTERED_RECENT_REQUIRED &&
    lastTwoCorrect &&
    isCorrect;

  if (meetsMastered) return "mastered";

  // Once a word is Mastered, do not silently demote it on a single hiccup —
  // require an actual wrong answer to drop back to a lower band.
  if (previousLevel === "mastered" && isCorrect) return "mastered";

  // A wrong answer always pulls the word back into the active learning band.
  if (!isCorrect) {
    if (totalAttempts <= 2) return "learning";
    return accuracy < 0.5 ? "weak" : "learning";
  }

  // Low-confidence correct answers shouldn't promote past "improving".
  const lowConfidence = confidence === "guessed" || confidence === "forgot";

  if (repetitions <= 1 || totalAttempts < 3) return "learning";

  if (accuracy < 0.5) return "weak";

  if (
    !lowConfidence &&
    accuracy >= 0.8 &&
    repetitions >= 3 &&
    interval >= 7 &&
    lastTwoCorrect
  ) {
    return "strong";
  }

  if (accuracy >= 0.6) return "improving";

  return "weak";
}

/** Map the new 6-level mastery to the legacy 4-level `status` field. */
export function legacyStatusFromMastery(
  level: MasteryLevel,
  interval: number,
  repetitions: number,
): Word["status"] {
  if (level === "mastered") return "mastered";
  if (level === "strong") return "review";
  if (level === "improving") return interval >= 6 ? "review" : "learning";
  if (level === "weak" || level === "learning") {
    return repetitions === 0 && interval === 0 ? "new" : "learning";
  }
  return "new";
}

// ─────────────────────────────────────────────────────────────────────────────
// Helpers consumed by the UI
// ─────────────────────────────────────────────────────────────────────────────

// Preview what interval each quality rating would produce
export function previewIntervals(word: Word): Record<number, number> {
  const qualities = [0, 2, 3, 4, 5];
  const result: Record<number, number> = {};
  for (const q of qualities) {
    if (q >= 3) {
      const ef = Math.max(
        MIN_EASE,
        word.easeFactor + 0.1 - (5 - q) * (0.08 + (5 - q) * 0.02),
      );
      let interval: number;
      if (word.repetitions === 0) interval = 1;
      else if (word.repetitions === 1) interval = 6;
      else interval = Math.round(word.interval * ef);
      result[q] = interval;
    } else {
      result[q] = 1;
    }
  }
  return result;
}

export function getDueWords(words: Word[]): Word[] {
  const now = new Date();
  return words.filter((w) => {
    const due = w.nextReviewDate ?? w.nextReview;
    if (!due) return true;
    return new Date(due) <= now;
  });
}

export function getDifficultWords(words: Word[]): Word[] {
  return words
    .filter(
      (w) =>
        w.isDifficult ||
        w.difficulty >= 3 ||
        (w.wrongAttempts ?? w.incorrectCount) >= 2,
    )
    .sort(
      (a, b) =>
        (b.difficulty ?? 0) - (a.difficulty ?? 0) ||
        (b.wrongAttempts ?? b.incorrectCount) -
          (a.wrongAttempts ?? a.incorrectCount),
    );
}

export function getProgress(words: Word[]) {
  const total = words.length;
  const mastered = words.filter((w) => w.masteryLevel === "mastered" || w.status === "mastered").length;
  const review = words.filter(
    (w) =>
      w.masteryLevel === "strong" ||
      w.masteryLevel === "improving" ||
      (w.masteryLevel === undefined && w.status === "review"),
  ).length;
  const learning = words.filter(
    (w) =>
      w.masteryLevel === "learning" ||
      w.masteryLevel === "weak" ||
      (w.masteryLevel === undefined && w.status === "learning"),
  ).length;
  const newWords = words.filter(
    (w) =>
      (w.masteryLevel ?? w.status) === "new" ||
      (!w.masteryLevel && w.status === "new"),
  ).length;
  const known = mastered + review + learning;

  const totalAttempts = words.reduce(
    (sum, w) => sum + (w.correctAttempts ?? w.correctCount) + (w.wrongAttempts ?? w.incorrectCount),
    0,
  );
  const totalCorrect = words.reduce(
    (sum, w) => sum + (w.correctAttempts ?? w.correctCount),
    0,
  );
  const accuracy = totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0;

  return { total, mastered, review, learning, newWords, known, accuracy };
}

export function getWordsByDay(words: Word[], day: number): Word[] {
  return words.filter((w) => w.day === day);
}

export function getWordsByDayAndGroup(words: Word[], day: number, group: number): Word[] {
  return words.filter((w) => w.day === day && w.group === group);
}

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function levenshteinDistance(a: string, b: string): number {
  const matrix: number[][] = [];
  const la = a.length;
  const lb = b.length;
  for (let i = 0; i <= lb; i++) matrix[i] = [i];
  for (let j = 0; j <= la; j++) matrix[0][j] = j;
  for (let i = 1; i <= lb; i++) {
    for (let j = 1; j <= la; j++) {
      if (b[i - 1] === a[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1,
        );
      }
    }
  }
  return matrix[lb][la];
}

export function isCloseEnough(answer: string, correct: string): boolean {
  const a = answer.toLowerCase().trim();
  const b = correct.toLowerCase().trim();
  if (a === b) return true;
  const maxDist = correct.length <= 5 ? 1 : correct.length <= 8 ? 2 : 3;
  return levenshteinDistance(a, b) <= maxDist;
}

export function getRecallStrength(word: Word): number {
  const correct = word.correctAttempts ?? word.correctCount;
  const wrong = word.wrongAttempts ?? word.incorrectCount;
  const total = correct + wrong;
  if (total === 0 || !word.lastReviewed) return 0;
  const accuracy = correct / total;
  const interval = Math.max(word.interval, 1);
  const daysSinceLast = (Date.now() - new Date(word.lastReviewed).getTime()) / 86400000;
  const decayFactor = Math.min(1, daysSinceLast / (interval * 2));
  return accuracy * (1 - decayFactor);
}

// Compress all nextReview dates by 50% for crunch mode
export function applyCrunchMode(words: Word[]): Word[] {
  const now = new Date();
  return words.map((w) => {
    if (!w.nextReview) return w;
    const next = new Date(w.nextReview);
    const msRemaining = next.getTime() - now.getTime();
    if (msRemaining <= 0) return w;
    const compressed = new Date(now.getTime() + msRemaining * 0.5);
    const iso = compressed.toISOString();
    return { ...w, nextReview: iso, nextReviewDate: iso };
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// Migration helper — fill defaults for words loaded from older localStorage.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Backfill the new Phase 7 fields on a word loaded from older storage so the
 * rest of the app can rely on them being defined.
 */
export function backfillMasteryFields(w: Partial<Word> & Pick<Word, "id">): Word {
  const correctAttempts = w.correctAttempts ?? w.correctCount ?? 0;
  const wrongAttempts = w.wrongAttempts ?? w.incorrectCount ?? 0;
  const totalAttempts = correctAttempts + wrongAttempts;
  const accuracy = totalAttempts > 0 ? correctAttempts / totalAttempts : 0;

  const previousStatus = w.status ?? "new";
  let masteryLevel: MasteryLevel;
  if (w.masteryLevel) {
    masteryLevel = w.masteryLevel;
  } else if (previousStatus === "mastered") {
    // Existing "mastered" users keep that label — the new criterion only
    // gates *future* promotions.
    masteryLevel = "mastered";
  } else if (previousStatus === "review") {
    masteryLevel = accuracy >= 0.8 ? "strong" : "improving";
  } else if (previousStatus === "learning") {
    masteryLevel = accuracy >= 0.5 ? "improving" : "learning";
  } else {
    masteryLevel = "new";
  }

  return {
    ...w,
    correctCount: correctAttempts,
    incorrectCount: wrongAttempts,
    correctAttempts,
    wrongAttempts,
    totalAttempts,
    accuracy,
    qualityHistory: w.qualityHistory ?? [],
    confidenceHistory: w.confidenceHistory ?? [],
    avgResponseTimeMs: w.avgResponseTimeMs ?? 0,
    responseTimeSamples: w.responseTimeSamples ?? 0,
    mistakeCount: w.mistakeCount ?? wrongAttempts,
    isDifficult: w.isDifficult ?? ((w.difficulty ?? 0) >= 3 || wrongAttempts >= 2),
    masteryLevel,
    nextReviewDate: w.nextReviewDate ?? w.nextReview ?? null,
    lastPracticed: w.lastPracticed ?? w.lastReviewed ?? null,
    lastIncorrect: w.lastIncorrect ?? null,
    performanceByType: w.performanceByType ?? {},
  } as Word;
}
