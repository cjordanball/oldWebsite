'use strict'

module.exports = {

    hard031: {
        title: 'Difficult 31',
        heading: 'Reduce a Roman Numeral',
        description: 'Using the JavaScript language, have the function RomanNumeralReduction(str) read str which will be a string of roman numerals in decreasing order. The numerals being used are: I for 1, V for 5, X for 10, L for 50, C for 100, D for 500 and M for 1000. Your program should return the same number given by str using a smaller set of roman numerals. For example: if str is "LLLXXXVVVV" this is 200, so your program should return CC because this is the shortest way to write 200 using the roman numeral system given above. If a string is given in its shortest form, just return that same string.',
        comment: null,
        solutions: [{
            heading: null,
            discuss: null,
            code: `
function RomanNumeralReduction(str) {
    var arr = str.split('');
    var counter = 0;
    arr.forEach(function(val){
        switch(val) {
            case 'M':
                counter += 1000;
                break;
            case 'D':
                counter += 500;
                break;
            case 'C':
                counter += 100;
                break;
            case 'L':
                counter += 50;
                break;
            case 'X':
                counter += 10;
                break;
            case 'V':
                counter += 5;
                break;
            case 'I':
                counter += 1;
                break;
        }
    });

    return rebuild(counter);
}

function rebuild(num) {
    var holdStr = '';
    var m = num / 1000;
    num = num % 1000;
    var d = num / 500;
    num = num % 500;
    var c = num / 100;
    num = num % 100;
    var l = num / 50;
    num = num % 50;
    var x = num / 10;
    num = num % 10;
    var v = num / 5;
    num = num % 5;

    return ('M'.repeat(m) + 'D'.repeat(d) + 'C'.repeat(c) + 'L'.repeat(l) + 'X'.repeat(x) + 'V'.repeat(v) + 'I'.repeat(num))
}`,
            notes: []
        }]
    },

    hard032: {
        title: 'Difficult 32',
        heading: 'Split Integers Into Two Even Sets',
        description: 'Using the JavaScript language, have the function ParallelSums(arr) take the array of integers stored in arr which will always contain an even amount of integers, and determine how they can be split into two even sets of integers each so that both sets add up to the same number. If this is impossible return -1. If it\'s possible to split the array into two sets, then return a string representation of the first set followed by the second set with each integer separated by a comma and both sets sorted in ascending order. The set that goes first is the set with the smallest first integer.  For example: if arr is [16, 22, 35, 8, 20, 1, 21, 11], then your program should output 1, 11, 20, 35, 8, 16, 21, 22 (but no spaces in the string).',
        comment: null,
        solutions: [{
            heading: null,
            discuss: null,
            code: `
function ParallelSums(arr) {
    var arrSum = arr.reduce(function(var1, var2) {
        return var1 + var2;
    });
    var targetSum = arrSum / 2;
    var len = arr.length;

    var holdArr = [];

    for (var i = Math.pow(2, len); i < Math.pow(2, len + 1); i++) {
        var numToString = i.toString(2).slice(1);
        var numArray = numToString.split('');
        var count = numArray.filter(function(val) {
            return val === '1';
        }).length;

        if (count === len / 2) {
            holdArr.push(numToString);
        }
    }
    var holdArrlen = holdArr.length;
    for (var i = 0; i < holdArr.length; i++) {
        var sum = 0;
        var numStr = holdArr[i];
        for (var j = 0; j < len; j++) {
            var yesOrNo = parseInt(numStr.charAt(j), 10);
            sum += yesOrNo * arr[j];
        }
        if (sum === targetSum) {
            var ansArr1 = [];
            var ansArr2 = [];
            for (var k = 0; k < len; k++) {
                if (parseInt(numStr.charAt(k), 10)) {
                    ansArr2.push(arr[k]);
                } else {
                    ansArr1.push(arr[k]);
                }
            }
            ansArr1.sort(function(a, b) {return a - b});
            ansArr2.sort(function(a, b) {return a - b});

            return ansArr1[0] < ansArr2[0] ? ansArr1.concat(ansArr2).join(',') : ansArr2.concat(ansArr1).join(',')

            break;
        }

    }
    return -1;
}`,
            notes: []
        }]
    },

    hard033: {
        title: 'Difficult 33',
        heading: 'Locate Longest Subsequence',
        description: 'Using the JavaScript language, have the function LCS(strArr) take the strArr parameter being passed which will be an array of two strings containing only the characters {a,b,c} and have your program return the length of the longest common subsequence common to both strings. A common subsequence for two strings does not require each character to occupy consecutive positions within the original strings. For example: if strArr is ["abcabb","bacb"] then your program should return 3 because one longest common subsequence for these two strings is "bab" and there are also other 3-length subsequences such as "acb" and "bcb" but 3 is the longest common subsequence for these two strings.',
        comment: null,
        solutions: [{
            heading: null,
            discuss: null,
            code: `
function LCS(arr) {
    var len0 = arr[0].length;
    var len1 = arr[1].length;
    var counter = 0;
    for (var i = 1; i <= Math.min(len0, len1); i++) {
        //set up array of all permutations for length i
        var permutations = permutes(i);
        regExPermutations = permutations.map(function(val) {
            return regExBuild(val);
        });
        permListLength = regExPermutations.length;
        for (var j = 0; j < permListLength; j++) {
            var regEx = new RegExp(regExPermutations[j], '');
            if (regEx.test(arr[0]) && regEx.test(arr[1])) {
                counter++;
                break
            }
        }
    }
        return counter;
}

function permutes(num) {
    var theArray = [''];
    for (var i = 0; i < num; i++) {
        var arrName = 'arr' + i.toString();
        this[arrName] = [];
        for (var j = 0; j < theArray.length; j++) {
            var target = theArray[j] ? theArray[j] : '';
            this[arrName].push(target + 'a', target + 'b', target + 'c');
        }
        theArray = this[arrName].slice();
    }
        return this[arrName];
}

function regExBuild(str) {
    return str.replace(/\w/g, '$&\\w*');
}`,
            notes: []
        }]
    },

    hard034: {
        title: 'Difficult 34',
        heading: 'Determine the Nim Winner',
        description: 'Using the JavaScript language, have the function NimWinner(arr) take the array of integers stored in arr which will represent the amount of coins in each pile. For example: [2, 4, 1, 3] means there are 4 piles of coins and there are 2 coins in the first pile, 4 in the second pile, etc. Nim is played by each player removing any number of coins from only one pile, and the winner is the player who picks up the last coin. For example: if arr is [1, 2, 3] then for example player 1 can remove 2 coins from the last pile which results in [1, 2, 1]. Then player 2 can remove 1 coin from the first pile which results in [0, 2, 1], etc. The player that has the last possible move taking the last coin(s) from a pile wins the game. Your program should output either 1 or 2 which represents which player has a guaranteed win with perfect play for the Nim game.',
        comment: 'This turned out to be the kind of problem that is rather tricky in terms of logically figuring out the challenge, but trivial as a matter of coding once the underlying logic is given. I must confess that after a couple of hours mastering the rules underlying very small Nim games, I went onto Wikipedia and discovered that there is quite a rich history to the game. In addition, I learned that, as I suspected, the game boiled down to a very simple mathematical formula. If the bitwise XOR sum of the piles is zero, the first player loses.',
        solutions: [{
            heading: null,
            discuss: null,
            code: `
function NimWinner(arr) {

    return arr.reduce((val1, val2) => val1 ^ val2) === 0 ? 2 : 1;
}`,
            notes: []
        }]
    },

    hard035: {
        title: 'Difficult 35',
        heading: 'Find the Next Pascal\'s Triangle Number',
        description: 'Using the JavaScript language, have the function PascalsTriangle(arr) take arr which will be a partial row from Pascal\'s triangle. Pascal\'s triangle starts with a [1] at the first row of the triangle. Then the second row is [1,1] and the third row is [1,2,1]. The next row begins with 1 and ends with 1, and the inside of the row is determined by adding the k-1 and kth elements from the previous row. The next row in the triangle would then be [1,3,3,1], and so on. The input, arr will be some almost completed row from the triangle, for example [1,4,6,4] and your program should return the next element in that row. In this example your program should return 1. Another example: if arr is [1,5,10] your program should return 10. If the whole row is entered as input and there is no next number, your program should return -1.  The input array will contain at least 3 elements so [1] and [1,1] will not occur as inputs.',
        comment: 'The following solution requires an understanding of Pascal\'s triangle as a listing of the number of combinations of x items out of a total y items, so that the desired number can be determined by the mathematical formula y!/(x! * (y-x)!)',
        solutions: [{
            heading: null,
            discuss: null,
            code: `
function PascalTriangle(arr) {
    var keyNum = arr[1];
    var len = arr.length;
    return len === keyNum + 1 ? -1 : factorial(keyNum) / (factorial(keyNum - len) * factorial(len));
}

function factorial(num) {
    return num <= 1 ? 1 : num * factorial(num - 1);
}`,
            notes: []
        }]
    }
}
