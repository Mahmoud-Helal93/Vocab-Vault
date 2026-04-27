import { Word } from "@/data/words";

// True SM-2 Algorithm
export function calculateNextReview(word: Word, quality: number): Partial<Word> {
  // quality: 0 = Again, 2 = Hard, 3 = Good, 4 = Easy, 5 = Perfect
  let newEaseFactor: number;
  let newInterval: number;
  let newRepetitions: number;

  if (quality >= 3) {
    // Correct
    newEaseFactor = Math.max(
      1.3,
      word.easeFactor + 0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)
    );
    if (word.repetitions === 0) {
      newInterval = 1;
    } else if (word.repetitions === 1) {
      newInterval = 6;
    } else {
      newInterval = Math.round(word.interval * newEaseFactor);
    }
    newRepetitions = word.repetitions + 1;
  } else {
    // Incorrect — reset repetitions and interval, EF unchanged
    newEaseFactor = word.easeFactor;
    newRepetitions = 0;
    newInterval = 1;
  }

  const nextReviewDate = new Date();
  nextReviewDate.setDate(nextReviewDate.getDate() + newInterval);

  // Status thresholds
  let status: Word["status"];
  if (newInterval >= 21) status = "mastered";
  else if (newInterval >= 6) status = "review";
  else if (newInterval >= 1 && newRepetitions > 0) status = "learning";
  else status = "new";

  const isCorrect = quality >= 3;
  const newHistory = [...(word.qualityHistory ?? []), quality].slice(-10);

  return {
    easeFactor: newEaseFactor,
    interval: newInterval,
    repetitions: newRepetitions,
    lastReviewed: new Date().toISOString(),
    nextReview: nextReviewDate.toISOString(),
    status,
    difficulty: quality < 3 ? Math.min(word.difficulty + 1, 10) : Math.max(word.difficulty - 1, 0),
    correctCount: isCorrect ? word.correctCount + 1 : word.correctCount,
    incorrectCount: isCorrect ? word.incorrectCount : word.incorrectCount + 1,
    qualityHistory: newHistory,
  };
}

// Preview what interval each quality rating would produce
export function previewIntervals(word: Word): Record<number, number> {
  const qualities = [0, 2, 3, 4, 5];
  const result: Record<number, number> = {};
  for (const q of qualities) {
    if (q >= 3) {
      let ef = Math.max(1.3, word.easeFactor + 0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));
      let interval: number;
      if (word.repetitions === 0) interval = 1;
      else if (word.repetitions === 1) interval = 6;
      else interval = Math.round(word.interval * ef);
      result[q] = interval;
    } else {
      result[q] = 1;
    }
  }
  return result;
}

export function getDueWords(words: Word[]): Word[] {
  const now = new Date();
  return words.filter((w) => {
    if (!w.nextReview) return true;
    return new Date(w.nextReview) <= now;
  });
}

export function getDifficultWords(words: Word[]): Word[] {
  return words
    .filter((w) => w.difficulty >= 3 || w.incorrectCount >= 2)
    .sort((a, b) => b.difficulty - a.difficulty || b.incorrectCount - a.incorrectCount);
}

export function getProgress(words: Word[]) {
  const total = words.length;
  const mastered = words.filter((w) => w.status === "mastered").length;
  const review = words.filter((w) => w.status === "review").length;
  const learning = words.filter((w) => w.status === "learning").length;
  const newWords = words.filter((w) => w.status === "new").length;
  const known = mastered + review + learning;

  const totalAttempts = words.reduce((sum, w) => sum + w.correctCount + w.incorrectCount, 0);
  const totalCorrect = words.reduce((sum, w) => sum + w.correctCount, 0);
  const accuracy = totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0;

  return { total, mastered, review, learning, newWords, known, accuracy };
}

export function getWordsByDay(words: Word[], day: number): Word[] {
  return words.filter((w) => w.day === day);
}

export function getWordsByDayAndGroup(words: Word[], day: number, group: number): Word[] {
  return words.filter((w) => w.day === day && w.group === group);
}

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function levenshteinDistance(a: string, b: string): number {
  const matrix: number[][] = [];
  const la = a.length;
  const lb = b.length;
  for (let i = 0; i <= lb; i++) matrix[i] = [i];
  for (let j = 0; j <= la; j++) matrix[0][j] = j;
  for (let i = 1; i <= lb; i++) {
    for (let j = 1; j <= la; j++) {
      if (b[i - 1] === a[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  return matrix[lb][la];
}

export function isCloseEnough(answer: string, correct: string): boolean {
  const a = answer.toLowerCase().trim();
  const b = correct.toLowerCase().trim();
  if (a === b) return true;
  const maxDist = correct.length <= 5 ? 1 : correct.length <= 8 ? 2 : 3;
  return levenshteinDistance(a, b) <= maxDist;
}

export function getRecallStrength(word: Word): number {
  const total = word.correctCount + word.incorrectCount;
  if (total === 0 || !word.lastReviewed) return 0;
  const accuracy = word.correctCount / total;
  const interval = Math.max(word.interval, 1);
  const daysSinceLast = (Date.now() - new Date(word.lastReviewed).getTime()) / 86400000;
  const decayFactor = Math.min(1, daysSinceLast / (interval * 2));
  return accuracy * (1 - decayFactor);
}

// Compress all nextReview dates by 50% for crunch mode
export function applyCrunchMode(words: Word[]): Word[] {
  const now = new Date();
  return words.map((w) => {
    if (!w.nextReview) return w;
    const next = new Date(w.nextReview);
    const msRemaining = next.getTime() - now.getTime();
    if (msRemaining <= 0) return w;
    const compressed = new Date(now.getTime() + msRemaining * 0.5);
    return { ...w, nextReview: compressed.toISOString() };
  });
}
