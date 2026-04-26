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

const MISSION_9_SET_1: SetReading = {
  title: "The Diplomat's First Posting",
  subtitle:
    "A short story about a young attaché, a difficult counterpart, and the patient grammar of negotiation.",
  format: "Short Story",
  readingMinutes: 4,
  words: [
    "boorish",
    "brook",
    "circumspect",
    "comity",
    "commensurate",
    "cordial",
    "deleterious",
    "dichotomy",
    "edify",
    "elicit",
  ],
  passage: `When Adaeze arrived at the embassy in late September, she had already been warned about her counterpart at the trade ministry: Mr. Halverson, a man whose **boorish** manner had reduced two previous attachés to writing weekly resignation letters they never quite sent. He greeted her, on her first morning, by sliding a folder across the table without standing up and without offering his name. It was, she would later admit, a useful introduction — it told her, before he had spoken a single word, exactly what she would need to **brook** if she wanted to keep the file open.

She had been trained, of course, to be **circumspect** in early meetings — to listen for what was *not* said, to take careful notes that committed her to nothing. The training had not entirely prepared her for a counterpart who seemed to operate without a corresponding sense of restraint. Halverson cut off her opening question, dismissed her ministry's last proposal as "a series of suggestions written in the conditional tense," and then, with an abruptness that startled her, asked whether she had any actual authority or whether she was, like her predecessors, a courier with a calling card.

Adaeze did not answer immediately. She had spent two years at the Academy studying the long, patient grammar of international **comity** — the small courtesies that hold even hostile delegations in the same room — and she knew that the worst thing she could do now was match his tone. The instinct to retort would be satisfying for thirty seconds and **deleterious** for the next thirty months.

"I have authority **commensurate** with the proposals I bring," she said evenly, "and I bring proposals my minister has signed. If you would like to test that, we can begin."

There was a pause. Then, surprisingly, his expression shifted into something almost **cordial** — not warm, exactly, but the look of a man who has discovered, against his expectations, that the person across the table is going to be useful. He pulled the folder back toward himself, opened it, and started reading aloud the first clause she had drafted.

The afternoon revealed a curious **dichotomy** in him. The Halverson who had insulted her in the morning was not, it turned out, the same Halverson who actually negotiated. The first was theatrical — a gate to be passed. The second was patient, exact, and unexpectedly willing to concede a small point if it bought him a larger one. She suspected, by the third hour, that the morning's rudeness had been less an expression of contempt than a kind of customs check, designed to **elicit** whether she could be moved off her brief by personal slight alone.

She did not let it move her. She let him test, and rephrased, and tested back. By six o'clock they had a draft both ministers could read without embarrassment. He did not thank her. He did, however, walk her to the door — a small concession, in his vocabulary, that approached a salute.

That night, alone in the embassy apartment, Adaeze opened her diary and wrote a single line meant only to **edify** her future, more tired self: *Be polite to the gate. Save your real arguments for the room behind it.*`,
  questions: [
    {
      id: 1,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "circumspect" most nearly means:',
      quote:
        '"She had been trained, of course, to be circumspect in early meetings — to listen for what was not said, to take careful notes that committed her to nothing."',
      options: [
        "Eager to volunteer one's own positions early.",
        "Wary, careful, and unwilling to commit prematurely.",
        "Formal in dress and posture above all else.",
        "Skeptical to the point of refusing to negotiate.",
      ],
      correctIndex: 1,
      explanation:
        '"Circumspect" describes cautious, watchful behavior. The phrases that follow — listening for the unsaid, taking notes that commit to nothing — are the very definition of being circumspect.',
    },
    {
      id: 2,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "deleterious" most nearly means:',
      quote:
        '"The instinct to retort would be satisfying for thirty seconds and deleterious for the next thirty months."',
      options: [
        "Amusing in a quiet, private way.",
        "Time-consuming and procedurally complex.",
        "Harmful or damaging over the long term.",
        "Required by diplomatic protocol.",
      ],
      correctIndex: 2,
      explanation:
        'The contrast between thirty satisfying seconds and thirty harmful months tells you "deleterious" means damaging — a short payoff with a long cost.',
    },
    {
      id: 3,
      kind: "tone-purpose",
      prompt:
        'The author writes that Adaeze had studied "the long, patient grammar of international comity." Why does the author choose "comity" rather than simply "politeness"?',
      options: [
        '"Comity" and "politeness" are exact synonyms; the choice is purely stylistic.',
        '"Comity" suggests informal warmth between friends, while "politeness" suggests cold formality.',
        '"Comity" specifies a structured, mutual courtesy between groups or nations, which fits the diplomatic context far more precisely than ordinary "politeness."',
        '"Comity" implies disagreement, while "politeness" implies agreement.',
      ],
      correctIndex: 2,
      explanation:
        '"Comity" carries a specifically civic and international weight — courteous behavior maintained between parties who may not actually like each other. "Politeness" would understate what diplomats are trained in.',
    },
    {
      id: 4,
      kind: "inference",
      prompt:
        "Based on the passage, what can the reader most reasonably infer about Halverson's rudeness in the opening meeting?",
      options: [
        "He genuinely despised Adaeze and her ministry from the beginning.",
        "He was performing a kind of test designed to see whether she could be knocked off her brief by personal slights.",
        "He was always rude to women but cordial to men.",
        "He had been instructed by his minister to humiliate the new attaché.",
      ],
      correctIndex: 1,
      explanation:
        'Adaeze\'s own conclusion — that the morning rudeness was a "customs check" meant to elicit whether she could be unsettled — is the strongest inference the text supports.',
    },
    {
      id: 5,
      kind: "substitution",
      prompt:
        'Which single word could replace "boorish" in the sentence below without changing its meaning?',
      quote:
        '"...she had already been warned about her counterpart at the trade ministry: Mr. Halverson, a man whose boorish manner had reduced two previous attachés to writing weekly resignation letters they never quite sent."',
      options: [
        "Charming",
        "Uncouth",
        "Indecisive",
        "Bureaucratic",
      ],
      correctIndex: 1,
      explanation:
        '"Uncouth" — rude, lacking in manners — captures the same meaning as "boorish." The other choices describe entirely different traits.',
    },
    {
      id: 6,
      kind: "main-idea",
      prompt:
        "Which sentence best summarizes the central idea or arc of the passage?",
      options: [
        "A young diplomat refuses to be provoked by her counterpart's rudeness and, by holding her composure, earns the working respect that allows real negotiation to begin.",
        "A trade negotiation between two ministries collapses because one of the participants is unwilling to follow basic protocol.",
        "A new attaché learns that diplomacy is fundamentally a profession for people who enjoy public conflict.",
        "An experienced diplomat exposes a junior counterpart's lack of preparation by humiliating her in their first meeting.",
      ],
      correctIndex: 0,
      explanation:
        "The passage tracks Adaeze's discipline in the face of a deliberate provocation, and the small but real opening that her restraint creates by the end of the day.",
    },
  ],
};

const MISSION_9_SET_2: SetReading = {
  title: "The New Editor at the Quarterly",
  subtitle:
    "A short story about an inherited archive, a beloved predecessor, and a first week spent in the basement.",
  format: "Short Story",
  readingMinutes: 4,
  words: [
    "erudite",
    "fecund",
    "feeble",
    "felicitous",
    "forbear",
    "haphazard",
    "hodgepodge",
    "impede",
    "impetuous",
    "irascible",
  ],
  passage: `When the new editor of *The Branwell Quarterly* took her seat, she inherited two things in unequal measure: a small, beautifully designed magazine with a loyal readership, and a basement archive that could only be described as a **hodgepodge**. Manuscripts from 1981 sat next to invoices from 1996, fan letters were filed under whichever drawer had been nearest at the time, and the entire system, such as it was, had been built in a thoroughly **haphazard** way over forty years by an editor who trusted his own memory more than any index.

That former editor — Mr. Stollman, **erudite**, **irascible**, beloved — had retired the previous month after a sixth heart attack persuaded him that he could no longer reasonably **forbear** from rest. His readers mourned. His staff, who had loved him with the particular love reserved for difficult mentors, mourned somewhat differently: with the relief of people who would no longer be shouted at over a comma. Maeve, the new editor, had been Stollman's deputy for nine years. She knew, better than anyone, both the **fecund** intelligence that had made his magazine essential and the **feeble** organizational habits that had made his successor's job nearly impossible.

She began, on her first Monday, with the archive. Not the masthead, not the website, not the fundraising letter the board wanted by Friday — the archive. Several colleagues thought this **impetuous**, even reckless. The board, in particular, did not understand why anyone would spend a first week descending into a basement when there were donors to charm upstairs. Maeve listened patiently to each warning and went down the stairs anyway.

Her reasoning, she explained later, was simple. A literary magazine, in her view, was a long conversation with its own past; it could not credibly invite a new voice without knowing which voices it had already published, paid, lost touch with, or quietly disappointed. The archive was the magazine's memory, and a memory left in this state would, eventually, **impede** every editorial decision she tried to make. Better to lose a week now than to lose a season later.

The work was slower than she had expected and yielded more than she had hoped. In the second drawer she opened, she found a **felicitous** discovery: a 1989 file of unpublished letters between Stollman and a young poet who had since become one of the most important writers in the language. The letters had been forgotten — not concealed, simply mislaid in the general drift of decades. Three of them, with the poet's permission, would later become the centerpiece of the magazine's anniversary issue, and the goodwill they generated paid, almost to the dollar, for the entire week the board had begged her not to spend.

She did not say *I told you so*. (Stollman, she suspected, would have. That was one of the differences between them.) Instead, at the next board meeting, she set the three retrieved letters on the table without comment and let the archive speak for itself. The treasurer, who had been the most insistent that she abandon the basement, picked up the first letter, read half a paragraph, and said quietly, "How much of this is down there?"

"Forty years," Maeve said. "I thought we should know."`,
  questions: [
    {
      id: 1,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "hodgepodge" most nearly means:',
      quote:
        '"...she inherited two things in unequal measure: a small, beautifully designed magazine with a loyal readership, and a basement archive that could only be described as a hodgepodge."',
      options: [
        "A carefully curated and indexed collection.",
        "A confused, jumbled mixture of unrelated things.",
        "An unusually valuable private library.",
        "A small, tidy, recently organized set of files.",
      ],
      correctIndex: 1,
      explanation:
        'The next sentence — manuscripts beside invoices, letters filed by nearest drawer — describes precisely the kind of disorderly mixture "hodgepodge" denotes.',
    },
    {
      id: 2,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "impede" most nearly means:',
      quote:
        '"The archive was the magazine\'s memory, and a memory left in this state would, eventually, impede every editorial decision she tried to make."',
      options: [
        "Justify or formally support.",
        "Speed up or simplify.",
        "Obstruct, delay, or get in the way of.",
        "Make permanently impossible.",
      ],
      correctIndex: 2,
      explanation:
        '"Impede" means to obstruct or hinder. Maeve\'s point is not that the archive will block decisions outright, only that it will get in their way until it is sorted.',
    },
    {
      id: 3,
      kind: "tone-purpose",
      prompt:
        'The author describes Stollman\'s intelligence as "fecund." Why does the author choose "fecund" rather than simply "creative"?',
      options: [
        '"Fecund" implies wastefulness, while "creative" implies discipline.',
        '"Fecund" carries the sense of an almost biological abundance — endlessly producing — which conveys not just the quality of his ideas but their unstoppable volume in a way "creative" would not.',
        '"Fecund" is a technical editing term that means "well-edited."',
        '"Fecund" and "creative" mean exactly the same thing; the author is just showing off vocabulary.',
      ],
      correctIndex: 1,
      explanation:
        '"Fecund" originally describes fertility — soil, harvests, abundance. Applied to a person, it suggests an intellect that produces ceaselessly, which is a sharper image than "creative."',
    },
    {
      id: 4,
      kind: "inference",
      prompt:
        "Based on the passage, what can the reader most reasonably infer about why Maeve set the recovered letters on the board table without commentary?",
      options: [
        "She was uncertain whether the letters were genuine and hoped the board could authenticate them.",
        "She wanted the discovery itself to demonstrate the value of the archive work she had defended, without forcing her to argue the point aloud.",
        "She was angry with the board and wanted to embarrass the treasurer in particular.",
        "She had been told by Stollman to present the letters in this exact way.",
      ],
      correctIndex: 1,
      explanation:
        'The passage explicitly contrasts Maeve with Stollman ("she did not say I told you so") and shows the treasurer being persuaded by the letters themselves — a quiet way of letting the evidence make her case for her.',
    },
    {
      id: 5,
      kind: "substitution",
      prompt:
        'Which single word could replace "irascible" in the sentence below without changing its meaning?',
      quote:
        '"That former editor — Mr. Stollman, erudite, irascible, beloved — had retired the previous month..."',
      options: [
        "Generous",
        "Hot-tempered",
        "Forgetful",
        "Wealthy",
      ],
      correctIndex: 1,
      explanation:
        '"Hot-tempered" — easily provoked to anger — matches "irascible." The detail about being "shouted at over a comma" later in the passage confirms the trait.',
    },
    {
      id: 6,
      kind: "main-idea",
      prompt:
        "Which sentence best summarizes the central idea or arc of the passage?",
      options: [
        "A new editor ignores the practical demands of her job to indulge a personal interest in old papers, and is later forced to apologize to her board.",
        "A literary magazine collapses because its founding editor refused to keep proper records.",
        "A new editor invests her first week in restoring her magazine's institutional memory and is vindicated when the archive yields a discovery that pays for itself.",
        "A retiring editor sabotages his successor by leaving the office archive in deliberate disorder.",
      ],
      correctIndex: 2,
      explanation:
        "The passage moves from Maeve's controversial choice to descend into the basement, through her reasoning about institutional memory, to the felicitous letters that justify the choice in front of the very board that opposed it.",
    },
  ],
};

const MISSION_9_SET_3: SetReading = {
  title: "The Bookseller of Marlow Lane",
  subtitle:
    "A short story about a small bookshop, a quiet petitioner, and twenty-two years of careful stewardship.",
  format: "Short Story",
  readingMinutes: 4,
  words: [
    "mercenary",
    "meticulous",
    "mordant",
    "outstrip",
    "precarious",
    "quirky",
    "repudiate",
    "tact",
    "trifling",
    "turbulent",
  ],
  passage: `Esther Bowdler had owned the shop on Marlow Lane for twenty-two years, through a recession, two **turbulent** changes in publishing, and one summer in which the rent on her block doubled and three of her neighbors closed within a month. The shop survived because Esther was, in equal parts, **meticulous** about her accounts and stubborn about her standards — a combination that, in retail, is rarer than either trait alone.

She was not, by temperament, a **mercenary** bookseller. The titles in her front window were chosen because she believed in them, not because they paid the most attractive co-op fee. She turned down a steady stream of celebrity memoirs that her wholesaler insisted would "outsell anything else on the shelf" and was sometimes proven right, sometimes pleasantly wrong, and never quite sorry either way. The shop's profit margins remained, frankly, **precarious**. But for two decades they had not gone negative, which was, in her business, a small civic victory.

What kept regulars coming back was less the inventory than Esther herself. She had a **quirky** way of recommending books — never starting with the bestseller list, always with a question about what the customer had last *finished*, never what they had last *bought* — and a **mordant** running commentary on the publishing industry that delighted everyone except the occasional sales rep. She would not stock a book she had not read. She would not **repudiate** a recommendation she had made even when the author later disgraced themselves; she would simply add, in a small handwritten card beside the title, a sentence of context that customers were free to weigh as they liked.

The trouble began, as trouble in small businesses often does, with a **trifling** complaint. A new resident two doors down objected to the chalkboard Esther kept on the sidewalk — said it was a hazard to strollers, said the wording was occasionally "unprofessional," said other things that, taken individually, sounded like nothing. Taken together, they amounted to a campaign. Within six weeks the complaint had been escalated, with the careful coordination of three other newcomers, into a petition before the local business association.

Most shopkeepers in Esther's position would have argued. Esther chose **tact**. She agreed to move the chalkboard six inches inside the doorway. She wrote a short, courteous letter to the association acknowledging the concern and inviting any signatory to come in for tea. Two of them did. One left with three books and a standing order.

The petitioner who had started the whole affair never appeared. But the campaign, deprived of its public stage, lost momentum within the month. Esther's instinct — that a quiet, hospitable response would, in a neighborhood that valued long memory over short noise, eventually **outstrip** any louder one — turned out, again, to be correct.

She did not gloat. She added one new card to the shelf nearest the door. It read, in her small careful hand: *This shop has been here longer than the people complaining about it. We intend to keep it that way.*`,
  questions: [
    {
      id: 1,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "mercenary" most nearly means:',
      quote:
        '"She was not, by temperament, a mercenary bookseller. The titles in her front window were chosen because she believed in them, not because they paid the most attractive co-op fee."',
      options: [
        "Specializing in military or historical books.",
        "Driven primarily by money rather than principle.",
        "Notorious for offering steep discounts.",
        "Indifferent to which books actually sell.",
      ],
      correctIndex: 1,
      explanation:
        'The contrast in the next sentence — believing in titles versus chasing the most lucrative fee — clarifies that "mercenary" here means money-driven at the expense of conviction.',
    },
    {
      id: 2,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "repudiate" most nearly means:',
      quote:
        '"She would not repudiate a recommendation she had made even when the author later disgraced themselves; she would simply add, in a small handwritten card beside the title, a sentence of context..."',
      options: [
        "Reprint or republish.",
        "Quietly forget about.",
        "Formally reject or disown.",
        "Translate into another language.",
      ],
      correctIndex: 2,
      explanation:
        '"Repudiate" means to formally reject or disown. Esther will not disown her past recommendation; she only annotates it.',
    },
    {
      id: 3,
      kind: "tone-purpose",
      prompt:
        'The author calls Esther\'s commentary "mordant." Why does the author choose "mordant" rather than simply "sarcastic"?',
      options: [
        '"Mordant" is just a synonym for "sarcastic" with no real difference in meaning.',
        '"Mordant" implies cheerful, harmless teasing, while "sarcastic" implies cruelty.',
        '"Mordant" carries the sense of sharp, biting wit that draws blood while remaining intelligent — closer to a literary edge than the everyday eye-rolling that "sarcastic" usually suggests.',
        '"Mordant" specifically refers to humor about death, which Esther uses constantly.',
      ],
      correctIndex: 2,
      explanation:
        '"Mordant" describes a sharp, almost corrosive wit. It fits the picture of a long-tenured bookseller whose criticism of the publishing industry is precise enough to delight insiders and unsettle reps.',
    },
    {
      id: 4,
      kind: "inference",
      prompt:
        "Based on the passage, what can the reader most reasonably infer about why Esther's response defused the petition campaign so effectively?",
      options: [
        "She privately threatened the petitioners with legal action if they continued.",
        "By moving the chalkboard a token amount and inviting signatories in personally, she stripped the campaign of any visible grievance for its organizers to rally around.",
        "The business association was already biased in her favor and would have rejected the petition regardless.",
        "She bribed two of the signatories to drop their names from the petition.",
      ],
      correctIndex: 1,
      explanation:
        'The text says the campaign "deprived of its public stage, lost momentum." Esther\'s small concession plus personal hospitality removed the visible target the campaign needed.',
    },
    {
      id: 5,
      kind: "substitution",
      prompt:
        'Which single word could replace "meticulous" in the sentence below without changing its meaning?',
      quote:
        '"...Esther was, in equal parts, meticulous about her accounts and stubborn about her standards..."',
      options: [
        "Careless",
        "Scrupulous",
        "Defensive",
        "Generous",
      ],
      correctIndex: 1,
      explanation:
        '"Scrupulous" — exact, attentive to every detail — captures the same meaning as "meticulous." "Careless" is the opposite.',
    },
    {
      id: 6,
      kind: "main-idea",
      prompt:
        "Which sentence best summarizes the central idea or arc of the passage?",
      options: [
        "A long-tenured bookseller defends her shop from a petty neighborhood campaign by responding with measured tact rather than confrontation, and her quiet approach prevails.",
        "A small bookshop is forced to close after newcomers to the neighborhood organize a successful petition against it.",
        "An idealistic shopkeeper learns the hard way that principled bookselling cannot survive in a competitive market.",
        "A neighborhood business association takes sides in a personal dispute between two shop owners and creates a lasting feud.",
      ],
      correctIndex: 0,
      explanation:
        "The arc moves from Esther's twenty-two years of careful stewardship, through a trifling but coordinated complaint, to her tactful response — and to the quiet vindication of that response when the campaign loses its momentum.",
    },
  ],
};

const MISSION_10_SET_1: SetReading = {
  title: "The Auditor in Room Twelve",
  subtitle:
    "A short story about a forensic accountant, a careful CFO, and the quiet space between fact and amendment.",
  format: "Short Story",
  readingMinutes: 4,
  words: [
    "acumen",
    "antithesis",
    "ascribe",
    "befuddled",
    "eschew",
    "esoteric",
    "evasive",
    "exculpate",
    "expedite",
    "fastidious",
  ],
  passage: `The forensic accountant Helene Frosch arrived at Marwick & Bray on a Monday morning that the firm's senior partners had spent two weeks dreading. They had not requested her; the regulator had. A whistleblower's letter, three pages long and damningly specific, had arrived at the commission, and someone with the financial **acumen** to read sixty thousand entries without losing the thread had been required by sundown. Helene was the regulator's most **fastidious** investigator and, in many ways, the **antithesis** of the rumpled, charming examiners the partners were used to negotiating with. She wore gray. She did not laugh at jokes. She declined, politely, the offered tea.

She set up in Room Twelve, the smallest conference room on the floor, and asked for the firm's general ledger, three specific sub-ledgers, and — almost as an afterthought — the comment field of every journal entry posted in the last fiscal year. The CFO, a man named Devlin who had built a long career on his ability to **expedite** difficult conversations, suggested mildly that the comment fields contained "internal shorthand" that might leave an outsider **befuddled**. Helene looked at him, smiled with the warmth of a thermostat, and said she would manage.

By Wednesday she had a file of one hundred and twelve flagged entries. By Friday she had narrowed them to fourteen. The pattern, once she sketched it on a single sheet of paper, was almost embarrassingly clean: a small **esoteric** technique used elsewhere in the industry, lawful in theory, had been applied here in a way that crossed three lines at once. The amounts involved were not large. The repetition was the problem.

Devlin came to Room Twelve on Friday afternoon with a folder of his own. He did not ask what she had found. He asked, instead, what it would take to bring the matter to a quiet conclusion — a phrase that could mean many things, and which Helene had been trained, since her first year, to treat with great care. She did not answer the question directly. She asked him, instead, to walk her through entry number forty-seven.

His answer was **evasive**. Not a lie, exactly — a careful arrangement of true facts in an order designed to suggest a different overall picture. Helene let him finish. Then she walked him, line by line, through the same entry as it had actually been recorded, and asked whether he would like to amend his account. He sat very still for nearly a minute. Then he said, quietly, that he would.

The remainder was procedural. Helene did not **ascribe** motives — that was for the commission and, eventually, the tribunal. She did not, in her formal report, attempt to **exculpate** anyone, nor did she condemn beyond what the entries themselves required. She **eschewed**, as she always did, the temptation to call the conduct "fraudulent" before that word had been earned in the legal sense. The report contained, in the end, sixteen paragraphs and one appendix. It would, the regulator told her later, be one of the cleanest she had ever filed.

On Monday morning she packed her gray notebook into her gray bag and left Room Twelve for the next firm on her list. The partners watched her go with the cautious respect owed to weather one has narrowly survived.`,
  questions: [
    {
      id: 1,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "acumen" most nearly means:',
      quote:
        '"...someone with the financial acumen to read sixty thousand entries without losing the thread had been required by sundown."',
      options: [
        "Stamina or physical endurance.",
        "Sharp judgment and the capacity for quick, accurate insight.",
        "Formal academic credentials.",
        "Resistance to bribery or pressure.",
      ],
      correctIndex: 1,
      explanation:
        '"Acumen" denotes shrewd, quick mental judgment — the ability to make sense of large amounts of information without losing the thread, exactly the trait the regulator needed.',
    },
    {
      id: 2,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "evasive" most nearly means:',
      quote:
        '"His answer was evasive. Not a lie, exactly — a careful arrangement of true facts in an order designed to suggest a different overall picture."',
      options: [
        "Direct and confrontational.",
        "Tending to avoid the real point or commitment, especially through indirectness.",
        "Spoken in a foreign language or jargon.",
        "Rehearsed and word-for-word identical to a previous statement.",
      ],
      correctIndex: 1,
      explanation:
        'The author\'s gloss — "true facts in an order designed to suggest a different overall picture" — is a perfect description of evasion: technically truthful, deliberately misdirecting.',
    },
    {
      id: 3,
      kind: "tone-purpose",
      prompt:
        'The author calls the questionable technique "esoteric" rather than simply "obscure." Why?',
      options: [
        '"Esoteric" and "obscure" mean exactly the same thing in this context.',
        '"Esoteric" carries the sense of specialized knowledge restricted to insiders, which fits a technique that is "lawful in theory" but understood and used by only a small group of practitioners.',
        '"Esoteric" implies the technique is illegal, while "obscure" would imply it is merely uncommon.',
        '"Esoteric" suggests something ancient, while "obscure" suggests something modern.',
      ],
      correctIndex: 1,
      explanation:
        'An "esoteric" technique is one understood by a closed circle of specialists. That nuance — insider knowledge — is essential to the story\'s point that the misuse depended on the technique being recognized only by a few.',
    },
    {
      id: 4,
      kind: "inference",
      prompt:
        "Based on the passage, what can the reader most reasonably infer about why Helene asked Devlin to walk her through entry forty-seven instead of confronting him directly?",
      options: [
        "She was uncertain whether the entry was actually problematic and hoped he could explain it.",
        "She wanted him to commit to a version of events on the record before she revealed how much she already knew.",
        "She was afraid of him and avoided open confrontation whenever possible.",
        "Regulator policy requires a verbal explanation before any flagged entry can be reviewed.",
      ],
      correctIndex: 1,
      explanation:
        'The next paragraphs show that Helene already knew the true record and used Devlin\'s evasive account to give him the chance to commit before she walked him line-by-line through the truth — a classic technique for eliciting a clean amendment.',
    },
    {
      id: 5,
      kind: "substitution",
      prompt:
        'Which single word could replace "fastidious" in the sentence below without changing its meaning?',
      quote:
        '"Helene was the regulator\'s most fastidious investigator..."',
      options: [
        "Charming",
        "Punctilious",
        "Forgiving",
        "Unpredictable",
      ],
      correctIndex: 1,
      explanation:
        '"Punctilious" — extremely attentive to detail and correctness — captures the same meaning as "fastidious." The other choices describe entirely different traits.',
    },
    {
      id: 6,
      kind: "main-idea",
      prompt:
        "Which sentence best summarizes the central idea or arc of the passage?",
      options: [
        "A whistleblower destroys a respectable accounting firm by leaking false information to the regulator.",
        "A senior partner uses charm and procedural delays to defeat an inexperienced auditor sent to investigate his firm.",
        "A disciplined forensic accountant uses patience and precision to extract a quiet, accurate amendment from a CFO whose first instinct is to manage rather than disclose.",
        "A regulator is forced to admit that financial misconduct is too complex to investigate and closes the case without a finding.",
      ],
      correctIndex: 2,
      explanation:
        "The arc moves from Helene's careful setup, through her narrowing of flagged entries, to the moment she walks Devlin through the real record and obtains an amendment without theatrics — a study in how restraint can be a kind of force.",
    },
  ],
};

const MISSION_10_SET_2: SetReading = {
  title: "The Caretaker's Letter",
  subtitle:
    "A short story about a quiet homecoming, a wrongly latched gate, and a decision made alone.",
  format: "Short Story",
  readingMinutes: 4,
  words: [
    "feign",
    "furtive",
    "hamper",
    "indispensable",
    "lament",
    "myopic",
    "nonchalant",
    "partial",
    "pensive",
    "portend",
  ],
  passage: `The first thing Mrs. Aldred noticed, when she returned from her sister's funeral after eleven days away, was that the back gate had been latched on the wrong side. It was a small thing — almost nothing — and most people would not have noticed at all. But she had latched that gate twice a day for thirty-one years, and she did not need to pretend, even briefly, to be the sort of person who could **feign** indifference to detail.

Inside the house, the **partial** stack of mail by the door had been sorted. A bowl that should have been on the second shelf was on the third. The kettle, which she always left handle-out, was turned the other way. None of it would have been visible to a casual visitor; all of it was visible to her. She made a cup of tea, sat down at the kitchen table, and grew **pensive**, her fingers tracing the rim of the cup as she considered what these small displacements might **portend**.

Her caretaker — a young man named Owen whom her late husband had hired four years earlier — had been hired explicitly because he was, in matters of trust, **indispensable**. Mrs. Aldred had no children, no surviving siblings now, and a rather rich and very portable collection of small antique silver. Owen had been vetted twice, paid generously, and given keys to every door in the house. The arrangement had worked, until — possibly — it hadn't.

She did not call the police. She did not, in fact, tell anyone. She simply spent the next two days walking the house slowly, photographing every shelf, every drawer, every small displacement she could identify. By Wednesday afternoon she had a list of fourteen items that had been moved and three small pieces of silver — modest, easily overlooked — that were missing. She did not **lament** the silver. She regretted, instead, the years of unguarded warmth she had extended to a man who had now made her doubt her own roof.

When Owen arrived for his Thursday shift, she did not confront him. She offered him tea and watched, with great care, the small **furtive** glance he gave the side cabinet as he sat down — the kind of glance that people who are about to be caught make without realizing they are making it. She asked him, in a deliberately **nonchalant** voice, about his weekend. He answered easily. She asked, in the same tone, whether he had moved anything in the back parlor while she was away. He said he had not. She watched him say it.

That night she changed every lock in the house. She did not file a report. She wrote Owen a short, formal letter, terminating his employment with two weeks' severance and without explanation, and left the silver question for the insurer to settle if it ever surfaced. A friend, when she told her, called the response **myopic** — argued that Owen would simply do the same to the next elderly woman who hired him. Mrs. Aldred listened, and did not argue, and did not change her mind.

She had, she explained later, spent thirty-one years latching that gate. She had earned, she felt, the right to decide alone what to do when somebody else latched it the wrong way. Anything beyond that would only **hamper** the small, careful peace she meant to spend the rest of her days defending.`,
  questions: [
    {
      id: 1,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "portend" most nearly means:',
      quote:
        '"...her fingers tracing the rim of the cup as she considered what these small displacements might portend."',
      options: [
        "Conceal or hide from view.",
        "Be a sign or warning of something significant about to come.",
        "Resemble or look like.",
        "Disprove or contradict.",
      ],
      correctIndex: 1,
      explanation:
        '"Portend" means to foreshadow or warn of something significant. The displaced bowl, kettle, and gate are clues that, taken together, hint at a larger meaning Mrs. Aldred is trying to read.',
    },
    {
      id: 2,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "furtive" most nearly means:',
      quote:
        '"...the small furtive glance he gave the side cabinet as he sat down — the kind of glance that people who are about to be caught make without realizing they are making it."',
      options: [
        "Bold and openly accusing.",
        "Sleepy or absent-minded.",
        "Secret, stealthy, and meant to escape notice.",
        "Lengthy and admiring.",
      ],
      correctIndex: 2,
      explanation:
        'A "furtive" glance is a secretive one — quick, sneaky, designed not to be seen. The author\'s own gloss about being "caught without realizing it" confirms the meaning.',
    },
    {
      id: 3,
      kind: "tone-purpose",
      prompt:
        'The author writes that Mrs. Aldred grew "pensive" rather than, say, "anxious" or "upset." Why?',
      options: [
        '"Pensive" and "anxious" mean the same thing; the choice is purely stylistic.',
        '"Pensive" describes a quiet, reflective state of mind, which captures Mrs. Aldred\'s methodical, almost deductive response — far more accurate than the agitation that "anxious" or "upset" would imply.',
        '"Pensive" suggests she is daydreaming and ignoring the problem.',
        '"Pensive" implies she is afraid of being judged by her neighbors.',
      ],
      correctIndex: 1,
      explanation:
        'The whole passage shows Mrs. Aldred reasoning her way through the displacements rather than reacting emotionally. "Pensive" — thoughtful, contemplative — is the word that fits a reasoner; "anxious" would distort her character.',
    },
    {
      id: 4,
      kind: "inference",
      prompt:
        "Based on the passage, what can the reader most reasonably infer about why Mrs. Aldred declined to file any report or warn anyone about Owen?",
      options: [
        "She was not certain Owen had taken the silver and feared falsely accusing him.",
        "She believed her own private response — locks changed, employment ended quietly — was a sufficient and dignified resolution, and that wider action would cost her more peace than it would buy her.",
        "She intended to confront Owen herself at a later date.",
        "She was bound by a contractual non-disclosure clause from her late husband's estate.",
      ],
      correctIndex: 1,
      explanation:
        'Her closing reflection — that she had earned the right to decide alone, and that wider action would only hamper her peace — is the strongest direct support for option B. The passage does not present her as uncertain.',
    },
    {
      id: 5,
      kind: "substitution",
      prompt:
        'Which single word could replace "indispensable" in the sentence below without changing its meaning?',
      quote:
        '"Her caretaker — a young man named Owen whom her late husband had hired four years earlier — had been hired explicitly because he was, in matters of trust, indispensable."',
      options: [
        "Optional",
        "Essential",
        "Suspicious",
        "Affordable",
      ],
      correctIndex: 1,
      explanation:
        '"Essential" — absolutely necessary — captures the same meaning as "indispensable." "Optional" is the opposite.',
    },
    {
      id: 6,
      kind: "main-idea",
      prompt:
        "Which sentence best summarizes the central idea or arc of the passage?",
      options: [
        "A widow refuses to acknowledge that her caretaker has been stealing from her, and her refusal eventually destroys her household.",
        "A small-town theft escalates into a public scandal involving the police, an insurance company, and a betrayed employer.",
        "A widow notices a series of small, deliberate disturbances in her home, identifies her caretaker as the cause, and chooses to handle the matter privately on her own terms.",
        "A caretaker is wrongly accused of theft on the basis of a misplaced bowl and a kettle turned the wrong way.",
      ],
      correctIndex: 2,
      explanation:
        "The arc moves from Mrs. Aldred's quiet observation of small details, through her patient documentation, to her measured, private decision to end the arrangement on terms that protect her own peace.",
    },
  ],
};

const MISSION_10_SET_3: SetReading = {
  title: "The Mayor's Quiet Reform",
  subtitle:
    "A short story about a small lake town, forty years of paperwork, and the patience required to retire it.",
  format: "Short Story",
  readingMinutes: 4,
  words: [
    "provincial",
    "rudimentary",
    "salutary",
    "sever",
    "slight",
    "somnolent",
    "stoic",
    "supersede",
    "tout",
    "wane",
  ],
  passage: `When Mayor Halia Conescu took office in the small lake town of Veredia, the local paper described her victory as "modest" — a word she had learned, in two years of campaigning, was the polite version of an editor's **slight**. The town's enthusiasm for politics had, over a decade of uncontested elections, **waned** into something closer to indifference; the previous mayor had governed in a **somnolent** style that pleased nobody and offended even fewer. Halia had won by knocking on doors herself.

The town had real problems and only **rudimentary** machinery for solving them. Its records were in three different handwriting styles. Its zoning code referred, in places, to a railroad that had been removed in 1962. Its public budget consisted of seven spreadsheets that nobody had merged in eleven years. Halia did not **tout** these failings on the campaign trail — partly out of decency, partly because her opponent had been the previous mayor's nephew — but she had taken office knowing exactly which knots she intended to untie first.

Her first act, on her first morning, was to ask the town clerk to print a single, consolidated copy of every standing ordinance, in the order in which it had been passed. The clerk, a woman named Ines who had served four mayors and outlasted them all, raised one eyebrow and said it would take a week. Halia said she could wait a week. By the following Monday she had read all of it.

What she found was less corruption than accumulation: forty years of rules that had been written for one situation, applied to another, and never repealed. A 1978 ordinance still required certain permits to be filed in triplicate by carbon paper. A 1991 rule limited public meetings to two hours, in a town that now routinely needed four. None of it was sinister. All of it slowed the town's small civic life into the **provincial** rhythm her predecessors had been content to mistake for charm.

She did not want to **sever** the town's connection with its past — she had been raised, herself, in Veredia, and she knew the difference between tradition and inertia. She drafted, instead, a single short bill, sixty-three lines long, that allowed the council to formally **supersede** any ordinance passed before 1980 with a simple updated version, on a rolling basis, two ordinances per meeting. She presented it on a Tuesday, defended it without raising her voice, and watched four of her seven councillors vote yes by the end of the evening.

Some of the older residents grumbled. One columnist wrote that the new mayor was tearing the town apart "for the sake of efficiency, that least sentimental of virtues." Halia did not pretend wounded surprise; she had expected the criticism, and answered it, in her quiet way, with a public letter that conceded the columnist's point in principle and rejected it in practice. The reform, she argued, was not a rejection of Veredia's character but a **salutary** correction of forty years of paperwork that had been allowed to outlive its usefulness.

Her **stoic** patience, in the end, did more for her than any speech could have. By the close of her first year, eighteen old ordinances had been quietly retired and replaced. The town's permits moved twice as fast. The columnist, who had remained skeptical, conceded in print that the lights, at least, were on at the town hall again — and that the mayor's office, which had been somnolent for a decade, was now perceptibly awake.`,
  questions: [
    {
      id: 1,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "wane" most nearly means:',
      quote:
        '"The town\'s enthusiasm for politics had, over a decade of uncontested elections, waned into something closer to indifference..."',
      options: [
        "Sharpened or grown more intense.",
        "Gradually decreased or weakened over time.",
        "Become organized into a formal movement.",
        "Been suppressed by force.",
      ],
      correctIndex: 1,
      explanation:
        '"Wane" describes a slow decline. The decade of uncontested elections sliding into indifference is exactly that kind of gradual fading.',
    },
    {
      id: 2,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "supersede" most nearly means:',
      quote:
        '"...allowed the council to formally supersede any ordinance passed before 1980 with a simple updated version..."',
      options: [
        "Translate into a different language.",
        "Investigate for legal violations.",
        "Replace and take the place of, rendering the previous version no longer in force.",
        "Cite as supporting precedent.",
      ],
      correctIndex: 2,
      explanation:
        '"Supersede" means to take the place of an earlier authoritative version. The bill\'s purpose is to let an updated ordinance formally replace the older one.',
    },
    {
      id: 3,
      kind: "tone-purpose",
      prompt:
        'The narrator describes the previous mayor\'s style as "somnolent" rather than "lazy" or "boring." Why?',
      options: [
        '"Somnolent" implies cruelty, while "lazy" implies kindness.',
        '"Somnolent" carries the specific image of drowsiness — of a town hall half-asleep — which captures both the sluggish governance and the atmosphere it produced, in a way that "lazy" or "boring" would not.',
        '"Somnolent" is a legal term required to describe a previous mayor.',
        '"Somnolent" is just a longer synonym for "lazy" with no real difference in meaning.',
      ],
      correctIndex: 1,
      explanation:
        '"Somnolent" literally means sleepy, and the closing line about the town hall being "perceptibly awake" again is the payoff. The image of drowsiness frames both the governance and the atmosphere — a precision "lazy" cannot match.',
    },
    {
      id: 4,
      kind: "inference",
      prompt:
        "Based on the passage, what can the reader most reasonably infer about Halia's strategic choice to retire ordinances at a rate of only two per council meeting?",
      options: [
        "She secretly hoped the project would never finish, in order to give herself permanent work.",
        "The pace was deliberately modest so the reform would feel like maintenance rather than upheaval, making it easier for cautious councillors and longtime residents to accept.",
        "Town law required this exact pace and she had no choice in the matter.",
        "She believed the older residents would notice nothing as long as no more than two rules changed at a time.",
      ],
      correctIndex: 1,
      explanation:
        'The passage emphasizes that Halia distinguishes tradition from inertia and does not want to sever the connection with the past. A modest, rolling pace is the natural expression of that distinction — reform that reads as upkeep.',
    },
    {
      id: 5,
      kind: "substitution",
      prompt:
        'Which single word could replace "rudimentary" in the sentence below without changing its meaning?',
      quote:
        '"The town had real problems and only rudimentary machinery for solving them."',
      options: [
        "Sophisticated",
        "Basic",
        "Borrowed",
        "Hostile",
      ],
      correctIndex: 1,
      explanation:
        '"Basic" — limited to elementary essentials — captures the same meaning as "rudimentary." The examples that follow (mismatched handwriting, unmerged spreadsheets) confirm this is bare-bones machinery.',
    },
    {
      id: 6,
      kind: "main-idea",
      prompt:
        "Which sentence best summarizes the central idea or arc of the passage?",
      options: [
        "A new mayor abandons her reform plans after a single columnist criticizes her in the local paper.",
        "A small town's residents drive out a reformist mayor who tries to dismantle their cherished local traditions.",
        "A reform-minded mayor uses patience, restraint, and a deliberately modest pace to retire decades of accumulated regulation without breaking the town's sense of itself.",
        "A town clerk secretly takes over from a weak mayor and runs the town through bureaucratic means.",
      ],
      correctIndex: 2,
      explanation:
        "The arc tracks Halia's careful audit of the town's accumulated rules, her short bill that supersedes them on a rolling basis, and the salutary effect that her stoic, modest pace produces by the end of her first year.",
    },
  ],
};

const MISSION_11_SET_1: SetReading = {
  title: "The Antiques Dealer of Wexford Hill",
  subtitle:
    "A short story about a quiet shopkeeper, a glittering competitor, and the kindness of putting the facts on the table.",
  format: "Short Story",
  readingMinutes: 4,
  words: [
    "abhor",
    "boisterous",
    "chivalrous",
    "churlish",
    "clandestine",
    "complacent",
    "cumbersome",
    "debilitating",
    "deliberate",
    "droll",
  ],
  passage: `Mr. Pemberton had owned the antiques shop at the corner of Wexford Hill for forty-one years, and in all that time he had **abhorred** only one thing in his trade: the **boisterous**, hard-selling auctioneer who turned every estate sale into a spectacle. Pemberton's own style was quiet — **deliberate** in the placement of each object on his shelves, **chivalrous** in his dealings with elderly clients, and faintly **droll** in his conversation with regulars who had been buying small silver from him since the 1980s.

When a national chain called Hannover & Sons opened a glittering branch three blocks away, Pemberton did not protest. He did not lower his prices, either. He continued to wrap each sale in tissue paper and to recommend, on slow Tuesdays, books his customers might enjoy on whatever they had just bought. "We are not in competition with them," he said when a friend asked. "We are in a different business that uses some of the same words."

For a year nothing happened. Then, in early March, a man in a dark suit came to the shop with what he called a "courtesy proposal." Hannover & Sons would, he explained, like to acquire Pemberton's inventory and lease, retain the storefront under its own name, and offer Mr. Pemberton a "consulting role" with no fixed hours. The figure on the offer letter was generous. The smile on the man's face was practiced.

Pemberton thanked him and asked for a week to think. The man left with the **complacent** air of someone who already knew the answer.

What followed was less a refusal than a discovery. Within days Pemberton noticed small, **clandestine** disturbances in the rhythm of his business: a wholesaler who had supplied him for twenty years suddenly "could not source" a routine consignment; a longstanding customer received an unsolicited offer to sell back a vase she had bought from him in 1996. None of it was **churlish** to his face. All of it was a quiet pressure designed to make the **cumbersome** business of running an independent shop feel, by degrees, **debilitating** enough to make the offer letter look like a kindness.

Pemberton did not write an angry letter. He did, however, write a calm one — to his customers, to the local paper, and to the chair of the small business association — in which he described, without naming the chain, the precise sequence of calls and offers he had received in the past three weeks. He attached no demand. He asked no protest. He simply put the facts on the table.

The chain's response, when it came, was conciliatory. The "consulting" offer was withdrawn. The wholesaler called to apologize for an "internal mistake." The vase customer kept her vase. By April the shop was quieter than it had been in a year, but it was, unmistakably, still his.

The man in the dark suit did not return. Pemberton mentioned the whole affair, exactly once, to a regular who asked how the spring had been. "Slow," he said, in his usual measured tone. "But honest. Which is more than the alternative was offering."`,
  questions: [
    {
      id: 1,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "complacent" most nearly means:',
      quote:
        '"The man left with the complacent air of someone who already knew the answer."',
      options: [
        "Anxious about the response.",
        "Smugly self-satisfied and untroubled by doubt.",
        "Apologetic about the imposition.",
        "Distracted by other meetings.",
      ],
      correctIndex: 1,
      explanation:
        '"Complacent" describes a smug, untroubled satisfaction. The man\'s confident assumption that the answer was already settled in his favor is exactly the trait the word denotes.',
    },
    {
      id: 2,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "clandestine" most nearly means:',
      quote:
        '"...Pemberton noticed small, clandestine disturbances in the rhythm of his business: a wholesaler who had supplied him for twenty years suddenly could not source a routine consignment..."',
      options: [
        "Loud and openly hostile.",
        "Hidden, secret, conducted out of view.",
        "Government-mandated and lawful.",
        "Accidental and unintentional.",
      ],
      correctIndex: 1,
      explanation:
        'The "clandestine" disturbances are deliberately concealed pressures whose source is not openly named — the very definition of the word.',
    },
    {
      id: 3,
      kind: "tone-purpose",
      prompt:
        'The narrator describes Pemberton\'s tone as "droll" rather than simply "funny." Why?',
      options: [
        '"Droll" and "funny" are exact synonyms; the choice is purely stylistic.',
        '"Droll" carries the sense of dry, understated, slightly ironic humor — exactly the register of a quiet shopkeeper who never raises his voice — while "funny" would suggest an open, unrestrained kind of comedy.',
        '"Droll" implies cruelty, while "funny" implies kindness.',
        '"Droll" specifically refers to physical comedy.',
      ],
      correctIndex: 1,
      explanation:
        '"Droll" is dry and understated. It fits Pemberton, whose humor is delivered without flourish — and would not fit the "boisterous" auctioneer the passage explicitly contrasts him with.',
    },
    {
      id: 4,
      kind: "inference",
      prompt:
        "Based on the passage, what can the reader most reasonably infer about why Pemberton's open letter was effective in stopping the campaign against him?",
      options: [
        "It threatened the chain with legal action and forced a settlement.",
        "By laying out the sequence of calls and offers as facts — without accusing or demanding — it made the pattern visible and politically costly for the chain to continue.",
        "The chain's executives respected him personally and were embarrassed.",
        "The local paper happened to be owned by one of his oldest customers.",
      ],
      correctIndex: 1,
      explanation:
        'The text emphasizes that the letter "attached no demand" and "asked no protest"; it simply put the facts on the table. The pressure ended once the pattern was visible — exactly the dynamic option B describes.',
    },
    {
      id: 5,
      kind: "substitution",
      prompt:
        'Which single word could replace "abhorred" in the sentence below without changing its meaning?',
      quote:
        '"...he had abhorred only one thing in his trade: the boisterous, hard-selling auctioneer who turned every estate sale into a spectacle."',
      options: [
        "Admired",
        "Detested",
        "Envied",
        "Imitated",
      ],
      correctIndex: 1,
      explanation:
        '"Detested" — strongly disliked — captures the same meaning as "abhorred." The other choices reverse or distort the relationship.',
    },
    {
      id: 6,
      kind: "main-idea",
      prompt:
        "Which sentence best summarizes the central idea or arc of the passage?",
      options: [
        "A small antiques shop closes after a national chain successfully buys out its lease and renames its storefront.",
        "An aging shopkeeper learns that running an independent business has become impossible in a market dominated by chains.",
        "A patient, quietly dignified shopkeeper resists a clandestine pressure campaign by a competitor by simply documenting it in a calm public letter.",
        "A national chain rescues a struggling antiques dealer by offering him a generous consulting role.",
      ],
      correctIndex: 2,
      explanation:
        "The arc moves from Pemberton's deliberate style of business, through the chain's clandestine pressure, to his quiet documentation of the pattern — and the conciliatory retreat that followed.",
    },
  ],
};

const MISSION_11_SET_2: SetReading = {
  title: "The Conductor Who Refused to Bow",
  subtitle:
    "A short story about a young conductor, a watchful cellist, and a sound the city had not heard in twenty years.",
  format: "Short Story",
  readingMinutes: 4,
  words: [
    "eccentric",
    "fractious",
    "limpid",
    "mawkish",
    "obeisance",
    "ostentatious",
    "panacea",
    "perfunctory",
    "perilous",
    "pervasive",
  ],
  passage: `When Markov took over the city orchestra, he inherited two reputations: that of his predecessor — an **ostentatious** conductor whose **mawkish** interpretations of late Romantic repertoire had made him a fixture on local television — and that of the orchestra itself, a deeply **fractious** body whose section disputes were the **pervasive** background music of the institution. Markov had been hired specifically because he was nobody's friend.

His first rehearsal was, by his own admission, **perilous**. The principal cellist, an **eccentric** veteran of forty years' standing, expected newcomers to perform a small, silent **obeisance** before issuing any instruction to her section: a glance, a slight nod, an acknowledgment that her rank predated theirs. Markov, who had observed exactly this ritual in every previous post he had taken, declined this time to perform it. He greeted her by name, set down his baton, and began work.

She did not protest. She did not speak to him for three weeks.

Markov was uninterested in being a **panacea** for the orchestra's older troubles. He had not come to fix the institution; he had come to make music with it. His method was unfashionably plain. He refused **perfunctory** rehearsal — declined to wave his orchestra through a passage they all knew was uncertain — and he refused, equally, the kind of theatrical interpretation his predecessor had used to obscure the same uncertainty under emotion. What he wanted from the orchestra was a **limpid** sound: clean, transparent, allowing the music's own architecture to be heard without a performer's editorializing.

This was not, at first, popular. Subscribers used to broad gestures and sweeping ritardandos initially complained that the orchestra had become "cold." A reviewer called the new style "austere to the point of joylessness." Markov did not respond to either. He continued, week by week, to demand the same patient, transparent reading from the same patient, transparent rehearsals.

Six months in, two things happened. The principal cellist, without warning, played a difficult solo passage with a clarity she had not produced in a decade — and afterward, in the corridor, said one sentence to Markov in passing. The sentence was not friendly. It was, however, an instruction about the next passage's tempo, which is the kind of thing a colleague says to a colleague rather than the kind of thing a veteran says to an interloper. He took the note. The next rehearsal, he tried it her way. It worked.

The reviewer who had called the orchestra "joyless" came to a December concert and wrote, this time, that the new conductor's discipline had produced "a sound the city had not heard in twenty years." He did not retract his earlier review. Markov did not request a retraction. He only said, when a colleague mentioned the change, that critics, like cellists, were entitled to revise their tempo.

By spring the orchestra had its first sold-out subscription series in eight years. Markov did not bow more deeply than he had to. He bowed exactly the right amount — to the audience, to his orchestra, to nobody else — and walked offstage at the same deliberate pace he had walked on.`,
  questions: [
    {
      id: 1,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "obeisance" most nearly means:',
      quote:
        '"The principal cellist...expected newcomers to perform a small, silent obeisance before issuing any instruction to her section..."',
      options: [
        "A formal written contract.",
        "An act of submissive deference or respect, often physical.",
        "An open challenge to authority.",
        "A musical exercise performed before rehearsal.",
      ],
      correctIndex: 1,
      explanation:
        '"Obeisance" means a gesture or attitude of submissive respect — a bow, a nod, an acknowledgment of someone\'s superior rank. The cellist demanded exactly such an acknowledgment.',
    },
    {
      id: 2,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "limpid" most nearly means:',
      quote:
        '"What he wanted from the orchestra was a limpid sound: clean, transparent, allowing the music\'s own architecture to be heard without a performer\'s editorializing."',
      options: [
        "Loud and overpowering.",
        "Sentimental and emotionally charged.",
        "Clear and transparent.",
        "Dissonant and harsh.",
      ],
      correctIndex: 2,
      explanation:
        'A "limpid" sound is clear and transparent — water-like in its clarity. The author\'s own gloss ("clean, transparent, allowing the music\'s own architecture to be heard") is the definition.',
    },
    {
      id: 3,
      kind: "tone-purpose",
      prompt:
        'The narrator describes the orchestra as "fractious" rather than simply "argumentative." Why?',
      options: [
        '"Fractious" implies the disputes were warm and friendly.',
        '"Fractious" suggests an institution chronically prone to splintering and discord — a structural disposition rather than the specific arguments "argumentative" would imply — fitting an orchestra whose disputes were the "pervasive background music" of the place.',
        '"Fractious" means the orchestra was small.',
        '"Fractious" specifically refers to disagreements about salary.',
      ],
      correctIndex: 1,
      explanation:
        '"Fractious" describes a chronic disposition to discord. It captures the institutional pattern the next sentence ("pervasive background music") makes explicit — the conflicts were not isolated arguments but a steady condition.',
    },
    {
      id: 4,
      kind: "inference",
      prompt:
        "Based on the passage, what can the reader most reasonably infer about the meaning of the principal cellist's brief instruction to Markov in the corridor?",
      options: [
        "She was attempting to provoke him into another argument.",
        "Without saying so, she had begun to treat him as a peer rather than as an unwelcome interloper.",
        "She had been ordered by management to apologize.",
        "She was hoping to be promoted to the conducting podium herself.",
      ],
      correctIndex: 1,
      explanation:
        'The text spells this out: the unfriendly tone is overshadowed by the fact that giving a tempo note is "the kind of thing a colleague says to a colleague." The shift in posture is the point of the scene.',
    },
    {
      id: 5,
      kind: "substitution",
      prompt:
        'Which single word could replace "ostentatious" in the sentence below without changing its meaning?',
      quote:
        '"...his predecessor — an ostentatious conductor whose mawkish interpretations of late Romantic repertoire had made him a fixture on local television..."',
      options: [
        "Modest",
        "Showy",
        "Inexperienced",
        "Anonymous",
      ],
      correctIndex: 1,
      explanation:
        '"Showy" — designed to attract attention through display — captures the same meaning as "ostentatious." The contrast with Markov\'s plain style throughout the passage confirms the reading.',
    },
    {
      id: 6,
      kind: "main-idea",
      prompt:
        "Which sentence best summarizes the central idea or arc of the passage?",
      options: [
        "A new conductor abandons his principles after pressure from subscribers, critics, and a powerful principal cellist.",
        "A young conductor uses theatrical gestures to win over a hostile orchestra.",
        "A disciplined new conductor refuses both ritual deference and theatrical interpretation, and quietly produces, over a season, the kind of clarity an orchestra had been missing for years.",
        "A reviewer ruins a young conductor's career with a single early review of an opening concert.",
      ],
      correctIndex: 2,
      explanation:
        "The arc moves from Markov's refusal to bow, through his patient rehearsal style, to the cellist's first peer-level note and the reviewer's eventual revision — all driven by the same disciplined clarity.",
    },
  ],
};

const MISSION_11_SET_3: SetReading = {
  title: "The Restaurant Critic and the Sham",
  subtitle:
    "A short story about a four-hundred-dollar dinner, a killed column, and a newsletter that found its readers.",
  format: "Short Story",
  readingMinutes: 4,
  words: [
    "preclude",
    "predilection",
    "rapacious",
    "relish",
    "satirical",
    "sham",
    "skirt",
    "sluggish",
    "spartan",
    "truculent",
  ],
  passage: `When Ramona Vahl, restaurant critic for *The Citywire*, agreed to review the much-hyped opening of Lumière, she suspected — though she did not yet know — that the visit would not **preclude** controversy. The restaurant's owners, a pair of Manhattan investors with a known **predilection** for marketing over cuisine, had spent six months carefully **skirting** the city's labor regulations and what little remained of its honest food press. Their PR firm had secured eighteen advance features, a cover photo, and a guest list at the soft opening that included no actual critics.

Ramona was, in this regard, a problem. She did not **relish** scandal — her usual register was warm, generous, even forgiving of small failures — but she abhorred, in a way her colleagues found old-fashioned, the **sham** dressing of an empty kitchen as a full one. She had built her column over fifteen years on a single principle: that a restaurant deserved the kind of review its food deserved, and not the kind its publicist had paid for in advance.

She booked a table under another name. She arrived on a Wednesday. The dining room was beautiful and the service was **sluggish** — not amateur, just bored — and the menu, when she read it, contained six dishes she had eaten elsewhere, prepared elsewhere, and credited elsewhere by a chef whose name was nowhere on Lumière's masthead. She ordered three of them. She made notes between courses.

The food was not bad. It was, in fact, technically competent — the sort of food that any of a hundred kitchens in the city could produce, in **spartan** style, without claiming the four-star presentation Lumière had written into its press kit. The wine list was **rapacious**, with markups roughly twice the city's average and a surcharge for "decanting" she had never seen before. Her bill came to four hundred and twenty dollars before tip. The waiter, when she paid, was briefly **truculent** about a small complaint and then, recognizing nothing, became professional again.

She wrote the review the next morning, in a single sitting. It was not unkind, exactly. It was **satirical** — sharp where it needed to be, exact where it could afford to be, and devastating, paragraph by paragraph, in its quiet documentation of every borrowed dish, every inflated price, and every claim in the press kit that the restaurant did not, in fact, deliver. She filed it at noon.

The newspaper killed it.

The reasons given were procedural: an "ongoing relationship" with one of the investors, a "concern about tone," a "preference for waiting until the restaurant has settled in." Ramona listened, asked one question — whether the column would run as written, with edits, or not at all — and on receiving an answer she did not like, she resigned the column at three o'clock the same day.

The piece appeared, in slightly longer form, on her own newsletter the following Monday. By the end of the week it had been read by more people than her column had reached in any month of the previous year. Two of the borrowed dishes were quietly removed from Lumière's menu within ten days. The decanting surcharge survived another month and then, also quietly, disappeared.

Ramona did not return to *The Citywire*. She did, however, send the editor a thank-you note. "You **precluded** me," she wrote, "from staying in a job I had begun, without quite admitting it, to find too small. I owe you the column I am now writing alone."`,
  questions: [
    {
      id: 1,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "sham" most nearly means:',
      quote:
        '"...she abhorred, in a way her colleagues found old-fashioned, the sham dressing of an empty kitchen as a full one."',
      options: [
        "An honest if imperfect attempt.",
        "A deceptive imitation; something pretending to be what it is not.",
        "A traditional method handed down through generations.",
        "An expensive luxury restaurant.",
      ],
      correctIndex: 1,
      explanation:
        '"Sham" denotes a deceptive imitation — exactly what Ramona objects to: a kitchen passing itself off as something it is not.',
    },
    {
      id: 2,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "rapacious" most nearly means:',
      quote:
        '"The wine list was rapacious, with markups roughly twice the city\'s average and a surcharge for decanting she had never seen before."',
      options: [
        "Modest and reasonably priced.",
        "Predatory and aggressively grasping, especially for money.",
        "Carefully curated by a sommelier.",
        "Limited to a small number of vintages.",
      ],
      correctIndex: 1,
      explanation:
        '"Rapacious" describes greedy, predatory grasping. The doubled markups and unusual surcharge are exactly the practices the word names.',
    },
    {
      id: 3,
      kind: "tone-purpose",
      prompt:
        'The narrator calls Ramona\'s review "satirical" rather than simply "negative." Why?',
      options: [
        '"Satirical" and "negative" mean the same thing in this context.',
        '"Satirical" suggests a sharp, intelligent critique that uses precise documentation rather than open hostility — a register that fits Ramona\'s habit of letting the facts indict the restaurant on their own.',
        '"Satirical" implies the review was meant as a joke and not seriously.',
        '"Satirical" specifically refers to political writing.',
      ],
      correctIndex: 1,
      explanation:
        'A satirical review uses sharpness and precision to expose pretense. The author emphasizes that the piece was "not unkind, exactly," but devastating in its documentation — exactly the satirical register.',
    },
    {
      id: 4,
      kind: "inference",
      prompt:
        "Based on the passage, what can the reader most reasonably infer about why Ramona resigned her column the same day rather than negotiating with the editor?",
      options: [
        "She had received a more lucrative offer earlier that morning.",
        "Once the paper signaled it would not run an honest review of a restaurant she had just documented as a sham, the central principle on which she had built her column for fifteen years had been quietly removed.",
        "She had been planning to retire and was simply waiting for an excuse.",
        "She believed the editor would change his mind if she walked out dramatically.",
      ],
      correctIndex: 1,
      explanation:
        'The closing thank-you note makes the reasoning explicit: she was "in a job I had begun, without quite admitting it, to find too small" — i.e., the paper had stopped supporting the principle that defined the work.',
    },
    {
      id: 5,
      kind: "substitution",
      prompt:
        'Which single word could replace "sluggish" in the sentence below without changing its meaning?',
      quote:
        '"The dining room was beautiful and the service was sluggish — not amateur, just bored..."',
      options: [
        "Brisk",
        "Lethargic",
        "Aggressive",
        "Anonymous",
      ],
      correctIndex: 1,
      explanation:
        '"Lethargic" — slow and lacking in energy — captures the same meaning as "sluggish." "Brisk" is the opposite.',
    },
    {
      id: 6,
      kind: "main-idea",
      prompt:
        "Which sentence best summarizes the central idea or arc of the passage?",
      options: [
        "A restaurant critic destroys a promising new restaurant out of personal jealousy of its investors.",
        "A newspaper successfully shields one of its commercial relationships by quietly burying an honest review.",
        "A veteran critic, denied the right to publish an honest review of a sham restaurant, walks away from her column and finds, in a smaller venue, a larger and freer readership.",
        "A young critic learns that newspapers always protect their advertisers and decides to leave journalism altogether.",
      ],
      correctIndex: 2,
      explanation:
        "The arc moves from Ramona's careful documentation of Lumière, through the paper's refusal to publish, to her resignation and the unexpectedly larger reach of the same piece on her own newsletter.",
    },
  ],
};

const MISSION_12_SET_1: SetReading = {
  title: "The Founder's Last Board Meeting",
  subtitle:
    "A short story about a quiet defense, a venture partner in a hurry, and the difference between buying time and winning the room.",
  format: "Short Story",
  readingMinutes: 4,
  words: [
    "acrimonious",
    "belligerent",
    "beneficent",
    "canny",
    "cavalier",
    "distressed",
    "dwindling",
    "eclipse",
    "encyclopedic",
    "exacerbate",
  ],
  passage: `When the board of Hartline Imaging convened its quarterly meeting in October, every person present knew the meeting would be **acrimonious**. The company's lead investor, a venture firm called Pellet Capital, had been openly campaigning for six weeks to remove the founder, Dr. Saima Nair, from her role as CEO. The pretext was a quarter of **dwindling** revenue; the real reason, as everyone in the room privately understood, was a clash of temperaments that had been allowed, over four years, to **exacerbate** small disagreements into structural ones.

Dr. Nair was not **belligerent** by nature. She had, over a long career, built two previous companies and sold them at modest, sensible multiples. Her **encyclopedic** knowledge of the field — every patent, every competitor, every regulatory shift in three jurisdictions — was the reason Pellet had invested in the first place. But the partner who now wanted her out was new to the seat and had taken what one of the directors privately called a **cavalier** view of how easily a founder could be replaced.

She arrived ten minutes early. She had with her a single folder, a cup of tea, and the expression of someone who had not slept well but had decided, somewhere around four in the morning, to stop being **distressed** about it. The Pellet partner, a **canny** young man named Owen Faraday, was already at the head of the table.

The opening discussion was procedural. The product update was efficient. Then, with the ease of a man accustomed to short meetings, Faraday tabled a motion to begin a "leadership review process" — a phrase that, in the language of his industry, meant exactly what it was designed to mean. He spoke for six minutes. He used the word "stewardship" four times. He did not, at any point, address Dr. Nair by name.

She asked, when he had finished, for ten minutes. She received them.

What she presented was not a defense. It was a sequence: the company's full quarterly performance against not the optimistic projections Pellet had insisted on writing into the term sheet, but against the more conservative ones she had submitted — and Pellet had rejected — at the same negotiation. By that benchmark, the quarter was on plan. By the patent timeline, the company was nine weeks ahead of schedule. By the regulatory pipeline, the company was, for the first time in its history, in a position to **eclipse** its nearest competitor by mid-summer.

She was not **beneficent** in the presentation. She did not soften her facts to spare anyone. She did, however, decline to attack Faraday personally. "I do not believe," she said quietly, "that this board needs to be told what kind of company it has. It needs only to be told what kind of quarter it is reading."

Three of the seven directors, including two who had arrived prepared to vote with Pellet, asked to defer the leadership motion until the spring board meeting. Faraday, canny enough to know when to fold and when to dig in, agreed to the deferral on the condition that the board receive monthly updates. Dr. Nair accepted the condition without comment. The meeting adjourned at noon.

She did not celebrate. She knew, walking out, that she had bought six months — not won six years — and that the second meeting would be, in some quiet way, even harder than this one had been. But she also knew, for the first time in a quarter, that she would still be the one walking into it.`,
  questions: [
    {
      id: 1,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "exacerbate" most nearly means:',
      quote:
        '"...a clash of temperaments that had been allowed, over four years, to exacerbate small disagreements into structural ones."',
      options: [
        "Resolve or finally settle.",
        "Make worse or more intense.",
        "Translate into legal terms.",
        "Hide from public view.",
      ],
      correctIndex: 1,
      explanation:
        '"Exacerbate" means to worsen or intensify. Small disagreements being allowed, over years, to grow into structural ones is exactly that escalation.',
    },
    {
      id: 2,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "canny" most nearly means:',
      quote:
        '"The Pellet partner, a canny young man named Owen Faraday, was already at the head of the table."',
      options: [
        "Naive and inexperienced.",
        "Shrewd, astute, and skilled at calculating advantage.",
        "Easily distracted.",
        "Personally generous and warm-hearted.",
      ],
      correctIndex: 1,
      explanation:
        '"Canny" describes shrewd, calculating intelligence. The next page confirms it: he was "canny enough to know when to fold and when to dig in."',
    },
    {
      id: 3,
      kind: "tone-purpose",
      prompt:
        'The narrator describes the meeting as "acrimonious" rather than simply "tense." Why?',
      options: [
        '"Acrimonious" specifies bitterness and personal hostility — exactly the kind of disagreement that has been allowed to fester for years — which "tense" would understate.',
        '"Acrimonious" and "tense" mean exactly the same thing.',
        '"Acrimonious" suggests the parties were polite to one another.',
        '"Acrimonious" implies the meeting took place outdoors.',
      ],
      correctIndex: 0,
      explanation:
        '"Acrimonious" carries a specifically bitter, personally hostile edge. That edge fits a four-year clash of temperaments far better than the merely uncomfortable register of "tense."',
    },
    {
      id: 4,
      kind: "inference",
      prompt:
        "Based on the passage, what can the reader most reasonably infer about why three directors who had arrived prepared to vote with Pellet asked to defer the motion?",
      options: [
        "They were intimidated by Faraday's confident manner and chose to wait him out.",
        "Dr. Nair's measured, fact-based account of the quarter — judged against her own conservative projections — undermined the premise that her leadership had failed.",
        "They had received private calls from Pellet asking them to delay the vote.",
        "They believed Dr. Nair would resign voluntarily within the week.",
      ],
      correctIndex: 1,
      explanation:
        "Dr. Nair's ten-minute presentation reframed the quarter as on-plan against her own forecast and ahead of schedule on patents and regulation — pulling the factual rug out from under the leadership-review motion.",
    },
    {
      id: 5,
      kind: "substitution",
      prompt:
        'Which single word could replace "dwindling" in the sentence below without changing its meaning?',
      quote:
        '"The pretext was a quarter of dwindling revenue..."',
      options: [
        "Surging",
        "Diminishing",
        "Stable",
        "Borrowed",
      ],
      correctIndex: 1,
      explanation:
        '"Diminishing" — gradually decreasing — captures the same meaning as "dwindling."',
    },
    {
      id: 6,
      kind: "main-idea",
      prompt:
        "Which sentence best summarizes the central idea or arc of the passage?",
      options: [
        "A founder is forced out of her own company by a venture firm despite her strong performance.",
        "A founder uses a quiet, fact-based ten-minute presentation to defer a leadership challenge — buying time, not victory, but enough of it to remain in the room for the next round.",
        "A board of directors votes unanimously to dismiss a CEO who has lost their confidence.",
        "A venture partner persuades a board to replace an experienced founder with a younger one.",
      ],
      correctIndex: 1,
      explanation:
        "The arc moves from the acrimonious setup, through Dr. Nair's careful presentation against her own conservative forecast, to the deferral and her quiet recognition that she has bought time rather than won the war.",
    },
  ],
};

const MISSION_12_SET_2: SetReading = {
  title: "The Translator and the Bestseller",
  subtitle:
    "A short story about a lucrative offer, a thriller indistinguishable from a hundred others, and a translator who let her bookshelves win.",
  format: "Short Story",
  readingMinutes: 4,
  words: [
    "exasperated",
    "fungible",
    "hackneyed",
    "incongruous",
    "interchangeable",
    "laconic",
    "lucrative",
    "magisterial",
    "onerous",
    "opprobrium",
  ],
  passage: `When Iren Sándor's agent forwarded the offer from Northedge Press, the email arrived with three exclamation marks and a subject line that said, simply, "READ THIS." Iren read it twice. The figure on the contract — for a single twelve-month translation — was the most **lucrative** sum she had been offered in twenty-two years of literary work. The novel, an American thriller called *Ash Country*, had sold four million copies in English and was about to be auctioned in eleven languages. Whoever brought it to Hungarian would be, in publishing terms, briefly inescapable.

Iren read the novel that weekend. By Monday morning she was **exasperated** in a way she had not felt in years. The book was not bad in any technical sense. It was, however, profoundly **hackneyed** — a string of plot beats so familiar that, two pages in, she could predict the next eighty — wrapped in prose so smooth and **interchangeable** that any of a dozen working thriller writers could have produced it without changing the cover. The book was, in the technical sense her economics professor had once used, **fungible**: a unit of entertainment without distinguishing properties.

She called her agent and declined.

The agent's reaction was, predictably, **magisterial** — a long, slow lecture about the economics of mid-career translation, the **onerous** terms of her current contracts, the difficulty of saying no to a publisher who would now, almost certainly, never offer her anything else. He was not wrong about any of it. Iren listened. When he had finished, she said only that she had spent two decades translating books she believed in and had no plan to spend the third translating books she did not. The agent, whose loyalty exceeded his patience, said he would relay her decision in his own, more diplomatic words.

She knew there would be **opprobrium**. The Hungarian translation community was small, and word of a refusal that size travels in hours. Within a week she had received four messages from colleagues — two indignant, one merely puzzled, one quietly congratulatory — and an unexpected invitation to lecture at a small conference in Pécs the following month. The lecture, she decided, would be on the difference between translating a sentence and translating a book.

The lecture, when she gave it, was characteristically **laconic**: forty-eight minutes of carefully chosen examples, almost no theoretical apparatus, and one slide containing the single sentence *Not every offer is a question.* The room, half full of literary translators who had also been approached by Northedge that month and had not declined, was very quiet.

*Ash Country* eventually appeared in Hungarian, translated by a younger colleague Iren respected. The book sold, as predicted, hugely. Reviewers found the translation competent. Iren, when asked at a party that fall whether she regretted her decision, said it would be **incongruous** for her to regret anything that had given her back her own calendar. She used the word in its old, exact sense — a thing that does not fit the surrounding facts — and meant, by it, that her bookshelves and her bank account had been having different conversations for some time, and she had, at last, let her bookshelves win.`,
  questions: [
    {
      id: 1,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "hackneyed" most nearly means:',
      quote:
        '"It was, however, profoundly hackneyed — a string of plot beats so familiar that, two pages in, she could predict the next eighty..."',
      options: [
        "Strikingly original and unfamiliar.",
        "Worn out from overuse; clichéd and unoriginal.",
        "Translated from another language.",
        "Marketed primarily to younger readers.",
      ],
      correctIndex: 1,
      explanation:
        '"Hackneyed" describes something so often used it has lost freshness. The familiarity of the plot beats — predictable two pages in — is the textbook example.',
    },
    {
      id: 2,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "fungible" most nearly means:',
      quote:
        '"The book was, in the technical sense her economics professor had once used, fungible: a unit of entertainment without distinguishing properties."',
      options: [
        "Highly customized and unique.",
        "Mutually substitutable; able to be replaced by another unit of the same kind without loss.",
        "Subject to spoilage or decay.",
        "Limited in supply and therefore valuable.",
      ],
      correctIndex: 1,
      explanation:
        'In economics, "fungible" goods are mutually substitutable. The author\'s gloss — "a unit of entertainment without distinguishing properties" — is exactly that meaning applied to a novel.',
    },
    {
      id: 3,
      kind: "tone-purpose",
      prompt:
        'The narrator calls the agent\'s reaction "magisterial" rather than simply "stern." Why?',
      options: [
        '"Magisterial" suggests a lofty, authoritative manner — a man delivering a lecture from a higher seat — which captures both his confidence and the asymmetry he assumes between his expertise and Iren\'s decision, in a way "stern" would not.',
        '"Magisterial" implies the agent was a magistrate by profession.',
        '"Magisterial" and "stern" mean exactly the same thing.',
        '"Magisterial" suggests warmth and shared understanding.',
      ],
      correctIndex: 0,
      explanation:
        '"Magisterial" connotes the manner of a master or authority. The "long, slow lecture" register that follows is the precise scene that word evokes.',
    },
    {
      id: 4,
      kind: "inference",
      prompt:
        "Based on the passage, what can the reader most reasonably infer about the silence in the room during Iren's lecture?",
      options: [
        "The audience could not understand her examples and were waiting for her to translate them into English.",
        "Many in the room had quietly accepted similar offers themselves, and Iren's argument — without naming anyone — had landed unmistakably close to home.",
        "The room was almost empty.",
        "The audience was offended that she had refused such a lucrative contract.",
      ],
      correctIndex: 1,
      explanation:
        'The narrator notes the room was "half full of literary translators who had also been approached by Northedge that month and had not declined." The silence is the discomfort of recognition, not confusion.',
    },
    {
      id: 5,
      kind: "substitution",
      prompt:
        'Which single word could replace "onerous" in the sentence below without changing its meaning?',
      quote:
        '"...the onerous terms of her current contracts..."',
      options: [
        "Lenient",
        "Burdensome",
        "Rewarding",
        "Forgotten",
      ],
      correctIndex: 1,
      explanation:
        '"Burdensome" — heavy, demanding — captures the same meaning as "onerous." The other choices reverse or distort the sense.',
    },
    {
      id: 6,
      kind: "main-idea",
      prompt:
        "Which sentence best summarizes the central idea or arc of the passage?",
      options: [
        "A literary translator turns down the most lucrative offer of her career and accepts the professional cost in exchange for keeping her work aligned with her values.",
        "A translator is forced to retire because she cannot find lucrative enough commercial work.",
        "A publisher learns that bestsellers cannot be translated by serious literary translators.",
        "A translator's agent persuades her to accept a contract she had initially refused.",
      ],
      correctIndex: 0,
      explanation:
        "The arc moves from the lucrative offer, through Iren's exasperation with the book itself, to her refusal, the predicted opprobrium, and the closing line about letting her bookshelves win.",
    },
  ],
};

const MISSION_12_SET_3: SetReading = {
  title: "The Memoirist's Footnote",
  subtitle:
    "A short story about a beloved book, a drained canal, and the difference between amending a passage and annulling one.",
  format: "Short Story",
  readingMinutes: 4,
  words: [
    "parsimonious",
    "peripheral",
    "provocative",
    "renounce",
    "tempestuous",
    "tenable",
    "transgression",
    "urbane",
    "verisimilitude",
    "vitiate",
  ],
  passage: `When the historian Cora Belling published her memoir, *Walking Backward*, in the spring, the early reviews were **urbane** in their praise — the *Times* called the book "a small, exact study in **verisimilitude**," and a long piece in the *Atlantic* described its prose as **parsimonious** in the best sense, every sentence carrying twice its weight. By June it was on three bestseller lists. By August it was the subject of a careful, **provocative** essay in a literary quarterly that argued, with five paragraphs of close reading, that one of the book's most quoted scenes — a description of a midnight walk along the canal in 1989 — could not have happened as written.

The essay was not a hatchet piece. The author, a younger historian named Pell, had checked municipal records, traced the route Cora described, and concluded — politely, exhaustively — that the canal she remembered walking had been drained for repairs that entire summer. The scene, as published, was not untrue in spirit. It was, in the narrow forensic sense, untrue in geography.

Cora read the essay twice. She did not respond publicly for three days. The temptation, she would admit later, was to issue a **tempestuous** rebuttal: to argue that memoir was an art of memory, that small **peripheral** details could not be held to the standard of a court transcript, that the underlying experience the scene was meant to convey had nevertheless taken place. All of these arguments were available to her. None of them, on examination, were quite **tenable**.

She did something quieter. She wrote, in the form of a single page that her publisher agreed to insert as a new endnote in all subsequent printings, an exact account of what she had actually done that summer — walked, in fact, along a different street, on a different night, with the same friend — and an exact admission of how the published scene had, in revision, drifted. She did not **renounce** the chapter. She did not withdraw the book. She did, however, mark the **transgression** clearly, in her own handwriting at the bottom of the new note, and explain why the corrected version was, in her view, no less true to the experience for being more accurate to the facts.

The endnote was widely reprinted. Most readers thought it strengthened the book. A small number argued that any inaccuracy, once discovered, must **vitiate** the entire project — that a memoirist's authority, like a witness's, could not be partially restored. Cora considered this argument seriously. She did not, in the end, accept it. A book, she wrote in a follow-up letter to the *Atlantic*, was not a deposition; it could be amended without being annulled, and the amendment was itself part of the work.

Pell, the younger historian, sent her a brief and urbane note. He had not, he said, been trying to discredit the book. He had been, in his own academic way, paying it the compliment of close reading. Cora wrote back the same day. She thanked him. She suggested they have coffee the next time he was in the city. They did. Two years later, they coauthored a small, dry, characteristically careful essay on the ethics of revising one's own past.`,
  questions: [
    {
      id: 1,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "verisimilitude" most nearly means:',
      quote:
        '"...the Times called the book a small, exact study in verisimilitude..."',
      options: [
        "Vivid imagination unconstrained by fact.",
        "The appearance or quality of being true to life.",
        "Strict adherence to chronological order.",
        "A formal academic style of writing.",
      ],
      correctIndex: 1,
      explanation:
        '"Verisimilitude" denotes the quality of seeming true to life. Praise for a memoir on those grounds is praise for its lifelike texture.',
    },
    {
      id: 2,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "vitiate" most nearly means:',
      quote:
        '"A small number argued that any inaccuracy, once discovered, must vitiate the entire project..."',
      options: [
        "Quietly improve over time.",
        "Spoil or destroy the validity of.",
        "Translate into a more accessible style.",
        "Win wide popular acclaim for.",
      ],
      correctIndex: 1,
      explanation:
        '"Vitiate" means to spoil, impair, or destroy the legitimacy of something. The strict view here is that one inaccuracy invalidates the whole work.',
    },
    {
      id: 3,
      kind: "tone-purpose",
      prompt:
        'The narrator calls Pell\'s essay "provocative" rather than simply "critical." Why?',
      options: [
        '"Provocative" suggests an essay designed to start a serious conversation rather than merely tear the book down — fitting Pell, who is described as polite and exhaustive and is later called urbane.',
        '"Provocative" implies the essay was rude or insulting.',
        '"Provocative" and "critical" are exact synonyms in this context.',
        '"Provocative" specifies that the essay made false claims.',
      ],
      correctIndex: 0,
      explanation:
        '"Provocative" describes writing that prompts thought and response. The closing collaboration between Cora and Pell confirms the spirit was generative, not destructive.',
    },
    {
      id: 4,
      kind: "inference",
      prompt:
        "Based on the passage, what can the reader most reasonably infer about Cora's reasoning in choosing an endnote rather than a tempestuous rebuttal?",
      options: [
        "She was legally required by her publisher to issue a written correction.",
        "On examination, none of the rebuttal arguments she had available could survive close scrutiny — and an honest, public correction was a more credible response than a fight she could not actually win.",
        "She was hoping to preempt a lawsuit from the city's records office.",
        "She intended to retire from writing and wanted a tidy ending.",
      ],
      correctIndex: 1,
      explanation:
        'The passage states explicitly that the rebuttal arguments, "on examination, were not quite tenable." The endnote follows from that recognition.',
    },
    {
      id: 5,
      kind: "substitution",
      prompt:
        'Which single word could replace "renounce" in the sentence below without changing its meaning?',
      quote:
        '"She did not renounce the chapter."',
      options: [
        "Defend",
        "Disown",
        "Reread",
        "Reprint",
      ],
      correctIndex: 1,
      explanation:
        '"Disown" — formally reject or withdraw allegiance from — captures the same meaning as "renounce." She did not formally reject her own chapter; she annotated it.',
    },
    {
      id: 6,
      kind: "main-idea",
      prompt:
        "Which sentence best summarizes the central idea or arc of the passage?",
      options: [
        "A memoirist whose work is exposed as inaccurate is forced to retract her book and apologize publicly.",
        "A historian destroys a beloved memoir by publishing a damaging review based on minor factual details.",
        "A memoirist responds to a careful critique not by rebutting or retracting, but by publishing an honest endnote — preserving the work while correcting it, and turning the critic, in time, into a collaborator.",
        "A memoirist refuses to acknowledge any inaccuracy in her published work and is widely condemned for it.",
      ],
      correctIndex: 2,
      explanation:
        "The arc moves from Cora's praised memoir, through Pell's provocative essay, to her endnote and the eventual collaboration — embodying her thesis that a book can be amended without being annulled.",
    },
  ],
};

const MISSION_13_SET_1: SetReading = {
  title: "The Mediator at the Heritage Trust",
  subtitle:
    "A short story about a tangled inheritance, a hidden developer, and the only kind of settlement that could survive the truth.",
  format: "Short Story",
  readingMinutes: 4,
  words: [
    "affinity",
    "altruistic",
    "baroque",
    "byzantine",
    "compromise",
    "conciliatory",
    "countenance",
    "covert",
    "credible",
    "diffuse",
  ],
  passage: `When the Heritage Trust of Saint-Margaux invited Margit Vesh to mediate the dispute over the Demarne house, she expected, on her first reading of the file, two weeks of work. By the end of the first afternoon she had revised the estimate to two months. The dispute was **baroque** even by inheritance standards: four siblings, three cousins, a charity board, and a small museum, all with overlapping claims to a property whose own founding documents were, in the trust's own internal language, **byzantine** — an 1893 deed amended six times, two of those amendments themselves contested.

Margit had built her practice over twenty years on a single discipline: she would mediate any dispute, however **diffuse** the factions, only on the condition that she would not be paid by any of them. The trust paid her flat fee. The parties paid her nothing. This was, she insisted, less an **altruistic** gesture than a structural one — the only way she could **countenance** the work was to know, and have her parties know, that she had no incentive to favor any side.

She began with the cousins. She had a natural **affinity** for the older one, a quiet woman who reminded her of her own aunt, but she was careful, in their first meeting, to give her exactly the same time, the same questions, and the same patience she gave to the others. Her notebook was full of small marks she had developed over the years to flag her own preferences and discount them.

The trust, she discovered in the second week, had been receiving **covert** approaches from a developer who wished to convert the property into apartments. None of the four siblings had been told. The charity board had been told only obliquely. The museum had been told nothing at all. This was not, Margit decided, illegal. It was, however, the kind of fact that, once known, made every prior disagreement look smaller by comparison — and made any **compromise** built without reference to it permanently unstable.

She did not ambush the trust. She wrote, instead, a single confidential letter to the chair, asking for a full disclosure of all third-party contacts in the past eighteen months. The chair, after a brief and unproductive attempt to argue that the contacts were "preliminary" and therefore "not material," provided the letter she had requested.

Margit then convened, for the first time, all of the parties in a single room. She read the developer's letters aloud. She did not editorialize. She asked, when she had finished, whether anyone in the room would now like to revise the position they had brought to the table.

Several did. The siblings, who had been arguing about furniture, suddenly cared more about the building. The charity board, which had been **conciliatory**, became precise. The museum, which had been silent, asked an excellent question about a 1947 amendment that nobody else had read carefully. By the end of the afternoon, the room had, without Margit having to suggest it, narrowed its argument from twenty-one points of disagreement to four.

Six weeks later they had a settlement. It was not the settlement any single party had walked in wanting. It was, however, the only settlement that could **credibly** survive the disclosure of the developer's interest, which was now public, and the residents of the house — a small literary archive nobody had quite remembered to include in the original dispute — were, for the first time in a year, no longer being asked to pack.

Margit did not attend the signing dinner. She rarely did. She sent, instead, a short note to the chair: *A mediation is not won. It is only ended. I am glad we ended this one.*`,
  questions: [
    {
      id: 1,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "byzantine" most nearly means:',
      quote:
        '"...whose own founding documents were, in the trust\'s own internal language, byzantine — an 1893 deed amended six times, two of those amendments themselves contested."',
      options: [
        "Plainly written and easy to read.",
        "Excessively complicated, intricate, and hard to navigate.",
        "Written in an ancient language.",
        "Concerning religious property.",
      ],
      correctIndex: 1,
      explanation:
        '"Byzantine" describes systems or documents that are excessively intricate. A deed amended six times with two contested amendments fits the word exactly.',
    },
    {
      id: 2,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "covert" most nearly means:',
      quote:
        '"The trust...had been receiving covert approaches from a developer who wished to convert the property into apartments."',
      options: [
        "Open and publicly announced.",
        "Hidden, concealed, not openly disclosed.",
        "Invited by the parties to the dispute.",
        "Required by municipal law.",
      ],
      correctIndex: 1,
      explanation:
        '"Covert" means hidden or concealed. The very next sentences make clear that the approaches had been kept from the siblings, board, and museum.',
    },
    {
      id: 3,
      kind: "tone-purpose",
      prompt:
        'The narrator calls the dispute "baroque" rather than simply "complicated." Why?',
      options: [
        '"Baroque" implies the dispute was unimportant.',
        '"Baroque" carries the sense of ornate, elaborate complication — many overlapping parts arranged in a way that is almost decorative — which captures the proliferation of siblings, cousins, boards, and museums in a way that "complicated" alone would not.',
        '"Baroque" specifies that the dispute concerned art objects.',
        '"Baroque" means the same thing as "ancient."',
      ],
      correctIndex: 1,
      explanation:
        '"Baroque" suggests elaborate, layered ornamentation. The dispute is not just hard — it has many ornate moving parts, exactly the texture the word evokes.',
    },
    {
      id: 4,
      kind: "inference",
      prompt:
        "Based on the passage, what can the reader most reasonably infer about why Margit insisted on disclosing the developer's covert approaches to all the parties?",
      options: [
        "She wanted to embarrass the trust's chair publicly.",
        "Any settlement reached without that fact in the open would have been built on hidden information and would have collapsed once it eventually surfaced — making it not durable, no matter how well it was negotiated.",
        "She was personally opposed to apartment conversions.",
        "She had been bribed by the museum to expose the trust.",
      ],
      correctIndex: 1,
      explanation:
        'The text states that any compromise "built without reference to it" would be "permanently unstable." Disclosure was the only way to produce a settlement that could credibly survive once the truth emerged.',
    },
    {
      id: 5,
      kind: "substitution",
      prompt:
        'Which single word could replace "diffuse" in the sentence below without changing its meaning?',
      quote:
        '"...she would mediate any dispute, however diffuse the factions, only on the condition that she would not be paid by any of them."',
      options: [
        "Concentrated",
        "Scattered",
        "Wealthy",
        "Cheerful",
      ],
      correctIndex: 1,
      explanation:
        '"Scattered" — spread out, not concentrated — captures the same meaning as "diffuse" applied to factions.',
    },
    {
      id: 6,
      kind: "main-idea",
      prompt:
        "Which sentence best summarizes the central idea or arc of the passage?",
      options: [
        "A mediator forces a developer to abandon plans for an apartment conversion by exposing his approaches to the trust.",
        "A baroque inheritance dispute is resolved when a disciplined, independently paid mediator forces a covert third-party interest into the open and lets the parties rebuild their positions in light of the fact.",
        "A heritage trust is dissolved after a mediator discovers that its chair has been concealing material information from the beneficiaries.",
        "A mediator gives up on a dispute that has become too complicated to settle.",
      ],
      correctIndex: 1,
      explanation:
        "The arc moves from the byzantine setup, through Margit's discovery of the covert approaches, to the disclosure meeting and the credible six-week settlement that followed.",
    },
  ],
};

const MISSION_13_SET_2: SetReading = {
  title: "The Film Editor's Cut",
  subtitle:
    "A short story about three hard drives, one stubborn director, and a small dark room at midnight.",
  format: "Short Story",
  readingMinutes: 4,
  words: [
    "documentary",
    "exhaustive",
    "exhilarating",
    "extraneous",
    "fervor",
    "futile",
    "illusory",
    "invidious",
    "lethargic",
    "metaphorical",
  ],
  passage: `The first cut of *Bornholm Light* — the **documentary** Lukas had been editing for nineteen months — was four hours and seven minutes long. The director, a charismatic younger filmmaker named Pia, had returned from Denmark with three hard drives of footage and a **fervor** for what she called "the visual essay," which she pronounced as a single noun whose meaning had been settled in advance. Lukas had been hired, in part, to slow her down.

The film's subject was clear: the seasonal collapse of a small fishing community over a single year. The interviews, when Lukas first watched them in their **exhaustive** entirety, were quiet, surprising, occasionally **exhilarating** — the sort of testimony that any editor in the world would have killed to assemble. The trouble was not the interviews. The trouble was Pia's insistence on intercutting them with what she called "**metaphorical** breath": long, beautifully composed shots of fog over water, of empty nets, of gulls turning slowly over a pier.

Lukas did not object to any of these shots in isolation. Each was, on its own, beautiful. But pasted into the cut at the rate Pia wanted them, they began to feel — to him, watching the fourth assembly in a small dark room at midnight — **lethargic**, weighing the film down where the interviews wanted to lift it. Worse, several of the cutaways, whose poetic resonance Pia defended with great patience, were beginning to look **illusory** — to suggest, by juxtaposition, claims about cause and effect that the interviewees had not quite made and that the underlying reporting could not, on examination, support.

He raised the issue carefully. Pia, who had spent two cold winters in Bornholm and who knew the place better than he ever would, took the criticism harder than he had hoped. There was a brief, painful argument in which she accused him, not unfairly, of treating her style as **extraneous** ornament rather than as the film's argument. He acknowledged the charge. He did not, however, withdraw the note.

What followed was a slow, careful negotiation. Lukas did not ask Pia to remove the metaphorical footage. He asked her, instead, to identify the three specific moments in the film where the interviews most needed unbroken attention — the moments where, in his judgment, even the most beautiful cutaway would feel **invidious** rather than supportive. She agreed to the exercise. She did the work. The three moments she chose were, almost exactly, the three moments he would have chosen himself.

The negotiation around the rest of the film took another four weeks. By the end, the cut was three hours and one minute long. Pia had kept most of her metaphorical footage. Lukas had kept the three protected stretches. Neither of them had been asked, at any point, to **futilely** defend a position they no longer held.

The film premiered in Copenhagen in October. It was praised, in roughly equal measure, for its restraint and for its imagery — a balance that few critics noticed had been deliberately negotiated in a small dark room at midnight, and that fewer still would ever know had been the result not of a single vision but of a careful, two-person argument that had refused, at any point, to become a fight.`,
  questions: [
    {
      id: 1,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "extraneous" most nearly means:',
      quote:
        '"There was a brief, painful argument in which she accused him, not unfairly, of treating her style as extraneous ornament rather than as the film\'s argument."',
      options: [
        "Central and indispensable.",
        "Irrelevant to the central matter; coming from outside the essential subject.",
        "Expensive to produce.",
        "Specifically Danish in origin.",
      ],
      correctIndex: 1,
      explanation:
        '"Extraneous" means non-essential, outside the core. Pia\'s charge is precisely that Lukas was treating her cutaways as decorative trim rather than as part of the film\'s argument.',
    },
    {
      id: 2,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "illusory" most nearly means:',
      quote:
        '"...several of the cutaways...were beginning to look illusory — to suggest, by juxtaposition, claims about cause and effect that the interviewees had not quite made..."',
      options: [
        "Truthful and well documented.",
        "Producing a deceptive impression; based on illusion rather than reality.",
        "Brightly colored and visually striking.",
        "Inserted by the studio without the director's permission.",
      ],
      correctIndex: 1,
      explanation:
        '"Illusory" describes something that produces a deceptive appearance. The cutaways, by juxtaposition, were implying causal claims that the actual reporting did not support.',
    },
    {
      id: 3,
      kind: "tone-purpose",
      prompt:
        'The narrator describes Pia\'s commitment to her visual essay as "fervor" rather than simply "enthusiasm." Why?',
      options: [
        '"Fervor" implies religious devotion specifically.',
        '"Fervor" carries the sense of an intense, almost evangelical conviction — fitting a director who has settled the meaning of her style in advance — while "enthusiasm" would be too mild a word for that intensity.',
        '"Fervor" and "enthusiasm" mean exactly the same thing here.',
        '"Fervor" implies the director\'s commitment is insincere.',
      ],
      correctIndex: 1,
      explanation:
        '"Fervor" denotes a passionate, sometimes uncritical intensity. It captures Pia\'s pre-settled conviction in her stylistic frame in a way "enthusiasm" would understate.',
    },
    {
      id: 4,
      kind: "inference",
      prompt:
        "Based on the passage, what can the reader most reasonably infer about why Lukas asked Pia to identify the three moments needing unbroken attention herself?",
      options: [
        "He wanted her to do his job for him so he could leave the project early.",
        "By having her perform the analysis, he avoided dictating from authority and allowed her to arrive — through her own judgment — at the same protected stretches he would have chosen, preserving both the cuts and her ownership of the film.",
        "He wanted to test whether she actually knew the footage well.",
        "Studio policy required the director to make all final cut decisions.",
      ],
      correctIndex: 1,
      explanation:
        'The exercise turns a contested editing note into a shared judgment, and the closing line about a "two-person argument that had refused...to become a fight" makes the strategy explicit.',
    },
    {
      id: 5,
      kind: "substitution",
      prompt:
        'Which single word could replace "lethargic" in the sentence below without changing its meaning?',
      quote:
        '"...they began to feel...lethargic, weighing the film down where the interviews wanted to lift it."',
      options: [
        "Energetic",
        "Sluggish",
        "Witty",
        "Brief",
      ],
      correctIndex: 1,
      explanation:
        '"Sluggish" — slow, lacking energy — captures the same meaning as "lethargic." The image of weighing the film down confirms the reading.',
    },
    {
      id: 6,
      kind: "main-idea",
      prompt:
        "Which sentence best summarizes the central idea or arc of the passage?",
      options: [
        "A film editor secretly recuts a documentary against his director's wishes and is later credited as co-director.",
        "A documentary collapses in production because two collaborators cannot agree on its style.",
        "An editor and a director resolve a deep stylistic disagreement not by argument but by a careful exercise that lets the director arrive, on her own, at the same judgments the editor was urging.",
        "A festival forces a director to shorten her film by demanding cuts the editor opposes.",
      ],
      correctIndex: 2,
      explanation:
        "The arc moves from the four-hour first cut, through Lukas's concerns, to the negotiated three-moment exercise — and the closing premiere praised for both restraint and imagery.",
    },
  ],
};

const MISSION_13_SET_3: SetReading = {
  title: "The Glassblower of Salt River",
  subtitle:
    "A short story about a desert kiln, a scathing essay, and the patient labor that made the air go quiet.",
  format: "Short Story",
  readingMinutes: 4,
  words: [
    "mimic",
    "numinous",
    "obscure",
    "overt",
    "pellucid",
    "perpetuate",
    "rational",
    "scathing",
    "subtle",
    "superficial",
  ],
  passage: `In the desert town of Salt River, the glassblower Esau Vandermeer had spent thirty years making vessels that nobody in the gallery world quite knew how to describe. His pieces were, in the strict craft sense, **pellucid** — clear, exact, almost shadowless under direct light — and in some other, harder-to-name sense **numinous**, holding the air around them in a way that made even casual visitors lower their voices. Critics either loved his work or could not see the point of it; there was rarely a middle position.

Vandermeer did not court attention. He sold most of his work through a single small gallery in Santa Fe, refused interviews, and lived in a small adobe at the edge of town with a kiln, three cats, and a library mostly composed of books on Edo-period ceramics. He held no **overt** opinions about contemporary glass. He was suspicious of artists who held many.

In his fortieth year of practice, an art-magazine writer named Donna Harris published a long, **scathing** essay arguing that Vandermeer's work was, on close inspection, "**superficial** mysticism" — a kind of decorative spirituality that mistook restraint for depth. The essay was widely shared. Other critics, who had been waiting for a respectable license to dislike the work, joined in. A retrospective scheduled for the following spring was quietly postponed.

Vandermeer did not respond. He did not, in his own phrase, "**perpetuate** other people's mistakes by repeating them aloud." He continued to work. He did not, however, change his style — did not, that is, attempt to **mimic** the harder, more **rational** geometry that several of the critics had recommended he adopt instead. The next year's pieces, when his gallery quietly assembled them, were if anything more like his earlier work, not less.

The shift, when it came, was small. A critic who had originally signed on to the dismissive essay — a younger writer named Pell who had been persuaded, briefly, by the older writer's prose — visited the gallery in person, asked to spend an afternoon alone with three of the new pieces, and left, six hours later, with a quiet note for the gallerist that he would like to write something. The piece that appeared two months later was not a recantation. It was a **subtle** correction: a careful, slow argument that what Donna Harris had read as superficial was, on extended viewing, a deeply considered restraint — and that the **obscure**, almost ascetic quality the essay had complained of was, in fact, the work's whole subject.

Pell did not retract Donna Harris's earlier essay. Vandermeer did not request a retraction. He did, however, accept a single short interview the following spring — his first in a decade — in which he answered five questions, declined three, and ended by saying that an artist owed his critics neither agreement nor argument, only the same patient labor that had brought the critics to the work in the first place.

The retrospective, when it was eventually held, was understated. Vandermeer attended for ninety minutes. He left without speaking to the press. The pieces, lit from above in a darkened room, did exactly what they had always done: they made the air around them quieter, in a way nobody, including their maker, was ever entirely able to explain.`,
  questions: [
    {
      id: 1,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "pellucid" most nearly means:',
      quote:
        '"His pieces were, in the strict craft sense, pellucid — clear, exact, almost shadowless under direct light..."',
      options: [
        "Murky and full of internal flaws.",
        "Transparently clear; allowing light to pass without distortion.",
        "Brittle and easily broken.",
        "Decorated with dense ornament.",
      ],
      correctIndex: 1,
      explanation:
        '"Pellucid" describes glass-like transparency. The author\'s own gloss — "clear, exact, almost shadowless under direct light" — is the definition.',
    },
    {
      id: 2,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "numinous" most nearly means:',
      quote:
        '"...in some other, harder-to-name sense numinous, holding the air around them in a way that made even casual visitors lower their voices."',
      options: [
        "Numbered or catalogued for sale.",
        "Suggestive of a spiritual or mysterious presence beyond the ordinary.",
        "Heavy and physically imposing.",
        "Brightly painted in many colors.",
      ],
      correctIndex: 1,
      explanation:
        '"Numinous" carries the sense of an awe-inspiring, mysterious presence. Visitors instinctively lowering their voices is the precise behavior the word evokes.',
    },
    {
      id: 3,
      kind: "tone-purpose",
      prompt:
        'The narrator calls Donna Harris\'s essay "scathing" rather than simply "negative." Why?',
      options: [
        '"Scathing" suggests a harsh, severely critical tone — caustic, almost burning — fitting an essay that explicitly accuses the work of "superficial mysticism" and gives other critics license to pile on.',
        '"Scathing" implies the essay was unfair, while "negative" would imply it was correct.',
        '"Scathing" and "negative" mean the same thing in this context.',
        '"Scathing" specifies the essay was very short.',
      ],
      correctIndex: 0,
      explanation:
        '"Scathing" denotes withering, severely critical writing. The essay\'s tone, the cascade of follow-on dismissals, and the postponed retrospective all confirm that intensity.',
    },
    {
      id: 4,
      kind: "inference",
      prompt:
        "Based on the passage, what can the reader most reasonably infer about why Vandermeer refused to change his style after the criticism?",
      options: [
        "He was too proud to accept any critical feedback at all.",
        "He believed the restraint and obscurity that the critics complained of were, in fact, the work's central subject — so adapting to them would have been to abandon the work itself, not improve it.",
        "His gallery contractually forbade him from changing his style.",
        "He was waiting for Donna Harris to retract her essay before considering changes.",
      ],
      correctIndex: 1,
      explanation:
        "Pell's later piece makes the point explicit: the obscurity the critics objected to was the work's whole subject. Adapting to mimic harder geometry would have hollowed out the work.",
    },
    {
      id: 5,
      kind: "substitution",
      prompt:
        'Which single word could replace "mimic" in the sentence below without changing its meaning?',
      quote:
        '"...did not, that is, attempt to mimic the harder, more rational geometry that several of the critics had recommended he adopt instead."',
      options: [
        "Originate",
        "Imitate",
        "Critique",
        "Refuse",
      ],
      correctIndex: 1,
      explanation:
        '"Imitate" — copy or reproduce another\'s style — captures the same meaning as "mimic." The other choices reverse or distort the relationship.',
    },
    {
      id: 6,
      kind: "main-idea",
      prompt:
        "Which sentence best summarizes the central idea or arc of the passage?",
      options: [
        "A glassblower abandons his style after a scathing review and adopts a more rational geometry to win back critics.",
        "A glassblower retires from his craft after his retrospective is postponed.",
        "A reclusive glassblower endures a wave of dismissive criticism without changing his work, and is eventually vindicated when a younger critic, on patient extended viewing, recognizes the restraint his work was always built around.",
        "A young critic destroys an older artist's career by writing a single dismissive essay.",
      ],
      correctIndex: 2,
      explanation:
        "The arc moves from the scathing essay, through Vandermeer's silent perseverance, to Pell's subtle corrective piece and the understated retrospective that follows.",
    },
  ],
};

const MISSION_14_SET_1: SetReading = {
  title: "The Reporter and the Source",
  subtitle:
    "A short story about a leak, an angry source, and the rule about treating both halves of the sentence as true.",
  format: "Short Story",
  readingMinutes: 4,
  words: [
    "acquiesce",
    "adroit",
    "amend",
    "animus",
    "apologist",
    "astringent",
    "collaborate",
    "competent",
    "correlate",
    "deride",
  ],
  passage: `When Annika Holm received the documents, she knew within twenty minutes that she had a real story. The pages — bank records, an internal memo, a chain of emails — appeared to **correlate** exactly with three rumors that had been circulating about a regional development agency for nearly a year. The trouble was that the source of the documents was a former employee of the agency whose dismissal six months earlier had left her with a public, openly stated **animus** toward the executive director.

Annika had been a reporter for twenty-two years. She knew the rule she was about to apply was the oldest one in her trade: a leak whose facts are good but whose source is angry must be reported as if both halves of that sentence were true. She did not **deride** the source. She did not flatter her either. She thanked her, took the documents, and went to work.

Her first call was to a forensic accountant — a quiet, **competent** man who had helped her on two previous stories — and asked him to verify, independently, whether the bank records told the story the source claimed they told. He took the documents, said nothing, and called back four days later. The records were genuine. The pattern was real. He could **collaborate** on a small public memo if she needed one. He would not, however, sign anything that depended on the source's interpretation of what the pattern meant.

Annika took the same care with the agency itself. She wrote, on a Friday afternoon, a long, **astringent** letter to the executive director listing every specific claim she intended to make and inviting a response. The director's lawyer wrote back in three pages. He did not, in any of those pages, deny the underlying transactions. He argued, instead, that they had been "mischaracterized" and that the agency would, if pressed, supply context. Annika asked for the context. He sent it. Most of it was useful. None of it changed the central fact.

The story, when it ran the following Wednesday, was carefully built. Annika did not, in her opening paragraphs, treat the source's animus as discrediting; she did not, in her closing ones, treat it as decoration. She simply named the source by name, described her dismissal, and let the reader weigh both halves of the situation themselves. She refused to be either an **apologist** for the agency or a vehicle for the source's personal grievance. The story was about the documents.

The agency did not, as the director's lawyer had threatened, sue. It did, two months later, **amend** several of the practices the documents had revealed and, six months after that, replace the executive director with a successor of more **adroit** temperament. The source, when Annika ran into her at a cafe the following spring, said only that she had not gotten the public reckoning she had hoped for and was, on balance, glad she had not. Annika did not **acquiesce** to the implied compliment. She said, in her usual flat tone, that the story had been the source's only as a tip; once verified, it had belonged to the readers.

She wrote no follow-up. She had, she told her editor, said what she had to say. The next story she filed was about a small library funding dispute in a town nobody had heard of. Her readers, who had grown used to her habits over twenty-two years, paid the same attention to the small story as they had to the larger one — which was, she would later say, the only review of her career she had ever wanted.`,
  questions: [
    {
      id: 1,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "animus" most nearly means:',
      quote:
        '"...the source of the documents was a former employee of the agency whose dismissal six months earlier had left her with a public, openly stated animus toward the executive director."',
      options: [
        "Affectionate respect.",
        "Strong personal hostility or ill will.",
        "Confidential nondisclosure agreement.",
        "Professional indifference.",
      ],
      correctIndex: 1,
      explanation:
        '"Animus" denotes strong personal hostility, often the kind that follows a grievance. The dismissal and openly stated grudge are exactly the conditions the word names.',
    },
    {
      id: 2,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "apologist" most nearly means:',
      quote:
        '"She refused to be either an apologist for the agency or a vehicle for the source\'s personal grievance."',
      options: [
        "A person who sincerely apologizes for past wrongs.",
        "A person who defends or justifies an institution\'s conduct, especially in the face of criticism.",
        "A reporter who specializes in retractions.",
        "A lawyer hired to negotiate settlements.",
      ],
      correctIndex: 1,
      explanation:
        'An "apologist" is someone who defends an institution or position, often unconditionally. Annika refused both that role and the opposite one — a vehicle for personal grievance.',
    },
    {
      id: 3,
      kind: "tone-purpose",
      prompt:
        'The narrator calls Annika\'s letter to the executive director "astringent" rather than simply "harsh." Why?',
      options: [
        '"Astringent" suggests a sharp, bracing precision — clean rather than cruel — fitting a reporter who lists every specific claim and invites a response, in a register more disciplined than the open hostility "harsh" would imply.',
        '"Astringent" implies the letter was sweet and flattering.',
        '"Astringent" specifies that the letter was handwritten.',
        '"Astringent" and "harsh" mean exactly the same thing here.',
      ],
      correctIndex: 0,
      explanation:
        '"Astringent" carries a clean, almost antiseptic sharpness. It fits a methodical letter that is bracing without being cruel — the register of a careful reporter, not an angry one.',
    },
    {
      id: 4,
      kind: "inference",
      prompt:
        "Based on the passage, what can the reader most reasonably infer about why Annika named the source openly and described her dismissal in the published story?",
      options: [
        "She wanted to punish the source for an earlier disagreement.",
        "By disclosing the source's animus alongside the documents, she let the reader weigh both the evidence and the motive — preserving the integrity of the story without either dismissing or hiding the leak\'s origin.",
        "She had been ordered to do so by her editor.",
        "She believed the source would deny the leak if she remained anonymous.",
      ],
      correctIndex: 1,
      explanation:
        'The text spells this out: she "named the source by name, described her dismissal, and let the reader weigh both halves of the situation themselves" — exactly the disclosure logic option B describes.',
    },
    {
      id: 5,
      kind: "substitution",
      prompt:
        'Which single word could replace "competent" in the sentence below without changing its meaning?',
      quote:
        '"Her first call was to a forensic accountant — a quiet, competent man who had helped her on two previous stories..."',
      options: [
        "Incapable",
        "Capable",
        "Famous",
        "Bored",
      ],
      correctIndex: 1,
      explanation:
        '"Capable" — possessing the necessary skill — captures the same meaning as "competent." "Incapable" is the opposite.',
    },
    {
      id: 6,
      kind: "main-idea",
      prompt:
        "Which sentence best summarizes the central idea or arc of the passage?",
      options: [
        "An investigative reporter accepts a leak from a personally aggrieved source, verifies it independently, and publishes it in a way that disclosed the source's motive without either dismissing or exploiting it.",
        "A regional development agency successfully sues a reporter for relying on a disgruntled former employee.",
        "An angry former employee uses a credulous reporter to settle a personal grievance with her old boss.",
        "A reporter quits her job in frustration after her editors refuse to publish a verified investigative story.",
      ],
      correctIndex: 0,
      explanation:
        "The arc moves from the leak, through independent verification, to the careful published story — and the eventual amendments and leadership change that confirmed the documents had been about practices rather than personalities.",
    },
  ],
};

const MISSION_14_SET_2: SetReading = {
  title: "The Music Teacher and the Prodigy",
  subtitle:
    "A short story about a quiet mother, a twelve-year-old who arrived already knowing, and the lessons two people taught each other.",
  format: "Short Story",
  readingMinutes: 4,
  words: [
    "dictate",
    "discreet",
    "divorced",
    "elitist",
    "exacting",
    "flummoxed",
    "fruitful",
    "inborn",
    "polymath",
    "reticent",
  ],
  passage: `When Mr. Halberstam first met the boy, he was prepared, by long habit, not to be impressed. Twelve-year-old prodigies had walked through his studio door for thirty-seven years; most of them turned out to be hard-working children with one early gift and an enthusiastic parent. The mother who had brought this particular boy was unusually **reticent** — she gave her son's name, paid the trial-lesson fee in cash, and said only that her son "did several things" and was, in the matter of music, looking for "a teacher rather than a coach." She declined a chair in the waiting room and waited in the car.

The boy played for fifteen minutes. By the end of the first piece, Halberstam was, for the first time in nearly two decades, **flummoxed**. The technique was advanced for the age; that was familiar. The interpretation was not. The boy was making decisions about phrasing — small, exact, repeatedly defensible decisions — that Halberstam himself had not made until his late twenties. When asked where he had learned them, the boy shrugged. "I just thought they sounded right."

The mother, when Halberstam called the next day to accept the boy as a student, allowed herself to be slightly less reserved. The boy, she explained, was a **polymath** of an unusual kind — fluent in three languages, advanced in mathematics, and, she added with a certain dry care, "almost entirely **divorced** from the social life of his school." Music was one of several things he did at a level that, in any single field, would have been considered unusual. None of these gifts had been formally cultivated; most appeared **inborn**, in the way that some children simply seem to arrive already knowing how the world works.

Halberstam was wary. He had taught two prodigies in his career and had failed, in his own private estimation, both. The first he had let his own ambition **dictate** the lesson plan; the boy had quit at sixteen. The second he had been so afraid of damaging that he had never demanded enough; the girl had drifted, brilliantly and without direction, into a small comfortable career that she herself had described, ten years later, as a disappointment. He had no intention of repeating either error.

He resolved, with this third student, to be neither **elitist** nor permissive — to teach, as he had always preferred, plainly. He set **exacting** standards. He refused, on principle, to skip foundational repertoire just because the boy could already play harder things. He kept the lessons quiet, **discreet**, and weekly, and warned the mother — who needed no warning — that he would not allow the boy to be displayed at the local competitions she had not been planning to enter him in anyway.

What followed was the most **fruitful** decade of Halberstam's teaching life. The boy did not skip the foundational repertoire. He mastered it, and then asked questions Halberstam had not been asked in thirty years and could only answer by going home and reading. By eighteen the boy had made one careful debut, refused two careless ones, and entered a small conservatory under conditions he had largely set himself. By twenty-two he was performing under his own name in three countries.

He did not credit Halberstam in interviews. Halberstam, when asked about his student by colleagues at conferences, would not be drawn beyond a single sentence: *He was the kind of student who teaches you what you didn't know you knew.* The two of them still met, twice a year, for coffee in a small unfashionable cafe. Neither said much. Both, in the long quiet between sentences, understood the lesson they had spent ten years quietly teaching each other.`,
  questions: [
    {
      id: 1,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "polymath" most nearly means:',
      quote:
        '"The boy, she explained, was a polymath of an unusual kind — fluent in three languages, advanced in mathematics, and...almost entirely divorced from the social life of his school."',
      options: [
        "A specialist confined to a single field of study.",
        "A person of wide and deep learning across multiple, often unrelated, disciplines.",
        "A child whose talent is limited to performance.",
        "A teacher who instructs in many subjects.",
      ],
      correctIndex: 1,
      explanation:
        '"Polymath" describes someone with broad expertise across many fields — exactly the boy described as advanced in music, languages, and mathematics simultaneously.',
    },
    {
      id: 2,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "exacting" most nearly means:',
      quote:
        '"He set exacting standards. He refused, on principle, to skip foundational repertoire just because the boy could already play harder things."',
      options: [
        "Lenient and easily satisfied.",
        "Demanding great care, accuracy, and effort.",
        "Inflexible to the point of unfairness.",
        "Limited to performance technique alone.",
      ],
      correctIndex: 1,
      explanation:
        '"Exacting" means demanding rigorous, precise effort. The refusal to skip foundational work confirms the standard.',
    },
    {
      id: 3,
      kind: "tone-purpose",
      prompt:
        'The narrator describes the mother as "reticent" rather than simply "shy." Why?',
      options: [
        '"Reticent" implies the mother was unintelligent, while "shy" implies the opposite.',
        '"Reticent" specifies a deliberate restraint about speaking — only saying what was necessary, no more — which fits a parent paying in cash and waiting in the car, in a way "shy" (a temperamental quality) would not.',
        '"Reticent" suggests the mother had laryngitis.',
        '"Reticent" and "shy" mean exactly the same thing.',
      ],
      correctIndex: 1,
      explanation:
        '"Reticent" describes deliberate verbal restraint. The mother\'s minimal, controlled disclosures throughout the meeting are an act of reserve, not nervousness.',
    },
    {
      id: 4,
      kind: "inference",
      prompt:
        "Based on the passage, what can the reader most reasonably infer about why Halberstam refused to skip foundational repertoire even though the boy could already play harder pieces?",
      options: [
        "He was envious of the boy's talent and wanted to slow him down.",
        "His two earlier failures with prodigies had taught him that letting either his own ambition or the student's apparent advancement set the lesson plan eventually damaged the student — so he held to a foundation neither party could rush past.",
        "The conservatory required all students to complete the same foundational program.",
        "He believed the boy's mother would object if the lessons moved too quickly.",
      ],
      correctIndex: 1,
      explanation:
        "The passage explicitly recounts both prior failures and his determination not to repeat them. Holding to the foundation is the corrective: neither dictating the pace from above nor letting it be set by the prodigy below.",
    },
    {
      id: 5,
      kind: "substitution",
      prompt:
        'Which single word could replace "discreet" in the sentence below without changing its meaning?',
      quote:
        '"He kept the lessons quiet, discreet, and weekly..."',
      options: [
        "Public",
        "Tactful",
        "Showy",
        "Improvised",
      ],
      correctIndex: 1,
      explanation:
        '"Tactful" — careful and unobtrusive — captures the same meaning as "discreet." "Public" and "showy" are the opposite.',
    },
    {
      id: 6,
      kind: "main-idea",
      prompt:
        "Which sentence best summarizes the central idea or arc of the passage?",
      options: [
        "A music teacher refuses to take on a prodigy because he is afraid of repeating his earlier failures.",
        "A child prodigy abandons music after a teacher proves too rigid to recognize his unusual gifts.",
        "A teacher with two earlier failed prodigies learns, with a third, to be neither permissive nor controlling — and quietly produces, over a decade, the most fruitful teaching relationship of his career.",
        "A mother forces a music teacher to push her son into competitions he is not ready for.",
      ],
      correctIndex: 2,
      explanation:
        "The arc moves from Halberstam's wary first impression, through his deliberate calibration against past failures, to the decade-long, quietly mutual education the lessons became.",
    },
  ],
};

const MISSION_14_SET_3: SetReading = {
  title: "The Coach Who Refused the Sponsorship",
  subtitle:
    "A short story about a tantalizing offer, a clause buried at fourteen, and a swim team whose curriculum quietly stayed its own.",
  format: "Short Story",
  readingMinutes: 4,
  words: [
    "stringent",
    "subservient",
    "surreptitious",
    "tantalizing",
    "tantamount",
    "torpor",
    "trenchant",
    "umbrage",
    "versatile",
    "wayward",
  ],
  passage: `When the offer arrived from Halton Beverages, Coach Inez Marra read it twice and set it on the corner of her desk where she kept the small pile of letters she liked to think about for a few days before answering. Halton was offering the Northgate Swim Club — a small, **versatile** youth program she had built over fifteen years from twelve children to ninety — a three-year sponsorship of an amount that would, on its face, transform the team's facilities. The figure was **tantalizing**. It was also, on closer reading, attached to terms that made it, in her quiet judgment, **tantamount** to selling a small piece of the program's independence.

The terms were not exactly punitive. Halton would not, the contract specified, "interfere with coaching decisions." It would, however, require team uniforms in the company's branding, exclusive vending in the team's pool building, and — buried in clause fourteen — the right to "consult" on the team's annual swim camp curriculum. The "consultation" was framed gently. Inez, who had been coached in her own youth by a man whose program had been quietly hollowed out by a similar arrangement, recognized the language for what it was.

She did not refuse immediately. She owed her board a discussion. She prepared, over the following week, a careful memo: a **stringent** comparison of the sponsorship's three-year cash benefit against the cumulative cost of the small concessions the contract required. The memo was, by her standards, **trenchant** — six pages, four tables, no decorative language — and she sent it to the board chair on a Tuesday afternoon.

The board's reaction was mixed. Two members wanted to take the money and were openly impatient with what one of them, taking some **umbrage**, called Inez's "philosophical objections." Three others were uncertain. The chair, an older woman who had served four coaches and trusted Inez more than she trusted any contract, asked one question: would Inez stay on as coach if the deal went through?

Inez had not planned to make her acceptance contingent. She had planned only to recommend a refusal and then defer to whatever the board decided. The chair's question, however, made the structure of the decision visible in a way the memo had not. Inez answered, after a long pause, that she would not. She did not raise her voice. She was not threatening. She simply could not, in good conscience, coach a program whose curriculum was being shaped, however **surreptitiously**, by a company whose interests did not match the children's.

The chair thanked her. The board met without her the following week and voted, four to two, to decline the sponsorship.

Halton's representative, when the decision was conveyed, was briefly aggressive and then, recognizing that no further leverage was available, professional. The team's facilities did not, of course, transform. But they did not collapse. A series of smaller, less restrictive sponsorships, secured over the following year, replaced about sixty percent of what Halton would have provided. The other forty percent was made up, slowly, by parents and a small fundraising drive that was, by every account, quietly enthusiastic.

Inez did not gloat. She did not, in fact, mention the decision again — not to her swimmers, not to her coaching colleagues, not in the program's annual letter. The team's general **torpor** at the start of the next season — the natural slow rhythm of children returning from summer — was eventually, as it always was, replaced by the noisy, **wayward**, perfectly recognizable enthusiasm of ninety swimmers who had no idea, and would never need to know, what their coach had quietly declined on their behalf.

She had not been **subservient** to the offer. She had not, equally, held her board hostage. She had simply made clear, in her quiet way, what kind of program she had spent fifteen years building, and let the people responsible for it decide whether they still wanted it built that way.`,
  questions: [
    {
      id: 1,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "tantamount" most nearly means:',
      quote:
        '"It was also, on closer reading, attached to terms that made it, in her quiet judgment, tantamount to selling a small piece of the program\'s independence."',
      options: [
        "Completely unrelated to.",
        "Equivalent in effect to; essentially the same as.",
        "A small fraction of.",
        "Required by law for.",
      ],
      correctIndex: 1,
      explanation:
        '"Tantamount" means equivalent in effect, even if not in name. The deal would not be called a sale of independence, but in practice it would amount to one.',
    },
    {
      id: 2,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "umbrage" most nearly means:',
      quote:
        '"Two members wanted to take the money and were openly impatient with what one of them, taking some umbrage, called Inez\'s philosophical objections."',
      options: [
        "Quiet agreement.",
        "Offense or resentment, especially at a perceived slight.",
        "Financial responsibility.",
        "Public praise.",
      ],
      correctIndex: 1,
      explanation:
        '"Umbrage" denotes a sense of offense or resentment. Treating Inez\'s reasoning as merely "philosophical objections" is the slight; "taking some umbrage" is the indignant reaction.',
    },
    {
      id: 3,
      kind: "tone-purpose",
      prompt:
        'The narrator calls Inez\'s memo "trenchant" rather than simply "well-argued." Why?',
      options: [
        '"Trenchant" specifies sharp, incisive, cutting clarity — six pages, four tables, no decorative language — which captures the precision of Inez\'s analysis in a way "well-argued" alone would not.',
        '"Trenchant" implies the memo was overly long.',
        '"Trenchant" and "well-argued" mean the same thing.',
        '"Trenchant" suggests the memo was full of jokes.',
      ],
      correctIndex: 0,
      explanation:
        '"Trenchant" carries a sharp, almost surgical precision. It fits a memo described as having no decorative language and matched against tables — a piece of writing that cuts.',
    },
    {
      id: 4,
      kind: "inference",
      prompt:
        "Based on the passage, what can the reader most reasonably infer about why the chair\'s question (whether Inez would stay if the deal went through) changed the structure of the decision?",
      options: [
        "It revealed that the chair was personally opposed to the sponsorship.",
        "It made the trade-off concrete: the board could not have both the sponsorship and the coach who had built the program, forcing them to weigh the cash offer against the human and institutional cost of losing her.",
        "It was a procedural requirement under the team's bylaws.",
        "It implied that Inez was bluffing about her objections.",
      ],
      correctIndex: 1,
      explanation:
        "Up to that point, the board could treat the decision abstractly. The chair's question forced the trade-off into the open and made the cost of accepting the deal visible.",
    },
    {
      id: 5,
      kind: "substitution",
      prompt:
        'Which single word could replace "stringent" in the sentence below without changing its meaning?',
      quote:
        '"She prepared, over the following week, a careful memo: a stringent comparison of the sponsorship\'s three-year cash benefit against the cumulative cost of the small concessions the contract required."',
      options: [
        "Lax",
        "Rigorous",
        "Casual",
        "Brief",
      ],
      correctIndex: 1,
      explanation:
        '"Rigorous" — strict, thorough, demanding — captures the same meaning as "stringent." "Lax" and "casual" are the opposite.',
    },
    {
      id: 6,
      kind: "main-idea",
      prompt:
        "Which sentence best summarizes the central idea or arc of the passage?",
      options: [
        "A coach uses a personal threat to force her board into rejecting a sponsorship offer she does not like.",
        "A coach delivers a careful, fact-based case against a sponsorship that would compromise her program — and lets the board, fully informed of the trade-off, decide on its own terms.",
        "A small swim team collapses after losing a major sponsorship over a clause buried in fine print.",
        "A coach accepts a lucrative sponsorship despite reservations, in order to upgrade her team\'s facilities.",
      ],
      correctIndex: 1,
      explanation:
        "The arc moves from the tantalizing offer, through the trenchant memo, to the chair's clarifying question and the board's decision — all while Inez refuses both subservience and ultimatum.",
    },
  ],
};

const MISSION_15_SET_1: SetReading = {
  title: "The Town Hall Debate",
  subtitle:
    "A short story about a rainy Tuesday hearing, four hours of testimony, and the chair who would rather a town disagreed precisely than agreed by accident.",
  format: "Short Story",
  readingMinutes: 4,
  words: [
    "alienate",
    "apathy",
    "apropos",
    "apt",
    "cloak",
    "consensus",
    "distort",
    "divergent",
    "elated",
    "enchant",
  ],
  passage: `When the small town of Calderbridge convened its first public hearing on the proposed waterfront redevelopment, the council chair, an unflappable woman named Rhona Fell, knew within the first ten minutes that the evening would not produce **consensus**. The hall was full — a fact that, in Calderbridge, was itself remarkable, because municipal **apathy** had been the town's prevailing mood for at least a decade. Tonight, three hundred residents had walked through the rain to be heard, and their views, when they began to be expressed, were sharply **divergent**.

The first speaker, a young woman who ran a small bakery on the harbor, was **elated** by the redevelopment plan and said so. The waterfront, she argued, had been allowed to decline so far that any honest improvement would be a kindness; the new design, with its mix of housing and small commerce, would, she believed, **enchant** visitors and residents alike. She spoke for four minutes. She received polite applause from roughly half the room.

The second speaker, a retired ferry captain who had lived three blocks from the harbor for fifty-one years, was less pleased. He did not, he said carefully, wish to **alienate** the bakery owner — he had bought bread from her father — but he wanted the council to know that several of the renderings the developer had circulated did not, in his view, **distort** the waterfront so much as replace it with a different waterfront altogether. The piers in the renderings were not, he pointed out, the piers that were actually there. He held up a photograph. Several heads in the audience nodded.

What followed was four hours of testimony. A planner accused the developer of using **apt** but ultimately misleading visualizations to **cloak** a denser project than the one publicly described. A developer's representative responded that the planner was reading the documents in bad faith. A schoolteacher, almost **apropos** of nothing, said that her students would benefit from a public dock; another teacher, immediately afterward, said that the same students already had a public dock, three blocks east, that the council had failed to maintain for years.

Rhona did not interrupt. She had learned, over fifteen years of chairing meetings of this kind, that the only way to surface the actual disagreement was to let it speak in its own voice. By 10:15 she had taken nine pages of notes and identified, beneath the surface, four distinct positions — three of them held by groups of residents who had not realized, when they came in, that they substantially agreed with each other.

She did not announce a vote. She announced, instead, that the council would publish a single document the following Monday: a plain, side-by-side summary of every claim made on either side, with sources, photographs, and the specific paragraphs of the developer's filings the testimony referred to. Residents would have two weeks to comment in writing. The council would meet again at the end of the month with that record in front of it.

The room, which had been preparing to be angry about an outcome, was briefly disarmed by being asked, instead, to wait for one. Several residents thanked her on the way out. One councilman, less generously, accused her in the parking lot of "trying to enchant people into agreeing with each other." She did not argue. She said only that she would rather the town disagree precisely than agree by accident, and went home to begin drafting the summary.`,
  questions: [
    {
      id: 1,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "consensus" most nearly means:',
      quote:
        '"...the council chair...knew within the first ten minutes that the evening would not produce consensus."',
      options: [
        "A formal legal contract.",
        "General agreement among a group.",
        "A unanimous show of hands.",
        "A request for further information.",
      ],
      correctIndex: 1,
      explanation:
        '"Consensus" denotes general agreement reached by a group. The hall full of sharply divergent views is exactly what makes consensus impossible that evening.',
    },
    {
      id: 2,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "cloak" most nearly means:',
      quote:
        '"A planner accused the developer of using apt but ultimately misleading visualizations to cloak a denser project than the one publicly described."',
      options: [
        "Promote openly and aggressively.",
        "Conceal or disguise behind something else.",
        "Print on a large public banner.",
        "Submit for formal regulatory review.",
      ],
      correctIndex: 1,
      explanation:
        'To "cloak" something is to hide it under a covering. The planner\'s charge is that attractive renderings were being used to conceal the project\'s true density.',
    },
    {
      id: 3,
      kind: "tone-purpose",
      prompt:
        'The narrator describes the residents\' views as "divergent" rather than simply "different." Why?',
      options: [
        '"Divergent" implies the views are slowly converging into agreement.',
        '"Divergent" specifies that the views are actively moving apart in different directions, capturing the structure of a hall in which sharply opposed positions are being expressed in turn — a precision "different" would not carry.',
        '"Divergent" and "different" mean exactly the same thing in this context.',
        '"Divergent" implies the views are mathematically related.',
      ],
      correctIndex: 1,
      explanation:
        '"Divergent" emphasizes that the positions actively pull apart in opposite directions. That structural picture fits the back-and-forth testimony better than the merely descriptive "different."',
    },
    {
      id: 4,
      kind: "inference",
      prompt:
        "Based on the passage, what can the reader most reasonably infer about why Rhona refused to call a vote that night and instead promised a written summary?",
      options: [
        "She had no legal authority to call a vote on the redevelopment.",
        "She believed the testimony had revealed several positions that the room itself had not yet recognized; a written, side-by-side record would let residents see the actual disagreement before being asked to decide on it.",
        "She was hoping the developer would withdraw the proposal before the next meeting.",
        "She wanted to delay the vote until after a council election.",
      ],
      correctIndex: 1,
      explanation:
        'The text states explicitly that she had identified, beneath the surface, "four distinct positions — three of them held by groups of residents who had not realized...that they substantially agreed with each other." The summary makes that newly visible structure shareable.',
    },
    {
      id: 5,
      kind: "substitution",
      prompt:
        'Which single word could replace "apathy" in the sentence below without changing its meaning?',
      quote:
        '"...because municipal apathy had been the town\'s prevailing mood for at least a decade."',
      options: [
        "Enthusiasm",
        "Indifference",
        "Confusion",
        "Anger",
      ],
      correctIndex: 1,
      explanation:
        '"Indifference" — a lack of interest or concern — captures the same meaning as "apathy." The contrast with the unusually full hall confirms the reading.',
    },
    {
      id: 6,
      kind: "main-idea",
      prompt:
        "Which sentence best summarizes the central idea or arc of the passage?",
      options: [
        "A council chair manipulates a public hearing to ensure the developer's preferred outcome is adopted.",
        "An angry public meeting forces the cancellation of a controversial waterfront redevelopment.",
        "A patient council chair lets a divided hearing speak in its own voice, then converts the testimony into a written record that allows residents to see — and to refine — the disagreement before any vote is taken.",
        "A developer concedes defeat after a single resident produces a photograph contradicting his renderings.",
      ],
      correctIndex: 2,
      explanation:
        "The arc moves from the apathetic baseline, through the divergent testimony, to Rhona's decision to publish a side-by-side summary rather than rush to a vote — embodying her closing line about precise disagreement.",
    },
  ],
};

const MISSION_15_SET_2: SetReading = {
  title: "The Botanist Who Said No",
  subtitle:
    "A short story about a remote highland survey, a clause in the appendix, and the standing an offer was meant to borrow.",
  format: "Short Story",
  readingMinutes: 4,
  words: [
    "entrenched",
    "exotic",
    "exploitative",
    "foreseeable",
    "forsake",
    "gratify",
    "heed",
    "judicious",
    "lucid",
    "pertinent",
  ],
  passage: `When the offer arrived from Halberd Cosmetics, Dr. Yusra Ammari read it three times before she answered. Halberd was an **entrenched** name in the global beauty industry, and the project they were proposing — a six-month expedition to catalogue rare botanical species in a remote highland region — had been designed, in their initial pitch, to sound almost academic. They wanted a botanist of her standing to lend the project its scientific credibility. The compensation was generous. The science, on first reading, was reasonable.

It was the second reading that troubled her. Buried in the appendix was a section — written in legal rather than scientific language — that specified Halberd's exclusive commercial rights to any **exotic** compound the expedition identified. Dr. Ammari, who had spent twenty-two years working with field communities in three continents, recognized the structure immediately. The expedition was not an academic survey with a commercial side benefit. It was a commercial survey with an academic disguise.

She did not write back the same day. She wanted to be sure she was not being **judicious** to the point of paranoia. She read the appendix again, the next morning, with her coffee. The compensation structure for the local communities who had cultivated and protected these plants for generations was, she calculated, less than three percent of the projected commercial value. The phrase the contract used was "consultation honoraria." The phrase that came to her own mind was less neutral: the arrangement was, in her view, openly **exploitative**.

She wrote a long, **lucid** letter declining the offer. She did not lecture. She did not, in her own phrase, "**forsake** civility for emphasis." She simply itemized the four specific clauses she found objectionable, attached the **pertinent** comparison data from a similar expedition the year before, and noted that she would be available, if Halberd wished to revise the terms substantially, to discuss a different project on different terms.

Halberd's reply was polite and unmoved. The terms, the project director wrote, were standard. The compensation to local communities was, in fact, "above market." He did not address any of her four specific clauses. He did, however, mention — apropos of nothing — that several other senior botanists had already accepted similar terms on previous projects. The implication was clear. So was the **foreseeable** consequence of refusing: she would not be approached again.

She refused anyway. She did not pretend, even to herself, that the decision did not cost her something. The expedition would have funded a year of her own postdoctoral students; the data would, in a different framing, have been genuinely valuable. But she had spent two decades arguing — in lectures, in committee meetings, in conferences in five languages — that the scientific community owed indigenous knowledge holders more than honoraria. To **gratify** Halberd by signing a contract that contradicted her own published positions would have been to lose, in a single afternoon, the standing the offer was meant to borrow.

She published, six months later, a short essay on the ethics of plant prospecting. It did not name Halberd. It did, however, describe in clean detail the kind of contract she had refused, and recommended specific revisions any community-engaged researcher should request before signing. The essay was widely read. It cost her, by her own count, two further commercial offers. It also produced, more slowly, three smaller and more honest collaborations she had not expected — collaborations in which, she would say later, the local communities had the standing to **heed** her advice or politely ignore it, which is what she had wanted in the first place.`,
  questions: [
    {
      id: 1,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "exploitative" most nearly means:',
      quote:
        '"...the arrangement was, in her view, openly exploitative."',
      options: [
        "Generously compensating all parties involved.",
        "Taking unfair advantage of others, especially for one\'s own gain.",
        "Educational in purpose and method.",
        "Highly experimental and risky.",
      ],
      correctIndex: 1,
      explanation:
        '"Exploitative" describes an arrangement that takes unfair advantage. A 3% share of projected commercial value going to communities who cultivated the plants is the textbook example.',
    },
    {
      id: 2,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "entrenched" most nearly means:',
      quote:
        '"Halberd was an entrenched name in the global beauty industry..."',
      options: [
        "New and unknown.",
        "Firmly established and difficult to dislodge.",
        "Specifically European in origin.",
        "Recently bankrupt.",
      ],
      correctIndex: 1,
      explanation:
        '"Entrenched" describes something firmly established, dug in like a fortified position. A long-dominant industry name fits the word exactly.',
    },
    {
      id: 3,
      kind: "tone-purpose",
      prompt:
        'The narrator describes Yusra\'s letter as "lucid" rather than simply "clear." Why?',
      options: [
        '"Lucid" carries a sense of intellectual clarity — transparently reasoned, easy to follow on its merits — fitting a letter that itemizes specific clauses and attaches comparison data, rather than the merely visual clarity "clear" might imply.',
        '"Lucid" means the letter was very long.',
        '"Lucid" and "clear" mean exactly the same thing here.',
        '"Lucid" implies the letter contained dreams or fantasy.',
      ],
      correctIndex: 0,
      explanation:
        '"Lucid" emphasizes intellectual transparency — reasoning that can be followed step by step. The letter\'s itemized structure is exactly what makes it lucid in that sense.',
    },
    {
      id: 4,
      kind: "inference",
      prompt:
        "Based on the passage, what can the reader most reasonably infer about why Yusra refused the offer despite the foreseeable cost to her future commercial work?",
      options: [
        "She had been offered a more lucrative contract by a competing cosmetics firm earlier that week.",
        "Accepting a contract that contradicted her own published positions would have undermined the very scientific standing the offer was relying on — losing in a single afternoon the credibility built over two decades.",
        "Her institution\'s ethics board had specifically forbidden her from signing.",
        "She had a personal grievance against the project director.",
      ],
      correctIndex: 1,
      explanation:
        'The text spells this out: signing "would have been to lose, in a single afternoon, the standing the offer was meant to borrow." Her credibility was the very asset Halberd was paying for.',
    },
    {
      id: 5,
      kind: "substitution",
      prompt:
        'Which single word could replace "heed" in the sentence below without changing its meaning?',
      quote:
        '"...the local communities had the standing to heed her advice or politely ignore it..."',
      options: [
        "Disregard",
        "Notice",
        "Mock",
        "Compose",
      ],
      correctIndex: 1,
      explanation:
        '"Notice" — pay attention to and act on — captures the same meaning as "heed." "Disregard" is the opposite, which is the alternative the sentence already names separately ("politely ignore").',
    },
    {
      id: 6,
      kind: "main-idea",
      prompt:
        "Which sentence best summarizes the central idea or arc of the passage?",
      options: [
        "A senior botanist accepts a lucrative commercial expedition despite reservations about its ethics.",
        "A botanist turns down a generous but exploitative contract because signing it would have contradicted the very scientific principles her standing was built on, and finds, more slowly, smaller and more honest collaborations on the other side of the refusal.",
        "A cosmetics company is forced to abandon its expedition after every senior botanist in the field refuses to participate.",
        "A botanist publishes a damaging exposé naming the cosmetics firm whose contract she refused.",
      ],
      correctIndex: 1,
      explanation:
        "The arc moves from the entrenched offer, through her lucid refusal, to the published essay and the three honest collaborations that eventually followed.",
    },
  ],
};

const MISSION_15_SET_3: SetReading = {
  title: "The Society Columnist",
  subtitle:
    "A short story about a thirty-year column, four anonymous accusations, and the part of the record that remained open.",
  format: "Short Story",
  readingMinutes: 4,
  words: [
    "propriety",
    "scintillating",
    "sensational",
    "sophisticated",
    "strife",
    "understated",
    "unscrupulous",
    "veracity",
    "virulent",
    "volatile",
  ],
  passage: `For thirty years, Adelheid Ivers wrote the society column for *The Quayside Observer*, and in all that time she had built her reputation on a single principle: she would print nothing she could not personally verify. The column was, in tone, **understated** — never flashy, almost never gossipy, attentive to small social details that more **sensational** writers would have ignored. Her readers, who included most of the city's older money and a careful selection of its newer money, trusted her as much for what she did not print as for what she did.

In her thirty-first year, the city was visited by a brief and **virulent** scandal. A prominent investor, recently married to a member of an old Quayside family, was the subject of a series of anonymous accusations: financial misconduct, an undisclosed earlier marriage, a possible criminal investigation in another country. Three other papers ran the accusations within days, dressing them up in **scintillating** prose and citing "sources close to the family." A national magazine offered Adelheid a substantial fee to write the same story under her byline, citing the borrowed authority of her thirty-year column.

She declined the fee. She did, however, begin, in her own quiet way, to verify what could be verified. Over six weeks she made fourteen phone calls, read three sets of public filings, and met privately with two members of the family, neither of whom was the bride or the groom. By the end of those six weeks she had established that two of the accusations were demonstrably false; one was true but minor; one — the most lurid — could not be settled either way on the available evidence.

Her column, when it appeared, was characteristically restrained. It did not name the investor in its headline. It described, in plain language, the **veracity** of each of the four accusations one at a time: which were false, which were true, which could not yet be known. It did not editorialize. It did not, in a phrase her readers would later quote, "trade in **strife** for circulation." It merely set the record where it could be set and identified, with a single sentence, the part of the record that remained open.

The reaction was mixed. The two papers that had run the lurid version did not retract; they simply moved on. The investor, through his lawyer, sent Adelheid a long and aggrieved letter accusing her of having damaged his reputation by even partially confirming the minor misconduct. She did not reply. The bride's family sent a much shorter letter thanking her for the **propriety** with which she had treated a **volatile** situation. She filed the second letter and binned the first.

A younger reporter, writing about the affair in a national journal a year later, contrasted Adelheid's handling of the story with that of a more **unscrupulous** competitor whose paper had since had to settle two defamation suits. The article praised Adelheid's column as a kind of journalism that "still believed verification was a writer's first duty." Adelheid, when a friend mentioned the piece, allowed herself one dry observation. "It is not," she said, "a particularly **sophisticated** position. It is only the old one. I have simply outlived most of the people who held it with me."

She wrote her column for another four years. When she retired, the paper did not replace her. Her readers, perhaps because they had been trained over three decades, did not entirely forgive the paper for that.`,
  questions: [
    {
      id: 1,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "veracity" most nearly means:',
      quote:
        '"It described, in plain language, the veracity of each of the four accusations one at a time..."',
      options: [
        "The popularity of an idea among readers.",
        "The truthfulness or accuracy of a claim.",
        "The legal consequences of a statement.",
        "The emotional impact of a story.",
      ],
      correctIndex: 1,
      explanation:
        '"Veracity" means truthfulness or accuracy. Reporting on each accusation\'s veracity means assessing whether each one is true.',
    },
    {
      id: 2,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "virulent" most nearly means:',
      quote:
        '"...the city was visited by a brief and virulent scandal."',
      options: [
        "Quiet and uncontroversial.",
        "Extremely severe, hostile, or rapidly damaging.",
        "Limited to a single neighborhood.",
        "Of no consequence to the public.",
      ],
      correctIndex: 1,
      explanation:
        '"Virulent" describes something extremely severe and damaging — the word evokes a fast, harmful spread, exactly the texture of a scandal that brings out four major accusations at once.',
    },
    {
      id: 3,
      kind: "tone-purpose",
      prompt:
        'The narrator describes Adelheid\'s tone as "understated" rather than simply "calm." Why?',
      options: [
        '"Understated" specifies a deliberate restraint of effect — saying less than the material would permit, by craft — which captures Adelheid\'s discipline of attending to small details and refusing to dress them up, in a way "calm" would only describe an emotional state.',
        '"Understated" implies the column was poorly written.',
        '"Understated" suggests the column was published in secret.',
        '"Understated" and "calm" mean the same thing in this context.',
      ],
      correctIndex: 0,
      explanation:
        '"Understated" describes the deliberate craft of saying less than one might. That is exactly Adelheid\'s discipline — and the contrast with "scintillating" and "sensational" later in the passage makes it sharper.',
    },
    {
      id: 4,
      kind: "inference",
      prompt:
        "Based on the passage, what can the reader most reasonably infer about why Adelheid declined the magazine\'s lucrative offer to write the scandal under her byline?",
      options: [
        "The magazine\'s editor had personally offended her in an earlier dispute.",
        "The offer was paying for the borrowed authority of her thirty-year column — and writing an unverified story under her byline would have spent that authority for a one-time fee, exactly the trade her thirty-year practice had been built to refuse.",
        "She was contractually forbidden from writing for any other publication.",
        "She believed the scandal was not interesting enough to be worth her time.",
      ],
      correctIndex: 1,
      explanation:
        "The text emphasizes the magazine was citing 'the borrowed authority of her thirty-year column.' Spending that authority on an unverified story would have permanently damaged the asset that made her byline valuable in the first place.",
    },
    {
      id: 5,
      kind: "substitution",
      prompt:
        'Which single word could replace "propriety" in the sentence below without changing its meaning?',
      quote:
        '"The bride\'s family sent a much shorter letter thanking her for the propriety with which she had treated a volatile situation."',
      options: [
        "Recklessness",
        "Decorum",
        "Indifference",
        "Curiosity",
      ],
      correctIndex: 1,
      explanation:
        '"Decorum" — appropriate conduct and judgment in delicate circumstances — captures the same meaning as "propriety." The other choices reverse or distort the sense.',
    },
    {
      id: 6,
      kind: "main-idea",
      prompt:
        "Which sentence best summarizes the central idea or arc of the passage?",
      options: [
        "A society columnist destroys an investor\'s reputation by uncritically printing anonymous accusations against him.",
        "A society columnist refuses both the easy money of writing a sensational scandal and the easy silence of ignoring it, choosing instead to verify each accusation individually and publish only what the evidence will support.",
        "A national magazine successfully buys out a respected columnist and adopts her byline for sensational stories.",
        "A society columnist retires in protest after her newspaper refuses to run her honest scandal coverage.",
      ],
      correctIndex: 1,
      explanation:
        "The arc moves from Adelheid's understated practice, through her six weeks of verification, to the careful column that ran each accusation by its veracity — and the colleague\'s retrospective tribute years later.",
    },
  ],
};

const MISSION_16_SET_1: SetReading = {
  title: "The Archivist and the Forged Letter",
  subtitle:
    "A short story about a watermark, a leaked memo, and the section that distinguished what the evidence showed from what it did not.",
  format: "Short Story",
  readingMinutes: 4,
  words: [
    "antedate",
    "banish",
    "bridle",
    "comply",
    "crestfallen",
    "curtail",
    "elucidate",
    "evade",
    "feckless",
    "fester",
  ],
  passage: `When Petra Krenz, senior archivist at the Lindgren Foundation, first examined the disputed letter, she understood within ten minutes that something was wrong. The letter — purportedly written in 1894 by the foundation's founder to a young chemist whose later patent had built half the foundation's endowment — had surfaced suddenly in the estate of a private collector who hoped to sell it for a substantial sum. The collector's lawyer claimed the letter would **antedate**, by nearly a year, the documented beginning of the founder's correspondence with the chemist. If genuine, it would resolve a long-standing scholarly dispute. If forged, it would do considerable damage to anyone who had paid for it.

Petra was not a forensic specialist; she was an archivist with thirty years of experience, which is a different kind of expertise. Her first concern was the paper. The watermark, on close examination, was correct for the period; the paper itself, however, had a faint mechanical regularity in its laid lines that did not, in her professional judgment, match the founder's known stationery. Her second concern was the ink. Her third concern was the handwriting itself, which was confident, flowing, and — in three small details — wrong.

She did not announce her doubts immediately. She wanted, before she did anything public, to **elucidate** the case clearly enough that her conclusions would survive a hostile cross-examination. She wrote a long internal memo: each anomaly catalogued, each photographed, each compared against three confirmed letters in the foundation's own collection. She did not, in the memo, accuse the collector of forgery. She simply set out the evidence, side by side, and let the reader draw the conclusion.

The memo was leaked. Petra did not know, and never learned, by whom. Within a week the collector's lawyer had threatened to sue the foundation for defamation. The foundation's general counsel, a younger man who was determined not to **evade** the institution's legal exposure, asked Petra whether she could **curtail** her conclusions. She said she could not. She offered, however, to add a section to the memo distinguishing what the evidence showed (anomalies inconsistent with the period) from what it did not show (active forgery).

She added the section. The general counsel was not entirely satisfied; he had hoped she would, in his own phrase, **comply** with a softer version of the truth. She did not **bridle** at the request, exactly, but she also did not move beyond the addition she had already made. The memo, in its revised form, was provided to the collector's lawyer.

The lawyer did not, in the end, sue. A second specialist — an independent paper historian Petra had quietly recommended — confirmed her analysis within a month. The collector, **crestfallen** in a way that suggested he had not been entirely surprised, withdrew the letter from sale. He did not, as far as anyone could establish, **fester** in resentment toward Petra; he sent her, a year later, a brief and dignified note acknowledging that her work had probably saved him from a worse outcome than embarrassment.

The foundation never publicized the affair. The disputed letter was returned to its envelope and stored, along with Petra's memo, in a drawer she still occasionally consulted when training new staff. She did not **banish** the case from her teaching examples. She used it, instead, as her standard illustration of why **feckless** documentation, however cleverly produced, cannot survive an archivist who is willing to take her time and write down what she sees.`,
  questions: [
    {
      id: 1,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "antedate" most nearly means:',
      quote:
        '"The collector\'s lawyer claimed the letter would antedate, by nearly a year, the documented beginning of the founder\'s correspondence with the chemist."',
      options: [
        "Be dated later than another document.",
        "Precede in time; come before the existing earliest record.",
        "Be authenticated by a notary.",
        "Be misfiled under the wrong year.",
      ],
      correctIndex: 1,
      explanation:
        '"Antedate" means to come before in time — to be earlier than something else. The lawyer\'s claim is that the letter would push the start of the correspondence a year earlier.',
    },
    {
      id: 2,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "elucidate" most nearly means:',
      quote:
        '"She wanted, before she did anything public, to elucidate the case clearly enough that her conclusions would survive a hostile cross-examination."',
      options: [
        "Conceal under specialist jargon.",
        "Make clear by explanation; lay out so the reasoning can be followed.",
        "Translate from another language.",
        "Submit to a panel of experts for approval.",
      ],
      correctIndex: 1,
      explanation:
        '"Elucidate" means to make clear by explanation. Petra\'s side-by-side memo is exactly that — laying out the evidence so the reasoning can be followed and tested.',
    },
    {
      id: 3,
      kind: "tone-purpose",
      prompt:
        'The narrator calls the documentation "feckless" rather than simply "false" in the closing sentence. Why?',
      options: [
        '"Feckless" specifies a kind of incompetence — careless, ineffective, lacking the rigor to withstand scrutiny — fitting a forgery that looks clever at a glance but cannot survive a careful archivist, in a way "false" would not capture.',
        '"Feckless" and "false" mean the same thing in this context.',
        '"Feckless" implies the documentation was government-issued.',
        '"Feckless" suggests the documentation was emotionally moving.',
      ],
      correctIndex: 0,
      explanation:
        '"Feckless" describes a careless, ineffective effort. The closing line\'s point is that even cleverly produced forgery is, at bottom, careless work that a patient archivist will see through.',
    },
    {
      id: 4,
      kind: "inference",
      prompt:
        "Based on the passage, what can the reader most reasonably infer about why Petra agreed to add the new section but refused to soften her conclusions further?",
      options: [
        "She was hoping to be promoted to general counsel herself.",
        "Adding a section that distinguished what the evidence showed from what it did not show preserved her honest analysis while addressing the legal exposure — softening the conclusions further would have crossed from precision into actually misrepresenting what she had found.",
        "Her contract with the foundation forbade her from changing internal memos.",
        "She wanted to provoke the collector into suing the foundation.",
      ],
      correctIndex: 1,
      explanation:
        "The added section gave the counsel what he legitimately needed (a sharper line between inference and accusation) without crossing into untruth — exactly the boundary the passage shows Petra holding.",
    },
    {
      id: 5,
      kind: "substitution",
      prompt:
        'Which single word could replace "comply" in the sentence below without changing its meaning?',
      quote:
        '"...he had hoped she would, in his own phrase, comply with a softer version of the truth."',
      options: [
        "Resist",
        "Conform",
        "Publish",
        "Translate",
      ],
      correctIndex: 1,
      explanation:
        '"Conform" — go along with, accommodate — captures the same meaning as "comply." "Resist" is the opposite.',
    },
    {
      id: 6,
      kind: "main-idea",
      prompt:
        "Which sentence best summarizes the central idea or arc of the passage?",
      options: [
        "An archivist destroys an honest collector\'s reputation by publicly accusing him of forgery without sufficient evidence.",
        "A foundation suppresses an archivist\'s findings to avoid an embarrassing legal dispute with a collector.",
        "A senior archivist patiently documents the anomalies in a probably-forged letter, refuses to soften her conclusions under legal pressure, and quietly resolves the case in a way that protects both the foundation and the collector from a worse outcome.",
        "An archivist resigns from a foundation that has been infiltrated by forgers.",
      ],
      correctIndex: 2,
      explanation:
        "The arc moves from the suspicious letter, through Petra's careful memo, to the added clarifying section and the quietly resolved case — embodying her closing observation about feckless documentation and patient archival work.",
    },
  ],
};

const MISSION_16_SET_2: SetReading = {
  title: "The Iconoclastic Architect",
  subtitle:
    "A short story about a competition brief, a quiet building, and the most accurate review the architect ever received.",
  format: "Short Story",
  readingMinutes: 4,
  words: [
    "iconoclastic",
    "immure",
    "improvise",
    "inhibit",
    "inscrutable",
    "lionize",
    "monotonous",
    "peculiar",
    "premeditate",
    "profligate",
  ],
  passage: `When Tova Halsen submitted her competition entry for the new municipal library of Oresund, she did not expect to win. Her practice, after twenty-five years, had a reputation that local juries tended to call **iconoclastic** — a polite way of saying that her buildings refused to do the things municipal buildings were expected to do. Her libraries had no atriums. Her museums had no ceremonial staircases. Her schools had small, asymmetric windows in places that violated three of the prevailing design assumptions about daylight in classrooms. Critics had alternately **lionized** her and dismissed her, sometimes in the same review.

The Oresund brief, on first reading, called for the kind of building she most disliked: a "civic landmark" whose photographs would, the brief said outright, "anchor the city's tourism brochures for a generation." Tova read the brief twice. She submitted, on the deadline, a building that did not, in any obvious way, comply with the brief's tourism objective. The building was small. It was **peculiar** in plan. It was, in elevation, almost **inscrutable** from the street — a low, dignified mass that did not declare itself as anything in particular.

She had not designed the building to **inhibit** the city's tourism photographs. She had designed it, she said in her one-page accompanying note, to serve readers. Photographs, she added, would arrive in their own time.

The jury was divided. Three of its seven members wanted to award the prize to a more **profligate** entry — a glittering, fountain-fronted building from a much larger firm, whose renderings had already appeared in two industry magazines. Two members were uncertain. The remaining two, including the chair, argued for Tova's design on the grounds that the city had quite enough monumental architecture already and could afford, for once, to commission a building that would teach its visitors patience.

After three days of deliberation, the jury voted four to three for Tova. The losing firm, when the result was announced, issued a statement so measured that it was almost **monotonous** in its restraint, and then, less publicly, lobbied the city council to overturn the decision. The council did not. Construction began the following spring.

Tova did not **premeditate** any particular response to the lobbying. She did not, in fact, mention it. She did, however, **improvise** several small revisions to the design during construction, in response to actual site conditions, that made the building better than the competition drawings had been. The contractor, a man who had worked on three of her previous projects, said later that her instinct for what to change in the field was, in his thirty years of experience, the most disciplined he had ever encountered.

The library opened on a Tuesday in October. The opening ceremony was small. The mayor spoke for three minutes; Tova for one. The room, which had been prepared to be polite about a building it expected to be difficult, was instead surprised into something closer to gratitude. Within a year the city's main bookshop reported a measurable rise in casual reading among the under-thirties — a correlation no one could prove was caused by the building, and that no one, including Tova, was tempted to claim.

The building was photographed eventually. The photographs, when they appeared, were not the kind the brief had imagined. They were quieter, smaller, less inclined to **immure** the building in its own monumentality. Tova kept one of them, in a plain frame, on the wall of her office. It was, she said, the most accurate review the building had received.`,
  questions: [
    {
      id: 1,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "iconoclastic" most nearly means:',
      quote:
        '"Her practice, after twenty-five years, had a reputation that local juries tended to call iconoclastic — a polite way of saying that her buildings refused to do the things municipal buildings were expected to do."',
      options: [
        "Strictly traditional and reverent of established forms.",
        "Attacking or rejecting cherished beliefs or established conventions.",
        "Specializing in religious imagery.",
        "Producing identical copies of historical buildings.",
      ],
      correctIndex: 1,
      explanation:
        '"Iconoclastic" describes work that breaks with established conventions. The author\'s own gloss — buildings that refuse to do what civic buildings are expected to do — is exactly that.',
    },
    {
      id: 2,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "profligate" most nearly means:',
      quote:
        '"Three of its seven members wanted to award the prize to a more profligate entry — a glittering, fountain-fronted building from a much larger firm..."',
      options: [
        "Restrained and economical in its means.",
        "Recklessly extravagant in its use of resources or display.",
        "Specifically designed for libraries.",
        "Written in classical Latin.",
      ],
      correctIndex: 1,
      explanation:
        '"Profligate" describes recklessly lavish display or expenditure. A glittering, fountain-fronted building is the textbook architectural example.',
    },
    {
      id: 3,
      kind: "tone-purpose",
      prompt:
        'The narrator describes the building as "inscrutable" rather than simply "plain." Why?',
      options: [
        '"Inscrutable" specifies a quality of being hard to read or interpret — refusing to declare itself as any one thing — which captures Tova\'s deliberate refusal to make the building legible as a "landmark," in a way "plain" would not.',
        '"Inscrutable" implies the building is invisible.',
        '"Inscrutable" and "plain" mean the same thing in this context.',
        '"Inscrutable" suggests the building is decorated with mysterious symbols.',
      ],
      correctIndex: 0,
      explanation:
        '"Inscrutable" describes something whose meaning resists immediate reading. The whole point of Tova\'s elevation is its refusal to advertise itself — exactly the quality the word names.',
    },
    {
      id: 4,
      kind: "inference",
      prompt:
        "Based on the passage, what can the reader most reasonably infer about why the contractor described Tova\'s field improvisation as the most disciplined he had ever encountered?",
      options: [
        "He had worked with very few architects in his career and had no real basis for comparison.",
        "Her revisions, though made on the fly, were not arbitrary departures from the design — they were small, considered adjustments that improved the building in response to actual conditions, exactly the kind of judgment most field improvisation lacks.",
        "She refused to allow any changes to the design once construction had begun.",
        "She delegated all field decisions to him without supervision.",
      ],
      correctIndex: 1,
      explanation:
        "The text describes the revisions as making the building better than the competition drawings had been — i.e., disciplined improvisation that improves rather than compromises the design.",
    },
    {
      id: 5,
      kind: "substitution",
      prompt:
        'Which single word could replace "lionized" in the sentence below without changing its meaning?',
      quote:
        '"Critics had alternately lionized her and dismissed her, sometimes in the same review."',
      options: [
        "Belittled",
        "Celebrated",
        "Ignored",
        "Hired",
      ],
      correctIndex: 1,
      explanation:
        '"Celebrated" — given high public praise — captures the same meaning as "lionized." "Belittled" and "dismissed" are the opposite, which is the alternative the sentence already names.',
    },
    {
      id: 6,
      kind: "main-idea",
      prompt:
        "Which sentence best summarizes the central idea or arc of the passage?",
      options: [
        "An iconoclastic architect designs a small, deliberately understated municipal library against the brief\'s call for a tourism landmark — and is vindicated when the building is quietly received with gratitude rather than the monumentality everyone expected.",
        "A municipal jury selects the wrong entry for a library competition and is forced to reverse its decision under industry pressure.",
        "An architect compromises her style under city council pressure and produces a building she would later regret.",
        "A famous architecture firm successfully overturns a competition result it had lost.",
      ],
      correctIndex: 0,
      explanation:
        "The arc moves from Tova's iconoclastic submission, through the divided jury, to the quietly received building and the small photograph she kept in her office.",
    },
  ],
};

const MISSION_16_SET_3: SetReading = {
  title: "The Watchmaker's Apprentice",
  subtitle:
    "A short story about six months of work an apprentice thought was wasted, a clever escapement sketch, and the more interesting test.",
  format: "Short Story",
  readingMinutes: 4,
  words: [
    "reconcile",
    "refine",
    "relinquish",
    "ruminate",
    "skittish",
    "superfluous",
    "synoptic",
    "thorough",
    "visionary",
    "vociferous",
  ],
  passage: `When Hugo Marcheval took on his first apprentice in twenty-two years, he warned her, on her first morning, that she would not enjoy the next three years. The young woman, Lina Verbist, had arrived from a top engineering school with a portfolio of clever student work and a reputation, among her professors, as something of a **visionary**. Hugo, who had built his small Geneva atelier on the principle that visionary apprentices were the most likely to fail, was not impressed by the portfolio. He was impressed, however, by the way she set down her tools.

"You will spend the first six months doing work you will think is **superfluous**," he told her. "It is not superfluous. You will spend the next year doing work you will think is monotonous. It is not monotonous. You will spend the third year doing work you will, at last, recognize as the work I hired you to do. We will have, between now and then, perhaps four arguments. I expect you to win one of them."

Lina, who had been warned by her professors that Hugo was a **vociferous** traditionalist, was prepared for sermons. She received instead instructions: dismantle this movement, document it, reassemble it; do the same with the next; do the same with the next. Hugo did not lecture. He corrected. His corrections were **thorough** in a way she had not previously encountered — small, exact, repeatedly defensible — and they accumulated, over weeks, into a discipline she could not have learned from any book.

In her sixth month she began to **ruminate**, in her notebook at night, on a small modification to the escapement of one of the older movements. The modification was clever. It would, she thought, **refine** the mechanism's performance under temperature variation. She showed Hugo the sketch, expecting either dismissal or qualified praise. He gave her neither. He gave her, instead, a **synoptic** lecture, twenty minutes long and entirely without raising his voice, in which he traced every previous attempt to make the same modification over the past hundred and forty years, the precise reasons each had failed, and the one specific subtlety her sketch had missed.

She did not, at first, **reconcile** herself to having been wrong. She sat with the lecture for three days. She redrew the sketch four times. By the fourth attempt, she had to admit that the subtlety Hugo had named was real, that her original modification would have introduced a new failure mode for every old failure mode it removed, and that the proper response was not to defend her sketch but to put it aside.

Hugo did not gloat. He had not expected her to be right; he had expected her to take the correction seriously. He told her, over coffee that afternoon, that her willingness to **relinquish** the sketch was the more interesting test. Cleverness, he said, was common in apprentices. The capacity to be wrong without being **skittish** about future ideas was the rare trait.

She finished the apprenticeship in two years and ten months — slightly faster than Hugo's average. She did not, at the end of it, replace him. She set up her own small atelier in Antwerp. The first watch she signed under her own name contained no visionary modification at all. It contained, instead, a movement of such restrained, classical correctness that two of Hugo's older clients, on examining it, said quietly that they thought he had probably trained her well.`,
  questions: [
    {
      id: 1,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "synoptic" most nearly means:',
      quote:
        '"He gave her, instead, a synoptic lecture, twenty minutes long and entirely without raising his voice, in which he traced every previous attempt to make the same modification over the past hundred and forty years..."',
      options: [
        "Heated and emotionally charged.",
        "Providing a comprehensive overview that brings together multiple sources or examples.",
        "Composed entirely of personal anecdotes.",
        "Limited to a single specific case.",
      ],
      correctIndex: 1,
      explanation:
        '"Synoptic" describes a survey-like view that brings many sources or instances together. Tracing every previous attempt over 140 years is exactly that kind of comprehensive overview.',
    },
    {
      id: 2,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "superfluous" most nearly means:',
      quote:
        '"You will spend the first six months doing work you will think is superfluous. It is not superfluous."',
      options: [
        "Absolutely essential and irreplaceable.",
        "Beyond what is needed; unnecessary or excess.",
        "Highly creative and original.",
        "Performed in collaboration with others.",
      ],
      correctIndex: 1,
      explanation:
        '"Superfluous" means unnecessary, beyond what is needed. The point of Hugo\'s warning is that the apprentice will misjudge essential foundational work as if it were excess.',
    },
    {
      id: 3,
      kind: "tone-purpose",
      prompt:
        'The narrator describes Hugo as a "vociferous" traditionalist according to Lina\'s professors. Why use that word?',
      options: [
        '"Vociferous" specifies someone who voices their views loudly and insistently — fitting the reputation a traditionalist would have among engineering professors who disagreed with him — even though, as the passage immediately shows, Hugo himself does not actually lecture.',
        '"Vociferous" means silent and unobtrusive.',
        '"Vociferous" and "traditional" mean the same thing.',
        '"Vociferous" implies Hugo was a frequent television guest.',
      ],
      correctIndex: 0,
      explanation:
        '"Vociferous" describes loud, insistent voicing of one\'s views. The contrast between his reputation and his actual quiet, corrective style is one of the early surprises of the story.',
    },
    {
      id: 4,
      kind: "inference",
      prompt:
        "Based on the passage, what can the reader most reasonably infer about why Hugo regarded Lina\'s willingness to relinquish her sketch as more important than the cleverness of the sketch itself?",
      options: [
        "He was personally offended by the sketch and wanted her to abandon it.",
        "Cleverness alone produces apprentices who defend their early ideas past the point of usefulness; the rare ability to release a clever idea once it has been honestly refuted is what allows an apprentice to grow rather than to harden.",
        "The sketch was so similar to his own work that he suspected plagiarism.",
        "He believed that all modifications to escapements were inherently a bad idea.",
      ],
      correctIndex: 1,
      explanation:
        'The text spells this out: "Cleverness, he said, was common in apprentices. The capacity to be wrong without being skittish about future ideas was the rare trait."',
    },
    {
      id: 5,
      kind: "substitution",
      prompt:
        'Which single word could replace "thorough" in the sentence below without changing its meaning?',
      quote:
        '"His corrections were thorough in a way she had not previously encountered — small, exact, repeatedly defensible..."',
      options: [
        "Cursory",
        "Exhaustive",
        "Indifferent",
        "Improvised",
      ],
      correctIndex: 1,
      explanation:
        '"Exhaustive" — complete, leaving nothing out — captures the same meaning as "thorough." "Cursory" and "indifferent" are the opposite.',
    },
    {
      id: 6,
      kind: "main-idea",
      prompt:
        "Which sentence best summarizes the central idea or arc of the passage?",
      options: [
        "A watchmaker drives away a talented apprentice by refusing to consider any of her ideas.",
        "A reputedly traditionalist watchmaker turns out to be a tireless self-promoter who lectures his apprentice constantly.",
        "A demanding watchmaker takes on a clever apprentice whose real test, when it comes, is not whether her sketch is right but whether she can release it gracefully — a discipline that eventually produces, in her own atelier, work of restrained classical correctness.",
        "An apprentice rejects her teacher\'s correction and goes on to revolutionize watchmaking with her escapement modification.",
      ],
      correctIndex: 2,
      explanation:
        "The arc moves from Hugo's warning, through the rumination on the escapement, to the synoptic correction and the closing line about the restrained watch she would later sign.",
    },
  ],
};

const MISSION_17_SET_1: SetReading = {
  title: "The Whistleblower at the Foundation",
  subtitle:
    "A short story about a quiet pattern in eleven small grants, a circumscribed memo, and the wrong thing made unmistakably visible.",
  format: "Short Story",
  readingMinutes: 4,
  words: [
    "acclaim",
    "ascertain",
    "assertive",
    "bogus",
    "cataclysmic",
    "circumscribe",
    "complementary",
    "contentious",
    "disingenuous",
    "divulge",
  ],
  passage: `When Marisol Reyna joined the Vandermere Foundation as its new director of programs, she arrived with substantial **acclaim**. Her previous foundation had, under her direction, won three sector prizes for its work on rural literacy; her appointment was widely interpreted as a signal that Vandermere intended to professionalize. Within four months, however, Marisol had begun to find, in her routine review of the foundation's grant files, a pattern that was harder to explain.

The pattern was not, on its face, **cataclysmic**. Several of the grants — small ones, distributed across three program areas — had been awarded to organizations whose paperwork was, on close inspection, partially **bogus**. Some of the documented "site visits" had not, by the testimony of the local partners she eventually contacted, taken place. Several of the partner organizations were, in fact, **complementary** in a way that suggested, on careful reading, that they were operated by overlapping people. None of this was illegal. All of it was — to use a word she would later regret using too freely — **disingenuous**.

She did not, at first, raise the issue publicly. She wanted, before she did anything she could not undo, to **ascertain** the extent of the pattern with as much precision as her own access allowed. She spent six weeks reviewing files, comparing addresses, and quietly verifying which of the recent grants had landed where the foundation thought they had. By the end of that six weeks she had identified eleven grants — small, distributed, totaling slightly under two percent of the year's giving — that did not appear to be reaching their stated beneficiaries.

She wrote a long, careful, deliberately **circumscribed** memo. She did not, in the memo, accuse anyone of fraud. She did not name individuals. She listed the eleven grants, the specific anomalies in each, and the verification methods she had used. She sent the memo to the foundation's audit committee on a Friday and to the foundation's chair, separately, the same afternoon.

The chair's response was **contentious** in a way she had not anticipated. He asked, in a phone call the following Monday, whether she truly intended to **divulge** the contents of the memo to the full board. She said she did. He pointed out, with what she came to recognize as practiced patience, that small percentage discrepancies of this kind were "not unusual" in a foundation of Vandermere's scale, and that an **assertive** new director might be wise to consider the institutional cost of pursuing them in her first year.

Marisol thanked him for the call. She did not, in any sense he would later be able to point to, defy him. She did, however, send the memo to the full audit committee at five o'clock the same afternoon, with no further commentary. Two members of the committee — including its chair, a retired federal auditor who had, Marisol learned later, been waiting for a reason to use his expertise — opened a quiet investigation by the end of the week.

The investigation took five months. Three of the eleven grants were found to have been awarded irregularly enough to require recovery; two of those involved an officer who quietly left the foundation. The remaining eight were found to have been the result of administrative carelessness rather than misconduct. The foundation did not, as the chair had implied it would, suffer any institutional damage. Marisol, who had braced for considerable retaliation, received instead a quiet promotion the following spring.

She did not interpret the promotion as vindication. She interpreted it as a reminder that institutions, like individuals, occasionally do exactly the right thing when it is made unmistakably clear what the wrong thing would look like instead.`,
  questions: [
    {
      id: 1,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "disingenuous" most nearly means:',
      quote:
        '"All of it was — to use a word she would later regret using too freely — disingenuous."',
      options: [
        "Sincerely honest and forthright.",
        "Insincere or misleading, especially while pretending to be candid.",
        "Composed in a foreign language.",
        "Required by federal regulation.",
      ],
      correctIndex: 1,
      explanation:
        '"Disingenuous" describes conduct that is not as candid or honest as it pretends to be. Paperwork that masks overlapping operators behind separate organizations is exactly that.',
    },
    {
      id: 2,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "circumscribed" most nearly means:',
      quote:
        '"She wrote a long, careful, deliberately circumscribed memo. She did not, in the memo, accuse anyone of fraud."',
      options: [
        "Wide-ranging and unrestrained in its conclusions.",
        "Carefully limited or bounded in scope.",
        "Decorated with ornamental flourishes.",
        "Written in shorthand.",
      ],
      correctIndex: 1,
      explanation:
        '"Circumscribed" means bounded, deliberately limited in scope. The memo\'s refusal to accuse anyone of fraud, while still listing every anomaly precisely, is the bounded discipline the word names.',
    },
    {
      id: 3,
      kind: "tone-purpose",
      prompt:
        'The narrator describes the chair\'s response as "contentious" rather than simply "negative." Why?',
      options: [
        '"Contentious" specifies an actively argumentative response — one designed to dispute and resist rather than simply to disagree — which fits a chair who tries, with practiced patience, to talk her out of escalating.',
        '"Contentious" implies the chair was deeply pleased with the memo.',
        '"Contentious" and "negative" mean exactly the same thing.',
        '"Contentious" suggests the chair offered a financial settlement.',
      ],
      correctIndex: 0,
      explanation:
        '"Contentious" denotes an actively argumentative posture. The chair\'s call is not a passive dislike of the memo — it is an attempt to argue her out of it.',
    },
    {
      id: 4,
      kind: "inference",
      prompt:
        "Based on the passage, what can the reader most reasonably infer about why Marisol sent the memo to the full audit committee even after the chair signaled disapproval?",
      options: [
        "She wanted the chair to be embarrassed in front of the board.",
        "Withholding the memo at the chair\'s informal request would have effectively let his preference override the foundation\'s formal oversight process — converting an institutional matter into a private negotiation she had no authority to make.",
        "Her contract required her to circulate every memo within forty-eight hours.",
        "She had been promised a promotion in advance if she pushed the issue.",
      ],
      correctIndex: 1,
      explanation:
        "Her thanks-but-no-thanks response shows the structural point: the audit committee, not the chair, is the legitimate recipient of the memo. Honoring his request would have been a quiet override of the oversight process itself.",
    },
    {
      id: 5,
      kind: "substitution",
      prompt:
        'Which single word could replace "ascertain" in the sentence below without changing its meaning?',
      quote:
        '"...to ascertain the extent of the pattern with as much precision as her own access allowed."',
      options: [
        "Guess",
        "Determine",
        "Exaggerate",
        "Hide",
      ],
      correctIndex: 1,
      explanation:
        '"Determine" — establish with certainty through inquiry — captures the same meaning as "ascertain." The other choices reverse or distort the sense.',
    },
    {
      id: 6,
      kind: "main-idea",
      prompt:
        "Which sentence best summarizes the central idea or arc of the passage?",
      options: [
        "A new program director quietly identifies a pattern of irregular small grants, sends a deliberately circumscribed memo through the proper channel despite informal pressure to bury it, and is eventually promoted when the foundation does the right thing.",
        "A new program director destroys a respected foundation by exaggerating routine administrative discrepancies into a scandal.",
        "A foundation chair successfully prevents a new director from raising concerns about grant irregularities and forces her to resign.",
        "An audit committee invents irregularities in order to remove a foundation officer it dislikes.",
      ],
      correctIndex: 0,
      explanation:
        "The arc moves from Marisol's careful verification, through her circumscribed memo and the chair's contentious call, to the audit committee\'s investigation — and the closing reflection on institutions doing the right thing when the wrong thing is made unmistakably clear.",
    },
  ],
};

const MISSION_17_SET_2: SetReading = {
  title: "The Debate Coach",
  subtitle:
    "A short story about a list of seven fallacies, a season of losing well, and twelve teenagers learning how to think with people who disagree with them.",
  format: "Short Story",
  readingMinutes: 4,
  words: [
    "dogmatic",
    "fallacious",
    "foolhardy",
    "hinder",
    "impair",
    "impugn",
    "incessant",
    "inclined",
    "inveterate",
    "miserly",
  ],
  passage: `When Marcus Olin took over the debate team at North Hollow High School, he inherited a tradition he did not particularly admire. The previous coach, a charismatic former lawyer, had built the team's success on a single technique: aggressive cross-examination. His debaters had been trained to **impugn** the credibility of opposing speakers as a matter of routine, to interrupt as often as the rules allowed, and to treat any concession as a tactical mistake. The team had won a great many trophies. It had also produced, over a decade, very few graduates who went on to be **inclined** toward genuine intellectual debate after high school.

Marcus had been hired, in part, to change this. He did not, on his first day, deliver a sermon. He did not, in fact, name his predecessor. He did, however, post on the team's bulletin board a single sheet of paper listing the seven most common types of **fallacious** argument his team had been using to win rounds — every one of them documented from transcripts of the previous season's tournaments. He invited his debaters, over the first month, to argue with him about the list.

They did. The discussions were, at first, **incessant** and frequently uncomfortable. Several senior members of the team — students who had been trained to be **dogmatic** about the tradition they had inherited — argued that the list was an attack on the program's identity. Marcus did not, at any point, withdraw the list. He did, however, refuse to be drawn into the kind of personal exchange his predecessor had specialized in. When a senior accused him, in a particularly heated session, of being an "**inveterate** purist who would rather lose well than win," he said only that he did not see the choice as binary, and asked the student to find one transcript, from any tournament in the past three years, in which the team had won a round without using at least one of the seven techniques on the list. The student tried for a week. He could not.

The transition was not painless. The team's first tournament under Marcus's coaching produced their worst performance in nine seasons. He did not panic. He did, however, sit down with each of the team's twelve members individually and ask them, in plain terms, what they thought the team was for. Their answers, when he wrote them down, were less uniform than he had expected. Three students said winning. Four said preparation for college. Two said community. Two said "I don't know." One said, with surprising directness, "to learn how to think with people who disagree with me."

Marcus did not allow the team to become **miserly** with its standards. He did not relax the seven-fallacy list. He did, however, build, over the following season, a parallel system of internal scoring that rewarded cleanly constructed arguments as much as winning rounds. The team's tournament performance recovered slowly — by the end of the second year, they were winning roughly as many trophies as before. By the end of the third year, two graduating seniors had won small national awards in policy writing, a category the team had never before entered.

Marcus did not announce the changes as a victory. He did not, in his coaching style, tend toward such announcements. He did, however, observe quietly to a colleague that the most useful change had not been the list of fallacies. It had been the simple discovery, made together with twelve teenagers, that arguing well did not have to **impair** the chance of arguing fairly, and that the older approach — however **foolhardy** in retrospect — had been allowed for years to **hinder** the very intellectual development debate was supposed to produce.`,
  questions: [
    {
      id: 1,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "impugn" most nearly means:',
      quote:
        '"His debaters had been trained to impugn the credibility of opposing speakers as a matter of routine..."',
      options: [
        "Strongly affirm or support.",
        "Attack as false or call into question.",
        "Translate into simpler terms.",
        "Quote at length without commentary.",
      ],
      correctIndex: 1,
      explanation:
        '"Impugn" means to call into question or attack as false — exactly the routine cross-examination technique the passage describes.',
    },
    {
      id: 2,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "fallacious" most nearly means:',
      quote:
        '"...listing the seven most common types of fallacious argument his team had been using to win rounds..."',
      options: [
        "Logically valid and well supported.",
        "Based on a mistaken or deceptive form of reasoning.",
        "Limited to a single specific topic.",
        "Original and previously unused.",
      ],
      correctIndex: 1,
      explanation:
        '"Fallacious" describes reasoning that contains a logical error or deception. A list of recognized argumentative errors is exactly such a list.',
    },
    {
      id: 3,
      kind: "tone-purpose",
      prompt:
        'The narrator describes some senior students as "dogmatic" about the program\'s old tradition. Why use that word rather than "loyal"?',
      options: [
        '"Dogmatic" specifies an unyielding, almost ideological adherence to a position — closing off questioning, rather than the warm allegiance "loyal" implies — and that closed quality is precisely what made the seniors treat the new list as an "attack on the program\'s identity."',
        '"Dogmatic" implies the students were religious.',
        '"Dogmatic" and "loyal" mean exactly the same thing.',
        '"Dogmatic" suggests the students were eager to abandon the tradition.',
      ],
      correctIndex: 0,
      explanation:
        '"Dogmatic" describes an unyielding, often closed-minded adherence to a doctrine. The seniors\' refusal to question their inherited technique is exactly that posture.',
    },
    {
      id: 4,
      kind: "inference",
      prompt:
        "Based on the passage, what can the reader most reasonably infer about why Marcus introduced an internal scoring system rewarding clean argument construction in addition to tournament winning?",
      options: [
        "He wanted to abolish tournaments altogether.",
        "An internal score that rewarded cleanly constructed arguments allowed the team to keep practicing the standards he believed in even during the painful first season when their tournament results were down — preserving the new discipline while the wins recovered.",
        "He needed a way to inflate the team\'s record without actually winning more rounds.",
        "The school administration required all teams to keep two parallel scores.",
      ],
      correctIndex: 1,
      explanation:
        "The internal score gives the team a way to be rewarded for the right behaviors before the external rewards (trophies) catch up. That is exactly the structural problem the new system solves.",
    },
    {
      id: 5,
      kind: "substitution",
      prompt:
        'Which single word could replace "hinder" in the sentence below without changing its meaning?',
      quote:
        '"...the older approach...had been allowed for years to hinder the very intellectual development debate was supposed to produce."',
      options: [
        "Accelerate",
        "Obstruct",
        "Celebrate",
        "Advertise",
      ],
      correctIndex: 1,
      explanation:
        '"Obstruct" — get in the way of, impede — captures the same meaning as "hinder." "Accelerate" is the opposite.',
    },
    {
      id: 6,
      kind: "main-idea",
      prompt:
        "Which sentence best summarizes the central idea or arc of the passage?",
      options: [
        "A debate coach abandons all standards in order to make his team feel better about losing.",
        "A new debate coach introduces a documented list of fallacies, accepts a painful first season, and over three years builds a program that wins as much as before while also producing students capable of arguing fairly.",
        "A team of high-school debaters successfully forces their new coach to return to the previous coach\'s aggressive techniques.",
        "A school administration replaces a debate coach who has lost too many tournaments in his first season.",
      ],
      correctIndex: 1,
      explanation:
        "The arc moves from Marcus's posted list, through the rough first tournament and individual conversations, to the parallel scoring system and the recovery — embodying his closing observation that arguing well need not impair arguing fairly.",
    },
  ],
};

const MISSION_17_SET_3: SetReading = {
  title: "The Editor and the Apology",
  subtitle:
    "A short story about a hasty front-page story, a dignified letter from a councilman, and the most expensive lesson an editor ever learned about a single skipped phone call.",
  format: "Short Story",
  readingMinutes: 4,
  words: [
    "patent",
    "petulant",
    "pithy",
    "pliant",
    "sanctimonious",
    "sound",
    "tarnish",
    "tepid",
    "upbraid",
    "vexation",
  ],
  passage: `When the *Bramley Gazette* published a hasty front-page story accusing a local councilman of accepting an undisclosed gift, the consequences arrived faster than the editor, Felix Tarn, had been prepared for. The councilman, who had not been called for comment before publication, demonstrated within forty-eight hours that the alleged gift had, in fact, been a routine reimbursement disclosed in the council's own minutes a year earlier. The reporter who had written the story was a young man on his fourth byline. The editor who had cleared it for the front page was Felix himself.

The councilman did not, as one might have expected, demand a **petulant** retraction. He sent, instead, a short and dignified letter to the paper requesting only that the correction appear with the same prominence as the original story. The letter was firm. It was not vindictive. The error, the councilman wrote, was **patent** to anyone who had read the council's minutes, and he did not propose to **upbraid** the reporter further than the facts already had.

Felix considered, briefly, the kind of **tepid** correction the paper had occasionally run in similar circumstances over the years — a small box on page seven, a few cautious sentences, no editorial comment. He decided against it almost immediately. The original story had run as the lead item of the front page. The correction, he concluded, would have to do the same.

He drafted the correction himself. He did not, in the draft, attempt to share blame; he did not attempt to soften the error with caveats; he did not, in his own phrase later, "produce a **sanctimonious** apology that pretended the failure had been anyone's but the paper's." The draft was **pithy**: four short paragraphs that named the original error, named the editor responsible (himself), and stated, plainly, what the paper would change in its verification protocols to avoid a repetition. It ran on the front page the following morning.

The reaction was instructive. Several readers wrote in to thank the paper for the correction; a few cancelled their subscriptions; one rival editor in a neighboring town wrote a private note suggesting that Felix had been "more **pliant** than principle required." Felix did not respond to the last of these. He did, however, write back briefly to the readers who had thanked him, and called the councilman personally to apologize.

The councilman accepted the apology with the same dignity he had brought to the original letter. He did, in their conversation, raise one specific concern: that the original story, even after the correction, would in some quiet way **tarnish** his standing with the small portion of the electorate who would never read past a headline. Felix acknowledged the concern. He could not undo it. He could, however, offer to write a longer profile of the councilman's actual record over the following months, on the strict condition that the councilman trust him to write it honestly. The councilman accepted, with the dry observation that he was not in a strong position to refuse.

The profile, when it appeared six weeks later, was neither flattering nor harsh. It was **sound** in the old journalistic sense: carefully reported, evenly written, attentive to the councilman's failures as well as his successes. The councilman, on reading it, sent Felix a final note. "You have done," he wrote, "exactly what you said you would do, which is more than I had any right to expect." Felix kept the note in his desk drawer for the rest of his career.

He did not, in the years that followed, claim the episode as a credit. He did mention it once, at a small training session for younger editors, as the most expensive lesson he had ever learned about the **vexation** that follows skipping a single phone call before publication.`,
  questions: [
    {
      id: 1,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "patent" most nearly means:',
      quote:
        '"The error, the councilman wrote, was patent to anyone who had read the council\'s minutes..."',
      options: [
        "Confidential and accessible only to specialists.",
        "Obvious; clearly visible to anyone who looks.",
        "Officially registered as an invention.",
        "Difficult to detect even on close reading.",
      ],
      correctIndex: 1,
      explanation:
        'As an adjective, "patent" means obvious or clearly visible. The error was self-evident to anyone willing to consult the public minutes.',
    },
    {
      id: 2,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "tepid" most nearly means:',
      quote:
        '"Felix considered, briefly, the kind of tepid correction the paper had occasionally run in similar circumstances over the years — a small box on page seven, a few cautious sentences, no editorial comment."',
      options: [
        "Bold and emphatically prominent.",
        "Lukewarm; lacking energy, conviction, or force.",
        "Required by libel law in similar cases.",
        "Written in a foreign language.",
      ],
      correctIndex: 1,
      explanation:
        '"Tepid" describes a lukewarm, half-hearted response. A small box on page seven with no editorial comment is exactly that lukewarm gesture.',
    },
    {
      id: 3,
      kind: "tone-purpose",
      prompt:
        'The narrator emphasizes that Felix\'s correction was not "sanctimonious." Why use that specific word?',
      options: [
        '"Sanctimonious" specifies a self-righteous, moralizing tone — pretending to greater virtue than one has — which Felix is at pains to avoid because the failure was the paper\'s, and any high-toned apology would only have made the apology itself look like a performance.',
        '"Sanctimonious" implies the apology was insincere on its face.',
        '"Sanctimonious" and "honest" mean exactly the same thing.',
        '"Sanctimonious" specifies that the apology was published in a religious newspaper.',
      ],
      correctIndex: 0,
      explanation:
        '"Sanctimonious" describes a self-righteous, moralizing posture. Felix\'s correction is bare-bones precisely so that the apology does the work, not the tone of the apology.',
    },
    {
      id: 4,
      kind: "inference",
      prompt:
        "Based on the passage, what can the reader most reasonably infer about why Felix offered to write a longer profile of the councilman\'s actual record?",
      options: [
        "He hoped the offer would distract the councilman from pursuing legal action.",
        "He recognized that even a front-page correction could not undo the headline-only damage to the councilman\'s standing — and a fair, sound profile, written under the councilman\'s trust, was the closest thing to a meaningful repair the paper could offer.",
        "The newspaper was contractually required to publish a follow-up profile.",
        "He was hoping to receive a favor from the councilman in return.",
      ],
      correctIndex: 1,
      explanation:
        "The councilman raises the headline-only damage explicitly, and Felix\'s response is the only kind of repair the paper can actually deliver: a long, fair piece of journalism written on terms of trust.",
    },
    {
      id: 5,
      kind: "substitution",
      prompt:
        'Which single word could replace "vexation" in the sentence below without changing its meaning?',
      quote:
        '"...the most expensive lesson he had ever learned about the vexation that follows skipping a single phone call before publication."',
      options: [
        "Pleasure",
        "Annoyance",
        "Boredom",
        "Reward",
      ],
      correctIndex: 1,
      explanation:
        '"Annoyance" — irritation or trouble — captures the same meaning as "vexation." The other choices reverse or are unrelated.',
    },
    {
      id: 6,
      kind: "main-idea",
      prompt:
        "Which sentence best summarizes the central idea or arc of the passage?",
      options: [
        "A newspaper editor refuses to correct a front-page error and is forced out of his job by the offended councilman.",
        "An editor responds to his own front-page error with a prominent, plain-spoken correction and a longer follow-up profile written on the councilman\'s terms — turning a serious mistake into a measured repair without softening any of the responsibility.",
        "A councilman uses a defamation threat to extract a flattering profile from a local newspaper.",
        "A young reporter is dismissed from a newspaper after his story turns out to be inaccurate.",
      ],
      correctIndex: 1,
      explanation:
        "The arc moves from the hasty story, through the dignified letter, to the front-page correction and the sound follow-up profile — and the closing line about the most expensive lesson Felix ever learned.",
    },
  ],
};

const MISSION_18_SET_1: SetReading = {
  title: "The Curator and the Acquisitive Donor",
  subtitle:
    "A short story about three independent valuations, a quietly delayed list, and a wing any visitor could walk into without being expected to recognize the names on the donor wall.",
  format: "Short Story",
  readingMinutes: 4,
  words: [
    "abet",
    "accessible",
    "acquisitive",
    "amalgamate",
    "attenuate",
    "augment",
    "aversion",
    "blithe",
    "contempt",
    "dawdle",
  ],
  passage: `When the Marston Museum's new acquisitions wing was announced, its principal donor, a famously **acquisitive** collector named Thaddeus Whell, was widely expected to assume an informal but substantial influence over what the museum would purchase. The museum's senior curator, Dr. Iona Brace, had no particular **aversion** to donors. She had, in twelve years of fundraising, cultivated several of them with patience and good humor. She did, however, have a clear professional view that a museum's acquisitions could not be allowed to **amalgamate** with the personal taste of any single benefactor, however generous, without becoming, over time, a different museum than the one its public charter required it to be.

Thaddeus did not, at first, push the point. His early suggestions were polite — a list of three artists he admired, each of them unobjectionable on artistic grounds, each of them, on closer reading, also represented in his own private collection in a way that meant a museum acquisition would substantially **augment** the resale value of his holdings. Iona did not refuse the list. She did, however, **dawdle** on it for two months, neither rejecting nor advancing the suggestions, while she quietly commissioned three independent valuations and circulated them, without commentary, to the acquisitions committee.

The committee, when it met, did not need the valuations spelled out. The pattern was visible at a glance. Two of the three suggested acquisitions would, in the committee's judgment, **abet** what one of its more cautious members called, in a closed session, "a use of the museum we cannot approve, however we phrase the refusal."

Iona did not phrase the refusal sharply. She had no interest in expressing **contempt** for a donor whose money had built a wing she would be working in for the rest of her career. She wrote, instead, a long letter to Thaddeus that proposed three alternative acquisitions in the same general aesthetic, none of them connected to his collection, and that thanked him warmly for the original suggestions while noting, in a single carefully constructed paragraph, that the museum's standing acquisitions policy would have to **attenuate** any consideration of works connected to its donors' private inventories.

Thaddeus's reply was brief. It was not warm. It was not, however, hostile. He asked only whether the policy was new, or whether it had simply not been mentioned to him at the outset. Iona replied, the same afternoon, that the policy was twenty-three years old, that it was published on page nine of the museum's annual report, and that she would be happy to walk him through its history at his convenience. He did not request the meeting. He did not, however, withdraw his support.

The acquisitions wing opened the following autumn. Of its first eight purchases, none were drawn from Thaddeus's collection. Three were drawn from the alternative list Iona had proposed. The opening was well attended, well reviewed, and conspicuously **accessible** — a wing, the *Marston Reporter* observed, "that any visitor in the city can walk into without being expected to recognize the names on the donor wall."

Iona did not interpret the review as triumph. She did, however, allow herself one **blithe** remark, over coffee with the committee chair the following Monday, to the effect that the most successful donor relationships were the ones in which both parties left the room remembering exactly which institution they were supporting. The chair, who had been on the committee for sixteen years, did not disagree.`,
  questions: [
    {
      id: 1,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "acquisitive" most nearly means:',
      quote:
        '"...its principal donor, a famously acquisitive collector named Thaddeus Whell..."',
      options: [
        "Generous to a fault and reluctant to keep anything.",
        "Strongly inclined to acquire and accumulate possessions.",
        "Specializing in modern abstract art.",
        "Trained as a professional appraiser.",
      ],
      correctIndex: 1,
      explanation:
        '"Acquisitive" describes someone strongly driven to acquire and accumulate. The whole conflict turns on Thaddeus\'s appetite for adding to a private collection.',
    },
    {
      id: 2,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "attenuate" most nearly means:',
      quote:
        '"...the museum\'s standing acquisitions policy would have to attenuate any consideration of works connected to its donors\' private inventories."',
      options: [
        "Strengthen and emphasize.",
        "Weaken or reduce in force or extent.",
        "Translate into a different language.",
        "Photograph for archival purposes.",
      ],
      correctIndex: 1,
      explanation:
        '"Attenuate" means to make weaker or thinner. The policy weakens — pulls back from — any consideration of works connected to a donor\'s own holdings.',
    },
    {
      id: 3,
      kind: "tone-purpose",
      prompt:
        'The narrator says Iona chose to "dawdle" on the donor\'s list rather than refuse it outright. Why frame the delay that way?',
      options: [
        '"Dawdle" specifies a deliberate, unhurried slowness — neither rejecting nor advancing — which captures Iona\'s tactic of buying time to commission independent valuations without picking a public fight, in a way "delay" alone would not convey.',
        '"Dawdle" implies Iona had forgotten about the list entirely.',
        '"Dawdle" and "refuse" mean the same thing in this context.',
        '"Dawdle" suggests Iona was secretly working for the donor.',
      ],
      correctIndex: 0,
      explanation:
        '"Dawdle" carries the texture of unhurried, almost casual slowness. That choice of word captures the deliberate, low-friction tactic of holding the list in suspension while the valuations were prepared.',
    },
    {
      id: 4,
      kind: "inference",
      prompt:
        "Based on the passage, what can the reader most reasonably infer about why Iona quietly commissioned independent valuations before raising any objection?",
      options: [
        "She wanted to embarrass the donor in front of the acquisitions committee.",
        "Independent valuations let the conflict of interest speak for itself in numbers — converting a debate about taste into one about a documentable pattern, which the committee could read at a glance without anyone having to accuse the donor.",
        "Her contract required outside valuations for any donation under consideration.",
        "She was hoping the valuations would justify acquiring the works after all.",
      ],
      correctIndex: 1,
      explanation:
        "The text emphasizes that the committee \"did not need the valuations spelled out. The pattern was visible at a glance.\" The numbers carry the argument so Iona doesn't have to.",
    },
    {
      id: 5,
      kind: "substitution",
      prompt:
        'Which single word could replace "abet" in the sentence below without changing its meaning?',
      quote:
        '"Two of the three suggested acquisitions would, in the committee\'s judgment, abet what one of its more cautious members called...a use of the museum we cannot approve."',
      options: [
        "Prevent",
        "Assist",
        "Investigate",
        "Photograph",
      ],
      correctIndex: 1,
      explanation:
        '"Assist" — help, especially help bring something about — captures the same meaning as "abet." "Prevent" is the opposite.',
    },
    {
      id: 6,
      kind: "main-idea",
      prompt:
        "Which sentence best summarizes the central idea or arc of the passage?",
      options: [
        "A senior curator publicly humiliates a major donor and is forced to resign over the resulting scandal.",
        "A senior curator turns aside an acquisitive donor\'s suggestions through quiet documentation and an alternative proposal — preserving both the museum\'s independence and the donor\'s ongoing support, and producing a wing the public could walk into without recognizing the donor wall.",
        "A donor successfully pressures a museum into purchasing works from his own private collection.",
        "An acquisitions committee splits irreparably over a single contested donation and is dissolved.",
        ],
      correctIndex: 1,
      explanation:
        "The arc moves from Thaddeus's polite list, through Iona's deliberate delay and quietly circulated valuations, to the alternative proposals and the well-reviewed opening — embodying her closing remark about both parties remembering which institution they were supporting.",
    },
  ],
};

const MISSION_18_SET_2: SetReading = {
  title: "The Ombudsman of Sablefield",
  subtitle:
    "A short story about three small procedural rules, a phone call meant to deflect, and an annual report that did not name the dissenting council member.",
  format: "Short Story",
  readingMinutes: 4,
  words: [
    "deflect",
    "discount",
    "dissident",
    "efficacious",
    "equitable",
    "erratic",
    "industrious",
    "inform",
    "irksome",
    "manacle",
  ],
  passage: `When the small city of Sablefield established its first municipal ombudsman's office, the council appointed a retired civil-court judge named Halvor Brand to the post on the strength of his reputation for being **industrious**, fair, and almost impossible to flatter. The role, as the founding ordinance described it, was straightforward: investigate complaints from the public against city departments, recommend remedies, and produce a public annual report. The role, as Halvor came to understand it during his first six months, was considerably more complicated.

The first complaint he received was from a small grocer who had been fined three times in eight weeks for an alleged signage violation that, on inspection, did not appear to exist. The second was from a tenant whose subsidized housing application had been pending, with no acknowledgment, for fourteen months. The third was from a city employee — a reluctant **dissident** within his own department — who reported, in a long and obviously frightened letter, that his supervisor had been asking him to backdate inspection reports for a particular building owner. None of these complaints, on their face, was **irksome**. All of them, taken together, suggested that the ombudsman's office was going to be busier than its founding ordinance had imagined.

Halvor did not panic. He did not, in his first months, allow the volume of complaints to make his investigations **erratic**. He set, instead, three small procedural rules for himself. He would treat every complaint on the same template, regardless of who filed it. He would **inform** the relevant department head in writing, in advance, of any inquiry he intended to open. And he would, before issuing any public finding, give the department in question a fixed and **equitable** window in which to respond.

The early reactions were instructive. One department head, a long-serving administrator who had not been seriously questioned in fifteen years, attempted to **deflect** the first inquiry by suggesting, in a long phone call, that the ombudsman was being "led by complainants who do not understand municipal procedure." Halvor listened. He did not argue. He did, however, send the same week a written request for the seven specific documents he had asked for at the start of the call, and noted, in a single sentence at the bottom of the request, that he would proceed with the inquiry on the basis of the documents available to him if the request went unanswered.

The documents arrived. They confirmed the original complaint. The grocer's three fines were rescinded; the signage clause that had been used to issue them was clarified in the next council session.

Halvor did not **discount** the institutional resistance he was encountering. He noted, in his private log, that two department heads had begun to treat his inquiries as if they were a personal grievance, and that one council member had publicly described the ombudsman's office as "an experiment of uncertain value." He did not respond to the council member. He continued, instead, to publish each finding on the same template, in the same plain language, with the same fixed response window.

By the end of his second year, Halvor's office had handled four hundred and eleven complaints. The annual report was twenty-three pages long. It did not name the dissenting council member. It did, however, document, with **efficacious** restraint, the specific institutional changes that had followed each substantiated complaint — a record that did not, in his careful phrasing, "**manacle** any department to a single past mistake," but that made unmistakably clear what the office was for and what it was not.`,
  questions: [
    {
      id: 1,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "deflect" most nearly means:',
      quote:
        '"One department head...attempted to deflect the first inquiry by suggesting, in a long phone call, that the ombudsman was being led by complainants who do not understand municipal procedure."',
      options: [
        "Welcome and assist openly.",
        "Turn aside or divert from a direct course.",
        "Submit to formal arbitration.",
        "Forward to a higher authority.",
      ],
      correctIndex: 1,
      explanation:
        '"Deflect" means to turn aside or divert. The administrator\'s long phone call is exactly an attempt to redirect the inquiry away from himself.',
    },
    {
      id: 2,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "efficacious" most nearly means:',
      quote:
        '"It did, however, document, with efficacious restraint, the specific institutional changes that had followed each substantiated complaint..."',
      options: [
        "Largely ineffective and easily ignored.",
        "Effective in producing the intended result.",
        "Lavishly decorated and ornamental.",
        "Privately circulated rather than published.",
      ],
      correctIndex: 1,
      explanation:
        '"Efficacious" describes something that effectively produces the intended result. Restraint that effectively documents real institutional change is exactly that — disciplined and effective at once.',
    },
    {
      id: 3,
      kind: "tone-purpose",
      prompt:
        'The narrator describes the city employee who reported his supervisor as a "reluctant dissident." Why use that word rather than "complainant"?',
      options: [
        '"Dissident" specifies someone breaking with an institution they belong to — at personal risk — which captures the costly and frightened position of an inside reporter, in a way "complainant" (a neutral procedural label) would not.',
        '"Dissident" implies the employee was politically radical.',
        '"Dissident" and "complainant" mean exactly the same thing.',
        '"Dissident" suggests the employee was an outside critic.',
      ],
      correctIndex: 0,
      explanation:
        '"Dissident" carries the weight of breaking ranks with one\'s own institution — and the qualifier "reluctant" sharpens that. "Complainant" would have lost both the cost and the courage of the position.',
    },
    {
      id: 4,
      kind: "inference",
      prompt:
        "Based on the passage, what can the reader most reasonably infer about why Halvor adopted three small procedural rules in his first months?",
      options: [
        "He hoped the rules would slow the office down enough to make his job easier.",
        "Treating every complaint identically, informing departments in advance, and granting a fixed equitable response window converted the office into a predictable institution rather than an unpredictable personality — which is what made its findings hard to dismiss as personal vendettas.",
        "The rules had been imposed on him by the council in a private session.",
        "He wanted to deter ordinary citizens from filing complaints.",
      ],
      correctIndex: 1,
      explanation:
        "The procedural rules give the office institutional consistency: identical templates, advance notice, fixed response windows. That predictability is what protects the inquiries from being recast as personal grievances.",
    },
    {
      id: 5,
      kind: "substitution",
      prompt:
        'Which single word could replace "industrious" in the sentence below without changing its meaning?',
      quote:
        '"...the council appointed a retired civil-court judge named Halvor Brand to the post on the strength of his reputation for being industrious, fair, and almost impossible to flatter."',
      options: [
        "Lazy",
        "Diligent",
        "Wealthy",
        "Charismatic",
      ],
      correctIndex: 1,
      explanation:
        '"Diligent" — hard-working and persistent — captures the same meaning as "industrious." "Lazy" is the opposite.',
    },
    {
      id: 6,
      kind: "main-idea",
      prompt:
        "Which sentence best summarizes the central idea or arc of the passage?",
      options: [
        "A new ombudsman dramatically overturns city government by publicly attacking individual department heads.",
        "A retired judge takes on a new ombudsman\'s post and turns its informal authority into a stable institution by treating every complaint identically, holding to fixed and equitable procedures, and documenting only what each substantiated complaint actually changed.",
        "An ombudsman\'s office is shut down after one year because of resistance from the council.",
        "A city employee\'s anonymous letter brings down a corrupt municipal administration in a single season.",
      ],
      correctIndex: 1,
      explanation:
        "The arc moves from the founding ordinance, through the first three complaints and Halvor's procedural rules, to the second-year report — embodying his closing care to neither manacle a department to a single mistake nor blur the office\'s purpose.",
    },
  ],
};

const MISSION_18_SET_3: SetReading = {
  title: "The Plant Manager's Memo",
  subtitle:
    "A short story about forty-one accurate complaints, a two-and-a-half-page memo, and the most expensive part of the project.",
  format: "Short Story",
  readingMinutes: 4,
  words: [
    "modest",
    "noxious",
    "pernicious",
    "predicament",
    "proficient",
    "prolix",
    "scorn",
    "subordinate",
    "unseemly",
    "veritable",
  ],
  passage: `When Edda Carlsson took over as plant manager of the Norrholt processing facility, she inherited a small but real **predicament**: an aging ventilation system that had been the subject of three internal complaints over the previous year, none of which had resulted in any concrete change. The complaints alleged that the facility's east wing produced periodic episodes of mildly **noxious** fumes during certain weather conditions — not enough, on any single occasion, to require evacuation, but enough, over years, to constitute a **pernicious** background exposure for the workers stationed in that wing.

Edda was not a chemical engineer. She was, however, **proficient** at reading the kind of internal report her predecessor had filed dismissing the three complaints, and she could see, on a careful first reading, that the dismissals were not so much wrong as **unseemly**: they treated a documented occupational concern as a procedural nuisance rather than as the responsibility of the plant. Her predecessor had been, by the testimony of several long-serving employees, a man whose **scorn** for what he called "office complaints" had been the open culture of the facility for eleven years.

She did not call a meeting in her first week. She did, however, request, on a Monday, every internal complaint filed against the east wing in the previous decade. By Friday she had read all forty-one of them. By the following Wednesday she had visited the east wing twice, in different weather, and confirmed, on her own respiration, that the description in the complaints was not exaggerated.

She wrote a memo. It was not a **prolix** document. It ran, in the version she released, to two and a half pages. It described the documented history of the complaints, the specific weather conditions under which the fumes appeared, the engineering options for remediation (with cost ranges from a third party she had quietly commissioned the previous month), and a single recommendation: that the facility commit, within ninety days, to replacing the east-wing ventilation system to current safety standards, regardless of which of the engineering options was ultimately selected.

The memo was, by the standards of the facility, a **veritable** earthquake. Two members of the senior team — both holdovers from the previous administration — argued, in the next staff meeting, that the recommendation was excessive, that the complaints were "subjective," and that any acknowledgment of the problem would expose the facility to retroactive liability. Edda did not, in the meeting, deliver a sermon. She did note, with a precision she had been preparing all week, that any senior officer who treated the safety of a **subordinate** workforce as primarily a liability question had misunderstood the duties of the role, and that the recommendation in the memo was not negotiable as to its substance, only as to its engineering choice.

The memo was adopted. The ventilation work began six weeks later. The cost, in the end, was **modest** by the standards of the facility's annual capital budget — slightly less than three percent of one year's expenditure on routine equipment refresh. The east-wing complaints, by the same time the following year, had dropped to zero.

Edda did not announce the result. She did, however, make a single, characteristically restrained note in her quarterly report: that the most expensive part of the project had not been the new ventilation system. It had been the eleven years during which forty-one separate workers had filed accurate complaints that the previous administration had not, in any meaningful sense, read.`,
  questions: [
    {
      id: 1,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "pernicious" most nearly means:',
      quote:
        '"...not enough, on any single occasion, to require evacuation, but enough, over years, to constitute a pernicious background exposure for the workers stationed in that wing."',
      options: [
        "Mildly pleasant and refreshing.",
        "Causing harm in a gradual, often unnoticed way.",
        "Bright and visually distinctive.",
        "Required by federal regulation.",
      ],
      correctIndex: 1,
      explanation:
        '"Pernicious" describes harm that is gradual and often unobtrusive — exactly the slow, cumulative danger of episodes too small to evacuate over but large enough to matter across years.',
    },
    {
      id: 2,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "prolix" most nearly means:',
      quote:
        '"It was not a prolix document. It ran, in the version she released, to two and a half pages."',
      options: [
        "Concise and tightly worded.",
        "Tediously long-winded; using too many words.",
        "Written in a foreign language.",
        "Published in multiple editions.",
      ],
      correctIndex: 1,
      explanation:
        '"Prolix" describes writing that is tediously long-winded. The contrast with "two and a half pages" makes the meaning unmistakable.',
    },
    {
      id: 3,
      kind: "tone-purpose",
      prompt:
        'The narrator calls the previous reports\' dismissals not so much wrong as "unseemly." Why use that word rather than "incorrect"?',
      options: [
        '"Unseemly" specifies a moral or institutional impropriety — a failure of fitting conduct rather than a failure of fact — which captures Edda\'s real charge: that the dismissals treated workers\' safety with a casualness inappropriate to the role, regardless of whether each dismissal was technically defensible.',
        '"Unseemly" implies the reports were physically damaged.',
        '"Unseemly" and "incorrect" mean exactly the same thing.',
        '"Unseemly" suggests the reports were illegal.',
      ],
      correctIndex: 0,
      explanation:
        '"Unseemly" carries the weight of conduct that does not befit the role. The point is not that the dismissals were factually wrong — it is that the posture they took toward worker safety was inappropriate to a plant manager\'s duty.',
    },
    {
      id: 4,
      kind: "inference",
      prompt:
        "Based on the passage, what can the reader most reasonably infer about why Edda described the most expensive part of the project as the eleven preceding years rather than the ventilation system itself?",
      options: [
        "The ventilation system turned out to be free.",
        "The actual capital cost of the system was modest by the facility\'s standards; the real and continuing cost was the cumulative occupational exposure inflicted on workers during a decade in which forty-one accurate complaints had gone unread — a debt the new system could end but not refund.",
        "She was being self-deprecating about the project\'s engineering complexity.",
        "Her quarterly report was required to use that exact phrasing.",
      ],
      correctIndex: 1,
      explanation:
        "The passage stresses both numbers: 41 documented complaints over 11 years, and a fix costing under 3% of one year\'s routine capital. The contrast is the whole point — the human cost was paid before the financial one.",
    },
    {
      id: 5,
      kind: "substitution",
      prompt:
        'Which single word could replace "veritable" in the sentence below without changing its meaning?',
      quote:
        '"The memo was, by the standards of the facility, a veritable earthquake."',
      options: [
        "Imaginary",
        "Genuine",
        "Brief",
        "Forgotten",
      ],
      correctIndex: 1,
      explanation:
        '"Genuine" — used as an emphatic intensifier meaning "in the truest sense" — captures the same meaning as "veritable." The word frames the memo as a real, not figurative, upheaval inside the facility.',
    },
    {
      id: 6,
      kind: "main-idea",
      prompt:
        "Which sentence best summarizes the central idea or arc of the passage?",
      options: [
        "A plant manager fires the entire senior team in her first week and rebuilds the facility from scratch.",
        "A new plant manager reads forty-one previously dismissed complaints, writes a short, decisive memo recommending non-negotiable ventilation work, and reframes a routine capital project as the overdue settlement of an eleven-year debt to a subordinate workforce.",
        "A processing facility shuts down after a routine air-quality inspection finds severe violations.",
        "A plant manager is forced to resign after her senior team rejects her ventilation recommendation.",
      ],
      correctIndex: 1,
      explanation:
        "The arc moves from the inherited predicament, through Edda's reading of the forty-one complaints and her short memo, to the adopted recommendation and her closing note about what had really been expensive.",
    },
  ],
};

const MISSION_19_SET_1: SetReading = {
  title: "The Apprentice at the Copper Sentinel",
  subtitle:
    "A short story about an editor who refused to bless his own apprentice — and the soft tip that taught her why.",
  format: "Short Story",
  readingMinutes: 4,
  words: [
    "acolyte",
    "anoint",
    "base",
    "coercion",
    "coin",
    "cunning",
    "discomfit",
    "dissent",
    "distill",
    "dubious",
  ],
  passage: `The Copper Sentinel was a weekly newspaper in a town of nine thousand readers, and its founding editor, Rolf Mannering, ran it as if it were the editorial board of a much larger paper that had merely been relocated, by some clerical error, to a county fair. Adelaide had been hired in March as the only reporter under thirty, and within a week she understood that her real job was to be the editor's **acolyte** — to absorb his methods, to take down his opinions in the small black notebook he insisted she carry, and to learn, by extended proximity, what he could not be persuaded to teach in any seminar.

He did not, however, **anoint** her. Mannering disapproved of formal apprenticeships. He had been heard, more than once, to observe that a young reporter who had been ceremonially blessed by a senior was usually a young reporter who had stopped reading. Adelaide was not blessed. She was given assignments and, three weeks in, a single piece of advice: that any story whose **base** rested on a single source was not a story at all, but a rumor that had located a willing transcriber.

She had taken the advice seriously, which was why, when the county clerk's office called her with a tip about the highway commissioner, she had felt no temptation to publish the call itself. The clerk's voice had been low, almost performatively cautious, in a way that struck her even at the time as **dubious**. He had named no documents. He had offered no records. He had asked, twice, what the paper would be willing to print, and twice she had declined to answer — a small but deliberate refusal of what would later, in her notes, be filed under **coercion**, of the soft, suggestive variety that journalists encountered more often than the hard kind.

She brought the call to Mannering. He listened without interrupting. When she finished, he asked her what she thought the clerk wanted from the *Sentinel*, and she said, after a pause, that she thought the clerk wanted the paper to **coin** a phrase the clerk himself was unwilling to say under his own name.

Mannering nodded once. He said that the most **cunning** sources were the ones who never asked for anything directly, who arranged the conversation so that the reporter, by the end of it, believed the story had been her idea. He told her to call back, to ask for documents, and to publish nothing — nothing — until she had read them with her own eyes and could trace each claim to a record.

She did. The clerk produced no records. He grew, over a second call and then a third, increasingly **discomfited** — discomfort being, in Mannering's view, the most reliable signal that a source had hoped for credulity and encountered, instead, an editor's training cascading down through an apprentice he had refused to ceremonially crown. The clerk eventually stopped returning her calls.

Two weeks later, in the *Sentinel*'s editorial meeting, Adelaide raised what she carefully called a quiet **dissent**: she suggested that the paper should publish a brief column on the practice itself — on the soft tip, the unrecorded suggestion, the source who wanted the headline to bear someone else's byline. Mannering listened. He did not approve the column. He did, however, make her write it, and then he kept the draft in his desk for a month, asking her, in the meantime, to **distill** every story she filed down to the single defensible sentence that any reasonable reader could verify.

When the column finally ran, it carried her byline alone. Mannering, asked later why he had not signed it, said only that the apprentice had earned the page.`,
  questions: [
    {
      id: 1,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "acolyte" most nearly means:',
      quote:
        '"...her real job was to be the editor\'s acolyte — to absorb his methods, to take down his opinions...and to learn, by extended proximity, what he could not be persuaded to teach in any seminar."',
      options: [
        "An equal partner sharing executive authority.",
        "A devoted attendant or junior follower learning from a senior figure.",
        "A skeptical rival who watches in order to undermine.",
        "A formally licensed professional in the same field.",
      ],
      correctIndex: 1,
      explanation:
        '"Acolyte" carries the sense of a devoted junior attendant — exactly Adelaide\'s position relative to Mannering: present, learning by proximity, but not yet a peer.',
    },
    {
      id: 2,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "cunning" most nearly means:',
      quote:
        '"He said that the most cunning sources were the ones who never asked for anything directly, who arranged the conversation so that the reporter, by the end of it, believed the story had been her idea."',
      options: [
        "Skilled in clever, often crafty deception or maneuvering.",
        "Outwardly aggressive and confrontational.",
        "Unusually generous with hard evidence.",
        "Inexperienced and easily flustered.",
      ],
      correctIndex: 0,
      explanation:
        '"Cunning" describes a clever, indirect kind of craftiness — the source maneuvers the reporter into ownership of the story without ever issuing a direct request.',
    },
    {
      id: 3,
      kind: "tone-purpose",
      prompt:
        'The narrator says Mannering "did not, however, anoint her." Why use "anoint" rather than simply "promote" or "approve"?',
      options: [
        '"Anoint" is just a longer synonym of "approve" with no different meaning.',
        '"Anoint" suggests Mannering literally performed a religious ceremony on Adelaide.',
        '"Anoint" carries the texture of a ceremonial blessing — an almost ritual transfer of status — which sharpens Mannering\'s objection: he refuses to sanctify her as a successor, because in his view that ceremony tends to end an apprentice\'s real reading.',
        '"Anoint" implies Mannering disliked Adelaide and wanted to drive her away.',
      ],
      correctIndex: 2,
      explanation:
        '"Anoint" foregrounds the ceremonial, almost sacred quality of a senior\'s blessing. Using it makes Mannering\'s refusal pointed — he objects to the ritual itself, not to Adelaide.',
    },
    {
      id: 4,
      kind: "inference",
      prompt:
        "Based on the passage, what can the reader most reasonably infer about Mannering's reason for keeping Adelaide's column in his desk for a month before publishing it?",
      options: [
        "He had lost interest in the column and forgot it was there.",
        "He was waiting for the highway commissioner to leave office before risking publication.",
        "He used the delay as a final piece of training — making her distill every other story she filed down to a single defensible sentence in the meantime, so that her column on soft tips would be earned by demonstrated practice rather than merely written.",
        "He intended to rewrite the column under his own byline and only changed his mind at the last moment.",
      ],
      correctIndex: 2,
      explanation:
        "The text pairs the delay with an explicit instruction: distill every story to a single defensible sentence. The month is part of the apprenticeship, not procrastination.",
    },
    {
      id: 5,
      kind: "substitution",
      prompt:
        'Which single word could replace "dubious" in the sentence below without changing its meaning?',
      quote:
        '"The clerk\'s voice had been low, almost performatively cautious, in a way that struck her even at the time as dubious."',
      options: [
        "Trustworthy",
        "Suspicious",
        "Cheerful",
        "Inaudible",
      ],
      correctIndex: 1,
      explanation:
        '"Suspicious" matches "dubious" — both describe something that arouses doubt about its honesty or motives. "Trustworthy" is the opposite.',
    },
    {
      id: 6,
      kind: "main-idea",
      prompt:
        "Which sentence best summarizes the central idea or arc of the passage?",
      options: [
        "A young reporter publishes a sensational tip without verification and is fired by her editor.",
        "An editor refuses to ceremonially bless his apprentice but transmits his craft through assignments, refusals, and a delayed column — turning a soft, undocumented tip into the occasion for an earned byline on the practice itself.",
        "A county clerk successfully manipulates a small-town newspaper into publishing his preferred version of events.",
        "A weekly newspaper closes after losing the trust of its readers over a botched investigation.",
      ],
      correctIndex: 1,
      explanation:
        "The arc moves from Mannering's refusal to anoint, through Adelaide's handling of the soft tip, to the column he holds for a month and finally publishes under her name alone — every beat a piece of training.",
    },
  ],
};

const MISSION_19_SET_2: SetReading = {
  title: "The Founder Who Wanted to Be Loved",
  subtitle:
    "A personal essay on a first job at a startup whose ebullient founder had not quite worked out the difference between charm and truth.",
  format: "Personal Essay",
  readingMinutes: 4,
  words: [
    "ebullient",
    "facetious",
    "fallible",
    "florid",
    "gawky",
    "inveigle",
    "jettison",
    "mendacity",
    "munificent",
    "naive",
  ],
  passage: `My first job out of college was at a software startup of nineteen people, and on my first afternoon the founder, Calder, walked the length of the open office to introduce himself, threw an arm around my shoulders, and announced to the room that he had just hired the most promising engineer of my graduating class. I was twenty-two. I had not been promising. I had been available.

Calder was, in those first weeks, the most **ebullient** human being I had ever stood next to — a man who appeared to draw genuine joy from other people's good news and who could, at the close of any meeting, summon a sentence so warm that even the engineers who disagreed with him left the room slightly in love with him. I was, I admit, **naive** about what I was watching. I thought I was watching a leader. I was, in fact, watching a salesman who had hired engineers because his investors had told him he had to.

The signals arrived gradually. In our second week, Calder announced, in a **florid** all-hands speech, that the company had "secured" a partnership with a household-name retailer. The partnership had not been secured. It had been, I learned a month later, the subject of a single exploratory call. When I asked, in a private moment, whether the announcement had been an exaggeration, Calder smiled and said he had been **facetious** — that everyone in the room had understood it as aspirational. No one in the room had understood it that way. We had taken him at his word, because he was the founder, and because he had spoken it with the same warm sentence he used for everything else.

I learned, slowly, that the warmth was the instrument. Calder used it to **inveigle** — to coax, by sheer charm, concessions out of investors, hours out of engineers, and silence out of anyone who had begun to suspect that the company's metrics were being presented in their best possible light, and then in a slightly better light than that. The first time I heard him present a chart that I knew, from having built the underlying query, was off by a factor of three, I felt a kind of **gawky**, full-body discomfort — a long-limbed embarrassment for a man who did not seem to feel embarrassed for himself.

The pattern, I now think, was not exactly **mendacity** in the cold sense — Calder was not a planner of lies. He was a man who badly wanted each room he stood in to like him, and who would adjust the truth, in small **minute** increments, until each room did. The cumulative effect, however, was the same as the cold version: by the end of my first year, the company's external story and its internal story were two entirely different documents.

I wrestled, that spring, with whether to **jettison** the job. The pay was generous; the equity was, on paper, **munificent**; the room was, when Calder was not in it, full of people I was learning a great deal from. But I had begun to feel that I was a participant — by silence — in a presentation of the company that I would not, asked under oath, have signed.

I left, eventually, with a quiet two-week notice and no speech. Calder hugged me at the door. He told the room I was the most promising engineer of my graduating class.

I am not. I am ordinary, and I am **fallible**, and I have learned that the most important question to ask of a charismatic leader is not whether he is lying but whether he can tell, from one room to the next, what the truth is.`,
  questions: [
    {
      id: 1,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "ebullient" most nearly means:',
      quote:
        '"Calder was, in those first weeks, the most ebullient human being I had ever stood next to — a man who appeared to draw genuine joy from other people\'s good news..."',
      options: [
        "Quietly withdrawn and slow to speak.",
        "Cheerfully overflowing with enthusiasm and warmth.",
        "Coldly analytical in personal conversation.",
        "Physically large but emotionally distant.",
      ],
      correctIndex: 1,
      explanation:
        '"Ebullient" describes a bubbling-over, overflowing kind of cheerfulness — exactly the warmth the narrator finds magnetic at first.',
    },
    {
      id: 2,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "inveigle" most nearly means:',
      quote:
        '"Calder used it to inveigle — to coax, by sheer charm, concessions out of investors, hours out of engineers, and silence out of anyone..."',
      options: [
        "To threaten openly with consequences.",
        "To win something from someone by clever, persuasive coaxing.",
        "To audit a financial statement.",
        "To resign from a position of authority.",
      ],
      correctIndex: 1,
      explanation:
        '"Inveigle" is to coax or wheedle by clever persuasion. The sentence then defines it directly: "to coax, by sheer charm."',
    },
    {
      id: 3,
      kind: "tone-purpose",
      prompt:
        'The narrator describes Calder\'s all-hands speech as "florid." Why does that word do work that "long" or "elaborate" would not?',
      options: [
        '"Florid" simply means "long-winded" with no other meaning.',
        '"Florid" carries the texture of ornate, flowery rhetoric — language too richly decorated for what it actually delivers — which sets up the reader to discover that the substance behind the speech (a "secured" partnership) was equally inflated.',
        '"Florid" implies Calder spoke in a foreign language.',
        '"Florid" suggests Calder gave the speech in writing rather than aloud.',
      ],
      correctIndex: 1,
      explanation:
        'The decorated, overripe quality of "florid" prepares the reader for the gap between elaborate language and thin substance.',
    },
    {
      id: 4,
      kind: "inference",
      prompt:
        "Based on the passage, what can the reader most reasonably infer about why the narrator finally chooses to leave the company?",
      options: [
        "She is offered a higher-paying position elsewhere.",
        "She is fired by Calder for confronting him about the partnership.",
        "She has come to feel that her continued silence makes her a participant in a presentation of the company that she could not, under honest scrutiny, defend — and the pay and equity are not enough to outweigh that.",
        "Her engineering team disbands and there is no work left to do.",
      ],
      correctIndex: 2,
      explanation:
        'The narrator names the discomfort directly: "I had begun to feel that I was a participant — by silence — in a presentation of the company that I would not, asked under oath, have signed."',
    },
    {
      id: 5,
      kind: "substitution",
      prompt:
        'Which single word could replace "munificent" in the sentence below without changing its meaning?',
      quote:
        '"...the equity was, on paper, munificent..."',
      options: [
        "Stingy",
        "Lavish",
        "Confidential",
        "Worthless",
      ],
      correctIndex: 1,
      explanation:
        '"Lavish" matches "munificent" — both describe extraordinary generosity. "Stingy" is the opposite.',
    },
    {
      id: 6,
      kind: "main-idea",
      prompt:
        "Which sentence best summarizes the central idea or arc of the passage?",
      options: [
        "A young engineer joins a fraud and is prosecuted alongside the founder.",
        "A young engineer learns to distinguish a charismatic leader\'s warmth from his reliability — discovers that the distortion is not cold lying but a serial adjustment of the truth to whatever room is listening — and quietly leaves.",
        "A startup successfully raises a large funding round on the strength of its founder\'s charisma.",
        "A founder fires his engineering team after they refuse to support a public announcement.",
      ],
      correctIndex: 1,
      explanation:
        "The essay\'s arc is exactly this gradual disillusionment: from being charmed, to noticing the gap, to naming the pattern, to a quiet exit.",
    },
  ],
};

const MISSION_19_SET_3: SetReading = {
  title: "The Historian and the Vanished Commune",
  subtitle:
    "A short story about a town historian, a defunct utopian settlement on the river, and the difference between a noble idea and a viable one.",
  format: "Short Story",
  readingMinutes: 4,
  words: [
    "noble",
    "parochial",
    "pedestrian",
    "prevaricate",
    "prime",
    "radical",
    "recrudescent",
    "temporal",
    "transitory",
    "viable",
  ],
  passage: `Florence had been the town historian of Eddington for nineteen years, and in that time she had developed a settled view of her job: that the historian's first duty was to refuse, politely and without theater, to flatter the town. Eddington had a habit of remembering itself as larger, older, and more interesting than the documents allowed, and Florence's regular task — at the council meetings, at the schools, in the small monthly column she wrote for the *Eddington Register* — was to keep the record honest without becoming, in the process, the town's scold.

The Bellweather Commune was the case she had been asked about most often. Founded in 1873 on a flat of land above the river, the commune had attracted, for nine years, a steady current of newcomers from as far as Boston and Philadelphia. Its founders had held what the local clergy at the time called **radical** views — common ownership of land, women on the governing council, the abolition of inherited rank — and the commune had run, on the strength of those views and a pair of unusually competent administrators, until 1882, when one administrator died and the other left for California, and the experiment quietly closed.

A century and a half later, the commune was, for many of Eddington's older residents, a source of muted pride. Florence was regularly asked to **prime** the audience at one event or another — to set up a lecture or a panel — by offering what was always described as a "noble" introduction. She did not refuse. She did, however, decline to **prevaricate**: when asked the question that always followed — "And do you think it could have lasted?" — she answered honestly that, in her professional judgment as a historian, the commune had not been **viable** as a long-term economic enterprise on the land it had chosen, and that the deaths and departures of 1882 had merely made formal what the ledgers had been describing for at least four years.

This honesty had earned her, over the decades, a small but **recrudescent** opposition — a faction of residents whose objections to her column would die down for a year or two and then flare up again, often timed to anniversaries of the commune's founding. They accused her, in letters to the *Register*, of being too **parochial** in her judgment, of treating Eddington's most ambitious chapter as if it were merely a **pedestrian** business that had failed for ordinary reasons.

Florence did not, in her replies, dispute the **noble** quality of what the founders had attempted. She wrote, in a 2014 column that had become locally famous, that there was no contradiction between admiring the moral vision of the Bellweather founders and reporting, accurately, that the soil above the river was thin, that the communal kitchens had run a structural deficit from year three onward, and that the experiment had been, in the historian's specific sense, **transitory** — held together by two unusually capable people whose departures were always going to end it.

She also wrote, more quietly, that the **temporal** life of any institution was the only life a historian could responsibly describe. She had, she said, no professional access to the eternal. She could only describe what had lasted, what had not, and for what reason — and the duty of an honest record was to do that without inflating the subject and without, at the same time, sneering at it.

The opposition flared, that month, and then, as it always did, settled. Florence kept writing the column. The river kept narrowing.`,
  questions: [
    {
      id: 1,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "viable" most nearly means:',
      quote:
        '"...the commune had not been viable as a long-term economic enterprise on the land it had chosen..."',
      options: [
        "Visually attractive to outside observers.",
        "Capable of working successfully and sustaining itself over time.",
        "Recognized officially by the state government.",
        "Hidden from public view.",
      ],
      correctIndex: 1,
      explanation:
        '"Viable" describes something capable of surviving and functioning on its own — exactly the long-term sustainability Florence judges the commune to have lacked.',
    },
    {
      id: 2,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "recrudescent" most nearly means:',
      quote:
        '"This honesty had earned her, over the decades, a small but recrudescent opposition — a faction of residents whose objections to her column would die down for a year or two and then flare up again..."',
      options: [
        "Constant and unwavering.",
        "Breaking out anew after a period of inactivity; recurring.",
        "Uniformly hostile from the very beginning.",
        "Restricted to a single anonymous letter-writer.",
      ],
      correctIndex: 1,
      explanation:
        'The sentence itself defines "recrudescent" by describing the opposition\'s pattern: dying down, then flaring up again — exactly the meaning of recrudescence.',
    },
    {
      id: 3,
      kind: "tone-purpose",
      prompt:
        'The narrator says Florence refused to "prevaricate" when asked whether the commune could have lasted. Why use "prevaricate" rather than simply "lie"?',
      options: [
        '"Prevaricate" carries the precise sense of evading or speaking misleadingly to dodge a direct answer — which is the temptation a town historian actually faces. The audience is not asking her to lie outright; it is asking her to soften her answer, and "prevaricate" names exactly that softer evasion.',
        '"Prevaricate" and "lie" mean exactly the same thing in every context.',
        '"Prevaricate" implies Florence had been hired to mislead the public.',
        '"Prevaricate" suggests Florence was speaking in a foreign language.',
      ],
      correctIndex: 0,
      explanation:
        'The verb "prevaricate" specifically captures the evasion of a direct answer — the historian\'s real temptation in this kind of audience question.',
    },
    {
      id: 4,
      kind: "inference",
      prompt:
        "Based on the passage, what can the reader most reasonably infer about Florence\'s view of her professional duty as a historian?",
      options: [
        "She believes a town historian should always defer to the preferences of the loudest residents.",
        "She believes the historian\'s duty is to give an honest account of what lasted, what did not, and for what reason — neither inflating the subject to flatter the town nor sneering at it.",
        "She believes historians should refuse all public-facing speaking roles.",
        "She believes the moral vision of historical movements should be excluded from any honest record.",
      ],
      correctIndex: 1,
      explanation:
        "Her column and the closing paragraphs frame the duty exactly that way: report accurately without inflating, and without sneering.",
    },
    {
      id: 5,
      kind: "substitution",
      prompt:
        'Which single word could replace "pedestrian" in the sentence below without changing its meaning?',
      quote:
        '"...accused her of treating Eddington\'s most ambitious chapter as if it were merely a pedestrian business that had failed for ordinary reasons."',
      options: [
        "Spectacular",
        "Ordinary",
        "Dangerous",
        "Forgotten",
      ],
      correctIndex: 1,
      explanation:
        '"Ordinary" matches "pedestrian" in this sense — commonplace, unremarkable. The complaint is exactly that Florence treated the commune as commonplace.',
    },
    {
      id: 6,
      kind: "main-idea",
      prompt:
        "Which sentence best summarizes the central idea or arc of the passage?",
      options: [
        "A town historian is forced to retract her published account of a 19th-century commune after public protests.",
        "A town historian holds, against a recurring local opposition, that one can admire the noble vision of a defunct utopian commune while reporting honestly that, on the soil and ledgers it had, it was not a viable long-term enterprise — because the historian\'s only access is to the temporal record.",
        "A town historian discovers new documents that prove the Bellweather Commune was secretly profitable for its entire run.",
        "A town historian resigns from her column after losing public support for her views.",
      ],
      correctIndex: 1,
      explanation:
        "The passage\'s central thread is precisely the distinction Florence holds open: admiration for moral vision plus honesty about what the temporal record actually shows.",
    },
  ],
};

const MISSION_20_SET_1: SetReading = {
  title: "The Quiet Discrepancy on Page Forty-One",
  subtitle:
    "A short story about a junior auditor who stayed half an hour late, a single line that did not reconcile, and the harbinger of a much larger problem.",
  format: "Short Story",
  readingMinutes: 4,
  words: [
    "abreast",
    "confound",
    "digression",
    "discrepancy",
    "duplicitous",
    "expedient",
    "fabricate",
    "glum",
    "harbinger",
    "intrinsic",
  ],
  passage: `Devon had been working at the firm for fourteen months, which was, by his manager's reckoning, just long enough to be left alone with a client's quarterly file for an afternoon. The file in question belonged to Halberd Industrial — an unglamorous mid-cap manufacturer whose books were, on the surface, almost soothingly dull. It was the kind of engagement that earned a junior auditor neither praise nor blame, which made it the perfect file to be handed at four o'clock on a Friday.

His task was to keep **abreast** of the reconciliation work the senior staff had already begun and to flag, in a short memo, anything that did not tie out. He had read the previous quarter's memo, the one before that, and the engagement letter, and had walked into the room expecting to spend ninety minutes confirming that nothing was wrong.

The **discrepancy** was on page forty-one. It was small — small enough that, on a quick read, his eye had glided past it. The intercompany receivable line for the European subsidiary, which had been $4.2 million in the prior quarter, was now $4.7 million. The corresponding payable line on the European subsidiary's own ledger, which any sensible auditor would expect to mirror it within rounding, was still $4.2 million. The two ledgers, in other words, did not agree.

His first instinct was a **glum** sort of resignation: the kind of mismatch that, in his experience, almost always turned out to be a routing error or a timing difference and that absorbed two days of his life to document as innocent. He almost closed the file. He almost decided, on the **expedient** ground that it was Friday afternoon and that the senior on the engagement would catch it in the second pass, to let the matter wait until Monday.

He did not. He stayed forty minutes late and pulled the wire transfer log.

The wire log did not **confound** him. It clarified, with a coldness he had not expected from a stack of bank confirmations, that the $500,000 difference had been booked as an intercompany receivable on the parent's ledger but had never been transmitted as cash to or from the European subsidiary. There was no offsetting timing difference. There was no routing error. There was simply a number on one side and no number on the other.

Devon wrote his memo carefully. He did not, at any point in the memo, accuse anyone of anything. He described the discrepancy. He attached the wire log. He noted, in a single sentence, that the pattern was an **intrinsic** mismatch rather than a timing one — a difference that did not resolve itself by waiting another quarter — and he declined, twice, to draft any sentence that would speculate about how the entry had come to exist.

The senior on the engagement read the memo on Monday morning. He did not, at first, react. He did, however, ask Devon a single question, which was whether Devon had checked the prior three quarters for the same pattern. Devon had not. He spent the rest of the day doing so and discovered, in three of the previous four quarters, smaller versions of the same shape — none individually large enough to draw attention, all together a clear **harbinger** of an entry being **fabricated** at quarter-end and reversed, partially, in the following month.

It would be another eleven months before the full picture emerged, and by then the firm would understand that one of Halberd's controllers had been quietly, **duplicitously** smoothing the European numbers for years. None of that, however, was Devon's to determine. His job, that Friday afternoon, had been to refuse the small but tempting **digression** of letting the discrepancy wait.

He had refused it. The rest had followed.`,
  questions: [
    {
      id: 1,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "harbinger" most nearly means:',
      quote:
        '"...all together a clear harbinger of an entry being fabricated at quarter-end and reversed, partially, in the following month."',
      options: [
        "A final consequence that closes a matter.",
        "A sign or warning that signals something larger to come.",
        "A formal legal accusation.",
        "An unrelated coincidence.",
      ],
      correctIndex: 1,
      explanation:
        '"Harbinger" describes a foreshadowing sign — exactly the early warning Devon\'s pattern of small mismatches turns out to be.',
    },
    {
      id: 2,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "expedient" most nearly means:',
      quote:
        '"He almost decided, on the expedient ground that it was Friday afternoon and that the senior on the engagement would catch it in the second pass, to let the matter wait until Monday."',
      options: [
        "Morally principled and rigorously argued.",
        "Convenient and self-serving in the moment, regardless of strict rightness.",
        "Time-consuming and cautious.",
        "Legally required.",
      ],
      correctIndex: 1,
      explanation:
        '"Expedient" here carries the sense of a convenient, self-serving justification — the easy reason, not the right one. The sentence frames it precisely as a Friday-afternoon shortcut.',
    },
    {
      id: 3,
      kind: "tone-purpose",
      prompt:
        'The narrator emphasizes that Devon described an "intrinsic" mismatch rather than a timing one. Why does that word matter to the memo?',
      options: [
        '"Intrinsic" is a fancier synonym for "interesting" with no technical content.',
        '"Intrinsic" identifies the mismatch as belonging to the books themselves — built into the underlying entries — rather than a transient artifact that would resolve in the next period. That distinction is what tells the senior reader the discrepancy cannot be safely waited out.',
        '"Intrinsic" suggests Devon was making a personal accusation against the controller.',
        '"Intrinsic" means the mismatch was insignificant.',
      ],
      correctIndex: 1,
      explanation:
        'Calling the mismatch intrinsic precisely separates it from a timing artifact and signals that no further quarter will dissolve it.',
    },
    {
      id: 4,
      kind: "inference",
      prompt:
        "Based on the passage, what can the reader most reasonably infer about why the senior\'s only follow-up question is whether Devon checked the prior three quarters?",
      options: [
        "The senior wants to delay the investigation as long as possible.",
        "A single isolated mismatch could be a one-time error; recurring small mismatches across multiple quarters would establish a pattern, which is what would justify treating the matter as something other than an innocent rounding issue.",
        "The senior is trying to test whether Devon understands accounting at all.",
        "The senior is hoping the prior quarters will exonerate the controller.",
      ],
      correctIndex: 1,
      explanation:
        "The single follow-up question is the senior\'s way of distinguishing a one-off from a pattern — and the passage confirms that the pattern is exactly what the prior quarters revealed.",
    },
    {
      id: 5,
      kind: "substitution",
      prompt:
        'Which single word could replace "duplicitous" in the sentence below without changing its meaning?',
      quote:
        '"...one of Halberd\'s controllers had been quietly, duplicitously smoothing the European numbers for years."',
      options: [
        "Honestly",
        "Deceitfully",
        "Publicly",
        "Reluctantly",
      ],
      correctIndex: 1,
      explanation:
        '"Deceitfully" matches "duplicitously" — both describe intentionally two-faced or dishonest behavior. "Honestly" is the opposite.',
    },
    {
      id: 6,
      kind: "main-idea",
      prompt:
        "Which sentence best summarizes the central idea or arc of the passage?",
      options: [
        "A junior auditor uncovers a major fraud single-handedly and is promoted to partner the same week.",
        "A junior auditor refuses the small, expedient temptation to let an unexplained discrepancy wait — writes a careful, narrowly factual memo, and unwittingly produces the first harbinger of a multi-year smoothing scheme that will take eleven months for the firm to fully unwind.",
        "A junior auditor mistakenly accuses a controller of fraud and is reprimanded by his manager.",
        "An auditing firm decides to drop a client after a routine reconciliation reveals minor errors.",
      ],
      correctIndex: 1,
      explanation:
        "The arc is exactly this: the small refusal of expedience, the disciplined memo, and the slow surfacing of a much larger pattern over the following year.",
    },
  ],
};

const MISSION_20_SET_2: SetReading = {
  title: "The Gala and the Anonymous Bequest",
  subtitle:
    "A short story about a charity director, a perennial benefactor, and a single anonymous gift that arrived providentially the week the audit began.",
  format: "Short Story",
  readingMinutes: 4,
  words: [
    "largesse",
    "libertine",
    "malfeasance",
    "manifest",
    "minute",
    "modish",
    "nascent",
    "perennial",
    "pious",
    "providential",
  ],
  passage: `The Wexford Children's Trust had been, for thirty-one years, the kind of small charity whose annual gala was attended by exactly the same hundred and forty people. Its director, Dr. Helena Brock, did not chase **modish** causes. She did not, in her grant-writing, dress up the Trust's work in the language of whatever cause was currently fashionable. She kept a ledger that any donor could ask to read on a Tuesday afternoon, and she had survived in her position for nineteen years on the strength of the fact that no donor ever had to.

The Trust's largest **perennial** benefactor was a foundation associated with the late industrialist Edmund Cray, whose annual contribution covered the Trust's after-school literacy program in three counties. The Cray Foundation had given to the Trust every year since 1994, in a gift that had begun at $40,000 and had grown, with quiet regularity, to $185,000 by the year in question. The grant officer at Cray, a careful and slightly **pious** woman named Edith Lin, was a creature of process: she required the Trust to file an annual budget, an annual narrative report, and an annual audit, and she did not extend the giving cycle by a single day for any reason short of a documented natural disaster.

It was therefore unusual when, in the third week of September — five days into the Trust's annual audit and two weeks before the gala — an anonymous gift of $90,000 arrived by wire from a foreign account. The wire memo was blank. The originating bank had been instructed to disclose the donor only if asked under subpoena. The gift was, in the language of the Trust's bylaws, "unrestricted" — meaning Helena could spend it on anything within the charity's mission.

The arrival of the wire was, by the most generous reading, **providential**: the Trust's reserve fund had dipped, that summer, below the threshold its bylaws required. The wire restored the reserve to compliance with a margin of $2,000.

Helena did not, at first, do anything with the gift. She did not spend it. She did not announce it at the gala. She did, however, on the same afternoon the wire cleared, sit in her office for forty **minute** silent minutes — the kind of motionless concentration in which a director who has run a small charity for nineteen years works through the precise set of questions that any auditor will, in the next ten days, ask her to answer in writing.

The questions were not difficult. They were, in fact, **manifest** to anyone who had read a single article on charitable governance: who was the donor, what was the donor's relationship to any board member, what conditions if any had attached to the gift, and why had the gift arrived in the precise week that it had.

Helena had no answer to the first question. The originating bank would not tell her. She could, plausibly, accept the gift on the cover of "anonymous **largesse**" and move on. She had seen other small charities do exactly that. She had also seen, twice in her career, a similar gift turn out to have been a quiet attempt by a donor with a complicated personal life — in one case a known **libertine** under indictment in another state, in another case a board member's brother — to launder reputation through a charity that would, for a tax year, accept his name as silence.

She wrote, that evening, a one-page memo to her board chair. She declined the gift. She returned the wire to its originating account, with a brief, polite note explaining that the Trust's policy did not allow it to accept anonymous gifts above a stated threshold without disclosure of the donor.

The reserve, the following month, dipped again. Edith Lin, asked to consider an emergency advance from the Cray Foundation, agreed within a week. There was no **malfeasance** to investigate. There was no investigation. The Trust was, that fall, audited by the same firm it had used for nineteen years, and its audit closed without a single finding.

The gala was attended, as ever, by exactly the same hundred and forty people. The **nascent** rumor about a refused anonymous gift surfaced once, at the bar, and died there. Helena, asked about it, said only that the Trust had a policy and that the policy had been observed.`,
  questions: [
    {
      id: 1,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "providential" most nearly means:',
      quote:
        '"The arrival of the wire was, by the most generous reading, providential: the Trust\'s reserve fund had dipped, that summer, below the threshold its bylaws required."',
      options: [
        "Carefully planned in advance and openly announced.",
        "Occurring at exactly the right moment, as if by lucky design.",
        "Imposed unwillingly by a regulator.",
        "Deferred to a later date for accounting reasons.",
      ],
      correctIndex: 1,
      explanation:
        '"Providential" describes timing so apt it seems guided by providence — and that is precisely what the wire\'s timing looks like, given the reserve shortfall.',
    },
    {
      id: 2,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "manifest" most nearly means:',
      quote:
        '"They were, in fact, manifest to anyone who had read a single article on charitable governance..."',
      options: [
        "Concealed beneath a complicated technical surface.",
        "Easily and clearly perceived; obvious.",
        "Argued at length in academic literature.",
        "Settled by a single court ruling.",
      ],
      correctIndex: 1,
      explanation:
        '"Manifest" here means plainly visible or obvious — anyone with basic familiarity would see those questions immediately.',
    },
    {
      id: 3,
      kind: "tone-purpose",
      prompt:
        'The narrator describes Edith Lin as "slightly pious." Why use "pious" rather than simply "strict"?',
      options: [
        '"Pious" implies Edith Lin attended religious services regularly.',
        '"Pious" carries a sense of devout, almost moral seriousness about her duties — she treats grant procedure with a reverence beyond mere strictness — which sets up the steadiness of the Cray relationship and explains why she will, when asked, advance funds within a week to a charity she trusts.',
        '"Pious" suggests Edith Lin disapproved of the Trust\'s mission.',
        '"Pious" and "strict" are exact synonyms with no different meaning.',
      ],
      correctIndex: 1,
      explanation:
        'The hint of moral seriousness in "pious" frames Edith\'s reliability as principled rather than merely procedural — and prepares the later emergency advance.',
    },
    {
      id: 4,
      kind: "inference",
      prompt:
        "Based on the passage, what can the reader most reasonably infer about Helena\'s motive for refusing the anonymous wire?",
      options: [
        "She personally disliked the donor and wished to embarrass them publicly.",
        "She judged that accepting an anonymous gift large enough to restore the reserve — in the precise week of the audit — would expose the Trust to questions she could not later answer in writing, and the long-term cost of that exposure would outweigh the short-term relief.",
        "She believed the wire was counterfeit and would not actually clear.",
        "She was acting under direct legal compulsion from her auditor.",
      ],
      correctIndex: 1,
      explanation:
        "The text shows Helena working through exactly the questions an auditor would ask, recognizing she could answer none of them, and choosing the long-term position over the short-term relief.",
    },
    {
      id: 5,
      kind: "substitution",
      prompt:
        'Which single word could replace "largesse" in the sentence below without changing its meaning?',
      quote:
        '"She could, plausibly, accept the gift on the cover of \'anonymous largesse\' and move on."',
      options: [
        "Generosity",
        "Stinginess",
        "Hostility",
        "Indifference",
      ],
      correctIndex: 0,
      explanation:
        '"Generosity" matches "largesse" — both describe a generous bestowal of money or favor.',
    },
    {
      id: 6,
      kind: "main-idea",
      prompt:
        "Which sentence best summarizes the central idea or arc of the passage?",
      options: [
        "A charity director secretly accepts an anonymous wire to cover up a budget shortfall and is later caught by the auditor.",
        "A charity director refuses a perfectly timed anonymous gift — even though it would restore the reserve to compliance — because the questions an auditor would later ask about an undisclosed donor were ones she could not answer, and a long-relied-on perennial benefactor proves willing to advance an emergency grant instead.",
        "A foundation grant officer is forced to resign after extending an emergency grant against her own foundation\'s rules.",
        "A small charity is closed after losing donors over its refusal to disclose its annual budget.",
      ],
      correctIndex: 1,
      explanation:
        "The story\'s spine is the refusal of the providential anonymous gift in favor of disciplined disclosure and the steady, principled relationship that catches the Trust when it falls.",
    },
  ],
};

const MISSION_20_SET_3: SetReading = {
  title: "The Schism at the Linden Chess Club",
  subtitle:
    "A short story about a small club, a contested rule, and a stalwart secretary who refused to issue a tirade.",
  format: "Short Story",
  readingMinutes: 4,
  words: [
    "prowess",
    "schism",
    "slander",
    "stalwart",
    "supplicate",
    "terse",
    "tirade",
    "universal",
    "vanquish",
    "woeful",
  ],
  passage: `The Linden Chess Club had eighty-four members, and for most of its forty-year history its internal politics had been, by the sober standard of community organizations, almost embarrassingly placid. The Tuesday-night ladder ran on a single page of rules. The annual championship was decided over four weekends in March. The club\'s **stalwart** secretary, Margaret Holm, had been re-elected, unopposed, for fourteen consecutive years.

The trouble began with a single line in the bylaws governing playoff tiebreaks. The line had been written in 1989 and had been, for thirty-five years, treated as **universal** by every officer who had read it: in the case of a final tiebreak, the player with the better head-to-head record across the season won the seat. In the spring of the year in question, two players — Yulia Berman, the club\'s reigning champion of unmistakable **prowess**, and Hugo Petrov, a younger and rapidly improving challenger — finished the regular season tied on points, with no head-to-head games played between them at all.

The bylaw, in other words, did not cover the case. The board met to interpret it.

What should have been a single Wednesday evening became, over the next six weeks, the most sustained internal **schism** in the club\'s history. One faction held that, in the absence of head-to-head games, the seat should be decided by a single playoff match. The other faction held that the bylaw\'s silence implied that the higher-rated player automatically advanced — which would have given the seat to Yulia by default.

The argument was, in cooler hindsight, about three sentences of procedure. It did not feel that way at the time. Letters circulated. A long, **woeful** email from a former vice president described the club as "a place where competitive integrity has been quietly **vanquished** by personal alliances," and named, by initials transparent enough to be read by anyone, three current officers he believed to be partisans of one camp or the other.

Margaret Holm was named in the email. She was accused, in language that more than one member privately judged to be **slander**, of having predetermined the outcome and of intending to use her secretarial procedure to engineer the result.

She did not, in reply, issue a **tirade**. She had served the club for fourteen years and had, in that time, developed a settled view of what the secretary\'s position was for. She wrote, instead, a single page. The page restated the bylaw, restated the absence of head-to-head games, and proposed three procedural options — a single playoff match, a best-of-three, or a board vote conducted in writing. The page closed with two **terse** sentences: that she would administer whichever option the board chose, and that she would, on the same evening the option was chosen, also tender her own resignation as secretary so that no future controversy could turn on her interpretation.

The board met on a Wednesday. It chose the best-of-three. It also, by a vote of seven to one, declined to accept Margaret\'s resignation. The one dissenting vote was hers.

Yulia and Hugo played their best-of-three over the following ten days. Hugo won, two games to one. Yulia, who had been champion for six years, did not contest the result. She did not, in any later forum, **supplicate** for a re-vote. She wrote Hugo a one-line email of congratulations, and the two of them played, the following Tuesday, a friendly game at the same board where the third decisive game had been finished. Margaret recorded the result in the ladder.

The schism, by July, had subsided. The club still had eighty-four members. The bylaw, at the September meeting, was rewritten in two sentences to cover, prospectively, the case the original line had not.`,
  questions: [
    {
      id: 1,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "schism" most nearly means:',
      quote:
        '"What should have been a single Wednesday evening became, over the next six weeks, the most sustained internal schism in the club\'s history."',
      options: [
        "A minor scheduling conflict between two committees.",
        "A formal split or division within a group, often passionately argued.",
        "A unanimous agreement reached after long debate.",
        "A new wave of membership applications.",
      ],
      correctIndex: 1,
      explanation:
        '"Schism" describes a serious internal split — exactly the six-week division the bylaw dispute produces inside the club.',
    },
    {
      id: 2,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "tirade" most nearly means:',
      quote:
        '"She did not, in reply, issue a tirade."',
      options: [
        "A brief, factual procedural notice.",
        "A long, angry, denunciatory speech or piece of writing.",
        "A formal vote of no confidence.",
        "A request for a second opinion.",
      ],
      correctIndex: 1,
      explanation:
        '"Tirade" specifically denotes a long, angry, denunciatory outburst — exactly the response Margaret refuses to issue.',
    },
    {
      id: 3,
      kind: "tone-purpose",
      prompt:
        'The narrator describes Margaret as a "stalwart" secretary. Why use "stalwart" rather than simply "experienced"?',
      options: [
        '"Stalwart" carries the texture of steady, dependable, almost stubborn loyalty — which is exactly the quality the story will go on to dramatize: she absorbs the slander, declines the tirade, restates the bylaw, and offers her own resignation rather than damaging the office she holds. "Experienced" would have named only her tenure.',
        '"Stalwart" implies that Margaret was physically very large.',
        '"Stalwart" suggests that Margaret had been newly appointed.',
        '"Stalwart" and "experienced" are exact synonyms with no different meaning.',
      ],
      correctIndex: 0,
      explanation:
        '"Stalwart" supplies the quality of dependable steadfastness that the rest of the story confirms — well beyond mere experience.',
    },
    {
      id: 4,
      kind: "inference",
      prompt:
        "Based on the passage, what can the reader most reasonably infer about why Margaret offered her resignation in the same memo that proposed the three procedural options?",
      options: [
        "She was personally angry at the board and intended to leave the club entirely.",
        "She wanted to ensure that whichever procedural option the board chose, the choice itself could not be attributed to her preferences — by tying her own departure to the same evening, she removed her ongoing role as a possible reason for the board to favor any one option.",
        "She had been formally charged with a violation of the bylaws.",
        "She had already accepted a paid position at another club.",
      ],
      correctIndex: 1,
      explanation:
        "The structural point of pairing the resignation with the proposal is exactly to remove her continued tenure as a variable in the board\'s decision.",
    },
    {
      id: 5,
      kind: "substitution",
      prompt:
        'Which single word could replace "supplicate" in the sentence below without changing its meaning?',
      quote:
        '"She did not, in any later forum, supplicate for a re-vote."',
      options: [
        "Demand",
        "Refuse",
        "Beg",
        "Forget",
      ],
      correctIndex: 2,
      explanation:
        '"Beg" matches "supplicate" — both describe humble, earnest petitioning. "Demand" is a different posture entirely.',
    },
    {
      id: 6,
      kind: "main-idea",
      prompt:
        "Which sentence best summarizes the central idea or arc of the passage?",
      options: [
        "A small chess club dissolves after a procedural dispute and never recovers its membership.",
        "A small chess club is briefly torn by a schism over a bylaw the original drafters had not anticipated, and a stalwart secretary defuses the dispute by refusing to retaliate, restating the rule, proposing three options, and offering her own resignation alongside — preserving both the club and the office she held.",
        "A reigning champion forces the club to install her permanently as secretary after winning a contested playoff.",
        "A board member writes a denunciatory email that successfully removes the secretary from her post.",
      ],
      correctIndex: 1,
      explanation:
        "The arc traces precisely Margaret\'s steady, refusal-to-retaliate handling of the schism, ending with the playoff result, the rewritten bylaw, and the club intact.",
    },
  ],
};

const MISSION_21_SET_1: SetReading = {
  title: "The Mediator's Tuesday Calendar",
  subtitle:
    "A personal essay by a divorce mediator on the slow work of dispensing fairness without dispensing pity, and on what an eloquent client can hide.",
  format: "Personal Essay",
  readingMinutes: 4,
  words: [
    "abject",
    "amicable",
    "animosity",
    "aver",
    "barrage",
    "cathartic",
    "decipher",
    "delusion",
    "dispense",
    "eloquent",
  ],
  passage: `I have been a divorce mediator for nineteen years. My office has two chairs facing one chair, a window onto a parking lot, and a small ceramic kettle that I am told, by clients, contributes more to the eventual settlement than I do. They may be right. The kettle has never said anything I had to take back.

People come into my office in three broad postures. The first is the **amicable** couple, who have already, between themselves, decided most of what they want, and who need from me only the procedural choreography that will turn their decisions into a document a judge will sign. They are not common. When they appear, my job is small. I draft. I clarify a tax point. I do not, in their case, **dispense** wisdom — they have not asked for any, and the temptation to volunteer it would only complicate what they already understand.

The second posture is what I have come to think of as the open **animosity** couple, who arrive ready for a fight and, in their first ten minutes, deliver a **barrage** of grievances long enough to fill the entire session. This is, surprisingly, often the easier of the two difficult cases. The animosity is on the table. We can name it. We can, over four sessions, separate the grievances that belong to the divorce — assets, custody, the lease — from the grievances that belong to the marriage and that no document will ever resolve. Many clients, weeks later, describe those sessions as **cathartic**. The word is not mine; I would not use it. But I have learned not to argue with a client who has chosen a word that is helping her.

The third posture is the difficult one. The third posture is the **eloquent** client.

The eloquent client is, in my experience, almost always the one whose case I will most badly want to misread. He arrives with a clean shirt and a tone of careful regret. He **avers**, in the first session, that he wants only what is fair, that he holds no ill will, that he understands the legal landscape and would prefer to keep this out of court for the children's sake. Every sentence he offers is, on its face, the sentence I would most like to hear from a client. The trouble is that the sentences arrive in too perfect a sequence. They have been arranged. And the arrangement, when I am paying attention, is what I have to **decipher**.

I learned, slowly, that the eloquent client is not always lying. Sometimes he is. More often he is operating under an organized **delusion** of his own evenhandedness — a story he has told himself, often in good faith, in which he is the patient one and his spouse is the unstable one and the asset division he is proposing is, by some private accounting, what is owed to him in compensation for his patience. When I cross-check his proposal against the documents, the proposal does not survive. The numbers are not what he averred them to be. The custody schedule he described as "what we already do" is a description of the previous summer, not of the current school year.

I do not, in those moments, accuse him. I have learned that an accusation, in mediation, ends the session and accomplishes nothing. I lay out the documents. I read the dates aloud. I ask him to walk me through the arithmetic. He almost always, by the end of the page, retracts.

I have come to think that the **abject** part of this work — and there is one — is not the animosity couple. It is the eloquent client, in the moment of the retraction. He is not pleased to have been corrected. He is not pleased that the mediator he had hoped to charm has, instead, read the documents. The look on his face is one of small, contained humiliation, and it is my job, in that moment, to give him no audience and no commentary, only the next page.

The kettle, I have noticed, is excellent at this. It does not speak. It dispenses heat. The clients do the rest.`,
  questions: [
    {
      id: 1,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "aver" most nearly means:',
      quote:
        '"He avers, in the first session, that he wants only what is fair, that he holds no ill will, that he understands the legal landscape..."',
      options: [
        "To deny under oath.",
        "To assert or declare with confidence.",
        "To request an exemption.",
        "To reluctantly admit a fault.",
      ],
      correctIndex: 1,
      explanation:
        '"Aver" means to assert positively, to declare as true. The eloquent client confidently states each polished sentence.',
    },
    {
      id: 2,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "abject" most nearly means:',
      quote:
        '"I have come to think that the abject part of this work — and there is one — is not the animosity couple. It is the eloquent client, in the moment of the retraction."',
      options: [
        "Joyful and uplifting.",
        "Wretched, painfully low or humiliating in quality.",
        "Strictly procedural and free of emotion.",
        "Financially lucrative.",
      ],
      correctIndex: 1,
      explanation:
        '"Abject" describes something painfully low, miserable, or humiliating — exactly the quality the narrator names in the moment of the eloquent client\'s contained humiliation.',
    },
    {
      id: 3,
      kind: "tone-purpose",
      prompt:
        'The narrator says many clients describe the difficult sessions as "cathartic" and adds, "The word is not mine." Why include that aside?',
      options: [
        'To brag about the narrator\'s own vocabulary at the clients\' expense.',
        'To distance the professional voice from a charged, almost therapeutic word — the narrator declines to claim that her work \"heals,\" but she also refuses to argue with a client who has reached for a word that is helping her, which sketches the mediator\'s careful neutrality.',
        'To suggest that the clients are misusing the word entirely.',
        'To indicate that the narrator does not speak the same language as her clients.',
      ],
      correctIndex: 1,
      explanation:
        'The aside marks the boundary the mediator draws around her own claims while still respecting the client\'s framing — a small but precise piece of professional restraint.',
    },
    {
      id: 4,
      kind: "inference",
      prompt:
        "Based on the passage, what can the reader most reasonably infer about why the narrator does not openly accuse the eloquent client when his numbers do not match the documents?",
      options: [
        "She fears the client will physically threaten her.",
        "She is required by law to remain silent on factual disputes.",
        "She has learned that an accusation ends the session and accomplishes nothing — laying out the documents and asking the client to walk through the arithmetic produces the retraction without forcing him into a defensive posture that would block any settlement.",
        "She believes the client is fundamentally honest and that the discrepancy is hers.",
      ],
      correctIndex: 2,
      explanation:
        "The text states the principle directly: an accusation ends the session and accomplishes nothing, while the documents do the work themselves.",
    },
    {
      id: 5,
      kind: "substitution",
      prompt:
        'Which single word could replace "decipher" in the sentence below without changing its meaning?',
      quote:
        '"And the arrangement, when I am paying attention, is what I have to decipher."',
      options: [
        "Memorize",
        "Decode",
        "Dismiss",
        "Translate into a foreign language",
      ],
      correctIndex: 1,
      explanation:
        '"Decode" matches "decipher" — both describe the work of figuring out a hidden meaning or pattern beneath a surface.',
    },
    {
      id: 6,
      kind: "main-idea",
      prompt:
        "Which sentence best summarizes the central idea or arc of the essay?",
      options: [
        "A divorce mediator argues that all clients are essentially dishonest and that mediation is therefore a waste of time.",
        "A divorce mediator describes three postures her clients arrive in and explains that the most demanding is the eloquent client — whose polished, organized self-presentation she must quietly read against the documents, producing a retraction without an accusation, and dispensing fairness without dispensing pity.",
        "A divorce mediator concludes that her ceramic kettle has done more for her clients than she has and announces her retirement.",
        "A divorce mediator advocates that all contested divorces should be sent directly to court without mediation.",
      ],
      correctIndex: 1,
      explanation:
        "The essay\'s central thread is the typology of postures and, especially, the careful handling of the eloquent client through the documents.",
    },
  ],
};

const MISSION_21_SET_2: SetReading = {
  title: "The Naturalist's Last Survey",
  subtitle:
    "A short story about an itinerant naturalist, a fledgling colony of orchids, and the imminent decision to make their location public.",
  format: "Short Story",
  readingMinutes: 4,
  words: [
    "enthrall",
    "eradicate",
    "fledgling",
    "fortitude",
    "fortuitous",
    "goad",
    "imminent",
    "incontrovertible",
    "itinerant",
    "magnanimous",
  ],
  passage: `Owen Reese had been an **itinerant** naturalist for thirty-one years, which is to say that he had never held a position longer than three field seasons and had never owned a house. His work — the slow census of small flowering plants in temperate forests — required him to travel, and the small grants that funded him were always tied to a specific watershed for a specific year.

In the autumn of his thirty-second year on the road, he made a discovery he had been quietly hoping for since he was twenty-three. On a north-facing slope above a tributary of the Otsego River, in a stand of old hemlock that had somehow escaped the logging operations of the 1920s, he found a **fledgling** colony of *Cypripedium kentuckiense* — the southern lady's slipper orchid — three hundred miles north of any previously documented occurrence.

He did not, on the day of the discovery, tell anyone. He had been a naturalist long enough to understand that a colony of forty-six plants in its first decade above the latitudinal line was, in any honest description, fragile. He counted the plants. He photographed each one. He recorded the GPS coordinates twice and stored them in two devices, one of which he posted, in a sealed envelope, to a colleague at the state herbarium with instructions not to open it for a year.

The discovery would, in due course, **enthrall** the small community of botanists who tracked the species. Owen knew this. He also knew that the same announcement, in the same season, would put the colony at substantial risk. The southern lady's slipper had been driven, in three of its previous range states, to near extinction by what botanists called, with rueful precision, "enthusiastic amateurs" — collectors who would, given the coordinates, drive eleven hours to dig up two plants for a backyard bog garden, and who, by repeated visits, would in the end **eradicate** the very colony they meant to celebrate.

He had until the following March to file his annual grant report. The report required, in standard practice, the disclosure of any range-significant discovery. The disclosure was, by the funder's policy, **imminent**: he could no more delay it past March than he could change the latitude of the slope.

He did not, in those four months, lack the **fortitude** to face the decision. He had faced harder ones. He did, however, want to make the right one, and the right one was not obvious.

It was a chance encounter — **fortuitous** in the strict sense, neither sought nor planned — that made the path clear. In late November, at a small conference in Cleveland, Owen sat next to a state forester whose district included the Otsego tributary, and over coffee the forester mentioned, without prompting, that her office had recently acquired the authority to designate "limited-access botanical reserves" — three-acre parcels closed to the public on the strength of a single peer-reviewed report.

Owen wrote the report over the winter. The peer review, which he had feared would **goad** him into premature disclosure, was instead conducted under a confidentiality protocol he had not known existed. The reviewers verified the find. The state designated the reserve in early March. The grant report, when filed, named the reserve and its protections in the same paragraph that named the species.

The community of botanists was, as he had predicted, both **enthralled** and slightly aggrieved — aggrieved, that is, that the precise coordinates had not been published. Owen wrote, in a brief follow-up note in the journal, that he understood the irritation, that he believed the **incontrovertible** evidence of past collector damage in the species' previous range states justified the reserve, and that he would, on request, share the coordinates with any verified researcher under the same confidentiality the state had used with him.

It was, his colleague at the herbarium would later say, the most **magnanimous** version of the announcement Owen could have made — generous to the species, generous to the science, and, in its own quiet way, generous even to the collectors who would now never find the slope.`,
  questions: [
    {
      id: 1,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "itinerant" most nearly means:',
      quote:
        '"Owen Reese had been an itinerant naturalist for thirty-one years, which is to say that he had never held a position longer than three field seasons and had never owned a house."',
      options: [
        "Permanently settled in one institutional position.",
        "Traveling from place to place, without a fixed long-term post.",
        "Recently retired from active fieldwork.",
        "Trained as a forest ranger rather than a botanist.",
      ],
      correctIndex: 1,
      explanation:
        '"Itinerant" describes someone who travels from place to place without a permanent base — exactly the working life the sentence then defines.',
    },
    {
      id: 2,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "incontrovertible" most nearly means:',
      quote:
        '"...he believed the incontrovertible evidence of past collector damage in the species\' previous range states justified the reserve..."',
      options: [
        "Easily challenged or disputed.",
        "Impossible to deny or argue against.",
        "Recently published in a single newspaper article.",
        "Restricted to the early 19th century.",
      ],
      correctIndex: 1,
      explanation:
        '"Incontrovertible" means impossible to controvert — beyond reasonable dispute. Owen invokes the strength of the evidence to justify withholding coordinates.',
    },
    {
      id: 3,
      kind: "tone-purpose",
      prompt:
        'The narrator says the colony of forty-six plants is "fledgling." Why use that word rather than "small"?',
      options: [
        '"Fledgling" is just a longer word for "small" with no other meaning.',
        '"Fledgling" carries the texture of something newly established and not yet able to fend for itself — a young bird just out of the nest. That nuance frames the colony as fragile in time, not just in number, which is exactly the vulnerability that drives Owen\'s caution.',
        '"Fledgling" implies the orchids were grown from eggs.',
        '"Fledgling" suggests the colony was already in decline.',
      ],
      correctIndex: 1,
      explanation:
        'The "newly established, not yet self-sufficient" nuance of "fledgling" sharpens the case for protective handling of the colony.',
    },
    {
      id: 4,
      kind: "inference",
      prompt:
        "Based on the passage, what can the reader most reasonably infer about why Owen sealed the GPS coordinates in an envelope to a herbarium colleague before announcing the find?",
      options: [
        "He intended to publish the find anonymously and could not afford a journal submission fee.",
        "He wanted a verifiable, independently held record of the discovery and its precise coordinates as of the day he found the colony — establishing priority and creating a trustworthy backup against his own death, theft, or device failure.",
        "He had been told by the herbarium that any new find had to be physically delivered to them.",
        "He no longer trusted his own memory of the slope.",
      ],
      correctIndex: 1,
      explanation:
        "The sealed envelope is a classic move to establish a tamper-evident, independently held priority record without exposing the coordinates publicly.",
    },
    {
      id: 5,
      kind: "substitution",
      prompt:
        'Which single word could replace "fortuitous" in the sentence below without changing its meaning?',
      quote:
        '"It was a chance encounter — fortuitous in the strict sense, neither sought nor planned — that made the path clear."',
      options: [
        "Premeditated",
        "Lucky",
        "Forbidden",
        "Annual",
      ],
      correctIndex: 1,
      explanation:
        '"Lucky" matches "fortuitous" in this context — both describe an unplanned, happily timed occurrence. The sentence even glosses it: "neither sought nor planned."',
    },
    {
      id: 6,
      kind: "main-idea",
      prompt:
        "Which sentence best summarizes the central idea or arc of the passage?",
      options: [
        "A naturalist refuses to share his discovery and is permanently expelled from his professional community.",
        "An itinerant naturalist makes a range-significant discovery, faces a deadline that would normally require public disclosure of coordinates, and — through a fortuitous encounter and a confidentiality protocol he had not known existed — secures the colony as a protected reserve before publishing the find, in a magnanimous version of the announcement.",
        "A state forester takes credit for a botanical discovery that was actually made by a freelance naturalist.",
        "A colony of orchids is destroyed by collectors within months of being discovered.",
      ],
      correctIndex: 1,
      explanation:
        "The arc is exactly the discovery, the disclosure problem, the fortuitous solution, and the protected, generous announcement.",
    },
  ],
};

const MISSION_21_SET_3: SetReading = {
  title: "The Spring Season at the Linden Theater",
  subtitle:
    "A short story about a small repertory company, a paradoxical casting choice, and the resilient perseverance of an actor whose valor was almost invisible from the audience.",
  format: "Short Story",
  readingMinutes: 4,
  words: [
    "meritorious",
    "mutiny",
    "paradoxical",
    "perseverance",
    "render",
    "repertoire",
    "resilient",
    "resolute",
    "supple",
    "valor",
  ],
  passage: `The Linden Theater had been run, for eleven seasons, on a model that no consultant would have recommended and that had, against every prediction, kept it solvent. Its repertory company of nine actors performed four plays a year on a single stage, and the company's artistic director, Idris Khan, made all his casting choices by hand and announced them in a single meeting in February.

The fourth production of the season in the year in question was *King Lear*. Idris had been thinking about it since the previous summer. The actor everyone in the company had assumed would play Lear was Stefan, the company's longtime lead, who had carried two of the previous three seasons on the strength of his deep, almost gravitational stage presence. The expectation was so settled that the company's stage manager had been quietly drafting the rehearsal schedule with Stefan's name penciled in.

Idris cast Mira instead.

Mira was forty-six. She had been with the company for nine seasons. Her **repertoire**, in that time, had included exactly two leading roles, both in modern plays, and a long string of secondary parts in which she had been, by every reviewer's account, **meritorious** without being remarkable. She had never, in the ordinary sense, been Idris's first choice for anything large. The casting was, on its face, **paradoxical** — a director with one of the most respected leading actors in the regional circuit choosing, for the season's most demanding role, an actor whose career had been built almost entirely on quiet, supporting work.

The company nearly mutinied. There was no formal **mutiny** — the Linden was not that kind of place — but in the week after the announcement, three private letters reached Idris's desk, each politely worded, each making the case that the season's reputation could not afford the gamble. Stefan himself, to his credit, wrote one of the letters; he asked only that Idris reconsider, and he closed by saying that he would, of course, accept whichever final decision Idris made.

Idris reconsidered for two evenings. He did not change his mind.

What followed, over the next eleven weeks of rehearsal, was the most quietly remarkable preparation any of the senior company members had ever watched. Mira arrived for every rehearsal with her lines fully memorized — not the day-of lines, the entire role — and with an interpretive choice for every scene that she was prepared to defend, alter, or abandon as Idris asked. She did not display, on any single afternoon, the kind of explosive talent that would have been visible to a casual observer; she displayed, instead, the **perseverance** of an actor who had been preparing to be invited into a role like this for fifteen years and who, having been invited, had no intention of arriving anything less than fully ready.

The role demanded a vocal range she did not naturally have, and she worked with a coach for six weeks until her voice was **supple** enough to carry the storm scene without cracking. The role demanded a physical collapse in the fourth act that would have been **resilient** to require even of an actor twenty years younger; she rehearsed the fall, with a movement coach, until she could **render** it without injury and without theatrical excess.

She opened on a Wednesday in late April. The reviews were, by the standards of the regional press, almost embarrassed in their reversal. The *Linden Reporter*'s critic, who had attended Linden openings for fourteen years, wrote that he had not understood, until that evening, what the company had been quietly cultivating in Mira through nine seasons of secondary parts, and that her performance possessed a quality he could only describe — at the risk of sounding old-fashioned — as a kind of **valor**: the unobtrusive courage of an actor who had taken the role seriously enough to be ready for it without ever announcing that she expected to be asked.

Idris did not, after the opening, give a curtain speech. He had remained, through eleven seasons, **resolute** about not putting the director onstage. Stefan, for his part, attended the second performance and went backstage afterward to embrace Mira. The company, the following season, voted unanimously to renew her contract.`,
  questions: [
    {
      id: 1,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "paradoxical" most nearly means:',
      quote:
        '"The casting was, on its face, paradoxical — a director with one of the most respected leading actors in the regional circuit choosing, for the season\'s most demanding role, an actor whose career had been built almost entirely on quiet, supporting work."',
      options: [
        "Perfectly logical and obvious to all observers.",
        "Seemingly contradictory or counterintuitive on its surface.",
        "Restricted by union rules.",
        "Officially condemned by the local critics\' association.",
      ],
      correctIndex: 1,
      explanation:
        '"Paradoxical" describes something that appears self-contradictory on its surface — exactly Idris\'s choice of a supporting actor over the obvious lead.',
    },
    {
      id: 2,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "supple" most nearly means:',
      quote:
        '"...she worked with a coach for six weeks until her voice was supple enough to carry the storm scene without cracking."',
      options: [
        "Stiff and resistant to change.",
        "Flexible, capable of adjusting easily without breaking.",
        "Dangerously loud and uncontrolled.",
        "Permanently lowered in pitch.",
      ],
      correctIndex: 1,
      explanation:
        '"Supple," applied to a voice, means flexible and able to bend without cracking — exactly what the storm scene demands.',
    },
    {
      id: 3,
      kind: "tone-purpose",
      prompt:
        'The critic describes Mira\'s performance as possessing a kind of "valor." Why use a moral word like "valor" for an acting performance?',
      options: [
        '"Valor" is simply a longer synonym for "skill" with no different meaning.',
        '"Valor" carries the sense of unobtrusive courage — the quiet kind of bravery that does not announce itself. The critic uses it deliberately to honor Mira\'s long, unshowy preparation: she was ready for a role like this without ever signaling that she expected to be asked, and "valor" names that quality more honestly than "talent" or "skill" would.',
        '"Valor" implies Mira had served in the military.',
        '"Valor" suggests the performance was reckless.',
      ],
      correctIndex: 1,
      explanation:
        'The moral weight of "valor" — quiet, unboasting courage — is exactly what the critic wants to credit in Mira\'s long, patient readiness.',
    },
    {
      id: 4,
      kind: "inference",
      prompt:
        'Based on the passage, what can the reader most reasonably infer about why Stefan\'s letter to Idris is described as being "to his credit"?',
      options: [
        "Stefan secretly believed Mira was the wrong choice and hoped to undermine her.",
        "Stefan made his case politely, asked only that Idris reconsider, and explicitly committed to accepting whichever final decision Idris made — preserving company discipline and dignity even while disagreeing with the casting.",
        "Stefan refused to attend any further rehearsals.",
        "Stefan wrote his letter only after the play had opened.",
      ],
      correctIndex: 1,
      explanation:
        "The text emphasizes the manner: a polite request to reconsider, an explicit acceptance of whatever Idris decided. The credit attaches to the form of the disagreement.",
    },
    {
      id: 5,
      kind: "substitution",
      prompt:
        'Which single word could replace "render" in the sentence below without changing its meaning?',
      quote:
        '"...she rehearsed the fall, with a movement coach, until she could render it without injury and without theatrical excess."',
      options: [
        "Refuse",
        "Perform",
        "Forget",
        "Translate",
      ],
      correctIndex: 1,
      explanation:
        '"Perform" matches "render" in this context — both describe carrying out or executing the action on stage.',
    },
    {
      id: 6,
      kind: "main-idea",
      prompt:
        "Which sentence best summarizes the central idea or arc of the passage?",
      options: [
        "A theater company is destroyed by an artistic director\'s reckless casting decision and dissolves at the end of the season.",
        "An artistic director makes a paradoxical casting choice, faces a near-mutiny among his company, and is vindicated by an actor whose long, unshowy perseverance and supple preparation produce a performance the regional critics describe with the moral weight of valor.",
        "A long-serving lead actor refuses to relinquish his expected role and forces the company to reverse the casting.",
        "A repertory theater abandons classical productions in favor of modern plays.",
      ],
      correctIndex: 1,
      explanation:
        "The arc is precisely the casting, the resistance, the rehearsal preparation, and the critical recognition of valor.",
    },
  ],
};

const MISSION_22_SET_1: SetReading = {
  title: "The Editor in the Cutting Room",
  subtitle:
    "A short story about a documentary editor who refused to embellish, the cumbersome footage she would not falter under, and the single arresting image that exonerated her subject.",
  format: "Short Story",
  readingMinutes: 4,
  words: [
    "arresting",
    "chastise",
    "cumbersome",
    "economy",
    "elementary",
    "embellish",
    "euphoric",
    "exonerate",
    "extrapolate",
    "falter",
  ],
  passage: `Maeve Olin had been the lead editor on Iris Tan's documentary about the Hollis case for fourteen months by the time the rough cut was due. The footage was **cumbersome** — three hundred and forty hours, recorded across two countries, of interviews with everyone who had been in the courtroom and a great many people who had not — and Iris's instructions, on the day Maeve had been hired, had been precise: tell the story without embellishing it, and do not, under any circumstances, **embellish** the testimony of the one witness whose recantation had broken the case open.

Maeve had taken the instruction seriously. She had taken it, in fact, more seriously than Iris had perhaps intended. Over fourteen months she had built a cut of the film whose central **economy** was almost monastic — each scene stripped to the single sentence that did the work, no music under the most charged interviews, the camera held on a face for two long beats after the answer rather than cutting away to commentary.

Iris, when she watched the rough cut for the first time, did not **chastise** Maeve. She did, however, ask, three times in the same evening, whether the cut was too austere — whether the audience would understand the gravity of what they were watching without more aggressive scoring under the recantation, without a stronger orchestral lift over the verdict, without a longer montage at the end to **extrapolate** from Hollis's case to the broader pattern the film was meant to suggest.

Maeve did not, in reply, **falter**. She had anticipated every one of Iris\'s questions and had, on her laptop, three alternate cuts of each contested scene — one with the music Iris was suggesting, one with a softer score, one bare. She played the bare cut last, every time. The bare cut, every time, was the cut Iris ended up agreeing with by the end of the evening.

The decisive scene, the one the film would be remembered for, was a single ninety-second sequence in the final reel. It was not, on the page, a complicated piece of editing. The footage was a static medium shot of the recanting witness, Doris Vahn, looking off-camera while the prosecutor\'s deposition from twelve years earlier played as voice-over. The match between her present face and her past words was **arresting** — there was no other word for it — and Maeve had built the sequence on the **elementary** principle that an editor\'s most powerful tool, when the material is strong, is the willingness to leave it alone.

The film opened in March. The reviews were not, in the first week, **euphoric**. They were measured, careful, almost wary — as if the critics were unwilling, on a single viewing, to commit to the praise the film clearly deserved. Within three weeks, however, a long essay in a national magazine identified the ninety-second sequence as the editorial choice of the year, and the reviews that followed adjusted accordingly.

The film also produced, six months later, a result no one had quite anticipated. The state attorney\'s office, which had spent the previous decade declining to revisit the Hollis conviction, opened a formal review. The review, in its second year, would **exonerate** Hollis. Iris, asked in a later interview what had moved the attorney\'s office, replied that she did not know — but that her best guess was that the same ninety-second sequence that had moved the critics had moved a single deputy attorney to read the original deposition for himself.

Maeve, asked about the same scene, said only that the footage had been doing the work and that her job had been to refuse, ninety seconds at a time, to get in its way.`,
  questions: [
    {
      id: 1,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "arresting" most nearly means:',
      quote:
        '"The match between her present face and her past words was arresting — there was no other word for it..."',
      options: [
        "Forgettable and easily skipped.",
        "Striking enough to seize and hold the viewer\'s attention.",
        "Officially confiscated by the police.",
        "Quiet and difficult to perceive.",
      ],
      correctIndex: 1,
      explanation:
        '"Arresting" means strikingly enough to seize attention — exactly the visual effect the matched footage produces.',
    },
    {
      id: 2,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "extrapolate" most nearly means:',
      quote:
        '"...without a longer montage at the end to extrapolate from Hollis\'s case to the broader pattern the film was meant to suggest."',
      options: [
        "To extract evidence under hostile questioning.",
        "To extend a known case or pattern outward to draw a broader conclusion.",
        "To formally retract a published statement.",
        "To restrict an argument to a single example.",
      ],
      correctIndex: 1,
      explanation:
        '"Extrapolate" means to extend known data or a known case outward to a wider claim — which is exactly what the proposed montage would do.',
    },
    {
      id: 3,
      kind: "tone-purpose",
      prompt:
        'The narrator describes the cut\'s "economy" as "almost monastic." Why use that word rather than "minimal"?',
      options: [
        '"Monastic" implies the editor was religiously observant.',
        '"Monastic" carries the texture of disciplined, almost devotional restraint — a sparseness adopted on principle, not a sparseness imposed by a small budget. That nuance honors Maeve\'s editorial conviction; "minimal" would have only described the surface.',
        '"Monastic" is just a longer way of saying "short" with no different meaning.',
        '"Monastic" suggests Iris was unhappy with the cut.',
      ],
      correctIndex: 1,
      explanation:
        'The disciplined, devotional quality of "monastic" elevates a stylistic choice into a stance — exactly the editorial conviction the story honors.',
    },
    {
      id: 4,
      kind: "inference",
      prompt:
        "Based on the passage, what can the reader most reasonably infer about why Maeve always played the bare cut last when answering Iris\'s questions about scoring?",
      options: [
        "She wanted to bore Iris into agreement through repetition.",
        "She had no time to prepare the alternate cuts properly.",
        "Played last, after the more decorated alternatives, the bare cut would let Iris feel the difference for herself rather than being argued into it — turning the choice from a debate into a side-by-side experience whose result Iris could read in her own response.",
        "Iris had explicitly required her to play cuts in that order.",
      ],
      correctIndex: 2,
      explanation:
        "The structural point is exactly that ordering: the bare cut last lets the contrast do the persuading rather than Maeve\'s argument.",
    },
    {
      id: 5,
      kind: "substitution",
      prompt:
        'Which single word could replace "exonerate" in the sentence below without changing its meaning?',
      quote:
        '"The review, in its second year, would exonerate Hollis."',
      options: [
        "Convict",
        "Clear",
        "Sentence",
        "Investigate",
      ],
      correctIndex: 1,
      explanation:
        '"Clear" matches "exonerate" — both describe officially absolving someone of blame or guilt. "Convict" is the opposite.',
    },
    {
      id: 6,
      kind: "main-idea",
      prompt:
        "Which sentence best summarizes the central idea or arc of the passage?",
      options: [
        "A documentary editor inflates her subject\'s testimony to make a more dramatic film and is later sued for defamation.",
        "A documentary editor refuses to embellish her cumbersome footage, holds an almost monastic economy through every contested scene, and produces a single arresting ninety-second sequence whose restraint moves both the critics and, eventually, the deputy attorney whose review will exonerate the film\'s subject.",
        "A documentary director reshoots the entire film after the rough cut is rejected by the studio.",
        "A wrongfully convicted man is exonerated by new DNA evidence unrelated to the documentary.",
      ],
      correctIndex: 1,
      explanation:
        "The arc moves precisely through Maeve\'s editorial restraint, the bare cut\'s vindication, and the eventual exoneration that the unembellished sequence helps to set in motion.",
    },
  ],
};

const MISSION_22_SET_2: SetReading = {
  title: "The Heterodox Paper at the Williamstown Conference",
  subtitle:
    "A short story about a young economist, a fervent objection from the discussant, and the painstaking refusal to make a histrionic gaffe.",
  format: "Short Story",
  readingMinutes: 4,
  words: [
    "fervent",
    "foment",
    "gaffe",
    "heterodox",
    "histrionic",
    "implicit",
    "inviolate",
    "liability",
    "obstinate",
    "painstaking",
  ],
  passage: `Selma Idris had been working on the paper for nineteen months by the time she submitted it to the Williamstown summer conference. The paper made a single, narrow, and — by the standards of her field — frankly **heterodox** claim: that a small but consistent share of the productivity gains attributed in the standard literature to a particular labor-market reform was, on closer inspection of the underlying state-level data, attributable instead to a coincident change in retail-sector reporting requirements that had not previously been controlled for.

The claim was small. It was, by Selma's count, a four-percentage-point reattribution. It was also, given the citation footprint of the original paper, the kind of correction that almost no one who had built later work on top of the original result would be eager to see in print.

Williamstown accepted the paper. The discussant assigned to it was Professor Rourke, a man whose reputation in the field rested in significant part on a 2009 paper that had relied, **implicitly**, on the very reattribution Selma was now contesting. Rourke had been heard, that spring, to call the working draft "a clever exercise in selective controls."

Selma had three choices. She could withdraw the paper, which would leave its claim unaired. She could shorten the paper to its smallest possible form, hoping to slip it past Rourke's objections through brevity. Or she could deliver the paper she had written.

She delivered the paper she had written.

The presentation itself was almost **painstaking**. She walked through every robustness check. She showed the reattribution under each of the seven leading specifications in the prior literature. She named, openly, the limits of her data — three states whose retail-reporting changes were poorly documented and whose results she had therefore excluded from the headline finding and footnoted separately. The footnote was, by the standards of the conference, almost luxuriously honest.

Rourke responded with what could only be called a **fervent** objection. His tone was sharp; his structure was unstructured. He accused the paper, in his opening five minutes, of "fomenting confusion in a literature that had reached settled agreement," and his use of the word **foment** was so deliberate that several senior economists in the back row visibly flinched at the choice. He did not, however, identify a specific specification he wished Selma to alter. He named no robustness check he wished her to add. He spoke, instead, in long, rolling sentences about the dangers of revising widely cited results on the strength of "marginal data."

Selma did not, in reply, become **histrionic**. She had braced, for nineteen months, for exactly this kind of response, and she had decided in advance — on a long walk that previous spring — that any **gaffe** she committed in the moment of the rebuttal would do far more damage to the paper than the rebuttal itself.

She thanked Rourke for the comment. She agreed that revising widely cited results required care. She offered, then, to walk the room through any single specification Rourke wanted to see, in any order he preferred, and asked him to name one. He did not name one. The senior economist chairing the session, whose own work had not depended on the disputed reattribution, suggested, gently, that they move to the floor.

Two questions from the floor — both technical, both addressed in the paper's appendix — were quickly answered. A third question, from a junior economist Selma did not know, asked whether her appendix table on the three excluded states could be extended to a working-paper version. She agreed. The session ended on time.

The paper, in its eventual published form, carried a footnote acknowledging Rourke's objection and explaining, in two sentences, why she did not believe it required a revision. The footnote was, in the small community that read these things carefully, regarded as **inviolate** — courteous to the discussant, committed to the result, and **obstinate** in the most professional sense of the word.

The paper would, three years later, be cited in twelve subsequent papers as the corrective reference. Rourke's 2009 paper would not be retracted. It would, however, be cited from then on, by careful authors, with a small bracketed note pointing to Selma\'s correction.

Selma considered the small bracketed note a perfectly adequate **liability** for a 2009 paper to bear.`,
  questions: [
    {
      id: 1,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "heterodox" most nearly means:',
      quote:
        '"The paper made a single, narrow, and — by the standards of her field — frankly heterodox claim..."',
      options: [
        "In strict agreement with the field\'s prevailing consensus.",
        "Departing from accepted or orthodox views in the field.",
        "Restricted to a single state\'s data.",
        "Sponsored by a private foundation rather than a university.",
      ],
      correctIndex: 1,
      explanation:
        '"Heterodox" means departing from established or orthodox views — exactly Selma\'s position relative to the standard literature.',
    },
    {
      id: 2,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "histrionic" most nearly means:',
      quote:
        '"Selma did not, in reply, become histrionic."',
      options: [
        "Quietly resigned and uncommunicative.",
        "Excessively dramatic or theatrical in emotional display.",
        "Strictly mathematical in argumentation.",
        "Hidden behind a colleague\'s presentation.",
      ],
      correctIndex: 1,
      explanation:
        '"Histrionic" describes excessively theatrical, overwrought emotional display — exactly the response Selma chooses not to give.',
    },
    {
      id: 3,
      kind: "tone-purpose",
      prompt:
        'The narrator says Rourke\'s use of the word "foment" was "so deliberate that several senior economists in the back row visibly flinched." Why does the choice of "foment" matter so much?',
      options: [
        '"Foment" simply means "to start" with no other meaning.',
        '"Foment" carries the texture of stirring up agitation or trouble — usually used about unrest, sedition, or scandal — so applying it to a careful four-percentage-point reattribution is rhetorically out of proportion. The flinch acknowledges that Rourke has reached for a word whose freight far exceeds the technical claim it is being aimed at.',
        '"Foment" implies Rourke had personal experience as a labor organizer.',
        '"Foment" is a routine term in academic discussion.',
      ],
      correctIndex: 1,
      explanation:
        'The word\'s connotations of stirring up agitation are wildly disproportionate to a narrow technical correction — which is why the senior economists flinch at the choice.',
    },
    {
      id: 4,
      kind: "inference",
      prompt:
        "Based on the passage, what can the reader most reasonably infer about why Selma offered to walk Rourke through any specification he wanted to see, rather than directly rebutting his speech?",
      options: [
        "She did not actually understand Rourke\'s objection and was hoping he would explain it for her.",
        "She had decided in advance that any in-the-moment gaffe would do more damage than the objection itself, and an open invitation to name a specification both stayed inside her painstaking technical posture and exposed the fact that Rourke had named none — without her ever having to say so.",
        "Conference rules required all rebuttals to take the form of an invitation.",
        "She intended to publicly humiliate Rourke in front of the senior economists.",
      ],
      correctIndex: 1,
      explanation:
        "The text frames her rebuttal as a deliberate refusal of histrionics. The invitation to name a specification quietly highlights Rourke\'s lack of one without any direct accusation.",
    },
    {
      id: 5,
      kind: "substitution",
      prompt:
        'Which single word could replace "obstinate" in the sentence below without changing its meaning?',
      quote:
        '"...obstinate in the most professional sense of the word."',
      options: [
        "Yielding",
        "Stubborn",
        "Forgetful",
        "Anonymous",
      ],
      correctIndex: 1,
      explanation:
        '"Stubborn" matches "obstinate" — both describe a refusal to give way. The sentence specifies that this stubbornness is the professional, principled kind.',
    },
    {
      id: 6,
      kind: "main-idea",
      prompt:
        "Which sentence best summarizes the central idea or arc of the passage?",
      options: [
        "A young economist withdraws her paper after a senior discussant objects and abandons her career.",
        "A young economist presents a heterodox correction at a major conference, absorbs a fervent and disproportionate objection from a discussant whose own earlier work is implicated, refuses to commit a histrionic gaffe in reply, and over time sees her painstaking footnote become the corrective reference cited by careful authors.",
        "A senior economist successfully blocks the publication of a paper that contradicts his earlier work.",
        "A conference dissolves into chaos after a discussant\'s objection prevents any further discussion of the paper.",
      ],
      correctIndex: 1,
      explanation:
        "The arc moves through the heterodox paper, the painstaking presentation, the disciplined rebuttal, and the slow vindication in the literature.",
    },
  ],
};

const MISSION_22_SET_3: SetReading = {
  title: "The Casting Notice for the Spring Season",
  subtitle:
    "A short story about a phlegmatic ballet director, a prodigious young dancer, and a tentative casting choice no one wanted to renege on.",
  format: "Short Story",
  readingMinutes: 4,
  words: [
    "phlegmatic",
    "prodigious",
    "propensity",
    "qualm",
    "renege",
    "stinting",
    "temper",
    "tentative",
    "unprecedented",
    "vivacious",
  ],
  passage: `Lev Petrov had been the artistic director of the Ardmore Ballet for twenty-three years, and his reputation in the company was, even by the famously even-keeled standards of senior choreographers, **phlegmatic**. He did not raise his voice. He did not, in the memory of the dancers currently in the company, deliver a passionate speech of any kind. He posted his casting decisions on a notice board on a Wednesday afternoon and considered the conversation closed.

The notice for the spring season's principal role in *The Mariner's Daughter* — a new work choreographed by Lev himself — was, in the year in question, **unprecedented**. He had cast Tova Aldenfeldt, a nineteen-year-old who had joined the corps from the academy only fourteen months earlier. She had never danced a principal role at any company. The role had, in every previous season's production, been given to a senior dancer with at least eight years of company experience.

The notice produced, almost immediately, the reaction Lev had quietly expected. Two of the senior dancers came to his office that evening, neither of them the dancer who would have been the conventional first choice, and asked, with care, whether he had considered the message the casting would send to the rest of the company. They did not, in their phrasing, ask him to **renege** on the decision. They asked, more gently, whether he was confident.

Lev was confident. He was also, characteristically, willing to explain why.

Tova was, he said, a **prodigious** dancer — not in the casual sense in which the word was sometimes used in a company press release, but in the older, more demanding sense of someone whose technical and interpretive range, at nineteen, had already exceeded what most dancers acquired by twenty-eight. He had been watching her since the academy. He had no **qualm** about her readiness for the choreography itself; he had built much of the choreography, in fact, with her physical phrasing in mind.

The senior dancers nodded. They did not press further. They did, however, raise the company's longstanding concern about the **propensity** of young dancers in principal roles to be injured early — a concern Lev took seriously and had, in fact, addressed before the notice went up by extending the rehearsal calendar by three weeks and adding a movement coach to the production budget.

The casting was, in the language Lev would use with the company manager the following morning, **tentative** in only one specific sense: the run included eight performances, and Tova would dance the first six, with the senior alternate, Maris, dancing the seventh and eighth. The alternation was, on its face, a courtesy to Maris and a precaution against fatigue; in private, Lev would also acknowledge that it preserved the company's ability to recover gracefully if the casting did not work.

Tova opened on a Thursday in late March. She was, by every reviewer's account, **vivacious** in the technical demands of the first act and unexpectedly restrained in the emotional demands of the second — a combination the *Ardmore Reporter*'s critic singled out as "the rarest quality the company has presented in a debut in nineteen years." Lev did not, in any backstage conversation, claim credit for the casting. He did, however, refuse to **temper** his praise of the performance when asked about it. He had not been **stinting** in any element of the rehearsal preparation, and he saw no reason to be stinting, now, in his account of the result.

Maris danced the seventh and eighth performances with a generosity that struck the company at the time and would be remembered later. She did not, in any private remark to her colleagues, suggest that the casting had been wrong. She said, when asked, that the choreography had been built for the dancer, that the dancer had been ready for it, and that her own role in the production had been to remind the audience, on two evenings out of eight, what a different set of forty-four years on the same stage could bring to the same steps.

The casting was renewed for the following season. Tova and Maris alternated again, on the same six-and-two pattern, by joint request.`,
  questions: [
    {
      id: 1,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "phlegmatic" most nearly means:',
      quote:
        '"...his reputation in the company was, even by the famously even-keeled standards of senior choreographers, phlegmatic."',
      options: [
        "Quick to anger and emotionally volatile.",
        "Calm, unexcitable, and steady in temperament.",
        "Technically gifted as a young dancer.",
        "Frequently absent from rehearsals.",
      ],
      correctIndex: 1,
      explanation:
        '"Phlegmatic" describes a calm, unexcitable temperament — exactly the steadiness the company knows Lev for.',
    },
    {
      id: 2,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "prodigious" most nearly means:',
      quote:
        '"Tova was, he said, a prodigious dancer — not in the casual sense in which the word was sometimes used in a company press release, but in the older, more demanding sense of someone whose technical and interpretive range, at nineteen, had already exceeded what most dancers acquired by twenty-eight."',
      options: [
        "Promising in only a small, narrow technical area.",
        "Extraordinarily great in ability or amount, far beyond the usual.",
        "Restricted to corps-level work for the foreseeable future.",
        "Recently injured and unable to perform.",
      ],
      correctIndex: 1,
      explanation:
        '"Prodigious" describes a degree of ability far beyond the ordinary — and the sentence even contrasts the demanding older sense Lev means against the casual press-release sense.',
    },
    {
      id: 3,
      kind: "tone-purpose",
      prompt:
        'The narrator says Lev described the casting as "tentative in only one specific sense." Why is the limit in that phrase important?',
      options: [
        '"Tentative" is just a longer word for "permanent" with no different meaning.',
        '"Tentative" implies the entire production might be canceled at any moment.',
        'The word "tentative" naturally suggests broad uncertainty, but Lev is not uncertain about Tova\'s readiness — he is hedging only against fatigue and graceful recovery. The qualifier "in only one specific sense" preserves both his confidence in the casting and his prudence about the eight-performance run.',
        'The narrator is signaling that Lev is privately about to renege.',
      ],
      correctIndex: 2,
      explanation:
        'The qualifier separates institutional caution from personal doubt. Lev is hedging operationally, not artistically.',
    },
    {
      id: 4,
      kind: "inference",
      prompt:
        "Based on the passage, what can the reader most reasonably infer about why Lev had already extended the rehearsal calendar and added a movement coach before the notice went up?",
      options: [
        "He intended to fail Tova\'s casting and document the failure for the company\'s records.",
        "He had anticipated the senior dancers\' concern about the well-known propensity of young dancers in principal roles to be injured early, and had taken concrete preventive steps before the question was even raised — so that when it was raised, his answer was already in the rehearsal calendar.",
        "He had been ordered to do so by the company\'s board.",
        "He believed Tova was insufficiently prepared and needed remedial training.",
      ],
      correctIndex: 1,
      explanation:
        "The text presents the extended calendar and movement coach as an answer Lev had already prepared, so that the senior dancers\' concern, when it came, was met with practice rather than promise.",
    },
    {
      id: 5,
      kind: "substitution",
      prompt:
        'Which single word could replace "stinting" in the sentence below without changing its meaning?',
      quote:
        '"He had not been stinting in any element of the rehearsal preparation..."',
      options: [
        "Sparing",
        "Generous",
        "Forgetful",
        "Public",
      ],
      correctIndex: 0,
      explanation:
        '"Sparing" matches "stinting" — both describe holding back, providing only a little. Lev is the opposite: he gave the rehearsal everything it needed.',
    },
    {
      id: 6,
      kind: "main-idea",
      prompt:
        "Which sentence best summarizes the central idea or arc of the passage?",
      options: [
        "A young dancer is forced into a principal role she is not ready for and is injured during the run.",
        "A phlegmatic artistic director casts a prodigious nineteen-year-old in an unprecedented principal role, addresses the company\'s injury concerns through extended rehearsal and an alternate-performance schedule, and refuses to temper his praise when the casting succeeds and is generously honored by the senior alternate.",
        "A senior dancer successfully petitions the company\'s board to remove a junior dancer from the principal role.",
        "A ballet company cancels its spring production after disagreement over casting.",
      ],
      correctIndex: 1,
      explanation:
        "The arc traces precisely the casting, the senior dancers\' concern, the preventive measures already in place, the successful debut, and the generous alternation that follows.",
    },
  ],
};

const MISSION_23_SET_1: SetReading = {
  title: "The Poet at the Convalescent House",
  subtitle:
    "A personal essay on returning to writing after a long illness — and on the difference between curbing one\'s ambition and conserving it.",
  format: "Personal Essay",
  readingMinutes: 4,
  words: [
    "allusive",
    "astute",
    "commence",
    "convalescent",
    "curb",
    "decry",
    "duress",
    "evoke",
    "fawn",
    "fret",
  ],
  passage: `I arrived at the residency in October, three months after my discharge from the hospital, in the **convalescent** condition that one of my doctors had carefully described as "mostly recovered, please continue to behave as if you are not." I had not written a poem in fourteen months. I had brought, in a small notebook, the first lines of three poems I had abandoned in March and a single complete draft of a fourth that I no longer recognized as mine.

The director of the residency was a poet I had admired for twenty years. She was, in person, exactly the **astute**, slightly amused presence her work had led me to expect — a woman who could read a draft once and identify, in three quiet sentences, what the poem had meant to be doing and where it had quietly given up. She did not, on my first afternoon, **fawn** over my published work. She did not, more importantly, **fret** over my health. She offered tea. She showed me my room. She said that the only schedule the residency enforced was that the dining hall opened at seven and closed at eight, and that the rest of the day was mine.

I did not, in my first week, **commence** any of the abandoned poems. I sat at the desk. I read three books I had been carrying in my bag. I walked, slowly, on the gravel paths the previous residents had worn between the cottages. I noticed, with the kind of distant interest a long illness produces, that I was no longer in any rush.

The temptation, in my second week, was to **curb** my ambition — to decide, on the strength of fourteen months without writing, that whatever I produced at the residency should be a small, modest, recovery-shaped thing. I noticed the temptation. I declined it. I had read enough poems by writers returning from illness to know that the small, modest, recovery-shaped poem was a genre the poet usually came to **decry** five years later, when she could see it had been a hedge against the larger poem she had been afraid to attempt.

What I attempted, instead, was a long sequence I had been thinking about since before the illness — a sequence of seven poems that would **evoke**, without naming directly, a series of weeks I had spent in my grandmother\'s house at twelve. The mode I had been planning for it, even before the residency, was deliberately **allusive**: each poem would gesture at its scene through a single object — a window, a chair, a particular hymn — without ever describing the scene itself.

I worked on the sequence for nine weeks. The director read each poem when I asked her to and not before. She made, across the nine weeks, perhaps eleven sentences of comment in total. The most useful of them, on the fourth poem, was that the chair I had chosen as the central object was working in the poem only because the reader did not need to be told what it had stood beside — and that as soon as I tried to clarify the scene, the chair would stop doing the work the allusion had been doing for me.

I deleted four lines of clarification I had written that morning. The poem held.

I left the residency in late December with six of the seven poems complete and the seventh in a draft I trusted. I had not written under any **duress**, internal or external. I had not written under the pressure of recovery, which is its own kind of duress, the most insidious kind. I had written under the conditions any writer should hope to write under: warm room, distant deadline, an astute reader who would not fawn, would not fret, and would say only the eleven sentences the poems actually needed.

The sequence appeared the following autumn in a small magazine I had read, faithfully, since I was twenty-three. I have not, in the years since, decried it.`,
  questions: [
    {
      id: 1,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "convalescent" most nearly means:',
      quote:
        '"I arrived at the residency in October, three months after my discharge from the hospital, in the convalescent condition that one of my doctors had carefully described as \'mostly recovered, please continue to behave as if you are not.\'"',
      options: [
        "Fully restored to pre-illness health.",
        "In the slow process of recovering from illness.",
        "Permanently disabled and unable to continue writing.",
        "Newly diagnosed with an unrelated condition.",
      ],
      correctIndex: 1,
      explanation:
        '"Convalescent" describes someone in the slow recovery phase after illness — exactly the doctor\'s "mostly recovered, please continue to behave as if you are not."',
    },
    {
      id: 2,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "allusive" most nearly means:',
      quote:
        '"The mode I had been planning for it, even before the residency, was deliberately allusive: each poem would gesture at its scene through a single object — a window, a chair, a particular hymn — without ever describing the scene itself."',
      options: [
        "Explicitly literal, with every detail spelled out for the reader.",
        "Working through indirect reference and suggestion rather than direct statement.",
        "Restricted to a single end rhyme throughout the sequence.",
        "Composed entirely in a foreign language.",
      ],
      correctIndex: 1,
      explanation:
        '"Allusive" describes a style that gestures or hints at something rather than naming it directly — exactly the object-as-reference technique the narrator describes.',
    },
    {
      id: 3,
      kind: "tone-purpose",
      prompt:
        'The narrator says she noticed the temptation to "curb" her ambition and "declined it." Why frame the temptation as one of curbing, rather than of merely "writing less"?',
      options: [
        '"Curb" is just a synonym for "write less" with no different meaning.',
        '"Curb" implies the narrator considered abandoning poetry entirely.',
        '"Curb" carries the precise sense of restraining or reining in something that would otherwise run further. Naming the temptation that way clarifies that the issue was not energy but self-imposed limitation — a recovery-shaped hedge against the larger poem she was afraid to attempt.',
        '"Curb" implies the narrator was forced by her doctors to write less.',
      ],
      correctIndex: 2,
      explanation:
        'The verb "curb" carries the texture of self-restraint on something otherwise capable of going further — exactly the recovery-shaped hedge the narrator names and refuses.',
    },
    {
      id: 4,
      kind: "inference",
      prompt:
        "Based on the passage, what can the reader most reasonably infer about why the director\'s comment that the chair worked because the reader did not need to be told what it had stood beside was so useful to the narrator?",
      options: [
        "The director was secretly rewriting the narrator\'s poems and merely pretending to comment on them.",
        "The director\'s sentence diagnosed exactly the temptation the narrator had been about to indulge — to clarify the scene around the chair — and named the cost: clarification would dissolve the allusive work the chair was doing, turning the poem from a gesture into a description.",
        "The director was suggesting the narrator should add four lines of clarification to the poem.",
        "The director was unfamiliar with the structure of the sequence.",
      ],
      correctIndex: 1,
      explanation:
        "The text shows the narrator deleting four lines of clarification she had written that morning — the comment named the temptation precisely.",
    },
    {
      id: 5,
      kind: "substitution",
      prompt:
        'Which single word could replace "duress" in the sentence below without changing its meaning?',
      quote:
        '"I had not written under any duress, internal or external."',
      options: [
        "Pressure",
        "Praise",
        "Vacation",
        "Encouragement",
      ],
      correctIndex: 0,
      explanation:
        '"Pressure" matches "duress" — both describe constraint or coercion that pushes one to act. The narrator emphasizes that the residency provided neither external nor internal pressure of that kind.',
    },
    {
      id: 6,
      kind: "main-idea",
      prompt:
        "Which sentence best summarizes the central idea or arc of the essay?",
      options: [
        "A poet returns from illness, shrinks her ambition into a small recovery-shaped poem, and is praised for her restraint.",
        "A poet recovering from illness arrives at a residency, declines the temptation to curb her ambition into something merely recovery-shaped, attempts a longer allusive sequence under the spare, astute attention of a director who refuses to fawn or fret, and leaves with the work she had set out to do.",
        "A poet quarrels with the director of a residency over the structure of an unfinished sequence and leaves early.",
        "A poet decides during a residency that she will never write poetry again.",
      ],
      correctIndex: 1,
      explanation:
        "The essay\'s spine is exactly the refusal of the recovery-shaped hedge, the disciplined attempt at the larger sequence, and the spare guidance that lets it hold.",
    },
  ],
};

const MISSION_23_SET_2: SetReading = {
  title: "The Captain and the Mettlesome First Mate",
  subtitle:
    "A short story about a long delivery sail, an intermittent storm, and a captain who chose to mollify rather than neutralize a headstrong officer.",
  format: "Short Story",
  readingMinutes: 4,
  words: [
    "glib",
    "headstrong",
    "intermittent",
    "ire",
    "languid",
    "lull",
    "mettlesome",
    "mollify",
    "neutralize",
    "nonplussed",
  ],
  passage: `Captain Astrid Holm had been hired to deliver the *Sven Vasa* — a sixty-foot sloop newly built in Helsinki — across the North Atlantic to her owner in Newport. The voyage was scheduled for nineteen days. The crew was four people, including herself, and the first mate, a thirty-one-year-old former racing skipper named Per Linkov, was the only crew member Astrid had not personally chosen. The owner had recommended him.

Per was, by every standard the racing world used, an extremely good sailor. He was also, by the same standards, **headstrong** — a quality that won races and lost crews. Astrid had not, before departure, regarded the recommendation as a problem. She had regarded it, more accurately, as a problem she would have to manage.

The first three days were **languid**. The wind was light. The boat moved north and west under reduced sail, and the four of them learned, by repetition, the small differences between the *Sven Vasa* and the boats they had each sailed before. Per made one **glib** remark on the second afternoon — a quick, polished suggestion that the watch schedule Astrid had drawn up was "more conservative than the boat needs" — and Astrid, characteristically, did not respond to it at the time. She had decided, before the voyage, that she would not engage Per in the small social tests she expected him to run.

The first storm arrived on the morning of the fifth day. It was not a severe storm. It was, however, **intermittent** — wind fifteen, then thirty, then back to twenty within an hour, a pattern that demanded constant adjustment of sail and that punished any captain who set a single configuration and walked away from it.

It was during the second sail change that Per overruled, in front of the rest of the crew, a specific instruction Astrid had given to reef the main one notch deeper than he thought necessary. He did not phrase the overruling as a confrontation. He phrased it as a **mettlesome** correction — the kind of crisp, confident counter-call that, on a racing boat, would have been admired and acted on.

On the *Sven Vasa*, on a delivery, with two crew members who had not sailed together before that week, the call landed differently. The crew, momentarily **nonplussed**, looked from Per to Astrid and visibly waited.

Astrid did not, in that moment, choose to **neutralize** Per\'s call by reasserting hers. She had three reasons, all of them weighed in the half-second before she spoke. The crew needed, above all, a single command structure for the next ninety minutes; an open dispute on the foredeck would not produce that. The reef Per was suggesting was not, by her own honest assessment, dangerous — only less conservative than she preferred. And she would, in any case, have to keep sailing with Per for fourteen more days.

She nodded once. She said, evenly, "Per\'s call." The crew executed the reef.

The intermittent wind continued for another five hours. The boat handled. No one was hurt. In a quiet **lull** at the end of her watch, after the wind had settled and the sail plan had stabilized, Astrid sent the rest of the crew below and asked Per to remain on deck.

She did not deliver her **ire**. She had been, in her career, sometimes prone to it; she had learned, slowly, that it produced no effect on a sailor of Per\'s temperament except to harden him into the next confrontation. She **mollified** her tone instead. She said, in three sentences, that she had supported his call on the foredeck because the crew had needed a single command structure in the moment, that she would do the same again if a similar call arose, and that she expected him, in any future case where he disagreed with one of her instructions, to bring the disagreement to her privately at the change of watch — and to execute her instruction in the meantime.

Per did not, at first, respond. When he did, he said only that he understood. He kept the agreement for the remaining thirteen days. The *Sven Vasa* arrived in Newport on schedule, with a logbook that recorded one disputed sail change and no second.`,
  questions: [
    {
      id: 1,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "headstrong" most nearly means:',
      quote:
        '"Per was, by every standard the racing world used, an extremely good sailor. He was also, by the same standards, headstrong — a quality that won races and lost crews."',
      options: [
        "Cautiously deferential to senior officers in every situation.",
        "Determined to have one\'s own way; willful and obstinately self-directed.",
        "Highly skilled at navigation by stars.",
        "Easily seasick under most conditions.",
      ],
      correctIndex: 1,
      explanation:
        '"Headstrong" describes a stubborn willfulness — exactly the quality that makes Per excellent on a racing boat and risky on a crew delivery.',
    },
    {
      id: 2,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "mollify" most nearly means:',
      quote:
        '"She mollified her tone instead. She said, in three sentences, that she had supported his call on the foredeck..."',
      options: [
        "To sharpen and intensify, especially in anger.",
        "To soothe or soften the tone, reducing its harshness.",
        "To translate into another language.",
        "To formally rescind a previous order.",
      ],
      correctIndex: 1,
      explanation:
        '"Mollify" means to soften or appease — exactly Astrid\'s deliberate adjustment of tone to address Per without hardening him into the next confrontation.',
    },
    {
      id: 3,
      kind: "tone-purpose",
      prompt:
        'The narrator describes Per\'s overruling as a "mettlesome correction." Why use "mettlesome" rather than simply "rude" or "insubordinate"?',
      options: [
        '"Mettlesome" is a synonym for "rude" with no different meaning.',
        '"Mettlesome" carries the texture of spirited, courageous self-confidence — the quality that makes a racing-boat call admirable. By using it, the narrator credits the genuine virtue inside Per\'s behavior even while showing that the same virtue lands badly in a different context.',
        '"Mettlesome" implies Per made the call entirely silently.',
        '"Mettlesome" suggests Per had no sailing experience.',
      ],
      correctIndex: 1,
      explanation:
        'The word names the genuine virtue (spirited confidence) at the heart of the same gesture that fails the delivery context — sharpening the story\'s nuance.',
    },
    {
      id: 4,
      kind: "inference",
      prompt:
        "Based on the passage, what can the reader most reasonably infer about why Astrid chose to support Per\'s call on the foredeck rather than reasserting her own?",
      options: [
        "She had secretly agreed with Per\'s call all along and only wanted to look conservative in front of the crew.",
        "She judged that the crew\'s urgent need for a single command structure on a foredeck mid-storm — combined with the fact that Per\'s call was less conservative but not actually unsafe and that she would have to keep sailing with him for fourteen more days — outweighed the value of winning the public dispute in that moment.",
        "She was physically too tired to climb forward and contest the call.",
        "Maritime law required her to defer to her first mate during any storm.",
      ],
      correctIndex: 1,
      explanation:
        "The text walks through exactly these three considerations: command structure on the foredeck, the call\'s honest safety margin, and the duration of the voyage ahead.",
    },
    {
      id: 5,
      kind: "substitution",
      prompt:
        'Which single word could replace "ire" in the sentence below without changing its meaning?',
      quote:
        '"She did not deliver her ire."',
      options: [
        "Praise",
        "Anger",
        "Decision",
        "Promotion",
      ],
      correctIndex: 1,
      explanation:
        '"Anger" matches "ire" — both describe strong displeasure or wrath. Astrid deliberately holds it back.',
    },
    {
      id: 6,
      kind: "main-idea",
      prompt:
        "Which sentence best summarizes the central idea or arc of the passage?",
      options: [
        "A captain humiliates her first mate in front of the crew during an intermittent storm and the boat is wrecked as a result.",
        "A captain on a delivery sail manages a headstrong, mettlesome first mate by supporting his unsafe-but-not-dangerous call in the moment to preserve a single command structure, then privately mollifying her tone in a quiet lull to set a clear protocol for any future disagreement — and the protocol holds for the rest of the voyage.",
        "A first mate mutinies against his captain and takes command of the boat for the remaining fourteen days.",
        "A delivery sail across the North Atlantic is canceled after the captain refuses to leave port in light wind.",
      ],
      correctIndex: 1,
      explanation:
        "The arc is exactly Astrid\'s in-the-moment yielding, the private follow-up in the lull, and the quiet protocol that holds for the rest of the trip.",
    },
  ],
};

const MISSION_23_SET_3: SetReading = {
  title: "The Watershed Report Nobody Wanted to Hear",
  subtitle:
    "A short story about a vigilant ecologist, a precipitous drop in baseflow, and the repercussions of a profound finding the council had hoped to refute.",
  format: "Short Story",
  readingMinutes: 4,
  words: [
    "precipitous",
    "pretentious",
    "profound",
    "propagate",
    "recourse",
    "refute",
    "regress",
    "repercussion",
    "replenish",
    "vigilant",
  ],
  passage: `Dr. Iren Vasquez had been a watershed ecologist with the Mahonia Basin Authority for eleven years, and her annual reports were known among the council\'s twelve members for two qualities. The first was that they were short — Iren refused, on principle, to inflate her findings into the long, **pretentious** documents that sister agencies in adjacent basins routinely produced. The second was that they were almost compulsively **vigilant**: every measurement was footnoted, every methodology disclosed, every limitation acknowledged in the same sentence in which the finding was offered.

The 2026 report was, by Iren\'s own account, the most uncomfortable document she had written in her career.

It found that the Mahonia\'s late-summer baseflow — the steady underground contribution that kept the river running between rainstorms — had declined by 31 percent over the previous nine years. The decline was not gradual. It had been **precipitous** in the most recent three years, accelerating in a pattern that her models did not allow her to attribute to short-term drought alone. The most likely driver, on the evidence she had, was a steady drawdown of the upper aquifer by the agricultural users who had, since 2019, been pumping at rates the basin\'s recharge could not **replenish**.

The implication was, in the strict scientific sense, **profound**: if the pattern continued, the river would, within nine years, fail to maintain a continuous flow through the dry season at all. The implication was also, in the political sense, almost impossible to deliver. Three of the twelve council members represented agricultural districts whose pumping was the principal cause of the decline. Two more represented downstream municipal users who had not been told, in any prior report, that their long-term water security was now a question.

Iren did not, in the report, **propagate** the finding into a recommendation. She had decided, two years earlier, that her professional role at the council was to deliver the data and the most defensible inference she could draw from it, and to leave the question of policy to the council itself. She did, however, include in the appendix a list of seven specific measurements the council could request to **refute** her inference if it disagreed — a list that included the agricultural users\' own well logs, which had not, in eleven years, been requested.

The council met to receive the report on a Tuesday in March. The meeting was, by the standards of the basin authority, unusually crowded. The two agricultural members spoke first, at length. They did not directly **refute** Iren\'s inference. They suggested, instead, that the analysis should be paused — that the council should commission an independent review before any recommendation **regressed** the agricultural sector\'s pumping rights, and that until the independent review was complete, the report itself should be marked, in the council\'s minutes, as preliminary.

Iren had anticipated the move. She had her **recourse** ready. She offered, in the meeting itself, to provide every measurement, every model run, and every line of analysis code to the independent review the same day it was commissioned. She also asked, in a single sentence at the end of her response, that the council\'s minutes record the date on which the agricultural users\' well logs had first been requested by the authority\'s staff and the date on which they had, if ever, been delivered.

The council voted seven to five to commission the independent review. It also voted, by the same margin, to formally request the well logs.

The well logs, when delivered three months later, did not refute Iren\'s inference. They sharpened it. The independent review, when it reported the following spring, agreed in the major findings and disagreed only on a single methodological choice that did not change the headline number. The **repercussion** for the agricultural users was a phased reduction in pumping rights over five years, negotiated with the participation of every party at the table.

The Mahonia, two years later, was still flowing through the dry season. The 2028 baseflow had risen for the first time in a decade. Iren\'s 2028 report, which was, by her habit, short, did not claim credit. It noted the change, footnoted the data, and acknowledged in the same sentence that one wet year did not, by itself, settle the question.`,
  questions: [
    {
      id: 1,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "precipitous" most nearly means:',
      quote:
        '"It had been precipitous in the most recent three years, accelerating in a pattern that her models did not allow her to attribute to short-term drought alone."',
      options: [
        "Slow and gradual over many decades.",
        "Steeply and abruptly downward in a short period.",
        "Confined to a single season of one year.",
        "Reversed by recent rainfall events.",
      ],
      correctIndex: 1,
      explanation:
        '"Precipitous" describes a steep, abrupt drop — exactly the accelerating decline of the last three years.',
    },
    {
      id: 2,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "vigilant" most nearly means:',
      quote:
        '"...every measurement was footnoted, every methodology disclosed, every limitation acknowledged in the same sentence in which the finding was offered."',
      options: [
        "Carelessly assembled in a hurry.",
        "Watchfully careful and attentive to potential problems.",
        "Restricted to a single methodology.",
        "Hostile to outside review.",
      ],
      correctIndex: 1,
      explanation:
        '"Vigilant" describes alert, watchful care — exactly the quality of footnoting, disclosing, and acknowledging the report exhibits in every line.',
    },
    {
      id: 3,
      kind: "tone-purpose",
      prompt:
        'The narrator says Iren refused to inflate her findings into "pretentious documents that sister agencies in adjacent basins routinely produced." Why use "pretentious" rather than simply "long"?',
      options: [
        '"Pretentious" is a synonym for "long" with no different meaning.',
        '"Pretentious" carries the texture of pretending to importance one has not earned — a documentary inflation that performs significance rather than demonstrating it. The choice frames Iren\'s short reports as a stance against that performance, not just a preference for brevity.',
        '"Pretentious" implies the sister agencies were dishonest in their measurements.',
        '"Pretentious" suggests the documents were illegally distributed.',
      ],
      correctIndex: 1,
      explanation:
        'The word identifies a posture (performing significance) rather than a length, and frames Iren\'s brevity as principled rather than convenient.',
    },
    {
      id: 4,
      kind: "inference",
      prompt:
        "Based on the passage, what can the reader most reasonably infer about Iren\'s strategic purpose in including, in the appendix, a list of seven measurements the council could request to refute her inference — including the agricultural users\' own well logs?",
      options: [
        "She intended to bury the most damaging measurement at the bottom of the appendix where no one would find it.",
        "She made it cheap and concrete for the council to test her finding while quietly putting a specific document — the agricultural users\' well logs — on the table; if the council later voted to commission an independent review without requesting that document, the omission would itself be visible.",
        "She wanted the appendix to be longer than the body of the report.",
        "She had been ordered by the agricultural members to include the list.",
      ],
      correctIndex: 1,
      explanation:
        "The structural point is exactly that pre-positioned ask: the well logs are placed in the appendix so that any later decision to skip them would be conspicuous.",
    },
    {
      id: 5,
      kind: "substitution",
      prompt:
        'Which single word could replace "replenish" in the sentence below without changing its meaning?',
      quote:
        '"...pumping at rates the basin\'s recharge could not replenish."',
      options: [
        "Drain",
        "Restore",
        "Forbid",
        "Tax",
      ],
      correctIndex: 1,
      explanation:
        '"Restore" matches "replenish" — both describe filling something back up to its previous level.',
    },
    {
      id: 6,
      kind: "main-idea",
      prompt:
        "Which sentence best summarizes the central idea or arc of the passage?",
      options: [
        "A vigilant ecologist resigns from the basin authority after the council refuses to act on her findings.",
        "A vigilant ecologist delivers a profound, uncomfortable finding about a precipitous decline in late-summer baseflow, declines to propagate it into a recommendation, pre-positions the well logs that would either refute or sharpen her inference, and — through an independent review and a phased agricultural reduction — sees the river\'s flow begin to recover.",
        "An agricultural lobby successfully delays a basin authority\'s findings until the river permanently dries out.",
        "An independent review overturns a watershed ecologist\'s findings and restores agricultural pumping rights to their previous levels.",
      ],
      correctIndex: 1,
      explanation:
        "The arc moves precisely through the report, the council\'s response, the well logs, the independent review, and the phased reduction that lets the river recover.",
    },
  ],
};

const MISSION_24_SET_1: SetReading = {
  title: "The Conservatory and the Despotic Patron",
  subtitle:
    "A short story about a music conservatory, a benevolent fund, and a director who refused to condone what one donor called \"only a small adjustment\" to the audition rules.",
  format: "Short Story",
  readingMinutes: 4,
  words: [
    "assail",
    "benevolent",
    "berate",
    "buoyant",
    "buttress",
    "condone",
    "contravene",
    "denounce",
    "despotic",
    "deviate",
  ],
  passage: `The Halsey Conservatory had been founded in 1922 on a single principle: that admission to its undergraduate program would be decided, blind, by a committee of five faculty members who would hear each candidate behind a screen and would receive no information about the candidate\'s name, school, country, or sponsor before the panel\'s vote was complete. The principle had survived four directors, three economic depressions, and one nearly fatal endowment crisis. It had not, in a hundred and four years, been **deviated** from.

The current director, Theodora Markham, was in her sixth year. She had inherited a conservatory that was healthy, modestly endowed, and on the verge of needing a new recital hall. The fundraising for the recital hall was led, by long custom, by the conservatory\'s development committee, and the leading prospective donor — a man named Quentin Ardel — was the founder of a private equity firm whose first major gift to the conservatory, twelve years earlier, had built the practice-room wing.

Quentin was, by every account from the development office, a **benevolent** donor in his early gifts. He had asked for nothing in return for the practice-room wing other than a small bronze plaque he himself had not been present to unveil. He was, however, on the prospective recital-hall gift, asking for one thing.

The thing he was asking for, as carefully phrased to Theodora over a Tuesday lunch, was an "audition courtesy" for the children of the firm\'s twelve managing partners — a pre-screening, conducted in a separate session, in which the children would play before a single faculty member rather than the full blind panel. The courtesy would, Quentin assured her, **buttress** the firm\'s long-term commitment to the conservatory. It was, he said, a small thing.

Theodora did not, at the lunch, **berate** him. She did not raise her voice. She did, however, decline immediately. She said that the blind audition rule was the founding principle of the institution, that no exception had been made in a hundred and four years, and that the conservatory could not consider an exception now. She closed the meeting cordially. She walked back to her office and wrote a one-paragraph memo to the chair of the development committee describing the request and her response.

The conversation that followed, over the next three weeks, was the most difficult of her tenure. The development chair pressed her, in carefully chosen language, to consider whether the courtesy could be granted in a form that would not technically **contravene** the founding rule. Two trustees pressed her, less carefully, to consider what the loss of the recital hall gift would mean for the conservatory\'s next decade. One trustee — a man whose own family had given to the conservatory for forty years — pressed her, in a long phone call, to reflect on whether she was being **despotic** in her interpretation of a principle that had, after all, only ever been administrative.

She was not, she later said, persuaded by any of these arguments. She was, however, **assailed** by them. She did not, on any of the calls, lose her temper. She did, in private, take a long walk on the third weekend and consider whether she was, in fact, being inflexible in a way the institution could not afford.

Her decision, at the end of the walk, was that she would not **condone** even a quiet exception. The blind audition rule was not, in her view, an administrative convention. It was the institution\'s public promise to every applicant who had ever auditioned without a sponsor — and breaking it once, even quietly, would, by the conservatory\'s next admissions cycle, be known.

She wrote a long letter to Quentin the following Monday. The letter did not **denounce** him. It thanked him for twelve years of unfailing support, acknowledged the importance of the recital hall, and declined the courtesy in two precise sentences that named no one in his firm. She offered, in the same letter, to name the recital hall after Quentin\'s late mother — a gesture the development office had been preparing for two years — if he wished to proceed with the gift on the conservatory\'s standing terms.

Quentin did not respond for six weeks. When he did, his note was brief and surprisingly **buoyant**. He wrote that he had reconsidered, that the courtesy he had requested had been a mistake, and that he would proceed with the gift. The hall was named for his mother. The blind audition rule, that admissions cycle and every cycle since, held.`,
  questions: [
    {
      id: 1,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "buttress" most nearly means:',
      quote:
        '"The courtesy would, Quentin assured her, buttress the firm\'s long-term commitment to the conservatory."',
      options: [
        "To weaken or undermine over time.",
        "To support and strengthen, like a structural support reinforces a wall.",
        "To formally tax at a higher rate.",
        "To photograph for archival purposes.",
      ],
      correctIndex: 1,
      explanation:
        '"Buttress" means to support or reinforce — Quentin frames the courtesy as something that would shore up his firm\'s commitment.',
    },
    {
      id: 2,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "condone" most nearly means:',
      quote:
        '"Her decision, at the end of the walk, was that she would not condone even a quiet exception."',
      options: [
        "To overlook, accept, or implicitly approve.",
        "To strictly forbid in writing.",
        "To rewrite the conservatory\'s charter.",
        "To request a higher gift amount.",
      ],
      correctIndex: 0,
      explanation:
        '"Condone" describes the act of overlooking or implicitly approving wrongdoing or deviation — exactly what Theodora declines to do.',
    },
    {
      id: 3,
      kind: "tone-purpose",
      prompt:
        'The narrator says Theodora was "assailed" by the arguments of the trustees and the development chair. Why use "assailed" rather than simply "told"?',
      options: [
        '"Assailed" is a synonym for "told" with no different meaning.',
        '"Assailed" carries the texture of being attacked or beset on multiple sides — a sustained pressure rather than a single conversation. The verb honors both the seriousness of the institutional case being made against her position and the cost to her of holding it, without portraying her as merely victimized.',
        '"Assailed" implies physical violence was used against the director.',
        '"Assailed" suggests the director was actively losing the argument.',
      ],
      correctIndex: 1,
      explanation:
        'The word "assailed" captures sustained pressure from multiple sides — both honoring the seriousness of the case against her and acknowledging its cost.',
    },
    {
      id: 4,
      kind: "inference",
      prompt:
        "Based on the passage, what can the reader most reasonably infer about why Theodora\'s letter to Quentin offered to name the recital hall after his late mother?",
      options: [
        "She intended to insult Quentin by invoking his mother in a refusal letter.",
        "She wanted to refuse the audition courtesy without rejecting the donor as a person — by pairing the firm refusal with a sincere, prepared honor that was meaningful to him personally, she preserved the relationship and gave him a face-saving way to proceed with the gift on the conservatory\'s standing terms.",
        "She had been instructed by the trustees to make the offer.",
        "She wanted to publicly embarrass the development office for being unprepared.",
      ],
      correctIndex: 1,
      explanation:
        "The combination — firm refusal of the courtesy, prepared personal honor, restated standing terms — is the exact diplomatic structure that makes Quentin\'s eventual reconsideration possible.",
    },
    {
      id: 5,
      kind: "substitution",
      prompt:
        'Which single word could replace "denounce" in the sentence below without changing its meaning?',
      quote:
        '"The letter did not denounce him."',
      options: [
        "Praise",
        "Condemn",
        "Forget",
        "Photograph",
      ],
      correctIndex: 1,
      explanation:
        '"Condemn" matches "denounce" — both describe publicly declaring disapproval. Theodora\'s letter is firm but does not move into condemnation.',
    },
    {
      id: 6,
      kind: "main-idea",
      prompt:
        "Which sentence best summarizes the central idea or arc of the passage?",
      options: [
        "A conservatory abandons its century-old blind audition rule in exchange for a major recital-hall gift.",
        "A director declines a benevolent donor\'s polite request for a small audition exception, refuses to condone even a quiet contravention of the conservatory\'s founding rule despite sustained internal pressure, and — through a firm but personally generous letter — preserves both the rule and the gift.",
        "A wealthy donor publicly denounces a conservatory and withdraws his entire family\'s support.",
        "A board of trustees forces a conservatory director to resign over a contested audition policy.",
      ],
      correctIndex: 1,
      explanation:
        "The story\'s arc is exactly the firm refusal, the personal honor, and the preserved rule.",
    },
  ],
};

const MISSION_24_SET_2: SetReading = {
  title: "The Arbitrator's Ironclad Brief",
  subtitle:
    "A short story about an arbitrator, a finicky escalation clause, and the disinterested handling of a contract dispute that no one wanted to escalate further.",
  format: "Short Story",
  readingMinutes: 4,
  words: [
    "disinterested",
    "escalate",
    "exorcise",
    "finicky",
    "foil",
    "intertwined",
    "inundate",
    "ironclad",
    "jeopardize",
    "mercurial",
  ],
  passage: `Helena Roost had been a commercial arbitrator for sixteen years, and the file in front of her on the morning of the hearing was, by her professional standard, neither unusually large nor unusually small. It was, however, unusually **intertwined**: a software vendor and a hospital network had been suing and counter-suing each other across three jurisdictions for nineteen months, and the dispute had grown, by the time it landed in arbitration, into a tangle of overlapping claims that no junior associate had successfully been able to summarize on a single page.

The clause that had brought the parties to her, however, was clean. The original 2021 contract contained a single arbitration provision: any dispute that the parties could not resolve in good faith within ninety days of written notice would be submitted to a single arbitrator selected from a named panel. The clause was, in the language of the parties\' counsel, **ironclad** — neither side could plausibly dispute its applicability, and neither side wished to **jeopardize** the existing commercial relationship by attempting to litigate around it in open court.

Helena\'s first responsibility, on the morning of the hearing, was to be **disinterested**. She had no prior commercial relationship with either party. She had read the briefs over a long weekend, in the order they had been filed, and had refused — as was her habit — to read any of the press coverage of the case until after the hearing was concluded.

Her second responsibility, she had come to believe over sixteen years, was to refuse to be **inundated**. The parties\' counsel, in their joint pre-hearing letter, had together submitted seventeen hundred pages of exhibits. Helena had read the briefs. She would, in the hearing itself, ask for the exhibits as she needed them — not as a stack, but as named documents tied to specific arguments. The principle was simple: if a document mattered, the party relying on it should be able to point to it; if no party pointed to it, the document did not, in any operational sense, exist for the arbitration.

The hospital\'s lead counsel, a careful man named Mr. Aldrey, opened the morning. His argument was structured. He named four specific failures by the vendor, each tied to a clause in the contract, and offered, in conclusion, a single proposed remedy that would settle three of the four counts and **escalate** the fourth — a disputed integration milestone — to a structured technical review.

The vendor\'s lead counsel, Ms. Quiverra, was a more **mercurial** presence. She was capable, in any given five-minute stretch, of either a tightly argued legal point or a long rhetorical excursion that did not, on Helena\'s notes, advance her client\'s case. The dispersion of her argument was not, Helena suspected, accidental: a **finicky** insistence on procedural irregularities — most of them the kind of small process complaints that did not survive scrutiny — had been a pattern in the vendor\'s pre-hearing filings, and was clearly intended to **foil** any clean adjudication of the four substantive counts.

Helena did not, in the hearing itself, **exorcise** the procedural complaints by ruling on them at length. She listened. She took notes. She allowed Ms. Quiverra to make every argument she wished to make. At the appropriate moment, she said, evenly, that she would address each procedural complaint in writing in her final award and that she would now appreciate the parties\' substantive responses on the four counts in the contract.

The hearing ran for two days. The award, when issued nine weeks later, ran to forty-one pages. The award acknowledged each procedural complaint, dismissed all but one of them in three sentences each, and explained the single complaint it sustained — a notice timing irregularity that did not, however, alter the substantive outcome of the counts. The four counts themselves were resolved in a structure recognizably similar to Mr. Aldrey\'s proposal, with the technical review of the integration milestone conducted under terms both parties had described, in the hearing, as acceptable.

The vendor did not appeal. The hospital did not appeal. The commercial relationship resumed, in a modified form, the following quarter.`,
  questions: [
    {
      id: 1,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "disinterested" most nearly means:',
      quote:
        '"Helena\'s first responsibility, on the morning of the hearing, was to be disinterested."',
      options: [
        "Bored and inattentive to the proceedings.",
        "Free of any personal stake or bias in the outcome; impartial.",
        "Unfamiliar with the relevant area of law.",
        "Openly hostile to both parties.",
      ],
      correctIndex: 1,
      explanation:
        '"Disinterested" means impartial — having no personal stake in the outcome — which is the arbitrator\'s core professional posture, distinct from being merely "uninterested."',
    },
    {
      id: 2,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "inundated" most nearly means:',
      quote:
        '"Her second responsibility, she had come to believe over sixteen years, was to refuse to be inundated."',
      options: [
        "Quietly bribed by one of the parties.",
        "Overwhelmed by being flooded with material.",
        "Sworn in under a formal oath.",
        "Promoted to a higher panel.",
      ],
      correctIndex: 1,
      explanation:
        '"Inundated" means flooded or overwhelmed — exactly the danger Helena guards against by refusing to accept the exhibits as a stack.',
    },
    {
      id: 3,
      kind: "tone-purpose",
      prompt:
        'The narrator describes the vendor\'s procedural complaints as "finicky" and intended to "foil" any clean adjudication. Why use "finicky" rather than simply "many"?',
      options: [
        '"Finicky" is just a longer word for "many" with no different meaning.',
        '"Finicky" implies the complaints were filed by an outside consultant.',
        '"Finicky" carries the texture of fussily detailed, pickily small objections — the kind of micro-complaints that can clog a hearing without amounting to a serious challenge. The choice characterizes the strategy as one of obstruction-by-trivia rather than substantive defense.',
        '"Finicky" suggests the complaints were dismissed without being read.',
      ],
      correctIndex: 2,
      explanation:
        'The word frames the procedural complaints as a deliberate obstruction-by-trivia strategy rather than a list of serious objections.',
    },
    {
      id: 4,
      kind: "inference",
      prompt:
        "Based on the passage, what can the reader most reasonably infer about why Helena chose to address the procedural complaints in writing in her final award rather than ruling on them at length during the hearing?",
      options: [
        "She did not understand the procedural complaints and needed weeks to research them.",
        "Ruling on the procedural complaints in the hearing itself would have given them the airtime the vendor\'s strategy was reaching for, slowing the substantive arguments and rewarding the obstruction; addressing them in the written award gave each one its proper weight without letting them dominate the live proceedings.",
        "She had been instructed by the named panel to defer all procedural rulings.",
        "She wanted to give Ms. Quiverra time to revise her arguments before any ruling.",
      ],
      correctIndex: 1,
      explanation:
        "The choice deliberately denies the obstruction strategy its in-hearing payoff while still treating each complaint seriously in the written record.",
    },
    {
      id: 5,
      kind: "substitution",
      prompt:
        'Which single word could replace "ironclad" in the sentence below without changing its meaning?',
      quote:
        '"The clause was, in the language of the parties\' counsel, ironclad..."',
      options: [
        "Negotiable",
        "Unbreakable",
        "Forgotten",
        "Optional",
      ],
      correctIndex: 1,
      explanation:
        '"Unbreakable" matches "ironclad" — both describe something that cannot be successfully challenged or avoided.',
    },
    {
      id: 6,
      kind: "main-idea",
      prompt:
        "Which sentence best summarizes the central idea or arc of the passage?",
      options: [
        "An arbitrator dismisses both parties\' arguments and orders them to pay equal damages.",
        "A disinterested arbitrator handles a tangled commercial dispute by refusing to be inundated by exhibits, declining to give finicky procedural complaints the airtime they were reaching for, and producing a written award that addresses every complaint while resolving the substantive counts on terms both parties can accept.",
        "An arbitrator allows a procedural sideshow to dominate the hearing and the case is escalated to open court.",
        "A hospital network terminates its relationship with a software vendor after a hearing that ends without a decision.",
      ],
      correctIndex: 1,
      explanation:
        "The arc traces precisely the arbitrator\'s disciplined handling: limited intake of exhibits, deferred procedural rulings, substantive resolution.",
    },
  ],
};

const MISSION_24_SET_3: SetReading = {
  title: "The Archivist and the Quiescent Collection",
  subtitle:
    "A short story about an archivist closing a long-quiescent collection, a poignant request from the descendants, and the surmounting of a single tangential complication.",
  format: "Short Story",
  readingMinutes: 4,
  words: [
    "oblivious",
    "perpetrate",
    "plaintive",
    "poignant",
    "quiescent",
    "reiterate",
    "subside",
    "subsume",
    "surmount",
    "tangential",
  ],
  passage: `The Hartwell Collection had sat in its own room on the second floor of the Renton Library for forty-one years, and for thirty-seven of those years it had been **quiescent** — the kind of small, specialized archive that received no requests, generated no scholarship, and was visited, at most, by one of the library\'s graduate interns once every two summers. The collection consisted of seven hundred and thirty-two letters and four bound notebooks, all written between 1879 and 1908 by Anita Hartwell, a regional botanist whose work had been admired in her lifetime and quietly forgotten after her death.

The library\'s board, in a 2024 cost review, had decided to close the collection. The letters and notebooks would be transferred, intact, to the state archives in the capital, where they would be cataloged into a larger holding that already housed the papers of three of Anita Hartwell\'s correspondents. The transfer was scheduled for the following March.

The collection\'s archivist, a careful woman named Daria Vines, had been at the library for nineteen years and had inherited responsibility for the Hartwell five years earlier when the previous archivist retired. She had not, in those five years, been **oblivious** to the collection. She had read every letter at least once. She had begun, in her own time, a chronological index that the library\'s digitization budget had never quite been large enough to fund. The closure decision did not surprise her. It did, however, **subsume** a small project she had been hoping, for two years, to complete: a single conservation pass on the four notebooks, three of which had begun to show the kind of binding fatigue that careful handling could **surmount** but that storage in a larger archive\'s general stacks would, eventually, accelerate.

Daria did not, in her response to the board, dispute the closure. She did write a one-page memo requesting that the conservation pass be authorized as part of the transfer — a request the board approved within two weeks, on the recommendation of the head librarian, who had read the memo and, in her own words, found nothing in it to argue with.

The complication arrived in late October, in a letter from a woman named Gertrude Colquhoun, who described herself as the great-great-niece of Anita Hartwell. The letter was **plaintive** in tone but not unreasonable in substance. Gertrude had learned, through a notice in the library\'s monthly newsletter, that the collection was being moved. She wrote to ask whether her family — twelve descendants in three generations, scattered across four states — could be given an opportunity to view the original notebooks before the transfer, in a single afternoon if necessary, with appropriate supervision.

The request was not, on its face, unusual. It was also, by the library\'s standing policy, **tangential** to the closure plan: the policy did not provide a procedure for descendant viewings, and the transfer date was four months away.

Daria did not refuse the request. She also did not approve it on her own authority. She brought it to the head librarian, with a one-page proposal of her own: a single supervised afternoon in February, attended by no more than twelve people, in the library\'s reading room, with the notebooks under archival glass and the letters available by request as facsimiles. She **reiterated**, in the proposal, the conservation considerations that had already been approved for the transfer. She did not **perpetrate** any breach of the existing policy; she proposed, instead, a one-time procedure that the policy could absorb without amendment.

The head librarian approved the proposal. The viewing took place on a Saturday in February. The twelve descendants — three of whom had driven from out of state — spent four quiet hours with the notebooks. One of them, a great-grandniece who taught high school biology in Oregon, brought a child of her own who had been named Anita.

The viewing was, by any honest reckoning, **poignant**. It was not, however, theatrical. The descendants did not weep. They did not, after the four hours, deliver speeches. They thanked Daria. They left.

The transfer to the state archives was completed on schedule three weeks later. The conservation pass was completed in the following month. The state archives, on receiving the collection, sent Daria a brief letter of acknowledgment. The Hartwell Collection, no longer quiescent, would, within two years, become the subject of a graduate dissertation by a student in the capital.

The newsletter notice that had reached Gertrude Colquhoun did not, the librarians later realized, **subside** entirely from its small effect on the library\'s public profile: descendant viewings were quietly added, the following year, to the library\'s standing procedures.`,
  questions: [
    {
      id: 1,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "quiescent" most nearly means:',
      quote:
        '"...for thirty-seven of those years it had been quiescent — the kind of small, specialized archive that received no requests, generated no scholarship, and was visited, at most, by one of the library\'s graduate interns once every two summers."',
      options: [
        "Heavily trafficked by visiting scholars.",
        "Inactive or dormant; in a state of rest or quiet.",
        "Located in a different city from the library that owned it.",
        "Officially closed to all visitors by court order.",
      ],
      correctIndex: 1,
      explanation:
        '"Quiescent" describes a dormant, quiet state — exactly the long inactivity the sentence then defines.',
    },
    {
      id: 2,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "tangential" most nearly means:',
      quote:
        '"It was also, by the library\'s standing policy, tangential to the closure plan..."',
      options: [
        "Centrally relevant and squarely within the policy.",
        "Only loosely related; touching the main matter at a single point rather than belonging to it.",
        "Strictly forbidden by federal law.",
        "Already approved by the state archives.",
      ],
      correctIndex: 1,
      explanation:
        '"Tangential" describes something only loosely related to the main subject — touching it at one point, not belonging to it. The descendant request lies outside the closure plan\'s direct scope.',
    },
    {
      id: 3,
      kind: "tone-purpose",
      prompt:
        'The narrator describes the descendants\' viewing as "poignant" and immediately adds, "It was not, however, theatrical." Why pair those two sentences?',
      options: [
        '"Poignant" is just a synonym for "theatrical" with no different meaning.',
        '"Poignant" carries the texture of a quiet, deeply felt sadness or sweetness — an emotion whose dignity depends on restraint. The narrator pairs it with the refusal of theater to honor the descendants\' composure: the feeling was real, but it did not perform itself.',
        '"Poignant" implies the descendants had been paid for their attendance.',
        '"Poignant" suggests the descendants regretted the transfer.',
      ],
      correctIndex: 1,
      explanation:
        'The pairing names the emotional truth of the viewing while honoring the descendants\' refusal to perform it.',
    },
    {
      id: 4,
      kind: "inference",
      prompt:
        "Based on the passage, what can the reader most reasonably infer about why Daria brought Gertrude\'s request to the head librarian with a complete one-page proposal of her own rather than simply forwarding the letter?",
      options: [
        "She had no authority to read mail addressed to the library.",
        "She wanted the request to be approved without anyone reading the original letter.",
        "She converted an unfamiliar request into a specific, bounded, conservation-aware procedure that the existing policy could absorb without amendment — making it cheap for the head librarian to approve and avoiding any precedent that would require a rewriting of the policy itself.",
        "She intended to attach Gertrude\'s personal information to the proposal as evidence.",
      ],
      correctIndex: 2,
      explanation:
        "The structural choice — proposal rather than forwarded request — is what makes approval cheap and avoids reopening the policy.",
    },
    {
      id: 5,
      kind: "substitution",
      prompt:
        'Which single word could replace "surmount" in the sentence below without changing its meaning?',
      quote:
        '"...binding fatigue that careful handling could surmount but that storage in a larger archive\'s general stacks would, eventually, accelerate."',
      options: [
        "Worsen",
        "Overcome",
        "Forget",
        "Photograph",
      ],
      correctIndex: 1,
      explanation:
        '"Overcome" matches "surmount" — both describe successfully rising above or dealing with a difficulty.',
    },
    {
      id: 6,
      kind: "main-idea",
      prompt:
        "Which sentence best summarizes the central idea or arc of the passage?",
      options: [
        "An archivist refuses to allow descendants any contact with a closing collection and is later overruled by the library\'s board.",
        "An archivist handles the closure of a long-quiescent collection by securing a conservation pass before transfer, then converting a poignant but tangential request from descendants into a specific one-afternoon viewing that the existing policy could absorb — and her care produces both a successful transfer and, the following year, a quiet new standing procedure.",
        "A library cancels the transfer of a quiescent collection after public protest by descendants of its original creator.",
        "A graduate student\'s dissertation forces a library to keep a small specialized collection in its original room indefinitely.",
      ],
      correctIndex: 1,
      explanation:
        "The arc moves through the closure decision, the conservation pass, the descendant viewing, and the small policy change that follows.",
    },
  ],
};

const MISSION_25_SET_1: SetReading = {
  title: "The Critic at the Auspicious Debut",
  subtitle:
    "A short story about a young critic, an articulate first novel, and the conclusive review that her captious senior had hoped she would not write.",
  format: "Short Story",
  readingMinutes: 4,
  words: [
    "adept",
    "adverse",
    "appropriate",
    "archetype",
    "articulate",
    "auspicious",
    "bereft",
    "captious",
    "conclusive",
    "conspire",
  ],
  passage: `Imogen Adair had been a junior critic at *The Linden Review* for three years on the morning the assignment landed in her inbox. The book was *Salt and Compass*, a first novel by a previously unknown writer named Jonas Pell, and the assignment was unusual on two counts. It was the first lead review the editor-in-chief had ever given her, and it was a debut whose pre-publication reception had been — by the unspectacular standards of her corner of literary journalism — almost **auspicious**: three of the writers Imogen most respected had already, in private notes the publisher had quietly circulated, called the novel the strongest first book they had read in six years.

She read the novel over a long weekend. She read it twice.

The book was, in her honest professional assessment, very nearly as good as the early notes had suggested. It was, in particular, the rarest kind of debut: a first novel **adept** at structural restraint. Pell had resisted the temptation almost every first novelist succumbed to — the temptation to demonstrate every technique he was capable of within the same three hundred pages — and had, instead, chosen a single, sustained, and unusually patient prose mode that he held without faltering for the length of the book. The result was a novel that did not feel like a debut at all. It felt like the third book of a writer who had been **bereft**, in his earlier work, of the discipline he had now found.

Imogen was prepared to write an enthusiastic review. She was not prepared, until the Tuesday before her deadline, for the visit that arrived at her desk from the senior critic on staff, a man named Peregrine Wode.

Peregrine was, by long reputation, **captious**. He was the critic the magazine assigned when a praised debut needed to be slowed down — the writer whose function in the literary economy was to find the second-tier flaw and elevate it into a structural objection that other critics would feel obligated to engage with for the next two years. He had read *Salt and Compass*. He had, at the editor-in-chief\'s suggestion, come to Imogen\'s desk to share what he had carefully described as his "concerns."

Imogen listened. Peregrine spoke for forty minutes. His concerns were, in their professional form, **articulate**: he had identified what he called a single dominant **archetype** in the novel — a recurring figure of the absent father — and argued, at length, that Pell\'s deployment of the figure was sentimentally **appropriate**ed from earlier writers without meaningful transformation. The argument was not, on its face, unfair. It was, however, in Imogen\'s reading of the novel, not the argument the book itself most rewarded.

She did not dispute him at the desk. She thanked him for his time. She returned, that evening, to her draft.

The draft she submitted to the editor-in-chief on Friday did not **conspire** with Peregrine\'s line. It also did not ignore it. Imogen had decided, on the train home Tuesday evening, that the most honest response to a senior critic\'s articulate concern was to engage it on the page — to name the archetype, to grant the precedent, and then to argue, with specific reference to three passages Peregrine had not addressed, that Pell had earned the figure rather than borrowed it.

The review ran the following month. It was, by Imogen\'s own intention, **conclusive**: it took a position, defended it on the page, and offered the reader the means to disagree with her if the reader chose. Peregrine did not, in the office, congratulate her. He did, two issues later, publish a long essay that engaged Imogen\'s review by name and that made, on second reading, almost no points she had not already addressed in the original piece.

The novel, the following spring, won a regional prize. Imogen\'s review was quoted on the paperback. She continued to receive lead assignments. Peregrine continued to write his essays. The two of them, when they passed in the corridor, were neither friendly nor **adverse** — they were, by an arrangement neither had named aloud, professional.`,
  questions: [
    {
      id: 1,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "auspicious" most nearly means:',
      quote:
        '"...a debut whose pre-publication reception had been — by the unspectacular standards of her corner of literary journalism — almost auspicious..."',
      options: [
        "Showing dim or discouraging early signs.",
        "Showing favorable early signs that suggest future success.",
        "Restricted to a single small audience.",
        "Officially endorsed by a state cultural ministry.",
      ],
      correctIndex: 1,
      explanation:
        '"Auspicious" describes promising, favorable early signs — exactly the unusual quality the early private notes have given the debut.',
    },
    {
      id: 2,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "captious" most nearly means:',
      quote:
        '"Peregrine was, by long reputation, captious. He was the critic the magazine assigned when a praised debut needed to be slowed down..."',
      options: [
        "Inclined to find trivial faults and raise petty objections.",
        "Almost always generous in praise.",
        "Reluctant to publish under his own name.",
        "Specialized in poetry rather than fiction.",
      ],
      correctIndex: 0,
      explanation:
        '"Captious" describes someone given to finding small, niggling faults — exactly the function the magazine assigns to Peregrine.',
    },
    {
      id: 3,
      kind: "tone-purpose",
      prompt:
        'The narrator describes Pell\'s prose mode as showing "structural restraint" and writes that the novel feels like the third book of a writer who had been "bereft" of discipline in his earlier work. Why use "bereft" rather than simply "lacking"?',
      options: [
        '"Bereft" is a fancier synonym for "lacking" with no different meaning.',
        '"Bereft" carries the texture of a painful deprivation — a discipline the earlier writer would have wanted and missed. The choice frames Pell\'s mature restraint as something hard-won, not merely present, and locates the praise in the maturation rather than in the surface skill.',
        '"Bereft" implies Pell had abandoned writing for several years.',
        '"Bereft" suggests Pell\'s earlier work was anonymously published.',
      ],
      correctIndex: 1,
      explanation:
        'The painful-deprivation overtone of "bereft" frames Pell\'s mature restraint as hard-won and locates the review\'s praise in the maturation, not the surface.',
    },
    {
      id: 4,
      kind: "inference",
      prompt:
        "Based on the passage, what can the reader most reasonably infer about why Imogen chose to engage Peregrine\'s argument explicitly in her review rather than ignoring it?",
      options: [
        "She wanted to publicly humiliate Peregrine in print.",
        "She believed an articulate concern from a senior critic was best answered on the page itself: by naming the archetype, granting the precedent, and then arguing the rebuttal with specific reference to passages Peregrine had not addressed, she produced a review that was both conclusive and immune to a follow-up essay that could only repeat the points she had already engaged.",
        "Magazine policy required all junior critics to cite the senior critic in every lead review.",
        "She was hoping Peregrine would help her edit the final draft.",
      ],
      correctIndex: 1,
      explanation:
        "The text confirms the strategy: Peregrine\'s later essay engaged her review by name and made almost no points she had not already addressed.",
    },
    {
      id: 5,
      kind: "substitution",
      prompt:
        'Which single word could replace "adverse" in the sentence below without changing its meaning?',
      quote:
        '"The two of them, when they passed in the corridor, were neither friendly nor adverse..."',
      options: [
        "Hostile",
        "Cheerful",
        "Anonymous",
        "Talkative",
      ],
      correctIndex: 0,
      explanation:
        '"Hostile" matches "adverse" in this context — both describe an opposing or antagonistic posture. The corridor relationship is neither warm nor opposed, just professional.',
    },
    {
      id: 6,
      kind: "main-idea",
      prompt:
        "Which sentence best summarizes the central idea or arc of the passage?",
      options: [
        "A junior critic withdraws her review of a debut novel after a senior critic objects to its central archetype.",
        "A junior critic given her first lead assignment writes a conclusive, articulate review of an auspicious debut — engaging a captious senior\'s concerns on the page itself rather than ignoring them or capitulating to them — and emerges with both a vindicated review and a stable, professional working relationship.",
        "A senior critic successfully blocks the publication of a junior critic\'s positive review by arranging an unfavorable essay in advance.",
        "A debut novelist refuses to publish his book after reading two contradictory reviews.",
      ],
      correctIndex: 1,
      explanation:
        "The arc traces precisely the assignment, the captious objection, the engagement on the page, and the quiet professional truce that follows.",
    },
  ],
};

const MISSION_25_SET_2: SetReading = {
  title: "The Steward at Bay Eight",
  subtitle:
    "A short story about a union steward who refused to harangue, a complicated grievance she would not handle by proxy, and the poise that delineated a real complaint from a ploy.",
  format: "Short Story",
  readingMinutes: 4,
  words: [
    "delineate",
    "disentangle",
    "exhort",
    "frailty",
    "grievance",
    "harangue",
    "ploy",
    "poise",
    "pomposity",
    "proxy",
  ],
  passage: `Marisol Quint had been the union steward at the Riverbend bus depot for nine years. Bay Eight, where the diesel mechanics did the long overhaul work, had produced more grievances in those nine years than the other seven bays combined — not because the mechanics were unusually quarrelsome, but because Bay Eight was where most of the new hires were assigned and where the depot\'s scheduling system, designed in 1998 and patched almost annually since, most often broke in ways that affected pay.

The grievance that arrived on Marisol\'s desk on the second Wednesday in February was, in its surface form, a routine one: a mechanic named Halid Renaud was claiming that he had been short-paid for a sequence of three Saturday shifts in January, and was asking the union to file on his behalf. The amount was small — two hundred and forty dollars — and the documentation Halid had attached to his complaint was, on first review, **delineated** clearly enough that any of the depot\'s shift supervisors should have been able to confirm or refute it within an afternoon.

Marisol did not, however, file the **grievance** the same morning. She had been a steward long enough to **disentangle**, in most cases, a clean grievance from a complicated one within an hour, and the documentation Halid had submitted, while clear, did not match her informal memory of the January schedule on Bay Eight. She walked to the bay. She asked Halid, privately, three questions about the three Saturdays. The answers were consistent with the documentation. They were not, however, consistent with what she had heard, in passing, from another mechanic the previous week.

The other mechanic, a senior man named Eustace, had said, in a five-minute conversation that Marisol had not at the time regarded as significant, that Bay Eight had "had a problem on the Saturdays" and that Halid had been "carrying water" for two of the night-shift supervisors. The phrasing had been ambiguous. Eustace had not elaborated. Marisol had not asked. She regretted, now, not having asked.

She did not, on the strength of one ambiguous remark, refuse Halid\'s grievance. She did, however, decline to file it by **proxy** — that is, she declined to submit the paperwork without first conducting her own short investigation, which she explained, calmly, to Halid in a single conversation in the bay\'s small office. She did not **exhort** him to wait. She did not **harangue** him about the seriousness of misfiling. She told him only that she would, by the following Tuesday, either file the grievance as drafted or come back to him with a specific question, and that she would, in the meantime, treat his account as the working version of the facts.

Halid did not, at the meeting, object. He did, however, ask whether the delay was a **ploy** — the word was his — designed to discourage him from filing at all. Marisol said no. She also said that she understood why the question had been worth asking, and she did not, in answering it, lapse into the **pomposity** of a long speech about her own integrity.

What Marisol found, over the following five days, was not what she had feared. The two night-shift supervisors had, in fact, been quietly running an off-book overtime arrangement on Bay Eight — one that had worked, on those three Saturdays, in Halid\'s favor as well as their own — and the documentation Halid had submitted was technically accurate but was, on a complete reading, the small visible piece of a much larger irregularity that the depot\'s management would, once the union filed, certainly investigate.

She brought what she had found to Halid the following Tuesday. She did not, in the conversation, tell him what to do. She **delineated**, in three sentences, what she had learned, what filing the original grievance would now expose, and what an alternative — a confidential conversation with the union\'s field representative before any filing — would and would not preserve.

Halid took the alternative. The field representative met with the depot\'s director the following week. The off-book arrangement was unwound; Halid was paid the two hundred and forty dollars he had been owed; the two night-shift supervisors were reassigned to a different bay under tighter scheduling controls; and Marisol\'s investigation, which had begun on a single ambiguous remark, was filed in her own notes under a heading she had used several times in nine years: "the grievance whose **frailty** was on the surface and whose strength was underneath."

She kept her **poise** in the office that month. She also kept her notes.`,
  questions: [
    {
      id: 1,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "delineate" most nearly means:',
      quote:
        '"She delineated, in three sentences, what she had learned, what filing the original grievance would now expose, and what an alternative — a confidential conversation with the union\'s field representative before any filing — would and would not preserve."',
      options: [
        "To erase or obscure the boundaries of a matter.",
        "To describe or outline something carefully and precisely, as if drawing its lines.",
        "To delegate to a substitute decision-maker.",
        "To prosecute under criminal law.",
      ],
      correctIndex: 1,
      explanation:
        '"Delineate" means to describe or outline precisely — to draw the lines of a matter for someone else to see. Marisol does exactly that in three sentences.',
    },
    {
      id: 2,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "ploy" most nearly means:',
      quote:
        '"He did, however, ask whether the delay was a ploy — the word was his — designed to discourage him from filing at all."',
      options: [
        "An honest, fully disclosed procedure.",
        "A clever or cunning maneuver intended to gain an advantage by indirection.",
        "A formal vote at a union meeting.",
        "A scheduled vacation day.",
      ],
      correctIndex: 1,
      explanation:
        '"Ploy" describes a cunning maneuver intended to achieve something indirectly — exactly the suspicion Halid is voicing.',
    },
    {
      id: 3,
      kind: "tone-purpose",
      prompt:
        'The narrator says Marisol "did not lapse into the pomposity of a long speech about her own integrity" when answering Halid\'s question. Why use "pomposity" rather than simply "speech"?',
      options: [
        '"Pomposity" is just a synonym for "speech" with no different meaning.',
        '"Pomposity" carries the texture of self-important grandeur — a windy performance of one\'s own virtue. Naming the temptation that way honors Marisol\'s restraint: she answers a real question with a real answer, instead of using it as a stage for self-display.',
        '"Pomposity" implies that Marisol had previously delivered such a speech.',
        '"Pomposity" suggests that Halid had a hearing disability.',
      ],
      correctIndex: 1,
      explanation:
        'The word identifies the specific temptation — windy self-display — that Marisol\'s restraint refuses, sharpening the moral texture of the scene.',
    },
    {
      id: 4,
      kind: "inference",
      prompt:
        "Based on the passage, what can the reader most reasonably infer about why Marisol declined to file the grievance by proxy and instead conducted her own short investigation first?",
      options: [
        "She did not believe Halid\'s account and intended to discredit him publicly.",
        "She had detected a small inconsistency between the surface documentation and a half-remembered remark from another mechanic, and she judged that filing immediately could expose Halid to consequences his original grievance had not been intended to invite — so she chose to verify the underlying situation before locking the union into a particular paper trail.",
        "Union rules forbade filing any grievance within the first five business days.",
        "She wanted to delay the filing until the next quarterly meeting.",
      ],
      correctIndex: 1,
      explanation:
        "The narrative confirms exactly this: an ambiguous earlier remark, a quick check, and the discovery of a larger off-book arrangement Halid\'s clean filing would have exposed.",
    },
    {
      id: 5,
      kind: "substitution",
      prompt:
        'Which single word could replace "exhort" in the sentence below without changing its meaning?',
      quote:
        '"She did not exhort him to wait."',
      options: [
        "Discourage",
        "Urge",
        "Translate",
        "Photograph",
      ],
      correctIndex: 1,
      explanation:
        '"Urge" matches "exhort" — both describe pressing or strongly encouraging someone toward an action. Marisol declined to do so.',
    },
    {
      id: 6,
      kind: "main-idea",
      prompt:
        "Which sentence best summarizes the central idea or arc of the passage?",
      options: [
        "A union steward refuses to file a grievance and is dismissed from her position by the union\'s field representative.",
        "A union steward delays a routine grievance to disentangle a small inconsistency, refuses to harangue or to file by proxy, and — through a poised investigation — surfaces a larger off-book arrangement, presenting the member with a delineated alternative that resolves both his pay and the underlying irregularity.",
        "A mechanic refuses union representation and negotiates directly with the depot\'s director.",
        "A bus depot replaces its 1998 scheduling system and eliminates all future grievances.",
      ],
      correctIndex: 1,
      explanation:
        "The arc moves through the surface grievance, the half-remembered remark, the disciplined investigation, and the laid-out alternative the member chooses.",
    },
  ],
};

const MISSION_25_SET_3: SetReading = {
  title: "The Architect of the Sparse House",
  subtitle:
    "A short story about a young architect, a steadfast client, and a sparse design that refused to yield to the suspect rhetoric of the planning hearing.",
  format: "Short Story",
  readingMinutes: 4,
  words: [
    "relent",
    "rhetoric",
    "rigor",
    "sparse",
    "steadfast",
    "suspect",
    "tedious",
    "vitality",
    "whimsical",
    "yield",
  ],
  passage: `Wren Olafsen had been an architect for nine years and a sole practitioner for three when she received the commission for the Halpern house. The site was eight acres of mixed second-growth forest above a small lake in Vermont. The clients, an older couple named Daniel and Rose Halpern, had read three of Wren\'s small published projects and had hired her, over the phone, on the strength of a single line in one of them — a line about a hallway in which "the absence of incident is the room\'s most reliable feature."

The brief Daniel and Rose sent her was short. They wanted a primary residence of approximately 1,800 square feet, a single story, on the upper meadow of the eight-acre parcel. They wanted no architectural gestures they would have to explain to their grandchildren. They wanted, in particular, no skylights.

Wren designed a **sparse** house. The plan was a simple bar oriented east-west across the meadow, with three bedrooms at the west end, a single combined kitchen-living-dining room at the east end, and, between them, a long hallway whose only relief was the door to a small reading alcove on the north side. The exterior was vertical cedar siding stained dark gray. The roof was a single low-pitched plane. There were no exposed structural moments, no double-height volumes, no expressive cantilevers, and no skylights. The drawings, when Wren submitted them to the local planning board for the required hearing, were spare even by her own standards. The construction set was twenty-three sheets.

The hearing was, on the surface, routine. The planning board\'s chair, a man named Rufus Crain, had served on the board for seventeen years and had developed a settled view of his role: that the board\'s function was to enforce the town\'s setback and height ordinances and not to comment on architectural style. He had, in his seventeen years, never voted against a project on aesthetic grounds.

The board\'s newest member, however, a man named Beverly Lott who had joined the board the previous spring, had been preparing for the Halpern hearing for four weeks. He had visited the site twice. He had, in advance of the hearing, distributed a memo to the other board members in which he argued that the proposed house was "**suspect** in its restraint" and that the town\'s design guidelines — which were, by every honest reading, advisory rather than mandatory — implicitly required a degree of "vernacular **vitality**" that Wren\'s design did not exhibit.

The memo was, in its **rhetoric**, careful. It did not directly oppose the project. It suggested, in its closing paragraph, that the board should impose a condition requiring "two **whimsical** elements" — Beverly\'s phrase — to relieve the design\'s severity. He named, by way of example, a copper standing-seam roof and a single skylight in the reading alcove.

Wren had read the memo on the morning of the hearing. She did not, at the hearing itself, deliver any **tedious** rebuttal. She presented the drawings in fourteen minutes. She walked the board through the setback compliance and the height calculations. She acknowledged, in two sentences, that she had read Beverly\'s memo and that she respected the board\'s discretion to impose conditions, and she said, in the same calm voice, that the clients had asked for a sparse house, that the design had been developed with the **rigor** that request deserved, and that adding a copper roof or a skylight to relieve the design would, in her professional view, **yield** the very feature the Halperns had hired her to deliver.

Daniel Halpern, who had been sitting in the second row, rose without speaking. He waited until Wren had finished. He said, in the careful, slightly amused tone that had recurred in every conversation Wren had had with him over six months, that he and his wife had asked their architect for a house without skylights, and that he was prepared, if necessary, to **relent** on a great many points but that the absence of a skylight was not one of them.

The board voted four to one to approve the project as submitted. Beverly was the dissenting vote. He did not, in his subsequent comments, retract his memo. He did not, however, repeat the proposed conditions.

The house was completed sixteen months later. Daniel and Rose moved in the following October. The reading alcove had no skylight. The hallway, exactly as Wren had designed it, had no incident. Wren did not publish the project for two years; when she did, she wrote, in a single line that would be quoted by other young architects, that the most **steadfast** clients she had known were the ones who had wanted, and could afford, to be left alone in their own house.`,
  questions: [
    {
      id: 1,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "sparse" most nearly means:',
      quote:
        '"Wren designed a sparse house. The plan was a simple bar oriented east-west across the meadow, with three bedrooms at the west end, a single combined kitchen-living-dining room at the east end..."',
      options: [
        "Densely packed with overlapping volumes and details.",
        "Thinly populated with elements; spare and economical.",
        "Constructed entirely from glass.",
        "Hidden underground for environmental reasons.",
      ],
      correctIndex: 1,
      explanation:
        '"Sparse" describes a thin, spare, economical arrangement — exactly the design the sentence then describes.',
    },
    {
      id: 2,
      kind: "vocab-context",
      prompt: 'In this sentence, the word "rhetoric" most nearly means:',
      quote:
        '"The memo was, in its rhetoric, careful. It did not directly oppose the project. It suggested, in its closing paragraph, that the board should impose a condition..."',
      options: [
        "The literal building materials used in a project.",
        "The art and style of persuasive language; the chosen wording of an argument.",
        "An official planning regulation.",
        "A type of building permit.",
      ],
      correctIndex: 1,
      explanation:
        '"Rhetoric" describes the persuasive style or wording of an argument — the careful framing of Beverly\'s memo.',
    },
    {
      id: 3,
      kind: "tone-purpose",
      prompt:
        'The narrator says adding a copper roof or skylight would "yield the very feature the Halperns had hired her to deliver." Why is "yield" the right verb here, rather than "hide" or "remove"?',
      options: [
        '"Yield" implies that the addition would slow down the construction schedule.',
        '"Yield" carries the sense of giving up or surrendering something — as in "yielding ground." Used here, it argues that the proposed conditions would not merely modify the house but would surrender the design\'s defining quality, which is precisely what the clients commissioned.',
        '"Yield" suggests the architect would profit financially from the addition.',
        '"Yield" is just a synonym for "build" with no different meaning.',
      ],
      correctIndex: 1,
      explanation:
        'The "surrender" sense of "yield" frames the proposed conditions as the loss of the design\'s defining quality — sharper than "hide" or "remove" would have been.',
    },
    {
      id: 4,
      kind: "inference",
      prompt:
        "Based on the passage, what can the reader most reasonably infer about why Daniel Halpern\'s brief comment at the hearing — that he was prepared to relent on a great many points but not on the absence of a skylight — was decisive for the board?",
      options: [
        "Daniel was a member of the planning board and his vote counted twice.",
        "His comment converted the architect\'s aesthetic case into the client\'s explicit functional preference, making clear that the proposed conditions were not relieving an architect\'s self-indulgence but overriding a documented client request — a posture the board\'s chair, who limited himself to setbacks and heights, was unwilling to support.",
        "Daniel threatened to sue the board if they imposed any conditions.",
        "Daniel offered to pay an additional fee to the town in exchange for approval.",
      ],
      correctIndex: 1,
      explanation:
        "The text frames the chair\'s view (no aesthetic votes) and Beverly\'s framing (an aesthetic condition); Daniel\'s comment makes the design a client preference, which removes the aesthetic-condition justification.",
    },
    {
      id: 5,
      kind: "substitution",
      prompt:
        'Which single word could replace "steadfast" in the sentence below without changing its meaning?',
      quote:
        '"...the most steadfast clients she had known were the ones who had wanted, and could afford, to be left alone in their own house."',
      options: [
        "Wavering",
        "Resolute",
        "Anonymous",
        "Forgetful",
      ],
      correctIndex: 1,
      explanation:
        '"Resolute" matches "steadfast" — both describe firm, unwavering commitment. The Halperns hold to their brief without wavering.',
    },
    {
      id: 6,
      kind: "main-idea",
      prompt:
        "Which sentence best summarizes the central idea or arc of the passage?",
      options: [
        "An architect agrees to add a skylight and a copper roof in order to obtain planning board approval.",
        "An architect designs a sparse house with rigor for steadfast clients, presents it without tedious rebuttal at a hearing where a new board member\'s suspect rhetoric proposes to relieve its severity, and — supported by a single calm intervention from the client — secures approval as submitted, without yielding the design\'s defining absences.",
        "A planning board imposes mandatory aesthetic conditions on every house in the town and the architect resigns from her practice.",
        "A pair of clients withdraw from a building project after their architect refuses to add any whimsical elements to their house.",
      ],
      correctIndex: 1,
      explanation:
        "The arc traces precisely the design, the contested hearing, the client\'s decisive comment, and the approved project that holds its sparse character.",
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
  "9-1": MISSION_9_SET_1,
  "9-2": MISSION_9_SET_2,
  "9-3": MISSION_9_SET_3,
  "10-1": MISSION_10_SET_1,
  "10-2": MISSION_10_SET_2,
  "10-3": MISSION_10_SET_3,
  "11-1": MISSION_11_SET_1,
  "11-2": MISSION_11_SET_2,
  "11-3": MISSION_11_SET_3,
  "12-1": MISSION_12_SET_1,
  "12-2": MISSION_12_SET_2,
  "12-3": MISSION_12_SET_3,
  "13-1": MISSION_13_SET_1,
  "13-2": MISSION_13_SET_2,
  "13-3": MISSION_13_SET_3,
  "14-1": MISSION_14_SET_1,
  "14-2": MISSION_14_SET_2,
  "14-3": MISSION_14_SET_3,
  "15-1": MISSION_15_SET_1,
  "15-2": MISSION_15_SET_2,
  "15-3": MISSION_15_SET_3,
  "16-1": MISSION_16_SET_1,
  "16-2": MISSION_16_SET_2,
  "16-3": MISSION_16_SET_3,
  "17-1": MISSION_17_SET_1,
  "17-2": MISSION_17_SET_2,
  "17-3": MISSION_17_SET_3,
  "18-1": MISSION_18_SET_1,
  "18-2": MISSION_18_SET_2,
  "18-3": MISSION_18_SET_3,
  "19-1": MISSION_19_SET_1,
  "19-2": MISSION_19_SET_2,
  "19-3": MISSION_19_SET_3,
  "20-1": MISSION_20_SET_1,
  "20-2": MISSION_20_SET_2,
  "20-3": MISSION_20_SET_3,
  "21-1": MISSION_21_SET_1,
  "21-2": MISSION_21_SET_2,
  "21-3": MISSION_21_SET_3,
  "22-1": MISSION_22_SET_1,
  "22-2": MISSION_22_SET_2,
  "22-3": MISSION_22_SET_3,
  "23-1": MISSION_23_SET_1,
  "23-2": MISSION_23_SET_2,
  "23-3": MISSION_23_SET_3,
  "24-1": MISSION_24_SET_1,
  "24-2": MISSION_24_SET_2,
  "24-3": MISSION_24_SET_3,
  "25-1": MISSION_25_SET_1,
  "25-2": MISSION_25_SET_2,
  "25-3": MISSION_25_SET_3,
};

export function getSetReading(day: number, group: number): SetReading | null {
  return SET_READINGS[`${day}-${group}`] ?? null;
}

export function hasSetReading(day: number, group: number): boolean {
  return Boolean(SET_READINGS[`${day}-${group}`]);
}
