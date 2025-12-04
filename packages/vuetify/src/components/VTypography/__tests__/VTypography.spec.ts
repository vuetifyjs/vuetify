// Utilities
import { mount } from '@vue/test-utils'
import { createVuetify } from '../../../framework'
import { VTypography } from '../VTypography'

describe('VTypography', () => {
  const vuetify = createVuetify()

  it('renders default variant class', () => {
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
    expect(wrapper.classes()).toContain('body-medium')
  })

  it('applies responsive variant classes', () => {
    const wrapper = mount(VTypography, {
      global: {
        plugins: [vuetify],
      },
      props: {
        variant: 'body-small',
        lg: 'body-large',
        xl: 'headline-medium',
      },
    })

    expect(wrapper.classes()).toEqual(
      expect.arrayContaining([
        'body-small',
        'body-lg-large',
        'headline-xl-medium',
      ]),
    )
  })

  it('applies custom color', () => {
    const wrapper = mount(VTypography, {
      global: {
        plugins: [vuetify],
      },
      props: {
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

  it('applies custom inline style', () => {
    const wrapper = mount(VTypography, {
      global: { plugins: [vuetify] },
      props: {
        customVariant: { fontSize: '32px', fontWeight: '700' },
      },
      slots: {
        default: 'Custom style',
      },
    })

    const style = wrapper.attributes('style')
    expect(style).toContain('font-size: 32px')
    expect(style).toContain('font-weight: 700')
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
