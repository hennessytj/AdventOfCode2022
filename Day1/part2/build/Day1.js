"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const priority_queue_typescript_1 = __importDefault(require("priority-queue-typescript"));
const getInput_1 = __importDefault(require("./getInput"));
// let cals = [
//     "1000",
//     "2000",
//     "3000",
//     "",
//     "4000",
//     "",
//     "5000",
//     "6000",
//     "",
//     "7000",
//     "8000",
//     "9000",
//     "",
//     "10000"
// ]
function isEmptyString(data) {
    if (data.trim().length == 0) {
        return true;
    }
    return false;
}
function sumAllCalories(calories) {
    const queue = new priority_queue_typescript_1.default(3, (a, b) => b - a);
    let sumCals = 0;
    for (let i = 0; i < calories.length; i++) {
        if (isEmptyString(calories[i])) {
            queue.add(sumCals);
            sumCals = 0;
            continue;
        }
        sumCals += Number(calories[i]);
    }
    return [queue.poll(), queue.poll(), queue.poll()].reduce((accumulator, current) => {
        return Number(accumulator) + Number(current);
    }, 0);
}
//] take file in as array of strings
const input = (0, getInput_1.default)('build/input.txt');
console.log(sumAllCalories(input));
// console.log(getMostCalories(cals))
