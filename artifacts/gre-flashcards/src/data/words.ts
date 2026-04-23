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

  // Day 11 Group 1
  { word: "abhor", pos: "verb", arabic: "يمقت / يكره بشدة", definition: "To regard with disgust and hatred.", examples: ["She abhors any form of cruelty to animals.", "He abhorred the dishonesty he saw in politics.", "Most people abhor the thought of war."], synonyms: ["detest", "loathe", "despise"], day: 11, group: 1 },
  { word: "boisterous", pos: "adjective", arabic: "صاخب / مرح", definition: "Noisy, energetic, and cheerful; rowdy.", examples: ["The boisterous crowd cheered as the team scored.", "Her boisterous laughter filled the room.", "The children grew boisterous after eating sugary snacks."], synonyms: ["rowdy", "rambunctious", "lively"], day: 11, group: 1 },
  { word: "chivalrous", pos: "adjective", arabic: "شهم / مهذب", definition: "Courteous and gallant, especially toward others.", examples: ["His chivalrous gesture of opening the door surprised her.", "The knight was known for his chivalrous conduct.", "He offered chivalrous assistance to the elderly woman."], synonyms: ["gallant", "courteous", "noble"], day: 11, group: 1 },
  { word: "churlish", pos: "adjective", arabic: "فظ / غير مهذب", definition: "Rude in a mean-spirited and surly way.", examples: ["It would be churlish to refuse such a generous gift.", "His churlish reply offended everyone at the table.", "She received a churlish welcome from the new manager."], synonyms: ["rude", "surly", "boorish"], day: 11, group: 1 },
  { word: "clandestine", pos: "adjective", arabic: "سري / خفي", definition: "Kept secret or done secretively, especially because illicit.", examples: ["They held clandestine meetings in the basement.", "The spy carried out a clandestine operation behind enemy lines.", "Their clandestine affair was eventually exposed."], synonyms: ["secret", "covert", "surreptitious"], day: 11, group: 1 },
  { word: "complacent", pos: "adjective", arabic: "راضٍ بنفسه / متهاون", definition: "Showing smug or uncritical satisfaction with oneself or one's situation.", examples: ["The team grew complacent after their easy early wins.", "Don't become complacent just because sales are up this month.", "His complacent attitude cost the company several clients."], synonyms: ["smug", "self-satisfied", "unconcerned"], day: 11, group: 1 },
  { word: "cumbersome", pos: "adjective", arabic: "ثقيل / مرهق", definition: "Large or heavy and therefore difficult to carry or use; unwieldy.", examples: ["The old camera was cumbersome to carry on hikes.", "Their approval process is cumbersome and slow.", "She struggled with the cumbersome winter coat."], synonyms: ["unwieldy", "bulky", "awkward"], day: 11, group: 1 },
  { word: "debilitating", pos: "adjective", arabic: "مُنهك / مُضعف", definition: "Causing serious impairment of strength or ability to function.", examples: ["He suffers from a debilitating chronic illness.", "The drought had a debilitating effect on local farmers.", "Her debilitating fear of heights kept her grounded."], synonyms: ["weakening", "incapacitating", "enfeebling"], day: 11, group: 1 },
  { word: "deliberate", pos: "adjective", arabic: "متعمد / متأنٍ", definition: "Done consciously and intentionally; careful and unhurried.", examples: ["His deliberate insult shocked everyone present.", "She made a deliberate choice to leave the city.", "He spoke in slow, deliberate sentences."], synonyms: ["intentional", "calculated", "considered"], day: 11, group: 1 },
  { word: "droll", pos: "adjective", arabic: "مضحك بطريقة غريبة", definition: "Curious or unusual in a way that provokes dry amusement.", examples: ["He has a droll sense of humor that catches people off guard.", "The cat made a droll attempt to fit into the small box.", "Her droll observations made the meeting bearable."], synonyms: ["amusing", "whimsical", "comical"], day: 11, group: 1 },

  // Day 11 Group 2
  { word: "eccentric", pos: "adjective", arabic: "غريب الأطوار", definition: "Unconventional and slightly strange.", examples: ["The eccentric inventor lived alone with his many cats.", "Her eccentric fashion choices set her apart in the crowd.", "He was known for his eccentric habits and odd hobbies."], synonyms: ["unconventional", "quirky", "peculiar"], day: 11, group: 2 },
  { word: "fractious", pos: "adjective", arabic: "شكس / متذمر", definition: "Irritable and quarrelsome; difficult to control.", examples: ["The fractious child refused to go to bed on time.", "Negotiations broke down between the two fractious parties.", "He grew fractious whenever he was overtired."], synonyms: ["irritable", "quarrelsome", "peevish"], day: 11, group: 2 },
  { word: "limpid", pos: "adjective", arabic: "شفاف / صافٍ", definition: "Completely clear and transparent; easy to understand.", examples: ["The limpid stream revealed the colorful pebbles below.", "Her limpid prose made complex ideas accessible.", "He gazed into her limpid blue eyes."], synonyms: ["clear", "transparent", "lucid"], day: 11, group: 2 },
  { word: "mawkish", pos: "adjective", arabic: "عاطفي بشكل مبالغ", definition: "Sentimental in a feeble or sickly way.", examples: ["The film's mawkish ending made even loyal fans cringe.", "He wrote mawkish poetry that no one took seriously.", "Her mawkish display of grief seemed insincere."], synonyms: ["sentimental", "maudlin", "saccharine"], day: 11, group: 2 },
  { word: "obeisance", pos: "noun", arabic: "إجلال / انحناء", definition: "Deferential respect; a bow or other gesture expressing it.", examples: ["The courtiers performed obeisance before the king.", "Her obeisance to tradition shaped every decision.", "He offered obeisance to his teacher with a deep bow."], synonyms: ["deference", "homage", "respect"], day: 11, group: 2 },
  { word: "ostentatious", pos: "adjective", arabic: "متباهٍ / مبهرج", definition: "Characterized by pretentious or showy display intended to impress.", examples: ["His ostentatious mansion drew criticism from his neighbors.", "She wore an ostentatious diamond necklace to the dinner.", "The ostentatious wedding cost a small fortune."], synonyms: ["showy", "flamboyant", "pretentious"], day: 11, group: 2 },
  { word: "panacea", pos: "noun", arabic: "علاج لكل داء", definition: "A solution or remedy for all difficulties or diseases.", examples: ["Technology is not a panacea for all educational problems.", "She thought meditation would be a panacea for her anxiety.", "There is no single panacea for the economic crisis."], synonyms: ["cure-all", "remedy", "elixir"], day: 11, group: 2 },
  { word: "perfunctory", pos: "adjective", arabic: "روتيني / سطحي", definition: "Carried out with a minimum of effort or reflection.", examples: ["He gave the report a perfunctory review before signing it.", "Her perfunctory smile barely concealed her boredom.", "The inspection was perfunctory and missed major flaws."], synonyms: ["cursory", "superficial", "halfhearted"], day: 11, group: 2 },
  { word: "perilous", pos: "adjective", arabic: "خطر / محفوف بالمخاطر", definition: "Full of danger or risk.", examples: ["The hikers undertook a perilous climb up the cliff.", "The economy is in a perilous state.", "She navigated the perilous waters with skill."], synonyms: ["dangerous", "hazardous", "risky"], day: 11, group: 2 },
  { word: "pervasive", pos: "adjective", arabic: "واسع الانتشار", definition: "Spreading widely throughout an area or group of people.", examples: ["A pervasive smell of smoke hung over the city.", "Corruption was pervasive throughout the agency.", "Social media has a pervasive influence on modern culture."], synonyms: ["widespread", "ubiquitous", "prevalent"], day: 11, group: 2 },

  // Day 11 Group 3
  { word: "preclude", pos: "verb", arabic: "يمنع / يحول دون", definition: "To prevent from happening; to make impossible.", examples: ["His injury precluded him from competing in the tournament.", "Bad weather precluded any outdoor events.", "Lack of evidence precludes a conviction in this case."], synonyms: ["prevent", "exclude", "rule out"], day: 11, group: 3 },
  { word: "predilection", pos: "noun", arabic: "ميل / تفضيل", definition: "A preference or special liking for something.", examples: ["She has a predilection for spicy food.", "His predilection for old films shaped his career as a critic.", "He has a predilection for solving puzzles in his free time."], synonyms: ["preference", "liking", "fondness"], day: 11, group: 3 },
  { word: "rapacious", pos: "adjective", arabic: "جشع / مفترس", definition: "Aggressively greedy or grasping.", examples: ["The rapacious developer bought up land throughout the valley.", "Rapacious lenders preyed on vulnerable homeowners.", "His rapacious appetite for power alarmed his colleagues."], synonyms: ["greedy", "voracious", "predatory"], day: 11, group: 3 },
  { word: "relish", pos: "verb", arabic: "يستمتع بـ / يستلذ", definition: "To enjoy greatly; to take great pleasure in.", examples: ["She relished every bite of the gourmet meal.", "He relished the chance to lead the new project.", "The team relished their hard-earned victory."], synonyms: ["enjoy", "savor", "delight in"], day: 11, group: 3 },
  { word: "satirical", pos: "adjective", arabic: "تهكمي / ساخر", definition: "Using humor, irony, or exaggeration to criticize or mock.", examples: ["The magazine is famous for its satirical cartoons.", "He wrote a satirical novel about corporate life.", "Her satirical tone made the audience laugh and think."], synonyms: ["mocking", "sardonic", "ironic"], day: 11, group: 3 },
  { word: "sham", pos: "noun", arabic: "زائف / تظاهر", definition: "A thing that is not what it is purported to be; a fake.", examples: ["The whole election was denounced as a sham.", "His apology was a sham designed to save his job.", "Critics called the trial a complete sham."], synonyms: ["fake", "fraud", "pretense"], day: 11, group: 3 },
  { word: "skirt", pos: "verb", arabic: "يتجنب / يدور حول", definition: "To go around or past the edge of; to avoid dealing with.", examples: ["The road skirts the edge of the lake.", "He carefully skirted the controversial topic.", "She skirted the question with a vague answer."], synonyms: ["avoid", "evade", "circumvent"], day: 11, group: 3 },
  { word: "sluggish", pos: "adjective", arabic: "بطيء / كسول", definition: "Slow-moving or inactive.", examples: ["The river was sluggish in the summer heat.", "Sales have been sluggish for the past two quarters.", "He felt sluggish after the heavy lunch."], synonyms: ["slow", "lethargic", "torpid"], day: 11, group: 3 },
  { word: "spartan", pos: "adjective", arabic: "متقشف / بسيط", definition: "Showing or characterized by austerity, self-discipline, and the avoidance of luxury.", examples: ["The monks lived in spartan accommodations.", "She maintained a spartan diet to stay in shape.", "His spartan office contained only a desk and chair."], synonyms: ["austere", "ascetic", "frugal"], day: 11, group: 3 },
  { word: "truculent", pos: "adjective", arabic: "عدواني / شرس", definition: "Eager or quick to argue or fight; aggressively defiant.", examples: ["The truculent customer demanded to see the manager.", "His truculent attitude made negotiations impossible.", "She gave a truculent response to the polite question."], synonyms: ["belligerent", "combative", "pugnacious"], day: 11, group: 3 },

  // Day 12 Group 1
  { word: "acrimonious", pos: "adjective", arabic: "مرير / حاد", definition: "Angry and bitter, typically of speech or argument.", examples: ["Their acrimonious divorce dragged on for years.", "The meeting ended in an acrimonious dispute.", "She received an acrimonious reply to her email."], synonyms: ["bitter", "rancorous", "hostile"], day: 12, group: 1 },
  { word: "belligerent", pos: "adjective", arabic: "عدواني / مقاتل", definition: "Hostile and aggressive; eager to fight.", examples: ["He became belligerent after only one drink.", "The two belligerent nations finally signed a treaty.", "Her belligerent tone shocked the audience."], synonyms: ["aggressive", "combative", "hostile"], day: 12, group: 1 },
  { word: "beneficent", pos: "adjective", arabic: "محسن / خيّر", definition: "Resulting in good; doing or producing good.", examples: ["The beneficent donor funded the new hospital wing.", "Her beneficent influence transformed the community.", "He was known as a beneficent leader."], synonyms: ["benevolent", "charitable", "philanthropic"], day: 12, group: 1 },
  { word: "canny", pos: "adjective", arabic: "ذكي / فطن", definition: "Having or showing shrewdness and good judgment, especially in money matters.", examples: ["A canny investor, she spotted the trend early.", "His canny political instincts helped him win the election.", "She made a canny purchase that doubled in value."], synonyms: ["shrewd", "astute", "sharp"], day: 12, group: 1 },
  { word: "cavalier", pos: "adjective", arabic: "مستهتر / متعالٍ", definition: "Showing a lack of proper concern; offhand.", examples: ["His cavalier attitude toward safety alarmed his coworkers.", "She gave a cavalier dismissal of the serious complaint.", "Their cavalier treatment of customer data caused a scandal."], synonyms: ["dismissive", "offhand", "nonchalant"], day: 12, group: 1 },
  { word: "distressed", pos: "adjective", arabic: "متضايق / مكروب", definition: "Suffering from anxiety, sorrow, or pain.", examples: ["The distressed parents waited for news of their son.", "She made a distressed phone call to her sister.", "Distressed homeowners turned to the government for help."], synonyms: ["troubled", "anguished", "upset"], day: 12, group: 1 },
  { word: "dwindling", pos: "adjective", arabic: "متناقص / متضائل", definition: "Diminishing gradually in size, amount, or strength.", examples: ["The town's dwindling population worried local leaders.", "We watched the dwindling supply of food with concern.", "His dwindling savings forced him to seek a new job."], synonyms: ["diminishing", "shrinking", "declining"], day: 12, group: 1 },
  { word: "eclipse", pos: "verb", arabic: "يحجب / يطغى", definition: "To deprive of significance, power, or prominence; to overshadow.", examples: ["Her achievements eclipsed those of her older brother.", "The new product eclipsed all competitors in the market.", "His fame eventually eclipsed his former mentor's."], synonyms: ["overshadow", "outshine", "surpass"], day: 12, group: 1 },
  { word: "encyclopedic", pos: "adjective", arabic: "موسوعي / شامل", definition: "Comprehensive in terms of information.", examples: ["He has an encyclopedic knowledge of baseball statistics.", "Her encyclopedic memory amazed her professors.", "The book provides an encyclopedic survey of art history."], synonyms: ["comprehensive", "exhaustive", "thorough"], day: 12, group: 1 },
  { word: "exacerbate", pos: "verb", arabic: "يزيد سوءاً", definition: "To make a problem, bad situation, or negative feeling worse.", examples: ["His comments only exacerbated the tense situation.", "The drought exacerbated the food shortage.", "Stress can exacerbate existing health conditions."], synonyms: ["worsen", "aggravate", "intensify"], day: 12, group: 1 },

  // Day 12 Group 2
  { word: "exasperated", pos: "adjective", arabic: "محبط / غاضب", definition: "Intensely irritated and frustrated.", examples: ["She gave an exasperated sigh at his stubbornness.", "The exasperated teacher repeated the instructions again.", "He became exasperated by the endless delays."], synonyms: ["frustrated", "irritated", "annoyed"], day: 12, group: 2 },
  { word: "fungible", pos: "adjective", arabic: "قابل للاستبدال", definition: "Replaceable by another identical item; mutually interchangeable.", examples: ["Cash is a fungible commodity easily exchanged for goods.", "Most workers are not as fungible as employers think.", "Oil is a fungible resource on the global market."], synonyms: ["interchangeable", "exchangeable", "substitutable"], day: 12, group: 2 },
  { word: "hackneyed", pos: "adjective", arabic: "مبتذل / مستهلك", definition: "Lacking significance through having been overused; unoriginal.", examples: ["The film relied on hackneyed romantic clichés.", "His speech was full of hackneyed phrases.", "She avoided hackneyed metaphors in her writing."], synonyms: ["cliched", "trite", "stale"], day: 12, group: 2 },
  { word: "incongruous", pos: "adjective", arabic: "غير منسجم / غير ملائم", definition: "Not in harmony or keeping with the surroundings; out of place.", examples: ["The modern building looked incongruous next to the old church.", "His casual clothes seemed incongruous at the formal event.", "There is something incongruous about her cheerful tone."], synonyms: ["mismatched", "discordant", "inappropriate"], day: 12, group: 2 },
  { word: "interchangeable", pos: "adjective", arabic: "قابل للتبادل", definition: "Able to be exchanged with each other without affecting the way something works.", examples: ["The terms are essentially interchangeable in everyday speech.", "These printer cartridges are interchangeable across models.", "Their roles on the team became almost interchangeable."], synonyms: ["exchangeable", "fungible", "equivalent"], day: 12, group: 2 },
  { word: "laconic", pos: "adjective", arabic: "مقتضب / موجز", definition: "Using very few words; concise to the point of seeming rude.", examples: ["He gave a laconic reply: \"Yes.\"", "Her laconic style of speech was sometimes mistaken for rudeness.", "The laconic message left them with more questions than answers."], synonyms: ["terse", "brief", "succinct"], day: 12, group: 2 },
  { word: "lucrative", pos: "adjective", arabic: "مربح", definition: "Producing a great deal of profit.", examples: ["He took a lucrative job offer with a tech startup.", "The deal proved to be highly lucrative for both parties.", "Real estate can be a lucrative investment in the right market."], synonyms: ["profitable", "remunerative", "gainful"], day: 12, group: 2 },
  { word: "magisterial", pos: "adjective", arabic: "مرجعي / متسلط", definition: "Having or showing great authority; commanding.", examples: ["She delivered a magisterial lecture on European history.", "His magisterial tone left no room for argument.", "The judge's magisterial presence dominated the courtroom."], synonyms: ["authoritative", "commanding", "imperious"], day: 12, group: 2 },
  { word: "onerous", pos: "adjective", arabic: "شاق / مرهق", definition: "Involving an amount of effort and difficulty that is oppressively burdensome.", examples: ["She found her caregiving duties increasingly onerous.", "The contract imposed onerous conditions on the supplier.", "Cleaning the entire house alone proved an onerous task."], synonyms: ["burdensome", "arduous", "demanding"], day: 12, group: 2 },
  { word: "opprobrium", pos: "noun", arabic: "عار / ازدراء", definition: "Harsh criticism or censure; public disgrace arising from shameful conduct.", examples: ["The scandal brought opprobrium on the entire family.", "His decision drew opprobrium from former allies.", "She faced public opprobrium for her controversial remarks."], synonyms: ["disgrace", "scorn", "censure"], day: 12, group: 2 },

  // Day 12 Group 3
  { word: "parsimonious", pos: "adjective", arabic: "بخيل / شحيح", definition: "Unwilling to spend money or use resources; very stingy.", examples: ["His parsimonious nature meant he never tipped waiters.", "The parsimonious budget cut every nonessential program.", "She lived a parsimonious life despite her great wealth."], synonyms: ["stingy", "miserly", "frugal"], day: 12, group: 3 },
  { word: "peripheral", pos: "adjective", arabic: "هامشي / ثانوي", definition: "Relating to or situated on the edge or periphery; of secondary importance.", examples: ["His role in the project was peripheral at best.", "She caught a peripheral glimpse of the moving figure.", "The committee dealt only with peripheral issues."], synonyms: ["marginal", "secondary", "minor"], day: 12, group: 3 },
  { word: "provocative", pos: "adjective", arabic: "استفزازي / مثير", definition: "Causing annoyance, anger, or strong reaction, deliberately or not.", examples: ["His provocative comments started a heated debate.", "The book contains several provocative theories.", "She wore a provocative outfit to the gala."], synonyms: ["inflammatory", "incendiary", "stimulating"], day: 12, group: 3 },
  { word: "renounce", pos: "verb", arabic: "يتخلى عن / يتنصل", definition: "To formally declare one's abandonment of a claim, right, or possession.", examples: ["He renounced his citizenship to start a new life abroad.", "She renounced her former political views.", "The king renounced the throne in favor of his son."], synonyms: ["abandon", "give up", "forswear"], day: 12, group: 3 },
  { word: "tempestuous", pos: "adjective", arabic: "عاصف / مضطرب", definition: "Characterized by strong and turbulent emotion; stormy.", examples: ["They had a tempestuous relationship full of fights.", "The tempestuous sea threatened to capsize the boat.", "His tempestuous temper got him into trouble."], synonyms: ["stormy", "turbulent", "tumultuous"], day: 12, group: 3 },
  { word: "tenable", pos: "adjective", arabic: "قابل للدفاع عنه", definition: "Able to be maintained or defended against attack or objection.", examples: ["Her position is no longer tenable given the new evidence.", "The argument is tenable but requires further support.", "He found his job no longer tenable after the merger."], synonyms: ["defensible", "sustainable", "justifiable"], day: 12, group: 3 },
  { word: "transgression", pos: "noun", arabic: "انتهاك / تجاوز", definition: "An act that goes against a law, rule, or code of conduct.", examples: ["He apologized for his transgression against the team.", "Even minor transgressions were punished severely.", "The court ruled it a serious transgression of privacy laws."], synonyms: ["violation", "offense", "infraction"], day: 12, group: 3 },
  { word: "urbane", pos: "adjective", arabic: "مهذب / متحضر", definition: "Suave, courteous, and refined in manner.", examples: ["His urbane charm made him popular at diplomatic events.", "She admired his urbane wit and easy conversation.", "The urbane host put every guest at ease."], synonyms: ["sophisticated", "polished", "refined"], day: 12, group: 3 },
  { word: "verisimilitude", pos: "noun", arabic: "شبه حقيقة / مظهر الحقيقة", definition: "The appearance of being true or real.", examples: ["The novel's verisimilitude makes it feel like a memoir.", "Authors strive for verisimilitude in historical fiction.", "His detailed account had a striking verisimilitude."], synonyms: ["realism", "authenticity", "credibility"], day: 12, group: 3 },
  { word: "vitiate", pos: "verb", arabic: "يفسد / يبطل", definition: "To spoil or impair the quality or efficiency of.", examples: ["The contract was vitiated by the discovery of fraud.", "Pollution can vitiate the air in major cities.", "His bias vitiated the credibility of the report."], synonyms: ["impair", "spoil", "invalidate"], day: 12, group: 3 },

  // Day 13 Group 1
  { word: "affinity", pos: "noun", arabic: "ميل / قرابة", definition: "A spontaneous or natural liking for someone or something.", examples: ["She has a natural affinity for working with children.", "He felt an immediate affinity with the new town.", "There is a clear affinity between the two languages."], synonyms: ["liking", "rapport", "kinship"], day: 13, group: 1 },
  { word: "altruistic", pos: "adjective", arabic: "إيثاري / غيري", definition: "Showing a disinterested and selfless concern for the well-being of others.", examples: ["Her altruistic actions inspired others to volunteer.", "The donation was a purely altruistic gesture.", "Few decisions in business are purely altruistic."], synonyms: ["selfless", "unselfish", "philanthropic"], day: 13, group: 1 },
  { word: "baroque", pos: "adjective", arabic: "مزخرف / متكلف", definition: "Highly ornate and extravagant in style.", examples: ["The cathedral features stunning baroque architecture.", "Her writing has a baroque richness of detail.", "The room was decorated in a baroque style."], synonyms: ["ornate", "elaborate", "flamboyant"], day: 13, group: 1 },
  { word: "byzantine", pos: "adjective", arabic: "معقد بشكل مفرط", definition: "Excessively complicated, typically involving a great deal of administrative detail.", examples: ["The tax code is famously byzantine.", "Their byzantine bureaucracy delayed every approval.", "He navigated the byzantine rules with surprising skill."], synonyms: ["complex", "convoluted", "intricate"], day: 13, group: 1 },
  { word: "compromise", pos: "verb", arabic: "يتنازل / يساوم", definition: "To settle a dispute by mutual concession; to expose to risk or danger.", examples: ["Both sides had to compromise to reach an agreement.", "The leak compromised the security of the entire system.", "She refused to compromise her ethical standards."], synonyms: ["settle", "concede", "endanger"], day: 13, group: 1 },
  { word: "conciliatory", pos: "adjective", arabic: "تصالحي / مهدّئ", definition: "Intended or likely to placate or pacify.", examples: ["He took a conciliatory tone in his apology.", "Her conciliatory gesture eased the tension.", "The president made a conciliatory speech to the opposition."], synonyms: ["appeasing", "placatory", "peacemaking"], day: 13, group: 1 },
  { word: "countenance", pos: "verb", arabic: "يقبل / يؤيد", definition: "To admit as acceptable or possible; to support.", examples: ["The board would not countenance such reckless spending.", "She refused to countenance any further delays.", "He could not countenance dishonesty in his employees."], synonyms: ["tolerate", "endorse", "approve"], day: 13, group: 1 },
  { word: "covert", pos: "adjective", arabic: "سري / خفي", definition: "Not openly acknowledged or displayed.", examples: ["The agency conducted a covert operation overseas.", "She gave him a covert glance across the room.", "Their covert support helped the cause succeed."], synonyms: ["secret", "hidden", "clandestine"], day: 13, group: 1 },
  { word: "credible", pos: "adjective", arabic: "موثوق به / مقنع", definition: "Able to be believed; convincing.", examples: ["The witness gave a credible account of the incident.", "She is a credible candidate for the position.", "His story sounded credible at first."], synonyms: ["believable", "convincing", "plausible"], day: 13, group: 1 },
  { word: "diffuse", pos: "verb", arabic: "ينشر / ينتشر", definition: "To spread out over a large area; to become widely scattered.", examples: ["The aroma of coffee diffused throughout the house.", "Knowledge diffuses quickly in the digital age.", "Tensions began to diffuse after the meeting."], synonyms: ["disperse", "spread", "scatter"], day: 13, group: 1 },

  // Day 13 Group 2
  { word: "documentary", pos: "adjective", arabic: "وثائقي / موثق", definition: "Consisting of or based on official documents or factual records.", examples: ["She produced a documentary film about climate change.", "The book offers documentary evidence of the events.", "He provided documentary proof of his ownership."], synonyms: ["factual", "recorded", "evidentiary"], day: 13, group: 2 },
  { word: "exhaustive", pos: "adjective", arabic: "شامل / مستوفٍ", definition: "Examining, including, or considering all elements or aspects; fully comprehensive.", examples: ["The committee conducted an exhaustive review of the policy.", "He gave an exhaustive list of his complaints.", "The investigation was exhaustive but inconclusive."], synonyms: ["comprehensive", "thorough", "complete"], day: 13, group: 2 },
  { word: "exhilarating", pos: "adjective", arabic: "مبهج / منعش", definition: "Making one feel very happy, animated, or elated; thrilling.", examples: ["Skydiving was the most exhilarating experience of her life.", "The exhilarating victory left fans cheering for hours.", "She found the brisk mountain air exhilarating."], synonyms: ["thrilling", "invigorating", "exciting"], day: 13, group: 2 },
  { word: "extraneous", pos: "adjective", arabic: "دخيل / غير ضروري", definition: "Irrelevant or unrelated to the subject being dealt with.", examples: ["She removed all extraneous details from the report.", "Don't include extraneous information in your essay.", "The extraneous noise made the recording difficult to use."], synonyms: ["irrelevant", "extra", "superfluous"], day: 13, group: 2 },
  { word: "fervor", pos: "noun", arabic: "حماس / حرارة", definition: "Intense and passionate feeling.", examples: ["She spoke with great fervor about the cause.", "The political rally was filled with patriotic fervor.", "His religious fervor inspired everyone around him."], synonyms: ["passion", "zeal", "ardor"], day: 13, group: 2 },
  { word: "futile", pos: "adjective", arabic: "عبثي / بلا جدوى", definition: "Incapable of producing any useful result; pointless.", examples: ["All his attempts to convince her were futile.", "It was a futile effort to fix the broken machine.", "Resistance proved futile against the overwhelming force."], synonyms: ["useless", "pointless", "ineffective"], day: 13, group: 2 },
  { word: "illusory", pos: "adjective", arabic: "وهمي / خادع", definition: "Based on illusion; not real.", examples: ["His sense of security turned out to be illusory.", "The promise of easy money was illusory.", "She realized her happiness had been illusory."], synonyms: ["unreal", "imaginary", "deceptive"], day: 13, group: 2 },
  { word: "invidious", pos: "adjective", arabic: "مكروه / مثير للاستياء", definition: "Likely to arouse resentment or anger in others; unfair.", examples: ["It would be invidious to single out one student for praise.", "The judge faced an invidious choice between two evils.", "She was put in the invidious position of having to choose."], synonyms: ["unfair", "discriminatory", "hateful"], day: 13, group: 2 },
  { word: "lethargic", pos: "adjective", arabic: "خامل / متبلد", definition: "Affected by lethargy; sluggish and apathetic.", examples: ["The hot weather made everyone feel lethargic.", "He was lethargic after staying up all night.", "Her lethargic response surprised the energetic team."], synonyms: ["sluggish", "torpid", "listless"], day: 13, group: 2 },
  { word: "metaphorical", pos: "adjective", arabic: "مجازي / استعاري", definition: "Characteristic of or relating to metaphor; figurative.", examples: ["The journey was metaphorical, not actually traveled.", "His speech was full of metaphorical language.", "She used a metaphorical phrase to describe her feelings."], synonyms: ["figurative", "symbolic", "allegorical"], day: 13, group: 2 },

  // Day 13 Group 3
  { word: "mimic", pos: "verb", arabic: "يقلد / يحاكي", definition: "To imitate someone or something, especially in order to entertain or ridicule.", examples: ["The parrot can mimic human speech remarkably well.", "She loved to mimic her teacher's voice.", "The new material can mimic the look of natural wood."], synonyms: ["imitate", "copy", "impersonate"], day: 13, group: 3 },
  { word: "numinous", pos: "adjective", arabic: "روحاني / غامض", definition: "Having a strong religious or spiritual quality; mysterious.", examples: ["The cathedral had a numinous atmosphere that hushed visitors.", "Her painting captured a numinous quality of light.", "He described the experience as numinous and unforgettable."], synonyms: ["spiritual", "mystical", "sacred"], day: 13, group: 3 },
  { word: "obscure", pos: "adjective", arabic: "غامض / مجهول", definition: "Not discovered or known about; uncertain.", examples: ["The poet remained obscure until after his death.", "His motives are obscure even to his closest friends.", "She quoted from an obscure Victorian novel."], synonyms: ["unknown", "unclear", "vague"], day: 13, group: 3 },
  { word: "overt", pos: "adjective", arabic: "علني / صريح", definition: "Done or shown openly; not secret or hidden.", examples: ["There was no overt hostility between the rivals.", "She gave an overt signal that she was ready to leave.", "The discrimination was overt and undeniable."], synonyms: ["open", "manifest", "obvious"], day: 13, group: 3 },
  { word: "pellucid", pos: "adjective", arabic: "واضح / شفاف", definition: "Translucently clear; easily understood.", examples: ["The pellucid water revealed colorful fish below.", "Her pellucid prose made the difficult topic accessible.", "He admired the pellucid blue of the morning sky."], synonyms: ["clear", "transparent", "lucid"], day: 13, group: 3 },
  { word: "perpetuate", pos: "verb", arabic: "يديم / يخلد", definition: "To make something continue indefinitely.", examples: ["The textbook perpetuates outdated stereotypes.", "We should not perpetuate this harmful tradition.", "The foundation was created to perpetuate her legacy."], synonyms: ["continue", "preserve", "maintain"], day: 13, group: 3 },
  { word: "rational", pos: "adjective", arabic: "عقلاني / منطقي", definition: "Based on or in accordance with reason or logic.", examples: ["She made a rational decision after weighing the options.", "His rational explanation calmed everyone down.", "There is no rational basis for that fear."], synonyms: ["logical", "reasoned", "sensible"], day: 13, group: 3 },
  { word: "scathing", pos: "adjective", arabic: "لاذع / قارص", definition: "Witheringly scornful; severely critical.", examples: ["The critic wrote a scathing review of the film.", "She offered a scathing assessment of the proposal.", "His scathing remarks left her in tears."], synonyms: ["harsh", "biting", "caustic"], day: 13, group: 3 },
  { word: "subtle", pos: "adjective", arabic: "دقيق / لطيف", definition: "So delicate or precise as to be difficult to analyze or describe.", examples: ["There is a subtle difference between the two shades of blue.", "His subtle humor went unnoticed by most.", "She made subtle changes to improve the design."], synonyms: ["delicate", "nuanced", "refined"], day: 13, group: 3 },
  { word: "superficial", pos: "adjective", arabic: "سطحي / ظاهري", definition: "Existing or occurring at or on the surface; not thorough or deep.", examples: ["His knowledge of the subject is superficial at best.", "She suffered only superficial injuries from the fall.", "Their friendship was superficial and short-lived."], synonyms: ["shallow", "surface-level", "cursory"], day: 13, group: 3 },

  // Day 14 Group 1
  { word: "acquiesce", pos: "verb", arabic: "يذعن / يوافق على مضض", definition: "To accept something reluctantly but without protest.", examples: ["She acquiesced to her parents' demands without argument.", "He acquiesced in the decision rather than start a fight.", "The committee acquiesced to the new policy."], synonyms: ["agree", "consent", "comply"], day: 14, group: 1 },
  { word: "adroit", pos: "adjective", arabic: "ماهر / بارع", definition: "Clever or skillful in using the hands or mind.", examples: ["She was adroit at handling difficult customers.", "His adroit handling of the negotiations saved the deal.", "The pianist's adroit fingers flew across the keys."], synonyms: ["skillful", "deft", "dexterous"], day: 14, group: 1 },
  { word: "amend", pos: "verb", arabic: "يعدّل / يصحح", definition: "To make minor changes in order to make fairer or more accurate.", examples: ["Congress voted to amend the existing law.", "She had to amend her report after finding new data.", "He tried to amend his behavior after the warning."], synonyms: ["modify", "revise", "alter"], day: 14, group: 1 },
  { word: "animus", pos: "noun", arabic: "عداوة / ضغينة", definition: "Hostility or ill feeling.", examples: ["There is a clear animus between the two leaders.", "His animus toward his former boss was obvious.", "The animus in the courtroom was palpable."], synonyms: ["hostility", "antagonism", "enmity"], day: 14, group: 1 },
  { word: "apologist", pos: "noun", arabic: "مدافع عن فكرة", definition: "A person who offers an argument in defense of something controversial.", examples: ["She is an apologist for unrestricted free trade.", "He became an apologist for the new policy.", "Apologists for the regime ignored its abuses."], synonyms: ["defender", "advocate", "supporter"], day: 14, group: 1 },
  { word: "astringent", pos: "adjective", arabic: "صارم / لاذع", definition: "Sharp or severe in manner or style.", examples: ["The critic offered an astringent review of the play.", "Her astringent wit made her a feared interviewer.", "He gave an astringent reply to the foolish question."], synonyms: ["harsh", "severe", "biting"], day: 14, group: 1 },
  { word: "collaborate", pos: "verb", arabic: "يتعاون", definition: "To work jointly on an activity or project.", examples: ["The two scientists collaborated on the groundbreaking study.", "She collaborated with her husband on the novel.", "Several departments must collaborate to launch the product."], synonyms: ["cooperate", "team up", "partner"], day: 14, group: 1 },
  { word: "competent", pos: "adjective", arabic: "كفء / قادر", definition: "Having the necessary ability, knowledge, or skill to do something successfully.", examples: ["She is a highly competent administrator.", "He proved competent in handling the crisis.", "We need a competent translator for this document."], synonyms: ["capable", "skilled", "proficient"], day: 14, group: 1 },
  { word: "correlate", pos: "verb", arabic: "يربط / يرتبط", definition: "To have a mutual relationship or connection.", examples: ["Studies show that exercise correlates with better mood.", "The data correlates closely with last year's findings.", "He tried to correlate the two sets of results."], synonyms: ["connect", "link", "associate"], day: 14, group: 1 },
  { word: "deride", pos: "verb", arabic: "يسخر / يستهزئ", definition: "To express contempt for; to ridicule.", examples: ["Critics derided the movie as a shallow imitation.", "His ideas were derided by the scientific community.", "She refused to deride her opponents in public."], synonyms: ["mock", "ridicule", "scorn"], day: 14, group: 1 },

  // Day 14 Group 2
  { word: "dictate", pos: "verb", arabic: "يملي / يفرض", definition: "To lay down authoritatively; to prescribe.", examples: ["Tradition dictates that the bride wears white.", "He tried to dictate every detail of the project.", "Common sense dictates we leave before the storm hits."], synonyms: ["command", "prescribe", "ordain"], day: 14, group: 2 },
  { word: "discreet", pos: "adjective", arabic: "حذر / كتوم", definition: "Careful and prudent in one's speech or actions, especially to keep something confidential.", examples: ["She made a discreet inquiry about the job opening.", "His discreet handling of the situation avoided embarrassment.", "Please be discreet about what you saw last night."], synonyms: ["prudent", "cautious", "tactful"], day: 14, group: 2 },
  { word: "divorced", pos: "adjective", arabic: "منفصل / منسلخ", definition: "Separated or disconnected from something.", examples: ["His theories are divorced from practical reality.", "She felt divorced from the community after moving away.", "The plan was divorced from the company's actual needs."], synonyms: ["separated", "detached", "disconnected"], day: 14, group: 2 },
  { word: "elitist", pos: "adjective", arabic: "نخبوي", definition: "Relating to or supporting the view that a society should be led by an elite.", examples: ["The school was criticized for its elitist admissions policy.", "His elitist attitude alienated his coworkers.", "Critics called the new club exclusive and elitist."], synonyms: ["snobbish", "exclusive", "supremacist"], day: 14, group: 2 },
  { word: "exacting", pos: "adjective", arabic: "متطلب / صارم", definition: "Making great demands on one's skill, attention, or other resources.", examples: ["She has exacting standards for her employees.", "The exacting work required hours of careful focus.", "He is an exacting critic who misses nothing."], synonyms: ["demanding", "rigorous", "strict"], day: 14, group: 2 },
  { word: "flummoxed", pos: "adjective", arabic: "مرتبك / محتار", definition: "Bewildered or perplexed.", examples: ["He was flummoxed by the unexpected question.", "The detective was flummoxed by the missing clues.", "She looked flummoxed when she opened the strange package."], synonyms: ["bewildered", "perplexed", "baffled"], day: 14, group: 2 },
  { word: "fruitful", pos: "adjective", arabic: "مثمر / منتج", definition: "Producing good or helpful results; productive.", examples: ["The meeting proved to be a fruitful exchange of ideas.", "Their collaboration was long and fruitful.", "She had a fruitful career in research."], synonyms: ["productive", "beneficial", "rewarding"], day: 14, group: 2 },
  { word: "inborn", pos: "adjective", arabic: "فطري / موروث", definition: "Existing from birth; natural.", examples: ["She has an inborn talent for music.", "His inborn curiosity drove him to study science.", "Some traits appear to be inborn rather than learned."], synonyms: ["innate", "inherent", "natural"], day: 14, group: 2 },
  { word: "polymath", pos: "noun", arabic: "موسوعي / متعدد المعارف", definition: "A person of wide-ranging knowledge or learning.", examples: ["Leonardo da Vinci was a true polymath of his era.", "The professor is a polymath equally at home in physics and philosophy.", "She is admired as a modern polymath."], synonyms: ["scholar", "intellectual", "Renaissance person"], day: 14, group: 2 },
  { word: "reticent", pos: "adjective", arabic: "متحفظ / كتوم", definition: "Not revealing one's thoughts or feelings readily.", examples: ["He was reticent about his personal life.", "She remained reticent during the family discussion.", "The witness was reticent in answering the lawyer's questions."], synonyms: ["reserved", "taciturn", "uncommunicative"], day: 14, group: 2 },

  // Day 14 Group 3
  { word: "stringent", pos: "adjective", arabic: "صارم / مشدد", definition: "Strict, precise, and exacting.", examples: ["The factory has stringent safety regulations.", "She imposed stringent rules on the household.", "Stringent standards apply to imported food products."], synonyms: ["strict", "rigorous", "tough"], day: 14, group: 3 },
  { word: "subservient", pos: "adjective", arabic: "خاضع / تابع", definition: "Prepared to obey others unquestioningly.", examples: ["He resented being treated in a subservient manner.", "She refused to be subservient to her older brother.", "The company expects employees to be subservient to management."], synonyms: ["submissive", "obedient", "servile"], day: 14, group: 3 },
  { word: "surreptitious", pos: "adjective", arabic: "خفي / متستر", definition: "Kept secret, especially because it would not be approved of.", examples: ["He took a surreptitious glance at his phone during the meeting.", "Their surreptitious meetings were eventually discovered.", "She made a surreptitious copy of the document."], synonyms: ["secret", "stealthy", "furtive"], day: 14, group: 3 },
  { word: "tantalizing", pos: "adjective", arabic: "مغرٍ / مثير للشهية", definition: "Tormenting or teasing with the sight or promise of something unobtainable.", examples: ["The tantalizing aroma of fresh bread filled the kitchen.", "She offered a tantalizing hint about the surprise.", "The tantalizing prospect of victory kept them going."], synonyms: ["tempting", "alluring", "enticing"], day: 14, group: 3 },
  { word: "tantamount", pos: "adjective", arabic: "مساوٍ / يعادل", definition: "Equivalent in seriousness to; virtually the same as.", examples: ["His silence was tantamount to an admission of guilt.", "Refusing to vote is tantamount to supporting the status quo.", "Such an act would be tantamount to treason."], synonyms: ["equivalent", "equal", "comparable"], day: 14, group: 3 },
  { word: "torpor", pos: "noun", arabic: "خمول / تبلد", definition: "A state of physical or mental inactivity; lethargy.", examples: ["A heavy meal often induces torpor in the afternoon.", "She struggled to shake off her morning torpor.", "Bears emerge from winter torpor in spring."], synonyms: ["lethargy", "sluggishness", "inertia"], day: 14, group: 3 },
  { word: "trenchant", pos: "adjective", arabic: "حاد / لاذع", definition: "Vigorous or incisive in expression or style.", examples: ["She made a trenchant analysis of the problem.", "His trenchant criticism stung even his supporters.", "The article offered a trenchant view of modern politics."], synonyms: ["incisive", "cutting", "biting"], day: 14, group: 3 },
  { word: "umbrage", pos: "noun", arabic: "إهانة / استياء", definition: "Offense or annoyance.", examples: ["She took umbrage at his careless remark.", "He gave umbrage to many with his blunt opinions.", "There was no need to take umbrage at a simple joke."], synonyms: ["offense", "resentment", "displeasure"], day: 14, group: 3 },
  { word: "versatile", pos: "adjective", arabic: "متعدد المهارات / مرن", definition: "Able to adapt to many different functions or activities.", examples: ["She is a versatile actress who excels in many roles.", "This versatile tool can be used for many tasks.", "He is a versatile athlete who plays several sports."], synonyms: ["adaptable", "flexible", "all-around"], day: 14, group: 3 },
  { word: "wayward", pos: "adjective", arabic: "جامح / متمرد", definition: "Difficult to control or predict because of unusual or perverse behavior.", examples: ["His wayward son finally settled down after years of trouble.", "The wayward ball flew over the fence into the neighbor's yard.", "She tried to guide her wayward students back on track."], synonyms: ["unruly", "willful", "errant"], day: 14, group: 3 },

  // Day 15 Group 1
  { word: "alienate", pos: "verb", arabic: "ينفّر / يبعد", definition: "To cause someone to feel isolated or estranged.", examples: ["His harsh comments alienated many friends.", "The new policy alienated long-time customers.", "She did not want to alienate her closest allies."], synonyms: ["estrange", "isolate", "separate"], day: 15, group: 1 },
  { word: "apathy", pos: "noun", arabic: "لامبالاة", definition: "Lack of interest, enthusiasm, or concern.", examples: ["Voter apathy was blamed for the low turnout.", "His apathy toward school worried his parents.", "The campaign aimed to combat public apathy."], synonyms: ["indifference", "disinterest", "unconcern"], day: 15, group: 1 },
  { word: "apropos", pos: "adjective", arabic: "في محله / مناسب", definition: "Very appropriate to a particular situation; relevant.", examples: ["His comment was apropos of the discussion at hand.", "Her apropos remarks brought the meeting back on track.", "The quote was apropos to the occasion."], synonyms: ["pertinent", "relevant", "fitting"], day: 15, group: 1 },
  { word: "apt", pos: "adjective", arabic: "ملائم / مهيّأ", definition: "Appropriate or suitable in the circumstances; having a tendency.", examples: ["She made an apt comparison between the two writers.", "He is apt to forget important dates.", "It was an apt response to a difficult question."], synonyms: ["fitting", "appropriate", "likely"], day: 15, group: 1 },
  { word: "cloak", pos: "verb", arabic: "يخفي / يستر", definition: "To hide, cover, or disguise.", examples: ["The mountains were cloaked in mist.", "He cloaked his anger behind a polite smile.", "Their plans were cloaked in secrecy."], synonyms: ["conceal", "hide", "mask"], day: 15, group: 1 },
  { word: "consensus", pos: "noun", arabic: "إجماع / توافق", definition: "General agreement among a group of people.", examples: ["The committee reached a consensus after long discussion.", "There is broad consensus on the need for reform.", "Building consensus takes time but produces lasting results."], synonyms: ["agreement", "accord", "unanimity"], day: 15, group: 1 },
  { word: "distort", pos: "verb", arabic: "يشوّه / يحرّف", definition: "To pull or twist out of shape; to give a misleading account of.", examples: ["The newspaper distorted his comments out of context.", "Heat distorted the plastic container.", "Fear can distort our perception of risk."], synonyms: ["twist", "warp", "misrepresent"], day: 15, group: 1 },
  { word: "divergent", pos: "adjective", arabic: "متباين / متفرّع", definition: "Tending to be different or develop in different directions.", examples: ["The two reports offered divergent conclusions.", "Their divergent paths eventually led them apart.", "Critics held divergent opinions about the film."], synonyms: ["differing", "varying", "disparate"], day: 15, group: 1 },
  { word: "elated", pos: "adjective", arabic: "مبتهج / فرح جداً", definition: "Make someone ecstatically happy.", examples: ["She was elated when she received the acceptance letter.", "The team felt elated after winning the championship.", "He was elated by the news of his promotion."], synonyms: ["overjoyed", "ecstatic", "thrilled"], day: 15, group: 1 },
  { word: "enchant", pos: "verb", arabic: "يسحر / يفتن", definition: "To fill someone with great delight; to charm.", examples: ["The garden enchanted everyone who visited.", "Her singing voice enchanted the audience.", "He was enchanted by the small village."], synonyms: ["charm", "captivate", "delight"], day: 15, group: 1 },

  // Day 15 Group 2
  { word: "entrenched", pos: "adjective", arabic: "راسخ / متجذر", definition: "Firmly established and difficult to change.", examples: ["Entrenched corruption was hard to root out.", "His entrenched views resisted any new evidence.", "The company's entrenched practices needed reform."], synonyms: ["established", "ingrained", "rooted"], day: 15, group: 2 },
  { word: "exotic", pos: "adjective", arabic: "غريب / أجنبي", definition: "Originating in or characteristic of a distant foreign country.", examples: ["The market sold exotic fruits from across the world.", "She loved traveling to exotic destinations.", "Their menu features exotic spices and ingredients."], synonyms: ["foreign", "unusual", "unfamiliar"], day: 15, group: 2 },
  { word: "exploitative", pos: "adjective", arabic: "استغلالي", definition: "Using a situation or person in an unfair or selfish way.", examples: ["Critics called the labor practices exploitative.", "The company's exploitative tactics drew government scrutiny.", "She refused to participate in such exploitative work."], synonyms: ["abusive", "unfair", "manipulative"], day: 15, group: 2 },
  { word: "foreseeable", pos: "adjective", arabic: "متوقع / يمكن توقعه", definition: "Able to be foreseen or predicted.", examples: ["No major changes are expected in the foreseeable future.", "The accident was a foreseeable result of poor maintenance.", "There is no foreseeable end to the conflict."], synonyms: ["predictable", "anticipated", "expected"], day: 15, group: 2 },
  { word: "forsake", pos: "verb", arabic: "يهجر / يتخلى", definition: "To abandon or leave entirely.", examples: ["He vowed never to forsake his family.", "She forsook her career to raise her children.", "Do not forsake your principles for short-term gain."], synonyms: ["abandon", "desert", "renounce"], day: 15, group: 2 },
  { word: "gratify", pos: "verb", arabic: "يرضي / يسرّ", definition: "To give pleasure or satisfaction to.", examples: ["It gratified him to see his hard work pay off.", "Her promotion gratified her parents enormously.", "The praise gratified the young writer."], synonyms: ["please", "satisfy", "delight"], day: 15, group: 2 },
  { word: "heed", pos: "verb", arabic: "ينتبه إلى / يعير اهتماماً", definition: "To pay attention to; to take notice of.", examples: ["She failed to heed the warnings about the storm.", "Heed the advice of those with experience.", "The driver did not heed the speed limit."], synonyms: ["mind", "consider", "notice"], day: 15, group: 2 },
  { word: "judicious", pos: "adjective", arabic: "حكيم / رشيد", definition: "Having, showing, or done with good judgment or sense.", examples: ["She made a judicious use of the limited budget.", "His judicious decisions earned him widespread respect.", "Judicious investing helped him retire early."], synonyms: ["wise", "prudent", "sensible"], day: 15, group: 2 },
  { word: "lucid", pos: "adjective", arabic: "واضح / مفهوم", definition: "Expressed clearly; easy to understand.", examples: ["She gave a lucid explanation of the complex theory.", "His writing is praised for being lucid and engaging.", "The patient had a brief lucid moment before drifting off."], synonyms: ["clear", "intelligible", "coherent"], day: 15, group: 2 },
  { word: "pertinent", pos: "adjective", arabic: "ذو صلة / مناسب", definition: "Relevant or applicable to a particular matter.", examples: ["She raised several pertinent questions during the meeting.", "Please include any pertinent information in your application.", "His comments were pertinent to the topic at hand."], synonyms: ["relevant", "applicable", "germane"], day: 15, group: 2 },

  // Day 15 Group 3
  { word: "propriety", pos: "noun", arabic: "لياقة / آداب", definition: "Conformity to conventionally accepted standards of behavior or morals.", examples: ["She always behaved with the utmost propriety.", "Critics questioned the propriety of his actions.", "Strict propriety was expected at formal dinners."], synonyms: ["decorum", "etiquette", "decency"], day: 15, group: 3 },
  { word: "scintillating", pos: "adjective", arabic: "لامع / متألق", definition: "Sparkling or shining brightly; brilliantly clever or amusing.", examples: ["She gave a scintillating performance on stage.", "His scintillating wit kept the dinner guests entertained.", "The scintillating stars filled the night sky."], synonyms: ["brilliant", "sparkling", "dazzling"], day: 15, group: 3 },
  { word: "sensational", pos: "adjective", arabic: "مثير / ساحر", definition: "Causing great public interest and excitement; very impressive.", examples: ["The movie's sensational ending stunned audiences.", "She made her sensational debut at age fifteen.", "The newspaper ran sensational headlines about the scandal."], synonyms: ["thrilling", "spectacular", "stunning"], day: 15, group: 3 },
  { word: "sophisticated", pos: "adjective", arabic: "راقٍ / متطور", definition: "Having or showing a great deal of worldly experience or refined taste; complex.", examples: ["She has sophisticated taste in art and music.", "The system uses sophisticated algorithms.", "He preferred a sophisticated wine with dinner."], synonyms: ["cultured", "refined", "advanced"], day: 15, group: 3 },
  { word: "strife", pos: "noun", arabic: "صراع / نزاع", definition: "Angry or bitter disagreement; conflict.", examples: ["The country was torn by years of civil strife.", "Workplace strife reduced team productivity.", "Religious strife divided the community for generations."], synonyms: ["conflict", "discord", "friction"], day: 15, group: 3 },
  { word: "understated", pos: "adjective", arabic: "متحفظ / غير مبالغ", definition: "Presented or expressed in a subtle and effective way.", examples: ["She wore an understated black dress to the gala.", "His understated humor catches you by surprise.", "The film's understated emotion makes it powerful."], synonyms: ["subtle", "restrained", "subdued"], day: 15, group: 3 },
  { word: "unscrupulous", pos: "adjective", arabic: "عديم الضمير", definition: "Having or showing no moral principles; not honest or fair.", examples: ["Unscrupulous brokers preyed on inexperienced investors.", "He was an unscrupulous businessman willing to bend any rule.", "Customers complained about unscrupulous sales tactics."], synonyms: ["dishonest", "unprincipled", "deceitful"], day: 15, group: 3 },
  { word: "veracity", pos: "noun", arabic: "صدق / مصداقية", definition: "Conformity to facts; accuracy and truthfulness.", examples: ["He doubted the veracity of the witness's account.", "Reporters check the veracity of every claim.", "Her veracity has never been questioned."], synonyms: ["truthfulness", "accuracy", "honesty"], day: 15, group: 3 },
  { word: "virulent", pos: "adjective", arabic: "ضارٍ / سام", definition: "Extremely severe or harmful in its effects; bitterly hostile.", examples: ["A virulent strain of the flu spread quickly.", "He launched a virulent attack on his rival in the press.", "The virus proved especially virulent in older patients."], synonyms: ["toxic", "deadly", "vicious"], day: 15, group: 3 },
  { word: "volatile", pos: "adjective", arabic: "متقلب / متطاير", definition: "Liable to change rapidly and unpredictably; explosive.", examples: ["The stock market has been volatile this month.", "He has a volatile temper that flares up easily.", "Gasoline is a highly volatile liquid."], synonyms: ["unstable", "unpredictable", "explosive"], day: 15, group: 3 },

  // Day 16 Group 1
  { word: "antedate", pos: "verb", arabic: "يسبق في التاريخ", definition: "To precede in time; to come before in date.", examples: ["These cave paintings antedate the pyramids by centuries.", "His theories antedate the modern scientific method.", "The agreement antedates the new regulations."], synonyms: ["predate", "precede", "predates"], day: 16, group: 1 },
  { word: "banish", pos: "verb", arabic: "ينفي / يطرد", definition: "To send someone away from a country or place as an official punishment; to drive away.", examples: ["The king banished the disloyal advisor from the kingdom.", "She tried to banish her doubts and move forward.", "The new policy banished smoking from public spaces."], synonyms: ["expel", "exile", "deport"], day: 16, group: 1 },
  { word: "bridle", pos: "verb", arabic: "يكبح / يلجم", definition: "To restrain or control; to show resentment.", examples: ["She tried to bridle her enthusiasm during the meeting.", "He bridled at the suggestion that he had been wrong.", "Strict laws bridled corporate behavior."], synonyms: ["restrain", "curb", "check"], day: 16, group: 1 },
  { word: "comply", pos: "verb", arabic: "يمتثل / يتقيد", definition: "To act in accordance with a wish or command.", examples: ["All employees must comply with the safety regulations.", "She refused to comply with the unfair demand.", "The company will comply with the new tax law."], synonyms: ["obey", "conform", "abide"], day: 16, group: 1 },
  { word: "crestfallen", pos: "adjective", arabic: "مكتئب / محبط", definition: "Sad and disappointed.", examples: ["He looked crestfallen after losing the championship.", "She was crestfallen when her project was rejected.", "The crestfallen team trudged off the field."], synonyms: ["dejected", "downcast", "disheartened"], day: 16, group: 1 },
  { word: "curtail", pos: "verb", arabic: "يقلّص / يختصر", definition: "To reduce in extent or quantity; to impose a restriction on.", examples: ["The company curtailed its spending during the recession.", "Bad weather curtailed our outdoor activities.", "New laws curtailed the rights of protesters."], synonyms: ["reduce", "shorten", "limit"], day: 16, group: 1 },
  { word: "elucidate", pos: "verb", arabic: "يوضّح / يشرح", definition: "To make something clear; to explain.", examples: ["The professor elucidated the difficult concept with examples.", "She tried to elucidate her position in a follow-up email.", "The footnotes help elucidate obscure passages."], synonyms: ["clarify", "explain", "illuminate"], day: 16, group: 1 },
  { word: "evade", pos: "verb", arabic: "يتهرب / يتفادى", definition: "To escape or avoid, especially by cleverness or trickery.", examples: ["He tried to evade the journalist's pointed questions.", "The fugitive managed to evade capture for weeks.", "She evaded paying taxes through complex schemes."], synonyms: ["avoid", "escape", "elude"], day: 16, group: 1 },
  { word: "feckless", pos: "adjective", arabic: "غير مسؤول / فاشل", definition: "Lacking initiative or strength of character; irresponsible.", examples: ["His feckless behavior cost him several jobs.", "The feckless leadership failed to address the crisis.", "She was tired of dealing with her feckless brother."], synonyms: ["irresponsible", "incompetent", "ineffective"], day: 16, group: 1 },
  { word: "fester", pos: "verb", arabic: "يتفاقم / يتقيح", definition: "To become worse or more intense, especially through long-standing neglect.", examples: ["Resentment festered between the rival factions.", "The wound festered because it was not properly treated.", "Unresolved conflicts can fester for years."], synonyms: ["worsen", "rankle", "putrefy"], day: 16, group: 1 },

  // Day 16 Group 2
  { word: "iconoclastic", pos: "adjective", arabic: "محطم للمعتقدات السائدة", definition: "Characterized by attack on cherished beliefs or institutions.", examples: ["His iconoclastic views shocked traditional critics.", "The artist took an iconoclastic approach to portraiture.", "She was known for her iconoclastic ideas in economics."], synonyms: ["rebellious", "subversive", "irreverent"], day: 16, group: 2 },
  { word: "immure", pos: "verb", arabic: "يحبس / يسجن", definition: "To enclose or confine someone against their will.", examples: ["The prisoner was immured in a stone cell for years.", "She felt immured in her tiny apartment during quarantine.", "He immured himself in his study to finish the book."], synonyms: ["imprison", "confine", "incarcerate"], day: 16, group: 2 },
  { word: "improvise", pos: "verb", arabic: "يرتجل", definition: "To create and perform spontaneously without preparation.", examples: ["The musicians improvised a long jazz solo.", "Without notes, she had to improvise her speech.", "He improvised a meal from whatever was in the fridge."], synonyms: ["ad-lib", "extemporize", "wing it"], day: 16, group: 2 },
  { word: "inhibit", pos: "verb", arabic: "يكبح / يثبط", definition: "To hinder, restrain, or prevent an action or process.", examples: ["Fear can inhibit creativity in the workplace.", "The drug inhibits the growth of cancer cells.", "His shyness inhibited him from making friends."], synonyms: ["restrain", "hinder", "suppress"], day: 16, group: 2 },
  { word: "inscrutable", pos: "adjective", arabic: "غامض / لا يُسبر غوره", definition: "Impossible to understand or interpret.", examples: ["His inscrutable expression gave nothing away.", "The ancient text remains inscrutable to scholars.", "She gave an inscrutable smile in response."], synonyms: ["mysterious", "enigmatic", "unfathomable"], day: 16, group: 2 },
  { word: "lionize", pos: "verb", arabic: "يمجّد / يبجّل", definition: "To give a lot of public attention and approval to someone; to treat as a celebrity.", examples: ["The press lionized the young inventor.", "She was lionized after her courageous rescue.", "Critics lionized his debut novel as a masterpiece."], synonyms: ["celebrate", "glorify", "exalt"], day: 16, group: 2 },
  { word: "monotonous", pos: "adjective", arabic: "ممل / رتيب", definition: "Dull, tedious, and repetitious; lacking in variety.", examples: ["The lecture was delivered in a monotonous tone.", "He grew tired of his monotonous office job.", "The monotonous landscape stretched for miles."], synonyms: ["tedious", "repetitive", "dull"], day: 16, group: 2 },
  { word: "peculiar", pos: "adjective", arabic: "غريب / مميز", definition: "Strange or odd; unusual; particular to a place or person.", examples: ["He has a peculiar habit of humming while he works.", "There was a peculiar smell in the basement.", "This dish is peculiar to the southern region."], synonyms: ["odd", "strange", "distinctive"], day: 16, group: 2 },
  { word: "premeditate", pos: "verb", arabic: "يبيّت / يخطط مسبقاً", definition: "To think out or plan an action beforehand.", examples: ["The crime was clearly premeditated, not spontaneous.", "She premeditated her resignation for months.", "He premeditated every step of the negotiation."], synonyms: ["plan", "preplan", "contrive"], day: 16, group: 2 },
  { word: "profligate", pos: "adjective", arabic: "مسرف / مبذّر", definition: "Recklessly extravagant or wasteful in the use of resources.", examples: ["The company's profligate spending led to bankruptcy.", "He led a profligate lifestyle that drained his inheritance.", "Critics condemned the profligate use of water."], synonyms: ["wasteful", "extravagant", "spendthrift"], day: 16, group: 2 },

  // Day 16 Group 3
  { word: "reconcile", pos: "verb", arabic: "يصالح / يوفق بين", definition: "To restore friendly relations; to make compatible.", examples: ["The siblings finally reconciled after years of feuding.", "It was hard to reconcile his words with his actions.", "She tried to reconcile work demands with family life."], synonyms: ["resolve", "settle", "harmonize"], day: 16, group: 3 },
  { word: "refine", pos: "verb", arabic: "يحسّن / يصقل", definition: "To improve something by making small changes; to remove impurities.", examples: ["They worked to refine the manuscript before publication.", "The factory refines crude oil into gasoline.", "She continued to refine her technique over many years."], synonyms: ["improve", "polish", "perfect"], day: 16, group: 3 },
  { word: "relinquish", pos: "verb", arabic: "يتخلى عن / يتنازل", definition: "To voluntarily cease to keep or claim; to give up.", examples: ["He had to relinquish control of the company.", "She refused to relinquish her seat on the board.", "They relinquished their claim to the property."], synonyms: ["give up", "surrender", "abandon"], day: 16, group: 3 },
  { word: "ruminate", pos: "verb", arabic: "يتأمل / يفكر مطولاً", definition: "To think deeply about something.", examples: ["He spent hours ruminating on his next career move.", "She ruminated over the difficult choice for days.", "The author ruminates on the meaning of life in her essay."], synonyms: ["ponder", "contemplate", "reflect"], day: 16, group: 3 },
  { word: "skittish", pos: "adjective", arabic: "نزق / متوتر", definition: "Easily startled or frightened; nervous.", examples: ["The skittish horse shied at every sound.", "Investors are skittish about the volatile market.", "She was skittish about meeting new people."], synonyms: ["nervous", "jumpy", "edgy"], day: 16, group: 3 },
  { word: "superfluous", pos: "adjective", arabic: "زائد / غير ضروري", definition: "Unnecessary, especially through being more than enough.", examples: ["She edited out all superfluous words from the essay.", "His detailed explanation was superfluous; we already understood.", "Many superfluous features cluttered the design."], synonyms: ["excessive", "redundant", "unnecessary"], day: 16, group: 3 },
  { word: "synoptic", pos: "adjective", arabic: "موجز / إجمالي", definition: "Forming or relating to a general summary or overview.", examples: ["The textbook offers a synoptic view of world history.", "She prepared a synoptic report of the year's findings.", "The synoptic chart showed weather across the region."], synonyms: ["summary", "overview", "general"], day: 16, group: 3 },
  { word: "thorough", pos: "adjective", arabic: "شامل / دقيق", definition: "Complete with regard to every detail; not superficial.", examples: ["She gave the report a thorough review.", "The detective conducted a thorough investigation.", "He has a thorough understanding of the subject."], synonyms: ["comprehensive", "complete", "exhaustive"], day: 16, group: 3 },
  { word: "visionary", pos: "adjective", arabic: "رؤيوي / مستبصر", definition: "Thinking about or planning the future with imagination or wisdom.", examples: ["She was a visionary leader who transformed the industry.", "His visionary ideas were ahead of their time.", "The company needs a visionary strategy to survive."], synonyms: ["forward-thinking", "imaginative", "prophetic"], day: 16, group: 3 },
  { word: "vociferous", pos: "adjective", arabic: "صاخب / صريح", definition: "Expressing or characterized by vehement opinions; loud and forceful.", examples: ["She was a vociferous critic of the new policy.", "Vociferous protests filled the streets.", "He gave vociferous support to the cause."], synonyms: ["loud", "outspoken", "clamorous"], day: 16, group: 3 },

  // Day 17 Group 1
  { word: "acclaim", pos: "verb", arabic: "يشيد / يمتدح", definition: "To praise enthusiastically and publicly.", examples: ["The novel was acclaimed by critics around the world.", "Her work has been acclaimed for its originality.", "He was acclaimed as the best player of his generation."], synonyms: ["praise", "applaud", "extol"], day: 17, group: 1 },
  { word: "ascertain", pos: "verb", arabic: "يتحقق من / يتأكد", definition: "To find out something with certainty.", examples: ["Police are still trying to ascertain the cause of the fire.", "We need to ascertain the facts before drawing conclusions.", "She ascertained the meeting time before leaving."], synonyms: ["determine", "verify", "establish"], day: 17, group: 1 },
  { word: "assertive", pos: "adjective", arabic: "حازم / واثق", definition: "Having or showing a confident and forceful personality.", examples: ["She has become more assertive in business meetings.", "His assertive leadership style energized the team.", "Being assertive is different from being aggressive."], synonyms: ["confident", "forceful", "self-assured"], day: 17, group: 1 },
  { word: "bogus", pos: "adjective", arabic: "مزيف / مزور", definition: "Not genuine or true; fake.", examples: ["He was caught using a bogus passport.", "The website turned out to sell bogus products.", "She received a bogus call claiming to be from her bank."], synonyms: ["fake", "counterfeit", "spurious"], day: 17, group: 1 },
  { word: "cataclysmic", pos: "adjective", arabic: "كارثي / مدمر", definition: "Relating to or denoting a violent natural event; disastrous.", examples: ["The volcano erupted in a cataclysmic explosion.", "The war had cataclysmic consequences for the region.", "A cataclysmic decline in fish populations alarmed scientists."], synonyms: ["catastrophic", "disastrous", "devastating"], day: 17, group: 1 },
  { word: "circumscribe", pos: "verb", arabic: "يحدّ / يقيّد", definition: "To restrict something within limits.", examples: ["His authority was circumscribed by the new rules.", "Her freedom was circumscribed by family obligations.", "The treaty circumscribed the king's power."], synonyms: ["restrict", "limit", "confine"], day: 17, group: 1 },
  { word: "complementary", pos: "adjective", arabic: "مكمّل / متمم", definition: "Combining in such a way as to enhance or emphasize each other's qualities.", examples: ["Their skills are complementary, making them an effective team.", "The wine pairs well with complementary flavors in the dish.", "Red and green are complementary colors."], synonyms: ["matching", "supplementary", "corresponding"], day: 17, group: 1 },
  { word: "contentious", pos: "adjective", arabic: "خلافي / مثير للجدل", definition: "Causing or likely to cause an argument; controversial.", examples: ["Immigration remains a contentious political issue.", "He had a contentious relationship with his coworkers.", "The contentious debate lasted into the night."], synonyms: ["controversial", "disputed", "argumentative"], day: 17, group: 1 },
  { word: "disingenuous", pos: "adjective", arabic: "غير صادق / مخادع", definition: "Not candid or sincere, typically by pretending one knows less about something than one really does.", examples: ["His disingenuous apology fooled no one.", "It would be disingenuous to claim the changes were minor.", "She gave a disingenuous explanation for her absence."], synonyms: ["insincere", "deceitful", "dishonest"], day: 17, group: 1 },
  { word: "divulge", pos: "verb", arabic: "يفصح عن / يكشف", definition: "To make known private or sensitive information.", examples: ["She refused to divulge the details of the negotiation.", "He was sworn never to divulge the company's secrets.", "The witness divulged crucial information to the police."], synonyms: ["reveal", "disclose", "expose"], day: 17, group: 1 },

  // Day 17 Group 2
  { word: "dogmatic", pos: "adjective", arabic: "متعصب / جازم", definition: "Inclined to lay down principles as undeniably true.", examples: ["His dogmatic approach allowed no room for debate.", "She was too dogmatic in her religious views.", "The professor's dogmatic style frustrated his students."], synonyms: ["opinionated", "doctrinaire", "assertive"], day: 17, group: 2 },
  { word: "fallacious", pos: "adjective", arabic: "مغلوط / خاطئ", definition: "Based on a mistaken belief; misleading.", examples: ["His argument rests on fallacious reasoning.", "It is fallacious to assume correlation means causation.", "The advertisement made fallacious health claims."], synonyms: ["false", "erroneous", "misleading"], day: 17, group: 2 },
  { word: "foolhardy", pos: "adjective", arabic: "متهور / طائش", definition: "Recklessly bold or rash.", examples: ["It was foolhardy to swim in the rough sea.", "His foolhardy attempt to cross the river ended in disaster.", "Investing all his money in one stock was foolhardy."], synonyms: ["reckless", "rash", "impetuous"], day: 17, group: 2 },
  { word: "hinder", pos: "verb", arabic: "يعيق / يعرقل", definition: "To create difficulties for someone or something, resulting in delay or obstruction.", examples: ["Heavy traffic hindered our journey to the airport.", "Don't let fear hinder your progress.", "Lack of funding hindered the research project."], synonyms: ["impede", "obstruct", "hamper"], day: 17, group: 2 },
  { word: "impair", pos: "verb", arabic: "يضعف / يضرّ", definition: "To weaken or damage something, especially in terms of quality or strength.", examples: ["Lack of sleep can impair your judgment.", "Pollution impairs lung function over time.", "The injury impaired his ability to play professionally."], synonyms: ["damage", "weaken", "harm"], day: 17, group: 2 },
  { word: "impugn", pos: "verb", arabic: "يطعن في / يشكك", definition: "To dispute the truth, validity, or honesty of something.", examples: ["He impugned the witness's credibility in court.", "Her motives were impugned by the press.", "It is unfair to impugn his integrity without evidence."], synonyms: ["challenge", "question", "dispute"], day: 17, group: 2 },
  { word: "incessant", pos: "adjective", arabic: "متواصل / لا ينقطع", definition: "Continuing without pause or interruption.", examples: ["The incessant rain ruined our weekend plans.", "I am tired of his incessant complaining.", "The incessant noise from the construction was unbearable."], synonyms: ["constant", "ceaseless", "continuous"], day: 17, group: 2 },
  { word: "inclined", pos: "adjective", arabic: "ميّال / مهيأ", definition: "Having a tendency or disposition to do something.", examples: ["I am inclined to agree with your assessment.", "She is inclined to be generous with her time.", "He was not inclined to share his feelings."], synonyms: ["disposed", "predisposed", "prone"], day: 17, group: 2 },
  { word: "inveterate", pos: "adjective", arabic: "متأصل / مزمن", definition: "Having a particular habit, activity, or interest that is long-established and unlikely to change.", examples: ["He is an inveterate liar who cannot be trusted.", "She is an inveterate traveler with stamps from forty countries.", "His inveterate optimism was sometimes hard to share."], synonyms: ["habitual", "chronic", "ingrained"], day: 17, group: 2 },
  { word: "miserly", pos: "adjective", arabic: "بخيل / شحيح", definition: "Hating to spend money; very stingy.", examples: ["His miserly habits left him with no friends.", "She gave only a miserly contribution to the charity.", "The company is miserly with employee benefits."], synonyms: ["stingy", "parsimonious", "tightfisted"], day: 17, group: 2 },

  // Day 17 Group 3
  { word: "patent", pos: "adjective", arabic: "واضح / جلي", definition: "Easily recognizable; obvious.", examples: ["His lies were patent to everyone in the room.", "There was a patent need for reform.", "The unfairness of the situation was patent."], synonyms: ["obvious", "evident", "manifest"], day: 17, group: 3 },
  { word: "petulant", pos: "adjective", arabic: "نزق / متذمر", definition: "Childishly sulky or bad-tempered.", examples: ["She gave a petulant reply when corrected.", "His petulant outburst embarrassed his colleagues.", "The petulant child refused to share his toys."], synonyms: ["sulky", "peevish", "fretful"], day: 17, group: 3 },
  { word: "pithy", pos: "adjective", arabic: "موجز / مركّز", definition: "Concise and forcefully expressive.", examples: ["She is known for her pithy one-liners.", "He gave a pithy summary of the long report.", "The author writes in a pithy, memorable style."], synonyms: ["concise", "succinct", "terse"], day: 17, group: 3 },
  { word: "pliant", pos: "adjective", arabic: "مرن / طيّع", definition: "Easily bent or shaped; easily influenced.", examples: ["The pliant branches bent in the wind.", "He prefers a pliant employee who follows orders.", "The leather softened into a pliant, comfortable shape."], synonyms: ["flexible", "malleable", "supple"], day: 17, group: 3 },
  { word: "sanctimonious", pos: "adjective", arabic: "متظاهر بالتقوى", definition: "Making a show of being morally superior to other people.", examples: ["His sanctimonious lectures annoyed his coworkers.", "Critics called the editorial sanctimonious and preachy.", "She gave a sanctimonious response to the simple question."], synonyms: ["self-righteous", "holier-than-thou", "pious"], day: 17, group: 3 },
  { word: "sound", pos: "adjective", arabic: "سليم / صحيح", definition: "In good condition; based on valid reason or good judgment.", examples: ["The bridge is structurally sound and safe to cross.", "She offered sound advice based on years of experience.", "His arguments are logically sound."], synonyms: ["valid", "solid", "reliable"], day: 17, group: 3 },
  { word: "tarnish", pos: "verb", arabic: "يلطّخ / يشوّه", definition: "To lose or cause to lose luster; to damage a reputation.", examples: ["The scandal tarnished his political career.", "Silver tarnishes when exposed to air.", "She refused to let gossip tarnish her good name."], synonyms: ["sully", "stain", "blemish"], day: 17, group: 3 },
  { word: "tepid", pos: "adjective", arabic: "فاتر / غير حماسي", definition: "Showing little enthusiasm; lukewarm in temperature.", examples: ["The audience gave a tepid response to the speech.", "Her tepid endorsement did little to help his campaign.", "He sipped the tepid coffee with a frown."], synonyms: ["lukewarm", "halfhearted", "indifferent"], day: 17, group: 3 },
  { word: "upbraid", pos: "verb", arabic: "يوبخ / يلوم", definition: "To find fault with or scold severely.", examples: ["The coach upbraided the team for their poor performance.", "She upbraided him for being late again.", "He was upbraided by his supervisor for the mistake."], synonyms: ["scold", "reprimand", "rebuke"], day: 17, group: 3 },
  { word: "vexation", pos: "noun", arabic: "إزعاج / غضب", definition: "The state of being annoyed, frustrated, or worried.", examples: ["She showed her vexation by tapping her foot.", "His constant interruptions were a source of vexation.", "Much to her vexation, the meeting ran two hours late."], synonyms: ["annoyance", "frustration", "irritation"], day: 17, group: 3 },

  // Day 18 Group 1
  { word: "abet", pos: "verb", arabic: "يحرّض / يساعد", definition: "To encourage or assist someone to do something wrong.", examples: ["He was charged with aiding and abetting the criminals.", "She refused to abet her brother in his dishonest plan.", "The website was accused of abetting harassment."], synonyms: ["assist", "encourage", "support"], day: 18, group: 1 },
  { word: "accessible", pos: "adjective", arabic: "متاح / يسهل الوصول إليه", definition: "Able to be reached or entered; easily understood.", examples: ["The new building is accessible to people with disabilities.", "Her writing makes complex science accessible to everyone.", "The information is accessible online for free."], synonyms: ["available", "approachable", "obtainable"], day: 18, group: 1 },
  { word: "acquisitive", pos: "adjective", arabic: "محب للاقتناء / طمّاع", definition: "Excessively interested in acquiring money or material things.", examples: ["His acquisitive nature led him to buy more than he needed.", "Critics called the firm acquisitive and aggressive.", "She avoided the acquisitive lifestyle of her peers."], synonyms: ["greedy", "covetous", "materialistic"], day: 18, group: 1 },
  { word: "amalgamate", pos: "verb", arabic: "يدمج / يوحّد", definition: "To combine or unite to form one organization or structure.", examples: ["The two companies amalgamated to form a larger corporation.", "Different traditions amalgamated into a new culture.", "We need to amalgamate the data from all departments."], synonyms: ["combine", "merge", "unite"], day: 18, group: 1 },
  { word: "attenuate", pos: "verb", arabic: "يضعف / يخفف", definition: "To reduce the force, effect, or value of.", examples: ["The medication attenuates the symptoms of allergies.", "Distance attenuates the strength of a signal.", "Her enthusiasm was attenuated by the constant criticism."], synonyms: ["weaken", "diminish", "reduce"], day: 18, group: 1 },
  { word: "augment", pos: "verb", arabic: "يزيد / يعزز", definition: "To make something greater by adding to it.", examples: ["She took a part-time job to augment her income.", "The army was augmented by reinforcements.", "Pictures augment the impact of the article."], synonyms: ["increase", "supplement", "enhance"], day: 18, group: 1 },
  { word: "aversion", pos: "noun", arabic: "نفور / كراهية", definition: "A strong dislike or disinclination.", examples: ["She has a strong aversion to public speaking.", "His aversion to spicy food limits his menu choices.", "He developed an aversion to crowds after the incident."], synonyms: ["dislike", "antipathy", "repugnance"], day: 18, group: 1 },
  { word: "blithe", pos: "adjective", arabic: "مرح / غير مبالٍ", definition: "Showing a casual and cheerful indifference; carefree.", examples: ["She gave a blithe wave as she walked away.", "He took a blithe approach to deadlines that frustrated his boss.", "Her blithe disregard for rules eventually got her in trouble."], synonyms: ["carefree", "cheerful", "lighthearted"], day: 18, group: 1 },
  { word: "contempt", pos: "noun", arabic: "ازدراء / احتقار", definition: "The feeling that a person or thing is worthless or beneath consideration.", examples: ["She showed open contempt for his ridiculous claims.", "He was held in contempt by his former friends.", "The judge held the witness in contempt of court."], synonyms: ["scorn", "disdain", "derision"], day: 18, group: 1 },
  { word: "dawdle", pos: "verb", arabic: "يتباطأ / يتلكأ", definition: "To waste time; to be slow.", examples: ["Don't dawdle, or we'll be late for the movie.", "She dawdled in the bookstore for an hour.", "He dawdled over his coffee, in no rush to leave."], synonyms: ["loiter", "linger", "tarry"], day: 18, group: 1 },

  // Day 18 Group 2
  { word: "deflect", pos: "verb", arabic: "يحرف / يصدّ", definition: "To cause something to change direction; to turn aside.", examples: ["He tried to deflect the criticism with humor.", "The shield deflected the arrow harmlessly.", "She skillfully deflected questions about her past."], synonyms: ["divert", "deflect", "redirect"], day: 18, group: 2 },
  { word: "discount", pos: "verb", arabic: "يستبعد / يقلل من شأن", definition: "To regard as unworthy of consideration; to reduce the price.", examples: ["He discounted the rumors as baseless.", "The store discounted all winter coats by 50%.", "She refused to discount the witness's testimony."], synonyms: ["dismiss", "ignore", "reduce"], day: 18, group: 2 },
  { word: "dissident", pos: "noun", arabic: "معارض / منشق", definition: "A person who opposes official policy, especially of an authoritarian state.", examples: ["The dissident was imprisoned for criticizing the regime.", "Several dissidents fled the country in fear.", "She became a leading dissident voice against the government."], synonyms: ["dissenter", "rebel", "protester"], day: 18, group: 2 },
  { word: "efficacious", pos: "adjective", arabic: "فعّال / مؤثر", definition: "Successful in producing a desired or intended result.", examples: ["The treatment proved highly efficacious in clinical trials.", "Her efficacious leadership turned the company around.", "Few medications are more efficacious than this one."], synonyms: ["effective", "successful", "productive"], day: 18, group: 2 },
  { word: "equitable", pos: "adjective", arabic: "عادل / منصف", definition: "Fair and impartial.", examples: ["They reached an equitable distribution of the inheritance.", "The new policy provides equitable access to education.", "She believes in equitable treatment of all employees."], synonyms: ["fair", "just", "impartial"], day: 18, group: 2 },
  { word: "erratic", pos: "adjective", arabic: "متقلب / غير منتظم", definition: "Not even or regular in pattern or movement; unpredictable.", examples: ["His erratic driving frightened the other passengers.", "The patient's heartbeat became dangerously erratic.", "Her erratic behavior worried her friends."], synonyms: ["unpredictable", "inconsistent", "irregular"], day: 18, group: 2 },
  { word: "industrious", pos: "adjective", arabic: "مجتهد / دؤوب", definition: "Diligent and hard-working.", examples: ["She is an industrious student who never misses an assignment.", "His industrious efforts earned him a promotion.", "The industrious workers finished early."], synonyms: ["diligent", "hardworking", "assiduous"], day: 18, group: 2 },
  { word: "inform", pos: "verb", arabic: "يبلغ / يطلع", definition: "To give someone facts or information; to give an essential or formative quality to.", examples: ["She informed her boss about the change in plans.", "Years of experience inform her teaching style.", "The report informed the committee's decision."], synonyms: ["notify", "tell", "shape"], day: 18, group: 2 },
  { word: "irksome", pos: "adjective", arabic: "مزعج / مغيظ", definition: "Irritating or annoying.", examples: ["The constant noise from the construction was irksome.", "She found his irksome habit of interrupting hard to bear.", "Filling out the long form was an irksome chore."], synonyms: ["annoying", "vexing", "tiresome"], day: 18, group: 2 },
  { word: "manacle", pos: "verb", arabic: "يكبّل / يقيّد", definition: "To fetter or restrain with handcuffs or chains; to constrain.", examples: ["The prisoner was manacled before being led to court.", "He felt manacled by his job's strict requirements.", "Outdated rules manacled the company's growth."], synonyms: ["shackle", "restrain", "fetter"], day: 18, group: 2 },

  // Day 18 Group 3
  { word: "modest", pos: "adjective", arabic: "متواضع / معتدل", definition: "Unassuming in the estimation of one's abilities; relatively moderate.", examples: ["Despite her success, she remained modest about her achievements.", "They live in a modest home in the suburbs.", "He made a modest contribution to the charity."], synonyms: ["humble", "unassuming", "moderate"], day: 18, group: 3 },
  { word: "noxious", pos: "adjective", arabic: "ضار / سام", definition: "Harmful, poisonous, or very unpleasant.", examples: ["The factory released noxious fumes into the air.", "Noxious weeds spread quickly through the garden.", "His noxious comments soured the whole conversation."], synonyms: ["toxic", "harmful", "poisonous"], day: 18, group: 3 },
  { word: "pernicious", pos: "adjective", arabic: "ضار جداً / مهلك", definition: "Having a harmful effect, especially in a gradual or subtle way.", examples: ["The pernicious effects of the drug took years to appear.", "Pernicious gossip slowly destroyed her reputation.", "The teacher warned about the pernicious influence of social media."], synonyms: ["harmful", "destructive", "insidious"], day: 18, group: 3 },
  { word: "predicament", pos: "noun", arabic: "مأزق / ورطة", definition: "A difficult, unpleasant, or embarrassing situation.", examples: ["He found himself in a financial predicament after losing his job.", "She didn't know how to escape the awkward predicament.", "The company is in a serious predicament after the lawsuit."], synonyms: ["dilemma", "quandary", "plight"], day: 18, group: 3 },
  { word: "proficient", pos: "adjective", arabic: "ماهر / متقن", definition: "Competent or skilled in doing or using something.", examples: ["She is proficient in three languages.", "He is proficient at coding in multiple programming languages.", "Years of practice made him proficient in the art."], synonyms: ["skilled", "competent", "adept"], day: 18, group: 3 },
  { word: "prolix", pos: "adjective", arabic: "مسهب / مطنب", definition: "Using or containing too many words; tediously lengthy.", examples: ["His prolix essay could have been half its length.", "The lawyer's prolix arguments tested the judge's patience.", "She tends to be prolix when describing her travels."], synonyms: ["wordy", "verbose", "long-winded"], day: 18, group: 3 },
  { word: "scorn", pos: "noun", arabic: "ازدراء / احتقار", definition: "The feeling or belief that someone or something is worthless or despicable.", examples: ["She greeted his apology with scorn.", "He poured scorn on the politicians' empty promises.", "Her scorn for cheap imitations was well known."], synonyms: ["contempt", "disdain", "derision"], day: 18, group: 3 },
  { word: "subordinate", pos: "adjective", arabic: "تابع / مرؤوس", definition: "Lower in rank or position; of less or secondary importance.", examples: ["He is a subordinate officer in the department.", "Her personal goals were subordinate to her duties.", "The branch managers are subordinate to the regional director."], synonyms: ["secondary", "junior", "lower"], day: 18, group: 3 },
  { word: "unseemly", pos: "adjective", arabic: "غير لائق / غير مناسب", definition: "Not proper or appropriate.", examples: ["His unseemly behavior at the funeral shocked the family.", "It would be unseemly to celebrate during such a tragedy.", "She made an unseemly scene at the restaurant."], synonyms: ["improper", "inappropriate", "indecorous"], day: 18, group: 3 },
  { word: "veritable", pos: "adjective", arabic: "حقيقي / فعلي", definition: "Used as an intensifier, often to qualify a metaphor; genuine.", examples: ["The library is a veritable treasure trove of rare books.", "His office was a veritable jungle of plants.", "The festival was a veritable celebration of local culture."], synonyms: ["genuine", "true", "actual"], day: 18, group: 3 },

  // Day 19 Group 1
  { word: "acolyte", pos: "noun", arabic: "تابع / مريد", definition: "An assistant or follower.", examples: ["The senator was surrounded by his loyal acolytes.", "She was an acolyte of the famous chef for years.", "The guru's acolytes followed his teachings devotedly."], synonyms: ["follower", "disciple", "devotee"], day: 19, group: 1 },
  { word: "anoint", pos: "verb", arabic: "يمسح / يعيّن", definition: "To smear or rub with oil; to nominate or choose for a position.", examples: ["The bishop anointed the new king with sacred oil.", "He was anointed as the founder's successor.", "She was anointed the rising star of the company."], synonyms: ["consecrate", "designate", "appoint"], day: 19, group: 1 },
  { word: "base", pos: "adjective", arabic: "حقير / دنيء", definition: "Without moral principles; ignoble.", examples: ["His base motives became apparent over time.", "She refused to stoop to such base behavior.", "The novel explores the base instincts of its characters."], synonyms: ["ignoble", "low", "vile"], day: 19, group: 1 },
  { word: "coercion", pos: "noun", arabic: "إكراه / إجبار", definition: "The practice of persuading someone to do something by using force or threats.", examples: ["She signed the document under coercion.", "The confession was obtained through coercion and is invalid.", "Coercion has no place in a healthy relationship."], synonyms: ["force", "compulsion", "intimidation"], day: 19, group: 1 },
  { word: "coin", pos: "verb", arabic: "يصكّ / يبتكر مصطلحاً", definition: "To invent or devise a new word or phrase.", examples: ["She coined the term to describe the new phenomenon.", "He coined a phrase that became part of everyday speech.", "Scientists often coin new words for their discoveries."], synonyms: ["invent", "create", "originate"], day: 19, group: 1 },
  { word: "cunning", pos: "adjective", arabic: "ماكر / داهية", definition: "Having or showing skill in achieving one's ends by deceit.", examples: ["The cunning fox outwitted the hunters.", "She came up with a cunning plan to win the contract.", "His cunning smile hid his true intentions."], synonyms: ["crafty", "wily", "shrewd"], day: 19, group: 1 },
  { word: "discomfit", pos: "verb", arabic: "يربك / يحرج", definition: "To make someone feel uneasy or embarrassed.", examples: ["The pointed question discomfited the politician.", "He was discomfited by the unexpected attention.", "She tried not to discomfit her shy guest."], synonyms: ["embarrass", "disconcert", "fluster"], day: 19, group: 1 },
  { word: "dissent", pos: "noun", arabic: "اعتراض / مخالفة", definition: "Holding or expressing opinions at variance with those commonly or officially held.", examples: ["The judge wrote a powerful dissent from the majority opinion.", "Voices of dissent were quickly silenced.", "She voiced her dissent during the heated meeting."], synonyms: ["disagreement", "objection", "opposition"], day: 19, group: 1 },
  { word: "distill", pos: "verb", arabic: "يقطّر / يستخلص", definition: "To extract the essential meaning or most important aspects of.", examples: ["She distilled years of research into a single book.", "Whiskey is distilled from fermented grain.", "He distilled the long discussion into three clear points."], synonyms: ["extract", "refine", "condense"], day: 19, group: 1 },
  { word: "dubious", pos: "adjective", arabic: "مشكوك فيه / مريب", definition: "Hesitating or doubting; not to be relied upon.", examples: ["She was dubious about the safety of the product.", "He has a dubious reputation in the industry.", "The company makes dubious claims about its services."], synonyms: ["doubtful", "questionable", "suspect"], day: 19, group: 1 },

  // Day 19 Group 2
  { word: "ebullient", pos: "adjective", arabic: "مفعم بالحيوية", definition: "Cheerful and full of energy.", examples: ["She was ebullient after receiving the good news.", "His ebullient personality made him popular at parties.", "The ebullient crowd cheered loudly throughout the game."], synonyms: ["exuberant", "enthusiastic", "buoyant"], day: 19, group: 2 },
  { word: "facetious", pos: "adjective", arabic: "مازح / غير جاد", definition: "Treating serious issues with deliberately inappropriate humor.", examples: ["His facetious remarks during the funeral were unwelcome.", "Don't be facetious; this is a serious matter.", "She made a facetious comment that no one found funny."], synonyms: ["flippant", "joking", "tongue-in-cheek"], day: 19, group: 2 },
  { word: "fallible", pos: "adjective", arabic: "قابل للخطأ", definition: "Capable of making mistakes or being erroneous.", examples: ["Even experts are fallible and make mistakes.", "Memory is notoriously fallible over long periods.", "His method, while clever, is still fallible."], synonyms: ["imperfect", "errant", "flawed"], day: 19, group: 2 },
  { word: "florid", pos: "adjective", arabic: "متكلف / منمّق", definition: "Excessively elaborate or complicated; reddish.", examples: ["His florid prose distracted from the simple message.", "She had a florid complexion after the long walk.", "The room's florid decoration overwhelmed the senses."], synonyms: ["ornate", "flowery", "ruddy"], day: 19, group: 2 },
  { word: "gawky", pos: "adjective", arabic: "أخرق / غير لبق", definition: "Nervously awkward and ungainly.", examples: ["He was a gawky teenager who later grew into a graceful adult.", "Her gawky movements made her self-conscious at the dance.", "The gawky young man tripped over his own feet."], synonyms: ["awkward", "clumsy", "ungainly"], day: 19, group: 2 },
  { word: "inveigle", pos: "verb", arabic: "يستدرج / يغوي", definition: "To persuade someone to do something by using deception or flattery.", examples: ["He inveigled his way into the exclusive club.", "She inveigled him into lending her money.", "They tried to inveigle us into signing the contract."], synonyms: ["coax", "wheedle", "entice"], day: 19, group: 2 },
  { word: "jettison", pos: "verb", arabic: "يتخلى عن / يطرح", definition: "To abandon or discard something no longer wanted.", examples: ["The company jettisoned the unprofitable product line.", "She jettisoned her old beliefs and started fresh.", "The pilot had to jettison fuel before the emergency landing."], synonyms: ["discard", "abandon", "dump"], day: 19, group: 2 },
  { word: "mendacity", pos: "noun", arabic: "كذب / خداع", definition: "Untruthfulness; the tendency to lie.", examples: ["The witness's mendacity was exposed during cross-examination.", "His mendacity finally cost him his career.", "The film explores themes of love and mendacity."], synonyms: ["dishonesty", "lying", "deceitfulness"], day: 19, group: 2 },
  { word: "munificent", pos: "adjective", arabic: "كريم / سخي جداً", definition: "More generous than is usual or necessary.", examples: ["The munificent donor gave millions to the museum.", "She received a munificent gift from her grandfather.", "His munificent salary made him the envy of his peers."], synonyms: ["generous", "lavish", "bountiful"], day: 19, group: 2 },
  { word: "naive", pos: "adjective", arabic: "ساذج / بسيط", definition: "Showing a lack of experience, wisdom, or judgment.", examples: ["It was naive of him to trust the stranger so quickly.", "She held a naive belief that everyone was honest.", "His naive questions revealed his inexperience."], synonyms: ["innocent", "unsophisticated", "credulous"], day: 19, group: 2 },

  // Day 19 Group 3
  { word: "noble", pos: "adjective", arabic: "نبيل / شريف", definition: "Having or showing fine personal qualities or high moral principles.", examples: ["He made a noble effort to help the refugees.", "Her noble character earned her widespread respect.", "It was a noble gesture to give up his seat."], synonyms: ["honorable", "virtuous", "righteous"], day: 19, group: 3 },
  { word: "parochial", pos: "adjective", arabic: "ضيق الأفق / محلي", definition: "Having a limited or narrow outlook or scope.", examples: ["His parochial views were challenged by his world travels.", "The town has a parochial mindset that resists change.", "Critics called the policy parochial and short-sighted."], synonyms: ["narrow-minded", "provincial", "insular"], day: 19, group: 3 },
  { word: "pedestrian", pos: "adjective", arabic: "عادي / مبتذل", definition: "Lacking inspiration or excitement; dull.", examples: ["The film's plot was pedestrian and predictable.", "She found his speech rather pedestrian.", "The restaurant served pedestrian food at high prices."], synonyms: ["mundane", "ordinary", "uninspired"], day: 19, group: 3 },
  { word: "prevaricate", pos: "verb", arabic: "يراوغ / يلوي الحقيقة", definition: "To speak or act in an evasive way; to avoid telling the truth.", examples: ["Stop prevaricating and answer the question directly.", "He prevaricated when asked about his finances.", "She tends to prevaricate when caught off guard."], synonyms: ["equivocate", "hedge", "stall"], day: 19, group: 3 },
  { word: "prime", pos: "adjective", arabic: "رئيسي / ممتاز", definition: "Of first importance; of the best possible quality.", examples: ["She is the prime suspect in the investigation.", "This is prime farmland in the region.", "Safety is our prime concern."], synonyms: ["chief", "principal", "top"], day: 19, group: 3 },
  { word: "radical", pos: "adjective", arabic: "جذري / متطرف", definition: "Relating to or affecting the fundamental nature of something; far-reaching.", examples: ["The reform represents a radical change in policy.", "She holds radical views on economic justice.", "They made radical improvements to the design."], synonyms: ["fundamental", "extreme", "revolutionary"], day: 19, group: 3 },
  { word: "recrudescent", pos: "adjective", arabic: "متجدد / عائد بقوة", definition: "Breaking out anew or into renewed activity; reappearing.", examples: ["The doctor warned of recrudescent symptoms.", "There is concern about the recrudescent virus this winter.", "The conflict showed recrudescent violence after years of peace."], synonyms: ["recurring", "renewed", "resurgent"], day: 19, group: 3 },
  { word: "temporal", pos: "adjective", arabic: "زمني / دنيوي", definition: "Relating to time; relating to worldly as opposed to spiritual affairs.", examples: ["The temporal sequence of events was unclear.", "He set aside temporal concerns to focus on spiritual growth.", "The pope holds both temporal and spiritual authority."], synonyms: ["worldly", "earthly", "secular"], day: 19, group: 3 },
  { word: "transitory", pos: "adjective", arabic: "عابر / مؤقت", definition: "Not permanent; lasting only a short time.", examples: ["Fame is often transitory and disappears quickly.", "The pain was transitory and soon faded.", "Beauty is transitory, but kindness lasts."], synonyms: ["temporary", "fleeting", "ephemeral"], day: 19, group: 3 },
  { word: "viable", pos: "adjective", arabic: "قابل للتطبيق / حيوي", definition: "Capable of working successfully; feasible.", examples: ["This is a viable solution to the problem.", "The business plan is viable but risky.", "The candidate offers a viable alternative to the incumbent."], synonyms: ["feasible", "workable", "practicable"], day: 19, group: 3 },

  // Day 20 Group 1
  { word: "abreast", pos: "adverb", arabic: "مواكب / في صف واحد", definition: "Side by side and facing the same way; up to date with the latest news.", examples: ["The two cyclists rode abreast down the country road.", "She keeps abreast of current events through podcasts.", "It is hard to stay abreast of rapid technological change."], synonyms: ["alongside", "informed", "current"], day: 20, group: 1 },
  { word: "confound", pos: "verb", arabic: "يربك / يحيّر", definition: "To cause surprise or confusion; to mix up or confuse.", examples: ["The new findings confounded the experts.", "His unexpected response confounded his critics.", "The strange noise confounded the search team."], synonyms: ["confuse", "perplex", "baffle"], day: 20, group: 1 },
  { word: "digression", pos: "noun", arabic: "استطراد / خروج عن الموضوع", definition: "A temporary departure from the main subject in speech or writing.", examples: ["His lecture was full of amusing digressions.", "She apologized for the digression and returned to her main point.", "The novel's many digressions slow the story."], synonyms: ["tangent", "deviation", "aside"], day: 20, group: 1 },
  { word: "discrepancy", pos: "noun", arabic: "تباين / تناقض", definition: "A lack of compatibility or similarity between two or more facts.", examples: ["The auditor found a discrepancy in the company's books.", "There is a clear discrepancy between his words and actions.", "She noticed a discrepancy in the witness's testimony."], synonyms: ["inconsistency", "difference", "disparity"], day: 20, group: 1 },
  { word: "duplicitous", pos: "adjective", arabic: "مخادع / مزدوج الوجه", definition: "Deceitful; showing two-faced behavior.", examples: ["His duplicitous behavior cost him many friends.", "She was shocked by her partner's duplicitous actions.", "The duplicitous diplomat played both sides."], synonyms: ["deceitful", "two-faced", "treacherous"], day: 20, group: 1 },
  { word: "expedient", pos: "adjective", arabic: "مناسب / ملائم", definition: "Convenient and practical, although possibly improper or immoral.", examples: ["Lying seemed expedient at the moment but caused later problems.", "It was politically expedient to delay the announcement.", "She chose the expedient path rather than the right one."], synonyms: ["convenient", "advantageous", "pragmatic"], day: 20, group: 1 },
  { word: "fabricate", pos: "verb", arabic: "يلفّق / يصنع", definition: "To invent in order to deceive; to construct or manufacture.", examples: ["He was caught fabricating evidence in the case.", "The factory fabricates parts for cars.", "She fabricated an elaborate excuse for her absence."], synonyms: ["invent", "make up", "construct"], day: 20, group: 1 },
  { word: "glum", pos: "adjective", arabic: "كئيب / حزين", definition: "Looking or feeling dejected; morose.", examples: ["He looked glum after losing the championship game.", "She was unusually glum at the celebration.", "The team's glum expressions revealed their disappointment."], synonyms: ["gloomy", "morose", "downcast"], day: 20, group: 1 },
  { word: "harbinger", pos: "noun", arabic: "بشير / منذر", definition: "A person or thing that announces or signals the approach of another.", examples: ["The robin is a harbinger of spring.", "Falling stock prices were a harbinger of recession.", "Her resignation was a harbinger of major changes."], synonyms: ["herald", "forerunner", "precursor"], day: 20, group: 1 },
  { word: "intrinsic", pos: "adjective", arabic: "جوهري / أصيل", definition: "Belonging naturally; essential.", examples: ["The intrinsic value of education cannot be measured in money.", "Honesty is intrinsic to good leadership.", "There is something intrinsic about her warm personality."], synonyms: ["inherent", "essential", "innate"], day: 20, group: 1 },

  // Day 20 Group 2
  { word: "largesse", pos: "noun", arabic: "كرم / سخاء", definition: "Generosity in giving; gifts given generously.", examples: ["The community benefited from his largesse for many years.", "She is known for her largesse toward struggling artists.", "The king's largesse was legendary throughout the realm."], synonyms: ["generosity", "munificence", "bounty"], day: 20, group: 2 },
  { word: "libertine", pos: "noun", arabic: "ماجن / مستهتر", definition: "A person, especially a man, who behaves without moral principles.", examples: ["The libertine ignored social conventions entirely.", "He was a libertine in his youth, but mellowed with age.", "The novel's hero is a charming libertine."], synonyms: ["hedonist", "rake", "profligate"], day: 20, group: 2 },
  { word: "malfeasance", pos: "noun", arabic: "إساءة في تأدية وظيفة", definition: "Wrongdoing, especially by a public official.", examples: ["The mayor was charged with malfeasance in office.", "Investigators uncovered widespread malfeasance at the company.", "Voters demanded accountability for the official's malfeasance."], synonyms: ["misconduct", "wrongdoing", "corruption"], day: 20, group: 2 },
  { word: "manifest", pos: "verb", arabic: "يظهر / يجلي", definition: "To display or show a quality or feeling clearly.", examples: ["Her enthusiasm manifested in her energetic speech.", "The illness can manifest in many different ways.", "His talent manifested itself at an early age."], synonyms: ["show", "display", "exhibit"], day: 20, group: 2 },
  { word: "minute", pos: "adjective", arabic: "دقيق جداً / صغير جداً", definition: "Extremely small; precise and thorough.", examples: ["He paid attention to the most minute details.", "A minute amount of the substance can be lethal.", "She made a minute examination of the document."], synonyms: ["tiny", "minuscule", "detailed"], day: 20, group: 2 },
  { word: "modish", pos: "adjective", arabic: "عصري / موضة", definition: "Conforming to or following what is currently popular; fashionable.", examples: ["She wore a modish hat to the opening.", "His modish apartment was featured in a magazine.", "The shop sold modish clothing at high prices."], synonyms: ["fashionable", "stylish", "trendy"], day: 20, group: 2 },
  { word: "nascent", pos: "adjective", arabic: "ناشئ / في بداياته", definition: "Just coming into existence and beginning to display signs of future potential.", examples: ["The company is in a nascent stage of development.", "She showed nascent talent as a young pianist.", "The nascent democracy faced many challenges."], synonyms: ["emerging", "budding", "developing"], day: 20, group: 2 },
  { word: "perennial", pos: "adjective", arabic: "دائم / مزمن", definition: "Lasting or existing for a long or apparently infinite time.", examples: ["Traffic congestion is a perennial problem in this city.", "She is a perennial favorite in the contest.", "The garden is filled with perennial flowers."], synonyms: ["enduring", "lasting", "constant"], day: 20, group: 2 },
  { word: "pious", pos: "adjective", arabic: "تقي / ورع", definition: "Devoutly religious; making a hypocritical display of virtue.", examples: ["She was a pious woman who prayed daily.", "His pious tone in the meeting struck people as fake.", "The pious community gathered for the festival."], synonyms: ["devout", "religious", "reverent"], day: 20, group: 2 },
  { word: "providential", pos: "adjective", arabic: "مدبر بعناية إلهية / ميمون", definition: "Occurring at a favorable time; lucky.", examples: ["His arrival was providential, just when help was needed.", "The providential rain saved the crops.", "It was a providential discovery that changed history."], synonyms: ["fortunate", "lucky", "opportune"], day: 20, group: 2 },

  // Day 20 Group 3
  { word: "prowess", pos: "noun", arabic: "براعة / مهارة", definition: "Skill or expertise in a particular activity or field.", examples: ["His athletic prowess made him a star.", "She is famous for her culinary prowess.", "The company is known for its technical prowess."], synonyms: ["skill", "expertise", "ability"], day: 20, group: 3 },
  { word: "schism", pos: "noun", arabic: "انشقاق / انقسام", definition: "A split or division between strongly opposed sections or parties.", examples: ["A schism developed within the political party.", "The religious schism lasted for centuries.", "There is a deep schism between the two factions."], synonyms: ["division", "rift", "split"], day: 20, group: 3 },
  { word: "slander", pos: "noun", arabic: "افتراء / تشهير", definition: "The action of making a false spoken statement damaging to a person's reputation.", examples: ["He sued the newspaper for slander.", "She denied the slander against her character.", "Slander spread quickly through the small community."], synonyms: ["defamation", "calumny", "vilification"], day: 20, group: 3 },
  { word: "stalwart", pos: "adjective", arabic: "صلب / مخلص", definition: "Loyal, reliable, and hardworking.", examples: ["She has been a stalwart supporter of the charity for years.", "He is a stalwart defender of human rights.", "The team's stalwart captain led them to victory."], synonyms: ["loyal", "steadfast", "dependable"], day: 20, group: 3 },
  { word: "supplicate", pos: "verb", arabic: "يتوسل / يبتهل", definition: "To ask or beg for something earnestly or humbly.", examples: ["He supplicated the king for mercy.", "She supplicated the gods for her child's recovery.", "The villagers supplicated for help during the famine."], synonyms: ["beg", "plead", "implore"], day: 20, group: 3 },
  { word: "terse", pos: "adjective", arabic: "مقتضب / موجز", definition: "Sparing in the use of words; abrupt.", examples: ["He gave a terse reply to the question.", "Her terse memo left no room for misinterpretation.", "The terse statement said only that the deal was off."], synonyms: ["brief", "concise", "curt"], day: 20, group: 3 },
  { word: "tirade", pos: "noun", arabic: "هجوم لفظي / خطاب لاذع", definition: "A long, angry speech of criticism or accusation.", examples: ["He launched into a tirade against the new policy.", "Her tirade lasted for nearly twenty minutes.", "The senator delivered a tirade on the floor of Congress."], synonyms: ["diatribe", "rant", "harangue"], day: 20, group: 3 },
  { word: "universal", pos: "adjective", arabic: "عالمي / شامل", definition: "Affecting or done by all people or things in the world; applicable in all cases.", examples: ["The desire for happiness is universal.", "The film received universal acclaim.", "There is universal agreement on the need for action."], synonyms: ["worldwide", "general", "all-encompassing"], day: 20, group: 3 },
  { word: "vanquish", pos: "verb", arabic: "يهزم / يقهر", definition: "To defeat thoroughly.", examples: ["The army vanquished its enemies in a decisive battle.", "She vanquished her fears and gave the speech.", "He vanquished his rival in the championship match."], synonyms: ["defeat", "conquer", "overcome"], day: 20, group: 3 },
  { word: "woeful", pos: "adjective", arabic: "مؤسف / بائس", definition: "Characterized by, expressing, or causing sorrow or misery; very poor in quality.", examples: ["The team's woeful performance disappointed fans.", "She gave a woeful sigh and continued the story.", "The country faces a woeful economic situation."], synonyms: ["sorrowful", "deplorable", "wretched"], day: 20, group: 3 },
  { word: "abject", pos: "adjective", arabic: "بائس / مُزرٍ", definition: "Extremely bad, miserable, or lacking in dignity and hope.", examples: ["The refugees lived in abject poverty for many years.", "He offered an abject apology after realizing the harm he had caused.", "The abandoned building was in abject disrepair."], synonyms: ["wretched", "miserable", "degraded"], day: 21, group: 1 },
  { word: "amicable", pos: "adjective", arabic: "وُدِّي / مُسالِم", definition: "Characterized by friendliness, goodwill, and a willingness to avoid conflict.", examples: ["The two neighbors reached an amicable agreement about the property line.", "Despite the divorce, they remained amicable for the sake of their children.", "The meeting ended in an amicable tone after hours of discussion."], synonyms: ["friendly", "cordial", "peaceful"], day: 21, group: 1 },
  { word: "animosity", pos: "noun", arabic: "عَداء / ضَغينة", definition: "Strong hostility, resentment, or deep-seated dislike toward someone or something.", examples: ["Years of competition had created intense animosity between the rivals.", "She spoke without animosity, even though she had been treated unfairly.", "Political animosity often makes compromise difficult."], synonyms: ["hostility", "hatred", "resentment"], day: 21, group: 1 },
  { word: "aver", pos: "verb", arabic: "يؤكد / يصرّح", definition: "To state or assert something confidently and formally as true.", examples: ["The witness continued to aver that she had seen the defendant that night.", "Scientists aver that the data must be reviewed before any conclusion is drawn.", "He averred his innocence during the entire investigation."], synonyms: ["assert", "declare", "affirm"], day: 21, group: 1 },
  { word: "barrage", pos: "noun", arabic: "وابل / سيل", definition: "A rapid and overwhelming outpouring of things such as words, questions, or attacks.", examples: ["The candidate faced a barrage of questions from reporters.", "A barrage of criticism followed the company's decision.", "The soldiers advanced under a barrage of artillery fire."], synonyms: ["onslaught", "fusillade", "outpouring"], day: 21, group: 1 },
  { word: "cathartic", pos: "adjective", arabic: "تطهيري / مُنفِّس", definition: "Providing emotional release and relief from strong or repressed feelings.", examples: ["Writing in her journal was a cathartic experience after the tragedy.", "The film was cathartic for audiences who had endured similar losses.", "He found the long conversation surprisingly cathartic."], synonyms: ["purging", "cleansing", "relieving"], day: 21, group: 1 },
  { word: "decipher", pos: "verb", arabic: "يفكّ / يفسّر", definition: "To figure out, interpret, or make sense of something difficult to read or understand.", examples: ["It took hours to decipher the faded handwriting in the letter.", "Researchers are trying to decipher the meaning of the ancient symbols.", "I could not decipher his instructions because they were too vague."], synonyms: ["decode", "interpret", "unravel"], day: 21, group: 1 },
  { word: "delusion", pos: "noun", arabic: "وهم / ضلال", definition: "A false belief or impression that is firmly held despite evidence to the contrary.", examples: ["He suffered from the delusion that everyone was plotting against him.", "The idea that success comes without effort is a dangerous delusion.", "Her optimism was admirable, but it sometimes slipped into delusion."], synonyms: ["illusion", "fantasy", "misbelief"], day: 21, group: 1 },
  { word: "dispense", pos: "verb", arabic: "يوزّع / يصرف", definition: "To give out, provide, or distribute something, often in portions or according to a system.", examples: ["The machine will dispense a ticket after you insert the coin.", "Pharmacists must carefully dispense the correct medication.", "The charity helped dispense food to families in need."], synonyms: ["distribute", "administer", "allot"], day: 21, group: 1 },
  { word: "eloquent", pos: "adjective", arabic: "بليغ / فصيح", definition: "Fluent, persuasive, and expressive in speech or writing.", examples: ["Her eloquent speech moved the audience to tears.", "He wrote an eloquent letter defending academic freedom.", "The memorial was simple yet eloquent in its message."], synonyms: ["articulate", "expressive", "persuasive"], day: 21, group: 1 },
  { word: "enthrall", pos: "verb", arabic: "يسحر / يفتن", definition: "To capture someone's complete attention or interest in a powerful and pleasing way.", examples: ["The speaker's vivid storytelling continued to enthrall the audience for over an hour.", "As a child, she was enthralled by books about distant planets and strange civilizations.", "The intricate dance performance managed to enthrall even the most distracted guests."], synonyms: ["captivate", "fascinate", "mesmerize"], day: 21, group: 2 },
  { word: "eradicate", pos: "verb", arabic: "يستأصل / يقضي على", definition: "To destroy or eliminate something completely, especially a problem, disease, or harmful condition.", examples: ["Public health officials launched a campaign to eradicate the disease from rural areas.", "The organization hopes to eradicate corruption through stricter oversight and transparency.", "It is difficult to eradicate an invasive species once it spreads widely."], synonyms: ["eliminate", "abolish", "extirpate"], day: 21, group: 2 },
  { word: "fledgling", pos: "adjective", arabic: "ناشئ / مبتدئ", definition: "Describing something or someone that is new, inexperienced, or still developing.", examples: ["The fledgling company struggled to compete with larger and more established rivals.", "She offered advice to the fledgling writer who had just completed his first novel.", "Despite limited funds, the fledgling movement quickly gained public attention."], synonyms: ["nascent", "emerging", "incipient"], day: 21, group: 2 },
  { word: "fortitude", pos: "noun", arabic: "ثبات / شجاعة", definition: "Mental and emotional strength that enables a person to endure difficulty, pain, or adversity with courage.", examples: ["She faced the long recovery with remarkable fortitude and patience.", "The explorers needed fortitude to survive the harsh conditions of the mountain pass.", "His quiet fortitude inspired everyone who witnessed his struggle."], synonyms: ["courage", "endurance", "resilience"], day: 21, group: 2 },
  { word: "fortuitous", pos: "adjective", arabic: "محض الصدفة / موفّق", definition: "Happening by chance, often in a way that brings a positive or beneficial result.", examples: ["A fortuitous meeting at the conference led to a valuable research partnership.", "It was fortuitous that we arrived early, because the museum became crowded within minutes.", "Her discovery of the old letter was entirely fortuitous but deeply meaningful."], synonyms: ["accidental", "chance", "serendipitous"], day: 21, group: 2 },
  { word: "goad", pos: "verb", arabic: "يحرض / يستفز", definition: "To provoke, urge, or push someone into action, often by annoying or challenging them.", examples: ["His rivals tried to goad him into making an angry and careless response.", "She was goaded by repeated criticism to prove that her idea could succeed.", "The crowd's taunts seemed designed to goad the athlete into losing focus."], synonyms: ["provoke", "spur", "prod"], day: 21, group: 2 },
  { word: "imminent", pos: "adjective", arabic: "وشيك / قريب", definition: "About to happen very soon.", examples: ["Dark clouds and strong winds suggested that a storm was imminent.", "The governor warned residents of the imminent danger posed by the wildfire.", "With the deadline imminent, the team worked late into the night."], synonyms: ["impending", "approaching", "near"], day: 21, group: 2 },
  { word: "incontrovertible", pos: "adjective", arabic: "لا جدال فيه / قاطع", definition: "Impossible to deny, dispute, or question because it is clearly true or proven.", examples: ["The video provided incontrovertible evidence that the event had occurred exactly as described.", "Her contribution to the project was incontrovertible, despite attempts to minimize it.", "Scientists sought incontrovertible proof before announcing the discovery."], synonyms: ["indisputable", "undeniable", "irrefutable"], day: 21, group: 2 },
  { word: "itinerant", pos: "adjective", arabic: "متنقل / جوال", definition: "Traveling from place to place, especially for work or without staying long in one location.", examples: ["The itinerant musician performed in small towns across the country.", "In earlier centuries, itinerant merchants brought goods to remote villages.", "His itinerant lifestyle made it difficult to maintain close friendships."], synonyms: ["roving", "wandering", "migratory"], day: 21, group: 2 },
  { word: "magnanimous", pos: "adjective", arabic: "كريم النفس / متسامح", definition: "Showing generosity, nobility, and willingness to forgive, especially toward a rival or someone less powerful.", examples: ["After winning the election, she was magnanimous toward her opponents and invited them to collaborate.", "His magnanimous response to the harsh criticism surprised everyone in the room.", "The champion remained magnanimous in victory, praising the effort of the defeated team."], synonyms: ["generous", "noble", "benevolent"], day: 21, group: 2 },
  { word: "meritorious", pos: "adjective", arabic: "جدير بالثناء / مستحق للتقدير", definition: "Deserving praise, reward, or honor because of good qualities or worthy actions.", examples: ["Her meritorious service to the community earned her a national award.", "The committee recognized his meritorious efforts during the crisis.", "Years of meritorious work made her a respected leader in the field."], synonyms: ["worthy", "laudable", "commendable"], day: 21, group: 3 },
  { word: "mutiny", pos: "noun", arabic: "تمرد / عصيان", definition: "An open rebellion against lawful authority, especially by soldiers or sailors against their officers.", examples: ["The captain acted quickly to prevent a mutiny on the ship.", "Harsh conditions and low pay pushed the crew toward mutiny.", "The failed mutiny resulted in severe punishment for its leaders."], synonyms: ["rebellion", "insurrection", "revolt"], day: 21, group: 3 },
  { word: "paradoxical", pos: "adjective", arabic: "متناقض ظاهريًا / مفارق", definition: "Seemingly self-contradictory or absurd but possibly true or meaningful on closer examination.", examples: ["It is paradoxical that the more options people have, the less satisfied they often feel.", "Her paradoxical statement forced the audience to think more carefully.", "The results were paradoxical, showing both improvement and decline at the same time."], synonyms: ["contradictory", "ironic", "incongruous"], day: 21, group: 3 },
  { word: "perseverance", pos: "noun", arabic: "مثابرة / مواظبة", definition: "Steady persistence in doing something despite difficulty, delay, or failure.", examples: ["Her perseverance through years of training finally led to Olympic success.", "The project was completed through patience and perseverance.", "Perseverance is often more important than raw talent in achieving long-term goals."], synonyms: ["persistence", "tenacity", "endurance"], day: 21, group: 3 },
  { word: "render", pos: "verb", arabic: "يجعل / يقدم", definition: "To cause someone or something to become a particular state, or to provide or give something.", examples: ["The loud noise rendered the speaker impossible to hear.", "The medic rendered aid to the injured hikers.", "His apology did little to render the situation less awkward."], synonyms: ["make", "provide", "deliver"], day: 21, group: 3 },
  { word: "repertoire", pos: "noun", arabic: "ذخيرة / مجموعة", definition: "The full range of skills, methods, pieces, or performances that a person or group can draw upon.", examples: ["The pianist expanded her repertoire to include modern jazz compositions.", "A good teacher has a wide repertoire of instructional strategies.", "The theater company performed several classics from its repertoire this season."], synonyms: ["range", "collection", "stock"], day: 21, group: 3 },
  { word: "resilient", pos: "adjective", arabic: "مرن / صامد", definition: "Able to recover quickly from difficulty, stress, or change.", examples: ["Children are often remarkably resilient after major life changes.", "The resilient economy recovered faster than experts had predicted.", "She remained resilient despite repeated setbacks in her research."], synonyms: ["tough", "adaptable", "elastic"], day: 21, group: 3 },
  { word: "resolute", pos: "adjective", arabic: "حازم / ثابت", definition: "Firmly determined and unwavering in purpose or belief.", examples: ["She remained resolute in her decision to speak out against corruption.", "The team was resolute even after losing the first two matches.", "His resolute leadership inspired confidence during the emergency."], synonyms: ["determined", "steadfast", "unyielding"], day: 21, group: 3 },
  { word: "supple", pos: "adjective", arabic: "لين / مرن", definition: "Bending or moving easily and gracefully; flexible in body, material, or style.", examples: ["Years of dance training kept her body supple and strong.", "The leather became soft and supple after careful treatment.", "He wrote in a supple prose style that flowed effortlessly."], synonyms: ["flexible", "lithe", "pliant"], day: 21, group: 3 },
  { word: "valor", pos: "noun", arabic: "بسالة / شجاعة", definition: "Great courage, especially in the face of danger or in battle.", examples: ["The soldier received a medal for valor under enemy fire.", "Stories of valor and sacrifice spread throughout the camp.", "Her valor during the rescue saved several lives."], synonyms: ["bravery", "courage", "heroism"], day: 21, group: 3 },
  { word: "arresting", pos: "adjective", arabic: "لافت / آسر", definition: "Strikingly attractive or impressive in a way that immediately captures attention.", examples: ["The documentary opened with an arresting image of a city under water.", "Her arresting voice silenced the noisy room within seconds.", "The museum featured an arresting sculpture made entirely of recycled metal."], synonyms: ["striking", "captivating", "compelling"], day: 22, group: 1 },
  { word: "chastise", pos: "verb", arabic: "يوبخ / يؤنب", definition: "To criticize or reprimand someone severely for a mistake or wrongdoing.", examples: ["The coach chastised the team for its careless turnovers.", "She did not publicly chastise her assistant, preferring a private conversation.", "Parents should guide children rather than constantly chastise them."], synonyms: ["scold", "rebuke", "reprimand"], day: 22, group: 1 },
  { word: "cumbersome", pos: "adjective", arabic: "مرهق / ضخم", definition: "Difficult to handle, use, or manage because of size, weight, or complexity.", examples: ["The old filing system was so cumbersome that even simple tasks took hours.", "He struggled to carry the cumbersome box up the narrow stairs.", "The proposal was rejected because its cumbersome rules would slow the entire process."], synonyms: ["awkward", "bulky", "unwieldy"], day: 22, group: 1 },
  { word: "economy", pos: "noun", arabic: "اقتصاد / توفير", definition: "The system of production, distribution, and consumption of goods and services, or careful use of resources.", examples: ["A strong economy usually encourages consumer confidence and investment.", "During the drought, the village practiced economy in its use of water.", "The minister introduced policies intended to stabilize the national economy."], synonyms: ["frugality", "thrift", "finance"], day: 22, group: 1 },
  { word: "elementary", pos: "adjective", arabic: "أساسي / ابتدائي", definition: "Basic, simple, or relating to the most fundamental principles of a subject.", examples: ["The test covered only elementary concepts in algebra.", "Even an elementary review of the data revealed several errors.", "She asked an elementary question that clarified the entire discussion."], synonyms: ["basic", "fundamental", "simple"], day: 22, group: 1 },
  { word: "embellish", pos: "verb", arabic: "يزخرف / يزين", definition: "To decorate, enhance, or improve something by adding details or ornaments, sometimes excessively.", examples: ["The editor asked him not to embellish the report with dramatic language.", "Artisans used silver thread to embellish the ceremonial robe.", "Some storytellers embellish ordinary events until they sound unbelievable."], synonyms: ["decorate", "adorn", "ornament"], day: 22, group: 1 },
  { word: "euphoric", pos: "adjective", arabic: "مبتهج / منتش", definition: "Feeling intense happiness, excitement, or elation.", examples: ["The crowd was euphoric after the team scored in the final minute.", "She felt euphoric when she received the scholarship letter.", "Investors grew euphoric as the market continued to rise."], synonyms: ["elated", "ecstatic", "joyful"], day: 22, group: 1 },
  { word: "exonerate", pos: "verb", arabic: "يبرئ / يعفي", definition: "To officially clear someone from blame, guilt, or responsibility.", examples: ["New DNA evidence helped exonerate the man after years in prison.", "The internal review did not fully exonerate the company of negligence.", "She hoped the documents would exonerate her from any involvement in the scandal."], synonyms: ["absolve", "vindicate", "acquit"], day: 22, group: 1 },
  { word: "extrapolate", pos: "verb", arabic: "يستنبط / يستقرئ", definition: "To infer or estimate something by extending known information or observed trends.", examples: ["Scientists extrapolate future temperatures from current climate data.", "It is risky to extrapolate broad conclusions from a single experiment.", "Analysts attempted to extrapolate next year's sales from recent growth figures."], synonyms: ["infer", "project", "deduce"], day: 22, group: 1 },
  { word: "falter", pos: "verb", arabic: "يتردد / يتعثر", definition: "To hesitate, weaken, or lose strength or confidence in action or speech.", examples: ["Her voice began to falter during the emotional speech.", "Even after several setbacks, his determination did not falter.", "The economy may falter if inflation continues to rise unchecked."], synonyms: ["hesitate", "waver", "stumble"], day: 22, group: 1 },
  { word: "fervent", pos: "adjective", arabic: "متحمس / متوقد", definition: "Having or showing intense and passionate feeling or enthusiasm.", examples: ["She remained a fervent supporter of educational reform throughout her career.", "The scientist gave a fervent defense of open access research.", "Their fervent belief in justice inspired everyone in the room."], synonyms: ["ardent", "passionate", "zealous"], day: 22, group: 2 },
  { word: "foment", pos: "verb", arabic: "يؤجج / يثير", definition: "To stir up, encourage, or instigate trouble, conflict, or strong feelings.", examples: ["The speaker was accused of trying to foment unrest among the workers.", "False rumors can foment panic during a public emergency.", "The rebels used secret meetings to foment opposition to the regime."], synonyms: ["incite", "provoke", "agitate"], day: 22, group: 2 },
  { word: "gaffe", pos: "noun", arabic: "زلة / هفوة", definition: "An unintentional mistake or socially awkward remark or action.", examples: ["His comment about the budget turned out to be a major gaffe at the press conference.", "Wearing jeans to the formal banquet was an obvious gaffe.", "The candidate laughed off the gaffe and moved on with the interview."], synonyms: ["blunder", "fauxpas", "slip"], day: 22, group: 2 },
  { word: "heterodox", pos: "adjective", arabic: "غير تقليدي / مخالف للمألوف", definition: "Departing from accepted beliefs, standards, or established doctrines.", examples: ["Her heterodox views on economics challenged the assumptions of the field.", "The professor was known for proposing heterodox interpretations of classic texts.", "Investors were wary of the CEO's heterodox management style."], synonyms: ["unorthodox", "heretical", "nonconformist"], day: 22, group: 2 },
  { word: "histrionic", pos: "adjective", arabic: "مسرحي / انفعالي", definition: "Overly theatrical, dramatic, or emotionally exaggerated in behavior or style.", examples: ["His histrionic reaction to a minor inconvenience amused the entire office.", "The review criticized the actor's histrionic performance as excessive.", "She ignored the tabloids' histrionic coverage of the celebrity dispute."], synonyms: ["dramatic", "theatrical", "melodramatic"], day: 22, group: 2 },
  { word: "implicit", pos: "adjective", arabic: "ضمني / غير مصرح به", definition: "Suggested or understood without being directly expressed.", examples: ["There was an implicit agreement that everyone would arrive on time.", "Her implicit criticism was clear even though she never named anyone.", "The contract contains an implicit promise of confidentiality."], synonyms: ["implied", "tacit", "unspoken"], day: 22, group: 2 },
  { word: "inviolate", pos: "adjective", arabic: "مصون / مقدس", definition: "Free from violation, injury, or desecration; kept sacred or untouched.", examples: ["The constitution declares certain civil liberties inviolate.", "She regarded the privacy of her clients as inviolate.", "Even during the conflict, the sanctuary was considered inviolate ground."], synonyms: ["sacred", "untouched", "intact"], day: 22, group: 2 },
  { word: "liability", pos: "noun", arabic: "مسؤولية / عبء", definition: "A legal obligation or a person or thing that causes disadvantage or risk.", examples: ["The company accepted liability for the damage caused by the defective product.", "His lack of experience became a liability during the negotiation.", "Carrying too much debt can be a serious financial liability."], synonyms: ["burden", "obligation", "encumbrance"], day: 22, group: 2 },
  { word: "obstinate", pos: "adjective", arabic: "عنيد / مصر", definition: "Stubbornly refusing to change one's opinion, behavior, or course of action.", examples: ["The obstinate child refused to apologize even after understanding the harm done.", "Despite the evidence, he remained obstinate in his original claim.", "An obstinate stain clung to the fabric after several washes."], synonyms: ["stubborn", "inflexible", "unyielding"], day: 22, group: 2 },
  { word: "painstaking", pos: "adjective", arabic: "دؤوب / شديد العناية", definition: "Done with great care, thoroughness, and attention to detail.", examples: ["The historian conducted painstaking research before publishing the biography.", "Her painstaking notes helped the team avoid costly errors.", "Restoring the old mural required painstaking effort over several months."], synonyms: ["meticulous", "thorough", "careful"], day: 22, group: 2 },
  { word: "phlegmatic", pos: "adjective", arabic: "هادئ / بارد الأعصاب", definition: "Having a calm, unemotional, and not easily excited temperament.", examples: ["Even during the emergency, the phlegmatic pilot spoke in a steady voice.", "Her phlegmatic response to the criticism surprised everyone in the room.", "A phlegmatic leader can keep a team focused during moments of panic."], synonyms: ["calm", "stoic", "impassive"], day: 22, group: 3 },
  { word: "prodigious", pos: "adjective", arabic: "هائل / ضخم", definition: "Remarkably great in size, amount, extent, or degree.", examples: ["The researcher had a prodigious memory for obscure historical facts.", "They made a prodigious effort to finish the project before dawn.", "A prodigious storm swept across the coast and flooded the roads."], synonyms: ["enormous", "immense", "colossal"], day: 22, group: 3 },
  { word: "propensity", pos: "noun", arabic: "ميل / نزعة", definition: "A natural tendency or inclination to behave in a particular way.", examples: ["He has a propensity to interrupt others when he gets excited.", "The child showed a propensity for solving complex puzzles at an early age.", "Her propensity for caution kept the company from making a costly mistake."], synonyms: ["inclination", "tendency", "predilection"], day: 22, group: 3 },
  { word: "qualm", pos: "noun", arabic: "تردد / وخز الضمير", definition: "A feeling of doubt, uneasiness, or moral uncertainty about something.", examples: ["She had no qualm about asking difficult questions during the interview.", "Despite his initial qualm, he agreed to publish the controversial article.", "I felt a qualm of guilt after forgetting my friend's birthday."], synonyms: ["misgiving", "scruple", "doubt"], day: 22, group: 3 },
  { word: "renege", pos: "verb", arabic: "ينكث / يتراجع", definition: "To go back on a promise, agreement, or commitment.", examples: ["The supplier tried to renege on the contract after prices rose.", "She refused to renege on her promise to support the charity.", "If they renege now, the entire negotiation could collapse."], synonyms: ["default", "backtrack", "retract"], day: 22, group: 3 },
  { word: "stinting", pos: "adjective", arabic: "شحيح / مقتصد", definition: "Ungenerous or sparing in giving, spending, or providing something.", examples: ["The review criticized the school for its stinting support of the arts.", "His stinting praise made the team feel that their success was insignificant.", "A stinting approach to safety can lead to serious consequences."], synonyms: ["meager", "miserly", "sparing"], day: 22, group: 3 },
  { word: "temper", pos: "verb", arabic: "يخفف / يهدئ", definition: "To moderate, soften, or bring something under control.", examples: ["The judge tried to temper justice with mercy in the sentencing.", "You should temper your expectations before the results are announced.", "Her mentor helped her temper ambition with patience and discipline."], synonyms: ["moderate", "mitigate", "soften"], day: 22, group: 3 },
  { word: "tentative", pos: "adjective", arabic: "مبدئي / غير مؤكد", definition: "Not certain or fixed; provisional and subject to change.", examples: ["We reached a tentative agreement after several hours of discussion.", "Her tentative smile suggested that she was still unsure of the decision.", "The museum announced a tentative opening date for the new exhibit."], synonyms: ["provisional", "uncertain", "preliminary"], day: 22, group: 3 },
  { word: "unprecedented", pos: "adjective", arabic: "غير مسبوق", definition: "Never done, known, or experienced before.", examples: ["The city faced unprecedented demand for emergency services during the heat wave.", "Scientists collected unprecedented amounts of data from the space mission.", "The CEO announced an unprecedented expansion into five new markets at once."], synonyms: ["novel", "unique", "extraordinary"], day: 22, group: 3 },
  { word: "vivacious", pos: "adjective", arabic: "حيوي / مفعم بالحيوية", definition: "Attractively lively, animated, and full of energy.", examples: ["Her vivacious personality made her the center of attention at the party.", "The novel's vivacious heroine refuses to accept the limits others place on her.", "A vivacious classroom atmosphere can make difficult material easier to learn."], synonyms: ["lively", "animated", "spirited"], day: 22, group: 3 },
  { word: "allusive", pos: "adjective", arabic: "تلميحي / إيحائي", definition: "Referring to something indirectly or by suggestion rather than stating it plainly.", examples: ["Her allusive remarks about the scandal made everyone in the room uneasy.", "The poem is dense and allusive, drawing on myths from several cultures.", "His speech was so allusive that only a few listeners understood the hidden criticism."], synonyms: ["indirect", "suggestive", "implicit"], day: 23, group: 1 },
  { word: "astute", pos: "adjective", arabic: "فَطِن / داهية", definition: "Showing keen judgment, sharp awareness, and the ability to understand situations quickly.", examples: ["The astute investor recognized the company's potential before others did.", "Her astute observation revealed a flaw in the argument immediately.", "An astute diplomat can sense tension even when no one speaks openly."], synonyms: ["shrewd", "perceptive", "canny"], day: 23, group: 1 },
  { word: "commence", pos: "verb", arabic: "يبدأ / يشرع", definition: "To begin or start something, especially in a formal way.", examples: ["The ceremony will commence at noon in the main hall.", "After months of planning, the builders commenced work on the bridge.", "Once the signal was given, the runners commenced the race."], synonyms: ["begin", "start", "initiate"], day: 23, group: 1 },
  { word: "convalescent", pos: "adjective", arabic: "مُتَعافٍ / ناهِض من المرض", definition: "Recovering gradually after an illness, injury, or medical treatment.", examples: ["The convalescent patient spent the afternoon walking slowly through the garden.", "She remained in a quiet room while convalescent from surgery.", "Fresh air and rest helped the convalescent child regain his strength."], synonyms: ["recovering", "healing", "recuperating"], day: 23, group: 1 },
  { word: "curb", pos: "verb", arabic: "يَكبح / يَحُدّ", definition: "To restrain, control, or keep something within limits.", examples: ["The government introduced new policies to curb inflation.", "He tried to curb his impatience during the long meeting.", "Parents should teach children how to curb destructive impulses."], synonyms: ["restrain", "check", "limit"], day: 23, group: 1 },
  { word: "decry", pos: "verb", arabic: "يستنكر / يندد", definition: "To publicly condemn or criticize something strongly.", examples: ["Activists decried the decision as harmful to the environment.", "Many scholars decry the misuse of historical evidence in popular media.", "The mayor decried the rise in violence during a press conference."], synonyms: ["condemn", "denounce", "criticize"], day: 23, group: 1 },
  { word: "duress", pos: "noun", arabic: "إكراه / قسر", definition: "Compulsion or pressure used to force someone to act against their will.", examples: ["He claimed that the confession was signed under duress.", "The contract is invalid if it was accepted under duress.", "Witnesses testified that the defendant acted under extreme duress."], synonyms: ["coercion", "compulsion", "pressure"], day: 23, group: 1 },
  { word: "evoke", pos: "verb", arabic: "يستحضر / يثير", definition: "To bring a feeling, memory, image, or response into the mind.", examples: ["The old photograph evoked memories of childhood summers.", "Her voice can evoke both sorrow and hope in the same song.", "The novelist uses vivid detail to evoke a sense of place."], synonyms: ["summon", "elicit", "arouse"], day: 23, group: 1 },
  { word: "fawn", pos: "verb", arabic: "يتملق / يداهن", definition: "To seek favor by showing excessive flattery or submissive affection.", examples: ["He would fawn over his superiors in hopes of getting promoted.", "The host's assistants fawned on the celebrity throughout the evening.", "She disliked colleagues who fawn on powerful people for advantage."], synonyms: ["flatter", "grovel", "toady"], day: 23, group: 1 },
  { word: "fret", pos: "verb", arabic: "يقلق / يضطرب", definition: "To worry or become anxious, often over small matters.", examples: ["Parents naturally fret when their children travel alone.", "She began to fret about the interview days before it happened.", "There is no need to fret over a mistake that can be corrected."], synonyms: ["worry", "brood", "agonize"], day: 23, group: 1 },
  { word: "glib", pos: "adjective", arabic: "طلاقة / سلاسة", definition: "Speaking or writing in a smooth, fluent way that is often superficial or insincere.", examples: ["The candidate gave a glib answer that sounded polished but avoided the real issue.", "Her glib remarks about poverty offended people who had faced genuine hardship.", "He is charming, but his glib promises rarely lead to action."], synonyms: ["slick", "facile", "superficial"], day: 23, group: 2 },
  { word: "headstrong", pos: "adjective", arabic: "عنيد / جامح", definition: "Determined to do what one wants and unwilling to listen to advice or be controlled.", examples: ["The headstrong child refused to follow the teacher's instructions.", "Because he was headstrong, he ignored every warning and invested all his savings.", "Her headstrong nature helped her challenge convention, but it also created conflict."], synonyms: ["stubborn", "wilful", "obstinate"], day: 23, group: 2 },
  { word: "intermittent", pos: "adjective", arabic: "متقطع / متناوب", definition: "Occurring at irregular intervals rather than continuously.", examples: ["The hikers continued despite intermittent rain throughout the afternoon.", "We experienced intermittent internet service during the storm.", "His intermittent cough made it hard for him to finish the speech."], synonyms: ["sporadic", "occasional", "periodic"], day: 23, group: 2 },
  { word: "ire", pos: "noun", arabic: "غضب / سخط", definition: "Intense anger.", examples: ["The new tax proposal aroused the ire of local business owners.", "She tried to remain calm and not provoke her manager's ire.", "His careless comment drew the ire of the entire committee."], synonyms: ["anger", "wrath", "fury"], day: 23, group: 2 },
  { word: "languid", pos: "adjective", arabic: "خامل / فاتِر", definition: "Lacking energy or enthusiasm and moving or speaking slowly in a relaxed or weak way.", examples: ["After the long flight, she felt too languid to unpack her bags.", "The hot afternoon produced a languid mood in the office.", "He gave a languid wave from the porch and went back to sleep."], synonyms: ["listless", "sluggish", "lethargic"], day: 23, group: 2 },
  { word: "lull", pos: "noun", arabic: "هدوء / سكون", definition: "A temporary period of calm, quiet, or reduced activity.", examples: ["During a lull in the conversation, someone finally mentioned the budget problem.", "The soldiers used the lull in fighting to rest and resupply.", "There was a brief lull before the next round of questions began."], synonyms: ["pause", "respite", "calm"], day: 23, group: 2 },
  { word: "mettlesome", pos: "adjective", arabic: "مقدام / شجاع", definition: "Full of spirit and courage; eager and determined.", examples: ["The mettlesome debater welcomed the toughest questions from the audience.", "Despite her small size, the mettlesome athlete never backed down from a challenge.", "The young officer was mettlesome enough to lead the risky mission."], synonyms: ["spirited", "valiant", "plucky"], day: 23, group: 2 },
  { word: "mollify", pos: "verb", arabic: "يهدئ / يسترضي", definition: "To calm someone’s anger or anxiety or to reduce the severity of something.", examples: ["The manager offered a refund to mollify the angry customer.", "She tried to mollify her parents by promising to be more careful.", "Nothing he said could mollify the critics after the scandal broke."], synonyms: ["appease", "pacify", "soothe"], day: 23, group: 2 },
  { word: "neutralize", pos: "verb", arabic: "يحيّد / يبطل", definition: "To make something ineffective or harmless by counteracting it.", examples: ["The treatment can neutralize the effects of the poison if given quickly.", "The army moved to neutralize the enemy's radar system.", "She used humor to neutralize the tension in the room."], synonyms: ["counteract", "nullify", "offset"], day: 23, group: 2 },
  { word: "nonplussed", pos: "adjective", arabic: "مرتبك / حائر", definition: "Confused and unsure how to react or respond.", examples: ["The unexpected question left the speaker nonplussed for a moment.", "She looked nonplussed when the meeting was moved to a different city.", "He was completely nonplussed by the strange instructions on the form."], synonyms: ["bewildered", "perplexed", "confused"], day: 23, group: 2 },
  { word: "precipitous", pos: "adjective", arabic: "شديد الانحدار / متسرع", definition: "Extremely steep, or done suddenly and without careful thought.", examples: ["The hikers were cautious on the precipitous cliff path.", "The company suffered a precipitous decline in sales after the scandal.", "He made a precipitous decision to quit his job without a backup plan."], synonyms: ["steep", "sudden", "rash"], day: 23, group: 3 },
  { word: "pretentious", pos: "adjective", arabic: "متكلف / متصنع", definition: "Attempting to appear more important, intelligent, or refined than is actually warranted.", examples: ["The restaurant's pretentious decor made some guests uncomfortable.", "Her pretentious speech was filled with unnecessary jargon.", "Critics dismissed the film as visually impressive but ultimately pretentious."], synonyms: ["affected", "pompous", "ostentatious"], day: 23, group: 3 },
  { word: "profound", pos: "adjective", arabic: "عميق / بالغ", definition: "Very great in depth, intensity, or insight.", examples: ["The lecture had a profound impact on the students.", "She expressed profound gratitude for their support.", "The novel offers a profound exploration of human suffering."], synonyms: ["deep", "intense", "insightful"], day: 23, group: 3 },
  { word: "propagate", pos: "verb", arabic: "ينشر / يروج", definition: "To spread, promote, or reproduce something over a wide area.", examples: ["Social media can propagate rumors at an alarming speed.", "Scientists propagate the plants in controlled greenhouse conditions.", "The organization worked to propagate its message across the region."], synonyms: ["spread", "disseminate", "broadcast"], day: 23, group: 3 },
  { word: "recourse", pos: "noun", arabic: "ملاذ / وسيلة", definition: "A source of help or a course of action available when facing difficulty.", examples: ["Without legal recourse, the tenants felt powerless against the landlord.", "Her only recourse was to file a formal complaint.", "When the machine failed, we had no recourse but to stop production."], synonyms: ["resort", "remedy", "option"], day: 23, group: 3 },
  { word: "refute", pos: "verb", arabic: "يدحض / يفند", definition: "To prove a statement or argument to be false or incorrect.", examples: ["The scientist used new data to refute the earlier hypothesis.", "He struggled to refute the evidence presented in court.", "The article refutes the claim that the policy was ineffective."], synonyms: ["disprove", "confute", "rebut"], day: 23, group: 3 },
  { word: "regress", pos: "verb", arabic: "يتراجع / ينتكس", definition: "To return to a less advanced, mature, or desirable state.", examples: ["Without practice, language skills can quickly regress.", "Under stress, he seemed to regress to childish behavior.", "The economy may regress if reforms are not maintained."], synonyms: ["revert", "decline", "retrograde"], day: 23, group: 3 },
  { word: "repercussion", pos: "noun", arabic: "تداعية / أثر", definition: "An unintended consequence or effect, especially an unwelcome one.", examples: ["The policy change had serious repercussions for small businesses.", "She worried about the social repercussions of speaking out.", "The environmental repercussions of the spill lasted for years."], synonyms: ["aftermath", "consequence", "result"], day: 23, group: 3 },
  { word: "replenish", pos: "verb", arabic: "يجدد / يعيد ملء", definition: "To fill something up again or restore it to a previous level.", examples: ["Please replenish the supplies before the next shift begins.", "A good night's sleep can help replenish your energy.", "Rainfall will replenish the reservoir after months of drought."], synonyms: ["refill", "restore", "renew"], day: 23, group: 3 },
  { word: "vigilant", pos: "adjective", arabic: "يقظ / حذر", definition: "Watchful and alert to possible danger, problems, or changes.", examples: ["Security guards remained vigilant throughout the event.", "Parents must be vigilant about their children's online activity.", "The editor was vigilant in catching even minor errors."], synonyms: ["watchful", "alert", "attentive"], day: 23, group: 3 },
  { word: "assail", pos: "verb", arabic: "يهاجم / يعتدي", definition: "To attack someone or something violently, verbally, or with strong criticism.", examples: ["Reporters continued to assail the mayor with questions about the scandal.", "The hikers were assailed by a sudden storm as they crossed the ridge.", "Critics assailed the proposal for ignoring the needs of working families."], synonyms: ["attack", "criticize", "beset"], day: 24, group: 1 },
  { word: "benevolent", pos: "adjective", arabic: "خيّر / عطوف", definition: "Kind, generous, and well-meaning toward others.", examples: ["The benevolent donor funded scholarships for students from low-income families.", "She was known for her benevolent attitude toward everyone in the office.", "A benevolent leader uses power to improve the lives of others."], synonyms: ["kind", "charitable", "compassionate"], day: 24, group: 1 },
  { word: "berate", pos: "verb", arabic: "يوبخ / يعنف", definition: "To scold or criticize someone angrily and at length.", examples: ["The coach berated the team for its lack of effort during practice.", "She berated her brother for forgetting their mother's birthday.", "Instead of helping, he chose to berate the staff in front of customers."], synonyms: ["scold", "rebuke", "chide"], day: 24, group: 1 },
  { word: "buoyant", pos: "adjective", arabic: "مفعم بالحيوية / طاف", definition: "Able to float or showing a cheerful, optimistic, and lively quality.", examples: ["Despite the setback, she remained buoyant and confident about the future.", "The buoyant boat rose easily with each passing wave.", "Investors were buoyant after hearing the company's strong earnings report."], synonyms: ["cheerful", "optimistic", "floating"], day: 24, group: 1 },
  { word: "buttress", pos: "verb", arabic: "يدعم / يعزز", definition: "To support, strengthen, or reinforce something.", examples: ["The lawyer used new evidence to buttress her argument in court.", "Strong community ties buttress the town during difficult times.", "Researchers gathered more data to buttress their original conclusion."], synonyms: ["support", "fortify", "reinforce"], day: 24, group: 1 },
  { word: "condone", pos: "verb", arabic: "يتغاضى عن / يبرر", definition: "To accept or allow behavior that is morally wrong or offensive.", examples: ["The school does not condone cheating under any circumstances.", "By staying silent, he seemed to condone their reckless behavior.", "No ethical leader should condone corruption within the organization."], synonyms: ["forgive", "excuse", "pardon"], day: 24, group: 1 },
  { word: "contravene", pos: "verb", arabic: "يخالف / ينتهك", definition: "To go against, violate, or oppose a law, rule, or principle.", examples: ["The new policy would contravene several long-standing labor agreements.", "His actions clearly contravene the terms of the contract.", "Any measure that contravenes the constitution will face legal challenges."], synonyms: ["violate", "breach", "oppose"], day: 24, group: 1 },
  { word: "denounce", pos: "verb", arabic: "يدين / يشجب", definition: "To publicly condemn or criticize something strongly.", examples: ["The senator denounced the attack as a threat to democracy.", "Activists gathered to denounce the company's harmful environmental practices.", "She was quick to denounce any form of discrimination in the workplace."], synonyms: ["condemn", "decry", "censure"], day: 24, group: 1 },
  { word: "despotic", pos: "adjective", arabic: "استبدادي / طاغية", definition: "Having or showing absolute power in a cruel and oppressive way.", examples: ["The nation suffered for decades under a despotic ruler.", "His despotic management style left employees afraid to speak openly.", "The novel portrays a despotic regime that controls every aspect of life."], synonyms: ["tyrannical", "authoritarian", "oppressive"], day: 24, group: 1 },
  { word: "deviate", pos: "verb", arabic: "ينحرف / يحيد", definition: "To depart from an established course, standard, or plan.", examples: ["Drivers should not deviate from the marked route during the race.", "Her explanation began to deviate from the facts presented earlier.", "We agreed not to deviate from the original budget without approval."], synonyms: ["diverge", "stray", "swerve"], day: 24, group: 1 },
  { word: "disinterested", pos: "adjective", arabic: "محايد / نزيه", definition: "Not influenced by personal interest or gain; impartial and unbiased.", examples: ["A disinterested judge is essential for a fair trial.", "The committee sought a disinterested expert to evaluate the proposal.", "Her disinterested advice helped both sides reach an agreement."], synonyms: ["impartial", "neutral", "unbiased"], day: 24, group: 2 },
  { word: "escalate", pos: "verb", arabic: "يتصاعد / يتفاقم", definition: "To increase in intensity, seriousness, or scale, or to cause something to do so.", examples: ["A minor disagreement can quickly escalate into a major conflict.", "The company decided not to escalate the dispute with its supplier.", "Rising costs may escalate the price of housing next year."], synonyms: ["intensify", "heighten", "increase"], day: 24, group: 2 },
  { word: "exorcise", pos: "verb", arabic: "يطرد / يستأصل", definition: "To drive out an evil spirit, or more generally to get rid of something troubling or harmful.", examples: ["The priest was called to exorcise the spirit from the old house.", "She wrote about her fears to exorcise them from her mind.", "The nation struggled to exorcise the memory of the war."], synonyms: ["banish", "expel", "eradicate"], day: 24, group: 2 },
  { word: "finicky", pos: "adjective", arabic: "متطلب / دقيق", definition: "Excessively particular, hard to please, or requiring great care and precision.", examples: ["He is finicky about the way his coffee is prepared.", "The finicky machine stops working if one small part is misaligned.", "As a finicky editor, she noticed every misplaced comma."], synonyms: ["fussy", "fastidious", "particular"], day: 24, group: 2 },
  { word: "foil", pos: "verb", arabic: "يُحبط / يُفشل", definition: "To prevent someone from succeeding in a plan or attempt.", examples: ["Police managed to foil the robbery before it began.", "Heavy rain threatened to foil their plans for an outdoor concert.", "Her quick thinking helped foil the scam."], synonyms: ["thwart", "frustrate", "defeat"], day: 24, group: 2 },
  { word: "intertwined", pos: "adjective", arabic: "متشابك / مترابط", definition: "Closely connected or twisted together so that the parts are difficult to separate.", examples: ["Their personal and professional lives became deeply intertwined.", "Vines were intertwined around the garden fence.", "History and myth are often intertwined in the novel."], synonyms: ["entwined", "interwoven", "connected"], day: 24, group: 2 },
  { word: "inundate", pos: "verb", arabic: "يغمر / يُغرق", definition: "To overwhelm with a large amount of things, or to flood with water.", examples: ["After the announcement, the office was inundate with emails from applicants.", "Spring storms can inundate low-lying neighborhoods.", "The celebrity was inundate by requests for interviews."], synonyms: ["overwhelm", "deluge", "flood"], day: 24, group: 2 },
  { word: "ironclad", pos: "adjective", arabic: "محكم / راسخ", definition: "So strong, secure, or certain that it cannot easily be broken, defeated, or disproved.", examples: ["The lawyer presented an ironclad case backed by clear evidence.", "They signed an ironclad contract to avoid future disputes.", "Her alibi seemed ironclad to the investigators."], synonyms: ["airtight", "secure", "conclusive"], day: 24, group: 2 },
  { word: "jeopardize", pos: "verb", arabic: "يُعرّض للخطر / يُهدد", definition: "To put something or someone at risk of harm, loss, or failure.", examples: ["Reckless spending could jeopardize the company’s future.", "He refused to lie because it would jeopardize his reputation.", "Smoking during pregnancy can jeopardize the health of the baby."], synonyms: ["endanger", "threaten", "imperil"], day: 24, group: 2 },
  { word: "mercurial", pos: "adjective", arabic: "متقلب / سريع التغير", definition: "Subject to sudden and unpredictable changes in mood, behavior, or mind.", examples: ["His mercurial temperament made him difficult to work with.", "The region is known for its mercurial weather in early spring.", "She was a mercurial leader who changed priorities overnight."], synonyms: ["volatile", "capricious", "erratic"], day: 24, group: 2 },
  { word: "oblivious", pos: "adjective", arabic: "غافل / غير مدرك", definition: "not aware of or not noticing what is happening around one.", examples: ["She was oblivious to the warning signs and continued investing her savings.", "He walked through the crowded station, oblivious to the commotion behind him.", "The child remained oblivious to the adults' tense conversation."], synonyms: ["unaware", "ignorant", "heedless"], day: 24, group: 3 },
  { word: "perpetrate", pos: "verb", arabic: "يرتكب / يقترف", definition: "to commit, carry out, or be responsible for a harmful, illegal, or immoral act.", examples: ["Investigators worked quickly to identify who had perpetrate the fraud against elderly clients.", "The regime was accused of helping perpetrate crimes against civilians.", "No one believed that such a quiet student could perpetrate such an elaborate prank."], synonyms: ["commit", "execute", "inflict"], day: 24, group: 3 },
  { word: "plaintive", pos: "adjective", arabic: "حزين / نائح", definition: "sounding sad and mournful in a way that expresses sorrow or longing.", examples: ["A plaintive melody drifted from the old violin in the next room.", "The puppy let out a plaintive whine when its owner left.", "Her plaintive voice made the story of loss even more moving."], synonyms: ["mournful", "wistful", "melancholy"], day: 24, group: 3 },
  { word: "poignant", pos: "adjective", arabic: "مؤثر / محزن", definition: "deeply affecting or touching in a way that evokes sadness, sympathy, or regret.", examples: ["The film's final scene was especially poignant because it mirrored real events.", "He wrote a poignant letter to his childhood friend before moving away.", "The memorial offered a poignant reminder of the lives lost in the disaster."], synonyms: ["touching", "moving", "affecting"], day: 24, group: 3 },
  { word: "quiescent", pos: "adjective", arabic: "ساكن / خامل", definition: "in a state of inactivity, stillness, or dormancy.", examples: ["The volcano remained quiescent for decades before showing signs of activity.", "During the winter months, the insects are largely quiescent.", "Political tensions appeared quiescent, though unrest still simmered beneath the surface."], synonyms: ["inactive", "dormant", "latent"], day: 24, group: 3 },
  { word: "reiterate", pos: "verb", arabic: "يكرر / يعيد", definition: "to say or do something again for emphasis or clarity.", examples: ["The professor had to reiterate the instructions before the exam began.", "She reiterated her support for the proposal during the meeting.", "Let me reiterate that punctuality is essential for this project."], synonyms: ["repeat", "restate", "echo"], day: 24, group: 3 },
  { word: "subside", pos: "verb", arabic: "يهدأ / ينحسر", definition: "to become less intense, severe, or active.", examples: ["After a few hours, the storm began to subside and the roads reopened.", "Her anger did not subside until she heard the full explanation.", "Doctors waited for the swelling to subside before making a diagnosis."], synonyms: ["diminish", "abate", "wane"], day: 24, group: 3 },
  { word: "subsume", pos: "verb", arabic: "يستوعب / يدرج", definition: "to include or absorb something within a larger category or system.", examples: ["The new theory attempts to subsume several earlier models under one framework.", "Local customs were gradually subsumed into the dominant culture.", "The report subsumes economic concerns under the broader issue of national security."], synonyms: ["absorb", "incorporate", "encompass"], day: 24, group: 3 },
  { word: "surmount", pos: "verb", arabic: "يتغلب على / يجتاز", definition: "to overcome a difficulty, obstacle, or challenge successfully.", examples: ["With patience and training, she was able to surmount her fear of public speaking.", "The expedition failed to surmount the final ridge before nightfall.", "Many students can surmount financial obstacles with the right support."], synonyms: ["overcome", "conquer", "defeat"], day: 24, group: 3 },
  { word: "tangential", pos: "adjective", arabic: "جانبي / هامشي", definition: "only slightly connected to the main subject or issue.", examples: ["His comments were interesting but tangential to the central argument.", "The article includes a tangential discussion of art history that distracts from its thesis.", "We had to redirect the conversation when it became too tangential."], synonyms: ["peripheral", "incidental", "extraneous"], day: 24, group: 3 },
  { word: "adept", pos: "adjective", arabic: "ماهر / بارع", definition: "Highly skilled or proficient at doing something.", examples: ["She is adept at solving complex mathematical problems.", "The diplomat was adept at easing tensions during negotiations.", "He became adept with the new software after only a few days."], synonyms: ["skilled", "proficient", "expert"], day: 25, group: 1 },
  { word: "adverse", pos: "adjective", arabic: "ضار / معاكس", definition: "Unfavorable or harmful in effect, often creating difficulties.", examples: ["The expedition was delayed by adverse weather conditions.", "The court considered the adverse impact of the policy on workers.", "He remained calm despite the adverse circumstances surrounding the deal."], synonyms: ["unfavorable", "hostile", "harmful"], day: 25, group: 1 },
  { word: "appropriate", pos: "adjective", arabic: "مناسب / ملائم", definition: "Suitable or proper for a particular purpose, situation, or person.", examples: ["Please wear appropriate clothing for the formal ceremony.", "The teacher chose an appropriate example to explain the concept.", "It is appropriate to thank those who contributed to the project."], synonyms: ["suitable", "proper", "fitting"], day: 25, group: 1 },
  { word: "archetype", pos: "noun", arabic: "نموذج أصلي / مثال أعلى", definition: "A typical or original model that represents the essential features of a kind of person or thing.", examples: ["The hero in the novel is the archetype of noble sacrifice.", "That small village became the archetype of rural tranquility.", "She is often seen as the archetype of the modern entrepreneur."], synonyms: ["model", "prototype", "paradigm"], day: 25, group: 1 },
  { word: "articulate", pos: "adjective", arabic: "فصيح / بليغ", definition: "Able to express ideas clearly and effectively in speech or writing.", examples: ["The candidate was articulate and persuasive during the debate.", "She gave an articulate explanation of the scientific theory.", "Even under pressure, he remained articulate and composed."], synonyms: ["eloquent", "fluent", "expressive"], day: 25, group: 1 },
  { word: "auspicious", pos: "adjective", arabic: "مبشر / ميمون", definition: "Suggesting that success is likely; favorable or promising.", examples: ["The clear skies on opening day seemed auspicious for the festival.", "Investors saw the strong early sales as an auspicious sign.", "Their partnership began under auspicious circumstances."], synonyms: ["favorable", "promising", "propitious"], day: 25, group: 1 },
  { word: "bereft", pos: "adjective", arabic: "محروم / مفجوع", definition: "Deprived of something valuable or left in a state of grief after a loss.", examples: ["After the storm, the hillside was bereft of trees.", "She felt bereft after her closest friend moved away.", "The old library seemed bereft of life once the students had gone."], synonyms: ["deprived", "desolate", "forlorn"], day: 25, group: 1 },
  { word: "captious", pos: "adjective", arabic: "انتقادي / متعنت", definition: "Tending to find fault with trivial matters in a difficult or unreasonable way.", examples: ["The reviewer was so captious that he criticized even the font choice.", "Her captious remarks discouraged the team during the meeting.", "A captious supervisor can make simple tasks feel exhausting."], synonyms: ["faultfinding", "carping", "petty"], day: 25, group: 1 },
  { word: "conclusive", pos: "adjective", arabic: "حاسم / قاطع", definition: "Serving to settle an issue with finality because it is decisive or convincing.", examples: ["The fingerprint analysis provided conclusive evidence.", "Researchers have not yet reached a conclusive answer to the question.", "His confession was conclusive proof of involvement."], synonyms: ["decisive", "definitive", "final"], day: 25, group: 1 },
  { word: "conspire", pos: "verb", arabic: "يتآمر / يتضافر", definition: "To secretly plan with others to do something unlawful or harmful, or to combine toward a particular result.", examples: ["The plotters met in secret to conspire against the king.", "A series of delays seemed to conspire to ruin the schedule.", "They were accused of conspiring to manipulate the market."], synonyms: ["plot", "scheme", "collude"], day: 25, group: 1 },
  { word: "delineate", pos: "verb", arabic: "يصف / يرسم", definition: "To describe, portray, or mark something with clear and precise detail.", examples: ["The report delineates the responsibilities of each committee member.", "She used a red pen to delineate the borders on the map.", "The professor carefully delineated the difference between the two theories."], synonyms: ["depict", "outline", "define"], day: 25, group: 2 },
  { word: "disentangle", pos: "verb", arabic: "يفكك / يحل", definition: "To separate something from complications or confusion, or to free it from an entangled state.", examples: ["It took hours to disentangle the wires behind the computer desk.", "The lawyer tried to disentangle the facts from the rumors.", "She needed time to disentangle herself from the obligations of the old contract."], synonyms: ["untangle", "separate", "unravel"], day: 25, group: 2 },
  { word: "exhort", pos: "verb", arabic: "يحث / يناشد", definition: "To strongly encourage or urge someone to do something.", examples: ["The coach exhorted the team to remain focused until the final whistle.", "Parents often exhort their children to study diligently.", "The speaker exhorted the audience to take action against pollution."], synonyms: ["urge", "implore", "encourage"], day: 25, group: 2 },
  { word: "frailty", pos: "noun", arabic: "ضعف / وهن", definition: "The condition of being physically weak or morally vulnerable.", examples: ["Old age had increased his physical frailty.", "The novel explores the frailty of human judgment.", "Her apparent frailty concealed a remarkably determined spirit."], synonyms: ["weakness", "fragility", "infirmity"], day: 25, group: 2 },
  { word: "grievance", pos: "noun", arabic: "مظلمة / شكوى", definition: "A real or imagined cause for complaint, resentment, or protest.", examples: ["The workers filed a formal grievance against the manager.", "He nursed a long-standing grievance over the unfair decision.", "The committee listened to each student's grievance with patience."], synonyms: ["complaint", "resentment", "objection"], day: 25, group: 2 },
  { word: "harangue", pos: "noun", arabic: "خطبة / محاضرة", definition: "A long, forceful, and often critical speech or lecture.", examples: ["The politician delivered a harangue against corruption.", "We endured a lengthy harangue about punctuality from the principal.", "His dinner speech turned into a harangue on modern culture."], synonyms: ["tirade", "rant", "lecture"], day: 25, group: 2 },
  { word: "ploy", pos: "noun", arabic: "حيلة / مناورة", definition: "A clever or strategic maneuver intended to gain an advantage.", examples: ["The discount offer was merely a ploy to attract new customers.", "She saw through his ploy and refused to reveal any details.", "The general used a deceptive ploy to mislead the enemy."], synonyms: ["trick", "gambit", "ruse"], day: 25, group: 2 },
  { word: "poise", pos: "noun", arabic: "اتزان / رصانة", definition: "Graceful composure and self-assured balance in manner or bearing.", examples: ["She answered the difficult questions with remarkable poise.", "Even under pressure, the diplomat maintained his poise.", "Her poise on stage impressed both the judges and the audience."], synonyms: ["composure", "grace", "equilibrium"], day: 25, group: 2 },
  { word: "pomposity", pos: "noun", arabic: "تكلف / تبجح", definition: "The quality of being excessively self-important or affectedly grand in speech and behavior.", examples: ["His pomposity made him unpopular with his colleagues.", "The novel mocks the pomposity of the aristocratic elite.", "She spoke without the pomposity that often accompanies authority."], synonyms: ["arrogance", "pretension", "grandiosity"], day: 25, group: 2 },
  { word: "proxy", pos: "noun", arabic: "وكيل / نائب", definition: "A person or authority empowered to act on behalf of someone else.", examples: ["She attended the meeting as a proxy for the department head.", "Votes may be submitted by proxy if members cannot be present.", "The investor authorized a proxy to sign the documents."], synonyms: ["agent", "substitute", "delegate"], day: 25, group: 2 },
  { word: "relent", pos: "verb", arabic: "يلين / يرضخ", definition: "To become less strict, severe, or determined, especially after resistance or pressure.", examples: ["After hours of negotiation, the landlord finally agreed to relent and lower the rent.", "The coach would not relent despite the team's repeated complaints about the intense practice schedule.", "Seeing the child's genuine apology, her mother began to relent."], synonyms: ["yield", "soften", "capitulate"], day: 25, group: 3 },
  { word: "rhetoric", pos: "noun", arabic: "بلاغة / خطاب", definition: "Language that is designed to persuade or impress, often emphasizing style over substance.", examples: ["The candidate's rhetoric energized the crowd but offered few concrete policy details.", "Her essay avoided empty rhetoric and focused instead on careful evidence.", "During the debate, his fiery rhetoric overshadowed the actual issue."], synonyms: ["oratory", "eloquence", "declamation"], day: 25, group: 3 },
  { word: "rigor", pos: "noun", arabic: "صرامة / دقة", definition: "Strictness, severity, or exactness in method, standards, or judgment.", examples: ["The scientific study was praised for its rigor and careful control of variables.", "Graduate courses often demand a level of rigor that surprises new students.", "The judge applied the law with unwavering rigor."], synonyms: ["strictness", "severity", "precision"], day: 25, group: 3 },
  { word: "sparse", pos: "adjective", arabic: "متناثر / نادر", definition: "Thinly distributed, scattered, or present in very small amounts.", examples: ["Vegetation was sparse across the dry, rocky plain.", "The report contained only sparse details about the financial losses.", "Because the town is remote, public transportation there is sparse."], synonyms: ["scant", "meager", "thin"], day: 25, group: 3 },
  { word: "steadfast", pos: "adjective", arabic: "ثابت / راسخ", definition: "Firmly loyal, constant, or unwavering in purpose, belief, or action.", examples: ["She remained steadfast in her commitment to educational reform.", "Despite public criticism, the scientist was steadfast in defending her findings.", "His steadfast friendship helped me through a difficult year."], synonyms: ["loyal", "resolute", "constant"], day: 25, group: 3 },
  { word: "suspect", pos: "verb", arabic: "يشتبه / يظن", definition: "To believe that something is probably true or likely, especially with uncertainty or distrust.", examples: ["I suspect that the data were recorded incorrectly.", "Investigators suspect that the fire was started deliberately.", "She began to suspect that her colleague was hiding important information."], synonyms: ["doubt", "surmise", "suppose"], day: 25, group: 3 },
  { word: "tedious", pos: "adjective", arabic: "ممل / رتيب", definition: "Too long, slow, or repetitive, making it boring or tiresome.", examples: ["Copying the handwritten records into a spreadsheet was a tedious task.", "The lecture became tedious once the speaker began repeating the same points.", "Although the research process was tedious, the final discovery was worth the effort."], synonyms: ["boring", "dreary", "monotonous"], day: 25, group: 3 },
  { word: "vitality", pos: "noun", arabic: "حيوية / نشاط", definition: "The state of being energetic, lively, and full of strength or life.", examples: ["The park adds vitality to the neighborhood by attracting families and artists.", "Even in old age, she retained remarkable vitality and curiosity.", "A healthy diet and regular exercise can improve mental and physical vitality."], synonyms: ["energy", "vigor", "liveliness"], day: 25, group: 3 },
  { word: "whimsical", pos: "adjective", arabic: "نزوي / طريف", definition: "Playfully unusual, fanciful, or unpredictable in an appealing way.", examples: ["The artist filled the gallery with whimsical paintings of floating houses and talking birds.", "His whimsical sense of humor made even routine meetings enjoyable.", "The garden featured a whimsical path lined with brightly painted stones."], synonyms: ["fanciful", "playful", "quirky"], day: 25, group: 3 },
  { word: "yield", pos: "verb", arabic: "يستسلم / ينتج", definition: "To give way, surrender, or produce a result, amount, or crop.", examples: ["Under intense questioning, the witness refused to yield any new information.", "The experimental method may yield more accurate results than the traditional approach.", "Farmers hope the improved soil will yield a larger harvest this year."], synonyms: ["produce", "surrender", "generate"], day: 25, group: 3 },
  { word: "apprehension", pos: "noun", arabic: "تخوّف / قلق", definition: "A feeling of anxiety or fear that something bad may happen.", examples: ["She felt a sense of apprehension before the interview began.", "There is growing apprehension about the company’s financial future.", "His apprehension made it difficult for him to speak calmly."], synonyms: ["anxiety", "fear", "unease"], day: 26, group: 1 },
  { word: "ardent", pos: "adjective", arabic: "متحمّس / متقد", definition: "Showing intense passion, enthusiasm, or devotion.", examples: ["She is an ardent supporter of environmental reform.", "His ardent interest in history led him to become a researcher.", "The poet wrote an ardent letter expressing his admiration."], synonyms: ["passionate", "fervent", "zealous"], day: 26, group: 1 },
  { word: "axiomatic", pos: "adjective", arabic: "بديهي / مسلّم به", definition: "So evidently true that it is accepted without question or debate.", examples: ["It is axiomatic that regular practice improves performance.", "For the scientist, it was axiomatic that evidence must guide conclusions.", "The principle seems axiomatic to anyone familiar with basic ethics."], synonyms: ["selfevident", "obvious", "indisputable"], day: 26, group: 1 },
  { word: "cease", pos: "verb", arabic: "يتوقّف / يكفّ", definition: "To stop happening or come to an end.", examples: ["The factory will cease operations at the end of the month.", "They refused to cease protesting until the policy was changed.", "The noise finally ceased after midnight."], synonyms: ["stop", "end", "halt"], day: 26, group: 1 },
  { word: "conducive", pos: "adjective", arabic: "مساعد / ملائم", definition: "Making a certain situation, outcome, or activity likely or possible.", examples: ["A quiet room is conducive to deep concentration.", "Their cooperative attitude was conducive to a productive meeting.", "Warm weather and steady rain are conducive to plant growth."], synonyms: ["favorable", "helpful", "beneficial"], day: 26, group: 1 },
  { word: "corporeal", pos: "adjective", arabic: "جسدي / مادي", definition: "Relating to the physical body or material existence rather than the spirit or mind.", examples: ["The novel explores both corporeal suffering and emotional pain.", "Some philosophies distinguish between corporeal needs and spiritual desires.", "The sculpture emphasizes the beauty of the corporeal form."], synonyms: ["bodily", "physical", "material"], day: 26, group: 1 },
  { word: "doctrinaire", pos: "adjective", arabic: "مذهبي / متعصّب", definition: "Rigidly devoted to a doctrine or theory without regard for practical considerations.", examples: ["His doctrinaire approach left no room for compromise.", "The committee rejected the candidate because her views seemed too doctrinaire.", "A doctrinaire leader may ignore evidence that challenges his beliefs."], synonyms: ["dogmatic", "rigid", "ideological"], day: 26, group: 1 },
  { word: "eclectic", pos: "adjective", arabic: "انتقائي / متنوّع", definition: "Deriving ideas, style, or taste from a wide range of different sources.", examples: ["Her apartment has an eclectic mix of modern and antique furniture.", "The professor’s reading list was eclectic and intellectually stimulating.", "He has an eclectic taste in music, ranging from jazz to folk."], synonyms: ["diverse", "varied", "multifarious"], day: 26, group: 1 },
  { word: "equanimity", pos: "noun", arabic: "اتزان / رباطة جأش", definition: "Mental calmness and composure, especially in a difficult situation.", examples: ["She handled the crisis with remarkable equanimity.", "Even under criticism, he maintained his equanimity.", "Meditation helped her preserve equanimity during stressful times."], synonyms: ["calmness", "composure", "poise"], day: 26, group: 1 },
  { word: "exorbitant", pos: "adjective", arabic: "باهظ / مفرط", definition: "Unreasonably high or excessive, especially in price or amount.", examples: ["The hotel charged an exorbitant fee for room service.", "Many families cannot afford the exorbitant cost of private tuition.", "He refused to pay the exorbitant prices at the tourist shops."], synonyms: ["excessive", "outrageous", "inflated"], day: 26, group: 1 },
  { word: "fickle", pos: "adjective", arabic: "متقلب / نزق", definition: "Changing feelings, loyalties, or behavior frequently and unpredictably.", examples: ["Investors can be fickle when markets become uncertain.", "Her fickle enthusiasm for hobbies made it hard to predict what she would try next.", "Public opinion is often fickle during an election season."], synonyms: ["capricious", "changeable", "unpredictable"], day: 26, group: 2 },
  { word: "figurative", pos: "adjective", arabic: "مجازي / استعاري", definition: "Using words in a symbolic or nonliteral way to create imagery or convey meaning.", examples: ["When he said the classroom was a zoo, he was speaking in a figurative sense.", "Poets often rely on figurative language to make their images more vivid.", "Her figurative description of grief helped readers feel its weight."], synonyms: ["metaphorical", "symbolic", "nonliteral"], day: 26, group: 2 },
  { word: "flustered", pos: "adjective", arabic: "مرتبك / مشوش", definition: "Nervous, agitated, or confused, especially because of pressure or surprise.", examples: ["She became flustered when the interviewer asked an unexpected question.", "The flustered waiter dropped the menu while trying to apologize.", "He sounded flustered after realizing he had gone to the wrong meeting."], synonyms: ["agitated", "confused", "rattled"], day: 26, group: 2 },
  { word: "gullible", pos: "adjective", arabic: "ساذج / سريع التصديق", definition: "Too willing to believe what other people say and therefore easily deceived.", examples: ["Only a gullible customer would believe that promise of instant wealth.", "The prank succeeded because the audience was surprisingly gullible.", "He was too gullible to question the fake email's urgent request."], synonyms: ["naive", "credulous", "unsuspecting"], day: 26, group: 2 },
  { word: "idiosyncratic", pos: "adjective", arabic: "خاص / شاذ", definition: "Peculiar or distinctive in a way that is unique to an individual, group, or thing.", examples: ["The professor's idiosyncratic grading style confused students at first.", "Her idiosyncratic fashion choices made her instantly recognizable.", "The novel's charm lies in its idiosyncratic humor and structure."], synonyms: ["eccentric", "quirky", "peculiar"], day: 26, group: 2 },
  { word: "incidental", pos: "adjective", arabic: "عرضي / ثانوي", definition: "Occurring as a minor accompaniment or by chance in connection with something else.", examples: ["The error was incidental to the larger problem in the report.", "We discovered some incidental benefits while testing the new procedure.", "His mention of the award was incidental and not meant to impress anyone."], synonyms: ["secondary", "minor", "accidental"], day: 26, group: 2 },
  { word: "ingrained", pos: "adjective", arabic: "متأصل / راسخ", definition: "Firmly established and difficult to change because of long habit or deep influence.", examples: ["The community's ingrained traditions shaped every annual celebration.", "Years of practice created an ingrained habit of double-checking his work.", "Their ingrained mistrust of outsiders slowed the negotiations."], synonyms: ["deepseated", "entrenched", "fixed"], day: 26, group: 2 },
  { word: "insolent", pos: "adjective", arabic: "وقح / متبجح", definition: "Showing rude and arrogant lack of respect toward others.", examples: ["The manager warned the employee about his insolent tone.", "Her insolent reply shocked everyone at the formal dinner.", "The student was punished for making an insolent remark to the teacher."], synonyms: ["impudent", "disrespectful", "impertinent"], day: 26, group: 2 },
  { word: "lampoon", pos: "verb", arabic: "يهجو / يسخر من", definition: "To mock or ridicule someone or something publicly, often through satire.", examples: ["The editorial cartoonists lampoon corrupt officials with sharp wit.", "The comedian used his monologue to lampoon celebrity culture.", "That novel seems to lampoon the pretensions of the upper class."], synonyms: ["satirize", "mock", "ridicule"], day: 26, group: 2 },
  { word: "lavish", pos: "adjective", arabic: "مترف / فخم", definition: "Rich, elaborate, or generously abundant in amount, style, or spending.", examples: ["They hosted a lavish wedding at a historic palace.", "The film is known for its lavish costumes and grand sets.", "She received lavish praise for her groundbreaking research."], synonyms: ["luxurious", "sumptuous", "opulent"], day: 26, group: 2 },
  { word: "lugubrious", pos: "adjective", arabic: "حزين / كئيب", definition: "Feeling or expressing exaggerated sadness or gloom.", examples: ["His lugubrious tone made the cheerful news sound like a tragedy.", "The novel opens with a lugubrious description of the abandoned house.", "She grew tired of his lugubrious complaints about every minor inconvenience."], synonyms: ["mournful", "dismal", "melancholy"], day: 26, group: 3 },
  { word: "macabre", pos: "adjective", arabic: "مروع / مرعب", definition: "Disturbing because of an association with death, violence, or the gruesome.", examples: ["The museum featured a macabre exhibit of medieval torture devices.", "He had a macabre fascination with horror films and crime scene photos.", "The story takes a macabre turn when the guests discover a coffin in the cellar."], synonyms: ["ghastly", "grisly", "morbid"], day: 26, group: 3 },
  { word: "morose", pos: "adjective", arabic: "عابس / كئيب", definition: "Sullen, gloomy, and unwilling to engage cheerfully with others.", examples: ["After the loss, he became morose and avoided social gatherings.", "The morose child stared out the window without saying a word.", "Her morose expression suggested that the meeting had gone badly."], synonyms: ["sullen", "gloomy", "glum"], day: 26, group: 3 },
  { word: "officious", pos: "adjective", arabic: "متدخل / فضولي", definition: "Assertively eager to give unwanted advice or help, often in an irritating way.", examples: ["An officious neighbor kept telling us how to organize our garden.", "The officious clerk insisted on checking every form twice, even when no one asked.", "She was annoyed by his officious attempts to manage her schedule."], synonyms: ["meddlesome", "interfering", "intrusive"], day: 26, group: 3 },
  { word: "ramification", pos: "noun", arabic: "تداعية / نتيجة", definition: "A consequence or complex result of an action, decision, or event.", examples: ["They failed to consider the legal ramifications of sharing the data.", "One ramification of the policy was a sharp decline in small businesses.", "The environmental ramifications of the spill will be studied for years."], synonyms: ["consequence", "repercussion", "outcome"], day: 26, group: 3 },
  { word: "serene", pos: "adjective", arabic: "هادئ / ساكن", definition: "Calm, peaceful, and untroubled in manner or appearance.", examples: ["The lake looked serene in the early morning light.", "Despite the chaos around her, she remained serene and focused.", "We spent the weekend in a serene village surrounded by olive trees."], synonyms: ["tranquil", "placid", "peaceful"], day: 26, group: 3 },
  { word: "supplant", pos: "verb", arabic: "يحل محل / يستبدل", definition: "To take the place of something or someone, often by force, strategy, or superiority.", examples: ["Streaming services have begun to supplant traditional cable television.", "The young executive hoped to supplant the current director within a few years.", "New evidence may supplant the older theory about the site's origins."], synonyms: ["replace", "displace", "supersede"], day: 26, group: 3 },
  { word: "tacit", pos: "adjective", arabic: "ضمني / غير مصرح به", definition: "Understood or implied without being directly stated.", examples: ["There was a tacit agreement that no one would mention the scandal.", "Her smile conveyed tacit approval of the risky plan.", "The team operated under a tacit understanding that deadlines were nonnegotiable."], synonyms: ["implicit", "unspoken", "implied"], day: 26, group: 3 },
  { word: "transcend", pos: "verb", arabic: "يتجاوز / يسمو فوق", definition: "To go beyond the limits of something ordinary, expected, or defined.", examples: ["Great art can transcend cultural and linguistic boundaries.", "Her kindness seemed to transcend personal ambition.", "The philosopher argued that reason alone cannot transcend every human limitation."], synonyms: ["surpass", "exceed", "outstrip"], day: 26, group: 3 },
  { word: "treatise", pos: "noun", arabic: "رسالة / أطروحة", definition: "A formal, systematic written work that examines a subject in depth.", examples: ["He spent a decade writing a treatise on constitutional law.", "The professor assigned a dense treatise on political ethics.", "Her treatise on urban design influenced planners across the country."], synonyms: ["dissertation", "tract", "thesis"], day: 26, group: 3 },
  { word: "antagonize", pos: "verb", arabic: "يستفز / يثير العداء", definition: "To provoke someone into anger, hostility, or opposition.", examples: ["His sarcastic remarks continued to antagonize his coworkers throughout the meeting.", "The new policy may antagonize residents who already feel ignored by city officials.", "She tried not to antagonize the referee with her complaints."], synonyms: ["provoke", "irritate", "offend"], day: 27, group: 1 },
  { word: "barren", pos: "adjective", arabic: "قاحل / عقيم", definition: "Unable to produce vegetation, fruit, or any meaningful result; lacking liveliness or productivity.", examples: ["The travelers crossed a barren landscape with little water or shade.", "After years of neglect, the once fertile field had become barren.", "Their discussion proved barren because neither side offered a practical solution."], synonyms: ["sterile", "desolate", "unproductive"], day: 27, group: 1 },
  { word: "bombastic", pos: "adjective", arabic: "رنان / متكلف", definition: "Using inflated, pompous, or overly grand language to impress others.", examples: ["The candidate's bombastic speech was full of dramatic promises and vague slogans.", "Critics dismissed the article as bombastic and lacking real substance.", "His bombastic style made even simple announcements sound absurdly important."], synonyms: ["pompous", "grandiloquent", "pretentious"], day: 27, group: 1 },
  { word: "cajole", pos: "verb", arabic: "يستميل / يتملق", definition: "To persuade someone through flattery, gentle urging, or insincere promises.", examples: ["She managed to cajole her younger brother into finishing his homework.", "The salesperson tried to cajole customers with compliments and special offers.", "They hoped to cajole the committee into approving the proposal."], synonyms: ["coax", "wheedle", "persuade"], day: 27, group: 1 },
  { word: "chary", pos: "adjective", arabic: "حذر / متحفظ", definition: "Cautious, wary, and unwilling to act too quickly or freely.", examples: ["Investors remain chary of companies that promise rapid returns with little evidence.", "She was chary about sharing personal details with strangers online.", "The editor grew chary of accepting anonymous submissions after the scandal."], synonyms: ["cautious", "wary", "guarded"], day: 27, group: 1 },
  { word: "curmudgeon", pos: "noun", arabic: "شخص متذمر / عجوز نكد", definition: "A bad-tempered, difficult, and habitually complaining person.", examples: ["The old curmudgeon at the corner store grumbled about every customer.", "Although he seemed like a curmudgeon, he was secretly generous to his neighbors.", "The novel's hero is a lovable curmudgeon who resists change at every turn."], synonyms: ["grump", "grouch", "misanthrope"], day: 27, group: 1 },
  { word: "dirge", pos: "noun", arabic: "مرثية / نشيد جنائزي", definition: "A mournful song, poem, or piece of music performed in remembrance of the dead.", examples: ["The choir sang a solemn dirge at the memorial service.", "Rain tapped against the windows like a dirge for the dying year.", "The film opened with a haunting dirge that set a tragic mood."], synonyms: ["lament", "elegy", "threnody"], day: 27, group: 1 },
  { word: "estimable", pos: "adjective", arabic: "جدير بالاحترام / موقر", definition: "Worthy of respect, admiration, or high regard.", examples: ["She earned a reputation as an estimable scholar and generous mentor.", "The charity supports several estimable causes in underserved communities.", "Despite their disagreement, he considered her an estimable colleague."], synonyms: ["admirable", "respectable", "worthy"], day: 27, group: 1 },
  { word: "euphemism", pos: "noun", arabic: "تعبير ملطف / كناية ملطفة", definition: "A mild or indirect word or phrase used in place of one considered harsh, blunt, or unpleasant.", examples: ["'Passed away' is a common euphemism for 'died.'", "The company used euphemism to describe layoffs as a workforce realignment.", "Politicians often rely on euphemism to make unpopular policies sound acceptable."], synonyms: ["circumlocution", "understatement", "softener"], day: 27, group: 1 },
  { word: "excoriate", pos: "verb", arabic: "يوبخ بشدة / يجلد بالنقد", definition: "To criticize someone or something extremely harshly.", examples: ["The reviewer excoriated the novel for its weak plot and shallow characters.", "Activists excoriate officials who ignore clear evidence of corruption.", "She was quick to excoriate the proposal as irresponsible and shortsighted."], synonyms: ["denounce", "castigate", "rebuke"], day: 27, group: 1 },
  { word: "exigent", pos: "adjective", arabic: "ملحّ / طارئ", definition: "Requiring immediate action or attention because the situation is urgent or pressing.", examples: ["The doctor was called away to deal with an exigent case in the emergency room.", "Exigent circumstances forced the committee to postpone the vote until morning.", "Because the repairs were exigent, the landlord sent a plumber that same night."], synonyms: ["urgent", "pressing", "critical"], day: 27, group: 2 },
  { word: "haughty", pos: "adjective", arabic: "متكبّر / متعجرف", definition: "Showing arrogant superiority and disdain toward others.", examples: ["Her haughty tone made even simple advice sound like an insult.", "The prince gave the servants a haughty glance and walked on.", "Many voters disliked the candidate's haughty manner during the debate."], synonyms: ["arrogant", "snobbish", "supercilious"], day: 27, group: 2 },
  { word: "heady", pos: "adjective", arabic: "مُسكر / مُبهِج", definition: "Highly exciting, intense, or intoxicating in effect.", examples: ["The team was swept up in the heady excitement of its first championship win.", "Success brought a heady confidence that made the young founder take risks.", "The perfume released a heady scent that filled the small room."], synonyms: ["intoxicating", "exhilarating", "stimulating"], day: 27, group: 2 },
  { word: "imperturbable", pos: "adjective", arabic: "هادئ لا يتزعزع / رصين", definition: "Remaining calm and unshaken even in difficult or stressful situations.", examples: ["Despite the chaos backstage, the conductor remained imperturbable.", "Her imperturbable expression revealed nothing during the tense interview.", "An imperturbable pilot can reassure passengers during severe turbulence."], synonyms: ["calm", "composed", "unflappable"], day: 27, group: 2 },
  { word: "implacable", pos: "adjective", arabic: "لا يلين / لا هوادة فيه", definition: "Impossible to pacify, satisfy, or change because of relentless hostility or determination.", examples: ["The judge faced implacable criticism from both sides of the political divide.", "After the betrayal, she regarded him with implacable hatred.", "The desert sun was implacable, beating down on the travelers all afternoon."], synonyms: ["unyielding", "relentless", "inexorable"], day: 27, group: 2 },
  { word: "lambaste", pos: "verb", arabic: "يوبّخ بشدة / يجلد بالكلام", definition: "To criticize or scold someone or something very harshly.", examples: ["Editorial writers lambaste the policy for ignoring basic economic realities.", "The coach lambaste the players after their careless performance.", "She was quick to lambaste any proposal that threatened the library's funding."], synonyms: ["berate", "castigate", "denounce"], day: 27, group: 2 },
  { word: "miscreant", pos: "noun", arabic: "آثم / وغد", definition: "A person who behaves badly or commits a wrongdoing.", examples: ["The sheriff promised to catch the miscreant who had been stealing livestock.", "In the novel, a charming miscreant tricks the wealthy guests at the resort.", "Security guards escorted the miscreant out of the stadium after the fight."], synonyms: ["villain", "scoundrel", "rogue"], day: 27, group: 2 },
  { word: "peccadillo", pos: "noun", arabic: "هفوة صغيرة / زلة", definition: "A minor fault, offense, or moral lapse that is relatively insignificant.", examples: ["The biographer treated the senator's gambling as a youthful peccadillo rather than a scandal.", "Compared with the massive fraud, the filing error seemed like a mere peccadillo.", "Her occasional lateness was a small peccadillo that her friends easily forgave."], synonyms: ["foible", "flaw", "indiscretion"], day: 27, group: 2 },
  { word: "philistine", pos: "noun", arabic: "عدو الثقافة / جاهل بالفنون", definition: "A person who is indifferent or hostile to art, culture, or intellectual pursuits.", examples: ["He dismissed poetry as useless, confirming his reputation as a philistine.", "The critic argued that only a philistine could bulldoze a historic theater for parking.", "She refused to let a philistine attitude shape the school's arts curriculum."], synonyms: ["boor", "barbarian", "antiintellectual"], day: 27, group: 2 },
  { word: "relegate", pos: "verb", arabic: "يُنزّل / يُحيل", definition: "To assign someone or something to a lower rank, less important position, or remote place.", examples: ["The editor chose not to cut the paragraph but to relegate it to the end of the article.", "Women were once unfairly relegated to supporting roles in many professions.", "He did not want his research to be relegated to a footnote in the final report."], synonyms: ["demote", "downgrade", "banish"], day: 27, group: 2 },
  { word: "repugnant", pos: "adjective", arabic: "مقزز / بغيض", definition: "Extremely offensive, unacceptable, or disgusting to the mind or feelings.", examples: ["His repugnant behavior at the meeting shocked everyone in the room.", "Many people find the idea of harming innocent animals morally repugnant.", "The novel portrays a repugnant villain who feels no remorse for his crimes."], synonyms: ["offensive", "abhorrent", "disgusting"], day: 27, group: 3 },
  { word: "sentimental", pos: "adjective", arabic: "عاطفي / وجداني", definition: "Excessively influenced by tender emotions, especially in a way that is nostalgic or not fully rational.", examples: ["She kept the old ticket stub for purely sentimental reasons.", "The film becomes overly sentimental in its final scenes.", "Although he sounded tough, he was deeply sentimental about his hometown."], synonyms: ["emotional", "nostalgic", "maudlin"], day: 27, group: 3 },
  { word: "squander", pos: "verb", arabic: "يهدر / يبدد", definition: "To waste something valuable, especially money, time, or opportunities, in a reckless or foolish way.", examples: ["He squandered his inheritance on luxury cars and lavish parties.", "Do not squander your chance to study with such an excellent teacher.", "The company squandered valuable resources on a failed marketing campaign."], synonyms: ["waste", "dissipate", "fritter"], day: 27, group: 3 },
  { word: "swindle", pos: "verb", arabic: "يحتال / يخدع", definition: "To cheat someone out of money or property through deception or fraud.", examples: ["The con artist tried to swindle elderly investors with false promises.", "She was swindled out of her savings by an online scam.", "Authorities arrested the group for attempting to swindle customers with fake contracts."], synonyms: ["defraud", "cheat", "dupe"], day: 27, group: 3 },
  { word: "tangible", pos: "adjective", arabic: "ملموس / محسوس", definition: "Able to be touched physically or clearly perceived as real and definite.", examples: ["After months of planning, the team finally saw tangible results.", "The museum displays tangible artifacts from the ancient civilization.", "There is no tangible evidence linking the suspect to the crime."], synonyms: ["concrete", "palpable", "material"], day: 27, group: 3 },
  { word: "turpitude", pos: "noun", arabic: "انحطاط / فجور", definition: "Depravity or wickedness of character, especially in moral behavior.", examples: ["The judge condemned the act as evidence of profound moral turpitude.", "History remembers the regime for its corruption and political turpitude.", "The scandal exposed the ethical turpitude of several senior officials."], synonyms: ["depravity", "vileness", "corruption"], day: 27, group: 3 },
  { word: "unalloyed", pos: "adjective", arabic: "خالص / صرف", definition: "Complete and pure, without anything that weakens or reduces it.", examples: ["She felt unalloyed joy when she heard the good news.", "His victory was one of unalloyed triumph after years of struggle.", "The child's unalloyed delight made everyone around her smile."], synonyms: ["pure", "absolute", "undiluted"], day: 27, group: 3 },
  { word: "undercut", pos: "verb", arabic: "يقوض / يبخس", definition: "To weaken, lessen, or undermine something, or to sell more cheaply than a competitor.", examples: ["Constant criticism can undercut a student's confidence.", "The discount store managed to undercut its rivals by lowering prices.", "His careless remark threatened to undercut the message of unity."], synonyms: ["undermine", "weaken", "underprice"], day: 27, group: 3 },
  { word: "wheedle", pos: "verb", arabic: "يستدرج / يستميل", definition: "To persuade someone gradually by flattery, coaxing, or gentle urging.", examples: ["The child tried to wheedle an extra dessert from her mother.", "He wheedled his way into the exclusive event with compliments and charm.", "You cannot wheedle me into changing my decision."], synonyms: ["coax", "cajole", "persuade"], day: 27, group: 3 },
  { word: "xenophobic", pos: "adjective", arabic: "معاد للأجانب / كاره للأجانب", definition: "Having or showing an unreasonable fear of or hostility toward foreigners or strangers.", examples: ["The politician was criticized for making xenophobic remarks during the campaign.", "Xenophobic attitudes can divide communities and fuel discrimination.", "The article warned against the rise of xenophobic movements across the region."], synonyms: ["nationalistic", "prejudiced", "bigoted"], day: 27, group: 3 },
  { word: "abeyance", pos: "noun", arabic: "تعليق / وقف مؤقت", definition: "A state of temporary disuse, suspension, or inactivity.", examples: ["The legal dispute was held in abeyance until new evidence emerged.", "After the merger, several hiring plans remained in abeyance for months.", "The committee agreed to keep the proposal in abeyance until the budget was approved."], synonyms: ["suspension", "dormancy", "latency"], day: 28, group: 1 },
  { word: "abstract", pos: "adjective", arabic: "مجرد / نظري", definition: "Existing as an idea, quality, or concept rather than as a concrete object or specific instance.", examples: ["Justice is an abstract principle that can be difficult to define precisely.", "The philosopher preferred abstract arguments to practical examples.", "Her painting used abstract shapes and colors to express emotion."], synonyms: ["theoretical", "conceptual", "intangible"], day: 28, group: 1 },
  { word: "affront", pos: "noun", arabic: "إهانة / إساءة", definition: "An action or remark that causes outrage or offense because it shows disrespect.", examples: ["He considered the rude interruption a personal affront.", "Ignoring the host's invitation was seen as an affront to everyone present.", "The unfair accusation felt like an affront to her integrity."], synonyms: ["insult", "offense", "slight"], day: 28, group: 1 },
  { word: "agitate", pos: "verb", arabic: "يحرّض / يهيّج", definition: "To stir up strong feelings, trouble, or public concern, or to disturb from a calm state.", examples: ["The activist tried to agitate for reform in the education system.", "Rumors of layoffs began to agitate the employees.", "Do not agitate the solution before the sediment settles."], synonyms: ["stir", "provoke", "disturb"], day: 28, group: 1 },
  { word: "august", pos: "adjective", arabic: "مهيب / جليل", definition: "Respected and impressive because of great dignity, authority, or age.", examples: ["The award was presented by an august panel of judges.", "She spoke in the august hall with remarkable composure.", "The university is known for its august tradition of scholarship."], synonyms: ["dignified", "majestic", "venerable"], day: 28, group: 1 },
  { word: "burnish", pos: "verb", arabic: "يلمّع / يصقل", definition: "To polish something until it shines, or to enhance and improve its appearance or reputation.", examples: ["He used a soft cloth to burnish the silver bowl.", "The charity event helped burnish the company's public image.", "Years of disciplined practice burnished her skills as a speaker."], synonyms: ["polish", "shine", "refine"], day: 28, group: 1 },
  { word: "coy", pos: "adjective", arabic: "خجول متصنع / متمنّع", definition: "Pretending to be shy, modest, or reluctant in a playful or affected way.", examples: ["She gave a coy smile when asked about the surprise.", "His coy response revealed little about his true intentions.", "The actress remained coy during the interview about her next role."], synonyms: ["bashful", "demure", "reticent"], day: 28, group: 1 },
  { word: "deprecate", pos: "verb", arabic: "يستنكر / يقلل من شأن", definition: "To express disapproval of something or to regard it as less important or valuable.", examples: ["Many scientists deprecate the misuse of data in public debates.", "He would often deprecate his own achievements to appear humble.", "The editor deprecated sensational headlines that distorted the facts."], synonyms: ["disapprove", "belittle", "denounce"], day: 28, group: 1 },
  { word: "disdain", pos: "noun", arabic: "ازدراء / احتقار", definition: "A feeling of scornful contempt toward someone or something regarded as unworthy.", examples: ["She looked at the sloppy work with open disdain.", "His disdain for dishonesty was evident in his speech.", "The critic expressed disdain for the film's predictable plot."], synonyms: ["contempt", "scorn", "derision"], day: 28, group: 1 },
  { word: "disperse", pos: "verb", arabic: "يفرّق / يبدد", definition: "To scatter, spread out, or cause people or things to move in different directions.", examples: ["The police ordered the crowd to disperse after the protest ended.", "Wind began to disperse the smoke over the valley.", "Seeds disperse naturally when the pods burst open."], synonyms: ["scatter", "dissipate", "diffuse"], day: 28, group: 1 },
  { word: "distend", pos: "verb", arabic: "ينتفخ / يتمدد", definition: "To swell, expand, or stretch out from internal pressure or fullness.", examples: ["After the large meal, his stomach began to distend painfully.", "The biologist watched the pufferfish distend its body as a defense mechanism.", "Gas can distend the metal container if the pressure rises too high."], synonyms: ["swell", "expand", "inflate"], day: 28, group: 2 },
  { word: "endemic", pos: "adjective", arabic: "متوطن / مستوطن", definition: "Regularly found and characteristic of a particular place, population, or condition.", examples: ["Malaria remains endemic in some tropical regions.", "Corruption had become endemic within the organization over decades.", "The island is home to several endemic plant species found nowhere else."], synonyms: ["native", "prevalent", "indigenous"], day: 28, group: 2 },
  { word: "enmity", pos: "noun", arabic: "عداء / خصومة", definition: "A state of deep-seated hostility or hatred between people or groups.", examples: ["Years of enmity between the rival families made reconciliation difficult.", "Political enmity often prevents leaders from cooperating on urgent issues.", "His casual remark sparked unexpected enmity among former friends."], synonyms: ["hostility", "hatred", "animosity"], day: 28, group: 2 },
  { word: "gauche", pos: "adjective", arabic: "أخرق / غير لبق", definition: "Lacking social grace, sensitivity, or ease; awkward in manner.", examples: ["He felt gauche at the formal dinner because he did not know the etiquette.", "Her gauche comment about money made everyone at the table uncomfortable.", "As a teenager, she was painfully gauche in social situations."], synonyms: ["awkward", "clumsy", "uncouth"], day: 28, group: 2 },
  { word: "hysterical", pos: "adjective", arabic: "هستيري / منفعل", definition: "Extremely emotional or uncontrolled, or extremely funny in a way that causes laughter.", examples: ["She became hysterical when she realized her child was missing.", "The audience found the comedian's final story absolutely hysterical.", "In the emergency room, the nurse spoke calmly to the hysterical patient."], synonyms: ["frantic", "overwrought", "wild"], day: 28, group: 2 },
  { word: "impudent", pos: "adjective", arabic: "وقح / جريء", definition: "Boldly rude, disrespectful, or offensively shameless.", examples: ["The impudent student interrupted the professor with a mocking tone.", "It was impudent of him to demand a promotion after arriving late every day.", "Her impudent reply shocked the entire committee."], synonyms: ["insolent", "brazen", "cheeky"], day: 28, group: 2 },
  { word: "inchoate", pos: "adjective", arabic: "غير مكتمل / بدائي", definition: "Just begun and not yet fully formed, organized, or developed.", examples: ["His ideas were still inchoate, so the proposal lacked clear structure.", "The movement began as an inchoate response to widespread frustration.", "She struggled to express the inchoate feelings that had troubled her for weeks."], synonyms: ["rudimentary", "formless", "nascent"], day: 28, group: 2 },
  { word: "penchant", pos: "noun", arabic: "ميل / ولع", definition: "A strong natural liking or habitual tendency toward something.", examples: ["She has a penchant for solving difficult logic puzzles.", "His penchant for dramatic speeches sometimes annoyed his colleagues.", "The designer's penchant for minimalism shaped the entire collection."], synonyms: ["fondness", "liking", "predilection"], day: 28, group: 2 },
  { word: "quandary", pos: "noun", arabic: "حيرة / معضلة", definition: "A state of uncertainty or confusion about what to do in a difficult situation.", examples: ["She was in a quandary over whether to accept the job abroad.", "The unexpected budget cuts left the committee in a serious quandary.", "Faced with two equally appealing offers, he found himself in a quandary."], synonyms: ["dilemma", "predicament", "confusion"], day: 28, group: 2 },
  { word: "quarantine", pos: "noun", arabic: "حجر صحي / عزل", definition: "A period or state of isolation imposed to prevent the spread of disease or contamination.", examples: ["The travelers were placed in quarantine after possible exposure to the virus.", "The farm remained under quarantine until officials confirmed the animals were healthy.", "During quarantine, she stayed home and communicated only online."], synonyms: ["isolation", "seclusion", "containment"], day: 28, group: 2 },
  { word: "quash", pos: "verb", arabic: "يقمع / يُبطل", definition: "To suppress something forcefully or to put an end to it decisively.", examples: ["The government moved quickly to quash the uprising before it spread.", "The judge decided to quash the indictment because of procedural errors.", "She tried to quash the rumor before it damaged anyone's reputation."], synonyms: ["suppress", "crush", "nullify"], day: 28, group: 3 },
  { word: "quibble", pos: "verb", arabic: "يجادل في توافه الأمور / يماحك", definition: "To argue or complain about trivial details rather than important issues.", examples: ["Instead of addressing the main proposal, he began to quibble over minor wording changes.", "They always quibble about the bill, even when the amount is small.", "It is pointless to quibble with her over such an insignificant mistake."], synonyms: ["bicker", "cavil", "nitpick"], day: 28, group: 3 },
  { word: "ravage", pos: "verb", arabic: "يُدمّر / يعيث خرابًا", definition: "To cause severe destruction or damage to something.", examples: ["The hurricane continued to ravage the coastal towns throughout the night.", "Years of war ravaged the country's economy and infrastructure.", "The disease can ravage the body if it is left untreated."], synonyms: ["devastate", "destroy", "ruin"], day: 28, group: 3 },
  { word: "recant", pos: "verb", arabic: "يتراجع / ينكر", definition: "To formally withdraw or renounce a previously stated belief, claim, or confession.", examples: ["Under pressure, the witness refused to recant his earlier testimony.", "The author was asked to recant her controversial statement, but she stood by it.", "He chose to recant his confession after speaking with a lawyer."], synonyms: ["retract", "renounce", "withdraw"], day: 28, group: 3 },
  { word: "redoubtable", pos: "adjective", arabic: "مهيب / رهيب", definition: "Inspiring fear, respect, or admiration because of great strength or ability.", examples: ["She was a redoubtable opponent in every debate competition.", "The general faced a redoubtable enemy with remarkable courage.", "His redoubtable intellect made him a formidable scholar."], synonyms: ["formidable", "fearsome", "daunting"], day: 28, group: 3 },
  { word: "retiring", pos: "adjective", arabic: "خجول / متحفظ", definition: "Shy and reserved in manner, especially around other people.", examples: ["Although brilliant, she was too retiring to seek public attention.", "His retiring nature made networking events uncomfortable for him.", "The professor seemed retiring at first, but he became animated when discussing literature."], synonyms: ["shy", "reserved", "modest"], day: 28, group: 3 },
  { word: "shrill", pos: "adjective", arabic: "حاد / صاخب", definition: "High-pitched and piercing in sound or harsh and excessively forceful in tone.", examples: ["A shrill alarm woke everyone in the building before dawn.", "Her shrill voice carried across the crowded auditorium.", "The critic dismissed the article as shrill and overly emotional."], synonyms: ["piercing", "strident", "harsh"], day: 28, group: 3 },
  { word: "sophistry", pos: "noun", arabic: "مغالطة / سفسطة", definition: "Reasoning that seems clever but is actually false or misleading.", examples: ["The lawyer's argument was dismissed as mere sophistry by the judge.", "Political sophistry can make weak policies sound convincing to the public.", "She saw through the sophistry and demanded clear evidence instead."], synonyms: ["fallacy", "deception", "casuistry"], day: 28, group: 3 },
  { word: "substantiate", pos: "verb", arabic: "يدعم بالأدلة / يثبت", definition: "To support a claim or statement with evidence or proof.", examples: ["Researchers must substantiate their conclusions with reliable data.", "He failed to substantiate his accusations during the hearing.", "The report includes several documents that substantiate the company's financial losses."], synonyms: ["verify", "confirm", "corroborate"], day: 28, group: 3 },
  { word: "wily", pos: "adjective", arabic: "ماكر / داهية", definition: "Skilled at using clever and deceitful methods to achieve a goal.", examples: ["The wily negotiator secured a favorable deal without revealing his true intentions.", "In the folktale, a wily fox tricks the farmer repeatedly.", "She remained cautious around the wily investor, suspecting a hidden agenda."], synonyms: ["cunning", "crafty", "sly"], day: 28, group: 3 },
  { word: "abscond", pos: "verb", arabic: "يفر / يختفي", definition: "To leave hurriedly and secretly, especially to avoid detection or legal prosecution.", examples: ["The accountant absconded with the charity's funds before anyone noticed the missing money.", "Fearing arrest, the suspect chose to abscond during the night.", "Several employees worried that the manager would abscond after the scandal became public."], synonyms: ["flee", "escape", "vanish"], day: 29, group: 1 },
  { word: "apogee", pos: "noun", arabic: "ذروة / أوج", definition: "The highest point or most successful stage of something.", examples: ["Her career reached its apogee when she won the international science prize.", "The empire was at its apogee just before internal conflicts began to weaken it.", "Critics consider the novel the apogee of the author's creative powers."], synonyms: ["peak", "zenith", "summit"], day: 29, group: 1 },
  { word: "aspersion", pos: "noun", arabic: "افتراء / طعن", definition: "A damaging or false remark that casts doubt on someone's character or reputation.", examples: ["The columnist cast an aspersion on the judge's integrity without offering any evidence.", "She viewed the rumor as an aspersion against her family's good name.", "During the debate, he avoided making any aspersion about his opponent's motives."], synonyms: ["slander", "calumny", "defamation"], day: 29, group: 1 },
  { word: "bawdy", pos: "adjective", arabic: "بذيء / فاحش", definition: "Humorously indecent or dealing with sexual matters in a crude way.", examples: ["The comedian's bawdy jokes shocked some audience members but amused others.", "The play was known for its bawdy dialogue and irreverent tone.", "He apologized for making a bawdy remark at the formal dinner."], synonyms: ["lewd", "ribald", "coarse"], day: 29, group: 1 },
  { word: "chagrin", pos: "noun", arabic: "خيبة / انزعاج", definition: "A feeling of distress or embarrassment caused by failure, disappointment, or humiliation.", examples: ["To her chagrin, she discovered that she had sent the email to the wrong person.", "Much to his chagrin, the committee rejected his carefully prepared proposal.", "Their early defeat was a source of great chagrin for the defending champions."], synonyms: ["embarrassment", "disappointment", "mortification"], day: 29, group: 1 },
  { word: "collude", pos: "verb", arabic: "يتواطأ / يتآمر", definition: "To cooperate secretly or dishonestly with others for a deceitful or illegal purpose.", examples: ["The two companies were accused of colluding to fix prices in the market.", "Officials denied that they had colluded with contractors to manipulate the bids.", "If rivals collude, consumers often end up paying more for fewer choices."], synonyms: ["conspire", "plot", "scheme"], day: 29, group: 1 },
  { word: "commiserate", pos: "verb", arabic: "يتعاطف / يواسي", definition: "To express sympathy or sorrow for someone who is experiencing misfortune.", examples: ["After hearing about her loss, friends gathered to commiserate with her.", "We visited our colleague to commiserate after his project was abruptly canceled.", "They did not merely commiserate; they also offered practical help."], synonyms: ["sympathize", "console", "condole"], day: 29, group: 1 },
  { word: "conflagration", pos: "noun", arabic: "حريق هائل / حريق ضخم", definition: "A large and destructive fire that spreads rapidly.", examples: ["The warehouse conflagration could be seen from miles away across the city.", "Firefighters worked all night to contain the conflagration before it reached nearby homes.", "A single spark in the dry forest triggered a devastating conflagration."], synonyms: ["inferno", "blaze", "fire"], day: 29, group: 1 },
  { word: "contretemps", pos: "noun", arabic: "موقف محرج / حادث غير متوقع", definition: "A small but embarrassing mishap or an unexpected disagreement that disrupts events.", examples: ["A seating contretemps at the wedding caused brief confusion among the guests.", "Their business meeting ended in a contretemps over the terms of the contract.", "Despite a minor contretemps with the luggage, the trip began smoothly."], synonyms: ["mishap", "dispute", "snag"], day: 29, group: 1 },
  { word: "conviction", pos: "noun", arabic: "قناعة / إدانة", definition: "A firmly held belief or, in a legal context, a formal declaration that someone is guilty of a crime.", examples: ["She spoke with such conviction that even her critics paused to listen.", "His conviction that education can transform lives guided all his charitable work.", "The conviction of the defendant followed weeks of testimony and deliberation."], synonyms: ["belief", "certainty", "verdict"], day: 29, group: 1 },
  { word: "croon", pos: "verb", arabic: "يدندن / يترنم", definition: "To sing or speak in a soft, low, soothing voice.", examples: ["She began to croon a lullaby to calm the crying baby.", "The jazz singer would croon gently into the microphone.", "He tried to croon reassuring words to the nervous dog."], synonyms: ["hum", "murmur", "chant"], day: 29, group: 2 },
  { word: "depose", pos: "verb", arabic: "يخلع / يعزل", definition: "To remove someone from power or office, especially a ruler or leader.", examples: ["The military moved quickly to depose the dictator.", "Rebels threatened to depose the king after months of unrest.", "The board voted to depose the chairman from his position."], synonyms: ["dethrone", "oust", "unseat"], day: 29, group: 2 },
  { word: "detente", pos: "noun", arabic: "انفراج / تهدئة", definition: "A relaxation of hostility or strained relations, especially between countries.", examples: ["The treaty marked a period of detente between the rival nations.", "Diplomats hoped the summit would lead to detente in the region.", "Years of detente followed the leaders' historic handshake."], synonyms: ["easing", "accord", "reconciliation"], day: 29, group: 2 },
  { word: "dowdy", pos: "adjective", arabic: "مهندم بشكل رديء / رث", definition: "Unfashionable and unattractive in appearance, especially in dress.", examples: ["She felt embarrassed by her dowdy coat at the elegant party.", "The apartment looked dowdy despite its spacious layout.", "Critics said the costume design made the heroine appear unnecessarily dowdy."], synonyms: ["frumpy", "drab", "shabby"], day: 29, group: 2 },
  { word: "echelon", pos: "noun", arabic: "مستوى / شريحة", definition: "A level or rank in an organization, profession, or society.", examples: ["She rose to the highest echelon of corporate leadership.", "Only a few officers in the upper echelon knew about the plan.", "The university attracts students from every social echelon."], synonyms: ["level", "rank", "tier"], day: 29, group: 2 },
  { word: "ennui", pos: "noun", arabic: "سأم / ملل", definition: "A feeling of weariness and dissatisfaction caused by boredom or lack of interest.", examples: ["After weeks of routine, he sank into deep ennui.", "The novel captures the ennui of suburban life.", "Travel helped her escape the ennui of her predictable schedule."], synonyms: ["boredom", "tedium", "listlessness"], day: 29, group: 2 },
  { word: "expatiate", pos: "verb", arabic: "يسهب / يطنب", definition: "To speak or write at length and in great detail about something.", examples: ["The professor would expatiate on minor points for nearly an hour.", "Asked about the policy, the senator began to expatiate on its history.", "She tends to expatiate whenever the topic turns to art."], synonyms: ["elaborate", "dilate", "discourse"], day: 29, group: 2 },
  { word: "fraught", pos: "adjective", arabic: "مشحون / محفوف", definition: "Filled with or likely to result in something undesirable such as tension, danger, or difficulty.", examples: ["Their conversation was fraught with unspoken resentment.", "The mountain pass became fraught with danger after the storm.", "Negotiations remained fraught despite both sides' polite tone."], synonyms: ["tense", "perilous", "charged"], day: 29, group: 2 },
  { word: "fulcrum", pos: "noun", arabic: "نقطة ارتكاز / محور", definition: "The supporting point on which a lever pivots, or a central factor on which something depends.", examples: ["The rock served as the fulcrum for the makeshift lever.", "Trust became the fulcrum of the entire partnership.", "This vote may be the fulcrum on which the election turns."], synonyms: ["pivot", "hinge", "center"], day: 29, group: 2 },
  { word: "imbroglio", pos: "noun", arabic: "ورطة / مأزق", definition: "A complicated and confusing situation, especially one involving disagreement or conflict.", examples: ["The contract dispute turned into a legal imbroglio.", "She tried to avoid the family imbroglio during the holidays.", "The mayor was drawn into an imbroglio over missing public funds."], synonyms: ["entanglement", "complication", "quagmire"], day: 29, group: 2 },
  { word: "jocund", pos: "adjective", arabic: "مبتهج / مرح", definition: "Cheerful, lighthearted, and full of high spirits.", examples: ["The jocund mood of the festival made even reserved guests start dancing.", "She greeted the morning with a jocund smile and an energetic wave.", "His jocund remarks helped ease the tension in the meeting room."], synonyms: ["cheerful", "merry", "buoyant"], day: 29, group: 3 },
  { word: "languish", pos: "verb", arabic: "يذبل / يتدهور", definition: "To lose strength or vitality, often because of neglect, suffering, or inactivity.", examples: ["Without proper funding, the once-promising research project began to languish.", "He continued to languish in prison while awaiting a new hearing.", "Many plants will languish if they do not receive enough sunlight."], synonyms: ["wither", "decline", "weaken"], day: 29, group: 3 },
  { word: "nadir", pos: "noun", arabic: "الحضيض / أسوأ نقطة", definition: "The lowest point in a situation, especially the point of greatest adversity or despair.", examples: ["Losing the championship in the final seconds marked the nadir of the team's season.", "After months of debt and illness, she felt she had reached her nadir.", "The scandal represented the nadir of public trust in the administration."], synonyms: ["bottom", "depth", "lowpoint"], day: 29, group: 3 },
  { word: "nimble", pos: "adjective", arabic: "رشيق / خفيف الحركة", definition: "Quick, light, and agile in movement or thought.", examples: ["The nimble dancer crossed the stage with effortless grace.", "Startups often survive because they are nimble enough to adapt quickly.", "With nimble fingers, the locksmith opened the delicate mechanism."], synonyms: ["agile", "spry", "quick"], day: 29, group: 3 },
  { word: "ominous", pos: "adjective", arabic: "مشؤوم / منذر بالسوء", definition: "Suggesting that something bad, harmful, or threatening is likely to happen.", examples: ["Dark clouds gathered in an ominous line over the village.", "The sudden silence in the forest felt deeply ominous to the hikers.", "His ominous warning made everyone reconsider the risky plan."], synonyms: ["threatening", "sinister", "foreboding"], day: 29, group: 3 },
  { word: "outlandish", pos: "adjective", arabic: "غريب / شاذ", definition: "Strangely unusual, bizarre, or far removed from what is ordinary or accepted.", examples: ["He arrived at the gala in an outlandish costume covered in silver feathers.", "At first her theory sounded outlandish, but the evidence slowly supported it.", "The café's outlandish decor included upside-down chairs hanging from the ceiling."], synonyms: ["bizarre", "eccentric", "preposterous"], day: 29, group: 3 },
  { word: "propitious", pos: "adjective", arabic: "مؤات / مبشر", definition: "Favorable and indicating a good chance of success or a positive outcome.", examples: ["The clear weather provided a propitious start to the expedition.", "Investors viewed the lower interest rates as a propitious moment to expand.", "Her calm expression and firm handshake seemed propitious signs before the interview."], synonyms: ["favorable", "auspicious", "promising"], day: 29, group: 3 },
  { word: "prurient", pos: "adjective", arabic: "شهواني / فاحش", definition: "Having or encouraging an excessive interest in sexual matters, especially in an unhealthy way.", examples: ["The tabloid was criticized for its prurient coverage of the celebrity scandal.", "His prurient curiosity made others uncomfortable during the discussion.", "The novel avoids being prurient despite dealing with intimate subjects."], synonyms: ["lascivious", "salacious", "lewd"], day: 29, group: 3 },
  { word: "sadistic", pos: "adjective", arabic: "سادي / قاس", definition: "Taking pleasure in causing pain, suffering, or humiliation to others.", examples: ["The villain's sadistic grin revealed his delight in others' fear.", "Critics condemned the hazing ritual as cruel and sadistic.", "She refused to watch the film because its sadistic violence was overwhelming."], synonyms: ["cruel", "brutal", "merciless"], day: 29, group: 3 },
  { word: "zenith", pos: "noun", arabic: "الذروة / القمة", definition: "The highest point, especially the peak of success, power, or development.", examples: ["The scientist reached the zenith of her career after winning the Nobel Prize.", "At noon, the sun stood near its zenith above the desert.", "Many believe the painter's early masterpieces represent the zenith of his art."], synonyms: ["peak", "apex", "summit"], day: 29, group: 3 },
  { word: "aberrant", pos: "adjective", arabic: "شاذ / منحرف", definition: "Departing from what is normal, typical, or expected, often in an unacceptable way.", examples: ["The scientist double-checked the aberrant result before publishing the data.", "His aberrant behavior at the meeting surprised even his closest colleagues.", "An aberrant weather pattern brought snow to the desert town."], synonyms: ["abnormal", "deviant", "atypical"], day: 30, group: 1 },
  { word: "abide", pos: "verb", arabic: "يحتمل / يلتزم", definition: "To accept, tolerate, or act in accordance with a rule, decision, or condition.", examples: ["All members must abide by the terms of the contract.", "She could not abide the constant noise from the construction site.", "If you abide by the guidelines, your application will be processed quickly."], synonyms: ["endure", "obey", "tolerate"], day: 30, group: 1 },
  { word: "bravado", pos: "noun", arabic: "تبجح / تهور", definition: "A bold manner or show of confidence intended to impress or intimidate others.", examples: ["His bravado faded once the debate began and the questions grew difficult.", "The soldier's bravado concealed his genuine fear before battle.", "She laughed at his bravado, recognizing it as insecurity in disguise."], synonyms: ["swagger", "bluster", "boastfulness"], day: 30, group: 1 },
  { word: "callow", pos: "adjective", arabic: "غِر / عديم الخبرة", definition: "Lacking experience, maturity, or sound judgment.", examples: ["The callow intern spoke confidently about matters he barely understood.", "Her first novel, though promising, was marked by a callow view of human nature.", "He looked back on his callow decisions with a mixture of embarrassment and amusement."], synonyms: ["immature", "naive", "inexperienced"], day: 30, group: 1 },
  { word: "capitulate", pos: "verb", arabic: "يستسلم / يخضع", definition: "To surrender or stop resisting an opponent, demand, or difficult situation.", examples: ["After weeks of negotiations, the company refused to capitulate to unreasonable demands.", "The fortress was forced to capitulate when its supplies ran out.", "She would not capitulate under pressure, even when the criticism intensified."], synonyms: ["surrender", "yield", "submit"], day: 30, group: 1 },
  { word: "cogitate", pos: "verb", arabic: "يتأمل / يفكر", definition: "To think carefully and deeply about something.", examples: ["He sat by the window to cogitate on the implications of the offer.", "Before answering, the judge paused to cogitate on the complex legal issue.", "Writers often walk alone to cogitate and shape their ideas."], synonyms: ["ponder", "meditate", "deliberate"], day: 30, group: 1 },
  { word: "deportment", pos: "noun", arabic: "سلوك / هيئة", definition: "A person's manner of behaving, standing, and carrying themselves.", examples: ["The academy emphasized proper deportment as much as academic excellence.", "Her calm deportment during the crisis reassured the entire team.", "The ambassador's polished deportment reflected years of diplomatic training."], synonyms: ["demeanor", "bearing", "conduct"], day: 30, group: 1 },
  { word: "extemporize", pos: "verb", arabic: "يرتجل / يتكلم ارتجالًا", definition: "To speak or perform without preparation, especially by improvising.", examples: ["When the projector failed, the lecturer had to extemporize for twenty minutes.", "Talented musicians can extemporize beautifully within a familiar chord progression.", "Asked an unexpected question, she managed to extemporize a thoughtful response."], synonyms: ["improvise", "adlib", "wing"], day: 30, group: 1 },
  { word: "factious", pos: "adjective", arabic: "انقسامي / مثير للانقسام", definition: "Given to causing disagreement or conflict within a group.", examples: ["The committee became factious after members split into rival camps.", "His factious remarks undermined the unity of the organization.", "In times of crisis, factious leadership can be especially damaging."], synonyms: ["divisive", "contentious", "discordant"], day: 30, group: 1 },
  { word: "fallow", pos: "adjective", arabic: "بور / غير مزروع", definition: "Left unplanted or inactive for a period so that it may recover or regain productivity.", examples: ["The farmer left one field fallow to restore the soil's nutrients.", "After publishing her trilogy, the novelist entered a fallow creative period.", "The land had lain fallow for years before new crops were introduced."], synonyms: ["untilled", "dormant", "idle"], day: 30, group: 1 },
  { word: "feint", pos: "noun", arabic: "خدعة / مناورة", definition: "A feint is a deceptive or distracting move intended to mislead an opponent or observer.", examples: ["The boxer used a quick feint to draw his rival's guard to the left.", "Her sudden smile was only a feint to hide her irritation.", "The general ordered a feint at dawn before launching the main attack at noon."], synonyms: ["ruse", "bluff", "deception"], day: 30, group: 2 },
  { word: "flagrant", pos: "adjective", arabic: "فاضح / صارخ", definition: "Flagrant describes conduct that is obviously and offensively wrong or unlawful.", examples: ["The report exposed a flagrant violation of safety rules.", "His flagrant disregard for the court's order angered the judge.", "The article condemned the company's flagrant misuse of public funds."], synonyms: ["glaring", "outrageous", "egregious"], day: 30, group: 2 },
  { word: "gratuitous", pos: "adjective", arabic: "مجاني / بلا مبرر", definition: "Gratuitous means given freely or done without good reason, often in an unnecessary or excessive way.", examples: ["The critic objected to the film's gratuitous violence.", "She offered gratuitous advice to everyone at the table.", "His remark was gratuitous and only made the meeting more tense."], synonyms: ["unwarranted", "unnecessary", "unprovoked"], day: 30, group: 2 },
  { word: "grovel", pos: "verb", arabic: "يتذلل / يزحف", definition: "To grovel is to behave in an excessively humble or servile way, often to gain favor or forgiveness.", examples: ["He refused to grovel before the manager for a promotion.", "The villain expected his enemies to grovel at his feet.", "After the mistake, she did not grovel but calmly apologized."], synonyms: ["cower", "fawn", "kowtow"], day: 30, group: 2 },
  { word: "indecorous", pos: "adjective", arabic: "غير لائق / منافٍ للآداب", definition: "Indecorous describes behavior or language that is improper, impolite, or not in keeping with accepted standards of decorum.", examples: ["His indecorous joke offended several guests at the formal dinner.", "The senator apologized for her indecorous outburst during the hearing.", "Wearing beach sandals to the ceremony seemed indecorous to the hosts."], synonyms: ["improper", "unseemly", "indelicate"], day: 30, group: 2 },
  { word: "intrigue", pos: "verb", arabic: "يثير الفضول / يفتن", definition: "To intrigue is to arouse curiosity or strong interest in someone.", examples: ["The mysterious map began to intrigue the young historian.", "Her unusual proposal intrigued the entire committee.", "What intrigued me most was his calm response to the accusation."], synonyms: ["fascinate", "captivate", "interest"], day: 30, group: 2 },
  { word: "nominal", pos: "adjective", arabic: "اسمي / رمزي", definition: "Nominal means existing in name only or so small in amount as to be merely formal.", examples: ["He remained the nominal head of the company while others made the decisions.", "The museum charged a nominal fee for student admission.", "Although she held the nominal title of editor, her assistant did most of the work."], synonyms: ["token", "titular", "formal"], day: 30, group: 2 },
  { word: "obdurate", pos: "adjective", arabic: "عنيد / قاسي", definition: "Obdurate describes a person who is stubbornly resistant to persuasion, pity, or moral influence.", examples: ["Despite repeated appeals, the obdurate official refused to change the policy.", "Her obdurate silence made negotiation impossible.", "The jury viewed the defendant as obdurate and unrepentant."], synonyms: ["stubborn", "unyielding", "inflexible"], day: 30, group: 2 },
  { word: "obstreperous", pos: "adjective", arabic: "مشاغب / صاخب", definition: "Obstreperous describes someone or something that is noisily defiant, unruly, or difficult to control.", examples: ["The teacher struggled to calm the obstreperous class after lunch.", "An obstreperous fan was escorted out of the stadium.", "Their obstreperous protests drowned out the speaker's opening remarks."], synonyms: ["boisterous", "unruly", "clamorous"], day: 30, group: 2 },
  { word: "odious", pos: "adjective", arabic: "مقيت / بغيض", definition: "Odious means extremely unpleasant, hateful, or deserving strong dislike.", examples: ["The dictator's odious policies caused widespread suffering.", "She found his odious habit of insulting waiters impossible to tolerate.", "The novel portrays greed as an odious force that corrupts everyone it touches."], synonyms: ["hateful", "abhorrent", "detestable"], day: 30, group: 2 },
  { word: "plucky", pos: "adjective", arabic: "شجاع / جسور", definition: "Showing courage and determination in a difficult situation.", examples: ["The plucky firefighter rushed into the burning house to save the child.", "Despite her injury, the plucky runner finished the marathon.", "The small team made a plucky effort against a far stronger opponent."], synonyms: ["brave", "gritty", "courageous"], day: 30, group: 3 },
  { word: "precocious", pos: "adjective", arabic: "مبكر النضج / نابغ", definition: "Developing certain abilities or qualities earlier than usual, especially in a child.", examples: ["The precocious child was reading novels at the age of four.", "Her precocious understanding of mathematics impressed every teacher at the school.", "He was a precocious musician who composed songs before he turned ten."], synonyms: ["advanced", "mature", "gifted"], day: 30, group: 3 },
  { word: "remuneration", pos: "noun", arabic: "أجر / مكافأة", definition: "Payment or compensation given for work or services.", examples: ["The job offers generous remuneration for candidates with specialized skills.", "She accepted the position because the remuneration was better than her previous salary.", "Workers demanded fair remuneration for the extra hours they had completed."], synonyms: ["payment", "compensation", "salary"], day: 30, group: 3 },
  { word: "slovenly", pos: "adjective", arabic: "مهمل / قذر", definition: "Untidy, careless, or excessively messy in appearance or habits.", examples: ["His slovenly appearance made a poor impression during the interview.", "The apartment looked slovenly, with clothes and papers scattered everywhere.", "Her slovenly work habits caused repeated mistakes in the report."], synonyms: ["untidy", "messy", "sloppy"], day: 30, group: 3 },
  { word: "soliloquy", pos: "noun", arabic: "مناجاة / حديث النفس", definition: "A speech in which a character speaks thoughts aloud while alone or as if alone, especially in drama.", examples: ["In the play, the hero delivers a long soliloquy about guilt and ambition.", "The actor practiced each soliloquy until every emotion sounded natural.", "Her private soliloquy revealed fears she never expressed to others."], synonyms: ["monologue", "speech", "aside"], day: 30, group: 3 },
  { word: "spurn", pos: "verb", arabic: "يزدرِي / يرفض", definition: "To reject or refuse something or someone with disdain or contempt.", examples: ["She chose to spurn the lucrative offer because it conflicted with her values.", "He felt hurt when his advice was spurned by the committee.", "The artist continued her work even after critics spurned her early paintings."], synonyms: ["reject", "rebuff", "scorn"], day: 30, group: 3 },
  { word: "stolid", pos: "adjective", arabic: "جامد / بليد", definition: "Calm and unemotional, often appearing indifferent or not easily excited.", examples: ["Throughout the crisis, the captain remained stolid and focused.", "His stolid expression revealed nothing about what he was thinking.", "The audience seemed stolid despite the speaker's passionate appeal."], synonyms: ["impassive", "phlegmatic", "unemotional"], day: 30, group: 3 },
  { word: "temerity", pos: "noun", arabic: "جرأة / تهور", definition: "Excessive confidence or boldness, especially when it is considered reckless or improper.", examples: ["She had the temerity to challenge the CEO during the public meeting.", "His temerity in climbing the cliff without equipment alarmed his friends.", "The critic admired the author's temerity in tackling such a controversial subject."], synonyms: ["audacity", "boldness", "nerve"], day: 30, group: 3 },
  { word: "tenuous", pos: "adjective", arabic: "واهٍ / ضعيف", definition: "Very weak, slight, or lacking a firm basis or connection.", examples: ["The evidence linking the suspect to the crime was tenuous at best.", "They maintained a tenuous friendship after years of conflict.", "Her explanation rested on a tenuous assumption that few accepted."], synonyms: ["weak", "fragile", "flimsy"], day: 30, group: 3 },
  { word: "verve", pos: "noun", arabic: "حيوية / نشاط", definition: "Great energy, enthusiasm, and liveliness in expression or action.", examples: ["The dancer performed with such verve that the audience rose to applaud.", "His speech lacked verve, so the crowd quickly lost interest.", "She approached the new project with creativity and verve."], synonyms: ["energy", "vitality", "enthusiasm"], day: 30, group: 3 },
  { word: "abrogate", pos: "verb", arabic: "يلغي / ينقض", definition: "To officially repeal, abolish, or do away with a law, agreement, or custom.", examples: ["The court voted to abrogate the outdated regulation.", "The new regime promised to abrogate the treaty signed by its predecessor.", "No leader can simply abrogate constitutional rights without challenge."], synonyms: ["repeal", "annul", "rescind"], day: 31, group: 1 },
  { word: "aghast", pos: "adjective", arabic: "مذعور / مذهول", definition: "Filled with shock, horror, or amazement.", examples: ["She was aghast at the scale of the destruction.", "The audience sat aghast as the scandal unfolded on screen.", "He looked aghast when he realized he had sent the email to everyone."], synonyms: ["appalled", "horrified", "stunned"], day: 31, group: 1 },
  { word: "apprise", pos: "verb", arabic: "يبلغ / يخطر", definition: "To inform or notify someone about something.", examples: ["Please apprise me of any changes to the schedule.", "The lawyer apprised her client of the potential risks.", "We were apprised of the decision only after the meeting ended."], synonyms: ["inform", "notify", "advise"], day: 31, group: 1 },
  { word: "beguile", pos: "verb", arabic: "يفتن / يخدع", definition: "To charm, delight, or deceive someone in a captivating way.", examples: ["The storyteller could beguile even the most restless children.", "He tried to beguile the voters with polished promises.", "Soft music helped beguile the long hours of waiting."], synonyms: ["charm", "entrance", "deceive"], day: 31, group: 1 },
  { word: "boon", pos: "noun", arabic: "نعمة / فائدة", definition: "A timely and helpful benefit or advantage.", examples: ["The rain was a boon to farmers after months of drought.", "Online access to the archive proved a boon for researchers.", "Her mentorship was a boon to my early career."], synonyms: ["benefit", "blessing", "advantage"], day: 31, group: 1 },
  { word: "callous", pos: "adjective", arabic: "قاس / متبلد", definition: "Emotionally hardened and insensitive to the suffering or feelings of others.", examples: ["His callous remark offended everyone at the table.", "The novel portrays a callous employer who ignores his workers' pain.", "It was callous of them to laugh at her mistake."], synonyms: ["insensitive", "heartless", "cruel"], day: 31, group: 1 },
  { word: "coddle", pos: "verb", arabic: "يدلل / يفرط في العناية", definition: "To treat someone with excessive care, indulgence, or protection.", examples: ["Parents should support their children without trying to coddle them.", "The coach refused to coddle the team after the loss.", "She felt that her relatives continued to coddle her long after she had grown up."], synonyms: ["pamper", "spoil", "indulge"], day: 31, group: 1 },
  { word: "crescendo", pos: "noun", arabic: "تصاعد / ذروة", definition: "A gradual increase in intensity, force, or volume, often leading to a peak.", examples: ["The symphony built to a thrilling crescendo in the final movement.", "Public anger rose to a crescendo after the report was released.", "The film ends with a crescendo of action and emotion."], synonyms: ["climax", "peak", "surge"], day: 31, group: 1 },
  { word: "extenuating", pos: "adjective", arabic: "مخفف / مبرر", definition: "Serving to lessen the seriousness or blame of an offense or mistake.", examples: ["The judge considered the extenuating circumstances before sentencing him.", "There were no extenuating factors to justify the delay.", "Her apology mentioned several extenuating details, but the manager remained unconvinced."], synonyms: ["mitigating", "palliating", "justifying"], day: 31, group: 1 },
  { word: "frenetic", pos: "adjective", arabic: "محموم / محموم النشاط", definition: "Fast, energetic, and often wild or chaotic in a way that suggests desperation.", examples: ["The newsroom was frenetic as reporters rushed to meet the deadline.", "She made a frenetic search for her lost passport.", "Traffic became frenetic just before the holiday weekend."], synonyms: ["frantic", "feverish", "hectic"], day: 31, group: 1 },
  { word: "fringe", pos: "noun", arabic: "هامش / أطراف", definition: "The fringe is the outer edge of something or a group or idea that exists at the margins of mainstream society or thought.", examples: ["The proposal was once considered a fringe idea, but it is now widely accepted.", "A few fringe groups protested outside the convention hall.", "She added a decorative fringe to the edge of the curtain."], synonyms: ["margin", "edge", "periphery"], day: 31, group: 2 },
  { word: "hapless", pos: "adjective", arabic: "منكوب / تعيس", definition: "Hapless describes someone who is unlucky, unfortunate, or consistently beset by bad circumstances.", examples: ["The hapless traveler missed his flight after getting stuck in traffic.", "In the novel, a hapless clerk becomes the victim of a series of comic mishaps.", "The team’s hapless performance disappointed even its most loyal fans."], synonyms: ["unlucky", "unfortunate", "wretched"], day: 31, group: 2 },
  { word: "immaculate", pos: "adjective", arabic: "نظيف تمامًا / لا تشوبه شائبة", definition: "Immaculate means perfectly clean, neat, or free from flaws or mistakes.", examples: ["Her office was immaculate, with every file arranged in perfect order.", "He arrived in an immaculate white suit despite the muddy weather.", "The report was immaculate and contained no grammatical errors."], synonyms: ["spotless", "pristine", "flawless"], day: 31, group: 2 },
  { word: "obfuscate", pos: "verb", arabic: "يعقّد / يموّه", definition: "To obfuscate means to make something unclear, confusing, or difficult to understand, often deliberately.", examples: ["The witness seemed to obfuscate the facts rather than answer directly.", "Technical jargon can obfuscate a simple explanation.", "The politician tried to obfuscate the issue with vague language."], synonyms: ["confuse", "blur", "muddy"], day: 31, group: 2 },
  { word: "ossify", pos: "verb", arabic: "يتحجّر / يتصلّب", definition: "To ossify means to become rigid, fixed, or resistant to change over time.", examples: ["Without new ideas, institutions can ossify and lose their relevance.", "His once flexible opinions began to ossify as he grew older.", "The organization risks ossifying under layers of unnecessary bureaucracy."], synonyms: ["harden", "solidify", "rigidify"], day: 31, group: 2 },
  { word: "pastiche", pos: "noun", arabic: "محاكاة فنية / خليط أسلوبي", definition: "A pastiche is a work that imitates the style of another work, artist, or period, often as a respectful blend or homage.", examples: ["The film is a pastiche of classic detective movies from the 1940s.", "Her novel reads like a pastiche of several Victorian authors.", "The album is a lively pastiche of jazz, folk, and blues influences."], synonyms: ["imitation", "medley", "blend"], day: 31, group: 2 },
  { word: "perspicacious", pos: "adjective", arabic: "ثاقب البصيرة / فطن", definition: "Perspicacious describes someone who shows keen insight, sharp judgment, and an ability to notice subtle details.", examples: ["The perspicacious analyst detected flaws in the proposal that others had missed.", "Her perspicacious comments revealed a deep understanding of the debate.", "A perspicacious investor recognized the company’s potential early on."], synonyms: ["astute", "shrewd", "perceptive"], day: 31, group: 2 },
  { word: "ponderous", pos: "adjective", arabic: "ثقيل / بطيء", definition: "Ponderous means heavy, slow, or dull in a way that suggests great weight or excessive seriousness.", examples: ["The lecture was so ponderous that several students struggled to stay awake.", "A ponderous truck crawled up the steep mountain road.", "His ponderous writing style made the short article feel endless."], synonyms: ["heavy", "cumbersome", "laborious"], day: 31, group: 2 },
  { word: "recluse", pos: "noun", arabic: "منعزل / ناسك", definition: "A recluse is a person who lives in seclusion and avoids contact with other people.", examples: ["After achieving fame, the author became a recluse and rarely appeared in public.", "The old man was known as a recluse who seldom left his cottage.", "She was not a recluse by nature, but grief made her withdraw from society."], synonyms: ["hermit", "loner", "solitary"], day: 31, group: 2 },
  { word: "retaliate", pos: "verb", arabic: "ينتقم / يردّ بالمثل", definition: "To retaliate means to respond to an injury, attack, or insult by taking revenge or counteraction.", examples: ["The union threatened to retaliate if the company cut wages.", "He refused to retaliate after the harsh criticism.", "The country warned that it would retaliate against any military strike."], synonyms: ["avenge", "revenge", "counterattack"], day: 31, group: 2 },
  { word: "rhapsody", pos: "noun", arabic: "نشوة / حماسة", definition: "An intense expression of joy, praise, or enthusiastic feeling, often in speech, writing, or music.", examples: ["Her review of the novel became a rhapsody about its beauty and emotional depth.", "The composer wrote a stirring rhapsody inspired by the sounds of the sea.", "He launched into a rhapsody over the simple pleasures of rural life."], synonyms: ["ecstasy", "euphoria", "exultation"], day: 31, group: 3 },
  { word: "serendipitous", pos: "adjective", arabic: "عرضي / محظوظ", definition: "Occurring by chance in a happy or beneficial way.", examples: ["Their serendipitous meeting at the airport led to a lasting friendship.", "The scientist made a serendipitous discovery while testing an unrelated theory.", "It was serendipitous that we arrived just as the tickets became available."], synonyms: ["fortunate", "lucky", "accidental"], day: 31, group: 3 },
  { word: "shirk", pos: "verb", arabic: "يتهرب / يتجنب", definition: "To avoid or neglect a duty, responsibility, or task.", examples: ["He tried to shirk his chores by pretending to be sick.", "Managers should not shirk the responsibility of making difficult decisions.", "She never shirked her duty, even under intense pressure."], synonyms: ["evade", "avoid", "neglect"], day: 31, group: 3 },
  { word: "sinecure", pos: "noun", arabic: "منصب شرفي / وظيفة مريحة", definition: "A position that provides income or status while requiring little or no work.", examples: ["Critics complained that the appointment was merely a sinecure for a political ally.", "He enjoyed a comfortable sinecure that left him plenty of time for travel.", "The board eliminated the sinecure after discovering it served no real purpose."], synonyms: ["cushyjob", "easyjob", "softpost"], day: 31, group: 3 },
  { word: "sinuous", pos: "adjective", arabic: "متعرج / ملتف", definition: "Having many smooth curves and bends; lithe or gracefully winding.", examples: ["A sinuous river cut through the green valley.", "The dancer moved with a sinuous elegance across the stage.", "We followed the sinuous mountain road until sunset."], synonyms: ["winding", "curving", "serpentine"], day: 31, group: 3 },
  { word: "sordid", pos: "adjective", arabic: "قذر / دنيء", definition: "Filthy, morally degraded, or involving ignoble and shameful actions.", examples: ["The reporter uncovered the sordid details of the corruption scandal.", "They lived in a sordid apartment with broken windows and stained walls.", "He wanted no part in the sordid deal being arranged behind closed doors."], synonyms: ["sleazy", "filthy", "vile"], day: 31, group: 3 },
  { word: "stanch", pos: "verb", arabic: "يوقف / يصد", definition: "To stop or slow the flow of something, especially blood, tears, or losses.", examples: ["The medic worked quickly to stanch the bleeding from the wound.", "New policies were introduced to stanch the company's financial losses.", "She took a deep breath to stanch her tears before speaking."], synonyms: ["stop", "stem", "halt"], day: 31, group: 3 },
  { word: "surfeit", pos: "noun", arabic: "إفراط / تخمة", definition: "An excessive amount of something, especially so much that it causes discomfort or disgust.", examples: ["After a surfeit of holiday sweets, he craved plain food.", "The market is suffering from a surfeit of similar products.", "A surfeit of information can make even simple decisions feel overwhelming."], synonyms: ["excess", "glut", "overflow"], day: 31, group: 3 },
  { word: "ulterior", pos: "adjective", arabic: "خفي / مستتر", definition: "Existing beyond what is openly stated or intended, especially as a hidden motive.", examples: ["She suspected that his generous offer had an ulterior purpose.", "The committee questioned whether the proposal served some ulterior agenda.", "He seemed helpful, but his ulterior motives soon became obvious."], synonyms: ["hidden", "secret", "concealed"], day: 31, group: 3 },
  { word: "voluble", pos: "adjective", arabic: "ثرثار / فصيح", definition: "Speaking fluently, rapidly, and at great length.", examples: ["The voluble host kept the audience entertained for hours.", "She was so voluble during the interview that no one else could answer.", "His voluble explanation only made the simple process sound more confusing."], synonyms: ["talkative", "garrulous", "loquacious"], day: 31, group: 3 },
  { word: "abstruse", pos: "adjective", arabic: "غامض / عسير الفهم", definition: "Difficult to understand because it is complex, obscure, or highly theoretical.", examples: ["The professor's abstruse explanation of quantum mechanics confused most of the class.", "Her dissertation was praised for its originality but criticized for its abstruse language.", "Legal scholars debated the abstruse clause for hours before agreeing on its meaning."], synonyms: ["obscure", "esoteric", "arcane"], day: 32, group: 1 },
  { word: "auxiliary", pos: "adjective", arabic: "مساعد / إضافي", definition: "Providing supplementary or supporting help in addition to a main part or function.", examples: ["The hospital hired auxiliary staff to assist nurses during the flu season.", "An auxiliary engine powered the ship when the main motor failed.", "She served in an auxiliary role, coordinating supplies for the research team."], synonyms: ["supplementary", "supporting", "subsidiary"], day: 32, group: 1 },
  { word: "caricature", pos: "noun", arabic: "رسم كاريكاتوري / صورة ساخرة", definition: "An exaggerated representation of a person or thing that highlights distinctive features for comic or critical effect.", examples: ["The artist drew a caricature of the mayor with an enormous grin and oversized glasses.", "His portrayal of the philosopher was a crude caricature rather than a fair interpretation.", "Tourists lined up to buy a caricature of themselves from the street performer."], synonyms: ["parody", "lampoon", "spoof"], day: 32, group: 1 },
  { word: "depravity", pos: "noun", arabic: "فساد / انحطاط", definition: "Moral corruption and wickedness marked by a lack of ethical principles.", examples: ["The novel explores the depravity of a society consumed by greed and violence.", "Investigators were shocked by the depravity revealed in the criminal's actions.", "She argued that the film confused complexity with depravity and offered no real insight."], synonyms: ["corruption", "wickedness", "degeneracy"], day: 32, group: 1 },
  { word: "dilettante", pos: "noun", arabic: "هاوٍ / متذوق سطحي", definition: "A person who takes a superficial interest in an art, subject, or activity without serious commitment or deep knowledge.", examples: ["He fancied himself a wine expert, but true sommeliers dismissed him as a dilettante.", "The critic warned that the museum's board was guided by dilettante collectors rather than scholars.", "She moved from painting to sculpture to music like a restless dilettante."], synonyms: ["amateur", "dabbler", "novice"], day: 32, group: 1 },
  { word: "effrontery", pos: "noun", arabic: "وقاحة / صلافة", definition: "Shameless boldness or rude audacity, especially in behavior that disregards respect or propriety.", examples: ["He had the effrontery to demand a promotion after missing every deadline.", "The student's effrontery astonished the teacher when he accused her of being unprepared.", "It took real effrontery to interrupt the ceremony and criticize the host."], synonyms: ["audacity", "impudence", "cheek"], day: 32, group: 1 },
  { word: "encroach", pos: "verb", arabic: "يتعدى / يتطفل", definition: "To advance gradually beyond proper, legal, or acceptable limits into another area or sphere.", examples: ["Developers continued to encroach on the wetlands despite environmental protests.", "She felt that work obligations were beginning to encroach on her family time.", "The invading army sought to encroach on neighboring territory step by step."], synonyms: ["intrude", "invade", "infringe"], day: 32, group: 1 },
  { word: "endow", pos: "verb", arabic: "يمنح / يهب", definition: "To provide someone or something with a quality, ability, or resource, often as a gift or permanent support.", examples: ["The billionaire decided to endow a scholarship for first-generation college students.", "Nature seemed to endow the child with remarkable musical talent.", "The foundation will endow the library with funds for new research materials."], synonyms: ["grant", "bestow", "equip"], day: 32, group: 1 },
  { word: "entreat", pos: "verb", arabic: "يتوسل / يلتمس", definition: "To ask someone earnestly and urgently to do something.", examples: ["She began to entreat the judge for a second chance.", "The villagers entreat the government to repair the damaged bridge before winter.", "I must entreat you to reconsider your decision before it is too late."], synonyms: ["beseech", "implore", "plead"], day: 32, group: 1 },
  { word: "gregarious", pos: "adjective", arabic: "اجتماعي / أليف", definition: "Fond of the company of others and inclined to be sociable and outgoing.", examples: ["Unlike his quiet brother, Marcus was gregarious and loved large parties.", "The new manager's gregarious style helped unite the previously fragmented team.", "Parrots are highly gregarious birds that often thrive on interaction."], synonyms: ["sociable", "outgoing", "convivial"], day: 32, group: 1 },
  { word: "indictment", pos: "noun", arabic: "لائحة اتهام / اتهام", definition: "A formal charge or strong public condemnation accusing someone of a crime or serious wrongdoing.", examples: ["The grand jury issued an indictment against the former executive for fraud.", "Many critics viewed the report as an indictment of the entire education system.", "Without enough evidence, the prosecutor delayed seeking an indictment."], synonyms: ["accusation", "charge", "arraignment"], day: 32, group: 2 },
  { word: "indignant", pos: "adjective", arabic: "ساخط / مستاء", definition: "Feeling or showing anger because of something unjust, offensive, or unfair.", examples: ["She was indignant when the committee ignored her contribution.", "The audience grew indignant at the speaker's dismissive remarks.", "He sent an indignant reply after being blamed for the mistake."], synonyms: ["angry", "outraged", "resentful"], day: 32, group: 2 },
  { word: "ineluctable", pos: "adjective", arabic: "حتمي / لا مفر منه", definition: "Impossible to avoid, escape, or change.", examples: ["The novel portrays the ineluctable decline of a once-powerful family.", "With the deadline only hours away, the decision felt ineluctable.", "Many philosophers have debated whether fate is truly ineluctable."], synonyms: ["inevitable", "unavoidable", "inescapable"], day: 32, group: 2 },
  { word: "inquisitive", pos: "adjective", arabic: "فضولي / محب للاستطلاع", definition: "Eager to ask questions, investigate, and learn about things.", examples: ["The inquisitive child examined every tool in the workshop.", "Reporters became inquisitive when the mayor abruptly canceled the event.", "Her inquisitive nature made her an excellent researcher."], synonyms: ["curious", "prying", "questioning"], day: 32, group: 2 },
  { word: "latitude", pos: "noun", arabic: "حرية / نطاق", definition: "Freedom to act or think within certain limits, or a range of variation or scope.", examples: ["The supervisor gave us considerable latitude in designing the project.", "Writers often take artistic latitude when adapting historical events.", "The policy allows little latitude for personal interpretation."], synonyms: ["freedom", "scope", "leeway"], day: 32, group: 2 },
  { word: "levity", pos: "noun", arabic: "خفة / استخفاف", definition: "A lack of seriousness, often shown through inappropriate humor or lightness.", examples: ["His levity during the memorial service offended several guests.", "A touch of levity helped ease the tension in the room.", "The judge criticized the attorney's levity in such a serious case."], synonyms: ["frivolity", "lightness", "flippancy"], day: 32, group: 2 },
  { word: "malevolent", pos: "adjective", arabic: "شرير / حاقد", definition: "Having or showing a desire to cause harm or suffering to others.", examples: ["The villain's malevolent grin unsettled everyone in the room.", "Rumors spread by a malevolent rival damaged her reputation.", "The novel depicts a malevolent force lurking in the forest."], synonyms: ["malicious", "spiteful", "hostile"], day: 32, group: 2 },
  { word: "mediate", pos: "verb", arabic: "يتوسط / يوفق", definition: "To intervene between opposing sides in order to help them reach an agreement.", examples: ["The ambassador agreed to mediate the dispute between the two nations.", "A skilled counselor can mediate conflicts before they become severe.", "They asked a senior editor to mediate the disagreement over the article."], synonyms: ["arbitrate", "intercede", "conciliate"], day: 32, group: 2 },
  { word: "occlude", pos: "verb", arabic: "يسد / يحجب", definition: "To block, close up, or obscure something from view or passage.", examples: ["Dark clouds began to occlude the moon just after sunset.", "A blood clot can occlude a major artery and cause serious damage.", "Tall buildings may occlude the signal in dense urban areas."], synonyms: ["block", "obstruct", "eclipse"], day: 32, group: 2 },
  { word: "pacify", pos: "verb", arabic: "يهدئ / يسكن", definition: "To calm someone down or bring peace to a conflict or disturbed situation.", examples: ["The nurse tried to pacify the anxious patient before surgery.", "Leaders met to pacify tensions along the border.", "He offered an apology to pacify his offended colleague."], synonyms: ["appease", "soothe", "calm"], day: 32, group: 2 },
  { word: "paragon", pos: "noun", arabic: "نموذج / مثَل أعلى", definition: "A paragon is a person or thing regarded as a perfect example of a particular quality or standard.", examples: ["She was considered a paragon of integrity by everyone in the firm.", "The museum is a paragon of modern architectural design.", "For many young athletes, he became a paragon of discipline and perseverance."], synonyms: ["model", "ideal", "exemplar"], day: 32, group: 3 },
  { word: "patronize", pos: "verb", arabic: "يتعالَى على / يدعم", definition: "To patronize means either to treat someone in a condescending manner or to support a business, artist, or cause as a customer or benefactor.", examples: ["Please do not patronize me just because I am new to the job.", "Local residents patronize the family-owned bakery every weekend.", "Her patronize tone made the discussion more irritating than helpful."], synonyms: ["condescend", "support", "frequent"], day: 32, group: 3 },
  { word: "penurious", pos: "adjective", arabic: "مُعْوِز / فقير جدًا", definition: "Penurious describes someone extremely poor or unwilling to spend money.", examples: ["Despite his penurious circumstances, he continued to donate small amounts to charity.", "The novel portrays a penurious scholar living in a cramped apartment.", "Her penurious habits made even modest office expenses seem extravagant."], synonyms: ["impoverished", "destitute", "stingy"], day: 32, group: 3 },
  { word: "piquant", pos: "adjective", arabic: "لاذع / شهي", definition: "Piquant means pleasantly sharp or stimulating in taste, tone, or interest.", examples: ["The sauce had a piquant flavor that made the dish memorable.", "Her piquant remarks kept the audience attentive throughout the lecture.", "The memoir offers a piquant account of political life behind closed doors."], synonyms: ["spicy", "stimulating", "provocative"], day: 32, group: 3 },
  { word: "rampant", pos: "adjective", arabic: "مستشرٍ / جامح", definition: "Rampant describes something spreading uncontrollably or occurring in an unrestrained way.", examples: ["Corruption became rampant after the regulatory system collapsed.", "Rumors were rampant across the campus by the end of the day.", "The garden was overtaken by rampant vines during the rainy season."], synonyms: ["widespread", "unchecked", "prevalent"], day: 32, group: 3 },
  { word: "remote", pos: "adjective", arabic: "نائٍ / بعيد", definition: "Remote means far away in distance, time, relation, or likelihood.", examples: ["They spent the summer in a remote mountain village.", "The possibility of success seemed remote after so many setbacks.", "He felt remote from the rest of the group despite sitting nearby."], synonyms: ["distant", "isolated", "faraway"], day: 32, group: 3 },
  { word: "reprobate", pos: "noun", arabic: "فاسق / منحط", definition: "A reprobate is a morally unprincipled or depraved person.", examples: ["The detective had spent years chasing the reprobate who led the criminal ring.", "In the play, the charming reprobate wins trust before betraying his friends.", "He was dismissed as a reprobate by those who knew of his repeated frauds."], synonyms: ["degenerate", "villain", "libertine"], day: 32, group: 3 },
  { word: "turbid", pos: "adjective", arabic: "عَكِر / مُوحِل", definition: "Turbid describes a liquid that is cloudy, muddy, or unclear, and can also refer to confused thinking or writing.", examples: ["After the storm, the river turned turbid with silt and debris.", "The lab rejected the sample because the solution was too turbid.", "His explanation grew turbid as he tried to justify the inconsistency."], synonyms: ["cloudy", "muddy", "opaque"], day: 32, group: 3 },
  { word: "turgid", pos: "adjective", arabic: "منتفخ / متكلف", definition: "Turgid means swollen or inflated, especially in a style of writing that is overly pompous and difficult.", examples: ["The essay was so turgid that few students finished reading it.", "His turgid prose obscured what might have been a simple argument.", "After the injury, the ankle became red and turgid."], synonyms: ["bombastic", "pompous", "swollen"], day: 32, group: 3 },
  { word: "vacuous", pos: "adjective", arabic: "فارغ / سطحي", definition: "Vacuous describes something empty of thought, intelligence, substance, or expression.", examples: ["He gave a vacuous smile when asked a question he clearly did not understand.", "The advertisement was visually impressive but intellectually vacuous.", "Her vacuous comment added nothing to the serious discussion."], synonyms: ["empty", "blank", "mindless"], day: 32, group: 3 },
  { word: "affluent", pos: "adjective", arabic: "ثري / ميسور", definition: "Having a great deal of money, resources, or prosperity.", examples: ["The affluent family donated millions to the university.", "As the neighborhood became more affluent, property values rose sharply.", "Tourism has made the once-quiet village more affluent than nearby towns."], synonyms: ["wealthy", "prosperous", "rich"], day: 33, group: 1 },
  { word: "allegorical", pos: "adjective", arabic: "رمزي / مجازي", definition: "Using characters, events, or settings to represent abstract ideas or moral qualities.", examples: ["Many readers interpret the novel as an allegorical critique of political oppression.", "The painter created an allegorical scene in which justice appeared as a blindfolded woman.", "His speech was so allegorical that some listeners missed its central message."], synonyms: ["symbolic", "figurative", "emblematic"], day: 33, group: 1 },
  { word: "allude", pos: "verb", arabic: "يلمح / يشير تلميحًا", definition: "To refer to something indirectly or suggest it without stating it plainly.", examples: ["During the debate, the senator chose to allude to the scandal rather than mention it directly.", "The professor often allude to classical myths when explaining modern literature.", "Her memoir seems to allude to a painful childhood experience without describing it fully."], synonyms: ["hint", "imply", "suggest"], day: 33, group: 1 },
  { word: "amplify", pos: "verb", arabic: "يضخم / يضخم من", definition: "To increase the strength, effect, volume, or importance of something.", examples: ["The microphone will amplify your voice so the audience can hear you clearly.", "Social media can amplify small misunderstandings into major conflicts.", "The report was intended to amplify public awareness of the health risks."], synonyms: ["increase", "magnify", "intensify"], day: 33, group: 1 },
  { word: "catastrophic", pos: "adjective", arabic: "كارثي / فادح", definition: "Causing extremely great damage, suffering, or failure.", examples: ["The earthquake had catastrophic effects on the region's infrastructure.", "A catastrophic error in judgment ruined the company's reputation overnight.", "Scientists warned that ignoring the outbreak could lead to catastrophic consequences."], synonyms: ["disastrous", "calamitous", "devastating"], day: 33, group: 1 },
  { word: "contemporary", pos: "adjective", arabic: "معاصر / حديث", definition: "Belonging to the present time or existing during the same period as something else.", examples: ["The museum features both ancient artifacts and contemporary art.", "Her ideas remain relevant to contemporary debates about education.", "The poet was a contemporary of several famous novelists."], synonyms: ["modern", "current", "present"], day: 33, group: 1 },
  { word: "conundrum", pos: "noun", arabic: "معضلة / لغز", definition: "A confusing and difficult problem or question with no easy solution.", examples: ["Balancing economic growth with environmental protection is a persistent conundrum.", "The detective faced a conundrum when all the suspects had convincing alibis.", "For many students, choosing between passion and practicality is a real conundrum."], synonyms: ["puzzle", "dilemma", "enigma"], day: 33, group: 1 },
  { word: "defame", pos: "verb", arabic: "يشهر / يقذف", definition: "To harm someone's reputation by making false and damaging statements about them.", examples: ["The celebrity sued the magazine for trying to defame her with fabricated stories.", "It is illegal to defame a person by spreading lies as if they were facts.", "Political rivals sometimes defame one another during bitter campaigns."], synonyms: ["slander", "malign", "vilify"], day: 33, group: 1 },
  { word: "detract", pos: "verb", arabic: "ينتقص / يقلل من", definition: "To reduce the value, quality, or importance of something.", examples: ["The awkward ending did not detract from the power of the novel as a whole.", "Minor spelling errors can detract from an otherwise excellent essay.", "She refused to let criticism detract from her achievement."], synonyms: ["diminish", "lessen", "reduce"], day: 33, group: 1 },
  { word: "detrimental", pos: "adjective", arabic: "ضار / مؤذ", definition: "Causing harm or damage, especially in the long term.", examples: ["Skipping sleep regularly can be detrimental to both memory and mood.", "The policy proved detrimental to small businesses in rural areas.", "Excessive pride may be detrimental to effective teamwork."], synonyms: ["harmful", "damaging", "injurious"], day: 33, group: 1 },
  { word: "devious", pos: "adjective", arabic: "مخادع / مراوغ", definition: "Showing a skillful use of trickery or indirect methods to achieve a goal.", examples: ["The devious consultant hid crucial details in the fine print of the contract.", "Her devious plan allowed her to avoid blame while others took responsibility.", "Investigators eventually uncovered the devious scheme behind the fraudulent charity."], synonyms: ["cunning", "sly", "scheming"], day: 33, group: 2 },
  { word: "dormant", pos: "adjective", arabic: "خامل / كامن", definition: "Temporarily inactive, asleep, or not currently in use, though capable of becoming active.", examples: ["The volcano had remained dormant for centuries before showing signs of activity.", "During the winter, many seeds lie dormant beneath the frozen soil.", "The committee stayed dormant until a new crisis demanded immediate action."], synonyms: ["inactive", "latent", "sleeping"], day: 33, group: 2 },
  { word: "draconian", pos: "adjective", arabic: "صارم جدًا / قاسٍ", definition: "Excessively harsh or severe in rules, punishments, or measures.", examples: ["The school faced criticism for imposing draconian penalties on minor offenses.", "Citizens protested the draconian law that sharply restricted public assembly.", "The manager's draconian policies created a climate of fear in the office."], synonyms: ["harsh", "severe", "oppressive"], day: 33, group: 2 },
  { word: "egalitarian", pos: "adjective", arabic: "مساواتي / يؤمن بالمساواة", definition: "Believing in or based on the principle that all people should have equal rights and opportunities.", examples: ["The organization promoted an egalitarian culture in which every voice mattered.", "Her egalitarian views led her to challenge traditions that favored only the wealthy.", "The new policy aimed to create a more egalitarian distribution of resources."], synonyms: ["equal", "democratic", "leveling"], day: 33, group: 2 },
  { word: "elusive", pos: "adjective", arabic: "مراوغ / عصيّ", definition: "Difficult to find, catch, understand, or define clearly.", examples: ["Despite years of research, the scientist could not explain the elusive cause of the disease.", "The elusive suspect avoided capture by constantly changing locations.", "Happiness can seem elusive when people tie it only to material success."], synonyms: ["slippery", "evasive", "intangible"], day: 33, group: 2 },
  { word: "erstwhile", pos: "adjective", arabic: "سابق / سالف", definition: "Former or previous in position, role, or status.", examples: ["The erstwhile champion returned to the court as a respected coach.", "She met her erstwhile business partner at a conference after many years apart.", "The article examined the policies of the country's erstwhile ruler."], synonyms: ["former", "previous", "past"], day: 33, group: 2 },
  { word: "gloat", pos: "verb", arabic: "يتباهى / يشمت", definition: "To express smug satisfaction, especially over one's own success or another person's failure.", examples: ["He tried not to gloat after winning the debate by a wide margin.", "The rival team began to gloat when they saw the other side losing confidence.", "She refused to gloat over her colleague's mistake, choosing instead to offer help."], synonyms: ["boast", "crow", "swagger"], day: 33, group: 2 },
  { word: "harrowing", pos: "adjective", arabic: "مروّع / مفجع", definition: "Extremely distressing, painful, or traumatic to experience.", examples: ["The documentary offered a harrowing account of families fleeing the war.", "Survivors shared harrowing stories of the earthquake's immediate aftermath.", "Climbing down the icy cliff in a storm was a harrowing ordeal."], synonyms: ["grueling", "traumatic", "agonizing"], day: 33, group: 2 },
  { word: "indefinite", pos: "adjective", arabic: "غير محدد / غير معين", definition: "Not clearly fixed, stated, or determined in time, amount, or extent.", examples: ["The meeting was postponed for an indefinite period due to scheduling conflicts.", "His answer was so indefinite that no one understood what he actually meant.", "The travelers faced an indefinite delay after the airport shut down during the storm."], synonyms: ["vague", "uncertain", "unlimited"], day: 33, group: 2 },
  { word: "ingenious", pos: "adjective", arabic: "بارع / مبتكر", definition: "Clever, original, and skillful in solving problems or inventing things.", examples: ["The engineer designed an ingenious device that purified water without electricity.", "Her ingenious argument persuaded even the most skeptical members of the committee.", "They developed an ingenious method for storing solar energy at low cost."], synonyms: ["inventive", "clever", "resourceful"], day: 33, group: 2 },
  { word: "keen", pos: "adjective", arabic: "حاد / متحمس", definition: "Having a sharp edge, strong intensity, or eager interest and enthusiasm.", examples: ["She has a keen eye for detail in every report she reviews.", "The researcher showed a keen interest in ancient manuscripts.", "There is keen competition for the limited fellowship positions."], synonyms: ["eager", "sharp", "intense"], day: 33, group: 3 },
  { word: "multifaceted", pos: "adjective", arabic: "متعدد الجوانب / متشعب", definition: "Having many different aspects, features, or elements.", examples: ["The novel offers a multifaceted portrait of urban life.", "Climate change is a multifaceted problem requiring global cooperation.", "She is a multifaceted leader who excels in research, teaching, and outreach."], synonyms: ["complex", "diverse", "versatile"], day: 33, group: 3 },
  { word: "omniscient", pos: "adjective", arabic: "كلي المعرفة / عليم بكل شيء", definition: "Knowing everything or having complete and unlimited knowledge.", examples: ["The narrator appears omniscient, revealing each character's hidden motives.", "In many traditions, a deity is described as omniscient and just.", "No analyst is omniscient, so predictions should be made with humility."], synonyms: ["all-knowing", "wise", "aware"], day: 33, group: 3 },
  { word: "remarkable", pos: "adjective", arabic: "ملحوظ / استثنائي", definition: "Worthy of attention because it is unusual, impressive, or extraordinary.", examples: ["Her recovery after the surgery was truly remarkable.", "The scientist made a remarkable discovery early in his career.", "It is remarkable how quickly the small team adapted to the crisis."], synonyms: ["extraordinary", "notable", "striking"], day: 33, group: 3 },
  { word: "sober", pos: "adjective", arabic: "رصين / صاح", definition: "Not intoxicated, or serious and calm in manner, style, or mood.", examples: ["After the celebration, he remained sober and drove everyone home safely.", "The committee adopted a sober tone during the discussion of budget cuts.", "Her sober assessment helped the team avoid unrealistic expectations."], synonyms: ["serious", "calm", "temperate"], day: 33, group: 3 },
  { word: "stem from", pos: "verb", arabic: "ينبع من / ينشأ من", definition: "To originate from or be caused by a particular source or circumstance.", examples: ["Many of the city's traffic problems stem from outdated infrastructure.", "Her anxiety seemed to stem from a fear of disappointing others.", "The misunderstanding stemmed from an ambiguous phrase in the contract."], synonyms: ["originate", "derive", "arise"], day: 33, group: 3 },
  { word: "subdued", pos: "adjective", arabic: "هادئ / خافت", definition: "Quiet, restrained, or reduced in intensity, color, or force.", examples: ["The audience responded with subdued applause after the somber speech.", "He wore a subdued tie that matched the formal setting.", "After the initial excitement, the team's mood became subdued."], synonyms: ["muted", "restrained", "quiet"], day: 33, group: 3 },
  { word: "token", pos: "noun", arabic: "رمز / علامة", definition: "A sign, symbol, or small item that represents something else or expresses a feeling.", examples: ["She offered a small gift as a token of gratitude.", "The museum displayed the coin as a token of the ancient empire's reach.", "His apology felt like a token rather than a sincere effort to change."], synonyms: ["symbol", "sign", "emblem"], day: 33, group: 3 },
  { word: "unravel", pos: "verb", arabic: "يفك / يكشف", definition: "To separate twisted threads, or to solve, explain, or become undone gradually.", examples: ["Detectives worked for months to unravel the mystery behind the theft.", "The old sweater began to unravel at the sleeve.", "Careful analysis helped the historian unravel the sequence of events."], synonyms: ["untangle", "solve", "disentangle"], day: 33, group: 3 },
  { word: "withstand", pos: "verb", arabic: "يتحمل / يصمد أمام", definition: "To resist, endure, or remain unharmed by pressure, force, or difficulty.", examples: ["The bridge was built to withstand strong winds and heavy traffic.", "She could not withstand the emotional strain of the prolonged trial.", "These materials are designed to withstand extreme temperatures."], synonyms: ["endure", "resist", "survive"], day: 33, group: 3 },
  { word: "abrasive", pos: "adjective", arabic: "خشن / فظ", definition: "Rough in manner or texture, often causing irritation or discomfort.", examples: ["His abrasive comments made the meeting tense.", "The fabric felt abrasive against her skin.", "Despite her intelligence, her abrasive style alienated colleagues."], synonyms: ["harsh", "rough", "caustic"], day: 34, group: 1 },
  { word: "artful", pos: "adjective", arabic: "ماكر / بارع", definition: "Cleverly skillful, often in a way that is crafty or subtly deceptive.", examples: ["The lawyer gave an artful response that revealed little.", "Her artful negotiation secured a better deal for everyone.", "The novel uses artful symbolism to deepen its themes."], synonyms: ["crafty", "skillful", "cunning"], day: 34, group: 1 },
  { word: "avert", pos: "verb", arabic: "يتجنب / يحول دون", definition: "To prevent something undesirable from happening or to turn away.", examples: ["Quick action helped avert a financial crisis.", "She averted her eyes when he entered the room.", "The warning signs may avert future accidents."], synonyms: ["avoid", "prevent", "ward"], day: 34, group: 1 },
  { word: "avid", pos: "adjective", arabic: "شغوف / متحمس", definition: "Showing great enthusiasm and eagerness for something.", examples: ["He is an avid reader of historical fiction.", "The club attracted avid supporters from across the city.", "She remained an avid learner throughout her career."], synonyms: ["eager", "keen", "enthusiastic"], day: 34, group: 1 },
  { word: "brevity", pos: "noun", arabic: "إيجاز / اختصار", definition: "The quality of expressing much in few words or lasting only a short time.", examples: ["The professor appreciated the brevity of her answer.", "Brevity can make a speech more powerful.", "The report's brevity made it easy to review quickly."], synonyms: ["conciseness", "succinctness", "shortness"], day: 34, group: 1 },
  { word: "bromide", pos: "noun", arabic: "كليشيه / عبارة مبتذلة", definition: "A trite and unoriginal remark or idea that has been repeated too often.", examples: ["His advice sounded like an empty bromide rather than real guidance.", "The speech was filled with bromides about hard work and success.", "She dismissed the slogan as just another bromide."], synonyms: ["cliche", "platitude", "truism"], day: 34, group: 1 },
  { word: "circumstantial", pos: "adjective", arabic: "ظرفي / غير مباشر", definition: "Based on surrounding details or indirect evidence rather than direct proof.", examples: ["The case relied largely on circumstantial evidence.", "Her circumstantial explanation included every minor detail.", "Although the evidence was circumstantial, it seemed convincing."], synonyms: ["indirect", "inferential", "detailed"], day: 34, group: 1 },
  { word: "cloying", pos: "adjective", arabic: "مفرط الحلاوة / مقرف", definition: "Excessively sweet, sentimental, or pleasant to the point of causing disgust.", examples: ["The dessert was so cloying that I could not finish it.", "His cloying compliments made everyone uncomfortable.", "The movie's cloying ending felt unrealistic."], synonyms: ["sickly", "overdone", "mawkish"], day: 34, group: 1 },
  { word: "counterfeit", pos: "adjective", arabic: "مزور / مقلد", definition: "Made in imitation of something genuine with the intent to deceive.", examples: ["Police seized counterfeit bills from the shop.", "She discovered the handbag was counterfeit.", "The museum warned collectors about counterfeit artifacts online."], synonyms: ["fake", "forged", "bogus"], day: 34, group: 1 },
  { word: "denigrate", pos: "verb", arabic: "يحط من قدر / يشوه", definition: "To unfairly criticize or belittle someone or something.", examples: ["It is unfair to denigrate her achievements.", "The article seemed designed to denigrate the opposition.", "He refused to denigrate his former colleagues."], synonyms: ["belittle", "disparage", "defame"], day: 34, group: 1 },
  { word: "disciple", pos: "noun", arabic: "تابع / تلميذ", definition: "A disciple is a person who follows and learns from the teachings or ideas of a leader, teacher, or belief system.", examples: ["The young disciple spent years studying under the famous philosopher.", "As a disciple of nonviolence, she tried to resolve every conflict peacefully.", "He remained a loyal disciple of the writer's artistic vision."], synonyms: ["follower", "adherent", "student"], day: 34, group: 2 },
  { word: "extol", pos: "verb", arabic: "يمجّد / يمدح", definition: "To extol means to praise someone or something very highly and enthusiastically.", examples: ["Critics extol the novel for its originality and emotional depth.", "The coach continued to extol the virtues of hard work and discipline.", "In the speech, the mayor extolled the volunteers for their dedication."], synonyms: ["praise", "laud", "glorify"], day: 34, group: 2 },
  { word: "forebode", pos: "verb", arabic: "ينذر / يتنبأ بسوء", definition: "To forebode means to indicate or predict that something bad is likely to happen.", examples: ["The dark clouds seemed to forebode a violent storm.", "Many believed the sudden silence in the forest foreboded danger.", "His uneasy tone appeared to forebode terrible news."], synonyms: ["portend", "presage", "augur"], day: 34, group: 2 },
  { word: "ideologue", pos: "noun", arabic: "مؤدلج / عقائدي", definition: "An ideologue is a person who strongly and rigidly adheres to a particular ideology.", examples: ["The reform failed because every ideologue in the debate refused to compromise.", "She was seen as an ideologue who valued doctrine over practical results.", "The article criticized the senator as an ideologue rather than a problem-solver."], synonyms: ["dogmatist", "zealot", "partisan"], day: 34, group: 2 },
  { word: "impediment", pos: "noun", arabic: "عائق / عقبة", definition: "An impediment is something that blocks, delays, or interferes with progress or action.", examples: ["Lack of funding became a major impediment to the research project.", "His speech impediment made public speaking especially challenging.", "Bureaucratic rules were an impediment to quick disaster relief."], synonyms: ["obstacle", "hindrance", "barrier"], day: 34, group: 2 },
  { word: "imperative", pos: "adjective", arabic: "ضروري / حتمي", definition: "Imperative means absolutely necessary or extremely important.", examples: ["It is imperative that the documents arrive before noon.", "Regular communication is imperative for a successful partnership.", "The doctor said it was imperative to begin treatment immediately."], synonyms: ["essential", "crucial", "vital"], day: 34, group: 2 },
  { word: "impulsive", pos: "adjective", arabic: "مندفع / متهور", definition: "Impulsive describes someone who acts quickly without careful thought or planning.", examples: ["Her impulsive decision to quit her job surprised everyone.", "He is so impulsive that he often buys things he does not need.", "An impulsive reaction can sometimes make a tense situation worse."], synonyms: ["rash", "hasty", "reckless"], day: 34, group: 2 },
  { word: "interminable", pos: "adjective", arabic: "لا ينتهي / ممل", definition: "Interminable means seemingly endless and often tiresomely long.", examples: ["The audience grew restless during the interminable lecture.", "We were stuck in an interminable line at the airport.", "Their interminable argument delayed the meeting for hours."], synonyms: ["endless", "ceaseless", "unending"], day: 34, group: 2 },
  { word: "intuitive", pos: "adjective", arabic: "حدسي / بديهي", definition: "Intuitive means understood or done naturally and immediately without conscious reasoning.", examples: ["The software has an intuitive design that new users can navigate easily.", "She had an intuitive sense of what the audience wanted to hear.", "For experienced players, the next move was almost intuitive."], synonyms: ["instinctive", "innate", "natural"], day: 34, group: 2 },
  { word: "lassitude", pos: "noun", arabic: "خمول / فتور", definition: "Lassitude is a state of weariness, fatigue, or lack of energy.", examples: ["After the long illness, he felt a lingering lassitude for weeks.", "The summer heat filled the town with a sense of lassitude.", "She overcame her morning lassitude with a brisk walk and strong coffee."], synonyms: ["fatigue", "lethargy", "weariness"], day: 34, group: 2 },
  { word: "omit", pos: "verb", arabic: "يحذف / يهمل", definition: "To omit means to leave out, exclude, or fail to include something that should or could be included.", examples: ["Please do not omit any relevant details from your report.", "She chose to omit his name from the acknowledgments.", "The editor omitted several paragraphs to shorten the article."], synonyms: ["exclude", "ignore", "delete"], day: 34, group: 3 },
  { word: "ornate", pos: "adjective", arabic: "مزخرف / منمق", definition: "Ornate describes something that is elaborately decorated or highly detailed in style.", examples: ["The palace featured ornate ceilings covered in gold leaf.", "His speech was so ornate that the main point became unclear.", "She wore an ornate necklace studded with tiny emeralds."], synonyms: ["elaborate", "decorated", "embellished"], day: 34, group: 3 },
  { word: "paltry", pos: "adjective", arabic: "ضئيل / تافه", definition: "Paltry means very small, insignificant, or inadequate in amount or value.", examples: ["They offered a paltry sum for a painting worth thousands.", "After hours of work, the team received only a paltry reward.", "The village survived on a paltry supply of clean water."], synonyms: ["meager", "trivial", "scant"], day: 34, group: 3 },
  { word: "pejorative", pos: "adjective", arabic: "تحقيري / ازدرائي", definition: "Pejorative describes language or expressions that convey contempt, disapproval, or a negative meaning.", examples: ["The critic used a pejorative term to dismiss the young artist.", "Many words that were once neutral have developed pejorative connotations.", "Calling the proposal naive in a pejorative tone ended the discussion quickly."], synonyms: ["derogatory", "disparaging", "deprecatory"], day: 34, group: 3 },
  { word: "prefigure", pos: "verb", arabic: "ينذر / يمهد", definition: "To prefigure means to foreshadow, represent in advance, or indicate something that will happen later.", examples: ["The early protests prefigured a much larger social movement.", "Her initial experiments prefigured the discoveries she would later make.", "The novel's opening storm seems to prefigure the tragedy at the end."], synonyms: ["foreshadow", "anticipate", "herald"], day: 34, group: 3 },
  { word: "presage", pos: "verb", arabic: "ينذر / يتنبأ", definition: "To presage means to indicate or warn of a future event, especially one that is significant or ominous.", examples: ["The sudden drop in sales may presage a wider economic slowdown.", "Dark clouds often presage an approaching storm.", "Many believed the unrest would presage political change."], synonyms: ["portend", "foretell", "predict"], day: 34, group: 3 },
  { word: "prescribe", pos: "verb", arabic: "يصف / يفرض", definition: "To prescribe means to officially recommend, authorize, or set down a rule, remedy, or course of action.", examples: ["The doctor prescribed a stronger medication for the infection.", "School policy prescribes a uniform for all students.", "The manual prescribes the exact steps for operating the machine."], synonyms: ["order", "direct", "stipulate"], day: 34, group: 3 },
  { word: "prevail", pos: "verb", arabic: "يسود / ينتصر", definition: "To prevail means to triumph, prove more powerful, or continue to exist despite opposition or difficulty.", examples: ["Despite fierce criticism, reason eventually prevailed.", "A spirit of optimism prevailed throughout the campaign.", "The home team prevailed after a tense final match."], synonyms: ["triumph", "dominate", "endure"], day: 34, group: 3 },
  { word: "propitiate", pos: "verb", arabic: "يسترضي / يرضي", definition: "To propitiate means to appease or win the favor of someone, often by making concessions or offering something.", examples: ["He tried to propitiate the angry customer with a full refund.", "Ancient communities made offerings to propitiate the gods.", "She brought flowers to propitiate her offended friend."], synonyms: ["appease", "placate", "conciliate"], day: 34, group: 3 },
  { word: "recapitulate", pos: "verb", arabic: "يلخص / يستعرض", definition: "To recapitulate means to summarize the main points of something or review it briefly.", examples: ["Before concluding, the professor recapitulated the key arguments from the lecture.", "The report recapitulates the findings of the earlier study.", "Let me recapitulate what we have decided so far."], synonyms: ["summarize", "review", "restate"], day: 34, group: 3 },
  { word: "aplomb", pos: "noun", arabic: "اتزان / ثقة", definition: "Calm self-confidence and poise, especially in a challenging or unexpected situation.", examples: ["She answered the difficult interview questions with remarkable aplomb.", "Even after the technical failure, the speaker continued with aplomb.", "His aplomb during the crisis reassured everyone in the room."], synonyms: ["poise", "composure", "confidence"], day: 35, group: 1 },
  { word: "apposite", pos: "adjective", arabic: "ملائم / مناسب", definition: "Highly relevant, appropriate, and well suited to the situation or topic.", examples: ["Her apposite remark clarified the main issue immediately.", "The professor chose an apposite example to explain the abstract theory.", "At the meeting, his apposite comments moved the discussion forward."], synonyms: ["relevant", "apt", "pertinent"], day: 35, group: 1 },
  { word: "beholden", pos: "adjective", arabic: "مدين بالفضل / ممتن", definition: "Obligated or indebted to someone for a favor, kindness, or service.", examples: ["I am beholden to my mentor for her years of guidance.", "The small town remained beholden to the factory for most of its jobs.", "She felt beholden to the friend who had supported her in difficult times."], synonyms: ["indebted", "obligated", "grateful"], day: 35, group: 1 },
  { word: "belittle", pos: "verb", arabic: "يُحَقِّر / يَسْتَصْغِر", definition: "To make someone or something seem less important, valuable, or impressive than it really is.", examples: ["A good leader does not belittle the efforts of the team.", "He tried to belittle her achievements with sarcastic comments.", "The article should not belittle the seriousness of the problem."], synonyms: ["deprecate", "diminish", "disparage"], day: 35, group: 1 },
  { word: "cluster", pos: "noun", arabic: "عنقود / مجموعة", definition: "A group of similar things or people positioned or occurring close together.", examples: ["A cluster of stars was visible above the mountain.", "Researchers identified a cluster of cases in the northern district.", "She picked a cluster of grapes from the vine."], synonyms: ["group", "bunch", "collection"], day: 35, group: 1 },
  { word: "coherent", pos: "adjective", arabic: "مترابط / منسجم", definition: "Logical, consistent, and clearly connected in a way that is easy to understand.", examples: ["Despite his nervousness, he gave a coherent explanation of the plan.", "The essay is coherent, with each paragraph supporting the central argument.", "After resting, she was finally coherent enough to answer questions."], synonyms: ["logical", "consistent", "clear"], day: 35, group: 1 },
  { word: "contemplate", pos: "verb", arabic: "يتأمل / يفكر", definition: "To think about something deeply and carefully, often for a long time.", examples: ["She sat by the window to contemplate her future.", "The committee will contemplate several proposals before making a decision.", "He paused to contemplate the meaning of the poem."], synonyms: ["ponder", "consider", "reflect"], day: 35, group: 1 },
  { word: "crafty", pos: "adjective", arabic: "ماكر / مخادع", definition: "Clever in a sly or deceptive way, especially for achieving a hidden purpose.", examples: ["The crafty salesman found subtle ways to pressure customers.", "A crafty fox slipped through the fence at night.", "Her opponent used a crafty tactic to avoid answering the question."], synonyms: ["cunning", "sly", "wily"], day: 35, group: 1 },
  { word: "dismantle", pos: "verb", arabic: "يفكك / يهدم", definition: "To take apart a structure, system, or organization piece by piece.", examples: ["Workers began to dismantle the old bridge last summer.", "The reform aimed to dismantle barriers to equal opportunity.", "He carefully dismantle the machine to find the faulty part."], synonyms: ["disassemble", "demolish", "deconstruct"], day: 35, group: 1 },
  { word: "elaborate", pos: "adjective", arabic: "مفصل / متقن", definition: "Detailed and carefully developed, often involving many intricate parts or features.", examples: ["They prepared an elaborate plan for the product launch.", "The palace was known for its elaborate decorations.", "She wore an elaborate costume to the festival."], synonyms: ["detailed", "intricate", "ornate"], day: 35, group: 1 },
  { word: "exegesis", pos: "noun", arabic: "تفسير / شرح", definition: "A critical explanation or detailed interpretation of a text, especially a complex or authoritative one.", examples: ["Her exegesis of the poem revealed layers of meaning that most readers had missed.", "The professor assigned an exegesis of a philosophical passage for the final paper.", "His exegesis of the legal document clarified several ambiguous clauses."], synonyms: ["interpretation", "analysis", "commentary"], day: 35, group: 2 },
  { word: "forgo", pos: "verb", arabic: "يتخلى عن / يمتنع عن", definition: "To give up, do without, or voluntarily refrain from having something.", examples: ["She decided to forgo dessert in order to stick to her diet.", "Many investors chose to forgo short-term gains for greater long-term stability.", "He was unwilling to forgo the opportunity to study abroad."], synonyms: ["relinquish", "waive", "renounce"], day: 35, group: 2 },
  { word: "impenetrable", pos: "adjective", arabic: "عصيّ على الفهم / منيع", definition: "Impossible to pass through, enter, or understand.", examples: ["The jungle was so dense that it seemed impenetrable to the explorers.", "His impenetrable expression made it difficult to guess what he was thinking.", "The essay was criticized for its impenetrable language and obscure references."], synonyms: ["incomprehensible", "opaque", "dense"], day: 35, group: 2 },
  { word: "impervious", pos: "adjective", arabic: "غير منفذ / منيع", definition: "Not allowing something to pass through, or not affected by something.", examples: ["The jacket was impervious to rain and kept us dry during the storm.", "She seemed impervious to criticism and continued with confidence.", "The sealed container is impervious to air and moisture."], synonyms: ["impenetrable", "immune", "resistant"], day: 35, group: 2 },
  { word: "inalienable", pos: "adjective", arabic: "غير قابل للتصرف / ثابت", definition: "Unable to be taken away, transferred, or surrendered, especially as a right.", examples: ["The declaration affirmed that all people possess inalienable rights.", "Freedom of conscience is regarded by many as an inalienable human liberty.", "They argued that dignity is an inalienable aspect of personhood."], synonyms: ["absolute", "inviolable", "inherent"], day: 35, group: 2 },
  { word: "inept", pos: "adjective", arabic: "غير كفء / أخرق", definition: "Lacking skill, competence, or effectiveness.", examples: ["His inept handling of the meeting created more confusion than clarity.", "The comedy portrayed an inept detective who solved cases by accident.", "She grew frustrated with the company's inept customer service."], synonyms: ["clumsy", "incompetent", "awkward"], day: 35, group: 2 },
  { word: "martinet", pos: "noun", arabic: "صارم / متشدد", definition: "A strict disciplinarian who demands exact obedience to rules and procedures.", examples: ["The new coach was a martinet who fined players for arriving even a minute late.", "At the office, she gained a reputation as a martinet because of her rigid enforcement of policies.", "The headmaster was seen as a martinet rather than an inspiring leader."], synonyms: ["disciplinarian", "stickler", "tyrant"], day: 35, group: 2 },
  { word: "narcissism", pos: "noun", arabic: "النرجسية / حب الذات", definition: "Excessive self-focus, self-admiration, or preoccupation with one's own importance and appearance.", examples: ["The critic argued that the celebrity's memoir reflected pure narcissism.", "Social media can sometimes encourage vanity and narcissism.", "His narcissism made genuine collaboration nearly impossible."], synonyms: ["vanity", "egotism", "selfabsorption"], day: 35, group: 2 },
  { word: "objurgation", pos: "noun", arabic: "توبيخ / تقريع", definition: "A sharp or severe scolding or expression of criticism.", examples: ["The manager's objurgation silenced the room for several minutes.", "Instead of offering guidance, he responded with loud objurgation.", "Her public objurgation of the staff lowered morale significantly."], synonyms: ["rebuke", "reprimand", "scolding"], day: 35, group: 2 },
  { word: "passable", pos: "adjective", arabic: "مقبول / سالك", definition: "Adequate or satisfactory though not excellent, or able to be traveled through.", examples: ["The restaurant served passable food, but nothing memorable.", "After the storm, the mountain road was barely passable.", "His knowledge of French was passable enough for basic conversation."], synonyms: ["adequate", "tolerable", "fair"], day: 35, group: 2 },
  { word: "penetrating", pos: "adjective", arabic: "ثاقب / نافذ", definition: "Having the power to see, understand, or affect something deeply and clearly.", examples: ["Her penetrating analysis revealed the hidden weakness in the argument.", "He asked a penetrating question that made everyone reconsider the proposal.", "The bird gave a penetrating cry that echoed across the valley."], synonyms: ["perceptive", "acute", "piercing"], day: 35, group: 3 },
  { word: "picturesque", pos: "adjective", arabic: "خَلّاب / جميل", definition: "Visually charming or quaint in a way that resembles a pleasing picture.", examples: ["We spent the afternoon walking through a picturesque village by the river.", "The cottage sat in a picturesque valley surrounded by wildflowers.", "Tourists stopped often to photograph the picturesque coastline."], synonyms: ["scenic", "charming", "quaint"], day: 35, group: 3 },
  { word: "reflect", pos: "verb", arabic: "يعكس / يتأمل", definition: "To throw back light, heat, or sound, or to think carefully about something.", examples: ["The still lake reflected the mountains at sunrise.", "Her essay reflects a deep understanding of the novel.", "After the meeting, he took time to reflect on the criticism."], synonyms: ["mirror", "contemplate", "express"], day: 35, group: 3 },
  { word: "resourceful", pos: "adjective", arabic: "حاذق / واسع الحيلة", definition: "Able to deal skillfully and creatively with difficult situations or limited means.", examples: ["The resourceful student fixed the broken model with only tape and string.", "During the storm, the resourceful neighbors found a way to share electricity.", "Her resourceful approach saved the project from failure."], synonyms: ["ingenious", "inventive", "clever"], day: 35, group: 3 },
  { word: "retrench", pos: "verb", arabic: "يُقَلِّص / يقتصد", definition: "To reduce costs, spending, or the scale of operations in order to become more efficient.", examples: ["The company decided to retrench after several quarters of declining profits.", "Families often retrench during times of economic uncertainty.", "To survive the budget crisis, the school had to retrench its expansion plans."], synonyms: ["cutback", "economize", "reduce"], day: 35, group: 3 },
  { word: "self-indulgent", pos: "adjective", arabic: "منغمس في الملذات / متساهل مع نفسه", definition: "Excessively focused on satisfying one's own desires or appetites, often without restraint.", examples: ["The movie was criticized as a self-indulgent display of the director's ego.", "His self-indulgent spending left him deeply in debt.", "She realized that avoiding all responsibility had become a self-indulgent habit."], synonyms: ["pampered", "hedonistic", "selfish"], day: 35, group: 3 },
  { word: "speculate", pos: "verb", arabic: "يتكهن / يضارب", definition: "To form a theory or guess about something without firm evidence, or to engage in risky financial trading.", examples: ["Experts speculate that interest rates will fall later this year.", "It is unwise to speculate about the cause before the investigation is complete.", "Some investors speculate in foreign currencies for quick profits."], synonyms: ["guess", "conjecture", "surmise"], day: 35, group: 3 },
  { word: "staid", pos: "adjective", arabic: "وقور / رصين", definition: "Serious, respectable, and somewhat dull or lacking in excitement.", examples: ["The firm had a staid reputation that appealed to conservative clients.", "Her staid manner concealed a sharp sense of humor.", "The conference was informative but conducted in a staid atmosphere."], synonyms: ["sedate", "sober", "dignified"], day: 35, group: 3 },
  { word: "suppress", pos: "verb", arabic: "يقمع / يكبت", definition: "To forcefully put an end to something or to keep a feeling, reaction, or information from being expressed.", examples: ["The regime tried to suppress public protests through intimidation.", "He struggled to suppress a laugh during the solemn ceremony.", "The editor refused to suppress facts that were important to the story."], synonyms: ["quell", "stifle", "repress"], day: 35, group: 3 },
  { word: "vestigial", pos: "adjective", arabic: "أثري / ضامر", definition: "Remaining as a small, imperfect, or nonfunctional part of something that was once more developed.", examples: ["The appendix is often described as a vestigial organ in humans.", "The old railway station still had a vestigial platform hidden behind weeds.", "Certain insects possess vestigial wings that no longer allow flight."], synonyms: ["rudimentary", "residual", "remnant"], day: 35, group: 3 },
  { word: "accord", pos: "verb", arabic: "يمنح / يوافق", definition: "To give, grant, or be in agreement with something or someone.", examples: ["The committee decided to accord the researcher full access to the archives.", "His actions do not accord with the principles he claims to support.", "The law accords every citizen the right to a fair trial."], synonyms: ["grant", "concur", "harmonize"], day: 36, group: 1 },
  { word: "ad hoc", pos: "adjective", arabic: "مخصص / مؤقت", definition: "Created or done for a particular purpose or situation rather than as part of a general plan.", examples: ["The board formed an ad hoc committee to investigate the complaint.", "Their ad hoc solution worked for the moment but lacked durability.", "An ad hoc arrangement was made to accommodate the unexpected guests."], synonyms: ["temporary", "improvised", "expedient"], day: 36, group: 1 },
  { word: "adhere", pos: "verb", arabic: "يلتزم / يلتصق", definition: "To stick firmly to something physically or to follow a rule, belief, or plan closely.", examples: ["All employees must adhere to the company's safety regulations.", "The label will not adhere well to a dusty surface.", "She continues to adhere to the philosophy she adopted in college."], synonyms: ["cling", "comply", "observe"], day: 36, group: 1 },
  { word: "all-encompassing", pos: "adjective", arabic: "شامل / جامع", definition: "Including everything or everyone within its scope; comprehensive.", examples: ["The report offers an all-encompassing review of the nation's energy policy.", "Her all-encompassing curiosity led her to study art, science, and history.", "The dictator sought all-encompassing control over public and private life."], synonyms: ["comprehensive", "inclusive", "sweeping"], day: 36, group: 1 },
  { word: "aphorism", pos: "noun", arabic: "حكمة / مثل", definition: "A short, memorable statement that expresses a general truth or principle.", examples: ["The teacher began the lecture with an aphorism about the value of patience.", "One famous aphorism warns that knowledge is power.", "His essay was filled with wit but lacked a truly original aphorism."], synonyms: ["maxim", "saying", "proverb"], day: 36, group: 1 },
  { word: "benchmark", pos: "noun", arabic: "معيار / مرجع", definition: "A standard or point of reference against which things may be compared or assessed.", examples: ["This exam serves as a benchmark for evaluating student progress.", "The company's profits set a new benchmark for the industry.", "Researchers used last year's data as a benchmark for the current study."], synonyms: ["standard", "criterion", "yardstick"], day: 36, group: 1 },
  { word: "blighted", pos: "adjective", arabic: "مدمر / منكوب", definition: "Damaged, spoiled, or harmed severely, especially by neglect, disease, or misfortune.", examples: ["The storm left the once-thriving orchards blighted and barren.", "They launched a project to rebuild the blighted neighborhood.", "Years of drought had left the farmland blighted beyond easy repair."], synonyms: ["ruined", "ravaged", "spoiled"], day: 36, group: 1 },
  { word: "content", pos: "adjective", arabic: "راض / قانع", definition: "Satisfied and at ease with one's situation or what one has.", examples: ["She felt content after a quiet evening spent reading by the fire.", "He was content with a modest salary because he loved his work.", "The cat looked content as it slept in the warm sunlight."], synonyms: ["satisfied", "pleased", "fulfilled"], day: 36, group: 1 },
  { word: "debase", pos: "verb", arabic: "يحط من قدر / يفسد", definition: "To lower in quality, value, dignity, or moral character.", examples: ["Critics argued that the sensational program would debase public discourse.", "A leader should not debase the office through petty behavior.", "The use of cheap materials can debase the final product."], synonyms: ["degrade", "demean", "corrupt"], day: 36, group: 1 },
  { word: "disconcerting", pos: "adjective", arabic: "مربك / مقلق", definition: "Causing discomfort, confusion, or a feeling of unease.", examples: ["There was something disconcerting about the silence that followed her question.", "His disconcerting smile made the audience unsure of his intentions.", "The report contained disconcerting evidence of widespread fraud."], synonyms: ["unsettling", "disturbing", "disquieting"], day: 36, group: 1 },
  { word: "extant", pos: "adjective", arabic: "موجود / باقٍ", definition: "Still in existence, especially surviving from an earlier time.", examples: ["Only a few extant copies of the manuscript remain in the archive.", "The historian studied every extant letter written by the queen.", "Despite the fire, several extant records helped reconstruct the town's past."], synonyms: ["existing", "surviving", "remaining"], day: 36, group: 2 },
  { word: "facility", pos: "noun", arabic: "براعة / سهولة", definition: "Natural ease, skill, or ability in doing something.", examples: ["She spoke with remarkable facility in three different languages.", "His facility with numbers made him an excellent analyst.", "The pianist's facility at sight-reading impressed the entire audience."], synonyms: ["ease", "aptitude", "skill"], day: 36, group: 2 },
  { word: "fitful", pos: "adjective", arabic: "متقطع / متقلب", definition: "Occurring irregularly or intermittently, often with sudden starts and stops.", examples: ["He fell into a fitful sleep during the long flight.", "The old engine made fitful attempts to start on the cold morning.", "Their fitful progress through the storm slowed the rescue mission."], synonyms: ["intermittent", "sporadic", "uneven"], day: 36, group: 2 },
  { word: "incite", pos: "verb", arabic: "يحرّض / يهيّج", definition: "To provoke or stir up someone to behave in a violent or unlawful way.", examples: ["The speaker was accused of trying to incite the crowd to riot.", "False rumors can incite panic during an emergency.", "Leaders should calm tensions rather than incite division."], synonyms: ["provoke", "instigate", "arouse"], day: 36, group: 2 },
  { word: "induce", pos: "verb", arabic: "يُقنع / يسبّب", definition: "To bring about, cause, or persuade someone to do something.", examples: ["Nothing could induce her to reveal the source of the leak.", "The drug may induce drowsiness in some patients.", "High interest rates can induce consumers to save more money."], synonyms: ["persuade", "cause", "prompt"], day: 36, group: 2 },
  { word: "infelicity", pos: "noun", arabic: "هفوة / سوء تعبير", definition: "An inappropriate, awkward, or unfortunate expression or remark.", examples: ["The candidate's infelicity during the interview quickly spread online.", "Calling the event a success after the accident was a serious infelicity.", "The editor removed a minor infelicity from the final draft."], synonyms: ["blunder", "gaffe", "awkwardness"], day: 36, group: 2 },
  { word: "intelligible", pos: "adjective", arabic: "مفهوم / واضح", definition: "Able to be understood clearly and easily.", examples: ["Her explanation was brief but perfectly intelligible to the class.", "The recording was noisy, yet the main message remained intelligible.", "Good writing should be intelligible even to nonexperts."], synonyms: ["understandable", "clear", "comprehensible"], day: 36, group: 2 },
  { word: "makeshift", pos: "adjective", arabic: "مؤقت / مرتجل", definition: "Serving as a temporary substitute and often improvised from available materials.", examples: ["The campers built a makeshift shelter from branches and tarps.", "After the pipe burst, we used a makeshift repair to stop the leak.", "The clinic operated from a makeshift office until the new building opened."], synonyms: ["improvised", "temporary", "stopgap"], day: 36, group: 2 },
  { word: "onetime", pos: "adjective", arabic: "سابق / سابقًا", definition: "Former or belonging to an earlier period.", examples: ["Her onetime business partner later became her fiercest rival.", "The museum honored a onetime champion of civil rights.", "He returned to visit his onetime neighborhood after decades abroad."], synonyms: ["former", "erstwhile", "previous"], day: 36, group: 2 },
  { word: "opportunistic", pos: "adjective", arabic: "انتهازي / اغتنامي", definition: "Taking advantage of circumstances with little regard for principles or consequences.", examples: ["The article criticized the senator's opportunistic shift in policy.", "An opportunistic investor bought shares after the market panic.", "Predators often display opportunistic feeding behavior in changing environments."], synonyms: ["exploitative", "selfish", "calculating"], day: 36, group: 2 },
  { word: "plausible", pos: "adjective", arabic: "معقول / محتمل", definition: "Appearing reasonable or believable enough to be accepted as true.", examples: ["Her explanation for the delay sounded plausible to the committee.", "Scientists tested several plausible theories about the sudden climate shift.", "It is plausible that higher costs will reduce consumer demand."], synonyms: ["credible", "believable", "reasonable"], day: 36, group: 3 },
  { word: "posturing", pos: "noun", arabic: "استعراض / تظاهر", definition: "Behavior intended to impress others or convey a false appearance of importance, confidence, or principle.", examples: ["The debate was full of political posturing rather than serious discussion.", "Investors saw the CEO's bold statements as mere posturing.", "His moral posturing annoyed colleagues who knew he acted differently in private."], synonyms: ["posing", "pretension", "swagger"], day: 36, group: 3 },
  { word: "potent", pos: "adjective", arabic: "قوي / فعّال", definition: "Having great power, influence, or effectiveness.", examples: ["The speech was a potent reminder of the costs of war.", "This herb contains a potent chemical that affects the nervous system.", "Economic sanctions can be a potent tool of foreign policy."], synonyms: ["powerful", "forceful", "effective"], day: 36, group: 3 },
  { word: "redundant", pos: "adjective", arabic: "زائد / متكرر", definition: "Unnecessary because it is repetitive, excessive, or no longer needed.", examples: ["The editor removed a redundant phrase from the paragraph.", "Automation made several manual procedures redundant.", "Saying 'final outcome' is redundant because an outcome is already final."], synonyms: ["superfluous", "excess", "repetitive"], day: 36, group: 3 },
  { word: "sacrosanct", pos: "adjective", arabic: "مقدس / مصون", definition: "Regarded as too important, holy, or inviolable to be changed or criticized.", examples: ["In the organization, client privacy is considered sacrosanct.", "The professor challenged ideas that many students treated as sacrosanct.", "Even during reform, the constitution's core protections remained sacrosanct."], synonyms: ["holy", "inviolable", "untouchable"], day: 36, group: 3 },
  { word: "shrewd", pos: "adjective", arabic: "فطن / داهية", definition: "Showing sharp judgment and practical intelligence, especially in dealing with people or situations.", examples: ["She made a shrewd investment before property values rose.", "The lawyer asked a shrewd question that exposed the weakness in the argument.", "His shrewd understanding of public opinion helped him win the election."], synonyms: ["astute", "canny", "clever"], day: 36, group: 3 },
  { word: "unadorned", pos: "adjective", arabic: "بسيط / غير مزخرف", definition: "Plain and simple, without decoration, embellishment, or added detail.", examples: ["The cabin was small and unadorned, with bare wooden walls.", "Her writing style is direct and unadorned but highly effective.", "He stated the facts in an unadorned manner, avoiding emotional language."], synonyms: ["plain", "simple", "bare"], day: 36, group: 3 },
  { word: "valedictory", pos: "adjective", arabic: "وداعي / ختامي", definition: "Serving as a farewell or expressing leave-taking.", examples: ["The retiring judge gave a valedictory speech to the bar association.", "Her valedictory remarks thanked mentors, friends, and family.", "The article had a valedictory tone, as if closing an important chapter."], synonyms: ["farewell", "parting", "final"], day: 36, group: 3 },
  { word: "warranted", pos: "adjective", arabic: "مبرر / مستحق", definition: "Justified or deserved based on the circumstances or evidence.", examples: ["Given the safety risks, extra caution was warranted.", "The criticism was warranted because the data had been falsified.", "A full investigation is warranted after such a serious accusation."], synonyms: ["justified", "deserved", "merited"], day: 36, group: 3 },
  { word: "wistful", pos: "adjective", arabic: "حنين / أسيف", definition: "Having a gently sad, longing feeling, often for something lost or unattainable.", examples: ["She gave a wistful smile as she looked through old photographs.", "His novel ends on a wistful note of memory and regret.", "They felt wistful watching the train pull away from the station."], synonyms: ["longing", "yearning", "nostalgic"], day: 36, group: 3 },
  { word: "attribute", pos: "verb", arabic: "يَعْزُو / يَنْسُب", definition: "To regard something as being caused by or belonging to a particular person, thing, or factor.", examples: ["She attributed her success to years of disciplined practice.", "Many historians attribute the city's decline to repeated invasions.", "The committee attributed the error to a misunderstanding of the rules."], synonyms: ["ascribe", "credit", "impute"], day: 37, group: 1 },
  { word: "calamitous", pos: "adjective", arabic: "كارِثي / مُفْجِع", definition: "Causing great damage, suffering, or disaster.", examples: ["The region suffered a calamitous flood after days of relentless rain.", "His calamitous decision led to the collapse of the entire project.", "The war had calamitous effects on the nation's economy."], synonyms: ["disastrous", "catastrophic", "tragic"], day: 37, group: 1 },
  { word: "censor", pos: "verb", arabic: "يَرْقُب / يَحْجُب", definition: "To examine and suppress material that is considered objectionable, harmful, or sensitive.", examples: ["The government tried to censor reports that criticized its policies.", "Some platforms censor content that violates community standards.", "The publisher refused to censor the author's controversial passages."], synonyms: ["suppress", "expurgate", "ban"], day: 37, group: 1 },
  { word: "champion", pos: "verb", arabic: "يُدافِع عَنْ / يُناصِر", definition: "To publicly support, defend, or promote a cause, idea, or person.", examples: ["She continued to champion educational reform throughout her career.", "The lawyer championed the rights of workers facing exploitation.", "Many scientists champion stricter environmental protections."], synonyms: ["advocate", "support", "promote"], day: 37, group: 1 },
  { word: "compound", pos: "verb", arabic: "يُفاقِم / يُعَقِّد", definition: "To make a problem, difficulty, or situation worse by adding to it.", examples: ["Heavy traffic compounded the delays caused by the storm.", "His refusal to apologize compounded the tension in the room.", "Poor planning can compound even a minor financial setback."], synonyms: ["intensify", "aggravate", "worsen"], day: 37, group: 1 },
  { word: "deter", pos: "verb", arabic: "يَرْدَع / يَثْنِي", definition: "To discourage or prevent someone from taking a particular action.", examples: ["High fines are meant to deter drivers from speeding.", "Fear of failure did not deter her from applying to the program.", "Visible security measures can deter potential thieves."], synonyms: ["discourage", "prevent", "inhibit"], day: 37, group: 1 },
  { word: "dexterous", pos: "adjective", arabic: "ماهِر / بارِع", definition: "Skillful and quick in using the hands or mind.", examples: ["The dexterous surgeon completed the delicate procedure with remarkable precision.", "Her dexterous handling of the negotiation impressed both sides.", "He was dexterous enough to repair the tiny mechanism without damaging it."], synonyms: ["skillful", "nimble", "adept"], day: 37, group: 1 },
  { word: "dictum", pos: "noun", arabic: "مَقُولَة / حِكْمَة", definition: "A formal statement, assertion, or short authoritative saying.", examples: ["The judge's dictum was quoted in later legal opinions.", "He often repeated the old dictum that honesty is the best policy.", "The professor challenged the dictum as overly simplistic."], synonyms: ["maxim", "adage", "precept"], day: 37, group: 1 },
  { word: "dutiful", pos: "adjective", arabic: "مُطِيع / وَفِيّ", definition: "Showing a sense of obedient, responsible, and respectful duty.", examples: ["The dutiful son visited his parents every weekend.", "She remained dutiful in carrying out her obligations despite her exhaustion.", "The intern was dutiful and completed every assignment on time."], synonyms: ["obedient", "faithful", "compliant"], day: 37, group: 1 },
  { word: "empathetic", pos: "adjective", arabic: "مُتَعاطِف / مُتَفَهِّم", definition: "Showing the ability to understand and share another person's feelings.", examples: ["The counselor was empathetic and listened without judgment.", "An empathetic leader recognizes the pressures facing the team.", "Her empathetic response comforted her grieving friend."], synonyms: ["compassionate", "understanding", "sensitive"], day: 37, group: 1 },
  { word: "ensue", pos: "verb", arabic: "ينتج / يعقب", definition: "To happen afterward as a result or consequence of something else.", examples: ["A heated debate may ensue if the policy is announced without consultation.", "When the dam broke, chaos quickly ensued in the villages below.", "If the negotiations fail, a prolonged strike could ensue."], synonyms: ["follow", "result", "occur"], day: 37, group: 2 },
  { word: "fathom", pos: "verb", arabic: "يفهم / يستوعب", definition: "To understand something deeply or figure it out after careful thought.", examples: ["She could not fathom why her closest friend had ignored her message.", "Scientists are still trying to fathom the full impact of the discovery.", "It is hard to fathom how such a small error caused so much damage."], synonyms: ["comprehend", "grasp", "understand"], day: 37, group: 2 },
  { word: "frank", pos: "adjective", arabic: "صريح / صادق", definition: "Open, honest, and direct in speech or expression.", examples: ["He gave a frank assessment of the company's financial problems.", "Her frank remarks surprised the audience but earned their respect.", "A frank conversation helped the two partners resolve their disagreement."], synonyms: ["candid", "honest", "direct"], day: 37, group: 2 },
  { word: "germane", pos: "adjective", arabic: "ذو صلة / مناسب", definition: "Closely relevant and appropriate to the subject being considered.", examples: ["The professor asked students to keep their comments germane to the text.", "Her evidence was germane to the central issue in the trial.", "Please raise only questions that are germane to today's agenda."], synonyms: ["relevant", "pertinent", "applicable"], day: 37, group: 2 },
  { word: "grumble", pos: "verb", arabic: "يتذمر / يتذمر بصوت منخفض", definition: "To complain in a low, dissatisfied, or irritated way.", examples: ["Workers began to grumble about the sudden change in schedule.", "He tends to grumble whenever the weather turns cold.", "Even loyal customers may grumble if prices rise too quickly."], synonyms: ["complain", "mutter", "grouse"], day: 37, group: 2 },
  { word: "hidebound", pos: "adjective", arabic: "جامد / متزمت", definition: "Unwilling to change because of strict adherence to old ideas or traditions.", examples: ["The committee was too hidebound to consider innovative proposals.", "His hidebound views made collaboration with younger colleagues difficult.", "Many critics saw the curriculum as hidebound and badly in need of reform."], synonyms: ["rigid", "conservative", "inflexible"], day: 37, group: 2 },
  { word: "hypocrite", pos: "noun", arabic: "منافق / مراء", definition: "A person who claims to have certain moral standards or beliefs but acts contrary to them.", examples: ["She called him a hypocrite for condemning dishonesty while cheating on his taxes.", "The novel exposes the politician as a hypocrite who serves only himself.", "It is easy to label others a hypocrite without examining one's own behavior."], synonyms: ["pretender", "deceiver", "pharisee"], day: 37, group: 2 },
  { word: "impolitic", pos: "adjective", arabic: "غير حكيم / غير لبق", definition: "Unwise or tactless, especially in a way that is likely to cause trouble.", examples: ["It was impolitic to criticize the host during the dinner speech.", "Her impolitic comments damaged relations with the negotiating team.", "At such a tense moment, any impolitic joke could make matters worse."], synonyms: ["unwise", "tactless", "indiscreet"], day: 37, group: 2 },
  { word: "insidious", pos: "adjective", arabic: "خبيث / ماكر", definition: "Proceeding in a gradual, subtle way but causing harmful effects.", examples: ["The disease is insidious because its early symptoms are easy to ignore.", "An insidious rumor spread through the office and undermined morale.", "The article warns about the insidious effects of constant surveillance."], synonyms: ["stealthy", "subtle", "treacherous"], day: 37, group: 2 },
  { word: "intermediary", pos: "noun", arabic: "وسيط / طرف وسيط", definition: "A person or organization that acts between two others to help communication or negotiation.", examples: ["An intermediary helped the two companies settle their dispute quietly.", "The village elder served as an intermediary between the officials and the residents.", "Without an intermediary, the talks might have collapsed in the first hour."], synonyms: ["mediator", "broker", "go-between"], day: 37, group: 2 },
  { word: "passive", pos: "adjective", arabic: "سلبي / خامل", definition: "Accepting or allowing things to happen without active response, resistance, or participation.", examples: ["The committee remained passive during the heated debate.", "Passive investors often prefer stable long-term funds.", "Her passive attitude prevented her from confronting the problem."], synonyms: ["inactive", "submissive", "compliant"], day: 37, group: 3 },
  { word: "raillery", pos: "noun", arabic: "مزاح / سخرية", definition: "Good-natured teasing or light mockery in conversation.", examples: ["His friendly raillery kept the dinner conversation lively.", "She responded to their raillery with a smile.", "The novel captures the witty raillery of the court."], synonyms: ["banter", "teasing", "jesting"], day: 37, group: 3 },
  { word: "ramble", pos: "verb", arabic: "يهيم / يتجول", definition: "To wander aimlessly or to speak at length in a confused, unfocused way.", examples: ["We decided to ramble through the old streets after lunch.", "He tends to ramble when asked about his childhood.", "The lecturer began to ramble and lost the audience's attention."], synonyms: ["wander", "roam", "digress"], day: 37, group: 3 },
  { word: "resent", pos: "verb", arabic: "يستنكر / يضمر الضغينة", definition: "To feel bitterness, displeasure, or indignation about something regarded as unfair or insulting.", examples: ["She came to resent the constant criticism from her supervisor.", "Many citizens resent paying higher taxes without better services.", "He did not resent the advice, but he disliked the tone."], synonyms: ["begrudge", "envy", "resent"], day: 37, group: 3 },
  { word: "residual", pos: "adjective", arabic: "متبق / متخلف", definition: "Remaining as a leftover or remainder after the main part has been removed or used.", examples: ["Residual heat kept the room warm for hours.", "The lab detected residual chemicals in the water sample.", "Residual effects of the injury slowed his recovery."], synonyms: ["remaining", "leftover", "lingering"], day: 37, group: 3 },
  { word: "resolve", pos: "verb", arabic: "يحل / يعزم", definition: "To settle a problem or firmly decide to do something.", examples: ["The mediator helped the two sides resolve their dispute.", "She resolved to study every day before the exam.", "New evidence may resolve the mystery at last."], synonyms: ["settle", "determine", "decide"], day: 37, group: 3 },
  { word: "surrogate", pos: "noun", arabic: "بديل / نائب", definition: "A substitute person or thing that acts in place of another.", examples: ["The council appointed a surrogate to represent the absent chairperson.", "For some readers, fiction serves as a surrogate for experience.", "The patient signed a form naming her brother as a medical surrogate."], synonyms: ["substitute", "proxy", "standin"], day: 37, group: 3 },
  { word: "vilify", pos: "verb", arabic: "يشوه / يذم", definition: "To speak or write about someone in a highly abusive or malicious way.", examples: ["Political rivals tried to vilify the candidate with false rumors.", "It is unfair to vilify her for a decision made by the whole team.", "The article seemed designed to vilify rather than inform."], synonyms: ["defame", "slander", "malign"], day: 37, group: 3 },
  { word: "wanting", pos: "adjective", arabic: "ناقص / مفتقر", definition: "Lacking something necessary; deficient or inadequate.", examples: ["The proposal was interesting but wanting in detail.", "His explanation was wanting, so the jury remained unconvinced.", "The school's resources were badly wanting after the budget cuts."], synonyms: ["lacking", "deficient", "inadequate"], day: 37, group: 3 },
  { word: "willful", pos: "adjective", arabic: "عنيد / متعمد", definition: "Stubbornly determined to do as one wants, or done deliberately and intentionally.", examples: ["The child was willful and refused to follow instructions.", "The court found that the company had committed a willful violation.", "Her willful optimism helped her persist through setbacks."], synonyms: ["obstinate", "deliberate", "stubborn"], day: 37, group: 3 },
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

export const TOTAL_DAYS = 37;
export const WORDS_PER_DAY = 30;
export const GROUPS_PER_DAY = 3;
export const WORDS_PER_GROUP = 10;
