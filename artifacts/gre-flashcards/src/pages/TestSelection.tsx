import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Zap,
  SlidersHorizontal,
  Shuffle,
  Layers,
  Globe,
  Sparkles,
  Target,
  Boxes,
  ListOrdered,
  ChevronRight,
  ChevronLeft,
  Circle,
  ListChecks,
  Minus,
  Plus,
  AlertCircle,
  Wand2,
  Eye,
  Hash,
  Hourglass,
  Lightbulb,
  Gauge,
  Filter as FilterIcon,
  Info,
  CheckCircle2,
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { TOTAL_DAYS } from "@/data/words";
import {
  type Filters,
  type QuickPreset,
  type Scope,
  type ScopeKind,
  type SetRef,
  BELT_NAMES,
  QUICK_PRESETS,
  TOTAL_BELTS,
  beltForMission,
  countSelection,
  missionsForBelt,
  quickPresetRequest,
  selectWords,
  setsForMission,
} from "@/lib/wordSelection";
import {
  ALL_TEST_QUESTION_TYPES,
  EMPTY_AVAILABILITY,
  TEST_QUESTION_GROUP_ORDER,
  TEST_QUESTION_TYPE_META,
  questionTypesByGroup,
  type AvailabilityByType,
  type CountsByType,
  type TestQuestionGroup,
  type TestQuestionType,
} from "@/lib/testTypes";
import { getQuestionAvailability } from "@/lib/testQuestionBank";
import {
  generatePracticeSession,
  isStartable,
  sumCounts,
  DEFAULT_SESSION_CONFIG,
  type SessionConfig,
} from "@/lib/testSelection";

interface TestSelectionProps {
  onBack: () => void;
  onNavigate: (page: string, params?: Record<string, unknown>) => void;
  mode: "quick" | "custom";
}

// ─────────────────────────────────────────────────────────────────────────────

export default function TestSelection({ onBack, onNavigate, mode }: TestSelectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-[1240px] mx-auto px-4 lg:px-6 py-6 space-y-6"
    >
      <Header mode={mode} onBack={onBack} />
      {mode === "quick" ? (
        <QuickPracticePanel onNavigate={onNavigate} />
      ) : (
        <CustomPracticePanel onNavigate={onNavigate} />
      )}
    </motion.div>
  );
}

// ─── Header ─────────────────────────────────────────────────────────────────

function Header({
  mode,
  onBack,
}: {
  mode: "quick" | "custom";
  onBack: () => void;
}) {
  const isQuick = mode === "quick";
  const Icon = isQuick ? Zap : SlidersHorizontal;
  const accent = isQuick
    ? "from-orange-500 to-pink-500"
    : "from-violet-500 to-fuchsia-500";
  const eyebrow = isQuick ? "Quick Practice" : "Custom Practice";
  const title = isQuick
    ? "Pick a preset and go."
    : "Build a focused practice session.";
  const subtitle = isQuick
    ? "Each preset pulls from the words that need attention right now."
    : "Choose your words, question types, and exact question counts before you begin.";

  return (
    <section className="relative overflow-hidden rounded-2xl border border-border bg-brand-gradient-soft px-5 sm:px-7 py-6 shadow-sm">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors mb-3"
      >
        <ArrowLeft size={14} />
        Back to Test Center
      </button>
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
        <div
          className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${accent} flex items-center justify-center shadow-md shrink-0`}
        >
          <Icon size={26} className="text-white" strokeWidth={2.5} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[11px] font-extrabold uppercase tracking-wider text-brand-gradient">
            {eyebrow}
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold leading-tight text-foreground mt-1">
            {title}
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-2 max-w-2xl">
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── Quick Practice ─────────────────────────────────────────────────────────

function QuickPracticePanel({
  onNavigate,
}: {
  onNavigate: (page: string, params?: Record<string, unknown>) => void;
}) {
  const { words } = useApp();

  const previews = useMemo(() => {
    const out: Record<QuickPreset, { count: number; sample: typeof words }> = {
      new: { count: 0, sample: [] },
      mistakes: { count: 0, sample: [] },
      difficult: { count: 0, sample: [] },
      today: { count: 0, sample: [] },
      random: { count: 0, sample: [] },
    };
    for (const p of QUICK_PRESETS) {
      const req = quickPresetRequest(p.id);
      out[p.id] = {
        count: countSelection(words, req),
        sample: selectWords(words, { ...req, limit: 5 }),
      };
    }
    return out;
  }, [words]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {QUICK_PRESETS.map((preset) => {
        const { count, sample } = previews[preset.id];
        const empty = count === 0;
        return (
          <article
            key={preset.id}
            className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm hover-elevate transition-all"
          >
            <div className="p-5 flex flex-col h-full">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-base font-extrabold text-foreground">
                    {preset.label}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    {preset.description}
                  </p>
                </div>
                <span
                  className={`shrink-0 text-[11px] font-extrabold px-2 py-1 rounded-full ${
                    empty
                      ? "bg-muted text-muted-foreground"
                      : "bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-300"
                  }`}
                >
                  {count.toLocaleString()} words
                </span>
              </div>

              {sample.length > 0 && (
                <ul className="mt-4 space-y-1">
                  {sample.map((w) => (
                    <li
                      key={w.id}
                      className="flex items-center gap-2 text-xs text-foreground/80"
                    >
                      <Circle
                        size={6}
                        className="text-muted-foreground/60 fill-current shrink-0"
                      />
                      <span className="truncate font-medium">{w.word}</span>
                      <span className="text-muted-foreground/70 truncate">
                        · M{w.day}·S{w.group}
                      </span>
                    </li>
                  ))}
                </ul>
              )}

              {empty && (
                <p className="mt-4 text-xs text-muted-foreground italic">
                  No matching words yet. Build progress in the Learn tab and
                  this list will fill up.
                </p>
              )}

              <div className="mt-5 pt-4 border-t border-border flex items-center justify-between gap-3">
                <span className="text-[11px] text-muted-foreground font-medium inline-flex items-center gap-1">
                  <Shuffle size={12} /> Shuffled
                </span>
                <StartButton
                  small
                  disabled={empty}
                  onClick={() => {
                    const ids = selectWords(
                      words,
                      quickPresetRequest(preset.id),
                    ).map((w) => w.id);
                    onNavigate("practice", {
                      wordIds: ids,
                      sessionTitle: preset.label,
                    });
                  }}
                />
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Custom Practice — guided builder (Source → Question Mix → Start)
// ─────────────────────────────────────────────────────────────────────────────

const TOTAL_MISSIONS = TOTAL_DAYS;
const TOTAL_SETS = TOTAL_DAYS * 3;
const TOTAL_WORDS = TOTAL_DAYS * 30;

interface MixPreset {
  id: string;
  label: string;
  description: string;
  counts: Partial<Record<TestQuestionType, number>>;
}

const MIX_PRESETS: MixPreset[] = [
  {
    id: "quick10",
    label: "Quick 10",
    description: "Fast 10-question warmup mixing MCQs and a typing prompt.",
    counts: { "word-to-def": 4, "def-to-word": 3, "fill-blank": 3 },
  },
  {
    id: "balanced20",
    label: "Balanced 20",
    description: "All-rounder: definitions, synonyms, T/F and a typing burst.",
    counts: {
      "word-to-def": 5,
      "def-to-word": 5,
      "fill-blank": 5,
      "synonym-pair": 3,
      "tf-definition": 2,
    },
  },
  {
    id: "typing",
    label: "Typing Focus",
    description: "Recall-only: 15 fill-in-the-blank questions to lock in spelling.",
    counts: { "fill-blank": 15 },
  },
  {
    id: "mcq",
    label: "MCQ Focus",
    description: "Multiple choice only — 5 of each MCQ flavor.",
    counts: {
      "word-to-def": 5,
      "def-to-word": 5,
      "synonym-mcq": 5,
    },
  },
];

function CustomPracticePanel({
  onNavigate,
}: {
  onNavigate: (page: string, params?: Record<string, unknown>) => void;
}) {
  const { words } = useApp();

  // ─── Source state ──────────────────────────────────────────────────────
  const [scopeKind, setScopeKind] = useState<ScopeKind>("all");
  const [selectedBelt, setSelectedBelt] = useState<number>(1);
  const [selectedMission, setSelectedMission] = useState<number>(1);
  const [selectedSet, setSelectedSet] = useState<SetRef>({ day: 1, group: 1 });
  const [rangeFrom, setRangeFrom] = useState<number>(1);
  const [rangeTo, setRangeTo] = useState<number>(7);
  const [filters, setFilters] = useState<Filters>({});

  // ─── Question mix state ────────────────────────────────────────────────
  const [counts, setCounts] = useState<CountsByType>({});

  // ─── Final options state ───────────────────────────────────────────────
  const [sessionConfig, setSessionConfig] = useState<SessionConfig>(
    DEFAULT_SESSION_CONFIG,
  );

  // ─── Derived: scope → words → availability ─────────────────────────────
  const scope: Scope = useMemo(() => {
    switch (scopeKind) {
      case "all":
        return { kind: "all" };
      case "belt":
        return { kind: "belt", beltIds: [selectedBelt] };
      case "mission":
        return { kind: "mission", missionDays: [selectedMission] };
      case "set":
        return { kind: "set", sets: [selectedSet] };
      case "range":
        return { kind: "range", fromDay: rangeFrom, toDay: rangeTo };
    }
  }, [
    scopeKind,
    selectedBelt,
    selectedMission,
    selectedSet,
    rangeFrom,
    rangeTo,
  ]);

  const scopeWords = useMemo(
    () => selectWords(words, { scope, filters, shuffle: false }),
    [words, scope, filters],
  );
  const totalScopeWords = scopeWords.length;

  const availability: AvailabilityByType = useMemo(() => {
    if (totalScopeWords === 0) return { ...EMPTY_AVAILABILITY };
    return getQuestionAvailability(scopeWords, words);
  }, [scopeWords, totalScopeWords, words]);

  const totalAvailable = useMemo(
    () =>
      ALL_TEST_QUESTION_TYPES.reduce((sum, t) => sum + availability[t], 0),
    [availability],
  );

  const effectiveCounts: CountsByType = useMemo(() => {
    const out: CountsByType = {};
    for (const t of ALL_TEST_QUESTION_TYPES) {
      const want = Math.max(0, Math.floor(counts[t] ?? 0));
      if (want === 0) continue;
      const have = availability[t];
      if (have <= 0) continue;
      out[t] = Math.min(want, have);
    }
    return out;
  }, [counts, availability]);

  const totalQuestions = sumCounts(effectiveCounts);
  const startable = isStartable(effectiveCounts) && totalScopeWords > 0;

  const sourceSummary = useMemo(
    () => describeSourceShort(scope),
    [scope],
  );

  // ─── Helpers for presets ───────────────────────────────────────────────
  const applyPreset = (preset: MixPreset) => {
    const next: CountsByType = {};
    for (const t of ALL_TEST_QUESTION_TYPES) {
      const want = preset.counts[t] ?? 0;
      const have = availability[t];
      next[t] = Math.min(want, have);
    }
    setCounts(next);
  };

  const applyAllAvailable = () => {
    if (
      totalAvailable > 200 &&
      !window.confirm(
        `This will start a ${totalAvailable.toLocaleString()} question session. Continue?`,
      )
    ) {
      return;
    }
    const next: CountsByType = {};
    for (const t of ALL_TEST_QUESTION_TYPES) {
      next[t] = availability[t];
    }
    setCounts(next);
  };

  const clearAll = () => setCounts({});

  // ─── Disabled reason for the Start button ──────────────────────────────
  const disabledReason: string | null = useMemo(() => {
    if (totalScopeWords === 0)
      return "No words match this source. Adjust the source above.";
    if (totalAvailable === 0)
      return "No question types are available for this source.";
    if (totalQuestions === 0)
      return "Pick at least one question — try a preset to get started.";
    return null;
  }, [totalScopeWords, totalAvailable, totalQuestions]);

  // ─── Start ─────────────────────────────────────────────────────────────
  const start = () => {
    if (!startable) return;
    const result = generatePracticeSession({
      scopeWords,
      pool: words,
      counts: effectiveCounts,
      shuffle: sessionConfig.shuffle,
    });
    if (result.questions.length === 0) return;
    onNavigate("practice", {
      questions: result.questions,
      sessionTitle: "Custom Practice",
      sessionConfig,
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      {/* ── Left: Builder ───────────────────────────────────────────────── */}
      <div className="lg:col-span-2 space-y-5">
        {/* STEP 1: Source */}
        <SourceStep
          scopeKind={scopeKind}
          onScopeKindChange={setScopeKind}
          selectedBelt={selectedBelt}
          onBeltChange={setSelectedBelt}
          selectedMission={selectedMission}
          onMissionChange={setSelectedMission}
          selectedSet={selectedSet}
          onSetChange={setSelectedSet}
          rangeFrom={rangeFrom}
          rangeTo={rangeTo}
          onRangeFromChange={setRangeFrom}
          onRangeToChange={setRangeTo}
          filters={filters}
          onFiltersChange={setFilters}
          totalScopeWords={totalScopeWords}
          sourceSummary={sourceSummary}
        />

        {/* STEP 2: Question Mix (with Final Options merged at the bottom) */}
        <QuestionMixStep
          availability={availability}
          totalScopeWords={totalScopeWords}
          counts={counts}
          onCountsChange={setCounts}
          onApplyPreset={applyPreset}
          onApplyAllAvailable={applyAllAvailable}
          onClearAll={clearAll}
          totalAvailable={totalAvailable}
          totalQuestions={totalQuestions}
        />

        {/* Final Options — visually integrated with the question mix */}
        <FinalOptionsCard
          config={sessionConfig}
          onChange={setSessionConfig}
        />

        {/* Helper banner */}
        <div className="rounded-2xl border border-dashed border-border bg-card/60 px-4 py-3 flex items-start gap-3 text-xs text-muted-foreground">
          <Info size={14} className="text-orange-500 shrink-0 mt-0.5" />
          <span>
            Review your session on the right. Your selection saves while you
            tweak — start whenever you’re ready.
          </span>
        </div>
      </div>

      {/* ── Right: Sticky review sidebar ────────────────────────────────── */}
      <aside className="lg:col-span-1">
        <div className="lg:sticky lg:top-4 space-y-4">
          <SessionSummaryCard
            sourceSummary={sourceSummary}
            totalScopeWords={totalScopeWords}
            counts={effectiveCounts}
            totalQuestions={totalQuestions}
            shuffle={sessionConfig.shuffle}
          />
          <AvailabilityCard
            availability={availability}
            counts={effectiveCounts}
            totalAvailable={totalAvailable}
          />
          <SamplePreviewCard
            sample={scopeWords.slice(0, 8)}
            total={totalScopeWords}
          />
          <StartCard
            totalQuestions={totalQuestions}
            disabled={!startable}
            disabledReason={disabledReason}
            onStart={start}
            confidenceRating={sessionConfig.confidenceRating}
          />
        </div>
      </aside>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Step 1 — Source
// ─────────────────────────────────────────────────────────────────────────────

function SourceStep({
  scopeKind,
  onScopeKindChange,
  selectedBelt,
  onBeltChange,
  selectedMission,
  onMissionChange,
  selectedSet,
  onSetChange,
  rangeFrom,
  rangeTo,
  onRangeFromChange,
  onRangeToChange,
  filters,
  onFiltersChange,
  totalScopeWords,
  sourceSummary,
}: {
  scopeKind: ScopeKind;
  onScopeKindChange: (k: ScopeKind) => void;
  selectedBelt: number;
  onBeltChange: (b: number) => void;
  selectedMission: number;
  onMissionChange: (m: number) => void;
  selectedSet: SetRef;
  onSetChange: (s: SetRef) => void;
  rangeFrom: number;
  rangeTo: number;
  onRangeFromChange: (n: number) => void;
  onRangeToChange: (n: number) => void;
  filters: Filters;
  onFiltersChange: (f: Filters) => void;
  totalScopeWords: number;
  sourceSummary: string;
}) {
  return (
    <Section
      step="1"
      icon={<Layers size={16} />}
      title="Choose Source"
      subtitle="Where to pull words from."
    >
      <ScopeKindTabs value={scopeKind} onChange={onScopeKindChange} />

      <div className="mt-4">
        {scopeKind === "all" && <AllScopeSummary />}
        {scopeKind === "belt" && (
          <ScopeBeltSelect value={selectedBelt} onChange={onBeltChange} />
        )}
        {scopeKind === "mission" && (
          <ScopeMissionSelect
            value={selectedMission}
            onChange={onMissionChange}
          />
        )}
        {scopeKind === "set" && (
          <ScopeSetSelect value={selectedSet} onChange={onSetChange} />
        )}
        {scopeKind === "range" && (
          <ScopeRangeSelect
            from={rangeFrom}
            to={rangeTo}
            onFromChange={onRangeFromChange}
            onToChange={onRangeToChange}
          />
        )}
      </div>

      {/* Compact filters */}
      <div className="mt-5 pt-4 border-t border-border">
        <FilterChips value={filters} onChange={onFiltersChange} />
      </div>

      {/* Source summary footer */}
      <div className="mt-4 pt-3 border-t border-border flex items-center justify-between gap-3 text-xs">
        <span className="text-muted-foreground">
          <span className="font-bold text-foreground">{sourceSummary}</span>
        </span>
        <span
          className={`tabular-nums font-extrabold px-2 py-1 rounded-full ${
            totalScopeWords === 0
              ? "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-200"
              : "bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-300"
          }`}
        >
          {totalScopeWords.toLocaleString()} words
        </span>
      </div>
    </Section>
  );
}

const SCOPE_KIND_TABS: Array<{
  id: ScopeKind;
  label: string;
  icon: React.ReactNode;
}> = [
  { id: "all", label: "All", icon: <Globe size={14} /> },
  { id: "belt", label: "Belt", icon: <Sparkles size={14} /> },
  { id: "mission", label: "Mission", icon: <Target size={14} /> },
  { id: "set", label: "Set", icon: <Boxes size={14} /> },
  { id: "range", label: "Range", icon: <ListOrdered size={14} /> },
];

function ScopeKindTabs({
  value,
  onChange,
}: {
  value: ScopeKind;
  onChange: (k: ScopeKind) => void;
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {SCOPE_KIND_TABS.map((t) => {
        const active = value === t.id;
        return (
          <button
            key={t.id}
            type="button"
            onClick={() => onChange(t.id)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              active
                ? "bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-300"
                : "bg-muted text-muted-foreground hover:bg-muted/70 hover:text-foreground"
            }`}
          >
            {t.icon}
            {t.label}
          </button>
        );
      })}
    </div>
  );
}

function AllScopeSummary() {
  return (
    <div className="rounded-xl border border-border bg-muted/40 px-4 py-3 text-xs text-foreground/80">
      <span className="font-bold">All {TOTAL_WORDS.toLocaleString()} words</span>{" "}
      across {TOTAL_BELTS} belts, {TOTAL_MISSIONS} missions and {TOTAL_SETS}{" "}
      sets. Question availability adapts to the words you have already met.
    </div>
  );
}

// ─── Single-select scope pickers with prev/next navigators ──────────────────

function ScopeBeltSelect({
  value,
  onChange,
}: {
  value: number;
  onChange: (b: number) => void;
}) {
  return (
    <NavSelect
      label="Belt"
      value={value}
      min={1}
      max={TOTAL_BELTS}
      onChange={onChange}
      renderOption={(b) => (
        <option key={b} value={b}>
          {BELT_NAMES[b - 1]}
        </option>
      )}
      options={Array.from({ length: TOTAL_BELTS }, (_, i) => i + 1)}
    />
  );
}

function ScopeMissionSelect({
  value,
  onChange,
}: {
  value: number;
  onChange: (m: number) => void;
}) {
  const allMissions = Array.from({ length: TOTAL_MISSIONS }, (_, i) => i + 1);
  return (
    <NavSelect
      label="Mission"
      value={value}
      min={1}
      max={TOTAL_MISSIONS}
      onChange={onChange}
      renderOption={(m) => (
        <option key={m} value={m}>
          Mission {m} · {BELT_NAMES[beltForMission(m) - 1]}
        </option>
      )}
      options={allMissions}
    />
  );
}

function ScopeSetSelect({
  value,
  onChange,
}: {
  value: SetRef;
  onChange: (s: SetRef) => void;
}) {
  const sets = setsForMission(value.day);
  const onMissionChange = (m: number) => {
    const first = setsForMission(m)[0];
    onChange(first);
  };
  return (
    <div className="space-y-3">
      <NavSelect
        label="Mission"
        value={value.day}
        min={1}
        max={TOTAL_MISSIONS}
        onChange={onMissionChange}
        options={Array.from({ length: TOTAL_MISSIONS }, (_, i) => i + 1)}
        renderOption={(m) => (
          <option key={m} value={m}>
            Mission {m}
          </option>
        )}
      />
      <NavSelect
        label="Set"
        value={value.group}
        min={sets[0]?.group ?? 1}
        max={sets[sets.length - 1]?.group ?? 3}
        onChange={(g) => onChange({ day: value.day, group: g })}
        options={sets.map((s) => s.group)}
        renderOption={(g) => (
          <option key={g} value={g}>
            Set {g}
          </option>
        )}
      />
    </div>
  );
}

function ScopeRangeSelect({
  from,
  to,
  onFromChange,
  onToChange,
}: {
  from: number;
  to: number;
  onFromChange: (n: number) => void;
  onToChange: (n: number) => void;
}) {
  const clamp = (n: number) => Math.max(1, Math.min(TOTAL_MISSIONS, n));
  return (
    <div className="grid grid-cols-2 gap-3">
      <NumberField
        label="From mission"
        value={from}
        min={1}
        max={to}
        onChange={(n) => onFromChange(clamp(Math.min(n, to)))}
      />
      <NumberField
        label="To mission"
        value={to}
        min={from}
        max={TOTAL_MISSIONS}
        onChange={(n) => onToChange(clamp(Math.max(n, from)))}
      />
    </div>
  );
}

function NavSelect<T extends number>({
  label,
  value,
  min,
  max,
  options,
  onChange,
  renderOption,
}: {
  label: string;
  value: T;
  min: number;
  max: number;
  options: T[];
  onChange: (v: T) => void;
  renderOption: (v: T) => React.ReactNode;
}) {
  const idx = options.indexOf(value);
  const prev = () => {
    if (idx > 0) onChange(options[idx - 1]);
  };
  const next = () => {
    if (idx >= 0 && idx < options.length - 1) onChange(options[idx + 1]);
  };
  return (
    <label className="block">
      <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wide">
        {label}
      </span>
      <div className="mt-1 flex items-stretch gap-1.5">
        <button
          type="button"
          onClick={prev}
          disabled={idx <= 0}
          className="px-2.5 rounded-xl bg-muted text-foreground/80 border border-border hover:bg-muted/70 disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label={`Previous ${label.toLowerCase()}`}
        >
          <ChevronLeft size={14} />
        </button>
        <select
          value={value}
          onChange={(e) => onChange(Number(e.target.value) as T)}
          className="flex-1 min-w-0 px-3 py-2 rounded-xl bg-card border border-border text-sm font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-orange-300/40"
        >
          {options.map(renderOption)}
        </select>
        <button
          type="button"
          onClick={next}
          disabled={idx < 0 || idx >= options.length - 1}
          className="px-2.5 rounded-xl bg-muted text-foreground/80 border border-border hover:bg-muted/70 disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label={`Next ${label.toLowerCase()}`}
        >
          <ChevronRight size={14} />
        </button>
      </div>
      <span className="sr-only">
        Range {min}–{max}
      </span>
    </label>
  );
}

function NumberField({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (n: number) => void;
}) {
  return (
    <label className="block">
      <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wide">
        {label}
      </span>
      <input
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={(e) => {
          const n = parseInt(e.target.value, 10);
          if (!Number.isNaN(n)) onChange(n);
        }}
        className="mt-1 w-full px-3 py-2 rounded-xl bg-card border border-border text-sm font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-orange-300/40"
      />
    </label>
  );
}

// ─── Filter chips (compact, inline in Source) ───────────────────────────────

const FILTER_CHIPS: Array<{
  key: keyof Filters;
  label: string;
  hint: string;
}> = [
  { key: "newOnly", label: "New", hint: "Words you have not learned yet." },
  {
    key: "mistakeOnly",
    label: "Mistakes",
    hint: "Words you have answered wrong before.",
  },
  {
    key: "difficultOnly",
    label: "Difficult",
    hint: "Words you marked difficult.",
  },
  { key: "dueOnly", label: "Due for review", hint: "Spaced-repetition due now." },
];

function FilterChips({
  value,
  onChange,
}: {
  value: Filters;
  onChange: (f: Filters) => void;
}) {
  const toggle = (k: keyof Filters) => {
    onChange({ ...value, [k]: !value[k] });
  };
  const anyOn = FILTER_CHIPS.some((c) => Boolean(value[c.key]));
  return (
    <div>
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-muted-foreground uppercase tracking-wide">
          <FilterIcon size={12} />
          Filters
        </span>
        {anyOn && (
          <button
            type="button"
            onClick={() => onChange({})}
            className="text-[11px] font-bold text-orange-600 hover:text-orange-700 dark:text-orange-400"
          >
            Clear filters
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-1.5">
        {FILTER_CHIPS.map((c) => {
          const active = Boolean(value[c.key]);
          return (
            <button
              key={c.key}
              type="button"
              onClick={() => toggle(c.key)}
              title={c.hint}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-[11px] font-bold border transition-colors ${
                active
                  ? "bg-orange-50 dark:bg-orange-500/10 text-orange-800 dark:text-orange-200 border-orange-300 dark:border-orange-500/40"
                  : "bg-muted/60 text-muted-foreground border-transparent hover:text-foreground"
              }`}
            >
              {active ? <CheckCircle2 size={11} /> : <Circle size={11} />}
              {c.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Step 2 — Question Mix
// ─────────────────────────────────────────────────────────────────────────────

const GROUP_META: Record<
  TestQuestionGroup,
  { letter: string; label: string; tone: string }
> = {
  MCQ: {
    letter: "A",
    label: "Multiple Choice",
    tone: "from-violet-500 to-fuchsia-500",
  },
  "Fill in the Blank": {
    letter: "B",
    label: "Written Recall",
    tone: "from-orange-500 to-pink-500",
  },
  "Synonym Pairing": {
    letter: "C",
    label: "Select All",
    tone: "from-cyan-500 to-blue-500",
  },
  "True / False": {
    letter: "D",
    label: "True / False",
    tone: "from-emerald-500 to-teal-500",
  },
};

const TYPE_ICONS: Record<TestQuestionType, React.ReactNode> = {
  "word-to-def": <ListChecks size={12} />,
  "def-to-word": <ListChecks size={12} />,
  "synonym-mcq": <Sparkles size={12} />,
  "antonym-mcq": <Sparkles size={12} />,
  "fill-blank": <Hash size={12} />,
  "synonym-pair": <Boxes size={12} />,
  "tf-definition": <CheckCircle2 size={12} />,
  "tf-synonym": <CheckCircle2 size={12} />,
  "tf-antonym": <CheckCircle2 size={12} />,
};

function QuestionMixStep({
  availability,
  totalScopeWords,
  counts,
  onCountsChange,
  onApplyPreset,
  onApplyAllAvailable,
  onClearAll,
  totalAvailable,
  totalQuestions,
}: {
  availability: AvailabilityByType;
  totalScopeWords: number;
  counts: CountsByType;
  onCountsChange: (c: CountsByType) => void;
  onApplyPreset: (p: MixPreset) => void;
  onApplyAllAvailable: () => void;
  onClearAll: () => void;
  totalAvailable: number;
  totalQuestions: number;
}) {
  const setCount = (t: TestQuestionType, n: number) => {
    const have = availability[t];
    const next: CountsByType = { ...counts };
    const clamped = Math.max(0, Math.min(have, Math.floor(n)));
    if (clamped === 0) {
      delete next[t];
    } else {
      next[t] = clamped;
    }
    onCountsChange(next);
  };

  const sourceEmpty = totalScopeWords === 0;

  return (
    <Section
      step="2"
      icon={<ListChecks size={16} />}
      title="Choose Question Mix"
      subtitle="Pick how many of each type to include. Each row caps at the live availability."
    >
      {/* Presets */}
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-muted-foreground uppercase tracking-wide mr-1">
          <Wand2 size={12} />
          Presets
        </span>
        {MIX_PRESETS.map((p) => (
          <PresetButton
            key={p.id}
            label={p.label}
            disabled={sourceEmpty}
            title={p.description}
            onClick={() => onApplyPreset(p)}
          />
        ))}
        <PresetButton
          label="All Available"
          disabled={sourceEmpty || totalAvailable === 0}
          title={`Add every available question (${totalAvailable.toLocaleString()})`}
          onClick={onApplyAllAvailable}
        />
        <PresetButton
          label="Clear All"
          variant="ghost"
          disabled={totalQuestions === 0}
          onClick={onClearAll}
        />
      </div>

      {/* Empty state when no words selected */}
      {sourceEmpty ? (
        <div className="mt-4 rounded-xl border border-dashed border-border bg-muted/30 px-4 py-6 text-center">
          <p className="text-xs text-muted-foreground">
            Pick a source above to see which question types are available.
          </p>
        </div>
      ) : (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
          {TEST_QUESTION_GROUP_ORDER.map((group) => (
            <MixGroup
              key={group}
              group={group}
              counts={counts}
              availability={availability}
              onSetCount={setCount}
            />
          ))}
        </div>
      )}
    </Section>
  );
}

function PresetButton({
  label,
  onClick,
  disabled,
  variant,
  title,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  variant?: "ghost";
  title?: string;
}) {
  const base =
    "inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-[11px] font-bold transition-colors disabled:opacity-40 disabled:cursor-not-allowed";
  const cls =
    variant === "ghost"
      ? `${base} bg-transparent text-muted-foreground hover:text-foreground hover:bg-muted/60`
      : `${base} bg-orange-50 text-orange-700 border border-orange-200 hover:bg-orange-100 dark:bg-orange-500/10 dark:text-orange-200 dark:border-orange-500/30`;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={cls}
    >
      {label}
    </button>
  );
}

function MixGroup({
  group,
  counts,
  availability,
  onSetCount,
}: {
  group: TestQuestionGroup;
  counts: CountsByType;
  availability: AvailabilityByType;
  onSetCount: (t: TestQuestionType, n: number) => void;
}) {
  const meta = GROUP_META[group];
  const types = questionTypesByGroup()[group];
  const groupTotal = types.reduce((sum, t) => sum + (counts[t] ?? 0), 0);

  return (
    <div className="rounded-2xl border border-border bg-muted/20 p-3 space-y-2">
      <div className="flex items-center justify-between gap-2 px-1">
        <div className="flex items-center gap-2 min-w-0">
          <span
            className={`inline-flex items-center justify-center w-5 h-5 rounded-md bg-gradient-to-br ${meta.tone} text-white text-[10px] font-extrabold shrink-0`}
          >
            {meta.letter}
          </span>
          <h4 className="text-xs font-extrabold text-foreground truncate">
            {meta.label}
          </h4>
        </div>
        <span className="text-[10px] tabular-nums font-bold text-muted-foreground">
          {groupTotal} picked
        </span>
      </div>
      <div className="space-y-1.5">
        {types.map((t) => (
          <MixRow
            key={t}
            type={t}
            count={counts[t] ?? 0}
            available={availability[t]}
            onChange={(n) => onSetCount(t, n)}
          />
        ))}
      </div>
    </div>
  );
}

function MixRow({
  type,
  count,
  available,
  onChange,
}: {
  type: TestQuestionType;
  count: number;
  available: number;
  onChange: (n: number) => void;
}) {
  const meta = TEST_QUESTION_TYPE_META[type];
  const disabled = available === 0;
  return (
    <div
      className={`rounded-xl border bg-card px-2.5 py-2 flex items-center gap-2.5 ${
        disabled ? "opacity-60 border-dashed" : "border-border"
      }`}
    >
      <span
        className="w-6 h-6 rounded-md bg-muted text-foreground/80 flex items-center justify-center shrink-0"
        title={meta.description}
      >
        {TYPE_ICONS[type]}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <span className="text-[12px] font-extrabold text-foreground truncate">
            {meta.short}
          </span>
          <span
            className={`text-[10px] tabular-nums font-bold px-1.5 py-0.5 rounded-full ${
              disabled
                ? "bg-muted text-muted-foreground"
                : "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300"
            }`}
            title="Maximum available for current source"
          >
            {available} avail
          </span>
        </div>
        <p className="text-[10.5px] text-muted-foreground leading-snug truncate">
          {disabled ? "No questions available for this source." : meta.description}
        </p>
      </div>
      <CountStepper
        value={count}
        max={available}
        disabled={disabled}
        onChange={onChange}
      />
    </div>
  );
}

function CountStepper({
  value,
  max,
  disabled,
  onChange,
}: {
  value: number;
  max: number;
  disabled?: boolean;
  onChange: (n: number) => void;
}) {
  const dec = () => onChange(Math.max(0, value - 1));
  const inc = () => onChange(Math.min(max, value + 1));
  const setMax = () => onChange(max);
  return (
    <div className="flex items-center gap-1 shrink-0">
      <button
        type="button"
        onClick={dec}
        disabled={disabled || value <= 0}
        className="w-7 h-7 rounded-lg bg-muted text-foreground/80 border border-border hover:bg-muted/70 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center"
        aria-label="Decrease count"
      >
        <Minus size={12} />
      </button>
      <input
        type="number"
        min={0}
        max={max}
        value={value}
        disabled={disabled}
        onChange={(e) => {
          const n = parseInt(e.target.value, 10);
          if (Number.isNaN(n)) return;
          onChange(Math.max(0, Math.min(max, n)));
        }}
        className="w-10 text-center text-xs font-extrabold tabular-nums px-1 py-1 rounded-lg bg-card border border-border focus:outline-none focus:ring-2 focus:ring-orange-300/40 disabled:opacity-50"
      />
      <button
        type="button"
        onClick={inc}
        disabled={disabled || value >= max}
        className="w-7 h-7 rounded-lg bg-muted text-foreground/80 border border-border hover:bg-muted/70 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center"
        aria-label="Increase count"
      >
        <Plus size={12} />
      </button>
      <button
        type="button"
        onClick={setMax}
        disabled={disabled || value === max}
        className="text-[10px] font-extrabold px-1.5 py-1 rounded-md text-orange-600 hover:bg-orange-50 dark:text-orange-300 dark:hover:bg-orange-500/10 disabled:opacity-30 disabled:cursor-not-allowed"
        title="Set to max available"
      >
        Max
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Final Options — compact 4-toggle row, visually merged with Question Mix
// ─────────────────────────────────────────────────────────────────────────────

function FinalOptionsCard({
  config,
  onChange,
}: {
  config: SessionConfig;
  onChange: (c: SessionConfig) => void;
}) {
  const set = <K extends keyof SessionConfig>(
    key: K,
    value: SessionConfig[K],
  ) => onChange({ ...config, [key]: value });

  return (
    <section className="rounded-2xl border border-border bg-card shadow-sm p-5">
      <header className="flex items-center justify-between gap-2 mb-3">
        <div className="inline-flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-muted text-foreground/80 flex items-center justify-center">
            <Gauge size={14} />
          </span>
          <h3 className="text-sm font-extrabold text-foreground">
            Final Options
          </h3>
        </div>
        <span className="text-[11px] text-muted-foreground">
          Tweak how this session feels.
        </span>
      </header>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
        <OptionToggle
          icon={<Shuffle size={14} />}
          label="Shuffle"
          description="Mix question order across types."
          value={config.shuffle}
          onChange={(v) => set("shuffle", v)}
        />
        <OptionToggle
          icon={<Hourglass size={14} />}
          label="Show Timer"
          description="Display elapsed time in the header."
          value={config.showTimer}
          onChange={(v) => set("showTimer", v)}
        />
        <OptionToggle
          icon={<Lightbulb size={14} />}
          label="Hints"
          description="Allow the in-question Hint button."
          value={config.showHints}
          onChange={(v) => set("showHints", v)}
        />
        <OptionToggle
          icon={<Hash size={14} />}
          label="Confidence"
          description="Ask for confidence after each answer."
          value={config.confidenceRating}
          onChange={(v) => set("confidenceRating", v)}
        />
      </div>
    </section>
  );
}

function OptionToggle({
  icon,
  label,
  description,
  value,
  onChange,
}: {
  icon: React.ReactNode;
  label: string;
  description: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!value)}
      aria-pressed={value}
      className={`text-left rounded-xl border p-3 transition-colors ${
        value
          ? "bg-orange-50 dark:bg-orange-500/10 border-orange-300 dark:border-orange-500/40"
          : "bg-muted/40 border-border hover:bg-muted/60"
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <span
          className={`inline-flex items-center gap-1.5 text-xs font-extrabold ${
            value
              ? "text-orange-800 dark:text-orange-200"
              : "text-foreground/80"
          }`}
        >
          <span
            className={`w-6 h-6 rounded-md flex items-center justify-center ${
              value
                ? "bg-orange-200/80 text-orange-900 dark:bg-orange-500/30 dark:text-orange-100"
                : "bg-card text-foreground/60 border border-border"
            }`}
          >
            {icon}
          </span>
          {label}
        </span>
        <span
          className={`relative inline-flex h-5 w-9 rounded-full transition-colors ${
            value ? "bg-orange-500" : "bg-muted-foreground/30"
          }`}
        >
          <span
            className={`absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${
              value ? "translate-x-4" : "translate-x-0"
            }`}
          />
        </span>
      </div>
      <p className="text-[11px] text-muted-foreground mt-1.5 leading-snug">
        {description}
      </p>
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Right sidebar cards
// ─────────────────────────────────────────────────────────────────────────────

function SessionSummaryCard({
  sourceSummary,
  totalScopeWords,
  counts,
  totalQuestions,
  shuffle,
}: {
  sourceSummary: string;
  totalScopeWords: number;
  counts: CountsByType;
  totalQuestions: number;
  shuffle: boolean;
}) {
  const picked = ALL_TEST_QUESTION_TYPES.filter((t) => (counts[t] ?? 0) > 0);
  return (
    <section className="rounded-2xl border border-border bg-card shadow-sm p-5">
      <h3 className="text-xs font-extrabold text-foreground uppercase tracking-wider mb-3">
        Session Summary
      </h3>
      <dl className="space-y-2 text-xs">
        <SummaryRow label="Source" value={sourceSummary} strong />
        <SummaryRow
          label="Words in scope"
          value={totalScopeWords.toLocaleString()}
        />
        <SummaryRow
          label="Total questions"
          value={totalQuestions.toLocaleString()}
          strong
        />
        <SummaryRow label="Order" value={shuffle ? "Shuffled" : "In sequence"} />
      </dl>
      {picked.length > 0 && (
        <div className="mt-3 pt-3 border-t border-border">
          <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-2">
            Selected mix
          </p>
          <ul className="space-y-1.5">
            {picked.map((t) => {
              const meta = TEST_QUESTION_TYPE_META[t];
              return (
                <li
                  key={t}
                  className="flex items-center justify-between gap-2 text-xs"
                >
                  <span className="inline-flex items-center gap-1.5 min-w-0">
                    <span className="text-muted-foreground/80 shrink-0">
                      {TYPE_ICONS[t]}
                    </span>
                    <span className="truncate font-bold text-foreground/80">
                      {meta.short}
                    </span>
                  </span>
                  <span className="tabular-nums font-extrabold text-foreground shrink-0">
                    {counts[t]}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </section>
  );
}

function SummaryRow({
  label,
  value,
  strong,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <dt className="text-muted-foreground">{label}</dt>
      <dd
        className={`text-right truncate ${
          strong
            ? "font-extrabold text-foreground"
            : "font-bold text-foreground/80"
        }`}
      >
        {value}
      </dd>
    </div>
  );
}

function AvailabilityCard({
  availability,
  counts,
  totalAvailable,
}: {
  availability: AvailabilityByType;
  counts: CountsByType;
  totalAvailable: number;
}) {
  const max = Math.max(1, ...ALL_TEST_QUESTION_TYPES.map((t) => availability[t]));
  return (
    <section className="rounded-2xl border border-border bg-card shadow-sm p-5">
      <h3 className="text-xs font-extrabold text-foreground uppercase tracking-wider mb-3">
        Availability
      </h3>
      <ul className="space-y-2">
        {ALL_TEST_QUESTION_TYPES.map((t) => {
          const meta = TEST_QUESTION_TYPE_META[t];
          const have = availability[t];
          const used = counts[t] ?? 0;
          const pct = max === 0 ? 0 : (have / max) * 100;
          const usedPct = max === 0 ? 0 : (used / max) * 100;
          return (
            <li key={t}>
              <div className="flex items-center justify-between gap-2 text-[11px]">
                <span className="inline-flex items-center gap-1.5 min-w-0 text-foreground/80">
                  <span className="text-muted-foreground/70 shrink-0">
                    {TYPE_ICONS[t]}
                  </span>
                  <span className="truncate font-bold">{meta.short}</span>
                </span>
                <span className="tabular-nums font-extrabold text-foreground shrink-0">
                  {used > 0 ? `${used} / ${have}` : have}
                </span>
              </div>
              <div className="mt-1 h-1.5 w-full bg-muted rounded-full overflow-hidden relative">
                <div
                  className={`h-full ${
                    have === 0 ? "bg-rose-300/40" : "bg-emerald-400/60"
                  }`}
                  style={{ width: `${pct}%` }}
                />
                {used > 0 && (
                  <div
                    className="absolute inset-y-0 left-0 h-full bg-orange-500"
                    style={{ width: `${usedPct}%` }}
                  />
                )}
              </div>
            </li>
          );
        })}
      </ul>
      <p className="mt-3 pt-3 border-t border-border text-[11px] text-muted-foreground">
        <span className="font-extrabold text-foreground tabular-nums">
          {totalAvailable.toLocaleString()}
        </span>{" "}
        total available questions
      </p>
    </section>
  );
}

function SamplePreviewCard({
  sample,
  total,
}: {
  sample: ReturnType<typeof selectWords>;
  total: number;
}) {
  if (total === 0) {
    return (
      <section className="rounded-2xl border border-dashed border-border bg-card/50 p-5">
        <h3 className="inline-flex items-center gap-1.5 text-xs font-extrabold text-foreground uppercase tracking-wider">
          <Eye size={12} />
          Sample
        </h3>
        <p className="mt-2 text-xs text-muted-foreground">
          Adjust the source to see a preview of words you’ll practice.
        </p>
      </section>
    );
  }
  return (
    <section className="rounded-2xl border border-border bg-card shadow-sm p-5">
      <div className="flex items-center justify-between mb-2">
        <h3 className="inline-flex items-center gap-1.5 text-xs font-extrabold text-foreground uppercase tracking-wider">
          <Eye size={12} />
          Sample preview
        </h3>
        <span className="text-[10px] text-muted-foreground tabular-nums">
          {sample.length} of {total.toLocaleString()}
        </span>
      </div>
      <ul className="space-y-1.5">
        {sample.map((w) => (
          <li
            key={w.id}
            className="flex items-center justify-between gap-3 text-xs"
          >
            <span className="font-bold text-foreground truncate">{w.word}</span>
            <span className="text-muted-foreground shrink-0 text-[10px] tabular-nums">
              M{w.day} · S{w.group}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function StartCard({
  totalQuestions,
  disabled,
  disabledReason,
  onStart,
  confidenceRating,
}: {
  totalQuestions: number;
  disabled: boolean;
  disabledReason: string | null;
  onStart: () => void;
  confidenceRating: boolean;
}) {
  return (
    <section className="rounded-2xl border border-border bg-card shadow-sm p-5">
      <button
        type="button"
        disabled={disabled}
        onClick={onStart}
        className="w-full inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-extrabold btn-brand disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
      >
        {totalQuestions > 0
          ? `Start Practice · ${totalQuestions} question${totalQuestions === 1 ? "" : "s"}`
          : "Start Practice"}
        <ChevronRight size={16} />
      </button>
      <p className="mt-2 text-[11px] text-muted-foreground text-center">
        {disabled && disabledReason ? (
          <span className="inline-flex items-center gap-1.5 text-amber-700 dark:text-amber-300 font-bold">
            <AlertCircle size={11} />
            {disabledReason}
          </span>
        ) : totalQuestions > 0 ? (
          <>
            {totalQuestions} question{totalQuestions === 1 ? "" : "s"} ready ·
            Immediate feedback
            {confidenceRating ? " · confidence rating" : ""}
          </>
        ) : (
          "Pick a preset to get started fast."
        )}
      </p>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Section wrapper (numbered step)
// ─────────────────────────────────────────────────────────────────────────────

function Section({
  step,
  icon,
  title,
  subtitle,
  children,
}: {
  step?: string;
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-border bg-card shadow-sm p-5">
      <header className="flex items-start gap-3 mb-4">
        <div className="flex items-center gap-2 shrink-0">
          {step && (
            <span className="w-7 h-7 rounded-lg bg-brand-gradient text-white text-xs font-extrabold flex items-center justify-center shadow-sm">
              {step}
            </span>
          )}
          <div className="w-8 h-8 rounded-lg bg-muted text-foreground/80 flex items-center justify-center">
            {icon}
          </div>
        </div>
        <div className="min-w-0">
          <h3 className="text-sm font-extrabold text-foreground">{title}</h3>
          {subtitle && (
            <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
          )}
        </div>
      </header>
      {children}
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Start button — small variant kept for Quick Practice tiles
// ─────────────────────────────────────────────────────────────────────────────

function StartButton({
  small,
  disabled,
  onClick,
  label,
}: {
  small?: boolean;
  disabled?: boolean;
  onClick: () => void;
  label?: string;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      title={disabled ? "No words match this preset yet." : "Start practice"}
      className={`inline-flex items-center justify-center gap-1.5 rounded-xl font-extrabold transition-colors btn-brand disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none px-3.5 py-2 text-xs`}
    >
      {label ?? "Start"}
      <ChevronRight size={small ? 14 : 16} />
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Source summary helper
// ─────────────────────────────────────────────────────────────────────────────

function describeSourceShort(scope: Scope): string {
  switch (scope.kind) {
    case "all":
      return "All words";
    case "belt": {
      const id = scope.beltIds[0] ?? 1;
      return `${BELT_NAMES[id - 1]} · ${missionsForBelt(id).length} missions`;
    }
    case "mission": {
      const m = scope.missionDays[0] ?? 1;
      return `Mission ${m} · ${BELT_NAMES[beltForMission(m) - 1]}`;
    }
    case "set": {
      const s = scope.sets[0];
      if (!s) return "No set";
      return `Mission ${s.day} · Set ${s.group}`;
    }
    case "range":
      return `Missions ${scope.fromDay}–${scope.toDay}`;
  }
}
