/*this function takes a string of the puzzle in the form -3-91-7-45-6------ ... and converts
it to an array of 9 row arrays.*/
export function stringConverter(str) {
    if (str.length !== 81) {
        console.log('Input is incorrect');
        return null;
    } else {
        var arr = [];
        for (var i = 0; i < 9; i++) {
            var item = str.slice(i * 9, i * 9 + 9);
            var item = '(' + item + ')';
            arr.push(item);
        }
        return arr;
    }
}
