import { type Word } from "@/data/words";
import { ENRICHMENT, type Tone, type WordEnrichment } from "@/data/enrichment";
import { beltForMission } from "@/lib/wordSelection";
import { shuffleArray } from "@/lib/srs";

export type QuestionKind =
  | "word-to-def"
  | "def-to-word"
  | "fill-blank"
  | "synonym-mcq"
  | "antonym-mcq"
  | "tf-definition"
  | "tf-synonym"
  | "tf-antonym"
  | "tf-arabic"
  | "tf-tone";

export type TFAttribute =
  | "definition"
  | "synonym"
  | "antonym"
  | "arabic"
  | "tone";

export interface BaseQuestion {
  id: string;
  kind: QuestionKind;
  word: Word;
  prompt: string;
  explanation?: string;
}

export interface MCQQuestion extends BaseQuestion {
  kind: "word-to-def" | "def-to-word" | "synonym-mcq" | "antonym-mcq";
  choices: string[];
  correct: string;
  correctIndex: number;
}

export interface FillBlankQuestion extends BaseQuestion {
  kind: "fill-blank";
  sentence: string;
  answer: string;
  hintSynonyms: string[];
  acceptableAnswers: string[];
}

export interface TrueFalseQuestion extends BaseQuestion {
  kind:
    | "tf-definition"
    | "tf-synonym"
    | "tf-antonym"
    | "tf-arabic"
    | "tf-tone";
  attribute: TFAttribute;
  statement: string;
  answer: boolean;
  candidate: string;
}

export type Question = MCQQuestion | FillBlankQuestion | TrueFalseQuestion;

export interface GeneratorOptions {
  /** Word pool to draw distractors from. Defaults to `[targetWord]` only — pass the full bank for best results. */
  pool?: Word[];
  /** Number of choices for MCQ questions (default 4). Must be >= 2. */
  numChoices?: number;
  /** Optional deterministic RNG (0..1). Defaults to Math.random. */
  rng?: () => number;
  /** Optional override for which example sentence index to use for fill-blank (0..2). */
  exampleIndex?: number;
}

const DEFAULT_NUM_CHOICES = 4;

function rngShuffle<T>(arr: T[], rng?: () => number): T[] {
  if (!rng) return shuffleArray(arr);
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function pickN<T>(arr: T[], n: number, rng?: () => number): T[] {
  return rngShuffle(arr, rng).slice(0, n);
}

function uniq<T>(arr: T[], key: (v: T) => string): T[] {
  const seen = new Set<string>();
  const out: T[] = [];
  for (const v of arr) {
    const k = key(v);
    if (k && !seen.has(k)) {
      seen.add(k);
      out.push(v);
    }
  }
  return out;
}

function normalizeText(s: string): string {
  return s.trim().toLowerCase();
}

function enrichmentFor(w: Word): WordEnrichment | undefined {
  return ENRICHMENT[w.word.toLowerCase()];
}

export function getAntonyms(w: Word): string[] {
  return enrichmentFor(w)?.antonyms ?? [];
}

export function getTone(w: Word): Tone | undefined {
  return enrichmentFor(w)?.tone;
}

export function getArabic(w: Word): string {
  return w.arabic ?? "";
}

/**
 * Score how "close" a candidate distractor word is to the target.
 * Lower score = closer = preferred.
 *  - same set (day+group): 0
 *  - same mission (day): 1
 *  - same belt: 2
 *  - elsewhere: 3
 * Then add small penalty for POS mismatch and difficulty distance.
 */
function distractorAffinity(target: Word, cand: Word): number {
  let score = 3;
  if (cand.day === target.day && cand.group === target.group) score = 0;
  else if (cand.day === target.day) score = 1;
  else if (beltForMission(cand.day) === beltForMission(target.day)) score = 2;

  if (cand.pos !== target.pos) score += 0.5;
  score += Math.min(2, Math.abs((cand.difficulty ?? 0) - (target.difficulty ?? 0)) * 0.1);
  return score;
}

/**
 * Rank a pool of words by closeness to the target for use as distractors.
 * Caller filters out the target itself.
 */
export function rankDistractors(target: Word, pool: Word[]): Word[] {
  return [...pool]
    .filter((w) => w.id !== target.id)
    .sort((a, b) => distractorAffinity(target, a) - distractorAffinity(target, b));
}

/**
 * Pick `n` distractor strings derived from candidate words via `extract`.
 * Honors uniqueness, avoids the correct answer, and prefers same-pos/same-set words.
 * Falls back through wider pools if the strict pool can't produce enough options.
 */
function pickDistractorStrings(
  target: Word,
  pool: Word[],
  correct: string,
  n: number,
  extract: (w: Word) => string | string[] | undefined,
  rng?: () => number,
): string[] {
  const correctNorm = normalizeText(correct);
  const ranked = rankDistractors(target, pool);

  const sameSet = ranked.filter(
    (w) => w.day === target.day && w.group === target.group,
  );
  const sameMission = ranked.filter(
    (w) => w.day === target.day && !(w.day === target.day && w.group === target.group),
  );
  const sameBelt = ranked.filter(
    (w) =>
      w.day !== target.day &&
      beltForMission(w.day) === beltForMission(target.day),
  );
  const rest = ranked.filter(
    (w) => beltForMission(w.day) !== beltForMission(target.day),
  );

  const tiers: Word[][] = [];
  // 1) Same set, same POS
  tiers.push(sameSet.filter((w) => w.pos === target.pos));
  // 2) Same mission, same POS
  tiers.push(sameMission.filter((w) => w.pos === target.pos));
  // 3) Same belt, same POS
  tiers.push(sameBelt.filter((w) => w.pos === target.pos));
  // 4) Same set, any POS
  tiers.push(sameSet);
  // 5) Same mission, any POS
  tiers.push(sameMission);
  // 6) Same belt, any POS
  tiers.push(sameBelt);
  // 7) Rest, same POS
  tiers.push(rest.filter((w) => w.pos === target.pos));
  // 8) Anywhere
  tiers.push(rest);

  const chosen: string[] = [];
  const seen = new Set<string>([correctNorm]);

  for (const tier of tiers) {
    if (chosen.length >= n) break;
    for (const w of rngShuffle(tier, rng)) {
      if (chosen.length >= n) break;
      const raw = extract(w);
      const candidates = Array.isArray(raw) ? raw : raw ? [raw] : [];
      for (const c of candidates) {
        if (chosen.length >= n) break;
        if (!c) continue;
        const norm = normalizeText(c);
        if (!norm || seen.has(norm)) continue;
        seen.add(norm);
        chosen.push(c);
      }
    }
  }

  return chosen.slice(0, n);
}

function blankInSentence(sentence: string, word: string): string {
  const base = word.toLowerCase();
  const re = new RegExp(`\\b${base}\\w*\\b`, "gi");
  if (re.test(sentence)) return sentence.replace(re, "_____");
  const prefix = base.slice(0, Math.min(4, base.length));
  const pre = new RegExp(`\\b${prefix}\\w*\\b`, "gi");
  if (pre.test(sentence)) return sentence.replace(pre, "_____");
  return `${sentence} (_____)`;
}

function makeId(kind: QuestionKind, w: Word, suffix = ""): string {
  return `${kind}:${w.id}${suffix ? `:${suffix}` : ""}`;
}

/* -------------------------------------------------------------------------- */
/* 1. Word -> Definition MCQ                                                  */
/* -------------------------------------------------------------------------- */

export function generateWordToDefinition(
  word: Word,
  options: GeneratorOptions = {},
): MCQQuestion | null {
  const { pool = [word], numChoices = DEFAULT_NUM_CHOICES, rng } = options;
  if (!word.definition) return null;
  const need = Math.max(1, numChoices - 1);
  const distractors = pickDistractorStrings(
    word,
    pool,
    word.definition,
    need,
    (w) => w.definition,
    rng,
  );
  if (distractors.length === 0) return null;
  const choices = rngShuffle([word.definition, ...distractors], rng);
  return {
    id: makeId("word-to-def", word),
    kind: "word-to-def",
    word,
    prompt: `What does "${word.word}" mean?`,
    choices,
    correct: word.definition,
    correctIndex: choices.indexOf(word.definition),
    explanation: `${word.word} (${word.pos}) — ${word.definition}`,
  };
}

/* -------------------------------------------------------------------------- */
/* 2. Definition -> Word MCQ                                                  */
/* -------------------------------------------------------------------------- */

export function generateDefinitionToWord(
  word: Word,
  options: GeneratorOptions = {},
): MCQQuestion | null {
  const { pool = [word], numChoices = DEFAULT_NUM_CHOICES, rng } = options;
  if (!word.definition) return null;
  const need = Math.max(1, numChoices - 1);
  const distractors = pickDistractorStrings(
    word,
    pool,
    word.word,
    need,
    (w) => w.word,
    rng,
  );
  if (distractors.length === 0) return null;
  const choices = rngShuffle([word.word, ...distractors], rng);
  return {
    id: makeId("def-to-word", word),
    kind: "def-to-word",
    word,
    prompt: `Which word matches this definition?\n"${word.definition}"`,
    choices,
    correct: word.word,
    correctIndex: choices.indexOf(word.word),
    explanation: `${word.word} (${word.pos}) — ${word.definition}`,
  };
}

/* -------------------------------------------------------------------------- */
/* 3. Fill in the blank from an example sentence                              */
/* -------------------------------------------------------------------------- */

export function generateFillBlank(
  word: Word,
  options: GeneratorOptions = {},
): FillBlankQuestion | null {
  const { exampleIndex } = options;
  const examples: string[] = (word.examples as unknown as string[] | undefined) ?? [];
  if (examples.length === 0) return null;
  const idx =
    typeof exampleIndex === "number" && examples[exampleIndex]
      ? exampleIndex
      : 0;
  const source = examples[idx] ?? examples[0];
  const sentence = blankInSentence(source, word.word);
  const acceptable = uniq(
    [
      word.word,
      ...((enrichmentFor(word)?.wordFamily ?? []).filter((f) =>
        f.toLowerCase().startsWith(word.word.toLowerCase().slice(0, 4)),
      )),
    ],
    (v) => v.toLowerCase(),
  );
  return {
    id: makeId("fill-blank", word, String(idx)),
    kind: "fill-blank",
    word,
    prompt: "Fill in the blank with the correct word.",
    sentence,
    answer: word.word,
    hintSynonyms: (word.synonyms ?? []).slice(0, 2),
    acceptableAnswers: acceptable,
    explanation: `The answer is "${word.word}" — ${word.definition}`,
  };
}

/* -------------------------------------------------------------------------- */
/* 4. Synonym matching MCQ                                                    */
/* -------------------------------------------------------------------------- */

export function generateSynonymMCQ(
  word: Word,
  options: GeneratorOptions = {},
): MCQQuestion | null {
  const { pool = [word], numChoices = DEFAULT_NUM_CHOICES, rng } = options;
  const synonyms: string[] = (word.synonyms as unknown as string[] | undefined) ?? [];
  if (synonyms.length === 0) return null;
  const correct = synonyms[Math.floor((rng ?? Math.random)() * synonyms.length)];
  const need = Math.max(1, numChoices - 1);

  // Distractors must NOT be one of the target's own synonyms.
  const targetSynSet = new Set(synonyms.map(normalizeText));
  const safeExtract = (w: Word): string[] => {
    const out: string[] = [];
    for (const s of w.synonyms ?? []) {
      if (!targetSynSet.has(normalizeText(s))) out.push(s);
    }
    return out;
  };

  const distractors = pickDistractorStrings(
    word,
    pool,
    correct,
    need,
    safeExtract,
    rng,
  );
  if (distractors.length === 0) return null;
  const choices = rngShuffle([correct, ...distractors], rng);
  return {
    id: makeId("synonym-mcq", word, normalizeText(correct)),
    kind: "synonym-mcq",
    word,
    prompt: `Which word is closest in meaning to "${word.word}"?`,
    choices,
    correct,
    correctIndex: choices.indexOf(correct),
    explanation: `${word.word} ≈ ${synonyms.join(", ")}.`,
  };
}

/* -------------------------------------------------------------------------- */
/* 5. Antonym matching MCQ                                                    */
/* -------------------------------------------------------------------------- */

export function generateAntonymMCQ(
  word: Word,
  options: GeneratorOptions = {},
): MCQQuestion | null {
  const { pool = [word], numChoices = DEFAULT_NUM_CHOICES, rng } = options;
  const antonyms = getAntonyms(word);
  if (antonyms.length === 0) return null;
  const correct =
    antonyms[Math.floor((rng ?? Math.random)() * antonyms.length)];
  const need = Math.max(1, numChoices - 1);

  // Distractors should not be antonyms or synonyms of the target (those would be wrong vs ambiguous).
  const targetAntSet = new Set(antonyms.map(normalizeText));
  const targetSynSet = new Set((word.synonyms ?? []).map(normalizeText));

  // Pull from other words' synonyms (a synonym of a *different* word is unlikely to be an antonym of the target).
  const safeExtract = (w: Word): string[] => {
    const out: string[] = [];
    for (const s of w.synonyms ?? []) {
      const n = normalizeText(s);
      if (!n || targetAntSet.has(n) || targetSynSet.has(n)) continue;
      out.push(s);
    }
    return out;
  };

  const distractors = pickDistractorStrings(
    word,
    pool,
    correct,
    need,
    safeExtract,
    rng,
  );
  if (distractors.length === 0) return null;
  const choices = rngShuffle([correct, ...distractors], rng);
  return {
    id: makeId("antonym-mcq", word, normalizeText(correct)),
    kind: "antonym-mcq",
    word,
    prompt: `Which word is most nearly OPPOSITE in meaning to "${word.word}"?`,
    choices,
    correct,
    correctIndex: choices.indexOf(correct),
    explanation: `${word.word} ↔ ${antonyms.join(", ")}.`,
  };
}

/* -------------------------------------------------------------------------- */
/* 6. True / False questions                                                  */
/* -------------------------------------------------------------------------- */

interface TFOptions extends GeneratorOptions {
  /** Force the truth value of the produced question. If omitted, randomized. */
  forceAnswer?: boolean;
}

function tfStatementForDefinition(word: Word, candidate: string): string {
  return `"${word.word}" means: ${candidate}`;
}
function tfStatementForSynonym(word: Word, candidate: string): string {
  return `"${candidate}" is a synonym of "${word.word}".`;
}
function tfStatementForAntonym(word: Word, candidate: string): string {
  return `"${candidate}" is an antonym of "${word.word}".`;
}
function tfStatementForArabic(word: Word, candidate: string): string {
  return `The Arabic translation of "${word.word}" is: ${candidate}`;
}
function tfStatementForTone(word: Word, candidate: string): string {
  return `The tone of "${word.word}" is ${candidate}.`;
}

function makeTF(
  word: Word,
  attribute: TFAttribute,
  candidate: string,
  answer: boolean,
  statement: string,
  truth: string,
): TrueFalseQuestion {
  const kind: TrueFalseQuestion["kind"] =
    attribute === "definition"
      ? "tf-definition"
      : attribute === "synonym"
        ? "tf-synonym"
        : attribute === "antonym"
          ? "tf-antonym"
          : attribute === "arabic"
            ? "tf-arabic"
            : "tf-tone";
  return {
    id: makeId(kind, word, normalizeText(candidate)),
    kind,
    word,
    attribute,
    prompt: "True or False?",
    statement,
    answer,
    candidate,
    explanation: answer
      ? `True. ${truth}`
      : `False. The correct ${attribute} is: ${truth}`,
  };
}

/**
 * Build a True/False question for one of the word's attributes.
 * Returns null if the attribute is not available on the word
 * (e.g. no antonyms, no tone, no Arabic, or pool too small to produce a believable false).
 */
export function generateTrueFalse(
  word: Word,
  attribute: TFAttribute,
  options: TFOptions = {},
): TrueFalseQuestion | null {
  const { pool = [word], rng, forceAnswer } = options;
  const random = rng ?? Math.random;
  const wantTrue =
    typeof forceAnswer === "boolean" ? forceAnswer : random() < 0.5;

  switch (attribute) {
    case "definition": {
      if (!word.definition) return null;
      if (wantTrue) {
        return makeTF(
          word,
          "definition",
          word.definition,
          true,
          tfStatementForDefinition(word, word.definition),
          word.definition,
        );
      }
      const fakes = pickDistractorStrings(
        word,
        pool,
        word.definition,
        1,
        (w) => w.definition,
        rng,
      );
      if (fakes.length === 0) return null;
      return makeTF(
        word,
        "definition",
        fakes[0],
        false,
        tfStatementForDefinition(word, fakes[0]),
        word.definition,
      );
    }

    case "synonym": {
      const synonyms: string[] = (word.synonyms as unknown as string[] | undefined) ?? [];
      if (synonyms.length === 0) return null;
      if (wantTrue) {
        const pick = synonyms[Math.floor(random() * synonyms.length)];
        return makeTF(
          word,
          "synonym",
          pick,
          true,
          tfStatementForSynonym(word, pick),
          synonyms.join(", "),
        );
      }
      const synSet = new Set(synonyms.map(normalizeText));
      const fakes = pickDistractorStrings(
        word,
        pool,
        synonyms[0] ?? word.word,
        1,
        (w) => (w.synonyms ?? []).filter((s) => !synSet.has(normalizeText(s))),
        rng,
      );
      if (fakes.length === 0) return null;
      return makeTF(
        word,
        "synonym",
        fakes[0],
        false,
        tfStatementForSynonym(word, fakes[0]),
        synonyms.join(", "),
      );
    }

    case "antonym": {
      const antonyms = getAntonyms(word);
      if (antonyms.length === 0) return null;
      if (wantTrue) {
        const pick = antonyms[Math.floor(random() * antonyms.length)];
        return makeTF(
          word,
          "antonym",
          pick,
          true,
          tfStatementForAntonym(word, pick),
          antonyms.join(", "),
        );
      }
      // A *synonym* of the target is a great false antonym.
      const synonyms = word.synonyms ?? [];
      const antSet = new Set(antonyms.map(normalizeText));
      const synSet = new Set(synonyms.map(normalizeText));
      let candidate: string | undefined;
      if (synonyms.length > 0) {
        candidate = synonyms[Math.floor(random() * synonyms.length)];
      } else {
        const fakes = pickDistractorStrings(
          word,
          pool,
          antonyms[0],
          1,
          (w) =>
            (w.synonyms ?? []).filter(
              (s) =>
                !antSet.has(normalizeText(s)) && !synSet.has(normalizeText(s)),
            ),
          rng,
        );
        candidate = fakes[0];
      }
      if (!candidate) return null;
      return makeTF(
        word,
        "antonym",
        candidate,
        false,
        tfStatementForAntonym(word, candidate),
        antonyms.join(", "),
      );
    }

    case "arabic": {
      const arabic = getArabic(word);
      if (!arabic) return null;
      if (wantTrue) {
        return makeTF(
          word,
          "arabic",
          arabic,
          true,
          tfStatementForArabic(word, arabic),
          arabic,
        );
      }
      const fakes = pickDistractorStrings(
        word,
        pool,
        arabic,
        1,
        (w) => w.arabic,
        rng,
      );
      if (fakes.length === 0) return null;
      return makeTF(
        word,
        "arabic",
        fakes[0],
        false,
        tfStatementForArabic(word, fakes[0]),
        arabic,
      );
    }

    case "tone": {
      const tone = getTone(word);
      if (!tone) return null;
      if (wantTrue) {
        return makeTF(
          word,
          "tone",
          tone,
          true,
          tfStatementForTone(word, tone),
          tone,
        );
      }
      const TONES: Tone[] = [
        "Neutral",
        "Positive",
        "Negative",
        "Formal",
        "Informal",
      ];
      const others = TONES.filter((t) => t !== tone);
      const fake = others[Math.floor(random() * others.length)];
      return makeTF(
        word,
        "tone",
        fake,
        false,
        tfStatementForTone(word, fake),
        tone,
      );
    }
  }
}

/* -------------------------------------------------------------------------- */
/* Convenience: build all question kinds available for a given word.          */
/* -------------------------------------------------------------------------- */

export interface BuildAllOptions extends GeneratorOptions {
  include?: QuestionKind[];
}

const ALL_KINDS: QuestionKind[] = [
  "word-to-def",
  "def-to-word",
  "fill-blank",
  "synonym-mcq",
  "antonym-mcq",
  "tf-definition",
  "tf-synonym",
  "tf-antonym",
  "tf-arabic",
  "tf-tone",
];

export function buildAllForWord(
  word: Word,
  options: BuildAllOptions = {},
): Question[] {
  const include = new Set(options.include ?? ALL_KINDS);
  const out: Question[] = [];
  if (include.has("word-to-def")) {
    const q = generateWordToDefinition(word, options);
    if (q) out.push(q);
  }
  if (include.has("def-to-word")) {
    const q = generateDefinitionToWord(word, options);
    if (q) out.push(q);
  }
  if (include.has("fill-blank")) {
    const q = generateFillBlank(word, options);
    if (q) out.push(q);
  }
  if (include.has("synonym-mcq")) {
    const q = generateSynonymMCQ(word, options);
    if (q) out.push(q);
  }
  if (include.has("antonym-mcq")) {
    const q = generateAntonymMCQ(word, options);
    if (q) out.push(q);
  }
  if (include.has("tf-definition")) {
    const q = generateTrueFalse(word, "definition", options);
    if (q) out.push(q);
  }
  if (include.has("tf-synonym")) {
    const q = generateTrueFalse(word, "synonym", options);
    if (q) out.push(q);
  }
  if (include.has("tf-antonym")) {
    const q = generateTrueFalse(word, "antonym", options);
    if (q) out.push(q);
  }
  if (include.has("tf-arabic")) {
    const q = generateTrueFalse(word, "arabic", options);
    if (q) out.push(q);
  }
  if (include.has("tf-tone")) {
    const q = generateTrueFalse(word, "tone", options);
    if (q) out.push(q);
  }
  return out;
}

/** Verify whether a user's response is correct for a given question. */
export function isAnswerCorrect(
  q: Question,
  response: string | boolean | null | undefined,
): boolean {
  if (response === null || response === undefined) return false;
  if (q.kind === "fill-blank") {
    if (typeof response !== "string") return false;
    const norm = normalizeText(response);
    return q.acceptableAnswers.some((a) => normalizeText(a) === norm);
  }
  if (
    q.kind === "tf-definition" ||
    q.kind === "tf-synonym" ||
    q.kind === "tf-antonym" ||
    q.kind === "tf-arabic" ||
    q.kind === "tf-tone"
  ) {
    if (typeof response === "boolean") return response === q.answer;
    if (typeof response === "string") {
      const r = normalizeText(response);
      return (r === "true") === q.answer;
    }
    return false;
  }
  // MCQ
  if (typeof response !== "string") return false;
  const mcq = q as MCQQuestion;
  return normalizeText(response) === normalizeText(mcq.correct);
}
