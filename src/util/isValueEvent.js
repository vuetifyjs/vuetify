import isValueAllowed from './isValueAllowed

export default (value, events) => {
  
  if (Array.isArray(events) || (events instanceof Function) || (events instanceof Object)) {
    return isValueAllowed(value, events)
  } else {
    return false
  }
}
