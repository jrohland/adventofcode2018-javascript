const { loadSingleLineFile } = require('../../utils')

module.exports = async () => {
  const input = (await loadSingleLineFile('09')).split(' players; last marble is worth ')
  const numPlayers = parseInt(input[0])
  const lastMarbleWorth = parseInt(input[1].split(' points')[0]) * 100

  const circle = [0]
  const playerScores = []
  for (let playerIndex = 0; playerIndex < numPlayers; playerIndex++) {
    playerScores.push(0)
  }

  let currentMarbleIndex = 0
  let currentPlayer = 0
  for (let newMarble = 1; newMarble <= lastMarbleWorth; newMarble++) {
    if (newMarble % 23 === 0) {
      // const currentScore = playerScores[currentPlayer]
      const removeIndex = ((currentMarbleIndex - 7) < 0) ? circle.length + (currentMarbleIndex - 7) : (currentMarbleIndex - 7)
      const removeValue = circle[removeIndex]

      playerScores[currentPlayer] += newMarble + removeValue

      // console.log(`Player ${currentPlayer} got marble ${newMarble},
      //   current score ${currentScore},
      //   current index ${currentMarbleIndex},
      //   circle length ${circle.length},
      //   remove index ${removeIndex},
      //   remove value ${removeValue},
      //   new score ${playerScores[currentPlayer]}`)

      circle.splice(removeIndex, 1)
      if (removeIndex === circle.length) currentMarbleIndex = 0
      else currentMarbleIndex = removeIndex
    } else {
      const newMarbleIndex = (currentMarbleIndex + 2) > circle.length ? 1 : (currentMarbleIndex + 2)
      if (newMarbleIndex === circle.length) circle.push(newMarble)
      else circle.splice(newMarbleIndex, 0, newMarble)

      currentMarbleIndex = newMarbleIndex
    }

    currentPlayer++
    if (currentPlayer >= numPlayers) currentPlayer = 0

    if (newMarble % 10000 === 0) console.log(`Processed ${newMarble} marbles`)

    // console.log(circle.join(' '))
  }

  const maxScore = _.max(playerScores)

  console.log(`Done: ${maxScore}`)
}
