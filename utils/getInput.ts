import * as fs from 'fs'
import nReadlines from 'n-readlines'

function getInputFromFile(file: string) {
    let outerArray = []
    try {
        const inputLines = new nReadlines(file)
        let line: any
        while (line = inputLines.next()) {
            outerArray.push(String(line))
        }
    } catch (e: unknown) {
        console.log(e)
        process.exit(1)
    }
    return outerArray
}

export function getFileSize(file: string) {
    let size: number
    try {
        size = fs.statSync(file).size
    } catch (e: unknown) {
        console.log(e)
        process.exit(1)
    }
    return size
}

export function getInputAsCharsFromFile(file: string) {
    // Not really an iterator but used like one
    // Call outer function to return an inner function which
    // when called will return a single character from a file
    const fileSize = getFileSize(file)
    const fd = fs.openSync(file, 'r')!
    let offset = 0
    function next() {
        if (offset < fileSize) {
            let buffer = Buffer.alloc(1)
            fs.readSync(fd, buffer, 0, 1, offset++)
            return String(buffer)
        } else {
            throw new Error('Iterator exhausted')
        }
    }
    return next
}

export default getInputFromFile