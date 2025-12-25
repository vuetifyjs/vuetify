// Utilities
import { mount } from '@vue/test-utils'
import { createVuetify } from '../../../framework'
import { VTypography } from '../VTypography'

describe('VTypography', () => {
  const vuetify = createVuetify()

  it('does not throw when variant is missing', () => {
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
    expect(wrapper.classes()).not.toContain('text-')
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
        'text-body-small',
        'text-lg-body-large',
        'text-xl-headline-medium',
      ]),
    )
  })

  it('applies theme color', () => {
    const wrapper = mount(VTypography, {
      global: {
        plugins: [vuetify],
      },
      props: {
        color: 'primary',
      },
    })

    expect(wrapper.classes()).toContain('v-typography')
    expect(wrapper.classes()).toContain('text-primary')
  })

  it('applies custom color', () => {
    const wrapper = mount(VTypography, {
      global: {
        plugins: [vuetify],
      },
      props: {
        color: '#33aa00',
      },
    })

    expect(wrapper.classes()).toContain('v-typography')
    expect(wrapper.attributes('style')).toContain('color: #33aa00')
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
        style: { fontSize: '32px', fontWeight: '700' },
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
