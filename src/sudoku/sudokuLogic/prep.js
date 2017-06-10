//prep takes the input and sets it up in a 9*9 array, with blanks set up as a 9 item array
export function prep(arr) {
    var newArr = [];
    arr.forEach(function(val, ind) {
        var item = Math.floor(ind / 9);
        if (!newArr[item]) {
            newArr.push([]);
        }
        if (val === '-') {
            newArr[item].push(['1', '2', '3', '4', '5', '6', '7', '8', '9']);
        } else
        newArr[item].push(val);
    });
    return newArr;
}
