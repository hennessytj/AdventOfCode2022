"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getInput_1 = __importDefault(require("./getInput"));
const NaryTree_1 = __importStar(require("./NaryTree"));
const Stack_1 = __importDefault(require("./Stack"));
class ElvenFileSystem {
    constructor(name) {
        const data = {
            type: 'dir',
            size: 0
        };
        this.fileSystemTree = new NaryTree_1.default(name, data);
        this.directoryStack = new Stack_1.default();
        this.directoryStack.push(this.fileSystemTree.getRoot());
    }
    executeCommand(cmd) {
        switch (cmd[0]) {
            case 'cd':
                this.cd(cmd[1]);
                break;
            case 'ls':
                this.ls();
                break;
            case 'dir':
                this.mkdir(cmd[1]);
                break;
            default:
                // assumes it is file
                this.write(cmd[0], Number(cmd[1]));
        }
    }
    pwd() {
        return this.directoryStack.peek();
    }
    cd(dir) {
        if ('..' === dir) {
            // console.log(`Backing out to parent dir: ${this.directoryStack.peek()}`)
            this.directoryStack.pop();
            return;
        }
        const dirNode = this.fileSystemTree.find(this.directoryStack.peek(), dir, true);
        this.directoryStack.push(dirNode);
        // console.log(`Creating dir: ${dir}`)
    }
    ls() {
        // this.directoryStack.peek() and print all children.name, children.data
        // console.log('Executing ls')
    }
    write(name, sz, isFile = true) {
        this.fileSystemTree.insert(this.directoryStack.peek(), new NaryTree_1.NaryTreeNode(name, {
            name: name,
            type: isFile ? 'file' : 'dir',
            size: sz
        }));
        // console.log(`Creating new file: ${name}, size=${sz}`)
    }
    mkdir(name) {
        // console.log(`Making new dir: ${name}`)
        this.write(name, 0, false);
    }
    print(formatData) {
        this.fileSystemTree.print(this.fileSystemTree.getRoot(), formatData);
    }
    setDirSizes(root = this.fileSystemTree.getRoot()) {
        for (const child of root.getChildren()) {
            if (child.getData().type === 'file') {
                root.setData({
                    type: 'dir',
                    size: child.getData().size + root.getData().size
                });
            }
            else {
                root.setData({
                    type: 'dir',
                    size: this.setDirSizes(child) + root.getData().size
                });
            }
        }
        return root.getData().size;
    }
    getDirSizes(dirSizes = [], root = this.fileSystemTree.getRoot()) {
        if (dirSizes.length === 0) {
            dirSizes.push(root.getData().size);
        }
        for (const childDir of root.getChildren().filter(child => child.getData().type === 'dir')) {
            dirSizes.push(childDir.getData().size);
            this.getDirSizes(dirSizes, childDir);
        }
    }
}
// read in only dir lines and append with a number
// Note: must be init with the root directory name
// Note: the first line in the input file is removed to avoid issues since '/' dir is assumed
const efs = new ElvenFileSystem('/');
const input = (0, getInput_1.default)('./build/input.txt');
for (const line of input) {
    let tokens = line.split(' ');
    if ('$' === tokens[0]) {
        if ('cd' === tokens[1]) {
            tokens = [tokens[1], tokens[2]];
        }
        else {
            // ls does not have second arg
            tokens = [tokens[1], ''];
        }
    }
    else {
        // for file creation we only need to transform file input
        if (!isNaN(+tokens[0])) {
            // flip file size with name
            tokens = [tokens[1], tokens[0]];
        }
    }
    efs.executeCommand(tokens);
}
efs.setDirSizes();
let sizes = [];
efs.getDirSizes(sizes);
console.log(sizes.filter(sz => sz <= 100000).reduce((a, b) => a + b, 0));
efs.print((data) => (`${data.type}, size=${data.size}`));
// Solve phase - sums all dirs with sizes less than 100,000
// use DFS to create sum of all dirs
// use sum of all dirs created above and run search
