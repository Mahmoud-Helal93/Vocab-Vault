import { useState, useCallback, useMemo, Fragment } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/context/AppContext";
import Flashcard from "@/components/Flashcard";
import RichFlashcard from "@/components/RichFlashcard";
import { getEnrichment } from "@/data/enrichment";
import { shuffleArray } from "@/lib/srs";
import { TOTAL_DAYS, GROUPS_PER_DAY, type Word } from "@/data/words";
import { ChevronLeft, ChevronRight, Shuffle, ArrowLeft, Grid3X3, Flame, Check, BookOpen, Lock, Trophy } from "lucide-react";
import { BADGES, levelFromXp } from "@/lib/gamification";
import { loadMissionTestScores } from "@/lib/storage";
import ninjaMascot from "@assets/Gemini_Generated_Image_hflkzzhflkzzhflk_1776994719274.png";
import ProgressSidebar from "@/components/ProgressSidebar";

type View = "day-select" | "group-select" | "study";

interface StudyModeProps {
  onBack: () => void;
  onNavigate?: (page: string, params?: Record<string, unknown>) => void;
  initialDay?: number;
  initialWordId?: string;
}

const BELTS = [
  { num: 1, name: "White Belt",  subtitle: "Foundation",  desc: "Build your word base",        color: "#9CA3AF", bgLight: "#F9FAFB", bgDark: "rgba(156,163,175,0.15)", textColor: "#6B7280" },
  { num: 2, name: "Yellow Belt", subtitle: "Expansion",   desc: "Grow your vocabulary",         color: "#F59E0B", bgLight: "#FFFBEB", bgDark: "rgba(245,158,11,0.15)",  textColor: "#D97706" },
  { num: 3, name: "Green Belt",  subtitle: "Strength",    desc: "Build strong word power",       color: "#10B981", bgLight: "#ECFDF5", bgDark: "rgba(16,185,129,0.15)", textColor: "#059669" },
  { num: 4, name: "Blue Belt",   subtitle: "Precision",   desc: "Sharpen your accuracy",         color: "#3B82F6", bgLight: "#EFF6FF", bgDark: "rgba(59,130,246,0.15)", textColor: "#2563EB" },
  { num: 5, name: "Purple Belt", subtitle: "Mastery",     desc: "Master complex words",          color: "#8B5CF6", bgLight: "#F5F3FF", bgDark: "rgba(139,92,246,0.15)", textColor: "#7C3AED" },
  { num: 6, name: "Black Belt",  subtitle: "Expertise",   desc: "Ultimate word mastery",         color: "#1F2937", bgLight: "#F3F4F6", bgDark: "rgba(31,41,55,0.25)",   textColor: "#111827" },
];

function ShurikenIcon({ size = 22, filled = true, color = "#3B82F6" }: { size?: number; filled?: boolean; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2 L14.5 9.5 L22 12 L14.5 14.5 L12 22 L9.5 14.5 L2 12 L9.5 9.5 Z"
        fill={filled ? color : "none"}
        stroke={color}
        strokeWidth={filled ? 0 : 1.5}
        opacity={filled ? 1 : 0.35}
      />
    </svg>
  );
}

function FlagIcon({ label, done, active }: { label: string; done: boolean; active: boolean }) {
  const bg = done ? "#10B981" : active ? "#F97316" : "#FB923C";
  const opacity = done ? 1 : active ? 1 : 0.85;
  return (
    <div className="flex flex-col items-center gap-0.5" style={{ opacity }}>
      <div
        className="relative flex items-center justify-center rounded-sm text-white font-bold select-none"
        style={{ backgroundColor: bg, width: 30, height: 28, fontSize: 9, letterSpacing: "0.02em" }}
      >
        {done ? <Check size={11} strokeWidth={3} /> : label}
        <div
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0"
          style={{ borderLeft: "6px solid transparent", borderRight: "6px solid transparent", borderTop: `6px solid ${bg}` }}
        />
      </div>
    </div>
  );
}

function BeltGiIcon({ color, size = 40 }: { color: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <rect x="4" y="2" width="32" height="36" rx="4" fill="#F3F4F6" stroke="#E5E7EB" strokeWidth="1"/>
      <path d="M20 2 L12 14 L20 20 L28 14 Z" fill={color} opacity="0.8"/>
      <rect x="12" y="18" width="16" height="4" rx="2" fill={color}/>
    </svg>
  );
}

function CircularProgress({ pct, size = 110 }: { pct: number; size?: number }) {
  const r = (size - 12) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} stroke="#E5E7EB" strokeWidth="10" fill="none" />
        <circle
          cx={size / 2} cy={size / 2} r={r}
          stroke="#10B981" strokeWidth="10" fill="none"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute text-center">
        <div className="text-2xl font-bold text-foreground">{pct}%</div>
        <div className="text-[10px] text-muted-foreground leading-tight">Overall<br/>Progress</div>
      </div>
    </div>
  );
}

export default function StudyMode({ onBack, onNavigate, initialDay, initialWordId }: StudyModeProps) {
  const { words, markWordReviewed, settings, streak, gamification } = useApp();
  const initialWord = initialWordId ? words.find((w) => w.id === initialWordId) : undefined;
  const [view, setView] = useState<View>(initialWord || initialDay ? (initialWord ? "study" : "group-select") : "day-select");
  const [selectedDay, setSelectedDay] = useState<number>(initialWord?.day ?? initialDay ?? 1);
  const [selectedGroup, setSelectedGroup] = useState<number | null>(initialWord?.group ?? null);
  const [cardIndex, setCardIndex] = useState(0);
  const [isShuffled, setIsShuffled] = useState(false);
  const [focusMode, setFocusMode] = useState(false);

  const studyWords = useMemo(() => {
    let base =
      selectedGroup === null
        ? words.filter((w) => w.day === selectedDay)
        : words.filter((w) => w.day === selectedDay && w.group === selectedGroup);
    return isShuffled ? shuffleArray(base) : base;
  }, [words, selectedDay, selectedGroup, isShuffled]);

  const [didJump, setDidJump] = useState(false);
  if (!didJump && initialWordId && studyWords.length > 0) {
    const idx = studyWords.findIndex((w) => w.id === initialWordId);
    if (idx >= 0) setCardIndex(idx);
    setDidJump(true);
  }

  const currentWord = studyWords[cardIndex];

  const handleNext = useCallback(() => {
    setCardIndex((i) => Math.min(i + 1, studyWords.length - 1));
  }, [studyWords.length]);

  const handlePrev = useCallback(() => {
    setCardIndex((i) => Math.max(i - 1, 0));
  }, []);

  const handleArrowKeys = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    },
    [handleNext, handlePrev]
  );

  const dayWords = useMemo(
    () => Array.from({ length: TOTAL_DAYS }, (_, i) => words.filter((w) => w.day === i + 1)),
    [words]
  );

  const totalMastered = useMemo(() => words.filter((w) => w.status === "mastered").length, [words]);
  const totalWords = words.length;
  const overallPct = totalWords > 0 ? Math.round((totalMastered / totalWords) * 100) : 0;

  const missionsCompleted = useMemo(() => {
    return Array.from({ length: TOTAL_DAYS }, (_, i) => {
      const dw = dayWords[i];
      return dw.length > 0 && dw.every((w) => w.status === "mastered");
    }).filter(Boolean).length;
  }, [dayWords]);

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

  const allBeltsComplete = missionsCompleted === TOTAL_DAYS;

  const sidebarAchievements = useMemo(() => {
    const ids = ["five_hundred_mastered", "xp_2500", "streak_7", "streak_14"];
    const shown = ids.map((id) => {
      const def = BADGES.find((b) => b.id === id);
      if (!def) return null;
      return { ...def, unlocked: !!gamification.badges[id] };
    }).filter(Boolean);
    shown.push({ id: "black_belt_custom", emoji: "🥋", title: "Black Belt", description: "Complete all belts", unlocked: allBeltsComplete, category: "milestone", check: () => false } as any);
    return shown;
  }, [gamification.badges, allBeltsComplete]);

  if (view === "day-select") {
    return (
      <div className="flex gap-5 px-4 py-6 min-h-[calc(100vh-3.5rem)] lg:min-h-screen">
        {/* ── Main belt table ── */}
        <div className="flex-1 min-w-0">
          {/* Top stats bar */}
          <div className="rounded-2xl border border-border bg-card px-5 py-3 mb-5 flex items-center justify-between flex-wrap gap-4">
            <button
              onClick={() => onNavigate?.("progress")}
              className="flex items-center gap-3 px-2 py-1 rounded-lg hover:bg-muted transition-colors"
            >
              <span className="text-2xl">📗</span>
              <div className="text-left">
                <div className="text-base font-bold text-emerald-600 tabular-nums leading-none">{totalMastered.toLocaleString()}</div>
                <div className="text-[11px] text-muted-foreground mt-0.5">Words Learned</div>
              </div>
            </button>
            <button
              onClick={() => onNavigate?.("progress")}
              className="flex items-center gap-3 px-2 py-1 rounded-lg hover:bg-muted transition-colors"
            >
              <span className="text-2xl">🚩</span>
              <div className="text-left">
                <div className="text-base font-bold tabular-nums leading-none">
                  <span className="text-orange-500">{missionsCompleted}</span>
                  <span className="text-muted-foreground"> / {TOTAL_DAYS}</span>
                </div>
                <div className="text-[11px] text-muted-foreground mt-0.5">Missions Done</div>
              </div>
            </button>
            <button
              onClick={() => onNavigate?.("progress")}
              className="flex items-center gap-3 px-2 py-1 rounded-lg hover:bg-muted transition-colors"
            >
              <ShurikenIcon size={26} color="#3B82F6" />
              <div className="text-left">
                <div className="text-base font-bold tabular-nums leading-none">
                  <span className="text-blue-500">{setsCompleted}</span>
                  <span className="text-muted-foreground"> / {TOTAL_DAYS * GROUPS_PER_DAY}</span>
                </div>
                <div className="text-[11px] text-muted-foreground mt-0.5">Sets Completed</div>
              </div>
            </button>
            {(() => {
              const lvl = levelFromXp(gamification.totalXp);
              const pct = Math.round(lvl.progress * 100);
              return (
                <button
                  onClick={() => onNavigate?.("achievements")}
                  className="flex items-center gap-3 px-2 py-1 rounded-lg hover:bg-muted transition-colors"
                  title={`Level ${lvl.level} · ${lvl.xpInLevel}/${lvl.xpForNext} XP to next level`}
                >
                  <div className="relative w-9 h-9 shrink-0">
                    <svg width="36" height="36" viewBox="0 0 36 36" className="-rotate-90">
                      <circle cx="18" cy="18" r="15" fill="none" stroke="#E5E7EB" strokeWidth="3" />
                      <circle
                        cx="18" cy="18" r="15" fill="none"
                        stroke="#8B5CF6" strokeWidth="3" strokeLinecap="round"
                        strokeDasharray={2 * Math.PI * 15}
                        strokeDashoffset={2 * Math.PI * 15 * (1 - lvl.progress)}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 text-white flex items-center justify-center text-[9px] font-extrabold">
                        {lvl.level}
                      </div>
                    </div>
                  </div>
                  <div className="text-left">
                    <div className="text-base font-bold text-foreground tabular-nums leading-none">{gamification.totalXp.toLocaleString()}</div>
                    <div className="text-[11px] text-muted-foreground mt-0.5">XP Earned · Lv {lvl.level} ({pct}%)</div>
                  </div>
                </button>
              );
            })()}
            <button
              onClick={() => onNavigate?.("achievements")}
              className="flex items-center gap-3 px-2 py-1 rounded-lg hover:bg-muted transition-colors"
            >
              <Flame size={24} className="text-orange-500" />
              <div className="text-left">
                <div className="text-base font-bold text-orange-500 tabular-nums leading-none">{streak.currentStreak}</div>
                <div className="text-[11px] text-muted-foreground mt-0.5">Day Streak</div>
              </div>
            </button>
          </div>

          {/* Table column header */}
          <div className="flex items-center mb-3 px-1">
            <div className="w-52 shrink-0">
              <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "#10B981" }}>
                {BELTS.length} BELTS
              </span>
            </div>
            <div className="flex-1">
              <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "#F97316" }}>
                {TOTAL_DAYS} MISSIONS
              </span>
            </div>
            <div className="w-36 shrink-0 text-right">
              <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "#3B82F6" }}>
                {TOTAL_DAYS * GROUPS_PER_DAY} SETS
              </span>
            </div>
          </div>

          {/* Belt rows */}
          <div className="space-y-3">
            {BELTS.map((belt, bIdx) => {
              const startDay = bIdx * 7 + 1;
              const endDay = Math.min(startDay + 6, TOTAL_DAYS);
              const missionDays = Array.from({ length: endDay - startDay + 1 }, (_, k) => startDay + k);

              const beltMastered = missionDays.reduce((acc, d) => {
                const dw = dayWords[d - 1] ?? [];
                return acc + dw.filter((w) => w.status === "mastered").length;
              }, 0);
              const beltTotal = missionDays.reduce((acc, d) => acc + (dayWords[d - 1]?.length ?? 0), 0);

              const setsForBelt: { done: boolean }[] = [];
              for (const d of missionDays) {
                for (let g = 1; g <= GROUPS_PER_DAY; g++) {
                  const gw = words.filter((w) => w.day === d && w.group === g);
                  setsForBelt.push({ done: gw.length > 0 && gw.every((w) => w.status === "mastered") });
                }
              }
              const setsCompleted = setsForBelt.filter((s) => s.done).length;

              return (
                <motion.div
                  key={belt.num}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: bIdx * 0.06 }}
                  className="rounded-2xl border border-border bg-card overflow-hidden"
                >
                  <div className="flex items-center gap-3 p-3">
                    {/* Belt number circle */}
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
                      style={{ backgroundColor: belt.color }}
                    >
                      {belt.num}
                    </div>

                    {/* Belt gi icon */}
                    <div className="shrink-0">
                      <BeltGiIcon color={belt.color} size={38} />
                    </div>

                    {/* Belt info */}
                    <div className="w-28 shrink-0">
                      <div className="font-bold text-sm text-foreground">{belt.name}</div>
                      <div className="text-xs font-medium" style={{ color: belt.textColor }}>{belt.subtitle}</div>
                      <div className="text-[10px] text-muted-foreground leading-tight">{belt.desc}</div>
                    </div>

                    {/* Missions (M1–M7) */}
                    <div className="flex-1 flex items-end gap-1.5 flex-wrap">
                      {missionDays.map((day, i) => {
                        const dw = dayWords[day - 1] ?? [];
                        const mDone = dw.length > 0 && dw.every((w) => w.status === "mastered");
                        return (
                          <div key={day} className="flex flex-col items-center gap-1">
                            <button
                              onClick={() => {
                                setSelectedDay(day);
                                setSelectedGroup(null);
                                setCardIndex(0);
                                setView("group-select");
                              }}
                              className="flex flex-col items-center gap-1 hover:scale-110 transition-transform"
                              title={`Mission ${i + 1} — Day ${day}`}
                            >
                              <FlagIcon label={`M${i + 1}`} done={mDone} active={!mDone} />
                            </button>
                            <button
                              onClick={() => onNavigate?.("mission-test", { missionDay: day })}
                              title={`Mission ${i + 1} Test`}
                              className="text-[8px] font-bold px-1 py-0.5 rounded bg-orange-100 hover:bg-orange-200 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 transition-colors leading-none"
                            >
                              TEST
                            </button>
                          </div>
                        );
                      })}
                    </div>

                    {/* Sets (shuriken icons) */}
                    <div className="w-28 shrink-0 flex flex-col items-center gap-1">
                      <div className="flex flex-wrap justify-center gap-1">
                        {Array.from({ length: Math.min(setsForBelt.length, 6) }, (_, i) => (
                          <ShurikenIcon
                            key={i}
                            size={18}
                            filled={setsForBelt[i]?.done}
                            color="#3B82F6"
                          />
                        ))}
                        {setsForBelt.length > 6 && (
                          <span className="text-[9px] text-muted-foreground">+{setsForBelt.length - 6}</span>
                        )}
                      </div>
                      <div className="text-[9px] text-muted-foreground">(10 words each)</div>
                    </div>

                    {/* Word count pill */}
                    <div
                      className="shrink-0 rounded-xl px-3 py-1.5 text-center ml-1"
                      style={{ backgroundColor: beltTotal === beltMastered && beltTotal > 0 ? "#ECFDF5" : "#FFF7ED" }}
                    >
                      <div
                        className="text-base font-extrabold tabular-nums"
                        style={{ color: beltTotal === beltMastered && beltTotal > 0 ? "#10B981" : "#F97316" }}
                      >
                        {beltTotal}
                      </div>
                      <div className="text-[9px] font-semibold" style={{ color: "#F97316" }}>words</div>
                    </div>
                  </div>

                  {/* Progress bar */}
                  {beltTotal > 0 && (
                    <div className="h-1 bg-muted">
                      <div
                        className="h-full transition-all duration-500"
                        style={{
                          width: `${Math.round((beltMastered / beltTotal) * 100)}%`,
                          backgroundColor: belt.color,
                        }}
                      />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

        </div>

        {/* ── Right sidebar ── */}
        <div className="w-64 shrink-0 space-y-4">
          {/* Your Progress card */}
          <div className="rounded-2xl border border-border bg-card p-4">
            <div className="font-bold text-foreground mb-4">Your Progress</div>

            <div className="flex items-center justify-center mb-4">
              <CircularProgress pct={overallPct} size={110} />
            </div>

            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-base">📗</span>
                  <span className="text-xs text-muted-foreground">Words Mastered</span>
                </div>
                <span className="text-xs font-bold text-foreground tabular-nums">
                  {totalMastered.toLocaleString()} / {totalWords.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-base">🚩</span>
                  <span className="text-xs text-muted-foreground">Missions Completed</span>
                </div>
                <span className="text-xs font-bold text-foreground tabular-nums">
                  {missionsCompleted} / {TOTAL_DAYS}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShurikenIcon size={16} color="#3B82F6" />
                  <span className="text-xs text-muted-foreground">Sets Completed</span>
                </div>
                <span className="text-xs font-bold text-foreground tabular-nums">
                  {setsCompleted} / {TOTAL_DAYS * GROUPS_PER_DAY}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-base">⭐</span>
                  <span className="text-xs text-muted-foreground">Total XP Earned</span>
                </div>
                <span className="text-xs font-bold text-foreground tabular-nums">
                  {gamification.totalXp.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Achievements card */}
          <div className="rounded-2xl border border-border bg-card p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="font-bold text-foreground">Achievements</div>
              <button className="text-[11px] text-primary hover:underline">View all</button>
            </div>
            <div className="space-y-2">
              {sidebarAchievements.map((ach: any) => (
                <div key={ach.id} className="flex items-center gap-2.5">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-base"
                    style={{ backgroundColor: ach.unlocked ? "#FEF3C7" : "#F3F4F6" }}
                  >
                    {ach.unlocked ? ach.emoji : <Lock size={13} className="text-muted-foreground" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-foreground truncate">{ach.title}</div>
                    <div className="text-[10px] text-muted-foreground truncate">{ach.description}</div>
                  </div>
                  {ach.unlocked ? (
                    <Check size={14} className="text-emerald-500 shrink-0" strokeWidth={2.5} />
                  ) : (
                    <Lock size={13} className="text-muted-foreground shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Mascot motivational card */}
          <div className="rounded-2xl border border-border bg-card p-4 flex gap-3">
            <img
              src={ninjaMascot}
              alt="Vocab Ninja"
              className="w-14 h-14 shrink-0 object-contain"
            />
            <div className="text-xs text-muted-foreground leading-relaxed">
              Every word you master is a step toward becoming unstoppable.{" "}
              <span className="font-semibold" style={{ color: "#F97316" }}>
                Keep training, Ninja! 🤙
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (view === "group-select") {
    const missionTestBest = loadMissionTestScores()[selectedDay ?? 0];
    return (
      <div className="flex gap-5 px-4 py-8 min-h-[calc(100vh-3.5rem)] lg:min-h-screen">
        <div className="flex-1 min-w-0 max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <button onClick={() => setView("day-select")} className="p-2 rounded-xl hover:bg-muted transition-colors">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Mission {selectedDay}</h1>
            <p className="text-muted-foreground text-sm">Select a set or study all</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => {
              setSelectedGroup(null);
              setCardIndex(0);
              setView("study");
            }}
            className="relative overflow-hidden text-left px-5 py-4 bg-[#F97316] text-white rounded-2xl shadow-sm hover:bg-[#EA580C] transition-colors col-span-full"
          >
            <div className="flex items-center gap-3 relative z-10">
              <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                <Grid3X3 size={22} className="text-white" />
              </div>
              <div>
                <div className="font-bold text-xl leading-tight">All 30 Words</div>
                <div className="text-sm opacity-90">Study the entire mission</div>
              </div>
            </div>
            <BookOpen
              size={120}
              strokeWidth={1.5}
              className="absolute -right-2 top-1/2 -translate-y-1/2 text-white/25 pointer-events-none"
            />
          </motion.button>

          {Array.from({ length: GROUPS_PER_DAY }, (_, i) => {
            const group = i + 1;
            const missionTestCard = (
              <motion.button
                key="mission-test"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (GROUPS_PER_DAY + 1) * 0.07 }}
                onClick={() => onNavigate?.("mission-test", { missionDay: selectedDay })}
                className="relative overflow-hidden text-left p-6 bg-card border border-card-border rounded-2xl shadow-sm hover:border-orange-400 transition-all min-h-[260px]"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-orange-500" />
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[18px] leading-none">📋</span>
                    <span className="font-semibold text-foreground text-lg">Mission Test</span>
                  </div>
                  <span className="text-sm text-muted-foreground inline-flex items-center gap-1">
                    {typeof missionTestBest === "number" ? (
                      <><Trophy size={12} className="text-orange-500" /> {missionTestBest}%</>
                    ) : (
                      "—"
                    )}
                  </span>
                </div>
                <div className="h-1.5 bg-muted rounded-full mb-4 overflow-hidden">
                  <div
                    className="h-full bg-orange-500 rounded-full"
                    style={{ width: `${typeof missionTestBest === "number" ? missionTestBest : 0}%` }}
                  />
                </div>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border bg-orange-50 border-orange-200 text-orange-700 dark:bg-orange-900/20 dark:border-orange-800 dark:text-orange-400">
                    10 · MCQ
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border bg-orange-50 border-orange-200 text-orange-700 dark:bg-orange-900/20 dark:border-orange-800 dark:text-orange-400">
                    10 · Fill in Blank
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border bg-orange-50 border-orange-200 text-orange-700 dark:bg-orange-900/20 dark:border-orange-800 dark:text-orange-400">
                    10 · True/False
                  </span>
                </div>
                <div className="text-xs text-muted-foreground flex items-center gap-1">
                  <span>Test all 30 words</span>
                  <ChevronRight size={12} />
                </div>
              </motion.button>
            );
            const gw = words.filter((w) => w.day === selectedDay && w.group === group);
            const mastered = gw.filter((w) => w.status === "mastered").length;
            const pct = Math.round((mastered / gw.length) * 100);
            const accents = [
              { bar: "bg-blue-500", icon: "#3B82F6", border: "hover:border-blue-400", pill: "bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-400 hover:border-blue-400" },
              { bar: "bg-purple-500", icon: "#8B5CF6", border: "hover:border-purple-400", pill: "bg-purple-50 border-purple-200 text-purple-700 dark:bg-purple-900/20 dark:border-purple-800 dark:text-purple-400 hover:border-purple-400" },
              { bar: "bg-pink-500", icon: "#EC4899", border: "hover:border-pink-400", pill: "bg-pink-50 border-pink-200 text-pink-700 dark:bg-pink-900/20 dark:border-pink-800 dark:text-pink-400 hover:border-pink-400" },
              { bar: "bg-amber-500", icon: "#F59E0B", border: "hover:border-amber-400", pill: "bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-900/20 dark:border-amber-800 dark:text-amber-400 hover:border-amber-400" },
              { bar: "bg-emerald-500", icon: "#10B981", border: "hover:border-emerald-400", pill: "bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-900/20 dark:border-emerald-800 dark:text-emerald-400 hover:border-emerald-400" },
              { bar: "bg-cyan-500", icon: "#06B6D4", border: "hover:border-cyan-400", pill: "bg-cyan-50 border-cyan-200 text-cyan-700 dark:bg-cyan-900/20 dark:border-cyan-800 dark:text-cyan-400 hover:border-cyan-400" },
              { bar: "bg-rose-500", icon: "#F43F5E", border: "hover:border-rose-400", pill: "bg-rose-50 border-rose-200 text-rose-700 dark:bg-rose-900/20 dark:border-rose-800 dark:text-rose-400 hover:border-rose-400" },
              { bar: "bg-indigo-500", icon: "#6366F1", border: "hover:border-indigo-400", pill: "bg-indigo-50 border-indigo-200 text-indigo-700 dark:bg-indigo-900/20 dark:border-indigo-800 dark:text-indigo-400 hover:border-indigo-400" },
              { bar: "bg-lime-500", icon: "#84CC16", border: "hover:border-lime-400", pill: "bg-lime-50 border-lime-200 text-lime-700 dark:bg-lime-900/20 dark:border-lime-800 dark:text-lime-400 hover:border-lime-400" },
              { bar: "bg-fuchsia-500", icon: "#D946EF", border: "hover:border-fuchsia-400", pill: "bg-fuchsia-50 border-fuchsia-200 text-fuchsia-700 dark:bg-fuchsia-900/20 dark:border-fuchsia-800 dark:text-fuchsia-400 hover:border-fuchsia-400" },
            ];
            const accent = accents[i % accents.length];
            const setCard = (
              <motion.button
                key={group}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: group * 0.07 }}
                onClick={() => {
                  setSelectedGroup(group);
                  setCardIndex(0);
                  setView("study");
                }}
                className={`relative overflow-hidden text-left p-6 bg-card border border-card-border rounded-2xl shadow-sm ${accent.border} transition-all min-h-[260px]`}
              >
                <div className={`absolute top-0 left-0 right-0 h-1 ${accent.bar}`} />
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <ShurikenIcon size={18} color={accent.icon} filled={pct === 100} />
                    <span className="font-semibold text-foreground text-lg">Set {group}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{pct}%</span>
                </div>
                <div className="h-1.5 bg-muted rounded-full mb-4 overflow-hidden">
                  <div className={`h-full ${accent.bar} rounded-full`} style={{ width: `${pct}%` }} />
                </div>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {gw.map((w, wIdx) => (
                    <span
                      key={w.id}
                      role="button"
                      tabIndex={0}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedGroup(group);
                        setCardIndex(wIdx);
                        setIsShuffled(false);
                        setView("study");
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          e.stopPropagation();
                          setSelectedGroup(group);
                          setCardIndex(wIdx);
                          setIsShuffled(false);
                          setView("study");
                        }
                      }}
                      className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border cursor-pointer hover:scale-105 hover:shadow-sm transition-all ${
                        w.status === "mastered"
                          ? "bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-900/20 dark:border-emerald-800 dark:text-emerald-400 hover:border-emerald-400"
                          : accent.pill
                      }`}
                    >
                      {w.status === "mastered" && (
                        <Check size={10} strokeWidth={3} className="text-emerald-600 dark:text-emerald-400" />
                      )}
                      {w.word}
                    </span>
                  ))}
                </div>
                <div className="text-xs text-muted-foreground">{gw.length} words · {mastered} mastered</div>
              </motion.button>
            );
            if (group === 3) {
              return (
                <Fragment key={group}>
                  {setCard}
                  {missionTestCard}
                </Fragment>
              );
            }
            return setCard;
          })}

        </div>
        </div>
        <ProgressSidebar className="hidden lg:block" />
      </div>
    );
  }

  if (!currentWord) return null;

  return (
    <div
      className={`relative flex flex-col ${focusMode ? "fixed inset-0 bg-background z-50 overflow-auto" : "h-[calc(100vh-3.5rem)] lg:h-screen px-16 pt-6 pb-4 overflow-hidden"}`}
      tabIndex={0}
      onKeyDown={handleArrowKeys}
      style={{ outline: "none" }}
    >
      <div className="shrink-0 mb-4 flex items-center gap-3">
        <span className="text-xs font-semibold text-muted-foreground tabular-nums tracking-wider">
          {String(cardIndex + 1).padStart(2, "0")}
          <span className="text-muted-foreground/50"> / {String(studyWords.length).padStart(2, "0")}</span>
        </span>
        <div className="relative flex-1 h-1.5 rounded-full bg-muted/70 overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
            animate={{ width: `${((cardIndex + 1) / studyWords.length) * 100}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
        <span className="text-xs font-semibold text-emerald-600 tabular-nums w-9 text-right">
          {Math.round(((cardIndex + 1) / studyWords.length) * 100)}%
        </span>
        <div
          className="flex items-center gap-1 px-2 py-1 rounded-full bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800"
          title={`${streak.currentStreak}-day streak`}
        >
          <Flame size={12} className="text-orange-500" />
          <span className="text-xs font-semibold text-orange-600 dark:text-orange-400 tabular-nums">
            {streak.currentStreak}
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between mb-3 shrink-0">
        <button
          onClick={() => setView("group-select")}
          className="p-2 rounded-xl hover:bg-muted transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="text-center">
          <div className="text-foreground text-[25px] font-bold bg-[#fff7ed]">
            Mission {selectedDay} · {selectedGroup ? `Set ${selectedGroup}` : "All Words"}
          </div>
        </div>
      </div>
      <div className={`flex-1 min-h-0 ${focusMode ? "flex items-center justify-center px-8 py-4" : "flex"}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentWord.id}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.25 }}
            className="w-full h-full"
          >
            {getEnrichment(currentWord.word) ? (
              <RichFlashcard
                word={currentWord}
                index={cardIndex}
                total={studyWords.length}
                onRate={(quality) => {
                  markWordReviewed(currentWord.id, quality);
                  if (cardIndex < studyWords.length - 1) handleNext();
                }}
              />
            ) : (
              <Flashcard
                word={currentWord}
                onRate={(quality) => {
                  markWordReviewed(currentWord.id, quality);
                  if (cardIndex < studyWords.length - 1) handleNext();
                }}
                showTimer={settings.timerEnabled}
                timerSeconds={settings.timerSeconds}
                onTimerEnd={handleNext}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      <button
        onClick={handlePrev}
        disabled={cardIndex === 0}
        aria-label="Previous"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center rounded-full bg-card border border-card-border shadow-md opacity-60 hover:opacity-100 hover:scale-110 hover:shadow-xl transition-all duration-200 disabled:opacity-20 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-md"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={handleNext}
        disabled={cardIndex === studyWords.length - 1}
        aria-label="Next"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center rounded-full bg-card border border-card-border shadow-md opacity-60 hover:opacity-100 hover:scale-110 hover:shadow-xl transition-all duration-200 disabled:opacity-20 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-md"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}
