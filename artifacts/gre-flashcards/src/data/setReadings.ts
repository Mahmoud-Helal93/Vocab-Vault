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

export const SET_READINGS: Record<string, SetReading> = {
  "1-1": MISSION_1_SET_1,
};

export function getSetReading(day: number, group: number): SetReading | null {
  return SET_READINGS[`${day}-${group}`] ?? null;
}

export function hasSetReading(day: number, group: number): boolean {
  return Boolean(SET_READINGS[`${day}-${group}`]);
}
