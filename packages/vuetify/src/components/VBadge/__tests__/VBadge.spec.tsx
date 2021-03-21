// Components
import { VBadge } from '..'

// Utilities
import { mount } from '@vue/test-utils'
import { createVuetify } from '@/framework'

describe('VBadge', () => {
  const vuetify = createVuetify()

  function mountFunction (options?: any) {
    return mount(VBadge, {
      ...options,
      global: { plugins: [vuetify] },
    })
  }

  it.each([
    [{ modelValue: true }],
    [{ modelValue: false }],
    [{ floating: true }],
    [{ dot: true }], // takes priority over badge slot
    [{ dot: true, floating: true }],
    [{ floating: true }],
    [{ icon: 'foo' }], // badge slot overrides icon
    [{ location: 'bottom-left' }],
    [{ location: undefined }],
    [{ location: null }],
  ])('should render component and match snapshot with badge slot', (props: any) => {
    const wrapper = mountFunction({
      props,
      slots: {
        badge: () => <span>content</span>,
        default: () => <span>element</span>,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it.each([
    [{ content: 'foo' }],
    [{ content: 'foo', icon: 'bar' }],
    [{ icon: 'foo' }],
  ])('should render component and match snapshot without badge slot', (props: any) => {
    const wrapper = mountFunction({ props })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
