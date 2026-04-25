import { useApp } from "@/context/AppContext";
import { loadMistakes } from "@/lib/storage";
import { ArrowLeft, Moon, Sun, Volume2, Timer, RotateCcw, Palette, Check } from "lucide-react";
import { useState } from "react";
import { THEME_LIST, type MissionThemeId } from "@/lib/missionThemes";

interface SettingsProps {
  onBack: () => void;
}

export default function Settings({ onBack }: SettingsProps) {
  const {
    settings, updateSettings, resetAllProgress, streak,
    globalThemeId, setGlobalTheme,
  } = useApp();
  const [showConfirm, setShowConfirm] = useState(false);
  const mistakes = loadMistakes();

  const handleReset = () => {
    resetAllProgress();
    setShowConfirm(false);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <button onClick={onBack} className="p-2 rounded-xl hover:bg-muted transition-colors">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
      </div>

      <div className="space-y-4">
        {/* Dark Mode */}
        <div className="bg-card border border-card-border rounded-2xl p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {settings.darkMode ? <Moon size={20} className="text-primary" /> : <Sun size={20} className="text-amber-500" />}
            <div>
              <div className="font-semibold text-foreground">Dark Mode</div>
              <div className="text-sm text-muted-foreground">Toggle dark/light theme</div>
            </div>
          </div>
          <button
            onClick={() => updateSettings({ darkMode: !settings.darkMode })}
            className={`w-12 h-6 rounded-full transition-colors relative ${settings.darkMode ? "bg-primary" : "bg-muted"}`}
          >
            <div
              className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${settings.darkMode ? "translate-x-7" : "translate-x-1"}`}
            />
          </button>
        </div>

        {/* Sound */}
        <div className="bg-card border border-card-border rounded-2xl p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Volume2 size={20} className="text-primary" />
            <div>
              <div className="font-semibold text-foreground">Pronunciation</div>
              <div className="text-sm text-muted-foreground">Enable sound pronunciation button</div>
            </div>
          </div>
          <button
            onClick={() => updateSettings({ soundEnabled: !settings.soundEnabled })}
            className={`w-12 h-6 rounded-full transition-colors relative ${settings.soundEnabled ? "bg-primary" : "bg-muted"}`}
          >
            <div
              className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${settings.soundEnabled ? "translate-x-7" : "translate-x-1"}`}
            />
          </button>
        </div>

        {/* Timer */}
        <div className="bg-card border border-card-border rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <Timer size={20} className="text-primary" />
              <div>
                <div className="font-semibold text-foreground">Timer Mode</div>
                <div className="text-sm text-muted-foreground">GRE simulation timer per card</div>
              </div>
            </div>
            <button
              onClick={() => updateSettings({ timerEnabled: !settings.timerEnabled })}
              className={`w-12 h-6 rounded-full transition-colors relative ${settings.timerEnabled ? "bg-primary" : "bg-muted"}`}
            >
              <div
                className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${settings.timerEnabled ? "translate-x-7" : "translate-x-1"}`}
              />
            </button>
          </div>
          {settings.timerEnabled && (
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">Seconds per card:</span>
              <input
                type="range"
                min="10"
                max="120"
                step="5"
                value={settings.timerSeconds}
                onChange={(e) => updateSettings({ timerSeconds: parseInt(e.target.value) })}
                className="flex-1"
              />
              <span className="text-sm font-semibold text-foreground w-10">{settings.timerSeconds}s</span>
            </div>
          )}
        </div>

        {/* Color Theme */}
        <div className="bg-card border border-card-border rounded-2xl p-5">
          <div className="flex items-start gap-3 mb-4">
            <Palette size={20} className="text-primary mt-0.5" />
            <div className="flex-1">
              <div className="font-semibold text-foreground">Mission Color Theme</div>
              <div className="text-sm text-muted-foreground">
                One theme for all missions. Affects the Mission, Set Test, and Study Mode pages.
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {THEME_LIST.map((t) => {
              const selected = globalThemeId === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setGlobalTheme(t.id as MissionThemeId)}
                  className={`relative text-left rounded-xl border p-3 transition-all ${
                    selected
                      ? "border-primary ring-2 ring-primary/30 bg-card"
                      : "border-card-border bg-background hover:border-primary/50"
                  }`}
                >
                  <div
                    className="h-8 w-full rounded-lg mb-2.5"
                    style={{ background: t.heroGradient }}
                  />
                  <div className="flex items-center gap-1.5 mb-0.5">
                    {selected && <Check size={14} className="text-primary" />}
                    <span className="text-sm font-semibold text-foreground">{t.label}</span>
                  </div>
                  <div className="text-[11px] leading-tight text-muted-foreground line-clamp-2">
                    {t.description}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Stats */}
        <div className="bg-card border border-card-border rounded-2xl p-5">
          <h3 className="font-semibold text-foreground mb-3">Statistics</h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="text-muted-foreground">Current Streak</div>
            <div className="font-semibold text-foreground">{streak.currentStreak} days</div>
            <div className="text-muted-foreground">Longest Streak</div>
            <div className="font-semibold text-foreground">{streak.longestStreak} days</div>
            <div className="text-muted-foreground">Total Sessions</div>
            <div className="font-semibold text-foreground">{streak.totalSessions}</div>
            <div className="text-muted-foreground">Recent Mistakes</div>
            <div className="font-semibold text-foreground">{mistakes.length}</div>
          </div>
        </div>

        {/* Reset */}
        <div className="bg-card border border-red-200 dark:border-red-800/50 rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <RotateCcw size={20} className="text-red-500" />
              <div>
                <div className="font-semibold text-foreground">Reset Progress</div>
                <div className="text-sm text-muted-foreground">Clear all learning data and start fresh</div>
              </div>
            </div>
            {!showConfirm ? (
              <button
                onClick={() => setShowConfirm(true)}
                className="px-4 py-2 rounded-lg border border-red-300 dark:border-red-700 text-red-600 dark:text-red-400 text-sm font-medium hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              >
                Reset
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="px-3 py-2 rounded-lg border border-card-border text-sm font-medium hover:bg-muted transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReset}
                  className="px-3 py-2 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors"
                >
                  Confirm
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Recent Mistakes */}
        {mistakes.length > 0 && (
          <div className="bg-card border border-card-border rounded-2xl p-5">
            <h3 className="font-semibold text-foreground mb-3">Recent Mistakes</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {mistakes.slice(0, 20).map((m, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <span className="font-medium text-foreground">{m.word}</span>
                  <span className="text-muted-foreground text-xs">{m.questionType}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
