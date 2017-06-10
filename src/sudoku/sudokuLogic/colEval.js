export function colEval (num, puzzleArr) {
    var colArr = [];
    for (var i = 0; i < 9; i++) {
        if (!Array.isArray(puzzleArr[i][num])) {
            colArr.push(puzzleArr[i][num]);
        }
    }
}
