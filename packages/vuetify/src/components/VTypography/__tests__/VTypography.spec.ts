// Utilities
import { mount } from '@vue/test-utils'
import { createVuetify } from '../../../framework'
import { VTypography } from '../VTypography'

describe('VTypography', () => {
  const vuetify = createVuetify()

  it('renders properly', () => {
    const wrapper = mount(VTypography, {
      global: {
        plugins: [vuetify],
      },
      props: {
        text: 'headline-large',
      },
      slots: {
        default: 'Test Text',
      },
    })

    expect(wrapper.text()).toBe('Test Text')
  })

  it('applies correct typography styles', () => {
    const wrapper = mount(VTypography, {
      global: {
        plugins: [vuetify],
      },
      props: {
        text: 'headline-large',
      },
    })

    expect(wrapper.attributes('style')).toBeDefined()
  })

  it('handles mobile breakpoint', () => {
    const wrapper = mount(VTypography, {
      global: {
        plugins: [vuetify],
      },
      props: {
        text: 'headline-large',
        mobile: 'display-large',
      },
    })

    expect(wrapper.attributes('style')).toBeDefined()
  })

  it('applies custom color', () => {
    const wrapper = mount(VTypography, {
      global: {
        plugins: [vuetify],
      },
      props: {
        text: 'headline-large',
        color: 'primary',
      },
    })

    expect(wrapper.attributes('style')).toBeDefined()
  })
})
