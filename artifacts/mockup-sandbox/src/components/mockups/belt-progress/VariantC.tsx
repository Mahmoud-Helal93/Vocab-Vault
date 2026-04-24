import "./_group.css";
import { Flame, Trophy, Calendar as CalIcon, Target, TrendingUp } from "lucide-react";
import { BELTS, TOTAL_DAYS, GROUPS_PER_DAY, makeWords, getDayStats } from "./_data";

const words = makeWords();

function levelColor(pct: number, base: string): string {
  if (pct === 0) return "transparent";
  if (pct < 25) return `${base}26`;
  if (pct < 50) return `${base}55`;
  if (pct < 75) return `${base}99`;
  if (pct < 100) return `${base}cc`;
  return base;
}

export function VariantC() {
  const totalMastered = words.filter((w) => w.status === "mastered").length;
  const totalWords = words.length;
  const overallPct = Math.round((totalMastered / totalWords) * 100);
  const missionsCompleted = Array.from({ length: TOTAL_DAYS }, (_, i) => getDayStats(words, i + 1).done).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="px-4 py-6 max-w-[1240px] mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-5">
          <div>
            <div className="text-xs font-bold tracking-widest uppercase text-orange-600">Dojo Heatmap</div>
            <h1 className="text-2xl font-extrabold mt-0.5">Six Belts · Forty-Two Missions</h1>
            <p className="text-sm text-muted-foreground">A bird's-eye view of your training</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-semibold flex items-center gap-1.5 hover:bg-muted">
              <CalIcon size={12} /> Heatmap
            </button>
            <button className="rounded-lg border border-transparent bg-muted/50 px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:bg-muted">
              List
            </button>
          </div>
        </div>

        {/* KPI strip */}
        <div className="grid grid-cols-4 gap-3 mb-5">
          {[
            { label: "Mastery", value: `${overallPct}%`, icon: <Target size={14} className="text-emerald-600" />, accent: "text-emerald-600", sub: `${totalMastered.toLocaleString()} of ${totalWords.toLocaleString()} words` },
            { label: "Missions", value: `${missionsCompleted}/${TOTAL_DAYS}`, icon: <Trophy size={14} className="text-orange-600" />, accent: "text-orange-600", sub: "3 belts to test" },
            { label: "Sets", value: `12/${TOTAL_DAYS * GROUPS_PER_DAY}`, icon: <TrendingUp size={14} className="text-blue-600" />, accent: "text-blue-600", sub: "10 words each" },
            { label: "Streak", value: "7d", icon: <Flame size={14} className="text-rose-600" />, accent: "text-rose-600", sub: "Best: 14 days" },
          ].map((k) => (
            <div key={k.label} className="rounded-2xl border border-border bg-card p-3">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">{k.icon}{k.label}</div>
              <div className={`text-2xl font-extrabold tabular-nums mt-1 ${k.accent}`}>{k.value}</div>
              <div className="text-[10px] text-muted-foreground mt-0.5">{k.sub}</div>
            </div>
          ))}
        </div>

        {/* Heatmap matrix */}
        <div className="rounded-2xl border border-border bg-card p-4 mb-5">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm font-bold">Mission Matrix</div>
            <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
              <span>Less</span>
              <div className="flex gap-0.5">
                {[0.1, 0.3, 0.5, 0.7, 1].map((o) => (
                  <div key={o} className="w-3 h-3 rounded-sm" style={{ backgroundColor: `rgba(16,185,129,${o})` }} />
                ))}
              </div>
              <span>More</span>
            </div>
          </div>

          {/* Day axis */}
          <div className="flex items-center gap-2 mb-1.5 pl-32">
            {Array.from({ length: 7 }, (_, i) => (
              <div key={i} className="flex-1 text-center text-[10px] font-bold text-muted-foreground tracking-wider">M{i + 1}</div>
            ))}
            <div className="w-20 text-right text-[10px] font-bold text-muted-foreground tracking-wider uppercase">Belt</div>
          </div>

          {/* Belt rows */}
          <div className="space-y-1.5">
            {BELTS.map((belt, bIdx) => {
              const startDay = bIdx * 7 + 1;
              const endDay = Math.min(startDay + 6, TOTAL_DAYS);
              const missionDays = Array.from({ length: endDay - startDay + 1 }, (_, k) => startDay + k);
              const beltMastered = missionDays.reduce((acc, d) => acc + getDayStats(words, d).mastered, 0);
              const beltTotal = missionDays.reduce((acc, d) => acc + getDayStats(words, d).total, 0);
              const beltPct = beltTotal > 0 ? Math.round((beltMastered / beltTotal) * 100) : 0;

              return (
                <div key={belt.num} className="flex items-center gap-2">
                  {/* Belt label */}
                  <div className="w-32 shrink-0 flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-extrabold text-white shrink-0"
                      style={{ backgroundColor: belt.color }}>{belt.num}</div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold truncate" style={{ color: belt.textColor }}>{belt.name}</div>
                      <div className="text-[9px] text-muted-foreground truncate">{belt.subtitle}</div>
                    </div>
                  </div>

                  {/* Mission cells */}
                  {missionDays.map((day) => {
                    const stats = getDayStats(words, day);
                    const pct = stats.total > 0 ? Math.round((stats.mastered / stats.total) * 100) : 0;
                    const setStates = Array.from({ length: GROUPS_PER_DAY }, (_, g) => {
                      const gw = words.filter((w) => w.day === day && w.group === g + 1);
                      return gw.length > 0 && gw.every((w) => w.status === "mastered");
                    });
                    return (
                      <div key={day} className="flex-1 group relative">
                        <button className="w-full aspect-[2/1] rounded-md border transition-all hover:scale-105 hover:z-10 hover:shadow-md flex flex-col items-center justify-center gap-0.5"
                          style={{ backgroundColor: levelColor(pct, belt.color), borderColor: pct > 0 ? `${belt.color}55` : "hsl(var(--border))" }}>
                          <div className="flex items-center gap-0.5">
                            {setStates.map((s, i) => (
                              <div key={i} className="w-1 h-1 rounded-full" style={{ backgroundColor: s ? "white" : `${belt.color}66` }} />
                            ))}
                          </div>
                          <div className={`text-[10px] font-bold tabular-nums ${pct >= 50 ? "text-white" : "text-foreground/70"}`}>
                            D{day}
                          </div>
                        </button>
                      </div>
                    );
                  })}

                  {/* Belt aggregate */}
                  <div className="w-20 shrink-0 text-right">
                    <div className="text-sm font-extrabold tabular-nums" style={{ color: belt.textColor }}>{beltPct}%</div>
                    <div className="h-1 rounded-full bg-muted overflow-hidden mt-0.5">
                      <div className="h-full" style={{ width: `${beltPct}%`, backgroundColor: belt.color }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Two-column: Today's focus + Belt journey */}
        <div className="grid grid-cols-3 gap-3">
          {/* Up next */}
          <div className="col-span-2 rounded-2xl border border-border bg-card p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm font-bold">Up Next</div>
              <span className="text-[10px] text-muted-foreground">Suggested by your progress</span>
            </div>
            <div className="space-y-2">
              {[
                { day: 4, missionNum: 4, belt: BELTS[0], label: "Finish what you started", note: "Set 3 remaining · 10 words" },
                { day: 5, missionNum: 5, belt: BELTS[0], label: "Continue White Belt", note: "Mostly new vocab" },
                { day: 8, missionNum: 1, belt: BELTS[1], label: "Begin Yellow Belt", note: "First mission of the next belt" },
              ].map((item, i) => (
                <button key={i} className="w-full flex items-center gap-3 rounded-xl border border-border p-2.5 hover:border-orange-300 hover:bg-orange-50/40 text-left transition-colors">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold shrink-0"
                    style={{ backgroundColor: item.belt.color }}>M{item.missionNum}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold truncate">{item.label}</div>
                    <div className="text-[11px] text-muted-foreground truncate">Day {item.day} · {item.note}</div>
                  </div>
                  <span className="text-xs font-bold text-orange-600 shrink-0">Resume →</span>
                </button>
              ))}
            </div>
          </div>

          {/* Belt journey */}
          <div className="rounded-2xl border border-border bg-card p-4">
            <div className="text-sm font-bold mb-3">Belt Journey</div>
            <div className="space-y-2">
              {BELTS.map((belt, bIdx) => {
                const startDay = bIdx * 7 + 1;
                const endDay = Math.min(startDay + 6, TOTAL_DAYS);
                const missionDays = Array.from({ length: endDay - startDay + 1 }, (_, k) => startDay + k);
                const beltMastered = missionDays.reduce((acc, d) => acc + getDayStats(words, d).mastered, 0);
                const beltTotal = missionDays.reduce((acc, d) => acc + getDayStats(words, d).total, 0);
                const beltPct = beltTotal > 0 ? Math.round((beltMastered / beltTotal) * 100) : 0;
                return (
                  <div key={belt.num} className="flex items-center gap-2">
                    <div className="w-2 h-8 rounded-full" style={{ backgroundColor: belt.color }} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline justify-between">
                        <span className="text-xs font-bold truncate" style={{ color: belt.textColor }}>{belt.name}</span>
                        <span className="text-[10px] tabular-nums text-muted-foreground">{beltPct}%</span>
                      </div>
                      <div className="h-1 rounded-full bg-muted overflow-hidden mt-0.5">
                        <div className="h-full" style={{ width: `${beltPct}%`, backgroundColor: belt.color }} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
