import {stringConverter} from './stringConverter';
import {rowTester} from './Testers/rowTester';
import {vertTester} from './Testers/vertTester';
import {blockTester} from './Testers/blockTester';

export function initialCheck(str) {
    var strArr = stringConverter(str);

    //clean the array from array of strings to an array of nine nine-member arrays.
    strArr = strArr.map(function(val) {
        return val.replace(/[\(\)]/g, '').split('');
    })
    //make two new copies of the array to be used and an empty object to hold bad blocks
    var copy1Arr = strArr.slice(0);
    var copy2Arr = strArr.slice(0);
    var holdObj = {};

    //val is the row string, ind is the row number - send each to rowTester
    strArr.forEach(function(val, ind) {
        Object.assign(holdObj, rowTester(val, ind));
    });

    //Part II - organize arrays based on columns and send to vertTester method for checking

    //create a 'row' out of each column, and send it to vertTester.  vertTester will
    //be exactly the same as rowTester, except the output will be inverted to give
    //the correct blocks
    copy1Arr[0].forEach(function(val, ind) {
        vertArr = [];
        for (var i = 0; i < 9; i++) {
            vertArr.push(copy1Arr[i][ind]);
        }
        Object.assign(holdObj, vertTester(vertArr, ind));
    });

    //Part III - create a 'row' out of each block, and send it to blockTester.
    //blockTester will be exactly the same as rowTester, except the output will
    //be the offending blocks

    for (var a = 0; a < 3; a++) {
        for (var b = 0; b < 3; b++) {
            var blockArr = [];
            for (var i = 0; i < 3; i++) {
                for (var j = 0; j < 3; j++) {
                    blockArr.push(copy2Arr[a * 3 + i][b * 3 + j]);
                }
            }
            Object.assign(holdObj, blockTester(blockArr, a.toString() + b.toString()));
        }
    }

    var blocks = Object.keys(holdObj);

    if (!blocks.length) {
        return 'legal'
    } else {
        blocks = blocks.map(function(val) {
            return parseInt(val, 3) + 1;
        }).sort();

        return ('Problem with blocks ' + blocks.join(','));
    }
}
