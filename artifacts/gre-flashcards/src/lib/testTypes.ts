import { type Question, type QuestionKind } from "@/lib/questionEngine";

/**
 * The set of question types exposed in the Custom Practice setup. This is a
 * curated subset of `QuestionKind` — Tone-based questions are intentionally
 * excluded from the new Custom Practice flow.
 */
export type TestQuestionType =
  | "word-to-def"
  | "def-to-word"
  | "synonym-mcq"
  | "antonym-mcq"
  | "fill-blank"
  | "synonym-pair"
  | "tf-definition"
  | "tf-synonym"
  | "tf-antonym";

export const ALL_TEST_QUESTION_TYPES: TestQuestionType[] = [
  "word-to-def",
  "def-to-word",
  "synonym-mcq",
  "antonym-mcq",
  "fill-blank",
  "synonym-pair",
  "tf-definition",
  "tf-synonym",
  "tf-antonym",
];

export type TestQuestionGroup =
  | "MCQ"
  | "Fill in the Blank"
  | "Synonym Pairing"
  | "True / False";

export interface TestQuestionTypeMeta {
  id: TestQuestionType;
  label: string;
  short: string;
  group: TestQuestionGroup;
  description: string;
  /** Approx. questions produced per word — used to seed the per-type counts. */
  perWord: number;
  /** True when this type may be unavailable on words that lack the required data. */
  conditional?: boolean;
}

export const TEST_QUESTION_TYPE_META: Record<TestQuestionType, TestQuestionTypeMeta> = {
  "word-to-def": {
    id: "word-to-def",
    label: "Word → Definition",
    short: "Word → Def",
    group: "MCQ",
    description: "See the word, pick the matching definition.",
    perWord: 1,
  },
  "def-to-word": {
    id: "def-to-word",
    label: "Definition → Word",
    short: "Def → Word",
    group: "MCQ",
    description: "See the definition, pick the matching word.",
    perWord: 1,
  },
  "synonym-mcq": {
    id: "synonym-mcq",
    label: "Synonyms",
    short: "Synonym",
    group: "MCQ",
    description: "Pick the word that means the same thing.",
    perWord: 3,
  },
  "antonym-mcq": {
    id: "antonym-mcq",
    label: "Antonyms",
    short: "Antonym",
    group: "MCQ",
    description: "Pick the word that means the opposite.",
    perWord: 1,
    conditional: true,
  },
  "fill-blank": {
    id: "fill-blank",
    label: "Fill in the Blank",
    short: "Fill blank",
    group: "Fill in the Blank",
    description: "Type the missing word from an example sentence.",
    perWord: 3,
  },
  "synonym-pair": {
    id: "synonym-pair",
    label: "Select All Synonyms",
    short: "Pair",
    group: "Synonym Pairing",
    description: "Pick every word that's a synonym (no partial credit).",
    perWord: 1,
  },
  "tf-definition": {
    id: "tf-definition",
    label: "T/F · Definition",
    short: "T/F Def",
    group: "True / False",
    description: "Decide whether the stated definition is correct.",
    perWord: 1,
  },
  "tf-synonym": {
    id: "tf-synonym",
    label: "T/F · Synonym",
    short: "T/F Syn",
    group: "True / False",
    description: "Decide whether the candidate is a synonym.",
    perWord: 1,
  },
  "tf-antonym": {
    id: "tf-antonym",
    label: "T/F · Antonym",
    short: "T/F Ant",
    group: "True / False",
    description: "Decide whether the candidate is an antonym.",
    perWord: 1,
    conditional: true,
  },
};

export const TEST_QUESTION_GROUP_ORDER: TestQuestionGroup[] = [
  "MCQ",
  "True / False",
  "Synonym Pairing",
  "Fill in the Blank",
];

export function questionTypesByGroup(): Record<TestQuestionGroup, TestQuestionType[]> {
  const groups: Record<TestQuestionGroup, TestQuestionType[]> = {
    MCQ: [],
    "Fill in the Blank": [],
    "Synonym Pairing": [],
    "True / False": [],
  };
  for (const t of ALL_TEST_QUESTION_TYPES) {
    groups[TEST_QUESTION_TYPE_META[t].group].push(t);
  }
  return groups;
}

/** Map QuestionKind -> TestQuestionType (only valid for active types). */
export function kindToTestType(kind: QuestionKind): TestQuestionType | null {
  if (
    kind === "word-to-def" ||
    kind === "def-to-word" ||
    kind === "synonym-mcq" ||
    kind === "antonym-mcq" ||
    kind === "fill-blank" ||
    kind === "synonym-pair" ||
    kind === "tf-definition" ||
    kind === "tf-synonym" ||
    kind === "tf-antonym"
  )
    return kind;
  return null;
}

export type CountsByType = Partial<Record<TestQuestionType, number>>;

export type AvailabilityByType = Record<TestQuestionType, number>;

export const EMPTY_AVAILABILITY: AvailabilityByType = {
  "word-to-def": 0,
  "def-to-word": 0,
  "synonym-mcq": 0,
  "antonym-mcq": 0,
  "fill-blank": 0,
  "synonym-pair": 0,
  "tf-definition": 0,
  "tf-synonym": 0,
  "tf-antonym": 0,
};

export type TestQuestion = Question;
