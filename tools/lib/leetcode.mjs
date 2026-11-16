// The LeetCode problem table: number, title, difficulty, Premium flag and topic tags.
// tools/data/leetcode-problems.json has the facts, taken from the open-source doocs/leetcode index.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DATA = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'data', 'leetcode-problems.json');

// LeetCode builds a URL slug from the title: "Pow(x, n)" becomes "powx-n".
export function slugOf(title) {
  return title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/[\s-]+/g, '-');
}

export function urlOf(problem) {
  return `https://leetcode.com/problems/${slugOf(problem.title)}/`;
}

export function loadProblems() {
  const all = JSON.parse(fs.readFileSync(DATA, 'utf8'));
  return {
    all,
    byNumber: new Map(all.map((p) => [p.id, p])),
    bySlug: new Map(all.map((p) => [slugOf(p.title), p])),
  };
}
