import { getInputAsCharsFromFile } from "./getInput";
import DataStreamReader from "./DataStreamReader";

let getChar = getInputAsCharsFromFile('./build/input.txt')
const stream = new DataStreamReader(14)
stream.findStartPacketMarkerPosition(getChar)