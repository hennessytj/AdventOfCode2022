import nReadlines from 'n-readlines'

function stringToNumArray(numString: string) {
    return Array.from(numString, Number)
}

function transformInput(array: string[]) {
    let outerArray = []
    for (let i = 0; i < array.length; i++) {
        outerArray.push(stringToNumArray(array[i]))
    }
    return outerArray
}
function getInputGridFromFile(file: string) {
    let outerArray = []
    try {
        console.log(`Trying to open ${file}`)
        const inputGridLines = new nReadlines(file)
        let line: any
        while (line = inputGridLines.next()) {
            outerArray.push(stringToNumArray(String(line)))
        }
    } catch (e: unknown) {
        console.log(e)
        process.exit(1)
    }
    return outerArray
}

export default getInputGridFromFile