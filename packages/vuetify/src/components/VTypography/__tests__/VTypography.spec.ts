// Utilities
import { mount } from '@vue/test-utils'
import { createVuetify } from '../../../framework'
import { VTypography } from '../VTypography'

describe('VTypography', () => {
  const vuetify = createVuetify()

  it('renders properly with default props', () => {
    const wrapper = mount(VTypography, {
      global: {
        plugins: [vuetify],
      },
      slots: {
        default: 'Test Text',
      },
    })

    expect(wrapper.text()).toBe('Test Text')
    expect(wrapper.classes()).toContain('v-typography')
  })

  it('applies correct typography styles based on text prop', () => {
    const wrapper = mount(VTypography, {
      global: {
        plugins: [vuetify],
      },
      props: {
        text: 'headline-large',
      },
    })

    const style = wrapper.attributes('style')
    expect(style).toBeDefined()
    expect(wrapper.classes()).toContain('v-typography')
  })

  it('handles mobile breakpoint and variant', () => {
    const wrapper = mount(VTypography, {
      global: {
        plugins: [vuetify],
      },
      props: {
        text: 'headline-large',
        mobile: 'display-large',
        mobileBreakpoint: 'md',
      },
    })

    expect(wrapper.attributes('style')).toBeDefined()
    expect(wrapper.classes()).toContain('v-typography')
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
    expect(wrapper.classes()).toContain('v-typography')
  })

  it('applies custom tag', () => {
    const wrapper = mount(VTypography, {
      global: {
        plugins: [vuetify],
      },
      props: {
        tag: 'h1',
      },
    })

    expect(wrapper.element.tagName.toLowerCase()).toBe('h1')
  })

  it('applies custom class', () => {
    const customClass = 'custom-class'
    const wrapper = mount(VTypography, {
      global: {
        plugins: [vuetify],
      },
      props: {
        class: customClass,
      },
    })

    expect(wrapper.classes()).toContain(customClass)
  })

  it('applies custom style', () => {
    const customStyle = { backgroundColor: 'red' }
    const wrapper = mount(VTypography, {
      global: {
        plugins: [vuetify],
      },
      props: {
        style: customStyle,
      },
    })

    const style = wrapper.attributes('style')
    expect(style).toBeDefined()
    expect(style).toContain('background-color: red')
  })

  it('handles theme classes', () => {
    const wrapper = mount(VTypography, {
      global: {
        plugins: [vuetify],
      },
      props: {
        theme: 'dark',
      },
    })

    expect(wrapper.classes()).toContain('v-theme--dark')
  })
})
