const utils = require('../../utils')
const _ = require('lodash')

module.exports = async () => {
  console.log('Loading input')
  const lines = _.sortBy(await utils.loadFile('04', line => {
    const [date, action] = line.split('] ')
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

  const minsByGuards = {}
  _.keys(guardMinsAsleep).forEach(guard => {
    _.keys(guardMinsAsleep[guard]).forEach(min => {
      if (!minsByGuards[min]) minsByGuards[min] = {}
      minsByGuards[min][guard] = guardMinsAsleep[guard][min]
    })
  })

  const maxGuardPerMin = _.mapValues(minsByGuards, guards => {
    const maxDays = _.chain(guards)
      .values()
      .max()
      .value()

    const guardWithMax = _.invert(guards)[maxDays]
    return {
      guard: guardWithMax,
      days: maxDays
    }
  })

  const maxDay = _.chain(maxGuardPerMin)
    .values()
    .maxBy('days')
    .value()

  const minute = _.findKey(maxGuardPerMin, maxDay)

  console.log(`minute: ${minute} guard: ${maxDay.guard} total: ${parseInt(minute) * parseInt(maxDay.guard)}`)
}
