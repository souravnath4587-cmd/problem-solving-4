/* ------------------------------------------------------------------ */
/* 01. Isomorphic Strings                                              */
/* ------------------------------------------------------------------ */

var isIsomorphic = function (s, t) {
  if (s.length !== t.length) return false;

  const mapST = new Map();
  const mapTS = new Map();

  for (let i = 0; i < s.length; i++) {
    const a = s[i];
    const b = t[i];

    if (mapST.has(a) && mapST.get(a) !== b) return false;
    if (mapTS.has(b) && mapTS.get(b) !== a) return false;

    mapST.set(a, b);
    mapTS.set(b, a);
  }

  return true;
};

// console.log(isIsomorphic("egg", "add"));

/* ------------------------------------------------------------------ */
/* 02. Word Pattern                                                     */
/* ------------------------------------------------------------------ */

var wordPattern = function (pattern, s) {
  const words = s.split(" ");
  if (pattern.length !== words.length) return false;

  const mapPW = new Map();
  const mapWP = new Map();

  for (let i = 0; i < pattern.length; i++) {
    const p = pattern[i];
    const w = words[i];

    if (mapPW.has(p) && mapPW.get(p) !== w) return false;
    if (mapWP.has(w) && mapWP.get(w) !== p) return false;

    mapPW.set(p, w);
    mapWP.set(w, p);
  }

  return true;
};

// console.log(wordPattern("abba", "dog cat cat dog"));

/* ------------------------------------------------------------------ */
/* 03. Find the Difference                                             */
/* ------------------------------------------------------------------ */

var findTheDifference = function (s, t) {
  let code = 0;

  for (const ch of s) code -= ch.charCodeAt(0);
  for (const ch of t) code += ch.charCodeAt(0);

  return String.fromCharCode(code);
};

// console.log(findTheDifference("abcd", "abcde"));

/* ------------------------------------------------------------------ */
/* 04. Reverse Linked List                                             */
/* ------------------------------------------------------------------ */

var reverseList = function (head) {
  return head.reverse();
};

// console.log(reverseList([1, 2, 3, 4, 5]));

/* ------------------------------------------------------------------ */
/* 05. Middle of the Linked List                                       */
/* ------------------------------------------------------------------ */

var middleNode = function (head) {
  let middle = Math.floor(head.length / 2);

  return head.slice(middle);
};

console.log(middleNode([1, 2, 3, 4, 5]));

/* ------------------------------------------------------------------ */
/* 06. Product of Array Except Self                                    */
/* ------------------------------------------------------------------ */

var productExceptSelf = function (nums) {
  const n = nums.length;
  const result = new Array(n).fill(1);

  let prefix = 1;
  for (let i = 0; i < n; i++) {
    result[i] = prefix;
    prefix *= nums[i];
  }

  let suffix = 1;
  for (let i = n - 1; i >= 0; i--) {
    result[i] *= suffix;
    suffix *= nums[i];
  }

  return result;
};

// console.log(productExceptSelf([1, 2, 3, 4]));

/* ------------------------------------------------------------------ */
/* 07. Remove Nth Node From End of List                                 */
/* ------------------------------------------------------------------ */

var removeNthFromEnd = function (head, n) {
  let index = head.length - n;

  head.splice(index, 1);

  return head;
};

// console.log(removeNthFromEnd([1, 2, 3, 4, 5], 2));

/* ------------------------------------------------------------------ */
/* 08. Find First and Last Position of Element in Sorted Array          */
/* ------------------------------------------------------------------ */

var searchRange = function (nums, target) {
  const findBound = (isFirst) => {
    let lo = 0;
    let hi = nums.length - 1;
    let result = -1;

    while (lo <= hi) {
      const mid = Math.floor((lo + hi) / 2);

      if (nums[mid] === target) {
        result = mid;
        if (isFirst) hi = mid - 1;
        else lo = mid + 1;
      } else if (nums[mid] < target) {
        lo = mid + 1;
      } else {
        hi = mid - 1;
      }
    }

    return result;
  };

  return [findBound(true), findBound(false)];
};

// console.log(searchRange([5, 7, 7, 8, 8, 10], 8));

/* ------------------------------------------------------------------ */
/* 09. Permutation in String                                            */
/* ------------------------------------------------------------------ */

var checkInclusion = function (s1, s2) {
  if (s1.length > s2.length) return false;

  const need = new Array(26).fill(0);
  const window = new Array(26).fill(0);
  const aCode = "a".charCodeAt(0);

  for (let i = 0; i < s1.length; i++) {
    need[s1.charCodeAt(i) - aCode]++;
    window[s2.charCodeAt(i) - aCode]++;
  }

  const matches = () => {
    for (let i = 0; i < 26; i++) {
      if (need[i] !== window[i]) return false;
    }
    return true;
  };

  if (matches()) return true;

  for (let i = s1.length; i < s2.length; i++) {
    window[s2.charCodeAt(i) - aCode]++;
    window[s2.charCodeAt(i - s1.length) - aCode]--;

    if (matches()) return true;
  }

  return false;
};

// console.log(checkInclusion("ab", "eidbaooo"));

/* ------------------------------------------------------------------ */
/* 10. Find All Anagrams in a String                                    */
/* ------------------------------------------------------------------ */

var findAnagrams = function (s, p) {
  const result = [];
  if (p.length > s.length) return result;

  const need = new Array(26).fill(0);
  const window = new Array(26).fill(0);
  const aCode = "a".charCodeAt(0);

  for (let i = 0; i < p.length; i++) {
    need[p.charCodeAt(i) - aCode]++;
    window[s.charCodeAt(i) - aCode]++;
  }

  const matches = () => {
    for (let i = 0; i < 26; i++) {
      if (need[i] !== window[i]) return false;
    }
    return true;
  };

  if (matches()) result.push(0);

  for (let i = p.length; i < s.length; i++) {
    window[s.charCodeAt(i) - aCode]++;
    window[s.charCodeAt(i - p.length) - aCode]--;

    if (matches()) result.push(i - p.length + 1);
  }

  return result;
};
console.log(findAnagrams("cbaebabacd", "abc"));
