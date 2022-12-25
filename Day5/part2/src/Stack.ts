export class Stack {
    private stack: string[]
    private size: number
    constructor(items?: string[] | undefined) {
        this.stack = items !== undefined ? items : new Array<string>()
        this.size = this.stack.length
    }

    getSize() {
        return this.size
    }

    getItems() {
        return this.stack
    }

    pushFrom(otherStack: Stack, n: number) {
        let blob = []
        for (let i = 0; i < n; i++) {
            // add each to the front of the array to preserve order from otherStack
            blob.unshift(otherStack.pop())
        }
        this.stack = this.stack.concat(blob)
        this.size = this.stack.length
    }

    pop() {
        let item: string
        if (this.stack.length > 0) {
            item = this.stack.pop()!
            this.size = this.stack.length
            return item
        }
        throw new Error('Attempted pop from empty stack')
    }

    push(item: string) {
        this.size = this.stack.push(item)
    }
}
