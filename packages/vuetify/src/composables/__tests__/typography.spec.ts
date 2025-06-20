import { mount } from '@vue/test-utils'
import { createVuetify } from '@/framework'
import { createTypography } from '../typography'
import { VTypography } from '@/components/VTypography/VTypography'

describe('VTypography', () => {
  const typography = createTypography({
    'custom-variant': {
      fontSize: '99px',
      lineHeight: '100px',
      fontWeight: 900,
      letterSpacing: '1px',
    },
  })

  const vuetify = createVuetify({
    blueprint: {
      defaults: {},
    },
    typography,
  })

  it('should inject and use the default typography style', () => {
    const wrapper = mount(VTypography, {
      global: {
        plugins: [vuetify],
      },
      props: {
        variant: 'body-medium',
      },
      slots: {
        default: () => 'Test text',
      },
    })

    expect(wrapper.text()).toBe('Test text')
    expect(wrapper.classes()).toContain('v-typography')
    expect(wrapper.attributes('style')).toContain('font-size')
  })

  it('should render with a custom variant', () => {
    const wrapper = mount(VTypography, {
      global: {
        plugins: [vuetify],
      },
      props: {
        variant: 'custom-variant',
      },
      slots: {
        default: () => 'Custom Style',
      },
    })

    expect(wrapper.text()).toBe('Custom Style')
    expect(wrapper.attributes('style')).toContain('font-size: 99px')
    expect(wrapper.attributes('style')).toContain('line-height: 100px')
  })

  it('should apply color class and style', () => {
    const wrapper = mount(VTypography, {
      global: {
        plugins: [vuetify],
      },
      props: {
        variant: 'body-medium',
        color: 'primary',
      },
      slots: {
        default: () => 'Colored Text',
      },
    })

    expect(wrapper.text()).toBe('Colored Text')
    expect(wrapper.classes()).toContain('v-typography')
    expect(wrapper.classes()).toContain('text-primary')
  })

  it('should render with custom tag', () => {
    const wrapper = mount(VTypography, {
      global: {
        plugins: [vuetify],
      },
      props: {
        tag: 'h2',
      },
      slots: {
        default: () => 'Heading',
      },
    })

    expect(wrapper.element.tagName.toLowerCase()).toBe('h2')
    expect(wrapper.text()).toBe('Heading')
  })
})
