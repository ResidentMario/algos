let assert = require('assert');
// let jsc = require('jsverify');

function counting_sort(array, k) {
    // Loop once, build a histogram.
    let c = new Array(k).fill(0);
    for (let j = 1; j < array.length; j++) { c[array[j]]++; }
    // Loop again, change to a CDF.
    for (let i = 1; i < array.length; i++) { c[i] = c[i] + c[i - 1]; }
    // Now use the histogram to populate a new array to be returned with each element pointing to the element in index
    // order (this algorithm is a stable sort). Note: this makes sense in a copy-by-reference language like C/C++, but
    // JavaScript is a copy-by-object-reference language (as is Python) so this loop fails to actually achieve the
    // desired effect (ret[0] -> b[0], but b[0] NOT-> a[2]).
    let ret = new Array(k).fill(0);
    for (let k = array.length - 1; k > -1; k--) {
        ret[c[array[k]]] = array[k];
        c[array[k]]--;
    }
    return ret;
}

// TODO: Fix up.
