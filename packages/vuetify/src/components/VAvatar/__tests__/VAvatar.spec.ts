// Libraries
import Vue from 'vue'

// Components
import VAvatar from '../VAvatar'

// Utilities
import {
  createLocalVue,
  mount,
  Wrapper
} from '@vue/test-utils'

describe('VAvatar', () => {
  let mountFunction: (options?: object) => Wrapper<Vue>
  let localVue: typeof Vue

  beforeEach(() => {
    localVue = createLocalVue()

    mountFunction = (options = {}) => {
      return mount(VAvatar, {
        localVue,
        ...options
      })
    }
  })

  it('should have an v-avatar class', () => {
    const wrapper = mountFunction()

    expect(wrapper.classes()).toContain('v-avatar')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should have an proper class with tile prop', () => {
    const wrapper = mountFunction({
      context: {
        props: {
          tile: true
        }
      }
    })

    expect(wrapper.classes()).toContain('v-avatar--tile')
  })

  it('should accept custom or no class declarations', () => {
    const wrapper = mountFunction()
    const wrapperTwo = mountFunction({
      context: {
        class: 'active'
      }
    })
    const wrapperThree = mountFunction({
      context: {
        class: ['active']
      }
    })
    const wrapperFour = mountFunction({
      context: {
        class: { 'active': true }
      }
    })

    expect(wrapper.classes()).not.toContain('active')
    expect(wrapperTwo.classes()).toContain('active')
    expect(wrapperThree.classes()).toContain('active')
    expect(wrapperFour.classes()).toContain('active')
  })
})
