const path = require('path')
const utils = require('../../utils')
const _ = require('lodash')

module.exports = async () => {
  console.log('Loading input')
  const lines = _.sortBy(await utils.loadFile(path.join(__dirname, 'input'), line => {
    const [ date, action ] = line.split('] ')
    return {
      action,
      date: date.substring(1)
    }
  }), 'date')

  let guard = null
  let asleepMin = null
  const guardMinsAsleep = {}

  lines.forEach(line => {
    const { date, action } = line
    if (action.indexOf(' begins shift') >= 0) {
      guard = action.substring(7, action.indexOf(' begins shift'))
    } else if (action === 'falls asleep') {
      asleepMin = parseInt(date.split(':')[1])
    } else if (action === 'wakes up') {
      if (!guardMinsAsleep[guard]) guardMinsAsleep[guard] = {}
      const wakeMin = parseInt(date.split(':')[1])
      console.log(`guard ${guard} fell asleep at min ${asleepMin} woke up at min ${wakeMin}`)
      while (asleepMin < wakeMin) {
        if (guardMinsAsleep[guard][asleepMin]) guardMinsAsleep[guard][asleepMin]++
        else guardMinsAsleep[guard][asleepMin] = 1
        asleepMin++
      }
    }
  })

  const guardTotalMinsAsleep = _.mapValues(guardMinsAsleep, minutes => {
    return _.chain(minutes)
      .values()
      .sum()
      .value()
  })

  const maxSleep = _.chain(guardTotalMinsAsleep)
    .values()
    .max()
    .value()

  const sleepyGuard = _.invert(guardTotalMinsAsleep)[maxSleep]

  const maxDaysAsleep = _.chain(guardMinsAsleep[sleepyGuard])
    .values()
    .max()
    .value()

  const minSleep = _.invert(guardMinsAsleep[sleepyGuard])[maxDaysAsleep]

  console.log(`guard: ${sleepyGuard} minSleep: ${minSleep} total: ${parseInt(sleepyGuard) * parseInt(minSleep)}`)
}
