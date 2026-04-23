import "./_group.css";
import { useState } from "react";
import { Volume2, Equal, ArrowRightLeft, Lightbulb } from "lucide-react";
import { WORD as W } from "./_word";

interface Node {
  id: string;
  label: string;
  x: number; // %
  y: number; // %
  kind: "syn" | "ant" | "fam" | "root";
}

export function Constellation() {
  const [active, setActive] = useState<Node | null>(null);

  const nodes: Node[] = [
    // synonyms — right side, green
    { id: "s1", label: W.synonyms[0], x: 78, y: 22, kind: "syn" },
    { id: "s2", label: W.synonyms[1], x: 86, y: 50, kind: "syn" },
    { id: "s3", label: W.synonyms[2], x: 78, y: 78, kind: "syn" },
    // antonyms — left side, red
    { id: "a1", label: W.antonyms[0], x: 22, y: 30, kind: "ant" },
    { id: "a2", label: W.antonyms[1], x: 14, y: 65, kind: "ant" },
    // word family — top
    { id: "f1", label: "impecuniosity",   x: 32, y: 8, kind: "fam" },
    { id: "f2", label: "impecuniously",   x: 68, y: 8, kind: "fam" },
    // root — bottom
    { id: "r1", label: "in- + pecunia",   x: 50, y: 92, kind: "root" },
  ];

  const colorOf = (k: Node["kind"]) => {
    switch (k) {
      case "syn":  return { stroke: "#10b981", fill: "bg-emerald-50",  text: "text-emerald-700",  ring: "ring-emerald-200" };
      case "ant":  return { stroke: "#f43f5e", fill: "bg-rose-50",     text: "text-rose-700",     ring: "ring-rose-200" };
      case "fam":  return { stroke: "#6366f1", fill: "bg-indigo-50",   text: "text-indigo-700",   ring: "ring-indigo-200" };
      case "root": return { stroke: "#a855f7", fill: "bg-violet-50",   text: "text-violet-700",   ring: "ring-violet-200" };
    }
  };

  const speak = () => {
    if ("speechSynthesis" in window) {
      const u = new SpeechSynthesisUtterance(W.word);
      u.lang = "en-US";
      window.speechSynthesis.speak(u);
    }
  };

  return (
    <div className="gre-redesign-root flex flex-col items-center px-6 py-8">
      <div className="w-full max-w-xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
              Vocabulary map
            </p>
            <h1 className="text-2xl font-bold">A web of meaning</h1>
          </div>
          <div className="flex gap-1.5 text-[10px] font-semibold">
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">SYN</span>
            <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-700">ANT</span>
            <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700">FAM</span>
            <span className="px-2 py-0.5 rounded-full bg-violet-100 text-violet-700">ROOT</span>
          </div>
        </div>

        {/* Map */}
        <div className="relative w-full aspect-square rounded-3xl bg-gradient-to-br from-slate-50 to-indigo-50/40 border border-card-border shadow-md overflow-hidden">
          {/* connection lines */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {nodes.map((n) => {
              const c = colorOf(n.kind);
              return (
                <line
                  key={n.id}
                  x1={50}
                  y1={50}
                  x2={n.x}
                  y2={n.y}
                  stroke={c.stroke}
                  strokeWidth={0.4}
                  strokeDasharray={n.kind === "ant" ? "1.2,1" : undefined}
                  opacity={0.55}
                  vectorEffect="non-scaling-stroke"
                />
              );
            })}
          </svg>

          {/* Center node */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <div className="bg-card border-2 border-emerald-400 rounded-2xl px-5 py-3 shadow-xl text-center min-w-[170px]">
              <p className="text-[10px] uppercase tracking-widest text-emerald-700 font-bold">
                {W.pos}
              </p>
              <div className="flex items-center justify-center gap-1.5">
                <h2 className="text-xl font-bold leading-tight">{W.word}</h2>
                <button
                  onClick={speak}
                  className="p-1 text-emerald-600 hover:bg-emerald-50 rounded-full"
                  aria-label="Pronounce"
                >
                  <Volume2 size={14} />
                </button>
              </div>
              <p className="text-[11px] text-muted-foreground mt-0.5" dir="rtl">
                {W.arabic}
              </p>
            </div>
          </div>

          {/* Satellite nodes */}
          {nodes.map((n) => {
            const c = colorOf(n.kind);
            const isActive = active?.id === n.id;
            return (
              <button
                key={n.id}
                onClick={() => setActive(isActive ? null : n)}
                className={`absolute -translate-x-1/2 -translate-y-1/2 px-2.5 py-1.5 rounded-full ${c.fill} ${c.text} border border-white shadow-sm text-xs font-semibold transition-transform hover:scale-110 z-10 ${
                  isActive ? `ring-2 ${c.ring}` : ""
                }`}
                style={{ left: `${n.x}%`, top: `${n.y}%` }}
              >
                {n.kind === "syn" && <Equal size={10} className="inline mr-1" />}
                {n.kind === "ant" && <ArrowRightLeft size={10} className="inline mr-1" />}
                {n.label}
              </button>
            );
          })}
        </div>

        {/* Inspector */}
        <div className="mt-5 rounded-2xl border border-card-border bg-card shadow-sm p-5 min-h-[140px]">
          {active ? (
            <>
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-2">
                {active.kind === "syn"  && "Synonym — same direction"}
                {active.kind === "ant"  && "Antonym — opposite"}
                {active.kind === "fam"  && "Word family"}
                {active.kind === "root" && "Root"}
              </div>
              <p className="text-2xl font-bold mb-1">{active.label}</p>
              <p className="text-sm text-muted-foreground">
                {active.kind === "syn" &&
                  `Means roughly the same as ${W.word.toLowerCase()} — both convey poverty.`}
                {active.kind === "ant" &&
                  `The opposite of ${W.word.toLowerCase()} — wealth instead of want.`}
                {active.kind === "fam" &&
                  `A relative of ${W.word.toLowerCase()}, sharing the same root pecunia.`}
                {active.kind === "root" &&
                  `Latin in- ("not") + pecunia ("money") = "not having money".`}
              </p>
            </>
          ) : (
            <div className="flex items-start gap-3">
              <div className="shrink-0 w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                <Lightbulb size={18} />
              </div>
              <div>
                <p className="text-sm font-bold mb-1">Tap any node to explore</p>
                <p className="text-sm text-muted-foreground leading-snug">
                  {W.definition} Synonyms cluster on the right, opposites on the left,
                  family above, root below.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
