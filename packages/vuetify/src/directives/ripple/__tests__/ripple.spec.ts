import { mount } from '@vue/test-utils'
import { defineComponent } from 'vue'

// Directives
import Ripple from '../'

// Utilities
import { keyCodes } from '@/util/helpers'

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
})
