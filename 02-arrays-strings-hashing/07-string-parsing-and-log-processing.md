# String Parsing and Log Processing

> **Level:** Intermediate · **Priority:** T1 · **Time:** 180 min · **Read first:** [Strings from zero](02-strings-from-zero.md), [Hash tables from zero](03-hash-tables-from-zero.md) · **Next:** [Advanced hashing](08-advanced-hashing.md)

This chapter teaches you to turn lines of raw text into clean data, and then to answer questions about that data. It is the most common task type in online assessments. These tasks need no clever algorithm, but they punish careless work with dates, bad lines and missing fields.

## Quick revision

- **Four steps:** split the line, parse each field, group the records, aggregate the result.
- A line with n separators has **n + 1 fields**. Some of them may be empty.
- `getline` with a separator **drops a trailing empty field**. Use a hand-written `split` when an empty field matters.
- `stream >> word` splits on any run of spaces. Use it only when fields can never be empty.
- Parse digits by hand: `value = value * 10 + (c - '0')`.
- `stoi` throws on `"abc"` and returns 12 for `"12abc"`. Use it only on input that is already checked.
- **Seconds since midnight:** `h * 3600 + m * 60 + s`. Compare numbers, not time strings.
- Crossing midnight: `(end - start + 86400) % 86400`.
- **Leap year:** divisible by 4, but not by 100, unless also by 400. So 2000 is a leap year and 1900 is not.
- **Day number:** count all days from a fixed start. The gap between two dates is the difference of their day numbers.
- **Day of the week:** `dayNumber % 7`, where 0 means Sunday.
- Zero-padded dates and times, such as `2024-03-09` and `09:05:30`, sort correctly as plain strings.
- Validate in this order: field count, shape, digits, range.
- For bad lines, do what the problem says. Most tasks say to skip them, so skip and count.
- **State machine:** a table says "in this state, on this character, go to that state". Use it when the meaning of a character depends on what came before it.

## How to recognize it

Ask these four questions. If the answers are all yes, this chapter applies.

1. Is the input made of strings with a fixed format, such as fields joined by a separator?
2. Must you pull out values, such as numbers, times or names, before the real work starts?
3. Is the hard part following many small rules with care, and not finding a clever idea?
4. After parsing, is the rest a simple pass, a sort or a hash map?

| Words in the problem | What they tell you |
|---|---|
| "each line has the format", "log", "records" | Split, then parse each field |
| "comma-separated", "space-delimited" | The separator for `split` |
| "timestamp", "HH:MM:SS", "within 60 minutes" | Convert to seconds or minutes, then compare numbers |
| "YYYY-MM-DD", "days between", "day of the week" | Use a day number |
| "leap year", "February" | Use the leap year rule and a table of month lengths |
| "for each user", "per IP", "by city" | Group with a map from key to list or total |
| "in chronological order", "by time" | Sort by time before you process the records |
| "valid", "well-formed", "ignore malformed lines" | Check field count, shape, digits and range |
| "version", "1.10.2", "dotted" | Compare number by number, never as text |
| "comments", "inside quotes", "escaped" | The meaning depends on what came before, so use a state machine |
| "most common", "highest count" | Count with a map, then scan for the best |

**Not this pattern if:**

| You see | Use instead | Why |
|---|---|---|
| Nested brackets, or an expression to evaluate | [Stacks for expressions and parentheses](../03-linked-lists-stacks-queues/06-stack-expressions-and-parentheses.md) | Nesting can go to any depth, so a fixed set of states is not enough. |
| Find a pattern inside a long text, fast | [KMP string matching](../10-string-algorithms/02-kmp.md) | The difficulty is the search, not the format. |
| Overlapping time ranges | [Merge intervals](../05-core-patterns/09-merge-intervals.md) | After parsing, the question is about intervals. |
| "How many are active at the same time?" | [Difference arrays and sweep line](../05-core-patterns/07-difference-array-and-sweep-line.md) | Each start and end is an event that you count across time. |
| "Events in the last k seconds" on sorted times | [Sliding window: variable size](../05-core-patterns/05-sliding-window-variable.md) | The window moves with the time, so two pointers are enough. |
| Matching with `*` and `.` wildcards | [Finite automata and regex](../10-string-algorithms/08-finite-automata-and-regex.md) | One input can follow many paths at once. |
| Many steps that change a board or a list | [Simulation and enumeration](06-simulation-and-enumeration.md) | The input is easy to read. The rules are what you model. |

## 1. The idea in plain English

Think of a clerk with a pile of paper forms. For each form, the clerk reads the boxes, checks that they make sense, and throws out the bad forms. Then the clerk puts the forms into one folder per customer. Last, the clerk adds up each folder.

Your program does the same four things:

```text
raw line  ->  split  ->  parse  ->  group  ->  aggregate
```

A **field** is one piece of a line between separators. A **separator** is the character between fields, such as a comma. **Parsing** means turning text into a real value, such as the text `"250"` into the number 250. **Aggregating** means combining many values into one, such as a sum, a count or a maximum.

Here is a tiny task: **find the total amount for each user.**

```text
ann,250
bob,100
ann,50
```

| Line | Split | Parse | Group total after this line |
|---|---|---|---|
| `ann,250` | `ann`, `250` | user ann, amount 250 | ann 250 |
| `bob,100` | `bob`, `100` | user bob, amount 100 | ann 250, bob 100 |
| `ann,50` | `ann`, `50` | user ann, amount 50 | ann 300, bob 100 |

Every task in this chapter is a version of this table. The rest of the chapter makes each step safe.

## 2. Splitting a line into fields

This helper is the one to memorize. It keeps every field, including empty ones.

```cpp
#include <bits/stdc++.h>
#include <cassert>
using namespace std;

vector<string> split(const string& line, char separator) {
    vector<string> fields;
    string current;
    for (char c : line) {
        if (c == separator) {
            fields.push_back(current);
            current.clear();
        } else {
            current += c;
        }
    }
    fields.push_back(current);  // the last field has no separator after it
    return fields;
}

// Removes spaces and the '\r' that Windows files leave at the end of a line.
string trim(const string& text) {
    const string blanks = " \t\r\n";
    size_t first = text.find_first_not_of(blanks);
    if (first == string::npos) return "";
    size_t last = text.find_last_not_of(blanks);
    return text.substr(first, last - first + 1);
}

int main() {
    assert(split("a,b,c", ',') == vector<string>({"a", "b", "c"}));
    assert(split("a,,b", ',') == vector<string>({"a", "", "b"}));   // empty middle field
    assert(split("a,b,", ',') == vector<string>({"a", "b", ""}));   // empty last field
    assert(split("", ',') == vector<string>({""}));                 // no separator, one field

    // getline shows the trap: the empty last field is lost.
    stringstream stream("a,b,");
    string field;
    vector<string> fromGetline;
    while (getline(stream, field, ',')) fromGetline.push_back(field);
    assert(fromGetline == vector<string>({"a", "b"}));

    assert(trim("  ann\r") == "ann");
    assert(trim("   ") == "");
    cout << "All tests passed\n";
}
```

You have three ways to split, and each one treats empty fields differently:

| Input | `split(line, ',')` | `getline` with `','` | `stream >> word` |
|---|---|---|---|
| `a,b` | `a`, `b` | `a`, `b` | `a,b` (one word, no spaces) |
| `a,,b` | `a`, empty, `b` | `a`, empty, `b` | `a,,b` |
| `a,b,` | `a`, `b`, empty | `a`, `b` | `a,b,` |

| Input | `stream >> word` gives |
|---|---|
| `a b` | `a`, `b` |
| `  a    b  ` | `a`, `b` (extra spaces are ignored) |

Choose like this:

- Use `split` when an empty field means something, or when the line must have an exact number of fields. [P8](#p8-validate-ip-address-leetcode-468-medium) depends on this.
- Use `stream >> word` when fields are separated by spaces and can never be empty. [P2](#p2-reformat-date-leetcode-1507-easy) uses it.

## 3. Parsing numbers and times by hand

Digit characters sit next to each other in the character table. So `'7' - '0'` is 7. Each new digit shifts the old value one place left, which means multiplying by 10.

Trace `"305"`:

| Character | Digit | value after this step |
|---|---|---|
| `3` | 3 | 0 * 10 + 3 = 3 |
| `0` | 0 | 3 * 10 + 0 = 30 |
| `5` | 5 | 30 * 10 + 5 = 305 |

**Seconds since midnight** turn a clock time into one number. Then you can subtract and compare with normal arithmetic. For `09:05:30`:

```text
9 * 3600 + 5 * 60 + 30 = 32400 + 300 + 30 = 32730
```

To go back, divide. Hours are `32730 / 3600 = 9`. The remainder is 330. Minutes are `330 / 60 = 5`. Seconds are `330 % 60 = 30`.

**Crossing midnight.** A shift that starts at `23:50:00` and ends at `00:10:00` gives a negative difference. Add one day (86400 seconds), then take the remainder, so that normal cases stay the same. This works only when the gap is less than 24 hours.

```text
start = 85800, end = 600
(600 - 85800 + 86400) % 86400 = 1200 seconds = 20 minutes
```

```cpp
#include <bits/stdc++.h>
#include <cassert>
using namespace std;

// Accepts digits only. A sign, if allowed, must be handled by the caller.
bool parseInt(const string& text, int& value) {
    // Nine digits always fit in an int, so this limit also prevents overflow.
    if (text.empty() || text.size() > 9) return false;
    value = 0;
    for (char c : text) {
        if (c < '0' || c > '9') return false;
        value = value * 10 + (c - '0');
    }
    return true;
}

// The exact shape HH:MM:SS. Returns false on anything else.
bool parseTime(const string& text, int& seconds) {
    if (text.size() != 8 || text[2] != ':' || text[5] != ':') return false;
    int hours, minutes, secs;
    if (!parseInt(text.substr(0, 2), hours)) return false;
    if (!parseInt(text.substr(3, 2), minutes)) return false;
    if (!parseInt(text.substr(6, 2), secs)) return false;
    if (hours > 23 || minutes > 59 || secs > 59) return false;
    seconds = hours * 3600 + minutes * 60 + secs;
    return true;
}

string twoDigits(int value) {
    return (value < 10 ? "0" : "") + to_string(value);
}

string formatTime(int seconds) {
    return twoDigits(seconds / 3600) + ":" + twoDigits(seconds % 3600 / 60) + ":" + twoDigits(seconds % 60);
}

// Assumes that the real gap is less than one day.
int gapAcrossMidnight(int start, int end) {
    return (end - start + 86400) % 86400;
}

int main() {
    int value = -1;
    assert(parseInt("305", value) && value == 305);
    assert(parseInt("007", value) && value == 7);
    assert(!parseInt("", value));
    assert(!parseInt("12a", value));
    assert(!parseInt("-5", value));
    assert(!parseInt("1234567890", value));  // too long to be safe

    int seconds = -1;
    assert(parseTime("09:05:30", seconds) && seconds == 32730);
    assert(parseTime("00:00:00", seconds) && seconds == 0);
    assert(parseTime("23:59:59", seconds) && seconds == 86399);
    assert(!parseTime("24:00:00", seconds));
    assert(!parseTime("09:60:00", seconds));
    assert(!parseTime("9:05:30", seconds));   // hours must have two digits

    assert(formatTime(32730) == "09:05:30");
    assert(formatTime(0) == "00:00:00");
    assert(gapAcrossMidnight(85800, 600) == 1200);
    assert(gapAcrossMidnight(100, 700) == 600);  // no midnight, same answer as end - start
    cout << "All tests passed\n";
}
```

**When strings compare correctly.** If every time has the same width and zero padding, string order and time order are the same. So `"09:05:30" < "10:00:00"` is true. Dates in the form `YYYY-MM-DD` behave the same way. Without padding this fails: `"9:05" < "10:00"` is false, because `'9'` comes after `'1'`.

## 4. Date arithmetic

**Leap year.** The earth takes about 365.2425 days to go around the sun. So the calendar adds a day to some years. A leap year has 366 days, because February has 29 days.

| Year | Divisible by 4? | By 100? | By 400? | Leap? |
|---|---|---|---|---|
| 2023 | no | no | no | no |
| 2024 | yes | no | no | yes |
| 1900 | yes | yes | no | no |
| 2000 | yes | yes | yes | yes |

```text
isLeap(y) = (y % 4 == 0 and y % 100 != 0) or (y % 400 == 0)
```

**Day number.** Two dates are hard to subtract directly, because months have different lengths. So give every date one number: how many days have passed from a fixed start. Our start is the first day of year 1, using today's calendar rules for all years. That day has number 1.

The number has three parts for year `y`, month `m` and day `d`:

1. Days in all earlier years: `365 * (y - 1)`, plus one for each earlier leap year.
2. Days in the earlier months of year `y`.
3. The day `d`.

Earlier leap years are `(y - 1) / 4 - (y - 1) / 100 + (y - 1) / 400`. Each term uses integer division. The first counts years divisible by 4. The second removes the century years. The third puts back the years divisible by 400. This is the leap year rule, written as a count.

Trace 31 August 2019:

| Part | Calculation | Value |
|---|---|---|
| 365 days for each earlier year | 365 * 2018 | 736570 |
| Add years divisible by 4 | 2018 / 4 | +504 |
| Remove years divisible by 100 | 2018 / 100 | -20 |
| Add back years divisible by 400 | 2018 / 400 | +5 |
| Subtotal for earlier years | | 737059 |
| January to July of 2019 | 31 + 28 + 31 + 30 + 31 + 30 + 31 | +212 |
| Day of the month | | +31 |
| **Day number** | | **737302** |

**Days between two dates** is the difference of their day numbers. **Day of the week** is the remainder after dividing by 7, because the week repeats every 7 days. Day number 1 is a Monday, so remainder 0 means Sunday, 1 means Monday, and so on. For our date, `737302 % 7 = 6`, which is Saturday. 31 August 2019 was a Saturday.

```cpp
#include <bits/stdc++.h>
#include <cassert>
using namespace std;

bool isLeap(int year) {
    return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
}

int daysInMonth(int year, int month) {
    const vector<int> days = {31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};
    if (month == 2 && isLeap(year)) return 29;
    return days[month - 1];
}

// Days from the start of year 1. The first day of year 1 has number 1.
long long dayNumber(int year, int month, int day) {
    long long earlier = year - 1;
    long long total = 365 * earlier + earlier / 4 - earlier / 100 + earlier / 400;
    for (int m = 1; m < month; m++) total += daysInMonth(year, m);
    return total + day;
}

string weekday(int year, int month, int day) {
    const vector<string> names = {"Sunday", "Monday", "Tuesday", "Wednesday",
                                  "Thursday", "Friday", "Saturday"};
    return names[dayNumber(year, month, day) % 7];
}

int main() {
    assert(isLeap(2024) && isLeap(2000));
    assert(!isLeap(2023) && !isLeap(1900));
    assert(daysInMonth(2024, 2) == 29);
    assert(daysInMonth(2023, 2) == 28);
    assert(dayNumber(1, 1, 1) == 1);
    assert(dayNumber(2019, 8, 31) == 737302);
    assert(dayNumber(2024, 1, 1) - dayNumber(2023, 1, 1) == 365);  // 2023 is a normal year
    assert(dayNumber(2025, 1, 1) - dayNumber(2024, 1, 1) == 366);  // 2024 is a leap year
    assert(weekday(2019, 8, 31) == "Saturday");
    assert(weekday(1, 1, 1) == "Monday");
    cout << "All tests passed\n";
}
```

## 5. Grouping and aggregating records

After parsing, each line is a record. Most questions now take one of three forms.

| Question | Tool |
|---|---|
| "Total for each user" | A map from key to a running total |
| "All visits of each user, in time order" | Sort the records by time, then a map from key to a list |
| "Which key is the most common?" | Count with a map, then scan for the best |

Use `map` when the output must be sorted by key, and `unordered_map` when order does not matter. Sort before you group when each group must be in time order, because a list keeps the order in which you added to it.

Here is the task from [section 1](#1-the-idea-in-plain-english), with bad lines handled. The steps are in the same order as the pipeline.

```cpp
#include <bits/stdc++.h>
#include <cassert>
using namespace std;

vector<string> split(const string& line, char separator) {
    vector<string> fields;
    string current;
    for (char c : line) {
        if (c == separator) {
            fields.push_back(current);
            current.clear();
        } else {
            current += c;
        }
    }
    fields.push_back(current);
    return fields;
}

bool parseAmount(const string& text, long long& value) {
    if (text.empty() || text.size() > 18) return false;  // 18 digits always fit in a long long
    value = 0;
    for (char c : text) {
        if (c < '0' || c > '9') return false;
        value = value * 10 + (c - '0');
    }
    return true;
}

struct Summary {
    map<string, long long> totals;  // map, so that the output is sorted by user
    int badLines = 0;
};

Summary totalsByUser(const vector<string>& lines) {
    Summary summary;
    for (const string& line : lines) {
        vector<string> fields = split(line, ',');
        long long amount;
        if (fields.size() != 2 || fields[0].empty() || !parseAmount(fields[1], amount)) {
            summary.badLines++;  // skip the line and keep count
            continue;
        }
        summary.totals[fields[0]] += amount;
    }
    return summary;
}

int main() {
    Summary s = totalsByUser({"ann,250", "bob,100", "ann,50", "broken", "carl,12x", ",5", "dan,"});
    assert(s.totals.size() == 2);
    assert(s.totals["ann"] == 300 && s.totals["bob"] == 100);
    assert(s.badLines == 4);
    assert(totalsByUser({}).totals.empty());
    cout << "All tests passed\n";
}
```

## 6. Validating input

Real data has bad lines, and tests include them on purpose. Check in this order, because each check makes the next one safe.

| Step | Question | Example of a line that fails |
|---|---|---|
| 1. Field count | Are there exactly the expected fields? | `ann` (no amount) |
| 2. Shape | Is each field the right length and form? | `9:05:30` for `HH:MM:SS` |
| 3. Digits | Are all the expected digits really digits? | `12x` |
| 4. Range | Is each value allowed? | `25:00:00`, `31 February` |

Read the statement to see what to do with a bad line. It may say to skip it, to report it, or to stop. If it says nothing, ask. In an interview, saying "I will skip bad lines and count them" shows care.

A date needs one more check, because a month's length depends on the year. The day must be between 1 and `daysInMonth(year, month)`, from [section 4](#4-date-arithmetic).

## 7. State machines

Sometimes the meaning of a character depends on what came before it. A comma inside quotes is plain text. A comma outside quotes is a separator. Splitting on every comma gives wrong fields.

```text
a,"b,c",d       has 3 fields: a   b,c   d
```

A **state machine** solves this. A **state** is a word for "where you are now". For each character, the current state decides what to do and which state comes next.

| State | Character | Action | Next state |
|---|---|---|---|
| outside | `"` | none | inside |
| outside | `,` | end the field | outside |
| outside | other | add to the field | outside |
| inside | `"` | none | outside |
| inside | any other, including `,` | add to the field | inside |

```cpp
#include <bits/stdc++.h>
#include <cassert>
using namespace std;

vector<string> splitQuoted(const string& line) {
    vector<string> fields;
    string current;
    bool insideQuotes = false;  // the only state this problem needs
    for (char c : line) {
        if (c == '"') {
            insideQuotes = !insideQuotes;
        } else if (c == ',' && !insideQuotes) {
            fields.push_back(current);
            current.clear();
        } else {
            current += c;
        }
    }
    fields.push_back(current);
    return fields;
}

int main() {
    assert(splitQuoted("a,\"b,c\",d") == vector<string>({"a", "b,c", "d"}));
    assert(splitQuoted("a,b") == vector<string>({"a", "b"}));
    assert(splitQuoted("\"x\"") == vector<string>({"x"}));
    assert(splitQuoted(",") == vector<string>({"", ""}));
    cout << "All tests passed\n";
}
```

[P9](#p9-remove-comments-leetcode-722-medium) uses the same idea, and [Finite automata and regex](../10-string-algorithms/08-finite-automata-and-regex.md) goes further.

## 8. Solved problems

### P1. Unique Email Addresses ([LeetCode 929](https://leetcode.com/problems/unique-email-addresses/), Easy)

**Problem:** An email has a local name and a domain, separated by `@`. In the local name, dots are ignored, and everything after a `+` is ignored. Count how many different addresses actually receive mail.

**Example:** `"test.email+alex@leetcode.com"` and `"test.e.mail+bob@leetcode.com"` both go to `testemail@leetcode.com`.

**Pattern:** String parsing, Hash map lookup

**How to recognize it:** Several spellings mean the same thing, so turn each one into one clean form, then count the distinct forms with a set.

**Brute force:** Compare every pair with a function that understands the rules. O(n^2) comparisons.

**Key idea:** Normalize each address, and put the result in a set. The rules apply only to the local name, so split at `@` first. A dot in the domain must stay.

```cpp
#include <bits/stdc++.h>
#include <cassert>
using namespace std;

class Solution {
public:
    int numUniqueEmails(vector<string>& emails) {
        unordered_set<string> unique;
        for (const string& email : emails) {
            size_t at = email.find('@');
            string clean;
            for (size_t i = 0; i < at; i++) {
                if (email[i] == '+') break;   // the rest of the local name is ignored
                if (email[i] != '.') clean += email[i];
            }
            unique.insert(clean + email.substr(at));  // the domain, with its @, is unchanged
        }
        return (int)unique.size();
    }
};

int main() {
    Solution solution;
    vector<string> a = {"test.email+alex@leetcode.com", "test.e.mail+bob.cathy@leetcode.com", "testemail+david@lee.tcode.com"};
    assert(solution.numUniqueEmails(a) == 2);
    vector<string> b = {"a@leetcode.com", "b@leetcode.com", "c@leetcode.com"};
    assert(solution.numUniqueEmails(b) == 3);
    vector<string> c = {"a.b@x.com", "ab@xcom"};
    assert(solution.numUniqueEmails(c) == 2);  // dots in the domain matter
    cout << "All tests passed\n";
}
```

**Complexity:** O(L) time on average, where L is the total length of all the emails, and O(L) space for the set.

### P2. Reformat Date ([LeetCode 1507](https://leetcode.com/problems/reformat-date/), Easy)

**Problem:** Convert a date such as `"20th Oct 2052"` to `"2052-10-20"`. The day has a suffix (`st`, `nd`, `rd` or `th`), and the month is a three-letter name.

**Example:** `"6th Jun 1933"` gives `"1933-06-06"`.

**Pattern:** String parsing

**How to recognize it:** Fields separated by spaces that can never be empty, so `stream >> word` is the right split.

**Key idea:** Read three words. Drop the last two characters of the day, find the month's position in a table, and add zero padding.

```cpp
#include <bits/stdc++.h>
#include <cassert>
using namespace std;

class Solution {
public:
    string reformatDate(string date) {
        const vector<string> months = {"Jan", "Feb", "Mar", "Apr", "May", "Jun",
                                       "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"};
        stringstream stream(date);
        string day, month, year;
        stream >> day >> month >> year;

        day.resize(day.size() - 2);  // remove "st", "nd", "rd" or "th"
        if (day.size() == 1) day = "0" + day;

        int monthNumber = (int)(find(months.begin(), months.end(), month) - months.begin()) + 1;
        string monthText = (monthNumber < 10 ? "0" : "") + to_string(monthNumber);
        return year + "-" + monthText + "-" + day;
    }
};

int main() {
    Solution solution;
    assert(solution.reformatDate("20th Oct 2052") == "2052-10-20");
    assert(solution.reformatDate("6th Jun 1933") == "1933-06-06");
    assert(solution.reformatDate("26th May 1960") == "1960-05-26");
    assert(solution.reformatDate("1st Jan 2000") == "2000-01-01");
    cout << "All tests passed\n";
}
```

**Complexity:** O(1) time and space, because the input has a small fixed size.

### P3. Day of the Year ([LeetCode 1154](https://leetcode.com/problems/day-of-the-year/), Easy)

**Problem:** Given a date in the form `YYYY-MM-DD`, return which day of its year it is.

**Example:** `"2019-02-10"` gives `41`.

**Pattern:** Date and time arithmetic

**How to recognize it:** "Day of the year" with a date string. The fixed format means each field is at a known position, so `substr` is enough.

**Key idea:** Add the lengths of all the earlier months, using 29 days for February in a leap year, then add the day of the month.

```cpp
#include <bits/stdc++.h>
#include <cassert>
using namespace std;

class Solution {
    bool isLeap(int year) {
        return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
    }

public:
    int dayOfYear(string date) {
        int year = stoi(date.substr(0, 4));   // safe: the format is guaranteed
        int month = stoi(date.substr(5, 2));
        int day = stoi(date.substr(8, 2));
        vector<int> days = {31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};
        if (isLeap(year)) days[1] = 29;
        return accumulate(days.begin(), days.begin() + month - 1, 0) + day;
    }
};

int main() {
    Solution solution;
    assert(solution.dayOfYear("2019-01-09") == 9);
    assert(solution.dayOfYear("2019-02-10") == 41);
    assert(solution.dayOfYear("2020-03-01") == 61);   // 31 + 29 + 1 in a leap year
    assert(solution.dayOfYear("2019-03-01") == 60);   // 31 + 28 + 1 in a normal year
    assert(solution.dayOfYear("2019-12-31") == 365);
    assert(solution.dayOfYear("2020-12-31") == 366);
    cout << "All tests passed\n";
}
```

**Complexity:** O(1) time and space, because there are always 12 months.

### P4. Day of the Week ([LeetCode 1185](https://leetcode.com/problems/day-of-the-week/), Easy)

**Problem:** Given a day, a month and a year, return the name of the weekday.

**Example:** `day = 31, month = 8, year = 2019` gives `"Saturday"`.

**Pattern:** Date and time arithmetic

**How to recognize it:** A weekday repeats every 7 days, so you need the number of days from a known point, then `% 7`.

**Key idea:** Use the day number from [section 4](#4-date-arithmetic). Note the argument order here: day, month, year.

```cpp
#include <bits/stdc++.h>
#include <cassert>
using namespace std;

class Solution {
    bool isLeap(int year) {
        return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
    }

    long long dayNumber(int year, int month, int day) {
        vector<int> days = {31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};
        if (isLeap(year)) days[1] = 29;
        long long earlier = year - 1;
        long long total = 365 * earlier + earlier / 4 - earlier / 100 + earlier / 400;
        return total + accumulate(days.begin(), days.begin() + month - 1, 0) + day;
    }

public:
    string dayOfTheWeek(int day, int month, int year) {
        const vector<string> names = {"Sunday", "Monday", "Tuesday", "Wednesday",
                                      "Thursday", "Friday", "Saturday"};
        return names[dayNumber(year, month, day) % 7];
    }
};

int main() {
    Solution solution;
    assert(solution.dayOfTheWeek(31, 8, 2019) == "Saturday");
    assert(solution.dayOfTheWeek(18, 7, 1999) == "Sunday");
    assert(solution.dayOfTheWeek(15, 8, 1993) == "Sunday");
    assert(solution.dayOfTheWeek(1, 1, 2000) == "Saturday");
    assert(solution.dayOfTheWeek(29, 2, 2024) == "Thursday");  // a leap day
    cout << "All tests passed\n";
}
```

**Complexity:** O(1) time and space.

### P5. Number of Days Between Two Dates ([LeetCode 1360](https://leetcode.com/problems/number-of-days-between-two-dates/), Easy)

**Problem:** Given two dates as `YYYY-MM-DD`, return the number of days between them. The first date may be later than the second.

**Example:** `"2020-01-15"` and `"2019-12-31"` give `15`.

**Pattern:** Date and time arithmetic

**How to recognize it:** "Days between" two dates. Do not subtract years, months and days separately, because months have different lengths.

**Key idea:** Convert each date to its day number, then take the absolute difference.

```cpp
#include <bits/stdc++.h>
#include <cassert>
using namespace std;

class Solution {
    bool isLeap(int year) {
        return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
    }

    long long dayNumber(const string& date) {
        int year = stoi(date.substr(0, 4));
        int month = stoi(date.substr(5, 2));
        int day = stoi(date.substr(8, 2));
        vector<int> days = {31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};
        if (isLeap(year)) days[1] = 29;
        long long earlier = year - 1;
        long long total = 365 * earlier + earlier / 4 - earlier / 100 + earlier / 400;
        return total + accumulate(days.begin(), days.begin() + month - 1, 0) + day;
    }

public:
    int daysBetweenDates(string date1, string date2) {
        return (int)llabs(dayNumber(date1) - dayNumber(date2));
    }
};

int main() {
    Solution solution;
    assert(solution.daysBetweenDates("2019-06-29", "2019-06-30") == 1);
    assert(solution.daysBetweenDates("2020-01-15", "2019-12-31") == 15);  // later date first
    assert(solution.daysBetweenDates("1971-01-01", "1971-01-01") == 0);
    assert(solution.daysBetweenDates("2000-02-28", "2000-03-01") == 2);   // 2000 is a leap year
    assert(solution.daysBetweenDates("1900-02-28", "1900-03-01") == 1);   // 1900 is not
    cout << "All tests passed\n";
}
```

**Complexity:** O(1) time and space.

### P6. Compare Version Numbers ([LeetCode 165](https://leetcode.com/problems/compare-version-numbers/), Medium)

**Problem:** Compare two version strings such as `"1.10"` and `"1.2"`. Each part is a number, leading zeros do not count, and a missing part counts as 0. Return -1, 0 or 1.

**Example:** `"1.2"` is less than `"1.10"`, because 2 is less than 10. `"1.0"` equals `"1.0.0.0"`.

**Pattern:** String parsing

**How to recognize it:** Dotted versions look like text, but plain string comparison says `"1.10" < "1.2"`, which is wrong. You must compare number by number.

**Key idea:** Walk both strings together. At each step read one number from each, using 0 if a string has ended. The first difference decides.

**Dry run:** on `"1.01"` and `"1.001"`.

| Step | Number from version1 | Number from version2 | Result |
|---|---|---|---|
| 1 | 1 | 1 | equal |
| 2 | 01 is 1 | 001 is 1 | equal |
| 3 | both ended | | return 0 |

```cpp
#include <bits/stdc++.h>
#include <cassert>
using namespace std;

class Solution {
    // Reads the number at index i and moves i past its dot. Returns 0 if the string has ended.
    int nextPart(const string& version, int& i) {
        int value = 0;
        while (i < (int)version.size() && version[i] != '.') {
            value = value * 10 + (version[i] - '0');
            i++;
        }
        i++;  // skip the dot
        return value;
    }

public:
    int compareVersion(string version1, string version2) {
        int i = 0, j = 0;
        while (i < (int)version1.size() || j < (int)version2.size()) {
            int a = nextPart(version1, i);
            int b = nextPart(version2, j);
            if (a != b) return a < b ? -1 : 1;
        }
        return 0;
    }
};

int main() {
    Solution solution;
    assert(solution.compareVersion("1.2", "1.10") == -1);
    assert(solution.compareVersion("1.01", "1.001") == 0);
    assert(solution.compareVersion("1.0", "1.0.0.0") == 0);  // missing parts count as 0
    assert(solution.compareVersion("1.0.1", "1") == 1);
    assert(solution.compareVersion("7.5.2.4", "7.5.3") == -1);
    cout << "All tests passed\n";
}
```

**Complexity:** O(n + m) time, and O(1) space. It relies on the problem's promise that each part fits in a 32-bit integer.

### P7. Find Duplicate File in System ([LeetCode 609](https://leetcode.com/problems/find-duplicate-file-in-system/), Medium)

**Problem:** Each string describes a folder and its files, such as `"root/a 1.txt(abcd) 2.txt(efgh)"`. Return groups of full file paths that have the same content. Keep only groups with at least two files.

**Example:** `"root/a 1.txt(abcd)"` and `"root/c 3.txt(abcd)"` form the group `["root/a/1.txt", "root/c/3.txt"]`.

**Pattern:** String parsing, Group by key

**How to recognize it:** "Same content" with "group" means a hash map whose key is the content. Each line has a fixed shape, so parse it first.

**Key idea:** Split on spaces. The first word is the folder. In each other word, the part before `(` is the name, and the part inside the brackets is the content.

```cpp
#include <bits/stdc++.h>
#include <cassert>
using namespace std;

class Solution {
public:
    vector<vector<string>> findDuplicate(vector<string>& paths) {
        unordered_map<string, vector<string>> filesByContent;
        for (const string& line : paths) {
            stringstream stream(line);
            string folder, file;
            stream >> folder;
            while (stream >> file) {
                size_t open = file.find('(');
                string name = file.substr(0, open);
                string content = file.substr(open + 1, file.size() - open - 2);  // drop both brackets
                filesByContent[content].push_back(folder + "/" + name);
            }
        }
        vector<vector<string>> result;
        for (auto& [content, files] : filesByContent) {
            if (files.size() > 1) result.push_back(files);
        }
        return result;
    }
};

int main() {
    Solution solution;
    vector<string> paths = {"root/a 1.txt(abcd) 2.txt(efgh)", "root/c 3.txt(abcd)",
                            "root/c/d 4.txt(efgh)", "root 4.txt(efgh)"};
    vector<vector<string>> groups = solution.findDuplicate(paths);
    for (auto& group : groups) sort(group.begin(), group.end());  // the output order is free
    sort(groups.begin(), groups.end());
    vector<vector<string>> expected = {{"root/4.txt", "root/a/2.txt", "root/c/d/4.txt"},
                                       {"root/a/1.txt", "root/c/3.txt"}};
    assert(groups == expected);

    vector<string> single = {"root/a 1.txt(abcd)", "root/b 2.txt(efgh)"};
    assert(solution.findDuplicate(single).empty());  // no duplicates
    cout << "All tests passed\n";
}
```

**Complexity:** O(L) time on average and O(L) space, where L is the total length of the input.

**Follow-up:** "What if the files are huge?" Compare sizes first, because files of different sizes cannot be equal. Then hash each file in chunks, and compare byte by byte only when the hashes match.

### P8. Validate IP Address ([LeetCode 468](https://leetcode.com/problems/validate-ip-address/), Medium)

**Problem:** Return `"IPv4"`, `"IPv6"` or `"Neither"`. An IPv4 address has 4 parts joined by dots, each from 0 to 255, with no leading zeros. An IPv6 address has 8 parts joined by colons, each with 1 to 4 hexadecimal digits, in any case.

**Example:** `"172.16.254.1"` gives `"IPv4"`. `"256.256.256.256"` gives `"Neither"`.

**Pattern:** String parsing

**How to recognize it:** "Valid" with an exact format is a list of rules. The trap is an empty part, such as `"1.1.1.1."`. A split that drops it would call this address valid, so use the `split` from [section 2](#2-splitting-a-line-into-fields).

**Key idea:** Choose the format by the separator, split, then check each part in the order from [section 6](#6-validating-input): count, shape, digits, range.

```cpp
#include <bits/stdc++.h>
#include <cassert>
using namespace std;

class Solution {
    vector<string> split(const string& line, char separator) {
        vector<string> fields;
        string current;
        for (char c : line) {
            if (c == separator) {
                fields.push_back(current);
                current.clear();
            } else {
                current += c;
            }
        }
        fields.push_back(current);
        return fields;
    }

    bool isIPv4Part(const string& part) {
        if (part.empty() || part.size() > 3) return false;
        if (part.size() > 1 && part[0] == '0') return false;  // no leading zeros
        int value = 0;
        for (char c : part) {
            if (c < '0' || c > '9') return false;
            value = value * 10 + (c - '0');
        }
        return value <= 255;
    }

    bool isIPv6Part(const string& part) {
        if (part.empty() || part.size() > 4) return false;
        for (char c : part) {
            if (!isxdigit((unsigned char)c)) return false;
        }
        return true;
    }

public:
    string validIPAddress(string queryIP) {
        if (queryIP.find('.') != string::npos) {
            vector<string> parts = split(queryIP, '.');
            if (parts.size() != 4) return "Neither";
            for (const string& part : parts) {
                if (!isIPv4Part(part)) return "Neither";
            }
            return "IPv4";
        }
        vector<string> parts = split(queryIP, ':');
        if (parts.size() != 8) return "Neither";
        for (const string& part : parts) {
            if (!isIPv6Part(part)) return "Neither";
        }
        return "IPv6";
    }
};

int main() {
    Solution solution;
    assert(solution.validIPAddress("172.16.254.1") == "IPv4");
    assert(solution.validIPAddress("0.0.0.0") == "IPv4");
    assert(solution.validIPAddress("2001:0db8:85a3:0:0:8A2E:0370:7334") == "IPv6");
    assert(solution.validIPAddress("256.256.256.256") == "Neither");
    assert(solution.validIPAddress("1.1.1.1.") == "Neither");         // empty last part
    assert(solution.validIPAddress("12..33.4") == "Neither");         // empty middle part
    assert(solution.validIPAddress("01.1.1.1") == "Neither");         // leading zero
    assert(solution.validIPAddress("1e1.4.5.6") == "Neither");        // not a decimal digit
    assert(solution.validIPAddress("2001:0db8:85a3:0000:0000:8a2e:0370:7334:") == "Neither");
    assert(solution.validIPAddress("02001:0db8:85a3:0:0:8A2E:0370:7334") == "Neither");  // part too long
    assert(solution.validIPAddress("") == "Neither");
    cout << "All tests passed\n";
}
```

**Complexity:** O(n) time and space, and the input is short.

### P9. Remove Comments ([LeetCode 722](https://leetcode.com/problems/remove-comments/), Medium)

**Problem:** Remove all C-style comments from a list of source lines. `//` hides the rest of its line. `/*` hides everything up to the next `*/`, even across lines. Lines that become empty are removed. If a block comment joins two lines, they become one line.

**Example:** `["a/*comment", "line", "more_comment*/b"]` gives `["ab"]`.

**Pattern:** State machine parsing

**How to recognize it:** `//` means nothing inside a block comment, and a `*/` means nothing outside one. The meaning of a character depends on what came before it, so you need a state.

**Key idea:** Keep one state, `inBlock`, and a `current` line that survives across input lines. Push `current` only when a line ends outside a block comment. That single rule handles the joined lines.

| State | Next two characters | Action |
|---|---|---|
| in a block | `*/` | leave the block, skip both |
| in a block | anything else | skip one character |
| outside | `/*` | enter the block, skip both |
| outside | `//` | stop reading this line |
| outside | anything else | keep the character |

```cpp
#include <bits/stdc++.h>
#include <cassert>
using namespace std;

class Solution {
public:
    vector<string> removeComments(vector<string>& source) {
        vector<string> result;
        string current;  // survives across lines while a block comment is open
        bool inBlock = false;
        for (const string& line : source) {
            int n = (int)line.size();
            for (int i = 0; i < n; i++) {
                bool hasNext = i + 1 < n;
                if (inBlock) {
                    if (hasNext && line[i] == '*' && line[i + 1] == '/') {
                        inBlock = false;
                        i++;  // skip the second character of the marker
                    }
                } else if (hasNext && line[i] == '/' && line[i + 1] == '*') {
                    inBlock = true;
                    i++;
                } else if (hasNext && line[i] == '/' && line[i + 1] == '/') {
                    break;
                } else {
                    current += line[i];
                }
            }
            if (!inBlock && !current.empty()) {
                result.push_back(current);
                current.clear();
            }
        }
        return result;
    }
};

int main() {
    Solution solution;
    vector<string> a = {"/*Test program */", "int main()", "{ ", "  // variable declaration ",
                        "int a, b, c;", "/* This is a test", "   multiline  ", "   comment for ",
                        "   testing */", "a = b + c;", "}"};
    vector<string> expectedA = {"int main()", "{ ", "  ", "int a, b, c;", "a = b + c;", "}"};
    assert(solution.removeComments(a) == expectedA);

    vector<string> b = {"a/*comment", "line", "more_comment*/b"};
    assert(solution.removeComments(b) == vector<string>({"ab"}));

    vector<string> c = {"a/*/b//*c", "blank", "d/*/e*//f"};  // "/*/" opens a block and does not close it
    assert(solution.removeComments(c) == vector<string>({"ae*"}));
    cout << "All tests passed\n";
}
```

**Complexity:** O(L) time and space, where L is the total number of characters.

**Edge cases:** `/*/` opens a block but does not close it, which is why the code skips both characters of a marker. The third test checks this. On the first line, `a` is kept and `/*/` opens a block. The block hides `blank` and `d/`. The `*/` on the last line closes it. Then `e*` is kept, and `//` hides the rest, so the result is `ae*`.

### P10. Invalid Transactions ([LeetCode 1169](https://leetcode.com/problems/invalid-transactions/), Medium)

**Problem:** Each transaction is `"name,time,amount,city"`. A transaction is invalid if its amount is over 1000, or if it occurs within 60 minutes (inclusive) of a transaction with the same name in a different city. Return all the invalid transactions, in any order.

**Example:** `["alice,20,800,mtv", "alice,50,100,beijing"]` returns both, because they are 30 minutes apart in different cities.

**Pattern:** String parsing, Group by key

**How to recognize it:** Comma-separated records with a rule "for the same name". That is split, parse, group. The rule compares two records, so note that both can be invalid at once.

**Brute force:** Compare every pair of transactions, which is O(n^2). This is fine here, because n is at most 1000.

**Key idea:** Parse each line into a record. Group the records by name, so that you compare only records that can matter. Work with indexes, because two equal lines are separate transactions, and each one must be reported.

```cpp
#include <bits/stdc++.h>
#include <cassert>
using namespace std;

class Solution {
    struct Record {
        string name, city;
        int time, amount;
    };

    Record parse(const string& line) {
        stringstream stream(line);
        string name, time, amount, city;
        getline(stream, name, ',');
        getline(stream, time, ',');
        getline(stream, amount, ',');
        getline(stream, city, ',');
        return {name, city, stoi(time), stoi(amount)};
    }

public:
    vector<string> invalidTransactions(vector<string>& transactions) {
        int n = (int)transactions.size();
        vector<Record> records;
        unordered_map<string, vector<int>> indexesByName;
        for (int i = 0; i < n; i++) {
            records.push_back(parse(transactions[i]));
            indexesByName[records[i].name].push_back(i);
        }

        vector<string> invalid;
        for (int i = 0; i < n; i++) {
            bool bad = records[i].amount > 1000;
            for (int j : indexesByName[records[i].name]) {
                if (bad) break;
                bad = records[i].city != records[j].city && abs(records[i].time - records[j].time) <= 60;
            }
            if (bad) invalid.push_back(transactions[i]);
        }
        return invalid;
    }
};

int main() {
    Solution solution;
    auto sorted = [](vector<string> items) {
        sort(items.begin(), items.end());
        return items;
    };
    vector<string> a = {"alice,20,800,mtv", "alice,50,100,beijing"};
    assert(sorted(solution.invalidTransactions(a)) == sorted(a));

    vector<string> b = {"alice,20,800,mtv", "alice,50,1200,mtv"};
    assert(solution.invalidTransactions(b) == vector<string>({"alice,50,1200,mtv"}));

    vector<string> c = {"alice,20,800,mtv", "bob,50,1200,mtv"};
    assert(solution.invalidTransactions(c) == vector<string>({"bob,50,1200,mtv"}));

    vector<string> d = {"alice,0,10,mtv", "alice,60,10,sf"};   // exactly 60 minutes counts
    assert(solution.invalidTransactions(d).size() == 2);
    vector<string> e = {"alice,0,10,mtv", "alice,61,10,sf"};   // 61 minutes does not
    assert(solution.invalidTransactions(e).empty());
    vector<string> f = {"ann,10,2000,x", "ann,10,2000,x"};     // equal lines are separate
    assert(solution.invalidTransactions(f).size() == 2);
    cout << "All tests passed\n";
}
```

**Complexity:** O(n^2) time in the worst case, when all the names are the same. O(n) space for the records and groups, on top of the input.

### P11. Analyze User Website Visit Pattern ([LeetCode 1152](https://leetcode.com/problems/analyze-user-website-visit-pattern/), Medium)

**Problem:** You get three lists: user, timestamp and website. A **pattern** is three websites in order. A user follows a pattern if they visited those sites in that order, not always one after another. Return the pattern followed by the most users, and on a tie, the one that comes first in dictionary order.

**Example:** `joe` visits `home, about, career`, and `mary` visits the same three. Both follow that pattern, so it wins with a score of 2.

**Pattern:** Group by key, Enumeration

**How to recognize it:** "For each user", "in time order", "most users". That is sort by time, group by user, then count. The word "users" hides a trap: a user who follows a pattern twice still counts once.

**Key idea:**

1. Sort the visits by time, so that each user's list is in time order.
2. For each user, list all triples of visits, and keep them in a `set`, so that each pattern counts once for that user.
3. Add 1 to a shared `map` for each pattern in the set. A `map` keeps patterns in dictionary order, so taking the first one with the highest count handles ties.

```cpp
#include <bits/stdc++.h>
#include <cassert>
using namespace std;

class Solution {
public:
    vector<string> mostVisitedPattern(vector<string>& username, vector<int>& timestamp, vector<string>& website) {
        int n = (int)username.size();
        vector<int> order(n);
        iota(order.begin(), order.end(), 0);
        sort(order.begin(), order.end(), [&](int a, int b) { return timestamp[a] < timestamp[b]; });

        unordered_map<string, vector<string>> visits;  // each list is in time order
        for (int i : order) visits[username[i]].push_back(website[i]);

        using Pattern = array<string, 3>;
        map<Pattern, int> usersByPattern;
        for (const auto& [user, sites] : visits) {
            set<Pattern> seen;  // a user counts once for each pattern
            int k = (int)sites.size();
            for (int a = 0; a < k; a++)
                for (int b = a + 1; b < k; b++)
                    for (int c = b + 1; c < k; c++) seen.insert({sites[a], sites[b], sites[c]});
            for (const Pattern& pattern : seen) usersByPattern[pattern]++;
        }

        Pattern best;
        int bestCount = 0;
        for (const auto& [pattern, count] : usersByPattern) {
            if (count > bestCount) {  // strictly greater, so the first in dictionary order wins ties
                best = pattern;
                bestCount = count;
            }
        }
        return {best[0], best[1], best[2]};
    }
};

int main() {
    Solution solution;
    vector<string> users = {"joe", "joe", "joe", "james", "james", "james", "james", "mary", "mary", "mary"};
    vector<int> times = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
    vector<string> sites = {"home", "about", "career", "home", "cart", "maps", "home", "home", "about", "career"};
    assert(solution.mostVisitedPattern(users, times, sites) == vector<string>({"home", "about", "career"}));

    vector<string> u2 = {"ua", "ua", "ua", "ub", "ub", "ub"};
    vector<int> t2 = {1, 2, 3, 4, 5, 6};
    vector<string> s2 = {"a", "b", "a", "a", "b", "c"};
    assert(solution.mostVisitedPattern(u2, t2, s2) == vector<string>({"a", "b", "a"}));  // tie: first wins

    vector<string> u3 = {"x", "x", "x", "x", "x", "x", "y", "y", "y", "z", "z", "z"};
    vector<int> t3 = {6, 5, 4, 3, 2, 1, 7, 8, 9, 10, 11, 12};    // not sorted by time
    vector<string> s3 = {"c", "b", "a", "c", "b", "a", "p", "q", "r", "p", "q", "r"};
    // x follows a, b, c many times but counts once. y and z give p, q, r a score of 2.
    assert(solution.mostVisitedPattern(u3, t3, s3) == vector<string>({"p", "q", "r"}));
    cout << "All tests passed\n";
}
```

**Complexity:** O(n log n) for the sort. Then a user with k visits has up to k^3 / 6 triples, so the worst case is about O(n^3 log n). This is fine, because n is at most 50 on this problem.

## Common pitfalls

1. **Using `getline` when empty fields matter.** It drops a trailing empty field, so `"1.1.1.1."` looks valid. Use a hand-written `split`.
2. **Comparing times as unpadded text.** `"9:05" < "10:00"` is false as strings. Convert to numbers.
3. **Calling `stoi` on unchecked input.** It throws on `"abc"`, and it stops silently at the first bad character of `"12abc"`. Validate first, or parse by hand.
4. **Writing the leap year rule wrongly.** 1900 was not a leap year, and 2000 was. Test both.
5. **Comparing versions as strings.** `"1.10"` is greater than `"1.2"` as a version, but less as text.
6. **Forgetting the `'\r'` on Windows files.** A line that looks like `"ann"` may be `"ann\r"`, and then it will not match any key. `trim` each line first.
7. **Grouping before sorting by time.** A group keeps the order in which you added to it. Sort first when order matters.
8. **Counting a user many times.** "How many users" needs a set per user, not a count of events.

## Practice list

- [ ] [Defanging an IP Address](https://leetcode.com/problems/defanging-an-ip-address/) (LeetCode 1108, Easy): replace each dot as you copy.
- [ ] [Latest Time by Replacing Hidden Digits](https://leetcode.com/problems/latest-time-by-replacing-hidden-digits/) (LeetCode 1736, Easy): fill each digit with the largest legal value.
- [ ] [Minimum Number of Operations to Convert Time](https://leetcode.com/problems/minimum-number-of-operations-to-convert-time/) (LeetCode 2224, Easy): convert to minutes, then use the largest step first.
- [ ] [Count Days Spent Together](https://leetcode.com/problems/count-days-spent-together/) (LeetCode 2409, Easy): convert to day numbers, then overlap two ranges.
- [ ] [Subdomain Visit Count](https://leetcode.com/problems/subdomain-visit-count/) (LeetCode 811, Medium): split on the space, then add the count to each suffix of the domain.
- [ ] [Alert Using Same Key-Card Three or More Times in a One Hour Period](https://leetcode.com/problems/alert-using-same-key-card-three-or-more-times-in-a-one-hour-period/) (LeetCode 1604, Medium): group by name, sort the times, and check each set of three neighbours.
- [ ] [Masking Personal Information](https://leetcode.com/problems/masking-personal-information/) (LeetCode 831, Medium): detect the format, then apply its rules.
- [ ] [HTML Entity Parser](https://leetcode.com/problems/html-entity-parser/) (LeetCode 1410, Medium): scan and match each entity at an `&`.
- [ ] [Tag Validator](https://leetcode.com/problems/tag-validator/) (LeetCode 591, Hard): a state machine with a stack for open tags.

## Interview questions

<details>
<summary><strong>Q1. You must process a log file. What is your general approach?</strong></summary>

I treat it as four steps: split each line into fields, parse each field into a real value, group the records by key, and aggregate. I first ask what to do with bad lines, then validate in this order: field count, shape, digits, range. I usually skip bad lines and count them, so that one broken line does not stop the job.

</details>

<details>
<summary><strong>Q2. How do you find the number of days between two dates?</strong></summary>

I convert each date to a day number: the days in all earlier years, including leap days, plus the earlier months of this year, plus the day of the month. The gap is the difference of the two numbers. I avoid subtracting years and months separately, because months have different lengths.

</details>

<details>
<summary><strong>Q3. What is the leap year rule, and why is it not just "divisible by 4"?</strong></summary>

A year is a leap year if it is divisible by 4 but not by 100, unless it is also divisible by 400. So 2024 and 2000 are leap years, and 1900 is not. The earth takes about 365.2425 days to go around the sun, and the rule keeps the calendar's average close to that number.

</details>

<details>
<summary><strong>Q4. When can you compare dates or times as plain strings?</strong></summary>

When every value has the same width and zero padding, with the largest unit first, as in `YYYY-MM-DD` or `HH:MM:SS`. Then dictionary order is the same as time order. Without padding it fails, because `"9:05"` sorts after `"10:00"`.

</details>

<details>
<summary><strong>Q5. When do you need a state machine instead of a plain split?</strong></summary>

When the meaning of a character depends on what came before it, such as a comma inside quotes, or `//` inside a block comment. I list the states, then write what each character does in each state. The code then follows the table, so it stays simple.

</details>

<!-- lint: no-size-limit -->
