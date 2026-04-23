import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AppProvider, useApp } from "@/context/AppContext";
import Dashboard from "@/pages/Dashboard";
import StudyMode from "@/pages/StudyMode";
import PracticeMode from "@/pages/PracticeMode";
import ReviewMode from "@/pages/ReviewMode";
import SettingsPage from "@/pages/Settings";
import PlanMode from "@/pages/PlanMode";
import Confusables from "@/pages/Confusables";
import Analytics from "@/pages/Analytics";
import Progress from "@/pages/Progress";
import Achievements from "@/pages/Achievements";
import QuickTen from "@/components/QuickTen";
import SidebarSearch from "@/components/SidebarSearch";
import BadgeToast from "@/components/BadgeToast";
import { levelFromXp } from "@/lib/gamification";
import {
  LayoutDashboard, BookOpen, Target, Clock, Settings, Moon, Sun,
  CalendarDays, GitFork, BarChart3, TrendingUp, Zap, ChevronLeft, ChevronRight, Menu,
  Trophy, Flame, Sparkles,
} from "lucide-react";

type Page = "dashboard" | "study" | "practice" | "review" | "settings" | "plan" | "confusables" | "analytics" | "progress" | "achievements";

const NAV_ITEMS: Array<{ id: Page; icon: React.ReactNode; label: string }> = [
  { id: "dashboard",   icon: <LayoutDashboard size={18} />, label: "Home" },
  { id: "study",       icon: <BookOpen size={18} />,        label: "Learn" },
  { id: "practice",    icon: <Target size={18} />,          label: "Practice" },
  { id: "review",      icon: <Clock size={18} />,           label: "Review" },
  { id: "plan",        icon: <CalendarDays size={18} />,    label: "Plan" },
  { id: "analytics",   icon: <BarChart3 size={18} />,       label: "Analytics" },
  { id: "progress",    icon: <TrendingUp size={18} />,      label: "Progress" },
  { id: "achievements",icon: <Trophy size={18} />,          label: "Achievements" },
  { id: "settings",    icon: <Settings size={18} />,        label: "Settings" },
];

function MainApp() {
  const { settings, updateSettings, crunch, gamification, streak } = useApp();
  const lvl = levelFromXp(gamification.totalXp);
  const [page, setPage] = useState<Page>("dashboard");
  const [pageParams, setPageParams] = useState<Record<string, unknown>>({});
  const [quickTenOpen, setQuickTenOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const navigate = (p: string, params?: Record<string, unknown>) => {
    setPage(p as Page);
    setPageParams(params ?? {});
  };

  const renderPage = () => {
    switch (page) {
      case "dashboard":
        return <Dashboard onNavigate={navigate} />;
      case "study":
        return <StudyMode onBack={() => setPage("dashboard")} initialDay={pageParams.day as number | undefined} initialWordId={pageParams.wordId as string | undefined} />;
      case "practice":
        return <PracticeMode onBack={() => setPage("dashboard")} initialSource={pageParams.source as string | undefined} />;
      case "review":
        return <ReviewMode onBack={() => setPage("dashboard")} />;
      case "plan":
        return <PlanMode onBack={() => setPage("dashboard")} onStartSession={() => setPage("review")} />;
      case "confusables":
        return <Confusables onBack={() => setPage("dashboard")} />;
      case "analytics":
        return <Analytics onBack={() => setPage("dashboard")} onStudyWord={(id) => { setPageParams({ wordId: id }); setPage("study"); }} />;
      case "progress":
        return <Progress onBack={() => setPage("dashboard")} />;
      case "achievements":
        return <Achievements onBack={() => setPage("dashboard")} />;
      case "settings":
        return <SettingsPage onBack={() => setPage("dashboard")} />;
      default:
        return <Dashboard onNavigate={navigate} />;
    }
  };

  const sidebarWidth = sidebarCollapsed ? 72 : 232;

  const Sidebar = ({ inDrawer = false }: { inDrawer?: boolean }) => (
    <div className="h-full flex flex-col bg-card border-r border-border">
      {/* Logo + collapse */}
      <div className={`flex items-center ${sidebarCollapsed && !inDrawer ? "justify-center" : "justify-between"} px-3 h-14 border-b border-border shrink-0`}>
        <div className="flex items-center gap-2 overflow-hidden">
          <svg width="28" height="28" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="shrink-0">
            <rect width="180" height="180" rx="36" className="fill-foreground" />
            <path d="M22 110 Q90 78 158 110 Q140 122 90 122 Q40 122 22 110 Z" fill="#FF3C00"/>
            <ellipse cx="64" cy="108" rx="14" ry="9" className="fill-background"/>
            <ellipse cx="116" cy="108" rx="14" ry="9" className="fill-background"/>
            <circle cx="64" cy="108" r="5" className="fill-foreground"/>
            <circle cx="116" cy="108" r="5" className="fill-foreground"/>
            <path d="M30 70 L150 58 L148 78 Q90 70 32 82 Z" className="fill-foreground" stroke="#FF3C00" strokeWidth="2"/>
          </svg>
          {(!sidebarCollapsed || inDrawer) && (
            <span className="font-bold text-sm text-foreground tracking-tight whitespace-nowrap">GRE Vocab Ninja</span>
          )}
        </div>
        {!inDrawer && (
          <button
            onClick={() => setSidebarCollapsed((v) => !v)}
            className="hidden lg:flex items-center justify-center w-7 h-7 rounded-lg hover:bg-muted text-muted-foreground transition-colors"
            title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {sidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        )}
      </div>

      {/* Search */}
      {(!sidebarCollapsed || inDrawer) && (
        <SidebarSearch
          onSelect={(w) => {
            navigate("study", { wordId: w.id });
            setMobileNavOpen(false);
          }}
        />
      )}

      {/* Gamification chip */}
      {(!sidebarCollapsed || inDrawer) ? (
        <button
          onClick={() => { setPage("achievements"); setPageParams({}); setMobileNavOpen(false); }}
          className="mx-3 mt-3 p-3 rounded-xl bg-gradient-to-br from-violet-500/10 via-fuchsia-500/10 to-amber-500/10 border border-border hover:border-amber-400/60 transition-colors text-left"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-foreground">
              <Sparkles size={12} className="text-violet-500" />
              Lvl {lvl.level}
            </div>
            <div className="flex items-center gap-1 text-xs font-bold text-orange-500">
              <Flame size={12} />
              {streak.currentStreak}
            </div>
          </div>
          <div className="h-1.5 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-amber-500"
              style={{ width: `${Math.min(100, lvl.progress * 100)}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-muted-foreground mt-1.5">
            <span>{gamification.totalXp.toLocaleString()} XP</span>
            <span>+{gamification.todayXp} today</span>
          </div>
        </button>
      ) : !inDrawer && (
        <button
          onClick={() => { setPage("achievements"); setPageParams({}); }}
          title={`Lvl ${lvl.level} · ${streak.currentStreak}d streak`}
          className="mx-2 mt-3 p-2 rounded-xl bg-muted/50 hover:bg-muted text-foreground flex flex-col items-center gap-1"
        >
          <Flame size={16} className="text-orange-500" />
          <span className="text-[10px] font-bold">{streak.currentStreak}</span>
        </button>
      )}

      {/* Crunch badge */}
      {crunch.active && (!sidebarCollapsed || inDrawer) && (
        <div className="px-3 pt-3">
          <div className="text-[10px] font-bold bg-red-500 text-white px-2 py-1 rounded-full text-center animate-pulse">
            CRUNCH MODE
          </div>
        </div>
      )}

      {/* Nav items */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-1">
        {NAV_ITEMS.map((item) => {
          const active = page === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                setPage(item.id);
                setPageParams({});
                setMobileNavOpen(false);
              }}
              title={sidebarCollapsed && !inDrawer ? item.label : undefined}
              className={`w-full flex items-center gap-3 ${sidebarCollapsed && !inDrawer ? "justify-center px-0" : "px-3"} py-2.5 rounded-xl text-sm font-medium transition-colors ${
                active
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <span className="shrink-0">{item.icon}</span>
              {(!sidebarCollapsed || inDrawer) && (
                <span className="truncate">{item.label}</span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer: theme toggle */}
      <div className="border-t border-border p-2">
        <button
          onClick={() => updateSettings({ darkMode: !settings.darkMode })}
          title={sidebarCollapsed && !inDrawer ? (settings.darkMode ? "Light mode" : "Dark mode") : undefined}
          className={`w-full flex items-center gap-3 ${sidebarCollapsed && !inDrawer ? "justify-center px-0" : "px-3"} py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors`}
        >
          <span className="shrink-0">
            {settings.darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </span>
          {(!sidebarCollapsed || inDrawer) && (
            <span>{settings.darkMode ? "Light mode" : "Dark mode"}</span>
          )}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Desktop sidebar */}
      <aside
        className="hidden lg:block fixed top-0 left-0 h-screen z-40 transition-[width] duration-200"
        style={{ width: sidebarWidth }}
      >
        <Sidebar />
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileNavOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileNavOpen(false)}
              className="lg:hidden fixed inset-0 z-50 bg-black/40"
            />
            <motion.aside
              initial={{ x: -260 }}
              animate={{ x: 0 }}
              exit={{ x: -260 }}
              transition={{ type: "tween", duration: 0.2 }}
              className="lg:hidden fixed top-0 left-0 h-screen z-50 w-60"
            >
              <Sidebar inDrawer />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <style>{`@media (min-width: 1024px) { .main-col { margin-left: var(--sb-w); } }`}</style>
      {/* Main column */}
      <div
        className="main-col flex-1 min-w-0 lg:transition-[margin] lg:duration-200"
        style={{ ["--sb-w" as string]: `${sidebarWidth}px` }}
      >
        {/* Mobile top bar */}
        <header className="lg:hidden sticky top-0 z-30 bg-background/90 backdrop-blur border-b border-border">
          <div className="px-4 h-14 flex items-center justify-between">
            <button
              onClick={() => setMobileNavOpen(true)}
              className="p-2 -ml-2 rounded-xl hover:bg-muted text-foreground"
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm">GRE Vocab Ninja</span>
              {crunch.active && (
                <span className="text-[10px] font-bold bg-red-500 text-white px-2 py-0.5 rounded-full animate-pulse">
                  CRUNCH
                </span>
              )}
            </div>
            <button
              onClick={() => updateSettings({ darkMode: !settings.darkMode })}
              className="p-2 -mr-2 rounded-xl hover:bg-muted text-muted-foreground"
            >
              {settings.darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </header>

        <main className="pb-24 lg:pb-12">{renderPage()}</main>
      </div>

      {/* Quick 10 FAB */}
      <button
        onClick={() => setQuickTenOpen(true)}
        className="fixed bottom-6 right-4 z-40 flex items-center gap-2 px-4 py-3 rounded-full bg-amber-500 hover:bg-amber-600 text-white font-bold shadow-lg transition-all hover:scale-105 active:scale-95"
        title="Quick 10 micro-session"
      >
        <Zap size={18} />
        <span className="text-sm">Quick 10</span>
      </button>

      {/* Quick Ten overlay */}
      <AnimatePresence>
        {quickTenOpen && <QuickTen onClose={() => setQuickTenOpen(false)} />}
      </AnimatePresence>

      {/* Badge unlock toasts */}
      <BadgeToast />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
