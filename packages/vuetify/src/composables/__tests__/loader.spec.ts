// Utilities
import { describe, expect, it } from '@jest/globals'
import { useLoader } from '../loader'

describe('size', () => {
  it.each([
    [{ loading: true }, { 'v-component--loading': true }],
    [{ loading: false }, { 'v-component--loading': false }],
  ])('should return the correct class given value %p', (props, expected) => {
    const { loaderClasses } = useLoader(props, 'v-component')

    expect(loaderClasses.value).toEqual(expected)
  })
})
