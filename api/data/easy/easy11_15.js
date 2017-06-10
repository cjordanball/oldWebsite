'use strict';

module.exports = {
    easy011: {
        title: 'Problem 11',
        heading: 'Checking for a Pattern in a String',
        description: 'Have the function ABCheck(str) take the str parameter being passed and return the string true if the characters a and b are separated by exactly 3 places anywhere in the string at least once (i.e., "lane borrowed" would result in true because there are exactly three characters between a and b). Otherwise return the string false.',
        comment: 'This problem becomes trivial with the use of regular expressions.  If you are not familiar with this tool, this problem should inspire you to take a few hours and familiarize yourself with them.',
        solutions: [{
            heading: null,
            discuss: null,
            code: `
function ABCheck(str) {
    var patt = /(a...b|b...a)/

    return patt.test(str);
}`,
            notes: []
        }]
    },

    easy012: {
        title: 'Problem 12',
        heading: 'Count the Number of Vowels in a String',
        description: 'Create a function VowelCount(str) to take a string parameter passed to it and return the number of vowels (i.e., "a", "e", "i", "o", "u") the string contains (e.g., "All cows eat grass" would return 5). Do not count y as a vowel for this challenge.',
        comment: 'Another example of how use of regular expressions can make things much simpler.  Alternative solutions not using them are conceptually easy, but much more tedious than the simple solution presented below.',
        solutions: [{
            heading: null,
            discuss: null,
            code: `
function VowelCount(str) {
    var regex = /[aeiou]/gi;
    var arr = str.match(regex);
    //See Note 1
    if (arr) {
        return arr.length;
    }
    else {
        return 0
    }
}`,
            notes: ['For those new to javascript programming, the most interesting feature, aside from the use of regular expressions, is the condition following "if".  Of course, the way the conditional statement works is that if the condition (i.e., what is in the parenthesis) is true, then the statements in the following brackets are run.  Actually, the condition need not be true, but only "truthy."  "Truthy" is most easily defined as anything that does not evaluate to: false, null, undefined, NaN or 0.  Any string (other than the empty string \'\'), for example, will evaluate to truthy and thus set the condition going. In this problem, any array (even an empty array) will evaluate to truthy and thus return arr.length.  If there is no match, the <b>match()</b> method returns the value "null", <b>not</b> an empty array, so the condition is not triggered. So, we go to the else statement and just return a 0.']
        }]
    },

    easy013: {
        title: 'Problem 13',
        heading: 'Count Words in a String',
        description: 'Create a function WordCount(str) to take the str string parameter being passed and return the number of words the string contains (ie. "Never eat shredded wheat" would return 4). Words will be separated by single spaces.',
        comment: 'Not a lot here, folks.',
        solutions: [{
            heading: null,
            discuss: null,
            code: `
function WordCount(str) {
    //See Note 1
    var arr = str.split(" ");
    var answer = arr.length;

    return answer;
}`,
            notes: [
                'For those new to javascript, note the convenience afforded by the <b>split()</b> method for strings and the <b>join()</b> method for arrays. Note also that <i>length</i> is a property of the array, not a method.  Might not seem like a big deal, but keeping these kind of details in mind at the beginning helps things make sense later on.']
        }]
    },

    easy014: {
        title: 'Problem 14',
        heading: 'Match Counts of Letters in a String',
        description: 'Create a function ExOh(str) to take the str parameter being passed and return true if there are an equal number of x\'s and o\'s; otherwise, return false.  Only these two letters will be entered in the string, no punctuation or numbers. For example: if str is "xooxxxxooxo" then the output should return false because there are 6 x\'s and 5 o\'s.',
        comment: 'This is a good example of the use of the filter() method. This method belongs to a group of array iterator methods, including forEach(), map(), reduce(), some(), and every() that are among the most useful of all javascript built-in methods. Each of them takes acts upon an array, and takes a callback function as a parameter in order to act on each element of the array. In filter(), we are returned an array that contains all the elements that cause our callback to return truthy.',
        solutions: [{
            heading: null,
            discuss: null,
            code: `
function ExOh(str) {
    //See Note 1
    if (!str) return true;

    var arr = str.split('');
    //See Note 2
    var xArr = arr.filter(val => val === 'x' || val === 'X');
    var yArr = arr.filter(val => val === 'o' || val === 'O');

    return xArr.length === yArr.length ? true : false;
}`,
            notes: [
            'The first line handles the edge case of an empty string.',
            'The problem doesn\'t mention case in its specifications. These lines count upper-case as matching; however, note that the || operator will not evaluate the second expression (i.e., the upper-case case), if the first case is truthy.'
            ]
        }]
    },

    easy015: {
        title: 'Problem 15',
        heading: 'Determine if a String is a Palindrome',
        description: 'Create a function Palindrome(str) that takes a string parameter passed to it and returns true if the parameter is a palindrome, (i.e., the string is the same forward as it is backward); otherwise, return false. For example: "racecar" is also "racecar" backwards. Punctuation and numbers will not be part of the string.',
        comment: 'Palindrome problems are usually difficult because they are rarely described completely, and the above is no exception.  Do spaces count, do cases have to match, etc.  Anyway, the following is a solution that is case-insensitive, but space-sensitive.',
        solutions: [{
            heading: null,
            discuss: null,
            code: `
function Palindrome(str) {
    str = str.toLowerCase();
    var rts = '';
    var leng = str.length;

    for (var i = leng - 1; i >= 0; i--) {
        //See Note 1
        rts += str.charAt(i);
    }

    return rts === str;
}`,
            notes: [
                'An alternative to the <b>charAt()</b> method is referring to characters in a string by bracket notation (e.g., str[0]). However, I have read that this syntax is not supported in older versions of IE, and probably should not be used in a production environment.'
            ]
        }]
    }
}
