# Recognition Drills: Easy

> **Level:** Beginner · **Priority:** T1 · **Time:** 150 min · **Read first:** [Pattern Cards](06-pattern-cards.md), [Lookalike Patterns](07-lookalike-patterns.md) · **Next:** [Recognition Drills: Medium](10-recognition-drills-medium.md)

These are 100 short problems, and you do not write any code for them. Your only job is to name the technique before you open the answer. This is the skill the interview tests first: you look at a problem you have never seen, and you know which tool to pick up.

## Quick revision

- **Sorted array and a pair with a target sum:** two pointers from both ends.
- **Unsorted array and a pair with a target sum:** hash map.
- **Contiguous piece (no gaps), longest or shortest, with a rule that growing the piece can only break, or can only fix:** variable sliding window.
- **Contiguous piece of a given size k:** fixed sliding window. For the maximum of every window, add a monotonic queue.
- **Sum of a subarray with negative values:** prefix sums, not a window.
- **Largest sum of a subarray, with no other rule:** Kadane.
- **"Next greater" or "next warmer":** monotonic stack.
- **Cycle, or the middle of a linked list:** fast and slow pointers.
- **Top k, or the largest again and again:** heap.
- **"Smallest value that still works", when every larger value also works:** binary search on the answer.
- **Fewest moves, every move costs the same:** BFS. With different costs that are never negative: Dijkstra.
- **"How many ways" or "best value", when smaller cases repeat and no greedy choice is safe:** dynamic programming (DP).
- **"List all" subsets, orderings or combinations:** backtracking.
- **"Requires ... first":** topological sort.
- **Rules are given directly and nothing needs to be faster:** just simulate.

## How to use these drills

Before you start, know these three words:

- A **subarray** is a part of an array with no gaps. A **substring** is the same idea for a string.
- **Contiguous** means next to each other, with no gaps.
- A **subsequence** keeps the order of the items, but it may skip some.

For each drill, do these steps. Take about 30 seconds.

1. Read the problem once. If it tells a story, say the plain question in one sentence, with no story words.
2. Say the pattern out loud.
3. Say the exact words that gave it away.
4. Name one lookalike, and say why it does not fit.
5. Open the answer and compare.

Give yourself 1 point for the right pattern, and 1 more for a good reason. Each set of 20 is worth 40 points.

| Score for a set | What to do |
|---|---|
| 34 to 40 | Move to the next set. |
| 24 to 33 | Read the chapter for each drill you missed. Do those drills again tomorrow. |
| Below 24 | Go back to [Pattern Cards](06-pattern-cards.md), then do the set again in two days. |

Some rules for reading the drills:

- **Size limits.** If a drill gives no size limit, assume the input is large enough that O(n^2) is too slow. If it gives a small limit, the limit is a clue. [Constraints Tell You the Algorithm](02-constraints-tell-you-the-algorithm.md) explains why.
- **More than one answer can be right.** Many problems have two good solutions. The answer shows the usual one and mentions others. If you named another one and can explain its cost, count it as correct.
- **The drills are shuffled.** The problem before a drill tells you nothing about it. Two neighbours are never from the same family of patterns.
- **Some are traps.** A few problems look like a famous pattern but need only a loop. Saying "no pattern is needed here" is a real answer.
- **The problem names are hidden.** A real problem's title often gives the pattern away, so titles appear only inside the answers.

### Example 1: a plain problem

*Find the largest number of vowels in any substring of length k.* (This is [Maximum Number of Vowels in a Substring of Given Length](https://leetcode.com/problems/maximum-number-of-vowels-in-a-substring-of-given-length/), LeetCode 1456, Medium.)

| Question to ask | Answer |
|---|---|
| What is the input? | A string, so a line of items. |
| What is the goal? | A maximum over contiguous pieces. |
| Which words give it away? | "substring" and "of length k". |
| Which lookalike is close? | A variable sliding window. It does not fit, because the length is given. Nothing needs to shrink. |

So the pattern is a [fixed sliding window](../05-core-patterns/04-sliding-window-fixed.md).

### Example 2: a problem with a story

*A shop gives a discount on each item. The discount equals the price of the first later item that costs the same or less. Return the final prices.* (This is [Final Prices With a Special Discount in a Shop](https://leetcode.com/problems/final-prices-with-a-special-discount-in-a-shop/), LeetCode 1475, Easy.)

Remove the story first: **for each position, find the next value that is smaller or equal.** Now the words "for each position" and "next value that is smaller" point to a [monotonic stack](../05-core-patterns/12-monotonic-stack.md). The lookalike is two nested loops, which work but cost O(n^2). This step of removing the story is the most useful habit in this chapter.

## Set 1: drills 1 to 20

**Drill 1.** You have k log files, and each file is already sorted by time. Combine them into one list sorted by time.

<details>
<summary><strong>Answer 1</strong></summary>

**Pattern:** K-way merge

**Hidden question:** Merge k sorted lists.

**Giveaway:** "k", "already sorted", "combine". The next line is always the smallest of the k front lines.

**Why not the lookalike:** Joining everything and sorting costs O(N log N) for N lines, and it ignores the existing order. A heap of the k fronts gives O(N log k).

**Chapter:** [K-Way Merge](../05-core-patterns/16-k-way-merge.md)

**Real problem:** [Merge k Sorted Lists](https://leetcode.com/problems/merge-k-sorted-lists/) (LeetCode 23, Hard). The story is new, but the problem is the same.

</details>

**Drill 2.** A binary array is given. Return the length of the longest run of consecutive ones.

<details>
<summary><strong>Answer 2</strong></summary>

**Pattern:** Array simulation

**Giveaway:** "consecutive ones", and you may change nothing. One counter is enough: add 1 on a one, reset to 0 on a zero.

**Why not the lookalike:** It looks like a sliding window, but a zero ends the run at once, so there is nothing to shrink step by step. A window works but adds code you do not need.

**Chapter:** [Arrays From Zero](../02-arrays-strings-hashing/01-arrays-from-zero.md)

**Real problem:** [Max Consecutive Ones](https://leetcode.com/problems/max-consecutive-ones/) (LeetCode 485, Easy)

</details>

**Drill 3.** Return all values of a matrix (a grid of numbers) in spiral order: along the top row, down the right side, along the bottom row, up the left side, then inwards.

<details>
<summary><strong>Answer 3</strong></summary>

**Pattern:** Matrix traversal

**Giveaway:** "spiral order". Keep four borders and move each one inwards after you use it.

**Why not the lookalike:** There is nothing to search, only an order to follow, so DFS or BFS adds nothing.

**Chapter:** [Matrix Problems](../02-arrays-strings-hashing/05-matrix-problems.md)

**Real problem:** [Spiral Matrix](https://leetcode.com/problems/spiral-matrix/) (LeetCode 54, Medium)

</details>

**Drill 4.** A binary array holds only 0 and 1. You may flip at most k zeros to ones. Return the length of the longest run of ones you can make.

<details>
<summary><strong>Answer 4</strong></summary>

**Pattern:** Variable sliding window

**Giveaway:** "at most k", "longest", "run". Think of it as the longest window with at most k zeros.

**Why not the lookalike:** Choosing which zeros to flip sounds like greedy or DP, but you do not need to choose. Any window with at most k zeros can become all ones.

**Chapter:** [Sliding Window: Variable Size](../05-core-patterns/05-sliding-window-variable.md)

**Real problem:** [Max Consecutive Ones III](https://leetcode.com/problems/max-consecutive-ones-iii/) (LeetCode 1004, Medium)

</details>

**Drill 5.** Given an integer n, say whether it is a power of two. Try to do it without a loop.

<details>
<summary><strong>Answer 5</strong></summary>

**Pattern:** Bit manipulation

**Giveaway:** "power of two". A positive power of two has exactly one 1 bit, so `n & (n - 1)` is 0.

**Why not the lookalike:** Dividing by 2 in a loop also works, in O(log n) time. Zero and negative numbers are not powers of two, so check `n > 0` first.

**Chapter:** [Bit Manipulation](../05-core-patterns/17-bit-manipulation.md)

**Real problem:** [Power of Two](https://leetcode.com/problems/power-of-two/) (LeetCode 231, Easy)

</details>

**Drill 6.** Each child needs a cookie of at least some size to be happy. Each cookie has a size, and a child gets at most one cookie. Find the most children you can make happy.

<details>
<summary><strong>Answer 6</strong></summary>

**Pattern:** Greedy

**Hidden question:** Sort both lists and match small with small.

**Giveaway:** "most children" and a simple match rule. Give each child, from least demanding up, the smallest cookie that works.

**Why not the lookalike:** DP is not needed, because using the smallest cookie that works is never worse. A big cookie stays free for a harder child.

**Chapter:** [Greedy Foundations](../06-recursion-backtracking-greedy/06-greedy-foundations.md)

**Real problem:** [Assign Cookies](https://leetcode.com/problems/assign-cookies/) (LeetCode 455, Easy)

</details>

**Drill 7.** Turn a sorted array into a height-balanced binary search tree. (Height-balanced means the two subtrees of any node differ in height by at most 1.)

<details>
<summary><strong>Answer 7</strong></summary>

**Pattern:** Tree construction

**Giveaway:** "sorted array" and "height-balanced". The middle value becomes the root, and each half builds one subtree.

**Why not the lookalike:** Inserting the values in sorted order into a plain BST gives a long chain, not a balanced tree.

**Chapter:** [Tree Construction and Serialization](../07-trees/05-tree-construction-and-serialization.md)

**Real problem:** [Convert Sorted Array to Binary Search Tree](https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/) (LeetCode 108, Easy)

</details>

**Drill 8.** You have stones with weights. In each turn, smash the two heaviest stones. If they are equal, both vanish. If not, the difference stays as a new stone. Return the weight of the last stone, or 0 if none is left.

<details>
<summary><strong>Answer 8</strong></summary>

**Pattern:** Heap simulation

**Hidden question:** Take the two largest values again and again, while new values join.

**Giveaway:** "two heaviest" and "in each turn". You need the largest many times, while the set changes.

**Why not the lookalike:** Sorting once is not enough, because the new stone must go to the right place. A max-heap gives the two largest in O(log n) each.

**Chapter:** [Top K With Heaps](../05-core-patterns/14-top-k-and-heaps.md)

**Real problem:** [Last Stone Weight](https://leetcode.com/problems/last-stone-weight/) (LeetCode 1046, Easy)

</details>

**Drill 9.** You want to write a note by cutting letters out of a magazine. Each printed letter can be used once. Given the note and the magazine text, can you do it?

<details>
<summary><strong>Answer 9</strong></summary>

**Pattern:** Frequency counting

**Hidden question:** Does the magazine have at least as many of each letter as the note needs?

**Giveaway:** "each printed letter can be used once". Only how many of each letter matters, not where they are.

**Why not the lookalike:** Position does not matter, so this is not a substring search. Count the magazine letters, then subtract the note letters.

**Chapter:** [Hashing Patterns](../02-arrays-strings-hashing/04-hashing-patterns.md)

**Real problem:** [Ransom Note](https://leetcode.com/problems/ransom-note/) (LeetCode 383, Easy)

</details>

**Drill 10.** A shop writes down its profit or loss for each day. Some days are negative. Find the largest total over a stretch of consecutive days. You must choose at least one day.

<details>
<summary><strong>Answer 10</strong></summary>

**Pattern:** Kadane

**Hidden question:** Find the largest sum of a non-empty subarray.

**Giveaway:** "consecutive days", "largest total", negative values, and no length rule.

**Why not the lookalike:** A sliding window needs a rule for when to shrink, and there is none. Kadane makes one choice each day: extend the old stretch, or start again here.

**Chapter:** [Kadane's Algorithm](../05-core-patterns/08-kadane-and-subarray-dp.md)

**Real problem:** [Maximum Subarray](https://leetcode.com/problems/maximum-subarray/) (LeetCode 53, Medium). The story is new, but the problem is the same.

</details>

**Drill 11.** You must take up to 2000 courses. Some courses require other courses first. Can you finish all of them?

<details>
<summary><strong>Answer 11</strong></summary>

**Pattern:** Topological sort

**Hidden question:** Does a directed graph have a cycle?

**Giveaway:** "require other courses first". That is a directed graph (edges have a direction) with an order rule. A cycle makes it impossible.

**Why not the lookalike:** Union-Find ignores direction, so it cannot find directed cycles. There is no shortest path to find. Remove courses with no missing requirement, and see if all get removed.

**Chapter:** [Topological Sort](../08-graphs/06-topological-sort.md)

**Real problem:** [Course Schedule](https://leetcode.com/problems/course-schedule/) (LeetCode 207, Medium)

</details>

**Drill 12.** Return an array where each position holds the product of all the other values. Do not use division. Use O(n) time.

<details>
<summary><strong>Answer 12</strong></summary>

**Pattern:** Prefix and suffix scan

**Giveaway:** "all the other values" and "do not use division". Each answer is the product of everything on the left, times the product of everything on the right.

**Why not the lookalike:** Two nested loops cost O(n^2). A sliding window does not fit, because the piece you want is everything except one position.

**Chapter:** [Left and Right Scans](../05-core-patterns/22-left-and-right-scans.md)

**Real problem:** [Product of Array Except Self](https://leetcode.com/problems/product-of-array-except-self/) (LeetCode 238, Medium)

</details>

**Drill 13.** Each call to `ping(t)` reports a request at time t, and t always grows. Return how many requests happened in the last 3000 milliseconds, including this one.

<details>
<summary><strong>Answer 13</strong></summary>

**Pattern:** Queue simulation

**Hidden question:** Keep only recent items: new ones join the back, and old ones leave the front.

**Giveaway:** "last 3000 milliseconds" and "t always grows". The oldest request is always the first to expire.

**Why not the lookalike:** A stack gives the newest item, and you must remove the oldest. Binary search on a stored list also works, but keeps old data forever.

**Chapter:** [Queue From Zero](../03-linked-lists-stacks-queues/07-queue-from-zero.md)

**Real problem:** [Number of Recent Calls](https://leetcode.com/problems/number-of-recent-calls/) (LeetCode 933, Easy)

</details>

**Drill 14.** Merge two sorted linked lists into one sorted list by reusing their nodes.

<details>
<summary><strong>Answer 14</strong></summary>

**Pattern:** Linked list manipulation

**Giveaway:** "two sorted linked lists", "merge". Compare the two heads and attach the smaller one.

**Why not the lookalike:** K-way merge with a heap is for many lists. With two lists, one comparison picks the next node. A dummy node (a fake first node) keeps the code short.

**Chapter:** [Linked List Problems](../03-linked-lists-stacks-queues/04-linked-list-problems.md)

**Real problem:** [Merge Two Sorted Lists](https://leetcode.com/problems/merge-two-sorted-lists/) (LeetCode 21, Easy)

</details>

**Drill 15.** Each array value says the longest jump you may make from that index. Starting at index 0, can you reach the last index?

<details>
<summary><strong>Answer 15</strong></summary>

**Pattern:** Greedy reach extension

**Giveaway:** "can you reach" and "longest jump". Keep the farthest index you can reach so far.

**Why not the lookalike:** DP works but costs O(n^2) in the worst case. One running maximum is enough.

**Chapter:** [Greedy Foundations](../06-recursion-backtracking-greedy/06-greedy-foundations.md)

**Real problem:** [Jump Game](https://leetcode.com/problems/jump-game/) (LeetCode 55, Medium)

</details>

**Drill 16.** An expression is in postfix form: each operator comes after its two numbers, as in `3 4 + 2 *`. Evaluate it.

<details>
<summary><strong>Answer 16</strong></summary>

**Pattern:** Expression parsing

**Giveaway:** "operator comes after its two numbers". The two newest numbers are the ones to combine, so use a stack.

**Why not the lookalike:** You need no precedence rules, because the order is already fixed. Those rules matter for normal expressions, such as `3 + 4 * 2`.

**Chapter:** [Stacks for Expressions and Parentheses](../03-linked-lists-stacks-queues/06-stack-expressions-and-parentheses.md)

**Real problem:** [Evaluate Reverse Polish Notation](https://leetcode.com/problems/evaluate-reverse-polish-notation/) (LeetCode 150, Medium)

</details>

**Drill 17.** Find the longest path, counted in edges, between any two nodes of a binary tree. The path need not pass through the root.

<details>
<summary><strong>Answer 17</strong></summary>

**Pattern:** Tree DFS

**Giveaway:** "any two nodes" and "need not pass through the root". The best path through a node is its left height plus its right height, where height counts nodes.

**Why not the lookalike:** BFS from the root does not see paths that bend at a lower node. DFS returns a height, and updates a separate best value.

**Chapter:** [Tree DFS Problems](../07-trees/03-tree-dfs-problems.md)

**Real problem:** [Diameter of Binary Tree](https://leetcode.com/problems/diameter-of-binary-tree/) (LeetCode 543, Easy)

</details>

**Drill 18.** Given a non-negative integer x, return its square root, rounded down. Do not use a power or square root function.

<details>
<summary><strong>Answer 18</strong></summary>

**Pattern:** Binary search on answer

**Giveaway:** "rounded down" and no library. Test a guess m with `m * m <= x`. Small guesses pass, and big guesses fail.

**Why not the lookalike:** There is no array, so it can look like plain math. The search runs over possible answers. Use `long long` for `m * m`, or it can overflow.

**Chapter:** [Binary Search on the Answer](../04-sorting-searching/07-binary-search-on-answer.md)

**Real problem:** [Sqrt(x)](https://leetcode.com/problems/sqrtx/) (LeetCode 69, Easy)

</details>

**Drill 19.** Find the kth largest value in an unsorted array, without sorting the whole array.

<details>
<summary><strong>Answer 19</strong></summary>

**Pattern:** Quickselect

**Giveaway:** "kth largest", asked once, on a complete array.

**Why not the lookalike:** A min-heap of size k also works, in O(n log k). Quickselect is O(n) on average and O(n^2) in the worst case. It fits here because the whole array is available.

**Chapter:** [Quick Sort and Quickselect](../04-sorting-searching/03-quick-sort-and-quickselect.md)

**Real problem:** [Kth Largest Element in an Array](https://leetcode.com/problems/kth-largest-element-in-an-array/) (LeetCode 215, Medium)

</details>

**Drill 20.** Return every ordering of an array of at most 6 different integers.

<details>
<summary><strong>Answer 20</strong></summary>

**Pattern:** Backtracking: permutations

**Giveaway:** "every ordering". Order matters, and each item is used once, so there are n! answers.

**Why not the lookalike:** Subsets do not care about order. Here `[1, 2]` and `[2, 1]` are different answers.

**Chapter:** [Backtracking: Permutations and Combinations](../06-recursion-backtracking-greedy/03-backtracking-permutations-combinations.md)

**Real problem:** [Permutations](https://leetcode.com/problems/permutations/) (LeetCode 46, Medium)

</details>

## Set 2: drills 21 to 40

**Drill 21.** Trees stand in a row, and each tree gives one fruit type. You have two baskets, and each holds one type, in any amount. Start at any tree and walk right, picking one fruit from each tree. You stop at the first fruit that fits no basket. Find the most fruits you can pick.

<details>
<summary><strong>Answer 21</strong></summary>

**Pattern:** Variable sliding window

**Hidden question:** Find the longest subarray with at most 2 distinct values.

**Giveaway:** "two baskets" means at most 2 distinct values. "Walk right" and "stop" mean contiguous.

**Why not the lookalike:** Starting greedily from the first tree fails, because the best start may be anywhere. A window with a frequency map tries every useful start.

**Chapter:** [Sliding Window: Variable Size](../05-core-patterns/05-sliding-window-variable.md)

**Real problem:** [Fruit Into Baskets](https://leetcode.com/problems/fruit-into-baskets/) (LeetCode 904, Medium)

</details>

**Drill 22.** You get a list of lowercase words. Put words that use the same letters, the same number of times, into one group.

<details>
<summary><strong>Answer 22</strong></summary>

**Pattern:** Group by key

**Giveaway:** "into one group". Every word in a group shares one fingerprint, such as its sorted letters.

**Why not the lookalike:** Comparing every pair of words costs O(n^2) comparisons. A map from fingerprint to list visits each word once.

**Chapter:** [Hashing Patterns](../02-arrays-strings-hashing/04-hashing-patterns.md)

**Real problem:** [Group Anagrams](https://leetcode.com/problems/group-anagrams/) (LeetCode 49, Medium)

</details>

**Drill 23.** A van with a seat limit drives in one direction past stops numbered up to 1000. Each trip says how many passengers there are, where they get on and where they get off. Can the van do all trips without going over the limit?

<details>
<summary><strong>Answer 23</strong></summary>

**Pattern:** Difference array

**Hidden question:** After adding many ranges, does any position go over a limit?

**Giveaway:** Each trip adds a number to a range of stops. Mark plus at the stop where people get on and minus where they get off, then add up.

**Why not the lookalike:** Merge intervals joins ranges, but you need a total at each stop. Sorting the events (a sweep line) also works. The small stop numbers make the difference array the simpler choice.

**Chapter:** [Difference Arrays and Sweep Line](../05-core-patterns/07-difference-array-and-sweep-line.md)

**Real problem:** [Car Pooling](https://leetcode.com/problems/car-pooling/) (LeetCode 1094, Medium)

</details>

**Drill 24.** Find the number of nodes on the shortest path from the root down to the nearest leaf of a binary tree.

<details>
<summary><strong>Answer 24</strong></summary>

**Pattern:** Tree BFS

**Giveaway:** "shortest" and "nearest leaf". BFS meets the nearest leaf first, so it can stop there.

**Why not the lookalike:** DFS also works, but it may visit the whole tree. A common DFS bug: a node with one child is not a leaf, so the empty side must not count as depth 0.

**Chapter:** [Tree BFS Problems](../07-trees/04-tree-bfs-problems.md), [Tree DFS Problems](../07-trees/03-tree-dfs-problems.md)

**Real problem:** [Minimum Depth of Binary Tree](https://leetcode.com/problems/minimum-depth-of-binary-tree/) (LeetCode 111, Easy)

</details>

**Drill 25.** Find the first index where the sum of the values on its left equals the sum of the values on its right. The value at the index counts on neither side. Values may be negative. Return -1 if no such index exists.

<details>
<summary><strong>Answer 25</strong></summary>

**Pattern:** Prefix sum

**Giveaway:** "sum of the values on its left equals" the right side. Keep a running left sum. The right sum is the total, minus the left sum, minus the current value.

**Why not the lookalike:** Two pointers from both ends fail, because of "negative". Moving a pointer does not tell you which way the sum will go.

**Chapter:** [Prefix Sums](../05-core-patterns/06-prefix-sums.md)

**Real problem:** [Find Pivot Index](https://leetcode.com/problems/find-pivot-index/) (LeetCode 724, Easy)

</details>

**Drill 26.** An array is sorted in ascending order. Find the two numbers that add up to a target, and return their positions, counted from 1. Use O(1) extra space.

<details>
<summary><strong>Answer 26</strong></summary>

**Pattern:** Two pointers: opposite ends

**Giveaway:** "sorted", "two numbers that add up to a target", and "O(1) extra space".

**Why not the lookalike:** A hash map works but uses O(n) space and ignores the sorted order. If the sum of the two ends is too small, moving the left end is the only way to raise it.

**Chapter:** [Two Pointers: Opposite Ends](../05-core-patterns/01-two-pointers-opposite-ends.md)

**Real problem:** [Two Sum II - Input Array Is Sorted](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/) (LeetCode 167, Medium)

</details>

**Drill 27.** Houses stand in a row, and each holds some money. A thief may not rob two next-door houses. Find the most money the thief can take.

<details>
<summary><strong>Answer 27</strong></summary>

**Pattern:** 1D DP

**Hidden question:** Pick values with no two adjacent, for the largest sum.

**Giveaway:** "most money" and "two next-door". Each house is a choice: rob it and skip the next, or leave it.

**Why not the lookalike:** Greedy fails. For `[2, 3, 2]`, taking the largest value gives 3, but taking both ends gives 4. A sliding window fails, because the chosen houses have gaps.

**Chapter:** [1D Dynamic Programming](../09-dynamic-programming/02-one-dimensional-dp.md)

**Real problem:** [House Robber](https://leetcode.com/problems/house-robber/) (LeetCode 198, Medium)

</details>

**Drill 28.** A group of up to 2000 people must split into two teams of any size. Some pairs dislike each other and cannot be on one team. Is a split possible?

<details>
<summary><strong>Answer 28</strong></summary>

**Pattern:** Bipartite check

**Hidden question:** Can the graph be coloured with two colours so that every edge joins different colours?

**Giveaway:** "two teams" and "cannot be on one team". People are nodes, dislikes are edges, and the teams are two colours.

**Why not the lookalike:** Placing people one by one without walking the graph can fail, because an early choice affects later ones. Union-Find also works, with extra care. BFS or DFS colouring is the usual answer.

**Chapter:** [Cycle Detection and Bipartite Graphs](../08-graphs/05-cycle-detection-and-bipartite.md)

**Real problem:** [Possible Bipartition](https://leetcode.com/problems/possible-bipartition/) (LeetCode 886, Medium)

</details>

**Drill 29.** You get two strings of lowercase letters. Can you rearrange the letters of the first string to get exactly the second?

<details>
<summary><strong>Answer 29</strong></summary>

**Pattern:** Frequency counting

**Giveaway:** "rearrange". Order does not matter, so only the count of each letter matters.

**Why not the lookalike:** A sliding window looks at a piece, but here you compare two whole strings. Sorting both also works, but counting is O(n) with a table of 26 entries.

**Chapter:** [Strings From Zero](../02-arrays-strings-hashing/02-strings-from-zero.md)

**Real problem:** [Valid Anagram](https://leetcode.com/problems/valid-anagram/) (LeetCode 242, Easy)

</details>

**Drill 30.** A computer network was a tree: everything connected, with no loops. Someone added one extra cable, and now there is one loop. Given the cables in a list, find a cable to remove so that it is a tree again. If several work, pick the one listed last.

<details>
<summary><strong>Answer 30</strong></summary>

**Pattern:** Union-Find

**Hidden question:** Find the edge that joins two nodes that are already connected.

**Giveaway:** "one extra cable", "one loop", edges in a list. Add the cables one by one. The first cable whose two ends are already connected is the answer.

**Why not the lookalike:** DFS can find the loop too, but then you must still find which loop cable is listed last. Union-Find gives it directly.

**Chapter:** [Union-Find (Disjoint Set Union)](../08-graphs/07-union-find.md), [Cycle Detection and Bipartite Graphs](../08-graphs/05-cycle-detection-and-bipartite.md)

**Real problem:** [Redundant Connection](https://leetcode.com/problems/redundant-connection/) (LeetCode 684, Medium). The story is new, but the problem is the same.

</details>

**Drill 31.** Find the contiguous subarray of exactly k elements with the largest average. Return that average.

<details>
<summary><strong>Answer 31</strong></summary>

**Pattern:** Fixed sliding window

**Giveaway:** "contiguous" and "exactly k elements". The size never changes.

**Why not the lookalike:** A variable window is for when the length is unknown. Here you add one element and remove one at each step.

**Chapter:** [Sliding Window: Fixed Size](../05-core-patterns/04-sliding-window-fixed.md)

**Real problem:** [Maximum Average Subarray I](https://leetcode.com/problems/maximum-average-subarray-i/) (LeetCode 643, Easy)

</details>

**Drill 32.** Find the first index where a short string appears inside a long one, or return -1. Aim for O(n + m) time.

<details>
<summary><strong>Answer 32</strong></summary>

**Pattern:** KMP

**Giveaway:** "first index where a short string appears" and "O(n + m)".

**Why not the lookalike:** The simple check costs O(n times m). A sliding window with letter counts finds rearranged letters, not an exact match. The Z-algorithm and rolling hash also solve this.

**Chapter:** [KMP String Matching](../10-string-algorithms/02-kmp.md)

**Real problem:** [Find the Index of the First Occurrence in a String](https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/) (LeetCode 28, Easy)

</details>

**Drill 33.** A cinema has seats numbered 0 to n. Exactly n different seats are sold, so one seat is empty. You get the sold seat numbers in any order. Find the empty seat, using O(1) extra space.

<details>
<summary><strong>Answer 33</strong></summary>

**Pattern:** Bit manipulation

**Hidden question:** Find the one number missing from the range 0 to n.

**Giveaway:** "numbered 0 to n", "one seat is empty" and "O(1) extra space". XOR all the indexes and values. Equal numbers cancel, so only the missing one is left.

**Why not the lookalike:** A hash set works but uses O(n) space. The sum formula also works in O(1) space. Cyclic sort works too, but it changes the array, so keep it for when many numbers are missing.

**Chapter:** [Bit Manipulation](../05-core-patterns/17-bit-manipulation.md), [Cyclic Sort and Index as Hash](../05-core-patterns/10-cyclic-sort.md)

**Real problem:** [Missing Number](https://leetcode.com/problems/missing-number/) (LeetCode 268, Easy). The story is new, but the problem is the same.

</details>

**Drill 34.** Remove the nth node from the end of a linked list, using one pass.

<details>
<summary><strong>Answer 34</strong></summary>

**Pattern:** Linked list manipulation

**Giveaway:** "from the end" and "one pass". Keep two pointers a fixed gap apart. When the front one reaches the end, the back one stops next to the target.

**Why not the lookalike:** This is not fast and slow pointers, because both pointers move at the same speed. Only the gap matters.

**Chapter:** [Singly Linked List](../03-linked-lists-stacks-queues/01-singly-linked-list.md), [Fast and Slow Pointers](../05-core-patterns/03-fast-and-slow-pointers.md)

**Real problem:** [Remove Nth Node From End of List](https://leetcode.com/problems/remove-nth-node-from-end-of-list/) (LeetCode 19, Medium)

</details>

**Drill 35.** Is there a root-to-leaf path in a binary tree whose values add up to a target? Values may be negative.

<details>
<summary><strong>Answer 35</strong></summary>

**Pattern:** Tree DFS

**Giveaway:** "root-to-leaf path". Walk down, subtract each value from the target, and check at each leaf.

**Why not the lookalike:** A prefix sum map is for paths that can start anywhere. Here every path starts at the root. With negative values, you cannot stop early when the sum passes the target.

**Chapter:** [Tree DFS Problems](../07-trees/03-tree-dfs-problems.md)

**Real problem:** [Path Sum](https://leetcode.com/problems/path-sum/) (LeetCode 112, Easy)

</details>

**Drill 36.** You get a grid of at most 6 by 6 letters and a word. Can you spell the word by moving between cells that share a side, using each cell at most once?

<details>
<summary><strong>Answer 36</strong></summary>

**Pattern:** Backtracking: constraint search

**Giveaway:** "each cell at most once" within one path, and a tiny grid.

**Why not the lookalike:** BFS or DFS with a shared visited array fails. A cell used by one failed path may be needed by another path, so you must un-mark it when you step back.

**Chapter:** [Backtracking: Constraint Search](../06-recursion-backtracking-greedy/04-backtracking-constraint-search.md)

**Real problem:** [Word Search](https://leetcode.com/problems/word-search/) (LeetCode 79, Medium)

</details>

**Drill 37.** You get two strings of the same length. Can you replace each character of the first with one fixed partner to get the second? Two different characters may not share a partner.

<details>
<summary><strong>Answer 37</strong></summary>

**Pattern:** Hash map lookup

**Giveaway:** "fixed partner" and "may not share". This is a one-to-one mapping, so keep a map in each direction.

**Why not the lookalike:** Frequency counting fails. `aab` and `xyx` have the same counts (2 and 1), but `a` would need two partners.

**Chapter:** [Hashing Patterns](../02-arrays-strings-hashing/04-hashing-patterns.md)

**Real problem:** [Isomorphic Strings](https://leetcode.com/problems/isomorphic-strings/) (LeetCode 205, Easy)

</details>

**Drill 38.** For every contiguous window of size k, return the maximum. The array can hold 100,000 values.

<details>
<summary><strong>Answer 38</strong></summary>

**Pattern:** Monotonic queue

**Giveaway:** "maximum" of every "window of size k". You need the largest value even after old values leave.

**Why not the lookalike:** A fixed window with one number fails, because removing the largest value loses the next largest. A heap also works, in O(n log n). The monotonic queue gives O(n).

**Chapter:** [Monotonic Queue](../05-core-patterns/13-monotonic-queue.md)

**Real problem:** [Sliding Window Maximum](https://leetcode.com/problems/sliding-window-maximum/) (LeetCode 239, Hard)

</details>

**Drill 39.** A map is a grid of land and water. Land cells join up, down, left and right. Count the islands, which are connected groups of land.

<details>
<summary><strong>Answer 39</strong></summary>

**Pattern:** Grid DFS or BFS

**Giveaway:** "count", "connected groups", a grid. Each unvisited land cell starts one walk that marks its whole island.

**Why not the lookalike:** Union-Find also works, with more code. DP does not fit, because the walk can go in any direction.

**Chapter:** [Grid Graphs](../08-graphs/03-grid-graphs.md)

**Real problem:** [Number of Islands](https://leetcode.com/problems/number-of-islands/) (LeetCode 200, Medium)

</details>

**Drill 40.** A staircase has n steps. Each move climbs 1 or 2 steps. How many different ways can you reach the top?

<details>
<summary><strong>Answer 40</strong></summary>

**Pattern:** 1D DP

**Hidden question:** ways(n) = ways(n - 1) + ways(n - 2).

**Giveaway:** "how many different ways" and a small choice at each step. The last move came from step n - 1 or n - 2.

**Why not the lookalike:** Backtracking lists every way, and that number grows very fast. You need only the count, so add up the answers to smaller cases.

**Chapter:** [1D Dynamic Programming](../09-dynamic-programming/02-one-dimensional-dp.md)

**Real problem:** [Climbing Stairs](https://leetcode.com/problems/climbing-stairs/) (LeetCode 70, Easy)

</details>

## Set 3: drills 41 to 60

**Drill 41.** Vertical walls stand in a row, with given heights. Pick two walls to hold water between them. The water held is the distance between the walls times the shorter height. Find the most water.

<details>
<summary><strong>Answer 41</strong></summary>

**Pattern:** Two pointers: opposite ends

**Hidden question:** Choose two positions to maximize width times the smaller height.

**Giveaway:** "pick two walls", and a score that uses width. Start with the widest pair. Then move the shorter wall, because the shorter wall limits the water.

**Why not the lookalike:** It looks like Trapping Rain Water, which adds up the water above every position. Here only the two chosen walls count. The walls between them do not matter, so a window does not fit either.

**Chapter:** [Two Pointers: Opposite Ends](../05-core-patterns/01-two-pointers-opposite-ends.md)

**Real problem:** [Container With Most Water](https://leetcode.com/problems/container-with-most-water/) (LeetCode 11, Medium)

</details>

**Drill 42.** A town has n people. A judge, if one exists, trusts nobody, and everyone else trusts the judge. Given pairs (a, b) meaning a trusts b, find the judge, or return -1.

<details>
<summary><strong>Answer 42</strong></summary>

**Pattern:** Frequency counting

**Hidden question:** Find the node with no outgoing edges and n - 1 incoming edges.

**Giveaway:** "trusts nobody" and "everyone else trusts". These are count rules, so count the incoming and outgoing edges.

**Why not the lookalike:** It looks like a graph walk, but no DFS or BFS is needed. Two count arrays solve it in time O(n + number of pairs).

**Chapter:** [Graphs From Zero](../08-graphs/01-graph-from-zero.md)

**Real problem:** [Find the Town Judge](https://leetcode.com/problems/find-the-town-judge/) (LeetCode 997, Easy)

</details>

**Drill 43.** Can you get string s from string t by deleting some letters of t, without changing the order of the rest?

<details>
<summary><strong>Answer 43</strong></summary>

**Pattern:** Two pointers: same direction

**Giveaway:** "deleting some letters" and "without changing the order". That is the meaning of subsequence, and the answer is only yes or no.

**Why not the lookalike:** A sliding window cannot skip letters. LCS DP (longest common subsequence) also works but is much slower. Walk through t and match each next letter of s when you meet it.

**Chapter:** [Two Pointers: Same Direction](../05-core-patterns/02-two-pointers-same-direction.md)

**Real problem:** [Is Subsequence](https://leetcode.com/problems/is-subsequence/) (LeetCode 392, Easy)

</details>

**Drill 44.** You sell one drink for 5 dollars. Customers pay with 5, 10 or 20 dollar bills, one by one, and you start with no change. Can you give correct change to everyone?

<details>
<summary><strong>Answer 44</strong></summary>

**Pattern:** Greedy

**Hidden question:** At each step, keep the most useful change.

**Giveaway:** "one by one" and "no change". For a 20 dollar bill, give back a 10 and a 5 if you can, because 5 dollar bills are more useful.

**Why not the lookalike:** No search or DP is needed, because one choice is never worse. Two counters are enough.

**Chapter:** [Greedy Foundations](../06-recursion-backtracking-greedy/06-greedy-foundations.md)

**Real problem:** [Lemonade Change](https://leetcode.com/problems/lemonade-change/) (LeetCode 860, Easy)

</details>

**Drill 45.** A robot starts at the top-left cell of a grid with at most 100 rows and 100 columns. It moves only right or down. How many paths reach the bottom-right cell?

<details>
<summary><strong>Answer 45</strong></summary>

**Pattern:** Grid DP

**Giveaway:** "how many paths" and "only right or down". Each cell is reached from the cell above it or the cell on its left.

**Why not the lookalike:** BFS finds a shortest path, not a count of all paths. A combinations formula also works.

**Chapter:** [Grid DP](../09-dynamic-programming/03-grid-dp.md)

**Real problem:** [Unique Paths](https://leetcode.com/problems/unique-paths/) (LeetCode 62, Medium)

</details>

**Drill 46.** Design a stack with push, pop, top and getMin. Each operation must be O(1).

<details>
<summary><strong>Answer 46</strong></summary>

**Pattern:** Design: data structure

**Giveaway:** "design", "getMin", "O(1)". Store the minimum so far next to each item.

**Why not the lookalike:** A heap shows the minimum in O(1), but each push costs O(log n), and it cannot remove the newest item directly. One `min` variable fails, because popping the minimum loses the next one.

**Chapter:** [Stack From Zero](../03-linked-lists-stacks-queues/05-stack-from-zero.md)

**Real problem:** [Min Stack](https://leetcode.com/problems/min-stack/) (LeetCode 155, Medium)

</details>

**Drill 47.** A sorted array has repeated values. Keep one copy of each value at the front, in place, and return how many values you kept.

<details>
<summary><strong>Answer 47</strong></summary>

**Pattern:** Two pointers: same direction

**Giveaway:** "sorted", "in place", "one copy". Equal values sit next to each other, so compare each value with the last kept value.

**Why not the lookalike:** A hash set works, but it uses O(n) space and ignores the sorted order.

**Chapter:** [Two Pointers: Same Direction](../05-core-patterns/02-two-pointers-same-direction.md)

**Real problem:** [Remove Duplicates from Sorted Array](https://leetcode.com/problems/remove-duplicates-from-sorted-array/) (LeetCode 26, Easy)

</details>

**Drill 48.** You have the temperature of each day. For each day, find how many days you must wait for a warmer day. Use 0 if no warmer day comes.

<details>
<summary><strong>Answer 48</strong></summary>

**Pattern:** Monotonic stack

**Hidden question:** Find the next greater element for every position.

**Giveaway:** "for each day" and "wait for a warmer day". The stack holds the days still waiting. From bottom to top, their temperatures never rise.

**Why not the lookalike:** Two nested loops cost O(n^2). A monotonic queue is for the best value of a moving window. Here each day wants its own next greater value.

**Chapter:** [Monotonic Stack](../05-core-patterns/12-monotonic-stack.md)

**Real problem:** [Daily Temperatures](https://leetcode.com/problems/daily-temperatures/) (LeetCode 739, Medium)

</details>

**Drill 49.** An array of n integers holds values from 1 to n. Some values appear twice and others are missing. Return all the missing values, with no extra array if you can.

<details>
<summary><strong>Answer 49</strong></summary>

**Pattern:** Cyclic sort

**Giveaway:** "values from 1 to n" with an array of size n. Each value can point at its own index.

**Why not the lookalike:** A hash set uses O(n) space. Sum tricks fail, because many values are missing. Place each value at its home index, or mark that index.

**Chapter:** [Cyclic Sort and Index as Hash](../05-core-patterns/10-cyclic-sort.md)

**Real problem:** [Find All Numbers Disappeared in an Array](https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array/) (LeetCode 448, Easy)

</details>

**Drill 50.** Build a structure with three operations: insert a word, search for a whole word, and check whether any stored word starts with a given prefix.

<details>
<summary><strong>Answer 50</strong></summary>

**Pattern:** Trie

**Giveaway:** "starts with a given prefix". Each operation walks one node per letter.

**Why not the lookalike:** A hash set of the words is great for whole words, but a prefix check must scan every word.

**Chapter:** [Trie (Prefix Tree)](../07-trees/13-trie.md)

**Real problem:** [Implement Trie (Prefix Tree)](https://leetcode.com/problems/implement-trie-prefix-tree/) (LeetCode 208, Medium)

</details>

**Drill 51.** An array rises to one peak, then falls. Find the index of the peak in O(log n) time.

<details>
<summary><strong>Answer 51</strong></summary>

**Pattern:** Binary search on index

**Giveaway:** "rises", "falls", "O(log n)". Compare the middle value with its right neighbour to learn which side holds the peak.

**Why not the lookalike:** The array is not sorted, yet binary search works. It needs a test that throws away half of the range, not sorted values.

**Chapter:** [Binary Search Basics](../04-sorting-searching/06-binary-search-basics.md)

**Real problem:** [Peak Index in a Mountain Array](https://leetcode.com/problems/peak-index-in-a-mountain-array/) (LeetCode 852, Medium)

</details>

**Drill 52.** A playlist is a list of song ids. Find the length of the longest run of back-to-back songs in which no song repeats.

<details>
<summary><strong>Answer 52</strong></summary>

**Pattern:** Variable sliding window

**Hidden question:** Find the longest contiguous piece with no repeated value.

**Giveaway:** "longest", "back-to-back", "no song repeats". The piece is contiguous, and a bigger window can never remove a repeat.

**Why not the lookalike:** DP for subsequences allows gaps, and this does not. A fixed window fails, because the length is what you must find.

**Chapter:** [Sliding Window: Variable Size](../05-core-patterns/05-sliding-window-variable.md)

**Real problem:** [Longest Substring Without Repeating Characters](https://leetcode.com/problems/longest-substring-without-repeating-characters/) (LeetCode 3, Medium). The story is new, but the problem is the same.

</details>

**Drill 53.** Reverse a singly linked list and return the new head.

<details>
<summary><strong>Answer 53</strong></summary>

**Pattern:** In-place linked list reversal

**Giveaway:** "reverse" on a linked list. Turn each `next` pointer around, and save the following node first.

**Why not the lookalike:** A stack works but uses O(n) space. You do not need the middle, so fast and slow pointers add nothing.

**Chapter:** [In-Place Linked List Reversal](../05-core-patterns/11-in-place-linked-list-reversal.md)

**Real problem:** [Reverse Linked List](https://leetcode.com/problems/reverse-linked-list/) (LeetCode 206, Easy)

</details>

**Drill 54.** You get up to 1000 points on a plane. The cost to join two points is their Manhattan distance (the difference in x plus the difference in y). Find the lowest total cost to connect all the points.

<details>
<summary><strong>Answer 54</strong></summary>

**Pattern:** Minimum spanning tree

**Giveaway:** "connect all the points" and "lowest total cost". You want the cheapest set of edges that joins everything.

**Why not the lookalike:** Dijkstra finds shortest paths from one start. Here the score is the total of all the edges you use, so use Prim or Kruskal.

**Chapter:** [Minimum Spanning Trees](../08-graphs/11-minimum-spanning-tree.md)

**Real problem:** [Min Cost to Connect All Points](https://leetcode.com/problems/min-cost-to-connect-all-points/) (LeetCode 1584, Medium)

</details>

**Drill 55.** A fitness app receives ride times one at a time. After any ride, it must show the median of all times so far. (The median is the middle value, or the average of the two middle values if the count is even.)

<details>
<summary><strong>Answer 55</strong></summary>

**Pattern:** Two heaps

**Hidden question:** Keep a running median of a stream.

**Giveaway:** "median" and "one at a time". Keep the lower half in a max-heap and the upper half in a min-heap.

**Why not the lookalike:** One heap gives only one end. A sorted array needs O(n) for each insert, and two heaps need O(log n).

**Chapter:** [Two Heaps](../05-core-patterns/15-two-heaps.md)

**Real problem:** [Find Median from Data Stream](https://leetcode.com/problems/find-median-from-data-stream/) (LeetCode 295, Hard). The story is new, but the problem is the same.

</details>

**Drill 56.** Given an array of integers, say whether any value appears more than once.

<details>
<summary><strong>Answer 56</strong></summary>

**Pattern:** Hash map lookup

**Giveaway:** "appears more than once". The real question is "have I seen this value before?"

**Why not the lookalike:** Sorting also works, but it costs O(n log n). A hash set gives O(n) on average. You need no counts, only seen or not seen.

**Chapter:** [Hashing Patterns](../02-arrays-strings-hashing/04-hashing-patterns.md)

**Real problem:** [Contains Duplicate](https://leetcode.com/problems/contains-duplicate/) (LeetCode 217, Easy)

</details>

**Drill 57.** A grid has exactly one island of land cells and no lakes. Find the length of the outer edge of the island.

<details>
<summary><strong>Answer 57</strong></summary>

**Pattern:** Matrix traversal

**Giveaway:** "exactly one island", so you do not need to find or count it. Each land cell adds one for every side that touches water or the border of the grid.

**Why not the lookalike:** DFS works, but it is more than you need. Two plain loops and a count are enough.

**Chapter:** [Matrix Problems](../02-arrays-strings-hashing/05-matrix-problems.md)

**Real problem:** [Island Perimeter](https://leetcode.com/problems/island-perimeter/) (LeetCode 463, Easy)

</details>

**Drill 58.** Return all subsets of an array of at most 10 different integers.

<details>
<summary><strong>Answer 58</strong></summary>

**Pattern:** Backtracking: subsets

**Giveaway:** "all subsets", with a limit as small as 10. There are 2^n answers, so you must build each one.

**Why not the lookalike:** DP counts or finds a best value. Here you must list every subset.

**Chapter:** [Backtracking: Subsets](../06-recursion-backtracking-greedy/02-backtracking-subsets.md)

**Real problem:** [Subsets](https://leetcode.com/problems/subsets/) (LeetCode 78, Medium)

</details>

**Drill 59.** Your calendar has busy blocks, each with a start and an end time, in no order. Blocks that overlap or touch count as one. Return the combined busy blocks.

<details>
<summary><strong>Answer 59</strong></summary>

**Pattern:** Merge intervals

**Hidden question:** Merge overlapping intervals.

**Giveaway:** "start and an end", "overlap", "combined". Sort by start. Each block then joins the last one or begins a new one.

**Why not the lookalike:** A sweep line counts how many blocks are active at a time. Here you want the combined blocks themselves.

**Chapter:** [Merge Intervals](../05-core-patterns/09-merge-intervals.md)

**Real problem:** [Merge Intervals](https://leetcode.com/problems/merge-intervals/) (LeetCode 56, Medium). The story is new, but the problem is the same.

</details>

**Drill 60.** Take a positive number. Replace it by the sum of the squares of its digits. Repeat. The number either reaches 1 or goes around a loop forever. Say whether it reaches 1.

<details>
<summary><strong>Answer 60</strong></summary>

**Pattern:** Fast and slow pointers

**Hidden question:** Does this chain of numbers end at 1, or does it contain a cycle?

**Giveaway:** "loop forever". Each value decides the next value, so the numbers form a hidden linked list.

**Why not the lookalike:** It looks like a math problem, but you only need to detect a repeat. A hash set of seen numbers also works, with extra space. Fast and slow pointers use O(1) space.

**Chapter:** [Fast and Slow Pointers](../05-core-patterns/03-fast-and-slow-pointers.md)

**Real problem:** [Happy Number](https://leetcode.com/problems/happy-number/) (LeetCode 202, Easy)

</details>

## Set 4: drills 61 to 80

**Drill 61.** A grid holds empty cells, fresh oranges and rotten oranges. Each minute, every fresh orange next to a rotten one turns rotten. How many minutes until no fresh orange is left? Return -1 if that can never happen.

<details>
<summary><strong>Answer 61</strong></summary>

**Pattern:** Multi-source BFS

**Hidden question:** Find the farthest cell from the nearest of many starts.

**Giveaway:** "each minute" and "next to". A wave spreads step by step from many starts at once.

**Why not the lookalike:** DFS does not spread in time order, so it gives wrong minutes. A BFS from each rotten orange repeats work. Put all rotten oranges in the queue at the start.

**Chapter:** [BFS Shortest Path Patterns](../08-graphs/04-bfs-shortest-path-patterns.md)

**Real problem:** [Rotting Oranges](https://leetcode.com/problems/rotting-oranges/) (LeetCode 994, Medium)

</details>

**Drill 62.** An array never changes. You get many queries, and each asks for the sum between two indexes. Make each query fast.

<details>
<summary><strong>Answer 62</strong></summary>

**Pattern:** Prefix sum

**Giveaway:** "never changes", "many queries", "sum between two indexes". Build a table once, then answer each query in O(1).

**Why not the lookalike:** A segment tree or Fenwick tree is for arrays that change. With no updates, you do not need them.

**Chapter:** [Prefix Sums](../05-core-patterns/06-prefix-sums.md)

**Real problem:** [Range Sum Query - Immutable](https://leetcode.com/problems/range-sum-query-immutable/) (LeetCode 303, Easy)

</details>

**Drill 63.** In a paint program, you click one pixel of an image. That pixel, and every pixel it reaches through neighbours of the same old colour, takes a new colour. Return the image.

<details>
<summary><strong>Answer 63</strong></summary>

**Pattern:** Grid DFS or BFS

**Hidden question:** Visit one connected region of a grid from a start cell.

**Giveaway:** "neighbours of the same old colour". That is one connected region from one start cell.

**Why not the lookalike:** Scanning the whole grid would also repaint regions that are not connected. If the new colour equals the old colour, return at once, or the walk may never end.

**Chapter:** [Grid Graphs](../08-graphs/03-grid-graphs.md)

**Real problem:** [Flood Fill](https://leetcode.com/problems/flood-fill/) (LeetCode 733, Easy)

</details>

**Drill 64.** Every value in an array appears exactly twice, except one value that appears once. Find it in O(n) time with O(1) extra space.

<details>
<summary><strong>Answer 64</strong></summary>

**Pattern:** Bit manipulation

**Giveaway:** "appears exactly twice, except one" and "O(1) extra space". XOR (the `^` operator) of a number with itself is 0, so pairs cancel.

**Why not the lookalike:** A hash set works but uses O(n) space. Sorting costs O(n log n).

**Chapter:** [Bit Manipulation](../05-core-patterns/17-bit-manipulation.md)

**Real problem:** [Single Number](https://leetcode.com/problems/single-number/) (LeetCode 136, Easy)

</details>

**Drill 65.** Two people each list the cities they visited, in order. Each list has at most 1000 cities. Find the length of the longest list of cities that appears in both, in the same order. Gaps are allowed.

<details>
<summary><strong>Answer 65</strong></summary>

**Pattern:** LCS DP

**Hidden question:** Find the longest common subsequence.

**Giveaway:** "in both", "same order", "gaps are allowed". Two sequences with limits near 1000 allow O(n times m).

**Why not the lookalike:** A sliding window cannot skip items. Two pointers can check one given subsequence, but cannot find the longest.

**Chapter:** [LCS and Edit Distance](../09-dynamic-programming/07-lcs-and-edit-distance.md)

**Real problem:** [Longest Common Subsequence](https://leetcode.com/problems/longest-common-subsequence/) (LeetCode 1143, Medium). The story is new, but the problem is the same.

</details>

**Drill 66.** A product has versions 1 to n. At some version a bug came in, and every later version also has the bug. A function tells you if a version has the bug. Find the first bad version with the fewest calls.

<details>
<summary><strong>Answer 66</strong></summary>

**Pattern:** Binary search on index

**Hidden question:** Find the first true in a list shaped like false, false, true, true.

**Giveaway:** "every later version" means the answers are in order: all good, then all bad. "Fewest calls" points to O(log n).

**Why not the lookalike:** Checking versions one by one costs O(n) calls. There is no real array here, but the answers are sorted, and that is all binary search needs.

**Chapter:** [Binary Search Basics](../04-sorting-searching/06-binary-search-basics.md)

**Real problem:** [First Bad Version](https://leetcode.com/problems/first-bad-version/) (LeetCode 278, Easy)

</details>

**Drill 67.** Given the head of a linked list, say whether following `next` ever brings you back to a node you already visited. Use O(1) extra space.

<details>
<summary><strong>Answer 67</strong></summary>

**Pattern:** Fast and slow pointers

**Giveaway:** "back to a node" and "O(1) extra space". In a cycle (a loop in the list), the fast pointer catches the slow one.

**Why not the lookalike:** A hash set of visited nodes works but uses O(n) space.

**Chapter:** [Fast and Slow Pointers](../05-core-patterns/03-fast-and-slow-pointers.md)

**Real problem:** [Linked List Cycle](https://leetcode.com/problems/linked-list-cycle/) (LeetCode 141, Easy)

</details>

**Drill 68.** You have a list of hashtags from one day of posts. Find the k most used hashtags.

<details>
<summary><strong>Answer 68</strong></summary>

**Pattern:** Top K with heap

**Hidden question:** Find the k most frequent values.

**Giveaway:** "k most used". First count with a hash map. Then keep the best k in a heap of size k.

**Why not the lookalike:** Sorting all the counts costs O(n log n) in the worst case. A count is at most n, so bucket sort gives O(n) on average. Mention both.

**Chapter:** [Top K With Heaps](../05-core-patterns/14-top-k-and-heaps.md)

**Real problem:** [Top K Frequent Elements](https://leetcode.com/problems/top-k-frequent-elements/) (LeetCode 347, Medium). The story is new, but the problem is the same.

</details>

**Drill 69.** A network has at most 100 nodes and directed edges with non-negative travel times. A signal starts at node k. How long until every node has it? Return -1 if some node never gets it.

<details>
<summary><strong>Answer 69</strong></summary>

**Pattern:** Dijkstra

**Giveaway:** "travel times", "non-negative", one start, all nodes. The answer is the largest shortest distance.

**Why not the lookalike:** Plain BFS counts edges, so it fails when edges have different times. Bellman-Ford also works, but it is slower, and you need it only for negative times.

**Chapter:** [Dijkstra's Algorithm](../08-graphs/08-dijkstra.md)

**Real problem:** [Network Delay Time](https://leetcode.com/problems/network-delay-time/) (LeetCode 743, Medium)

</details>

**Drill 70.** Return the values of a binary tree level by level, with one list for each level.

<details>
<summary><strong>Answer 70</strong></summary>

**Pattern:** Tree BFS

**Giveaway:** "level by level". A queue visits nodes in order of depth. The queue size tells you where a level ends.

**Why not the lookalike:** DFS with a depth argument also works, but BFS already moves one level at a time.

**Chapter:** [Tree BFS Problems](../07-trees/04-tree-bfs-problems.md)

**Real problem:** [Binary Tree Level Order Traversal](https://leetcode.com/problems/binary-tree-level-order-traversal/) (LeetCode 102, Medium)

</details>

**Drill 71.** A sorted array may hold negative values. Return the squares of all values, in sorted order, in O(n) time.

<details>
<summary><strong>Answer 71</strong></summary>

**Pattern:** Two pointers: opposite ends

**Giveaway:** "sorted", "negative values", "squares", "O(n)". The largest square is always at one of the two ends.

**Why not the lookalike:** Squaring and then sorting costs O(n log n). Compare the two ends and fill the result from the back.

**Chapter:** [Two Pointers: Opposite Ends](../05-core-patterns/01-two-pointers-opposite-ends.md)

**Real problem:** [Squares of a Sorted Array](https://leetcode.com/problems/squares-of-a-sorted-array/) (LeetCode 977, Easy)

</details>

**Drill 72.** A shop owner is grumpy in some minutes, and customers who come in those minutes are unhappy. A trick keeps the owner calm for m minutes in a row, and it can be used once. Given the customers and the mood for each minute, find the largest number of happy customers.

<details>
<summary><strong>Answer 72</strong></summary>

**Pattern:** Fixed sliding window

**Hidden question:** Choose one block of m minutes that saves the most unhappy customers.

**Giveaway:** "m minutes in a row" and "used once". The block has a fixed length, and you only choose where it goes.

**Why not the lookalike:** A difference array is for applying many ranges. Here there is one range. Count the happy customers without the trick, then add the best window of saved customers.

**Chapter:** [Sliding Window: Fixed Size](../05-core-patterns/04-sliding-window-fixed.md)

**Real problem:** [Grumpy Bookstore Owner](https://leetcode.com/problems/grumpy-bookstore-owner/) (LeetCode 1052, Medium)

</details>

**Drill 73.** A string holds only the characters ( ) [ ] { }. Say whether every opening bracket is closed by the same type, in the right order.

<details>
<summary><strong>Answer 73</strong></summary>

**Pattern:** Stack simulation

**Giveaway:** "opening bracket", "closed", "right order". The newest open bracket must close first.

**Why not the lookalike:** Counting brackets fails. `([)]` has equal counts but the wrong order.

**Chapter:** [Stacks for Expressions and Parentheses](../03-linked-lists-stacks-queues/06-stack-expressions-and-parentheses.md)

**Real problem:** [Valid Parentheses](https://leetcode.com/problems/valid-parentheses/) (LeetCode 20, Easy)

</details>

**Drill 74.** Does a singly linked list read the same forwards and backwards? Use O(n) time and O(1) extra space.

<details>
<summary><strong>Answer 74</strong></summary>

**Pattern:** Fast and slow pointers

**Giveaway:** "same forwards and backwards" on a list, with "O(1) extra space". Find the middle with fast and slow pointers, then reverse the second half.

**Why not the lookalike:** Copying to an array uses O(n) space. Two pointers from both ends fail, because you cannot walk a singly linked list backwards. This drill needs two patterns together.

**Chapter:** [Fast and Slow Pointers](../05-core-patterns/03-fast-and-slow-pointers.md), [In-Place Linked List Reversal](../05-core-patterns/11-in-place-linked-list-reversal.md)

**Real problem:** [Palindrome Linked List](https://leetcode.com/problems/palindrome-linked-list/) (LeetCode 234, Easy)

</details>

**Drill 75.** An array has up to 3000 integers. Find all unique triples of numbers that sum to zero.

<details>
<summary><strong>Answer 75</strong></summary>

**Pattern:** Two pointers: opposite ends

**Giveaway:** "triples", "sum to zero", "unique", and a limit that allows O(n^2). Sort, fix one number, then run two pointers on the rest.

**Why not the lookalike:** A hash set can also find triples, but removing repeated answers is harder. After sorting, you skip equal values.

**Chapter:** [Two Pointers: Opposite Ends](../05-core-patterns/01-two-pointers-opposite-ends.md)

**Real problem:** [3Sum](https://leetcode.com/problems/3sum/) (LeetCode 15, Medium)

</details>

**Drill 76.** Replace each element with the largest element to its right. The last element becomes -1.

<details>
<summary><strong>Answer 76</strong></summary>

**Pattern:** Prefix and suffix scan

**Giveaway:** "largest element to its right". Walk from right to left and keep the largest value so far.

**Why not the lookalike:** A monotonic stack finds the nearest greater element. You want the largest of all values on the right, so one running maximum is enough.

**Chapter:** [Left and Right Scans](../05-core-patterns/22-left-and-right-scans.md)

**Real problem:** [Replace Elements with Greatest Element on Right Side](https://leetcode.com/problems/replace-elements-with-greatest-element-on-right-side/) (LeetCode 1299, Easy)

</details>

**Drill 77.** An array of size n has one value that appears more than n/2 times. Find it, using O(1) extra space.

<details>
<summary><strong>Answer 77</strong></summary>

**Pattern:** Boyer-Moore voting

**Giveaway:** "more than n/2 times" and "O(1) extra space". The majority value outnumbers all the others together, so it survives when you cancel pairs of different values.

**Why not the lookalike:** A frequency map works but uses O(n) space. Sorting and taking the middle value works but costs O(n log n).

**Chapter:** [Arrays From Zero](../02-arrays-strings-hashing/01-arrays-from-zero.md)

**Real problem:** [Majority Element](https://leetcode.com/problems/majority-element/) (LeetCode 169, Easy)

</details>

**Drill 78.** Given a binary tree, return the number of nodes on the longest path from the root down to a leaf.

<details>
<summary><strong>Answer 78</strong></summary>

**Pattern:** Tree DFS

**Giveaway:** "longest path" from the root. The answer for a node is 1 plus the larger answer of its two children.

**Why not the lookalike:** BFS also works by counting levels, but the recursive DFS is shorter.

**Chapter:** [Tree DFS Problems](../07-trees/03-tree-dfs-problems.md)

**Real problem:** [Maximum Depth of Binary Tree](https://leetcode.com/problems/maximum-depth-of-binary-tree/) (LeetCode 104, Easy)

</details>

**Drill 79.** Return the middle node of a singly linked list. If there are two middle nodes, return the second one.

<details>
<summary><strong>Answer 79</strong></summary>

**Pattern:** Fast and slow pointers

**Giveaway:** "middle" of a list you cannot index. When the fast pointer reaches the end, the slow pointer is halfway.

**Why not the lookalike:** Counting the length and walking again also works, with two passes. Binary search does not fit, because a list has no random access.

**Chapter:** [Fast and Slow Pointers](../05-core-patterns/03-fast-and-slow-pointers.md)

**Real problem:** [Middle of the Linked List](https://leetcode.com/problems/middle-of-the-linked-list/) (LeetCode 876, Easy)

</details>

**Drill 80.** A lock has 4 wheels, each showing a digit from 0 to 9. One move turns one wheel one step up or down, and 9 wraps around to 0. Some codes jam the lock, so you must avoid them. Starting from 0000, find the fewest moves to reach a target code, or return -1.

<details>
<summary><strong>Answer 80</strong></summary>

**Pattern:** State-space BFS

**Hidden question:** Find a shortest path where each node is a state of the lock.

**Giveaway:** "fewest moves", and every move costs the same. Each code is a node, and each move is an edge.

**Why not the lookalike:** The input has no graph, so this is easy to miss. DFS can find a path, but not surely the shortest. DP does not fit, because moves can go back and forth, so states have no fixed order.

**Chapter:** [BFS Shortest Path Patterns](../08-graphs/04-bfs-shortest-path-patterns.md)

**Real problem:** [Open the Lock](https://leetcode.com/problems/open-the-lock/) (LeetCode 752, Medium)

</details>

## Set 5: drills 81 to 100

**Drill 81.** A score sheet has a list of entries. A number records a new score. `+` records the sum of the last two scores. `D` records double the last score. `C` cancels the last score. Return the total of all recorded scores.

<details>
<summary><strong>Answer 81</strong></summary>

**Pattern:** Stack simulation

**Hidden question:** Each action works on the newest items.

**Giveaway:** "last score" and "cancels". Every action touches the newest item, which means last in, first out.

**Why not the lookalike:** A running total alone fails, because `C` must know the old score. A queue gives you the oldest item, and you want the newest.

**Chapter:** [Stack From Zero](../03-linked-lists-stacks-queues/05-stack-from-zero.md)

**Real problem:** [Baseball Game](https://leetcode.com/problems/baseball-game/) (LeetCode 682, Easy)

</details>

**Drill 82.** A person has piles of bananas and h hours. Each hour they pick one pile and eat up to s bananas from it. If the pile is smaller, they finish it and wait for the next hour. Find the smallest speed s that finishes all piles in h hours.

<details>
<summary><strong>Answer 82</strong></summary>

**Pattern:** Binary search on answer

**Hidden question:** Find the smallest s for which a yes or no check passes.

**Giveaway:** "smallest speed" that still works. A faster speed never hurts, so the checks go no, no, yes, yes.

**Why not the lookalike:** There is no good greedy choice, and the order of the piles does not matter. Testing one speed takes O(n), so search over the speeds instead of trying them all.

**Chapter:** [Binary Search on the Answer](../04-sorting-searching/07-binary-search-on-answer.md)

**Real problem:** [Koko Eating Bananas](https://leetcode.com/problems/koko-eating-bananas/) (LeetCode 875, Medium)

</details>

**Drill 83.** You get up to 30 different positive numbers and a target of at most 40. List all combinations that sum to the target. A number may be used many times, and order does not matter.

<details>
<summary><strong>Answer 83</strong></summary>

**Pattern:** Backtracking: combinations

**Giveaway:** "list all combinations". The small limits allow building each answer.

**Why not the lookalike:** Unbounded knapsack DP looks close, but it counts or finds a best value. You need each list itself. Pass a start index, so that `[2, 3]` and `[3, 2]` are not both listed.

**Chapter:** [Backtracking: Permutations and Combinations](../06-recursion-backtracking-greedy/03-backtracking-permutations-combinations.md)

**Real problem:** [Combination Sum](https://leetcode.com/problems/combination-sum/) (LeetCode 39, Medium)

</details>

**Drill 84.** You get a sorted array of different integers and a target. Return the index of the target, or -1. Use O(log n) time.

<details>
<summary><strong>Answer 84</strong></summary>

**Pattern:** Binary search on index

**Giveaway:** "sorted" and "O(log n)".

**Why not the lookalike:** A linear scan is O(n). A hash map from value to index needs O(n) time just to build, and it ignores the sorted order.

**Chapter:** [Binary Search Basics](../04-sorting-searching/06-binary-search-basics.md)

**Real problem:** [Binary Search](https://leetcode.com/problems/binary-search/) (LeetCode 704, Easy)

</details>

**Drill 85.** Two friends share bags of coins. Each bag goes to one friend, unopened. There are at most 200 bags, and each holds at most 100 coins. Can they get equal amounts?

<details>
<summary><strong>Answer 85</strong></summary>

**Pattern:** 0/1 knapsack

**Hidden question:** Is there a subset whose sum is half of the total?

**Giveaway:** "each bag goes to one friend" means take it or leave it. "Equal amounts" gives a target of half the total, and the total is small.

**Why not the lookalike:** Greedy has no safe first choice. Backtracking may try 2^200 splits. The small total makes a DP table over sums possible.

**Chapter:** [0/1 Knapsack](../09-dynamic-programming/04-zero-one-knapsack.md)

**Real problem:** [Partition Equal Subset Sum](https://leetcode.com/problems/partition-equal-subset-sum/) (LeetCode 416, Medium). The story is new, but the problem is the same.

</details>

**Drill 86.** Some talks are booked in one room, each with a start and an end. A talk may start when another ends. Cancel as few talks as you can, so that no two overlap. How many do you cancel?

<details>
<summary><strong>Answer 86</strong></summary>

**Pattern:** Greedy

**Hidden question:** Find the minimum number of intervals to remove so that the rest do not overlap.

**Giveaway:** "as few", "no two overlap". Keep the talk that ends first, because it leaves the most room for the rest.

**Why not the lookalike:** Merging blocks does not answer this, because you must drop talks, not join them. Sort by end time. Sorting by start time also works, but only if each overlap drops the talk that ends later.

**Chapter:** [Merge Intervals](../05-core-patterns/09-merge-intervals.md)

**Real problem:** [Non-overlapping Intervals](https://leetcode.com/problems/non-overlapping-intervals/) (LeetCode 435, Medium). The story is new, but the problem is the same.

</details>

**Drill 87.** Ignore case, and ignore every character that is not a letter or a digit. Does the string read the same forwards and backwards?

<details>
<summary><strong>Answer 87</strong></summary>

**Pattern:** Two pointers: opposite ends

**Giveaway:** "same forwards and backwards". Compare the first and last characters, then move inwards.

**Why not the lookalike:** Building a cleaned copy and reversing it also works, but uses O(n) space. This is a yes or no check, not a search for the longest palindrome, so you need no DP.

**Chapter:** [Two Pointers: Opposite Ends](../05-core-patterns/01-two-pointers-opposite-ends.md)

**Real problem:** [Valid Palindrome](https://leetcode.com/problems/valid-palindrome/) (LeetCode 125, Easy)

</details>

**Drill 88.** Numbers arrive one at a time. After each new number, return the kth largest number seen so far.

<details>
<summary><strong>Answer 88</strong></summary>

**Pattern:** Top K with heap

**Giveaway:** "kth largest" and "one at a time". Keep a min-heap of the k largest numbers. Its top is the answer.

**Why not the lookalike:** Quickselect needs all the data at once. Sorting after each number is too slow.

**Chapter:** [Top K With Heaps](../05-core-patterns/14-top-k-and-heaps.md)

**Real problem:** [Kth Largest Element in a Stream](https://leetcode.com/problems/kth-largest-element-in-a-stream/) (LeetCode 703, Easy)

</details>

**Drill 89.** An array has at most 2500 integers. Find the length of the longest strictly increasing subsequence. (A subsequence may skip items but keeps their order.)

<details>
<summary><strong>Answer 89</strong></summary>

**Pattern:** LIS DP

**Giveaway:** "longest", "increasing", "subsequence". Each number can extend an earlier subsequence that ends in a smaller value.

**Why not the lookalike:** A window handles only contiguous runs. The simple DP is O(n^2), and binary search brings it down to O(n log n).

**Chapter:** [Longest Increasing Subsequence](../09-dynamic-programming/06-longest-increasing-subsequence.md)

**Real problem:** [Longest Increasing Subsequence](https://leetcode.com/problems/longest-increasing-subsequence/) (LeetCode 300, Medium)

</details>

**Drill 90.** Say whether a binary tree is a valid binary search tree: for every node, all values on its left are smaller, and all values on its right are larger.

<details>
<summary><strong>Answer 90</strong></summary>

**Pattern:** BST property

**Giveaway:** "valid" and "all values". The rule covers whole subtrees, not only the two children.

**Why not the lookalike:** Comparing a node with its two children is the classic wrong answer. Pass an allowed range down the tree, or check that an inorder walk (left side, node, right side) is strictly increasing.

**Chapter:** [Binary Search Trees From Zero](../07-trees/06-bst-from-zero.md)

**Real problem:** [Validate Binary Search Tree](https://leetcode.com/problems/validate-binary-search-tree/) (LeetCode 98, Medium)

</details>

**Drill 91.** You get an array of positive integers and a target. Find the length of the shortest contiguous subarray with a sum of at least target. Return 0 if none exists.

<details>
<summary><strong>Answer 91</strong></summary>

**Pattern:** Variable sliding window

**Giveaway:** "shortest", "contiguous", "at least", "positive". Positive values make the sum grow as the window grows, so shrinking is safe.

**Why not the lookalike:** With negative values you would need prefix sums and a monotonic queue. The word "positive" is what allows a plain window.

**Chapter:** [Sliding Window: Variable Size](../05-core-patterns/05-sliding-window-variable.md)

**Real problem:** [Minimum Size Subarray Sum](https://leetcode.com/problems/minimum-size-subarray-sum/) (LeetCode 209, Medium)

</details>

**Drill 92.** An array of integers may hold negative values. Count the contiguous subarrays whose sum is exactly k.

<details>
<summary><strong>Answer 92</strong></summary>

**Pattern:** Prefix sum with hash map

**Giveaway:** "count", "subarrays", "exactly k", "negative values". For each prefix, look for earlier prefixes equal to the current prefix minus k.

**Why not the lookalike:** A sliding window fails. A negative value can lower the sum, so a window that is too big can become good again. You cannot decide when to shrink.

**Chapter:** [Prefix Sums](../05-core-patterns/06-prefix-sums.md)

**Real problem:** [Subarray Sum Equals K](https://leetcode.com/problems/subarray-sum-equals-k/) (LeetCode 560, Medium)

</details>

**Drill 93.** Design a cache with a fixed size. `get` and `put` must be O(1) on average. When the cache is full, it removes the item that was used least recently.

<details>
<summary><strong>Answer 93</strong></summary>

**Pattern:** Design: hash map plus linked list

**Giveaway:** "design", "O(1)", "used least recently".

**Why not the lookalike:** A hash map alone has no order of use. A queue cannot move an item from the middle to the back in O(1). A doubly linked list can, and the hash map finds the node.

**Chapter:** [LRU and LFU Cache](../13-design-problems/01-lru-and-lfu-cache.md)

**Real problem:** [LRU Cache](https://leetcode.com/problems/lru-cache/) (LeetCode 146, Medium)

</details>

**Drill 94.** Some types of stone are jewels, given as a string of letters. You hold some stones, given as another string. How many of your stones are jewels?

<details>
<summary><strong>Answer 94</strong></summary>

**Pattern:** Hash map lookup

**Hidden question:** How many items of one list belong to a given set?

**Giveaway:** "how many of your stones are jewels". Each stone needs one membership test.

**Why not the lookalike:** Two nested loops cost O(n times m). Put the jewels in a hash set, and each test is O(1) on average.

**Chapter:** [Hash Tables From Zero](../02-arrays-strings-hashing/03-hash-tables-from-zero.md)

**Real problem:** [Jewels and Stones](https://leetcode.com/problems/jewels-and-stones/) (LeetCode 771, Easy)

</details>

**Drill 95.** A machine must return an exact amount of change with the fewest coins. It has up to 12 coin values, with unlimited coins of each. The amount is at most 10,000. Return -1 if it cannot be done.

<details>
<summary><strong>Answer 95</strong></summary>

**Pattern:** Unbounded knapsack

**Hidden question:** Find the fewest reusable items that reach an exact total.

**Giveaway:** "exact amount", "fewest coins", "unlimited coins".

**Why not the lookalike:** Greedy fails. With coins 1, 3, 4 and amount 6, largest-first gives 4 + 1 + 1, which is 3 coins. The best is 3 + 3, which is 2 coins.

**Chapter:** [Unbounded Knapsack](../09-dynamic-programming/05-unbounded-knapsack.md)

**Real problem:** [Coin Change](https://leetcode.com/problems/coin-change/) (LeetCode 322, Medium). The story is new, but the problem is the same.

</details>

**Drill 96.** Sort an array of integers by how many 1 bits each one has in binary. If two have the same count, the smaller value comes first.

<details>
<summary><strong>Answer 96</strong></summary>

**Pattern:** Sorting with custom order

**Giveaway:** "sort" with a tie rule. That means a custom comparator.

**Why not the lookalike:** The word "bits" pulls you toward bit tricks, but the bit count is only the sort key. The real task is sorting.

**Chapter:** [Sorting With a Custom Order](../04-sorting-searching/05-custom-sorting.md)

**Real problem:** [Sort Integers by The Number of 1 Bits](https://leetcode.com/problems/sort-integers-by-the-number-of-1-bits/) (LeetCode 1356, Easy)

</details>

**Drill 97.** For each number from 1 to n, output `Fizz` if it divides by 3, `Buzz` if it divides by 5, `FizzBuzz` if it divides by both, and the number itself otherwise.

<details>
<summary><strong>Answer 97</strong></summary>

**Pattern:** Simulation

**Giveaway:** The rules are given directly, and there is nothing to make faster.

**Why not the lookalike:** Not every problem hides a pattern. Do what the text says, and check the "both" case first.

**Chapter:** [Simulation, Enumeration and Brainteasers](../02-arrays-strings-hashing/06-simulation-and-enumeration.md)

**Real problem:** [Fizz Buzz](https://leetcode.com/problems/fizz-buzz/) (LeetCode 412, Easy)

</details>

**Drill 98.** Move all zeros in an array to the end. Keep the order of the other values. Work in place.

<details>
<summary><strong>Answer 98</strong></summary>

**Pattern:** Two pointers: same direction

**Giveaway:** "in place" and "keep the order". One pointer reads, and one marks where the next kept value goes.

**Why not the lookalike:** Swapping from opposite ends breaks the order of the other values. A second array works, but it is not in place.

**Chapter:** [Two Pointers: Same Direction](../05-core-patterns/02-two-pointers-same-direction.md)

**Real problem:** [Move Zeroes](https://leetcode.com/problems/move-zeroes/) (LeetCode 283, Easy)

</details>

**Drill 99.** You get an unsorted array of integers and a target. Return the indexes of the two numbers that add up to the target. Exactly one such pair exists.

<details>
<summary><strong>Answer 99</strong></summary>

**Pattern:** Hash map lookup

**Giveaway:** "unsorted", "two numbers", "return the indexes". For each number, you know exactly which partner you need.

**Why not the lookalike:** Two pointers need sorted input, and sorting moves the numbers away from their original indexes. A map from value to index finds the partner in O(1) on average.

**Chapter:** [Hashing Patterns](../02-arrays-strings-hashing/04-hashing-patterns.md)

**Real problem:** [Two Sum](https://leetcode.com/problems/two-sum/) (LeetCode 1, Easy)

</details>

**Drill 100.** You know the price of gold on each of the next n days. You may buy once, and sell once on a later day. Find the largest profit, or 0 if no profit is possible.

<details>
<summary><strong>Answer 100</strong></summary>

**Pattern:** Prefix and suffix scan

**Hidden question:** Find the largest later value minus an earlier value.

**Giveaway:** "buy once", "sell once on a later day". Walk left to right, keep the lowest price so far, and try selling today.

**Why not the lookalike:** Checking every pair costs O(n^2). Sorting fails, because it breaks the time order, and the time order is the whole rule.

**Chapter:** [Arrays From Zero](../02-arrays-strings-hashing/01-arrays-from-zero.md), [Left and Right Scans](../05-core-patterns/22-left-and-right-scans.md)

**Real problem:** [Best Time to Buy and Sell Stock](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/) (LeetCode 121, Easy). The story is new, but the problem is the same.

</details>

## After the drills

Do not only count your score. Look for the family you miss most. This table groups all 100 drills, so it is hidden until you finish.

<details>
<summary><strong>Show the drills by family</strong></summary>

| Family | Drills | Start with |
|---|---|---|
| Hashing and counting | 9, 22, 29, 37, 56, 77, 94, 99 | [Hashing Patterns](../02-arrays-strings-hashing/04-hashing-patterns.md) |
| Bits | 5, 33, 64 | [Bit Manipulation](../05-core-patterns/17-bit-manipulation.md) |
| Custom sorting | 96 | [Sorting With a Custom Order](../04-sorting-searching/05-custom-sorting.md) |
| Cyclic sort | 49 | [Cyclic Sort and Index as Hash](../05-core-patterns/10-cyclic-sort.md) |
| Two pointers | 26, 41, 43, 47, 71, 75, 87, 98 | [Two Pointers: Opposite Ends](../05-core-patterns/01-two-pointers-opposite-ends.md), [Two Pointers: Same Direction](../05-core-patterns/02-two-pointers-same-direction.md) |
| Linked lists | 14, 34, 53, 60, 67, 74, 79 | [Fast and Slow Pointers](../05-core-patterns/03-fast-and-slow-pointers.md), [In-Place Linked List Reversal](../05-core-patterns/11-in-place-linked-list-reversal.md) |
| Sliding windows | 2, 4, 21, 31, 52, 72, 91 | [Sliding Window: Fixed Size](../05-core-patterns/04-sliding-window-fixed.md), [Sliding Window: Variable Size](../05-core-patterns/05-sliding-window-variable.md) |
| Prefix sums, scans, Kadane | 10, 12, 23, 25, 62, 76, 92, 100 | [Prefix Sums](../05-core-patterns/06-prefix-sums.md), [Left and Right Scans](../05-core-patterns/22-left-and-right-scans.md), [Kadane's Algorithm](../05-core-patterns/08-kadane-and-subarray-dp.md) |
| Binary search | 18, 51, 66, 82, 84 | [Binary Search Basics](../04-sorting-searching/06-binary-search-basics.md), [Binary Search on the Answer](../04-sorting-searching/07-binary-search-on-answer.md) |
| Stacks and queues | 13, 16, 38, 46, 48, 73, 81 | [Stack From Zero](../03-linked-lists-stacks-queues/05-stack-from-zero.md), [Monotonic Stack](../05-core-patterns/12-monotonic-stack.md), [Monotonic Queue](../05-core-patterns/13-monotonic-queue.md) |
| Heaps | 1, 8, 19, 55, 68, 88 | [Top K With Heaps](../05-core-patterns/14-top-k-and-heaps.md), [Two Heaps](../05-core-patterns/15-two-heaps.md) |
| Intervals | 59, 86 | [Merge Intervals](../05-core-patterns/09-merge-intervals.md) |
| Dynamic programming | 27, 40, 45, 65, 85, 89, 95 | [Dynamic Programming From Zero](../09-dynamic-programming/01-dp-from-zero.md), [1D Dynamic Programming](../09-dynamic-programming/02-one-dimensional-dp.md) |
| Trees | 7, 17, 24, 35, 50, 70, 78, 90 | [Tree DFS Problems](../07-trees/03-tree-dfs-problems.md), [Tree BFS Problems](../07-trees/04-tree-bfs-problems.md), [Binary Search Trees From Zero](../07-trees/06-bst-from-zero.md) |
| Graphs | 11, 28, 30, 39, 42, 54, 61, 63, 69, 80 | [BFS and DFS](../08-graphs/02-bfs-and-dfs.md), [Grid Graphs](../08-graphs/03-grid-graphs.md), [BFS Shortest Path Patterns](../08-graphs/04-bfs-shortest-path-patterns.md) |
| Backtracking | 20, 36, 58, 83 | [Backtracking: Subsets](../06-recursion-backtracking-greedy/02-backtracking-subsets.md), [Backtracking: Permutations and Combinations](../06-recursion-backtracking-greedy/03-backtracking-permutations-combinations.md) |
| Greedy | 6, 15, 44 | [Greedy Foundations](../06-recursion-backtracking-greedy/06-greedy-foundations.md) |
| Plain simulation, matrices, strings, design | 3, 32, 57, 93, 97 | [Simulation, Enumeration and Brainteasers](../02-arrays-strings-hashing/06-simulation-and-enumeration.md), [LRU and LFU Cache](../13-design-problems/01-lru-and-lfu-cache.md) |

</details>

When you get a drill wrong, write down two things:

1. The words you should have noticed.
2. The lookalike that fooled you.

After a few days, these notes become your own list of signals. If two patterns keep getting mixed up, read [Lookalike Patterns](07-lookalike-patterns.md). If a problem gave you no idea at all, read [When You Do Not Recognize the Problem](12-when-you-do-not-recognize-it.md).

When you can score 34 or more on every set, move on to [Recognition Drills: Medium](10-recognition-drills-medium.md).
