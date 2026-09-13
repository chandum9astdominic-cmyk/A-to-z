export type PracticeLink = { platform: "LeetCode" | "HackerRank"; label: string; url: string };

export type Problem = {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  description: string;
  links: PracticeLink[];
};

export type RoadmapSection = {
  id: string;
  title: string;
  description: string;
  topics: string[];
  problems: Problem[];
};

export const roadmap: RoadmapSection[] = [
  { id: "01", title: "Learn the Basics", description: "Build the foundations: complexity, arrays, STL and essential patterns.", topics: ["Complexity Analysis", "Arrays", "Basic Maths", "STL", "Basic Recursion"], problems: [
    { id: "01-01", title: "Two Sum", difficulty: "Easy", description: "Find two values in an array whose sum equals a target.", links: [{ platform: "LeetCode", label: "#1", url: "https://leetcode.com/problems/two-sum/" }] },
    { id: "01-02", title: "Best Time to Buy and Sell Stock", difficulty: "Easy", description: "Find the maximum profit from one buy and one sell.", links: [{ platform: "LeetCode", label: "#121", url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/" }] },
    { id: "01-03", title: "Contains Duplicate", difficulty: "Easy", description: "Determine whether an array contains any repeated value.", links: [{ platform: "LeetCode", label: "#217", url: "https://leetcode.com/problems/contains-duplicate/" }] }
  ]},
  { id: "02", title: "Sorting Techniques", description: "Understand comparison sorting and the ideas behind efficient sorting.", topics: ["Selection Sort", "Bubble Sort", "Insertion Sort", "Merge Sort", "Quick Sort"], problems: [
    { id: "02-01", title: "Sort an Array", difficulty: "Medium", description: "Return an array sorted in ascending order.", links: [{ platform: "LeetCode", label: "#912", url: "https://leetcode.com/problems/sort-an-array/" }] }
  ]},
  { id: "03", title: "Arrays", description: "Master array traversal, hashing, prefix techniques and classic patterns.", topics: ["Easy Arrays", "Medium Arrays", "Hard Arrays", "Prefix Sum", "Kadane's Algorithm"], problems: [
    { id: "03-01", title: "Maximum Subarray", difficulty: "Medium", description: "Find the contiguous subarray with the largest sum.", links: [{ platform: "LeetCode", label: "#53", url: "https://leetcode.com/problems/maximum-subarray/" }] },
    { id: "03-02", title: "Majority Element", difficulty: "Easy", description: "Find the value appearing more than half the time.", links: [{ platform: "LeetCode", label: "#169", url: "https://leetcode.com/problems/majority-element/" }] },
    { id: "03-03", title: "Move Zeroes", difficulty: "Easy", description: "Move all zeroes to the end while preserving the order of non-zero values.", links: [{ platform: "LeetCode", label: "#283", url: "https://leetcode.com/problems/move-zeroes/" }] }
  ]},
  { id: "04", title: "Binary Search", description: "Learn binary search on sorted data and on the answer space.", topics: ["Lower Bound", "Upper Bound", "Search in Arrays", "Rotated Arrays", "Answer Space"], problems: [
    { id: "04-01", title: "Binary Search", difficulty: "Easy", description: "Search for a target value in a sorted array.", links: [{ platform: "LeetCode", label: "#704", url: "https://leetcode.com/problems/binary-search/" }] }
  ]},
  { id: "05", title: "Strings", description: "Build reliable string manipulation and frequency-counting skills.", topics: ["Basic Strings", "Frequency Counting", "Palindromes", "String Patterns"], problems: [
    { id: "05-01", title: "Valid Palindrome", difficulty: "Easy", description: "Check whether a string reads the same after ignoring non-alphanumeric characters and case.", links: [{ platform: "LeetCode", label: "#125", url: "https://leetcode.com/problems/valid-palindrome/" }] }
  ]},
  { id: "06", title: "Linked List", description: "Work with pointers, reversal, cycles and advanced linked-list patterns.", topics: ["Singly Linked List", "Doubly Linked List", "Reverse", "Fast & Slow Pointers", "Merge Lists"], problems: [
    { id: "06-01", title: "Reverse Linked List", difficulty: "Easy", description: "Reverse a singly linked list.", links: [{ platform: "LeetCode", label: "#206", url: "https://leetcode.com/problems/reverse-linked-list/" }] },
    { id: "06-02", title: "Linked List Cycle", difficulty: "Easy", description: "Determine whether a linked list contains a cycle.", links: [{ platform: "LeetCode", label: "#141", url: "https://leetcode.com/problems/linked-list-cycle/" }] }
  ]},
  { id: "07", title: "Recursion", description: "Learn recursive thinking, backtracking and state-space exploration.", topics: ["Recursion Basics", "Subsequences", "Backtracking", "Combination Patterns"], problems: [] },
  { id: "08", title: "Bit Manipulation", description: "Use binary representation, XOR and bitwise techniques effectively.", topics: ["Bitwise Operators", "XOR", "Set Bits", "Power of Two"], problems: [
    { id: "08-01", title: "Single Number", difficulty: "Easy", description: "Find the element that appears once when every other element appears twice.", links: [{ platform: "LeetCode", label: "#136", url: "https://leetcode.com/problems/single-number/" }] }
  ]},
  { id: "09", title: "Stack & Queue", description: "Learn LIFO/FIFO structures, monotonic stacks and design problems.", topics: ["Stack", "Queue", "Monotonic Stack", "Deque", "Design"], problems: [
    { id: "09-01", title: "Valid Parentheses", difficulty: "Easy", description: "Check whether brackets are correctly opened and closed.", links: [{ platform: "LeetCode", label: "#20", url: "https://leetcode.com/problems/valid-parentheses/" }] }
  ]},
  { id: "10", title: "Sliding Window & Two Pointer", description: "Turn many quadratic array problems into linear-time solutions.", topics: ["Two Pointers", "Fixed Window", "Variable Window", "Frequency Window"], problems: [
    { id: "10-01", title: "Longest Substring Without Repeating Characters", difficulty: "Medium", description: "Find the longest substring containing no repeated characters.", links: [{ platform: "LeetCode", label: "#3", url: "https://leetcode.com/problems/longest-substring-without-repeating-characters/" }] }
  ]},
  { id: "11", title: "Heaps", description: "Use priority queues for top-k, scheduling and streaming problems.", topics: ["Min Heap", "Max Heap", "Priority Queue", "Top K", "Two Heaps"], problems: [] },
  { id: "12", title: "Greedy", description: "Recognize when a locally optimal choice leads to a global solution.", topics: ["Intervals", "Scheduling", "Greedy Proofs", "Two Choice Problems"], problems: [] },
  { id: "13", title: "Binary Trees", description: "Master traversal, views, recursion and tree construction.", topics: ["DFS", "BFS", "Views", "Height & Diameter", "Construction"], problems: [
    { id: "13-01", title: "Binary Tree Inorder Traversal", difficulty: "Easy", description: "Return the inorder traversal of a binary tree.", links: [{ platform: "LeetCode", label: "#94", url: "https://leetcode.com/problems/binary-tree-inorder-traversal/" }] },
    { id: "13-02", title: "Maximum Depth of Binary Tree", difficulty: "Easy", description: "Find the maximum depth of a binary tree.", links: [{ platform: "LeetCode", label: "#104", url: "https://leetcode.com/problems/maximum-depth-of-binary-tree/" }] }
  ]},
  { id: "14", title: "Binary Search Trees", description: "Exploit BST ordering for efficient search, insertion and queries.", topics: ["Search", "Insert", "Delete", "Validation", "Kth Element"], problems: [
    { id: "14-01", title: "Validate Binary Search Tree", difficulty: "Medium", description: "Determine whether a binary tree satisfies BST ordering rules.", links: [{ platform: "LeetCode", label: "#98", url: "https://leetcode.com/problems/validate-binary-search-tree/" }] }
  ]},
  { id: "15", title: "Graphs", description: "Build graph intuition with traversal, shortest paths, DSU and DAGs.", topics: ["BFS", "DFS", "Topological Sort", "Shortest Path", "DSU", "MST"], problems: [
    { id: "15-01", title: "Number of Islands", difficulty: "Medium", description: "Count connected land regions in a binary grid.", links: [{ platform: "LeetCode", label: "#200", url: "https://leetcode.com/problems/number-of-islands/" }] },
    { id: "15-02", title: "Course Schedule", difficulty: "Medium", description: "Determine whether all courses can be completed given prerequisites.", links: [{ platform: "LeetCode", label: "#207", url: "https://leetcode.com/problems/course-schedule/" }] }
  ]},
  { id: "16", title: "Dynamic Programming", description: "Learn state design, transitions, memoization, tabulation and optimization.", topics: ["1D DP", "2D DP", "Subsequences", "Knapsack", "Strings", "Grids"], problems: [
    { id: "16-01", title: "Climbing Stairs", difficulty: "Easy", description: "Count the ways to reach the top when one or two steps can be taken at a time.", links: [{ platform: "LeetCode", label: "#70", url: "https://leetcode.com/problems/climbing-stairs/" }] },
    { id: "16-02", title: "House Robber", difficulty: "Medium", description: "Maximize money robbed without taking adjacent houses.", links: [{ platform: "LeetCode", label: "#198", url: "https://leetcode.com/problems/house-robber/" }] }
  ]},
  { id: "17", title: "Tries", description: "Use prefix trees for efficient word and prefix operations.", topics: ["Trie Basics", "Insert & Search", "Prefixes", "Bitwise Trie"], problems: [] },
  { id: "18", title: "Advanced DSA", description: "Move into range queries and advanced data-structure techniques.", topics: ["Segment Tree", "Fenwick Tree", "Advanced Graphs", "Offline Queries"], problems: [] }
];

export const totalProblems = roadmap.reduce((sum, section) => sum + section.problems.length, 0);
export const getSection = (id: string) => roadmap.find((section) => section.id === id);
