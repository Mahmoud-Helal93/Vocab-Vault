import { useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Trophy, Flame, Sparkles, Star } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { BADGES, levelFromXp } from "@/lib/gamification";

interface AchievementsProps {
  onBack: () => void;
}

const CATEGORY_LABEL: Record<string, string> = {
  milestone: "Milestones",
  streak: "Streak",
  skill: "Skill",
  explorer: "Explorer",
};

export default function Achievements({ onBack }: AchievementsProps) {
  const { gamification, streak } = useApp();
  const lvl = useMemo(() => levelFromXp(gamification.totalXp), [gamification.totalXp]);

  const grouped = useMemo(() => {
    const out: Record<string, typeof BADGES> = {};
    for (const b of BADGES) (out[b.category] ||= []).push(b);
    return out;
  }, []);

  const earnedCount = Object.keys(gamification.badges).length;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="p-2 rounded-xl hover:bg-muted transition-colors">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold">Achievements</h1>
      </div>

      {/* Top stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        <StatCard icon={<Star className="text-amber-500" size={20} />} label="Level" value={String(lvl.level)} />
        <StatCard icon={<Sparkles className="text-violet-500" size={20} />} label="Total XP" value={gamification.totalXp.toLocaleString()} />
        <StatCard icon={<Flame className="text-orange-500" size={20} />} label="Streak" value={`${streak.currentStreak}d`} subtle={`Best ${streak.longestStreak}d`} />
        <StatCard icon={<Trophy className="text-yellow-500" size={20} />} label="Badges" value={`${earnedCount}/${BADGES.length}`} />
      </div>

      {/* Level progress */}
      <div className="mb-8 p-4 rounded-2xl bg-card border border-border">
        <div className="flex items-end justify-between mb-2">
          <div>
            <div className="text-xs uppercase tracking-wide text-muted-foreground">Progress to Level {lvl.level + 1}</div>
            <div className="text-lg font-semibold">{lvl.xpInLevel} / {lvl.xpForNext} XP</div>
          </div>
          <div className="text-2xl">⭐</div>
        </div>
        <div className="h-3 rounded-full bg-muted overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(100, lvl.progress * 100)}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-amber-500"
          />
        </div>
      </div>

      {/* Badges grouped */}
      {Object.entries(grouped).map(([cat, list]) => (
        <div key={cat} className="mb-8">
          <h2 className="text-sm font-bold uppercase tracking-wide text-muted-foreground mb-3">{CATEGORY_LABEL[cat] ?? cat}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {list.map((b) => {
              const earnedAt = gamification.badges[b.id];
              const earned = !!earnedAt;
              return (
                <motion.div
                  key={b.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-2xl border ${
                    earned
                      ? "bg-gradient-to-br from-amber-50 to-yellow-100 dark:from-amber-900/30 dark:to-yellow-900/20 border-amber-200 dark:border-amber-800"
                      : "bg-card border-border opacity-60"
                  }`}
                >
                  <div className={`text-3xl mb-2 ${earned ? "" : "grayscale"}`}>{b.emoji}</div>
                  <div className="font-bold text-sm">{b.title}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{b.description}</div>
                  {earned && (
                    <div className="text-[10px] mt-2 text-amber-700 dark:text-amber-400 font-semibold">
                      EARNED · {new Date(earnedAt).toLocaleDateString()}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

function StatCard({ icon, label, value, subtle }: { icon: React.ReactNode; label: string; value: string; subtle?: string }) {
  return (
    <div className="p-4 rounded-2xl bg-card border border-border">
      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
        {icon} {label}
      </div>
      <div className="text-2xl font-bold">{value}</div>
      {subtle && <div className="text-[10px] text-muted-foreground mt-0.5">{subtle}</div>}
    </div>
  );
}
