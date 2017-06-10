'use strict'

module.exports = {

    hard026: {
        title: 'Difficult 27',
        heading: 'How Many Moves for the Knight?',
        description: 'Using the JavaScript language, have the function QuickKnight(str) read str which will be a string consisting of the location of a knight on a standard 8x8 chess board with no other pieces on the board and another space on the chess board. The structure of str will be the following: "(x y)(a b)" where (x y) represents the position of the knight with x and y ranging from 1 to 8 and (a b) represents some other space on the chess board with a and b also ranging from 1 to 8. Your program should determine the least amount of moves it would take the knight to go from its position to position (a b). For example if str is "(2 3)(7 5)" then your program should output 3 because that is the least amount of moves it would take for the knight to get from (2 3) to (7 5) on the chess board.',
        comment: null,
        solutions: [{
            heading: null,
            discuss: null,
            code: `
function QuickKnight(str) {

    //See Note 1
    var matches = str.match(/\d/g).map(function(val) {
        return parseInt(val, 10);
    });

    //See Note 2
    var kn = [matches[0], matches[1]];
    var qu = [matches[2], matches[3]];

    //See Note 3
    var hits = [kn];
    var go = 0;
    var counter = 0;

    //See Note 4
    while(go < 100) {
        counter++;
        var hotList = [];
        hits.forEach(function(val) {
            var valHits = hitList(val);
            hotList.push(...valHits);
        });
        if (hotList.find(function(val, ind) {
            return (val[0] === qu[0] && val[1] === qu[1]);
        })) {
            return counter;
        } else {
            hits = uniqArr(hotList);
        }
        go++
    }

    return hitList(kn);
}


//--------------------------Helpers--------------------------------

//See Note 5
var hitList = function(arr) {
    var holdArr = [];
    holdArr.push(   [arr[0]+2, arr[1]+1],
                    [arr[0]+2, arr[1]-1],
                    [arr[0]-2, arr[1]-1],
                    [arr[0]-2, arr[1]+1],
                    [arr[0]+1, arr[1]+2],
                    [arr[0]-1, arr[1]+2],
                    [arr[0]+1, arr[1]-2],
                    [arr[0]-1, arr[1]-2])

    holdArr = holdArr.filter(function(val) {
        return( val[0] > 0 && val [0] < 9 && val[1] > 0 && val[1] < 9);
    });

    return holdArr
}.bind(null);

//See Note 6
var uniqArr = function(arr) {
    var uniqObj = {};
    var uniqArr = [];
    arr.forEach(function(val) {
        var nameStr = val[0].toString() + val[1].toString();
        uniqObj[nameStr] = val;
    });
    for (var key in uniqObj) {
        uniqArr.push(uniqObj[key]);
    }
    return uniqArr;
}.bind(null);`,
            notes: [
                'Get the four values and turn them into numbers.',
                'Turn the starting and target positions into [x,y] arrays, then start at kn(ight) and (optimistically) target the qu(een).',
                'Put kn in an array, "hits".  This will be the array of possible locations at each stage.',
                'Put a counter ("go") on the while loop just in case there is a typo to prevent endless looping.',
                'HitList takes a board square and returns all the possible squares on which the knight could land.',
                'UniqArr takes an array of positions and weeds out multiple entries.'
            ]
        }]
    },

    hard027: {
        title: 'Difficult 27',
        heading: 'Smallest Square of Given Number of Digits',
        description: 'Using the JavaScript language, have the function SquareFigures(num) read num which will be an integer. Your program should return the smallest integer that when squared has a length equal to num. For example: if num is 6 then your program should output 317 because 317^2 = 100489 while 316^2 = 99856 which does not have a length of six.',
        comment: null,
        solutions: [{
            heading: null,
            discuss: null,
            code: `
function SquareFigures(num) {
    if (num === 1) return 0;
    var minZeroes = Math.ceil(num / 2) - 1;
    var start = "1" + "0".repeat(minZeroes);
    var startNum = parseInt(start, 10);
    var long = false;

    while (!long) {
        var testNum = Math.pow(startNum, 2)
        var testNumString = testNum.toString();
        if (testNumString.length === num) {
            return parseInt(startNum, 10);
        } else {
            startNum++;
        }
    }
}`,
            notes: []
        }]
    },

    hard028: {
        title: 'Difficult 28',
        heading: 'Check for Connect-Four Winning Move',
        description: 'Using the JavaScript language, have the function ConnectFourWinner(strArr) read the strArr parameter being passed which will represent a 6x7 Connect Four board. The rules of the game are: two players alternate turns and place a colored disc down into the grid from the top and the disc falls down the column until it hits the bottom or until it hits a piece beneath it. The object of the game is to connect four of one\'s own discs of the same color next to each other vertically, horizontally, or diagonally before your opponent. The input strArr will represent a Connect Four board and it will be structured in the following format: ["R/Y", "(R, Y, x, x, x, x, )", "(...)", "(...)", ...)] where R represents the player using red discs, Y represents the player using yellow discs and x represents an empty space on the board. The first element of strArr will be either R or Y and it represents whose turn it is. Your program should determine, based on whose turn it is, whether a space exists that can give that player a win. If a space does exist your program should return the space in the following format: (RxC) where R=row and C=column. If no space exists, return the string "none." The board will always be in a legal setup.  For example, if strArr is: ["R", "(x, x, x, x, x, x, x)", "(x, x, x, x, x, x, x)", "(x, x, x, x, x, x, x)","(x, x, x, R, x, x, x)", "(x, x, x, R, x, x, x)", "(x, x, x, R, Y, Y, Y)"] then your program should return (3x4).  Another example, if strArr is: ["Y", "(x, x, x, x, x, x, x)", "(x, x, x, x, x, x, x)", "(x, x, x, x, x, x, x)", "(x, x, Y, Y, x, x, x)", "(x, R, R, Y, Y, x, R)", "(x, Y, R, R, R, Y, R)"] then your program should return (3x3)',
        comment: null,
        solutions: [{
            heading: null,
            discuss: null,
            code: `
function ConnectFourWinner(strArr) {

    //See Note 1
    this.color = strArr.shift();

    //See Note 2
    this.regEx = new RegExp (this.color.repeat(4),'i');
    //See Note 3
    var prettyArr = prettify(strArr);
    //See Note 4
    this.placeArr = placement(prettyArr);

    //See Note 5
    for (var i = 0; i < 7; i++) {
        var testArr = createTestArr(prettyArr, i);
        if (!testArr) continue;
        //See Note 6
        if (isRow(testArr[0]) || isCol(testArr[0]) || isDiag(testArr[0])) {
            return '(' +  (testArr[1] + 1) + 'x' + (i + 1) + ')';
        }
    }

    return 'none';
};


//------------------------------helpers-------------------------------
//See Note 7
function prettify(arr) {
    resArr = arr.map(function(val) {
        return val.replace(/[\(\)]/g, '').split(',');
    })
    return resArr;
}
//See Note 8
function placement(arr) {
    var resArr = [];
    arr.forEach(function(row, rowInd) {
        row.forEach(function(col, colInd) {
            if (col === this.color) {
                resArr.push([rowInd, colInd]);
            }
        });
    });
    return resArr;
}
//See Note 9
function createTestArr(arr, col) {
    var copy;
    var arrCopy = arrayCopier(arr);
    for (var row = 0; row < 6; row++) {
        if (arrCopy[row][col] !== 'x' && row !== 0) {
            arrCopy[row - 1][col] = this.color;
            return [arrCopy, row - 1];
        }
        if (row === 5 && arrCopy[row][col] === 'x') {
            arrCopy[row][col] = this.color;
            return [arrCopy, row]
        }
    }
    return null;
}
//See Note 10
function isRow (arr) {
    var len = arr.length;
    for (var i = 0; i < len; i++) {
        var valStr = arr[i].join('');
        if (this.regEx.test(valStr)) return true;
    }
    return false;
}
//See Note 11
function isCol (arr) {
    var rowNum = arr.length;
    var colNum = arr[0].length;
    var flipArr = [];
    for (var col = 0; col < colNum; col++) {
        flipArrRow = [];
        for (var row = 0; row < rowNum; row++) {
            flipArrRow.push(arr[row][col])
        }
        flipArr.push(flipArrRow);
    }
    var flipLen = flipArr.length;
    for (var i = 0; i < flipLen; i++) {
        var valStr = flipArr[i].join('');
        if (this.regEx.test(valStr)) return true;
    }
    return false;
}
//See Note 12
function isDiag(arr) {
    var places = placement(arr);
    var placesLen = places.length;

    for(var i = 0; i < placesLen; i++)  {
        var vert = places[i][0] <= 2 ? 'd' : 'u';
        var hor = places[i][1] <= 2 ? 'r' : (places[i][1] >= 4 ? 'l' : 'b');
        var type = vert + hor;
        var counter = 0;
        switch (type) {
            case 'dr':
                if (arr[places[i][0]+1][places[i][1]+1] === this.color &&
                    arr[places[i][0]+2][places[i][1]+2] === this.color &&
                    arr[places[i][0]+3][places[i][1]+3] === this.color) {
                    return true;
                }
                break;
            case 'dl':
                if (arr[places[i][0]+1][places[i][1]-1] === this.color &&
                    arr[places[i][0]+2][places[i][1]-2] === this.color &&
                    arr[places[i][0]+3][places[i][1]-3] === this.color)
                return true;
                break;
            case 'ur':
                if (arr[places[i][0]-1][places[i][1]+1] === this.color &&
                    arr[places[i][0]-2][places[i][1]+2] === this.color &&
                    arr[places[i][0]-3][places[i][1]+3] === this.color)
                return true;
                break;
            case 'ul':
                if (arr[places[i][0]-1][places[i][1]-1] === this.color &&
                    arr[places[i][0]-2][places[i][1]-2] === this.color &&
                    arr[places[i][0]-3][places[i][1]-3] === this.color)
                return true;
                break;
            case 'db':
                if ((arr[places[i][0]+1][places[i][1]+1] === this.color &&
                    arr[places[i][0]+2][places[i][1]+2] === this.color &&
                    arr[places[i][0]+3][places[i][1]+3] === this.color) ||
                    (arr[places[i][0]+1][places[i][1]-1] === this.color &&
                    arr[places[i][0]+2][places[i][1]-2] === this.color &&
                    arr[places[i][0]+3][places[i][1]-3]))
                return true;
                break;
            case 'ub':
                if ((arr[places[i][0]-1][places[i][1]+1] === this.color &&
                    arr[places[i][0]-2][places[i][1]+2] === this.color &&
                    arr[places[i][0]-3][places[i][1]+3] === this.color) ||
                    (arr[places[i][0]-1][places[i][1]-1] === this.color &&
                    arr[places[i][0]-2][places[i][1]-2] === this.color &&
                    arr[places[i][0]-3][places[i][1]-3] === this.color))
                return true;
                break;
        }
    }
    return false;
}
//See Note 13
function arrayCopier(arr) {
    var outArr = [];
    arr.forEach(function(val, ind) {
        outArr[ind] = Array.isArray(val) ? arrayCopier(val) : val;

    })
    return outArr;
}`,
            notes: [
                'Get the color from the input and pin it to the global scope',
                'Create the regExp that we are going to use to test in the row and column',
                'Convert the gameboard to an array of arrays, just to be easier to work with',
                'Get an array of all the places where color currently exists.',
                'try the seven potential boards after next moves',
                'run row, column and diagonal tests on each board, returning if a winner',
                'convert the input data into an array of arrays',
                'get an array of all places where the color exists',
                'create the board, after a move on column col',
                'test to see if four in a row',
                'test to see if four in a column.  It rotates the board and tests as in isRow',
                'test to see if four in a diagonal',
                'utility function to deep copy an array (note: just for arrays - not object elements).'
            ]
        }]
    },

    hard029: {
        title: 'Difficult 29',
        heading: 'Round Trip Checker',
        description: 'Using the JavaScript language, have the function ArrayJumping(arr) take the array of numbers stored in arr and first determine the largest element in the array, and then determine whether or not you can reach that same element within the array by moving left or right continuously according to whatever integer is in the current spot. If you can reach the same spot within the array, then your program should output the least amount of jumps it took. For example: if the input is [2, 3, 5, 6, 1] you\'ll start at the spot where 6 is and if you jump 6 spaces to the right while looping around the array you end up at the last element where the 1 is. Then from here you jump 1 space to the left and you\'re back where you started, so your program should output 2. If it\'s impossible to end up back at the largest element in the array your program should output -1. The largest element in the array will never equal the number of elements in the array. The largest element will be unique.',
        comment: 'We will do this problem by counting backwards.  We know we have to start at home, and end at home (or return -1). Therefore, start by seeing which spots in the array lead to home, which I will call "hotspots."  Then see which spots lead to a hotspot, etc. Keep count of how many times we do this. If we ever come to a point that there are no hotspots, then return -1. If home is ever a hotspot, then stop and return the number kept in counter.',
        solutions: [{
            heading: null,
            discuss: null,
            code: `
function ArrayJumping(arr) {
    var len = arr.length;
    var max = Math.max.apply(null, arr);
    var home = arr.findIndex(function(val){
        return val === max;
    });

    //See Note 1
    var hotspots = [];
    arr.forEach(function(val, ind) {
        var east = (ind + val) % len;
        var west = ind - val < 0 ? ((ind - val) % len) + len : (ind - val) % len;
        hotspots.push([east, west]);
    });
    var counter = 0;
    var target = [home];
    var test = true;
    var holdArr = [];
    var memArr = [];
    while (counter < 100) {
        memArr.push(target);
        counter++;
        target.forEach(function(val, ind) {
            hotspots.forEach(function(val, ind) {
                if (contains(val[0], target) || contains(val[1], target)) {
                    holdArr.push(ind);
                }
            });
        })
        holdArr = uniq(holdArr);
        if (holdArr.length === 0 || memArr.some(function(val){
            return eqArr(val, holdArr);
        })
            ) {
            return holdArr.find(function(val) { return val === home}) ? counter : -1;
        } else if (contains(home, holdArr)) {
            return counter;
        } else {
            target = holdArr.slice();
            holdArr = [];
        }
    }
}
//-----------------------------Helpers------------------------------
function contains(needle, haystack) {
    return haystack.some(function(val) {
        return needle === val;
    });
}

function uniq(arr) {
    var obj = {};
    arr.forEach(function(val) {
        obj[val] = true;
    });
    var newArr = Object.keys(obj);

    return newArr.map(function(val) {
        return parseInt(val, 10);
    })
}

function eqArr(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    return arr1.every(function(val, ind) {
        return val === arr2[ind];
    });
}`,
            notes: [
                'Create an array containing the next moves for each position, in an array with the landing point going to the right, and a landing point going to the left. <b>Important learning point:</b> JavaScript does not return correctly for negative numbers with the modulo operator.'
            ]
        }]
    },

    hard030: {
        title: 'Difficult 30',
        heading: 'Manipulate Structure of an Array',
        description: 'Using the JavaScript language, have the function MatrixBorder(strArr) read the strArr parameter being passed which will represent an NxN matrix filled with 1\'s and 0\'s. Your program should determine the number of swaps between two rows or two columns that must be made to change the matrix such that the border of the matrix contains all 1\'s and the inside contains 0\'s. The format of strArr will be: ["(n, n, n...)", "(...)", ...] where n represents either a 1 or 0. The smallest matrix will be a 3x3 and the largest will be a 6x6 matrix.  For example: if strArr is: ["(0, 1, 1)", "(1, 1, 1)", "(1, 1, 1)"] then you can swap the first two columns and then swap the first two rows to create a matrix with the 1\'s on the border and the 0 on the inside, therefore your program should output 2.',
        comment: null,
        solutions: [{
            heading: null,
            discuss: null,
            code: `
function MatrixBorder(strArr) {
    var len = strArr.length;
    //format strArr as an array of arrays
    strArr = strArr.map(function(val) {
        var newVal = val.replace(/\(/g, '')
                        .replace(/\)/g, '');
        return newVal.split(',');
    });
    //check to see if the right number of elements exist in each row
    if (strArr.some(function(val) {
        return val.length !== len;
    })){
        return "Error: incompatible input"
    }

    var revArr = strArr.slice(0);
    var twistArr = strArr.slice(0);
    var revTwistArr = strArr.slice();
    revArr.reverse();
    twistArr = twister(twistArr);
    revTwistArr = twister(revTwistArr).reverse();

    return (fromTop(strArr) + fromTop(revArr) + fromTop(twistArr) + fromTop(revTwistArr));

}

function twister(arr) {
    var len = arr.length;
    var holdArr = []
    for (var r = 0; r < len; r++) {
        var row = [];
        for (var c = 0; c < len; c++) {
            row.push(arr[c][r]);
        }
        holdArr.push(row)
    }
    return holdArr;
}

function fromTop(arr) {
    return arr.findIndex(function(val) {
        return val.every(function(val2) {
            return val2 === '1';
        });
    });
}`,
            notes: []
        }]
    }
}
