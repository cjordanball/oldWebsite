'use strict'

module.exports = {
    med016: {
        title: 'Medium 16',
        heading: 'Determine Next Higher Number from Same Digits',
        description: 'Create a function, PermutationStep(num), to take an integer argument (num) and return the closest number greater than num using the same digits.  For example: if num is 123, return 132; if it\'s 12453, return 12534. If the number has no greater permutations, return -1 (e.g., the integer 999 has no greater arrangement of the three 9s).',
        comment: 'This seems to be more of a number problem than a coding problem.  Of course, one solution would be to create an array of all possible arrangements of the digits, then sort, then find the index of the original number in the sorted list, then return array[index+1]. But that would be a very computer intensive solution for a number of any significant length. A better solution would be to evaluate each digit, from the one\'s place and moving left, to determine the nearest digit to the left that is less, and keep track in which power of ten slot that lesser digit sits.  Then repeat with the number to the left, until we have a switch wholly to the right of any remaining numbers, at which point we can stop.  Then make that switch, and rearrange all remaining numbers to the right in numerical order.',
        solutions: [{
            heading: null,
            discuss: null,
            code: `
function PermutationStep(num) {
    var numArray = num.toString().split('').reverse();
    numArray = numArray.map(function(val) {
        return parseInt(val);
    })
    var test = true;
    var len = numArray.length;
    newArray = [];
    while(test) {
        if (!newArray[0]) {
            newArray[0] = numArray.shift();
        }
        else if (newArray.every(function(val) {
            return val <= numArray[0];
            })) {
            newArray.push(numArray.shift())
        }
        else {
            if (!numArray[0]) {
                return -1;
            }
            test = false;
        }
    }
    newArray.sort(function(a, b) {return a - b});
    var numHolder = numArray.shift();

    for (var i = 0; i < newArray.length; i++) {
        if (newArray[i] > numHolder) {
            numArray.unshift(newArray[i]);
            newArray[i] = numHolder;
            break;
        }
    }
    newArray.sort(function(a, b) {return b - a});

    var resultArray = newArray.concat(numArray);

    return resultArray.reverse().join('');
}`,
            notes: []
        }]
    },

    med017: {
        title: 'Medium 17',
        heading: 'Check if a Prime Can be Made from Given Digits',
        description: 'Create a function, PrimeChecker(num), that will take a numerical argument (num) and return 1 if any ordering of all the digits of num results in a prime number, otherwise return 0.  For example: if num is 910, the output should be 1 because 910 can be arranged into 109 or 019, both of which are primes.',
        comment: 'Maybe this has an easy, elegant solution that has been staring me in the face all along, but if so, I have been curiously unaware of it.  The heart of the problem is the drawing out of all the permutations of the n digits in the argument.  The number of permutations (assuming distinct digits), is n!, which increases incredibly fast: 1! is 1, 5! is a mere 120, but 10! is in the millions. I\'m not sure this problem is where I would like it to be yet, but I can come back around to it and give it another go.',
        solutions: [{
            heading: null,
            discuss: null,
            code: `
function PrimeChecker(num) {
    workingArray = initialize(num);
    var arrayLen = workingArray.length;

    while (workingArray[0][1].length > 0){
    //See Note 1
        permStep(workingArray);
    }
    //this tidies up the array elements.
    workingArray = workingArray.map(function(val){
        return val[0];
    });
    //See Note 2
    for (var i = 0, WAlen = workingArray.length; i < WAlen; i++){
        if (primeTest(workingArray[i])){
            return 1;
        }
    }
    return 0

    //See Note 3
    function initialize(num) {
        var arr = num.toString().split('')
        var resArr = [];
        for (var i = 0, len = factorial(arr.length); i < len; i++) {
            resArr.push(['', arr]);
        }
        return resArr;
    }
    function factorial(num) {
        if (num <= 1) {
            return 1;
        }
        else {
            return num * factorial(num - 1)
        }
    }
    function permStep(arr) {
        var counter = 0;
        var len = arr[0][1].length;
        while (counter < arrayLen) {
            var targetArray = arr[counter][1];
            for (var i = 0; i < len; i++) {
                for (var j = 0; j < factorial(len - 1); j++){
                    var copyArray = targetArray.map(function(val){
                        return val;
                    });
                    var holder = copyArray.splice(i, 1);
                    arr[counter][0] = arr[counter][0].concat(holder[0]);
                    arr[counter][1] = copyArray;
                    counter++;
                }
            }
        }
        return arr;
    }
    function primeTest(stringNum) {
        stringNum = parseInt(stringNum);
        pivot = Math.ceil(Math.sqrt(stringNum));
        if (stringNum === 2) {
            return true;
        }
        else {
            for (var i = 2; i <= pivot; i++) {
                if (stringNum % i === 0) {
                    return false;
                }
            }
            return true;
        }
    }
}`,
            notes: [
                'permStep() is the method that moves the digits into their spots in an ordered manner, resulting in an array of n! elements of the form ["123",[]].',
                'primeTest() is a method to convert each array element into a string, then test to see if it is a prime.',
                'the initialize function converts the number into an array of n! 2-item arrays, where n is the number of digits in num. The array has the form ["", ["1", "2", "3"]].'
            ]
        }]
    },

    med018: {
        title: 'Medium 18',
        heading: 'Manipulate a Given String',
        description: 'Create a function, DashInsertII(str), which will insert dashes ("-") between each two odd numbers and insert asterisks ("*") between each two even numbers in a string argument (str) passed to it.  For example: if str is 4546793 the output should be 454*67-9-3. Don\'t count zero as an odd or even number.',
        comment: 'A very straightforward problem.  The main point of interest is whether to deal with the zero in the if and else if statement, or ignore the zeros in the for loop, then pluck out the extra stars, the approach taken below.',
        solutions: [{
            heading: null,
            discuss: null,
            code: `
function DashInsertII(num) {
    str = num.toString();
    arr = str.split("");
    for (var i = 0, len = arr.length; i < len - 1; i++) {
        if (arr[i] % 2 === 0 && arr[i + 1] % 2 === 0) {
            arr[i] = arr[i] + "*";
        }
        else if (arr[i] % 2 === 1 && arr[i + 1] % 2 === 1) {
            arr[i] = arr[i] + "-";
        }
    }
    str = arr.join("");

    str = str.replace(/\*0/g, "0");
    str = str.replace(/0\*/g, "0");



  return str;

}`,
            notes: []
        }]
    },

    med019: {
        title: 'Medium 19',
        heading: 'More String Manipulation',
        description: 'Create a function, SwapII(str), to take a string parameter (str) and swap the case of each alphabetical character.  Then, if a letter is between two numbers with no spaces between them, switch the places of the two numbers. For example: if str is "6Hello4 -8World, 7 yes3" the output should be 4hELLO6 -8wORLD, 7 YES3.',
        comment: null,
        solutions: [{
            heading: null,
            discuss: null,
            code: `
function SwapII(str) {
    var str2 = caseSwap(str);
    if (switchPatterns(str2) === 'none') {
        return str2;
    }
    else{
        return substitution(switchPatterns(str2));
    }

    //See Note 1
    function caseSwap(str){
        var strArray = str.split('');
        strArray = strArray.map(function(val){
            if (val === val.toLowerCase()) {
                return val.toUpperCase();
            }
            else {
                return val.toLowerCase();
            }
        })
        return strArray.join('');
    }
    //See Note 2
    function switchPatterns(str) {
        matchArr = str.match(/\d\S*[a-zA-Z]+\S*\d/g);
        if (matchArr) {
            saveArr = matchArr.map(function(val){
                return val;
            })

            var newArr = matchArr.map(function(val, ind){
                var holdArr = [];
                var littleArr = val.split('');
                holdArr.push(littleArr.pop());
                holdArr.unshift(littleArr.shift());
                holdArr.reverse();
                littleArr.push(holdArr.pop());
                littleArr.unshift(holdArr.shift());
                val = littleArr.join('');
                return [saveArr[ind], val];
            })
            return newArr;
        }
        else {
            return 'none';
        }
    }
//See Note 3
    function substitution(arr) {
        var newString = caseSwap(str);
        arr.forEach(function(val){
            newString = newString.replace(val[
                0], val[1]);
        })
        return newString;
    }

}`,
            notes: [
                'The function caseSwap returns the string with the letter cases.',
                'Returns an array of two-item arrays, the first item being the original matching string segment, the second being the same segment, with reversed numbers.',
                'Returns a string, consisting of the original string, cases reversed, and numbers reversed.'
            ]
        }]
    },

    med020: {
        title: 'Medium 20',
        heading: 'Manipulation of Numbers Contained in a String',
        description: 'Create a function, NumberSearch(str), which will take a string parameter (str), search for all the digits in the string, add them together, then return that final number divided by the total amount of letters in the string. For example: if str is "Hello6 9World 2, Nic8e D7ay!" the output should be 2. First, if you add up all the numbers, 6 + 9 + 2 + 8 + 7 you get 32.  Then there are 17 letters in the string. 32 / 17 = 1.882, and the final answer should be rounded to the nearest whole number, so the answer is 2.  Only single digit numbers separated by spaces will be used throughout the whole string (So this won\'t ever be the case: hello44444 world). Each string will also have at least one letter.',
        comment: 'This problem made me feel good. When I sat down to do it (early Feb 2015), I saw code left behind from a previous attempt, and I had flubbed it up quite a bit. This time, it was a very simple solution, the key difference being the use of regular expressions to easily isolate the digits and the letters. Guess I am learning something, after all!',
        solutions: [{
            heading: null,
            discuss: null,
            code: `
function NumberSearch(str) {
    var matchArr = str.match(/\d/g);

    //See Note 1
    if (matchArr) {
        //my vote for the most useful javascript method is map!
        var matchArr = matchArr.map(function(val) {
            return parseInt(val);
        });
        //my vote for the most fun-to-use javascript method is reduce!
        var sum = matchArr.reduce(function(post, pre){
            return pre + post
        });
    } else {
        var sum =  0;
    }

    var letterArr = str.match(/[a-zA-Z]/g);

    return Math.round(sum / letterArr.length);
}`,
            notes: [
                'The if statement catches the possibility that there is no digit at all in the input, in which case matchArr would end up null, and the map and reduce methods would break down. If matchArr is falsey (i.e., it is null), we simply assign the value 0 to the variable sum.'
            ]
        }]
    },
}
