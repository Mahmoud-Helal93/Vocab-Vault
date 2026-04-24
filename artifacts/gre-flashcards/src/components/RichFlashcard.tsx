import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Word } from "@/data/words";
import { getEnrichment } from "@/data/enrichment";
import {
  Volume2, Sparkles, Users, BookOpen, Equal, Plus,
  ArrowRightLeft, Lightbulb,
} from "lucide-react";
import { previewIntervals } from "@/lib/srs";

interface RatingButton {
  quality: number;
  label: string;
  color: string;
  bg: string;
  border: string;
}

const RATING_BUTTONS: RatingButton[] = [
  { quality: 0, label: "Again",   color: "text-red-600 dark:text-red-400",       bg: "hover:bg-red-50 dark:hover:bg-red-900/20",    border: "border-red-300 dark:border-red-700" },
  { quality: 2, label: "Hard",    color: "text-orange-600 dark:text-orange-400", bg: "hover:bg-orange-50 dark:hover:bg-orange-900/20", border: "border-orange-300 dark:border-orange-700" },
  { quality: 3, label: "Good",    color: "text-yellow-600 dark:text-yellow-400", bg: "hover:bg-yellow-50 dark:hover:bg-yellow-900/20", border: "border-yellow-300 dark:border-yellow-700" },
  { quality: 4, label: "Easy",    color: "text-green-600 dark:text-green-400",   bg: "hover:bg-green-50 dark:hover:bg-green-900/20", border: "border-green-300 dark:border-green-700" },
  { quality: 5, label: "Perfect", color: "text-teal-600 dark:text-teal-400",     bg: "hover:bg-teal-50 dark:hover:bg-teal-900/20",  border: "border-teal-300 dark:border-teal-700" },
];

interface RichFlashcardProps {
  word: Word;
  onRate?: (quality: number) => void;
  index?: number;
  total?: number;
  onWordFamilyClick?: (wordName: string) => void;
}

const STATUS_PILL: Record<string, { bg: string; dot: string; label: string }> = {
  new:      { bg: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400", dot: "bg-emerald-500", label: "New" },
  learning: { bg: "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400",          dot: "bg-blue-500",    label: "Learning" },
  review:   { bg: "bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400",      dot: "bg-amber-500",   label: "Review" },
  mastered: { bg: "bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400",  dot: "bg-orange-500",  label: "Mastered" },
};

const TONE_PILL: Record<string, { bg: string; dot: string }> = {
  Neutral:  { bg: "bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400",      dot: "bg-amber-500" },
  Positive: { bg: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400", dot: "bg-emerald-500" },
  Negative: { bg: "bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-400",          dot: "bg-rose-500" },
  Formal:   { bg: "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400",  dot: "bg-indigo-500" },
  Informal: { bg: "bg-sky-50 dark:bg-sky-900/20 text-sky-700 dark:text-sky-400",              dot: "bg-sky-500" },
};

export default function RichFlashcard({
  word,
  onRate,
  index,
  total,
  onWordFamilyClick,
}: RichFlashcardProps) {
  const enr = getEnrichment(word.word) ?? {};
  const intervals = previewIntervals(word);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => { setRevealed(false); }, [word.id]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.code === "Space") { e.preventDefault(); setRevealed((r) => !r); }
      if (revealed && onRate) {
        if (e.key === "1") onRate(0);
        if (e.key === "2") onRate(2);
        if (e.key === "3") onRate(3);
        if (e.key === "4") onRate(4);
        if (e.key === "5") onRate(5);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [revealed, onRate]);

  const speak = (e: React.MouseEvent) => {
    e.stopPropagation();
    if ("speechSynthesis" in window) {
      const utter = new SpeechSynthesisUtterance(word.word);
      utter.lang = "en-US";
      window.speechSynthesis.speak(utter);
    }
  };

  const status = STATUS_PILL[word.status] ?? STATUS_PILL.new;
  const tone = enr.tone ? TONE_PILL[enr.tone] : null;

  const synonymTone = "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800";
  const antonymTone = "bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-800";

  return (
    <div className="w-full max-w-6xl mx-auto h-full flex flex-col">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-0">
        {/* LEFT CARD */}
        <div className="bg-card border border-card-border rounded-3xl shadow-lg p-6 flex flex-col overflow-y-auto min-h-0">
          <div className="flex items-start justify-between gap-3 mb-3">
            <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${status.bg}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
              {status.label}
            </span>
          </div>

          <div className="flex items-start gap-3 mb-1">
            <h2 className="text-5xl font-bold text-foreground tracking-tight leading-none">
              {word.word.charAt(0).toUpperCase() + word.word.slice(1)}
            </h2>
            <button
              onClick={speak}
              className="mt-2 p-1.5 rounded-full text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors"
              title="Pronounce"
            >
              <Volume2 size={20} />
            </button>
            <div className="flex-1" />
            <div className="flex flex-col items-end gap-2">
              <p className="text-xl text-foreground font-bold" dir="rtl">{word.arabic}</p>
              {tone && (
                <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${tone.bg}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${tone.dot}`} />
                  {enr.tone}
                </span>
              )}
            </div>
          </div>
          <p className="text-sm italic text-emerald-600 dark:text-emerald-400 mb-5">{word.pos}</p>

          {/* Definition */}
          <div className="mb-2">
            <p className="text-lg font-bold text-foreground leading-snug">{word.definition}</p>
            {enr.shortDef && (
              <p className="text-sm text-muted-foreground mt-1.5">{enr.shortDef}</p>
            )}
          </div>

          {/* Syn / Ant pills */}
          <div className="flex flex-wrap gap-2 mt-6 mb-7">
            {word.synonyms.slice(0, 3).map((s, i) => (
              <span key={`s-${i}`} className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border ${synonymTone}`}>
                <Equal size={12} />
                {s}
              </span>
            ))}
            {(enr.antonyms ?? []).slice(0, 1).map((a, i) => (
              <span key={`a-${i}`} className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border ml-3 ${antonymTone}`}>
                <ArrowRightLeft size={12} />
                {a}
              </span>
            ))}
          </div>

          {/* Examples */}
          <div className="space-y-2 mb-5">
            {word.examples.map((ex, i) => {
              const re = new RegExp(`\\b(${word.word}\\w*)\\b`, "gi");
              const parts = ex.split(re);
              return (
                <div key={i} className="flex gap-2.5 text-sm">
                  <span className="shrink-0 w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-[11px] font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <p className="text-foreground/85 leading-loose">
                    {parts.map((p, j) =>
                      re.test(p) ? (
                        <em key={j} className="text-emerald-600 dark:text-emerald-400 not-italic font-semibold">{p}</em>
                      ) : (
                        <span key={j}>{p}</span>
                      )
                    )}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Mnemonic */}
          {enr.mnemonic && (
            <div className="mt-auto rounded-2xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50/60 dark:bg-emerald-900/10 p-4">
              <div className="flex gap-3">
                <div className="shrink-0 w-9 h-9 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                  <Lightbulb size={18} className="text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400 mb-1">Mnemonic</p>
                  <p className="text-sm text-foreground/85 leading-snug">{enr.mnemonic}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT CARD */}
        <div className="bg-card border border-card-border rounded-3xl shadow-lg p-6 flex flex-col gap-4 overflow-y-auto min-h-0">
          {/* Hero illustration */}
          {enr.imageUrl ? (
            <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-sky-100 to-indigo-100 dark:from-sky-900/30 dark:to-indigo-900/30 aspect-[4/3]">
              <img src={enr.imageUrl} alt={word.word} className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="rounded-2xl aspect-[4/3] bg-muted" />
          )}

          {/* Word Family */}
          {enr.wordFamily && enr.wordFamily.length > 0 && (
            <div>
              <p className="flex items-center gap-1.5 text-sm font-bold text-emerald-700 dark:text-emerald-400 mb-2.5">
                <Users size={15} />
                Word Family
              </p>
              <div className="flex flex-wrap gap-2">
                {enr.wordFamily.map((wf, i) => (
                  <button
                    key={i}
                    onClick={(e) => { e.stopPropagation(); onWordFamilyClick?.(wf); }}
                    className={`text-xs font-medium px-3 py-1.5 rounded-full transition-colors ${
                      i === 0
                        ? "bg-emerald-500 text-white hover:bg-emerald-600"
                        : "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/40"
                    }`}
                  >
                    {wf}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Etymology */}
          {enr.etymology && enr.etymology.length > 0 && (
            <div>
              <p className="flex items-center gap-1.5 text-sm font-bold text-emerald-700 dark:text-emerald-400 mb-2.5">
                <BookOpen size={15} />
                Etymology
              </p>
              <div className="flex flex-wrap items-stretch gap-2">
                {enr.etymology.map((e, i) => (
                  <div key={i} className="flex items-center gap-2">
                    {i > 0 && <Plus size={14} className="text-muted-foreground shrink-0" />}
                    <div className="rounded-xl border border-border bg-muted/30 px-3 py-2 text-center min-w-[90px]">
                      <p className="text-sm font-bold text-foreground leading-tight">{e.part}</p>
                      <p className="text-[10px] italic text-muted-foreground mt-0.5">{e.language}</p>
                      <p className="text-[11px] text-foreground/80 mt-0.5 leading-tight">{e.meaning}</p>
                    </div>
                  </div>
                ))}
              </div>
              {enr.etymologyMeaning && (
                <div className="mt-3 rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50/60 dark:bg-emerald-900/10 px-4 py-2.5 text-center">
                  <p className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                    <Equal size={14} />
                    {enr.etymologyMeaning}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {/* Reveal / rate */}
      <div className="mt-2">
        {!revealed ? null : (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full max-w-3xl mx-auto"
            >
              <p className="text-xs text-center text-muted-foreground mb-2">
                Rate your recall (keys 1–5)
              </p>
              <div className="grid grid-cols-5 gap-2">
                {RATING_BUTTONS.map((btn, idx) => (
                  <button
                    key={btn.quality}
                    onClick={() => onRate?.(btn.quality)}
                    className={`flex flex-col items-center py-2.5 px-1 rounded-xl border-2 transition-all ${btn.color} ${btn.bg} ${btn.border}`}
                  >
                    <span className="font-semibold text-sm">{btn.label}</span>
                    <span className="text-[10px] opacity-70 mt-0.5">
                      {intervals[btn.quality] === 1 ? "1 day" : `${intervals[btn.quality]}d`}
                    </span>
                    <span className="text-[9px] opacity-50 mt-0.5">[{idx + 1}]</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
