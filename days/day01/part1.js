const path = require('path')
const utils = require('../../utils')

module.exports = async () => {
  const lines = await utils.loadFile(path.join(__dirname, 'input'), parseInt)
  let curVal = 0
  lines.forEach(line => {
    curVal += line
  })
  console.log(`Done: ${curVal}`)
}
