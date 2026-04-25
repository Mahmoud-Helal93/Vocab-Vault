import { useMemo } from "react";
import { motion } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { GROUPS_PER_DAY, TOTAL_DAYS } from "@/data/words";
import { loadMissionTestScores, loadMissionTestAttempts, formatRelativeTime } from "@/lib/storage";
import {
  ArrowLeft, BookOpen, Star, Award, Trophy, Lock, ChevronRight,
  Sparkles, ListChecks, Keyboard, HelpCircle, Flame, Target,
  TrendingUp, PlayCircle, RotateCcw, Crosshair, Bookmark, Lightbulb,
  CheckCircle2,
} from "lucide-react";

interface MissionDetailProps {
  onBack: () => void;
  onNavigate: (page: string, params?: Record<string, unknown>) => void;
  missionDay: number;
}

const SET_ACCENTS = [
  {
    stripe: "from-violet-500 to-violet-600",
    pillBg: "bg-violet-100 dark:bg-violet-900/30",
    pillText: "text-violet-700 dark:text-violet-300",
    icon: "text-violet-500",
    btn: "from-violet-500 to-violet-600 hover:from-violet-600 hover:to-violet-700",
  },
  {
    stripe: "from-pink-500 to-pink-600",
    pillBg: "bg-pink-100 dark:bg-pink-900/30",
    pillText: "text-pink-700 dark:text-pink-300",
    icon: "text-pink-500",
    btn: "from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700",
  },
  {
    stripe: "from-fuchsia-500 to-fuchsia-600",
    pillBg: "bg-fuchsia-100 dark:bg-fuchsia-900/30",
    pillText: "text-fuchsia-700 dark:text-fuchsia-300",
    icon: "text-fuchsia-500",
    btn: "from-fuchsia-500 to-fuchsia-600 hover:from-fuchsia-600 hover:to-fuchsia-700",
  },
];

function MountainArt() {
  return (
    <svg
      viewBox="0 0 320 200"
      className="w-full h-full pointer-events-none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="mtnA" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#A78BFA" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>
        <linearGradient id="mtnB" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C4B5FD" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>
      {/* clouds */}
      <ellipse cx="60" cy="50" rx="22" ry="6" fill="#FFFFFF" opacity="0.6" />
      <ellipse cx="80" cy="46" rx="14" ry="4" fill="#FFFFFF" opacity="0.7" />
      <ellipse cx="220" cy="38" rx="18" ry="5" fill="#FFFFFF" opacity="0.6" />
      {/* birds */}
      <path d="M180 60 q4 -4 8 0 q4 -4 8 0" stroke="#FFFFFF" strokeWidth="1.5" fill="none" opacity="0.8" />
      <path d="M195 70 q3 -3 6 0 q3 -3 6 0" stroke="#FFFFFF" strokeWidth="1.5" fill="none" opacity="0.7" />
      {/* back mountain */}
      <path d="M40 180 L130 70 L185 130 L235 90 L300 180 Z" fill="url(#mtnB)" />
      {/* front mountain */}
      <path d="M0 200 L90 90 L160 160 L210 110 L320 200 Z" fill="url(#mtnA)" />
      {/* snow caps */}
      <path d="M75 110 L90 90 L105 110 L98 112 L92 106 L86 112 Z" fill="#FFFFFF" opacity="0.95" />
      <path d="M198 122 L210 110 L222 122 L216 124 L212 118 L206 124 Z" fill="#FFFFFF" opacity="0.9" />
      {/* flag on summit */}
      <line x1="90" y1="90" x2="90" y2="68" stroke="#7C2D12" strokeWidth="1.5" />
      <path d="M90 68 L102 73 L90 78 Z" fill="#F97316" />
      {/* sun */}
      <circle cx="265" cy="55" r="12" fill="#FDE68A" opacity="0.9" />
    </svg>
  );
}

function RoadmapNode({
  label,
  sub,
  state,
  index,
  isLast,
  isLocked,
  onClick,
}: {
  label: string;
  sub: string;
  state: "done" | "current" | "upcoming" | "locked";
  index: number | "trophy";
  isLast?: boolean;
  isLocked?: boolean;
  onClick?: () => void;
}) {
  const node =
    state === "done"
      ? "bg-emerald-500 text-white border-emerald-500"
      : state === "current"
      ? "bg-violet-600 text-white border-violet-600 shadow-lg shadow-violet-500/30"
      : state === "locked"
      ? "bg-muted text-muted-foreground border-border"
      : "bg-card text-muted-foreground border-border";

  return (
    <div className="flex-1 flex items-start gap-0 min-w-0 relative">
      <div className="flex flex-col items-center gap-1.5 min-w-0 flex-1">
        <button
          type="button"
          onClick={onClick}
          disabled={!onClick || isLocked}
          className={`relative w-10 h-10 rounded-full border-2 flex items-center justify-center font-extrabold text-sm transition-transform ${node} ${
            onClick && !isLocked ? "hover:scale-110 cursor-pointer" : "cursor-default"
          }`}
        >
          {index === "trophy" ? <Trophy size={16} /> : index}
          {state === "done" && index !== "trophy" && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-card flex items-center justify-center">
              <CheckCircle2 size={9} className="text-white" />
            </span>
          )}
        </button>
        <div className="text-center min-w-0">
          <div className="text-xs font-bold text-foreground truncate">{label}</div>
          <div className="text-[10px] text-muted-foreground truncate">{sub}</div>
        </div>
      </div>
      {!isLast && (
        <div className="absolute top-[18px] left-[calc(50%+22px)] right-[calc(-50%+22px)] h-[2px] bg-border -z-0">
          <div
            className="h-full bg-violet-500 transition-all"
            style={{ width: state === "done" ? "100%" : state === "current" ? "50%" : "0%" }}
          />
        </div>
      )}
    </div>
  );
}

export default function MissionDetail({ onBack, onNavigate, missionDay }: MissionDetailProps) {
  const { words, streak, gamification } = useApp();

  const missionWords = useMemo(
    () => words.filter((w) => w.day === missionDay),
    [words, missionDay]
  );

  const totalWords = missionWords.length;
  const masteredWords = missionWords.filter((w) => w.status === "mastered").length;
  const overallPct = totalWords > 0 ? Math.round((masteredWords / totalWords) * 100) : 0;
  const inProgress = masteredWords > 0 || missionWords.some((w) => w.status !== "new");

  const sets = useMemo(
    () =>
      Array.from({ length: GROUPS_PER_DAY }, (_, i) => {
        const group = i + 1;
        const setWords = missionWords.filter((w) => w.group === group);
        const setMastered = setWords.filter((w) => w.status === "mastered").length;
        const setPct =
          setWords.length > 0 ? Math.round((setMastered / setWords.length) * 100) : 0;
        return {
          group,
          words: setWords,
          mastered: setMastered,
          pct: setPct,
          complete: setWords.length > 0 && setMastered === setWords.length,
        };
      }),
    [missionWords]
  );

  const allSetsComplete = sets.every((s) => s.complete);
  const missionScores = loadMissionTestScores();
  const missionAttempts = loadMissionTestAttempts();
  const bestScore = missionScores[missionDay];
  const lastAttempt = missionAttempts[missionDay];
  const missionTestUnlocked = allSetsComplete || typeof bestScore === "number";

  // Compute "mission XP" as quality-history-based estimate: each correct review = 5 XP per word for this mission
  const missionXp = useMemo(
    () =>
      missionWords.reduce((sum, w) => sum + w.correctCount * 5, 0),
    [missionWords]
  );

  const overallAccuracy = useMemo(() => {
    const totalAnswers = missionWords.reduce(
      (acc, w) => acc + w.correctCount + w.incorrectCount,
      0
    );
    const totalCorrect = missionWords.reduce((acc, w) => acc + w.correctCount, 0);
    return totalAnswers > 0 ? Math.round((totalCorrect / totalAnswers) * 100) : 0;
  }, [missionWords]);

  const startMission = () => {
    // Find first not-mastered word, else first word
    const firstUnmastered = missionWords.find((w) => w.status !== "mastered");
    const target = firstUnmastered ?? missionWords[0];
    if (target) onNavigate("study", { wordId: target.id });
    else onNavigate("study");
  };

  const startSet = (group: number) => {
    const firstWord = missionWords.find((w) => w.group === group);
    if (firstWord) onNavigate("study", { wordId: firstWord.id });
    else onNavigate("study", { day: missionDay });
  };

  const openMissionTest = () => {
    if (!missionTestUnlocked) return;
    onNavigate("mission-test", { missionDay });
  };

  const quickActions = [
    {
      id: "continue",
      label: "Continue Learning",
      sub: "Pick up where you left off",
      icon: <PlayCircle size={18} />,
      bg: "bg-violet-100 dark:bg-violet-900/30",
      iconColor: "text-violet-600 dark:text-violet-300",
      onClick: startMission,
    },
    {
      id: "review",
      label: "Review Words",
      sub: "Review mastered words",
      icon: <RotateCcw size={18} />,
      bg: "bg-emerald-100 dark:bg-emerald-900/30",
      iconColor: "text-emerald-600 dark:text-emerald-300",
      onClick: () => onNavigate("review"),
    },
    {
      id: "weak",
      label: "Practice Weak Words",
      sub: "Focus on words you miss",
      icon: <Crosshair size={18} />,
      bg: "bg-orange-100 dark:bg-orange-900/30",
      iconColor: "text-orange-600 dark:text-orange-300",
      onClick: () => onNavigate("practice", { source: "difficult" }),
    },
    {
      id: "vocab",
      label: "My Vocabulary",
      sub: "View all learned words",
      icon: <Bookmark size={18} />,
      bg: "bg-blue-100 dark:bg-blue-900/30",
      iconColor: "text-blue-600 dark:text-blue-300",
      onClick: () => onNavigate("bookmarks"),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50/40 via-background to-orange-50/40 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* ── Header ── */}
        <div className="flex items-start sm:items-center gap-3 flex-wrap">
          <button
            onClick={onBack}
            aria-label="Back"
            className="w-10 h-10 rounded-xl border border-border bg-card flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors shrink-0"
          >
            <ArrowLeft size={18} />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground leading-tight">
              Mission {missionDay}
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
              {totalWords} Words · {GROUPS_PER_DAY} Sets · 1 Mission Test
            </p>
          </div>
          <div className="w-full sm:w-64 sm:ml-auto">
            <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground mb-1">
              <span>{overallPct}% Complete</span>
              <span className="text-foreground tabular-nums">
                {masteredWords} / {totalWords}
              </span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-violet-500 to-orange-500"
                initial={{ width: 0 }}
                animate={{ width: `${overallPct}%` }}
                transition={{ duration: 0.6 }}
              />
            </div>
          </div>
        </div>

        {/* ── Hero card ── */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl p-6 sm:p-8 text-white shadow-lg"
          style={{
            background:
              "linear-gradient(120deg, #FB923C 0%, #F97316 35%, #EC4899 100%)",
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-[1fr_240px] gap-6 items-center">
            <div className="space-y-4 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white/25 backdrop-blur-sm flex items-center justify-center shrink-0">
                  <BookOpen size={22} />
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight">
                    All {totalWords} Words
                  </h2>
                  <p className="text-sm text-white/90">
                    Master this mission and earn exciting rewards!
                  </p>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-white/95 mb-1.5">
                  <span>
                    {masteredWords} / {totalWords} words mastered
                  </span>
                  <span className="tabular-nums">{overallPct}%</span>
                </div>
                <div className="h-2 rounded-full bg-white/25 overflow-hidden">
                  <motion.div
                    className="h-full bg-white rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${overallPct}%` }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  onClick={startMission}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-orange-600 font-bold text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
                >
                  {inProgress ? "Continue Learning" : "Start Learning"}
                  <ChevronRight size={16} />
                </button>
                <div className="flex items-center gap-2 text-sm">
                  <Star size={16} className="fill-yellow-300 text-yellow-300" />
                  <div className="leading-tight">
                    <div className="font-bold">+300 XP</div>
                    <div className="text-[11px] text-white/85">Mission Reward</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Award size={16} className="text-yellow-300" />
                  <div className="leading-tight">
                    <div className="font-bold">Mission Badge</div>
                    <div className="text-[11px] text-white/85">Upon Completion</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden md:block h-44 ml-auto w-full max-w-[260px]">
              <MountainArt />
            </div>
          </div>
        </motion.div>

        {/* ── Roadmap ── */}
        <section className="space-y-3">
          <h3 className="text-lg font-extrabold text-foreground">Your Mission Roadmap</h3>
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-start justify-between gap-2">
              {sets.map((s, i) => {
                const state: "done" | "current" | "upcoming" =
                  s.complete
                    ? "done"
                    : i === 0 || sets[i - 1]?.complete || s.mastered > 0
                    ? "current"
                    : "upcoming";
                return (
                  <RoadmapNode
                    key={s.group}
                    index={s.group}
                    label={`Set ${s.group}`}
                    sub={`${s.mastered} / ${s.words.length} words`}
                    state={state}
                    onClick={() => startSet(s.group)}
                  />
                );
              })}
              <RoadmapNode
                index="trophy"
                label="Mission Test"
                sub={
                  missionTestUnlocked
                    ? typeof bestScore === "number"
                      ? `Best ${bestScore}%`
                      : "Unlocked"
                    : "Locked"
                }
                state={missionTestUnlocked ? "current" : "locked"}
                isLocked={!missionTestUnlocked}
                isLast
                onClick={openMissionTest}
              />
            </div>
          </div>
        </section>

        {/* ── Set + Mission Test cards ── */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {sets.map((s, i) => {
            // Set 2 in Missions 1 and 2 uses the same violet accent style as Set 1
            const violetSet2 =
              s.group === 2 && (missionDay === 1 || missionDay === 2);
            const accentIdx = violetSet2 ? 0 : i % SET_ACCENTS.length;
            const accent = SET_ACCENTS[accentIdx];
            const visibleWords = s.words.slice(0, 8);
            const more = Math.max(0, s.words.length - visibleWords.length);
            return (
              <motion.div
                key={s.group}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.04 * i }}
                className="rounded-2xl border border-border bg-card overflow-hidden flex flex-col"
              >
                <div className={`h-1.5 bg-gradient-to-r ${accent.stripe}`} />
                <div className="p-5 flex flex-col gap-4 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <Sparkles size={16} className={accent.icon} />
                      <span className="font-extrabold text-foreground truncate">
                        Set {s.group}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-muted-foreground tabular-nums shrink-0">
                      {s.pct}%
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground -mt-2">
                    {s.words.length} words
                  </div>
                  <div className="flex flex-wrap gap-1.5 min-h-[64px]">
                    {visibleWords.map((w) => (
                      <span
                        key={w.id}
                        className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${accent.pillBg} ${accent.pillText}`}
                      >
                        {w.word}
                      </span>
                    ))}
                    {more > 0 && (
                      <span className="text-[11px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-medium">
                        +{more} more
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <BookOpen size={12} />
                      <span className="font-semibold">{s.words.length} words</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <CheckCircle2 size={12} className="text-emerald-500" />
                      <span className="font-semibold">{s.mastered} mastered</span>
                    </div>
                  </div>
                  <button
                    onClick={() => startSet(s.group)}
                    className={`mt-auto inline-flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl bg-gradient-to-r ${accent.btn} text-white font-bold text-sm transition-all`}
                  >
                    {s.complete ? "Review" : "Start"} Set {s.group}
                    <ChevronRight size={14} />
                  </button>
                </div>
              </motion.div>
            );
          })}

          {/* Mission Test card */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16 }}
            className="rounded-2xl border border-border bg-card overflow-hidden flex flex-col"
          >
            <div className="h-1.5 bg-gradient-to-r from-orange-400 to-orange-500" />
            <div className="p-5 flex flex-col gap-4 flex-1">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <Trophy size={16} className="text-orange-500" />
                  <span className="font-extrabold text-foreground truncate">Mission Test</span>
                </div>
                {typeof bestScore === "number" && (
                  <span className="text-xs font-bold text-orange-600 dark:text-orange-400 tabular-nums">
                    {bestScore}%
                  </span>
                )}
              </div>
              <div className="text-xs text-muted-foreground -mt-2">
                Test all {totalWords} words
              </div>
              <ul className="space-y-2 text-sm">
                {[
                  { count: 10, label: "Multiple Choice", icon: <ListChecks size={14} /> },
                  { count: 10, label: "Fill in the Blank", icon: <Keyboard size={14} /> },
                  { count: 10, label: "True / False", icon: <HelpCircle size={14} /> },
                ].map((row) => (
                  <li key={row.label} className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-lg bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-300 flex items-center justify-center shrink-0">
                      {row.icon}
                    </span>
                    <span className="text-foreground font-bold tabular-nums w-6">
                      {row.count}
                    </span>
                    <span className="text-muted-foreground">{row.label}</span>
                  </li>
                ))}
              </ul>
              {missionTestUnlocked ? (
                <div className="text-[11px] text-muted-foreground">
                  {lastAttempt
                    ? `Last attempt ${formatRelativeTime(lastAttempt)}`
                    : "Ready when you are"}
                </div>
              ) : (
                <div className="rounded-xl bg-orange-50 dark:bg-orange-900/20 p-3 flex items-start gap-2">
                  <Lock size={14} className="text-orange-500 mt-0.5 shrink-0" />
                  <div className="text-[11px] leading-snug">
                    <div className="font-bold text-orange-700 dark:text-orange-300">Locked</div>
                    <div className="text-orange-700/80 dark:text-orange-300/80">
                      Complete all sets to unlock
                    </div>
                  </div>
                </div>
              )}
              <button
                onClick={openMissionTest}
                disabled={!missionTestUnlocked}
                className={`mt-auto inline-flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl font-bold text-sm transition-all ${
                  missionTestUnlocked
                    ? "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white"
                    : "bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 cursor-not-allowed"
                }`}
              >
                {missionTestUnlocked ? (
                  <>
                    {typeof bestScore === "number" ? "Retake" : "Start"} Test
                    <ChevronRight size={14} />
                  </>
                ) : (
                  <>
                    <Lock size={13} /> Unlock Test
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </section>

        {/* ── Mission Progress ── */}
        <section className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-extrabold text-foreground">Mission Progress</h3>
            <span className="text-xs text-muted-foreground">
              Mission {missionDay} of {TOTAL_DAYS}
            </span>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <ProgressStat
              icon={<BookOpen size={18} />}
              iconBg="bg-violet-100 dark:bg-violet-900/30"
              iconColor="text-violet-600 dark:text-violet-300"
              value={`${masteredWords} / ${totalWords}`}
              label="Words Mastered"
              hint={
                masteredWords === 0
                  ? "Keep going!"
                  : masteredWords === totalWords
                  ? "All mastered!"
                  : `${totalWords - masteredWords} to go`
              }
              hintColor="text-violet-600 dark:text-violet-300"
            />
            <ProgressStat
              icon={<Target size={18} />}
              iconBg="bg-emerald-100 dark:bg-emerald-900/30"
              iconColor="text-emerald-600 dark:text-emerald-300"
              value={`${overallAccuracy}%`}
              label="Overall Accuracy"
              hint={overallAccuracy === 0 ? "—" : overallAccuracy >= 80 ? "Sharp!" : "Improving"}
              hintColor="text-muted-foreground"
            />
            <ProgressStat
              icon={<Flame size={18} />}
              iconBg="bg-orange-100 dark:bg-orange-900/30"
              iconColor="text-orange-600 dark:text-orange-300"
              value={String(streak.currentStreak)}
              label="Day Streak"
              hint={
                streak.currentStreak === 0
                  ? "Start your streak!"
                  : `Longest: ${streak.longestStreak}`
              }
              hintColor="text-orange-600 dark:text-orange-300"
            />
            <ProgressStat
              icon={<TrendingUp size={18} />}
              iconBg="bg-blue-100 dark:bg-blue-900/30"
              iconColor="text-blue-600 dark:text-blue-300"
              value={missionXp.toLocaleString()}
              label="Mission XP"
              hint={
                missionXp === 0
                  ? "Earn XP as you learn!"
                  : `${gamification.totalXp.toLocaleString()} total`
              }
              hintColor="text-blue-600 dark:text-blue-300"
            />
          </div>
        </section>

        {/* ── Quick Actions ── */}
        <section>
          <h3 className="font-extrabold text-foreground mb-3">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {quickActions.map((a) => (
              <button
                key={a.id}
                onClick={a.onClick}
                className="rounded-2xl border border-border bg-card p-4 flex items-center gap-3 text-left hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                <div className={`w-10 h-10 rounded-xl ${a.bg} ${a.iconColor} flex items-center justify-center shrink-0`}>
                  {a.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-foreground text-sm truncate">
                    {a.label}
                  </div>
                  <div className="text-[11px] text-muted-foreground truncate">
                    {a.sub}
                  </div>
                </div>
                <ChevronRight size={14} className="text-muted-foreground shrink-0" />
              </button>
            ))}
          </div>
        </section>

        {/* ── Tip ── */}
        <section className="rounded-2xl border border-violet-200 dark:border-violet-900/40 bg-violet-50/60 dark:bg-violet-900/10 p-4 sm:p-5 flex items-center gap-4 flex-wrap">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-pink-500 text-white flex items-center justify-center shrink-0">
            <Lightbulb size={18} />
          </div>
          <div className="flex-1 min-w-[200px]">
            <div className="font-bold text-foreground text-sm">Tip for Success</div>
            <p className="text-xs text-muted-foreground">
              Study a little every day and review regularly to master all {totalWords} words!
            </p>
          </div>
          <button
            onClick={() => onNavigate("achievements")}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-border bg-card text-foreground hover:bg-muted text-xs font-bold transition-colors"
          >
            View Study Tips
            <ChevronRight size={12} />
          </button>
        </section>
      </div>
    </div>
  );
}

function ProgressStat({
  icon, iconBg, iconColor, value, label, hint, hintColor,
}: {
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  value: string;
  label: string;
  hint: string;
  hintColor: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className={`w-11 h-11 rounded-2xl ${iconBg} ${iconColor} flex items-center justify-center shrink-0`}>
        {icon}
      </div>
      <div className="min-w-0">
        <div className="text-xl font-extrabold text-foreground tabular-nums leading-tight">
          {value}
        </div>
        <div className="text-[11px] font-semibold text-muted-foreground truncate">{label}</div>
        <div className={`text-[10px] ${hintColor} truncate`}>{hint}</div>
      </div>
    </div>
  );
}
