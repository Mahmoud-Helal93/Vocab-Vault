import React from "react";
import {
  LayoutDashboard, BookOpen, Clock, Target, Trophy, Settings,
  Search, Bell, Brain, Star, Flame, ArrowUp, ArrowDown,
  MoreHorizontal, CalendarDays, TrendingUp, ChevronRight, Moon, Sun
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
  { icon: "📗",   value: "247",    label: "Words Learned",  color: "text-emerald-600" },
  { icon: "🚩",   value: "8 / 30", label: "Missions Done",  color: "text-orange-500" },
  { icon: "⭐",   value: "42 / 90",label: "Sets Completed", color: "text-blue-500" },
  { icon: "🟣",   value: "1,840",  label: "XP · Lv 7 (62%)",color: "text-violet-600" },
  { icon: "🔥",   value: "12",     label: "Day Streak",     color: "text-orange-500" },
];

const STAT_CARDS = [
  { label: "Words Learned", value: 247, delta: "+15%", up: true,  bg: "bg-orange-200/70", iconBg: "bg-orange-300", icon: Brain },
  { label: "Mastered",      value: 168, delta: "+3%",  up: true,  bg: "bg-amber-200/70",  iconBg: "bg-amber-300",  icon: Star },
  { label: "Accuracy",      value: "84%", delta: "+5%",up: true,  bg: "bg-rose-200/70",   iconBg: "bg-rose-300",   icon: Target },
  { label: "Day Streak",    value: "12d", delta: "+5%",up: true,  bg: "bg-sky-200/70",    iconBg: "bg-sky-300",    icon: Flame },
];

const DONUT = [
  { label: "Mastered", value: 168, color: "#f97316" },
  { label: "Review",   value: 53,  color: "#fb923c" },
  { label: "Learning", value: 26,  color: "#fbbf24" },
  { label: "New",      value: 153, color: "#e5e7eb" },
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
  { time: "Now",    label: "Daily Review",     sub: "23 words due for review",          color: "bg-orange-100", accent: "text-orange-700" },
  { time: "10 min", label: "Quick Practice",   sub: "Multiple choice • 10 questions",   color: "bg-amber-100",  accent: "text-amber-700" },
  { time: "Today",  label: "Difficult Words",  sub: "8 words need attention",           color: "bg-rose-100",   accent: "text-rose-700" },
];

const DIFFICULT = ["abrogate","quiescent","perspicacious","obstreperous","lugubrious","mendacious","obsequious","desultory"];

const DAYS = Array.from({ length: 30 }, (_, i) => {
  const d = i + 1;
  const pct = d <= 8 ? 100 : d <= 12 ? Math.max(10, 95 - (d - 8) * 18) : d <= 18 ? Math.floor(Math.random() * 40 + 10) : 0;
  return { day: d, pct, mastered: Math.round(pct * 0.07), review: Math.round(pct * 0.02), learning: Math.round(pct * 0.01) };
});

const MONTH = "April 2026";
const WEEKDAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const WEEK_DATES = [19, 20, 21, 22, 23, 24, 25];

export function TopRail() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      {/* Top Bar */}
      <header className="h-16 shrink-0 border-b border-border bg-card flex items-center px-4 justify-between z-10 relative">
        <div className="flex items-center gap-2 mr-8">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-orange-500 to-violet-500 flex items-center justify-center text-white font-bold">VN</div>
          <span className="font-bold text-lg tracking-tight">Vocab Ninja</span>
        </div>
        
        {/* Horizontal Nav */}
        <nav className="flex-1 flex items-center gap-1 h-full">
          {NAV.map((item) => (
            <button
              key={item.id}
              className={`h-full flex items-center gap-2 px-4 text-sm font-medium transition-colors relative ${item.active ? "text-orange-600" : "text-muted-foreground hover:text-foreground"}`}
            >
              <item.icon size={16} />
              {item.label}
              {item.active && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 rounded-t-full" />
              )}
            </button>
          ))}
        </nav>
        
        <div className="flex items-center gap-4 ml-4">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              placeholder="Search vocabulary…"
              className="w-64 h-9 pl-9 pr-3 rounded-full bg-muted border-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-shadow"
            />
          </div>
          <button className="w-9 h-9 rounded-full hover:bg-muted flex items-center justify-center text-muted-foreground transition-colors">
            <Bell size={18} />
          </button>
          <button className="w-9 h-9 rounded-full hover:bg-muted flex items-center justify-center text-muted-foreground transition-colors">
            <Moon size={18} />
          </button>
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-violet-200 to-orange-200 border-2 border-background flex items-center justify-center text-xs font-bold text-violet-800 shadow-sm">
            VN
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Stats Rail */}
        <aside className="w-[200px] shrink-0 border-r border-border bg-slate-50 dark:bg-slate-900/50 flex flex-col py-4 overflow-y-auto">
          <div className="px-4 mb-4 text-xs font-bold tracking-wider text-muted-foreground uppercase">Global Stats</div>
          <div className="flex flex-col space-y-px bg-border">
            {GLOBAL_STATS.map((stat, i) => (
              <div key={i} className="bg-slate-50 dark:bg-slate-900/50 p-4 flex flex-col items-center justify-center gap-1.5 transition-colors hover:bg-white dark:hover:bg-slate-900">
                <div className="text-2xl mb-1">{stat.icon}</div>
                <div className={`text-xl font-bold tracking-tight ${stat.color}`}>{stat.value}</div>
                <div className="text-[11px] text-muted-foreground font-medium text-center">{stat.label}</div>
              </div>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-8 bg-slate-50/50 dark:bg-background">
          <div className="max-w-6xl mx-auto space-y-8">
            
            {/* 4-Card Stat Grid */}
            <div className="grid grid-cols-4 gap-5">
              {STAT_CARDS.map((s, i) => (
                <div key={i} className={`relative rounded-2xl p-5 ${s.bg} overflow-hidden shadow-sm border border-black/5 dark:border-white/5`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className={`px-2 py-0.5 rounded-full bg-white/60 dark:bg-black/20 text-[10px] font-bold flex items-center gap-1 ${s.up ? "text-emerald-700" : "text-red-600"}`}>
                      {s.up ? <ArrowUp size={10} /> : <ArrowDown size={10} />}
                      {s.delta}
                    </div>
                    <button className="text-black/30 hover:text-black/60 dark:text-white/30 dark:hover:text-white/60">
                      <MoreHorizontal size={16} />
                    </button>
                  </div>
                  <div className="text-3xl font-bold text-foreground tracking-tight mb-1">{s.value}</div>
                  <div className="text-sm text-foreground/70 font-medium">{s.label}</div>
                  <div className={`absolute -bottom-4 -right-4 w-16 h-16 rounded-2xl ${s.iconBg} flex items-center justify-center text-foreground/50 opacity-80 rotate-12`}>
                    <s.icon size={32} />
                  </div>
                </div>
              ))}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-3 gap-5">
              {/* Donut Chart */}
              <div className="col-span-1 bg-card border border-border rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-base">Word Status</h3>
                  <button className="text-muted-foreground hover:text-foreground"><MoreHorizontal size={16} /></button>
                </div>
                <div className="flex flex-col items-center">
                  <DonutChart />
                  <div className="grid grid-cols-2 gap-x-6 gap-y-2 mt-6 text-sm w-full">
                    {DONUT.map(s => (
                      <div key={s.label} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }} />
                          <span className="text-muted-foreground text-xs">{s.label}</span>
                        </div>
                        <span className="font-semibold text-xs">{s.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bar Chart */}
              <div className="col-span-2 bg-card border border-border rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="font-bold text-base">Weekly Activity</h3>
                    <p className="text-sm text-muted-foreground mt-1">Reviews completed in the last 7 days</p>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-medium">
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                      <span className="w-3 h-3 rounded-sm bg-violet-200" /> Reviewed
                    </span>
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                      <span className="w-3 h-3 rounded-sm bg-orange-400" /> Correct
                    </span>
                  </div>
                </div>
                <BarChart />
              </div>
            </div>

            {/* Calendar + Agenda */}
            <div className="grid grid-cols-3 gap-5">
              <div className="col-span-1 bg-card border border-border rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-5">
                  <ChevronRight size={16} className="rotate-180 text-muted-foreground cursor-pointer hover:text-foreground" />
                  <h3 className="font-bold text-sm">{MONTH}</h3>
                  <ChevronRight size={16} className="text-muted-foreground cursor-pointer hover:text-foreground" />
                </div>
                <div className="grid grid-cols-7 gap-1 text-center mb-2">
                  {WEEKDAYS.map(d => (
                    <div key={d} className="text-[10px] font-bold text-muted-foreground uppercase">{d.charAt(0)}</div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1 text-center">
                  {WEEK_DATES.map((d, i) => (
                    <div key={i} className="py-1">
                      <div className={`mx-auto w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium ${d === 24 ? "bg-orange-500 text-white shadow-md shadow-orange-500/20" : "hover:bg-muted cursor-pointer"}`}>
                        {d}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-5 pt-4 border-t border-border">
                  <button className="w-full text-xs font-medium text-orange-600 hover:text-orange-700 flex items-center justify-center gap-1.5 transition-colors">
                    <CalendarDays size={14} /> Open full calendar
                  </button>
                </div>
              </div>

              <div className="col-span-2 bg-card border border-border rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-bold text-base">Today's Agenda</h3>
                  <button className="text-muted-foreground hover:text-foreground"><MoreHorizontal size={16} /></button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {AGENDA.map((item, i) => (
                    <button key={i} className={`flex flex-col items-start p-4 rounded-xl ${item.color} transition-transform hover:-translate-y-0.5 hover:shadow-sm border border-black/5`}>
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${item.accent} mb-2 bg-white/40 px-2 py-0.5 rounded-full`}>{item.time}</span>
                      <span className="font-bold text-sm text-gray-900 mb-1">{item.label}</span>
                      <span className="text-xs text-gray-700 text-left">{item.sub}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Difficult Words Pill Cloud */}
            <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-base flex items-center gap-2">
                  <TrendingUp size={18} className="text-rose-500" />
                  Difficult Words
                </h3>
                <button className="text-sm font-medium text-rose-600 hover:underline">Practice these →</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {DIFFICULT.map((w, i) => (
                  <div key={i} className="px-4 py-1.5 bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-400 rounded-full border border-rose-200 dark:border-rose-900 text-sm font-medium shadow-sm cursor-pointer hover:bg-rose-100 transition-colors">
                    {w}
                  </div>
                ))}
              </div>
            </div>

            {/* 30 Day Progress */}
            <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-base flex items-center gap-2">
                  <BookOpen size={18} className="text-blue-500" />
                  Progress by Day
                </h3>
                <span className="text-sm text-muted-foreground font-medium">30 days • 300 words</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {DAYS.map(d => (
                  <div key={d.day} className="p-3.5 rounded-xl border border-border hover:border-orange-300 transition-colors bg-card hover:shadow-sm cursor-pointer group">
                    <div className="flex items-center justify-between mb-2.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-6 h-6 rounded bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-500 group-hover:bg-orange-100 group-hover:text-orange-600 transition-colors">
                          {d.day}
                        </div>
                        <span className="text-sm font-bold">Day {d.day}</span>
                      </div>
                      <span className="text-xs font-bold text-muted-foreground">{d.pct}%</span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden mb-2.5">
                      <div 
                        className="h-full rounded-full bg-gradient-to-r from-orange-400 to-amber-300"
                        style={{ width: `${d.pct}%` }}
                      />
                    </div>
                    <div className="flex items-center gap-3 text-[10px] font-medium text-muted-foreground">
                      <span className="text-amber-600">★ {d.mastered}</span>
                      <span className="text-violet-600">↻ {d.review}</span>
                      <span>◌ {d.learning}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}

function DonutChart() {
  const size = 160;
  const stroke = 24;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const total = DONUT.reduce((sum, s) => sum + s.value, 0);
  let offset = 0;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90 drop-shadow-sm">
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="currentColor" className="text-muted opacity-30" strokeWidth={stroke} />
        {DONUT.map(seg => {
          const len = (seg.value / total) * c;
          const dasharray = `${len} ${c - len}`;
          const el = (
            <circle key={seg.label} cx={size/2} cy={size/2} r={r} fill="none"
              stroke={seg.color} strokeWidth={stroke}
              strokeDasharray={dasharray} strokeDashoffset={-offset} strokeLinecap="butt" className="transition-all duration-1000 ease-out" />
          );
          offset += len;
          return el;
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-3xl font-extrabold tracking-tight">42%</div>
        <div className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground mt-0.5">Progress</div>
      </div>
    </div>
  );
}

function BarChart() {
  const max = Math.max(...WEEK.map(d => d.reviewed));
  
  return (
    <div className="h-44 flex items-end gap-2 sm:gap-4 w-full">
      {WEEK.map((d, i) => {
        const totalH = (d.reviewed / max) * 100;
        const correctH = (d.correct / max) * 100;
        return (
          <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full group">
            <div className="flex-1 w-full flex items-end justify-center relative">
              <div 
                className="w-full max-w-[24px] bg-violet-100 dark:bg-violet-900/30 rounded-t-md relative"
                style={{ height: `${totalH}%` }}
              >
                <div 
                  className="absolute bottom-0 w-full bg-orange-400 rounded-t-md shadow-[inset_0_2px_4px_rgba(255,255,255,0.3)] transition-all duration-500 ease-out"
                  style={{ height: `${(d.correct / d.reviewed) * 100}%` }}
                />
              </div>
              {d.today && (
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-foreground text-background text-[10px] font-bold px-2 py-0.5 rounded shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  {d.reviewed}
                </div>
              )}
            </div>
            <div className={`text-xs font-medium ${d.today ? "text-orange-600 font-bold" : "text-muted-foreground"}`}>
              {d.day}
            </div>
          </div>
        );
      })}
    </div>
  );
}
