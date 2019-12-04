const { loadFile } = require('../../utils')

const drawGrid = (coords) => {
  const xVals = coords.map(coord => coord.x)
  const minX = _.min(xVals)
  const maxX = _.max(xVals)

  const yVals = coords.map(coord => coord.y)
  const minY = _.min(yVals)
  const maxY = _.max(yVals)

  let gridVis = ''
  for (let y = minY; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      if (_.find(coords, { x, y })) gridVis += '#'
      else gridVis += '.'
    }
    gridVis += '\n'
  }
  console.log(gridVis)
}

const mutateGrid = (coords) => {
  coords.forEach(coord => {
    coord.x += coord.xVelo
    coord.y += coord.yVelo
  })
}

const drawAndMutate = (coords) => {
  drawGrid(coords)
  mutateGrid(coords)
  setTimeout(drawAndMutate, 500, coords)
}

module.exports = async () => {
  const coords = await loadFile('10', line => {
    const firstSplit = line.split('position=<')
    const secondSplit = firstSplit[1].split('> velocity=<')

    const coords = secondSplit[0].split(',')
    const velo = secondSplit[1].substring(0, secondSplit[1].length - 1).split(',')

    const x = parseInt(coords[0].trim())
    const y = parseInt(coords[1].trim())

    const xVelo = parseInt(velo[0].trim())
    const yVelo = parseInt(velo[1].trim())

    return {
      x, y, xVelo, yVelo
    }
  })

  drawAndMutate(coords)
}
