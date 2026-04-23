import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/context/AppContext";
import Flashcard from "@/components/Flashcard";
import RichFlashcard from "@/components/RichFlashcard";
import { getEnrichment } from "@/data/enrichment";
import { shuffleArray } from "@/lib/srs";
import { TOTAL_DAYS, GROUPS_PER_DAY } from "@/data/words";
import { ChevronLeft, ChevronRight, Shuffle, ArrowLeft, Grid3X3, Flame } from "lucide-react";

type View = "day-select" | "group-select" | "study";

interface StudyModeProps {
  onBack: () => void;
  initialDay?: number;
  initialWordId?: string;
}

export default function StudyMode({ onBack, initialDay, initialWordId }: StudyModeProps) {
  const { words, markWordReviewed, settings, streak } = useApp();
  const initialWord = initialWordId ? words.find((w) => w.id === initialWordId) : undefined;
  const [view, setView] = useState<View>(initialWord || initialDay ? (initialWord ? "study" : "group-select") : "day-select");
  const [selectedDay, setSelectedDay] = useState<number>(initialWord?.day ?? initialDay ?? 1);
  const [selectedGroup, setSelectedGroup] = useState<number | null>(initialWord?.group ?? null);
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

  // Jump to specific word card on mount when initialWordId is provided
  const [didJump, setDidJump] = useState(false);
  if (!didJump && initialWordId && studyWords.length > 0) {
    const idx = studyWords.findIndex((w) => w.id === initialWordId);
    if (idx >= 0) setCardIndex(idx);
    setDidJump(true);
  }

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
      className={`relative flex flex-col ${focusMode ? "fixed inset-0 bg-background z-50 overflow-auto" : "h-[calc(100vh-3.5rem)] lg:h-screen px-16 pt-6 pb-4 overflow-hidden"}`}
      tabIndex={0}
      onKeyDown={handleArrowKeys}
      style={{ outline: "none" }}
    >
      {/* Top progress bar (modern) */}
      <div className="shrink-0 mb-4 flex items-center gap-3">
        <span className="text-xs font-semibold text-muted-foreground tabular-nums tracking-wider">
          {String(cardIndex + 1).padStart(2, "0")}
          <span className="text-muted-foreground/50"> / {String(studyWords.length).padStart(2, "0")}</span>
        </span>
        <div className="relative flex-1 h-1.5 rounded-full bg-muted/70 overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
            animate={{ width: `${((cardIndex + 1) / studyWords.length) * 100}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
        <span className="text-xs font-semibold text-emerald-600 tabular-nums w-9 text-right">
          {Math.round(((cardIndex + 1) / studyWords.length) * 100)}%
        </span>
        <div
          className="flex items-center gap-1 px-2 py-1 rounded-full bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800"
          title={`${streak.currentStreak}-day streak`}
        >
          <Flame size={12} className="text-orange-500" />
          <span className="text-xs font-semibold text-orange-600 dark:text-orange-400 tabular-nums">
            {streak.currentStreak}
          </span>
        </div>
      </div>
      {/* Header */}
      <div className="flex items-center justify-between mb-3 shrink-0">
        <button
          onClick={() => setView("group-select")}
          className="p-2 rounded-xl hover:bg-muted transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="text-center">
          <div className="text-foreground text-[25px] font-bold bg-[#f3fef9]">
            Day {selectedDay} · {selectedGroup ? `Group ${selectedGroup}` : "All Words"}
          </div>
        </div>
      </div>
      {/* Flashcard */}
      <div className={`flex-1 min-h-0 ${focusMode ? "flex items-center justify-center px-8 py-4" : "flex"}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentWord.id}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.25 }}
            className="w-full h-full"
          >
            {getEnrichment(currentWord.word) ? (
              <RichFlashcard
                word={currentWord}
                index={cardIndex}
                total={studyWords.length}
                onRate={(quality) => {
                  markWordReviewed(currentWord.id, quality);
                  if (cardIndex < studyWords.length - 1) handleNext();
                }}
              />
            ) : (
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
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      {/* Nav buttons - symmetric side arrows within study area */}
      <button
        onClick={handlePrev}
        disabled={cardIndex === 0}
        aria-label="Previous"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center rounded-full bg-card border border-card-border shadow-md opacity-60 hover:opacity-100 hover:scale-110 hover:shadow-xl transition-all duration-200 disabled:opacity-20 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-md"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={handleNext}
        disabled={cardIndex === studyWords.length - 1}
        aria-label="Next"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center rounded-full bg-card border border-card-border shadow-md opacity-60 hover:opacity-100 hover:scale-110 hover:shadow-xl transition-all duration-200 disabled:opacity-20 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-md"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}
