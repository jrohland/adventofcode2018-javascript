const path = require('path')
const utils = require('../../utils')

module.exports = async () => {
  const lines = await utils.loadFile(path.join(__dirname, 'input'), line => {
    return line.split('')
  })

  let curLine = -1
  let foundMatch = false

  while (foundMatch === false) {
    curLine++
    for (let checkLine = curLine + 1; checkLine < lines.length; checkLine++) {
      let matchedLetters = 0
      for (let i = 0; i < lines[curLine].length; i++) {
        if (lines[curLine][i] === lines[checkLine][i]) matchedLetters++
      }

      if (matchedLetters === lines[curLine].length - 1) {
        foundMatch = checkLine
        break
      }
    }
  }

  let matchStr = ''
  for (let i = 0; i < lines[curLine].length; i++) {
    if (lines[curLine][i] === lines[foundMatch][i]) matchStr += lines[curLine][i]
  }

  console.log(matchStr)
}
