'use strict';

module.exports = {
    med001: {
        title: 'Medium 1',
        heading: 'Determine if a Number is Prime',
        description: 'Have the function PrimeTime(num) take the num parameter being passed and return the string true if the parameter is a prime number, otherwise return the string false. The range will be between 1 and 2^16.',
        comment: 'Although listed as the first of the "medium difficulty" problems on Coderbytes, this actually has a rather simple, if inelegant, solution. Of course, that is the usefulness of prime numbers, i.e., the only way to know if they are is to see if they will factor, and the only way to do that is to just keep trying it out.',
        solutions: [{
            heading: null,
            discuss: null,
            code: `
function PrimeTime(num) {
    var hinge = Math.floor(Math.sqrt(num));
    var i = 2;
    var test = true;

    //See Note 1
    if (num === 1) {
        return false
    }
    else if (num === 2) {
        return true
    }
    //See Note 2
    else {
        while (i <= hinge && test === true) {
            if (num % i !== 0) {
                i++;
            }
            else {
                test = false;
            }
        }
        return test
    }
}`,
            notes: [
                'Hardcoding correct answers for 1 and 2.',
                'Run a loop to see if the number has any integral factors (aside from 1)'
            ]
        }]
    },

    med002: {
        title: 'Medium 2',
        heading: 'Encode a String',
        description: 'Create a function RunLength(str) to take the string parameter (str) passed and return a compressed version of the string using the Run-length encoding algorithm. This algorithm works by taking the occurrence of each repeating character and outputting that number along with a single character of the repeating sequence. For example: "wwwggopp" would return 3w2g1o2p. The string will not contain any numbers, punctuation, or symbols.',
        comment: null,
        solutions: [{
            heading: null,
            discuss: null,
            code: `
function RunLength(str) {
    strArr = str.split("");
    len = strArr.length;
    //See Note 1
    resultArr = [];

    //See Note 2
    counter = 1;
    for (var i = 0; i < len; i++) {
        if (strArr[i] === strArr[i+1]){
            counter++;
        }
        else {
            //See Note 3
            var entry = counter + strArr[i];
            resultArr.push(entry);
            //See Note 4
            counter = 1;
        }
    }
    return resultArr.join('')
}`,
            notes: [
                'Set up a place to put my results as they are determined.',
                'Traverse array and find repeating strings, then place into <i>resultArr</i>',
                'Rely on javascript\'s typing of counter to a string in order to concatenate with +',
                'Reset the counter, and go at it again.'
            ]
        }]
    },

    med003: {
        title: 'Medium 3',
        heading: 'Find the Nth Prime Number',
        description: 'Create a function, PrimeMover(num), that will take an integer parameter (num) and return the numth prime number. The range will be from 1 to 10^4. For example: if num is 16 the output should be 53 as 53 is the 16th prime number.',
        comment: null,
        solutions: [{
            heading: null,
            discuss: null,
            code: `
function PrimeMover(num) {
    var counter = 0;
    var testNum = 0;

    //See Note 1
    while (counter < num) {
        if (primeTest(testNum + 1)) {
            counter++;
        }
        testNum++;
    }
    return testNum

    //See Note 2
    function primeTest(int) {
        if (int === 1) {
            return false
        }
        else if (int === 2) {
            return true
        }
        else {
            var i = 2;
            var pivot = Math.ceil(Math.sqrt(int));
            while (i <= pivot) {
                if (int % i === 0) {
                    return false
                }
                i++;
            }
            return true
        }
    }
}`,
            notes: [
                'Loop through integers, beginning at 1 and keeping count of how many return true when sent to the primeTest() function.',
                'Create a simple function to call, which will return true if a number is prime.'
            ]
        }]
    },

    med004: {
        title: 'Medium 4',
        heading: 'Test for Palindrome (Exclude Punctuation)',
        description: 'Create a function PalindromeTwo(str) to take a string parameter being passed to it (str) and return true if the parameter is a palindrome, (the string is the same forward as it is backward) otherwise return the string false. The argument may have punctuation and symbols but they should not affect whether the string is in fact a palindrome. For example: "Anne, I vote more cars race Rome-to-Vienna" should return true.',
        comment: null,
        solutions: [{
            heading: null,
            discuss: null,
            code: `
function PalindromeTwo(str) {
    //See Note 1
    var str = str.toLowerCase();
    str = str.replace(/[^A-Za-z\d]/g, '');

    //See Note 2
    var len = str.length;
    var pivot = Math.ceil(str.length / 2);

    //See Note 3
    for(var i = 0; i < pivot; i++) {
        if (str[i] != str[len - 1 - i]) {
            return false
        }
    }
    return true
}`,
            notes: [
                'First, prepare the string by putting in lower case and removing nonletters (or numbers).',
                'Second, declare to variables to help in a matching loop, to prevent the need for evaluation on each iteration.',
                'Finally, run a simple loop matching letters from outside-in.'
            ]
        }]
    },

    med005: {
        title: 'Medium 5',
        heading: 'Find the Greatest Common Denominator',
        description: 'Create a function Division(num1,num2) to take two number parameters being passed to it (num1, num2) and return their Greatest Common Factor. That is, return the greatest number that evenly divides both numbers with no remainder. For example: 12 and 16 both are divisible by 1, 2, and 4 so the output should be 4. The range for both parameters will be from 1 to 10^3.',
        comment: null,
        solutions: [{
            heading: 'Solution 1',
            discuss: 'easiest solution - very straightforward',
            code: `
function Division(num1, num2) {
    var bigNum = Math.max(num1, num2);
    var smallNum = Math.min(num1, num2);

    for (var i = 1; i <= smallNum; i++) {
        if (bigNum % i === 0 && smallNum % i === 0) {
            var maxi = i;
        }
    }
    return maxi;
}`,
            notes: []
        },
        {
            heading: 'Solution 2',
            discuss: 'the following solution should be a bit more efficient, as it does not require evalution on each integer for the bigNum modulus',
            code: `function Division2(num1, num2) {
    var bigNum = Math.max(num1, num2);
    var smallNum = Math.min(num1, num2);
    var pivot = Math.ceil(Math.sqrt(smallNum));
    var factorArr = [];

    //See Note 1

    for (var i = pivot; i > 0; i--) {
        if (smallNum % i === 0) {
            factorArr.push(i);
            factorArr.unshift(smallNum / i);
        }
    }
    //See Note 2
    for (var j = 0, len = factorArr.length; j < len; j++) {
        if (bigNum % factorArr[j] === 0) {
            return factorArr[j]
        }
    }
}`,
            notes: [
                'Limit the for loop to the square root (pivot) of the smaller number to avoid unnecessary computations. Create an ordered array of factors of the smaller number.',
                'Go through the array of smaller number factors in descending order, and return the first one that is a factor of the larger number.'
            ]
        }]
    }
}
