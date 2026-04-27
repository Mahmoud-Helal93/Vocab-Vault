import { motion } from "framer-motion";
import {
  Zap,
  SlidersHorizontal,
  GraduationCap,
  History,
  ChevronRight,
  Sparkles,
  AlertCircle,
} from "lucide-react";

interface TestProps {
  onNavigate: (page: string, params?: Record<string, unknown>) => void;
}

interface SectionCard {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  accentClass: string;
  iconBgClass: string;
  items: string[];
  cta: string;
  status: "available" | "coming-soon";
  onClick?: () => void;
}

export default function Test({ onNavigate }: TestProps) {
  const sections: SectionCard[] = [
    {
      id: "quick-practice",
      title: "Quick Practice",
      subtitle: "Jump straight into focused drills",
      description:
        "Spin up a short session built from the words that matter most right now — new vocabulary, mistakes, difficult words, today's review, or a random refresher.",
      icon: <Zap size={22} className="text-white" strokeWidth={2.5} />,
      accentClass:
        "from-orange-500/15 via-orange-500/5 to-transparent dark:from-orange-500/20",
      iconBgClass: "bg-gradient-to-br from-orange-500 to-pink-500",
      items: [
        "New words",
        "Mistake words",
        "Difficult words",
        "Today's review",
        "Random review",
      ],
      cta: "Pick a preset",
      status: "available",
      onClick: () => onNavigate("test-selection", { mode: "quick" }),
    },
    {
      id: "custom-practice",
      title: "Custom Practice",
      subtitle: "Build your own session",
      description:
        "Pick belts, missions, sets, ranges, or mixed selections. Layer on filters for new, mistake, difficult, or due words and tune shuffle and size.",
      icon: <SlidersHorizontal size={22} className="text-white" strokeWidth={2.5} />,
      accentClass:
        "from-violet-500/15 via-violet-500/5 to-transparent dark:from-violet-500/20",
      iconBgClass: "bg-gradient-to-br from-violet-500 to-fuchsia-500",
      items: [
        "Choose belt / mission / set / range / mix",
        "Filter new / mistake / difficult / due",
        "Shuffle toggle & session size",
        "Live preview of selected words",
      ],
      cta: "Open the builder",
      status: "available",
      onClick: () => onNavigate("test-selection", { mode: "custom" }),
    },
    {
      id: "gre-simulation",
      title: "GRE Simulation",
      subtitle: "Exam-style verbal practice",
      description:
        "Take timed Text Completion and Sentence Equivalence sets that mirror the real GRE — adjustable difficulty and no partial credit in test mode.",
      icon: <GraduationCap size={22} className="text-white" strokeWidth={2.5} />,
      accentClass:
        "from-blue-500/15 via-blue-500/5 to-transparent dark:from-blue-500/20",
      iconBgClass: "bg-gradient-to-br from-blue-500 to-cyan-500",
      items: [
        "Text Completion",
        "Sentence Equivalence",
        "Mixed GRE-style test",
        "Timed mode & difficulty",
      ],
      cta: "Phase 8 unlocks this",
      status: "coming-soon",
    },
    {
      id: "history",
      title: "Test History & Analytics",
      subtitle: "See where you stand",
      description:
        "Browse previous test results, accuracy by question type and belt, weakest words, slowest correct answers, and a recommended next session.",
      icon: <History size={22} className="text-white" strokeWidth={2.5} />,
      accentClass:
        "from-emerald-500/15 via-emerald-500/5 to-transparent dark:from-emerald-500/20",
      iconBgClass: "bg-gradient-to-br from-emerald-500 to-teal-500",
      items: [
        "Previous test results",
        "Accuracy by question type",
        "Accuracy by belt / mission / set",
        "Weak / slow / mistake word lists",
        "Suggested next practice",
      ],
      cta: "Phase 6 unlocks this",
      status: "coming-soon",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-[1240px] mx-auto px-4 lg:px-6 py-6 space-y-6"
    >
      {/* ── Hero ── */}
      <section className="relative overflow-hidden rounded-2xl border border-border bg-brand-gradient-soft px-5 sm:px-7 py-6 sm:py-8 shadow-sm">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
          <div className="w-14 h-14 rounded-2xl bg-brand-gradient flex items-center justify-center shadow-md shrink-0">
            <Sparkles size={28} className="text-white" strokeWidth={2.5} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[11px] font-extrabold uppercase tracking-wider text-brand-gradient">
              Test Center
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold leading-tight text-foreground mt-1">
              Practice. Simulate. Master.
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-2 max-w-2xl">
              One home for every kind of vocabulary practice — quick drills,
              custom sessions, full GRE simulations, and detailed performance
              analytics.
            </p>
          </div>
        </div>
      </section>

      {/* ── Phase notice ── */}
      <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 dark:border-amber-900/40 dark:bg-amber-900/10 px-4 py-3">
        <AlertCircle
          size={18}
          className="text-amber-600 dark:text-amber-400 mt-0.5 shrink-0"
        />
        <div className="text-sm">
          <span className="font-bold text-amber-900 dark:text-amber-200">
            Phase 2 — selection unlocked.
          </span>{" "}
          <span className="text-amber-800 dark:text-amber-300/90">
            Quick Practice and Custom Practice now let you pick the words for a
            session. The question engine, modes, and analytics arrive in later
            phases.
          </span>
        </div>
      </div>

      {/* ── Section cards ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5">
        {sections.map((section) => (
          <article
            key={section.id}
            className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm hover-elevate transition-all"
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${section.accentClass} pointer-events-none`}
            />
            <div className="relative z-10 p-5 sm:p-6 flex flex-col h-full">
              <div className="flex items-start gap-4">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-sm shrink-0 ${section.iconBgClass}`}
                >
                  {section.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg sm:text-xl font-extrabold text-foreground leading-tight">
                    {section.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-muted-foreground font-medium mt-0.5">
                    {section.subtitle}
                  </p>
                </div>
                {section.status === "coming-soon" && (
                  <span className="shrink-0 text-[10px] font-extrabold uppercase tracking-wider px-2 py-1 rounded-full bg-muted text-muted-foreground">
                    Coming soon
                  </span>
                )}
              </div>

              <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
                {section.description}
              </p>

              <ul className="mt-4 space-y-1.5">
                {section.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-foreground/80"
                  >
                    <ChevronRight
                      size={14}
                      className="text-muted-foreground/70 mt-1 shrink-0"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 pt-4 border-t border-border flex items-center justify-between gap-3">
                <span className="text-xs text-muted-foreground font-medium">
                  {section.cta}
                </span>
                <button
                  type="button"
                  disabled={section.status === "coming-soon"}
                  onClick={section.onClick}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-extrabold transition-colors btn-brand disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                >
                  Open
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </motion.div>
  );
}
