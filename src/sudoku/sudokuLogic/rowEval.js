//this function examines the given row and returns the set numbers
//in an array
export function rowEval(num, puzzleArr) {
    var rowArr = [];
    for (var i = 0; i < 9; i++) {
        if (!Array.isArray(puzzleArr[num][i])) {
            rowArr.push(puzzleArr[num][i]);
        }
    }
    return rowArr;
}
