// Libraries
import Vue from 'vue'

// Components
import VIcon from '../../VIcon/VIcon'
import VToolbarSideIcon from '../VToolbarSideIcon'

// Utilities
import {
  mount,
  Wrapper
} from '@vue/test-utils'

describe('VToolbarSideIcon.ts', () => {
  let mountFunction: (ctx?: object, name?: any) => Wrapper<Vue>

  beforeEach(() => {
    mountFunction = (ctx = {}, name) => {
      return mount(VToolbarSideIcon, {
        context: Object.assign({
          children: [name],
          data: {},
          props: {}
        }, ctx)
      })
    }
  })

  it('should create default icon when no slot used', () => {
    const wrapper = mountFunction()

    expect(wrapper.find('i').classes('material-icons')).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should create slot icon when present', () => {
    const vm = new Vue()
    const wrapper = mountFunction({}, vm.$createElement(VIcon, 'fa-add'))

    expect(wrapper.find('i').classes('fa-add')).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should pass through events properly', () => {
    const click = jest.fn()
    const wrapper = mountFunction({
      on: { click }
    })

    wrapper.trigger('click')

    expect(click).toBeCalled()
  })

  it('should pass through css classes to button component', () => {
    const wrapper = mountFunction({
      staticClass: 'hidden-sm-and-up'
    })

    expect(wrapper.classes('hidden-sm-and-up')).toBe(true)
  })
})
