import { test } from '~util/testing'
import { maskText, unmaskText } from './mask'

function _maskText () {
  const args = Array.from(arguments)
  args[1] = args[1].split('')
  return maskText.apply(this, args)
}

function _unmaskText () {
  const args = Array.from(arguments)
  args[1] = args[1].split('')
  return unmaskText.apply(this, args)
}

test('mask.js', ({ mount }) => {
  // Mask
  it('should add delimiter', () => {
    expect(_maskText('5', '(#')).toBe('(5')
  })

  it('should add delimiters and masks', () => {
    expect(_maskText('4567', '(###) #')).toBe('(456) 7')
    expect(_maskText('444444444', '#### - #### - #### - ####')).toBe('4444 - 4444 - 4')
    expect(_maskText('A314444', 'A## - ####')).toBe('A31 - 4444')
  })

  it('should fill mask blanks', () => {
    expect(_maskText('55', '## - ##', false, true)).toBe('55 - ')
  })

  it('should not fill if no value is provided', () => {
    expect(_maskText('', '## - ##', false, true)).toBe('')
  })

  // Unmasks
  it('should remove delimiter', () => {
    expect(_unmaskText('(5', '(#')).toBe('5')
  })

  it('should return proper text length', () => {
    expect(_unmaskText('1111', '###-##-####')).toBe('1111')
  })

  it('should remove delimiters and masks', () => {
    expect(_unmaskText('(123)4', '(###)#')).toBe('1234')
    expect(_unmaskText('(456) 7', '(###) #')).toBe('4567')
    expect(_unmaskText('4444 - 4444 - 4', '#### - #### - #### - ####')).toBe('444444444')
    expect(_unmaskText('A31 - 4444', 'A## - ####')).toBe('A314444')
  })

  it('should return the masked string', () => {
    expect(_unmaskText('09/21/2017', '##/##/###', true)).toBe('09/21/2017')
    expect(_unmaskText('09 / 21 / 2017', '##/##/###', true)).toBe('09 / 21 / 2017')
  })

  it('should include all possible matching values', () => {
    expect(_unmaskText('555', '(##) #### ####')).toBe('555')
  })
})
