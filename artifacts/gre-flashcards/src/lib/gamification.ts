import type { Word } from "@/data/words";
import type { StreakData } from "@/lib/storage";

export interface GamificationState {
  totalXp: number;
  todayXp: number;
  todayDate: string | null;
  badges: Record<string, string>; // id -> ISO timestamp earned
}

export const GAMIFICATION_KEY = "gre_gamification";

export const XP_REWARDS = {
  REVIEW: 5,        // base for any review
  CORRECT: 10,      // quality >= 3
  PERFECT: 5,       // bonus for quality === 5
  NEW_LEARNED: 15,  // first time word leaves "new"
  MASTERED: 25,     // becomes mastered
} as const;

// Level curve: level n needs n * 100 cumulative XP (1->100, 2->300, 3->600, ...)
// Actually use triangular: xp needed for level n = 100 * n*(n+1)/2
export function levelFromXp(xp: number): { level: number; xpInLevel: number; xpForNext: number; progress: number } {
  let level = 1;
  let acc = 0;
  while (true) {
    const need = 100 * level;
    if (xp < acc + need) {
      return {
        level,
        xpInLevel: xp - acc,
        xpForNext: need,
        progress: (xp - acc) / need,
      };
    }
    acc += need;
    level += 1;
    if (level > 999) return { level, xpInLevel: 0, xpForNext: 1, progress: 1 };
  }
}

export function loadGamification(): GamificationState {
  try {
    const raw = localStorage.getItem(GAMIFICATION_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as GamificationState;
      const today = new Date().toDateString();
      if (parsed.todayDate !== today) {
        return { ...parsed, todayXp: 0, todayDate: today };
      }
      return parsed;
    }
  } catch { /* ignore */ }
  return { totalXp: 0, todayXp: 0, todayDate: new Date().toDateString(), badges: {} };
}

export function saveGamification(state: GamificationState): void {
  try { localStorage.setItem(GAMIFICATION_KEY, JSON.stringify(state)); } catch { /* ignore */ }
}

export interface BadgeDef {
  id: string;
  title: string;
  description: string;
  emoji: string;
  category: "milestone" | "streak" | "skill" | "explorer";
  check: (ctx: BadgeContext) => boolean;
}

export interface BadgeContext {
  words: Word[];
  streak: StreakData;
  gamification: GamificationState;
}

export const BADGES: BadgeDef[] = [
  // Milestones — words mastered
  { id: "first_word",    title: "First Steps",    description: "Master your first word",        emoji: "🌱", category: "milestone", check: (c) => c.words.filter(w => w.status === "mastered").length >= 1 },
  { id: "ten_mastered",  title: "Getting Going",  description: "Master 10 words",               emoji: "🥉", category: "milestone", check: (c) => c.words.filter(w => w.status === "mastered").length >= 10 },
  { id: "fifty_mastered",title: "Half Century",   description: "Master 50 words",               emoji: "🥈", category: "milestone", check: (c) => c.words.filter(w => w.status === "mastered").length >= 50 },
  { id: "hundred_mastered", title: "Mastered 100 Words!", description: "Master 100 words",     emoji: "🥇", category: "milestone", check: (c) => c.words.filter(w => w.status === "mastered").length >= 100 },
  { id: "five_hundred_mastered", title: "Vocabulary Maven", description: "Master 500 words",  emoji: "🏆", category: "milestone", check: (c) => c.words.filter(w => w.status === "mastered").length >= 500 },
  { id: "thousand_mastered", title: "Word Wizard", description: "Master 1000 words",            emoji: "🧙", category: "milestone", check: (c) => c.words.filter(w => w.status === "mastered").length >= 1000 },

  // Streak badges
  { id: "streak_3",  title: "On Fire",        description: "3-day study streak",  emoji: "🔥", category: "streak", check: (c) => c.streak.currentStreak >= 3 },
  { id: "streak_7",  title: "7-Day Streak!",  description: "Study 7 days in a row", emoji: "🔥", category: "streak", check: (c) => c.streak.currentStreak >= 7 },
  { id: "streak_14", title: "Two-Week Warrior", description: "14-day streak",     emoji: "💪", category: "streak", check: (c) => c.streak.currentStreak >= 14 },
  { id: "streak_30", title: "Month Master",   description: "30-day streak",       emoji: "👑", category: "streak", check: (c) => c.streak.currentStreak >= 30 },
  { id: "streak_100",title: "Century Streak", description: "100-day streak",      emoji: "💎", category: "streak", check: (c) => c.streak.currentStreak >= 100 },

  // Skill / accuracy
  { id: "perfect_session", title: "Flawless", description: "Earn 100 XP in a single day", emoji: "✨", category: "skill", check: (c) => c.gamification.todayXp >= 100 },
  { id: "xp_500",   title: "Rising Star",   description: "Earn 500 total XP",       emoji: "⭐", category: "skill", check: (c) => c.gamification.totalXp >= 500 },
  { id: "xp_2500",  title: "XP Hunter",     description: "Earn 2,500 total XP",     emoji: "🌟", category: "skill", check: (c) => c.gamification.totalXp >= 2500 },
  { id: "xp_10000", title: "XP Legend",     description: "Earn 10,000 total XP",    emoji: "💫", category: "skill", check: (c) => c.gamification.totalXp >= 10000 },

  // Explorer
  { id: "root_hunter", title: "Root Hunter", description: "Master 25 words that share an etymological root", emoji: "🌳", category: "explorer", check: (c) => {
      const mastered = c.words.filter(w => w.status === "mastered" && w.root);
      const byRoot: Record<string, number> = {};
      for (const w of mastered) byRoot[w.root!] = (byRoot[w.root!] || 0) + 1;
      return Object.values(byRoot).reduce((a, b) => a + b, 0) >= 25;
    }
  },
  { id: "day_explorer",   title: "Day Explorer",   description: "Touch words from 10 different days",  emoji: "🗺️", category: "explorer", check: (c) => {
      const days = new Set(c.words.filter(w => w.status !== "new").map(w => w.day));
      return days.size >= 10;
    }
  },
  { id: "all_days",       title: "Globe Trotter",  description: "Touch words from every day in the curriculum", emoji: "🌍", category: "explorer", check: (c) => {
      const days = new Set(c.words.filter(w => w.status !== "new").map(w => w.day));
      const totalDays = new Set(c.words.map(w => w.day)).size;
      return days.size >= totalDays;
    }
  },
];

export function evaluateBadges(ctx: BadgeContext): { unlocked: BadgeDef[]; state: GamificationState } {
  const unlocked: BadgeDef[] = [];
  const newBadges = { ...ctx.gamification.badges };
  for (const def of BADGES) {
    if (newBadges[def.id]) continue;
    if (def.check(ctx)) {
      newBadges[def.id] = new Date().toISOString();
      unlocked.push(def);
    }
  }
  return { unlocked, state: { ...ctx.gamification, badges: newBadges } };
}
