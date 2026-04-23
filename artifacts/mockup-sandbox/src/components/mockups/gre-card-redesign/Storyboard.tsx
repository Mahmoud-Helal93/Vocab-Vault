import "./_group.css";
import { Volume2, Quote, BookOpenText, Sparkles, Languages } from "lucide-react";
import { WORD as W } from "./_word";

export function Storyboard() {
  const speak = () => {
    if ("speechSynthesis" in window) {
      const u = new SpeechSynthesisUtterance(W.word);
      u.lang = "en-US";
      window.speechSynthesis.speak(u);
    }
  };

  return (
    <div className="gre-redesign-root flex items-start justify-center px-6 py-8">
      <div className="w-full max-w-xl flex flex-col">
        {/* Hero scene */}
        <div className="relative rounded-3xl overflow-hidden aspect-[4/3] bg-gradient-to-br from-sky-200 via-sky-100 to-indigo-100 mb-0 shadow-xl">
          {/* Floating ice + sad penguin emoji as visual stand-in */}
          <div className="absolute inset-0 flex items-center justify-center text-[160px] leading-none">
            <span className="drop-shadow-md">🐧</span>
          </div>
          <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/80 backdrop-blur text-xs font-semibold text-emerald-700 flex items-center gap-1.5">
            <BookOpenText size={13} /> A short story
          </div>
          <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-white/80 backdrop-blur text-xs font-semibold text-foreground/70">
            scene 1 of 3
          </div>
        </div>

        {/* Story panel pulled up over hero */}
        <div className="bg-card border border-card-border rounded-3xl shadow-lg p-7 -mt-6 relative z-10">
          <p className="text-xs uppercase tracking-widest text-emerald-700 font-bold mb-3">
            Once upon a word
          </p>
          <p className="text-lg leading-relaxed text-foreground/90">
            {W.mnemonic}
          </p>

          <div className="my-6 h-px bg-card-border" />

          {/* The word reveal */}
          <div className="flex items-end gap-3 mb-1">
            <h1 className="text-4xl font-bold tracking-tight leading-none">{W.word}</h1>
            <button
              onClick={speak}
              className="mb-1 p-1.5 rounded-full text-emerald-600 hover:bg-emerald-50"
              aria-label="Pronounce"
            >
              <Volume2 size={18} />
            </button>
            <span className="ml-auto text-base text-foreground/70" dir="rtl">
              {W.arabic}
            </span>
          </div>
          <p className="text-sm italic text-emerald-600 mb-4">{W.pos}</p>

          <p className="text-base text-foreground leading-snug font-medium">
            {W.definition}
          </p>
        </div>

        {/* Scene 2 — used in a sentence */}
        <div className="mt-6 bg-card border border-card-border rounded-3xl shadow-md p-6">
          <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground mb-3 uppercase tracking-widest">
            <Quote size={14} /> Scene 2 — In the wild
          </div>
          <p className="text-foreground/90 text-[17px] leading-relaxed font-serif italic">
            "{W.examples[0].split(W.word)[0]}
            <span className="not-italic font-bold text-emerald-700">{W.word.toLowerCase()}</span>
            {W.examples[0].split(W.word.toLowerCase())[1] ?? W.examples[0].split(W.word)[1] ?? ""}"
          </p>
        </div>

        {/* Scene 3 — origin */}
        <div className="mt-6 bg-card border border-card-border rounded-3xl shadow-md p-6">
          <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground mb-4 uppercase tracking-widest">
            <Languages size={14} /> Scene 3 — Where it came from
          </div>
          <div className="flex items-center justify-between flex-wrap gap-2 text-center">
            {W.etymology.map((e, i) => (
              <div key={i} className="flex items-center gap-2">
                {i > 0 && <span className="text-muted-foreground font-bold">+</span>}
                <div>
                  <p className="text-base font-bold leading-tight">{e.part}</p>
                  <p className="text-[10px] italic text-muted-foreground">{e.language}</p>
                  <p className="text-[11px] text-foreground/75">{e.meaning}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center text-emerald-700 font-semibold flex items-center justify-center gap-2">
            <Sparkles size={14} /> {W.etymologyMeaning}
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          Stories beat flashcards — narrative encodes meaning deeper.
        </p>
      </div>
    </div>
  );
}
