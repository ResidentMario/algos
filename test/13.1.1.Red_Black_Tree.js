'use strict';

let assert = require('assert');
// let jsc = require('jsverify');

// Red-Black Properties:
// 1. Every node is red or black.
// 2. The root is black.
// 3. Every leaf is black.
// 4. If a node is red, then both its children are black.
// 5. All simple paths from the node to descendant leaves contain the same number of black nodes.

class Node {

    constructor(parent, left, right, value, color) {
        // Every regular node has a parent. If a node doesn't have a parent it's a root node.
        this.parent = parent;
        this.left = left;
        this.right = right;
        this.value = value;
        this.color = color;
    }

}

class RedBlackTree {

    constructor(root) {
        this.root = root;
        this.superroot = new Node(null, null, root); // an abstraction that makes methods work on root.
        this.root.parent = this.superroot;
    }

    left_rotate(x) {
        let y = x.right;
        x.right = y.left;
        if (y.left != null) {
            y.left.parent = x;
        } else if (x === x.parent.left) {
            x.parent.left = y;
        } else {
            x.parent.right = y;
        }
        y.left = x;
        x.parent = y;
        this.root = y;
    }

    right_rotate(y) {
        let x = y.left;
        y.left = x.right;
        if (x.right != null) {
            x.right.parent = y;
        } else if (y === y.parent.right) {
            y.parent.right = x;
        } else {
            y.parent.left = x;
        }
        x.right = y;
        y.parent = x;
        this.root = x;
    }

    // TODO: insert, insert_fixup.
    // insert(z) {
    //
    //     let y = null;
    //     let x = this.root;
    //     while (x !== null) {
    //         y = x;
    //         if (z.key < x.key) {
    //             x = x.left;
    //         } else {
    //             x = x.right;
    //         }
    //     }
    //     z.p = y;
    //     if (y === null) {
    //         this.root = z;
    //     } else if (z.key < y.key) {
    //         y.left = z;
    //     } else {
    //         y.right = z;
    //     }
    //     z.left = null;
    //     z.right = null;
    //     z.color = "Red";
    //     // At this point the tree's coloring is messed up and has to be redone.
    //     // So we call insert_fixup to fix that.
    //     insert_fixup(z);
    // }
    //
    // insert_fixup(z) {
    //     while (z.parent.color == "Red") {
    //         if (z.parent === z.parent.parent.left) {
    //
    //         }
    //     }
    // }

}

describe('Red Black Trees (Mocha)', function() {
    describe('Left Rotation', function() {
        it('works when performed on a root node', function () {

            let y = new Node(null, null, null);
            let x = new Node(null, null, y);
            y.parent = x;
            let tree = new RedBlackTree(x);
            tree.left_rotate(x);
            assert.deepEqual(y, tree.root);
            assert.deepEqual(x, tree.root.left);

        });
    });

    describe('Right Rotation', function() {
        it('works when performed on a root node', function () {

            let x = new Node(null, null, null);
            let y = new Node(null, x, null);
            x.parent = y;
            let tree = new RedBlackTree(y);
            tree.right_rotate(y);
            assert.deepEqual(x, tree.root);
            assert.deepEqual(y, tree.root.right);

        });
    });

});

// debugger;
// let y = new Node(null, null, null);
// let x = new Node(null, null, y);
// y.parent = x;
// let tree = new RedBlackTree(x);
// tree.left_rotate(x);
// console.log(tree);

// let x = new Node(null, null, null);
// let y = new Node(null, x, null);
// x.parent = y;
// let tree = new RedBlackTree(y);
// debugger;
// tree.right_rotate(y);
// console.log(tree);