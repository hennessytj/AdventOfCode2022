"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getGrid_1 = __importDefault(require("./getGrid"));
// const inputGrid: Tree2D = [
//     [3, 0, 3, 7, 3],
//     [2, 5, 5, 1, 2],
//     [6, 5, 3, 3, 2],
//     [3, 3, 5, 4 ,9],
//     [3, 5, 3, 9, 0]
// ]
function get2DColumn(array, col) {
    return array.map(x => x[col]);
}
function checkColumnVisibleBottom(grid, cell) {
    const column = get2DColumn(grid, cell[1]);
    return checkRowVisibleRight(column, cell[0]);
}
function checkColumnVisibleTop(grid, cell) {
    const column = get2DColumn(grid, cell[1]);
    return checkRowVisibleLeft(column, cell[0]);
}
function checkColumn(grid, cell) {
    return checkColumnVisibleTop(grid, cell) || checkColumnVisibleBottom(grid, cell);
}
function checkRowVisibleRight(row, element) {
    for (let i = element + 1; i < row.length; i++) {
        if (row[element] <= row[i]) {
            return false;
        }
    }
    return true;
}
function checkRowVisibleLeft(row, element) {
    for (let i = element - 1; i >= 0; i--) {
        if (row[element] <= row[i]) {
            return false;
        }
    }
    return true;
}
function checkRow(row, element) {
    return checkRowVisibleLeft(row, element) || checkRowVisibleRight(row, element);
}
function cellIsVisible(grid, cell) {
    return checkRow(grid[cell[0]], cell[1]) || checkColumn(grid, cell);
}
function findVisibleTrees(grid) {
    let numTreesVisible = 2 * (grid.length) + 2 * (grid.length - 2);
    for (let i = 1; i < grid[0].length - 1; i++) {
        for (let j = 1; j < grid.length - 1; j++) {
            if (cellIsVisible(grid, [i, j])) {
                numTreesVisible++;
            }
        }
    }
    return numTreesVisible;
}
// console.log(`Total visible elements: ${findVisibleTrees(inputGrid)}`)
const inputGrid = (0, getGrid_1.default)('build/inputGrid.txt');
console.log(`Total visible elements: ${findVisibleTrees(inputGrid)}`);
