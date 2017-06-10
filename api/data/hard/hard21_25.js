'use strict'

module.exports = {

    hard021: {
        title: 'Difficult xx',
        heading: 'Decrypt a Message',
        description: 'Create a function with a single parameter being a string, AlphabetRunEncryption(str), that will read the parameter being passed to it and return the original decrypted string. The encryption being used is the following: For every character i in str up to the second-to-last character, take the i and i + 1 characters and encode them by writing the letters of the alphabet, in order, that range in the same direction between those chosen characters. For example: if the original string were "bo", then it would be encoded as "cdefghijklmn", but if the string were "boa" then "bo" is encoded as "cdefghijklmn" and "oa" is encoded as "nmlkjihgfedcb", so the final encrypted string would be "cdefghijklmnnmlkjihgfedcb". So str may be something like the encrypted string just written, and your program should decrypt it and output the original message.  The input string will only contain lowercase characters (a...z). There are also three important rules to this encryption based on specific character sequences: 1) If the original string contains only one letter between two chosen characters, such as the string "ac", then this would be encrypted as "bR" with R standing for the direction in which the alphabet is going in determining the original characters. The encrypted string bR represents "ac" but the encrypted string "bL" represents "ca" (R = right, L = left).  2) If the original string contains zero letters between two chosen characters, such as the string "ab" then this would be encrypted as "abS", with S representing the fact that no decryption is needed on the two letters preceding S. For example, if the original string were "aba" then the encryption would be "abSbaS", but be careful because decrypting this you get abba, but the actual original string is aba.  3) If the original string contains a repeat of letters, such as the string "acc", then this would be encrypted as bRcN, with N representing the fact that no change in characters occurred on the character preceding N. The input string will never only be composed of repeated characters.',
        comment: 'This was a crazy challenge, as it was just very involved to keep straight how the encoding worked. The solution below consists of three parts: first, take the input string and, using the encoding rules given, chop it into discrete parts, separating them with commas; second, converting the string into an array, dividing on the commas, and applying the encoding rules to reduce each piece into a two item array.  Using numbers to represent the letters in the original message our array becomes [[1, 2], [2, 3], [3, 4] . . .].  Third, we save the first letter in a variable, then convert each subarray to the second element only, then concat them all and stick the first letter back on the front.',
        solutions: [{
            heading: null,
            discuss: null,
            code: `
function AlphabetRunEncryption(str) {

    var preppedStr = prepString(str);

    var preppedArr = preppedStr.split(',');

    evalArr = preppedArr.map(function(val) {
        if (/S/.test(val)) {
            return consec(val);
        } else if (/N/.test(val)) {
            return repeater(val);
        } else if (/R/.test(val)) {
            return skipUp(val);
        } else if (/L/.test(val)) {
            return skipDown(val);
        } else if (val[0] < val[1]) {
            return stringUp(val);
        } else if (val[0] > val[1]) {
            return stringDown(val);
        }
    });


    var init = evalArr[0][0];

    evalArr = evalArr.map(function(val) {
        return val[1];
    });

    evalArr = evalArr.reduce(function(val1, val2) {
        return val1 + val2;
    })
    return (init + evalArr);
}

//========================= helpers ==================================

//See Note 1
function prepString(str) {
    var newStr = str.replace(/\wN/g, ',$&,');
    newStr = newStr.replace(/\w\wS/g, ',$&,');
    newStr = newStr.replace(/\w[RL]/g, ',$&,');
    newStr = newStr.replace(/,,/g, ',');
    var len = newStr.length;
    for (var i = 0; i < len - 2; i++) {
        if (adjTest(newStr[i], newStr[i + 1])) {
            newStr = newStr.replace(newStr.slice(0, i + 1), newStr.slice(0, i + 1) + ',');
            len++;
            i++;
       }
    }
    newStr = newStr.replace(/^,|,$/g, '');
    return newStr;
}


//See Note 2
function adjTest(char1, char2) {
    num1 = char1.charCodeAt(0);
    num2 = char2.charCodeAt(0);
    return Math.abs(num1 - num2) === 0 || Math.abs(num1 - num2) === 2;
}

//See Note 3
function repeater(str) {
    var arr = str.match(/(\w)N/);
    return [arr[1], arr[1]];
}

//See Note 4
function consec(str) {
    var arr = str.match(/(\w)(\w)S/);
    return [arr[1], arr[2]];
}

//See Note 5
function skipUp(str) {
    var arr = str.match(/(\w)R/);
    return [String.fromCharCode(arr[1].charCodeAt(0) - 1), String.fromCharCode(arr[1].charCodeAt(0) + 1)];
}

//See Note 6
function skipDown(str) {
    var arr =str.match(/(\w)L/);
    return [String.fromCharCode(arr[1].charCodeAt(0) + 1), String.fromCharCode(arr[1].charCodeAt(0) - 1)];
}

//See Note 7
function stringUp(val) {
    var firstChar = String.fromCharCode(val.charCodeAt(0) - 1);
    var secondChar = String.fromCharCode(val.charCodeAt(val.length - 1) + 1);
    return [firstChar, secondChar];
}

//See Note 8
function stringDown(val) {
    var firstChar = String.fromCharCode(val.charCodeAt(0) + 1);
    var secondChar = String.fromCharCode(val.charCodeAt(val.length - 1) - 1);
    return [firstChar, secondChar];
}`,
            notes: [
                'This method takes the given input format and delimits it with commas into workable chunks. It uses the adjTest function to test letters for being the same or separated by one, which indicates a section end.',
                'This tests two chars to see if they are adjacent - returns true if repeat or a skip.',
                'This method takes a repeating letter pattern and returns the proper array.',
                'This method handles consecutive letters',
                'This method handles an xR situation',
                'This method handles a xL situation',
                'This method handles a straightforward ascending consectuive letter sequence',
                'This method handles a straightforward descending consecutive letter sequence'
            ]
        }]
    },

    hard022: {
        title: 'Difficult xx',
        heading: 'CYV ("Cover Your Vertex")',
        description: 'Using the JavaScript language, have the function VertexCovering(strArr) take a string (strArr) which will be an array of length three.  The first element of the array will be a list of vertices in a graph in the form (A,B,C,...), the second part of the array will be the edges connecting the vertices in the form (A-B,C-D,...) where each edge is bidirectional.  The last part of the array will be a set of vertices in the form (X,Y,Z,...) and your program will have to determine whether or not the set of vertices given covers every edge in the graph such that every edge is incident to at least one vertex in the set.  For example: if strArr is ["(A, B, C, D)","(A-B, A-D, B-D, A-C)", "(A,B)"] then the vertices (A,B) are in fact one of the endpoints of every edge in the graph, so every edge has been accounted for.  Therefore your program should return the string "yes". But if, for example, the last part of the array was (C,B) then these vertices don\'t cover all the edges because the edge connecting A-D is left out.  If this is the case your program should return the edges given in the second part of the array that are left out, in the same order they were listed, so for this example your program should return (A-D). The graph will have at least 2 vertices and all the vertices in the graph will be connected. The third part of the array listing the vertices may be empty, where it would only contain the parenthesis with no values within it: "()".',
        comment: 'Much ado about nothing! This was the easiest of the "difficult" challenges I have yet come across. The code below starts by ignoring the first input array element completely, and converts the remaining two from strings to arrays. Then it compares the given vertices to the given edges, tossing out any edges containing either vertice.  If the remaining edge array is empty, return "yes". If not empty, return the array, after converting it back into a string.  As a preliminary matter, the if statement at the beginning handles the edge case of no vertices being provided.',
        solutions: [{
            heading: null,
            discuss: null,
            code: `
function VertexCovering(strArr) {
    if (strArr[2] === '()') {
        return strArr[1];
    }
    edgeArr = beautify(strArr[1]);
    verticesArr = beautify(strArr[2]);
    verticesArr.forEach(function(val) {
        edgeArr = edgeArr.filter(function(val1) {
            console.log(val1.search(val));
            return (val1.search(val) === -1)
        })
    })
    if (!edgeArr.length) {
        return 'yes';
    } else {
        return '(' + edgeArr.join(',') + ')'
    }
}

// ================== helpers =====================
//See Note 1
function beautify (str) {
    return str.replace(/[\(\)]/g, '').split(',');
}`,
            notes: [
                'This method returns edges and vertices in an array of strings.'
            ]
        }]
    },

    hard023: {
        title: 'Difficult 23',
        heading: 'Where Can the Knight Go?',
        description: 'Using the JavaScript language, have the function KnightJumps(str) read a string parameter (str) which will consist of the location of a knight on a standard 8 x 8 chess board with no other pieces on the board. The structure of str will be the following: "(x y)", which represents the position of the knight with x and y ranging from 1 to 8. Your program should determine the number of spaces to which the knight can move from a given location. For example: if str is "(4 5)" then your program should output 8 because the knight can move to 8 different spaces from position x = 4 and y = 5.',
        comment: null,
        solutions: [{
            heading: null,
            discuss: null,
            code: `
function KnightJumps(str) {
    var preppedArr = prepStr(str);
    var firstStepArr = arr2Step(preppedArr);
    var secondStepArr = arr1Step(firstStepArr);
    var passingArr = passing(secondStepArr);

    return (passingArr.length);
}


//=============== helpers ========================

//See Note 1
function prepStr(str) {
    var regEx = /\(([1-8])\s([1-8])\)/;
    if (!regEx.test(str)) {
        return 'Improper format for input string!';
    }
    var matchArr = str.match(regEx);
    return [parseInt(matchArr[1]), parseInt(matchArr[2])];
}

//See Note 2
function arr2Step(arr) {
    var newArr = arr.map(function(val, ind) {
        if (ind === 0) {
            return [['h', val + 2, arr[ind + 1]], ['h', val - 2, arr[ind + 1]]]
        } else {
            return [['v', arr[ind - 1], val + 2], ['v', arr[ind - 1], val - 2]]
        }
    })
    return newArr[0].concat(newArr[1]);
}

//See Note 3
function arr1Step(arr) {
    var newArr = arr.map(function(val, ind) {
        if (val[0] === 'h') {
            return [[val[1], val[2] + 1], [val[1], val[2] - 1]]
        }
        else if (val[0] === 'v') {
            return[[val[1] + 1, val[2]], [val[1] - 1, val[2]]]
        }
    });
    return(newArr[0].concat(newArr[1], newArr[2], newArr[3]));
}

//See Note 4
function passing(arr) {
    var newArr = arr.filter(function(val) {
        return (val[0] >= 1 && val[0] <= 8 && val[1] >= 1 && val[1] <= 8);
    })
    return newArr;
}`,
            notes: [
                'the function prepStr(str) evaluates the input for proper structure, then converts it to a two item array, each item being an integer between 1 and 8, inclusive.',
                'the function arr2Step() takes the array output of prepStr and returns an array of the four points generated by the first portion of the knight\'s move (doing the 2 move first). It also marks each with an "h" or a "v" to tell what direction it moved.',
                'the function arr1Step() takes the array output of arr2Step and returns an array of the eight points on which a knight could land, ignoring the restraint of staying on the board.',
                'the function passing() filters out the moves that would land off the board.'
            ]
        }]
    },

    hard024: {
        title: 'Difficult 24',
        heading: 'The Longest Road',
        description: 'Using the JavaScript language, have the function FarthestNodes(strArr) read strArr, which will be an array of hyphenated letters representing paths between nodes. For example: ["a-b", "b-c", "b-d"] means that there is a bidirectional path between nodes a and b, b and c, and b and d.  Your program should determine the longest path that exists in the graph and return the length of that path.  So, for the example above, your program should return 2 because of the paths a-b-c and d-b-c.  The path a-b-c also means that there is a path c-b-a.  No cycles will exist in the graph and every node will be connected to some other node in the graph.',
        comment: null,
        solutions: [{
            heading: null,
            discuss: null,
            code: `
function FarthestNodes(strArr) {
    var nodeList = createNodeList(strArr);
    var termini = createTermini(nodeList, strArr);
    var hubs = createHubs(nodeList, strArr);

    strArr.sort();
    return strArr;
}

FarthestNodes(data);


// ===================== helpers ==================

//See Note 1
function createNodeList(arr) {
    debugger;
    arr = arr.map(function(val) {
        var pieces = val.match(/(\w)-(\w)/)
        return [pieces[1], pieces[2]]
    });
    arr = arr.reduce(function(val1, val2) {
        return val1.concat(val2)
    });

    var beenThere = {};
    return arr.filter(function(val) {
        if (beenThere[val]) {
            return false;
        } else {
            beenThere[val] = '1';
            return true
        }
    }).sort();
}

function createTermini(nodes, edges) {
    return nodes.filter(function(val) {
        var counter = 0;
        var regEx = new RegExp(val);
        edges.forEach(function(val1) {
            if (regEx.test(val1)) {
                counter++;
            }
        });
        return counter === 1;
    });
}

function createHubs(nodes, edges) {
    return nodes.filter(function(val) {
        var counter = 0;
        var regEx = new RegExp(val);
        edges.forEach(function(val1) {
            if (regEx.test(val1)) {
                counter++;
            }
        });
        return counter > 2;
    });
}`,
            notes: [
                'This method creates a sorted, non-duplicative array of node names'
            ]
        }]
    },

    hard025: {
        title: 'Difficult 25',
        heading: 'Arrangements of People in Line',
        description: 'Using the JavaScript language, have the function LineOrdering(strArr) read the strArr parameter being passed which will represent the relations among people standing in a line. The structure of the input will be ["A>B", "B>C", "A<D", etc..]. The letters stand for different people and the greater than and less than signs stand for a person being in front of someone or behind someone. A>B means A is in front of B and B<C means that B is behind C in line. For example if strArr is: ["J>B", "B<S", "D>J"], these are the following ways you can arrange the people in line: DSJB, SDJB and DJSB. Your program will determine the number of ways people can be arranged in line. So for this example your program should return the number 3. It also may be the case that the relations produce an impossible line ordering, resulting in zero as the answer.  Only the symbols <, >, and the uppercase letters A...Z will be used. The maximum number of relations strArr will contain is ten.',
        comment: null,
        solutions: [{
            heading: null,
            discuss: null,
            code: `
function LineOrdering(strArr) {

    var cleanArr = cleanUp(strArr);
    var regEx = buildRegExp(cleanArr);
    var items = itemize(cleanArr);
    var squareArr = allPositions(items);

    //See Note 1
    var frontObj = createFront(cleanArr);
    var rearObj = createBack(cleanArr);

    //See Note 2
    var leanArr = squareArr.map(function(val, ind, thisArr) {
        len = thisArr.length;
        for (var key in rearObj) {
            if (ind < rearObj[key]) {
                var place = val.findIndex(function(val2) {
                    return val2 === key;
                });
                val.splice(place, 1);
            }
        }
        for (var key in frontObj) {
            if (ind >= len - frontObj[key]) {
                var place = val.findIndex(function(val3) {
                    return val3 === key;
                });
                val.splice(place, 1);
            }
        }

            return val;
        });

    leanArr.forEach(function(val, ind) {
        if (val.length === 1) {
            var hotVal = val[0];
        }
        leanArr.forEach(function(val2, ind2) {
            var place = val2.findIndex(function(val3) {return val3 === hotVal});
            if (val2.length !==1 &&  place !== -1) {
                val2.splice(place, 1);
            }
        });
    });
    //See Note 3
    var len = leanArr.length;
    //See Note 4
    var numCombos = leanArr.reduce(function(val1, val2) {
        return (val1.length || val1) * val2.length;
    })
    //See Note 5
    var placeCounts = leanArr.map(function(val) {
        return val.length
    })
    //See Note 6
    var placeVals = makePlaceVals(placeCounts.slice(0))


    //See Note 7
    var total = 0;
    var counter = 0;
    whileLoop: while (counter < numCombos) {
        var str = '';
        var convertedNum = convertNum(counter, placeVals);

        forLoop: for (var i = 0; i < len; i++) {
            if (str.includes(leanArr[i][convertedNum[i]])) {
                counter++;
                continue whileLoop;
            }
            str += leanArr[i][convertedNum[i]];
            if (regEx.some(function(val) {return val.test(str)})) {
                counter++;
                continue whileLoop
            }
        }
        total++;
        counter++;
    }

    return total;
}


//-----------------helpers------------------------

//See Note 8
function cleanUp(arr) {
    var newArr = arr.map(function(val) {
        if(/</.test(val)) {
            val = val.split('').reverse().join('');
        }
        val = val.replace(/</, '>');
        return val;
    });

    uniqObj = {};
    newArr.forEach(function(val) {
        if (!uniqObj[val]) uniqObj[val] = true;
    });
    return Object.keys(uniqObj);
}

//See Note 9
function itemize(arr) {
    var obj = {};
    arr.forEach(function(val) {
        obj[val.charAt(0)] = 0;
        obj[val.charAt(2)] = 0;
    });
    return Object.keys(obj);
}

//See Note 10
function allPositions(items) {
    var fullSquare = items.map(function(val) {
        var newItems = items.slice(0);
        return newItems;
    })
    return fullSquare;
}

//See Note 11
function createFront(arr) {
    var obj = {};
    arr.forEach(function(val) {
        var letter = val.charAt(0);
        if (letter in obj) {
            obj[letter]++
        } else {
            obj[letter] = 1;
        }
    });
    return obj;
}

//See Note 12
function createBack(arr) {
    var obj = {};
    arr.forEach(function(val) {
        var letter = val.charAt(2);
        if (letter in obj) {
            obj[letter]++
        } else {
            obj[letter] = 1;
        }
    });
    return obj;
}

function buildRegExp(arr) {
    return arr.map(function(val) {
        return new RegExp(val.charAt(2) + '\\w*' + val.charAt(0));
    })
}

function makePlaceVals(arr) {
    var len = arr.length;
    for (var i = len - 1; i >= 0; i--) {
        if (i === len - 1) {
            arr[i] = [1, arr[i]];
        } else if (i === len - 2) {
            arr[i] = [ 1 * arr[i + 1][1], arr[i]];
        } else {
            arr[i] = [arr[i + 1][1] * arr[i + 1][0], arr[i]];
        }
    }
    var valArr = arr.map(function(val) {
        return val[1] === 1 ? null : val[0]
    })
    return valArr;
}

function convertNum(num, arr) {
    var newArr = arr.map(function(val, ind) {
        if (val === null) return 0;
        else {
            var divide = parseInt(num / val, 10);
            num = num % val;
            return divide;
        }

    });
    return newArr;
}`,
            notes: [
                'frontObj and rearObj help create the leanArr. Tells how many times a letter is placed before, or after, another letter.',
                'leanArr is the squareArr after cutting out letters using the instructions in cleanArr',
                'get the length of the permutation string',
                'get the number of possible combinations for later',
                'get an array of number of possibilties at each position',
                'get an array of the values of each place in a number based on placeCounts',
                'check each possible combination',
                'the method cleanUp takes the initial array and makes the arrows all >',
                'the method itemize lists all the letters in play',
                'the function allPositions creates a square array of all possible combos.',
                'create an object telling how many times each letter is ahead of another',
                'create an object telling how many times each letter is behind another'

            ]
        }]
    }
}
