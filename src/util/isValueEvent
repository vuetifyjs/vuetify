export default (value, events) => {
  if (Array.isArray(events)) {
    return events.indexOf(value) > -1
  }

  if (events instanceof Function) {
    return events(value)
  }

  if (events instanceof Object) {
    const min = events.min
    const max = events.max
    return (!min || min <= value) && (!max || max >= value)
  }

  return false
}
