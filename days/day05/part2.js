const path = require('path')
const utils = require('../../utils')
const _ = require('lodash')

module.exports = async () => {
  console.log('Loading input')
  const input = (await utils.loadFile(path.join(__dirname, 'input')))[0]
  const chars = {}

  for (let i = 97; i <= 122; i++) {
    const lower = String.fromCharCode(i)
    const upper = _.toUpper(lower)

    console.log(`Looking for ${lower} or ${upper}`)
    let curStr = input.replace(new RegExp(lower + '|' + upper, 'g'), '')

    let reactionFound = false

    do {
      reactionFound = false
      for (let i = 0; i < curStr.length - 1; i++) {
        const char = (curStr.charAt(i) === _.toUpper(curStr.charAt(i)))
          ? _.toLower(curStr.charAt(i))
          : _.toUpper(curStr.charAt(i))

        if (curStr.charAt(i + 1) === char) {
          reactionFound = true
          curStr = curStr.substring(0, i) + curStr.substring(i + 2)
          // break
        }
      }
    } while (reactionFound)

    chars[lower] = curStr.length
  }

  const minString = _.chain(chars)
    .values()
    .min()
    .value()

  console.log(minString)
}
