// Libraries
import {
  createApp,
  defineComponent,
  h,
  nextTick,
  Ref,
  ref,
  withDirectives,
} from 'vue'

// Directives
import Ripple from '../'

describe('v-ripple', () => {
  it('Ripple with no value should render element with ripple enabled', () => {
    const Test = defineComponent(() =>
      () => withDirectives(
        h('div', { class: 'a' }),
        [[Ripple, true]]
      )
    )
    const app = createApp()
    const el = document.createElement('div')

    app.mount(Test, el)

    expect(el.querySelector('.a')['_ripple'].enabled).toBe(true)
  })

  it('Ripple should update element property reactively', async () => {
    const ripple = ref(true)
    const Test = defineComponent((props: { ripple: Ref<boolean> }) =>
      () => withDirectives(
        h('div', { class: 'a' }),
        [[Ripple, props.ripple.value]]
      )
    )
    const app = createApp(Test)
    const el = document.createElement('div')

    app.mount(el, { ripple })

    expect(el.querySelector('.a')['_ripple'].enabled).toBe(true)

    ripple.value = false
    await nextTick()
    expect(el.querySelector('.a')['_ripple'].enabled).toBe(false)

    ripple.value = true
    await nextTick()
    expect(el.querySelector('.a')['_ripple'].enabled).toBe(true)
  })

  // TODO
  // it('should trigger ripple on mousedown', () => {
  //   const wrapper = mountFunction()
  //
  //   const mousedownEvent = new MouseEvent('mousedown', { detail: 1 })
  //   wrapper.element.dispatchEvent(mousedownEvent)
  //
  //   expect(wrapper.find('.v-ripple__container').exists()).toBe(true)
  //
  //   const mouseupEvent = new MouseEvent('mouseup', { detail: 1 })
  //   wrapper.element.dispatchEvent(mouseupEvent)
  //
  //   jest.runAllTimers()
  //   expect(wrapper.find('.v-ripple__container').exists()).toBe(false)
  // })
  //
  // it('should trigger ripple on enter key press', () => {
  //   const wrapper = mountFunction()
  //
  //   const keydownEvent = new KeyboardEvent('keydown', { keyCode: 13 })
  //   wrapper.element.dispatchEvent(keydownEvent)
  //
  //   expect(wrapper.find('.v-ripple__container').exists()).toBe(true)
  //
  //   const keyupEvent = new KeyboardEvent('keyup')
  //   wrapper.element.dispatchEvent(keyupEvent)
  //
  //   jest.runAllTimers()
  //   expect(wrapper.find('.v-ripple__container').exists()).toBe(false)
  // })
  //
  // it('should trigger ripple on space key press', () => {
  //   const wrapper = mountFunction()
  //
  //   const keydownEvent = new KeyboardEvent('keydown', { keyCode: 32 })
  //   wrapper.element.dispatchEvent(keydownEvent)
  //
  //   expect(wrapper.find('.v-ripple__container').exists()).toBe(true)
  //
  //   const keyupEvent = new KeyboardEvent('keyup')
  //   wrapper.element.dispatchEvent(keyupEvent)
  //
  //   jest.runAllTimers()
  //   expect(wrapper.find('.v-ripple__container').exists()).toBe(false)
  // })
})
