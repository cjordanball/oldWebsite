'use strict';

module.exports = {

    hard016: {
        title: 'Difficult 016',
        heading: 'Sort the Array, Our Way',
        description: 'Using the JavaScript language, have the function SwitchSort(arr) take an array, arr, which will be an an array consisting of integers 1 . . . size(arr) and determine what the fewest number of steps is in order to sort the array from least to greatest using the following technique: Each element E in the array can swap places with another element that is arr[E] spaces to the left or right of the chosen element. You can loop from one end of the array to the other.  For example: if arr is the array [1, 3, 4, 2] then you can choose the second element, which is the number 3, and if you count 3 places to the left you\'ll loop around the array and end up at the number 4. Then you swap these elements and arr is then [1, 4, 3, 2]. From here only one more step is required, you choose the last element which is the number 2, count 2 places to the left and you\'ll reach the number 4, then you swap these elements and you end up with a sorted array [1, 2, 3, 4].  Your program should return an integer that specifies the least amount of steps needed in order to sort the array using the following switch sort technique.  The array arr will at most contain five elements and will contain at least two elements.',
        comment: 'I believe this was the problem on which I spent the greatest amount of time, at first because it was just so difficult for me to understand the problem. After a few bloated and unsuccessful attempts, I laid it aside and came back to it several months later, redoing it from scratch.  The following approach works backwards; i.e., it takes the end result (an ordered array), then scrambles it according to the rules to get all the arrays that possibly could generate the ordered result, checking if the initial array was among them.  If not, it does the same for each of those arrays, etc., keeping track of the number of levels this was done.',
        solutions: [{
            heading: null,
            discuss: null,
            code: `
//See note 1
if (!Array.prototype.equalArr) {
    Array.prototype.equalArr = function(arr) {
        var res = true;
        if (this.length !== arr.length) return false;

        this.forEach((val, ind) => {
            if (val !== arr[ind]) res = false;
        });
        return res;
    }
}

function SwitchSort(arr) {
    var sortArr = arr.slice().sort((a, b) => a - b);
    var running = true;
    if (sortArr.equalArr(arr)) return 0;
    var counter = 0;
    var arrCopy = arr.slice()
    var arrayGroup = [arr.slice()]

    while(running < 10) {
        counter++;
        var newArrayGroup = [];
        arrayGroup.forEach(function(val) {
            newArrayGroup.push(...arrayExpand(val));
        });
        var slimArrGroup = arrUnique(newArrayGroup);
        if (slimArrGroup.some( val => {return val.equalArr(sortArr)})) return counter;

        arrayGroup = slimArrGroup;

        //See Note 2
        running++;
    }
}

//-------helpers-----------

//See Note 3
function truMod(piece, length) {
    if (piece >= 0) {
        return piece % length;
    } else {
        return (piece % length) + length;
    }
}

//See Note 4
function arrayExpand(arr) {
    var len = arr.length
    var holdArr = [];
    arr.forEach(function(val, ind) {
        if (val === len) {

        } else {
            var shift1 = truMod(ind + val, len);
            var shift2 = truMod(ind - val, len);
            var arr1 = arraySwitch(arr, shift1, ind);
            var arr2 = arraySwitch(arr, shift2, ind);
            holdArr.push(arr1);
            holdArr.push(arr2);
        }
    })
    return (holdArr);
}

//See Note 5
function arraySwitch(arr, pos1, pos2) {
    var newArr = arr.slice();
    var val1 = arr[pos1];
    var val2 = arr[pos2];
    newArr.splice(pos1, 1, val2);
    newArr.splice(pos2, 1, val1);
    return newArr;
}

function arrUnique (arr) {
    var len = arr.length;
    var holder = [];
    for (var i = 0; i < len; i++) {
        var res = holder.some(val => val.equalArr(arr[i]));
        if (!res) {
            holder.push(arr[i]);
        }
    }
    return holder;
}`,
            notes: [
                'Just for fun, I added this method to the Array prototype.',
                'The running counter is not necessary, but I put it there just to prevent an open while loop from occuring by accident while working on my solution',
                'This method returns a correct modulo value for negative numbers.',
                'This takes an array and expands it backwards to give all possibilities',
                'This method performs the actual composition of the new array'
            ]
        }]
    },

    hard017: {
        title: 'Difficult 017',
        heading: 'Calculate the Determinant of a Matrix',
        description: 'Using the JavaScript language, have the function MatrixDeterminant(strArr) read strArr which will be an array of integers represented as strings. Within the array there will also be "<>" elements which represent break points. The array will make up a matrix where the (number of break points + 1) represents the number of rows. Here is an example of how strArr may look: ["1", "2", "<>", "3", "4"]. The contents of this array are row1=[1 2] and row2=[3 4]. Your program should take the given array of elements, create the proper matrix, and then calculate the determinant. For the example above, your program should return -2. If the matrix is not a square matrix, return -1. The maximum size of strArr will be a 6x6 matrix. The determinant will always be an integer.',
        comment: null,
        solutions: [{
            heading: null,
            discuss: null,
            code: `
function MatrixDeterminant(strArr) {

    //test for square matrix
    var isSquare = isSquareChecker(strArr);
    var numRows = this.rowNum + 1;

    if (!isSquare) return -1;

    var formatted = formatArray(strArr);

        return determinant(formatted);
}

function isSquareChecker(strArr) {
    this.rowNum = strArr.filter(function(val) {
        return val === "<>";
    }).length;

    this.holdArr = strArr.filter(function(val) {
        return val !== '<>';
    });

    if (holdArr.length !== Math.pow(rowNum + 1, 2)) {
        return false;
    } else {
        return true;
    }
}

function formatArray(arr) {
    var numRows = this.rowNum + 1;
    var numArray = this.holdArr.slice(0);
    var rowArray = [];

    numArray = numArray.map(function(val) {
        return parseInt(val, 10);
    });

    for (var i = 0; i < numRows; i++) {
        var row = [];
        for (var j = 0; j < numRows; j++) {
            row.push(numArray[i * numRows + j]);
        }
        rowArray.push(row);
    }
    return rowArray;
}


function determinant(arr) {
    var numRows = arr.length;
    if (numRows === 2) {
        var ans = TwoSquareDeterminant(arr);
          return TwoSquareDeterminant(arr)
    } else {
        var numbers = arr.shift();
        var sum = 0;
        numbers.forEach(function(val, ind) {
            var minorArr = arr.map(function(val2) {
                var holdArr = val2.slice(0);
                holdArr.splice(ind, 1);
                return holdArr;
            });
            sum += Math.pow(-1, ind) * numbers[ind] * determinant(minorArr);
        });
        return sum;
    }
}


function TwoSquareDeterminant(arr) {
    return arr[0][0] * arr[1][1] - arr[0][1] * arr[1][0];
}`,
            notes: []
        }]
    },

    hard018: {
        title: 'Difficult 018',
        heading: 'Determine if King is in Check',
        description: 'Using the JavaScript language, have the function QueenCheck(strArr) read strArr, which will be an array consisting of the locations of a Queen and King on a standard 8x8 chess board with no other pieces on the board. The structure of strArr will be the following: ["(x1,y1)","(x2,y2)"] with (x1,y1) representing the position of the queen and (x2,y2) representing the location of the king with x and y ranging from 1 to 8. Your program should determine if the king is in check based on the current positions of the pieces, and if so, return the number of spaces it can move to in order to get out of check. If the king is not in check, return -1. For example: if strArr is ["(4,4)","(6,6)"] then your program should output 6. Remember, because only the queen and king are on the board, if the queen is checking the king by being directly adjacent to it, technically the king can capture the queen.',
        comment: null,
        solutions: [{
            heading: null,
            discuss: null,
            code: `
function QueenCheck(strArr) {
    var queenPos = cleanUp(strArr[0]);
    var kingPos = cleanUp(strArr[1]);

    if (checkCheck([queenPos, kingPos])) return -1;

    var kingMoves = calcKingMoves(kingPos)
        .filter(function(val) {
            return (val[0] < 9 && val[0] > 0 && val[1] < 9 && val [1] > 0);
        });

    return kingMoves.filter(function(val) {
        return (checkCheck([queenPos, val]) || (val[0] === queenPos[0] && val[1] === queenPos[1]));
    }).length;
}

//--------------------------helpers-------------------------
function cleanUp(str) {
    var strArr = str.replace(/[\(\)]/g, '').split(',');
    strArr = strArr.map(function(val) {
        return parseInt(val, 10);
    });
    return strArr;
}

function checkCheck(arr) {
    var colCheck = arr[0][0] === arr[1][0];
    var rowCheck = arr[0][1] === arr[1][1];
    var upDiagCheck = arr[0][0] - arr[0][1] === arr[1][0] - arr[1][1];
    var downDiagCheck = arr[0][0] + arr[0][1] === arr[1][0] + arr[1][1];

    return (!(colCheck || rowCheck || upDiagCheck || downDiagCheck));
}

function calcKingMoves(arr) {
    moveArr = [];
    for (var row = -1; row <= 1; row++) {
        for (var col = -1; col <= 1; col++) {
            if (col !== 0 || row !== 0) {
                moveArr.push([arr[0] + col, arr[1] + row]);
            }
        }
    }
    return moveArr
}`,
            notes: []
        }]
    },

    hard019: {
        title: 'Difficult 019',
        heading: 'Find Winning Moves on a Tic-Tac-Toe Board',
        description: 'Have the function NoughtsDeterminer(strArr) take the strArr parameter being passed which will be an array of size eleven. The array represents a tic-tac-toe board with spaces strArr[3] and strArr[7] being separators ("<>") between the rows, and the rest of the spaces will be either "X", "O", or "-", which signifies an empty space. So, for example, strArr may be ["X", "O", "-", "<>", "-", "O", "-", "<>", "O", "X", "-"]. This is a tic-tac-toe board with each row separated double arrows ("<>"). Your program should output the space in the array by which either player could win by putting down either an "X" or "O". In the array above, the output should be 2 because if an "O" is placed in strArr[2] then one of the players wins. Each board will only have one solution for a win, not multiple wins. Your output should never be 3 or 7 because those are the separator spaces.',
        comment: 'As is often the case with the "difficult" level challenges, I did not like working with the provided data as formatted, and therefore my first effort was to place the data into a 3-item array, each element of the array being a three item array representing a row of the board.  Once the data was in a friendlier format, it is put through up to four separate functions, until it returns a truthy value. The first function checks to see if there is a row winner, the second checks to see if there is a column winner, the third if there is a downward sloping diagonal winner, and the fourth to see if there is an upward sloping diagonal winner. The solution does rely on the representation that there is only one potential winner in the given data; obviously, this would be a foolhardy assumption in a real-life tic-tac-toe board.  One interesting item in the solution that I did not know when I was first learning, is shown in the series of if/else if statements.  Each of the functions that tests for a winner returns either an array of the row and column of the winner square, or the boolean false.  Normally, an "=" in an if statement is a mistake, it should not be an assignment but a comparator "==" or "===".  However, in this case, we are assigning to the variable ans the return value of the function. The assignment itself has a return value equal to the assigned value, so the expression can be evaluated to either truthy or falsy, and if falsy, then we go on to the next conditional until we get to one that works, or we return "No Solution".',
        solutions: [{
            heading: null,
            discuss: null,
            code: `
function NoughtsDeterminer(strArr) {
    var preppedArr = setUp(prep(strArr));
    var ans;

    if (ans = checkHor(preppedArr)) {
        return ansFunc(ans);
    } else if (ans = checkVert(preppedArr)) {
        return ansFunc(ans);
    } else if (ans = checkCross1(preppedArr)) {
        return ansFunc(ans);
    } else if (ans = checkCross2(preppedArr)) {
        return ansFunc(ans);
    } else {
        return "No Solution";
    }
}

//---------------helpers--------------------
//See Note 1
function prep(initArr) {
    var newData = [];
    var regExp = /[xo-]/i
    initArr.forEach(function(val) {
        if (regExp.test(val)) {
            newData.push(val.toLowerCase());
        }
    });
    return newData;
}

//See Note 2
function setUp(arr) {
    var newData0 = [arr[0], arr[1], arr[2]];
    var newData1 = [arr[3], arr[4], arr[5]];
    var newData2 = [arr[6], arr[7], arr[8]];
    return [newData0, newData1, newData2];
}

//See Note 3
function checkHor(arr) {
    for (var r = 0; r < 3; r++) {
        var counter = {x: 0, o: 0, blank: 0, position: []};
        for (var c = 0; c < 3; c++) {
            if (arr[r][c] === 'x') {
                counter.x++;
            } else if(arr[r][c] === 'o') {
                counter.o++;
            } else {
                counter.blank ++;
                counter.position.push(r);
                counter.position.push(c);
            }
        }
        if ((counter.blank === 1) && (counter.x === 2 || counter.o === 2)) {
            return (counter.position);
        }
    }
    return false;
}

//See Note 4
function checkVert(arr) {
    for (var c = 0; c < 3; c++) {
        var counter = {x: 0, o: 0, blank: 0, position: []};
        for (var r = 0; r < 3; r++) {
            if (arr[r][c] === 'x') {
                counter.x++;
            } else if (arr[r][c] === 'o') {
                counter.o++;
            } else {
                counter.blank++;
                counter.position.push(r);
                counter.position.push(c);
            }

        }
        if ((counter.blank === 1) && (counter.x === 2 || counter.o === 2)) {
            return(counter.position);
        }
    }
    return false;
}

//See Note 5
function checkCross1(arr) {
    var counter = {x: 0, o: 0, blank: 0, position: []};
    for (var i = 0; i < 3; i++) {
        if (arr[i][i] === 'x') {
            counter.x++;
        } else if (arr[i][i] === 'o') {
            counter.o++;
        } else {
            counter.blank++;
            counter.position.push(i);
            counter.position.push(i);
        }
    }
    if ((counter.blank == 1) && (counter.x === 2 || counter.o === 2))  {
        return(counter.position);
    }
    return false;
}

//See Note 6
function checkCross2(arr) {
    var counter = {x: 0, o: 0, blank: 0, position: []};
    for (var i = 0; i < 3; i++) {
        if (arr[i][2 - i] === 'x') {
            counter.x++;
        } else if (arr[i][2 - i] === 'o') {
            counter.o++;
        } else {
            counter.blank++;
            counter.position.push(i);
            counter.position.push(2 - i);
        }
    }
    if ((counter.blank === 1) && (counter.x === 2 || counter.o === 2)) {
        return(counter.position);
    }
}

function ansFunc(arr) {
    return 4 * arr[0] + arr[1];
}`,
            notes: [
                'This method takes the input data and returns an all lower-case, 9 element array.',
                'This method takes the output of prep, and returns a 3x3 array of x/o/-.',
                'This methdod checks for a winning horizontal combo.',
                'This method checks for a winning vertical combo.',
                'This method checks for a winning diagonal (downright).',
                'This method checks for a winning diagonal (upright)',

            ]
        }]
    },

    hard020: {
        title: 'Difficult 020',
        heading: 'Blackjack?',
        description: 'Using the JavaScript language, have the function BlackjackHighest(strArr) take the strArr parameter being passed which will be an array of numbers and letters representing blackjack cards. Numbers in the array will be written out. So for example strArr may be ["two","three","ace","king"]. The full list of possibilities for strArr is: two, three, four, five, six, seven, eight, nine, ten, jack, queen, king, ace. Your program should output below, above, or blackjack signifying if you have blackjack (numbers add up to 21) or not and the highest card in your hand in relation to whether or not you have blackjack. If the array contains an ace but your hand will go above 21, you must count the ace as a 1. You must always try and stay below the 21 mark. So using the array mentioned above, the output should be below king. The ace is counted as a 1 in this example because if it wasn\'t you would be above the 21 mark. Another example would be if strArr was ["four","ten","king"], the output here should be above king. If you have a tie between a ten and a face card in your hand, return the face card as the "highest card". If you have multiple face cards, the order of importance is jack, queen, then king.',
        comment: null,
        solutions: [{
            heading: null,
            discuss: null,
            code: `
function BlackjackHighest(strArr) {

    //See Note 1
    var values = {
        acelow: 1,
        two: 2,
        three: 3,
        four: 4,
        five: 5,
        six: 6,
        seven: 7,
        eight: 8,
        nine: 9,
        ten: 10,
        jack: 10.1,
        queen: 10.2,
        king: 10.3,
        ace: 11
    };
    //See Note 2
    strArr.sort(function(b, a) {
        return values[a] - values[b];
    });

    //See Note 3
    var max = strArr[0];

    //See Note 4
    var numerVals = strArr.map(function(val) {
        return Math.floor(values[val]);
    });

    //See Note 5
    var sum = numerVals.reduce(function(val1, val2) {
        return val1 + val2;
    })

    //See Note 6
    if (sum > 21) {
        if (strArr[0] === 'ace') {
            strArr[0] ='acelow';
            return BlackjackHighest(strArr);
        } else {
            return 'above ' + max;
        }
    } else if (sum === 21) {
        return 'blackjack ' + max;
    } else {
        return 'below ' + max;
    }
}`,
            notes: [
                'set up an object to convert the given string data to numbers include an alternate for aces to equal 1 if we are over 21',
                'sort the given string data based on the key-value pairs established above return a descending list, which will be a little easier to work with',
                'establish the greatest card value, which is one of the items to be returned',
                'establish an array based on the number values of the given array values',
                'sum up the values to see if it is over, under, or equal to 21',
                'if sum is greater than 21, we will take the first ace, if any, change its value from 11 to 1, then recursively call our function.  This will allow us to devalue our aces one at a time.'

            ]
        }]
    }
}
