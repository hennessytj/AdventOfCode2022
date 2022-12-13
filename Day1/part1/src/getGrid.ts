import nReadlines  from 'n-readlines'

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

export default getInputFromFile