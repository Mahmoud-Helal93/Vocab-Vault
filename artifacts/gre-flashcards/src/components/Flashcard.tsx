import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Word } from "@/data/words";
import { Volume2, CheckCircle, XCircle, RotateCcw } from "lucide-react";

interface FlashcardProps {
  word: Word;
  onMarkKnown?: () => void;
  onMarkDifficult?: () => void;
  showTimer?: boolean;
  timerSeconds?: number;
  onTimerEnd?: () => void;
  initialFlipped?: boolean;
}

export default function Flashcard({
  word,
  onMarkKnown,
  onMarkDifficult,
  showTimer = false,
  timerSeconds = 30,
  onTimerEnd,
  initialFlipped = false,
}: FlashcardProps) {
  const [flipped, setFlipped] = useState(initialFlipped);
  const [timeLeft, setTimeLeft] = useState(timerSeconds);

  useEffect(() => {
    setFlipped(false);
    setTimeLeft(timerSeconds);
  }, [word.id, timerSeconds]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        setFlipped((f) => !f);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    if (!showTimer) return;
    if (timeLeft <= 0) {
      onTimerEnd?.();
      return;
    }
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

  return (
    <div className="w-full flex flex-col items-center gap-4">
      {showTimer && (
        <div className="w-full max-w-2xl">
          <div className="flex justify-between text-sm mb-1 text-muted-foreground">
            <span>Time left</span>
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
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="w-full"
        >
          {/* Front */}
          <div
            style={{ backfaceVisibility: "hidden" }}
            className="w-full bg-card border border-card-border rounded-2xl shadow-lg p-8 flex flex-col justify-between"
          >
            <div style={{ minHeight: "550px" }} className="flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary/70 bg-primary/10 px-3 py-1 rounded-full mb-3">
                      {word.status === "mastered" ? "Mastered" : word.status === "learning" ? "Learning" : "New"}
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

                <div className="flex items-center gap-3 mb-6">
                  <span className="text-base font-medium text-muted-foreground italic">{word.pos}</span>
                  <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                  <span className="text-lg font-semibold" style={{ fontFamily: "system-ui" }}>
                    {word.arabic}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-center flex-1 pb-4">
                <div className="text-center">
                  <RotateCcw size={28} className="text-muted-foreground/40 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground/60">Click to reveal definition</p>
                  <p className="text-xs text-muted-foreground/40 mt-1">or press Space</p>
                </div>
              </div>

              <div className="flex gap-3 mt-4">
                {word.correctCount + word.incorrectCount > 0 && (
                  <div className="flex gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <CheckCircle size={12} className="text-green-500" />
                      {word.correctCount} correct
                    </span>
                    <span className="flex items-center gap-1">
                      <XCircle size={12} className="text-red-500" />
                      {word.incorrectCount} incorrect
                    </span>
                  </div>
                )}
                <div className="ml-auto">
                  {word.difficulty >= 3 && (
                    <span className="text-xs bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 px-2 py-0.5 rounded-full font-medium">
                      Difficult
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Back */}
          <div
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)", position: "absolute", top: 0, left: 0, width: "100%" }}
            className="bg-card border border-card-border rounded-2xl shadow-lg p-8 flex flex-col"
          >
            <div style={{ minHeight: "550px" }} className="flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-foreground">{word.word}</h3>
                <span className="text-sm italic text-muted-foreground">{word.pos}</span>
              </div>

              <div className="bg-primary/5 border border-primary/10 rounded-xl p-4 mb-5">
                <p className="text-base font-medium text-foreground leading-relaxed">{word.definition}</p>
              </div>

              <div className="mb-5 flex-1">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                  Examples
                </p>
                <div className="space-y-2">
                  {word.examples.map((ex, i) => (
                    <div key={i} className="flex gap-2 text-sm text-foreground/80">
                      <span className="text-primary/60 font-bold mt-0.5">{i + 1}.</span>
                      <span className="leading-relaxed italic">"{ex}"</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                  Synonyms
                </p>
                <div className="flex flex-wrap gap-2">
                  {word.synonyms.map((syn, i) => (
                    <span
                      key={i}
                      className="text-sm px-3 py-1 bg-secondary text-secondary-foreground rounded-full font-medium"
                    >
                      {syn}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Action buttons */}
      {(onMarkKnown || onMarkDifficult) && (
        <div className="flex gap-3 w-full max-w-2xl">
          {onMarkDifficult && (
            <button
              onClick={onMarkDifficult}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/20 font-medium transition-colors"
            >
              <XCircle size={16} />
              Mark Difficult
            </button>
          )}
          {onMarkKnown && (
            <button
              onClick={onMarkKnown}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-green-200 text-green-600 hover:bg-green-50 dark:border-green-800 dark:text-green-400 dark:hover:bg-green-900/20 font-medium transition-colors"
            >
              <CheckCircle size={16} />
              Mark Known
            </button>
          )}
        </div>
      )}
    </div>
  );
}
