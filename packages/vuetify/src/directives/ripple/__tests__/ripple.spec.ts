// Directives
import Ripple from '../'

// Utilities
import { describe, expect, it } from '@jest/globals'
import { mount } from '@vue/test-utils'
import { defineComponent } from 'vue'
import { keyCodes } from '@/util'

const testComponent = defineComponent({
  directives: { Ripple },
  template: '<div class="a" v-ripple />',
})

describe('v-ripple', () => {
  it('with no value should be enabled', () => {
    const wrapper = mount(testComponent)

    expect(wrapper.element._ripple?.enabled).toBe(true)
  })

  it('should update element property reactively', async () => {
    const wrapper = mount({
      directives: { Ripple },
      props: {
        ripple: {
          type: Boolean,
          default: true,
        },
      },
      template: '<div class="a" v-ripple="ripple" />',
    })
    const el = wrapper.element

    expect(el._ripple?.enabled).toBe(true)

    await wrapper.setProps({ ripple: false })
    expect(el._ripple?.enabled).toBe(false)

    await wrapper.setProps({ ripple: true })
    expect(el._ripple?.enabled).toBe(true)
  })

  it('should trigger ripple on mousedown', () => {
    jest.useFakeTimers()
    const wrapper = mount(testComponent)

    const mousedownEvent = new MouseEvent('mousedown')
    wrapper.element.dispatchEvent(mousedownEvent)

    expect(wrapper.find('.v-ripple__container').exists()).toBe(true)

    const mouseupEvent = new MouseEvent('mouseup')
    wrapper.element.dispatchEvent(mouseupEvent)

    jest.runAllTimers()
    expect(wrapper.find('.v-ripple__container').exists()).toBe(false)
  })

  it.each(['enter', 'space'] as const)('should trigger ripple on %s key press', key => {
    jest.useFakeTimers()
    const wrapper = mount(testComponent)

    const keydownEvent = new KeyboardEvent('keydown', { keyCode: keyCodes[key] })
    wrapper.element.dispatchEvent(keydownEvent)

    expect(wrapper.find('.v-ripple__container').exists()).toBe(true)

    const keyupEvent = new KeyboardEvent('keyup')
    wrapper.element.dispatchEvent(keyupEvent)

    jest.runAllTimers()
    expect(wrapper.find('.v-ripple__container').exists()).toBe(false)
  })

  it('should only ripple on one element', () => {
    const wrapper = mount({
      directives: { Ripple },
      template: '<div v-ripple><div class="child" v-ripple></div></div>',
    })

    const child = wrapper.find('.child').element

    const mousedownEvent = new MouseEvent('mousedown', { detail: 1, bubbles: true })
    child.dispatchEvent(mousedownEvent)

    expect(wrapper.findAll('.v-ripple__container')).toHaveLength(1)

    const mouseupEvent = new MouseEvent('mouseup', { detail: 1, bubbles: true })
    child.dispatchEvent(mouseupEvent)

    jest.runAllTimers()
    expect(wrapper.findAll('.v-ripple__container')).toHaveLength(0)
  })

  it('should hide ripple on blur if keyboardRipple is true', () => {
    const wrapper = mount(testComponent)
    const keydownEvent = new KeyboardEvent('keydown', { keyCode: 13 })
    wrapper.element.dispatchEvent(keydownEvent)

    expect(wrapper.find('.v-ripple__container').exists()).toBe(true)

    const blurEvent = new FocusEvent('blur')
    wrapper.element.dispatchEvent(blurEvent)

    jest.runAllTimers()
    expect(wrapper.find('.v-ripple__container').exists()).toBe(false)
  })
})
