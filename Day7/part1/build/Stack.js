"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
        for (let i = 0; i < n; i++) {
            this.stack.push(otherStack.pop());
        }
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
    peek() {
        return this.stack.slice(-1)[0];
    }
}
exports.default = Stack;
