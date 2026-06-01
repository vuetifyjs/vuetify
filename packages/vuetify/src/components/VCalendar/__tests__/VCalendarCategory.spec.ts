// Components
import { VCalendarCategory } from '../VCalendarCategory'

// Utilities
import { mount } from '@vue/test-utils'
import { createVuetify } from '@/framework'

describe('VCalendarCategory', () => {
  const vuetify = createVuetify()

  function mountFunction (options = {}) {
    return mount(VCalendarCategory, {
      global: { plugins: [vuetify] },
      ...options,
    })
  }

  it('should render with default props', () => {
    const wrapper = mountFunction()

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.classes()).toContain('v-calendar-category')
  })

  it('should render with categories', () => {
    const wrapper = mountFunction({
      props: {
        categories: ['Work', 'Personal', 'Travel'],
        type: 'category',
      },
    })

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.classes()).toContain('v-calendar-category')
  })

  it('should respect showIntervalHighlight prop', () => {
    const wrapper = mountFunction({
      props: {
        showIntervalHighlight: false,
      },
    })

    expect(wrapper.exists()).toBe(true)
  })

  it('should have showIntervalHighlight disabled by default', () => {
    const wrapper = mountFunction()

    expect(wrapper.vm.$props.showIntervalHighlight).toBe(false)
  })
})
