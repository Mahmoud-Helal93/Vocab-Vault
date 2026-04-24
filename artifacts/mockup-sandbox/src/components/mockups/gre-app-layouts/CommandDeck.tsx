import React, { useState } from "react";
import {
  LayoutDashboard,
  BookOpen,
  Clock,
  Target,
  Trophy,
  Settings,
  Search,
  Brain,
  Star,
  Flame,
  ArrowUp,
  ArrowDown,
  ChevronRight,
  MoreHorizontal,
  CalendarDays,
  TrendingUp,
  Moon,
  Sun,
  Sparkles,
} from "lucide-react";

const NAV = [
  { id: "home", label: "Home", icon: LayoutDashboard, active: true },
  { id: "learn", label: "Learn", icon: BookOpen },
  { id: "review", label: "Review", icon: Clock },
  { id: "test", label: "Test", icon: Target },
  { id: "achievements", label: "Achievements", icon: Trophy },
  { id: "settings", label: "Settings", icon: Settings },
];

const GLOBAL_STATS = [
  { icon: "📗", value: "247", label: "Words Learned", color: "text-emerald-600", pct: 25 },
  { icon: "🚩", value: "8 / 30", label: "Missions Done", color: "text-orange-500", pct: 26 },
  { icon: "⭐", value: "42 / 90", label: "Sets Completed", color: "text-blue-500", pct: 46 },
  { icon: "🟣", value: "1,840", label: "XP · Lv 7 (62%)", color: "text-violet-600", pct: 62 },
  { icon: "🔥", value: "12", label: "Day Streak", color: "text-orange-500", pct: 100 },
];

const DONUT = [
  { label: "Mastered", value: 168, color: "#f97316" },
  { label: "Review", value: 53, color: "#fb923c" },
  { label: "Learning", value: 26, color: "#fbbf24" },
  { label: "New", value: 153, color: "#e5e7eb" },
];

const WEEK = [
  { day: "Sun", reviewed: 18, correct: 14 },
  { day: "Mon", reviewed: 22, correct: 19 },
  { day: "Tue", reviewed: 15, correct: 12 },
  { day: "Wed", reviewed: 28, correct: 24 },
  { day: "Thu", reviewed: 20, correct: 17 },
  { day: "Fri", reviewed: 24, correct: 21 },
  { day: "Sat", reviewed: 16, correct: 13, today: true },
];

const AGENDA = [
  { time: "Now", label: "Daily Review", sub: "23 words due for review", color: "bg-orange-100", accent: "text-orange-700" },
  { time: "10 min", label: "Quick Practice", sub: "Multiple choice • 10 questions", color: "bg-amber-100", accent: "text-amber-700" },
  { time: "Today", label: "Difficult Words", sub: "8 words need attention", color: "bg-rose-100", accent: "text-rose-700" },
];

const DIFFICULT = ["abrogate", "quiescent", "perspicacious", "obstreperous", "lugubrious", "mendacious", "obsequious", "desultory"];

// 30-day progress
const DAYS = Array.from({ length: 30 }, (_, i) => {
  const d = i + 1;
  const pct = d <= 8 ? 100 : d <= 12 ? Math.max(10, 95 - (d - 8) * 18) : d <= 18 ? Math.floor(Math.random() * 40 + 10) : 0;
  return { day: d, pct, mastered: Math.round(pct * 0.07), review: Math.round(pct * 0.02), learning: Math.round(pct * 0.01) };
});

const TODAY_DATE = 24;
const MONTH = "April 2026";
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const WEEK_DATES = [19, 20, 21, 22, 23, 24, 25];

export function CommandDeck() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const donutTotal = DONUT.reduce((acc, curr) => acc + curr.value, 0) || 1;
  const totalWords = DONUT.reduce((acc, curr) => acc + curr.value, 0);
  const known = DONUT.find((d) => d.label === "Mastered")?.value || 0;

  const barMax = Math.max(10, ...WEEK.map((d) => d.reviewed));

  return (
    <div className={`min-h-screen bg-background text-foreground flex ${theme}`}>
      {/* LEFT COMMAND PANEL */}
      <aside className="w-[320px] shrink-0 bg-card border-r border-border h-screen flex flex-col sticky top-0 overflow-y-auto overflow-x-hidden custom-scrollbar">
        <div className="p-6 pb-2">
          {/* Brand */}
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-400 to-rose-500 flex items-center justify-center text-white font-bold text-lg">
              VN
            </div>
            <span className="font-bold text-xl tracking-tight text-foreground">Vocab Ninja</span>
          </div>

          {/* Search */}
          <div className="relative mb-8">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              placeholder="Search vocabulary…"
              className="w-full h-10 pl-9 pr-3 rounded-full bg-muted/50 border border-transparent hover:border-border text-sm text-foreground focus:outline-none focus:bg-background focus:ring-2 focus:ring-orange-500/50 transition-all"
            />
          </div>

          {/* AT A GLANCE */}
          <div className="mb-8">
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-3 px-1">At a Glance</h3>
            <div className="space-y-1">
              {GLOBAL_STATS.map((stat, i) => (
                <div key={i} className="p-2 rounded-xl hover:bg-muted/50 transition-colors flex flex-col gap-1.5 cursor-default">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{stat.icon}</span>
                      <span className="text-xs font-medium text-foreground/80">{stat.label}</span>
                    </div>
                    <span className={`text-sm font-bold ${stat.color} tabular-nums`}>{stat.value}</span>
                  </div>
                  {stat.pct > 0 && (
                    <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-current opacity-50 rounded-full" style={{ width: `${stat.pct}%`, color: "inherit" }} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* NAVIGATE */}
          <div className="mb-6">
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-2 px-1">Navigate</h3>
            <nav className="space-y-0.5">
              {NAV.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      item.active
                        ? "bg-orange-50 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }`}
                  >
                    <Icon size={18} className={item.active ? "text-orange-600 dark:text-orange-400" : ""} />
                    {item.label}
                    {item.active && <div className="ml-auto w-1.5 h-4 rounded-full bg-orange-500" />}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* CTA */}
        <div className="px-6 mt-auto mb-6">
          <button className="w-full bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white rounded-2xl py-3.5 px-4 font-bold shadow-sm flex items-center justify-center gap-2 group transition-all">
            <Sparkles size={18} className="group-hover:scale-110 transition-transform" />
            <span>Daily Review</span>
            <span className="bg-white/20 px-2 py-0.5 rounded-md text-[10px] uppercase ml-1">23 Due</span>
          </button>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border">
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center gap-2">
              {theme === "light" ? <Sun size={16} /> : <Moon size={16} />}
              <span>Theme</span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider opacity-60">
              {theme === "light" ? "Light" : "Dark"}
            </span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 min-w-0 bg-[#fbfbfb] dark:bg-[#09090b]">
        <div className="max-w-[960px] mx-auto px-10 py-10">
          
          <div className="mb-10">
            <h1 className="text-2xl font-bold text-foreground mb-1">Dashboard</h1>
            <p className="text-sm text-muted-foreground">Your performance and daily tasks.</p>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white dark:bg-zinc-950 border border-border rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-foreground">Word Status</h3>
                <button className="text-muted-foreground hover:text-foreground"><MoreHorizontal size={16} /></button>
              </div>
              <div className="flex flex-col items-center">
                <Donut segments={DONUT} total={donutTotal} known={known} totalWords={totalWords} />
                <div className="grid grid-cols-2 gap-x-6 gap-y-2 mt-6 text-xs w-full px-2">
                  {DONUT.map((seg) => (
                    <div key={seg.label} className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ background: seg.color }} />
                      <span className="text-muted-foreground">{seg.label}</span>
                      <span className="ml-auto font-semibold text-foreground">{seg.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-zinc-950 border border-border rounded-2xl p-6 shadow-sm lg:col-span-2 flex flex-col">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="font-semibold text-foreground">Weekly Activity</h3>
                  <p className="text-xs text-muted-foreground mt-1">Reviews completed in the last 7 days</p>
                </div>
                <div className="flex items-center gap-4 text-xs font-medium">
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <span className="w-3 h-3 rounded-sm bg-violet-300 dark:bg-violet-500/60" /> Reviewed
                  </span>
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <span className="w-3 h-3 rounded-sm bg-amber-300 dark:bg-amber-400/70" /> Correct
                  </span>
                </div>
              </div>
              <div className="flex-1 mt-auto">
                <BarChart data={WEEK} max={barMax} />
              </div>
            </div>
          </div>

          {/* Calendar + Agenda Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white dark:bg-zinc-950 border border-border rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <ChevronRight size={16} className="rotate-180 text-muted-foreground cursor-pointer hover:text-foreground" />
                <h3 className="font-semibold text-foreground text-sm">{MONTH}</h3>
                <ChevronRight size={16} className="text-muted-foreground cursor-pointer hover:text-foreground" />
              </div>
              <div className="grid grid-cols-7 gap-1 text-center">
                {WEEKDAYS.map((d) => (
                  <div key={d} className="text-[10px] font-bold uppercase text-muted-foreground py-1 mb-1">{d.charAt(0)}</div>
                ))}
                {WEEK_DATES.map((d) => {
                  const isToday = d === TODAY_DATE;
                  return (
                    <div key={d} className="py-1">
                      <div className={`mx-auto w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold cursor-pointer transition-colors ${
                        isToday ? "bg-orange-500 text-white shadow-sm" : "text-foreground hover:bg-muted"
                      }`}>
                        {d}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-5 pt-4 border-t border-border">
                <button className="w-full text-xs font-medium text-orange-600 dark:text-orange-400 hover:text-orange-700 flex items-center justify-center gap-1.5">
                  <CalendarDays size={14} /> Open full plan
                </button>
              </div>
            </div>

            <div className="bg-white dark:bg-zinc-950 border border-border rounded-2xl p-6 shadow-sm lg:col-span-2">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-semibold text-foreground">Today's Agenda</h3>
              </div>
              <div className="space-y-3">
                {AGENDA.map((item, i) => (
                  <button
                    key={i}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl ${item.color} dark:bg-opacity-10 hover:brightness-[0.97] dark:hover:brightness-110 transition-all text-left border border-transparent dark:border-white/5`}
                  >
                    <div className={`text-xs font-black uppercase tracking-wider ${item.accent} min-w-[64px]`}>{item.time}</div>
                    <div className="flex-1">
                      <div className="text-sm font-bold text-foreground mb-0.5">{item.label}</div>
                      <div className="text-xs text-muted-foreground font-medium">{item.sub}</div>
                    </div>
                    <div className={`w-8 h-8 rounded-full bg-white dark:bg-black/20 flex items-center justify-center ${item.accent}`}>
                      <ChevronRight size={16} />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Difficult Words */}
          <div className="bg-white dark:bg-zinc-950 border border-border rounded-2xl p-6 shadow-sm mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <TrendingUp size={16} className="text-rose-500" />
                Difficult Words
              </h3>
              <button className="text-xs font-medium text-rose-600 hover:text-rose-700 flex items-center gap-1">
                Practice these <ChevronRight size={12} />
              </button>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {DIFFICULT.map((w) => (
                <span key={w} className="text-xs px-3.5 py-1.5 bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-300 rounded-lg border border-rose-100 dark:border-rose-900/50 font-semibold tracking-wide">
                  {w}
                </span>
              ))}
            </div>
          </div>

          {/* Day Progress List */}
          <div className="bg-white dark:bg-zinc-950 border border-border rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <BookOpen size={16} className="text-violet-500" />
                Progress by Day
              </h3>
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider bg-muted px-2 py-1 rounded-md">30 Days</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {DAYS.map((d) => (
                <button
                  key={d.day}
                  className="text-left p-4 rounded-xl border border-border hover:border-violet-300 dark:hover:border-violet-700 hover:shadow-sm bg-background transition-all group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400 flex items-center justify-center text-xs font-bold">
                        {d.day}
                      </div>
                      <span className="text-sm font-bold text-foreground">Day {d.day}</span>
                    </div>
                    <span className="text-xs font-black text-foreground">{d.pct}%</span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden mb-3">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-violet-400 to-amber-300 transition-all duration-1000 ease-out"
                      style={{ width: `${d.pct}%` }}
                    />
                  </div>
                  <div className="flex items-center gap-4 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                    <span className="flex items-center gap-1 text-amber-600 dark:text-amber-500"><Star size={10} className="fill-current" /> {d.mastered}</span>
                    <span className="flex items-center gap-1 text-violet-600 dark:text-violet-400"><Clock size={10} /> {d.review}</span>
                    <span className="flex items-center gap-1 opacity-60"><Brain size={10} /> {d.learning}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

        </div>
      </main>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0,0,0,0.1);
          border-radius: 10px;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.1);
        }
      `}</style>
    </div>
  );
}

/* ---------- Charts ---------- */
function Donut({ segments, total, known, totalWords }: { segments: {label: string, value: number, color: string}[], total: number, known: number, totalWords: number }) {
  const size = 160;
  const stroke = 20;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  let offset = 0;
  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="currentColor" className="text-muted" strokeWidth={stroke} />
        {segments.map((seg) => {
          const len = (seg.value / total) * c;
          const dasharray = `${len} ${c - len}`;
          const el = (
            <circle key={seg.label} cx={size / 2} cy={size / 2} r={r} fill="none" stroke={seg.color} strokeWidth={stroke} strokeDasharray={dasharray} strokeDashoffset={-offset} strokeLinecap="butt" className="transition-all duration-1000" />
          );
          offset += len;
          return el;
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-2xl font-black tracking-tight text-foreground">
          {totalWords > 0 ? Math.round((known / totalWords) * 100) : 0}%
        </div>
        <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mt-0.5">Progress</div>
      </div>
    </div>
  );
}

function BarChart({ data, max }: { data: {day: string, reviewed: number, correct: number, today?: boolean}[], max: number }) {
  return (
    <div className="h-40 flex items-end gap-2 sm:gap-4 w-full">
      {data.map((d, i: number) => {
        const totalH = (d.reviewed / max) * 100;
        const correctH = (d.correct / max) * 100;
        const isToday = d.today;
        return (
          <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full group">
            <div className="flex-1 w-full flex items-end justify-center relative">
              {isToday && d.reviewed > 0 && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 -translate-y-full px-2 py-0.5 rounded border border-border bg-card text-foreground shadow-sm text-[10px] font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                  {d.reviewed}
                </div>
              )}
              {/* background track */}
              <div className="absolute bottom-0 w-full max-w-[24px] h-full bg-muted/30 rounded-t-lg"></div>
              {/* bars */}
              <div className="w-full max-w-[24px] relative flex items-end justify-center z-10">
                <div className="absolute bottom-0 w-full bg-violet-300 dark:bg-violet-500/60 rounded-t-md transition-all duration-700" style={{ height: `${totalH}%` }} />
                <div className="absolute bottom-0 w-full bg-amber-300 dark:bg-amber-400/70 rounded-t-md transition-all duration-700 delay-100" style={{ height: `${correctH}%` }} />
              </div>
            </div>
            <div className={`text-[10px] uppercase tracking-wider ${isToday ? "font-black text-foreground" : "font-bold text-muted-foreground"}`}>
              {d.day}
            </div>
          </div>
        );
      })}
    </div>
  );
}
