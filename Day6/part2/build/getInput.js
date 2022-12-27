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
exports.getInputAsCharsFromFile = exports.getFileSize = void 0;
const fs = __importStar(require("fs"));
const n_readlines_1 = __importDefault(require("n-readlines"));
function getInputFromFile(file) {
    let outerArray = [];
    try {
        const inputLines = new n_readlines_1.default(file);
        let line;
        while (line = inputLines.next()) {
            outerArray.push(String(line));
        }
        inputLines.close();
    }
    catch (e) {
        console.log(e);
        process.exit(1);
    }
    return outerArray;
}
function getFileSize(file) {
    let size;
    try {
        size = fs.statSync(file).size;
    }
    catch (e) {
        console.log(e);
        process.exit(1);
    }
    return size;
}
exports.getFileSize = getFileSize;
function getInputAsCharsFromFile(file) {
    // Not really an iterator but used like one
    // Call outer function to return an inner function which
    // when called will return a single character from a file
    const fileSize = getFileSize(file);
    const fd = fs.openSync(file, 'r');
    let offset = 0;
    function next() {
        if (offset < fileSize) {
            let buffer = Buffer.alloc(1);
            fs.readSync(fd, buffer, 0, 1, offset++);
            return String(buffer);
        }
        else {
            throw new Error('Iterator exhausted');
        }
    }
    return next;
}
exports.getInputAsCharsFromFile = getInputAsCharsFromFile;
exports.default = getInputFromFile;
