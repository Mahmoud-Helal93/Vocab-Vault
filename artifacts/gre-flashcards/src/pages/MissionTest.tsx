import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { type Word } from "@/data/words";
import { shuffleArray } from "@/lib/srs";
import { saveMissionTestScore } from "@/lib/storage";
import {
  ArrowLeft, Shuffle, CheckCircle2, XCircle, ChevronLeft,
  ChevronRight, RotateCcw, Trophy, ClipboardList,
} from "lucide-react";

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
  const { words } = useApp();
  const [isShuffled, setIsShuffled] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [fitbInput, setFitbInput] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [reviewIdx, setReviewIdx] = useState(0);

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
  }, []);

  const handleReset = useCallback(() => {
    setCurrentIdx(0);
    setAnswers({});
    setFitbInput({});
    setSubmitted(false);
    setReviewIdx(0);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col">
      <div className="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur border-b border-border px-4 py-3">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 rounded-xl hover:bg-muted transition-colors text-muted-foreground">
            <ArrowLeft size={18} />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="font-bold text-base text-foreground truncate">Mission {missionDay} Test</h1>
            <p className="text-xs text-muted-foreground">30 words · Sets 1, 2, 3</p>
          </div>
          <button
            onClick={handleShuffle}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium transition-colors ${
              isShuffled
                ? "bg-orange-500 text-white"
                : "bg-muted hover:bg-orange-100 text-muted-foreground hover:text-orange-700"
            }`}
            title="Shuffle questions"
          >
            <Shuffle size={14} /> Shuffle
          </button>
        </div>

        <div className="mt-3 space-y-1">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{getSectionIcon(q)} {getSection(q)}</span>
            <span>{currentIdx + 1} / {questions.length}</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-orange-500"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{totalAnswered} answered</span>
            <span>{questions.length - totalAnswered} remaining</span>
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-2xl mx-auto w-full px-4 py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIdx}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.18 }}
            className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden"
          >
            <div className="bg-orange-500/10 border-b border-orange-100 dark:border-orange-900/30 px-5 py-3 flex items-center gap-2">
              <span className="text-lg">{getSectionIcon(q)}</span>
              <span className="text-sm font-semibold text-orange-700 dark:text-orange-400">{getSection(q)}</span>
              <span className="ml-auto text-xs text-muted-foreground font-mono">Q{currentIdx + 1}</span>
            </div>

            <div className="p-5">
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
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-5 flex items-center justify-between gap-3">
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
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium transition-colors"
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

        <div className="mt-5 flex flex-wrap gap-1.5">
          {questions.map((q, i) => (
            <button
              key={q.id}
              onClick={() => setCurrentIdx(i)}
              className={`w-7 h-7 rounded-lg text-xs font-bold transition-colors border ${
                i === currentIdx
                  ? "border-orange-500 bg-orange-500 text-white"
                  : answers[q.id] !== undefined
                  ? "border-green-400 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                  : "border-border bg-card text-muted-foreground hover:bg-muted"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
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

import ProgressSidebar from "@/components/ProgressSidebar";

export default function MissionTest(props: MissionTestProps) {
  return (
    <div className="flex gap-5 px-0 lg:px-4 py-0 lg:py-6 min-h-[calc(100vh-3.5rem)] lg:min-h-screen">
      <div className="flex-1 min-w-0">
        <MissionTestInner {...props} />
      </div>
      <ProgressSidebar className="hidden lg:block" />
    </div>
  );
}
