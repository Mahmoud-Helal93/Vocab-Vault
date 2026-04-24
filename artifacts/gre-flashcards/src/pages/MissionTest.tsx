import { useState, useMemo, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { type Word } from "@/data/words";
import { shuffleArray } from "@/lib/srs";
import { saveMissionTestScore } from "@/lib/storage";
import {
  ArrowLeft, Shuffle, CheckCircle2, XCircle, ChevronLeft,
  ChevronRight, RotateCcw, Trophy, ClipboardList, BookOpen, Flame,
  Star, Clock, Flag, TrendingUp, HelpCircle, Lightbulb, Zap, RefreshCw,
  BarChart3, Target, Pencil, Scale,
} from "lucide-react";

type Difficulty = "easy" | "medium" | "hard";

function formatDuration(totalSec: number): string {
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function SectionIcon({ q, size = 14 }: { q: Question; size?: number }) {
  if (q.type === "mcq") return <Target size={size} />;
  if (q.type === "fitb") return <Pencil size={size} />;
  return <Scale size={size} />;
}

interface MissionTestProps {
  onBack: () => void;
  missionDay?: number;
}

type QuestionType = "mcq" | "fitb" | "tf";

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
}

interface TFQuestion {
  type: "tf";
  id: number;
  word: Word;
  shownDefinition: string;
  isTrue: boolean;
}

type Question = MCQQuestion | FITBQuestion | TFQuestion;

function pickN<T>(arr: T[], n: number, exclude?: T[]): T[] {
  const pool = exclude ? arr.filter((x) => !exclude.includes(x)) : [...arr];
  const shuffled = shuffleArray(pool);
  return shuffled.slice(0, n);
}

function buildQuestions(missionWords: Word[], allWords: Word[], shuffled: boolean): Question[] {
  const pool = shuffleArray(missionWords);
  const mcqWords = pool.slice(0, 10);
  const fitbWords = pool.slice(10, 20);
  const tfWords = pool.slice(20, 30);

  const mcq: MCQQuestion[] = mcqWords.map((w, i) => {
    const distractors = pickN(
      missionWords.filter((x) => x.id !== w.id),
      3
    ).map((x) => x.word);
    const choices = shuffleArray([w.word, ...distractors]);
    return { type: "mcq", id: i, word: w, choices, correct: w.word };
  });

  const fitb: FITBQuestion[] = fitbWords.map((w, i) => {
    const sentence = w.examples[0].replace(new RegExp(w.word, "gi"), "_____");
    return { type: "fitb", id: i + 10, word: w, sentence };
  });

  const tf: TFQuestion[] = tfWords.map((w, i) => {
    const isTrue = i % 2 === 0;
    let shownDefinition = w.definition;
    if (!isTrue) {
      const other = missionWords.find((x) => x.id !== w.id && x.definition !== w.definition);
      if (other) shownDefinition = other.definition;
    }
    return { type: "tf", id: i + 20, word: w, shownDefinition, isTrue };
  });

  const all: Question[] = [...mcq, ...fitb, ...tf];
  return shuffled ? shuffleArray(all) : all;
}

function getSection(q: Question): string {
  if (q.type === "mcq") return "Multiple Choice";
  if (q.type === "fitb") return "Fill in the Blank";
  return "True or False";
}

function getSectionIcon(q: Question): string {
  if (q.type === "mcq") return "🎯";
  if (q.type === "fitb") return "✏️";
  return "⚖️";
}

type AnswerMap = Record<number, string | boolean | null>;

function MissionTestInner({ onBack, missionDay = 1 }: MissionTestProps) {
  const { words, streak, gamification } = useApp();
  const [isShuffled, setIsShuffled] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [fitbInput, setFitbInput] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [reviewIdx, setReviewIdx] = useState(0);
  const [timerEnabled, setTimerEnabled] = useState(false);
  const [elapsedSec, setElapsedSec] = useState(0);
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");

  useEffect(() => {
    if (!timerEnabled || submitted) return;
    const id = window.setInterval(() => setElapsedSec((s) => s + 1), 1000);
    return () => window.clearInterval(id);
  }, [timerEnabled, submitted]);

  const missionWords = useMemo(
    () => words.filter((w) => w.day === missionDay),
    [words, missionDay]
  );

  const questions = useMemo(
    () => buildQuestions(missionWords, words, isShuffled),
    [missionWords, words, isShuffled]
  );

  const handleShuffle = useCallback(() => {
    setIsShuffled((v) => !v);
    setCurrentIdx(0);
    setAnswers({});
    setFitbInput({});
    setSubmitted(false);
    setElapsedSec(0);
  }, []);

  const handleReset = useCallback(() => {
    setCurrentIdx(0);
    setAnswers({});
    setFitbInput({});
    setSubmitted(false);
    setReviewIdx(0);
    setElapsedSec(0);
  }, []);

  const q = questions[currentIdx];
  const totalAnswered = Object.keys(answers).length;
  const allAnswered = totalAnswered === questions.length;
  const progress = ((currentIdx + 1) / questions.length) * 100;

  function recordAnswer(id: number, ans: string | boolean) {
    setAnswers((prev) => ({ ...prev, [id]: ans }));
  }

  function isCorrect(q: Question): boolean {
    const ans = answers[q.id];
    if (ans === undefined || ans === null) return false;
    if (q.type === "mcq") return ans === q.correct;
    if (q.type === "fitb") {
      return typeof ans === "string" && ans.trim().toLowerCase() === q.word.word.toLowerCase();
    }
    if (q.type === "tf") return ans === q.isTrue;
    return false;
  }

  const score = submitted ? questions.filter(isCorrect).length : 0;
  const scoreByType = submitted
    ? {
        mcq: questions.filter((q) => q.type === "mcq" && isCorrect(q)).length,
        fitb: questions.filter((q) => q.type === "fitb" && isCorrect(q)).length,
        tf: questions.filter((q) => q.type === "tf" && isCorrect(q)).length,
      }
    : null;

  const pct = submitted ? Math.round((score / questions.length) * 100) : 0;
  const grade =
    pct >= 90 ? { label: "Excellent!", color: "text-green-600", bg: "bg-green-50", border: "border-green-200" } :
    pct >= 75 ? { label: "Good Job!", color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200" } :
    pct >= 60 ? { label: "Keep Practicing", color: "text-yellow-600", bg: "bg-yellow-50", border: "border-yellow-200" } :
    { label: "Needs More Work", color: "text-red-600", bg: "bg-red-50", border: "border-red-200" };

  if (submitted) {
    const rq = questions[reviewIdx];
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col">
        <div className="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur border-b border-border px-4 py-3 flex items-center gap-3">
          <button onClick={onBack} className="p-2 rounded-xl hover:bg-muted transition-colors text-muted-foreground">
            <ArrowLeft size={18} />
          </button>
          <div className="flex-1">
            <h1 className="font-bold text-base text-foreground">Mission {missionDay} Test — Results</h1>
          </div>
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-orange-100 hover:bg-orange-200 text-orange-700 text-sm font-medium transition-colors"
          >
            <RotateCcw size={14} /> Retake
          </button>
        </div>

        <div className="max-w-3xl mx-auto w-full px-4 py-6 space-y-5">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`rounded-2xl border-2 ${grade.border} ${grade.bg} p-6 text-center`}
          >
            <div className="text-5xl mb-2">{pct >= 90 ? "🏆" : pct >= 75 ? "🎉" : pct >= 60 ? "💪" : "📚"}</div>
            <div className={`text-2xl font-bold mb-1 ${grade.color}`}>{grade.label}</div>
            <div className="text-4xl font-extrabold text-foreground">{score}/{questions.length}</div>
            <div className="text-muted-foreground text-sm mt-1">{pct}% correct</div>
          </motion.div>

          {scoreByType && (
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Multiple Choice", key: "mcq", icon: "🎯", total: 10 },
                { label: "Fill in Blank", key: "fitb", icon: "✏️", total: 10 },
                { label: "True or False", key: "tf", icon: "⚖️", total: 10 },
              ].map(({ label, key, icon, total }) => {
                const val = scoreByType[key as keyof typeof scoreByType];
                const p = Math.round((val / total) * 100);
                return (
                  <div key={key} className="rounded-xl border border-border bg-card p-3 text-center">
                    <div className="text-xl mb-1">{icon}</div>
                    <div className="font-bold text-foreground">{val}/{total}</div>
                    <div className="text-xs text-muted-foreground">{label}</div>
                    <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${p}%`, backgroundColor: p >= 70 ? "#10B981" : p >= 50 ? "#F59E0B" : "#EF4444" }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="rounded-2xl border border-border bg-card overflow-hidden">
            <div className="px-4 py-3 border-b border-border flex items-center justify-between">
              <h2 className="font-semibold text-sm text-foreground flex items-center gap-2">
                <ClipboardList size={15} /> Review Answers
              </h2>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setReviewIdx((i) => Math.max(0, i - 1))}
                  disabled={reviewIdx === 0}
                  className="p-1 rounded-lg hover:bg-muted disabled:opacity-30 transition-colors"
                >
                  <ChevronLeft size={16} />
                </button>
                <span className="text-xs text-muted-foreground px-2">{reviewIdx + 1}/{questions.length}</span>
                <button
                  onClick={() => setReviewIdx((i) => Math.min(questions.length - 1, i + 1))}
                  disabled={reviewIdx === questions.length - 1}
                  className="p-1 rounded-lg hover:bg-muted disabled:opacity-30 transition-colors"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={reviewIdx}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.15 }}
                className="p-4"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 shrink-0">
                    {isCorrect(rq)
                      ? <CheckCircle2 size={20} className="text-green-500" />
                      : <XCircle size={20} className="text-red-500" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-muted-foreground mb-1">{getSectionIcon(rq)} {getSection(rq)}</div>
                    <ReviewQuestion q={rq} userAnswer={answers[rq.id]} correct={isCorrect(rq)} />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="px-4 pb-3 flex flex-wrap gap-1.5">
              {questions.map((q, i) => (
                <button
                  key={q.id}
                  onClick={() => setReviewIdx(i)}
                  className={`w-7 h-7 rounded-lg text-xs font-bold transition-colors border ${
                    i === reviewIdx
                      ? "border-orange-400 bg-orange-100 text-orange-700"
                      : isCorrect(q)
                      ? "border-green-300 bg-green-50 text-green-700"
                      : "border-red-300 bg-red-50 text-red-700"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const completionPct = questions.length > 0
    ? Math.round((totalAnswered / questions.length) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col">
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
                <li className="truncate text-orange-600 dark:text-orange-400 font-medium">Test</li>
              </ol>
            </nav>
          </div>

          {/* Center: page title */}
          <h1 className="font-bold text-lg text-foreground inline-flex items-center gap-2 whitespace-nowrap">
            <BookOpen size={20} className="text-orange-600 dark:text-orange-400" />
            Mission Test
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
                  ? "bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800"
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
              className="h-full bg-orange-500 rounded-full"
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
              className="rounded-[20px] border border-border bg-card shadow-lg shadow-orange-500/5 p-6 sm:p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-xs font-semibold">
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
                <MCQQuestionView
                  q={q}
                  answer={answers[q.id] as string | undefined}
                  onAnswer={(a) => recordAnswer(q.id, a)}
                />
              )}
              {q.type === "fitb" && (
                <FITBQuestionView
                  q={q}
                  inputValue={fitbInput[q.id] ?? ""}
                  onInput={(v) => {
                    setFitbInput((prev) => ({ ...prev, [q.id]: v }));
                    recordAnswer(q.id, v);
                  }}
                />
              )}
              {q.type === "tf" && (
                <TFQuestionView
                  q={q}
                  answer={answers[q.id] as boolean | undefined}
                  onAnswer={(a) => recordAnswer(q.id, a)}
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
                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold transition-colors shadow-sm shadow-orange-500/30"
                  >
                    Next <ChevronRight size={16} />
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      const finalScore = questions.filter(isCorrect).length;
                      const finalPct = Math.round((finalScore / questions.length) * 100);
                      saveMissionTestScore(missionDay, finalPct);
                      setSubmitted(true);
                    }}
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
            <TrendingUp size={16} className="text-orange-600 dark:text-orange-400" />
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
              <BarChart3 size={13} className="text-orange-600 dark:text-orange-400" />
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
                        ? "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 border-orange-300 dark:border-orange-700"
                        : "bg-transparent text-muted-foreground border-border hover:bg-muted"
                    }`}
                  >
                    {labels[level]}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="border-t border-border pt-4 mb-4">
            <button
              onClick={handleShuffle}
              aria-pressed={isShuffled}
              className={`w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors border ${
                isShuffled
                  ? "bg-orange-500 text-white border-orange-500 hover:bg-orange-600"
                  : "bg-transparent text-muted-foreground border-border hover:bg-muted hover:text-foreground"
              }`}
              title="Shuffle question order"
            >
              <Shuffle size={13} /> {isShuffled ? "Shuffle: On" : "Shuffle questions"}
            </button>
          </div>

          <div className="border-t border-border pt-4">
            <h3 className="text-xs font-semibold text-foreground inline-flex items-center gap-1.5 mb-3">
              <HelpCircle size={13} className="text-orange-600 dark:text-orange-400" />
              How it works
            </h3>
            <ul className="space-y-2.5 text-xs text-muted-foreground">
              <li className="flex items-center gap-2">
                <Target size={13} className="text-orange-500 shrink-0" />
                <span>Answer 30 mixed questions</span>
              </li>
              <li className="flex items-center gap-2">
                <Lightbulb size={13} className="text-orange-500 shrink-0" />
                <span>Mix of MCQ, fill-in & T/F</span>
              </li>
              <li className="flex items-center gap-2">
                <Zap size={13} className="text-orange-500 shrink-0" />
                <span>Get instant feedback</span>
              </li>
              <li className="flex items-center gap-2">
                <RefreshCw size={13} className="text-orange-500 shrink-0" />
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
              const isAnswered = answers[qq.id] !== undefined && answers[qq.id] !== null && answers[qq.id] !== "";
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
                      ? "border-orange-500 bg-orange-500 text-white shadow-sm shadow-orange-500/30 scale-105"
                      : isAnswered
                      ? "border-green-400 bg-transparent text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20"
                      : "border-border bg-transparent text-muted-foreground hover:border-orange-300 hover:text-foreground"
                  }`}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>
          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground shrink-0">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-orange-500" /> Current
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
          <div className="rounded-[20px] border border-orange-200 dark:border-orange-800 bg-orange-50/70 dark:bg-orange-900/20 px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/50 flex items-center justify-center shrink-0">
                <Trophy size={18} className="text-orange-600 dark:text-orange-400" />
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

function Donut({ value }: { value: number }) {
  const size = 64;
  const stroke = 7;
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (Math.max(0, Math.min(100, value)) / 100) * circ;
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          className="stroke-orange-100 dark:stroke-orange-900/40"
          strokeWidth={stroke}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          className="stroke-orange-500"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circ}
          initial={false}
          animate={{ strokeDashoffset: circ - dash }}
          transition={{ duration: 0.4 }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-orange-700 dark:text-orange-300 tabular-nums">
        {value}%
      </div>
    </div>
  );
}

function MCQQuestionView({
  q, answer, onAnswer,
}: { q: MCQQuestion; answer?: string; onAnswer: (a: string) => void }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1 font-semibold">Word definition</p>
      <p className="text-base font-medium text-foreground mb-5 leading-relaxed">{q.word.definition}</p>
      <p className="text-sm text-muted-foreground mb-3">Which word matches this definition?</p>
      <div className="grid grid-cols-2 gap-2.5">
        {q.choices.map((c) => (
          <button
            key={c}
            onClick={() => onAnswer(c)}
            className={`px-4 py-3 rounded-xl border-2 text-sm font-semibold text-left transition-all ${
              answer === c
                ? "border-orange-500 bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400"
                : "border-border bg-background hover:border-orange-300 hover:bg-orange-50/50 text-foreground"
            }`}
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}

function FITBQuestionView({
  q, inputValue, onInput,
}: { q: FITBQuestion; inputValue: string; onInput: (v: string) => void }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1 font-semibold">Complete the sentence</p>
      <p className="text-base text-foreground mb-5 leading-relaxed italic">"{q.sentence}"</p>
      <label className="text-sm text-muted-foreground block mb-2">Type the missing word:</label>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => onInput(e.target.value)}
        placeholder="Enter the word..."
        className="w-full px-4 py-3 rounded-xl border-2 border-border bg-background text-foreground text-sm font-medium focus:outline-none focus:border-orange-500 transition-colors placeholder:text-muted-foreground/50"
        autoComplete="off"
        spellCheck={false}
      />
      {inputValue && (
        <p className="mt-2 text-xs text-muted-foreground">
          Hint: The word is <span className="font-semibold text-foreground">{q.word.word.length}</span> letters
        </p>
      )}
    </div>
  );
}

function TFQuestionView({
  q, answer, onAnswer,
}: { q: TFQuestion; answer?: boolean; onAnswer: (a: boolean) => void }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1 font-semibold">True or False</p>
      <div className="bg-muted/50 rounded-xl px-4 py-4 mb-5">
        <span className="text-lg font-bold text-foreground">{q.word.word}</span>
        <span className="text-muted-foreground mx-2">means</span>
        <span className="text-base text-foreground italic">"{q.shownDefinition}"</span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {([true, false] as const).map((val) => (
          <button
            key={String(val)}
            onClick={() => onAnswer(val)}
            className={`py-4 rounded-xl border-2 text-base font-bold transition-all ${
              answer === val
                ? val
                  ? "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700"
                  : "border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700"
                : "border-border bg-background hover:bg-muted text-foreground"
            }`}
          >
            {val ? "✓ True" : "✗ False"}
          </button>
        ))}
      </div>
    </div>
  );
}

function ReviewQuestion({
  q, userAnswer, correct,
}: { q: Question; userAnswer: string | boolean | null | undefined; correct: boolean }) {
  const answerColor = correct ? "text-green-700" : "text-red-700";
  if (q.type === "mcq") {
    return (
      <div className="space-y-1.5">
        <p className="text-sm text-foreground font-medium">{q.word.definition}</p>
        <p className={`text-sm font-bold ${answerColor}`}>
          Your answer: {String(userAnswer ?? "—")}
        </p>
        {!correct && <p className="text-sm text-green-700 font-bold">Correct: {q.correct}</p>}
      </div>
    );
  }
  if (q.type === "fitb") {
    return (
      <div className="space-y-1.5">
        <p className="text-sm text-foreground italic">"{q.sentence}"</p>
        <p className={`text-sm font-bold ${answerColor}`}>
          Your answer: {String(userAnswer ?? "—")}
        </p>
        {!correct && <p className="text-sm text-green-700 font-bold">Correct: {q.word.word}</p>}
      </div>
    );
  }
  return (
    <div className="space-y-1.5">
      <p className="text-sm text-foreground">
        <span className="font-bold">{q.word.word}</span> means "{q.shownDefinition}"
      </p>
      <p className={`text-sm font-bold ${answerColor}`}>
        Your answer: {userAnswer === true ? "True" : userAnswer === false ? "False" : "—"}
      </p>
      {!correct && (
        <p className="text-sm text-green-700 font-bold">Correct: {q.isTrue ? "True" : "False"}</p>
      )}
    </div>
  );
}

export default function MissionTest(props: MissionTestProps) {
  return <MissionTestInner {...props} />;
}
