import { type Word } from "@/data/words";
import {
  type Question,
  generateWordToDefinition,
  generateDefinitionToWord,
  generateAllSynonymMCQs,
  generateAntonymMCQ,
  generateAllFillBlanks,
  generateSynonymPair,
  generateTrueFalse,
} from "@/lib/questionEngine";
import { beltForMission } from "@/lib/wordSelection";
import { shuffleArray } from "@/lib/srs";
import {
  ALL_TEST_QUESTION_TYPES,
  EMPTY_AVAILABILITY,
  kindToTestType,
  type AvailabilityByType,
  type TestQuestion,
  type TestQuestionType,
} from "@/lib/testTypes";

/**
 * Builds every question type for every word in `words`, using `pool` as the
 * distractor source. Returns a flat array of typed questions — call sites can
 * filter / count / sample as needed.
 */
export function buildQuestionBank(
  words: Word[],
  pool: Word[] = words,
): TestQuestion[] {
  const out: TestQuestion[] = [];
  for (const w of words) {
    const wd = generateWordToDefinition(w, { pool });
    if (wd) out.push(wd);

    const dw = generateDefinitionToWord(w, { pool });
    if (dw) out.push(dw);

    out.push(...generateAllSynonymMCQs(w, { pool }));

    const am = generateAntonymMCQ(w, { pool });
    if (am) out.push(am);

    out.push(...generateAllFillBlanks(w, { pool }));

    const sp = generateSynonymPair(w, { pool });
    if (sp) out.push(sp);

    const tfd = generateTrueFalse(w, "definition", { pool });
    if (tfd) out.push(tfd);

    const tfs = generateTrueFalse(w, "synonym", { pool });
    if (tfs) out.push(tfs);

    const tfa = generateTrueFalse(w, "antonym", { pool });
    if (tfa) out.push(tfa);
  }
  return out;
}

/** Group a question bank by `TestQuestionType` (skips out-of-scope kinds). */
export function groupQuestionsByType(
  bank: TestQuestion[],
): Record<TestQuestionType, TestQuestion[]> {
  const grouped: Record<TestQuestionType, TestQuestion[]> = {
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
  for (const q of bank) {
    const t = kindToTestType(q.kind);
    if (t) grouped[t].push(q);
  }
  return grouped;
}

/** Returns counts per question type in the supplied bank. */
export function getAvailableCountByType(
  bank: TestQuestion[],
): AvailabilityByType {
  const counts: AvailabilityByType = { ...EMPTY_AVAILABILITY };
  for (const q of bank) {
    const t = kindToTestType(q.kind);
    if (t) counts[t]++;
  }
  return counts;
}

/** Total number of questions across all types in the bank. */
export function getTotalAvailable(bank: TestQuestion[]): number {
  let total = 0;
  for (const q of bank) {
    if (kindToTestType(q.kind)) total++;
  }
  return total;
}

/** Convenience: build a bank for the given words and return per-type counts. */
export function getQuestionAvailability(
  words: Word[],
  pool: Word[] = words,
): AvailabilityByType {
  return getAvailableCountByType(buildQuestionBank(words, pool));
}

/* -------------------------------------------------------------------------- */
/* Aggregations by belt / mission / set                                       */
/* -------------------------------------------------------------------------- */

export interface SetBreakdownRow {
  day: number;
  group: number;
  counts: AvailabilityByType;
  total: number;
}

export interface MissionBreakdownRow {
  day: number;
  belt: number;
  sets: SetBreakdownRow[];
  counts: AvailabilityByType;
  total: number;
}

export interface BeltBreakdownRow {
  belt: number;
  missions: MissionBreakdownRow[];
  counts: AvailabilityByType;
  total: number;
}

function emptyCounts(): AvailabilityByType {
  return { ...EMPTY_AVAILABILITY };
}

function addCounts(target: AvailabilityByType, src: AvailabilityByType) {
  for (const t of ALL_TEST_QUESTION_TYPES) target[t] += src[t];
}

function totalOf(c: AvailabilityByType): number {
  let t = 0;
  for (const k of ALL_TEST_QUESTION_TYPES) t += c[k];
  return t;
}

/**
 * For a given list of words (already scoped), break down availability by belt
 * → mission → set. Useful for the live availability panel.
 */
export function getBreakdownByBelt(
  words: Word[],
  pool: Word[] = words,
): BeltBreakdownRow[] {
  // Group words by (day, group)
  const bySet = new Map<string, Word[]>();
  for (const w of words) {
    const key = `${w.day}-${w.group}`;
    const arr = bySet.get(key) ?? [];
    arr.push(w);
    bySet.set(key, arr);
  }

  // Build set rows
  const setRows: SetBreakdownRow[] = [];
  for (const [, ws] of bySet) {
    const counts = getQuestionAvailability(ws, pool);
    setRows.push({
      day: ws[0].day,
      group: ws[0].group,
      counts,
      total: totalOf(counts),
    });
  }

  // Group sets by mission
  const byMission = new Map<number, SetBreakdownRow[]>();
  for (const r of setRows) {
    const arr = byMission.get(r.day) ?? [];
    arr.push(r);
    byMission.set(r.day, arr);
  }

  const missionRows: MissionBreakdownRow[] = [];
  for (const [day, sets] of byMission) {
    sets.sort((a, b) => a.group - b.group);
    const counts = emptyCounts();
    for (const s of sets) addCounts(counts, s.counts);
    missionRows.push({
      day,
      belt: beltForMission(day),
      sets,
      counts,
      total: totalOf(counts),
    });
  }

  // Group missions by belt
  const byBelt = new Map<number, MissionBreakdownRow[]>();
  for (const r of missionRows) {
    const arr = byBelt.get(r.belt) ?? [];
    arr.push(r);
    byBelt.set(r.belt, arr);
  }

  const beltRows: BeltBreakdownRow[] = [];
  for (const [belt, missions] of byBelt) {
    missions.sort((a, b) => a.day - b.day);
    const counts = emptyCounts();
    for (const m of missions) addCounts(counts, m.counts);
    beltRows.push({
      belt,
      missions,
      counts,
      total: totalOf(counts),
    });
  }
  beltRows.sort((a, b) => a.belt - b.belt);
  return beltRows;
}

/** Shuffle helper re-exported for callers. */
export { shuffleArray };
