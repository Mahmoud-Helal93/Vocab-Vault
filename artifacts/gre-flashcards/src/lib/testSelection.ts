import { type Word } from "@/data/words";
import { shuffleArray } from "@/lib/srs";
import {
  buildQuestionBank,
  groupQuestionsByType,
} from "@/lib/testQuestionBank";
import {
  ALL_TEST_QUESTION_TYPES,
  type CountsByType,
  type TestQuestion,
  type TestQuestionType,
} from "@/lib/testTypes";

export interface SessionRequest {
  /** Words in scope (from belt/mission/set/range/all). */
  scopeWords: Word[];
  /** Distractor pool — usually the full vocabulary, never just the scope. */
  pool?: Word[];
  /** Exact requested count per type. */
  counts: CountsByType;
  /** When true, the final question order is shuffled across types. */
  shuffle?: boolean;
}

export interface SessionResult {
  questions: TestQuestion[];
  /** What we actually produced per type (after honoring availability). */
  counts: CountsByType;
  /** Total questions in the session. */
  total: number;
}

/**
 * Behavior toggles attached to a Custom Practice session. Forwarded from
 * Test Selection → Practice Mode via navigation params.
 */
export interface SessionConfig {
  /** When true the final question list is shuffled across types. */
  shuffle: boolean;
  /** When true Practice Mode shows a session timer in the header. */
  showTimer: boolean;
  /** When true Practice Mode exposes the per-question Hint button. */
  showHints: boolean;
  /** When true Practice Mode renders the post-answer confidence picker. */
  confidenceRating: boolean;
}

export const DEFAULT_SESSION_CONFIG: SessionConfig = {
  shuffle: true,
  showTimer: false,
  showHints: true,
  confidenceRating: true,
};

/**
 * Picks exactly `counts[type]` questions per type from the scope. Never
 * exceeds availability. Returns the assembled session and the realized counts.
 */
export function generatePracticeSession(req: SessionRequest): SessionResult {
  const pool = req.pool ?? req.scopeWords;
  const bank = buildQuestionBank(req.scopeWords, pool);
  const grouped = groupQuestionsByType(bank);

  const realized: CountsByType = {};
  const out: TestQuestion[] = [];

  for (const t of ALL_TEST_QUESTION_TYPES) {
    const want = Math.max(0, Math.floor(req.counts[t] ?? 0));
    if (want === 0) continue;
    const available = grouped[t];
    if (available.length === 0) continue;
    const take = Math.min(want, available.length);
    // Always sample randomly so the same type doesn't replay verbatim.
    const picked = shuffleArray(available).slice(0, take);
    out.push(...picked);
    realized[t] = take;
  }

  const ordered = req.shuffle === false ? out : shuffleArray(out);
  return { questions: ordered, counts: realized, total: ordered.length };
}

/** Validate that a counts object has at least one positive entry. */
export function isStartable(counts: CountsByType): boolean {
  for (const t of ALL_TEST_QUESTION_TYPES) {
    if ((counts[t] ?? 0) > 0) return true;
  }
  return false;
}

/** Sum of all selected counts. */
export function sumCounts(counts: CountsByType): number {
  let total = 0;
  for (const t of ALL_TEST_QUESTION_TYPES) total += counts[t] ?? 0;
  return total;
}

/**
 * Re-build a session from a list of failed/incorrect questions. We rebuild via
 * `buildQuestionBank` over the wrong-question words so the new run is fresh
 * (different distractors, different example sentence picks, etc).
 */
export function rebuildSessionFromQuestions(
  wrong: TestQuestion[],
  pool: Word[],
  shuffle = true,
): TestQuestion[] {
  if (wrong.length === 0) return [];
  // Group wrong questions by type to preserve the type mix the user got.
  const counts: CountsByType = {};
  const wordsByType: Record<TestQuestionType, Word[]> = {
    "word-to-def": [],
    "def-to-word": [],
    "synonym-mcq": [],
    "antonym-mcq": [],
    "fill-blank": [],
    "synonym-pair": [],
    "tf-definition": [],
    "tf-synonym": [],
    "tf-antonym": [],
  };
  for (const q of wrong) {
    const t = q.kind as TestQuestionType;
    if (!ALL_TEST_QUESTION_TYPES.includes(t)) continue;
    counts[t] = (counts[t] ?? 0) + 1;
    wordsByType[t].push(q.word);
  }
  const allWordsSet = new Map<string, Word>();
  for (const ws of Object.values(wordsByType)) {
    for (const w of ws) allWordsSet.set(w.id, w);
  }
  const scopeWords = Array.from(allWordsSet.values());
  const result = generatePracticeSession({
    scopeWords,
    pool,
    counts,
    shuffle,
  });
  return result.questions;
}
