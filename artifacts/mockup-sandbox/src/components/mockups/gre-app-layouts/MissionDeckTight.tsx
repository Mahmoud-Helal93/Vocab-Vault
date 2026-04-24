import React from "react";
import {
  LayoutDashboard, BookOpen, Clock, Target, Trophy, Settings,
  Search, Bell, Sparkles, Check, Lock, ChevronRight, ChevronLeft,
  Moon, Sun, Flame, Zap, MoreHorizontal, CalendarDays, TrendingUp
} from "lucide-react";

const NAV = [
  { id: "home", label: "Home", icon: <LayoutDashboard size={18} />, active: true },
  { id: "learn", label: "Learn", icon: <BookOpen size={18} /> },
  { id: "review", label: "Review", icon: <Clock size={18} /> },
  { id: "test", label: "Test", icon: <Target size={18} /> },
  { id: "achievements", label: "Achievements", icon: <Trophy size={18} /> },
  { id: "settings", label: "Settings", icon: <Settings size={18} /> },
];

const SUMMARY = { masteryPct: 62, wordsLearned: 247, wordsTotal: 400, missions: 8, missionsTotal: 30, sets: 42, setsTotal: 90, xp: 1840, level: 7, levelPct: 62, streak: 12, resumeMission: 9 };

const AGENDA = [
  { time: "Now",    label: "Daily Review",    sub: "23 words due for review",          mastered: 0, total: 23, status: "in-progress" },
  { time: "10 min", label: "Quick Practice",  sub: "Multiple choice • 10 questions",   mastered: 0, total: 10, status: "not-started" },
  { time: "Today",  label: "Difficult Words", sub: "8 words need attention",           mastered: 0, total: 8,  status: "not-started" },
];

const WEEK = [
  { day: "Sun", reviewed: 18, correct: 14 }, { day: "Mon", reviewed: 22, correct: 19 },
  { day: "Tue", reviewed: 15, correct: 12 }, { day: "Wed", reviewed: 28, correct: 24 },
  { day: "Thu", reviewed: 20, correct: 17 }, { day: "Fri", reviewed: 24, correct: 21 },
  { day: "Sat", reviewed: 16, correct: 13, today: true },
];

const WEEK_DATES = [19, 20, 21, 22, 23, 24, 25];
const TODAY_DATE = 24; const MONTH = "April 2026";

const DONUT = [
  { label: "Mastered", value: 168, color: "#10B981" }, { label: "Review",   value: 53,  color: "#3B82F6" },
  { label: "Learning", value: 26,  color: "#F59E0B" }, { label: "New",      value: 153, color: "#E5E7EB" },
];

const DIFFICULT = ["abrogate","quiescent","perspicacious","obstreperous","lugubrious","mendacious","obsequious","desultory","laconic","sanguine","truculent","pellucid"];

const BELT_OF_DAY = (d: number) => d <= 7 ? 0 : d <= 14 ? 1 : d <= 21 ? 2 : d <= 28 ? 3 : 4;
const BELTS = [
  { num: 1, name: "White Belt",  subtitle: "Foundation", color: "#9CA3AF", textColor: "#6B7280" },
  { num: 2, name: "Yellow Belt", subtitle: "Expansion",  color: "#F59E0B", textColor: "#D97706" },
  { num: 3, name: "Green Belt",  subtitle: "Strength",   color: "#10B981", textColor: "#059669" },
  { num: 4, name: "Blue Belt",   subtitle: "Precision",  color: "#3B82F6", textColor: "#2563EB" },
  { num: 5, name: "Purple Belt", subtitle: "Mastery",    color: "#8B5CF6", textColor: "#7C3AED" },
  { num: 6, name: "Black Belt",  subtitle: "Expertise",  color: "#1F2937", textColor: "#111827" },
];

const DAYS = Array.from({ length: 30 }, (_, i) => {
  const d = i + 1;
  const pct = d <= 8 ? 100 : d === 9 ? 60 : d <= 12 ? Math.max(15, 80 - (d - 9) * 18) : d <= 18 ? [25,18,32,12,40,22][d-13] : 0;
  return { day: d, pct, mastered: Math.round(pct * 0.07), review: Math.round(pct * 0.02), learning: Math.round(pct * 0.01), beltIdx: BELT_OF_DAY(d) };
});

const ACHIEVEMENTS = [
  { id: "500_mastered", emoji: "📚", title: "500 Mastered",     description: "Master 500 words",       unlocked: false },
  { id: "xp_2500",      emoji: "⚡", title: "XP Champion",      description: "Earn 2,500 XP",          unlocked: false },
  { id: "streak_7",     emoji: "🔥", title: "Week Warrior",     description: "7-day streak",           unlocked: true },
  { id: "streak_14",    emoji: "💎", title: "Two-Week Wizard",  description: "14-day streak",          unlocked: false },
  { id: "first_belt",   emoji: "🥋", title: "First Belt",       description: "Complete the White Belt",unlocked: true },
  { id: "all_belts",    emoji: "👑", title: "Black Belt",       description: "Complete every belt",    unlocked: false },
];

function MasteryHero() {
  const size = 64;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (SUMMARY.masteryPct / 100) * circumference;

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke="currentColor" className="text-muted" strokeWidth={strokeWidth} />
        <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke="#10B981" strokeWidth={strokeWidth} strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-sm font-extrabold tabular-nums">
        {SUMMARY.masteryPct}%
      </div>
    </div>
  );
}

function StatusDonut() {
  const size = 140;
  const strokeWidth = 16;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const total = DONUT.reduce((sum, item) => sum + item.value, 0);

  let currentOffset = 0;

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke="currentColor" className="text-muted" strokeWidth={strokeWidth} />
        {DONUT.map((item) => {
          const strokeLength = (item.value / total) * circumference;
          const dasharray = `${strokeLength} ${circumference - strokeLength}`;
          const offset = -currentOffset;
          currentOffset += strokeLength;
          return (
            <circle key={item.label} cx={size/2} cy={size/2} r={radius} fill="none" stroke={item.color} strokeWidth={strokeWidth} strokeDasharray={dasharray} strokeDashoffset={offset} />
          );
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xl font-extrabold text-foreground tabular-nums">{SUMMARY.masteryPct}%</span>
        <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold">Mastery</span>
      </div>
    </div>
  );
}

function BarChartTight() {
  const maxTotal = Math.max(...WEEK.map(d => d.reviewed));
  
  return (
    <div className="flex flex-col gap-2">
      <div className="h-32 flex items-end gap-2 mt-2 relative border-b border-border pb-1">
        {WEEK.map((d, i) => {
          const totalHeight = (d.reviewed / maxTotal) * 100;
          const correctHeight = (d.correct / maxTotal) * 100;
          return (
            <div key={i} className="flex-1 flex flex-col items-center h-full justify-end group relative">
              <div className="text-[10px] font-bold text-muted-foreground opacity-0 group-hover:opacity-100 absolute -top-4 transition-opacity tabular-nums">
                {d.reviewed}
              </div>
              <div className="w-full flex flex-col justify-end items-center h-full relative px-1 md:px-2">
                <div className="w-full rounded-t-sm bg-blue-100 dark:bg-blue-900/40 absolute bottom-0 transition-all group-hover:opacity-80" style={{ height: `${totalHeight}%` }} />
                <div className="w-full rounded-t-sm bg-blue-500 absolute bottom-0 transition-all group-hover:opacity-90" style={{ height: `${correctHeight}%` }} />
              </div>
            </div>
          );
        })}
      </div>
      <div className="grid grid-cols-7 gap-2 text-center">
        {WEEK.map((d, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="text-[9px] font-bold text-muted-foreground uppercase">{d.day}</div>
            <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-extrabold tabular-nums mt-0.5 ${d.today ? 'bg-blue-500 text-white' : 'text-foreground'}`}>
              {WEEK_DATES[i]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function MissionDeckTight() {
  const wordsTotal = DONUT.reduce((a,b) => a + b.value, 0);

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Sidebar */}
      <aside className="w-[232px] shrink-0 border-r border-border bg-card flex flex-col sticky top-0 h-screen">
        <div className="h-16 flex items-center px-5 border-b border-border">
          <div className="font-extrabold text-lg flex items-center gap-2">
            <span className="text-xl">🥋</span> Vocab Ninja
          </div>
        </div>
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={14} />
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full bg-muted/50 border border-border rounded-xl pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50"
            />
          </div>
        </div>
        <nav className="flex-1 px-2 space-y-1">
          {NAV.map((item) => (
            <button
              key={item.id}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-colors ${
                item.active 
                  ? "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-2 p-1.5 rounded-xl border border-border bg-background">
            <button className="flex-1 flex justify-center py-1.5 rounded-lg text-muted-foreground hover:text-foreground">
              <Sun size={14} />
            </button>
            <button className="flex-1 flex justify-center py-1.5 rounded-lg bg-muted text-foreground shadow-sm">
              <Moon size={14} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 overflow-y-auto">
        <div className="max-w-[1240px] mx-auto px-6 py-8">
          
          {/* Redesigned Summary Strip */}
          <div className="flex gap-5 mb-8">
            {/* Left Half: Mastery & Stats */}
            <div className="flex-1 rounded-2xl border border-border bg-card p-5 flex items-center gap-6 shadow-sm">
              <div className="flex items-center gap-4 shrink-0">
                <MasteryHero />
                <div>
                  <div className="font-extrabold text-foreground">Global Mastery</div>
                  <div className="text-[11px] text-muted-foreground font-medium mt-0.5">Top 15% of users</div>
                </div>
              </div>
              <div className="w-px h-12 bg-border shrink-0" />
              <div className="flex gap-8">
                <div>
                  <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider mb-1">Words</div>
                  <div className="text-base font-extrabold tabular-nums leading-none">{SUMMARY.wordsLearned}<span className="text-muted-foreground font-medium text-xs">/{SUMMARY.wordsTotal}</span></div>
                </div>
                <div>
                  <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider mb-1">Missions</div>
                  <div className="text-base font-extrabold tabular-nums leading-none">{SUMMARY.missions}<span className="text-muted-foreground font-medium text-xs">/{SUMMARY.missionsTotal}</span></div>
                </div>
                <div>
                  <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider mb-1">Sets</div>
                  <div className="text-base font-extrabold tabular-nums leading-none">{SUMMARY.sets}<span className="text-muted-foreground font-medium text-xs">/{SUMMARY.setsTotal}</span></div>
                </div>
              </div>
            </div>

            {/* Right Half: XP, Streak, CTA */}
            <div className="flex-1 rounded-2xl border border-border bg-card p-5 flex items-center justify-between shadow-sm">
              <div className="flex gap-6">
                <div>
                  <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider mb-1">XP Level {SUMMARY.level}</div>
                  <div className="text-base font-extrabold tabular-nums leading-none mb-2">{SUMMARY.xp.toLocaleString()}</div>
                  <div className="w-24 h-1.5 rounded-full bg-muted overflow-hidden">
                    <div className="h-full bg-blue-500" style={{ width: `${SUMMARY.levelPct}%` }} />
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider mb-1 flex items-center gap-1"><Flame size={12} className="text-orange-500" /> {SUMMARY.streak} Day Streak</div>
                  <div className="flex gap-1 mt-1.5">
                    {[1,1,1,1,1,1,1].map((_, i) => (
                      <div key={i} className={`w-3 h-3 rounded-sm ${i === 6 ? 'bg-orange-500' : i > 1 ? 'bg-orange-200 dark:bg-orange-900/40' : 'bg-muted'}`} />
                    ))}
                  </div>
                </div>
              </div>
              <button className="shrink-0 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-colors flex items-center gap-2">
                <Sparkles size={16} /> Resume Mission {SUMMARY.resumeMission}
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            {/* Today's Agenda */}
            <section className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-border" style={{ background: `linear-gradient(90deg, #F973160A, transparent 40%)` }}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-orange-500 font-extrabold shrink-0 bg-orange-100 dark:bg-orange-900/30">
                    <Flame size={16} strokeWidth={2.5} />
                  </div>
                  <div>
                    <div className="font-extrabold text-sm text-foreground">Today's Agenda</div>
                    <div className="text-[11px] text-muted-foreground font-medium">3 tasks pending • ~25 mins total</div>
                  </div>
                </div>
                <button className="text-xs font-bold text-orange-600 hover:text-orange-700 bg-orange-50 hover:bg-orange-100 dark:bg-orange-900/20 dark:hover:bg-orange-900/40 dark:text-orange-400 px-3 py-1.5 rounded-lg transition-colors border border-orange-200 dark:border-orange-900/50">
                  Skip a day?
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5 bg-muted/10">
                {AGENDA.map((item, i) => {
                  const progressPct = item.status === 'in-progress' ? 45 : 0;
                  return (
                    <div key={i} className="group rounded-xl border border-border bg-card p-4 flex flex-col hover:border-orange-300 dark:hover:border-orange-700 hover:shadow-md transition-all cursor-pointer relative overflow-hidden">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="text-sm font-bold text-foreground leading-tight flex items-center gap-2">
                          {item.label}
                          <span className="px-1.5 py-0.5 rounded border border-orange-200 dark:border-orange-900 bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 text-[9px] font-extrabold tabular-nums leading-none">
                            {item.time}
                          </span>
                        </div>
                        <ChevronRight size={14} className="text-muted-foreground group-hover:translate-x-1 group-hover:text-foreground transition-all shrink-0" />
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground mb-4 font-medium">
                        <Clock size={12} /> {item.sub}
                      </div>
                      
                      <div className="mt-auto">
                        <div className="flex items-center justify-between text-[10px] font-bold mb-1.5">
                          <span className={item.status === 'in-progress' ? 'text-orange-500' : 'text-muted-foreground'}>
                            {item.status === 'in-progress' ? 'In progress' : 'Not started'}
                          </span>
                          <span className="tabular-nums">{item.mastered}/{item.total}</span>
                        </div>
                        <div className="h-1 rounded-full bg-muted overflow-hidden">
                          <div className="h-full bg-orange-500 transition-all" style={{ width: `${progressPct}%` }} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {/* Weekly Activity */}
              <section className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
                <div className="flex items-center justify-between px-5 py-3.5 border-b border-border" style={{ background: `linear-gradient(90deg, #3B82F60A, transparent 40%)` }}>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-blue-500 font-extrabold shrink-0 bg-blue-100 dark:bg-blue-900/30">
                      <CalendarDays size={16} strokeWidth={2.5} />
                    </div>
                    <div>
                      <div className="font-extrabold text-sm text-foreground">Weekly Activity</div>
                      <div className="text-[11px] text-muted-foreground font-medium">23 days active this month • 87% accuracy</div>
                    </div>
                  </div>
                  <button className="text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/40 dark:text-blue-400 px-3 py-1.5 rounded-lg transition-colors border border-blue-200 dark:border-blue-900/50">
                    View month →
                  </button>
                </div>
                <div className="p-5">
                  <BarChartTight />
                  <div className="mt-4 pt-3 border-t border-border text-[11px] font-medium text-center text-muted-foreground">
                    Avg 20.4 words/day • Best day: Wed (28)
                  </div>
                </div>
              </section>

              {/* Word Status */}
              <section className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
                <div className="flex items-center justify-between px-5 py-3.5 border-b border-border" style={{ background: `linear-gradient(90deg, #10B9810A, transparent 40%)` }}>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-emerald-500 font-extrabold shrink-0 bg-emerald-100 dark:bg-emerald-900/30">
                      <Target size={16} strokeWidth={2.5} />
                    </div>
                    <div>
                      <div className="font-extrabold text-sm text-foreground">Word Status</div>
                      <div className="text-[11px] text-muted-foreground font-medium">168 mastered • 232 to go</div>
                    </div>
                  </div>
                  <button className="text-xs font-bold text-emerald-600 hover:text-emerald-700 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-900/20 dark:hover:bg-emerald-900/40 dark:text-emerald-400 px-3 py-1.5 rounded-lg transition-colors border border-emerald-200 dark:border-emerald-900/50">
                    Filter →
                  </button>
                </div>
                <div className="p-5 flex flex-row items-center gap-8">
                  <StatusDonut />
                  <div className="flex-1 space-y-4">
                    {DONUT.map(item => {
                      const pct = Math.round((item.value / wordsTotal) * 100);
                      return (
                        <div key={item.label} className="group">
                          <div className="flex items-center justify-between mb-1.5">
                            <div className="flex items-center gap-2">
                              <div className="w-2.5 h-2.5 rounded-[3px]" style={{ backgroundColor: item.color }} />
                              <span className="text-xs font-bold text-foreground">{item.label}</span>
                            </div>
                            <span className="text-xs font-extrabold tabular-nums">{item.value} <span className="text-muted-foreground font-medium ml-1">({pct}%)</span></span>
                          </div>
                          <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                            <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: item.color }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>
            </div>

            {/* Progress by Day */}
            <section className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-border" style={{ background: `linear-gradient(90deg, #1F293708, transparent 40%)` }}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-foreground font-extrabold shrink-0 bg-muted">
                    <TrendingUp size={16} strokeWidth={2.5} />
                  </div>
                  <div>
                    <div className="font-extrabold text-sm text-foreground">Progress by Day</div>
                    <div className="text-[11px] text-muted-foreground font-medium">8/30 missions completed</div>
                  </div>
                </div>
                <button className="text-xs font-bold text-foreground hover:text-foreground bg-muted hover:bg-muted/80 px-3 py-1.5 rounded-lg transition-colors border border-border">
                  Belt Test →
                </button>
              </div>
              <div className="p-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4 bg-muted/5">
                {DAYS.map((d, i) => {
                  const belt = BELTS[d.beltIdx];
                  const done = d.pct === 100;
                  return (
                    <div key={i} className={`relative rounded-xl border bg-card p-3 flex flex-col min-h-[80px] cursor-pointer hover:shadow-md transition-all ${done ? 'border-emerald-200 dark:border-emerald-900/40' : 'border-border hover:border-orange-300 dark:hover:border-orange-700'} overflow-hidden`}>
                      {/* Belt stripe */}
                      <div className="absolute left-0 top-0 bottom-0 w-1" style={{ backgroundColor: done ? '#10B981' : belt.color }} />
                      
                      <div className="pl-1.5 flex flex-col h-full">
                        <div className="flex justify-between items-start mb-1">
                          <span className="text-[9px] font-bold text-muted-foreground uppercase">M{i+1}</span>
                          <span className="text-[9px] text-muted-foreground font-medium tabular-nums">D{d.day}</span>
                        </div>
                        
                        <div className="text-lg font-extrabold tabular-nums leading-none mb-2 text-foreground">
                          {d.pct}%
                        </div>
                        
                        <div className="mt-auto">
                          <div className="flex items-center gap-1.5">
                            <div className="flex-1 h-1 rounded-full bg-muted overflow-hidden">
                              <div className="h-full" style={{ width: `${d.pct}%`, backgroundColor: done ? '#10B981' : belt.color }} />
                            </div>
                            {done && <Check size={10} strokeWidth={3} className="text-emerald-500 shrink-0" />}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {/* Difficult Words */}
              <section className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm lg:col-span-2 flex flex-col">
                <div className="flex items-center justify-between px-5 py-3.5 border-b border-border" style={{ background: `linear-gradient(90deg, #8B5CF60A, transparent 40%)` }}>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-purple-500 font-extrabold shrink-0 bg-purple-100 dark:bg-purple-900/30">
                      <Zap size={16} strokeWidth={2.5} />
                    </div>
                    <div>
                      <div className="font-extrabold text-sm text-foreground">Difficult Words</div>
                      <div className="text-[11px] text-muted-foreground font-medium">12 words • Needs review</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="hidden sm:flex items-center bg-muted/50 rounded-lg p-0.5 border border-border">
                      <button className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-background shadow-sm text-foreground">All</button>
                      <button className="px-2.5 py-1 rounded-md text-[10px] font-medium text-muted-foreground hover:text-foreground">Hard</button>
                      <button className="px-2.5 py-1 rounded-md text-[10px] font-medium text-muted-foreground hover:text-foreground">Hardest</button>
                    </div>
                    <button className="text-xs font-bold text-purple-600 hover:text-purple-700 bg-purple-50 hover:bg-purple-100 dark:bg-purple-900/20 dark:hover:bg-purple-900/40 dark:text-purple-400 px-3 py-1.5 rounded-lg transition-colors border border-purple-200 dark:border-purple-900/50">
                      Practice all →
                    </button>
                  </div>
                </div>
                <div className="p-5 flex flex-wrap gap-2.5 content-start flex-1 bg-muted/5">
                  {DIFFICULT.map((word) => (
                    <span key={word} className="text-xs px-3 py-1.5 rounded-lg border border-purple-200 bg-card text-purple-700 dark:border-purple-900/50 dark:text-purple-300 font-bold shadow-sm hover:border-purple-300 dark:hover:border-purple-700 transition-colors cursor-pointer">
                      {word}
                    </span>
                  ))}
                </div>
              </section>

              {/* Achievements */}
              <section className="rounded-2xl border border-border bg-card shadow-sm lg:col-span-1 flex flex-col">
                <div className="flex items-center justify-between px-5 py-3.5 border-b border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-amber-500 font-extrabold shrink-0 bg-amber-100 dark:bg-amber-900/30">
                      <Trophy size={16} strokeWidth={2.5} />
                    </div>
                    <div>
                      <div className="font-extrabold text-sm text-foreground">Achievements</div>
                      <div className="text-[11px] text-muted-foreground font-medium">3 unlocked • 3 locked</div>
                    </div>
                  </div>
                </div>
                <div className="p-5 flex flex-col gap-4 flex-1">
                  {ACHIEVEMENTS.filter(a => a.unlocked).map((ach) => (
                    <div key={ach.id} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl shrink-0 bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-900/30">
                        {ach.emoji}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-foreground truncate">{ach.title}</div>
                        <div className="text-[10px] text-muted-foreground truncate">{ach.description}</div>
                      </div>
                      <Check size={16} className="text-emerald-500 shrink-0" strokeWidth={2.5} />
                    </div>
                  ))}
                  <button className="text-xs font-bold text-muted-foreground hover:text-foreground mt-2 text-left">
                    Show locked (3) ↓
                  </button>
                </div>
                <div className="px-5 py-4 border-t border-border bg-muted/10 rounded-b-2xl flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-rose-500 flex items-center justify-center text-lg shrink-0 shadow-sm">🥋</div>
                  <div className="text-[10px] text-muted-foreground font-medium leading-snug">
                    Consistency is your greatest weapon. <span className="font-bold text-orange-500 block mt-0.5">Keep training, Ninja! 🤙</span>
                  </div>
                </div>
              </section>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
