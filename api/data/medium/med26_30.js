'use strict';

module.exports = {
    med026: {
        title: 'Medium 26',
        heading: 'Is it a Fibonacci Number?',
        description: 'Create a function, FibonacciChecker(num), that will take a positive integer parameter and return the string "yes" if the number given is part of the Fibonacci sequence. This sequence is defined by: Fn = Fn-1 + Fn-2, which means to find Fn you add the previous two numbers. The first two numbers are 0 and 1, then comes 1, 2, 3, 5 etc. If num is not in the Fibonacci sequence, return the string "no".',
        comment: null,
        solutions: [{
            heading: null,
            discuss: null,
            code: `
function FibonacciChecker(num){
    var seed1 = 0;
    var seed2 = 1;
    var counter = 0;
    //See Note 1
    if (num === 0) return "yes";
    //See Note 2
    while (counter < num) {
        //compute the next Fib number
        counter = seed1 + seed2;
        //see if it is the argument value
        if (counter === num) {
            return "yes";
        }
        //See Note 3
        seed2 = seed1;
        seed1 = counter;
    }
    return "no";
}`,
            notes: [
                'Hard code answer for the initial value of 0.',
                'Run a loop so long as we have not reached the argument value.',
                'Update the numbers for the next computation.'
            ]
        }]
    },

    med027: {
        title: 'Medium 27',
        heading: 'Matching Brackets and Parentheses',
        description: 'Create a function, MultipleBrackets(str), that takes a string (str) as a parameter and returns "1 [#ofBrackets]" if the brackets are correctly matched and each one is accounted for. Otherwise return 0. For example: if str is "(hello [world])(!)", then the output should be 1 3 because all the brackets are matched and there are 3 pairs of brackets, but if str is "((hello [world])" the the output should be 0 because the brackets do not correctly match up. Only "(", ")", "[", and "]" will be used as brackets. If str contains no brackets return 1',
        comment: null,
        solutions: [{
            heading: null,
            discuss: null,
            code: `
function MultipleBrackets(str) {
    var countParen = 0;
    var countBrack = 0;
    var countOpen = 0;
    for (var i = 0, len = str.length; i < len; i++) {
        switch(str.charAt(i)) {
            case '(':
                countOpen++;
                countParen++;
                break;
            case '[':
                countOpen++;
                countBrack++;
                break;
            case ')':
                countParen--;
                break;
            case ']':
                countBrack--;
                break;
        }
        if (countParen < 0 || countBrack < 0) return '0';
    }
    //See Note 1
    if (countOpen === 0) return '1'
    if (countParen === 0 && countBrack === 0) return ('1 ' + countOpen);

    else return 0;
}`,
            notes: [
                'countOpen() can only equal 0 if there were no (s or [s.  If there are any )s or ]s, we will have already returned 0 in the loop.)'
            ]
        }]
    },

    med028: {
        title: 'Medium 28',
        heading: 'Determine Longest Time Period',
        description: 'Create a function, MostFreeTime(strArr), that will read an array argument which will represent a full day and will be filled with events that span from time X to time Y in the day. The format of each event will be hh:mmAM/PM-hh:mmAM/PM. For example, strArr may be ["10:00AM-12:30PM","02:00PM-02:45PM","09:10AM-09:50AM"]. The function should return the longest amount of free time available between the start of the first event and the end of the last event, in the format: hh:mm. The start event should be the earliest event in the day and the latest event should be the latest event in the day. The return for the previous example would therefore be 01:30 (with the earliest event in the day starting at 09:10AM and the latest event ending at 02:45PM).  The input will contain at least 3 events and the events may be out of order.',
        comment: null,
        solutions: [{
            heading: null,
            discuss: null,
            code: `
function MostFreeTime(strArr) {

    strArr = strArr.map(function(val) {
        return convert12to24(val);
    });

    strArr = strArr.map(function(val){
        return convertToMinutes(val);
    })

    strArr.sort(function(a, b){
        return parseInt(a.match(/\d{3,4}/) - b.match(/\d{3,4}/))
    })

    strArr = strArr.map(function(val){
        valArr = val.split('-');
        valArr = valArr.map(function(val){
            return parseInt(val);
        });
        return valArr;
    });
    var len = strArr.length;

    var counter = 0;
    for (var i = 0; i < len - 1; i++) {
        var time = strArr[i+1][0] - strArr[i][1];
        if (time > counter) {
            counter = time;
        }
    }
    return returnToTime(counter);

    function returnToTime(counter){
        var mins = (counter % 60).toString();
        var hrs = (Math.floor(counter / 60).toString());
        if (mins < 10) {
            mins = '0' + mins;
        }
        if (hrs < 10) {
            hrs = '0' + hrs;
        }
        return (hrs + ':' + mins);
    }

    function convertToMinutes(strVal) {
        tempArr = strVal.split('-');
        tempArr = tempArr.map(function(val){
            var hrs = parseInt(val.slice(0,2));
            var mins = parseInt(val.slice(3));
            return hrs * 60 + mins;
        });

        return tempArr.join('-');
    }

    function convert12to24(strVal) {
        var tempArr = strVal.split('-');
        tempArr = tempArr.map(function(val){
            if (/am/i.test(val)) {
                val = val.replace('12', '00');
                return val.slice(0, 5);
            }
            else {
                val = val.replace('12', '00');
                var hour = parseInt(val.slice(0, 2));
                val = val.slice(2);
                var newHour = (hour + 12).toString();
                val = newHour.concat(val)
                return val.slice(0, 5);
            }
        });
        return tempArr.join('-');
    }
}`,
            notes: []
        }]
    },

    med029: {
        title: 'Medium 29',
        heading: 'Work with an Overlapped Area',
        description: 'Create a function, OverlappingRectangles(strArr), which will take an array of strings as a parameter (strArr), which will represent two rectangles on a Cartesian coordinate plane and will contain 8 coordinates with the first 4 making up rectangle 1 and the last 4 making up rectange 2. It will be in the following format: ["(0,0),(2,2),(2,0),(0,2),(1,0),(1,2),(6,0),(6,2)"]. The function should determine the area of the space where the two rectangles overlap, and then output the number of times this overlapping region can fit into the first rectangle. For the above example, the overlapping region makes up a rectangle of area 2, and the first rectangle (the first 4 coordinates) makes up a rectangle of area 4, so your program should output 2. The coordinates will all be integers. If there\'s no overlap between the two rectangles return 0. All rectangles will have sides parallel to the x and y axis.',
        comment: 'The above instructions are not complete, a point made clear when I originally submitted my code and it failed several tests. The statement of the required output of the function, i.e., the number of times the overlapping region can fit into the first rectangle, is applied in the tests as the number of times it could fit maintaining its shape and orientation. For example, if the first rectangle is 5 wide and 4 high, and the overlap is 2 wide and 1 high, the overlap could fit 5 times, if one of them was turned 90 degrees. Therefore, simply comparing total area of the two rectangles is insufficient to solve this problem.',
        solutions: [{
            heading: null,
            discuss: null,
            code: `
function OverlappingRectangles(strArr) {

    //See Note 1
    var rectangles = RectangArrays(strArr);
    var rect1 = rectangles[0];
    var rect2 = rectangles[1];

    //See Note 2
    var rect1Points = recPoints(rect1);
    var rect2Points = recPoints(rect2);
    rect1Height = Math.abs(rect1Points[0][1] - rect1Points[1][1]);
    rect1Width = Math.abs(rect1Points[0][0] - rect1Points[1][0]);

    //See Note 3
    var points = {
        rect1Bottom: rect1Points[0][1],
        rect2Bottom: rect2Points[0][1],
        rect1Top: rect1Points[1][1],
        rect2Top: rect2Points[1][1],
        rect1Right: rect1Points[1][0],
        rect2Right: rect2Points[1][0],
        rect1Left: rect1Points[0][0],
        rect2Left: rect2Points[0][0]
    }


    //See Note 4
    if (points.rect2Bottom >= points.rect1Top || points.rect1Bottom >= points.rect2Top || points.rect1Left >= points.rect2Right || points.rect2Left >= points.rect1Right) {
        return 0
    }

    //See Note 5
    else {
        var rect2Height = Math.abs(Math.min(points.rect1Top, points.rect2Top) - Math.max(points.rect1Bottom, points.rect2Bottom));
        var rect2Width = Math.abs(Math.max(points.rect1Left, points.rect2Left) - Math.min(points.rect1Right, points.rect2Right));

        return (parseInt(rect1Height / rect2Height) * parseInt(rect1Width / rect2Width));
    }
}

//--------------Helpers---------------

//See Note 6
function RectangArrays(strArr) {
    var str = strArr[0];
    var bigArray = str.split('),(')
    bigArray = bigArray.map(val => {
        val = val.replace(/[\(\)]/g, '');
        var pointArray = val.split(',')
        pointArray[0] = parseInt(pointArray[0], 10);
        pointArray[1] = parseInt(pointArray[1], 10);
        return pointArray;
    })
    var rect1 = bigArray.splice(0, 4);
    return [rect1, bigArray];
}

//See Note 7
function recPoints(arr) {
    var yVals = arr.map(val => val[1]);
    var xVals = arr.map(val => val[0]);
    var yMin = Math.min.apply(null, yVals);
    var yMax = Math.max.apply(null, yVals);
    var xMin = Math.min.apply(null, xVals);
    var xMax = Math.max.apply(null, xVals);

    return [[xMin, yMin], [xMax, yMax]];
}`,
            notes: [
                'First, send the input to a helper function to change the format into an array of x,y coordinates. Then assign the two sets of rectangle points to rect1 and rect2.',
                'Because the rectangles are both given to be oriented with the x-y axes, we can work with just two points from each, the bottom-left and top-right corners.',
                'In order to make it easier to deal with these points, we assign them to named values in a points object.',
                'First, test for overlap.',
                'If there is overlap, then compute the area of overlap and return number of times that area would wholly fit into area of the first rectangle, first by height, then by width, then multiply those two truncated numbers.',
                'This method takes the given argument and returns a two-element array, each element being an array of the points in the first or second rectangle, respectively.',
                'This method takes an array of points on the cartesian grid (of an aligned rectangle) and returns an array of two points, representing the lower left corner and the upper right corner of the rectangle.'
            ]
        }]
    },

    med030: {
        title: 'Medium 30',
        heading: 'Generate a Number from a Given Rule',
        description: 'Create a function, LookSaySequence(num), to take a number parameter (num) and return the next number in the sequence according to the following rule: to generate the next number in a sequence, read off the digits of the given number, counting the number of digits in groups of the same digit. For example, the sequence beginning with 1 would be: 1, 11, 21, 1211, 111221, . . . The 11 comes from there being "one 1" before it and the 21 comes from there being "two 1\'s" before it. So your program should return the next number in the sequence given num.',
        comment: null,
        solutions: [{
            heading: null,
            discuss: null,
            code: `
function LookSaySequence(num) {
    var numArr = prepFunc(num);
    var newArr = [];
    var storeArr = [];

    while (numArr.length > 0) {
        if (!newArr.length) {
            newArr.push(numArr.shift());
            if (!numArr.length) {
                storeArr.push('1');
                storeArr.push(newArr[0]);
                return parseInt(storeArr.join(''));
            }
        } else if (newArr[newArr.length - 1] === numArr[0]) {
            newArr.push(numArr.shift());
            if (!numArr.length) {
                storeArr.push(newArr.length.toString());
                storeArr.push(newArr[0]);
                return parseInt(storeArr.join(''));
            }
        } else {
            storeArr.push(newArr.length.toString());
            storeArr.push(newArr[0]);
            newArr = [];
        }
    }

    return num;

    function prepFunc(num) {
        var str = num.toString();
        var arr = str.split('');
        return arr;
    }
}`,
            notes: []
        }]
    }
}
