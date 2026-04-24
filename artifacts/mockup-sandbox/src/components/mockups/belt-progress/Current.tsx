import "./_group.css";
import { Check, Lock } from "lucide-react";
import { BELTS, TOTAL_DAYS, GROUPS_PER_DAY, makeWords, getSetStats } from "./_data";

const words = makeWords();

function ShurikenIcon({ size = 22, filled = true, color = "#3B82F6" }: { size?: number; filled?: boolean; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 2 L14.5 9.5 L22 12 L14.5 14.5 L12 22 L9.5 14.5 L2 12 L9.5 9.5 Z"
        fill={filled ? color : "none"} stroke={color} strokeWidth={filled ? 0 : 1.5} opacity={filled ? 1 : 0.35} />
    </svg>
  );
}

function FlagIcon({ label, done, active }: { label: string; done: boolean; active: boolean }) {
  const bg = done ? "#10B981" : active ? "#F97316" : "#FB923C";
  const opacity = done ? 1 : active ? 1 : 0.85;
  return (
    <div className="flex flex-col items-center gap-0.5" style={{ opacity }}>
      <div className="relative flex items-center justify-center rounded-sm text-white font-bold select-none"
        style={{ backgroundColor: bg, width: 30, height: 28, fontSize: 9, letterSpacing: "0.02em" }}>
        {done ? <Check size={11} strokeWidth={3} /> : label}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0"
          style={{ borderLeft: "6px solid transparent", borderRight: "6px solid transparent", borderTop: `6px solid ${bg}` }} />
      </div>
    </div>
  );
}

function BeltGiIcon({ color, size = 40 }: { color: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <rect x="4" y="2" width="32" height="36" rx="4" fill="#F3F4F6" stroke="#E5E7EB" strokeWidth="1" />
      <path d="M20 2 L12 14 L20 20 L28 14 Z" fill={color} opacity="0.8" />
      <rect x="12" y="18" width="16" height="4" rx="2" fill={color} />
    </svg>
  );
}

function CircularProgress({ pct, size = 110 }: { pct: number; size?: number }) {
  const r = (size - 12) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} stroke="#E5E7EB" strokeWidth="10" fill="none" />
        <circle cx={size / 2} cy={size / 2} r={r} stroke="#10B981" strokeWidth="10" fill="none"
          strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round" />
      </svg>
      <div className="absolute text-center">
        <div className="text-2xl font-bold text-foreground">{pct}%</div>
        <div className="text-[10px] text-muted-foreground leading-tight">Overall<br />Progress</div>
      </div>
    </div>
  );
}

const dayWords = Array.from({ length: TOTAL_DAYS }, (_, i) => words.filter((w) => w.day === i + 1));
const totalMastered = words.filter((w) => w.status === "mastered").length;
const totalWords = words.length;
const overallPct = Math.round((totalMastered / totalWords) * 100);
const missionsCompleted = dayWords.filter((dw) => dw.length > 0 && dw.every((w) => w.status === "mastered")).length;

const ACHIEVEMENTS = [
  { id: "a1", emoji: "📚", title: "500 Words Mastered", description: "Reach 500 mastered", unlocked: false },
  { id: "a2", emoji: "⭐", title: "2,500 XP", description: "Earn 2,500 XP", unlocked: false },
  { id: "a3", emoji: "🔥", title: "7 Day Streak", description: "Study 7 days in a row", unlocked: true },
  { id: "a4", emoji: "🔥", title: "14 Day Streak", description: "Study 14 days in a row", unlocked: false },
  { id: "a5", emoji: "🥋", title: "Black Belt", description: "Complete all belts", unlocked: false },
];

export function Current() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex gap-5 px-4 py-6">
        {/* Main belt table */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center mb-3 px-1">
            <div className="w-52 shrink-0">
              <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "#10B981" }}>
                {BELTS.length} BELTS
              </span>
            </div>
            <div className="flex-1">
              <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "#F97316" }}>
                {TOTAL_DAYS} MISSIONS
              </span>
            </div>
            <div className="w-36 shrink-0 text-right">
              <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "#3B82F6" }}>
                {TOTAL_DAYS * GROUPS_PER_DAY} SETS
              </span>
            </div>
          </div>

          <div className="space-y-3">
            {BELTS.map((belt, bIdx) => {
              const startDay = bIdx * 7 + 1;
              const endDay = Math.min(startDay + 6, TOTAL_DAYS);
              const missionDays = Array.from({ length: endDay - startDay + 1 }, (_, k) => startDay + k);
              const beltMastered = missionDays.reduce((acc, d) => acc + (dayWords[d - 1]?.filter((w) => w.status === "mastered").length ?? 0), 0);
              const beltTotal = missionDays.reduce((acc, d) => acc + (dayWords[d - 1]?.length ?? 0), 0);
              const setsForBelt: { done: boolean }[] = [];
              for (const d of missionDays) {
                for (let g = 1; g <= GROUPS_PER_DAY; g++) {
                  setsForBelt.push({ done: getSetStats(words, d, g).done });
                }
              }

              return (
                <div key={belt.num} className="rounded-2xl border border-border bg-card overflow-hidden">
                  <div className="flex items-center gap-3 p-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
                      style={{ backgroundColor: belt.color }}>
                      {belt.num}
                    </div>
                    <div className="shrink-0"><BeltGiIcon color={belt.color} size={38} /></div>
                    <div className="w-28 shrink-0">
                      <div className="font-bold text-sm">{belt.name}</div>
                      <div className="text-xs font-medium" style={{ color: belt.textColor }}>{belt.subtitle}</div>
                      <div className="text-[10px] text-muted-foreground leading-tight">{belt.desc}</div>
                    </div>
                    <div className="flex-1 flex items-end gap-1.5 flex-wrap">
                      {missionDays.map((day, i) => {
                        const dw = dayWords[day - 1] ?? [];
                        const mDone = dw.length > 0 && dw.every((w) => w.status === "mastered");
                        return (
                          <div key={day} className="flex flex-col items-center gap-1">
                            <FlagIcon label={`M${i + 1}`} done={mDone} active={!mDone} />
                            <div className="text-[8px] font-bold px-1 py-0.5 rounded bg-orange-100 text-orange-700 leading-none">TEST</div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="w-28 shrink-0 flex flex-col items-center gap-1">
                      <div className="flex flex-wrap justify-center gap-1">
                        {Array.from({ length: Math.min(setsForBelt.length, 6) }, (_, i) => (
                          <ShurikenIcon key={i} size={18} filled={setsForBelt[i]?.done} color="#3B82F6" />
                        ))}
                        {setsForBelt.length > 6 && (
                          <span className="text-[9px] text-muted-foreground">+{setsForBelt.length - 6}</span>
                        )}
                      </div>
                      <div className="text-[9px] text-muted-foreground">(10 words each)</div>
                    </div>
                    <div className="shrink-0 rounded-xl px-3 py-1.5 text-center ml-1"
                      style={{ backgroundColor: beltTotal === beltMastered && beltTotal > 0 ? "#ECFDF5" : "#FFF7ED" }}>
                      <div className="text-base font-extrabold tabular-nums"
                        style={{ color: beltTotal === beltMastered && beltTotal > 0 ? "#10B981" : "#F97316" }}>
                        {beltTotal}
                      </div>
                      <div className="text-[9px] font-semibold" style={{ color: "#F97316" }}>words</div>
                    </div>
                  </div>
                  {beltTotal > 0 && (
                    <div className="h-1 bg-muted">
                      <div className="h-full transition-all duration-500"
                        style={{ width: `${Math.round((beltMastered / beltTotal) * 100)}%`, backgroundColor: belt.color }} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right sidebar */}
        <div className="w-64 shrink-0 space-y-4">
          <div className="rounded-2xl border border-border bg-card p-4">
            <div className="font-bold mb-4">Your Progress</div>
            <div className="flex items-center justify-center mb-4">
              <CircularProgress pct={overallPct} size={110} />
            </div>
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-base">📗</span>
                  <span className="text-xs text-muted-foreground">Words Mastered</span>
                </div>
                <span className="text-xs font-bold tabular-nums">{totalMastered} / {totalWords.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-base">🚩</span>
                  <span className="text-xs text-muted-foreground">Missions Completed</span>
                </div>
                <span className="text-xs font-bold tabular-nums">{missionsCompleted} / {TOTAL_DAYS}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShurikenIcon size={16} color="#3B82F6" />
                  <span className="text-xs text-muted-foreground">Sets Completed</span>
                </div>
                <span className="text-xs font-bold tabular-nums">12 / {TOTAL_DAYS * GROUPS_PER_DAY}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-base">⭐</span>
                  <span className="text-xs text-muted-foreground">Total XP Earned</span>
                </div>
                <span className="text-xs font-bold tabular-nums">1,840</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="font-bold">Achievements</div>
              <button className="text-[11px] text-primary hover:underline">View all</button>
            </div>
            <div className="space-y-2">
              {ACHIEVEMENTS.map((ach) => (
                <div key={ach.id} className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-base"
                    style={{ backgroundColor: ach.unlocked ? "#FEF3C7" : "#F3F4F6" }}>
                    {ach.unlocked ? ach.emoji : <Lock size={13} className="text-muted-foreground" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold truncate">{ach.title}</div>
                    <div className="text-[10px] text-muted-foreground truncate">{ach.description}</div>
                  </div>
                  {ach.unlocked
                    ? <Check size={14} className="text-emerald-500 shrink-0" strokeWidth={2.5} />
                    : <Lock size={13} className="text-muted-foreground shrink-0" />}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-4 flex gap-3">
            <div className="w-14 h-14 shrink-0 rounded-xl bg-orange-100 flex items-center justify-center text-3xl">🥷</div>
            <div className="text-xs text-muted-foreground leading-relaxed">
              Every word you master is a step toward becoming unstoppable.{" "}
              <span className="font-semibold" style={{ color: "#F97316" }}>Keep training, Ninja! 🤙</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
