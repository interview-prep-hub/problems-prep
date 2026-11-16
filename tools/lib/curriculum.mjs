// The plan of the guide: every chapter, what it must cover, and the allowed pattern names.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');

export function loadCurriculum() {
  const { parts, patterns } = JSON.parse(fs.readFileSync(path.join(ROOT, 'tools', 'data', 'curriculum.json'), 'utf8'));
  const chapters = parts.flatMap((part) => part.chapters);
  const plannedIn = new Map();
  for (const chapter of chapters) for (const id of chapter.lc ?? []) plannedIn.set(id, chapter.path);
  return { parts, chapters, patterns: new Set(patterns), plannedIn, byPath: new Map(chapters.map((c) => [c.path, c])) };
}

// Chapters stay short enough to read. The budget grows with the number of problems to solve.
const BUDGET_RULES = {
  T1: { floor: 50, base: 15, perProblem: 3, cap: 85 },
  T2: { floor: 30, base: 12, perProblem: 2.5, cap: 60 },
  T3: { floor: 20, base: 10, perProblem: 2.5, cap: 40 },
};

export function sizeBudgetKB(chapter) {
  if (chapter.type === 'guide') return null;
  const rule = BUDGET_RULES[chapter.tier];
  const problems = (chapter.lc?.length ?? 0) + (chapter.classic?.length ?? 0);
  return Math.min(rule.cap, Math.max(rule.floor, rule.base + rule.perProblem * problems));
}
