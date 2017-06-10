//this function removes the elements in arr2 from arr1

export function reduceArray(arr1, arr2) {
    arr2.forEach(function(val) {
        var placeNum = arr1.indexOf(val);
        if (placeNum !== -1) {
            arr1.splice(placeNum, 1);
        }
    })
}
