import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Word } from "@/data/words";
import { Volume2, RotateCcw } from "lucide-react";
import { previewIntervals } from "@/lib/srs";
import WordScene, { hasWordScene } from "@/components/WordScenes";

interface RatingButton {
  quality: number;
  label: string;
  color: string;
  bg: string;
  border: string;
}

const RATING_BUTTONS: RatingButton[] = [
  { quality: 0, label: "Again",   color: "text-red-600 dark:text-red-400",    bg: "hover:bg-red-50 dark:hover:bg-red-900/20",    border: "border-red-300 dark:border-red-700" },
  { quality: 2, label: "Hard",    color: "text-orange-600 dark:text-orange-400", bg: "hover:bg-orange-50 dark:hover:bg-orange-900/20", border: "border-orange-300 dark:border-orange-700" },
  { quality: 3, label: "Good",    color: "text-yellow-600 dark:text-yellow-400", bg: "hover:bg-yellow-50 dark:hover:bg-yellow-900/20", border: "border-yellow-300 dark:border-yellow-700" },
  { quality: 4, label: "Easy",    color: "text-green-600 dark:text-green-400",  bg: "hover:bg-green-50 dark:hover:bg-green-900/20",   border: "border-green-300 dark:border-green-700" },
  { quality: 5, label: "Perfect", color: "text-teal-600 dark:text-teal-400",   bg: "hover:bg-teal-50 dark:hover:bg-teal-900/20",    border: "border-teal-300 dark:border-teal-700" },
];

interface FlashcardProps {
  word: Word;
  onRate?: (quality: number) => void;
  showTimer?: boolean;
  timerSeconds?: number;
  onTimerEnd?: () => void;
  onWordFamilyClick?: (wordName: string) => void;
}

export default function Flashcard({
  word,
  onRate,
  showTimer = false,
  timerSeconds = 30,
  onTimerEnd,
  onWordFamilyClick,
}: FlashcardProps) {
  const [flipped, setFlipped] = useState(false);
  const [timeLeft, setTimeLeft] = useState(timerSeconds);
  const intervals = previewIntervals(word);

  useEffect(() => {
    setFlipped(false);
    setTimeLeft(timerSeconds);
  }, [word.id, timerSeconds]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.code === "Space") {
        e.preventDefault();
        setFlipped((f) => !f);
      }
      if (flipped && onRate) {
        if (e.key === "1") onRate(0);
        if (e.key === "2") onRate(2);
        if (e.key === "3") onRate(3);
        if (e.key === "4") onRate(4);
        if (e.key === "5") onRate(5);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [flipped, onRate]);

  useEffect(() => {
    if (!showTimer) return;
    if (timeLeft <= 0) { onTimerEnd?.(); return; }
    const id = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(id);
  }, [timeLeft, showTimer, onTimerEnd]);

  const speak = (e: React.MouseEvent) => {
    e.stopPropagation();
    if ("speechSynthesis" in window) {
      const utter = new SpeechSynthesisUtterance(word.word);
      utter.lang = "en-US";
      window.speechSynthesis.speak(utter);
    }
  };

  const timerPct = (timeLeft / timerSeconds) * 100;

  const statusColors: Record<string, string> = {
    new: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
    learning: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
    review: "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
    mastered: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
  };

  return (
    <div className="w-full flex flex-col items-center gap-4">
      {showTimer && (
        <div className="w-full max-w-2xl">
          <div className="flex justify-between text-sm mb-1 text-muted-foreground">
            <span>Time</span>
            <span className={timeLeft <= 5 ? "text-red-500 font-bold" : ""}>{timeLeft}s</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              className={`h-full rounded-full ${timeLeft <= 5 ? "bg-red-500" : "bg-primary"}`}
              style={{ width: `${timerPct}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      )}

      {/* Card */}
      <div
        className="w-full max-w-2xl cursor-pointer select-none"
        style={{ perspective: "1200px" }}
        onClick={() => setFlipped((f) => !f)}
      >
        <motion.div
          style={{ transformStyle: "preserve-3d", position: "relative" }}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
          className="w-full"
        >
          {/* FRONT */}
          <div
            style={{ backfaceVisibility: "hidden", minHeight: "550px" }}
            className="w-full bg-card border border-card-border rounded-2xl shadow-lg p-8 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between mb-5">
                <div>
                  <span className={`inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-3 ${statusColors[word.status] ?? statusColors.new}`}>
                    {word.status}
                  </span>
                  <h2 className="text-5xl font-bold text-foreground tracking-tight">{word.word}</h2>
                </div>
                <button
                  onClick={speak}
                  className="mt-1 p-2 rounded-xl text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                  title="Pronounce"
                >
                  <Volume2 size={22} />
                </button>
              </div>

              <div className="flex items-center gap-3 mb-2">
                <span className="text-base font-medium text-muted-foreground italic">{word.pos}</span>
                <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                <span className="text-xl font-semibold" dir="rtl">{word.arabic}</span>
              </div>

              {word.root && (
                <p className="text-xs italic text-muted-foreground mt-1">
                  from {word.root}
                </p>
              )}
            </div>

            <div className="flex items-center justify-center flex-1 py-4">
              {hasWordScene(word.word) ? (
                <div className="w-full flex flex-col items-center gap-3">
                  <WordScene word={word.word} />
                  <p className="text-xs text-muted-foreground/60 flex items-center gap-1.5">
                    <RotateCcw size={12} /> Click to reveal definition
                  </p>
                </div>
              ) : (
                <div className="text-center">
                  <RotateCcw size={28} className="text-muted-foreground/40 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground/60">Click to reveal definition</p>
                  <p className="text-xs text-muted-foreground/40 mt-1">or press Space</p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex gap-3">
                {word.correctCount + word.incorrectCount > 0 && (
                  <>
                    <span>✓ {word.correctCount}</span>
                    <span>✗ {word.incorrectCount}</span>
                  </>
                )}
              </div>
              {word.difficulty >= 3 && (
                <span className="text-xs bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 px-2 py-0.5 rounded-full font-medium">
                  Difficult
                </span>
              )}
            </div>
          </div>

          {/* BACK */}
          <div
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              minHeight: "550px",
            }}
            className="bg-card border border-card-border rounded-2xl shadow-lg p-8 flex flex-col"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-foreground">{word.word}</h3>
              <span className="text-sm italic text-muted-foreground">{word.pos}</span>
            </div>

            <div className="bg-primary/5 border border-primary/10 rounded-xl p-4 mb-4">
              <p className="text-base font-medium text-foreground leading-relaxed">{word.definition}</p>
            </div>

            <div className="mb-4 flex-1">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Examples</p>
              <div className="space-y-2">
                {word.examples.map((ex, i) => (
                  <div key={i} className="flex gap-2 text-sm text-foreground/80">
                    <span className="text-primary/60 font-bold mt-0.5 shrink-0">{i + 1}.</span>
                    <span className="leading-relaxed italic">"{ex}"</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Synonyms</p>
              <div className="flex flex-wrap gap-2">
                {word.synonyms.map((syn, i) => (
                  <span key={i} className="text-sm px-3 py-1 bg-secondary text-secondary-foreground rounded-full font-medium">
                    {syn}
                  </span>
                ))}
              </div>
            </div>

            {word.wordFamily && word.wordFamily.length > 0 && (
              <div className="mb-1">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Word Family</p>
                <div className="flex flex-wrap gap-2">
                  {word.wordFamily.map((wf, i) => (
                    <button
                      key={i}
                      onClick={(e) => { e.stopPropagation(); onWordFamilyClick?.(wf); }}
                      className="text-sm px-3 py-1 bg-accent text-accent-foreground rounded-full font-medium hover:opacity-80 transition-opacity cursor-pointer"
                    >
                      {wf}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* 5-point rating — only shown after flip */}
      <AnimatePresence>
        {flipped && onRate && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="w-full max-w-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-xs text-center text-muted-foreground mb-2">
              Rate your recall (keys 1–5)
            </p>
            <div className="grid grid-cols-5 gap-2">
              {RATING_BUTTONS.map((btn, idx) => (
                <button
                  key={btn.quality}
                  onClick={() => onRate(btn.quality)}
                  className={`flex flex-col items-center py-2.5 px-1 rounded-xl border-2 transition-all ${btn.color} ${btn.bg} ${btn.border}`}
                >
                  <span className="font-semibold text-sm">{btn.label}</span>
                  <span className="text-[10px] opacity-70 mt-0.5">
                    {intervals[btn.quality] === 1
                      ? "1 day"
                      : `${intervals[btn.quality]}d`}
                  </span>
                  <span className="text-[9px] opacity-50 mt-0.5">[{idx + 1}]</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
