# Stack From Zero

> **Level:** Beginner · **Priority:** T1 · **Time:** 180 min · **Read first:** [Singly linked list](01-singly-linked-list.md) · **Next:** [Stacks for expressions and parentheses](06-stack-expressions-and-parentheses.md)

A stack is a list where you add and remove only at one end. That one rule makes it the right tool whenever the most recent unfinished thing must be handled first. This chapter builds a stack in three ways, and then solves the classic problems, from matching brackets to several stacks sharing one array.

## Quick revision

- A **stack** is last in, first out (**LIFO**): the last item you pushed is the first you pop.
- Operations: `push` adds to the top, `pop` removes from the top, `top` reads it. All are O(1).
- **Overflow:** pushing to a full fixed-size stack. **Underflow:** popping from an empty stack.
- Array version: keep `topIndex`, starting at -1. Linked list version: push and pop at the head.
- `std::stack::pop()` returns nothing. Read `top()` first, and never call either on an empty stack.
- Use a `vector` or `string` as a stack when you also need to read all its items at the end.
- **The stack signal:** you meet something now, but can only finish it when something later arrives. Brackets, undo and nesting all work this way.
- **Matching:** push openers. On a closer, the top must be its partner.
- **Cancel neighbours:** if the new item cancels the top, pop. Otherwise push.
- **Nesting:** on `[`, save the current state and start fresh. On `]`, restore it and combine.
- **Min stack:** store the minimum so far next to each value.
- **Recursion uses a stack:** the function call stack. Each call adds a frame, and each return removes one.
- **Two stacks in one array:** grow from both ends. **k stacks:** link slots with a `next` array and a free list.

## How to recognize it

Ask these four questions. If most answers are yes, use a stack.

1. Do you process items from left to right?
2. Does a new item often need to look at the **most recent** item that is still open?
3. Can a new item finish or cancel that recent item?
4. Does the order of finishing go backwards, with the last thing started being the first finished?

| Words in the problem | What they tell you |
|---|---|
| "valid parentheses", "balanced", "matching" | Push openers, match closers |
| "remove adjacent", "cancel", "collide" | The new item fights the top of the stack |
| "backspace", "undo", "delete the previous" | Pop the most recent item |
| "nested", "inside", `k[...]` | Save the state on open, restore it on close |
| "simplify path", `..` | Go back one level, so pop |
| "function calls", "start and end logs" | The running function is on top |
| "next greater", "previous smaller" | A [monotonic stack](../05-core-patterns/12-monotonic-stack.md) |
| "evaluate the expression" | [Stacks for expressions](06-stack-expressions-and-parentheses.md) |
| "O(1) minimum" with push and pop | A stack that stores the minimum so far |

**Not this structure if:**

| You see | Use instead | Why |
|---|---|---|
| Handle items in arrival order | [Queue](07-queue-from-zero.md) | A queue gives the oldest item, not the newest. |
| Add or remove at both ends | [Deque](09-deque.md) | A stack has one open end. |
| Always take the smallest or largest | [Heap](../07-trees/11-heap-from-zero.md) | A stack knows only the newest item. |
| Next greater element for each item | [Monotonic stack](../05-core-patterns/12-monotonic-stack.md) | Still a stack, with one added rule that keeps it sorted. |
| Only one kind of bracket, no order to check | A counter | A plain count of open brackets uses O(1) space. |
| Read any position | [Array](../02-arrays-strings-hashing/01-arrays-from-zero.md) | A stack only shows its top. |

## 1. The idea in plain English

Think of a pile of plates. You put a clean plate on top, and you take a plate from the top. You never pull one from the middle. The plate you added last is the first one you take.

The undo button works the same way. Each action goes on a pile. Undo takes the newest action off the pile.

```text
push(10)   push(20)   push(30)   pop() -> 30   pop() -> 20

                       [30]
            [20]       [20]        [20]
[10]        [10]       [10]        [10]          [10]
```

Only the top can be seen or changed. That sounds like a limit, but it is the point: the stack keeps the unfinished items in order, with the most recent one ready.

## 2. A stack with a fixed array

The simplest stack is an array, plus one number: `topIndex`, the position of the top item. It starts at -1, which means the stack is empty.

Two errors can happen, and interviewers like to ask about them:

- **Overflow:** a push when the array is full.
- **Underflow:** a pop or top when the stack is empty.

```cpp
#include <bits/stdc++.h>
#include <cassert>
using namespace std;

class FixedStack {
    vector<int> slots;
    int topIndex = -1;

public:
    explicit FixedStack(int capacity) : slots(capacity) {}

    bool empty() const { return topIndex == -1; }
    bool full() const { return topIndex + 1 == (int)slots.size(); }
    int size() const { return topIndex + 1; }

    void push(int value) {
        if (full()) throw overflow_error("stack is full");
        slots[++topIndex] = value;
    }

    int pop() {
        if (empty()) throw underflow_error("stack is empty");
        return slots[topIndex--];  // the old value stays in the array, but it is no longer in use
    }

    int top() const {
        if (empty()) throw underflow_error("stack is empty");
        return slots[topIndex];
    }

    vector<int> items() const { return vector<int>(slots.begin(), slots.begin() + size()); }
};

void show(const string& action, const FixedStack& stack) {
    cout << left << setw(14) << action << "[";
    vector<int> values = stack.items();
    for (int i = 0; i < (int)values.size(); i++) cout << (i ? ", " : "") << values[i];
    cout << "]\n";
}

int main() {
    FixedStack stack(3);
    stack.push(10);
    show("push(10)", stack);
    stack.push(20);
    show("push(20)", stack);
    stack.push(30);
    show("push(30)", stack);
    assert(stack.top() == 30);
    show("top() -> 30", stack);

    bool overflowed = false;
    try {
        stack.push(99);
    } catch (const overflow_error&) {
        overflowed = true;
    }
    assert(overflowed);

    assert(stack.pop() == 30);
    show("pop() -> 30", stack);
    assert(stack.pop() == 20);
    show("pop() -> 20", stack);
    stack.push(40);
    show("push(40)", stack);
    assert(stack.pop() == 40);
    show("pop() -> 40", stack);
    assert(stack.pop() == 10);
    show("pop() -> 10", stack);

    bool underflowed = false;
    try {
        stack.pop();
    } catch (const underflow_error&) {
        underflowed = true;
    }
    assert(underflowed);
    cout << "All tests passed\n";
}
```

```text output
push(10)      [10]
push(20)      [10, 20]
push(30)      [10, 20, 30]
top() -> 30   [10, 20, 30]
pop() -> 30   [10, 20]
pop() -> 20   [10]
push(40)      [10, 40]
pop() -> 40   [10]
pop() -> 10   []
All tests passed
```

## 3. A growing stack and a linked stack

A fixed array has a hard limit. Two other designs have none.

- **Growing array:** when the array is full, make one twice as big and copy everything across. This is what `vector` does, so a push is O(1) amortized.
- **Linked list:** each push makes a new node at the head. The head is the top of the stack, because removing at the head is O(1) in a [singly linked list](01-singly-linked-list.md).

```cpp
#include <bits/stdc++.h>
#include <cassert>
using namespace std;

class GrowingStack {
    int capacity = 2;
    int count = 0;
    int* slots;  // declared last: members are set up in this order, and slots needs capacity

public:
    GrowingStack() : slots(new int[capacity]) {}
    ~GrowingStack() { delete[] slots; }
    GrowingStack(const GrowingStack&) = delete;
    GrowingStack& operator=(const GrowingStack&) = delete;

    bool empty() const { return count == 0; }

    void push(int value) {
        if (count == capacity) {
            int* bigger = new int[capacity * 2];
            copy(slots, slots + count, bigger);
            delete[] slots;
            slots = bigger;
            capacity *= 2;
        }
        slots[count++] = value;
    }

    int pop() {
        if (empty()) throw underflow_error("stack is empty");
        return slots[--count];
    }

    int top() const {
        if (empty()) throw underflow_error("stack is empty");
        return slots[count - 1];
    }
};

class LinkedStack {
    struct Node {
        int value;
        Node* next;
    };
    Node* head = nullptr;  // the head of the list is the top of the stack

public:
    LinkedStack() = default;
    ~LinkedStack() {
        while (head != nullptr) pop();
    }
    LinkedStack(const LinkedStack&) = delete;
    LinkedStack& operator=(const LinkedStack&) = delete;

    bool empty() const { return head == nullptr; }

    void push(int value) { head = new Node{value, head}; }

    int pop() {
        if (empty()) throw underflow_error("stack is empty");
        Node* target = head;
        int value = target->value;
        head = target->next;
        delete target;
        return value;
    }

    int top() const {
        if (empty()) throw underflow_error("stack is empty");
        return head->value;
    }
};

// Both designs must behave exactly like std::stack on random steps.
template <typename Stack>
void testAgainstModel() {
    Stack mine;
    stack<int> model;
    mt19937 rng(7);
    for (int step = 0; step < 5000; step++) {
        if (rng() % 2 == 0 || model.empty()) {
            int value = (int)(rng() % 1000);
            mine.push(value);
            model.push(value);
        } else {
            assert(mine.pop() == model.top());
            model.pop();
        }
        assert(mine.empty() == model.empty());
        if (!model.empty()) assert(mine.top() == model.top());
    }
}

int main() {
    testAgainstModel<GrowingStack>();
    testAgainstModel<LinkedStack>();

    LinkedStack empty;
    bool threw = false;
    try {
        empty.pop();
    } catch (const underflow_error&) {
        threw = true;
    }
    assert(threw);
    cout << "All tests passed\n";
}
```

| Design | push | pop | Memory | Limit |
|---|---|---|---|---|
| Fixed array | O(1) | O(1) | Fixed block, may be partly unused | Overflow when full |
| Growing array | O(1) amortized | O(1) | Up to about twice what is used | Only available memory |
| Linked list | O(1), with one allocation | O(1) | One pointer per item | Only available memory |

Prefer the growing array in practice. Its items sit together in memory, so it is faster than a linked list.

## 4. `std::stack`

```cpp
#include <bits/stdc++.h>
#include <cassert>
using namespace std;

int main() {
    stack<int> numbers;
    numbers.push(1);
    numbers.push(2);
    assert(numbers.top() == 2 && numbers.size() == 2);

    numbers.pop();          // pop returns nothing, so read top first
    assert(numbers.top() == 1);
    numbers.pop();
    assert(numbers.empty());

    // A vector or string also works as a stack, and it lets you read all the items.
    string text;
    text.push_back('a');
    text.push_back('b');
    assert(text.back() == 'b');
    text.pop_back();
    assert(text == "a");
    cout << "All tests passed\n";
}
```

`stack` has no way to see any item but the top. If you need the whole contents at the end, as in [P4](#p4-remove-all-adjacent-duplicates-in-string-leetcode-1047-easy), use a `string` or a `vector`.

## 5. The call stack

Every running program already has a stack. Each function call pushes a **frame**, which holds that call's local variables and where to return. Each return pops it.

```text
main calls a, a calls b:     b returns:     a returns:

   [b]
   [a]                          [a]
   [main]                       [main]         [main]
```

This is why deep recursion can crash a program with a **stack overflow**: the call stack has a limited size. It is also why any recursive function can be rewritten with an explicit stack, and why the recursive problems in this chapter use O(n) space even though they have no visible stack.

## 6. Solved problems

### P1. Valid Parentheses ([LeetCode 20](https://leetcode.com/problems/valid-parentheses/), Easy)

**Problem:** A string has only the characters `( ) [ ] { }`. Decide whether every bracket is closed by the right type, in the right order.

**Example:** `"{[]}"` gives `true`. `"([)]"` gives `false`.

**Pattern:** Stack simulation

**How to recognize it:** "Matching" and "correct order". A closing bracket must match the most recent opener that is still open, and "most recent unfinished" means a stack.

**Brute force:** Repeatedly delete neighbouring pairs such as `()` until none are left. O(n^2) time.

**Key idea:** Push each opener. For a closer, the stack must not be empty, and its top must be the matching opener. At the end, the stack must be empty.

**Dry run:** on `"([)]"`.

| Character | Stack before | Action |
|---|---|---|
| `(` | empty | push |
| `[` | `(` | push |
| `)` | `( [` | the top is `[`, which does not match, so return false |

```cpp
#include <bits/stdc++.h>
#include <cassert>
using namespace std;

class Solution {
public:
    bool isValid(string s) {
        string open;  // a string used as a stack
        for (char c : s) {
            if (c == '(' || c == '[' || c == '{') {
                open.push_back(c);
            } else {
                if (open.empty()) return false;  // a closer with nothing to close
                char expected = c == ')' ? '(' : c == ']' ? '[' : '{';
                if (open.back() != expected) return false;
                open.pop_back();
            }
        }
        return open.empty();  // openers left over were never closed
    }
};

int main() {
    Solution solution;
    assert(solution.isValid("()"));
    assert(solution.isValid("()[]{}"));
    assert(solution.isValid("{[]}"));
    assert(!solution.isValid("(]"));
    assert(!solution.isValid("([)]"));   // right counts, wrong order
    assert(!solution.isValid("("));      // never closed
    assert(!solution.isValid(")"));      // nothing to close
    assert(solution.isValid(""));
    cout << "All tests passed\n";
}
```

**Complexity:** O(n) time. O(n) space in the worst case, such as a string of only openers.

**Edge cases:** a closer on an empty stack, and openers left at the end. Simple counting would accept `"([)]"`, which is why you need the stack.

### P2. Baseball Game ([LeetCode 682](https://leetcode.com/problems/baseball-game/), Easy)

**Problem:** Process a list of operations on a score record. An integer records that score. `"+"` records the sum of the last two scores. `"D"` records double the last score. `"C"` removes the last score. Return the total.

**Example:** `["5", "2", "C", "D", "+"]` gives `30`.

**Pattern:** Stack simulation

**How to recognize it:** Each operation works on the most recent scores, and `"C"` undoes the last one. That is a stack.

**Key idea:** Keep the scores in a `vector` used as a stack, so that you can read the last two. Add them up at the end.

**Dry run:** on the example.

| Operation | Scores after |
|---|---|
| `5` | 5 |
| `2` | 5, 2 |
| `C` | 5 |
| `D` | 5, 10 |
| `+` | 5, 10, 15 |

The total is 30.

```cpp
#include <bits/stdc++.h>
#include <cassert>
using namespace std;

class Solution {
public:
    int calPoints(vector<string>& operations) {
        vector<int> scores;
        for (const string& op : operations) {
            if (op == "+") {
                scores.push_back(scores[scores.size() - 1] + scores[scores.size() - 2]);
            } else if (op == "D") {
                scores.push_back(2 * scores.back());
            } else if (op == "C") {
                scores.pop_back();
            } else {
                scores.push_back(stoi(op));
            }
        }
        return accumulate(scores.begin(), scores.end(), 0);
    }
};

int main() {
    Solution solution;
    vector<string> a = {"5", "2", "C", "D", "+"};
    assert(solution.calPoints(a) == 30);
    vector<string> b = {"5", "-2", "4", "C", "D", "9", "+", "+"};
    assert(solution.calPoints(b) == 27);  // negative scores are allowed
    vector<string> c = {"1", "C"};
    assert(solution.calPoints(c) == 0);   // an empty record sums to 0
    cout << "All tests passed\n";
}
```

**Complexity:** O(n) time and space.

### P3. Backspace String Compare ([LeetCode 844](https://leetcode.com/problems/backspace-string-compare/), Easy)

**Problem:** In two strings, `#` means backspace. Decide whether they give the same text. A backspace on empty text does nothing.

**Example:** `"ab#c"` and `"ad#c"` both give `"ac"`.

**Pattern:** Stack simulation

**How to recognize it:** "Backspace" deletes the most recent character that is still there. That is a pop.

**Key idea:** Build each final string with a string used as a stack, then compare.

```cpp
#include <bits/stdc++.h>
#include <cassert>
using namespace std;

class Solution {
    string finalText(const string& typed) {
        string text;
        for (char c : typed) {
            if (c != '#') text.push_back(c);
            else if (!text.empty()) text.pop_back();  // backspace on empty text does nothing
        }
        return text;
    }

public:
    bool backspaceCompare(string s, string t) {
        return finalText(s) == finalText(t);
    }
};

int main() {
    Solution solution;
    assert(solution.backspaceCompare("ab#c", "ad#c"));
    assert(solution.backspaceCompare("ab##", "c#d#"));   // both become empty
    assert(!solution.backspaceCompare("a#c", "b"));
    assert(solution.backspaceCompare("a##c", "#a#c"));   // backspace on empty text
    cout << "All tests passed\n";
}
```

**Complexity:** O(n + m) time and space.

**Follow-up:** "Can you do it in O(1) space?" Yes. Walk both strings from the end with two pointers. Keep a count of pending backspaces for each string, skip the characters they delete, and compare the next real characters.

### P4. Remove All Adjacent Duplicates In String ([LeetCode 1047](https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string/), Easy)

**Problem:** Repeatedly remove two equal neighbouring letters until none are left. Return the result.

**Example:** `"abbaca"` gives `"ca"`. Removing `bb` makes the two `a`s neighbours, so they go too.

**Pattern:** Stack simulation

**How to recognize it:** A removal can bring two letters together, so the effect chains backwards. The new letter only ever has to look at the most recent letter that survived.

**Brute force:** Scan and remove pairs until nothing changes. O(n^2) time.

**Key idea:** Build the answer as a stack. If the new letter equals the top, pop. Otherwise push.

**Dry run:** on `"abbaca"`.

| Letter | Stack after |
|---|---|
| a | `a` |
| b | `ab` |
| b | `a` |
| a | empty |
| c | `c` |
| a | `ca` |

```cpp
#include <bits/stdc++.h>
#include <cassert>
using namespace std;

class Solution {
public:
    string removeDuplicates(string s) {
        string result;  // a string used as a stack, so it is also the answer
        for (char c : s) {
            if (!result.empty() && result.back() == c) result.pop_back();
            else result.push_back(c);
        }
        return result;
    }
};

int main() {
    Solution solution;
    assert(solution.removeDuplicates("abbaca") == "ca");
    assert(solution.removeDuplicates("azxxzy") == "ay");
    assert(solution.removeDuplicates("aa") == "");
    assert(solution.removeDuplicates("aaa") == "a");  // pairs go, so one a is left
    assert(solution.removeDuplicates("abc") == "abc");
    cout << "All tests passed\n";
}
```

**Complexity:** O(n) time and space, because each letter is pushed and popped at most once.

### P5. Insert at the Bottom of a Stack (Classic, Easy)

**Problem:** Add a value under all the items of a stack. Use only stack operations and recursion.

**Example:** With `1, 2, 3` (top is 3), inserting 9 at the bottom gives `9, 1, 2, 3`.

**Pattern:** Recursion

**How to recognize it:** You may use only the top, but you need to reach the bottom. Recursion gives you a hidden second stack: the items wait in the call frames.

**Key idea:** Pop the top and hold it in a local variable. Insert into the smaller stack. Then push the held item back. When the stack is empty, you are at the bottom, so push the new value.

```cpp
#include <bits/stdc++.h>
#include <cassert>
using namespace std;

void insertAtBottom(stack<int>& items, int value) {
    if (items.empty()) {
        items.push(value);
        return;
    }
    int held = items.top();
    items.pop();
    insertAtBottom(items, value);
    items.push(held);
}

stack<int> stackOf(const vector<int>& values) {
    stack<int> items;
    for (int value : values) items.push(value);
    return items;
}

vector<int> bottomToTop(stack<int> items) {
    vector<int> values;
    while (!items.empty()) {
        values.push_back(items.top());
        items.pop();
    }
    reverse(values.begin(), values.end());
    return values;
}

int main() {
    stack<int> a = stackOf({1, 2, 3});
    insertAtBottom(a, 9);
    assert(bottomToTop(a) == vector<int>({9, 1, 2, 3}));

    stack<int> b;
    insertAtBottom(b, 5);  // an empty stack
    assert(bottomToTop(b) == vector<int>({5}));
    cout << "All tests passed\n";
}
```

**Complexity:** O(n) time. O(n) space for the recursion, because the items wait in the call frames.

### P6. Reverse a Stack Using Recursion (Classic, Medium)

**Problem:** Reverse a stack in place. Use only stack operations and recursion, with no loops and no extra data structure.

**Example:** `1, 2, 3` (top is 3) becomes `3, 2, 1` (top is 1).

**Pattern:** Recursion

**How to recognize it:** "Only recursion" and a bottom that must become reachable. You already have the tool: [P5](#p5-insert-at-the-bottom-of-a-stack-classic-easy).

**Key idea:** Pop the top item. Reverse the rest. The item you held must now go under everything, so insert it at the bottom.

**Dry run:** on `1, 2, 3`.

```text
reverse [1, 2, 3]: hold 3, reverse [1, 2]
  reverse [1, 2]: hold 2, reverse [1]
    reverse [1]: hold 1, reverse []
      nothing to do
    insert 1 at the bottom of []        gives [1]
  insert 2 at the bottom of [1]         gives [2, 1]
insert 3 at the bottom of [2, 1]        gives [3, 2, 1]
```

```cpp
#include <bits/stdc++.h>
#include <cassert>
using namespace std;

void insertAtBottom(stack<int>& items, int value) {
    if (items.empty()) {
        items.push(value);
        return;
    }
    int held = items.top();
    items.pop();
    insertAtBottom(items, value);
    items.push(held);
}

void reverseStack(stack<int>& items) {
    if (items.empty()) return;
    int held = items.top();
    items.pop();
    reverseStack(items);
    insertAtBottom(items, held);
}

vector<int> topToBottom(stack<int> items) {
    vector<int> values;
    while (!items.empty()) {
        values.push_back(items.top());
        items.pop();
    }
    return values;
}

int main() {
    stack<int> a;
    for (int value : {1, 2, 3}) a.push(value);
    reverseStack(a);
    assert(topToBottom(a) == vector<int>({1, 2, 3}));  // 1 is now on top

    stack<int> b;
    reverseStack(b);        // an empty stack
    assert(b.empty());

    stack<int> c;
    c.push(4);
    reverseStack(c);        // one item
    assert(c.top() == 4);
    cout << "All tests passed\n";
}
```

**Complexity:** O(n^2) time, because each of the n items is inserted at the bottom, which costs up to O(n). O(n) space for the recursion.

### P7. Delete the Middle of a Stack (Classic, Easy)

**Problem:** Remove the middle item of a stack, using only stack operations and recursion. Count positions from the top, starting at 0, so the middle of n items is at position `n / 2`.

**Example:** `1, 2, 3, 4, 5` (top is 5) has `3` at position 2 from the top. The result is `1, 2, 4, 5`.

**Pattern:** Recursion

**How to recognize it:** You must reach a position inside a stack, and no other storage is allowed. So the items above the target wait in call frames.

**Key idea:** Pass the number of items still to skip. While it is above 0, hold the top, recurse with one less, and push it back. When it reaches 0, pop the target.

```cpp
#include <bits/stdc++.h>
#include <cassert>
using namespace std;

void removeAtDepth(stack<int>& items, int depth) {
    if (depth == 0) {
        items.pop();
        return;
    }
    int held = items.top();
    items.pop();
    removeAtDepth(items, depth - 1);
    items.push(held);
}

void deleteMiddle(stack<int>& items) {
    if (!items.empty()) removeAtDepth(items, (int)items.size() / 2);
}

vector<int> bottomToTop(stack<int> items) {
    vector<int> values;
    while (!items.empty()) {
        values.push_back(items.top());
        items.pop();
    }
    reverse(values.begin(), values.end());
    return values;
}

int main() {
    stack<int> a;
    for (int value : {1, 2, 3, 4, 5}) a.push(value);
    deleteMiddle(a);
    assert(bottomToTop(a) == vector<int>({1, 2, 4, 5}));

    stack<int> b;
    for (int value : {1, 2, 3, 4}) b.push(value);
    deleteMiddle(b);        // position 2 from the top is the value 2
    assert(bottomToTop(b) == vector<int>({1, 3, 4}));

    stack<int> c;
    c.push(7);
    deleteMiddle(c);        // one item
    assert(c.empty());
    deleteMiddle(c);        // an empty stack is safe
    assert(c.empty());
    cout << "All tests passed\n";
}
```

**Complexity:** O(n) time and O(n) recursion space.

### P8. Sort a Stack Using Another Stack (Classic, Medium)

**Problem:** Sort a stack so that its largest item is on top. You may use one extra stack, and nothing else.

**Example:** `34, 3, 31` (top is 31) becomes `3, 31, 34` (top is 34).

**Pattern:** Stack simulation

**How to recognize it:** "Sort" with only stacks. This is insertion sort. The second stack is the sorted part, and the first stack is the temporary space.

**Key idea:** Pop a value from the input. While the sorted stack's top is larger, move those larger items back to the input. Push the value. The moved items will come back in the right place.

**Dry run:** the input is `2, 1, 3` from bottom to top, so 3 comes off first.

| Value | Moved back to input | Sorted stack after (bottom to top) |
|---|---|---|
| 3 | none | 3 |
| 1 | 3 | 1 |
| 3 | none | 1, 3 |
| 2 | 3 | 1, 2 |
| 3 | none | 1, 2, 3 |

```cpp
#include <bits/stdc++.h>
#include <cassert>
using namespace std;

stack<int> sortStack(stack<int> input) {
    stack<int> sorted;  // always in order, with its largest on top
    while (!input.empty()) {
        int value = input.top();
        input.pop();
        while (!sorted.empty() && sorted.top() > value) {
            input.push(sorted.top());
            sorted.pop();
        }
        sorted.push(value);
    }
    return sorted;
}

stack<int> stackOf(const vector<int>& values) {
    stack<int> items;
    for (int value : values) items.push(value);
    return items;
}

vector<int> topToBottom(stack<int> items) {
    vector<int> values;
    while (!items.empty()) {
        values.push_back(items.top());
        items.pop();
    }
    return values;
}

int main() {
    assert(topToBottom(sortStack(stackOf({34, 3, 31}))) == vector<int>({34, 31, 3}));
    assert(topToBottom(sortStack(stackOf({2, 1, 3}))) == vector<int>({3, 2, 1}));
    assert(topToBottom(sortStack(stackOf({5, 5, 1}))) == vector<int>({5, 5, 1}));  // duplicates
    assert(topToBottom(sortStack(stackOf({-1, 4}))) == vector<int>({4, -1}));      // negatives
    assert(sortStack(stack<int>()).empty());
    cout << "All tests passed\n";
}
```

**Complexity:** O(n^2) time in the worst case, because an item can move back and forth for each other item. O(n) space for the second stack.

### P9. Removing Stars From a String ([LeetCode 2390](https://leetcode.com/problems/removing-stars-from-a-string/), Medium)

**Problem:** Each `*` removes itself and the closest non-star character to its left. Return the result.

**Example:** `"leet**cod*e"` gives `"lecoe"`.

**Pattern:** Stack simulation

**How to recognize it:** "Closest to its left" means the most recent character still there. This is backspace again, under a different name.

**Key idea:** A star pops. Any other character pushes.

```cpp
#include <bits/stdc++.h>
#include <cassert>
using namespace std;

class Solution {
public:
    string removeStars(string s) {
        string result;
        for (char c : s) {
            if (c == '*') result.pop_back();  // the problem guarantees a character to remove
            else result.push_back(c);
        }
        return result;
    }
};

int main() {
    Solution solution;
    assert(solution.removeStars("leet**cod*e") == "lecoe");
    assert(solution.removeStars("erase*****") == "");
    assert(solution.removeStars("abc") == "abc");
    cout << "All tests passed\n";
}
```

**Complexity:** O(n) time and space. Using `erase` on the string instead would be O(n^2).

### P10. Min Stack ([LeetCode 155](https://leetcode.com/problems/min-stack/), Medium)

**Problem:** Build a stack with `push`, `pop`, `top` and `getMin`, all in O(1) time.

**Example:** Push -2, 0, -3. `getMin` gives -3. After `pop`, `top` gives 0 and `getMin` gives -2.

**Pattern:** Design: data structure

**How to recognize it:** "O(1) minimum" with removals. One variable cannot do it, because when the minimum is popped, you need the one before it.

**Brute force:** Scan the stack on each `getMin`, which is O(n).

**Key idea:** The minimum can only change when an item is pushed or popped. So at each level of the stack, remember the minimum of everything at or below that level. Popping then restores the old minimum by itself.

**Dry run:** the first way, with one stack of pairs.

| Operation | Stack (bottom to top) as value, min | `getMin` |
|---|---|---|
| push(-2) | (-2, -2) | -2 |
| push(0) | (-2, -2), (0, -2) | -2 |
| push(-3) | (-2, -2), (0, -2), (-3, -3) | -3 |
| pop() | (-2, -2), (0, -2) | -2 |

**Way 1** stores the pair. **Way 2** uses a second stack that holds only each new minimum, which saves space when the minimum rarely changes. Way 2 must push on `value <= minimum`, not `<`, or popping one of two equal minimums would lose it.

```cpp
#include <bits/stdc++.h>
#include <cassert>
using namespace std;

// Way 1: each level stores its value and the minimum so far.
class MinStack {
    vector<pair<int, int>> items;  // value, minimum at or below this level

public:
    void push(int val) {
        int minimum = items.empty() ? val : min(val, items.back().second);
        items.push_back({val, minimum});
    }
    void pop() { items.pop_back(); }
    int top() { return items.back().first; }
    int getMin() { return items.back().second; }
};

// Way 2: a second stack holds only the minimums.
class MinStackTwoStacks {
    stack<int> values;
    stack<int> minimums;

public:
    void push(int val) {
        values.push(val);
        if (minimums.empty() || val <= minimums.top()) minimums.push(val);  // <= keeps duplicates
    }
    void pop() {
        if (values.top() == minimums.top()) minimums.pop();
        values.pop();
    }
    int top() { return values.top(); }
    int getMin() { return minimums.top(); }
};

template <typename Stack>
void test() {
    Stack stack;
    stack.push(-2);
    stack.push(0);
    stack.push(-3);
    assert(stack.getMin() == -3);
    stack.pop();
    assert(stack.top() == 0 && stack.getMin() == -2);

    Stack duplicates;
    duplicates.push(1);
    duplicates.push(1);       // two equal minimums
    duplicates.pop();
    assert(duplicates.getMin() == 1);

    Stack limits;
    limits.push(INT_MAX);
    limits.push(INT_MIN);
    assert(limits.getMin() == INT_MIN);
    limits.pop();
    assert(limits.getMin() == INT_MAX);
}

int main() {
    test<MinStack>();
    test<MinStackTwoStacks>();
    cout << "All tests passed\n";
}
```

**Complexity:** O(1) time for every operation. O(n) space. Way 2 can use less, but its worst case is the same.

### P11. Simplify Path ([LeetCode 71](https://leetcode.com/problems/simplify-path/), Medium)

**Problem:** Convert an absolute Unix path to its simple form. `.` means the current folder. `..` means the parent folder. Many slashes count as one. Any other name, including `...`, is a folder name.

**Example:** `"/home/user/Documents/../Pictures"` gives `"/home/user/Pictures"`.

**Pattern:** Stack simulation, String parsing

**How to recognize it:** `..` goes back one level, which undoes the most recent folder. That is a pop.

**Key idea:** Split on `/`. Skip empty parts and `.`. For `..`, pop if you can. Push anything else. Then join the stack with slashes.

```cpp
#include <bits/stdc++.h>
#include <cassert>
using namespace std;

class Solution {
public:
    string simplifyPath(string path) {
        vector<string> folders;  // a vector used as a stack, so that it can be joined at the end
        stringstream stream(path);
        string part;
        while (getline(stream, part, '/')) {
            if (part.empty() || part == ".") continue;
            if (part == "..") {
                if (!folders.empty()) folders.pop_back();  // the root has no parent
            } else {
                folders.push_back(part);
            }
        }
        string result;
        for (const string& folder : folders) result += "/" + folder;
        return result.empty() ? "/" : result;
    }
};

int main() {
    Solution solution;
    assert(solution.simplifyPath("/home/") == "/home");
    assert(solution.simplifyPath("/home//foo/") == "/home/foo");
    assert(solution.simplifyPath("/home/user/Documents/../Pictures") == "/home/user/Pictures");
    assert(solution.simplifyPath("/../") == "/");
    assert(solution.simplifyPath("/.../a/../b/c/../d/./") == "/.../b/d");  // ... is a real name
    assert(solution.simplifyPath("/") == "/");
    cout << "All tests passed\n";
}
```

**Complexity:** O(n) time and space.

### P12. Validate Stack Sequences ([LeetCode 946](https://leetcode.com/problems/validate-stack-sequences/), Medium)

**Problem:** `pushed` and `popped` are two orderings of the same distinct values. Decide whether they could be the result of push and pop operations on an empty stack.

**Example:** `pushed = [1, 2, 3, 4, 5]`, `popped = [4, 5, 3, 2, 1]` gives `true`.

**Pattern:** Stack simulation

**How to recognize it:** The problem describes a real stack, so the simplest thing is to run one.

**Key idea:** Push the values in order. After each push, pop for as long as the top equals the next value in `popped`. Popping as soon as you can is always safe, because the values are distinct, so waiting can never help. At the end, the stack must be empty.

**Dry run:** on the example.

| Push | Pops | Stack after |
|---|---|---|
| 1 | none | 1 |
| 2 | none | 1, 2 |
| 3 | none | 1, 2, 3 |
| 4 | 4 | 1, 2, 3 |
| 5 | 5, 3, 2, 1 | empty |

```cpp
#include <bits/stdc++.h>
#include <cassert>
using namespace std;

class Solution {
public:
    bool validateStackSequences(vector<int>& pushed, vector<int>& popped) {
        stack<int> items;
        int nextPop = 0;
        for (int value : pushed) {
            items.push(value);
            while (!items.empty() && items.top() == popped[nextPop]) {
                items.pop();
                nextPop++;
            }
        }
        return items.empty();
    }
};

int main() {
    Solution solution;
    vector<int> pushed = {1, 2, 3, 4, 5};
    vector<int> a = {4, 5, 3, 2, 1};
    assert(solution.validateStackSequences(pushed, a));
    vector<int> b = {4, 3, 5, 1, 2};
    assert(!solution.validateStackSequences(pushed, b));  // 1 cannot leave before 2
    vector<int> one = {7};
    assert(solution.validateStackSequences(one, one));
    cout << "All tests passed\n";
}
```

**Complexity:** O(n) time, because each value is pushed and popped once. O(n) space.

### P13. Asteroid Collision ([LeetCode 735](https://leetcode.com/problems/asteroid-collision/), Medium)

**Problem:** Each number is an asteroid. Its size is the absolute value, and its sign is its direction: positive moves right, negative moves left. When two meet, the smaller one explodes, and equal sizes both explode. Asteroids moving the same way never meet. Return what is left.

**Example:** `[5, 10, -5]` gives `[5, 10]`. `[8, -8]` gives `[]`.

**Pattern:** Stack simulation

**How to recognize it:** A new asteroid can destroy several earlier ones, the most recent first. That is the "new item fights the top" shape.

**Key idea:** A collision happens only when the top moves right and the new asteroid moves left. While that is true, compare sizes. The new asteroid survives only if it destroys everything in its way.

**Dry run:** on `[10, 2, -5]`.

| Asteroid | Stack before | What happens | Stack after |
|---|---|---|---|
| 10 | empty | no collision | 10 |
| 2 | 10 | same direction | 10, 2 |
| -5 | 10, 2 | 2 explodes, then -5 explodes against 10 | 10 |

```cpp
#include <bits/stdc++.h>
#include <cassert>
using namespace std;

class Solution {
public:
    vector<int> asteroidCollision(vector<int>& asteroids) {
        vector<int> alive;
        for (int asteroid : asteroids) {
            bool survives = true;
            while (survives && asteroid < 0 && !alive.empty() && alive.back() > 0) {
                int top = alive.back();
                if (top <= -asteroid) alive.pop_back();  // the top explodes
                if (top >= -asteroid) survives = false;  // the new one explodes
            }
            if (survives) alive.push_back(asteroid);
        }
        return alive;
    }
};

int main() {
    Solution solution;
    vector<int> a = {5, 10, -5};
    assert(solution.asteroidCollision(a) == vector<int>({5, 10}));
    vector<int> b = {8, -8};
    assert(solution.asteroidCollision(b).empty());          // equal sizes
    vector<int> c = {10, 2, -5};
    assert(solution.asteroidCollision(c) == vector<int>({10}));
    vector<int> d = {-2, -1, 1, 2};
    assert(solution.asteroidCollision(d) == d);             // moving apart, so no collision
    vector<int> e = {1, 2, 3, -10};
    assert(solution.asteroidCollision(e) == vector<int>({-10}));  // one destroys all
    cout << "All tests passed\n";
}
```

**Complexity:** O(n) time, because each asteroid is pushed and popped at most once. O(n) space.

**Edge cases:** `[-2, -1, 1, 2]` has no collision, because the left group moves left and the right group moves right. Equal sizes must remove both, which is why the code has two separate `if`s.

### P14. Decode String ([LeetCode 394](https://leetcode.com/problems/decode-string/), Medium)

**Problem:** A string encodes repeats as `k[text]`, which means `text` written k times. Brackets can be nested. Return the decoded string.

**Example:** `"3[a2[c]]"` gives `"accaccacc"`.

**Pattern:** Stack simulation

**How to recognize it:** "Nested" brackets. An inner group must finish before the outer one can continue, so the outer state must wait. Waiting state means a stack.

**Key idea:** Keep the current text and the current number. On `[`, push both, and start fresh. On `]`, pop the outer text and the count, then add the inner text that many times.

**Dry run:** on `"3[a2[c]]"`.

| Character | Action | current | Stack after (count, saved text) |
|---|---|---|---|
| `3` | read the number | empty | empty |
| `[` | save, start fresh | empty | (3, empty) |
| `a` | add | `a` | (3, empty) |
| `2` | read the number | `a` | (3, empty) |
| `[` | save, start fresh | empty | (3, empty), (2, `a`) |
| `c` | add | `c` | (3, empty), (2, `a`) |
| `]` | `a` + 2 times `c` | `acc` | (3, empty) |
| `]` | empty + 3 times `acc` | `accaccacc` | empty |

```cpp
#include <bits/stdc++.h>
#include <cassert>
using namespace std;

class Solution {
public:
    string decodeString(string s) {
        vector<pair<int, string>> saved;  // the repeat count, and the text before the bracket
        string current;
        int number = 0;
        for (char c : s) {
            if (isdigit((unsigned char)c)) {
                number = number * 10 + (c - '0');  // a count can have several digits
            } else if (c == '[') {
                saved.push_back({number, current});
                number = 0;
                current.clear();
            } else if (c == ']') {
                auto [count, outer] = saved.back();
                saved.pop_back();
                for (int i = 0; i < count; i++) outer += current;
                current = outer;
            } else {
                current += c;
            }
        }
        return current;
    }
};

int main() {
    Solution solution;
    assert(solution.decodeString("3[a]2[bc]") == "aaabcbc");
    assert(solution.decodeString("3[a2[c]]") == "accaccacc");
    assert(solution.decodeString("2[abc]3[cd]ef") == "abcabccdcdcdef");
    assert(solution.decodeString("abc") == "abc");                // nothing to decode
    assert(solution.decodeString("10[a]") == string(10, 'a'));    // a two-digit count
    cout << "All tests passed\n";
}
```

**Complexity:** O(L) time and space, where L is the length of the decoded output, plus the input length.

### P15. Remove All Adjacent Duplicates in String II ([LeetCode 1209](https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string-ii/), Medium)

**Problem:** Repeatedly remove k equal neighbouring letters until no such group is left. Return the result.

**Example:** `"deeedbbcccbdaa"` with `k = 3` gives `"aa"`.

**Pattern:** Stack simulation

**How to recognize it:** The same chaining as [P4](#p4-remove-all-adjacent-duplicates-in-string-leetcode-1047-easy), but a group needs k letters. So the top must remember how many letters it holds.

**Key idea:** Store pairs of (letter, count). If the new letter matches the top, add 1 to its count, and pop the pair when the count reaches k. Otherwise push a new pair with a count of 1.

```cpp
#include <bits/stdc++.h>
#include <cassert>
using namespace std;

class Solution {
public:
    string removeDuplicates(string s, int k) {
        vector<pair<char, int>> groups;
        for (char c : s) {
            if (!groups.empty() && groups.back().first == c) {
                groups.back().second++;
                if (groups.back().second == k) groups.pop_back();
            } else {
                groups.push_back({c, 1});
            }
        }
        string result;
        for (const auto& [letter, count] : groups) result += string(count, letter);
        return result;
    }
};

int main() {
    Solution solution;
    assert(solution.removeDuplicates("abcd", 2) == "abcd");
    assert(solution.removeDuplicates("deeedbbcccbdaa", 3) == "aa");
    assert(solution.removeDuplicates("pbbcggttciiippooaais", 2) == "ps");
    assert(solution.removeDuplicates("aaa", 3) == "");
    cout << "All tests passed\n";
}
```

**Complexity:** O(n) time and space.

### P16. Exclusive Time of Functions ([LeetCode 636](https://leetcode.com/problems/exclusive-time-of-functions/), Medium)

**Problem:** A single CPU runs n functions, and functions can call each other. Logs have the form `"id:start:time"` or `"id:end:time"`, sorted by time. Time is measured in whole units, so a function that starts at 2 and ends at 5 runs for 4 units. Return the time spent in each function, not counting the functions it called.

**Example:** With `n = 2` and `["0:start:0", "1:start:2", "1:end:5", "0:end:6"]`, the answer is `[3, 4]`.

**Pattern:** Stack simulation, String parsing

**How to recognize it:** Function calls nest, and the running function is the most recent one that has not ended. This is the call stack from [section 5](#5-the-call-stack).

**Key idea:** Keep the running functions on a stack, and `previous`, the time when the current slice of work began. Each log closes a slice that belongs to the function on top. An end time is inclusive, so that slice is one longer, and the next slice starts at `time + 1`.

**Dry run:** on the example.

| Log | Slice goes to | Length | Totals | previous |
|---|---|---|---|---|
| 0 start 0 | none | | 0, 0 | 0 |
| 1 start 2 | function 0 | 2 - 0 = 2 | 2, 0 | 2 |
| 1 end 5 | function 1 | 5 - 2 + 1 = 4 | 2, 4 | 6 |
| 0 end 6 | function 0 | 6 - 6 + 1 = 1 | 3, 4 | 7 |

```cpp
#include <bits/stdc++.h>
#include <cassert>
using namespace std;

class Solution {
public:
    vector<int> exclusiveTime(int n, vector<string>& logs) {
        vector<int> total(n, 0);
        stack<int> running;
        int previous = 0;  // when the current slice of work began
        for (const string& log : logs) {
            size_t firstColon = log.find(':');
            size_t lastColon = log.rfind(':');
            int id = stoi(log.substr(0, firstColon));
            int time = stoi(log.substr(lastColon + 1));
            bool isStart = log[firstColon + 1] == 's';

            if (isStart) {
                if (!running.empty()) total[running.top()] += time - previous;
                running.push(id);
                previous = time;
            } else {
                total[running.top()] += time - previous + 1;  // the end time is inclusive
                running.pop();
                previous = time + 1;
            }
        }
        return total;
    }
};

int main() {
    Solution solution;
    vector<string> a = {"0:start:0", "1:start:2", "1:end:5", "0:end:6"};
    assert(solution.exclusiveTime(2, a) == vector<int>({3, 4}));
    vector<string> b = {"0:start:0", "0:start:2", "0:end:5", "0:start:6", "0:end:6", "0:end:7"};
    assert(solution.exclusiveTime(1, b) == vector<int>({8}));  // a function calling itself
    vector<string> c = {"0:start:0", "0:start:2", "0:end:5", "1:start:6", "1:end:6", "0:end:7"};
    assert(solution.exclusiveTime(2, c) == vector<int>({7, 1}));
    cout << "All tests passed\n";
}
```

**Complexity:** O(m) time, where m is the number of logs, because each log has a fixed small size. O(m) space for the stack.

### P17. Two Stacks in One Array (Classic, Medium)

**Problem:** Build two stacks that share one array of fixed size. A push should fail only when the whole array is full.

**Example:** With capacity 5, stack 1 can hold 3 items while stack 2 holds 2.

**Pattern:** Data structure implementation

**How to recognize it:** "Share one array" and "use the space fully". Splitting the array in half would fail when one stack is large and the other small.

**Key idea:** Grow the stacks toward each other. Stack 1 starts at the left, and stack 2 starts at the right. The array is full when their tops are neighbours.

```text
[ 1  2  3  _  5 ]
        ^     ^
      top1   top2

Full when top1 + 1 == top2.
```

```cpp
#include <bits/stdc++.h>
#include <cassert>
using namespace std;

class TwoStacks {
    vector<int> slots;
    int top1 = -1;
    int top2;

public:
    explicit TwoStacks(int capacity) : slots(capacity), top2(capacity) {}

    bool full() const { return top1 + 1 == top2; }

    bool push1(int value) {
        if (full()) return false;
        slots[++top1] = value;
        return true;
    }

    bool push2(int value) {
        if (full()) return false;
        slots[--top2] = value;
        return true;
    }

    int pop1() {
        if (top1 == -1) throw underflow_error("stack 1 is empty");
        return slots[top1--];
    }

    int pop2() {
        if (top2 == (int)slots.size()) throw underflow_error("stack 2 is empty");
        return slots[top2++];
    }
};

int main() {
    TwoStacks stacks(5);
    assert(stacks.push1(1) && stacks.push2(5) && stacks.push1(2) && stacks.push2(4) && stacks.push1(3));
    assert(!stacks.push1(9) && !stacks.push2(9));  // all 5 slots are used
    assert(stacks.pop1() == 3 && stacks.pop2() == 4);
    assert(stacks.push2(8));                       // a freed slot can go to either stack
    assert(stacks.pop2() == 8 && stacks.pop2() == 5);

    bool threw = false;
    try {
        stacks.pop2();                             // stack 2 is empty now
    } catch (const underflow_error&) {
        threw = true;
    }
    assert(threw);

    TwoStacks empty(0);
    assert(empty.full() && !empty.push1(1));       // no space at all
    cout << "All tests passed\n";
}
```

**Complexity:** O(1) time per operation, and O(n) space for the array.

### P18. K Stacks in One Array (Classic, Hard)

**Problem:** Build k stacks that share one array of size n. A push should fail only when the whole array is full.

**Example:** With k = 3 and n = 4, stack 2 can hold all 4 items, or the items can be split in any way.

**Pattern:** Data structure implementation

**How to recognize it:** More than two stacks, so growing from the ends no longer works. Each stack's items can be anywhere, so they must be linked.

**Key idea:** Use array indexes as pointers.

- `data[i]` holds a value.
- `nextSlot[i]` says which slot is below this one in its stack. For a free slot, it says which free slot is next.
- `topOf[s]` is the top slot of stack s, or -1.
- `freeSlot` is the first free slot.

A push takes a slot from the free list. A pop gives its slot back. Each stack is a linked list that lives inside the arrays. [Array-based lists and memory](10-array-based-lists-and-memory.md) uses the same idea.

**Dry run:** with k = 2 and n = 3.

| Operation | data | nextSlot | topOf | freeSlot |
|---|---|---|---|---|
| start | `_ _ _` | 1, 2, -1 | -1, -1 | 0 |
| push(0, 10) | `10 _ _` | -1, 2, -1 | 0, -1 | 1 |
| push(1, 20) | `10 20 _` | -1, -1, -1 | 0, 1 | 2 |
| push(0, 30) | `10 20 30` | -1, -1, 0 | 2, 1 | -1 |
| pop(0) gives 30 | `10 20 30` | -1, -1, -1 | 0, 1 | 2 |

```cpp
#include <bits/stdc++.h>
#include <cassert>
using namespace std;

class KStacks {
    vector<int> data;
    vector<int> nextSlot;
    vector<int> topOf;
    int freeSlot;

public:
    KStacks(int k, int capacity) : data(capacity), nextSlot(capacity), topOf(k, -1), freeSlot(capacity > 0 ? 0 : -1) {
        for (int i = 0; i < capacity; i++) nextSlot[i] = i + 1;
        if (capacity > 0) nextSlot[capacity - 1] = -1;
    }

    bool empty(int stackId) const { return topOf[stackId] == -1; }

    bool push(int stackId, int value) {
        if (freeSlot == -1) return false;
        int slot = freeSlot;
        freeSlot = nextSlot[slot];         // take a slot from the free list
        data[slot] = value;
        nextSlot[slot] = topOf[stackId];   // link it above the old top
        topOf[stackId] = slot;
        return true;
    }

    int pop(int stackId) {
        if (empty(stackId)) throw underflow_error("stack is empty");
        int slot = topOf[stackId];
        topOf[stackId] = nextSlot[slot];
        nextSlot[slot] = freeSlot;         // give the slot back
        freeSlot = slot;
        return data[slot];
    }
};

int main() {
    KStacks stacks(2, 3);
    assert(stacks.push(0, 10) && stacks.push(1, 20) && stacks.push(0, 30));
    assert(!stacks.push(1, 99));           // all 3 slots are used
    assert(stacks.pop(0) == 30 && stacks.pop(0) == 10 && stacks.pop(1) == 20);
    assert(stacks.empty(0) && stacks.empty(1));

    // Random steps must match k real stacks that share a limit of capacity items.
    const int k = 4, capacity = 12;
    KStacks mine(k, capacity);
    vector<stack<int>> model(k);
    int used = 0;
    mt19937 rng(99);
    for (int step = 0; step < 20000; step++) {
        int id = (int)(rng() % k);
        if (rng() % 2 == 0) {
            int value = (int)(rng() % 1000);
            bool pushed = mine.push(id, value);
            assert(pushed == (used < capacity));
            if (pushed) {
                model[id].push(value);
                used++;
            }
        } else if (!model[id].empty()) {
            assert(mine.pop(id) == model[id].top());
            model[id].pop();
            used--;
        }
        assert(mine.empty(id) == model[id].empty());
    }
    cout << "All tests passed\n";
}
```

**Complexity:** O(1) time per operation. O(n + k) space for the arrays.

## Common pitfalls

1. **Calling `top()` or `pop()` on an empty stack.** It is undefined behaviour. Check `empty()` first, and read each condition from left to right: `!s.empty() && s.top() == x`.
2. **Expecting `pop()` to return a value.** `std::stack::pop()` returns nothing. Read `top()` first.
3. **Forgetting to check the stack at the end.** In [P1](#p1-valid-parentheses-leetcode-20-easy), `"(("` never fails during the loop. It fails only because the stack is not empty.
4. **Using `<` in a min stack with two stacks.** Equal minimums must all be stored, so use `<=`.
5. **Using `string::erase` for a backspace.** Removing from the end with `pop_back` is O(1). `erase` at a middle index is O(n).
6. **Reading a multi-digit count one digit at a time.** In `"12[a]"` the count is 12. Build it with `number * 10 + digit`.
7. **Treating a recursive solution as O(1) space.** The call stack holds a frame for each level.
8. **Using a stack when a counter is enough.** With one bracket type, a counter gives O(1) space.

## Practice list

- [ ] [Crawler Log Folder](https://leetcode.com/problems/crawler-log-folder/) (LeetCode 1598, Easy): you only need the depth.
- [ ] [Make The String Great](https://leetcode.com/problems/make-the-string-great/) (LeetCode 1544, Easy): pop when the new letter is the top in the other case.
- [ ] [Remove Outermost Parentheses](https://leetcode.com/problems/remove-outermost-parentheses/) (LeetCode 1021, Easy): track the depth.
- [ ] [Minimum String Length After Removing Substrings](https://leetcode.com/problems/minimum-string-length-after-removing-substrings/) (LeetCode 2696, Easy): pop when the top and the new letter form `AB` or `CD`.
- [ ] [Build an Array With Stack Operations](https://leetcode.com/problems/build-an-array-with-stack-operations/) (LeetCode 1441, Medium): simulate the pushes and pops.
- [ ] [Reverse Substrings Between Each Pair of Parentheses](https://leetcode.com/problems/reverse-substrings-between-each-pair-of-parentheses/) (LeetCode 1190, Medium): push the start index of each opening bracket.
- [ ] [Check If Word Is Valid After Substitutions](https://leetcode.com/problems/check-if-word-is-valid-after-substitutions/) (LeetCode 1003, Medium): pop `abc` whenever it forms on top.
- [ ] [Using a Robot to Print the Lexicographically Smallest String](https://leetcode.com/problems/using-a-robot-to-print-the-lexicographically-smallest-string/) (LeetCode 2434, Medium): pop while the top is no larger than anything still to come.

## Interview questions

<details>
<summary><strong>Q1. How do you know that a problem needs a stack?</strong></summary>

I look for items that stay unfinished until something later arrives, with the most recent one finished first. Brackets, undo, nested structures and function calls all behave this way. If a new item only ever has to look at the most recent open item, a stack gives that in O(1), and the whole scan is O(n), because each item is pushed and popped at most once.

</details>

<details>
<summary><strong>Q2. Would you build a stack on an array or on a linked list?</strong></summary>

On a growing array, in most cases. Its items sit together in memory, so it is faster in practice, and the push is O(1) amortized. A linked list gives a true O(1) worst case for each push, which can matter if a single slow operation is not acceptable, but it needs one allocation and one extra pointer per item.

</details>

<details>
<summary><strong>Q3. How does Min Stack get O(1) minimum, even after a pop?</strong></summary>

Each level stores the minimum of everything at or below it. A pop removes that level, and the level below already holds the correct older minimum, so nothing has to be recomputed. With two stacks, the second holds only new minimums, and I push on `<=` so that duplicates are not lost.

</details>

<details>
<summary><strong>Q4. What is the difference between stack overflow in a data structure and in a program?</strong></summary>

Overflow of a data structure means a push to a full fixed-size stack, and it is an error that you can handle. Stack overflow in a program means the function call stack ran out of space, usually from recursion that is too deep, and it normally crashes the program. They share a name because the call stack is a real stack.

</details>

<details>
<summary><strong>Q5. Why is Asteroid Collision O(n) when one asteroid can destroy many?</strong></summary>

Each asteroid is pushed at most once and popped at most once. A single step may pop many items, but the total number of pops over the whole run is at most n. So the total work is O(n). This is amortized analysis: count the total work, not the worst single step.

</details>
