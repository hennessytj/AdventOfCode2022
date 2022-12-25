"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stack = void 0;
class Stack {
    constructor(items) {
        this.stack = items !== undefined ? items : new Array();
        this.size = this.stack.length;
    }
    getSize() {
        return this.size;
    }
    getItems() {
        return this.stack;
    }
    pushFrom(otherStack, n) {
        let blob = [];
        for (let i = 0; i < n; i++) {
            // add each to the front of the array to preserve order from otherStack
            blob.unshift(otherStack.pop());
        }
        this.stack = this.stack.concat(blob);
        this.size = this.stack.length;
    }
    pop() {
        let item;
        if (this.stack.length > 0) {
            item = this.stack.pop();
            this.size = this.stack.length;
            return item;
        }
        throw new Error('Attempted pop from empty stack');
    }
    push(item) {
        this.size = this.stack.push(item);
    }
}
exports.Stack = Stack;
