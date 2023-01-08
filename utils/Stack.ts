class Stack {
    private stack: any[]
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
        for (let i = 0; i < n; i++) {
            this.stack.push(otherStack.pop())
        }
    }

    pop() {
        let item: any
        if (this.stack.length > 0) {
            item = this.stack.pop()!
            this.size = this.stack.length
            return item
        }
        throw new Error('Attempted pop from empty stack')
    }

    push(item: any) {
        this.size = this.stack.push(item)
    }

    peek() {
        return this.stack.slice(-1)[0]
    }
}

export default Stack