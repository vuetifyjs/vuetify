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
    [{ dot: true }],
    [{ icon: 'foo' }],
  ])('should render component and match snapshot', (props) => {
    const wrapper = mountFunction({
      props,
      slots: {
        badge: () => <span>content</span>,
        default: () => <span>element</span>,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  // it('should render component with color prop', () => {
  //   const wrapper = mountFunction({
  //     props: { color: 'green' },
  //     slots: { badge: () => <span>content</span> },
  //   })

  //   const badge = wrapper.find('.v-badge__badge')
  //   expect(badge.classes('bg-green')).toBeTruthy()
  // })

  // it('should render component without transition element', () => {
  //   const wrapper = mountFunction({
  //     props: { transition: false },
  //   })

  //   expect(wrapper.html()).toMatchSnapshot()
  // })
})
