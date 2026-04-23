import { motion } from "framer-motion";
import type { ReactNode } from "react";

function Stage({ children, bg }: { children: ReactNode; bg: string }) {
  return (
    <div
      className={`relative w-full max-w-md mx-auto aspect-[16/10] rounded-2xl overflow-hidden border border-card-border ${bg}`}
    >
      {children}
    </div>
  );
}

/* 1. ABOUND — table overflowing with fruit + coins, items keep falling */
function AboundScene() {
  const items = [
    { emoji: "🍎", x: "15%", delay: 0 },
    { emoji: "🍊", x: "30%", delay: 0.4 },
    { emoji: "🪙", x: "45%", delay: 0.8 },
    { emoji: "🍇", x: "60%", delay: 1.2 },
    { emoji: "🪙", x: "75%", delay: 1.6 },
    { emoji: "🍐", x: "85%", delay: 2.0 },
  ];
  return (
    <Stage bg="bg-gradient-to-b from-amber-100 to-orange-200 dark:from-amber-900/40 dark:to-orange-900/40">
      {/* table */}
      <div className="absolute bottom-10 left-4 right-4 h-3 rounded bg-amber-800 shadow-md" />
      <div className="absolute bottom-2 left-12 w-2 h-10 bg-amber-900" />
      <div className="absolute bottom-2 right-12 w-2 h-10 bg-amber-900" />
      {/* pile on table */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-3xl">🍎🍊🍇🪙🍐🍌</div>
      {/* falling items */}
      {items.map((it, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl"
          style={{ left: it.x, top: "10%" }}
          animate={{ y: ["0%", "260%"], opacity: [1, 1, 0] }}
          transition={{ duration: 2.4, delay: it.delay, repeat: Infinity, ease: "easeIn" }}
        >
          {it.emoji}
        </motion.div>
      ))}
    </Stage>
  );
}

/* 2. AMORPHOUS — glowing blob morphing endlessly */
function AmorphousScene() {
  return (
    <Stage bg="bg-gradient-to-br from-indigo-900 to-purple-950">
      <svg viewBox="0 0 200 125" className="absolute inset-0 w-full h-full">
        <defs>
          <radialGradient id="blobGrad" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#c4b5fd" stopOpacity="1" />
            <stop offset="60%" stopColor="#7c3aed" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#312e81" stopOpacity="0" />
          </radialGradient>
          <filter id="blobGlow"><feGaussianBlur stdDeviation="2" /></filter>
        </defs>
        <motion.path
          fill="url(#blobGrad)"
          filter="url(#blobGlow)"
          animate={{
            d: [
              "M100,30 C140,30 165,55 165,80 C165,105 130,110 100,110 C70,110 35,105 35,80 C35,55 60,30 100,30 Z",
              "M100,25 C150,40 160,70 145,95 C130,115 90,115 70,100 C40,85 50,40 100,25 Z",
              "M100,35 C135,35 170,60 155,90 C140,115 95,115 70,105 C40,95 45,50 100,35 Z",
              "M100,30 C140,30 165,55 165,80 C165,105 130,110 100,110 C70,110 35,105 35,80 C35,55 60,30 100,30 Z",
            ],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
      <div className="absolute bottom-2 left-3 text-[10px] text-purple-200/80 italic">no fixed shape</div>
    </Stage>
  );
}

/* 3. AUSTERE — bare white room, single chair, swinging dim bulb */
function AustereScene() {
  return (
    <Stage bg="bg-gradient-to-b from-stone-100 to-stone-300 dark:from-stone-800 dark:to-stone-900">
      {/* floor line */}
      <div className="absolute bottom-12 left-0 right-0 h-px bg-stone-400" />
      {/* swinging bulb */}
      <motion.div
        className="absolute top-0 left-1/2 origin-top"
        style={{ transformOrigin: "50% 0%" }}
        animate={{ rotate: [-8, 8, -8] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-px h-16 bg-stone-500 mx-auto" />
        <div className="w-5 h-5 rounded-full bg-amber-200 shadow-[0_0_20px_6px_rgba(253,224,71,0.4)] mx-auto" />
      </motion.div>
      {/* chair */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
        <div className="w-14 h-2 bg-amber-800 rounded-sm" />
        <div className="flex justify-between w-14">
          <div className="w-1.5 h-6 bg-amber-900" />
          <div className="w-1.5 h-6 bg-amber-900" />
        </div>
        <div className="w-1.5 h-10 bg-amber-900 absolute -top-8 left-0" />
      </div>
      <div className="absolute bottom-2 left-3 text-[10px] text-stone-500 italic">plain. strict. spare.</div>
    </Stage>
  );
}

/* 4. BELIE — smiling mask lifts to reveal sad face */
function BelieScene() {
  return (
    <Stage bg="bg-gradient-to-br from-rose-100 to-violet-200 dark:from-rose-950/40 dark:to-violet-950/40">
      {/* sad face (revealed) */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-7xl">😢</div>
      {/* smiling mask, lifting up periodically */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 text-7xl"
        animate={{ y: [-50, -160, -50, -50], opacity: [1, 1, 1, 1] }}
        transition={{ duration: 4, times: [0, 0.4, 0.8, 1], repeat: Infinity, ease: "easeInOut" }}
        style={{ y: -50 }}
      >
        😄
      </motion.div>
      <div className="absolute bottom-2 left-3 text-[10px] text-violet-700 dark:text-violet-300 italic">
        appearance ≠ truth
      </div>
    </Stage>
  );
}

/* 5. CAPRICIOUS — weather vane spinning unpredictably with sun/cloud/lightning */
function CapriciousScene() {
  return (
    <Stage bg="bg-gradient-to-b from-sky-200 to-slate-300 dark:from-sky-900/50 dark:to-slate-800">
      {/* central post */}
      <div className="absolute left-1/2 bottom-6 -translate-x-1/2 w-1 h-24 bg-stone-700" />
      {/* spinning ring */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40"
        animate={{ rotate: [0, 140, 60, 320, 200, 360] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 text-2xl">☀️</div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-2xl">☁️</div>
        <div className="absolute left-0 top-1/2 -translate-y-1/2 text-2xl">⚡</div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 text-2xl">🌧️</div>
      </motion.div>
      {/* arrow on top */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl"
        animate={{ rotate: [0, 220, -90, 410, 50, 360] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        ➤
      </motion.div>
    </Stage>
  );
}

/* 6. CEREBRAL — glowing brain with sparks and equation thought bubbles */
function CerebralScene() {
  const thoughts = ["E=mc²", "∫", "π", "Σ", "∞"];
  return (
    <Stage bg="bg-gradient-to-b from-slate-900 to-indigo-950">
      {/* brain */}
      <motion.div
        className="absolute left-1/2 bottom-10 -translate-x-1/2 text-6xl"
        animate={{ filter: ["drop-shadow(0 0 6px #a78bfa)", "drop-shadow(0 0 18px #f472b6)", "drop-shadow(0 0 6px #a78bfa)"] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      >
        🧠
      </motion.div>
      {/* sparks */}
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={`spark-${i}`}
          className="absolute text-amber-300 text-xs"
          style={{ left: `${30 + i * 12}%`, bottom: "50%" }}
          animate={{ opacity: [0, 1, 0], y: [0, -10, -20] }}
          transition={{ duration: 1.4, delay: i * 0.3, repeat: Infinity }}
        >
          ✦
        </motion.div>
      ))}
      {/* floating equations */}
      {thoughts.map((t, i) => (
        <motion.div
          key={t}
          className="absolute text-violet-200 text-sm font-bold"
          style={{ left: `${15 + i * 16}%`, bottom: "10%" }}
          animate={{ y: [0, -90], opacity: [0, 1, 0] }}
          transition={{ duration: 3.5, delay: i * 0.6, repeat: Infinity, ease: "easeOut" }}
        >
          {t}
        </motion.div>
      ))}
    </Stage>
  );
}

/* 7. CONGENIAL — two figures, warm light pulsing between, hearts floating up */
function CongenialScene() {
  return (
    <Stage bg="bg-gradient-to-br from-amber-100 to-rose-200 dark:from-amber-900/30 dark:to-rose-900/30">
      <div className="absolute bottom-12 left-[22%] text-5xl">🧑</div>
      <div className="absolute bottom-12 right-[22%] text-5xl scale-x-[-1]">🧑</div>
      {/* pulsing warm glow */}
      <motion.div
        className="absolute bottom-16 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full bg-amber-300"
        style={{ filter: "blur(20px)" }}
        animate={{ opacity: [0.4, 0.85, 0.4], scale: [0.9, 1.15, 0.9] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* floating hearts */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute text-rose-500 text-lg"
          style={{ left: `${42 + i * 7}%`, bottom: "30%" }}
          animate={{ y: [0, -60], opacity: [0, 1, 0] }}
          transition={{ duration: 2.5, delay: i * 0.6, repeat: Infinity, ease: "easeOut" }}
        >
          ❤
        </motion.div>
      ))}
    </Stage>
  );
}

/* 8. CONSPICUOUS — one bright red figure in a grey crowd, spotlight */
function ConspicuousScene() {
  const cols = 7;
  const rows = 3;
  return (
    <Stage bg="bg-gradient-to-b from-slate-800 to-slate-950">
      {/* spotlight cone */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 top-0 w-32 h-full"
        style={{
          background:
            "radial-gradient(ellipse at top, rgba(253,224,71,0.45), rgba(253,224,71,0) 70%)",
        }}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* crowd */}
      <div className="absolute inset-0 flex flex-col justify-center gap-2 px-4">
        {Array.from({ length: rows }).map((_, r) => (
          <div key={r} className="flex justify-center gap-2">
            {Array.from({ length: cols }).map((_, c) => {
              const isHero = r === 1 && c === Math.floor(cols / 2);
              return (
                <motion.div
                  key={c}
                  className={`text-2xl ${isHero ? "text-red-500" : "text-slate-500/70"}`}
                  animate={isHero ? { scale: [1, 1.18, 1] } : {}}
                  transition={isHero ? { duration: 1.6, repeat: Infinity } : undefined}
                >
                  {isHero ? "🧍" : "🧍"}
                </motion.div>
              );
            })}
          </div>
        ))}
      </div>
      <div className="absolute bottom-2 right-3 text-[10px] text-amber-200/80 italic">stands out</div>
    </Stage>
  );
}

/* 9. CURSORY — eye scanning lines of text quickly, skipping most */
function CursoryScene() {
  return (
    <Stage bg="bg-gradient-to-b from-stone-50 to-stone-200 dark:from-stone-900 dark:to-stone-800">
      {/* lines of "text" */}
      <div className="absolute inset-x-6 inset-y-6 flex flex-col gap-2 justify-center">
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="h-1.5 rounded-full bg-stone-400/60 dark:bg-stone-600" style={{ width: `${85 - i * 6}%` }} />
        ))}
      </div>
      {/* scanning eye */}
      <motion.div
        className="absolute text-2xl"
        animate={{
          x: ["8%", "82%", "8%", "82%", "8%"],
          y: ["18%", "18%", "50%", "50%", "82%"],
        }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "linear" }}
      >
        👁️
      </motion.div>
      <div className="absolute bottom-2 left-3 text-[10px] text-stone-500 italic">a quick, shallow glance</div>
    </Stage>
  );
}

/* 10. DAUNTING — tiny figure dwarfed by enormous mountain, trembling */
function DauntingScene() {
  return (
    <Stage bg="bg-gradient-to-b from-sky-300 to-slate-500 dark:from-sky-900 dark:to-slate-900">
      {/* mountain */}
      <svg viewBox="0 0 200 125" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        <polygon points="0,125 60,30 100,70 140,15 200,125" fill="#475569" />
        <polygon points="40,60 60,30 80,60" fill="#f1f5f9" />
        <polygon points="120,40 140,15 160,40" fill="#f1f5f9" />
      </svg>
      {/* tiny figure trembling */}
      <motion.div
        className="absolute bottom-3 left-[12%] text-xl"
        animate={{ x: [-1, 1, -1, 1, 0], rotate: [-2, 2, -2, 2, 0] }}
        transition={{ duration: 0.5, repeat: Infinity }}
      >
        🧍
      </motion.div>
      <div className="absolute bottom-2 right-3 text-[10px] text-white/90 italic">overwhelming • intimidating</div>
    </Stage>
  );
}

const SCENES: Record<string, () => JSX.Element> = {
  abound: AboundScene,
  amorphous: AmorphousScene,
  austere: AustereScene,
  belie: BelieScene,
  capricious: CapriciousScene,
  cerebral: CerebralScene,
  congenial: CongenialScene,
  conspicuous: ConspicuousScene,
  cursory: CursoryScene,
  daunting: DauntingScene,
};

export function hasWordScene(word: string): boolean {
  return word.toLowerCase() in SCENES;
}

export default function WordScene({ word }: { word: string }) {
  const Scene = SCENES[word.toLowerCase()];
  if (!Scene) return null;
  return <Scene />;
}
