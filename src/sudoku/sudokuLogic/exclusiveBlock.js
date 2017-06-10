import {containsUniq} from './containsUniq';


export function exclusiveBlock(arr) {
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            var blockArr = [];
            for (var k = 0; k < 3; k++) {
                for (var l = 0; l < 3; l++) {
                    blockArr.push(arr[i * 3 + k][j * 3 + l]);
                }
            }
            for (var k = 1; k <= 9; k++) {
                var str = k.toString();
                var res = containsUniq(blockArr, str);
                if (res) {
                    arr[i * 3 + (parseInt(res / 3, 10))][j * 3 + (res % 3)] = str;
                }
            }
        }
    }
}
