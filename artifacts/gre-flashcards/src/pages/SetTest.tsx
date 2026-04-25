import { useState, useMemo, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { type Word } from "@/data/words";
import { shuffleArray } from "@/lib/srs";
import { themeClass } from "@/lib/missionThemes";
import {
  ArrowLeft, CheckCircle2, XCircle, ChevronLeft, ChevronRight,
  RotateCcw, Trophy, Target, BookOpenText, Pencil, Clock,
  BookOpen, Flame, Star, Flag, TrendingUp, HelpCircle,
  Lightbulb, Zap, RefreshCw, BarChart3, Bookmark, Filter,
  ChevronDown, ExternalLink,
} from "lucide-react";

type Difficulty = "easy" | "medium" | "hard";

function formatDuration(totalSec: number): string {
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

interface SetTestProps {
  onBack: () => void;
  missionDay: number;
  group: number;
}

interface MCQQuestion {
  type: "mcq";
  id: number;
  word: Word;
  choices: string[];
  correct: string;
}

interface FITBQuestion {
  type: "fitb";
  id: number;
  word: Word;
  sentence: string;
  hintSynonyms: string[];
}

type Question = MCQQuestion | FITBQuestion;
type AnswerMap = Record<number, string | null>;

function pickN<T>(arr: T[], n: number): T[] {
  return shuffleArray(arr).slice(0, n);
}

function blankWord(sentence: string, word: string): string {
  const base = word.toLowerCase();
  const re = new RegExp(`\\b${base}\\w*\\b`, "gi");
  if (re.test(sentence)) return sentence.replace(re, "_____");
  const prefix = base.slice(0, Math.min(4, base.length));
  const pre = new RegExp(`\\b${prefix}\\w*\\b`, "gi");
  if (pre.test(sentence)) return sentence.replace(pre, "_____");
  return `${sentence} (_____)`;
}

function buildQuestions(setWords: Word[]): Question[] {
  const shuffled = shuffleArray(setWords);
  const half = Math.max(1, Math.floor(shuffled.length / 2));
  const mcqWords = shuffled.slice(0, half);
  const fitbWords = shuffled.slice(half, half * 2);

  // MCQ — show the WORD, pick the DEFINITION (reverse of MissionTest)
  const mcq: MCQQuestion[] = mcqWords.map((w, i) => {
    const distractors = pickN(setWords.filter((x) => x.id !== w.id), 3).map((x) => x.definition);
    const choices = shuffleArray([w.definition, ...distractors]);
    return { type: "mcq", id: i, word: w, choices, correct: w.definition };
  });

  // FITB — use the SECOND example sentence (MissionTest uses the first)
  const fitb: FITBQuestion[] = fitbWords.map((w, i) => {
    const sentence = blankWord(w.examples[1] ?? w.examples[0], w.word);
    return {
      type: "fitb",
      id: i + half,
      word: w,
      sentence,
      hintSynonyms: w.synonyms.slice(0, 2),
    };
  });

  return shuffleArray([...mcq, ...fitb]);
}

function getSection(q: Question): string {
  return q.type === "mcq" ? "Multiple Choice" : "Fill in the Blank";
}

function SectionIcon({ q, size = 14 }: { q: Question; size?: number }) {
  return q.type === "mcq"
    ? <BookOpenText size={size} />
    : <Pencil size={size} />;
}

function SetTestInner({ onBack, missionDay, group }: SetTestProps) {
  const { words, streak, gamification, isBookmarked, toggleBookmark, globalThemeId: themeId } = useApp();

  const setWords = useMemo(
    () => words.filter((w) => w.day === missionDay && w.group === group),
    [words, missionDay, group]
  );

  const [seed, setSeed] = useState(0);
  const questions = useMemo(
    () => buildQuestions(setWords),
    // rebuild when seed bumps
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setWords, seed]
  );

  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [fitbInput, setFitbInput] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [reviewIdx, setReviewIdx] = useState(0);
  const [timerEnabled, setTimerEnabled] = useState(false);
  const [elapsedSec, setElapsedSec] = useState(0);
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [reviewFilter, setReviewFilter] = useState<"all" | "incorrect">("all");
  const [showAllReview, setShowAllReview] = useState(false);

  useEffect(() => {
    if (!timerEnabled || submitted) return;
    const id = window.setInterval(() => setElapsedSec((s) => s + 1), 1000);
    return () => window.clearInterval(id);
  }, [timerEnabled, submitted]);

  const q = questions[currentIdx];
  const totalAnswered = Object.values(answers).filter((a) => a !== null && a !== "").length;
  const allAnswered = totalAnswered === questions.length;
  const progress = questions.length > 0 ? ((currentIdx + 1) / questions.length) * 100 : 0;

  const recordAnswer = useCallback((id: number, ans: string) => {
    setAnswers((prev) => ({ ...prev, [id]: ans }));
  }, []);

  function isCorrect(qq: Question): boolean {
    const ans = answers[qq.id];
    if (ans === undefined || ans === null) return false;
    if (qq.type === "mcq") return ans === qq.correct;
    if (qq.type === "fitb") {
      return typeof ans === "string" && ans.trim().toLowerCase() === qq.word.word.toLowerCase();
    }
    return false;
  }

  const score = submitted ? questions.filter(isCorrect).length : 0;
  const scoreByType = submitted
    ? {
        mcq: questions.filter((qq) => qq.type === "mcq" && isCorrect(qq)).length,
        fitb: questions.filter((qq) => qq.type === "fitb" && isCorrect(qq)).length,
      }
    : null;
  const totalByType = {
    mcq: questions.filter((qq) => qq.type === "mcq").length,
    fitb: questions.filter((qq) => qq.type === "fitb").length,
  };

  const pct = submitted && questions.length > 0
    ? Math.round((score / questions.length) * 100)
    : 0;
  const grade =
    pct >= 90 ? { label: "Excellent!", color: "text-green-600", bg: "bg-green-50", border: "border-green-200", emoji: "🏆" } :
    pct >= 75 ? { label: "Great work!", color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200", emoji: "🎉" } :
    pct >= 60 ? { label: "Keep practicing", color: "text-yellow-600", bg: "bg-yellow-50", border: "border-yellow-200", emoji: "💪" } :
    { label: "Needs more work", color: "text-red-600", bg: "bg-red-50", border: "border-red-200", emoji: "📚" };

  const handleReset = useCallback(() => {
    setCurrentIdx(0);
    setAnswers({});
    setFitbInput({});
    setSubmitted(false);
    setReviewIdx(0);
    setSeed((s) => s + 1);
    setElapsedSec(0);
  }, []);

  if (setWords.length === 0) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        No words found for this set.
      </div>
    );
  }

  if (submitted) {
    const incorrectQuestions = questions.filter((qq) => !isCorrect(qq));
    const correctCount = score;
    const incorrectCount = incorrectQuestions.length;
    const skippedCount = questions.filter((qq) => {
      const a = answers[qq.id];
      return a === undefined || a === null || a === "";
    }).length;
    const xpEarned = correctCount * 20;
    const struggledWords = Array.from(
      new Map(incorrectQuestions.map((qq) => [qq.word.id, qq.word])).values()
    ).slice(0, 6);
    const visibleQuestions = reviewFilter === "all" ? questions : incorrectQuestions;
    const previewQuestions = showAllReview ? visibleQuestions : visibleQuestions.slice(0, 3);

    const heroEmoji = pct >= 90 ? "🏆" : pct >= 75 ? "🎉" : pct >= 60 ? "🙂" : "😬";
    const heroTitle = pct >= 90 ? "Excellent work!" : pct >= 75 ? "Great job!" : pct >= 60 ? "Good effort!" : "Keep practicing!";
    const heroSubtitle = pct >= 90
      ? "You aced it. Crush the next set!"
      : pct >= 60
      ? "Keep reviewing your mistakes and you'll ace it next time!"
      : "Don't give up — review these words and try again.";

    function scrollToReview() {
      document.getElementById("review-answers-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
      setReviewFilter("incorrect");
    }

    return (
      <div className={`min-h-screen bg-gradient-to-br from-violet-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col ${themeClass(themeId)}`}>
        {/* ===== Sticky header ===== */}
        <div className="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
            <button
              onClick={onBack}
              aria-label="Back"
              className="p-2 rounded-xl hover:bg-muted transition-colors text-muted-foreground shrink-0"
            >
              <ArrowLeft size={18} />
            </button>
            <nav aria-label="Breadcrumb" className="flex-1 min-w-0">
              <ol className="flex items-center gap-1 text-sm text-muted-foreground truncate">
                <li className="truncate">Mission {missionDay}</li>
                <li className="text-muted-foreground/50">›</li>
                <li className="truncate">Set {group}</li>
                <li className="text-muted-foreground/50">›</li>
                <li className="truncate text-violet-600 dark:text-violet-400 font-semibold">Results</li>
              </ol>
            </nav>
            <button
              onClick={scrollToReview}
              disabled={incorrectCount === 0}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-card border border-border text-sm font-semibold text-foreground hover:bg-muted transition-colors disabled:opacity-40"
            >
              <BookOpen size={14} /> Review Mistakes
            </button>
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl bg-violet-500 hover:bg-violet-600 text-white text-sm font-semibold transition-colors shadow-sm shadow-violet-500/30"
            >
              <RotateCcw size={14} /> Retake Test
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 space-y-5">
          {/* ===== Hero card ===== */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-[20px] border border-violet-200/70 dark:border-violet-800/50 bg-gradient-to-br from-pink-50 via-violet-50 to-violet-100 dark:from-violet-950/40 dark:via-violet-900/20 dark:to-violet-950/40 p-6 sm:p-8 grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-6 items-center overflow-hidden relative"
          >
            <Donut value={pct} size={140} stroke={12} label={`${correctCount} / ${questions.length}`} sublabel="Correct" />
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-3xl">{heroEmoji}</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-violet-700 dark:text-violet-300">
                  {heroTitle}
                </h2>
              </div>
              <p className="text-sm text-foreground font-medium mb-1">
                You got <span className="font-bold">{correctCount}</span> out of <span className="font-bold">{questions.length}</span> correct.
              </p>
              <p className="text-sm text-muted-foreground mb-4">{heroSubtitle}</p>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 dark:bg-gray-900/40 border border-violet-200 dark:border-violet-800 text-xs font-bold text-foreground">
                  <Star size={12} className="text-amber-400 fill-amber-400" />
                  +{xpEarned} XP earned
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 dark:bg-gray-900/40 border border-orange-200 dark:border-orange-800 text-xs font-bold text-foreground">
                  <Flame size={12} className="text-orange-500" />
                  {streak.currentStreak} day streak
                </span>
              </div>
            </div>
            {/* Decorative mountain illustration */}
            <div className="hidden md:block relative w-44 h-32 shrink-0" aria-hidden="true">
              <svg viewBox="0 0 200 140" fill="none" className="w-full h-full">
                <circle cx="40" cy="35" r="8" fill="currentColor" className="text-violet-200 dark:text-violet-800" />
                <circle cx="55" cy="32" r="6" fill="currentColor" className="text-violet-200 dark:text-violet-800" />
                <path d="M0 130 L60 50 L100 90 L130 60 L180 110 L200 130 Z" fill="currentColor" className="text-violet-300 dark:text-violet-700" />
                <path d="M40 130 L100 40 L140 80 L180 50 L200 90 L200 130 Z" fill="currentColor" className="text-violet-400 dark:text-violet-600" />
                <path d="M85 75 L100 40 L115 75 Z" fill="currentColor" className="text-white dark:text-violet-300" opacity="0.9" />
                <line x1="160" y1="50" x2="160" y2="20" stroke="currentColor" className="text-violet-600 dark:text-violet-400" strokeWidth="1.5" />
                <path d="M160 20 L172 24 L160 28 Z" fill="currentColor" className="text-violet-500 dark:text-violet-400" />
              </svg>
            </div>
          </motion.div>

          {/* ===== Performance Breakdown + Score Summary ===== */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-5">
            <div className="rounded-[20px] border border-border bg-card shadow-sm p-5">
              <h3 className="text-sm font-bold text-foreground mb-4">Performance Breakdown</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {scoreByType && [
                  { label: "Multiple Choice", key: "mcq" as const, Icon: BookOpenText },
                  { label: "Fill in the Blank", key: "fitb" as const, Icon: Pencil },
                ].map(({ label, key, Icon }) => {
                  const val = scoreByType[key];
                  const total = totalByType[key];
                  const p = total > 0 ? Math.round((val / total) * 100) : 0;
                  const status = p >= 80 ? { text: "Great", cls: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" }
                    : p >= 60 ? { text: "Almost there", cls: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" }
                    : { text: "Needs work", cls: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" };
                  return (
                    <div key={key} className="rounded-xl border border-border bg-background p-4 relative">
                      <span className={`absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${status.cls}`}>
                        {status.text}
                      </span>
                      <div className="flex items-start gap-3 mb-2">
                        <div className="w-10 h-10 rounded-xl bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center text-violet-600 dark:text-violet-400 shrink-0">
                          <Icon size={18} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-muted-foreground">{label}</p>
                          <p className="text-2xl font-extrabold text-foreground tabular-nums">
                            {val} <span className="text-sm font-bold text-muted-foreground">/ {total}</span>
                          </p>
                          <p className="text-xs text-muted-foreground">{p}% Accuracy</p>
                        </div>
                      </div>
                      <div className="mt-3 h-1.5 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full rounded-full ${p >= 80 ? "bg-green-500" : p >= 60 ? "bg-violet-500" : "bg-red-500"}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${p}%` }}
                          transition={{ duration: 0.6, delay: 0.1 }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="rounded-[20px] border border-border bg-card shadow-sm p-5">
              <h3 className="text-sm font-bold text-foreground mb-3">Score Summary</h3>
              <dl className="space-y-2.5 text-sm">
                <div className="flex items-center justify-between">
                  <dt className="text-green-600 dark:text-green-400 font-semibold">Correct Answers</dt>
                  <dd className="font-extrabold text-foreground tabular-nums">{correctCount}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-red-600 dark:text-red-400 font-semibold">Incorrect Answers</dt>
                  <dd className="font-extrabold text-foreground tabular-nums">{incorrectCount}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground font-medium">Skipped</dt>
                  <dd className="font-extrabold text-foreground tabular-nums">{skippedCount}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground font-medium">Total Questions</dt>
                  <dd className="font-extrabold text-foreground tabular-nums">{questions.length}</dd>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <dt className="text-violet-600 dark:text-violet-400 font-bold">Overall Accuracy</dt>
                  <dd className="font-extrabold text-violet-600 dark:text-violet-400 tabular-nums">{pct}%</dd>
                </div>
              </dl>
            </div>
          </div>

          {/* ===== Insights + Struggled Words ===== */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="rounded-[20px] border border-border bg-card shadow-sm p-5">
              <h3 className="text-sm font-bold text-foreground inline-flex items-center gap-2 mb-4">
                <TrendingUp size={15} className="text-violet-600 dark:text-violet-400" />
                Your Performance Insights
              </h3>
              <ul className="space-y-3 text-sm">
                {(() => {
                  const mcqP = totalByType.mcq > 0 ? (scoreByType?.mcq ?? 0) / totalByType.mcq : 1;
                  const fitbP = totalByType.fitb > 0 ? (scoreByType?.fitb ?? 0) / totalByType.fitb : 1;
                  const weakerType = fitbP < mcqP ? "Fill in the Blank" : "Multiple Choice";
                  return (
                    <>
                      <li className="flex items-start gap-3">
                        <Target size={16} className="text-red-500 mt-0.5 shrink-0" />
                        <div>
                          <p className="font-semibold text-foreground">You struggled most with {weakerType}.</p>
                          <p className="text-xs text-muted-foreground">Focus on vocabulary context and word forms.</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <Lightbulb size={16} className="text-amber-500 mt-0.5 shrink-0" />
                        <div>
                          <p className="font-semibold text-foreground">You missed questions on similar meanings.</p>
                          <p className="text-xs text-muted-foreground">Review synonyms and nuances.</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <BookOpen size={16} className="text-violet-500 mt-0.5 shrink-0" />
                        <div>
                          <p className="font-semibold text-foreground">
                            Recommended:{" "}
                            <button
                              onClick={handleReset}
                              className="text-violet-600 dark:text-violet-400 underline hover:no-underline"
                            >
                              Review Set {group} – Mission {missionDay}
                            </button>
                          </p>
                          <p className="text-xs text-muted-foreground">These words appeared in your mistakes.</p>
                        </div>
                      </li>
                    </>
                  );
                })()}
              </ul>
            </div>

            <div className="rounded-[20px] border border-border bg-card shadow-sm p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-foreground inline-flex items-center gap-2">
                  <BookOpen size={15} className="text-violet-600 dark:text-violet-400" />
                  Words You Struggled With
                </h3>
                {struggledWords.length > 0 && (
                  <button
                    onClick={scrollToReview}
                    className="text-xs font-semibold text-violet-600 dark:text-violet-400 hover:underline"
                  >
                    View all
                  </button>
                )}
              </div>
              {struggledWords.length === 0 ? (
                <p className="text-sm text-muted-foreground py-4 text-center">
                  Perfect run — no struggled words! 🎉
                </p>
              ) : (
                <>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {struggledWords.map((w) => (
                      <span
                        key={w.id}
                        className="px-3 py-1 rounded-full bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 text-xs font-semibold border border-red-200 dark:border-red-800"
                      >
                        {w.word}
                      </span>
                    ))}
                  </div>
                  <div className="rounded-xl bg-pink-50 dark:bg-pink-900/10 border border-pink-200 dark:border-pink-800 px-3 py-2.5 inline-flex items-center gap-2 text-xs text-foreground">
                    <Star size={12} className="text-violet-500 fill-violet-500" />
                    <span><span className="font-bold">Tip:</span> Review these words to improve your next score!</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* ===== Review Your Answers ===== */}
          <div id="review-answers-section" className="rounded-[20px] border border-border bg-card shadow-sm">
            <div className="px-5 py-4 border-b border-border flex items-center justify-between gap-3">
              <h3 className="text-sm font-bold text-foreground">Review Your Answers</h3>
              <div className="flex items-center gap-1 bg-muted rounded-full p-1">
                <button
                  onClick={() => { setReviewFilter("all"); setShowAllReview(false); }}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                    reviewFilter === "all"
                      ? "bg-violet-500 text-white shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  All Questions
                </button>
                <button
                  onClick={() => { setReviewFilter("incorrect"); setShowAllReview(false); }}
                  disabled={incorrectCount === 0}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors disabled:opacity-40 ${
                    reviewFilter === "incorrect"
                      ? "bg-violet-500 text-white shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Incorrect Only
                </button>
              </div>
            </div>

            {visibleQuestions.length === 0 ? (
              <p className="text-sm text-muted-foreground p-8 text-center">No questions to review.</p>
            ) : (
              <ul className="divide-y divide-border">
                {previewQuestions.map((qq) => {
                  const ok = isCorrect(qq);
                  const idx = questions.indexOf(qq);
                  const userAns = answers[qq.id];
                  const userAnsText = userAns === undefined || userAns === null || userAns === ""
                    ? "—" : String(userAns);
                  const correctText = qq.type === "mcq" ? qq.correct : qq.word.word;
                  const why = qq.type === "fitb"
                    ? `"${qq.word.word}" means ${qq.word.definition.toLowerCase()}.`
                    : `"${qq.word.word}" means "${qq.word.definition}".`;
                  const bookmarked = isBookmarked(qq.word.id);
                  const promptText = qq.type === "mcq"
                    ? `Which definition matches "${qq.word.word}"?`
                    : qq.sentence;

                  return (
                    <li key={qq.id} className="p-4 sm:p-5">
                      <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_minmax(0,180px)_minmax(0,1.2fr)_auto] gap-3 md:gap-4 items-start">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                          ok ? "bg-green-500" : "bg-red-500"
                        }`}>
                          {ok
                            ? <CheckCircle2 size={16} className="text-white" />
                            : <XCircle size={16} className="text-white" />}
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-bold text-muted-foreground tabular-nums">{idx + 1}</span>
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 text-[10px] font-semibold">
                              <SectionIcon q={qq} size={10} /> {getSection(qq)}
                            </span>
                          </div>
                          <p className="text-sm text-foreground leading-snug line-clamp-3">
                            {promptText}
                          </p>
                        </div>

                        <div className="text-xs space-y-1">
                          <div>
                            <p className={`font-semibold ${ok ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
                              Your answer
                            </p>
                            <p className="text-foreground font-medium break-words">{userAnsText}</p>
                          </div>
                          {!ok && (
                            <div>
                              <p className="font-semibold text-green-600 dark:text-green-400">Correct answer</p>
                              <p className="text-foreground font-medium break-words">{correctText}</p>
                            </div>
                          )}
                        </div>

                        <div className="rounded-xl bg-muted/60 dark:bg-muted/30 px-3 py-2.5 text-xs">
                          <p className="font-bold text-foreground mb-0.5">Why?</p>
                          <p className="text-muted-foreground leading-snug">{why}</p>
                        </div>

                        <div className="flex md:flex-col items-center md:items-end gap-2 shrink-0">
                          <button
                            onClick={() => toggleBookmark({ wordId: qq.word.id, word: qq.word.word, source: "set-test", missionDay, group })}
                            aria-label={bookmarked ? "Remove bookmark" : "Bookmark this question"}
                            aria-pressed={bookmarked}
                            className={`p-1.5 rounded-lg border transition-colors ${
                              bookmarked
                                ? "border-violet-300 bg-violet-50 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400"
                                : "border-border text-muted-foreground hover:text-foreground hover:bg-muted"
                            }`}
                          >
                            <Bookmark size={14} className={bookmarked ? "fill-current" : ""} />
                          </button>
                          <button
                            type="button"
                            className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-[10px] font-bold whitespace-nowrap"
                            title="Practice this word (coming soon)"
                          >
                            Practice this word <ExternalLink size={10} />
                          </button>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}

            {visibleQuestions.length > 3 && (
              <div className="px-5 py-3 border-t border-border flex justify-center">
                <button
                  onClick={() => setShowAllReview((s) => !s)}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-muted hover:bg-muted/70 text-foreground text-xs font-semibold transition-colors"
                >
                  {showAllReview ? "Show less" : `View all ${visibleQuestions.length} questions`}
                  <ChevronDown size={12} className={`transition-transform ${showAllReview ? "rotate-180" : ""}`} />
                </button>
              </div>
            )}

            {/* Question Navigation row */}
            <div className="px-5 py-4 border-t border-border flex flex-col sm:flex-row sm:items-center gap-3">
              <span className="text-sm font-semibold text-foreground shrink-0">Question Navigation</span>
              <div className="flex-1 flex flex-wrap items-center gap-1.5">
                {questions.map((qq, i) => {
                  const a = answers[qq.id];
                  const isSkipped = a === undefined || a === null || a === "";
                  const ok = isCorrect(qq);
                  return (
                    <button
                      key={qq.id}
                      onClick={() => {
                        setReviewFilter("all");
                        setShowAllReview(true);
                        document.getElementById("review-answers-section")?.scrollIntoView({ behavior: "smooth" });
                      }}
                      title={`Question ${i + 1} · ${isSkipped ? "Skipped" : ok ? "Correct" : "Incorrect"}`}
                      className={`min-w-[34px] h-8 px-2 rounded-full text-xs font-bold transition-colors border-2 inline-flex items-center justify-center tabular-nums ${
                        isSkipped
                          ? "border-border bg-transparent text-muted-foreground"
                          : ok
                          ? "border-green-400 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400"
                          : "border-red-400 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400"
                      }`}
                    >
                      {i + 1}
                    </button>
                  );
                })}
              </div>
              <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground shrink-0">
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-500" /> Correct
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500" /> Incorrect
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full border border-muted-foreground/40" /> Skipped
                </span>
                <button
                  onClick={() => setReviewFilter(reviewFilter === "all" ? "incorrect" : "all")}
                  className="p-1 rounded-lg border border-border hover:bg-muted transition-colors"
                  title="Toggle filter"
                  aria-label="Toggle filter"
                >
                  <Filter size={12} />
                </button>
              </div>
            </div>
          </div>

          {/* ===== Bottom CTA banner ===== */}
          <div className="rounded-[20px] border border-border bg-card shadow-sm p-5 grid grid-cols-1 sm:grid-cols-[1.2fr_1fr_1fr_1fr] gap-3 sm:gap-4 items-stretch">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-200 to-amber-400 flex items-center justify-center shrink-0">
                <Trophy size={22} className="text-amber-700" />
              </div>
              <div className="min-w-0">
                <p className="font-bold text-foreground">Keep going!</p>
                <p className="text-xs text-muted-foreground leading-snug">
                  You're getting better every day.<br />
                  Consistency is the key to mastery.
                </p>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="rounded-xl border border-violet-200 dark:border-violet-800 bg-violet-50/50 dark:bg-violet-900/20 hover:bg-violet-100 dark:hover:bg-violet-900/40 p-3 text-left transition-colors flex items-center gap-3"
            >
              <div className="w-9 h-9 rounded-xl bg-white dark:bg-gray-900 flex items-center justify-center shrink-0">
                <RotateCcw size={16} className="text-violet-600" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-foreground">Retake Test</p>
                <p className="text-[11px] text-muted-foreground">Try again and beat your score</p>
              </div>
              <span className="w-7 h-7 rounded-full bg-violet-500 text-white flex items-center justify-center shrink-0">
                <ChevronRight size={14} />
              </span>
            </button>

            <button
              onClick={scrollToReview}
              disabled={incorrectCount === 0}
              className="rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 disabled:opacity-50 p-3 text-left transition-colors flex items-center gap-3"
            >
              <div className="w-9 h-9 rounded-xl bg-white dark:bg-gray-900 flex items-center justify-center shrink-0">
                <Target size={16} className="text-blue-600" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-foreground">Practice Mistakes Only</p>
                <p className="text-[11px] text-muted-foreground">Focus on incorrect questions</p>
              </div>
              <span className="w-7 h-7 rounded-full bg-blue-500 text-white flex items-center justify-center shrink-0">
                <ChevronRight size={14} />
              </span>
            </button>

            <button
              type="button"
              onClick={onBack}
              className="rounded-xl border border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/40 p-3 text-left transition-colors flex items-center gap-3"
            >
              <div className="w-9 h-9 rounded-xl bg-white dark:bg-gray-900 flex items-center justify-center shrink-0">
                <BookOpen size={16} className="text-green-600" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-foreground">Review Words</p>
                <p className="text-[11px] text-muted-foreground">Study the words from this test</p>
              </div>
              <span className="w-7 h-7 rounded-full bg-green-500 text-white flex items-center justify-center shrink-0">
                <ChevronRight size={14} />
              </span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const completionPct = questions.length > 0
    ? Math.round((totalAnswered / questions.length) * 100)
    : 0;

  return (
    <div className={`min-h-screen bg-gradient-to-br from-violet-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col ${themeClass(themeId)}`}>
      {/* ===== Sticky header ===== */}
      <div className="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
          {/* Left: back + breadcrumb */}
          <div className="flex items-center gap-2 min-w-0">
            <button
              onClick={onBack}
              aria-label="Back"
              className="p-2 rounded-xl hover:bg-muted transition-colors text-muted-foreground shrink-0"
            >
              <ArrowLeft size={18} />
            </button>
            <nav aria-label="Breadcrumb" className="min-w-0">
              <ol className="flex items-center gap-1 text-sm text-muted-foreground truncate">
                <li className="truncate">Mission {missionDay}</li>
                <li className="text-muted-foreground/50">›</li>
                <li className="truncate">Set {group}</li>
                <li className="text-muted-foreground/50">›</li>
                <li className="truncate text-violet-600 dark:text-violet-400 font-medium">Test</li>
              </ol>
            </nav>
          </div>

          {/* Center: page title */}
          <h1 className="font-bold text-lg text-foreground inline-flex items-center gap-2 whitespace-nowrap">
            <BookOpen size={20} className="text-violet-600 dark:text-violet-400" />
            Set Test
          </h1>

          {/* Right: streak | xp | timer */}
          <div className="flex items-center justify-end gap-2 sm:gap-3">
            <div
              className="inline-flex items-center gap-1.5 text-foreground"
              title={`${streak.currentStreak}-day study streak`}
            >
              <Flame size={16} className="text-orange-500" />
              <div className="flex flex-col leading-tight">
                <span className="text-sm font-bold tabular-nums">{streak.currentStreak}</span>
                <span className="text-[10px] text-muted-foreground -mt-0.5 hidden sm:block">Streak</span>
              </div>
            </div>
            <div
              className="inline-flex items-center gap-1.5 text-foreground"
              title={`${gamification.totalXp} total XP`}
            >
              <Star size={16} className="text-amber-400 fill-amber-400" />
              <div className="flex flex-col leading-tight">
                <span className="text-sm font-bold tabular-nums">{gamification.totalXp}</span>
                <span className="text-[10px] text-muted-foreground -mt-0.5 hidden sm:block">XP</span>
              </div>
            </div>
            <button
              onClick={() => {
                if (timerEnabled) {
                  setTimerEnabled(false);
                  setElapsedSec(0);
                } else {
                  setTimerEnabled(true);
                }
              }}
              title={timerEnabled ? "Stop timer" : "Start timer"}
              aria-pressed={timerEnabled}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-sm font-semibold tabular-nums transition-colors border ${
                timerEnabled
                  ? "bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-800"
                  : "bg-transparent text-muted-foreground border-border hover:bg-muted hover:text-foreground"
              }`}
            >
              <Clock size={14} />
              <span>{timerEnabled ? formatDuration(elapsedSec) : "Timer"}</span>
            </button>
          </div>
        </div>

        {/* Animated progress bar + labels */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-3">
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-violet-500 rounded-full"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <div className="mt-1.5 flex justify-between text-xs text-muted-foreground tabular-nums">
            <span>{completionPct}% Complete</span>
            <span>{currentIdx + 1} / {questions.length}</span>
          </div>
        </div>
      </div>

      {/* ===== Two-column main ===== */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-6 items-start">
        {/* --- Main column: question card --- */}
        <div className="min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIdx}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.18 }}
              className="rounded-[20px] border border-border bg-card shadow-lg shadow-violet-500/5 p-6 sm:p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 text-xs font-semibold">
                  <SectionIcon q={q} size={12} /> {getSection(q)}
                </span>
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-border text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  title="Report a problem with this question"
                >
                  <Flag size={12} /> Report
                </button>
              </div>

              {q.type === "mcq" && (
                <MCQView
                  q={q}
                  answer={answers[q.id] ?? undefined}
                  onAnswer={(a) => recordAnswer(q.id, a)}
                />
              )}
              {q.type === "fitb" && (
                <FITBView
                  q={q}
                  inputValue={fitbInput[q.id] ?? ""}
                  onInput={(v) => {
                    setFitbInput((prev) => ({ ...prev, [q.id]: v }));
                    recordAnswer(q.id, v);
                  }}
                />
              )}

              {/* Action buttons inside the card */}
              <div className="mt-6 pt-5 border-t border-border flex items-center justify-between gap-3">
                <button
                  onClick={() => setCurrentIdx((i) => Math.max(0, i - 1))}
                  disabled={currentIdx === 0}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-card border border-border text-sm font-medium hover:bg-muted transition-colors disabled:opacity-30"
                >
                  <ChevronLeft size={16} /> Previous
                </button>

                {currentIdx < questions.length - 1 ? (
                  <button
                    onClick={() => setCurrentIdx((i) => i + 1)}
                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-violet-500 hover:bg-violet-600 text-white text-sm font-semibold transition-colors shadow-sm shadow-violet-500/30"
                  >
                    Next <ChevronRight size={16} />
                  </button>
                ) : (
                  <button
                    onClick={() => setSubmitted(true)}
                    disabled={!allAnswered}
                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-green-600 hover:bg-green-700 disabled:bg-muted disabled:text-muted-foreground text-white text-sm font-bold transition-colors"
                  >
                    <Trophy size={16} /> Submit Test
                  </button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* --- Sidebar: Your Progress --- */}
        <aside className="rounded-[20px] border border-border bg-card shadow-sm p-5 lg:sticky lg:top-[120px]">
          <h2 className="text-sm font-bold text-foreground inline-flex items-center gap-2 mb-4">
            <TrendingUp size={16} className="text-violet-600 dark:text-violet-400" />
            Your Progress
          </h2>

          <div className="flex items-center gap-4 mb-5">
            <Donut value={completionPct} />
            <div>
              <div className="text-xl font-extrabold text-foreground tabular-nums">
                {totalAnswered} <span className="text-muted-foreground font-bold">/ {questions.length}</span>
              </div>
              <div className="text-xs text-muted-foreground leading-tight mt-0.5">
                Questions<br />Answered
              </div>
            </div>
          </div>

          <div className="border-t border-border pt-4 mb-4">
            <h3 className="text-xs font-semibold text-foreground inline-flex items-center gap-1.5 mb-2">
              <BarChart3 size={13} className="text-violet-600 dark:text-violet-400" />
              Difficulty
            </h3>
            <div className="grid grid-cols-3 gap-1.5" role="radiogroup" aria-label="Difficulty">
              {(["easy", "medium", "hard"] as const).map((level) => {
                const active = difficulty === level;
                const labels = { easy: "Easy", medium: "Medium", hard: "Hard" };
                return (
                  <button
                    key={level}
                    onClick={() => setDifficulty(level)}
                    role="radio"
                    aria-checked={active}
                    className={`px-2 py-1.5 rounded-full text-xs font-semibold transition-colors border ${
                      active
                        ? "bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 border-violet-300 dark:border-violet-700"
                        : "bg-transparent text-muted-foreground border-border hover:bg-muted"
                    }`}
                  >
                    {labels[level]}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="border-t border-border pt-4">
            <h3 className="text-xs font-semibold text-foreground inline-flex items-center gap-1.5 mb-3">
              <HelpCircle size={13} className="text-violet-600 dark:text-violet-400" />
              How it works
            </h3>
            <ul className="space-y-2.5 text-xs text-muted-foreground">
              <li className="flex items-center gap-2">
                <Pencil size={13} className="text-violet-500 shrink-0" />
                <span>Type the missing word</span>
              </li>
              <li className="flex items-center gap-2">
                <Lightbulb size={13} className="text-violet-500 shrink-0" />
                <span>Use hints if you're stuck</span>
              </li>
              <li className="flex items-center gap-2">
                <Zap size={13} className="text-violet-500 shrink-0" />
                <span>Get instant feedback</span>
              </li>
              <li className="flex items-center gap-2">
                <RefreshCw size={13} className="text-violet-500 shrink-0" />
                <span>Review mistakes at the end</span>
              </li>
            </ul>
          </div>
        </aside>
      </div>

      {/* ===== Question Navigation card ===== */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6">
        <div className="rounded-[20px] border border-border bg-card shadow-sm px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
          <span className="text-sm font-semibold text-foreground shrink-0">
            Question Navigation
          </span>
          <div className="flex-1 flex flex-wrap items-center gap-2">
            {questions.map((qq, i) => {
              const isCurrent = i === currentIdx;
              const isAnswered =
                answers[qq.id] !== undefined &&
                answers[qq.id] !== null &&
                answers[qq.id] !== "";
              const status = isCurrent
                ? "Current question"
                : isAnswered
                ? "Answered"
                : "Not answered";
              return (
                <button
                  key={qq.id}
                  onClick={() => setCurrentIdx(i)}
                  title={`Question ${i + 1} · ${getSection(qq)} · ${status}`}
                  aria-label={`Go to question ${i + 1}, ${status}`}
                  aria-current={isCurrent ? "step" : undefined}
                  className={`min-w-[36px] h-9 px-2.5 rounded-full text-xs font-bold transition-all border-2 inline-flex items-center justify-center tabular-nums ${
                    isCurrent
                      ? "border-violet-500 bg-violet-500 text-white shadow-sm shadow-violet-500/30 scale-105"
                      : isAnswered
                      ? "border-green-400 bg-transparent text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20"
                      : "border-border bg-transparent text-muted-foreground hover:border-violet-300 hover:text-foreground"
                  }`}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>
          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground shrink-0">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-violet-500" /> Current
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-500" /> Answered
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full border border-muted-foreground/40" /> Not answered
            </span>
          </div>
        </div>
      </div>

      {/* ===== Encouragement banner ===== */}
      {totalAnswered >= 3 && (
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 mt-4 mb-6">
          <div className="rounded-[20px] border border-violet-200 dark:border-violet-800 bg-violet-50/70 dark:bg-violet-900/20 px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="w-10 h-10 rounded-full bg-violet-100 dark:bg-violet-900/50 flex items-center justify-center shrink-0">
                <Trophy size={18} className="text-violet-600 dark:text-violet-400" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-foreground">
                  Keep it up! You're on a {totalAnswered}-question streak! 🔥
                </p>
                <p className="text-xs text-muted-foreground">
                  Focus + Consistency = Mastery
                </p>
              </div>
            </div>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-card border border-border text-xs font-semibold text-foreground hover:bg-muted transition-colors shrink-0 self-start sm:self-auto"
              title="View detailed stats (coming soon)"
            >
              <BarChart3 size={13} /> View Stats
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Donut({
  value,
  size = 64,
  stroke = 7,
  label,
  sublabel,
}: {
  value: number;
  size?: number;
  stroke?: number;
  label?: string;
  sublabel?: string;
}) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (Math.max(0, Math.min(100, value)) / 100) * circ;
  const isLarge = size >= 100;
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          className="stroke-violet-100 dark:stroke-violet-900/40"
          strokeWidth={stroke}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          className="stroke-violet-500"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circ}
          initial={false}
          animate={{ strokeDashoffset: circ - dash }}
          transition={{ duration: 0.6 }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-violet-700 dark:text-violet-300 tabular-nums leading-tight">
        <span className={`font-extrabold ${isLarge ? "text-2xl" : "text-xs"}`}>
          {value}%
        </span>
        {label && (
          <span className="text-[11px] font-semibold text-foreground mt-0.5">{label}</span>
        )}
        {sublabel && (
          <span className="text-[10px] text-muted-foreground">{sublabel}</span>
        )}
      </div>
    </div>
  );
}

function MCQView({
  q, answer, onAnswer,
}: { q: MCQQuestion; answer?: string; onAnswer: (a: string) => void }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1 font-semibold">
        Word
      </p>
      <p className="text-2xl font-extrabold text-foreground mb-1 leading-tight">
        {q.word.word.charAt(0).toUpperCase() + q.word.word.slice(1)}
      </p>
      <p className="text-xs italic text-violet-600 dark:text-violet-400 mb-5">{q.word.pos}</p>
      <p className="text-sm text-muted-foreground mb-3">Which definition matches this word?</p>
      <div className="grid grid-cols-1 gap-2.5">
        {q.choices.map((c) => (
          <button
            key={c}
            onClick={() => onAnswer(c)}
            className={`px-4 py-3 rounded-xl border-2 text-sm font-medium text-left transition-all leading-snug ${
              answer === c
                ? "border-violet-500 bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300"
                : "border-border bg-background hover:border-violet-300 hover:bg-violet-50/50 text-foreground"
            }`}
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}

function FITBView({
  q, inputValue, onInput,
}: { q: FITBQuestion; inputValue: string; onInput: (v: string) => void }) {
  const [showHint, setShowHint] = useState(false);
  const parts = q.sentence.split("_____");

  return (
    <div>
      <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4 font-semibold text-center">
        Complete the sentence
      </p>

      <p className="text-lg sm:text-xl text-foreground mb-7 leading-relaxed text-center font-medium">
        <span className="text-muted-foreground">“</span>
        {parts.map((part, i) => (
          <span key={i}>
            <span className="italic">{part}</span>
            {i < parts.length - 1 && (
              <span className="inline-block align-baseline mx-1 px-3 py-0.5 min-w-[90px] text-center text-violet-700 dark:text-violet-300 bg-violet-50 dark:bg-violet-900/20 border-b-2 border-dashed border-violet-400 rounded-md not-italic font-semibold">
                _____
              </span>
            )}
          </span>
        ))}
        <span className="text-muted-foreground">”</span>
      </p>

      {q.hintSynonyms.length > 0 && (
        <div className="mb-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex-1 h-px bg-border" />
            <button
              onClick={() => setShowHint((s) => !s)}
              className="text-xs font-medium text-muted-foreground hover:text-violet-600 dark:hover:text-violet-400 transition-colors inline-flex items-center gap-1.5"
            >
              <Lightbulb size={12} /> {showHint ? "Hide hint" : "Show hint"} <ChevronDownIcon open={showHint} />
            </button>
            <div className="flex-1 h-px bg-border" />
          </div>
          {showHint && (
            <div className="flex flex-wrap items-center justify-center gap-2 mb-1">
              {q.hintSynonyms.map((s) => (
                <span
                  key={s}
                  className="text-xs font-medium px-3 py-1 rounded-full bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-800"
                >
                  {s}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      <input
        type="text"
        value={inputValue}
        onChange={(e) => onInput(e.target.value)}
        placeholder="Type your answer…"
        autoFocus
        className="w-full px-4 py-3.5 rounded-xl border-2 border-violet-300 dark:border-violet-800 bg-background text-foreground text-base font-medium focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/20 transition-all placeholder:text-muted-foreground/50"
        autoComplete="off"
        spellCheck={false}
      />
      {inputValue && (
        <p className="mt-2 text-xs text-muted-foreground inline-flex items-center gap-1.5">
          <Lightbulb size={12} className="text-violet-500" />
          Tip: The word is <span className="font-semibold text-foreground">{q.word.word.length}</span> letters.
        </p>
      )}
    </div>
  );
}

function ChevronDownIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      className={`transition-transform ${open ? "rotate-180" : ""}`}
    >
      <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ReviewBlock({
  q, userAnswer, correct,
}: { q: Question; userAnswer: string | null | undefined; correct: boolean }) {
  const answerColor = correct ? "text-green-700" : "text-red-700";
  if (q.type === "mcq") {
    return (
      <div className="space-y-1.5">
        <p className="text-sm text-foreground font-bold">{q.word.word}</p>
        <p className="text-xs italic text-violet-600">{q.word.pos}</p>
        <p className={`text-sm font-bold ${answerColor}`}>
          Your answer: {userAnswer ?? "—"}
        </p>
        {!correct && <p className="text-sm text-green-700 font-bold">Correct: {q.correct}</p>}
      </div>
    );
  }
  return (
    <div className="space-y-1.5">
      <p className="text-sm text-foreground italic">"{q.sentence}"</p>
      <p className={`text-sm font-bold ${answerColor}`}>
        Your answer: {userAnswer && userAnswer !== "" ? userAnswer : "—"}
      </p>
      {!correct && <p className="text-sm text-green-700 font-bold">Correct: {q.word.word}</p>}
    </div>
  );
}

export default function SetTest(props: SetTestProps) {
  return <SetTestInner {...props} />;
}
