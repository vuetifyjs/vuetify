import { mount } from '@vue/test-utils'
import { makeSizeProps, useSizeClass } from '../size'

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
    [{ size: undefined }, null],
    [{ size: 'x-small' }, 'v-size--x-small'],
    [{ size: 'small' }, 'v-size--small'],
    [{ size: 'default' }, 'v-size--default'],
    [{ size: 'large' }, 'v-size--large'],
    [{ size: 'x-large' }, 'v-size--x-large'],
  ] as const)('should return the correct class given value %p', (input, expected) => {
    const { sizeClass } = useSizeClass(input)

    expect(sizeClass.value).toStrictEqual(expected)
  })
})
