// Components
import VTabsSlider from '../VTabsSlider'

// Utilities
import { mount, Wrapper } from '@vue/test-utils'

// Types
import Vue from 'vue'

describe('VTabsSlider.ts', () => {
  let mountFunction: (options?: object) => Wrapper<Vue>

  beforeEach(() => {
    mountFunction = (options = {}) => {
      return mount(VTabsSlider, {
        ...options,
      })
    }
  })

  it('should render a tabs slider', () => {
    const wrapper = mountFunction({
      propsData: {
        color: 'blue lighten-1',
      },
    })

    expect(wrapper.element.classList).toContain('blue')
    expect(wrapper.element.classList).toContain('lighten-1')
  })
})
