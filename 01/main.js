const fs = require('fs')

// helper method
const pipe = (...functions) => args => functions.reduce((arg, fn) => fn(arg), args)

// reducer
const sumItems = (acc, item) => acc + parseInt(item)

// data transformations
const blankLineSplit = (string) => string.split(/\n\s*\n/)
const newLineSplit = (stringArr) => stringArr.map(string => string.split('\n'))
const reduceWithSum = (twoDStringArr) => twoDStringArr.map(arr => arr.reduce(sumItems, 0))
    // 01
const largestSum = (numArr) => numArr.sort((a, b) => b - a)[0]
    // 02
const threeLargestSum = (numArr) => numArr.sort((a, b) => b - a).slice(0, 3).reduce(sumItems, 0)

// composed functions
const base = pipe(blankLineSplit, newLineSplit, reduceWithSum)
const largest = pipe(base, largestSum)
const threeLargest = pipe(base, threeLargestSum)

// main
const data = fs.readFileSync('./input.txt', {encoding:'utf8', flag:'r'})
console.log("Part 1 answer: ", largest(data));
console.log("Part 2 answer: ", threeLargest(data));