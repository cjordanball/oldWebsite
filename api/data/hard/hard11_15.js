'use strict'

module.exports = {

    hard011: {
        title: 'Difficult 11',
        heading: 'Count Iterations Necessary to Reach a Constant',
        description: 'Using the JavaScript language, have the function KaprekarsConstant(num) take the num parameter being passed which will be a 4-digit number with at least two distinct digits. Your program should perform the following routine on the number: Arrange the digits in descending order and in ascending order (adding zeroes to fit it to a 4-digit number), and subtract the smaller number from the bigger number. Then repeat the previous step. Performing this routine will always cause you to reach a fixed number: 6174. Then performing the routine on 6174 will always give you 6174 (7641 - 1467 = 6174). Your program should return the number of times this routine must be performed until 6174 is reached. For example: if num is 3524 your program should return 3 because of the following steps: (1) 5432 - 2345 = 3087, (2) 8730 - 0378 = 8352, (3) 8532 - 2358 = 6174.',
        comment: 'Very interesting problem - I had never heard of this before.',
        solutions: [{
            heading: null,
            discuss: null,
            code: `
function KaprekarsConstant(num) {
    const KAP = 6174;
    var count = 0;
    while (true) {
        var num = evaluator(num)
        if (num === true) {
            return count;
        }
    }

    function evaluator(num) {
        count++;
        console.log('count', count);
        var minNumArr = num.toString().split('').sort();
        var maxNumArr = minNumArr.slice(0).reverse();
        var littleNum = parseInt(minNumArr.join(''), 10);
        var bigNum = parseInt(maxNumArr.join(''), 10);
        while (bigNum < 1000) {
            bigNum = bigNum * 10;
        }

        return bigNum - littleNum === KAP ? true : bigNum - littleNum;
    }
}
`,
            notes: []
        }]
    },

    hard012: {
        title: 'Difficult 12',
        heading: 'Analyze a Path for Overlaps',
        description: 'Using the JavaScript language, have the function HamiltonianPath(strArr) take strArr, which will be an array of length three. The first part of the array will be a list of vertices in a graph in the form (A,B,C,...), the second part of the array will be the edges connecting the vertices in the form (A-B,C-D,...) where each edge is bidirectional. The last part of the array will be a set of vertices in the form (X,Y,Z,...) and your program will have to determine whether or not the set of vertices given forms a Hamiltonian path on the graph, which means that every vertex in the graph is visited only once in the order given. For example: if strArr is ["(A,B,C,D)","(A-B,A-D,B-D,A-C)","(C,A,D,B)"] then the vertices (C,A,D,B) in this order do in fact form a Hamiltonian path on the graph so your program should return the string "yes". If for example the last part of the array was (D,A,B,C) then this doesn\'t form a Hamiltonian path because once you get to B you can\'t get to C in the graph without passing through the visited vertices again. Here your program should return the vertex where the path had to terminate, in this case your program should return B. The graph will have at least 2 vertices and all the vertices in the graph will be connected.',
        comment: 'The setup of this problem makes it much easier to solve than it might seem on first reading. We can ignore the first element of the given array, and simply see if we have the connections in the second element to make the journey listed in the third.',
        solutions: [{
            heading: null,
            discuss: null,
            code: `
function HamiltonianPath(strArr) {

    var connectArray = prep(strArr[1]);

    //See Note 1
    var biConnectArray = double(connectArray);

    pathArray = prep(strArr[2]);


    var holder = pathArray[0];
    for (var i = 0, len = pathArray.length; i < len - 1; i++) {
        var nextStep = pathArray[i] + '-' + pathArray[i + 1];
        if (biConnectArray.indexOf(nextStep) != -1) {
            holder = pathArray[i + 1];
            if (holder === pathArray[len - 1]){
                return 'yes';
            }
        }
        else {
            return holder;
        }
    }
}

//------------------------Helper Functions-----------------------

//See Note 2
function prep(str) {
    var arr = str.slice(1, -1).split(",");
    arr = arr.map(function(val) {
        return val.trim();
    });
    return arr;
}

//See Note 3
function double(arr) {
    arr = arr.map(function(val) {
        holder = val.split('').reverse().join('');
        return [val, holder];
    });
    arr = arr.reduce(function(init, fin) {
        return init.concat(fin)
    });
    return arr;
}`,
            notes: [
                'The paths are bidirectional, so add the reverse of each one',
                'This method takes the string, removes the "()", puts the values in a array, and removes any extra spacing that might have been input.',
                'This method takes the array of connections and adds the reverse of each, as the connections are bidirectional'
            ]
        }]
    },

    hard013: {
        title: 'Difficult 13',
        heading: 'Count the Ways of Ascending Stairs',
        description: 'Using the JavaScript language, have the function StepWalking(num) take the num parameter being passed, which will be an integer between 1 and 15, and which represents the number of stairs you will have to climb. You can climb the set of stairs by taking either 1 step or 2 steps, and you can combine these in any order. So, for example, to climb 3 steps you can either do: (1 step, 1 step, 1 step) or (2, 1) or (1, 2). So for 3 steps we have 3 different ways to climb them, so your program should return 3. Your program should return the number of combinations of climbing num steps.',
        comment: 'This is a very simple programming challenge, because it is really a logic puzzle rather than a programming one.  Once one realizes that the answer will be from the Fibonacci number sequence, it becomes a very simple matter to handle it.',
        solutions: [{
            heading: null,
            discuss: null,
            code: `
function StepWalking(num) {
    if (num === 1) {
        return 1
    } else if (num === 2) {
        return 2
    } else {
        return StepWalking(num - 1) + StepWalking(num - 2);
    }
}`,
            notes: []
        }]
    },

    hard014: {
        title: 'Difficult 14',
        heading: 'Can One Get From Here to There?',
        description: 'Using the JavaScript language, have the function GasStation(strArr) take strArr which will be an an array consisting of the following elements: N which will be the number of gas stations in a circular route and each subsequent element will be the string g:c where g is the amount of gas in gallons at that gas station and c will be the amount of gallons of gas needed to get to the following gas station. For example strArr may be: ["4","3:1","2:2","1:2","0:1"]. Your goal is to return the index of the starting gas station that will allow you to travel around the whole route once, otherwise return the string impossible. For the example above, there are 4 gas stations, and your program should return the string 1 because starting at station 1 you receive 3 gallons of gas and spend 1 getting to the next station. Then you have 2 gallons + 2 more at the next station and you spend 2 so you have 2 gallons when you get to the 3rd station. You then have 3 but you spend 2 getting to the final station, and at the final station you receive 0 gallons and you spend your final gallon getting to your starting point. Starting at any other gas station would make getting around the route impossible, so the answer is 1. If there are multiple gas stations that are possible to start at, return the smallest index (of the gas station). N will be >= 2.',
        comment: null,
        solutions: [{
            heading: null,
            discuss: null,
            code: `
function GasStation(strArr) {
    //See Note 1
    var numStations = parseInt(strArr.shift());

    //See Note 2
    var arr = strArr.map(function(val) {
        var hold = val.match(/(\d+):(\d+)/);
        return [parseInt(hold[1]), parseInt(hold[2])];
    })

    //See Note 3

    //See Note 4
    loop1: for (var i = 0; i < numStations; i++) {
        //See Note 5
        var gallons = 0;
        loop2: for (var j = 0; j < numStations; j++) {
            gallons += arr[(i + j) % numStations][0];
            if (gallons < arr[(i + j) % numStations][1]) {
                continue loop1;
            }
            else if (j < numStations - 1) {
                gallons -= arr[(i + j) % numStations][1];
            }
            else {
                return((i + 1).toString());
            }
        }
    }
    //See Note 6
    return "impossible";
}`,
            notes: [
                'Grab the number of stations from the array (and remove it).',
                'Change the remaining elements in the array from the form "x:y" to [x,y].',
                'Imagine a loop containing n stations. We want to find the first one that allows a complete circuit, so start an outer loop.',
                'Because I have to go to the next instance of the outer loop based on a condition in the inner loop, I have labelled the two loops.  I understand that some frown on use of labels as confusing, but I think this was the best solution in this case.',
                'The inner loop will start at the ith station (from the outer loop) and compare the number of gallons in the tank with the number needed to get to the next station. Remember that modulo (%) must be used to keep the station numbers in the range of 0 to n - 1.',
                'If none of the starting points on the circuit returned a success, then return "impossible".'
            ]
        }]
    },

    hard015: {
        title: 'Difficult 15',
        heading: 'Is This Matrix Symmetric?',
        description: 'Using the JavaScript language, have the function SymmetricMatrix(strArr) read strArr which will be an array of integers represented as strings. Within the array there will also be "<>" elements which represent break points. The array will make up a matrix where the (number of break points + 1) represents the number of rows. Here is an example of how strArr may look: ["1","0","1","<>","0","1","0","<>","1","0","1"]. There are two "<>", so 2 + 1 = 3. Therefore there will be three rows in the array and the contents will be row1=[1 0 1], row2=[0 1 0] and row3=[1 0 1]. Your program should take the given array of elements, create the proper matrix, and then determine whether the matrix is symmetric, in other words, if matrix M is equal to M transpose. If it is, return the string symmetric and if it isn\'t return the string not symmetric. A matrix may or may not be a square matrix and if this is the case you should return the string not possible. For the example above, your program should return symmetric.',
        comment: null,
        solutions: [{
            heading: null,
            discuss: null,
            code: `
function SymmetricMatrix(strArr) {
    var numRows = strArr.filter(function(val) {
        return val === '<>';
    }).length + 1;

    var elements = strArr.filter(function(val) {
        return val !== '<>';
    });

    if (elements.length !== Math.pow(numRows, 2)) {
        return 'not possible';
    }

    var matArr = [];
    for (var row = 0; row < numRows; row++) {
        var rowArr = [];
        for (var i = 0; i < numRows; i++) {
            rowArr.push(elements[row * numRows + i]);
        }
        matArr.push(rowArr);
    }

    var transArr = [];

    for (var j = 0; j < numRows; j++) {
        for (var k = 0; k < numRows; k++) {
           transArr.push(matArr[k][j]);
        }
    }

    var success = transArr.every(function(val, ind) {
        return val === elements[ind];
    });

    return success ? 'symmetric' : 'not symmetric'

}`,
            notes: []
        }]
    }
}
