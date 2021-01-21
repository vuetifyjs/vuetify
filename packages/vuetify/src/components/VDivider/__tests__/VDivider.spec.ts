// Components
import VDivider from '../VDivider'

// Utilities
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { createTheme, VuetifyThemeSymbol } from '@/composables'
import { VuetifySymbol } from '@/framework'

describe('VDivider', () => {
  let provide: any = {}

  beforeEach(() => {
    provide = {
      [VuetifySymbol as symbol]: { defaults: { global: {} } },
      [VuetifyThemeSymbol as symbol]: createTheme(),
    }
  })

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
