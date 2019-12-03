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

const calculateNodeValue = (node) => {
  if (node.children.length === 0) return _.sum(node.metadata)

  const validMeta = _.filter(node.metadata, index => {
    return index > 0 && index <= node.children.length
  })

  return _.sum(validMeta.map(index => {
    return calculateNodeValue(node.children[index - 1])
  }))
}

module.exports = async () => {
  const input = (await loadSingleLineFile('08')).split(' ').map(input => parseInt(input))
  const tree = buildNode(input, 0).node

  const treeValue = calculateNodeValue(tree)

  console.log(`Done: ${treeValue}`)
}
