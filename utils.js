module.exports = {
  loadFile (fileName, formatter) {
    return new Promise((resolve, reject) => {
      const lineReader = require('readline').createInterface({
        input: require('fs').createReadStream(fileName)
      })

      const lines = []
      lineReader.on('line', line => {
        if (line) {
          if (formatter) lines.push(formatter(line))
          else lines.push(line)
        }
      })

      lineReader.on('close', () => {
        resolve(lines)
      })
    })
  }
}
