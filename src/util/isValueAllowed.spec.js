import isValueAllowed from './isValueAllowed'
import { test } from '@util/testing'

test('VTimePicker/util/isValueAllowed.js', ({ mount }) => {
  it('should check if the date is allowed when allowed values is null', () => {
    expect(isValueAllowed(3, null)).toBe(true)
    expect(isValueAllowed('3', null)).toBe(true)
  })

  it('should check if the date is allowed when allowed values is array', () => {
    expect(isValueAllowed(3, [-1, 1, 3, 5])).toBe(true)
    expect(isValueAllowed(-1, ['-1', 1, 3, 5])).toBe(false)
  })

  it('should check if the date is allowed when allowed values is object', () => {
    expect(isValueAllowed(3, { min: -1, max: 3})).toBe(true)
    expect(isValueAllowed('foo', { min: 'bar', max: 'baz'})).toBe(false)
    expect(isValueAllowed('foo', { min: 'bar'})).toBe(true)
    expect(isValueAllowed('foo', { min: 'yea'})).toBe(false)
    expect(isValueAllowed('foo', { max: 'bar'})).toBe(false)
    expect(isValueAllowed('foo', { max: 'yea'})).toBe(true)
  })

  it('should check if the date is allowed when allowed values is function', () => {
    const fn = value => value.toString()[0] === '1'
    expect(isValueAllowed(13, fn)).toBe(true)
    expect(isValueAllowed(23, fn)).toBe(false)
  })
})
