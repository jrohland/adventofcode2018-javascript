const utils = require('../../utils')
const _ = require('lodash')

module.exports = async () => {
  console.log('Loading input')
  let input = (await utils.loadFile('05'))[0]
  let reactionFound = false

  do {
    reactionFound = false
    for (let i = 0; i < input.length - 1; i++) {
      const char = (input.charAt(i) === _.toUpper(input.charAt(i)))
        ? _.toLower(input.charAt(i))
        : _.toUpper(input.charAt(i))

      if (input.charAt(i + 1) === char) {
        reactionFound = true
        input = input.substring(0, i) + input.substring(i + 2)
        // break
      }
    }
  } while (reactionFound)

  console.log(input.length)
}
