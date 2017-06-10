'use strict';

module.exports = {

    hard006: {
        title: 'Difficult 6',
        heading: 'Evaluate Mathematical Expressions',
        description: 'Using the JavaScript language, have the function Calculator(str) take the str parameter being passed and evaluate the mathematical expression within it. For example, if str were "2+(3-1)*3" the output should be 8. Another example: if str were "(2-0)(6/2)" the output should be 6. There can be parenthesis within the string so you must evaluate it properly according to the rules of arithmetic. The string will contain the operators: +, -, /, *, (, and ). If you have a string like this: #/#*# or #+#(#)/#, then evaluate from left to right. So divide then multiply, and for the second one multiply, divide, then add. The evaluations will be such that there will not be any decimal operations, so you do not need to account for rounding and whatnot.',
        comment: null,
        solutions: [{
            heading: null,
            discuss: null,
            code: `
function Calculator(str) {

    //See Note 1
    var prePrep = prep(str);
    var preppedString = prep(prePrep);
    while(prePrep !== preppedString){
        prePrep = preppedString;
        var preppedString = prep(preppedString);
    }

    //See Note 2
    if (preppedString.indexOf('(') === -1) {
        return evalCaller(preppedString);
    }
    else {
        var parenPatt = /\(([\d\+-\/\*n]+)\)/;
        var newSection = preppedString.match(parenPatt)[1];
        var parenEval = Calculator(newSection);
        var ans = parenEval < 0 ? Math.abs(parenEval).toString() + 'n' : parenEval.toString();
        preppedString = preppedString.replace(parenPatt, ans);
        return Calculator(preppedString);
    }

//--------------------helper functions----------------------

    //See Note 3
    function prep(str) {
        var patt1 = /[\d\)](?=\()/g;

        noSpaceStr = str.replace(/\s/g, '');

        formatStr = noSpaceStr.replace(patt1, '$&*');

        formatStr = formatStr.replace(/^-(\d+)/, '$1n');

        formatStr = formatStr.replace(/([\*\/])-(\d+)/g, '$1$2n');

        formatStr = formatStr.replace(/--(\d+)/g, '+$1');

        formatStr = formatStr.replace(/\+-(\d+)/g, '+$1n');

        formatStr = formatStr.replace(/([(?:\dn?)\)])-(\d+)/g, '$1+$2n');

        formatStr = formatStr.replace(/\(-(\d+)\)/g, '$1n');

        formatStr = formatStr.replace(/\((\d+)\)/g, '$1');

        formatStr = formatStr.replace(/\(\+/g, '(');

        return formatStr;
    }

    //See Note 4
    function evalCaller(preppedString) {
        var multPatt = /\d+n?[\*\/]\d+n?/;
        var addPatt = /\d+n?[\+\-]\d+n?/

        while (preppedString.indexOf('*') !== -1 || preppedString.indexOf('/') !== -1) {
            var strSect = multPatt.exec(preppedString)[0];
            var newStrSect = multEval(strSect);
            preppedString = preppedString.replace(multPatt, newStrSect);
        }

        while (preppedString.indexOf('+') !== -1) {
            var strAddSect = addPatt.exec(preppedString)[0];
            var newAddStrSect = addEval(strAddSect);
            preppedString = preppedString.replace(addPatt, newAddStrSect);
            console.log(preppedString);
        }
        return /n/.test(preppedString) ? parseInt(preppedString) * -1 : parseInt(preppedString);
    }

    //See Note 5
    function multEval(str) {
        var hold;
        var patt = /(\d+n?)([\*\/])(\d+n?)/;
        var strArr = patt.exec(str);

        var numArr = strArr.map(function(val){
            if (/\d+n/.test(val)) {
                return parseInt(val) * -1;
            }
            else if (/\d+/.test(val)) {
                return parseInt(val);
            }
            else {
                return val;
            }
        });

        switch(numArr[2]) {
            case '*':
                hold = numArr[1] * numArr[3];
                break;
            case '/':
                hold = numArr[1] / numArr[3];
                break
            default:
                console.log('error');
        }
        return hold < 0 ? Math.abs(hold).toString() + 'n' : hold.toString();
    }

    //See Note 6
    function addEval(str) {
        var hold;
        var addPatt = /(\d+n?)([\+\-])(\d+n?)/;
        var strArr = addPatt.exec(str);
        var numArr = strArr.map(function(val){
            if (/\d+n/.test(val)) {
                return parseInt(val) * -1;
            }
            else if (/\d+/.test(val)) {
                return parseInt(val);
            }
            else {
                return val;
            }
        });

        hold = numArr[1] + numArr[3];

        return hold < 0 ? Math.abs(hold).toString() + 'n' : hold.toString();
    }
}`,
            notes: [
                'Prep the string to get it into the format we want to work with. This became quite a mess, because of the difficulty of dealing with minus signs in all the forms they could take. I decided it was easier to denote negative numbers with a trailing n, and used a bunch of replace methods to get there.',
                'Assume the case of no parens. In such a case, we would go through from left to right doing all the multiplications and divisions, then go through again to do all the adds and subtracts.',
                'This function strips out white space and inserts * signs where implied',
                'evalCaller is the function that runs the numbers without parenthesis down to a result.',
                'MultEval takes a string expression in the form of ddOdd or ddO-dd andreturns the evaluation of the expression back as a string, where O is either * or /.',
                'addEval takes a string expression in the form of ddOdd or ddO-dd and returns the evaluation of the expression back as a string, where O is either + or -.',
            ]
        }]
    },

    hard007: {
        title: 'Difficult 7',
        heading: 'Inspect a String for a Recurring Pattern',
        description: 'Using the JavaScript language, have the function PatternChaser(str) take str which will be a string and return the longest pattern within the string. A pattern for this challenge will be defined as: if at least 2 or more adjacent characters within the string repeat at least twice. So for example "aabecaa" contains the pattern aa, on the other hand "abbbaac" doesn\'t contain any pattern. Your program should return yes/no pattern/null. So if str were "aabejiabkfabed" the output should be yes abe. If str were "123224" the output should return no null.  The string may either contain all characters (a through z only), integers, or both. But the parameter will always be a string type. The maximum length for the string being passed in will be 20 characters. If a string for example is "aa2bbbaacbbb" the pattern is "bbb" and not "aa". You must always return the longest pattern possible.',
        comment: null,
        solutions: [{
            heading: null,
            discuss: null,
            code: `
function PatternChaser(str) {
    var len = str.length;
    var halfLen = Math.floor(str.length / 2);

    for (var i = halfLen; i > 1; i--) {
        for(var j = 0; j <= len - i; j++) {
            var txt = str.substr(j, i);
            var regTxt = new RegExp(txt, 'g');
            var testMatch = str.match(regTxt);
            if (testMatch.length > 1) {
                return 'yes ' + txt;
            }
        }
    }
    return 'no ' + null;
}`,
            notes: []
        }]
    },

    hard008: {
        title: 'Difficult 8',
        heading: 'Calculate Shortest Path, Using Weighted Sections',
        description: 'Using the JavaScript language, have the function WeightedPath(strArr) take strArr, which will be an array of strings which models a non-looping weighted Graph. The structure of the array will be as follows: The first element in the array will be the number of nodes N (points) in the array as a string. The next N elements will be the nodes which can be anything (A, B, C .. Brick Street, Main Street .. etc.). Then after the Nth element, the rest of the elements in the array will be the connections between all of the nodes along with their weights (integers) separated by the pipe symbol (|). They will look like this: (A|B|3, B|C|12 .. Brick Street|Main Street|14 .. etc.). Although, there may exist no connections at all.  An example of strArr may be: ["4","A","B","C","D","A|B|1","B|D|9","B|C|3", "C|D|4"]. It may help to visualize the Graph by drawing out the nodes and their connections. Your program should return the shortest path when the weights are added up from node to node from the first Node to the last Node in the array separated by dashes. So in the example above the output should be A-B-C-D. Here is another example with strArr being ["7","A","B","C","D", "E","F","G","A|B|1","A|E|9","B|C|2","C|D|1","D|F|2","E|D|6","F|G|2"]. The output for this array should be A-B-C-D-F-G. There will only ever be one shortest path for the array. If no path between the first and last node exists, return -1. The array will at minimum have two nodes. Also, the connection A-B for example, means that A can get to B and B can get to A. A path may not go through any Node more than once.',
        comment: null,
        solutions: [{
            heading: null,
            discuss: null,
            code: `
function WeightedPath(strArr) {
    //get the number of nodes
    var nodeNum = parseInt(strArr.shift());

    //See Note 1
    var newArr = strArr.slice();

    //See Note 2
    var modArr = helpers.convertArray(nodeNum, newArr);

    //See Note 3
    var connections = helpers.createObject(nodeNum, modArr);

    //See Note 4
    var connectionsObject = helpers.makeObject(connections);

    var fullPaths = helpers.paths(nodeNum, connectionsObject);

    if (fullPaths.length) {
        var winner = fullPaths.sort(function(b,a) {return(a[1] - b[1])}).pop();
        return helpers.finalForm(strArr, winner[0]);
    }
    else {
        return -1;
    }
}

//--------------------------------helper functions----------------------------


    //See Note 5
    function convertArray (arr) {
        arr = arr.map(function(val) {
            return val.toLowerCase()
        });
        for (var i = 0; i < nodeNum; i++) {
            var patt = new RegExp(arr[i]);
            arr = arr.map(function(val) {
                return val.replace(patt, String.fromCharCode(i + 65));
            });
        }
        return arr;
    }

    function createObject(arr) {
        var obj = {};
        arr.forEach(function(val) {
            if(/^\w$/.test(val)) {
                obj[val] = [];
            }
        });
        arr.splice(0, nodeNum);
        return[obj, arr];
    }

    function makeObject(arr) {
        var connObj = arr[0];
        var connArr = arr[1];
        for (var char in connObj) {
            var patt = new RegExp('\(\?\:\(\?\:' + char + '\\|\(\\w\)\)\|\(\?\:\(\\w\)\\|' + char + '\)\)\\|\(\\d\+\)');
            connArr.forEach(function(val) {
                var result = patt.exec(val);
                if (result) {
                    resFiltered = result.filter(function(val) {
                        return val;
                    })
                    connObj[char].push([resFiltered[1], parseInt(resFiltered[2])]);
                }
            });
        }
        return connObj
    }

    function paths(obj) {
        var endNode = String.fromCharCode(65 + nodeNum - 1);
        var resultArr = [['A', 0]];

       while(resultArr.some(function(val){return val[0].slice(-1) !== endNode})) {
            var hotChar = resultArr[0][0].slice(-1);
            if (hotChar === endNode) {
                resultArr.push(resultArr.shift());
            }
            else {
                holdArr = obj[hotChar];
                holdArr = holdArr.filter(function(val) {
                    return resultArr[0][0].indexOf(val[0]) === -1;
                });
                var oldStr = resultArr.splice(0, 1)[0];

                holdArr.forEach(function(val) {
                    resultArr.push([oldStr[0] + val[0], oldStr[1] + val[1]]);
                });
            }
        }
        return resultArr;
    }

    function finalForm(str) {
        var truePathArr = str.split('');
        truePathArr = truePathArr.map(function(val){
            return strArr[val.charCodeAt(0) - 65];
        })
        return truePathArr.join('-');
    }`,
            notes: [
                'Create a copy of the array argument using the <b>slice()</b> method, rather than a reference to the original array.',
                'Replace the proper names with letters, for simplicity.',
                'Get an array, containing an object of nodes, and for each an array of connections.',
                'Convert to an object of key-values (node: [connections])',
                'ConvertArray takes i) the nodeNum and an array of the nodes and paths, and converts each node name to a letter character, just to make it easier to work with.'
            ]
        }]
    },

    hard009: {
        title: 'Difficult 9',
        heading: 'Create a Reduced Row Echelon Matrix',
        description: 'Using the JavaScript language, have the function RREFMatrix(strArr) take strArr, which will be an array of integers represented as strings. Within the array there will also be "<>" elements which represent break points. The array will make up a matrix where the (number of break points + 1) represents the number of rows. Here is an example of how strArr may look: ["5","7","8","<>","1","1","2"]. There is one "<>", so 1 + 1 = 2. Therefore there will be two rows in the array and the contents will be row1=[5 7 8] and row2=[1 1 2]. Your program should take the given array of elements, create the proper matrix, and then through the process of Gaussian elimination create a reduced row echelon form matrix (RREF matrix). For the array above, the resulting RREF matrix would be: row1=[1 0 3], row2=[0 1 -1]. Your program should return that resulting RREF matrix in string form combining all the integers, like so: "10301-1". The matrix can have any number of rows and columns (max=6x6 matrix and min=1x1 matrix). The matrix will not necessarily be a square matrix. If the matrix is an nx1 matrix it will not contain the "<>" element. The integers in the array will be such that the resulting RREF matrix will not contain any fractional numbers.',
        comment: null,
        solutions: [{
            heading: null,
            discuss: null,
            code: `
function RREFMatrix(strArr) {
    //convert number strings into numbers
    strArr = strArr.map(function(val) {
        var temp = parseInt(val, 10);
        return (temp || temp - 1) ? parseInt(val, 10) : val;
    });
    //transform input string into an array of rows
    var matrixArr = transform(strArr);
    var len = matrixArr.length;
    //sort by leading zeroes, if any;
    orderRows(matrixArr);

    for(var i = 0; i < len - 1; i++) {
        rows = leadEliminate(matrixArr[i], matrixArr[i + 1]);
        if (rows === null) {
            orderRows(matrixArr);
            continue;
        }
        matrixArr[i] = rows[0];
        matrixArr[i + 1] = rows[1];
        var checker = matrixArr.slice();
        orderRows(matrixArr);

        if (!checker.every(function(val, ind) {
            return val === matrixArr[ind];
        })) {
            i--;
            continue;
        }
    }

    var redPivotArr = [];
    matrixArr.forEach(function(row) {
        var divisor = row.find(function(val) {
            val = parseFloat(val.toFixed(4), 10);
            return val !== 0;
        });
        if (divisor) {
            row = row.map(function(item){
                return item / divisor
            });
            redPivotArr.push(row);
        } else {
            redPivotArr.push(row);
        }
    });

    for (var i = len - 1; i > 0; i--) {
        var index = redPivotArr[i].findIndex(function(val) {
            posVal = parseFloat(val.toFixed(4), 10);
            return posVal !== 0;
        });
        for (var j = 0; j < i; j++) {
            if (redPivotArr[j][index]) {
                var ratio = redPivotArr[j][index];
                redPivotArr[j] = redPivotArr[j].map(function(item, index) {
                    return item -= redPivotArr[i][index] * ratio;
                })
            }
        }
    }
    var resStr = '';
    redPivotArr.forEach(function(row) {
        row.forEach(function(item) {
            resStr += item.toFixed();
        });
    });

    return resStr;
}

//-------------------------helpers----------------------
function transform(arr) {
    var resArr = [];
    var tempArr = [];
    arr.forEach(function(val, ind) {
        if (typeof val === 'number') {
            tempArr.push(val);
        } else {
            resArr.push(tempArr.slice());
            tempArr = [];
        }
    });
    resArr.push(tempArr);
    return resArr
}

function leadEliminate(arr1, arr2) {
    var pivotPos = arr1.findIndex(function(val) {
        val = parseFloat(val.toFixed(4), 10);
        return val !== 0;
    });
    if (pivotPos === -1) {
        return null;
    }
    if (arr2[pivotPos]) {
        var ratio = arr1[pivotPos] / arr2[pivotPos];
        var adjustedRow1 = arr1.map(function(val) {
            return val / ratio;
        });
        var adjustedRow2 = arr2.map(function(val, ind) {
            return val - adjustedRow1[ind];
        })
        return [adjustedRow1, adjustedRow2];
    } else {
        return [arr1, arr2];
    }
}

function orderRows(arr) {
        arr.sort(function(a, b) {
            var aIndex = a.findIndex(function(val) {return val !== 0});
            var bIndex = b.findIndex(function(val) {return val !== 0});
            aIndex = aIndex === -1 ? Infinity : aIndex;
            bIndex = bIndex === -1 ? Infinity : bIndex;
            return aIndex - bIndex;
        })
        return;
}`,
            notes: []
        }]
    },

    hard010: {
        title: 'Difficult 10',
        heading: 'Find the Point of Intersection of Two Lines',
        description: 'Have the function IntersectingLines(strArr) take strArr which will be an array of 4 coordinates in the form: (x,y). Your program should take these points where the first 2 form a line and the last 2 form a line, and determine whether the lines intersect, and if they do, at what point. For example: if strArr is ["(3,0)","(1,4)","(0,-3)","(2,3)"], then the line created by (3,0) and (1,4) and the line created by (0,-3) (2,3) intersect at (9/5,12/5). Your output should therefore be the 2 points in fraction form in the following format: (9/5,12/5). If there is no denominator for the resulting points, then the output should just be the integers like so: (12,3). If any of the resulting points is negative, add the negative sign to the numerator like so: (-491/63,-491/67). If there is no intersection, your output should return the string "no intersection". The input points and the resulting points can be positive or negative integers.',
        comment: null,
        solutions: [{
            heading: null,
            discuss: null,
            code: `
function IntersectingLines(strArr) {

    var ObjArr = formatCheck(strArr);
    var numStringArr = ObjArr.map(function(val) {
        return stringIt(val);
    });
    line1Points = [numStringArr[0], numStringArr[1]];
    line2Points = [numStringArr[2], numStringArr[3]];

    line1 = fullFormat(line1Points);
    line2 = fullFormat(line2Points);

    if (line1[4] === line2[4]) {
        return  line1[5] === line2[5] ? "These are the same line!" : "no intersection"
    }

    var bigRes = interPoint([line1, line2]);

    bigRes = bigRes.map(function(val){
        return mrClean(val);
    })

    return '(' + bigRes[0] + ',' + bigRes[1] + ')';
}


//---------------------------helper functions--------------------------

//See Note 1
function formatCheck (arr) {

    if (arr.length != 4) {
        return false;
    }
    arr = arr.map(function(val) {
        val = val.trim();
        while (/\s\s/.test(val)) {
            val = val.replace(/\s\s/, ' ');
        }
        val = val.replace(/\(\s+/, '(');
        val = val.replace(/,\s+/, ',');
       return val;
    });

    patt = /^\((?:(-?\d*)(?=\s|,))?\s?(?:(-?\d*)\/(?=-?\d))?(-?\d*),(?:(-?\d*)(?=\s|\)))?\s?(?:(-?\d*)\/(?=-?\d))?(-?\d*)\)$/

    newArr = arr.map(function(val) {
        return patt.exec(val);
    });

    if (newArr.some(function(val) {return val === null;})) {
        return false;
    }

    else {
        newObj = newArr.map(function(val) {
            return initFracPrep(val);
        });
    }
    return (newObj);
}

//See Note 2
function initFracPrep(arr) {
        var num1 = {
        I: arr[1] || 0,
        N: arr[2] || 0,
        D: arr[3] || 1
    }
    var num2 = {
        I: arr[4] || 0,
        N: arr[5] || 0,
        D: arr[6] || 1
    }
    var numsObj = {};
    numsObj.numer1 = num1.I * num1.D + parseInt(num1.N);
    numsObj.denom1 = parseInt(num1.D);
    numsObj.numer2 = num2.I * num2.D + parseInt(num2.N);
    numsObj.denom2 = parseInt(num2.D);
    return numsObj;
}

//See Note 3
function stringIt(obj) {
    var strArr = ([obj.numer1.toString() +'/'+ obj.denom1.toString(), obj.numer2.toString() + '/' + obj.denom2.toString()]);
    var strArr = strArr.map(function(val){
        return fractionReduce(val);
    })
    return strArr;
}

//See Note 4
function fractionReduce (str) {
    patt = /-?\d+/g;
    var numArr = str.match(patt);
    var numerator = parseInt(numArr[0]);
    var denominator = parseInt(numArr[1]);


    var numFactorObj = objectify(primeFactors(numerator));
    var denFactorObj = objectify(primeFactors(denominator));

    for (var x in numFactorObj) {
        if (x in denFactorObj) {
            var min = Math.min(denFactorObj[x], numFactorObj[x]);
            denFactorObj[x] -= min;
            numFactorObj[x] -= min;
        }
    }

    var num1 = 1;
    for (var x in numFactorObj) {
        num1 *= Math.pow(parseInt(x), numFactorObj[x]);
    }
    var num2 = 1;
    for (var x in denFactorObj) {
        num2 *= Math.pow(parseInt(x), denFactorObj[x]);
    }

    return (num1.toString() + '/' + num2.toString());
}

//See Note 5
function primeFactors (num) {
    var flag = 1;
    if (num < 0) {
        num = Math.abs(num);
        var flag = -1;
    }
    var factors = closeFunc();
    var res = factors(num);
    res.push(flag);
    return res;
}

function closeFunc() {
    var holdArr = [];
    function nextFactor(num) {
        var pivot = Math.floor(Math.sqrt(num))
        var flag = false;
        for (var i = 2; i <= pivot; i++) {
            if (num % i === 0) {
                flag = true;
                newNum = num / i;
                holdArr.push(i);
                return nextFactor(newNum);
            }
        }
        if (!flag) {
            holdArr.push(num);
            return holdArr
        }
    }
    return nextFactor
}

//See Note 6
function objectify(arr) {
    var countObj = {};

    arr.forEach(function(val) {
        vals = val.toString();
        if (!countObj[vals]) {
            countObj[vals] = 1;
        }
        else {
            countObj[vals] += 1;
        }
    });
    return countObj;
}

//See Note 7
function fullFormat(arr) {
    var line1 = arr[0].concat(arr[1]);
    var slope1 = slope(line1);
    line1.push(slope1);
    if (slope1 === undefined) {
        yinter1 = undefined;
        line1.push(yinter1);
    }
    else {
        var yinter1 = yInter(line1);
        line1.push(yinter1);
    }
    return line1;
}

//See Note 8
function slope(arr) {

    var rise = stringFracSub(stringFracPrep([arr[1], arr[3]]));
    var run = stringFracSub(stringFracPrep([arr[0], arr[2]]));
    var stringSlope = stringFracDiv(stringFracPrep([rise, run]));
    return parseInt(run) === 0? undefined : fractionReduce(stringSlope);
}

//See Note 9
function stringFracPrep(arr) {
    var patt = /(-?\d+)\/(-?\d+)/;
    var arrSet = patt.exec(arr[0]);
    var arr2Set = patt.exec(arr[1]);
    var num1 = {
        N: arrSet[1],
        D: arrSet[2]
    }
    var num2 = {
        N: arr2Set[1],
        D: arr2Set[2]
    }
    var numsObj = {};
    numsObj.numer1 = num1.N;
    numsObj.denom1 = num1.D;
    numsObj.numer2 = num2.N;
    numsObj.denom2 = num2.D;
    return numsObj;
}

//See Note 10
function stringFracMult(nums) {
    var resnumer = nums.numer1 * nums.numer2;
    var resdenom = nums.denom1 * nums.denom2;
    var res = resnumer.toString() + '/' + resdenom.toString();
    return fractionReduce(res);
}

function stringFracDiv(nums) {
    var resnumer = nums.numer1 * nums.denom2;
    var resdenom = nums.numer2 * nums.denom1;
    var res = resnumer.toString() + '/' + resdenom.toString();
    return fractionReduce(res);
}

function stringFracAdd(nums) {
    var resnumer = (nums.numer1 * nums.denom2) + (nums.numer2 * nums.denom1);
    var resdenom = nums.denom1 * nums.denom2;
    var res = resnumer.toString() + '/' + resdenom.toString();
    return fractionReduce(res);

}

function stringFracSub(nums) {
    var resnumer= (nums.numer1 * nums.denom2) - (nums.numer2 * nums.denom1);
    var resdenom = nums.denom1 * nums.denom2;
    var res = resnumer.toString() + '/' + resdenom.toString();
    return fractionReduce(res);

}

//See Note 11
function yInter(arr) {
    var mult = stringFracMult(stringFracPrep([arr[0], arr[4]]));
    var res = stringFracSub(stringFracPrep([arr[1], mult]));
    return fractionReduce(res);
}

//See Note 12
function interPoint (arr) {
    if (arr[0][4] === undefined || arr[1][4] === undefined) {
        if (arr[0][4] === undefined) {
            var step1 = stringFracMult(stringFracPrep([arr[0][0], arr[1][4]]));
            var xVal = arr[0][0];
            var yVal = stringFracAdd(stringFracPrep([step1, arr[1][5]]));
            return [xVal, yVal];
        }

        else {
            var step1 = stringFracMult(stringFracPrep([arr[1][0], arr[0][4]]));
            var xVal= arr[1][0];
            var yVal = stringFracAdd(stringFracPrep([step1, arr[0][5]]));
            return [xVal, yVal];
        }
    }
    else {
        var mTotal = stringFracSub(stringFracPrep([arr[0][4], arr[1][4]]));
        var bTotal = stringFracSub(stringFracPrep([arr[1][5], arr[0][5]]));
        var xVal = stringFracDiv(stringFracPrep([bTotal, mTotal]));
        var yVal1 = stringFracMult(stringFracPrep([xVal, arr[0][4]]));
        var yVal = stringFracAdd(stringFracPrep([yVal1, arr[0][5]]));
        return[xVal, yVal];
    }
}

function mrClean(str) {
    var patt = /(-?\d+)\/(-?\d+)/;
    var matchArr = patt.exec(str);
    var numer = parseInt(matchArr[1]);
    var denom = parseInt(matchArr[2]);
    var intPart = Math.floor(numer / denom);
    var newNumer = numer % denom;
    return newNumer === 0 ? intPart.toString() : intPart.toString() + ' ' + newNumer.toString() + '/' + Math.abs(denom).toString();
}
`,
            notes: [
                'The formatCheck() method first, checks to make certain there are four points. Then it checks the format of each point. It returns true if all are okay, false if not.',
                'initFracPrep takes a pair of numbers in fraction form (can have an integer part, separated by a space), and puts out each number as an object, numsObj, with numer(ator) and denom(inator) parts.',
                'stringIt takes an object composed of two points in fraction form, and returns them as an array of strings. Ex: { numer1: -12, denom1: 15, numer2: 2, denom2: -6 } => ["-12/15", "2/-6"]',
                'this method takes a fraction string, reduces it, and returns a fraction string, with all the common factors removed. It requires dependency function primeFactors() and objectify().',
                'primeFactors takes a number, and return an array, being the list of prime factors of the number (closeFunc is just a closure wrapper to get holdArr out of the global space).',
                'this method takes an array of prime factors such as that produced by primeFactors array produced by closeFunc and converts it into a counting object.',
                'This method takes the line array and returns an array of the line, following the format [[x/1, y/1, x/1, y/1, m, b]].',
                'This method takes the line array (i.e., two points) and returns the slope. It returns undefined for a vertical line.',
                'This method takes a pair of numbers in fraction form, and puts out each number as an object, numsObj, with numer(ator) and denom(inator) parts.',
                'The following four methods are for taking two numbers in the object form output by stringFracPrep. They are stringFracMult; stringFracDiv; stringFracAdd; and stringFracSub. stringFracMult takes two objects (obtained from stringFracPrep), and multiplies them, returning an answer in the same object form.',
                'This method takes the line arr (i.e., two points and slope) and returns the y-intercept.',
                'This method takes the fullFormat arrays and returns an array consisting of the x-value and y-value of the intersecting point. However, this is all done in decimals, not with fractions.'


            ]
        }]
    }
}
