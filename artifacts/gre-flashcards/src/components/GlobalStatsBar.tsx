import { useMemo } from "react";
import { Flame } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { TOTAL_DAYS, GROUPS_PER_DAY } from "@/data/words";
import { levelFromXp } from "@/lib/gamification";

function ShurikenIcon({ size = 22, color = "#3B82F6" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2 L14.5 9.5 L22 12 L14.5 14.5 L12 22 L9.5 14.5 L2 12 L9.5 9.5 Z"
        fill={color}
      />
    </svg>
  );
}

interface Props {
  onNavigate?: (page: string, params?: Record<string, unknown>) => void;
}

export default function GlobalStatsBar({ onNavigate }: Props) {
  const { words, streak, gamification } = useApp();

  const totalMastered = useMemo(
    () => words.filter((w) => w.status === "mastered").length,
    [words]
  );

  const missionsCompleted = useMemo(() => {
    let count = 0;
    for (let d = 1; d <= TOTAL_DAYS; d++) {
      const dw = words.filter((w) => w.day === d);
      if (dw.length > 0 && dw.every((w) => w.status === "mastered")) count++;
    }
    return count;
  }, [words]);

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

  const lvl = levelFromXp(gamification.totalXp);
  const pct = Math.round(lvl.progress * 100);

  return (
    <div className="rounded-2xl border border-border bg-card px-5 py-3 mb-5 flex items-center justify-between flex-wrap gap-4">
      <button
        onClick={() => onNavigate?.("progress")}
        className="flex items-center gap-3 px-2 py-1 rounded-lg hover:bg-muted transition-colors"
      >
        <span className="text-2xl">📗</span>
        <div className="text-left">
          <div className="text-base font-bold text-emerald-600 tabular-nums leading-none">
            {totalMastered.toLocaleString()}
          </div>
          <div className="text-[11px] text-muted-foreground mt-0.5">Words Learned</div>
        </div>
      </button>
      <button
        onClick={() => onNavigate?.("progress")}
        className="flex items-center gap-3 px-2 py-1 rounded-lg hover:bg-muted transition-colors"
      >
        <span className="text-2xl">🚩</span>
        <div className="text-left">
          <div className="text-base font-bold tabular-nums leading-none">
            <span className="text-orange-500">{missionsCompleted}</span>
            <span className="text-muted-foreground"> / {TOTAL_DAYS}</span>
          </div>
          <div className="text-[11px] text-muted-foreground mt-0.5">Missions Done</div>
        </div>
      </button>
      <button
        onClick={() => onNavigate?.("progress")}
        className="flex items-center gap-3 px-2 py-1 rounded-lg hover:bg-muted transition-colors"
      >
        <ShurikenIcon size={26} color="#3B82F6" />
        <div className="text-left">
          <div className="text-base font-bold tabular-nums leading-none">
            <span className="text-blue-500">{setsCompleted}</span>
            <span className="text-muted-foreground"> / {TOTAL_DAYS * GROUPS_PER_DAY}</span>
          </div>
          <div className="text-[11px] text-muted-foreground mt-0.5">Sets Completed</div>
        </div>
      </button>
      <button
        onClick={() => onNavigate?.("achievements")}
        className="flex items-center gap-3 px-2 py-1 rounded-lg hover:bg-muted transition-colors"
        title={`Level ${lvl.level} · ${lvl.xpInLevel}/${lvl.xpForNext} XP to next level`}
      >
        <div className="relative w-9 h-9 shrink-0">
          <svg width="36" height="36" viewBox="0 0 36 36" className="-rotate-90">
            <circle cx="18" cy="18" r="15" fill="none" stroke="#E5E7EB" strokeWidth="3" />
            <circle
              cx="18" cy="18" r="15" fill="none"
              stroke="#8B5CF6" strokeWidth="3" strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 15}
              strokeDashoffset={2 * Math.PI * 15 * (1 - lvl.progress)}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 text-white flex items-center justify-center text-[9px] font-extrabold">
              {lvl.level}
            </div>
          </div>
        </div>
        <div className="text-left">
          <div className="text-base font-bold text-foreground tabular-nums leading-none">
            {gamification.totalXp.toLocaleString()}
          </div>
          <div className="text-[11px] text-muted-foreground mt-0.5">
            XP Earned · Lv {lvl.level} ({pct}%)
          </div>
        </div>
      </button>
      <button
        onClick={() => onNavigate?.("achievements")}
        className="flex items-center gap-3 px-2 py-1 rounded-lg hover:bg-muted transition-colors"
      >
        <Flame size={24} className="text-orange-500" />
        <div className="text-left">
          <div className="text-base font-bold text-orange-500 tabular-nums leading-none">
            {streak.currentStreak}
          </div>
          <div className="text-[11px] text-muted-foreground mt-0.5">Day Streak</div>
        </div>
      </button>
    </div>
  );
}
