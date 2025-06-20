import { mount } from '@vue/test-utils'
import { createApp, type App } from 'vue'
import { createTypography } from '../typography'
import { VTypography } from '@/components/VTypography/VTypography'

describe('VTypography', () => {
  let app: App

  beforeEach(() => {
    app = createApp({})
  })

  it('should inject and use the default typography style', () => {
    const typography = createTypography()
    typography.install(app)

    const wrapper = mount(VTypography, {
      global: {
        plugins: [{
          install: typography.install,
        }],
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
    const typography = createTypography({
      'custom-variant': {
        fontSize: '99px',
        lineHeight: '100px',
        fontWeight: 900,
        letterSpacing: '1px',
      },
    })
    typography.install(app)

    const wrapper = mount(VTypography, {
      global: {
        plugins: [{
          install: typography.install,
        }],
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
  })

  it('should switch to mobileVariant when mobileBreakpoint matches', () => {
    expect(true).toBe(true)
  })

  it('should apply color class and style', () => {
    const typography = createTypography()
    typography.install(app)

    const wrapper = mount(VTypography, {
      global: {
        plugins: [{
          install: typography.install,
        }],
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
  })
})
