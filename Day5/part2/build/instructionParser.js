"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseInstruction = void 0;
function parseInstruction(instruction) {
    // instruction format: move 'AMOUNT' from 'STACK#' to 'STACK#'
    let result = Number(instruction.replace(/\D/g, ""));
    let numbers = [-1, -1, -1];
    numbers[2] = result % 10;
    result = Math.floor(result / 10);
    numbers[1] = result % 10;
    result = Math.floor(result / 10);
    numbers[0] = result;
    return numbers;
}
exports.parseInstruction = parseInstruction;
