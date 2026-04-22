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

  // Day 6 Group 1
  { word: "admonish", pos: "verb", arabic: "يوبخ / ينصح",
    definition: "To warn or reprimand someone firmly.",
    examples: [
      "The teacher admonished the students for talking during the exam.",
      "Her father admonished her to drive carefully on the icy roads.",
      "He was admonished by the judge for his disrespectful behavior."
    ],
    synonyms: ["reprimand", "rebuke", "chide"], day: 6, group: 1 },
  { word: "aesthetic", pos: "adjective", arabic: "جمالي / فني",
    definition: "Concerned with beauty or the appreciation of beauty.",
    examples: [
      "The building's aesthetic appeal drew tourists from all over the world.",
      "She made aesthetic choices that gave the room a calming feel.",
      "His designs balance functional needs with aesthetic beauty."
    ],
    synonyms: ["artistic", "tasteful", "decorative"], day: 6, group: 1 },
  { word: "affectation", pos: "noun", arabic: "تكلف / تصنّع",
    definition: "Behavior, speech, or writing that is artificial and designed to impress.",
    examples: [
      "His British accent was a mere affectation, since he grew up in Ohio.",
      "She spoke without any affectation, which made her seem refreshingly honest.",
      "The poet criticized the affectation of his rivals' overwrought style."
    ],
    synonyms: ["pretension", "artificiality", "pose"], day: 6, group: 1 },
  { word: "alleviate", pos: "verb", arabic: "يخفف",
    definition: "To make a problem, suffering, or distress less severe.",
    examples: [
      "The new medication helped alleviate her chronic back pain.",
      "Charity efforts can alleviate but rarely eliminate poverty.",
      "A short walk often alleviates the stress of a long day."
    ],
    synonyms: ["ease", "mitigate", "lessen"], day: 6, group: 1 },
  { word: "analogous", pos: "adjective", arabic: "مماثل / مناظر",
    definition: "Comparable in certain respects, typically in a way that makes clearer the nature of the things compared.",
    examples: [
      "The structure of the heart is analogous to a mechanical pump.",
      "Her situation is analogous to mine, though the outcomes differed.",
      "Critics drew analogous comparisons between the two political crises."
    ],
    synonyms: ["similar", "comparable", "parallel"], day: 6, group: 1 },
  { word: "bolster", pos: "verb", arabic: "يدعم / يعزز",
    definition: "To support, strengthen, or reinforce something.",
    examples: [
      "The new evidence bolstered the prosecutor's case against the defendant.",
      "She tried to bolster his confidence before the big interview.",
      "Government spending was used to bolster the struggling economy."
    ],
    synonyms: ["strengthen", "reinforce", "buttress"], day: 6, group: 1 },
  { word: "chauvinistic", pos: "adjective", arabic: "متعصب / متحيز",
    definition: "Showing aggressive or biased support for one's own group, gender, or country.",
    examples: [
      "His chauvinistic remarks about women angered the entire audience.",
      "The film criticized the chauvinistic attitudes of the era.",
      "She refused to work with his chauvinistic management style."
    ],
    synonyms: ["bigoted", "prejudiced", "jingoistic"], day: 6, group: 1 },
  { word: "connoisseur", pos: "noun", arabic: "خبير / ذواقة",
    definition: "An expert judge in matters of taste, especially in fine arts or food and drink.",
    examples: [
      "As a wine connoisseur, he could identify the vintage from a single sip.",
      "Art connoisseurs gathered to view the newly discovered painting.",
      "She is a connoisseur of classical music with a vast record collection."
    ],
    synonyms: ["expert", "aficionado", "authority"], day: 6, group: 1 },
  { word: "dissemble", pos: "verb", arabic: "يخفي حقيقة شعوره",
    definition: "To conceal one's true motives, feelings, or beliefs.",
    examples: [
      "He tried to dissemble his disappointment when he didn't get the promotion.",
      "Politicians often dissemble when asked uncomfortable questions.",
      "She could not dissemble her shock at the unexpected news."
    ],
    synonyms: ["disguise", "feign", "mask"], day: 6, group: 1 },
  { word: "dogged", pos: "adjective", arabic: "عنيد / مثابر",
    definition: "Showing tenacity and grim persistence.",
    examples: [
      "Her dogged determination eventually led her to win the championship.",
      "The detective's dogged pursuit of the truth solved the cold case.",
      "Despite repeated failures, his dogged efforts finally paid off."
    ],
    synonyms: ["tenacious", "persistent", "resolute"], day: 6, group: 1 },

  // Day 6 Group 2
  { word: "dupe", pos: "verb", arabic: "يخدع / يحتال",
    definition: "To deceive or trick someone.",
    examples: [
      "The investors were duped into buying worthless stock.",
      "He was duped by an elaborate online scam.",
      "She refused to be duped by his charming but empty promises."
    ],
    synonyms: ["deceive", "trick", "hoodwink"], day: 6, group: 2 },
  { word: "empirical", pos: "adjective", arabic: "تجريبي / قائم على الملاحظة",
    definition: "Based on observation or experience rather than theory or pure logic.",
    examples: [
      "Scientists rely on empirical evidence to support their conclusions.",
      "The study provided empirical proof of the drug's effectiveness.",
      "His claims lacked any empirical basis whatsoever."
    ],
    synonyms: ["observational", "experimental", "factual"], day: 6, group: 2 },
  { word: "engender", pos: "verb", arabic: "يسبب / يولّد",
    definition: "To cause or give rise to a feeling, situation, or condition.",
    examples: [
      "The new policy engendered widespread resentment among employees.",
      "Trust between leaders can engender lasting peace.",
      "His comments engendered a heated debate that lasted for hours."
    ],
    synonyms: ["cause", "generate", "produce"], day: 6, group: 2 },
  { word: "entitled", pos: "adjective", arabic: "متعجرف بحقوقه",
    definition: "Believing oneself to be inherently deserving of privileges or special treatment.",
    examples: [
      "His entitled attitude made him unpopular with his coworkers.",
      "She grew up wealthy but never seemed entitled.",
      "The entitled customer demanded a refund without a receipt."
    ],
    synonyms: ["privileged", "presumptuous", "arrogant"], day: 6, group: 2 },
  { word: "pertinacious", pos: "adjective", arabic: "متمسك بعناد",
    definition: "Holding firmly to an opinion or course of action; stubborn.",
    examples: [
      "Her pertinacious refusal to change her mind frustrated the committee.",
      "He was pertinacious in his pursuit of the truth.",
      "The pertinacious salesman would not take no for an answer."
    ],
    synonyms: ["stubborn", "tenacious", "obstinate"], day: 6, group: 2 },
  { word: "presumptuous", pos: "adjective", arabic: "متجاوز للحدود",
    definition: "Failing to observe the limits of what is permitted or appropriate; overly bold.",
    examples: [
      "It was presumptuous of him to invite himself to the party.",
      "Don't be presumptuous and assume you know what I want.",
      "Her presumptuous behavior offended the host."
    ],
    synonyms: ["arrogant", "bold", "overconfident"], day: 6, group: 2 },
  { word: "probity", pos: "noun", arabic: "نزاهة / استقامة",
    definition: "The quality of having strong moral principles; honesty and decency.",
    examples: [
      "The judge was known for her unwavering probity.",
      "His financial probity made him a trusted treasurer.",
      "Public officials are expected to act with probity at all times."
    ],
    synonyms: ["integrity", "honesty", "rectitude"], day: 6, group: 2 },
  { word: "proliferate", pos: "verb", arabic: "يتكاثر / ينتشر بسرعة",
    definition: "To increase rapidly in number or amount.",
    examples: [
      "Fake news stories proliferated on social media during the election.",
      "Cells proliferate quickly when conditions are favorable.",
      "Cafés and boutiques have proliferated in this once-quiet neighborhood."
    ],
    synonyms: ["multiply", "spread", "burgeon"], day: 6, group: 2 },
  { word: "specious", pos: "adjective", arabic: "خادع ظاهرياً",
    definition: "Superficially plausible but actually wrong or misleading.",
    examples: [
      "His specious arguments couldn't withstand serious scrutiny.",
      "The salesperson made specious claims about the product's benefits.",
      "Her reasoning sounded convincing but was ultimately specious."
    ],
    synonyms: ["misleading", "deceptive", "fallacious"], day: 6, group: 2 },
  { word: "spurious", pos: "adjective", arabic: "زائف / مزور",
    definition: "Not being what it purports to be; false or fake.",
    examples: [
      "The painting was revealed to be a spurious copy of the original.",
      "His spurious credentials fooled the hiring committee for months.",
      "She dismissed the spurious rumors about her resignation."
    ],
    synonyms: ["false", "counterfeit", "bogus"], day: 6, group: 2 },

  // Day 6 Group 3
  { word: "subjective", pos: "adjective", arabic: "ذاتي / شخصي",
    definition: "Based on personal opinions, feelings, or interpretations rather than facts.",
    examples: [
      "Beauty is largely a subjective matter of personal taste.",
      "His subjective view of the events differed from witnesses' accounts.",
      "Grading essays inevitably involves a degree of subjective judgment."
    ],
    synonyms: ["personal", "individual", "biased"], day: 6, group: 3 },
  { word: "subvert", pos: "verb", arabic: "يقوّض / يهدم",
    definition: "To undermine the power and authority of an established system or institution.",
    examples: [
      "The rebels sought to subvert the government through propaganda.",
      "The novel subverts traditional ideas of heroism.",
      "Hackers attempted to subvert the security of the network."
    ],
    synonyms: ["undermine", "destabilize", "topple"], day: 6, group: 3 },
  { word: "timorous", pos: "adjective", arabic: "خجول / جبان",
    definition: "Showing or suffering from nervousness, fear, or a lack of confidence.",
    examples: [
      "Her timorous voice barely carried across the room.",
      "He gave a timorous knock on the principal's door.",
      "The timorous deer fled at the slightest sound."
    ],
    synonyms: ["fearful", "timid", "apprehensive"], day: 6, group: 3 },
  { word: "tortuous", pos: "adjective", arabic: "متعرج / معقد",
    definition: "Full of twists and turns; excessively lengthy and complex.",
    examples: [
      "The tortuous mountain road tested even experienced drivers.",
      "His tortuous explanation only confused the audience further.",
      "The legal process can be slow and tortuous."
    ],
    synonyms: ["winding", "convoluted", "circuitous"], day: 6, group: 3 },
  { word: "tractable", pos: "adjective", arabic: "سهل القيادة / طيّع",
    definition: "Easy to control or influence; easily managed.",
    examples: [
      "The new puppy proved more tractable than her older brother.",
      "Most of the issues turned out to be tractable with patience.",
      "She preferred working with tractable students who followed instructions."
    ],
    synonyms: ["manageable", "compliant", "docile"], day: 6, group: 3 },
  { word: "transient", pos: "adjective", arabic: "عابر / مؤقت",
    definition: "Lasting only for a short time; temporary.",
    examples: [
      "Fame can be a transient and unreliable reward.",
      "The hotel mostly hosts transient guests passing through the city.",
      "His happiness proved to be transient, fading within days."
    ],
    synonyms: ["temporary", "fleeting", "ephemeral"], day: 6, group: 3 },
  { word: "ubiquitous", pos: "adjective", arabic: "موجود في كل مكان",
    definition: "Present, appearing, or found everywhere.",
    examples: [
      "Smartphones have become ubiquitous in modern society.",
      "Coffee shops are ubiquitous in this part of the city.",
      "Her catchy song was ubiquitous on the radio that summer."
    ],
    synonyms: ["omnipresent", "pervasive", "universal"], day: 6, group: 3 },
  { word: "underscore", pos: "verb", arabic: "يؤكد / يبرز",
    definition: "To emphasize or give added weight to something.",
    examples: [
      "The accident underscored the need for stricter safety regulations.",
      "Recent events underscore how fragile democracy can be.",
      "She underscored her main point by repeating it twice."
    ],
    synonyms: ["emphasize", "highlight", "stress"], day: 6, group: 3 },
  { word: "venal", pos: "adjective", arabic: "قابل للرشوة / فاسد",
    definition: "Susceptible to bribery; motivated by corrupt financial gain.",
    examples: [
      "The venal official accepted bribes in exchange for favorable contracts.",
      "Reporters exposed the venal practices of the local government.",
      "He distrusted the venal politicians who ran the city."
    ],
    synonyms: ["corrupt", "bribable", "mercenary"], day: 6, group: 3 },
  { word: "venerate", pos: "verb", arabic: "يبجّل / يحترم",
    definition: "To regard with great respect; to revere.",
    examples: [
      "The villagers venerated the elderly priest as a living saint.",
      "Many Americans venerate the founding fathers of the nation.",
      "The poet was venerated long after her death."
    ],
    synonyms: ["revere", "honor", "worship"], day: 6, group: 3 },

  // Day 7 Group 1
  { word: "appease", pos: "verb", arabic: "يهدّئ / يسترضي",
    definition: "To pacify or placate by acceding to demands.",
    examples: [
      "He tried to appease his angry customer by offering a refund.",
      "The treaty was meant to appease the rebellious provinces.",
      "She gave the crying child a toy to appease him."
    ],
    synonyms: ["pacify", "placate", "mollify"], day: 7, group: 1 },
  { word: "arbitrary", pos: "adjective", arabic: "تعسفي / اعتباطي",
    definition: "Based on random choice or personal whim, rather than reason or system.",
    examples: [
      "The decision seemed arbitrary and lacked any clear justification.",
      "She drew an arbitrary line between acceptable and unacceptable behavior.",
      "The judges were criticized for their arbitrary scoring."
    ],
    synonyms: ["random", "capricious", "whimsical"], day: 7, group: 1 },
  { word: "archaic", pos: "adjective", arabic: "قديم / عتيق",
    definition: "Very old or old-fashioned; no longer current.",
    examples: [
      "The archaic laws were finally repealed last year.",
      "He used archaic words that nobody understood.",
      "Their archaic farming methods were replaced by modern technology."
    ],
    synonyms: ["antiquated", "outdated", "obsolete"], day: 7, group: 1 },
  { word: "clamorous", pos: "adjective", arabic: "صاخب / ضاج",
    definition: "Making a loud and confused noise; vehemently demanding.",
    examples: [
      "The clamorous crowd demanded an encore from the band.",
      "Reporters became clamorous as the senator left the building.",
      "The market was a clamorous scene of buyers and sellers."
    ],
    synonyms: ["noisy", "vociferous", "uproarious"], day: 7, group: 1 },
  { word: "dearth", pos: "noun", arabic: "ندرة / شح",
    definition: "A scarcity or lack of something.",
    examples: [
      "There is a dearth of qualified teachers in rural areas.",
      "The dearth of evidence forced the prosecutor to drop the case.",
      "A dearth of rainfall led to severe drought conditions."
    ],
    synonyms: ["scarcity", "lack", "paucity"], day: 7, group: 1 },
  { word: "explicable", pos: "adjective", arabic: "قابل للتفسير",
    definition: "Able to be accounted for or understood.",
    examples: [
      "Her sudden departure was easily explicable given the circumstances.",
      "Some natural phenomena are not yet explicable by science.",
      "His odd behavior became explicable once we learned about his illness."
    ],
    synonyms: ["understandable", "accountable", "comprehensible"], day: 7, group: 1 },
  { word: "hyperbole", pos: "noun", arabic: "مبالغة",
    definition: "Exaggerated statements or claims not meant to be taken literally.",
    examples: [
      "Saying you're starving when you're just hungry is a common hyperbole.",
      "His speech was full of hyperbole about the company's achievements.",
      "Don't dismiss her concerns as mere hyperbole."
    ],
    synonyms: ["exaggeration", "overstatement", "embellishment"], day: 7, group: 1 },
  { word: "immutable", pos: "adjective", arabic: "ثابت / لا يتغير",
    definition: "Unchanging over time or unable to be changed.",
    examples: [
      "The laws of physics are considered immutable.",
      "Her immutable belief in justice guided her career.",
      "Death and taxes are often called the only immutable certainties."
    ],
    synonyms: ["unchangeable", "fixed", "permanent"], day: 7, group: 1 },
  { word: "indefatigable", pos: "adjective", arabic: "لا يكلّ ولا يملّ",
    definition: "Persisting tirelessly; incapable of being fatigued.",
    examples: [
      "Her indefatigable efforts finally brought the project to completion.",
      "The indefatigable volunteer worked twelve-hour days for weeks.",
      "He was an indefatigable champion of human rights."
    ],
    synonyms: ["tireless", "untiring", "unflagging"], day: 7, group: 1 },
  { word: "indolent", pos: "adjective", arabic: "كسول / خامل",
    definition: "Wanting to avoid activity or exertion; lazy.",
    examples: [
      "The indolent student rarely turned in his homework on time.",
      "She spent an indolent afternoon lounging by the pool.",
      "His indolent attitude cost him several promotions."
    ],
    synonyms: ["lazy", "slothful", "idle"], day: 7, group: 1 },

  // Day 7 Group 2
  { word: "insular", pos: "adjective", arabic: "منعزل / ضيق الأفق",
    definition: "Ignorant of or uninterested in cultures, ideas, or peoples outside one's own experience.",
    examples: [
      "The small town had an insular culture that resisted outsiders.",
      "His insular worldview was challenged by his travels abroad.",
      "The company's insular leadership failed to anticipate market changes."
    ],
    synonyms: ["narrow-minded", "parochial", "isolated"], day: 7, group: 2 },
  { word: "intransigent", pos: "adjective", arabic: "متشدد / لا يساوم",
    definition: "Unwilling or refusing to change one's views or to agree.",
    examples: [
      "The intransigent union leader rejected every offer from management.",
      "Both sides remained intransigent, and negotiations broke down.",
      "His intransigent stance prevented any compromise."
    ],
    synonyms: ["uncompromising", "unyielding", "obstinate"], day: 7, group: 2 },
  { word: "intrepid", pos: "adjective", arabic: "شجاع / مقدام",
    definition: "Fearless; adventurous and resolute in the face of danger.",
    examples: [
      "The intrepid explorer crossed the frozen tundra alone.",
      "Intrepid journalists risked their lives to report the story.",
      "Her intrepid spirit inspired the entire team."
    ],
    synonyms: ["fearless", "brave", "valiant"], day: 7, group: 2 },
  { word: "irreverent", pos: "adjective", arabic: "غير محترم / ساخر",
    definition: "Showing a lack of respect for people or things that are generally taken seriously.",
    examples: [
      "His irreverent humor offended many in the audience.",
      "The comedian's irreverent take on politics drew big crowds.",
      "She had an irreverent attitude toward authority figures."
    ],
    synonyms: ["disrespectful", "mocking", "flippant"], day: 7, group: 2 },
  { word: "loathe", pos: "verb", arabic: "يكره بشدة",
    definition: "To feel intense dislike or disgust for.",
    examples: [
      "She loathed the smell of fish cooking in the morning.",
      "He loathed having to attend formal events.",
      "Critics loathed the film, but audiences loved it."
    ],
    synonyms: ["detest", "abhor", "despise"], day: 7, group: 2 },
  { word: "malign", pos: "verb", arabic: "يفتري على / يشوّه سمعة",
    definition: "To speak about someone in a spitefully critical manner.",
    examples: [
      "He felt his rivals had unfairly maligned him in the press.",
      "She refused to malign her former employer despite their dispute.",
      "Often-maligned politicians are sometimes vindicated by history."
    ],
    synonyms: ["slander", "defame", "vilify"], day: 7, group: 2 },
  { word: "malleable", pos: "adjective", arabic: "قابل للتشكيل / لين",
    definition: "Easily influenced or shaped; pliable.",
    examples: [
      "Gold is a soft, malleable metal that can be hammered into thin sheets.",
      "Children's minds are particularly malleable at a young age.",
      "Her malleable opinions shifted with each new piece of information."
    ],
    synonyms: ["pliable", "flexible", "adaptable"], day: 7, group: 2 },
  { word: "neophyte", pos: "noun", arabic: "مبتدئ",
    definition: "A person who is new to a subject, skill, or belief.",
    examples: [
      "As a neophyte to chess, he often lost to experienced players.",
      "The seminar was designed for neophytes in the field.",
      "Even neophytes can master the basics within a few weeks."
    ],
    synonyms: ["novice", "beginner", "tyro"], day: 7, group: 2 },
  { word: "plastic", pos: "adjective", arabic: "مرن / قابل للتشكيل",
    definition: "Easily shaped or molded; capable of being changed.",
    examples: [
      "The clay had a plastic quality that made it easy to sculpt.",
      "Young brains are remarkably plastic and able to recover from injury.",
      "His political views were plastic and shifted with public opinion."
    ],
    synonyms: ["malleable", "flexible", "moldable"], day: 7, group: 2 },
  { word: "platitude", pos: "noun", arabic: "كلام مبتذل",
    definition: "A trite, dull, or unoriginal remark, especially one that is uttered as if it were profound.",
    examples: [
      "The speech was filled with platitudes about hard work and success.",
      "She offered the usual platitudes at the funeral.",
      "His response was a platitude rather than a real answer."
    ],
    synonyms: ["cliche", "truism", "banality"], day: 7, group: 2 },

  // Day 7 Group 3
  { word: "prescient", pos: "adjective", arabic: "بصير / متنبئ",
    definition: "Having or showing knowledge of events before they take place.",
    examples: [
      "Her prescient warnings about the financial crisis were ignored.",
      "The novel proved prescient in its predictions about technology.",
      "He had a prescient sense of which stocks would rise."
    ],
    synonyms: ["prophetic", "foresighted", "clairvoyant"], day: 7, group: 3 },
  { word: "pristine", pos: "adjective", arabic: "نقي / لم يُمس",
    definition: "In its original condition; unspoiled and pure.",
    examples: [
      "The remote beach was pristine, untouched by tourism.",
      "She kept her vintage car in pristine condition.",
      "The pristine snow sparkled in the morning sunlight."
    ],
    synonyms: ["pure", "unspoiled", "immaculate"], day: 7, group: 3 },
  { word: "reproach", pos: "verb", arabic: "يلوم / يعاتب",
    definition: "To express disapproval or disappointment with someone.",
    examples: [
      "She reproached him for forgetting their anniversary.",
      "He felt reproached by the silent stares of his colleagues.",
      "There is nothing in his record to reproach."
    ],
    synonyms: ["rebuke", "scold", "admonish"], day: 7, group: 3 },
  { word: "robust", pos: "adjective", arabic: "قوي / متين",
    definition: "Strong and healthy; able to withstand difficulties.",
    examples: [
      "The economy showed robust growth in the third quarter.",
      "The athlete maintained a robust training schedule year-round.",
      "Their software is known for its robust security features."
    ],
    synonyms: ["sturdy", "vigorous", "strong"], day: 7, group: 3 },
  { word: "salubrious", pos: "adjective", arabic: "نافع للصحة",
    definition: "Health-giving; healthy or wholesome.",
    examples: [
      "The mountain air was famously salubrious for those with lung problems.",
      "She moved to a more salubrious neighborhood after her promotion.",
      "Doctors recommended the salubrious effects of regular exercise."
    ],
    synonyms: ["healthful", "wholesome", "beneficial"], day: 7, group: 3 },
  { word: "sanction", pos: "noun", arabic: "موافقة / عقوبة",
    definition: "Official permission or approval; alternatively, a penalty for breaking a rule.",
    examples: [
      "The project went ahead with the full sanction of the board.",
      "Economic sanctions were imposed on the rogue regime.",
      "The committee gave its sanction to the new research program."
    ],
    synonyms: ["approval", "authorization", "penalty"], day: 7, group: 3 },
  { word: "sedulous", pos: "adjective", arabic: "مجتهد / دؤوب",
    definition: "Showing dedication and diligence in one's work.",
    examples: [
      "His sedulous research yielded a groundbreaking discovery.",
      "She was sedulous in her preparation for the bar exam.",
      "The sedulous editor caught every minor error in the manuscript."
    ],
    synonyms: ["diligent", "assiduous", "industrious"], day: 7, group: 3 },
  { word: "soporific", pos: "adjective", arabic: "مسبب للنعاس",
    definition: "Tending to induce drowsiness or sleep.",
    examples: [
      "The professor's soporific voice put half the class to sleep.",
      "Warm milk has a soporific effect on many people.",
      "I found the lecture soporific despite its important subject."
    ],
    synonyms: ["sleep-inducing", "sedative", "drowsy"], day: 7, group: 3 },
  { word: "stern", pos: "adjective", arabic: "صارم / قاسٍ",
    definition: "Serious and unrelenting, especially in the assertion of authority.",
    examples: [
      "The teacher gave a stern warning to the disruptive student.",
      "His stern expression hid a kind heart.",
      "She believed in stern but fair discipline."
    ],
    synonyms: ["strict", "severe", "harsh"], day: 7, group: 3 },
  { word: "tendentious", pos: "adjective", arabic: "متحيّز / منحاز",
    definition: "Expressing or intending to promote a particular cause or point of view, especially a controversial one.",
    examples: [
      "The tendentious article presented only one side of the story.",
      "His tendentious arguments betrayed his political agenda.",
      "Critics accused the documentary of being tendentious propaganda."
    ],
    synonyms: ["biased", "partisan", "slanted"], day: 7, group: 3 },

  // Day 8 Group 1
  { word: "accentuate", pos: "verb", arabic: "يبرز / يؤكد",
    definition: "To make more noticeable or prominent.",
    examples: [
      "The dress accentuated her elegant figure.",
      "Soft lighting accentuated the warm tones of the room.",
      "He used italics to accentuate key words in his essay."
    ],
    synonyms: ["emphasize", "highlight", "underscore"], day: 8, group: 1 },
  { word: "conjectural", pos: "adjective", arabic: "افتراضي / تخميني",
    definition: "Based on or involving guesswork rather than firm evidence.",
    examples: [
      "His theory remains conjectural until more data is collected.",
      "The historian admitted that parts of her account were conjectural.",
      "Most early theories about the universe were largely conjectural."
    ],
    synonyms: ["speculative", "hypothetical", "suppositional"], day: 8, group: 1 },
  { word: "convivial", pos: "adjective", arabic: "ودود / مرح",
    definition: "Friendly, lively, and enjoyable, especially in social contexts.",
    examples: [
      "The convivial atmosphere at the reception put everyone at ease.",
      "He was a convivial host who made every guest feel welcome.",
      "The pub was known for its convivial gatherings on weekends."
    ],
    synonyms: ["sociable", "friendly", "jovial"], day: 8, group: 1 },
  { word: "decadent", pos: "adjective", arabic: "منحط / مترف",
    definition: "Characterized by moral decline or excessive self-indulgence.",
    examples: [
      "Critics described the empire's final years as decadent and corrupt.",
      "She enjoyed the decadent dessert despite her diet.",
      "The film depicted the decadent lifestyle of the rich and famous."
    ],
    synonyms: ["self-indulgent", "dissolute", "indulgent"], day: 8, group: 1 },
  { word: "egregious", pos: "adjective", arabic: "فاضح / صارخ",
    definition: "Outstandingly bad; shockingly noticeable.",
    examples: [
      "The report contained egregious errors that misled readers.",
      "His egregious behavior at the meeting cost him his job.",
      "Such an egregious violation of trust cannot be overlooked."
    ],
    synonyms: ["flagrant", "blatant", "glaring"], day: 8, group: 1 },
  { word: "evanescent", pos: "adjective", arabic: "زائل / سريع التلاشي",
    definition: "Soon passing out of sight, memory, or existence; quickly fading.",
    examples: [
      "The evanescent beauty of cherry blossoms makes them precious.",
      "Fame can be evanescent, here today and gone tomorrow.",
      "He captured the evanescent light of dawn in his painting."
    ],
    synonyms: ["fleeting", "transient", "ephemeral"], day: 8, group: 1 },
  { word: "flamboyant", pos: "adjective", arabic: "متباهٍ / مبهرج",
    definition: "Tending to attract attention because of confidence, style, or showiness.",
    examples: [
      "The flamboyant performer wore feathered costumes on stage.",
      "Her flamboyant personality lit up every room she entered.",
      "He drove a flamboyant red sports car around town."
    ],
    synonyms: ["showy", "ostentatious", "flashy"], day: 8, group: 1 },
  { word: "forestall", pos: "verb", arabic: "يستبق / يمنع مسبقاً",
    definition: "To prevent or obstruct by taking action ahead of time.",
    examples: [
      "She acted quickly to forestall any further criticism.",
      "The company released a statement to forestall negative rumors.",
      "Vaccinations forestall the spread of dangerous diseases."
    ],
    synonyms: ["preempt", "prevent", "avert"], day: 8, group: 1 },
  { word: "gainsay", pos: "verb", arabic: "ينكر / يعارض",
    definition: "To deny or contradict; to speak against.",
    examples: [
      "No one could gainsay the truth of her observation.",
      "The evidence is so strong that few would dare gainsay it.",
      "He could not gainsay her impressive accomplishments."
    ],
    synonyms: ["deny", "contradict", "dispute"], day: 8, group: 1 },
  { word: "galvanize", pos: "verb", arabic: "يحفّز / يستنفر",
    definition: "To shock or excite someone into taking action.",
    examples: [
      "The crisis galvanized the community into immediate action.",
      "Her speech galvanized supporters across the country.",
      "News of the disaster galvanized international relief efforts."
    ],
    synonyms: ["motivate", "energize", "mobilize"], day: 8, group: 1 },

  // Day 8 Group 2
  { word: "indiscriminate", pos: "adjective", arabic: "عشوائي / دون تمييز",
    definition: "Done at random or without careful judgment.",
    examples: [
      "The indiscriminate bombing killed many civilians.",
      "He showed indiscriminate generosity to anyone who asked.",
      "Her indiscriminate reading covered everything from poetry to physics."
    ],
    synonyms: ["random", "unselective", "haphazard"], day: 8, group: 2 },
  { word: "innocuous", pos: "adjective", arabic: "غير ضار / لطيف",
    definition: "Not harmful or offensive.",
    examples: [
      "What seemed like an innocuous comment deeply offended her.",
      "The snake's bite was painful but ultimately innocuous.",
      "He told an innocuous joke to break the tension."
    ],
    synonyms: ["harmless", "benign", "inoffensive"], day: 8, group: 2 },
  { word: "momentary", pos: "adjective", arabic: "لحظي / عابر",
    definition: "Lasting for a very brief time.",
    examples: [
      "There was a momentary pause before she answered.",
      "His momentary lapse in judgment had lasting consequences.",
      "She felt a momentary flash of doubt before continuing."
    ],
    synonyms: ["brief", "fleeting", "transient"], day: 8, group: 2 },
  { word: "mundane", pos: "adjective", arabic: "عادي / دنيوي",
    definition: "Lacking interest or excitement; dull and ordinary.",
    examples: [
      "She wanted to escape the mundane routines of office life.",
      "He found beauty in the most mundane objects.",
      "Their conversation never rose above the mundane."
    ],
    synonyms: ["ordinary", "humdrum", "banal"], day: 8, group: 2 },
  { word: "nettlesome", pos: "adjective", arabic: "مزعج / مغيظ",
    definition: "Causing annoyance or difficulty.",
    examples: [
      "The nettlesome problem refused to go away despite many attempts.",
      "He had a nettlesome habit of interrupting people.",
      "Several nettlesome questions remained after the meeting."
    ],
    synonyms: ["annoying", "irritating", "vexing"], day: 8, group: 2 },
  { word: "nullify", pos: "verb", arabic: "يبطل / يلغي",
    definition: "To make legally null and void; to cancel out.",
    examples: [
      "The court nullified the contract due to fraud.",
      "His apology did not nullify the harm he had caused.",
      "A single mistake can nullify hours of careful work."
    ],
    synonyms: ["invalidate", "cancel", "annul"], day: 8, group: 2 },
  { word: "obviate", pos: "verb", arabic: "يلغي الحاجة إلى",
    definition: "To remove a need or difficulty; to make unnecessary.",
    examples: [
      "Online banking obviates the need to visit a branch.",
      "Careful planning can obviate many potential problems.",
      "The new policy will obviate the requirement for paper forms."
    ],
    synonyms: ["preclude", "prevent", "avert"], day: 8, group: 2 },
  { word: "omnipresent", pos: "adjective", arabic: "موجود في كل مكان",
    definition: "Present everywhere at the same time.",
    examples: [
      "Surveillance cameras have become omnipresent in modern cities.",
      "The threat of cyberattacks is now omnipresent for businesses.",
      "Her influence on the team was quiet but omnipresent."
    ],
    synonyms: ["ubiquitous", "pervasive", "everywhere"], day: 8, group: 2 },
  { word: "oust", pos: "verb", arabic: "يطرد / يخلع",
    definition: "To drive out or expel from a position or place.",
    examples: [
      "The board voted to oust the chief executive after the scandal.",
      "Rebels tried to oust the dictator from power.",
      "She was ousted from the committee for repeated absences."
    ],
    synonyms: ["expel", "remove", "depose"], day: 8, group: 2 },
  { word: "palpable", pos: "adjective", arabic: "ملموس / واضح",
    definition: "So intense as to be almost touched or felt; clearly perceptible.",
    examples: [
      "The tension in the room was palpable.",
      "Her excitement about the trip was palpable.",
      "There was a palpable sense of relief after the announcement."
    ],
    synonyms: ["tangible", "perceptible", "evident"], day: 8, group: 2 },

  // Day 8 Group 3
  { word: "perfidy", pos: "noun", arabic: "غدر / خيانة",
    definition: "Deceitfulness; untrustworthiness; betrayal.",
    examples: [
      "His perfidy in revealing the secret destroyed their friendship.",
      "The general was executed for his perfidy during the war.",
      "Such perfidy from a trusted advisor was unforgivable."
    ],
    synonyms: ["treachery", "betrayal", "duplicity"], day: 8, group: 3 },
  { word: "profuse", pos: "adjective", arabic: "وفير / غزير",
    definition: "Existing in large quantity; plentiful.",
    examples: [
      "She offered profuse apologies for her mistake.",
      "The garden produced profuse blooms throughout summer.",
      "He gave profuse thanks to everyone who helped him."
    ],
    synonyms: ["abundant", "copious", "lavish"], day: 8, group: 3 },
  { word: "pugnacious", pos: "adjective", arabic: "عدواني / محب للشجار",
    definition: "Eager or quick to argue, quarrel, or fight.",
    examples: [
      "His pugnacious nature made him difficult to work with.",
      "The pugnacious lawyer challenged every point in court.",
      "She had a pugnacious response to any criticism."
    ],
    synonyms: ["belligerent", "combative", "aggressive"], day: 8, group: 3 },
  { word: "sagacious", pos: "adjective", arabic: "حكيم / فطن",
    definition: "Having or showing keen mental discernment and good judgment; wise.",
    examples: [
      "Her sagacious advice helped him avoid a costly mistake.",
      "The sagacious old judge was respected by everyone.",
      "He made a sagacious investment that paid off years later."
    ],
    synonyms: ["wise", "shrewd", "astute"], day: 8, group: 3 },
  { word: "sanguine", pos: "adjective", arabic: "متفائل",
    definition: "Optimistic or positive, especially in a difficult situation.",
    examples: [
      "She remained sanguine about the company's prospects despite the downturn.",
      "He was sanguine in the face of overwhelming odds.",
      "The doctor was sanguine about her chances of full recovery."
    ],
    synonyms: ["optimistic", "hopeful", "confident"], day: 8, group: 3 },
  { word: "scant", pos: "adjective", arabic: "ضئيل / قليل",
    definition: "Barely sufficient or adequate; very little.",
    examples: [
      "There is scant evidence to support his claim.",
      "She paid scant attention to the warnings.",
      "The harvest this year provided only a scant supply of grain."
    ],
    synonyms: ["meager", "sparse", "limited"], day: 8, group: 3 },
  { word: "skullduggery", pos: "noun", arabic: "خداع / مكر",
    definition: "Underhanded or unscrupulous behavior; trickery.",
    examples: [
      "The election was tainted by political skullduggery.",
      "He was accused of skullduggery in his business dealings.",
      "Detective novels often involve plenty of skullduggery."
    ],
    synonyms: ["trickery", "chicanery", "duplicity"], day: 8, group: 3 },
  { word: "trivial", pos: "adjective", arabic: "تافه / غير مهم",
    definition: "Of little value or importance.",
    examples: [
      "Don't waste time arguing over such trivial matters.",
      "The differences between the two products are trivial.",
      "She brushed off the criticism as trivial."
    ],
    synonyms: ["insignificant", "minor", "petty"], day: 8, group: 3 },
  { word: "utilitarian", pos: "adjective", arabic: "نفعي / عملي",
    definition: "Designed to be useful or practical rather than attractive.",
    examples: [
      "The kitchen had a utilitarian design with minimal decoration.",
      "He chose utilitarian furniture over more decorative pieces.",
      "Their utilitarian approach focused on function over form."
    ],
    synonyms: ["practical", "functional", "pragmatic"], day: 8, group: 3 },
  { word: "vapid", pos: "adjective", arabic: "ممل / فارغ",
    definition: "Offering nothing that is stimulating or challenging; dull.",
    examples: [
      "The conversation at dinner was vapid and forgettable.",
      "Critics dismissed the film as a vapid romantic comedy.",
      "Her vapid smile gave nothing away."
    ],
    synonyms: ["insipid", "dull", "lifeless"], day: 8, group: 3 },

  // Day 9 Group 1
  { word: "boorish", pos: "adjective", arabic: "وقح / فظ",
    definition: "Rough and bad-mannered; coarse.",
    examples: [
      "His boorish behavior at the dinner table embarrassed his hosts.",
      "She refused to put up with his boorish remarks any longer.",
      "The boorish guests were eventually asked to leave."
    ],
    synonyms: ["rude", "uncouth", "ill-mannered"], day: 9, group: 1 },
  { word: "brook", pos: "verb", arabic: "يتحمل / يطيق",
    definition: "To tolerate or allow something, especially something disliked.",
    examples: [
      "She would brook no opposition to her plans.",
      "He could not brook any criticism of his work.",
      "The principal will not brook tardiness from teachers."
    ],
    synonyms: ["tolerate", "endure", "permit"], day: 9, group: 1 },
  { word: "circumspect", pos: "adjective", arabic: "حذر / متأنٍ",
    definition: "Wary and unwilling to take risks; cautious.",
    examples: [
      "She was circumspect about sharing personal details with strangers.",
      "He took a circumspect approach to the dangerous investment.",
      "Politicians must be circumspect when speaking to the press."
    ],
    synonyms: ["cautious", "wary", "prudent"], day: 9, group: 1 },
  { word: "comity", pos: "noun", arabic: "مودة / احترام متبادل",
    definition: "Courtesy and considerate behavior, especially among nations or groups.",
    examples: [
      "The meeting was conducted with great comity despite differing views.",
      "International comity requires respect for each nation's laws.",
      "The two parties pledged to restore comity in the senate."
    ],
    synonyms: ["civility", "courtesy", "harmony"], day: 9, group: 1 },
  { word: "commensurate", pos: "adjective", arabic: "متناسب / متكافئ",
    definition: "Corresponding in size, extent, amount, or degree; proportional.",
    examples: [
      "Her salary is commensurate with her experience and skills.",
      "The punishment should be commensurate with the offense.",
      "Funding was not commensurate with the project's true needs."
    ],
    synonyms: ["proportionate", "equivalent", "matching"], day: 9, group: 1 },
  { word: "cordial", pos: "adjective", arabic: "ودي / لطيف",
    definition: "Warm and friendly in manner.",
    examples: [
      "The two leaders had a cordial meeting despite past tensions.",
      "She received a cordial welcome at the new office.",
      "Their relationship has remained cordial since the divorce."
    ],
    synonyms: ["warm", "friendly", "amiable"], day: 9, group: 1 },
  { word: "deleterious", pos: "adjective", arabic: "ضار / مؤذٍ",
    definition: "Causing harm or damage.",
    examples: [
      "Smoking has deleterious effects on overall health.",
      "Excessive screen time may be deleterious to children's sleep.",
      "The new regulations were deleterious to small businesses."
    ],
    synonyms: ["harmful", "damaging", "detrimental"], day: 9, group: 1 },
  { word: "dichotomy", pos: "noun", arabic: "ثنائية / تقابل",
    definition: "A division or contrast between two things that are represented as entirely different.",
    examples: [
      "There is a dichotomy between his public and private personas.",
      "The book explores the dichotomy between nature and nurture.",
      "She rejected the false dichotomy of work versus family."
    ],
    synonyms: ["division", "contrast", "split"], day: 9, group: 1 },
  { word: "edify", pos: "verb", arabic: "يثقّف / يهذّب",
    definition: "To instruct or improve someone morally or intellectually.",
    examples: [
      "The lecture was meant to edify the young students.",
      "Travel can edify those willing to learn from new cultures.",
      "Her writings continue to edify readers around the world."
    ],
    synonyms: ["enlighten", "educate", "uplift"], day: 9, group: 1 },
  { word: "elicit", pos: "verb", arabic: "يستخلص / يستثير",
    definition: "To draw out a response, answer, or fact from someone.",
    examples: [
      "The detective tried to elicit a confession from the suspect.",
      "Her speech elicited enthusiastic applause from the crowd.",
      "Open-ended questions tend to elicit more thoughtful answers."
    ],
    synonyms: ["draw out", "evoke", "extract"], day: 9, group: 1 },

  // Day 9 Group 2
  { word: "erudite", pos: "adjective", arabic: "متعلم / مثقف",
    definition: "Having or showing great knowledge or learning.",
    examples: [
      "The professor's erudite lectures attracted students from across campus.",
      "His erudite essays were published in leading journals.",
      "She was an erudite scholar of medieval literature."
    ],
    synonyms: ["learned", "scholarly", "knowledgeable"], day: 9, group: 2 },
  { word: "fecund", pos: "adjective", arabic: "خصب / منتج",
    definition: "Producing or capable of producing an abundance of offspring or new growth; highly fertile.",
    examples: [
      "The fecund soil yielded bumper crops year after year.",
      "Her fecund imagination generated countless story ideas.",
      "The artist's fecund period produced dozens of major works."
    ],
    synonyms: ["fertile", "prolific", "productive"], day: 9, group: 2 },
  { word: "feeble", pos: "adjective", arabic: "ضعيف / واهٍ",
    definition: "Lacking physical strength, especially as a result of age or illness; weak.",
    examples: [
      "His feeble grip suggested how ill he had become.",
      "She offered a feeble excuse for being late.",
      "The feeble light from the candle barely illuminated the room."
    ],
    synonyms: ["weak", "frail", "infirm"], day: 9, group: 2 },
  { word: "felicitous", pos: "adjective", arabic: "موفق / مناسب",
    definition: "Well chosen or suited to the circumstances; pleasing.",
    examples: [
      "Her felicitous choice of words eased the tense moment.",
      "The novel ends with a felicitous turn of events.",
      "It was a felicitous coincidence that they met that day."
    ],
    synonyms: ["apt", "fitting", "well-chosen"], day: 9, group: 2 },
  { word: "forbear", pos: "verb", arabic: "يمتنع / يكفّ",
    definition: "To refrain from doing something; to hold back.",
    examples: [
      "She had to forbear from interrupting during the long speech.",
      "He forbore to mention her past mistakes out of kindness.",
      "Please forbear with me while I explain the situation."
    ],
    synonyms: ["refrain", "abstain", "withhold"], day: 9, group: 2 },
  { word: "haphazard", pos: "adjective", arabic: "عشوائي / غير منظم",
    definition: "Lacking any obvious principle of organization; random.",
    examples: [
      "Her notes were arranged in a haphazard manner.",
      "The investigation was haphazard and missed key evidence.",
      "He stacked the books in a haphazard pile on his desk."
    ],
    synonyms: ["random", "disorganized", "chaotic"], day: 9, group: 2 },
  { word: "hodgepodge", pos: "noun", arabic: "خليط فوضوي",
    definition: "A confused mixture of different things.",
    examples: [
      "The drawer contained a hodgepodge of old keys and receipts.",
      "His thesis was a hodgepodge of unrelated ideas.",
      "The town's architecture is a hodgepodge of styles from different eras."
    ],
    synonyms: ["mixture", "jumble", "medley"], day: 9, group: 2 },
  { word: "impede", pos: "verb", arabic: "يعيق / يعرقل",
    definition: "To delay or prevent someone or something by obstructing them.",
    examples: [
      "Heavy snow impeded the rescue team's progress.",
      "Bureaucratic delays impeded the project for months.",
      "Don't let fear impede your personal growth."
    ],
    synonyms: ["hinder", "obstruct", "hamper"], day: 9, group: 2 },
  { word: "impetuous", pos: "adjective", arabic: "متهور / مندفع",
    definition: "Acting or done quickly and without thought or care.",
    examples: [
      "His impetuous decision to quit his job surprised everyone.",
      "She made an impetuous purchase she later regretted.",
      "The impetuous youth jumped into the river without checking the depth."
    ],
    synonyms: ["impulsive", "rash", "hasty"], day: 9, group: 2 },
  { word: "irascible", pos: "adjective", arabic: "سريع الغضب",
    definition: "Easily made angry; quick-tempered.",
    examples: [
      "The irascible old man yelled at children playing on his lawn.",
      "Her irascible boss made even simple meetings stressful.",
      "He becomes irascible when he hasn't had enough sleep."
    ],
    synonyms: ["irritable", "hot-tempered", "testy"], day: 9, group: 2 },

  // Day 9 Group 3
  { word: "mercenary", pos: "adjective", arabic: "مأجور / يحركه المال",
    definition: "Primarily concerned with making money at the expense of ethics.",
    examples: [
      "His mercenary motives became clear once the deal was signed.",
      "Critics accused the lawyer of having a mercenary attitude.",
      "She refused to work for a company she saw as purely mercenary."
    ],
    synonyms: ["greedy", "venal", "money-oriented"], day: 9, group: 3 },
  { word: "meticulous", pos: "adjective", arabic: "دقيق / متأني",
    definition: "Showing great attention to detail; very careful and precise.",
    examples: [
      "She kept meticulous records of every transaction.",
      "His meticulous research uncovered errors others had missed.",
      "The chef is meticulous about the freshness of every ingredient."
    ],
    synonyms: ["thorough", "precise", "scrupulous"], day: 9, group: 3 },
  { word: "mordant", pos: "adjective", arabic: "لاذع / ساخر",
    definition: "Sharp or critical in style or manner; biting.",
    examples: [
      "His mordant wit made him a feared but admired critic.",
      "The essay offered a mordant analysis of modern politics.",
      "She had a mordant sense of humor that not everyone appreciated."
    ],
    synonyms: ["caustic", "biting", "sardonic"], day: 9, group: 3 },
  { word: "outstrip", pos: "verb", arabic: "يفوق / يتجاوز",
    definition: "To go faster or further than; to exceed.",
    examples: [
      "Demand for the new product quickly outstripped supply.",
      "She outstripped all her classmates in academic achievement.",
      "His ambition outstripped his actual abilities."
    ],
    synonyms: ["surpass", "exceed", "outdo"], day: 9, group: 3 },
  { word: "precarious", pos: "adjective", arabic: "محفوف بالمخاطر",
    definition: "Not securely held or in position; dangerously likely to fall or collapse.",
    examples: [
      "The book was perched in a precarious position on the edge of the shelf.",
      "Their financial situation became precarious after he lost his job.",
      "She made a precarious living as a freelance artist."
    ],
    synonyms: ["unstable", "risky", "uncertain"], day: 9, group: 3 },
  { word: "quirky", pos: "adjective", arabic: "غريب الأطوار",
    definition: "Having or characterized by peculiar or unexpected traits.",
    examples: [
      "Her quirky sense of humor made her popular at parties.",
      "The shop was filled with quirky vintage furniture.",
      "He has a quirky habit of organizing his books by color."
    ],
    synonyms: ["eccentric", "unconventional", "peculiar"], day: 9, group: 3 },
  { word: "repudiate", pos: "verb", arabic: "ينكر / يتنصل",
    definition: "To refuse to accept; to reject as untrue or unjust.",
    examples: [
      "He publicly repudiated the views attributed to him.",
      "The candidate repudiated the endorsement of the controversial group.",
      "She repudiated her earlier statement after reviewing the evidence."
    ],
    synonyms: ["reject", "disavow", "renounce"], day: 9, group: 3 },
  { word: "tact", pos: "noun", arabic: "لباقة / كياسة",
    definition: "Skill and sensitivity in dealing with others or with difficult issues.",
    examples: [
      "She handled the awkward situation with great tact.",
      "It takes tact to deliver bad news to a grieving family.",
      "His lack of tact often offended his coworkers."
    ],
    synonyms: ["diplomacy", "discretion", "sensitivity"], day: 9, group: 3 },
  { word: "trifling", pos: "adjective", arabic: "تافه / غير مهم",
    definition: "Unimportant or trivial.",
    examples: [
      "Don't bother me with such trifling matters.",
      "She brushed off the criticism as trifling.",
      "A trifling sum was all that was needed to settle the bill."
    ],
    synonyms: ["trivial", "insignificant", "petty"], day: 9, group: 3 },
  { word: "turbulent", pos: "adjective", arabic: "مضطرب / عاصف",
    definition: "Characterized by conflict, disorder, or confusion; not stable.",
    examples: [
      "The plane hit a patch of turbulent air over the mountains.",
      "She lived through a turbulent period in her country's history.",
      "Their turbulent relationship eventually came to an end."
    ],
    synonyms: ["tumultuous", "stormy", "chaotic"], day: 9, group: 3 },

  // Day 10 Group 1
  { word: "acumen", pos: "noun", arabic: "فطنة / حدة الذهن",
    definition: "The ability to make good judgments and quick decisions.",
    examples: [
      "Her business acumen helped the company double its profits.",
      "He showed remarkable acumen in negotiating the contract.",
      "Political acumen is essential for any successful candidate."
    ],
    synonyms: ["insight", "shrewdness", "perspicacity"], day: 10, group: 1 },
  { word: "antithesis", pos: "noun", arabic: "النقيض",
    definition: "A person or thing that is the direct opposite of something else.",
    examples: [
      "His humility was the antithesis of his rival's arrogance.",
      "Cruelty is the antithesis of compassion.",
      "Her quiet style is the antithesis of his loud showmanship."
    ],
    synonyms: ["opposite", "contrary", "reverse"], day: 10, group: 1 },
  { word: "ascribe", pos: "verb", arabic: "ينسب إلى",
    definition: "To attribute something to a cause, source, or origin.",
    examples: [
      "Historians ascribe the empire's fall to economic decline.",
      "She ascribed her success to hard work and good mentors.",
      "Critics ascribe the painting to an unknown student of the master."
    ],
    synonyms: ["attribute", "credit", "assign"], day: 10, group: 1 },
  { word: "befuddled", pos: "adjective", arabic: "مرتبك / مشوش",
    definition: "Unable to think clearly; confused.",
    examples: [
      "He looked befuddled by the complex instructions.",
      "She was befuddled by the rapid stream of new information.",
      "The befuddled tourist asked for directions three times."
    ],
    synonyms: ["confused", "perplexed", "muddled"], day: 10, group: 1 },
  { word: "eschew", pos: "verb", arabic: "يتجنب / يتحاشى",
    definition: "To deliberately avoid using or doing something.",
    examples: [
      "He chose to eschew sugar for health reasons.",
      "The author eschews the flowery language of his peers.",
      "She eschews all forms of social media."
    ],
    synonyms: ["avoid", "shun", "abstain"], day: 10, group: 1 },
  { word: "esoteric", pos: "adjective", arabic: "غامض / للخاصة فقط",
    definition: "Intended for or understood by only a small number of people with specialized knowledge.",
    examples: [
      "His lecture covered esoteric topics in quantum physics.",
      "The book is filled with esoteric references most readers won't recognize.",
      "She studies the esoteric traditions of ancient mystics."
    ],
    synonyms: ["arcane", "obscure", "abstruse"], day: 10, group: 1 },
  { word: "evasive", pos: "adjective", arabic: "مراوغ / متهرب",
    definition: "Tending to avoid commitment or self-revelation, especially by responding only indirectly.",
    examples: [
      "His evasive answers only deepened the reporters' suspicions.",
      "She gave an evasive response when asked about her plans.",
      "The senator was evasive on key policy questions."
    ],
    synonyms: ["elusive", "indirect", "equivocal"], day: 10, group: 1 },
  { word: "exculpate", pos: "verb", arabic: "يبرّئ",
    definition: "To show or declare that someone is not guilty of wrongdoing.",
    examples: [
      "The new evidence exculpated the defendant.",
      "He spent years trying to exculpate his late father.",
      "The report exculpated the company of any environmental violations."
    ],
    synonyms: ["exonerate", "absolve", "acquit"], day: 10, group: 1 },
  { word: "expedite", pos: "verb", arabic: "يسرّع / يعجّل",
    definition: "To make an action or process happen sooner or be accomplished more quickly.",
    examples: [
      "She paid extra to expedite the shipping.",
      "The new system will expedite the application process.",
      "We need to expedite this decision before the deadline."
    ],
    synonyms: ["accelerate", "hasten", "speed up"], day: 10, group: 1 },
  { word: "fastidious", pos: "adjective", arabic: "دقيق / صعب الإرضاء",
    definition: "Very attentive to and concerned about accuracy and detail; hard to please.",
    examples: [
      "He is fastidious about keeping his workspace immaculate.",
      "The fastidious editor caught every minor error.",
      "She is a fastidious eater who sends back any imperfect dish."
    ],
    synonyms: ["meticulous", "particular", "finicky"], day: 10, group: 1 },

  // Day 10 Group 2
  { word: "feign", pos: "verb", arabic: "يتظاهر / يدّعي",
    definition: "To pretend to be affected by a feeling, state, or injury.",
    examples: [
      "He feigned illness to avoid going to school.",
      "She tried to feign interest in the boring lecture.",
      "Don't feign surprise; you knew this would happen."
    ],
    synonyms: ["pretend", "fake", "simulate"], day: 10, group: 2 },
  { word: "furtive", pos: "adjective", arabic: "خفي / متستر",
    definition: "Attempting to avoid notice or attention, typically because of guilt or wishing to remain unknown.",
    examples: [
      "She cast a furtive glance at her phone during the meeting.",
      "His furtive behavior aroused the security guard's suspicion.",
      "They exchanged furtive whispers in the back of the room."
    ],
    synonyms: ["secretive", "stealthy", "surreptitious"], day: 10, group: 2 },
  { word: "hamper", pos: "verb", arabic: "يعيق",
    definition: "To hinder or impede the movement or progress of.",
    examples: [
      "Bad weather hampered the rescue operation.",
      "Lack of funding will hamper the research project.",
      "Heavy backpacks hampered the hikers on the steep climb."
    ],
    synonyms: ["hinder", "impede", "obstruct"], day: 10, group: 2 },
  { word: "indispensable", pos: "adjective", arabic: "لا غنى عنه",
    definition: "Absolutely necessary; essential.",
    examples: [
      "She has become an indispensable member of the team.",
      "Water is indispensable to all forms of life.",
      "His expertise proved indispensable during the crisis."
    ],
    synonyms: ["essential", "necessary", "vital"], day: 10, group: 2 },
  { word: "lament", pos: "verb", arabic: "يرثي / ينتحب",
    definition: "To express sorrow, regret, or unhappiness about something.",
    examples: [
      "She lamented the loss of her childhood home.",
      "Critics lament the decline of independent bookstores.",
      "He lamented that he had not spent more time with his family."
    ],
    synonyms: ["mourn", "grieve", "bemoan"], day: 10, group: 2 },
  { word: "myopic", pos: "adjective", arabic: "قصير النظر",
    definition: "Lacking foresight or imagination; short-sighted.",
    examples: [
      "His myopic focus on profits hurt long-term growth.",
      "Critics called the policy myopic and ill-conceived.",
      "Her myopic view of the situation ignored its broader impact."
    ],
    synonyms: ["short-sighted", "narrow-minded", "imprudent"], day: 10, group: 2 },
  { word: "nonchalant", pos: "adjective", arabic: "غير مكترث",
    definition: "Feeling or appearing casually calm and relaxed; not displaying anxiety or interest.",
    examples: [
      "He gave a nonchalant shrug when asked about the missing money.",
      "She remained nonchalant despite the chaos around her.",
      "His nonchalant attitude in a crisis impressed everyone."
    ],
    synonyms: ["unconcerned", "indifferent", "casual"], day: 10, group: 2 },
  { word: "partial", pos: "adjective", arabic: "جزئي / متحيز",
    definition: "Existing only in part; or, favoring one side in a dispute.",
    examples: [
      "She gave only a partial explanation of what had happened.",
      "The judge was accused of being partial to the defense.",
      "He has a partial view of the lake from his window."
    ],
    synonyms: ["incomplete", "biased", "limited"], day: 10, group: 2 },
  { word: "pensive", pos: "adjective", arabic: "متأمل / متفكر",
    definition: "Engaged in deep or serious thought.",
    examples: [
      "She sat by the window with a pensive expression.",
      "He grew pensive whenever the topic of his childhood came up.",
      "The poem captures a pensive autumn mood."
    ],
    synonyms: ["thoughtful", "reflective", "contemplative"], day: 10, group: 2 },
  { word: "portend", pos: "verb", arabic: "ينذر بـ / يدل على",
    definition: "To be a sign or warning that something, especially something momentous or calamitous, is likely to happen.",
    examples: [
      "Dark clouds portended a coming storm.",
      "The economic data portends difficult times ahead.",
      "Her unusual silence seemed to portend bad news."
    ],
    synonyms: ["foreshadow", "presage", "augur"], day: 10, group: 2 },

  // Day 10 Group 3
  { word: "provincial", pos: "adjective", arabic: "ريفي / ضيق الأفق",
    definition: "Of or concerning a province; or, limited in outlook; unsophisticated.",
    examples: [
      "She found their provincial attitudes hard to tolerate.",
      "The novel mocked the provincial concerns of small-town life.",
      "He was embarrassed by his family's provincial tastes."
    ],
    synonyms: ["narrow-minded", "parochial", "unsophisticated"], day: 10, group: 3 },
  { word: "rudimentary", pos: "adjective", arabic: "بدائي / أساسي",
    definition: "Involving or limited to basic principles; elementary.",
    examples: [
      "He has only a rudimentary knowledge of Spanish.",
      "The shelter offered only rudimentary protection from the cold.",
      "Their tools were rudimentary but effective."
    ],
    synonyms: ["basic", "elementary", "primitive"], day: 10, group: 3 },
  { word: "salutary", pos: "adjective", arabic: "نافع / مفيد",
    definition: "Producing good effects; beneficial.",
    examples: [
      "The experience was a salutary lesson in humility.",
      "The reforms had a salutary effect on the economy.",
      "Failure can be salutary if you learn from it."
    ],
    synonyms: ["beneficial", "wholesome", "advantageous"], day: 10, group: 3 },
  { word: "sever", pos: "verb", arabic: "يقطع / يفصل",
    definition: "To divide by cutting; to put an end to a connection or relationship.",
    examples: [
      "The accident severed the artery in his leg.",
      "She severed all ties with her former business partner.",
      "Diplomatic relations between the two countries were severed."
    ],
    synonyms: ["cut", "separate", "disconnect"], day: 10, group: 3 },
  { word: "slight", pos: "verb", arabic: "يهين / يستخف",
    definition: "To insult someone by treating them as unimportant.",
    examples: [
      "She felt slighted by not being invited to the meeting.",
      "He was slighted when his contributions went unmentioned.",
      "Don't slight the work of your colleagues, however small."
    ],
    synonyms: ["snub", "insult", "disrespect"], day: 10, group: 3 },
  { word: "somnolent", pos: "adjective", arabic: "ناعس / مسبب للنعاس",
    definition: "Sleepy or drowsy; causing drowsiness.",
    examples: [
      "The warm afternoon made everyone somnolent.",
      "His somnolent voice nearly put the audience to sleep.",
      "She felt somnolent after the heavy meal."
    ],
    synonyms: ["drowsy", "sleepy", "soporific"], day: 10, group: 3 },
  { word: "stoic", pos: "adjective", arabic: "رواقي / صابر",
    definition: "Enduring pain and hardship without showing one's feelings or complaining.",
    examples: [
      "She remained stoic throughout the painful procedure.",
      "His stoic acceptance of failure impressed his teammates.",
      "The soldiers showed stoic resolve under fire."
    ],
    synonyms: ["impassive", "unemotional", "uncomplaining"], day: 10, group: 3 },
  { word: "supersede", pos: "verb", arabic: "يحل محل / يستبدل",
    definition: "To take the place of, especially something previously authoritative or current.",
    examples: [
      "The new law will supersede all previous regulations.",
      "Modern smartphones have superseded older mobile devices.",
      "Her work has superseded earlier research on the topic."
    ],
    synonyms: ["replace", "supplant", "succeed"], day: 10, group: 3 },
  { word: "tout", pos: "verb", arabic: "يروّج / يمدح",
    definition: "To attempt to sell, especially by a direct or persistent approach; to praise highly.",
    examples: [
      "Critics touted the film as the best of the year.",
      "He was touted as the next big thing in tennis.",
      "The candidate touted her experience as a key strength."
    ],
    synonyms: ["promote", "advertise", "praise"], day: 10, group: 3 },
  { word: "wane", pos: "verb", arabic: "يتضاءل / يتلاشى",
    definition: "To decrease in vigor, power, or extent; to become smaller or weaker.",
    examples: [
      "Her interest in the project began to wane after a few months.",
      "The country's influence has waned since the war.",
      "As the moon waned, the nights grew darker."
    ],
    synonyms: ["diminish", "decline", "decrease"], day: 10, group: 3 },
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

export const TOTAL_DAYS = 10;
export const WORDS_PER_DAY = 30;
export const GROUPS_PER_DAY = 3;
export const WORDS_PER_GROUP = 10;
