/**
 * Mask keys
 *
 * @type {Object}
 */
const allowedMasks = {
  '#': {
    test: char => char.match(/[0-9]/)
  },
  'A': {
    test: char => char.match(/[A-Z]/i)
  },
  'a': {
    test: char => char.match(/[a-z]/i)
  },
  'X': {
    test: isMaskDelimiter
  }
}

/**
 * Default delimiter RegExp
 *
 * @type {RegExp}
 */
export const defaultDelimiters = /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/ ]/

/**
 * Is Character mask
 *
 * @param  {String} char
 *
 * @return {Boolean}
 */
const isMask = char => allowedMasks.hasOwnProperty(char)

/**
 * Automatically convert char case
 *
 * @param  {String} mask
 * @param  {String} char
 * 
 * @return {String}
 */
const convertMaskCase = (mask, char) => {
  if (mask === 'A') return char.toUpperCase()
  if (mask === 'a') return char.toLowerCase()
  return char
}

/**
 *
 * @param {String} char
 *
 * @return {Boolean}
 */
export const isMaskDelimiter = char => char.match(defaultDelimiters)

/**
 * Mask Validation
 *
 * @param  {String} mask
 * @param  {String} char
 *
 * @return {Boolean}
 */
const maskValidates = (mask, char) => {
  if (char == null || !isMask(mask)) return false
  return allowedMasks[mask].test(char)
}

/**
 * Mask Text
 *
 * Takes an array of characters
 * and returns a compiled str
 *
 * @param {String} text
 * @param {Array|String} masked
 * @param {Boolean} fillMaskBlanks
 *
 * @return {String}
 */
export const maskText = (text, masked, fillMaskBlanks = false) => {
  if (!masked.length || !text.length) return text
  if (!Array.isArray(masked)) masked = masked.split('')

  let textIndex = 0
  let newText = ''
  masked.forEach((mask, i) => {
    if (textIndex >= text.length &&
      !fillMaskBlanks
    ) return

    // Assign the next character
    const char = text[textIndex]

    // Check if mask is delimiter
    // and current char matches
    if (!isMask(mask) && char === mask) {
      newText += mask
      textIndex++
    // Check if not mask
    } else if (!isMask(mask)) {
      newText += mask
    // Check if is mask and validates
    } else if (maskValidates(mask, char)) {
      newText += convertMaskCase(mask, char)
      textIndex++
    }
  })

  return newText
}

/**
 * Unmask Text
 *
 * @param {String} text
 *
 * @return {String}
 */
export const unmaskText = (text) => {
  return text.replace(new RegExp(defaultDelimiters, 'g'), '')
}
