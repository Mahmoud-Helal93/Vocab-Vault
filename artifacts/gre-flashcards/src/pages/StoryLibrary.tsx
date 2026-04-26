import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  BookOpen,
  Clock,
  Search,
  Library,
  Filter,
  ChevronRight,
  X,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  CircleDashed,
} from "lucide-react";
import { SET_READINGS, type SetReading } from "@/data/setReadings";
import { TOTAL_DAYS, GROUPS_PER_DAY } from "@/data/words";
import {
  getAllAttempts,
  statusForAttempt,
  type StoryAttempt,
  type StoryStatus,
} from "@/lib/storyAttempts";

interface StoryLibraryProps {
  onBack: () => void;
  onNavigate: (page: string, params?: Record<string, unknown>) => void;
}

interface StoryEntry {
  key: string;
  missionDay: number;
  group: number;
  reading: SetReading;
}

type StatusFilter = "all" | StoryStatus;

function buildEntries(): StoryEntry[] {
  const entries: StoryEntry[] = [];
  for (const [key, reading] of Object.entries(SET_READINGS)) {
    const [d, g] = key.split("-").map((n) => parseInt(n, 10));
    if (Number.isFinite(d) && Number.isFinite(g)) {
      entries.push({ key, missionDay: d, group: g, reading });
    }
  }
  entries.sort((a, b) =>
    a.missionDay !== b.missionDay
      ? a.missionDay - b.missionDay
      : a.group - b.group,
  );
  return entries;
}

function entryMatchesSearch(entry: StoryEntry, q: string): boolean {
  if (!q) return true;
  const needle = q.toLowerCase().trim();
  if (!needle) return true;
  const r = entry.reading;
  if (r.title.toLowerCase().includes(needle)) return true;
  if (r.subtitle.toLowerCase().includes(needle)) return true;
  if (r.format.toLowerCase().includes(needle)) return true;
  if (`mission ${entry.missionDay}`.includes(needle)) return true;
  if (`set ${entry.group}`.includes(needle)) return true;
  if (`m${entry.missionDay}`.includes(needle)) return true;
  if (`s${entry.group}`.includes(needle)) return true;
  if (entry.key.includes(needle)) return true;
  for (const w of r.words) {
    if (w.toLowerCase().includes(needle)) return true;
  }
  return false;
}

export default function StoryLibrary({
  onBack,
  onNavigate,
}: StoryLibraryProps) {
  const allEntries = useMemo(() => buildEntries(), []);
  const attempts = useMemo(() => getAllAttempts(), []);

  const [query, setQuery] = useState("");
  const [missionFilter, setMissionFilter] = useState<number | "all">("all");
  const [setFilter, setSetFilter] = useState<number | "all">("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  const availableMissions = useMemo(() => {
    const set = new Set<number>();
    for (const e of allEntries) set.add(e.missionDay);
    return Array.from(set).sort((a, b) => a - b);
  }, [allEntries]);

  const availableSets = useMemo(() => {
    const set = new Set<number>();
    for (const e of allEntries) set.add(e.group);
    return Array.from(set).sort((a, b) => a - b);
  }, [allEntries]);

  const filtered = useMemo(() => {
    return allEntries.filter((e) => {
      if (missionFilter !== "all" && e.missionDay !== missionFilter)
        return false;
      if (setFilter !== "all" && e.group !== setFilter) return false;
      if (statusFilter !== "all") {
        const st = statusForAttempt(attempts[e.key]);
        if (st !== statusFilter) return false;
      }
      if (!entryMatchesSearch(e, query)) return false;
      return true;
    });
  }, [allEntries, attempts, query, missionFilter, setFilter, statusFilter]);

  const totalStories = allEntries.length;
  const totalMissionsCovered = availableMissions.length;
  const totalSetsCovered = totalStories;
  const totalCurriculumSets = TOTAL_DAYS * GROUPS_PER_DAY;

  const statusCounts = useMemo(() => {
    let mastered = 0;
    let needsReview = 0;
    let unpracticed = 0;
    for (const e of allEntries) {
      const st = statusForAttempt(attempts[e.key]);
      if (st === "mastered") mastered++;
      else if (st === "needs-review") needsReview++;
      else unpracticed++;
    }
    return { mastered, needsReview, unpracticed };
  }, [allEntries, attempts]);

  const hasActiveFilter =
    query.trim().length > 0 ||
    missionFilter !== "all" ||
    setFilter !== "all" ||
    statusFilter !== "all";

  const clearFilters = () => {
    setQuery("");
    setMissionFilter("all");
    setSetFilter("all");
    setStatusFilter("all");
  };

  const openStory = (entry: StoryEntry) => {
    onNavigate("set-reading", {
      missionDay: entry.missionDay,
      group: entry.group,
      libraryMode: true,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50/40 via-background to-orange-50/40 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 space-y-5">
        {/* Breadcrumb header */}
        <div className="flex items-center gap-3 text-sm">
          <button
            onClick={onBack}
            aria-label="Back"
            className="w-9 h-9 rounded-xl border border-border bg-card flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors shrink-0"
          >
            <ArrowLeft size={16} />
          </button>
          <nav className="flex items-center gap-1.5 text-muted-foreground font-medium flex-wrap">
            <span
              className="text-orange-600 dark:text-orange-400 font-semibold"
              aria-current="page"
            >
              Story Library
            </span>
          </nav>
        </div>

        {/* Hero banner */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl border border-orange-200/70 dark:border-orange-500/20 bg-orange-50/70 dark:bg-orange-500/5 shadow-sm"
        >
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-5 md:gap-6 p-6 sm:p-7 items-center">
            <div className="space-y-3 min-w-0">
              <div className="w-11 h-11 rounded-xl bg-white dark:bg-card flex items-center justify-center shadow-sm border border-orange-100 dark:border-orange-500/20">
                <Library
                  size={20}
                  style={{ color: "hsl(var(--brand-orange))" }}
                />
              </div>
              <h1 className="text-2xl sm:text-[28px] font-extrabold leading-tight text-foreground">
                Story Library
              </h1>
              <p className="text-sm sm:text-[15px] text-muted-foreground leading-relaxed max-w-xl">
                Every pre-read story in one place. Re-read any of them at any
                time to reinforce vocabulary in context — no quiz, no mission
                gating, just the story.
              </p>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1 text-xs sm:text-sm font-semibold text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <BookOpen size={14} className="text-orange-500" />{" "}
                  {totalStories} stories
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Sparkles size={14} className="text-amber-500" />{" "}
                  {totalMissionsCovered} missions covered
                </span>
                <span className="text-muted-foreground/80">
                  {totalSetsCovered} of {totalCurriculumSets} sets
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2 pt-2 text-[11px] font-bold uppercase tracking-wider">
                <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300">
                  <CheckCircle2 size={12} /> {statusCounts.mastered} mastered
                </span>
                <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300">
                  <AlertCircle size={12} /> {statusCounts.needsReview} needs
                  review
                </span>
                <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-muted text-muted-foreground">
                  <CircleDashed size={12} /> {statusCounts.unpracticed} not
                  practiced
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Search + filters */}
        <div className="rounded-2xl border border-border bg-card p-4 sm:p-5 shadow-sm space-y-3">
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title, theme, mission, set, or vocabulary word…"
              className="w-full pl-9 pr-9 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-orange-300 dark:focus:ring-orange-500/40 focus:border-orange-300 dark:focus:border-orange-500/40 transition"
              aria-label="Search stories"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition"
                aria-label="Clear search"
              >
                <X size={14} />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              <Filter size={12} /> Filter
            </div>

            <label className="inline-flex items-center gap-2 text-sm">
              <span className="text-xs font-semibold text-muted-foreground">
                Mission
              </span>
              <select
                value={missionFilter === "all" ? "all" : String(missionFilter)}
                onChange={(e) =>
                  setMissionFilter(
                    e.target.value === "all"
                      ? "all"
                      : parseInt(e.target.value, 10),
                  )
                }
                className="px-3 py-1.5 rounded-lg border border-border bg-background text-sm text-foreground font-semibold focus:outline-none focus:ring-2 focus:ring-orange-300 dark:focus:ring-orange-500/40 transition"
              >
                <option value="all">All missions</option>
                {availableMissions.map((m) => (
                  <option key={m} value={m}>
                    Mission {m}
                  </option>
                ))}
              </select>
            </label>

            <label className="inline-flex items-center gap-2 text-sm">
              <span className="text-xs font-semibold text-muted-foreground">
                Set
              </span>
              <select
                value={setFilter === "all" ? "all" : String(setFilter)}
                onChange={(e) =>
                  setSetFilter(
                    e.target.value === "all"
                      ? "all"
                      : parseInt(e.target.value, 10),
                  )
                }
                className="px-3 py-1.5 rounded-lg border border-border bg-background text-sm text-foreground font-semibold focus:outline-none focus:ring-2 focus:ring-orange-300 dark:focus:ring-orange-500/40 transition"
              >
                <option value="all">All sets</option>
                {availableSets.map((s) => (
                  <option key={s} value={s}>
                    Set {s}
                  </option>
                ))}
              </select>
            </label>

            <label className="inline-flex items-center gap-2 text-sm">
              <span className="text-xs font-semibold text-muted-foreground">
                Practice
              </span>
              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value as StatusFilter)
                }
                className="px-3 py-1.5 rounded-lg border border-border bg-background text-sm text-foreground font-semibold focus:outline-none focus:ring-2 focus:ring-orange-300 dark:focus:ring-orange-500/40 transition"
              >
                <option value="all">All statuses</option>
                <option value="unpracticed">Not yet practiced</option>
                <option value="needs-review">Needs review (&lt; 80%)</option>
                <option value="mastered">Mastered (≥ 80%)</option>
              </select>
            </label>

            {hasActiveFilter && (
              <button
                type="button"
                onClick={clearFilters}
                className="ml-auto inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-border bg-background text-muted-foreground hover:text-foreground hover:bg-muted transition"
              >
                <X size={12} /> Clear
              </button>
            )}
          </div>

          <div className="text-xs text-muted-foreground">
            Showing{" "}
            <span className="font-bold text-foreground">{filtered.length}</span>{" "}
            of {totalStories} stor{totalStories === 1 ? "y" : "ies"}
          </div>
        </div>

        {/* Story grid */}
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-card p-10 text-center space-y-3">
            <div className="mx-auto w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
              <Search size={20} className="text-muted-foreground" />
            </div>
            <h3 className="text-base font-bold text-foreground">
              No stories match your search
            </h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Try a different keyword, or clear the filters to see all stories
              in the library.
            </p>
            {hasActiveFilter && (
              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg border border-border bg-background text-foreground hover:bg-muted transition"
              >
                <X size={12} /> Clear filters
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((entry) => (
              <StoryCard
                key={entry.key}
                entry={entry}
                attempt={attempts[entry.key] ?? null}
                searchQuery={query.trim()}
                onOpen={() => openStory(entry)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

interface StoryCardProps {
  entry: StoryEntry;
  attempt: StoryAttempt | null;
  searchQuery: string;
  onOpen: () => void;
}

function StoryCard({ entry, attempt, searchQuery, onOpen }: StoryCardProps) {
  const { reading, missionDay, group } = entry;
  const needle = searchQuery.toLowerCase();
  const matchedWords =
    needle.length > 0
      ? reading.words.filter((w) => w.toLowerCase().includes(needle))
      : [];
  const wordsToShow =
    matchedWords.length > 0 ? matchedWords.slice(0, 4) : reading.words.slice(0, 4);
  const remaining = reading.words.length - wordsToShow.length;
  const status = statusForAttempt(attempt);
  const pct =
    attempt && attempt.total > 0
      ? Math.round((attempt.score / attempt.total) * 100)
      : null;

  return (
    <button
      type="button"
      onClick={onOpen}
      className="group text-left rounded-2xl border border-border bg-card p-5 shadow-sm hover:shadow-md hover:border-orange-300 dark:hover:border-orange-500/40 transition-all flex flex-col gap-3 min-h-[220px]"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-300">
            Mission {missionDay}
          </span>
          <span className="inline-flex items-center text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md bg-muted text-muted-foreground">
            Set {group}
          </span>
          {status === "mastered" && (
            <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300">
              <CheckCircle2 size={10} /> Mastered
            </span>
          )}
          {status === "needs-review" && (
            <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300">
              <AlertCircle size={10} /> Review
            </span>
          )}
        </div>
        <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground shrink-0">
          {reading.format}
        </span>
      </div>

      <h3 className="text-base font-extrabold text-foreground leading-snug line-clamp-2 group-hover:text-orange-700 dark:group-hover:text-orange-300 transition-colors">
        {reading.title}
      </h3>

      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 flex-1">
        {reading.subtitle}
      </p>

      <div className="flex flex-wrap gap-1.5">
        {wordsToShow.map((w) => {
          const isMatch =
            needle.length > 0 && w.toLowerCase().includes(needle);
          return (
            <span
              key={w}
              className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border transition-colors ${
                isMatch
                  ? "border-orange-400 bg-orange-50 text-orange-700 dark:bg-orange-500/15 dark:border-orange-500/40 dark:text-orange-300"
                  : "border-border bg-background text-muted-foreground"
              }`}
            >
              {w}
            </span>
          );
        })}
        {remaining > 0 && (
          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full border border-border bg-background text-muted-foreground">
            +{remaining} more
          </span>
        )}
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-border text-xs gap-3">
        <span className="inline-flex items-center gap-1.5 text-muted-foreground font-semibold">
          <Clock size={12} /> {reading.readingMinutes} min read
        </span>
        {attempt && pct !== null ? (
          <span
            className={`inline-flex items-center gap-1 font-bold ${
              status === "mastered"
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-amber-600 dark:text-amber-400"
            }`}
            title={`Last attempted ${new Date(
              attempt.attemptedAt,
            ).toLocaleDateString()}`}
          >
            Last: {attempt.score}/{attempt.total} · {pct}%
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-muted-foreground font-semibold">
            <CircleDashed size={12} /> Not practiced
          </span>
        )}
      </div>
    </button>
  );
}
