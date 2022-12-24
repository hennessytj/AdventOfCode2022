"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const n_readlines_1 = __importDefault(require("n-readlines"));
function getInputFromFile(file) {
    let outerArray = [];
    try {
        const inputLines = new n_readlines_1.default(file);
        let line;
        while (line = inputLines.next()) {
            outerArray.push(String(line));
        }
    }
    catch (e) {
        console.log(e);
        process.exit(1);
    }
    return outerArray;
}
exports.default = getInputFromFile;
