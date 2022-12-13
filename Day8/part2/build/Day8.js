"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getGrid_1 = __importDefault(require("./getGrid"));
// const inputGrid: Forest2D = [
//     [3, 0, 3, 7, 3],
//     [2, 5, 5, 1, 2],
//     [6, 5, 3, 3, 2],
//     [3, 3, 5, 4 ,9],
//     [3, 5, 3, 9, 0]
// ]
function get2DColumn(array, col) {
    return array.map(x => x[col]);
}
function getColScenicScore(grid, cell) {
    // turn col to row then call getRowScenicScore
    return getRowScenicScore(get2DColumn(grid, cell[1]), cell[0]);
}
function getRightScenicScore(row, element) {
    // right most edge, 0 must be returned
    let score = 0;
    if (element === (row.length - 1)) {
        return score;
    }
    // non edge cases where at least one tree is visible
    for (let i = element + 1; i < row.length; i++) {
        score++;
        if (row[element] <= row[i]) {
            break;
        }
    }
    return score;
}
function getLeftScenicScore(row, element) {
    // left most edge case, 0 must be returned
    let score = 0;
    if (element === 0) {
        return score;
    }
    // all other cases where at least one tree is visible
    for (let i = element - 1; i >= 0; i--) {
        score++;
        if (row[element] <= row[i]) {
            break;
        }
    }
    return score;
}
function getRowScenicScore(row, element) {
    // have to handle edge of rows (i.e., first and last element)
    // those elements will need to return a 0 scenic score
    // we cannot multiply those together otherwise all is 0 which is not correct
    let leftScore = getLeftScenicScore(row, element);
    let rightScore = getRightScenicScore(row, element);
    // case where element is left most in row
    if (leftScore === 0) {
        return rightScore;
    }
    // case where element is right most in row
    if (rightScore === 0) {
        return leftScore;
    }
    // neither are edges and can be safely multiplied
    return leftScore * rightScore;
}
function getScenicScoreForTree(grid, element) {
    let scenicScore = {
        treeCoords: element,
        score: 1
    };
    scenicScore.score *= getRowScenicScore(grid[element[0]], element[1]);
    scenicScore.score *= getColScenicScore(grid, [element[0], element[1]]);
    return scenicScore;
}
function findHighestScenicScore(grid) {
    let mostScenic = {
        treeCoords: [-1, -1],
        score: -1
    };
    for (let i = 0; i < grid[0].length; i++) {
        for (let j = 0; j < grid.length; j++) {
            let currentScenic = getScenicScoreForTree(grid, [i, j]);
            if (currentScenic.score > mostScenic.score) {
                mostScenic = currentScenic;
            }
        }
    }
    return mostScenic;
}
// expect 8
// console.log(`Total visible elements: ${getScenicScoreForTree(inputGrid, [3, 2]).score}`)
// expect 4
// console.log(`Total visible elements: ${getScenicScoreForTree(inputGrid, [1, 2]).score}`)
// expect 16
// console.log(`Total visible elements: ${findHighestScenicScore(inputGrid).score}`)
const inputGrid = (0, getGrid_1.default)('build/inputGrid.txt');
console.log(`Total visible elements: ${findHighestScenicScore(inputGrid).score}`);
