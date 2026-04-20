import { useMemo } from "react";
import { motion } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { getProgress, getDueWords, getDifficultWords } from "@/lib/srs";
import { TOTAL_DAYS, WORDS_PER_DAY } from "@/data/words";
import { BookOpen, Target, Flame, Brain, CheckCircle2, Clock, TrendingUp, Star } from "lucide-react";

interface DashboardProps {
  onNavigate: (page: string, params?: Record<string, unknown>) => void;
}

export default function Dashboard({ onNavigate }: DashboardProps) {
  const { words, streak } = useApp();
  const progress = useMemo(() => getProgress(words), [words]);
  const dueWords = useMemo(() => getDueWords(words), [words]);
  const difficultWords = useMemo(() => getDifficultWords(words), [words]);

  const dayProgress = useMemo(() => {
    return Array.from({ length: TOTAL_DAYS }, (_, i) => {
      const day = i + 1;
      const dayWords = words.filter((w) => w.day === day);
      const mastered = dayWords.filter((w) => w.status === "mastered").length;
      const learning = dayWords.filter((w) => w.status === "learning").length;
      return {
        day,
        total: dayWords.length,
        mastered,
        learning,
        pct: Math.round(((mastered + learning) / dayWords.length) * 100),
      };
    });
  }, [words]);

  const stats = [
    {
      icon: <Brain size={20} />,
      label: "Words Learned",
      value: progress.known,
      max: progress.total,
      color: "text-violet-500",
      bg: "bg-violet-50 dark:bg-violet-900/20",
    },
    {
      icon: <Star size={20} />,
      label: "Mastered",
      value: progress.mastered,
      max: progress.total,
      color: "text-amber-500",
      bg: "bg-amber-50 dark:bg-amber-900/20",
    },
    {
      icon: <Target size={20} />,
      label: "Accuracy",
      value: `${progress.accuracy}%`,
      color: "text-green-500",
      bg: "bg-green-50 dark:bg-green-900/20",
    },
    {
      icon: <Flame size={20} />,
      label: "Streak",
      value: `${streak.currentStreak}d`,
      color: "text-orange-500",
      bg: "bg-orange-50 dark:bg-orange-900/20",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Welcome */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-foreground mb-1">GRE Vocabulary</h1>
        <p className="text-muted-foreground">Master {progress.total} words through spaced repetition</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="bg-card border border-card-border rounded-2xl p-4 shadow-sm"
          >
            <div className={`inline-flex p-2 rounded-xl ${s.bg} ${s.color} mb-3`}>{s.icon}</div>
            <div className="text-2xl font-bold text-foreground">
              {typeof s.value === "number" ? s.value : s.value}
            </div>
            {s.max && (
              <div className="text-xs text-muted-foreground mb-1">of {s.max}</div>
            )}
            <div className="text-xs text-muted-foreground">{s.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <motion.button
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          onClick={() => onNavigate("study")}
          className="flex items-center gap-3 p-5 bg-primary text-primary-foreground rounded-2xl shadow-sm hover:opacity-90 transition-opacity text-left"
        >
          <BookOpen size={22} />
          <div>
            <div className="font-semibold">Study Mode</div>
            <div className="text-xs opacity-80">Browse & flip cards</div>
          </div>
        </motion.button>

        <motion.button
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15 }}
          onClick={() => onNavigate("practice")}
          className="flex items-center gap-3 p-5 bg-card border border-card-border rounded-2xl shadow-sm hover:bg-accent/30 transition-colors text-left"
        >
          <Target size={22} className="text-primary" />
          <div>
            <div className="font-semibold text-foreground">Practice Mode</div>
            <div className="text-xs text-muted-foreground">Test your knowledge</div>
          </div>
        </motion.button>

        <motion.button
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          onClick={() => dueWords.length > 0 && onNavigate("review")}
          className={`flex items-center gap-3 p-5 rounded-2xl shadow-sm text-left border transition-colors ${
            dueWords.length > 0
              ? "bg-card border-amber-200 dark:border-amber-800 hover:bg-amber-50 dark:hover:bg-amber-900/20 cursor-pointer"
              : "bg-card border-card-border opacity-50 cursor-default"
          }`}
        >
          <Clock size={22} className="text-amber-500" />
          <div>
            <div className="font-semibold text-foreground">
              Daily Review
              {dueWords.length > 0 && (
                <span className="ml-2 text-xs bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400 px-1.5 py-0.5 rounded-full">
                  {dueWords.length}
                </span>
              )}
            </div>
            <div className="text-xs text-muted-foreground">
              {dueWords.length > 0 ? `${dueWords.length} words due` : "All caught up!"}
            </div>
          </div>
        </motion.button>
      </div>

      {/* Difficult Words */}
      {difficultWords.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <TrendingUp size={18} className="text-red-500" />
              Difficult Words
            </h2>
            <button
              onClick={() => onNavigate("practice", { source: "difficult" })}
              className="text-sm text-primary hover:underline"
            >
              Practice these
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {difficultWords.slice(0, 10).map((w) => (
              <span
                key={w.id}
                className="text-sm px-3 py-1.5 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-full border border-red-200 dark:border-red-800 font-medium"
              >
                {w.word}
              </span>
            ))}
            {difficultWords.length > 10 && (
              <span className="text-sm px-3 py-1.5 text-muted-foreground">
                +{difficultWords.length - 10} more
              </span>
            )}
          </div>
        </motion.div>
      )}

      {/* Day Progress */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-lg font-semibold text-foreground mb-4">Progress by Day</h2>
        <div className="space-y-3">
          {dayProgress.map((d) => (
            <div
              key={d.day}
              className="bg-card border border-card-border rounded-xl p-4 cursor-pointer hover:border-primary/30 transition-colors"
              onClick={() => onNavigate("study", { day: d.day })}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-foreground">Day {d.day}</span>
                  {d.pct === 100 && <CheckCircle2 size={14} className="text-green-500" />}
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span>{d.mastered} mastered</span>
                  <span>{d.learning} learning</span>
                  <span className="font-semibold text-foreground">{d.pct}%</span>
                </div>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-violet-400"
                  initial={{ width: 0 }}
                  animate={{ width: `${d.pct}%` }}
                  transition={{ duration: 0.8, delay: 0.4 + d.day * 0.05 }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
