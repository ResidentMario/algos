var jsc = require("jsverify");
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

describe('Insertion Sort (JSVerify)', function() {
    it('returns an empty list when the list is empty', function() {
        jsc.property("idempotent", "array nat", function (a) {
            return assert.deepEqual(insertion_sort(a), a.sort());
        });
    });
});