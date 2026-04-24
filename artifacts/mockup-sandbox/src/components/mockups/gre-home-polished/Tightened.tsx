import React from "react";
import {
  LayoutDashboard,
  BookOpen,
  Clock,
  Target,
  Trophy,
  Settings,
  Search,
  Moon,
  Sun,
  ChevronRight,
  Flame,
  Check,
  Lock,
  Sparkles,
  CalendarDays,
  TrendingUp,
  Zap,
} from "lucide-react";
import "./_group.css";

// --- Components ---

const Sidebar = () => (
  <div className="w-[232px] h-screen fixed left-0 top-0 border-r border-[#E8E3DA] bg-white flex flex-col shrink-0 z-50">
    <div className="h-16 px-6 flex items-center border-b border-[#E8E3DA]">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 bg-orange-500 rounded flex items-center justify-center">
          <div className="w-3 h-3 border-2 border-white rotate-45" />
        </div>
        <span className="font-extrabold text-lg tracking-tight">Vocab Ninja</span>
      </div>
    </div>
    
    <div className="px-4 py-6 flex flex-col gap-1">
      <div className="relative mb-4">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
        <input 
          type="text" 
          placeholder="Search..." 
          className="w-full h-9 pl-9 pr-3 rounded-lg border border-[#E8E3DA] bg-zinc-50 text-xs focus:outline-none"
        />
      </div>
      
      {[
        { id: 'home', label: 'Home', icon: LayoutDashboard, active: true },
        { id: 'learn', label: 'Learn', icon: BookOpen },
        { id: 'review', label: 'Review', icon: Clock },
        { id: 'test', label: 'Test', icon: Target },
        { id: 'achievements', label: 'Achievements', icon: Trophy },
        { id: 'settings', label: 'Settings', icon: Settings },
      ].map((item) => (
        <button 
          key={item.id}
          className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
            item.active 
              ? "bg-orange-50 text-orange-600" 
              : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"
          }`}
        >
          <item.icon size={18} strokeWidth={item.active ? 2.5 : 2} />
          {item.label}
        </button>
      ))}
    </div>

    <div className="mt-auto p-4 border-t border-[#E8E3DA] flex gap-2">
      <button className="flex-1 flex items-center justify-center h-9 rounded-lg border border-[#E8E3DA] bg-zinc-50 text-zinc-500">
        <Sun size={16} />
      </button>
      <button className="flex-1 flex items-center justify-center h-9 rounded-lg border border-[#E8E3DA] text-zinc-400">
        <Moon size={16} />
      </button>
    </div>
  </div>
);

const SectionHeader = ({ icon: Icon, title, sub, color, action }: any) => (
  <div className="flex items-center justify-between mb-4">
    <div className="flex items-center gap-3">
      <div 
        className="w-7 h-7 rounded flex items-center justify-center"
        style={{ backgroundColor: `${color}1F` }}
      >
        <Icon size={16} style={{ color: color }} strokeWidth={2.5} />
      </div>
      <div>
        <h2 className="text-sm font-extrabold text-zinc-900 leading-none">{title}</h2>
        {sub && <p className="text-[10px] text-zinc-400 font-medium uppercase tracking-[0.14em] mt-1">{sub}</p>}
      </div>
    </div>
    {action && action}
  </div>
);

const Card = ({ children, className = "", innerPadding = "p-4.5" }: any) => (
  <div className={`rounded-2xl border border-[#E8E3DA] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.05)] relative overflow-hidden ${className}`}>
    <div className={innerPadding}>
      {children}
    </div>
  </div>
);

const BeltJourney = () => {
  const belts = [
    { name: "White", status: "complete" },
    { name: "Yellow", status: "current" },
    { name: "Green", status: "future" },
    { name: "Blue", status: "future" },
    { name: "Purple", status: "future" },
    { name: "Black", status: "lock" },
  ];

  return (
    <Card className="mb-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
           <span className="text-sm font-extrabold">🥋 Belt Journey</span>
        </div>
        <button className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider hover:text-orange-600 transition-colors">
          Next: Green Belt
        </button>
      </div>

      <div className="relative px-8 py-4">
        {/* Rail */}
        <div className="absolute left-10 right-10 top-1/2 -translate-y-1/2 h-[1px] bg-zinc-100" />
        
        <div className="flex justify-between items-center relative z-10">
          {belts.map((belt, i) => {
            const isCurrent = belt.status === "current";
            const isComplete = belt.status === "complete";
            const isLock = belt.status === "lock";
            
            return (
              <div key={belt.name} className="flex flex-col items-center relative">
                {isCurrent && (
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-[#FEE2E2] text-orange-700 text-[10px] font-bold whitespace-nowrap">
                    You are here
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#FEE2E2] rotate-45" />
                  </div>
                )}
                
                <div 
                  className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all ${
                    isCurrent ? "scale-110 border-orange-500 bg-orange-500 text-white shadow-sm" : 
                    isComplete ? "border-emerald-500 bg-emerald-500 text-white" :
                    "border-zinc-100 bg-white text-zinc-300"
                  }`}
                >
                  {isComplete && <Check size={14} strokeWidth={3} />}
                  {isCurrent && <Flame size={14} fill="currentColor" />}
                  {isLock && <Lock size={12} />}
                  {!isComplete && !isCurrent && !isLock && <div className="w-1.5 h-1.5 rounded-full bg-zinc-200" />}
                </div>
                
                <div className="absolute top-11 text-center">
                  <span className={`text-[10px] font-bold whitespace-nowrap ${isCurrent ? "text-zinc-900" : "text-zinc-400"}`}>
                    {belt.name} Belt
                  </span>
                  {isCurrent && (
                    <div className="text-[9px] text-orange-600 font-extrabold mt-0.5 tabular-nums">
                      5/7 Missions
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
};

const AgendaCard = ({ time, label, sub, xp, difficulty, status }: any) => {
  const isInProgress = status === "in-progress";
  
  return (
    <div className={`group rounded-xl border p-4 flex flex-col min-h-[120px] transition-all relative overflow-hidden ${
      isInProgress 
        ? "border-orange-200 bg-orange-50/40 shadow-sm" 
        : "border-zinc-100 bg-white"
    }`}>
      {isInProgress && <div className="absolute left-0 top-0 bottom-0 w-1 bg-orange-500" />}
      
      <div className="flex items-start justify-between mb-3">
        <div className={`px-2 py-0.5 rounded text-[9px] font-extrabold uppercase tracking-[0.1em] ${
          isInProgress ? "bg-orange-100 text-orange-700" : "bg-zinc-50 text-zinc-400"
        }`}>
          {time}
        </div>
        <div className="flex gap-0.5">
          {[...Array(3)].map((_, i) => (
            <div 
              key={i} 
              className={`w-2.5 h-2.5 rounded-sm rotate-45 border ${
                i < difficulty 
                  ? "bg-orange-500 border-orange-500" 
                  : "bg-transparent border-zinc-200"
              }`} 
            />
          ))}
        </div>
      </div>
      
      <h4 className="text-sm font-extrabold text-zinc-900 leading-tight mb-1">{label}</h4>
      <p className="text-[11px] text-zinc-500 font-medium mb-3">{sub}</p>
      
      <div className="mt-auto flex items-center justify-between">
        <div className="flex items-center gap-1 text-[10px] font-bold text-orange-600">
          <Zap size={10} fill="currentColor" />
          +{xp} XP
        </div>
        {isInProgress && (
          <button className="h-7 px-3 rounded-lg bg-orange-500 text-white text-[10px] font-bold hover:bg-orange-600 transition-colors">
            Start
          </button>
        )}
      </div>
    </div>
  );
};

const WeeklyActivity = () => {
  const data = [18, 22, 15, 28, 20, 24, 16];
  const labels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const max = Math.max(...data);

  return (
    <Card className="flex-1">
      <SectionHeader 
        icon={CalendarDays} 
        title="Weekly Activity" 
        sub="Review consistency" 
        color="#3B82F6" 
      />
      
      <div className="h-32 flex items-end gap-2.5 mt-6 relative border-b border-zinc-50">
        {/* Baseline gridline */}
        <div className="absolute left-0 right-0 top-1/2 h-[1px] border-t border-zinc-50 border-dashed" />
        
        {data.map((val, i) => {
          const isToday = i === 6;
          const height = (val / max) * 100;
          return (
            <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end relative group">
              {isToday && (
                <div className="absolute -top-7 text-orange-500 animate-bounce">
                  <Flame size={16} fill="currentColor" />
                </div>
              )}
              <div 
                className={`w-3.5 rounded-t-sm transition-all ${isToday ? "bg-blue-500" : "bg-blue-500/90"}`}
                style={{ height: `${height}%` }}
              />
              <div className="absolute -bottom-5">
                <span className={`text-[9px] font-bold uppercase ${isToday ? "text-zinc-900" : "text-zinc-400"}`}>
                  {labels[i][0]}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

const WordStatus = () => {
  const segments = [
    { label: "Mastered", value: 168, color: "#10B981" },
    { label: "Review", value: 53, color: "#3B82F6" },
    { label: "Learning", value: 26, color: "#F59E0B" },
    { label: "New", value: 503, color: "#E5E7EB" },
  ];
  const total = segments.reduce((a, b) => a + b.value, 0);
  
  return (
    <Card className="flex-1">
      <SectionHeader 
        icon={Target} 
        title="Word Status" 
        sub="Mastery distribution" 
        color="#10B981" 
      />
      
      <div className="flex items-center gap-6 mt-4">
        <div className="relative w-28 h-28 shrink-0">
          <svg viewBox="0 0 100 100" className="-rotate-90 w-full h-full">
            {/* Simple representation for mockup */}
            <circle cx="50" cy="50" r="42" fill="none" stroke="#E5E7EB" strokeWidth="8" />
            <circle 
              cx="50" cy="50" r="42" 
              fill="none" stroke="#10B981" 
              strokeWidth="8" 
              strokeDasharray={`${(168/total)*264} 264`}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 rounded bg-[#F59E0B] flex items-center justify-center text-white text-[10px] font-extrabold shadow-sm">
              Lv 7
            </div>
          </div>
        </div>
        
        <div className="flex-1 flex flex-col gap-2">
          {segments.map((seg) => (
            <div key={seg.label} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: seg.color }} />
                <span className="text-[11px] font-bold text-zinc-500">{seg.label}</span>
              </div>
              <span className="text-[11px] font-extrabold text-zinc-900 tabular-nums">{seg.value}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

const ProgressBeltDay = ({ day, pct }: any) => {
  const isDone = pct === 100;
  const inProgress = pct > 0 && pct < 100;
  
  return (
    <div className="flex flex-col gap-1.5 min-w-0">
      <div className="flex items-center justify-between px-1">
        <span className="text-[8px] font-extrabold text-zinc-400">M{day}</span>
        <span className="text-[9px] font-extrabold text-zinc-900">{pct}%</span>
      </div>
      <div className={`h-12 rounded-lg border flex items-center justify-center relative overflow-hidden ${
        isDone ? "bg-emerald-50/50 border-emerald-100" : 
        inProgress ? "bg-orange-50/50 border-orange-100" :
        "bg-zinc-50 border-zinc-100"
      }`}>
        {isDone ? (
          <Check size={14} className="text-emerald-500" strokeWidth={3} />
        ) : (
          <span className={`text-[10px] font-extrabold ${inProgress ? "text-orange-600" : "text-zinc-300"}`}>
             Day {day}
          </span>
        )}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-zinc-100">
           <div className={`h-full ${isDone ? "bg-emerald-500" : "bg-orange-500"}`} style={{ width: `${pct}%` }} />
        </div>
      </div>
    </div>
  );
};

const NeedsFocus = () => {
  const words = ["abrogate", "quiescent", "perspicacious", "obstreperous", "lugubrious", "mendacious", "obsequious", "desultory"];
  
  return (
    <Card className="col-span-2">
      <SectionHeader 
        icon={Zap} 
        title="Needs Focus" 
        sub="Toughest candidates" 
        color="#8B5CF6" 
        action={<button className="text-[10px] font-bold text-violet-600">Practice →</button>}
      />
      
      <div className="flex flex-wrap gap-2 mt-2">
        {words.map((word) => (
          <div 
            key={word} 
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-violet-100 bg-violet-50/50 text-xs font-bold text-violet-700 hover:bg-violet-100 transition-colors cursor-pointer"
          >
            <div className="w-1.5 h-1.5 rotate-45 bg-violet-400" />
            {word}
          </div>
        ))}
      </div>
    </Card>
  );
};

const Achievements = () => {
  const list = [
    { emoji: "🏅", title: "Fifty Mastered", sub: "Master 50 words", unlocked: true },
    { emoji: "💎", title: "XP 2500", sub: "Reach 2,500 XP", unlocked: true },
    { emoji: "🔥", title: "Week Warrior", sub: "7-day streak", unlocked: true },
    { emoji: "🌟", title: "Two Weeks Strong", sub: "14-day streak", unlocked: false },
    { emoji: "🥇", title: "First Word", sub: "Master your first word", unlocked: false },
    { emoji: "🏆", title: "Ten Mastered", sub: "Master 10 words", unlocked: false },
  ];
  
  return (
    <Card className="col-span-1">
      <SectionHeader 
        icon={Trophy} 
        title="Achievements" 
        sub="Recent milestones" 
        color="#F59E0B" 
        action={<button className="text-[10px] font-bold text-orange-600">View All</button>}
      />
      
      <div className="flex flex-col gap-0.5 mt-2">
        {list.map((item, i) => (
          <div key={i} className={`flex items-center gap-3 py-2 ${i !== 0 ? "border-t border-zinc-50" : ""}`}>
            <div className="w-8 h-8 rounded-lg bg-zinc-50 flex items-center justify-center text-lg grayscale-[0.5]">
              {item.emoji}
            </div>
            <div className="flex-1">
              <div className={`text-[11px] font-extrabold ${item.unlocked ? "text-zinc-900" : "text-zinc-400"}`}>{item.title}</div>
              <div className="text-[9px] text-zinc-400 font-medium">{item.sub}</div>
            </div>
            {item.unlocked ? (
              <div className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-600 text-[9px] font-extrabold">+50 XP</div>
            ) : (
              <Lock size={12} className="text-zinc-300" />
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};

// --- Main Component ---

export default function Tightened() {
  return (
    <div className="gre-home-polished gre-home-polished--tightened flex min-h-screen">
      <Sidebar />
      
      <main className="flex-1 ml-[232px] min-w-0">
        <div className="max-w-[1240px] mx-auto px-8 py-8">
          
          {/* Summary Strip */}
          <div className="flex items-center gap-6 mb-8 px-6 py-4 rounded-2xl bg-white border border-[#E8E3DA] shadow-sm">
            {[
              { label: 'Words', value: '168', total: '750' },
              { label: 'Missions', value: '3', total: '30' },
              { label: 'Sets', value: '9', total: '90' },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <div className="text-xl font-extrabold tracking-tight tabular-nums">
                  {stat.value}
                  <span className="text-zinc-400 text-xs font-medium ml-0.5">/{stat.total}</span>
                </div>
                <div className="text-[10px] text-zinc-400 font-bold uppercase tracking-[0.14em] mt-0.5">{stat.label}</div>
              </div>
            ))}
            
            <div className="w-[1px] h-10 bg-zinc-100" />
            
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 flex items-center justify-center">
                 <svg className="absolute inset-0 -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="16" fill="none" stroke="#F4F4F5" strokeWidth="3" />
                  <circle 
                    cx="18" cy="18" r="16" 
                    fill="none" stroke="#F59E0B" 
                    strokeWidth="3" 
                    strokeDasharray="100" 
                    strokeDashoffset="38" 
                    strokeLinecap="round" 
                  />
                </svg>
                <span className="text-xs font-extrabold text-orange-600">7</span>
              </div>
              <div className="flex flex-col">
                <div className="text-sm font-extrabold tracking-tight text-zinc-900">2,340 XP</div>
                <div className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Level 7 (62%)</div>
              </div>
            </div>

            <div className="ml-auto flex items-center gap-2 bg-orange-50 px-4 py-2 rounded-xl border border-orange-100">
               <div className="flex gap-0.5">
                  {[...Array(7)].map((_, i) => (
                    <Flame key={i} size={14} className={i < 5 ? "text-orange-500 fill-orange-500" : "text-orange-200"} />
                  ))}
               </div>
               <span className="text-sm font-extrabold text-orange-700">5d Streak</span>
            </div>
          </div>

          <BeltJourney />

          <div className="space-y-6">
            {/* Today's Agenda */}
            <section>
              <div className="flex items-center justify-between mb-4">
                 <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center text-white shadow-sm">
                       <Target size={18} strokeWidth={2.5} />
                    </div>
                    <div>
                       <h2 className="text-base font-extrabold text-zinc-900 leading-none">Today's Agenda</h2>
                       <p className="text-[10px] text-zinc-400 font-medium uppercase tracking-wider mt-1.5">Your priority tasks for April 24</p>
                    </div>
                 </div>
                 <button className="flex items-center gap-2 rounded-lg bg-orange-500 text-white text-[11px] font-bold px-3 py-1.5 shadow-sm hover:bg-orange-600 transition-colors">
                    <Sparkles size={12} /> Resume Mission 6
                 </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <AgendaCard 
                  time="Now"
                  label="Daily Review"
                  sub="23 words due for review"
                  xp={45}
                  difficulty={2}
                  status="in-progress"
                />
                <AgendaCard 
                  time="10 min"
                  label="Quick Practice"
                  sub="Multiple choice • 10 questions"
                  xp={30}
                  difficulty={1}
                  status="pending"
                />
                <AgendaCard 
                  time="Today"
                  label="Difficult Words"
                  sub="8 words need attention"
                  xp={60}
                  difficulty={3}
                  status="pending"
                />
              </div>
            </section>

            {/* Middle Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
               <WeeklyActivity />
               <WordStatus />
            </div>

            {/* Progress by Belt */}
            <Card>
              <SectionHeader 
                icon={TrendingUp} 
                title="Progress by Belt" 
                sub="Mission completion" 
                color="#F97316" 
                action={<button className="text-[10px] font-bold text-orange-600">All Missions →</button>}
              />
              
              <div className="space-y-6 mt-4">
                <div className="flex gap-6">
                   <div className="w-32 shrink-0">
                      <div className="text-[11px] font-extrabold text-zinc-900">White Belt</div>
                      <div className="text-[9px] text-zinc-400 font-medium uppercase tracking-wider">Foundation</div>
                   </div>
                   <div className="flex-1 grid grid-cols-7 gap-3">
                      {[1,2,3,4,5,6,7].map(d => <ProgressBeltDay key={d} day={d} pct={100} />)}
                   </div>
                </div>
                <div className="flex gap-6">
                   <div className="w-32 shrink-0">
                      <div className="text-[11px] font-extrabold text-zinc-900">Yellow Belt</div>
                      <div className="text-[9px] text-zinc-400 font-medium uppercase tracking-wider">Expansion</div>
                   </div>
                   <div className="flex-1 grid grid-cols-7 gap-3">
                      {[8,9,10,11,12].map(d => <ProgressBeltDay key={d} day={d} pct={100} />)}
                      <ProgressBeltDay day={13} pct={60} />
                      <ProgressBeltDay day={14} pct={0} />
                   </div>
                </div>
              </div>
            </Card>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6 flex flex-col">
                <Card className="flex-1 !bg-gradient-to-br from-orange-500 to-rose-500 text-white border-0 shadow-lg p-0">
                  <div className="p-6 flex items-center gap-6 h-full">
                    <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm shrink-0">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2 L14.5 9.5 L22 12 L14.5 14.5 L12 22 L9.5 14.5 L2 12 L9.5 9.5 Z" fill="currentColor" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-[10px] font-extrabold uppercase tracking-[0.2em] opacity-80 mb-1">Daily Encouragement</div>
                      <p className="text-xl font-bold italic leading-tight">
                        "Consistency is your greatest weapon. Keep training, Ninja."
                      </p>
                    </div>
                  </div>
                </Card>
                <NeedsFocus />
              </div>
              <Achievements />
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
