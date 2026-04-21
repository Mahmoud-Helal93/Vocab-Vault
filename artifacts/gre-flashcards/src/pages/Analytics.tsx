import { useMemo } from "react";
import { motion } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { loadSessions } from "@/lib/storage";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell,
} from "recharts";
import { ArrowLeft, BarChart3, Brain, Target, Flame } from "lucide-react";

interface AnalyticsProps {
  onBack: () => void;
  onStudyWord?: (wordId: string) => void;
}

const ERROR_COLORS: Record<string, string> = {
  confused_with: "#f97316",
  spelling: "#a855f7",
  wrong_definition: "#3b82f6",
  wrong_pos: "#06b6d4",
  context: "#eab308",
};

const QT_LABELS: Record<string, string> = {
  mc: "Multiple Choice",
  fb: "Fill in Blank",
  tf: "True / False",
  cloze: "Cloze",
};

export default function Analytics({ onBack, onStudyWord }: AnalyticsProps) {
  const { words, streak } = useApp();
  const sessions = useMemo(() => loadSessions(), []);

  // Daily accuracy (last 30 days)
  const dailyAccuracy = useMemo(() => {
    const map = new Map<string, { correct: number; total: number }>();
    const now = Date.now();
    sessions
      .filter((s) => now - new Date(s.date).getTime() < 30 * 86400000)
      .forEach((s) => {
        const day = new Date(s.date).toLocaleDateString("en-US", { month: "short", day: "numeric" });
        const existing = map.get(day) ?? { correct: 0, total: 0 };
        const correct = s.wordsReviewed.length - s.mistakes.length;
        map.set(day, {
          correct: existing.correct + correct,
          total: existing.total + s.wordsReviewed.length,
        });
      });
    return Array.from(map.entries())
      .slice(-30)
      .map(([date, { correct, total }]) => ({
        date,
        accuracy: total > 0 ? Math.round((correct / total) * 100) : 0,
      }));
  }, [sessions]);

  // Error type breakdown
  const errorBreakdown = useMemo(() => {
    const counts: Record<string, number> = {};
    sessions.forEach((s) =>
      s.mistakes.forEach((m) => {
        counts[m.errorType] = (counts[m.errorType] ?? 0) + 1;
      })
    );
    return Object.entries(counts)
      .map(([type, count]) => ({ type, count }))
      .sort((a, b) => b.count - a.count);
  }, [sessions]);

  // Question type accuracy
  const qtAccuracy = useMemo(() => {
    const map: Record<string, { correct: number; total: number }> = {};
    sessions.forEach((s) => {
      s.wordsReviewed.forEach(() => {
        // We'd need per-question type tracking; approximate from mistakes
      });
      s.mistakes.forEach((m) => {
        const t = m.questionType;
        if (!map[t]) map[t] = { correct: 0, total: 0 };
        map[t].total += 1;
      });
    });
    // Also count corrects from session accuracy
    return Object.entries(QT_LABELS).map(([qt, label]) => {
      const mistakeCount = sessions.reduce(
        (sum, s) => sum + s.mistakes.filter((m) => m.questionType === qt).length, 0
      );
      const total = sessions.reduce((sum, s) => sum + Math.ceil(s.wordsReviewed.length / 4), 0);
      const accuracy = total > 0 ? Math.round(((total - mistakeCount) / total) * 100) : 0;
      return { qt, label, accuracy, mistakes: mistakeCount };
    });
  }, [sessions]);

  // Hardest words
  const hardestWords = useMemo(() => {
    return words
      .filter((w) => w.correctCount + w.incorrectCount > 0)
      .map((w) => {
        const total = w.correctCount + w.incorrectCount;
        const accuracy = Math.round((w.correctCount / total) * 100);
        return { word: w, total, accuracy };
      })
      .sort((a, b) => a.accuracy - b.accuracy)
      .slice(0, 15);
  }, [words]);

  // Auto insight
  const insight = useMemo(() => {
    if (errorBreakdown.length === 0) return null;
    const dominant = errorBreakdown[0];
    const dayMap: Record<number, number> = {};
    sessions.forEach((s) => {
      const dow = new Date(s.date).getDay();
      dayMap[dow] = (dayMap[dow] ?? 0) + s.mistakes.length;
    });
    const worstDay = Object.entries(dayMap).sort(([, a], [, b]) => b - a)[0];
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const worstDayName = worstDay ? dayNames[parseInt(worstDay[0])] : null;
    const errorLabels: Record<string, string> = {
      confused_with: "confusing similar-looking words",
      spelling: "spelling errors in fill-in-blank",
      wrong_definition: "incorrect definitions on MC questions",
      wrong_pos: "misidentifying part of speech",
      context: "word usage in context (cloze)",
    };
    const errorLabel = errorLabels[dominant.type] ?? dominant.type;
    return `You make most mistakes from ${errorLabel}${worstDayName ? `, especially on ${worstDayName}s` : ""}. Focus on definitions and context usage.`;
  }, [errorBreakdown, sessions]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <button onClick={onBack} className="p-2 rounded-xl hover:bg-muted transition-colors">
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <BarChart3 size={22} className="text-primary" />
            Analytics
          </h1>
          <p className="text-muted-foreground text-sm">Your learning patterns</p>
        </div>
      </div>

      {/* Insight callout */}
      {insight && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="mb-6 p-4 rounded-xl bg-primary/5 border border-primary/20 flex items-start gap-3"
        >
          <Brain size={18} className="text-primary shrink-0 mt-0.5" />
          <p className="text-sm text-foreground">{insight}</p>
        </motion.div>
      )}

      {/* Streak cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Current Streak", value: `${streak.currentStreak}d`, icon: <Flame size={18} className="text-orange-500" /> },
          { label: "Best Streak", value: `${streak.longestStreak}d`, icon: <Flame size={18} className="text-red-500" /> },
          { label: "Total Sessions", value: streak.totalSessions, icon: <Target size={18} className="text-blue-500" /> },
          { label: "Sessions Tracked", value: sessions.length, icon: <BarChart3 size={18} className="text-violet-500" /> },
        ].map((stat) => (
          <div key={stat.label} className="bg-card border border-card-border rounded-xl p-4">
            <div className="flex items-center gap-1.5 mb-2">{stat.icon}</div>
            <div className="text-2xl font-bold text-foreground">{stat.value}</div>
            <div className="text-xs text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Question type accuracy */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {qtAccuracy.map((qt) => (
          <div key={qt.qt} className="bg-card border border-card-border rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-foreground mb-1">{qt.accuracy}%</div>
            <div className="text-xs font-semibold text-foreground">{qt.label}</div>
            <div className="text-xs text-muted-foreground">{qt.mistakes} mistakes</div>
          </div>
        ))}
      </div>

      {/* Accuracy over time */}
      <div className="bg-card border border-card-border rounded-2xl p-5 mb-6">
        <h2 className="font-semibold text-foreground mb-4">Accuracy Over Time (30 days)</h2>
        {dailyAccuracy.length > 0 ? (
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={dailyAccuracy}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="date" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis domain={[0, 100]} tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }}
                formatter={(v: number) => [`${v}%`, "Accuracy"]}
              />
              <Line type="monotone" dataKey="accuracy" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-48 flex items-center justify-center text-muted-foreground text-sm">
            Practice more to see your accuracy trend
          </div>
        )}
      </div>

      {/* Error type breakdown */}
      {errorBreakdown.length > 0 && (
        <div className="bg-card border border-card-border rounded-2xl p-5 mb-6">
          <h2 className="font-semibold text-foreground mb-4">Error Type Breakdown</h2>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={errorBreakdown} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis dataKey="type" type="category" tick={{ fontSize: 10 }} width={100} stroke="hsl(var(--muted-foreground))" />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
              <Bar dataKey="count" radius={4}>
                {errorBreakdown.map((entry) => (
                  <Cell key={entry.type} fill={ERROR_COLORS[entry.type] ?? "#6366f1"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Hardest words */}
      {hardestWords.length > 0 && (
        <div className="bg-card border border-card-border rounded-2xl p-5">
          <h2 className="font-semibold text-foreground mb-4">Hardest Words (by accuracy)</h2>
          <div className="space-y-2">
            {hardestWords.map(({ word, total, accuracy }, i) => (
              <div key={word.id} className="flex items-center gap-3 py-2 border-b border-border last:border-0">
                <span className="text-xs text-muted-foreground w-5">{i + 1}</span>
                <span className="font-medium text-foreground flex-1">{word.word}</span>
                <span className="text-xs text-muted-foreground">{total} attempts</span>
                <span className={`text-sm font-semibold w-12 text-right ${accuracy < 50 ? "text-red-500" : accuracy < 75 ? "text-amber-500" : "text-green-500"}`}>
                  {accuracy}%
                </span>
                {onStudyWord && (
                  <button
                    onClick={() => onStudyWord(word.id)}
                    className="text-xs px-2 py-1 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                  >
                    Study
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {sessions.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <BarChart3 size={48} className="mx-auto mb-4 opacity-30" />
          <p>Complete practice sessions to see analytics here.</p>
        </div>
      )}
    </div>
  );
}
