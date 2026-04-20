import { useState } from "react";
import { AppProvider, useApp } from "@/context/AppContext";
import Dashboard from "@/pages/Dashboard";
import StudyMode from "@/pages/StudyMode";
import PracticeMode from "@/pages/PracticeMode";
import ReviewMode from "@/pages/ReviewMode";
import SettingsPage from "@/pages/Settings";
import { LayoutDashboard, BookOpen, Target, Clock, Settings, Moon, Sun } from "lucide-react";

type Page = "dashboard" | "study" | "practice" | "review" | "settings";

function MainApp() {
  const { settings, updateSettings } = useApp();
  const [page, setPage] = useState<Page>("dashboard");
  const [pageParams, setPageParams] = useState<Record<string, unknown>>({});

  const navigate = (p: string, params?: Record<string, unknown>) => {
    setPage(p as Page);
    setPageParams(params ?? {});
  };

  const navItems = [
    { id: "dashboard", icon: <LayoutDashboard size={20} />, label: "Home" },
    { id: "study", icon: <BookOpen size={20} />, label: "Study" },
    { id: "practice", icon: <Target size={20} />, label: "Practice" },
    { id: "review", icon: <Clock size={20} />, label: "Review" },
    { id: "settings", icon: <Settings size={20} />, label: "Settings" },
  ];

  const renderPage = () => {
    switch (page) {
      case "dashboard":
        return <Dashboard onNavigate={navigate} />;
      case "study":
        return (
          <StudyMode
            onBack={() => setPage("dashboard")}
            initialDay={pageParams.day as number | undefined}
          />
        );
      case "practice":
        return (
          <PracticeMode
            onBack={() => setPage("dashboard")}
            initialSource={pageParams.source as string | undefined}
          />
        );
      case "review":
        return <ReviewMode onBack={() => setPage("dashboard")} />;
      case "settings":
        return <SettingsPage onBack={() => setPage("dashboard")} />;
      default:
        return <Dashboard onNavigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top bar */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur border-b border-border">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          <span className="font-bold text-lg text-foreground tracking-tight">GRE Vocab</span>
          <button
            onClick={() => updateSettings({ darkMode: !settings.darkMode })}
            className="p-2 rounded-xl hover:bg-muted transition-colors text-muted-foreground"
          >
            {settings.darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="pb-24">{renderPage()}</main>

      {/* Bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-background/90 backdrop-blur border-t border-border">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-stretch justify-around h-16">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setPage(item.id as Page);
                  setPageParams({});
                }}
                className={`flex flex-col items-center justify-center gap-1 flex-1 transition-colors ${
                  page === item.id
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.icon}
                <span className="text-[10px] font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>
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
