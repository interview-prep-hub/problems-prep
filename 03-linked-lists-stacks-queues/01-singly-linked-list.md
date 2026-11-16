# Singly Linked List

> **Level:** Beginner · **Priority:** T1 · **Time:** 180 min · **Read first:** [Arrays from zero](../02-arrays-strings-hashing/01-arrays-from-zero.md) · **Next:** [Doubly linked list](02-doubly-linked-list.md)

A linked list stores each value in its own small box, and each box points to the next one. This chapter teaches pointers from zero, builds a complete list class, and then solves the problems that appear most often in interviews. Every later list chapter depends on the skills here.

## Quick revision

- A **node** holds a value and a `next` pointer. The last node's `next` is `nullptr`.
- You reach a node only by walking from `head`. Reading position i costs O(i).
- **Insert at head** is O(1): `head = new Node(value, head)`.
- **Insert at tail** is O(1) if you keep a `tail` pointer, and O(n) if you do not.
- **Delete tail** is O(n), even with a `tail` pointer, because you need the node before it.
- To delete a node, change the `next` of the node **before** it. So walk to that node.
- **Save `next` before you change or free a node.** Otherwise you lose the rest of the list.
- **Dummy node:** a fake node before `head`. Now every real node has a node before it, so the first node needs no special code. Return `dummy.next`.
- **Reverse:** keep `previous`, `current` and `following`, and turn one arrow per step.
- **Gap of n:** to find the n-th node from the end, move one pointer n steps ahead, then move both.
- **Two lists at once:** a dummy node and a `tail` pointer build the result.
- A list with `prev` pointers is a [doubly linked list](02-doubly-linked-list.md). A list that loops back is a [circular list](03-circular-linked-lists.md).

## How to recognize it

For a data structure, recognition means asking which operations must be fast. Ask these four questions.

1. Is the input already a list, given as `ListNode* head`?
2. Do you add or remove often at the front, or at a position you already hold?
3. Can you live without jumping to an index?
4. Would shifting an array's elements on each change be too slow?

| Words in the problem | What they tell you |
|---|---|
| "`ListNode* head`", "linked list" | Pointer work. Draw the arrows first |
| "remove", "delete" a node that may be the first | Use a dummy node |
| "merge", "partition", "split into two lists" | A dummy node and a tail pointer for each result |
| "n-th node from the end" | Two pointers with a gap of n |
| "in place", "O(1) extra space" | Relink the nodes. Do not copy values to an array |
| "digits stored in reverse order" | Walk both lists with a carry |
| "same node", "intersect" | Compare node addresses, not values |
| "you are given only the node" | You cannot go back, so copy from the next node |

**Not this structure if:**

| You see | Use instead | Why |
|---|---|---|
| Access by index, such as `a[i]` | [Arrays](../02-arrays-strings-hashing/01-arrays-from-zero.md) | A list must walk to reach position i. |
| Remove a node in O(1) from a pointer to it | [Doubly linked list](02-doubly-linked-list.md) | Removal needs the node before it, and `prev` gives you that. |
| The last node links back to the first | [Circular linked lists](03-circular-linked-lists.md) | A loop that stops at `nullptr` would never end. |
| "Find the cycle" or "find the middle" | [Fast and slow pointers](../05-core-patterns/03-fast-and-slow-pointers.md) | Two speeds solve these in O(1) space. |
| "Reverse part of the list", "reverse in groups" | [In-place reversal](../05-core-patterns/11-in-place-linked-list-reversal.md) | This has its own pattern and reconnecting steps. |
| Most recent item first, with no middle access | [Stack](05-stack-from-zero.md) | You only need one end. |

## 1. The idea in plain English

Think of a treasure hunt. Each clue tells you what is at this spot, and where the next clue is hidden. To reach clue number 5, you must follow clues 1, 2, 3 and 4. You cannot jump there.

But adding a clue is easy. Hide the new clue anywhere, then change one note so that it points there. No other clue moves.

An array is the opposite. It is a row of numbered lockers, so you can jump straight to any locker. But to add an item in the middle, you must shift everything after it.

```text
Array:   [10][20][30]              side by side in memory

List:    [10|*]--->[20|*]--->[30|null]     anywhere in memory, joined by pointers
          value next
```

## 2. Nodes and pointers from zero

A **node** is one box. A **pointer** is a variable that holds the address of something. The arrow in the picture above is a pointer.

```cpp
#include <bits/stdc++.h>
#include <cassert>
using namespace std;

struct Node {
    int value;
    Node* next;  // the address of the next node, or nullptr if there is none
    Node(int v, Node* n) : value(v), next(n) {}
};

int main() {
    // Build 10 -> 20 -> 30 by hand, from the last node to the first.
    Node* third = new Node(30, nullptr);
    Node* second = new Node(20, third);
    Node* head = new Node(10, second);

    assert(head->value == 10);              // -> reads a field through a pointer
    assert(head->next->value == 20);        // follow one arrow
    assert(head->next->next->value == 30);  // follow two arrows
    assert(head->next->next->next == nullptr);

    // Walk the list. This loop appears in almost every list function.
    int sum = 0;
    for (Node* current = head; current != nullptr; current = current->next) {
        sum += current->value;
    }
    assert(sum == 60);

    // Free every node. Save next first, because the node is gone after delete.
    while (head != nullptr) {
        Node* following = head->next;
        delete head;
        head = following;
    }
    cout << "All tests passed\n";
}
```

Three facts explain nearly every list bug:

1. `head` is only a variable. If you move it, you lose the nodes behind it, so walk with a separate variable such as `current`.
2. `nullptr` is the end of the list. Reading `current->next` when `current` is `nullptr` crashes the program.
3. Changing `a->next` does not change any other node. It only turns one arrow.

### Insert after a node

You hold `a`, and you want to put `new` after it.

```text
start:    a ---> b

step 1:   new ---> b       new->next = a->next
          a ---> b

step 2:   a ---> new ---> b    a->next = new
```

The order matters. If you do step 2 first, you lose the only way to reach `b`.

### Delete after a node

You hold `a`, and you want to remove the node after it.

```text
start:    a ---> b ---> c

step 1:   a ---> c         a->next = b->next
          b is no longer in the list

step 2:   delete b
```

You must hold the node **before** the one you remove. A list has no way to go back.

## 3. Array or linked list?

n is the number of elements.

| Operation | Array (`vector`) | Singly linked list |
|---|---|---|
| Read position i | O(1) | O(i) |
| Search by value | O(n) | O(n) |
| Add or remove at the front | O(n) | O(1) |
| Add at the back | O(1) amortized | O(1) with a tail pointer |
| Remove at the back | O(1) | O(n) |
| Insert after a node you hold | O(n) | O(1) |
| Extra memory per element | None | One pointer |
| Elements side by side in memory | Yes | No |

In practice a `vector` wins most of the time, even for some middle inserts, because scanning memory in order is very fast. Interviews still ask about lists often, because they test whether you can handle pointers with care.

## 4. The full class

This class has every operation. It keeps a `tail` pointer and a `count`, so `insertAtTail` and `length` are O(1).

The hard part is keeping `tail` correct. Each operation that can remove the last node must update it.

```cpp
#include <bits/stdc++.h>
#include <cassert>
using namespace std;

class SinglyLinkedList {
    struct Node {
        int value;
        Node* next;
        Node(int v, Node* n) : value(v), next(n) {}
    };

    Node* head = nullptr;
    Node* tail = nullptr;
    int count = 0;

    void requireIndex(int index, int limit) const {
        if (index < 0 || index >= limit) throw out_of_range("bad index");
    }

    Node* nodeAt(int index) const {
        Node* current = head;
        for (int i = 0; i < index; i++) current = current->next;
        return current;
    }

public:
    SinglyLinkedList() = default;
    ~SinglyLinkedList() {
        while (head != nullptr) {
            Node* following = head->next;  // save it, because the node is about to go
            delete head;
            head = following;
        }
    }

    // A copy would share the same nodes, and they would be freed twice.
    SinglyLinkedList(const SinglyLinkedList&) = delete;
    SinglyLinkedList& operator=(const SinglyLinkedList&) = delete;

    int length() const { return count; }
    bool empty() const { return count == 0; }

    int get(int index) const {
        requireIndex(index, count);
        return nodeAt(index)->value;
    }

    // Returns the index of the first match, or -1.
    int search(int value) const {
        int index = 0;
        for (Node* current = head; current != nullptr; current = current->next) {
            if (current->value == value) return index;
            index++;
        }
        return -1;
    }

    void insertAtHead(int value) {
        head = new Node(value, head);
        if (tail == nullptr) tail = head;  // the list was empty
        count++;
    }

    void insertAtTail(int value) {
        Node* node = new Node(value, nullptr);
        if (tail == nullptr) head = node;
        else tail->next = node;
        tail = node;
        count++;
    }

    // After this call, the new value is at position index. index == length() adds at the end.
    void insertAtPosition(int index, int value) {
        requireIndex(index, count + 1);
        if (index == 0) return insertAtHead(value);
        if (index == count) return insertAtTail(value);
        Node* before = nodeAt(index - 1);
        before->next = new Node(value, before->next);
        count++;
    }

    int deleteHead() {
        requireIndex(0, count);
        Node* target = head;
        int value = target->value;
        head = target->next;
        if (head == nullptr) tail = nullptr;  // the list is now empty
        delete target;
        count--;
        return value;
    }

    // O(n): the node before the tail can only be found by walking.
    int deleteTail() {
        return deleteAtPosition(count - 1);
    }

    int deleteAtPosition(int index) {
        requireIndex(index, count);
        if (index == 0) return deleteHead();
        Node* before = nodeAt(index - 1);
        Node* target = before->next;
        int value = target->value;
        before->next = target->next;
        if (target == tail) tail = before;
        delete target;
        count--;
        return value;
    }

    // Removes the first node holding value. Returns false if there is none.
    bool deleteValue(int value) {
        int index = search(value);
        if (index == -1) return false;
        deleteAtPosition(index);
        return true;
    }

    void reverse() {
        Node* previous = nullptr;
        Node* current = head;
        tail = head;  // the old first node becomes the last
        while (current != nullptr) {
            Node* following = current->next;  // save the rest of the list
            current->next = previous;         // turn one arrow
            previous = current;
            current = following;
        }
        head = previous;
    }

    vector<int> toVector() const {
        vector<int> values;
        for (Node* current = head; current != nullptr; current = current->next) {
            values.push_back(current->value);
        }
        return values;
    }

    // Used only by the tests: the tail pointer must be the real last node.
    bool tailIsCorrect() const {
        if (head == nullptr) return tail == nullptr;
        return nodeAt(count - 1) == tail && tail->next == nullptr;
    }
};

void show(const string& action, const SinglyLinkedList& items) {
    assert(items.tailIsCorrect());
    string text;
    for (int value : items.toVector()) text += to_string(value) + " -> ";
    cout << left << setw(28) << action << text << "null\n";
}

int main() {
    SinglyLinkedList items;
    show("start", items);
    items.insertAtHead(20);
    show("insertAtHead(20)", items);
    items.insertAtHead(10);
    show("insertAtHead(10)", items);
    items.insertAtTail(40);
    show("insertAtTail(40)", items);
    items.insertAtPosition(2, 30);
    show("insertAtPosition(2, 30)", items);
    assert(items.get(2) == 30 && items.search(40) == 3 && items.search(99) == -1);

    assert(items.deleteHead() == 10);
    show("deleteHead() -> 10", items);
    assert(items.deleteTail() == 40);
    show("deleteTail() -> 40", items);
    items.insertAtTail(50);  // this would crash or lose data if tail were stale
    show("insertAtTail(50)", items);
    assert(items.deleteValue(30) && !items.deleteValue(99));
    show("deleteValue(30)", items);
    items.insertAtPosition(1, 25);
    show("insertAtPosition(1, 25)", items);
    assert(items.deleteAtPosition(1) == 25);
    show("deleteAtPosition(1) -> 25", items);
    items.reverse();
    show("reverse()", items);

    // Edge cases: empty the list, then use it again.
    items.deleteTail();
    items.deleteTail();
    assert(items.empty() && items.tailIsCorrect());
    bool threw = false;
    try {
        items.deleteHead();
    } catch (const out_of_range&) {
        threw = true;
    }
    assert(threw);
    items.reverse();  // reversing an empty list is safe
    items.insertAtTail(7);
    assert(items.get(0) == 7);

    // Random steps must match std::list at every moment. The seed is fixed.
    mt19937 rng(2024);
    SinglyLinkedList mine;
    list<int> model;
    for (int step = 0; step < 4000; step++) {
        int value = (int)(rng() % 50), size = (int)model.size(), choice = (int)(rng() % 7);
        if (choice == 0) {
            mine.insertAtHead(value);
            model.push_front(value);
        } else if (choice == 1) {
            mine.insertAtTail(value);
            model.push_back(value);
        } else if (choice == 2) {
            int index = (int)(rng() % (size + 1));
            mine.insertAtPosition(index, value);
            model.insert(next(model.begin(), index), value);
        } else if (choice == 3 && size > 0) {
            int index = (int)(rng() % size);
            auto position = next(model.begin(), index);
            assert(mine.deleteAtPosition(index) == *position);
            model.erase(position);
        } else if (choice == 4 && size > 0) {
            assert(mine.deleteTail() == model.back());
            model.pop_back();
        } else if (choice == 5) {
            auto position = find(model.begin(), model.end(), value);
            assert(mine.deleteValue(value) == (position != model.end()));
            if (position != model.end()) model.erase(position);
        } else if (choice == 6) {
            mine.reverse();
            model.reverse();
        }
        assert(mine.toVector() == vector<int>(model.begin(), model.end()));
        assert(mine.tailIsCorrect() && mine.length() == (int)model.size());
    }
    cout << "All tests passed\n";
}
```

```text output
start                       null
insertAtHead(20)            20 -> null
insertAtHead(10)            10 -> 20 -> null
insertAtTail(40)            10 -> 20 -> 40 -> null
insertAtPosition(2, 30)     10 -> 20 -> 30 -> 40 -> null
deleteHead() -> 10          20 -> 30 -> 40 -> null
deleteTail() -> 40          20 -> 30 -> null
insertAtTail(50)            20 -> 30 -> 50 -> null
deleteValue(30)             20 -> 50 -> null
insertAtPosition(1, 25)     20 -> 25 -> 50 -> null
deleteAtPosition(1) -> 25   20 -> 50 -> null
reverse()                   50 -> 20 -> null
All tests passed
```

| Operation | Time | Why |
|---|---|---|
| `insertAtHead`, `deleteHead` | O(1) | Only the first node changes |
| `insertAtTail`, `length` | O(1) | `tail` and `count` are stored |
| `deleteTail` | O(n) | It must find the node before the tail |
| `get`, `search`, `insertAtPosition`, `deleteAtPosition`, `deleteValue` | O(n) | They walk the list |
| `reverse` | O(n) | It visits each node once |

## 5. Reversing a list

Reversing is an operation you must be able to write from memory. It turns every arrow around, one at a time.

Use three pointers. `previous` is the part already reversed. `current` is the node you are fixing. `following` saves the rest of the list before you break the link.

```text
start          null    1 -> 2 -> 3 -> null
              previous current

step 1         null <- 1    2 -> 3 -> null      save 2, turn 1's arrow, move forward
                  previous current

step 2         null <- 1 <- 2    3 -> null
                       previous current

step 3         null <- 1 <- 2 <- 3    null
                            previous current

current is null, so previous is the new head.
```

The `reverse` method above is this loop. [In-place linked list reversal](../05-core-patterns/11-in-place-linked-list-reversal.md) goes further, with sublists and groups.

## 6. The dummy node trick

Deleting a node means changing the `next` of the node before it. But the first node has no node before it, so it needs special code. This is the most common source of list bugs.

A **dummy node** is a fake node placed before `head`. Now every real node has a node before it, and the special case disappears.

```text
dummy -> 1 -> 2 -> 3 -> null
  ^
  previous starts here, so even node 1 has a node before it
```

| Without a dummy | With a dummy |
|---|---|
| Check whether the head itself must go | No check needed |
| `head` may change, and you must track it | Return `dummy.next` at the end |
| Two code paths to test | One code path |

You can create the dummy on the stack, as `ListNode dummy(0, head);`, so you do not need to free it. Use a dummy whenever the first node might change.

## 7. Solved problems

Every program below uses the standard LeetCode node, with a small helper to build a list for the tests.

### P1. Convert Binary Number in a Linked List to Integer ([LeetCode 1290](https://leetcode.com/problems/convert-binary-number-in-a-linked-list-to-integer/), Easy)

**Problem:** Each node holds 0 or 1, and the list is a binary number with the most significant bit first. Return its value.

**Example:** `1 -> 0 -> 1` gives `5`.

**Pattern:** Linked list manipulation

**How to recognize it:** You read one digit at a time from the left, without knowing how many there are. That is the same as parsing a number from a string.

**Key idea:** Each new bit shifts the old value one place left, so `value = value * 2 + bit`.

```cpp
#include <bits/stdc++.h>
#include <cassert>
using namespace std;

struct ListNode {
    int val;
    ListNode* next;
    explicit ListNode(int x = 0, ListNode* n = nullptr) : val(x), next(n) {}
};

class Solution {
public:
    int getDecimalValue(ListNode* head) {
        int value = 0;
        for (ListNode* node = head; node != nullptr; node = node->next) {
            value = value * 2 + node->val;
        }
        return value;
    }
};

ListNode* build(const vector<int>& values) {
    ListNode dummy;
    ListNode* last = &dummy;
    for (int v : values) last = last->next = new ListNode(v);
    return dummy.next;
}

int main() {
    Solution solution;
    assert(solution.getDecimalValue(build({1, 0, 1})) == 5);
    assert(solution.getDecimalValue(build({0})) == 0);
    assert(solution.getDecimalValue(build({1, 1, 1, 1})) == 15);
    assert(solution.getDecimalValue(build({0, 0, 1})) == 1);  // leading zeros
    cout << "All tests passed\n";
}
```

**Complexity:** O(n) time, O(1) space. The problem limits the list to 30 nodes, so the value fits in an `int`.

### P2. Remove Linked List Elements ([LeetCode 203](https://leetcode.com/problems/remove-linked-list-elements/), Easy)

**Problem:** Remove every node whose value equals `val`, and return the new head.

**Example:** `1 -> 2 -> 6 -> 3 -> 6` with `val = 6` gives `1 -> 2 -> 3`.

**Pattern:** Linked list manipulation

**How to recognize it:** "Remove" where the first node may be one of those removed. That is the signal for a dummy node.

**Key idea:** Walk with `previous`, starting at the dummy. If the next node must go, skip it and stay in place, because the new next node may also need removing. Otherwise move forward.

**Dry run:** on `7 -> 7 -> 1`, with `val = 7`.

| previous | previous->next | Action |
|---|---|---|
| dummy | 7 | skip it, stay |
| dummy | 7 | skip it, stay |
| dummy | 1 | keep it, move to 1 |
| 1 | null | stop |

```cpp
#include <bits/stdc++.h>
#include <cassert>
using namespace std;

struct ListNode {
    int val;
    ListNode* next;
    explicit ListNode(int x = 0, ListNode* n = nullptr) : val(x), next(n) {}
};

class Solution {
public:
    ListNode* removeElements(ListNode* head, int val) {
        ListNode dummy(0, head);
        ListNode* previous = &dummy;
        while (previous->next != nullptr) {
            if (previous->next->val == val) {
                previous->next = previous->next->next;  // stay: the new next may match too
            } else {
                previous = previous->next;
            }
        }
        return dummy.next;
    }
};

ListNode* build(const vector<int>& values) {
    ListNode dummy;
    ListNode* last = &dummy;
    for (int v : values) last = last->next = new ListNode(v);
    return dummy.next;
}

vector<int> toVector(ListNode* head) {
    vector<int> values;
    for (; head != nullptr; head = head->next) values.push_back(head->val);
    return values;
}

int main() {
    Solution solution;
    assert(toVector(solution.removeElements(build({1, 2, 6, 3, 4, 5, 6}), 6)) == vector<int>({1, 2, 3, 4, 5}));
    assert(toVector(solution.removeElements(build({7, 7, 7, 7}), 7)).empty());  // every node goes
    assert(toVector(solution.removeElements(build({7, 7, 1}), 7)) == vector<int>({1}));  // the head changes
    assert(solution.removeElements(nullptr, 1) == nullptr);
    cout << "All tests passed\n";
}
```

**Complexity:** O(n) time, O(1) space.

### P3. Remove Duplicates from Sorted List ([LeetCode 83](https://leetcode.com/problems/remove-duplicates-from-sorted-list/), Easy)

**Problem:** A list is sorted. Remove nodes so that each value appears once.

**Example:** `1 -> 1 -> 2 -> 3 -> 3` gives `1 -> 2 -> 3`.

**Pattern:** Linked list manipulation

**How to recognize it:** "Sorted" means that equal values sit next to each other, so you only compare neighbours.

**Key idea:** At each node, skip the next node while it has the same value. Then move on. The first node of a group always stays, so no dummy is needed.

```cpp
#include <bits/stdc++.h>
#include <cassert>
using namespace std;

struct ListNode {
    int val;
    ListNode* next;
    explicit ListNode(int x = 0, ListNode* n = nullptr) : val(x), next(n) {}
};

class Solution {
public:
    ListNode* deleteDuplicates(ListNode* head) {
        ListNode* current = head;
        while (current != nullptr && current->next != nullptr) {
            if (current->next->val == current->val) {
                current->next = current->next->next;
            } else {
                current = current->next;
            }
        }
        return head;
    }
};

ListNode* build(const vector<int>& values) {
    ListNode dummy;
    ListNode* last = &dummy;
    for (int v : values) last = last->next = new ListNode(v);
    return dummy.next;
}

vector<int> toVector(ListNode* head) {
    vector<int> values;
    for (; head != nullptr; head = head->next) values.push_back(head->val);
    return values;
}

int main() {
    Solution solution;
    assert(toVector(solution.deleteDuplicates(build({1, 1, 2}))) == vector<int>({1, 2}));
    assert(toVector(solution.deleteDuplicates(build({1, 1, 2, 3, 3}))) == vector<int>({1, 2, 3}));
    assert(toVector(solution.deleteDuplicates(build({5, 5, 5}))) == vector<int>({5}));
    assert(solution.deleteDuplicates(nullptr) == nullptr);
    cout << "All tests passed\n";
}
```

**Complexity:** O(n) time, O(1) space.

### P4. Merge Two Sorted Lists ([LeetCode 21](https://leetcode.com/problems/merge-two-sorted-lists/), Easy)

**Problem:** Merge two sorted lists into one sorted list, using their existing nodes.

**Example:** `1 -> 2 -> 4` and `1 -> 3 -> 4` give `1 -> 1 -> 2 -> 3 -> 4 -> 4`.

**Pattern:** Linked list manipulation

**How to recognize it:** Two sorted inputs and one sorted output. The smallest remaining value is always at the front of one of the two lists.

**Brute force:** Copy all the values to an array, sort it, and build a new list. O((n + m) log (n + m)) time, and it does not reuse the nodes.

**Key idea:** Use a dummy node and a `tail` pointer. Take the smaller front node, and attach it to `tail`. When one list runs out, attach the rest of the other in one step.

**Dry run:** on `1 -> 3` and `2 -> 4`.

| a | b | Take | Result so far |
|---|---|---|---|
| 1 | 2 | 1 | `1` |
| 3 | 2 | 2 | `1 2` |
| 3 | 4 | 3 | `1 2 3` |
| none | 4 | attach the rest | `1 2 3 4` |

```cpp
#include <bits/stdc++.h>
#include <cassert>
using namespace std;

struct ListNode {
    int val;
    ListNode* next;
    explicit ListNode(int x = 0, ListNode* n = nullptr) : val(x), next(n) {}
};

class Solution {
public:
    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {
        ListNode dummy;
        ListNode* tail = &dummy;
        while (list1 != nullptr && list2 != nullptr) {
            ListNode*& smaller = list1->val <= list2->val ? list1 : list2;  // a reference to the winner
            tail->next = smaller;
            tail = smaller;
            smaller = smaller->next;
        }
        tail->next = list1 != nullptr ? list1 : list2;  // the rest is already sorted
        return dummy.next;
    }
};

ListNode* build(const vector<int>& values) {
    ListNode dummy;
    ListNode* last = &dummy;
    for (int v : values) last = last->next = new ListNode(v);
    return dummy.next;
}

vector<int> toVector(ListNode* head) {
    vector<int> values;
    for (; head != nullptr; head = head->next) values.push_back(head->val);
    return values;
}

int main() {
    Solution solution;
    assert(toVector(solution.mergeTwoLists(build({1, 2, 4}), build({1, 3, 4}))) == vector<int>({1, 1, 2, 3, 4, 4}));
    assert(solution.mergeTwoLists(nullptr, nullptr) == nullptr);
    assert(toVector(solution.mergeTwoLists(nullptr, build({0}))) == vector<int>({0}));
    assert(toVector(solution.mergeTwoLists(build({5, 6}), build({1}))) == vector<int>({1, 5, 6}));
    cout << "All tests passed\n";
}
```

**Complexity:** O(n + m) time, O(1) extra space, because no new nodes are made.

### P5. Intersection of Two Linked Lists ([LeetCode 160](https://leetcode.com/problems/intersection-of-two-linked-lists/), Easy)

**Problem:** Two lists may join at some node and share everything after it. Return the first shared node, or null. Use O(1) extra space.

**Example:** `4 -> 1 -> 8 -> 4 -> 5` and `5 -> 6 -> 1 -> 8 -> 4 -> 5` share from the node with value 8.

**Pattern:** Two pointers: same direction

**How to recognize it:** "Intersect" means the same node, not the same value. So compare addresses. The problem is that the lists have different lengths before they join.

**Brute force:** Put all the nodes of one list in a hash set, then walk the other. That is O(n + m) time, but O(n) extra space.

**Key idea:** Let pointer `a` walk list A and then list B. Let pointer `b` walk list B and then list A. Each walks the same total distance, A + B, so they arrive at the shared node together.

```text
A's own part = 2 nodes, B's own part = 3 nodes, shared part = 3 nodes

a walks:  2 + 3 + (null) + 3 = steps to reach the join on its second list
b walks:  3 + 3 + (null) + 2 = the same
```

If there is no shared node, both reach `nullptr` at the same time, and the loop ends.

```cpp
#include <bits/stdc++.h>
#include <cassert>
using namespace std;

struct ListNode {
    int val;
    ListNode* next;
    explicit ListNode(int x = 0, ListNode* n = nullptr) : val(x), next(n) {}
};

class Solution {
public:
    ListNode* getIntersectionNode(ListNode* headA, ListNode* headB) {
        ListNode* a = headA;
        ListNode* b = headB;
        while (a != b) {  // compares addresses, not values
            a = a == nullptr ? headB : a->next;
            b = b == nullptr ? headA : b->next;
        }
        return a;  // the shared node, or nullptr if there is none
    }
};

int main() {
    Solution solution;
    ListNode* shared = new ListNode(8, new ListNode(4, new ListNode(5)));
    ListNode* headA = new ListNode(4, new ListNode(1, shared));
    ListNode* headB = new ListNode(5, new ListNode(6, new ListNode(1, shared)));
    assert(solution.getIntersectionNode(headA, headB) == shared);

    ListNode* c = new ListNode(2, new ListNode(6, new ListNode(4)));
    ListNode* d = new ListNode(1, new ListNode(5));
    assert(solution.getIntersectionNode(c, d) == nullptr);  // no shared node

    assert(solution.getIntersectionNode(shared, shared) == shared);  // the same list
    assert(solution.getIntersectionNode(nullptr, c) == nullptr);
    cout << "All tests passed\n";
}
```

**Complexity:** O(n + m) time, because each pointer walks at most both lists. O(1) space.

### P6. Design Linked List ([LeetCode 707](https://leetcode.com/problems/design-linked-list/), Medium)

**Problem:** Build a list class with `get`, `addAtHead`, `addAtTail`, `addAtIndex` and `deleteAtIndex`. Indexes start at 0. `addAtIndex` at the length adds at the end. Beyond that, it does nothing.

**Example:** `addAtHead(1)`, `addAtTail(3)`, `addAtIndex(1, 2)` gives `1 -> 2 -> 3`. Then `deleteAtIndex(1)` gives `1 -> 3`.

**Pattern:** Data structure implementation

**How to recognize it:** The statement says to build it. The interview question is how few cases you can write.

**Key idea:** A permanent dummy node turns every operation into "find the node before position i, then change its `next`". So there is one helper, and no case for the first node.

```cpp
#include <bits/stdc++.h>
#include <cassert>
using namespace std;

class MyLinkedList {
    struct Node {
        int val;
        Node* next;
    };
    Node* dummy;  // sits before the first real node, and is never removed
    int count;

    Node* nodeBefore(int index) const {
        Node* node = dummy;
        for (int i = 0; i < index; i++) node = node->next;
        return node;
    }

public:
    MyLinkedList() : dummy(new Node{0, nullptr}), count(0) {}

    ~MyLinkedList() {
        while (dummy != nullptr) {
            Node* following = dummy->next;
            delete dummy;
            dummy = following;
        }
    }

    MyLinkedList(const MyLinkedList&) = delete;
    MyLinkedList& operator=(const MyLinkedList&) = delete;

    int get(int index) {
        if (index < 0 || index >= count) return -1;
        return nodeBefore(index)->next->val;
    }

    void addAtHead(int val) { addAtIndex(0, val); }
    void addAtTail(int val) { addAtIndex(count, val); }

    void addAtIndex(int index, int val) {
        if (index < 0 || index > count) return;
        Node* before = nodeBefore(index);
        before->next = new Node{val, before->next};
        count++;
    }

    void deleteAtIndex(int index) {
        if (index < 0 || index >= count) return;
        Node* before = nodeBefore(index);
        Node* target = before->next;
        before->next = target->next;
        delete target;
        count--;
    }
};

int main() {
    MyLinkedList list;
    list.addAtHead(1);
    list.addAtTail(3);
    list.addAtIndex(1, 2);        // 1 -> 2 -> 3
    assert(list.get(1) == 2);
    list.deleteAtIndex(1);        // 1 -> 3
    assert(list.get(1) == 3);
    assert(list.get(5) == -1);    // no such index
    list.addAtIndex(9, 7);        // beyond the end: does nothing
    assert(list.get(2) == -1);
    list.addAtIndex(2, 7);        // exactly at the end: adds
    assert(list.get(2) == 7);
    list.deleteAtIndex(0);        // 3 -> 7
    list.deleteAtIndex(0);
    list.deleteAtIndex(0);        // empty
    list.deleteAtIndex(0);        // deleting from an empty list does nothing
    assert(list.get(0) == -1);
    cout << "All tests passed\n";
}
```

**Complexity:** `get`, `addAtIndex` and `deleteAtIndex` are O(i), where i is the index. `addAtHead` is O(1). `addAtTail` is O(n) here, and a `tail` pointer would make it O(1), as in [section 4](#4-the-full-class). O(n) space.

### P7. Delete Node in a Linked List ([LeetCode 237](https://leetcode.com/problems/delete-node-in-a-linked-list/), Medium)

**Problem:** You are given only a node of a list, not the head. It is not the last node. Remove its value from the list.

**Example:** In `4 -> 5 -> 1 -> 9`, given the node with value 5, the list becomes `4 -> 1 -> 9`.

**Pattern:** Linked list manipulation

**How to recognize it:** "Given only the node" means you cannot reach the node before it. Normal deletion is impossible, so you need a different idea.

**Key idea:** You cannot remove this node, but you can remove the next one. Copy the next node's value into this node, then skip the next node. The list now reads as if this node were gone.

```text
4 -> 5 -> 1 -> 9      node is 5

copy:   4 -> 1 -> 1 -> 9
skip:   4 -> 1 -> 9
```

```cpp
#include <bits/stdc++.h>
#include <cassert>
using namespace std;

struct ListNode {
    int val;
    ListNode* next;
    explicit ListNode(int x = 0, ListNode* n = nullptr) : val(x), next(n) {}
};

class Solution {
public:
    void deleteNode(ListNode* node) {
        ListNode* following = node->next;
        node->val = following->val;
        node->next = following->next;
        delete following;
    }
};

vector<int> toVector(ListNode* head) {
    vector<int> values;
    for (; head != nullptr; head = head->next) values.push_back(head->val);
    return values;
}

int main() {
    Solution solution;
    ListNode* one = new ListNode(1, new ListNode(9));
    ListNode* five = new ListNode(5, one);
    ListNode* head = new ListNode(4, five);
    solution.deleteNode(five);
    assert(toVector(head) == vector<int>({4, 1, 9}));

    ListNode* second = new ListNode(2);     // remove the node just before the last
    ListNode* first = new ListNode(1, second);
    solution.deleteNode(first);
    assert(toVector(first) == vector<int>({2}));
    cout << "All tests passed\n";
}
```

**Complexity:** O(1) time and space.

**Follow-up:** "Why can this not work for the last node?" There is no next node to copy from. Also, any other pointer that held the next node's address now points to freed memory, so real code rarely uses this trick.

### P8. Remove Duplicates from Sorted List II ([LeetCode 82](https://leetcode.com/problems/remove-duplicates-from-sorted-list-ii/), Medium)

**Problem:** A list is sorted. Remove every value that appears more than once, leaving only values that were unique.

**Example:** `1 -> 2 -> 3 -> 3 -> 4 -> 4 -> 5` gives `1 -> 2 -> 5`.

**Pattern:** Linked list manipulation

**How to recognize it:** Unlike [P3](#p3-remove-duplicates-from-sorted-list-leetcode-83-easy), the first node of a group goes too, so the head can change. That means a dummy node.

**Key idea:** Keep `previous`, the last node known to stay. If the next two nodes are equal, walk past the whole group and link `previous` to what follows. Otherwise the next node is unique, so move `previous` to it.

**Dry run:** on `1 -> 1 -> 2`.

| previous | Next nodes | Action |
|---|---|---|
| dummy | 1, 1 | a group: skip all the 1s, so dummy links to 2 |
| dummy | 2, none | unique: move to 2 |
| 2 | none | stop |

```cpp
#include <bits/stdc++.h>
#include <cassert>
using namespace std;

struct ListNode {
    int val;
    ListNode* next;
    explicit ListNode(int x = 0, ListNode* n = nullptr) : val(x), next(n) {}
};

class Solution {
public:
    ListNode* deleteDuplicates(ListNode* head) {
        ListNode dummy(0, head);
        ListNode* previous = &dummy;
        while (previous->next != nullptr && previous->next->next != nullptr) {
            if (previous->next->val == previous->next->next->val) {
                int repeated = previous->next->val;
                while (previous->next != nullptr && previous->next->val == repeated) {
                    previous->next = previous->next->next;
                }
            } else {
                previous = previous->next;
            }
        }
        return dummy.next;
    }
};

ListNode* build(const vector<int>& values) {
    ListNode dummy;
    ListNode* last = &dummy;
    for (int v : values) last = last->next = new ListNode(v);
    return dummy.next;
}

vector<int> toVector(ListNode* head) {
    vector<int> values;
    for (; head != nullptr; head = head->next) values.push_back(head->val);
    return values;
}

int main() {
    Solution solution;
    assert(toVector(solution.deleteDuplicates(build({1, 2, 3, 3, 4, 4, 5}))) == vector<int>({1, 2, 5}));
    assert(toVector(solution.deleteDuplicates(build({1, 1, 1, 2, 3}))) == vector<int>({2, 3}));  // the head goes
    assert(toVector(solution.deleteDuplicates(build({1, 1}))).empty());
    assert(toVector(solution.deleteDuplicates(build({1, 2, 2}))) == vector<int>({1}));  // a group at the end
    assert(toVector(solution.deleteDuplicates(build({1}))) == vector<int>({1}));
    cout << "All tests passed\n";
}
```

**Complexity:** O(n) time, because each node is passed once. O(1) space.

### P9. Remove Nth Node From End of List ([LeetCode 19](https://leetcode.com/problems/remove-nth-node-from-end-of-list/), Medium)

**Problem:** Remove the n-th node from the end, and return the head. Try to do it in one pass.

**Example:** `1 -> 2 -> 3 -> 4 -> 5` with `n = 2` gives `1 -> 2 -> 3 -> 5`.

**Pattern:** Two pointers: same direction

**How to recognize it:** "From the end" on a list that can only go forward. You cannot count back, so you need a way to know when you are n steps from the end.

**Brute force:** Walk once to get the length L, then walk again to position L - n. This is O(n) with two passes.

**Key idea:** Keep two pointers a fixed gap apart. When the front one falls off the end, the back one is exactly where you need it. Start both at a dummy node, because the head itself may be the one removed. Move `fast` n + 1 steps, so that `slow` stops at the node **before** the target.

**Dry run:** on the example, with `n = 2`. `fast` first moves 3 steps from the dummy, to node 3.

| slow | fast |
|---|---|
| dummy | 3 |
| 1 | 4 |
| 2 | 5 |
| 3 | null, so stop |

`slow` is at 3, so remove the node after it, which is 4.

```cpp
#include <bits/stdc++.h>
#include <cassert>
using namespace std;

struct ListNode {
    int val;
    ListNode* next;
    explicit ListNode(int x = 0, ListNode* n = nullptr) : val(x), next(n) {}
};

class Solution {
public:
    ListNode* removeNthFromEnd(ListNode* head, int n) {
        ListNode dummy(0, head);
        ListNode* slow = &dummy;
        ListNode* fast = &dummy;
        for (int i = 0; i <= n; i++) fast = fast->next;  // a gap of n + 1 nodes
        while (fast != nullptr) {
            slow = slow->next;
            fast = fast->next;
        }
        ListNode* target = slow->next;
        slow->next = target->next;
        delete target;
        return dummy.next;
    }
};

ListNode* build(const vector<int>& values) {
    ListNode dummy;
    ListNode* last = &dummy;
    for (int v : values) last = last->next = new ListNode(v);
    return dummy.next;
}

vector<int> toVector(ListNode* head) {
    vector<int> values;
    for (; head != nullptr; head = head->next) values.push_back(head->val);
    return values;
}

int main() {
    Solution solution;
    assert(toVector(solution.removeNthFromEnd(build({1, 2, 3, 4, 5}), 2)) == vector<int>({1, 2, 3, 5}));
    assert(toVector(solution.removeNthFromEnd(build({1}), 1)).empty());
    assert(toVector(solution.removeNthFromEnd(build({1, 2}), 1)) == vector<int>({1}));
    assert(toVector(solution.removeNthFromEnd(build({1, 2}), 2)) == vector<int>({2}));  // removes the head
    cout << "All tests passed\n";
}
```

**Complexity:** O(n) time with one pass, where n here is the list's length. O(1) space.

### P10. Odd Even Linked List ([LeetCode 328](https://leetcode.com/problems/odd-even-linked-list/), Medium)

**Problem:** Put all the nodes at odd positions first, then all the nodes at even positions, keeping the order inside each group. Positions start at 1. Use O(1) extra space.

**Example:** `1 -> 2 -> 3 -> 4 -> 5` gives `1 -> 3 -> 5 -> 2 -> 4`.

**Pattern:** Linked list manipulation

**How to recognize it:** Splitting a list by position, with O(1) space, means relinking the nodes. No new list and no array.

**Key idea:** Grow two chains at once. `odd` and `even` each jump over the other's next node. At the end, attach the even chain after the odd chain. Save the first even node, because you will need it then.

```text
start:    1 -> 2 -> 3 -> 4 -> 5

odd chain:   1 -> 3 -> 5
even chain:  2 -> 4

join:        1 -> 3 -> 5 -> 2 -> 4
```

```cpp
#include <bits/stdc++.h>
#include <cassert>
using namespace std;

struct ListNode {
    int val;
    ListNode* next;
    explicit ListNode(int x = 0, ListNode* n = nullptr) : val(x), next(n) {}
};

class Solution {
public:
    ListNode* oddEvenList(ListNode* head) {
        if (head == nullptr) return nullptr;
        ListNode* odd = head;
        ListNode* even = head->next;
        ListNode* firstEven = even;
        while (even != nullptr && even->next != nullptr) {
            odd->next = even->next;
            odd = odd->next;
            even->next = odd->next;
            even = even->next;
        }
        odd->next = firstEven;
        return head;
    }
};

ListNode* build(const vector<int>& values) {
    ListNode dummy;
    ListNode* last = &dummy;
    for (int v : values) last = last->next = new ListNode(v);
    return dummy.next;
}

vector<int> toVector(ListNode* head) {
    vector<int> values;
    for (; head != nullptr; head = head->next) values.push_back(head->val);
    return values;
}

int main() {
    Solution solution;
    assert(toVector(solution.oddEvenList(build({1, 2, 3, 4, 5}))) == vector<int>({1, 3, 5, 2, 4}));
    assert(toVector(solution.oddEvenList(build({2, 1, 3, 5, 6, 4, 7}))) == vector<int>({2, 3, 6, 7, 1, 5, 4}));
    assert(toVector(solution.oddEvenList(build({1, 2}))) == vector<int>({1, 2}));
    assert(toVector(solution.oddEvenList(build({1}))) == vector<int>({1}));
    assert(solution.oddEvenList(nullptr) == nullptr);
    cout << "All tests passed\n";
}
```

**Complexity:** O(n) time, O(1) space.

### P11. Partition List ([LeetCode 86](https://leetcode.com/problems/partition-list/), Medium)

**Problem:** Rearrange a list so that all nodes less than `x` come before all nodes at least `x`. Keep the original order inside each part.

**Example:** `1 -> 4 -> 3 -> 2 -> 5 -> 2` with `x = 3` gives `1 -> 2 -> 2 -> 4 -> 3 -> 5`.

**Pattern:** Linked list manipulation

**How to recognize it:** Each node goes to one of two groups, and order must be kept. So build two lists and join them.

**Key idea:** Use two dummy nodes, one for each group. Attach each node to the end of its group. Then join the two lists, and end the second one with `nullptr`. Without that last step, the final node may still point into the middle of the list, which makes a cycle.

```cpp
#include <bits/stdc++.h>
#include <cassert>
using namespace std;

struct ListNode {
    int val;
    ListNode* next;
    explicit ListNode(int x = 0, ListNode* n = nullptr) : val(x), next(n) {}
};

class Solution {
public:
    ListNode* partition(ListNode* head, int x) {
        ListNode lessDummy, restDummy;
        ListNode* lessTail = &lessDummy;
        ListNode* restTail = &restDummy;
        for (ListNode* node = head; node != nullptr; node = node->next) {
            if (node->val < x) {
                lessTail->next = node;
                lessTail = node;
            } else {
                restTail->next = node;
                restTail = node;
            }
        }
        restTail->next = nullptr;  // this node may still point into the other group
        lessTail->next = restDummy.next;
        return lessDummy.next;
    }
};

ListNode* build(const vector<int>& values) {
    ListNode dummy;
    ListNode* last = &dummy;
    for (int v : values) last = last->next = new ListNode(v);
    return dummy.next;
}

vector<int> toVector(ListNode* head) {
    vector<int> values;
    for (; head != nullptr; head = head->next) values.push_back(head->val);
    return values;
}

int main() {
    Solution solution;
    assert(toVector(solution.partition(build({1, 4, 3, 2, 5, 2}), 3)) == vector<int>({1, 2, 2, 4, 3, 5}));
    assert(toVector(solution.partition(build({2, 1}), 2)) == vector<int>({1, 2}));
    assert(toVector(solution.partition(build({3, 4}), 1)) == vector<int>({3, 4}));  // nothing is less
    assert(toVector(solution.partition(build({1, 2}), 9)) == vector<int>({1, 2}));  // everything is less
    assert(solution.partition(nullptr, 0) == nullptr);
    cout << "All tests passed\n";
}
```

**Complexity:** O(n) time, O(1) extra space, because only pointers change.

### P12. Add Two Numbers ([LeetCode 2](https://leetcode.com/problems/add-two-numbers/), Medium)

**Problem:** Two non-negative numbers are stored as lists of digits, with the ones digit first. Return their sum in the same form.

**Example:** `2 -> 4 -> 3` (342) plus `5 -> 6 -> 4` (465) gives `7 -> 0 -> 8` (807).

**Pattern:** Linked list manipulation

**How to recognize it:** "Digits stored in reverse order" means the ones digit comes first, which is exactly the order in which you add by hand. The lists can be 100 digits long, so you cannot convert to an integer.

**Key idea:** Walk both lists together with a carry, as in school addition. Keep going while either list has digits left or a carry remains. A list that has ended gives 0.

**Dry run:** on the example.

| Digits | Sum with carry | Write | Carry |
|---|---|---|---|
| 2, 5 | 7 | 7 | 0 |
| 4, 6 | 10 | 0 | 1 |
| 3, 4 | 8 | 8 | 0 |

```cpp
#include <bits/stdc++.h>
#include <cassert>
using namespace std;

struct ListNode {
    int val;
    ListNode* next;
    explicit ListNode(int x = 0, ListNode* n = nullptr) : val(x), next(n) {}
};

class Solution {
public:
    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
        ListNode dummy;
        ListNode* tail = &dummy;
        int carry = 0;
        while (l1 != nullptr || l2 != nullptr || carry > 0) {
            int sum = carry;
            if (l1 != nullptr) {
                sum += l1->val;
                l1 = l1->next;
            }
            if (l2 != nullptr) {
                sum += l2->val;
                l2 = l2->next;
            }
            tail = tail->next = new ListNode(sum % 10);
            carry = sum / 10;
        }
        return dummy.next;
    }
};

ListNode* build(const vector<int>& values) {
    ListNode dummy;
    ListNode* last = &dummy;
    for (int v : values) last = last->next = new ListNode(v);
    return dummy.next;
}

vector<int> toVector(ListNode* head) {
    vector<int> values;
    for (; head != nullptr; head = head->next) values.push_back(head->val);
    return values;
}

int main() {
    Solution solution;
    assert(toVector(solution.addTwoNumbers(build({2, 4, 3}), build({5, 6, 4}))) == vector<int>({7, 0, 8}));
    assert(toVector(solution.addTwoNumbers(build({0}), build({0}))) == vector<int>({0}));
    // 9999 + 99 = 10098, with different lengths and a final carry.
    assert(toVector(solution.addTwoNumbers(build({9, 9, 9, 9}), build({9, 9}))) == vector<int>({8, 9, 0, 0, 1}));
    cout << "All tests passed\n";
}
```

**Complexity:** O(max(n, m)) time, and the same space for the new list.

### P13. Add Two Numbers II ([LeetCode 445](https://leetcode.com/problems/add-two-numbers-ii/), Medium)

**Problem:** The same as [P12](#p12-add-two-numbers-leetcode-2-medium), but the most significant digit comes first. Do not change the input lists.

**Example:** `7 -> 2 -> 4 -> 3` (7243) plus `5 -> 6 -> 4` (564) gives `7 -> 8 -> 0 -> 7` (7807).

**Pattern:** Linked list manipulation, Stack simulation

**How to recognize it:** Adding must start at the ones digit, but a singly linked list gives you that digit last. You need to read the digits backwards, and a stack does exactly that.

**Brute force:** Reverse both lists, add, and reverse the result. This works, but it changes the input.

**Key idea:** Push each list's digits onto a stack. Popping gives the digits from the right. Build the answer by adding each new digit at the **front**, because the first digit you compute is the last one in the result.

```cpp
#include <bits/stdc++.h>
#include <cassert>
using namespace std;

struct ListNode {
    int val;
    ListNode* next;
    explicit ListNode(int x = 0, ListNode* n = nullptr) : val(x), next(n) {}
};

class Solution {
public:
    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
        stack<int> a, b;
        for (; l1 != nullptr; l1 = l1->next) a.push(l1->val);
        for (; l2 != nullptr; l2 = l2->next) b.push(l2->val);

        ListNode* result = nullptr;
        int carry = 0;
        while (!a.empty() || !b.empty() || carry > 0) {
            int sum = carry;
            if (!a.empty()) {
                sum += a.top();
                a.pop();
            }
            if (!b.empty()) {
                sum += b.top();
                b.pop();
            }
            result = new ListNode(sum % 10, result);  // add at the front
            carry = sum / 10;
        }
        return result;
    }
};

ListNode* build(const vector<int>& values) {
    ListNode dummy;
    ListNode* last = &dummy;
    for (int v : values) last = last->next = new ListNode(v);
    return dummy.next;
}

vector<int> toVector(ListNode* head) {
    vector<int> values;
    for (; head != nullptr; head = head->next) values.push_back(head->val);
    return values;
}

int main() {
    Solution solution;
    assert(toVector(solution.addTwoNumbers(build({7, 2, 4, 3}), build({5, 6, 4}))) == vector<int>({7, 8, 0, 7}));
    assert(toVector(solution.addTwoNumbers(build({2, 4, 3}), build({5, 6, 4}))) == vector<int>({8, 0, 7}));
    assert(toVector(solution.addTwoNumbers(build({0}), build({0}))) == vector<int>({0}));
    assert(toVector(solution.addTwoNumbers(build({5}), build({5}))) == vector<int>({1, 0}));  // the carry adds a digit
    cout << "All tests passed\n";
}
```

**Complexity:** O(n + m) time. O(n + m) space for the stacks and the result.

## Common pitfalls

1. **Losing the rest of the list.** Save `current->next` before you change it. This is the most common list bug.
2. **Reading `next` from a null pointer.** Check `current != nullptr` first. For `current->next->val`, check that `current->next` exists too.
3. **Moving `head` during a walk.** You lose the start of the list. Walk with a separate pointer.
4. **Using a node after `delete`.** Read what you need first.
5. **Forgetting the first node.** Removing it needs special code, unless you use a dummy node.
6. **Forgetting to end a list.** After splitting or relinking, the last node may still point to an old neighbour, which makes a cycle. Set its `next` to `nullptr`.
7. **Comparing values when the problem means nodes.** Two nodes can hold the same value and still be different nodes.
8. **Leaving `tail` stale.** When the last node goes away, `tail` must move, and when the list becomes empty, it must be null.

## Practice list

- [ ] [Insert Greatest Common Divisors in Linked List](https://leetcode.com/problems/insert-greatest-common-divisors-in-linked-list/) (LeetCode 2807, Medium): insert a node after each node, and skip over it.
- [ ] [Merge Nodes in Between Zeros](https://leetcode.com/problems/merge-nodes-in-between-zeros/) (LeetCode 2181, Medium): sum each group into one node.
- [ ] [Delete Nodes From Linked List Present in Array](https://leetcode.com/problems/delete-nodes-from-linked-list-present-in-array/) (LeetCode 3217, Medium): a hash set plus a dummy node.
- [ ] [Remove Nodes From Linked List](https://leetcode.com/problems/remove-nodes-from-linked-list/) (LeetCode 2487, Medium): reverse the list, keep a running maximum, then reverse it back.
- [ ] [Find the Minimum and Maximum Number of Nodes Between Critical Points](https://leetcode.com/problems/find-the-minimum-and-maximum-number-of-nodes-between-critical-points/) (LeetCode 2058, Medium): remember the first and the last critical position.

## Interview questions

<details>
<summary><strong>Q1. When would you use a linked list instead of an array?</strong></summary>

When I often add or remove at the front, or at a position I already hold, and I do not need access by index. In practice a `vector` is usually faster, because its elements sit together in memory, while each list node is a separate allocation. So I choose a list when the O(1) relinking really matters, or when other code keeps pointers to nodes that must not move.

</details>

<details>
<summary><strong>Q2. What is a dummy node, and when do you use it?</strong></summary>

It is a fake node placed before the head, so that every real node has a node before it. I use it whenever the first node might change, such as in deletes and merges. It removes the special case for the head, and I return `dummy.next` at the end. I can put it on the stack, so there is nothing to free.

</details>

<details>
<summary><strong>Q3. Why is deleting the tail O(n), even with a tail pointer?</strong></summary>

Removing a node means changing the `next` of the node before it, and a singly linked list has no way back. So I must walk from the head to find that node. A doubly linked list has `prev`, so there it is O(1).

</details>

<details>
<summary><strong>Q4. How do you find the n-th node from the end in one pass?</strong></summary>

I use two pointers with a gap of n. I move the first pointer n steps, then move both until the first one reaches the end. The second pointer is then n nodes from the end. To delete that node, I start both at a dummy node and use a gap of n + 1, so that the second pointer stops one node before it.

</details>

<details>
<summary><strong>Q5. Can you delete a node when you are given only that node?</strong></summary>

Only if it is not the last node. I copy the next node's value into it, then remove the next node. The node's address stays, but its old value is gone. This fails for the last node, and it breaks any other pointer to the next node, so it is mainly an interview trick.

</details>
