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

function getMostCalories(calories: string[]) {
    let mostCals = -1
    let currentCals = 0
    for (let i = 0; i < calories.length; i++) {
        if (isEmptyString(calories[i]) && mostCals < currentCals) {
            mostCals = currentCals
        } 

        if (isEmptyString(calories[i])) {
            currentCals = 0
            continue
        }

        currentCals += Number(calories[i])
    }
    return mostCals
}


//] take file in as array of strings

const input = getInputFromFile('build/input.txt')
console.log(getMostCalories(input))

// console.log(getMostCalories(cals))