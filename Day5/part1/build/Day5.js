"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Stack_js_1 = require("./Stack.js");
const instructionParser_js_1 = require("./instructionParser.js");
const getInput_js_1 = __importDefault(require("./getInput.js"));
const scenarioState = [
    new Stack_js_1.Stack(),
    new Stack_js_1.Stack(['D', 'L', 'J', 'R', 'V', 'G', 'F']),
    new Stack_js_1.Stack(['T', 'P', 'M', 'B', 'V', 'H', 'J', 'S']),
    new Stack_js_1.Stack(['V', 'H', 'M', 'F', 'D', 'G', 'P', 'C']),
    new Stack_js_1.Stack(['M', 'D', 'P', 'N', 'G', 'Q']),
    new Stack_js_1.Stack(['J', 'L', 'H', 'N', 'F']),
    new Stack_js_1.Stack(['N', 'F', 'V', 'Q', 'D', 'G', 'T', 'Z']),
    new Stack_js_1.Stack(['F', 'D', 'B', 'L']),
    new Stack_js_1.Stack(['M', 'J', 'B', 'S', 'V', 'D', 'N']),
    new Stack_js_1.Stack(['G', 'L', 'D']) // stack 9
];
function makeInstruction(line) {
    return (0, instructionParser_js_1.parseInstruction)(line);
}
function makeMove(state, instruction) {
    const amountToMove = instruction[0];
    const fromStack = instruction[1];
    const toStack = instruction[2];
    state[toStack].pushFrom(state[fromStack], amountToMove);
}
function runAllInstructions(input) {
    for (const line of input) {
        makeMove(scenarioState, makeInstruction(line));
    }
}
function topValues(state) {
    // create a string from each of the remaining values on top of stack
    // element 0 of state is not used since we start with index 1
    let result = '';
    for (let i = 1; i < state.length; i++) {
        result += state[i].pop();
    }
    return result;
}
const input = (0, getInput_js_1.default)('./build/input.txt');
// Exhaust list of instructions to get final state
runAllInstructions(input);
// Get the values remaining on top of stacks and print as a string
console.log(topValues(scenarioState));
