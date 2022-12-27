"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoublyLinkedList = void 0;
const getInput_1 = require("./getInput");
class DoublyLinkedListNode {
    constructor(item) {
        this.item = item;
        this.prev = null;
        this.next = null;
    }
}
class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }
    getDoublyLinkedListNode(item) {
        let node = new DoublyLinkedListNode(item);
        node.next = null;
        node.prev = null;
        return node;
    }
    length() {
        return this.size;
    }
    isEmpty() {
        return this.size <= 0;
    }
    insertAtTail(item) {
        const newNode = this.getDoublyLinkedListNode(item);
        if (null === this.head) {
            this.head = newNode;
            this.tail = newNode;
        }
        else {
            const currentTail = this.tail;
            currentTail.next = newNode;
            newNode.prev = currentTail;
            this.tail = newNode;
        }
        this.size += 1;
    }
    printList() {
        let node = this.head;
        while (node !== null) {
            console.log(node.item);
            node = node.next;
        }
    }
}
exports.DoublyLinkedList = DoublyLinkedList;
function testEmptyDLL() {
    const list = new DoublyLinkedList();
    return list.isEmpty() && list.length() === 0;
}
function testInsertAtTailWhenEmptyDLL() {
    const list = new DoublyLinkedList();
    list.insertAtTail(42);
    list.printList();
    return !list.isEmpty() && list.length() === 1;
}
function testInsertAtTailWhenNotEmptyDLL() {
    const list = new DoublyLinkedList();
    for (let i = 0; i < 10; i++) {
        list.insertAtTail(i);
    }
    list.printList();
    return !list.isEmpty() && list.length() === 10;
}
function testReadFromFileDLL() {
    const list = new DoublyLinkedList();
    const fileSize = (0, getInput_1.getFileSize)('./build/input.txt');
    const getNextChar = (0, getInput_1.getInputAsCharsFromFile)('./build/input.txt');
    for (let i = 0; i < fileSize; i++) {
        list.insertAtTail(getNextChar());
    }
    list.printList();
}
// console.log('testEmptyDLL() ', testEmptyDLL())
// console.log('testInsertAtTailWhenEmptyDLL() ', testInsertAtTailWhenEmptyDLL())
// console.log('testInsertAtTailWhenNotEmptyDLL() ', testInsertAtTailWhenNotEmptyDLL())
testReadFromFileDLL();
