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

export const SET_READINGS: Record<string, SetReading> = {
  "1-1": MISSION_1_SET_1,
  "1-2": MISSION_1_SET_2,
  "1-3": MISSION_1_SET_3,
  "2-1": MISSION_2_SET_1,
  "2-2": MISSION_2_SET_2,
  "2-3": MISSION_2_SET_3,
};

export function getSetReading(day: number, group: number): SetReading | null {
  return SET_READINGS[`${day}-${group}`] ?? null;
}

export function hasSetReading(day: number, group: number): boolean {
  return Boolean(SET_READINGS[`${day}-${group}`]);
}
