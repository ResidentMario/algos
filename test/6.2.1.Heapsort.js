require("jsverify");
let assert = require('assert');
// math = require('mathjs');

// Heap implementations.
let Heap = function(array, orientation) {
    this.orientation = orientation;

    // Sort into a heap regardless of array elements right in the declaration.
    // Ensure root node is 1 with a junk item. This makes math smoother.
    array.unshift(undefined); this.values = array;
    this.heapsize = this.values.length;
    for (let i = Math.floor(this.heapsize / 2); i > 0; i--) { this.max_heapify(i); }
};

Heap.prototype = {
    toString: function() { return this.orientation + " heap"; },
    // max_heapify implements a procedure which floats a value down to the correct position using swaps.
    max_heapify: function(i) {
        let left_index = 2*i;
        let right_index = 2*i + 1;
        let largest_index = i;
        // First check to see if the value rooting the left subtree is bigger than the root value.
        // If it is, make that the largest index. If it is not, retain the original array location as the largest.
        if (left_index < this.heapsize && this.values[left_index] > this.values[i]) {
            largest_index = left_index;
        }
        // Now we do the same with the right subtree. In this case we allow the right tree to take precedence, in that
        // if both the left and right subtree roots are larger than the heap root the right subtree will be chosen as
        // the successor. Left-or-right doesn't matter in practice.
        if (right_index < this.heapsize && this.values[right_index] > this.values[largest_index]) {
            largest_index = right_index;
        }
        // If the largest index is not the original index, swap the value with that of a subtree root and recursively
        // try again.
        if (largest_index !== i) {
            [this.values[largest_index], this.values[i]] = [this.values[i], this.values[largest_index]];
            return this.max_heapify(largest_index);
        }
    },
    heap_maximum() { return this.values[1]; },
    heap_extract_max() {
        if (this.heapsize < 1) { throw EvalError("Heap underflow"); }
        let max = this.values[1];
        this.values[1] = this.values.pop(this.heapsize);
        this.max_heapify(1);
        return max;
    },
    // Bubble up.
    heap_increase_key(i, key) {
        this.values[i] = key;
        while (i > 1 && this.values[Math.floor(i / 2)] < this.values[i]) {
            let parent_index = Math.floor(i / 2);
            [this.values[i], parent_index] = [parent_index, this.values[i]];
            i = parent_index;
        }
    }
};

function heapsort(array) {
    let heap = new Heap(array);
    let result = [];
    for(let i = heap.heapsize - 1; i > 0; i--) {
        result.push(heap.values[1]);
        heap.values[1] = heap.values[i];
        heap.heapsize--;
        heap.max_heapify(1);
    }
    return result;
}

// Priority queue implementations.


describe('Heap (Mocha)', function() {
    describe('Max Heapify', function() {

        it('works when the heap is already sorted', function() {
            let heap = new Heap([null, null, null], null);
            heap.values = [undefined, 3, 2, 1];
            heap.max_heapify(0);
            assert.deepEqual(heap.values, [undefined, 3,2,1]);
        });

        it('works when the heap is not sorted', function() {
            let heap = new Heap([null, null, null], null);
            heap.values = [undefined, 1, 2, 3];
            heap.max_heapify(1);
            assert.deepEqual(heap.values, [undefined, 3,2,1]);
        });

    });

    describe('Heap', function() {
        it('works', function() {
            let heap = new Heap([1, 2, 3]);
        });
    });

    describe('Heapsort', function() {
        it('works', function() {
            let result = heapsort([4,5,3,1,2]);
            assert.deepEqual(result, [5, 4, 3, 2, 1]);
        });
    });

    describe('Additional heap properties', function() {
        it('fetching the max works', function() {
            let heap = new Heap([1,2,3]);
            return assert.deepEqual(heap.heap_maximum(), 3);
        });
        it('extracting the max works', function() {
            let heap = new Heap([1,2,3]);
            return assert.deepEqual(heap.heap_extract_max(), 3) && assert.deepEqual(heap.values, [undefined, 1, 2]);

        });
        it('bubbling up works', function() {
            let heap = new Heap([1,2,3]);
            heap.heap_increase_key(1, 5);
            return assert.deepEqual(heap.values, [undefined, 5, 2, 1]);
        })
    })
});
