import {initialCheck} from './initialCheck';
import {prep} from './prep';
import {rowEval} from './rowEval';
import {colEval} from './colEval';
import {boxEval} from './boxEval';
import {finTest} from './finTest';
import {reduceArray} from './reduceArray';
import {cleanUp} from './cleanUp';
import {exclusiveRow} from './exclusiveRow';
import {exclusiveCol} from './exclusiveCol';
import {exclusiveBlock} from './exclusiveBlock';
import {unsolvedBlocks} from './unsolvedBlocks';
import {bruteForce} from './bruteForce';


export function sudokuSolver(str) {
    var count= 0;
    var puzzleArr = prep(str);
    while (!finTest(puzzleArr) && count < 75) {
        puzzleArr.forEach(function(val, ind) {
            val.forEach(function(val2, ind2) {
                if (Array.isArray(val2)) {
                    var rowNums = rowEval(ind, puzzleArr);
                    var colNums = colEval(ind2, puzzleArr);
                    var boxNums = boxEval(ind, ind2, puzzleArr);
                    rowNums = rowNums.concat(colNums, boxNums);
                    val2 = reduceArray(val2, rowNums);
                }
            });
        });
        puzzleArr = cleanUp(puzzleArr);
        exclusiveRow(puzzleArr);
        exclusiveCol(puzzleArr);
        exclusiveBlock(puzzleArr);
        count++;
    }

    puzzleArr = puzzleArr.reduce(function(val1, val2) {
        return val1.concat(val2);
    });

    if(puzzleArr.some(function(val) {
        return typeof val !== 'string';
    })) {
        puzzleArr = bruteForce(puzzleArr);
    }
    return puzzleArr
}
