import { useState, useMemo, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { type Word } from "@/data/words";
import { shuffleArray } from "@/lib/srs";
import {
  ArrowLeft, CheckCircle2, XCircle, ChevronLeft, ChevronRight,
  RotateCcw, Trophy, Target, BookOpenText, Pencil, Clock,
  BookOpen, Flame, Star, Flag, TrendingUp, HelpCircle,
  Lightbulb, Zap, RefreshCw, BarChart3,
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
  const { words, streak, gamification } = useApp();

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
    const rq = questions[reviewIdx];
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col">
        <div className="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur border-b border-border px-4 py-3 flex items-center gap-3">
          <button onClick={onBack} className="p-2 rounded-xl hover:bg-muted transition-colors text-muted-foreground">
            <ArrowLeft size={18} />
          </button>
          <div className="flex-1">
            <h1 className="font-bold text-base text-foreground">
              Mission {missionDay} · Set {group} Test — Results
            </h1>
            <p className="text-[11px] text-muted-foreground">10 questions · Set {group} words only</p>
          </div>
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-violet-100 hover:bg-violet-200 text-violet-700 text-sm font-medium transition-colors"
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
            <div className="text-5xl mb-2">{grade.emoji}</div>
            <div className={`text-2xl font-bold mb-1 ${grade.color}`}>{grade.label}</div>
            <div className="text-4xl font-extrabold text-foreground">{score}/{questions.length}</div>
            <div className="text-muted-foreground text-sm mt-1">{pct}% correct</div>
          </motion.div>

          {scoreByType && (
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Multiple Choice", key: "mcq" as const, icon: <BookOpenText size={18} /> },
                { label: "Fill in Blank",   key: "fitb" as const, icon: <Pencil size={18} /> },
              ].map(({ label, key, icon }) => {
                const val = scoreByType[key];
                const total = totalByType[key];
                const p = total > 0 ? Math.round((val / total) * 100) : 0;
                return (
                  <div key={key} className="rounded-xl border border-border bg-card p-3 text-center">
                    <div className="flex items-center justify-center mb-1 text-violet-500">{icon}</div>
                    <div className="font-bold text-foreground">{val}/{total}</div>
                    <div className="text-xs text-muted-foreground">{label}</div>
                    <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${p}%`,
                          backgroundColor: p >= 70 ? "#10B981" : p >= 50 ? "#F59E0B" : "#EF4444",
                        }}
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
                <Target size={15} /> Review Answers
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
                    <div className="text-xs text-muted-foreground mb-1 flex items-center gap-1.5">
                      <SectionIcon q={rq} /> {getSection(rq)}
                    </div>
                    <ReviewBlock q={rq} userAnswer={answers[rq.id]} correct={isCorrect(rq)} />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="px-4 pb-3 flex flex-wrap gap-1.5">
              {questions.map((qq, i) => (
                <button
                  key={qq.id}
                  onClick={() => setReviewIdx(i)}
                  className={`w-7 h-7 rounded-lg text-xs font-bold transition-colors border ${
                    i === reviewIdx
                      ? "border-violet-400 bg-violet-100 text-violet-700"
                      : isCorrect(qq)
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
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col">
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
          transition={{ duration: 0.4 }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-violet-700 dark:text-violet-300 tabular-nums">
        {value}%
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
