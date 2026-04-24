import { useMemo } from "react";
import { Check, Lock } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { TOTAL_DAYS, GROUPS_PER_DAY } from "@/data/words";
import { BADGES } from "@/lib/gamification";

function ShurikenIcon({ size = 16, filled = true, color = "#3B82F6" }: { size?: number; filled?: boolean; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2 L14.5 9.5 L22 12 L14.5 14.5 L12 22 L9.5 14.5 L2 12 L9.5 9.5 Z"
        fill={filled ? color : "none"}
        stroke={color}
        strokeWidth={filled ? 0 : 1.5}
        opacity={filled ? 1 : 0.35}
      />
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
        <circle
          cx={size / 2} cy={size / 2} r={r}
          stroke="#10B981" strokeWidth="10" fill="none"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute text-center">
        <div className="text-2xl font-bold text-foreground">{pct}%</div>
        <div className="text-[10px] text-muted-foreground leading-tight">Overall<br/>Progress</div>
      </div>
    </div>
  );
}

export default function ProgressSidebar({ className = "" }: { className?: string }) {
  const { words, gamification } = useApp();

  const totalMastered = useMemo(() => words.filter((w) => w.status === "mastered").length, [words]);
  const totalWords = words.length;
  const overallPct = totalWords > 0 ? Math.round((totalMastered / totalWords) * 100) : 0;

  const dayWords = useMemo(
    () => Array.from({ length: TOTAL_DAYS }, (_, i) => words.filter((w) => w.day === i + 1)),
    [words]
  );

  const missionsCompleted = useMemo(() => {
    return Array.from({ length: TOTAL_DAYS }, (_, i) => {
      const dw = dayWords[i];
      return dw.length > 0 && dw.every((w) => w.status === "mastered");
    }).filter(Boolean).length;
  }, [dayWords]);

  const setsCompleted = useMemo(() => {
    let count = 0;
    for (let d = 1; d <= TOTAL_DAYS; d++) {
      for (let g = 1; g <= GROUPS_PER_DAY; g++) {
        const gw = words.filter((w) => w.day === d && w.group === g);
        if (gw.length > 0 && gw.every((w) => w.status === "mastered")) count++;
      }
    }
    return count;
  }, [words]);

  const allBeltsComplete = missionsCompleted === TOTAL_DAYS;

  const sidebarAchievements = useMemo(() => {
    const ids = ["five_hundred_mastered", "xp_2500", "streak_7", "streak_14"];
    const shown = ids.map((id) => {
      const def = BADGES.find((b) => b.id === id);
      if (!def) return null;
      return { ...def, unlocked: !!gamification.badges[id] };
    }).filter(Boolean);
    shown.push({ id: "black_belt_custom", emoji: "🥋", title: "Black Belt", description: "Complete all belts", unlocked: allBeltsComplete, category: "milestone", check: () => false } as any);
    return shown;
  }, [gamification.badges, allBeltsComplete]);

  return (
    <div className={`w-64 shrink-0 space-y-4 ${className}`}>
      <div className="rounded-2xl border border-border bg-card p-4">
        <div className="font-bold text-foreground mb-4">Your Progress</div>
        <div className="flex items-center justify-center mb-4">
          <CircularProgress pct={overallPct} size={110} />
        </div>
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-base">📗</span>
              <span className="text-xs text-muted-foreground">Words Mastered</span>
            </div>
            <span className="text-xs font-bold text-foreground tabular-nums">
              {totalMastered.toLocaleString()} / {totalWords.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-base">🚩</span>
              <span className="text-xs text-muted-foreground">Missions Completed</span>
            </div>
            <span className="text-xs font-bold text-foreground tabular-nums">
              {missionsCompleted} / {TOTAL_DAYS}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShurikenIcon size={16} color="#3B82F6" />
              <span className="text-xs text-muted-foreground">Sets Completed</span>
            </div>
            <span className="text-xs font-bold text-foreground tabular-nums">
              {setsCompleted} / {TOTAL_DAYS * GROUPS_PER_DAY}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-base">⭐</span>
              <span className="text-xs text-muted-foreground">Total XP Earned</span>
            </div>
            <span className="text-xs font-bold text-foreground tabular-nums">
              {gamification.totalXp.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="font-bold text-foreground">Achievements</div>
          <button className="text-[11px] text-primary hover:underline">View all</button>
        </div>
        <div className="space-y-2">
          {sidebarAchievements.map((ach: any) => (
            <div key={ach.id} className="flex items-center gap-2.5">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-base"
                style={{ backgroundColor: ach.unlocked ? "#FEF3C7" : "#F3F4F6" }}
              >
                {ach.unlocked ? ach.emoji : <Lock size={13} className="text-muted-foreground" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold text-foreground truncate">{ach.title}</div>
                <div className="text-[10px] text-muted-foreground truncate">{ach.description}</div>
              </div>
              {ach.unlocked ? (
                <Check size={14} className="text-emerald-500 shrink-0" strokeWidth={2.5} />
              ) : (
                <Lock size={13} className="text-muted-foreground shrink-0" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
