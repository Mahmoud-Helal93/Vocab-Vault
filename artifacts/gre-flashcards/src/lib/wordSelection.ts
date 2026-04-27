import { type Word, TOTAL_DAYS, GROUPS_PER_DAY } from "@/data/words";
import { shuffleArray } from "@/lib/srs";

// ─── Belt / Mission / Set structure ──────────────────────────────────────────

export const TOTAL_BELTS = 6;
export const MISSIONS_PER_BELT = 7;

export const BELT_NAMES = [
  "White Belt",
  "Yellow Belt",
  "Green Belt",
  "Blue Belt",
  "Purple Belt",
  "Black Belt",
] as const;

export function beltForMission(missionDay: number): number {
  return Math.min(
    TOTAL_BELTS,
    Math.max(1, Math.floor((missionDay - 1) / MISSIONS_PER_BELT) + 1),
  );
}

export function missionsForBelt(belt: number): number[] {
  const start = (belt - 1) * MISSIONS_PER_BELT + 1;
  return Array.from({ length: MISSIONS_PER_BELT }, (_, i) => start + i).filter(
    (d) => d <= TOTAL_DAYS,
  );
}

export interface SetRef {
  day: number;
  group: number;
}

export function setsForMission(missionDay: number): SetRef[] {
  return Array.from({ length: GROUPS_PER_DAY }, (_, i) => ({
    day: missionDay,
    group: i + 1,
  }));
}

export function allMissions(): number[] {
  return Array.from({ length: TOTAL_DAYS }, (_, i) => i + 1);
}

export function allBelts(): number[] {
  return Array.from({ length: TOTAL_BELTS }, (_, i) => i + 1);
}

// ─── Scope: where to source words from ───────────────────────────────────────

export type Scope =
  | { kind: "all" }
  | { kind: "belt"; beltIds: number[] }
  | { kind: "mission"; missionDays: number[] }
  | { kind: "set"; sets: SetRef[] }
  | { kind: "range"; fromDay: number; toDay: number };

export type ScopeKind = Scope["kind"];

export function selectByScope(words: Word[], scope: Scope): Word[] {
  switch (scope.kind) {
    case "all":
      return words;
    case "belt": {
      if (scope.beltIds.length === 0) return [];
      const ids = new Set(scope.beltIds);
      return words.filter((w) => ids.has(beltForMission(w.day)));
    }
    case "mission": {
      if (scope.missionDays.length === 0) return [];
      const days = new Set(scope.missionDays);
      return words.filter((w) => days.has(w.day));
    }
    case "set": {
      if (scope.sets.length === 0) return [];
      const keys = new Set(scope.sets.map((s) => `${s.day}-${s.group}`));
      return words.filter((w) => keys.has(`${w.day}-${w.group}`));
    }
    case "range": {
      const lo = Math.max(1, Math.min(scope.fromDay, scope.toDay));
      const hi = Math.min(TOTAL_DAYS, Math.max(scope.fromDay, scope.toDay));
      return words.filter((w) => w.day >= lo && w.day <= hi);
    }
  }
}

// ─── Word category predicates ────────────────────────────────────────────────

/** New = never attempted (no correct or incorrect answers) or status "new". */
export function isNewWord(w: Word): boolean {
  return (
    w.status === "new" || (w.correctCount === 0 && w.incorrectCount === 0)
  );
}

/** Mistake = the user has answered at least once incorrectly. */
export function isMistakeWord(w: Word): boolean {
  return w.incorrectCount > 0;
}

/** Difficult = high difficulty score or repeat misses. */
export function isDifficultWord(w: Word): boolean {
  return w.difficulty >= 3 || w.incorrectCount >= 2;
}

/** Due for review = nextReview is null (never reviewed) or already passed. */
export function isDueWord(w: Word): boolean {
  if (!w.nextReview) return true;
  return new Date(w.nextReview).getTime() <= Date.now();
}

// ─── Filters ─────────────────────────────────────────────────────────────────

export interface Filters {
  newOnly?: boolean;
  difficultOnly?: boolean;
  mistakeOnly?: boolean;
  dueOnly?: boolean;
}

export function hasAnyFilter(f: Filters | undefined): boolean {
  if (!f) return false;
  return Boolean(f.newOnly || f.difficultOnly || f.mistakeOnly || f.dueOnly);
}

export function applyFilters(words: Word[], filters: Filters): Word[] {
  let r = words;
  if (filters.newOnly) r = r.filter(isNewWord);
  if (filters.mistakeOnly) r = r.filter(isMistakeWord);
  if (filters.difficultOnly) r = r.filter(isDifficultWord);
  if (filters.dueOnly) r = r.filter(isDueWord);
  return r;
}

// ─── Combined selection ──────────────────────────────────────────────────────

export interface SelectionRequest {
  scope: Scope;
  filters?: Filters;
  shuffle?: boolean;
  /** Cap the result to this many words (after scope + filters + optional shuffle). */
  limit?: number;
}

export function selectWords(words: Word[], req: SelectionRequest): Word[] {
  let result = selectByScope(words, req.scope);
  if (req.filters) result = applyFilters(result, req.filters);
  if (req.shuffle) result = shuffleArray(result);
  if (req.limit && req.limit > 0) result = result.slice(0, req.limit);
  return result;
}

/** Selection size without materializing the entire list — useful for previews. */
export function countSelection(words: Word[], req: SelectionRequest): number {
  let result = selectByScope(words, req.scope);
  if (req.filters) result = applyFilters(result, req.filters);
  return result.length;
}

// ─── Quick Practice presets ──────────────────────────────────────────────────

export type QuickPreset =
  | "new"
  | "mistakes"
  | "difficult"
  | "today"
  | "random";

export interface QuickPresetMeta {
  id: QuickPreset;
  label: string;
  description: string;
}

export const QUICK_PRESETS: QuickPresetMeta[] = [
  {
    id: "new",
    label: "New words",
    description: "Words you haven't started practicing yet.",
  },
  {
    id: "mistakes",
    label: "Mistake words",
    description: "Every word you've answered incorrectly at least once.",
  },
  {
    id: "difficult",
    label: "Difficult words",
    description: "Words with a high difficulty score or repeat misses.",
  },
  {
    id: "today",
    label: "Today's review",
    description: "Spaced-repetition reviews due now.",
  },
  {
    id: "random",
    label: "Random review",
    description: "A shuffled mix from your entire vocabulary.",
  },
];

export function quickPresetRequest(preset: QuickPreset): SelectionRequest {
  switch (preset) {
    case "new":
      return {
        scope: { kind: "all" },
        filters: { newOnly: true },
        shuffle: true,
      };
    case "mistakes":
      return {
        scope: { kind: "all" },
        filters: { mistakeOnly: true },
        shuffle: true,
      };
    case "difficult":
      return {
        scope: { kind: "all" },
        filters: { difficultOnly: true },
        shuffle: true,
      };
    case "today":
      return {
        scope: { kind: "all" },
        filters: { dueOnly: true },
        shuffle: true,
      };
    case "random":
      return { scope: { kind: "all" }, shuffle: true };
  }
}

// ─── Human-readable scope labels ─────────────────────────────────────────────

export function describeScope(scope: Scope): string {
  switch (scope.kind) {
    case "all":
      return "All vocabulary";
    case "belt":
      if (scope.beltIds.length === 0) return "No belts selected";
      if (scope.beltIds.length === 1)
        return BELT_NAMES[scope.beltIds[0] - 1] ?? `Belt ${scope.beltIds[0]}`;
      return `${scope.beltIds.length} belts mixed`;
    case "mission":
      if (scope.missionDays.length === 0) return "No missions selected";
      if (scope.missionDays.length === 1)
        return `Mission ${scope.missionDays[0]}`;
      return `${scope.missionDays.length} missions mixed`;
    case "set":
      if (scope.sets.length === 0) return "No sets selected";
      if (scope.sets.length === 1) {
        const s = scope.sets[0];
        return `Mission ${s.day} · Set ${s.group}`;
      }
      return `${scope.sets.length} sets mixed`;
    case "range":
      return `Missions ${Math.min(
        scope.fromDay,
        scope.toDay,
      )}–${Math.max(scope.fromDay, scope.toDay)}`;
  }
}
