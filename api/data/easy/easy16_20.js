'use strict';

module.exports = {
    easy016: {
        title: 'Problem 16',
        heading: 'Determine if a Number Sequence is Arithmetic or Geometrical',
        description: 'Create a function ArithGeo(arr) that takes an array of numbers stored in arr and returns the string "Arithmetic" if the sequence follows an arithmetic pattern or returns "Geometric" if it follows a geometric pattern. If the sequence doesn\'t follow either pattern, return -1.  An arithmetic sequence is one in which the difference between each pair of consecutive numbers is the same, whereas a geometric sequence is one in which each pair of consecutive numbers is the same multiple. For example, an arithmetic sequence could be: [2, 4, 6, 8] and a geometric example could be: [2, 6, 18, 54].  Negative numbers may be entered in the array, an empty array will not be entered, and no array will contain all the same elements.',
        comment: null,
        solutions: [{
            heading: null,
            discuss: null,
            code: `
function ArithGeo(arr) {
  var len = arr.length;

  function ArithTest(arr) {
    var arithK = arr[1] - arr[0];
    for (var i = 1; i < len; i++) {
      if (arr[i] - arr[i - 1] !== arithK) {
        return false
      }
    }
    return 'Arithmetic'
  }

  function GeoTest(arr) {
    var geoK = arr[1] / arr[0];
    for (var i = 1; i < len; i++) {
      if (arr[i] / arr[i - 1] !== geoK) {
        return false
      }
    }
    return 'Geometric'
  }

  //See Note 1
  return ArithTest(arr) || GeoTest(arr) || -1
}`,
            notes: [
                'For novice javascript programmers, this line might be very interesting.  The "||" is the "OR" operator, which returns true if any one or more of a set of propositions is true. For example "x === 1 || x !== 1" would always return true, because it has to be one or the other. In a statment such as that above, the function will return the first item that is truthy, or the last item if it gets that far (whether or not it is truthy).  So, in the example below, if it is an arithmetic array, the first item is truthy ("truthy" and "falsey" values are discussed in earlier problems), so the return value of ArithTest() gets returned by ArithGeo().  If not an arithmetic array, then ArithTest returned false, so it goes on to GeoTest().  If that is truthy, then GeoTest() will be returned by ArithGeo().  If GeoTest also returns false, then -1 will be returned by ArithGeo as a default.'
            ]
        }]
    },

    easy017: {
        title: 'Problem 17',
        heading: 'Find Sum of Combinations of Numbers in Array',
        description: 'Create a function ArrayAdditionI(arr) that will take an array of numbers and return true if any combination of numbers in the array can be added up to equal the largest number in the array (excepting the trivial instance of the single number equalling itself); otherwise, return false. For example: if arr contains [4, 6, 23, 10, 1, 3] the output should return true because 4 + 6 + 10 + 3 = 23. The array will not be empty, will not contain all the same elements, and may contain negative numbers.',
        comment: 'First, I must comment that I did not consider this problem to be an easy one at all; it is probably mislabeled to be in the easy section. That said, there is a fairly simple way to solve this problem quickly, if one is willing to use a brute force solution that would not scale up very well arrays longer than 20 elements or so. Below is such a solution, based on the fact that once the largest number in the array is popped off, there are 2^n possible combinations of the remaining n numbers in the array (as each number in the array can either be in or out of the addition).  I visualized this as a binary number of n digits in length, with each digit standing for inclusion of that place\'s array item, or exclusion.  Then I just started testing every number until one is found that adds up (return true), or all possibilities are exhausted (return false).  So, for example, if the array is [1, 2, 3, 4, 5], the number represented by "10110" would be 8 (i.e., 1 + 3 + 4).',
        solutions: [{
            heading: null,
            discuss: null,
            code: `
'use strict';

let ArrayAdditionI = {
    target: 0,

    main: function(arr){
        this.validation(arr);
        let addingArray = this.arrayPrep(arr);
        let permutationCount = Math.pow(2, addingArray.length);
        let counter = 1;

        while (counter < permutationCount) {
            //See Note 1
            let permutationArray = (counter + permutationCount).toString(2).slice(1).split('');
            let sum = 0;

            permutationArray.forEach((val, ind) => {
                sum += val * addingArray[ind];
            })

            if (sum === this.target) return true;
            counter++;
        }
        return false;
    },

//-----------helpers -----------------

    //See Note 2
    validation: function(arr){
        if (!Array.isArray(arr)) throw "Not an array entered";
        if (!arr.every((val) => typeof val === 'number')) throw "Invalid entries - must be numbers.";
    },
    //See Note 3
    arrayPrep: function(arr) {
        arr.sort((a, b) => a - b);
        this.target = arr.pop()
        return arr
    }
}`,
            notes: [
                'This line might be a little confusing.  What we are want to do, for each number from 1 to 2^n, is have a string representation of whether each of n numbers is in or out. To do this, we need leading zeroes, for example, just including the final of five numbers would be represented by "00001"; to get those, add an initial 1 to the number by the initial addition, then take it away once the number has become a string.',
                'The validation method tests to make sure the input is an array, and that each element is a number.',
                'The arrayPrep() method takes the original array input and returns the same array, sorted.'
            ]
        }]
    },

    easy018: {
        title: 'Problem 18',
        heading: 'Find Words with Repeating Letters',
        description: 'Create a function LetterCountI(str) to take the str parameter being passed and return the first word with the greatest number of repeated letters. For example: "Today, is the greatest day ever!" should return "greatest" because it has 2 e\'s (and 2 t\'s) and it comes before ever which also has 2 e\'s. If there are no words with repeating letters return -1. Words will be separated by spaces.',
        comment: null,
        solutions: [{
            heading: null,
            discuss: null,
            code: `
function LetterCountI(str) {
    //See Note 1
    var arr = str.toLowerCase().split(" ");
    var n = arr.length;
    //See Note 2
    var counter = 1;
    //See Note 3
    var MaxCount = 0;
    var scoreKeepArray = [];

    for (var i = 0; i < n; i++) {
        //See Note 4
        WordArray = arr[i].split('');
        WordArray.sort();
        for (var j = 0; j < WordArray.length; j++) {
            //See Note 5
            if (WordArray[j] === WordArray[j + 1]) {
                counter++;
            }
            //See Note 6
            else {
                if (counter > MaxCount) {
                    MaxCount = counter;
                }
                counter = 1;
            }
        }
        //See Note 7
        scoreKeepArray.push([arr[i], MaxCount])
        MaxCount = 0;
    }
    //See Note 8
    scoreKeepArray.sort(function(a, b) {return b[1] - a[1]});
    //See Note 9
    if (scoreKeepArray[0][1] == 1) {
        return -1;
    }
    //See Note 10
    else {
        return scoreKeepArray[0][0];
    }
}`,
            notes: [
                'Create an array of words in the string, all in lower case',
                '"Counter" will count the letters in each word',
                '"MaxCount" will keep track of the high score',
                'Each word is made into its own array, so we can use the sort method on it, getting like letters adjacent to each other.',
                'If the letter matches the following one, then add to the counter and go to the next.',
                'If the next letter is different, see how many the counter is, put it in "MaxCount" if it is the leader, and reset the counter.',
                'For each word, make an entry in <i>scoreKeepArray</i> identifying the word and the maximum repeat letters in that word.',
                'Sort the words by the MaxCount.',
                'If the leadear has no repeat letters, return -1.',
                'If there is a tie, the correct answer will be given, as the <b>sort()</b> method does not disturb the order in case of ties.'




            ]
        }]
    },

    easy019: {
        title: 'Problem 19',
        heading: 'Find the Second Largest and Smallest Items in an Array',
        description: 'Create a function SecondGreatLow(arr) to take an array of numbers passed to it as arr and return the second smallest and second greatest numbers, respectively, separated by a space. For example: if arr contains [7, 7, 12, 98, 106] the output should be 12 98. The array will not be empty and will contain at least 2 numbers. It can get tricky if there\'s just two numbers!',
        comment: 'The first time I looked at this problem, I did not read through the example carefully and failed to notice that the values sought require removal of duplicate values. Thus, what appeared to be a trivially simple problem (sort and print) was a little bit more challenging, requiring the addition of the "lonely()" method below.',
        solutions: [{
            heading: null,
            discuss: null,
            code: `
function SecondGreatLow(arr) {

    arr.sort(function(a, b) {return a - b});
    //See Note 1
    arr = lonely(arr);
    var len = arr.length;


    return arr[1] + ' ' + arr[len - 2]

    function lonely(arr) {
        var arrLen = arr.length;
        var testObj = {};
        for(var i = 0; i < arrLen; i++) {
            if(!testObj[arr[i]]) {
                testObj[arr[i]] = true;
            }
        }
        return Object.keys(testObj)
    }
}`,
            notes: [
                'The helper method <i>lonely()</i> removes duplicate elements from an array. It makes use of the fact that an objects keys are unique, so that if "1" has already been used as a key, trying to include another "1" as a key will not have any affect. At the end, we use the <b>Object.keys()</b> method to return an array of all the keys of the object, thus giving us an array without repeating items.'
            ]
        }]
    },

    easy020: {
        title: 'Problem 20',
        heading: 'Divide and Show Result With Commas',
        description: 'Create a function, DivisionStringified(num1, num2), to take two number parameters passed to it, divide num1 by num2, and return the result as a string with properly formatted commas. If an answer is only 3 digits long, return the number with no commas (ie. 2 / 3 should output "1"). For example: if num1 is 123456789 and num2 is 10000 the output should be "12,345".',
        comment: null,
        solutions: [{
            heading: null,
            discuss: null,
            code: `
function DivisionStringified(num1, num2){
    var result = Math.round(num1 / num2);
    var string = result.toString();
    var len = string.length;

    if(len > 3) {
        var resString = '';
        var shift = len % 3;
        for (var i = 0; i < len; i++) {
            if (i < len - 1 && (i + shift) % 3 === 0) {
                resString += (string[i] + ',');
            }
            else {
                resString += string[i];
            }
        }
        return resString;
    }
  return string;
 }`,
            notes: []
        }]
    },
}
