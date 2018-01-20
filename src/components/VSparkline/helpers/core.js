/**
 *  Calculate the coordinate
 * @param  {number[]|object[]}  arr
 * @param  {object}             boundary
 * @return {object[]}
 */
export function genPoints (arr, { minX, minY, maxX, maxY }) {
  arr = arr.map(item => (typeof item === 'number' ? item : item.value))
  const minValue = Math.min(...arr) - 0.001
  const gridX = (maxX - minX) / (arr.length - 1)
  const gridY = (maxY - minY) / (Math.max(...arr) + 0.001 - minValue)

  return arr.map((value, index) => {
    return {
      x: index * gridX + minX,
      y:
        maxY -
        (value - minValue) * gridY +
        +(index === arr.length - 1) * 0.00001 -
        +(index === 0) * 0.00001
    }
  })
}