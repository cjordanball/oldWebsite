export function cleanUp (arr) {
    arr = arr.map(function(val) {
        return val.map(function(val2) {
            if (Array.isArray(val2) && val2.length === 1) {
                return val2[0];
            } else {
                return val2;
            }
        })
    })
    return arr;
}
