import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/context/AppContext";

export default function BadgeToast() {
  const { newlyUnlockedBadges, dismissBadgeToasts } = useApp();

  useEffect(() => {
    if (newlyUnlockedBadges.length === 0) return;
    const t = setTimeout(() => dismissBadgeToasts(), 5000);
    return () => clearTimeout(t);
  }, [newlyUnlockedBadges, dismissBadgeToasts]);

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {newlyUnlockedBadges.map((b, i) => (
          <motion.div
            key={b.id + i}
            initial={{ opacity: 0, x: 80, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 80, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="pointer-events-auto flex items-center gap-3 pl-3 pr-5 py-3 rounded-2xl shadow-2xl bg-gradient-to-r from-amber-400 to-yellow-500 text-amber-950 max-w-xs"
          >
            <div className="text-3xl drop-shadow">{b.emoji}</div>
            <div className="min-w-0">
              <div className="text-[10px] font-bold uppercase tracking-wide opacity-80">Achievement unlocked</div>
              <div className="font-bold text-sm leading-tight truncate">{b.title}</div>
              <div className="text-[11px] opacity-90 truncate">{b.description}</div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
