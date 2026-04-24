import { useMemo } from "react";
import { motion } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { getDueWords, getDifficultWords, getProgress } from "@/lib/srs";
import { TOTAL_DAYS, GROUPS_PER_DAY } from "@/data/words";
import { BADGES, levelFromXp } from "@/lib/gamification";
import {
  Target, Flame, Sparkles, Check, Lock, ChevronRight,
  CalendarDays, TrendingUp, Zap, Trophy,
} from "lucide-react";

interface DashboardProps {
  onNavigate: (page: string, params?: Record<string, unknown>) => void;
}

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const BELTS = [
  { num: 1, name: "White Belt",  subtitle: "Foundation", color: "#9CA3AF", textColor: "#6B7280" },
  { num: 2, name: "Yellow Belt", subtitle: "Expansion",  color: "#F59E0B", textColor: "#D97706" },
  { num: 3, name: "Green Belt",  subtitle: "Strength",   color: "#10B981", textColor: "#059669" },
  { num: 4, name: "Blue Belt",   subtitle: "Precision",  color: "#3B82F6", textColor: "#2563EB" },
  { num: 5, name: "Purple Belt", subtitle: "Mastery",    color: "#8B5CF6", textColor: "#7C3AED" },
  { num: 6, name: "Black Belt",  subtitle: "Expertise",  color: "#1F2937", textColor: "#111827" },
];
const BELT_OF_DAY = (d: number) => Math.min(Math.floor((d - 1) / 7), 5);

function ShurikenIcon({ size = 14, filled = true, color = "#F97316" }: {
  size?: number; filled?: boolean; color?: string;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2 L14.5 9.5 L22 12 L14.5 14.5 L12 22 L9.5 14.5 L2 12 L9.5 9.5 Z"
        fill={filled ? color : "none"}
        stroke={color}
        strokeWidth={filled ? 0 : 1.5}
        opacity={filled ? 1 : 0.4}
      />
    </svg>
  );
}

interface BeltStat {
  num: number; name: string; subtitle: string; color: string; textColor: string;
  idx: number;
  days: { day: number; mastered: number; total: number; pct: number; beltIdx: number }[];
  totalWords: number; masteredWords: number; completedDays: number; totalDays: number;
  pct: number; complete: boolean;
}

function BeltJourneyTrack({
  beltStats, currentBeltIdx, onNavigate,
}: {
  beltStats: BeltStat[]; currentBeltIdx: number;
  onNavigate: (page: string, params?: Record<string, unknown>) => void;
}) {
  const current = beltStats[currentBeltIdx];
  const next = beltStats[currentBeltIdx + 1];
  const fillPct = ((currentBeltIdx + (current?.pct ?? 0) / 100) / (beltStats.length - 1)) * 100;

  return (
    <div
      className="rounded-2xl border border-border bg-card p-5 mb-6 shadow-sm relative overflow-hidden"
      style={{ background: `linear-gradient(90deg, ${current?.color ?? "#F59E0B"}10, transparent 100%)` }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="font-extrabold text-foreground text-lg flex items-center gap-2">
          <span>🥋</span> Belt Journey
        </div>
        {next && (
          <button
            onClick={() => onNavigate("achievements")}
            className="text-xs font-bold text-muted-foreground uppercase tracking-wider hover:text-foreground transition-colors"
          >
            Next: {next.name}
          </button>
        )}
      </div>

      <div className="relative flex items-center justify-between mt-2 px-4 h-16">
        <div className="absolute left-8 right-8 h-2 bg-muted rounded-full top-1/2 -translate-y-1/2" />

        <div
          className="absolute left-8 h-2 bg-orange-500 rounded-full top-1/2 -translate-y-1/2 transition-all"
          style={{ width: `calc((100% - 4rem) * ${fillPct / 100})` }}
        />

        {beltStats.map((belt, idx) => {
          const isComplete = belt.complete;
          const isCurrent = idx === currentBeltIdx;
          const isFuture = idx > currentBeltIdx;
          const isBlack = idx === beltStats.length - 1;

          return (
            <div key={belt.num} className="relative z-10 flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full border-4 flex items-center justify-center transition-transform ${
                  isCurrent
                    ? "scale-125 shadow-lg border-white dark:border-gray-900 ring-4 ring-orange-500/30"
                    : "border-background"
                } ${isFuture ? "bg-muted" : ""}`}
                style={{ backgroundColor: isFuture ? undefined : belt.color }}
              >
                {isComplete && <Check size={16} className="text-white" strokeWidth={3} />}
                {isCurrent && !isComplete && <Flame size={16} className="text-white" fill="white" />}
                {isFuture && !isBlack && (
                  <div className="w-2.5 h-2.5 rounded-full bg-background opacity-50" />
                )}
                {isFuture && isBlack && <Lock size={14} className="text-muted-foreground" />}
              </div>

              <div className="absolute top-12 text-center w-24 left-1/2 -translate-x-1/2 mt-1">
                <div className={`text-xs font-bold ${isCurrent ? "text-foreground" : "text-muted-foreground"}`}>
                  {belt.name}
                </div>
                {isCurrent && (
                  <div className="text-[10px] text-orange-600 font-extrabold mt-0.5 tabular-nums">
                    {belt.completedDays}/{belt.totalDays} Missions
                  </div>
                )}
                {isCurrent && (
                  <div className="absolute -top-[70px] left-1/2 -translate-x-1/2 bg-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded-md whitespace-nowrap animate-pulse">
                    You are here
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-orange-500 rotate-45" />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function DonutChart({
  segments, level, beltColor, beltTextColor,
}: {
  segments: { label: string; value: number; color: string }[];
  level: number; beltColor: string; beltTextColor: string;
}) {
  const size = 160;
  const strokeWidth = 20;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const total = segments.reduce((sum, item) => sum + item.value, 0) || 1;

  let currentOffset = 0;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke="currentColor" className="text-muted" strokeWidth={strokeWidth}
        />
        {segments.map((item) => {
          const strokeLength = (item.value / total) * circumference;
          const dasharray = `${strokeLength} ${circumference - strokeLength}`;
          const offset = -currentOffset;
          currentOffset += strokeLength;
          return (
            <circle
              key={item.label}
              cx={size / 2} cy={size / 2} r={radius}
              fill="none" stroke={item.color} strokeWidth={strokeWidth}
              strokeDasharray={dasharray} strokeDashoffset={offset}
            />
          );
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div
          className="w-14 h-14 rounded-lg border-4 flex items-center justify-center shadow-inner"
          style={{ backgroundColor: beltColor, borderColor: beltTextColor }}
        >
          <div className="text-center">
            <div className="text-[10px] font-bold uppercase tracking-wider leading-none mb-0.5"
                 style={{ color: "#fff" }}>Lv</div>
            <div className="text-2xl font-extrabold leading-none tabular-nums"
                 style={{ color: "#fff" }}>{level}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BarChart({
  data, max, todayIdx,
}: {
  data: { date: Date; reviewed: number }[];
  max: number;
  todayIdx: number;
}) {
  return (
    <div className="h-40 flex items-end gap-2 mt-4 relative">
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        preserveAspectRatio="none"
        viewBox="0 0 100 160"
      >
        <polyline
          fill="none"
          stroke="#F97316"
          strokeWidth="1.5"
          strokeDasharray="3 3"
          vectorEffect="non-scaling-stroke"
          points={data
            .map((d, i) => {
              const h = (d.reviewed / max) * 140;
              const x = (i / Math.max(1, data.length - 1)) * 100;
              return `${x},${160 - h - 12}`;
            })
            .join(" ")}
        />
      </svg>

      {data.map((d, i) => {
        const totalHeight = (d.reviewed / max) * 100;
        const isToday = i === todayIdx;
        return (
          <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end relative">
            {isToday && (
              <div className="absolute -top-6 text-orange-500 animate-bounce">
                <Flame size={20} fill="#F97316" />
              </div>
            )}
            <div className="w-full flex items-end justify-center relative flex-1">
              <div
                className="w-5 rounded-t-md opacity-80"
                style={{
                  height: `${totalHeight}%`,
                  background: "linear-gradient(180deg, #3B82F6 0%, #93C5FD 100%)",
                  minHeight: d.reviewed > 0 ? 4 : 0,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function Dashboard({ onNavigate }: DashboardProps) {
  const { words, streak, gamification } = useApp();
  const progress = useMemo(() => getProgress(words), [words]);
  const dueWords = useMemo(() => getDueWords(words), [words]);
  const difficultWords = useMemo(() => getDifficultWords(words), [words]);

  const dayProgress = useMemo(() => {
    return Array.from({ length: TOTAL_DAYS }, (_, i) => {
      const day = i + 1;
      const dayWords = words.filter((w) => w.day === day);
      const mastered = dayWords.filter((w) => w.status === "mastered").length;
      const total = dayWords.length;
      const pct = total > 0 ? Math.round((mastered / total) * 100) : 0;
      return { day, mastered, total, pct, beltIdx: BELT_OF_DAY(day) };
    });
  }, [words]);

  const beltStats: BeltStat[] = useMemo(
    () =>
      BELTS.map((belt, idx) => {
        const days = dayProgress.filter((d) => d.beltIdx === idx);
        const totalWords = days.reduce((acc, d) => acc + d.total, 0);
        const masteredWords = days.reduce((acc, d) => acc + d.mastered, 0);
        const completedDays = days.filter((d) => d.pct === 100).length;
        return {
          ...belt,
          idx,
          days,
          totalWords,
          masteredWords,
          completedDays,
          totalDays: days.length,
          pct: totalWords > 0 ? Math.round((masteredWords / totalWords) * 100) : 0,
          complete: totalWords > 0 && masteredWords === totalWords,
        };
      }),
    [dayProgress]
  );

  const currentBeltIdx = useMemo(() => {
    for (let i = 0; i < beltStats.length; i++) if (!beltStats[i].complete) return i;
    return beltStats.length - 1;
  }, [beltStats]);
  const currentBelt = beltStats[currentBeltIdx];

  const totalMastered = progress.mastered;
  const totalWords = progress.total;
  const missionsCompleted = useMemo(
    () => dayProgress.filter((d) => d.total > 0 && d.pct === 100).length,
    [dayProgress]
  );
  const setsCompleted = useMemo(() => {
    let count = 0;
    for (let d = 1; d <= TOTAL_DAYS; d++) {
      for (let g = 1; g <= GROUPS_PER_DAY; g++) {
        const gw = words.filter((w) => w.day === d && w.group === g);
        if (gw.length > 0 && gw.every((w) => w.status === "mastered")) count++;
      }
    }
    return count;
  }, [words]);
  const setsTotal = TOTAL_DAYS * GROUPS_PER_DAY;
  const lvl = levelFromXp(gamification.totalXp);
  const lvlPct = Math.round(lvl.progress * 100);

  const learning = words.filter((w) => w.status === "learning").length;
  const review = words.filter((w) => w.status === "review").length;
  const masteredCount = words.filter((w) => w.status === "mastered").length;
  const newCount = totalWords - learning - review - masteredCount;
  const donutSegments = [
    { label: "Mastered", value: masteredCount, color: "#10B981" },
    { label: "Review",   value: review,        color: "#3B82F6" },
    { label: "Learning", value: learning,      color: "#F59E0B" },
    { label: "New",      value: newCount,      color: "#E5E7EB" },
  ];

  const today = new Date();
  const last7 = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - (6 - i));
    return d;
  });
  const reviewedByDay = last7.map((d) => {
    const tgt = d.toDateString();
    const total = words.filter(
      (w) => w.lastReviewed && new Date(w.lastReviewed).toDateString() === tgt
    ).length;
    return { date: d, reviewed: total };
  });
  const barMax = Math.max(10, ...reviewedByDay.map((d) => d.reviewed));
  const todayIdx = 6;

  const nextDay = dayProgress.find((d) => d.pct < 100) ?? dayProgress[0];
  const resumeMission = dueWords.length > 0 ? null : nextDay?.day ?? null;

  const agenda = [
    {
      time: "Now",
      label: dueWords.length > 0 ? "Daily Review" : `Mission ${nextDay.day}`,
      sub:
        dueWords.length > 0
          ? `${dueWords.length} words due for review`
          : `Continue Day ${nextDay.day} • new vocabulary`,
      xp: 45,
      difficulty: 2,
      status: "in-progress" as const,
      action: () =>
        dueWords.length > 0
          ? onNavigate("review")
          : onNavigate("study", { day: nextDay.day }),
    },
    {
      time: "10 min",
      label: "Quick Practice",
      sub: "Multiple choice • 10 questions",
      xp: 30,
      difficulty: 1,
      status: "not-started" as const,
      action: () => onNavigate("practice"),
    },
    {
      time: "Today",
      label: difficultWords.length > 0 ? "Difficult Words" : "Confusables",
      sub:
        difficultWords.length > 0
          ? `${difficultWords.length} words need attention`
          : "Easily confused word pairs",
      xp: 60,
      difficulty: 3,
      status: "not-started" as const,
      action: () =>
        difficultWords.length > 0
          ? onNavigate("practice", { source: "difficult" })
          : onNavigate("confusables"),
    },
  ];

  const achievementIds = [
    "fifty_mastered",
    "xp_2500",
    "streak_7",
    "streak_14",
    "first_word",
    "ten_mastered",
  ];
  const showAchievements = achievementIds
    .map((id) => {
      const def = BADGES.find((b) => b.id === id);
      if (!def) return null;
      return { ...def, unlocked: !!gamification.badges[def.id] };
    })
    .filter((b): b is NonNullable<typeof b> => b !== null);

  const monthName = MONTHS[today.getMonth()];
  const todayDate = today.getDate();
  const flameCount = Math.min(7, streak.currentStreak);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-[1240px] mx-auto px-4 lg:px-6 py-6"
    >
      {/* ── Summary strip ── */}
      <div className="rounded-2xl border border-border bg-card px-5 py-4 flex flex-wrap items-center gap-x-8 gap-y-3 mb-6 shadow-sm">
        <button
          onClick={() => onNavigate("progress")}
          className="text-left hover:opacity-80 transition-opacity"
        >
          <div className="text-base font-extrabold tabular-nums">
            {totalMastered}
            <span className="text-muted-foreground text-sm font-medium">/{totalWords}</span>
          </div>
          <div className="text-[11px] text-muted-foreground mt-0.5 font-bold uppercase tracking-wider">
            Words
          </div>
        </button>

        <button
          onClick={() => onNavigate("progress")}
          className="text-left hover:opacity-80 transition-opacity"
        >
          <div className="text-base font-extrabold tabular-nums">
            {missionsCompleted}
            <span className="text-muted-foreground text-sm font-medium">/{TOTAL_DAYS}</span>
          </div>
          <div className="text-[11px] text-muted-foreground mt-0.5 font-bold uppercase tracking-wider">
            Missions
          </div>
        </button>

        <button
          onClick={() => onNavigate("progress")}
          className="text-left hover:opacity-80 transition-opacity"
        >
          <div className="text-base font-extrabold tabular-nums">
            {setsCompleted}
            <span className="text-muted-foreground text-sm font-medium">/{setsTotal}</span>
          </div>
          <div className="text-[11px] text-muted-foreground mt-0.5 font-bold uppercase tracking-wider">
            Sets
          </div>
        </button>

        <div className="w-px h-10 bg-border" />

        <button
          onClick={() => onNavigate("achievements")}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          title={`Level ${lvl.level} · ${lvl.xpInLevel}/${lvl.xpForNext} XP to next level`}
        >
          <div className="relative w-10 h-10 flex items-center justify-center">
            <svg className="absolute inset-0 -rotate-90" viewBox="0 0 36 36">
              <circle
                cx="18" cy="18" r="16" fill="none"
                stroke="currentColor" className="text-muted" strokeWidth="4"
              />
              <circle
                cx="18" cy="18" r="16" fill="none"
                stroke="#F59E0B" strokeWidth="4"
                strokeDasharray={2 * Math.PI * 16}
                strokeDashoffset={2 * Math.PI * 16 * (1 - lvl.progress)}
                strokeLinecap="round"
              />
            </svg>
            <span className="text-xs font-extrabold text-orange-600">{lvl.level}</span>
          </div>
          <div className="text-left">
            <div className="text-base font-extrabold tabular-nums text-foreground">
              {gamification.totalXp.toLocaleString()}
              <span className="text-xs text-muted-foreground font-medium"> XP</span>
            </div>
            <div className="text-[11px] text-muted-foreground mt-0.5 font-bold uppercase tracking-wider">
              Level {lvl.level} ({lvlPct}%)
            </div>
          </div>
        </button>

        <button
          onClick={() => onNavigate("achievements")}
          className="ml-auto flex items-center gap-3 bg-orange-50 dark:bg-orange-900/10 px-4 py-2 rounded-xl border border-orange-100 dark:border-orange-900/30 hover:bg-orange-100 dark:hover:bg-orange-900/20 transition-colors"
        >
          <div className="flex gap-1">
            {[...Array(7)].map((_, i) => (
              <Flame
                key={i}
                size={14}
                className={
                  i < flameCount
                    ? "text-orange-500 fill-orange-500"
                    : "text-orange-200 dark:text-orange-900"
                }
              />
            ))}
          </div>
          <div className="text-sm font-extrabold tabular-nums text-orange-600 dark:text-orange-500">
            {streak.currentStreak}d Streak
          </div>
        </button>
      </div>

      {/* ── Belt Journey Track ── */}
      <BeltJourneyTrack
        beltStats={beltStats}
        currentBeltIdx={currentBeltIdx}
        onNavigate={onNavigate}
      />

      <div className="space-y-6">
        {/* ── Today's Agenda ── */}
        <section className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm relative">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "linear-gradient(180deg, #F973160F 0px, transparent 120px)" }}
          />

          <div className="flex items-center justify-between gap-3 px-5 py-3 border-b border-border relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-extrabold shrink-0 shadow-sm bg-orange-500">
                <Target size={16} strokeWidth={2.5} />
              </div>
              <div>
                <div className="font-extrabold text-base text-orange-600 dark:text-orange-400">
                  Today's Agenda
                </div>
                <div className="text-[11px] text-muted-foreground font-medium">
                  Your priority tasks for {monthName} {todayDate}
                </div>
              </div>
            </div>
            {resumeMission !== null && (
              <button
                onClick={() => onNavigate("study", { day: resumeMission })}
                className="hidden sm:flex shrink-0 items-center gap-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold px-3 py-1.5 shadow-sm transition-colors"
              >
                <Sparkles size={12} /> Resume Mission {resumeMission}
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 relative z-10">
            {agenda.map((item, i) => {
              const active = item.status === "in-progress";
              return (
                <button
                  key={i}
                  onClick={item.action}
                  className={`group rounded-xl border bg-card p-5 flex flex-col min-h-[140px] hover:shadow-md transition-all text-left relative overflow-hidden ${
                    active
                      ? "border-orange-400 ring-2 ring-orange-100 dark:ring-orange-900/40 shadow-sm"
                      : "border-border"
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div
                      className={`px-2.5 py-1 rounded-md border text-[10px] font-extrabold tabular-nums uppercase tracking-wider ${
                        active
                          ? "border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-900 dark:bg-orange-900/30 dark:text-orange-300"
                          : "border-border bg-muted/50 text-muted-foreground"
                      }`}
                    >
                      {item.time}
                    </div>
                    <div className="flex gap-0.5">
                      {[...Array(3)].map((_, j) => (
                        <ShurikenIcon
                          key={j}
                          size={14}
                          filled={j < item.difficulty}
                          color={active ? "#F97316" : "#9CA3AF"}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="text-base font-extrabold mt-1 text-foreground">
                    {item.label}
                  </div>
                  <div className="text-[12px] text-muted-foreground font-medium mt-0.5 mb-4">
                    {item.sub}
                  </div>

                  <div className="mt-auto flex items-center justify-between">
                    <div className="bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-[10px] font-extrabold px-2 py-1 rounded-md flex items-center gap-1">
                      <Zap size={12} fill="currentColor" /> +{item.xp} XP
                    </div>
                    {active ? (
                      <div className="bg-orange-500 text-white text-[11px] font-bold px-4 py-1.5 rounded-lg shadow-sm group-hover:bg-orange-600 transition-colors">
                        Start
                      </div>
                    ) : (
                      <div className="text-[11px] font-bold text-muted-foreground group-hover:text-foreground transition-colors flex items-center gap-1">
                        Pending <ChevronRight size={12} />
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* ── Weekly Activity + Word Status ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <section className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm relative">
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: "linear-gradient(180deg, #3B82F60F 0px, transparent 120px)" }}
            />

            <div className="flex items-center gap-3 px-5 py-3 border-b border-border relative z-10">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-extrabold shrink-0 shadow-sm bg-blue-500">
                <CalendarDays size={16} />
              </div>
              <div>
                <div className="font-extrabold text-base text-blue-600 dark:text-blue-400">
                  Weekly Activity
                </div>
                <div className="text-[11px] text-muted-foreground font-medium">
                  Your study consistency
                </div>
              </div>
            </div>
            <div className="p-5 relative z-10">
              <BarChart data={reviewedByDay} max={barMax} todayIdx={todayIdx} />
              <div className="grid grid-cols-7 gap-1 mt-2 text-center border-t border-border pt-4">
                {reviewedByDay.map((d, i) => {
                  const isToday = i === todayIdx;
                  return (
                    <div key={i} className="flex flex-col items-center gap-1">
                      <div className="text-[10px] font-bold text-muted-foreground">
                        {WEEKDAYS[d.date.getDay()]}
                      </div>
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-extrabold tabular-nums ${
                          isToday
                            ? "bg-blue-500 text-white ring-4 ring-blue-100 dark:ring-blue-900/30"
                            : "text-foreground"
                        }`}
                      >
                        {d.date.getDate()}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm relative">
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: "linear-gradient(180deg, #10B9810F 0px, transparent 120px)" }}
            />

            <div className="flex items-center gap-3 px-5 py-3 border-b border-border relative z-10">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-extrabold shrink-0 shadow-sm bg-emerald-500">
                <Target size={16} />
              </div>
              <div>
                <div className="font-extrabold text-base text-emerald-600 dark:text-emerald-400">
                  Word Status
                </div>
                <div className="text-[11px] text-muted-foreground font-medium">
                  Vocabulary breakdown
                </div>
              </div>
            </div>
            <div className="p-6 flex items-center gap-8 h-[252px] relative z-10">
              <DonutChart
                segments={donutSegments}
                level={lvl.level}
                beltColor={currentBelt?.color ?? "#F59E0B"}
                beltTextColor={currentBelt?.textColor ?? "#D97706"}
              />
              <div className="flex-1 space-y-3">
                {donutSegments.map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: item.color }} />
                      <span className="text-sm font-bold text-muted-foreground">{item.label}</span>
                    </div>
                    <span className="font-extrabold tabular-nums text-foreground">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* ── Progress by Belt ── */}
        <section className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm relative">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "linear-gradient(180deg, #1F29370F 0px, transparent 120px)" }}
          />

          <div className="flex items-center justify-between gap-3 px-5 py-3 border-b border-border relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-extrabold shrink-0 shadow-sm bg-gray-800">
                <TrendingUp size={16} />
              </div>
              <div>
                <div className="font-extrabold text-base text-gray-800 dark:text-gray-200">
                  Progress by Belt
                </div>
                <div className="text-[11px] text-muted-foreground font-medium">
                  Your {TOTAL_DAYS}-day mission tracker
                </div>
              </div>
            </div>
            <button
              onClick={() => onNavigate("study")}
              className="text-[11px] font-extrabold text-orange-600 hover:text-orange-700 uppercase tracking-wider"
            >
              All Missions →
            </button>
          </div>

          <div className="p-5 flex flex-col gap-6 relative z-10">
            {beltStats.map((belt) => {
              if (belt.totalDays === 0) return null;
              return (
                <div key={belt.idx} className="flex flex-col md:flex-row gap-4 items-start">
                  <div className="w-full md:w-[140px] shrink-0 md:pt-2">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: belt.color }} />
                      <div className="font-extrabold text-sm" style={{ color: belt.textColor }}>
                        {belt.name}
                      </div>
                    </div>
                    <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider pl-5">
                      {belt.subtitle} • {belt.completedDays}/{belt.totalDays}
                    </div>
                  </div>

                  <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 w-full">
                    {belt.days.map((d) => {
                      const done = d.pct === 100;
                      const inProgress = !done && d.pct > 0;
                      return (
                        <button
                          key={d.day}
                          onClick={() => onNavigate("study", { day: d.day })}
                          className={`relative rounded-xl border bg-card p-3 flex flex-col gap-2 min-h-[90px] cursor-pointer hover:-translate-y-0.5 hover:shadow-md transition-all text-left ${
                            done
                              ? "border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/30 dark:bg-emerald-900/10"
                              : inProgress
                              ? "border-orange-300 ring-1 ring-orange-200 dark:border-orange-700 dark:ring-orange-900/30"
                              : "border-border"
                          }`}
                          title={`Day ${d.day} — ${d.mastered}/${d.total} mastered`}
                        >
                          <div className="absolute top-2 right-2 text-[9px] font-extrabold tabular-nums opacity-50">
                            {d.pct}%
                          </div>
                          <div className="flex items-center gap-2">
                            <div
                              className="w-6 h-6 rounded-md flex items-center justify-center text-xs font-extrabold text-white shadow-sm"
                              style={{
                                backgroundColor: done ? "#10B981" : belt.color,
                                opacity: d.pct === 0 ? 0.6 : 1,
                              }}
                            >
                              {done ? <Check size={14} strokeWidth={3} /> : `M${d.day}`}
                            </div>
                          </div>

                          <div className="mt-auto">
                            <div className="flex items-center gap-1.5 mb-1.5">
                              <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                                <div
                                  className="h-full rounded-full transition-all"
                                  style={{
                                    width: `${d.pct}%`,
                                    backgroundColor: done ? "#10B981" : belt.color,
                                  }}
                                />
                              </div>
                            </div>
                            <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                              Day {d.day}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Mascot + Difficult + Achievements ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Mascot */}
              <section className="rounded-2xl border border-orange-200 dark:border-orange-900/30 bg-gradient-to-br from-orange-50 to-rose-50 dark:from-orange-950/20 dark:to-rose-950/20 p-6 flex items-center gap-5 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 dark:bg-orange-500/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />

                <div className="w-24 h-24 shrink-0 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 p-2 shadow-lg relative flex items-center justify-center">
                  <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                    <circle cx="32" cy="32" r="28" fill="#1F2937" />
                    <path d="M 4 28 Q 32 24 60 28 L 60 36 Q 32 32 4 36 Z" fill="#EF4444" />
                    <circle cx="22" cy="32" r="3" fill="white" />
                    <circle cx="42" cy="32" r="3" fill="white" />
                    <path d="M 12 40 Q 32 50 52 40 L 48 56 Q 32 64 16 56 Z" fill="#111827" />
                  </svg>
                  <div className="absolute -bottom-2 -right-2 bg-white dark:bg-gray-800 p-1.5 rounded-full shadow-sm">
                    <Sparkles size={14} className="text-orange-500" />
                  </div>
                </div>

                <div className="relative z-10">
                  <div className="text-[10px] font-extrabold text-orange-600 uppercase tracking-wider mb-1">
                    Daily Encouragement
                  </div>
                  <div className="text-sm text-gray-800 dark:text-gray-200 font-medium leading-relaxed italic">
                    {streak.currentStreak >= 7
                      ? `"${streak.currentStreak} days strong — you're unstoppable, Ninja."`
                      : `"Consistency is your greatest weapon. Keep training, Ninja."`}
                  </div>
                </div>
              </section>

              {/* Difficult / Needs Focus */}
              <section className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm relative">
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: "linear-gradient(180deg, #8B5CF60F 0px, transparent 120px)" }}
                />
                <div className="flex items-center justify-between px-5 py-3 border-b border-border relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-extrabold shrink-0 shadow-sm bg-purple-500">
                      <Zap size={16} />
                    </div>
                    <div>
                      <div className="font-extrabold text-base text-purple-600 dark:text-purple-400">
                        Needs Focus
                      </div>
                      <div className="text-[11px] text-muted-foreground font-medium">
                        Review these words
                      </div>
                    </div>
                  </div>
                  {difficultWords.length > 0 && (
                    <button
                      onClick={() => onNavigate("practice", { source: "difficult" })}
                      className="text-[11px] font-extrabold text-purple-600 hover:text-purple-700 uppercase tracking-wider"
                    >
                      Practice →
                    </button>
                  )}
                </div>
                <div className="p-4 flex flex-wrap gap-2.5 content-start relative z-10 min-h-[160px]">
                  {difficultWords.length === 0 ? (
                    <div className="text-sm text-muted-foreground font-medium italic m-auto">
                      No difficult words yet — keep training!
                    </div>
                  ) : (
                    <>
                      {difficultWords.slice(0, 8).map((w) => (
                        <button
                          key={w.id}
                          onClick={() => onNavigate("study", { wordId: w.id })}
                          className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-md border border-purple-200 bg-purple-50 text-purple-800 dark:border-purple-900/50 dark:bg-purple-900/20 dark:text-purple-300 font-bold shadow-sm hover:shadow-md transition-all"
                        >
                          <ShurikenIcon size={12} color="#8B5CF6" />
                          {w.word}
                        </button>
                      ))}
                      {difficultWords.length > 8 && (
                        <button
                          onClick={() => onNavigate("practice", { source: "difficult" })}
                          className="text-xs px-3 py-1.5 rounded-md text-muted-foreground font-bold hover:text-foreground transition-colors flex items-center"
                        >
                          +{difficultWords.length - 8} more
                        </button>
                      )}
                    </>
                  )}
                </div>
              </section>
            </div>
          </div>

          {/* Achievements */}
          <section className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm relative lg:col-span-1">
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: "linear-gradient(180deg, #F59E0B0F 0px, transparent 120px)" }}
            />
            <div className="flex items-center justify-between px-5 py-3 border-b border-border relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-extrabold shrink-0 shadow-sm bg-amber-500">
                  <Trophy size={16} />
                </div>
                <div>
                  <div className="font-extrabold text-base text-amber-600 dark:text-amber-400">
                    Achievements
                  </div>
                </div>
              </div>
              <button
                onClick={() => onNavigate("achievements")}
                className="text-[11px] font-extrabold text-amber-600 hover:text-amber-700 uppercase tracking-wider"
              >
                View All
              </button>
            </div>

            <div className="p-5 flex flex-col gap-4 relative z-10">
              {showAchievements.map((ach) => (
                <button
                  key={ach.id}
                  onClick={() => onNavigate("achievements")}
                  className="flex items-center gap-3 text-left hover:opacity-80 transition-opacity"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 shadow-sm border"
                    style={{
                      backgroundColor: ach.unlocked ? "#FEF3C7" : "#F3F4F6",
                      borderColor: ach.unlocked ? "#FDE68A" : "#E5E7EB",
                    }}
                  >
                    {ach.unlocked ? ach.emoji : <Lock size={14} className="text-gray-400" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div
                      className={`text-sm font-extrabold truncate ${
                        ach.unlocked ? "text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {ach.title}
                    </div>
                    <div className="text-[11px] text-muted-foreground font-medium truncate">
                      {ach.description}
                    </div>
                  </div>
                  {ach.unlocked && (
                    <Check size={16} className="text-emerald-500 shrink-0" strokeWidth={3} />
                  )}
                </button>
              ))}
            </div>
          </section>
        </div>
      </div>
    </motion.div>
  );
}
