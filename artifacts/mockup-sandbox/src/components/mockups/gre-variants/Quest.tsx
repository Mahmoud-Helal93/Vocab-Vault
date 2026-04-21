import React from "react";
import { 
  Flame, 
  Heart, 
  Coins, 
  Swords, 
  Zap, 
  Trophy, 
  ScrollText, 
  Target, 
  Star,
  Map as MapIcon,
  ChevronRight,
  Shield,
  BookOpen
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Mock Data
const masteredWords = [
  { word: "capricious", rings: 5 },
  { word: "austere", rings: 5 },
  { word: "ephemeral", rings: 4 },
  { word: "didactic", rings: 3 },
  { word: "cerebral", rings: 5 },
];

const quests = [
  {
    title: "Daily Drill",
    desc: "Review 18 words",
    xp: 150,
    icon: <Swords className="w-5 h-5 text-amber-400" />,
    color: "bg-amber-500/20 border-amber-500/30 text-amber-300",
    progress: 12,
    total: 18
  },
  {
    title: "Confusable Combat",
    desc: "Distinguish 5 word pairs",
    xp: 200,
    icon: <Shield className="w-5 h-5 text-emerald-400" />,
    color: "bg-emerald-500/20 border-emerald-500/30 text-emerald-300",
    progress: 2,
    total: 5
  },
  {
    title: "Root Mastery",
    desc: "Conquer the 'capra' family",
    xp: 300,
    icon: <ScrollText className="w-5 h-5 text-purple-400" />,
    color: "bg-purple-500/20 border-purple-500/30 text-purple-300",
    progress: 0,
    total: 1
  },
  {
    title: "Streak Saver",
    desc: "Quick 10 in 2 minutes",
    xp: 100,
    icon: <Zap className="w-5 h-5 text-blue-400" />,
    color: "bg-blue-500/20 border-blue-500/30 text-blue-300",
    progress: 0,
    total: 10,
    timeLimited: true
  }
];

export function Quest() {
  return (
    <div className="min-h-[900px] w-full bg-[#0a0715] text-slate-100 font-['Space_Grotesk'] overflow-x-hidden pb-20 relative selection:bg-purple-500/30">
      
      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* TOP HUD */}
      <header className="sticky top-0 z-50 bg-[#0a0715]/80 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex items-center justify-between shadow-2xl shadow-black">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center p-1 shadow-lg shadow-orange-500/20">
              <div className="w-full h-full bg-[#130d26] rounded-full flex items-center justify-center border-2 border-orange-500/50">
                <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
              </div>
            </div>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-amber-500 text-black text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#0a0715]">
              LV 7
            </div>
          </div>
          <div>
            <h1 className="text-lg font-bold bg-gradient-to-r from-amber-200 to-orange-400 bg-clip-text text-transparent">Lexicographer</h1>
            <div className="flex items-center gap-2 mt-1">
              <Progress value={62} className="h-2 w-32 bg-slate-800 [&>div]:bg-gradient-to-r [&>div]:from-amber-500 [&>div]:to-orange-400" />
              <span className="text-xs text-slate-400 font-medium">1,240 / 2,000 XP</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
            <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
            <span className="font-bold text-sm">4</span>
          </div>
          <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
            <span className="font-bold text-sm">5/5</span>
          </div>
          <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
            <Coins className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span className="font-bold text-sm">340</span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-12 gap-12">
        
        {/* LEFT COLUMN: THE MAP */}
        <section className="col-span-7 relative">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <MapIcon className="w-6 h-6 text-purple-400" />
                The Lexicon Trail
              </h2>
              <p className="text-slate-400 text-sm mt-1">Region 1: The Foundations</p>
            </div>
            <Badge variant="outline" className="bg-purple-500/10 text-purple-300 border-purple-500/30">
              Day 2 of 5
            </Badge>
          </div>

          <div className="relative py-12 flex flex-col items-center">
            {/* SVG Path connecting nodes */}
            <svg className="absolute top-0 bottom-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
              <path 
                d="M 50% 40 C 30% 120, 70% 200, 50% 280 C 30% 360, 70% 440, 50% 520 C 30% 600, 70% 680, 50% 760" 
                fill="none" 
                stroke="rgba(255,255,255,0.1)" 
                strokeWidth="12" 
                strokeLinecap="round"
                strokeDasharray="1 24"
              />
              <path 
                d="M 50% 40 C 30% 120, 70% 200, 50% 280" 
                fill="none" 
                stroke="url(#pathGradient)" 
                strokeWidth="12" 
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#f59e0b" />
                </linearGradient>
              </defs>
            </svg>

            {/* Nodes */}
            <div className="flex flex-col gap-24 relative z-10 w-full items-center">
              
              {/* Day 1 - Completed */}
              <div className="relative group cursor-pointer">
                <div className="w-20 h-20 rounded-full bg-purple-600 flex items-center justify-center border-4 border-purple-300 shadow-[0_0_30px_rgba(168,85,247,0.4)]">
                  <Star className="w-8 h-8 text-white fill-white" />
                </div>
                <div className="absolute top-1/2 -translate-y-1/2 left-24 whitespace-nowrap">
                  <h3 className="font-bold text-lg text-purple-200">Day 1: Genesis</h3>
                  <div className="flex gap-1 mt-1">
                    {[1,2,3].map(i => (
                      <div key={i} className="w-3 h-3 rounded-full bg-purple-400" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Day 2 - Active */}
              <div className="relative group cursor-pointer -translate-x-12">
                {/* Orbiting sub-nodes */}
                <div className="absolute -top-4 -right-8 w-8 h-8 rounded-full bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center animate-pulse">
                  <span className="text-[10px] font-bold text-amber-400">1</span>
                </div>
                <div className="absolute top-1/2 -translate-y-1/2 -right-12 w-8 h-8 rounded-full bg-slate-800 border-2 border-slate-600 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-slate-400">2</span>
                </div>
                <div className="absolute -bottom-4 -right-8 w-8 h-8 rounded-full bg-slate-800 border-2 border-slate-600 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-slate-400">3</span>
                </div>

                <div className="w-24 h-24 rounded-full bg-gradient-to-b from-amber-400 to-orange-600 flex items-center justify-center border-4 border-white shadow-[0_0_50px_rgba(245,158,11,0.6)] relative z-10 hover:scale-105 transition-transform">
                  <Target className="w-10 h-10 text-white" />
                  
                  {/* Floating Action Button */}
                  <div className="absolute -bottom-6 bg-white text-orange-600 font-bold px-4 py-1 rounded-full text-sm shadow-xl flex items-center gap-1 whitespace-nowrap">
                    START <ChevronRight className="w-4 h-4" />
                  </div>
                </div>

                <div className="absolute top-1/2 -translate-y-1/2 right-32 whitespace-nowrap text-right">
                  <h3 className="font-bold text-xl text-amber-400 drop-shadow-md">Day 2: Structure</h3>
                  <p className="text-sm text-amber-200/70">Group 1 • 10 words</p>
                </div>
              </div>

              {/* Day 3 - Locked */}
              <div className="relative group opacity-50 translate-x-8">
                <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center border-4 border-slate-600">
                  <div className="w-4 h-4 rounded-full bg-slate-600" />
                </div>
                <div className="absolute top-1/2 -translate-y-1/2 left-20 whitespace-nowrap">
                  <h3 className="font-bold text-slate-400">Day 3</h3>
                </div>
              </div>

              {/* Day 4 - Locked */}
              <div className="relative group opacity-50 -translate-x-4">
                <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center border-4 border-slate-600">
                  <div className="w-4 h-4 rounded-full bg-slate-600" />
                </div>
                <div className="absolute top-1/2 -translate-y-1/2 right-20 whitespace-nowrap text-right">
                  <h3 className="font-bold text-slate-400">Day 4</h3>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* RIGHT COLUMN: QUESTS & TROPHIES */}
        <section className="col-span-5 flex flex-col gap-10">
          
          {/* Daily Quests */}
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
              <ScrollText className="w-6 h-6 text-amber-400" />
              Today's Quests
            </h2>
            
            <div className="flex flex-col gap-4">
              {quests.map((quest, i) => (
                <div key={i} className={cn(
                  "relative p-5 rounded-2xl border bg-slate-900/50 backdrop-blur-sm transition-all hover:-translate-y-1 cursor-pointer overflow-hidden group",
                  quest.color.split(' ')[1] // border color
                )}>
                  {quest.timeLimited && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-blue-500/0 animate-[shimmer_2s_infinite]" />
                  )}
                  <div className="flex items-start justify-between relative z-10">
                    <div className="flex gap-4">
                      <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", quest.color.split(' ')[0])}>
                        {quest.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-200">{quest.title}</h3>
                        <p className="text-sm text-slate-400">{quest.desc}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-slate-950 border-white/10 text-amber-400 font-bold">
                      +{quest.xp} XP
                    </Badge>
                  </div>
                  
                  <div className="mt-4 flex items-center gap-3 relative z-10">
                    <Progress value={(quest.progress / quest.total) * 100} className={cn("h-2 flex-1", 
                      quest.color.includes('amber') ? "[&>div]:bg-amber-400 bg-amber-950" :
                      quest.color.includes('emerald') ? "[&>div]:bg-emerald-400 bg-emerald-950" :
                      quest.color.includes('purple') ? "[&>div]:bg-purple-400 bg-purple-950" :
                      "[&>div]:bg-blue-400 bg-blue-950"
                    )} />
                    <span className="text-xs font-bold text-slate-400 w-10 text-right">
                      {quest.progress}/{quest.total}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trophy Shelf */}
          <div className="bg-gradient-to-b from-slate-900/80 to-slate-900/30 border border-white/5 rounded-3xl p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay pointer-events-none" />
            
            <div className="flex items-center justify-between mb-6 relative z-10">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-400" />
                Recently Mastered
              </h2>
              <button className="text-xs font-bold text-slate-400 hover:text-white flex items-center transition-colors">
                Word Bestiary <ChevronRight className="w-3 h-3 ml-1" />
              </button>
            </div>

            <div className="flex flex-wrap gap-4 relative z-10">
              {masteredWords.map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-2 group cursor-help">
                  <div className="relative w-14 h-14">
                    {/* Ring background */}
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                      {/* Active ring */}
                      <circle 
                        cx="50" cy="50" r="45" 
                        fill="none" 
                        stroke={item.rings === 5 ? "#eab308" : "#94a3b8"} 
                        strokeWidth="8" 
                        strokeDasharray="282.7" 
                        strokeDashoffset={282.7 - (282.7 * (item.rings / 5))}
                        strokeLinecap="round"
                        className="transition-all duration-1000"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <BookOpen className={cn("w-5 h-5", item.rings === 5 ? "text-yellow-400" : "text-slate-400")} />
                    </div>
                  </div>
                  <span className="text-xs font-bold text-slate-300 group-hover:text-white transition-colors">
                    {item.word}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </section>
      </main>

    </div>
  );
}
