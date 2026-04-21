import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { getProgress, getRecallStrength } from "@/lib/srs";
import { WORD_ROOTS } from "@/data/wordRoots";
import { TOTAL_DAYS } from "@/data/words";
import { Word } from "@/data/words";
import { ArrowLeft, ChevronDown, ChevronRight, TrendingUp, X } from "lucide-react";

type HeatmapFilter = "all" | "weak" | "due" | "mastered";

function strengthColor(strength: number, neverReviewed: boolean): string {
  if (neverReviewed) return "#94a3b8";
  if (strength >= 0.85) return "#16a34a";
  if (strength >= 0.65) return "#86efac";
  if (strength >= 0.40) return "#fbbf24";
  if (strength >= 0.20) return "#f97316";
  return "#ef4444";
}

function strengthLabel(strength: number, neverReviewed: boolean): string {
  if (neverReviewed) return "Never reviewed";
  if (strength >= 0.85) return "Strong";
  if (strength >= 0.65) return "Good";
  if (strength >= 0.40) return "Fair";
  if (strength >= 0.20) return "Weak";
  return "Critical";
}

interface WordOverlayProps {
  word: Word;
  onClose: () => void;
}

function WordOverlay({ word, onClose }: WordOverlayProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-card border border-card-border rounded-2xl p-6 max-w-md w-full shadow-xl"
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground">{word.word}</h2>
            <p className="text-sm italic text-muted-foreground">{word.pos}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-muted transition-colors">
            <X size={18} />
          </button>
        </div>
        <p className="text-sm text-foreground/80 leading-relaxed mb-4">{word.definition}</p>
        <div className="grid grid-cols-2 gap-3 text-xs text-muted-foreground">
          <div>Correct: <span className="font-semibold text-green-500">{word.correctCount}</span></div>
          <div>Incorrect: <span className="font-semibold text-red-500">{word.incorrectCount}</span></div>
          <div>Status: <span className="font-semibold text-foreground capitalize">{word.status}</span></div>
          <div>Interval: <span className="font-semibold text-foreground">{word.interval}d</span></div>
          {word.lastReviewed && (
            <div className="col-span-2">
              Last reviewed: <span className="font-semibold text-foreground">
                {new Date(word.lastReviewed).toLocaleDateString()}
              </span>
            </div>
          )}
          {word.nextReview && (
            <div className="col-span-2">
              Next review: <span className="font-semibold text-foreground">
                {new Date(word.nextReview).toLocaleDateString()}
              </span>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

interface ProgressProps {
  onBack: () => void;
}

export default function Progress({ onBack }: ProgressProps) {
  const { words } = useApp();
  const progress = useMemo(() => getProgress(words), [words]);
  const [filter, setFilter] = useState<HeatmapFilter>("all");
  const [selectedWord, setSelectedWord] = useState<Word | null>(null);
  const [expandedRoots, setExpandedRoots] = useState<Set<string>>(new Set());

  const now = new Date();

  const wordStrengths = useMemo(() =>
    words.map((w) => ({
      word: w,
      strength: getRecallStrength(w),
      neverReviewed: !w.lastReviewed,
    })), [words]);

  const filterFn = (item: typeof wordStrengths[0]) => {
    if (filter === "all") return true;
    if (filter === "weak") return item.strength < 0.4 || item.neverReviewed;
    if (filter === "due") {
      return item.word.nextReview ? new Date(item.word.nextReview) <= now : true;
    }
    if (filter === "mastered") return item.word.status === "mastered";
    return true;
  };

  // Group by day
  const dayGroups = useMemo(() =>
    Array.from({ length: TOTAL_DAYS }, (_, i) => {
      const day = i + 1;
      return {
        day,
        items: wordStrengths.filter((ws) => ws.word.day === day),
      };
    }), [wordStrengths]);

  // Root Browser groups
  const rootGroups = useMemo(() => {
    const map = new Map<string, { root: string; words: Word[] }>();
    words.forEach((w) => {
      const rootData = WORD_ROOTS[w.word];
      if (!rootData) return;
      const key = rootData.root;
      if (!map.has(key)) map.set(key, { root: key, words: [] });
      map.get(key)!.words.push(w);
    });
    return Array.from(map.values()).filter((g) => g.words.length >= 2).sort((a, b) => b.words.length - a.words.length);
  }, [words]);

  const toggleRoot = (root: string) => {
    setExpandedRoots((prev) => {
      const next = new Set(prev);
      if (next.has(root)) next.delete(root);
      else next.add(root);
      return next;
    });
  };

  const filters: { id: HeatmapFilter; label: string }[] = [
    { id: "all", label: "All" },
    { id: "weak", label: "Weak" },
    { id: "due", label: "Due Today" },
    { id: "mastered", label: "Mastered" },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <button onClick={onBack} className="p-2 rounded-xl hover:bg-muted transition-colors">
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <TrendingUp size={22} className="text-primary" />
            Progress
          </h1>
          <p className="text-muted-foreground text-sm">Recall heatmap & word families</p>
        </div>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {[
          { label: "Mastered", value: progress.mastered, color: "text-green-500" },
          { label: "In Review", value: progress.review, color: "text-amber-500" },
          { label: "Learning", value: progress.learning, color: "text-blue-500" },
          { label: "New", value: progress.newWords, color: "text-slate-500" },
        ].map((s) => (
          <div key={s.label} className="bg-card border border-card-border rounded-xl p-3 text-center">
            <div className={`text-xl font-bold ${s.color}`}>{s.value}</div>
            <div className="text-xs text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>

      {/* === RECALL HEATMAP === */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-foreground mb-3">Recall Heatmap</h2>

        {/* Filter row */}
        <div className="flex gap-2 mb-4 flex-wrap">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                filter === f.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="bg-card border border-card-border rounded-2xl p-5">
          <div className="space-y-3">
            {dayGroups.map(({ day, items }) => (
              <div key={day} className="flex items-center gap-3">
                <span className="text-xs font-semibold text-muted-foreground w-10 shrink-0">Day {day}</span>
                <div className="flex flex-wrap gap-1">
                  {items.map((item) => {
                    const dimmed = filter !== "all" && !filterFn(item);
                    const color = strengthColor(item.strength, item.neverReviewed);
                    return (
                      <div
                        key={item.word.id}
                        onClick={() => setSelectedWord(item.word)}
                        title={`${item.word.word}: ${strengthLabel(item.strength, item.neverReviewed)} (${Math.round(item.strength * 100)}%)`}
                        className="cursor-pointer rounded-sm transition-opacity hover:opacity-80 hover:ring-2 hover:ring-primary"
                        style={{
                          width: 14, height: 14,
                          backgroundColor: color,
                          opacity: dimmed ? 0.2 : 1,
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 mt-4 pt-3 border-t border-border">
            {[
              { color: "#94a3b8", label: "Never reviewed" },
              { color: "#ef4444", label: "Critical (<20%)" },
              { color: "#f97316", label: "Weak (20–40%)" },
              { color: "#fbbf24", label: "Fair (40–65%)" },
              { color: "#86efac", label: "Good (65–85%)" },
              { color: "#16a34a", label: "Strong (>85%)" },
            ].map((l) => (
              <div key={l.label} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <div className="w-3 h-3 rounded-sm shrink-0" style={{ backgroundColor: l.color }} />
                {l.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === ROOT BROWSER === */}
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-3">Root Browser</h2>
        <div className="space-y-2">
          {rootGroups.map((group) => {
            const isOpen = expandedRoots.has(group.root);
            return (
              <div key={group.root} className="bg-card border border-card-border rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleRoot(group.root)}
                  className="w-full flex items-center justify-between p-4 hover:bg-muted/40 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-foreground">{group.root}</span>
                    <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                      {group.words.length} words
                    </span>
                  </div>
                  {isOpen ? <ChevronDown size={16} className="text-muted-foreground" /> : <ChevronRight size={16} className="text-muted-foreground" />}
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 space-y-2 border-t border-border pt-3">
                        {group.words.map((w) => (
                          <div key={w.id} className="flex items-start justify-between gap-3">
                            <div className="flex-1">
                              <span className="font-semibold text-foreground text-sm">{w.word}</span>
                              <span className="text-xs text-muted-foreground italic ml-2">{w.pos}</span>
                              <p className="text-xs text-foreground/70 mt-0.5 leading-relaxed">{w.definition}</p>
                            </div>
                            <div
                              className="w-3 h-3 rounded-sm shrink-0 mt-1"
                              style={{ backgroundColor: strengthColor(getRecallStrength(w), !w.lastReviewed) }}
                              title={strengthLabel(getRecallStrength(w), !w.lastReviewed)}
                            />
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* Word Overlay */}
      <AnimatePresence>
        {selectedWord && (
          <WordOverlay word={selectedWord} onClose={() => setSelectedWord(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
