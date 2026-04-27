// ─────────────────────────────────────────────────────────────────────────────
// GRE-style question generation: Text Completion and Sentence Equivalence.
//
// These build on the existing word bank (definition + 3 example sentences + 3
// synonyms per Word) to produce exam-realistic items without hand-authoring
// every passage. Distractors are pulled from other entries in the bank,
// preferring same part of speech, so accidental synonyms are unlikely.
// ─────────────────────────────────────────────────────────────────────────────

import { type Word } from "@/data/words";
import { shuffleArray } from "@/lib/srs";
import { type TestQuestionRecord } from "@/lib/storage";

// ─── Types ──────────────────────────────────────────────────────────────────

export type GREQuestionKind = "text-completion" | "sentence-equivalence";

export interface TCBlank {
  /** 0-based blank index in the passage. */
  index: number;
  /** Word that the blank is hiding. */
  targetWord: Word;
  /** All choices for this blank (correct + distractors), shuffled. */
  choices: string[];
  /** The single correct choice for this blank. */
  correct: string;
}

export interface TextCompletionQuestion {
  id: string;
  kind: "text-completion";
  /** Number of blanks (1, 2, or 3). */
  numBlanks: 1 | 2 | 3;
  /** Passage with `[1]`, `[2]`, `[3]` markers where the blanks belong. */
  passage: string;
  /** Optional context clue label shown above the passage. */
  clueLabel: string;
  blanks: TCBlank[];
}

export interface SentenceEquivalenceQuestion {
  id: string;
  kind: "sentence-equivalence";
  /** Sentence with a single `_____` marker. */
  sentence: string;
  /** Six lowercase choices, two of which are correct. */
  choices: string[];
  /** The two equivalent correct choices. */
  correctPair: [string, string];
  /** Word the blank was originally based on (used for explanation). */
  targetWord: Word;
}

export type GREQuestion = TextCompletionQuestion | SentenceEquivalenceQuestion;

// ─── Helpers ────────────────────────────────────────────────────────────────

const SINGLE_WORD = /^[a-z][a-z'-]*$/i;

/** Word kept in the SE pool only when it offers ≥ 2 clean single-word synonyms. */
function seUsableSynonyms(w: Word): string[] {
  const syns = (w.synonyms ?? []).filter(
    (s) => SINGLE_WORD.test(s) && s.toLowerCase() !== w.word.toLowerCase(),
  );
  // Deduplicate just in case.
  const seen = new Set<string>();
  const out: string[] = [];
  for (const s of syns) {
    const k = s.toLowerCase();
    if (!seen.has(k)) {
      seen.add(k);
      out.push(s);
    }
  }
  return out;
}

/** Replace a target word's first occurrence in the sentence with `replacement`. */
function blankSentence(sentence: string, word: string, replacement: string): string {
  const base = word.toLowerCase();
  const exact = new RegExp(`\\b${base}\\w*\\b`, "i");
  if (exact.test(sentence)) return sentence.replace(exact, replacement);
  // Loose fallback — first 4 letters.
  const prefix = base.slice(0, Math.min(4, base.length));
  const loose = new RegExp(`\\b${prefix}\\w*\\b`, "i");
  if (loose.test(sentence)) return sentence.replace(loose, replacement);
  return `${sentence} (${replacement})`;
}

/** True iff the example contains the target headword as its own token. */
function exampleContainsHeadword(example: string, headword: string): boolean {
  const re = new RegExp(`\\b${headword.toLowerCase()}\\w*\\b`, "i");
  return re.test(example);
}

/** Pick a usable example sentence for the target word, or null if none exists. */
function pickExample(w: Word, rng: () => number = Math.random): string | null {
  const candidates = (w.examples ?? []).filter((e) =>
    exampleContainsHeadword(e, w.word),
  );
  if (candidates.length === 0) return null;
  return candidates[Math.floor(rng() * candidates.length)];
}

/** Pick `n` distinct distractor words of the same POS, excluding any in `exclude`. */
function pickDistractorWords(
  pool: Word[],
  target: Word,
  exclude: Set<string>,
  n: number,
  rng: () => number = Math.random,
): Word[] {
  const blocked = new Set<string>([target.word.toLowerCase(), ...exclude]);
  const samePos = pool.filter(
    (w) =>
      w.id !== target.id &&
      w.pos === target.pos &&
      !blocked.has(w.word.toLowerCase()) &&
      SINGLE_WORD.test(w.word),
  );
  const shuffled = shuffleArray(samePos);
  // RNG-aware shuffle for determinism if a custom RNG was passed.
  if (rng !== Math.random) {
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
  }
  return shuffled.slice(0, n);
}

/** Shuffle that respects an optional rng. */
function rngShuffle<T>(arr: T[], rng: () => number): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/**
 * Curated openers that establish a logical clue (contrast, cause/effect,
 * continuation, tone shift). We only prepend an opener when the sentence
 * doesn't already start with a similar connective.
 */
const CLUE_OPENERS: { label: string; openers: string[] }[] = [
  {
    label: "Contrast",
    openers: ["Although it appeared otherwise, ", "Despite expectations, "],
  },
  {
    label: "Cause / Effect",
    openers: ["As a result, ", "Consequently, "],
  },
  { label: "Continuation", openers: ["Indeed, ", "Moreover, "] },
  { label: "Tone shift", openers: ["Strikingly, ", "Notably, "] },
  { label: "Emphasis", openers: ["In fact, ", "Tellingly, "] },
];

/** Pick a clue label/opener pair for a generated TC item. */
function pickClue(rng: () => number): { label: string; opener: string } {
  const bucket = CLUE_OPENERS[Math.floor(rng() * CLUE_OPENERS.length)];
  const opener = bucket.openers[Math.floor(rng() * bucket.openers.length)];
  return { label: bucket.label, opener };
}

/** Stitch multiple example sentences into a 2–3 sentence passage. */
function stitchPassage(
  parts: { sentence: string; marker: string }[],
  clueOpener: string,
): string {
  if (parts.length === 0) return "";
  const [first, ...rest] = parts;
  // Lowercase the first word of the first sentence after prepending an opener
  // so it reads naturally (e.g. "Although it appeared otherwise, the …").
  const firstSentence = first.sentence.charAt(0).toLowerCase() + first.sentence.slice(1);
  const head = `${clueOpener}${firstSentence}`;
  const tail = rest.map((p) => p.sentence).join(" ");
  return tail ? `${head} ${tail}` : head;
}

// ─── Text Completion ────────────────────────────────────────────────────────

export interface TextCompletionOptions {
  numBlanks?: 1 | 2 | 3;
  rng?: () => number;
}

/**
 * Build one Text Completion item.
 * - 1 blank → 5 choices.
 * - 2 or 3 blanks → 3 choices per blank.
 * Returns null if the inputs can't satisfy the format (e.g. not enough words
 * with usable example sentences).
 */
export function generateTextCompletion(
  pool: Word[],
  options: TextCompletionOptions = {},
): TextCompletionQuestion | null {
  const rng = options.rng ?? Math.random;
  const numBlanks: 1 | 2 | 3 = options.numBlanks ?? 1;
  const numChoicesPerBlank = numBlanks === 1 ? 5 : 3;

  // Eligible targets must have at least one usable example sentence.
  const eligible = pool.filter(
    (w) => SINGLE_WORD.test(w.word) && (w.examples ?? []).some((e) => exampleContainsHeadword(e, w.word)),
  );
  if (eligible.length < numBlanks) return null;

  const shuffled = rngShuffle(eligible, rng);
  const targets: Word[] = [];
  const usedIds = new Set<string>();
  for (const w of shuffled) {
    if (targets.length >= numBlanks) break;
    if (usedIds.has(w.id)) continue;
    targets.push(w);
    usedIds.add(w.id);
  }
  if (targets.length < numBlanks) return null;

  // For each target, build its example sentence and choices.
  const blanks: TCBlank[] = [];
  const passageParts: { sentence: string; marker: string }[] = [];
  for (let i = 0; i < targets.length; i++) {
    const t = targets[i];
    const example = pickExample(t, rng);
    if (!example) return null;
    const marker = `[${i + 1}]`;
    const sentence = blankSentence(example, t.word, marker);
    passageParts.push({ sentence, marker });

    // Distractors must not be the target's own synonyms (they'd also be correct).
    const exclude = new Set<string>(
      (t.synonyms ?? []).map((s) => s.toLowerCase()),
    );
    const distractorWords = pickDistractorWords(
      pool,
      t,
      exclude,
      numChoicesPerBlank - 1,
      rng,
    );
    if (distractorWords.length < numChoicesPerBlank - 1) return null;

    const choices = rngShuffle(
      [t.word, ...distractorWords.map((w) => w.word)],
      rng,
    );
    blanks.push({
      index: i,
      targetWord: t,
      choices,
      correct: t.word,
    });
  }

  const clue = pickClue(rng);
  // Only prepend the opener if the leading sentence doesn't already start with
  // a connective like "Although", "However", "Despite", etc.
  const leading = passageParts[0].sentence.trim().toLowerCase();
  const startsWithConnective = /^(although|however|despite|because|therefore|moreover|consequently|indeed|nonetheless|similarly|in contrast)\b/.test(
    leading,
  );
  const opener = startsWithConnective ? "" : clue.opener;
  const passage = stitchPassage(passageParts, opener);

  return {
    id: `tc:${numBlanks}:${targets.map((t) => t.id).join("|")}`,
    kind: "text-completion",
    numBlanks,
    passage,
    clueLabel: clue.label,
    blanks,
  };
}

// ─── Sentence Equivalence ───────────────────────────────────────────────────

export interface SentenceEquivalenceOptions {
  rng?: () => number;
}

/**
 * Build one Sentence Equivalence item.
 * Six choices, two of which are equivalent synonyms that both fit the blank.
 * Returns null if the target word doesn't have ≥ 2 clean single-word synonyms.
 */
export function generateSentenceEquivalence(
  pool: Word[],
  target: Word | null = null,
  options: SentenceEquivalenceOptions = {},
): SentenceEquivalenceQuestion | null {
  const rng = options.rng ?? Math.random;

  // If no specific target, pick one that has the structural prerequisites.
  let chosen = target;
  if (!chosen) {
    const eligible = pool.filter((w) => {
      if (!SINGLE_WORD.test(w.word)) return false;
      if (seUsableSynonyms(w).length < 2) return false;
      return (w.examples ?? []).some((e) => exampleContainsHeadword(e, w.word));
    });
    if (eligible.length === 0) return null;
    chosen = eligible[Math.floor(rng() * eligible.length)];
  } else {
    if (seUsableSynonyms(chosen).length < 2) return null;
    if (!(chosen.examples ?? []).some((e) => exampleContainsHeadword(e, chosen!.word))) {
      return null;
    }
  }

  const example = pickExample(chosen, rng);
  if (!example) return null;
  const sentence = blankSentence(example, chosen.word, "_____");

  // Pick the two equivalent answers from the curated synonyms list.
  const synonyms = seUsableSynonyms(chosen);
  const synShuffled = rngShuffle(synonyms, rng);
  const correctPair: [string, string] = [synShuffled[0], synShuffled[1]];

  // Distractors: 4 single-word, same-POS words from other entries — and not
  // synonyms of each other (different lemmas naturally satisfies this).
  const exclude = new Set<string>([
    ...synonyms.map((s) => s.toLowerCase()),
    chosen.word.toLowerCase(),
  ]);
  const distractorWords = pickDistractorWords(pool, chosen, exclude, 4, rng);
  if (distractorWords.length < 4) return null;

  const choices = rngShuffle(
    [...correctPair, ...distractorWords.map((w) => w.word.toLowerCase())],
    rng,
  );

  return {
    id: `se:${chosen.id}:${correctPair.join("+")}`,
    kind: "sentence-equivalence",
    sentence,
    choices,
    correctPair,
    targetWord: chosen,
  };
}

// ─── Test builder ───────────────────────────────────────────────────────────

export type GRESimMode = "text-completion" | "sentence-equivalence" | "mixed";

export interface BuildSimOptions {
  mode: GRESimMode;
  numQuestions: number;
  pool: Word[];
  rng?: () => number;
}

/**
 * Compose a list of GRE-simulation questions. For Text Completion we mix in a
 * few 2- and 3-blank passages so the test feels exam-like. For Mixed we
 * alternate TC and SE.
 */
export function buildGRESimulation(opts: BuildSimOptions): GREQuestion[] {
  const { mode, numQuestions, pool, rng = Math.random } = opts;
  const out: GREQuestion[] = [];
  let safety = numQuestions * 8; // bail-out for impossible configurations

  while (out.length < numQuestions && safety > 0) {
    safety--;
    const i = out.length;
    let q: GREQuestion | null = null;

    if (mode === "text-completion") {
      // Distribute blanks: roughly 60% single, 30% double, 10% triple.
      const r = rng();
      const blanks: 1 | 2 | 3 = r < 0.6 ? 1 : r < 0.9 ? 2 : 3;
      q = generateTextCompletion(pool, { numBlanks: blanks, rng });
    } else if (mode === "sentence-equivalence") {
      q = generateSentenceEquivalence(pool, null, { rng });
    } else {
      // Mixed: alternate TC and SE.
      if (i % 2 === 0) {
        const r = rng();
        const blanks: 1 | 2 | 3 = r < 0.7 ? 1 : 2;
        q = generateTextCompletion(pool, { numBlanks: blanks, rng });
      } else {
        q = generateSentenceEquivalence(pool, null, { rng });
      }
    }

    if (q) {
      // De-dupe by id so we don't show the same item twice in one session.
      if (out.some((existing) => existing.id === q!.id)) continue;
      out.push(q);
    }
  }

  return out;
}

// ─── Grading ────────────────────────────────────────────────────────────────

export type GREResponse =
  | { kind: "text-completion"; selected: (string | null)[] }
  | { kind: "sentence-equivalence"; selected: string[] };

/** No partial credit — TC requires every blank correct, SE requires the exact pair. */
export function isGREAnswerCorrect(q: GREQuestion, response: GREResponse | null): boolean {
  if (response === null) return false;
  if (q.kind === "text-completion" && response.kind === "text-completion") {
    if (response.selected.length !== q.blanks.length) return false;
    return q.blanks.every((b, i) => response.selected[i] === b.correct);
  }
  if (q.kind === "sentence-equivalence" && response.kind === "sentence-equivalence") {
    if (response.selected.length !== 2) return false;
    const got = new Set(response.selected.map((s) => s.toLowerCase()));
    return q.correctPair.every((s) => got.has(s.toLowerCase()));
  }
  return false;
}

/**
 * Translate a single graded GRE-simulation question into one or more
 * TestQuestionRecord entries — the same schema the timed-test analytics use.
 *
 * - Text Completion → one record per blank, each tied to that blank's target
 *   word so per-word and per-mission rollups stay accurate. The kind is
 *   `text-completion`. Time spent is split evenly across the blanks.
 * - Sentence Equivalence → one record tied to the target word, kind
 *   `sentence-equivalence`. The user's pair and the correct pair are joined
 *   with a separator for display.
 */
export function recordsForGREQuestion(
  q: GREQuestion,
  response: GREResponse | null,
  totalTimeSpentMs: number,
): TestQuestionRecord[] {
  if (q.kind === "text-completion") {
    const r =
      response?.kind === "text-completion"
        ? response
        : { kind: "text-completion" as const, selected: q.blanks.map(() => null as string | null) };
    const perBlankTime = Math.round(totalTimeSpentMs / Math.max(1, q.blanks.length));
    return q.blanks.map((b, i) => {
      const userPick = r.selected[i] ?? "";
      const answered = !!userPick;
      const correct = answered && userPick === b.correct;
      const blankSuffix = q.numBlanks === 1 ? "" : ` (blank ${i + 1})`;
      return {
        questionId: `${q.id}#${i}`,
        kind: "text-completion",
        wordId: b.targetWord.id,
        word: b.targetWord.word,
        day: b.targetWord.day,
        group: b.targetWord.group,
        pos: b.targetWord.pos,
        prompt: `${q.passage}${blankSuffix}`,
        userAnswer: userPick || "(skipped)",
        correctAnswer: b.correct,
        correct,
        answered,
        flagged: false,
        timeSpentMs: perBlankTime,
      };
    });
  }

  // Sentence Equivalence
  const r =
    response?.kind === "sentence-equivalence"
      ? response
      : { kind: "sentence-equivalence" as const, selected: [] as string[] };
  const correct = isGREAnswerCorrect(q, r);
  const target = q.targetWord;
  const userJoined =
    r.selected.length === 0 ? "(skipped)" : r.selected.join(" + ");
  return [
    {
      questionId: q.id,
      kind: "sentence-equivalence",
      wordId: target.id,
      word: target.word,
      day: target.day,
      group: target.group,
      pos: target.pos,
      prompt: q.sentence,
      userAnswer: userJoined,
      correctAnswer: q.correctPair.join(" + "),
      correct,
      answered: r.selected.length > 0,
      flagged: false,
      timeSpentMs: totalTimeSpentMs,
    },
  ];
}

/**
 * Lightweight check used by the UI to know whether the learner has filled in
 * everything required to grade the question. Doesn't grade correctness.
 */
export function isGREResponseComplete(q: GREQuestion, response: GREResponse | null): boolean {
  if (response === null) return false;
  if (q.kind === "text-completion" && response.kind === "text-completion") {
    if (response.selected.length !== q.blanks.length) return false;
    return response.selected.every((s) => s !== null && s !== undefined);
  }
  if (q.kind === "sentence-equivalence" && response.kind === "sentence-equivalence") {
    return response.selected.length === 2;
  }
  return false;
}
