const path = require('path')
const utils = require('../../utils')
const _ = require('lodash')

module.exports = async () => {
  console.log('Loading input')
  const lines = await utils.loadFile(path.join(__dirname, 'input'), line => {
    const [ id, positionAndSize ] = line.split(' @ ')
    const [ position, size ] = positionAndSize.split(': ')
    const [ left, top ] = position.split(',')
    const [ width, height ] = size.split('x')

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

  const sharedKeys = new Set()
  _.keys(grid).forEach(x => {
    _.keys(grid[x]).forEach(y => {
      if (grid[x][y].length > 1) grid[x][y].forEach(id => sharedKeys.add(id))
    })
  })

  const notSharedKeys = _.filter(lines.map(line => line.id), id => !sharedKeys.has(id))

  console.log(notSharedKeys)
}
