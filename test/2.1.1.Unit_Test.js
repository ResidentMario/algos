var assert = require('assert');

function insertion_sort(a) {
    var j = null;
    var i = null;
    for (j=1; j < a.length; j++) {
        var key = a[j];
        i = j - 1;
        while (i > -1 && a[i] > key) {
            a[i + 1] = a[i];
            i--;
        }
        a[i + 1] = key;
    }
    return a;
}

describe('Insertion Sort (Mocha)', function() {
    it('returns an empty list when the list is empty', function() {
        assert.deepEqual(insertion_sort([]), []);
    });

    it('returns the same element when the list contains a single element', function () {
        assert.deepEqual(insertion_sort([1]), [1])
    });

    it('returns elements in sorted order when there are many of them', function() {
        assert.deepEqual(insertion_sort([5,2,4,6,1,3]), [1,2,3,4,5,6])
    });
});