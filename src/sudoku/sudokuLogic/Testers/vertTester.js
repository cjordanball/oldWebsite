export function vertTester(arr, num) {
    let holdObj = {};
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (arr[i] !== '-' && arr[i] === arr[j] && i !== j) {
                var rep1 = Math.floor(i / 3).toString() + Math.floor(num / 3).toString();
                rep1 in holdObj ? holdObj[rep1]++ : holdObj[rep1] = 1;
            }
        }
    }
    return holdObj;
}
