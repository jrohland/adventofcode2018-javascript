const { loadSingleLineFile } = require('../../utils')

const buildNode = (input, startIndex) => {
  const childCount = input[startIndex]
  const metadataCount = input[startIndex + 1]

  console.log(`Building new node from index ${startIndex} with ${childCount} children and ${metadataCount} metadata`)

  const node = {
    children: [],
    metadata: []
  }

  let currentIndex = startIndex + 2
  for (let childIndex = 0; childIndex < childCount; childIndex++) {
    const result = buildNode(input, currentIndex)
    node.children.push(result.node)
    currentIndex = result.index
  }

  node.metadata = input.slice(currentIndex, currentIndex + metadataCount)

  return {
    node, index: currentIndex + metadataCount
  }
}

const calculateNodeMetadataSum = (node) => {
  return _.sum(node.metadata) + _.sum(node.children.map(calculateNodeMetadataSum))
}

module.exports = async () => {
  const input = (await loadSingleLineFile('08')).split(' ').map(input => parseInt(input))
  const tree = buildNode(input, 0).node

  const metadataSum = calculateNodeMetadataSum(tree)

  console.log(`Done: ${metadataSum}`)
}
