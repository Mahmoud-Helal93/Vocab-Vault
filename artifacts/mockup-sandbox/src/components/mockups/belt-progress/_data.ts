export const TOTAL_DAYS = 42;
export const GROUPS_PER_DAY = 3;

export const BELTS = [
  { num: 1, name: "White Belt",  subtitle: "Foundation",  desc: "Build your word base",     color: "#9CA3AF", textColor: "#6B7280" },
  { num: 2, name: "Yellow Belt", subtitle: "Expansion",   desc: "Grow your vocabulary",      color: "#F59E0B", textColor: "#D97706" },
  { num: 3, name: "Green Belt",  subtitle: "Strength",    desc: "Build strong word power",   color: "#10B981", textColor: "#059669" },
  { num: 4, name: "Blue Belt",   subtitle: "Precision",   desc: "Sharpen your accuracy",     color: "#3B82F6", textColor: "#2563EB" },
  { num: 5, name: "Purple Belt", subtitle: "Mastery",     desc: "Master complex words",      color: "#8B5CF6", textColor: "#7C3AED" },
  { num: 6, name: "Black Belt",  subtitle: "Expertise",   desc: "Ultimate word mastery",     color: "#1F2937", textColor: "#111827" },
];

export type WordStatus = "new" | "learning" | "mastered";
export interface MockWord { id: string; day: number; group: number; status: WordStatus }

export function makeWords(): MockWord[] {
  const words: MockWord[] = [];
  for (let day = 1; day <= TOTAL_DAYS; day++) {
    for (let group = 1; group <= GROUPS_PER_DAY; group++) {
      for (let i = 0; i < 10; i++) {
        let status: WordStatus = "new";
        if (day <= 3) status = "mastered";
        else if (day === 4) status = group <= 2 ? "mastered" : "new";
        else if (day === 5) status = i < 6 ? "mastered" : i < 8 ? "learning" : "new";
        else if (day === 6) status = group === 1 && i < 4 ? "mastered" : "new";
        else if (day === 8 && group === 1) status = i < 5 ? "mastered" : "new";
        else if (day === 9 && group === 1 && i < 3) status = "learning";
        words.push({ id: `w-${day}-${group}-${i}`, day, group, status });
      }
    }
  }
  return words;
}

export function getDayStats(words: MockWord[], day: number) {
  const dw = words.filter((w) => w.day === day);
  const mastered = dw.filter((w) => w.status === "mastered").length;
  const learning = dw.filter((w) => w.status === "learning").length;
  return { total: dw.length, mastered, learning, done: dw.length > 0 && mastered === dw.length };
}

export function getSetStats(words: MockWord[], day: number, group: number) {
  const gw = words.filter((w) => w.day === day && w.group === group);
  const mastered = gw.filter((w) => w.status === "mastered").length;
  return { total: gw.length, mastered, done: gw.length > 0 && mastered === gw.length };
}
