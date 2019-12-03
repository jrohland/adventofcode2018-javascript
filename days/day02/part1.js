const _ = require('lodash')
const utils = require('../../utils')

module.exports = async () => {
  const lines = await utils.loadFile('02')

  const repetitions = lines.map(line => {
    const letters = {}
    line.split('').forEach(char => {
      if (letters[char]) letters[char]++
      else letters[char] = 1
    })

    return {
      2: _.values(letters).indexOf(2) >= 0,
      3: _.values(letters).indexOf(3) >= 0
    }
  })

  const twos = _.reduce(repetitions, (sum, line) => {
    if (line['2']) return sum + 1
    return sum
  }, 0)

  const threes = _.reduce(repetitions, (sum, line) => {
    if (line['3']) return sum + 1
    return sum
  }, 0)

  console.log(`twos: ${twos}, threes: ${threes}, total: ${twos * threes}`)
}
