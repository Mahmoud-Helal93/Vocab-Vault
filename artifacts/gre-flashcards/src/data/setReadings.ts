export interface ReadingQuestion {
  id: number;
  kind:
    | "vocab-context"
    | "tone-purpose"
    | "inference"
    | "substitution"
    | "main-idea";
  prompt: string;
  quote?: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
}

export interface SetReading {
  title: string;
  subtitle: string;
  format: "Short Story" | "Personal Essay";
  readingMinutes: number;
  words: string[];
  passage: string;
  questions: ReadingQuestion[];
}

const MISSION_1_SET_1: SetReading = {
  title: "The Cartographer's Daughter",
  subtitle:
    "A short story to plant ten new words in your memory before you ever see a flashcard.",
  format: "Short Story",
  readingMinutes: 4,
  words: [
    "abound",
    "amorphous",
    "austere",
    "belie",
    "capricious",
    "cerebral",
    "congenial",
    "conspicuous",
    "cursory",
    "daunting",
  ],
  passage: `Maren arrived at the Brakeman Institute on a Tuesday morning so gray it seemed to have been drained of color, her single suitcase rattling behind her as she crossed a quad where opportunities for embarrassment seemed to **abound**. Every bench held a cluster of doctoral students reading in three languages; every footpath delivered her to another stone arch carved with mottoes she could not translate. She had won the cartography fellowship on the strength of a thesis her advisor called "promising and **amorphous**" — high praise from a man who refused to commit to definite shapes — but standing now beneath the bell tower, she felt the looseness of her own ideas as a kind of weather, something formless that the Institute would, with its precision instruments, soon dispel.

The director, Professor Hargrove, met her in an office that was almost theatrically **austere**: one chair for him, one for the visitor, a desk bare except for a porcelain cup, and behind him a single tall window that admitted a thin column of light. He did not smile. He did not offer tea. "You are five minutes early," he said, glancing at a watch that he then concealed beneath his sleeve. His tone was so even it might have **belied** any feeling at all, but Maren noticed that his eyes kept returning to her hands, as if checking whether they trembled.

They did not, though her stomach was a separate animal entirely.

Hargrove's reputation, she had been warned, was **capricious**: he had championed unknown students into glittering careers and, the next term, dismissed established scholars over a single misplaced footnote. Mood, not merit, was said to govern his judgments. She had rehearsed her opening for weeks, but he waved her notes away before she could begin and asked, without preamble, what she thought a map was *for*.

The question was so **cerebral**, so stripped of the small talk she had braced for, that for a moment Maren simply blinked. She thought of her father, a surveyor on the coast, who had taught her that a map was a quiet promise between a stranger and the land. But Hargrove was watching her, and she sensed that any answer wrapped in sentiment would be filed, permanently, under "amateur."

"A map," she said carefully, "is an argument. It claims that the world can be looked at this way and not another."

There was a long pause. Then, surprisingly, his expression softened into something almost **congenial**, as though he had been waiting all morning to be addressed in his own language and was relieved to find a colleague rather than a supplicant.

"Good," he said. "That will do for now."

He pushed a single sheet across the desk. The assignment was **conspicuous** in its brevity — three sentences — but Maren understood at once that the brief paragraph would consume her semester. She was to redraw the Institute's century-old chart of the river delta, accounting for a coastline that had been steadily, almost secretly, retreating.

She gave the sheet only a **cursory** glance, just long enough to be polite, because she did not trust her face to remain composed if she read the thing in earnest. The task was **daunting** — not in the way of mere difficulty, but in the way of something built deliberately to test whether a newcomer would flinch — and she intended, above all, not to flinch.

She folded the page once, slipped it into her notebook, and thanked him. Outside, the grayness had begun to lift, the way weather does when one has decided, at last, on an answer.`,
  questions: [
    {
      id: 1,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "abound" most nearly means:',
      quote:
        '"...her single suitcase rattling behind her as she crossed a quad where opportunities for embarrassment seemed to abound."',
      options: [
        "To leap or bounce energetically.",
        "To exist in great numbers; to be plentiful.",
        "To gather in tight, defensive clusters.",
        "To be tied down or strictly limited.",
      ],
      correctIndex: 1,
      explanation:
        '"Abound" here means to exist in great numbers — opportunities for embarrassment are everywhere on the quad.',
    },
    {
      id: 2,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "capricious" most nearly means:',
      quote:
        '"Hargrove\'s reputation, she had been warned, was capricious: he had championed unknown students into glittering careers and, the next term, dismissed established scholars over a single misplaced footnote."',
      options: [
        "Strict and unyielding in standards.",
        "Cheerfully generous to newcomers.",
        "Unpredictable, governed by sudden shifts of mood.",
        "Easily captured or persuaded by flattery.",
      ],
      correctIndex: 2,
      explanation:
        'The next sentence — "Mood, not merit, was said to govern his judgments" — confirms that "capricious" describes someone ruled by impulsive shifts.',
    },
    {
      id: 3,
      kind: "tone-purpose",
      prompt:
        'The author writes that Hargrove\'s office was "almost theatrically austere." Why does the author use the word "austere" rather than simply saying "plain"?',
      options: [
        '"Austere" is just a longer, fancier substitute for "plain" with no real difference in meaning.',
        '"Austere" suggests the office was poorly maintained, while "plain" would suggest deliberate simplicity.',
        '"Austere" carries a sense of deliberate, almost moral discipline that mirrors Hargrove\'s own severity, while "plain" would describe only its appearance.',
        '"Austere" implies the office was richly decorated in a restrained style, while "plain" would imply it was empty.',
      ],
      correctIndex: 2,
      explanation:
        '"Austere" is doing character work — it tells us something about Hargrove\'s temperament, not just the furniture.',
    },
    {
      id: 4,
      kind: "inference",
      prompt:
        "Based on the passage, what can the reader most reasonably infer about how Maren expects herself to be judged at the Institute?",
      options: [
        "She believes the faculty will care more about warmth and rapport than about ideas.",
        "She suspects that any hint of sentiment or personal feeling in her work would be held against her.",
        "She trusts that her advisor's recommendation will protect her from harsh evaluation.",
        "She assumes the Institute considers personal style entirely irrelevant to scholarship.",
      ],
      correctIndex: 1,
      explanation:
        'When Maren imagines a sentimental answer being "filed, permanently, under \'amateur,\'" she reveals her fear that emotion will count against her.',
    },
    {
      id: 5,
      kind: "substitution",
      prompt:
        'Which single word could replace "cursory" in the sentence below without changing its meaning?',
      quote:
        '"She gave the sheet only a cursory glance, just long enough to be polite, because she did not trust her face to remain composed if she read the thing in earnest."',
      options: [
        "Hostile",
        "Lengthy",
        "Perfunctory",
        "Sweeping",
      ],
      correctIndex: 2,
      explanation:
        '"Perfunctory" — a hasty, going-through-the-motions look — captures the same meaning. "Sweeping" suggests a wide, taking-it-all-in glance, which is different.',
    },
    {
      id: 6,
      kind: "main-idea",
      prompt:
        "Which sentence best summarizes the central idea or arc of the passage?",
      options: [
        "A young scholar arrives at an austere institution and earns its capricious director's tentative respect by meeting him on his own intellectual terms.",
        "A cartography student is given a daunting assignment to redraw an old chart of a coastline that has been quietly retreating.",
        "Universities have become so intimidating that new students cannot succeed in them without sacrificing their personal voices.",
        "Professor Hargrove pretends to be cold but is secretly hoping every newcomer will flatter him into a friendship.",
      ],
      correctIndex: 0,
      explanation:
        "The passage tracks Maren\u2019s arrival, her first encounter with a forbidding director, and the small but real respect she earns by giving an intellectually serious answer.",
    },
  ],
};

const MISSION_1_SET_2: SetReading = {
  title: "The Lecturer Who Refused to Be Worshipped",
  subtitle:
    "A short story about a visiting teacher, a small town, and the price of being too admired.",
  format: "Short Story",
  readingMinutes: 4,
  words: [
    "deify",
    "didactic",
    "disseminate",
    "feasible",
    "flout",
    "homogeneous",
    "humdrum",
    "insipid",
    "loquacious",
    "misanthropic",
  ],
  passage: `When Professor Ines Calderón accepted the invitation to spend a year teaching in the small mill town of Verlanca, she imagined a quiet, **humdrum** existence — a chalkboard, a modest library, perhaps a balcony from which she could watch the river. What she had not anticipated was that the town would, within weeks, attempt to **deify** her.

It began innocently enough. A piece in the local paper described her opening lecture as "the first interesting thing said in this auditorium since 1974." A baker named a loaf after her. Then, more curiously, she noticed that the schoolchildren had begun to repeat her phrases verbatim, that her sayings were quoted on pharmacy bulletin boards, and that even her offhand opinions about coffee were treated as instructions rather than preferences.

The town's enthusiasm, in a way, exposed how **homogeneous** Verlanca's intellectual life had become. For decades the same five voices had spoken into the same five microphones; everyone read what everyone else read; opinions were not so much shared as repeated. A new voice — any new voice — might have produced a similar effect, but Ines, brilliant and softly funny in lectures, was an unusually attractive vessel for that long, unspent hunger.

Her colleague Henrik, a **loquacious** mathematician who could not pass a stranger without launching into a story, found the whole business amusing. "You are now a saint," he told her over coffee. "It is the highest compliment a small town can pay anyone, and also a kind of trap." She asked what he meant by trap. "Saints," he said, "are not allowed to be wrong."

Ines was not interested in being right at all costs, and she was certainly not interested in being **didactic**. Her teaching style, when it worked, was conversational; she preferred questions that opened doors to those that closed them. She suspected that the moment a teacher began to instruct rather than to think aloud, students stopped listening with their own minds and began merely transcribing.

So she began, gently, to **flout** the role the town wanted to give her. She praised a student publicly for disagreeing with her. She told an interviewer that her favorite recent book had been written by a man who had once written a scathing review of her own work. She declined to bless a new bakery, refused to sign a petition she only half-understood, and would not endorse a candidate whose views she had not yet fully read.

The reaction was not the **insipid** disappointment one might expect from a town that had merely been mildly let down. It was sharper than that — a kind of injured astonishment, as though she had broken an unspoken contract. Letters appeared in the paper. One columnist accused her of being secretly **misanthropic**, of disliking the very people who had admired her. Another suggested, more soberly, that perhaps it was simply not **feasible** to invite an outside thinker into a closed community without first preparing the community to be thought *with*, rather than thought *at*.

Henrik, when she showed him the letters, only shrugged. "They wanted to **disseminate** your sayings," he said. "Now they will have to disseminate your refusals. It will be harder for them, and it will be better for them."

Ines wasn't sure she agreed. But that night, walking home along the river she had once imagined watching from a balcony, she realized that her humdrum year had quietly become something else — neither saintly nor scandalous, just unmistakably hers.`,
  questions: [
    {
      id: 1,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "deify" most nearly means:',
      quote:
        '"What she had not anticipated was that the town would, within weeks, attempt to deify her."',
      options: [
        "To formally hire or appoint to a public role.",
        "To worship or treat as if she were a god.",
        "To politely ignore or keep at a distance.",
        "To put on trial for an unspecified offense.",
      ],
      correctIndex: 1,
      explanation:
        '"Deify" means to elevate someone to god-like status. The surrounding details — quoted sayings, named loaves, schoolchildren repeating her phrases — paint a picture of near-religious admiration.',
    },
    {
      id: 2,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "flout" most nearly means:',
      quote:
        '"So she began, gently, to flout the role the town wanted to give her."',
      options: [
        "To openly disregard or refuse to play along with.",
        "To advertise or promote enthusiastically.",
        "To formally apologize for and withdraw from.",
        "To repeatedly fail at, despite trying.",
      ],
      correctIndex: 0,
      explanation:
        'To "flout" something is to openly disregard it. The actions that follow — praising dissent, declining endorsements — are deliberate refusals of the saintly role she has been assigned.',
    },
    {
      id: 3,
      kind: "tone-purpose",
      prompt:
        'The author writes that Ines was "certainly not interested in being didactic." Why does the author choose "didactic" rather than simply "preachy"?',
      options: [
        '"Didactic" and "preachy" are exact synonyms; the choice is purely stylistic.',
        '"Didactic" specifies a moralizing teaching style, which echoes Ines\'s real concern: that instructing students replaces thinking with mere transcription.',
        '"Didactic" implies the speaker is uneducated, while "preachy" implies they are well-read.',
        '"Didactic" suggests entertainment, while "preachy" suggests boredom.',
      ],
      correctIndex: 1,
      explanation:
        '"Didactic" specifically describes a teaching mode aimed at instruction. The next sentence makes this exact contrast — instructing versus thinking aloud.',
    },
    {
      id: 4,
      kind: "inference",
      prompt:
        'Henrik tells Ines that "saints are not allowed to be wrong." Based on the passage, what does he most likely mean?',
      options: [
        "Religious figures in the town will lose their authority if Ines disagrees with them.",
        "Once a community has elevated someone, it punishes them for showing the same uncertainty allowed in ordinary people.",
        "Mathematicians, like Henrik, hold their colleagues to impossibly high standards of accuracy.",
        "The local paper will refuse to publish anything by Ines that contains a factual error.",
      ],
      correctIndex: 1,
      explanation:
        "Henrik's warning is borne out by the town's reaction: the moment Ines disappoints them, they respond not with mild letdown but with injured astonishment, as though a contract has been broken.",
    },
    {
      id: 5,
      kind: "substitution",
      prompt:
        'Which single word could replace "loquacious" in the sentence below without changing its meaning?',
      quote:
        '"Her colleague Henrik, a loquacious mathematician who could not pass a stranger without launching into a story, found the whole business amusing."',
      options: [
        "Reserved",
        "Garrulous",
        "Abrasive",
        "Distracted",
      ],
      correctIndex: 1,
      explanation:
        '"Garrulous" — habitually talkative — captures the same meaning. "Reserved" is the opposite, and the other choices change his character entirely.',
    },
    {
      id: 6,
      kind: "main-idea",
      prompt:
        "Which sentence best summarizes the central idea or arc of the passage?",
      options: [
        "A visiting professor is initially flattered by a small town's adoration but eventually decides to leave because the residents are unintelligent.",
        "A teacher who is mistakenly treated as an oracle quietly refuses the role, accepting the town's disappointment as the price of remaining herself.",
        "A small community in decline is rescued from intellectual stagnation by the arrival of an outside thinker who brings them new ideas.",
        "A mathematician convinces his colleague that universal admiration is always a sign of professional success and should be cultivated.",
      ],
      correctIndex: 1,
      explanation:
        "The passage tracks Ines's recognition of the town's worship, her deliberate refusal of it, and the cost — and quiet integrity — of that refusal.",
    },
  ],
};

const MISSION_1_SET_3: SetReading = {
  title: "The Wary Heir",
  subtitle:
    "A short story about an inheritance, a careful young woman, and what a single name can hide.",
  format: "Short Story",
  readingMinutes: 4,
  words: [
    "misnomer",
    "negligent",
    "obsequious",
    "placate",
    "proclivity",
    "puerile",
    "quixotic",
    "spendthrift",
    "taciturn",
    "wary",
  ],
  passage: `The will named Henrietta Marsh as the "Sole Beneficiary" — a phrase the lawyer, Mr. Ashworth, had to admit was a small **misnomer**. There were, in fact, three other heirs scattered across the country, but each had been left objects so trivial — a brass ashtray, a chipped vase, a packet of unopened letters — that the document essentially treated Henrietta as the only one who mattered. The wording, he suspected, was less a clerical error than a quiet message from her late uncle.

Henrietta arrived at his office on a damp Thursday, **wary** in the manner of someone who had been disappointed by good news before. She was twenty-eight, a music teacher with a small apartment, and she had not seen her uncle in nine years. Mr. Ashworth offered her tea, which she declined with a small, measured nod. He had half-expected someone more nervous, perhaps even slightly **puerile**, given how young she had been the last time anyone in the family had described her. Instead she sat very still and waited for him to speak.

The estate, he explained, was substantial — a townhouse, two rental properties, an investment account, and a startling number of first-edition books. There were, however, conditions. Her uncle had been a careful man; he had watched his own brother (Henrietta's father) reveal a **proclivity** for sudden, expensive enthusiasms — racehorses, vineyards, a brief and disastrous theater company — and the will included safeguards meant to prevent the same pattern in the next generation. Funds beyond a modest annual sum could be released only with the approval of a small board of trustees.

Henrietta listened without interrupting. She was, Mr. Ashworth realized, somewhat **taciturn** — not cold, exactly, but reluctant to spend a sentence she did not need.

"Were you close to him?" he asked, surprising himself.

"No," she said. "But he wrote to me twice a year. Once on my birthday. Once at the new year."

The uncle's letters, it turned out, had been long, observant, and faintly instructive — he had warned her, year after year, against three things: against being too **obsequious** to people in authority, against being **negligent** with anything she had been trusted to keep, and against confusing private dreams with workable plans. She had, she admitted, reread them often.

When the formalities were complete, Mr. Ashworth could not resist a personal question. "Most people in your position," he said, "are already telling me what they intend to do with the money. You have not."

"I do not want to be a **spendthrift**," Henrietta said quietly, "and I do not want to be **quixotic**, either. My uncle disliked both — extravagance and impossible projects. He said one ruined a person slowly and the other ruined them all at once."

"And what would he have wanted?"

She thought for a moment. "Something practical," she said. "Something I could explain to him without having to **placate** him afterward. A scholarship, perhaps, for music students who otherwise could not afford to study. Modest in the first year. Larger if it works."

Mr. Ashworth made a small note in his ledger. He had presided over hundreds of these meetings and could usually predict, within a quarter of an hour, which heirs would squander an inheritance and which would steward it. With Henrietta, for the first time in years, he found himself uncertain — and in a profession that prized certainty above almost every other virtue, pleasantly so.`,
  questions: [
    {
      id: 1,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "proclivity" most nearly means:',
      quote:
        '"...he had watched his own brother reveal a proclivity for sudden, expensive enthusiasms — racehorses, vineyards, a brief and disastrous theater company..."',
      options: [
        "A reluctant, occasional habit.",
        "A natural inclination or recurring tendency.",
        "A formal vow or public commitment.",
        "A skill acquired through long study.",
      ],
      correctIndex: 1,
      explanation:
        '"Proclivity" denotes a recurring inclination. The list of repeated, expensive enthusiasms confirms this is a pattern of behavior, not a single choice.',
    },
    {
      id: 2,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "quixotic" most nearly means:',
      quote:
        '"I do not want to be a spendthrift, and I do not want to be quixotic, either. My uncle disliked both — extravagance and impossible projects."',
      options: [
        "Cautious to the point of inaction.",
        "Devoted to grand but impractical and unrealistic ideals.",
        "Obsessed with collecting valuable objects.",
        "Quick to lose interest after early enthusiasm.",
      ],
      correctIndex: 1,
      explanation:
        'Henrietta\'s own gloss — "impossible projects" — is essentially the definition of "quixotic": idealistic in a way that is unmoored from practicality.',
    },
    {
      id: 3,
      kind: "tone-purpose",
      prompt:
        'The narrator calls "Sole Beneficiary" a "small misnomer." Why does the author use the word "misnomer" rather than simply "lie" or "mistake"?',
      options: [
        '"Misnomer" implies an outright deception, sharper and more accusatory than "lie."',
        '"Misnomer" is just a more elegant synonym for "mistake," with no real difference in meaning.',
        '"Misnomer" specifies an inaccurate label rather than a falsehood, which fits the situation: technically wrong, but deliberately so, as a quiet message from the uncle.',
        '"Misnomer" is a legal term that requires the document to be invalidated.',
      ],
      correctIndex: 2,
      explanation:
        'A "misnomer" is the wrong name for something — neither a lie nor a careless error. The narrator suggests the wording is a coded gesture from the uncle, which only "misnomer" precisely captures.',
    },
    {
      id: 4,
      kind: "inference",
      prompt:
        "Based on the passage, what can the reader most reasonably infer about the uncle's intentions toward Henrietta?",
      options: [
        "He distrusted Henrietta and used the trustees as a way to keep her from spending anything significant.",
        "He valued Henrietta highly and tried, through both his letters and the will's safeguards, to protect her from the family pattern of impulsive excess.",
        "He had no real preference among his heirs and divided his estate purely by chance.",
        "He hoped Henrietta would use the inheritance to confront her father about his past failures.",
      ],
      correctIndex: 1,
      explanation:
        "The yearly letters, the dismissive bequests to the other heirs, and the safeguards against repeating her father's pattern all point to deliberate care, not distrust.",
    },
    {
      id: 5,
      kind: "substitution",
      prompt:
        'Which single word could replace "taciturn" in the sentence below without changing its meaning?',
      quote:
        '"She was, Mr. Ashworth realized, somewhat taciturn — not cold, exactly, but reluctant to spend a sentence she did not need."',
      options: [
        "Hostile",
        "Reticent",
        "Loquacious",
        "Distracted",
      ],
      correctIndex: 1,
      explanation:
        '"Reticent" — reserved, sparing of speech — matches "taciturn" precisely. "Loquacious" is the opposite, and the other options change her character.',
    },
    {
      id: 6,
      kind: "main-idea",
      prompt:
        "Which sentence best summarizes the central idea or arc of the passage?",
      options: [
        "A young woman receives a surprising inheritance and immediately announces an ambitious plan to spend it on a music scholarship.",
        "A lawyer drafts a will so cleverly that the heirs are unable to detect his manipulations until many years later.",
        "A careful young heir, shaped by years of her uncle's quiet guidance, meets her inheritance with the restraint and judgment he had hoped to instill.",
        "An estate divided unfairly between several relatives leads to a long legal battle over a single ambiguous phrase.",
      ],
      correctIndex: 2,
      explanation:
        "The passage centers on Henrietta's measured response, made legible by the uncle's letters and the will's safeguards — restraint and judgment shaped over many years.",
    },
  ],
};

export const SET_READINGS: Record<string, SetReading> = {
  "1-1": MISSION_1_SET_1,
  "1-2": MISSION_1_SET_2,
  "1-3": MISSION_1_SET_3,
};

export function getSetReading(day: number, group: number): SetReading | null {
  return SET_READINGS[`${day}-${group}`] ?? null;
}

export function hasSetReading(day: number, group: number): boolean {
  return Boolean(SET_READINGS[`${day}-${group}`]);
}
