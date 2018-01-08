export default (value, allowed) => {
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

  return true
}
