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
import MissionTest from "@/pages/MissionTest";
import SetTest from "@/pages/SetTest";
import Bookmarks from "@/pages/Bookmarks";
import QuickTen from "@/components/QuickTen";
import SidebarSearch from "@/components/SidebarSearch";
import BadgeToast from "@/components/BadgeToast";
import GlobalStatsBar from "@/components/GlobalStatsBar";
import vocabNinjaLogo from "@assets/Gemini_Generated_Image_tgtyf7tgtyf7tgty_1776986903352.png";
import {
  LayoutDashboard, BookOpen, Target, Clock, Settings, Moon, Sun,
  CalendarDays, GitFork, BarChart3, TrendingUp, Zap, ChevronLeft, ChevronRight, Menu,
  Trophy, Bookmark,
} from "lucide-react";

type Page = "dashboard" | "study" | "practice" | "review" | "settings" | "plan" | "confusables" | "analytics" | "progress" | "achievements" | "mission-test" | "set-test" | "bookmarks";

const NAV_ITEMS: Array<{ id: Page; icon: React.ReactNode; label: string }> = [
  { id: "dashboard",   icon: <LayoutDashboard size={18} />, label: "Home" },
  { id: "study",       icon: <BookOpen size={18} />,        label: "Learn" },
  { id: "review",      icon: <Clock size={18} />,           label: "Review" },
  { id: "practice",    icon: <Target size={18} />,          label: "Test" },
  { id: "bookmarks",   icon: <Bookmark size={18} />,        label: "Bookmarks" },
  { id: "achievements",icon: <Trophy size={18} />,          label: "Achievements" },
  { id: "settings",    icon: <Settings size={18} />,        label: "Settings" },
];

function MainApp() {
  const { settings, updateSettings, crunch } = useApp();
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
        return <StudyMode onBack={() => setPage("dashboard")} onNavigate={navigate} initialDay={pageParams.day as number | undefined} initialWordId={pageParams.wordId as string | undefined} />;
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
      case "mission-test":
        return <MissionTest onBack={() => setPage("study")} missionDay={(pageParams.missionDay as number) ?? 1} />;
      case "set-test":
        return (
          <SetTest
            onBack={() => setPage("study")}
            missionDay={(pageParams.missionDay as number) ?? 1}
            group={(pageParams.group as number) ?? 1}
          />
        );
      case "bookmarks":
        return <Bookmarks onBack={() => setPage("dashboard")} onNavigate={navigate} />;
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
      <div className={`flex items-center ${sidebarCollapsed && !inDrawer ? "justify-center" : "justify-between"} px-3 h-16 border-b border-border shrink-0`}>
        <div className="flex items-center gap-2 overflow-hidden">
          {sidebarCollapsed && !inDrawer ? (
            <div className="w-9 h-9 overflow-hidden flex items-center justify-start shrink-0">
              <img
                src={vocabNinjaLogo}
                alt="Vocab Ninja"
                className="h-9 w-auto object-contain object-left max-w-none"
                style={{ width: "auto" }}
              />
            </div>
          ) : (
            <img
              src={vocabNinjaLogo}
              alt="Vocab Ninja — Master Words. Master Every Mission."
              className="h-11 w-auto object-contain shrink-0"
            />
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
                  ? "bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-300"
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
      <div className="border-t border-border p-2 space-y-1">
        {[
          { id: "light", label: "Light mode", icon: <Sun size={18} />, active: !settings.darkMode },
          { id: "dark",  label: "Dark mode",  icon: <Moon size={18} />, active: settings.darkMode },
        ].map((mode) => (
          <button
            key={mode.id}
            onClick={() => updateSettings({ darkMode: mode.id === "dark" })}
            title={sidebarCollapsed && !inDrawer ? mode.label : undefined}
            className={`w-full flex items-center gap-3 ${sidebarCollapsed && !inDrawer ? "justify-center px-0" : "px-3"} py-2.5 rounded-xl text-sm font-medium transition-colors ${
              mode.active
                ? "bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-300"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <span className="shrink-0">{mode.icon}</span>
            {(!sidebarCollapsed || inDrawer) && <span>{mode.label}</span>}
          </button>
        ))}
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
              <img src={vocabNinjaLogo} alt="Vocab Ninja" className="h-8 w-auto object-contain" />
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

        <main className="pb-24 lg:pb-12">
          {renderPage()}
        </main>
      </div>

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
