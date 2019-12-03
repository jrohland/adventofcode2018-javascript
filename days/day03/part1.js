const utils = require('../../utils')
const _ = require('lodash')

module.exports = async () => {
  console.log('Loading input')
  const lines = await utils.loadFile('03', line => {
    const [id, positionAndSize] = line.split(' @ ')
    const [position, size] = positionAndSize.split(': ')
    const [left, top] = position.split(',')
    const [width, height] = size.split('x')

    return {
      id,
      left: parseInt(left),
      top: parseInt(top),
      width: parseInt(width),
      height: parseInt(height)
    }
  })

  console.log('Building grid')
  let linesProcessed = 0
  const grid = {}
  lines.forEach(line => {
    for (let x = line.left; x < line.left + line.width; x++) {
      for (let y = line.top; y < line.top + line.height; y++) {
        if (!grid[x]) grid[x] = {}
        if (!grid[x][y]) grid[x][y] = []
        grid[x][y].push(line.id)
      }
    }
    linesProcessed++

    console.log(`${linesProcessed} lines processed out of ${lines.length}`)
  })

  const sharedSpaces = _.chain(grid)
    .mapValues(col => {
      return _.chain(col)
        .mapValues(position => {
          if (position.length > 1) return 1
          return 0
        })
        .values()
        .sum()
        .value()
    })
    .values()
    .sum()
    .value()

  console.log(`${sharedSpaces} shared spaces`)
}
