import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { shuffleArray, isCloseEnough, getDifficultWords, levenshteinDistance } from "@/lib/srs";
import { Word, TOTAL_DAYS } from "@/data/words";
import { addMistake, generateSessionId, addSession, StudySession, SessionMistake } from "@/lib/storage";
import {
  ArrowLeft, CheckCircle2, XCircle, ChevronRight, Target, RotateCcw, ListChecks,
  Keyboard, HelpCircle, BookOpenText, Bookmark,
} from "lucide-react";

type QuestionType = "multiple-choice" | "fill-blank" | "true-false" | "cloze";
type SourceType = "all" | "day" | "difficult" | "bookmarked";

interface PracticeConfig {
  questionTypes: QuestionType[];
  source: SourceType;
  day?: number;
}

interface Question {
  word: Word;
  type: QuestionType;
  // MC
  choices?: string[];
  correctIndex?: number;
  // TF
  tfWord?: Word;
  isTrue?: boolean;
  // Cloze
  clozesentence?: string;
  clozeChoices?: string[];
  clozeCorrectIndex?: number;
}

interface PracticeModeProps {
  onBack: () => void;
  initialSource?: string;
}

function replaceWordInSentence(sentence: string, word: string): string {
  const suffixes = ["tion", "ness", "ment", "ing", "ed", "ly", "al", "ous", "ive", "er", "est", "s"];
  let result = sentence;
  // Try the word itself first (case-insensitive)
  const directRegex = new RegExp(`\\b${word}\\b`, "gi");
  if (directRegex.test(result)) {
    return result.replace(new RegExp(`\\b${word}\\b`, "gi"), "___________");
  }
  // Try root + common suffixes
  const root = word.length > 4 ? word.slice(0, word.length - 1) : word;
  for (const suffix of suffixes) {
    const variant = new RegExp(`\\b${root}${suffix}\\b`, "gi");
    if (variant.test(result)) {
      return result.replace(variant, "___________");
    }
  }
  // Try 4-char prefix
  const prefix = word.slice(0, 4);
  const prefixRegex = new RegExp(`\\b${prefix}\\w*\\b`, "gi");
  if (prefixRegex.test(result)) {
    return result.replace(prefixRegex, "___________");
  }
  return result;
}

function buildQuestions(pool: Word[], allWords: Word[], config: PracticeConfig): Question[] {
  return shuffleArray(pool).map((word) => {
    const types = config.questionTypes;
    const type = types[Math.floor(Math.random() * types.length)];

    if (type === "multiple-choice") {
      const distractors = shuffleArray(allWords.filter((w) => w.id !== word.id)).slice(0, 3);
      const choices = shuffleArray([word, ...distractors]);
      return {
        word, type,
        choices: choices.map((c) => c.word),
        correctIndex: choices.findIndex((c) => c.id === word.id),
      };
    }

    if (type === "true-false") {
      const isTrue = Math.random() > 0.5;
      const tfWord = isTrue ? word : shuffleArray(allWords.filter((w) => w.id !== word.id))[0];
      return { word, type, isTrue, tfWord };
    }

    if (type === "cloze") {
      const sentence = word.examples[Math.floor(Math.random() * 3)];
      const clozesentence = replaceWordInSentence(sentence, word.word);
      // distractors from same day/group
      const pool2 = allWords.filter(
        (w) => w.id !== word.id && (w.day === word.day || w.group === word.group)
      );
      const distractors = shuffleArray(pool2).slice(0, 3);
      const allChoices = shuffleArray([word, ...distractors.slice(0, 3)]);
      return {
        word, type,
        clozesentence,
        clozeChoices: allChoices.map((c) => c.word),
        clozeCorrectIndex: allChoices.findIndex((c) => c.id === word.id),
      };
    }

    return { word, type };
  });
}

function classifyError(
  type: QuestionType,
  userAnswer: string,
  correctAnswer: string,
  userWord: Word | undefined,
  correctWord: Word
): SessionMistake["errorType"] {
  if (type === "cloze") return "context";
  if (type === "fill-blank") {
    const dist = levenshteinDistance(userAnswer.toLowerCase(), correctAnswer.toLowerCase());
    return dist <= 3 ? "confused_with" : "spelling";
  }
  if (type === "multiple-choice") {
    if (userWord && userWord.pos === correctWord.pos) return "wrong_definition";
    return "wrong_pos";
  }
  return "wrong_definition";
}

function PracticeModeInner({ onBack, initialSource }: PracticeModeProps) {
  const { words, markWordReviewed, settings, bookmarks } = useApp();
  const [phase, setPhase] = useState<"config" | "session" | "results">("config");
  const [config, setConfig] = useState<PracticeConfig>({
    questionTypes: ["multiple-choice"],
    source:
      initialSource === "difficult"
        ? "difficult"
        : initialSource === "bookmarked"
        ? "bookmarked"
        : "all",
    day: 1,
  });
  const [questions, setQuestions] = useState<Question[]>([]);
  const [qIndex, setQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState<null | "correct" | "wrong">(null);
  const [fillInput, setFillInput] = useState("");
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [selectedTF, setSelectedTF] = useState<boolean | null>(null);
  const [timerLeft, setTimerLeft] = useState(settings.timerSeconds);
  const [sessionMistakes, setSessionMistakes] = useState<SessionMistake[]>([]);
  const [sessionStart, setSessionStart] = useState(Date.now());
  const fillRef = useRef<HTMLInputElement>(null);
  const sessionId = useRef(generateSessionId());

  const currentQ = questions[qIndex];
  const totalQ = questions.length;

  useEffect(() => {
    if (!settings.timerEnabled || phase !== "session" || showFeedback) return;
    if (timerLeft <= 0) { handleSubmitAnswer(false, ""); return; }
    const id = setTimeout(() => setTimerLeft((t) => t - 1), 1000);
    return () => clearTimeout(id);
  }, [timerLeft, phase, showFeedback, settings.timerEnabled]);

  const buildPool = useCallback((): Word[] => {
    if (config.source === "difficult") return getDifficultWords(words);
    if (config.source === "day") return words.filter((w) => w.day === config.day);
    if (config.source === "bookmarked") {
      const ids = new Set(bookmarks.map((b) => b.wordId));
      return words.filter((w) => ids.has(w.id));
    }
    return words;
  }, [config, words, bookmarks]);

  const startSession = () => {
    const pool = buildPool();
    if (pool.length === 0) return;
    const qs = buildQuestions(pool, words, config);
    sessionId.current = generateSessionId();
    setQuestions(qs);
    setQIndex(0);
    setScore(0);
    setShowFeedback(null);
    setFillInput("");
    setSelectedChoice(null);
    setSelectedTF(null);
    setTimerLeft(settings.timerSeconds);
    setSessionMistakes([]);
    setSessionStart(Date.now());
    setPhase("session");
  };

  const handleSubmitAnswer = useCallback(
    (isCorrect: boolean, userAnswer: string) => {
      setShowFeedback(isCorrect ? "correct" : "wrong");
      if (isCorrect) {
        setScore((s) => s + 1);
        markWordReviewed(currentQ.word.id, 4);
      } else {
        markWordReviewed(currentQ.word.id, 1);
        const correctAnswer = currentQ.word.word;
        const userWordObj = words.find((w) => w.word.toLowerCase() === userAnswer.toLowerCase());
        const errorType = classifyError(currentQ.type, userAnswer, correctAnswer, userWordObj, currentQ.word);
        const mistake: SessionMistake = {
          word: currentQ.word.word,
          questionType: currentQ.type === "multiple-choice" ? "mc"
            : currentQ.type === "fill-blank" ? "fb"
            : currentQ.type === "true-false" ? "tf" : "cloze",
          userAnswer,
          correctAnswer,
          errorType,
        };
        setSessionMistakes((prev) => [...prev, mistake]);
        addMistake({ wordId: currentQ.word.id, word: currentQ.word.word, timestamp: Date.now(), questionType: currentQ.type });
      }
    },
    [currentQ, markWordReviewed, words]
  );

  const handleNext = () => {
    if (qIndex + 1 >= totalQ) {
      // Save session
      const correct = score + (showFeedback === "correct" ? 0 : 0);
      const session: StudySession = {
        sessionId: sessionId.current,
        date: new Date().toISOString(),
        wordsReviewed: questions.map((q) => q.word.word),
        mistakes: sessionMistakes,
        accuracy: Math.round((score / totalQ) * 100),
        durationSeconds: Math.round((Date.now() - sessionStart) / 1000),
      };
      addSession(session);
      setPhase("results");
    } else {
      setQIndex((i) => i + 1);
      setShowFeedback(null);
      setFillInput("");
      setSelectedChoice(null);
      setSelectedTF(null);
      setTimerLeft(settings.timerSeconds);
      setTimeout(() => fillRef.current?.focus(), 100);
    }
  };

  const handleMCAnswer = (idx: number) => {
    if (showFeedback) return;
    setSelectedChoice(idx);
    const isCorrect = idx === currentQ.correctIndex;
    handleSubmitAnswer(isCorrect, currentQ.choices?.[idx] ?? "");
  };

  const handleTFAnswer = (answer: boolean) => {
    if (showFeedback) return;
    setSelectedTF(answer);
    handleSubmitAnswer(answer === currentQ.isTrue, answer ? "true" : "false");
  };

  const handleFillSubmit = () => {
    if (showFeedback || !fillInput.trim()) return;
    const correct = isCloseEnough(fillInput, currentQ.word.word);
    handleSubmitAnswer(correct, fillInput);
  };

  const handleClozeAnswer = (idx: number) => {
    if (showFeedback) return;
    setSelectedChoice(idx);
    const isCorrect = idx === currentQ.clozeCorrectIndex;
    handleSubmitAnswer(isCorrect, currentQ.clozeChoices?.[idx] ?? "");
  };

  const toggleQType = (t: QuestionType) => {
    setConfig((c) => {
      const has = c.questionTypes.includes(t);
      if (has && c.questionTypes.length === 1) return c;
      return {
        ...c,
        questionTypes: has ? c.questionTypes.filter((x) => x !== t) : [...c.questionTypes, t],
      };
    });
  };

  // ---- CONFIG ----
  if (phase === "config") {
    const pool = buildPool();
    const qTypes: { id: QuestionType; label: string; icon: React.ReactNode; desc: string }[] = [
      { id: "multiple-choice", label: "Multiple Choice", icon: <ListChecks size={18} />, desc: "Pick the correct word" },
      { id: "fill-blank", label: "Fill in the Blank", icon: <Keyboard size={18} />, desc: "Type the word" },
      { id: "true-false", label: "True / False", icon: <HelpCircle size={18} />, desc: "Is the pair correct?" },
      { id: "cloze", label: "Fill-in-Context (Cloze)", icon: <BookOpenText size={18} />, desc: "Pick from sentence context" },
    ];

    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <button onClick={onBack} className="p-2 rounded-xl hover:bg-muted transition-colors">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Practice Mode</h1>
            <p className="text-muted-foreground text-sm">Configure your session</p>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-3">Question Types</p>
          <div className="space-y-2">
            {qTypes.map((qt) => {
              const active = config.questionTypes.includes(qt.id);
              return (
                <button
                  key={qt.id}
                  onClick={() => toggleQType(qt.id)}
                  className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left ${
                    active ? "border-primary bg-primary/5 text-foreground" : "border-card-border bg-card text-muted-foreground hover:border-primary/30"
                  }`}
                >
                  <div className={`p-2 rounded-lg ${active ? "bg-primary text-primary-foreground" : "bg-muted"}`}>{qt.icon}</div>
                  <div>
                    <div className={`font-semibold ${active ? "text-foreground" : ""}`}>{qt.label}</div>
                    <div className="text-xs opacity-70">{qt.desc}</div>
                  </div>
                  <div className={`ml-auto w-5 h-5 rounded-full border-2 flex items-center justify-center ${active ? "border-primary bg-primary" : "border-muted-foreground/30"}`}>
                    {active && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-3">Word Source</p>
          <div className="grid grid-cols-2 gap-2 mb-3">
            {(["all", "day", "difficult", "bookmarked"] as SourceType[]).map((s) => {
              const disabled = s === "bookmarked" && bookmarks.length === 0;
              const label =
                s === "all" ? "All Words"
                : s === "day" ? "By Day"
                : s === "difficult" ? "Difficult Only"
                : `Bookmarked${bookmarks.length ? ` (${bookmarks.length})` : ""}`;
              return (
                <button
                  key={s}
                  onClick={() => !disabled && setConfig((c) => ({ ...c, source: s }))}
                  disabled={disabled}
                  title={disabled ? "Bookmark words from a test to use this source" : undefined}
                  className={`py-3 px-4 rounded-xl border-2 font-medium transition-all inline-flex items-center justify-center gap-2 ${
                    disabled
                      ? "border-card-border bg-card text-muted-foreground/50 cursor-not-allowed"
                      : config.source === s
                      ? "border-primary bg-primary/5 text-foreground"
                      : "border-card-border bg-card text-muted-foreground hover:border-primary/30"
                  }`}
                >
                  {s === "bookmarked" && (
                    <Bookmark size={14} className={config.source === s ? "fill-current" : ""} />
                  )}
                  {label}
                </button>
              );
            })}
          </div>
          {config.source === "day" && (
            <div>
              <p className="text-xs text-muted-foreground mb-2">Select day (all 30 words)</p>
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: TOTAL_DAYS }, (_, i) => i + 1).map((d) => (
                  <button
                    key={d}
                    onClick={() => setConfig((c) => ({ ...c, day: d }))}
                    className={`px-3 py-1.5 rounded-lg border font-medium text-sm transition-all ${
                      config.day === d ? "border-primary bg-primary text-primary-foreground" : "border-card-border bg-card text-muted-foreground hover:border-primary/30"
                    }`}
                  >
                    Day {d}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="text-sm text-muted-foreground mb-4">
          {pool.length} words in pool
          {config.source === "bookmarked" && pool.length === 0 && (
            <span className="block text-xs mt-1">
              Bookmark words from a Set Test or Mission Test to build a focused review set.
            </span>
          )}
        </div>

        <button
          onClick={startSession}
          disabled={pool.length === 0}
          className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-lg hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <Target size={20} />
          Start Practice
        </button>
      </div>
    );
  }

  // ---- RESULTS ----
  if (phase === "results") {
    const pct = Math.round((score / totalQ) * 100);
    const grade = pct >= 90 ? "Excellent!" : pct >= 70 ? "Good job!" : pct >= 50 ? "Keep practicing" : "Needs work";
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-card border border-card-border rounded-2xl p-8 text-center shadow-lg">
          <div className="text-5xl font-bold text-foreground mb-2">{pct}%</div>
          <div className="text-2xl font-semibold text-primary mb-1">{grade}</div>
          <div className="text-muted-foreground mb-6">{score} of {totalQ} correct</div>
          <div className="h-3 bg-muted rounded-full overflow-hidden mb-8">
            <motion.div className="h-full bg-primary rounded-full" initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.8, delay: 0.2 }} />
          </div>
          <div className="flex gap-3">
            <button onClick={startSession} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90">
              <RotateCcw size={16} /> Try Again
            </button>
            <button onClick={onBack} className="flex-1 py-3 rounded-xl border border-card-border text-foreground font-medium hover:bg-muted transition-colors">
              Back to Home
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (!currentQ) return null;
  const timerPct = settings.timerEnabled ? (timerLeft / settings.timerSeconds) * 100 : 100;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => setPhase("config")} className="p-2 rounded-xl hover:bg-muted transition-colors"><ArrowLeft size={20} /></button>
        <div className="text-center">
          <div className="text-sm text-muted-foreground">Question {qIndex + 1} of {totalQ}</div>
          <div className="font-semibold text-foreground">{score} correct</div>
        </div>
        <div className="text-sm text-muted-foreground">{totalQ > 0 ? Math.round((score / Math.max(qIndex, 1)) * 100) : 0}%</div>
      </div>

      <div className="h-2 bg-muted rounded-full mb-2 overflow-hidden">
        <motion.div className="h-full bg-primary rounded-full" animate={{ width: `${((qIndex + 1) / totalQ) * 100}%` }} />
      </div>
      {settings.timerEnabled && (
        <div className="h-1 bg-muted rounded-full mb-4 overflow-hidden">
          <motion.div className={`h-full rounded-full ${timerLeft <= 5 ? "bg-red-500" : "bg-amber-400"}`} style={{ width: `${timerPct}%` }} transition={{ duration: 0.5 }} />
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div key={qIndex} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.2 }}>

          {/* Question prompt */}
          <div className="bg-card border border-card-border rounded-2xl p-6 mb-4 shadow-sm">
            <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
              {currentQ.type === "true-false" ? "True or False?"
                : currentQ.type === "fill-blank" ? "Type the word"
                : currentQ.type === "cloze" ? "Choose the word that fits"
                : "Choose the correct word"}
            </div>

            {currentQ.type === "true-false" ? (
              <>
                <p className="text-lg font-semibold text-foreground mb-1">{currentQ.tfWord!.word}</p>
                <p className="text-muted-foreground">{currentQ.word.definition}</p>
              </>
            ) : currentQ.type === "cloze" ? (
              <p className="text-lg text-foreground leading-relaxed">
                {currentQ.clozesentence?.split("___________").map((part, i, arr) => (
                  <span key={i}>
                    {part}
                    {i < arr.length - 1 && (
                      <span className={`font-mono px-2 py-0.5 rounded ${
                        showFeedback === "correct" ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400" :
                        showFeedback === "wrong" ? "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400" :
                        "bg-primary/10 text-primary"
                      }`}>
                        {showFeedback ? currentQ.word.word : "___________"}
                      </span>
                    )}
                  </span>
                ))}
              </p>
            ) : (
              <p className="text-lg font-semibold text-foreground leading-relaxed">{currentQ.word.definition}</p>
            )}
          </div>

          {/* Multiple Choice */}
          {currentQ.type === "multiple-choice" && (
            <div className="space-y-3">
              {currentQ.choices!.map((choice, idx) => {
                const isCorrect = idx === currentQ.correctIndex;
                const isSelected = selectedChoice === idx;
                let cls = "border-card-border bg-card text-foreground hover:border-primary/40";
                if (showFeedback) {
                  if (isCorrect) cls = "border-green-400 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400";
                  else if (isSelected) cls = "border-red-400 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400";
                  else cls = "border-card-border bg-card text-muted-foreground opacity-50";
                }
                return (
                  <button key={idx} onClick={() => handleMCAnswer(idx)} disabled={!!showFeedback}
                    className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left font-medium ${cls}`}
                  >
                    <span className="w-7 h-7 rounded-full border-2 border-current flex items-center justify-center text-sm font-bold shrink-0">{String.fromCharCode(65 + idx)}</span>
                    {choice}
                    {showFeedback && isCorrect && <CheckCircle2 size={18} className="ml-auto text-green-500" />}
                    {showFeedback && isSelected && !isCorrect && <XCircle size={18} className="ml-auto text-red-500" />}
                  </button>
                );
              })}
            </div>
          )}

          {/* Cloze */}
          {currentQ.type === "cloze" && (
            <div className="space-y-3">
              {currentQ.clozeChoices!.map((choice, idx) => {
                const isCorrect = idx === currentQ.clozeCorrectIndex;
                const isSelected = selectedChoice === idx;
                let cls = "border-card-border bg-card text-foreground hover:border-primary/40";
                if (showFeedback) {
                  if (isCorrect) cls = "border-green-400 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400";
                  else if (isSelected) cls = "border-red-400 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400";
                  else cls = "border-card-border bg-card text-muted-foreground opacity-50";
                }
                return (
                  <button key={idx} onClick={() => handleClozeAnswer(idx)} disabled={!!showFeedback}
                    className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left font-medium ${cls}`}
                  >
                    <span className="w-7 h-7 rounded-full border-2 border-current flex items-center justify-center text-sm font-bold shrink-0">{String.fromCharCode(65 + idx)}</span>
                    {choice}
                    {showFeedback && isCorrect && <CheckCircle2 size={18} className="ml-auto text-green-500" />}
                    {showFeedback && isSelected && !isCorrect && <XCircle size={18} className="ml-auto text-red-500" />}
                  </button>
                );
              })}
            </div>
          )}

          {/* Fill in blank */}
          {currentQ.type === "fill-blank" && (
            <div>
              <div className="flex gap-2">
                <input
                  ref={fillRef}
                  value={fillInput}
                  onChange={(e) => setFillInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && !showFeedback && handleFillSubmit()}
                  disabled={!!showFeedback}
                  placeholder="Type the word..."
                  autoFocus
                  className={`flex-1 px-4 py-3 rounded-xl border-2 bg-background text-foreground transition-colors outline-none ${
                    showFeedback === "correct" ? "border-green-400" : showFeedback === "wrong" ? "border-red-400" : "border-card-border focus:border-primary"
                  }`}
                />
                <button onClick={handleFillSubmit} disabled={!!showFeedback || !fillInput.trim()}
                  className="px-5 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90 disabled:opacity-40">
                  Check
                </button>
              </div>
              {showFeedback === "wrong" && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400">Correct: <strong>{currentQ.word.word}</strong></p>
              )}
            </div>
          )}

          {/* True/False */}
          {currentQ.type === "true-false" && (
            <div className="flex gap-3">
              {([true, false] as boolean[]).map((val) => {
                const isSelected = selectedTF === val;
                const isCorrectAnswer = val === currentQ.isTrue;
                let cls = "border-card-border bg-card hover:border-primary/40 text-foreground";
                if (showFeedback) {
                  if (isCorrectAnswer) cls = "border-green-400 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400";
                  else if (isSelected) cls = "border-red-400 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400";
                  else cls = "border-card-border bg-card text-muted-foreground opacity-50";
                }
                return (
                  <button key={String(val)} onClick={() => handleTFAnswer(val)} disabled={!!showFeedback}
                    className={`flex-1 py-4 rounded-xl border-2 font-semibold text-lg transition-all ${cls}`}>
                    {val ? "True" : "False"}
                  </button>
                );
              })}
            </div>
          )}

          {/* Feedback */}
          <AnimatePresence>
            {showFeedback && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className={`mt-4 p-4 rounded-xl flex items-start gap-3 ${
                  showFeedback === "correct"
                    ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
                    : "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
                }`}
              >
                {showFeedback === "correct" ? <CheckCircle2 size={20} className="text-green-500 shrink-0" /> : <XCircle size={20} className="text-red-500 shrink-0" />}
                <div className="flex-1">
                  <div className={`font-semibold ${showFeedback === "correct" ? "text-green-700 dark:text-green-400" : "text-red-700 dark:text-red-400"}`}>
                    {showFeedback === "correct" ? "Correct!" : "Incorrect"}
                  </div>
                  {showFeedback === "wrong" && currentQ.type !== "fill-blank" && (
                    <div className="text-sm text-muted-foreground mt-1">
                      <span className="font-medium">{currentQ.word.word}</span> — {currentQ.word.definition}
                    </div>
                  )}
                </div>
                <button onClick={handleNext} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90">
                  Next <ChevronRight size={14} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function PracticeMode(props: PracticeModeProps) {
  return <PracticeModeInner {...props} />;
}
