import { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { getDueWords, shuffleArray, previewIntervals } from "@/lib/srs";
import { saveMicroSessionTime } from "@/lib/storage";
import { X, Zap, CheckCircle2, RotateCcw, Volume2 } from "lucide-react";

interface QuickTenProps {
  onClose: () => void;
}

type Phase = "intro" | "study" | "done";

const RATING_BUTTONS = [
  { quality: 0, label: "Again",   color: "bg-red-500 hover:bg-red-600" },
  { quality: 2, label: "Hard",    color: "bg-orange-500 hover:bg-orange-600" },
  { quality: 3, label: "Good",    color: "bg-yellow-500 hover:bg-yellow-600" },
  { quality: 4, label: "Easy",    color: "bg-green-500 hover:bg-green-600" },
  { quality: 5, label: "Perfect", color: "bg-teal-500 hover:bg-teal-600" },
];

export default function QuickTen({ onClose }: QuickTenProps) {
  const { words, markWordReviewed } = useApp();
  const [phase, setPhase] = useState<Phase>("intro");
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [score, setScore] = useState(0);
  const startTime = useRef(Date.now());

  const pool = useMemo(() => {
    const due = getDueWords(words);
    return shuffleArray(due).slice(0, 10);
  }, [words]);

  const currentWord = pool[index];
  const total = pool.length;
  const elapsed = Math.round((Date.now() - startTime.current) / 1000);
  const intervals = currentWord ? previewIntervals(currentWord) : {};

  useEffect(() => {
    setFlipped(false);
  }, [index]);

  const handleRate = (quality: number) => {
    if (!currentWord) return;
    markWordReviewed(currentWord.id, quality);
    if (quality >= 3) setScore((s) => s + 1);
    if (index + 1 >= total) {
      saveMicroSessionTime(Date.now());
      setPhase("done");
    } else {
      setIndex((i) => i + 1);
    }
  };

  const speak = () => {
    if (!currentWord || !("speechSynthesis" in window)) return;
    const utter = new SpeechSynthesisUtterance(currentWord.word);
    utter.lang = "en-US";
    window.speechSynthesis.speak(utter);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 30 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-card border border-card-border rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Zap size={18} className="text-amber-500" />
            <span className="font-bold text-foreground">Quick 10</span>
            <span className="text-xs bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 px-2 py-0.5 rounded-full">micro-session</span>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-muted transition-colors">
            <X size={16} />
          </button>
        </div>

        <AnimatePresence mode="wait">
          {/* INTRO */}
          {phase === "intro" && (
            <motion.div key="intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="p-6 text-center">
              <Zap size={40} className="text-amber-500 mx-auto mb-3" />
              <h2 className="text-xl font-bold text-foreground mb-2">Quick 10 Micro-Session</h2>
              <p className="text-muted-foreground text-sm mb-2">
                Flash through {total} due word{total !== 1 ? "s" : ""} in ~2 minutes. Rate each with 1–5 for spaced repetition.
              </p>
              {total === 0 && (
                <div className="mt-4 p-3 rounded-xl bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-sm flex items-center gap-2">
                  <CheckCircle2 size={16} />
                  No words due right now — come back later!
                </div>
              )}
              <button
                onClick={() => { startTime.current = Date.now(); setPhase("study"); }}
                disabled={total === 0}
                className="mt-5 w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold transition-colors disabled:opacity-40"
              >
                Start
              </button>
            </motion.div>
          )}

          {/* STUDY */}
          {phase === "study" && currentWord && (
            <motion.div key={`q-${index}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              className="p-6">
              {/* Progress */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-muted-foreground">{index + 1} / {total}</span>
                <span className="text-xs text-muted-foreground">{score} correct</span>
              </div>
              <div className="h-1.5 bg-muted rounded-full mb-5 overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full transition-all" style={{ width: `${((index) / total) * 100}%` }} />
              </div>

              {/* Card face */}
              <div
                className="bg-background border border-border rounded-xl p-5 mb-5 cursor-pointer min-h-[160px] flex flex-col justify-between"
                onClick={() => setFlipped((f) => !f)}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-2xl font-bold text-foreground">{currentWord.word}</div>
                    <div className="text-sm text-muted-foreground italic">{currentWord.pos} · {currentWord.arabic}</div>
                    {currentWord.root && (
                      <div className="text-xs italic text-muted-foreground/70 mt-1">from {currentWord.root}</div>
                    )}
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); speak(); }} className="p-1.5 rounded-lg hover:bg-muted transition-colors">
                    <Volume2 size={14} className="text-muted-foreground" />
                  </button>
                </div>

                <AnimatePresence>
                  {flipped && (
                    <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="mt-3 border-t border-border pt-3">
                      <p className="text-sm text-foreground leading-relaxed">{currentWord.definition}</p>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {currentWord.synonyms.map((syn) => (
                          <span key={syn} className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">{syn}</span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {!flipped && (
                  <p className="text-xs text-muted-foreground/60 mt-3">Tap to reveal</p>
                )}
              </div>

              {/* Rating (only after flip) */}
              {flipped ? (
                <div className="grid grid-cols-5 gap-1.5">
                  {RATING_BUTTONS.map((btn) => (
                    <button
                      key={btn.quality}
                      onClick={() => handleRate(btn.quality)}
                      className={`flex flex-col items-center py-2 rounded-xl ${btn.color} text-white transition-all`}
                    >
                      <span className="text-xs font-semibold">{btn.label}</span>
                      <span className="text-[10px] opacity-80 mt-0.5">
                        {(intervals[btn.quality] ?? 1) === 1 ? "1d" : `${intervals[btn.quality]}d`}
                      </span>
                    </button>
                  ))}
                </div>
              ) : (
                <button
                  onClick={() => setFlipped(true)}
                  className="w-full py-3 rounded-xl border-2 border-primary text-primary font-semibold hover:bg-primary/5 transition-colors"
                >
                  Show Answer
                </button>
              )}
            </motion.div>
          )}

          {/* DONE */}
          {phase === "done" && (
            <motion.div key="done" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 text-center">
              <CheckCircle2 size={44} className="text-green-500 mx-auto mb-3" />
              <div className="text-3xl font-bold text-foreground mb-1">{Math.round((score / total) * 100)}%</div>
              <div className="text-lg font-semibold text-primary mb-1">Session Complete!</div>
              <div className="text-muted-foreground text-sm mb-2">{score} of {total} correct</div>
              <div className="text-xs text-muted-foreground mb-5">~{Math.max(elapsed, 1)}s elapsed</div>
              <div className="flex gap-3">
                <button
                  onClick={() => { setIndex(0); setScore(0); setFlipped(false); startTime.current = Date.now(); setPhase("study"); }}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-card-border text-foreground font-medium hover:bg-muted transition-colors"
                >
                  <RotateCcw size={16} /> Redo
                </button>
                <button onClick={onClose} className="flex-1 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90">
                  Done
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
