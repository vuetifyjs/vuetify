// Components
import { VListItem } from '..'

// Composables
import { createDefaults, VuetifyDefaultsSymbol } from '@/composables/defaults'

// Utilities
import { createTheme, VuetifyThemeSymbol } from '@/composables/theme'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'

describe('VListItem', () => {
  function mountFunction (options = {}) {
    return mount(VListItem, {
      global: {
        provide: {
          [VuetifyDefaultsSymbol as symbol]: createDefaults(),
          [VuetifyThemeSymbol as symbol]: createTheme(),
        },
      },
      ...options,
    })
  }

  it('should match a snapshot', () => {
    const wrapper = mountFunction()

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should add active-class when the active prop is true', async () => {
    const activeClass = 'foo'
    const wrapper = mountFunction({ props: { activeClass } })

    expect(wrapper.classes()).not.toContain(activeClass)

    wrapper.setProps({ active: true })

    await nextTick()

    expect(wrapper.classes()).toContain(activeClass)
  })

  it('should conditionally have the tabindex attribute', async () => {
    const wrapper = mountFunction()

    expect(wrapper.attributes('tabindex')).toBeUndefined()

    wrapper.setProps({ link: true })

    await nextTick()

    expect(wrapper.attributes('tabindex')).toBe('0')

    wrapper.setProps({ disabled: true })

    await nextTick()

    expect(wrapper.attributes('tabindex')).toBeUndefined()
  })
})
