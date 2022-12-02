const fs = require('fs')

// helper method
const pipe = (...functions) => args => functions.reduce((arg, fn) => fn(arg), args)

// reducer
const sumItems = (acc, item) => acc + parseInt(item)

// data transformations
const blankLineSplit = (string) => string.split(/\n\s*\n/)
const newLineSplit = (stringArr) => stringArr.map(string => string.split('\n'))
const biggestSum = (twoDStringArr) => twoDStringArr.map(x => x.reduce(sumItems, 0)).sort((a, b) => b - a)[0]

const reduceWithSum = (twoDStringArr) => twoDStringArr.map(arr => arr.reduce(sumItems, 0))
const sortSliceandSum = (numArr) => numArr.sort((a, b) => b - a).slice(0, 3).reduce(sumItems, 0)

// composed functions
const largest = pipe(blankLineSplit, newLineSplit, biggestSum);
const threeLargestSum = pipe(blankLineSplit, newLineSplit, reduceWithSum, sortSliceandSum)

// main
const data = fs.readFileSync('./input.txt', {encoding:'utf8', flag:'r'})
const partOneResult = largest(data)
const partTwoResult = threeLargestSum(data)

console.log("Part 1 answer: ", partOneResult);
console.log("Part 2 answer: ", partTwoResult);