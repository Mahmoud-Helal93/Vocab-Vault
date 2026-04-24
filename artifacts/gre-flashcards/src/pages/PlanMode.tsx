import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { getProgress, getDueWords, applyCrunchMode } from "@/lib/srs";
import { saveWords } from "@/lib/storage";
import {
  CalendarDays, Target, Clock, TrendingUp, AlertTriangle, CheckCircle2,
  Zap, ArrowLeft,
} from "lucide-react";

interface PlanModeProps {
  onBack: () => void;
  onStartSession: () => void;
}

export default function PlanMode({ onBack, onStartSession }: PlanModeProps) {
  const { words, plan, updatePlan, crunch, updateCrunch, setWords } = useApp();
  const progress = useMemo(() => getProgress(words), [words]);
  const dueWords = useMemo(() => getDueWords(words), [words]);
  const [showCrunchConfirm, setShowCrunchConfirm] = useState(false);

  // --- Calculations ---
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const daysRemaining = useMemo(() => {
    if (!plan.examDate) return null;
    const exam = new Date(plan.examDate);
    exam.setHours(0, 0, 0, 0);
    const diff = Math.ceil((exam.getTime() - today.getTime()) / 86400000);
    return diff;
  }, [plan.examDate]);

  const wordsRemaining = progress.total - progress.mastered;
  const newWordsToday = useMemo(() => {
    if (crunch.active) return 0;
    if (!daysRemaining || daysRemaining <= 0) return 0;
    const rawQuota = Math.ceil(wordsRemaining / daysRemaining);
    const deficit = plan.deficitDays > 0
      ? Math.ceil(wordsRemaining * 0.1 / 3)
      : 0;
    return Math.min(rawQuota + deficit, 50);
  }, [daysRemaining, wordsRemaining, plan.deficitDays, crunch.active]);

  const estimatedMinutes = useMemo(() => {
    const newSecs = newWordsToday * 45;
    const reviewSecs = dueWords.length * 20;
    return Math.ceil((newSecs + reviewSecs) / 60);
  }, [newWordsToday, dueWords.length]);

  const planStatus = useMemo(() => {
    if (!daysRemaining) return null;
    if (daysRemaining <= 0) return { label: "Exam Day!", color: "text-red-500", bg: "bg-red-50 dark:bg-red-900/20" };
    const needed = Math.ceil(wordsRemaining / daysRemaining);
    const target = plan.targetWordsPerDay ?? needed;
    if (needed <= target * 0.9) return { label: "Ahead", color: "text-green-600", bg: "bg-green-50 dark:bg-green-900/20" };
    if (needed <= target * 1.1) return { label: "On Track", color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-900/20" };
    return { label: "Behind", color: "text-red-600", bg: "bg-red-50 dark:bg-red-900/20" };
  }, [daysRemaining, wordsRemaining, plan.targetWordsPerDay]);

  const showCrunchBanner = daysRemaining !== null && daysRemaining <= 14 && daysRemaining > 0;
  const autoTarget = daysRemaining ? Math.ceil(wordsRemaining / daysRemaining) : 10;

  const handleActivateCrunch = () => {
    const compressed = applyCrunchMode(words);
    setWords(compressed);
    saveWords(compressed);
    updateCrunch({ active: true, activatedAt: new Date().toISOString() });
    setShowCrunchConfirm(false);
  };

  const handleDeactivateCrunch = () => {
    updateCrunch({ active: false, activatedAt: null });
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <button onClick={onBack} className="p-2 rounded-xl hover:bg-muted transition-colors">
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <CalendarDays size={22} className="text-primary" />
            Study Plan
          </h1>
          <p className="text-muted-foreground text-sm">Adaptive daily planner</p>
        </div>
        {crunch.active && (
          <span className="ml-auto text-xs font-bold bg-red-500 text-white px-3 py-1.5 rounded-full animate-pulse">
            CRUNCH MODE
          </span>
        )}
      </div>

      {/* Missed day banner */}
      {plan.deficitDays > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="mb-4 p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 flex items-start gap-3"
        >
          <AlertTriangle size={18} className="text-amber-500 shrink-0 mt-0.5" />
          <p className="text-sm text-amber-700 dark:text-amber-400">
            You missed {plan.deficitDays} day{plan.deficitDays > 1 ? "s" : ""} — deficit redistributed over the next 3 days.
          </p>
        </motion.div>
      )}

      {/* Crunch Mode Banner */}
      {showCrunchBanner && !crunch.active && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="mb-4 p-4 rounded-xl bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-300 dark:border-yellow-700 flex items-center justify-between gap-3"
        >
          <div className="flex items-start gap-3">
            <Zap size={18} className="text-yellow-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-yellow-700 dark:text-yellow-400">
                Crunch Mode available — {daysRemaining} days remaining
              </p>
              <p className="text-xs text-yellow-600/80 dark:text-yellow-500/80 mt-0.5">
                Compresses review intervals and focuses only on weak words.
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowCrunchConfirm(true)}
            className="shrink-0 px-3 py-1.5 rounded-lg bg-yellow-500 text-white text-xs font-semibold hover:bg-yellow-600 transition-colors"
          >
            Activate
          </button>
        </motion.div>
      )}

      {showCrunchConfirm && (
        <div className="mb-4 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-700">
          <p className="text-sm font-semibold text-red-700 dark:text-red-400 mb-3">
            Activating Crunch Mode will compress all review intervals by 50% and stop new word introductions. This cannot be undone automatically.
          </p>
          <div className="flex gap-2">
            <button onClick={handleActivateCrunch} className="px-4 py-2 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600">
              Confirm
            </button>
            <button onClick={() => setShowCrunchConfirm(false)} className="px-4 py-2 rounded-lg border border-card-border text-sm font-medium hover:bg-muted">
              Cancel
            </button>
          </div>
        </div>
      )}

      {crunch.active && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-700 flex items-center justify-between">
          <div>
            <p className="font-semibold text-red-700 dark:text-red-400 text-sm">Crunch Mode Active</p>
            <p className="text-xs text-red-600/70 dark:text-red-500/70 mt-0.5">Fill-in-blank only · No new words · Weakest first</p>
          </div>
          <button onClick={handleDeactivateCrunch} className="px-3 py-1.5 rounded-lg border border-red-300 dark:border-red-700 text-red-600 dark:text-red-400 text-xs font-medium hover:bg-red-100 dark:hover:bg-red-900/30">
            Deactivate
          </button>
        </div>
      )}

      {/* Config inputs */}
      <div className="space-y-4 mb-6">
        <div className="bg-card border border-card-border rounded-xl p-4">
          <label className="block text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
            <CalendarDays size={16} className="text-primary" />
            Exam Date
          </label>
          <input
            type="date"
            value={plan.examDate ?? ""}
            onChange={(e) => {
              const newDate = e.target.value;
              updatePlan({ examDate: newDate || null });
              // Check if crunch should auto-deactivate
              if (newDate) {
                const newDays = Math.ceil((new Date(newDate).getTime() - Date.now()) / 86400000);
                if (newDays > 14 && crunch.active) handleDeactivateCrunch();
              }
            }}
            className="w-full px-3 py-2 rounded-lg border border-card-border bg-background text-foreground outline-none focus:border-primary"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-card border border-card-border rounded-xl p-4">
            <label className="block text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
              <Clock size={16} className="text-primary" />
              Session Length
            </label>
            <select
              value={plan.sessionLengthMinutes}
              onChange={(e) => updatePlan({ sessionLengthMinutes: parseInt(e.target.value) })}
              className="w-full px-3 py-2 rounded-lg border border-card-border bg-background text-foreground outline-none focus:border-primary"
            >
              {[15, 20, 30, 45, 60, 90].map((m) => (
                <option key={m} value={m}>{m} min</option>
              ))}
            </select>
          </div>

          <div className="bg-card border border-card-border rounded-xl p-4">
            <label className="block text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
              <Target size={16} className="text-primary" />
              Daily Start
            </label>
            <select
              value={plan.dailyStartTime}
              onChange={(e) => updatePlan({ dailyStartTime: e.target.value as "morning" | "afternoon" | "evening" })}
              className="w-full px-3 py-2 rounded-lg border border-card-border bg-background text-foreground outline-none focus:border-primary"
            >
              <option value="morning">Morning</option>
              <option value="afternoon">Afternoon</option>
              <option value="evening">Evening</option>
            </select>
          </div>
        </div>
      </div>

      {/* Auto-calculated stats */}
      {plan.examDate && daysRemaining !== null && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-3">Today's Plan</h2>
          <div className="grid grid-cols-2 gap-3 mb-4">
            {[
              { label: "Days Remaining", value: Math.max(daysRemaining, 0), icon: <CalendarDays size={16} />, color: "text-blue-500" },
              { label: "Words Remaining", value: wordsRemaining, icon: <Target size={16} />, color: "text-orange-500" },
              { label: "New Words Today", value: crunch.active ? 0 : newWordsToday, icon: <TrendingUp size={16} />, color: "text-green-500" },
              { label: "Reviews Due", value: dueWords.length, icon: <Clock size={16} />, color: "text-amber-500" },
            ].map((stat) => (
              <div key={stat.label} className="bg-card border border-card-border rounded-xl p-4">
                <div className={`flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest mb-1 ${stat.color}`}>
                  {stat.icon} {stat.label}
                </div>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between bg-card border border-card-border rounded-xl p-4 mb-4">
            <div>
              <div className="text-sm font-semibold text-foreground">Estimated Session</div>
              <div className="text-xs text-muted-foreground">
                {newWordsToday} new × 45s + {dueWords.length} reviews × 20s
              </div>
            </div>
            <div className="text-xl font-bold text-primary">~{estimatedMinutes} min</div>
          </div>

          {planStatus && (
            <div className={`flex items-center gap-3 p-3 rounded-xl ${planStatus.bg} border border-current/10`}>
              <CheckCircle2 size={16} className={planStatus.color} />
              <span className={`font-semibold text-sm ${planStatus.color}`}>
                {planStatus.label} — {autoTarget} words/day needed
              </span>
            </div>
          )}
        </motion.div>
      )}

      {/* Start button */}
      <button
        onClick={onStartSession}
        className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
      >
        <Zap size={20} />
        {crunch.active ? "Start Crunch Session" : "Start Today's Session"}
      </button>
    </div>
  );
}
