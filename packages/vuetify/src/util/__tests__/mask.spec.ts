import { maskText, unmaskText, isMaskDelimiter } from '../mask'

describe('mask.js', () => {
  // Mask
  it('should add delimiter', () => {
    expect(maskText('5', '(#')).toBe('(5')
  })

  it('should add delimiter if explicity typed', () => {
    expect(maskText('(', '(#')).toBe('(')
  })

  it('should add delimiters and masks', () => {
    expect(maskText('4567', '(###) #')).toBe('(456) 7')
    expect(maskText('444444444', '#### - #### - #### - ####')).toBe('4444 - 4444 - 4')
    expect(maskText('A314444', 'A## - ####')).toBe('A31 - 4444')
  })

  it('should fill mask blanks', () => {
    expect(maskText('55', '## - ##')).toBe('55 - ')
  })

  it('should not fill mask blanks if told not to', () => {
    expect(maskText('55', '## - ##', true)).toBe('55')
  })

  it('should not fill if no value is provided', () => {
    expect(maskText('', '## - ##')).toBe('')
  })

  it('should only allow exact input if dontFillMaskBlanks is true', () => {
    expect(maskText('4567', '(###) #', true)).toBe('')
    expect(maskText('(456)', '(###) #', true)).toBe('(456)')
  })

  it('should convert alphanumeric to the proper case', () => {
    expect(maskText('aa', 'Aa')).toBe('Aa')
    expect(maskText('AA', 'aa')).toBe('aa')
    expect(maskText('A1', 'Aa')).toBe('A')
    expect(maskText('12abAB', 'NnNnNn')).toBe('12AbAb')
  })

  it('should not fill if wrong value is provided even if it is correct later in mask', () => {
    expect(maskText('a', '#a')).toBe('')
  })

  /* Not sure how to implement this
  it('should not fill in delimiter value if it does not match', () => {
    expect(maskText('a', '(')).toBe('')
  })
  */

  it('should fill last characters if they are all delimiters', () => {
    expect(maskText('1', '#)')).toBe('1)')
    expect(maskText('123', '(###)!!')).toBe('(123)!!')
  })

  it('should mask numbers', () => {
    expect(maskText(1234, '##.##')).toBe('12.34')
  })

  it('should return empty string if no input is given', () => {
    expect(maskText(null, '#')).toBe('')
  })

  it('should accept masked parameter if array', () => {
    expect(maskText('12', ['#', '-', '#'])).toBe('1-2')
  })

  // Unmasks
  it('should remove delimiter', () => {
    expect(unmaskText('(5')).toBe('5')
  })

  it('should return proper text length', () => {
    expect(unmaskText('1111')).toBe('1111')
  })

  it('should remove delimiters and masks', () => {
    expect(unmaskText('(123)4')).toBe('1234')
    expect(unmaskText('(456) 7)')).toBe('4567')
    expect(unmaskText('4444 - 4444 - 4')).toBe('444444444')
    expect(unmaskText('A31 - 4444')).toBe('A314444')
  })

  it('should include all possible matching values', () => {
    expect(unmaskText('555')).toBe('555')
  })

  it('should return null if no input is given', () => {
    expect(unmaskText(null)).toBeNull()
  })

  // isMaskDelimiter
  it('should identify mask delimiters', () => {
    expect(isMaskDelimiter('a')).toBe(false)
    expect(isMaskDelimiter('-')).toBe(true)
  })
})
