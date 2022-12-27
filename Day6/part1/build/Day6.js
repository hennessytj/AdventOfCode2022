"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DoublyLinkedList_1 = require("./DoublyLinkedList");
const getInput_1 = require("./getInput");
class DataStreamReader {
    constructor(startPacketMarkerSize) {
        this.startPacketMarkerSize = startPacketMarkerSize;
        this.dataStreamBuffer = new DoublyLinkedList_1.DoublyLinkedList();
        this.bytesRead = 0;
    }
    bytesReceived() {
        return this.bytesRead;
    }
    receiveByte(byte) {
        this.dataStreamBuffer.insertAtTail(byte);
        this.bytesRead += 1;
    }
    findStartPacketMarkerPosition(dataStream) {
        const startPacketMarkerBuffer = new Array();
        // fill sliding window initially
        for (let i = 0; i < this.startPacketMarkerSize; i++) {
            try {
                const ch = dataStream();
                this.receiveByte(ch);
                startPacketMarkerBuffer.push(ch);
            }
            catch (e) {
                console.log('data stream error');
                process.exit(1);
            }
        }
        let ch;
        while (true) {
            try {
                if (this.isStartMarker(startPacketMarkerBuffer)) {
                    console.log('Start Packet Marker Found! Total bytes: ', this.bytesReceived());
                    this.dataStreamBuffer.printList();
                    return this.bytesReceived();
                }
                ch = dataStream();
                this.receiveByte(ch);
                // update sliding window
                startPacketMarkerBuffer.shift(); // remove first element
                startPacketMarkerBuffer.push(ch); // append to end
            }
            catch (e) {
                // exception is raised when byte stream is empty
                break;
            }
        }
        return -1;
    }
    isStartMarker(buffer) {
        return new Set(buffer).size === this.startPacketMarkerSize;
    }
}
let getChar = (0, getInput_1.getInputAsCharsFromFile)('./build/test5.txt');
const test5 = new DataStreamReader(4);
test5.findStartPacketMarkerPosition(getChar);
getChar = (0, getInput_1.getInputAsCharsFromFile)('./build/test6.txt');
const test6 = new DataStreamReader(4);
test6.findStartPacketMarkerPosition(getChar);
getChar = (0, getInput_1.getInputAsCharsFromFile)('./build/test7.txt');
const test7 = new DataStreamReader(4);
test7.findStartPacketMarkerPosition(getChar);
getChar = (0, getInput_1.getInputAsCharsFromFile)('./build/test10.txt');
const test10 = new DataStreamReader(4);
test10.findStartPacketMarkerPosition(getChar);
getChar = (0, getInput_1.getInputAsCharsFromFile)('./build/test11.txt');
const test11 = new DataStreamReader(4);
test11.findStartPacketMarkerPosition(getChar);
// getChar = getInputAsCharsFromFile('./build/input.txt')
// const realInput = new DataStreamReader(4)
// realInput.findStartPacketMarkerPosition(getChar)
