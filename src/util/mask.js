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

const isMask = char => allowedMasks.hasOwnProperty(char)

const maskValidates = (mask, char) => {
  if (char == null || !isMask(mask)) return false
  return allowedMasks[mask].test(char)
}

/**
 *
 * @param {String} text
 * @param {Array} masked
 * @param {Boolean} returnMaskedValue
 * @param {Boolean} fillMaskBlanks
 */
export const maskText = (text, masked, returnMaskedValue = false, fillMaskBlanks = false) => {
  if (!masked.length || !text.length || returnMaskedValue) return text

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
 *
 * @param {String} text
 * @param {Array} masked
 * @param {Boolean} returnMaskedValue
 */
export const unmaskText = (text, masked, returnMaskedValue = false) => {
  if (!masked.length || returnMaskedValue) return text

  let char
  let textIndex = 0
  const newText = []
  masked.forEach((mask, i) => {
    // The goal is to ensure that
    // every character makes it
    // into the newText array
    char = char || text[textIndex]

    // Could cause potential issues
    if (char === mask && !['A', 'a'].includes(mask)) {
      char = null
      textIndex++
    }

    if (char == null) return

    if (maskValidates(mask, char)) {
      newText.push(char)
      char = null
      textIndex++
    }
  })

  return newText.join('')
}
