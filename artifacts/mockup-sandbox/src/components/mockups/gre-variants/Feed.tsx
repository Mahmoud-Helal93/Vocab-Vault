import React, { useState, useEffect, useRef } from "react";
import { Heart, Bookmark, RotateCw, Share2, Volume2, Search, Zap, ArrowUp, Music, Flame } from "lucide-react";

// Data
const WORDS = [
  {
    id: "capricious",
    word: "capricious",
    pos: "adj",
    definition: "Given to sudden, unaccountable changes of mood or behavior.",
    examples: [
      "The capricious logic of the TikTok algorithm determines what goes viral.",
      "She is known for her capricious nature, changing her mind at a moment's notice."
    ],
    synonyms: ["fickle", "whimsical", "mercurial"],
    root: "capra (Latin: goat; frisky nature)",
    family: ["caprice", "capriciousness"],
    mastered: 1200,
    saved: 340,
    retries: 56
  },
  {
    id: "austere",
    word: "austere",
    pos: "adj",
    definition: "Severe or strict in manner; without comfort or luxury.",
    examples: [
      "The monk lived an austere life in the mountains.",
      "Her austere expression intimidated the new students."
    ],
    synonyms: ["stern", "ascetic", "spartan"],
    root: "austeros (Greek: harsh)",
    family: ["austerity"],
    mastered: 850,
    saved: 210,
    retries: 89
  },
  {
    id: "amorphous",
    word: "amorphous",
    pos: "adj",
    definition: "Without a clearly defined shape or form.",
    examples: [
      "The amorphous cloud of gas slowly dissipated.",
      "His amorphous political views confused voters."
    ],
    synonyms: ["formless", "shapeless", "nebulous"],
    root: "a- + morphe (Greek: without form)",
    family: ["metamorphosis", "morphology"],
    mastered: 920,
    saved: 410,
    retries: 112
  },
  {
    id: "cerebral",
    word: "cerebral",
    pos: "adj",
    definition: "Intellectual rather than emotional or physical.",
    examples: [
      "The movie was a cerebral thriller that required close attention.",
      "He took a very cerebral approach to solving the problem."
    ],
    synonyms: ["analytical", "scholarly", "rational"],
    root: "cerebrum (Latin: brain)",
    family: ["cerebrum"],
    mastered: 1050,
    saved: 320,
    retries: 45
  },
  {
    id: "conspicuous",
    word: "conspicuous",
    pos: "adj",
    definition: "Standing out so as to be clearly visible.",
    examples: [
      "The bright green car was highly conspicuous in the parking lot.",
      "He showed a conspicuous lack of concern for the rules."
    ],
    synonyms: ["prominent", "obvious", "glaring"],
    root: "conspicere (Latin: to see clearly)",
    family: ["inconspicuous"],
    mastered: 1420,
    saved: 280,
    retries: 35
  }
];

export function Feed() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Sync active index based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return;
      const scrollY = scrollRef.current.scrollTop;
      const height = scrollRef.current.clientHeight;
      const index = Math.round(scrollY / height);
      if (index !== activeIndex) {
        setActiveIndex(index);
      }
    };
    
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (el) el.removeEventListener("scroll", handleScroll);
    };
  }, [activeIndex]);

  return (
    <div className="h-[900px] w-full bg-[#0a0a0a] text-white overflow-hidden relative font-sans flex items-center justify-center">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap');
        .feed-container {
          scroll-snap-type: y mandatory;
          overflow-y: scroll;
          height: 100%;
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .feed-container::-webkit-scrollbar {
          display: none;
        }
        .card-snap {
          scroll-snap-align: start;
        }
        .text-neon {
          text-shadow: 0 0 10px rgba(163, 230, 53, 0.6), 0 0 20px rgba(163, 230, 53, 0.4);
        }
      `}} />

      {/* Atmospheric side gutters showing previous/next words faded */}
      <div className="absolute inset-0 z-0 flex flex-col justify-center opacity-20 pointer-events-none overflow-hidden blur-xl">
        {WORDS.map((word, i) => {
          const offset = i - activeIndex;
          return (
            <div 
              key={word.id} 
              className="absolute w-full text-center transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{
                top: '50%',
                transform: `translateY(calc(-50% + ${offset * 900}px)) scale(${1 - Math.abs(offset) * 0.15})`,
              }}
            >
              <h1 className="font-['Instrument_Serif'] text-[30vw] leading-none whitespace-nowrap overflow-hidden text-clip text-lime-400/20">
                {word.word}
              </h1>
            </div>
          );
        })}
      </div>

      {/* Phone-shaped column */}
      <div className="relative z-10 w-[420px] h-[850px] bg-[#000000] rounded-[48px] shadow-[0_0_120px_rgba(163,230,53,0.08)] border-4 border-zinc-900 overflow-hidden flex flex-col ring-1 ring-white/10">
        
        {/* Top Nav */}
        <div className="absolute top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-6 bg-gradient-to-b from-black/90 via-black/50 to-transparent pointer-events-none">
          <div className="flex items-center gap-2 pointer-events-auto">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-lime-400 to-green-600 flex items-center justify-center font-bold text-sm shadow-[0_0_20px_rgba(163,230,53,0.3)] text-black border-2 border-black">
              JD
            </div>
            <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-xl px-3 py-1.5 rounded-full border border-white/10 text-xs font-bold tracking-wide">
              <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
              <span>4 days</span>
            </div>
          </div>
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-xl border border-white/10 hover:bg-white/20 transition pointer-events-auto">
            <Search className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Floating Engagement Copy */}
        <div className="absolute top-28 left-0 right-0 z-40 flex justify-center pointer-events-none">
          <div className="bg-lime-400/10 backdrop-blur-md border border-lime-400/20 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-lime-300 shadow-[0_0_15px_rgba(163,230,53,0.1)]">
            You've rated 47 words this week
          </div>
        </div>

        {/* Main Feed Container */}
        <div ref={scrollRef} className="feed-container w-full relative">
          {WORDS.map((word, index) => (
            <div
              key={word.id}
              className="card-snap h-full w-full relative flex items-center justify-center px-6 pb-24 pt-32"
            >
              {/* Background gradient hint per card */}
              <div className="absolute inset-0 bg-gradient-to-b from-lime-950/20 via-black to-black pointer-events-none" />
              
              {/* Content */}
              <div className="relative z-10 w-full h-full flex flex-col justify-end pb-8">
                <div className="mb-4">
                  <span className="inline-flex items-center justify-center bg-lime-950/40 text-lime-400 border border-lime-500/30 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest shadow-[0_0_10px_rgba(163,230,53,0.15)]">
                    {word.pos}
                  </span>
                </div>

                <h1 className="font-['Instrument_Serif'] text-[4.5rem] leading-[0.9] tracking-tight mb-4 drop-shadow-2xl text-white">
                  {word.word}
                </h1>

                <p className="text-[1.3rem] font-medium leading-snug mb-6 text-zinc-300 drop-shadow-md">
                  "{word.definition}"
                </p>

                <div className="relative pl-5 py-2 mb-8 border-l-2 border-lime-500/60 bg-gradient-to-r from-lime-500/5 to-transparent">
                  <p className="text-lg text-white italic font-serif leading-relaxed">
                    {word.examples[0]}
                  </p>
                </div>

                <div className="space-y-6 mt-4 pr-16">
                  <div>
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-500 mb-3">Synonyms</h3>
                    <div className="flex flex-wrap gap-2">
                      {word.synonyms.map(syn => (
                        <span key={syn} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-zinc-300 hover:bg-lime-500/20 hover:border-lime-500/40 hover:text-lime-300 transition-all cursor-pointer backdrop-blur-sm font-medium">
                          {syn}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-5 border-t border-white/10">
                    <p className="text-[12px] text-zinc-400 leading-relaxed font-mono">
                      <span className="text-lime-400/80 font-bold mr-2 uppercase">Root</span>
                      {word.root}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Action Rail */}
              <div className="absolute right-3 bottom-24 z-20 flex flex-col items-center gap-6">
                <div className="flex flex-col items-center gap-1 group cursor-pointer">
                  <div className="w-[48px] h-[48px] rounded-full bg-zinc-900/80 backdrop-blur-xl border border-white/10 flex items-center justify-center group-hover:bg-lime-500/20 group-hover:border-lime-500/50 transition-all shadow-xl">
                    <Heart className="w-6 h-6 text-white group-hover:fill-lime-400 group-hover:text-lime-400 transition-all" />
                  </div>
                  <span className="text-[12px] font-bold text-white drop-shadow-md">{(word.mastered / 1000).toFixed(1)}k</span>
                </div>

                <div className="flex flex-col items-center gap-1 group cursor-pointer">
                  <div className="w-[48px] h-[48px] rounded-full bg-zinc-900/80 backdrop-blur-xl border border-white/10 flex items-center justify-center group-hover:bg-white/20 transition-all shadow-xl">
                    <Bookmark className="w-6 h-6 text-white group-hover:fill-white transition-all" />
                  </div>
                  <span className="text-[12px] font-bold text-white drop-shadow-md">{word.saved}</span>
                </div>

                <div className="flex flex-col items-center gap-1 group cursor-pointer">
                  <div className="w-[48px] h-[48px] rounded-full bg-zinc-900/80 backdrop-blur-xl border border-white/10 flex items-center justify-center group-hover:bg-orange-500/20 group-hover:border-orange-500/50 transition-all shadow-xl">
                    <RotateCw className="w-6 h-6 text-white group-hover:text-orange-400 transition-all" />
                  </div>
                  <span className="text-[12px] font-bold text-white drop-shadow-md">{word.retries}</span>
                </div>
                
                <div className="flex flex-col items-center gap-1 group cursor-pointer mt-2">
                  <div className="w-10 h-10 rounded-full bg-zinc-900/80 backdrop-blur-xl border border-white/10 flex items-center justify-center hover:bg-white/20 transition-all shadow-xl">
                    <Share2 className="w-4 h-4 text-white" />
                  </div>
                </div>

                <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center mt-6 animate-[spin_4s_linear_infinite] border-2 border-zinc-700 overflow-hidden relative shadow-[0_0_20px_rgba(0,0,0,0.8)]">
                   <div className="w-4 h-4 bg-zinc-900 rounded-full border border-zinc-700 z-10"></div>
                   <div className="absolute inset-0 bg-gradient-to-tr from-lime-500/40 to-transparent"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Progress & Swipe Hint */}
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-black via-black/95 to-transparent pointer-events-none flex flex-col items-center justify-end pb-8 z-40">
          <div className="flex items-center gap-2 mb-3 bg-zinc-900/80 px-4 py-1.5 rounded-full border border-white/5 backdrop-blur-md">
            <span className="text-[10px] font-bold text-zinc-400 mr-1">DAY 2</span>
            <div className="flex items-center gap-1.5">
              <div className="h-1.5 w-8 bg-lime-400 rounded-full shadow-[0_0_8px_rgba(163,230,53,0.8)]" />
              <div className="h-1.5 w-8 bg-white/20 rounded-full" />
              <div className="h-1.5 w-8 bg-white/20 rounded-full" />
            </div>
            <span className="text-[10px] font-bold text-white ml-1">14/30</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-500">
            <ArrowUp className="w-3 h-3 animate-bounce text-lime-400/70" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Swipe up for next</span>
          </div>
        </div>
      </div>
    </div>
  );
}
