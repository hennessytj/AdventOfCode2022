export class NaryTreeNode {
    private id: any
    private data: any
    private children: NaryTreeNode[]

    public constructor(id: any, data: any, children?: NaryTreeNode[]) {
        this.id = id
        this.data = data
        this.children = children || []
    }

    public getId() {
        return this.id
    }

    public getData() {
        return this.data
    }

    public setData(data: any) {
        this.data = data
    }

    public getChildren() {
        return this.children
    }

    public addChild(child: NaryTreeNode) {
        this.children.push(child)
    }
}

class NaryTree {
    private root: NaryTreeNode | null

    constructor(id?: any, data?: any, children?: NaryTreeNode[]) {
        this.root = new NaryTreeNode(id, data, children)
    }

    public getRoot() {
        return this.root
    }

    public find(root: NaryTreeNode | null, id: any, isFirstCall: boolean = false): NaryTreeNode | null {
        if (root === null) {
            return null
        }
        if (!isFirstCall && root.getId() == id) {
            return root
        }
        let match: NaryTreeNode | null = null
        for (const child of root.getChildren()) {
            match = this.find(child, id, false)
            if (match !== null) {
                break
            }
        }
        return match
    }
    
    public insert(parent: NaryTreeNode, child: NaryTreeNode) {
        // Note: will allow duplicates...
        // consider adding hash attribute to prevent duplicates
        // https://stackoverflow.com/questions/194846/is-there-hash-code-function-accepting-any-object-type
        parent.addChild(child)
    }

    public print(root: NaryTreeNode, formatData: Function, spaces: string = '') {
        spaces = spaces === undefined ? '  ' : spaces + '  '
        console.log(`${spaces}- ${root.getId()} (${formatData(root.getData())})`)
        for (const children of root.getChildren()) {
            this.print(children, formatData, spaces)
        }
    }
}

export default NaryTree

// **** Tests ****

const child1a = new NaryTreeNode(4, 'child1a')
const child1b = new NaryTreeNode(5, 'child1b')
const child1 = new NaryTreeNode(1, 'child1', [child1a, child1b])

const child2a = new NaryTreeNode(6, 'child2a')
const child2b1a = new NaryTreeNode(9, 'child2b1a')
const child2b1 = new NaryTreeNode(8, 'child2b1', [child2b1a])
const child2b = new NaryTreeNode(7, 'child2b', [child2b1])
const child2 = new NaryTreeNode(2, 'child2', [child2a, child2b])

const child3 = new NaryTreeNode(3, 'child3')
const child4a = new NaryTreeNode(11, 'child4a')
const child4 = new NaryTreeNode(10, 'child4', [child4a])
const tree = new NaryTree(0, 'root', [child1, child2, child3, child4])

function testContainsNestedChildren() {
    console.log(tree)
    console.log(tree.find(tree.getRoot(), 10))
    console.log(tree.find(tree.getRoot(), 11))
    console.log(tree.find(tree.getRoot(), 9))
    console.log(tree.find(tree.getRoot(), 9) === child2b1a)
}

function testInsert() {
    tree.insert(tree.getRoot()!, new NaryTreeNode('/', '/'))
    tree.insert(child4, new NaryTreeNode('4b', '4b'))
    tree.insert(child2b1a, new NaryTreeNode('child2b1b', 'child2b1b'))
    tree.insert(tree.find(tree.getRoot(), 7)!, new NaryTreeNode('stuff', 'stuff'))
    console.log(tree.find(tree.getRoot(), 7))
}

// testInsert()
// testContainsNestedChildren()