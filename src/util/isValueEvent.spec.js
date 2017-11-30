import isValueEvent from './isValueEvent'
import { test } from '~util/testing'

test('VTimePicker/util/isValueEvent.js', ({ mount }) => {
  it('should check if the date is event when events values is null', () => {
    expect(isValueEvent(3, null)).toBe(false)
    expect(isValueEvent('3', null)).toBe(false)
  })
})
