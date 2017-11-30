import isValueEvent from './isValueEvent'
import { test } from '~util/testing'

test('VTimePicker/util/isValueEvent.js', ({ mount }) => {
  it('should check if the date is event when events values is null', () => {
    expect(isValueEvent(3, null)).toBe(false)
    expect(isValueEvent('3', null)).toBe(false)
  })

  it('should check if the date is event when events values is array', () => {
    expect(isValueEvent(3, [-1, 1, 3, 5])).toBe(true)
    expect(isValueEvent(-1, ['-1', 1, 3, 5])).toBe(false)
  })

  it('should check if the date is event when events values is function', () => {
    const fn = value => value.toString()[0] === '1'
    expect(isValueEvent(13, fn)).toBe(true)
    expect(isValueEvent(23, fn)).toBe(false)
  })
})
