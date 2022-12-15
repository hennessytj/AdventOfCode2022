"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getInput_1 = __importDefault(require("./getInput"));
// The Elf finishes helping with the tent and sneaks back over to you. 
// "Anyway, the second column says how the round needs to end: X means you need
// to lose, Y means you need to end the round in a draw, and Z means you need to win.
// The total score is still calculated in the same way, but now you need to figure
// out what shape to choose so the round ends as indicated. The example above now goes like this:
// In the first round, your opponent will choose Rock (A), and you need the round to end in a 
// draw (Y), so you also choose Rock. This gives you a score of 1 + 3 = 4.
// In the second round, your opponent will choose Paper (B), and you choose Rock so you
// lose (X) with a score of 1 + 0 = 1.
// In the third round, you will defeat your opponent's Scissors with Rock for a score of 1 + 6 = 7.
// A rock 1
// B paper 2
// C scissors 3
// loss 0
// draw 3
// win 6
// X loss 0
// Y draw 3
// Z win 6
function getRoundScore(moves) {
    return {
        "A X": 3,
        "A Y": 4,
        "A Z": 8,
        "B X": 1,
        "B Y": 5,
        "B Z": 9,
        "C X": 2,
        "C Y": 6,
        "C Z": 7
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
