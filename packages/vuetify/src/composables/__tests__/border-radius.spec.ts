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
    // When should return nothing
    [{}, []],
    [{ rounded: null }, []],
    [{ rounded: 1 }, []],
    [{ rounded: { toString: () => 'pill' } }, []],
    // Rounded only
    [{ rounded: true }, ['rounded']],
    [{ rounded: '' }, ['rounded']],
    // Rounded with 0
    [{ rounded: 'tile' }, ['rounded-0']],
    [{ rounded: '0' }, ['rounded-0']],
    [{ rounded: false }, ['rounded-0']],
    [{ rounded: 0 }, ['rounded-0']],
    // Rounded with a word
    [{ rounded: 'circle' }, ['rounded-circle']],
    [{ rounded: 'shaped' }, ['rounded-shaped']],
    [{ rounded: 'pill' }, ['rounded-pill']],
    // All strings are accepted?
    [{ rounded: 'foo-bar-bazz-buzz' }, ['rounded-foo-bar-bazz-buzz']],
    [{ rounded: '!' }, ['rounded-!']],
    [{ rounded: 'sm-3 4' }, ['rounded-sm-3', 'rounded-4']],
    [{ rounded: 'tr-xl br-lg' }, ['rounded-tr-xl', 'rounded-br-lg']],
  ] as BorderRadiusProps[])(
    'should return correct rounded classes',
    (props: BorderRadiusProps, expected: any) => {
      const { borderRadiusClasses } = useBorderRadius(props)

      expect(borderRadiusClasses.value).toStrictEqual(expected)
    })
})
