#!/usr/bin/env node
// Prints everything an author needs for one chapter: its plan, the exact problem headings, its
// size budget, every chapter path for links, and the allowed pattern names.
//
//   node tools/chapter-brief.mjs 05-core-patterns/06-prefix-sums.md

import { loadCurriculum, sizeBudgetKB } from './lib/curriculum.mjs';
import { loadProblems, urlOf } from './lib/leetcode.mjs';

const target = process.argv[2]?.replaceAll('\\', '/');
const curriculum = loadCurriculum();
const chapter = curriculum.byPath.get(target);
if (!chapter) {
  console.error(`No chapter at ${target}. Use a path from tools/data/curriculum.json.`);
  process.exit(1);
}

const { byNumber } = loadProblems();
const budget = sizeBudgetKB(chapter);
console.log(`CHAPTER: ${chapter.path}`);
console.log(`TITLE: ${chapter.title}`);
console.log(`TIER: ${chapter.tier}  LEVEL: ${chapter.level}  TYPE: ${chapter.type}`);
console.log(`SIZE BUDGET: ${budget ? `${budget} KB at most, checked by verify` : 'none, but stay as short as the scope allows'}`);
console.log(`\nSCOPE: ${chapter.scope}`);

if (chapter.lc?.length) {
  console.log('\nLEETCODE PROBLEMS TO SOLVE IN FULL (exact heading text, replace ? with the number):');
  for (const id of chapter.lc) {
    const p = byNumber.get(id);
    console.log(`### P?. ${p.title} ([LeetCode ${id}](${urlOf(p)}), ${p.difficulty}${p.premium ? ', Premium' : ''})`);
  }
}
if (chapter.classic?.length) {
  console.log('\nCLASSIC PROBLEMS TO SOLVE IN FULL (heading: ### P?. Title (Classic, Easy|Medium|Hard|Advanced)):');
  for (const item of chapter.classic) console.log(`- ${item}`);
}

console.log('\nALL CHAPTERS, for links (link to the file only, never to an anchor in another file):');
for (const c of curriculum.chapters) console.log(`${c.path} | ${c.title}`);
console.log(`\nALLOWED PATTERN NAMES: ${[...curriculum.patterns].join(' | ')}`);
