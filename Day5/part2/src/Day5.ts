import { Stack } from './Stack.js'
import { parseInstruction } from './instructionParser.js'
import getInputFromFile from './getInput.js'

type Stacks = Stack[]
type Instruction = [number, number, number]

const scenarioState: Stacks = [
    new Stack(),                                         // stack 0 not used, just for easier indexing
    new Stack(['D', 'L', 'J', 'R', 'V', 'G', 'F']),      // stack 1
    new Stack(['T', 'P', 'M', 'B', 'V', 'H', 'J', 'S']), // stack 2
    new Stack(['V', 'H', 'M', 'F', 'D', 'G', 'P', 'C']), // stack 3
    new Stack(['M', 'D', 'P', 'N', 'G', 'Q']),           // stack 4
    new Stack(['J', 'L', 'H', 'N', 'F']),                // stack 5
    new Stack(['N', 'F', 'V', 'Q', 'D', 'G', 'T', 'Z']), // stack 6
    new Stack(['F', 'D', 'B', 'L']),                     // stack 7
    new Stack(['M', 'J', 'B', 'S', 'V','D', 'N']),       // stack 8
    new Stack(['G', 'L', 'D'])                           // stack 9
]

function makeInstruction(line: string): Instruction {
    return parseInstruction(line) as Instruction
}

function makeMove(state: Stacks, instruction: Instruction) {
    const amountToMove = instruction[0]
    const fromStack = instruction[1]
    const toStack = instruction[2]
    state[toStack].pushFrom(state[fromStack], amountToMove)
}

function runAllInstructions(input: string[]) {
    for (const line of input) {
        makeMove(scenarioState, makeInstruction(line))
    }
}

function topValues(state: Stacks) {
    // create a string from each of the remaining values on top of stack
    // element 0 of state is not used since we start with index 1
    let result = ''
    for (let i = 1; i < state.length; i++) {
        result += state[i].pop()
    }
    return result
}

const input = getInputFromFile('./build/input.txt')
// Exhaust list of instructions to get final state
runAllInstructions(input)
// Get the values remaining on top of stacks and print as a string
console.log(topValues(scenarioState))
