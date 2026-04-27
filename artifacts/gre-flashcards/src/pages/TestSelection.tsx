import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Zap,
  SlidersHorizontal,
  Shuffle,
  Filter,
  Layers,
  Target,
  Boxes,
  Globe,
  ListOrdered,
  Sparkles,
  ChevronRight,
  CheckCircle2,
  Circle,
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { TOTAL_DAYS } from "@/data/words";
import {
  type Filters,
  type QuickPreset,
  type Scope,
  type ScopeKind,
  type SetRef,
  type SelectionRequest,
  BELT_NAMES,
  QUICK_PRESETS,
  TOTAL_BELTS,
  allBelts,
  beltForMission,
  countSelection,
  describeScope,
  hasAnyFilter,
  missionsForBelt,
  quickPresetRequest,
  selectWords,
  setsForMission,
} from "@/lib/wordSelection";

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
    : "Build your own session.";
  const subtitle = isQuick
    ? "Each preset pulls from the words that need attention right now."
    : "Combine belts, missions, sets and ranges with category filters and a shuffle toggle.";

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

// ─── Custom Practice ────────────────────────────────────────────────────────

function CustomPracticePanel({
  onNavigate,
}: {
  onNavigate: (page: string, params?: Record<string, unknown>) => void;
}) {
  const { words } = useApp();

  // Scope state — keep one piece of state per scope kind so users can switch
  // tabs without losing prior selections.
  const [scopeKind, setScopeKind] = useState<ScopeKind>("all");
  const [selectedBelts, setSelectedBelts] = useState<number[]>([]);
  const [selectedMissions, setSelectedMissions] = useState<number[]>([]);
  const [selectedSets, setSelectedSets] = useState<SetRef[]>([]);
  const [rangeFrom, setRangeFrom] = useState<number>(1);
  const [rangeTo, setRangeTo] = useState<number>(7);

  // Filters + options
  const [filters, setFilters] = useState<Filters>({});
  const [shuffle, setShuffle] = useState<boolean>(true);
  const [limitEnabled, setLimitEnabled] = useState<boolean>(true);
  const [limit, setLimit] = useState<number>(20);

  // For the mission picker we let the user filter by belt without changing
  // the scope kind.
  const [missionPickerBelt, setMissionPickerBelt] = useState<number>(1);
  const [setPickerMission, setSetPickerMission] = useState<number>(1);

  const scope: Scope = useMemo(() => {
    switch (scopeKind) {
      case "all":
        return { kind: "all" };
      case "belt":
        return { kind: "belt", beltIds: selectedBelts };
      case "mission":
        return { kind: "mission", missionDays: selectedMissions };
      case "set":
        return { kind: "set", sets: selectedSets };
      case "range":
        return { kind: "range", fromDay: rangeFrom, toDay: rangeTo };
    }
  }, [
    scopeKind,
    selectedBelts,
    selectedMissions,
    selectedSets,
    rangeFrom,
    rangeTo,
  ]);

  const request: SelectionRequest = useMemo(
    () => ({
      scope,
      filters,
      shuffle,
      limit: limitEnabled ? limit : undefined,
    }),
    [scope, filters, shuffle, limitEnabled, limit],
  );

  const totalBeforeLimit = useMemo(
    () => countSelection(words, { scope, filters }),
    [words, scope, filters],
  );

  const finalSelection = useMemo(
    () => selectWords(words, request),
    [words, request],
  );

  const previewSample = finalSelection.slice(0, 12);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      {/* ── Left: Builder ─────────────────────────────────────── */}
      <div className="lg:col-span-2 space-y-5">
        {/* Source */}
        <Section
          icon={<Layers size={16} />}
          title="Source"
          subtitle="Where to pull words from."
        >
          <ScopeKindTabs value={scopeKind} onChange={setScopeKind} />
          <div className="mt-4">
            {scopeKind === "all" && <AllScopeSummary />}
            {scopeKind === "belt" && (
              <BeltPicker
                selected={selectedBelts}
                onChange={setSelectedBelts}
              />
            )}
            {scopeKind === "mission" && (
              <MissionPicker
                belt={missionPickerBelt}
                onBeltChange={setMissionPickerBelt}
                selected={selectedMissions}
                onChange={setSelectedMissions}
              />
            )}
            {scopeKind === "set" && (
              <SetPicker
                missionDay={setPickerMission}
                onMissionChange={setSetPickerMission}
                selected={selectedSets}
                onChange={setSelectedSets}
              />
            )}
            {scopeKind === "range" && (
              <RangePicker
                from={rangeFrom}
                to={rangeTo}
                onFromChange={setRangeFrom}
                onToChange={setRangeTo}
              />
            )}
          </div>
        </Section>

        {/* Filters */}
        <Section
          icon={<Filter size={16} />}
          title="Filters"
          subtitle="Optional — narrow the selection by word category."
        >
          <FilterToggles value={filters} onChange={setFilters} />
        </Section>

        {/* Options */}
        <Section
          icon={<SlidersHorizontal size={16} />}
          title="Options"
          subtitle="Order and size of the session."
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ToggleRow
              icon={<Shuffle size={14} />}
              label="Shuffle words"
              description="Randomize the order each session."
              value={shuffle}
              onChange={setShuffle}
            />
            <LimitField
              enabled={limitEnabled}
              limit={limit}
              max={Math.max(totalBeforeLimit, 1)}
              onEnabledChange={setLimitEnabled}
              onLimitChange={setLimit}
            />
          </div>
        </Section>
      </div>

      {/* ── Right: Live preview ───────────────────────────────── */}
      <aside className="lg:col-span-1">
        <div className="lg:sticky lg:top-4 space-y-4">
          <SelectionSummary
            request={request}
            totalBeforeLimit={totalBeforeLimit}
            finalCount={finalSelection.length}
          />
          <PreviewList sample={previewSample} total={finalSelection.length} />
          <StartButton
            fullWidth
            disabled={finalSelection.length === 0}
            onClick={() =>
              onNavigate("practice", {
                wordIds: finalSelection.map((w) => w.id),
                sessionTitle: "Custom Practice",
              })
            }
          />
        </div>
      </aside>
    </div>
  );
}

// ─── Section wrapper ────────────────────────────────────────────────────────

function Section({
  icon,
  title,
  subtitle,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-border bg-card shadow-sm p-5">
      <header className="flex items-start gap-3 mb-4">
        <div className="w-8 h-8 rounded-lg bg-muted text-foreground/80 flex items-center justify-center shrink-0">
          {icon}
        </div>
        <div>
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

// ─── Scope kind tabs ────────────────────────────────────────────────────────

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
    <p className="text-xs text-muted-foreground">
      Every word in the deck — all 6 belts, 42 missions, {TOTAL_DAYS} days,{" "}
      {TOTAL_DAYS * 30} words.
    </p>
  );
}

// ─── Belt picker (multi-select for mixed) ───────────────────────────────────

function BeltPicker({
  selected,
  onChange,
}: {
  selected: number[];
  onChange: (next: number[]) => void;
}) {
  const toggle = (id: number) => {
    onChange(
      selected.includes(id)
        ? selected.filter((b) => b !== id)
        : [...selected, id].sort((a, b) => a - b),
    );
  };
  const allOn = selected.length === TOTAL_BELTS;
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wide">
          Pick one or more belts
        </span>
        <button
          type="button"
          onClick={() => onChange(allOn ? [] : allBelts())}
          className="text-[11px] font-bold text-orange-600 hover:text-orange-700 dark:text-orange-400"
        >
          {allOn ? "Clear" : "Select all"}
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {allBelts().map((b) => {
          const active = selected.includes(b);
          return (
            <button
              key={b}
              type="button"
              onClick={() => toggle(b)}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-bold transition-colors ${
                active
                  ? "bg-orange-50 dark:bg-orange-500/10 border-orange-300 dark:border-orange-500/40 text-orange-800 dark:text-orange-200"
                  : "bg-card border-border text-foreground/80 hover:bg-muted"
              }`}
            >
              {active ? (
                <CheckCircle2 size={14} className="text-orange-500 shrink-0" />
              ) : (
                <Circle size={14} className="text-muted-foreground shrink-0" />
              )}
              <span className="truncate">{BELT_NAMES[b - 1]}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Mission picker (multi-select) ──────────────────────────────────────────

function MissionPicker({
  belt,
  onBeltChange,
  selected,
  onChange,
}: {
  belt: number;
  onBeltChange: (b: number) => void;
  selected: number[];
  onChange: (next: number[]) => void;
}) {
  const missions = missionsForBelt(belt);
  const toggle = (day: number) => {
    onChange(
      selected.includes(day)
        ? selected.filter((d) => d !== day)
        : [...selected, day].sort((a, b) => a - b),
    );
  };
  const allInBeltOn = missions.every((d) => selected.includes(d));
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-2">
        <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wide">
          Filter by belt
        </span>
        <div className="flex flex-wrap gap-1">
          {allBelts().map((b) => (
            <button
              key={b}
              type="button"
              onClick={() => onBeltChange(b)}
              className={`px-2 py-1 rounded-lg text-[11px] font-bold transition-colors ${
                belt === b
                  ? "bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-300"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {BELT_NAMES[b - 1].replace(" Belt", "")}
            </button>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wide">
          Missions in {BELT_NAMES[belt - 1]}
        </span>
        <button
          type="button"
          onClick={() =>
            onChange(
              allInBeltOn
                ? selected.filter((d) => !missions.includes(d))
                : Array.from(new Set([...selected, ...missions])).sort(
                    (a, b) => a - b,
                  ),
            )
          }
          className="text-[11px] font-bold text-orange-600 hover:text-orange-700 dark:text-orange-400"
        >
          {allInBeltOn ? "Clear belt" : "Select belt"}
        </button>
      </div>
      <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5">
        {missions.map((day) => {
          const active = selected.includes(day);
          return (
            <button
              key={day}
              type="button"
              onClick={() => toggle(day)}
              className={`px-2 py-2 rounded-lg text-xs font-bold transition-colors ${
                active
                  ? "bg-orange-50 dark:bg-orange-500/10 border border-orange-300 dark:border-orange-500/40 text-orange-800 dark:text-orange-200"
                  : "bg-muted/50 border border-border text-foreground/80 hover:bg-muted"
              }`}
            >
              M{day}
            </button>
          );
        })}
      </div>
      {selected.length > 0 && (
        <p className="text-[11px] text-muted-foreground">
          {selected.length} mission{selected.length === 1 ? "" : "s"} selected
          {selected.length > 1 && " (mixed)"}
        </p>
      )}
    </div>
  );
}

// ─── Set picker (multi-select for mixed) ────────────────────────────────────

function SetPicker({
  missionDay,
  onMissionChange,
  selected,
  onChange,
}: {
  missionDay: number;
  onMissionChange: (d: number) => void;
  selected: SetRef[];
  onChange: (next: SetRef[]) => void;
}) {
  const sets = setsForMission(missionDay);
  const isSelected = (s: SetRef) =>
    selected.some((x) => x.day === s.day && x.group === s.group);
  const toggle = (s: SetRef) => {
    onChange(
      isSelected(s)
        ? selected.filter((x) => !(x.day === s.day && x.group === s.group))
        : [...selected, s].sort(
            (a, b) => a.day - b.day || a.group - b.group,
          ),
    );
  };
  const beltOfMission = beltForMission(missionDay);
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wide">
          Mission
        </label>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onMissionChange(Math.max(1, missionDay - 1))}
            disabled={missionDay <= 1}
            className="px-2 py-1 rounded-lg bg-muted text-foreground/80 hover:bg-muted/70 disabled:opacity-40 text-xs font-bold"
          >
            −
          </button>
          <span className="text-sm font-extrabold text-foreground min-w-[3.5rem] text-center">
            M{missionDay}
          </span>
          <button
            type="button"
            onClick={() =>
              onMissionChange(Math.min(TOTAL_DAYS, missionDay + 1))
            }
            disabled={missionDay >= TOTAL_DAYS}
            className="px-2 py-1 rounded-lg bg-muted text-foreground/80 hover:bg-muted/70 disabled:opacity-40 text-xs font-bold"
          >
            +
          </button>
        </div>
      </div>
      <p className="text-[11px] text-muted-foreground -mt-1">
        {BELT_NAMES[beltOfMission - 1]} · {sets.length} sets
      </p>
      <div className="grid grid-cols-3 gap-2">
        {sets.map((s) => {
          const active = isSelected(s);
          return (
            <button
              key={`${s.day}-${s.group}`}
              type="button"
              onClick={() => toggle(s)}
              className={`px-3 py-2 rounded-xl border text-xs font-bold transition-colors ${
                active
                  ? "bg-orange-50 dark:bg-orange-500/10 border-orange-300 dark:border-orange-500/40 text-orange-800 dark:text-orange-200"
                  : "bg-card border-border text-foreground/80 hover:bg-muted"
              }`}
            >
              Set {s.group}
            </button>
          );
        })}
      </div>
      {selected.length > 0 && (
        <div className="flex items-start justify-between gap-2 pt-1">
          <p className="text-[11px] text-muted-foreground">
            {selected.length} set{selected.length === 1 ? "" : "s"} selected
            {selected.length > 1 && " (mixed)"}
          </p>
          <button
            type="button"
            onClick={() => onChange([])}
            className="text-[11px] font-bold text-orange-600 hover:text-orange-700 dark:text-orange-400"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Range picker ───────────────────────────────────────────────────────────

function RangePicker({
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
  const clamp = (n: number) => Math.max(1, Math.min(TOTAL_DAYS, n));
  const lo = Math.min(from, to);
  const hi = Math.max(from, to);
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <NumberField
          label="From mission"
          value={from}
          min={1}
          max={TOTAL_DAYS}
          onChange={(n) => onFromChange(clamp(n))}
        />
        <NumberField
          label="To mission"
          value={to}
          min={1}
          max={TOTAL_DAYS}
          onChange={(n) => onToChange(clamp(n))}
        />
      </div>
      <div className="flex flex-wrap gap-1.5">
        {[
          { label: "M1–M7 (White)", from: 1, to: 7 },
          { label: "M8–M14 (Yellow)", from: 8, to: 14 },
          { label: "M15–M21 (Green)", from: 15, to: 21 },
          { label: "M22–M28 (Blue)", from: 22, to: 28 },
          { label: "M29–M35 (Purple)", from: 29, to: 35 },
          { label: "M36–M42 (Black)", from: 36, to: 42 },
          { label: "All M1–M42", from: 1, to: TOTAL_DAYS },
        ].map((preset) => (
          <button
            key={preset.label}
            type="button"
            onClick={() => {
              onFromChange(preset.from);
              onToChange(preset.to);
            }}
            className="px-2.5 py-1 rounded-lg bg-muted text-[11px] font-bold text-muted-foreground hover:text-foreground hover:bg-muted/70"
          >
            {preset.label}
          </button>
        ))}
      </div>
      <p className="text-[11px] text-muted-foreground">
        Active range: missions {lo}–{hi} ({hi - lo + 1} mission
        {hi - lo === 0 ? "" : "s"})
      </p>
    </div>
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
          const n = Number(e.target.value);
          if (!Number.isFinite(n)) return;
          onChange(n);
        }}
        className="mt-1 w-full px-3 py-2 rounded-xl border border-border bg-background text-sm font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-orange-300 dark:focus:ring-orange-500/40"
      />
    </label>
  );
}

// ─── Filter toggles ─────────────────────────────────────────────────────────

const FILTER_OPTIONS: Array<{
  id: keyof Filters;
  label: string;
  description: string;
}> = [
  {
    id: "newOnly",
    label: "New words only",
    description: "Words you haven't started yet.",
  },
  {
    id: "mistakeOnly",
    label: "Mistake words only",
    description: "Words you've answered incorrectly at least once.",
  },
  {
    id: "difficultOnly",
    label: "Difficult words only",
    description: "High difficulty score or repeat misses.",
  },
  {
    id: "dueOnly",
    label: "Due for review only",
    description: "Currently scheduled by spaced repetition.",
  },
];

function FilterToggles({
  value,
  onChange,
}: {
  value: Filters;
  onChange: (next: Filters) => void;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      {FILTER_OPTIONS.map((opt) => {
        const active = Boolean(value[opt.id]);
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => onChange({ ...value, [opt.id]: !active })}
            className={`flex items-start gap-3 px-3 py-2.5 rounded-xl border text-left transition-colors ${
              active
                ? "bg-orange-50 dark:bg-orange-500/10 border-orange-300 dark:border-orange-500/40"
                : "bg-card border-border hover:bg-muted"
            }`}
          >
            {active ? (
              <CheckCircle2
                size={16}
                className="text-orange-500 mt-0.5 shrink-0"
              />
            ) : (
              <Circle
                size={16}
                className="text-muted-foreground mt-0.5 shrink-0"
              />
            )}
            <div className="min-w-0">
              <div
                className={`text-xs font-extrabold ${
                  active
                    ? "text-orange-800 dark:text-orange-200"
                    : "text-foreground"
                }`}
              >
                {opt.label}
              </div>
              <div className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">
                {opt.description}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}

// ─── Toggle row ─────────────────────────────────────────────────────────────

function ToggleRow({
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
      className={`flex items-start gap-3 px-3 py-2.5 rounded-xl border text-left transition-colors ${
        value
          ? "bg-orange-50 dark:bg-orange-500/10 border-orange-300 dark:border-orange-500/40"
          : "bg-card border-border hover:bg-muted"
      }`}
    >
      <span
        className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
          value
            ? "bg-orange-500 text-white"
            : "bg-muted text-muted-foreground"
        }`}
      >
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <div
          className={`text-xs font-extrabold ${
            value
              ? "text-orange-800 dark:text-orange-200"
              : "text-foreground"
          }`}
        >
          {label}
        </div>
        <div className="text-[11px] text-muted-foreground mt-0.5">
          {description}
        </div>
      </div>
      <span
        className={`mt-0.5 inline-flex h-5 w-9 items-center rounded-full transition-colors shrink-0 ${
          value ? "bg-orange-500" : "bg-muted"
        }`}
        aria-hidden
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
            value ? "translate-x-4" : "translate-x-1"
          }`}
        />
      </span>
    </button>
  );
}

// ─── Limit field ────────────────────────────────────────────────────────────

function LimitField({
  enabled,
  limit,
  max,
  onEnabledChange,
  onLimitChange,
}: {
  enabled: boolean;
  limit: number;
  max: number;
  onEnabledChange: (v: boolean) => void;
  onLimitChange: (n: number) => void;
}) {
  return (
    <div
      className={`flex items-start gap-3 px-3 py-2.5 rounded-xl border ${
        enabled
          ? "bg-orange-50 dark:bg-orange-500/10 border-orange-300 dark:border-orange-500/40"
          : "bg-card border-border"
      }`}
    >
      <button
        type="button"
        onClick={() => onEnabledChange(!enabled)}
        className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
          enabled
            ? "bg-orange-500 text-white"
            : "bg-muted text-muted-foreground"
        }`}
        aria-label="Toggle limit"
      >
        <ListOrdered size={14} />
      </button>
      <div className="min-w-0 flex-1">
        <div className="text-xs font-extrabold text-foreground">
          Limit number of words
        </div>
        <div className="mt-1.5 flex items-center gap-2">
          <input
            type="number"
            min={1}
            max={Math.max(1, max)}
            value={limit}
            disabled={!enabled}
            onChange={(e) => {
              const n = Number(e.target.value);
              if (!Number.isFinite(n) || n < 1) return;
              onLimitChange(Math.min(n, Math.max(1, max)));
            }}
            className="w-20 px-2 py-1 rounded-lg border border-border bg-background text-sm font-bold text-foreground disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-orange-300 dark:focus:ring-orange-500/40"
          />
          <span className="text-[11px] text-muted-foreground">
            of {max.toLocaleString()} available
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Selection summary ──────────────────────────────────────────────────────

function SelectionSummary({
  request,
  totalBeforeLimit,
  finalCount,
}: {
  request: SelectionRequest;
  totalBeforeLimit: number;
  finalCount: number;
}) {
  return (
    <section className="rounded-2xl border border-border bg-card shadow-sm p-5">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles size={16} className="text-orange-500" />
        <h3 className="text-sm font-extrabold text-foreground">
          Live preview
        </h3>
      </div>
      <dl className="space-y-2 text-xs">
        <SummaryRow label="Source" value={describeScope(request.scope)} />
        <SummaryRow
          label="Filters"
          value={
            hasAnyFilter(request.filters)
              ? filterSummary(request.filters!)
              : "None"
          }
        />
        <SummaryRow
          label="Order"
          value={request.shuffle ? "Shuffled" : "Original"}
        />
        <SummaryRow
          label="Words matching"
          value={`${totalBeforeLimit.toLocaleString()}`}
          strong
        />
        {request.limit !== undefined && (
          <SummaryRow
            label="Session size"
            value={`${finalCount.toLocaleString()} (limited from ${totalBeforeLimit.toLocaleString()})`}
            strong
          />
        )}
      </dl>
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

function filterSummary(f: Filters): string {
  const parts: string[] = [];
  if (f.newOnly) parts.push("New");
  if (f.mistakeOnly) parts.push("Mistakes");
  if (f.difficultOnly) parts.push("Difficult");
  if (f.dueOnly) parts.push("Due");
  return parts.join(" + ");
}

// ─── Preview list ───────────────────────────────────────────────────────────

function PreviewList({
  sample,
  total,
}: {
  sample: ReturnType<typeof selectWords>;
  total: number;
}) {
  if (total === 0) {
    return (
      <section className="rounded-2xl border border-dashed border-border bg-card/50 p-5">
        <p className="text-xs text-muted-foreground text-center">
          No words match this selection yet. Adjust the source or filters.
        </p>
      </section>
    );
  }
  return (
    <section className="rounded-2xl border border-border bg-card shadow-sm p-5">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xs font-extrabold text-foreground uppercase tracking-wide">
          Sample
        </h3>
        <span className="text-[11px] text-muted-foreground">
          showing {sample.length} of {total.toLocaleString()}
        </span>
      </div>
      <ul className="space-y-1.5">
        {sample.map((w) => (
          <li
            key={w.id}
            className="flex items-center justify-between gap-3 text-xs"
          >
            <span className="font-bold text-foreground truncate">
              {w.word}
            </span>
            <span className="text-muted-foreground shrink-0">
              M{w.day} · S{w.group}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

// ─── Start button — kicks off Practice Mode with the resolved word IDs ─────

function StartButton({
  fullWidth,
  small,
  disabled,
  onClick,
}: {
  fullWidth?: boolean;
  small?: boolean;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <div
      className={`${fullWidth ? "w-full" : ""} ${
        small ? "" : "flex flex-col items-stretch gap-2"
      }`}
    >
      <button
        type="button"
        disabled={disabled}
        onClick={onClick}
        title={disabled ? "No words match this selection." : "Start practice"}
        className={`inline-flex items-center justify-center gap-1.5 rounded-xl font-extrabold transition-colors btn-brand disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none ${
          fullWidth ? "w-full px-4 py-3 text-sm" : "px-3.5 py-2 text-xs"
        }`}
      >
        Start practice
        <ChevronRight size={small ? 14 : 16} />
      </button>
      {!small && (
        <p className="text-[11px] text-muted-foreground text-center">
          {disabled
            ? "Adjust your selection to enable."
            : "Immediate feedback · hints · confidence rating."}
        </p>
      )}
    </div>
  );
}

