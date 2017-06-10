'use strict'

module.exports = {

    hard041: {
        title: 'Difficult 41',
        heading: 'Evaluate a Boolean',
        description: 'Using the JavaScript language, have the function SimpleSAT(str) read str which will be a string consisting of letters, parenthesis, logical operators and tilde\'s representing a Boolean formula. For example: str may be "(a&b)|c" which means (a AND b) OR c. Your program should output the string "yes" if there is some arrangement of replacing the letters with TRUE or FALSE in such a way that the formula equates to TRUE. If there is no possible way of assigning TRUE or FALSE to the letters, then your program should output the string "no". In the example above, your program would return yes because a=TRUE, b=TRUE and c=FALSE would make the formula TRUE. Another example: if str is "((a&c)&~a)" which means ((a AND c) AND NOT a) then your program should output no because it is not possible to assign TRUE or FALSE values to the letters to produce a TRUE output.  A Boolean formula will always have at most 5 letters, i.e. a, b, c, d and e. A tilde will never appear outside of a parenthesis, i.e. ~(a&b).',
        comment: null,
        solutions: [{
            heading: null,
            discuss: null,
            code: `
function SimpleSAT(str) {
    var newStr = str.replace (/\&/g, ' && ')
                    .replace (/\|/g, ' || ')
                    .replace (/\~/g, ' !')
                    .replace (/\s\s/g, ' ');

    const matches = (uniq(newStr.match(/\w/g)));
    var matchlen = matches.length;
    var permArray = permuationGenerator(matches.length);
    const len = permArray.length;

    for (var i = 0; i < len; i++) {
        var testStr = newStr;
        for (var j = 0; j < matchlen; j ++) {
            var regExPre = matches[j] + '(?![a-z])';
            var regEx = new RegExp(regExPre, 'g');
            testStr = testStr.replace(regEx, permArray[i][j]);
        }
        if (eval(testStr)) return 'yes';
    }
    return 'no';
}


//-----------------------------helpers--------------------------

function uniq(arr) {
    var holdObj = {};
    arr.forEach(function(val) {
        holdObj[val] = 0;
    });
    return Object.keys(holdObj);
}

function permuationGenerator(num) {
    var arr = [];
    for (var i = Math.pow(2, num); i < Math.pow(2, num + 1); i++) {
        arr.push(i.toString(2))
    }
    arr = arr.map(function(val) {
        val = val.slice(1);
        valArr = val.split('');
        valArr = valArr.map(function(num) {
            return num === '0' ? 'false' : 'true';
        })
        return valArr;
    });
    return arr;
}`,
            notes: []
        }]
    },

    hard042: {
        title: 'Difficult 42',
        heading: 'Find the Reversed Number Pairs',
        description: 'Using the JavaScript language, have the function ArrayCouples(arr) take the arr parameter being passed which will be an array of an even number of positive integers, and determine if each pair of integers, [k, k+1], [k+2, k+3], etc. in the array has a corresponding reversed pair somewhere else in the array. For example: if arr is [4, 5, 1, 4, 5, 4, 4, 1] then your program should output the string yes because the first pair 4, 5 has the reversed pair 5, 4 in the array, and the next pair, 1, 4 has the reversed pair 4, 1 in the array as well. But if the array doesn\'t contain all pairs with their reversed pairs, then your program should output a string of the integer pairs that are incorrect, in the order that they appear in the array.  For example: if arr is [6, 2, 2, 6, 5, 14, 14, 1] then your program should output the string 5,14,14,1 with only a comma separating the integers.',
        comment: null,
        solutions: [{
            heading: null,
            discuss: null,
            code: `
function ArrayCouples(arr) {
    var ansArray = [];
    var ourArray = arr.slice();
    while (typeof ourArray[0] === 'number') {
        var holder = ourArray.splice(0, 2);
        ourArray.push(holder)
    }
    ourArray.forEach(function(val, ind) {
        var valCopy = val.slice();
        var lav = valCopy.reverse();
        if (ourArray.some(function(val2, ind2) {
            return (equiArray(lav, val2) && ind !== ind2);
        })) {
        } else {
            ansArray.push(val);
        }
    })

    return ansArray.length === 0 ? 'yes' : ansArray.join(',');

}



//-----------------------------helpers--------------------------
function equiArray(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false;
    } else {
        var len = arr1.length;
        for(var i = 0; i < len; i++) {
            if (arr1[i] !== arr2[i]) {
                return false;
            }
        }
        return true;
    }
}`,
            notes: []
        }]
    },

    hard043: {
        title: 'Difficult 43',
        heading: 'Count the Valid Bracket Sequences',
        description: 'Using the JavaScript language, have the function BracketCombinations(num) read num which will be an integer greater than or equal to zero, and return the number of valid combinations that can be formed with num pairs of parentheses. For example, if the input is 3, then the possible combinations of 3 pairs of parenthesis, namely: ()()(), are ()()(), ()(()), (())(), ((())), and (()()). There are 5 total combinations when the input is 3, so your program should return 5.',
        comment: null,
        solutions: [{
            heading: null,
            discuss: null,
            code: `
function BracketCombinations(num) {
    if (!num) {
        return 1;
    }
    var totalLength = num * 2;
    var maxNum = Math.pow(2, totalLength);
    var fullArr = [];
    for (var i = maxNum / 2; i < maxNum; i++) {
        fullArr.push(i.toString(2));
    }
    fullArr = fullArr.filter(function(val) {
        val = val.replace(/1/g, '\(')
            .replace(/0/g, '\)')
        var valArr = val.split('');
        return evaluator(valArr);

    });
    return fullArr.length;

}

//See Note 1
function evaluator(arr) {
    var count = 0;
    var ind = 0;
    var len = arr.length;

    while (ind < len) {
        if (arr[ind] === '(') {
            count++;
        } else {
            count--;
        }
        if (count < 0) {
            return false;
        }
        ind++
    }
    return !count ? true : false;
}`,
            notes: [
                'This method takes an array of "(" and ")" and determines whether they could be a bracket sequence'
            ]
        }]
    },

    hard044: {
        title: 'Difficult 44',
        heading: 'Count the Anagram Pairs in a Sentence',
        description: 'Using the JavaScript language, have the function CountingAnagrams(str) take the str parameter and determine how many anagrams exist in the string. An anagram is a new word that is produced from rearranging the characters in a different word, for example: cars and arcs are anagrams. Your program should determine how many anagrams exist in a given string and return the total number. For example: if str is "cars are very cool so are arcs and my os" then your program should return 2 because "cars" and "arcs" form 1 anagram and "so" and "os" form a 2nd anagram. The word "are" occurs twice in the string but it isn\'t an anagram because it is the same word just repeated. The string will contain only spaces and lowercase letters, no punctuation, numbers, or uppercase letters.',
        comment: null,
        solutions: [{
            heading: null,
            discuss: null,
            code: `
function CountingAnagrams(str) {
    var count = 0;
    var str = str.replace(/\s{2,}/g, ' ');
    var strArray = str.split(' ');
    strArray = uniqArr(strArray).map(function(val) {
        return scramble(val);
    }).sort();

    strArray.forEach(function(val, ind) {
        if (val === strArray[ind+1]) {
            count++;
        }
    });

    return count;

}

function uniqArr(arr) {
    var holdObj = {};
    arr.forEach(function(val) {
        if (!holdObj[val]) {
            holdObj[val] = 0;
        }
    });
    return Object.keys(holdObj);
}

function scramble(str) {
    var arr = str.split('').sort();
    return arr.join('');
}`,
            notes: []
        }]
    },

    hard045: {
        title: 'Difficult 45',
        heading: 'Rotate the Array',
        description: 'Using the JavaScript language, have the function ArrayRotation(arr) take the arr parameter being passed which will be an array of non-negative integers and circularly rotate the array starting from the Nth element where N is equal to the first integer in the array. For example: if arr is [2, 3, 4, 1, 6, 10] then your program should rotate the array starting from the 2nd position because the first element in the array is 2. The final array will therefore be [4, 1, 6, 10, 2, 3], and your program should return the new array as a string, so for this example your program would return 4161023. The first element in the array will always be an integer greater than or equal to 0 and less than the size of the array',
        comment: null,
        solutions: [{
            heading: null,
            discuss: null,
            code: `
function ArrayRotation(arr) {
    var pivot = arr[0];
    var part1 = arr.splice(0, pivot);
    return arr.concat(part1).join('');
}`,
            notes: []
        }]
    }
}
