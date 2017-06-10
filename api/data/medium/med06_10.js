'use strict';

module.exports = {
    med006: {
        title: 'Medium 6',
        heading: 'Is Word 1 Contained in Word 2?',
        description: 'Create a function StringScramble(str1,str2) to take two string parameters passed to it and return true if a portion of str1 characters can be rearranged to match str2, otherwise return false. For example: if str1 is "rkqodlw" and str2 is "world" the output should return true. Punctuation and symbols will not be entered with the parameters.',
        comment: null,
        solutions: [{
            heading: null,
            discuss: null,
            code: `
function StringScramble(str1,str2) {

    //See Note 1
    arr1 = str1.toLowerCase().split("");
    arr2 = str2.toLowerCase().split("");

    //See Note 2
    arr1.sort();
    arr2.sort();

    //See Note 3
    var i = 0;
    while (i < arr1.length) {
        if (arr2[0] === arr1[i]) {
            arr2.shift();
            arr1.splice(0,i+1);
            i = 0;
        } else if (arr2[0] < arr1[i]){
            return false;
        } else {
            i++;
        }
    }
    return true;
}`,
            notes: [
                'First, knock down the strings to lower case and put them in arrays for manipulation.',
                'Next, sort the arrays into alphabetical order.',
                'Loop through arr2, checking to see if each letter is in arr1, then removing it from arr2 and it and all previous letters from arr1. If the first letter in arr2 is past the first letter in arr1, then return false.'
            ]
        }]
    },

    med007: {
        title: 'Medium 7',
        heading: 'Identify Sequence as Arithmetic/Geometric',
        description: 'Create a function ArithGeoII(arr) to take an array of numbers (arr) and return the string "Arithmetic" if the sequence follows an arithmetic pattern or return "Geometric" if it follows a geometric pattern. If the sequence doesn\'t follow either pattern return -1. An arithmetic sequence is one where the difference between each of the numbers is consistent, where as in a geometric sequence, each term after the first is multiplied by some constant or common ratio. Arithmetic example: [2, 4, 6, 8] and Geometric example: [2, 6, 18, 54]. Negative numbers may be entered as parameters, 0 will not be entered, and no array will contain all the same elements.',
        comment: null,
        solutions: [{
            heading: null,
            discuss: null,
            code: `
function ArithGeoII(arr) {
    var len = arr.length;
    //See Note 1
    var mathConstant = arr[1] - arr[0];
    var geoConstant = arr[1] / arr[0];

    //See Note 2
    for (var i = 0; i < len - 1; i++) {
        if (arr[i + 1] - arr[i] !== mathConstant) {
            var mathTest = true;
            break;
        }
    }
    //See Note 3
    if (!mathTest) {
        return 'Arithmetic';
    }
    else {
        for (var j = 0; j < len - 1; j++) {
            if (arr[j + 1] / arr[j] !== geoConstant) {
                return -1;
            }
        }
        return 'Geometric';
    }
}
`,
            notes: [
                'Establish the relationship between two consecutive array elements.',
                'Test the array to see if the difference between elements is the same between each pair of consecutive elements. If any pair fails, set flag to true and quit',
                'If the above loop went all the way through, then return answer "Arithmetic."  If not, then loop through the array testing each pair. If any pair fails, return -1 since it has failed both tests. If it makes it all the way, return "Geometric."'
            ]
        }]
    },

    med008: {
        title: 'Medium 8',
        heading: 'Match Number Sums With Target',
        description: 'Create a function ArrayAddition(arr) to take an array of numbers (arr) and return true if any combination of numbers in the array can be added up to equal the largest number in the array; otherwise, return false. For example: if arr contains [4, 6, 23, 10, 1, 3] the output should return true because 4 + 6 + 10 + 3 = 23. The array will not be empty, will not contain all the same elements, and may contain negative numbers.',
        comment: 'I believe this problem is an exact duplicate of that in Problem 17 in the "Easy" section. I consider it more accurately placed in the "medium difficulty" section than the "easy" section. The solution uses a brute force approach, removing the largest item from the array, then adding all the possible combinations of remaining array items until a match is reached (or not).  This is done by representing the number of array items as a binary number, then looping through (which tries each combination of an array item being in or out of the count).',
        solutions: [{
            heading: null,
            discuss: null,
            code: `
function ArrayAddition(arr) {
    var target;
    var addArr = arrayPrep(arr);
    var len = addArr.length;
    var permNum = Math.pow(2, len);

    for(var i = 0; i <= permNum; i++) {
        permStr = (i).toString(2);
        strlen = permStr.length;
        var counter = 0;
        for(var j = 0; j < strlen; j++) {
            if(permStr[j] === '1') {
                counter += addArr[j];
            }
        }
        if (counter === target) {
            return true;
        }
    }
    return false;
    //See Note 1
    function arrayPrep(arr2) {
        arr.sort(function(a, b){
            return a - b
        });
        target = arr2.pop()
        return arr2
    }
}`,
            notes: [
                'The arrayPrip() method prepares the array by sorting it and popping off the max value.'
            ]
        }]
    },

    med009: {
        title: 'Medium 9',
        heading: 'Binary to Decimal Converter',
        description: 'Create a function BinaryConverter(str) that takes a string consisting of ones and zeros, and returns the decimal form of a binary value. For example: if 101 is passed return 5, or if 1000 is passed return 8.',
        comment: null,
        solutions: [{
            heading: null,
            discuss: null,
            code: `
function BinaryConverter(str) {
    var counter = 0;
    var len = str.length;
    //See Note 1
    for (var i = len - 1; i >= 0; i--) {
        var j = len - 1 - i;
        if (str[j] === '1') {
            counter += Math.pow(2, j);
        }
    }
    return counter;
}`,
            notes: [
                'Loop through the string from back to front, adding in the powers of two that have a 1.'
            ]
        }]
    },

    med010: {
        title: 'Medium 10',
        heading: 'Find Word With Most Repeat Letters',
        description: 'Create a function, LetterCount(str), that takes a string parameter (str) and returns the first word with the greatest number of repeated letters. For example: "Today, is the greatest day ever!" should return greatest because it has 2 e\'s (and 2 t\'s) and it comes before ever, which also has 2 e\'s. If there are no words with repeating letters, the function should return -1. All words in str will be separated by spaces.',
        comment: 'This appears to be the same problem as Problem 18 in the "Easy" group',
        solutions: [{
            heading: null,
            discuss: null,
            code: `
function LetterCount(str) {
    var strArr = preliminary(str);
    var arr = counting(strArr);
    var maxArr = sortPop(arr);
    var wordArr = str.split(' ');
    maxArr = maxArr.map(function(val, ind) {
        return [val, wordArr[ind ]];
    });
    maxArr.sort(function(a, b){return b[0] - a[0]});
    return maxArr[0][1];

    function preliminary(str) {
        str = str.toLowerCase();
        str = str.replace(/[^a-z\s]/g, "");
        var wordArray = str.split(" ");
        wordArray = wordArray.map(function(val) {
            valArr = val.split('');
            valArr = valArr.sort();
            return valArr;
        });
        return wordArray;
    }

    function counting(arr) {
        for (var i = 0, len = arr.length; i < len; i++) {
            var count = 1;
            for (var j = 0, len2 = arr[i].length; j < len2; j++) {
                if (arr[i][j + 1] === arr[i][j]) {
                    arr[i][j] = count;
                    count++;
                }
                else {
                    arr[i][j] = count;
                    count = 1;
                }
            }
        }
        return arr;
    }
    function sortPop(arr) {
        arr = arr.map(function(val) {
            return val.sort().pop();
        });
        return arr;
    }
}`,
            notes: []
        }]
    }
}
