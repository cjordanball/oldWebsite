'use strict';

module.exports = {
    easy031: {
        title: 'Problem 31',
        heading: 'Find Where the Tide Turns',
        description: 'Using the JavaScript language, have the function ChangingSequence(arr) take the array of numbers stored in arr and return the index at which the numbers stop increasing and begin decreasing or stop decreasing and begin increasing. For example: if arr is [1, 2, 4, 6, 4, 3, 1] then your program should return 3 because 6 is the last point in the array where the numbers were increasing and the next number begins a decreasing sequence. The array will contain at least 3 numbers and it may contains only a single sequence, increasing or decreasing. If there is only a single sequence in the array, then your program should return -1. Indexing should begin with 0.',
        comment: 'The code below makes the assumption that there is a difference between the first two numbers, so there is an increasing or decreasing sequence. Obviously, in the real world validation should be in place to handle that not being the case',
        solutions: [{
            heading: null,
            discuss: null,
            code: `
function ChangingSequence(arr) {
    //See Note 1
    var type = arr[1] - arr[0] > 0 ? 'increasing' : 'decreasing';

    //See Note 2
    var maxInd = arr.length - 1;

    //See Note 3
    if (type === 'increasing') {
        //See Note 4
        var index = arr.findIndex(function(val, ind) {
            while (ind < maxInd) {
                return val > arr[ind + 1];
            }
            return false;
        });

        return index;
    }

    if (type === 'decreasing') {
        var index = arr.findIndex(function(val, ind) {
            while (ind < maxInd) {
                return val < arr[ind + 1]
            }
            return 0;
        });

        return index;
    }
}`,
            notes: [
                'First, determine if it is an increasing or decreasing sequence',
                'Set a maximum index of the array, to keep from overflowing',
                'Code for an increasing array',
                'FindIndex is an array iteration method that came in with ES6. It returns the first value for which the callback returns false.'
            ]
        }]
    },

    easy032: {
        title: 'Problem 32',
        heading: 'Find the Overlap in Two Ranges',
        description: 'Using the JavaScript language, have the function OverlappingRanges(arr) take the array of numbers stored in arr which will contain 5 positive integers, the first two representing a range of numbers (a to b), the next 2 also representing another range of integers (c to d), and a final 5th element (x) which will also be a positive integer, and return the string true if both sets of ranges overlap by at least x numbers. For example: if arr is [4, 10, 2, 6, 3] then your program should return the string true. The first range of numbers are 4, 5, 6, 7, 8, 9, 10 and the second range of numbers are 2, 3, 4, 5, 6. The last element in the array is 3, and there are 3 numbers that overlap between both ranges: 4, 5, and 6. If both ranges do not overlap by at least x numbers, then your program should return the string false.',
        comment: 'Making the assumption that the input is clean (e.g., the numbers are integers, the ranges are set from min, max), then this is a pretty easy problem.',
        solutions: [{
            heading: null,
            discuss: null,
            code: `
function OverlappingRanges(arr) {
    var target = arr.pop();
    var MaxLowerBound = Math.max(arr[0], arr[2]);
    var MinUpperBound = Math.min(arr[1], arr[3]);

    var range = MinUpperBound < MaxLowerBound ? 0 : MinUpperBound - MaxLowerBound + 1;

    return range >= target ? 'true' : 'false';
}`,
            notes: []
        }]
    },

    easy033: {
        title: 'Problem 33',
        heading: 'Is the Array Superincreasing?',
        description: 'Using the JavaScript language, have the function Superincreasing(arr) take the array of numbers stored in arr and determine if the array forms a superincreasing sequence where each element in the array is greater than the sum of all previous elements. The array will only consist of positive integers. For example: if arr is [1, 3, 6, 13, 54] then your program should return the string "true" because it forms a superincreasing sequence. If a superincreasing sequence isn\'t formed, then your program should return the string "false".',
        comment: null,
        solutions: [{
            heading: null,
            discuss: null,
            code: `
function Superincreasing(arr) {
    var maxInd = arr.length - 1;
    var target;
    var sum;

    for (var i = maxInd; i > 0; i--) {
        target = arr.pop()
        sum = arr.reduce(function(val1, val2) {
            return val1 + val2;
        });
        if (sum >= target) {
            return 'false';
        }
    };
    return 'true';

}`,
            notes: []
        }]
    },

    easy034: {
        title: 'Problem 34',
        heading: 'Determine the Number of Differences in Two Strings',
        description: 'Using the JavaScript language, have the function HammingDistance(strArr) take the array of strings stored in strArr, which will only contain two strings of equal length and return the Hamming distance between them. The Hamming distance is the number of positions where the corresponding characters are different. For example: if strArr is ["coder", "codec"] then your program should return 1. The string will always be of equal length and will only contain lowercase characters from the alphabet and numbers.',
        comment: 'There are two ways to attack this that come immediately to mind. Each is illustrated below.',
        solutions: [{
            heading: 'Solution One',
            discuss: 'The most basic is using a simple for loop to go through the two strings and compare each letter, and keep a count of the number of places that don\'t have the same letter.',
            code: `
function HammingDistance(strArr) {
    var word1 = strArr[0];
    var word2 = strArr[1];
    var len = word1.length;
    var count = 0;

    for (var i = 0; i < len; i++) {
        if (word1[i] !== word2[i]) {
            count++;
        }
    }
    return count;
}`,
            notes: []
        },
        {
            heading: 'Solution Two',
            discuss: 'The second is to split one string into an array of chars, then use the array iterator method filter() to test for equality, which we can use to generate an array of non-matching chars, then we return the length of the array.',
            code: `function altHammingDistance(strArr) {
    var word1Arr = strArr[0].split('');
    var word2 = strArr[1];
    return word1Arr.filter(function(val, ind) {
        return val !== word2[ind];
    }).length;
}`,
            notes: []
        }
        ]
    },

    easy035: {
        title: 'Problem 35',
        heading: 'Calculate the Area of a Rectangle',
        description: 'Using the JavaScript language, have the function RectangleArea(strArr) take the array of strings stored in strArr, which will only contain 4 elements and be in the form (x y) where x and y are both integers, and return the area of the rectangle formed by the 4 points on a Cartesian grid. The 4 elements will be in arbitrary order. For example: if strArr is ["(-10 0)", "(-3 0)", "(-10 2)", "(-3 2)"] then your program should return 6 because the width of the rectangle is 3 and the height is 2 and the area of a rectangle is equal to the width * height.',
        comment: null,
        solutions: [{
            heading: null,
            discuss: null,
            code: `
function RectangleArea(strArr) {
    var obj = {};
    obj.x1 = parseInt(strArr[0].match(/\((\-*\d+)/)[1], 10);
    obj.y1 = parseInt(strArr[0].match(/(\-*\d+)\)/)[1], 10);

    for (var i = 1; i < 3; i++) {
        if (obj.x1 !== parseInt(strArr[i].match(/\((\-*\d+)/)[1], 10)) {
            obj.x2 = parseInt(strArr[i].match(/\((\-*\d+)/)[1], 10);
        }
        if (obj.y1 !== parseInt(strArr[i].match(/(\-*\d+)\)/)[1], 10)) {
            obj.y2 = parseInt(strArr[i].match(/(\-*\d+)\)/)[1], 10);
        }
    }
    if (Object.keys(obj).length !== 4) {
        return 0;
    } else {
        return (Math.abs(obj.x1 - obj.x2) * Math.abs(obj.y1 - obj.y2));
    }
}`,
            notes: []
        }]
    }
}
