#!/usr/bin/env node
// Looks up LeetCode problems so that numbers, titles and links are never typed from memory.
//
//   node tools/lc.mjs 3 76 239               print these problems by number
//   node tools/lc.mjs --search "sliding"     find problems whose title contains the text
//   node tools/lc.mjs --tag "Monotonic Stack"          list problems with this topic tag
//   node tools/lc.mjs --tag "Trie" --difficulty Hard   filter by difficulty as well
//   node tools/lc.mjs --tags                 list every topic tag with its problem count
//   node tools/lc.mjs --free ...             leave out Premium problems

import { loadProblems, urlOf } from './lib/leetcode.mjs';

const args = process.argv.slice(2);
const { all, byNumber } = loadProblems();

function option(name) {
  const index = args.indexOf(name);
  return index === -1 ? undefined : args[index + 1];
}

function print(problem) {
  const premium = problem.premium ? ', Premium' : '';
  console.log(`${problem.id}\t${problem.title} ([LeetCode ${problem.id}](${urlOf(problem)}), ${problem.difficulty}${premium})\t${problem.tags.join(', ')}`);
}

if (args.includes('--tags')) {
  const counts = new Map();
  for (const p of all) for (const t of p.tags) counts.set(t, (counts.get(t) ?? 0) + 1);
  for (const [tag, count] of [...counts].sort((a, b) => b[1] - a[1])) console.log(`${count}\t${tag}`);
  process.exit(0);
}

const search = option('--search')?.toLowerCase();
const tag = option('--tag')?.toLowerCase();
const difficulty = option('--difficulty');
const free = args.includes('--free');

if (search || tag) {
  all
    .filter((p) => !search || p.title.toLowerCase().includes(search))
    .filter((p) => !tag || p.tags.some((t) => t.toLowerCase() === tag))
    .filter((p) => !difficulty || p.difficulty === difficulty)
    .filter((p) => !free || !p.premium)
    .forEach(print);
  process.exit(0);
}

for (const arg of args.filter((a) => /^\d+$/.test(a))) {
  const problem = byNumber.get(Number(arg));
  if (problem) print(problem);
  else console.log(`${arg}\t(no such problem)`);
}
