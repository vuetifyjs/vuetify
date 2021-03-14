// Components
import { VAvatar } from '../'

// Utilities
import { h } from 'vue'
import { createVuetify } from '@/framework'
import { mount } from '@vue/test-utils'

describe('VAvatar', () => {
  const vuetify = createVuetify()
  const mountFunction = (options = {}) => mount(VAvatar, {
    ...options,
    global: {
      plugins: [vuetify],
    },
  })

  it('should have an v-avatar class', () => {
    const wrapper = mountFunction()

    expect(wrapper.classes()).toContain('v-avatar')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should respect size prop', () => {
    const wrapper = mountFunction({
      props: {
        size: 'large',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should respect rounded prop', () => {
    const wrapper = mountFunction({
      props: {
        rounded: 0,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should respect color prop', () => {
    const wrapper = mountFunction({
      props: {
        color: 'error',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should respect tag prop', () => {
    const wrapper = mountFunction({
      props: {
        tag: 'span',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render default slot content', () => {
    const wrapper = mountFunction({
      slots: {
        default: () => h('span', 'foo'),
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
