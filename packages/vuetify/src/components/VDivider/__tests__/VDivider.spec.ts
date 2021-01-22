// Components
import VDivider from '../VDivider'

// Utilities
import { createTheme, VuetifyThemeSymbol } from '@/composables'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { VuetifySymbol } from '@/framework'

describe('VDivider', () => {
  const provide: any = {
    [VuetifySymbol as symbol]: { defaults: { global: {} } },
    [VuetifyThemeSymbol as symbol]: createTheme(),
  }

  it('should match a snapshot', () => {
    const wrapper = mount(VDivider, {
      global: { provide },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should have correct a11y attributes', async () => {
    const wrapper = mount(VDivider, {
      global: { provide },
    })

    expect(wrapper.attributes().ariaorientation).toBe('horizontal')
    expect(wrapper.attributes().role).toBe('separator')

    wrapper.setProps({ vertical: true })

    await nextTick()

    expect(wrapper.attributes().ariaorientation).toBe('vertical')
    expect(wrapper.attributes().role).toBe('separator')

    wrapper.setProps({ vertical: false, role: 'foo' })

    await nextTick()

    expect(wrapper.attributes().ariaorientation).toBeUndefined()
    expect(wrapper.attributes().role).toBe('foo')
  })
})
