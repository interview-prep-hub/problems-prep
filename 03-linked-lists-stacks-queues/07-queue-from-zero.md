# Queue From Zero

> **Level:** Beginner · **Priority:** T1 · **Time:** 150 min · **Read first:** [Stack from zero](05-stack-from-zero.md) · **Next:** [Circular queue and ring buffer](08-circular-queue.md)

A queue serves items in the order they arrived. It is the tool behind breadth-first search, task scheduling and any process that works in rounds. This chapter builds a queue from zero, connects it with stacks in both directions, and shows every type of queue you may be asked about.

## Quick revision

- A **queue** is first in, first out (**FIFO**): the item that waited longest leaves first.
- Operations: `enqueue` (or `push`) adds at the **rear**, `dequeue` (or `pop`) removes from the **front**. Both are O(1).
- A plain array queue wastes the slots behind `front`. A [circular queue](08-circular-queue.md) fixes this.
- A linked list queue keeps `front` and `rear` pointers. Add at the rear, and remove at the front.
- `std::queue` has `push`, `pop`, `front`, `back`, `empty` and `size`. Its `pop()` returns nothing.
- **Queue from two stacks:** push into `in`. Pop from `out`. Refill `out` only when it is empty. Each operation is O(1) amortized.
- **Stack from one queue:** after each push, rotate the older items to the back. Push is O(n).
- **Rotate:** `q.push(q.front()); q.pop();` moves the front item to the back.
- **The queue signal:** handle things in arrival order, or in rounds, or level by level.
- BFS uses a queue, because it must finish all the near nodes before the far ones.
- **Recent items in a window:** push new items, and pop old ones from the front.
- **Lazy removal:** leave stale items in the queue, and skip them when they reach the front.

## How to recognize it

Ask these three questions. If any answer is yes, think of a queue.

1. Must the item that arrived first be handled first?
2. Does the process work in rounds, where each item takes a turn and may go to the back?
3. Do you need the items from the last few seconds, or the last k items?

| Words in the problem | What they tell you |
|---|---|
| "in order of arrival", "first come, first served" | A plain queue |
| "goes to the back of the line", "takes turns" | Simulate with a queue, or find a formula |
| "the last k values", "in the last 3000 ms" | Push new items, pop old ones from the front |
| "first unique", "first available" in a stream | A queue, with stale items skipped at the front |
| "level by level", "shortest path", "minimum steps" | [BFS](../08-graphs/02-bfs-and-dfs.md), which runs on a queue |
| "using only stacks", "using only queues" | Build one structure from the other |
| "round robin" | A queue, or a [circular list](03-circular-linked-lists.md) |

**Not this structure if:**

| You see | Use instead | Why |
|---|---|---|
| The newest item comes first | [Stack](05-stack-from-zero.md) | A queue gives you the oldest. |
| A fixed size, with no allocations | [Circular queue](08-circular-queue.md) | It reuses the same array forever. |
| Add or remove at both ends | [Deque](09-deque.md) | A queue has one way in and one way out. |
| The smallest or largest goes first | [Heap](../07-trees/11-heap-from-zero.md) | A heap orders by value, not by arrival. |
| Maximum of a sliding window | [Monotonic queue](../05-core-patterns/13-monotonic-queue.md) | It removes items that can never be the answer. |
| Middle items can leave at any time | [Doubly linked list](02-doubly-linked-list.md) | A queue can only remove at the front. |

## 1. The idea in plain English

Think of a line at a bank. New customers join at the back. The teller serves the person at the front. Nobody jumps ahead, so the person who waited longest goes next.

```text
enqueue(10)     front -> [10] <- rear
enqueue(20)     front -> [10, 20] <- rear
enqueue(30)     front -> [10, 20, 30] <- rear
dequeue() -> 10 front -> [20, 30] <- rear
dequeue() -> 20 front -> [30] <- rear
```

A stack and a queue differ in one word. A stack removes the **newest** item. A queue removes the **oldest**.

## 2. A plain array queue, and its problem

Use an array with two indexes. `front` is the next item to leave, and `rear` is the next free slot. Both only move right.

```text
capacity 4

start            [ _,  _,  _,  _]   front = 0, rear = 0
enqueue(10)      [10,  _,  _,  _]   front = 0, rear = 1
enqueue(20)      [10, 20,  _,  _]   front = 0, rear = 2
dequeue() -> 10  [ _, 20,  _,  _]   front = 1, rear = 2
enqueue(30)      [ _, 20, 30,  _]   front = 1, rear = 3
enqueue(40)      [ _, 20, 30, 40]   front = 1, rear = 4
enqueue(50)      rear is past the end, so it fails, but slot 0 is free
```

The slots behind `front` can never be used again. You have three ways out:

- Shift all items left after each dequeue. This makes dequeue O(n).
- Let the indexes wrap around to slot 0. This is a [circular queue](08-circular-queue.md).
- Use a linked list, as in the next section.

## 3. A queue with a linked list

Keep two pointers. New nodes go after `rear`, and old nodes leave at `front`. This fits a [singly linked list](01-singly-linked-list.md) exactly, because removing at the head and adding at the tail are both O(1).

The one trap is the last item. When the queue becomes empty, `rear` must become `nullptr`, or the next enqueue would attach to freed memory.

```cpp
#include <bits/stdc++.h>
#include <cassert>
using namespace std;

class LinkedQueue {
    struct Node {
        int value;
        Node* next;
    };
    Node* front_ = nullptr;
    Node* rear_ = nullptr;
    int count = 0;

public:
    LinkedQueue() = default;
    ~LinkedQueue() {
        while (!empty()) dequeue();
    }
    LinkedQueue(const LinkedQueue&) = delete;
    LinkedQueue& operator=(const LinkedQueue&) = delete;

    bool empty() const { return front_ == nullptr; }
    int size() const { return count; }

    void enqueue(int value) {
        Node* node = new Node{value, nullptr};
        if (rear_ == nullptr) front_ = node;  // the queue was empty
        else rear_->next = node;
        rear_ = node;
        count++;
    }

    int dequeue() {
        if (empty()) throw underflow_error("queue is empty");
        Node* target = front_;
        int value = target->value;
        front_ = target->next;
        if (front_ == nullptr) rear_ = nullptr;  // the queue is now empty
        delete target;
        count--;
        return value;
    }

    int front() const {
        if (empty()) throw underflow_error("queue is empty");
        return front_->value;
    }

    int back() const {
        if (empty()) throw underflow_error("queue is empty");
        return rear_->value;
    }

    vector<int> items() const {
        vector<int> values;
        for (Node* node = front_; node != nullptr; node = node->next) values.push_back(node->value);
        return values;
    }
};

void show(const string& action, const LinkedQueue& queue) {
    cout << left << setw(18) << action << "[";
    vector<int> values = queue.items();
    for (int i = 0; i < (int)values.size(); i++) cout << (i ? ", " : "") << values[i];
    cout << "]\n";
}

int main() {
    LinkedQueue items;
    items.enqueue(10);
    show("enqueue(10)", items);
    items.enqueue(20);
    show("enqueue(20)", items);
    items.enqueue(30);
    show("enqueue(30)", items);
    assert(items.front() == 10 && items.back() == 30 && items.size() == 3);
    assert(items.dequeue() == 10);
    show("dequeue() -> 10", items);
    assert(items.dequeue() == 20);
    show("dequeue() -> 20", items);
    assert(items.dequeue() == 30);
    show("dequeue() -> 30", items);
    items.enqueue(40);   // the queue became empty, so rear must have been reset
    show("enqueue(40)", items);
    assert(items.front() == 40 && items.back() == 40);

    LinkedQueue empty;
    bool threw = false;
    try {
        empty.dequeue();
    } catch (const underflow_error&) {
        threw = true;
    }
    assert(threw);

    // Random steps must match std::queue. The seed is fixed.
    LinkedQueue mine;
    queue<int> model;
    mt19937 rng(11);
    for (int step = 0; step < 5000; step++) {
        if (rng() % 2 == 0 || model.empty()) {
            int value = (int)(rng() % 1000);
            mine.enqueue(value);
            model.push(value);
        } else {
            assert(mine.dequeue() == model.front());
            model.pop();
        }
        assert(mine.size() == (int)model.size());
        if (!model.empty()) assert(mine.front() == model.front() && mine.back() == model.back());
    }
    cout << "All tests passed\n";
}
```

```text output
enqueue(10)       [10]
enqueue(20)       [10, 20]
enqueue(30)       [10, 20, 30]
dequeue() -> 10   [20, 30]
dequeue() -> 20   [30]
dequeue() -> 30   []
enqueue(40)       [40]
All tests passed
```

Every operation here is O(1). The cost is one allocation and one pointer per item.

## 4. `std::queue`

```cpp
#include <bits/stdc++.h>
#include <cassert>
using namespace std;

int main() {
    queue<int> line;
    line.push(1);
    line.push(2);
    line.push(3);
    assert(line.front() == 1 && line.back() == 3 && line.size() == 3);

    line.pop();              // pop returns nothing, so read front first
    assert(line.front() == 2);

    line.push(line.front()); // rotate: move the front item to the back
    line.pop();
    assert(line.front() == 3 && line.back() == 2);
    cout << "All tests passed\n";
}
```

`queue` shows only its two ends. You cannot loop over it, and you cannot read the middle. To print one, pop from a copy.

## 5. Types of queues

Every queue in this table is the same idea with one rule changed.

| Type | The rule that changes | Typical use | Where |
|---|---|---|---|
| Linear queue | None: items leave in arrival order | BFS, simulations | This chapter |
| Circular queue | Indexes wrap around a fixed array | Ring buffers, streams | [Circular queue](08-circular-queue.md) |
| Deque | Add and remove at both ends | Sliding windows, 0-1 BFS | [Deque](09-deque.md) |
| Priority queue | The best item leaves first, not the oldest | Dijkstra, top k, scheduling | [Heaps](../07-trees/11-heap-from-zero.md) |
| Monotonic queue | Items that can never win are dropped | Window maximum | [Monotonic queue](../05-core-patterns/13-monotonic-queue.md) |

Three more types appear in system questions.

- **Blocking queue:** a thread that dequeues from an empty queue waits, and a thread that enqueues to a full one waits. It connects producers and consumers. See [Concurrency basics](../13-design-problems/06-concurrency-basics.md).
- **Randomized queue:** dequeue removes a random item, not the oldest.
- **Multilevel feedback queue:** an operating system keeps several queues, one for each priority, and moves a task to a lower queue if it uses too much time.

## 6. Solved problems

### P1. Time Needed to Buy Tickets ([LeetCode 2073](https://leetcode.com/problems/time-needed-to-buy-tickets/), Easy)

**Problem:** People stand in a line, and `tickets[i]` is how many tickets person i wants. Each person buys one ticket per second, then goes to the back of the line if they want more. Return how long person k takes to finish.

**Example:** `tickets = [2, 3, 2]`, `k = 2` gives `6`.

**Pattern:** Queue simulation

**How to recognize it:** "Goes to the back of the line" describes a queue exactly. The limits are small, so you can simply run it.

**Key idea:** Keep the people's indexes in a queue. Take the front person, sell one ticket, and add one to the time. If that person is k and has finished, stop. If they still want tickets, they go to the back.

**Dry run:** on the example.

| Second | Person | Tickets left | Goes to the back? |
|---|---|---|---|
| 1 | 0 | 1 | yes |
| 2 | 1 | 2 | yes |
| 3 | 2 | 1 | yes |
| 4 | 0 | 0 | no |
| 5 | 1 | 1 | yes |
| 6 | 2 | 0 | person k is done |

```cpp
#include <bits/stdc++.h>
#include <cassert>
using namespace std;

class Solution {
public:
    int timeRequiredToBuy(vector<int>& tickets, int k) {
        queue<int> line;
        for (int i = 0; i < (int)tickets.size(); i++) line.push(i);
        int seconds = 0;
        while (true) {
            int person = line.front();
            line.pop();
            tickets[person]--;
            seconds++;
            if (tickets[person] == 0) {
                if (person == k) return seconds;
            } else {
                line.push(person);
            }
        }
    }

    // The follow-up: count directly, without changing the input.
    int timeByFormula(const vector<int>& tickets, int k) {
        int seconds = 0;
        for (int i = 0; i < (int)tickets.size(); i++) {
            // People at or before k get as many turns as k. People after k get one fewer.
            seconds += min(tickets[i], i <= k ? tickets[k] : tickets[k] - 1);
        }
        return seconds;
    }
};

int main() {
    Solution solution;
    vector<int> a = {2, 3, 2};
    assert(solution.timeByFormula(a, 2) == 6);
    assert(solution.timeRequiredToBuy(a, 2) == 6);
    vector<int> b = {5, 1, 1, 1};
    assert(solution.timeByFormula(b, 0) == 8);
    assert(solution.timeRequiredToBuy(b, 0) == 8);
    vector<int> c = {1};
    assert(solution.timeRequiredToBuy(c, 0) == 1);
    cout << "All tests passed\n";
}
```

**Complexity:** The simulation is O(T) time, where T is the total number of tickets, and O(n) space. The formula is O(n) time and O(1) space.

**Follow-up:** "Can you avoid the simulation?" Yes, as `timeByFormula` shows. A person at or before k buys at most `tickets[k]` tickets before k finishes. A person after k buys at most `tickets[k] - 1`, because k gets its last ticket before they get their turn in that round.

### P2. Number of Students Unable to Eat Lunch ([LeetCode 1700](https://leetcode.com/problems/number-of-students-unable-to-eat-lunch/), Easy)

**Problem:** Students stand in a queue, and sandwiches are in a stack. Each student wants type 0 or type 1. The front student takes the top sandwich if it matches. If not, the student goes to the back. This stops when no student wants the top sandwich. Return how many students cannot eat.

**Example:** `students = [1, 1, 1, 0, 0, 1]`, `sandwiches = [1, 0, 0, 0, 1, 1]` gives `3`.

**Pattern:** Queue simulation

**How to recognize it:** "Goes to the end of the queue" looks like a simulation. Then notice what the rotation does: students can keep rotating, so the top sandwich reaches any student who wants it. Their order does not matter at all.

**Brute force:** Simulate the queue, and stop after a full round with no change. O(n^2) time.

**Key idea:** Count how many students want each type. Go through the sandwiches in order. If nobody wants the top one, everyone left is stuck.

```cpp
#include <bits/stdc++.h>
#include <cassert>
using namespace std;

class Solution {
public:
    int countStudents(vector<int>& students, vector<int>& sandwiches) {
        int wants[2] = {0, 0};
        for (int student : students) wants[student]++;
        for (int sandwich : sandwiches) {
            if (wants[sandwich] == 0) break;  // nobody takes it, so the line is stuck
            wants[sandwich]--;
        }
        return wants[0] + wants[1];
    }
};

int main() {
    Solution solution;
    vector<int> s1 = {1, 1, 0, 0}, f1 = {0, 1, 0, 1};
    assert(solution.countStudents(s1, f1) == 0);
    vector<int> s2 = {1, 1, 1, 0, 0, 1}, f2 = {1, 0, 0, 0, 1, 1};
    assert(solution.countStudents(s2, f2) == 3);
    vector<int> s3 = {1}, f3 = {0};
    assert(solution.countStudents(s3, f3) == 1);
    cout << "All tests passed\n";
}
```

**Complexity:** O(n) time and O(1) space.

### P3. Number of Recent Calls ([LeetCode 933](https://leetcode.com/problems/number-of-recent-calls/), Easy)

**Problem:** Each call to `ping(t)` adds a request at time t, and t always grows. Return the number of requests in the last 3000 milliseconds, including this one, so in the range `[t - 3000, t]`.

**Example:** `ping(1)` gives 1, `ping(100)` gives 2, `ping(3001)` gives 3, and `ping(3002)` gives 3.

**Pattern:** Queue simulation

**How to recognize it:** "In the last 3000 milliseconds" with growing times. Old requests leave in the same order they came in, so the oldest is always at the front.

**Key idea:** Push each new time. Pop from the front while the oldest is too old. The queue's size is the answer.

```cpp
#include <bits/stdc++.h>
#include <cassert>
using namespace std;

class RecentCounter {
    queue<int> requests;

public:
    RecentCounter() {}

    int ping(int t) {
        requests.push(t);
        while (requests.front() < t - 3000) requests.pop();  // the new request always stays
        return (int)requests.size();
    }
};

int main() {
    RecentCounter counter;
    assert(counter.ping(1) == 1);
    assert(counter.ping(100) == 2);
    assert(counter.ping(3001) == 3);   // 1 is exactly 3000 away, so it still counts
    assert(counter.ping(3002) == 3);   // now 1 is too old
    assert(counter.ping(10000) == 1);  // all the older requests leave
    cout << "All tests passed\n";
}
```

**Complexity:** O(1) amortized time per `ping`, because each request is pushed and popped at most once. Space is O(w), where w is the number of requests in the window.

### P4. Implement Queue using Stacks ([LeetCode 232](https://leetcode.com/problems/implement-queue-using-stacks/), Easy)

**Problem:** Build a queue with `push`, `pop`, `peek` and `empty`, using only stack operations.

**Example:** `push(1)`, `push(2)`, `peek()` gives 1, `pop()` gives 1, `empty()` gives false.

**Pattern:** Design: data structure

**How to recognize it:** The statement says so. The insight is that pouring one stack into another reverses the order, which turns newest-first into oldest-first.

**Brute force:** On every pop, pour everything to a second stack, take the top, and pour it all back. Each pop is O(n).

**Key idea:** Keep two stacks. `in` takes new items. `out` gives the oldest items. Pour from `in` to `out` only when `out` is empty. Items in `out` are already in the right order, so pouring early would break that order.

**Dry run:**

| Operation | in (bottom to top) | out (bottom to top) | Result |
|---|---|---|---|
| push(1) | 1 | | |
| push(2) | 1, 2 | | |
| peek() | | 2, 1 | 1, after pouring |
| pop() | | 2 | 1 |
| push(3) | 3 | 2 | |
| pop() | 3 | | 2, with no pouring needed |
| pop() | | | 3, after pouring |

**Why it is O(1) amortized:** one pour can move many items, but each item is moved only once in its life. An item is pushed to `in`, moved to `out`, and popped from `out`: three steps at most. So n operations cost O(n) in total. This is amortized analysis: the total is small, even if one step is big.

```cpp
#include <bits/stdc++.h>
#include <cassert>
using namespace std;

class MyQueue {
    stack<int> in;
    stack<int> out;

    void refillIfNeeded() {
        if (!out.empty()) return;  // items in out are older, so they must leave first
        while (!in.empty()) {
            out.push(in.top());
            in.pop();
        }
    }

public:
    MyQueue() {}

    void push(int x) { in.push(x); }

    int pop() {
        refillIfNeeded();
        int value = out.top();
        out.pop();
        return value;
    }

    int peek() {
        refillIfNeeded();
        return out.top();
    }

    bool empty() { return in.empty() && out.empty(); }
};

int main() {
    MyQueue queue1;
    queue1.push(1);
    queue1.push(2);
    assert(queue1.peek() == 1);
    assert(queue1.pop() == 1);
    assert(!queue1.empty());
    queue1.push(3);               // a push between pops must not change the order
    assert(queue1.pop() == 2);
    assert(queue1.pop() == 3);
    assert(queue1.empty());

    MyQueue mine;
    queue<int> model;
    mt19937 rng(5);
    for (int step = 0; step < 5000; step++) {
        if (rng() % 2 == 0 || model.empty()) {
            int value = (int)(rng() % 100);
            mine.push(value);
            model.push(value);
        } else {
            assert(mine.peek() == model.front());
            assert(mine.pop() == model.front());
            model.pop();
        }
        assert(mine.empty() == model.empty());
    }
    cout << "All tests passed\n";
}
```

**Complexity:** O(1) amortized time per operation, and O(n) worst case for a single `pop` or `peek`. O(n) space.

### P5. Implement Stack using Queues ([LeetCode 225](https://leetcode.com/problems/implement-stack-using-queues/), Easy)

**Problem:** Build a stack with `push`, `pop`, `top` and `empty`, using only queue operations.

**Example:** `push(1)`, `push(2)`, `top()` gives 2, `pop()` gives 2, `empty()` gives false.

**Pattern:** Design: data structure

**How to recognize it:** The statement says so. Pouring one queue into another keeps the order, so the trick from [P4](#p4-implement-queue-using-stacks-leetcode-232-easy) does not work here. You must rearrange on purpose.

**Key idea:** Keep the queue in stack order, with the newest item at the front. After pushing a new item, rotate all the older items behind it.

```text
queue: 2, 1          (2 is the newest)
push(3):             2, 1, 3
rotate 2 to the back: 1, 3, 2
rotate 1 to the back: 3, 2, 1
```

**Two queues** work too. Push the new item into an empty queue, move everything from the main queue behind it, then swap the two. Both versions make `push` O(n).

```cpp
#include <bits/stdc++.h>
#include <cassert>
using namespace std;

// One queue: rotate after each push.
class MyStack {
    queue<int> items;

public:
    MyStack() {}

    void push(int x) {
        items.push(x);
        for (int i = 0; i + 1 < (int)items.size(); i++) {
            items.push(items.front());
            items.pop();
        }
    }

    int pop() {
        int value = items.front();
        items.pop();
        return value;
    }

    int top() { return items.front(); }
    bool empty() { return items.empty(); }
};

// Two queues: the new item enters an empty queue, then the rest follow it.
class TwoQueueStack {
    queue<int> items, helper;

public:
    void push(int x) {
        helper.push(x);
        while (!items.empty()) {
            helper.push(items.front());
            items.pop();
        }
        swap(items, helper);
    }

    int pop() {
        int value = items.front();
        items.pop();
        return value;
    }

    int top() { return items.front(); }
    bool empty() { return items.empty(); }
};

template <typename Stack>
void test() {
    Stack mine;
    stack<int> model;
    mt19937 rng(3);
    for (int step = 0; step < 2000; step++) {
        if (rng() % 2 == 0 || model.empty()) {
            int value = (int)(rng() % 100);
            mine.push(value);
            model.push(value);
        } else {
            assert(mine.top() == model.top());
            assert(mine.pop() == model.top());
            model.pop();
        }
        assert(mine.empty() == model.empty());
    }
}

int main() {
    MyStack stack1;
    stack1.push(1);
    stack1.push(2);
    assert(stack1.top() == 2 && stack1.pop() == 2 && !stack1.empty());
    assert(stack1.pop() == 1 && stack1.empty());

    test<MyStack>();
    test<TwoQueueStack>();
    cout << "All tests passed\n";
}
```

**Complexity:** `push` is O(n). `pop` and `top` are O(1). O(n) space.

### P6. Moving Average from Data Stream ([LeetCode 346](https://leetcode.com/problems/moving-average-from-data-stream/), Easy, Premium)

**Problem:** Given a window size, each call to `next(val)` adds a value and returns the average of the last `size` values.

**Example:** With size 3: `next(1)` gives 1.0, `next(10)` gives 5.5, `next(3)` gives 4.66667, and `next(5)` gives 6.0.

**Pattern:** Queue simulation

**How to recognize it:** "The last k values" from a stream. New values enter, and the oldest leaves, in arrival order.

**Brute force:** Keep every value, and add up the last k on each call. O(k) per call.

**Key idea:** Keep the window in a queue, with a running sum. Add the new value, and if the queue is too long, subtract and remove the oldest. [Circular queue and ring buffer](08-circular-queue.md) solves the same problem with a fixed array.

```cpp
#include <bits/stdc++.h>
#include <cassert>
using namespace std;

class MovingAverage {
    int limit;
    queue<int> window;
    long long sum = 0;  // a long long, because many large values can pass 2 billion

public:
    MovingAverage(int size) : limit(size) {}

    double next(int val) {
        window.push(val);
        sum += val;
        if ((int)window.size() > limit) {
            sum -= window.front();
            window.pop();
        }
        return (double)sum / window.size();
    }
};

bool close(double a, double b) { return fabs(a - b) < 1e-9; }

int main() {
    MovingAverage average(3);
    assert(close(average.next(1), 1.0));
    assert(close(average.next(10), 5.5));
    assert(close(average.next(3), 14.0 / 3));
    assert(close(average.next(5), 6.0));     // the 1 has left the window

    MovingAverage single(1);
    assert(close(single.next(4), 4.0) && close(single.next(9), 9.0));

    MovingAverage big(2);
    big.next(2000000000);
    assert(close(big.next(2000000000), 2e9));  // the sum passes the range of int
    cout << "All tests passed\n";
}
```

**Complexity:** O(1) time per call, and O(size) space.

### P7. Generate Binary Numbers From 1 to N (Classic, Easy)

**Problem:** Return the binary forms of the numbers from 1 to n, in order, as strings.

**Example:** `n = 5` gives `"1", "10", "11", "100", "101"`.

**Pattern:** Queue simulation

**How to recognize it:** Each binary number makes two longer ones: add a `0`, or add a `1`. To get them in increasing order, you must finish all the short numbers before the long ones. That is level order, and it needs a queue.

**Brute force:** Convert each number to binary alone. This is simple and also O(n log n), but it does not show the idea.

**Key idea:** Start with `"1"`. Take the front string, output it, and push that string with `0` and with `1` added.

```text
queue: 1              output 1,   push 10, 11
queue: 10, 11         output 10,  push 100, 101
queue: 11, 100, 101   output 11,  push 110, 111
```

```cpp
#include <bits/stdc++.h>
#include <cassert>
using namespace std;

vector<string> generateBinary(int n) {
    vector<string> result;
    queue<string> pending;
    pending.push("1");
    while ((int)result.size() < n) {
        string current = pending.front();
        pending.pop();
        result.push_back(current);
        pending.push(current + "0");
        pending.push(current + "1");
    }
    return result;
}

int main() {
    assert(generateBinary(5) == vector<string>({"1", "10", "11", "100", "101"}));
    assert(generateBinary(1) == vector<string>({"1"}));
    assert(generateBinary(0).empty());
    assert(generateBinary(8).back() == "1000");
    cout << "All tests passed\n";
}
```

**Complexity:** O(n log n) time, because each string has O(log n) characters. O(n log n) space.

### P8. Reverse a Queue (Classic, Easy)

**Problem:** Reverse the order of a queue, using only queue operations and one stack.

**Example:** `[1, 2, 3]` becomes `[3, 2, 1]`.

**Pattern:** Queue simulation

**How to recognize it:** A stack reverses order, and a queue keeps it. So a trip through a stack is a reversal.

**Key idea:** Move all the items to a stack, then move them back.

```cpp
#include <bits/stdc++.h>
#include <cassert>
using namespace std;

void reverseQueue(queue<int>& items) {
    stack<int> helper;
    while (!items.empty()) {
        helper.push(items.front());
        items.pop();
    }
    while (!helper.empty()) {
        items.push(helper.top());
        helper.pop();
    }
}

vector<int> toVector(queue<int> items) {
    vector<int> values;
    while (!items.empty()) {
        values.push_back(items.front());
        items.pop();
    }
    return values;
}

int main() {
    queue<int> a;
    for (int value : {1, 2, 3}) a.push(value);
    reverseQueue(a);
    assert(toVector(a) == vector<int>({3, 2, 1}));

    queue<int> b;
    reverseQueue(b);    // an empty queue
    assert(b.empty());
    cout << "All tests passed\n";
}
```

**Complexity:** O(n) time and O(n) space. A recursive version also uses O(n) space, in the call stack.

### P9. Reverse the First K Elements of a Queue (Classic, Easy)

**Problem:** Reverse the first k items of a queue, and leave the others in order.

**Example:** `[1, 2, 3, 4, 5]` with `k = 3` becomes `[3, 2, 1, 4, 5]`.

**Pattern:** Queue simulation

**How to recognize it:** Reverse means a stack. Only part of the queue moves, so the other items must rotate back to the end.

**Key idea:** Move k items to a stack. Pop them to the rear of the queue. The reversed part is now behind the others, so rotate `n - k` items to the back.

**Dry run:** on the example.

| Step | Queue | Stack |
|---|---|---|
| Move 3 to the stack | 4, 5 | 1, 2, 3 |
| Empty the stack to the rear | 4, 5, 3, 2, 1 | |
| Rotate 2 items | 3, 2, 1, 4, 5 | |

```cpp
#include <bits/stdc++.h>
#include <cassert>
using namespace std;

void reverseFirstK(queue<int>& items, int k) {
    int n = (int)items.size();
    if (k <= 0 || k > n) return;
    stack<int> helper;
    for (int i = 0; i < k; i++) {
        helper.push(items.front());
        items.pop();
    }
    while (!helper.empty()) {
        items.push(helper.top());
        helper.pop();
    }
    for (int i = 0; i < n - k; i++) {
        items.push(items.front());
        items.pop();
    }
}

queue<int> queueOf(const vector<int>& values) {
    queue<int> items;
    for (int value : values) items.push(value);
    return items;
}

vector<int> toVector(queue<int> items) {
    vector<int> values;
    while (!items.empty()) {
        values.push_back(items.front());
        items.pop();
    }
    return values;
}

int main() {
    queue<int> a = queueOf({1, 2, 3, 4, 5});
    reverseFirstK(a, 3);
    assert(toVector(a) == vector<int>({3, 2, 1, 4, 5}));

    queue<int> b = queueOf({1, 2, 3});
    reverseFirstK(b, 3);        // the whole queue
    assert(toVector(b) == vector<int>({3, 2, 1}));

    queue<int> c = queueOf({1, 2});
    reverseFirstK(c, 1);        // one item: nothing changes
    assert(toVector(c) == vector<int>({1, 2}));

    queue<int> d = queueOf({1, 2});
    reverseFirstK(d, 9);        // k is too large: nothing changes
    assert(toVector(d) == vector<int>({1, 2}));
    cout << "All tests passed\n";
}
```

**Complexity:** O(n) time, and O(k) space for the stack.

### P10. Interleave the Two Halves of a Queue (Classic, Medium)

**Problem:** A queue has an even number of items. Take one from the first half, then one from the second half, and so on.

**Example:** `[1, 2, 3, 4, 5, 6]` becomes `[1, 4, 2, 5, 3, 6]`.

**Pattern:** Queue simulation

**How to recognize it:** Two groups must alternate, and each group keeps its order. So each group needs its own queue.

**Key idea:** Move the first half to a second queue. The original queue now holds the second half. Then alternate: one from the helper, one from the original, and push both to the rear of the original.

```cpp
#include <bits/stdc++.h>
#include <cassert>
using namespace std;

void interleave(queue<int>& items) {
    int half = (int)items.size() / 2;
    queue<int> firstHalf;
    for (int i = 0; i < half; i++) {
        firstHalf.push(items.front());
        items.pop();
    }
    while (!firstHalf.empty()) {
        items.push(firstHalf.front());
        firstHalf.pop();
        items.push(items.front());  // the front item is from the second half
        items.pop();
    }
}

vector<int> toVector(queue<int> items) {
    vector<int> values;
    while (!items.empty()) {
        values.push_back(items.front());
        items.pop();
    }
    return values;
}

int main() {
    queue<int> a;
    for (int value : {1, 2, 3, 4, 5, 6}) a.push(value);
    interleave(a);
    assert(toVector(a) == vector<int>({1, 4, 2, 5, 3, 6}));

    queue<int> b;
    for (int value : {1, 2}) b.push(value);
    interleave(b);
    assert(toVector(b) == vector<int>({1, 2}));

    queue<int> c;
    interleave(c);       // an empty queue
    assert(c.empty());
    cout << "All tests passed\n";
}
```

**Complexity:** O(n) time, and O(n) space for the helper queue.

### P11. Reveal Cards In Increasing Order ([LeetCode 950](https://leetcode.com/problems/reveal-cards-in-increasing-order/), Medium)

**Problem:** You may order a deck as you like. Then repeat: reveal the top card, and move the next top card to the bottom. Return an order in which the cards are revealed in increasing order.

**Example:** `[17, 13, 11, 2, 3, 5, 7]` gives `[2, 13, 3, 11, 5, 17, 7]`.

**Pattern:** Queue simulation

**How to recognize it:** "Reveal the top, move the next to the bottom" is a queue with a rotation. You do not know the values' positions yet, but you know the order in which **positions** are revealed.

**Key idea:** Run the process on positions, not cards. Put the positions 0 to n - 1 in a queue. Sort the deck. Each step, the front position gets the next smallest card, and the next position rotates to the back.

**Dry run:** on the example. The sorted deck is `2, 3, 5, 7, 11, 13, 17`.

| Card | Position it gets | Rotate to the back | Queue after |
|---|---|---|---|
| 2 | 0 | 1 | 2, 3, 4, 5, 6, 1 |
| 3 | 2 | 3 | 4, 5, 6, 1, 3 |
| 5 | 4 | 5 | 6, 1, 3, 5 |
| 7 | 6 | 1 | 3, 5, 1 |
| 11 | 3 | 5 | 1, 5 |
| 13 | 1 | 5 | 5 |
| 17 | 5 | none | empty |

```cpp
#include <bits/stdc++.h>
#include <cassert>
using namespace std;

class Solution {
public:
    vector<int> deckRevealedIncreasing(vector<int>& deck) {
        int n = (int)deck.size();
        vector<int> sorted = deck;
        sort(sorted.begin(), sorted.end());

        queue<int> positions;
        for (int i = 0; i < n; i++) positions.push(i);

        vector<int> result(n);
        for (int card : sorted) {
            result[positions.front()] = card;
            positions.pop();
            if (!positions.empty()) {  // the skipped card goes to the bottom
                positions.push(positions.front());
                positions.pop();
            }
        }
        return result;
    }
};

int main() {
    Solution solution;
    vector<int> a = {17, 13, 11, 2, 3, 5, 7};
    assert(solution.deckRevealedIncreasing(a) == vector<int>({2, 13, 3, 11, 5, 17, 7}));
    vector<int> b = {1, 1000};
    assert(solution.deckRevealedIncreasing(b) == vector<int>({1, 1000}));
    vector<int> c = {5};
    assert(solution.deckRevealedIncreasing(c) == vector<int>({5}));
    cout << "All tests passed\n";
}
```

**Complexity:** O(n log n) time for the sort, then O(n) for the queue. O(n) space.

### P12. Dota2 Senate ([LeetCode 649](https://leetcode.com/problems/dota2-senate/), Medium)

**Problem:** Senators from two parties, `R` and `D`, stand in order. In each round, each remaining senator in turn may ban one senator of the other party. This repeats until one party is left. Return `"Radiant"` for `R`, or `"Dire"` for `D`.

**Example:** `"RD"` gives `"Radiant"`. `"RDD"` gives `"Dire"`.

**Pattern:** Queue simulation, Greedy

**How to recognize it:** Turns in order, and survivors act again next round. That is a queue. The best move is greedy: ban the next enemy who would act, because that enemy would otherwise ban one of yours soon.

**Brute force:** Simulate on the string, and for each senator scan for the next enemy. O(n^2) time.

**Key idea:** Keep one queue of indexes for each party. Compare the two fronts. The smaller index acts first, so it bans the other. The winner goes to the back of its queue with index + n, which means "next round".

**Dry run:** on `"RDD"`, so n = 3.

| R queue | D queue | Result |
|---|---|---|
| 0 | 1, 2 | 0 is first: R bans D at 1, R returns as 3 |
| 3 | 2 | 2 is first: D bans R at 3, D returns as 5 |
| empty | 5 | R is gone, so `Dire` wins |

```cpp
#include <bits/stdc++.h>
#include <cassert>
using namespace std;

class Solution {
public:
    string predictPartyVictory(string senate) {
        int n = (int)senate.size();
        queue<int> radiant, dire;
        for (int i = 0; i < n; i++) {
            if (senate[i] == 'R') radiant.push(i);
            else dire.push(i);
        }
        while (!radiant.empty() && !dire.empty()) {
            int r = radiant.front();
            int d = dire.front();
            radiant.pop();
            dire.pop();
            if (r < d) radiant.push(r + n);  // the winner acts again next round
            else dire.push(d + n);
        }
        return radiant.empty() ? "Dire" : "Radiant";
    }
};

int main() {
    Solution solution;
    assert(solution.predictPartyVictory("RD") == "Radiant");
    assert(solution.predictPartyVictory("RDD") == "Dire");
    assert(solution.predictPartyVictory("R") == "Radiant");
    assert(solution.predictPartyVictory("DDRRR") == "Dire");  // the two Ds act first
    cout << "All tests passed\n";
}
```

**Complexity:** O(n) time. Each pair of fronts removes one senator for good, so there are at most n comparisons. O(n) space.

### P13. First Unique Number ([LeetCode 1429](https://leetcode.com/problems/first-unique-number/), Medium, Premium)

**Problem:** Start with a list of numbers. `add(value)` adds a number to the end. `showFirstUnique()` returns the first number that appears exactly once, or -1.

**Example:** With `[2, 3, 5]`: show gives 2. After `add(5)`, show gives 2. After `add(2)`, show gives 3. After `add(3)`, show gives -1.

**Pattern:** Queue simulation, Frequency counting

**How to recognize it:** "First" in arrival order over a stream, so the candidates are in a queue. A candidate can stop being unique at any time, and a number that repeated can never become unique again.

**Brute force:** Scan all the numbers on each `show`, which is O(n) per call.

**Key idea:** Keep a hash map of counts, and a queue of candidates. `add` puts a number in the queue the first time it appears. `show` removes stale numbers from the front, because they can never be unique again. This is called **lazy removal**: you leave bad items in place, and throw them out only when they reach the front.

```cpp
#include <bits/stdc++.h>
#include <cassert>
using namespace std;

class FirstUnique {
    queue<int> candidates;
    unordered_map<int, int> count;

public:
    FirstUnique(vector<int>& nums) {
        for (int value : nums) add(value);
    }

    int showFirstUnique() {
        while (!candidates.empty() && count[candidates.front()] > 1) candidates.pop();
        return candidates.empty() ? -1 : candidates.front();
    }

    void add(int value) {
        if (++count[value] == 1) candidates.push(value);  // only the first time
    }
};

int main() {
    vector<int> a = {2, 3, 5};
    FirstUnique first(a);
    assert(first.showFirstUnique() == 2);
    first.add(5);
    assert(first.showFirstUnique() == 2);
    first.add(2);
    assert(first.showFirstUnique() == 3);
    first.add(3);
    assert(first.showFirstUnique() == -1);
    first.add(7);
    assert(first.showFirstUnique() == 7);

    vector<int> empty;
    FirstUnique none(empty);
    assert(none.showFirstUnique() == -1);
    cout << "All tests passed\n";
}
```

**Complexity:** `add` is O(1) on average. `showFirstUnique` is O(1) amortized, because each number leaves the queue at most once. O(n) space.

## Common pitfalls

1. **Not resetting `rear` when a linked queue becomes empty.** The next enqueue would attach to freed memory.
2. **Calling `front()` or `pop()` on an empty queue.** It is undefined behaviour. Check `empty()` first.
3. **Expecting `pop()` to return a value.** `std::queue::pop()` returns nothing. Read `front()` first.
4. **Using `size()` in a loop while the queue changes.** In a rotation, save `n = q.size()` first, or the loop may never end.
5. **Pouring `in` into `out` while `out` has items.** This breaks the order in a queue built from stacks. Pour only when `out` is empty.
6. **Using a `vector` with `erase(begin())` as a queue.** Each erase is O(n), so the whole thing becomes O(n^2). Use `queue` or `deque`.
7. **Trying to loop over a `std::queue`.** It has no iterators. Pop from a copy, or use a `deque`.
8. **Simulating when a count is enough.** In [P2](#p2-number-of-students-unable-to-eat-lunch-leetcode-1700-easy), order stops mattering. Ask what the rotation really does.

## Practice list

- [ ] [Find the Winner of the Circular Game](https://leetcode.com/problems/find-the-winner-of-the-circular-game/) (LeetCode 1823, Medium): rotate k - 1 people to the back, then remove the front.
- [ ] [Rotting Oranges](https://leetcode.com/problems/rotting-oranges/) (LeetCode 994, Medium): a queue of cells, processed one minute at a time.
- [ ] [Number of People Aware of a Secret](https://leetcode.com/problems/number-of-people-aware-of-a-secret/) (LeetCode 2327, Medium): keep groups by the day they learned it.
- [ ] [Maximum Candies You Can Get from Boxes](https://leetcode.com/problems/maximum-candies-you-can-get-from-boxes/) (LeetCode 1298, Hard): a queue of boxes that you can open now.

## Interview questions

<details>
<summary><strong>Q1. How do you implement a queue with two stacks, and what does each operation cost?</strong></summary>

I push new items to an `in` stack, and pop from an `out` stack. When `out` is empty, I pour everything from `in` into it, which reverses the order. One pop can cost O(n), but each item is moved only once, so n operations cost O(n) in total. That makes each operation O(1) amortized.

</details>

<details>
<summary><strong>Q2. Why does BFS use a queue?</strong></summary>

BFS must visit all the nodes at distance d before any node at distance d + 1. A queue gives this order, because the new neighbours join behind everything already waiting. With a stack, the newest node would go next, which gives depth-first order instead.

</details>

<details>
<summary><strong>Q3. Why does a plain array queue waste space, and how do you fix it?</strong></summary>

`front` and `rear` only move right, so the slots behind `front` are never used again, and the queue can report that it is full while it has free slots. I can fix this with a circular queue, where the indexes wrap around with modulo, or with a linked list, which pays one allocation per item.

</details>

<details>
<summary><strong>Q4. What is the difference between a queue, a deque and a priority queue?</strong></summary>

A queue adds at one end and removes at the other, so items leave in arrival order. A deque adds and removes at both ends. A priority queue ignores arrival order and removes the best item, which it usually finds with a heap, so its operations are O(log n) instead of O(1).

</details>

<details>
<summary><strong>Q5. What is lazy removal, and when is it safe?</strong></summary>

I leave a stale item in the structure, and throw it away only when it reaches the front. It is safe when an item that went stale can never become valid again, as in First Unique Number, where a repeated number stays repeated. It keeps the operations cheap, because each item is removed at most once.

</details>
