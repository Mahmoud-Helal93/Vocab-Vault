import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronDown, Palette } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { THEME_LIST, type MissionThemeId } from "@/lib/missionThemes";

interface ThemeChipProps {
  collapsed?: boolean;
}

export default function ThemeChip({ collapsed = false }: ThemeChipProps) {
  const { globalTheme, globalThemeId, setGlobalTheme } = useApp();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={wrapRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        title={collapsed ? `Theme: ${globalTheme.label}` : undefined}
        aria-label={`Change color theme (current: ${globalTheme.label})`}
        aria-haspopup="dialog"
        aria-expanded={open}
        className={`w-full flex items-center ${
          collapsed ? "justify-center px-0" : "gap-2 px-2"
        } py-2 rounded-xl text-sm font-medium transition-colors ${
          open
            ? "bg-muted text-foreground"
            : "text-muted-foreground hover:bg-muted hover:text-foreground"
        }`}
      >
        <span
          className="shrink-0 w-7 h-7 rounded-lg ring-1 ring-black/10 dark:ring-white/10 shadow-sm"
          style={{ background: globalTheme.heroGradient }}
        />
        {!collapsed && (
          <>
            <span className="flex-1 text-left truncate text-foreground">
              {globalTheme.label}
            </span>
            <ChevronDown
              size={14}
              className={`shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
            />
          </>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="Mission color theme"
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.12 }}
            className="absolute z-50 bottom-full mb-2 left-0 w-72 max-w-[calc(100vw-2rem)] rounded-2xl border border-border bg-popover text-popover-foreground shadow-xl p-3"
          >
            <div className="flex items-center gap-2 px-1 pb-2 mb-1 border-b border-border">
              <Palette size={14} className="text-primary" />
              <div className="text-[12px] font-bold uppercase tracking-wider text-foreground">
                Mission Color Theme
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {THEME_LIST.map((t) => {
                const selected = globalThemeId === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => {
                      setGlobalTheme(t.id as MissionThemeId);
                      setOpen(false);
                    }}
                    className={`relative text-left rounded-xl border p-2 transition-all ${
                      selected
                        ? "border-primary ring-2 ring-primary/30 bg-card"
                        : "border-card-border bg-background hover:border-primary/50"
                    }`}
                  >
                    <div
                      className="h-6 w-full rounded-md mb-1.5"
                      style={{ background: t.heroGradient }}
                    />
                    <div className="flex items-center gap-1">
                      {selected && <Check size={12} className="text-primary shrink-0" />}
                      <span className="text-[12px] font-semibold text-foreground truncate">
                        {t.label}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
