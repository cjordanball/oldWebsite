'use strict';

module.exports =  {
    easy006: {
        title: 'Problem 6',
        heading: 'Capitalize the First Letter of Each Word',
        description: 'Create a function LetterCapitalize(str) to take the str parameter being passed and capitalize the first letter of each word. Words will be separated by only one space.',
        comment: null,
        solutions: [{
            heading: null,
            discuss: null,
            code: `
function LetterCapitalize(str) {
    //See Note 1
    var wordArr = str.trim().split(" ");

    //See Note 2
    return wordArr.map(val => initCap(val)).join(" ");
}

//-------------Helper Methods-------------

var initCap = function(str) {
    //See Note 3
    if (/[a-zA-Z]/.test(str[0])) {
        return str.replace(/\\w/, match => match.toUpperCase());
    } else {
        return null
    }
}.bind(null)`,
            notes: ['To begin, we remove any leading or trailing whitespace with trim(), then split the string into an array of words, based on the single space separation given.',
                    'We use map to replace each word with its capitalized version, using the initCap() helper. Then join the array back into a string.',
                    'In these problems, we are using reliable input, so we often skip validation. As an illustration, this method performs a bit of validation to check if the word begins with a letter.'
                    ]
        }]
    },

    easy007: {
        title: 'Problem 7',
        heading: 'Determine Whether a String Has Qualifying Content',
        description: 'Create a function SimpleSymbols(str) to take the str parameter being passed and determine if it is an acceptable sequence by either returning true or false. The str parameter will be composed of + and = symbols with several letters between them (ie. ++d+===+c++==a) and for the string to be true each letter must be surrounded by a + symbol. So the string to the left would be false. The string will not be empty and will have at least one letter.',
        comment: 'This problem is a good example of how regular expressions can make life much easier.  Without them, the syntax of the solution would be considerably more involved and error prone.  Of course, one must keep in mind that regular expressions are often much easier to write than to read, and consider whether a developer reviewing the code will be able to easily follow what it intended. Usually, a regular expression is a good place for an explanatory comment.',
        solutions: [{
            heading: null,
            discuss: null,
            code: `
'use strict';

function SimpleSymbols(str) {
    //See Note 1'

    let regExArr = [/^[a-zA-Z]/, /[a-zA-Z]$/, /[^\+][a-zA-Z]/, /[a-zA-Z][^\+]/];

    return !regExArr.some(val => val.test(str));

}`,
            notes: ['The array of regular expressions do the following: i) check to see if the string begins with a letter, ii) check to see if the string ends with a letter, iii) check to see if there are any intances of a letter preceded by anything other than a +, iv) check to see if there are any instances of a letter followed by anything other than a +. If any of those is the case, the some() method would return true, and false if all of them fail. Thus, we simply return the opposite of that output, using the ! (not) operator.']
        }]
    },

    easy008: {
        title: 'Problem 8',
        heading: 'Evaluate Number Sizes',
        description: 'Have the function CheckNums(num1, num2) take both parameters being passed and return true if num2 is greater than num1, otherwise return the false. If the parameter values are equal to each other then return the string -1.',
        comment: 'The following solution is a good example of the ternary operator, which begins with a statement followed by a question mark, which is followed by two alternate values, separated by a colon. If the initial statement evaluates to truthy, then the first value is returned; if falsey, then the second value is returned.  Thus, in the following case, if the two numbers are equal it returns the value "-1", and if they are not equal, it evaluates the final expression and returns what it evaluates to, which will be true or false.',
        solutions: [{
            heading: null,
            discuss: null,
            code: `
function CheckNums(num1, num2) {
    return num1 === num2 ? '-1' : num2 > num1;
}`,
            notes: []
        }]
    },

    easy009: {
        title: 'Problem 9',
        heading: 'Convert Number of Minutes to Hours and Minutes',
        description: 'Create a function TimeConvert(num) to take the number parameter being passed and return the number of hours and minutes to which the parameter converts (ie. if num = 63 then the output should be 1:3). Separate the number of hours and minutes with a colon.',
        comment: 'Of course, this is such a simple problem that there is hardly anything of note to it. Those unfamiliar with JavaScript might wish to note that the use of the toString() method is not really necessary, as JavaScript will change the numbers into strings when concatenating to a string, but I prefer making things explicit.',
        solutions: [{
            heading: null,
            discuss: null,
            code: `
function TimeConvert(num) {
    return Math.floor(num / 60).toString() + ":" + (num % 60).toString();
}`,
            notes: []
        }]
    },

    easy010: {
        title: 'Problem 10',
        heading: 'Sort the Letters in a String',
        description: 'Create a function AlphabetSoup(str) to take a string parameter being passed to it and return the string with the letters in alphabetical order (i.e., "hello" becomes "ehllo"). Assume numbers and punctuation symbols will not be included in the string.',
        comment: 'A trivial problem, assuming one is allowed to use the built in array sort method.  Otherwise, one could code the sorting process, using the algorithm of one\'s choice. For an example of an efficient sorter, see the second problem under the Misc tab.',
        solutions: [{
            heading: null,
            discuss: null,
            code: `
function AlphabetSoup(str) {
    var newStr = str.split('').sort().join('');

    return newStr;
}`,
            notes: []
        }]
    },
}
