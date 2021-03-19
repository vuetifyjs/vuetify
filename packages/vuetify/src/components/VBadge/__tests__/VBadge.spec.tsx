// Components
import { VBadge } from '..'

// Utilities
import { mount } from '@vue/test-utils'
import { createVuetify } from '@/framework'

describe('VBadge', () => {
  const vuetify = createVuetify()
  const mountFunction = (options?: any) => mount(VBadge, {
    ...options,
    global: { plugins: [vuetify] },
  })

  it('should render component and match snapshot', async () => {
    const wrapper = mountFunction({
      slots: {
        badge: () => <span>content</span>,
        default: () => <span>element</span>,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component without badge', async () => {
    const wrapper = mountFunction({
      props: { modelValue: false },
      slots: {
        badge: () => <span>content</span>,
        default: () => <span>element</span>,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with color prop', () => {
    const wrapper = mountFunction({
      props: { color: 'green' },
      slots: { badge: () => <span>content</span> },
    })

    const badge = wrapper.find('.v-badge__badge')
    expect(badge.classes('bg-green')).toBeTruthy()
  })

  it('should render component without transition element', () => {
    const wrapper = mountFunction({
      props: { transition: false },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
