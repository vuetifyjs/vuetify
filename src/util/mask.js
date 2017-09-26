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
    test: char => char.match(/[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/)
  }
}

/**
 * Default delimiter regexp
 * 
 * @type {RegExp}
 */
const defaultDelimiter = /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/ ]/

/**
 * Is Character mask
 * 
 * @param  {String} char
 * 
 * @return {Boolean}
 */
const isMask = char => allowedMasks.hasOwnProperty(char)

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
  if (!Array.isArray(masked)) masked = masked.split('')
  if (!masked.length || !text.length) return text

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
 * @param {RegExp} masked
 *
 * @return {String}
 */
export const unmaskText = (text, delimiters) => {
  delimiters = delimiters || defaultDelimiter

  return text.replace(new RegExp(delimiters, 'g'), '')
}
