# Pattern Cards

> **Level:** Intermediate · **Priority:** T1 · **Time:** 150 min · **Read first:** [How to Recognize Any Problem](01-how-to-recognize-any-problem.md), [Keyword Dictionary](05-keyword-dictionary.md) · **Next:** [Lookalike Patterns: How to Tell Them Apart](07-lookalike-patterns.md)

This chapter has one short card for each pattern in this guide. A card tells you when to use the pattern, which words give it away, what the code looks like, and which mistake people make most. Use it for fast revision, after you have studied the chapters. Each card links to its full chapter.

## Quick revision

- **Pair in a sorted array:** two pointers from both ends ([card 6](#6-two-pointers-opposite-ends)). Unsorted, use a hash map ([card 1](#1-hash-map-lookup-count-group)).
- **Contiguous piece, longest or shortest, with a rule:** variable sliding window ([card 10](#10-variable-sliding-window)). Fixed size k: [card 9](#9-fixed-sliding-window).
- **Exact subarray sum, or negative numbers:** prefix sum with a hash map ([card 12](#12-prefix-sum-with-a-hash-map)).
- **Many range updates, one final result:** difference array ([card 14](#14-difference-array-and-sweep-line)). Many range queries with updates: Fenwick tree ([card 90](#90-fenwick-tree)) or segment tree ([card 89](#89-segment-tree)).
- **Linked list, cycle or middle:** fast and slow pointers ([card 8](#8-fast-and-slow-pointers)).
- **Next greater, or next smaller:** monotonic stack ([card 20](#20-monotonic-stack)). Max of each window: monotonic queue ([card 22](#22-monotonic-queue)).
- **K largest, or K most frequent:** heap ([card 24](#24-top-k-with-a-heap)). Median of a stream: two heaps ([card 25](#25-two-heaps)).
- **Sorted data, or "first position where X becomes true":** binary search ([card 30](#30-binary-search-on-index)). "Minimum value that still works": binary search on the answer ([card 31](#31-binary-search-on-the-answer)).
- **All subsets, all orders, all arrangements:** backtracking (cards [39](#39-backtracking-subsets-permutations-combinations) and [40](#40-backtracking-constraint-search)). Only the best value or a count: try DP first ([card 65](#65-1d-dp)).
- **Shortest path with no weights:** BFS ([card 53](#53-bfs-shortest-path)). Weights that are not negative: Dijkstra ([card 58](#58-dijkstra)). Weights of only 0 and 1: [card 54](#54-0-1-bfs).
- **Order with dependencies:** topological sort ([card 55](#55-topological-sort)). Groups that merge: union-find ([card 56](#56-union-find)).
- **Choices that overlap, best or count:** dynamic programming (cards [65](#65-1d-dp) to [76](#76-dp-optimization)). A local choice that you can prove safe: greedy ([card 42](#42-greedy)).
- **Words share prefixes:** trie ([card 49](#49-trie)). Find a pattern inside text: KMP ([card 77](#77-kmp-and-z-algorithm)).
- **n up to about 20:** bitmask ([card 73](#73-bitmask-dp)) or backtracking. **n up to about 40:** meet in the middle ([card 43](#43-meet-in-the-middle)).

## How to use the cards

Each card has the same parts:

| Part | What it tells you |
|---|---|
| **Covers** | The pattern names on this card. Related patterns share one card. |
| **When** | The kind of problem this pattern solves. |
| **Giveaway** | The words or shapes in a problem that point to it. |
| **Not if** | The lookalike, and why it fails. Read this line twice. It is what stops a wrong start. |
| **Cost** | Time and space of the template. |
| **Classics** | Three real problems. |
| **Mistake** | The most common mistake, and the fix. |
| **Chapter** | Where the full lesson is. |

Then comes a short template. It is a shape to remember, not a finished solution. Comments that start with `Needs:` give the limits of that template. In a real problem, you change the state and the rule, and the shape stays.

When you read a new problem, do this:

1. Find the clue in the table below.
2. Open that card and read **Not if**.
3. Ask yourself why this pattern works here. If you cannot say why, try the next candidate.

If no clue fits, go to [When You Do Not Recognize the Problem](12-when-you-do-not-recognize-it.md). To practise, use [Recognition Drills: Easy](09-recognition-drills-easy.md).

## Find your card

| Clue in the problem | Card |
|---|---|
| "two numbers that add up to", "seen before", "count of each" | [card 1](#1-hash-map-lookup-count-group) |
| Sorted array and a pair or triple | [card 6](#6-two-pointers-opposite-ends) |
| "in place", "remove", "move to the end" | [card 7](#7-two-pointers-same-direction) |
| Linked list with "cycle", "middle", "kth from end" | [card 8](#8-fast-and-slow-pointers), [card 18](#18-linked-list-reversal-and-surgery) |
| "subarray of size k" | [card 9](#9-fixed-sliding-window) |
| "longest substring", "shortest subarray", "at most k" | [card 10](#10-variable-sliding-window) |
| "sum of range", many queries, no updates | [card 11](#11-prefix-sum) |
| "subarray sum equals k", "divisible by k" | [card 12](#12-prefix-sum-with-a-hash-map) |
| "except self", answer needs both sides | [card 13](#13-prefix-and-suffix-scan) |
| "add to a range", "how many at the same time" | [card 14](#14-difference-array-and-sweep-line) |
| "maximum subarray" with no extra rule | [card 15](#15-kadanes-algorithm) |
| List of `[start, end]` pairs | [card 16](#16-merge-intervals) |
| Values from 1 to n, "missing", "duplicate", O(1) space | [card 17](#17-cyclic-sort) |
| Brackets, "undo", nested structure, "evaluate" | [card 19](#19-stack-simulation-and-expression-parsing) |
| "next greater", "previous smaller", "histogram" | [card 20](#20-monotonic-stack) |
| "sum over all subarrays of the min" | [card 21](#21-contribution-technique) |
| "max of each window" | [card 22](#22-monotonic-queue) |
| "top k", "k most frequent", "k closest" | [card 24](#24-top-k-with-a-heap) |
| "median", stream of numbers | [card 25](#25-two-heaps) |
| "merge k sorted" | [card 26](#26-k-way-merge) |
| "count pairs i < j with a[i] > a[j]" | [card 28](#28-merge-sort-counting) |
| "kth smallest", one time only | [card 29](#29-quickselect-and-the-median-rule) |
| Sorted, O(log n), "first or last position" | [card 30](#30-binary-search-on-index) |
| "minimize the maximum", "minimum speed that finishes" | [card 31](#31-binary-search-on-the-answer) |
| "closest value", "next free slot", data keeps changing | [card 33](#33-ordered-set) |
| "single number", "XOR", "n up to 20 as a set" | [card 37](#37-bit-manipulation), [card 73](#73-bitmask-dp) |
| "all subsets", "all permutations", "generate all" | [card 39](#39-backtracking-subsets-permutations-combinations) |
| "place so that no two conflict" | [card 40](#40-backtracking-constraint-search) |
| "minimum number of moves" on a grid or word list | [card 53](#53-bfs-shortest-path) |
| "prerequisites", "order of tasks" | [card 55](#55-topological-sort) |
| "connected", "friend circles", "merge accounts" | [card 56](#56-union-find) |
| "cheapest path", "network delay" | [card 58](#58-dijkstra) |
| "connect all at minimum cost" | [card 60](#60-minimum-spanning-tree) |
| "number of ways", "minimum cost", "can you reach", choices overlap | [card 65](#65-1d-dp) |
| Pick items with a capacity or a target sum | [card 67](#67-knapsack) |
| Two strings, "common", "edit", "subsequence" | [card 69](#69-lcs-dp) |
| "palindromic subsequence" or "burst, merge, cut a range" | [card 70](#70-palindrome-dp-and-interval-dp) |
| "with cooldown", "at most k transactions" | [card 71](#71-state-machine-dp) |
| Words share prefixes, "starts with" | [card 49](#49-trie) |
| "get in O(1)", "design a cache" | [card 95](#95-design-hash-map-plus-linked-list) |

## Arrays, strings and hashing

### 1. Hash Map: Lookup, Count, Group

- **Covers:** Hash map lookup, Frequency counting, Group by key, Pair counting, Hashing
- **When:** You must find, count or group items by value, and the order of items does not matter.
- **Giveaway:** "two numbers that add up to", "contains duplicate", "anagram", "count of each", "group by".
- **Not if:** The array is sorted and you need O(1) space: use [card 6](#6-two-pointers-opposite-ends). You need the nearest value, not an equal value: a hash map has no order, so use [card 33](#33-ordered-set).
- **Cost:** O(n) time on average, O(n^2) in the worst case. O(n) space.
- **Classics:** [Two Sum](https://leetcode.com/problems/two-sum/) (LeetCode 1, Easy); [Group Anagrams](https://leetcode.com/problems/group-anagrams/) (LeetCode 49, Medium); [Longest Consecutive Sequence](https://leetcode.com/problems/longest-consecutive-sequence/) (LeetCode 128, Medium)
- **Mistake:** Storing the item before you check it, so that it pairs with itself. Check first, then store.
- **Chapter:** [Hashing Patterns](../02-arrays-strings-hashing/04-hashing-patterns.md). Costs and collisions are in [Hash Tables From Zero](../02-arrays-strings-hashing/03-hash-tables-from-zero.md).

To count, write `count[x]++`. To group, write `groups[keyOf(x)].push_back(x)`.

```cpp compile
// Two Sum shape: look for the partner among the items you have already seen.
vector<int> pairWithSum(const vector<int>& nums, int target) {
    unordered_map<long long, int> indexOf;  // value -> index
    for (int i = 0; i < (int)nums.size(); i++) {
        long long need = (long long)target - nums[i];  // the difference may not fit in int
        auto found = indexOf.find(need);
        if (found != indexOf.end()) return {found->second, i};
        indexOf[nums[i]] = i;
    }
    return {};
}
```

### 2. Simulation and Matrix Walks

- **Covers:** Simulation, Array simulation, Grid simulation, Matrix traversal, Logic building
- **When:** The problem tells you the exact steps, and the only hard part is doing them correctly.
- **Giveaway:** "spiral", "rotate the matrix", "repeat until", a game with exact rules, and small limits.
- **Not if:** The number of steps is huge, such as 10^9. Direct simulation is too slow, so look for a repeat, a formula or [card 84](#84-matrix-exponentiation).
- **Cost:** O(rows * cols) time for one walk. O(1) extra space, not counting the output.
- **Classics:** [Spiral Matrix](https://leetcode.com/problems/spiral-matrix/) (LeetCode 54, Medium); [Rotate Image](https://leetcode.com/problems/rotate-image/) (LeetCode 48, Medium); [Game of Life](https://leetcode.com/problems/game-of-life/) (LeetCode 289, Medium)
- **Mistake:** Going past a border on a single row or column. Check `top <= bottom` and `left <= right` again in the middle of the loop.
- **Chapter:** [Simulation, Enumeration and Brainteasers](../02-arrays-strings-hashing/06-simulation-and-enumeration.md), [Matrix Problems](../02-arrays-strings-hashing/05-matrix-problems.md), and [Logic Building Warm-Ups](../00-start-here/06-logic-building-warm-ups.md) for logic building.

```cpp compile
// Four borders close in after each side is walked.
vector<int> spiralOrder(const vector<vector<int>>& matrix) {
    vector<int> order;
    if (matrix.empty()) return order;
    int top = 0, bottom = (int)matrix.size() - 1, left = 0, right = (int)matrix[0].size() - 1;
    while (top <= bottom && left <= right) {
        for (int c = left; c <= right; c++) order.push_back(matrix[top][c]);
        top++;
        for (int r = top; r <= bottom; r++) order.push_back(matrix[r][right]);
        right--;
        if (top <= bottom) for (int c = right; c >= left; c--) order.push_back(matrix[bottom][c]);
        bottom--;
        if (left <= right) for (int r = bottom; r >= top; r--) order.push_back(matrix[r][left]);
        left++;
    }
    return order;
}
```

### 3. String Work and Parsing

- **Covers:** String manipulation, String parsing, State machine parsing, Date and time arithmetic
- **When:** The input is text with a format: numbers, tokens, log lines, dates, or a file path.
- **Giveaway:** "parse", "valid format", "convert", "log file", "timestamp", "split by".
- **Not if:** The text has nesting, such as brackets inside brackets: a flat scan loses track, so use [card 19](#19-stack-simulation-and-expression-parsing).
- **Cost:** O(n) time, O(1) to O(n) space.
- **Classics:** [String to Integer (atoi)](https://leetcode.com/problems/string-to-integer-atoi/) (LeetCode 8, Medium); [Roman to Integer](https://leetcode.com/problems/roman-to-integer/) (LeetCode 13, Easy); [Number of Days Between Two Dates](https://leetcode.com/problems/number-of-days-between-two-dates/) (LeetCode 1360, Easy)
- **Mistake:** Forgetting leading spaces, a sign, an empty string, or overflow. Write down each state (spaces, sign, digits) before you code.
- **Chapter:** [String Parsing and Log Processing](../02-arrays-strings-hashing/07-string-parsing-and-log-processing.md), [Strings From Zero](../02-arrays-strings-hashing/02-strings-from-zero.md)

```cpp compile
// Read a signed integer and stop at the first bad character. Clamp to the int range.
int parseInt(const string& s) {
    int i = 0, n = (int)s.size(), sign = 1;
    while (i < n && s[i] == ' ') i++;
    if (i < n && (s[i] == '+' || s[i] == '-')) sign = (s[i++] == '-') ? -1 : 1;
    long long value = 0;
    for (; i < n && isdigit((unsigned char)s[i]); i++) {
        value = value * 10 + (s[i] - '0');
        if (sign * value >= INT_MAX) return INT_MAX;  // stop here, so that value never overflows
        if (sign * value <= INT_MIN) return INT_MIN;
    }
    return (int)(sign * value);
}
```

### 4. Enumeration, Construction and Invariants

- **Covers:** Enumeration, Constructive, Invariants and parity
- **When:** You can try every value of one unknown, you must build any valid answer, or some quantity never changes.
- **Giveaway:** Small limits on one variable. "Return any valid arrangement". "Each move changes two items" (ask what stays the same, such as odd or even).
- **Not if:** Both unknowns are large and neither follows from the other. Try [card 6](#6-two-pointers-opposite-ends) or [card 31](#31-binary-search-on-the-answer).
- **Cost:** The size of the range you try, times the check. Below it is O(sqrt(c)) time, O(1) space.
- **Classics:** [Sum of Square Numbers](https://leetcode.com/problems/sum-of-square-numbers/) (LeetCode 633, Medium); [Beautiful Arrangement II](https://leetcode.com/problems/beautiful-arrangement-ii/) (LeetCode 667, Medium); [Minimum Cost to Move Chips to The Same Position](https://leetcode.com/problems/minimum-cost-to-move-chips-to-the-same-position/) (LeetCode 1217, Easy)
- **Mistake:** Enumerating both unknowns when the second can be computed from the first.
- **Chapter:** [Simulation, Enumeration and Brainteasers](../02-arrays-strings-hashing/06-simulation-and-enumeration.md)

```cpp compile
// Fix one unknown and compute the other. Can c be written as a*a + b*b?
bool isSumOfSquares(int c) {
    for (long long a = 0; a * a <= c; a++) {
        long long rest = c - a * a;
        long long b = (long long)sqrtl((long double)rest);
        while (b * b > rest) b--;  // fix any rounding in the floating-point root
        while ((b + 1) * (b + 1) <= rest) b++;
        if (b * b == rest) return true;
    }
    return false;
}
```

### 5. Boyer-Moore Voting

- **Covers:** Boyer-Moore voting
- **When:** One value appears more than half the time, and you need O(1) space.
- **Giveaway:** "majority element", "more than n / 2 times".
- **Not if:** The value is only the most frequent, with no more than half guarantee. Voting then gives a wrong answer, so count with [card 1](#1-hash-map-lookup-count-group).
- **Cost:** O(n) time, O(1) space.
- **Classics:** [Majority Element](https://leetcode.com/problems/majority-element/) (LeetCode 169, Easy); [Majority Element II](https://leetcode.com/problems/majority-element-ii/) (LeetCode 229, Medium); [Online Majority Element In Subarray](https://leetcode.com/problems/online-majority-element-in-subarray/) (LeetCode 1157, Hard)
- **Mistake:** Trusting the candidate when no majority is promised. Count it in a second pass.
- **Chapter:** [Arrays From Zero](../02-arrays-strings-hashing/01-arrays-from-zero.md)

For "more than n / 3 times", keep two candidates with two vote counts, then verify both.

```cpp compile
// Needs: a value that appears more than n / 2 times exists.
int majorityValue(const vector<int>& nums) {
    int candidate = 0, votes = 0;
    for (int value : nums) {
        if (votes == 0) candidate = value;  // all earlier items cancelled each other out
        votes += (value == candidate) ? 1 : -1;
    }
    return candidate;
}
```

## Two pointers and sliding windows

### 6. Two Pointers: Opposite Ends

- **Covers:** Two pointers: opposite ends
- **When:** The input is sorted, or you need two positions whose values you compare, and one move can rule out many pairs.
- **Giveaway:** "sorted array", "pair with sum", "palindrome", "container", "3Sum".
- **Not if:** The array is not sorted and you must return the original indexes: sorting moves them, so use [card 1], or sort (value, index) pairs(#1-hash-map-lookup-count-group). The answer is a piece between two ends, with a rule on the whole piece: use [card 10](#10-variable-sliding-window).
- **Cost:** O(n) time, O(1) space. Add O(n log n) if you must sort first. 3Sum is O(n^2), with one scan for each first item.
- **Classics:** [Two Sum II - Input Array Is Sorted](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/) (LeetCode 167, Medium); [3Sum](https://leetcode.com/problems/3sum/) (LeetCode 15, Medium); [Container With Most Water](https://leetcode.com/problems/container-with-most-water/) (LeetCode 11, Medium)
- **Mistake:** Moving a pointer with no reason. Say which pairs the move rules out.
- **Chapter:** [Two Pointers: Opposite Ends](../05-core-patterns/01-two-pointers-opposite-ends.md)

```cpp compile
// Needs: nums is sorted in ascending order.
vector<int> pairInSorted(const vector<int>& nums, int target) {
    int left = 0, right = (int)nums.size() - 1;
    while (left < right) {
        long long sum = (long long)nums[left] + nums[right];
        if (sum == target) return {left, right};
        if (sum < target) left++;  // nums[left] is too small even with the largest partner
        else right--;              // nums[right] is too large even with the smallest partner
    }
    return {};
}
```

### 7. Two Pointers: Same Direction

- **Covers:** Two pointers: same direction, In-place array manipulation, Run-length grouping
- **When:** You filter or compress an array in place. One pointer reads and one writes. Or you handle runs of equal items.
- **Giveaway:** "in place", "remove duplicates", "move zeroes", "compress", "consecutive equal".
- **Not if:** There is a rule about all the items between the pointers, such as a sum: that is a window, [card 10](#10-variable-sliding-window).
- **Cost:** O(n) time, O(1) space.
- **Classics:** [Remove Duplicates from Sorted Array](https://leetcode.com/problems/remove-duplicates-from-sorted-array/) (LeetCode 26, Easy); [Move Zeroes](https://leetcode.com/problems/move-zeroes/) (LeetCode 283, Easy); [String Compression](https://leetcode.com/problems/string-compression/) (LeetCode 443, Medium)
- **Mistake:** Using `nums.size()` after the removal. The new length is `write`.
- **Chapter:** [Two Pointers: Same Direction](../05-core-patterns/02-two-pointers-same-direction.md)

```cpp compile
// Read every item, write only the ones you keep. Needs: nums is sorted.
int keepUnique(vector<int>& nums) {
    int write = 0;
    for (int read = 0; read < (int)nums.size(); read++) {
        if (read == 0 || nums[read] != nums[read - 1]) nums[write++] = nums[read];
    }
    return write;  // the kept items are nums[0 .. write - 1]
}

// Run-length shape: j walks to the end of the run that starts at i.
int longestRun(const string& s) {
    int best = 0;
    for (int i = 0, j = 0; i < (int)s.size(); i = j) {
        while (j < (int)s.size() && s[j] == s[i]) j++;
        best = max(best, j - i);  // the run is s[i .. j - 1]
    }
    return best;
}
```

### 8. Fast and Slow Pointers

- **Covers:** Fast and slow pointers
- **When:** A linked list, or any "next" function, may have a cycle, or you need the middle, and you may not use extra memory.
- **Giveaway:** "cycle", "middle of the list", "happy number", "duplicate in 1 to n with no extra space".
- **Not if:** You can use O(n) memory and want the plainest code: a hash set of visited nodes also works. On an array with a rule on a range, use [card 10](#10-variable-sliding-window).
- **Cost:** O(n) time, O(1) space.
- **Classics:** [Linked List Cycle](https://leetcode.com/problems/linked-list-cycle/) (LeetCode 141, Easy); [Linked List Cycle II](https://leetcode.com/problems/linked-list-cycle-ii/) (LeetCode 142, Medium); [Middle of the Linked List](https://leetcode.com/problems/middle-of-the-linked-list/) (LeetCode 876, Easy)
- **Mistake:** Reading `fast->next->next` without checking `fast` and `fast->next` for null.
- **Chapter:** [Fast and Slow Pointers](../05-core-patterns/03-fast-and-slow-pointers.md)

```cpp compile
struct ListNode { int val; ListNode* next; };

// Returns the first node of the cycle, or nullptr if there is no cycle.
ListNode* cycleStart(ListNode* head) {
    ListNode* slow = head;
    ListNode* fast = head;
    while (fast != nullptr && fast->next != nullptr) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) {  // inside the cycle, the gap closes by 1 each step
            ListNode* start = head;  // at equal speed, these two meet at the cycle start
            while (start != slow) { start = start->next; slow = slow->next; }
            return start;
        }
    }
    return nullptr;
}
```

### 9. Fixed Sliding Window

- **Covers:** Fixed sliding window
- **When:** Every window has the same given size.
- **Giveaway:** "subarray of size k", "of length k", "permutation in string", "every k consecutive".
- **Not if:** The size is not given and depends on a rule: use [card 10](#10-variable-sliding-window). You need the max of each window: one sum cannot give it, so use [card 22](#22-monotonic-queue).
- **Cost:** O(n) time, O(1) space, or O(alphabet) with a count table.
- **Classics:** [Maximum Average Subarray I](https://leetcode.com/problems/maximum-average-subarray-i/) (LeetCode 643, Easy); [Permutation in String](https://leetcode.com/problems/permutation-in-string/) (LeetCode 567, Medium); [Find All Anagrams in a String](https://leetcode.com/problems/find-all-anagrams-in-a-string/) (LeetCode 438, Medium)
- **Mistake:** An off-by-one on the first full window. It ends at index `k - 1`.
- **Chapter:** [Sliding Window: Fixed Size](../05-core-patterns/04-sliding-window-fixed.md)

```cpp compile
// Best sum of any window of size k. Needs: 1 <= k <= nums.size().
long long bestFixedWindow(const vector<int>& nums, int k) {
    long long windowSum = 0;
    for (int i = 0; i < k; i++) windowSum += nums[i];
    long long best = windowSum;
    for (int right = k; right < (int)nums.size(); right++) {
        windowSum += (long long)nums[right] - nums[right - k];  // one enters, one leaves
        best = max(best, windowSum);
    }
    return best;
}
```

### 10. Variable Sliding Window

- **Covers:** Variable sliding window
- **When:** You want the longest, shortest or number of contiguous pieces that obey a rule, and the rule is monotonic. (Monotonic: if growing a window breaks the rule, growing it more keeps it broken. For "shortest", it is the reverse: once a window meets the rule, growing it keeps it met.)
- **Giveaway:** "longest substring", "minimum size subarray", "at most k", "without repeating characters".
- **Not if:** Numbers can be negative in a sum rule: growing can fix a broken window, so use [card 12](#12-prefix-sum-with-a-hash-map) for an exact sum and [card 22](#22-monotonic-queue) for "at least k". The items may have gaps ("subsequence"): a window cannot skip, so use [card 68](#68-lis-dp) or [card 69](#69-lcs-dp).
- **Cost:** O(n) time on average with a hash map, because `left` only moves forward. O(k) space for k distinct values.
- **Classics:** [Longest Substring Without Repeating Characters](https://leetcode.com/problems/longest-substring-without-repeating-characters/) (LeetCode 3, Medium); [Minimum Window Substring](https://leetcode.com/problems/minimum-window-substring/) (LeetCode 76, Hard); [Minimum Size Subarray Sum](https://leetcode.com/problems/minimum-size-subarray-sum/) (LeetCode 209, Medium)
- **Mistake:** Recording the answer in the wrong place. For longest, record after shrinking. For shortest, record inside the shrink loop.
- **Chapter:** [Sliding Window: Variable Size](../05-core-patterns/05-sliding-window-variable.md)

```cpp compile
// Longest window with at most k distinct values.
int longestAtMostKDistinct(const vector<int>& nums, int k) {
    unordered_map<int, int> count;
    int left = 0, best = 0;
    for (int right = 0; right < (int)nums.size(); right++) {
        count[nums[right]]++;
        while ((int)count.size() > k) {  // broken: shrink until it is valid again
            if (--count[nums[left]] == 0) count.erase(nums[left]);
            left++;
        }
        best = max(best, right - left + 1);
    }
    return best;
}
```

## Ranges and intervals

### 11. Prefix Sum

- **Covers:** Prefix sum
- **When:** You need the sum of many ranges, and the array does not change.
- **Giveaway:** "sum of range", "many queries", "pivot index", "2D range sum".
- **Not if:** The array changes between queries: each update would rebuild the table, so use [card 90](#90-fenwick-tree).
- **Cost:** O(n) to build, O(1) for each query, O(n) space.
- **Classics:** [Range Sum Query - Immutable](https://leetcode.com/problems/range-sum-query-immutable/) (LeetCode 303, Easy); [Find Pivot Index](https://leetcode.com/problems/find-pivot-index/) (LeetCode 724, Easy); [Range Sum Query 2D - Immutable](https://leetcode.com/problems/range-sum-query-2d-immutable/) (LeetCode 304, Medium)
- **Mistake:** An off-by-one. Keep `n + 1` entries, so that `prefix[0] = 0` and no range needs a special case.
- **Chapter:** [Prefix Sums](../05-core-patterns/06-prefix-sums.md)

```cpp compile
// prefix[i] is the sum of the first i items.
vector<long long> buildPrefix(const vector<int>& nums) {
    vector<long long> prefix(nums.size() + 1, 0);
    for (int i = 0; i < (int)nums.size(); i++) prefix[i + 1] = prefix[i] + nums[i];
    return prefix;
}

// Sum of nums[left .. right], both ends included.
long long rangeSum(const vector<long long>& prefix, int left, int right) {
    return prefix[right + 1] - prefix[left];
}
```

### 12. Prefix Sum With a Hash Map

- **Covers:** Prefix sum with hash map
- **When:** You need a subarray with an exact sum or remainder, and values may be negative.
- **Giveaway:** "subarray sum equals k", "divisible by k", "equal number of 0s and 1s" (count each 0 as -1).
- **Not if:** All values are positive and the rule is "at most" or "at least": [card 10](#10-variable-sliding-window) does it with O(1) space.
- **Cost:** O(n) time on average, O(n) space.
- **Classics:** [Subarray Sum Equals K](https://leetcode.com/problems/subarray-sum-equals-k/) (LeetCode 560, Medium); [Contiguous Array](https://leetcode.com/problems/contiguous-array/) (LeetCode 525, Medium); [Subarray Sums Divisible by K](https://leetcode.com/problems/subarray-sums-divisible-by-k/) (LeetCode 974, Medium)
- **Mistake:** Forgetting `seen[0] = 1`, which misses every subarray that starts at index 0.
- **Chapter:** [Prefix Sums](../05-core-patterns/06-prefix-sums.md)

```cpp compile
// Count subarrays with sum exactly k. Works with negative numbers.
long long countSumK(const vector<int>& nums, int k) {
    unordered_map<long long, long long> seen;  // prefix sum -> how many times
    seen[0] = 1;  // the empty prefix
    long long prefix = 0, count = 0;
    for (int value : nums) {
        prefix += value;
        auto found = seen.find(prefix - k);
        if (found != seen.end()) count += found->second;
        seen[prefix]++;  // after the lookup, or k = 0 would count an empty subarray
    }
    return count;
}
```

### 13. Prefix and Suffix Scan

- **Covers:** Prefix and suffix scan
- **When:** The answer at index i needs a fact about everything to its left and to its right.
- **Giveaway:** "except self", "trapping rain water", "must be greater than both neighbours", "split the array into two parts".
- **Not if:** You need the nearest greater item, not the largest of a whole side: use [card 20](#20-monotonic-stack).
- **Cost:** O(n) time, O(1) extra space here, or O(n) with two arrays.
- **Classics:** [Product of Array Except Self](https://leetcode.com/problems/product-of-array-except-self/) (LeetCode 238, Medium); [Trapping Rain Water](https://leetcode.com/problems/trapping-rain-water/) (LeetCode 42, Hard); [Candy](https://leetcode.com/problems/candy/) (LeetCode 135, Hard)
- **Mistake:** Including index i itself in its own left or right fact. Use the fact first, then update it.
- **Chapter:** [Left and Right Scans](../05-core-patterns/22-left-and-right-scans.md)

```cpp compile
// Needs: every prefix and suffix product fits in int.
vector<int> productExceptSelf(const vector<int>& nums) {
    int n = (int)nums.size();
    vector<int> answer(n, 1);
    int leftProduct = 1;
    for (int i = 0; i < n; i++) { answer[i] = leftProduct; leftProduct *= nums[i]; }
    int rightProduct = 1;
    for (int i = n - 1; i >= 0; i--) { answer[i] *= rightProduct; rightProduct *= nums[i]; }
    return answer;
}
```

### 14. Difference Array and Sweep Line

- **Covers:** Difference array, 2D difference array, Sweep line
- **When:** Many updates add to a range, and you read the result only at the end. Or you ask how many things overlap at one moment.
- **Giveaway:** "add x to every element from l to r", "bookings", "car pooling", "maximum overlap", "rooms needed".
- **Not if:** You must read values between updates: the array is out of date until the final pass, so use [card 89](#89-segment-tree).
- **Cost:** O(n + q) time and O(n) space. A sweep line sorts events, so O(q log q) time.
- **Classics:** [Corporate Flight Bookings](https://leetcode.com/problems/corporate-flight-bookings/) (LeetCode 1109, Medium); [Car Pooling](https://leetcode.com/problems/car-pooling/) (LeetCode 1094, Medium); [Increment Submatrices by One](https://leetcode.com/problems/increment-submatrices-by-one/) (LeetCode 2536, Medium)
- **Mistake:** A sweep line that gets ties wrong. If an interval that ends at t does not overlap one that starts at t, handle the end first.
- **Chapter:** [Difference Arrays and Sweep Line](../05-core-patterns/07-difference-array-and-sweep-line.md)

For a sweep line, make `(time, +1)` and `(time, -1)` events, sort them, and keep a running total. For a 2D difference array, change the four corners of the rectangle.

```cpp compile
// Each update {first, last, delta} adds delta to nums[first .. last].
vector<long long> applyRangeAdds(int n, const vector<array<int, 3>>& updates) {
    vector<long long> diff(n + 1, 0);  // n + 1, because last + 1 may equal n
    for (const auto& update : updates) {
        diff[update[0]] += update[2];      // the change starts here
        diff[update[1] + 1] -= update[2];  // and stops after last
    }
    for (int i = 1; i < n; i++) diff[i] += diff[i - 1];  // a running sum rebuilds the values
    diff.pop_back();
    return diff;
}
```

### 15. Kadane's Algorithm

- **Covers:** Kadane
- **When:** You want the best sum of a contiguous piece, with no other rule.
- **Giveaway:** "maximum subarray", "largest sum", "best time to buy and sell, one trade" (on the daily changes).
- **Not if:** There is a length limit or a target sum: the "drop a bad past" step ignores those rules, so use [card 22](#22-monotonic-queue) or [card 12](#12-prefix-sum-with-a-hash-map).
- **Cost:** O(n) time, O(1) space.
- **Classics:** [Maximum Subarray](https://leetcode.com/problems/maximum-subarray/) (LeetCode 53, Medium); [Maximum Product Subarray](https://leetcode.com/problems/maximum-product-subarray/) (LeetCode 152, Medium); [Maximum Sum Circular Subarray](https://leetcode.com/problems/maximum-sum-circular-subarray/) (LeetCode 918, Medium)
- **Mistake:** Starting `best` at 0. If all values are negative, the answer is the largest value, not 0.
- **Chapter:** [Kadane's Algorithm](../05-core-patterns/08-kadane-and-subarray-dp.md)

```cpp compile
// Needs: nums is not empty, and the subarray must not be empty.
long long maxSubarraySum(const vector<int>& nums) {
    long long current = nums[0], best = nums[0];
    for (int i = 1; i < (int)nums.size(); i++) {
        current = max<long long>(nums[i], current + nums[i]);  // a negative past only hurts
        best = max(best, current);
    }
    return best;
}
```

### 16. Merge Intervals

- **Covers:** Merge intervals
- **When:** The input is a list of `[start, end]` pairs that may overlap.
- **Giveaway:** "overlapping intervals", "insert interval", "remove the fewest so that none overlap".
- **Not if:** You need the number of overlaps at each moment: use [card 14](#14-difference-array-and-sweep-line). Intervals arrive one by one, with a question after each: use [card 33](#33-ordered-set).
- **Cost:** O(n log n) time for the sort. O(n) space for the output.
- **Classics:** [Merge Intervals](https://leetcode.com/problems/merge-intervals/) (LeetCode 56, Medium); [Insert Interval](https://leetcode.com/problems/insert-interval/) (LeetCode 57, Medium); [Non-overlapping Intervals](https://leetcode.com/problems/non-overlapping-intervals/) (LeetCode 435, Medium)
- **Mistake:** Writing `merged.back()[1] = interval[1]`. The new interval may sit inside the old one, so take the `max`.
- **Chapter:** [Merge Intervals](../05-core-patterns/09-merge-intervals.md)

```cpp compile
vector<vector<int>> mergeIntervals(vector<vector<int>> intervals) {
    sort(intervals.begin(), intervals.end());  // by start, so that overlaps become neighbours
    vector<vector<int>> merged;
    for (const auto& interval : intervals) {
        if (!merged.empty() && interval[0] <= merged.back()[1]) {
            merged.back()[1] = max(merged.back()[1], interval[1]);
        } else {
            merged.push_back(interval);
        }
    }
    return merged;
}
```

### 17. Cyclic Sort

- **Covers:** Cyclic sort, Permutation cycles
- **When:** Values fall in a known range such as 1 to n, so each value has one home index.
- **Giveaway:** "numbers from 1 to n", "missing", "duplicate", "O(1) extra space", "minimum swaps to sort a permutation".
- **Not if:** Values can be anything, with no link to indexes: use [card 1](#1-hash-map-lookup-count-group) or [card 27](#27-sorting-and-custom-order).
- **Cost:** O(n) time, because each swap puts one value home. O(1) space.
- **Classics:** [Missing Number](https://leetcode.com/problems/missing-number/) (LeetCode 268, Easy); [Find All Numbers Disappeared in an Array](https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array/) (LeetCode 448, Easy); [First Missing Positive](https://leetcode.com/problems/first-missing-positive/) (LeetCode 41, Hard)
- **Mistake:** Using `if` instead of `while`. The value that you swap in also needs a home.
- **Chapter:** [Cyclic Sort and Index as Hash](../05-core-patterns/10-cyclic-sort.md)

The minimum number of swaps to sort a permutation is `n` minus its number of cycles.

```cpp compile
// Smallest missing positive. Put each value v in 1..n at index v - 1.
int firstMissingPositive(vector<int>& nums) {
    int n = (int)nums.size();
    for (int i = 0; i < n; i++) {
        // The last check stops an endless swap of two equal values.
        while (nums[i] >= 1 && nums[i] <= n && nums[nums[i] - 1] != nums[i]) {
            swap(nums[i], nums[nums[i] - 1]);
        }
    }
    for (int i = 0; i < n; i++) if (nums[i] != i + 1) return i + 1;
    return n + 1;
}
```

## Linked lists, stacks and queues

### 18. Linked List Reversal and Surgery

- **Covers:** In-place linked list reversal, Linked list manipulation
- **When:** You must change the links of a list with O(1) extra space.
- **Giveaway:** "reverse", "in k-groups", "reorder", "remove the nth node", "swap nodes".
- **Not if:** You only need to read the list, such as find the middle: use [card 8](#8-fast-and-slow-pointers).
- **Cost:** O(n) time, O(1) space.
- **Classics:** [Reverse Linked List](https://leetcode.com/problems/reverse-linked-list/) (LeetCode 206, Easy); [Reverse Linked List II](https://leetcode.com/problems/reverse-linked-list-ii/) (LeetCode 92, Medium); [Reverse Nodes in k-Group](https://leetcode.com/problems/reverse-nodes-in-k-group/) (LeetCode 25, Hard)
- **Mistake:** Overwriting `next` before you save it. Also use a dummy node when the head itself can change.
- **Chapter:** [In-Place Linked List Reversal](../05-core-patterns/11-in-place-linked-list-reversal.md), [Linked List Problems](../03-linked-lists-stacks-queues/04-linked-list-problems.md)

```cpp compile
struct ListNode { int val; ListNode* next; };

ListNode* reverseList(ListNode* head) {
    ListNode* previous = nullptr;
    ListNode* current = head;
    while (current != nullptr) {
        ListNode* next = current->next;  // save it, because the next line overwrites it
        current->next = previous;
        previous = current;
        current = next;
    }
    return previous;  // the old tail is the new head
}
```

### 19. Stack Simulation and Expression Parsing

- **Covers:** Stack simulation, Expression parsing
- **When:** The newest open item must finish first. That is last in, first out.
- **Giveaway:** "valid parentheses", "undo", "backspace", "decode", "evaluate the expression", "nested".
- **Not if:** You want the next greater item for each index: that is a stack with a sorted order rule, [card 20](#20-monotonic-stack).
- **Cost:** O(n) time, O(n) space.
- **Classics:** [Valid Parentheses](https://leetcode.com/problems/valid-parentheses/) (LeetCode 20, Easy); [Evaluate Reverse Polish Notation](https://leetcode.com/problems/evaluate-reverse-polish-notation/) (LeetCode 150, Medium); [Decode String](https://leetcode.com/problems/decode-string/) (LeetCode 394, Medium)
- **Mistake:** Reading `top()` of an empty stack, and forgetting to check that the stack is empty at the end.
- **Chapter:** [Stack From Zero](../03-linked-lists-stacks-queues/05-stack-from-zero.md), [Stacks for Expressions and Parentheses](../03-linked-lists-stacks-queues/06-stack-expressions-and-parentheses.md)

```cpp compile
// Needs: s holds only bracket characters.
bool isBalanced(const string& s) {
    stack<char> open;
    for (char c : s) {
        if (c == '(' || c == '[' || c == '{') { open.push(c); continue; }
        if (open.empty()) return false;  // a closer with nothing to close
        char expected = (c == ')') ? '(' : (c == ']') ? '[' : '{';
        if (open.top() != expected) return false;
        open.pop();
    }
    return open.empty();  // leftover open brackets also make it invalid
}
```

### 20. Monotonic Stack

- **Covers:** Monotonic stack
- **When:** For each item, you need the nearest item to one side that is greater or smaller.
- **Giveaway:** "next greater", "previous smaller", "days until warmer", "largest rectangle", "stock span".
- **Not if:** You need the max of a sliding window: items leave from the old end too, so use [card 22](#22-monotonic-queue).
- **Cost:** O(n) time, because each index is pushed once and popped at most once. O(n) space.
- **Classics:** [Daily Temperatures](https://leetcode.com/problems/daily-temperatures/) (LeetCode 739, Medium); [Next Greater Element II](https://leetcode.com/problems/next-greater-element-ii/) (LeetCode 503, Medium); [Largest Rectangle in Histogram](https://leetcode.com/problems/largest-rectangle-in-histogram/) (LeetCode 84, Hard)
- **Mistake:** Storing values instead of indexes. You almost always need the distance or the position.
- **Chapter:** [Monotonic Stack](../05-core-patterns/12-monotonic-stack.md)

```cpp compile
// Days until a strictly greater value. 0 if there is none.
vector<int> daysUntilWarmer(const vector<int>& temps) {
    vector<int> answer(temps.size(), 0);
    vector<int> waiting;  // indexes with no answer yet, values never rise from bottom to top
    for (int i = 0; i < (int)temps.size(); i++) {
        while (!waiting.empty() && temps[waiting.back()] < temps[i]) {
            answer[waiting.back()] = i - waiting.back();  // i is its first greater value
            waiting.pop_back();
        }
        waiting.push_back(i);
    }
    return answer;
}
```

### 21. Contribution Technique

- **Covers:** Contribution technique
- **When:** You must sum something over all subarrays or all pairs. Listing them is too slow.
- **Giveaway:** "sum of the minimums of all subarrays", "sum of all ranges", "total over every substring".
- **Not if:** You want one best subarray, not a total over all of them: use [card 10](#10-variable-sliding-window) or [card 15](#15-kadanes-algorithm).
- **Cost:** O(n) time and O(n) space with a monotonic stack.
- **Classics:** [Sum of Subarray Minimums](https://leetcode.com/problems/sum-of-subarray-minimums/) (LeetCode 907, Medium); [Sum of Subarray Ranges](https://leetcode.com/problems/sum-of-subarray-ranges/) (LeetCode 2104, Medium); [Count Unique Characters of All Substrings of a Given String](https://leetcode.com/problems/count-unique-characters-of-all-substrings-of-a-given-string/) (LeetCode 828, Hard)
- **Mistake:** Counting ties twice. Use "strictly less" on one side and "less or equal" on the other.
- **Chapter:** [Contribution Technique](../05-core-patterns/18-contribution-technique.md)

Flip the question. Do not ask "what is the sum for each subarray?". Ask "in how many subarrays does this one item count?".

```cpp compile
// Each item counts once for every subarray in which it is the minimum. Needs: the total fits in long long.
long long sumOfSubarrayMins(const vector<int>& arr) {
    int n = (int)arr.size();
    long long total = 0;
    vector<int> rising;  // indexes with rising values
    for (int i = 0; i <= n; i++) {
        int value = (i == n) ? INT_MIN : arr[i];  // the extra INT_MIN empties the stack at the end
        while (!rising.empty() && arr[rising.back()] >= value) {
            int middle = rising.back();
            rising.pop_back();
            int leftBound = rising.empty() ? -1 : rising.back();
            total += (long long)arr[middle] * (middle - leftBound) * (i - middle);
        }
        rising.push_back(i);
    }
    return total;
}
```

### 22. Monotonic Queue

- **Covers:** Monotonic queue
- **When:** You need the max or min of a window that slides.
- **Giveaway:** "sliding window maximum", "max minus min at most limit", "best value among the last k".
- **Not if:** Only the window sum is needed: one number is enough, so use [card 9](#9-fixed-sliding-window).
- **Cost:** O(n) time, because each index enters and leaves once. O(k) space.
- **Classics:** [Sliding Window Maximum](https://leetcode.com/problems/sliding-window-maximum/) (LeetCode 239, Hard); [Longest Continuous Subarray With Absolute Diff Less Than or Equal to Limit](https://leetcode.com/problems/longest-continuous-subarray-with-absolute-diff-less-than-or-equal-to-limit/) (LeetCode 1438, Medium); [Shortest Subarray with Sum at Least K](https://leetcode.com/problems/shortest-subarray-with-sum-at-least-k/) (LeetCode 862, Hard)
- **Mistake:** Removing the front by value, not by index. Store indexes, so that you can tell when the front has left the window.
- **Chapter:** [Monotonic Queue](../05-core-patterns/13-monotonic-queue.md)

```cpp compile
// Maximum of every window of size k. Needs: 1 <= k <= nums.size().
vector<int> slidingMaximum(const vector<int>& nums, int k) {
    deque<int> window;  // indexes, values strictly falling from front to back
    vector<int> result;
    for (int right = 0; right < (int)nums.size(); right++) {
        while (!window.empty() && nums[window.back()] <= nums[right]) window.pop_back();
        window.push_back(right);
        if (window.front() <= right - k) window.pop_front();  // the front left the window
        if (right >= k - 1) result.push_back(nums[window.front()]);
    }
    return result;
}
```

### 23. Queue, Circular Buffer and Deque

- **Covers:** Queue simulation, Circular buffer, Deque
- **When:** Items are served in arrival order, a buffer has a fixed size, or you add and remove at both ends.
- **Giveaway:** "first come, first served", "recent calls", "fixed capacity", "ring", "both ends".
- **Not if:** The most urgent item goes first, not the oldest: use [card 24](#24-top-k-with-a-heap).
- **Cost:** O(1) for each operation. O(capacity) space.
- **Classics:** [Design Circular Queue](https://leetcode.com/problems/design-circular-queue/) (LeetCode 622, Medium); [Design Circular Deque](https://leetcode.com/problems/design-circular-deque/) (LeetCode 641, Medium); [Number of Recent Calls](https://leetcode.com/problems/number-of-recent-calls/) (LeetCode 933, Easy)
- **Mistake:** Mixing up full and empty. A count variable keeps the two apart.
- **Chapter:** [Queue From Zero](../03-linked-lists-stacks-queues/07-queue-from-zero.md), [Circular Queue and Ring Buffer](../03-linked-lists-stacks-queues/08-circular-queue.md), [Deque: Double-Ended Queue](../03-linked-lists-stacks-queues/09-deque.md)

```cpp compile
struct RingQueue {
    vector<int> items;
    int head = 0, count = 0;
    explicit RingQueue(int capacity) : items(capacity) {}
    bool push(int value) {
        if (count == (int)items.size()) return false;
        items[(head + count) % (int)items.size()] = value;  // wraps instead of shifting
        count++;
        return true;
    }
    bool pop() {
        if (count == 0) return false;
        head = (head + 1) % (int)items.size();
        count--;
        return true;
    }
};
```

## Heaps

### 24. Top K With a Heap

- **Covers:** Top K with heap, Heap simulation
- **When:** You need the k best items, or you must take the smallest or largest again and again.
- **Giveaway:** "k largest", "k most frequent", "k closest", "repeatedly take the two heaviest", "schedule the next task".
- **Not if:** You need the k-th item one time and the data is all in memory: [card 29](#29-quickselect-and-the-median-rule) is O(n) on average. The data is fully sorted anyway: use [card 27](#27-sorting-and-custom-order).
- **Cost:** O(n log k) time, O(k) space for top k. Repeated take on all items: O(n log n) time, O(n) space.
- **Classics:** [Kth Largest Element in an Array](https://leetcode.com/problems/kth-largest-element-in-an-array/) (LeetCode 215, Medium); [Top K Frequent Elements](https://leetcode.com/problems/top-k-frequent-elements/) (LeetCode 347, Medium); [Last Stone Weight](https://leetcode.com/problems/last-stone-weight/) (LeetCode 1046, Easy)
- **Mistake:** Using a max-heap for the k largest, which must hold all n items. A min-heap of size k keeps the weakest winner on top, so that it is easy to drop.
- **Chapter:** [Top K With Heaps](../05-core-patterns/14-top-k-and-heaps.md), [Heaps and Priority Queues From Zero](../07-trees/11-heap-from-zero.md)

```cpp compile
// The k largest values, in ascending order. Needs: k >= 1.
vector<int> topKLargest(const vector<int>& nums, int k) {
    priority_queue<int, vector<int>, greater<int>> heap;
    for (int value : nums) {
        heap.push(value);
        if ((int)heap.size() > k) heap.pop();  // the smallest cannot be in the top k
    }
    vector<int> result;
    for (; !heap.empty(); heap.pop()) result.push_back(heap.top());
    return result;
}
```

### 25. Two Heaps

- **Covers:** Two heaps, Lazy deletion
- **When:** You need the middle of data that keeps changing, or the best of two groups that keep trading items.
- **Giveaway:** "median", "data stream", "sliding window median", "capital and profit".
- **Not if:** Data does not change and you ask one time: use [card 29](#29-quickselect-and-the-median-rule).
- **Cost:** O(log n) for each add, O(1) to read. O(n) space.
- **Classics:** [Find Median from Data Stream](https://leetcode.com/problems/find-median-from-data-stream/) (LeetCode 295, Hard); [Sliding Window Median](https://leetcode.com/problems/sliding-window-median/) (LeetCode 480, Hard); [IPO](https://leetcode.com/problems/ipo/) (LeetCode 502, Hard)
- **Mistake:** Letting the sizes drift. Keep `low` equal to `high`, or one larger, after every add.
- **Chapter:** [Two Heaps](../05-core-patterns/15-two-heaps.md)

A heap cannot delete from the middle. Lazy deletion means you remember the deleted value, and you remove it only when it reaches the top.

```cpp compile
class MedianTracker {
public:
    void add(int value) {
        low.push(value);  // every value passes through low, so that the order stays right
        high.push(low.top());
        low.pop();
        if (high.size() > low.size()) { low.push(high.top()); high.pop(); }
    }
    double median() const {  // needs: at least one value
        if (low.size() > high.size()) return low.top();
        return ((double)low.top() + high.top()) / 2.0;
    }
private:
    priority_queue<int> low;  // max-heap of the smaller half
    priority_queue<int, vector<int>, greater<int>> high;  // min-heap of the larger half
};
```

### 26. K-Way Merge

- **Covers:** K-way merge
- **When:** You have k sorted lists, and you need one sorted order, or the smallest few items.
- **Giveaway:** "merge k sorted", "kth smallest in a sorted matrix", "smallest range from k lists".
- **Not if:** There are only 2 lists: two pointers are enough, [card 7](#7-two-pointers-same-direction).
- **Cost:** O(N log k) time for N items in total. O(k) space.
- **Classics:** [Merge k Sorted Lists](https://leetcode.com/problems/merge-k-sorted-lists/) (LeetCode 23, Hard); [Kth Smallest Element in a Sorted Matrix](https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/) (LeetCode 378, Medium); [Smallest Range Covering Elements from K Lists](https://leetcode.com/problems/smallest-range-covering-elements-from-k-lists/) (LeetCode 632, Hard)
- **Mistake:** Pushing whole lists, or everything at once. Keep only one candidate from each list in the heap.
- **Chapter:** [K-Way Merge](../05-core-patterns/16-k-way-merge.md)

```cpp compile
vector<int> mergeSortedLists(const vector<vector<int>>& lists) {
    using Item = tuple<int, int, int>;  // value, list index, position in that list
    priority_queue<Item, vector<Item>, greater<Item>> heap;
    for (int i = 0; i < (int)lists.size(); i++) {
        if (!lists[i].empty()) heap.push({lists[i][0], i, 0});
    }
    vector<int> merged;
    while (!heap.empty()) {
        auto [value, list, position] = heap.top();
        heap.pop();
        merged.push_back(value);
        if (position + 1 < (int)lists[list].size()) heap.push({lists[list][position + 1], list, position + 1});
    }
    return merged;
}
```

## Sorting and searching

### 27. Sorting and Custom Order

- **Covers:** Sorting, Sorting with custom order, Counting or bucket sort
- **When:** Order makes the rest easy, or the output needs an order that you define. Use counting sort when values are small.
- **Giveaway:** "arrange so that", "largest number", "sort by frequency", "only 3 colours", small value range.
- **Not if:** You need only the top few: a full sort does more work than needed, so use [card 24](#24-top-k-with-a-heap).
- **Cost:** O(n log n) time for comparison sort. O(n + range) time and O(range) space for counting sort.
- **Classics:** [Largest Number](https://leetcode.com/problems/largest-number/) (LeetCode 179, Medium); [Sort Colors](https://leetcode.com/problems/sort-colors/) (LeetCode 75, Medium); [Sort Characters By Frequency](https://leetcode.com/problems/sort-characters-by-frequency/) (LeetCode 451, Medium)
- **Mistake:** A comparator that returns true for equal items, such as `>=`. It must be a strict order, or `sort` can crash.
- **Chapter:** [Sorting With a Custom Order](../04-sorting-searching/05-custom-sorting.md), [Counting, Radix and Bucket Sort](../04-sorting-searching/04-non-comparison-sorts.md)

```cpp compile
// Custom order: a comes first if putting a first gives the larger number.
string largestNumber(const vector<int>& nums) {
    vector<string> parts;
    for (int value : nums) parts.push_back(to_string(value));
    sort(parts.begin(), parts.end(), [](const string& a, const string& b) {
        return a + b > b + a;
    });
    string result;
    for (const string& part : parts) result += part;
    return (!result.empty() && result[0] == '0') ? "0" : result;  // [0, 0] must give "0"
}
```

### 28. Merge Sort Counting

- **Covers:** Merge sort counting
- **When:** You must count pairs `i < j` where the left and right items obey a rule.
- **Giveaway:** "inversions", "count of smaller numbers after self", "reverse pairs".
- **Not if:** You also need to answer while items arrive one by one: use [card 90](#90-fenwick-tree).
- **Cost:** O(n log n) time, O(n) space, O(log n) stack.
- **Classics:** [Count of Smaller Numbers After Self](https://leetcode.com/problems/count-of-smaller-numbers-after-self/) (LeetCode 315, Hard); [Reverse Pairs](https://leetcode.com/problems/reverse-pairs/) (LeetCode 493, Hard); [Count of Range Sum](https://leetcode.com/problems/count-of-range-sum/) (LeetCode 327, Hard)
- **Mistake:** Using `int` for the count. There can be about n^2 / 2 pairs, so use `long long`.
- **Chapter:** [Merge Sort](../04-sorting-searching/02-merge-sort.md)

```cpp compile
// Count pairs i < j with nums[i] > nums[j] in nums[left .. right - 1]. Sorts that range too.
long long countInversions(vector<int>& nums, int left, int right) {
    if (right - left <= 1) return 0;
    int middle = left + (right - left) / 2;
    long long count = countInversions(nums, left, middle) + countInversions(nums, middle, right);
    vector<int> merged;
    int i = left, j = middle;
    while (i < middle || j < right) {
        if (j == right || (i < middle && nums[i] <= nums[j])) merged.push_back(nums[i++]);
        else { count += middle - i; merged.push_back(nums[j++]); }  // all left items from i on are larger
    }
    copy(merged.begin(), merged.end(), nums.begin() + left);
    return count;
}
```

### 29. Quickselect and the Median Rule

- **Covers:** Quickselect, Median minimizes distance
- **When:** You need the k-th item one time, with no full sort. Or all items must move to one point at the lowest total distance.
- **Giveaway:** "kth largest", "median", "minimum moves to make all equal, each move changes one by 1".
- **Not if:** New items keep arriving: quickselect needs all the data, so use [card 24](#24-top-k-with-a-heap) or [card 25](#25-two-heaps).
- **Cost:** O(n) time on average, O(n^2) in the worst case. O(1) extra space in place. This template copies the input, so O(n) here.
- **Classics:** [Kth Largest Element in an Array](https://leetcode.com/problems/kth-largest-element-in-an-array/) (LeetCode 215, Medium); [K Closest Points to Origin](https://leetcode.com/problems/k-closest-points-to-origin/) (LeetCode 973, Medium); [Minimum Moves to Equal Array Elements II](https://leetcode.com/problems/minimum-moves-to-equal-array-elements-ii/) (LeetCode 462, Medium)
- **Mistake:** Choosing the mean, not the median. The sum of `|x - a[i]|` is smallest at the median.
- **Chapter:** [Quick Sort and Quickselect](../04-sorting-searching/03-quick-sort-and-quickselect.md)

```cpp compile
// k-th smallest, k from 0. Needs: 0 <= k < nums.size().
int quickselect(vector<int> nums, int k) {
    int low = 0, high = (int)nums.size() - 1;
    while (true) {
        int pivot = nums[low + rand() % (high - low + 1)];  // random, to avoid bad inputs
        int less = low, scan = low, more = high;  // three parts: < pivot, == pivot, > pivot
        while (scan <= more) {
            if (nums[scan] < pivot) swap(nums[less++], nums[scan++]);
            else if (nums[scan] > pivot) swap(nums[scan], nums[more--]);
            else scan++;
        }
        if (k < less) high = less - 1;
        else if (k > more) low = more + 1;
        else return pivot;
    }
}
```

### 30. Binary Search on Index

- **Covers:** Binary search on index
- **When:** The data is sorted, or a yes or no test flips only once from left to right.
- **Giveaway:** "sorted", "O(log n)", "first or last position", "rotated", "peak".
- **Not if:** The array is unsorted and no test flips one time: halving tells you nothing, so use [card 1](#1-hash-map-lookup-count-group).
- **Cost:** O(log n) time, O(1) space.
- **Classics:** [Binary Search](https://leetcode.com/problems/binary-search/) (LeetCode 704, Easy); [Find First and Last Position of Element in Sorted Array](https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/) (LeetCode 34, Medium); [Search in Rotated Sorted Array](https://leetcode.com/problems/search-in-rotated-sorted-array/) (LeetCode 33, Medium)
- **Mistake:** An endless loop from `low = middle` with a middle that rounds down. Follow one template and keep its loop rule.
- **Chapter:** [Binary Search Basics](../04-sorting-searching/06-binary-search-basics.md)

```cpp compile
// First index with nums[index] >= target, or nums.size() if none. Needs: nums is sorted.
int firstAtLeast(const vector<int>& nums, int target) {
    int low = 0, high = (int)nums.size();  // the answer is always in [low, high]
    while (low < high) {
        int middle = low + (high - low) / 2;  // (low + high) / 2 could overflow
        if (nums[middle] >= target) high = middle;  // middle may be the answer, so keep it
        else low = middle + 1;
    }
    return low;
}
```

### 31. Binary Search on the Answer

- **Covers:** Binary search on answer, K-th by counting
- **When:** The answer is a number. Checking one candidate is easy. If a value works, every larger value works too (or every smaller one).
- **Giveaway:** "minimize the maximum", "maximize the minimum", "minimum speed", "minimum days", "kth smallest pair".
- **Not if:** A larger value can fail after a smaller one worked: the test does not flip one time, so you cannot throw away half.
- **Cost:** O(log(range) * check) time. O(1) extra space here.
- **Classics:** [Koko Eating Bananas](https://leetcode.com/problems/koko-eating-bananas/) (LeetCode 875, Medium); [Capacity To Ship Packages Within D Days](https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/) (LeetCode 1011, Medium); [Split Array Largest Sum](https://leetcode.com/problems/split-array-largest-sum/) (LeetCode 410, Hard)
- **Mistake:** A wrong search range. `low` must be a value that could work, and `high` a value that surely works.
- **Chapter:** [Binary Search on the Answer](../04-sorting-searching/07-binary-search-on-answer.md)

K-th by counting: to find the k-th smallest value, binary search on the value. Your check asks "how many items are at most x?". The answer is the smallest x with a count of at least k.

```cpp compile
// Smallest speed that finishes all piles in h hours. Needs: piles is not empty, all values >= 1, h >= piles.size().
int smallestSpeed(const vector<int>& piles, long long h) {
    auto feasible = [&](int speed) {
        long long hours = 0;
        for (int pile : piles) hours += (pile + (long long)speed - 1) / speed;  // round up
        return hours <= h;
    };
    int low = 1, high = *max_element(piles.begin(), piles.end());
    while (low < high) {
        int middle = low + (high - low) / 2;
        if (feasible(middle)) high = middle;
        else low = middle + 1;
    }
    return low;
}
```

### 32. Ternary Search

- **Covers:** Ternary search
- **When:** A function falls and then rises, with one lowest point, and you want that point.
- **Giveaway:** "minimum total cost" where the cost depends on one chosen value and has a V shape.
- **Not if:** The curve has flat parts away from the lowest point. Two equal values tell you nothing about the side of the minimum.
- **Cost:** O(log(range) * cost of f) time, O(1) space.
- **Classics:** [Minimum Cost to Make Array Equal](https://leetcode.com/problems/minimum-cost-to-make-array-equal/) (LeetCode 2448, Hard); [Peak Index in a Mountain Array](https://leetcode.com/problems/peak-index-in-a-mountain-array/) (LeetCode 852, Medium); [Best Position for a Service Centre](https://leetcode.com/problems/best-position-for-a-service-centre/) (LeetCode 1515, Hard)
- **Mistake:** Using it on integers when `f(x)` and `f(x + 1)` can be compared. Binary search on that test is simpler.
- **Chapter:** [Other Searching Algorithms](../04-sorting-searching/08-other-searches.md)

```cpp compile
// Smallest value of f on integers [low, high]. Needs: f strictly falls, then strictly rises.
long long ternaryMin(int low, int high, const function<long long(int)>& f) {
    while (high - low > 2) {
        int third = (high - low) / 3;
        int m1 = low + third, m2 = high - third;
        if (f(m1) < f(m2)) high = m2;  // the lowest point is left of m2
        else low = m1;                 // the lowest point is right of m1
    }
    long long best = f(low);
    for (int x = low + 1; x <= high; x++) best = min(best, f(x));
    return best;
}
```

### 33. Ordered Set

- **Covers:** Ordered set, Order statistics tree, Self-balancing tree
- **When:** Data keeps changing, and you need the nearest value, the smallest, or the rank.
- **Giveaway:** "closest value", "next booking", "contains nearby", "rank of x", "keep sorted while inserting".
- **Not if:** You need equal keys only: use [card 1](#1-hash-map-lookup-count-group). Data never changes: sort once and use [card 30](#30-binary-search-on-index).
- **Cost:** O(log n) for each operation, O(n) space.
- **Classics:** [My Calendar I](https://leetcode.com/problems/my-calendar-i/) (LeetCode 729, Medium); [Contains Duplicate III](https://leetcode.com/problems/contains-duplicate-iii/) (LeetCode 220, Hard); [Data Stream as Disjoint Intervals](https://leetcode.com/problems/data-stream-as-disjoint-intervals/) (LeetCode 352, Hard)
- **Mistake:** Calling `lower_bound(s.begin(), s.end(), x)` on a set. That walks one by one. Use the member `s.lower_bound(x)`.
- **Chapter:** [Ordered Set Patterns](../05-core-patterns/19-ordered-set-patterns.md), [Order Statistics and Policy-Based Trees](../12-advanced-data-structures/07-order-statistics-and-pbds.md), [AVL Trees](../07-trees/07-avl-tree.md)

`std::set` and `std::map` are ordered. They have no rank query, so "rank of x" needs an order statistics tree. A self-balancing tree is a search tree that keeps its height at O(log n).

```cpp compile
// My Calendar shape: is the new [start, end) free?
class Calendar {
public:
    bool book(int start, int end) {
        auto next = bookings.lower_bound(start);  // first booking that starts at or after start
        if (next != bookings.end() && next->first < end) return false;
        if (next != bookings.begin() && prev(next)->second > start) return false;
        bookings[start] = end;
        return true;
    }
private:
    map<int, int> bookings;  // start -> end
};
```

### 34. Offline Queries

- **Covers:** Offline query processing, Parallel binary search
- **When:** You get all queries first, and you may answer them in any order.
- **Giveaway:** "each query has a limit x", "only items at most x count", and all queries are in the input.
- **Not if:** Queries arrive one at a time and each answer changes the next: that is online, so use [card 89](#89-segment-tree) or [card 33](#33-ordered-set).
- **Cost:** O((n + q) log(n + q)) time for the sorts, O(n + q) space.
- **Classics:** [Minimum Interval to Include Each Query](https://leetcode.com/problems/minimum-interval-to-include-each-query/) (LeetCode 1851, Hard); [Most Beautiful Item for Each Query](https://leetcode.com/problems/most-beautiful-item-for-each-query/) (LeetCode 2070, Medium); [Maximum XOR With an Element From Array](https://leetcode.com/problems/maximum-xor-with-an-element-from-array/) (LeetCode 1707, Hard)
- **Mistake:** Returning answers in the sorted order. Keep each query's index, and write its answer there.
- **Chapter:** [Offline Query Processing](../05-core-patterns/20-offline-query-processing.md)

Parallel binary search does the same for many binary searches at once. Each round sorts the queries by their middle value and sweeps once.

```cpp compile
// Sort queries by limit, and add items as the limit grows. Each query: how many values are <= x?
vector<int> countAtMost(vector<int> nums, const vector<int>& queries) {
    sort(nums.begin(), nums.end());
    vector<int> order(queries.size());
    iota(order.begin(), order.end(), 0);
    sort(order.begin(), order.end(), [&](int a, int b) { return queries[a] < queries[b]; });
    vector<int> answer(queries.size());
    int added = 0;
    for (int q : order) {
        while (added < (int)nums.size() && nums[added] <= queries[q]) added++;
        answer[q] = added;  // q is the original index
    }
    return answer;
}
```

### 35. Transform the Input

- **Covers:** Reverse the process, Coordinate compression, Separate the variables, Removing absolute values, Manhattan rotation
- **When:** The problem is hard as stated, and a change of view makes it a known one.
- **Giveaway:** See the list below.
- **Not if:** A direct pattern fits. These tricks add steps, so try the simple cards first.
- **Cost:** Usually O(n) or O(n log n) time. The template is O(n) time, O(1) space.
- **Classics:** [Best Sightseeing Pair](https://leetcode.com/problems/best-sightseeing-pair/) (LeetCode 1014, Medium); [Bricks Falling When Hit](https://leetcode.com/problems/bricks-falling-when-hit/) (LeetCode 803, Hard); [Maximum of Absolute Value Expression](https://leetcode.com/problems/maximum-of-absolute-value-expression/) (LeetCode 1131, Medium)
- **Mistake:** Changing a sign or a rank and forgetting to undo it in the answer.
- **Chapter:** [Transform the Input](../05-core-patterns/21-transform-the-input.md). Manhattan rotation is in [Computational Geometry](../11-math-geometry-games/07-computational-geometry.md).

- **Reverse the process:** "items are removed one by one". Removing is hard, and adding is easy, so run time backward.
- **Coordinate compression:** values are huge but only their order matters. Replace each value with its rank.
- **Separate the variables:** an expression mixes `i` and `j`. Move all `i` terms to one side, and keep the best `i` part so far.
- **Removing absolute values:** `|a - b|` equals the max of `a - b` and `b - a`. Try each sign choice.
- **Manhattan rotation:** with `u = x + y` and `v = x - y`, the distance `|dx| + |dy|` equals `max(|du|, |dv|)`.

```cpp compile
// Separate the variables: maximize values[i] + i + values[j] - j with i < j. Needs: at least 2 items.
long long bestPairScore(const vector<int>& values) {
    long long bestLeft = values[0];  // best values[i] + i so far
    long long best = LLONG_MIN;
    for (int j = 1; j < (int)values.size(); j++) {
        best = max(best, bestLeft + values[j] - j);  // the i part and the j part no longer mix
        bestLeft = max(bestLeft, (long long)values[j] + j);
    }
    return best;
}
```

### 36. Interactive Problems

- **Covers:** Interactive problem, Candidate elimination
- **When:** You do not see the data. You may only ask a judge, and the number of questions is limited.
- **Giveaway:** "you may call this function", "guess", "at most 3n queries", "celebrity".
- **Not if:** You can read the input freely: use the normal pattern, because there is no question limit.
- **Cost:** O(n) questions here, O(1) space.
- **Classics:** [Find the Celebrity](https://leetcode.com/problems/find-the-celebrity/) (LeetCode 277, Medium, Premium); [Guess Number Higher or Lower](https://leetcode.com/problems/guess-number-higher-or-lower/) (LeetCode 374, Easy); [Find in Mountain Array](https://leetcode.com/problems/find-in-mountain-array/) (LeetCode 1095, Hard)
- **Mistake:** Trusting the last candidate. Elimination leaves one possible answer, so you must still verify it.
- **Chapter:** [Interactive Problems](../05-core-patterns/23-interactive-problems.md)

```cpp compile
// Celebrity shape: each question rules out exactly one person. Returns -1 if there is none.
int findCelebrity(int n, const function<bool(int, int)>& knows) {
    int candidate = 0;
    for (int person = 1; person < n; person++) {
        if (knows(candidate, person)) candidate = person;
    }
    for (int person = 0; person < n; person++) {
        if (person == candidate) continue;
        if (knows(candidate, person) || !knows(person, candidate)) return -1;
    }
    return candidate;
}
```

### 37. Bit Manipulation

- **Covers:** Bit manipulation, Subarray bitwise states, Bitset speed-up
- **When:** Each number acts as a small set of flags, or pairs cancel out under XOR.
- **Giveaway:** "single number", "XOR", "power of two", "bitwise OR of subarrays", "without using extra memory".
- **Not if:** You use a mask for a set of up to 20 items and need the best subset: use [card 73](#73-bitmask-dp).
- **Cost:** O(n) time, O(1) space for the templates. The subarray OR list takes O(n * bits) time.
- **Classics:** [Single Number](https://leetcode.com/problems/single-number/) (LeetCode 136, Easy); [Counting Bits](https://leetcode.com/problems/counting-bits/) (LeetCode 338, Easy); [Bitwise ORs of Subarrays](https://leetcode.com/problems/bitwise-ors-of-subarrays/) (LeetCode 898, Medium)
- **Mistake:** Precedence. `x & 1 == 0` means `x & (1 == 0)`. Write `(x & 1) == 0`.
- **Chapter:** [Bit Manipulation](../05-core-patterns/17-bit-manipulation.md). Bitset speed-up is in [0/1 Knapsack](../09-dynamic-programming/04-zero-one-knapsack.md).

The OR of subarrays that end at index i takes at most about 30 different values, because a longer subarray can only turn more bits on. Keep that small list and extend it. A `bitset` packs many booleans into words, which can speed up a subset-sum table.

```cpp compile
// x ^ x = 0 and x ^ 0 = x, so pairs cancel and the single value stays.
int singleValue(const vector<int>& nums) {
    int result = 0;
    for (int value : nums) result ^= value;
    return result;
}

// n & (n - 1) clears the lowest set bit.
int countSetBits(unsigned int n) {
    int count = 0;
    for (; n != 0; n &= n - 1) count++;
    return count;
}
```

## Recursion, backtracking and greedy

### 38. Recursion

- **Covers:** Recursion
- **When:** A problem contains a smaller copy of itself.
- **Giveaway:** Trees, nested lists, "pow", "generate", and any answer that you can define by a smaller answer.
- **Not if:** The same subproblem repeats many times: plain recursion becomes exponential, so add memory, [card 65](#65-1d-dp).
- **Cost:** Number of calls times the work in each call. Space is the depth of the stack, O(log n) here.
- **Classics:** [Fibonacci Number](https://leetcode.com/problems/fibonacci-number/) (LeetCode 509, Easy); [Pow(x, n)](https://leetcode.com/problems/powx-n/) (LeetCode 50, Medium); [Merge Two Sorted Lists](https://leetcode.com/problems/merge-two-sorted-lists/) (LeetCode 21, Easy)
- **Mistake:** A missing or wrong base case, which causes a stack overflow.
- **Chapter:** [Recursion From Zero](../06-recursion-backtracking-greedy/01-recursion-from-zero.md)

```cpp compile
// Needs: exponent >= 0, and the result fits in long long.
long long power(long long base, int exponent) {
    if (exponent == 0) return 1;  // the base case stops the calls
    long long half = power(base, exponent / 2);  // one call, so the depth is O(log n)
    return (exponent % 2 == 0) ? half * half : half * half * base;
}
```

### 39. Backtracking: Subsets, Permutations, Combinations

- **Covers:** Backtracking: subsets, Backtracking: permutations, Backtracking: combinations
- **When:** You must list every choice set, and n is small.
- **Giveaway:** "all subsets", "all permutations", "all combinations that sum to", "generate all".
- **Not if:** You want only a count or the best value: there may be a DP that needs no listing, [card 65](#65-1d-dp).
- **Cost:** O(2^n * n) time for subsets and O(n! * n) for permutations. Space is O(n) for the stack and the current choice, plus the output.
- **Classics:** [Subsets](https://leetcode.com/problems/subsets/) (LeetCode 78, Medium); [Permutations](https://leetcode.com/problems/permutations/) (LeetCode 46, Medium); [Combination Sum](https://leetcode.com/problems/combination-sum/) (LeetCode 39, Medium)
- **Mistake:** Forgetting to undo the choice, or saving `chosen` by reference, so that all results end up the same.
- **Chapter:** [Backtracking: Subsets](../06-recursion-backtracking-greedy/02-backtracking-subsets.md), [Backtracking: Permutations and Combinations](../06-recursion-backtracking-greedy/03-backtracking-permutations-combinations.md)

Three small changes give the three kinds:

- **Subsets:** recurse with `i + 1`, as below.
- **Permutations:** loop from 0 each time, and keep a `used` array.
- **Combinations that may reuse an item:** recurse with `i`, not `i + 1`.

With duplicates in the input, sort first, and skip when `i > start && nums[i] == nums[i - 1]`. For permutations, skip when `i > 0 && nums[i] == nums[i - 1] && !used[i - 1]`.

```cpp compile
// Choose, explore, undo. Call with start = 0 and an empty chosen.
void buildSubsets(const vector<int>& nums, int start, vector<int>& chosen, vector<vector<int>>& out) {
    out.push_back(chosen);  // every node of the search is a subset
    for (int i = start; i < (int)nums.size(); i++) {
        chosen.push_back(nums[i]);
        buildSubsets(nums, i + 1, chosen, out);
        chosen.pop_back();  // undo, so that the next choice starts clean
    }
}
```

### 40. Backtracking: Constraint Search

- **Covers:** Backtracking: constraint search, Branch and bound
- **When:** You place items one by one under rules, and most branches die early.
- **Giveaway:** "no two attack", "fill the grid", "does the word exist", small n.
- **Not if:** The rules allow a local choice that is always safe: use [card 42](#42-greedy), which never needs to undo.
- **Cost:** Exponential in the worst case. Pruning cuts it, but the bound depends on the input. Space is O(depth).
- **Classics:** [N-Queens](https://leetcode.com/problems/n-queens/) (LeetCode 51, Hard); [Sudoku Solver](https://leetcode.com/problems/sudoku-solver/) (LeetCode 37, Hard); [Word Search](https://leetcode.com/problems/word-search/) (LeetCode 79, Medium)
- **Mistake:** Checking the rules only at the end. Prune at each step, or the search is far too slow.
- **Chapter:** [Backtracking: Constraint Search](../06-recursion-backtracking-greedy/04-backtracking-constraint-search.md)

Branch and bound adds one more prune: stop a branch when its best possible result cannot beat the best answer so far.

```cpp compile
// Count N-Queens placements. diag1 and diag2 each need 2n - 1 entries.
int placeQueens(int row, int n, vector<bool>& column, vector<bool>& diag1, vector<bool>& diag2) {
    if (row == n) return 1;
    int count = 0;
    for (int c = 0; c < n; c++) {
        if (column[c] || diag1[row + c] || diag2[row - c + n - 1]) continue;  // prune this branch
        column[c] = diag1[row + c] = diag2[row - c + n - 1] = true;
        count += placeQueens(row + 1, n, column, diag1, diag2);
        column[c] = diag1[row + c] = diag2[row - c + n - 1] = false;
    }
    return count;
}
```

### 41. Divide and Conquer

- **Covers:** Divide and conquer
- **When:** You can split the input, solve the parts alone, and join the results in less work than starting again.
- **Giveaway:** "sort", "merge", "every character appears at least k times" (split at a bad character), "balanced build".
- **Not if:** The parts overlap, so the same part is solved many times: use [card 65](#65-1d-dp).
- **Cost:** `T(n) = 2T(n/2) + O(n)` gives O(n log n) time. Merging uses O(n) space here, plus O(log n) stack.
- **Classics:** [Sort an Array](https://leetcode.com/problems/sort-an-array/) (LeetCode 912, Medium); [Longest Substring with At Least K Repeating Characters](https://leetcode.com/problems/longest-substring-with-at-least-k-repeating-characters/) (LeetCode 395, Medium); [Construct Quad Tree](https://leetcode.com/problems/construct-quad-tree/) (LeetCode 427, Medium)
- **Mistake:** Unequal splits, which turn the depth from O(log n) into O(n).
- **Chapter:** [Divide and Conquer](../06-recursion-backtracking-greedy/05-divide-and-conquer.md)

```cpp compile
// Sorts nums[left .. right - 1].
void mergeSortRange(vector<int>& nums, int left, int right) {
    if (right - left <= 1) return;
    int middle = left + (right - left) / 2;
    mergeSortRange(nums, left, middle);
    mergeSortRange(nums, middle, right);
    inplace_merge(nums.begin() + left, nums.begin() + middle, nums.begin() + right);
}
```

### 42. Greedy

- **Covers:** Greedy, Greedy reach extension, Regret greedy
- **When:** One local choice is always safe, and you can never regret it.
- **Giveaway:** "maximum number of", "minimum number of jumps", "as far as possible", and sorting by end time or by ratio.
- **Not if:** You can build a small counterexample. Coins `{1, 3, 4}` with amount 6: greedy takes 4 + 1 + 1, but 3 + 3 is better. Use [card 67](#67-knapsack).
- **Cost:** Usually O(n log n) for the sort and O(n) for the pass. The template is O(n) time, O(1) space.
- **Classics:** [Jump Game](https://leetcode.com/problems/jump-game/) (LeetCode 55, Medium); [Jump Game II](https://leetcode.com/problems/jump-game-ii/) (LeetCode 45, Medium); [Minimum Number of Refueling Stops](https://leetcode.com/problems/minimum-number-of-refueling-stops/) (LeetCode 871, Hard)
- **Mistake:** Trusting a greedy idea with no proof. Try to break it with small cases. A proof usually shows that swapping in your choice never hurts.
- **Chapter:** [Greedy Foundations](../06-recursion-backtracking-greedy/06-greedy-foundations.md), [Classic Greedy Algorithms](../06-recursion-backtracking-greedy/07-greedy-classics.md)

Regret greedy: take the item now and keep it in a heap. If a limit breaks later, drop the worst item taken so far.

```cpp compile
// Greedy reach: fewest jumps to the last index. Needs: the end is reachable.
int fewestJumps(const vector<int>& nums) {
    int jumps = 0, currentEnd = 0, farthest = 0;
    for (int i = 0; i + 1 < (int)nums.size(); i++) {
        farthest = max(farthest, i + nums[i]);  // the best reach from this layer
        if (i == currentEnd) {  // you must jump now, so use the best reach seen
            jumps++;
            currentEnd = farthest;
        }
    }
    return jumps;
}
```

### 43. Meet in the Middle

- **Covers:** Meet in the middle
- **When:** n is about 40. 2^40 choices is too many, but 2^20 is fine.
- **Giveaway:** "subset" with n up to 40, "closest subset sum", very large values, which rule out a sum DP.
- **Not if:** The sums are small: a knapsack table is simpler, [card 67](#67-knapsack).
- **Cost:** O(2^(n/2) * n) time, O(2^(n/2)) space.
- **Classics:** [Closest Subsequence Sum](https://leetcode.com/problems/closest-subsequence-sum/) (LeetCode 1755, Hard); [Partition Array Into Two Arrays to Minimize Sum Difference](https://leetcode.com/problems/partition-array-into-two-arrays-to-minimize-sum-difference/) (LeetCode 2035, Hard); [Split Array With Same Average](https://leetcode.com/problems/split-array-with-same-average/) (LeetCode 805, Hard)
- **Mistake:** Using `int` for the sums, or searching the unsorted half.
- **Chapter:** [Meet in the Middle](../06-recursion-backtracking-greedy/08-meet-in-the-middle.md)

```cpp compile
vector<long long> subsetSums(const vector<int>& nums, int first, int last) {
    vector<long long> sums = {0};
    for (int i = first; i < last; i++) {
        int size = (int)sums.size();
        for (int j = 0; j < size; j++) sums.push_back(sums[j] + nums[i]);
    }
    return sums;
}

bool subsetSumExists(const vector<int>& nums, long long target) {
    int n = (int)nums.size();
    vector<long long> left = subsetSums(nums, 0, n / 2), right = subsetSums(nums, n / 2, n);
    sort(right.begin(), right.end());
    for (long long sum : left) if (binary_search(right.begin(), right.end(), target - sum)) return true;
    return false;
}
```

### 44. NP-Hard Problems and Approximation

- **Covers:** NP-hard reduction, Approximation algorithm
- **When:** The problem looks like a known hard one, such as travelling salesman or graph coloring, and n is too large for exact search.
- **Giveaway:** "shortest route through all", "smallest set that covers", and large n with no special structure.
- **Not if:** n is small: exact search works, so use [card 73](#73-bitmask-dp). Or the input has a special shape, such as a tree.
- **Cost:** Polynomial for the approximation. The template is O(V + E) time and O(V) space.
- **Classics:** [Smallest Sufficient Team](https://leetcode.com/problems/smallest-sufficient-team/) (LeetCode 1125, Hard); [Shortest Path Visiting All Nodes](https://leetcode.com/problems/shortest-path-visiting-all-nodes/) (LeetCode 847, Hard); [Find the Shortest Superstring](https://leetcode.com/problems/find-the-shortest-superstring/) (LeetCode 943, Hard)
- **Mistake:** Searching for an exact fast solution that likely does not exist. Tell the interviewer the problem is NP-hard, then discuss limits.
- **Chapter:** [NP-Hard Problems and Approximation](../06-recursion-backtracking-greedy/09-np-hard-and-approximation.md)

```cpp compile
// Vertex cover at most 2 times the best: take both ends of any uncovered edge.
vector<int> approxVertexCover(int n, const vector<pair<int, int>>& edges) {
    vector<bool> covered(n, false);
    vector<int> cover;
    for (auto [u, v] : edges) {
        if (covered[u] || covered[v]) continue;
        covered[u] = covered[v] = true;  // any cover must hold u or v, so we take at most 2 per edge
        cover.push_back(u);
        cover.push_back(v);
    }
    return cover;
}
```

## Trees

### 45. Tree DFS

- **Covers:** Tree DFS
- **When:** The answer at a node comes from the answers of its children.
- **Giveaway:** "depth", "diameter", "path sum", "balanced", "same tree".
- **Not if:** The problem talks about levels, or the nearest node by steps: use [card 46](#46-tree-bfs).
- **Cost:** O(n) time, O(h) stack space, where h is the height.
- **Classics:** [Maximum Depth of Binary Tree](https://leetcode.com/problems/maximum-depth-of-binary-tree/) (LeetCode 104, Easy); [Diameter of Binary Tree](https://leetcode.com/problems/diameter-of-binary-tree/) (LeetCode 543, Easy); [Binary Tree Maximum Path Sum](https://leetcode.com/problems/binary-tree-maximum-path-sum/) (LeetCode 124, Hard)
- **Mistake:** Mixing up what you return with what you record. Return what the parent can use (one branch). Record what bends at this node (both branches).
- **Chapter:** [Tree DFS Problems](../07-trees/03-tree-dfs-problems.md), [Tree Traversals](../07-trees/02-tree-traversals.md)

```cpp compile
struct TreeNode { int val; TreeNode* left; TreeNode* right; };

// Diameter shape. Returns the height, and records the longest path in best.
int heightAndBest(TreeNode* node, int& best) {
    if (node == nullptr) return 0;
    int leftHeight = heightAndBest(node->left, best);
    int rightHeight = heightAndBest(node->right, best);
    best = max(best, leftHeight + rightHeight);  // the longest path that bends at this node
    return 1 + max(leftHeight, rightHeight);
}
```

### 46. Tree BFS

- **Covers:** Tree BFS
- **When:** You work level by level.
- **Giveaway:** "level order", "right side view", "zigzag", "minimum depth", "average of each level".
- **Not if:** The answer needs facts from whole subtrees: use [card 45](#45-tree-dfs).
- **Cost:** O(n) time, O(w) space, where w is the widest level.
- **Classics:** [Binary Tree Level Order Traversal](https://leetcode.com/problems/binary-tree-level-order-traversal/) (LeetCode 102, Medium); [Binary Tree Right Side View](https://leetcode.com/problems/binary-tree-right-side-view/) (LeetCode 199, Medium); [Binary Tree Zigzag Level Order Traversal](https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/) (LeetCode 103, Medium)
- **Mistake:** Using `queue.size()` in the loop condition. It changes as you push, so freeze it first.
- **Chapter:** [Tree BFS Problems](../07-trees/04-tree-bfs-problems.md)

```cpp compile
struct TreeNode { int val; TreeNode* left; TreeNode* right; };

vector<vector<int>> levelOrder(TreeNode* root) {
    vector<vector<int>> levels;
    queue<TreeNode*> pending;
    if (root != nullptr) pending.push(root);
    while (!pending.empty()) {
        int width = (int)pending.size();  // only this level is in the queue now
        levels.emplace_back();
        for (int i = 0; i < width; i++) {
            TreeNode* node = pending.front();
            pending.pop();
            levels.back().push_back(node->val);
            if (node->left != nullptr) pending.push(node->left);
            if (node->right != nullptr) pending.push(node->right);
        }
    }
    return levels;
}
```

### 47. Tree Construction

- **Covers:** Tree construction
- **When:** You build a tree from traversals, a sorted array, or a string.
- **Giveaway:** "construct from preorder and inorder", "serialize", "convert sorted array".
- **Not if:** The tree already exists and you only read it: use [card 45](#45-tree-dfs).
- **Cost:** O(n) time on average with the hash map, O(n) space.
- **Classics:** [Construct Binary Tree from Preorder and Inorder Traversal](https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/) (LeetCode 105, Medium); [Serialize and Deserialize Binary Tree](https://leetcode.com/problems/serialize-and-deserialize-binary-tree/) (LeetCode 297, Hard); [Convert Sorted Array to Binary Search Tree](https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/) (LeetCode 108, Easy)
- **Mistake:** Searching the inorder array each time, which is O(n^2). Store the positions in a map first.
- **Chapter:** [Tree Construction and Serialization](../07-trees/05-tree-construction-and-serialization.md)

```cpp compile
struct TreeNode { int val; TreeNode* left; TreeNode* right; };

// Preorder gives the roots, and inorder splits left from right. Needs: unique values.
// position maps a value to its index in inorder. Call with next = 0, low = 0, high = n - 1.
TreeNode* buildTree(const vector<int>& preorder, unordered_map<int, int>& position, int& next, int low, int high) {
    if (low > high) return nullptr;
    int value = preorder[next++];
    TreeNode* node = new TreeNode{value, nullptr, nullptr};
    node->left = buildTree(preorder, position, next, low, position[value] - 1);  // left first, as in preorder
    node->right = buildTree(preorder, position, next, position[value] + 1, high);
    return node;
}
```

### 48. BST Property

- **Covers:** BST property
- **When:** The tree is a binary search tree: all of the left subtree is smaller and all of the right subtree is larger.
- **Giveaway:** "BST", "validate", "kth smallest in a BST", "inorder is sorted".
- **Not if:** It is a plain binary tree: the left and right values give no order, so use [card 45](#45-tree-dfs).
- **Cost:** O(n) time to check the whole tree, O(h) for one search. O(h) stack space.
- **Classics:** [Validate Binary Search Tree](https://leetcode.com/problems/validate-binary-search-tree/) (LeetCode 98, Medium); [Kth Smallest Element in a BST](https://leetcode.com/problems/kth-smallest-element-in-a-bst/) (LeetCode 230, Medium); [Lowest Common Ancestor of a Binary Search Tree](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/) (LeetCode 235, Medium)
- **Mistake:** Comparing a node only with its children. A value must fit the limits from all ancestors.
- **Chapter:** [Binary Search Trees From Zero](../07-trees/06-bst-from-zero.md)

```cpp compile
struct TreeNode { int val; TreeNode* left; TreeNode* right; };

// Call with LLONG_MIN and LLONG_MAX. Limits are long long, so that INT_MAX values work.
bool fitsRange(TreeNode* node, long long low, long long high) {
    if (node == nullptr) return true;
    if (node->val <= low || node->val >= high) return false;
    return fitsRange(node->left, low, node->val) && fitsRange(node->right, node->val, high);
}
```

### 49. Trie

- **Covers:** Trie
- **When:** You search many words by prefix. A trie is a tree where each edge is a letter.
- **Giveaway:** "starts with", "autocomplete", "word search with many words", "maximum XOR of two numbers" (a trie of bits).
- **Not if:** You only check whole words: a hash set is simpler, [card 1](#1-hash-map-lookup-count-group).
- **Cost:** O(L) for each operation, where L is the word length. O(total letters * 26) space here.
- **Classics:** [Implement Trie (Prefix Tree)](https://leetcode.com/problems/implement-trie-prefix-tree/) (LeetCode 208, Medium); [Word Search II](https://leetcode.com/problems/word-search-ii/) (LeetCode 212, Hard); [Maximum XOR of Two Numbers in an Array](https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/) (LeetCode 421, Medium)
- **Mistake:** Treating a prefix as a word. Mark the end of each word.
- **Chapter:** [Trie (Prefix Tree)](../07-trees/13-trie.md)

```cpp compile
struct Trie {
    struct Node { array<int, 26> child{}; bool isWord = false; };  // 0 means no child
    vector<Node> nodes = vector<Node>(1);
    void insert(const string& word) {  // needs: only letters a to z
        int at = 0;
        for (char c : word) {
            if (nodes[at].child[c - 'a'] == 0) {
                nodes[at].child[c - 'a'] = (int)nodes.size();
                nodes.emplace_back();
            }
            at = nodes[at].child[c - 'a'];
        }
        nodes[at].isWord = true;
    }
    bool hasPrefix(const string& prefix) const {
        int at = 0;
        for (char c : prefix) if ((at = nodes[at].child[c - 'a']) == 0) return false;
        return true;
    }
};
```

### 50. LCA, Binary Lifting and Euler Tour

- **Covers:** Lowest common ancestor, Binary lifting, Euler tour
- **When:** You ask about pairs of nodes, or about ancestors, many times on a fixed tree.
- **Giveaway:** "lowest common ancestor", "kth ancestor", "queries on paths", "queries on a subtree".
- **Not if:** You have only one query: one DFS is enough, [card 45](#45-tree-dfs).
- **Cost:** O(n log n) to build, O(log n) for each query, O(n log n) space.
- **Classics:** [Lowest Common Ancestor of a Binary Tree](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/) (LeetCode 236, Medium); [Kth Ancestor of a Tree Node](https://leetcode.com/problems/kth-ancestor-of-a-tree-node/) (LeetCode 1483, Hard); [Minimum Edge Weight Equilibrium Queries in a Tree](https://leetcode.com/problems/minimum-edge-weight-equilibrium-queries-in-a-tree/) (LeetCode 2846, Hard)
- **Mistake:** Not bringing the two nodes to the same depth before you jump together.
- **Chapter:** [LCA and Binary Lifting](../12-advanced-data-structures/09-lca-and-binary-lifting.md)

An Euler tour records the time that DFS enters and leaves each node. A subtree then becomes one contiguous range, so range tools such as [card 90](#90-fenwick-tree) work on it.

```cpp compile
// Needs: parent[root] == root, and fewer than 2^17 nodes. up[j][v] is 2^j steps above v.
struct BinaryLifting {
    vector<int> depth;
    vector<vector<int>> up;
    BinaryLifting(const vector<int>& parent, const vector<int>& nodeDepth) : depth(nodeDepth), up(17, parent) {
        for (int j = 1; j < 17; j++)
            for (int v = 0; v < (int)parent.size(); v++) up[j][v] = up[j - 1][up[j - 1][v]];
    }
    int lca(int a, int b) const {
        if (depth[a] < depth[b]) swap(a, b);
        for (int j = 16; j >= 0; j--) if (depth[a] - (1 << j) >= depth[b]) a = up[j][a];
        if (a == b) return a;
        for (int j = 16; j >= 0; j--) if (up[j][a] != up[j][b]) { a = up[j][a]; b = up[j][b]; }
        return up[0][a];
    }
};
```

### 51. Tree Decompositions

- **Covers:** Heavy-light decomposition, Centroid decomposition, Small-to-large merging
- **When:** You have many hard queries on tree paths, or you merge sets that sit on a tree.
- **Giveaway:** "update and query values on the path from u to v", "count paths with a property", "for each subtree, count distinct".
- **Not if:** Queries are only about ancestors: [card 50](#50-lca-binary-lifting-and-euler-tour) is much shorter.
- **Cost:** Small-to-large: O(n log n) inserts in total. Heavy-light: O(log^2 n) for each path query. Centroid: O(n log n) to build.
- **Classics:** [Shortest Path in a Weighted Tree](https://leetcode.com/problems/shortest-path-in-a-weighted-tree/) (LeetCode 3515, Hard); [Smallest Missing Genetic Value in Each Subtree](https://leetcode.com/problems/smallest-missing-genetic-value-in-each-subtree/) (LeetCode 2003, Hard); [Count Valid Paths in a Tree](https://leetcode.com/problems/count-valid-paths-in-a-tree/) (LeetCode 2867, Hard)
- **Mistake:** Merging the larger set into the smaller one, which turns O(n log n) into O(n^2).
- **Chapter:** [Heavy-Light and Centroid Decomposition](../12-advanced-data-structures/10-heavy-light-and-centroid-decomposition.md)

These are expert topics, and interviews rarely need them. Simpler methods also solve the three classics. Know when these tools apply.

```cpp compile
// Small-to-large: an item moves only when its set at least doubles, so at most log n times.
void pourInto(set<int>& target, set<int>& other) {
    if (target.size() < other.size()) swap(target, other);
    for (int value : other) target.insert(value);
    other.clear();
}
```

## Graphs

### 52. Graph Traversal and Grids

- **Covers:** Graph DFS, Graph BFS, Grid DFS or BFS
- **When:** You must visit everything that is connected. A grid is a graph: each cell links to its neighbours.
- **Giveaway:** "number of islands", "connected", "flood fill", "clone the graph", "regions".
- **Not if:** You need the fewest steps: DFS finds a path, not the shortest, so use [card 53](#53-bfs-shortest-path).
- **Cost:** O(V + E) time, or O(rows * cols) on a grid. O(V) space, including the stack.
- **Classics:** [Number of Islands](https://leetcode.com/problems/number-of-islands/) (LeetCode 200, Medium); [Clone Graph](https://leetcode.com/problems/clone-graph/) (LeetCode 133, Medium); [Number of Provinces](https://leetcode.com/problems/number-of-provinces/) (LeetCode 547, Medium)
- **Mistake:** Marking a cell after the calls, not before. The calls then come back to it with no end.
- **Chapter:** [BFS and DFS](../08-graphs/02-bfs-and-dfs.md), [Grid Graphs](../08-graphs/03-grid-graphs.md)

```cpp compile
void sink(vector<vector<char>>& grid, int r, int c) {
    if (r < 0 || c < 0 || r >= (int)grid.size() || c >= (int)grid[0].size() || grid[r][c] != '1') return;
    grid[r][c] = '0';  // mark first, so that no cell is visited twice
    sink(grid, r + 1, c);
    sink(grid, r - 1, c);
    sink(grid, r, c + 1);
    sink(grid, r, c - 1);
}

int countIslands(vector<vector<char>> grid) {
    int islands = 0;
    for (int r = 0; r < (int)grid.size(); r++) {
        for (int c = 0; c < (int)grid[r].size(); c++) {
            if (grid[r][c] == '1') { islands++; sink(grid, r, c); }
        }
    }
    return islands;
}
```

### 53. BFS Shortest Path

- **Covers:** BFS shortest path, Multi-source BFS, State-space BFS, Bidirectional BFS
- **When:** Every step costs the same, and you want the fewest steps.
- **Giveaway:** "minimum number of moves", "word ladder", "rotting oranges" (many starts), "open the lock" (each state is a node).
- **Not if:** Edges have different weights: BFS order is no longer distance order, so use [card 58](#58-dijkstra).
- **Cost:** O(V + E) time, O(V) space.
- **Classics:** [Word Ladder](https://leetcode.com/problems/word-ladder/) (LeetCode 127, Hard); [Rotting Oranges](https://leetcode.com/problems/rotting-oranges/) (LeetCode 994, Medium); [Open the Lock](https://leetcode.com/problems/open-the-lock/) (LeetCode 752, Medium)
- **Mistake:** Marking a node when you pop it. Mark it when you push, or it enters the queue many times.
- **Chapter:** [BFS Shortest Path Patterns](../08-graphs/04-bfs-shortest-path-patterns.md)

Four forms, one shape. Multi-source: start with all sources in the queue. State-space: a node is a whole state, such as `(position, keys held)`. Bidirectional: grow from both ends and stop when they touch.

```cpp compile
// Fewest steps from the nearest source. -1 means not reachable.
vector<int> bfsDistances(const vector<vector<int>>& graph, const vector<int>& sources) {
    vector<int> dist(graph.size(), -1);
    queue<int> pending;
    for (int s : sources) { dist[s] = 0; pending.push(s); }
    while (!pending.empty()) {
        int node = pending.front();
        pending.pop();
        for (int next : graph[node]) {
            if (dist[next] != -1) continue;
            dist[next] = dist[node] + 1;  // the first visit is the shortest
            pending.push(next);
        }
    }
    return dist;
}
```

### 54. 0-1 BFS

- **Covers:** 0-1 BFS
- **When:** Every edge costs either 0 or 1.
- **Giveaway:** "minimum number of obstacles to remove", "fewest signs to change", and free moves mixed with paid moves.
- **Not if:** Weights can be 2 or more: the deque loses its order, so use [card 58](#58-dijkstra).
- **Cost:** O(V + E) time, O(V) space.
- **Classics:** [Minimum Cost to Make at Least One Valid Path in a Grid](https://leetcode.com/problems/minimum-cost-to-make-at-least-one-valid-path-in-a-grid/) (LeetCode 1368, Hard); [Minimum Obstacle Removal to Reach Corner](https://leetcode.com/problems/minimum-obstacle-removal-to-reach-corner/) (LeetCode 2290, Hard); [Minimum Sideway Jumps](https://leetcode.com/problems/minimum-sideway-jumps/) (LeetCode 1824, Medium)
- **Mistake:** Pushing a 0 edge to the back. It belongs at the front, because its distance does not grow.
- **Chapter:** [BFS Shortest Path Patterns](../08-graphs/04-bfs-shortest-path-patterns.md)

```cpp compile
// graph[u] holds {v, weight}, and each weight is 0 or 1.
vector<int> zeroOneBfs(const vector<vector<pair<int, int>>>& graph, int source) {
    vector<int> dist(graph.size(), INT_MAX);
    deque<int> pending = {source};
    dist[source] = 0;
    while (!pending.empty()) {
        int node = pending.front();
        pending.pop_front();
        for (auto [next, weight] : graph[node]) {
            if (dist[node] + weight >= dist[next]) continue;
            dist[next] = dist[node] + weight;
            if (weight == 0) pending.push_front(next);
            else pending.push_back(next);
        }
    }
    return dist;
}
```

### 55. Topological Sort

- **Covers:** Topological sort, DP on a DAG
- **When:** Tasks depend on other tasks in a directed graph. A DAG is a directed graph with no cycles.
- **Giveaway:** "prerequisites", "order of courses", "build order", "alien dictionary", "longest path in a DAG".
- **Not if:** The graph is undirected: dependency has no direction there, so use [card 56](#56-union-find).
- **Cost:** O(V + E) time, O(V) space.
- **Classics:** [Course Schedule](https://leetcode.com/problems/course-schedule/) (LeetCode 207, Medium); [Course Schedule II](https://leetcode.com/problems/course-schedule-ii/) (LeetCode 210, Medium); [Alien Dictionary](https://leetcode.com/problems/alien-dictionary/) (LeetCode 269, Hard, Premium)
- **Mistake:** Not checking that all nodes came out. If some did not, there is a cycle.
- **Chapter:** [Topological Sort](../08-graphs/06-topological-sort.md)

DP on a DAG: process nodes in topological order, so that each node's inputs are ready before you use them.

```cpp compile
// Kahn's algorithm. Returns an order, or an empty list if there is a cycle.
vector<int> topoOrder(const vector<vector<int>>& graph) {
    int n = (int)graph.size();
    vector<int> indegree(n, 0), order;
    for (const auto& edges : graph) for (int next : edges) indegree[next]++;
    queue<int> ready;
    for (int v = 0; v < n; v++) if (indegree[v] == 0) ready.push(v);
    while (!ready.empty()) {
        int node = ready.front();
        ready.pop();
        order.push_back(node);
        for (int next : graph[node]) if (--indegree[next] == 0) ready.push(next);
    }
    if ((int)order.size() != n) order.clear();  // nodes in a cycle never reach indegree 0
    return order;
}
```

### 56. Union-Find

- **Covers:** Union-Find
- **When:** Groups only merge, and you ask whether two items share a group.
- **Giveaway:** "connected components", "redundant connection", "accounts merge", edges that arrive one by one.
- **Not if:** You need the path itself, or groups split later: union-find keeps no paths and cannot undo, so use [card 52](#52-graph-traversal-and-grids).
- **Cost:** Nearly O(1) amortized for each operation (amortized means averaged over many operations). O(n) space.
- **Classics:** [Number of Provinces](https://leetcode.com/problems/number-of-provinces/) (LeetCode 547, Medium); [Redundant Connection](https://leetcode.com/problems/redundant-connection/) (LeetCode 684, Medium); [Accounts Merge](https://leetcode.com/problems/accounts-merge/) (LeetCode 721, Medium)
- **Mistake:** Comparing `parent[a]` with `parent[b]`. Compare `find(a)` with `find(b)`.
- **Chapter:** [Union-Find (Disjoint Set Union)](../08-graphs/07-union-find.md)

```cpp compile
struct UnionFind {
    vector<int> parent, groupSize;
    explicit UnionFind(int n) : parent(n), groupSize(n, 1) { iota(parent.begin(), parent.end(), 0); }
    int find(int x) {
        while (parent[x] != x) { parent[x] = parent[parent[x]]; x = parent[x]; }  // keeps trees flat
        return x;
    }
    bool unite(int a, int b) {
        a = find(a);
        b = find(b);
        if (a == b) return false;  // already joined: this edge closes a cycle
        if (groupSize[a] < groupSize[b]) swap(a, b);
        parent[b] = a;
        groupSize[a] += groupSize[b];
        return true;
    }
};
```

### 57. Cycle Detection, Bipartite Check and Coloring

- **Covers:** Cycle detection, Bipartite check, Graph coloring
- **When:** You must find a cycle, or split nodes into two groups with no edge inside a group.
- **Giveaway:** "is a cycle present", "two teams", "possible bipartition", "no two neighbours share a color".
- **Not if:** You must color with 3 or more colors: that is NP-hard in general, so see [card 44](#44-np-hard-problems-and-approximation). The exception: with more colors than the largest degree, a greedy pass always works (LeetCode 1042).
- **Cost:** O(V + E) time, O(V) space.
- **Classics:** [Is Graph Bipartite](https://leetcode.com/problems/is-graph-bipartite/) (LeetCode 785, Medium); [Find Eventual Safe States](https://leetcode.com/problems/find-eventual-safe-states/) (LeetCode 802, Medium); [Flower Planting With No Adjacent](https://leetcode.com/problems/flower-planting-with-no-adjacent/) (LeetCode 1042, Medium)
- **Mistake:** Using the undirected cycle check on a directed graph. Directed graphs need three states: not seen, on the current path, finished.
- **Chapter:** [Cycle Detection and Bipartite Graphs](../08-graphs/05-cycle-detection-and-bipartite.md)

```cpp compile
bool paint(const vector<vector<int>>& graph, int node, int shade, vector<int>& color) {
    color[node] = shade;
    for (int next : graph[node]) {
        if (color[next] == shade) return false;  // an edge inside one group: an odd cycle
        if (color[next] == -1 && !paint(graph, next, 1 - shade, color)) return false;
    }
    return true;
}

bool isBipartiteGraph(const vector<vector<int>>& graph) {
    vector<int> color(graph.size(), -1);
    for (int v = 0; v < (int)graph.size(); v++) {  // the graph may have several parts
        if (color[v] == -1 && !paint(graph, v, 0, color)) return false;
    }
    return true;
}
```

### 58. Dijkstra

- **Covers:** Dijkstra, A* search, Virtual node, Layered graph
- **When:** You need the shortest path with weights that are not negative.
- **Giveaway:** "cheapest", "network delay", "minimum effort", "path with limited coupons" (a layered graph).
- **Not if:** A weight is negative: a finished node could still improve, so use [card 59](#59-bellman-ford-and-floyd-warshall). All weights are equal: use [card 53](#53-bfs-shortest-path).
- **Cost:** O((V + E) log V) time, O(V + E) space.
- **Classics:** [Network Delay Time](https://leetcode.com/problems/network-delay-time/) (LeetCode 743, Medium); [Path With Minimum Effort](https://leetcode.com/problems/path-with-minimum-effort/) (LeetCode 1631, Medium); [Swim in Rising Water](https://leetcode.com/problems/swim-in-rising-water/) (LeetCode 778, Hard)
- **Mistake:** Leaving out the old-entry check, which makes the code slow.
- **Chapter:** [Dijkstra's Algorithm](../08-graphs/08-dijkstra.md), [Graph Modeling Tricks](../08-graphs/18-graph-modeling-tricks.md)

Three tricks build on this card. **A* search** orders the heap by distance plus an estimate of what remains. The estimate must never be too high, or the result may not be the shortest. A **virtual node** is one extra node linked to a group, so that you do not need an edge for each pair. A **layered graph** copies each node once per state, such as coupons used.

```cpp compile
// graph[u] holds {v, weight}. Needs: no negative weights.
vector<long long> dijkstra(const vector<vector<pair<int, int>>>& graph, int source) {
    vector<long long> dist(graph.size(), LLONG_MAX);
    using Item = pair<long long, int>;
    priority_queue<Item, vector<Item>, greater<Item>> heap;
    dist[source] = 0;
    heap.push({0, source});
    while (!heap.empty()) {
        auto [d, node] = heap.top();
        heap.pop();
        if (d > dist[node]) continue;  // old entry: a shorter path was found after this push
        for (auto [next, weight] : graph[node]) {
            if (d + weight < dist[next]) { dist[next] = d + weight; heap.push({dist[next], next}); }
        }
    }
    return dist;
}
```

### 59. Bellman-Ford and Floyd-Warshall

- **Covers:** Bellman-Ford, Floyd-Warshall, Difference constraints
- **When:** Weights can be negative, the number of edges is limited, or you need all pairs with small n.
- **Giveaway:** "at most k stops", "negative cycle", "n up to 400, distances between all pairs", "x - y <= c".
- **Not if:** Weights are not negative, you have one source, and the edge count has no limit: [card 58](#58-dijkstra) is faster.
- **Cost:** Bellman-Ford: O(VE) time, O(V) space. Floyd-Warshall: O(V^3) time, O(V^2) space.
- **Classics:** [Cheapest Flights Within K Stops](https://leetcode.com/problems/cheapest-flights-within-k-stops/) (LeetCode 787, Medium); [Find the City With the Smallest Number of Neighbors at a Threshold Distance](https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/) (LeetCode 1334, Medium); [Evaluate Division](https://leetcode.com/problems/evaluate-division/) (LeetCode 399, Medium)
- **Mistake:** Updating `dist` in place when the edge count is limited. One round could then use many edges, so read from a copy.
- **Chapter:** [Bellman-Ford and SPFA](../08-graphs/09-bellman-ford-and-spfa.md), [Floyd-Warshall and All-Pairs Paths](../08-graphs/10-floyd-warshall-and-all-pairs.md)

Floyd-Warshall tries each node as a middle stop, and `via` must be the outer loop:

```cpp compile
void floydWarshall(vector<vector<long long>>& dist) {
    int n = (int)dist.size();
    for (int via = 0; via < n; via++)
        for (int i = 0; i < n; i++)
            for (int j = 0; j < n; j++) dist[i][j] = min(dist[i][j], dist[i][via] + dist[via][j]);
}
```

Start with `dist[i][i] = 0`, and use a large value below `LLONG_MAX / 2` for "no edge". Difference constraints: each rule `x[b] - x[a] <= c` becomes an edge from a to b with weight c. A negative cycle means no solution exists.

```cpp compile
// Cheapest path with at most k edges (k stops means k + 1 edges). Each edge is {u, v, w}. LLONG_MAX means not reachable.
long long cheapestWithinEdges(int n, const vector<array<int, 3>>& edges, int source, int target, int k) {
    vector<long long> dist(n, LLONG_MAX);
    dist[source] = 0;
    for (int round = 0; round < k; round++) {
        vector<long long> next = dist;  // a copy, so that each round adds at most one edge
        for (const auto& e : edges) {
            if (dist[e[0]] != LLONG_MAX) next[e[1]] = min(next[e[1]], dist[e[0]] + e[2]);
        }
        dist = next;
    }
    return dist[target];
}
```

### 60. Minimum Spanning Tree

- **Covers:** Minimum spanning tree
- **When:** You must connect all nodes at the lowest total cost.
- **Giveaway:** "connect all cities", "minimum cost to connect", "cheapest network".
- **Not if:** You want the shortest route between two nodes: a spanning tree does not give that, so use [card 58](#58-dijkstra).
- **Cost:** O(E log E) time, O(V + E) space.
- **Classics:** [Min Cost to Connect All Points](https://leetcode.com/problems/min-cost-to-connect-all-points/) (LeetCode 1584, Medium); [Connecting Cities With Minimum Cost](https://leetcode.com/problems/connecting-cities-with-minimum-cost/) (LeetCode 1135, Medium); [Find Critical and Pseudo-Critical Edges in Minimum Spanning Tree](https://leetcode.com/problems/find-critical-and-pseudo-critical-edges-in-minimum-spanning-tree/) (LeetCode 1489, Hard)
- **Mistake:** Forgetting to check that the graph is connected. Count the edges taken: you need `n - 1`.
- **Chapter:** [Minimum Spanning Trees](../08-graphs/11-minimum-spanning-tree.md)

```cpp compile
// Kruskal. Each edge is {weight, u, v}. Needs: the graph is connected.
long long kruskal(int n, vector<array<int, 3>> edges) {
    vector<int> parent(n);
    iota(parent.begin(), parent.end(), 0);
    function<int(int)> find = [&](int x) { return parent[x] == x ? x : parent[x] = find(parent[x]); };
    sort(edges.begin(), edges.end());  // the cheapest edge across any split is always safe
    long long total = 0;
    for (const auto& edge : edges) {
        int a = find(edge[1]), b = find(edge[2]);
        if (a == b) continue;  // this edge would close a cycle
        parent[a] = b;
        total += edge[0];
    }
    return total;
}
```

### 61. Strongly Connected Components, 2-SAT and Functional Graphs

- **Covers:** Strongly connected components, 2-SAT, Functional graph
- **When:** In a directed graph, you must find groups where each node reaches each other node. Or each node has exactly one outgoing edge (a functional graph).
- **Giveaway:** "mutually reachable", "each person points to one other", "longest cycle", "two choices, with either-or rules" (2-SAT).
- **Not if:** The graph is undirected: plain components are enough, so use [card 52](#52-graph-traversal-and-grids).
- **Cost:** O(V + E) time, O(V) space.
- **Classics:** [Longest Cycle in a Graph](https://leetcode.com/problems/longest-cycle-in-a-graph/) (LeetCode 2360, Hard); [Maximum Employees to Be Invited to a Meeting](https://leetcode.com/problems/maximum-employees-to-be-invited-to-a-meeting/) (LeetCode 2127, Hard); [Count Visited Nodes in a Directed Graph](https://leetcode.com/problems/count-visited-nodes-in-a-directed-graph/) (LeetCode 2876, Hard)
- **Mistake:** Running the second pass on the original graph. It must use the reversed edges, or components leak into each other.
- **Chapter:** [Strongly Connected Components](../08-graphs/12-strongly-connected-components.md), [2-SAT](../08-graphs/17-two-sat.md)

A functional graph is a set of cycles with trees that flow into them, so one walk from each node finds all cycles. 2-SAT: the rule `a or b` becomes two edges, `not a -> b` and `not b -> a`. There is no solution if a variable and its opposite share a component.

```cpp compile
// Kosaraju. Returns the component id of each node.
vector<int> componentIds(const vector<vector<int>>& graph) {
    int n = (int)graph.size(), count = 0;
    vector<vector<int>> reversed(n);
    for (int v = 0; v < n; v++) for (int w : graph[v]) reversed[w].push_back(v);
    vector<int> finished, id(n, -1);
    vector<bool> seen(n, false);
    function<void(int)> firstPass = [&](int v) {
        seen[v] = true;
        for (int w : graph[v]) if (!seen[w]) firstPass(w);
        finished.push_back(v);  // a node finishes after all that it can reach
    };
    function<void(int)> secondPass = [&](int v) {
        id[v] = count;
        for (int w : reversed[v]) if (id[w] == -1) secondPass(w);
    };
    for (int v = 0; v < n; v++) if (!seen[v]) firstPass(v);
    for (int i = n - 1; i >= 0; i--) if (id[finished[i]] == -1) { secondPass(finished[i]); count++; }
    return id;
}
```

### 62. Bridges and Articulation Points

- **Covers:** Bridges and articulation points
- **When:** You must find an edge or a node whose removal splits the graph.
- **Giveaway:** "critical connections", "single point of failure".
- **Not if:** The graph is directed: this rule is for undirected graphs, so see [card 61](#61-strongly-connected-components-2-sat-and-functional-graphs).
- **Cost:** O(V + E) time, O(V) space.
- **Classics:** [Critical Connections in a Network](https://leetcode.com/problems/critical-connections-in-a-network/) (LeetCode 1192, Hard); [Minimum Number of Days to Disconnect Island](https://leetcode.com/problems/minimum-number-of-days-to-disconnect-island/) (LeetCode 1568, Hard); [Disconnect Path in a Binary Matrix by at Most One Flip](https://leetcode.com/problems/disconnect-path-in-a-binary-matrix-by-at-most-one-flip/) (LeetCode 2556, Medium)
- **Mistake:** Skipping the parent by node id when the graph has parallel edges. Skip by edge id in that case.
- **Chapter:** [Bridges and Articulation Points](../08-graphs/13-bridges-and-articulation-points.md)

```cpp compile
// Call with parent = -1 and timer = 0. Needs: no parallel edges. order and low start at 0.
void findBridges(const vector<vector<int>>& graph, int node, int parent, int& timer,
                 vector<int>& order, vector<int>& low, vector<pair<int, int>>& bridges) {
    order[node] = low[node] = ++timer;
    for (int next : graph[node]) {
        if (next == parent) continue;
        if (order[next] != 0) { low[node] = min(low[node], order[next]); continue; }
        findBridges(graph, next, node, timer, order, low, bridges);
        low[node] = min(low[node], low[next]);
        if (low[next] > order[node]) bridges.push_back({node, next});  // next cannot climb above node
    }
}
```

### 63. Euler Path

- **Covers:** Euler path
- **When:** You must use every edge exactly once.
- **Giveaway:** "use all the tickets", "reconstruct itinerary", "every combination once", "chain all pairs".
- **Not if:** You must visit every node once: that is a Hamiltonian path, which is NP-hard, so use [card 73](#73-bitmask-dp) for small n.
- **Cost:** O(E) time, or O(E log E) if you must sort the edges. O(V + E) space.
- **Classics:** [Reconstruct Itinerary](https://leetcode.com/problems/reconstruct-itinerary/) (LeetCode 332, Hard); [Cracking the Safe](https://leetcode.com/problems/cracking-the-safe/) (LeetCode 753, Hard); [Valid Arrangement of Pairs](https://leetcode.com/problems/valid-arrangement-of-pairs/) (LeetCode 2097, Hard)
- **Mistake:** Adding a node to the path before its edges are used. Add it after, then reverse the path.
- **Chapter:** [Euler and Hamiltonian Paths](../08-graphs/14-euler-and-hamiltonian-paths.md)

```cpp compile
// Hierholzer. Needs: a directed Euler path exists from this start. Reverse path at the end.
void useAllEdges(vector<vector<int>>& graph, int node, vector<int>& path) {
    while (!graph[node].empty()) {
        int next = graph[node].back();
        graph[node].pop_back();  // each edge is used once
        useAllEdges(graph, next, path);
    }
    path.push_back(node);  // added after its edges, so the path is built backward
}
```

### 64. Flow and Matching

- **Covers:** Network flow, Bipartite matching, Stable matching, Global min cut
- **When:** You assign items to items with limits, or you push as much as you can through a network.
- **Giveaway:** "assign workers to jobs", "maximum pairs", "each can take at most", "minimum edges to cut".
- **Not if:** The input is small enough for a mask: [card 73](#73-bitmask-dp) is simpler to write.
- **Cost:** Kuhn's matching: O(V * E) time, O(V) space.
- **Classics:** [Maximum Students Taking Exam](https://leetcode.com/problems/maximum-students-taking-exam/) (LeetCode 1349, Hard); [Maximum Number of Accepted Invitations](https://leetcode.com/problems/maximum-number-of-accepted-invitations/) (LeetCode 1820, Medium, Premium); [Campus Bikes II](https://leetcode.com/problems/campus-bikes-ii/) (LeetCode 1066, Medium)
- **Mistake:** Clearing `seen` too rarely. It must be fresh for each left node.
- **Chapter:** [Network Flow](../08-graphs/15-network-flow.md), [Bipartite Matching](../08-graphs/16-bipartite-matching.md), [Cuts, General Matching and Graph Theory](../08-graphs/19-cuts-and-general-matching.md)

To match, call `tryMatch` once for each left node, with a fresh `seen`. Max flow equals min cut. Stable matching means no two people prefer each other over their partners. The Gale-Shapley method finds one: one side proposes in order of preference, and the other side keeps its best offer so far. A global min cut has no fixed source and sink. The Stoer-Wagner method finds it.

```cpp compile
// Can this left node get a partner? partner[right] is the left node that holds right, or -1.
bool tryMatch(const vector<vector<int>>& graph, int left, vector<bool>& seen, vector<int>& partner) {
    for (int right : graph[left]) {
        if (seen[right]) continue;
        seen[right] = true;
        if (partner[right] == -1 || tryMatch(graph, partner[right], seen, partner)) {  // free, or its owner can move
            partner[right] = left;
            return true;
        }
    }
    return false;
}
```

## Dynamic programming

### 65. 1D DP

- **Covers:** 1D DP
- **When:** The answer at position i depends on a few earlier answers, and choices overlap.
- **Giveaway:** "number of ways", "minimum cost to reach", "can you", with one index that moves forward.
- **Not if:** One local choice is provably safe: [card 42](#42-greedy) needs no table. You must list all answers: use [card 39](#39-backtracking-subsets-permutations-combinations).
- **Cost:** O(n * choices) time. O(1) to O(n) space.
- **Classics:** [Climbing Stairs](https://leetcode.com/problems/climbing-stairs/) (LeetCode 70, Easy); [House Robber](https://leetcode.com/problems/house-robber/) (LeetCode 198, Medium); [Word Break](https://leetcode.com/problems/word-break/) (LeetCode 139, Medium)
- **Mistake:** Not saying what `dp[i]` means. Write it as a sentence before you write the code.
- **Chapter:** [1D Dynamic Programming](../09-dynamic-programming/02-one-dimensional-dp.md), [Dynamic Programming From Zero](../09-dynamic-programming/01-dp-from-zero.md)

```cpp compile
// Best total with no two chosen items next to each other. Works with an empty list.
long long maxNonAdjacent(const vector<int>& nums) {
    long long beforeLast = 0, last = 0;  // best totals up to two items ago, and one item ago
    for (int value : nums) {
        long long current = max(last, beforeLast + value);  // skip this item, or take it
        beforeLast = last;
        last = current;
    }
    return last;
}
```

### 66. Grid DP

- **Covers:** Grid DP
- **When:** You move on a grid in limited directions, so that no cell can be reached again.
- **Giveaway:** "only right or down", "number of unique paths", "minimum path sum", "largest square".
- **Not if:** You can move in all four directions: cells depend on each other in a loop, so use [card 53](#53-bfs-shortest-path) or [card 58](#58-dijkstra). The exception: a rule such as "values must rise" removes the loops, so memoized DP still works.
- **Cost:** O(rows * cols) time, O(cols) space with one row.
- **Classics:** [Unique Paths](https://leetcode.com/problems/unique-paths/) (LeetCode 62, Medium); [Minimum Path Sum](https://leetcode.com/problems/minimum-path-sum/) (LeetCode 64, Medium); [Maximal Square](https://leetcode.com/problems/maximal-square/) (LeetCode 221, Medium)
- **Mistake:** Forgetting the first row and first column, which have only one way in.
- **Chapter:** [Grid DP](../09-dynamic-programming/03-grid-dp.md)

```cpp compile
// Needs: the grid is not empty. Each cell has two parents, so one row of memory is enough.
long long minPathTotal(const vector<vector<int>>& grid) {
    int rows = (int)grid.size(), cols = (int)grid[0].size();
    const long long NO_PATH = LLONG_MAX / 2;
    vector<long long> best(cols, NO_PATH);  // best[c] still holds the row above, until it is updated
    best[0] = 0;
    for (int r = 0; r < rows; r++) {
        for (int c = 0; c < cols; c++) {
            long long fromLeft = (c > 0) ? best[c - 1] : NO_PATH;
            best[c] = min(best[c], fromLeft) + grid[r][c];
        }
    }
    return best[cols - 1];
}
```

### 67. Knapsack

- **Covers:** 0/1 knapsack, Unbounded knapsack
- **When:** You pick items under a capacity or to reach a target. Use 0/1 when each item can be used once. Use unbounded when it can be used many times.
- **Giveaway:** "subset with sum", "partition into equal parts", "coin change", "target sum".
- **Not if:** The target is huge and n is about 40: the table is too big, so use [card 43](#43-meet-in-the-middle).
- **Cost:** O(n * target) time, O(target) space.
- **Classics:** [Partition Equal Subset Sum](https://leetcode.com/problems/partition-equal-subset-sum/) (LeetCode 416, Medium); [Coin Change](https://leetcode.com/problems/coin-change/) (LeetCode 322, Medium); [Coin Change II](https://leetcode.com/problems/coin-change-ii/) (LeetCode 518, Medium)
- **Mistake:** The wrong loop direction. Downward means each item once. Upward means reuse.
- **Chapter:** [0/1 Knapsack](../09-dynamic-programming/04-zero-one-knapsack.md), [Unbounded Knapsack](../09-dynamic-programming/05-unbounded-knapsack.md)

For unbounded knapsack, walk the sums upward, so that an item can be used again. For fewest coins: `for (int sum = coin; sum <= amount; sum++) best[sum] = min(best[sum], best[sum - coin] + 1);`. Start with `best[0] = 0` and the rest at `amount + 1`, so that the `+ 1` cannot overflow.

To count ways, loop over items on the outside for combinations, and over sums on the outside for ordered sequences.

```cpp compile
// 0/1: can a subset reach target? Needs: positive values, target >= 0.
bool canReachSum(const vector<int>& nums, int target) {
    vector<bool> reachable(target + 1, false);
    reachable[0] = true;
    for (int value : nums) {
        for (int sum = target; sum >= value; sum--) {  // downward, so that this item is used once
            if (reachable[sum - value]) reachable[sum] = true;
        }
    }
    return reachable[target];
}
```

### 68. LIS DP

- **Covers:** LIS DP
- **When:** You want the longest chain of items in order, with gaps allowed.
- **Giveaway:** "longest increasing subsequence", "stack envelopes", "longest chain".
- **Not if:** The items must be next to each other: that is a simple scan, or [card 10](#10-variable-sliding-window).
- **Cost:** O(n log n) time, O(n) space for the length. Counting the sequences (LeetCode 673) usually uses the O(n^2) DP.
- **Classics:** [Longest Increasing Subsequence](https://leetcode.com/problems/longest-increasing-subsequence/) (LeetCode 300, Medium); [Russian Doll Envelopes](https://leetcode.com/problems/russian-doll-envelopes/) (LeetCode 354, Hard); [Number of Longest Increasing Subsequence](https://leetcode.com/problems/number-of-longest-increasing-subsequence/) (LeetCode 673, Medium)
- **Mistake:** Reading `tails` as the real subsequence. Only its length is right.
- **Chapter:** [Longest Increasing Subsequence](../09-dynamic-programming/06-longest-increasing-subsequence.md)

```cpp compile
// Length of the longest strictly increasing subsequence.
int longestIncreasing(const vector<int>& nums) {
    vector<int> tails;  // tails[k]: the smallest last value of any chain of length k + 1
    for (int value : nums) {
        auto spot = lower_bound(tails.begin(), tails.end(), value);  // equal values do not extend
        if (spot == tails.end()) tails.push_back(value);
        else *spot = value;
    }
    return (int)tails.size();
}
```

### 69. LCS DP

- **Covers:** LCS DP
- **When:** You compare two sequences, and gaps are allowed.
- **Giveaway:** "two strings", "longest common subsequence", "edit distance", "minimum deletions to make equal".
- **Not if:** The match must be contiguous: that is longest common substring, a different recurrence, or [card 78](#78-rolling-hash).
- **Cost:** O(n * m) time, O(n * m) space. Two rows are enough for the length alone.
- **Classics:** [Longest Common Subsequence](https://leetcode.com/problems/longest-common-subsequence/) (LeetCode 1143, Medium); [Edit Distance](https://leetcode.com/problems/edit-distance/) (LeetCode 72, Medium); [Delete Operation for Two Strings](https://leetcode.com/problems/delete-operation-for-two-strings/) (LeetCode 583, Medium)
- **Mistake:** Index errors. `dp[i][j]` covers the first i and first j characters, so compare `a[i - 1]` and `b[j - 1]`.
- **Chapter:** [LCS and Edit Distance](../09-dynamic-programming/07-lcs-and-edit-distance.md)

```cpp compile
int longestCommon(const string& a, const string& b) {
    int n = (int)a.size(), m = (int)b.size();
    vector<vector<int>> dp(n + 1, vector<int>(m + 1, 0));
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= m; j++) {
            if (a[i - 1] == b[j - 1]) dp[i][j] = dp[i - 1][j - 1] + 1;
            else dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);  // drop one last character
        }
    }
    return dp[n][m];
}
```

### 70. Palindrome DP and Interval DP

- **Covers:** Palindrome DP, Interval DP
- **When:** The state is a range `[l, r]`, and a big range is built from smaller ranges.
- **Giveaway:** "palindromic subsequence", "burst balloons", "merge stones", "cut a stick", "fewest cuts".
- **Not if:** You only need the longest palindromic substring: expanding from each center is O(n^2) time with O(1) space, and [card 79](#79-manacher) is O(n).
- **Cost:** O(n^3) time with a split point, O(n^2) with none. O(n^2) space.
- **Classics:** [Longest Palindromic Subsequence](https://leetcode.com/problems/longest-palindromic-subsequence/) (LeetCode 516, Medium); [Burst Balloons](https://leetcode.com/problems/burst-balloons/) (LeetCode 312, Hard); [Minimum Score Triangulation of Polygon](https://leetcode.com/problems/minimum-score-triangulation-of-polygon/) (LeetCode 1039, Medium)
- **Mistake:** Looping `l` upward. Smaller ranges must be ready first, so loop by range length, or loop `l` downward.
- **Chapter:** [Palindrome DP](../09-dynamic-programming/08-palindrome-dp.md), [Interval DP](../09-dynamic-programming/09-interval-dp.md)

Palindrome form: if `s[l] == s[r]`, then `dp[l][r] = dp[l + 1][r - 1] + 2`. Otherwise it is `max(dp[l + 1][r], dp[l][r - 1])`.

```cpp compile
// Burst Balloons. dp[l][r] is the best for the open range (l, r). k is the LAST one to burst.
long long maxBurstCoins(vector<int> nums) {
    nums.insert(nums.begin(), 1);
    nums.push_back(1);
    int n = (int)nums.size();
    vector<vector<long long>> dp(n, vector<long long>(n, 0));
    for (int length = 2; length < n; length++) {
        for (int l = 0; l + length < n; l++) {
            int r = l + length;
            for (int k = l + 1; k < r; k++) {
                dp[l][r] = max(dp[l][r], dp[l][k] + dp[k][r] + (long long)nums[l] * nums[k] * nums[r]);
            }
        }
    }
    return dp[0][n - 1];
}
```

### 71. State Machine DP

- **Covers:** State machine DP
- **When:** At each step, you are in one of a few modes, and rules say which mode can follow which.
- **Giveaway:** "cooldown", "at most k transactions", "transaction fee", "holding or not".
- **Not if:** You may trade with no limits: a plain sum of rises works, [card 42](#42-greedy).
- **Cost:** O(n * states) time, O(states) space.
- **Classics:** [Best Time to Buy and Sell Stock with Cooldown](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/) (LeetCode 309, Medium); [Best Time to Buy and Sell Stock with Transaction Fee](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/) (LeetCode 714, Medium); [Best Time to Buy and Sell Stock III](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/) (LeetCode 123, Hard)
- **Mistake:** Using a value that was already updated today. Copy the old value first.
- **Chapter:** [State Machine DP](../09-dynamic-programming/10-state-machine-dp.md)

```cpp compile
// Stock with cooldown. Each state is the best profit at the end of the day.
long long maxProfitCooldown(const vector<int>& prices) {
    long long hold = LLONG_MIN / 2, sold = 0, rest = 0;  // hold starts impossible: you own nothing yet
    for (int price : prices) {
        long long previousSold = sold;
        sold = hold + price;
        hold = max(hold, rest - price);  // buy only after a rest day
        rest = max(rest, previousSold);
    }
    return max(sold, rest);
}
```

### 72. Tree DP and Rerooting

- **Covers:** Tree DP, Rerooting DP
- **When:** Each node has a choice, and its best value depends on its children. Rerooting: you need the answer as if each node were the root.
- **Giveaway:** "cannot pick a parent and child", "cameras", "sum of distances from every node".
- **Not if:** One number from each child is enough and there are no choices: plain [card 45](#45-tree-dfs).
- **Cost:** O(n) time, O(h) stack space, plus O(n) arrays for rerooting.
- **Classics:** [House Robber III](https://leetcode.com/problems/house-robber-iii/) (LeetCode 337, Medium); [Binary Tree Cameras](https://leetcode.com/problems/binary-tree-cameras/) (LeetCode 968, Hard); [Sum of Distances in Tree](https://leetcode.com/problems/sum-of-distances-in-tree/) (LeetCode 834, Hard)
- **Mistake:** Rerooting by running a new DFS from each node, which is O(n^2). Move the root one edge at a time.
- **Chapter:** [Tree DP](../09-dynamic-programming/11-tree-dp.md)

Rerooting uses a formula along one edge. For sum of distances: `answer[child] = answer[parent] - size[child] + (n - size[child])`.

```cpp compile
struct TreeNode { int val; TreeNode* left; TreeNode* right; };

// House Robber III. Returns {best if this node is taken, best if it is skipped}.
pair<long long, long long> robTree(TreeNode* node) {
    if (node == nullptr) return {0, 0};
    auto [leftTake, leftSkip] = robTree(node->left);
    auto [rightTake, rightSkip] = robTree(node->right);
    long long take = node->val + leftSkip + rightSkip;
    long long skip = max(leftTake, leftSkip) + max(rightTake, rightSkip);
    return {take, skip};
}
```

### 73. Bitmask DP

- **Covers:** Bitmask DP, Sum over subsets, Broken profile DP
- **When:** n is at most about 20, and the state is the set of items already used. The set is stored as a mask: an integer whose bits mark the items.
- **Giveaway:** "visit all nodes", "assign n jobs", "n <= 16", "partition into k equal groups".
- **Not if:** n is above about 20: 2^n is too big, so use [card 43](#43-meet-in-the-middle) or find another structure.
- **Cost:** O(2^n * n^2) time, O(2^n * n) space for the template.
- **Classics:** [Shortest Path Visiting All Nodes](https://leetcode.com/problems/shortest-path-visiting-all-nodes/) (LeetCode 847, Hard); [Smallest Sufficient Team](https://leetcode.com/problems/smallest-sufficient-team/) (LeetCode 1125, Hard); [Partition to K Equal Sum Subsets](https://leetcode.com/problems/partition-to-k-equal-sum-subsets/) (LeetCode 698, Medium)
- **Mistake:** Testing a bit with no parentheses. `mask & (1 << i) == 0` means `mask & ((1 << i) == 0)`. Write `(mask & (1 << i)) == 0`.
- **Chapter:** [Bitmask DP](../09-dynamic-programming/12-bitmask-dp.md). Sum over subsets is in [DP Optimizations](../09-dynamic-programming/15-dp-optimizations.md).

Sum over subsets adds up a value over all subsets of each mask in O(2^n * n). Broken profile DP fills a grid cell by cell, and its mask holds the border cells.

```cpp compile
// Cheapest path from node 0 that visits all nodes. Needs: n >= 1. dp[mask][last]: the set seen, and where you stand.
long long shortestVisitAll(const vector<vector<int>>& dist) {
    int n = (int)dist.size();
    const long long INF = LLONG_MAX / 2;
    vector<vector<long long>> dp(1 << n, vector<long long>(n, INF));
    dp[1][0] = 0;
    for (int mask = 1; mask < (1 << n); mask++) {
        for (int last = 0; last < n; last++) {
            if (dp[mask][last] >= INF) continue;
            for (int next = 0; next < n; next++) {
                if ((mask >> next) & 1) continue;
                int grown = mask | (1 << next);
                dp[grown][next] = min(dp[grown][next], dp[mask][last] + dist[last][next]);
            }
        }
    }
    return *min_element(dp.back().begin(), dp.back().end());
}
```

### 74. Digit DP

- **Covers:** Digit DP, Automaton DP
- **When:** You count numbers up to a huge limit that obey a rule on their digits.
- **Giveaway:** "how many numbers from 1 to n", n up to 10^18, "digit sum", "no repeated digits".
- **Not if:** n is small enough to loop over: try [card 4](#4-enumeration-construction-and-invariants).
- **Cost:** O(digits * states * 10) time, O(digits * states) space.
- **Classics:** [Number of Digit One](https://leetcode.com/problems/number-of-digit-one/) (LeetCode 233, Hard); [Numbers At Most N Given Digit Set](https://leetcode.com/problems/numbers-at-most-n-given-digit-set/) (LeetCode 902, Hard); [Non-negative Integers without Consecutive Ones](https://leetcode.com/problems/non-negative-integers-without-consecutive-ones/) (LeetCode 600, Hard)
- **Mistake:** Saving results while `tight` is true. Tight states depend on the limit, so only free states can share.
- **Chapter:** [Digit DP](../09-dynamic-programming/13-digit-dp.md). Automaton DP is in [Finite Automata and Regex](../10-string-algorithms/08-finite-automata-and-regex.md).

In the template, `tight` means the digits so far equal the digits of the limit, so the next digit is capped. Automaton DP keeps a node of a pattern matcher in the state, to count strings that do or do not contain a pattern.

```cpp compile
long long walkDigits(const string& digits, int pos, int sum, bool tight, vector<vector<long long>>& memo) {
    if (sum < 0) return 0;
    if (pos == (int)digits.size()) return sum == 0;
    if (!tight && memo[pos][sum] != -1) return memo[pos][sum];
    int top = tight ? digits[pos] - '0' : 9;
    long long ways = 0;
    for (int d = 0; d <= top; d++) ways += walkDigits(digits, pos + 1, sum - d, tight && d == top, memo);
    if (!tight) memo[pos][sum] = ways;
    return ways;
}

// How many numbers in [0, limit] have this digit sum? Needs: limit >= 0, target >= 0.
long long countDigitSum(long long limit, int target) {
    string digits = to_string(limit);
    vector<vector<long long>> memo(digits.size(), vector<long long>(target + 1, -1));
    return walkDigits(digits, 0, target, true, memo);
}
```

### 75. Counting and Probability DP

- **Covers:** Counting DP, Probability DP
- **When:** You count outcomes, or find the chance of one, and each step has several branches.
- **Giveaway:** "number of ways, modulo 10^9 + 7", "probability that", "expected".
- **Not if:** A closed formula exists: use [card 83](#83-modular-arithmetic-combinatorics-and-inclusion-exclusion). It may be far shorter.
- **Cost:** O(steps * states * branches) time, O(states) space.
- **Classics:** [Number of Dice Rolls With Target Sum](https://leetcode.com/problems/number-of-dice-rolls-with-target-sum/) (LeetCode 1155, Medium); [Knight Probability in Chessboard](https://leetcode.com/problems/knight-probability-in-chessboard/) (LeetCode 688, Medium); [New 21 Game](https://leetcode.com/problems/new-21-game/) (LeetCode 837, Medium)
- **Mistake:** Forgetting the modulo after an add, which lets the value overflow.
- **Chapter:** [Counting and Probability DP](../09-dynamic-programming/14-counting-and-probability-dp.md)

For probability, keep the same shape: add `chance * p` instead of `ways`.

```cpp compile
// Ways to roll dice so that the faces sum to target, modulo 10^9 + 7.
int countRolls(int dice, int faces, int target) {
    const int MOD = 1'000'000'007;
    vector<long long> ways(target + 1, 0);
    ways[0] = 1;
    for (int d = 0; d < dice; d++) {
        vector<long long> next(target + 1, 0);  // a fresh row: every die must be used
        for (int sum = 0; sum <= target; sum++) {
            for (int face = 1; face <= faces && sum + face <= target; face++) {
                next[sum + face] = (next[sum + face] + ways[sum]) % MOD;
            }
        }
        ways = next;
    }
    return (int)ways[target];
}
```

### 76. DP Optimization

- **Covers:** DP optimization, Convex hull trick, Slope trick
- **When:** The DP is right but too slow, usually because each state scans many earlier states.
- **Giveaway:** `dp[i]` is the best over a range of earlier `dp[j]`, and n is about 10^5.
- **Not if:** The plain DP is fast enough. Do not add this risk with no need.
- **Cost:** The template is O(n) time, O(n) space, instead of O(n * k).
- **Classics:** [Jump Game VI](https://leetcode.com/problems/jump-game-vi/) (LeetCode 1696, Medium); [Constrained Subsequence Sum](https://leetcode.com/problems/constrained-subsequence-sum/) (LeetCode 1425, Hard); [Make Array Non-decreasing or Non-increasing](https://leetcode.com/problems/make-array-non-decreasing-or-non-increasing/) (LeetCode 2263, Hard, Premium)
- **Mistake:** Choosing a trick before you write the slow recurrence. Write it first, then see what repeats.
- **Chapter:** [DP Optimizations](../09-dynamic-programming/15-dp-optimizations.md)

The convex hull trick handles `dp[i] = min(dp[j] + a[j] * b[i])`, where each `j` acts as a line. The slope trick handles DP over a convex function with an absolute value in the cost.

```cpp compile
// Jump Game VI. dp[i] = nums[i] + max(dp[i - k .. i - 1]). Needs: nums is not empty, k >= 1.
long long bestJumpScore(const vector<int>& nums, int k) {
    int n = (int)nums.size();
    vector<long long> dp(n);
    deque<int> window = {0};  // indexes with falling dp values
    dp[0] = nums[0];
    for (int i = 1; i < n; i++) {
        while (window.front() < i - k) window.pop_front();
        dp[i] = nums[i] + dp[window.front()];
        while (!window.empty() && dp[window.back()] <= dp[i]) window.pop_back();
        window.push_back(i);
    }
    return dp[n - 1];
}
```

## String algorithms

### 77. KMP and Z-Algorithm

- **Covers:** KMP, Z-algorithm
- **When:** You search a text for a pattern in O(n), or you need prefixes that are also suffixes.
- **Giveaway:** "find the first occurrence", "longest prefix that is also a suffix", "shortest palindrome by adding in front".
- **Not if:** You search many patterns at once: use [card 80](#80-aho-corasick-and-suffix-structures). You compare substrings that are not prefixes: use [card 78](#78-rolling-hash).
- **Cost:** O(n + m) time, O(n + m) space.
- **Classics:** [Find the Index of the First Occurrence in a String](https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/) (LeetCode 28, Easy); [Shortest Palindrome](https://leetcode.com/problems/shortest-palindrome/) (LeetCode 214, Hard); [Longest Happy Prefix](https://leetcode.com/problems/longest-happy-prefix/) (LeetCode 1392, Hard)
- **Mistake:** Restarting from 0 after a mismatch. Fall back with `len = lps[len - 1]`.
- **Chapter:** [KMP String Matching](../10-string-algorithms/02-kmp.md), [Z-Algorithm](../10-string-algorithms/03-z-algorithm.md)

The Z-algorithm is close: `z[i]` is the length of the longest match between the string and its suffix at `i`.

```cpp compile
// lps[i]: the longest proper prefix of s[0 .. i] that is also its suffix.
vector<int> prefixTable(const string& s) {
    vector<int> lps(s.size(), 0);
    for (int i = 1, len = 0; i < (int)s.size(); i++) {
        while (len > 0 && s[i] != s[len]) len = lps[len - 1];
        if (s[i] == s[len]) len++;
        lps[i] = len;
    }
    return lps;
}

// First index of pattern in text, or -1. Needs: '#' is in neither string, pattern is not empty.
int firstMatch(const string& text, const string& pattern) {
    int m = (int)pattern.size();
    vector<int> lps = prefixTable(pattern + '#' + text);
    for (int i = m + 1; i < (int)lps.size(); i++) if (lps[i] == m) return i - 2 * m;
    return -1;
}
```

### 78. Rolling Hash

- **Covers:** Rolling hash
- **When:** You compare many substrings of the same length, fast. A rolling hash updates a substring's fingerprint in O(1) as the window moves.
- **Giveaway:** "repeated substring", "longest duplicate substring", "distinct substrings".
- **Not if:** One pattern in one text is the whole task: [card 77](#77-kmp-and-z-algorithm) has no false matches.
- **Cost:** O(n) time for one length, O(n) space.
- **Classics:** [Repeated DNA Sequences](https://leetcode.com/problems/repeated-dna-sequences/) (LeetCode 187, Medium); [Longest Duplicate Substring](https://leetcode.com/problems/longest-duplicate-substring/) (LeetCode 1044, Hard); [Distinct Echo Substrings](https://leetcode.com/problems/distinct-echo-substrings/) (LeetCode 1316, Hard)
- **Mistake:** Trusting a hash match. Two different strings can share a hash. Verify, or use two hashes.
- **Chapter:** [Rabin-Karp and Rolling Hash](../10-string-algorithms/04-rabin-karp-and-rolling-hash.md)

```cpp compile
// The hash of every substring of length len. Needs: 1 <= len <= s.size().
vector<unsigned long long> windowHashes(const string& s, int len) {
    const unsigned long long MOD = 1'000'000'007ULL, BASE = 131;
    unsigned long long hash = 0, highPower = 1;
    for (int i = 1; i < len; i++) highPower = highPower * BASE % MOD;
    vector<unsigned long long> hashes;
    for (int right = 0; right < (int)s.size(); right++) {
        if (right >= len) hash = (hash + MOD - (unsigned char)s[right - len] * highPower % MOD) % MOD;
        hash = (hash * BASE + (unsigned char)s[right]) % MOD;
        if (right >= len - 1) hashes.push_back(hash);
    }
    return hashes;
}
```

### 79. Manacher

- **Covers:** Manacher
- **When:** You need all palindromes around every center in O(n).
- **Giveaway:** "longest palindromic substring" with n too large for O(n^2), "count palindromic substrings".
- **Not if:** n is about 1000: expanding from each center is simpler and fast enough.
- **Cost:** O(n) time, O(n) space.
- **Classics:** [Longest Palindromic Substring](https://leetcode.com/problems/longest-palindromic-substring/) (LeetCode 5, Medium); [Palindromic Substrings](https://leetcode.com/problems/palindromic-substrings/) (LeetCode 647, Medium); [Maximum Product of the Length of Two Palindromic Substrings](https://leetcode.com/problems/maximum-product-of-the-length-of-two-palindromic-substrings/) (LeetCode 1960, Hard)
- **Mistake:** Forgetting the separators, which miss even-length palindromes.
- **Chapter:** [Palindromes and Manacher's Algorithm](../10-string-algorithms/01-palindromes-and-manacher.md)

```cpp compile
// radius[i] is also the length, in s, of the palindrome centered at t[i].
vector<int> palindromeRadii(const string& s) {
    string t = "#";
    for (char c : s) { t += c; t += '#'; }  // now every palindrome has odd length
    int n = (int)t.size(), center = 0, right = 0;
    vector<int> radius(n, 0);
    for (int i = 0; i < n; i++) {
        if (i < right) radius[i] = min(right - i, radius[2 * center - i]);  // reuse the mirror
        while (i - radius[i] - 1 >= 0 && i + radius[i] + 1 < n && t[i - radius[i] - 1] == t[i + radius[i] + 1]) radius[i]++;
        if (i + radius[i] > right) { center = i; right = i + radius[i]; }
    }
    return radius;
}
```

### 80. Aho-Corasick and Suffix Structures

- **Covers:** Aho-Corasick, Suffix array, Suffix automaton
- **When:** You search many patterns at once, or you ask many questions about all substrings of one text.
- **Giveaway:** "many dictionary words in a stream", "number of distinct substrings", "longest repeated substring".
- **Not if:** You have one pattern: use [card 77](#77-kmp-and-z-algorithm). Word prefixes only: use [card 49](#49-trie).
- **Cost:** Aho-Corasick: O(total length + matches) time. Suffix array below: O(n log^2 n) time, O(n) space.
- **Classics:** [Stream of Characters](https://leetcode.com/problems/stream-of-characters/) (LeetCode 1032, Hard); [Longest Duplicate Substring](https://leetcode.com/problems/longest-duplicate-substring/) (LeetCode 1044, Hard); [Number of Distinct Substrings in a String](https://leetcode.com/problems/number-of-distinct-substrings-in-a-string/) (LeetCode 1698, Medium, Premium)
- **Mistake:** Building by sorting full suffix strings, which costs O(n^2 log n).
- **Chapter:** [Aho-Corasick](../10-string-algorithms/05-aho-corasick.md), [Suffix Arrays and LCP](../10-string-algorithms/06-suffix-arrays-and-lcp.md), [Suffix Automaton and Suffix Tree](../10-string-algorithms/07-suffix-automaton-and-suffix-tree.md)

A suffix array lists the start of each suffix in sorted order. A suffix automaton is a small graph that holds all substrings of a text.

```cpp compile
// Each round sorts suffixes by their first 2 * length characters, using old ranks.
vector<int> suffixArray(const string& s) {
    int n = (int)s.size();
    if (n == 0) return {};
    vector<int> order(n), ranks(n), next(n, 0);
    for (int i = 0; i < n; i++) { order[i] = i; ranks[i] = (unsigned char)s[i]; }
    for (int length = 1; ; length *= 2) {
        auto key = [&](int i) { return make_pair(ranks[i], i + length < n ? ranks[i + length] : -1); };
        sort(order.begin(), order.end(), [&](int a, int b) { return key(a) < key(b); });
        next[order[0]] = 0;
        for (int i = 1; i < n; i++) next[order[i]] = next[order[i - 1]] + (key(order[i - 1]) < key(order[i]));
        ranks = next;
        if (ranks[order[n - 1]] == n - 1) return order;  // all ranks differ, so the order is final
    }
}
```

### 81. Finite Automaton and Data Compression

- **Covers:** Finite automaton, Data compression
- **When:** You check text against a set of rules with states, or you must store text in fewer bits.
- **Giveaway:** "valid number", "regular expression", "shortest encoding", "frequent letters get short codes".
- **Not if:** The format has nesting: a finite automaton has no memory for depth, so use [card 19](#19-stack-simulation-and-expression-parsing).
- **Cost:** Automaton: O(n) time, O(states) space. Huffman below: O(n log n) time, O(n) space.
- **Classics:** [Valid Number](https://leetcode.com/problems/valid-number/) (LeetCode 65, Hard); [Regular Expression Matching](https://leetcode.com/problems/regular-expression-matching/) (LeetCode 10, Hard); [String Compression](https://leetcode.com/problems/string-compression/) (LeetCode 443, Medium)
- **Mistake:** Leaving a state out of the table. List all states and all input types first.
- **Chapter:** [Finite Automata and Regex](../10-string-algorithms/08-finite-automata-and-regex.md), [Data Compression](../10-string-algorithms/09-data-compression.md)

```cpp compile
// Huffman: total bits needed. Needs: at least 2 symbols. Always merge the two rarest groups.
long long huffmanBits(const vector<int>& frequency) {
    priority_queue<long long, vector<long long>, greater<long long>> heap(frequency.begin(), frequency.end());
    long long totalBits = 0;
    while (heap.size() > 1) {
        long long first = heap.top();
        heap.pop();
        long long second = heap.top();
        heap.pop();
        totalBits += first + second;  // each symbol below this merge gets one more bit
        heap.push(first + second);
    }
    return totalBits;
}
```

## Math and geometry

### 82. Number Theory

- **Covers:** Number theory, Harmonic enumeration, Mobius inversion
- **When:** The problem is about primes, divisors, multiples or gcd.
- **Giveaway:** "count primes", "divisible", "coprime", "greatest common divisor of pairs".
- **Not if:** Values are large and only remainders matter: use [card 83](#83-modular-arithmetic-combinatorics-and-inclusion-exclusion).
- **Cost:** O(n log log n) time for the sieve, O(n) space.
- **Classics:** [Count Primes](https://leetcode.com/problems/count-primes/) (LeetCode 204, Medium); [Largest Component Size by Common Factor](https://leetcode.com/problems/largest-component-size-by-common-factor/) (LeetCode 952, Hard); [Number of Different Subsequences GCDs](https://leetcode.com/problems/number-of-different-subsequences-gcds/) (LeetCode 1819, Hard)
- **Mistake:** Starting the inner loop at `2 * p`. It works but wastes time. Start at `p * p`, and use `long long` so that it cannot overflow.
- **Chapter:** [Primes and the Sieve](../11-math-geometry-games/02-primes-and-sieve.md), [Number Basics](../11-math-geometry-games/01-number-basics.md), [GCD Counting and Mobius Inversion](../11-math-geometry-games/11-gcd-counting-and-mobius.md)

Harmonic enumeration loops over each `d` and over its multiples. The total is n/1 + n/2 + ... + n/n, which is O(n log n). Mobius inversion turns "gcd is exactly g" counts into "g divides all" counts.

```cpp compile
// isPrime[x] for all x from 0 to limit. Needs: limit >= 1.
vector<bool> primeSieve(int limit) {
    vector<bool> isPrime(limit + 1, true);
    isPrime[0] = isPrime[1] = false;
    for (long long p = 2; p * p <= limit; p++) {
        if (!isPrime[p]) continue;
        for (long long multiple = p * p; multiple <= limit; multiple += p) isPrime[multiple] = false;
    }
    return isPrime;
}
```

### 83. Modular Arithmetic, Combinatorics and Inclusion-Exclusion

- **Covers:** Modular arithmetic, Combinatorics, Inclusion-exclusion
- **When:** The count has a formula, and the answer is huge.
- **Giveaway:** "modulo 10^9 + 7", "choose k from n", "divisible by a or b".
- **Not if:** The steps depend on each other in a way that no formula fits: use [card 75](#75-counting-and-probability-dp).
- **Cost:** O(log e) for one power. O(k + log MOD) for one `choose`. O(1) space.
- **Classics:** [Count Good Numbers](https://leetcode.com/problems/count-good-numbers/) (LeetCode 1922, Medium); [Unique Paths](https://leetcode.com/problems/unique-paths/) (LeetCode 62, Medium); [Nth Magical Number](https://leetcode.com/problems/nth-magical-number/) (LeetCode 878, Hard)
- **Mistake:** Dividing under a modulo. Multiply by the inverse. With a prime modulus, the inverse of `a` is `a^(MOD - 2)`.
- **Chapter:** [Modular Arithmetic](../11-math-geometry-games/03-modular-arithmetic.md), [Combinatorics](../11-math-geometry-games/04-combinatorics.md)

Inclusion-exclusion: `|A or B| = |A| + |B| - |A and B|`.

```cpp compile
const long long MOD = 1'000'000'007;

long long modPow(long long base, long long exponent) {  // needs: exponent >= 0
    long long result = 1;
    base %= MOD;
    for (; exponent > 0; exponent >>= 1) {
        if (exponent & 1) result = result * base % MOD;
        base = base * base % MOD;
    }
    return result;
}

long long choose(int n, int k) {  // needs: n < MOD
    if (k < 0 || k > n) return 0;
    long long top = 1, bottom = 1;
    for (int i = 1; i <= k; i++) { top = top * (n - k + i) % MOD; bottom = bottom * i % MOD; }
    return top * modPow(bottom, MOD - 2) % MOD;
}
```

### 84. Matrix Exponentiation

- **Covers:** Matrix exponentiation
- **When:** A linear recurrence must run a huge number of steps.
- **Giveaway:** n up to 10^18, "nth Fibonacci", "number of strings of length n" with few letter rules.
- **Not if:** n is below about 10^7: a plain loop is simpler, [card 65](#65-1d-dp).
- **Cost:** O(k^3 log n) time for a k by k matrix. O(k^2) space.
- **Classics:** [Climbing Stairs](https://leetcode.com/problems/climbing-stairs/) (LeetCode 70, Easy); [Count Vowels Permutation](https://leetcode.com/problems/count-vowels-permutation/) (LeetCode 1220, Hard); [Student Attendance Record II](https://leetcode.com/problems/student-attendance-record-ii/) (LeetCode 552, Hard)
- **Mistake:** A wrong first matrix. Check it by hand for n = 1 and n = 2.
- **Chapter:** [Matrix Exponentiation](../11-math-geometry-games/05-matrix-exponentiation.md)

```cpp compile
using Matrix = vector<vector<long long>>;
const long long MOD = 1'000'000'007;

Matrix multiply(const Matrix& a, const Matrix& b) {
    int n = (int)a.size();
    Matrix c(n, vector<long long>(n, 0));
    for (int i = 0; i < n; i++)
        for (int k = 0; k < n; k++)
            for (int j = 0; j < n; j++) c[i][j] = (c[i][j] + a[i][k] * b[k][j]) % MOD;
    return c;
}

Matrix matrixPower(Matrix base, long long exponent) {
    Matrix result(base.size(), vector<long long>(base.size(), 0));
    for (int i = 0; i < (int)base.size(); i++) result[i][i] = 1;  // the identity matrix
    for (; exponent > 0; exponent >>= 1) {
        if (exponent & 1) result = multiply(result, base);
        base = multiply(base, base);
    }
    return result;
}
```

### 85. Randomized Algorithms

- **Covers:** Randomized algorithm
- **When:** You must choose fairly, or randomness protects you from bad inputs.
- **Giveaway:** "uniformly at random", "stream of unknown length", "shuffle", "pick with weight".
- **Not if:** You need the same result on each run: use a fixed rule.
- **Cost:** O(n) time and O(1) space for the reservoir template.
- **Classics:** [Shuffle an Array](https://leetcode.com/problems/shuffle-an-array/) (LeetCode 384, Medium); [Random Pick Index](https://leetcode.com/problems/random-pick-index/) (LeetCode 398, Medium); [Implement Rand10() Using Rand7()](https://leetcode.com/problems/implement-rand10-using-rand7/) (LeetCode 470, Medium)
- **Mistake:** A biased shuffle. Swap index i only with an index from i to n - 1.
- **Chapter:** [Randomized Algorithms](../11-math-geometry-games/06-randomized-algorithms.md)

```cpp compile
// Reservoir sampling: each item is chosen with the same chance. Needs: stream is not empty.
int pickRandom(const vector<int>& stream, mt19937& rng) {
    int chosen = 0;
    unsigned int seen = 0;
    for (int value : stream) {
        seen++;
        if (rng() % seen == 0) chosen = value;  // keep this item with chance 1 / seen
    }
    return chosen;
}
```

### 86. Geometry

- **Covers:** Geometry, Angular sweep
- **When:** The input is points, lines or polygons.
- **Giveaway:** "convex hull", "fence", "points on a line", "field of view" (an angular sweep).
- **Not if:** Distance is only used to rank points: compare squares, and use [card 24](#24-top-k-with-a-heap).
- **Cost:** O(n log n) time, O(n) space for the hull below.
- **Classics:** [Erect the Fence](https://leetcode.com/problems/erect-the-fence/) (LeetCode 587, Hard); [Max Points on a Line](https://leetcode.com/problems/max-points-on-a-line/) (LeetCode 149, Hard); [Maximum Number of Visible Points](https://leetcode.com/problems/maximum-number-of-visible-points/) (LeetCode 1610, Hard)
- **Mistake:** Using floating-point slopes. Compare with cross products on integers.
- **Chapter:** [Computational Geometry](../11-math-geometry-games/07-computational-geometry.md)

Angular sweep: sort points by angle around one center, then use a sliding window on the angles.

```cpp compile
using Point = pair<long long, long long>;

// > 0 means the path a -> b -> c turns left.
long long cross(const Point& a, const Point& b, const Point& c) {
    return (b.first - a.first) * (c.second - a.second) - (b.second - a.second) * (c.first - a.first);
}

// Convex hull, with points on an edge left out. LeetCode 587 keeps them, so use < 0 there and remove repeats.
vector<Point> convexHull(vector<Point> points) {
    sort(points.begin(), points.end());
    points.erase(unique(points.begin(), points.end()), points.end());
    int n = (int)points.size(), size = 0;
    if (n < 3) return points;
    vector<Point> hull(2 * n);
    for (int i = 0; i < n; hull[size++] = points[i++]) {  // lower side
        while (size >= 2 && cross(hull[size - 2], hull[size - 1], points[i]) <= 0) size--;
    }
    for (int i = n - 2, lower = size + 1; i >= 0; hull[size++] = points[i--]) {  // upper side
        while (size >= lower && cross(hull[size - 2], hull[size - 1], points[i]) <= 0) size--;
    }
    hull.resize(size - 1);  // the last point repeats the first
    return hull;
}
```

### 87. Game Theory

- **Covers:** Game theory, Retrograde game analysis
- **When:** Two players take turns, both play perfectly, and nobody has a hidden choice.
- **Giveaway:** "both play optimally", "can the first player win", "take stones".
- **Not if:** Luck or hidden information is part of the game: use [card 75](#75-counting-and-probability-dp).
- **Cost:** O(states * moves) time, O(states) space.
- **Classics:** [Nim Game](https://leetcode.com/problems/nim-game/) (LeetCode 292, Easy); [Can I Win](https://leetcode.com/problems/can-i-win/) (LeetCode 464, Medium); [Cat and Mouse](https://leetcode.com/problems/cat-and-mouse/) (LeetCode 913, Hard)
- **Mistake:** Reading it from one player's view only. A state wins if some move leads to a state that loses for the opponent.
- **Chapter:** [Game Theory](../11-math-geometry-games/08-game-theory.md)

Retrograde analysis handles games with loops, such as cat and mouse. Start from finished states and work backward. For independent piles, take the XOR of Grundy numbers (a number that sums up one pile, defined in the chapter).

```cpp compile
// Each turn takes 1 to maxTake stones. Whoever cannot move loses.
bool firstPlayerWins(int stones, int maxTake) {
    vector<bool> win(stones + 1, false);  // 0 stones: no move, so the player to move loses
    for (int s = 1; s <= stones; s++) {
        for (int take = 1; take <= maxTake && take <= s; take++) {
            if (!win[s - take]) win[s] = true;
        }
    }
    return win[stones];
}
```

### 88. Linear Algebra and FFT

- **Covers:** Gaussian elimination, XOR basis, FFT
- **When:** The problem hides a system of equations, a question about XOR of subsets, or a fast product of two polynomials.
- **Giveaway:** "maximum XOR of any subset", "flip lights, each switch changes several", "multiply huge numbers".
- **Not if:** XOR is on pairs, not subsets: use a bit trie, [card 49](#49-trie).
- **Cost:** XOR basis: O(n * bits) time, O(bits) space. Gaussian: O(n^3). FFT: O(n log n).
- **Classics:** [Multiply Strings](https://leetcode.com/problems/multiply-strings/) (LeetCode 43, Medium); [Minimum Number of Flips to Convert Binary Matrix to Zero Matrix](https://leetcode.com/problems/minimum-number-of-flips-to-convert-binary-matrix-to-zero-matrix/) (LeetCode 1284, Hard); [Maximum XOR of Subsequences](https://leetcode.com/problems/maximum-xor-of-subsequences/) (LeetCode 3681, Hard)
- **Mistake:** Applying the basis to a pair question. It answers questions about subsets of any size.
- **Chapter:** [Gaussian Elimination and XOR Basis](../11-math-geometry-games/09-gaussian-elimination-and-xor-basis.md), [FFT and NTT](../11-math-geometry-games/10-fft-and-ntt.md)

LeetCode 43 and 1284 have small limits, so the simple ways pass there: school multiplication, and BFS over masks. These tools are for larger inputs.

```cpp compile
class XorBasis {
public:
    void add(unsigned int value) {
        for (int bit = 31; bit >= 0 && value != 0; bit--) {
            if (((value >> bit) & 1) == 0) continue;
            if (basis[bit] == 0) { basis[bit] = value; return; }
            value ^= basis[bit];  // clear this bit, and keep reducing
        }
    }
    unsigned int maxSubsetXor() const {
        unsigned int best = 0;
        for (int bit = 31; bit >= 0; bit--) best = max(best, best ^ basis[bit]);
        return best;
    }
private:
    array<unsigned int, 32> basis{};
};
```

## Advanced data structures

### 89. Segment Tree

- **Covers:** Segment tree, Lazy segment tree
- **When:** You mix updates and range queries, and the query can be sum, min, max or gcd.
- **Giveaway:** "range sum with updates", "range minimum with updates", "assign to a range".
- **Not if:** No updates happen: [card 11](#11-prefix-sum) or [card 91](#91-sparse-table) is simpler. Only sums with point updates: [card 90](#90-fenwick-tree) is shorter.
- **Cost:** O(n) to build, O(log n) for each operation, O(n) space.
- **Classics:** [Range Sum Query - Mutable](https://leetcode.com/problems/range-sum-query-mutable/) (LeetCode 307, Medium); [Falling Squares](https://leetcode.com/problems/falling-squares/) (LeetCode 699, Hard); [Range Module](https://leetcode.com/problems/range-module/) (LeetCode 715, Hard)
- **Mistake:** Forgetting to push a pending update down before you go deeper in a lazy tree.
- **Chapter:** [Segment Tree](../12-advanced-data-structures/01-segment-tree.md), [Segment Tree With Lazy Propagation](../12-advanced-data-structures/02-segment-tree-lazy-propagation.md)

A lazy segment tree handles range updates. It stores the update at a node, and it passes the update to the children only when it must.

```cpp compile
// Point set, range sum on [left, right). Needs: n >= 1.
struct SegmentTree {
    int count;
    vector<long long> tree;
    explicit SegmentTree(int n) : count(n), tree(2 * n, 0) {}
    void set(int index, long long value) {
        index += count;
        tree[index] = value;
        for (index /= 2; index >= 1; index /= 2) tree[index] = tree[2 * index] + tree[2 * index + 1];
    }
    long long query(int left, int right) const {
        long long sum = 0;
        for (left += count, right += count; left < right; left /= 2, right /= 2) {
            if (left & 1) sum += tree[left++];
            if (right & 1) sum += tree[--right];
        }
        return sum;
    }
};
```

### 90. Fenwick Tree

- **Covers:** Fenwick tree
- **When:** You need point updates and prefix sums. Also, counting by value as items arrive.
- **Giveaway:** "count of smaller after self", "running rank", "sum with updates".
- **Not if:** You need min or max over any range: a Fenwick tree cannot subtract those, so use [card 89](#89-segment-tree).
- **Cost:** O(log n) for each operation, O(n) space.
- **Classics:** [Range Sum Query - Mutable](https://leetcode.com/problems/range-sum-query-mutable/) (LeetCode 307, Medium); [Count of Smaller Numbers After Self](https://leetcode.com/problems/count-of-smaller-numbers-after-self/) (LeetCode 315, Hard); [Create Sorted Array through Instructions](https://leetcode.com/problems/create-sorted-array-through-instructions/) (LeetCode 1649, Hard)
- **Mistake:** Index 0 in the loop. `i & -i` is 0 there, so the loop never ends. Use positions from 1.
- **Chapter:** [Fenwick Tree (Binary Indexed Tree)](../12-advanced-data-structures/03-fenwick-tree.md)

```cpp compile
class Fenwick {
public:
    explicit Fenwick(int n) : tree(n + 1, 0) {}
    void add(int index, long long delta) {  // index is 0-based
        for (int i = index + 1; i < (int)tree.size(); i += i & -i) tree[i] += delta;
    }
    long long prefix(int count) const {  // the sum of the first count items
        long long sum = 0;
        for (int i = count; i > 0; i -= i & -i) sum += tree[i];
        return sum;
    }
private:
    vector<long long> tree;
};
```

### 91. Sparse Table

- **Covers:** Sparse table
- **When:** The array never changes, and you ask for the range min or max many times.
- **Giveaway:** "range minimum query", no updates, many queries.
- **Not if:** The array changes: rebuilding costs O(n log n), so use [card 89](#89-segment-tree).
- **Cost:** O(n log n) to build, O(1) for each query, O(n log n) space.
- **Classics:** [Longest Continuous Subarray With Absolute Diff Less Than or Equal to Limit](https://leetcode.com/problems/longest-continuous-subarray-with-absolute-diff-less-than-or-equal-to-limit/) (LeetCode 1438, Medium); [Maximum Number of Robots Within Budget](https://leetcode.com/problems/maximum-number-of-robots-within-budget/) (LeetCode 2398, Hard); [Find a Value of a Mysterious Function Closest to Target](https://leetcode.com/problems/find-a-value-of-a-mysterious-function-closest-to-target/) (LeetCode 1521, Hard)
- **Mistake:** Using it for sums. Min works because two blocks may overlap. A sum would count the overlap twice.
- **Chapter:** [Sparse Table and Range Minimum Queries](../12-advanced-data-structures/04-sparse-table-and-rmq.md)

In LeetCode 1438 and 2398, the windows only slide, so [card 22](#22-monotonic-queue) is the usual answer. A sparse table with binary search also works.

```cpp compile
struct SparseTable {
    vector<vector<int>> table;
    explicit SparseTable(const vector<int>& nums) : table(1, nums) {
        int n = (int)nums.size();
        for (int j = 1; (1 << j) <= n; j++) {
            table.emplace_back(n - (1 << j) + 1);
            for (int i = 0; i + (1 << j) <= n; i++) table[j][i] = min(table[j - 1][i], table[j - 1][i + (1 << (j - 1))]);
        }
    }
    int minimum(int left, int right) const {  // both ends included, left <= right
        int j = 31 - __builtin_clz(right - left + 1);
        return min(table[j][left], table[j][right - (1 << j) + 1]);  // two blocks cover the range
    }
};
```

### 92. Sqrt Decomposition and Mo's Algorithm

- **Covers:** Sqrt decomposition, Mo's algorithm
- **When:** No simple tree fits the query. Split the array into blocks of size about sqrt(n). Mo's algorithm reorders offline queries, so that the two ends move little.
- **Giveaway:** "number of distinct values in a range", "mode of a range", n and q about 10^5.
- **Not if:** A segment tree can merge two parts of the answer: it is faster, so use [card 89](#89-segment-tree).
- **Cost:** O((n + q) * sqrt(n)) time with a block size of about sqrt(n). O(n + q) space.
- **Classics:** [Range Sum Query - Mutable](https://leetcode.com/problems/range-sum-query-mutable/) (LeetCode 307, Medium); [Online Majority Element In Subarray](https://leetcode.com/problems/online-majority-element-in-subarray/) (LeetCode 1157, Hard); [Create Sorted Array through Instructions](https://leetcode.com/problems/create-sorted-array-through-instructions/) (LeetCode 1649, Hard)
- **Mistake:** Using Mo's algorithm when queries must be answered online. It needs them all first.
- **Chapter:** [Sqrt Decomposition and Mo's Algorithm](../12-advanced-data-structures/05-sqrt-decomposition-and-mos-algorithm.md)

```cpp compile
// Mo's order. Then move two pointers from one query to the next, in this order.
vector<int> moOrder(const vector<pair<int, int>>& queries, int blockSize) {
    vector<int> order(queries.size());
    iota(order.begin(), order.end(), 0);
    sort(order.begin(), order.end(), [&](int a, int b) {
        int blockA = queries[a].first / blockSize, blockB = queries[b].first / blockSize;
        if (blockA != blockB) return blockA < blockB;
        return queries[a].second < queries[b].second;
    });
    return order;
}
```

### 93. Persistent Data Structures

- **Covers:** Persistent segment tree
- **When:** You must answer questions about older versions of the data.
- **Giveaway:** "get the value at snapshot s", "as of time t", "kth smallest in a range".
- **Not if:** You only need the current version: use [card 89](#89-segment-tree).
- **Cost:** Template: O(log s) for `get`, where s is the number of changes at that index. A persistent segment tree adds O(log n) nodes for each update.
- **Classics:** [Snapshot Array](https://leetcode.com/problems/snapshot-array/) (LeetCode 1146, Medium); [Time Based Key-Value Store](https://leetcode.com/problems/time-based-key-value-store/) (LeetCode 981, Medium); [Maximum XOR With an Element From Array](https://leetcode.com/problems/maximum-xor-with-an-element-from-array/) (LeetCode 1707, Hard)
- **Mistake:** Copying the whole structure for each version. Share what did not change.
- **Chapter:** [Persistent Data Structures](../12-advanced-data-structures/06-persistent-data-structures.md)

A persistent segment tree copies only the nodes on one path for each update. All other nodes are shared with the old version. The template shows the simple form of the same idea: keep history, and search it.

```cpp compile
struct SnapshotArray {
    vector<vector<pair<int, int>>> history;  // for each index: pairs {snap id, value}
    int snapId = 0;
    explicit SnapshotArray(int length) : history(length, vector<pair<int, int>>{{0, 0}}) {}
    void set(int index, int value) {
        auto& changes = history[index];
        if (changes.back().first == snapId) changes.back().second = value;
        else changes.push_back({snapId, value});
    }
    int snap() { return snapId++; }
    int get(int index, int snap) const {
        const auto& changes = history[index];
        auto after = upper_bound(changes.begin(), changes.end(), make_pair(snap, INT_MAX));
        return prev(after)->second;  // the last change at or before this snap
    }
};
```

### 94. Skip Lists, Probabilistic and Spatial Structures

- **Covers:** Skip list, Probabilistic data structure, Spatial data structure
- **When:** You need an ordered list with random levels, a memory-light "seen before?" test, or nearby-point search.
- **Giveaway:** "design a skiplist", "billions of items, small memory", "points in a rectangle or circle".
- **Not if:** Memory is fine and exact answers are needed: use [card 1](#1-hash-map-lookup-count-group) or [card 33](#33-ordered-set).
- **Cost:** Skip list: O(log n) expected. Bloom filter: O(hashes) for each operation, O(bits) space.
- **Classics:** [Design Skiplist](https://leetcode.com/problems/design-skiplist/) (LeetCode 1206, Hard); [Design HashSet](https://leetcode.com/problems/design-hashset/) (LeetCode 705, Easy); [Queries on Number of Points Inside a Circle](https://leetcode.com/problems/queries-on-number-of-points-inside-a-circle/) (LeetCode 1828, Medium)
- **Mistake:** Reading a Bloom filter "yes" as sure. "No" is always right. "Yes" may be wrong.
- **Chapter:** [Skip List](../12-advanced-data-structures/08-skip-list.md), [Probabilistic Data Structures](../12-advanced-data-structures/11-probabilistic-data-structures.md), [Spatial Data Structures](../12-advanced-data-structures/12-spatial-data-structures.md)

LeetCode has no Bloom filter problem. Design HashSet is the exact form of the same "seen before?" question.

```cpp compile
class BloomFilter {
public:
    explicit BloomFilter(size_t bitCount) : bits(bitCount, false) {}
    void add(const string& key) {
        for (int seed = 1; seed <= 3; seed++) bits[slot(key, seed)] = true;
    }
    bool mightContain(const string& key) const {
        for (int seed = 1; seed <= 3; seed++) if (!bits[slot(key, seed)]) return false;
        return true;
    }
private:
    vector<bool> bits;
    size_t slot(const string& key, int seed) const {
        return hash<string>{}(key + char('0' + seed)) % bits.size();
    }
};
```

## Design and engineering

### 95. Design: Hash Map Plus Linked List

- **Covers:** Design: hash map plus linked list
- **When:** You need O(1) lookup and also O(1) order changes.
- **Giveaway:** "least recently used", "O(1) get and put", "evict", "all O(1)".
- **Not if:** Order has no role: a plain hash map is enough, [card 1](#1-hash-map-lookup-count-group).
- **Cost:** O(1) on average for each operation. O(capacity) space.
- **Classics:** [LRU Cache](https://leetcode.com/problems/lru-cache/) (LeetCode 146, Medium); [LFU Cache](https://leetcode.com/problems/lfu-cache/) (LeetCode 460, Hard); [All O`one Data Structure](https://leetcode.com/problems/all-oone-data-structure/) (LeetCode 432, Hard)
- **Mistake:** Forgetting to update the map when you evict. Erase the key from both places.
- **Chapter:** [LRU and LFU Cache](../13-design-problems/01-lru-and-lfu-cache.md)

```cpp compile
struct LRUCacheShape {
    int capacity;  // needs: at least 1
    list<pair<int, int>> order;  // most recent first
    unordered_map<int, list<pair<int, int>>::iterator> where;
    explicit LRUCacheShape(int limit) : capacity(limit) {}
    int get(int key) {
        auto found = where.find(key);
        if (found == where.end()) return -1;
        order.splice(order.begin(), order, found->second);  // list iterators stay valid
        return found->second->second;
    }
    void put(int key, int value) {
        if (where.count(key)) order.erase(where[key]);
        else if ((int)order.size() == capacity) { where.erase(order.back().first); order.pop_back(); }
        order.push_front({key, value});
        where[key] = order.begin();
    }
};
```

### 96. Design: Data Structures and Iterators

- **Covers:** Design: data structure, Design: iterator, Data structure implementation
- **When:** The task is a class with required operations and costs.
- **Giveaway:** "design a class", "implement", "each call in O(1)", "next() and hasNext()".
- **Not if:** One existing structure already does each operation: then use it, and say so.
- **Cost:** O(1) on average for each operation in the template. O(n) space.
- **Classics:** [Insert Delete GetRandom O(1)](https://leetcode.com/problems/insert-delete-getrandom-o1/) (LeetCode 380, Medium); [Min Stack](https://leetcode.com/problems/min-stack/) (LeetCode 155, Medium); [Binary Search Tree Iterator](https://leetcode.com/problems/binary-search-tree-iterator/) (LeetCode 173, Medium)
- **Mistake:** Picking a structure before you list the operations. List them, with the cost of each, then combine structures.
- **Chapter:** [Stack and Queue Design Problems](../13-design-problems/02-stack-and-queue-design.md), [Iterators](../13-design-problems/03-iterators.md), [Hashing and Randomized Design](../13-design-problems/04-hashing-and-randomized-design.md)

An iterator stores only the place where it stopped, and it does one step of work in each `next()`.

```cpp compile
// A vector gives random access. A map gives the index, so that delete can swap with the last item.
struct RandomPool {
    vector<int> items;
    unordered_map<int, int> position;
    bool insert(int value) {
        if (!position.emplace(value, (int)items.size()).second) return false;
        items.push_back(value);
        return true;
    }
    bool remove(int value) {
        auto found = position.find(value);
        if (found == position.end()) return false;
        items[found->second] = items.back();  // fill the hole, so that the vector has no gap
        position[items.back()] = found->second;
        items.pop_back();
        position.erase(value);
        return true;
    }
    int getRandom() const { return items[rand() % (int)items.size()]; }  // needs: not empty
};
```

### 97. Engineering Topics

- **Covers:** Concurrency, Amortized analysis, External sorting, Sorting network, Memory allocation
- **When:** The question is about threads, cost over many operations, data larger than memory, or how memory is handed out.
- **Giveaway:** "print in order with threads", "why is push_back amortized O(1)", "sort 1 TB with 1 GB of RAM", "design an allocator".
- **Not if:** It is a normal algorithm problem: threads and disk add nothing there.
- **Cost:** Depends on the topic. See each chapter.
- **Classics:** [Print in Order](https://leetcode.com/problems/print-in-order/) (LeetCode 1114, Easy); [Print FooBar Alternately](https://leetcode.com/problems/print-foobar-alternately/) (LeetCode 1115, Medium); [Design Memory Allocator](https://leetcode.com/problems/design-memory-allocator/) (LeetCode 2502, Medium)
- **Mistake:** Waiting on a condition without a loop. A thread can wake up with no signal, so recheck the condition.
- **Chapter:** [Concurrency Basics](../13-design-problems/06-concurrency-basics.md), [Amortized Analysis](../00-start-here/07-amortized-analysis.md), [External Sorting and Sorting Networks](../04-sorting-searching/09-external-sorting-and-sorting-networks.md), [Array-Based Lists and Memory](../03-linked-lists-stacks-queues/10-array-based-lists-and-memory.md)

Amortized analysis is the average cost per operation over a whole run, not a promise for each call. External sorting sorts chunks that fit in memory, then uses [card 26](#26-k-way-merge). A sorting network is a fixed list of compare and swap steps.

```cpp compile
// One thread waits until earlier steps are done.
struct StepGate {
    mutex guard;
    condition_variable changed;
    int current = 0;
    void waitFor(int step) {
        unique_lock<mutex> lock(guard);
        changed.wait(lock, [&] { return current == step; });  // the wait rechecks after each wake-up
    }
    void advance() {
        { lock_guard<mutex> lock(guard); current++; }
        changed.notify_all();
    }
};
```

## Where to go next

- Tell neighbours apart: [Lookalike Patterns: How to Tell Them Apart](07-lookalike-patterns.md).
- See the thinking on full problems: [Worked Recognition Walkthroughs](08-worked-recognition-walkthroughs.md).
- Test yourself: [Recognition Drills: Easy](09-recognition-drills-easy.md), [Recognition Drills: Medium](10-recognition-drills-medium.md) and [Recognition Drills: Hard](11-recognition-drills-hard.md).
- The night before an interview: [Last-Night Revision](../14-interview-practice/08-last-night-revision.md). Full templates: [Template Cheat Sheet](../14-interview-practice/07-template-cheat-sheet.md).
