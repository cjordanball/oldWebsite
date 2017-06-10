export function boxEval(num1, num2, puzzleArr) {
    var cornerX = 3 * Math.floor(num1 / 3);
    var cornerY = 3 * Math.floor(num2 / 3);
    var boxArr = [];
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            if (!Array.isArray(puzzleArr[i + cornerX][j + cornerY])) {
                boxArr.push(puzzleArr[i + cornerX][j + cornerY]);
            }
        }
    }
    return boxArr;
}
