import getInputFromFile from './getInput'

function getRoundScore(moves: string) {
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
    }[moves]
}

function getTotalScore(inputMoves: string[]) {
    let totalScore = 0
    for (let i = 0; i < inputMoves.length; i++) {
        totalScore += getRoundScore(inputMoves[i])!
    }
    return totalScore
}

const input = getInputFromFile('build/input.txt')
console.log(getTotalScore(input))
