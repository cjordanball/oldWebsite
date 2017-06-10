'use strict'

module.exports = {

    hard036: {
        title: 'Difficult 36',
        heading: 'Use Reverse Polish Notation',
        description: 'Using the JavaScript language, have the function ReversePolishNotation(str) read str which will be an arithmetic expression composed of only integers and the operators: +,-,* and / and the input expression will be in postfix notation (Reverse Polish notation), an example: (1 + 2) * 3 would be 1 2 + 3 * in postfix notation. Your program should determine the answer for the given postfix expression. For example: if str is 2 12 + 7 / then your program should output 2.',
        comment: null,
        solutions: [{
            heading: null,
            discuss: null,
            code: `
function ReversePolishNotation(str) {
    var arr = str.split(' ').map(function(val) {return parseInt(val, 10) ? parseInt(val, 10) : val});
    var len = arr.length;
    var operations = {
        '+': function(a, b) {return a + b},
        '-': function(a, b) {return a - b},
        '*': function(a, b) {return a * b},
        '/': function(a, b) {return a / b}
    }


    var count = 0;
    while (arr.length > 1) {
        var opLoc = arr.findIndex(function(val) {return '+-*/'.includes(val)})
        arr.splice(opLoc - 2, 3, operations[arr[opLoc]](arr[opLoc - 2], arr[opLoc - 1]));
    }
    return arr[0];
}`,
            notes: []
        }]
    },

    hard037: {
        title: 'Difficult 37',
        heading: 'Find Nonconforming Nodes',
        description: 'Using the JavaScript language, have the function MaxHeapChecker(arr) take arr which represents a heap data structure and determine whether or not it is a max heap. A max heap has the property that all nodes in the heap are either greater than or equal to each of its children. For example: if arr is [100, 19, 36, 17] then this is a max heap and your program should return the string max. If the input is not a max heap then your program should return a list of nodes in string format, in the order that they appear in the tree, that currently do not satisfy the max heap property because the child nodes are larger than their parent. For example: if arr is [10, 19, 52, 13, 16] then your program should return 19,52.  Another example: if arr is [10, 19, 52, 104, 14] then your program should return 19,52,104.',
        comment: null,
        solutions: [{
            heading: null,
            discuss: null,
            code: `
function MaxHeapChecker(arr) {
    var results = [];
    arr.forEach(function(val, ind) {
        var level = findLevelPlace(ind)[0];
        var order = findLevelPlace(ind)[1];
        var compareIndex = findIndex(level + 1, order);
        if(val < arr[compareIndex]) {
            results.push(arr[compareIndex]);
        }
        if (val < arr[compareIndex + 1]) {
            results.push(arr[compareIndex + 1]);
        }
    });
        return results.length === 0 ? 'max' : results.join(',');
}

function findLevelPlace(num) {
    var power = 0;
    while (num >= 0) {
        var hold = num;
        num -= Math.pow(2, power);
        power++;
    }
    return [power - 1, hold];
}

function findIndex(num1, num2) {
    var counter = 0;
    for (var i = 0; i < num1; i++) {
        counter += Math.pow(2, i);
    }
    counter += (2 * num2);
    return counter;
}`,
            notes: []
        }]
    },

    hard038: {
        title: 'Difficult 38',
        heading: 'Calculate Number of Combinations',
        description: 'Using the JavaScript language, have the function ChessboardTraveling(str) read str which will be a string consisting of the location of a space on a standard 8x8 chess board with no pieces on the board along with another space on the chess board. The structure of str will be the following: "(x y)(a b)" where (x y) represents the position you are currently on with x and y ranging from 1 to 8 and (a b) represents some other space on the chess board with a and b also ranging from 1 to 8 where a > x and b > y. Your program should determine how many ways there are of traveling from (x y) on the board to (a b) moving only up and to the right. For example: if str is (1 1)(2 2) then your program should output 2 because there are only two possible ways to travel from space (1 1) on a chessboard to space (2 2) while making only moves up and to the right.',
        comment: null,
        solutions: [{
            heading: null,
            discuss: null,
            code: `
function ChessboardTraveling(str) {
    regEx = /^\(\d\s\d\)\(\d\s\d\)$/
    var isFormatted = regEx.test(str);

    if (isFormatted) {
        var horShift = parseInt(str.charAt(8), 10) - parseInt(str.charAt(3), 10);
        var vertShift = parseInt(str.charAt(6), 10) - parseInt(str.charAt(1), 10);
        return factorial(horShift + vertShift) / (factorial(vertShift) * factorial(horShift));
    }

    return
    var horShift = str.charAt()
    console.log('bazoom');
}

function factorial(num) {
    return num === 0 ? 1 : num * factorial(num - 1);
}`,
            notes: []
        }]
    },

    hard039: {
        title: 'Difficult 39',
        heading: 'Matching Couples From a Group',
        description: 'Using the JavaScript language, have the function MatchingCouples(arr) take the arr parameter being passed which will be an array of integers in the following format: [B, G, N] where B represents the number of boys, G represents the number of girls, and N represents how many people you want to pair together. Your program should return the number of different ways you can match boys with girls given the different arguments. For example: if arr is [5, 3, 2], N=2 here so you want to pair together 2 people, so you\'ll need 1 boy and 1 girl. You have 5 ways to choose a boy and 3 ways to choose a girl, so your program should return 15. Another example: if arr is [10, 5, 4], here N = 4 so you need 2 boys and 2 girls. We can choose 2 boys from a possible 10, and we can choose 2 girls from a possible 5. Then we have 2 different ways to pair the chosen boys and girls. Our program should therefore return 900.  N will always be an even number and it will never be greater than the maximum of (B, G). B and G will always be greater than zero.',
        comment: null,
        solutions: [{
            heading: null,
            discuss: null,
            code: `
function MatchingCouples(arr) {
    var numCouples = arr[2] / 2;
    var comboBoys = combination(arr[0], numCouples);
    var comboGirls = combination(arr[1], numCouples);
    return comboBoys * comboGirls * factorial(numCouples);
}

function combination (num1, num2) {
    return factorial(num1) / (factorial(num2) * factorial(num1 - num2));
}

function factorial (num) {
    return num < 1 ? 1 : num * factorial(num - 1);
}`,
            notes: []
        }]
    },

    hard040: {
        title: 'Difficult 40',
        heading: 'How Far to the Next Fibonacci Number?',
        description: 'Using the JavaScript language, have the function ApproachingFibonacci(arr) take the arr parameter being passed which will be an array of integers and determine the smallest positive integer (including zero) that can be added to the array to make the sum of all of the numbers in the array add up to the next closest Fibonacci number. For example: if arr is [15, 1, 3], then your program should output 2 because if you add up 15 + 1 + 3 + 2 you get 21 which is the closest Fibonacci number.',
        comment: null,
        solutions: [{
            heading: null,
            discuss: null,
            code: `
function ApproachingFibonacci(arr) {
    var arrSum = arr.reduce(function(val1, val2) {
        return val1 + val2;
    });
    var floor = 1;
    while (fibonacci(floor) < arrSum) {
        floor++;;
    };
    return fibonacci(floor) - arrSum;

}

function fibonacci (num) {
    if (num === 1) {
        return 0;
    } else if (num === 2) {
        return 1;
    } else { return fibonacci(num - 2) + fibonacci(num - 1)}
}`,
            notes: []
        }]
    }
}
