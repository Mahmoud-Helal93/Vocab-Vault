import { useEffect, useMemo, useRef, useState } from "react";
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
} from "lucide-react";
import { getSetReading, type ReadingQuestion } from "@/data/setReadings";
import { useApp } from "@/context/AppContext";
import { recordAttempt } from "@/lib/storyAttempts";

interface SetReadingProps {
  onBack: () => void;
  onContinue: (firstWordId: string | null) => void;
  onNavigate?: (page: string, params?: Record<string, unknown>) => void;
  missionDay: number;
  group: number;
  libraryMode?: boolean;
}

const KIND_LABELS: Record<ReadingQuestion["kind"], string> = {
  "vocab-context": "Vocabulary in Context",
  "tone-purpose": "Author's Tone & Purpose",
  inference: "Inference",
  substitution: "Word Substitution",
  "main-idea": "Main Idea",
};

type PassageSize = "sm" | "md" | "lg";

const PASSAGE_SIZE_CLASS: Record<PassageSize, string> = {
  sm: "text-[14px] sm:text-[15px] leading-[1.85]",
  md: "text-[16px] sm:text-[17px] leading-[1.95]",
  lg: "text-[19px] sm:text-[21px] leading-[2.05]",
};

function renderPassage(
  passage: string,
  highlightWord: string | null,
  size: PassageSize,
  openPopoverKey: string | null,
  onWordTap: (key: string, word: string) => void,
  wordInfoMap: Record<string, { pos: string; definition: string }>,
) {
  const paragraphs = passage.split(/\n\n+/);
  const sizeCls = PASSAGE_SIZE_CLASS[size];
  return paragraphs.map((para, pi) => {
    const tokens = para.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
    return (
      <p
        key={pi}
        className={`text-foreground ${sizeCls} mb-5 last:mb-0`}
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
            const wordKey = `${pi}-${ti}`;
            const isOpen = openPopoverKey === wordKey;
            const info = wordInfoMap[lower];
            return (
              <span
                key={ti}
                className="relative inline-block align-baseline"
              >
                <button
                  type="button"
                  data-passage-word={lower}
                  data-target-word={lower}
                  onClick={(e) => {
                    e.stopPropagation();
                    onWordTap(wordKey, lower);
                  }}
                  aria-expanded={isOpen}
                  aria-label={`Show definition of ${inner}`}
                  className={`font-semibold text-orange-600 dark:text-orange-300 underline decoration-orange-400/60 decoration-2 underline-offset-4 px-0.5 rounded cursor-pointer transition-colors hover:bg-orange-100/70 dark:hover:bg-orange-500/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300 dark:focus-visible:ring-orange-500/40 ${
                    isOpen || isHL
                      ? "bg-orange-200/80 dark:bg-orange-500/30 text-orange-700 dark:text-orange-200"
                      : ""
                  }`}
                >
                  {inner}
                </button>
                {isOpen && (
                  <span
                    role="dialog"
                    data-passage-popover
                    onClick={(e) => e.stopPropagation()}
                    className="absolute z-30 left-0 top-full mt-2 w-72 max-w-[80vw] rounded-xl border border-border bg-popover text-popover-foreground shadow-xl p-3 text-left not-italic font-normal block"
                  >
                    <span
                      className="absolute -top-1.5 left-5 w-3 h-3 rotate-45 bg-popover border-l border-t border-border block"
                      aria-hidden
                    />
                    <span className="flex items-baseline gap-2 mb-1.5">
                      <span className="text-base font-extrabold text-foreground">
                        {lower}
                      </span>
                      {info?.pos && (
                        <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground italic">
                          {info.pos}
                        </span>
                      )}
                    </span>
                    <span className="text-xs leading-relaxed text-foreground/90 block">
                      {info?.definition ??
                        "Definition will appear in the flashcards."}
                    </span>
                  </span>
                )}
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

export default function SetReading({
  onBack,
  onContinue,
  onNavigate,
  missionDay,
  group,
  libraryMode = false,
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
  const [highlightWord, setHighlightWord] = useState<string | null>(null);
  const [previewWord, setPreviewWord] = useState<string | null>(null);
  const [passageSize, setPassageSize] = useState<PassageSize>("md");
  const [passagePopoverKey, setPassagePopoverKey] = useState<string | null>(
    null,
  );

  const storyRef = useRef<HTMLElement | null>(null);
  const chipsContainerRef = useRef<HTMLDivElement | null>(null);
  const readyCtaRef = useRef<HTMLDivElement | null>(null);

  const wordInfoMap = useMemo(() => {
    const map: Record<string, { pos: string; definition: string }> = {};
    for (const w of setWords) {
      map[w.word.toLowerCase()] = { pos: w.pos, definition: w.definition };
    }
    return map;
  }, [setWords]);

  useEffect(() => {
    if (!previewWord) return;
    const handler = (e: MouseEvent) => {
      const t = e.target as Node | null;
      if (chipsContainerRef.current && t && !chipsContainerRef.current.contains(t)) {
        setPreviewWord(null);
      }
    };
    const keyHandler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPreviewWord(null);
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("keydown", keyHandler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("keydown", keyHandler);
    };
  }, [previewWord]);

  useEffect(() => {
    if (!passagePopoverKey) return;
    const handler = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      if (t.closest("[data-passage-word], [data-passage-popover]")) return;
      setPassagePopoverKey(null);
    };
    const keyHandler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPassagePopoverKey(null);
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("keydown", keyHandler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("keydown", keyHandler);
    };
  }, [passagePopoverKey]);

  const onPassageWordTap = (key: string, word: string) => {
    setPassagePopoverKey((prev) => {
      const next = prev === key ? null : key;
      setHighlightWord(next ? word : null);
      return next;
    });
  };

  if (!reading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center space-y-3 max-w-md">
          <h1 className="text-xl font-bold text-foreground">
            No reading available for this set yet.
          </h1>
          <button
            onClick={() => onContinue(firstWordId)}
            className="btn-brand inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm"
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
    if (!allAnswered || !reading) return;
    const finalScore = reading.questions.reduce(
      (acc, qq) => acc + (answers[qq.id] === qq.correctIndex ? 1 : 0),
      0,
    );
    recordAttempt(missionDay, group, {
      score: finalScore,
      total: reading.questions.length,
      attemptedAt: Date.now(),
    });
    setSubmitted(true);
    requestAnimationFrame(() => {
      readyCtaRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    });
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
    setPreviewWord((prev) => {
      const next = prev === w ? null : w;
      setHighlightWord(next);
      return next;
    });
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
            {libraryMode ? (
              <>
                <button
                  type="button"
                  onClick={() => onNavigate?.("story-library")}
                  className="text-foreground font-semibold hover:underline hover:text-foreground/80 transition-colors"
                >
                  Story Library
                </button>
                <span className="text-muted-foreground/60">/</span>
                <span
                  className="text-foreground font-semibold"
                  aria-current="page"
                >
                  Mission {missionDay} · Set {group}
                </span>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => onNavigate?.("mission-detail", { missionDay })}
                  className="text-foreground font-semibold hover:underline hover:text-foreground/80 transition-colors"
                >
                  Mission {missionDay}
                </button>
                <span className="text-muted-foreground/60">/</span>
                <span
                  className="text-foreground font-semibold"
                  aria-current="page"
                >
                  Set {group}
                </span>
                <span className="text-muted-foreground/60">/</span>
                <span
                  className="text-orange-600 dark:text-orange-400 font-semibold"
                  aria-current="page"
                >
                  Pre-Read
                </span>
              </>
            )}
          </nav>
        </div>

        {/* ── Main column (full width) ── */}
        <div className="space-y-5 min-w-0">
          {/* Merged hero + CTA banner */}
          <motion.div
            ref={readyCtaRef}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-3xl border border-orange-200/70 dark:border-orange-500/20 bg-orange-50/70 dark:bg-orange-500/5 shadow-sm scroll-mt-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-[1fr_minmax(240px,280px)] gap-5 md:gap-6 p-6 sm:p-7 items-center">
              {/* Left: title + meta */}
              <div className="space-y-3 min-w-0">
                <div className="w-11 h-11 rounded-xl bg-white dark:bg-card flex items-center justify-center shadow-sm border border-orange-100 dark:border-orange-500/20">
                  <BookOpen
                    size={20}
                    style={{ color: "hsl(var(--brand-orange))" }}
                  />
                </div>
                <h2 className="text-2xl sm:text-[28px] font-extrabold leading-tight text-foreground">
                  {reading.title}
                </h2>
                <p className="text-sm sm:text-[15px] text-muted-foreground leading-relaxed max-w-md">
                  {reading.subtitle}
                </p>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1 text-xs sm:text-sm font-semibold text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <Clock size={14} /> {reading.readingMinutes} min read
                  </span>
                  {!libraryMode && (
                    <span className="inline-flex items-center gap-1.5">
                      <Zap size={14} className="text-amber-500" /> +20 XP
                    </span>
                  )}
                  <span className="text-orange-600 dark:text-orange-400 font-bold">
                    {libraryMode
                      ? "Library · Re-read & Practice"
                      : "Step 1 of 3 · Pre-Read"}
                  </span>
                </div>
              </div>

              {/* Right: CTAs */}
              <div className="flex flex-col gap-2.5 w-full">
                {libraryMode ? (
                  <>
                    <button
                      onClick={scrollToStory}
                      className="btn-brand w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-sm shadow-md"
                    >
                      <BookOpen size={16} /> Read Story
                    </button>
                    <button
                      onClick={() => onNavigate?.("story-library")}
                      className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-card border border-border text-foreground font-semibold text-sm hover:bg-muted transition-all"
                    >
                      <ArrowLeft size={14} /> Back to Library
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => onContinue(firstWordId)}
                      className="btn-brand w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-sm shadow-md"
                    >
                      Start Learning Flashcards <ChevronRight size={16} />
                    </button>
                    <button
                      onClick={scrollToStory}
                      className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-card border border-border text-foreground font-semibold text-sm hover:bg-muted transition-all"
                    >
                      <RotateCcw size={14} /> Review Story Again
                    </button>
                  </>
                )}
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
              <div ref={chipsContainerRef} className="flex flex-wrap gap-2">
                {reading.words.map((w) => {
                  const isOpen = previewWord === w;
                  const info = wordInfoMap[w];
                  return (
                    <div key={w} className="relative">
                      <button
                        type="button"
                        onClick={() => onChipClick(w)}
                        aria-expanded={isOpen}
                        className={`group inline-flex items-center gap-1.5 text-sm font-semibold px-3 py-1.5 rounded-full border transition-all ${
                          isOpen || highlightWord === w
                            ? "border-orange-400 bg-orange-50 text-orange-700 dark:bg-orange-500/15 dark:border-orange-500/40 dark:text-orange-300 shadow-sm"
                            : "border-border bg-background hover:border-emerald-300 hover:bg-emerald-50/50 dark:hover:bg-emerald-500/10 text-foreground"
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                        {w}
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -4, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -4, scale: 0.98 }}
                            transition={{ duration: 0.12 }}
                            role="dialog"
                            className="absolute z-30 left-0 top-full mt-2 w-72 max-w-[80vw] rounded-xl border border-border bg-popover text-popover-foreground shadow-xl p-3"
                          >
                            <div
                              className="absolute -top-1.5 left-5 w-3 h-3 rotate-45 bg-popover border-l border-t border-border"
                              aria-hidden
                            />
                            <div className="flex items-baseline gap-2 mb-1.5">
                              <span className="text-base font-extrabold text-foreground">
                                {w}
                              </span>
                              {info?.pos && (
                                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground italic">
                                  {info.pos}
                                </span>
                              )}
                            </div>
                            <p className="text-xs leading-relaxed text-foreground/90">
                              {info?.definition ??
                                "Definition will appear in the flashcards."}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
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
                  <div
                    role="group"
                    aria-label="Adjust passage font size"
                    className="inline-flex items-stretch rounded-lg border border-border bg-background overflow-hidden"
                  >
                    {(
                      [
                        { id: "sm", label: "Small", cls: "text-[13px]" },
                        { id: "md", label: "Medium", cls: "text-[16px]" },
                        { id: "lg", label: "Large", cls: "text-[20px]" },
                      ] as { id: PassageSize; label: string; cls: string }[]
                    ).map((s, i) => {
                      const active = passageSize === s.id;
                      return (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => setPassageSize(s.id)}
                          aria-label={`${s.label} text`}
                          aria-pressed={active}
                          title={`${s.label} text`}
                          className={`w-8 h-8 flex items-center justify-center font-extrabold leading-none transition ${
                            i > 0 ? "border-l border-border" : ""
                          } ${
                            active
                              ? "bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-300"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground"
                          }`}
                        >
                          <span className={s.cls}>A</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="prose-reading">
                {renderPassage(
                  reading.passage,
                  highlightWord,
                  passageSize,
                  passagePopoverKey,
                  onPassageWordTap,
                  wordInfoMap,
                )}
              </div>
              <div className="mt-6 pt-5 border-t border-border text-center text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <ChevronRight size={12} className="rotate-90" />
                  Scroll to continue reading
                </span>
              </div>
            </article>
          </div>

        {/* ── Comprehension Check (full width, below the story) ── */}
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
                      className="btn-brand inline-flex items-center gap-1 text-xs font-bold px-3 py-2 rounded-lg"
                    >
                      Next <ChevronRight size={14} />
                    </button>
                  ) : !submitted ? (
                    <button
                      onClick={submit}
                      disabled={!allAnswered}
                      className={`inline-flex items-center gap-1 text-xs font-bold px-3 py-2 rounded-lg transition ${
                        allAnswered
                          ? "btn-brand"
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
                  <div className="mt-4 rounded-xl bg-brand-gradient text-white p-3 text-center">
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
      </div>
    </div>
  );
}
