# Strings From Zero

> **Level:** Beginner · **Priority:** T1 · **Time:** 240 min · **Read first:** [Arrays from zero](01-arrays-from-zero.md) · **Next:** [Hash tables from zero](03-hash-tables-from-zero.md)

A string is an array of small numbers that we read as text. This chapter teaches you how to work with those numbers, what each C++ string operation costs, and how to solve the string problems that appear most often in interviews.

## Quick revision

- A `char` is a small integer. `'a'` is 97, `'A'` is 65 and `'0'` is 48.
- `c - 'a'` gives a lowercase letter's position, from 0 to 25. `c - '0'` gives a digit's value.
- `int count[26]` is the fastest letter counter. Use it when the input is only lowercase letters.
- `s[i]`, `s.size()`, `s.pop_back()` are O(1). `s += c` is amortized O(1), which means O(1) on average over many calls.
- `s.substr(start, length)` is O(length). The second argument is a length, not an end index.
- `s = s + c` copies the whole string. In a loop it is O(n^2). Use `s += c`.
- `s.insert(0, ...)` and `s.erase(0, ...)` move every character, so each is O(n).
- **Substring:** no gaps, order kept. **Subsequence:** gaps allowed, order kept. **Subset:** gaps allowed, order ignored.
- **Palindrome check:** two pointers from both ends. **Anagram check:** compare letter counts.
- **Build backwards?** Use `push_back`, then `reverse` once at the end.
- **Parse a number:** `value = value * 10 + digit`, and check for overflow before you multiply.
- **Big-number math:** work from the rightmost digit, keep a carry, then reverse the result.
- Multiplying an n-digit number by an m-digit number gives at most n + m digits.

## How to recognize it

This is a data structure chapter, so recognition means choosing the right tool for the operations you need. Ask these questions.

1. Is the input text, or a number too big for `long long`?
2. Does the input use a small alphabet, such as lowercase letters or digits? If yes, a plain array of counts is enough.
3. Do you read each character once, from left or right, and build an answer as you go?
4. Does the output need exact spacing or format? Then careful simulation matters more than a clever idea.

| Words in the problem | What they tell you |
|---|---|
| "only lowercase English letters" | Use `int count[26]` and `c - 'a'` |
| "anagram", "same letters" | Compare letter counts |
| "palindrome", "reads the same backwards" | Two pointers from both ends |
| "in place", "O(1) extra memory" | Change the string with a read index and a write index |
| "reverse the words", "multiple spaces" | Scan word by word, and skip extra spaces yourself |
| "given two numbers as strings" | Digit-by-digit math with a carry |
| "you must not convert to an integer" | The number may be too big, so work on digits |
| "convert the string to an integer", "clamp" | Parse digits, and check for overflow at every step |
| "count consecutive characters" | Group equal neighbors, then write the group's size |
| "exactly maxWidth characters per line" | Pack words greedily, then spread the spaces |

**Not this pattern if:**

| You see | Use instead | Why |
|---|---|---|
| "longest substring" with a rule | [Variable sliding window](../05-core-patterns/05-sliding-window-variable.md) | Checking every substring is too slow. A window skips most of them. |
| Find a long pattern in a long text, with a worst-case limit | [KMP](../10-string-algorithms/02-kmp.md) | A plain search can compare again and again on repeated letters. |
| Group many strings that are anagrams | [Hashing patterns](04-hashing-patterns.md) | You need a map from a key to a group, not one comparison. |
| Many words that share prefixes | [Trie](../07-trees/13-trie.md) | A trie stores each shared prefix once. |
| Longest palindromic substring | [Palindromes and Manacher](../10-string-algorithms/01-palindromes-and-manacher.md) | One palindrome check is easy. Checking every substring is not. |
| Longest common subsequence of two strings | [LCS and edit distance](../09-dynamic-programming/07-lcs-and-edit-distance.md) | Each character has two choices, keep or skip, so you need DP. |
| Brackets inside brackets | [Stacks for expressions](../03-linked-lists-stacks-queues/06-stack-expressions-and-parentheses.md) | A stack remembers what is still open. |

## 1. The idea in plain English

Think of a row of numbered lockers. Each locker holds one small number. A shared chart says which letter each number means.

```text
index:   0    1    2
number:  99   97   116
letter:  c    a    t
```

The computer stores only the numbers. It reads them as letters when it prints them. So everything you know about arrays works here: you can jump to any index in O(1), and adding at the end is cheap. Adding at the front is slow, because every locker must move.

Here is a tiny problem: **how many times does `a` appear in `"banana"`?** Walk through the lockers and compare each one with 97. You do not need any special string tool. A string is just an array that you can read as text.

## 2. Characters are numbers

The chart is called **ASCII**. It gives a number from 0 to 127 to each common character. You do not need to learn the numbers. You only need to know that each of these groups is in order, with no gaps:

| Characters | Numbers |
|---|---|
| space | 32 |
| `'0'` to `'9'` | 48 to 57 |
| `'A'` to `'Z'` | 65 to 90 |
| `'a'` to `'z'` | 97 to 122 |

Because the groups have no gaps, subtraction gives you a position. `'d' - 'a'` is 100 - 97, which is 3. So `d` is at position 3 in the alphabet. The chart's real numbers cancel out, so you never have to remember them.

| You want | Write | Example |
|---|---|---|
| Letter to position 0 to 25 | `c - 'a'` | `'d' - 'a'` is 3 |
| Position to letter | `char('a' + i)` | `char('a' + 2)` is `'c'` |
| Digit char to number | `c - '0'` | `'7' - '0'` is 7 |
| Number 0 to 9 to digit char | `char('0' + d)` | `char('0' + 7)` is `'7'` |
| Lowercase to uppercase | `char(c - 'a' + 'A')` | `'g'` becomes `'G'` |
| Shift a letter by k, wrapping around | `char((c - 'a' + k) % 26 + 'a')` | `'y'` shifted by 3 is `'b'` |

Why does the shift work? `'y' - 'a'` is 24. Adding 3 gives 27. `27 % 26` is 1, and position 1 is `b`. The `%` wraps the end of the alphabet back to the start.

**The counting table** is the most used trick in this chapter. Each letter has a position, so an array of 26 integers can count them.

```text
s = "banana"

letter   position   count[0] (a)   count[1] (b)   count[13] (n)
b        1          0              1              0
a        0          1              1              0
n        13         1              1              1
a        0          2              1              1
n        13         2              1              2
a        0          3              1              2
```

```cpp
#include <bits/stdc++.h>
#include <cassert>
using namespace std;

int main() {
    assert('d' - 'a' == 3);          // position in the alphabet
    assert('7' - '0' == 7);          // digit char to number
    assert(char('a' + 2) == 'c');
    assert(char('0' + 7) == '7');
    assert(char('g' - 'a' + 'A') == 'G');
    assert(char(('y' - 'a' + 3) % 26 + 'a') == 'b');  // wraps past z

    int count[26] = {};  // {} sets every entry to 0
    for (char c : string("banana")) count[c - 'a']++;
    assert(count['a' - 'a'] == 3);
    assert(count['b' - 'a'] == 1);
    assert(count['n' - 'a'] == 2);
    assert(count['z' - 'a'] == 0);

    // Cast to unsigned char: these functions need a value that is not negative.
    assert(isdigit((unsigned char)'5') && !isdigit((unsigned char)'x'));
    assert(isalpha((unsigned char)'x') && tolower((unsigned char)'Q') == 'q');
    cout << "All tests passed\n";
}
```

**A warning about `char`.** The C++ standard lets `char` be signed, so a byte above 127 can be negative. If you use a character directly as an index into a table of 256 entries, cast it first: `table[(unsigned char)c]`.

## 3. The C++ string and the cost of each operation

`std::string` is a growing array of characters, like `vector<char>`. It stores its size, so it does not need to search for the end. In C++ you can change a string in place.

The next program shows the state after each operation. Every line is checked by an `assert`.

```cpp
#include <bits/stdc++.h>
#include <cassert>
using namespace std;

int main() {
    string s = "cat";
    assert(s.size() == 3 && s[0] == 'c' && s.back() == 't');

    s += 's';               assert(s == "cats");
    s.push_back('!');       assert(s == "cats!");
    s.pop_back();           assert(s == "cats");
    s.insert(0, "my ");     assert(s == "my cats");
    s.erase(0, 3);          assert(s == "cats");   // erase(start, length)
    s[0] = 'b';             assert(s == "bats");

    assert(s.substr(1, 2) == "at");                // substr(start, length)
    assert(s.substr(2) == "ts");                   // no length: to the end
    assert(s == "bats");                           // substr does not change s
    assert(s.find("ts") == 2);
    assert(s.find("zz") == string::npos);          // npos means "not found"
    assert(string("apple") < string("apply"));     // dictionary order
    assert(string(3, 'x') == "xxx");               // 3 copies of 'x'

    reverse(s.begin(), s.end());  assert(s == "stab");
    sort(s.begin(), s.end());     assert(s == "abst");
    cout << "All tests passed\n";
}
```

Here n is the size of `s`, and m is the size of `t`.

| Operation | Cost | Why |
|---|---|---|
| `s[i]`, `s.size()`, `s.back()` | O(1) | Direct access. The size is stored. |
| `s.push_back(c)`, `s += c` | O(1) amortized | There is usually free space. See [the next section](#4-a-small-string-built-from-zero). |
| `s.pop_back()` | O(1) | Only the size changes. |
| `s += t` | O(m) amortized | Copies t to the end. |
| `s + t` | O(n + m) | Makes a new string and copies both. |
| `s.substr(i, len)` | O(len) | Makes a new string and copies len characters. |
| `s.insert(i, t)` | O(n - i + m) | Moves everything after i, then copies t. |
| `s.erase(i, len)` | O(n - i) | Moves everything after the erased part. |
| `s == t` | O(min(n, m)) | Stops at the first difference. |
| `s.find(t)` | O(n * m) worst case | Tries each start, and compares up to m characters there. |
| `reverse` | O(n) | Swaps each pair once. |
| `sort` | O(n log n) | The usual cost of sorting. |

`substr` is the hidden cost that people miss. It looks like one small step, but it copies. A loop that calls `substr` on every index costs O(n^2) time. The [Big-O chapter](../00-start-here/03-big-o-from-zero.md) explains how to read these costs.

## 4. A small string built from zero

To understand the table above, build the core of a string yourself. It needs three things:

- `data_`: a block of memory.
- `size_`: how many characters are in use.
- `capacity_`: how many characters fit before you need a new block.

When the block is full, you get a block twice as big and copy everything across. That copy is O(n), but it happens rarely. Doubling means the copies add up to less than 2n for n push operations, so each push costs O(1) on average. This is what **amortized O(1)** means. The [amortized analysis chapter](../00-start-here/07-amortized-analysis.md) gives the full proof.

```cpp
#include <bits/stdc++.h>
#include <cassert>
using namespace std;

class SimpleString {
    char* data_;
    int size_;
    int capacity_;

    void growTo(int newCapacity) {
        char* bigger = new char[newCapacity];
        copy(data_, data_ + size_, bigger);
        delete[] data_;
        data_ = bigger;
        capacity_ = newCapacity;
    }

public:
    SimpleString() : data_(new char[2]), size_(0), capacity_(2) {}
    ~SimpleString() { delete[] data_; }

    // Two strings must never share one block, or it would be freed twice.
    SimpleString(const SimpleString& other)
        : data_(new char[other.capacity_]), size_(other.size_), capacity_(other.capacity_) {
        copy(other.data_, other.data_ + size_, data_);
    }
    SimpleString& operator=(const SimpleString&) = delete;  // not needed in this demo

    int size() const { return size_; }
    int capacity() const { return capacity_; }
    bool empty() const { return size_ == 0; }

    char get(int index) const {
        assert(index >= 0 && index < size_);
        return data_[index];
    }

    void set(int index, char c) {
        assert(index >= 0 && index < size_);
        data_[index] = c;
    }

    void pushBack(char c) {
        if (size_ == capacity_) growTo(capacity_ * 2);  // doubling keeps pushes O(1) amortized
        data_[size_++] = c;
    }

    void popBack() {
        assert(size_ > 0);
        size_--;  // the old character stays in memory, but it is no longer part of the string
    }

    void append(const string& text) {
        for (char c : text) pushBack(c);
    }

    void insertAt(int index, char c) {
        assert(index >= 0 && index <= size_);
        pushBack(c);  // makes room, and may grow the block
        // Move from the right, so that no character is overwritten before it is copied.
        for (int i = size_ - 1; i > index; i--) data_[i] = data_[i - 1];
        data_[index] = c;
    }

    void eraseAt(int index) {
        assert(index >= 0 && index < size_);
        for (int i = index; i + 1 < size_; i++) data_[i] = data_[i + 1];
        size_--;
    }

    int find(const string& pattern) const {
        int m = (int)pattern.size();
        for (int start = 0; start + m <= size_; start++) {
            int matched = 0;
            while (matched < m && data_[start + matched] == pattern[matched]) matched++;
            if (matched == m) return start;
        }
        return -1;
    }

    SimpleString substr(int start, int length) const {
        assert(start >= 0 && length >= 0 && start + length <= size_);
        SimpleString result;
        for (int i = start; i < start + length; i++) result.pushBack(data_[i]);
        return result;
    }

    string toStd() const { return string(data_, data_ + size_); }
};

void show(const string& label, const SimpleString& s) {
    cout << label << ": \"" << s.toStd() << "\" size " << s.size()
         << ", capacity " << s.capacity() << "\n";
}

int main() {
    SimpleString s;
    show("start", s);
    s.pushBack('c');        show("pushBack('c')", s);
    s.pushBack('a');        show("pushBack('a')", s);
    s.pushBack('t');        show("pushBack('t')", s);
    s.append("s!");         show("append(\"s!\")", s);
    s.insertAt(0, 's');     show("insertAt(0, 's')", s);
    s.eraseAt(1);           show("eraseAt(1)", s);
    s.popBack();            show("popBack()", s);
    s.set(1, 'i');          show("set(1, 'i')", s);
    cout << "find(\"ts\") = " << s.find("ts") << "\n";
    cout << "substr(1, 2) = \"" << s.substr(1, 2).toStd() << "\"\n";

    assert(s.find("zz") == -1 && s.find("") == 0);
    SimpleString one;
    one.pushBack('x');
    one.popBack();
    assert(one.empty());

    // Compare with std::string on random operations. The seed is fixed.
    mt19937 rng(12345);
    SimpleString mine;
    string model;
    for (int step = 0; step < 2000; step++) {
        int choice = rng() % 4;
        char c = char('a' + rng() % 3);
        if (choice == 0) {
            mine.pushBack(c);
            model.push_back(c);
        } else if (choice == 1 && !model.empty()) {
            mine.popBack();
            model.pop_back();
        } else if (choice == 2) {
            int index = rng() % (model.size() + 1);
            mine.insertAt(index, c);
            model.insert(model.begin() + index, c);
        } else if (choice == 3 && !model.empty()) {
            int index = rng() % model.size();
            mine.eraseAt(index);
            model.erase(index, 1);
        }
        assert(mine.toStd() == model);
    }
    cout << "All tests passed\n";
}
```

```text output
start: "" size 0, capacity 2
pushBack('c'): "c" size 1, capacity 2
pushBack('a'): "ca" size 2, capacity 2
pushBack('t'): "cat" size 3, capacity 4
append("s!"): "cats!" size 5, capacity 8
insertAt(0, 's'): "scats!" size 6, capacity 8
eraseAt(1): "sats!" size 5, capacity 8
popBack(): "sats" size 4, capacity 8
set(1, 'i'): "sits" size 4, capacity 8
find("ts") = 2
substr(1, 2) = "it"
All tests passed
```

Look at the capacity. It changed only twice, on the third character and on the fifth. Most pushes used free space. `insertAt` and `eraseAt` moved characters, which is why they cost O(n).

## 5. Substring, subsequence, subset

These three words sound alike, and interview problems depend on the difference. Take `s = "abc"`.

| Word | Meaning | Gaps? | Order kept? | Examples from `"abc"` | Count for n positions |
|---|---|---|---|---|---|
| **Substring** | One unbroken piece | No | Yes | `"ab"`, `"bc"`, `"abc"` | n(n + 1) / 2 non-empty |
| **Subsequence** | Delete some characters, keep the rest in order | Yes | Yes | `"ac"`, `"abc"`, `""` | 2^n, with the empty one |
| **Subset** | A group of characters where order does not matter | Yes | No | `{a, c}` is the same as `{c, a}` | 2^n, with the empty one |

Why those counts? A substring is fixed by its start and end. There are n choices of start at length 1, n - 1 at length 2, and so on. The sum is n(n + 1) / 2. For `"abc"` that is 6: `a`, `b`, `c`, `ab`, `bc`, `abc`. For a subsequence, each position is either kept or dropped, so there are 2 * 2 * 2 = 8 choices. If the string has repeated letters, some of these give equal strings, so these counts are by position.

The size of these counts is a warning. Trying every substring is about n^2 / 2 pieces. Trying every subsequence is 2^n, which is only possible for very small n.

- `"ac"` is a subsequence of `"abc"`, but not a substring, because it skips `b`.
- `"ca"` is not a subsequence of `"abc"`, because the order changed. As a subset, `{c, a}` is fine.

Testing each one is short. A subsequence test walks both strings once, and each match moves forward in `t`.

```cpp
#include <bits/stdc++.h>
#include <cassert>
using namespace std;

bool isSubstring(const string& t, const string& s) {
    return s.find(t) != string::npos;
}

bool isSubsequence(const string& t, const string& s) {
    int matched = 0;
    for (char c : s) {
        if (matched < (int)t.size() && c == t[matched]) matched++;
    }
    return matched == (int)t.size();
}

int main() {
    assert(isSubstring("ab", "abc") && !isSubstring("ac", "abc"));
    assert(isSubsequence("ac", "abc") && !isSubsequence("ca", "abc"));
    assert(isSubsequence("", "abc") && isSubstring("", "abc"));  // the empty string is in both
    assert(!isSubsequence("a", ""));
    cout << "All tests passed\n";
}
```

## 6. Palindromes and anagrams

A **palindrome** reads the same forwards and backwards, like `"level"`. An **anagram** uses the same letters the same number of times, in any order, like `"listen"` and `"silent"`.

These two checks appear inside many larger problems.

- **Palindrome:** put one index at each end and move them inward. Stop at the first pair that differs.
- **Anagram:** count the letters of the first string, then subtract the letters of the second. All counts must end at 0.

```text
"level"    compare l and l, then e and e. The middle v has no partner, so it is fine.
"levels"   compare l and s. They differ, so stop.
```

```cpp
#include <bits/stdc++.h>
#include <cassert>
using namespace std;

bool isPalindrome(const string& s) {
    int left = 0, right = (int)s.size() - 1;
    while (left < right) {
        if (s[left] != s[right]) return false;
        left++;
        right--;
    }
    return true;
}

// Assumes both strings use only lowercase letters.
bool isAnagram(const string& a, const string& b) {
    if (a.size() != b.size()) return false;
    int count[26] = {};
    for (char c : a) count[c - 'a']++;
    for (char c : b) count[c - 'a']--;
    for (int value : count) {
        if (value != 0) return false;
    }
    return true;
}

int main() {
    assert(isPalindrome("level") && isPalindrome("noon"));
    assert(isPalindrome("") && isPalindrome("x"));  // empty and one character are palindromes
    assert(!isPalindrome("levels"));
    assert(isAnagram("listen", "silent"));
    assert(!isAnagram("aab", "abb"));               // same letters, different counts
    assert(!isAnagram("ab", "abc"));
    cout << "All tests passed\n";
}
```

Both checks are O(n) time. The palindrome check uses O(1) space. The anagram check uses a table of 26 entries, which is also O(1) space.

## 7. Building strings efficiently

Three habits keep string building at O(n).

**Habit 1: use `+=`, not `s = s + c`.** The second form makes a new string on every step. For n steps it copies 1 + 2 + ... + n characters, which is O(n^2).

**Habit 2: build backwards, then reverse once.** Adding at the front moves every character, so n such inserts cost O(n^2). Instead, add at the back, and call `reverse` at the end.

**Habit 3: put separators between items, not after them.** Add the separator only if the result is not empty. You then have no extra space to remove at the end.

```cpp
#include <bits/stdc++.h>
#include <cassert>
using namespace std;

string digitsOf(int value) {
    if (value == 0) return "0";
    string result;
    while (value > 0) {
        result += char('0' + value % 10);  // the last digit comes first
        value /= 10;
    }
    reverse(result.begin(), result.end());  // one O(n) reverse, not n O(n) inserts
    return result;
}

string join(const vector<string>& words, const string& separator) {
    string result;
    for (int i = 0; i < (int)words.size(); i++) {
        if (i > 0) result += separator;
        result += words[i];
    }
    return result;
}

int main() {
    assert(digitsOf(0) == "0");
    assert(digitsOf(407) == "407");
    assert(join({"a", "b", "c"}, ", ") == "a, b, c");
    assert(join({"only"}, ", ") == "only");
    assert(join({}, ", ") == "");
    cout << "All tests passed\n";
}
```

## 8. Parsing a number from a string

To read `"472"`, start with 0. Each new digit shifts the old value one place left, which is the same as multiplying by 10.

| Character | Digit | value * 10 + digit | value |
|---|---|---|---|
| `4` | 4 | 0 * 10 + 4 | 4 |
| `7` | 7 | 4 * 10 + 7 | 47 |
| `2` | 2 | 47 * 10 + 2 | 472 |

The danger is **overflow**: the result can pass `INT_MAX`, which is 2,147,483,647. In C++, overflow of a signed integer is undefined behaviour, so you must check before the multiplication happens.

You want to know whether `value * 10 + digit > INT_MAX`. Move the terms to the other side, so that nothing can overflow:

```text
value > (INT_MAX - digit) / 10
```

[P11](#p11-string-to-integer-atoi-leetcode-8-medium) uses this check.

## 9. Big-number math on strings

A `long long` holds at most about 19 digits. A number with 100 digits must stay in a string. You then do what you learned at school: start at the right, work one digit at a time, and carry.

```text
    4 5 6
  +   7 7
  -------
    5 3 3        6 + 7 = 13, write 3, carry 1
                 5 + 7 + 1 = 13, write 3, carry 1
                 4 + 0 + 1 = 5, write 5, carry 0
```

One loop handles every case. Keep going while either number has digits left, or a carry remains. A number that has run out gives 0.

The same template works in any base. Binary only changes the 10 to a 2, as you can see by comparing [P7](#p7-add-binary-leetcode-67-easy) with [P8](#p8-add-strings-leetcode-415-easy).

## 10. Solved problems

### P1. Reverse String ([LeetCode 344](https://leetcode.com/problems/reverse-string/), Easy)

**Problem:** Reverse an array of characters in place, using O(1) extra memory.

**Example:** `['h', 'e', 'l', 'l', 'o']` becomes `['o', 'l', 'l', 'e', 'h']`.

**Pattern:** Two pointers: opposite ends

**How to recognize it:** "In place" and "O(1) extra memory" rule out building a new array. Reversing means the first item swaps with the last, the second with the second last, and so on.

**Brute force:** Copy into a new array backwards. That is O(n) time, but O(n) extra space, which the problem forbids.

**Key idea:** Swap the two ends, then move both indexes inward. Stop when they meet.

```cpp
#include <bits/stdc++.h>
#include <cassert>
using namespace std;

class Solution {
public:
    void reverseString(vector<char>& s) {
        int left = 0, right = (int)s.size() - 1;
        while (left < right) {
            swap(s[left], s[right]);
            left++;
            right--;
        }
    }
};

int main() {
    Solution solution;
    vector<char> a = {'h', 'e', 'l', 'l', 'o'};
    solution.reverseString(a);
    assert((a == vector<char>{'o', 'l', 'l', 'e', 'h'}));
    vector<char> b = {'a', 'b'};
    solution.reverseString(b);
    assert((b == vector<char>{'b', 'a'}));
    vector<char> c = {'x'};
    solution.reverseString(c);  // one element: nothing to swap
    assert((c == vector<char>{'x'}));
    cout << "All tests passed\n";
}
```

**Complexity:** O(n) time, because each swap fixes two positions. O(1) space.

**Edge cases:** one element, and even and odd lengths. The condition `left < right` handles both.

### P2. Valid Anagram ([LeetCode 242](https://leetcode.com/problems/valid-anagram/), Easy)

**Problem:** Given two strings of lowercase letters, decide whether one is an anagram of the other.

**Example:** `"anagram"` and `"nagaram"` give `true`. `"rat"` and `"car"` give `false`.

**Pattern:** Frequency counting

**How to recognize it:** "Same letters" with order ignored means you compare counts. "Lowercase English letters" means a table of 26 is enough.

**Brute force:** Sort both strings and compare them. That is O(n log n) time.

**Key idea:** Add 1 for each letter of `s`, and subtract 1 for each letter of `t`. If the strings are anagrams, every count returns to 0.

```cpp
#include <bits/stdc++.h>
#include <cassert>
using namespace std;

class Solution {
public:
    bool isAnagram(string s, string t) {
        if (s.size() != t.size()) return false;  // different lengths can never match
        int count[26] = {};
        for (int i = 0; i < (int)s.size(); i++) {
            count[s[i] - 'a']++;
            count[t[i] - 'a']--;
        }
        for (int value : count) {
            if (value != 0) return false;
        }
        return true;
    }
};

int main() {
    Solution solution;
    assert(solution.isAnagram("anagram", "nagaram"));
    assert(!solution.isAnagram("rat", "car"));
    assert(!solution.isAnagram("a", "ab"));   // different lengths
    assert(!solution.isAnagram("aab", "abb")); // same letters, different counts
    assert(solution.isAnagram("", ""));
    cout << "All tests passed\n";
}
```

**Complexity:** O(n) time. O(1) space, because the table always has 26 entries.

**Follow-up:** "What if the input can hold any Unicode character?" A table of 26 no longer works. Use an `unordered_map`, which makes the space O(k), where k is the number of distinct characters.

### P3. First Unique Character in a String ([LeetCode 387](https://leetcode.com/problems/first-unique-character-in-a-string/), Easy)

**Problem:** Return the index of the first character that appears exactly once, or -1 if there is none. The string has only lowercase letters.

**Example:** `"loveleetcode"` gives `2`, the index of `v`.

**Pattern:** Frequency counting

**How to recognize it:** "Appears exactly once" needs counts of the whole string. "First" means you then scan again from the left.

**Brute force:** For each index, scan the rest of the string for a repeat. O(n^2) time.

**Key idea:** Make two passes. The first pass counts, and the second finds the first index with a count of 1. One pass is not enough, because a later letter can repeat an earlier one.

```cpp
#include <bits/stdc++.h>
#include <cassert>
using namespace std;

class Solution {
public:
    int firstUniqChar(string s) {
        int count[26] = {};
        for (char c : s) count[c - 'a']++;
        for (int i = 0; i < (int)s.size(); i++) {
            if (count[s[i] - 'a'] == 1) return i;
        }
        return -1;
    }
};

int main() {
    Solution solution;
    assert(solution.firstUniqChar("leetcode") == 0);
    assert(solution.firstUniqChar("loveleetcode") == 2);
    assert(solution.firstUniqChar("aabb") == -1);  // every letter repeats
    assert(solution.firstUniqChar("z") == 0);
    cout << "All tests passed\n";
}
```

**Complexity:** O(n) time, with two passes. O(1) space for the table.

### P4. Longest Common Prefix ([LeetCode 14](https://leetcode.com/problems/longest-common-prefix/), Easy)

**Problem:** Find the longest prefix that all the strings share. Return an empty string if there is none. A **prefix** is a piece that starts at index 0.

**Example:** `["flower", "flow", "flight"]` gives `"fl"`.

**Pattern:** String manipulation

**How to recognize it:** "Common to all" means every string must agree at each position. The first disagreement ends the answer, so you can stop early.

**Brute force:** Try each prefix of the first string and test it against all the others. With m as its length, that is O(n * m^2) time.

**Key idea:** Compare column by column. Take each character of the first string, and check that position in every other string. Stop at the first mismatch, or when a string ends.

```text
flower
flow
flight
^^        columns 0 and 1 match
  ^       column 2: o, o, i differ, so the answer is "fl"
```

```cpp
#include <bits/stdc++.h>
#include <cassert>
using namespace std;

class Solution {
public:
    string longestCommonPrefix(vector<string>& strs) {
        string& first = strs[0];
        for (int column = 0; column < (int)first.size(); column++) {
            for (const string& other : strs) {
                // The short-circuit check must come first, or other[column] reads past the end.
                if (column == (int)other.size() || other[column] != first[column]) {
                    return first.substr(0, column);
                }
            }
        }
        return first;
    }
};

int main() {
    Solution solution;
    vector<string> a = {"flower", "flow", "flight"};
    assert(solution.longestCommonPrefix(a) == "fl");
    vector<string> b = {"dog", "racecar", "car"};
    assert(solution.longestCommonPrefix(b) == "");
    vector<string> c = {"alone"};
    assert(solution.longestCommonPrefix(c) == "alone");
    vector<string> d = {"ab", "a"};
    assert(solution.longestCommonPrefix(d) == "a");  // a shorter string ends the prefix
    vector<string> e = {"", "abc"};
    assert(solution.longestCommonPrefix(e) == "");
    cout << "All tests passed\n";
}
```

**Complexity:** O(S) time, where S is the total number of characters, because each character is compared at most once. O(1) extra space, not counting the result.

**Edge cases:** one string, an empty string in the list, and a string that is a prefix of the others.

### P5. Length of Last Word ([LeetCode 58](https://leetcode.com/problems/length-of-last-word/), Easy)

**Problem:** A string has words and spaces, and at least one word. Return the length of the last word.

**Example:** `"   fly me   to   the moon  "` gives `4`.

**Pattern:** String manipulation

**How to recognize it:** Only the end of the string matters, so start from the end. The trap is the trailing spaces.

**Brute force:** Split the whole string into words and take the last one. O(n) time and O(n) space.

**Key idea:** Walk backwards. Skip the spaces first, then count letters until the next space or the start of the string.

```cpp
#include <bits/stdc++.h>
#include <cassert>
using namespace std;

class Solution {
public:
    int lengthOfLastWord(string s) {
        int i = (int)s.size() - 1;
        while (i >= 0 && s[i] == ' ') i--;  // skip spaces at the end
        int length = 0;
        while (i >= 0 && s[i] != ' ') {
            length++;
            i--;
        }
        return length;
    }
};

int main() {
    Solution solution;
    assert(solution.lengthOfLastWord("Hello World") == 5);
    assert(solution.lengthOfLastWord("   fly me   to   the moon  ") == 4);
    assert(solution.lengthOfLastWord("a") == 1);
    assert(solution.lengthOfLastWord("a ") == 1);  // trailing space
    cout << "All tests passed\n";
}
```

**Complexity:** O(n) time in the worst case. O(1) space.

### P6. Roman to Integer ([LeetCode 13](https://leetcode.com/problems/roman-to-integer/), Easy)

**Problem:** Convert a Roman numeral to an integer. `I` is 1, `V` is 5, `X` is 10, `L` is 50, `C` is 100, `D` is 500 and `M` is 1000. A smaller value before a larger one is subtracted, so `IV` is 4.

**Example:** `"MCMXCIV"` gives `1994`.

**Pattern:** String manipulation

**How to recognize it:** Each symbol has a value, but its sign depends on the next symbol. So you look at one neighbour as you scan.

**Key idea:** Scan from left to right. If the current value is smaller than the next value, subtract it. Otherwise add it.

**Dry run:** on `"MCMXCIV"`.

| Symbol | Value | Next value | Action | Total |
|---|---|---|---|---|
| M | 1000 | 100 | add | 1000 |
| C | 100 | 1000 | subtract | 900 |
| M | 1000 | 10 | add | 1900 |
| X | 10 | 100 | subtract | 1890 |
| C | 100 | 1 | add | 1990 |
| I | 1 | 5 | subtract | 1989 |
| V | 5 | none | add | 1994 |

```cpp
#include <bits/stdc++.h>
#include <cassert>
using namespace std;

class Solution {
    int valueOf(char symbol) {
        switch (symbol) {
            case 'I': return 1;
            case 'V': return 5;
            case 'X': return 10;
            case 'L': return 50;
            case 'C': return 100;
            case 'D': return 500;
            default:  return 1000;  // 'M'
        }
    }

public:
    int romanToInt(string s) {
        int total = 0;
        for (int i = 0; i < (int)s.size(); i++) {
            int value = valueOf(s[i]);
            bool beforeLarger = i + 1 < (int)s.size() && value < valueOf(s[i + 1]);
            total += beforeLarger ? -value : value;
        }
        return total;
    }
};

int main() {
    Solution solution;
    assert(solution.romanToInt("III") == 3);
    assert(solution.romanToInt("IV") == 4);
    assert(solution.romanToInt("LVIII") == 58);
    assert(solution.romanToInt("MCMXCIV") == 1994);
    assert(solution.romanToInt("MMMCMXCIX") == 3999);  // the largest value allowed
    cout << "All tests passed\n";
}
```

**Complexity:** O(n) time. A valid numeral has at most 15 symbols, so this is also O(1) in practice. O(1) space.

### P7. Add Binary ([LeetCode 67](https://leetcode.com/problems/add-binary/), Easy)

**Problem:** Add two binary numbers given as strings, and return their sum as a binary string.

**Example:** `"1010" + "1011"` gives `"10101"`.

**Pattern:** String manipulation

**How to recognize it:** The inputs are strings of up to 10,000 digits, far too long for any integer type. That means digit-by-digit math with a carry.

**Key idea:** Use the template from [section 9](#9-big-number-math-on-strings) in base 2. Write `sum % 2`, and carry `sum / 2`.

```cpp
#include <bits/stdc++.h>
#include <cassert>
using namespace std;

class Solution {
public:
    string addBinary(string a, string b) {
        string result;
        int i = (int)a.size() - 1, j = (int)b.size() - 1, carry = 0;
        while (i >= 0 || j >= 0 || carry > 0) {
            int sum = carry;
            if (i >= 0) sum += a[i--] - '0';
            if (j >= 0) sum += b[j--] - '0';
            result += char('0' + sum % 2);
            carry = sum / 2;
        }
        reverse(result.begin(), result.end());
        return result;
    }
};

int main() {
    Solution solution;
    assert(solution.addBinary("11", "1") == "100");
    assert(solution.addBinary("1010", "1011") == "10101");
    assert(solution.addBinary("0", "0") == "0");
    assert(solution.addBinary("1", "111") == "1000");  // the carry makes a new digit
    cout << "All tests passed\n";
}
```

**Complexity:** O(max(n, m)) time, and the same space for the result.

**Edge cases:** different lengths, and a final carry that adds a new digit. `"0" + "0"` still gives `"0"`, because the loop runs once for the digits.

### P8. Add Strings ([LeetCode 415](https://leetcode.com/problems/add-strings/), Easy)

**Problem:** Add two non-negative integers given as strings, without converting them to integers.

**Example:** `"456" + "77"` gives `"533"`.

**Pattern:** String manipulation

**How to recognize it:** "Without converting to an integer" says the number may not fit in any integer type, so you work on digits.

**Key idea:** The template from [section 9](#9-big-number-math-on-strings) in base 10.

**Dry run:** on `"456" + "77"`.

| i | j | Digits | Sum with carry | Write | Carry | result so far |
|---|---|---|---|---|---|---|
| 2 | 1 | 6, 7 | 13 | 3 | 1 | `3` |
| 1 | 0 | 5, 7 | 13 | 3 | 1 | `33` |
| 0 | -1 | 4, none | 5 | 5 | 0 | `335` |

Reversing `335` gives `533`.

```cpp
#include <bits/stdc++.h>
#include <cassert>
using namespace std;

class Solution {
public:
    string addStrings(string num1, string num2) {
        string result;
        int i = (int)num1.size() - 1, j = (int)num2.size() - 1, carry = 0;
        while (i >= 0 || j >= 0 || carry > 0) {
            int sum = carry;
            if (i >= 0) sum += num1[i--] - '0';
            if (j >= 0) sum += num2[j--] - '0';
            result += char('0' + sum % 10);
            carry = sum / 10;
        }
        reverse(result.begin(), result.end());
        return result;
    }
};

int main() {
    Solution solution;
    assert(solution.addStrings("11", "123") == "134");
    assert(solution.addStrings("456", "77") == "533");
    assert(solution.addStrings("0", "0") == "0");
    assert(solution.addStrings("999", "1") == "1000");  // the carry runs to a new digit
    cout << "All tests passed\n";
}
```

**Complexity:** O(max(n, m)) time and space.

### P9. Reverse Words in a String ([LeetCode 151](https://leetcode.com/problems/reverse-words-in-a-string/), Medium)

**Problem:** Reverse the order of the words in a string. The result must have one space between words, and no spaces at either end. The input has at least one word.

**Example:** `"  hello   world  "` gives `"world hello"`.

**Pattern:** Two pointers: same direction

**How to recognize it:** "Multiple spaces" and "no extra spaces" mean you must control the spacing yourself. The follow-up asks for O(1) extra space, which needs a read index and a write index.

**Brute force:** Split into words, reverse the list, and join. That is O(n) time, but O(n) extra space.

**Key idea:** Reverse the whole string. The words are now in the right order, but each one is backwards. Then copy each word to the front, and reverse it there.

```text
start                "  hello   world  "
reverse everything   "  dlrow   olleh  "
fix each word        "world hello"
```

The write index can never pass the read index. It writes one space only after a word and at least one space have been read, so it never overwrites a character that is still needed.

```cpp
#include <bits/stdc++.h>
#include <cassert>
using namespace std;

class Solution {
public:
    string reverseWords(string s) {
        reverse(s.begin(), s.end());
        int n = (int)s.size(), write = 0, read = 0;
        while (read < n) {
            if (s[read] == ' ') {
                read++;
                continue;
            }
            if (write > 0) s[write++] = ' ';  // one space between words, none at the start
            int wordStart = write;
            while (read < n && s[read] != ' ') s[write++] = s[read++];
            reverse(s.begin() + wordStart, s.begin() + write);
        }
        s.resize(write);  // cut off whatever is left at the end
        return s;
    }
};

int main() {
    Solution solution;
    assert(solution.reverseWords("the sky is blue") == "blue is sky the");
    assert(solution.reverseWords("  hello   world  ") == "world hello");
    assert(solution.reverseWords("a good   example") == "example good a");
    assert(solution.reverseWords("one") == "one");
    assert(solution.reverseWords("   x   ") == "x");
    cout << "All tests passed\n";
}
```

**Complexity:** O(n) time, because each reverse touches a word once and the total length of all the words is at most n. O(1) extra space inside the function. On LeetCode the string is passed by value, so a copy exists, but the algorithm itself needs no more.

### P10. Integer to Roman ([LeetCode 12](https://leetcode.com/problems/integer-to-roman/), Medium)

**Problem:** Convert an integer from 1 to 3999 to a Roman numeral.

**Example:** `1994` gives `"MCMXCIV"`.

**Pattern:** Greedy

**How to recognize it:** You pay a value using a fixed set of "coins", and you want the standard form. Roman numerals are designed so that taking the largest symbol that fits always gives that form.

**Key idea:** Put the six subtractive pairs (`CM`, `CD`, `XC`, `XL`, `IX`, `IV`) in the table with the normal symbols, from largest to smallest. For each entry, while it fits, write it and subtract it.

**Dry run:** on `1994`.

| Remaining | Largest that fits | Write | Result |
|---|---|---|---|
| 1994 | 1000 | M | `M` |
| 994 | 900 | CM | `MCM` |
| 94 | 90 | XC | `MCMXC` |
| 4 | 4 | IV | `MCMXCIV` |

```cpp
#include <bits/stdc++.h>
#include <cassert>
using namespace std;

class Solution {
public:
    string intToRoman(int num) {
        const vector<pair<int, string>> symbols = {
            {1000, "M"}, {900, "CM"}, {500, "D"}, {400, "CD"}, {100, "C"}, {90, "XC"},
            {50, "L"}, {40, "XL"}, {10, "X"}, {9, "IX"}, {5, "V"}, {4, "IV"}, {1, "I"},
        };
        string result;
        for (const auto& [value, symbol] : symbols) {
            while (num >= value) {
                result += symbol;
                num -= value;
            }
        }
        return result;
    }
};

int main() {
    Solution solution;
    assert(solution.intToRoman(58) == "LVIII");
    assert(solution.intToRoman(1994) == "MCMXCIV");
    assert(solution.intToRoman(3749) == "MMMDCCXLIX");
    assert(solution.intToRoman(4) == "IV");
    assert(solution.intToRoman(3999) == "MMMCMXCIX");
    cout << "All tests passed\n";
}
```

**Complexity:** O(1) time and space, because the input is at most 3999 and the result has at most 15 symbols.

### P11. String to Integer (atoi) ([LeetCode 8](https://leetcode.com/problems/string-to-integer-atoi/), Medium)

**Problem:** Convert a string to a 32-bit signed integer, following these rules in order. Skip leading spaces. Read an optional `+` or `-`. Read digits until a non-digit or the end. If the value is out of range, clamp it to `INT_MIN` or `INT_MAX`. If there are no digits, return 0.

**Example:** `"   -042"` gives `-42`. `"1337c0d3"` gives `1337`. `"-91283472332"` gives `-2147483648`.

**Pattern:** String manipulation

**How to recognize it:** The statement lists exact steps, so this is careful simulation. "Clamp" tells you that overflow must be handled at every step.

**Key idea:** Use three phases, one for each rule. Check for overflow before each multiplication, using the rule from [section 8](#8-parsing-a-number-from-a-string). If the next digit would pass `INT_MAX`, return the limit for that sign.

The check works for the negative limit too. `INT_MIN` is one further from 0 than `INT_MAX`. Any value that passes `INT_MAX` must clamp to one of the limits, and `"-2147483648"` clamps to exactly the right number.

```cpp
#include <bits/stdc++.h>
#include <cassert>
using namespace std;

class Solution {
public:
    int myAtoi(string s) {
        int i = 0, n = (int)s.size();
        while (i < n && s[i] == ' ') i++;  // phase 1: leading spaces

        int sign = 1;
        if (i < n && (s[i] == '+' || s[i] == '-')) {  // phase 2: one optional sign
            if (s[i] == '-') sign = -1;
            i++;
        }

        int value = 0;  // phase 3: digits, kept as a positive number
        while (i < n && isdigit((unsigned char)s[i])) {
            int digit = s[i] - '0';
            if (value > (INT_MAX - digit) / 10) return sign == 1 ? INT_MAX : INT_MIN;
            value = value * 10 + digit;
            i++;
        }
        return sign * value;
    }
};

int main() {
    Solution solution;
    assert(solution.myAtoi("42") == 42);
    assert(solution.myAtoi("   -042") == -42);
    assert(solution.myAtoi("1337c0d3") == 1337);
    assert(solution.myAtoi("0-1") == 0);
    assert(solution.myAtoi("words and 987") == 0);  // no digits first
    assert(solution.myAtoi("") == 0);
    assert(solution.myAtoi("+") == 0);              // a sign with no digits
    assert(solution.myAtoi("-+12") == 0);           // only one sign is allowed
    assert(solution.myAtoi("2147483647") == INT_MAX);
    assert(solution.myAtoi("2147483648") == INT_MAX);
    assert(solution.myAtoi("-2147483648") == INT_MIN);
    assert(solution.myAtoi("-91283472332") == INT_MIN);
    cout << "All tests passed\n";
}
```

**Complexity:** O(n) time. O(1) space.

**Edge cases:** an empty string, a sign with no digits, a space after the sign (which ends the number), and the exact limits.

### P12. Zigzag Conversion ([LeetCode 6](https://leetcode.com/problems/zigzag-conversion/), Medium)

**Problem:** Write a string in a zigzag across `numRows` rows, then read it row by row.

**Example:** `"PAYPALISHIRING"` with 3 rows gives `"PAHNAPLSIIGYIR"`.

```text
P   A   H   N
A P L S I I G
Y   I   R
```

**Pattern:** Simulation

**How to recognize it:** The rule describes a movement, not a calculation. You can follow it step by step: go down, turn, go up, turn.

**Key idea:** Keep one string per row, and a current row. Add each character to the current row. Turn around at the top and at the bottom.

```cpp
#include <bits/stdc++.h>
#include <cassert>
using namespace std;

class Solution {
public:
    string convert(string s, int numRows) {
        if (numRows == 1) return s;  // there is no room to turn, and step would never change
        vector<string> rows(numRows);
        int row = 0, step = 1;
        for (char c : s) {
            rows[row] += c;
            if (row == 0) step = 1;
            else if (row == numRows - 1) step = -1;
            row += step;
        }
        string result;
        for (const string& r : rows) result += r;
        return result;
    }
};

int main() {
    Solution solution;
    assert(solution.convert("PAYPALISHIRING", 3) == "PAHNAPLSIIGYIR");
    assert(solution.convert("PAYPALISHIRING", 4) == "PINALSIGYAHRPI");
    assert(solution.convert("A", 1) == "A");
    assert(solution.convert("AB", 1) == "AB");       // one row: unchanged
    assert(solution.convert("ABC", 5) == "ABC");     // more rows than characters
    cout << "All tests passed\n";
}
```

**Complexity:** O(n) time. O(n) space for the rows.

**Edge cases:** `numRows == 1`. Without the first line, `row` would run past the last row. More rows than characters is fine, because the turn is never reached.

### P13. Count and Say ([LeetCode 38](https://leetcode.com/problems/count-and-say/), Medium)

**Problem:** The sequence starts with `"1"`. Each term describes the previous term out loud: `"1"` is "one 1", so the next term is `"11"`. That is "two 1s", so the next is `"21"`. Return the n-th term.

**Example:** `n = 4` gives `"1211"`.

**Pattern:** Run-length grouping

**How to recognize it:** "Count consecutive equal characters, then write the count and the character" is run-length grouping, applied n - 1 times.

**Key idea:** To build the next term, find each run of equal characters with an inner loop. Write the run's length, then the character.

| n | Term | Read as |
|---|---|---|
| 1 | `1` | start |
| 2 | `11` | one 1 |
| 3 | `21` | two 1s |
| 4 | `1211` | one 2, one 1 |
| 5 | `111221` | one 1, one 2, two 1s |

```cpp
#include <bits/stdc++.h>
#include <cassert>
using namespace std;

class Solution {
public:
    string countAndSay(int n) {
        string term = "1";
        for (int step = 2; step <= n; step++) {
            string next;
            int i = 0;
            while (i < (int)term.size()) {
                int runEnd = i;
                while (runEnd < (int)term.size() && term[runEnd] == term[i]) runEnd++;
                next += to_string(runEnd - i);
                next += term[i];
                i = runEnd;
            }
            term = next;
        }
        return term;
    }
};

int main() {
    Solution solution;
    assert(solution.countAndSay(1) == "1");
    assert(solution.countAndSay(2) == "11");
    assert(solution.countAndSay(4) == "1211");
    assert(solution.countAndSay(5) == "111221");
    assert(solution.countAndSay(6) == "312211");
    cout << "All tests passed\n";
}
```

**Complexity:** O(T) time, where T is the total length of all the terms up to n, because each term is scanned once. O(L) space, where L is the length of the longest term.

### P14. String Compression ([LeetCode 443](https://leetcode.com/problems/string-compression/), Medium)

**Problem:** Compress an array of characters in place. Each group of equal neighbours becomes the character, followed by its count if the count is more than 1. A count of 12 is written as two characters, `'1'` and `'2'`. Return the new length, using only O(1) extra space.

**Example:** `['a', 'a', 'b', 'b', 'c', 'c', 'c']` becomes `['a', '2', 'b', '2', 'c', '3']`, and the length is 6.

**Pattern:** Run-length grouping, Two pointers: same direction

**How to recognize it:** "Groups of consecutive characters" means run-length grouping. "In place" means a read index and a write index.

**Key idea:** `read` finds each group, and `write` stores the compressed form. The output is never longer than the input, because a group of length 1 writes one character, and a longer group writes at most as many characters as it has. So `write` can never pass `read`.

```cpp
#include <bits/stdc++.h>
#include <cassert>
using namespace std;

class Solution {
public:
    int compress(vector<char>& chars) {
        int write = 0, read = 0, n = (int)chars.size();
        while (read < n) {
            char current = chars[read];
            int groupStart = read;
            while (read < n && chars[read] == current) read++;
            int length = read - groupStart;
            chars[write++] = current;
            if (length > 1) {
                for (char digit : to_string(length)) chars[write++] = digit;
            }
        }
        return write;
    }
};

int main() {
    Solution solution;
    vector<char> a = {'a', 'a', 'b', 'b', 'c', 'c', 'c'};
    int lengthA = solution.compress(a);
    assert(lengthA == 6 && string(a.begin(), a.begin() + lengthA) == "a2b2c3");

    vector<char> b = {'a'};
    assert(solution.compress(b) == 1 && b[0] == 'a');  // a group of one writes no count

    vector<char> c = {'a', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b'};
    int lengthC = solution.compress(c);
    assert(lengthC == 4 && string(c.begin(), c.begin() + lengthC) == "ab12");  // two digits

    vector<char> d = {'a', 'b', 'c'};
    assert(solution.compress(d) == 3);  // nothing to compress
    cout << "All tests passed\n";
}
```

**Complexity:** O(n) time, because `read` only moves forward. O(1) extra space, since a count has at most a few digits.

### P15. Multiply Strings ([LeetCode 43](https://leetcode.com/problems/multiply-strings/), Medium)

**Problem:** Multiply two non-negative integers given as strings, without using a big-number library or converting them to integers.

**Example:** `"123" * "456"` gives `"56088"`.

**Pattern:** String manipulation

**How to recognize it:** Inputs of up to 200 digits, with a ban on converting. That means school multiplication on digits.

**Key idea:** The digit at index `i` of `num1` times the digit at index `j` of `num2` lands at positions `i + j` (the tens) and `i + j + 1` (the ones) of the result. An n-digit number times an m-digit number has at most n + m digits, so an array of n + m zeros is enough.

**Dry run:** on `"12" * "34"`. The result starts as `[0, 0, 0, 0]`.

| i, j | Digits | Product | Add to position i + j + 1 | Result after carrying |
|---|---|---|---|---|
| 1, 1 | 2 * 4 | 8 | position 3 | `[0, 0, 0, 8]` |
| 1, 0 | 2 * 3 | 6 | position 2 | `[0, 0, 6, 8]` |
| 0, 1 | 1 * 4 | 4 | position 2, 4 + 6 = 10 | `[0, 1, 0, 8]` |
| 0, 0 | 1 * 3 | 3 | position 1, 3 + 1 = 4 | `[0, 4, 0, 8]` |

Skipping the leading zero gives `"408"`, and 12 * 34 is 408.

```cpp
#include <bits/stdc++.h>
#include <cassert>
using namespace std;

class Solution {
public:
    string multiply(string num1, string num2) {
        int n = (int)num1.size(), m = (int)num2.size();
        vector<int> digits(n + m, 0);
        for (int i = n - 1; i >= 0; i--) {
            for (int j = m - 1; j >= 0; j--) {
                int product = (num1[i] - '0') * (num2[j] - '0');
                int sum = product + digits[i + j + 1];
                digits[i + j + 1] = sum % 10;
                digits[i + j] += sum / 10;  // this cell is cleaned up by a later step
            }
        }
        string result;
        for (int digit : digits) {
            if (!result.empty() || digit != 0) result += char('0' + digit);  // skip leading zeros
        }
        return result.empty() ? "0" : result;
    }
};

int main() {
    Solution solution;
    assert(solution.multiply("2", "3") == "6");
    assert(solution.multiply("12", "34") == "408");
    assert(solution.multiply("123", "456") == "56088");
    assert(solution.multiply("0", "12345") == "0");   // no leading zeros in the result
    assert(solution.multiply("99", "99") == "9801");  // the result uses all n + m digits
    assert(solution.multiply("99999999999999999999", "1") == "99999999999999999999");
    cout << "All tests passed\n";
}
```

**Complexity:** O(n * m) time, because every pair of digits is multiplied once. O(n + m) space.

**Edge cases:** a zero input must give `"0"`, not an empty string.

**Why the cell `digits[i + j]` is safe:** it can briefly hold more than 9. The next step that writes to that position adds it into `sum` and fixes it. The leftmost position that this can reach is position 0, and it never overflows, because the whole product has at most n + m digits.

### P16. Integer to English Words ([LeetCode 273](https://leetcode.com/problems/integer-to-english-words/), Hard)

**Problem:** Convert a non-negative integer to its English words.

**Example:** `1234567` gives `"One Million Two Hundred Thirty Four Thousand Five Hundred Sixty Seven"`.

**Pattern:** String manipulation

**How to recognize it:** There is no clever algorithm. It is Hard because of many small cases. Look for the repeating structure: English reads a number in groups of three digits, and each group has the same form.

**Key idea:** Write one helper that handles 1 to 999. Then split the number into groups of three digits, and add `Billion`, `Million` or `Thousand` after each group that is not zero.

```text
1,234,567   ->   1 Million   234 Thousand   567
```

```cpp
#include <bits/stdc++.h>
#include <cassert>
using namespace std;

class Solution {
    const vector<string> small = {
        "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten",
        "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen",
        "Eighteen", "Nineteen",
    };
    const vector<string> tens = {
        "", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety",
    };

    void addWord(string& text, const string& word) {
        if (!text.empty()) text += " ";
        text += word;
    }

    // The words for 1 to 999.
    string belowThousand(int n) {
        string words;
        if (n >= 100) {
            addWord(words, small[n / 100] + " Hundred");
            n %= 100;
        }
        if (n >= 20) {
            addWord(words, tens[n / 10]);
            n %= 10;
        }
        if (n > 0) addWord(words, small[n]);
        return words;
    }

public:
    string numberToWords(int num) {
        if (num == 0) return "Zero";
        const vector<pair<int, string>> groups = {
            {1000000000, " Billion"}, {1000000, " Million"}, {1000, " Thousand"}, {1, ""},
        };
        string result;
        for (const auto& [size, name] : groups) {
            int part = num / size;
            if (part > 0) addWord(result, belowThousand(part) + name);  // skip empty groups
            num %= size;
        }
        return result;
    }
};

int main() {
    Solution solution;
    assert(solution.numberToWords(0) == "Zero");
    assert(solution.numberToWords(123) == "One Hundred Twenty Three");
    assert(solution.numberToWords(12345) == "Twelve Thousand Three Hundred Forty Five");
    assert(solution.numberToWords(1234567) == "One Million Two Hundred Thirty Four Thousand Five Hundred Sixty Seven");
    assert(solution.numberToWords(1000000) == "One Million");     // empty groups say nothing
    assert(solution.numberToWords(1000010) == "One Million Ten");
    assert(solution.numberToWords(20) == "Twenty");
    assert(solution.numberToWords(2147483647) == "Two Billion One Hundred Forty Seven Million Four Hundred Eighty Three Thousand Six Hundred Forty Seven");
    cout << "All tests passed\n";
}
```

**Complexity:** O(1) time and space, because a 32-bit number has at most 10 digits.

**Edge cases:** 0 is the only number that needs the word `Zero`. Groups of zero must add nothing, as in `1000000`. Numbers from 10 to 19 have their own names, so `small` must go up to 19.

### P17. Text Justification ([LeetCode 68](https://leetcode.com/problems/text-justification/), Hard)

**Problem:** Format words into lines of exactly `maxWidth` characters. Pack as many words as fit on each line. Spread the spaces as evenly as possible, and when they cannot be even, the left gaps get the extra spaces. A line with one word, and the last line, are left-justified, with spaces added at the end.

**Example:** `["This", "is", "an", "example", "of", "text", "justification."]` with `maxWidth = 16` gives:

```text
"This    is    an"
"example  of text"
"justification.  "
```

**Pattern:** Greedy, Simulation

**How to recognize it:** "Exactly maxWidth characters per line" with fixed spacing rules. Packing as many words as fit is a greedy step that the statement gives you. The rest is exact simulation.

**Key idea:** Handle one line at a time, in two steps.

1. **Pack.** Find the last word that fits. Words need their letters plus at least one space between each pair.
2. **Spread.** If the line has `gaps` gaps and `spaces` spaces to place, each gap gets `spaces / gaps`, and the first `spaces % gaps` gaps get one more.

Take the first line. The words `This`, `is`, `an` use 8 letters, so there are 16 - 8 = 8 spaces for 2 gaps, which is 4 each. The next word `example` needs 7 more letters and one more space, which does not fit.

The second line is `example`, `of`, `text`, with 13 letters. That leaves 3 spaces for 2 gaps. Each gap gets 1, and the first gap gets the 1 extra, so the gaps are 2 and 1.

```cpp
#include <bits/stdc++.h>
#include <cassert>
using namespace std;

class Solution {
public:
    vector<string> fullJustify(vector<string>& words, int maxWidth) {
        vector<string> lines;
        int n = (int)words.size(), first = 0;
        while (first < n) {
            // Step 1: pack. (last + 1 - first) is the number of spaces needed so far.
            int last = first, letters = (int)words[first].size();
            while (last + 1 < n && letters + (last + 1 - first) + (int)words[last + 1].size() <= maxWidth) {
                last++;
                letters += (int)words[last].size();
            }

            // Step 2: spread.
            int gaps = last - first;
            string line = words[first];
            if (last == n - 1 || gaps == 0) {
                for (int i = first + 1; i <= last; i++) line += " " + words[i];
                line += string(maxWidth - (int)line.size(), ' ');
            } else {
                int spaces = maxWidth - letters;
                for (int gap = 0; gap < gaps; gap++) {
                    int width = spaces / gaps + (gap < spaces % gaps ? 1 : 0);  // left gaps get the extra
                    line += string(width, ' ') + words[first + gap + 1];
                }
            }
            lines.push_back(line);
            first = last + 1;
        }
        return lines;
    }
};

int main() {
    Solution solution;
    vector<string> a = {"This", "is", "an", "example", "of", "text", "justification."};
    vector<string> expectedA = {"This    is    an", "example  of text", "justification.  "};
    assert(solution.fullJustify(a, 16) == expectedA);

    vector<string> b = {"What", "must", "be", "acknowledgment", "shall", "be"};
    vector<string> expectedB = {"What   must   be", "acknowledgment  ", "shall be        "};
    assert(solution.fullJustify(b, 16) == expectedB);

    vector<string> c = {"a"};
    vector<string> expectedC = {"a   "};
    assert(solution.fullJustify(c, 4) == expectedC);   // one word on the last line

    vector<string> d = {"ab", "cd", "ef"};
    vector<string> expectedD = {"ab  cd", "ef    "};   // spread line, then last line
    assert(solution.fullJustify(d, 6) == expectedD);
    cout << "All tests passed\n";
}
```

**Complexity:** O(L + k * W) time and space, where L is the total number of letters, k is the number of lines and W is `maxWidth`.

**Edge cases:** a line with a single word that is not the last line (see `acknowledgment`), and the last line, which never spreads its spaces.

## Common pitfalls

1. **Using `s = s + c` in a loop.** It copies the whole string each time, which makes the loop O(n^2). Use `s += c`.
2. **Calling `substr` in a loop.** Each call copies. Compare with indexes when you can.
3. **Reading the second argument of `substr` as an end index.** `s.substr(2, 3)` means 3 characters starting at index 2, not indexes 2 to 3.
4. **Comparing `s.size()` with a negative number.** `size()` is unsigned, so `i < s.size()` with `i = -1` is false. Cast it: `i < (int)s.size()`.
5. **Forgetting the final carry.** `"999" + "1"` needs a new digit. Keep looping while `carry > 0`.
6. **Leaving leading zeros in a result.** `"0" * "123"` must be `"0"`, not `"000"` or an empty string.
7. **Checking overflow after it happens.** Signed overflow is undefined behaviour, so `value * 10 + digit` cannot be tested afterwards. Check first, using `value > (INT_MAX - digit) / 10`.
8. **Assuming a table of 26 fits the input.** Spaces, digits and uppercase letters make `c - 'a'` negative or too large. Read the constraints, and use a table of 128 or 256, or a map.

## Practice list

- [ ] [Reverse Words in a String III](https://leetcode.com/problems/reverse-words-in-a-string-iii/) (LeetCode 557, Easy): reverse each word in place.
- [ ] [Reverse Vowels of a String](https://leetcode.com/problems/reverse-vowels-of-a-string/) (LeetCode 345, Easy): two pointers that stop only at vowels.
- [ ] [Detect Capital](https://leetcode.com/problems/detect-capital/) (LeetCode 520, Easy): count the uppercase letters.
- [ ] [Goat Latin](https://leetcode.com/problems/goat-latin/) (LeetCode 824, Easy): split into words and follow the rules.
- [ ] [Find Common Characters](https://leetcode.com/problems/find-common-characters/) (LeetCode 1002, Easy): keep the minimum count of each letter.
- [ ] [Maximum Number of Balloons](https://leetcode.com/problems/maximum-number-of-balloons/) (LeetCode 1189, Easy): divide the counts by what one word needs.
- [ ] [Count Binary Substrings](https://leetcode.com/problems/count-binary-substrings/) (LeetCode 696, Easy): compare the lengths of neighbouring runs.
- [ ] [Minimum Time Difference](https://leetcode.com/problems/minimum-time-difference/) (LeetCode 539, Medium): convert to minutes, sort, and check the wrap past midnight.
- [ ] [Shifting Letters](https://leetcode.com/problems/shifting-letters/) (LeetCode 848, Medium): add the shifts from right to left, and use `%` to wrap.
- [ ] [Adding Spaces to a String](https://leetcode.com/problems/adding-spaces-to-a-string/) (LeetCode 2109, Medium): build a new string with two pointers instead of inserting.

## Interview questions

<details>
<summary><strong>Q1. Why can building a string in a loop be O(n^2)?</strong></summary>

`s = s + c` creates a new string and copies everything into it on every step, so the copies add up to 1 + 2 + ... + n. `s += c` adds to the existing block, and the block grows by doubling, so n appends cost O(n) in total. A string built by inserting at the front has the same problem, so I add at the back and reverse once at the end.

</details>

<details>
<summary><strong>Q2. What is the difference between a substring, a subsequence and a subset?</strong></summary>

A substring is one unbroken piece. A subsequence may skip characters, but it keeps their order. A subset ignores order as well. A string of n characters has about n^2 / 2 substrings but 2^n subsequences, so substring problems are usually solved with a window, and subsequence problems often need DP.

</details>

<details>
<summary><strong>Q3. How do you check for integer overflow when parsing a number?</strong></summary>

I check before I multiply, because signed overflow is undefined behaviour in C++ and it cannot be detected afterwards. I want to know whether `value * 10 + digit` passes `INT_MAX`, so I rearrange it to `value > (INT_MAX - digit) / 10`, which cannot overflow. Another option is to hold the value in a `long long` while it is small enough.

</details>

<details>
<summary><strong>Q4. When is a table of 26 better than a hash map?</strong></summary>

When the alphabet is small and known, such as lowercase letters. The table needs no hashing, so it is faster, and it counts as O(1) space. If the input can hold any Unicode character, I would use a hash map, whose space depends on the number of distinct characters.

</details>

<details>
<summary><strong>Q5. Why does Multiply Strings use an array of n + m digits?</strong></summary>

An n-digit number is less than 10^n, and an m-digit number is less than 10^m, so their product is less than 10^(n + m), which has at most n + m digits. The digit pair at indexes i and j adds to position i + j + 1, and its carry goes to position i + j. Filling this array is O(n * m), and it is simple because each position is handled one digit at a time.

</details>
