import { test } from '@/test'
import VTextarea from '@/components/VTextarea'
import Vue from 'vue'

test('VTextarea.vue', ({ mount }) => {
  it('should calculate element height when using auto-grow prop', async () => {
    const wrapper = mount(VTextarea, {
      attachToDocument: true,
      propsData: {
        value: '',
        autoGrow: true
      }
    })
    const input = jest.fn(value => wrapper.setData({ value }))
    wrapper.vm.$on('input', input)

    const el = wrapper.find('textarea')[0]

    el.trigger('focus')
    await wrapper.vm.$nextTick()
    el.element.value = 'this is a really long text that should hopefully make auto-grow kick in. maybe?'.replace(/\s/g, '\n')
    el.trigger('input')
    await wrapper.vm.$nextTick()

    // TODO: switch to e2e, jest doesn't do inline styles
    expect(wrapper.html()).toMatchSnapshot()
    expect(el.element.style.getPropertyValue('height').length).not.toBe(0)
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

    await new Promise(resolve => setTimeout(resolve, 0))
    expect(calculateInputHeight).toBeCalled()
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
