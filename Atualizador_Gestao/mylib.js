function array_chunk(piece, array) {
  let result = []
  for (let index = 0; index < array.length; index = index + piece) {
    result.push(array.slice(index, index + piece))
  }
  return result
}

function chunkkk(piece) {
  let result = []
  for (let index = 0; index < this.length; index = index + piece) {
    result.push(this.slice(index, index + piece))
  }
  return result
}