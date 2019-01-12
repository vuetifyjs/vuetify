/**
 * Default delimiter RegExp
 *
 * @type {RegExp}
 */
export const defaultDelimiters = /[-!$%^&*()_+|~=`{}[\]:";'<>?,./\\ ]/

/**
 *
 * @param {String} char
 *
 * @return {Boolean}
 */
export const isMaskDelimiter = (char: string): boolean => char ? defaultDelimiters.test(char) : false

/**
 * Mask keys
 *
 * @type {Object}
 */
const allowedMasks: any = {
  '#': {
    test: (char: string) => char.match(/[0-9]/)
  },
  'A': {
    test: (char: string) => char.match(/[A-Z]/i),
    convert: (char: string) => char.toUpperCase()
  },
  'a': {
    test: (char: string) => char.match(/[a-z]/i),
    convert: (char: string) => char.toLowerCase()
  },
  'N': {
    test: (char: string) => char.match(/[0-9A-Z]/i),
    convert: (char: string) => char.toUpperCase()
  },
  'n': {
    test: (char: string) => char.match(/[0-9a-z]/i),
    convert: (char: string) => char.toLowerCase()
  },
  'X': {
    test: isMaskDelimiter
  }
}

/**
 * Is Character mask
 *
 * @param  {String} char
 *
 * @return {Boolean}
 */
const isMask = (char: string): boolean => allowedMasks.hasOwnProperty(char)

/**
 * Automatically convert char case
 *
 * @param  {String} mask
 * @param  {String} char
 *
 * @return {String}
 */
const convert = (mask: string, char: string): string => {
  return allowedMasks[mask].convert ? allowedMasks[mask].convert(char) : char
}

/**
 * Mask Validation
 *
 * @param  {String} mask
 * @param  {String} char
 *
 * @return {Boolean}
 */
const maskValidates = (mask: string, char: string): boolean => {
  if (char == null || !isMask(mask)) return false
  return allowedMasks[mask].test(char)
}

/**
 * Mask Text
 *
 * Takes a string or an array of characters
 * and returns a masked string
 *
 * @param {*} text
 * @param {Array|String} masked
 * @param {Boolean} [dontFillMaskBlanks]
 *
 * @return {String}
 */
export const maskText = (text: string | any[], masked: string | any[], dontFillMaskBlanks: boolean): string => {
  if (text == null) return ''
  text = String(text)
  if (!masked.length || !text.length) return text
  if (!Array.isArray(masked)) masked = masked.split('')

  let textIndex = 0
  let maskIndex = 0
  let newText = ''

  while (maskIndex < masked.length) {
    const mask = masked[maskIndex]

    // Assign the next character
    const char = text[textIndex]

    // Check if mask is delimiter
    // and current char matches
    if (!isMask(mask) && char === mask) {
      newText += mask
      textIndex++
    // Check if not mask
    } else if (!isMask(mask) && !dontFillMaskBlanks) {
      newText += mask
    // Check if is mask and validates
    } else if (maskValidates(mask, char)) {
      newText += convert(mask, char)
      textIndex++
    } else {
      return newText
    }

    maskIndex++
  }

  return newText
}

/**
 * Unmask Text
 *
 * @param {String} text
 *
 * @return {String}
 */
export const unmaskText = (text: string): string => {
  return text ? String(text).replace(new RegExp(defaultDelimiters, 'g'), '') : text
}
