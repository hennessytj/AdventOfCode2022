import getInputFromFile from './getInput'

function isSubset(arrayA: number[], arrayB: number[]) {
    return arrayA.every(element => arrayB.includes(element))
}

function contains(arrayA: number[], arrayB: number[]) {
    return isSubset(arrayA, arrayB) || isSubset(arrayB, arrayA)
}

function rangeToArray(bounds: string[]) {
    const s = new Array<number>()
    for (let i = Number(bounds[0]); i <= Number(bounds[1]); i++) {
        s.push(i)
    }
    return s
}

function lineToArrayBounds(line: string) {
    return line.split(",").map(val => val.split('-'))
}

function numberPairsContained(input: string[]) {
    let numContained = 0
    for (let i = 0; i < input.length; i++) {
        const bounds = lineToArrayBounds(input[i])
        const arrayA = rangeToArray(bounds[0])
        const arrayB = rangeToArray(bounds[1])
        if (contains(arrayA, arrayB)) {
            numContained++
        }
    }
    return numContained
}

const input = getInputFromFile('build/input.txt')
console.log(numberPairsContained(input))


