const fs = require('fs')

// enums
const ShapeScores = {
    rock: 1,
    paper: 2,
    scissors: 3
}
const ResultScores = {
    loss: 0,
    draw: 3,
    win: 6
}

const xShapes = {
    'A': 'rock',
    'B': 'paper',
    'C': 'scissors'
}

const yShapes = {
    'X': 'rock',
    'Y': 'paper',
    'Z': 'scissors'
}

// helper methods
const pipe = (...functions) => args => functions.reduce((arg, fn) => fn(arg), args)

const determineScore = (shapeX, shapeY) => {
    switch(yShapes[shapeY]) {
        case 'rock':
            if(xShapes[shapeX] == 'paper') {return ShapeScores.rock + ResultScores.loss}
            if(xShapes[shapeX] == 'rock') {return ShapeScores.rock + ResultScores.draw}
            return ShapeScores.rock + ResultScores.win
        case 'paper':
            if(xShapes[shapeX] == 'scissors') {return ShapeScores.paper + ResultScores.loss}
            if(xShapes[shapeX] == 'paper') {return ShapeScores.paper + ResultScores.draw}
            return ShapeScores.paper + ResultScores.win
        case 'scissors':
            if(xShapes[shapeX] == 'rock') {return ShapeScores.scissors + ResultScores.loss}
            if(xShapes[shapeX] == 'scissors') {return ShapeScores.scissors + ResultScores.draw}
            return ShapeScores.scissors + ResultScores.win
        default:
            throw new Error('Invalid shape: ' + shapeY)
    }
}

const determinePlay = (shapeX, code) => {
    switch(xShapes[shapeX]) {
        case 'rock':
            if(code == 'X') {return 'Z'}
            if(code == 'Y') {return 'X'}
            return 'Y'
        case 'paper':
            if(code == 'X') {return 'X'}
            if(code == 'Y') {return 'Y'}
            return 'Z'
        case 'scissors':
            if(code == 'X') {return 'Y'}
            if(code == 'Y') {return 'Z'}
            return 'X'
    }
}

// data transformations
const newLineSplit = (input) => input.split('\n');
const spaceSplit = (input) => input.map(x => x.split(' '))
const mapPlay = (input) => input.map(x => x.map((y, i) => i == 0 ? y : determinePlay(x[0], y)))
const mapToScores = (input) => input.map(x => determineScore(x[0], x[1]))
const sumArr = (input) => input.reduce((acc, x) => acc + parseInt(x))

// composed functions
const evalCheatSheet = pipe(newLineSplit, spaceSplit, mapToScores, sumArr)
const evalCheatSheetCorrect = pipe(newLineSplit, spaceSplit, mapPlay, mapToScores, sumArr)

const data = fs.readFileSync('./input.txt', {encoding:'utf8', flag:'r'})
console.log("part 1 result: ", evalCheatSheet(data))
console.log('part 2 result: ', evalCheatSheetCorrect(data));


