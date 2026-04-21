import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { detectConfusables } from "@/lib/srs";
import { loadConfusables, saveConfusables, mergeConfusables } from "@/lib/storage";
import { ArrowLeft, GitFork, CheckCircle2, XCircle } from "lucide-react";

interface ConfusablesProps {
  onBack: () => void;
}

export default function Confusables({ onBack }: ConfusablesProps) {
  const { words } = useApp();
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const [quizFeedback, setQuizFeedback] = useState<Record<string, boolean>>({});

  const confusablePairs = useMemo(() => {
    // Detect new ones from current data
    const detected = detectConfusables(words);
    const existing = loadConfusables();
    const merged = mergeConfusables(existing, detected);
    if (detected.length > 0) saveConfusables(merged);
    return merged;
  }, [words]);

  const getWord = (name: string) => words.find((w) => w.word === name);

  const handleQuiz = (pairKey: string, selectedWord: string, correctWord: string) => {
    if (quizAnswers[pairKey]) return;
    const isCorrect = selectedWord === correctWord;
    setQuizAnswers((prev) => ({ ...prev, [pairKey]: selectedWord }));
    setQuizFeedback((prev) => ({ ...prev, [pairKey]: isCorrect }));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <button onClick={onBack} className="p-2 rounded-xl hover:bg-muted transition-colors">
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <GitFork size={22} className="text-primary" />
            Confusable Words
          </h1>
          <p className="text-muted-foreground text-sm">
            Words you often mix up — practice telling them apart
          </p>
        </div>
      </div>

      {confusablePairs.length === 0 ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-20 text-center"
        >
          <CheckCircle2 size={48} className="text-green-500 mb-4" />
          <h2 className="text-xl font-semibold text-foreground mb-2">No confusables detected yet</h2>
          <p className="text-muted-foreground text-sm max-w-sm">
            After you practice more, words you frequently mix up will appear here for side-by-side comparison.
          </p>
        </motion.div>
      ) : (
        <div className="space-y-6">
          {confusablePairs.map((pair, i) => {
            const w1 = getWord(pair.word1);
            const w2 = getWord(pair.word2);
            if (!w1 || !w2) return null;
            const pairKey = `${pair.word1}|${pair.word2}`;
            const userAnswer = quizAnswers[pairKey];
            const isCorrect = quizFeedback[pairKey];

            // Randomly pick which word to quiz on
            const quizWord = i % 2 === 0 ? w1 : w2;

            return (
              <motion.div
                key={pairKey}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className="bg-card border border-card-border rounded-2xl overflow-hidden shadow-sm"
              >
                {/* Split comparison card */}
                <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-border">
                  {[w1, w2].map((w, side) => (
                    <div key={w.id} className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="text-2xl font-bold text-foreground">{w.word}</div>
                          <div className="text-xs font-medium text-primary/70 italic mt-0.5">{w.pos}</div>
                        </div>
                        {w.root && (
                          <span className="text-[10px] italic text-muted-foreground text-right max-w-24">{w.root}</span>
                        )}
                      </div>
                      <p className="text-sm text-foreground/80 leading-relaxed mb-3">{w.definition}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {w.synonyms.slice(0, 2).map((syn) => (
                          <span key={syn} className="text-xs px-2 py-0.5 bg-secondary text-secondary-foreground rounded-full">{syn}</span>
                        ))}
                      </div>
                      {/* Highlight key difference: Arabic label */}
                      <div className="mt-3 text-sm font-semibold text-accent-foreground bg-accent rounded-lg px-3 py-1.5" dir="rtl">
                        {w.arabic}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quiz */}
                <div className="border-t border-border p-4 bg-muted/20">
                  <p className="text-sm font-semibold text-foreground mb-3">
                    Quiz: Which word means "{quizWord.definition.slice(0, 70)}..."?
                  </p>
                  <div className="flex gap-3">
                    {[w1, w2].map((w) => {
                      let cls = "flex-1 py-2.5 rounded-xl border-2 font-semibold text-sm transition-all ";
                      if (userAnswer) {
                        if (w.word === quizWord.word && isCorrect && userAnswer === w.word) {
                          cls += "border-green-400 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400";
                        } else if (w.word === quizWord.word) {
                          cls += "border-green-400 text-green-700 dark:text-green-400";
                        } else if (userAnswer === w.word) {
                          cls += "border-red-400 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400";
                        } else {
                          cls += "border-card-border text-muted-foreground opacity-50";
                        }
                      } else {
                        cls += "border-card-border bg-card hover:border-primary/40 text-foreground";
                      }
                      return (
                        <button key={w.id} onClick={() => handleQuiz(pairKey, w.word, quizWord.word)} disabled={!!userAnswer} className={cls}>
                          {w.word}
                        </button>
                      );
                    })}
                  </div>
                  {userAnswer && (
                    <div className={`mt-2 flex items-center gap-2 text-sm ${isCorrect ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
                      {isCorrect ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
                      {isCorrect ? "Correct!" : `Correct answer: ${quizWord.word}`}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
