const { loadFile } = require('../../utils')

const drawGrid = (coords) => {
  const xVals = coords.map(coord => coord.x)
  const minX = _.min(xVals)
  const maxX = _.max(xVals)

  const yVals = coords.map(coord => coord.y)
  const minY = _.min(yVals)
  const maxY = _.max(yVals)

  const width = maxX - minX
  const height = maxY - minY

  if (width > 200 || height > 100) {
    // console.log(`Grid too big ${width}x${height}`)
    return false
  }

  for (let y = minY; y <= maxY; y++) {
    let gridVis = ''
    for (let x = minX; x <= maxX; x++) {
      if (_.find(coords, { x, y })) gridVis += '#'
      else gridVis += '.'
    }
    console.log(gridVis)
  }
  console.log('---------------------------')
  return true
}

const mutateGrid = (coords) => {
  coords.forEach(coord => {
    coord.x += coord.xVelo
    coord.y += coord.yVelo
  })
}

const drawAndMutate = (coords, seconds) => {
  const result = drawGrid(coords)
  if (result) console.log(`seconds: ${seconds}`)
  mutateGrid(coords)
  const time = (result) ? 100 : 0
  setTimeout(drawAndMutate, time, coords, seconds + 1)
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

  drawAndMutate(coords, 0)
}
