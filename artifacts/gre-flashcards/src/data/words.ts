import { WORD_ROOTS } from "@/data/wordRoots";

export interface Word {
  id: string;
  word: string;
  pos: string;
  arabic: string;
  definition: string;
  examples: [string, string, string];
  synonyms: [string, string, string];
  day: number;
  group: number;
  difficulty: number;
  lastReviewed: string | null;
  nextReview: string | null;
  status: "new" | "learning" | "review" | "mastered";
  interval: number;
  easeFactor: number;
  repetitions: number;
  correctCount: number;
  incorrectCount: number;
  qualityHistory: number[];
  root?: string;
  wordFamily?: string[];
}

export const RAW_WORDS: Omit<Word, "id" | "difficulty" | "lastReviewed" | "nextReview" | "status" | "interval" | "easeFactor" | "repetitions" | "correctCount" | "incorrectCount" | "qualityHistory" | "root" | "wordFamily">[] = [
  // Day 1 Group 1
  {
    word: "abound",
    pos: "verb",
    arabic: "يكثر / يزخر",
    definition: "To exist in large numbers or amounts; to be plentiful.",
    examples: [
      "The forest abounds with wildlife, making it a paradise for nature lovers.",
      "Errors abound in the hastily written report.",
      "Opportunities abound for those who are willing to work hard."
    ],
    synonyms: ["teem", "overflow", "proliferate"],
    day: 1,
    group: 1,
  },
  {
    word: "amorphous",
    pos: "adjective",
    arabic: "عديم الشكل / غير محدد",
    definition: "Without a clearly defined shape or form; vague and without structure.",
    examples: [
      "The amorphous blob of dough hadn't yet been shaped into bread.",
      "Her plans for the future remained amorphous and undefined.",
      "The organization had an amorphous structure that confused new employees."
    ],
    synonyms: ["formless", "shapeless", "nebulous"],
    day: 1,
    group: 1,
  },
  {
    word: "austere",
    pos: "adjective",
    arabic: "صارم / متقشف",
    definition: "Severe or strict in manner or attitude; having no comforts or luxuries.",
    examples: [
      "The monk lived an austere life, owning only a few possessions.",
      "Her austere expression made the students nervous to speak up.",
      "The room was decorated in an austere style, with plain white walls and minimal furniture."
    ],
    synonyms: ["severe", "ascetic", "spartan"],
    day: 1,
    group: 1,
  },
  {
    word: "belie",
    pos: "verb",
    arabic: "يكذّب / يخفي الحقيقة",
    definition: "To give a false impression of; to contradict or disguise.",
    examples: [
      "Her calm demeanor belied the anxiety she felt inside.",
      "The building's modern exterior belies its centuries-old history.",
      "His cheerful smile belied the sadness he carried."
    ],
    synonyms: ["contradict", "misrepresent", "disguise"],
    day: 1,
    group: 1,
  },
  {
    word: "capricious",
    pos: "adjective",
    arabic: "متقلب المزاج / نزوي",
    definition: "Given to sudden and unaccountable changes of mood or behavior; impulsive.",
    examples: [
      "The capricious weather made planning an outdoor event difficult.",
      "Her capricious boss changed the project requirements without warning.",
      "The king was known for his capricious decisions that baffled his advisors."
    ],
    synonyms: ["fickle", "whimsical", "mercurial"],
    day: 1,
    group: 1,
  },
  {
    word: "cerebral",
    pos: "adjective",
    arabic: "ذهني / عقلي",
    definition: "Relating to the intellect; requiring or showing careful thinking.",
    examples: [
      "She preferred cerebral activities like chess and philosophy over physical sports.",
      "The professor's lectures were highly cerebral and demanded intense concentration.",
      "His cerebral approach to problem-solving earned him respect among peers."
    ],
    synonyms: ["intellectual", "analytical", "rational"],
    day: 1,
    group: 1,
  },
  {
    word: "congenial",
    pos: "adjective",
    arabic: "لطيف / ودود / ملائم",
    definition: "Pleasant or agreeable because suited to one's tastes or inclinations; sociable.",
    examples: [
      "The colleagues found each other congenial and quickly became friends.",
      "She found the small-town atmosphere congenial to her creative work.",
      "A congenial host, he made every guest feel welcome."
    ],
    synonyms: ["agreeable", "affable", "compatible"],
    day: 1,
    group: 1,
  },
  {
    word: "conspicuous",
    pos: "adjective",
    arabic: "لافت للنظر / واضح",
    definition: "Clearly visible; attracting notice or attention.",
    examples: [
      "The bright red car was conspicuous in the parking lot.",
      "Her conspicuous absence at the meeting was noted by everyone.",
      "He wore a conspicuous hat that stood out in the crowd."
    ],
    synonyms: ["noticeable", "prominent", "glaring"],
    day: 1,
    group: 1,
  },
  {
    word: "cursory",
    pos: "adjective",
    arabic: "سطحي / عجول",
    definition: "Hasty and therefore not thorough or detailed; superficial.",
    examples: [
      "A cursory glance at the report revealed several obvious errors.",
      "She gave the document a cursory review before signing it.",
      "His cursory investigation failed to uncover the real cause of the problem."
    ],
    synonyms: ["superficial", "hasty", "perfunctory"],
    day: 1,
    group: 1,
  },
  {
    word: "daunting",
    pos: "adjective",
    arabic: "مخيف / مرهب",
    definition: "Seeming difficult to deal with in prospect; intimidating.",
    examples: [
      "The daunting task of climbing Everest requires months of preparation.",
      "Facing the daunting pile of work, she took a deep breath and started.",
      "The prospect of public speaking was daunting to the shy student."
    ],
    synonyms: ["intimidating", "formidable", "discouraging"],
    day: 1,
    group: 1,
  },
  // Day 1 Group 2
  {
    word: "deify",
    pos: "verb",
    arabic: "يؤلّه / يعبد",
    definition: "To worship or regard as a god; to idealize or idolize excessively.",
    examples: [
      "Ancient cultures would deify natural forces like the sun and rain.",
      "Fans sometimes deify celebrities, treating them as infallible.",
      "The general's followers began to deify him after his military victories."
    ],
    synonyms: ["idolize", "worship", "exalt"],
    day: 1,
    group: 2,
  },
  {
    word: "didactic",
    pos: "adjective",
    arabic: "تعليمي / وعظي",
    definition: "Intended to teach, particularly in having moral instruction as a primary purpose.",
    examples: [
      "The novel was didactic, aiming to teach children the value of honesty.",
      "His tone became didactic when explaining the rules of grammar.",
      "The play had a didactic purpose, warning audiences about the dangers of greed."
    ],
    synonyms: ["instructive", "educational", "moralizing"],
    day: 1,
    group: 2,
  },
  {
    word: "disseminate",
    pos: "verb",
    arabic: "ينشر / يبث",
    definition: "To spread widely; to distribute or broadcast information.",
    examples: [
      "The internet has made it easier to disseminate news rapidly.",
      "Scientists disseminate their findings through academic journals.",
      "The organization works to disseminate health information in rural areas."
    ],
    synonyms: ["spread", "propagate", "circulate"],
    day: 1,
    group: 2,
  },
  {
    word: "feasible",
    pos: "adjective",
    arabic: "ممكن / قابل للتنفيذ",
    definition: "Possible and practical to do easily or conveniently; achievable.",
    examples: [
      "The engineer determined that the project was feasible within the budget.",
      "Is it feasible to complete the work by Friday?",
      "Building a bridge across the canyon seemed feasible with modern technology."
    ],
    synonyms: ["viable", "practicable", "achievable"],
    day: 1,
    group: 2,
  },
  {
    word: "flout",
    pos: "verb",
    arabic: "يتحدى / يستهين",
    definition: "To openly disregard or disobey a rule, law, or convention.",
    examples: [
      "The rebel students flouted school rules by wearing prohibited clothing.",
      "The company flouted environmental regulations, resulting in heavy fines.",
      "She flouted convention by starting her own business at age eighteen."
    ],
    synonyms: ["defy", "disregard", "disobey"],
    day: 1,
    group: 2,
  },
  {
    word: "homogeneous",
    pos: "adjective",
    arabic: "متجانس / متماثل",
    definition: "Of the same kind; alike; uniform in structure or composition.",
    examples: [
      "The neighborhood was homogeneous, with all houses looking nearly identical.",
      "A homogeneous mixture dissolves evenly without separate components.",
      "The class was culturally homogeneous, lacking diversity in background."
    ],
    synonyms: ["uniform", "consistent", "alike"],
    day: 1,
    group: 2,
  },
  {
    word: "humdrum",
    pos: "adjective",
    arabic: "رتيب / ممل",
    definition: "Lacking excitement or variety; dull and monotonous.",
    examples: [
      "He longed for adventure after years of a humdrum office routine.",
      "The humdrum chores of daily life left her yearning for something meaningful.",
      "What started as an exciting project became humdrum after months of repetition."
    ],
    synonyms: ["monotonous", "tedious", "mundane"],
    day: 1,
    group: 2,
  },
  {
    word: "insipid",
    pos: "adjective",
    arabic: "تافه / بلا طعم",
    definition: "Lacking flavor, vigor, or interest; dull and uninspiring.",
    examples: [
      "The soup was insipid, having been cooked without any seasoning.",
      "Critics dismissed the film as insipid and forgettable.",
      "Her insipid conversation bored everyone at the dinner table."
    ],
    synonyms: ["bland", "vapid", "tasteless"],
    day: 1,
    group: 2,
  },
  {
    word: "loquacious",
    pos: "adjective",
    arabic: "ثرثار / كثير الكلام",
    definition: "Tending to talk a great deal; talkative.",
    examples: [
      "The loquacious host kept the party alive with his endless stories.",
      "She became loquacious after a glass of wine.",
      "His loquacious nature made it difficult to end phone calls with him."
    ],
    synonyms: ["garrulous", "verbose", "talkative"],
    day: 1,
    group: 2,
  },
  {
    word: "misanthropic",
    pos: "adjective",
    arabic: "كاره للبشر",
    definition: "Having a dislike or distrust of humankind; unsociable.",
    examples: [
      "His misanthropic tendencies led him to live as a hermit.",
      "The misanthropic character in the novel avoided all social interactions.",
      "Years of disappointment made her increasingly misanthropic."
    ],
    synonyms: ["cynical", "antisocial", "reclusive"],
    day: 1,
    group: 2,
  },
  // Day 1 Group 3
  {
    word: "misnomer",
    pos: "noun",
    arabic: "تسمية خاطئة",
    definition: "A wrong or inaccurate name or designation; a misuse of a name or term.",
    examples: [
      "Calling a koala a 'bear' is a misnomer, as it is actually a marsupial.",
      "The term 'common sense' is sometimes a misnomer, as it isn't always common.",
      "'Starfish' is a misnomer; biologists prefer to call them sea stars."
    ],
    synonyms: ["mislabeling", "misapplication", "inaccuracy"],
    day: 1,
    group: 3,
  },
  {
    word: "negligent",
    pos: "adjective",
    arabic: "مهمل / متهاون",
    definition: "Failing to take proper care over something; careless and inattentive.",
    examples: [
      "The negligent driver ignored red lights, causing an accident.",
      "She was found negligent in her duty to maintain the equipment.",
      "Negligent record-keeping led to confusion during the audit."
    ],
    synonyms: ["careless", "remiss", "neglectful"],
    day: 1,
    group: 3,
  },
  {
    word: "obsequious",
    pos: "adjective",
    arabic: "متملق / مداهن",
    definition: "Excessively compliant or fawning; servilely obedient.",
    examples: [
      "The obsequious assistant agreed with everything his boss said.",
      "Her obsequious behavior at the interview seemed insincere to the panel.",
      "He despised obsequious people who simply told others what they wanted to hear."
    ],
    synonyms: ["sycophantic", "fawning", "servile"],
    day: 1,
    group: 3,
  },
  {
    word: "placate",
    pos: "verb",
    arabic: "يهدئ / يسترضي",
    definition: "To make someone less angry or upset; to appease.",
    examples: [
      "The manager tried to placate the angry customer with a refund.",
      "She brought flowers to placate her friend after the argument.",
      "It was difficult to placate the protesters demanding immediate action."
    ],
    synonyms: ["appease", "mollify", "pacify"],
    day: 1,
    group: 3,
  },
  {
    word: "proclivity",
    pos: "noun",
    arabic: "ميل / نزعة",
    definition: "A tendency to choose or do something regularly; an inclination or predisposition.",
    examples: [
      "His proclivity for risk-taking made him a successful entrepreneur.",
      "She had a proclivity toward artistic expression from a young age.",
      "The child showed a proclivity for mathematics that impressed her teachers."
    ],
    synonyms: ["tendency", "inclination", "predisposition"],
    day: 1,
    group: 3,
  },
  {
    word: "puerile",
    pos: "adjective",
    arabic: "طفولي / ساذج",
    definition: "Childishly silly and immature; juvenile.",
    examples: [
      "The politician's puerile remarks were embarrassing to his party.",
      "She dismissed his puerile attempt at humor.",
      "The puerile behavior of the adult students shocked the professor."
    ],
    synonyms: ["immature", "childish", "juvenile"],
    day: 1,
    group: 3,
  },
  {
    word: "quixotic",
    pos: "adjective",
    arabic: "خيالي / طموح بشكل غير واقعي",
    definition: "Exceedingly idealistic; unrealistic and impractical; chasing impossible dreams.",
    examples: [
      "His quixotic quest to reform the entire government alone seemed hopeless.",
      "She admired his quixotic ambition, even if she doubted its success.",
      "The plan to solve world hunger in a year was dismissed as quixotic."
    ],
    synonyms: ["idealistic", "impractical", "visionary"],
    day: 1,
    group: 3,
  },
  {
    word: "spendthrift",
    pos: "noun/adjective",
    arabic: "مبذّر / مسرف",
    definition: "A person who spends money in an extravagant, irresponsible way; wasteful.",
    examples: [
      "The spendthrift heir burned through his inheritance in less than a year.",
      "Her spendthrift habits left her in debt despite earning a good salary.",
      "A spendthrift by nature, he could never hold on to his savings."
    ],
    synonyms: ["wastrel", "prodigal", "squanderer"],
    day: 1,
    group: 3,
  },
  {
    word: "taciturn",
    pos: "adjective",
    arabic: "صامت / قليل الكلام",
    definition: "Reserved or uncommunicative in speech; saying little; habitually silent.",
    examples: [
      "The taciturn detective rarely shared his theories until he was certain.",
      "She was known as a taciturn person who preferred listening to speaking.",
      "His taciturn manner made it hard to know what he was thinking."
    ],
    synonyms: ["reticent", "reserved", "laconic"],
    day: 1,
    group: 3,
  },
  {
    word: "wary",
    pos: "adjective",
    arabic: "حذر / متيقظ",
    definition: "Feeling or showing caution about possible dangers or problems.",
    examples: [
      "She was wary of strangers after her wallet was stolen.",
      "Investors became wary of the volatile stock market.",
      "The cat was wary of the unfamiliar dog sniffing around the yard."
    ],
    synonyms: ["cautious", "guarded", "vigilant"],
    day: 1,
    group: 3,
  },
  // Day 2 Group 1
  {
    word: "adulterate",
    pos: "verb",
    arabic: "يغش / يخلط بمواد رديئة",
    definition: "To make something impure by adding inferior or improper substances.",
    examples: [
      "The milk was adulterated with water to increase the volume.",
      "Merchants who adulterate their products face heavy fines.",
      "The wine had been adulterated with cheap grape juice."
    ],
    synonyms: ["contaminate", "corrupt", "dilute"],
    day: 2,
    group: 1,
  },
  {
    word: "advocate",
    pos: "verb/noun",
    arabic: "يدافع / مناصر",
    definition: "To publicly recommend or support something; a person who supports a cause.",
    examples: [
      "She advocates for stricter environmental regulations.",
      "He served as an advocate for the rights of disabled workers.",
      "The charity advocates on behalf of underprivileged children."
    ],
    synonyms: ["champion", "support", "promote"],
    day: 2,
    group: 1,
  },
  {
    word: "aggrandize",
    pos: "verb",
    arabic: "يضخّم / يعظّم",
    definition: "To increase the power, status, or wealth of something; to enhance or exaggerate.",
    examples: [
      "The dictator sought to aggrandize his own power at the expense of democracy.",
      "He tended to aggrandize his accomplishments in his resume.",
      "The politician aggrandized his role in the peace negotiations."
    ],
    synonyms: ["exalt", "inflate", "magnify"],
    day: 2,
    group: 1,
  },
  {
    word: "alacrity",
    pos: "noun",
    arabic: "نشاط / استعداد تام",
    definition: "Brisk and cheerful readiness; enthusiastic willingness.",
    examples: [
      "She accepted the challenge with alacrity and immediately got to work.",
      "The soldiers responded to the command with alacrity.",
      "He greeted every new task with alacrity that inspired his colleagues."
    ],
    synonyms: ["eagerness", "enthusiasm", "promptness"],
    day: 2,
    group: 1,
  },
  {
    word: "ambivalent",
    pos: "adjective",
    arabic: "متردد / ذو مشاعر متضاربة",
    definition: "Having mixed feelings or contradictory ideas about something or someone.",
    examples: [
      "She felt ambivalent about moving to a new city—excited yet anxious.",
      "He was ambivalent toward his old friend after the betrayal.",
      "The voters remained ambivalent about both candidates."
    ],
    synonyms: ["uncertain", "conflicted", "undecided"],
    day: 2,
    group: 1,
  },
  {
    word: "ameliorate",
    pos: "verb",
    arabic: "يحسّن / يخفف",
    definition: "To make something bad or unsatisfactory better; to improve.",
    examples: [
      "The new policy was designed to ameliorate poverty in rural communities.",
      "Medication helped ameliorate the symptoms of the chronic illness.",
      "The government took steps to ameliorate the living conditions of refugees."
    ],
    synonyms: ["improve", "alleviate", "mitigate"],
    day: 2,
    group: 1,
  },
  {
    word: "amenable",
    pos: "adjective",
    arabic: "قابل للتأثير / راضٍ",
    definition: "Open and responsive to suggestion; willing to act or be influenced; compliant.",
    examples: [
      "The students were amenable to the new class schedule.",
      "He was amenable to compromise when both sides stood to gain.",
      "The patient was amenable to trying alternative treatments."
    ],
    synonyms: ["receptive", "cooperative", "agreeable"],
    day: 2,
    group: 1,
  },
  {
    word: "anachronistic",
    pos: "adjective",
    arabic: "غير متزامن / خارج عن العصر",
    definition: "Belonging to or appropriate to an earlier period; out of date.",
    examples: [
      "Using a typewriter today seems anachronistic in the digital age.",
      "The film's anachronistic costumes confused historians.",
      "His anachronistic views on gender roles clashed with modern values."
    ],
    synonyms: ["outdated", "archaic", "obsolete"],
    day: 2,
    group: 1,
  },
  {
    word: "audacious",
    pos: "adjective",
    arabic: "جريء / متهور",
    definition: "Showing a willingness to take surprisingly bold risks; daring.",
    examples: [
      "The audacious plan to cross the ocean alone stunned everyone.",
      "Her audacious move to challenge the CEO surprised the board.",
      "He made an audacious bet that paid off handsomely."
    ],
    synonyms: ["bold", "daring", "intrepid"],
    day: 2,
    group: 1,
  },
  {
    word: "avaricious",
    pos: "adjective",
    arabic: "طماع / جشع",
    definition: "Having an extreme greed for wealth or material gain.",
    examples: [
      "The avaricious landlord raised rent every year regardless of conditions.",
      "Her avaricious colleagues took credit for others' work.",
      "He was seen as avaricious, always looking to profit at others' expense."
    ],
    synonyms: ["greedy", "covetous", "rapacious"],
    day: 2,
    group: 1,
  },
  // Day 2 Group 2
  {
    word: "banal",
    pos: "adjective",
    arabic: "مبتذل / تافه",
    definition: "So lacking in originality as to be obvious and boring; commonplace.",
    examples: [
      "The speech was banal, filled with clichés and nothing meaningful.",
      "He tried to avoid banal small talk at the networking event.",
      "Her poetry was dismissed as banal by the literary critics."
    ],
    synonyms: ["trite", "hackneyed", "mundane"],
    day: 2,
    group: 2,
  },
  {
    word: "benign",
    pos: "adjective",
    arabic: "حميد / طيب",
    definition: "Gentle and kindly; not harmful in effect; (of a tumor) not malignant.",
    examples: [
      "The doctor confirmed the tumor was benign and required no treatment.",
      "He had a benign personality that made everyone feel at ease.",
      "The benign climate of the region attracted many retirees."
    ],
    synonyms: ["harmless", "gentle", "benevolent"],
    day: 2,
    group: 2,
  },
  {
    word: "brazen",
    pos: "adjective",
    arabic: "وقح / صفيق",
    definition: "Bold and without shame; done in an open and unabashed manner.",
    examples: [
      "The thief made a brazen attempt to steal in front of security cameras.",
      "She was brazen in her criticism of the professor during class.",
      "His brazen disregard for the rules shocked his colleagues."
    ],
    synonyms: ["shameless", "audacious", "impudent"],
    day: 2,
    group: 2,
  },
  {
    word: "calumny",
    pos: "noun",
    arabic: "افتراء / قذف",
    definition: "The making of false and defamatory statements about someone; slander.",
    examples: [
      "The politician's reputation was damaged by calumny spread by his opponents.",
      "She filed a lawsuit against the newspaper for calumny.",
      "He refused to engage in calumny, even when provoked."
    ],
    synonyms: ["slander", "defamation", "libel"],
    day: 2,
    group: 2,
  },
  {
    word: "candid",
    pos: "adjective",
    arabic: "صريح / مباشر",
    definition: "Truthful and straightforward; frank and open in expression.",
    examples: [
      "She gave a candid assessment of the project's weaknesses.",
      "I appreciate your candid feedback—it helps me improve.",
      "The journalist was known for his candid interviews with world leaders."
    ],
    synonyms: ["frank", "honest", "forthright"],
    day: 2,
    group: 2,
  },
  {
    word: "castigate",
    pos: "verb",
    arabic: "يوبّخ / ينتقد بشدة",
    definition: "To reprimand someone severely; to criticize harshly.",
    examples: [
      "The coach castigated the team for their poor performance.",
      "Critics castigated the author for his offensive remarks.",
      "She was publicly castigated for violating the code of conduct."
    ],
    synonyms: ["rebuke", "chastise", "berate"],
    day: 2,
    group: 2,
  },
  {
    word: "caustic",
    pos: "adjective",
    arabic: "لاذع / حارق",
    definition: "Sarcastic in a scathing and bitter way; able to burn or corrode organic tissue.",
    examples: [
      "His caustic wit could cut through anyone's confidence.",
      "The caustic chemicals required special protective gloves.",
      "She delivered a caustic review of the performance that made headlines."
    ],
    synonyms: ["biting", "acerbic", "corrosive"],
    day: 2,
    group: 2,
  },
  {
    word: "construe",
    pos: "verb",
    arabic: "يفسّر / يعتبر",
    definition: "To interpret or understand (a word, action, or situation) in a particular way.",
    examples: [
      "His silence was construed as agreement by the group.",
      "The law was construed narrowly to limit its scope.",
      "Her smile could be construed as either friendly or mocking."
    ],
    synonyms: ["interpret", "understand", "deduce"],
    day: 2,
    group: 2,
  },
  {
    word: "contrite",
    pos: "adjective",
    arabic: "نادم / آسف",
    definition: "Feeling or expressing remorse or penitence; affected by guilt.",
    examples: [
      "He was genuinely contrite after realizing the hurt he had caused.",
      "The contrite student apologized to the teacher for cheating.",
      "Her contrite expression softened the anger of those she had wronged."
    ],
    synonyms: ["remorseful", "penitent", "regretful"],
    day: 2,
    group: 2,
  },
  {
    word: "convoluted",
    pos: "adjective",
    arabic: "ملتوٍ / معقد",
    definition: "Extremely complex and difficult to follow; intricate.",
    examples: [
      "The instructions were so convoluted that no one understood them.",
      "His convoluted argument confused even the experienced debaters.",
      "She gave a convoluted explanation that raised more questions than it answered."
    ],
    synonyms: ["complex", "intricate", "tortuous"],
    day: 2,
    group: 2,
  },
  // Day 2 Group 3
  {
    word: "covet",
    pos: "verb",
    arabic: "يتوق / يتمنى بشدة",
    definition: "To yearn to possess or have something belonging to another; to desire eagerly.",
    examples: [
      "He coveted his neighbor's new sports car.",
      "She had long coveted a position on the editorial board.",
      "Many covet fame without realizing the burden it carries."
    ],
    synonyms: ["crave", "desire", "envy"],
    day: 2,
    group: 3,
  },
  {
    word: "craven",
    pos: "adjective",
    arabic: "جبان / خائف",
    definition: "Contemptibly lacking in courage; cowardly.",
    examples: [
      "The craven soldier abandoned his post when the battle began.",
      "It was craven to deny knowledge of the wrongdoing.",
      "His craven surrender disappointed everyone who had believed in him."
    ],
    synonyms: ["cowardly", "timid", "pusillanimous"],
    day: 2,
    group: 3,
  },
  {
    word: "decorum",
    pos: "noun",
    arabic: "لياقة / أدب السلوك",
    definition: "Behavior in keeping with good taste and propriety; dignified conduct.",
    examples: [
      "The ceremony was conducted with great decorum and respect.",
      "She maintained decorum even when the debate grew heated.",
      "Students are expected to observe decorum in formal events."
    ],
    synonyms: ["propriety", "decency", "protocol"],
    day: 2,
    group: 3,
  },
  {
    word: "deft",
    pos: "adjective",
    arabic: "ماهر / بارع",
    definition: "Neatly skillful and quick in one's movements or actions; adroit.",
    examples: [
      "With a deft flick of the wrist, the chef sliced the vegetables perfectly.",
      "She was deft at handling difficult conversations without causing offense.",
      "His deft management of the crisis earned him widespread praise."
    ],
    synonyms: ["skillful", "adroit", "nimble"],
    day: 2,
    group: 3,
  },
  {
    word: "demur",
    pos: "verb/noun",
    arabic: "يعترض / يتحفظ",
    definition: "To raise objections or show reluctance; a show of reluctance or objection.",
    examples: [
      "She accepted the offer without demur.",
      "He demurred at the plan to cut overtime pay.",
      "Without demur, the soldiers followed the commander's orders."
    ],
    synonyms: ["object", "hesitate", "protest"],
    day: 2,
    group: 3,
  },
  {
    word: "derivative",
    pos: "adjective/noun",
    arabic: "مشتق / منقول",
    definition: "Imitative of the work of another person; lacking originality.",
    examples: [
      "Critics called the film derivative, comparing it to earlier works.",
      "His painting style was considered derivative of the Impressionists.",
      "The sequel felt derivative, offering nothing new to the franchise."
    ],
    synonyms: ["imitative", "unoriginal", "secondary"],
    day: 2,
    group: 3,
  },
  {
    word: "desiccate",
    pos: "verb",
    arabic: "يجفف / يُيبّس",
    definition: "To remove all moisture from; to dry out completely.",
    examples: [
      "The desert heat desiccated the leaves within hours.",
      "The mummy had been naturally desiccated by the arid climate.",
      "Desiccated coconut is used in many tropical recipes."
    ],
    synonyms: ["dehydrate", "dry", "parch"],
    day: 2,
    group: 3,
  },
  {
    word: "diatribe",
    pos: "noun",
    arabic: "هجوم لفظي / خطاب غاضب",
    definition: "A forceful and bitter verbal attack; a prolonged bitter speech.",
    examples: [
      "He launched into a diatribe against the government's economic policy.",
      "The review was less criticism than a personal diatribe against the author.",
      "Her diatribe left the audience uncomfortable and confused."
    ],
    synonyms: ["tirade", "harangue", "rant"],
    day: 2,
    group: 3,
  },
  {
    word: "incredulous",
    pos: "adjective",
    arabic: "غير مصدّق / متشكك",
    definition: "Unwilling or unable to believe something; skeptical.",
    examples: [
      "She was incredulous when told she had won the lottery.",
      "The audience remained incredulous despite the magician's 'proof'.",
      "He stared at the document with an incredulous expression."
    ],
    synonyms: ["skeptical", "dubious", "disbelieving"],
    day: 2,
    group: 3,
  },
  {
    word: "ingenuous",
    pos: "adjective",
    arabic: "ساذج / بريء",
    definition: "Innocent and unsuspecting; showing childlike simplicity and candidness.",
    examples: [
      "Her ingenuous trust in strangers made her vulnerable to deceit.",
      "He gave an ingenuous smile that won everyone's affection.",
      "The ingenuous student believed everything the professor said."
    ],
    synonyms: ["naive", "guileless", "artless"],
    day: 2,
    group: 3,
  },
  // Day 3 Group 1
  {
    word: "abate",
    pos: "verb",
    arabic: "يخفت / يتراجع",
    definition: "To become less intense or widespread; to reduce or diminish.",
    examples: [
      "The storm abated overnight, leaving clear skies by morning.",
      "His anger slowly abated as he listened to her explanation.",
      "The flooding did not abate until the rain stopped completely."
    ],
    synonyms: ["diminish", "subside", "lessen"],
    day: 3,
    group: 1,
  },
  {
    word: "abjure",
    pos: "verb",
    arabic: "يتخلى عن / يرفض بشكل رسمي",
    definition: "To solemnly renounce a belief, cause, or claim; to formally give up.",
    examples: [
      "The knight abjured his allegiance to the traitorous king.",
      "She abjured her former political beliefs after years of reflection.",
      "He was forced to abjure his heretical views under threat of punishment."
    ],
    synonyms: ["renounce", "forswear", "recant"],
    day: 3,
    group: 1,
  },
  {
    word: "anomalous",
    pos: "adjective",
    arabic: "شاذ / غير طبيعي",
    definition: "Deviating from what is standard, normal, or expected; irregular.",
    examples: [
      "The anomalous test results prompted further investigation.",
      "Her anomalous performance stood out from the rest of the group.",
      "The scientist noted an anomalous spike in the data."
    ],
    synonyms: ["abnormal", "irregular", "atypical"],
    day: 3,
    group: 1,
  },
  {
    word: "antipathy",
    pos: "noun",
    arabic: "نفور / كراهية",
    definition: "A deep-seated feeling of dislike; strong aversion.",
    examples: [
      "He felt an immediate antipathy toward the smug new manager.",
      "Her antipathy to crowds made city life difficult.",
      "There was a mutual antipathy between the two rival factions."
    ],
    synonyms: ["aversion", "hostility", "antagonism"],
    day: 3,
    group: 1,
  },
  {
    word: "arcane",
    pos: "adjective",
    arabic: "غامض / سري",
    definition: "Understood by few; mysterious or secret; requiring special knowledge.",
    examples: [
      "The document was full of arcane legal terminology.",
      "He had arcane knowledge of medieval alchemy.",
      "The programmer used arcane commands only experts would recognize."
    ],
    synonyms: ["esoteric", "obscure", "cryptic"],
    day: 3,
    group: 1,
  },
  {
    word: "arduous",
    pos: "adjective",
    arabic: "شاق / مجهد",
    definition: "Involving or requiring strenuous effort; difficult and tiring.",
    examples: [
      "The climb to the summit was arduous and took two full days.",
      "She completed the arduous task of editing the entire manuscript.",
      "Training for a marathon is an arduous but rewarding process."
    ],
    synonyms: ["strenuous", "laborious", "taxing"],
    day: 3,
    group: 1,
  },
  {
    word: "artless",
    pos: "adjective",
    arabic: "بسيط / صادق دون تكلف",
    definition: "Without guile or deception; sincere and natural; lacking art or artifice.",
    examples: [
      "Her artless comments were sometimes more honest than tactful.",
      "The child's artless question delighted the adults.",
      "He had an artless charm that disarmed even his critics."
    ],
    synonyms: ["naive", "guileless", "candid"],
    day: 3,
    group: 1,
  },
  {
    word: "ascetic",
    pos: "adjective/noun",
    arabic: "زاهد / متقشف",
    definition: "Characterized by severe self-discipline and abstention from all indulgence; a person who practices such self-denial.",
    examples: [
      "The ascetic monk owned nothing except a robe and a bowl.",
      "She led an ascetic lifestyle, avoiding alcohol, meat, and luxury.",
      "Ancient philosophers who lived ascetically believed it brought wisdom."
    ],
    synonyms: ["austere", "self-denying", "spartan"],
    day: 3,
    group: 1,
  },
  {
    word: "assuage",
    pos: "verb",
    arabic: "يخفف / يهدئ",
    definition: "To make an unpleasant feeling less intense; to soothe or satisfy.",
    examples: [
      "A cup of tea helped assuage her nerves before the speech.",
      "He tried to assuage her grief with kind words.",
      "The apology did little to assuage the anger of the community."
    ],
    synonyms: ["alleviate", "soothe", "relieve"],
    day: 3,
    group: 1,
  },
  {
    word: "betray",
    pos: "verb",
    arabic: "يخون / يكشف",
    definition: "To be disloyal to; to reveal unintentionally; to expose or hand over treacherously.",
    examples: [
      "He betrayed his friend's trust by sharing private information.",
      "Her voice betrayed the nervousness she tried to hide.",
      "The spy betrayed state secrets to the enemy."
    ],
    synonyms: ["deceive", "reveal", "expose"],
    day: 3,
    group: 1,
  },
  // Day 3 Group 2
  {
    word: "bucolic",
    pos: "adjective",
    arabic: "ريفي / قروي",
    definition: "Relating to the pleasant aspects of the countryside; charmingly rural.",
    examples: [
      "They escaped to a bucolic retreat in the Vermont hills.",
      "The painting depicted a bucolic scene of rolling meadows and grazing sheep.",
      "He longed for the bucolic peace of his childhood village."
    ],
    synonyms: ["pastoral", "rural", "rustic"],
    day: 3,
    group: 2,
  },
  {
    word: "burgeon",
    pos: "verb",
    arabic: "ينمو بسرعة / يتكاثر",
    definition: "To begin to grow or increase rapidly; to flourish.",
    examples: [
      "The startup began to burgeon after securing its first round of funding.",
      "Technology burgeoned throughout the twentieth century.",
      "New restaurants burgeoned in the trendy neighborhood."
    ],
    synonyms: ["flourish", "proliferate", "expand"],
    day: 3,
    group: 2,
  },
  {
    word: "cacophonous",
    pos: "adjective",
    arabic: "صاخب / كريه الصوت",
    definition: "Involving or producing a harsh, discordant mixture of sounds.",
    examples: [
      "The cacophonous noise of the construction site made it hard to concentrate.",
      "The children's instruments produced a cacophonous rehearsal.",
      "The city streets were cacophonous with honking and shouting."
    ],
    synonyms: ["discordant", "jarring", "noisy"],
    day: 3,
    group: 2,
  },
  {
    word: "canonize",
    pos: "verb",
    arabic: "يؤلّه / يُقدّس",
    definition: "To officially declare as a saint; to treat as an unquestionable authority.",
    examples: [
      "She was canonized by the Church for her miraculous healings.",
      "Critics tend to canonize certain authors while ignoring equally deserving ones.",
      "Shakespeare has been canonized as the greatest writer in the English language."
    ],
    synonyms: ["sanctify", "glorify", "exalt"],
    day: 3,
    group: 2,
  },
  {
    word: "censure",
    pos: "noun/verb",
    arabic: "لوم / انتقاد رسمي",
    definition: "Strong or official condemnation; to formally criticize or condemn.",
    examples: [
      "The senator received formal censure for his inappropriate conduct.",
      "The committee censured the researcher for fabricating data.",
      "Public censure forced the company to revise its policies."
    ],
    synonyms: ["condemnation", "rebuke", "reprimand"],
    day: 3,
    group: 2,
  },
  {
    word: "chicanery",
    pos: "noun",
    arabic: "خداع / مكر",
    definition: "The use of trickery to achieve a political, financial, or legal purpose; deception.",
    examples: [
      "The lawyer exposed the chicanery behind the fraudulent contract.",
      "Voters grew frustrated with the chicanery of dishonest officials.",
      "She saw through the chicanery immediately and refused to be fooled."
    ],
    synonyms: ["deception", "trickery", "manipulation"],
    day: 3,
    group: 2,
  },
  {
    word: "coalesce",
    pos: "verb",
    arabic: "يتوحد / يندمج",
    definition: "To come together to form one mass or whole; to merge or combine.",
    examples: [
      "The small rebel groups coalesced into a unified movement.",
      "Diverse ideas coalesced into a single, powerful proposal.",
      "The droplets of water coalesced into a stream."
    ],
    synonyms: ["merge", "unite", "fuse"],
    day: 3,
    group: 2,
  },
  {
    word: "cogent",
    pos: "adjective",
    arabic: "مقنع / قوي المنطق",
    definition: "Clear, logical, and convincing; powerfully persuasive.",
    examples: [
      "She presented a cogent argument that changed the jury's opinion.",
      "The professor's cogent explanation made a complex topic clear.",
      "His cogent analysis of the market trends impressed the investors."
    ],
    synonyms: ["compelling", "persuasive", "convincing"],
    day: 3,
    group: 2,
  },
  {
    word: "compelling",
    pos: "adjective",
    arabic: "جذاب / مقنع / ملح",
    definition: "Evoking interest, attention, or admiration in a powerfully irresistible way.",
    examples: [
      "The documentary offered a compelling look at the lives of refugees.",
      "She made a compelling case for changing the company's strategy.",
      "The novel's plot was so compelling I couldn't put it down."
    ],
    synonyms: ["captivating", "persuasive", "engaging"],
    day: 3,
    group: 2,
  },
  {
    word: "contend",
    pos: "verb",
    arabic: "يتنافس / يتجادل",
    definition: "To assert something as a position in an argument; to struggle with difficulties.",
    examples: [
      "Scientists contend that climate change is primarily human-made.",
      "She had to contend with several obstacles before achieving success.",
      "They contended for the championship title throughout the season."
    ],
    synonyms: ["argue", "maintain", "compete"],
    day: 3,
    group: 2,
  },
  // Day 3 Group 3
  {
    word: "copious",
    pos: "adjective",
    arabic: "وفير / غزير",
    definition: "Abundant in supply or quantity; plentiful.",
    examples: [
      "She took copious notes during the lecture.",
      "The garden was watered with copious rainfall.",
      "His research was supported by copious references and data."
    ],
    synonyms: ["abundant", "plentiful", "profuse"],
    day: 3,
    group: 3,
  },
  {
    word: "cosmopolitan",
    pos: "adjective",
    arabic: "عالمي / متسامح ثقافياً",
    definition: "Familiar with and at ease in many different countries and cultures; sophisticated.",
    examples: [
      "New York is one of the most cosmopolitan cities in the world.",
      "Her cosmopolitan upbringing gave her a respect for diverse cultures.",
      "He had a cosmopolitan taste in music, literature, and food."
    ],
    synonyms: ["worldly", "sophisticated", "multicultural"],
    day: 3,
    group: 3,
  },
  {
    word: "deference",
    pos: "noun",
    arabic: "احترام / امتثال",
    definition: "Humble submission and respect; polite submission to the wishes of another.",
    examples: [
      "In deference to his father's wishes, he pursued a career in medicine.",
      "She showed great deference to the senior members of the board.",
      "Cultural deference to elders is common in many Asian societies."
    ],
    synonyms: ["respect", "compliance", "submission"],
    day: 3,
    group: 3,
  },
  {
    word: "desultory",
    pos: "adjective",
    arabic: "عشوائي / متقطع",
    definition: "Lacking a plan, purpose, or enthusiasm; going from one thing to another without order.",
    examples: [
      "They made desultory conversation at the party, neither truly engaged.",
      "His desultory approach to studying led to poor exam results.",
      "A desultory effort to clean the apartment left it still messy."
    ],
    synonyms: ["haphazard", "aimless", "random"],
    day: 3,
    group: 3,
  },
  {
    word: "diffident",
    pos: "adjective",
    arabic: "خجول / متردد",
    definition: "Modest or shy due to a lack of self-confidence; hesitant.",
    examples: [
      "The diffident student rarely raised his hand in class.",
      "She was diffident about sharing her creative work with others.",
      "His diffident manner made him difficult to interview."
    ],
    synonyms: ["timid", "shy", "reserved"],
    day: 3,
    group: 3,
  },
  {
    word: "dilatory",
    pos: "adjective",
    arabic: "مماطل / مؤخر",
    definition: "Slow to act; intended to cause delay; tending to delay.",
    examples: [
      "The dilatory contractor failed to finish the project on time.",
      "Their dilatory tactics in negotiations frustrated the other party.",
      "She was criticized for her dilatory response to the emergency."
    ],
    synonyms: ["tardy", "procrastinating", "sluggish"],
    day: 3,
    group: 3,
  },
  {
    word: "equivocate",
    pos: "verb",
    arabic: "يتحايل / يتهرب بالغموض",
    definition: "To use ambiguous language so as to conceal the truth or avoid commitment.",
    examples: [
      "The politician equivocated when asked about his tax policies.",
      "Stop equivocating—give us a clear yes or no.",
      "She equivocated so much that no one knew where she stood."
    ],
    synonyms: ["prevaricate", "hedge", "evade"],
    day: 3,
    group: 3,
  },
  {
    word: "polarize",
    pos: "verb",
    arabic: "يُحدث استقطاباً / يُفرّق",
    definition: "To divide or cause to divide into two sharply contrasting groups or sets of opinions.",
    examples: [
      "The controversial law polarized the nation into heated camps.",
      "Social media tends to polarize political discourse.",
      "The debate over immigration polarized the community."
    ],
    synonyms: ["divide", "split", "separate"],
    day: 3,
    group: 3,
  },
  {
    word: "prodigal",
    pos: "adjective",
    arabic: "مبذّر / مسرف",
    definition: "Spending money or resources freely and recklessly; wastefully extravagant.",
    examples: [
      "The prodigal heir spent his fortune within a decade.",
      "She felt guilty about her prodigal spending habits.",
      "The Biblical story of the prodigal son teaches about redemption."
    ],
    synonyms: ["extravagant", "wasteful", "profligate"],
    day: 3,
    group: 3,
  },
  {
    word: "verbose",
    pos: "adjective",
    arabic: "مطوّل / ثرثار في الكتابة",
    definition: "Using or expressed in more words than are needed; wordy.",
    examples: [
      "His verbose report could have been summarized in two pages.",
      "The professor's verbose explanations often confused rather than clarified.",
      "Editors often ask verbose writers to trim their work."
    ],
    synonyms: ["wordy", "long-winded", "loquacious"],
    day: 3,
    group: 3,
  },
  // Day 4 Group 1
  {
    word: "abstain",
    pos: "verb",
    arabic: "يمتنع / يتحاشى",
    definition: "To restrain oneself from doing or enjoying something; to formally decline to vote.",
    examples: [
      "She abstained from alcohol during her pregnancy.",
      "Three members abstained from voting on the motion.",
      "He abstained from social media for a month to improve his focus."
    ],
    synonyms: ["refrain", "forbear", "withhold"],
    day: 4,
    group: 1,
  },
  {
    word: "approbation",
    pos: "noun",
    arabic: "موافقة / استحسان",
    definition: "Approval or praise; an official sanctioning of something.",
    examples: [
      "She worked hard to earn her mentor's approbation.",
      "The plan was submitted for the committee's approbation.",
      "His novel received the approbation of critics worldwide."
    ],
    synonyms: ["approval", "praise", "endorsement"],
    day: 4,
    group: 1,
  },
  {
    word: "cherish",
    pos: "verb",
    arabic: "يُقدّر / يعتزّ",
    definition: "To hold dear; feel or show great affection; protect and care for lovingly.",
    examples: [
      "She cherished the letters her grandmother had sent her.",
      "He cherished the memory of their first meeting.",
      "We must cherish and protect the environment for future generations."
    ],
    synonyms: ["treasure", "value", "adore"],
    day: 4,
    group: 1,
  },
  {
    word: "corroborate",
    pos: "verb",
    arabic: "يؤكد / يعزّز",
    definition: "To confirm or give support to a statement, theory, or finding; to verify.",
    examples: [
      "A second witness corroborated the victim's account of events.",
      "The new evidence corroborated the scientist's hypothesis.",
      "Her story was corroborated by several independent sources."
    ],
    synonyms: ["confirm", "verify", "substantiate"],
    day: 4,
    group: 1,
  },
  {
    word: "disparate",
    pos: "adjective",
    arabic: "متباين / مختلف جداً",
    definition: "Essentially different in kind; not allowing comparison; made up of very different elements.",
    examples: [
      "The study drew from disparate fields such as biology, economics, and philosophy.",
      "The team brought together people with disparate backgrounds.",
      "It's hard to reconcile such disparate views on the same issue."
    ],
    synonyms: ["different", "contrasting", "divergent"],
    day: 4,
    group: 1,
  },
  {
    word: "emulate",
    pos: "verb",
    arabic: "يحاكي / يتنافس",
    definition: "To match or surpass a person or achievement, typically by imitation; to copy.",
    examples: [
      "She tried to emulate the calm confidence of her mentor.",
      "Young athletes often emulate the style of their sports heroes.",
      "Companies emulate Apple's product design without capturing its magic."
    ],
    synonyms: ["imitate", "replicate", "mimic"],
    day: 4,
    group: 1,
  },
  {
    word: "enervate",
    pos: "verb",
    arabic: "يُضعف / يُنهك",
    definition: "To make someone feel drained of energy or vitality; to weaken.",
    examples: [
      "The long hike in the heat enervated the entire group.",
      "Chronic stress can enervate both body and mind.",
      "The speech was so dull it enervated even the most enthusiastic audience members."
    ],
    synonyms: ["exhaust", "debilitate", "sap"],
    day: 4,
    group: 1,
  },
  {
    word: "ephemeral",
    pos: "adjective",
    arabic: "عابر / زائل",
    definition: "Lasting for a very short time; transitory.",
    examples: [
      "Fame can be ephemeral, here one day and forgotten the next.",
      "Mayflies are ephemeral, living for only a single day.",
      "She captured the ephemeral beauty of the morning mist in her photograph."
    ],
    synonyms: ["transient", "fleeting", "momentary"],
    day: 4,
    group: 1,
  },
  {
    word: "fervid",
    pos: "adjective",
    arabic: "متحمس بشدة / متوهج",
    definition: "Intensely enthusiastic or passionate; ardent.",
    examples: [
      "His fervid speech stirred the crowd to action.",
      "She had a fervid devotion to her work that inspired others.",
      "The activist's fervid belief in justice drove her campaigns."
    ],
    synonyms: ["ardent", "fervent", "passionate"],
    day: 4,
    group: 1,
  },
  {
    word: "garrulous",
    pos: "adjective",
    arabic: "ثرثار / كثير الكلام",
    definition: "Excessively talkative, especially on trivial matters.",
    examples: [
      "The garrulous neighbor kept her talking for over an hour.",
      "He was a garrulous man who would chat with anyone who listened.",
      "Her garrulous nature made long silences impossible."
    ],
    synonyms: ["talkative", "loquacious", "verbose"],
    day: 4,
    group: 1,
  },
  // Day 4 Group 2
  {
    word: "incendiary",
    pos: "adjective/noun",
    arabic: "مثير للفتنة / محرّض",
    definition: "Tending to stir up conflict; relating to the deliberate starting of fires.",
    examples: [
      "The politician's incendiary remarks sparked nationwide protests.",
      "Incendiary devices were found near the storage facility.",
      "His incendiary editorial divided the community deeply."
    ],
    synonyms: ["inflammatory", "provocative", "rabble-rousing"],
    day: 4,
    group: 2,
  },
  {
    word: "inimical",
    pos: "adjective",
    arabic: "معادٍ / ضار",
    definition: "Tending to obstruct or harm; unfriendly; hostile.",
    examples: [
      "Smoking is inimical to good health.",
      "The policy was inimical to the interests of small businesses.",
      "An environment inimical to creativity stifles innovation."
    ],
    synonyms: ["hostile", "harmful", "adverse"],
    day: 4,
    group: 2,
  },
  {
    word: "intimate",
    pos: "verb",
    arabic: "يلمّح / يُشير بخفاء",
    definition: "To imply or hint something; to make known indirectly.",
    examples: [
      "She intimated that she might resign if conditions didn't improve.",
      "The report intimated that financial mismanagement had occurred.",
      "He intimated his displeasure with a subtle gesture."
    ],
    synonyms: ["imply", "hint", "suggest"],
    day: 4,
    group: 2,
  },
  {
    word: "invigorate",
    pos: "verb",
    arabic: "يُنشّط / يبعث الحيوية",
    definition: "To give strength or energy to; to stimulate or animate.",
    examples: [
      "A cold shower in the morning invigorates the body and mind.",
      "The new coach's energy invigorated the struggling team.",
      "A brisk walk in the fresh air can invigorate you on a slow day."
    ],
    synonyms: ["energize", "stimulate", "revitalize"],
    day: 4,
    group: 2,
  },
  {
    word: "mitigate",
    pos: "verb",
    arabic: "يخفف / يقلل من حدة",
    definition: "To make less severe, serious, or painful; to lessen the impact of something.",
    examples: [
      "The new laws were designed to mitigate the effects of pollution.",
      "She tried to mitigate the damage caused by the miscommunication.",
      "Regular exercise can mitigate the risk of heart disease."
    ],
    synonyms: ["alleviate", "reduce", "diminish"],
    day: 4,
    group: 2,
  },
  {
    word: "obsolete",
    pos: "adjective",
    arabic: "عفا عليه الزمن / متقادم",
    definition: "No longer produced or used; out of date; no longer relevant.",
    examples: [
      "Typewriters are now largely obsolete in the digital age.",
      "Many skills become obsolete as technology evolves.",
      "The old software became obsolete when the new system was installed."
    ],
    synonyms: ["outdated", "antiquated", "archaic"],
    day: 4,
    group: 2,
  },
  {
    word: "opaque",
    pos: "adjective",
    arabic: "معتم / غامض",
    definition: "Not able to be seen through; not transparent; hard to understand.",
    examples: [
      "The frosted glass was opaque, preventing anyone from seeing inside.",
      "The contract's language was deliberately opaque and confusing.",
      "Her motives remained opaque to those around her."
    ],
    synonyms: ["obscure", "unclear", "impenetrable"],
    day: 4,
    group: 2,
  },
  {
    word: "paradigmatic",
    pos: "adjective",
    arabic: "نموذجي / مثالي",
    definition: "Serving as a typical example or pattern of something; serving as a model.",
    examples: [
      "The case became paradigmatic for how to handle workplace discrimination.",
      "Darwin's work is paradigmatic for the field of evolutionary biology.",
      "This experiment is paradigmatic of the entire research program."
    ],
    synonyms: ["archetypal", "representative", "exemplary"],
    day: 4,
    group: 2,
  },
  {
    word: "pedantic",
    pos: "adjective",
    arabic: "متعجرف بالتفاصيل / متحذلق",
    definition: "Overly concerned with minor details or rules; excessively scholarly.",
    examples: [
      "His pedantic corrections of small grammar errors annoyed everyone.",
      "The professor was pedantic about citation formats.",
      "She gave a pedantic lecture on the exact meaning of obscure terms."
    ],
    synonyms: ["fussy", "nit-picking", "didactic"],
    day: 4,
    group: 2,
  },
  {
    word: "placid",
    pos: "adjective",
    arabic: "هادئ / رزين",
    definition: "Not easily upset or excited; calm and peaceful.",
    examples: [
      "The placid lake reflected the mountains perfectly.",
      "She had a placid temperament that never seemed to be disturbed.",
      "The dog's placid nature made him perfect for families with children."
    ],
    synonyms: ["calm", "tranquil", "serene"],
    day: 4,
    group: 2,
  },
  // Day 4 Group 3
  {
    word: "polemical",
    pos: "adjective",
    arabic: "جدلي / خلافي",
    definition: "Of or involving strongly critical or disputatious writing or speech.",
    examples: [
      "The essay was highly polemical, attacking the opposition's core arguments.",
      "His polemical style earned him both admirers and enemies.",
      "The pamphlet was a polemical attack on the government's policies."
    ],
    synonyms: ["controversial", "contentious", "argumentative"],
    day: 4,
    group: 3,
  },
  {
    word: "precipitate",
    pos: "verb/adjective",
    arabic: "يُسرّع / متهور",
    definition: "To cause something to happen suddenly or prematurely; done suddenly and rashly.",
    examples: [
      "The assassination precipitated the outbreak of war.",
      "She made a precipitate decision without thinking through the consequences.",
      "The news precipitated a dramatic fall in the stock market."
    ],
    synonyms: ["hasten", "trigger", "rash"],
    day: 4,
    group: 3,
  },
  {
    word: "profundity",
    pos: "noun",
    arabic: "عمق / حكمة",
    definition: "Great depth of insight or knowledge; intellectual depth.",
    examples: [
      "The philosopher's writings are known for their profundity.",
      "The profundity of his grief was evident in his every action.",
      "Her simple words carried surprising profundity."
    ],
    synonyms: ["depth", "wisdom", "insight"],
    day: 4,
    group: 3,
  },
  {
    word: "prophetic",
    pos: "adjective",
    arabic: "نبوئي / تنبؤي",
    definition: "Accurately predicting the future; having or showing the quality of a prophet.",
    examples: [
      "His prophetic warning about the financial crisis went unheeded.",
      "In retrospect, her words were remarkably prophetic.",
      "The novel's prophetic vision of technology unsettled early readers."
    ],
    synonyms: ["prescient", "visionary", "predictive"],
    day: 4,
    group: 3,
  },
  {
    word: "prudent",
    pos: "adjective",
    arabic: "حكيم / متبصّر",
    definition: "Acting with or showing care and thought for the future; wise and cautious.",
    examples: [
      "It would be prudent to save some money for emergencies.",
      "The prudent investor diversified her portfolio.",
      "A prudent leader consults all stakeholders before making decisions."
    ],
    synonyms: ["wise", "sensible", "judicious"],
    day: 4,
    group: 3,
  },
  {
    word: "punctilious",
    pos: "adjective",
    arabic: "دقيق جداً / حريص على التفاصيل",
    definition: "Showing great attention to detail or correct behavior; very careful about etiquette.",
    examples: [
      "She was punctilious about every aspect of the ceremony.",
      "His punctilious approach to grammar made him an excellent editor.",
      "The diplomat was punctilious in observing proper protocol."
    ],
    synonyms: ["meticulous", "scrupulous", "precise"],
    day: 4,
    group: 3,
  },
  {
    word: "recondite",
    pos: "adjective",
    arabic: "غامض / غير معروف",
    definition: "Not known by many people; abstruse; obscure.",
    examples: [
      "His lecture on recondite topics attracted only specialists.",
      "The text was filled with recondite references unfamiliar to most readers.",
      "She had a recondite knowledge of medieval astronomy."
    ],
    synonyms: ["obscure", "esoteric", "arcane"],
    day: 4,
    group: 3,
  },
  {
    word: "scrupulous",
    pos: "adjective",
    arabic: "دقيق / ذو ضمير",
    definition: "Diligent, thorough, and extremely attentive to details; having strong ethical standards.",
    examples: [
      "The auditor was scrupulous in reviewing every line of the financial records.",
      "She was scrupulous in her effort to give credit where it was due.",
      "A scrupulous researcher verifies every source before citing it."
    ],
    synonyms: ["meticulous", "conscientious", "thorough"],
    day: 4,
    group: 3,
  },
  {
    word: "tranquil",
    pos: "adjective",
    arabic: "هادئ / ساكن",
    definition: "Free from disturbance; calm and peaceful.",
    examples: [
      "They enjoyed a tranquil evening by the lake.",
      "The garden offered a tranquil escape from the noisy city.",
      "She found the monk's tranquil presence deeply reassuring."
    ],
    synonyms: ["serene", "peaceful", "calm"],
    day: 4,
    group: 3,
  },
  {
    word: "vacillate",
    pos: "verb",
    arabic: "يتردد / يتذبذب",
    definition: "To waver between different opinions or actions; to be indecisive.",
    examples: [
      "He vacillated between accepting and rejecting the offer for weeks.",
      "The committee vacillated on the budget proposal.",
      "She vacillated over which career path to pursue."
    ],
    synonyms: ["hesitate", "waver", "fluctuate"],
    day: 4,
    group: 3,
  },
  // Day 5 Group 1
  {
    word: "aloof",
    pos: "adjective",
    arabic: "بعيد / منعزل",
    definition: "Not friendly or forthcoming; cool and distant; conspicuously uninvolved.",
    examples: [
      "He remained aloof at the party, speaking to no one.",
      "Her aloof demeanor made it hard for others to approach her.",
      "The manager was aloof, rarely engaging with his team personally."
    ],
    synonyms: ["detached", "distant", "reserved"],
    day: 5,
    group: 1,
  },
  {
    word: "clangor",
    pos: "noun",
    arabic: "ضجيج / رنين معدني صاخب",
    definition: "A continuous loud banging or ringing sound; a harsh, discordant noise.",
    examples: [
      "The clangor of the factory machines was deafening.",
      "Church bells filled the air with a festive clangor.",
      "The battle produced a clangor of steel on steel."
    ],
    synonyms: ["din", "clamor", "racket"],
    day: 5,
    group: 1,
  },
  {
    word: "conventional",
    pos: "adjective",
    arabic: "تقليدي / اعتيادي",
    definition: "Based on or in accordance with what is generally done or believed; traditional.",
    examples: [
      "She chose a conventional career path in law.",
      "The conventional view is that exercise prevents illness.",
      "His conventional taste in music made him resistant to new genres."
    ],
    synonyms: ["traditional", "orthodox", "standard"],
    day: 5,
    group: 1,
  },
  {
    word: "debunk",
    pos: "verb",
    arabic: "يفضح / يدحض",
    definition: "To expose the falseness or hollowness of a myth, idea, or belief.",
    examples: [
      "The documentary debunked popular myths about nutrition.",
      "Scientists worked to debunk the conspiracy theory with evidence.",
      "She debunked his claim with a simple reference to the facts."
    ],
    synonyms: ["expose", "disprove", "refute"],
    day: 5,
    group: 1,
  },
  {
    word: "diminutive",
    pos: "adjective",
    arabic: "صغير جداً / ضئيل",
    definition: "Extremely or unusually small; tiny.",
    examples: [
      "The diminutive child stood out among the tall adults.",
      "The office was so diminutive you could barely turn around.",
      "She wore a diminutive brooch on her lapel."
    ],
    synonyms: ["tiny", "miniature", "petite"],
    day: 5,
    group: 1,
  },
  {
    word: "discernible",
    pos: "adjective",
    arabic: "ملحوظ / قابل للتمييز",
    definition: "Able to be discerned; perceptible to the eye or mind.",
    examples: [
      "There was no discernible difference between the two products.",
      "A discernible improvement in air quality was noted after the regulations.",
      "The tension in the room was discernible even to a casual observer."
    ],
    synonyms: ["noticeable", "detectable", "perceptible"],
    day: 5,
    group: 1,
  },
  {
    word: "enigmatic",
    pos: "adjective",
    arabic: "غامض / لغزي",
    definition: "Difficult to interpret or understand; mysterious.",
    examples: [
      "The Mona Lisa's enigmatic smile has fascinated viewers for centuries.",
      "Her enigmatic response left everyone puzzled.",
      "He had an enigmatic personality that made him hard to read."
    ],
    synonyms: ["mysterious", "cryptic", "inscrutable"],
    day: 5,
    group: 1,
  },
  {
    word: "estranged",
    pos: "adjective",
    arabic: "منفصل / مغترب",
    definition: "No longer close or affectionate to someone; alienated.",
    examples: [
      "He was estranged from his family for over a decade.",
      "The estranged siblings reconnected at their mother's funeral.",
      "She felt estranged from a society that did not understand her."
    ],
    synonyms: ["alienated", "separated", "distant"],
    day: 5,
    group: 1,
  },
  {
    word: "extravagant",
    pos: "adjective",
    arabic: "مسرف / مبالغ فيه",
    definition: "Lacking restraint in spending money or use of resources; exceeding what is reasonable.",
    examples: [
      "Her extravagant wedding cost more than most people's annual income.",
      "He made extravagant claims about the product's performance.",
      "An extravagant lifestyle brought him to the edge of bankruptcy."
    ],
    synonyms: ["lavish", "excessive", "prodigal"],
    day: 5,
    group: 1,
  },
  {
    word: "fanciful",
    pos: "adjective",
    arabic: "خيالي / بعيد عن الواقع",
    definition: "Over-imaginative and unrealistic; existing only in fancy or imagination.",
    examples: [
      "Her fanciful dream of becoming an astronaut was dismissed by her teachers.",
      "The fanciful tale captured the imagination of children everywhere.",
      "He had a fanciful idea of living off the land with no preparation."
    ],
    synonyms: ["whimsical", "imaginative", "fantastical"],
    day: 5,
    group: 1,
  },
  // Day 5 Group 2
  {
    word: "frivolous",
    pos: "adjective",
    arabic: "تافه / طائش",
    definition: "Not having any serious purpose or value; lacking sense or substance.",
    examples: [
      "He wasted money on frivolous gadgets he never used.",
      "The court dismissed the lawsuit as frivolous.",
      "She avoided frivolous gossip and focused on meaningful conversation."
    ],
    synonyms: ["trivial", "superficial", "flippant"],
    day: 5,
    group: 2,
  },
  {
    word: "heterogeneous",
    pos: "adjective",
    arabic: "غير متجانس / متنوع",
    definition: "Diverse in character or content; made up of differing kinds.",
    examples: [
      "The city attracted a heterogeneous population from around the world.",
      "A heterogeneous mixture contains substances that are visibly different.",
      "The team was heterogeneous, combining experts from many disciplines."
    ],
    synonyms: ["diverse", "varied", "mixed"],
    day: 5,
    group: 2,
  },
  {
    word: "imperious",
    pos: "adjective",
    arabic: "متسلط / استبدادي",
    definition: "Assuming power or authority without justification; arrogant and domineering.",
    examples: [
      "Her imperious tone made others reluctant to challenge her decisions.",
      "The imperious boss expected instant obedience from his staff.",
      "He waved an imperious hand to silence the room."
    ],
    synonyms: ["domineering", "overbearing", "authoritarian"],
    day: 5,
    group: 2,
  },
  {
    word: "impertinent",
    pos: "adjective",
    arabic: "وقح / غير لائق",
    definition: "Not showing proper respect; rude; not relevant or applicable.",
    examples: [
      "The student made an impertinent remark that offended the teacher.",
      "His impertinent question was ignored by the senator.",
      "It would be impertinent to pry into their private affairs."
    ],
    synonyms: ["rude", "insolent", "irrelevant"],
    day: 5,
    group: 2,
  },
  {
    word: "invasive",
    pos: "adjective",
    arabic: "غازٍ / متعدٍ",
    definition: "Tending to spread prolifically and causing harm; intruding on privacy or boundaries.",
    examples: [
      "Kudzu is an invasive species that threatens native plants in the South.",
      "The invasive medical procedure carries certain risks.",
      "He found the journalist's invasive questioning inappropriate."
    ],
    synonyms: ["intrusive", "encroaching", "aggressive"],
    day: 5,
    group: 2,
  },
  {
    word: "irresolute",
    pos: "adjective",
    arabic: "متردد / حائر",
    definition: "Showing or feeling hesitancy; uncertain how to act; undecided.",
    examples: [
      "An irresolute leader loses the confidence of those he leads.",
      "She stood irresolute at the crossroads, unable to choose a direction.",
      "His irresolute behavior during the crisis cost the company dearly."
    ],
    synonyms: ["indecisive", "wavering", "hesitant"],
    day: 5,
    group: 2,
  },
  {
    word: "laudable",
    pos: "adjective",
    arabic: "جدير بالإطراء / محمود",
    definition: "Deserving praise and commendation; praiseworthy.",
    examples: [
      "Her laudable commitment to education inspired those around her.",
      "The company's laudable efforts to reduce waste earned public praise.",
      "His laudable courage during the disaster saved many lives."
    ],
    synonyms: ["commendable", "praiseworthy", "admirable"],
    day: 5,
    group: 2,
  },
  {
    word: "lax",
    pos: "adjective",
    arabic: "متهاون / غير متشدد",
    definition: "Not sufficiently strict, severe, or careful; slack.",
    examples: [
      "The lax security at the venue made everyone vulnerable.",
      "His lax attitude toward deadlines frustrated his team.",
      "Lax enforcement of the rules allowed violations to go unchecked."
    ],
    synonyms: ["lenient", "slack", "permissive"],
    day: 5,
    group: 2,
  },
  {
    word: "marginalize",
    pos: "verb",
    arabic: "يُهمّش / يُقصي",
    definition: "To treat a person or group as insignificant or peripheral; to push to the margins.",
    examples: [
      "Women in some societies are systematically marginalized in the workplace.",
      "The dominant culture often marginalizes minority voices.",
      "His unconventional views caused him to be marginalized by peers."
    ],
    synonyms: ["sideline", "exclude", "disenfranchise"],
    day: 5,
    group: 2,
  },
  {
    word: "panache",
    pos: "noun",
    arabic: "جرأة وتألق / أناقة",
    definition: "Flamboyant confidence of style or manner; flair.",
    examples: [
      "She performed with panache, dazzling the audience.",
      "He dressed with panache, always drawing admiring looks.",
      "The chef prepared each dish with the panache of an artist."
    ],
    synonyms: ["flair", "style", "élan"],
    day: 5,
    group: 2,
  },
  // Day 5 Group 3
  {
    word: "plodding",
    pos: "adjective",
    arabic: "بطيء / جاد بدون إلهام",
    definition: "Slow-moving and unexciting; tediously hardworking but lacking creativity.",
    examples: [
      "His plodding pace in completing the assignment frustrated the manager.",
      "The film was plodding, dragging on without energy or spark.",
      "A plodding student may still succeed through sheer determination."
    ],
    synonyms: ["slow", "laborious", "tedious"],
    day: 5,
    group: 3,
  },
  {
    word: "prosaic",
    pos: "adjective",
    arabic: "عادي / نثري",
    definition: "Having or using the style of prose as distinct from poetry; lacking imagination; dull.",
    examples: [
      "The prosaic description of the landscape failed to capture its beauty.",
      "He gave a prosaic account of his travels, leaving out all the exciting details.",
      "Her prose was deliberately prosaic to contrast with the poetic subject matter."
    ],
    synonyms: ["dull", "mundane", "unimaginative"],
    day: 5,
    group: 3,
  },
  {
    word: "remedial",
    pos: "adjective",
    arabic: "علاجي / تصحيحي",
    definition: "Intended as a remedy or cure; providing or intended to provide a remedy for a difficulty.",
    examples: [
      "Students who struggled were offered remedial tutoring sessions.",
      "The company took remedial action to address safety violations.",
      "Remedial reading classes helped the students catch up to grade level."
    ],
    synonyms: ["corrective", "restorative", "therapeutic"],
    day: 5,
    group: 3,
  },
  {
    word: "restive",
    pos: "adjective",
    arabic: "قلق / عصي",
    definition: "Unable to keep still or silent; restless; resistant to control.",
    examples: [
      "The restive crowd grew impatient as the delay stretched into hours.",
      "The restive horse refused to be saddled.",
      "Citizens grew restive under years of authoritarian rule."
    ],
    synonyms: ["restless", "agitated", "unruly"],
    day: 5,
    group: 3,
  },
  {
    word: "sporadic",
    pos: "adjective",
    arabic: "متقطع / متفرق",
    definition: "Occurring at irregular intervals or only in a few places; scattered or isolated.",
    examples: [
      "Sporadic gunfire was heard throughout the night.",
      "Her attendance at meetings was sporadic and unpredictable.",
      "There were sporadic reports of flooding across the region."
    ],
    synonyms: ["intermittent", "irregular", "occasional"],
    day: 5,
    group: 3,
  },
  {
    word: "stigmatize",
    pos: "verb",
    arabic: "يُوصم / يُلصق به وصمة",
    definition: "To describe or regard as worthy of disgrace or disapproval; to mark with stigma.",
    examples: [
      "Mental illness is often stigmatized in society.",
      "The media's coverage stigmatized an entire community unfairly.",
      "She fought to ensure that poverty was not stigmatized but addressed."
    ],
    synonyms: ["brand", "label", "condemn"],
    day: 5,
    group: 3,
  },
  {
    word: "undermine",
    pos: "verb",
    arabic: "يُقوّض / يُضعف",
    definition: "To erode the base or foundation of; to weaken or damage secretly.",
    examples: [
      "Constant criticism can undermine a person's confidence.",
      "The scandal undermined public trust in the institution.",
      "The rival faction worked to undermine the leader's authority."
    ],
    synonyms: ["weaken", "subvert", "sabotage"],
    day: 5,
    group: 3,
  },
  {
    word: "utterly",
    pos: "adverb",
    arabic: "تماماً / كلياً",
    definition: "Completely and without qualification; absolutely.",
    examples: [
      "The plan utterly failed to achieve its goals.",
      "She was utterly exhausted after the marathon.",
      "The news came as an utterly shocking surprise."
    ],
    synonyms: ["completely", "absolutely", "entirely"],
    day: 5,
    group: 3,
  },
  {
    word: "weary",
    pos: "adjective",
    arabic: "متعب / مرهق",
    definition: "Feeling or showing tiredness, especially as a result of excessive exertion or tedium.",
    examples: [
      "She was weary after working three consecutive overnight shifts.",
      "His eyes were weary with sorrow and stress.",
      "The weary traveler finally arrived home after a long journey."
    ],
    synonyms: ["exhausted", "fatigued", "worn-out"],
    day: 5,
    group: 3,
  },
  {
    word: "zealous",
    pos: "adjective",
    arabic: "متحمس بشدة / غيور",
    definition: "Having or showing great energy or enthusiasm in pursuit of a cause or objective.",
    examples: [
      "The zealous activist never missed a protest.",
      "She was a zealous student who read beyond the assigned curriculum.",
      "His zealous devotion to the cause inspired others to join."
    ],
    synonyms: ["fervent", "passionate", "enthusiastic"],
    day: 5,
    group: 3,
  },
];

export function buildWords(): Word[] {
  return RAW_WORDS.map((w, i) => {
    const rootData = WORD_ROOTS[w.word] ?? {};
    return {
      ...w,
      id: `word-${i}`,
      difficulty: 0,
      lastReviewed: null,
      nextReview: null,
      status: "new" as const,
      interval: 0,
      easeFactor: 2.5,
      repetitions: 0,
      correctCount: 0,
      incorrectCount: 0,
      qualityHistory: [],
      root: rootData.root,
      wordFamily: rootData.wordFamily,
    };
  });
}

export const TOTAL_DAYS = 5;
export const WORDS_PER_DAY = 30;
export const GROUPS_PER_DAY = 3;
export const WORDS_PER_GROUP = 10;
