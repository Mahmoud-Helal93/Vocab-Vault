export type MissionThemeId =
  | "brand"
  | "violet"
  | "ocean"
  | "forest"
  | "sunset"
  | "royal";

export interface SetAccent {
  stripe: string;
  pillBg: string;
  pillText: string;
  icon: string;
  btn: string;
}

export interface StudyAccent {
  bar: string;
  icon: string;
  border: string;
  pill: string;
}

export interface MissionThemeDef {
  id: MissionThemeId;
  label: string;
  description: string;
  swatch: [string, string, string];
  heroGradient: string;
  setAccents: SetAccent[];
  studyAccents: StudyAccent[];
}

export const MISSION_THEMES: Record<MissionThemeId, MissionThemeDef> = {
  brand: {
    id: "brand",
    label: "Sunrise",
    description: "Orange to pink — matches the brand hero",
    swatch: ["#F97316", "#F472B6", "#EC4899"],
    heroGradient:
      "linear-gradient(120deg, #FB923C 0%, #F97316 35%, #EC4899 100%)",
    setAccents: [
      {
        stripe: "from-orange-400 to-orange-500",
        pillBg: "bg-orange-100 dark:bg-orange-900/30",
        pillText: "text-orange-700 dark:text-orange-300",
        icon: "text-orange-500",
        btn: "from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700",
      },
      {
        stripe: "from-orange-500 to-pink-500",
        pillBg: "bg-orange-100 dark:bg-orange-900/30",
        pillText: "text-orange-700 dark:text-orange-300",
        icon: "text-orange-500",
        btn: "from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600",
      },
      {
        stripe: "from-pink-500 to-pink-600",
        pillBg: "bg-pink-100 dark:bg-pink-900/30",
        pillText: "text-pink-700 dark:text-pink-300",
        icon: "text-pink-500",
        btn: "from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700",
      },
    ],
    studyAccents: [
      {
        bar: "bg-orange-500",
        icon: "#F97316",
        border: "hover:border-orange-400",
        pill: "bg-orange-50 border-orange-200 text-orange-700 dark:bg-orange-900/20 dark:border-orange-800 dark:text-orange-400 hover:border-orange-400",
      },
      {
        bar: "bg-gradient-to-r from-orange-500 to-pink-500",
        icon: "#F97316",
        border: "hover:border-orange-400",
        pill: "bg-orange-50 border-orange-200 text-orange-700 dark:bg-orange-900/20 dark:border-orange-800 dark:text-orange-400 hover:border-orange-400",
      },
      {
        bar: "bg-pink-500",
        icon: "#EC4899",
        border: "hover:border-pink-400",
        pill: "bg-pink-50 border-pink-200 text-pink-700 dark:bg-pink-900/20 dark:border-pink-800 dark:text-pink-400 hover:border-pink-400",
      },
    ],
  },
  violet: {
    id: "violet",
    label: "Twilight",
    description: "Violet, pink and fuchsia — the classic palette",
    swatch: ["#8B5CF6", "#EC4899", "#D946EF"],
    heroGradient:
      "linear-gradient(120deg, #8B5CF6 0%, #A855F7 50%, #EC4899 100%)",
    setAccents: [
      {
        stripe: "from-violet-500 to-violet-600",
        pillBg: "bg-violet-100 dark:bg-violet-900/30",
        pillText: "text-violet-700 dark:text-violet-300",
        icon: "text-violet-500",
        btn: "from-violet-500 to-violet-600 hover:from-violet-600 hover:to-violet-700",
      },
      {
        stripe: "from-pink-500 to-pink-600",
        pillBg: "bg-pink-100 dark:bg-pink-900/30",
        pillText: "text-pink-700 dark:text-pink-300",
        icon: "text-pink-500",
        btn: "from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700",
      },
      {
        stripe: "from-fuchsia-500 to-fuchsia-600",
        pillBg: "bg-fuchsia-100 dark:bg-fuchsia-900/30",
        pillText: "text-fuchsia-700 dark:text-fuchsia-300",
        icon: "text-fuchsia-500",
        btn: "from-fuchsia-500 to-fuchsia-600 hover:from-fuchsia-600 hover:to-fuchsia-700",
      },
    ],
    studyAccents: [
      {
        bar: "bg-blue-500",
        icon: "#3B82F6",
        border: "hover:border-blue-400",
        pill: "bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-400 hover:border-blue-400",
      },
      {
        bar: "bg-purple-500",
        icon: "#8B5CF6",
        border: "hover:border-purple-400",
        pill: "bg-purple-50 border-purple-200 text-purple-700 dark:bg-purple-900/20 dark:border-purple-800 dark:text-purple-400 hover:border-purple-400",
      },
      {
        bar: "bg-pink-500",
        icon: "#EC4899",
        border: "hover:border-pink-400",
        pill: "bg-pink-50 border-pink-200 text-pink-700 dark:bg-pink-900/20 dark:border-pink-800 dark:text-pink-400 hover:border-pink-400",
      },
    ],
  },
  ocean: {
    id: "ocean",
    label: "Ocean",
    description: "Sky, blue and cyan — calm and focused",
    swatch: ["#0EA5E9", "#3B82F6", "#06B6D4"],
    heroGradient:
      "linear-gradient(120deg, #38BDF8 0%, #0EA5E9 35%, #06B6D4 100%)",
    setAccents: [
      {
        stripe: "from-sky-400 to-sky-500",
        pillBg: "bg-sky-100 dark:bg-sky-900/30",
        pillText: "text-sky-700 dark:text-sky-300",
        icon: "text-sky-500",
        btn: "from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700",
      },
      {
        stripe: "from-blue-500 to-cyan-500",
        pillBg: "bg-blue-100 dark:bg-blue-900/30",
        pillText: "text-blue-700 dark:text-blue-300",
        icon: "text-blue-500",
        btn: "from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600",
      },
      {
        stripe: "from-cyan-500 to-cyan-600",
        pillBg: "bg-cyan-100 dark:bg-cyan-900/30",
        pillText: "text-cyan-700 dark:text-cyan-300",
        icon: "text-cyan-500",
        btn: "from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700",
      },
    ],
    studyAccents: [
      {
        bar: "bg-sky-500",
        icon: "#0EA5E9",
        border: "hover:border-sky-400",
        pill: "bg-sky-50 border-sky-200 text-sky-700 dark:bg-sky-900/20 dark:border-sky-800 dark:text-sky-400 hover:border-sky-400",
      },
      {
        bar: "bg-gradient-to-r from-blue-500 to-cyan-500",
        icon: "#3B82F6",
        border: "hover:border-blue-400",
        pill: "bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-400 hover:border-blue-400",
      },
      {
        bar: "bg-cyan-500",
        icon: "#06B6D4",
        border: "hover:border-cyan-400",
        pill: "bg-cyan-50 border-cyan-200 text-cyan-700 dark:bg-cyan-900/20 dark:border-cyan-800 dark:text-cyan-400 hover:border-cyan-400",
      },
    ],
  },
  forest: {
    id: "forest",
    label: "Forest",
    description: "Emerald and teal — fresh and grounded",
    swatch: ["#10B981", "#14B8A6", "#22C55E"],
    heroGradient:
      "linear-gradient(120deg, #34D399 0%, #10B981 35%, #14B8A6 100%)",
    setAccents: [
      {
        stripe: "from-emerald-400 to-emerald-500",
        pillBg: "bg-emerald-100 dark:bg-emerald-900/30",
        pillText: "text-emerald-700 dark:text-emerald-300",
        icon: "text-emerald-500",
        btn: "from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700",
      },
      {
        stripe: "from-emerald-500 to-teal-500",
        pillBg: "bg-emerald-100 dark:bg-emerald-900/30",
        pillText: "text-emerald-700 dark:text-emerald-300",
        icon: "text-emerald-500",
        btn: "from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600",
      },
      {
        stripe: "from-teal-500 to-teal-600",
        pillBg: "bg-teal-100 dark:bg-teal-900/30",
        pillText: "text-teal-700 dark:text-teal-300",
        icon: "text-teal-500",
        btn: "from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700",
      },
    ],
    studyAccents: [
      {
        bar: "bg-emerald-500",
        icon: "#10B981",
        border: "hover:border-emerald-400",
        pill: "bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-900/20 dark:border-emerald-800 dark:text-emerald-400 hover:border-emerald-400",
      },
      {
        bar: "bg-gradient-to-r from-emerald-500 to-teal-500",
        icon: "#10B981",
        border: "hover:border-emerald-400",
        pill: "bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-900/20 dark:border-emerald-800 dark:text-emerald-400 hover:border-emerald-400",
      },
      {
        bar: "bg-teal-500",
        icon: "#14B8A6",
        border: "hover:border-teal-400",
        pill: "bg-teal-50 border-teal-200 text-teal-700 dark:bg-teal-900/20 dark:border-teal-800 dark:text-teal-400 hover:border-teal-400",
      },
    ],
  },
  sunset: {
    id: "sunset",
    label: "Ember",
    description: "Amber and red — bold and energizing",
    swatch: ["#F59E0B", "#F97316", "#EF4444"],
    heroGradient:
      "linear-gradient(120deg, #FBBF24 0%, #F59E0B 35%, #EF4444 100%)",
    setAccents: [
      {
        stripe: "from-amber-400 to-amber-500",
        pillBg: "bg-amber-100 dark:bg-amber-900/30",
        pillText: "text-amber-700 dark:text-amber-300",
        icon: "text-amber-500",
        btn: "from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700",
      },
      {
        stripe: "from-amber-500 to-red-500",
        pillBg: "bg-amber-100 dark:bg-amber-900/30",
        pillText: "text-amber-700 dark:text-amber-300",
        icon: "text-amber-500",
        btn: "from-amber-500 to-red-500 hover:from-amber-600 hover:to-red-600",
      },
      {
        stripe: "from-red-500 to-red-600",
        pillBg: "bg-red-100 dark:bg-red-900/30",
        pillText: "text-red-700 dark:text-red-300",
        icon: "text-red-500",
        btn: "from-red-500 to-red-600 hover:from-red-600 hover:to-red-700",
      },
    ],
    studyAccents: [
      {
        bar: "bg-amber-500",
        icon: "#F59E0B",
        border: "hover:border-amber-400",
        pill: "bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-900/20 dark:border-amber-800 dark:text-amber-400 hover:border-amber-400",
      },
      {
        bar: "bg-gradient-to-r from-amber-500 to-red-500",
        icon: "#F59E0B",
        border: "hover:border-amber-400",
        pill: "bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-900/20 dark:border-amber-800 dark:text-amber-400 hover:border-amber-400",
      },
      {
        bar: "bg-red-500",
        icon: "#EF4444",
        border: "hover:border-red-400",
        pill: "bg-red-50 border-red-200 text-red-700 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400 hover:border-red-400",
      },
    ],
  },
  royal: {
    id: "royal",
    label: "Royal",
    description: "Indigo and purple — deep and regal",
    swatch: ["#6366F1", "#8B5CF6", "#A855F7"],
    heroGradient:
      "linear-gradient(120deg, #6366F1 0%, #8B5CF6 50%, #A855F7 100%)",
    setAccents: [
      {
        stripe: "from-indigo-500 to-indigo-600",
        pillBg: "bg-indigo-100 dark:bg-indigo-900/30",
        pillText: "text-indigo-700 dark:text-indigo-300",
        icon: "text-indigo-500",
        btn: "from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700",
      },
      {
        stripe: "from-indigo-500 to-purple-500",
        pillBg: "bg-indigo-100 dark:bg-indigo-900/30",
        pillText: "text-indigo-700 dark:text-indigo-300",
        icon: "text-indigo-500",
        btn: "from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600",
      },
      {
        stripe: "from-purple-500 to-purple-600",
        pillBg: "bg-purple-100 dark:bg-purple-900/30",
        pillText: "text-purple-700 dark:text-purple-300",
        icon: "text-purple-500",
        btn: "from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700",
      },
    ],
    studyAccents: [
      {
        bar: "bg-indigo-500",
        icon: "#6366F1",
        border: "hover:border-indigo-400",
        pill: "bg-indigo-50 border-indigo-200 text-indigo-700 dark:bg-indigo-900/20 dark:border-indigo-800 dark:text-indigo-400 hover:border-indigo-400",
      },
      {
        bar: "bg-gradient-to-r from-indigo-500 to-purple-500",
        icon: "#8B5CF6",
        border: "hover:border-indigo-400",
        pill: "bg-indigo-50 border-indigo-200 text-indigo-700 dark:bg-indigo-900/20 dark:border-indigo-800 dark:text-indigo-400 hover:border-indigo-400",
      },
      {
        bar: "bg-purple-500",
        icon: "#A855F7",
        border: "hover:border-purple-400",
        pill: "bg-purple-50 border-purple-200 text-purple-700 dark:bg-purple-900/20 dark:border-purple-800 dark:text-purple-400 hover:border-purple-400",
      },
    ],
  },
};

export const THEME_LIST: MissionThemeDef[] = [
  MISSION_THEMES.brand,
  MISSION_THEMES.violet,
  MISSION_THEMES.ocean,
  MISSION_THEMES.forest,
  MISSION_THEMES.sunset,
  MISSION_THEMES.royal,
];

export const DEFAULT_GLOBAL_THEME: MissionThemeId = "brand";

const THEME_IDS = new Set<MissionThemeId>(
  Object.keys(MISSION_THEMES) as MissionThemeId[]
);

function isThemeId(value: unknown): value is MissionThemeId {
  return typeof value === "string" && THEME_IDS.has(value as MissionThemeId);
}

const STORAGE_KEY = "gre_global_theme";

export function loadGlobalTheme(): MissionThemeId {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw && isThemeId(raw)) return raw;
  } catch {
    /* ignore */
  }
  return DEFAULT_GLOBAL_THEME;
}

export function saveGlobalTheme(themeId: MissionThemeId): void {
  try {
    localStorage.setItem(STORAGE_KEY, themeId);
  } catch {
    /* ignore */
  }
}

export function themeClass(themeId: MissionThemeId): string {
  return `theme-mission-${themeId}`;
}
