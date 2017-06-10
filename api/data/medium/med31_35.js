'use strict';

module.exports = {
    med031: {
        title: 'Medium 31',
        heading: 'Count Duplicate Entries',
        description: 'Create a function, DistinctList(arr), that will take an array of numbers (arr) and determine the total number of duplicate entries.  For example, if the input is [1, 2, 2, 2, 3] then your program should output 2 because there are two duplicates of one of the elements.',
        comment: null,
        solutions: [{
            heading: null,
            discuss: null,
            code: `
function DistinctList(arr) {
  var counter = 0;
  var len = arr.length;

  for (var i = 0; i < len - 1; i++) {
    for (var j = 1; j < len; j++) {
      if (arr[i] === arr[j] && i !== j) {
        counter++;
        //See Note 1
        arr[j] = "*" + j;
      }
    }
  }

  return counter;
}`,
            notes: [
                'Replace the array item so that it cannot be recounted.'
            ]
        }]
    },

    med032: {
        title: 'Medium 32',
        heading: 'Encode a String',
        description: 'Create a function, NumberEncoding(str), that takes a string parameter (str) and encode the message according to the following rule: encode every letter into its corresponding numbered position in the alphabet. Symbols and spaces will also be used in the input. For example: if str is "af5c a#!" then your program should return 1653 1#!.',
        comment: null,
        solutions: [{
            heading: null,
            discuss: null,
            code: `
function NumberEncoding(str) {
    str = str.toLowerCase();
    var arr = str.split("");
    var len = arr.length;

    arr = arr.map(function(val) {
        if (/[a-z]/.test(val)) {
            val = val.replace(val.charAt(0), (val.charCodeAt(0) - 96).toString());
            console.log(val);
        }
        return val;
    })

    str = arr.join("");

  return str;
}`,
            notes: []
        }]
    },

    med033: {
        title: 'Medium 33',
        heading: 'Determine Maximum Spread in Group of Numbers',
        description: 'Using the JavaScript language, have the function StockPicker(arr) take the array of numbers stored in arr which will contain integers that represent the amount in dollars that a single stock is worth, and return the maximum profit that could have been made by buying stock on day x and selling stock on day y where y > x. For example: if arr is [44, 30, 24, 32, 35, 30, 40, 38, 15] then your program should return 16 because at index 2 the stock was worth $24 and at index 6 the stock was then worth $40, so if you bought the stock at 24 and sold it at 40, you would have made a profit of $16, which is the maximum profit that could have been made with this list of stock prices. If there is not profit that could have been made with the stock prices, then your program should return -1. For example: arr is [10, 9, 8, 2] then your program should return -1.',
        comment: null,
        solutions: [{
            heading: null,
            discuss: null,
            code: `
function StockPicker(arr) {
    var maxProfit = 0,

    while (arr.length > 1) {
        var start = arr.shift();
        var max = Math.max.apply(null, arr);
        var profit = max - start;
        if (profit > maxProfit) {
            maxProfit = profit;
        }
    }

    return maxProfit === 0 ? -1 : maxProfit;
}`,
            notes: []
        }]
    }
}
