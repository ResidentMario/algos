require("jsverify");

function max_crossing_subarray(arr, low, mid, high) {
    let left_sum = -Infinity;
    let right_sum = Infinity;
    let max_left = mid;
    let max_right = mid;

    let sum_c = 0;
    for (i = mid; i > low - 1; i--) {
        sum_c = sum_c + arr[i];
        if (sum_c > left_sum) { left_sum = sum_c; max_left = i; }
    }
    sum_c = 0;
    for (j = mid; j < high + 1; j++) {
        sum_c = sum_c + arr[j];
        if (sum_c > right_sum) { right_sum = sum_c; max_right = i; }
    }

    return [max_left, max_right, left_sum + right_sum]
}

// def max_subarray(arr, low, high):
//     if high == low:
//     return low, high, arr[low]
//     else:
//     pivot = (high + low) // 2
//
//     mid_low, mid_high, mid_sum = max_crossing_subarray(arr, low, pivot, high)
//     left_low, left_high, left_sum = max_subarray(arr, low, pivot)
//     right_low, right_high, right_sum = max_subarray(arr, pivot + 1, high)
//     if mid_sum > max(left_sum, right_sum):
//     return mid_low, mid_high, mid_sum
//     elif left_sum > max(mid_sum, right_sum):
//     return left_low, left_high, left_sum
//     else:
//     return right_low, right_high, right_sum

function max_subarray(arr, low, high) {
    if (high == low) { return [low, high, arr[low]]; }
    else {
        let pivot = Math.round((high + low) / 2);
        let [mid_low, mid_high, mid_sum] = max_crossing_subarray(arr, low, pivot, high);
        let [left_low, left_high, left_sum] = max_subarray(arr, low, pivot);
        let [right_low, right_high, right_sum] = max_subarray(arr, pivot + 1, high);

        if (mid_sum > Math.max(left_sum, right_sum)) { return [mid_low, mid_high, mid_sum]; }
        else if (left_sum > Math.max(mid_sum, right_sum)) { return [left_low, left_high, left_sum]; }
        else { return [right_low, right_high, right_sum]; }
    }
}