"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getInput_1 = require("./getInput");
const DataStreamReader_1 = __importDefault(require("./DataStreamReader"));
let getChar = (0, getInput_1.getInputAsCharsFromFile)('./build/input.txt');
const stream = new DataStreamReader_1.default(14);
stream.findStartPacketMarkerPosition(getChar);
