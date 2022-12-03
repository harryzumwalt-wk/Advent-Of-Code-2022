const fs = require('fs')

// consts
const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

// helper methods
const pipe = (...functions) => args => functions.reduce((arg, fn) => fn(arg), args)
const valueFromLetter = (letter) => letters.indexOf(letter) + 1
const getDuplicateChar = (setX, setY) => Array.from(setX).reduce((duplicate, x) => setY.has(x) ? x : duplicate) // Not fault tolerant: returns first char if none found
const getDuplicateGroup = (setX, setY, setZ) => Array.from(setX).reduce((duplicate, x) => (setY.has(x) && setZ.has(x)) ? x : duplicate)
const divisible = (x) => (x + 1) % 3 == 0
const s = (x) => new Set(x)

// data transformations
const newLineSplit = (input) => input.split('\n')
const mapToChars = (input) => input.map(x => x.split(''))
const mapToSetsOfChars = (input) => input.map(x => [new Set(x.slice(0, x.length / 2)), new Set(x.slice(x.length / 2, x.length))])
const mapToDuplicates = (input) => input.map(x => getDuplicateChar(x[0], x[1]))
const mapToValues = (input) => input.map(x => valueFromLetter(x))
const sumArr = (input) => input.reduce((acc, x) => acc + x) 
    // part 2
const mapIntoBadges = (input) => input.map((x, n) => divisible(n) ? getDuplicateGroup(s(input[n - 2]), s(input[n - 1]), s(x)) : null)
const removeNull = (input) => input.filter(x => x != null)

// composed functions
const sumOfPriorities = pipe(newLineSplit, mapToChars, mapToSetsOfChars, mapToDuplicates, mapToValues, sumArr)
const sumOfGroupBadges = pipe(newLineSplit, mapIntoBadges, removeNull, mapToValues, sumArr);

// main
const data = fs.readFileSync('./input.txt', {encoding:'utf8', flag:'r'})
console.log("part one result: ", sumOfPriorities(data))
console.log("part two result: ", sumOfGroupBadges(data))
