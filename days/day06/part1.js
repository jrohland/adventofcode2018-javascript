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

  const grid = {}
  for (let x = minX; x <= maxX; x++) {
    grid[x] = {}
    for (let y = minY; y <= maxY; y++) {
      const distances = coords.map(coord => {
        return calcDistance(coord, [x, y])
      })
      const minDistance = Math.min(...distances)
      const minCordIndex = _.indexOf(distances, minDistance)

      if (minCordIndex === _.lastIndexOf(distances, minDistance)) grid[x][y] = minCordIndex
      else grid[x][y] = -1
    }
  }

  const infiniteIndexes = new Set([-1])
  for (let x = minX; x <= maxX; x++) {
    infiniteIndexes.add(grid[x][minY])
    infiniteIndexes.add(grid[x][maxY])
  }
  for (let y = minY; y <= maxY; y++) {
    infiniteIndexes.add(grid[minX][y])
    infiniteIndexes.add(grid[maxX][y])
  }

  const areas = {}
  for (let x = minX; x <= maxX; x++) {
    for (let y = minY; y <= maxY; y++) {
      const index = grid[x][y]
      if (!areas[index]) areas[index] = 1
      else areas[index]++
    }
  }

  infiniteIndexes.forEach(index => {
    delete areas[index]
  })

  const maxArea = Math.max(..._.values(areas))

  console.log(`Done : ${maxArea}`)
}
