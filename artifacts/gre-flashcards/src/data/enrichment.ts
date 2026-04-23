import aboundImg from "@/assets/word-illustrations/abound.png";
import amorphousImg from "@/assets/word-illustrations/amorphous.png";
import austereImg from "@/assets/word-illustrations/austere.png";
import belieImg from "@/assets/word-illustrations/belie.png";
import capriciousImg from "@/assets/word-illustrations/capricious.png";
import cerebralImg from "@/assets/word-illustrations/cerebral.png";
import congenialImg from "@/assets/word-illustrations/congenial.png";
import conspicuousImg from "@/assets/word-illustrations/conspicuous.png";
import cursoryImg from "@/assets/word-illustrations/cursory.png";
import dauntingImg from "@/assets/word-illustrations/daunting.png";

export type Tone = "Neutral" | "Positive" | "Negative" | "Formal" | "Informal";

export interface EtymologyPart {
  part: string;
  language: string;
  meaning: string;
}

export interface WordEnrichment {
  shortDef?: string;
  tone?: Tone;
  antonyms?: string[];
  mnemonic?: string;
  wordFamily?: string[];
  etymology?: EtymologyPart[];
  etymologyMeaning?: string;
  imageUrl?: string;
}

export const ENRICHMENT: Record<string, WordEnrichment> = {
  abound: {
    shortDef: "To exist in great quantity; to be filled with.",
    tone: "Neutral",
    antonyms: ["lack", "scarce"],
    mnemonic: "Picture a forest where rabbits, deer, and birds 'a-bound' off every tree — there's just too many to count!",
    wordFamily: ["abundance", "abundant", "abounding", "superabundant"],
    etymology: [
      { part: "ab-", language: "Latin", meaning: "from / away" },
      { part: "undare", language: "Latin", meaning: "to flow in waves" },
    ],
    etymologyMeaning: "to overflow",
    imageUrl: aboundImg,
  },
  amorphous: {
    shortDef: "Lacking a definite shape, form, or structure.",
    tone: "Neutral",
    antonyms: ["defined", "structured"],
    mnemonic: "Think of a 'morph' that's gone 'a-' (without) — it can't pick a shape, so it just keeps melting!",
    wordFamily: ["morph", "morphology", "metamorphosis", "amorphously"],
    etymology: [
      { part: "a-", language: "Greek", meaning: "without" },
      { part: "morphē", language: "Greek", meaning: "form, shape" },
    ],
    etymologyMeaning: "without form",
    imageUrl: amorphousImg,
  },
  austere: {
    shortDef: "Severe, plain, and without any luxury or comfort.",
    tone: "Negative",
    antonyms: ["lavish", "indulgent"],
    mnemonic: "Imagine a stern monk saying 'AUSTERE you go — only bread and water for you!' Strict and bare to the bone.",
    wordFamily: ["austerity", "austerely", "austereness"],
    etymology: [
      { part: "austērus", language: "Latin", meaning: "harsh, severe" },
      { part: "austēros", language: "Greek", meaning: "bitter, harsh" },
    ],
    etymologyMeaning: "harsh and bitter",
    imageUrl: austereImg,
  },
  belie: {
    shortDef: "To give a false impression of; to contradict.",
    tone: "Neutral",
    antonyms: ["reveal", "confirm"],
    mnemonic: "Hidden in 'belie' is the word 'lie' — what you see is a LIE about what's really inside.",
    wordFamily: ["belied", "belying", "lie"],
    etymology: [
      { part: "be-", language: "Old English", meaning: "about, around" },
      { part: "lēogan", language: "Old English", meaning: "to lie, deceive" },
    ],
    etymologyMeaning: "to tell lies about",
    imageUrl: belieImg,
  },
  capricious: {
    shortDef: "Sudden, unpredictable changes of mood or behavior.",
    tone: "Negative",
    antonyms: ["steady", "consistent"],
    mnemonic: "Think of a baby goat ('capra') leaping wildly in any direction — capricious moods jump just like that!",
    wordFamily: ["caprice", "capriciously", "capriciousness"],
    etymology: [
      { part: "capo", language: "Italian", meaning: "head" },
      { part: "riccio", language: "Italian", meaning: "hedgehog (hair on end)" },
    ],
    etymologyMeaning: "head with hair standing on end (sudden fright)",
    imageUrl: capriciousImg,
  },
  cerebral: {
    shortDef: "Relating to the brain or intellect; very intellectual.",
    tone: "Neutral",
    antonyms: ["instinctive", "physical"],
    mnemonic: "'Cerebral' sounds like 'cereal' — but instead of cornflakes for breakfast, this person eats ideas!",
    wordFamily: ["cerebrum", "cerebrally", "cerebration", "cerebellum"],
    etymology: [
      { part: "cerebrum", language: "Latin", meaning: "brain" },
      { part: "-al", language: "Latin", meaning: "relating to" },
    ],
    etymologyMeaning: "relating to the brain",
    imageUrl: cerebralImg,
  },
  congenial: {
    shortDef: "Friendly, pleasant, and well-suited to one's tastes.",
    tone: "Positive",
    antonyms: ["unpleasant", "incompatible"],
    mnemonic: "'Con-genial' = with (con) a genial smile. Picture friends sharing tea, all naturally clicking together.",
    wordFamily: ["congeniality", "congenially", "genial"],
    etymology: [
      { part: "com-", language: "Latin", meaning: "together with" },
      { part: "genialis", language: "Latin", meaning: "pleasant, festive" },
    ],
    etymologyMeaning: "of the same pleasant nature",
    imageUrl: congenialImg,
  },
  conspicuous: {
    shortDef: "Easily seen or noticed; standing out.",
    tone: "Neutral",
    antonyms: ["hidden", "inconspicuous"],
    mnemonic: "A pink flamingo in a crowd of grey pigeons is CONSPICUOUS — you can't help but spot it!",
    wordFamily: ["conspicuously", "conspicuousness", "inconspicuous"],
    etymology: [
      { part: "com-", language: "Latin", meaning: "intensifier" },
      { part: "specere", language: "Latin", meaning: "to look at" },
    ],
    etymologyMeaning: "very visible to the eye",
    imageUrl: conspicuousImg,
  },
  cursory: {
    shortDef: "Quick and not thorough; done in a rush.",
    tone: "Negative",
    antonyms: ["thorough", "detailed"],
    mnemonic: "Imagine a cursor zipping across the page — a 'cursory' look moves that fast, missing the details.",
    wordFamily: ["cursorily", "cursoriness", "cursor"],
    etymology: [
      { part: "currere", language: "Latin", meaning: "to run" },
      { part: "-orius", language: "Latin", meaning: "pertaining to" },
    ],
    etymologyMeaning: "running over hastily",
    imageUrl: cursoryImg,
  },
  daunting: {
    shortDef: "Intimidating; making one feel afraid or unable to cope.",
    tone: "Negative",
    antonyms: ["reassuring", "encouraging"],
    mnemonic: "Picture a tiny climber 'taunted' by a giant mountain — that overwhelming feeling is DAUNTING.",
    wordFamily: ["daunt", "dauntless", "undaunted"],
    etymology: [
      { part: "domitare", language: "Latin", meaning: "to tame, subdue" },
      { part: "danter", language: "Old French", meaning: "to overwhelm" },
    ],
    etymologyMeaning: "to subdue or overwhelm",
    imageUrl: dauntingImg,
  },
};

export function getEnrichment(wordKey: string): WordEnrichment | undefined {
  return ENRICHMENT[wordKey.toLowerCase()];
}
