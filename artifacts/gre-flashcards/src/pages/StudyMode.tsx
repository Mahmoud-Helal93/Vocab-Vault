import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/context/AppContext";
import Flashcard from "@/components/Flashcard";
import { shuffleArray } from "@/lib/srs";
import { TOTAL_DAYS, GROUPS_PER_DAY } from "@/data/words";
import { ChevronLeft, ChevronRight, Shuffle, ArrowLeft, Grid3X3 } from "lucide-react";

type View = "day-select" | "group-select" | "study";

interface StudyModeProps {
  onBack: () => void;
  initialDay?: number;
}

export default function StudyMode({ onBack, initialDay }: StudyModeProps) {
  const { words, markWordReviewed, settings } = useApp();
  const [view, setView] = useState<View>(initialDay ? "group-select" : "day-select");
  const [selectedDay, setSelectedDay] = useState<number>(initialDay ?? 1);
  const [selectedGroup, setSelectedGroup] = useState<number | null>(null);
  const [cardIndex, setCardIndex] = useState(0);
  const [isShuffled, setIsShuffled] = useState(false);
  const [focusMode, setFocusMode] = useState(false);

  const studyWords = useMemo(() => {
    let base =
      selectedGroup === null
        ? words.filter((w) => w.day === selectedDay)
        : words.filter((w) => w.day === selectedDay && w.group === selectedGroup);
    return isShuffled ? shuffleArray(base) : base;
  }, [words, selectedDay, selectedGroup, isShuffled]);

  const currentWord = studyWords[cardIndex];

  const handleNext = useCallback(() => {
    setCardIndex((i) => Math.min(i + 1, studyWords.length - 1));
  }, [studyWords.length]);

  const handlePrev = useCallback(() => {
    setCardIndex((i) => Math.max(i - 1, 0));
  }, []);

  const handleArrowKeys = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    },
    [handleNext, handlePrev]
  );

  const dayWords = useMemo(
    () => Array.from({ length: TOTAL_DAYS }, (_, i) => words.filter((w) => w.day === i + 1)),
    [words]
  );

  if (view === "day-select") {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <button onClick={onBack} className="p-2 rounded-xl hover:bg-muted transition-colors">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Study Mode</h1>
            <p className="text-muted-foreground text-sm">Select a day to begin</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: TOTAL_DAYS }, (_, i) => {
            const day = i + 1;
            const dw = dayWords[i];
            const mastered = dw.filter((w) => w.status === "mastered").length;
            const pct = Math.round((mastered / dw.length) * 100);
            return (
              <motion.button
                key={day}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => {
                  setSelectedDay(day);
                  setSelectedGroup(null);
                  setCardIndex(0);
                  setView("group-select");
                }}
                className="text-left p-5 bg-card border border-card-border rounded-2xl shadow-sm hover:border-primary/40 hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold text-foreground text-lg">Day {day}</span>
                  <span className="text-sm text-muted-foreground">{pct}%</span>
                </div>
                <div className="h-1.5 bg-muted rounded-full mb-3 overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <div className="text-xs text-muted-foreground">
                  {dw.length} words · {mastered} mastered
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    );
  }

  if (view === "group-select") {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <button onClick={() => setView("day-select")} className="p-2 rounded-xl hover:bg-muted transition-colors">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Day {selectedDay}</h1>
            <p className="text-muted-foreground text-sm">Select a group or study all</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* All words option */}
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => {
              setSelectedGroup(null);
              setCardIndex(0);
              setView("study");
            }}
            className="text-left p-5 bg-primary text-primary-foreground rounded-2xl shadow-sm hover:opacity-90 transition-opacity col-span-full"
          >
            <div className="flex items-center gap-3">
              <Grid3X3 size={22} />
              <div>
                <div className="font-semibold text-lg">All 30 Words</div>
                <div className="text-sm opacity-80">Study the entire day</div>
              </div>
            </div>
          </motion.button>

          {Array.from({ length: GROUPS_PER_DAY }, (_, i) => {
            const group = i + 1;
            const gw = words.filter((w) => w.day === selectedDay && w.group === group);
            const mastered = gw.filter((w) => w.status === "mastered").length;
            const pct = Math.round((mastered / gw.length) * 100);
            return (
              <motion.button
                key={group}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: group * 0.07 }}
                onClick={() => {
                  setSelectedGroup(group);
                  setCardIndex(0);
                  setView("study");
                }}
                className="text-left p-5 bg-card border border-card-border rounded-2xl shadow-sm hover:border-primary/40 transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold text-foreground">Group {group}</span>
                  <span className="text-sm text-muted-foreground">{pct}%</span>
                </div>
                <div className="h-1.5 bg-muted rounded-full mb-3 overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: `${pct}%` }} />
                </div>
                <div className="text-xs text-muted-foreground">{gw.length} words · {mastered} mastered</div>
              </motion.button>
            );
          })}
        </div>
      </div>
    );
  }

  if (!currentWord) return null;

  return (
    <div
      className={`flex flex-col ${focusMode ? "fixed inset-0 bg-background z-50 overflow-auto" : "max-w-4xl mx-auto px-4 py-8"}`}
      tabIndex={0}
      onKeyDown={handleArrowKeys}
      style={{ outline: "none" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => setView("group-select")}
          className="p-2 rounded-xl hover:bg-muted transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="text-center">
          <div className="font-semibold text-foreground">
            Day {selectedDay} · {selectedGroup ? `Group ${selectedGroup}` : "All Words"}
          </div>
          <div className="text-sm text-muted-foreground">
            {cardIndex + 1} / {studyWords.length}
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => {
              setIsShuffled((s) => !s);
              setCardIndex(0);
            }}
            className={`p-2 rounded-xl transition-colors ${
              isShuffled ? "bg-primary text-primary-foreground" : "hover:bg-muted text-muted-foreground"
            }`}
            title="Shuffle"
          >
            <Shuffle size={18} />
          </button>
          <button
            onClick={() => setFocusMode((f) => !f)}
            className={`p-2 rounded-xl text-xs font-medium transition-colors ${
              focusMode ? "bg-primary text-primary-foreground" : "hover:bg-muted text-muted-foreground"
            }`}
            title="Focus Mode"
          >
            Focus
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-muted rounded-full mb-6 overflow-hidden">
        <motion.div
          className="h-full bg-primary rounded-full"
          animate={{ width: `${((cardIndex + 1) / studyWords.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Flashcard */}
      <div className={`flex-1 ${focusMode ? "flex items-center justify-center px-8 py-4" : ""}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentWord.id}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.25 }}
            className="w-full"
          >
            <Flashcard
              word={currentWord}
              onRate={(quality) => {
                markWordReviewed(currentWord.id, quality);
                if (cardIndex < studyWords.length - 1) handleNext();
              }}
              showTimer={settings.timerEnabled}
              timerSeconds={settings.timerSeconds}
              onTimerEnd={handleNext}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Nav buttons */}
      <div className="flex items-center justify-between mt-6 max-w-2xl mx-auto w-full">
        <button
          onClick={handlePrev}
          disabled={cardIndex === 0}
          className="flex items-center gap-2 px-5 py-3 rounded-xl border border-card-border hover:bg-muted transition-colors disabled:opacity-30 disabled:cursor-not-allowed font-medium"
        >
          <ChevronLeft size={18} />
          Previous
        </button>

        <div className="flex gap-1">
          {studyWords.map((_, i) => (
            <button
              key={i}
              onClick={() => setCardIndex(i)}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === cardIndex ? "bg-primary" : "bg-muted"
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={cardIndex === studyWords.length - 1}
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed font-medium"
        >
          Next
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
