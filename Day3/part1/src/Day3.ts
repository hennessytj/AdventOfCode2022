import getInputFromFile from './getInput'

enum CaseOffset { Lower = 96, Upper = 38}

function getPriorityValue(value: string) {
    let priorityValue = 0
    if (value === value.toUpperCase()) {
        priorityValue = value.charCodeAt(0) - CaseOffset.Upper
    } else {
        priorityValue = value.charCodeAt(0) - CaseOffset.Lower
    }
    return priorityValue
}

function getSetIntersection(a: Set<string>, b: Set<string>) {
    return [...a].filter(val => b.has(val))
}

function splitAtIndex(value: string, index: number) {
    return [value.substring(0, index) ,value.substring(index)]
}

function getLinePriorityValue(line: string) {
    const splitStringArray = splitAtIndex(line, line.length / 2)
    const leftSideSet = new Set<string>(splitStringArray[0])
    const rightSideSet = new Set<string>(splitStringArray[1])
    const priority = [...getSetIntersection(leftSideSet, rightSideSet)][0]
    return getPriorityValue(priority)
}

function getSumOfPriorities(input: string[]) {
    let total = 0
    for (let i = 0; i < input.length; i++) {
        total += getLinePriorityValue(input[i])
    }
    return total
}


// const rucksack = [
//     "vJrwpWtwJgWrhcsFMMfFFhFp",
//     "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL",
//     "PmmdzqPrVvPwwTWBwg",
//     "wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn",
//     "ttgJtRGJQctTZtZT",
//     "CrZsJsPPZsGzwwsLwLmpwMDw"
// ]

const input = getInputFromFile('build/input.txt')
console.log(getSumOfPriorities(input))

