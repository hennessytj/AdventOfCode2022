import getInputGridFromFile from './getGrid'

type Index = number
type IndexPair = [Index, Index]
type Tree = number
type Forest2D = Tree[][]
type Forest1D = Tree[]
type ScenicScore = {
    treeCoords: IndexPair;
    score: number;
}

// const inputGrid: Forest2D = [
//     [3, 0, 3, 7, 3],
//     [2, 5, 5, 1, 2],
//     [6, 5, 3, 3, 2],
//     [3, 3, 5, 4 ,9],
//     [3, 5, 3, 9, 0]
// ]

function get2DColumn(array: number[][], col: Index) {
    return array.map(x => x[col])
}

function getColScenicScore(grid: Forest2D, cell: IndexPair) {
    // turn col to row then call getRowScenicScore
    return getRowScenicScore(get2DColumn(grid, cell[1]), cell[0])
}

function getRightScenicScore(row: Forest1D, element: Index) {
    // right most edge, 0 must be returned
    let score = 0
    if (element === (row.length - 1)) {
        return score
    }

    // non edge cases where at least one tree is visible
    for (let i = element + 1; i < row.length; i++) {
        score++
        if (row[element] <= row[i]) {
            break
        }
    }
    return score
}

function getLeftScenicScore(row: Forest1D, element: Index) {
    // left most edge case, 0 must be returned
    let score = 0
    if (element === 0) {
        return score
    }

    // all other cases where at least one tree is visible
    for (let i = element - 1; i >= 0; i--) {
        score++
        if (row[element] <= row[i]) {
            break
        }
    }
    return score
}

function getRowScenicScore(row: Forest1D, element: Index) {
    // have to handle edge of rows (i.e., first and last element)
    // those elements will need to return a 0 scenic score
    // we cannot multiply those together otherwise all is 0 which is not correct
    let leftScore = getLeftScenicScore(row, element)
    let rightScore = getRightScenicScore(row, element)

    // case where element is left most in row
    if (leftScore === 0) {
        return rightScore
    }

    // case where element is right most in row
    if (rightScore === 0) {
        return leftScore
    }

    // neither are edges and can be safely multiplied
    return leftScore * rightScore
}

function getScenicScoreForTree(grid: Forest2D, element: IndexPair): ScenicScore {
    let scenicScore = {
        treeCoords: element,
        score: 1
    }
    scenicScore.score *= getRowScenicScore(grid[element[0]], element[1])
    scenicScore.score *= getColScenicScore(grid, [element[0], element[1]])
    return scenicScore
}

function findHighestScenicScore(grid: Forest2D): ScenicScore {
    let mostScenic: ScenicScore = {
        treeCoords: [-1, -1],
        score: -1
    }
    for (let i = 0; i < grid[0].length; i++) {
        for (let j = 0; j < grid.length; j++) {
            let currentScenic = getScenicScoreForTree(grid, [i, j])
            if (currentScenic.score > mostScenic.score) {
                mostScenic = currentScenic
            }
        }
    }
    return mostScenic
}

// expect 8
// console.log(`Total visible elements: ${getScenicScoreForTree(inputGrid, [3, 2]).score}`)

// expect 4
// console.log(`Total visible elements: ${getScenicScoreForTree(inputGrid, [1, 2]).score}`)

// expect 16
// console.log(`Total visible elements: ${findHighestScenicScore(inputGrid).score}`)

const inputGrid = getInputGridFromFile('build/inputGrid.txt')
console.log(`Total visible elements: ${findHighestScenicScore(inputGrid).score}`)