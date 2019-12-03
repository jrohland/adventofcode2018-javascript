const { loadFile } = require('../../utils')

const validNextSteps = (allSteps, currentOrder, preReqs) => {
  return _.filter(Array.from(allSteps), step => {
    if (currentOrder.has(step)) return false
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
  do {
    const nextSteps = validNextSteps(allSteps, order, preReqs)
    if (nextSteps.length === 0) break

    const nextStep = _.min(nextSteps)
    order.add(nextStep)
  } while (true)

  console.log(`Done: ${Array.from(order).join('')}`)
}
