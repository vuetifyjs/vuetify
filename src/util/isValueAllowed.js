/**
 * @param {String} value
 * @param {Function|Object|Array} allowed
 * @param {Boolean} defaultAllowed
 * @returns {Boolean}
 */
export default (value, allowed, defaultAllowed = true) => {
  if (Array.isArray(allowed)) {
    return allowed.indexOf(value) > -1
  }

  if (allowed instanceof Function) {
    return allowed(value)
  }

  if (allowed instanceof Object) {
    const min = allowed.min
    const max = allowed.max
    return (!min || min <= value) && (!max || max >= value)
  }

  return defaultAllowed
}
