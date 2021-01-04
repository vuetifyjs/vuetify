// Utilities
import { makeBorderRadiusProps, useBorderRadius } from '..'
import { mount } from '@vue/test-utils'

// Types
import type { BorderRadiusProps } from '..'

describe('border-radius.ts', () => {
  it('should warn if value is incorrect', () => {
    const TestComponent = {
      props: makeBorderRadiusProps(),
      template: '<div/>',
    }

    mount(TestComponent, {
      props: { rounded: 'foo' },
    })

    expect('[Vue warn]: Invalid prop: custom validator check failed for prop "rounded".').toHaveBeenTipped()
  })

  it.each([
    [{}, []],
    [{ rounded: 'tile' }, ['rounded-0']],
    [{ rounded: true }, ['rounded']],
    [{ rounded: '0' }, ['rounded-0']],
    [{ rounded: false }, ['rounded-0']],
    [{ rounded: 'tr-xl br-lg' }, ['rounded-tr-xl', 'rounded-br-lg']],
  ] as BorderRadiusProps[])(
    'should return correct rounded classes',
    (props: BorderRadiusProps, expected: any) => {
      const { borderRadiusClasses } = useBorderRadius(props)

      expect(borderRadiusClasses.value).toStrictEqual(expected)
    })
})
