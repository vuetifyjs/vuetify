// Composables
import { makeBorderProps, useBorder } from '../border'

// Utilities
import { mount } from '@vue/test-utils'

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
    [{ outlined: false }, []],
    // Border only
    [{ outlined: true }, ['test--border']],
    [{ border: true }, ['test--border']],
    [{ border: '' }, ['test--border']],
    // Border with 0 or false
    [{ border: '0' }, ['border-0']],
    [{ border: 0 }, ['border-0']],
    // Border with a word
    [{ border: 'tl' }, ['border-tl']],
    [{ border: 'tr opacity-50' }, ['border-tr', 'border-opacity-50']],
    [{ border: 'r-xl primary' }, ['border-r-xl', 'border-primary']],
  ] as const)('should have the correct class', (props, expected) => {
    const { borderClasses } = useBorder(props, 'test')

    expect(borderClasses.value).toEqual(expected)
  })
})
