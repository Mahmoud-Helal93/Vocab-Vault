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

  // ── Mission 1 · Set 2 ──
  deify: {
    shortDef: "To worship as a god; to idealize excessively.",
    tone: "Neutral",
    antonyms: ["demonize", "vilify"],
    mnemonic: "DEI- (god) + -FY (make) — to literally make someone into a god in your eyes.",
    wordFamily: ["deification", "deity", "deified"],
    etymology: [
      { part: "deus", language: "Latin", meaning: "god" },
      { part: "-ficare", language: "Latin", meaning: "to make" },
    ],
    etymologyMeaning: "to make into a god",
  },
  didactic: {
    shortDef: "Designed to teach, especially with a moral lesson.",
    tone: "Neutral",
    antonyms: ["entertaining", "uninstructive"],
    mnemonic: "DIDACTIC sounds like 'did-act-tick' — the teacher 'did act' to tick off every lesson on the board.",
    wordFamily: ["didactically", "didacticism"],
    etymology: [
      { part: "didaktikos", language: "Greek", meaning: "apt at teaching" },
      { part: "didaskein", language: "Greek", meaning: "to teach" },
    ],
    etymologyMeaning: "skilled at teaching",
  },
  disseminate: {
    shortDef: "To spread information widely.",
    tone: "Neutral",
    antonyms: ["conceal", "withhold"],
    mnemonic: "DIS-SEMINATE sounds like 'scatter seeds' — sowing ideas everywhere so they take root.",
    wordFamily: ["dissemination", "disseminator"],
    etymology: [
      { part: "dis-", language: "Latin", meaning: "apart, abroad" },
      { part: "seminare", language: "Latin", meaning: "to sow seeds" },
    ],
    etymologyMeaning: "to scatter seeds",
  },
  feasible: {
    shortDef: "Possible and reasonable to do.",
    tone: "Positive",
    antonyms: ["impossible", "impractical"],
    mnemonic: "FEAS-IBLE sounds like 'fee-sible' — if you can pay the fee, the plan is doable!",
    wordFamily: ["feasibility", "feasibly"],
    etymology: [
      { part: "fais-", language: "Old French", meaning: "to do" },
      { part: "facere", language: "Latin", meaning: "to make, do" },
    ],
    etymologyMeaning: "able to be done",
  },
  flout: {
    shortDef: "To openly disregard a rule or convention.",
    tone: "Negative",
    antonyms: ["obey", "respect"],
    mnemonic: "FLOUT sounds like 'flaunt' the rules — proudly showing off that you are breaking them.",
    wordFamily: ["flouter", "flouting"],
    etymology: [
      { part: "flouten", language: "Middle English", meaning: "to play the flute, mock" },
      { part: "fluitan", language: "Middle Dutch", meaning: "to whistle, jeer" },
    ],
    etymologyMeaning: "to mock or jeer at",
  },
  homogeneous: {
    shortDef: "All of the same kind; uniform throughout.",
    tone: "Neutral",
    antonyms: ["heterogeneous", "diverse"],
    mnemonic: "HOMO- (same) + GENUS (kind) — every member is of the same kind, all alike.",
    wordFamily: ["homogeneity", "homogeneously", "homogenize"],
    etymology: [
      { part: "homos", language: "Greek", meaning: "same" },
      { part: "genos", language: "Greek", meaning: "kind, race" },
    ],
    etymologyMeaning: "of the same kind",
  },
  humdrum: {
    shortDef: "Boringly ordinary; lacking variety or excitement.",
    tone: "Negative",
    antonyms: ["exciting", "thrilling"],
    mnemonic: "Picture a 'hum' and a 'drum' beating the same dull beat — HUMDRUM, day after day.",
    wordFamily: ["humdrumness"],
    etymology: [
      { part: "hum", language: "English", meaning: "low monotonous sound" },
      { part: "drum", language: "English", meaning: "rhythmic beat" },
    ],
    etymologyMeaning: "monotonous humming and drumming",
  },
  insipid: {
    shortDef: "Lacking flavor or interest; dull and bland.",
    tone: "Negative",
    antonyms: ["flavorful", "exciting"],
    mnemonic: "IN- (not) + SIPID (tasty) — like a sip of plain water, no taste at all.",
    wordFamily: ["insipidly", "insipidity", "insipidness"],
    etymology: [
      { part: "in-", language: "Latin", meaning: "not" },
      { part: "sapidus", language: "Latin", meaning: "tasty, flavorful" },
    ],
    etymologyMeaning: "without flavor",
  },
  loquacious: {
    shortDef: "Tending to talk a great deal; very talkative.",
    tone: "Neutral",
    antonyms: ["taciturn", "reserved"],
    mnemonic: "LOQU- (speak) — a LOQUACIOUS friend speaks 'low quack-ious-ly' all day long.",
    wordFamily: ["loquaciously", "loquacity", "loquaciousness"],
    etymology: [
      { part: "loqui", language: "Latin", meaning: "to speak" },
      { part: "-acious", language: "Latin", meaning: "tending to" },
    ],
    etymologyMeaning: "tending to speak",
  },
  misanthropic: {
    shortDef: "Disliking and distrusting humankind.",
    tone: "Negative",
    antonyms: ["sociable", "philanthropic"],
    mnemonic: "MIS- (hate) + ANTHROP (human) — a hatred of humans makes one MISANTHROPIC.",
    wordFamily: ["misanthrope", "misanthropy", "misanthropically"],
    etymology: [
      { part: "misein", language: "Greek", meaning: "to hate" },
      { part: "anthropos", language: "Greek", meaning: "human being" },
    ],
    etymologyMeaning: "hatred of humankind",
  },

  // ── Mission 1 · Set 3 ──
  misnomer: {
    shortDef: "An incorrect or unsuitable name for something.",
    tone: "Neutral",
    antonyms: ["accuracy", "correct name"],
    mnemonic: "MIS- (wrong) + NOMER (name) — a 'mis-named' label that just doesn't fit.",
    wordFamily: ["misname"],
    etymology: [
      { part: "mes-", language: "Old French", meaning: "wrong" },
      { part: "nominer", language: "Old French", meaning: "to name" },
    ],
    etymologyMeaning: "to name wrongly",
  },
  negligent: {
    shortDef: "Failing to take proper care; carelessly neglectful.",
    tone: "Negative",
    antonyms: ["attentive", "careful"],
    mnemonic: "NEGLIGENT sounds like 'neglect-gent' — the careless gentleman who ignores his duties.",
    wordFamily: ["negligence", "negligently", "neglect"],
    etymology: [
      { part: "neg-", language: "Latin", meaning: "not" },
      { part: "legere", language: "Latin", meaning: "to pick up, choose" },
    ],
    etymologyMeaning: "not picking up (one's duties)",
  },
  obsequious: {
    shortDef: "Excessively eager to please; servilely flattering.",
    tone: "Negative",
    antonyms: ["assertive", "independent"],
    mnemonic: "OBSEQUIOUS sounds like 'ob-seek-yous' — always seeking your approval with shameless flattery.",
    wordFamily: ["obsequiously", "obsequiousness", "obsequy"],
    etymology: [
      { part: "ob-", language: "Latin", meaning: "after, toward" },
      { part: "sequi", language: "Latin", meaning: "to follow" },
    ],
    etymologyMeaning: "to follow closely (in service)",
  },
  placate: {
    shortDef: "To calm or soothe an angry person.",
    tone: "Positive",
    antonyms: ["anger", "provoke"],
    mnemonic: "PLACATE sounds like 'play-cake' — offer a treat to calm someone down.",
    wordFamily: ["placation", "placatory", "placating"],
    etymology: [
      { part: "placare", language: "Latin", meaning: "to calm, appease" },
      { part: "placere", language: "Latin", meaning: "to please" },
    ],
    etymologyMeaning: "to calm by pleasing",
  },
  proclivity: {
    shortDef: "A natural tendency or inclination.",
    tone: "Neutral",
    antonyms: ["aversion", "dislike"],
    mnemonic: "PRO-CLIVITY sounds like 'pro-cliff-ity' — leaning forward off a cliff toward what you favor.",
    wordFamily: ["proclivities"],
    etymology: [
      { part: "pro-", language: "Latin", meaning: "forward" },
      { part: "clivus", language: "Latin", meaning: "slope" },
    ],
    etymologyMeaning: "leaning forward toward something",
  },
  puerile: {
    shortDef: "Childishly silly and immature.",
    tone: "Negative",
    antonyms: ["mature", "adult"],
    mnemonic: "PUERILE sounds like 'pure-ill' — a 'pure' kid behaving in an 'ill' (immature) way.",
    wordFamily: ["puerilely", "puerility"],
    etymology: [
      { part: "puer", language: "Latin", meaning: "boy, child" },
      { part: "-ilis", language: "Latin", meaning: "like" },
    ],
    etymologyMeaning: "boyish, child-like",
  },
  quixotic: {
    shortDef: "Wildly idealistic and impractical.",
    tone: "Neutral",
    antonyms: ["pragmatic", "realistic"],
    mnemonic: "Think of Don QUIXOTE charging at windmills — chasing impossible dreams nobly but uselessly.",
    wordFamily: ["quixotically", "quixotism"],
    etymology: [
      { part: "Quixote", language: "Spanish", meaning: "Don Quixote, fictional knight" },
      { part: "-ic", language: "English", meaning: "having the quality of" },
    ],
    etymologyMeaning: "in the manner of Don Quixote",
  },
  spendthrift: {
    shortDef: "A person who wastes money carelessly.",
    tone: "Negative",
    antonyms: ["miser", "frugal"],
    mnemonic: "A SPENDTHRIFT 'spends' away every 'thrift' (savings) — money slips right through their hands.",
    wordFamily: ["spendthrifty"],
    etymology: [
      { part: "spend", language: "Old English", meaning: "to pay out" },
      { part: "thrift", language: "Old Norse", meaning: "prosperity, savings" },
    ],
    etymologyMeaning: "one who spends savings away",
  },
  taciturn: {
    shortDef: "Silent or reserved in speech.",
    tone: "Neutral",
    antonyms: ["loquacious", "talkative"],
    mnemonic: "TACITURN sounds like 'tacit-turn' — taking your turn but staying tacit (silent).",
    wordFamily: ["taciturnly", "taciturnity"],
    etymology: [
      { part: "tacitus", language: "Latin", meaning: "silent" },
      { part: "tacere", language: "Latin", meaning: "to be silent" },
    ],
    etymologyMeaning: "habitually silent",
  },
  wary: {
    shortDef: "Cautious about possible danger or problems.",
    tone: "Neutral",
    antonyms: ["careless", "trusting"],
    mnemonic: "WARY rhymes with 'scary' — when something feels scary, you become wary.",
    wordFamily: ["warily", "wariness", "aware"],
    etymology: [
      { part: "wær", language: "Old English", meaning: "aware, cautious" },
      { part: "-y", language: "English", meaning: "having the quality of" },
    ],
    etymologyMeaning: "having watchful awareness",
  },

  // ── Mission 2 · Set 1 ──
  adulterate: {
    shortDef: "To make impure by mixing in inferior substances.",
    tone: "Negative",
    antonyms: ["purify", "refine"],
    mnemonic: "Think of an 'adult-rate' drink watered down for kids — it's been ADULTERATED, no longer pure.",
    wordFamily: ["adulteration", "adulterant", "adulterator"],
    etymology: [
      { part: "ad-", language: "Latin", meaning: "to, toward" },
      { part: "alterare", language: "Latin", meaning: "to alter, change" },
    ],
    etymologyMeaning: "to change something for the worse",
  },
  advocate: {
    shortDef: "To publicly support a cause; a person who supports one.",
    tone: "Positive",
    antonyms: ["oppose", "discourage"],
    mnemonic: "An ADVOCATE 'adds a vote' to your side, speaking up loud and clear for you.",
    wordFamily: ["advocacy", "advocator", "advocated"],
    etymology: [
      { part: "ad-", language: "Latin", meaning: "to, toward" },
      { part: "vocare", language: "Latin", meaning: "to call" },
    ],
    etymologyMeaning: "to call to one's aid",
  },
  aggrandize: {
    shortDef: "To increase power, wealth, or status; to exaggerate.",
    tone: "Negative",
    antonyms: ["belittle", "diminish"],
    mnemonic: "AG-GRAND-IZE — to make yourself sound 'a-grand' (great) by puffing things up.",
    wordFamily: ["aggrandizement", "aggrandizer", "aggrandizing"],
    etymology: [
      { part: "ad-", language: "Latin", meaning: "to" },
      { part: "grandis", language: "Latin", meaning: "great, large" },
    ],
    etymologyMeaning: "to make great",
  },
  alacrity: {
    shortDef: "Brisk, cheerful eagerness to do something.",
    tone: "Positive",
    antonyms: ["reluctance", "apathy"],
    mnemonic: "Sounds like 'a-LACK-rity' but it's the opposite — lacking nothing in eagerness, all energy!",
    wordFamily: ["alacritous", "alacritously"],
    etymology: [
      { part: "alacer", language: "Latin", meaning: "lively, brisk" },
      { part: "-itas", language: "Latin", meaning: "state of being" },
    ],
    etymologyMeaning: "state of liveliness",
  },
  ambivalent: {
    shortDef: "Having mixed or conflicting feelings about something.",
    tone: "Neutral",
    antonyms: ["certain", "decisive"],
    mnemonic: "AMBI- (both) + VALENT (strong) — both sides pull on you with equal strength.",
    wordFamily: ["ambivalence", "ambivalently"],
    etymology: [
      { part: "ambi-", language: "Latin", meaning: "both" },
      { part: "valere", language: "Latin", meaning: "to be strong" },
    ],
    etymologyMeaning: "having strong feelings on both sides",
  },
  ameliorate: {
    shortDef: "To make a bad situation better; to improve.",
    tone: "Positive",
    antonyms: ["worsen", "aggravate"],
    mnemonic: "A-MEL-IORATE sounds like 'a-melody' — adding sweetness to make a rough situation better.",
    wordFamily: ["amelioration", "ameliorative", "ameliorator"],
    etymology: [
      { part: "ad-", language: "Latin", meaning: "to" },
      { part: "melior", language: "Latin", meaning: "better" },
    ],
    etymologyMeaning: "to make better",
  },
  amenable: {
    shortDef: "Open to suggestion; willing to cooperate.",
    tone: "Positive",
    antonyms: ["stubborn", "uncooperative"],
    mnemonic: "An AMENABLE friend says 'amen, able to do that!' — agreeable and ready to go along.",
    wordFamily: ["amenability", "amenably"],
    etymology: [
      { part: "amener", language: "Old French", meaning: "to lead, bring" },
      { part: "minare", language: "Latin", meaning: "to drive (animals)" },
    ],
    etymologyMeaning: "able to be led",
  },
  anachronistic: {
    shortDef: "Belonging to the wrong time period; out of date.",
    tone: "Negative",
    antonyms: ["modern", "contemporary"],
    mnemonic: "ANA- (against) + CHRONO (time) — fighting against time by sitting in the wrong era.",
    wordFamily: ["anachronism", "anachronistically"],
    etymology: [
      { part: "ana-", language: "Greek", meaning: "against, backward" },
      { part: "chronos", language: "Greek", meaning: "time" },
    ],
    etymologyMeaning: "against the (correct) time",
  },
  audacious: {
    shortDef: "Boldly daring; willing to take big risks.",
    tone: "Neutral",
    antonyms: ["timid", "cautious"],
    mnemonic: "AUDACIOUS sounds like 'audio-shouts' — loud, fearless and bold, demanding to be heard.",
    wordFamily: ["audacity", "audaciously", "audaciousness"],
    etymology: [
      { part: "audax", language: "Latin", meaning: "bold, daring" },
      { part: "audere", language: "Latin", meaning: "to dare" },
    ],
    etymologyMeaning: "full of daring",
  },
  avaricious: {
    shortDef: "Excessively greedy for money or possessions.",
    tone: "Negative",
    antonyms: ["generous", "selfless"],
    mnemonic: "AVAR-ICIOUS sounds like 'a-very-vicious' grab for money — never satisfied, always wanting more.",
    wordFamily: ["avarice", "avariciously", "avariciousness"],
    etymology: [
      { part: "avere", language: "Latin", meaning: "to crave, long for" },
      { part: "-icius", language: "Latin", meaning: "tending to" },
    ],
    etymologyMeaning: "tending to crave (wealth)",
  },

  // ── Mission 2 · Set 2 ──
  banal: {
    shortDef: "Lacking originality; commonplace and dull.",
    tone: "Negative",
    antonyms: ["original", "fresh"],
    mnemonic: "Picture a brown 'banana' everyone has seen a million times — totally BANAL, nothing new!",
    wordFamily: ["banality", "banally"],
    etymology: [
      { part: "ban", language: "Old French", meaning: "common, public summons" },
      { part: "-al", language: "French", meaning: "relating to" },
    ],
    etymologyMeaning: "open to all (hence ordinary)",
  },
  benign: {
    shortDef: "Gentle, harmless, and kindly in nature.",
    tone: "Positive",
    antonyms: ["malignant", "harmful"],
    mnemonic: "'Be-NICE' sounds like BENIGN — a benign smile is a nice, harmless one.",
    wordFamily: ["benignly", "benignity", "benignant"],
    etymology: [
      { part: "bene-", language: "Latin", meaning: "well, good" },
      { part: "gnus", language: "Latin", meaning: "born" },
    ],
    etymologyMeaning: "well-born, of good nature",
  },
  brazen: {
    shortDef: "Boldly shameless and unembarrassed.",
    tone: "Negative",
    antonyms: ["shy", "timid"],
    mnemonic: "Imagine a face of solid brass — a BRAZEN look that nothing can embarrass.",
    wordFamily: ["brazenly", "brazenness"],
    etymology: [
      { part: "bræs", language: "Old English", meaning: "brass" },
      { part: "-en", language: "Old English", meaning: "made of" },
    ],
    etymologyMeaning: "made of brass; hard-faced",
  },
  calumny: {
    shortDef: "A false statement spread to damage someone's reputation.",
    tone: "Negative",
    antonyms: ["praise", "compliment"],
    mnemonic: "Sounds like 'CALL-um-knee' — calling someone bad names behind their back.",
    wordFamily: ["calumnious", "calumniate", "calumniator"],
    etymology: [
      { part: "calumnia", language: "Latin", meaning: "trickery, false accusation" },
      { part: "calvi", language: "Latin", meaning: "to deceive" },
    ],
    etymologyMeaning: "false and malicious accusation",
  },
  candid: {
    shortDef: "Open, honest, and straightforward in expression.",
    tone: "Positive",
    antonyms: ["evasive", "guarded"],
    mnemonic: "A 'candle' shines clear light — a CANDID person speaks clearly with nothing hidden.",
    wordFamily: ["candor", "candidly", "candidness"],
    etymology: [
      { part: "candidus", language: "Latin", meaning: "white, bright, pure" },
      { part: "candēre", language: "Latin", meaning: "to shine" },
    ],
    etymologyMeaning: "shining white; pure and frank",
  },
  castigate: {
    shortDef: "To criticize or scold someone severely.",
    tone: "Negative",
    antonyms: ["praise", "commend"],
    mnemonic: "Imagine a 'cast' (rod) used to 'gate' bad behavior — a stern CASTIGATING from a strict teacher.",
    wordFamily: ["castigation", "castigator", "castigatory"],
    etymology: [
      { part: "castus", language: "Latin", meaning: "pure" },
      { part: "agere", language: "Latin", meaning: "to drive, act" },
    ],
    etymologyMeaning: "to drive toward purity through punishment",
  },
  caustic: {
    shortDef: "Bitingly sharp; able to burn or corrode.",
    tone: "Negative",
    antonyms: ["soothing", "kind"],
    mnemonic: "A CAUSTIC remark is like acid on the skin — it burns whatever it touches.",
    wordFamily: ["caustically", "causticity"],
    etymology: [
      { part: "kaustikos", language: "Greek", meaning: "burning, capable of burning" },
      { part: "kaiein", language: "Greek", meaning: "to burn" },
    ],
    etymologyMeaning: "able to burn",
  },
  construe: {
    shortDef: "To interpret or explain the meaning of something.",
    tone: "Neutral",
    antonyms: ["misinterpret", "ignore"],
    mnemonic: "When you CONSTRUE, you 'construct' a meaning — you build understanding from the clues.",
    wordFamily: ["construal", "construction", "misconstrue"],
    etymology: [
      { part: "com-", language: "Latin", meaning: "together" },
      { part: "struere", language: "Latin", meaning: "to build" },
    ],
    etymologyMeaning: "to build together; piece together a meaning",
  },
  contrite: {
    shortDef: "Deeply sorry for having done wrong.",
    tone: "Negative",
    antonyms: ["unrepentant", "indifferent"],
    mnemonic: "A CONTRITE heart feels 'contracted' — squeezed small with regret over a mistake.",
    wordFamily: ["contritely", "contrition"],
    etymology: [
      { part: "com-", language: "Latin", meaning: "thoroughly" },
      { part: "terere", language: "Latin", meaning: "to rub, grind" },
    ],
    etymologyMeaning: "thoroughly worn down by guilt",
  },
  convoluted: {
    shortDef: "Twisted, intricate, and hard to follow.",
    tone: "Negative",
    antonyms: ["simple", "straightforward"],
    mnemonic: "Picture a 'convo' that twists and turns endlessly — a CONVOLUTED maze of words.",
    wordFamily: ["convolution", "convolute", "convoluting"],
    etymology: [
      { part: "com-", language: "Latin", meaning: "together" },
      { part: "volvere", language: "Latin", meaning: "to roll, turn" },
    ],
    etymologyMeaning: "rolled together; twisted up",
  },

  // ── Mission 2 · Set 3 ──
  covet: {
    shortDef: "To strongly desire something belonging to another.",
    tone: "Negative",
    antonyms: ["renounce", "reject"],
    mnemonic: "If you COVET something, you 'co-vet' it constantly in your mind — never letting go of the desire.",
    wordFamily: ["covetous", "covetously", "covetousness"],
    etymology: [
      { part: "cupiditas", language: "Latin", meaning: "desire, longing" },
      { part: "cupere", language: "Latin", meaning: "to long for" },
    ],
    etymologyMeaning: "intense longing",
  },
  craven: {
    shortDef: "Shamefully cowardly; lacking even basic courage.",
    tone: "Negative",
    antonyms: ["brave", "valiant"],
    mnemonic: "A CRAVEN person 'craves a haven' — running for shelter at the first sign of trouble.",
    wordFamily: ["cravenly", "cravenness"],
    etymology: [
      { part: "cravant", language: "Old French", meaning: "vanquished, defeated" },
      { part: "crepare", language: "Latin", meaning: "to crack, break" },
    ],
    etymologyMeaning: "broken in spirit",
  },
  decorum: {
    shortDef: "Polite, dignified behavior appropriate to the setting.",
    tone: "Positive",
    antonyms: ["impropriety", "rudeness"],
    mnemonic: "Think of room DECOR — DECORUM is the social 'decor' that makes any room appropriate.",
    wordFamily: ["decorous", "decorously", "indecorum"],
    etymology: [
      { part: "decorum", language: "Latin", meaning: "that which is fitting" },
      { part: "decere", language: "Latin", meaning: "to be fitting" },
    ],
    etymologyMeaning: "what is fitting and proper",
  },
  deft: {
    shortDef: "Quick, neat, and skillful in action.",
    tone: "Positive",
    antonyms: ["clumsy", "awkward"],
    mnemonic: "DEFT rhymes with 'left' — but a deft hand uses both with effortless skill.",
    wordFamily: ["deftly", "deftness"],
    etymology: [
      { part: "dæfte", language: "Old English", meaning: "gentle, mild" },
      { part: "ge-dæfte", language: "Old English", meaning: "fitting, suitable" },
    ],
    etymologyMeaning: "fitting and gentle in motion",
  },
  demur: {
    shortDef: "To politely object or show reluctance.",
    tone: "Neutral",
    antonyms: ["agree", "consent"],
    mnemonic: "DEMUR sounds like 'de-murmur' — a quiet, polite grumble of disagreement.",
    wordFamily: ["demurral", "demurring", "demurrer"],
    etymology: [
      { part: "de-", language: "Latin", meaning: "away" },
      { part: "morari", language: "Latin", meaning: "to delay, linger" },
    ],
    etymologyMeaning: "to delay, hold back",
  },
  derivative: {
    shortDef: "Imitative; copied from another source and lacking originality.",
    tone: "Negative",
    antonyms: ["original", "innovative"],
    mnemonic: "DERIVATIVE work is 'derived' from someone else — like a knock-off that just copies the original.",
    wordFamily: ["derive", "derivation", "derivatively"],
    etymology: [
      { part: "de-", language: "Latin", meaning: "down, from" },
      { part: "rivus", language: "Latin", meaning: "stream" },
    ],
    etymologyMeaning: "drawn off from a stream (source)",
  },
  desiccate: {
    shortDef: "To dry out completely; to remove all moisture.",
    tone: "Neutral",
    antonyms: ["hydrate", "moisten"],
    mnemonic: "DESICCATE sounds like 'desert-cake' — dry, crumbly, all moisture baked out.",
    wordFamily: ["desiccation", "desiccated", "desiccator"],
    etymology: [
      { part: "de-", language: "Latin", meaning: "completely" },
      { part: "siccare", language: "Latin", meaning: "to dry" },
    ],
    etymologyMeaning: "to dry completely",
  },
  diatribe: {
    shortDef: "A long, bitter verbal attack or angry speech.",
    tone: "Negative",
    antonyms: ["praise", "tribute"],
    mnemonic: "Picture a 'die-a-tribe' — a furious tirade so harsh it could wipe out a whole tribe of listeners.",
    wordFamily: ["diatribist", "diatribic"],
    etymology: [
      { part: "dia-", language: "Greek", meaning: "through" },
      { part: "tribein", language: "Greek", meaning: "to wear, rub" },
    ],
    etymologyMeaning: "to wear away (with harsh words)",
  },
  incredulous: {
    shortDef: "Unwilling or unable to believe something.",
    tone: "Neutral",
    antonyms: ["credulous", "trusting"],
    mnemonic: "IN- (not) + CREDULOUS (believing) — flat-out refusing to buy what you're being told.",
    wordFamily: ["incredulity", "incredulously"],
    etymology: [
      { part: "in-", language: "Latin", meaning: "not" },
      { part: "credere", language: "Latin", meaning: "to believe" },
    ],
    etymologyMeaning: "not believing",
  },
  ingenuous: {
    shortDef: "Innocently honest and trusting; charmingly naive.",
    tone: "Positive",
    antonyms: ["cunning", "deceitful"],
    mnemonic: "An INGENUOUS person is 'in-genuine' through and through — open as a child, no tricks.",
    wordFamily: ["ingenuously", "ingenuousness", "ingénue"],
    etymology: [
      { part: "in-", language: "Latin", meaning: "in, into" },
      { part: "gignere", language: "Latin", meaning: "to be born" },
    ],
    etymologyMeaning: "native, free-born; naturally honest",
  },
};

export function getEnrichment(wordKey: string): WordEnrichment | undefined {
  return ENRICHMENT[wordKey.toLowerCase()];
}
