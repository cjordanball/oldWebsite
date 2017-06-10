'use strict';

module.exports = {
    med021: {
        title: 'Medium 21',
        heading: 'Analyze Composition of Two Numbers',
        description: 'Create a function, TripleDouble(num1, num2), that will take two parameters (num1, num2), and return 1 if there is a straight triple of a number at any place in num1 and also a straight double of the same number in num2. For example: if num1 equals 451999277 and num2 equals 41177722899, then return 1 because in the first parameter you have the straight triple 999 and you have a straight double, 99, of the same number in the second parameter. If this isn\'t the case, return 0.',
        comment: null,
        solutions: [{
            heading: null,
            discuss: null,
            code: `
function TripleDouble(num1,num2) {
    var holdArr = []
    num1 = num1.toString();
    for (var i = 0; i <= 9; i++) {
        i = i.toString();
        var regEx = new RegExp (i+i+i);
        if (regEx.test(num1)){
            holdArr.push(i);
        }
    }

    if (holdArr === []) {
        return 0;
    }
    else {
        for (var j = 0, len = holdArr.length; j < len; j++){
            var double = new RegExp (holdArr[j] + holdArr[j]);
            if (double.test(num2)) {
                return 1;
            }
        }
        return 0;
    }
    console.log(holdArr);
}`,
            notes: []
        }]
    },

    med022: {
        title: 'Medium 22',
        heading: 'Match Opening and Closing Brackets',
        description: 'Create a function, BracketMatcher(str), that will take a string parameter being passed, ("str") and return 1 if the brackets are correctly matched and each is accounted for. Otherwise, return 0. For example: if str is "(hello (world))", then the output should be 1, but if str is "((hello (world))" the the output should be 0 because the brackets do not correctly match up. Only "(" and ")" will be used as brackets. If str contains no brackets return 1.',
        comment: 'This challenge is a little puzzling in its being placed in the medium difficulty section, as it only requires a very simple run through the letters of the string, assigning a "1" for parens facing one way, and a -1 for parens facing the other way, then seeing whether the sum of these is 0 at the end of the run.',
        solutions: [{
            heading: null,
            discuss: null,
            code: `
function BracketMatcher(str) {
    var strArray = str.split('');
    var counter = 0;
    for (var i = 0, len = strArray.length; i < len; i++) {
        if (strArray[i] === "(") {
            counter++;
        }
        else if (strArray[i] === ")") {
            counter--;
        }
    }
    if (counter === 0) {
        return 1;
    }
    return 0;
}`,
            notes: []
        }]
    },

    med023: {
        title: 'Medium 23',
        heading: 'Boil Down a String of Letters',
        description: 'Create a function, StringReduction(str), to take a string parameter (str) and return the smallest number one can get through the following reduction method. The method is: Only the letters a, b, and c will be given in str and you must take two different adjacent characters and replace it with the third. For example "ac" can be replaced with "b" but "aa" cannot be replaced with anything. This method is done repeatedly until the string cannot be further reduced, and the length of the resulting string is to be outputted. For example: if str is "cab", "ca" can be reduced to "b" and you get "bb" (you can also reduce it to "cc"). The reduction is done so the output should be 2. If str is "bcab", "bc" reduces to "a", so you have "aab", then "ab" reduces to "c", and the final string "ac" is reduced to "b" so the output should be 1.',
        comment: 'This problem is a great example of the power of even the most basic uses of regular expressions to make coding easier.',
        solutions: [{
            heading: null,
            discuss: null,
            code: `
function StringReduction(str) {

  while (str.match(/(ab|ba|ac|ca|bc|cb)/) != undefined) {
    str = str.replace(/(ab|ba)/, "c");
    str = str.replace(/(bc|cb)/, "a");
    str = str.replace(/(ac|ca)/, "b");
  }

  return str.length;
}`,
            notes: []
        }]
    },

    med024: {
        title: 'Problem 24',
        heading: 'Add Up Multiples of Three and Five',
        description: 'Create a function, ThreeFiveMultiples(num) that will return the sum of all the multiples of 3 and 5 that are below the number parameter, num. For example: if num is 10, the multiples of 3 and 5 that are below 10 are 3, 5, 6, and 9, and adding them up you get 23, so your program should return 23. The number parameter with be a positive integer.',
        comment: 'Below are three approaches to the problem. Although the first solution contains few lines code, my feeling is that the second will be considerably faster, as it does no division, and only operates on every third, then every fifth, number in the series, whereas the first solution tests every number, and most of them twice, to see if they are divisible by three and, if not, by five. Final note - the second method was considerably faster than the first, and the third method was much faster still. It was very interesting, however, that when run on a number large enough to show the significant time difference, there appeared a not inconsidable amount of number error.',
        solutions: [{
            heading: 'Solution One',
            discuss: null,
            code: `
function ThreeFiveMultiples(num) {
    var counter = 0;
    for (var i = 0; i <= num - 1; i++) {
        if (i % 3 === 0 || i % 5 === 0) {
            counter += i;
        }
    }
    return counter;
}`,
            notes: []
        },
        {
            heading: 'Solution Two',
            discuss: null,
            code: `
function ThreeFiveMultiples2(num) {
    var counter = 0;
    var mark3 = Math.floor((num - 1) / 3);
    var mark5 = Math.floor((num - 1) / 5);
    for (var i = 0; i <= mark3; i++) {
        counter += (i * 3);
    }
    for (var j = 0; j <= mark5; j++) {
        var k = (j * 5);
        if (k % 3 !== 0){
            counter += k;
        }
    }
    return counter;
}`,
            notes: []
        },
        {
            heading: 'Solution Three',
            discuss: null,
            code: `
function ThreeFiveMultiples3(num) {
    var val3 = Math.floor((num - 1) / 3);
    var threeSum = 3 * ((val3 * val3) + val3);
    var val5 = Math.floor((num - 1 ) / 5);
    var val15 = Math.floor((num - 1) / 15);
    var fiveSum = 5 * ((val5 * val5) + val5);
    var fifteenSum = 15 * ((val15 * val15) + val15);

    return (threeSum + fiveSum - fifteenSum) / 2;
}`,
            notes: []
        }]
    },

    med025: {
        title: 'Medium 25',
        heading: 'Determine Smallest Amount of Coins to Make Change',
        description: 'Create a function, CoinDeterminer(num), that will take a number argument, which will be an integer ranging from 1 to 250, and return an integer that will specify the least number of coins that can equal the value of the argument number.  There are coins representing the integers 1, 5, 7, 9, and 11. So, for example, if num is 16, then the output should be 2 because you can achieve the number 16 with the coins 9 and 7. If num is 25, then the output should be 3, because you can achieve 25 with either 11, 9, and 5 coins or with 9, 9, and 7 coins.',
        comment: 'This is trivial from a coding perspective, but is a bit of a challenge from a math standpoint. The most helpful fact is that the answer must be even for an even number, and odd for an odd number, so for an answer to be a loser, it must lose by at least 2. Certainly this problem is one that I will want to revisit and see if I can come up with a better solution.',
        solutions: [{
            heading: null,
            discuss: null,
            code: `
function CoinDeterminer(num) {

    var arr = [0, 1, 2, 3, 4, 1, 2, 1, 2, 1, 2, 1, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2]
    if (num <= 22) {
        return arr[num]
    } else {
        var turns = Math.floor((num - 11) / 22) * 2;
        var remain = num - (turns * 11);
        if (remain > 22) {
            turns++;
            remain -= 11;
        }
        return turns + arr[remain];
    }
}`,
            notes: []
        }]
    }
}
