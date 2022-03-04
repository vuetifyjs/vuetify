// Components
import { VBadge } from '..'

// Utilities
import { mount } from '@vue/test-utils'
import { createVuetify } from '@/framework'

describe('VBadge.tsx', () => {
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
    [{ inline: true }],
    [{ location: 'bottom-start' }],
    [{ location: undefined }],
    [{ location: null }],
    [{ content: '10', max: 9 }],
    [{ content: '10', max: 11 }],
    [{ content: 'foo', max: 9 }],
  ])('should match snapshot with badge slot and %s props', (props: any) => {
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
  ])('should match snapshot without badge slot and %s props', (props: any) => {
    const wrapper = mountFunction({ props })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
