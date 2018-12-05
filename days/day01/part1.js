const path = require('path')

module.exports = () => {
  const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream(path.join(__dirname, 'input'))
  })

  let curVal = 0
  lineReader.on('line', line => {
    if (line) curVal += parseInt(line)
  })

  lineReader.on('close', () => {
    console.log(`Done: ${curVal}`)
  })
}
