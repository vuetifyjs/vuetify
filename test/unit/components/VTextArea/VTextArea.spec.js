import { test } from '@/test'
import VTextArea from '@/components/VTextArea'
import Vue from 'vue'

const tabClick = 'Injection "tabClick" not found'
const tabsWarning = '[Vuetify] The v-tab component must be used inside a v-tabs'
const stub = {
  name: 'router-link',

  props: {
    to: [String, Object]
  },

  render (h) {
    return h('a', {
      domProps: { href: this.to }
    })
  }
}

test('VTextArea.vue', ({ mount }) => {
  it('should have no resize handle', async () => {
    const wrapper = mount(VTextArea)

    expect(wrapper.vm.noResizeHandle).toBe(false)

    wrapper.setProps({ noResize: true })

    expect(wrapper.vm.noResizeHandle).toBe(true)

    wrapper.setProps({ noResize: false, autoGrow: true })

    expect(wrapper.vm.noResizeHandle).toBe(true)

    wrapper.setProps({ autoGrow: false })

    expect(wrapper.vm.noResizeHandle).toBe(false)
  })

  it('should watch lazy value', async () => {
    const wrapper = mount(VTextArea)

    const calculateInputHeight = jest.fn()
    wrapper.setMethods({ calculateInputHeight })

    wrapper.vm.lazyValue = 'foo'

    expect(calculateInputHeight).not.toBeCalled()

    wrapper.setProps({ autoGrow: true })

    wrapper.vm.lazyValue = 'bar'

    // wait for watcher
    await wrapper.vm.$nextTick()

    expect(calculateInputHeight).toBeCalled()
  })

  it('should calculate height on mounted', async () => {
    const calculateInputHeight = jest.fn()

    const wrapper = mount(VTextArea, {
      attachToDocument: true,
      propsData: {
        autoGrow: true
      },
      methods: { calculateInputHeight }
    })


    expect(calculateInputHeight).toBeCalled()
  })

  it('should calculate input height', async () => {
    const wrapper = mount(VTextArea, {
      propsData: {
        autoGrow: true
      }
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.inputHeight).toBe(120)

    wrapper.setData({ inputHeight: 200 })

    expect(wrapper.vm.inputHeight).toBe(200)

    wrapper.vm.calculateInputHeight()

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.inputHeight).toBe(120)

    wrapper.vm.calculateInputHeight()

    await wrapper.vm.$nextTick()

    delete wrapper.vm.$refs.input
    wrapper.vm.calculateInputHeight()

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.inputHeight).toBe(120)
  })
})
