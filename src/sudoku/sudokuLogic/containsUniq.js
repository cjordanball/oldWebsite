import {contains} from './contains';

//this function tests whether a number in string form (str) is contained a single time
//in a subarray in the array.  If it returns an index, that number must replace that sub-
//array

export function containsUniq (arr, str) {
    var len = arr.length;
    var counter = 0;
    var holder;
    for (var i = 0; i < len; i++) {
        if (typeof arr[i] === 'string') {
            if (arr[i] === str) {
                return false;
            }
        } else if (contains(arr[i], str)) {
            holder = i;
            counter++;
        }
    }
    return counter === 1 ? holder : false;
}
