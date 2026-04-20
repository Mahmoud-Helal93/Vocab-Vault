import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { Word } from "@/data/words";
import { Settings, StreakData, loadWords, saveWords, loadSettings, saveSettings, loadStreak, updateStreak } from "@/lib/storage";
import { calculateNextReview } from "@/lib/srs";

interface AppContextType {
  words: Word[];
  settings: Settings;
  streak: StreakData;
  updateWord: (id: string, updates: Partial<Word>) => void;
  markWordReviewed: (id: string, quality: number) => void;
  updateSettings: (updates: Partial<Settings>) => void;
  resetAllProgress: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [words, setWords] = useState<Word[]>([]);
  const [settings, setSettings] = useState<Settings>(loadSettings());
  const [streak, setStreak] = useState<StreakData>(loadStreak());

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
      setWords((prev) => {
        const word = prev.find((w) => w.id === id);
        if (!word) return prev;
        const updates = calculateNextReview(word, quality);
        const updated = prev.map((w) => (w.id === id ? { ...w, ...updates } : w));
        saveWords(updated);
        return updated;
      });
      const newStreak = updateStreak(streak);
      setStreak(newStreak);
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

  const resetAllProgress = useCallback(() => {
    const fresh = loadWords().map((w) => ({
      ...w,
      difficulty: 0,
      lastReviewed: null,
      nextReview: null,
      status: "new" as const,
      interval: 0,
      easeFactor: 2.5,
      repetitions: 0,
      correctCount: 0,
      incorrectCount: 0,
    }));
    saveWords(fresh);
    setWords(fresh);
  }, []);

  return (
    <AppContext.Provider
      value={{ words, settings, streak, updateWord, markWordReviewed, updateSettings, resetAllProgress }}
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
