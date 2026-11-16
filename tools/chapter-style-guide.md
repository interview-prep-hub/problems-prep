# Chapter Style Guide

Every chapter in this repo follows these rules, so that you always know where to look. The model chapter is [Sliding Window: Variable Size](../05-core-patterns/05-sliding-window-variable.md).

Run `node tools/verify.mjs path/to/chapter.md` after any change. It lints the chapter, then compiles and runs every C++ block.

## Size budget

A chapter is for learning, not for showing everything you know. `tools/chapter-brief.mjs` prints each chapter's budget, and `tools/verify.mjs` fails a chapter that is over it.

- Teach what the chapter's plan lists. Do not add extra topics or problems. More problems belong in the practice list, as one line each.
- A typical solved problem is about 2 to 3 KB. Give a dry run only for the first problem of each type and for anything tricky.
- Keep `Common pitfalls` to the 5 to 8 that matter, and `Interview questions` to 4 to 6.
- Say a thing once. Link to a section instead of explaining it again.

## Mistakes reviewers find most often

Review of the first chapters found the same kinds of mistakes again and again. Check for them as you write.

1. **Overflow in templates.** `int sum` overflows on inputs that fit in `int`. Use `long long` for every sum and product, and for any count of pairs.
2. **Missing limits.** If code only works when `k >= 3` or when the input is not empty, say so in the problem text.
3. **One-way proofs.** "If A then B" does not prove "if B then A". When an answer relies on "exactly when", give both directions.
4. **Hash costs without "on average".** Hash operations are O(1) on average and O(n) in the worst case. Say "on average".
5. **Incomplete complexity.** Brute force costs must count all the work inside the loops. Space must include the recursion stack.
6. **Loose definitions.** Define terms exactly, or do not use them. Do not state a fact you are not sure of, such as what a specific compiler does internally.
7. **Measured numbers.** Do not quote running times or operation counts as facts. They change with the machine.
8. **Promises about other chapters.** Do not say what another chapter contains beyond its plan.
9. **Tables that do not match.** A dry run must use the same input as the example above it.

## Who the reader is

The reader is a working software engineer with about one year of experience. They studied data structures at university but have forgotten most of it, and they are preparing for the problem-solving round of a software engineer interview. English is their second language.

Assume they remember nothing. Assume they are smart. Teach like a patient senior colleague sitting next to them.

## Writing rules

- **Short sentences.** One idea in each sentence. If a sentence has two commas, split it.
- **Plain words.** Write "use" not "utilize", "because" not "due to the fact that", "check" not "ascertain". Avoid idioms such as "at the end of the day" and "low-hanging fruit".
- **Define every term the first time it appears.** For example: "A subarray is a part of an array with no gaps."
- **Concrete before abstract.** Show a tiny example first, then state the general rule.
- **Say why.** Never present a step without its reason. "We move `left` because..." is the sentence that makes readers understand.
- **Use small numbers.** Examples have at most 8 elements, so that the reader can trace them by hand.
- **Write to the reader as "you".**
- **No filler.** Delete "It is important to note that", "Simply", "Obviously", "Clearly", "As we can see", "Let's dive in".
- **Punctuation.** Never use the em dash or the en dash, in prose or in code. Use a comma, colon, parentheses, a period, or a plain hyphen.
- **Never mention** any AI tool, assistant or model anywhere in the notes.
- **Do not copy** problem statements word for word. Paraphrase them in your own short words.

## Chapter layout

Parts 02 to 13 use this exact layout. The `##` headings must use these words, because `tools/verify.mjs` checks for them.

```text
# Chapter title

> **Level:** Beginner | Intermediate | Advanced | Expert · **Priority:** T1 | T2 | T3 · **Time:** N min · **Read first:** [link](path.md) · **Next:** [link](path.md)

One or two sentences: what this chapter teaches and why it matters.

## Quick revision
8 to 15 bullets. Everything needed to recall the chapter in three minutes.

## How to recognize it
The checklist, the signal table and the "Not this pattern if" table.

## 1. The idea in plain English
An everyday analogy, then one tiny worked example.

## 2. ... more numbered sections
Concepts, templates, dry runs, diagrams, full implementations.

## N. Solved problems
### P1. ...
### P2. ...

## Common pitfalls
Numbered mistakes. Each gives the wrong code or idea, why it is wrong, and the fix.

## Practice list
More problems to try alone, each with a one-line hint.

## Interview questions
Questions an interviewer may ask about this topic, with collapsible model answers.
```

### Priority tiers

| Tier | Meaning |
|---|---|
| `T1` | Asked often. Know it cold: write the code from memory and handle follow-ups. |
| `T2` | Asked sometimes. Understand it and be able to code it with a little thought. |
| `T3` | Asked rarely, or only at the hardest companies. Know what it is and when it applies. |

### Levels

| Level | Meaning |
|---|---|
| `Beginner` | No background needed beyond basic programming. |
| `Intermediate` | Needs the earlier chapters. Typical interview Easy and Medium problems. |
| `Advanced` | Interview Hard problems. |
| `Expert` | Competitive-programming level. Rare in interviews, but included for full coverage. |

## The "How to recognize it" section

This is the most important section of every chapter. The reader's main goal is to look at a new problem and know which tool to use. It must contain:

1. **A checklist** of 3 to 5 yes or no questions. If the answers are all yes, this is the pattern.
2. **A signal table**: exact words or shapes in a problem statement, and what they mean. Use the phrases real problems use, such as "longest substring", "at most k", "contiguous".
3. **A "Not this pattern if" table**: what looks similar but needs something else, which chapter to use instead (with a link), and why. This is what separates this pattern from its lookalikes.

For a data structure chapter, recognition means: which operations does the problem need quickly, and why does this structure fit better than the alternatives?

## How to explain

- **Start with an analogy** from daily life: a queue at a bank, a stack of plates, a caterpillar crawling for a sliding window.
- **Then trace by hand.** A dry run is a table with one row for each step. Every value in it must be correct. The reader will check it.
- **Then give the rule.** State the general idea only after the reader has seen it work.
- **Then give the code.** Code comes last, once the reader already knows what it should do.

Use diagrams wherever a picture is clearer than words:

- ASCII art in a ` ```text ` block for arrays with pointers, linked lists and small trees.
- Mermaid in a ` ```mermaid ` block for flowcharts, graphs and decision trees. Always quote labels that contain punctuation: `A["f(x) = 1"]`.

For data structure chapters, show the state after every operation:

```text
push(10)    [10]
push(20)    [10, 20]
pop() -> 20 [10]
```

## Problem format

Solved problems are numbered P1, P2 and so on within a chapter, ordered from easiest to hardest. The heading format is exact, because the master index is generated from it.

```text
### P3. Longest Substring Without Repeating Characters ([LeetCode 3](https://leetcode.com/problems/longest-substring-without-repeating-characters/), Medium)
### P4. Meeting Rooms II ([LeetCode 253](https://leetcode.com/problems/meeting-rooms-ii/), Medium, Premium)
### P5. Count Inversions (Classic, Medium)
```

- The title, number, difficulty and Premium flag must match LeetCode exactly. Never type them from memory. Get the exact text with `node tools/lc.mjs 3 253`.
- Use `Classic` for textbook problems that are not on LeetCode. Their difficulty can be `Easy`, `Medium`, `Hard` or `Advanced`.
- Prefer free problems. When a problem is Premium, say so with the `Premium` marker.

Every solved problem has these labeled parts, in this order. Parts marked "required" are checked by the linter.

| Label | Required | Content |
|---|---|---|
| `**Problem:**` | required | The problem in one to three short sentences, in your own words. |
| `**Example:**` | required | One small input and output, with a few words on why. |
| `**Pattern:**` | required | The pattern name, as used in `tools/data/curriculum.json` patterns list. The index groups problems by this line. |
| `**How to recognize it:**` | required | The exact clues in this problem that point to the pattern. This is what the reader must learn to see. |
| `**Brute force:**` | | The obvious slow way and its cost, and why it is too slow. Skip only if there is no meaningful brute force. |
| `**Key idea:**` | required | The one insight that makes the solution work, in plain words. |
| `**Dry run:**` | | A step-by-step table on the small example. Required for the first problem of each type, and for anything tricky. |
| Code | required | A complete C++ program. See below. |
| `**Complexity:**` | required | Time and space, each with its reason. "O(n) time, because each index enters and leaves the window once." |
| `**Edge cases:**` | | Inputs that often break solutions. |
| `**Follow-up:**` | | A likely interviewer follow-up and its answer. |

## Problem ladder

Each chapter goes from simple to the hardest level the topic reaches. Unless the chapter's plan says otherwise:

| Chapter type | Solved problems | Spread |
|---|---|---|
| Pattern chapter | 10 to 16 | Start easy. End with at least 3 Hard. |
| Data structure chapter | Full implementation, then 6 to 12 problems | Basic operations first, then applied problems. |
| Algorithm chapter (Expert) | Full implementation, then 3 to 6 problems | Include how to recognize when it applies. |

A chapter's plan lists the problems it must solve in full. A problem is solved in full in one chapter only. If another chapter needs it, link to it instead of solving it again, unless the second chapter teaches a different technique. In that case say so and show only what differs.

## Code rules

Every ` ```cpp ` block is a complete program that compiles with `g++ -std=c++17` with no warnings and runs in under one second. The tool rejects it otherwise.

```cpp
#include <bits/stdc++.h>
#include <cassert>
using namespace std;

class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        vector<int> lastSeen(256, -1);  // last index of each character
        int left = 0, best = 0;
        for (int right = 0; right < (int)s.size(); right++) {
            unsigned char c = s[right];
            left = max(left, lastSeen[c] + 1);  // jump past the repeat, never move backwards
            lastSeen[c] = right;
            best = max(best, right - left + 1);
        }
        return best;
    }
};

int main() {
    Solution solution;
    assert(solution.lengthOfLongestSubstring("abcabcbb") == 3);  // "abc"
    assert(solution.lengthOfLongestSubstring("bbbbb") == 1);     // "b"
    assert(solution.lengthOfLongestSubstring("") == 0);          // empty input
    cout << "All tests passed\n";
}
```

Rules:

1. Start with `#include <bits/stdc++.h>`, `#include <cassert>` and `using namespace std;`. GCC 16 does not include `assert` in `bits/stdc++.h`, so `<cassert>` must be explicit.
2. For a LeetCode problem, use the exact LeetCode class and method signature, so that the reader can paste the class into LeetCode.
3. End with `main()`. It must test the example from the text, at least one edge case and at least one tricky case with `assert`, and finish with `cout << "All tests passed\n";`.
4. Show-only output is allowed: a program may print results if a ` ```text output ` block right after it shows the exact stdout. The tool compares them.
5. Use clear names (`left`, `right`, `windowSum`, `visited`). Use `i` and `j` only for plain index loops.
6. Comment the reason, not the action. Write `// a[left] can never be part of an answer` and not `// increment left`.
7. Use `(int)v.size()` in loop conditions, because `size()` is unsigned. Use `long long` when a sum or product can pass about 2 billion.
8. No macros, no `goto`, no reading from stdin, no global mutable state in a `Solution` class, no `#define int long long`.
9. Use only plain ASCII characters inside code.
10. A data structure implementation must include every operation, handle empty and one-element cases, and free its memory with a destructor when it uses `new`.
11. To test a hard structure (AVL, red-black, treap, segment tree), add a randomized test in `main()` that compares it with a simple correct model such as `std::set`, using a fixed seed. It must also check the structure's invariants.

Two tags exist for code that cannot be a full program:

- ` ```cpp compile `: compiled but not run. Use it for a short class or function with no `main()`, such as a reusable template. Includes are added for you if the block has none.
- ` ```cpp snippet `: not compiled, at most 25 lines. Use it for fragments that show a single idea. Every snippet must be a fragment of something a compiled block also shows.

## Interview questions format

```text
<details>
<summary><strong>Q1. Why is the nested while loop still O(n)?</strong></summary>

Because `left` only moves forward...

</details>
```

Answers are what you would say out loud: two to five sentences. Include a likely follow-up where it helps.

## Practice list format

Use real problems only, checked with `node tools/lc.mjs`. Find more with `node tools/lc.mjs --tag "Sliding Window" --difficulty Medium --free`. Order from easiest to hardest.

```text
- [ ] [Max Consecutive Ones](https://leetcode.com/problems/max-consecutive-ones/) (LeetCode 485, Easy): track the current run of ones.
```

## Long chapters

Do not try to write a whole chapter in one tool call. Write the top of the file first and end it with a line containing `<!-- CONTINUE -->`. Then replace that line with the next few sections, again ending with the marker. Remove the marker at the end. The linter fails if it is left in the file.
