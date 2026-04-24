import React, { useState } from "react";
import {
  LayoutDashboard,
  BookOpen,
  Clock,
  Target,
  Trophy,
  Settings,
  Search,
  Bell,
  Brain,
  Star,
  Flame,
  ArrowUp,
  ArrowDown,
  ChevronRight,
  ChevronLeft,
  MoreHorizontal,
  CalendarDays,
  TrendingUp,
  Moon,
  Sun,
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
  { icon: "📗", value: "247", label: "Words Learned", color: "text-emerald-600" },
  { icon: "🚩", value: "8 / 30", label: "Missions Done", color: "text-orange-500" },
  { icon: "⭐", value: "42 / 90", label: "Sets Completed", color: "text-blue-500" },
  { icon: "🟣", value: "1,840", label: "XP · Lv 7 (62%)", color: "text-violet-600" },
  { icon: "🔥", value: "12", label: "Day Streak", color: "text-orange-500" },
];

const STAT_CARDS = [
  { label: "Words Learned", value: 247, delta: "+15%", up: true, bg: "bg-orange-200/70", iconBg: "bg-orange-300", icon: Brain, color: "text-orange-700" },
  { label: "Mastered", value: 168, delta: "+3%", up: true, bg: "bg-amber-200/70", iconBg: "bg-amber-300", icon: Star, color: "text-amber-700" },
  { label: "Accuracy", value: "84%", delta: "+5%", up: true, bg: "bg-rose-200/70", iconBg: "bg-rose-300", icon: Target, color: "text-rose-700" },
  { label: "Day Streak", value: "12d", delta: "+5%", up: true, bg: "bg-sky-200/70", iconBg: "bg-sky-300", icon: Flame, color: "text-sky-700" },
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

const DIFFICULT = [
  "abrogate",
  "quiescent",
  "perspicacious",
  "obstreperous",
  "lugubrious",
  "mendacious",
  "obsequious",
  "desultory",
];

const DAYS = Array.from({ length: 30 }, (_, i) => {
  const d = i + 1;
  const pct = d <= 8 ? 100 : d <= 12 ? Math.max(10, 95 - (d - 8) * 18) : d <= 18 ? Math.floor(Math.random() * 40 + 10) : 0;
  return { day: d, pct, mastered: Math.round(pct * 0.07), review: Math.round(pct * 0.02), learning: Math.round(pct * 0.01) };
});

const TODAY_DATE = 24;
const MONTH = "April 2026";
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const WEEK_DATES = [19, 20, 21, 22, 23, 24, 25];

function DonutChart({ segments }: { segments: typeof DONUT }) {
  const size = 160;
  const strokeWidth = 24;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const total = segments.reduce((sum, seg) => sum + seg.value, 0);

  let currentOffset = 0;
  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        {segments.map((seg, i) => {
          const strokeLength = (seg.value / total) * circumference;
          const offset = currentOffset;
          currentOffset += strokeLength;
          return (
            <circle
              key={i}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={seg.color}
              strokeWidth={strokeWidth}
              strokeDasharray={`${strokeLength} ${circumference - strokeLength}`}
              strokeDashoffset={-offset}
              strokeLinecap="butt"
            />
          );
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold tracking-tighter text-foreground">{total}</span>
        <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Words</span>
      </div>
    </div>
  );
}

function BarChart({ data }: { data: typeof WEEK }) {
  const maxVal = Math.max(...data.map((d) => d.reviewed));
  return (
    <div className="h-48 flex items-end justify-between gap-2 mt-6">
      {data.map((d, i) => (
        <div key={i} className="flex flex-col items-center w-full gap-2">
          <div className="relative w-full h-full flex items-end justify-center group">
            {d.today && (
              <div className="absolute -top-8 bg-foreground text-background text-xs font-bold px-2 py-1 rounded shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                {d.reviewed}
              </div>
            )}
            <div
              className="w-full max-w-[2rem] bg-violet-200 rounded-t-md relative overflow-hidden"
              style={{ height: `${(d.reviewed / maxVal) * 100}%` }}
            >
              <div
                className="absolute bottom-0 w-full bg-violet-500"
                style={{ height: `${(d.correct / d.reviewed) * 100}%` }}
              />
            </div>
          </div>
          <span className={`text-xs ${d.today ? "font-bold text-foreground" : "text-muted-foreground"}`}>
            {d.day}
          </span>
        </div>
      ))}
    </div>
  );
}

export function FocusFlow() {
  const [activeNav, setActiveNav] = useState("home");
  const [isDark, setIsDark] = useState(false);

  return (
    <div className={`min-h-screen bg-background text-foreground flex flex-col ${isDark ? "dark" : ""}`}>
      {/* Hero Band */}
      <div className="w-full bg-gradient-to-b from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-background pt-10 pb-8 px-6 border-b border-border">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
          <div className="flex justify-between w-full mb-6 items-start">
             <div className="flex flex-col text-left">
               <span className="text-sm font-bold text-orange-600 uppercase tracking-widest mb-1">Vocab Ninja</span>
               <h1 className="text-3xl font-bold tracking-tight text-foreground">Welcome back, ready for today's missions?</h1>
             </div>
             <div className="flex gap-3">
               <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-card border border-border shadow-sm text-muted-foreground hover:text-foreground">
                 <Bell size={18} />
               </button>
               <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-400 to-rose-400 flex items-center justify-center text-white font-bold shadow-sm">
                 VN
               </div>
             </div>
          </div>

          <div className="flex justify-between items-stretch gap-4 w-full overflow-x-auto pb-4 snap-x">
            {GLOBAL_STATS.map((stat, i) => (
              <div key={i} className="flex-1 min-w-[160px] bg-white dark:bg-card border border-border rounded-2xl p-4 shadow-sm snap-start shrink-0 flex flex-col">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{stat.icon}</span>
                  <span className="text-xs font-medium text-muted-foreground line-clamp-1">{stat.label}</span>
                </div>
                <div className={`text-2xl font-bold tracking-tight ${stat.color}`}>
                  {stat.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Single Column */}
      <main className="flex-1 w-full max-w-3xl mx-auto px-6 py-8 pb-32 flex flex-col gap-8">
        
        {/* Search */}
        <div className="relative w-full">
          <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input 
            type="text"
            placeholder="Search words, lists, or roots..." 
            className="w-full h-14 pl-12 pr-4 bg-card border border-border rounded-2xl text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50"
          />
        </div>

        {/* 4 Stat Cards Grid */}
        <div className="grid grid-cols-2 gap-4">
          {STAT_CARDS.map((card, i) => {
            const Icon = card.icon;
            return (
              <div key={i} className={`p-5 rounded-2xl border border-border ${card.bg} flex flex-col relative overflow-hidden shadow-sm`}>
                <div className="flex items-start justify-between mb-4">
                  <div className={`px-2 py-1 rounded-md bg-white/60 dark:bg-black/20 text-xs font-bold flex items-center gap-1 ${card.up ? "text-emerald-700" : "text-rose-700"}`}>
                    {card.up ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
                    {card.delta}
                  </div>
                </div>
                <div className="flex-1">
                  <div className={`text-3xl font-black tracking-tighter mb-1 ${card.color}`}>{card.value}</div>
                  <div className="text-sm font-medium text-foreground/70">{card.label}</div>
                </div>
                <div className={`absolute -bottom-4 -right-4 w-20 h-20 rounded-full ${card.iconBg} opacity-50 flex items-center justify-center`}>
                  <Icon size={40} className={card.color} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Donut Chart Card */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row items-center gap-8">
          <div className="flex-1 flex flex-col items-center sm:items-start text-center sm:text-left">
            <h3 className="text-lg font-bold text-foreground mb-1">Word Status</h3>
            <p className="text-sm text-muted-foreground mb-6">Your overall vocabulary distribution.</p>
            <div className="w-full flex flex-col gap-3">
              {DONUT.map((seg, i) => (
                <div key={i} className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: seg.color }} />
                    <span className="text-sm font-medium text-foreground">{seg.label}</span>
                  </div>
                  <span className="text-sm font-bold text-muted-foreground">{seg.value}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="shrink-0">
            <DonutChart segments={DONUT} />
          </div>
        </div>

        {/* Bar Chart Card */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-2">
             <div>
               <h3 className="text-lg font-bold text-foreground">Weekly Activity</h3>
               <p className="text-sm text-muted-foreground">Reviews and correct answers over the past 7 days.</p>
             </div>
             <div className="flex items-center gap-3">
               <div className="flex items-center gap-1.5"><span className="w-3 h-3 bg-violet-200 rounded-sm"></span><span className="text-xs text-muted-foreground font-medium">Reviewed</span></div>
               <div className="flex items-center gap-1.5"><span className="w-3 h-3 bg-violet-500 rounded-sm"></span><span className="text-xs text-muted-foreground font-medium">Correct</span></div>
             </div>
          </div>
          <BarChart data={WEEK} />
        </div>

        {/* Agenda */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
           <h3 className="text-lg font-bold text-foreground mb-4">Today's Agenda</h3>
           <div className="flex flex-col gap-3">
              {AGENDA.map((item, i) => (
                <div key={i} className={`w-full flex items-center justify-between p-4 rounded-xl ${item.color} cursor-pointer hover:brightness-95 transition-all`}>
                  <div className="flex items-center gap-4">
                    <div className={`w-16 text-center text-xs font-extrabold uppercase tracking-wider ${item.accent}`}>{item.time}</div>
                    <div className="h-8 w-px bg-black/10"></div>
                    <div>
                      <div className="text-base font-bold text-foreground">{item.label}</div>
                      <div className="text-sm text-foreground/70">{item.sub}</div>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/40 flex items-center justify-center text-foreground shrink-0">
                    <ChevronRight size={18} />
                  </div>
                </div>
              ))}
           </div>
        </div>

        {/* Calendar Strip */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-foreground">{MONTH}</h3>
            <div className="flex gap-2 text-muted-foreground">
               <button className="p-1 rounded hover:bg-muted"><ChevronLeft size={20}/></button>
               <button className="p-1 rounded hover:bg-muted"><ChevronRight size={20}/></button>
            </div>
          </div>
          <div className="flex justify-between">
            {WEEK_DATES.map((date, i) => {
              const isToday = date === TODAY_DATE;
              return (
                <div key={i} className="flex flex-col items-center gap-2">
                  <span className="text-xs font-medium text-muted-foreground">{WEEKDAYS[i][0]}</span>
                  <div className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-bold ${isToday ? 'bg-orange-500 text-white shadow-md' : 'bg-muted text-foreground'}`}>
                    {date}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Difficult Words */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
           <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                <TrendingUp size={20} className="text-rose-500" />
                Difficult Words
              </h3>
              <button className="text-sm font-semibold text-rose-600 hover:underline">Practice All</button>
           </div>
           <div className="flex flex-wrap gap-2">
             {DIFFICULT.map((word, i) => (
               <div key={i} className="px-4 py-2 bg-rose-50 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900 text-rose-700 dark:text-rose-300 font-medium text-sm rounded-full cursor-pointer hover:bg-rose-100 transition-colors">
                 {word}
               </div>
             ))}
           </div>
        </div>

        {/* Progress by Day */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
           <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                <BookOpen size={20} className="text-violet-500" />
                Progress by Day
              </h3>
              <button className="text-sm text-muted-foreground hover:text-foreground"><MoreHorizontal size={20}/></button>
           </div>
           <div className="flex flex-col gap-4">
             {DAYS.map((d, i) => (
               <div key={i} className="flex flex-col gap-2 p-4 border border-border rounded-xl hover:border-violet-300 transition-colors cursor-pointer group">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-violet-100 dark:bg-violet-900/30 text-violet-600 font-bold flex items-center justify-center text-sm">
                        {d.day}
                      </div>
                      <span className="font-bold text-foreground">Day {d.day}</span>
                    </div>
                    <span className="font-bold text-foreground">{d.pct}%</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                     <div 
                       className="h-full bg-gradient-to-r from-violet-500 to-amber-400 rounded-full" 
                       style={{ width: `${d.pct}%` }} 
                     />
                  </div>
                  <div className="flex gap-4 text-xs font-medium text-muted-foreground mt-1">
                     <span className="flex items-center gap-1 text-amber-600"><Star size={12}/> {d.mastered}</span>
                     <span className="flex items-center gap-1 text-violet-600"><Clock size={12}/> {d.review}</span>
                     <span className="flex items-center gap-1"><BookOpen size={12}/> {d.learning}</span>
                  </div>
               </div>
             ))}
           </div>
        </div>
      </main>

      {/* Floating Bottom Dock */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-foreground dark:bg-zinc-900 text-background rounded-full h-16 px-3 flex items-center shadow-2xl z-50 border border-border/10 dark:border-zinc-800">
         {NAV.map((nav, i) => {
           const Icon = nav.icon;
           const isActive = activeNav === nav.id;
           return (
             <button 
               key={i}
               onClick={() => setActiveNav(nav.id)}
               className={`w-12 h-12 flex items-center justify-center rounded-full relative group transition-colors hover:bg-white/10 dark:hover:bg-white/5 ${isActive ? 'text-orange-400' : 'text-background/70 dark:text-zinc-400'}`}
             >
               <Icon size={24} />
               {isActive && (
                 <span className="absolute -bottom-1 w-1 h-1 rounded-full bg-orange-400"></span>
               )}
             </button>
           );
         })}
         <div className="w-px h-8 bg-background/20 dark:bg-zinc-700 mx-2"></div>
         <button 
           onClick={() => setIsDark(!isDark)}
           className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-white/10 dark:hover:bg-white/5 text-background/70 dark:text-zinc-400 transition-colors"
         >
           {isDark ? <Sun size={24} /> : <Moon size={24} />}
         </button>
      </div>

    </div>
  );
}
