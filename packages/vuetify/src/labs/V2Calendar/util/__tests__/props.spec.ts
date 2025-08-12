import { validateNumber } from '../props'

describe('props.ts', () => {
  it('should return true if number is valid', () => {
    expect(validateNumber(1)).toBe(true)
    expect(validateNumber(1000000)).toBe(true)
    expect(validateNumber('1234')).toBe(true)
  })

  it('should return false if number is bad', () => {
    expect(validateNumber(Infinity)).toBe(false)
    expect(validateNumber(NaN)).toBe(false)
    expect(validateNumber('bad')).toBe(false)
  })
})
