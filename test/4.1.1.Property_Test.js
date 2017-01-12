require("jsverify");
let assert = require('assert');

function max_crossing_subarray(arr, low, mid, high) {
    let left_sum = -Infinity;
    let right_sum = -Infinity;
    let max_left = mid;
    let max_right = mid;

    let sum_c = 0;
    for (let i = mid; i > low - 1; i--) {
        sum_c = sum_c + arr[i];
        if (sum_c > left_sum) { left_sum = sum_c; max_left = i; }
    }
    sum_c = 0;
    for (let j = mid + 1; j < high + 1; j++) {
        sum_c = sum_c + arr[j];
        if (sum_c > right_sum) { right_sum = sum_c; max_right = j; }
    }

    return [max_left, max_right, left_sum + right_sum]
}

function max_subarray(arr, low, high) {
    if (high == low) { return [low, high, arr[low]]; }
    else {
        debugger;
        let pivot = Math.floor((high + low) / 2);
        let [mid_low, mid_high, mid_sum] = max_crossing_subarray(arr, low, pivot, high);
        let [left_low, left_high, left_sum] = max_subarray(arr, low, pivot);
        let [right_low, right_high, right_sum] = max_subarray(arr, pivot + 1, high);

        if (mid_sum > Math.max(left_sum, right_sum)) { return [mid_low, mid_high, mid_sum]; }
        else if (left_sum > Math.max(mid_sum, right_sum)) { return [left_low, left_high, left_sum]; }
        else { return [right_low, right_high, right_sum]; }
    }
}

describe('Max Subarray (Mocha)', function() {
    it('works with an empty list', function() {
        assert.deepEqual(max_subarray([], 0, 0), [0, 0, undefined]);
    });
    it('works with a negative unitary list', function() {
        assert.deepEqual(max_subarray([-1], 0, 1), [1, 1, undefined]);
    });
    it('works with a positive unitary list', function() {
        assert.deepEqual(max_subarray([1], 0, 1), [1, 1, undefined]);
    });
    it('works with a totally negative list', function() {
        assert.deepEqual(max_subarray([-1,-1,-1,-1,-1], 0, 4), [4, 4, -1]);
    });
    it('works with a totally positive list', function() {
        assert.deepEqual(max_subarray([1,1,1,1,1], 0, 4), [0, 4, 5]);
    });
    it('works with a mixed list', function() {
        assert.deepEqual(max_subarray([1,2,-3,4], 0, 3), [3, 3, 4]);
    })
});