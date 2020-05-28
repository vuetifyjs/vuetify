// Libraries
import Vue from 'vue'

// Components
import VAvatar from '../VAvatar'

// Utilities
import {
  createLocalVue,
  mount,
  Wrapper,
} from '@vue/test-utils'

describe('VAvatar', () => {
  let mountFunction: (options?: object) => Wrapper<Vue>
  let localVue: typeof Vue

  beforeEach(() => {
    localVue = createLocalVue()

    mountFunction = (options = {}) => {
      return mount(VAvatar, {
        localVue,
        ...options,
      })
    }
  })

  it('should have an v-avatar class', () => {
    const wrapper = mountFunction()

    expect(wrapper.classes()).toContain('v-avatar')
    expect(wrapper.html()).toMatchSnapshot()
  })
})
