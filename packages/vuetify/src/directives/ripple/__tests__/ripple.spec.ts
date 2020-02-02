// Libraries
import { h, withDirectives, defineComponent, ref, createApp, nextTick, Ref } from 'vue'

// Directives
import Ripple from '../'

describe('ripple.ts', () => {
  it('Ripple with no value should render element with ripple enabled', () => {
    const Test = defineComponent(() => () => withDirectives(h('div', { class: 'a' }), [ [ Ripple, true ] ]))
    const app = createApp()
    const el = document.createElement('div')
    app.mount(Test, el)

    expect(el.querySelector('.a')['_ripple'].enabled).toBe(true)
  })

  it('Ripple should update element property reactively', async () => {
    const ripple = ref(true)
    const Test = defineComponent((props: { ripple: Ref<boolean> }) => () => withDirectives(h('div', { class: 'a' }), [ [ Ripple, props.ripple.value ] ]))
    const app = createApp()
    const el = document.createElement('div')
    app.mount(Test, el, { ripple })

    expect(el.querySelector('.a')['_ripple'].enabled).toBe(true)

    ripple.value = false
    await nextTick()
    expect(el.querySelector('.a')['_ripple'].enabled).toBe(false)

    ripple.value = true
    await nextTick()
    expect(el.querySelector('.a')['_ripple'].enabled).toBe(true)
  })
})
