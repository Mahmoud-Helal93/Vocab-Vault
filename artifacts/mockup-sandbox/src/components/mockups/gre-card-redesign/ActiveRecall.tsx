import "./_group.css";
import { useState } from "react";
import { Volume2, Eye, ChevronRight, Sparkles } from "lucide-react";
import { WORD as W } from "./_word";

export function ActiveRecall() {
  const [phase, setPhase] = useState<"recall" | "self-rate" | "reveal">("recall");
  const [guess, setGuess] = useState("");
  const [confidence, setConfidence] = useState<number | null>(null);

  const speak = () => {
    if ("speechSynthesis" in window) {
      const u = new SpeechSynthesisUtterance(W.word);
      u.lang = "en-US";
      window.speechSynthesis.speak(u);
    }
  };

  return (
    <div className="gre-redesign-root flex items-start justify-center px-6 py-10">
      <div className="w-full max-w-xl flex flex-col gap-6">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="font-semibold tracking-widest">CARD 3 / 10</span>
          <span className="px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 font-semibold">
            New word
          </span>
        </div>

        {/* Prompt */}
        <div className="bg-card border border-card-border rounded-3xl shadow-lg p-8">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">
            What does this word mean?
          </p>

          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-5xl font-bold tracking-tight">{W.word}</h1>
            <button
              onClick={speak}
              className="p-2 rounded-full text-emerald-600 hover:bg-emerald-50"
              aria-label="Pronounce"
            >
              <Volume2 size={22} />
            </button>
          </div>
          <p className="text-sm italic text-emerald-600">{W.pos}</p>

          {phase === "recall" && (
            <>
              <textarea
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                placeholder="Type the meaning in your own words…"
                className="mt-6 w-full h-28 p-4 rounded-2xl border border-input bg-background text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <div className="flex items-center justify-between mt-4">
                <button
                  onClick={() => setPhase("reveal")}
                  className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  <Eye size={16} />
                  I don't know — show me
                </button>
                <button
                  onClick={() => setPhase("self-rate")}
                  disabled={!guess.trim()}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-semibold disabled:opacity-30"
                >
                  Check
                  <ChevronRight size={16} />
                </button>
              </div>
            </>
          )}

          {phase === "self-rate" && (
            <div className="mt-6">
              <div className="rounded-2xl border border-card-border bg-muted/40 p-4 mb-5">
                <p className="text-xs font-semibold text-muted-foreground mb-1">YOUR ANSWER</p>
                <p className="text-foreground/90 italic">"{guess}"</p>
              </div>
              <p className="text-xs font-semibold text-muted-foreground mb-1">CORRECT MEANING</p>
              <p className="text-lg font-bold mb-5">{W.definition}</p>
              <p className="text-sm text-center text-muted-foreground mb-3">
                How close were you?
              </p>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { v: 0, label: "Way off", cls: "border-red-300 text-red-700 hover:bg-red-50" },
                  { v: 3, label: "Close",   cls: "border-yellow-300 text-yellow-700 hover:bg-yellow-50" },
                  { v: 5, label: "Got it",  cls: "border-emerald-300 text-emerald-700 hover:bg-emerald-50" },
                ].map((b) => (
                  <button
                    key={b.v}
                    onClick={() => setConfidence(b.v)}
                    className={`py-3 rounded-xl border-2 font-semibold ${b.cls} ${
                      confidence === b.v ? "ring-2 ring-offset-2 ring-primary" : ""
                    }`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
              {confidence !== null && (
                <button
                  onClick={() => setPhase("reveal")}
                  className="mt-5 w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-primary text-primary-foreground font-semibold"
                >
                  Continue <ChevronRight size={16} />
                </button>
              )}
            </div>
          )}

          {phase === "reveal" && (
            <div className="mt-6 space-y-5">
              <div>
                <p className="text-xs font-semibold text-muted-foreground mb-1">MEANING</p>
                <p className="text-lg font-bold">{W.definition}</p>
                <p className="text-sm text-muted-foreground mt-1">{W.shortDef}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground mb-2">EXAMPLE</p>
                <p className="text-foreground/85 italic leading-relaxed">"{W.examples[0]}"</p>
              </div>
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 mb-1">
                  <Sparkles size={14} />
                  HINT TO REMEMBER
                </div>
                <p className="text-sm text-foreground/85 leading-snug">{W.mnemonic}</p>
              </div>
            </div>
          )}
        </div>

        <p className="text-center text-xs text-muted-foreground">
          Active recall · Generation effect strengthens memory
        </p>
      </div>
    </div>
  );
}
