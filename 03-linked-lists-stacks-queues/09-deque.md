# Deque: Double-Ended Queue

> **Level:** Beginner · **Priority:** T1 · **Time:** 90 min · **Read first:** [Circular queue and ring buffer](08-circular-queue.md), [Doubly linked list](02-doubly-linked-list.md) · **Next:** [Array-based lists and memory](10-array-based-lists-and-memory.md)

A deque (say "deck") lets you add and remove at both ends in O(1). It can act as a stack, a queue, or both at once, and it is the engine behind sliding window maximum and 0-1 BFS. This chapter builds one in two ways, and shows when a problem needs one.

## Quick revision

- A **deque** is a double-ended queue. It has `pushFront`, `pushBack`, `popFront`, `popBack`, `front` and `back`, all O(1).
- A deque used at one end only is a stack. Used at opposite ends, it is a queue.
- **Circular array version:** keep `head` and `count`. The last item is at `(head + count - 1) % capacity`.
- Moving `head` back: `head = (head - 1 + capacity) % capacity`. Without the `+ capacity`, the result can be negative.
- **Doubly linked list version:** two sentinels, and O(1) at both ends, with one allocation per item.
- `std::deque` stores items in fixed-size blocks, with a table of pointers to the blocks. So `d[i]` is O(1), with an extra step compared with `vector`.
- `std::stack` and `std::queue` use `std::deque` underneath by default.
- Inserting in the middle of a deque is O(n), just like a `vector`.
- **Input-restricted:** add at one end, remove at both. **Output-restricted:** add at both ends, remove at one.
- **The deque signal:** you must remove from the end that you add to, and also from the other end.
- Sliding window maximum needs a deque: old items leave at the front, and useless items leave at the back.
- 0-1 BFS needs a deque: cost-0 moves go to the front, and cost-1 moves go to the back.
- **Two deques** can track the middle of a sequence, if you keep their sizes balanced.

## How to recognize it

For a data structure, recognition means asking which operations must be fast. If the answer to question 1 is yes, use a deque.

1. Do you need to add or remove at **both** ends?
2. Do items leave from the front because they are too old, and also from the back because they became useless?
3. Do some new items need to jump ahead of everything else?
4. Do you need access to the middle of a sequence that changes only near its ends and its middle?

| Words in the problem | What they tell you |
|---|---|
| "front and back", "both ends" | A deque, directly |
| "design a circular deque" | A circular array with a size limit |
| "sliding window maximum or minimum" | A [monotonic queue](../05-core-patterns/13-monotonic-queue.md), built on a deque |
| "edges cost 0 or 1" | [0-1 BFS](../08-graphs/04-bfs-shortest-path-patterns.md) with a deque |
| "front, middle and back" | Two deques, kept balanced |
| "take from either end" | Often a window of what stays, not a real deque |
| "palindrome", comparing both ends | Works, but two indexes are simpler on a string |

**Not this structure if:**

| You see | Use instead | Why |
|---|---|---|
| You add and remove at one end only | [Stack](05-stack-from-zero.md) | `vector` is simpler and faster. |
| Add at one end, remove at the other | [Queue](07-queue-from-zero.md) | `std::queue` says what you mean. |
| Fixed size, in arrival order | [Circular queue](08-circular-queue.md) | A plain ring is smaller and simpler. |
| Heavy use of `[]` or sorting | [Vector](../02-arrays-strings-hashing/01-arrays-from-zero.md) | Its items sit in one block, so it is faster. |
| Many inserts in the middle | [Doubly linked list](02-doubly-linked-list.md) | A deque must shift items. |
| Always remove the smallest | [Heap](../07-trees/11-heap-from-zero.md) | A deque keeps order by position, not by value. |

## 1. The idea in plain English

Think of a deck of cards on a table. You can put a card on the top or on the bottom. You can take a card from the top or from the bottom. You do not touch the middle.

```text
pushBack(10)      [10]
pushBack(20)      [10, 20]
pushFront(5)      [5, 10, 20]
popBack() -> 20   [5, 10]
popFront() -> 5   [10]
```

Now compare it with the structures you know.

| Structure | Add | Remove |
|---|---|---|
| Stack | one end | the same end |
| Queue | one end | the other end |
| Deque | both ends | both ends |

## 2. Deque with a circular array

A [circular queue](08-circular-queue.md) already wraps its indexes around a fixed array. A deque is the same ring, with one more move: `head` can step backward too.

Keep `head`, the index of the first item, and `count`. Everything else follows.

| Operation | What changes |
|---|---|
| `pushBack` | Write at `(head + count) % capacity`, then `count++` |
| `pushFront` | `head = (head - 1 + capacity) % capacity`, write there, then `count++` |
| `popFront` | Read at `head`, then `head = (head + 1) % capacity`, `count--` |
| `popBack` | `count--`, then read at `(head + count) % capacity` |

The `+ capacity` matters. In C++, `-1 % 4` is `-1`, which is not a valid index.

Watch `head` wrap backward in an array of 4 slots. The reading order always starts at `head`.

```text
start                       [ _,  _,  _,  _]   head = 0, count = 0
pushBack(10)                [10,  _,  _,  _]   head = 0, count = 1
pushBack(20)                [10, 20,  _,  _]   head = 0, count = 2
pushFront(5), head wraps    [10, 20,  _,  5]   head = 3, count = 3     reads 5, 10, 20
pushFront(1), head steps    [10, 20,  1,  5]   head = 2, count = 4     reads 1, 5, 10, 20
```

When the array is full, this version grows. A plain copy would break the order, because the first item may be in the middle of the array. So the code copies the items in reading order, and resets `head` to 0.

```cpp
#include <bits/stdc++.h>
#include <cassert>
using namespace std;

class ArrayDeque {
    vector<int> slots;
    int head = 0;   // the index of the first item
    int count = 0;

    int capacity() const { return (int)slots.size(); }
    int slotOf(int position) const { return (head + position) % capacity(); }

    void growIfFull() {
        if (count < capacity()) return;
        vector<int> bigger(capacity() * 2);
        for (int i = 0; i < count; i++) bigger[i] = slots[slotOf(i)];  // copy in reading order
        slots = move(bigger);
        head = 0;
    }

    void requireNotEmpty() const {
        if (count == 0) throw out_of_range("deque is empty");
    }

public:
    explicit ArrayDeque(int startCapacity = 2) : slots(startCapacity) {}

    bool empty() const { return count == 0; }
    int size() const { return count; }

    int at(int position) const {
        if (position < 0 || position >= count) throw out_of_range("bad position");
        return slots[slotOf(position)];
    }

    int front() const {
        requireNotEmpty();
        return slots[head];
    }

    int back() const {
        requireNotEmpty();
        return slots[slotOf(count - 1)];
    }

    void pushBack(int value) {
        growIfFull();
        slots[slotOf(count)] = value;
        count++;
    }

    void pushFront(int value) {
        growIfFull();
        head = (head - 1 + capacity()) % capacity();
        slots[head] = value;
        count++;
    }

    int popFront() {
        requireNotEmpty();
        int value = slots[head];
        head = (head + 1) % capacity();
        count--;
        return value;
    }

    int popBack() {
        requireNotEmpty();
        count--;
        return slots[slotOf(count)];
    }
};

void show(const string& action, const ArrayDeque& items) {
    cout << left << setw(18) << action << "[";
    for (int i = 0; i < items.size(); i++) cout << (i ? ", " : "") << items.at(i);
    cout << "]\n";
}

int main() {
    ArrayDeque items;
    items.pushBack(10);
    show("pushBack(10)", items);
    items.pushBack(20);
    show("pushBack(20)", items);
    items.pushFront(5);          // the array is full, so it grows here
    show("pushFront(5)", items);
    items.pushFront(1);
    show("pushFront(1)", items);
    assert(items.front() == 1 && items.back() == 20 && items.at(2) == 10);
    assert(items.popBack() == 20);
    show("popBack() -> 20", items);
    assert(items.popFront() == 1);
    show("popFront() -> 1", items);
    assert(items.popFront() == 5 && items.popBack() == 10 && items.empty());
    show("empty again", items);

    bool threw = false;
    try {
        items.popFront();
    } catch (const out_of_range&) {
        threw = true;
    }
    assert(threw);

    // Random steps must match std::deque. The seed is fixed.
    ArrayDeque mine(1);
    deque<int> model;
    mt19937 rng(21);
    for (int step = 0; step < 20000; step++) {
        int choice = (int)(rng() % 4), value = (int)(rng() % 1000);
        if (choice == 0) {
            mine.pushBack(value);
            model.push_back(value);
        } else if (choice == 1) {
            mine.pushFront(value);
            model.push_front(value);
        } else if (choice == 2 && !model.empty()) {
            assert(mine.popFront() == model.front());
            model.pop_front();
        } else if (choice == 3 && !model.empty()) {
            assert(mine.popBack() == model.back());
            model.pop_back();
        }
        assert(mine.size() == (int)model.size());
        if (!model.empty()) assert(mine.front() == model.front() && mine.back() == model.back());
    }
    cout << "All tests passed\n";
}
```

```text output
pushBack(10)      [10]
pushBack(20)      [10, 20]
pushFront(5)      [5, 10, 20]
pushFront(1)      [1, 5, 10, 20]
popBack() -> 20   [1, 5, 10]
popFront() -> 1   [5, 10]
empty again       []
All tests passed
```

Every operation is O(1). The pushes are amortized, because of the occasional growth, and `at(i)` is O(1) too.

## 3. Deque with a doubly linked list

A [doubly linked list](02-doubly-linked-list.md) is already a deque: each end is one pointer away, and each node knows both neighbours. With two sentinel nodes, all four operations share two small helpers.

```cpp
#include <bits/stdc++.h>
#include <cassert>
using namespace std;

class LinkedDeque {
    struct Node {
        int value;
        Node* prev;
        Node* next;
    };
    Node* head;  // a sentinel before the first item
    Node* tail;  // a sentinel after the last item

    void insertBetween(Node* before, Node* after, int value) {
        Node* node = new Node{value, before, after};
        before->next = node;
        after->prev = node;
    }

    int remove(Node* node) {
        node->prev->next = node->next;
        node->next->prev = node->prev;
        int value = node->value;
        delete node;
        return value;
    }

    void requireNotEmpty() const {
        if (empty()) throw out_of_range("deque is empty");
    }

public:
    LinkedDeque() : head(new Node{0, nullptr, nullptr}), tail(new Node{0, nullptr, nullptr}) {
        head->next = tail;
        tail->prev = head;
    }

    ~LinkedDeque() {
        while (head != nullptr) {
            Node* following = head->next;
            delete head;
            head = following;
        }
    }

    LinkedDeque(const LinkedDeque&) = delete;
    LinkedDeque& operator=(const LinkedDeque&) = delete;

    bool empty() const { return head->next == tail; }

    void pushFront(int value) { insertBetween(head, head->next, value); }
    void pushBack(int value) { insertBetween(tail->prev, tail, value); }

    int popFront() {
        requireNotEmpty();
        return remove(head->next);
    }

    int popBack() {
        requireNotEmpty();
        return remove(tail->prev);
    }

    int front() const {
        requireNotEmpty();
        return head->next->value;
    }

    int back() const {
        requireNotEmpty();
        return tail->prev->value;
    }
};

int main() {
    LinkedDeque items;
    items.pushBack(2);
    items.pushFront(1);
    items.pushBack(3);
    assert(items.front() == 1 && items.back() == 3);
    assert(items.popFront() == 1 && items.popBack() == 3 && items.popBack() == 2);
    assert(items.empty());

    LinkedDeque mine;
    deque<int> model;
    mt19937 rng(22);
    for (int step = 0; step < 20000; step++) {
        int choice = (int)(rng() % 4), value = (int)(rng() % 1000);
        if (choice == 0) {
            mine.pushBack(value);
            model.push_back(value);
        } else if (choice == 1) {
            mine.pushFront(value);
            model.push_front(value);
        } else if (choice == 2 && !model.empty()) {
            assert(mine.popFront() == model.front());
            model.pop_front();
        } else if (choice == 3 && !model.empty()) {
            assert(mine.popBack() == model.back());
            model.pop_back();
        }
        assert(mine.empty() == model.empty());
        if (!model.empty()) assert(mine.front() == model.front() && mine.back() == model.back());
    }
    cout << "All tests passed\n";
}
```

| Design | Ends | Read position i | Memory | Notes |
|---|---|---|---|---|
| Circular array | O(1) amortized | O(1) | One block, may be half unused | Fast, because the items sit together |
| Doubly linked list | O(1) | O(n) | Two pointers per item | One allocation per item |
| `std::deque` | O(1) amortized | O(1) | Blocks plus a table | The everyday choice |

## 4. `std::deque`

`std::deque` is neither a ring nor a list. It stores items in many small fixed-size blocks, plus a table of pointers to those blocks.

```text
table:   [ * ][ * ][ * ]
           |    |    |
           v    v    v
blocks: [_ _ 1][2 3 4][5 _ _]
             ^            ^
           front         back
```

- Adding at either end fills the end block, or adds a new block. Existing items never move.
- `d[i]` first finds the block, then the position inside it. It is O(1), but with one more step than `vector`.
- Because items do not move, pushing at either end keeps **references** to items valid. Iterators can still become invalid.

```cpp
#include <bits/stdc++.h>
#include <cassert>
using namespace std;

int main() {
    deque<int> items = {2, 3};
    items.push_front(1);
    items.push_back(4);
    assert(items[0] == 1 && items[3] == 4 && items.size() == 4);
    assert(items.front() == 1 && items.back() == 4);

    items.pop_front();
    items.pop_back();
    assert(vector<int>(items.begin(), items.end()) == vector<int>({2, 3}));

    int& second = items[1];   // a reference to the value 3
    items.push_front(0);
    items.push_back(9);
    assert(second == 3);      // pushing at the ends does not move existing items

    sort(items.begin(), items.end(), greater<int>());  // it has random access, so sort works
    assert(items.front() == 9);
    cout << "All tests passed\n";
}
```

## 5. Restricted deques

Textbooks name two limited forms.

| Type | Add at | Remove at |
|---|---|---|
| Input-restricted deque | one end only | both ends |
| Output-restricted deque | both ends | one end only |

They need no new code. You use a deque, and call only the allowed operations. A monotonic queue is close to the first form: new items enter at the back only, and items leave at both ends.

## 6. When a problem wants a deque

Most deque problems have this shape: items enter in order, and two different things can make an item leave.

- **Sliding window maximum.** An item leaves at the front when it is too old. An item leaves at the back when a newer, bigger item makes it useless. See [Monotonic queue](../05-core-patterns/13-monotonic-queue.md).
- **0-1 BFS.** A cost-0 move has the same distance as the current node, so it goes to the front. A cost-1 move goes to the back. See [BFS shortest path patterns](../08-graphs/04-bfs-shortest-path-patterns.md).
- **Tracking the middle.** Two deques split the sequence, and items cross between them. See [P4](#p4-design-front-middle-back-queue-leetcode-1670-medium).

## 7. Solved problems

### P1. Palindrome Check With a Deque (Classic, Easy)

**Problem:** Use a deque to decide whether a string reads the same forwards and backwards.

**Example:** `"level"` gives `true`, and `"levels"` gives `false`.

**Pattern:** Deque

**How to recognize it:** A palindrome compares the two ends, then moves inward. A deque gives you both ends directly, and it also works on a stream of characters whose length you do not know up front.

**Key idea:** Load the characters. While at least two remain, pop one from each end and compare them.

```cpp
#include <bits/stdc++.h>
#include <cassert>
using namespace std;

bool isPalindrome(const string& text) {
    deque<char> letters(text.begin(), text.end());
    while (letters.size() > 1) {
        char first = letters.front();
        char last = letters.back();
        letters.pop_front();
        letters.pop_back();
        if (first != last) return false;
    }
    return true;
}

int main() {
    assert(isPalindrome("level"));
    assert(isPalindrome("noon"));
    assert(!isPalindrome("levels"));
    assert(isPalindrome("") && isPalindrome("x"));
    cout << "All tests passed\n";
}
```

**Complexity:** O(n) time and O(n) space. On a string, two indexes do the same job in O(1) space, as in [Strings from zero](../02-arrays-strings-hashing/02-strings-from-zero.md). The deque is the better fit when characters arrive one at a time.

### P2. Implement a Stack and a Queue With a Deque (Classic, Easy)

**Problem:** Build a stack and a queue using one deque each.

**Example:** Push 1, 2, 3. The stack pops 3 first, and the queue pops 1 first.

**Pattern:** Deque

**How to recognize it:** This shows that a deque can do what each of them does. In fact, `std::stack` and `std::queue` use `std::deque` underneath by default.

**Key idea:** A stack uses one end for both add and remove. A queue uses one end for add and the other for remove.

```cpp
#include <bits/stdc++.h>
#include <cassert>
using namespace std;

class DequeStack {
    deque<int> items;

public:
    void push(int value) { items.push_back(value); }
    int pop() {
        int value = items.back();
        items.pop_back();
        return value;
    }
    bool empty() const { return items.empty(); }
};

class DequeQueue {
    deque<int> items;

public:
    void push(int value) { items.push_back(value); }
    int pop() {
        int value = items.front();
        items.pop_front();
        return value;
    }
    bool empty() const { return items.empty(); }
};

int main() {
    DequeStack stack1;
    DequeQueue queue1;
    for (int value : {1, 2, 3}) {
        stack1.push(value);
        queue1.push(value);
    }
    assert(stack1.pop() == 3 && stack1.pop() == 2);
    assert(queue1.pop() == 1 && queue1.pop() == 2);
    stack1.pop();
    queue1.pop();
    assert(stack1.empty() && queue1.empty());
    cout << "All tests passed\n";
}
```

**Complexity:** O(1) time per operation, and O(n) space.

### P3. Design Circular Deque ([LeetCode 641](https://leetcode.com/problems/design-circular-deque/), Medium)

**Problem:** Build a deque with a maximum size k. `insertFront`, `insertLast`, `deleteFront` and `deleteLast` return true on success. `getFront` and `getRear` return -1 if the deque is empty. Also build `isEmpty` and `isFull`.

**Example:** With k = 3: `insertLast(1)`, `insertLast(2)` and `insertFront(3)` succeed. `insertFront(4)` fails, because the deque is full.

**Pattern:** Circular buffer

**How to recognize it:** "Circular" and a fixed size k. No growth is needed, so this is the ring from [section 2](#2-deque-with-a-circular-array), with failure in place of growing.

**Key idea:** Keep `head` and `count`. Full is `count == k`, and empty is `count == 0`. Using a count avoids the "`head == tail` can mean empty or full" trap.

**Dry run:** with k = 3.

| Operation | Slots | head | count | Returns |
|---|---|---|---|---|
| insertLast(1) | `1 _ _` | 0 | 1 | true |
| insertLast(2) | `1 2 _` | 0 | 2 | true |
| insertFront(3) | `1 2 3` | 2 | 3 | true |
| insertFront(4) | `1 2 3` | 2 | 3 | false |
| getRear() | | | | 2 |
| deleteLast() | `1 _ 3` | 2 | 2 | true |
| insertFront(4) | `1 4 3` | 1 | 3 | true |
| getFront() | | | | 4 |

```cpp
#include <bits/stdc++.h>
#include <cassert>
using namespace std;

class MyCircularDeque {
    vector<int> slots;
    int head = 0;
    int count = 0;

public:
    MyCircularDeque(int k) : slots(k) {}

    bool insertFront(int value) {
        if (isFull()) return false;
        head = (head - 1 + (int)slots.size()) % (int)slots.size();
        slots[head] = value;
        count++;
        return true;
    }

    bool insertLast(int value) {
        if (isFull()) return false;
        slots[(head + count) % slots.size()] = value;
        count++;
        return true;
    }

    bool deleteFront() {
        if (isEmpty()) return false;
        head = (head + 1) % (int)slots.size();
        count--;
        return true;
    }

    bool deleteLast() {
        if (isEmpty()) return false;
        count--;
        return true;
    }

    int getFront() { return isEmpty() ? -1 : slots[head]; }
    int getRear() { return isEmpty() ? -1 : slots[(head + count - 1) % slots.size()]; }
    bool isEmpty() { return count == 0; }
    bool isFull() { return count == (int)slots.size(); }
};

int main() {
    MyCircularDeque items(3);
    assert(items.insertLast(1) && items.insertLast(2) && items.insertFront(3));
    assert(!items.insertFront(4));   // the deque is full
    assert(items.getRear() == 2);
    assert(items.isFull());
    assert(items.deleteLast());
    assert(items.insertFront(4));
    assert(items.getFront() == 4);

    MyCircularDeque single(1);
    assert(single.isEmpty() && single.getFront() == -1 && single.getRear() == -1);
    assert(!single.deleteFront() && !single.deleteLast());  // nothing to delete
    assert(single.insertFront(7) && single.getRear() == 7 && single.isFull());
    assert(single.deleteFront() && single.isEmpty());
    cout << "All tests passed\n";
}
```

**Complexity:** O(1) time per operation, and O(k) space.

### P4. Design Front Middle Back Queue ([LeetCode 1670](https://leetcode.com/problems/design-front-middle-back-queue/), Medium)

**Problem:** Build a queue with `pushFront`, `pushMiddle`, `pushBack`, `popFront`, `popMiddle` and `popBack`. If there are two middle positions, use the one nearer the front. Pops on an empty queue return -1.

**Example:** `pushFront(1)`, `pushBack(2)`, `pushMiddle(3)`, `pushMiddle(4)` gives `[1, 4, 3, 2]`.

**Pattern:** Deque, Design: data structure

**How to recognize it:** You need fast work at three places. A `vector` makes the front and the middle O(n). Two deques turn the middle into an end: it is the place where they meet.

**Brute force:** Use a `vector`, and `insert` or `erase` at the right index. Each front or middle operation is O(n).

**Key idea:** Split the items into `left` and `right`, and always keep `right.size()` equal to `left.size()` or one more. Then the middle is always at the join, so every operation is at the end of a deque. After each change, move one item across if the sizes break the rule.

```text
[1, 4, 3, 2]     left: 1, 4     right: 3, 2

size is even:    pushMiddle goes to the end of left
size is odd:     popMiddle takes the front of right
```

For n items, `left` has n / 2 items, rounded down.

- `pushMiddle` must put the new item at index n / 2. That is the end of `left`.
- `popMiddle` must take index (n - 1) / 2. When n is even, that is the last item of `left`. When n is odd, it is the first item of `right`.

**Dry run:** the example, continued.

| Operation | left | right | Returns |
|---|---|---|---|
| pushFront(1) | | 1 | |
| pushBack(2) | 1 | 2 | |
| pushMiddle(3) | 1 | 3, 2 | |
| pushMiddle(4) | 1, 4 | 3, 2 | |
| popFront() | 4 | 3, 2 | 1 |
| popMiddle() | 4 | 2 | 3 |
| popMiddle() | | 2 | 4 |
| popBack() | | | 2 |

```cpp
#include <bits/stdc++.h>
#include <cassert>
using namespace std;

class FrontMiddleBackQueue {
    deque<int> left, right;  // right.size() is left.size() or left.size() + 1

    void rebalance() {
        if (left.size() > right.size()) {
            right.push_front(left.back());
            left.pop_back();
        } else if (right.size() > left.size() + 1) {
            left.push_back(right.front());
            right.pop_front();
        }
    }

public:
    FrontMiddleBackQueue() {}

    void pushFront(int val) {
        left.push_front(val);
        rebalance();
    }

    void pushMiddle(int val) {
        left.push_back(val);
        rebalance();
    }

    void pushBack(int val) {
        right.push_back(val);
        rebalance();
    }

    int popFront() {
        if (right.empty()) return -1;  // by the size rule, right is empty only if both are
        deque<int>& source = left.empty() ? right : left;
        int value = source.front();
        source.pop_front();
        rebalance();
        return value;
    }

    int popMiddle() {
        if (right.empty()) return -1;
        int value;
        if (left.size() == right.size()) {
            value = left.back();
            left.pop_back();
        } else {
            value = right.front();
            right.pop_front();
        }
        rebalance();
        return value;
    }

    int popBack() {
        if (right.empty()) return -1;
        int value = right.back();
        right.pop_back();
        rebalance();
        return value;
    }
};

int main() {
    FrontMiddleBackQueue queue1;
    queue1.pushFront(1);
    queue1.pushBack(2);
    queue1.pushMiddle(3);
    queue1.pushMiddle(4);            // [1, 4, 3, 2]
    assert(queue1.popFront() == 1);
    assert(queue1.popMiddle() == 3);
    assert(queue1.popMiddle() == 4);
    assert(queue1.popBack() == 2);
    assert(queue1.popFront() == -1); // empty

    // Random steps must match a plain vector, which is slow but easy to trust.
    FrontMiddleBackQueue mine;
    vector<int> model;
    mt19937 rng(8);
    for (int step = 0; step < 20000; step++) {
        int choice = (int)(rng() % 6), value = (int)(rng() % 1000), n = (int)model.size();
        if (choice == 0) {
            mine.pushFront(value);
            model.insert(model.begin(), value);
        } else if (choice == 1) {
            mine.pushMiddle(value);
            model.insert(model.begin() + n / 2, value);
        } else if (choice == 2) {
            mine.pushBack(value);
            model.push_back(value);
        } else if (choice == 3) {
            int expected = n ? model.front() : -1;
            assert(mine.popFront() == expected);
            if (n) model.erase(model.begin());
        } else if (choice == 4) {
            int index = (n - 1) / 2;
            int expected = n ? model[index] : -1;
            assert(mine.popMiddle() == expected);
            if (n) model.erase(model.begin() + index);
        } else {
            int expected = n ? model.back() : -1;
            assert(mine.popBack() == expected);
            if (n) model.pop_back();
        }
    }
    cout << "All tests passed\n";
}
```

**Complexity:** O(1) amortized time per operation, because each one changes the ends of the deques and moves at most one item across. O(n) space.

## Common pitfalls

1. **Forgetting `+ capacity` when stepping backward.** `(head - 1) % capacity` can be -1 in C++.
2. **Mixing `size_t` with negative values.** `head - 1 + slots.size()` is computed as unsigned, and `(head - 1) % slots.size()` gives a huge wrong number. Cast the size to `int`.
3. **Copying a full ring with a plain loop from slot 0.** The first item may be in the middle. Copy in reading order, and reset `head`.
4. **Using a deque for heavy indexing.** `vector` is faster, because its items are in one block.
5. **Expecting O(1) inserts in the middle.** `std::deque::insert` must shift items, so it is O(n).
6. **Keeping iterators across pushes.** Pushing at either end can invalidate iterators, although references stay valid.
7. **Breaking the size rule.** In the two-deque design, every operation must end with a rebalance.

## Practice list

- [ ] [Design Circular Queue](https://leetcode.com/problems/design-circular-queue/) (LeetCode 622, Medium): the same ring, with one open end at each side.
- [ ] [Sliding Window Maximum](https://leetcode.com/problems/sliding-window-maximum/) (LeetCode 239, Hard): a deque of indexes, with decreasing values.
- [ ] [Jump Game VI](https://leetcode.com/problems/jump-game-vi/) (LeetCode 1696, Medium): a deque keeps the best recent DP value.
- [ ] [Shortest Subarray with Sum at Least K](https://leetcode.com/problems/shortest-subarray-with-sum-at-least-k/) (LeetCode 862, Hard): a deque over prefix sums.
- [ ] [Minimum Cost to Make at Least One Valid Path in a Grid](https://leetcode.com/problems/minimum-cost-to-make-at-least-one-valid-path-in-a-grid/) (LeetCode 1368, Hard): 0-1 BFS with a deque.

## Interview questions

<details>
<summary><strong>Q1. How would you implement a deque, and what are the trade-offs?</strong></summary>

A circular array keeps the items together in memory, so it is fast and gives O(1) access by position, but it must copy everything when it grows. A doubly linked list gives a true O(1) at both ends, but it needs one allocation and two pointers per item, and access by position is O(n). I would use the circular array unless a single slow operation is not acceptable.

</details>

<details>
<summary><strong>Q2. How does `std::deque` give O(1) indexing if its memory is not one block?</strong></summary>

It keeps a table of pointers to fixed-size blocks. To read position i, it works out which block holds i and the offset inside it, which is simple arithmetic plus one pointer lookup. So indexing is O(1), but it does one more step than `vector`, which is why `vector` is faster for heavy indexing.

</details>

<details>
<summary><strong>Q3. Why does sliding window maximum need a deque, not a queue?</strong></summary>

Items must leave from both ends. An old item leaves at the front when it falls out of the window. An item leaves at the back when a newer, larger one arrives, because it can never be the maximum again. A plain queue can only remove at the front.

</details>

<details>
<summary><strong>Q4. Why is 0-1 BFS able to use a deque in place of a heap?</strong></summary>

BFS needs nodes in order of distance. With edge costs of only 0 and 1, the deque holds at most two distinct distances, in order. A cost-0 move gives the same distance as the current node, so it goes to the front, and a cost-1 move goes to the back. The deque stays sorted with O(1) work, so there is no need for the O(log n) cost of a heap.

</details>

<details>
<summary><strong>Q5. How do you get O(1) operations at the middle of a sequence?</strong></summary>

I split it into two deques, and keep their sizes equal or within one. The middle is then always at the place where they meet, so a middle operation becomes an operation at an end. After each change, I move one item across if the size rule is broken.

</details>
