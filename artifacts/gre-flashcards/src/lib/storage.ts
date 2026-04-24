import { Word, buildWords } from "@/data/words";

// All localStorage keys prefixed with gre_
export const STORAGE_KEYS = {
  WORDS: "gre_words",
  SETTINGS: "gre_settings",
  STREAK: "gre_streak",
  MISTAKES: "gre_mistakes",
  PLAN: "gre_plan",
  CONFUSABLES: "gre_confusables",
  SESSIONS: "gre_sessions",
  CRUNCH: "gre_crunch",
  MICRO_SESSION: "gre_micro_session",
  MISSION_TEST_SCORES: "gre_mission_test_scores",
  MISSION_TEST_ATTEMPTS: "gre_mission_test_attempts",
  BOOKMARKS: "gre_bookmarks",
} as const;

export interface BookmarkEntry {
  wordId: string;
  word: string;
  source: "set-test" | "mission-test";
  missionDay: number;
  group?: number;
  addedAt: string;
}

export function loadBookmarks(): BookmarkEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
    return raw ? (JSON.parse(raw) as BookmarkEntry[]) : [];
  } catch { return []; }
}

export function saveBookmarks(bookmarks: BookmarkEntry[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(bookmarks));
  } catch { /* ignore */ }
}

export function loadMissionTestScores(): Record<number, number> {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.MISSION_TEST_SCORES);
    return raw ? (JSON.parse(raw) as Record<number, number>) : {};
  } catch { return {}; }
}

export function loadMissionTestAttempts(): Record<number, string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.MISSION_TEST_ATTEMPTS);
    return raw ? (JSON.parse(raw) as Record<number, string>) : {};
  } catch { return {}; }
}

export function saveMissionTestScore(day: number, pct: number): void {
  try {
    const scores = loadMissionTestScores();
    if (!scores[day] || pct > scores[day]) {
      scores[day] = pct;
      localStorage.setItem(STORAGE_KEYS.MISSION_TEST_SCORES, JSON.stringify(scores));
    }
    const attempts = loadMissionTestAttempts();
    attempts[day] = new Date().toISOString();
    localStorage.setItem(STORAGE_KEYS.MISSION_TEST_ATTEMPTS, JSON.stringify(attempts));
  } catch { /* ignore */ }
}

export function formatRelativeTime(iso: string): string {
  const then = new Date(iso).getTime();
  const diffMs = Date.now() - then;
  const sec = Math.floor(diffMs / 1000);
  if (sec < 60) return "just now";
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min} min${min === 1 ? "" : "s"} ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr} hour${hr === 1 ? "" : "s"} ago`;
  const day = Math.floor(hr / 24);
  if (day < 30) return `${day} day${day === 1 ? "" : "s"} ago`;
  const mo = Math.floor(day / 30);
  if (mo < 12) return `${mo} month${mo === 1 ? "" : "s"} ago`;
  const yr = Math.floor(mo / 12);
  return `${yr} year${yr === 1 ? "" : "s"} ago`;
}

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

export interface PlanSettings {
  examDate: string | null;
  targetWordsPerDay: number | null;
  sessionLengthMinutes: number;
  dailyStartTime: "morning" | "afternoon" | "evening";
  lastStudyDate: string | null;
  deficitDays: number;
}

export interface ConfusablePair {
  word1: string;
  word2: string;
  detectedAt: string;
  quizCorrect: number;
  quizTotal: number;
}

export interface SessionMistake {
  word: string;
  questionType: "mc" | "fb" | "tf" | "cloze";
  userAnswer: string;
  correctAnswer: string;
  errorType: "wrong_definition" | "wrong_pos" | "confused_with" | "spelling" | "context";
}

export interface StudySession {
  sessionId: string;
  date: string;
  wordsReviewed: string[];
  mistakes: SessionMistake[];
  accuracy: number;
  durationSeconds: number;
}

export interface CrunchState {
  active: boolean;
  activatedAt: string | null;
  weekAccuracy: number[];
}

// Words
export function loadWords(): Word[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.WORDS);
    if (stored) {
      const parsed = JSON.parse(stored) as Word[];
      const fresh = buildWords();
      const storedIds = new Set(parsed.map((w) => w.id));
      const newWords = fresh.filter((w) => !storedIds.has(w.id));
      // Migrate: add missing qualityHistory field
      const migrated = parsed.map((w) => ({
        ...w,
        qualityHistory: w.qualityHistory ?? [],
        root: w.root ?? fresh.find((f) => f.id === w.id)?.root,
        wordFamily: w.wordFamily ?? fresh.find((f) => f.id === w.id)?.wordFamily,
      }));
      return [...migrated, ...newWords];
    }
  } catch { /* ignore */ }
  const fresh = buildWords();
  saveWords(fresh);
  return fresh;
}

export function saveWords(words: Word[]): void {
  try { localStorage.setItem(STORAGE_KEYS.WORDS, JSON.stringify(words)); } catch { /* ignore */ }
}

// Settings
export function loadSettings(): Settings {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (stored) return JSON.parse(stored) as Settings;
  } catch { /* ignore */ }
  return { darkMode: false, soundEnabled: false, timerEnabled: false, timerSeconds: 30 };
}

export function saveSettings(settings: Settings): void {
  try { localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings)); } catch { /* ignore */ }
}

// Streak
export function loadStreak(): StreakData {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.STREAK);
    if (stored) return JSON.parse(stored) as StreakData;
  } catch { /* ignore */ }
  return { currentStreak: 0, longestStreak: 0, lastStudyDate: null, totalSessions: 0 };
}

export function saveStreak(streak: StreakData): void {
  try { localStorage.setItem(STORAGE_KEYS.STREAK, JSON.stringify(streak)); } catch { /* ignore */ }
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

// Mistakes (legacy quick log)
export function loadMistakes(): MistakeEntry[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.MISTAKES);
    if (stored) return JSON.parse(stored) as MistakeEntry[];
  } catch { /* ignore */ }
  return [];
}

export function saveMistakes(mistakes: MistakeEntry[]): void {
  try { localStorage.setItem(STORAGE_KEYS.MISTAKES, JSON.stringify(mistakes)); } catch { /* ignore */ }
}

export function addMistake(mistake: MistakeEntry): void {
  const mistakes = loadMistakes();
  saveMistakes([mistake, ...mistakes].slice(0, 100));
}

// Plan
export function loadPlan(): PlanSettings {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.PLAN);
    if (stored) return JSON.parse(stored) as PlanSettings;
  } catch { /* ignore */ }
  return {
    examDate: null,
    targetWordsPerDay: null,
    sessionLengthMinutes: 30,
    dailyStartTime: "morning",
    lastStudyDate: null,
    deficitDays: 0,
  };
}

export function savePlan(plan: PlanSettings): void {
  try { localStorage.setItem(STORAGE_KEYS.PLAN, JSON.stringify(plan)); } catch { /* ignore */ }
}

// Confusables
export function loadConfusables(): ConfusablePair[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.CONFUSABLES);
    if (stored) return JSON.parse(stored) as ConfusablePair[];
  } catch { /* ignore */ }
  return [];
}

export function saveConfusables(pairs: ConfusablePair[]): void {
  try { localStorage.setItem(STORAGE_KEYS.CONFUSABLES, JSON.stringify(pairs)); } catch { /* ignore */ }
}

export function mergeConfusables(
  existing: ConfusablePair[],
  newPairs: Array<{ word1: string; word2: string; detectedAt: string }>
): ConfusablePair[] {
  const existingKeys = new Set(existing.map((p) => [p.word1, p.word2].sort().join("|")));
  const fresh: ConfusablePair[] = newPairs
    .filter((p) => !existingKeys.has([p.word1, p.word2].sort().join("|")))
    .map((p) => ({ ...p, quizCorrect: 0, quizTotal: 0 }));
  return [...existing, ...fresh];
}

// Sessions
export function loadSessions(): StudySession[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.SESSIONS);
    if (stored) return JSON.parse(stored) as StudySession[];
  } catch { /* ignore */ }
  return [];
}

export function saveSessions(sessions: StudySession[]): void {
  try { localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(sessions)); } catch { /* ignore */ }
}

export function addSession(session: StudySession): void {
  const sessions = loadSessions();
  saveSessions([session, ...sessions].slice(0, 90));
}

// Crunch
export function loadCrunch(): CrunchState {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.CRUNCH);
    if (stored) return JSON.parse(stored) as CrunchState;
  } catch { /* ignore */ }
  return { active: false, activatedAt: null, weekAccuracy: [] };
}

export function saveCrunch(state: CrunchState): void {
  try { localStorage.setItem(STORAGE_KEYS.CRUNCH, JSON.stringify(state)); } catch { /* ignore */ }
}

// Micro session timestamp
export function loadMicroSessionTime(): number | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.MICRO_SESSION);
    if (stored) return parseInt(stored);
  } catch { /* ignore */ }
  return null;
}

export function saveMicroSessionTime(ts: number): void {
  try { localStorage.setItem(STORAGE_KEYS.MICRO_SESSION, String(ts)); } catch { /* ignore */ }
}

// Utility: generate session ID
export function generateSessionId(): string {
  return `sess-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
