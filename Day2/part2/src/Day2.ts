import getInputFromFile from './getInput'

function getRoundScore(moves: string) {
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
