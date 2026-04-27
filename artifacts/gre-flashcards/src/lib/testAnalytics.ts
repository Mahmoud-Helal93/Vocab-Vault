import { type TestHistoryRecord, type TestQuestionRecord } from "@/lib/storage";
import { type Word } from "@/data/words";
import {
  beltForMission,
  isDifficultWord,
  isMistakeWord,
  isDueWord,
  BELT_NAMES,
} from "@/lib/wordSelection";

// ─────────────────────────────────────────────────────────────────────────────
// Aggregate accuracy buckets
// ─────────────────────────────────────────────────────────────────────────────

export interface AccuracyBucket {
  key: string;
  label: string;
  correct: number;
  attempted: number;
  total: number;
  accuracy: number;
}

function rollup<T>(
  questions: TestQuestionRecord[],
  keyFn: (q: TestQuestionRecord) => T | null,
  labelFn: (k: T) => string,
  serialize: (k: T) => string = (k) => String(k),
): AccuracyBucket[] {
  const map = new Map<
    string,
    { key: T; correct: number; attempted: number; total: number }
  >();
  for (const q of questions) {
    const k = keyFn(q);
    if (k === null || k === undefined) continue;
    const sk = serialize(k);
    const cur = map.get(sk) ?? { key: k, correct: 0, attempted: 0, total: 0 };
    cur.total += 1;
    if (q.answered) cur.attempted += 1;
    if (q.correct) cur.correct += 1;
    map.set(sk, cur);
  }
  return Array.from(map.entries())
    .map(([sk, agg]) => ({
      key: sk,
      label: labelFn(agg.key),
      correct: agg.correct,
      attempted: agg.attempted,
      total: agg.total,
      accuracy: agg.total === 0 ? 0 : Math.round((agg.correct / agg.total) * 100),
    }))
    .sort((a, b) => b.total - a.total);
}

export function accuracyByKind(
  questions: TestQuestionRecord[],
): AccuracyBucket[] {
  return rollup(questions, (q) => q.kind, (k) => k);
}

export function accuracyByBelt(
  questions: TestQuestionRecord[],
): AccuracyBucket[] {
  return rollup(
    questions,
    (q) => beltForMission(q.day),
    (b) => BELT_NAMES[b - 1] ?? `Belt ${b}`,
  ).sort((a, b) => Number(a.key) - Number(b.key));
}

export function accuracyByMission(
  questions: TestQuestionRecord[],
): AccuracyBucket[] {
  return rollup(
    questions,
    (q) => q.day,
    (d) => `Mission ${d}`,
  ).sort((a, b) => Number(a.key) - Number(b.key));
}

export function accuracyBySet(
  questions: TestQuestionRecord[],
): AccuracyBucket[] {
  return rollup(
    questions,
    (q) => `${q.day}-${q.group}`,
    (key) => {
      const [day, group] = String(key).split("-");
      return `M${day} · S${group}`;
    },
    (k) => String(k),
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Word-level rollups across (one or more) test records
// ─────────────────────────────────────────────────────────────────────────────

export interface WordPerformance {
  wordId: string;
  word: string;
  day: number;
  group: number;
  pos: string;
  attempts: number;
  correct: number;
  wrong: number;
  unanswered: number;
  accuracy: number;
  avgTimeMs: number;
  lastSeen: string | null;
}

export function rollupWordPerformance(
  questions: TestQuestionRecord[],
  /** Optional ISO timestamp source (per-record date) so we can track lastSeen. */
  timestampPerQuestion?: Map<string, string>,
): WordPerformance[] {
  const map = new Map<string, WordPerformance>();
  for (const q of questions) {
    const cur =
      map.get(q.wordId) ??
      ({
        wordId: q.wordId,
        word: q.word,
        day: q.day,
        group: q.group,
        pos: q.pos,
        attempts: 0,
        correct: 0,
        wrong: 0,
        unanswered: 0,
        accuracy: 0,
        avgTimeMs: 0,
        lastSeen: null,
      } as WordPerformance);
    cur.attempts += 1;
    if (q.correct) cur.correct += 1;
    else if (q.answered) cur.wrong += 1;
    else cur.unanswered += 1;
    cur.avgTimeMs =
      (cur.avgTimeMs * (cur.attempts - 1) + q.timeSpentMs) / cur.attempts;
    if (timestampPerQuestion) {
      const ts = timestampPerQuestion.get(q.questionId);
      if (ts && (!cur.lastSeen || ts > cur.lastSeen)) cur.lastSeen = ts;
    }
    map.set(q.wordId, cur);
  }
  for (const v of map.values()) {
    v.accuracy = v.attempts === 0 ? 0 : Math.round((v.correct / v.attempts) * 100);
  }
  return Array.from(map.values());
}

/**
 * Build a flat list of every TestQuestionRecord from `records`, plus a parallel
 * map from questionId → record date (used for lastSeen tracking).
 */
export function flattenHistory(records: TestHistoryRecord[]): {
  questions: TestQuestionRecord[];
  timestampPerQuestion: Map<string, string>;
} {
  const questions: TestQuestionRecord[] = [];
  const timestampPerQuestion = new Map<string, string>();
  for (const r of records) {
    for (const q of r.questions) {
      questions.push(q);
      timestampPerQuestion.set(q.questionId, r.endedAt);
    }
  }
  return { questions, timestampPerQuestion };
}

// ─────────────────────────────────────────────────────────────────────────────
// Word lists for the analytics screens
// ─────────────────────────────────────────────────────────────────────────────

/** Words with the lowest historical accuracy (min 1 attempt). */
export function weakestWords(
  perf: WordPerformance[],
  limit = 10,
): WordPerformance[] {
  return perf
    .filter((p) => p.attempts >= 1)
    .slice()
    .sort((a, b) => {
      if (a.accuracy !== b.accuracy) return a.accuracy - b.accuracy;
      return b.attempts - a.attempts;
    })
    .slice(0, limit);
}

/** Words the SRS engine flags as "difficult" (high difficulty score or repeat misses). */
export function difficultWords(
  words: Word[],
  limit = 10,
): Word[] {
  return words
    .filter(isDifficultWord)
    .slice()
    .sort((a, b) => {
      const ad = (a.difficulty ?? 0) + a.incorrectCount;
      const bd = (b.difficulty ?? 0) + b.incorrectCount;
      return bd - ad;
    })
    .slice(0, limit);
}

/** Words the SRS engine has logged as having any incorrect answer. */
export function mistakeWordsList(
  words: Word[],
  limit = 10,
): Word[] {
  return words
    .filter(isMistakeWord)
    .slice()
    .sort((a, b) => b.incorrectCount - a.incorrectCount)
    .slice(0, limit);
}

// ─────────────────────────────────────────────────────────────────────────────
// Pacing rollups: slow correct + fast wrong
// ─────────────────────────────────────────────────────────────────────────────

export interface PacingEntry {
  questionId: string;
  wordId: string;
  word: string;
  day: number;
  group: number;
  kind: string;
  prompt: string;
  userAnswer: string;
  correctAnswer: string;
  timeSpentMs: number;
}

function toPacing(q: TestQuestionRecord): PacingEntry {
  return {
    questionId: q.questionId,
    wordId: q.wordId,
    word: q.word,
    day: q.day,
    group: q.group,
    kind: q.kind,
    prompt: q.prompt,
    userAnswer: q.userAnswer,
    correctAnswer: q.correctAnswer,
    timeSpentMs: q.timeSpentMs,
  };
}

/** Slowest correct answers — places where the answer landed but pacing felt shaky. */
export function slowCorrectAnswers(
  questions: TestQuestionRecord[],
  limit = 5,
  minTimeMs = 1500,
): PacingEntry[] {
  return questions
    .filter((q) => q.correct && q.timeSpentMs >= minTimeMs)
    .slice()
    .sort((a, b) => b.timeSpentMs - a.timeSpentMs)
    .slice(0, limit)
    .map(toPacing);
}

/** Fastest wrong answers — quick misses suggesting impulsive guessing. */
export function fastWrongAnswers(
  questions: TestQuestionRecord[],
  limit = 5,
  maxTimeMs = 6000,
): PacingEntry[] {
  return questions
    .filter((q) => q.answered && !q.correct && q.timeSpentMs <= maxTimeMs)
    .slice()
    .sort((a, b) => a.timeSpentMs - b.timeSpentMs)
    .slice(0, limit)
    .map(toPacing);
}

// ─────────────────────────────────────────────────────────────────────────────
// Recommendations
// ─────────────────────────────────────────────────────────────────────────────

/** Words the spaced-repetition engine considers due now (or never reviewed). */
export function recommendedReview(words: Word[], limit = 12): Word[] {
  return words
    .filter((w) => !isNewlyUnseen(w) && isDueWord(w))
    .slice()
    .sort((a, b) => {
      const at = a.nextReview ? new Date(a.nextReview).getTime() : 0;
      const bt = b.nextReview ? new Date(b.nextReview).getTime() : 0;
      return at - bt;
    })
    .slice(0, limit);
}

function isNewlyUnseen(w: Word): boolean {
  return w.correctCount === 0 && w.incorrectCount === 0 && !w.nextReview;
}

export interface SuggestedSession {
  title: string;
  rationale: string;
  wordIds: string[];
}

/**
 * Pick the most useful next practice session based on the latest test record.
 * Priority order: wrong + unanswered → flagged → due → weakest historical.
 */
export function suggestedNextSession(
  latest: TestHistoryRecord | null,
  history: TestHistoryRecord[],
  words: Word[],
): SuggestedSession | null {
  if (latest) {
    const missed = latest.questions
      .filter((q) => !q.correct)
      .map((q) => q.wordId);
    if (missed.length > 0) {
      return {
        title: "Drill the words you missed",
        rationale:
          "Run a focused practice session on every word you got wrong or skipped in the latest test.",
        wordIds: Array.from(new Set(missed)),
      };
    }
    const flagged = latest.questions
      .filter((q) => q.flagged)
      .map((q) => q.wordId);
    if (flagged.length > 0) {
      return {
        title: "Revisit your flagged words",
        rationale:
          "You marked these for a second look — practice them while they're fresh.",
        wordIds: Array.from(new Set(flagged)),
      };
    }
  }

  const due = recommendedReview(words, 12).map((w) => w.id);
  if (due.length > 0) {
    return {
      title: "Hit your spaced-repetition review",
      rationale: "These words are due now according to the SM-2 schedule.",
      wordIds: due,
    };
  }

  const { questions, timestampPerQuestion } = flattenHistory(history);
  const perf = rollupWordPerformance(questions, timestampPerQuestion);
  const weak = weakestWords(perf, 12).map((w) => w.wordId);
  if (weak.length > 0) {
    return {
      title: "Strengthen your weakest words",
      rationale: "Lowest historical accuracy across all of your timed tests.",
      wordIds: weak,
    };
  }

  return null;
}

// ─────────────────────────────────────────────────────────────────────────────
// Format helpers
// ─────────────────────────────────────────────────────────────────────────────

export function formatShortDuration(ms: number): string {
  if (ms < 1000) return "<1s";
  const totalSec = Math.round(ms / 1000);
  if (totalSec < 60) return `${totalSec}s`;
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return s === 0 ? `${m}m` : `${m}m ${s}s`;
}

export function formatClock(ms: number): string {
  const totalSec = Math.max(0, Math.floor(ms / 1000));
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}
