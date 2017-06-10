'use strict';

module.exports = {
    easy026: {
        title: 'Problem 26',
        heading: 'Find the Third Longest String in an Array',
        description: 'Create a function ThirdGreatest(strArr) to take an array of strings, strArr, and return the third largest word within it. So for example: if strArr is ["hello", "world", "before", "all"] your output should be world because "before" is 6 letters long, and "hello" and "world" are both 5, but the output should be world because it appeared as the last 5 letter word in the array. If strArr was ["hello", "world", "after", "all"] the output should be after because the first three words are all 5 letters long, so return the last one. The array will have at least three strings and each string will only contain letters.',
        comment: null,
        solutions: [{
            heading: null,
            discuss: null,
            code: `
function ThirdGreatest(strArr) {
    //See Note 1
    strArr.sort(function(a, b) {return b.length - a.length});
    //See Note 2
    var len = strArr[2].length;
    //See Note 3
    strArr = strArr.filter(function(val) {
        return (val.length === len);
    });
    //See Note 4
    return strArr.pop()
}`,
            notes: [
                'Sort the array based on length of the strings',
                'Save the length of the third longest string in the variable len',
                'Remove all items in the array of different length',
                'Return the last item of the array'
            ]
        }]
    },

    easy027: {
        title: 'Problem 27',
        heading: 'Identify a Power of Two',
        description: 'Create a function PowersofTwo(num) to take a number parameter (num), which will be an integer, and return true if it is a positive, integral power of two. If not, return false. For example if the input is 16 then your program should return true but if the input is 22 then the output should be false.',
        comment: null,
        solutions: [{
            heading: null,
            discuss: null,
            code: `
function PowersofTwo(num) {

    //See Note 1
    if (num < 2) {
        ans = false
    }
//See Note 2
    num = num.toString(2);
    regEx = /^10+$/;
    return (regEx.test(num))
}`,
            notes: [
                'Deal with powers less than 1.',
                'Convert the number to a string in binary form, then test to see if it is of the form of 1 followed only by 0s.'
            ]
        }]
    },

    easy028: {
        title: 'Problem 28',
        heading: 'Compute Additive Persistence of an Integer',
        description: 'Create a function AdditivePersistence(num) to take the number parameter (num) being passed to it (and which will always be a positive integer) and return its additive persistence, which is the number of times you must add the digits in num until you reach a single digit. For example: if num is 2718 then your program should return 2 because 2 + 7 + 1 + 8 = 18 and 1 + 8 = 9 and you stop at 9.',
        comment: null,
        solutions: [{
            heading: null,
            discuss: null,
            code: `
function AdditivePersistence(num) {
    //See Note 1
    function arrPrep(numb) {
        var numStr = numb.toString();
        var arr = numStr.split('');
        var numArr = arr.map(function(val) {
            return parseInt(val)
        })
        return numArr
    }
    //See Note 2
    function addUp(arr) {
        var redux = arr.reduce(function(a, b){
            return a + b;
        })
        return redux
    }
    //See Note 3
    var count = 0;
    while (num > 9) {
        num = addUp(arrPrep(num));
        count++;
    }
    return count
}`,
            notes: [
                'The function arrPrep takes a number and splits it into an array of its digits.',
                'The function addUp sums the array elements generated by the arrPrep function.',
                'When there is more than one digit in the number, generate the digit array and then sum the digits.  Count the iterations.'
            ]
        }]
    },

    easy029: {
        title: 'Problem 29',
        heading: 'Compute Multiplicative Persistence of an Integer',
        description: 'Create a function MultiplicativePersistence(num) to take a number parameter (num), which will always be a positive integer, and return its multiplicative persistence, which is the number of times you must multiply the digits in num until you reach a single digit. For example: if num is 39 then your program should return 3 because 3 * 9 = 27 then 2 * 7 = 14 and finally 1 * 4 = 4 and you stop at 4.',
        comment: null,
        solutions: [{
            heading: null,
            discuss: null,
            code: `
function MultiplicativePersistence(num) {
    //See Note 1
    function numPrep(num) {
        var strNum = num.toString();
        var numArr = strNum.split('');
        numArr = numArr.map(function(val) {
            return parseInt(val)
        });
    return numArr
    }

    //See Note 2
    function multNums(arr) {
        var newNum = arr.reduce(function(a, b) {
            return a * b
        })
        return newNum
    }

    var count = 0;
    //See Note 3
    while (num > 9) {
        num = multNums(numPrep(num));
        count++;
    }
    return count
}`,
            notes: [
                'This function takes a number and preps it to an array of digits',
                'This function performs the multiplication reduction on the array of digits',
                'Run a while loop and run the numPrep and multNums until it is reduced to a single digit'
            ]
        }]
    },

    easy030: {
        title: 'Problem 30',
        heading: 'Create a Subset of Numbers in an Array',
        description: 'Using the JavaScript language, create a function OffLineMinimum(strArr) that takes an array of integer strings ranging from ranging from 1...n and the letter "E" and returns the correct subset based on the following rules. The input will be in the following format: ["I","I","E","I",...,"E",...,"I"] where the I\'s stand for integers and the E means take out the smallest integer currently in the whole set. When finished, your program should return that new set with integers separated by commas. For example: if strArr is ["5","4","6","E","1","7","E","E","3","2"] then your program should return 4,1,5.',
        comment: 'This is a somewhat tricky problem description, so it helps a lot to read the example closely and outline what to do.',
        solutions: [{
            heading: null,
            discuss: null,
            code: `
function OffLineMinimum(strArr) {
    var count = 0;
    var holdingArr = [];
    var ansArr = [];
    //See Note 1
    if (strArr[0] === 'E') {
        var flag = 1;
    }
    //See Note 2
    while (strArr.indexOf("E") != -1) {
        if (strArr[count] === "E") {
            //See Note 3
            var headArr = strArr.splice(0, count);
            //See Note 4
            strArr.shift();
            //See Note 5
            holdingArr = holdingArr.concat(headArr);
            //See Note 6
            holdingArr.sort(function(a, b) {return a - b})
            ansArr.push(holdingArr.shift());
            //See Note 7
            count = 0;
        }
        else {
            count++;
        }
    }
    //See Note 8
    return flag? ansArr.join(',').slice(1) : ansArr.join(',');
}`,
            notes: [
                'test for special case of starting with E, for formatting final return answer',
                'Set up a while loop to run until we run out of Es.',
                'Move any portion before an E to the holdingArr.',
                'Getting rid of the E along the way.',
                '<b>NOTE</b>: Unlike most array methods, concat() does not have a side effect on the object array on which it is called.',
                'Sort and remove the smallest item and place into the ansArr.',
                'Reset the count.',
                'If ansArr started with E, there will be a preceding comma to get rid of.'
            ]
        }]
    }
}
