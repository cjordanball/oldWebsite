import {containsUniq} from './containsUniq';

export function exclusiveCol (arr) {
    for (var i = 0; i < 9; i++) {
        var vertArr = [];
        for (var j = 0; j < 9; j++) {
            vertArr.push(arr[j][i])
        }
        for (var k = 1; k <= 9; k++) {
            var str = k.toString();
            var res = containsUniq(vertArr, str);
            if (res) {
                arr[res][i] = str;
            }
        }
    }
}
