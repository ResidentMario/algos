var jsc = require("jsverify");
var assert = require("assert");

function merge(p1, p2) {
    // What I learned while writing this: the duck test implementation used in Python can't be done as easily in
    // JavaScript because of the language's weirdness---asking for p1[i] for a non-existant index i will return null,
    // *not* throw an exception. Wicked! So this code uses th book implementation.
    var i = 0;
    var j = 0;
    var n = p1.length + p2.length;
    var ret = [];
    p1.push(Infinity);
    p2.push(Infinity);
    for (var c = 0; c < n; c++) {
        if (p1[i] < p2[j]) {
            ret.push(p1[i]);
            i++;
        }
        else {
            ret.push(p2[j]);
            j++;
        }
    }
    return ret;
}

function merge_sort(arr) {
    if (arr.length == 1) { return arr; }
    else {
        var pivot = Math.round(arr.length / 2);
        var left = merge_sort(arr.slice(0, pivot));
        var right = merge_sort(arr.slice(pivot));
        return merge(left, right);
    }
}

describe('Merge Sort (JSVerify)', function() {
    it('works', function() {
        jsc.property("idempotent", "array nat", function (a) {
            return assert.deepEqual(merge_sort(a), a.sort());
        });
    });
});