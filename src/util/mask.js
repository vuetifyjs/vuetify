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
    test: char => char.match(/[A-Z]/)
  },
  'a': {
    test: char => char.match(/[a-z]/)
  },
  'X': {
    test: isMaskDelimiter
  }
}

/**
 * Default delimiter regexp
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
  const newText = []
  masked.forEach((mask, i) => {
    if (textIndex >= text.length &&
      !fillMaskBlanks
    ) return

    // Assign the next character
    const char = text[textIndex]

    if (!isMask(mask)) {
      newText.push(mask)

      if (char === mask) {
        textIndex++
      }
    } else if (maskValidates(mask, char)) {
      // If the mask is validated, push
      // next char into the new array
      newText.push(char)
      textIndex++
    }
  })

  return newText.join('')
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
