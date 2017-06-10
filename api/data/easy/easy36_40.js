'use strict';

module.exports = {
    easy036: {
        title: 'Easy 36',
        heading: 'Perform a Bitwise OR Operation on Two Numbers',
        description: 'Using the JavaScript language, have the function BitwiseOne(strArr) take the array of strings stored in strArr, which will only contain two strings of equal length that represent binary numbers, and return a final binary string that performed the bitwise OR operation on both strings. A bitwise OR operation places a 0 in the new string where there are zeroes in both binary strings, otherwise it places a 1 in that spot. For example: if strArr is ["1001", "0100"] then your program should return the string "1101"',
        comment: null,
        solutions: [{
            heading: null,
            discuss: null,
            code: `
function BitwiseOne(strArr) {
    var str1 = strArr[0];
    var str2 = strArr[1];
    var newStr = '';
    len = str1.length;

    for (var i = 0; i < len; i++) {
        if(str1.charAt(i) === '1' || str2.charAt(i) === '1') {
            newStr = newStr += '1';
        } else {
            newStr = newStr += '0';
        }
    }

    return newStr;
}`,
            notes: []
        }]
    }
}
