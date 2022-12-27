import { DoublyLinkedList } from "./DoublyLinkedList";
import { getInputAsCharsFromFile } from "./getInput";

class DataStreamReader {
    private startPacketMarkerSize: number
    private dataStreamBuffer: DoublyLinkedList
    private bytesRead: number

    constructor(startPacketMarkerSize: number) {
        this.startPacketMarkerSize = startPacketMarkerSize
        this.dataStreamBuffer = new DoublyLinkedList()
        this.bytesRead = 0
    }

    public bytesReceived() {
        return this.bytesRead
    }

    public receiveByte(byte: string) {
        this.dataStreamBuffer.insertAtTail(byte)
        this.bytesRead += 1
    }

    public findStartPacketMarkerPosition(dataStream: Function) {
        const startPacketMarkerBuffer = new Array<string>()
        // fill sliding window initially
        for (let i = 0; i < this.startPacketMarkerSize; i++) {
            try {
                const ch = dataStream()
                this.receiveByte(ch)
                startPacketMarkerBuffer.push(ch)
            } catch (e: unknown) {
                console.log('data stream error')
                process.exit(1)
            }
        }

        let ch: string
        while (true) {
            try {
                if (this.isStartMarker(startPacketMarkerBuffer)) {
                    console.log('Start Packet Marker Found! Total bytes: ', this.bytesReceived())
                    this.dataStreamBuffer.printList()
                    return this.bytesReceived()
                }

                ch = dataStream()
                this.receiveByte(ch)
                // update sliding window
                startPacketMarkerBuffer.shift()  // remove first element
                startPacketMarkerBuffer.push(ch) // append to end
            } catch (e: unknown) {
                // exception is raised when byte stream is empty
                break
            }
        }
        return -1
    }

    private isStartMarker(buffer: string[]) {
        return new Set(buffer).size === this.startPacketMarkerSize
    }
}

let getChar = getInputAsCharsFromFile('./build/test5.txt')
const test5 = new DataStreamReader(4)
test5.findStartPacketMarkerPosition(getChar)

getChar = getInputAsCharsFromFile('./build/test6.txt')
const test6 = new DataStreamReader(4)
test6.findStartPacketMarkerPosition(getChar)

getChar = getInputAsCharsFromFile('./build/test7.txt')
const test7 = new DataStreamReader(4)
test7.findStartPacketMarkerPosition(getChar)

getChar = getInputAsCharsFromFile('./build/test10.txt')
const test10 = new DataStreamReader(4)
test10.findStartPacketMarkerPosition(getChar)

getChar = getInputAsCharsFromFile('./build/test11.txt')
const test11 = new DataStreamReader(4)
test11.findStartPacketMarkerPosition(getChar)

// getChar = getInputAsCharsFromFile('./build/input.txt')
// const realInput = new DataStreamReader(4)
// realInput.findStartPacketMarkerPosition(getChar)
