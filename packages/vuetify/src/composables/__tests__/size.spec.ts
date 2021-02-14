import { mount } from '@vue/test-utils'
import { makeSizeProps, useSizeClasses } from '../size'

describe('size', () => {
  it('should warn if value is incorrect', () => {
    const TestComponent = {
      props: makeSizeProps(),
      template: '<div/>',
    }

    mount(TestComponent, {
      props: {
        // @ts-expect-error
        size: 'foo',
      },
    })

    expect('[Vue warn]: Invalid prop: custom validator check failed for prop "size".').toHaveBeenTipped()
  })

  it.each([
    [{ size: 'x-small' }, 'test--size-x-small'],
    [{ size: 'small' }, 'test--size-small'],
    [{ size: 'default' }, 'test--size-default'],
    [{ size: 'large' }, 'test--size-large'],
    [{ size: 'x-large' }, 'test--size-x-large'],
  ] as const)('should return the correct class given value %p', (input, expected) => {
    const { sizeClasses } = useSizeClasses(input, 'test')

    expect(sizeClasses.value).toStrictEqual(expected)
  })
})
