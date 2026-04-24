import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/context/AppContext";
import Flashcard from "@/components/Flashcard";
import { getDueWords } from "@/lib/srs";
import { ArrowLeft, CheckCircle2, Clock } from "lucide-react";
import ProgressSidebar from "@/components/ProgressSidebar";

interface ReviewModeProps {
  onBack: () => void;
}

export default function ReviewMode({ onBack }: ReviewModeProps) {
  const { words, markWordReviewed, settings } = useApp();
  const dueWords = useMemo(() => getDueWords(words), [words]);
  const [index, setIndex] = useState(0);
  const [done, setDone] = useState(false);
  const [reviewed, setReviewed] = useState(0);

  const currentWord = dueWords[index];

  const handleRate = (quality: number) => {
    if (!currentWord) return;
    markWordReviewed(currentWord.id, quality);
    setReviewed((r) => r + 1);
    if (index + 1 >= dueWords.length) {
      setDone(true);
    } else {
      setIndex((i) => i + 1);
    }
  };

  if (dueWords.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-64">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <CheckCircle2 size={56} className="text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">All caught up!</h2>
          <p className="text-muted-foreground mb-6">No words due for review. Come back later!</p>
          <button onClick={onBack} className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90">
            Back to Home
          </button>
        </motion.div>
      </div>
    );
  }

  if (done) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-64">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <CheckCircle2 size={56} className="text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">Review Complete!</h2>
          <p className="text-muted-foreground mb-6">Reviewed {reviewed} words today.</p>
          <button onClick={onBack} className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90">
            Back to Home
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex gap-5 px-4 py-8 min-h-[calc(100vh-3.5rem)] lg:min-h-screen">
      <div className="flex-1 min-w-0 max-w-4xl mx-auto w-full">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="p-2 rounded-xl hover:bg-muted transition-colors">
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Clock size={22} className="text-amber-500" />
            Daily Review
          </h1>
          <p className="text-muted-foreground text-sm">
            {index + 1} / {dueWords.length} — review due words
          </p>
        </div>
      </div>

      <div className="h-1.5 bg-muted rounded-full mb-6 overflow-hidden">
        <motion.div
          className="h-full bg-amber-400 rounded-full"
          animate={{ width: `${((index + 1) / dueWords.length) * 100}%` }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentWord.id}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.2 }}
        >
          <Flashcard
            word={currentWord}
            onRate={handleRate}
            showTimer={settings.timerEnabled}
            timerSeconds={settings.timerSeconds}
            onTimerEnd={() => handleRate(2)}
          />
        </motion.div>
      </AnimatePresence>
      </div>
      <ProgressSidebar className="hidden lg:block" />
    </div>
  );
}
