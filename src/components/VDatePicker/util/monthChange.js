import pad from './pad'

/**
 * @param {String} value YYYY-MM format
 * @param {Number} sign -1 or +1
 */
export default (value, sign) => {
  const [year, month] = value.split('-').map(v => 1 * v)

  if (month + sign === 0) {
    return `${year - 1}-12`
  } else if (month + sign === 13) {
    return `${year + 1}-01`
  } else {
    return `${year}-${pad(month + sign)}`
  }
}
