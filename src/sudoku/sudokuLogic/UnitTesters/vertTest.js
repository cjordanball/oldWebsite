export function vertTest(arr) {
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (arr[i] !== '-' && arr[i] === arr[j] && i !== j) {
                return false;
            }
        }
    }
    return true;
}
