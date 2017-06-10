'use strict';

module.exports = {

    hard001: {
        title: 'Difficult 1',
        heading: 'Sudoku Puzzle Checker',
        description: 'Using the JavaScript language, have the function SudokuQuadrantChecker(strArr) read the strArr parameter being passed which will represent a 9x9 Sudoku board of integers ranging from 1 to 9. The rules of Sudoku are to place each of the 9 integers integer in every row and column and not have any integers repeat in the respective row, column, or 3x3 sub-grid. The input strArr will represent a Sudoku board and it will be structured in the following format: ["(N,N,N,N,N,x,x,x,x)","(...)","(...)",...)] where N stands for an integer between 1 and 9 and x will stand for an empty cell. Your program will determine if the board is legal; the board also does not necessarily have to be finished. If the board is legal, your program should return the string legal but if it isn\'t legal, it should return the 3x3 quadrants (separated by commas) where the errors exist. The 3x3 quadrants are numbered from 1 to 9 starting from top-left going to bottom-right.',
        comment: null,
        solutions: [{
            heading: null,
            discuss: null,
            code: `
function SudokuQuadrantChecker(strArr) {
    //See Note 1
    strArr = strArr.map(function(val) {
        return val.replace(/[\(\)]/g, '').split(',');
    })
    //See Note 2
    var copy1Arr = strArr.slice(0);
    var copy2Arr = strArr.slice(0);
    var holdObj = {};

    //See Note 3
    strArr.forEach(function(val, ind) {
        rowTester(val, ind);
    });

    //Part II - See Note 4

    //See Note 5
    copy1Arr[0].forEach(function(val, ind) {
        vertArr = [];
        for (var i = 0; i < 9; i++) {
            vertArr.push(copy1Arr[i][ind]);
        }
        vertTester(vertArr, ind);
    });

    //Part III - See Note 6

    for (var a = 0; a < 3; a++) {
        for (var b = 0; b < 3; b++) {
            var blockArr = [];
            for (var i = 0; i < 3; i++) {
                for (var j = 0; j < 3; j++) {
                    blockArr.push(copy2Arr[a * 3 + i][b * 3 + j]);
                }
            }
            blockTester(blockArr, a.toString() + b.toString());
        }
    }

    var blocks = Object.keys(holdObj);

    if (!blocks.length) {
        return 'legal'
    } else {
        blocks = blocks.map(function(val) {
            return parseInt(val, 3) + 1;
        }).sort();

        return blocks.join(',');
    }

//---------------------helper functions----------------------

    function rowTester(arr, num) {
        //See Note 7

        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 9; j++) {
                if (arr[i] !== 'x' && arr[i] === arr[j] && i !== j) {
                    var rep1 = Math.floor(num / 3).toString() + Math.floor(i / 3).toString();
                    var rep2 = Math.floor(num / 3).toString() + Math.floor(j / 3).toString();
                    rep1 in holdObj ? holdObj[rep1]++ : holdObj[rep1] = 1;
                }
            }
        }

    }

    function vertTester(arr, num) {
        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 9; j++) {
                if (arr[i] !== 'x' && arr[i] === arr[j] && i !== j) {
                    var rep1 = Math.floor(i / 3).toString() + Math.floor(num / 3).toString();
                    var rep2 = Math.floor(j / 3).toString() + Math.floor(num / 3).toString();
                    rep1 in holdObj ? holdObj[rep1]++ : holdObj[rep1] = 1;
                }
            }
        }

    }

    function blockTester(arr, block) {
        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 9; j++) {
                if (arr[i] !== 'x' && arr[i] === arr[j] && i !== j) {
                    block in holdObj ? holdObj[block]++ : holdObj[block] = 1;
                }
            }
        }
    }

}`,
            notes: [
                'Clean the array from array of strings to an array of nine nine-member arrays.',
                'Make two new copies of the array to be used and an empty array to hold bad blocks.',
                'Val is the row string, ind is the row number - send each to rowTester',
                'Organize arrays based on columns and send to vertTester method for checking',
                'Create a "row" out of each column, and send it to vertTester. VertTester will be exactly the same as rowTester, except the output will be inverted to give the correct blocks.',
                'Create a "row" out of each block, and send it to blockTester. BlockTester will be exactly the same as rowTester, except the output will be the offending blocks.',
                'Format the string as an array of nine number strings.'

            ]
        }]
    },

    hard002: {
        title: 'Difficult 2',
        heading: 'Determine Least Cost for Machine Operation',
        description: 'Create a function, OptimalAssignments(strArr), that will take an array of strings, (strArr), which will represent an NxN matrix and which will be in the following format: ["(n,n,n...)","(...)",...] where the n\'s represent integers. This matrix represents a machine at row i performing task at column j. The cost for this is matrix[i][j]. Your program should determine what machine should perform what task so as to minimize the whole cost and it should return the pairings of machines to tasks in the following format: (i-j)(...)... Only one machine can perform one task. For example: if strArr is ["(5,4,2)","(12,4,3)","(3,4,13)"] then your program should return (1-3)(2-2)(3-1) because assigning the machines to these tasks gives the least cost. The matrix will range from 2x2 to 6x6, there will be no negative costs in the matrix, and there will always be a unique answer.',
        comment: null,
        solutions: [{
            heading: null,
            discuss: null,
            code: `
function OptimalAssignments(arr) {
    var len = arr.length;

    //get list of permutations
    var cmdLines = orderStrings(len);

    //See Note 1
    var workArray = convertArray(arr);

    //See Note 2
    var cmdLinesScores = cmdLines.map(function(val){
        return [val, scoreMaker(val)];
    })

    //See Note 3
    cmdLinesScores.sort(function(a, b) {return(b[1] - a[1])});
    var rawAnswer = cmdLinesScores.pop()[0];

    //See Note 4
    return (ansConvert(rawAnswer));


//See Note 5
//---------------------helper functions--------------------

    function orderStrings(num){
        var numArr = [];
        for (var i = 0; i < num; i++){
            numArr[i] = i + 1;
        }
        var result = allPerms(numArr).map(function(val) {
            return val.join('');
        });
        return result;
    }

    function allPerms(inputArray) {
        var data = inputArray;
        var resultArray = [];
        var len = data.length;

        if (len === 0) {
            return [[]];
        }
        else {
            var first = data.shift();
            var words = allPerms(data);
            words.forEach(function(word) {
                for (var i = 0; i < len; ++i) {
                    var tmp = word.slice();
                    tmp.splice(i, 0, first)
                    resultArray.push(tmp);
                }
            });
        }
        return resultArray;
    }

    function convertArray(arr) {
        pattern = /(\d+)/g;
        newArr = [];

        var newArr = arr.map(function(val, ind){
            pattern = /(\d+)/g;
            holdArr = [];
            do {
                var test = pattern.exec(val);
                if (test) {
                    holdArr.push(parseInt(test[1]));
                }
            }
            while (pattern.lastIndex > 0);
            return holdArr;
        });
        return newArr;
    }
    function scoreMaker(orderString) {
        var orderArr = orderString.split('');
        var holdArr = workArray.map(function(val, ind) {
            return val[orderArr[ind] - 1];
        });
        var score = holdArr.reduce(function(first, last){
            return first + last;
        });
        return score;
    }
    function ansConvert(str) {
        var res = '';
        for (var i = 0; i < len; i++) {
            res = res + '(' + (i+1) + '-' + rawAnswer[i] + ')';
        }
        return res;
    }
}`,
            notes: [
                'Convert the array of strings to an array of number arrays.',
                'Attach to each item in the cmdLine permutation a score.',
                'Sort the scores from greatest to least, and return the most efficient in string form.',
                'Convert the answer into the required format, and return.',
                'For now, let\'s make a function that gives a score based on a sequence input.'
            ]
        }]
    },

    hard003: {
        title: 'Difficult 3',
        heading: 'Determine if a Path is Transitive',
        description: 'Using the JavaScript language, have the function TransitivityRelations(strArr) read the strArr parameter being passed which will make up an NxN matrix where the rows are separated by each pair of parentheses (the matrix will range from 2x2 to 5x5). The matrix represents connections between nodes in a graph where each node corresponds to the Nth element in the matrix (with 0 being the first node). If a connection exists from one node to another, it will be represented by a 1, if not it will be represented by a 0. For example: suppose strArr were a 3x3 matrix with input ["(1,1,1)","(1,0,0)","(0,1,0)"], this means that there is a connection from node 0->0, 0->1, and 0->2. For node 1 the connections are 1->0, and for node 2 the connections are 2->1. This can be interpreted as a connection existing from node X to node Y if there is a 1 in the Xth row and Yth column. Note: a connection from X->Y does not imply a connection from Y->X. What your program should determine is whether or not the matrix, which represents connections among the nodes, is transitive. A transitive relation means that if the connections 0->1 and 1->2 exist, for example, then there must exist the connection 0->2. More generally, if there is a relation xRy and yRz, then xRz should exist within the matrix.  If a matrix is completely transitive, return the string "transitive." If it isn\'t, your program should return the connections needed, in the following format, in order for the matrix to be transitive: (N1,N2)-(N3,N4)-(...). So for the example above, your program should return (1,2)-(2,0). You can ignore the reflexive property of nodes in your answers. Return the connections needed in lexicographical order [e.g. (0,1)-(0,4)-(1,4)-(2,3)-(4,1)].',
        comment: 'Test each possible combination of three items, example 0*1*2, 0*2*1, 1*0*2, 1*2*0, etc. Replace the * with a - if the connection exists.  Then check for a connection between the first and last items.  If no connections exist okay.  If one connection exists, okay. If three connections exist, okay.  If TWO connections exist, we must add a connection to make it transitive.  Question: Do we just figure out missing connections, or do we then insert the missing connections (first level) and solve again, etc., until it is stable?',
        solutions: [{
            heading: null,
            discuss: null,
            code: `
function TransitivityRelations(strArr) {
    var len = strArr.length;
    var paths = groupings(len, len);
    var newArr = prepArr(strArr);
    var mark1Arr = endMark(newArr, paths);
    var mark2Arr = markUp(newArr, mark1Arr);
    mark2Arr = mark2Arr.map(function(val) {
        return val + val[0];
    });
    var tests = mark2Arr.filter(function(val) {
        return /-\d\-/.test(val);
    });
    var searchResArray = [];
    tests.forEach(function(val) {
        var test3 = val.match(/\d\-\d\-\d/g) || [];
        var test4 = val.match(/\d\-\d\-\d-\d/g) || [];
        var test5 = val.match(/\d\-\d\-\d\-\d\-\d/g) || [];
        searchResArray.push(...test3, ...test4, ...test5);
    });

    var res = [];
    searchResArray.forEach(function(val) {
        var first = val.slice(0,1);
        var second = val.slice(-1);
        if (!parseInt(newArr[first][second], 10)) {
            res.push('(' + first + ',' + second + ')');
        }
    });
    if (!res.length) return 'transitive';

    res = uniq(res).sort();

    return res.join('-');

}

//---------------------Helper Functions---------------------------

function uniq(arr) {
    var obj = {};
    arr.forEach(function(val) {
        obj[val] = true;
    });
    return Object.keys(obj);
}

//See Note 1
function prepArr(arr) {
    //See Note 2
    newInput = arr.map(function(val) {
        nums = val.match(/\d/g);
        return nums;
    });
    return newInput;
}

//See Note 3
function endMark(newArr, paths) {
    var arr = paths.map(function(val) {
        var begin = val[0];
        var end = val[val.length - 1];
        if (parseInt(newArr[begin][end], 10)) {
            return val.concat('-');
        } else {
            return val.concat('*');
        }
    });

    return arr;
}

//See Note 4
function markUp(arr, pathArr) {
    var len = arr.length;
    var copyArr = [];
    pathArr.forEach(function(val, ind) {
        var str = pathArr[ind][0];
        for (var i = 0; i < len - 1; i++) {
            var begin = pathArr[ind][i];
            var end = pathArr[ind][i + 1];
            if (parseInt(arr[begin][end])) {
                str += ('-' + end);
            } else {
                str += ('*' + end)
            }
        }
        copyArr.push(str);
    });

    return copyArr;

}

//See Note 5
function groupings(arrLen) {
    var theArray = [];
    for(var i = 0; i < arrLen; i++) {
        theArray.push(i.toString());
    }

    var newArr = permutations(theArray);

    newArr = newArr.map(function(val){
        return val.slice(0, arrLen);
    });
    holdArr = [];
    newArr.forEach(function(val, ind) {
        if(ind % skipper === 0) {
            holdArr.push(val);
        }
    });
    return newArr;
}

//See Note 6
function permutations(arr) {

    //create an array of form ['str', [arr]]
    var newArr = ['', arr];

    return (reduction(rollover(newArr)));
}

//See Note 7
function rollover (arr) {
    if (arr[1].length === 1) {
        arr[0] += arr[1];
        return arr[0];
    }
    else {
        var itemArr = arr[1];
        var holdArr = [];
        var len = itemArr.length;
        for (var i = 0; i < len; i++) {
            forArr = itemArr.map(function(val) {
                return val;
            });
            forArr.splice(i, 1);
            var cons = arr[0] + arr[1][i];
            holdArr.push(rollover([cons,forArr]));
        };
        return holdArr;
    }
}

//See Note 8
function reduction(arr) {
    if (Array.isArray(arr[0])) {
        var holdArr = arr.reduce(function(first, last) {
            return first.concat(last);
        });
        return reduction(holdArr);
    }
    else {
        return arr;
    }
}

function factorial(num) {
    var intNum = parseInt(num, 10);
    if (num < 0) return null;
    if(num === 0) {
        return 1;
    }
    else if(num === 1) {
        return 1;
    }
    else {
        return num * factorial(num - 1);
    }
}`,
            notes: [
                'Take the original ["(1,1,1,1)"] form and convert to [["1","1","1","1"], etc. ] form.',
                'Convert the string array to an array of four arrays.',
                'Puts a "-" at the end if the first element is connected to the last and puts an "*" at the end if the first element is not connected to the last.',
                'Takes the 1/0 array and uses it to place hyphens between nodes with connections.',
                'This function finds all the distinct groupings of strLen objects of an array n objects long. It works a bit messily, taking the array of all permutations of all array elements, chopping off the last unwanted length - n objects, then taking every (length - n)! of that list.',
                'The permutations function delivers all the possible arrangements of n distinct letters.',
                'The rollover function takes an array in the form ["",[a, b, c, . . .]] and returns a nested array containing all the permutations containing n items, using each item only once. However, to use, one must use the reduction()function to get back to a single level array.',
                'The reduction function takes an array nested several levels and flattens it by concatenation.'


            ]
        }]
    },

    hard004: {
        title: 'Difficult 4',
        heading: 'Determine the Shortest Path',
        description: 'Create a function, ShortestPath(strArr), that takes an array of strings (strArr), which models a non-looping graph. The structure of the array will be as follows: The first element in the array will be the number of nodes N (points) in the array as a string. The next N elements will be the nodes which can be anything (A, B, C . . ., Brick Street, Main Street, . . . ,etc.).  Then after the Nth element, the rest of the elements in the array will be the connections between all of the nodes. They will look like this: (A-B, B-C, . . ., Brick Street-Main Street, . . ., etc.). However, there may exist no connections at all.  An example of strArr may be: ["4","A","B","C","D","A-B","B-D","B-C","C-D"].  It may help to visualize the graph by drawing out the nodes and their connections. Your program should return the shortest path from the first Node to the last Node in the array, separated by dashes.  So in the example above the output should be A-B-D.  Here is another example with strArr being ["7","A","B","C","D","E","F","G","A-B","A-E", "B-C","C-D","D-F","E-D","F-G"].  The output for this array should be A-E-D-F-G.  There will only ever be one shortest path for the array. If no path between the first and last node exists, return -1.  The array will, at minimum, have two nodes. Also, the connection A-B, for example, means that A can get to B and B can get to A.',
        comment: null,
        solutions: [{
            heading: null,
            discuss: null,
            code: `
function ShortestPath(strArr){

    //See Note 1
    var nodeNum = parseInt(strArr.shift());

    var newArr = strArr.map(function(val){return val});

    //See Note 2
    var modArr = convertArr(newArr);

    //See Note 3
    var connections = createObject(modArr);

    //See Note 4
    var connectionObject = makeObject(connections);

    var fullPaths = paths(connectionObject);
    console.log(fullPaths);

    return fullPaths.length ? finalForm(fullPaths) : -1


//----------------------------helper functions----------------------
    //See Note 5
    function convertArr(arr) {
        arr = arr.map(function(val){
            return val.toLowerCase()
        })
        for (var i = 0; i < nodeNum; i++) {
            var hold = new RegExp(arr[i]);
            arr = arr.map(function(val){
                return val.replace(hold, String.fromCharCode(i + 65));
            })
        }
        return arr;
    }

    //See Note 6
    function createObject(arr) {
        var obj = {};
        arr.forEach(function(val){
            if(/^\w$/.test(val)){
                obj[val] = [];
            }
        })
        arr.splice(0, nodeNum);

        return [obj, arr];
    }

    //See Note 7
    function makeObject(inputArr) {
        var connObj = inputArr[0];
        var connArr = inputArr[1];
        for (var char in connObj) {
            var patt = new RegExp('\(\?\:' + char + '-\(\\w\)\)|\(\?\:\(\\w\)-' + char + '\)');
            connArr.forEach(function(val, ind){
                var result = patt.exec(val);
                if (result){
                    resFiltered = result.filter(function(val){
                        return val;
                    })
                    connObj[char].push(resFiltered[1]);
                }
            })
        }
        return connObj;
    }

    //See Note 8
    function paths(pathObj) {
        var endNode = String.fromCharCode(65 + nodeNum - 1);
        //start at the beginning (node 'A');
        var resArr = ['A'];

        //until all the paths are deadended or fully run
        while (resArr.some(function(val){return val.slice(-1) !== endNode})){

        //See Note 9
            var hotChar = resArr[0].slice(-1);

        //See Note 10
            if (hotChar === endNode) {
                resArr.push(resArr.shift());
            } else {
                //See Note 11
                holdArr = pathObj[hotChar];

                //See Note 12
                holdArr = holdArr.filter(function(val) {
                    return resArr[0].indexOf(val) === -1;
                });

                //See Note 13
                var oldStr = resArr.splice(0, 1)[0];

                //See Note 14
                holdArr.forEach(function(val){
                    resArr.push(oldStr + val);
                });
            }
        }
    }
    return resArr;
}

    function finalForm(pathsArr) {
        var truePath = pathsArr.sort(function(a, b){return b.length - a.length}).pop();
        var truePathArr = truePath.split('');
        truePathArr = truePathArr.map(function(val){
            return strArr[val.charCodeAt(0) - 65];
        })
        return truePathArr.join('-');
    }

}`,
            notes: [
                'Get the number of nodes.',
                'Replace proper names with letters, for simplicity.',
                'Get an array, containing object of nodes, and an array of connections',
                'Then convert to an object of key-valules (node: [connections])',
                'Convert the given array to one using "ABC"',
                'Takes the modArr and returns [object of nodes, array of connections]',
                'Takes the [nodeobject, connArray] and returns the formatted connection object.',
                'Take the formatted connection object and delivers an array of the paths from beginning to end',
                'HotChar is the current last item in the first path string in the paths array.',
                'If the end has already been reached, move from front to back.',
                'get the array of nodes connected to HotChar',
                'filter out the nodes already visited (would create loop)',
                'remove the pathstring from the front of the array',
                'add to the rear of the array each continuing path (gets tossed if deadend)'
            ]
        }]
    },

    hard005: {
        title: 'Difficult 5',
        heading: 'Expand the Polynomial',
        description: 'Using the JavaScript language, have the function PolynomialExpansion(str) take str which will be a string representing a polynomial containing only (+/-) integers, a letter, parenthesis, and the symbol "^", and return it in expanded form. For example: if str is "(2x^2+4)(6x^3+3)", then the output should be "12x^5+24x^3+6x^2+12". Both the input and output should contain no spaces. The input will only contain one letter, such as "x", "y", "b", etc. There will only be four parenthesis in the input and your output should contain no parenthesis. The output should be returned with the highest exponential element first down to the lowest.  More generally, the form of str will be: ([+/-]{num}[{letter}[{^}[+/-]{num}]]...[[+/-] {num}]...)(copy) where "[]" represents optional features, "{}" represents mandatory features, "num" represents integers and "letter" represents letters such as "x".',
        comment: null,
        solutions: [{
            heading: null,
            discuss: null,
            code: `
function PolynomialExpansion(str) {

    //See Note 1
    var letter = str.match(/[A-Za-z]/)[0];
    var modifiedStr = str.replace(/[a-zA-Z]/g, 'x')
        .replace(/-/g, '+-')
        .replace(/\^\+\-/g, '^-');
    var termArray = modifiedStr.split(')');
    termArray.pop();

    termArray = termArray.map(function(val) {
        newVal = val.replace(/\(/g, '')
            .replace(/\d+x(?!\^)/g, '$&^1')
            .replace(/\+\-?\d+(?!x)/g, '$&x^0')
            .replace(/^\d+$/, '$&x^0')
            .split('+').filter(function(val) {
                return val;
            });
        newVal = newVal.map(function(val2) {
            var parts = val2.match(/^(\-?\d+)x\^(\-?\d+)$/);
            newObj = {  coefficient: parseInt(parts[1], 10),
                        power: parseInt(parts[2], 10)
                    }
            return newObj;
        })
        return newVal;
    });

    //See Note 2
    var solution = termArray.reduce(function(val1, val2) {
        return polyMultiply(val1, val2);
    })

    //sort by power
    solution.sort(function(a, b) {return b.power - a.power});

    //reduce common powers
    var newSolArray = [];
    for (var i = 0; i < solution.length - 1; i++) {
        if (solution[i].power !== solution[i + 1].power) {
            newSolArray.push(solution[i]);
        } else {
            solution[i + 1].coefficient = solution[i].coefficient + solution[i+1].coefficient;
        }
    }
    newSolArray.push(solution.pop());

    //and build the new string
    var newString = '';

    newSolArray.forEach(function(val) {
        if (val.power !== 1 && val.power !== 0) {
            newString += '+' + val.coefficient.toString() + letter + '^' + val.power.toString();
        } else if (val.power === 1) {
            newString += '+' + val.coefficient.toString() + letter;
        } else {
            newString += '+' + val.coefficient.toString();
        }
    });


    var formattedString = newString.replace(/\+\-/g, '-')
        .replace (/^\+/,'')
        .replace (/([-\+])1([a-zA-Z])/, '$1$2')
        .replace (/^1([a-zA-Z])/, '$1')
    return(formattedString);
}



//-------------------------------Helper Functions--------------------------------

function polyMultiply(arr1, arr2) {
    resultsArray = [];
    arr1.forEach(function(val) {
        arr2.forEach(function(val2) {
            resultsArray.push(termMultiply(val, val2))

        })
    })
    return resultsArray;
}


function termMultiply(obj1, obj2) {
    returnObj = {};
    returnObj.coefficient = obj1.coefficient * obj2.coefficient;
    returnObj.power = obj1.power + obj2.power;

    return returnObj;
}`,
            notes: [
                'First, put the string into an array of polynomial values to be multiplied, clean up, and standardize so values are consistent format (e.g., 5x^1, 4x^0).',
                'Second, iterate over the array using the reduce funtion to send them down to the polyMultiply method'
            ]
        }]
    }
}
