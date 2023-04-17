import { config } from "./config.js"

export default class Maze {
  constructor(density = 10) {
    this.density = density

    this.cells = [...Array(density * density)].map((_, i) => 0) // distance from origin. first cell is 1 away. 0 means not attached
    this.cellMap = [...Array(density * density)].map((_, i) => []) // An array mapping each cell to its "children"

    this.rightBorders = [...Array(density * density)].map(
      (_, i) => ((i + 1) % density === 0 ? false : true) // each border is the same index as the cell to the left
    )
    this.bottomBorders = [...Array(density * density)].map(
      (_, i) => ((i + 1) / density <= density - 1 ? true : false) // each border is the same index as the cell above
    )

    this.cells[0] = 1

    this.solution = [] // solution. We'll fill this in later.
    this.completed = false

    this.maxDistance = 1

    this.step = 0 // calculating pauses
    this.bufferStep = 0 // for fractional speeds
  }

  async delay() {
    this.step++

    let pauseEvery = Math.floor(Math.pow(this.density, 3) / Math.pow(20, 3))

    if (config.speed === "slow") pauseEvery = Math.floor(pauseEvery / 10)

    if (config.speed === "fast") pauseEvery *= 3

    if (pauseEvery < 1) pauseEvery = 1

    if (this.step % pauseEvery === 0) await pause(this.density)
  }

  async generate() {
    while (this.cells.includes(0)) {
      await this.nextStep()
    }

    this.solveRecursively()
    this.displaySolution()
    this.completed = true
  }

  getX(el) {
    let rows = Math.floor(el / this.density)
    return el - this.density * rows
  }

  getY(el) {
    return Math.floor(el / this.density)
  }

  addPath(square1, square2) {
    // ADD TO CELLMAP
    this.cellMap[square1].push(square2)

    // mark the cell as processed w/ distance
    this.cells[square2] = this.cells[square1] + 1

    // Update maxDistance if applicable
    if (this.cells[square2] > this.maxDistance)
      this.maxDistance = this.cells[square2]

    // UPDATE BORDERS
    let xSquare1 = this.getX(square1)
    let xSquare2 = this.getX(square2)

    let ySquare1 = this.getY(square1)
    let ySquare2 = this.getY(square2)

    if (xSquare1 < xSquare2) {
      this.rightBorders[square1] = false
    } else if (xSquare1 > xSquare2) {
      this.rightBorders[square2] = false
    } else if (ySquare1 > ySquare2) {
      this.bottomBorders[square2] = false
    } else if (ySquare1 < ySquare2) {
      this.bottomBorders[square1] = false
    }
  }

  getAdjacentSquares(el) {
    let res = []

    let x = this.getX(el)
    let y = this.getY(el)

    let density = this.density
    let cells = this.cells

    if (x + 1 < density && !cells[y * density + x + 1])
      res.push(y * density + x + 1)
    if (y + 1 < density && !cells[(y + 1) * density + x])
      res.push((y + 1) * density + x)
    if (x - 1 >= 0 && !cells[y * density + x - 1]) res.push(y * density + x - 1)
    if (y - 1 >= 0 && !cells[(y - 1) * density + x])
      res.push((y - 1) * density + x)

    return res
  }

  getAllAdjacentSquares(el) {
    let res = []
    let density = this.density

    let x = this.getX(el)
    let y = this.getY(el)

    if (x + 1 < density) res.push(y * density + x + 1)
    if (y + 1 < density) res.push((y + 1) * density + x)
    if (x - 1 >= 0) res.push(y * density + x - 1)
    if (y - 1 >= 0) res.push((y - 1) * density + x)

    return res
  }

  getRandomUnvisitedSquare() {
    let unvisitedCells = []

    this.cells.forEach((cell, i) => {
      if (cell === 0) unvisitedCells.push(i)
    })

    let res = unvisitedCells[Math.floor(Math.random() * unvisitedCells.length)]

    return res
  }

  solveRecursively() {
    let density = this.density,
      cellMap = this.cellMap
    let cells = [...Array(density * density)].map((_, i) => false) // false means we haven't traversed it yet. This is a new array just for this function.

    let history = [0] // a stack

    // While not all cells in the grid have been visited
    while (cells.includes(false)) {
      let currentCell = history[history.length - 1]

      // Mark the current cell as visited
      cells[currentCell] = true

      let possibleCells = cellMap[currentCell].filter(
        (cell) => cells[cell] === false
      )

      // If there are possible next cells to add to the grid from the current position
      if (possibleCells.length > 0) {
        // Randomly choose the next cell out of the candidates
        let nextCell =
          possibleCells[Math.floor(Math.random() * possibleCells.length)]

        // Add cell to history
        history.push(nextCell)

        // If the cell is in the bottom-right corner, the solution array is simply the history stack
        if (nextCell === density * density - 1) {
          this.solution = [...history]
          break
        }
      } else {
        // No possible squares from the current cell, backtracking

        history.pop()
      }
    }
  }

  displaySolution() {
    const spanElement = document.querySelector(`#${this.id}-title span`)
    spanElement.innerHTML = `Solution length: ${this.solution.length}`
  }
}

function pause(density) {
  let pauseLength = 0

  if (config.speed === "slow" && density < 50) {
    pauseLength = Math.pow(50 - density, 1.5) // easing function
  } else if (config.speed === "normal") {
    pauseLength = (1 / Math.log10(density)) * 30 // easing function
  }

  return new Promise((resolve) =>
    setTimeout(() => {
      resolve()
    }, pauseLength)
  )
}
