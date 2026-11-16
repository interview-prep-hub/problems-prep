# Doubly Linked List

> **Level:** Beginner · **Priority:** T1 · **Time:** 150 min · **Read first:** [Singly Linked List](01-singly-linked-list.md) · **Next:** [Circular Linked Lists](03-circular-linked-lists.md)

A doubly linked list is a linked list where each node knows both its next and its previous neighbor. This lets you remove a node in O(1) when you already hold a pointer to it, which is the reason caches and many design problems use it.

## Quick revision

- A **node** is one box in the list. Here it holds a value and two pointers: `prev` and `next`.
- **The linking rule:** if `a->next` is `b`, then `b->prev` is `a`. Every operation must keep this rule true.
- **Insert** between `before` and `after` changes 4 pointers: two in the new node, one in each neighbor.
- **Delete** a node changes 2 pointers: `node->prev->next` and `node->next->prev`.
- With a pointer to the node, insert and delete cost **O(1)**. Finding the node by value or by index still costs O(n).
- A **sentinel** is a fake node that holds no real data. Use two, `head` and `tail`, so that every real node has two real neighbors.
- With sentinels, the first, last and only node need no special code.
- **Reverse:** swap `prev` and `next` in every node. O(n) time, O(1) space.
- **Without sentinels,** check for `nullptr` on both sides, and update `head` when the first node goes away.
- Compared with a singly linked list, it costs one more pointer per node, and gives backward walks and O(1) delete by pointer.
- `std::list` is a doubly linked list. It has no `[]`, and its iterators stay valid when other elements change.
- `splice` moves nodes between positions in O(1), with no copying.
- **LRU cache:** a hash map finds the node, and the doubly linked list moves it to the front in O(1).
- **XOR linked list:** one `link` field stores `prev XOR next`. It saves one pointer per node, but it is rarely used in real code.

## How to recognize it

For a data structure, recognition means asking which operations must be fast. Ask these five questions. If the first answer is yes, or the second and third are both yes, a doubly linked list is a strong candidate.

1. Do you already hold a pointer to the node that you must remove or move, with no search?
2. Must you step both forward and backward from a position?
3. Are many inserts and deletes happening in the middle of the sequence?
4. Can you live without jumping to an index in O(1)?
5. Does another structure, such as a hash map, give you the node pointer?

| Words in the problem | What they tell you |
|---|---|
| "doubly linked list", "prev pointer" | The problem gives you the structure directly |
| "least recently used", "evict the oldest" | Hash map plus doubly linked list |
| "move to front" | Unlink the node and link it again at the front, both O(1) |
| "back" and "forward" with a current position | A current pointer that can move both ways |
| "delete this node in O(1)" | You need `prev`, or a trick like [P2](#p2-delete-a-node-given-only-a-pointer-to-it-classic-easy) follow-up |
| "insert before the cursor", "text editor" | Nodes around a cursor, with cheap changes on both sides |
| "add and remove from both ends and the middle" | A linked list, because a deque is slow in the middle |
| "pairs in a sorted linked list" | Two pointers from both ends, which needs `prev` |
| "convert a tree to a doubly linked list" | Use the two child pointers as `prev` and `next` |
| "flatten", "child pointer" | Splice one list into another. Splice means cut a list and join another into the gap |

**Not this structure if:**

| You see | Use instead | Why |
|---|---|---|
| Access by index, such as `a[i]` | [Vector](../02-arrays-strings-hashing/01-arrays-from-zero.md) | A linked list must walk to reach position i. |
| You only add and remove at the two ends | [Deque](09-deque.md) | It keeps elements in blocks of memory, so it needs fewer allocations. |
| You only walk forward | [Singly linked list](01-singly-linked-list.md) | The extra pointer gives you nothing and costs memory. |
| The last node must connect back to the first | [Circular linked list](03-circular-linked-lists.md) | The shape of the list is different, although the links can be double. |
| You must keep values sorted and search by value | [Ordered set](../05-core-patterns/19-ordered-set-patterns.md) | A linked list cannot use binary search, so a search costs O(n). |
| Lookup by key is the main operation | [Hash table](../02-arrays-strings-hashing/03-hash-tables-from-zero.md) | It finds a key in O(1) on average. A list needs O(n). |

## 1. The idea in plain English

Think of people standing in a line, each holding hands with the person on each side. To leave the line, you do not need to ask anybody for directions. You know both your neighbors. You let go, and your two neighbors take each other's hands.

In a singly linked list, each person holds only the hand of the person in front. To leave, the person behind you must change their grip, and you have no way to find that person. Someone must walk from the start of the line.

Here is a tiny example. Remove `20`, when you hold a pointer to it.

```text
before:  10 <-> 20 <-> 30
                ^ node

node->prev->next = node->next    10's next becomes 30
node->next->prev = node->prev    30's prev becomes 10

after:   10 <-> 30
```

Two pointer changes, and no walking. That is the whole reason this structure exists.

## 2. Two pointers in each node

Each node has three fields.

```text
+------+-------+------+
| prev | value | next |
+------+-------+------+
```

A list of three values looks like this. `null` means "no node here". In C++ it is `nullptr`.

```text
       +----+    +----+    +----+
null<--| 10 |<-->| 20 |<-->| 30 |-->null
       +----+    +----+    +----+
        head                tail
```

You can walk in two directions:

- **Forward:** start at the first node and follow `next`.
- **Backward:** start at the last node and follow `prev`.

**The linking rule.** For any two neighbors `a` and `b`, if `a->next` is `b`, then `b->prev` must be `a`. Most bugs in this chapter come from fixing one direction and forgetting the other. A forward walk still looks correct when this happens, so also test a backward walk.

### Insert between two nodes

Say `A` and `C` are neighbors, and you want to put `B` between them.

```text
start:        A <-> C

step 1:       B->prev = A
step 2:       B->next = C
              (A and C do not know about B yet)

step 3:       A->next = B
step 4:       C->prev = B

finish:       A <-> B <-> C
```

Fill in the new node first. The list stays correct while you do this, and you lose nothing. If you hold only `A`, this order also matters for a second reason: you reach `C` through `A->next`, so step 3 must come after step 2.

### Delete a node

Two pointers change, and then you free the node.

```text
start:    A <-> B <-> C

A->next = C
C->prev = A
delete B

finish:   A <-> C
```

## 3. Sentinel nodes

Look again at `node->prev->next = node->next`. If `node` is the first node, `node->prev` is `nullptr`, and the program crashes. So a list without sentinels needs extra checks, as you can see in [P2](#p2-delete-a-node-given-only-a-pointer-to-it-classic-easy):

```cpp snippet
if (node->prev) node->prev->next = node->next;
else head = node->next;
if (node->next) node->next->prev = node->prev;
```

A **sentinel** is a fake node that holds no real data. It stands guard at the end of the list. We use two of them, one before the first real node and one after the last.

```text
empty list:     HEAD <-> TAIL

three values:   HEAD <-> 10 <-> 20 <-> 30 <-> TAIL
```

Now every real node has a real neighbor on both sides. `prev` and `next` are never `nullptr` for a real node. The same two lines work for the first node, the last node and the only node:

```cpp snippet
node->prev->next = node->next;
node->next->prev = node->prev;
```

The cost is two extra nodes and one rule: never delete a sentinel, and never return one as if it held data.

| Without sentinels | With sentinels |
|---|---|
| Empty list is `head == nullptr` | Empty list is `head->next == tail` |
| Insert has 4 cases: empty, front, back, middle | Insert has 1 case |
| Delete has 4 cases: only node, first, last, middle | Delete has 1 case |
| First node is `head` | First node is `head->next` |
| Last node is `tail` | Last node is `tail->prev` |

In an interview, use sentinels when you write the structure yourself. Do not use them when the problem gives you a plain list, unless you add a temporary one and remove it at the end.

## 4. The full class

This class has every operation, with sentinels. Read `insertBetween` and `remove` first, because all the others call them.

`front`, `back`, `popFront`, `popBack` and `removeAt` throw an exception if the list has no such element. `remove(node)` needs a pointer to a real node of this list.

```cpp
#include <bits/stdc++.h>
#include <cassert>
using namespace std;

class DoublyLinkedList {
public:
    struct Node {
        int value;
        Node* prev;
        Node* next;
        explicit Node(int v) : value(v), prev(nullptr), next(nullptr) {}
    };

    DoublyLinkedList() : head(new Node(0)), tail(new Node(0)), count(0) {
        head->next = tail;  // an empty list is the two sentinels side by side
        tail->prev = head;
    }

    ~DoublyLinkedList() {
        Node* current = head;
        while (current) {
            Node* following = current->next;  // read it before the node is freed
            delete current;
            current = following;
        }
    }

    // A copy would share the same nodes, and they would be freed twice.
    DoublyLinkedList(const DoublyLinkedList&) = delete;
    DoublyLinkedList& operator=(const DoublyLinkedList&) = delete;

    int size() const { return count; }
    bool empty() const { return count == 0; }

    int front() const {
        requireNotEmpty();
        return head->next->value;
    }

    int back() const {
        requireNotEmpty();
        return tail->prev->value;
    }

    Node* pushFront(int value) { return insertBetween(head, head->next, value); }
    Node* pushBack(int value) { return insertBetween(tail->prev, tail, value); }

    // After this call, the new value is at position index. index == size() adds at the back.
    Node* insertAt(int index, int value) {
        if (index < 0 || index > count) throw out_of_range("insertAt");
        Node* after = nodeAt(index);
        return insertBetween(after->prev, after, value);
    }

    int popFront() {
        requireNotEmpty();
        return remove(head->next);
    }

    int popBack() {
        requireNotEmpty();
        return remove(tail->prev);
    }

    int removeAt(int index) {
        if (index < 0 || index >= count) throw out_of_range("removeAt");
        return remove(nodeAt(index));
    }

    // O(1): the node knows both neighbors, so no search is needed.
    int remove(Node* node) {
        node->prev->next = node->next;
        node->next->prev = node->prev;
        int value = node->value;
        delete node;
        count--;
        return value;
    }

    Node* find(int value) const {
        for (Node* current = head->next; current != tail; current = current->next) {
            if (current->value == value) return current;
        }
        return nullptr;
    }

    void reverse() {
        Node* current = head;
        while (current) {
            Node* following = current->next;  // the swap below would hide it
            swap(current->prev, current->next);
            current = following;
        }
        swap(head, tail);  // the old last sentinel now comes first
    }

    vector<int> forward() const {
        vector<int> values;
        for (Node* current = head->next; current != tail; current = current->next) {
            values.push_back(current->value);
        }
        return values;
    }

    vector<int> backward() const {
        vector<int> values;
        for (Node* current = tail->prev; current != head; current = current->prev) {
            values.push_back(current->value);
        }
        return values;
    }

    // Checks the linking rule on every pair of neighbors. Used only by tests.
    bool isConsistent() const {
        int seen = 0;
        for (Node* current = head; current != tail; current = current->next) {
            if (current->next->prev != current) return false;
            seen++;
        }
        return seen == count + 1 && head->prev == nullptr && tail->next == nullptr;
    }

private:
    Node* head;  // sentinel before the first real node
    Node* tail;  // sentinel after the last real node
    int count;

    void requireNotEmpty() const {
        if (count == 0) throw out_of_range("list is empty");
    }

    Node* insertBetween(Node* before, Node* after, int value) {
        Node* node = new Node(value);
        node->prev = before;  // fill in the new node first, so nothing is lost
        node->next = after;
        before->next = node;
        after->prev = node;
        count++;
        return node;
    }

    // Walks from the nearer end. index == count gives the tail sentinel.
    Node* nodeAt(int index) const {
        Node* current;
        if (index <= count / 2) {
            current = head->next;
            for (int i = 0; i < index; i++) current = current->next;
        } else {
            current = tail;
            for (int i = count; i > index; i--) current = current->prev;
        }
        return current;
    }
};

void show(const string& action, const DoublyLinkedList& items) {
    vector<int> values = items.forward();
    vector<int> reversedValues(values.rbegin(), values.rend());
    assert(items.backward() == reversedValues);  // both directions must agree
    assert(items.isConsistent());
    cout << left << setw(18) << action << "[";
    for (int i = 0; i < (int)values.size(); i++) {
        cout << (i ? ", " : "") << values[i];
    }
    cout << "]\n";
}

int main() {
    DoublyLinkedList items;
    assert(items.empty());

    items.pushBack(20);
    show("pushBack(20)", items);
    items.pushBack(30);
    show("pushBack(30)", items);
    items.pushFront(10);
    show("pushFront(10)", items);
    DoublyLinkedList::Node* fifteen = items.insertAt(1, 15);
    show("insertAt(1, 15)", items);
    items.insertAt(4, 40);
    show("insertAt(4, 40)", items);
    assert(items.removeAt(2) == 20);
    show("removeAt(2) -> 20", items);
    assert(items.popFront() == 10);
    show("popFront() -> 10", items);
    assert(items.popBack() == 40);
    show("popBack() -> 40", items);
    items.reverse();
    show("reverse()", items);
    assert(items.front() == 30 && items.back() == 15);
    assert(items.find(99) == nullptr);
    assert(items.remove(fifteen) == 15);  // O(1), the pointer came from insertAt
    show("remove(15 node)", items);
    assert(items.popBack() == 30);        // removing the only node
    show("popBack() -> 30", items);

    // Edge cases on an empty list.
    assert(items.empty());
    bool threw = false;
    try {
        items.popFront();
    } catch (const out_of_range&) {
        threw = true;
    }
    assert(threw);
    items.reverse();  // reversing an empty list must be safe
    show("reverse()", items);

    // Tricky case: random steps must match std::list at every moment.
    mt19937 rng(12345);
    DoublyLinkedList mine;
    list<int> model;
    for (int step = 0; step < 3000; step++) {
        int value = (int)(rng() % 100);
        int size = (int)model.size();
        int choice = (int)(rng() % 6);
        if (choice == 0) {
            mine.pushFront(value);
            model.push_front(value);
        } else if (choice == 1) {
            mine.pushBack(value);
            model.push_back(value);
        } else if (choice == 2) {
            int index = (int)(rng() % (size + 1));
            mine.insertAt(index, value);
            model.insert(next(model.begin(), index), value);
        } else if (choice == 3 && size > 0) {
            int index = (int)(rng() % size);
            auto position = next(model.begin(), index);
            assert(mine.removeAt(index) == *position);
            model.erase(position);
        } else if (choice == 4 && size > 0) {
            assert(mine.popBack() == model.back());
            model.pop_back();
        } else if (choice == 5) {
            mine.reverse();
            model.reverse();
        }
        assert(mine.forward() == vector<int>(model.begin(), model.end()));
        assert(mine.isConsistent());
    }

    cout << "All tests passed\n";
}
```

```text output
pushBack(20)      [20]
pushBack(30)      [20, 30]
pushFront(10)     [10, 20, 30]
insertAt(1, 15)   [10, 15, 20, 30]
insertAt(4, 40)   [10, 15, 20, 30, 40]
removeAt(2) -> 20 [10, 15, 30, 40]
popFront() -> 10  [15, 30, 40]
popBack() -> 40   [15, 30]
reverse()         [30, 15]
remove(15 node)   [30]
popBack() -> 30   []
reverse()         []
All tests passed
```

**Cost of each operation:**

| Operation | Time | Why |
|---|---|---|
| `pushFront`, `pushBack` | O(1) | Both ends are one step from a sentinel |
| `popFront`, `popBack` | O(1) | The same |
| `remove(node)` | O(1) | The node knows both neighbors |
| `insertAt`, `removeAt` | O(min(i, n - i)) | The walk starts from the nearer end |
| `find` | O(n) | It may check every node |
| `reverse` | O(n) | It visits every node once |
| `forward`, `backward` | O(n) | They visit every node once |
| Destructor | O(n) | It frees every node once |

**How `reverse` works here.** Each node swaps its two pointers, and this includes the sentinels. Then the sentinels trade names.

```text
start:             HEAD <-> 10 <-> 20 <-> TAIL
swap in each node: TAIL <-> 20 <-> 10 <-> HEAD    (read from the right end)
swap(head, tail):  the node called head is now the left end
```

[P1](#p1-reverse-a-doubly-linked-list-classic-easy) traces the same idea step by step on a list with no sentinels.

## 5. Compared with the alternatives

n is the number of elements.

| Operation | Array (`vector`) | Singly linked list | Doubly linked list |
|---|---|---|---|
| Read position i | O(1) | O(i) | O(min(i, n - i)) |
| Add or remove at the back | O(1) amortized | O(1) with a tail pointer, but O(n) to remove | O(1) |
| Add or remove at the front | O(n) | O(1) | O(1) |
| Remove, given a pointer to the node | O(n) | O(n), because you need the previous node | O(1) |
| Walk backward | Easy | Not possible | Easy |
| Extra memory per element | None | 1 pointer | 2 pointers |

The right-hand column looks best, but the array still wins for most tasks. Its elements sit next to each other in memory, so a scan is fast in practice. Each list node is a separate allocation, and each pointer you follow can land anywhere in memory. Choose a list only when you need O(1) changes at a position you already hold.

## 6. `std::list`

`std::list` is a doubly linked list. It has no `[]`, because that would be O(n) and easy to misuse.

Two features make it useful:

- **Stable iterators.** An iterator is a safe pointer to an element. Adding or removing other elements does not break it. In a `vector`, these changes can break it.
- **`splice`.** It moves nodes from one position to another in O(1), by changing pointers only. Nothing is copied.

```cpp
#include <bits/stdc++.h>
#include <cassert>
using namespace std;

int main() {
    list<int> items = {10, 20, 30};
    auto position = next(items.begin());      // points at 20

    items.insert(position, 15);               // 10, 15, 20, 30
    assert(*position == 20);                  // still valid after the insert

    position = items.erase(position);         // erase returns the next position
    assert(*position == 30);

    list<int> other = {1, 2};
    items.splice(items.begin(), other);       // moves both nodes, copies nothing
    assert(other.empty());
    assert((vector<int>(items.begin(), items.end()) == vector<int>{1, 2, 10, 15, 30}));

    // Move the last node to the front in O(1). An LRU cache does exactly this.
    items.splice(items.begin(), items, prev(items.end()));
    assert((vector<int>(items.begin(), items.end()) == vector<int>{30, 1, 2, 10, 15}));
    cout << "All tests passed\n";
}
```

## 7. Why an LRU cache needs a doubly linked list

An **LRU cache** keeps the most recently used items. When it is full, it removes the item that was used longest ago. It must do two things fast:

1. Find an item by its key.
2. Move that item to the "most recent" end, and remove from the "oldest" end.

A hash map does the first in O(1) on average. It gives you a pointer to the item's node. Now you must take that node out of the middle of the order, and this is the exact operation that a doubly linked list does in O(1).

```text
map:   key -> pointer to node

list:  HEAD <-> newest <-> ... <-> oldest <-> TAIL
```

A singly linked list cannot do it, because removing a node needs its previous node. [LRU and LFU cache](../13-design-problems/01-lru-and-lfu-cache.md) builds the whole structure.

## 8. Other list variants

- **XOR linked list:** one field replaces both pointers. [P7](#p7-xor-linked-list-classic-medium) builds it.
- **Unrolled linked list:** each node holds a small array of elements. You get a list's cheap changes, and most scans stay inside one block of memory.
- **Self-organizing list:** after a search finds an element, the list moves it toward the front, so that popular elements are found faster.

## 9. Solved problems

The problems below use a plain list with no sentinels, unless they say otherwise.

### P1. Reverse a Doubly Linked List (Classic, Easy)

**Problem:** Reverse a doubly linked list in place, and return its new first node.

**Example:** `10 <-> 20 <-> 30` becomes `30 <-> 20 <-> 10`.

**Pattern:** Linked list manipulation

**How to recognize it:** "Reverse" and "in place" on a list with two pointers per node. Unlike a singly linked list, no pointer direction is lost, so each node can be fixed alone.

**Brute force:** Copy the values into an array, then write them back in reverse order. That is O(n) time, but O(n) extra space, and it moves values rather than nodes.

**Key idea:** In a reversed list, each node's `next` is its old `prev`, and its `prev` is its old `next`. So swap the two pointers in every node. After the swap, the old `next` is stored in `prev`, so that is how you step forward.

**Dry run:** on `10 <-> 20 <-> 30`.

| current | prev after swap | next after swap | Move to |
|---|---|---|---|
| 10 | 20 | null | 20 |
| 20 | 30 | 10 | 30 |
| 30 | null | 20 | null, so stop |

The last node visited is 30, so it is the new first node.

```cpp
#include <bits/stdc++.h>
#include <cassert>
using namespace std;

struct Node {
    int value;
    Node* prev;
    Node* next;
    explicit Node(int v) : value(v), prev(nullptr), next(nullptr) {}
};

Node* reverseList(Node* head) {
    Node* newHead = nullptr;
    for (Node* current = head; current != nullptr; current = current->prev) {
        swap(current->prev, current->next);
        newHead = current;  // after the swap, the old next is in prev, so the loop uses prev
    }
    return newHead;
}

Node* build(const vector<int>& values) {
    Node* head = nullptr;
    Node* last = nullptr;
    for (int value : values) {
        Node* node = new Node(value);
        node->prev = last;
        if (last) last->next = node;
        else head = node;
        last = node;
    }
    return head;
}

vector<int> forwardValues(Node* head) {
    vector<int> values;
    for (Node* node = head; node; node = node->next) values.push_back(node->value);
    return values;
}

vector<int> backwardValues(Node* head) {
    vector<int> values;
    Node* last = head;
    while (last && last->next) last = last->next;
    for (Node* node = last; node; node = node->prev) values.push_back(node->value);
    return values;
}

void freeList(Node* head) {
    while (head) {
        Node* following = head->next;
        delete head;
        head = following;
    }
}

int main() {
    Node* a = reverseList(build({10, 20, 30}));
    assert(forwardValues(a) == vector<int>({30, 20, 10}));
    assert(backwardValues(a) == vector<int>({10, 20, 30}));  // prev pointers must be right too
    freeList(a);

    assert(reverseList(nullptr) == nullptr);  // empty list

    Node* b = reverseList(build({7}));        // one node
    assert(forwardValues(b) == vector<int>({7}) && b->prev == nullptr && b->next == nullptr);
    freeList(b);
    cout << "All tests passed\n";
}
```

**Complexity:** O(n) time, because each node is visited once. O(1) space.

**Edge cases:** an empty list and a one-node list.

### P2. Delete a Node Given Only a Pointer to It (Classic, Easy)

**Problem:** You get the first node of a list and a pointer to a node in it. Delete that node, and return the first node of the result.

**Example:** Deleting 20 from `10 <-> 20 <-> 30` gives `10 <-> 30`.

**Pattern:** Linked list manipulation

**How to recognize it:** You already hold the node, so no search is needed. There are no sentinels, so the ends need checks.

**Brute force:** Walk from the first node to find the node before it. That is O(n), and the walk is not needed, because `prev` already tells you.

**Key idea:** Fix each neighbour only if it exists. If there is no previous node, the node was first, so the head moves.

```cpp
#include <bits/stdc++.h>
#include <cassert>
using namespace std;

struct Node {
    int value;
    Node* prev;
    Node* next;
    explicit Node(int v) : value(v), prev(nullptr), next(nullptr) {}
};

Node* removeNode(Node* head, Node* node) {
    if (node->prev) node->prev->next = node->next;
    else head = node->next;  // node was the first node
    if (node->next) node->next->prev = node->prev;
    delete node;
    return head;
}

Node* append(Node* last, int value) {
    Node* node = new Node(value);
    node->prev = last;
    if (last) last->next = node;
    return node;
}

vector<int> values(Node* head) {
    vector<int> result;
    for (Node* node = head; node; node = node->next) {
        if (node->next) assert(node->next->prev == node);  // the linking rule
        result.push_back(node->value);
    }
    return result;
}

int main() {
    Node* first = append(nullptr, 10);
    Node* second = append(first, 20);
    Node* third = append(second, 30);

    Node* head = removeNode(first, second);     // the middle
    assert(values(head) == vector<int>({10, 30}));
    head = removeNode(head, third);             // the last
    assert(values(head) == vector<int>({10}));
    head = removeNode(head, first);             // the only node
    assert(head == nullptr);
    cout << "All tests passed\n";
}
```

**Complexity:** O(1) time and space.

**Follow-up:** "What if the list is singly linked, and you get only the node?" You cannot reach the previous node. If the node is not the last, copy the next node's value into it, then delete the next node. This is [Delete Node in a Linked List](https://leetcode.com/problems/delete-node-in-a-linked-list/). The last node cannot be deleted this way.

### P3. Find Pairs With a Given Sum in a Sorted Doubly Linked List (Classic, Easy)

**Problem:** A doubly linked list is sorted and has distinct values. Find all the pairs that add up to a target, using O(1) extra space.

**Example:** `1 <-> 2 <-> 4 <-> 5 <-> 6 <-> 8 <-> 9` with target 7 gives `(1, 6)` and `(2, 5)`.

**Pattern:** Two pointers: opposite ends

**How to recognize it:** "Sorted" and "pairs with a sum" point to two pointers from both ends. An array gives this directly. A list gives it only because `prev` lets the right pointer move backward.

**Brute force:** Check every pair, which is O(n^2).

**Key idea:** Start at both ends. If the sum is too small, move the left pointer forward, because the left value cannot reach the target with any remaining value. If it is too large, move the right pointer backward. See [two pointers from both ends](../05-core-patterns/01-two-pointers-opposite-ends.md) for why this is safe.

**Dry run:** on the example, with target 7.

| left | right | Sum | Action |
|---|---|---|---|
| 1 | 9 | 10 | too big, move right |
| 1 | 8 | 9 | too big, move right |
| 1 | 6 | 7 | record, move both |
| 2 | 5 | 7 | record, move both |
| 4 | 4 | | the pointers met, stop |

```cpp
#include <bits/stdc++.h>
#include <cassert>
using namespace std;

struct Node {
    int value;
    Node* prev;
    Node* next;
    explicit Node(int v) : value(v), prev(nullptr), next(nullptr) {}
};

vector<pair<int, int>> pairsWithSum(Node* first, Node* last, long long target) {
    vector<pair<int, int>> pairs;
    Node* left = first;
    Node* right = last;
    // right->next == left means that the pointers crossed after moving together.
    while (left && right && left != right && right->next != left) {
        long long sum = (long long)left->value + right->value;
        if (sum == target) {
            pairs.push_back({left->value, right->value});
            left = left->next;
            right = right->prev;
        } else if (sum < target) {
            left = left->next;
        } else {
            right = right->prev;
        }
    }
    return pairs;
}

struct TestList {
    vector<unique_ptr<Node>> nodes;  // frees every node at the end of the test
    Node* first() { return nodes.empty() ? nullptr : nodes.front().get(); }
    Node* last() { return nodes.empty() ? nullptr : nodes.back().get(); }
    explicit TestList(const vector<int>& values) {
        for (int value : values) {
            nodes.push_back(make_unique<Node>(value));
            if (nodes.size() > 1) {
                Node* before = nodes[nodes.size() - 2].get();
                before->next = nodes.back().get();
                nodes.back()->prev = before;
            }
        }
    }
};

int main() {
    using Pairs = vector<pair<int, int>>;
    TestList a({1, 2, 4, 5, 6, 8, 9});
    assert(pairsWithSum(a.first(), a.last(), 7) == Pairs({{1, 6}, {2, 5}}));

    TestList b({1, 2, 3, 4});
    assert(pairsWithSum(b.first(), b.last(), 5) == Pairs({{1, 4}, {2, 3}}));  // even length: pointers cross

    TestList c({1, 5, 6});
    assert(pairsWithSum(c.first(), c.last(), 100).empty());  // no pair

    TestList d({4});
    assert(pairsWithSum(d.first(), d.last(), 8).empty());    // one node cannot pair with itself

    TestList e({});
    assert(pairsWithSum(e.first(), e.last(), 8).empty());    // empty list
    cout << "All tests passed\n";
}
```

**Complexity:** O(n) time, because each step moves a pointer and they meet after at most n steps. O(1) extra space, not counting the output.

**Edge cases:** the loop has two stop rules. `left != right` handles an odd meeting. `right->next != left` handles an even meeting, where the pointers cross without landing on one node.

### P4. Design Browser History ([LeetCode 1472](https://leetcode.com/problems/design-browser-history/), Medium)

**Problem:** Build a browser history. `visit(url)` opens a page and clears all the forward history. `back(steps)` and `forward(steps)` move at most that many steps, and return the current URL.

**Example:** Visit `a`, then `b`, then `c`. `back(1)` gives `b`. Visiting `d` now removes `c` from the forward history.

**Pattern:** Design: data structure

**How to recognize it:** "Back" and "forward" around a current position is the signal in the table above. You step both ways, and you cut everything after the current page.

**Brute force:** Keep a `vector` of pages and rebuild it on each `visit`. That costs O(n) per visit.

**Key idea:** Keep a pointer to the current page. `back` and `forward` follow `prev` and `next`. `visit` frees all the nodes after the current page, then links a new one.

**Dry run:** the state after each call. The `*` marks the current page.

```text
BrowserHistory(leet)   leet*
visit(google)          leet <-> google*
visit(fb)              leet <-> google <-> fb*
back(1) -> google      leet <-> google* <-> fb
forward(5) -> fb       leet <-> google <-> fb*     (stops at the end)
back(1) -> google      leet <-> google* <-> fb
visit(link)            leet <-> google <-> link*   (fb is gone)
```

```cpp
#include <bits/stdc++.h>
#include <cassert>
using namespace std;

class BrowserHistory {
    struct Page {
        string url;
        Page* prev;
        Page* next;
    };
    Page* current;

    void freeFrom(Page* page) {
        while (page) {
            Page* following = page->next;
            delete page;
            page = following;
        }
    }

public:
    BrowserHistory(string homepage) : current(new Page{homepage, nullptr, nullptr}) {}

    ~BrowserHistory() {
        while (current->prev) current = current->prev;
        freeFrom(current);
    }

    BrowserHistory(const BrowserHistory&) = delete;
    BrowserHistory& operator=(const BrowserHistory&) = delete;

    void visit(string url) {
        freeFrom(current->next);  // a new page clears the forward history
        Page* page = new Page{url, current, nullptr};
        current->next = page;
        current = page;
    }

    string back(int steps) {
        while (steps > 0 && current->prev) {
            current = current->prev;
            steps--;
        }
        return current->url;
    }

    string forward(int steps) {
        while (steps > 0 && current->next) {
            current = current->next;
            steps--;
        }
        return current->url;
    }
};

int main() {
    BrowserHistory history("leetcode.com");
    history.visit("google.com");
    history.visit("facebook.com");
    history.visit("youtube.com");
    assert(history.back(1) == "facebook.com");
    assert(history.back(1) == "google.com");
    assert(history.forward(1) == "facebook.com");
    history.visit("linkedin.com");                  // removes youtube.com
    assert(history.forward(2) == "linkedin.com");   // nothing ahead, so it stays
    assert(history.back(2) == "google.com");
    assert(history.back(7) == "leetcode.com");      // stops at the first page
    cout << "All tests passed\n";
}
```

**Complexity:** `back` and `forward` take O(steps) time. `visit` takes O(1) amortized time: each node is freed at most once, so the frees are paid for by the visits that made them. O(n) space for n pages.

**Follow-up:** "Can `back` and `forward` be O(1)?" Yes. Store the pages in a `vector`, with a `current` index and a `last` index. Then `back(steps)` is `current = max(0, current - steps)`, and `visit` overwrites the next slot and sets `last`, with no need to free anything.

### P5. Flatten a Multilevel Doubly Linked List ([LeetCode 430](https://leetcode.com/problems/flatten-a-multilevel-doubly-linked-list/), Medium)

**Problem:** Each node has `prev`, `next` and a `child` pointer, and a child starts another list that can have children too. Flatten everything into one level, so that each child list sits right after its parent node. Set all the `child` pointers to null.

**Example:**

```text
1 - 2 - 3 - 4 - 5 - 6
        |
        7 - 8 - 9 - 10
            |
            11 - 12

becomes 1, 2, 3, 7, 8, 11, 12, 9, 10, 4, 5, 6
```

**Pattern:** Linked list manipulation

**How to recognize it:** "Child pointer" and "flatten" mean you must splice one list into another. The order (a child goes right after its parent) is the same as a preorder walk of a tree.

**Brute force:** Do a preorder walk, copy the values to an array, and build a new list. That is O(n) extra space, and the problem wants the same nodes.

**Key idea:** Walk the top level. When a node has a child, find the tail of the child list, and splice the whole child list between the node and its `next`. Then keep walking. You will walk through the child list you just spliced, so deeper children are handled the same way, with no recursion.

**Dry run:** at node 3 of the example.

```text
before:  3 <-> 4        child list: 7 <-> 8 <-> 9 <-> 10

step 1:  find the tail of the child list: 10
step 2:  10->next = 4,  4->prev = 10
step 3:  3->next = 7,   7->prev = 3
step 4:  3->child = null

after:   3 <-> 7 <-> 8 <-> 9 <-> 10 <-> 4
```

```cpp
#include <bits/stdc++.h>
#include <cassert>
using namespace std;

class Node {
public:
    int val;
    Node* prev;
    Node* next;
    Node* child;
    explicit Node(int v) : val(v), prev(nullptr), next(nullptr), child(nullptr) {}
};

class Solution {
public:
    Node* flatten(Node* head) {
        for (Node* current = head; current != nullptr; current = current->next) {
            if (current->child == nullptr) continue;

            Node* childTail = current->child;
            while (childTail->next != nullptr) childTail = childTail->next;

            childTail->next = current->next;
            if (current->next != nullptr) current->next->prev = childTail;  // current may be last

            current->next = current->child;
            current->child->prev = current;
            current->child = nullptr;
        }
        return head;
    }
};

Node* buildLevel(const vector<int>& values, vector<Node*>& all) {
    Node* first = nullptr;
    Node* last = nullptr;
    for (int value : values) {
        Node* node = new Node(value);
        all.push_back(node);
        node->prev = last;
        if (last) last->next = node;
        else first = node;
        last = node;
    }
    return first;
}

Node* nodeWithValue(Node* head, int value) {
    while (head->val != value) head = head->next;
    return head;
}

vector<int> flatValues(Node* head) {
    vector<int> result;
    for (Node* node = head; node; node = node->next) {
        assert(node->child == nullptr);
        if (node->next) assert(node->next->prev == node);
        result.push_back(node->val);
    }
    return result;
}

int main() {
    Solution solution;
    vector<Node*> all;
    Node* top = buildLevel({1, 2, 3, 4, 5, 6}, all);
    Node* middle = buildLevel({7, 8, 9, 10}, all);
    Node* bottom = buildLevel({11, 12}, all);
    nodeWithValue(top, 3)->child = middle;
    nodeWithValue(middle, 8)->child = bottom;
    assert(flatValues(solution.flatten(top)) == vector<int>({1, 2, 3, 7, 8, 11, 12, 9, 10, 4, 5, 6}));

    Node* parent = buildLevel({1}, all);                   // a child on the last node
    parent->child = buildLevel({2}, all);
    assert(flatValues(solution.flatten(parent)) == vector<int>({1, 2}));

    assert(solution.flatten(nullptr) == nullptr);          // empty list

    for (Node* node : all) delete node;
    cout << "All tests passed\n";
}
```

**Complexity:** O(n) time. The main walk visits each node once. Each child list is walked once to find its tail, so that adds at most n steps. O(1) extra space.

**Edge cases:** a child on the last node, where `current->next` is null. Forgetting to set `child` to null is the most common bug here.

### P6. Convert Binary Search Tree to Sorted Doubly Linked List ([LeetCode 426](https://leetcode.com/problems/convert-binary-search-tree-to-sorted-doubly-linked-list/), Medium, Premium)

**Problem:** Convert a binary search tree into a sorted, circular doubly linked list, in place. Use `left` as `prev` and `right` as `next`. Return the smallest node. The last node's `right` points to the smallest, and the smallest node's `left` points to the last.

**Example:** The tree with root 4, left child 2 (with children 1 and 3) and right child 5 gives `1 <-> 2 <-> 3 <-> 4 <-> 5`, joined in a circle.

**Pattern:** Tree DFS

**How to recognize it:** "Sorted" with a BST means an inorder walk, because inorder visits a BST's values in sorted order. "In place" means you reuse the two child pointers as `prev` and `next`.

**Brute force:** Copy the nodes in inorder to an array, then link neighbours. That is O(n) extra space.

**Key idea:** During the inorder walk, remember the last node you visited. Link it with the current node. At the end, join the first and last nodes.

```text
     4            visit order: 1, 2, 3, 4, 5
   /   \
  2     5         visit 2: link 1 <-> 2
 / \              visit 3: link 2 <-> 3
1   3             and so on
```

It is safe to overwrite `left` and `right` during the walk. A node's `left` changes only after its left subtree is finished. Its `right` changes only when the next node in order is visited, and by then the walk has already read that pointer.

```cpp
#include <bits/stdc++.h>
#include <cassert>
using namespace std;

class Node {
public:
    int val;
    Node* left;
    Node* right;
    explicit Node(int v) : val(v), left(nullptr), right(nullptr) {}
};

class Solution {
    void inorder(Node* node, Node*& first, Node*& last) {
        if (node == nullptr) return;
        inorder(node->left, first, last);
        if (last != nullptr) {
            last->right = node;
            node->left = last;
        } else {
            first = node;  // the smallest node is the first one visited
        }
        last = node;
        inorder(node->right, first, last);
    }

public:
    Node* treeToDoublyList(Node* root) {
        if (root == nullptr) return nullptr;
        Node* first = nullptr;
        Node* last = nullptr;
        inorder(root, first, last);
        first->left = last;   // close the circle
        last->right = first;
        return first;
    }
};

vector<int> circleValues(Node* first) {
    vector<int> result;
    Node* node = first;
    do {
        assert(node->right->left == node);  // the linking rule, around the whole circle
        result.push_back(node->val);
        node = node->right;
    } while (node != first);
    return result;
}

int main() {
    Solution solution;
    vector<unique_ptr<Node>> nodes;
    auto make = [&](int value) {
        nodes.push_back(make_unique<Node>(value));
        return nodes.back().get();
    };

    Node* root = make(4);
    root->left = make(2);
    root->right = make(5);
    root->left->left = make(1);
    root->left->right = make(3);
    assert(circleValues(solution.treeToDoublyList(root)) == vector<int>({1, 2, 3, 4, 5}));

    Node* single = make(7);
    Node* one = solution.treeToDoublyList(single);
    assert(one->left == one && one->right == one);   // one node points to itself

    Node* skewed = make(1);                          // a chain to the right
    skewed->right = make(2);
    skewed->right->right = make(3);
    assert(circleValues(solution.treeToDoublyList(skewed)) == vector<int>({1, 2, 3}));

    assert(solution.treeToDoublyList(nullptr) == nullptr);
    cout << "All tests passed\n";
}
```

**Complexity:** O(n) time, because each node is visited once. O(h) space for the recursion stack, where h is the height of the tree. That is O(n) for a chain.

### P7. XOR Linked List (Classic, Medium)

**Problem:** Build a list that can walk in both directions, but stores only one link field in each node.

**Example:** Add 10, 20 and 30 at the back. A forward walk gives `10, 20, 30`, and a backward walk gives `30, 20, 10`.

**Pattern:** Data structure implementation

**How to recognize it:** A rare request: "a doubly linked list that uses less memory". The tool is XOR, which you may know from [bit manipulation](../05-core-patterns/17-bit-manipulation.md).

**Key idea:** XOR has a useful property: `a ^ b ^ a` gives `b`. So store `link = prev XOR next` in each node. If you arrive from the previous node, you already know `prev`, and `next` is `link ^ prev`.

```text
null    A    B    C    null

A.link = null ^ B
B.link = A ^ C
C.link = B ^ null

Walking forward, standing on B, having come from A:
next = B.link ^ A = A ^ C ^ A = C
```

The walk from either end works the same way, because XOR does not care about direction.

```cpp
#include <bits/stdc++.h>
#include <cassert>
using namespace std;

class XorList {
    struct Node {
        int value;
        uintptr_t link;  // the address of prev XOR the address of next
    };
    Node* head = nullptr;
    Node* tail = nullptr;

    static uintptr_t bitsOf(Node* node) { return reinterpret_cast<uintptr_t>(node); }
    static Node* nodeFrom(uintptr_t bits) { return reinterpret_cast<Node*>(bits); }

    vector<int> walkFrom(Node* start) const {
        vector<int> values;
        Node* previous = nullptr;
        Node* current = start;
        while (current != nullptr) {
            values.push_back(current->value);
            Node* following = nodeFrom(current->link ^ bitsOf(previous));
            previous = current;
            current = following;
        }
        return values;
    }

public:
    XorList() = default;
    XorList(const XorList&) = delete;
    XorList& operator=(const XorList&) = delete;

    ~XorList() {
        Node* previous = nullptr;
        Node* current = head;
        while (current != nullptr) {
            Node* following = nodeFrom(current->link ^ bitsOf(previous));
            previous = current;  // only the address is used after the delete below
            delete current;
            current = following;
        }
    }

    void pushBack(int value) {
        Node* node = new Node{value, bitsOf(tail)};  // tail ^ null is just tail
        if (tail) tail->link ^= bitsOf(node);        // tail's next was null, now it is node
        else head = node;
        tail = node;
    }

    void pushFront(int value) {
        Node* node = new Node{value, bitsOf(head)};
        if (head) head->link ^= bitsOf(node);
        else tail = node;
        head = node;
    }

    vector<int> forward() const { return walkFrom(head); }
    vector<int> backward() const { return walkFrom(tail); }
};

int main() {
    XorList items;
    assert(items.forward().empty());
    items.pushBack(10);
    items.pushBack(20);
    items.pushBack(30);
    items.pushFront(5);
    assert(items.forward() == vector<int>({5, 10, 20, 30}));
    assert(items.backward() == vector<int>({30, 20, 10, 5}));

    XorList one;
    one.pushFront(1);
    assert(one.forward() == vector<int>({1}) && one.backward() == vector<int>({1}));
    cout << "All tests passed\n";
}
```

**Complexity:** `pushFront` and `pushBack` are O(1). A walk is O(n). Each node saves one pointer.

**Why it is rarely used:** You cannot move from a node without knowing its neighbour, so a pointer to one node is not enough to remove it. Debuggers and garbage collectors cannot follow the links. Modern machines have plenty of memory, so the small saving is rarely worth this cost. It is mainly an interview curiosity.

## Common pitfalls

1. **Fixing only one direction.** After a change, check both `a->next` and `b->prev`. A forward walk can look right while `prev` is wrong, so test a backward walk too.
2. **Reading a pointer after `delete`.** Save `node->next` before you free the node.
3. **Dereferencing `nullptr` at the ends.** Without sentinels, `node->prev->next` crashes on the first node. Check it, or use sentinels.
4. **Changing `A->next` too early.** If you hold only `A`, then `A->next` is your only way to reach `C`. Fill in the new node first.
5. **Forgetting to update `head` or `tail`.** When the first or last node goes away, the outer pointer must move.
6. **Deleting a sentinel.** Check for `head->next == tail` before you pop.
7. **Copying a list class by value.** Two copies would free the same nodes. Delete the copy constructor, or write a real one.
8. **Choosing a list when you need `a[i]`.** Walking to position i is O(n). If you mostly read by index, use a `vector`.

## Practice list

- [ ] [Design Linked List](https://leetcode.com/problems/design-linked-list/) (LeetCode 707, Medium): build it again with sentinels, and compare the amount of code.
- [ ] [Design Circular Deque](https://leetcode.com/problems/design-circular-deque/) (LeetCode 641, Medium): a doubly linked list with a size limit.
- [ ] [Design Front Middle Back Queue](https://leetcode.com/problems/design-front-middle-back-queue/) (LeetCode 1670, Medium): keep a pointer to the middle, or use two deques.
- [ ] [LRU Cache](https://leetcode.com/problems/lru-cache/) (LeetCode 146, Medium): a hash map plus a doubly linked list.
- [ ] [Design a Text Editor](https://leetcode.com/problems/design-a-text-editor/) (LeetCode 2296, Hard): a cursor between nodes, or two stacks.
- [ ] [LFU Cache](https://leetcode.com/problems/lfu-cache/) (LeetCode 460, Hard): one doubly linked list per frequency.

## Interview questions

<details>
<summary><strong>Q1. Why is deleting a node O(1) in a doubly linked list but O(n) in a singly linked list?</strong></summary>

To remove a node, you must change the node before it. A doubly linked list gives you that node through `prev`, so only two pointers change. A singly linked list has no way back, so you must walk from the head to find the previous node. Both cases assume that you already hold the node. Finding it by value is O(n) in both.

</details>

<details>
<summary><strong>Q2. What are sentinel nodes, and why use them?</strong></summary>

They are fake nodes at both ends that hold no data. Every real node then has real neighbours, so insert and delete have one case instead of four, and `prev` and `next` are never null for a real node. The cost is two extra nodes, and you must take care never to return or delete a sentinel.

</details>

<details>
<summary><strong>Q3. Why does an LRU cache use a doubly linked list instead of a singly linked list?</strong></summary>

The hash map gives a pointer to a node in the middle of the order, and that node must move to the front in O(1). Taking a node out of the middle needs its previous node. A doubly linked list has it. A singly linked list would need an O(n) walk.

</details>

<details>
<summary><strong>Q4. When would you pick `std::list` over `std::vector`?</strong></summary>

Rarely. I would pick `std::list` when I insert or remove at positions that I already hold, when other code holds iterators that must stay valid, or when I need `splice`. For most tasks a `vector` is faster, even with some shifting, because its elements sit together in memory, while each list node is a separate allocation.

</details>

<details>
<summary><strong>Q5. How does a list reverse in O(1) space, and what must you check?</strong></summary>

I swap `prev` and `next` in each node, and step using `prev`, because that now holds the old `next`. The last node I touch becomes the new head. I then check an empty list, a one-node list, and a backward walk, because a bug in `prev` does not show up in a forward walk.

</details>
