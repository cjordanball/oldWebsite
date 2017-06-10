import {containsUniq} from './containsUniq';


export function exclusiveRow (arr) {
    arr.forEach(function(val) {
        for (var i = 1; i <= 9; i++) {
            var str = i.toString();
            var res = containsUniq(val, str);
            if (res !== false) {
                val[res] = str;
            }
        }
    });
}
