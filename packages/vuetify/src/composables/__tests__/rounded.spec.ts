// Effects
import type { RoundedProps } from '../rounded'
import {
  makeRoundedProps,
  useRoundedClasses,
} from '../rounded'

describe('rounded.ts', () => {
  it('should have the correct class', () => {
    const values = [
      [undefined, { 'rounded-0': true }],
      [false, { 'rounded-0': true }],
      [true, { rounded: true }],
      ['lg', { 'rounded-lg': true }],
      ['tl-lg br-xl', { 'rounded-tl-lg': true, 'rounded-br-xl': true }],
    ] as const

    for (const [rounded, equal] of values) {
      const props = { rounded }
      const { roundedClasses } = useRoundedClasses(props)

      expect(roundedClasses.value).toEqual(equal)
    }
  })

  it('should have the correct class with tile', () => {
    const { roundedClasses } = useRoundedClasses({ tile: true })

    expect(roundedClasses.value).toEqual({ 'rounded-0': true })
  })

  it('should only allow boolean or sm/lg/xl values', () => {
    const { rounded: { validator } } = makeRoundedProps()
    const validValues = [true, false, 'tl-lg', 'tl-lg br-xl', 'sm', 'xl', 'lg']
    const invalidValues = [-1, 'ab']

    for (const value of validValues) {
      expect(validator(value)).toBe(true)
    }

    for (const value of invalidValues) {
      expect(validator(value)).toBe(false)
    }
  })
})
