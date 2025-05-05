// LeetCode Problem Generator
// Data based on common interview questions at Microsoft and Google

// Database of LeetCode problems by difficulty
const leetcodeProblems = {
    easy: [
        {
            id: 1,
            title: "Two Sum",
            difficulty: "Easy",
            description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
            example: "Input: nums = [2,7,11,15], target = 9\nOutput: [0,1]\nExplanation: Because nums[0] + nums[1] == 9, we return [0, 1].",
            companies: ["Microsoft", "Google", "Amazon", "Facebook"],
            url: "https://leetcode.com/problems/two-sum/",
            tags: ["Array", "Hash Table"]
        },
        {
            id: 20,
            title: "Valid Parentheses",
            difficulty: "Easy",
            description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
            example: "Input: s = \"()\"\nOutput: true\n\nInput: s = \"()[]{}\"\nOutput: true\n\nInput: s = \"(]\"\nOutput: false",
            companies: ["Microsoft", "Google", "Amazon", "Facebook"],
            url: "https://leetcode.com/problems/valid-parentheses/",
            tags: ["String", "Stack"]
        },
        {
            id: 21,
            title: "Merge Two Sorted Lists",
            difficulty: "Easy",
            description: "Merge two sorted linked lists and return it as a sorted list.",
            example: "Input: l1 = [1,2,4], l2 = [1,3,4]\nOutput: [1,1,2,3,4,4]",
            companies: ["Microsoft", "Amazon"],
            url: "https://leetcode.com/problems/merge-two-sorted-lists/",
            tags: ["Linked List", "Recursion"]
        },
        {
            id: 53,
            title: "Maximum Subarray",
            difficulty: "Easy",
            description: "Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.",
            example: "Input: nums = [-2,1,-3,4,-1,2,1,-5,4]\nOutput: 6\nExplanation: [4,-1,2,1] has the largest sum = 6.",
            companies: ["Microsoft", "Google", "Amazon"],
            url: "https://leetcode.com/problems/maximum-subarray/",
            tags: ["Array", "Divide and Conquer", "Dynamic Programming"]
        },
        {
            id: 121,
            title: "Best Time to Buy and Sell Stock",
            difficulty: "Easy",
            description: "You are given an array prices where prices[i] is the price of a given stock on the ith day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.",
            example: "Input: prices = [7,1,5,3,6,4]\nOutput: 5\nExplanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.",
            companies: ["Microsoft", "Google", "Amazon", "Facebook"],
            url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
            tags: ["Array", "Dynamic Programming"]
        }
    ],
    medium: [
        {
            id: 3,
            title: "Longest Substring Without Repeating Characters",
            difficulty: "Medium",
            description: "Given a string s, find the length of the longest substring without repeating characters.",
            example: "Input: s = \"abcabcbb\"\nOutput: 3\nExplanation: The answer is \"abc\", with the length of 3.",
            companies: ["Microsoft", "Google", "Amazon", "Facebook"],
            url: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
            tags: ["Hash Table", "String", "Sliding Window"]
        },
        {
            id: 5,
            title: "Longest Palindromic Substring",
            difficulty: "Medium",
            description: "Given a string s, return the longest palindromic substring in s.",
            example: "Input: s = \"babad\"\nOutput: \"bab\"\nNote: \"aba\" is also a valid answer.",
            companies: ["Microsoft", "Google", "Amazon"],
            url: "https://leetcode.com/problems/longest-palindromic-substring/",
            tags: ["String", "Dynamic Programming"]
        },
        {
            id: 11,
            title: "Container With Most Water",
            difficulty: "Medium",
            description: "Given n non-negative integers a1, a2, ..., an , where each represents a point at coordinate (i, ai). n vertical lines are drawn such that the two endpoints of the line i is at (i, ai) and (i, 0). Find two lines, which, together with the x-axis forms a container, such that the container contains the most water.",
            example: "Input: height = [1,8,6,2,5,4,8,3,7]\nOutput: 49\nExplanation: The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (blue section) the container can contain is 49.",
            companies: ["Google", "Amazon"],
            url: "https://leetcode.com/problems/container-with-most-water/",
            tags: ["Array", "Two Pointers", "Greedy"]
        },
        {
            id: 15,
            title: "3Sum",
            difficulty: "Medium",
            description: "Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.",
            example: "Input: nums = [-1,0,1,2,-1,-4]\nOutput: [[-1,-1,2],[-1,0,1]]",
            companies: ["Microsoft", "Google", "Amazon", "Facebook"],
            url: "https://leetcode.com/problems/3sum/",
            tags: ["Array", "Two Pointers"]
        },
        {
            id: 33,
            title: "Search in Rotated Sorted Array",
            difficulty: "Medium",
            description: "There is an integer array nums sorted in ascending order (with distinct values). Prior to being passed to your function, nums is rotated at an unknown pivot index k. Given the array nums after the rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums.",
            example: "Input: nums = [4,5,6,7,0,1,2], target = 0\nOutput: 4",
            companies: ["Microsoft", "Google", "Amazon", "Facebook"],
            url: "https://leetcode.com/problems/search-in-rotated-sorted-array/",
            tags: ["Array", "Binary Search"]
        }
    ],
    hard: [
        {
            id: 4,
            title: "Median of Two Sorted Arrays",
            difficulty: "Hard",
            description: "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.",
            example: "Input: nums1 = [1,3], nums2 = [2]\nOutput: 2.00000\nExplanation: merged array = [1,2,3] and median is 2.",
            companies: ["Google", "Amazon", "Microsoft"],
            url: "https://leetcode.com/problems/median-of-two-sorted-arrays/",
            tags: ["Array", "Binary Search", "Divide and Conquer"]
        },
        {
            id: 10,
            title: "Regular Expression Matching",
            difficulty: "Hard",
            description: "Given an input string s and a pattern p, implement regular expression matching with support for '.' and '*' where: '.' Matches any single character. '*' Matches zero or more of the preceding element.",
            example: "Input: s = \"aa\", p = \"a*\"\nOutput: true\nExplanation: '*' means zero or more of the preceding element, 'a'. Therefore, by repeating 'a' once, it becomes \"aa\".",
            companies: ["Google", "Facebook"],
            url: "https://leetcode.com/problems/regular-expression-matching/",
            tags: ["String", "Dynamic Programming", "Backtracking"]
        },
        {
            id: 23,
            title: "Merge k Sorted Lists",
            difficulty: "Hard",
            description: "You are given an array of k linked-lists lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.",
            example: "Input: lists = [[1,4,5],[1,3,4],[2,6]]\nOutput: [1,1,2,3,4,4,5,6]\nExplanation: The linked-lists are:\n[\n  1->4->5,\n  1->3->4,\n  2->6\n]\nmerging them into one sorted list:\n1->1->2->3->4->4->5->6",
            companies: ["Microsoft", "Google", "Amazon", "Facebook"],
            url: "https://leetcode.com/problems/merge-k-sorted-lists/",
            tags: ["Linked List", "Divide and Conquer", "Heap"]
        },
        {
            id: 42,
            title: "Trapping Rain Water",
            difficulty: "Hard",
            description: "Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
            example: "Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]\nOutput: 6\nExplanation: The above elevation map is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water are being trapped.",
            companies: ["Microsoft", "Google", "Amazon", "Facebook"],
            url: "https://leetcode.com/problems/trapping-rain-water/",
            tags: ["Array", "Two Pointers", "Dynamic Programming", "Stack"]
        },
        {
            id: 76,
            title: "Minimum Window Substring",
            difficulty: "Hard",
            description: "Given two strings s and t of lengths m and n respectively, return the minimum window substring of s such that every character in t (including duplicates) is included in the window. If there is no such substring, return the empty string \"\".",
            example: "Input: s = \"ADOBECODEBANC\", t = \"ABC\"\nOutput: \"BANC\"\nExplanation: The minimum window substring \"BANC\" includes 'A', 'B', and 'C' from string t.",
            companies: ["Microsoft", "Google", "Amazon", "Facebook"],
            url: "https://leetcode.com/problems/minimum-window-substring/",
            tags: ["Hash Table", "String", "Sliding Window"]
        }
    ],
    microsoft: [
        {
            id: 146,
            title: "LRU Cache",
            difficulty: "Medium",
            description: "Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.",
            example: "Input\n[\"LRUCache\", \"put\", \"put\", \"get\", \"put\", \"get\", \"put\", \"get\", \"get\", \"get\"]\n[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]\nOutput\n[null, null, null, 1, null, -1, null, -1, 3, 4]",
            companies: ["Microsoft", "Amazon", "Facebook"],
            url: "https://leetcode.com/problems/lru-cache/",
            tags: ["Hash Table", "Linked List", "Design"]
        },
        {
            id: 200,
            title: "Number of Islands",
            difficulty: "Medium",
            description: "Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.",
            example: "Input: grid = [\n  [\"1\",\"1\",\"1\",\"1\",\"0\"],\n  [\"1\",\"1\",\"0\",\"1\",\"0\"],\n  [\"1\",\"1\",\"0\",\"0\",\"0\"],\n  [\"0\",\"0\",\"0\",\"0\",\"0\"]\n]\nOutput: 1",
            companies: ["Microsoft", "Amazon", "Google", "Facebook"],
            url: "https://leetcode.com/problems/number-of-islands/",
            tags: ["Array", "Depth-First Search", "Breadth-First Search", "Union Find"]
        },
        {
            id: 297,
            title: "Serialize and Deserialize Binary Tree",
            difficulty: "Hard",
            description: "Design an algorithm to serialize and deserialize a binary tree.",
            example: "Input: root = [1,2,3,null,null,4,5]\nOutput: [1,2,3,null,null,4,5]",
            companies: ["Microsoft", "Amazon", "Google", "Facebook"],
            url: "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/",
            tags: ["String", "Tree", "Depth-First Search", "Breadth-First Search", "Design"]
        }
    ],
    google: [
        {
            id: 253,
            title: "Meeting Rooms II",
            difficulty: "Medium",
            description: "Given an array of meeting time intervals intervals where intervals[i] = [starti, endi], return the minimum number of conference rooms required.",
            example: "Input: intervals = [[0,30],[5,10],[15,20]]\nOutput: 2",
            companies: ["Google", "Facebook", "Microsoft", "Amazon"],
            url: "https://leetcode.com/problems/meeting-rooms-ii/",
            tags: ["Array", "Greedy", "Sorting", "Heap"]
        },
        {
            id: 329,
            title: "Longest Increasing Path in a Matrix",
            difficulty: "Hard",
            description: "Given an m x n integers matrix, return the length of the longest increasing path in matrix.",
            example: "Input: matrix = [[9,9,4],[6,6,8],[2,1,1]]\nOutput: 4\nExplanation: The longest increasing path is [1, 2, 6, 9].",
            companies: ["Google", "Facebook", "Amazon"],
            url: "https://leetcode.com/problems/longest-increasing-path-in-a-matrix/",
            tags: ["Dynamic Programming", "Depth-First Search", "Breadth-First Search", "Graph", "Topological Sort", "Memoization"]
        },
        {
            id: 843,
            title: "Guess the Word",
            difficulty: "Hard",
            description: "You are given an array of unique strings wordlist where wordlist[i] is 6 letters long, and one word in this list is chosen as secret. You may call Master.guess(word) to guess a word. The guessed word should have type string and must be from the original list with 6 lowercase letters.",
            example: "Input: secret = \"acckzz\", wordlist = [\"acckzz\",\"ccbazz\",\"eiowzz\",\"abcczz\"]\nOutput: You guessed the secret word correctly.",
            companies: ["Google"],
            url: "https://leetcode.com/problems/guess-the-word/",
            tags: ["Array", "Math", "Game Theory", "Interactive"]
        }
    ]
};

// Function to get a random problem
function getRandomProblem(difficulty = 'all') {
    let availableProblems = [];
    
    // Select problems based on difficulty
    if (difficulty === 'all') {
        availableProblems = [
            ...leetcodeProblems.easy,
            ...leetcodeProblems.medium,
            ...leetcodeProblems.hard
        ];
    } else if (difficulty === 'microsoft') {
        availableProblems = leetcodeProblems.microsoft;
    } else if (difficulty === 'google') {
        availableProblems = leetcodeProblems.google;
    } else {
        availableProblems = leetcodeProblems[difficulty] || [];
    }
    
    // Return a random problem from the available ones
    if (availableProblems.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableProblems.length);
        return availableProblems[randomIndex];
    }
    
    return null; // If no problems are available
}

// Function to display problem in HTML
function displayProblem(problem) {
    if (!problem) {
        document.getElementById('leetcode-problem').innerHTML = `
            <div class="error-message">
                <p>No problems available for the selected difficulty.</p>
            </div>
        `;
        return;
    }
    
    // Create company badges
    const companyBadges = problem.companies.map(company => {
        const companyClass = company.toLowerCase();
        return `<span class="company-badge ${companyClass}-badge">${company}</span>`;
    }).join('');
    
    // Create tags badges
    const tagBadges = problem.tags.map(tag => {
        return `<span class="tag-badge">${tag}</span>`;
    }).join('');
    
    // Format the problem description and example
    const formattedDescription = problem.description.replace(/\n/g, '<br>');
    const formattedExample = problem.example.replace(/\n/g, '<br>');
    
    // Get difficulty class
    const difficultyClass = problem.difficulty.toLowerCase();
    
    // Build HTML
    const problemHTML = `
        <div class="problem-card">
            <div class="problem-header">
                <h3 class="problem-title">
                    <span class="problem-id">${problem.id}.</span> 
                    ${problem.title}
                </h3>
                <span class="difficulty-badge ${difficultyClass}">${problem.difficulty}</span>
            </div>
            
            <div class="problem-companies">
                ${companyBadges}
            </div>
            
            <div class="problem-description">
                <p>${formattedDescription}</p>
            </div>
            
            <div class="problem-example">
                <h4>Example:</h4>
                <pre>${formattedExample}</pre>
            </div>
            
            <div class="problem-tags">
                ${tagBadges}
            </div>
            
            <div class="problem-footer">
                <a href="${problem.url}" target="_blank" class="problem-link">
                    <i class="fas fa-external-link-alt"></i> Solve on LeetCode
                </a>
                <button class="btn btn-primary new-problem-btn" onclick="generateNewProblem(currentDifficulty)">
                    <i class="fas fa-random"></i> Try Another
                </button>
            </div>
        </div>
    `;
    
    document.getElementById('leetcode-problem').innerHTML = problemHTML;
}

// Track current difficulty
let currentDifficulty = 'all';

// Function to generate a new problem
function generateNewProblem(difficulty = 'all') {
    currentDifficulty = difficulty;
    
    // Update active button
    const difficultyButtons = document.querySelectorAll('.difficulty-btn');
    difficultyButtons.forEach(button => {
        button.classList.remove('active');
        if (button.getAttribute('data-difficulty') === difficulty) {
            button.classList.add('active');
        }
    });
    
    // Show loading animation
    document.getElementById('leetcode-problem').innerHTML = `
        <div class="loading-problem">
            <div class="spinner"></div>
            <p>Generating a random problem...</p>
        </div>
    `;
    
    // Simulate loading time for better UX
    setTimeout(() => {
        const problem = getRandomProblem(difficulty);
        displayProblem(problem);
    }, 800);
}

// Initialize the problem generator when the page loads
document.addEventListener('DOMContentLoaded', () => {
    generateNewProblem('all');
    
    // Set up event listeners for difficulty buttons
    const difficultyButtons = document.querySelectorAll('.difficulty-btn');
    difficultyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const difficulty = button.getAttribute('data-difficulty');
            generateNewProblem(difficulty);
        });
    });
});