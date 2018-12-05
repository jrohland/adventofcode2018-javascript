const path = require('path')
const utils = require('../../utils')

module.exports = async () => {
  const lines = await utils.loadFile(path.join(__dirname, 'input'), parseInt)

  const frequencies = new Set()
  let iterations = 0
  let curVal = 0
  let foundFreq = false
  frequencies.add(curVal)

  while (foundFreq === false) {
    for (let i = 0; i < lines.length; i++) {
      curVal += lines[i]
      if (frequencies.has(curVal)) {
        foundFreq = curVal
        break
      }
      frequencies.add(curVal)
    }
    iterations++
    console.log(`Done ${iterations} iterations`)
  }

  console.log(`Done: ${foundFreq}`)
}
