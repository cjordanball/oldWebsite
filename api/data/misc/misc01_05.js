'use strict';

module.exports =  {
    misc001: {
            title: 'Bowling',
            heading: 'Compute a Bowling Score',
            description: 'Create a function that will take an array as an argument, which array will contain the number of pins knocked down on each throw in a game of bowling and compute the total score.',
            comment: 'This was actually a problem given me on a coding interview. I have worked it up below using an object oriented approach, employing some of the ES6 syntax, such as the class declaration and the use of a set method.',
            solutions: [{
                heading: '',
                discuss: '',
                code: `
'use strict';
//See Note 1
class Bowling {
    constructor() {
        this._score = 0;
    }

    //See Note 2
    set score(input) {
        this._score = input ;
    }

    //See Note 3
    computeScore(arr) {
        //See Note 4
        let first = true;
        let frameNumber = 1;
        let frameScore = 0;
        let totalScore = 0;
        let counter = 0;
        //See Note 5
        this._score.push('end');

        while (frameNumber <= 10 & typeof this._score[counter] !== 'string') {
            //See Note 6
            if (first) {
                if (this._score[counter] === 10) {
                    totalScore += this._score[counter] + this._score[counter + 1] + this._score[counter + 2];
                    frameNumber++;
                } else {
                    first = !first;
                    frameScore += this._score[counter];
                }
            } else {
                frameScore += this._score[counter];
                totalScore += frameScore === 10 ? frameScore += this._score[counter + 1] : frameScore;
                first = !first;
                frameNumber++;
                frameScore = 0;
            }
            counter++;
        }
        return frameNumber === 11 ? totalScore : "Incomplete scorekeeping.";
    }
}`,
                notes: ['First, create a class "Bowling", containing all we need to figure out the score.',
                        'Provide a method to input the bowling score array.',
                        'Provide a method with the logic to compute the bowling score.',
                        'The variable first keeps track of whether we are dealing with the first or second throw of the frame.',
                        'Just in case the input is not a complete bowling score, don\'t get stuck in a while loop;',
                        'If we are on the first throw of the frame.'

                ]
            },
        ]
    },

    misc002: {
            title: 'MergeSort ',
            heading: 'Sort an Array of Numbers',
            description: 'The following function takes an array of numbers and sorts it from smallest to largest, using the MergeSort algorithm. In brief, this sorting method takes an array of items and divides them up into two-item units. It then sorts each pair.  Then, it takes the sorted pairs and merges them. Since each group is already sorted, it only needs to look at the first item in group to determine what the next item in the output group will be. With an asymptotic run time of n(logn), it is a very efficient sorting method. The function below takes in an unsorted array. The while loop in the main method keeps returning the array to the merge function until there is only a single array remaining as an element of the original array. For example, if we started with 32 items, the firt trip to the merge() method will return an array containing 16 two-item arrays, each sorted. The second trip will return 8 four-item arrays, each sorted, and so forth.',
            comment: '',
            solutions: [{
                heading: '',
                discuss: '',
                code: `
"use strict";

function mergeSort(arr) {
    var lengthOfArr = arr.length;
    while (lengthOfArr > 1) {
        arr = merge(arr);
        lengthOfArr = arr.length;
    }
    return arr[0];
}

//----------helpers----------

function merge (arr) {
    //See Note 1
    var extra;
    var newArr = [];
    var turns = Math.floor(arr.length / 2);
    if (arr.length % 2) {
        extra = arr.pop();
        if (typeof extra === 'number') {
            extra = [extra];
        }
    }
    //See Note 2
    for (var i = 0; i < turns; i++) {
        var place = i * 2;
        var holdArr = [];
        var first = arr[place];
        var second = arr[place + 1];
        //See Note 3
        if (typeof arr[0] === 'number') {
            if (first < second) {
                holdArr.push(first);
                holdArr.push(second);
            } else {
                holdArr.push(second);
                holdArr.push(first);
            }
            newArr.push(holdArr);
        } else {
            while (first.length || second.length) {
                if (first[0] < second[0] || !second.length) {
                    holdArr.push(first.shift());
                }
                else {
                    holdArr.push(second.shift());
                }
            }
            newArr.push(holdArr);
        }
    }
    if (extra) newArr.push(extra);
    return newArr;
}

//See Note 4
let thisArr = (function() {
    let mixedArr = [];
    for (let i = 0; i < 100; i++) {
        mixedArr.push(Math.floor(Math.random() * 1000));
    }
    return mixedArr;
}());

console.log(mergeSort(thisArr));
`,
                notes: [
                    'Since we don\'t know our array will contain an even power of two number of items, we must deal with the likelihood that continually halving our number of items will eventually result in an odd number. The "extra" variable deals with this eventuality.',
                    'We go through the array in 2-item steps, i.e., taking items 0 and 1 and merging them, then items 2 and 3, etc.',
                    'The first time we use the merge() method, we will have an array of numbers. After that, we will have an array of arrays of nubers, so we have two alternates for proecessing the input array.',
                    'This snippet generates a mixed up array to use to test our function.'
                ]
            },
        ]
    },


    misc003: {
            title: '',
            heading: '',
            description: '',
            comment: '',
            solutions: [{
                heading: '',
                discuss: '',
                code: ``,
                notes: [

                ]
            },
        ]
    }
}
