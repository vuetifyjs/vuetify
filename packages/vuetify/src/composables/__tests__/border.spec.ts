// Composables
import { makeBorderProps, useBorder } from '..'

// Utilities
import { mount } from '@vue/test-utils'

// Types
import type { BorderProps } from '..'

describe('border.ts', () => {
  it('should create border props', () => {
    const wrapper = mount({
      props: makeBorderProps(),
      template: '<div/>',
    }, {
      propsData: { border: true },
    })

    expect(wrapper.props().border).toBeDefined()
  })

  it.each([
    // Invalid or empty
    [{}, []],
    [{ border: null }, []],
    [{ border: 1 }, []],
    // Border only
    [{ border: true }, ['border']],
    [{ border: '' }, ['border']],
    // Border with 0 or false
    [{ border: '0' }, ['border-0']],
    [{ border: false }, ['border-0']],
    [{ border: 0 }, ['border-0']],
    // Border with a word
    [{ border: 'tl' }, ['border-tl']],
    [{ border: 'tr opacity-50' }, ['border-tr', 'border-opacity-50']],
    [{ border: 'r-xl primary' }, ['border-r-xl', 'border-primary']],
  ] as BorderProps[])('should have the correct class', (props, expected) => {
    const { borderClasses } = useBorder(props)

    expect(borderClasses.value).toEqual(expected)
  })
})
