const { loadSingleLineFile } = require('../../utils')

module.exports = async () => {
  const serialNumber = parseInt(await loadSingleLineFile('11'))
  const grid = {}
  for (let x = 1; x <= 300; x++) {
    grid[x] = {}
    for (let y = 1; y <= 300; y++) {
      const rackId = x + 10
      const startPowerLevel = rackId * y
      const increasedPowerLevel = startPowerLevel + serialNumber
      const fullPowerLevel = increasedPowerLevel * rackId
      const truncatedPowerLevel = (fullPowerLevel < 100) ? 0
        : parseInt(fullPowerLevel.toString().substring(fullPowerLevel.toString().length - 3, fullPowerLevel.toString().length - 2))
      const finalPowerLevel = truncatedPowerLevel - 5

      grid[x][y] = finalPowerLevel
    }
  }

  let maxPowerLevel = 0
  const maxPowerLevelCoords = { x: 0, y: 0, size: 0 }

  for (let size = 1; size <= 300; size++) {
    console.log(`Testing ${size}x${size}`)
    for (let x = 1; x <= 301 - size; x++) {
      for (let y = 1; y <= 301 - size; y++) {
        let totalPowerLevel = 0
        for (let xDelta = x; xDelta < x + size; xDelta++) {
          for (let yDelta = y; yDelta < y + size; yDelta++) {
            totalPowerLevel += grid[xDelta][yDelta]
          }
        }

        if (totalPowerLevel > maxPowerLevel) {
          maxPowerLevel = totalPowerLevel
          maxPowerLevelCoords.x = x
          maxPowerLevelCoords.y = y
          maxPowerLevelCoords.size = size
        }
      }
    }
  }

  console.log(`Done: ${maxPowerLevelCoords.x},${maxPowerLevelCoords.y},${maxPowerLevelCoords.size}`)
}
