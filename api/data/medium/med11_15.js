'use strict';

module.exports = {
    med011: {
        title: 'Medium 11',
        heading: 'Create a Caeser Cipher',
        description: 'Create a function, CaesarCipher(str, num), to take a string argument (str) and perform a Caesar Cipher shift on it using a number argument (num) as the shifting number. A Caesar Cipher works by shifting each letter in the string N places down in the alphabet (in this case N will be num). Punctuation, spaces, and capitalization should remain intact. For example if the string is "Caesar Cipher" and num is 2 the output should be "Ecguct Ekrjgt".',
        comment: null,
        solutions: [{
            heading: null,
            discuss: null,
            code: `
function CaesarCipher(str,num) {
    //See Note 1
    var arr = str.split("");
    //See Noe 2
    arr = arr.map(function(val) {
        //if uppercase
        if (/[A-Z]/.test(val)) {
            return Ceasar(65, val);
        }
        //if lowercase
        else if(/[a-z]/.test(val)) {
            return Ceasar(97, val);
        }
        //if not a letter, do not encrypt
        else {
            return val;
        }
    });

    return arr.join('');


    //See Note 3
    function Ceasar (base, char) {
        var charNum = char.charCodeAt(0);
        charNum = charNum - base;
        charNum = charNum + num;
        charNum = charNum % 26;
        charNum = charNum + base;
        return String.fromCharCode(charNum)

    }
}`,
            notes: [
                'Split the string into an array of characters, in order to manipulate them',
                'Traverse the array and apply to each char the Ceasar function.  The first parameter is determined by whether the letter is uppercase (beginning at ASCII 65) or lowercase (beginning at ASCII 97).',
                'The Ceasar() method is the (rather weak) encryption function, which shifts each letter by the number of places given by the num parameter. Because shifts off the end of the alphabet are to come back around to the beginning, we use the modulo operator. Of course, the function could have been written in one big line, but this is easier to decipher.'
            ]
        }]
    },

    med012: {
        title: 'Medium 12',
        heading: 'Determine the Mode of a Group of Numbers',
        description: 'Create a function SimpleMode(arr) to take an array of numbers (arr), and return the number that appears most frequently (the mode). For example: if arr contains [10, 4, 5, 2, 4] the output should be 4. If there is more than one mode, return the one that appeared in the array first (ie. [5, 10, 10, 6, 5] should return 5 because it appeared first). If no number appears more than once, return -1. The array will not be empty.',
        comment: null,
        solutions: [{
            heading: null,
            discuss: null,
            code: `
function SimpleMode(arr) {
    var storeArray = [];
    //for each item in the array
    for (var i = 0, len = arr.length; i < len; i++) {
        //if it hasn't already been counted
        if (arr.indexOf(arr[i]) === i) {
            //count it
            counter = 0;
            for (var j = 0; j < len; j++) {
                if (arr[j] === arr[i]) {
                    counter++;
                }
            }
        //and store the result in storeArray
        storeArray.push([arr[i], counter])
        }
    }
    storeArray.sort(function(a, b) {return b[1] - a[1]});
    //See Note 1
    return (storeArray[0][1] === 1 ? -1 : storeArray[0][0]);
}`,
            notes: [
                'If the most numerous item has a count of 1, return -1, otherwise return the count.'
            ]
        }]
    },

    med013: {
        title: 'Problem 13',
        heading: 'Fill in Holes in an Array',
        description: 'Create a function Consecutive(arr) to take an array of integers passed to it (arr) and return the minimum number of integers needed to make the contents of arr consecutive from the lowest number to the highest number. For example: If arr contains [4, 8, 6] then the output should be 2 because two numbers need to be added to the array (5 and 7) to make it a consecutive array of numbers from 4 to 8. Negative numbers may be entered as parameters and no array will have less than 2 elements.',
        comment: null,
        solutions: [{
            heading: 'Solution 1',
            discuss: 'The following is my original solution, which gets the job done by sorting the array, then iterating through it, taking a count of which integers are not present in the array between the least and greatest.',
            code: `
function Consecutive(arr) {
    arr.sort(function(a, b) {return a - b});
    console.log(arr);
    var len = arr.length;
    var counter = 0;
    //See Note 1
    for (var i = arr[0]; i < arr[len - 1]; i++) {
        if (checker(i)) {
            counter++;
        }
    }
    return counter;

    function checker(int) {
        for (var j = 0; j < len; j++) {
            if (arr[j] < int) {
                continue;
            }
            else if (arr[j] == int) {
                return false;
            }
            else {
              return true;
            }
        }
    }
}`,
            notes: [
                'Loop through all integers between the least and greatest.'
            ]
        },
        {
            heading: 'Solution 2',
            discuss: 'This version was meant to provide a more efficient solution, since it would not require a sorting of the data, which would have a runtime of n(logn), compared with the single pass of the forEach function over the array to obtain the max, min and hash of values (necessary to weed out duplicate values).',
            code: `
function Consecutive(arr) {
    var big = arr[0];
    var small = arr[0];
    var numObject = {};

    arr.forEach(function(val) {
        big = Math.max(big, val);
        small = Math.min(small, val);
        numObject[val] = ''
    })
    //See Note 1
    return (big - small) - (Object.keys(numObject).length - 1)
}`,
            notes: [
                'The number of "fill-ins" necessary will be the difference between the max and the min, less the number of unique items in the array, plus one (to catch the last item).'
            ]
        }]
    },

    med014: {
        title: 'Medium 14',
        heading: 'Format Number as String',
        description: 'Create a function, FormattedDivision(num1, num2), that will take two numbers as parameters (num1 and num2), divide num1 by num2, and return the result as a string with properly formatted commas and 4 significant digits after the decimal place. For example: if num1 is 123456789 and num2 is 10000 the output should be "12,345.6789". The output must contain a number in the one\'s place even if it is a zero.',
        comment: null,
        solutions: [{
            heading: null,
            discuss: null,
            code: `
function FormattedDivision(num1, num2) {
    //See Note 1
    var divisionResult = (num1 / num2).toFixed(4);
    //See Note 2
    var numParts = divisionResult.split('.');
    var intArray = numParts[0].split('');
    var len = intArray.length;
    var intString;

    for (var i = len; i > 0; i--) {
        if (i < (len) && (len - i + 1) % 3 === 1) {
            intArray.splice(i, 0, ',');
            intString = intArray.join('');
        }
        else {
            intString = (intString)? intString : intArray.join('');
        }
    }
    return intString.concat('.', numParts[1]);
}`,
            notes: [
                'This gets most of the problem done in one simple step!',
                'Split the string into an array with two items: integer, decimal'
            ]
        }]
    },

    med015: {
        title: 'Medium 15',
        heading: "Calculate Minutes Between Two Times",
        description: 'Create a function, CountingMinutes(str), which will take a string parameter (str), which will consist of two times (each formatted with a colon and designation of "am" or "pm" and separated by a hyphen) and return the total number of minutes between the two times. The time will be in a 12 hour clock format. For example: if str is 9:00am-10:00am then the output should be 60. If str is 1:00pm-11:00am the output should be 1320.',
        comment: null,
        solutions: [{
            heading: null,
            discuss: null,
            code: `
function CountingMinutes(str) {
    //See Note 1
    var strArray = str.split('-');
    //See Note 2
    strArray = strArray.map(function(val){
        if (val.indexOf('a') !== -1) {
            //get rid of the am/pm
            newVal = val.match(/[\d\:]+/);
            newValArr = newVal[0].split(':');
            minCount = parseInt(newValArr[0] % 12) * 60 + parseInt(newValArr[1]);
            return minCount;
        } else {
            newVal = val.match(/[\d\:]+/);
            newValArr = newVal[0].split(':');
            minCount = (parseInt(newValArr[0] % 12) * 60) + parseInt(newValArr[1]) + 720;
            return minCount;
        }
    })
    //See Note 3
    strArray[1] < strArray[0] ? strArray[1] += 1440 : strArray[1];

    return strArray[1] - strArray[0];
}`,
            notes: [
                'Convert into an array of two time strings.',
                'Convert each of the time strings into a number of minutes, converting into a 24-hr clock, and handling the 12 = 0 problem.',
                'If the second time is earlier than the first time, that means it is in the next day, so we should add 1440 (i.e., 24 * 60) minutes to the second time.'
            ]
        }]
    }
}
