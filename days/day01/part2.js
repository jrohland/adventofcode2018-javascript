const path = require('path')

module.exports = () => {
  const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream(path.join(__dirname, 'input'))
  })

  const allChanges = []
  lineReader.on('line', line => {
    if (line) allChanges.push(parseInt(line))
  })

  lineReader.on('close', () => {
    console.log('All changes loaded')

    const frequencies = new Set()
    let iterations = 0
    let curVal = 0
    let foundFreq = false
    frequencies.add(curVal)

    while (foundFreq === false) {
      for (let i = 0; i < allChanges.length; i++) {
        curVal += allChanges[i]
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
  })
}
