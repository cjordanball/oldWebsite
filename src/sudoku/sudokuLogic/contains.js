//a helper for containsUniq(), which tests if a value is in an array

export function contains(arr, str) {
    return arr.some(function(val) {
        return val === str;
    });
}
