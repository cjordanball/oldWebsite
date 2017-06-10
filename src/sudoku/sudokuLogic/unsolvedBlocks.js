export function unsolvedBlocks (arr) {
    console.log('unsolved', arr);
    let collectionArr = [];
    arr.forEach(function(val, ind) {
        if (typeof val === 'object'){
            collectionArr.push(ind);
        }
    });
    return collectionArr;
}
