import getInputFromFile from "./getInput"

function intersects(setA: Number[], setB: Number[]) {
    // returns intersection of setA and setB
    return setA.some(x => setB.includes(x))
}

function setsIntersect(a: Number[], b: Number[]) {
    return intersects(a, b) || intersects(b, a)
}

function stringToNumberRangeArray(inputArray: string[]) {
    let numberArray = new Array<Number>()
    for (let i = Number(inputArray[0]); i <= Number(inputArray[1]); i++) {
        numberArray.push(i)
    }
    return numberArray
}

function lineToNumberArrays(line: string) {
    const splitArrays = line.split(',').map(val => val.split('-'))
    return [stringToNumberRangeArray(splitArrays[0]),
        stringToNumberRangeArray(splitArrays[1])
    ]
}

function getTotalIntersections(input: string[]) {
    let accumulator = 0
    for (let i = 0; i < input.length; i++) {
        const rangeArrays = lineToNumberArrays(input[i])
        if (setsIntersect(rangeArrays[0], rangeArrays[1])) {
            accumulator++
        }
    }
    return accumulator
}

const input = getInputFromFile('./build/input.txt')
console.log(getTotalIntersections(input))
