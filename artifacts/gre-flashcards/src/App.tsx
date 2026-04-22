import { useState } from "react";
import { AnimatePresence } from "framer-motion";
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
import QuickTen from "@/components/QuickTen";
import {
  LayoutDashboard, BookOpen, Target, Clock, Settings, Moon, Sun,
  CalendarDays, GitFork, BarChart3, TrendingUp, Zap,
} from "lucide-react";

type Page = "dashboard" | "study" | "practice" | "review" | "settings" | "plan" | "confusables" | "analytics" | "progress";

const NAV_ITEMS: Array<{ id: Page; icon: React.ReactNode; label: string }> = [
  { id: "dashboard",   icon: <LayoutDashboard size={18} />, label: "Home" },
  { id: "study",       icon: <BookOpen size={18} />,        label: "Study" },
  { id: "practice",    icon: <Target size={18} />,          label: "Practice" },
  { id: "review",      icon: <Clock size={18} />,           label: "Review" },
  { id: "plan",        icon: <CalendarDays size={18} />,    label: "Plan" },
  { id: "confusables", icon: <GitFork size={18} />,         label: "Confusables" },
  { id: "analytics",   icon: <BarChart3 size={18} />,       label: "Analytics" },
  { id: "progress",    icon: <TrendingUp size={18} />,      label: "Progress" },
  { id: "settings",    icon: <Settings size={18} />,        label: "Settings" },
];

function MainApp() {
  const { settings, updateSettings, crunch } = useApp();
  const [page, setPage] = useState<Page>("dashboard");
  const [pageParams, setPageParams] = useState<Record<string, unknown>>({});
  const [quickTenOpen, setQuickTenOpen] = useState(false);

  const navigate = (p: string, params?: Record<string, unknown>) => {
    setPage(p as Page);
    setPageParams(params ?? {});
  };

  const renderPage = () => {
    switch (page) {
      case "dashboard":
        return <Dashboard onNavigate={navigate} />;
      case "study":
        return <StudyMode onBack={() => setPage("dashboard")} initialDay={pageParams.day as number | undefined} />;
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
      case "settings":
        return <SettingsPage onBack={() => setPage("dashboard")} />;
      default:
        return <Dashboard onNavigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top bar */}
      <header className="sticky top-0 z-40 bg-background/90 backdrop-blur border-b border-border">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg width="28" height="28" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <rect width="180" height="180" rx="36" className="fill-foreground" />
              <path d="M22 110 Q90 78 158 110 Q140 122 90 122 Q40 122 22 110 Z" fill="#FF3C00"/>
              <ellipse cx="64" cy="108" rx="14" ry="9" className="fill-background"/>
              <ellipse cx="116" cy="108" rx="14" ry="9" className="fill-background"/>
              <circle cx="64" cy="108" r="5" className="fill-foreground"/>
              <circle cx="116" cy="108" r="5" className="fill-foreground"/>
              <path d="M30 70 L150 58 L148 78 Q90 70 32 82 Z" className="fill-foreground" stroke="#FF3C00" strokeWidth="2"/>
            </svg>
            <span className="font-bold text-lg text-foreground tracking-tight">GRE Vocab Ninja</span>
            {crunch.active && (
              <span className="text-[10px] font-bold bg-red-500 text-white px-2 py-0.5 rounded-full animate-pulse">
                CRUNCH
              </span>
            )}
          </div>
          <button
            onClick={() => updateSettings({ darkMode: !settings.darkMode })}
            className="p-2 rounded-xl hover:bg-muted transition-colors text-muted-foreground"
          >
            {settings.darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="pb-28">{renderPage()}</main>

      {/* Quick 10 FAB */}
      <button
        onClick={() => setQuickTenOpen(true)}
        className="fixed bottom-20 right-4 z-40 flex items-center gap-2 px-4 py-3 rounded-full bg-amber-500 hover:bg-amber-600 text-white font-bold shadow-lg transition-all hover:scale-105 active:scale-95"
        title="Quick 10 micro-session"
      >
        <Zap size={18} />
        <span className="text-sm">Quick 10</span>
      </button>

      {/* Bottom nav — horizontally scrollable */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur border-t border-border">
        <div className="overflow-x-auto scrollbar-none">
          <div className="flex items-stretch h-16 min-w-max px-2 mx-auto" style={{ maxWidth: "max-content" }}>
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => { setPage(item.id); setPageParams({}); }}
                className={`flex flex-col items-center justify-center gap-0.5 px-3 h-full min-w-[56px] transition-colors relative ${
                  page === item.id
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.icon}
                <span className="text-[9px] font-medium whitespace-nowrap">{item.label}</span>
                {page === item.id && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-primary" />
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Quick Ten overlay */}
      <AnimatePresence>
        {quickTenOpen && <QuickTen onClose={() => setQuickTenOpen(false)} />}
      </AnimatePresence>
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
