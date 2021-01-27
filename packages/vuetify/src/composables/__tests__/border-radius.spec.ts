// Utilities
import { makeBorderRadiusProps, useBorderRadius } from '../border-radius'
import { mount } from '@vue/test-utils'

// Types
import type { BorderRadiusProps } from '../border-radius'

describe('border-radius.ts', () => {
  it('should create border-radius props', () => {
    const wrapper = mount({
      props: makeBorderRadiusProps(),
      template: '<div/>',
    }, {
      propsData: { rounded: true },
    })

    expect(wrapper.props().rounded).toBeDefined()
  })

  it.each([
    // When should return nothing
    [{}, []],
    [{ rounded: null }, []],
    [{ rounded: 1 }, []],
    // // Rounded only
    [{ rounded: true }, ['rounded']],
    [{ rounded: '' }, ['rounded']],
    // // Rounded with 0
    [{ rounded: '0' }, ['rounded-0']],
    [{ rounded: 0 }, ['rounded-0']],
    // // Rounded with a word
    [{ rounded: 'circle' }, ['rounded-circle']],
    [{ rounded: 'shaped' }, ['rounded-shaped']],
    [{ rounded: 'pill' }, ['rounded-pill']],
    // // Corner and axis border-radius
    [{ rounded: 'tr-xl br-lg' }, ['rounded-tr-xl', 'rounded-br-lg']],
  ] as BorderRadiusProps[])('should return correct rounded classes', (props: BorderRadiusProps, expected: any) => {
    const { borderRadiusClasses } = useBorderRadius(props)

    expect(borderRadiusClasses.value).toStrictEqual(expected)
  })
})
