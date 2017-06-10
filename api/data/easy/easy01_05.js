'use strict';

module.exports =  {
    easy001: {
            title: 'Problem 1',
            heading: 'Reverse a String',
            description: 'Create a function, FirstReverse(str), that takes a string parameter ("str") being passed and returns the string in reversed order.',
            comment: 'This problem has two frequently used solutions, and each is demonstrated below.',
            solutions: [{
                heading: 'Solution One: Recompose the String One Letter at a Time',
                discuss: 'This is the most straightforward way.  It consists of creating an empty string, going through the original string from back to front, and adding each letter to the new string.',
                code: `
function FirstReverse(str) {
    //See Note 1
    var len = str.length;

    //See Note 2
    var newstr = '';

    //See Note 3
    for(var i = len - 1; i >= 0; i--) {
        newstr += str[i]
    }
        return newstr
}`,
                notes: ['Set up a variable to hold the length of the string. This prevents our for loop from having to recalculate the string length each cycle.',
                        'Set up a variable to hold the new string as it is composed, which will be the original in reverse order',
                        'Iterate through the original string, starting at the end, and build up the new string by adding each previous letter (Note for novices: the "x += [something]" operator is simply a shorthand for "x = x + [something]"'
                ]
            }, {
                heading: 'Solution Two: Use JavaScript\'s Aray.prototype.reverse() method',
                discuss: 'This takes advantage of a few of JavaScript\'s built-in methods to convert the original string into an array, reverse the order of the elements in the array, and then convert the array elements back into a string.',
                code: `
    function FirstReverse(str) {
        //See Note 1
        var arr = str.split('');

        //See Note 2
        arr.reverse();


        //See Note 3
        return arr.join('');
    }`,
                notes: ['The <b>split()</b> method splits a given string into pieces that are elements of an array.  It takes a single parameter, the value used to separate the portions.  If the separator value is an empty string, then each character will be an element of the array.',
                        'The <b>reverse()</b> method reverses the order of the elements in an array. Note that it does this on the array itself; there is no need to capture the reversed array in a variable, although the method does return the array, as reversed.',
                        'The <b>join()</b> method works to concatenate the elements in an array into a string. The parameter is the value used to go between each element, \'\' will join the elements directly together.'
                        ]

            }
        ]
    },

    easy002: {
        title: 'Problem 2',
        heading: 'Return the Factorial of a Given Number',
        description: 'Create a function, FirstFactorial(num), which will take the given integer parameter (num), and return the factorial of it (i.e., if num = 4, return 24 (4 * 3 * 2 * 1)).  Note: the domain of the function will be positive numbers only (i.e., ignore the case 0! = 1).',
        comment: 'Two solutions are presented below, the first iterative and the second recursive.  Also, note that each solution makes the assumption that the input will be valid; i.e., there is no validation of input. This would be extremely foolhardy in the real world.',
        solutions: [
            {
                heading: 'Solution One: Multiply Over a Decreasing Loop',
                discuss: 'This solution employs a simple loop to multiply the first integer by the one below it, and repeat until the iterator ("i") reaches 1.',
                code: `
function FirstFactorialIter(num) {

    for(var i = num - 1; i >= 1; i--) {
        //see Note 1
        num *= i;
    }
    return num
}`,
                notes: ['+= is an assignment operator that first carries out the multiplication operation.  x *= 2 is the same as x = x * 2.']
            },
            {
                heading: 'Solution Two: Recursion',
                discuss: 'Recursion involves a function calling itself. In this simple case, the factorial of a number x is equal to x times the factorial of the next integer below it. The key is to deal with the base case (here, x = 1). Otherwise, the function will continue to call itself until it has used up all available  memory.',
                code: `
function FirstFactorialRec(num) {
    //See note 1
    if(num === 1) {
        return 1
    }
    //See note 2
    return num * FirstFactorialRec(num - 1);
}`,
                notes: [
                    'Set up the floor case of num = 1.',
                    'Recast the problem for any other positive integer num.']
            }
        ]
    },

    easy003: {
        title: 'Problem 3',
        heading: 'Find the Longest Word in a String',
        description: 'Create a function, LongestWord(sen), which will take a string input (\'sen\') and return the longest word in the string. If there are two or more words that are the same length, return the first word from the string with that length. Ignore punctuation and assume the input will not be empty.',
        comment: null,
        solutions: [{
            heading: null,
            discuss: null,
            code: `
function LongestWord(sen) {
    //See Note 1
    sen = sen.trim();

    //See Note 2
    sen = sen.replace(/[^\w\s]/g,"");

    //See Note 3
    var arr = sen.split(' ');

    //See Note 4
    arr.sort(function(a, b){
        return b.length - a.length
        })

    //See Note 5
    var ans = arr.shift()

  return ans;
}`,
            notes: [
                'remove any whitespace preceding or following the string',
                'remove any punctuation marks from the string, replacing them with nothing. If you are not familiar with regular expressions, this is an example of how convenient they are, as without them we would have to loop through each character in the string, checking its ASCII value. A thorough discussion of regular expressions may be found <a href="/regex">here</a>.',
                'Now we have a string consisting of letters and spaces.  Put them in an array, separating by the spaces.',
                'use the sort method on the array to sort the words by length, with the longest words first.  Also, in sorting, ties will leave the words in the same order they began.',
                'create a variable ans to hold the return value of the shift method on the array, i.e., the first word in the array.'
                ]
        }]
    },

    easy004: {
        title: 'Problem 4',
        heading: 'Replace Characters in a String',
        description: 'Create a function, LetterChanges(str) to take a string parameter and modify it using the following algorithm. Replace every letter in the string with the letter following it in the alphabet (ie. c becomes d, z becomes a). Then capitalize every vowel in this new string (a, e, i, o, u) and finally return this modified string.',
        comment: 'The solution of this problem is a simple example of an approach generally taken in these problems, to break the problem down into a number of simple \"helper functions\", which are then called by the main function to solve the problem.',
        solutions: [{
            heading: null,
            discuss: null,
            code: `
'use strict';

function LetterChanges(str) {

    return capitalizer(shifter(prepare(str)));

}

//-----------------------Helper Functions---------------------------------

//See Note 1
let prepare = function(str){
    return str.trim().toLowerCase();
}.bind(null);

//See Note 2
let shifter = function(str) {
    let newStr = '';
    for(var i = 0, len = str.length; i < len; i++) {
        newStr += /[a-z]/.test(str.charAt(i)) ? String.fromCharCode(((str.charCodeAt(i) - 18) % 26) + 97) : str.charAt(i);
    }
    return newStr;
}.bind(null);

//See Note 3
let capitalizer = function(str) {
    return str.replace(/[aeiou]/g, val => val.toUpperCase());
}.bind(null);
`,
            notes: ['The prepare() method takes a string, whacks off any front and trailing whitespace, and puts everything in lowercase.',
                    'The shifter() method checks each character in the string and, if it is a letter, shifts it by one value (a -> b, b -> c, etc.).  The modulo function is used to shift z to a.',
                    'The capitalizer() method examines the input string for vowels and capitalizes them. One interesting thing to note is the replace() method, which not only provides very powerful replacement values in the form of $-escaped values, but allows a callback function for the second parameter, so that one can operate on these values.'
            ]
        }]
    },

    easy005: {
        title: 'Problem 5',
        heading: 'Add All Integers from One',
        description: 'Create a function SimpleAdding(num) to add up all the integers from 1 to the given parameter (num), inclusive.',
        comment: 'Below are three solutions to this problem: the first is iterative, the second is recursive, and the third is clever.',
        solutions: [{
            heading: 'Solution One: Loop Through the Numbers and Keep Count',
            discuss: 'This is the most straightforward solution, employing a simple "for" loop.',
            code: `
function SimpleAddingIt(num) {
    var count = 0;
    for (var i = 1; i <= num; i++) {
        count += i;
    }
    return count;
}`,
            notes: []
        },
        {
            heading: 'Solution Two: Recursive',
            discuss: 'See Problem 2 for a discussion of recursive functions',
            code: `
function SimpleAdding(num) {
  if (num === 1) {
    return 1;
  }
  else {
    return num + SimpleAdding(num - 1);
  }
}`,
            notes: []
        },
        {
            heading: 'Solution Three: Clever Solution Using Algebraic Manipulation',
            discuss: 'This solution is attributed to a very young Carl Friedrich Gauss.  Take the series, write it backwards, and add the two together, then divide by two. For example, 1 + 2 + 3 is the same as 3 + 2 + 1.  Adding the two together, we get 4 + 4 + 4 or, in other words, our argument (\'x\') plus one, repeated x times. Divide that by 2 to get the answer!',
            code: `
function SimpleAdding(num) {
    return num * (num + 1) / 2;
}`,
            notes: []
        }]
    }

}
