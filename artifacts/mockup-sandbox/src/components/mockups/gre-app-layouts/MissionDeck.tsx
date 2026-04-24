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

const SUMMARY = {
  masteryPct: 62,
  wordsLearned: 247, wordsTotal: 400,
  missions: 8, missionsTotal: 30,
  sets: 42, setsTotal: 90,
  xp: 1840, level: 7, levelPct: 62,
  streak: 12,
  resumeMission: 9,
};

const AGENDA = [
  { time: "Now",    label: "Daily Review",    sub: "23 words due for review",          mastered: 0, total: 23, status: "in-progress" },
  { time: "10 min", label: "Quick Practice",  sub: "Multiple choice • 10 questions",   mastered: 0, total: 10, status: "not-started" },
  { time: "Today",  label: "Difficult Words", sub: "8 words need attention",           mastered: 0, total: 8,  status: "not-started" },
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

const WEEK_DATES = [19, 20, 21, 22, 23, 24, 25];
const TODAY_DATE = 24;
const MONTH = "April 2026";

const DONUT = [
  { label: "Mastered", value: 168, color: "#10B981" },
  { label: "Review",   value: 53,  color: "#3B82F6" },
  { label: "Learning", value: 26,  color: "#F59E0B" },
  { label: "New",      value: 153, color: "#E5E7EB" },
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

function DonutChart() {
  const size = 160;
  const strokeWidth = 20;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const total = DONUT.reduce((sum, item) => sum + item.value, 0);

  let currentOffset = 0;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke="currentColor" className="text-muted" strokeWidth={strokeWidth}
        />
        {DONUT.map((item) => {
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
        <span className="text-2xl font-extrabold text-foreground tabular-nums">{SUMMARY.masteryPct}%</span>
        <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold">Mastery</span>
      </div>
    </div>
  );
}

function BarChart() {
  const maxTotal = Math.max(...WEEK.map(d => d.reviewed));
  
  return (
    <div className="h-40 flex items-end gap-2 mt-4">
      {WEEK.map((d, i) => {
        const totalHeight = (d.reviewed / maxTotal) * 100;
        const correctHeight = (d.correct / maxTotal) * 100;
        return (
          <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
            <div className="w-full flex items-end justify-center relative flex-1">
              <div className="w-4 rounded-t-md bg-blue-100 dark:bg-blue-900/30 absolute bottom-0" style={{ height: `${totalHeight}%` }} />
              <div className="w-4 rounded-t-md bg-blue-500 absolute bottom-0" style={{ height: `${correctHeight}%` }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function MissionDeck() {
  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Sidebar */}
      <aside className="w-[232px] shrink-0 border-r border-border bg-card flex flex-col sticky top-0 h-screen">
        <div className="h-16 flex items-center px-4 border-b border-border">
          <div className="font-extrabold text-lg flex items-center gap-2">
            <span className="text-2xl">🥋</span> Vocab Ninja
          </div>
        </div>
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={14} />
            <input 
              type="text" 
              placeholder="Search words..." 
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
          <div className="flex items-center gap-2 p-2 rounded-xl border border-border bg-background">
            <button className="flex-1 flex justify-center py-1.5 rounded-lg text-muted-foreground hover:text-foreground">
              <Sun size={16} />
            </button>
            <button className="flex-1 flex justify-center py-1.5 rounded-lg bg-muted text-foreground shadow-sm">
              <Moon size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 overflow-y-auto">
        <div className="max-w-[1240px] mx-auto px-6 py-8">
          
          {/* Compact summary strip */}
          <div className="rounded-2xl border border-border bg-card px-5 py-4 flex items-center gap-6 mb-8 shadow-sm">
            <div className="flex items-center gap-3 shrink-0">
              <Target size={24} className="text-orange-500" />
              <div>
                <div className="text-2xl font-extrabold tabular-nums leading-none text-foreground">{SUMMARY.masteryPct}%</div>
                <div className="text-[11px] text-muted-foreground mt-1 uppercase font-bold tracking-wider">Mastery</div>
              </div>
            </div>
            <div className="w-px h-10 bg-border shrink-0" />
            
            <div className="flex flex-1 gap-8">
              <div>
                <div className="text-base font-extrabold tabular-nums">
                  {SUMMARY.wordsLearned}<span className="text-muted-foreground text-sm font-medium">/{SUMMARY.wordsTotal}</span>
                </div>
                <div className="text-[11px] text-muted-foreground mt-0.5">Words</div>
              </div>
              <div>
                <div className="text-base font-extrabold tabular-nums">
                  {SUMMARY.missions}<span className="text-muted-foreground text-sm font-medium">/{SUMMARY.missionsTotal}</span>
                </div>
                <div className="text-[11px] text-muted-foreground mt-0.5">Missions</div>
              </div>
              <div>
                <div className="text-base font-extrabold tabular-nums">
                  {SUMMARY.sets}<span className="text-muted-foreground text-sm font-medium">/{SUMMARY.setsTotal}</span>
                </div>
                <div className="text-[11px] text-muted-foreground mt-0.5">Sets</div>
              </div>
              <div>
                <div className="text-base font-extrabold tabular-nums">
                  {SUMMARY.xp.toLocaleString()}<span className="text-muted-foreground text-sm font-medium"> (Lv{SUMMARY.level})</span>
                </div>
                <div className="text-[11px] text-muted-foreground mt-0.5">XP Earned</div>
              </div>
              <div>
                <div className="text-base font-extrabold tabular-nums text-orange-500">
                  {SUMMARY.streak}d <Flame size={14} className="inline -mt-1" />
                </div>
                <div className="text-[11px] text-muted-foreground mt-0.5">Streak</div>
              </div>
            </div>

            <button className="shrink-0 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-sm transition-colors flex items-center gap-2">
              <Sparkles size={16} /> Resume Mission {SUMMARY.resumeMission}
            </button>
          </div>

          <div className="space-y-6">
            {/* Today's Missions */}
            <section className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
              <div className="flex items-center gap-3 px-5 py-3 border-b border-border" style={{ background: `linear-gradient(90deg, #F9731614, transparent 60%)` }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-extrabold shrink-0 shadow-sm bg-orange-500">
                  <Flame size={16} strokeWidth={3} />
                </div>
                <div>
                  <div className="font-extrabold text-base text-orange-600 dark:text-orange-400">Today's Agenda</div>
                  <div className="text-[11px] text-muted-foreground font-medium">Your priority tasks for {MONTH} {TODAY_DATE}</div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted/20">
                {AGENDA.map((item, i) => (
                  <div key={i} className="group rounded-xl border border-orange-200 dark:border-orange-900/30 bg-card p-4 flex flex-col min-h-[110px] hover:shadow-md transition-shadow cursor-pointer relative overflow-hidden">
                    <div className="flex items-center justify-between mb-2">
                      <div className="px-2 py-1 rounded border border-orange-200 dark:border-orange-900 bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 text-[10px] font-extrabold tabular-nums">
                        {item.time}
                      </div>
                      <div className="flex gap-1">
                        <div className={`w-2 h-2 rounded-full ${item.status === 'in-progress' ? 'bg-orange-400' : 'border border-border'}`} />
                        <div className="w-2 h-2 rounded-full border border-border" />
                        <div className="w-2 h-2 rounded-full border border-border" />
                      </div>
                    </div>
                    <div className="text-sm font-bold mt-1 text-foreground">{item.label}</div>
                    <div className="text-[11px] text-muted-foreground mb-3">{item.sub}</div>
                    
                    <div className="mt-auto flex items-center justify-between">
                      <div className={`text-[11px] font-bold ${item.status === 'in-progress' ? 'text-orange-500' : 'text-muted-foreground'}`}>
                        {item.status === 'in-progress' ? 'In progress' : 'Not started'}
                      </div>
                      <ChevronRight size={14} className="text-muted-foreground group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Weekly Activity */}
              <section className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
                <div className="flex items-center gap-3 px-5 py-3 border-b border-border" style={{ background: `linear-gradient(90deg, #3B82F614, transparent 60%)` }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-extrabold shrink-0 shadow-sm bg-blue-500">
                    <CalendarDays size={16} />
                  </div>
                  <div>
                    <div className="font-extrabold text-base text-blue-600 dark:text-blue-400">Weekly Activity</div>
                    <div className="text-[11px] text-muted-foreground font-medium">Your study consistency</div>
                  </div>
                </div>
                <div className="p-5">
                  <BarChart />
                  <div className="grid grid-cols-7 gap-1 mt-2 text-center border-t border-border pt-4">
                    {WEEK.map((d, i) => (
                      <div key={i} className="flex flex-col items-center gap-1">
                        <div className="text-[10px] font-bold text-muted-foreground">{d.day}</div>
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-extrabold tabular-nums ${d.today ? 'bg-blue-500 text-white' : 'text-foreground'}`}>
                          {WEEK_DATES[i]}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Word Status */}
              <section className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
                <div className="flex items-center gap-3 px-5 py-3 border-b border-border" style={{ background: `linear-gradient(90deg, #10B98114, transparent 60%)` }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-extrabold shrink-0 shadow-sm bg-emerald-500">
                    <Target size={16} />
                  </div>
                  <div>
                    <div className="font-extrabold text-base text-emerald-600 dark:text-emerald-400">Word Status</div>
                    <div className="text-[11px] text-muted-foreground font-medium">Vocabulary breakdown</div>
                  </div>
                </div>
                <div className="p-6 flex items-center gap-8 h-[252px]">
                  <DonutChart />
                  <div className="flex-1 space-y-3">
                    {DONUT.map(item => (
                      <div key={item.label} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: item.color }} />
                          <span className="text-sm font-semibold">{item.label}</span>
                        </div>
                        <span className="font-extrabold tabular-nums">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </div>

            {/* Progress by Day */}
            <section className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
              <div className="flex items-center gap-3 px-5 py-3 border-b border-border" style={{ background: `linear-gradient(90deg, #1F293714, transparent 60%)` }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-extrabold shrink-0 shadow-sm bg-gray-800">
                  <TrendingUp size={16} />
                </div>
                <div>
                  <div className="font-extrabold text-base text-gray-800 dark:text-gray-200">Progress by Day</div>
                  <div className="text-[11px] text-muted-foreground font-medium">Your 30-day mission tracker</div>
                </div>
              </div>
              <div className="p-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 bg-muted/20">
                {DAYS.map((d, i) => {
                  const belt = BELTS[d.beltIdx];
                  const done = d.pct === 100;
                  return (
                    <div key={i} className={`rounded-xl border bg-card p-3 flex flex-col gap-2 min-h-[90px] cursor-pointer hover:-translate-y-0.5 hover:shadow-sm transition-all ${done ? 'border-emerald-200 dark:border-emerald-900/40' : 'border-border'}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <div className="w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-extrabold text-white" style={{ backgroundColor: done ? '#10B981' : belt.color }}>
                            {done ? <Check size={11} strokeWidth={3} /> : i+1}
                          </div>
                          <span className="text-xs font-bold">M{i+1}</span>
                        </div>
                        <span className="text-[10px] text-muted-foreground tabular-nums">D{d.day}</span>
                      </div>
                      
                      <div className="flex items-center gap-1.5 mt-1">
                        <div className="flex-1 h-1 rounded-full bg-muted overflow-hidden">
                          <div className="h-full" style={{ width: `${d.pct}%`, backgroundColor: done ? '#10B981' : belt.color }} />
                        </div>
                        <span className="text-[10px] font-bold tabular-nums w-6 text-right">{d.pct}%</span>
                      </div>
                      
                      <div className="mt-auto text-[10px] text-muted-foreground font-medium">
                        {done ? <span className="text-emerald-600 dark:text-emerald-400">Complete</span> : d.pct > 0 ? <span className="text-orange-500">In progress</span> : 'Not started'}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Difficult Words */}
              <section className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm lg:col-span-1">
                <div className="flex items-center gap-3 px-5 py-3 border-b border-border" style={{ background: `linear-gradient(90deg, #8B5CF614, transparent 60%)` }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-extrabold shrink-0 shadow-sm bg-purple-500">
                    <Zap size={16} />
                  </div>
                  <div>
                    <div className="font-extrabold text-base text-purple-600 dark:text-purple-400">Difficult Words</div>
                    <div className="text-[11px] text-muted-foreground font-medium">Words needing attention</div>
                  </div>
                </div>
                <div className="p-5 flex flex-wrap gap-2 content-start">
                  {DIFFICULT.map((word) => (
                    <span key={word} className="text-xs px-3 py-1.5 rounded-full border border-purple-200 bg-purple-50 text-purple-700 dark:border-purple-900/50 dark:bg-purple-900/20 dark:text-purple-300 font-bold shadow-sm">
                      {word}
                    </span>
                  ))}
                </div>
              </section>

              {/* Achievements & Mascot */}
              <div className="lg:col-span-2 space-y-6">
                <section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div className="font-extrabold text-foreground text-lg">Recent Achievements</div>
                    <button className="text-xs font-bold text-orange-500 hover:text-orange-600">View All</button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {ACHIEVEMENTS.map((ach) => (
                      <div key={ach.id} className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl shrink-0" style={{ backgroundColor: ach.unlocked ? '#FEF3C7' : '#F3F4F6' }}>
                          {ach.unlocked ? ach.emoji : <Lock size={16} className="text-gray-400" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className={`text-sm font-bold truncate ${ach.unlocked ? 'text-foreground' : 'text-muted-foreground'}`}>{ach.title}</div>
                          <div className="text-[11px] text-muted-foreground truncate">{ach.description}</div>
                        </div>
                        {ach.unlocked && <Check size={18} className="text-emerald-500 shrink-0" strokeWidth={3} />}
                      </div>
                    ))}
                  </div>
                </section>

                <section className="rounded-2xl border border-border bg-card p-5 flex items-center gap-4 shadow-sm">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-400 to-rose-500 flex items-center justify-center text-2xl shrink-0 shadow-sm">
                    🥋
                  </div>
                  <div className="text-sm text-muted-foreground font-medium leading-relaxed">
                    Consistency is your greatest weapon. You're doing great!{" "}
                    <span className="font-bold text-orange-500">Keep training, Ninja! 🤙</span>
                  </div>
                </section>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
