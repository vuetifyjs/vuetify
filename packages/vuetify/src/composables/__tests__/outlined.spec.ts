// Composables
import { makeOutlinedProps, useOutlined } from '..'

// Utilities
import { mount } from '@vue/test-utils'

// Types
import type { OutlinedProps } from '..'

describe('outlined.ts', () => {
  it('should create border-radius props', () => {
    const wrapper = mount({
      props: makeOutlinedProps(),
      template: '<div/>',
    }, {
      propsData: { outlined: true },
    })

    expect(wrapper.props().outlined).toBeDefined()
  })

  it.each([
    // Invalid or empty
    [{}, []],
    [{ outlined: null }, []],
    [{ outlined: 1 }, []],
    // Outlined only
    [{ outlined: true }, ['border']],
    [{ outlined: '' }, ['border']],
    // Outlined with 0 or false
    [{ outlined: '0' }, ['border-0']],
    [{ outlined: false }, ['border-0']],
    [{ outlined: 0 }, ['border-0']],
    // Outlined with a word
    [{ outlined: 'tl' }, ['border-tl']],
    [{ outlined: 'tr opacity-50' }, ['border-tr', 'border-opacity-50']],
    [{ outlined: 'r-xl primary' }, ['border-r-xl', 'border-primary']],
  ] as OutlinedProps[])('should have the correct class', (props, expected) => {
    const { outlinedClasses } = useOutlined(props)

    expect(outlinedClasses.value).toEqual(expected)
  })
})
