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

function getLinesPriorityValue(line1: string, line2: string, line3: string) {
    const line1Set = new Set<string>(line1)
    const line2Set = new Set<string>(line2)
    const line3Set = new Set<string>(line3)
    const priority = [...getSetIntersection(
        new Set<string>(getSetIntersection(line1Set, line2Set)), 
        line3Set
        )][0]
    return getPriorityValue(priority)
}

function getSumOfPriorities(input: string[]) {
    let total = 0
    for (let i = 0; i < input.length; i += 3) {
        total += getLinesPriorityValue(input[i], input[i + 1], input[i + 2])
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

