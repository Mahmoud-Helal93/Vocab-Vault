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

const MISSION_2_SET_1: SetReading = {
  title: "What the Tea Leaves Knew",
  subtitle:
    "A short story about a chemist, a quiet machine, and a number she was not supposed to find.",
  format: "Short Story",
  readingMinutes: 4,
  words: [
    "adulterate",
    "advocate",
    "aggrandize",
    "alacrity",
    "ambivalent",
    "ameliorate",
    "amenable",
    "anachronistic",
    "audacious",
    "avaricious",
  ],
  passage: `When the contract chemist Naila Ostrowski opened the third sample box from Halverton Beverages on a Tuesday morning, she did so with her usual professional **alacrity** — gloves on, mass spectrometer humming, notebook squared with the edge of the bench. She liked Tuesdays. Tuesdays were when problems showed up small and went home solved.

The samples were supposed to be a routine quality check on the company's flagship oolong blend. Within an hour she could see, in the spectrometer's quiet little graph, that they were not. Two of the three samples had been **adulterated** — cut with a cheaper black tea dust and, more disturbingly, with a colorant that was not approved for food use in the country where the tea was sold.

She sat for a long time looking at the graph.

The director of Halverton's lab, Henrik Voss, was a cheerful man whose office walls were covered with framed magazine spreads in which his own name appeared in slightly larger print than seemed strictly necessary. He had a habit, she had noticed, of finding ways to **aggrandize** every small success of the company into something epochal: a new flavor was a "renaissance," a packaging tweak was a "revolution." Naila had at first found this endearing. Now, reading her own results, she suspected that the same instinct that loved a renaissance might also dislike a recall.

She brought the data to him after lunch. He listened with a polite, even **amenable** expression, nodded in the right places, and asked careful questions. Then he suggested, in the gentle voice people reserve for explaining things they assume you already understand, that perhaps she had been a little **audacious** in jumping to conclusions, and that "adulteration" was a rather strong, almost **anachronistic** word for what was, in his telling, a temporary supply-chain workaround inherited from a previous quarter.

Naila left his office feeling **ambivalent**. On one hand, Henrik was almost certainly minimizing. On the other, she had been at Halverton barely six months, and the people she would have to embarrass — the buyers, the supplier in Fujian, possibly Henrik himself — had families and mortgages and reputations she did not enjoy threatening.

She thought about her grandmother, who had spent thirty years as a public-health inspector and had once told her, over a glass of plum wine, that the truly **avaricious** were rarely the ones who looked greedy. "The dangerous ones," her grandmother had said, "are the ones who simply cannot bear to lose what they already have."

That night Naila reread the country's food-safety statutes until the words stopped meaning anything, then started meaning more than they ever had. There was, she discovered, an internal-disclosure path that gave a company thirty days to **ameliorate** the issue voluntarily before the regulator was notified. It was not as dramatic as going straight to the press — and she was not, by temperament, dramatic — but it was sturdier, and it gave Henrik a real chance to do the right thing without being forced to.

In the morning, she did not lecture; she did not threaten; she simply filed. Then she walked into Henrik's office, set a printed copy of the disclosure on his desk, and offered to **advocate** internally for whatever corrective plan the company chose, provided the plan was real.

Henrik looked at the paper for a long time. Then, to her surprise, he reached for a pen.`,
  questions: [
    {
      id: 1,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "alacrity" most nearly means:',
      quote:
        '"...she did so with her usual professional alacrity — gloves on, mass spectrometer humming, notebook squared with the edge of the bench."',
      options: [
        "Anxious caution about the day ahead.",
        "Brisk, cheerful readiness to begin.",
        "Reluctant, resentful compliance.",
        "Slow, ceremonial precision.",
      ],
      correctIndex: 1,
      explanation:
        '"Alacrity" denotes a brisk, willing readiness. The image of gloves on, machine humming, and notebook neatly squared shows eager preparation rather than hesitation.',
    },
    {
      id: 2,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "aggrandize" most nearly means:',
      quote:
        '"He had a habit...of finding ways to aggrandize every small success of the company into something epochal..."',
      options: [
        "To privately doubt or quietly criticize.",
        "To formally award or publicly honor.",
        "To inflate or exaggerate beyond actual importance.",
        "To carefully record for later reference.",
      ],
      correctIndex: 2,
      explanation:
        '"Aggrandize" means to inflate something — to make it appear greater than it is. The next clause confirms this: a new flavor becomes a "renaissance," a packaging tweak a "revolution."',
    },
    {
      id: 3,
      kind: "tone-purpose",
      prompt:
        'Henrik calls the word "adulteration" "almost anachronistic." Why does the author have him reach for "anachronistic" rather than, say, "outdated"?',
      options: [
        '"Anachronistic" suggests the word belongs to an earlier era and is comically out of place now, which is exactly the dismissive frame Henrik wants to put around Naila\'s finding.',
        '"Anachronistic" is just a more elegant synonym for "outdated" with no real difference in meaning.',
        '"Anachronistic" implies the word is technically wrong because it has been redefined by recent legislation.',
        '"Anachronistic" suggests the word is too modern and trendy to use in a serious laboratory.',
      ],
      correctIndex: 0,
      explanation:
        'By calling the word "anachronistic," Henrik is implying it belongs to a less sophisticated era — a polite way of suggesting Naila is overreacting using old-fashioned vocabulary.',
    },
    {
      id: 4,
      kind: "inference",
      prompt:
        "Naila's grandmother says \"the dangerous ones are the ones who simply cannot bear to lose what they already have.\" Based on the passage, what is the most reasonable inference about why this comes to Naila's mind?",
      options: [
        "She is preparing herself for a sudden physical confrontation with Henrik.",
        "She suspects Henrik's resistance to acknowledging the problem is driven less by greed for new gain than by fear of losing his current standing.",
        "She is reminding herself that her grandmother would have ignored the issue entirely.",
        "She is reasoning that all corporate executives are equally untrustworthy and should be treated as enemies.",
      ],
      correctIndex: 1,
      explanation:
        "The grandmother\u2019s line reframes \"avaricious\" — the dangerous instinct is protective, not acquisitive. Naila is reading Henrik through that lens.",
    },
    {
      id: 5,
      kind: "substitution",
      prompt:
        'Which single word could replace "ambivalent" in the sentence below without changing its meaning?',
      quote:
        '"Naila left his office feeling ambivalent. On one hand, Henrik was almost certainly minimizing. On the other, she had been at Halverton barely six months..."',
      options: [
        "Furious",
        "Conflicted",
        "Indifferent",
        "Triumphant",
      ],
      correctIndex: 1,
      explanation:
        '"Conflicted" captures the same idea: held between two opposed feelings. "Indifferent" implies no feeling either way, which is the opposite of what the next sentences describe.',
    },
    {
      id: 6,
      kind: "main-idea",
      prompt:
        "Which sentence best summarizes the central idea or arc of the passage?",
      options: [
        "A junior chemist exposes corporate fraud by leaking her findings to the national press the day after she discovers them.",
        "A company director persuades a new chemist that her measurements are mistaken and that she should retract her concerns.",
        "A young chemist who finds a serious safety problem chooses a measured, lawful path that gives her employer a real chance to fix the issue without being forced to.",
        "A laboratory dispute about outdated terminology delays a routine quality check long enough that the problem resolves itself.",
      ],
      correctIndex: 2,
      explanation:
        "The passage tracks Naila's discovery, her hesitation, her grandmother's framing, and her decision to take the deliberate, statutory path rather than the dramatic one.",
    },
  ],
};

const MISSION_2_SET_2: SetReading = {
  title: "A Calumny in Three Acts",
  subtitle:
    "A short story about a play, a venomous review, and the discipline of not answering in kind.",
  format: "Short Story",
  readingMinutes: 4,
  words: [
    "banal",
    "benign",
    "brazen",
    "calumny",
    "candid",
    "castigate",
    "caustic",
    "construe",
    "contrite",
    "convoluted",
  ],
  passage: `When the review appeared in Sunday's *Tribune*, it took the playwright Aleida Romero a full hour to even pick it up. She had read enough notices in fifteen years to know that the worst ones rarely contained anything new; they merely repeated, in sharper language, the doubts she had already nursed about herself. What she had not been prepared for was that this particular notice would be less a review than a **calumny** — a detailed, almost forensic accusation that her play had been quietly plagiarized from a forgotten radio drama her own father had written in the 1970s.

The critic, Lukas Verhoeven, was famous for being **caustic**. He had once called a beloved comedy "deafeningly **banal**," and a respected new tragedy a "**convoluted** apology for a story." Other writers spoke of his pen the way coastal villagers speak of certain reefs: not with hatred, exactly, but with the practical respect one owes to anything that can sink you.

Aleida sat at her kitchen table for most of Sunday with the paper folded in front of her. There was a temptation, immediate and bright, to publicly **castigate** the critic — to write her own broadside, to fillet his arguments, and then to post the result, exquisitely, on every literary website she could reach by Monday morning. Her agent telephoned twice with exactly that suggestion, in increasingly **brazen** language, until Aleida unplugged the receiver and went for a walk along the canal.

The truth, of course, was complicated. She had grown up in her father's study; she had heard fragments of his unfinished radio plays at the dinner table for two decades; she had absorbed, the way children absorb everything, a particular cadence and a fondness for stories about lighthouses and lost letters. To say she had been *uninfluenced* by him would have been an obvious lie — and to say she had stolen from him was a calumny of a different order, because it implied a furtive, brazen theft rather than a slow inheritance.

The question was how to be **candid** about the difference without sounding either defensive or self-pitying. She knew that any reader could **construe** even the most careful explanation as a confession, if the reader had been encouraged to expect one.

She thought, briefly, about her teacher Mrs. Hadwell, who had once told her that the only **benign** response to a public attack was a quiet one — not silence, exactly, but the patient publication of better work. "Anything else," Mrs. Hadwell had said, "treats your attacker as more important than he is."

So Aleida did not write the broadside. Instead, she wrote a short, even letter to the *Tribune* in which she acknowledged her father's influence frankly, attached a list of the radio dramas she had grown up with, invited readers to compare them to the play, and declined to comment further. The letter contained no insult, no plea, and no apology. It was not **contrite**, because contrition implied a fault she did not believe she had committed; it was simply unhurried.

The letter was printed the following Sunday. Lukas Verhoeven did not respond. The play, in its third week, sold out twice.`,
  questions: [
    {
      id: 1,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "calumny" most nearly means:',
      quote:
        '"...this particular notice would be less a review than a calumny — a detailed, almost forensic accusation..."',
      options: [
        "An overly enthusiastic, embarrassing piece of praise.",
        "A false and damaging statement intended to harm a reputation.",
        "A formal legal complaint filed in a public court.",
        "A long but essentially harmless theatrical anecdote.",
      ],
      correctIndex: 1,
      explanation:
        '"Calumny" denotes a damaging, defamatory statement. The phrase "forensic accusation" of plagiarism makes the meaning unmistakable.',
    },
    {
      id: 2,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "brazen" most nearly means:',
      quote:
        '"...to say she had stolen from him was a calumny of a different order, because it implied a furtive, brazen theft rather than a slow inheritance."',
      options: [
        "Hesitant and partially apologetic.",
        "Bold and shameless, without restraint.",
        "Carefully polite and deferential.",
        "Quietly accidental and unintentional.",
      ],
      correctIndex: 1,
      explanation:
        '"Brazen" means bold and shameless. It is contrasted with "slow inheritance," sharpening the difference between a shameless taking and a gradual absorption.',
    },
    {
      id: 3,
      kind: "tone-purpose",
      prompt:
        'The author calls the critic "caustic." Why does the author choose "caustic" rather than simply "harsh"?',
      options: [
        '"Caustic" and "harsh" mean exactly the same thing; the choice is purely stylistic.',
        '"Caustic" suggests a sharpness that not only stings but actually corrodes — fitting the image of writers treating his pen like a reef that can sink them.',
        '"Caustic" implies the critic is well-meaning but clumsy in his phrasing.',
        '"Caustic" describes a quiet sadness in the critic\'s tone, while "harsh" would describe his volume.',
      ],
      correctIndex: 1,
      explanation:
        'The literal sense of "caustic" — capable of burning or corroding — supports the comparison to a reef. "Harsh" would be merely loud; "caustic" implies lasting damage.',
    },
    {
      id: 4,
      kind: "inference",
      prompt:
        "Based on the passage, what can the reader most reasonably infer about why Aleida ultimately decides not to publish her own broadside?",
      options: [
        "She privately agrees with the critic that her play is plagiarized and feels too guilty to defend it.",
        "She believes that responding in kind would only treat the critic as more important than he is and would distort her own position into something it isn't.",
        "She is afraid that her agent will fire her if she draws further attention to the controversy.",
        "She knows the *Tribune* will refuse to print any reply she writes, no matter how careful.",
      ],
      correctIndex: 1,
      explanation:
        "Mrs. Hadwell\u2019s remembered advice — that anything but a quiet response inflates the attacker — captures her reasoning, and her measured letter follows from it.",
    },
    {
      id: 5,
      kind: "substitution",
      prompt:
        'Which single word could replace "contrite" in the sentence below without changing its meaning?',
      quote:
        '"It was not contrite, because contrition implied a fault she did not believe she had committed; it was simply unhurried."',
      options: [
        "Defiant",
        "Indifferent",
        "Apologetic",
        "Boastful",
      ],
      correctIndex: 2,
      explanation:
        '"Apologetic" — expressing remorse for a fault — matches "contrite." The very next clause defines it: "contrition implied a fault she did not believe she had committed."',
    },
    {
      id: 6,
      kind: "main-idea",
      prompt:
        "Which sentence best summarizes the central idea or arc of the passage?",
      options: [
        "A playwright successfully sues a critic for slander after he falsely accuses her of plagiarism.",
        "A playwright accused of plagiarism resists the urge to retaliate and instead replies with a short, candid letter that declines to escalate the fight.",
        "A drama critic uses a baseless accusation to deliberately ruin a playwright's career, and largely succeeds.",
        "An agent's aggressive media strategy turns a small scandal into a national debate about artistic inheritance.",
      ],
      correctIndex: 1,
      explanation:
        "The arc moves from the wound of the calumny, through the temptation to strike back, to a measured public response that lets the work speak for itself.",
    },
  ],
};

const MISSION_2_SET_3: SetReading = {
  title: "The Apprentice and the Empty Frame",
  subtitle:
    "A short story about an art studio, a missing canvas, and a young apprentice's first real test.",
  format: "Short Story",
  readingMinutes: 4,
  words: [
    "covet",
    "craven",
    "decorum",
    "deft",
    "demur",
    "derivative",
    "desiccate",
    "diatribe",
    "incredulous",
    "ingenuous",
  ],
  passage: `By the end of her first month at the Vasari Restoration Studio, Inés Crespo had learned to be **deft** with a scalpel — to lift a hundred-year-old varnish from a portrait without bruising the paint underneath — but she had not yet learned how to read the people. The studio had eleven employees, and the eleven of them seemed to communicate in a language of small glances and pauses she could not yet translate.

She suspected this was deliberate. The studio's reputation depended on a kind of professional **decorum** so old-fashioned that even its silences had rules: who poured the coffee at noon, who answered the studio telephone after five, who was permitted to ask the senior conservator, Mr. Lavigne, a question about a piece in progress, and who was expected simply to wait until they were spoken to.

On the Thursday of her fifth week, Inés arrived to find the long oak worktable bare except for a single empty frame.

The frame had, the day before, held a small, much-loved Madonna that the studio had been quietly cleaning for a private collector. The painting was not famous, but it was the kind of work that other restorers spoke of with something close to envy — the kind of piece a younger conservator might secretly **covet**, though no one would ever say so aloud.

Mr. Lavigne stood at the head of the table, hands behind his back. He did not raise his voice. He did not deliver a furious **diatribe** about the failures of modern apprentices, though Inés could tell, from the careful way he was breathing, that one was available to him if he chose. Instead he looked, slowly, at each of the eleven faces in turn, and said only: "I would like to understand what happened. I am willing to wait."

The senior associate, Petra, was the first to speak. She gave a short, polished account that — Inés realized only afterward — was technically true and substantively misleading. Petra was not lying; she was merely **derivative**, repeating fragments of other people's accounts as though they were her own observations. Two others spoke next. Both were careful to **demur** when asked to assign blame, which had the convenient effect of leaving the suspicion to settle, by gravity, on the youngest person in the room.

Inés felt her face grow hot. She was **incredulous** at how quickly the room had organized itself against her without ever quite naming her — a silent, almost choreographed maneuver that no one would later have to defend. The **craven** thing, she knew, would be to cry, to apologize for nothing, to let the suspicion **desiccate** her first month into a long, dry humiliation she would never recover from.

Instead she did something she had not planned. "I have not yet been trusted with the keys to the south cabinet," she said clearly. "I have never been alone in this room overnight. Mr. Lavigne, the sign-out book is in the second drawer of your desk. I would like you to read aloud who signed the painting out yesterday."

There was a long silence.

Mr. Lavigne did not move toward the drawer immediately. He looked at her — not, she realized later, with surprise, but with the small, careful smile of someone who has been waiting all month to see whether his newest apprentice was as **ingenuous** as she had first appeared, or whether something steadier lived underneath.

He opened the drawer.`,
  questions: [
    {
      id: 1,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "covet" most nearly means:',
      quote:
        '"...the kind of piece a younger conservator might secretly covet, though no one would ever say so aloud."',
      options: [
        "To formally request through proper channels.",
        "To eagerly desire something that belongs to another.",
        "To loan out for safekeeping.",
        "To restore to its original condition.",
      ],
      correctIndex: 1,
      explanation:
        '"Covet" means to long for something — especially something not yours. The qualifier "though no one would ever say so aloud" emphasizes the private, slightly improper longing.',
    },
    {
      id: 2,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "ingenuous" most nearly means:',
      quote:
        '"...he had been waiting all month to see whether his newest apprentice was as ingenuous as she had first appeared, or whether something steadier lived underneath."',
      options: [
        "Cleverly and dishonestly resourceful.",
        "Innocent and unsuspecting in a childlike way.",
        "Aggressively self-promoting and ambitious.",
        "Deeply learned in classical technique.",
      ],
      correctIndex: 1,
      explanation:
        '"Ingenuous" means innocent and unguarded. The contrast — "or whether something steadier lived underneath" — confirms that ingenuousness is being weighed against composure.',
    },
    {
      id: 3,
      kind: "tone-purpose",
      prompt:
        'The narrator describes the studio\'s "professional decorum so old-fashioned that even its silences had rules." Why use "decorum" rather than just "etiquette"?',
      options: [
        '"Decorum" and "etiquette" are exact synonyms; the choice is purely decorative.',
        '"Decorum" implies the studio is rude to outsiders, while "etiquette" would suggest hospitality.',
        '"Decorum" carries a sense of dignified, almost moral conduct — fitting a studio whose silences are themselves rule-governed, and whose authority can be wielded by who speaks and who waits.',
        '"Decorum" specifies dress codes and physical posture, while "etiquette" refers only to spoken language.',
      ],
      correctIndex: 2,
      explanation:
        '"Decorum" carries a weightier, almost moral sense of proper conduct — well suited to a studio whose hierarchy is enforced through silences as much as speech.',
    },
    {
      id: 4,
      kind: "inference",
      prompt:
        "Based on the passage, what can the reader most reasonably infer about why Inés decides to ask Mr. Lavigne to read the sign-out book aloud?",
      options: [
        "She is angry at Petra and wants to humiliate her in front of the studio.",
        "She has identified the actual culprit and intends to expose them by name.",
        "She recognizes that the room is quietly arranging the suspicion to fall on her, and the sign-out book is the one piece of evidence that cannot be reframed by a careful retelling.",
        "She has read in a manual that the sign-out book is always the first thing a senior conservator consults in such situations.",
      ],
      correctIndex: 2,
      explanation:
        "The passage explicitly contrasts careful retellings — Petra's, the others' demurrals — with a single piece of unargued evidence: the signed record.",
    },
    {
      id: 5,
      kind: "substitution",
      prompt:
        'Which single word could replace "deft" in the sentence below without changing its meaning?',
      quote:
        '"...Inés Crespo had learned to be deft with a scalpel — to lift a hundred-year-old varnish from a portrait without bruising the paint underneath..."',
      options: [
        "Reckless",
        "Hesitant",
        "Adroit",
        "Indifferent",
      ],
      correctIndex: 2,
      explanation:
        '"Adroit" — neatly skillful — captures the same idea as "deft." The other options describe the opposite (or simply unrelated) qualities.',
    },
    {
      id: 6,
      kind: "main-idea",
      prompt:
        "Which sentence best summarizes the central idea or arc of the passage?",
      options: [
        "A new apprentice is fired from a restoration studio after being unjustly accused of stealing a small Madonna.",
        "An apprentice gradually realizes that her colleagues have been gossiping about her behind her back and decides to leave the profession.",
        "A young apprentice, faced with a quietly orchestrated suspicion, refuses the meek response her colleagues expect and reframes the question with a single piece of unanswerable evidence.",
        "A senior conservator stages a fake theft each year to test whether his apprentices have the courage to accuse him of negligence.",
      ],
      correctIndex: 2,
      explanation:
        "The story turns on Inés recognizing the choreography of the room and replying not with protest but with a fact — the sign-out book — that the room cannot retell.",
    },
  ],
};

const MISSION_3_SET_1: SetReading = {
  title: "The Hermit's Letter",
  subtitle:
    "A short story about a long retreat, a single envelope, and what cannot be ignored from a mountain.",
  format: "Short Story",
  readingMinutes: 4,
  words: [
    "abate",
    "abjure",
    "anomalous",
    "antipathy",
    "arcane",
    "arduous",
    "artless",
    "ascetic",
    "assuage",
    "betray",
  ],
  passage: `For seven years, Arman Kellis had lived alone in a stone hut at the edge of a high alpine forest, in what most of his former colleagues described, with affectionate exaggeration, as **ascetic** seclusion. He cut his own wood. He ate, mostly, what he could grow. He answered no telephone, because he owned none, and the letters that found their way up the mountain — folded into the canvas pouch of a postman who climbed the path twice each month — accumulated in a wooden box on his table until winter, when he finally read them.

The retreat had been chosen, originally, to **assuage** a particular kind of grief. Arman had spent fifteen years as a manuscripts scholar at a small university press, decoding texts so **arcane** that even his colleagues sometimes treated his footnotes as a form of quiet showing-off. When the press had closed under circumstances he refused to discuss in public, his **antipathy** for institutional life had hardened into something like a vow. He had not so much retired as **abjured** — formally, almost ceremonially — the world of committees, deadlines, and donor banquets.

The letter that broke seven years of stillness arrived in late September. Most of his post was **artless**: invoices, mass appeals, the occasional well-meaning note from a former student. This envelope, by contrast, was unusually thin and unusually careful. It was addressed in the hand of his former dean.

Inside was a single page. A young researcher at the press — one Arman had once briefly mentored — had been accused, on the basis of a partial and possibly doctored email chain, of fabricating the provenance of a small medieval cartulary. The accusation, the dean wrote, looked **anomalous**: it did not fit the young man's record, his temperament, or any plausible motive. But the press was now under new leadership, and the new leadership had a preference for resolving such matters quickly rather than carefully. The dean wrote — politely, ashamedly — that an outside opinion from the one scholar who had read the cartulary in its entirety might **abate** the harm before the disciplinary committee met in November.

Arman read the letter three times. The trip down the mountain, in late autumn, would be **arduous**: the path was narrow even in summer; there was already early snow at the higher switchbacks; and the train station at the valley floor was a full day's walk beyond that. He had not opened a manuscript in seven years.

There was, of course, an obvious refusal available to him. He had abjured this world precisely so that he would never again have to weigh small evils against larger ones. To return — even briefly — would be, in some private sense, to **betray** the discipline of the seven years. And yet to refuse would also be a betrayal, of a quieter and more specific kind, because the young researcher had nothing to do with the wound Arman had carried up the mountain in the first place.

He set the letter on the table, banked the fire, and went outside to look, one more time, at the long shape of the valley below. The light was already beginning to thin.

In the morning, he packed.`,
  questions: [
    {
      id: 1,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "assuage" most nearly means:',
      quote:
        '"The retreat had been chosen, originally, to assuage a particular kind of grief."',
      options: [
        "To deliberately intensify a feeling.",
        "To make a painful feeling less severe; to soothe.",
        "To carefully document for later use.",
        "To formally apologize for and renounce.",
      ],
      correctIndex: 1,
      explanation:
        '"Assuage" means to ease or soothe — exactly what a retreat to a quiet hut would be expected to do for grief.',
    },
    {
      id: 2,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "abate" most nearly means:',
      quote:
        '"...an outside opinion from the one scholar who had read the cartulary in its entirety might abate the harm before the disciplinary committee met in November."',
      options: [
        "To ignore or set aside.",
        "To publicize or amplify.",
        "To reduce in degree or intensity.",
        "To formally accuse or prosecute.",
      ],
      correctIndex: 2,
      explanation:
        '"Abate" means to lessen. The dean is hoping Arman\'s expertise will reduce the harm before the committee acts on a partial picture.',
    },
    {
      id: 3,
      kind: "tone-purpose",
      prompt:
        'The narrator describes Arman\'s seclusion as "ascetic" rather than simply "simple." What does this word choice add?',
      options: [
        '"Ascetic" and "simple" are exact synonyms; the choice is purely decorative.',
        '"Ascetic" suggests the seclusion was forced on him by poverty, while "simple" would suggest a free choice.',
        '"Ascetic" carries a sense of disciplined, almost spiritual self-denial — fitting a man who has formally abjured a world rather than merely left it.',
        '"Ascetic" implies the hut was poorly built, while "simple" would mean it was modestly furnished.',
      ],
      correctIndex: 2,
      explanation:
        '"Ascetic" suggests deliberate, almost religious discipline. It fits Arman\'s vow-like withdrawal — a moral posture, not just a lifestyle.',
    },
    {
      id: 4,
      kind: "inference",
      prompt:
        "Based on the passage, what can the reader most reasonably infer about why Arman finally decides to pack in the morning?",
      options: [
        "He misses institutional life and is looking for an excuse to return permanently.",
        "He recognizes that refusing would itself be a betrayal — of the young researcher, who has no connection to the original injury that drove Arman to the mountain.",
        "He believes the dean has personally guaranteed his reinstatement at the press.",
        "He is curious to read a manuscript he has never seen before and treats the request as a research opportunity.",
      ],
      correctIndex: 1,
      explanation:
        "The passage explicitly weighs both possible betrayals — and the deciding fact is that the researcher had nothing to do with Arman's original wound.",
    },
    {
      id: 5,
      kind: "substitution",
      prompt:
        'Which single word could replace "antipathy" in the sentence below without changing its meaning?',
      quote:
        '"...his antipathy for institutional life had hardened into something like a vow."',
      options: [
        "Affection",
        "Aversion",
        "Curiosity",
        "Indifference",
      ],
      correctIndex: 1,
      explanation:
        '"Aversion" — a strong dislike — captures the same meaning. "Indifference" is too weak to harden into a vow, and the others are wrong in direction.',
    },
    {
      id: 6,
      kind: "main-idea",
      prompt:
        "Which sentence best summarizes the central idea or arc of the passage?",
      options: [
        "A retired scholar abandons his solitary life permanently when offered a chance to return to his old position at the press.",
        "A scholar who once renounced institutional life decides, reluctantly and on principle, to leave his retreat to defend a young researcher whose accusation has nothing to do with the original wound that drove him away.",
        "A dean cleverly manipulates a hermit into helping a press that has consistently mistreated him.",
        "A long debate between two friends ends in their decision to publish a controversial book together.",
      ],
      correctIndex: 1,
      explanation:
        "The passage tracks the discipline of the seven years, the careful weight of the dean's request, and Arman's recognition that the researcher's situation deserves a response separate from his own grievance.",
    },
  ],
};

const MISSION_3_SET_2: SetReading = {
  title: "The Bell That Couldn't Be Heard",
  subtitle:
    "A short story about a quiet village, a large festival, and a vote that almost came too soon.",
  format: "Short Story",
  readingMinutes: 4,
  words: [
    "bucolic",
    "burgeon",
    "cacophonous",
    "canonize",
    "censure",
    "chicanery",
    "coalesce",
    "cogent",
    "compelling",
    "contend",
  ],
  passage: `The hills above Senillon had been, for as long as anyone in the valley could remember, almost theatrically **bucolic** — orchards stitched into terraces, a single white road winding past two churches, and a riverside meadow where, on summer evenings, the only sound was the slow ringing of cowbells. So when the regional cultural board announced, with great fanfare, that Senillon had been chosen as the site of a new annual music festival, the village divided overnight into two camps that did not yet know how loud they were about to become.

The proponents argued — quite reasonably — that a festival would help local restaurants and inns **burgeon** in a tourist economy that had grown thinner each decade. They produced graphs. They invited a former mayor of a similar village to speak. The arguments were **cogent**, well-rehearsed, and supported by figures from a regional consultancy whose reputation, until quite recently, had been excellent.

The opposition, led by a retired schoolteacher named Madeleine Aubry, was at first more difficult to take seriously. She did not have graphs. She had instead a small black notebook in which she had been recording, year after year, the precise hour at which the first cuckoo arrived in spring, the dates of the last cherry harvest, and the names of the families who still kept their orchards by hand. Her case, she argued, was not against music but against a specific kind of festival — one whose stage equipment, late hours, and amplified sets would, on the nights it ran, make the village so **cacophonous** that the older residents and the small remaining wildlife would have nowhere to go.

The first public meeting was orderly. The second was not. Several younger residents accused the opposition of trying to **censure** the village's only realistic chance at economic survival. Madeleine, in turn, asked the board to address allegations of **chicanery** in the consultancy's report — figures, she said, that did not match the original survey she had requested under the regional transparency law. The accusations on both sides began to **coalesce** into the kind of permanent feud that small villages survive but rarely fully heal from.

What surprised everyone, including Madeleine, was the third meeting. A young agronomist whom no one had ever met stood up near the back and explained, calmly, that the meadow proposed for the main stage sat directly above the aquifer that fed three of the orchards downhill. His ten-minute presentation was so quietly **compelling** — slides drawn on graph paper, hydrology in plain language — that the room, briefly, fell silent.

The proponents did not change their minds in that silence. But they did agree, that night, to **contend** with a smaller plan: a daylight festival, no amplified sets after eight, the stage on a gravel field rather than the meadow, and a five-year review.

It was not a victory anyone wanted to **canonize**. Both sides had wanted more. But several months later, when the first festival ran and the cuckoo, that spring, had arrived only an hour later than usual in Madeleine's small black notebook, the schoolteacher made a quiet entry in the margin: *neither ruined, nor rescued — only adjusted.*`,
  questions: [
    {
      id: 1,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "cacophonous" most nearly means:',
      quote:
        '"...amplified sets would, on the nights it ran, make the village so cacophonous that the older residents and the small remaining wildlife would have nowhere to go."',
      options: [
        "Pleasantly musical and harmonious.",
        "Filled with a harsh, jarring mixture of loud sounds.",
        "Eerily silent and abandoned.",
        "Crowded with admiring tourists.",
      ],
      correctIndex: 1,
      explanation:
        '"Cacophonous" describes a noisy, discordant clamor — the very thing late-night amplified sets would inflict on a village whose normal soundscape is cowbells.',
    },
    {
      id: 2,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "compelling" most nearly means:',
      quote:
        '"His ten-minute presentation was so quietly compelling — slides drawn on graph paper, hydrology in plain language — that the room, briefly, fell silent."',
      options: [
        "Confusingly technical and hard to follow.",
        "So persuasive that it commands attention and belief.",
        "Politely uninteresting but professionally delivered.",
        "Aggressive and accusatory in tone.",
      ],
      correctIndex: 1,
      explanation:
        '"Compelling" describes something that compels — that demands attention. The room\'s silence is the proof.',
    },
    {
      id: 3,
      kind: "tone-purpose",
      prompt:
        'The narrator calls the village "almost theatrically bucolic." Why use "bucolic" rather than just "rural"?',
      options: [
        '"Bucolic" and "rural" are exact synonyms; the choice is purely stylistic.',
        '"Bucolic" carries a literary sense of an idealized, picturesque countryside — fitting a setting that the narrator goes on to portray as almost staged in its quiet beauty.',
        '"Bucolic" implies the village is poor and struggling, while "rural" would imply prosperity.',
        '"Bucolic" refers specifically to dairy farming, which is not the village\'s main industry.',
      ],
      correctIndex: 1,
      explanation:
        '"Bucolic" carries the literary, almost pastoral sense of an idealized countryside — the modifier "almost theatrically" sharpens that frame.',
    },
    {
      id: 4,
      kind: "inference",
      prompt:
        "Based on the passage, what can the reader most reasonably infer about why the agronomist's presentation was so effective?",
      options: [
        "He was a famous expert whose reputation alone settled the debate.",
        "He shouted down both camps until they agreed to compromise.",
        "He shifted the question from economics versus tradition to a concrete physical fact — the aquifer — that neither side could easily dismiss.",
        "He bribed the board to vote for a smaller festival.",
      ],
      correctIndex: 2,
      explanation:
        "The agronomist introduces a piece of physical evidence — the aquifer beneath the meadow — that is independent of either side's prior arguments and therefore harder to wave away.",
    },
    {
      id: 5,
      kind: "substitution",
      prompt:
        'Which single word could replace "cogent" in the sentence below without changing its meaning?',
      quote:
        '"The arguments were cogent, well-rehearsed, and supported by figures from a regional consultancy whose reputation, until quite recently, had been excellent."',
      options: [
        "Sloppy",
        "Persuasive",
        "Hostile",
        "Indecipherable",
      ],
      correctIndex: 1,
      explanation:
        '"Persuasive" — clear and convincing — captures the same meaning as "cogent." The other choices are wrong in direction.',
    },
    {
      id: 6,
      kind: "main-idea",
      prompt:
        "Which sentence best summarizes the central idea or arc of the passage?",
      options: [
        "A small village rejects a music festival outright in order to preserve its traditional way of life.",
        "A regional cultural board uses pressure tactics to force a reluctant village into hosting a festival nobody wants.",
        "A polarized debate over a music festival is reshaped by an unexpected technical objection, producing a compromise that satisfies neither side completely but protects what mattered most.",
        "A retired schoolteacher single-handedly defeats a coalition of business owners through her charisma and personal popularity.",
      ],
      correctIndex: 2,
      explanation:
        "The passage moves from polarization to an unexpected piece of evidence to a narrow compromise — the schoolteacher's own margin note captures the arc.",
    },
  ],
};

const MISSION_3_SET_3: SetReading = {
  title: "The Footnote in Geneva",
  subtitle:
    "A short story about a draft report, a long conference table, and a junior analyst's first refusal to be polite.",
  format: "Short Story",
  readingMinutes: 4,
  words: [
    "copious",
    "cosmopolitan",
    "deference",
    "desultory",
    "diffident",
    "dilatory",
    "equivocate",
    "polarize",
    "prodigal",
    "verbose",
  ],
  passage: `By her third month at the Geneva office, Yuna Kavalec had filled three notebooks with **copious** observations about her new colleagues — not unkindly, she told herself, only in the way of someone trying very hard to learn an unfamiliar room. The Office of Migration Statistics was, like much of the city around it, more **cosmopolitan** than any place she had worked before: nine languages were spoken in the canteen on any given day, and the senior staff included a former ambassador, two retired demographers, and a man who had once briefed three different presidents in a single year.

In such a room, a junior analyst was expected to behave with a certain **deference**. Yuna had no objection to deference in principle — she had been raised to listen carefully before she spoke — but she had begun to suspect, after several of the long Tuesday meetings, that what was passing for deference in this office was something looser and more **dilatory**: a habit of polite delay that allowed difficult numbers to soften, by attrition, into more comfortable ones.

She herself was naturally **diffident** in meetings, more inclined to write notes than to speak. Her supervisor, Aurelio, had told her on her first week that the habit was "becoming," which she suspected was professional code for: please continue. Aurelio was, by reputation, a brilliant editor of other people's work and a profoundly **verbose** writer of his own, given to producing thirty-page memoranda where six pages would have done. He was not unkind. He was simply, as a former colleague had once told her, the sort of person who did not so much **equivocate** on a hard question as bury it gently under his footnotes.

The hard question, that autumn, concerned a single chart in a draft report on internal displacement. The chart, as drafted, smoothed a cluster of unusually sharp recent figures into a gentle decade-long curve. The smoothing was technically defensible. It was also, Yuna had spent two weeks confirming, statistically misleading. The sharper figures were not noise; they were the most informative part of the dataset, and removing them would, in her view, **polarize** the eventual policy debate exactly along the lines the office most wanted to avoid: those who would say the report had been hidden, and those who would defend the smoothing as routine.

She drafted a single-page note to Aurelio. She rewrote it four times. She knew that any version that read as accusatory would be set aside; any version that read as **desultory** — a casual, take-it-or-leave-it observation — would be taken as exactly that. What she finally sent contained no adjectives at all: it identified the chart, summarized the original distribution, proposed two alternative presentations, and offered to draft either one before the end of the week.

Aurelio read it on a Thursday. He did not reply for two full days, which, in his vocabulary, was either a high compliment or a slow refusal. On the Monday morning, however, he forwarded her note to the senior demographer with a single line: "Yuna's analysis is correct. We should not be **prodigal** with the office's credibility on a chart we know to be wrong."

Yuna kept her composure all the way to lunch. Then she walked out to the lake and laughed, by herself, for nearly five minutes.`,
  questions: [
    {
      id: 1,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "deference" most nearly means:',
      quote:
        '"In such a room, a junior analyst was expected to behave with a certain deference."',
      options: [
        "Open hostility toward authority.",
        "Polite, respectful submission to others' judgment.",
        "Independent and unconventional thinking.",
        "Cheerful indifference to office politics.",
      ],
      correctIndex: 1,
      explanation:
        '"Deference" is respectful yielding — exactly the posture a junior is expected to adopt toward senior colleagues in a hierarchical office.',
    },
    {
      id: 2,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "prodigal" most nearly means:',
      quote:
        '"Yuna\'s analysis is correct. We should not be prodigal with the office\'s credibility on a chart we know to be wrong."',
      options: [
        "Carefully thrifty and conserving.",
        "Wastefully extravagant; spending without restraint.",
        "Slightly suspicious or distrustful.",
        "Slow to make a decision.",
      ],
      correctIndex: 1,
      explanation:
        'Aurelio is warning against squandering — being wastefully extravagant — with the office\'s credibility, the way a prodigal heir squanders an inheritance.',
    },
    {
      id: 3,
      kind: "tone-purpose",
      prompt:
        'Yuna comes to suspect the office\'s "deference" is really something more "dilatory." Why does the author choose "dilatory" rather than simply "slow"?',
      options: [
        '"Dilatory" and "slow" are exact synonyms; the choice is decorative.',
        '"Dilatory" implies the slowness is deliberate or habitual delay — a posture, not a circumstance — which fits an office that uses politeness to soften inconvenient numbers over time.',
        '"Dilatory" suggests speed at the expense of accuracy, the opposite of slowness.',
        '"Dilatory" refers specifically to speech rather than to action.',
      ],
      correctIndex: 1,
      explanation:
        '"Dilatory" implies habitual, often deliberate delay. It captures a posture of polite postponement, not just literal slowness.',
    },
    {
      id: 4,
      kind: "inference",
      prompt:
        "Based on the passage, what can the reader most reasonably infer about Aurelio?",
      options: [
        "He privately disagrees with Yuna's analysis but is forced to support it for political reasons.",
        "He is genuinely able to recognize a strong piece of work, but his own instincts run toward avoidance, so a junior's clear-eyed note is exactly the kind of intervention his style does not produce.",
        "He intends to fire Yuna at the next opportunity for going around him to the senior demographer.",
        "He has been waiting for years for someone to give him an excuse to recommend the smoothing of the chart.",
      ],
      correctIndex: 1,
      explanation:
        "Aurelio's two-day delay reads as evaluation, not refusal; his forwarded line shows he can recognize a correct argument even when his own habit would have been to bury the question.",
    },
    {
      id: 5,
      kind: "substitution",
      prompt:
        'Which single word could replace "verbose" in the sentence below without changing its meaning?',
      quote:
        '"Aurelio was, by reputation, a brilliant editor of other people\'s work and a profoundly verbose writer of his own, given to producing thirty-page memoranda where six pages would have done."',
      options: [
        "Concise",
        "Long-winded",
        "Reluctant",
        "Disorganized",
      ],
      correctIndex: 1,
      explanation:
        '"Long-winded" — using more words than necessary — captures "verbose." "Concise" is the opposite; the others change the trait.',
    },
    {
      id: 6,
      kind: "main-idea",
      prompt:
        "Which sentence best summarizes the central idea or arc of the passage?",
      options: [
        "A junior analyst is forced out of an international office for challenging her supervisor too aggressively.",
        "A naturally reserved analyst writes a careful, adjective-free note that successfully redirects a senior office's instinct to soften a misleading chart.",
        "A supervisor uses an analyst's note to discredit a senior demographer he had been quarreling with for years.",
        "A young statistician learns that her training was insufficient for the kind of sophisticated work the Geneva office requires.",
      ],
      correctIndex: 1,
      explanation:
        "The passage tracks Yuna's careful read of the office, her four-draft note, and Aurelio's quiet endorsement — a study in how a junior voice can change a decision without raising it.",
    },
  ],
};

const MISSION_4_SET_1: SetReading = {
  title: "The Long Off-Season",
  subtitle:
    "A short story about a young swimmer, a famously quiet coach, and the season nobody else sees.",
  format: "Short Story",
  readingMinutes: 4,
  words: [
    "abstain",
    "approbation",
    "cherish",
    "corroborate",
    "disparate",
    "emulate",
    "enervate",
    "ephemeral",
    "fervid",
    "garrulous",
  ],
  passage: `When Sela Marin first met her new coach in the lobby of the Berlin training center, she had been prepared — by years of magazines and short documentaries — for someone louder. Markus Veidt was, in person, almost startlingly quiet. He shook her hand once, watched her swim for an hour without comment, and at the end said only, "We have eleven months. Most of them you will dislike."

That, it turned out, was the warmest sentence he would offer for a long time.

Sela was nineteen, two years out of a national team in which she had been celebrated as the rising star of an entire **disparate** group of swimmers from small clubs across the country. The praise had been **fervid** and continuous. Coaches had spoken her name in interviews. Sponsors had sent gifts to her mother's house. Everyone she met seemed to **cherish** her trajectory more than she did.

Veidt, by contrast, was not a man who handed out **approbation**. In his first week he watched her swim, took notes she was not allowed to see, and made her swim again. He told her she would **abstain** from racing entirely for four months — no meets, no time trials, not even the friendly intra-club sprints she had used since childhood to settle her nerves. "Times," he said, "will lie to you. We will not consult them until they tell the truth."

She had expected to **emulate** Veidt's most famous swimmers — to study their stroke videos, to copy their starts, to move, by careful imitation, into the shape of an Olympian. He forbade this too. "You are not them," he said. "We will discover what you are."

The off-season was, as promised, **enervating**. She had not understood, until she lived it, how much of her old training had been carried by adrenaline — by a meet on the horizon, a measured time, a small public moment of glory. Now there were only mornings: a five-kilometer warm-up at six, drills she had thought she was past at seven, video review at four in the afternoon, sleep at nine. Her teammates were friendly but, by Veidt's design, not particularly **garrulous**; he disliked locker-room talk that turned every workout into an argument, and the room reflected him.

What kept her in Berlin, that first long winter, was not faith in Veidt — she did not yet know him well enough for faith — but a single afternoon in the video room. He had played, side by side, two clips of her own racing: one from a televised race the previous summer, one from an unpublished training session three weeks earlier. The televised race, the one she had been congratulated for, had been visibly worse. He pointed, frame by frame, at the difference, then turned off the screen. He did not need to **corroborate** what the video had already said.

She walked back to her apartment in the cold realizing, for the first time in her career, that the praise of the previous two years had been **ephemeral** — generous, well-intentioned, and entirely beside the point. The work was the point. The work would have to be enough.

That evening she set her alarm for five-thirty, which in Berlin in February felt like an act of either devotion or insanity, and slept very deeply.`,
  questions: [
    {
      id: 1,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "approbation" most nearly means:',
      quote:
        '"Veidt, by contrast, was not a man who handed out approbation."',
      options: [
        "Severe punishment for failure.",
        "Formal approval or warm praise.",
        "Detailed written instructions.",
        "Public criticism of others' work.",
      ],
      correctIndex: 1,
      explanation:
        '"Approbation" denotes approval and praise. The contrast with the earlier coaches who praised Sela "fervidly" makes this sense unmistakable.',
    },
    {
      id: 2,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "ephemeral" most nearly means:',
      quote:
        '"...the praise of the previous two years had been ephemeral — generous, well-intentioned, and entirely beside the point."',
      options: [
        "Permanent and lasting in influence.",
        "Short-lived; lasting only a brief time.",
        "Hostile and corrosive in effect.",
        "Carefully measured and analytical.",
      ],
      correctIndex: 1,
      explanation:
        '"Ephemeral" describes something fleeting. The point of Sela\'s realization is that the praise, however well-meaning, did not last and did not produce real improvement.',
    },
    {
      id: 3,
      kind: "tone-purpose",
      prompt:
        'The author writes that the early praise had been "fervid and continuous." Why "fervid" rather than "warm" or "frequent"?',
      options: [
        '"Fervid" is just a more elegant synonym for "warm" with no real difference in meaning.',
        '"Fervid" carries a sense of intense, almost feverish enthusiasm — capturing how the praise was not merely warm but excessive in a way the rest of the passage will quietly criticize.',
        '"Fervid" implies the praise was given reluctantly, while "warm" would suggest it was sincere.',
        '"Fervid" specifies that the praise was written rather than spoken.',
      ],
      correctIndex: 1,
      explanation:
        '"Fervid" means intensely passionate, even feverish. The word foreshadows the passage\'s point that this kind of overheated praise can mislead a young athlete more than it helps her.',
    },
    {
      id: 4,
      kind: "inference",
      prompt:
        "Based on the passage, what can the reader most reasonably infer about why Sela stays in Berlin despite the difficulty of the off-season?",
      options: [
        "She has signed a contract that prevents her from leaving.",
        "She has been shown direct, frame-by-frame evidence that her celebrated public results were worse than her quiet training, and she trusts that evidence more than her past adrenaline.",
        "She is afraid that quitting would damage her sponsors' opinion of her.",
        "She believes Veidt will eventually become warmer once he sees her dedication.",
      ],
      correctIndex: 1,
      explanation:
        "The video-room afternoon — two clips, side by side — is what keeps her in Berlin. It is not faith in Veidt; it is the unarguable evidence on the screen.",
    },
    {
      id: 5,
      kind: "substitution",
      prompt:
        'Which single word could replace "garrulous" in the sentence below without changing its meaning?',
      quote:
        '"Her teammates were friendly but, by Veidt\'s design, not particularly garrulous; he disliked locker-room talk..."',
      options: [
        "Reserved",
        "Talkative",
        "Athletic",
        "Punctual",
      ],
      correctIndex: 1,
      explanation:
        '"Talkative" matches "garrulous." "Reserved" is the opposite, and the others change the trait.',
    },
    {
      id: 6,
      kind: "main-idea",
      prompt:
        "Which sentence best summarizes the central idea or arc of the passage?",
      options: [
        "A young swimmer is bullied by a famous coach into abandoning the techniques that had made her a national star.",
        "A celebrated young athlete, taken in hand by a quiet, demanding coach, learns to value patient, evidence-based work over the bright but ephemeral praise that had carried her career until then.",
        "A coach refuses to praise his swimmers as a deliberate strategy to break their confidence so he can rebuild them.",
        "A swimmer leaves Berlin after one winter because the off-season is too enervating to bear.",
      ],
      correctIndex: 1,
      explanation:
        "The arc is Sela's quiet shift from a career carried by approbation to one carried by careful, unglamorous work — and the moment in the video room is the hinge.",
    },
  ],
};

const MISSION_4_SET_2: SetReading = {
  title: "The Editor's Archive",
  subtitle:
    "A short story about a small-town newspaper, an angry letter, and a single yellowed clipping.",
  format: "Short Story",
  readingMinutes: 4,
  words: [
    "incendiary",
    "inimical",
    "intimate",
    "invigorate",
    "mitigate",
    "obsolete",
    "opaque",
    "paradigmatic",
    "pedantic",
    "placid",
  ],
  passage: `When the angry letter arrived at the *Mareton Sentinel* — printed in a font deliberately too large, addressed to the editor by full middle name, and accusing the paper of "decades of cowardice" on the question of the river dam — Henrika Voss did not, at first, take it personally. She had been the paper's editor for nineteen years. She had received versions of this letter, in waves of varying ferocity, since her second week.

What was different about this one was its **incendiary** specificity. The writer had not merely declared the *Sentinel* timid; he had named three articles, by date and headline, that he claimed proved the paper had downplayed the dam's risks for an entire generation. Two of the dates Henrika could refute from memory in a sentence. The third, however, was older than her tenure, and the writer had, with unusual care, attached a photocopy of the original page.

She read the photocopy twice. The article, by a long-retired reporter, was not — as the letter alleged — sympathetic to the dam's developers. But it was not exactly **inimical** to them either. It was something stranger: deliberately **opaque**, written in a register so cautious that an attentive reader could come away with almost any conclusion they had brought to it.

That afternoon she went down to the basement archive — a room she had always found oddly **placid**, despite the dust — and pulled the original from its bound volume. The paper itself was yellowed but intact. The accompanying notes, in the reporter's own crabbed handwriting, were still tucked into the back of the binder. They told a more interesting story than the article had.

The reporter had interviewed two engineers and a regional inspector. One engineer had been sharply critical of the dam's spillway design; one had defended it; the inspector, then close to retirement, had refused to be quoted. The published article had presented these as a **paradigmatic** "two sides" piece — careful, balanced, almost ostentatiously neutral — and had quietly omitted the most damaging quotation, which Henrika now read for the first time.

She stood in the archive for a long while.

Her instinct, professionally, was to **mitigate**: to write a short clarifying note, to acknowledge in a single column that the original framing had been incomplete, to let the matter recede. Such notes were considered, in her trade, **pedantic** rather than dramatic — a minor adjustment to the historical record, the sort of thing a careful institution did quietly. But standing in the basement, holding the reporter's actual notes, she suspected that any response that small would be accurate without being honest.

The dam, fifty years later, was not yet **obsolete**, but the spillway question — the very one the paper had softened — was now back on the regional council's agenda. Whatever the *Sentinel* published next would, inevitably, become part of that debate.

She climbed back up to her office, opened a fresh document, and began to write. The piece would not be **intimate** — she did not believe in turning a public failure into a personal confession — but it would print the omitted quotation in full, would publish the relevant passages of the reporter's notes, and would, she hoped, **invigorate** a debate that had spent half a century being politely, professionally muffled.`,
  questions: [
    {
      id: 1,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "opaque" most nearly means:',
      quote:
        '"It was something stranger: deliberately opaque, written in a register so cautious that an attentive reader could come away with almost any conclusion they had brought to it."',
      options: [
        "Bright and easy to read.",
        "Difficult to see through; not transparent in meaning.",
        "Aggressive and openly accusatory.",
        "Brief and clearly summarized.",
      ],
      correctIndex: 1,
      explanation:
        '"Opaque" here is figurative: the article was so guarded that its meaning could not be clearly seen through the prose, leaving the reader free to read it almost any way.',
    },
    {
      id: 2,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "mitigate" most nearly means:',
      quote:
        '"Her instinct, professionally, was to mitigate: to write a short clarifying note...to let the matter recede."',
      options: [
        "To deliberately worsen a problem.",
        "To make the consequences of a problem less severe.",
        "To celebrate publicly.",
        "To formally accuse a third party.",
      ],
      correctIndex: 1,
      explanation:
        'To "mitigate" is to lessen the harm or severity of something — exactly what a brief, careful clarifying note is designed to do.',
    },
    {
      id: 3,
      kind: "tone-purpose",
      prompt:
        'The narrator calls the letter "incendiary" rather than simply "angry." What does this word choice add?',
      options: [
        '"Incendiary" and "angry" are exact synonyms; the choice is purely stylistic.',
        '"Incendiary" carries a sense of being designed to set things on fire — to provoke, not merely to express feeling — fitting a letter built around named dates and an attached photocopy.',
        '"Incendiary" implies the letter was written by someone employed by the dam authority.',
        '"Incendiary" specifies that the letter was hand-delivered rather than mailed.',
      ],
      correctIndex: 1,
      explanation:
        '"Incendiary" emphasizes intent to inflame — and the letter\'s detailed, evidence-laden construction is precisely what makes it more dangerous than a vent of feeling.',
    },
    {
      id: 4,
      kind: "inference",
      prompt:
        "Based on the passage, what can the reader most reasonably infer about why Henrika rejects writing only a small clarifying note?",
      options: [
        "She believes the original reporter is still alive and would object to a quiet correction.",
        "She is hoping a longer article will win her a national journalism prize.",
        "She recognizes that with the spillway question back on the council's agenda, a small note would be technically accurate but would fail to repair a public debate the paper itself had long muffled.",
        "Her publisher has explicitly forbidden small clarifying notes as a matter of editorial policy.",
      ],
      correctIndex: 2,
      explanation:
        "The passage explicitly weighs accuracy against honesty and turns on the timing — the spillway question is once again live, so a small note would be technically true but materially insufficient.",
    },
    {
      id: 5,
      kind: "substitution",
      prompt:
        'Which single word could replace "placid" in the sentence below without changing its meaning?',
      quote:
        '"...the basement archive — a room she had always found oddly placid, despite the dust..."',
      options: [
        "Chaotic",
        "Tranquil",
        "Crowded",
        "Echoing",
      ],
      correctIndex: 1,
      explanation:
        '"Tranquil" — calm and peaceful — captures "placid." The other options shift or reverse the mood of the room.',
    },
    {
      id: 6,
      kind: "main-idea",
      prompt:
        "Which sentence best summarizes the central idea or arc of the passage?",
      options: [
        "An editor proves an angry letter false by checking the original article and dismissing the writer's claims.",
        "An editor reviews her newspaper's archive in response to a sharply specific complaint and decides that the moment requires a fuller account, not a small clarifying note.",
        "A newspaper apologizes publicly for a single article written before its current editor was hired.",
        "An angry reader is permanently banned from the *Mareton Sentinel* after sending a long, personal letter to the editor.",
      ],
      correctIndex: 1,
      explanation:
        "The passage moves from the letter, through the archive, to Henrika's choice between a quiet correction and a fuller account — and her decision turns on the renewed public stakes.",
    },
  ],
};

const MISSION_4_SET_3: SetReading = {
  title: "The Manuscript on the Lake",
  subtitle:
    "A short story about a retired judge, a finished book, and a single decision that will not stay decided.",
  format: "Short Story",
  readingMinutes: 4,
  words: [
    "polemical",
    "precipitate",
    "profundity",
    "prophetic",
    "prudent",
    "punctilious",
    "recondite",
    "scrupulous",
    "tranquil",
    "vacillate",
  ],
  passage: `For three years after his retirement, Justice Halvor Bren had lived in what his old clerks, with mock envy, called "the suspiciously **tranquil** house" — a small wooden cottage on the western shore of a Norwegian lake, twelve kilometers from the nearest neighbor, with a view of three pines and a kettle that whistled in the same key as the morning loons.

In that house, in those three years, he had written a book.

The book was not, on its surface, **polemical**. It was a long, careful study of judicial reasoning in a particular set of administrative cases — the kind of subject most readers would call **recondite** without finishing the title page. Halvor had researched it with the **scrupulous** habits of a man who, throughout his career, had been congratulated less for the brilliance of his opinions than for their **punctilious** attention to procedure. He had checked every footnote himself, twice.

What made the book difficult was not its prose but its conclusion. The cases Halvor had studied — many decided by colleagues he had liked and admired — formed, when read together, a quiet but unmistakable pattern of deference to a single ministry whose conduct his own dissents had occasionally, but not often enough, criticized. To publish the book would be to argue, with the authority of his name, that the judiciary of his own generation had been more compliant than it had told itself.

It would not be a **precipitate** decision. He had drafted, redrafted, set aside, and returned to the manuscript over thirty-one months. But sometime in the second winter, he had begun to **vacillate** — not about the argument, which he believed, but about whether his own publication of it would do more good than harm. There were younger judges, his former colleagues among them, who would be wounded by the book in ways he could already imagine in unwelcome detail.

His old friend Mariam, a retired prosecutor, came up for the long weekend in March. She read the manuscript on the porch in two days, walking down to the dock between chapters, returning with the pages folded under one arm.

"It's good," she said on the second evening. "It's also not yours to keep."

He asked what she meant.

"You think the question is whether to publish," she said. "But the book has already been written. The only remaining question is whether the people who will be most embarrassed by it learn about it from you, or — eight years from now — from a graduate student who finds your draft in an archive and doesn't know any of them personally."

The remark was not **prophetic** in any mystical sense. Mariam had simply spent her career predicting, with depressing accuracy, what would happen to documents people tried to suppress.

Halvor walked the lake path in the morning. The water was very still. He thought about whether the most **prudent** course was, paradoxically, the least cautious one — to publish now, with whatever **profundity** the book contained, while he was still alive to correct misreadings and to absorb the criticisms in person.

By mid-afternoon he had drafted a short letter to his publisher in Oslo. He did not seal it immediately. He set it on the kitchen table and walked back down to the dock, because he had learned, in three years on this lake, that decisions made before sunset were often quietly amended by it — and this one, he suspected, would not be.

It wasn't.

He sealed the letter at dawn.`,
  questions: [
    {
      id: 1,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "recondite" most nearly means:',
      quote:
        '"...a long, careful study of judicial reasoning in a particular set of administrative cases — the kind of subject most readers would call recondite without finishing the title page."',
      options: [
        "Widely popular and easy to understand.",
        "Obscure, dealing with subjects beyond ordinary knowledge.",
        "Politically explosive and controversial.",
        "Religious or devotional in tone.",
      ],
      correctIndex: 1,
      explanation:
        '"Recondite" describes specialized, hard-to-access subject matter — the very thing most readers would dismiss before reading.',
    },
    {
      id: 2,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "vacillate" most nearly means:',
      quote:
        '"...he had begun to vacillate — not about the argument, which he believed, but about whether his own publication of it would do more good than harm."',
      options: [
        "To grow more certain over time.",
        "To swing back and forth between alternatives without settling.",
        "To formally renounce a position.",
        "To delegate a decision to someone else.",
      ],
      correctIndex: 1,
      explanation:
        '"Vacillate" means to waver between options. The next clause sharpens it: he is wavering not about the argument but about whether to publish.',
    },
    {
      id: 3,
      kind: "tone-purpose",
      prompt:
        'The narrator describes Halvor as known for "punctilious attention to procedure." Why "punctilious" rather than just "careful"?',
      options: [
        '"Punctilious" is a more elegant synonym for "careful" with no real difference in meaning.',
        '"Punctilious" specifies a near-obsessive attention to fine points of correct procedure — a distinctive judicial virtue, sharper than ordinary "carefulness."',
        '"Punctilious" implies he was often late and apologetic.',
        '"Punctilious" describes loud, public scrupulousness rather than private discipline.',
      ],
      correctIndex: 1,
      explanation:
        '"Punctilious" specifically describes attention to small, correct details of form and procedure — the precise reputation a judge of his kind would have earned.',
    },
    {
      id: 4,
      kind: "inference",
      prompt:
        "Based on the passage, what can the reader most reasonably infer Mariam means when she says the book \"is also not yours to keep\"?",
      options: [
        "Halvor does not legally own the rights to the manuscript and must transfer them to a colleague.",
        "Once such an argument has been written, suppressing it merely guarantees that someone else will publish it later, in worse circumstances and without Halvor present to defend or refine it.",
        "Halvor's family has the right to decide whether the book will be published.",
        "The judiciary itself owns any analysis of its decisions.",
      ],
      correctIndex: 1,
      explanation:
        "Mariam's point — sharpened by her career predicting suppressed documents — is that the real choice is between publishing now or being published later by someone else, in less forgiving terms.",
    },
    {
      id: 5,
      kind: "substitution",
      prompt:
        'Which single word could replace "tranquil" in the sentence below without changing its meaning?',
      quote:
        '"...his old clerks, with mock envy, called \'the suspiciously tranquil house\' — a small wooden cottage on the western shore of a Norwegian lake..."',
      options: [
        "Crowded",
        "Serene",
        "Hostile",
        "Industrial",
      ],
      correctIndex: 1,
      explanation:
        '"Serene" — calm and peaceful — matches "tranquil." The other options reverse or unrelate the mood.',
    },
    {
      id: 6,
      kind: "main-idea",
      prompt:
        "Which sentence best summarizes the central idea or arc of the passage?",
      options: [
        "A retired judge writes a book, decides it is too dangerous to publish, and burns the manuscript at the end of a quiet weekend.",
        "A retired prosecutor convinces a former colleague to abandon a careful study because it will harm the reputation of younger judges.",
        "A retired judge, after years of careful drafting, comes to see that the most prudent path is also the least cautious — to publish now, while he can answer for what he has written.",
        "A small Norwegian publisher refuses a manuscript because it is too technical for general readers.",
      ],
      correctIndex: 2,
      explanation:
        "The arc tracks Halvor's deliberate scrupulousness, his vacillation, Mariam's reframing, and his eventual conclusion that publishing now is the genuinely prudent course.",
    },
  ],
};

const MISSION_5_SET_1: SetReading = {
  title: "The Bell at the End of the Garden",
  subtitle:
    "A short story about a wedding, two estranged sisters, and a sound from childhood.",
  format: "Short Story",
  readingMinutes: 4,
  words: [
    "aloof",
    "clangor",
    "conventional",
    "debunk",
    "diminutive",
    "discernible",
    "enigmatic",
    "estranged",
    "extravagant",
    "fanciful",
  ],
  passage: `Karina had not seen her younger sister in eleven years when the wedding invitation, on cream paper with **extravagant** silver lettering, arrived at her apartment. The card was so heavily decorated that the address itself was barely **discernible** beneath the foil; only the postmark gave away its origin. She read it twice, set it on the kitchen counter, and did not respond for nine days.

The sisters had been close as children and had grown **estranged** in the long, undramatic way of adult lives that quietly rearrange themselves around grievances no one ever quite states. There had been no single event, no famous quarrel, only an accumulating distance that family members had learned to describe with words like "complicated" and "private." By her thirties, Karina had grown used to thinking of her sister Aleksa as a slightly **enigmatic** figure who appeared in family photographs at holidays she did not attend.

The wedding was to be held in the garden of their grandmother's old house — a detail the invitation almost concealed, in the same fancy script. That garden, Karina had not seen since she was twenty-two.

She went, in the end, because her grandmother was eighty-nine, and because no satisfying excuse would have survived contact with her own conscience.

The wedding itself was, by intention, **conventional**: white flowers, a string quartet, a polite minister, three short speeches. Karina sat near the back of the rows and tried to look, throughout the ceremony, neither warm nor pointedly **aloof** — the careful neutrality of a guest who is also a story the other guests have been told.

It was after the ceremony, during the long unstructured hour before the reception began, that she found herself walking the garden path she had walked, almost daily, as a child. The path narrowed past the rose hedge and ended at the small wooden gate at the edge of the orchard, where her grandfather had once hung an old brass bell — **diminutive**, dented, a little ridiculous — that the children had been allowed to ring once before each meal.

The bell was still there.

It was Aleksa, in the long ivory dress, who saw her first. She did not approach immediately. She stood at the far end of the path, a distance of maybe twenty meters, and waited, as if she had spent the years between rehearsing exactly this hesitation.

Karina lifted her hand. Aleksa lifted hers.

When her sister did, finally, walk down the path, she rang the small brass bell with one quick swing as she passed under it. The **clangor** was not, of course, especially loud — the bell was the size of a small fist — but in the still garden it was perfectly audible, and to Karina, who had not heard it in twenty years, it carried a quality the rest of the day did not.

"I wasn't sure you'd come," Aleksa said.

"I almost didn't," Karina said. "I almost wrote a very long letter explaining why I wasn't coming. It would have been completely **fanciful** — I'd have invented half of it as I went."

Aleksa laughed once, briefly. They did not, that afternoon, **debunk** the version of their estrangement that the family had quietly agreed on. There was time enough for that, perhaps, in the years that might or might not follow. But the bell had rung, and the garden, for an hour, was a place they were both willing to stand in.`,
  questions: [
    {
      id: 1,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "aloof" most nearly means:',
      quote:
        '"...Karina sat near the back of the rows and tried to look, throughout the ceremony, neither warm nor pointedly aloof..."',
      options: [
        "Openly hostile and confrontational.",
        "Reserved and emotionally distant.",
        "Visibly tearful and overwhelmed.",
        "Cheerfully social and welcoming.",
      ],
      correctIndex: 1,
      explanation:
        '"Aloof" describes deliberate emotional distance — the careful coolness Karina is trying to balance against the appearance of warmth.',
    },
    {
      id: 2,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "estranged" most nearly means:',
      quote:
        '"The sisters had been close as children and had grown estranged in the long, undramatic way of adult lives that quietly rearrange themselves around grievances no one ever quite states."',
      options: [
        "Newly devoted to one another.",
        "Distant and separated in feeling, no longer close.",
        "Legally divorced or annulled.",
        "Still emotionally close, despite physical distance.",
      ],
      correctIndex: 1,
      explanation:
        '"Estranged" means alienated or no longer close. The whole passage turns on the slow, undramatic distance the word describes.',
    },
    {
      id: 3,
      kind: "tone-purpose",
      prompt:
        'The invitation\'s lettering is called "extravagant." Why does the author choose "extravagant" rather than just "fancy"?',
      options: [
        '"Extravagant" and "fancy" mean exactly the same thing; the choice is purely decorative.',
        '"Extravagant" carries the sense of going beyond what is reasonable or necessary, gently signaling that the wedding\'s formal trappings are themselves a little overdone — and may obscure as much as they announce.',
        '"Extravagant" means "expensive" specifically and refers to the cost of the silver foil.',
        '"Extravagant" implies the invitation is poorly made, while "fancy" would imply the opposite.',
      ],
      correctIndex: 1,
      explanation:
        '"Extravagant" suggests excess. The narrator notes that even the address is barely discernible beneath the foil — the very richness of the design conceals.',
    },
    {
      id: 4,
      kind: "inference",
      prompt:
        "Based on the passage, what can the reader most reasonably infer about why Karina ultimately attends the wedding?",
      options: [
        "She is hoping to confront her sister publicly during the ceremony.",
        "She has been promised an inheritance she will lose if she does not appear.",
        "She recognizes that her grandmother's age and her own conscience will not allow her to construct a believable excuse for staying away.",
        "She has been advised by a therapist that attending will fully heal the estrangement.",
      ],
      correctIndex: 2,
      explanation:
        "The passage states the reason directly: her grandmother was eighty-nine, and \"no satisfying excuse would have survived contact with her own conscience.\"",
    },
    {
      id: 5,
      kind: "substitution",
      prompt:
        'Which single word could replace "enigmatic" in the sentence below without changing its meaning?',
      quote:
        '"By her thirties, Karina had grown used to thinking of her sister Aleksa as a slightly enigmatic figure who appeared in family photographs at holidays she did not attend."',
      options: [
        "Familiar",
        "Mysterious",
        "Boisterous",
        "Hostile",
      ],
      correctIndex: 1,
      explanation:
        '"Mysterious" — hard to interpret or understand — captures "enigmatic." The others change the relationship entirely.',
    },
    {
      id: 6,
      kind: "main-idea",
      prompt:
        "Which sentence best summarizes the central idea or arc of the passage?",
      options: [
        "Two estranged sisters use a wedding to publicly resolve every grievance that had separated them for eleven years.",
        "An older sister attends an estranged sibling's wedding, walks back to a childhood place, and shares a small, unspectacular moment of recognition that does not heal the estrangement but suspends it for an hour.",
        "A grandmother orchestrates a reunion between two sisters by deliberately seating them next to each other at the reception.",
        "An estranged sister leaves a wedding early after realizing the family will never accept her decision to attend.",
      ],
      correctIndex: 1,
      explanation:
        "The passage tracks Karina's reluctant attendance, the walk to the bell, the brief ringing, and a guarded but real moment between the sisters — neither resolution nor refusal.",
    },
  ],
};

const MISSION_5_SET_2: SetReading = {
  title: "The New Director's First Season",
  subtitle:
    "A short story about a regional theatre, an inherited program, and a young director's first refusal to bow.",
  format: "Short Story",
  readingMinutes: 4,
  words: [
    "frivolous",
    "heterogeneous",
    "imperious",
    "impertinent",
    "invasive",
    "irresolute",
    "laudable",
    "lax",
    "marginalize",
    "panache",
  ],
  passage: `When Ines Verra was named, at thirty-four, the new artistic director of the Carragh Regional Theatre, the local paper devoted an entire column to her surprising youth, her unusually long résumé, and what one critic memorably called her "alarming **panache**." The word was meant, she suspected, as praise — but the kind of praise that, in a small theatre town, is also a warning.

The board that had hired her was, like most boards, almost theatrically **heterogeneous**: a retired oil-services executive, two longtime donors, a former drama teacher, a young app developer who attended one play a year, and a single working actor who said almost nothing in meetings. They had hired Ines, as far as she could tell, because each of them had hoped she would deliver a slightly different theatre.

She inherited a season, half-programmed by her predecessor, that she found **lax** in almost every direction at once: safe choices stretched thin, an over-reliance on a single touring company, and — most worrying — a quiet pattern of programming that consistently **marginalized** the regional playwrights the theatre had once been famous for championing.

In her first board meeting, she proposed three changes. None of them was **frivolous**. None of them was, in budgetary terms, particularly aggressive. But the second proposal — to commission a new play from a writer the previous director had publicly dismissed — caused the room to grow visibly cold.

The retired executive spoke first. His tone was not unkind, exactly, but it was distinctly **imperious**: he had served on three boards over forty years, he reminded her, and could anticipate the donor reaction. The drama teacher then asked whether the proposal was perhaps a little **impertinent** for a director's first month — a question that, Ines noticed, no one would have asked a man of forty-five.

She did not answer immediately. She had spent the previous week imagining versions of this exact meeting, and she had decided that whatever else she did, she would not be **irresolute** about the second proposal. The writer in question was, in her professional judgment, exactly the voice the theatre's audience had been quietly missing for a decade. To withdraw the commission under polite pressure in her first month would set a tone she would not later be able to undo.

So she did three things. She thanked the executive for the institutional memory. She told the drama teacher that whether her proposal was impertinent depended entirely on what the proposal was *for*, and described again, in two sentences, what she believed it was for. And she offered the board a single concrete compromise: she would, for the first season only, share programming authority on the new commission with a small advisory panel that included the working actor.

The proposal passed by a margin so narrow it counted, technically, as a tie broken by the chair.

The board did not exactly love her by the end of the meeting. But they had also not voted her down on her first significant proposal, and the working actor, on the way out, told her quietly that her instinct on the playwright was correct.

It was a **laudable** outcome, in the cautious vocabulary the theatre press would later use, though Ines knew that in this profession a laudable first season was only ever the beginning of an **invasive** scrutiny of the second. She walked out into the cold air of the parking lot already half-thinking about the third.`,
  questions: [
    {
      id: 1,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "imperious" most nearly means:',
      quote:
        '"His tone was not unkind, exactly, but it was distinctly imperious: he had served on three boards over forty years, he reminded her, and could anticipate the donor reaction."',
      options: [
        "Apologetic and self-doubting.",
        "Domineering, accustomed to being obeyed without argument.",
        "Cheerfully encouraging.",
        "Quietly indifferent.",
      ],
      correctIndex: 1,
      explanation:
        '"Imperious" describes a tone of expected authority — fitting an executive whose forty years on boards have trained him to assume his judgment will carry the room.',
    },
    {
      id: 2,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "laudable" most nearly means:',
      quote:
        '"It was a laudable outcome, in the cautious vocabulary the theatre press would later use..."',
      options: [
        "Disastrous and embarrassing.",
        "Worthy of praise; commendable.",
        "Trivially small and unimportant.",
        "Suspiciously expensive.",
      ],
      correctIndex: 1,
      explanation:
        '"Laudable" means deserving of praise. The narrator\'s "cautious vocabulary" qualifier shows it is faint praise, but praise nonetheless.',
    },
    {
      id: 3,
      kind: "tone-purpose",
      prompt:
        'The critic calls Ines\'s style "alarming panache." Why does the author build the column around "panache" rather than a plainer word like "style"?',
      options: [
        '"Panache" is just a French-flavored synonym for "style" with no different meaning.',
        '"Panache" carries a sense of distinctive, almost showy flair — and the modifier "alarming" makes the praise double-edged in a way "style" could not.',
        '"Panache" specifies that Ines is good with money, while "style" would describe her clothing.',
        '"Panache" implies that Ines is theatrical only in her private life, not professionally.',
      ],
      correctIndex: 1,
      explanation:
        '"Panache" suggests distinctive, almost flamboyant flair. Pairing it with "alarming" turns a compliment into a small warning — exactly the local paper\'s tone.',
    },
    {
      id: 4,
      kind: "inference",
      prompt:
        "Ines notices that the drama teacher's question — whether the proposal was 'impertinent' for a director's first month — is one no one would have asked a man of forty-five. What can the reader most reasonably infer from this observation?",
      options: [
        "Ines believes she is being treated more skeptically than a comparable male director would be, because of her age and likely her gender.",
        "Ines believes the drama teacher dislikes the writer being commissioned for personal reasons.",
        "Ines believes board members are forbidden from using the word 'impertinent' in meetings.",
        "Ines believes the question is a private joke between the drama teacher and the executive.",
      ],
      correctIndex: 0,
      explanation:
        "The observation isolates a difference in expectation that would not be applied to a comparable man — Ines is reading the question as a quiet sign of double standard.",
    },
    {
      id: 5,
      kind: "substitution",
      prompt:
        'Which single word could replace "irresolute" in the sentence below without changing its meaning?',
      quote:
        '"...she had decided that whatever else she did, she would not be irresolute about the second proposal."',
      options: [
        "Determined",
        "Wavering",
        "Boastful",
        "Relaxed",
      ],
      correctIndex: 1,
      explanation:
        '"Wavering" — uncertain or unable to decide — captures "irresolute." "Determined" is the opposite.',
    },
    {
      id: 6,
      kind: "main-idea",
      prompt:
        "Which sentence best summarizes the central idea or arc of the passage?",
      options: [
        "A young director quits her first board meeting after concluding that the board will never approve her programming.",
        "A new artistic director, recognizing the cost of yielding on her first significant proposal, holds her position with a careful compromise that wins her a narrow but meaningful first vote.",
        "A board of donors successfully blocks every proposal a new director brings to her first meeting.",
        "A regional theatre is forced to dissolve when a new director and a retired executive cannot agree on a single play.",
      ],
      correctIndex: 1,
      explanation:
        "The passage tracks Ines's preparation, her decision not to be irresolute, and the narrowly successful compromise that lets her hold her ground without breaking the room.",
    },
  ],
};

const MISSION_5_SET_3: SetReading = {
  title: "The Tuesday Class",
  subtitle:
    "A short story about an after-school program, a doubting administrator, and the long art of persuasion.",
  format: "Short Story",
  readingMinutes: 4,
  words: [
    "plodding",
    "prosaic",
    "remedial",
    "restive",
    "sporadic",
    "stigmatize",
    "undermine",
    "utterly",
    "weary",
    "zealous",
  ],
  passage: `For the first three months of her tenure at Sablon Middle School, the new literacy coach Petra Halász felt **utterly** invisible. The school had hired her, on paper, to lead a small **remedial** reading program for sixth graders who had fallen behind during the long disruption of the previous two years; in practice, she had been handed a windowless classroom on the third floor, a roster that arrived in **sporadic** updates, and the polite indifference of a faculty that had seen too many short-lived programs come and go to invest its hopes in another.

The students themselves were, on Day One, **restive**. They knew, as students always know, that a new program meant a new label. Petra suspected — correctly, as it turned out — that more than one child in the room had already been gently warned, by adults trying to be kind, that the class might **stigmatize** them with the rest of the school if they treated it too seriously.

She had, accordingly, two problems to solve at once: the visible one of teaching reading, and the invisible one of slowly disarming the idea that the class was a punishment.

Her early lessons were, by design, **plodding** — short paragraphs, predictable formats, the kind of careful step-by-step work that adults who had not done it sometimes called dull. The principal, dropping in unannounced in the second week, observed a lesson on contextual inference and afterwards told Petra, without quite meaning to be cruel, that he had expected something "less **prosaic**." He had imagined, perhaps, group games and bright posters; he had not imagined a quiet room of eleven-year-olds working through one paragraph at a time.

Petra heard the comment without arguing. She had been a remedial teacher long enough to know that arguing, in her first month, would only **undermine** her standing in a school that was already half-inclined to dismiss the program. She also knew that the slow, plodding work was, in her judgment, exactly what most of these students needed — and that any attempt to make it look more exciting for visiting adults would, in a few weeks, cost her the trust of the room.

By the end of the first quarter she was tired. She did not let the students see this. **Weary** teachers, in her experience, taught nervous students. But on the long bus ride home each Friday she would close her eyes and feel her own face, briefly, soften out of its classroom expression.

What kept her going was not, at first, results — those came later — but the quiet conduct of a single child, an unusually **zealous** sixth grader named Marek, who had begun arriving ten minutes early to the Tuesday session to reread the previous week's passage on his own. He did not announce this. He simply did it. Petra never mentioned it, because she suspected that any praise she offered would, in this particular child's case, feel like a trap.

By the end of the second quarter, the principal observed another lesson. He did not, this time, use the word "prosaic." He stayed the entire period, asked one careful question about the assessment protocol, and left without a comment.

Petra took this, in the cautious vocabulary of her trade, as the highest praise the school was, for the moment, capable of giving her.

She set her bag down on the third-floor desk, looked at the empty room, and began to plan Tuesday's lesson.`,
  questions: [
    {
      id: 1,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "restive" most nearly means:',
      quote: '"The students themselves were, on Day One, restive."',
      options: [
        "Calmly attentive and eager to begin.",
        "Restless and resistant to being controlled.",
        "Deeply asleep at their desks.",
        "Cheerfully obedient and quiet.",
      ],
      correctIndex: 1,
      explanation:
        '"Restive" describes restless, uneasy resistance — exactly how a class of newly relabeled sixth graders would behave on Day One.',
    },
    {
      id: 2,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "zealous" most nearly means:',
      quote:
        '"...the quiet conduct of a single child, an unusually zealous sixth grader named Marek, who had begun arriving ten minutes early to the Tuesday session to reread the previous week\'s passage on his own."',
      options: [
        "Reluctant and resentful about attending.",
        "Marked by intense, eager devotion.",
        "Absent-minded and forgetful.",
        "Loud and boastful in front of peers.",
      ],
      correctIndex: 1,
      explanation:
        '"Zealous" describes eager, devoted commitment. Arriving early to reread a passage on his own is the unmistakable behavior of a zealous student.',
    },
    {
      id: 3,
      kind: "tone-purpose",
      prompt:
        'The principal expects something "less prosaic." Why does the author choose "prosaic" rather than just "boring"?',
      options: [
        '"Prosaic" and "boring" mean exactly the same thing; the choice is purely stylistic.',
        '"Prosaic" carries a literary sense of being matter-of-fact and unembellished — fitting a principal who expected showy lessons and is gently disappointed by careful, ordinary-looking instruction.',
        '"Prosaic" implies the lessons were poorly prepared, while "boring" would imply intentional dullness.',
        '"Prosaic" specifically refers to the use of prose rather than poetry in the classroom.',
      ],
      correctIndex: 1,
      explanation:
        '"Prosaic" describes the matter-of-fact, unornamented quality of the lesson — and it captures the principal\'s mild disappointment more precisely than "boring" would.',
    },
    {
      id: 4,
      kind: "inference",
      prompt:
        "Based on the passage, what can the reader most reasonably infer about why Petra does not argue with the principal's comment?",
      options: [
        "She privately agrees that her lessons are too dull and intends to change them immediately.",
        "She is afraid the principal will fire her if she speaks back to him in the hallway.",
        "She judges that defending plodding work in her first month would weaken her standing more than the comment itself does, and she trusts the work to make its own case over time.",
        "She is too tired by the end of the day to construct a coherent reply.",
      ],
      correctIndex: 2,
      explanation:
        "The passage explicitly says arguing would undermine her standing — and she also believes the slow work is right and will eventually speak for itself.",
    },
    {
      id: 5,
      kind: "substitution",
      prompt:
        'Which single word could replace "plodding" in the sentence below without changing its meaning?',
      quote:
        '"Her early lessons were, by design, plodding — short paragraphs, predictable formats, the kind of careful step-by-step work that adults who had not done it sometimes called dull."',
      options: [
        "Frantic",
        "Methodical",
        "Glamorous",
        "Improvised",
      ],
      correctIndex: 1,
      explanation:
        '"Methodical" — slow and steady, step by step — captures the deliberate, unhurried quality of "plodding" in this educational context.',
    },
    {
      id: 6,
      kind: "main-idea",
      prompt:
        "Which sentence best summarizes the central idea or arc of the passage?",
      options: [
        "A literacy coach is dismissed at the end of her first quarter for refusing to make her lessons more entertaining.",
        "A reading program collapses after the principal openly criticizes the new coach in front of her sixth-grade students.",
        "A literacy coach quietly defends slow, methodical work against early skepticism, trusting that the program's worth will be recognized by behavior — both her students' and her principal's — long before it is recognized by words.",
        "A school dramatically transforms its remedial program by adopting bright posters and group games at the principal's suggestion.",
      ],
      correctIndex: 2,
      explanation:
        "The arc traces Petra's decision to hold the line on careful, plodding instruction; her trust in the work to vindicate itself; and the principal's quieter second visit as the first real sign that it is doing so.",
    },
  ],
};

const MISSION_6_SET_1: SetReading = {
  title: "The Curator's Long Apprenticeship",
  subtitle:
    "A short story about a museum, a difficult mentor, and an attribution nobody wanted to revisit.",
  format: "Short Story",
  readingMinutes: 4,
  words: [
    "admonish",
    "aesthetic",
    "affectation",
    "alleviate",
    "analogous",
    "bolster",
    "chauvinistic",
    "connoisseur",
    "dissemble",
    "dogged",
  ],
  passage: `For the first eight months at the Lavanesi Museum of Decorative Arts, the new junior curator Mira Aldecoa had been shadowed, almost daily, by her department head — a small, exacting woman named Dr. Tovias who had a reputation, in the staff cafeteria, for being severe enough to **admonish** an apprentice for the angle at which they held a clipboard. The reputation was not entirely false. But Mira had also come to understand, in her first month, that Dr. Tovias's strictness was less personal than pedagogical: she was not unkind, exactly, but she would not pretend to a friendliness she did not feel.

The museum specialized in eighteenth-century European furniture and ceramics. Dr. Tovias was, by general acknowledgment, the leading European **connoisseur** of one particularly fine but unsigned set of marquetry tables made in a small workshop outside Lyon. Her judgments were treated, in scholarly journals, as nearly oracular.

Mira's first independent task, that autumn, was a small one: to draft a wall label for a single side table the museum had owned, uncontroversially, for forty years. The piece was lovely — its inlay was an unusually quiet **aesthetic** that paired walnut and pale satinwood without ornament — and the existing label had stood, without amendment, since the year of its acquisition.

It was while comparing the table's underside to two **analogous** pieces in the museum's storage that Mira noticed something she could not unsee. The dovetailing on the table did not match the workshop pattern Dr. Tovias herself had documented in her famous 1996 article. It matched, instead, a slightly later — and considerably less prestigious — workshop on the other side of the river.

She spent two weeks looking for ways to be wrong. She measured the joints; she compared photographs; she read everything in the library that might **alleviate** her doubt. None of it did.

The other voice in the building Mira had to consider was a senior conservator named Verdun — a man famously **chauvinistic** about the museum's own collection, who reviewed every external loan request as though the integrity of the building personally depended on his rejection of it. If Mira's note traveled the wrong corridor, Verdun would treat it not as scholarship but as betrayal.

There was, accordingly, an obvious cowardice available to her. The label had stood for forty years; no visitor would notice; she could simply submit her draft unchanged. To raise the question would be to challenge the most respected scholar in her own building, on a piece she had been trusted with for less than a season. She knew, too, how easy it would be to **dissemble** — to mention "minor discrepancies" in a margin note, to leave the conclusion implicit, to let the question float politely past the people who would have to act on it.

But she suspected Dr. Tovias would notice the floating, and she suspected her senior would interpret the **affectation** of caution exactly for what it was. The whole point of the apprenticeship, she had begun to realize, was not to **bolster** her confidence with easy successes; it was to test whether she could file the difficult note when no one had asked her to.

She wrote a single page. It was not accusatory. It contained the measurements, the photographs, and a careful sentence noting that her observations did not match Dr. Tovias's published pattern. She did not propose a reattribution. She proposed only that the existing one be reviewed.

She handed it to Dr. Tovias on a Thursday afternoon. The older woman read it for a long time, then set it on her desk without comment. Mira left the office not knowing, that day, whether she had been **dogged** in the right way or merely impertinent.

The reply came on Monday. It was three lines. The first thanked her for her care. The second confirmed that the matter would be reviewed by an external panel. The third, which Mira read twice, said only: "Continue."`,
  questions: [
    {
      id: 1,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "connoisseur" most nearly means:',
      quote:
        '"Dr. Tovias was, by general acknowledgment, the leading European connoisseur of one particularly fine but unsigned set of marquetry tables..."',
      options: [
        "A formal critic employed by a museum to write reviews.",
        "An expert judge in matters of taste, especially in a refined area such as art.",
        "An auctioneer who sets the prices of fine objects.",
        "A wealthy collector who owns rare pieces.",
      ],
      correctIndex: 1,
      explanation:
        'A "connoisseur" is an expert judge of taste in a refined field. The passage emphasizes Dr. Tovias\'s scholarly authority — her judgments are treated as "nearly oracular."',
    },
    {
      id: 2,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "dissemble" most nearly means:',
      quote:
        '"...how easy it would be to dissemble — to mention \'minor discrepancies\' in a margin note, to leave the conclusion implicit..."',
      options: [
        "To take apart and analyze in detail.",
        "To conceal one\'s true thoughts or feelings; to disguise the real meaning.",
        "To correct an error openly and immediately.",
        "To formally disagree in a meeting.",
      ],
      correctIndex: 1,
      explanation:
        'To "dissemble" is to disguise — to hide the real point under polite vagueness. The dashes spell out the technique: floating the conclusion past the reader.',
    },
    {
      id: 3,
      kind: "tone-purpose",
      prompt:
        'The narrator describes Verdun as "chauvinistic" about the museum\'s own collection. Why use "chauvinistic" rather than just "protective"?',
      options: [
        '"Chauvinistic" and "protective" are exact synonyms; the choice is purely decorative.',
        '"Chauvinistic" carries a sense of aggressive, biased loyalty to one\'s own group — fitting a conservator who treats outside attributions as personal threats rather than as scholarship.',
        '"Chauvinistic" refers specifically to military service and is unrelated to museums.',
        '"Chauvinistic" implies financial corruption, while "protective" would imply concern.',
      ],
      correctIndex: 1,
      explanation:
        '"Chauvinistic" describes biased, almost belligerent loyalty to one\'s own group. The passage shows Verdun reviewing loan requests as if his rejection of them is the building\'s defense.',
    },
    {
      id: 4,
      kind: "inference",
      prompt:
        "Based on the passage, what can the reader most reasonably infer about why Mira ultimately writes the careful single-page note?",
      options: [
        "She is hoping to discredit Dr. Tovias and replace her as the senior scholar.",
        "She has been ordered by Verdun to challenge Dr. Tovias's published work.",
        "She recognizes that the apprenticeship is testing whether she will file a difficult note when no one asks her to, and that polite vagueness would be visible to her mentor as exactly the affectation it would be.",
        "She believes the wall label has been deliberately falsified by a previous curator.",
      ],
      correctIndex: 2,
      explanation:
        "The passage says directly that the apprenticeship is meant to test her courage on hard cases — and that Dr. Tovias would see through any softening of the question.",
    },
    {
      id: 5,
      kind: "substitution",
      prompt:
        'Which single word could replace "dogged" in the sentence below without changing its meaning?',
      quote:
        '"Mira left the office not knowing, that day, whether she had been dogged in the right way or merely impertinent."',
      options: [
        "Lazy",
        "Tenacious",
        "Apologetic",
        "Reckless",
      ],
      correctIndex: 1,
      explanation:
        '"Tenacious" — persistently determined — captures "dogged." The other options point in the wrong direction.',
    },
    {
      id: 6,
      kind: "main-idea",
      prompt:
        "Which sentence best summarizes the central idea or arc of the passage?",
      options: [
        "A junior curator publicly humiliates her mentor by exposing a forty-year-old mistake during a press conference.",
        "A young curator, faced with a quiet attribution problem on a long-trusted piece, files a careful, evidence-led note rather than dissembling — and is recognized for doing so.",
        "A museum dismisses an apprentice for questioning the authority of its most respected scholar in her first season.",
        "Two senior conservators feud over a side table while a junior curator stays out of the dispute.",
      ],
      correctIndex: 1,
      explanation:
        "The arc traces Mira's discovery, her temptation to soften, her decision to write a careful page, and Dr. Tovias's measured one-word reply.",
    },
  ],
};

const MISSION_6_SET_2: SetReading = {
  title: "The Reviewer's Friday",
  subtitle:
    "A short story about a peer review, a suspicious dataset, and a long weekend in academic ethics.",
  format: "Short Story",
  readingMinutes: 4,
  words: [
    "dupe",
    "empirical",
    "engender",
    "entitled",
    "pertinacious",
    "presumptuous",
    "probity",
    "proliferate",
    "specious",
    "spurious",
  ],
  passage: `When the manuscript landed in her inbox at 4:47 on a Friday afternoon, Dr. Selene Voronkova made the small, automatic noise that mid-career professors make when they realize the weekend has just been claimed by something they did not ask for. The paper was unsolicited but not unexpected: she had been a quiet, **pertinacious** voice on her field's editorial board for eleven years, and the editor — fairly or not — had begun routing the difficult papers her way.

This one was titled, with characteristic confidence, *Definitive Empirical Evidence for the Calenza Effect in Cross-Border Trade*. Its claims were extraordinary; its appendix was thin; its corresponding author was a young researcher she did not know, at an institution she did not recognize.

She read the abstract twice and reached for tea.

By page four she had begun to suspect that the paper was not merely overconfident but actively **specious**. The argument moved quickly past three places where it should have slowed; the figures, on close inspection, were drawn at scales that flattered the strongest result and obscured the weakest; and the dataset, which the authors described as "newly compiled," was — she realized at the bottom of page seven — almost certainly a relabeling of a publicly available 2019 panel that her own department had used the previous spring.

The relabeling was the part that made her sit back.

To label something as "newly compiled" when it was not was, in her field, a **spurious** claim with real consequences. Other researchers would cite it; **empirical** debate would form around findings that rested on a foundation no one had checked, because the authors had implied it was new.

By Saturday morning she had laid the original 2019 dataset and the manuscript's appendix side by side on her dining-room table. The match, with two small renumberings, was nearly exact. The reframing — calling the dataset new, claiming credit for its compilation — would have **engendered** a paper that, on the strength of that single misrepresentation, could **proliferate** through the citation networks for years.

She drafted her review on Sunday.

The hard part was not the technical objection, which would write itself. The hard part was the tone. A junior author misled by a careless co-author was a different problem from a deliberate **dupe** of the journal's review process, and Dr. Voronkova had learned, the long way, not to engender more enmity than the case required.

She allowed herself one direct sentence: *The dataset described in the appendix as "newly compiled" appears to be a relabeling of the publicly available 2019 Calenza panel. The authors should clarify, with citation and acknowledgement, before any further review.*

The rest of the review was, as it should have been, a careful reconstruction of which sentences in the abstract would not survive that clarification.

She submitted it on Sunday night.

What surprised her was the response. The corresponding author, far from being **entitled** about the challenge, replied within twenty-four hours with a long, plainly contrite note acknowledging that the dataset description had been written by a senior co-author whose **probity** he had been too junior to question. He withdrew the paper himself, by Tuesday, and asked Dr. Voronkova whether she would consider, at her convenience, sitting on the small internal committee his university was now convening to review the senior co-author's broader record.

She did not answer immediately. It was not a **presumptuous** request — it was, in fact, brave of him to make — but it was also exactly the kind of obligation that, multiplied across eleven years, had once nearly burned her out.

In the end she said yes. She set the kettle on for tea.`,
  questions: [
    {
      id: 1,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "specious" most nearly means:',
      quote:
        '"By page four she had begun to suspect that the paper was not merely overconfident but actively specious."',
      options: [
        "Carefully accurate and conservative.",
        "Superficially plausible but actually wrong or misleading.",
        "Written in an unfamiliar technical language.",
        "Overly long and repetitive.",
      ],
      correctIndex: 1,
      explanation:
        '"Specious" describes an argument that looks convincing on the surface but does not hold up — exactly what the next sentences proceed to demonstrate.',
    },
    {
      id: 2,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "probity" most nearly means:',
      quote:
        '"...the dataset description had been written by a senior co-author whose probity he had been too junior to question."',
      options: [
        "Technical expertise in statistics.",
        "Strong moral integrity; honesty.",
        "Personal charm and charisma.",
        "Public reputation and fame.",
      ],
      correctIndex: 1,
      explanation:
        '"Probity" denotes moral integrity. The junior author had taken the senior\'s honesty for granted in a way he had not yet earned the standing to challenge.',
    },
    {
      id: 3,
      kind: "tone-purpose",
      prompt:
        'The narrator calls Dr. Voronkova a "pertinacious" voice on the editorial board. Why use "pertinacious" rather than simply "persistent"?',
      options: [
        '"Pertinacious" and "persistent" are exact synonyms; the choice is purely stylistic.',
        '"Pertinacious" carries a sense of stubborn, almost obstinate persistence — explaining both why difficult papers are routed to her and why she does not give them up easily.',
        '"Pertinacious" implies a hostile or aggressive temperament, the opposite of what the passage portrays.',
        '"Pertinacious" specifies that her work is unpaid, while "persistent" would imply she is paid.',
      ],
      correctIndex: 1,
      explanation:
        '"Pertinacious" is a sharper word than "persistent" — it implies a steady, unyielding determination, which is why the editor has come to trust her with the hard papers.',
    },
    {
      id: 4,
      kind: "inference",
      prompt:
        "Based on the passage, what can the reader most reasonably infer about why Dr. Voronkova writes a measured, technical objection rather than an open accusation?",
      options: [
        "She is afraid that an accusation could end her own academic career.",
        "She wants to take credit for discovering the misrepresentation by writing softly enough that the editor will not notice the seriousness.",
        "She recognizes that a junior author misled by a senior co-author is a different case from a deliberate fraud, and that an unnecessarily hostile review would create more enmity than the situation requires.",
        "She is too tired by Sunday night to write anything stronger than a brief technical note.",
      ],
      correctIndex: 2,
      explanation:
        "The passage explicitly contrasts a misled junior with a deliberate dupe and notes her hard-won lesson not to engender more enmity than the case requires.",
    },
    {
      id: 5,
      kind: "substitution",
      prompt:
        'Which single word could replace "entitled" in the sentence below without changing its meaning?',
      quote:
        '"The corresponding author, far from being entitled about the challenge, replied within twenty-four hours with a long, plainly contrite note..."',
      options: [
        "Humble",
        "Privileged",
        "Apologetic",
        "Forgetful",
      ],
      correctIndex: 1,
      explanation:
        '"Privileged" — believing oneself owed special treatment — captures "entitled" in this sense. "Humble" is the opposite, which the sentence rules out with "far from being."',
    },
    {
      id: 6,
      kind: "main-idea",
      prompt:
        "Which sentence best summarizes the central idea or arc of the passage?",
      options: [
        "A peer reviewer rejects a paper publicly and writes an open letter calling out the corresponding author for fraud.",
        "An exhausted reviewer accepts a misleading paper because she does not have the energy to write a full critique over the weekend.",
        "A reviewer identifies a misrepresented dataset, writes a measured technical objection rather than an accusation, and finds her care reciprocated by a junior author who withdraws the paper and asks for her help.",
        "An editorial board punishes a senior researcher by routing all of his papers to one particular reviewer for years.",
      ],
      correctIndex: 2,
      explanation:
        "The arc moves from the suspicious manuscript, through Voronkova's deliberate weighing of tone, to the junior author's unexpected and earnest withdrawal.",
    },
  ],
};

const MISSION_6_SET_3: SetReading = {
  title: "The Town and the Two Files",
  subtitle:
    "A short story about a small courthouse, an unmarked folder, and a young defender's first refusal to look away.",
  format: "Short Story",
  readingMinutes: 4,
  words: [
    "subjective",
    "subvert",
    "timorous",
    "tortuous",
    "tractable",
    "transient",
    "ubiquitous",
    "underscore",
    "venal",
    "venerate",
  ],
  passage: `In the seventeen weeks since Esra Demir had been hired as the county's newest public defender, she had developed a quiet, almost methodical habit of pinning a single typed quotation above her desk for each case file she opened. Most weeks the quotations were, in retrospect, faintly embarrassing. They were the small ceremonies, she had decided, of a young lawyer who needed to **underscore** for herself, in plain language, what the work was for.

The town she had moved to was the kind of place where people **venerated** the small, dignified courthouse on the square the way other towns venerated their cathedrals. It was a beautiful building. It was also, she had begun to suspect by her sixth week, a building inside which a few quiet, **ubiquitous** assumptions did much of the actual deciding before any judge sat down.

The case that finally made the assumptions visible to her was, on its surface, almost trivial. A man named Halbert Rooke had been arrested for a small property offense. The evidence against him was thin; the prosecution's witness was unreliable; and any competent first-year defender, in a normal jurisdiction, would have moved for dismissal in a single afternoon.

Esra was not yet competent in the local sense — which was, she had come to understand, a different competence entirely. She filed the motion. She was politely told, by an older defender she liked, that the motion was technically correct and unlikely to succeed before this particular bench.

He did not, of course, say why. He gave her the smile of a man who had spent twenty years in this courthouse and had decided, somewhere along the way, that being usefully **tractable** was preferable to being correctly stubborn.

That afternoon, in the file room, Esra found two folders for the same defendant.

One was the routine prosecution file. The other, much thinner, was unmarked. Inside, in a hand she did not recognize, was a single folded note describing — in cautious, almost **timorous** language — a previous interaction between Mr. Rooke and a local business owner whose own son worked in the district attorney's office.

The note did not name anyone explicitly. It did not need to.

Esra stood in the file room for a long time. The path forward was not technical; it was a question about which kind of lawyer she intended to become. Her instinct, on a **subjective** reading of the note, was that the prosecution's interest in this small case was less in the alleged offense than in a private grievance. To act on that instinct would be to formally suggest that something **venal** had quietly shaped a docket the courthouse pretended was neutral.

She took her time. The conversation she would have to have with the chief defender would be **tortuous** — full of careful turnings, of qualifications she would have to refine on the spot — and any version that came across as melodramatic would, she knew, **subvert** her own credibility long before it touched anyone else's.

What she did, in the end, was small and exact. She drafted a brief asking the court to make a particular ancillary record public. The brief did not accuse. It did not insinuate. It merely asked the court to release information that, under the jurisdiction's transparency rules, the defense was entitled to see.

The chief defender called her into his office that evening. He read the brief twice. He set it down. He told her, in the same tone the older defender had used at lunch, that the motion was technically correct and that its consequences in this particular building would not be **transient**.

He filed it the next morning.`,
  questions: [
    {
      id: 1,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "ubiquitous" most nearly means:',
      quote:
        '"...a building inside which a few quiet, ubiquitous assumptions did much of the actual deciding before any judge sat down."',
      options: [
        "Rare and almost forgotten.",
        "Present, appearing, or operating everywhere.",
        "Loudly stated and openly debated.",
        "Officially recorded in the courthouse rules.",
      ],
      correctIndex: 1,
      explanation:
        '"Ubiquitous" means present everywhere. The assumptions are everywhere in the building precisely because no one names them aloud.',
    },
    {
      id: 2,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "venal" most nearly means:',
      quote:
        '"To act on that instinct would be to formally suggest that something venal had quietly shaped a docket the courthouse pretended was neutral."',
      options: [
        "Carefully impartial and lawful.",
        "Susceptible to bribery; motivated by improper financial or personal gain.",
        "Slightly outdated but still legally valid.",
        "Extremely complicated to understand.",
      ],
      correctIndex: 1,
      explanation:
        '"Venal" describes corruptibility — the kind of private interest that, in this story, has shaped which thin cases get pursued and which do not.',
    },
    {
      id: 3,
      kind: "tone-purpose",
      prompt:
        'The narrator says people in the town "venerated" the courthouse. Why "venerated" rather than "respected"?',
      options: [
        '"Venerated" and "respected" mean exactly the same thing; the choice is purely decorative.',
        '"Venerated" carries a near-religious sense of reverence — and the explicit comparison to a cathedral makes the irony clear, since the building harbors quiet practices the town would not openly approve of.',
        '"Venerated" implies the courthouse is older than any cathedral in the area, which is its main historical fact.',
        '"Venerated" specifies that the courthouse is funded by donations rather than taxes.',
      ],
      correctIndex: 1,
      explanation:
        '"Venerated" carries the weight of religious reverence. Pairing it with the cathedral comparison sharpens the gap between the town\'s public reverence and the building\'s private compromises.',
    },
    {
      id: 4,
      kind: "inference",
      prompt:
        "Based on the passage, what can the reader most reasonably infer about why Esra files a narrow transparency motion rather than openly accusing the prosecution of a private grievance?",
      options: [
        "She has not yet read enough of the unmarked file to be confident in any accusation.",
        "She believes the chief defender will fire her if she files anything more aggressive in her first months.",
        "She recognizes that any accusation she could not yet substantiate would undermine her own credibility long before it touched the system, and that a procedural request is the cleanest way to surface what should not have been hidden.",
        "She is hoping the prosecution will quietly drop the case if she stays out of the politics entirely.",
      ],
      correctIndex: 2,
      explanation:
        "The passage states directly that any version of the conversation that came across as melodramatic would subvert her own credibility — a procedural request lets the system reveal what it has been hiding.",
    },
    {
      id: 5,
      kind: "substitution",
      prompt:
        'Which single word could replace "timorous" in the sentence below without changing its meaning?',
      quote:
        '"...a single folded note describing — in cautious, almost timorous language — a previous interaction between Mr. Rooke and a local business owner..."',
      options: [
        "Boastful",
        "Fearful",
        "Cheerful",
        "Sarcastic",
      ],
      correctIndex: 1,
      explanation:
        '"Fearful" — marked by nervous, hesitant caution — captures "timorous." The other options reverse or change the tone of the note.',
    },
    {
      id: 6,
      kind: "main-idea",
      prompt:
        "Which sentence best summarizes the central idea or arc of the passage?",
      options: [
        "A young defender wins a high-profile dismissal in her first months by publicly naming a corrupt district attorney during a press conference.",
        "A young public defender, recognizing how a small case has been quietly shaped by interests outside the file, files a narrow procedural motion that lets the courthouse surface the truth without melodrama.",
        "A senior defender warns a new colleague to stop filing motions and accept the way the local courthouse has always operated.",
        "A small-town courthouse uncovers a corruption scheme entirely on its own and asks Esra to help draft a public report.",
      ],
      correctIndex: 1,
      explanation:
        "The arc tracks Esra's discovery of the two folders, her careful weighing of credibility, and her decision to file a narrow, procedurally exact request that does the necessary work without overreach.",
    },
  ],
};

const MISSION_7_SET_1: SetReading = {
  title: "The Branch on Eaton Avenue",
  subtitle:
    "A short story about a small library, a budget vote, and the difference between loud opinions and good ones.",
  format: "Short Story",
  readingMinutes: 4,
  words: [
    "appease",
    "arbitrary",
    "archaic",
    "clamorous",
    "dearth",
    "explicable",
    "hyperbole",
    "immutable",
    "indefatigable",
    "indolent",
  ],
  passage: `When the city council voted, in early March, to cut the operating budget of the Eaton Avenue Branch Library by thirty-eight percent, the head librarian — a slow-spoken woman named Consuela Ailes — did not, as several of her younger colleagues expected, immediately call the public meeting that the library's regulations entitled her to call. She walked, instead, to the back office, sat down with the budget, and read it three times before she let herself feel anything about it.

Her senior assistant, Pell, had a different temperament. He spent that evening in the staff room arguing, with a kind of generous **hyperbole**, that the council had effectively voted to close the branch by half measures, and that nothing short of a packed-room community protest would force a reconsideration. Pell was not wrong about the arithmetic. He was not, perhaps, quite right about the rest.

Consuela had been a librarian for thirty-one years. She had seen this particular cycle before. The cycle, in her experience, ran roughly as follows: a council made a budget decision that looked **arbitrary** to the people it affected; an **indefatigable** organizer mobilized a **clamorous** crowd; the council, embarrassed in public, restored a token portion of the cut; and the underlying disagreement — about what a branch library was *for* — went unresolved for another two years.

She did not want a token. She wanted, this time, a real conversation.

She read the cut again on the second morning. It had a clear internal logic, even if she disagreed with it. The council had used three years of door-count data to argue that Eaton Avenue served, on average, fewer patrons per open hour than any other branch in the system. The data was real. The conclusion the council had drawn from it — that fewer patrons meant fewer hours warranted — was also, she had to admit, not entirely **explicable** away.

Where the council was wrong, she believed, was in treating the door-count number as if it were **immutable**. The branch had been quiet for three years for reasons she could name: a temporary closure of the bus line that brought the elderly patrons; a school redistricting that had moved the after-school children to a different building; an **archaic** opening schedule that had stayed on paper long after the neighborhood's working hours had shifted. None of those reasons were the library's fault, exactly. None of them were permanent, either.

She asked Pell to come into her office on the third morning.

She did not ask him to abandon the protest. She asked him, instead, to delay it by two weeks. In those two weeks, she said, she wanted the staff to assemble what she called a "patron-hour memorandum" — a single document, no more than ten pages, showing the council exactly which underlying conditions had produced the door-count number and which of them were already changing. The memorandum would not **appease** the council; it would simply give the council something concrete to argue with, instead of a chant.

Pell was, briefly, suspicious. The slow approach, he said, had a long history of being used by **indolent** institutions to wait out their critics. He was not wrong about that, either. But he agreed, after a pause, to the two weeks.

The memorandum was finished, six staff members and a long Saturday later, on the fourteenth day. It was nine pages. It was not eloquent. It was, however, the kind of document that was difficult to argue with on a single reading, which meant the council, when it received it, was forced to schedule a working session rather than a vote.

The protest, when it eventually happened, happened anyway. But it happened with the memorandum in every councillor's hand — and it was, for the first time in Consuela's memory, not the loudest argument in the room. The branch kept twenty-nine of its thirty-eight percent.

Pell brought Consuela coffee that evening without being asked. They drank it in the staff room. Neither of them said the word "victory." The **dearth** of it, in the conversation, was perhaps the most honest thing about the day.`,
  questions: [
    {
      id: 1,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "hyperbole" most nearly means:',
      quote:
        '"He spent that evening in the staff room arguing, with a kind of generous hyperbole, that the council had effectively voted to close the branch by half measures..."',
      options: [
        "A precise, narrowly accurate description.",
        "An exaggerated statement or claim not meant to be taken literally.",
        "A formal complaint filed in writing.",
        "A neutral summary of facts.",
      ],
      correctIndex: 1,
      explanation:
        '"Hyperbole" denotes deliberate exaggeration. Pell\'s "voted to close the branch" overstates a thirty-eight-percent cut, which the narrator notes is good arithmetic but not quite right.',
    },
    {
      id: 2,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "immutable" most nearly means:',
      quote:
        '"Where the council was wrong, she believed, was in treating the door-count number as if it were immutable."',
      options: [
        "Highly classified and confidential.",
        "Unchanging and incapable of being altered.",
        "Slightly inaccurate but still useful.",
        "Recorded only on paper rather than digitally.",
      ],
      correctIndex: 1,
      explanation:
        '"Immutable" describes something that cannot change. Consuela\'s point is that the door-count number is a product of changing conditions she can name — bus routes, school zoning, opening hours.',
    },
    {
      id: 3,
      kind: "tone-purpose",
      prompt:
        'The narrator says the cut "looked arbitrary" to the people it affected. Why use "arbitrary" rather than simply "unfair"?',
      options: [
        '"Arbitrary" and "unfair" are exact synonyms; the choice is purely stylistic.',
        '"Arbitrary" specifies that decisions appear to be made by personal whim rather than by reason — exactly the appearance Consuela then refuses to leave unchallenged with her memorandum.',
        '"Arbitrary" implies an illegal decision, which is what Consuela ultimately proves.',
        '"Arbitrary" means "made by a single person," and Pell is the one who actually made the cut.',
      ],
      correctIndex: 1,
      explanation:
        '"Arbitrary" captures the look of a decision made by whim — and the memorandum reframes the cut as the council\'s reasoned reading of one specific number, which gives the conversation a real footing.',
    },
    {
      id: 4,
      kind: "inference",
      prompt:
        "Based on the passage, what can the reader most reasonably infer about why Consuela asks Pell to delay the protest by two weeks?",
      options: [
        "She has been told privately by a council member that the cut will be reversed if no public protest is held.",
        "She is hoping that public attention will fade and that the council will simply forget about the cut.",
        "She has seen the protest-and-token cycle play out before and wants to give the council a concrete document to argue with, rather than just a chant, so the underlying disagreement can be addressed.",
        "She believes Pell is too inexperienced to organize a successful protest and wants more time to coach him.",
      ],
      correctIndex: 2,
      explanation:
        "The passage explicitly traces the cycle Consuela has seen and explains that the memorandum is meant to give the council something concrete to argue with instead of a chant.",
    },
    {
      id: 5,
      kind: "substitution",
      prompt:
        'Which single word could replace "indolent" in the sentence below without changing its meaning?',
      quote:
        '"The slow approach, he said, had a long history of being used by indolent institutions to wait out their critics."',
      options: [
        "Energetic",
        "Lazy",
        "Honest",
        "Modern",
      ],
      correctIndex: 1,
      explanation:
        '"Lazy" — wanting to avoid effort — captures "indolent." Pell\'s worry is precisely that the slow approach can be a cover for inaction.',
    },
    {
      id: 6,
      kind: "main-idea",
      prompt:
        "Which sentence best summarizes the central idea or arc of the passage?",
      options: [
        "An angry community protest forces a city council to reverse a budget cut entirely on the night of the meeting.",
        "A junior librarian leads a public campaign while the head librarian refuses to help, and the branch is closed within a year.",
        "A senior librarian, instead of leading an immediate protest against a budget cut, builds an evidence-based memorandum that reframes the public debate and recovers most of the lost funding.",
        "A city council quietly restores a library's budget after discovering that its own door-count data was incorrect.",
      ],
      correctIndex: 2,
      explanation:
        "The arc tracks Consuela's deliberate decision to slow Pell's protest, build the memorandum, and let it carry the eventual public moment.",
    },
  ],
};

const MISSION_7_SET_2: SetReading = {
  title: "Three Weeks at the Verdant Council",
  subtitle:
    "A short story about a trade association, a careful beat reporter, and the patience required to write a fair piece.",
  format: "Short Story",
  readingMinutes: 4,
  words: [
    "insular",
    "intransigent",
    "intrepid",
    "irreverent",
    "loathe",
    "malign",
    "malleable",
    "neophyte",
    "plastic",
    "platitude",
  ],
  passage: `The first thing the Verdant Council's communications director said to Hala Mariéssen, when she arrived for the agreed three-week observation, was that he hoped she was not the kind of reporter who arrived with the headline already written. He said it pleasantly, with practiced timing — the kind of opening sentence Hala had heard, in some form, on thirty similar visits, and which she had long since learned not to take personally.

She was, in fact, not that kind of reporter. She was also not — she had to remind herself, on the first morning — a **neophyte**, even though the council's senior members were going to treat her as one, simply because she was the only person in the room under forty.

The Verdant Council was a regional trade association of about two hundred member firms in the specialty timber industry. The council had a reputation — fairly or not — for being **insular**: a closed circle of family-owned businesses that distrusted outside scrutiny, that **loathed** the trade press in particular, and that had been, for as long as anyone outside the industry could remember, **intransigent** about disclosing even basic operating data to non-members.

Her editor's instructions had been short. He wanted neither a hagiography nor an exposé. He wanted a piece that would describe how the council actually worked. Whether what she found ultimately reflected well on the council was not, he said, her problem to predetermine.

The first week was, predictably, performative. The senior members had clearly agreed in advance which version of themselves the council would present. Their answers fell into a small number of well-rehearsed shapes: the **platitude** about "shared regional values," the careful deflection about "proprietary methods," the slightly **irreverent** joke about "the press" delivered with a smile that asked her to laugh along. She laughed when it was warranted and made no notes that anyone could see.

The second week was where the reporting actually began. By then some council members had begun to forget she was there. She watched a procurement meeting in which the chair, a woman named Voss, was, by any honest measure, **intrepid**: she pushed back against a long-standing supplier on a contract clause that nobody else in the room had been willing to question for, by the supplier's own admission, eleven years. Hala wrote that down exactly as it happened.

She also watched, the following afternoon, a back-corridor conversation in which a different senior member spoke about a regulator in terms it would have been easy, and inaccurate, to use to **malign** him in a single quoted sentence. It was the kind of moment a less careful reporter would have built a paragraph around. Hala did not. The full conversation, when she replayed her notes that night, was clearly the venting of a tired man at the end of a long week, not the institutional position of the council. She left it out.

The third week was the hardest. By then she had enough material to write three different pieces — a flattering one, a damning one, and the more **malleable**, more honest piece somewhere in the middle that would satisfy neither the council's communications director nor the readers who had been hoping for a scandal. The middle piece was the one her editor wanted. It was also, she suspected, the one her own reputation in this beat would survive on for the next decade.

She did not write the **plastic** version of the council's leadership that the communications director, in their final interview, kept gently nudging her toward. She wrote, instead, the version her notes supported. The council's response, a week after the article ran, was a single line: *We disagree with several characterizations and have no further comment.*

It was, she felt, the closest thing to a compliment the council had ever paid a reporter.`,
  questions: [
    {
      id: 1,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "insular" most nearly means:',
      quote:
        '"The council had a reputation — fairly or not — for being insular: a closed circle of family-owned businesses that distrusted outside scrutiny..."',
      options: [
        "Concerned with national rather than local issues.",
        "Closed off from and uninterested in cultures or perspectives outside one\'s own.",
        "Heavily insulated against financial losses.",
        "Strictly governed by written rules.",
      ],
      correctIndex: 1,
      explanation:
        '"Insular" describes a group cut off from the world outside its own circle — exactly the closed quality the colon spells out.',
    },
    {
      id: 2,
      kind: "vocab-context",
      prompt: 'In this sentence, the verb "malign" most nearly means:',
      quote:
        '"...a different senior member spoke about a regulator in terms it would have been easy, and inaccurate, to use to malign him in a single quoted sentence."',
      options: [
        "To formally cross-examine in a hearing.",
        "To speak about someone in a spitefully critical or unfair way.",
        "To compliment in an exaggerated manner.",
        "To explain a position carefully.",
      ],
      correctIndex: 1,
      explanation:
        '"Malign" means to speak unfairly ill of someone. Hala notices that the easy quote would have done that — and would have been inaccurate — so she leaves it out.',
    },
    {
      id: 3,
      kind: "tone-purpose",
      prompt:
        'The narrator describes some answers as "the platitude about \'shared regional values.\'" Why use "platitude" rather than simply "phrase"?',
      options: [
        '"Platitude" and "phrase" are exact synonyms; the choice is purely decorative.',
        '"Platitude" carries the sense of a trite, unoriginal remark uttered as if profound — exactly the rehearsed, content-free quality of the council\'s first-week answers.',
        '"Platitude" specifies that the answers were rehearsed in writing rather than spoken.',
        '"Platitude" means a sentence taken from a contract; here it refers to the actual council bylaws.',
      ],
      correctIndex: 1,
      explanation:
        '"Platitude" sharpens the picture: not just a phrase, but a tired one offered with the appearance of substance. It frames why the first week\'s reporting yielded so little.',
    },
    {
      id: 4,
      kind: "inference",
      prompt:
        "Based on the passage, what can the reader most reasonably infer about why Hala leaves the back-corridor conversation out of her piece?",
      options: [
        "The communications director told her in advance that any back-corridor material would be off the record.",
        "She did not have a clean recording of the conversation and could not verify the exact wording.",
        "She judges, after replaying her notes, that the conversation was personal venting at the end of a long week rather than the institutional position of the council, so quoting it would have been easy and inaccurate.",
        "Her editor specifically forbade her from including any conversations involving regulators.",
      ],
      correctIndex: 2,
      explanation:
        "The passage states this directly: replaying her notes, Hala recognizes the conversation as venting, not policy, and decides that the easy quote would have been inaccurate.",
    },
    {
      id: 5,
      kind: "substitution",
      prompt:
        'Which single word could replace "intrepid" in the sentence below without changing its meaning?',
      quote:
        '"...the chair, a woman named Voss, was, by any honest measure, intrepid: she pushed back against a long-standing supplier on a contract clause..."',
      options: [
        "Hesitant",
        "Fearless",
        "Indifferent",
        "Apologetic",
      ],
      correctIndex: 1,
      explanation:
        '"Fearless" — willing to act in the face of resistance — captures "intrepid." The other options reverse the sentence\'s meaning.',
    },
    {
      id: 6,
      kind: "main-idea",
      prompt:
        "Which sentence best summarizes the central idea or arc of the passage?",
      options: [
        "An ambitious reporter publishes a damning exposé of a closed industry council and is barred from the trade beat.",
        "A reporter, given three weeks inside a closed trade council, resists writing either the flattering or the damning version and produces a careful middle account that her notes actually support.",
        "A trade council successfully manipulates a young reporter into writing exactly the favorable piece its communications director wanted.",
        "A communications director coaches a council to deliver only platitudes during interviews so that no real reporting is possible.",
      ],
      correctIndex: 1,
      explanation:
        "The arc tracks Hala from the rehearsed first week through the unguarded second week to the hardest third week, where she chooses the honest middle piece over either easier version.",
    },
  ],
};

const MISSION_7_SET_3: SetReading = {
  title: "The Tributary Below the Mill",
  subtitle:
    "A short story about a field station, a quiet stream, and a season-long observation nobody else had made yet.",
  format: "Short Story",
  readingMinutes: 4,
  words: [
    "prescient",
    "pristine",
    "reproach",
    "robust",
    "salubrious",
    "sanction",
    "sedulous",
    "soporific",
    "stern",
    "tendentious",
  ],
  passage: `The Calbery Field Station, where Mateo Eluard had been placed for his second postdoctoral year, sat in a glacial valley about ninety minutes by gravel road from the nearest town. It was — by reputation, by photograph, and by the lazy testimony of every visiting committee that had ever filed a report on it — one of the most **pristine** small watersheds in the country. The director, an unsmiling man named Ivor Halst, had spent twenty-seven years protecting that reputation with the kind of quiet, **sedulous** care that made other field stations, in comparison, look unserious.

Mateo's task, that summer, was small and specific. He was to take weekly samples from the unnamed tributary that ran below the old mill at the south end of the valley, and to add a single line to the station's long-running database. Nothing about the tributary, in twenty years of recordkeeping, had ever been remarkable. The line he was expected to add, week after week, was expected to look very much like the line that had preceded it.

In his fourth week, the line did not look the same.

The numbers were not dramatic. They were, in fact, the kind of small upward drift that a less careful reader might have dismissed as instrument noise. Mateo recalibrated his probe, took the samples again on a different day, and got the same drift. He said nothing in the staff meeting that Friday.

He spent the next three Saturdays walking the tributary on foot. The valley was, in late July, almost aggressively **salubrious** — clean cold air, no flies, the sound of the stream the only thing in the silence — and the walking gave him time to think about what he was, and was not, prepared to claim. He found, on the third Saturday, a small seep he did not recognize, on the upslope side of the mill, that did not appear on any of the station's maps.

He brought the seep, and his four weeks of probe data, to Halst on a Monday morning.

Halst listened. Halst was, famously, **stern** in these conversations — a man who had **reproached** more than one previous postdoc for what he called "**tendentious** fieldwork," meaning data presented with a conclusion attached before the data justified it. Mateo had been warned about this in his very first week. He brought no conclusion. He brought a map, four data points, and a request — not a recommendation — that the seep be added to the next month's sampling rotation.

Halst read the page twice.

What he said, after a long pause, surprised the rest of the staff that afternoon. He told Mateo that the request was both **prescient** and overdue, and that the station would, with the institute's **sanction**, expand the sampling rotation to include the seep beginning the following Monday. He also said — and this was the part Mateo would replay later — that he had been waiting, for several years, for one of his postdocs to walk that particular slope on a Saturday and notice what Mateo had noticed. The fact that the previous five had not, he said, was less a comment on the seep than on the **soporific** effect of inheriting a database that had reported "no change" for two decades.

The new sampling, by October, had confirmed the drift. The seep, by December, had been traced to a slow seasonal infiltration from the old mill's long-decommissioned settling pond — a small, **robust** finding, neither alarming nor trivial, that would shape the station's next ten years of work on the tributary.

Mateo's name was the first on the resulting paper. Halst, who almost never accepted second authorship on anything originating at his station, accepted it on this one without comment.`,
  questions: [
    {
      id: 1,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "pristine" most nearly means:',
      quote:
        '"It was...one of the most pristine small watersheds in the country."',
      options: [
        "Heavily monitored by environmental regulators.",
        "In its original, unspoiled, and pure condition.",
        "Frequently visited by tourists.",
        "Used primarily for industrial purposes.",
      ],
      correctIndex: 1,
      explanation:
        '"Pristine" describes a place still in its untouched, original state — the reputation Halst has spent twenty-seven years protecting.',
    },
    {
      id: 2,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "sedulous" most nearly means:',
      quote:
        '"The director, an unsmiling man named Ivor Halst, had spent twenty-seven years protecting that reputation with the kind of quiet, sedulous care..."',
      options: [
        "Bored and inattentive.",
        "Showing dedication and steady diligence.",
        "Theatrical and showy.",
        "Frequently absent from his post.",
      ],
      correctIndex: 1,
      explanation:
        '"Sedulous" denotes diligent, persistent application — the unshowy, steady care Halst is known for.',
    },
    {
      id: 3,
      kind: "tone-purpose",
      prompt:
        'Halst is said to reproach previous postdocs for "tendentious fieldwork." Why does the narrator use "tendentious" rather than simply "biased"?',
      options: [
        '"Tendentious" and "biased" mean exactly the same thing; the choice is purely stylistic.',
        '"Tendentious" specifies fieldwork shaped by an agenda — data presented with a conclusion attached before the data justify it — which is precisely the fault Mateo is careful to avoid.',
        '"Tendentious" means "incomplete," and Halst is complaining that the previous postdocs did not finish their work.',
        '"Tendentious" implies criminal misconduct, which is why the previous postdocs were dismissed.',
      ],
      correctIndex: 1,
      explanation:
        '"Tendentious" sharpens the criticism: data marshaled to push a chosen conclusion. The narrator then shows Mateo bringing data, a map, and a request — but no conclusion.',
    },
    {
      id: 4,
      kind: "inference",
      prompt:
        "Based on the passage, what can the reader most reasonably infer about why Mateo presents Halst with \"a request, not a recommendation\"?",
      options: [
        "Station policy specifically prohibits postdocs from making formal recommendations to the director.",
        "He has not yet collected enough data to know whether the seep is significant and so cannot honestly recommend anything.",
        "He has learned that Halst rejects fieldwork that arrives with conclusions already attached, so framing the matter as a procedural request lets the data be evaluated on its own terms.",
        "He is hoping to share authorship on the eventual paper and believes a request rather than a recommendation strengthens that claim.",
      ],
      correctIndex: 2,
      explanation:
        "The passage emphasizes Halst's complaint about \"tendentious fieldwork\" and immediately notes that Mateo brought no conclusion — only a map, four data points, and the request to expand sampling.",
    },
    {
      id: 5,
      kind: "substitution",
      prompt:
        'Which single word could replace "stern" in the sentence below without changing its meaning?',
      quote: '"Halst was, famously, stern in these conversations..."',
      options: [
        "Lenient",
        "Severe",
        "Distracted",
        "Apologetic",
      ],
      correctIndex: 1,
      explanation:
        '"Severe" — serious and unrelenting — captures "stern." The other options change or reverse the sentence\'s meaning.',
    },
    {
      id: 6,
      kind: "main-idea",
      prompt:
        "Which sentence best summarizes the central idea or arc of the passage?",
      options: [
        "A postdoc discovers a major contamination event and forces the field station to issue an emergency public warning within a week.",
        "A field station director punishes a postdoc for noticing a small drift in the data that turns out, on review, to be instrument noise.",
        "A careful postdoc identifies a small, unexplained drift in the data, walks the watershed on his own time to understand it, and presents his finding without overclaiming, leading to a meaningful reshaping of the station's work.",
        "A field station, after twenty years of unchanged data, is closed when its long-decommissioned settling pond is discovered.",
      ],
      correctIndex: 2,
      explanation:
        "The arc tracks Mateo from the unremarkable assignment, through the careful weekend walking, to the request that respects Halst's standards — and the reshaping of the station's work that follows.",
    },
  ],
};

const MISSION_8_SET_1: SetReading = {
  title: "The Last Recital at the Astor Room",
  subtitle:
    "A short story about a young pianist, a flamboyant rival, and a recital program that almost did not happen at all.",
  format: "Short Story",
  readingMinutes: 4,
  words: [
    "accentuate",
    "conjectural",
    "convivial",
    "decadent",
    "egregious",
    "evanescent",
    "flamboyant",
    "forestall",
    "gainsay",
    "galvanize",
  ],
  passage: `The Astor Room had not been a fashionable address in fifty years. It sat above a closed bakery on a long block in Brooklyn, two flights up a stair whose runner had worn through to the wood, and it survived — when other rooms of its kind had not — only because Hanna Vasic had refused to let it close. Hanna, eighty-one now, had given her own student recital there in 1962, and she still ran the small Wednesday-evening concert series in which her better students performed for an audience of twenty or thirty regulars.

Lina Marek was, by Hanna's quiet estimate, the strongest student she had taught in a decade. She was also, on the Wednesday in question, eight minutes from walking out.

The trouble was a young man named Sevan Doric, whose name had been added to the program two weeks earlier by the building's new co-tenant, a small chamber society that had begun renting the room on Thursdays. Sevan was a **flamboyant** performer — ruffled shirts, theatrical bows, an interpretation of Liszt that Hanna had once described, with the most measured of voices, as "**decadent** in the bad sense." He had decided that Lina's slot, at the end of the program, ought to be his.

"I am not going to **gainsay** him in public," Lina said. She was sitting on the bench in the small green room, in her black recital dress, her hands flat on her thighs. "I am also not going to play after him."

Hanna sat down on the stool across from her.

"Then we will not put you after him," Hanna said.

What Hanna did, in the next six minutes, would later be described by the regulars as the most graceful piece of programming they had ever seen her execute. She did not confront Sevan. She did not rearrange the order publicly. Instead she walked out into the hall, found the chamber society's chair, and said, in her **convivial**, perfectly courteous public voice, that she was so glad Sevan had come, and that the room would benefit enormously from hearing him as the program's final guest — a placement, she explained, traditionally reserved at the Astor Room for the visiting performer whom the audience would most remember.

The chair, flattered, agreed at once. Sevan, flattered, agreed at once.

Lina, having been moved earlier in the program, played seventh.

She had prepared two Schubert impromptus and a small Janáček piece — the Janáček selected, originally, to **forestall** any direct comparison with the Liszt that Sevan would inevitably play. She did not need it now. What she needed was to **accentuate**, in the Schubert, the long quiet line that Hanna had been working with her on for three months — the line that did not announce itself, the line that an inattentive listener could miss entirely.

She played it.

Whatever she did in those nine minutes — the regulars would later describe it in the **conjectural**, slightly awed way that audiences describe performances they cannot quite explain — the room went very still. The Schubert's softest passages, almost **evanescent**, seemed to **galvanize** the audience into a quality of listening Hanna had not heard in the room in years. When Lina lifted her hands at the end, no one moved for a full second.

Sevan played afterward. He played, as expected, with an **egregious** amount of pedal and a finale that drew an involuntary wince from the chamber society's chair.

The applause, when it came for him, was warm and polite.

The applause, when the audience filed out, returned to Lina at the back of the hall — quietly, one regular at a time — for nearly twenty minutes.

Hanna locked the room herself that night. She did not say anything to Lina about Sevan. She said only, on the stairs, that the Janáček could wait until next month.`,
  questions: [
    {
      id: 1,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "convivial" most nearly means:',
      quote:
        '"...she walked out into the hall, found the chamber society\'s chair, and said, in her convivial, perfectly courteous public voice..."',
      options: [
        "Cold and dismissive.",
        "Warmly sociable and good-humored.",
        "Quiet and shy.",
        "Loud and boastful.",
      ],
      correctIndex: 1,
      explanation:
        '"Convivial" describes a friendly, warmly sociable manner — the public voice Hanna uses to flatter the chamber society\'s chair into accepting her suggestion.',
    },
    {
      id: 2,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "evanescent" most nearly means:',
      quote:
        '"The Schubert\'s softest passages, almost evanescent, seemed to galvanize the audience..."',
      options: [
        "Loud and forceful.",
        "Quickly fading and almost vanishing.",
        "Repeated many times.",
        "Played out of tune.",
      ],
      correctIndex: 1,
      explanation:
        '"Evanescent" means quickly fading or close to vanishing — fitting for the softest, almost-disappearing passages of the Schubert.',
    },
    {
      id: 3,
      kind: "tone-purpose",
      prompt:
        'Hanna once described Sevan\'s Liszt as "decadent in the bad sense." Why does the narrator include this carefully qualified phrase rather than simply calling the playing "showy"?',
      options: [
        '"Decadent" and "showy" are synonyms; the qualification is meaningless.',
        'The qualifier signals that "decadent" can sometimes be a compliment in music criticism but that Hanna means the pejorative reading — playing that is overripe and self-indulgent.',
        '"Decadent" means "old-fashioned," and Hanna is complaining that Sevan plays the wrong era of repertoire.',
        '"Decadent" implies illegal conduct, which is why Sevan is later excluded from the program.',
      ],
      correctIndex: 1,
      explanation:
        'The phrase "in the bad sense" tells the reader that "decadent" is being used pejoratively here — overripe, self-indulgent playing — not as the aesthetic compliment the word can sometimes carry.',
    },
    {
      id: 4,
      kind: "inference",
      prompt:
        "Why, most likely, does Hanna move Lina earlier in the program rather than refusing to add Sevan at all?",
      options: [
        "Hanna is afraid of Sevan and does not want a public confrontation she might lose.",
        "Hanna recognizes she cannot easily exclude a guest invited by the building's new co-tenant, but she can quietly reframe the schedule so that Lina performs to a fresh, attentive room while protecting both performers' dignity.",
        "Hanna believes Sevan is the stronger pianist and wants to give him the spotlight.",
        "The chamber society's chair has formally demanded that Sevan close the program, leaving Hanna no other option.",
      ],
      correctIndex: 1,
      explanation:
        "Hanna avoids a public fight she might not win, flatters the chamber society into accepting Lina's earlier slot, and ends up with Lina playing seventh — to a fresh, attentive audience — while still letting Sevan close.",
    },
    {
      id: 5,
      kind: "substitution",
      prompt:
        'Which single word could replace "galvanize" in the sentence below without changing its meaning?',
      quote:
        '"The Schubert\'s softest passages, almost evanescent, seemed to galvanize the audience..."',
      options: [
        "Bore",
        "Energize",
        "Confuse",
        "Dismiss",
      ],
      correctIndex: 1,
      explanation:
        '"Energize" — to rouse into active attention — captures "galvanize." The other options reverse or weaken the meaning.',
    },
    {
      id: 6,
      kind: "main-idea",
      prompt:
        "Which sentence best summarizes the central idea or arc of the passage?",
      options: [
        "A young pianist publicly humiliates a flamboyant rival and is rewarded with a record contract.",
        "A teacher rewrites a recital program with quiet diplomacy so that a strong student can play to an attentive audience without confronting a showy guest, and the student delivers a performance that lingers with the room.",
        "A famous concert hall closes after a final, disappointing recital marred by an egregious display of bad taste.",
        "An eighty-one-year-old teacher decides to retire after a younger pianist refuses to share the stage.",
      ],
      correctIndex: 1,
      explanation:
        "The arc tracks Hanna's small, courteous reordering of the program, Lina's quiet seventh-slot performance, and the audience response that follows — all without a public confrontation with Sevan.",
    },
  ],
};

const MISSION_8_SET_2: SetReading = {
  title: "The Notice on the Bulletin Board",
  subtitle:
    "A short story about a small office, a quiet succession, and a campaign conducted entirely in pinned notes.",
  format: "Short Story",
  readingMinutes: 4,
  words: [
    "indiscriminate",
    "innocuous",
    "momentary",
    "mundane",
    "nettlesome",
    "nullify",
    "obviate",
    "omnipresent",
    "oust",
    "palpable",
  ],
  passage: `The Lindgren Translation Office occupied the second floor of a brick building in Hartford — four desks, two file cabinets, and a coffee machine whose hum had become so **omnipresent** that no one in the office could remember what the room sounded like without it. For twenty-three years, the office had been run by Imogen Sahl, a translator of Swedish technical documents whose contracts paid the rent for everyone else's more interesting work.

Imogen was, in February, three weeks from retirement. The replacement she had recommended to the firm's owner was Anders Korhonen, a quiet senior translator with twenty-six years at the firm. The owner had agreed in principle.

The trouble was a younger translator named Petra Velm, who believed that she — and not Anders — should run the office.

Petra's campaign, that February, was conducted almost entirely through small notices pinned to the office bulletin board.

The notices were, on first reading, **indiscriminate** and **innocuous**. A note about parking. A note about coffee filters. A note about the photocopier's paper drawer. None of them named Anders. Each of them, however, addressed a tiny, **mundane** operational problem that Anders had — at some point in the previous month — failed to anticipate. The note about parking referred, obliquely, to the morning Anders had blocked the loading bay. The note about coffee filters referred to the day Anders had, distractedly, started the machine without one. The note about the photocopier referred to a paper jam Anders had not reported.

By the third week, the bulletin board was so dense with these small, polite notices that the **palpable** purpose of the wall had shifted. It was no longer a place where the office shared information. It was a place where one person, without ever raising her voice, was building a quiet brief against another.

Imogen, who missed almost nothing, missed nothing here.

She did not confront Petra. She did not, that week, take down the notices. What she did was add one of her own, in her own small careful hand, to the top of the board:

"As of March 1, all internal operational notes are to be sent through email and addressed to the senior translator on duty, who will determine whether the matter requires a response. The bulletin board is reserved for client notices and statutory postings. — I.S."

The notice did not name Petra. It did not need to. It also did not, by itself, **oust** her from the office, or **nullify** the small file of complaints she had been quietly building. It simply **obviated** the bulletin board as a tool. Without the wall, the campaign collapsed.

Anders took over the office on March 2. Petra remained at her desk; her contract was not in question. The two of them — and this is the part of the story that the office still tells — settled, within a month, into a working relationship that was not warm, but was not **nettlesome** either. Petra discovered, slowly, that Anders was very good at the parts of the work she found tedious; Anders discovered, slowly, that Petra was very good at the parts of the work he found difficult.

Imogen, on her last day, took down all of the notices from the bulletin board herself. She put them, without ceremony, into the recycling bin.

She did not say anything about it. She paused only for a **momentary** glance at the cleared cork — which was, after twenty-three years, the first time anyone in the office could remember seeing it bare — and then she left.`,
  questions: [
    {
      id: 1,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "innocuous" most nearly means:',
      quote:
        '"The notices were, on first reading, indiscriminate and innocuous."',
      options: [
        "Aggressive and obviously hostile.",
        "Harmless on the surface; offering nothing apparently objectionable.",
        "Highly technical and difficult to understand.",
        "Written in a foreign language.",
      ],
      correctIndex: 1,
      explanation:
        '"Innocuous" means harmless on the surface — which is precisely the point: each note seems unobjectionable on its own, even though the cumulative effect is a campaign.',
    },
    {
      id: 2,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "palpable" most nearly means:',
      quote:
        '"...the bulletin board was so dense with these small, polite notices that the palpable purpose of the wall had shifted."',
      options: [
        "Hidden and secret.",
        "So clear that it could almost be touched or felt.",
        "Officially sanctioned by management.",
        "Trivial and easily ignored.",
      ],
      correctIndex: 1,
      explanation:
        '"Palpable" describes something so clearly perceptible it can almost be physically felt — here, the unmistakable shift in what the bulletin board was being used for.',
    },
    {
      id: 3,
      kind: "tone-purpose",
      prompt:
        'In the opening sentence, the narrator describes the coffee machine\'s hum as "omnipresent." What does this word choice contribute to the tone of the passage?',
      options: [
        'It announces that the story will be a fast-paced thriller about office sabotage.',
        'It establishes a tone of quiet, almost invisible constancy — the kind of background fact that nobody notices but everybody depends on, which mirrors how the office\'s long-running culture has been shaped by Imogen herself.',
        '"Omnipresent" is an error for "occasional" and contributes nothing of importance.',
        'It signals that surveillance equipment has been installed in the office.',
      ],
      correctIndex: 1,
      explanation:
        '"Omnipresent" sets a tone of unobtrusive, taken-for-granted constancy. The reader is being prepared for a story in which the most consequential person in the room is the one whose presence is least announced.',
    },
    {
      id: 4,
      kind: "inference",
      prompt:
        "Why, most likely, does Imogen post a procedural rule about the bulletin board rather than simply taking down Petra's notices or confronting her directly?",
      options: [
        "She is afraid of Petra and is trying to avoid being noticed by her at all.",
        "She wants Anders, not herself, to be seen as the one who acted against Petra.",
        "A direct confrontation would treat the campaign as personal and might sharpen the conflict; a quiet rule change removes the tool the campaign depends on, ends it without naming anyone, and leaves Petra in place but disarmed.",
        "Office regulations forbid her, as the outgoing manager, from removing material from the bulletin board.",
      ],
      correctIndex: 2,
      explanation:
        "The passage emphasizes that the rule does not name Petra and does not, by itself, push her out — it simply removes the bulletin board as an instrument of the campaign. The conflict ends without a confrontation.",
    },
    {
      id: 5,
      kind: "substitution",
      prompt:
        'Which single word or phrase could replace "obviated" in the sentence below without changing its meaning?',
      quote:
        '"It simply obviated the bulletin board as a tool."',
      options: [
        "Magnified",
        "Made unnecessary",
        "Damaged beyond repair",
        "Praised publicly",
      ],
      correctIndex: 1,
      explanation:
        'To "obviate" something is to remove the need for it or render it unnecessary. The new email rule does exactly that to the bulletin-board campaign.',
    },
    {
      id: 6,
      kind: "main-idea",
      prompt:
        "Which sentence best summarizes the central idea or arc of the passage?",
      options: [
        "An office descends into open conflict between two translators, ending with one of them being publicly fired.",
        "A retiring manager dismantles a quiet campaign against her chosen successor by changing a small office rule, ending the conflict without confrontation and leaving the workplace intact.",
        "A bulletin board is removed because of a building safety inspection, and an unrelated personnel change happens at the same time.",
        "An ambitious junior translator successfully takes over an office after pinning enough complaints to the bulletin board.",
      ],
      correctIndex: 1,
      explanation:
        "The arc moves from Petra's escalating notices, through Imogen's small procedural posting, to the collapse of the campaign and a workable post-handover relationship — a quiet, decisive resolution.",
    },
  ],
};

const MISSION_8_SET_3: SetReading = {
  title: "The Provost's Quiet Ledger",
  subtitle:
    "A short story about a small black notebook, a slow pattern, and a dean who resigned for personal reasons.",
  format: "Short Story",
  readingMinutes: 4,
  words: [
    "perfidy",
    "profuse",
    "pugnacious",
    "sagacious",
    "sanguine",
    "scant",
    "skullduggery",
    "trivial",
    "utilitarian",
    "vapid",
  ],
  passage: `The Provost's office at Beresford College was a small, almost **utilitarian** room on the second floor of the administration building — two filing cabinets, a desk, a window looking out onto the quad, and a worn leather chair in which the current provost, Margit Halloran, had been sitting for eleven years. There was nothing flashy in the room and nothing personal in it beyond a single framed photograph of her late husband. People who came in for the first time often left mildly disappointed. The room did not match the rumors of the woman who worked in it.

Margit was, by reputation in the system, the most **sagacious** provost the college had ever had. She was also, by reputation, almost impossible to alarm. The board called her **sanguine** in good times and sanguine in bad ones, which was meant — depending on the year — as either a compliment or a complaint.

The matter that came across her desk in early October was, on its face, **trivial**. A junior administrator in the registrar's office, a man named Wallis, had filed a small complaint against the dean of admissions. The dean, Wallis claimed, had pressured him to rewrite a transcript for a donor's son.

Margit read the complaint twice. Then, instead of summoning the dean, she opened the small black ledger she had kept, in pencil, for eleven years.

The ledger had no title and no organizational logic any outsider would have recognized. It contained, for every academic year of her tenure, a single short line per administrator — a sentence about a small thing that had crossed her desk and that she had judged, at the time, worth remembering. The line for the dean of admissions, that fall, was the seventh entry under his name. The previous six lines, taken individually, would have looked unremarkable. Read together, they did not.

What the ledger described, when Margit set the six entries side by side, was not a single, dramatic act of **perfidy**. It was a slow pattern of small **skullduggery** — a transcript adjusted here, a deadline waived there, a fee quietly forgiven for a name the dean recognized — none of it, on its own, sufficient grounds for discipline. All of it, taken together, conduct the college could not continue to ignore.

Margit did not, that week, confront the dean. She did not give him the **pugnacious** meeting that some on the board would later say he deserved. What she did, instead, was send the ledger pages — without commentary, without a recommendation — to the chair of the trustees, with a short note saying only that the chair might want to read them before the November meeting.

The chair read them on a Sunday.

By the following Friday, the dean had resigned. The official letter cited "personal reasons." The press release was **vapid** in the way that all such releases are vapid — three short sentences, a thank-you, a wish for future success.

The donor's son, whose transcript had not in fact been rewritten — Wallis had refused, and had filed the complaint precisely because of that refusal — graduated on time the following spring with the grades he had actually earned.

Margit, who could have given a long, **profuse** statement to the campus paper about what she had done, gave none. She said only, when the editor cornered her on the quad, that the matter had been handled within the appropriate offices, and that there was **scant** reason to revisit it now.

She walked back to her utilitarian room and closed the door.

The ledger went back into the drawer.`,
  questions: [
    {
      id: 1,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "sagacious" most nearly means:',
      quote:
        '"Margit was, by reputation in the system, the most sagacious provost the college had ever had."',
      options: [
        "Easily flattered.",
        "Showing keen judgment and wise discernment.",
        "Slow to make decisions.",
        "Outwardly charming but secretly ambitious.",
      ],
      correctIndex: 1,
      explanation:
        '"Sagacious" denotes wise, discerning judgment — exactly the reputation Margit demonstrates in how she handles the dean.',
    },
    {
      id: 2,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "perfidy" most nearly means:',
      quote:
        '"What the ledger described...was not a single, dramatic act of perfidy."',
      options: [
        "An accidental clerical error.",
        "A serious breach of trust or betrayal.",
        "An expensive purchase.",
        "A formal academic ceremony.",
      ],
      correctIndex: 1,
      explanation:
        '"Perfidy" means deliberate breach of trust or betrayal. The narrator distinguishes this from the slower pattern of small misconduct the ledger actually documents.',
    },
    {
      id: 3,
      kind: "tone-purpose",
      prompt:
        'The press release announcing the dean\'s resignation is described as "vapid in the way that all such releases are vapid." What does this phrasing contribute to the passage?',
      options: [
        'It signals that the narrator is angry at the college and wants the reader to demand a public investigation.',
        'It quietly suggests that the official statement is deliberately empty of content — three polite sentences that say nothing real — which mirrors the larger point that the actual decision was made off the page, in Margit\'s office.',
        '"Vapid" is being used as a compliment here, meaning "well-written."',
        'It is a stylistic accident with no bearing on the meaning of the passage.',
      ],
      correctIndex: 1,
      explanation:
        'The repetition emphasizes that the press release is content-free by design. The real action — Margit\'s ledger pages going to the chair — happened away from any public statement, which is the point.',
    },
    {
      id: 4,
      kind: "inference",
      prompt:
        "Why, most likely, does Margit send the ledger pages to the chair of the trustees \"without commentary, without a recommendation\"?",
      options: [
        "She is uncertain whether the dean has done anything wrong and wants the chair to decide.",
        "She is required by college policy to forward all complaints to the chair without analysis.",
        "She trusts the cumulative pattern in the ledger to speak for itself, and she wants the chair to reach the necessary conclusion independently — which protects the eventual decision from looking like a personal campaign on Margit's part.",
        "She is hoping the chair will overlook the pattern entirely and let the dean stay in place.",
      ],
      correctIndex: 2,
      explanation:
        "The passage stresses that the previous six lines in the ledger \"would have looked unremarkable\" alone but \"taken together\" did not. Sending the pages without commentary lets the pattern itself do the work and keeps the decision the chair's, not Margit's.",
    },
    {
      id: 5,
      kind: "substitution",
      prompt:
        'Which single word could replace "sanguine" in the sentence below without changing its meaning?',
      quote:
        '"The board called her sanguine in good times and sanguine in bad ones..."',
      options: [
        "Panicked",
        "Optimistic",
        "Hostile",
        "Indifferent",
      ],
      correctIndex: 1,
      explanation:
        '"Sanguine" means optimistic or hopefully composed, especially under pressure — which is exactly the steadiness the board is describing.',
    },
    {
      id: 6,
      kind: "main-idea",
      prompt:
        "Which sentence best summarizes the central idea or arc of the passage?",
      options: [
        "A junior administrator publicly accuses a dean of admissions and is rewarded with a promotion the following spring.",
        "A provost confronts a dean of admissions in a heated meeting that ends in his immediate, public dismissal.",
        "A provost uses a quietly maintained record of small incidents to surface a slow pattern of misconduct, lets the trustees draw the obvious conclusion on their own, and resolves the matter without public confrontation or fanfare.",
        "A donor's son has his transcript rewritten and graduates a year early thanks to the dean's intervention.",
      ],
      correctIndex: 2,
      explanation:
        "The arc moves from a single \"trivial\" complaint, through Margit's eleven-year ledger and the six-entry pattern it reveals, to the chair's quiet weekend reading and the dean's resignation — all handled without a public meeting.",
    },
  ],
};

export const SET_READINGS: Record<string, SetReading> = {
  "1-1": MISSION_1_SET_1,
  "1-2": MISSION_1_SET_2,
  "1-3": MISSION_1_SET_3,
  "2-1": MISSION_2_SET_1,
  "2-2": MISSION_2_SET_2,
  "2-3": MISSION_2_SET_3,
  "3-1": MISSION_3_SET_1,
  "3-2": MISSION_3_SET_2,
  "3-3": MISSION_3_SET_3,
  "4-1": MISSION_4_SET_1,
  "4-2": MISSION_4_SET_2,
  "4-3": MISSION_4_SET_3,
  "5-1": MISSION_5_SET_1,
  "5-2": MISSION_5_SET_2,
  "5-3": MISSION_5_SET_3,
  "6-1": MISSION_6_SET_1,
  "6-2": MISSION_6_SET_2,
  "6-3": MISSION_6_SET_3,
  "7-1": MISSION_7_SET_1,
  "7-2": MISSION_7_SET_2,
  "7-3": MISSION_7_SET_3,
  "8-1": MISSION_8_SET_1,
  "8-2": MISSION_8_SET_2,
  "8-3": MISSION_8_SET_3,
};

export function getSetReading(day: number, group: number): SetReading | null {
  return SET_READINGS[`${day}-${group}`] ?? null;
}

export function hasSetReading(day: number, group: number): boolean {
  return Boolean(SET_READINGS[`${day}-${group}`]);
}
