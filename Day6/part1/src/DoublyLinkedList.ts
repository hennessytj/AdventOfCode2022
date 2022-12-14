import { getFileSize, getInputAsCharsFromFile } from "./getInput"

class DoublyLinkedListNode {
    public item: any
    public prev: DoublyLinkedListNode | null
    public next: DoublyLinkedListNode | null
    constructor(item: any) {
        this.item = item
        this.prev = null
        this.next = null
    }
}

export class DoublyLinkedList {
    private head: DoublyLinkedListNode | null
    private tail: DoublyLinkedListNode | null
    private size: number
    constructor() {
        this.head = null
        this.tail = null
        this.size = 0
    }

    private getDoublyLinkedListNode(item: any) {
        let node = new DoublyLinkedListNode(item)
        node.next = null
        node.prev = null
        return node
    }

    public length() {
        return this.size
    }

    public isEmpty() {
        return this.size <= 0
    }

    public insertAtTail(item: any) {
        const newNode = this.getDoublyLinkedListNode(item)
        if (null === this.head) {
            this.head = newNode
            this.tail = newNode
        } else {
            const currentTail = this.tail!
            currentTail.next = newNode
            newNode.prev = currentTail
            this.tail = newNode
        }
        this.size += 1
    }

    public printList() {
        let node = this.head
        while (node !== null) {
            console.log(node.item)
            node = node.next
        }
    }
}


// Quick tests -- not nearly robust enough, but it gets the ball rolling:-D
function testEmptyDLL() {
    const list = new DoublyLinkedList()
    return list.isEmpty() && list.length() === 0
}

function testInsertAtTailWhenEmptyDLL() {
    const list = new DoublyLinkedList()
    list.insertAtTail(42)
    list.printList()
    return !list.isEmpty() && list.length() === 1 
}

function testInsertAtTailWhenNotEmptyDLL() {
    const list = new DoublyLinkedList()
    for (let i = 0; i < 10; i++) {
        list.insertAtTail(i)
    }
    list.printList()
    return !list.isEmpty() && list.length() === 10
}

function testReadFromFileDLL() {
    const list = new DoublyLinkedList()
    const fileSize = getFileSize('./build/input.txt')
    const getNextChar = getInputAsCharsFromFile('./build/input.txt')
    for (let i = 0; i < fileSize; i++) {
        list.insertAtTail(getNextChar())
    }
    list.printList()
}

// console.log('testEmptyDLL() ', testEmptyDLL())
// console.log('testInsertAtTailWhenEmptyDLL() ', testInsertAtTailWhenEmptyDLL())
// console.log('testInsertAtTailWhenNotEmptyDLL() ', testInsertAtTailWhenNotEmptyDLL())
// testReadFromFileDLL()

