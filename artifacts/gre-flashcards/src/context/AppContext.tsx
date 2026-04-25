import {
  createContext, useContext, useState, useEffect, useCallback, ReactNode,
} from "react";
import { Word } from "@/data/words";
import {
  Settings, StreakData, PlanSettings, CrunchState, BookmarkEntry,
  loadWords, saveWords, loadSettings, saveSettings,
  loadStreak, updateStreak, loadPlan, savePlan, loadCrunch, saveCrunch,
  loadBookmarks, saveBookmarks,
} from "@/lib/storage";
import { calculateNextReview } from "@/lib/srs";
import {
  GamificationState, loadGamification, saveGamification,
  XP_REWARDS, evaluateBadges, BadgeDef,
} from "@/lib/gamification";
import {
  MissionThemeId, MissionThemeMap, MissionThemeDef,
  loadMissionThemes, saveMissionThemes,
  resolveMissionThemeId, resolveMissionTheme,
} from "@/lib/missionThemes";

interface AppContextType {
  words: Word[];
  settings: Settings;
  streak: StreakData;
  plan: PlanSettings;
  crunch: CrunchState;
  gamification: GamificationState;
  newlyUnlockedBadges: BadgeDef[];
  dismissBadgeToasts: () => void;
  updateWord: (id: string, updates: Partial<Word>) => void;
  markWordReviewed: (id: string, quality: number) => void;
  updateSettings: (updates: Partial<Settings>) => void;
  updatePlan: (updates: Partial<PlanSettings>) => void;
  updateCrunch: (updates: Partial<CrunchState>) => void;
  resetAllProgress: () => void;
  setWords: React.Dispatch<React.SetStateAction<Word[]>>;
  bookmarks: BookmarkEntry[];
  isBookmarked: (wordId: string) => boolean;
  toggleBookmark: (entry: Omit<BookmarkEntry, "addedAt">) => void;
  removeBookmark: (wordId: string) => void;
  missionThemes: MissionThemeMap;
  getMissionThemeId: (missionDay: number) => MissionThemeId;
  getMissionTheme: (missionDay: number) => MissionThemeDef;
  setMissionTheme: (missionDay: number, themeId: MissionThemeId) => void;
  resetMissionTheme: (missionDay: number) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [words, setWords] = useState<Word[]>([]);
  const [settings, setSettings] = useState<Settings>(loadSettings());
  const [streak, setStreak] = useState<StreakData>(loadStreak());
  const [plan, setPlan] = useState<PlanSettings>(loadPlan());
  const [crunch, setCrunch] = useState<CrunchState>(loadCrunch());
  const [gamification, setGamification] = useState<GamificationState>(loadGamification());
  const [newlyUnlockedBadges, setNewlyUnlockedBadges] = useState<BadgeDef[]>([]);
  const [bookmarks, setBookmarks] = useState<BookmarkEntry[]>(loadBookmarks);
  const [missionThemes, setMissionThemesState] = useState<MissionThemeMap>(loadMissionThemes);

  const dismissBadgeToasts = useCallback(() => setNewlyUnlockedBadges([]), []);

  const getMissionThemeId = useCallback(
    (missionDay: number) => resolveMissionThemeId(missionDay, missionThemes),
    [missionThemes]
  );

  const getMissionTheme = useCallback(
    (missionDay: number) => resolveMissionTheme(missionDay, missionThemes),
    [missionThemes]
  );

  const setMissionTheme = useCallback(
    (missionDay: number, themeId: MissionThemeId) => {
      setMissionThemesState((prev) => {
        const next = { ...prev, [missionDay]: themeId };
        saveMissionThemes(next);
        return next;
      });
    },
    []
  );

  const resetMissionTheme = useCallback((missionDay: number) => {
    setMissionThemesState((prev) => {
      if (!(missionDay in prev)) return prev;
      const next = { ...prev };
      delete next[missionDay];
      saveMissionThemes(next);
      return next;
    });
  }, []);

  const isBookmarked = useCallback(
    (wordId: string) => bookmarks.some((b) => b.wordId === wordId),
    [bookmarks]
  );

  const toggleBookmark = useCallback(
    (entry: Omit<BookmarkEntry, "addedAt">) => {
      setBookmarks((prev) => {
        const existing = prev.find((b) => b.wordId === entry.wordId);
        const next = existing
          ? prev.filter((b) => b.wordId !== entry.wordId)
          : [{ ...entry, addedAt: new Date().toISOString() }, ...prev];
        saveBookmarks(next);
        return next;
      });
    },
    []
  );

  const removeBookmark = useCallback((wordId: string) => {
    setBookmarks((prev) => {
      const next = prev.filter((b) => b.wordId !== wordId);
      saveBookmarks(next);
      return next;
    });
  }, []);

  useEffect(() => {
    setWords(loadWords());
  }, []);

  useEffect(() => {
    if (settings.darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [settings.darkMode]);

  const updateWord = useCallback((id: string, updates: Partial<Word>) => {
    setWords((prev) => {
      const updated = prev.map((w) => (w.id === id ? { ...w, ...updates } : w));
      saveWords(updated);
      return updated;
    });
  }, []);

  const markWordReviewed = useCallback(
    (id: string, quality: number) => {
      let updatedWords: Word[] = [];
      let prevStatus: Word["status"] | null = null;
      let newStatus: Word["status"] | null = null;

      setWords((prev) => {
        const word = prev.find((w) => w.id === id);
        if (!word) { updatedWords = prev; return prev; }
        prevStatus = word.status;
        const updates = calculateNextReview(word, quality);
        newStatus = (updates.status as Word["status"]) ?? word.status;
        const updated = prev.map((w) => (w.id === id ? { ...w, ...updates } : w));
        saveWords(updated);
        updatedWords = updated;
        return updated;
      });

      let updatedStreak: StreakData = streak;
      setStreak((s) => {
        const newStreak = updateStreak(s);
        updatedStreak = newStreak;
        return newStreak;
      });

      // Award XP
      let xp = XP_REWARDS.REVIEW;
      if (quality >= 3) xp += XP_REWARDS.CORRECT;
      if (quality === 5) xp += XP_REWARDS.PERFECT;
      if (prevStatus === "new" && newStatus !== "new") xp += XP_REWARDS.NEW_LEARNED;
      if (prevStatus !== "mastered" && newStatus === "mastered") xp += XP_REWARDS.MASTERED;

      setGamification((g) => {
        const today = new Date().toDateString();
        const isToday = g.todayDate === today;
        const next: GamificationState = {
          ...g,
          totalXp: g.totalXp + xp,
          todayXp: (isToday ? g.todayXp : 0) + xp,
          todayDate: today,
        };
        const { unlocked, state } = evaluateBadges({
          words: updatedWords,
          streak: updatedStreak,
          gamification: next,
        });
        if (unlocked.length) setNewlyUnlockedBadges((prev) => [...prev, ...unlocked]);
        saveGamification(state);
        return state;
      });
    },
    [streak]
  );

  const updateSettings = useCallback((updates: Partial<Settings>) => {
    setSettings((prev) => {
      const newSettings = { ...prev, ...updates };
      saveSettings(newSettings);
      return newSettings;
    });
  }, []);

  const updatePlan = useCallback((updates: Partial<PlanSettings>) => {
    setPlan((prev) => {
      const newPlan = { ...prev, ...updates };
      savePlan(newPlan);
      return newPlan;
    });
  }, []);

  const updateCrunch = useCallback((updates: Partial<CrunchState>) => {
    setCrunch((prev) => {
      const newState = { ...prev, ...updates };
      saveCrunch(newState);
      return newState;
    });
  }, []);

  const resetAllProgress = useCallback(() => {
    setWords((prev) => {
      const fresh = prev.map((w) => ({
        ...w,
        difficulty: 0,
        lastReviewed: null as null,
        nextReview: null as null,
        status: "new" as const,
        interval: 0,
        easeFactor: 2.5,
        repetitions: 0,
        correctCount: 0,
        incorrectCount: 0,
        qualityHistory: [],
      }));
      saveWords(fresh);
      return fresh;
    });
  }, []);

  return (
    <AppContext.Provider
      value={{
        words, settings, streak, plan, crunch,
        gamification, newlyUnlockedBadges, dismissBadgeToasts,
        updateWord, markWordReviewed, updateSettings,
        updatePlan, updateCrunch, resetAllProgress, setWords,
        bookmarks, isBookmarked, toggleBookmark, removeBookmark,
        missionThemes, getMissionThemeId, getMissionTheme,
        setMissionTheme, resetMissionTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
