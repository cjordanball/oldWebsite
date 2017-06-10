export function finTest(arr) {
    return !arr.some(function(val) {
        return val.some(function(val2) {
            return Array.isArray(val2);
        });
    });
}
