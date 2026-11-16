# Problem-Solving Interview Prep

A complete guide to the problem-solving round of a software engineer interview, in C++17. It covers every data structure and algorithm from the basics to expert level. Its main goal is to teach you to look at a problem you have never seen and know which technique to use.

<!-- stats:start -->
**29 chapters · 171 solved problems (133 from LeetCode, 38 classics) · 270 tested C++ programs**
<!-- stats:end -->

## Start here

1. **[How to Recognize Any Problem](01-pattern-recognition/01-how-to-recognize-any-problem.md):** the six-step procedure that the whole guide is built around.
2. **[How to Solve Any Problem](00-start-here/05-how-to-solve-any-problem.md):** what to do and say in a live interview.
3. **[C++ and the STL for Problem Solving](00-start-here/04-cpp-stl-for-problem-solving.md):** the language tools you need.
4. **[Big-O From Zero](00-start-here/03-big-o-from-zero.md):** how to work out what is fast enough.

Then study the topics in order, using the checklist below, and do the recognition drills along the way.

## The recognition guide

Part 01 answers the question "which technique does this problem need?".

| When you want to | Read |
|---|---|
| Learn the method | [How to Recognize Any Problem](01-pattern-recognition/01-how-to-recognize-any-problem.md) |
| Use the input size as a clue | [Constraints Tell You the Algorithm](01-pattern-recognition/02-constraints-tell-you-the-algorithm.md) |
| Decide from the input | [Decision Tree by Input Type](01-pattern-recognition/03-decision-tree-by-input-type.md) |
| Decide from the question | [Decision Tree by Question Goal](01-pattern-recognition/04-decision-tree-by-question-goal.md) |
| Look up a phrase | [Keyword Dictionary](01-pattern-recognition/05-keyword-dictionary.md) |
| Revise one pattern fast | [Pattern Cards](01-pattern-recognition/06-pattern-cards.md) |
| Separate two similar patterns | [Lookalike Patterns](01-pattern-recognition/07-lookalike-patterns.md) |
| See an expert think | [Worked Recognition Walkthroughs](01-pattern-recognition/08-worked-recognition-walkthroughs.md) |
| Test yourself | Drills: [Easy](01-pattern-recognition/09-recognition-drills-easy.md), [Medium](01-pattern-recognition/10-recognition-drills-medium.md), [Hard](01-pattern-recognition/11-recognition-drills-hard.md) |
| Get unstuck | [When You Do Not Recognize the Problem](01-pattern-recognition/12-when-you-do-not-recognize-it.md) |
| Know when simple tools are not enough | [When to Use Advanced Structures](01-pattern-recognition/13-when-to-use-advanced-structures.md) |

## How every chapter works

| Section | Use it to |
|---|---|
| `Quick revision` | Re-read in the last few minutes before an interview |
| `How to recognize it` | Learn the signals, and the lookalikes that need a different tool |
| Numbered sections | Learn the idea from zero, with small examples traced by hand |
| `Solved problems` | Follow problems from easy to hard, each with its clue, key idea and tested code |
| `Common pitfalls` | Avoid the mistakes that cost points |
| `Practice list` | Try more problems alone, with a one-line hint |
| `Interview questions` | Say the answers out loud, then open them to compare |

## Priority tiers

Short on time? Study `T1` first.

| Tier | Meaning |
|---|---|
| `T1` | Asked often. Know it cold: write the code from memory and handle follow-ups. |
| `T2` | Asked sometimes. Understand it and code it with a little thought. |
| `T3` | Asked rarely, or only at the hardest companies. Know what it is and when it applies. |

## Find a problem

- [Problems by pattern](index/by-pattern.md): practice one pattern at a time.
- [Problems by difficulty](index/by-difficulty.md).
- [Problems by LeetCode number](index/by-leetcode-number.md): check whether a problem is solved here.

## Run the code

Each ` ```cpp ` block is a complete program with its own tests. Paste it into a file, then compile and run it:

```bash
g++ -std=c++17 -Wall -Wextra solution.cpp -o solution
```

```bash
./solution
```

Every program uses `#include <bits/stdc++.h>`, which needs GCC. On GCC 16 it no longer includes `assert`, so the programs also have `#include <cassert>`.

## Tools

These scripts need only Node.js and g++.

| Command | What it does |
|---|---|
| `node tools/verify.mjs` | Lints every note, then compiles and runs every C++ block |
| `node tools/verify.mjs --allow-planned` | The same, but links to chapters that are not written yet are not errors |
| `node tools/build-index.mjs` | Rebuilds the checklist below and the `index/` files |
| `node tools/lc.mjs 3 76` | Looks up LeetCode problems by number |
| `node tools/lc.mjs --tag "Trie" --free` | Lists real problems for a topic |

`tools/data/curriculum.json` is the plan for the whole guide, and `tools/chapter-style-guide.md` holds the rules for writing a chapter. LeetCode titles, numbers and Premium flags come from a public table of problems, so a Premium flag can be out of date.

## Full checklist

Tick a chapter when you can solve its problems and answer its questions without looking.

<!-- index:start -->
### Start here

How to use this guide, study plans, Big-O, C++ for problem solving, and a method for solving any problem.

- [ ] How to Use This Guide `T1` (not written yet)
- [ ] Study Plans `T1` (not written yet)
- [ ] [Big-O From Zero](00-start-here/03-big-o-from-zero.md) `T1`
- [ ] [C++ and the STL for Problem Solving](00-start-here/04-cpp-stl-for-problem-solving.md) `T1`
- [ ] [How to Solve Any Problem](00-start-here/05-how-to-solve-any-problem.md) `T1` · 2 problems
- [ ] Logic Building Warm-Ups `T1` (not written yet)
- [ ] Amortized Analysis `T2` (not written yet)

### Pattern recognition

The heart of this guide: how to read a problem and know which technique to use.

- [ ] [How to Recognize Any Problem](01-pattern-recognition/01-how-to-recognize-any-problem.md) `T1`
- [ ] [Constraints Tell You the Algorithm](01-pattern-recognition/02-constraints-tell-you-the-algorithm.md) `T1`
- [ ] [Decision Tree by Input Type](01-pattern-recognition/03-decision-tree-by-input-type.md) `T1`
- [ ] [Decision Tree by Question Goal](01-pattern-recognition/04-decision-tree-by-question-goal.md) `T1`
- [ ] [Keyword Dictionary](01-pattern-recognition/05-keyword-dictionary.md) `T1`
- [ ] [Pattern Cards](01-pattern-recognition/06-pattern-cards.md) `T1`
- [ ] [Lookalike Patterns: How to Tell Them Apart](01-pattern-recognition/07-lookalike-patterns.md) `T1`
- [ ] [Worked Recognition Walkthroughs](01-pattern-recognition/08-worked-recognition-walkthroughs.md) `T1`
- [ ] [Recognition Drills: Easy](01-pattern-recognition/09-recognition-drills-easy.md) `T1`
- [ ] [Recognition Drills: Medium](01-pattern-recognition/10-recognition-drills-medium.md) `T1`
- [ ] [Recognition Drills: Hard](01-pattern-recognition/11-recognition-drills-hard.md) `T1`
- [ ] [When You Do Not Recognize the Problem](01-pattern-recognition/12-when-you-do-not-recognize-it.md) `T1`
- [ ] [When to Use Advanced Structures](01-pattern-recognition/13-when-to-use-advanced-structures.md) `T2`

### Arrays, strings and hashing

The building blocks that appear in almost every problem.

- [ ] Arrays From Zero `T1` (not written yet)
- [ ] [Strings From Zero](02-arrays-strings-hashing/02-strings-from-zero.md) `T1` · 17 problems
- [ ] Hash Tables From Zero `T1` (not written yet)
- [ ] Hashing Patterns `T1` (not written yet)
- [ ] Matrix Problems `T1` (not written yet)
- [ ] Simulation, Enumeration and Brainteasers `T2` (not written yet)
- [ ] [String Parsing and Log Processing](02-arrays-strings-hashing/07-string-parsing-and-log-processing.md) `T1` · 11 problems
- [ ] Advanced Hashing `T3` (not written yet)

### Linked lists, stacks and queues

Every type: singly, doubly and circular lists; array and linked stacks; linear, circular and double-ended queues.

- [ ] [Singly Linked List](03-linked-lists-stacks-queues/01-singly-linked-list.md) `T1` · 13 problems
- [ ] [Doubly Linked List](03-linked-lists-stacks-queues/02-doubly-linked-list.md) `T1` · 7 problems
- [ ] Circular Linked Lists `T2` (not written yet)
- [ ] Linked List Problems `T1` (not written yet)
- [ ] [Stack From Zero](03-linked-lists-stacks-queues/05-stack-from-zero.md) `T1` · 18 problems
- [ ] Stacks for Expressions and Parentheses `T1` (not written yet)
- [ ] [Queue From Zero](03-linked-lists-stacks-queues/07-queue-from-zero.md) `T1` · 13 problems
- [ ] [Circular Queue and Ring Buffer](03-linked-lists-stacks-queues/08-circular-queue.md) `T1` · 11 problems
- [ ] [Deque: Double-Ended Queue](03-linked-lists-stacks-queues/09-deque.md) `T1` · 4 problems
- [ ] Array-Based Lists and Memory `T3` (not written yet)

### Sorting and searching

All the sorting algorithms, every kind of binary search, and how sorting unlocks other techniques.

- [ ] Elementary Sorts `T2` (not written yet)
- [ ] Merge Sort `T1` (not written yet)
- [ ] Quick Sort and Quickselect `T1` (not written yet)
- [ ] Counting, Radix and Bucket Sort `T2` (not written yet)
- [ ] Sorting With a Custom Order `T1` (not written yet)
- [ ] Binary Search Basics `T1` (not written yet)
- [ ] Binary Search on the Answer `T1` (not written yet)
- [ ] Other Searching Algorithms `T3` (not written yet)
- [ ] External Sorting and Sorting Networks `T3` (not written yet)

### Core patterns

The patterns that solve most interview problems: two pointers, sliding window, fast and slow pointers, prefix sums, monotonic structures, heaps and more.

- [ ] Two Pointers: Opposite Ends `T1` (not written yet)
- [ ] Two Pointers: Same Direction `T1` (not written yet)
- [ ] [Fast and Slow Pointers](05-core-patterns/03-fast-and-slow-pointers.md) `T1` · 15 problems
- [ ] Sliding Window: Fixed Size `T1` (not written yet)
- [ ] [Sliding Window: Variable Size](05-core-patterns/05-sliding-window-variable.md) `T1` · 21 problems
- [ ] Prefix Sums `T1` (not written yet)
- [ ] Difference Arrays and Sweep Line `T1` (not written yet)
- [ ] Kadane's Algorithm `T1` (not written yet)
- [ ] Merge Intervals `T1` (not written yet)
- [ ] Cyclic Sort and Index as Hash `T1` (not written yet)
- [ ] In-Place Linked List Reversal `T1` (not written yet)
- [ ] Monotonic Stack `T1` (not written yet)
- [ ] Monotonic Queue `T1` (not written yet)
- [ ] Top K With Heaps `T1` (not written yet)
- [ ] Two Heaps `T1` (not written yet)
- [ ] K-Way Merge `T1` (not written yet)
- [ ] Bit Manipulation `T1` (not written yet)
- [ ] Contribution Technique `T2` (not written yet)
- [ ] Ordered Set Patterns `T1` (not written yet)
- [ ] Offline Query Processing `T2` (not written yet)
- [ ] Transform the Input `T2` (not written yet)
- [ ] Left and Right Scans `T1` (not written yet)
- [ ] Interactive Problems `T2` (not written yet)

### Recursion, backtracking, divide and conquer, greedy

How to think recursively, how to search all choices, and when a simple choice is enough.

- [ ] Recursion From Zero `T1` (not written yet)
- [ ] Backtracking: Subsets `T1` (not written yet)
- [ ] Backtracking: Permutations and Combinations `T1` (not written yet)
- [ ] Backtracking: Constraint Search `T1` (not written yet)
- [ ] Divide and Conquer `T2` (not written yet)
- [ ] Greedy Foundations `T1` (not written yet)
- [ ] Classic Greedy Algorithms `T1` (not written yet)
- [ ] Meet in the Middle `T2` (not written yet)
- [ ] NP-Hard Problems and Approximation `T3` (not written yet)

### Trees

Binary trees, BSTs, AVL, red-black, splay, treap, B-trees, heaps and tries.

- [ ] Binary Trees From Zero `T1` (not written yet)
- [ ] Tree Traversals `T1` (not written yet)
- [ ] Tree DFS Problems `T1` (not written yet)
- [ ] Tree BFS Problems `T1` (not written yet)
- [ ] Tree Construction and Serialization `T1` (not written yet)
- [ ] Binary Search Trees From Zero `T1` (not written yet)
- [ ] [AVL Trees](07-trees/07-avl-tree.md) `T1` · 10 problems
- [ ] Red-Black Trees `T2` (not written yet)
- [ ] Splay Trees and Treaps `T3` (not written yet)
- [ ] B-Trees and B+ Trees `T2` (not written yet)
- [ ] Heaps and Priority Queues From Zero `T1` (not written yet)
- [ ] Advanced Heaps `T3` (not written yet)
- [ ] Trie (Prefix Tree) `T1` (not written yet)
- [ ] N-ary and General Trees `T2` (not written yet)
- [ ] More Tree Types `T3` (not written yet)

### Graphs

From what a graph is to shortest paths, spanning trees, strong components, flows and matching.

- [ ] Graphs From Zero `T1` (not written yet)
- [ ] BFS and DFS `T1` (not written yet)
- [ ] Grid Graphs `T1` (not written yet)
- [ ] BFS Shortest Path Patterns `T1` (not written yet)
- [ ] Cycle Detection and Bipartite Graphs `T1` (not written yet)
- [ ] Topological Sort `T1` (not written yet)
- [ ] Union-Find (Disjoint Set Union) `T1` (not written yet)
- [ ] [Dijkstra's Algorithm](08-graphs/08-dijkstra.md) `T1` · 14 problems
- [ ] Bellman-Ford and SPFA `T1` (not written yet)
- [ ] Floyd-Warshall and All-Pairs Paths `T1` (not written yet)
- [ ] Minimum Spanning Trees `T1` (not written yet)
- [ ] Strongly Connected Components `T2` (not written yet)
- [ ] Bridges and Articulation Points `T2` (not written yet)
- [ ] Euler and Hamiltonian Paths `T2` (not written yet)
- [ ] Network Flow `T3` (not written yet)
- [ ] Bipartite Matching `T3` (not written yet)
- [ ] 2-SAT `T3` (not written yet)
- [ ] Graph Modeling Tricks `T1` (not written yet)
- [ ] Cuts, General Matching and Graph Theory `T3` (not written yet)

### Dynamic programming

From Fibonacci to digit DP and advanced optimizations, with a method for finding the state.

- [ ] Dynamic Programming From Zero `T1` (not written yet)
- [ ] 1D Dynamic Programming `T1` (not written yet)
- [ ] Grid DP `T1` (not written yet)
- [ ] [0/1 Knapsack](09-dynamic-programming/04-zero-one-knapsack.md) `T1` · 15 problems
- [ ] Unbounded Knapsack `T1` (not written yet)
- [ ] Longest Increasing Subsequence `T1` (not written yet)
- [ ] LCS and Edit Distance `T1` (not written yet)
- [ ] Palindrome DP `T1` (not written yet)
- [ ] Interval DP `T2` (not written yet)
- [ ] State Machine DP `T1` (not written yet)
- [ ] Tree DP `T2` (not written yet)
- [ ] Bitmask DP `T2` (not written yet)
- [ ] Digit DP `T2` (not written yet)
- [ ] Counting and Probability DP `T2` (not written yet)
- [ ] DP Optimizations `T3` (not written yet)
- [ ] DP State Design Tricks `T2` (not written yet)

### String algorithms

Fast pattern matching, palindromes, rolling hashes and suffix structures.

- [ ] Palindromes and Manacher's Algorithm `T1` (not written yet)
- [ ] KMP String Matching `T1` (not written yet)
- [ ] Z-Algorithm `T2` (not written yet)
- [ ] Rabin-Karp and Rolling Hash `T1` (not written yet)
- [ ] Aho-Corasick `T3` (not written yet)
- [ ] Suffix Arrays and LCP `T3` (not written yet)
- [ ] Suffix Automaton and Suffix Tree `T3` (not written yet)
- [ ] Finite Automata and Regex `T3` (not written yet)
- [ ] Data Compression `T3` (not written yet)

### Math, geometry and game theory

The maths you need for problems: number theory, modular arithmetic, combinatorics, randomness, geometry and games.

- [ ] Number Basics `T1` (not written yet)
- [ ] Primes and the Sieve `T1` (not written yet)
- [ ] Modular Arithmetic `T1` (not written yet)
- [ ] Combinatorics `T1` (not written yet)
- [ ] Matrix Exponentiation `T2` (not written yet)
- [ ] Randomized Algorithms `T2` (not written yet)
- [ ] Computational Geometry `T2` (not written yet)
- [ ] Game Theory `T2` (not written yet)
- [ ] Gaussian Elimination and XOR Basis `T3` (not written yet)
- [ ] FFT and NTT `T3` (not written yet)
- [ ] GCD Counting and Mobius Inversion `T3` (not written yet)
- [ ] Advanced Number Theory `T3` (not written yet)

### Advanced data structures

Range queries, order statistics, tree queries and the probabilistic structures used at scale.

- [ ] Segment Tree `T2` (not written yet)
- [ ] Segment Tree With Lazy Propagation `T2` (not written yet)
- [ ] Fenwick Tree (Binary Indexed Tree) `T2` (not written yet)
- [ ] Sparse Table and Range Minimum Queries `T2` (not written yet)
- [ ] Sqrt Decomposition and Mo's Algorithm `T3` (not written yet)
- [ ] Persistent Data Structures `T3` (not written yet)
- [ ] Order Statistics and Policy-Based Trees `T3` (not written yet)
- [ ] Skip List `T2` (not written yet)
- [ ] LCA and Binary Lifting `T2` (not written yet)
- [ ] Heavy-Light and Centroid Decomposition `T3` (not written yet)
- [ ] Probabilistic Data Structures `T3` (not written yet)
- [ ] Spatial Data Structures `T3` (not written yet)

### Design problems

Problems that ask you to build a class: caches, iterators, schedulers, and small systems.

- [ ] LRU and LFU Cache `T1` (not written yet)
- [ ] Stack and Queue Design Problems `T1` (not written yet)
- [ ] Iterators `T1` (not written yet)
- [ ] Hashing and Randomized Design `T1` (not written yet)
- [ ] System-Style Design Problems `T2` (not written yet)
- [ ] Concurrency Basics `T2` (not written yet)

### Interview practice

Ranked problem lists, timed mock sets and last-minute revision.

- [ ] The Must-Do 100 `T1` (not written yet)
- [ ] Famous Problem Lists Mapped to This Guide `T1` (not written yet)
- [ ] Online Assessment Playbook `T1` (not written yet)
- [ ] Mock Interview Sets `T1` (not written yet)
- [ ] Edge Cases and Testing Checklist `T1` (not written yet)
- [ ] Common Bugs and How to Find Them `T1` (not written yet)
- [ ] Template Cheat Sheet `T1` (not written yet)
- [ ] Last-Night Revision `T1` (not written yet)
- [ ] Online Assessment Tasks Mapped `T1` (not written yet)
<!-- index:end -->
