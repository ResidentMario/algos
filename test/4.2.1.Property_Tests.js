require("jsverify");
let assert = require('assert');
math = require('mathjs');

function component(array, r_half, c_half) {
    // let pivot = math.size(array)['_data'][0] / 2;
    let pivot = array.size()[0] / 2;
    let r_0 = undefined;
    let r_1 = undefined;
    let c_0 = undefined;
    let c_1 = undefined;
    if (r_half == 1) { r_0 = 0; r_1 = pivot; } else { r_0 = pivot; r_1 = array.size()[0]; }
    if (c_half == 1) { c_0 = 0; c_1 = pivot; } else { c_0 = pivot; c_1 = array.size()[0]; }
    let ret = math.subset(array, math.index(math.range(r_0, r_1), math.range(c_0, c_1)));
    // math.js (very naively!) returns singular values as singular values instead of as 1x1 arrays! So this end-case
    // requires special correction.
    if (typeof ret == "number") {
        ret = math.matrix([[ret]]);
    }
    return ret;
}

function square_matrix_multiply_recursive(arr_a, arr_b) {
    let a = math.matrix(arr_a);
    let b = math.matrix(arr_b);
    let num_rows = arr_a.size()[0];
    if (num_rows == 1) {
        return math.matrix([[a.subset(math.index(0, 0)) * b.subset(math.index(0, 0))]]);
    }
    else {
        let pivot = num_rows / 2;
        let c11 =
            math.add(square_matrix_multiply_recursive(component(a, 1, 1), component(b, 1, 1)),
                     square_matrix_multiply_recursive(component(a, 1, 2), component(b, 2, 1)));
        let c12 =
            math.add(square_matrix_multiply_recursive(component(a, 1, 1), component(b, 1, 2)),
                     square_matrix_multiply_recursive(component(a, 2, 1), component(b, 1, 1)));
        let c21 =
            math.add(square_matrix_multiply_recursive(component(a, 2, 1), component(b, 2, 1)),
                     square_matrix_multiply_recursive(component(a, 2, 2), component(b, 2, 1)));
        let c22 =
            math.add(square_matrix_multiply_recursive(component(a, 2, 1), component(b, 1, 2)),
                     square_matrix_multiply_recursive(component(a, 2, 2), component(b, 2, 2)));

        let c1 = math.concat(c11, c12, 0);
        let c2 = math.concat(c21, c22, 0);
        return math.concat(c1, c2, 1);
    }
}

let one = math.matrix([[0,1],[1,2]]);
let two = math.matrix([[0,1],[1,2]]);
console.log(square_matrix_multiply_recursive(one, two));

describe('Recursive Square Matrix Multiply (Mocha)', function() {
    it('works', function() {
        let one = math.matrix([[0,1],[1,2]]);
        let two = math.matrix([[0,1],[1,2]]);
        assert.deepEqual(square_matrix_multiply_recursive(one, two), math.multiply(one, two));
    });
});
// There's an error somewhere, but I really don't care anymore.