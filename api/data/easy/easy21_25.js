'use strict';

module.exports = {
    easy021: {
        title: 'Problem 21',
        heading: 'Find the Difference Between Two Times',
        description: 'Create a function CountingMinutesI(str) to take the str parameter being passed which will be two times (each properly formatted with a colon and am or pm) separated by a hyphen, and return the total number of minutes between the two times. The time will be in a 12 hour clock format. For example: if str is 9:00am-10:00am then the output should be 60. If str is 1:00pm-11:00am the output should be 1320.',
        comment: 'This problem is pretty straightforward, although it does get a bit involved, in dealing with time spilling over into two days.',
        solutions: [{
            heading: null,
            discuss: null,
            code: `
function CountingMinutesI(str) {

    //See Note 1
    var TimesArray = str.split("-");
    var TimesArray = TimesArray.map(function(val) {
        return val.split(":")
    });
    var hour1 = parseInt(TimesArray [0][0]);
    var hour2 = parseInt(TimesArray[1][0]);
    var min1 = parseInt(TimesArray[0][1]);
    var min2 = parseInt(TimesArray[1][1]);
    var ampm1 = TimesArray[0][1].slice(-2);
    var ampm2 = TimesArray[1][1].slice(-2);

    if (ampm1 == 'pm') {
        hour1 === 12 ? hour1 : hour1 += 12;
    }
    if (ampm2 === 'pm') {
        hour2 === 12 ? hour2 : hour2 += 12;
    }
    if (ampm1 === 'am') {
        hour1 === 12 ? hour1 = 0 : hour1;
    }
    if (hour2 === 'am') {
        hour2 === 12 ? hour2 = 0 : hour2;
    }
    var time1 = (hour1 * 60) + min1;
    var time2 = (hour2 * 60) + min2;
    var diff = time2 - time1;

    if (diff < 0) {
        diff = diff + (60 * 24);
    }

    return diff;
}`,
            notes: [
                'The following section converts the string into a an array with the format "[[hh,mmam], [hh,mmpm]]", then assigns itmes from the array into variables for us to work with.'
            ]
        }]
    },

    easy022: {
        title: 'Problem 22',
        heading: 'Check if Mean and Mode Are the Same',
        description: 'Create a function MeanMode(arr) to take the array of numbers stored in arr and return 1 if the mode equals the mean, and 0 if they don\'t equal each other. For example, [5, 3, 3, 3, 1] should return 1 because the mode (3) equals the mean (3)). The array will not be empty, will only contain positive integers, and will not contain more than one mode.',
        comment: null,
        solutions: [{
            heading: null,
            discuss: null,
            code: `
function MeanMode(arr) {
    len = arr.length
    //See Note 1
    function mean(arr) {
        var count = 0;
        for (var i = 0; i < len; i++) {
            count += arr[i]
        }
        console.log (count / len)
        return count / len
    }
    //See Note 2

    function mode(arr) {
        var obj = {};
        for (var i = 0, len = arr.length; i < len; i++) {
            if (obj[arr[i]] === undefined) {
                obj[arr[i]] = 1;
            }
            else {
                obj[arr[i]]++;
            }
        }
        var objarr = [];
        for (x in obj) {
            objarr.push([x, obj[x]]);
        }
        objarr.sort(function(a, b) {return b[1] - a[1]});
        console.log(objarr[0][0]);
        return objarr[0][0];
    }
    //See Note 3
    return mode(arr) == mean(arr)? 1: 0;
}`,
            notes: [
                'Step 1: determine the mean - self explanatory',
                'Step 2: determine the mode. We need to count how many of each type are in the array. One alternative is to keep a counter going, sort the array and then count until an item changes, keeping track of the maximum count and the associate value. The following is a much easier way, assuming that one has a basic familiarity with javascript objects. It makes each new entry a key, and keeps count of how many of each there are, then makes an array of the key-value pairs created.',
                'Compare the mean and the mode '
            ]
        }]
    },

    easy023: {
        title: 'Problem 23',
        heading: 'Insert Dashes Into Number',
        description: 'Create a function DashInsert(str) that will take a number parameter (num) and insert dashes ("-") between any two consecutive odd integers in num.  For example: if str is 454793 the output should be 4547-9-3.',
        comment: 'This problem is typical of problems that require making substitutions to an array - if one uses a for loop, then the act of adding or subtracting items from the array changes its length. The easiest solution is forgoing such a loop in favor of a while loop, which continues to iterate until it gets to the end of the array (i.e., when Array[count] is equal to undefined).',
        solutions: [{
            heading: null,
            discuss: null,
            code: `
function DashInsert(num) {
    var strNum = num.toString();
    var arr = strNum.split("");
    var intArr = arr.map(function(val){
        return parseInt(val)
    });
    count = 0;
    while (intArr[count + 1]) {
        if (intArr[count] % 2 === 1 && intArr[count + 1] % 2 === 1) {
            intArr.splice (count + 1, 0, '-');
        }
        count++;
    }

    return intArr.join('');
}`,
            notes: []
        }]
    },

    easy024: {
        title: 'Problem 24',
        heading: 'Reverse the Case of Each Letter',
        description: 'Create a function SwapCase(str) to take a string parameter str and swap the case of each character. For example: if str is "Hello World" the output should be hELLO wORLD. Let numbers and symbols stay the way they are.',
        comment: 'The following function relies on the fact that the toUpperCase() and toLowerCase() methods return the original characters in the case of nonalphabetical characters.',
        solutions: [{
            heading: null,
            discuss: null,
            code: `
function SwapCase(str) {
    var arr = str.split("");
    var len = arr.length;
    for (var i = 0; i < len; i++) {
        if (arr[i] !== arr[i].toUpperCase()) {
            arr[i] = arr[i].toUpperCase();
        }
        else {
            arr[i] = arr[i].toLowerCase();
        }
    }
    str = arr.join("");
    return str
}`,
            notes: []
        }]
    },

    easy025: {
        title: 'Problem 25',
        heading: 'Add the Numbers Contained in a String',
        description: 'Create a function NumberSearch(str) to take a string parameter str, search for all the numbers in the string, add them together, then return that final number. For example: if str is "88Hello 3World!" the output should be 91. You will have to differentiate between single digit numbers and multiple digit numbers like in the example above. So "55Hello" and "5Hello 5" should return two different answers. Each string will contain at least one letter or symbol.',
        comment: null,
        solutions: [{
            heading: null,
            discuss: null,
            code: `
function NumberAddition(str) {
    var sum = 0;
    var count = 0;

    var strArr = function(str) {
        //See Note 1
        str = str.replace(/[^0-9]/g, ' ');
        //See Note 2
        str = str.trim();
        //See Note 3
        while (str.indexOf('  ') !== -1) {
            str = str.replace(/\s\s/g, ' ');
        }
        //See Note 4
        return str.split(' ');
    }

    //See Note 5
    var prepped = strArr(str);

    //See Note 6
    prepped = prepped.map(function(val) {
        return parseInt(val);
    });

    //See Note 7
    var ans = prepped.reduce(function(firstval, lastval){
        return firstval + lastval
    });

    return ans
}`,
            notes: [
                'Take out the non-digits and replace with spaces to keep separated',
                'Take off any preceding or final spaces',
                'Turn any double spaces into single spaces, until no more doubles remain',
                'Return an array of number strings without spaces;',
                'Call the strArr function on the user input and store as "prepped"',
                'Turn each number string into a number',
                'Run the reduce method to add up all the numbers'


            ]
        }]
    },
}
