import "./_group.css";
import { Check, Lock, ChevronRight, Sparkles, Target } from "lucide-react";
import { BELTS, TOTAL_DAYS, GROUPS_PER_DAY, makeWords, getDayStats } from "./_data";

const words = makeWords();

function SetDot({ filled, color }: { filled: boolean; color: string }) {
  return (
    <div className="w-2 h-2 rounded-full transition-all"
      style={{ backgroundColor: filled ? color : undefined, border: filled ? "none" : `1.5px solid ${color}55` }} />
  );
}

function MissionTile({ day, missionNum, color, locked }: { day: number; missionNum: number; color: string; locked: boolean }) {
  const stats = getDayStats(words, day);
  const setStates = Array.from({ length: GROUPS_PER_DAY }, (_, g) => {
    const gw = words.filter((w) => w.day === day && w.group === g + 1);
    return gw.length > 0 && gw.every((w) => w.status === "mastered");
  });
  const pct = stats.total > 0 ? Math.round((stats.mastered / stats.total) * 100) : 0;
  const done = stats.done;
  const inProgress = !done && (stats.mastered > 0 || stats.learning > 0);

  if (locked) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-muted/30 p-3 flex flex-col items-center justify-center text-center min-h-[110px]">
        <Lock size={16} className="text-muted-foreground/50 mb-1" />
        <div className="text-[10px] font-semibold text-muted-foreground/60">Mission {missionNum}</div>
      </div>
    );
  }

  return (
    <button className={`group rounded-xl border bg-card p-3 text-left flex flex-col gap-2 min-h-[110px] transition-all hover:-translate-y-0.5 hover:shadow-md ${done ? "border-emerald-200" : inProgress ? "border-orange-300 ring-2 ring-orange-100" : "border-border"}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-extrabold text-white"
              style={{ backgroundColor: done ? "#10B981" : color }}>
              {done ? <Check size={11} strokeWidth={3} /> : missionNum}
            </div>
            <span className="text-xs font-bold">M{missionNum}</span>
          </div>
          <span className="text-[10px] text-muted-foreground tabular-nums">D{day}</span>
        </div>

        <div className="flex items-center gap-1.5">
          {setStates.map((s, i) => <SetDot key={i} filled={s} color={color} />)}
          <span className="text-[10px] text-muted-foreground ml-auto tabular-nums">{stats.mastered}/{stats.total}</span>
        </div>

        <div className="h-1 rounded-full bg-muted overflow-hidden mt-auto">
          <div className="h-full transition-all" style={{ width: `${pct}%`, backgroundColor: done ? "#10B981" : color }} />
        </div>

        <div className="flex items-center justify-between">
          <span className={`text-[10px] font-semibold ${done ? "text-emerald-600" : inProgress ? "text-orange-600" : "text-muted-foreground"}`}>
            {done ? "Complete" : inProgress ? "In progress" : "Not started"}
          </span>
          <ChevronRight size={11} className="text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
        </div>
    </button>
  );
}

export function VariantB() {
  const totalMastered = words.filter((w) => w.status === "mastered").length;
  const totalWords = words.length;
  const overallPct = Math.round((totalMastered / totalWords) * 100);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="px-4 py-6 max-w-[1240px] mx-auto">
        {/* Compact summary strip */}
        <div className="flex items-center gap-3 mb-5">
          <div className="flex-1 rounded-2xl border border-border bg-card px-4 py-3 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Target size={18} className="text-orange-500" />
              <div>
                <div className="text-xl font-extrabold tabular-nums leading-none">{overallPct}%</div>
                <div className="text-[10px] text-muted-foreground mt-0.5">Mastery</div>
              </div>
            </div>
            <div className="h-8 w-px bg-border" />
            <div className="flex-1 grid grid-cols-3 gap-3">
              <div><div className="text-sm font-bold tabular-nums">{totalMastered}<span className="text-muted-foreground font-normal text-xs">/{totalWords}</span></div><div className="text-[10px] text-muted-foreground">Words</div></div>
              <div><div className="text-sm font-bold tabular-nums text-orange-600">3<span className="text-muted-foreground font-normal text-xs">/{TOTAL_DAYS}</span></div><div className="text-[10px] text-muted-foreground">Missions</div></div>
              <div><div className="text-sm font-bold tabular-nums text-blue-600">12<span className="text-muted-foreground font-normal text-xs">/{TOTAL_DAYS * GROUPS_PER_DAY}</span></div><div className="text-[10px] text-muted-foreground">Sets</div></div>
            </div>
          </div>
          <button className="rounded-2xl px-4 py-3 bg-orange-500 text-white text-sm font-bold flex items-center gap-2 shadow-sm hover:bg-orange-600">
            <Sparkles size={14} /> Resume Mission 4
          </button>
        </div>

        {/* Belt sections */}
        <div className="space-y-4">
          {BELTS.map((belt, bIdx) => {
            const startDay = bIdx * 7 + 1;
            const endDay = Math.min(startDay + 6, TOTAL_DAYS);
            const missionDays = Array.from({ length: endDay - startDay + 1 }, (_, k) => startDay + k);
            const beltMastered = missionDays.reduce((acc, d) => acc + getDayStats(words, d).mastered, 0);
            const beltTotal = missionDays.reduce((acc, d) => acc + getDayStats(words, d).total, 0);
            const beltPct = beltTotal > 0 ? Math.round((beltMastered / beltTotal) * 100) : 0;
            const beltLocked = bIdx > 1;

            return (
              <section key={belt.num} className="rounded-2xl border border-border bg-card overflow-hidden">
                {/* Belt header strip */}
                <div className="flex items-center gap-3 px-4 py-3 border-b border-border"
                  style={{ background: `linear-gradient(90deg, ${belt.color}14, transparent 60%)` }}>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-extrabold shrink-0 shadow-sm"
                    style={{ backgroundColor: belt.color }}>
                    {belt.num}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2">
                      <span className="font-extrabold text-base">{belt.name}</span>
                      <span className="text-xs font-medium" style={{ color: belt.textColor }}>{belt.subtitle}</span>
                    </div>
                    <div className="text-[11px] text-muted-foreground">{belt.desc}</div>
                  </div>
                  <div className="hidden sm:flex items-center gap-2 w-56">
                    <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                      <div className="h-full" style={{ width: `${beltPct}%`, backgroundColor: belt.color }} />
                    </div>
                    <span className="text-[11px] font-bold tabular-nums w-9 text-right" style={{ color: beltLocked ? "#9CA3AF" : belt.textColor }}>{beltPct}%</span>
                  </div>
                  <div className="text-right shrink-0 w-24">
                    <div className="text-base font-extrabold tabular-nums" style={{ color: beltLocked ? "#9CA3AF" : belt.textColor }}>
                      {beltMastered}<span className="text-muted-foreground font-normal text-xs">/{beltTotal}</span>
                    </div>
                    <div className="text-[10px] text-muted-foreground">words</div>
                  </div>
                  <button className={`shrink-0 rounded-lg border px-3 py-1.5 text-[11px] font-bold transition-colors ${beltLocked ? "border-border text-muted-foreground" : "border-orange-200 bg-orange-50 text-orange-700 hover:bg-orange-100"}`}>
                    {beltPct === 100 ? "Belt Test ✓" : "Belt Test"}
                  </button>
                </div>

                {/* Mission grid */}
                <div className="grid grid-cols-7 gap-2 p-3">
                  {missionDays.map((day, i) => (
                    <MissionTile key={day} day={day} missionNum={i + 1} color={belt.color} locked={beltLocked} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
