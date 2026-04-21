import {
  createContext, useContext, useState, useEffect, useCallback, ReactNode,
} from "react";
import { Word } from "@/data/words";
import {
  Settings, StreakData, PlanSettings, CrunchState,
  loadWords, saveWords, loadSettings, saveSettings,
  loadStreak, updateStreak, loadPlan, savePlan, loadCrunch, saveCrunch,
} from "@/lib/storage";
import { calculateNextReview } from "@/lib/srs";

interface AppContextType {
  words: Word[];
  settings: Settings;
  streak: StreakData;
  plan: PlanSettings;
  crunch: CrunchState;
  updateWord: (id: string, updates: Partial<Word>) => void;
  markWordReviewed: (id: string, quality: number) => void;
  updateSettings: (updates: Partial<Settings>) => void;
  updatePlan: (updates: Partial<PlanSettings>) => void;
  updateCrunch: (updates: Partial<CrunchState>) => void;
  resetAllProgress: () => void;
  setWords: React.Dispatch<React.SetStateAction<Word[]>>;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [words, setWords] = useState<Word[]>([]);
  const [settings, setSettings] = useState<Settings>(loadSettings());
  const [streak, setStreak] = useState<StreakData>(loadStreak());
  const [plan, setPlan] = useState<PlanSettings>(loadPlan());
  const [crunch, setCrunch] = useState<CrunchState>(loadCrunch());

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
      setStreak((s) => {
        const newStreak = updateStreak(s);
        return newStreak;
      });
    },
    []
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
        updateWord, markWordReviewed, updateSettings,
        updatePlan, updateCrunch, resetAllProgress, setWords,
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
