"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getInput_1 = __importDefault(require("./getInput"));
var CaseOffset;
(function (CaseOffset) {
    CaseOffset[CaseOffset["Lower"] = 96] = "Lower";
    CaseOffset[CaseOffset["Upper"] = 38] = "Upper";
})(CaseOffset || (CaseOffset = {}));
function getPriorityValue(value) {
    let priorityValue = 0;
    if (value === value.toUpperCase()) {
        priorityValue = value.charCodeAt(0) - CaseOffset.Upper;
    }
    else {
        priorityValue = value.charCodeAt(0) - CaseOffset.Lower;
    }
    return priorityValue;
}
function getSetIntersection(a, b) {
    return [...a].filter(val => b.has(val));
}
function splitAtIndex(value, index) {
    return [value.substring(0, index), value.substring(index)];
}
function getLinePriorityValue(line) {
    const splitStringArray = splitAtIndex(line, line.length / 2);
    const leftSideSet = new Set(splitStringArray[0]);
    const rightSideSet = new Set(splitStringArray[1]);
    const priority = [...getSetIntersection(leftSideSet, rightSideSet)][0];
    return getPriorityValue(priority);
}
function getSumOfPriorities(input) {
    let total = 0;
    for (let i = 0; i < input.length; i++) {
        total += getLinePriorityValue(input[i]);
    }
    return total;
}
// const rucksack = [
//     "vJrwpWtwJgWrhcsFMMfFFhFp",
//     "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL",
//     "PmmdzqPrVvPwwTWBwg",
//     "wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn",
//     "ttgJtRGJQctTZtZT",
//     "CrZsJsPPZsGzwwsLwLmpwMDw"
// ]
const input = (0, getInput_1.default)('build/input.txt');
console.log(getSumOfPriorities(input));
