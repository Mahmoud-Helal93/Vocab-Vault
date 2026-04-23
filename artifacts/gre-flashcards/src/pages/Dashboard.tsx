import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { getProgress, getDueWords, getDifficultWords } from "@/lib/srs";
import { TOTAL_DAYS } from "@/data/words";
import {
  Search, Bell, Brain, Star, Target, Flame, ArrowUp, ArrowDown,
  BookOpen, Clock, ChevronRight, MoreHorizontal, CalendarDays, TrendingUp,
} from "lucide-react";

interface DashboardProps {
  onNavigate: (page: string, params?: Record<string, unknown>) => void;
}

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

export default function Dashboard({ onNavigate }: DashboardProps) {
  const { words, streak } = useApp();
  const progress = useMemo(() => getProgress(words), [words]);
  const dueWords = useMemo(() => getDueWords(words), [words]);
  const difficultWords = useMemo(() => getDifficultWords(words), [words]);
  const [search, setSearch] = useState("");

  const dayProgress = useMemo(() => {
    return Array.from({ length: TOTAL_DAYS }, (_, i) => {
      const day = i + 1;
      const dayWords = words.filter((w) => w.day === day);
      const mastered = dayWords.filter((w) => w.status === "mastered").length;
      const review = dayWords.filter((w) => w.status === "review").length;
      const learning = dayWords.filter((w) => w.status === "learning").length;
      return {
        day, total: dayWords.length, mastered, review, learning,
        pct: Math.round(((mastered + review + learning) / dayWords.length) * 100),
      };
    });
  }, [words]);

  // Filtered word search
  const searchResults = useMemo(() => {
    if (!search.trim()) return [];
    const q = search.toLowerCase();
    return words.filter((w) => w.word.toLowerCase().includes(q)).slice(0, 6);
  }, [search, words]);

  // Stat cards (SchoolHub-style colorful cards)
  const stats = [
    {
      key: "learned", label: "Words Learned", value: progress.known, total: progress.total,
      delta: "+15%", deltaUp: true, bg: "bg-violet-200/70 dark:bg-violet-500/20",
      iconBg: "bg-violet-300 dark:bg-violet-400/40", icon: <Brain size={18} />,
    },
    {
      key: "mastered", label: "Mastered", value: progress.mastered, total: progress.total,
      delta: progress.mastered > 0 ? "+3%" : "0%", deltaUp: true, bg: "bg-amber-200/70 dark:bg-amber-500/20",
      iconBg: "bg-amber-300 dark:bg-amber-400/40", icon: <Star size={18} />,
    },
    {
      key: "accuracy", label: "Accuracy", value: `${progress.accuracy}%`, total: null,
      delta: progress.accuracy >= 70 ? "+5%" : "-3%", deltaUp: progress.accuracy >= 70,
      bg: "bg-rose-200/70 dark:bg-rose-500/20",
      iconBg: "bg-rose-300 dark:bg-rose-400/40", icon: <Target size={18} />,
    },
    {
      key: "streak", label: "Day Streak", value: `${streak.currentStreak}d`, total: null,
      delta: streak.currentStreak > 0 ? "+5%" : "0%", deltaUp: streak.currentStreak > 0,
      bg: "bg-sky-200/70 dark:bg-sky-500/20",
      iconBg: "bg-sky-300 dark:bg-sky-400/40", icon: <Flame size={18} />,
    },
  ];

  // Donut data: status breakdown
  const learning = words.filter((w) => w.status === "learning").length;
  const review = words.filter((w) => w.status === "review").length;
  const mastered = words.filter((w) => w.status === "mastered").length;
  const newCount = progress.total - learning - review - mastered;
  const donutSegments = [
    { label: "Mastered", value: mastered, color: "#fbbf24" },
    { label: "Review",   value: review,   color: "#a78bfa" },
    { label: "Learning", value: learning, color: "#7dd3fc" },
    { label: "New",      value: newCount, color: "#e5e7eb" },
  ];
  const donutTotal = donutSegments.reduce((s, x) => s + x.value, 0) || 1;

  // Bar chart data: last 7 days of progress (mastered+review per day index 1..7 cycled)
  const today = new Date();
  const last7 = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - (6 - i));
    return d;
  });
  const dayLabel = (d: Date) => WEEKDAYS[d.getDay()].slice(0, 3);
  const reviewedByDay = last7.map((d) => {
    const tgt = d.toDateString();
    const total = words.filter((w) => w.lastReviewed && new Date(w.lastReviewed).toDateString() === tgt).length;
    const correct = words.filter((w) => {
      if (!w.lastReviewed) return false;
      if (new Date(w.lastReviewed).toDateString() !== tgt) return false;
      return w.status === "mastered" || w.status === "review";
    }).length;
    return { date: d, total, correct };
  });
  const barMax = Math.max(10, ...reviewedByDay.map((d) => d.total));

  // Mini calendar (current week)
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());
  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(startOfWeek);
    d.setDate(startOfWeek.getDate() + i);
    return d;
  });

  // Agenda items
  const nextDay = dayProgress.find((d) => d.pct < 100) ?? dayProgress[0];
  const agenda = [
    {
      time: "Now", color: "bg-violet-100 dark:bg-violet-500/20", accent: "text-violet-700 dark:text-violet-300",
      label: dueWords.length > 0 ? `Daily Review` : `Day ${nextDay.day} Study`,
      sub: dueWords.length > 0 ? `${dueWords.length} words due for review` : `Group ${Math.ceil(((nextDay.mastered + nextDay.review + nextDay.learning) / 10) + 1)} • new vocabulary`,
      action: () => dueWords.length > 0 ? onNavigate("review") : onNavigate("study", { day: nextDay.day }),
    },
    {
      time: "10 min", color: "bg-amber-100 dark:bg-amber-500/20", accent: "text-amber-700 dark:text-amber-300",
      label: "Quick Practice",
      sub: "Multiple choice • 10 questions",
      action: () => onNavigate("practice"),
    },
    {
      time: "Today", color: "bg-rose-100 dark:bg-rose-500/20", accent: "text-rose-700 dark:text-rose-300",
      label: difficultWords.length > 0 ? "Difficult Words" : "Confusables",
      sub: difficultWords.length > 0 ? `${difficultWords.length} words need attention` : "Easily confused word pairs",
      action: () => difficultWords.length > 0 ? onNavigate("practice", { source: "difficult" }) : onNavigate("confusables"),
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Top bar with search + profile */}
      <motion.div
        initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 mb-6"
      >
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search vocabulary…"
            className="w-full h-10 pl-9 pr-3 rounded-full bg-card border border-card-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-violet-300"
          />
          {searchResults.length > 0 && (
            <div className="absolute z-30 left-0 right-0 mt-1 bg-card border border-card-border rounded-xl shadow-lg overflow-hidden">
              {searchResults.map((w) => (
                <button
                  key={w.id}
                  onClick={() => { setSearch(""); onNavigate("study", { day: w.day }); }}
                  className="w-full flex items-center justify-between px-3 py-2 hover:bg-muted text-left"
                >
                  <span className="font-medium text-foreground text-sm">{w.word}</span>
                  <span className="text-xs text-muted-foreground">Day {w.day} • G{w.group}</span>
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="ml-auto flex items-center gap-3">
          <button className="w-10 h-10 rounded-full bg-card border border-card-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
            <Bell size={16} />
          </button>
          <div className="hidden sm:flex items-center gap-2 pl-2">
            <div className="text-right leading-tight">
              <div className="text-sm font-semibold text-foreground">Vocab Ninja</div>
              <div className="text-[10px] text-muted-foreground">Learner</div>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-400 to-rose-400 flex items-center justify-center text-white font-bold text-sm">
              VN
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((s, i) => (
          <motion.div
            key={s.key}
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`relative rounded-2xl p-4 ${s.bg} overflow-hidden`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`px-2 py-0.5 rounded-full bg-white/70 dark:bg-black/30 text-[10px] font-bold flex items-center gap-1 ${s.deltaUp ? "text-emerald-700 dark:text-emerald-300" : "text-red-600 dark:text-red-300"}`}>
                {s.deltaUp ? <ArrowUp size={10} /> : <ArrowDown size={10} />}
                {s.delta}
              </div>
              <button className="text-foreground/40 hover:text-foreground/70">
                <MoreHorizontal size={14} />
              </button>
            </div>
            <div className="flex items-end gap-2">
              <div className="text-3xl font-bold text-foreground tracking-tight">
                {typeof s.value === "number" ? s.value.toLocaleString() : s.value}
              </div>
            </div>
            <div className="text-xs text-foreground/70 mt-1">{s.label}</div>
            <div className={`absolute -bottom-3 -right-3 w-12 h-12 rounded-2xl ${s.iconBg} flex items-center justify-center text-foreground/60`}>
              {s.icon}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main grid: charts + agenda */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {/* Donut: Word status */}
        <motion.div
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-card border border-card-border rounded-2xl p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Word Status</h3>
            <button className="text-foreground/40 hover:text-foreground/70"><MoreHorizontal size={16} /></button>
          </div>
          <div className="flex flex-col items-center">
            <Donut segments={donutSegments} total={donutTotal} known={progress.known} totalWords={progress.total} />
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-4 text-xs w-full">
              {donutSegments.map((seg) => (
                <div key={seg.label} className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-sm" style={{ background: seg.color }} />
                  <span className="text-muted-foreground">{seg.label}</span>
                  <span className="ml-auto font-semibold text-foreground">{seg.value}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Bar chart: 7-day activity */}
        <motion.div
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="bg-card border border-card-border rounded-2xl p-5 lg:col-span-2"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-foreground">Weekly Activity</h3>
              <p className="text-xs text-muted-foreground">Reviews completed in the last 7 days</p>
            </div>
            <div className="hidden sm:flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <span className="w-2.5 h-2.5 rounded-sm bg-violet-400" /> Reviewed
              </span>
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <span className="w-2.5 h-2.5 rounded-sm bg-amber-300" /> Correct
              </span>
            </div>
          </div>
          <BarChart data={reviewedByDay} max={barMax} dayLabel={dayLabel} />
        </motion.div>
      </div>

      {/* Calendar + Agenda */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {/* Mini calendar */}
        <motion.div
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="bg-card border border-card-border rounded-2xl p-5"
        >
          <div className="flex items-center justify-between mb-3">
            <ChevronRight size={16} className="rotate-180 text-muted-foreground" />
            <h3 className="font-semibold text-foreground text-sm">
              {MONTHS[today.getMonth()]} {today.getFullYear()}
            </h3>
            <ChevronRight size={16} className="text-muted-foreground" />
          </div>
          <div className="grid grid-cols-7 gap-1 text-center">
            {WEEKDAYS.map((d) => (
              <div key={d} className="text-[10px] font-medium text-muted-foreground py-1">{d}</div>
            ))}
            {weekDates.map((d) => {
              const isToday = d.toDateString() === today.toDateString();
              return (
                <div key={d.toISOString()} className="py-1">
                  <div className={`mx-auto w-8 h-8 rounded-lg flex items-center justify-center text-xs font-semibold ${
                    isToday ? "bg-violet-500 text-white" : "text-foreground hover:bg-muted"
                  }`}>
                    {d.getDate()}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-3 pt-3 border-t border-card-border">
            <button
              onClick={() => onNavigate("plan")}
              className="w-full text-xs text-violet-600 dark:text-violet-400 hover:underline flex items-center justify-center gap-1"
            >
              <CalendarDays size={12} /> Open full plan
            </button>
          </div>
        </motion.div>

        {/* Agenda */}
        <motion.div
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
          className="bg-card border border-card-border rounded-2xl p-5 lg:col-span-2"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-foreground">Today's Agenda</h3>
            <button className="text-foreground/40 hover:text-foreground/70"><MoreHorizontal size={16} /></button>
          </div>
          <div className="space-y-2">
            {agenda.map((item, i) => (
              <button
                key={i}
                onClick={item.action}
                className={`w-full flex items-center gap-3 p-3 rounded-xl ${item.color} hover:brightness-105 transition text-left`}
              >
                <div className={`text-xs font-bold ${item.accent} min-w-[56px]`}>{item.time}</div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-foreground">{item.label}</div>
                  <div className="text-xs text-muted-foreground">{item.sub}</div>
                </div>
                <ChevronRight size={16} className="text-muted-foreground" />
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Difficult words */}
      {difficultWords.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          className="bg-card border border-card-border rounded-2xl p-5 mb-6"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <TrendingUp size={16} className="text-rose-500" />
              Difficult Words
            </h3>
            <button onClick={() => onNavigate("practice", { source: "difficult" })} className="text-xs text-violet-600 dark:text-violet-400 hover:underline">
              Practice these
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {difficultWords.slice(0, 12).map((w) => (
              <span key={w.id}
                className="text-xs px-3 py-1.5 bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-300 rounded-full border border-rose-200 dark:border-rose-800 font-medium">
                {w.word}
              </span>
            ))}
            {difficultWords.length > 12 && (
              <span className="text-xs px-3 py-1.5 text-muted-foreground">+{difficultWords.length - 12} more</span>
            )}
          </div>
        </motion.div>
      )}

      {/* Day progress list */}
      <motion.div
        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
        className="bg-card border border-card-border rounded-2xl p-5"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            <BookOpen size={16} className="text-violet-500" />
            Progress by Day
          </h3>
          <span className="text-xs text-muted-foreground">{TOTAL_DAYS} days • {progress.total} words</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {dayProgress.map((d) => (
            <button
              key={d.day}
              onClick={() => onNavigate("study", { day: d.day })}
              className="text-left p-3 rounded-xl border border-card-border hover:border-violet-300 dark:hover:border-violet-700 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-violet-100 dark:bg-violet-500/20 text-violet-700 dark:text-violet-300 flex items-center justify-center text-xs font-bold">
                    {d.day}
                  </div>
                  <span className="text-sm font-semibold text-foreground">Day {d.day}</span>
                </div>
                <span className="text-xs font-bold text-foreground">{d.pct}%</span>
              </div>
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-violet-400 to-amber-300"
                  initial={{ width: 0 }} animate={{ width: `${d.pct}%` }}
                  transition={{ duration: 0.6, delay: 0.4 + d.day * 0.02 }}
                />
              </div>
              <div className="flex items-center gap-3 mt-2 text-[10px] text-muted-foreground">
                <span className="text-amber-600 dark:text-amber-400">★ {d.mastered}</span>
                <span className="text-violet-600 dark:text-violet-400">↻ {d.review}</span>
                <span>◌ {d.learning}</span>
              </div>
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

/* ---------- Donut chart ---------- */
function Donut({ segments, total, known, totalWords }: {
  segments: { label: string; value: number; color: string }[];
  total: number; known: number; totalWords: number;
}) {
  const size = 180;
  const stroke = 22;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  let offset = 0;
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke="currentColor" className="text-muted" strokeWidth={stroke} />
        {segments.map((seg) => {
          const len = (seg.value / total) * c;
          const dasharray = `${len} ${c - len}`;
          const el = (
            <circle key={seg.label} cx={size / 2} cy={size / 2} r={r} fill="none"
              stroke={seg.color} strokeWidth={stroke}
              strokeDasharray={dasharray}
              strokeDashoffset={-offset} strokeLinecap="butt" />
          );
          offset += len;
          return el;
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-2xl font-bold text-foreground">
          {totalWords > 0 ? Math.round((known / totalWords) * 100) : 0}%
        </div>
        <div className="text-[10px] text-muted-foreground">Progress</div>
      </div>
    </div>
  );
}

/* ---------- Bar chart ---------- */
function BarChart({ data, max, dayLabel }: {
  data: { date: Date; total: number; correct: number }[];
  max: number; dayLabel: (d: Date) => string;
}) {
  const todayStr = new Date().toDateString();
  return (
    <div className="h-48 flex items-end gap-3">
      {data.map((d, i) => {
        const totalH = (d.total / max) * 100;
        const correctH = (d.correct / max) * 100;
        const isToday = d.date.toDateString() === todayStr;
        return (
          <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full">
            <div className="flex-1 w-full flex items-end justify-center gap-1 relative">
              {isToday && d.total > 0 && (
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full px-2 py-0.5 rounded-md bg-foreground text-background text-[10px] font-bold whitespace-nowrap">
                  {d.total}
                </div>
              )}
              <motion.div
                className="w-3 rounded-t-md bg-violet-300 dark:bg-violet-500/60"
                initial={{ height: 0 }} animate={{ height: `${totalH}%` }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
              />
              <motion.div
                className="w-3 rounded-t-md bg-amber-300 dark:bg-amber-400/70"
                initial={{ height: 0 }} animate={{ height: `${correctH}%` }}
                transition={{ duration: 0.6, delay: i * 0.05 + 0.1 }}
              />
            </div>
            <div className={`text-[10px] ${isToday ? "font-bold text-foreground" : "text-muted-foreground"}`}>
              {dayLabel(d.date)}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* keep Clock import used for tree-shaking sanity */
void Clock;
