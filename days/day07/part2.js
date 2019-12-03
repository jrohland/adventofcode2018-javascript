const { loadFile } = require('../../utils')

const validNextSteps = (allSteps, currentOrder, currentExecutingSteps, preReqs) => {
  const invalidSteps = new Set(Array.from(currentOrder).concat(currentExecutingSteps.map(executingStep => executingStep.step)))
  return _.filter(Array.from(allSteps), step => {
    if (invalidSteps.has(step)) return false
    const remainingPreReqs = _.filter(preReqs[step], preReqStep => {
      return !currentOrder.has(preReqStep)
    })

    return remainingPreReqs.length === 0
  })
}

module.exports = async () => {
  const instructions = await loadFile('07', line => {
    return [
      line.substring(5, 6),
      line.substring(36, 37)
    ]
  })

  const allSteps = new Set(_.flatten(instructions))

  const preReqs = {}
  instructions.forEach(instruction => {
    if (!preReqs[instruction[1]]) preReqs[instruction[1]] = []
    preReqs[instruction[1]].push(instruction[0])
  })

  const firstStep = _.find(Array.from(allSteps), step => {
    return _.keys(preReqs).indexOf(step) === -1
  })

  const order = new Set([firstStep])
  let second = 0
  const currentExecutingSteps = []

  do {
    console.log(`Second ${second}`)
    if (currentExecutingSteps.length > 0) {
      currentExecutingSteps.forEach(executingStep => {
        if (second === executingStep.finishTime) {
          console.log(`Finish executing ${executingStep.step}`)
          order.add(executingStep.step)
          _.remove(currentExecutingSteps, executingStep)
        }
      })
    }

    if (currentExecutingSteps.length !== 5) {
      const nextSteps = validNextSteps(allSteps, order, currentExecutingSteps, preReqs)
      if (nextSteps.length === 0 && currentExecutingSteps.length === 0) break

      while (currentExecutingSteps.length < 5 && nextSteps.length > 0) {
        const nextStep = _.min(nextSteps)
        const finishTime = second + 60 + nextStep.charCodeAt(0) - 64

        console.log(`Starting executing ${nextStep}`)

        currentExecutingSteps.push({
          step: nextStep,
          finishTime
        })

        nextSteps.splice(nextSteps.indexOf(nextStep), 1)
      }
    }

    second++
    console.log('----------------------------')
  } while (true)

  console.log(`Done: ${second} seconds`)
}
