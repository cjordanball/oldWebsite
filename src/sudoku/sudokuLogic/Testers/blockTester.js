export function blockTester(arr, block) {
    let holdObj = {};
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (arr[i] !== '-' && arr[i] === arr[j] && i !== j) {
                block in holdObj ? holdObj[block]++ : holdObj[block] = 1;
            }
        }
    }
    return holdObj;
}
