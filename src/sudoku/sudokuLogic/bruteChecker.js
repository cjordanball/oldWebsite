import {stringConverter} from './stringConverter';
import {rowTest} from './UnitTesters/rowTest';
import {vertTest} from './UnitTesters/vertTest';
import {blockTest} from './UnitTesters/blockTest';


export function bruteChecker(arr, position) {
    var str = arr.join('');
    var strArr = stringConverter(str);

    //clean the array from array of strings to an array of nine nine-member arrays.
    strArr = strArr.map(function(val) {
        return val.replace(/[\(\)]/g, '').split('');
    })
    //make two new copies of the array to be used and an empty array to hold bad blocks
    var copy1Arr = strArr.slice(0);
    var copy2Arr = strArr.slice(0);

    //val is the row string, ind is the row number - send each to rowTester
    var row = strArr[parseInt(position / 9)];
    var goodRow = rowTest(row);

    //Part II - organize arrays based on columns and send to vertTester method for checking

    //create a 'row' out of each column, and send it to vertTester.  vertTester will
    //be exactly the same as rowTester, except the output will be inverted to give
    //the correct blocks
    var col = position % 9;
    let vertArr = [];
    for (var i = 0; i < 9; i++) {
        vertArr.push(copy1Arr[i][col]);
    }
    var goodCol = vertTest(vertArr);

    //Part III - create a 'row' out of each block, and send it to blockTester.
    //blockTester will be exactly the same as rowTester, except the output will
    //be the offending blocks
    var topCorner = parseInt(position / 27, 10);
    var leftCorner = parseInt((position % 9) / 3 , 10);
    var blockArr = [];
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            blockArr.push(strArr[(topCorner * 3) + i][(leftCorner * 3) + j]);
        }
    }
    var goodBlock = blockTest(blockArr);

    // console.log('row', goodRow);
    // console.log('col', goodCol);
    // console.log('block', goodBlock);

    return goodRow && goodCol && goodBlock;

}
