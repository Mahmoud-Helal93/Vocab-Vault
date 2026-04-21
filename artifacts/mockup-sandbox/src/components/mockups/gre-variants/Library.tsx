import React, { useState } from "react";

interface Word {
  id: string;
  word: string;
  pos: string;
  definition: string;
  examples: string[];
  synonyms: string[];
  day: number;
  group: number;
  status: "new" | "learning" | "review" | "mastered";
  interval: number;
  easeFactor: number;
  repetitions: number;
  correctCount: number;
  incorrectCount: number;
  root?: string;
  wordFamily?: string[];
}

const SAMPLE_WORDS: Word[] = [
  {
    id: "1",
    word: "abound",
    pos: "v",
    definition: "To exist in large numbers; be plentiful.",
    examples: [
      "The forest abounds with wildlife.",
      "Rumors abound regarding his sudden departure.",
      "This region abounds in natural resources."
    ],
    synonyms: ["teem", "overflow", "proliferate"],
    day: 1, group: 1, status: "learning",
    interval: 1, easeFactor: 2.5, repetitions: 1, correctCount: 1, incorrectCount: 0,
    root: "abundare (Latin: to overflow)",
    wordFamily: ["abundant", "abundance"]
  },
  {
    id: "2",
    word: "amorphous",
    pos: "adj",
    definition: "Without a clearly defined shape or form.",
    examples: [
      "It is a dark, strangely amorphous shadow filling the room.",
      "The project was originally an amorphous collection of ideas.",
      "Amorphous solids lack a crystalline structure."
    ],
    synonyms: ["formless", "shapeless", "nebulous"],
    day: 1, group: 1, status: "new",
    interval: 0, easeFactor: 2.5, repetitions: 0, correctCount: 0, incorrectCount: 0,
    root: "a- + morphe (Greek: without form)",
    wordFamily: ["metamorphosis", "morphology"]
  },
  {
    id: "3",
    word: "austere",
    pos: "adj",
    definition: "Severe or strict in manner; without comfort.",
    examples: [
      "He was an austere man, with a rigidly puritanical outlook.",
      "The cathedral is impressive in its austere simplicity.",
      "Conditions in the prison could hardly be more austere."
    ],
    synonyms: ["stern", "ascetic", "spartan"],
    day: 1, group: 1, status: "review",
    interval: 3, easeFactor: 2.4, repetitions: 2, correctCount: 2, incorrectCount: 0,
    root: "austeros (Greek: harsh)"
  },
  {
    id: "4",
    word: "capricious",
    pos: "adj",
    definition: "Given to sudden, unaccountable changes of mood or behavior.",
    examples: [
      "It's terrible to feel our livelihood hinges on a capricious boss.",
      "The capricious winds made sailing difficult.",
      "She is known for her capricious nature and sudden decisions."
    ],
    synonyms: ["fickle", "whimsical", "mercurial"],
    day: 1, group: 1, status: "mastered",
    interval: 14, easeFactor: 2.6, repetitions: 4, correctCount: 5, incorrectCount: 1,
    root: "capra (Latin: goat)",
    wordFamily: ["caprice", "capriciousness"]
  },
  {
    id: "5",
    word: "cerebral",
    pos: "adj",
    definition: "Intellectual rather than emotional or physical.",
    examples: [
      "Photography is a cerebral process for her.",
      "His approach to the game is highly cerebral.",
      "The movie was a bit too cerebral for a Friday night."
    ],
    synonyms: ["analytical", "scholarly", "rational"],
    day: 1, group: 1, status: "review",
    interval: 4, easeFactor: 2.5, repetitions: 2, correctCount: 2, incorrectCount: 0,
    root: "cerebrum (Latin: brain)"
  },
  {
    id: "6",
    word: "conspicuous",
    pos: "adj",
    definition: "Standing out so as to be clearly visible; attracting notice.",
    examples: [
      "He was very thin, with a conspicuous Adam's apple.",
      "The bird has a conspicuous red head.",
      "Her absence was conspicuous."
    ],
    synonyms: ["prominent", "obvious", "glaring"],
    day: 1, group: 2, status: "learning",
    interval: 1, easeFactor: 2.5, repetitions: 1, correctCount: 1, incorrectCount: 0,
    root: "conspicere (Latin: to see clearly)"
  },
  {
    id: "7",
    word: "didactic",
    pos: "adj",
    definition: "Intended to teach, particularly in having moral instruction as an ulterior motive.",
    examples: [
      "A didactic novel that set out to expose social injustice.",
      "His tone became increasingly didactic.",
      "The children's book was somewhat didactic."
    ],
    synonyms: ["instructive", "pedagogical", "moralizing"],
    day: 1, group: 2, status: "review",
    interval: 5, easeFactor: 2.3, repetitions: 3, correctCount: 3, incorrectCount: 1,
    root: "didaskein (Greek: to teach)"
  },
  {
    id: "8",
    word: "disseminate",
    pos: "v",
    definition: "Spread or disperse (something, especially information) widely.",
    examples: [
      "Health authorities should foster good practice by disseminating information.",
      "The internet allows us to disseminate news rapidly.",
      "They disseminated the pamphlets throughout the neighborhood."
    ],
    synonyms: ["broadcast", "propagate", "diffuse"],
    day: 1, group: 2, status: "mastered",
    interval: 21, easeFactor: 2.7, repetitions: 5, correctCount: 6, incorrectCount: 0,
    root: "dis- + seminare (Latin: to sow seeds)",
    wordFamily: ["seminar", "seminary"]
  },
  {
    id: "9",
    word: "ephemeral",
    pos: "adj",
    definition: "Lasting for a very short time.",
    examples: [
      "Fashions are ephemeral.",
      "The ephemeral joys of childhood.",
      "The mayfly is an ephemeral insect."
    ],
    synonyms: ["transient", "fleeting", "momentary"],
    day: 1, group: 2, status: "new",
    interval: 0, easeFactor: 2.5, repetitions: 0, correctCount: 0, incorrectCount: 0
  },
  {
    id: "10",
    word: "gregarious",
    pos: "adj",
    definition: "Fond of company; sociable.",
    examples: [
      "He was a popular and gregarious man.",
      "Gregarious animals live in flocks or herds.",
      "Her gregarious nature made her the life of the party."
    ],
    synonyms: ["sociable", "convivial", "outgoing"],
    day: 1, group: 2, status: "review",
    interval: 2, easeFactor: 2.4, repetitions: 1, correctCount: 1, incorrectCount: 1
  }
];

const OTHER_WORDS = [
  "belie", "cursory", "daunting", "deify", "feasible", "flout", 
  "homogeneous", "mercurial", "obfuscate", "pragmatic", "sycophant", "vindicate"
];

// Generate a full alphabet list for the index
const generateIndex = () => {
  const allWords = [...SAMPLE_WORDS.map(w => w.word), ...OTHER_WORDS].sort();
  // Group by letter
  const grouped: Record<string, string[]> = {};
  allWords.forEach(w => {
    const letter = w[0].toUpperCase();
    if (!grouped[letter]) grouped[letter] = [];
    grouped[letter].push(w);
  });
  return grouped;
};

export function Library() {
  const index = generateIndex();
  const [reviewActive, setReviewActive] = useState(false);

  return (
    <div className="min-h-[100dvh] bg-[#faf7f2] text-[#2c2a28] font-['Inter',sans-serif] selection:bg-[#5e1b14] selection:text-[#faf7f2]">
      {/* Masthead */}
      <header className="border-b border-[#2c2a28]/20 px-8 py-6 mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-baseline gap-6">
        <div className="flex flex-col">
          <h1 className="font-['Playfair_Display',serif] text-5xl font-black tracking-tight text-[#1a1a1a]">
            The Lexicon
          </h1>
          <span className="font-['Playfair_Display',serif] text-[#5e1b14] italic mt-1 text-lg">
            A curatorial approach to vocabulary
          </span>
        </div>
        <div className="flex flex-col items-end gap-3 text-sm">
          <time className="uppercase tracking-widest text-[#2c2a28]/60 text-xs font-semibold">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </time>
          <nav className="flex gap-6 uppercase tracking-widest text-xs font-medium">
            <a href="#" className="hover:text-[#5e1b14] transition-colors border-b border-transparent hover:border-[#5e1b14]">Index</a>
            <a href="#" className="text-[#5e1b14] border-b border-[#5e1b14]">Today</a>
            <a href="#" className="hover:text-[#5e1b14] transition-colors border-b border-transparent hover:border-[#5e1b14]">Roots</a>
            <a href="#" className="hover:text-[#5e1b14] transition-colors border-b border-transparent hover:border-[#5e1b14]">Notes</a>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-12 grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Left Column: Today's Reading */}
        <article className="lg:col-span-8 flex flex-col gap-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-[1px] flex-1 bg-[#2c2a28]/10"></div>
            <h2 className="font-['Playfair_Display',serif] italic text-xl text-[#2c2a28]/60">Today's Reading</h2>
            <div className="h-[1px] flex-1 bg-[#2c2a28]/10"></div>
          </div>

          {/* Featured Entry 1 */}
          <section className="relative">
            <div className="absolute -left-32 top-2 hidden xl:block w-24 text-right">
              {SAMPLE_WORDS[3].root && (
                <div className="font-['Playfair_Display',serif] italic text-[#5e1b14]/80 text-sm leading-relaxed">
                  from {SAMPLE_WORDS[3].root}
                </div>
              )}
            </div>
            
            <header className="mb-6 flex items-baseline gap-4">
              <h3 className="font-['Playfair_Display',serif] text-6xl font-bold tracking-tight text-[#1a1a1a]">
                capricious
              </h3>
              <span className="font-['Playfair_Display',serif] italic text-2xl text-[#2c2a28]/50">
                adj.
              </span>
            </header>

            <div className="font-['Playfair_Display',serif] text-2xl leading-relaxed text-[#2c2a28] mb-8 max-w-2xl">
              <span className="float-left text-7xl leading-[0.8] pr-3 font-black text-[#5e1b14] mt-1">
                G
              </span>
              iven to sudden, unaccountable changes of mood or behavior. The kind of temperament that defies prediction, acting on whims rather than reason.
            </div>

            <div className="space-y-6 max-w-2xl text-[#2c2a28]/80 leading-relaxed">
              <p>
                To understand the capricious mind is to try to catch the wind. <span className="text-[#1a1a1a] font-medium">"It's terrible to feel our livelihood hinges on a capricious boss,"</span> one might say, capturing the anxiety of living under arbitrary rule.
              </p>
              <p>
                In nature, we often speak of <span className="text-[#1a1a1a] font-medium">capricious winds</span> that make sailing difficult, reflecting the word's root connection to a frisky, unpredictable goat.
              </p>
            </div>

            <footer className="mt-8 pt-6 border-t border-[#2c2a28]/10 max-w-2xl flex justify-between items-center text-sm">
              <div className="flex gap-2">
                <span className="uppercase tracking-widest text-[#2c2a28]/50 text-xs font-semibold">Synonyms:</span>
                <span className="italic">{SAMPLE_WORDS[3].synonyms.join(", ")}</span>
              </div>
              <button className="text-[#5e1b14] hover:text-[#1a1a1a] uppercase tracking-widest text-xs font-semibold transition-colors">
                Add Note
              </button>
            </footer>
          </section>

          {/* Featured Entry 2 */}
          <section className="relative mt-8">
            <div className="absolute -left-32 top-2 hidden xl:block w-24 text-right">
              {SAMPLE_WORDS[7].root && (
                <div className="font-['Playfair_Display',serif] italic text-[#5e1b14]/80 text-sm leading-relaxed">
                  from {SAMPLE_WORDS[7].root}
                </div>
              )}
            </div>
            
            <header className="mb-6 flex items-baseline gap-4">
              <h3 className="font-['Playfair_Display',serif] text-6xl font-bold tracking-tight text-[#1a1a1a]">
                disseminate
              </h3>
              <span className="font-['Playfair_Display',serif] italic text-2xl text-[#2c2a28]/50">
                v.
              </span>
            </header>

            <div className="font-['Playfair_Display',serif] text-2xl leading-relaxed text-[#2c2a28] mb-8 max-w-2xl">
              <span className="float-left text-7xl leading-[0.8] pr-3 font-black text-[#5e1b14] mt-1">
                S
              </span>
              pread or disperse widely, much like casting seeds across a field. It is the act of broadcasting information so that it may take root elsewhere.
            </div>

            <div className="space-y-6 max-w-2xl text-[#2c2a28]/80 leading-relaxed">
              <p>
                The modern world is built on our ability to scatter ideas globally. <span className="text-[#1a1a1a] font-medium">"The internet allows us to disseminate news rapidly,"</span> effectively planting thoughts in countless minds simultaneously.
              </p>
              <p>
                In an institutional context, <span className="text-[#1a1a1a] font-medium">health authorities should foster good practice by disseminating information.</span> It requires both intent and a medium for the seeds to travel.
              </p>
            </div>

            <footer className="mt-8 pt-6 border-t border-[#2c2a28]/10 max-w-2xl flex justify-between items-center text-sm">
              <div className="flex gap-2">
                <span className="uppercase tracking-widest text-[#2c2a28]/50 text-xs font-semibold">Synonyms:</span>
                <span className="italic">{SAMPLE_WORDS[7].synonyms.join(", ")}</span>
              </div>
              <button className="text-[#5e1b14] hover:text-[#1a1a1a] uppercase tracking-widest text-xs font-semibold transition-colors">
                Add Note
              </button>
            </footer>
          </section>

          {/* Index Section */}
          <section className="mt-20 border-t-2 border-[#1a1a1a] pt-12">
            <h2 className="font-['Playfair_Display',serif] text-3xl font-bold mb-12 text-center uppercase tracking-widest">
              Index of Terms
            </h2>
            <div className="columns-1 md:columns-2 xl:columns-3 gap-12 text-sm">
              {Object.entries(index).sort(([a], [b]) => a.localeCompare(b)).map(([letter, words]) => (
                <div key={letter} className="break-inside-avoid mb-8">
                  <h4 className="font-['Playfair_Display',serif] text-2xl font-bold text-[#5e1b14] border-b border-[#2c2a28]/10 pb-2 mb-4">
                    {letter}
                  </h4>
                  <ul className="space-y-3">
                    {words.map(word => {
                      const wordData = SAMPLE_WORDS.find(w => w.word === word);
                      const isReview = wordData?.status === 'review';
                      return (
                        <li key={word} className="flex justify-between items-baseline group cursor-pointer">
                          <span className={`font-medium ${isReview ? 'text-[#5e1b14]' : 'text-[#2c2a28]/80 group-hover:text-[#1a1a1a]'}`}>
                            {word}
                          </span>
                          <span className="text-xs text-[#2c2a28]/40 font-['Playfair_Display',serif] italic">
                            {wordData ? `p. ${wordData.day * 12 + wordData.group}` : 'p. --'}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </article>

        {/* Right Column: Sidebar */}
        <aside className="lg:col-span-4 space-y-16">
          {/* Review Queue */}
          <div className="bg-[#f0ece1] p-8 border border-[#2c2a28]/10 relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#5e1b14]"></div>
            <h3 className="font-['Playfair_Display',serif] text-2xl font-bold text-[#1a1a1a] mb-2">
              Review Queue
            </h3>
            <p className="text-[#2c2a28]/70 text-sm mb-8 leading-relaxed">
              There are <span className="font-semibold text-[#5e1b14]">12 entries</span> requiring your attention today to ensure lasting retention.
            </p>
            
            {reviewActive ? (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="border-l-2 border-[#5e1b14] pl-4">
                  <h4 className="font-['Playfair_Display',serif] text-3xl font-bold mb-2">austere</h4>
                  <p className="italic text-[#2c2a28]/70 mb-4 text-sm">adj. Severe or strict in manner.</p>
                  <div className="flex gap-4">
                    <button onClick={() => setReviewActive(false)} className="text-xs uppercase tracking-widest text-[#2c2a28]/50 hover:text-[#1a1a1a] border-b border-[#2c2a28]/30 pb-0.5">Struggled</button>
                    <button onClick={() => setReviewActive(false)} className="text-xs uppercase tracking-widest text-[#5e1b14] border-b border-[#5e1b14] pb-0.5">Recalled</button>
                  </div>
                </div>
              </div>
            ) : (
              <button 
                onClick={() => setReviewActive(true)}
                className="text-[#5e1b14] uppercase tracking-widest text-xs font-semibold border-b border-[#5e1b14] pb-0.5 hover:text-[#1a1a1a] hover:border-[#1a1a1a] transition-colors"
              >
                Begin review
              </button>
            )}
            
            <div className="mt-8 pt-6 border-t border-[#2c2a28]/10">
              <div className="flex justify-between items-center text-xs text-[#2c2a28]/60 uppercase tracking-widest mb-2">
                <span>Progress</span>
                <span>Day 2 of 5</span>
              </div>
              <div className="flex justify-between items-center text-xs text-[#2c2a28]/60 uppercase tracking-widest">
                <span>Consistency</span>
                <span>4 Days</span>
              </div>
            </div>
          </div>

          {/* Recently Encountered */}
          <div>
            <h3 className="font-['Playfair_Display',serif] text-xl italic text-[#2c2a28]/60 border-b border-[#2c2a28]/10 pb-4 mb-6">
              Recently Encountered
            </h3>
            <ul className="space-y-4">
              {[SAMPLE_WORDS[0], SAMPLE_WORDS[4], SAMPLE_WORDS[5], SAMPLE_WORDS[9]].map(word => (
                <li key={word.id} className="group cursor-pointer">
                  <div className="flex items-baseline justify-between mb-1">
                    <span className="font-['Playfair_Display',serif] text-lg font-bold text-[#2c2a28] group-hover:text-[#5e1b14] transition-colors">
                      {word.word}
                    </span>
                    <span className="text-[#2c2a28]/40 text-xs uppercase tracking-widest">
                      Ease {word.easeFactor.toFixed(1)}
                    </span>
                  </div>
                  <p className="text-sm text-[#2c2a28]/60 truncate italic">
                    {word.definition}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Conceptual Quote */}
          <div className="pt-12">
            <blockquote className="font-['Playfair_Display',serif] text-2xl italic leading-snug text-[#2c2a28]/80 text-center">
              "The limits of my language mean the limits of my world."
            </blockquote>
            <p className="text-center mt-4 text-xs uppercase tracking-widest text-[#2c2a28]/50">
              — Ludwig Wittgenstein
            </p>
          </div>
        </aside>
      </main>
      
      {/* Footer */}
      <footer className="border-t border-[#2c2a28]/20 mt-12 py-12 text-center text-sm text-[#2c2a28]/50 uppercase tracking-widest font-semibold">
        The Lexicon • Volume I • 150 Entries
      </footer>
    </div>
  );
}
