import { useMemo, type ReactElement } from "react";
import type { SetReading } from "@/data/setReadings";

interface ReadingArtProps {
  reading: SetReading;
  readingKey: string;
}

type Palette = {
  id: string;
  sky1: string;
  sky2: string;
  far: string;
  near: string;
  deep: string;
  accent: string;
  detail: string;
};

const PALETTES: Palette[] = [
  { id: "sunrise", sky1: "#FED7AA", sky2: "#FECACA", far: "#A78BFA", near: "#FB923C", deep: "#7C2D12", accent: "#FEF3C7", detail: "#1E293B" },
  { id: "ocean",   sky1: "#BAE6FD", sky2: "#A5F3FC", far: "#7DD3FC", near: "#0EA5E9", deep: "#0C4A6E", accent: "#FEF9C3", detail: "#0F172A" },
  { id: "dusk",    sky1: "#DDD6FE", sky2: "#FBCFE8", far: "#A78BFA", near: "#EC4899", deep: "#831843", accent: "#FEF3C7", detail: "#1E1B4B" },
  { id: "forest",  sky1: "#D1FAE5", sky2: "#A7F3D0", far: "#34D399", near: "#059669", deep: "#064E3B", accent: "#FEF3C7", detail: "#0F172A" },
  { id: "desert",  sky1: "#FEF3C7", sky2: "#FED7AA", far: "#F59E0B", near: "#D97706", deep: "#78350F", accent: "#FFFBEB", detail: "#1F2937" },
  { id: "night",   sky1: "#1E1B4B", sky2: "#312E81", far: "#6366F1", near: "#4F46E5", deep: "#0F172A", accent: "#FEF3C7", detail: "#E0E7FF" },
];

type Scene = "mountain" | "sea" | "garden" | "desert" | "city";

const SCENE_KEYWORDS: Record<Scene, string[]> = {
  sea:      ["sea", "ocean", "coast", "harbor", "harbour", "river", "delta", "tide", "wave", "shore", "lighthouse", "ship", "boat", "sail", "island"],
  desert:   ["desert", "dune", "sand", "arid", "oasis", "caravan", "camel", "scorch", "drought"],
  garden:   ["garden", "forest", "tree", "meadow", "leaf", "orchard", "grove", "blossom", "vine", "bough"],
  city:     ["city", "street", "alley", "bridge", "market", "tower", "subway", "boulevard", "rooftop", "downtown", "metropolis"],
  mountain: ["mountain", "peak", "summit", "climb", "alpine", "cliff", "ridge", "valley", "snow", "hike", "trail"],
};

function hashString(s: string): number {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function pickScene(text: string): Scene {
  const lower = text.toLowerCase();
  let best: Scene = "mountain";
  let bestScore = 0;
  (Object.keys(SCENE_KEYWORDS) as Scene[]).forEach((scene) => {
    let score = 0;
    for (const kw of SCENE_KEYWORDS[scene]) {
      const re = new RegExp(`\\b${kw}`, "g");
      const matches = lower.match(re);
      if (matches) score += matches.length;
    }
    if (score > bestScore) {
      bestScore = score;
      best = scene;
    }
  });
  return best;
}

/* ── Hand-authored scene: The Cartographer's Daughter (key "1-1") ── */
function CartographerScene({ uid }: { uid: string }) {
  const sky = `sky-${uid}`;
  const desk = `desk-${uid}`;
  const map = `map-${uid}`;
  return (
    <svg viewBox="0 0 320 220" className="w-full h-full pointer-events-none" aria-hidden="true">
      <defs>
        <linearGradient id={sky} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E5E7EB" />
          <stop offset="100%" stopColor="#FEF3C7" />
        </linearGradient>
        <linearGradient id={desk} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#92400E" />
          <stop offset="100%" stopColor="#451A03" />
        </linearGradient>
        <linearGradient id={map} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FEF3C7" />
          <stop offset="100%" stopColor="#FCD34D" />
        </linearGradient>
      </defs>

      {/* Wall */}
      <rect x="0" y="0" width="320" height="220" fill="#F5F5F4" />
      <rect x="0" y="0" width="320" height="155" fill="#E7E5E4" />

      {/* Tall arched window admitting a column of light */}
      <path d="M170,30 Q170,18 184,18 Q198,18 198,30 L198,140 L170,140 Z"
            fill={`url(#${sky})`} stroke="#A8A29E" strokeWidth="1.4" />
      <line x1="184" y1="18" x2="184" y2="140" stroke="#A8A29E" strokeWidth="1" />
      <line x1="170" y1="80" x2="198" y2="80" stroke="#A8A29E" strokeWidth="1" />
      {/* Light beam falling on desk */}
      <path d="M170,140 L198,140 L240,210 L150,210 Z" fill="#FDE68A" opacity="0.35" />

      {/* Distant hint of coastline through the window */}
      <path d="M170,118 Q180,113 184,116 Q190,112 198,118 L198,128 L170,128 Z" fill="#A78BFA" opacity="0.55" />
      <path d="M170,124 Q178,121 184,122 Q192,120 198,124 L198,128 L170,128 Z" fill="#7DD3FC" opacity="0.7" />

      {/* Floor line */}
      <line x1="0" y1="155" x2="320" y2="155" stroke="#D6D3D1" strokeWidth="1.2" />

      {/* Desk */}
      <rect x="40" y="148" width="170" height="6" rx="1" fill={`url(#${desk})`} />
      <rect x="48" y="154" width="3" height="48" fill="#451A03" />
      <rect x="200" y="154" width="3" height="48" fill="#451A03" />

      {/* Unrolled map with coastline curve */}
      <g transform="translate(58 124)">
        <rect x="0" y="0" width="120" height="26" rx="2" fill={`url(#${map})`} stroke="#92400E" strokeWidth="0.8" />
        {/* Curl on the right edge */}
        <path d="M120,0 Q132,4 132,13 Q132,22 120,26 Z" fill="#FCD34D" stroke="#92400E" strokeWidth="0.8" />
        {/* Coastline (river delta) */}
        <path d="M8,18 Q22,14 32,17 Q44,21 56,16 Q70,12 84,17 Q96,20 112,15"
              fill="none" stroke="#0EA5E9" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M8,22 Q22,19 32,21 Q44,24 56,21 Q70,18 84,21 Q96,23 112,20"
              fill="none" stroke="#0EA5E9" strokeWidth="0.9" opacity="0.6" />
        {/* Compass mark */}
        <circle cx="14" cy="7" r="2.4" fill="none" stroke="#7C2D12" strokeWidth="0.6" />
        <line x1="14" y1="4.5" x2="14" y2="9.5" stroke="#7C2D12" strokeWidth="0.6" />
        {/* Pin */}
        <circle cx="68" cy="17" r="1.6" fill="#DC2626" />
      </g>

      {/* Porcelain cup */}
      <g transform="translate(184 138)">
        <ellipse cx="6" cy="10" rx="6" ry="1.4" fill="#1F2937" opacity="0.18" />
        <path d="M0,2 Q0,10 6,10 Q12,10 12,2 Z" fill="#FAFAFA" stroke="#A8A29E" strokeWidth="0.6" />
        <path d="M12,4 Q16,4 16,7 Q16,10 12,10" fill="none" stroke="#A8A29E" strokeWidth="0.6" />
        <ellipse cx="6" cy="2" rx="6" ry="1.2" fill="#FECACA" opacity="0.7" />
      </g>

      {/* Maren's silhouette — seated reading the assignment */}
      <g>
        {/* Chair back */}
        <rect x="98" y="100" width="4" height="40" rx="1" fill="#44403C" />
        <rect x="138" y="100" width="4" height="40" rx="1" fill="#44403C" />
        <rect x="100" y="100" width="40" height="3" rx="1" fill="#44403C" />
        {/* Body — coat */}
        <path d="M104,108 Q104,98 120,98 Q136,98 136,108 L138,148 L102,148 Z" fill="#1E293B" />
        {/* Collar */}
        <path d="M114,100 L120,108 L126,100 Z" fill="#FEF3C7" opacity="0.7" />
        {/* Head */}
        <circle cx="120" cy="92" r="7" fill="#FED7AA" />
        {/* Hair (bun) */}
        <path d="M113,90 Q113,84 120,84 Q127,84 127,90 Z" fill="#44403C" />
        <circle cx="127" cy="86" r="2.6" fill="#44403C" />
        {/* Notebook in hand */}
        <rect x="112" y="128" width="16" height="11" rx="1" fill="#FAFAFA" stroke="#92400E" strokeWidth="0.6" />
        <line x1="115" y1="132" x2="125" y2="132" stroke="#A8A29E" strokeWidth="0.5" />
        <line x1="115" y1="135" x2="123" y2="135" stroke="#A8A29E" strokeWidth="0.5" />
      </g>

      {/* Floating dust motes in light beam */}
      <circle cx="180" cy="155" r="0.8" fill="#FEF3C7" />
      <circle cx="195" cy="170" r="0.6" fill="#FEF3C7" />
      <circle cx="210" cy="185" r="0.7" fill="#FEF3C7" />
      <circle cx="172" cy="178" r="0.5" fill="#FEF3C7" />
    </svg>
  );
}

/* ── Procedural scenes ── */

function MountainScene({ uid, palette }: { uid: string; palette: Palette }) {
  const sky = `sky-${uid}`, far = `far-${uid}`, near = `near-${uid}`;
  return (
    <svg viewBox="0 0 320 220" className="w-full h-full pointer-events-none" aria-hidden="true">
      <defs>
        <linearGradient id={sky} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={palette.sky1} /><stop offset="100%" stopColor={palette.sky2} />
        </linearGradient>
        <linearGradient id={far} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={palette.far} /><stop offset="100%" stopColor={palette.deep} stopOpacity="0.55" />
        </linearGradient>
        <linearGradient id={near} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={palette.near} /><stop offset="100%" stopColor={palette.deep} />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="320" height="220" fill={`url(#${sky})`} />
      <circle cx="240" cy="68" r="22" fill={palette.accent} opacity="0.85" />
      <path d="M0,160 L40,110 L80,140 L130,80 L180,130 L230,90 L280,135 L320,105 L320,220 L0,220 Z" fill={`url(#${far})`} opacity="0.85" />
      <path d="M0,180 L60,130 L120,165 L170,120 L230,160 L290,130 L320,150 L320,220 L0,220 Z" fill={`url(#${near})`} opacity="0.95" />
      {/* Cliff */}
      <path d="M50,220 L50,170 Q60,160 80,162 L120,168 L120,220 Z" fill={palette.deep} />
      {/* Hiker */}
      <rect x="78" y="132" width="14" height="20" rx="4" fill={palette.deep} />
      <rect x="82" y="138" width="10" height="22" rx="3" fill={palette.detail} />
      <circle cx="87" cy="130" r="6" fill="#FED7AA" />
      <path d="M80,128 Q87,121 94,128 L94,131 L80,131 Z" fill={palette.deep} />
      <line x1="98" y1="135" x2="104" y2="166" stroke={palette.deep} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function SeaScene({ uid, palette }: { uid: string; palette: Palette }) {
  const sky = `sky-${uid}`, water = `water-${uid}`;
  return (
    <svg viewBox="0 0 320 220" className="w-full h-full pointer-events-none" aria-hidden="true">
      <defs>
        <linearGradient id={sky} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={palette.sky1} /><stop offset="100%" stopColor={palette.sky2} />
        </linearGradient>
        <linearGradient id={water} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={palette.far} /><stop offset="100%" stopColor={palette.deep} />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="320" height="140" fill={`url(#${sky})`} />
      <rect x="0" y="140" width="320" height="80" fill={`url(#${water})`} />
      <circle cx="60" cy="60" r="20" fill={palette.accent} opacity="0.85" />
      {/* Wave lines */}
      {[155, 170, 185, 200].map((y, i) => (
        <path key={i} d={`M0,${y} Q40,${y - 4} 80,${y} T160,${y} T240,${y} T320,${y}`}
              fill="none" stroke={palette.accent} strokeWidth="1" opacity={0.4 - i * 0.07} />
      ))}
      {/* Lighthouse */}
      <rect x="240" y="80" width="14" height="60" fill="#FAFAFA" stroke={palette.deep} strokeWidth="1" />
      <rect x="240" y="95" width="14" height="6" fill={palette.near} />
      <rect x="240" y="115" width="14" height="6" fill={palette.near} />
      <rect x="236" y="74" width="22" height="8" fill={palette.deep} />
      <rect x="244" y="64" width="6" height="12" fill={palette.accent} />
      {/* Boat */}
      <path d="M120,148 L160,148 L155,158 L125,158 Z" fill={palette.deep} />
      <line x1="140" y1="148" x2="140" y2="125" stroke={palette.deep} strokeWidth="1.4" />
      <path d="M140,128 L156,148 L140,148 Z" fill={palette.accent} />
      <path d="M140,130 L126,148 L140,148 Z" fill="#FAFAFA" />
      {/* Birds */}
      <path d="M180 50 q5 -4 10 0 q5 -4 10 0" stroke={palette.deep} strokeWidth="1.4" fill="none" />
      <path d="M205 38 q4 -3 8 0 q4 -3 8 0" stroke={palette.deep} strokeWidth="1.2" fill="none" />
    </svg>
  );
}

function GardenScene({ uid, palette }: { uid: string; palette: Palette }) {
  const sky = `sky-${uid}`, hill = `hill-${uid}`;
  return (
    <svg viewBox="0 0 320 220" className="w-full h-full pointer-events-none" aria-hidden="true">
      <defs>
        <linearGradient id={sky} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={palette.sky1} /><stop offset="100%" stopColor={palette.sky2} />
        </linearGradient>
        <linearGradient id={hill} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={palette.far} /><stop offset="100%" stopColor={palette.near} />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="320" height="220" fill={`url(#${sky})`} />
      <circle cx="245" cy="60" r="20" fill={palette.accent} opacity="0.85" />
      {/* Rolling hills */}
      <path d="M0,170 Q80,140 160,165 Q240,190 320,160 L320,220 L0,220 Z" fill={`url(#${hill})`} opacity="0.7" />
      <path d="M0,190 Q90,165 180,185 Q260,200 320,180 L320,220 L0,220 Z" fill={palette.near} />
      {/* Tree trunk */}
      <rect x="218" y="125" width="8" height="55" fill={palette.deep} />
      {/* Tree foliage */}
      <circle cx="222" cy="112" r="28" fill={palette.far} opacity="0.75" />
      <circle cx="210" cy="118" r="22" fill={palette.near} opacity="0.85" />
      <circle cx="234" cy="118" r="22" fill={palette.near} opacity="0.85" />
      {/* Bench */}
      <rect x="80" y="170" width="50" height="3" fill={palette.deep} />
      <rect x="80" y="173" width="3" height="10" fill={palette.deep} />
      <rect x="127" y="173" width="3" height="10" fill={palette.deep} />
      {/* Figure under tree */}
      <circle cx="222" cy="160" r="5" fill="#FED7AA" />
      <rect x="218" y="164" width="8" height="16" rx="2" fill={palette.detail} />
      {/* Petals */}
      {[80, 130, 180, 210, 250].map((x, i) => (
        <circle key={i} cx={x} cy={50 + (i % 2) * 18} r="1.6" fill={palette.accent} opacity="0.7" />
      ))}
    </svg>
  );
}

function DesertScene({ uid, palette }: { uid: string; palette: Palette }) {
  const sky = `sky-${uid}`, dune1 = `dune1-${uid}`, dune2 = `dune2-${uid}`;
  return (
    <svg viewBox="0 0 320 220" className="w-full h-full pointer-events-none" aria-hidden="true">
      <defs>
        <linearGradient id={sky} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={palette.sky1} /><stop offset="100%" stopColor={palette.sky2} />
        </linearGradient>
        <linearGradient id={dune1} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={palette.far} /><stop offset="100%" stopColor={palette.near} />
        </linearGradient>
        <linearGradient id={dune2} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={palette.near} /><stop offset="100%" stopColor={palette.deep} />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="320" height="220" fill={`url(#${sky})`} />
      <circle cx="80" cy="70" r="28" fill={palette.accent} opacity="0.92" />
      <circle cx="80" cy="70" r="20" fill="#FFFBEB" />
      {/* Dunes */}
      <path d="M0,170 Q80,130 160,160 Q220,180 320,140 L320,220 L0,220 Z" fill={`url(#${dune1})`} opacity="0.85" />
      <path d="M0,200 Q100,170 200,195 Q260,210 320,185 L320,220 L0,220 Z" fill={`url(#${dune2})`} />
      {/* Cactus */}
      <rect x="226" y="140" width="9" height="40" rx="3" fill={palette.deep} />
      <rect x="219" y="155" width="6" height="14" rx="2" fill={palette.deep} />
      <rect x="236" y="150" width="6" height="14" rx="2" fill={palette.deep} />
      {/* Caravan dots */}
      {[120, 138, 154, 170].map((x, i) => (
        <ellipse key={i} cx={x} cy={170 + (i % 2) * 2} rx="6" ry="3" fill={palette.deep} opacity="0.85" />
      ))}
      {/* Heat shimmer dashes */}
      <line x1="40" y1="155" x2="60" y2="155" stroke={palette.detail} strokeWidth="0.6" opacity="0.3" strokeDasharray="3 3" />
      <line x1="200" y1="148" x2="232" y2="148" stroke={palette.detail} strokeWidth="0.6" opacity="0.3" strokeDasharray="3 3" />
    </svg>
  );
}

function CityScene({ uid, palette }: { uid: string; palette: Palette }) {
  const sky = `sky-${uid}`;
  return (
    <svg viewBox="0 0 320 220" className="w-full h-full pointer-events-none" aria-hidden="true">
      <defs>
        <linearGradient id={sky} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={palette.sky1} /><stop offset="100%" stopColor={palette.sky2} />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="320" height="220" fill={`url(#${sky})`} />
      <circle cx="260" cy="55" r="18" fill={palette.accent} opacity="0.8" />
      {/* Distant skyline */}
      <g opacity="0.55" fill={palette.far}>
        <rect x="0" y="120" width="20" height="60" />
        <rect x="22" y="100" width="26" height="80" />
        <rect x="50" y="115" width="18" height="65" />
        <rect x="70" y="90" width="30" height="90" />
        <rect x="102" y="110" width="22" height="70" />
        <rect x="126" y="125" width="16" height="55" />
      </g>
      {/* Closer skyline */}
      <g fill={palette.near}>
        <rect x="140" y="100" width="32" height="100" />
        <rect x="174" y="80" width="36" height="120" />
        <rect x="212" y="110" width="28" height="90" />
        <rect x="242" y="95" width="34" height="105" />
        <rect x="278" y="120" width="30" height="80" />
      </g>
      {/* Lit windows */}
      {[
        [148, 110], [156, 110], [164, 110], [148, 125], [156, 125], [164, 125],
        [180, 95], [192, 95], [180, 110], [192, 110], [180, 125], [192, 125], [180, 140], [192, 140],
        [220, 125], [228, 125], [220, 140], [228, 140],
        [250, 115], [262, 115], [250, 130], [262, 130], [250, 145], [262, 145],
        [284, 135], [292, 135], [284, 150], [292, 150],
      ].map(([x, y], i) => (
        <rect key={i} x={x} y={y} width="4" height="6" fill={palette.accent} opacity="0.85" />
      ))}
      {/* Foreground rooftop with figure */}
      <rect x="0" y="170" width="120" height="50" fill={palette.deep} />
      <rect x="0" y="166" width="120" height="6" fill={palette.detail} />
      {/* Figure on rooftop */}
      <circle cx="60" cy="148" r="5" fill="#FED7AA" />
      <rect x="56" y="152" width="8" height="14" rx="2" fill={palette.detail} />
      {/* Bridge cables hint */}
      <path d="M120,166 Q200,135 320,166" fill="none" stroke={palette.detail} strokeWidth="0.8" opacity="0.4" />
    </svg>
  );
}

function ProceduralScene({ reading, readingKey }: ReadingArtProps) {
  const { scene, palette, uid } = useMemo(() => {
    const text = `${reading.title} ${reading.subtitle} ${reading.passage}`;
    const sceneChoice = pickScene(text);
    const h = hashString(reading.title || readingKey);
    const paletteChoice = PALETTES[h % PALETTES.length];
    return { scene: sceneChoice, palette: paletteChoice, uid: `r${h.toString(36)}` };
  }, [reading, readingKey]);

  switch (scene) {
    case "sea":      return <SeaScene uid={uid} palette={palette} />;
    case "garden":   return <GardenScene uid={uid} palette={palette} />;
    case "desert":   return <DesertScene uid={uid} palette={palette} />;
    case "city":     return <CityScene uid={uid} palette={palette} />;
    case "mountain":
    default:         return <MountainScene uid={uid} palette={palette} />;
  }
}

const CUSTOM_SCENES: Record<string, (uid: string) => ReactElement> = {
  "1-1": (uid) => <CartographerScene uid={uid} />,
};

export default function ReadingArt({ reading, readingKey }: ReadingArtProps) {
  const custom = CUSTOM_SCENES[readingKey];
  if (custom) {
    const uid = `c${hashString(readingKey).toString(36)}`;
    return custom(uid);
  }
  return <ProceduralScene reading={reading} readingKey={readingKey} />;
}
