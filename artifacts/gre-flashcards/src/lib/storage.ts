import { Word, buildWords } from "@/data/words";

const STORAGE_KEY = "gre-flashcards-words";
const SETTINGS_KEY = "gre-flashcards-settings";
const STREAK_KEY = "gre-flashcards-streak";
const MISTAKES_KEY = "gre-flashcards-mistakes";

export interface Settings {
  darkMode: boolean;
  soundEnabled: boolean;
  timerEnabled: boolean;
  timerSeconds: number;
}

export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastStudyDate: string | null;
  totalSessions: number;
}

export interface MistakeEntry {
  wordId: string;
  word: string;
  timestamp: number;
  questionType: string;
}

export function loadWords(): Word[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as Word[];
      // Merge with new words if vocabulary expanded
      const fresh = buildWords();
      const storedIds = new Set(parsed.map((w) => w.id));
      const newWords = fresh.filter((w) => !storedIds.has(w.id));
      return [...parsed, ...newWords];
    }
  } catch {
    // ignore
  }
  const fresh = buildWords();
  saveWords(fresh);
  return fresh;
}

export function saveWords(words: Word[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(words));
  } catch {
    // ignore
  }
}

export function loadSettings(): Settings {
  try {
    const stored = localStorage.getItem(SETTINGS_KEY);
    if (stored) return JSON.parse(stored) as Settings;
  } catch {
    // ignore
  }
  return {
    darkMode: false,
    soundEnabled: false,
    timerEnabled: false,
    timerSeconds: 30,
  };
}

export function saveSettings(settings: Settings): void {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch {
    // ignore
  }
}

export function loadStreak(): StreakData {
  try {
    const stored = localStorage.getItem(STREAK_KEY);
    if (stored) return JSON.parse(stored) as StreakData;
  } catch {
    // ignore
  }
  return {
    currentStreak: 0,
    longestStreak: 0,
    lastStudyDate: null,
    totalSessions: 0,
  };
}

export function saveStreak(streak: StreakData): void {
  try {
    localStorage.setItem(STREAK_KEY, JSON.stringify(streak));
  } catch {
    // ignore
  }
}

export function updateStreak(streak: StreakData): StreakData {
  const today = new Date().toDateString();
  if (streak.lastStudyDate === today) return streak;

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const isConsecutive = streak.lastStudyDate === yesterday.toDateString();

  const newStreak: StreakData = {
    currentStreak: isConsecutive ? streak.currentStreak + 1 : 1,
    longestStreak: Math.max(streak.longestStreak, isConsecutive ? streak.currentStreak + 1 : 1),
    lastStudyDate: today,
    totalSessions: streak.totalSessions + 1,
  };
  saveStreak(newStreak);
  return newStreak;
}

export function loadMistakes(): MistakeEntry[] {
  try {
    const stored = localStorage.getItem(MISTAKES_KEY);
    if (stored) return JSON.parse(stored) as MistakeEntry[];
  } catch {
    // ignore
  }
  return [];
}

export function saveMistakes(mistakes: MistakeEntry[]): void {
  try {
    localStorage.setItem(MISTAKES_KEY, JSON.stringify(mistakes));
  } catch {
    // ignore
  }
}

export function addMistake(mistake: MistakeEntry): void {
  const mistakes = loadMistakes();
  // Keep last 100 mistakes
  const updated = [mistake, ...mistakes].slice(0, 100);
  saveMistakes(updated);
}
