import { useApp } from "@/context/AppContext";
import { loadMistakes } from "@/lib/storage";
import { ArrowLeft, Moon, Sun, Volume2, Timer, RotateCcw, Palette, Search, RotateCw, Check } from "lucide-react";
import { useMemo, useState } from "react";
import { TOTAL_DAYS } from "@/data/words";
import { THEME_LIST, defaultThemeForMission, type MissionThemeId } from "@/lib/missionThemes";

interface SettingsProps {
  onBack: () => void;
}

export default function Settings({ onBack }: SettingsProps) {
  const {
    settings, updateSettings, resetAllProgress, streak,
    missionThemes, getMissionThemeId, setMissionTheme, resetMissionTheme,
  } = useApp();
  const [showConfirm, setShowConfirm] = useState(false);
  const [themeQuery, setThemeQuery] = useState("");
  const [expandedMission, setExpandedMission] = useState<number | null>(1);
  const mistakes = loadMistakes();

  const missionList = useMemo(
    () => Array.from({ length: TOTAL_DAYS }, (_, i) => i + 1),
    []
  );
  const filteredMissions = useMemo(() => {
    const q = themeQuery.trim().toLowerCase();
    if (!q) return missionList;
    return missionList.filter((d) => {
      if (`mission ${d}`.includes(q) || `${d}`.includes(q)) return true;
      const themeId = getMissionThemeId(d);
      const themeLabel = THEME_LIST.find((t) => t.id === themeId)?.label ?? "";
      return themeLabel.toLowerCase().includes(q);
    });
  }, [missionList, themeQuery, getMissionThemeId]);

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

        {/* Mission Themes */}
        <div className="bg-card border border-card-border rounded-2xl p-5">
          <div className="flex items-start gap-3 mb-3">
            <Palette size={20} className="text-primary mt-0.5" />
            <div className="flex-1">
              <div className="font-semibold text-foreground">Mission Color Themes</div>
              <div className="text-sm text-muted-foreground">
                Pick a color theme for each mission. Affects the Mission, Set Test, and Study Mode pages.
              </div>
            </div>
          </div>

          <div className="relative mb-3">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={themeQuery}
              onChange={(e) => setThemeQuery(e.target.value)}
              placeholder="Search by mission number or theme name…"
              className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-card-border bg-background focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div className="max-h-[420px] overflow-y-auto -mx-1 px-1 space-y-1.5">
            {filteredMissions.length === 0 && (
              <div className="text-sm text-muted-foreground py-6 text-center">No missions match your search.</div>
            )}
            {filteredMissions.map((day) => {
              const currentId = getMissionThemeId(day);
              const currentTheme = THEME_LIST.find((t) => t.id === currentId)!;
              const isCustom = day in missionThemes && missionThemes[day] !== defaultThemeForMission(day);
              const isExpanded = expandedMission === day;
              return (
                <div key={day} className="rounded-xl border border-card-border bg-background overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setExpandedMission(isExpanded ? null : day)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-left hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-1.5 shrink-0">
                      {currentTheme.swatch.map((c, i) => (
                        <span
                          key={i}
                          className="w-3.5 h-3.5 rounded-full ring-1 ring-black/5"
                          style={{ background: c }}
                        />
                      ))}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-foreground">Mission {day}</div>
                      <div className="text-xs text-muted-foreground truncate">
                        {currentTheme.label}
                        {isCustom && <span className="ml-1.5 text-[10px] uppercase tracking-wide font-bold text-primary">· Custom</span>}
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">{isExpanded ? "Hide" : "Edit"}</span>
                  </button>

                  {isExpanded && (
                    <div className="px-3 pb-3 pt-1 border-t border-card-border bg-muted/20">
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                        {THEME_LIST.map((t) => {
                          const selected = currentId === t.id;
                          return (
                            <button
                              key={t.id}
                              type="button"
                              onClick={() => setMissionTheme(day, t.id as MissionThemeId)}
                              className={`relative text-left rounded-lg border p-2.5 transition-all ${
                                selected
                                  ? "border-primary ring-2 ring-primary/30 bg-card"
                                  : "border-card-border bg-card hover:border-primary/50"
                              }`}
                            >
                              <div
                                className="h-6 w-full rounded-md mb-2"
                                style={{ background: t.heroGradient }}
                              />
                              <div className="flex items-center gap-1 mb-0.5">
                                {selected && <Check size={12} className="text-primary" />}
                                <span className="text-xs font-semibold text-foreground">{t.label}</span>
                              </div>
                              <div className="text-[10px] leading-tight text-muted-foreground line-clamp-2">
                                {t.description}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                      {isCustom && (
                        <button
                          type="button"
                          onClick={() => resetMissionTheme(day)}
                          className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <RotateCw size={12} />
                          Reset to default ({THEME_LIST.find((t) => t.id === defaultThemeForMission(day))?.label})
                        </button>
                      )}
                    </div>
                  )}
                </div>
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
