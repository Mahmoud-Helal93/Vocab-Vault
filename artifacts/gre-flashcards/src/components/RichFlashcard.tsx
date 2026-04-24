import { useEffect } from "react";
import { Word } from "@/data/words";
import { getEnrichment } from "@/data/enrichment";
import {
  Volume2, Users, BookOpen, Equal, Plus,
  ArrowRightLeft, Lightbulb, ChevronLeft, ChevronRight,
} from "lucide-react";

interface RichFlashcardProps {
  word: Word;
  onRate?: (quality: number) => void;
  onPrev?: () => void;
  onNext?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
  onWordFamilyClick?: (wordName: string) => void;
}

const STATUS_PILL: Record<string, { dot: string; label: string }> = {
  new:      { dot: "bg-violet-500",  label: "New" },
  learning: { dot: "bg-blue-500",    label: "Learning" },
  review:   { dot: "bg-amber-500",   label: "Review" },
  mastered: { dot: "bg-emerald-500", label: "Mastered" },
};

const TONE_PILL: Record<string, { bg: string; dot: string }> = {
  Neutral:  { bg: "bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400",       dot: "bg-amber-500" },
  Positive: { bg: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400", dot: "bg-emerald-500" },
  Negative: { bg: "bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-400",            dot: "bg-rose-500" },
  Formal:   { bg: "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400",    dot: "bg-indigo-500" },
  Informal: { bg: "bg-sky-50 dark:bg-sky-900/20 text-sky-700 dark:text-sky-400",                dot: "bg-sky-500" },
};

export default function RichFlashcard({
  word,
  onRate,
  onPrev,
  onNext,
  hasPrev = true,
  hasNext = true,
  onWordFamilyClick,
}: RichFlashcardProps) {
  const enr = getEnrichment(word.word) ?? {};

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "ArrowLeft" && hasPrev) onPrev?.();
      if (e.key === "ArrowRight" && hasNext) {
        onRate?.(3);
        onNext?.();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onPrev, onNext, onRate, hasPrev, hasNext]);

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

  const synonymCls = "bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-800";
  const antonymCls = "bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-800";

  const handleNext = () => {
    onRate?.(3);
    onNext?.();
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="bg-card border border-card-border rounded-3xl shadow-sm p-7 lg:p-9">
        {/* Status pill (full width) */}
        <div className="flex items-center gap-1.5 text-xs font-semibold text-violet-600 dark:text-violet-400 mb-4">
          <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
          {status.label}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-x-10 gap-y-8">
          {/* LEFT COLUMN */}
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-3 mb-1 flex-wrap">
              <h2 className="text-5xl font-bold text-foreground tracking-tight leading-none">
                {word.word.charAt(0).toUpperCase() + word.word.slice(1)}
              </h2>
              <button
                onClick={speak}
                className="p-1.5 rounded-full text-violet-500 hover:bg-violet-50 dark:hover:bg-violet-900/20 transition-colors"
                title="Pronounce"
              >
                <Volume2 size={20} />
              </button>
            </div>
            <p className="text-sm italic text-violet-600 dark:text-violet-400 mb-5">{word.pos}</p>

            <p className="text-lg font-bold text-foreground leading-snug mb-1.5">{word.definition}</p>
            {enr.shortDef && (
              <p className="text-sm text-muted-foreground mb-4">{enr.shortDef}</p>
            )}

            {/* Syn / Ant pills */}
            <div className="flex flex-wrap gap-2 mb-6">
              {word.synonyms.slice(0, 3).map((s, i) => (
                <span key={`s-${i}`} className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border ${synonymCls}`}>
                  <Equal size={12} />
                  {s}
                </span>
              ))}
              {(enr.antonyms ?? []).slice(0, 1).map((a, i) => (
                <span key={`a-${i}`} className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border ${antonymCls}`}>
                  <ArrowRightLeft size={12} />
                  {a}
                </span>
              ))}
            </div>

            {/* Examples */}
            <div className="space-y-2.5 mb-6">
              {word.examples.map((ex, i) => {
                const re = new RegExp(`\\b(${word.word}\\w*)\\b`, "gi");
                const parts = ex.split(re);
                return (
                  <div key={i} className="flex gap-2.5 text-sm">
                    <span className="shrink-0 w-5 h-5 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-400 text-[11px] font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                    <p className="text-foreground/85 leading-relaxed">
                      {parts.map((p, j) =>
                        re.test(p) ? (
                          <em key={j} className="text-violet-600 dark:text-violet-400 not-italic font-semibold">{p}</em>
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
              <div className="rounded-2xl bg-violet-50 dark:bg-violet-900/15 p-4">
                <div className="flex gap-3">
                  <div className="shrink-0 w-9 h-9 rounded-full bg-white dark:bg-violet-900/30 flex items-center justify-center">
                    <Lightbulb size={18} className="text-violet-500 dark:text-violet-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-violet-700 dark:text-violet-300 mb-1">Mnemonic</p>
                    <p className="text-sm text-foreground/85 leading-snug">{enr.mnemonic}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN — divider + Arabic, tone, Word Family, Etymology */}
          <div className="flex flex-col min-w-0 lg:border-l lg:border-border lg:pl-10">
            {/* Arabic + tone */}
            <div className="flex flex-col items-end gap-3 mb-6">
              <p
                className="text-4xl font-medium text-foreground leading-none"
                dir="rtl"
              >
                {word.arabic}
              </p>
              {tone && (
                <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full ${tone.bg}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${tone.dot}`} />
                  {enr.tone}
                </span>
              )}
            </div>

            {/* Word Family */}
            {enr.wordFamily && enr.wordFamily.length > 0 && (
              <div className="mb-6">
                <p className="flex items-center gap-1.5 text-sm font-bold text-violet-700 dark:text-violet-400 mb-2.5">
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
                          ? "bg-violet-500 text-white hover:bg-violet-600"
                          : "border border-violet-200 dark:border-violet-800 text-violet-700 dark:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-900/20"
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
                <p className="flex items-center gap-1.5 text-sm font-bold text-violet-700 dark:text-violet-400 mb-2.5">
                  <BookOpen size={15} />
                  Etymology
                </p>
                <div className="flex items-stretch gap-2 flex-wrap">
                  {enr.etymology.map((e, i) => (
                    <div key={i} className="flex items-center gap-2">
                      {i > 0 && <Plus size={14} className="text-muted-foreground shrink-0" />}
                      <div className="rounded-xl border border-border bg-card px-3 py-2 text-center min-w-[100px]">
                        <p className="text-sm font-bold text-foreground leading-tight">{e.part}</p>
                        <p className="text-[10px] italic text-muted-foreground mt-0.5">{e.language}</p>
                        <p className="text-[11px] text-foreground/80 mt-0.5 leading-tight">{e.meaning}</p>
                      </div>
                    </div>
                  ))}
                </div>
                {enr.etymologyMeaning && (
                  <div className="mt-3 rounded-xl border border-violet-200 dark:border-violet-800 bg-violet-50/60 dark:bg-violet-900/10 px-4 py-2.5 text-center">
                    <p className="inline-flex items-center gap-2 text-sm font-semibold text-violet-700 dark:text-violet-300">
                      <Equal size={14} />
                      {enr.etymologyMeaning}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Prev / Next */}
        <div className="flex items-center justify-between mt-8 pt-5 border-t border-border">
          <button
            onClick={onPrev}
            disabled={!hasPrev}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-border hover:bg-muted transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-sm font-medium"
          >
            <ChevronLeft size={16} />
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={!hasNext}
            className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-violet-500 hover:bg-violet-600 text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-sm font-semibold shadow-sm"
          >
            Next
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
