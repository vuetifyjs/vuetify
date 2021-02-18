// Components
import VResponsive from '../VResponsive'

// Utilities
import { h } from 'vue'
import { mount } from '@vue/test-utils'
import { VuetifySymbol } from '@/framework'

const globalOptions = {
  provide: {
    [VuetifySymbol as symbol]: {
      defaults: {
        global: {},
      },
    },
  },
}

function mountFunction (options = {}) {
  return mount(VResponsive, {
    ...options,
    global: globalOptions,
  })
}

describe('VResponsive', () => {
  it('should force aspect ratio', () => {
    const wrapper = mountFunction({
      propsData: { aspectRatio: 16 / 9 },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render content', () => {
    const wrapper = mountFunction({
      slots: {
        default: () => h('div', ['content']),
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should set height', () => {
    const wrapper = mountFunction({
      propsData: { height: 100, maxHeight: 200 },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
