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
  Flame,
  ChevronRight,
  ChevronLeft,
  CalendarDays,
  TrendingUp,
  Zap,
  Sparkles,
  Lock,
  Check,
  ArrowRight,
} from "lucide-react";
import "./_group.css";

const Sidebar = () => (
  <aside className="w-[232px] h-screen fixed top-0 left-0 flex flex-col border-r border-[#EEE6DB] bg-[#FAF6EE] shrink-0 z-40">
    <div className="h-16 flex items-center px-6 gap-2 border-b border-[#EEE6DB]">
      <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center shadow-md shadow-orange-200">
        <Sparkles size={18} className="text-white" />
      </div>
      <span className="font-extrabold text-lg tracking-tight text-zinc-900">Vocab Ninja</span>
    </div>

    <div className="px-4 py-6">
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
        <input
          type="text"
          placeholder="Quick find..."
          className="w-full bg-white border border-[#EEE6DB] rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all placeholder:text-zinc-400"
        />
      </div>

      <nav className="space-y-1.5">
        {[
          { id: "dashboard", icon: <LayoutDashboard size={18} />, label: "Home", active: true },
          { id: "study", icon: <BookOpen size={18} />, label: "Learn" },
          { id: "review", icon: <Clock size={18} />, label: "Review" },
          { id: "practice", icon: <Target size={18} />, label: "Test" },
          { id: "achievements", icon: <Trophy size={18} />, label: "Achievements" },
          { id: "settings", icon: <Settings size={18} />, label: "Settings" },
        ].map((item) => (
          <button
            key={item.id}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all relative ${
              item.active
                ? "bg-orange-50 text-orange-700 shadow-sm shadow-orange-100/50"
                : "text-zinc-500 hover:bg-white hover:text-zinc-900"
            }`}
          >
            {item.active && (
              <div className="absolute left-1 w-1 h-4 bg-orange-500 rounded-full" />
            )}
            <span className={item.active ? "text-orange-600" : ""}>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>
    </div>

    <div className="mt-auto p-4 border-t border-[#EEE6DB]">
      <div className="bg-white rounded-xl border border-[#EEE6DB] p-1 flex gap-1">
        <button className="flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold text-orange-700 bg-orange-50 rounded-lg shadow-sm">
          <Sun size={14} /> Light
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold text-zinc-500 hover:bg-zinc-50 rounded-lg">
          <Moon size={14} /> Dark
        </button>
      </div>
    </div>
  </aside>
);

const SummaryStrip = () => (
  <div className="flex items-center gap-4 mb-8 overflow-x-auto pb-2 scrollbar-hide">
    {[
      { label: "Words", value: "168", total: "750", color: "text-orange-600" },
      { label: "Missions", value: "3", total: "30", color: "text-emerald-600" },
      { label: "Sets", value: "9", total: "90", color: "text-blue-600" },
    ].map((stat, i) => (
      <div key={i} className="bg-white border-[1.5px] border-[#EEE6DB] rounded-2xl px-5 py-4 shadow-sm min-w-[140px]">
        <div className="flex items-baseline gap-1">
          <span className={`text-2xl font-extrabold tabular-nums ${stat.color}`}>{stat.value}</span>
          <span className="text-zinc-400 text-sm font-bold">/{stat.total}</span>
        </div>
        <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-0.5">{stat.label}</div>
      </div>
    ))}

    <div className="w-px h-12 bg-[#EEE6DB] mx-2 shrink-0" />

    <div className="bg-white border-[1.5px] border-[#EEE6DB] rounded-2xl px-5 py-4 shadow-sm flex items-center gap-4 min-w-[240px]">
      <div className="relative w-12 h-12 flex items-center justify-center">
        <svg className="absolute inset-0 -rotate-90" viewBox="0 0 36 36">
          <circle cx="18" cy="18" r="16" fill="none" stroke="#F1EBE3" strokeWidth="4" />
          <circle
            cx="18"
            cy="18"
            r="16"
            fill="none"
            stroke="#F59E0B"
            strokeWidth="4"
            strokeDasharray="100.5"
            strokeDashoffset="38.2"
            strokeLinecap="round"
          />
        </svg>
        <span className="text-sm font-extrabold text-orange-600">7</span>
      </div>
      <div>
        <div className="text-xl font-extrabold text-zinc-900 leading-none">
          2,340 <span className="text-xs text-zinc-400 font-bold ml-1">XP</span>
        </div>
        <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-1">
          Level 7 <span className="text-orange-500 ml-1">(62%)</span>
        </div>
      </div>
    </div>

    <div className="ml-auto bg-gradient-to-r from-orange-500 to-amber-500 border border-orange-400 rounded-2xl px-6 py-4 shadow-md shadow-orange-200 flex items-center gap-4 shrink-0">
      <div className="flex gap-1">
        {[...Array(7)].map((_, i) => (
          <Flame key={i} size={18} fill={i < 5 ? "#fff" : "transparent"} className={i < 5 ? "text-white" : "text-white/30"} />
        ))}
      </div>
      <div className="text-white">
        <div className="text-lg font-black leading-none">5d Streak</div>
        <div className="text-[10px] font-bold text-white/80 uppercase tracking-widest mt-1">Keep it lit</div>
      </div>
    </div>
  </div>
);

const BeltJourney = () => {
  const belts = [
    { name: "White", complete: true },
    { name: "Yellow", complete: false, current: true, missions: "5/7" },
    { name: "Green", complete: false, locked: false },
    { name: "Blue", complete: false, locked: false },
    { name: "Purple", complete: false, locked: false },
    { name: "Black", complete: false, locked: true },
  ];

  return (
    <div className="editorial-card p-6 mb-8 overflow-hidden relative">
      <div className="flex items-center justify-between mb-12">
        <div className="flex flex-col">
          <span className="text-[11px] font-bold text-orange-600 uppercase tracking-[0.15em] mb-1">Your Path</span>
          <h2 className="text-xl font-extrabold text-zinc-900">Belt Journey</h2>
        </div>
        <div className="flex items-center gap-6 bg-zinc-50 px-5 py-3 rounded-xl border border-zinc-100">
          <div className="text-center">
            <div className="text-sm font-bold text-zinc-900">12 Words</div>
            <div className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">To Green Belt</div>
          </div>
          <div className="w-px h-6 bg-zinc-200" />
          <button className="text-xs font-extrabold text-orange-600 hover:text-orange-700 flex items-center gap-1 uppercase tracking-wider">
            Details <ArrowRight size={14} />
          </button>
        </div>
      </div>

      <div className="relative px-12 pb-8">
        <div className="absolute left-12 right-12 h-1.5 bg-zinc-100 bottom-12 rounded-full overflow-hidden">
          <div className="absolute left-0 h-full bg-orange-500" style={{ width: "20%" }} />
        </div>

        <div className="flex justify-between items-end relative">
          {belts.map((belt, i) => (
            <div key={belt.name} className="flex flex-col items-center group relative">
              {belt.current && (
                <div className="absolute -top-14 bg-white border border-[#EEE6DB] px-3 py-1.5 rounded-lg shadow-lg shadow-orange-100 z-10 whitespace-nowrap animate-bounce">
                  <div className="text-[10px] font-bold text-orange-600 uppercase tracking-wider leading-none">Current</div>
                  <div className="text-xs font-extrabold text-zinc-900 mt-0.5">{belt.missions} Missions</div>
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white border-b border-r border-[#EEE6DB] rotate-45" />
                </div>
              )}

              <div
                className={`relative z-10 w-10 h-10 rounded-full border-4 flex items-center justify-center transition-all ${
                  belt.complete
                    ? "bg-emerald-500 border-emerald-100"
                    : belt.current
                    ? "bg-orange-500 border-white scale-125 shadow-xl shadow-orange-200 ring-4 ring-orange-50"
                    : belt.locked
                    ? "bg-zinc-100 border-zinc-50 text-zinc-300"
                    : "bg-zinc-200 border-white"
                }`}
              >
                {belt.complete ? (
                  <Check size={18} className="text-white" strokeWidth={3} />
                ) : belt.locked ? (
                  <Lock size={14} />
                ) : (
                  <div className={`w-2.5 h-2.5 rounded-full ${belt.current ? "bg-white" : "bg-white/50"}`} />
                )}
              </div>

              <div className="mt-6 flex flex-col items-center">
                <span className={`text-[11px] font-extrabold uppercase tracking-widest ${belt.current ? "text-orange-600" : "text-zinc-400"}`}>
                  {belt.name}
                </span>
              </div>
              
              {i < belts.length - 1 && (
                <ChevronRight size={14} className="absolute left-[calc(100%+8px)] bottom-3 text-zinc-200" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Agenda = () => (
  <section className="mb-8">
    <div className="flex items-center justify-between mb-5">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600 border border-orange-200/50 shadow-sm">
          <Target size={24} strokeWidth={2.5} />
        </div>
        <div>
          <span className="text-[11px] font-bold text-orange-600 uppercase tracking-[0.15em]">Priority</span>
          <h2 className="text-2xl font-extrabold text-zinc-900 tracking-tight">Today's Agenda</h2>
        </div>
      </div>
      <button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-5 py-2.5 rounded-xl shadow-md shadow-orange-100 transition-all text-sm">
        <Sparkles size={16} /> Resume Mission 4
      </button>
    </div>

    <div className="grid lg:grid-cols-[2fr_1fr_1fr] gap-6">
      <div className="editorial-card border-orange-200/50 bg-white p-7 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-bl-full -mr-10 -mt-10 opacity-50 group-hover:scale-110 transition-transform duration-500" />
        
        <div className="relative z-10 h-full flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1 bg-orange-100 text-orange-700 text-[10px] font-black uppercase tracking-[0.2em] rounded-full border border-orange-200">
              Now
            </span>
            <div className="flex gap-0.5">
              {[...Array(3)].map((_, i) => (
                <div key={i} className={`w-3 h-3 rounded-full ${i < 2 ? "bg-orange-400" : "bg-orange-100"}`} />
              ))}
            </div>
          </div>

          <span className="font-serif italic text-lg text-orange-600 mb-1">Active Review</span>
          <h3 className="text-3xl font-extrabold text-zinc-900 mb-2">Daily Vocabulary Refresh</h3>
          <p className="text-zinc-500 font-medium mb-8 max-w-sm">
            Keep your knowledge fresh. You have 23 words scheduled for review today.
          </p>

          <div className="mt-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-emerald-600">+45 XP</span>
              <div className="w-1 h-1 rounded-full bg-zinc-300" />
              <span className="text-sm font-medium text-zinc-400">12 min approx.</span>
            </div>
            <button className="flex items-center gap-2 px-8 py-3 bg-gradient-to-br from-orange-400 to-orange-600 text-white font-black rounded-2xl shadow-lg shadow-orange-100 hover:shadow-xl transition-all active:scale-95 group">
              Start Session <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      <div className="editorial-card p-6 flex flex-col bg-zinc-50/50 border-[#EEE6DB]">
        <span className="px-2.5 py-1 bg-zinc-100 text-zinc-500 text-[9px] font-black uppercase tracking-[0.2em] rounded-full border border-zinc-200 self-start mb-6">
          10 min
        </span>
        <h4 className="text-lg font-extrabold text-zinc-900 mb-1 leading-tight">Quick Practice</h4>
        <p className="text-sm text-zinc-400 font-medium mb-auto">Multiple choice quiz on recently learned words.</p>
        
        <div className="mt-8 flex flex-col gap-3">
          <div className="flex items-center justify-between text-[11px] font-bold text-zinc-400 uppercase tracking-widest">
            <span>+30 XP</span>
            <span>Pending</span>
          </div>
          <button className="w-full py-2.5 border border-[#EEE6DB] bg-white rounded-xl text-xs font-extrabold text-zinc-900 hover:bg-zinc-50 transition-colors">
            Start Practice
          </button>
        </div>
      </div>

      <div className="editorial-card p-6 flex flex-col bg-zinc-50/50 border-[#EEE6DB]">
        <span className="px-2.5 py-1 bg-zinc-100 text-zinc-500 text-[9px] font-black uppercase tracking-[0.2em] rounded-full border border-zinc-200 self-start mb-6">
          Today
        </span>
        <h4 className="text-lg font-extrabold text-zinc-900 mb-1 leading-tight">Difficult Words</h4>
        <p className="text-sm text-zinc-400 font-medium mb-auto">Targeted session for 8 words you often miss.</p>
        
        <div className="mt-8 flex flex-col gap-3">
          <div className="flex items-center justify-between text-[11px] font-bold text-zinc-400 uppercase tracking-widest">
            <span>+60 XP</span>
            <span>Pending</span>
          </div>
          <button className="w-full py-2.5 border border-[#EEE6DB] bg-white rounded-xl text-xs font-extrabold text-zinc-900 hover:bg-zinc-50 transition-colors">
            Start Session
          </button>
        </div>
      </div>
    </div>
  </section>
);

const ActivityRow = () => (
  <div className="grid lg:grid-cols-5 gap-8 mb-8">
    <div className="lg:col-span-3 editorial-card p-7">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100">
            <CalendarDays size={20} />
          </div>
          <div>
            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Performance</span>
            <h3 className="text-lg font-extrabold text-zinc-900">Weekly Activity</h3>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
            <span className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-wider">Correct</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-blue-200" />
            <span className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-wider">Reviewed</span>
          </div>
        </div>
      </div>

      <div className="h-[200px] flex items-end justify-between gap-4 px-2 relative">
        <div className="absolute inset-x-0 bottom-0 h-full border-b border-zinc-100 flex flex-col justify-between pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-full border-t border-zinc-50" />
          ))}
        </div>
        
        <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 100 100">
          <path d="M 0 50 Q 25 30, 50 60 T 100 40" fill="none" stroke="#F97316" strokeWidth="2" strokeDasharray="4 4" opacity="0.4" />
        </svg>

        {[
          { d: "Sun", v: 18, t: 14 },
          { d: "Mon", v: 22, t: 19 },
          { d: "Tue", v: 15, t: 12 },
          { d: "Wed", v: 28, t: 24 },
          { d: "Thu", v: 20, t: 17 },
          { d: "Fri", v: 24, t: 21 },
          { d: "Sat", v: 16, t: 13, active: true },
        ].map((day, i) => (
          <div key={i} className="flex-1 flex flex-col items-center h-full relative z-10 group">
            {day.active && (
              <div className="absolute -top-10 text-orange-500 animate-bounce">
                <Flame size={20} fill="#F97316" />
              </div>
            )}
            <div className="w-full flex-1 flex items-end justify-center gap-0.5">
              <div
                className={`w-4 sm:w-6 rounded-t-lg transition-all duration-500 relative ${day.active ? "bg-blue-600 shadow-lg shadow-blue-100" : "bg-blue-400/60"}`}
                style={{ height: `${(day.v / 30) * 100}%` }}
              >
                 <div className="absolute bottom-0 w-full bg-blue-600 rounded-t-lg opacity-40" style={{ height: `${(day.t / day.v) * 100}%` }} />
              </div>
            </div>
            <div className={`mt-4 text-[11px] font-bold uppercase tracking-wider ${day.active ? "text-blue-600" : "text-zinc-400"}`}>
              {day.d}
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="lg:col-span-2 editorial-card p-7">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 border border-emerald-100">
          <Target size={20} />
        </div>
        <div>
          <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Mastery</span>
          <h3 className="text-lg font-extrabold text-zinc-900">Word Status</h3>
        </div>
      </div>

      <div className="flex items-center gap-8">
        <div className="relative shrink-0">
          <div className="w-[140px] h-[140px] rounded-full border-[16px] border-zinc-100" />
          <svg className="absolute top-0 left-0 w-[140px] h-[140px] -rotate-90">
             <circle cx="70" cy="70" r="62" fill="none" stroke="#10B981" strokeWidth="16" strokeDasharray="390" strokeDashoffset="260" strokeLinecap="round" />
             <circle cx="70" cy="70" r="62" fill="none" stroke="#3B82F6" strokeWidth="16" strokeDasharray="390" strokeDashoffset="310" strokeLinecap="round" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="bg-amber-400 w-10 h-10 rounded-md flex items-center justify-center shadow-inner">
               <span className="text-white text-xs font-black">Lv 7</span>
             </div>
          </div>
        </div>

        <div className="flex-1 space-y-4">
          {[
            { label: "Mastered", value: 168, color: "bg-emerald-500" },
            { label: "Review", value: 53, color: "bg-blue-500" },
            { label: "Learning", value: 26, color: "bg-orange-500" },
            { label: "New", value: 503, color: "bg-zinc-100" },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
                <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">{item.label}</span>
              </div>
              <span className="text-sm font-extrabold text-zinc-900 tabular-nums">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const ProgressByBelt = () => {
  const belts = [
    { name: "White Belt", sub: "Foundation", color: "bg-zinc-400", done: 7, total: 7 },
    { name: "Yellow Belt", sub: "Expansion", color: "bg-amber-400", done: 5, total: 7, current: true },
  ];

  return (
    <div className="editorial-card p-7 mb-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600 border border-orange-100">
            <TrendingUp size={20} />
          </div>
          <h3 className="text-lg font-extrabold text-zinc-900">Progress by Belt</h3>
        </div>
        <button className="text-xs font-extrabold text-orange-600 hover:text-orange-700 flex items-center gap-1 uppercase tracking-widest">
          All Missions <ArrowRight size={14} />
        </button>
      </div>

      <div className="space-y-10">
        {belts.map((belt) => (
          <div key={belt.name} className="flex gap-8">
            <div className="w-[180px] shrink-0">
              <div className="flex items-center gap-2 mb-1">
                <div className={`w-3 h-3 rounded-sm ${belt.color}`} />
                <span className="text-sm font-extrabold text-zinc-900">{belt.name}</span>
              </div>
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest pl-5">{belt.sub}</p>
            </div>

            <div className="flex-1 grid grid-cols-7 gap-3">
              {[...Array(7)].map((_, i) => {
                const day = i + 1;
                const isDone = day <= belt.done;
                const isCurrent = belt.current && day === belt.done + 1;
                const pct = isDone ? 100 : isCurrent ? 60 : 0;
                
                return (
                  <div key={i} className="bg-[#FBF7F1] border border-[#EEE6DB] rounded-xl p-3 flex flex-col min-h-[84px] relative group hover:border-orange-200 hover:shadow-sm transition-all">
                    <div className="flex justify-between items-start mb-auto">
                      <span className="font-serif italic text-xs text-orange-800 opacity-40">#{day}</span>
                      <span className={`text-[9px] font-black tabular-nums ${pct === 100 ? "text-emerald-600" : pct > 0 ? "text-orange-600" : "text-zinc-300"}`}>
                        {pct}%
                      </span>
                    </div>

                    <div className="flex justify-center mb-3">
                      {pct === 100 ? (
                        <div className="w-6 h-6 rounded-lg bg-emerald-500 flex items-center justify-center text-white shadow-sm shadow-emerald-100">
                          <Check size={14} strokeWidth={3} />
                        </div>
                      ) : pct > 0 ? (
                        <div className="w-6 h-6 rounded-lg bg-orange-500 flex items-center justify-center text-white animate-pulse">
                          <Sparkles size={12} />
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-lg bg-zinc-200/50 flex items-center justify-center text-zinc-300">
                          <Lock size={12} />
                        </div>
                      )}
                    </div>

                    <div className="w-full h-1 bg-zinc-200/50 rounded-full overflow-hidden mb-1">
                      <div className={`h-full ${pct === 100 ? "bg-emerald-500" : "bg-orange-400"}`} style={{ width: `${pct}%` }} />
                    </div>
                    <span className="text-[9px] font-extrabold text-zinc-400 uppercase tracking-tighter text-center">Day {day}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const MascotAndNeedsFocus = () => (
  <div className="grid lg:grid-cols-3 gap-8 mb-8">
    <div className="lg:col-span-2 editorial-card bg-gradient-to-br from-orange-400 to-rose-500 p-10 flex items-center gap-10 shadow-xl shadow-orange-100">
      <div className="shrink-0 bg-white/10 p-6 rounded-[2.5rem] backdrop-blur-md border border-white/20">
        <svg width="96" height="96" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.47 2 2 6.47 2 12C2 17.53 6.47 22 12 22C17.53 22 22 17.53 22 12C22 6.47 17.53 2 12 2ZM12 4C14.1 4 16.03 4.79 17.53 6.08L14.41 9.2C13.68 8.45 12.87 7.78 12 7.22C11.13 7.78 10.32 8.45 9.59 9.2L6.47 6.08C7.97 4.79 9.9 4 12 4ZM12 20C9.9 20 7.97 19.21 6.47 17.92L9.59 14.8C10.32 15.55 11.13 16.22 12 16.78C12.87 16.22 13.68 15.55 14.41 14.8L17.53 17.92C16.03 19.21 14.1 20 12 20ZM4 12C4 9.9 4.79 7.97 6.08 6.47L9.2 9.59C8.45 10.32 7.78 11.13 7.22 12C7.78 12.87 8.45 13.68 9.2 14.41L6.08 17.53C4.79 16.03 4 14.1 4 12ZM20 12C20 14.1 19.21 16.03 17.92 17.53L14.8 14.41C15.55 13.68 16.22 12.87 16.78 12C16.22 11.13 15.55 10.32 14.8 9.59L17.92 6.47C19.21 7.97 20 9.9 20 12Z" fill="white"/>
          <circle cx="12" cy="12" r="3" fill="white"/>
        </svg>
      </div>
      <div className="flex flex-col items-start">
        <span className="text-white/80 text-[11px] font-black uppercase tracking-[0.25em] mb-2">Daily Encouragement</span>
        <h3 className="font-serif italic text-3xl text-white mb-6 leading-tight">
          "Consistency is your greatest weapon. Keep training, Ninja."
        </h3>
        <div className="px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-white text-xs font-black uppercase tracking-widest flex items-center gap-2">
          <Flame size={14} fill="#fff" /> Streak Day 5
        </div>
      </div>
    </div>

    <div className="editorial-card p-7">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 border border-purple-100">
            <Zap size={20} />
          </div>
          <h3 className="text-lg font-extrabold text-zinc-900">Needs Focus</h3>
        </div>
        <button className="text-[10px] font-black text-purple-600 uppercase tracking-widest hover:underline">Practice →</button>
      </div>

      <div className="flex flex-wrap gap-2.5">
        {[
          "abrogate", "quiescent", "perspicacious", "obstreperous",
          "lugubrious", "mendacious", "obsequious", "desultory"
        ].map((word) => (
          <div key={word} className="flex items-center gap-2 px-3.5 py-2 bg-purple-50 border border-purple-100 rounded-xl text-purple-800 text-sm font-bold hover:bg-white transition-all cursor-default">
            <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
            {word}
          </div>
        ))}
      </div>
    </div>
  </div>
);

const AchievementsGrid = () => (
  <div className="editorial-card p-7">
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 border border-amber-100">
          <Trophy size={20} />
        </div>
        <h3 className="text-lg font-extrabold text-zinc-900">Achievements</h3>
      </div>
      <button className="text-[10px] font-black text-amber-600 uppercase tracking-widest hover:underline">View All →</button>
    </div>

    <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
      {[
        { emoji: "🏅", title: "Fifty Mastered", sub: "Master 50 words", done: true },
        { emoji: "💎", title: "XP 2500", sub: "Reach 2,500 XP", done: true },
        { emoji: "🔥", title: "Week Warrior", sub: "7-day streak", done: true },
        { emoji: "🌟", title: "Two Weeks Strong", sub: "14-day streak", done: false, prog: 35 },
        { emoji: "🥇", title: "First Word", sub: "Master your first word", done: false, prog: 0 },
        { emoji: "🏆", title: "Ten Mastered", sub: "Master 10 words", done: false, prog: 0 },
      ].map((badge, i) => (
        <div key={i} className={`flex flex-col items-center text-center p-5 rounded-2xl border ${badge.done ? "bg-amber-50/30 border-amber-100" : "bg-zinc-50/50 border-zinc-100 opacity-60"}`}>
          <span className="text-4xl mb-4 grayscale-[0.2]">{badge.emoji}</span>
          <h5 className="text-sm font-black text-zinc-900 mb-1 leading-tight">{badge.title}</h5>
          <p className="text-[10px] font-medium text-zinc-400 uppercase tracking-wider mb-4">{badge.sub}</p>
          
          {badge.done ? (
            <div className="w-7 h-7 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center border border-emerald-200">
              <Check size={14} strokeWidth={4} />
            </div>
          ) : (
            <div className="w-full h-1.5 bg-zinc-200/50 rounded-full overflow-hidden mt-auto">
              <div className="h-full bg-amber-400" style={{ width: `${badge.prog}%` }} />
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
);

export default function Editorial() {
  return (
    <div className="gre-home-polished gre-home-polished--editorial relative min-h-screen">
      <Sidebar />
      
      <main className="ml-[232px] flex-1 min-w-0 p-8 lg:p-12">
        <div className="max-w-[1240px] mx-auto">
          <header className="mb-10">
            <span className="font-serif italic text-xl text-orange-600 mb-2 block">Welcome back, Ninja.</span>
            <h1 className="text-5xl font-black text-zinc-900 tracking-tight">Your training log for April 24</h1>
          </header>

          <SummaryStrip />
          <BeltJourney />
          <Agenda />
          <ActivityRow />
          <ProgressByBelt />
          <MascotAndNeedsFocus />
          <AchievementsGrid />
        </div>
      </main>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
