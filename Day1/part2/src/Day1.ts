import PriorityQueue from 'priority-queue-typescript'
import getInputFromFile from './getInput'

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

function isEmptyString(data: string) {
    if (data.trim().length == 0) {
        return true
     }
     return false
}

function sumAllCalories(calories: string[]) {
    const queue = new PriorityQueue<Number>(
        3,
        (a: number, b: number) => b - a
    )
    let sumCals = 0
    for (let i = 0; i < calories.length; i++) {
        if (isEmptyString(calories[i])) {
            queue.add(sumCals)
            sumCals = 0
            continue
        }
        sumCals += Number(calories[i])
    }
    return [queue.poll(), queue.poll(), queue.poll()].reduce((accumulator, current) => {
        return Number(accumulator) + Number(current)
    }, 0)
}


const input = getInputFromFile('build/input.txt')
console.log(sumAllCalories(input))
