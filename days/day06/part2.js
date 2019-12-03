const { loadMultilineCommaSeparatedFile } = require('../../utils')

const calcDistance = (coord1, coord2) => {
  return Math.abs(coord1[0] - coord2[0]) + Math.abs(coord1[1] - coord2[1])
}

module.exports = async () => {
  const coords = await loadMultilineCommaSeparatedFile('06', value => parseInt(value.trim()))

  const minX = Math.min(...coords.map(coord => coord[0]))
  const maxX = Math.max(...coords.map(coord => coord[0]))
  const minY = Math.min(...coords.map(coord => coord[1]))
  const maxY = Math.max(...coords.map(coord => coord[1]))

  let area = 0
  for (let x = minX; x <= maxX; x++) {
    for (let y = minY; y <= maxY; y++) {
      const totalDistance = _.sum(coords.map(coord => calcDistance(coord, [x, y])))
      if (totalDistance < 10000) area++
    }
  }

  console.log(`Done : ${area}`)
}
