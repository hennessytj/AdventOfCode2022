# --- Day 6: Tuning Trouble Part 2 ---

## Usage

Assumes node, npm, and tsc are installed.

### Install

```bash
$ npm init
```

### Build

```bash
$ npm run build
```

### Clean

```bash
$ npm run clean
```

### Run

```bash
$ npm start
```

## Problem Statement

Your device's communication system is correctly detecting packets, but still isn't working. It looks like it also needs to look for messages.

A start-of-message marker is just like a start-of-packet marker, except it consists of 14 distinct characters rather than 4.

Here are the first positions of start-of-message markers for all of the above examples:

`mjqjpqmgbljsphdztnvjfqwrcgsmlb`: first marker after character 19

`bvwbjplbgvbhsrlpgdmjqwftvncz`: first marker after character 23

`nppdvjthqldpwncqszvftbrmjlhg`: first marker after character 23

`nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg`: first marker after character 29

`zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw`: first marker after character 26

How many characters need to be processed before the first start-of-message marker is detected?