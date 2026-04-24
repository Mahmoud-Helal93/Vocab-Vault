import "./_group.css";
import { Check, Flame, Star, Trophy, Lock, Play } from "lucide-react";
import { BELTS, TOTAL_DAYS, GROUPS_PER_DAY, makeWords, getDayStats, getSetStats } from "./_data";

const words = makeWords();

function BeltMedallion({ color, num, size = 64, locked = false }: { color: string; num: number; size?: number; locked?: boolean }) {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <div className="absolute inset-0 rounded-full"
        style={{ background: `radial-gradient(circle at 30% 30%, ${color}ee, ${color}aa 60%, ${color}55 100%)`, boxShadow: `0 8px 24px -8px ${color}66, inset 0 -4px 8px ${color}33` }} />
      <div className="absolute inset-1.5 rounded-full border-2 flex items-center justify-center font-extrabold text-white"
        style={{ borderColor: `${color}33`, fontSize: size * 0.35, opacity: locked ? 0.5 : 1 }}>
        {locked ? <Lock size={size * 0.32} /> : num}
      </div>
    </div>
  );
}

function MissionStone({ day, missionNum, status, side }: { day: number; missionNum: number; status: "done" | "active" | "locked" | "open"; side: "left" | "right" }) {
  const stats = getDayStats(words, day);
  const pct = stats.total > 0 ? Math.round((stats.mastered / stats.total) * 100) : 0;
  const colors = {
    done:   { bg: "bg-emerald-500", ring: "ring-emerald-200", text: "text-emerald-700", icon: <Check size={20} strokeWidth={3} className="text-white" /> },
    active: { bg: "bg-orange-500",  ring: "ring-orange-200",  text: "text-orange-700",  icon: <Play size={18} fill="white" className="text-white" /> },
    open:   { bg: "bg-white border-2 border-orange-300", ring: "ring-orange-100", text: "text-orange-600", icon: <span className="text-orange-500 font-bold text-sm">M{missionNum}</span> },
    locked: { bg: "bg-gray-200",    ring: "ring-gray-100",    text: "text-gray-400",    icon: <Lock size={16} className="text-gray-400" /> },
  }[status];

  return (
    <div className={`flex items-center gap-3 ${side === "right" ? "flex-row-reverse" : ""}`}>
      <button className={`w-14 h-14 rounded-2xl ${colors.bg} ring-4 ${colors.ring} flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-md`}>
        {colors.icon}
      </button>
      <div className={side === "right" ? "text-right" : ""}>
        <div className={`text-xs font-bold ${colors.text}`}>Mission {missionNum}</div>
        <div className="text-[10px] text-muted-foreground">Day {day} · {pct}%</div>
      </div>
    </div>
  );
}

export function VariantA() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50/60 via-background to-background text-foreground">
      <div className="px-4 py-6 max-w-[1200px] mx-auto">
        {/* Hero header */}
        <div className="rounded-3xl bg-gradient-to-br from-orange-500 to-rose-500 text-white p-5 mb-6 relative overflow-hidden">
          <div className="absolute -right-8 -top-8 text-[180px] opacity-15 select-none">🥋</div>
          <div className="relative flex items-end justify-between gap-4">
            <div>
              <div className="text-xs font-bold tracking-widest uppercase opacity-90">Your Dojo Path</div>
              <div className="text-3xl font-extrabold mt-1">White Belt → Black Belt</div>
              <div className="text-sm opacity-90 mt-1">Walk the path, one mission at a time</div>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center shrink-0">
              <div><div className="text-2xl font-extrabold tabular-nums">115</div><div className="text-[10px] opacity-80">Mastered</div></div>
              <div><div className="text-2xl font-extrabold tabular-nums">3</div><div className="text-[10px] opacity-80">Missions</div></div>
              <div><div className="text-2xl font-extrabold tabular-nums">7</div><div className="text-[10px] opacity-80 flex items-center gap-1 justify-center"><Flame size={11}/>Streak</div></div>
            </div>
          </div>
        </div>

        {/* Path */}
        <div className="relative">
          {/* Center connector line */}
          <svg className="absolute left-1/2 top-0 -translate-x-1/2 h-full w-32 pointer-events-none" preserveAspectRatio="none" viewBox="0 0 100 1000">
            <path d="M50,20 Q90,80 50,140 Q10,200 50,260 Q90,320 50,380 Q10,440 50,500 Q90,560 50,620 Q10,680 50,740 Q90,800 50,860"
              fill="none" stroke="#F97316" strokeWidth="3" strokeDasharray="6 6" opacity="0.35" />
          </svg>

          <div className="space-y-8 relative">
            {BELTS.map((belt, bIdx) => {
              const startDay = bIdx * 7 + 1;
              const endDay = Math.min(startDay + 6, TOTAL_DAYS);
              const missionDays = Array.from({ length: endDay - startDay + 1 }, (_, k) => startDay + k);
              const beltMastered = missionDays.reduce((acc, d) => acc + getDayStats(words, d).mastered, 0);
              const beltTotal = missionDays.reduce((acc, d) => acc + getDayStats(words, d).total, 0);
              const beltPct = beltTotal > 0 ? Math.round((beltMastered / beltTotal) * 100) : 0;
              const previousComplete = bIdx === 0 || (bIdx > 0 && missionDays.every(() => false)); // simplified
              const beltActive = bIdx <= 1;
              const beltLocked = bIdx > 1;

              return (
                <div key={belt.num} className="relative">
                  {/* Belt section header */}
                  <div className="flex items-center gap-4 mb-4">
                    <BeltMedallion color={belt.color} num={belt.num} size={72} locked={beltLocked} />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <div className="font-extrabold text-xl" style={{ color: beltLocked ? "#9CA3AF" : belt.textColor }}>{belt.name}</div>
                        {beltPct === 100 && <Trophy size={16} className="text-amber-500" />}
                      </div>
                      <div className="text-xs text-muted-foreground">{belt.subtitle} · {belt.desc}</div>
                      <div className="mt-2 flex items-center gap-2">
                        <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden max-w-[280px]">
                          <div className="h-full transition-all" style={{ width: `${beltPct}%`, backgroundColor: belt.color }} />
                        </div>
                        <span className="text-[11px] font-bold tabular-nums" style={{ color: belt.textColor }}>{beltPct}%</span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-2xl font-extrabold tabular-nums" style={{ color: belt.textColor }}>{beltMastered}</div>
                      <div className="text-[10px] text-muted-foreground">/ {beltTotal} words</div>
                    </div>
                  </div>

                  {/* Mission stones in zigzag */}
                  <div className="grid grid-cols-2 gap-y-3 gap-x-12 pl-4 pr-4">
                    {missionDays.map((day, i) => {
                      const stats = getDayStats(words, day);
                      let status: "done" | "active" | "locked" | "open" = "open";
                      if (beltLocked) status = "locked";
                      else if (stats.done) status = "done";
                      else if (stats.mastered > 0 || stats.learning > 0) status = "active";
                      else status = "open";
                      const side = i % 2 === 0 ? "left" : "right";
                      return (
                        <div key={day} className={`flex ${side === "right" ? "justify-end" : "justify-start"}`}>
                          <MissionStone day={day} missionNum={i + 1} status={status} side={side} />
                        </div>
                      );
                    })}
                  </div>

                  {/* Belt test trophy at the end */}
                  <div className="flex items-center justify-center mt-4">
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 ${beltPct === 100 ? "border-amber-300 bg-amber-50 text-amber-700" : "border-dashed border-muted-foreground/30 text-muted-foreground bg-card"}`}>
                      <Trophy size={14} />
                      <span className="text-xs font-bold uppercase tracking-wider">Belt Test {beltPct === 100 ? "· Ready" : `· ${7 - missionDays.filter((d) => getDayStats(words, d).done).length} missions to go`}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
