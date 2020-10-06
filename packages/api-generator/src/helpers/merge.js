const deepmerge = require('deepmerge')

function arrayMerge (a, b) {
  const arr = a.slice()
  for (let i = 0; i < b.length; i++) {
    const found = a.findIndex(item => item.name === b[i].name)
    if (found >= 0) {
      arr[found] = deepmerge(a[found], b[i])
    } else {
      arr.push(b[i])
    }
  }
  return arr
}

module.exports = function merge (...arr) {
  return deepmerge.all(arr, { arrayMerge })
}
