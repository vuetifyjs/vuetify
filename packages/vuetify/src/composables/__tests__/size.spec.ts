import { useSize } from '../size'

describe('size', () => {
  it.each([
    [{ size: undefined }, 'v-size--default'],
    [{ size: 'x-small' }, 'v-size--x-small'],
    [{ size: 'small' }, 'v-size--small'],
    [{ size: 'default' }, 'v-size--default'],
    [{ size: 'large' }, 'v-size--large'],
    [{ size: 'x-large' }, 'v-size--x-large'],
  ] as const)('should return the correct class given value %p', (input, expected) => {
    const { sizeClasses } = useSize(input)

    expect(sizeClasses.value).toStrictEqual(expected)
  })

  it('should return null if not a prefedined size', () => {
    const { sizeClasses } = useSize({ size: '100px' })

    expect(sizeClasses.value).toBeNull()
  })
})
