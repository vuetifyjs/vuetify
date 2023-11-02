// Composables
import { makeBorderProps, useBorder } from '../border'

// Utilities
import { describe, expect, it } from '@jest/globals'
import { mount } from '@vue/test-utils'

// Types
import type { BorderProps } from '../border'

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
    [{ border: true }, ['foo--border']],
    [{ border: '' }, ['foo--border']],
    // Border with 0 or false
    [{ border: '0' }, ['border-0']],
    [{ border: 0 }, ['border-0']],
    // Border with a word
    [{ border: 't' }, ['border-t']],
    [{ border: 't opacity-50' }, ['border-t', 'border-opacity-50']],
    [{ border: 'e-xl primary' }, ['border-e-xl', 'border-primary']],
  ] as BorderProps[])('should have the correct class using %s', (props: BorderProps, expected: any) => {
    const { borderClasses } = useBorder(props as BorderProps, 'foo')

    expect(borderClasses.value).toEqual(expected)
  })
})
