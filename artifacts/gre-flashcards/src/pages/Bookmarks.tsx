import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { formatRelativeTime } from "@/lib/storage";
import {
  ArrowLeft, Bookmark, Search, Trash2, BookOpen, Target,
  Flame, Sparkles, X, Zap,
} from "lucide-react";

interface BookmarksProps {
  onBack: () => void;
  onNavigate: (page: string, params?: Record<string, unknown>) => void;
}

type Filter = "all" | "set-test" | "mission-test";

export default function Bookmarks({ onBack, onNavigate }: BookmarksProps) {
  const { bookmarks, words, removeBookmark } = useApp();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  const enrichedBookmarks = useMemo(
    () =>
      bookmarks
        .map((b) => {
          const w = words.find((x) => x.id === b.wordId);
          return { entry: b, word: w };
        })
        .sort(
          (a, b) =>
            new Date(b.entry.addedAt).getTime() -
            new Date(a.entry.addedAt).getTime()
        ),
    [bookmarks, words]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return enrichedBookmarks.filter(({ entry, word }) => {
      if (filter !== "all" && entry.source !== filter) return false;
      if (!q) return true;
      const hay = (
        entry.word + " " + (word?.definition ?? "") + " " + (word?.pos ?? "")
      ).toLowerCase();
      return hay.includes(q);
    });
  }, [enrichedBookmarks, query, filter]);

  const setCount = enrichedBookmarks.filter((b) => b.entry.source === "set-test").length;
  const missionCount = enrichedBookmarks.filter((b) => b.entry.source === "mission-test").length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col">
      {/* Sticky header */}
      <div className="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
          <button
            onClick={onBack}
            aria-label="Back"
            className="p-2 rounded-xl hover:bg-muted transition-colors text-muted-foreground shrink-0"
          >
            <ArrowLeft size={18} />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="font-bold text-base text-foreground truncate inline-flex items-center gap-2">
              <Bookmark size={16} className="text-violet-600 fill-violet-600" />
              Bookmarked Words
            </h1>
            <p className="text-xs text-muted-foreground truncate">
              {bookmarks.length === 0
                ? "Save questions during tests to revisit them here."
                : `${bookmarks.length} word${bookmarks.length === 1 ? "" : "s"} saved`}
            </p>
          </div>
          {bookmarks.length > 0 && (
            <button
              onClick={() => onNavigate("practice", { source: "bookmarked" })}
              className="shrink-0 inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-violet-500 hover:bg-violet-600 text-white text-xs font-bold transition-colors"
              title="Quiz yourself on bookmarked words"
            >
              <Zap size={14} />
              <span className="hidden sm:inline">Practice Bookmarked</span>
              <span className="sm:hidden">Practice</span>
            </button>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 py-6 space-y-5">
        {bookmarks.length === 0 ? (
          <EmptyState onBack={onBack} />
        ) : (
          <>
            {/* Stat cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <StatCard
                label="Total Saved"
                value={bookmarks.length}
                icon={<Bookmark size={18} className="fill-current" />}
                accent="violet"
                active={filter === "all"}
                onClick={() => setFilter("all")}
              />
              <StatCard
                label="From Set Tests"
                value={setCount}
                icon={<Target size={18} />}
                accent="violet"
                active={filter === "set-test"}
                onClick={() => setFilter("set-test")}
              />
              <StatCard
                label="From Mission Tests"
                value={missionCount}
                icon={<Flame size={18} />}
                accent="orange"
                active={filter === "mission-test"}
                onClick={() => setFilter("mission-test")}
              />
            </div>

            {/* Search */}
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
              />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search bookmarked words…"
                className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-300"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-muted text-muted-foreground"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* List */}
            {filtered.length === 0 ? (
              <div className="rounded-[20px] border border-dashed border-border bg-card/50 p-10 text-center">
                <p className="text-sm text-muted-foreground">
                  No bookmarks match your filters.
                </p>
              </div>
            ) : (
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <AnimatePresence initial={false}>
                  {filtered.map(({ entry, word }) => {
                    const isSet = entry.source === "set-test";
                    return (
                      <motion.li
                        key={entry.wordId}
                        layout
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.18 }}
                        className="rounded-[20px] border border-border bg-card shadow-sm p-5 flex flex-col gap-3"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap mb-1">
                              <h3 className="text-lg font-extrabold text-foreground truncate">
                                {word?.word ?? entry.word}
                              </h3>
                              {word?.pos && (
                                <span className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                                  {word.pos}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2 flex-wrap text-[11px] text-muted-foreground">
                              <span
                                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-semibold ${
                                  isSet
                                    ? "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300"
                                    : "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300"
                                }`}
                              >
                                {isSet ? <Target size={10} /> : <Flame size={10} />}
                                {isSet
                                  ? `Set ${entry.group ?? "?"} · Mission ${entry.missionDay}`
                                  : `Mission ${entry.missionDay}`}
                              </span>
                              <span>· saved {formatRelativeTime(entry.addedAt)}</span>
                            </div>
                          </div>
                          <button
                            onClick={() => removeBookmark(entry.wordId)}
                            aria-label="Remove bookmark"
                            title="Remove bookmark"
                            className="p-2 rounded-lg text-muted-foreground hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 transition-colors shrink-0"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>

                        {word ? (
                          <p className="text-sm text-muted-foreground leading-snug line-clamp-3">
                            {word.definition}
                          </p>
                        ) : (
                          <p className="text-xs italic text-muted-foreground">
                            Word data not available.
                          </p>
                        )}

                        <div className="flex items-center gap-2 mt-auto pt-1">
                          <button
                            onClick={() => onNavigate("study", { wordId: entry.wordId })}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-500 hover:bg-violet-600 text-white text-xs font-bold transition-colors"
                          >
                            <BookOpen size={12} /> Study word
                          </button>
                          <button
                            onClick={() =>
                              onNavigate(
                                isSet ? "set-test" : "mission-test",
                                isSet
                                  ? { missionDay: entry.missionDay, group: entry.group ?? 1 }
                                  : { missionDay: entry.missionDay }
                              )
                            }
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-foreground hover:bg-muted text-xs font-bold transition-colors"
                          >
                            <Sparkles size={12} /> Retake test
                          </button>
                        </div>
                      </motion.li>
                    );
                  })}
                </AnimatePresence>
              </ul>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon,
  accent,
  active,
  onClick,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
  accent: "violet" | "orange";
  active: boolean;
  onClick: () => void;
}) {
  const accentClasses =
    accent === "violet"
      ? {
          ring: "ring-violet-400 border-violet-300 bg-violet-50 dark:bg-violet-900/20 dark:border-violet-700",
          icon: "bg-violet-500 text-white",
          label: "text-violet-700 dark:text-violet-300",
        }
      : {
          ring: "ring-orange-400 border-orange-300 bg-orange-50 dark:bg-orange-900/20 dark:border-orange-700",
          icon: "bg-orange-500 text-white",
          label: "text-orange-700 dark:text-orange-300",
        };
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`text-left rounded-[20px] border bg-card p-4 flex items-center gap-3 transition-all hover:shadow-md ${
        active ? `ring-2 ${accentClasses.ring}` : "border-border"
      }`}
    >
      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${accentClasses.icon}`}
      >
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-2xl font-extrabold text-foreground tabular-nums leading-tight">
          {value}
        </p>
        <p className={`text-xs font-semibold ${active ? accentClasses.label : "text-muted-foreground"}`}>
          {label}
        </p>
      </div>
    </button>
  );
}

function EmptyState({ onBack }: { onBack: () => void }) {
  return (
    <div className="rounded-[20px] border border-dashed border-border bg-card/50 p-10 sm:p-16 text-center flex flex-col items-center gap-4">
      <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-300 flex items-center justify-center">
        <Bookmark size={28} className="fill-current" />
      </div>
      <div className="max-w-md">
        <h2 className="text-lg font-bold text-foreground mb-1">No bookmarks yet</h2>
        <p className="text-sm text-muted-foreground">
          Take a Set Test or Mission Test, then tap the bookmark icon next to any
          question on the results screen to save the word here for later review.
        </p>
      </div>
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-violet-500 hover:bg-violet-600 text-white text-sm font-bold transition-colors"
      >
        <ArrowLeft size={14} /> Back to Home
      </button>
    </div>
  );
}
