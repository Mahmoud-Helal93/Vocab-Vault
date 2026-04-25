import { useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  BookOpen,
  Clock,
  Zap,
  CheckCircle2,
  XCircle,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Info,
  RotateCcw,
  Maximize2,
  Minimize2,
  Library,
  Award,
} from "lucide-react";
import { getSetReading, type ReadingQuestion } from "@/data/setReadings";
import { useApp } from "@/context/AppContext";
import vocabNinjaLogo from "@assets/Gemini_Generated_Image_tgtyf7tgtyf7tgty_1776986903352.png";

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

function renderPassage(
  passage: string,
  highlightWord: string | null,
) {
  const paragraphs = passage.split(/\n\n+/);
  return paragraphs.map((para, pi) => {
    const tokens = para.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
    return (
      <p
        key={pi}
        className="text-foreground leading-[1.95] text-[16px] sm:text-[17px] mb-5 last:mb-0"
      >
        {tokens.map((tok, ti) => {
          if (/^\*\*[^*]+\*\*$/.test(tok)) {
            const inner = tok.slice(2, -2);
            const lower = inner.toLowerCase();
            const isHL =
              highlightWord &&
              (lower === highlightWord ||
                lower.startsWith(highlightWord) ||
                highlightWord.startsWith(lower));
            return (
              <span
                key={ti}
                data-target-word={lower}
                className={`font-semibold text-orange-600 dark:text-orange-300 underline decoration-orange-400/60 decoration-2 underline-offset-4 px-0.5 rounded transition-colors ${
                  isHL
                    ? "bg-orange-200/80 dark:bg-orange-500/30 text-orange-700 dark:text-orange-200"
                    : ""
                }`}
              >
                {inner}
              </span>
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

function ExplorerArt() {
  return (
    <svg
      viewBox="0 0 320 220"
      className="w-full h-full pointer-events-none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FED7AA" />
          <stop offset="100%" stopColor="#FECACA" />
        </linearGradient>
        <linearGradient id="mtnFar" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C4B5FD" />
          <stop offset="100%" stopColor="#A78BFA" />
        </linearGradient>
        <linearGradient id="mtnNear" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FB923C" />
          <stop offset="100%" stopColor="#EA580C" />
        </linearGradient>
        <linearGradient id="cliff" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9A3412" />
          <stop offset="100%" stopColor="#7C2D12" />
        </linearGradient>
      </defs>

      {/* Sun */}
      <circle cx="240" cy="70" r="26" fill="#FEF3C7" opacity="0.9" />
      <circle cx="240" cy="70" r="18" fill="#FDE68A" />

      {/* Far mountains */}
      <path
        d="M0,160 L40,110 L80,140 L130,80 L180,130 L230,90 L280,135 L320,105 L320,220 L0,220 Z"
        fill="url(#mtnFar)"
        opacity="0.85"
      />
      {/* Near mountains */}
      <path
        d="M0,180 L60,130 L120,165 L170,120 L230,160 L290,130 L320,150 L320,220 L0,220 Z"
        fill="url(#mtnNear)"
        opacity="0.95"
      />

      {/* Birds */}
      <path d="M160 60 q5 -4 10 0 q5 -4 10 0" stroke="#7C2D12" strokeWidth="1.4" fill="none" />
      <path d="M195 50 q4 -3 8 0 q4 -3 8 0" stroke="#7C2D12" strokeWidth="1.2" fill="none" />

      {/* Cliff (foreground) */}
      <path d="M50,220 L50,170 Q60,160 80,162 L120,168 L120,220 Z" fill="url(#cliff)" />
      <ellipse cx="85" cy="167" rx="38" ry="5" fill="#451A03" opacity="0.4" />

      {/* Explorer figure on cliff */}
      {/* Backpack */}
      <rect x="78" y="132" width="14" height="20" rx="4" fill="#7C2D12" />
      {/* Body */}
      <rect x="82" y="138" width="10" height="22" rx="3" fill="#1E293B" />
      {/* Head */}
      <circle cx="87" cy="130" r="6" fill="#FED7AA" />
      {/* Hat */}
      <path d="M80,128 Q87,121 94,128 L94,131 L80,131 Z" fill="#7C2D12" />
      {/* Walking stick */}
      <line x1="98" y1="135" x2="104" y2="166" stroke="#78350F" strokeWidth="1.6" strokeLinecap="round" />
      {/* Legs */}
      <line x1="84" y1="160" x2="84" y2="168" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
      <line x1="90" y1="160" x2="90" y2="168" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function FlashcardArt() {
  return (
    <svg viewBox="0 0 120 110" className="w-full h-full" aria-hidden="true">
      <defs>
        <linearGradient id="cardA" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FB923C" />
          <stop offset="100%" stopColor="#F97316" />
        </linearGradient>
        <linearGradient id="cardB" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FBBF24" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
      </defs>
      <rect x="34" y="22" width="62" height="74" rx="10" fill="url(#cardB)" transform="rotate(8 65 60)" />
      <rect x="20" y="14" width="62" height="74" rx="10" fill="url(#cardA)" />
      <circle cx="92" cy="20" r="3" fill="#FDE68A" />
      <circle cx="100" cy="34" r="2" fill="#FDE68A" />
      <circle cx="14" cy="80" r="2.5" fill="#FB923C" opacity="0.6" />
    </svg>
  );
}

function StepIcon({
  step,
  active,
  done,
  color,
  Icon,
}: {
  step: number;
  active: boolean;
  done: boolean;
  color: "orange" | "violet" | "blue";
  Icon: React.ComponentType<{ size?: number }>;
}) {
  const ringMap = {
    orange:
      "border-orange-400 bg-orange-50 text-orange-600 dark:bg-orange-500/15 dark:text-orange-300 dark:border-orange-500/40",
    violet:
      "border-violet-400 bg-violet-50 text-violet-600 dark:bg-violet-500/15 dark:text-violet-300 dark:border-violet-500/40",
    blue:
      "border-blue-400 bg-blue-50 text-blue-600 dark:bg-blue-500/15 dark:text-blue-300 dark:border-blue-500/40",
  } as const;
  const dim =
    "border-border bg-muted/40 text-muted-foreground dark:bg-gray-800/40";
  return (
    <div
      className={`relative w-12 h-12 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
        active || done ? ringMap[color] : dim
      }`}
    >
      {done ? <CheckCircle2 size={20} /> : <Icon size={20} />}
      <span
        className={`absolute -top-1 -right-1 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center ${
          active || done
            ? "bg-white text-foreground border border-border shadow-sm"
            : "bg-muted text-muted-foreground"
        }`}
      >
        {step}
      </span>
    </div>
  );
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
  const [currentQ, setCurrentQ] = useState(0);
  const [focusMode, setFocusMode] = useState(false);
  const [highlightWord, setHighlightWord] = useState<string | null>(null);

  const storyRef = useRef<HTMLElement | null>(null);

  if (!reading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center space-y-3 max-w-md">
          <h1 className="text-xl font-bold text-foreground">
            No reading available for this set yet.
          </h1>
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

  const q = reading.questions[currentQ];
  const selected = answers[q.id] ?? null;
  const isCorrect = submitted && selected === q.correctIndex;
  const isWrong =
    submitted && selected !== null && selected !== q.correctIndex;

  const selectAnswer = (idx: number) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [q.id]: idx }));
  };

  const goPrev = () => setCurrentQ((i) => Math.max(0, i - 1));
  const goNext = () =>
    setCurrentQ((i) => Math.min(totalQuestions - 1, i + 1));

  const submit = () => {
    if (!allAnswered) return;
    setSubmitted(true);
  };

  const reset = () => {
    setAnswers({});
    setSubmitted(false);
    setCurrentQ(0);
  };

  const scrollToStory = () => {
    storyRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const onChipClick = (w: string) => {
    setHighlightWord(w);
    requestAnimationFrame(() => {
      const target = document.querySelector(
        `[data-target-word="${w}"]`,
      ) as HTMLElement | null;
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "center" });
      } else {
        scrollToStory();
      }
    });
    window.setTimeout(() => setHighlightWord(null), 2200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50/40 via-background to-orange-50/40 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 space-y-5">
        {/* ── Breadcrumb header ── */}
        <div className="flex items-center gap-3 text-sm">
          <button
            onClick={onBack}
            aria-label="Back"
            className="w-9 h-9 rounded-xl border border-border bg-card flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors shrink-0"
          >
            <ArrowLeft size={16} />
          </button>
          <nav className="flex items-center gap-1.5 text-muted-foreground font-medium flex-wrap">
            <span className="text-foreground font-semibold">
              Mission {missionDay}
            </span>
            <span className="text-muted-foreground/60">/</span>
            <span className="text-foreground font-semibold">Set {group}</span>
            <span className="text-muted-foreground/60">/</span>
            <span className="text-orange-600 dark:text-orange-400 font-semibold">
              Pre-Read
            </span>
          </nav>
        </div>

        {/* ── Two-column grid ── */}
        <div
          className={`grid gap-5 ${
            focusMode ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-[1fr_360px]"
          }`}
        >
          {/* ── LEFT COLUMN ── */}
          <div className="space-y-5 min-w-0">
            {/* Hero card */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative overflow-hidden rounded-3xl shadow-md"
              style={{
                background:
                  "linear-gradient(125deg, #FED7AA 0%, #FDBA74 45%, #FCA5A5 100%)",
              }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-[1fr_220px] gap-4 p-6 sm:p-7 items-center">
                <div className="space-y-3 relative z-10 min-w-0">
                  <div className="w-12 h-12 rounded-2xl bg-white/85 backdrop-blur flex items-center justify-center shadow-sm">
                    <BookOpen size={22} className="text-orange-600" />
                  </div>
                  <h2 className="text-2xl sm:text-[28px] font-extrabold leading-tight text-orange-950">
                    {reading.title}
                  </h2>
                  <p className="text-sm sm:text-[15px] text-orange-950/85 leading-relaxed max-w-md">
                    {reading.subtitle}
                  </p>
                  <div className="pt-1">
                    <button
                      onClick={scrollToStory}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-600 text-white font-bold text-sm shadow-md hover:bg-orange-700 hover:-translate-y-0.5 transition-all"
                    >
                      <BookOpen size={16} />
                      Start Reading
                    </button>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 pt-1 text-xs sm:text-sm font-semibold text-orange-950/85">
                    <span className="inline-flex items-center gap-1.5">
                      <Clock size={14} /> {reading.readingMinutes} min read
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Zap size={14} className="text-amber-700" /> +20 XP
                    </span>
                  </div>
                </div>
                <div className="hidden sm:block h-44 ml-auto w-full max-w-[220px]">
                  <ExplorerArt />
                </div>
              </div>
            </motion.div>

            {/* Words chips card */}
            <div className="rounded-2xl border border-border bg-card px-5 py-4 shadow-sm">
              <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                <div className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
                  Words you'll encounter in this story
                  <Info size={13} className="text-muted-foreground" />
                </div>
                <span className="text-xs text-muted-foreground italic">
                  Tap a word to preview
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {reading.words.map((w) => (
                  <button
                    key={w}
                    type="button"
                    onClick={() => onChipClick(w)}
                    className={`group inline-flex items-center gap-1.5 text-sm font-semibold px-3 py-1.5 rounded-full border transition-all ${
                      highlightWord === w
                        ? "border-orange-400 bg-orange-50 text-orange-700 dark:bg-orange-500/15 dark:border-orange-500/40 dark:text-orange-300 shadow-sm"
                        : "border-border bg-background hover:border-emerald-300 hover:bg-emerald-50/50 dark:hover:bg-emerald-500/10 text-foreground"
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                    {w}
                  </button>
                ))}
              </div>
            </div>

            {/* Story card */}
            <article
              ref={(el) => {
                storyRef.current = el;
              }}
              className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm scroll-mt-6"
            >
              <div className="flex items-start justify-between gap-4 mb-4 flex-wrap">
                <h2 className="text-xl sm:text-2xl font-extrabold text-foreground">
                  {reading.title}
                </h2>
                <div className="flex items-center gap-3">
                  <label className="inline-flex items-center gap-2 cursor-pointer select-none text-xs font-semibold text-muted-foreground">
                    <span>Focus Mode</span>
                    <span
                      onClick={() => setFocusMode((v) => !v)}
                      className={`relative w-10 h-5 rounded-full transition-colors ${
                        focusMode
                          ? "bg-orange-500"
                          : "bg-muted border border-border"
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${
                          focusMode ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </span>
                  </label>
                  <button
                    onClick={() => setFocusMode((v) => !v)}
                    aria-label="Toggle focus mode"
                    className="w-8 h-8 rounded-lg border border-border bg-background flex items-center justify-center text-muted-foreground hover:bg-muted transition"
                  >
                    {focusMode ? (
                      <Minimize2 size={14} />
                    ) : (
                      <Maximize2 size={14} />
                    )}
                  </button>
                </div>
              </div>
              <div className="prose-reading">
                {renderPassage(reading.passage, highlightWord)}
              </div>
              <div className="mt-6 pt-5 border-t border-border text-center text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <ChevronRight size={12} className="rotate-90" />
                  Scroll to continue reading
                </span>
              </div>
            </article>
          </div>

          {/* ── RIGHT COLUMN ── */}
          {!focusMode && (
            <aside className="space-y-5 lg:sticky lg:top-4 lg:self-start min-w-0">
              {/* Learning Journey */}
              <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                <h3 className="text-sm font-bold text-foreground mb-4">
                  Your learning journey
                </h3>
                <div className="relative flex items-start justify-between gap-2">
                  {/* connector line */}
                  <div
                    className="absolute top-6 left-8 right-8 h-0.5 bg-gradient-to-r from-orange-300 via-violet-300 to-blue-300 dark:from-orange-500/30 dark:via-violet-500/30 dark:to-blue-500/30"
                    aria-hidden
                  />
                  {[
                    {
                      n: 1,
                      title: "Read the Story",
                      sub: "Understand the context and flow",
                      color: "orange" as const,
                      Icon: BookOpen,
                      active: true,
                      done: false,
                    },
                    {
                      n: 2,
                      title: "Learn the Words",
                      sub: "Master the 10 new vocabulary words",
                      color: "violet" as const,
                      Icon: Library,
                      active: false,
                      done: false,
                    },
                    {
                      n: 3,
                      title: "Test Yourself",
                      sub: "Review and test your knowledge",
                      color: "blue" as const,
                      Icon: Award,
                      active: false,
                      done: false,
                    },
                  ].map((s) => (
                    <div
                      key={s.n}
                      className="relative flex flex-col items-center text-center flex-1 min-w-0"
                    >
                      <StepIcon
                        step={s.n}
                        active={s.active}
                        done={s.done}
                        color={s.color}
                        Icon={s.Icon}
                      />
                      <div className="mt-2 text-xs font-bold text-foreground leading-tight">
                        {s.n}. {s.title}
                      </div>
                      <div className="text-[11px] text-muted-foreground leading-snug mt-1 px-1">
                        {s.sub}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Comprehension Check */}
              <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                  <h3 className="text-sm font-bold text-foreground">
                    Comprehension Check
                  </h3>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {reading.questions.map((qq, qi) => {
                        const ans = answers[qq.id];
                        const answered =
                          ans !== null && ans !== undefined;
                        const correct =
                          submitted && ans === qq.correctIndex;
                        const wrong =
                          submitted &&
                          answered &&
                          ans !== qq.correctIndex;
                        const isCur = qi === currentQ;
                        return (
                          <button
                            key={qi}
                            onClick={() => setCurrentQ(qi)}
                            className={`w-2 h-2 rounded-full transition-all ${
                              isCur
                                ? "ring-2 ring-orange-300 dark:ring-orange-500/40 ring-offset-1 ring-offset-card "
                                : ""
                            }${
                              correct
                                ? "bg-emerald-500"
                                : wrong
                                ? "bg-rose-500"
                                : answered
                                ? "bg-orange-500"
                                : isCur
                                ? "bg-orange-400"
                                : "bg-muted-foreground/30"
                            }`}
                            aria-label={`Question ${qi + 1}`}
                          />
                        );
                      })}
                    </div>
                    <span className="text-xs text-muted-foreground tabular-nums">
                      Question {currentQ + 1} of {totalQuestions}
                    </span>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={q.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.15 }}
                  >
                    <div className="text-[10px] font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400 mb-1">
                      {KIND_LABELS[q.kind]}
                    </div>
                    {q.quote && (
                      <blockquote className="border-l-4 border-orange-400 dark:border-orange-500 pl-3 py-1 text-xs italic text-muted-foreground mb-3 leading-relaxed">
                        {q.quote}
                      </blockquote>
                    )}
                    <p className="text-sm text-foreground font-medium mb-3 leading-relaxed">
                      <span className="text-muted-foreground font-semibold mr-1">
                        {currentQ + 1}.
                      </span>
                      {q.prompt}
                    </p>

                    <div className="space-y-2">
                      {q.options.map((opt, idx) => {
                        const isSelected = selected === idx;
                        const isAnswer = idx === q.correctIndex;
                        let cls =
                          "w-full text-left rounded-xl border px-3 py-2.5 text-sm transition-colors flex items-start gap-3";
                        if (submitted) {
                          if (isAnswer) {
                            cls +=
                              " border-emerald-400 dark:border-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 text-foreground";
                          } else if (isSelected) {
                            cls +=
                              " border-rose-400 dark:border-rose-600 bg-rose-50 dark:bg-rose-900/20 text-foreground";
                          } else {
                            cls +=
                              " border-border bg-background text-muted-foreground";
                          }
                        } else {
                          if (isSelected) {
                            cls +=
                              " border-orange-400 dark:border-orange-500 bg-orange-50 dark:bg-orange-500/10 text-foreground";
                          } else {
                            cls +=
                              " border-border bg-background hover:border-orange-300 dark:hover:border-orange-600 hover:bg-muted/40 text-foreground";
                          }
                        }
                        const letter = String.fromCharCode(65 + idx);
                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => selectAnswer(idx)}
                            disabled={submitted}
                            className={cls}
                          >
                            <span
                              className={`inline-flex items-center justify-center w-6 h-6 rounded-md text-[11px] font-bold shrink-0 ${
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
                            <span className="leading-snug pt-0.5">{opt}</span>
                          </button>
                        );
                      })}
                    </div>

                    {submitted && q.explanation && (
                      <div
                        className={`mt-3 text-xs p-3 rounded-lg leading-relaxed ${
                          isCorrect
                            ? "bg-emerald-50 dark:bg-emerald-900/15 text-emerald-900 dark:text-emerald-200"
                            : "bg-rose-50 dark:bg-rose-900/15 text-rose-900 dark:text-rose-200"
                        }`}
                      >
                        <div className="font-bold uppercase tracking-wider text-[10px] mb-1 inline-flex items-center gap-1">
                          {isCorrect ? (
                            <>
                              <CheckCircle2 size={12} /> Correct
                            </>
                          ) : (
                            <>
                              <XCircle size={12} /> Not quite
                            </>
                          )}
                        </div>
                        <div>{q.explanation}</div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Nav */}
                <div className="flex items-center justify-between gap-2 mt-4 pt-4 border-t border-border">
                  <button
                    onClick={goPrev}
                    disabled={currentQ === 0}
                    className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-2 rounded-lg border border-border bg-background text-foreground disabled:opacity-40 disabled:cursor-not-allowed hover:bg-muted transition"
                  >
                    <ChevronLeft size={14} /> Prev
                  </button>
                  {currentQ < totalQuestions - 1 ? (
                    <button
                      onClick={goNext}
                      className="inline-flex items-center gap-1 text-xs font-bold px-3 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition"
                    >
                      Next <ChevronRight size={14} />
                    </button>
                  ) : !submitted ? (
                    <button
                      onClick={submit}
                      disabled={!allAnswered}
                      className={`inline-flex items-center gap-1 text-xs font-bold px-3 py-2 rounded-lg transition ${
                        allAnswered
                          ? "bg-orange-500 text-white hover:bg-orange-600"
                          : "bg-muted text-muted-foreground cursor-not-allowed"
                      }`}
                    >
                      Submit <ChevronRight size={14} />
                    </button>
                  ) : (
                    <button
                      onClick={reset}
                      className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-2 rounded-lg border border-border bg-background text-foreground hover:bg-muted transition"
                    >
                      <RotateCcw size={12} /> Try again
                    </button>
                  )}
                </div>

                {submitted && (
                  <div className="mt-4 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 text-white p-3 text-center">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-white/85">
                      Your Score
                    </div>
                    <div className="text-xl font-extrabold mt-0.5">
                      {score} / {totalQuestions}
                      <span className="ml-2 text-sm text-white/95">
                        {scorePct}%
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Ready CTA card */}
              <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                <div className="grid grid-cols-[1fr_84px] gap-3 items-center">
                  <div>
                    <h3 className="text-sm font-extrabold text-foreground leading-tight">
                      Ready to learn these words?
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1 leading-snug">
                      Let's master these {reading.words.length} words with
                      interactive flashcards.
                    </p>
                  </div>
                  <div className="relative h-20">
                    <div className="absolute inset-0">
                      <FlashcardArt />
                    </div>
                    <img
                      src={vocabNinjaLogo}
                      alt=""
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 h-9 w-auto object-contain drop-shadow"
                      aria-hidden
                    />
                  </div>
                </div>
                <div className="mt-3 space-y-2">
                  <button
                    onClick={() => onContinue(firstWordId)}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-orange-500 text-white font-bold text-sm shadow hover:bg-orange-600 hover:-translate-y-0.5 transition-all"
                  >
                    Start Learning Flashcards <ChevronRight size={16} />
                  </button>
                  <button
                    onClick={scrollToStory}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-background border border-border text-foreground font-semibold text-sm hover:bg-muted transition-all"
                  >
                    <RotateCcw size={14} /> Review Story Again
                  </button>
                </div>
              </div>
            </aside>
          )}
        </div>

        {/* When focus mode is on, surface a slim CTA at the bottom */}
        {focusMode && (
          <div className="rounded-2xl border border-border bg-card p-4 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="text-sm text-muted-foreground">
              Focus mode is on — comprehension and CTA are hidden. Toggle off
              to see them.
            </div>
            <button
              onClick={() => setFocusMode(false)}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-orange-500 text-white font-bold text-sm hover:bg-orange-600 transition"
            >
              Exit focus mode
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
