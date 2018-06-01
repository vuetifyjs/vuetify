import { test } from '@/test'
import VTextarea from '@/components/VTextarea'
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

test('VTextarea.vue', ({ mount }) => {
  it('should calculate element height when using auto-grow prop', async () => {
    let value = ''
    const component = {
      render (h) {
        return h(VTextarea, {
          on: {
            input: i => value = i
          },
          props: {
            value,
            autoGrow: true
          }
        })
      }
    }

    const wrapper = mount(component)
    const input = wrapper.find('textarea')[0]

    input.trigger('focus')
    await wrapper.vm.$nextTick()
    input.element.value = 'this is a really long text that should hopefully make auto-grow kick in. maybe?'
    input.trigger('input')
    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()
    expect(input.element.style.getPropertyValue('height').length).not.toBe(0)
  })

  it('should watch lazy value', async () => {
    const wrapper = mount(VTextarea)

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

    const wrapper = mount(VTextarea, {
      attachToDocument: true,
      propsData: {
        autoGrow: true
      },
      methods: { calculateInputHeight }
    })


    expect(calculateInputHeight).toBeCalled()
  })

  it('should calculate input height', async () => {
    const wrapper = mount(VTextarea, {
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

  it('should stop propagation', async () => {
    const wrapper = mount(VTextarea)

    const stopPropagation = jest.fn()
    const onKeyDown = {
      keyCode: 13,
      stopPropagation
   }
    wrapper.vm.onKeyDown(onKeyDown)

    expect(stopPropagation).not.toBeCalled()

    wrapper.setData({ isFocused: true })

    wrapper.vm.onKeyDown(onKeyDown)

    expect(stopPropagation).toBeCalled()
  })

  it('should render no-resize the same if already auto-grow', () => {
    const wrappers = [
      { autoGrow: true, outline: false },
      { autoGrow: true, outline: true }
    ].map(propsData => mount(VTextarea,{ propsData }))

    wrappers.forEach(async wrapper => {
      await wrapper.vm.$nextTick()
      const html1 = wrapper.html()

      wrapper.setProps({ noResize: true })
      // will still pass without this, do not remove
      await wrapper.vm.$nextTick()
      const html2 = wrapper.html()

      expect(html2).toBe(html1)
    })
  })

  it('should emit keydown event', () => {
    const wrapper = mount(VTextarea)
    const keydown = jest.fn()
    const textarea = wrapper.first('textarea')
    wrapper.vm.$on('keydown', keydown)

    textarea.trigger('focus')
    textarea.element.value = 'foobar'
    textarea.trigger('input')
    textarea.trigger('keydown.enter')

    expect(keydown).toBeCalled()
  })
})
