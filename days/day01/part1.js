const utils = require('../../utils')

module.exports = async () => {
  const lines = await utils.loadFile('01', parseInt)
  let curVal = 0
  lines.forEach(line => {
    curVal += line
  })
  console.log(`Done: ${curVal}`)
}
