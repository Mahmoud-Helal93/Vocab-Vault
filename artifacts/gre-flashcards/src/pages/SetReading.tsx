import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  BookOpen,
  Clock,
  CheckCircle2,
  XCircle,
  ChevronRight,
  Sparkles,
  Lightbulb,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { getSetReading, type ReadingQuestion } from "@/data/setReadings";
import { useApp } from "@/context/AppContext";

interface SetReadingProps {
  onBack: () => void;
  onContinue: (firstWordId: string | null) => void;
  missionDay: number;
  group: number;
}

const KIND_LABELS: Record<ReadingQuestion["kind"], string> = {
  "vocab-context": "Vocabulary in Context",
  "tone-purpose": "Author's Tone & Purpose",
  inference: "Inference",
  substitution: "Word Substitution",
  "main-idea": "Main Idea",
};

function renderPassage(passage: string) {
  const paragraphs = passage.split(/\n\n+/);
  return paragraphs.map((para, pi) => {
    const tokens = para.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
    return (
      <p
        key={pi}
        className="text-foreground leading-[1.85] text-[17px] mb-5 last:mb-0"
      >
        {tokens.map((tok, ti) => {
          if (/^\*\*[^*]+\*\*$/.test(tok)) {
            const inner = tok.slice(2, -2);
            return (
              <strong
                key={ti}
                className="font-bold text-orange-700 dark:text-orange-300 bg-orange-100/60 dark:bg-orange-500/15 rounded px-1 py-0.5"
              >
                {inner}
              </strong>
            );
          }
          if (/^\*[^*]+\*$/.test(tok)) {
            return (
              <em key={ti} className="italic">
                {tok.slice(1, -1)}
              </em>
            );
          }
          return <span key={ti}>{tok}</span>;
        })}
      </p>
    );
  });
}

export default function SetReading({
  onBack,
  onContinue,
  missionDay,
  group,
}: SetReadingProps) {
  const reading = useMemo(
    () => getSetReading(missionDay, group),
    [missionDay, group],
  );
  const { words } = useApp();
  const setWords = useMemo(
    () =>
      words.filter((w) => w.day === missionDay && w.group === group),
    [words, missionDay, group],
  );
  const firstWordId = setWords[0]?.id ?? null;

  const [answers, setAnswers] = useState<Record<number, number | null>>({});
  const [submitted, setSubmitted] = useState(false);
  const [openExplanations, setOpenExplanations] = useState<
    Record<number, boolean>
  >({});

  if (!reading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center space-y-3 max-w-md">
          <h1 className="text-xl font-bold text-foreground">
            No reading available for this set yet.
          </h1>
          <p className="text-sm text-muted-foreground">
            You can jump straight into the flashcards.
          </p>
          <button
            onClick={() => onContinue(firstWordId)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-500 text-white font-bold text-sm shadow hover:bg-orange-600 transition"
          >
            Continue to Flashcards <ChevronRight size={16} />
          </button>
        </div>
      </div>
    );
  }

  const totalQuestions = reading.questions.length;
  const answeredCount = Object.values(answers).filter(
    (v) => v !== null && v !== undefined,
  ).length;
  const allAnswered = answeredCount === totalQuestions;

  const score = submitted
    ? reading.questions.reduce(
        (acc, q) => acc + (answers[q.id] === q.correctIndex ? 1 : 0),
        0,
      )
    : 0;
  const scorePct = submitted
    ? Math.round((score / totalQuestions) * 100)
    : 0;

  const selectAnswer = (qid: number, idx: number) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [qid]: idx }));
  };

  const toggleExplanation = (qid: number) => {
    setOpenExplanations((prev) => ({ ...prev, [qid]: !prev[qid] }));
  };

  const submit = () => {
    if (!allAnswered) return;
    setSubmitted(true);
    requestAnimationFrame(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    });
  };

  const reset = () => {
    setAnswers({});
    setSubmitted(false);
    setOpenExplanations({});
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50/40 via-background to-orange-50/40 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            aria-label="Back"
            className="w-10 h-10 rounded-xl border border-border bg-card flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors shrink-0"
          >
            <ArrowLeft size={18} />
          </button>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400">
              Mission {missionDay} · Set {group} · Pre-Read
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground leading-tight truncate">
              {reading.title}
            </h1>
          </div>
        </div>

        {/* Hero card */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl p-6 sm:p-7 text-white shadow-lg"
          style={{
            background:
              "linear-gradient(120deg, #FB923C 0%, #F97316 40%, #EC4899 100%)",
          }}
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/25 backdrop-blur-sm flex items-center justify-center shrink-0">
              <BookOpen size={22} />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-xl sm:text-2xl font-extrabold leading-tight">
                Read Before You Study
              </h2>
              <p className="text-sm text-white/95 mt-1 leading-relaxed">
                {reading.subtitle}
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-white/25 backdrop-blur-sm">
                  <Sparkles size={12} /> {reading.format}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-white/25 backdrop-blur-sm">
                  <Clock size={12} /> ~{reading.readingMinutes} min read
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-white/25 backdrop-blur-sm">
                  {reading.words.length} target words
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Word list chips */}
        <div className="rounded-2xl border border-border bg-card p-4 sm:p-5">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb size={16} className="text-amber-500" />
            <h3 className="text-sm font-bold text-foreground">
              The 10 words to watch for
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {reading.words.map((w) => (
              <span
                key={w}
                className="text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-full bg-orange-100 text-orange-700 dark:bg-orange-500/15 dark:text-orange-300"
              >
                {w}
              </span>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
            They're <strong>highlighted in the passage</strong>. Try to infer
            each meaning from context — you'll see the formal definitions on
            the flashcards next.
          </p>
        </div>

        {/* Passage */}
        <article className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm">
          <h2 className="text-lg sm:text-xl font-extrabold text-foreground mb-1">
            {reading.title}
          </h2>
          <div className="text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-5">
            {reading.format}
          </div>
          <div className="prose-reading">{renderPassage(reading.passage)}</div>
        </article>

        {/* Comprehension Check */}
        <section className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-foreground">
                Comprehension Check
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Six questions about the passage. Answer all, then submit.
              </p>
            </div>
            <div className="text-xs font-semibold text-muted-foreground bg-muted px-3 py-1.5 rounded-full">
              {answeredCount} / {totalQuestions} answered
            </div>
          </div>

          <div className="space-y-5">
            {reading.questions.map((q, qi) => {
              const selected = answers[q.id] ?? null;
              const isCorrect = submitted && selected === q.correctIndex;
              const isWrong =
                submitted && selected !== null && selected !== q.correctIndex;
              const expOpen = openExplanations[q.id];

              return (
                <div
                  key={q.id}
                  className={`rounded-2xl border p-5 transition-colors ${
                    submitted
                      ? isCorrect
                        ? "border-emerald-300 dark:border-emerald-700 bg-emerald-50/40 dark:bg-emerald-900/10"
                        : "border-rose-300 dark:border-rose-700 bg-rose-50/40 dark:bg-rose-900/10"
                      : "border-border bg-background/40"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400">
                      Q{qi + 1} · {KIND_LABELS[q.kind]}
                    </span>
                    {submitted && (
                      <span
                        className={`inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider ${
                          isCorrect
                            ? "text-emerald-600 dark:text-emerald-400"
                            : "text-rose-600 dark:text-rose-400"
                        }`}
                      >
                        {isCorrect ? (
                          <>
                            <CheckCircle2 size={12} /> Correct
                          </>
                        ) : (
                          <>
                            <XCircle size={12} /> Incorrect
                          </>
                        )}
                      </span>
                    )}
                  </div>

                  {q.quote && (
                    <blockquote className="border-l-4 border-orange-400 dark:border-orange-500 pl-3 py-1 text-sm italic text-muted-foreground mb-3 leading-relaxed">
                      {q.quote}
                    </blockquote>
                  )}

                  <p className="text-sm sm:text-base text-foreground font-medium mb-3 leading-relaxed">
                    {q.prompt}
                  </p>

                  <div className="space-y-2">
                    {q.options.map((opt, idx) => {
                      const isSelected = selected === idx;
                      const isAnswer = idx === q.correctIndex;
                      let cls =
                        "w-full text-left rounded-xl border px-4 py-3 text-sm transition-colors flex items-start gap-3";
                      if (submitted) {
                        if (isAnswer) {
                          cls +=
                            " border-emerald-400 dark:border-emerald-600 bg-emerald-100/60 dark:bg-emerald-900/20 text-foreground";
                        } else if (isSelected) {
                          cls +=
                            " border-rose-400 dark:border-rose-600 bg-rose-100/60 dark:bg-rose-900/20 text-foreground";
                        } else {
                          cls +=
                            " border-border bg-card/40 text-muted-foreground";
                        }
                      } else {
                        if (isSelected) {
                          cls +=
                            " border-orange-400 dark:border-orange-500 bg-orange-50 dark:bg-orange-500/10 text-foreground";
                        } else {
                          cls +=
                            " border-border bg-card hover:border-orange-300 dark:hover:border-orange-600 hover:bg-muted/50 text-foreground";
                        }
                      }
                      const letter = String.fromCharCode(65 + idx);
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => selectAnswer(q.id, idx)}
                          disabled={submitted}
                          className={cls}
                        >
                          <span
                            className={`inline-flex items-center justify-center w-7 h-7 rounded-lg text-xs font-bold shrink-0 ${
                              submitted && isAnswer
                                ? "bg-emerald-500 text-white"
                                : submitted && isSelected
                                ? "bg-rose-500 text-white"
                                : isSelected
                                ? "bg-orange-500 text-white"
                                : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {letter}
                          </span>
                          <span className="leading-relaxed pt-0.5">{opt}</span>
                        </button>
                      );
                    })}
                  </div>

                  {submitted && q.explanation && (
                    <div className="mt-3">
                      <button
                        onClick={() => toggleExplanation(q.id)}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-orange-600 dark:text-orange-400 hover:underline"
                      >
                        {expOpen ? (
                          <>
                            <ChevronUp size={14} /> Hide explanation
                          </>
                        ) : (
                          <>
                            <ChevronDown size={14} /> Show explanation
                          </>
                        )}
                      </button>
                      <AnimatePresence initial={false}>
                        {expOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <p className="text-sm text-muted-foreground mt-2 leading-relaxed bg-muted/50 rounded-lg p-3">
                              {q.explanation}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Submit / Score */}
          {!submitted ? (
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
              <div className="text-xs text-muted-foreground">
                {allAnswered
                  ? "All set — submit when you're ready."
                  : `Answer ${
                      totalQuestions - answeredCount
                    } more question${
                      totalQuestions - answeredCount === 1 ? "" : "s"
                    } to submit.`}
              </div>
              <button
                onClick={submit}
                disabled={!allAnswered}
                className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-sm shadow transition-all ${
                  allAnswered
                    ? "bg-orange-500 text-white hover:bg-orange-600 hover:-translate-y-0.5"
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                }`}
              >
                Submit Answers <ChevronRight size={16} />
              </button>
            </div>
          ) : (
            <div className="rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500 text-white p-5 sm:p-6 shadow-md">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-white/85">
                    Your Score
                  </div>
                  <div className="text-3xl sm:text-4xl font-extrabold mt-1">
                    {score} <span className="text-xl text-white/85">
                      / {totalQuestions}
                    </span>
                    <span className="ml-3 text-lg font-bold text-white/95">
                      {scorePct}%
                    </span>
                  </div>
                  <p className="text-sm text-white/95 mt-1">
                    {scorePct >= 80
                      ? "Excellent — you're already absorbing these words from context."
                      : scorePct >= 50
                      ? "Solid start. The flashcards will lock in what's still fuzzy."
                      : "No worries — that's exactly why we study. Onward to the cards."}
                  </p>
                </div>
                <button
                  onClick={reset}
                  className="text-xs font-semibold px-3 py-2 rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur-sm transition"
                >
                  Try again
                </button>
              </div>
            </div>
          )}
        </section>

        {/* Continue CTA */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-sm">
          <div>
            <h3 className="text-base sm:text-lg font-extrabold text-foreground">
              Ready for the flashcards?
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              You'll now see each word's definition, examples, and synonyms.
            </p>
          </div>
          <button
            onClick={() => onContinue(firstWordId)}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-orange-500 text-white font-bold text-sm shadow hover:bg-orange-600 hover:-translate-y-0.5 transition-all whitespace-nowrap"
          >
            Continue to Flashcards <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
