"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const n_readlines_1 = __importDefault(require("n-readlines"));
function stringToNumArray(numString) {
    return Array.from(numString, Number);
}
function transformInput(array) {
    let outerArray = [];
    for (let i = 0; i < array.length; i++) {
        outerArray.push(stringToNumArray(array[i]));
    }
    return outerArray;
}
function getInputGridFromFile(file) {
    let outerArray = [];
    try {
        console.log(`Trying to open ${file}`);
        const inputGridLines = new n_readlines_1.default(file);
        let line;
        while (line = inputGridLines.next()) {
            outerArray.push(stringToNumArray(String(line)));
        }
    }
    catch (e) {
        console.log(e);
        process.exit(1);
    }
    return outerArray;
}
exports.default = getInputGridFromFile;
