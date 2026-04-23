import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Word } from "@/data/words";
import { getEnrichment } from "@/data/enrichment";
import { Volume2, Users, BookOpen, Plus, Lightbulb } from "lucide-react";
import { previewIntervals } from "@/lib/srs";

interface PremiumFlashcardProps {
  word: Word;
  onRate?: (quality: number) => void;
  index?: number;
  total?: number;
  onWordFamilyClick?: (wordName: string) => void;
}

const FONT_STACK =
  'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

const TONE_PILL: Record<string, string> = {
  Neutral: "bg-amber-50 text-amber-700 border-amber-200",
  Positive: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Negative: "bg-rose-50 text-rose-700 border-rose-200",
  Formal: "bg-indigo-50 text-indigo-700 border-indigo-200",
  Informal: "bg-sky-50 text-sky-700 border-sky-200",
};

const RATING_BUTTONS = [
  { quality: 0, label: "Again", cls: "text-rose-600 border-rose-200 hover:bg-rose-50" },
  { quality: 2, label: "Hard", cls: "text-orange-600 border-orange-200 hover:bg-orange-50" },
  { quality: 3, label: "Good", cls: "text-amber-600 border-amber-200 hover:bg-amber-50" },
  { quality: 4, label: "Easy", cls: "text-emerald-600 border-emerald-200 hover:bg-emerald-50" },
  { quality: 5, label: "Perfect", cls: "text-teal-600 border-teal-200 hover:bg-teal-50" },
];

function StatusBadge() {
  return (
    <span
      className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100"
      style={{ fontFamily: FONT_STACK }}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
      New
    </span>
  );
}

function Pill({
  children,
  variant,
}: {
  children: React.ReactNode;
  variant: "synonym" | "antonym";
}) {
  const styles =
    variant === "synonym"
      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
      : "bg-rose-50 text-rose-700 border-rose-200";
  return (
    <span
      className={`inline-flex items-center gap-2 text-sm font-medium px-4 py-1.5 rounded-full border ${styles}`}
      style={{ fontFamily: FONT_STACK }}
    >
      {children}
    </span>
  );
}

function ExampleRow({
  index,
  text,
  word,
}: {
  index: number;
  text: string;
  word: string;
}) {
  const re = new RegExp(`\\b(${word}\\w*)\\b`, "gi");
  const parts = text.split(re);
  return (
    <div className="flex gap-3 items-start">
      <span className="shrink-0 w-6 h-6 rounded-full bg-blue-500 text-white text-xs font-semibold flex items-center justify-center mt-0.5">
        {index}
      </span>
      <p
        className="text-[15px] text-slate-700 leading-relaxed"
        style={{ fontFamily: FONT_STACK }}
      >
        {parts.map((p, j) =>
          re.test(p) ? (
            <span key={j} className="text-blue-600 font-semibold">
              {p}
            </span>
          ) : (
            <span key={j}>{p}</span>
          )
        )}
      </p>
    </div>
  );
}

function EtymologyCard({
  part,
  language,
  meaning,
}: {
  part: string;
  language: string;
  meaning: string;
}) {
  return (
    <div
      className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-center min-w-[110px] shadow-sm"
      style={{ fontFamily: FONT_STACK }}
    >
      <p className="text-sm font-bold text-slate-800 leading-tight">{part}</p>
      <p className="text-[11px] italic text-slate-500 mt-0.5">{language}</p>
      <p className="text-[12px] text-slate-700 mt-0.5 leading-tight">{meaning}</p>
    </div>
  );
}

export default function PremiumFlashcard({
  word,
  onRate,
  index,
  total,
  onWordFamilyClick,
}: PremiumFlashcardProps) {
  const enr = getEnrichment(word.word) ?? {};
  const intervals = previewIntervals(word);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    setRevealed(false);
  }, [word.id]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.code === "Space") {
        e.preventDefault();
        setRevealed((r) => !r);
      }
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

  const tone = enr.tone ? TONE_PILL[enr.tone] : null;

  return (
    <div
      className="w-full max-w-6xl mx-auto flex flex-col gap-5"
      style={{ fontFamily: FONT_STACK }}
    >
      {/* Top progress */}
      {typeof index === "number" && typeof total === "number" && (
        <div className="text-center">
          <p className="text-sm text-slate-500 font-medium mb-2">
            {index + 1} / {total}
          </p>
          <div className="mx-auto max-w-md h-1.5 rounded-full bg-slate-200 overflow-hidden">
            <motion.div
              className="h-full bg-blue-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((index + 1) / total) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LEFT CARD */}
        <div className="bg-white border border-slate-100 rounded-3xl shadow-[0_2px_20px_-8px_rgba(15,23,42,0.08)] p-8 flex flex-col">
          <div className="mb-4">
            <StatusBadge />
          </div>

          <div className="flex items-start gap-3">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <h2 className="text-5xl font-bold text-slate-900 tracking-tight leading-none">
                {word.word.charAt(0).toUpperCase() + word.word.slice(1)}
              </h2>
              <button
                onClick={speak}
                className="mt-2 w-9 h-9 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-600 flex items-center justify-center transition-colors shadow-sm"
                title="Pronounce"
                aria-label="Pronounce"
              >
                <Volume2 size={16} />
              </button>
            </div>
            <div className="flex flex-col items-end gap-2 shrink-0">
              <p className="text-2xl font-medium text-slate-800" dir="rtl">
                {word.arabic}
              </p>
              {tone && (
                <span
                  className={`inline-flex items-center text-xs font-medium px-3 py-1 rounded-full border ${tone}`}
                >
                  {enr.tone}
                </span>
              )}
            </div>
          </div>

          <p className="text-sm font-light text-emerald-600 italic mt-1 mb-6">
            {word.pos}
          </p>

          {/* Definition */}
          <div className="mb-5">
            <p className="text-lg font-bold text-slate-900 leading-snug">
              {word.definition}
            </p>
            {enr.shortDef && (
              <p className="text-sm text-slate-500 mt-2 font-light">
                {enr.shortDef}
              </p>
            )}
          </div>

          {/* Synonyms + antonym pills (no labels) */}
          <div className="flex flex-wrap gap-2 mb-7">
            {word.synonyms.slice(0, 3).map((s, i) => (
              <Pill key={`s-${i}`} variant="synonym">
                <span className="text-base leading-none">≡</span>
                {s}
              </Pill>
            ))}
            {(enr.antonyms ?? []).slice(0, 1).map((a, i) => (
              <Pill key={`a-${i}`} variant="antonym">
                <span className="text-base leading-none">≠</span>
                {a}
              </Pill>
            ))}
          </div>

          {/* Examples - prominent */}
          <div className="space-y-3.5 mb-6">
            {word.examples.map((ex, i) => (
              <ExampleRow key={i} index={i + 1} text={ex} word={word.word} />
            ))}
          </div>

          {/* Mnemonic */}
          {enr.mnemonic && (
            <div className="mt-auto rounded-2xl bg-emerald-50/70 border border-emerald-100 p-4">
              <div className="flex gap-3 items-start">
                <div className="shrink-0 w-9 h-9 rounded-full bg-white border border-emerald-100 flex items-center justify-center">
                  <Lightbulb size={16} className="text-emerald-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-emerald-700 mb-1">
                    Mnemonic
                  </p>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {enr.mnemonic}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT CARD */}
        <div className="bg-white border border-slate-100 rounded-3xl shadow-[0_2px_20px_-8px_rgba(15,23,42,0.08)] p-8 flex flex-col gap-6">
          {/* Hero illustration */}
          {enr.imageUrl ? (
            <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-sky-50 to-indigo-50 aspect-[4/3]">
              <img
                src={enr.imageUrl}
                alt={word.word}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="rounded-2xl aspect-[4/3] bg-slate-100" />
          )}

          {/* Word Family */}
          {enr.wordFamily && enr.wordFamily.length > 0 && (
            <div>
              <p className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
                <Users size={15} className="text-emerald-600" />
                Word Family
              </p>
              <div className="flex flex-wrap gap-2">
                {enr.wordFamily.map((wf, i) => (
                  <button
                    key={i}
                    onClick={(e) => {
                      e.stopPropagation();
                      onWordFamilyClick?.(wf);
                    }}
                    className={`text-sm font-medium px-4 py-1.5 rounded-full border transition-colors ${
                      i === 0
                        ? "bg-emerald-500 text-white border-emerald-500 hover:bg-emerald-600"
                        : "bg-emerald-50 text-emerald-700 border-emerald-100 hover:bg-emerald-100"
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
              <p className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
                <BookOpen size={15} className="text-emerald-600" />
                Etymology
              </p>
              <div className="flex flex-wrap items-center gap-2">
                {enr.etymology.map((e, i) => (
                  <div key={i} className="flex items-center gap-2">
                    {i > 0 && (
                      <Plus size={14} className="text-slate-400 shrink-0" />
                    )}
                    <EtymologyCard
                      part={e.part}
                      language={e.language}
                      meaning={e.meaning}
                    />
                  </div>
                ))}
              </div>
              {enr.etymologyMeaning && (
                <div className="mt-3 rounded-full bg-emerald-50 border border-emerald-100 px-4 py-2 text-center">
                  <p className="inline-flex items-center gap-2 text-sm font-medium text-emerald-700">
                    <span className="text-base leading-none">=</span>
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
        {revealed && (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full max-w-3xl mx-auto"
            >
              <p className="text-xs text-center text-slate-500 mb-2">
                Rate your recall (keys 1–5)
              </p>
              <div className="grid grid-cols-5 gap-2">
                {RATING_BUTTONS.map((btn, idx) => (
                  <button
                    key={btn.quality}
                    onClick={() => onRate?.(btn.quality)}
                    className={`flex flex-col items-center py-2.5 px-1 rounded-xl border-2 bg-white transition-all ${btn.cls}`}
                  >
                    <span className="font-semibold text-sm">{btn.label}</span>
                    <span className="text-[10px] opacity-70 mt-0.5">
                      {intervals[btn.quality] === 1
                        ? "1 day"
                        : `${intervals[btn.quality]}d`}
                    </span>
                    <span className="text-[9px] opacity-50 mt-0.5">
                      [{idx + 1}]
                    </span>
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
