"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getInput_1 = __importDefault(require("./getInput"));
function getRoundScore(moves) {
    return {
        "A X": 4,
        "A Y": 8,
        "A Z": 3,
        "B X": 1,
        "B Y": 5,
        "B Z": 9,
        "C X": 7,
        "C Y": 2,
        "C Z": 6
    }[moves];
}
function getTotalScore(inputMoves) {
    let totalScore = 0;
    for (let i = 0; i < inputMoves.length; i++) {
        totalScore += getRoundScore(inputMoves[i]);
    }
    return totalScore;
}
const input = (0, getInput_1.default)('build/input.txt');
console.log(getTotalScore(input));
