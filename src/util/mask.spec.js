import { test } from '~util/testing'
import { maskText, unmaskText } from './mask'

test('mask.js', ({ mount }) => {
  // Mask
  it('should add delimiter', () => {
    expect(maskText('5', '(#')).toBe('(5')
  })

  it('should add delimiters and masks', () => {
    expect(maskText('4567', '(###) #')).toBe('(456) 7')
    expect(maskText('444444444', '#### - #### - #### - ####')).toBe('4444 - 4444 - 4')
    expect(maskText('A314444', 'A## - ####')).toBe('A31 - 4444')
  })

  it('should fill mask blanks', () => {
    expect(maskText('55', '## - ##', true)).toBe('55 - ')
  })

  it('should not fill if no value is provided', () => {
    expect(maskText('', '## - ##', true)).toBe('')
  })

  it('should convert alphanumeric to the proper case', () => {
    expect(maskText('aa', 'Aa')).toBe('Aa')
    expect(maskText('AA', 'aa')).toBe('aa')
    expect(maskText('A1', 'Aa')).toBe('A')
    expect(maskText('12abAB', 'NnNnNn')).toBe('12AbAb')
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
})
