import {unsolvedBlocks} from './unsolvedBlocks';
import {bruteChecker} from './bruteChecker';

export function bruteForce(puzzleArr) {
    //linearPuzzleArr will be the puzzle as a single array of 81
    //elements, easier to work with
    var linearPuzzleArr = [];
    //openBlocks is an array of spaces (0 - 80) that have not been
    //solved prior to bruteForce()
    var openBlocks = unsolvedBlocks(puzzleArr);
    console.log('openBlocks', openBlocks.length);

    //create linearPuzzleArr
    puzzleArr.forEach(function(val, ind) {
        if (typeof val === 'object'){
            var arrObject = {
                numArr: val,
                place: 0
            }
            linearPuzzleArr.push(arrObject);
        } else {
            linearPuzzleArr.push(val);
        }
    });

    //testingArr will be a full array of known number and '-'
    //for any unknown numbers, rather than the object
    var testingArr = linearPuzzleArr.map(function(val) {
        return typeof val === 'string' ? val : '-';
    });
    //we are going to go back and forth through the open board
    //positions, and keep track of where we are with the variable
    //boardPosition.  We will start at position 0.
    var boardPosition = 0;
    while (boardPosition < openBlocks.length) {
        var hotBox = linearPuzzleArr[openBlocks[boardPosition]];
        //find the first value that works in the hotBox
        var testResult = false;
        while(!testResult) {
            if (hotBox.place >= hotBox.numArr.length) {
                // console.log('inif');
                testingArr[openBlocks[boardPosition]] = '-'
                hotBox.place = 0;
                // console.log(boardPosition);
                boardPosition -= 2;
                // console.log(boardPosition);
                break;
            } else {
                // console.log('inelse');
                testingArr[openBlocks[boardPosition]] = hotBox.numArr[hotBox.place];
                // console.log('posttestingArr', testingArr);
                testResult = bruteChecker(testingArr, openBlocks[boardPosition]);
                hotBox.place++;
                // console.log('testRes', testResult);
            }
        }
        boardPosition++
    }
    return(testingArr);
}
