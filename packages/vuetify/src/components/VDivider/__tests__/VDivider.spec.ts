// Components
import { VDivider } from '..'

// Utilities
import { createVuetify } from '@/framework'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from '@jest/globals'

describe('VDivider', () => {
  const vuetify = createVuetify()

  function mountFunction (options = {}) {
    return mount(VDivider, {
      global: { plugins: [vuetify] },
      ...options,
    })
  }

  it('should match a snapshot', () => {
    const wrapper = mountFunction()

    expect(wrapper.html()).toMatchSnapshot()
  })

  it.each([
    [{ length: 256 }, 'max-width: 256px;'],
    [{ length: '128', vertical: true }, 'max-height: 128px;'],
    [{ thickness: 2 }, 'border-top-width: 2px;'],
    [{ thickness: '5', vertical: true }, 'border-right-width: 5px;'],
  ])('should have correct styles for %s', (propsData, expected) => {
    const wrapper = mountFunction({ propsData })

    expect(wrapper.attributes('style')).toEqual(expected)
  })

  it.each([
    [{}, ['horizontal', 'separator']],
    [{ vertical: true }, ['vertical', 'separator']],
    [{ role: 'foo' }, [undefined, 'foo']],
  ])('should have correct attributes for %s', (propsData, expected) => {
    const wrapper = mountFunction({ propsData })
    const [ariaorientation, role] = expected

    expect(wrapper.attributes()['aria-orientation']).toBe(ariaorientation)
    expect(wrapper.attributes().role).toBe(role)
  })
})
