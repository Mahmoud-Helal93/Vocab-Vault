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

function ShurikenIcon({ size = 14, filled = true, color = "#F97316" }: { size?: number; filled?: boolean; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 2 L14.5 9.5 L22 12 L14.5 14.5 L12 22 L9.5 14.5 L2 12 L9.5 9.5 Z"
        fill={filled ? color : "none"} stroke={color} strokeWidth={filled ? 0 : 1.5} opacity={filled ? 1 : 0.4} />
    </svg>
  );
}

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
        <div className="w-14 h-14 rounded-lg bg-[#F59E0B] border-4 border-[#D97706] flex items-center justify-center shadow-inner">
          <div className="text-center">
            <div className="text-[10px] font-bold text-[#78350f] uppercase tracking-wider leading-none mb-0.5">Lv</div>
            <div className="text-2xl font-extrabold text-[#78350f] leading-none tabular-nums">{SUMMARY.level}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BarChart() {
  const maxTotal = Math.max(...WEEK.map(d => d.reviewed));
  
  return (
    <div className="h-40 flex items-end gap-2 mt-4 relative">
      <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
        <polyline
          fill="none"
          stroke="#F97316"
          strokeWidth="2"
          strokeDasharray="4 4"
          points={WEEK.map((d, i) => {
            const h = (d.reviewed / maxTotal) * 160;
            const x = (i / (WEEK.length - 1)) * 100;
            return `${x}%,${160 - h - 10}`;
          }).join(" ")}
        />
      </svg>

      {WEEK.map((d, i) => {
        const totalHeight = (d.reviewed / maxTotal) * 100;
        const isToday = d.today;
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
                  background: `linear-gradient(180deg, #3B82F6 0%, #93C5FD 100%)` 
                }} 
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function BeltJourneyTrack() {
  const currentBeltIdx = 1;
  const currentBeltProgress = 14;
  
  return (
    <div className="rounded-2xl border border-border bg-card p-5 mb-8 shadow-sm relative overflow-hidden"
         style={{ background: 'linear-gradient(90deg, #F59E0B08, transparent 100%)' }}>
      <div className="flex items-center justify-between mb-4">
        <div className="font-extrabold text-foreground text-lg flex items-center gap-2">
          <span>🥋</span> Belt Journey
        </div>
        <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
          Next: Green Belt
        </div>
      </div>

      <div className="relative flex items-center justify-between mt-2 px-4 h-16">
        <div className="absolute left-8 right-8 h-2 bg-muted rounded-full top-1/2 -translate-y-1/2" />
        
        <div className="absolute left-8 h-2 bg-orange-500 rounded-full top-1/2 -translate-y-1/2 transition-all"
             style={{ width: `calc((100% - 4rem) * (${currentBeltIdx + currentBeltProgress/100} / 5))` }} />

        {BELTS.map((belt, idx) => {
          const isComplete = idx < currentBeltIdx;
          const isCurrent = idx === currentBeltIdx;
          const isFuture = idx > currentBeltIdx;
          const isBlack = idx === 5;

          return (
            <div key={idx} className="relative z-10 flex flex-col items-center group">
              <div 
                className={`w-10 h-10 rounded-full border-4 flex items-center justify-center transition-transform ${isCurrent ? 'scale-125 shadow-lg border-white dark:border-gray-900 ring-4 ring-orange-500/30' : 'border-background'} ${isFuture ? 'bg-muted' : ''}`}
                style={{ backgroundColor: isFuture ? undefined : belt.color }}
              >
                {isComplete && <Check size={16} className="text-white" strokeWidth={3} />}
                {isCurrent && <Flame size={16} className="text-white" fill="white" />}
                {isFuture && !isBlack && <div className="w-2.5 h-2.5 rounded-full bg-background opacity-50" />}
                {isBlack && <Lock size={14} className="text-muted-foreground" />}
              </div>
              
              <div className="absolute top-12 text-center w-24 left-1/2 -translate-x-1/2 mt-1">
                <div className={`text-xs font-bold ${isCurrent ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {belt.name}
                </div>
                {isCurrent && (
                  <div className="text-[10px] text-orange-600 font-extrabold mt-0.5 tabular-nums">
                    1/7 Missions
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

export function MissionDeckBold() {
  return (
    <div className="min-h-screen bg-background text-foreground flex">
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
              className="w-full bg-muted/50 border border-border rounded-xl pl-9 pr-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500/50"
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

      <main className="flex-1 min-w-0 overflow-y-auto">
        <div className="max-w-[1240px] mx-auto px-6 py-8">
          
          <div className="rounded-2xl border border-border bg-card px-5 py-4 flex items-center gap-6 mb-6 shadow-sm">
            <div className="flex flex-1 gap-8 items-center">
              <div>
                <div className="text-base font-extrabold tabular-nums">
                  {SUMMARY.wordsLearned}<span className="text-muted-foreground text-sm font-medium">/{SUMMARY.wordsTotal}</span>
                </div>
                <div className="text-[11px] text-muted-foreground mt-0.5 font-bold uppercase tracking-wider">Words</div>
              </div>
              <div>
                <div className="text-base font-extrabold tabular-nums">
                  {SUMMARY.missions}<span className="text-muted-foreground text-sm font-medium">/{SUMMARY.missionsTotal}</span>
                </div>
                <div className="text-[11px] text-muted-foreground mt-0.5 font-bold uppercase tracking-wider">Missions</div>
              </div>
              <div>
                <div className="text-base font-extrabold tabular-nums">
                  {SUMMARY.sets}<span className="text-muted-foreground text-sm font-medium">/{SUMMARY.setsTotal}</span>
                </div>
                <div className="text-[11px] text-muted-foreground mt-0.5 font-bold uppercase tracking-wider">Sets</div>
              </div>
              
              <div className="w-px h-10 bg-border mx-2" />
              
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 flex items-center justify-center">
                  <svg className="absolute inset-0 -rotate-90" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="16" fill="none" stroke="currentColor" className="text-muted" strokeWidth="4" />
                    <circle cx="18" cy="18" r="16" fill="none" stroke="#F59E0B" strokeWidth="4" strokeDasharray="100" strokeDashoffset={100 - SUMMARY.levelPct} strokeLinecap="round" />
                  </svg>
                  <span className="text-xs font-extrabold text-orange-600">{SUMMARY.level}</span>
                </div>
                <div>
                  <div className="text-base font-extrabold tabular-nums text-foreground">
                    {SUMMARY.xp.toLocaleString()} <span className="text-xs text-muted-foreground font-medium">XP</span>
                  </div>
                  <div className="text-[11px] text-muted-foreground mt-0.5 font-bold uppercase tracking-wider">Level {SUMMARY.level}</div>
                </div>
              </div>

              <div className="ml-auto flex items-center gap-3 bg-orange-50 dark:bg-orange-900/10 px-4 py-2 rounded-xl border border-orange-100 dark:border-orange-900/30">
                <div className="flex gap-1">
                  {[...Array(7)].map((_, i) => (
                    <Flame key={i} size={14} className={i < 4 ? "text-orange-500 fill-orange-500" : "text-orange-200 dark:text-orange-900"} />
                  ))}
                </div>
                <div className="text-sm font-extrabold tabular-nums text-orange-600 dark:text-orange-500">
                  {SUMMARY.streak}d Streak
                </div>
              </div>
            </div>
          </div>

          <BeltJourneyTrack />

          <div className="space-y-6">
            <section className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm relative">
              <div className="absolute inset-0 pointer-events-none" style={{ background: `linear-gradient(180deg, #F973160F 0px, transparent 120px)` }} />
              
              <div className="flex items-center gap-3 px-5 py-3 border-b border-border relative z-10">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-extrabold shrink-0 shadow-sm bg-orange-500">
                  <Target size={16} strokeWidth={2.5} />
                </div>
                <div>
                  <div className="font-extrabold text-base text-orange-600 dark:text-orange-400">Today's Agenda</div>
                  <div className="text-[11px] text-muted-foreground font-medium">Your priority tasks for {MONTH} {TODAY_DATE}</div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 relative z-10">
                {AGENDA.map((item, i) => {
                  const active = item.status === 'in-progress';
                  return (
                    <div key={i} className={`group rounded-xl border bg-card p-5 flex flex-col min-h-[140px] hover:shadow-md transition-all cursor-pointer relative overflow-hidden ${active ? 'border-orange-400 ring-2 ring-orange-100 dark:ring-orange-900/40 shadow-sm' : 'border-border'}`}>
                      <div className="flex items-start justify-between mb-3">
                        <div className={`px-2.5 py-1 rounded-md border text-[10px] font-extrabold tabular-nums uppercase tracking-wider ${active ? 'border-orange-200 bg-orange-50 text-orange-700' : 'border-border bg-muted/50 text-muted-foreground'}`}>
                          {item.time}
                        </div>
                        <div className="flex gap-0.5">
                          {[...Array(3)].map((_, j) => (
                            <ShurikenIcon key={j} size={14} filled={j < (active ? 2 : 1)} color={active ? '#F97316' : '#9CA3AF'} />
                          ))}
                        </div>
                      </div>
                      
                      <div className="text-base font-extrabold mt-1 text-foreground">{item.label}</div>
                      <div className="text-[12px] text-muted-foreground font-medium mt-0.5 mb-4">{item.sub}</div>
                      
                      <div className="mt-auto flex items-center justify-between">
                        <div className="bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-[10px] font-extrabold px-2 py-1 rounded-md flex items-center gap-1">
                          <Zap size={12} fill="currentColor" /> +45 XP
                        </div>
                        {active ? (
                          <button className="bg-orange-500 text-white text-[11px] font-bold px-4 py-1.5 rounded-lg shadow-sm group-hover:bg-orange-600 transition-colors">
                            Start
                          </button>
                        ) : (
                          <div className="text-[11px] font-bold text-muted-foreground group-hover:text-foreground transition-colors flex items-center gap-1">
                            Pending <ChevronRight size={12} />
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <section className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm relative">
                <div className="absolute inset-0 pointer-events-none" style={{ background: `linear-gradient(180deg, #3B82F60F 0px, transparent 120px)` }} />
                
                <div className="flex items-center gap-3 px-5 py-3 border-b border-border relative z-10">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-extrabold shrink-0 shadow-sm bg-blue-500">
                    <CalendarDays size={16} />
                  </div>
                  <div>
                    <div className="font-extrabold text-base text-blue-600 dark:text-blue-400">Weekly Activity</div>
                    <div className="text-[11px] text-muted-foreground font-medium">Your study consistency</div>
                  </div>
                </div>
                <div className="p-5 relative z-10">
                  <BarChart />
                  <div className="grid grid-cols-7 gap-1 mt-2 text-center border-t border-border pt-4">
                    {WEEK.map((d, i) => (
                      <div key={i} className="flex flex-col items-center gap-1">
                        <div className="text-[10px] font-bold text-muted-foreground">{d.day}</div>
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-extrabold tabular-nums ${d.today ? 'bg-blue-500 text-white ring-4 ring-blue-100 dark:ring-blue-900/30' : 'text-foreground'}`}>
                          {WEEK_DATES[i]}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <section className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm relative">
                <div className="absolute inset-0 pointer-events-none" style={{ background: `linear-gradient(180deg, #10B9810F 0px, transparent 120px)` }} />
                
                <div className="flex items-center gap-3 px-5 py-3 border-b border-border relative z-10">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-extrabold shrink-0 shadow-sm bg-emerald-500">
                    <Target size={16} />
                  </div>
                  <div>
                    <div className="font-extrabold text-base text-emerald-600 dark:text-emerald-400">Word Status</div>
                    <div className="text-[11px] text-muted-foreground font-medium">Vocabulary breakdown</div>
                  </div>
                </div>
                <div className="p-6 flex items-center gap-8 h-[252px] relative z-10">
                  <DonutChart />
                  <div className="flex-1 space-y-3">
                    {DONUT.map(item => (
                      <div key={item.label} className="flex items-center justify-between group cursor-default">
                        <div className="flex items-center gap-2.5">
                          <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: item.color }} />
                          <span className="text-sm font-bold text-muted-foreground group-hover:text-foreground transition-colors">{item.label}</span>
                        </div>
                        <span className="font-extrabold tabular-nums text-foreground">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </div>

            <section className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm relative">
              <div className="absolute inset-0 pointer-events-none" style={{ background: `linear-gradient(180deg, #1F29370F 0px, transparent 120px)` }} />
              
              <div className="flex items-center gap-3 px-5 py-3 border-b border-border relative z-10">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-extrabold shrink-0 shadow-sm bg-gray-800">
                  <TrendingUp size={16} />
                </div>
                <div>
                  <div className="font-extrabold text-base text-gray-800 dark:text-gray-200">Progress by Belt</div>
                  <div className="text-[11px] text-muted-foreground font-medium">Your 30-day mission tracker</div>
                </div>
              </div>
              <div className="p-5 flex flex-col gap-6 relative z-10">
                {[0,1,2,3,4].map(beltIdx => {
                  const belt = BELTS[beltIdx];
                  const beltDays = DAYS.filter(d => d.beltIdx === beltIdx);
                  if (beltDays.length === 0) return null;
                  
                  return (
                    <div key={beltIdx} className="flex flex-col md:flex-row gap-4 items-start">
                      <div className="w-[140px] shrink-0 pt-2">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: belt.color }} />
                          <div className="font-extrabold text-sm" style={{ color: belt.textColor }}>{belt.name}</div>
                        </div>
                        <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider pl-5">{belt.subtitle}</div>
                      </div>
                      
                      <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
                        {beltDays.map((d, i) => {
                          const done = d.pct === 100;
                          const inProgress = !done && d.pct > 0;
                          return (
                            <div key={i} className={`relative rounded-xl border bg-card p-3 flex flex-col gap-2 min-h-[90px] cursor-pointer hover:-translate-y-0.5 hover:shadow-md transition-all ${done ? 'border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/30 dark:bg-emerald-900/10' : inProgress ? 'border-orange-300 ring-1 ring-orange-200 dark:border-orange-700' : 'border-border'}`}>
                              <div className="absolute top-2 right-2 text-[9px] font-extrabold tabular-nums opacity-50">
                                {d.pct}%
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-md flex items-center justify-center text-xs font-extrabold text-white shadow-sm" style={{ backgroundColor: done ? '#10B981' : belt.color, opacity: d.pct === 0 ? 0.6 : 1 }}>
                                  {done ? <Check size={14} strokeWidth={3} /> : `M${d.day}`}
                                </div>
                              </div>
                              
                              <div className="mt-auto">
                                <div className="flex items-center gap-1.5 mb-1.5">
                                  <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                                    <div className="h-full rounded-full transition-all" style={{ width: `${d.pct}%`, backgroundColor: done ? '#10B981' : belt.color }} />
                                  </div>
                                </div>
                                <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                                  Day {d.day}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      <div className="text-[10px] font-extrabold text-orange-600 uppercase tracking-wider mb-1">Daily Encouragement</div>
                      <div className="text-sm text-gray-800 dark:text-gray-200 font-medium leading-relaxed italic">
                        "Consistency is your greatest weapon. You're doing great! Keep training, Ninja."
                      </div>
                    </div>
                  </section>

                  <section className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm relative">
                    <div className="absolute inset-0 pointer-events-none" style={{ background: `linear-gradient(180deg, #8B5CF60F 0px, transparent 120px)` }} />
                    <div className="flex items-center gap-3 px-5 py-3 border-b border-border relative z-10">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-extrabold shrink-0 shadow-sm bg-purple-500">
                        <Zap size={16} />
                      </div>
                      <div>
                        <div className="font-extrabold text-base text-purple-600 dark:text-purple-400">Needs Focus</div>
                        <div className="text-[11px] text-muted-foreground font-medium">Review these words</div>
                      </div>
                    </div>
                    <div className="p-4 flex flex-wrap gap-2.5 content-start relative z-10">
                      {DIFFICULT.slice(0, 8).map((word) => (
                        <div key={word} className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-md border border-purple-200 bg-purple-50 text-purple-800 dark:border-purple-900/50 dark:bg-purple-900/20 dark:text-purple-300 font-bold shadow-sm hover:shadow-md cursor-pointer transition-all">
                          <ShurikenIcon size={12} color="#8B5CF6" />
                          {word}
                        </div>
                      ))}
                      {DIFFICULT.length > 8 && (
                        <div className="text-xs px-3 py-1.5 rounded-md text-muted-foreground font-bold hover:text-foreground cursor-pointer flex items-center">
                          +{DIFFICULT.length - 8} more
                        </div>
                      )}
                    </div>
                  </section>
                </div>
              </div>

              <section className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm relative lg:col-span-1">
                <div className="absolute inset-0 pointer-events-none" style={{ background: `linear-gradient(180deg, #F59E0B0F 0px, transparent 120px)` }} />
                <div className="flex items-center justify-between px-5 py-3 border-b border-border relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-extrabold shrink-0 shadow-sm bg-amber-500">
                      <Trophy size={16} />
                    </div>
                    <div>
                      <div className="font-extrabold text-base text-amber-600 dark:text-amber-400">Achievements</div>
                    </div>
                  </div>
                  <button className="text-[11px] font-extrabold text-amber-600 hover:text-amber-700 uppercase tracking-wider">View All</button>
                </div>
                
                <div className="p-5 flex flex-col gap-4 relative z-10">
                  {ACHIEVEMENTS.map((ach) => (
                    <div key={ach.id} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 shadow-sm border" 
                           style={{ backgroundColor: ach.unlocked ? '#FEF3C7' : '#F3F4F6', borderColor: ach.unlocked ? '#FDE68A' : '#E5E7EB' }}>
                        {ach.unlocked ? ach.emoji : <Lock size={14} className="text-gray-400" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className={`text-sm font-extrabold truncate ${ach.unlocked ? 'text-foreground' : 'text-muted-foreground'}`}>{ach.title}</div>
                        <div className="text-[11px] text-muted-foreground font-medium truncate">{ach.description}</div>
                      </div>
                      {ach.unlocked && <Check size={16} className="text-emerald-500 shrink-0" strokeWidth={3} />}
                    </div>
                  ))}
                </div>
              </section>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
