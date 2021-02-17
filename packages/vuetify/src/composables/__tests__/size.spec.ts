import { useSize } from '../size'

describe('size', () => {
  it.each([
    [{ size: 'x-small' }, 'test--size-x-small'],
    [{ size: 'small' }, 'test--size-small'],
    [{ size: 'default' }, 'test--size-default'],
    [{ size: 'large' }, 'test--size-large'],
    [{ size: 'x-large' }, 'test--size-x-large'],
    [{ size: '100px' }, null],
    [{ size: 100 }, null],
  ] as const)('should return the correct class given value %p', (input, expected) => {
    const { sizeClasses } = useSize(input, 'test')

    expect(sizeClasses.value).toStrictEqual(expected)
  })
})
