let assert = require('assert');
let jsc = require('jsverify');

// Array[p..r]
// Note, this algorithm is in-place. Using two separate sub-lists is less efficient, but easier to implement.
function partition(array, p, r) {
    // Get a pivot. It's easiest to take the last element of the array.
    let pivot = array[r - 1];
    let i = p - 1;
    // Iterate through the entries starting at p (our base index) to find ones smaller. If an entry is smaller, swap it
    // with a larger value (or with the beginning of the list, if not smaller value has been found yet).
    // In this way build out the smaller larger lists. Place the pivot in the proper position last.
    for(let j = p; j < r; j++) {
        if (array[j] <= pivot) {
            i++;
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    [array[i + 1], array[r - 1]] = [array[r - 1], array[i + 1]];
    array = array.filter(function(d) { return typeof d != "undefined"; });
    return [array, i + 1];
}

// Quicksort, pretty simple.
function quicksort(array, p, r) {
    if (p < r) {
        let stuff = partition(array, p , r);
        [array, q] = stuff;
        array = quicksort(array, p, q - 1);
        array = quicksort(array, q + 1, r);
        return array;
    }
    else { return array; }
}

describe('Quicksort (Mocha)', function() {
    describe('Partition', function() {
        it('works when the array is size 1', function() {
            let arr = [1]; [arr, p] = partition(arr, 1, 1);
            assert.deepEqual(arr, [1]);
        });
        it('works when the array is size 2', function() {
            let arr = [1, 2]; [arr, p] = partition(arr, 1, 2);
            assert.deepEqual(arr, [1, 2]);
        });
        it('works when the array is large', function() {
            let arr = [1,215,123,612,6,21,1,122]; [arr, p] = partition(arr, 1, 8);
            assert.deepEqual(arr, [1, 6, 21, 1, 122, 215, 612, 123]);  // 122 is the pivot
        });
    });
    describe('Quicksort', function() {
        it('works when the array is size 1' , function() {
            let arr = [1]; arr = quicksort(arr, 1, 1);
            assert.deepEqual(arr, [1]);
        });
        it('works when the array is size 2', function() {
            let arr = [1, 2]; arr = quicksort(arr, 1, arr.length);
            assert.deepEqual(arr, [1, 2]);
        });
        it('works when the array is size 3', function() {
            let arr = [1,215,123]; arr = quicksort(arr, 1, arr.length);
            assert.deepEqual(arr, [1, 123, 215]);  // 122 is the pivot
        });
        it('works when the array is size 3 with repeated elements', function() {
            let arr = [1,123,1]; arr = quicksort(arr, 1, arr.length);
            assert.deepEqual(arr, [1,1,123]);  // 122 is the pivot
        });
    });
});

describe('Quicksort (JSVerify)', function() {
    it('works', function() {
        jsc.property("idempotent", "array nat", function (a) {
            return assert.deepEqual(quicksort(a), a.sort());
        });
    });
});
