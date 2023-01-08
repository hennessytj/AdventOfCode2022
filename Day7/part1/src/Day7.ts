import getInputFromFile from './getInput'
import NaryTree, { NaryTreeNode } from './NaryTree'
import Stack from './Stack'

type fileSystemObject = {
    name: string;
    id: number;
    type: string; // file or directory
    size: number; // directories are 0, files > 0
}

type stackFileObject = {
    name: string; // dir name
    fd: number;   // file descriptor
}

type command = [string, any, any?]

class ElvenFileSystem {
    private fileSystemTree: NaryTree // linux like file system structure
    private directoryStack: Stack    // keeps track of current dir

    constructor(name: string) {
        const data = {
            type: 'dir', 
            size: 0
        }
        this.fileSystemTree = new NaryTree(name, data)
        this.directoryStack = new Stack()
        this.directoryStack.push(this.fileSystemTree.getRoot())
    }

    public executeCommand(cmd: command) {
        switch(cmd[0]) {
            case 'cd':
                this.cd(cmd[1])
                break
            case 'ls':
                this.ls()
                break
            case 'dir':
                this.mkdir(cmd[1])
                break
            default:
                // assumes it is file
                this.write(cmd[0], Number(cmd[1]))
        }
    }

    public pwd() {
        return this.directoryStack.peek()
    }

    public cd(dir: string) {
        if ('..' === dir) {
            // console.log(`Backing out to parent dir: ${this.directoryStack.peek()}`)
            this.directoryStack.pop()
            return
        }

        const dirNode = this.fileSystemTree.find(
            this.directoryStack.peek(), dir, true)
        this.directoryStack.push(dirNode)
        // console.log(`Creating dir: ${dir}`)
    }

    public ls() {
        // this.directoryStack.peek() and print all children.name, children.data
        // console.log('Executing ls')
    }

    public write(name: string, sz: number, isFile: boolean = true) {
        this.fileSystemTree!.insert(
            this.directoryStack.peek(),
            new NaryTreeNode(name, {
                name: name,
                type: isFile ? 'file' : 'dir',
                size: sz
            })
        )
        // console.log(`Creating new file: ${name}, size=${sz}`)
    }

    public mkdir(name: string) {
        // console.log(`Making new dir: ${name}`)
        this.write(name, 0, false)
    }

    public print(formatData: Function) {
        this.fileSystemTree.print(this.fileSystemTree.getRoot()!, formatData)
    }

    public setDirSizes(root: NaryTreeNode = this.fileSystemTree.getRoot()!) {
        for (const child of root.getChildren()) {
            if (child.getData().type === 'file') {
                root.setData({
                    type: 'dir',
                    size: child.getData().size + root.getData().size
                })
            } else {
                root.setData({
                    type: 'dir',
                    size: this.setDirSizes(child) + root.getData().size
                })
            }
        }
        return root.getData().size
    }

    public getDirSizes(dirSizes: number[] = [], root: NaryTreeNode = this.fileSystemTree.getRoot()!) {
        if (dirSizes.length === 0) {
            dirSizes.push(root.getData().size)
        }
        for (const childDir of root.getChildren().filter(child => child.getData().type === 'dir')) {
            dirSizes.push(childDir.getData().size)
            this.getDirSizes(dirSizes, childDir)
        }
    }
}


// read in only dir lines and append with a number

// Note: must be init with the root directory name
// Note: the first line in the input file is removed to avoid issues since '/' dir is assumed
const efs = new ElvenFileSystem('/')
const input = getInputFromFile('./build/input.txt')
for (const line of input) {
    let tokens = line.split(' ')
    if ('$' === tokens[0]) {
        if ('cd' === tokens[1]) {
            tokens = [tokens[1], tokens[2]]
        } else {
            // ls does not have second arg
            tokens = [tokens[1], '']
        }
    } else {
        // for file creation we only need to transform file input
        if (!isNaN(+tokens[0])) {
            // flip file size with name
            tokens = [tokens[1], tokens[0]]
        }
    }
    efs.executeCommand(tokens as command)
}

efs.setDirSizes()
let sizes: number[] = []
efs.getDirSizes(sizes)
console.log(sizes.filter(sz => sz <= 100000).reduce((a, b) => a + b, 0))
efs.print((data: fileSystemObject) => (`${data.type}, size=${data.size}`))


// Solve phase - sums all dirs with sizes less than 100,000
// use DFS to create sum of all dirs
// use sum of all dirs created above and run search