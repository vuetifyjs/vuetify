import VWindow from '@/components/VWindow'
import { test } from '@/test'

test('VWindow.ts', ({ mount }) => {
  it('it should return the correct transition', async () => {
    const wrapper = mount(VWindow)
    expect(wrapper.vm.computedTransition).toBe('v-window-x-transition')

    wrapper.setProps({ reverse: true })
    expect(wrapper.vm.computedTransition).toBe('v-window-x-reverse-transition')

    wrapper.setProps({ vertical: true })
    expect(wrapper.vm.computedTransition).toBe('v-window-y-reverse-transition')

    wrapper.setProps({ reverse: false })
    expect(wrapper.vm.computedTransition).toBe('v-window-y-transition')

    wrapper.setProps({ transition: 'fade-transition' })

    expect(wrapper.vm.computedTransition).toBe('fade-transition')
  })

  it('should transition content', async () => {
    const wrapper = mount(VWindow)

    // TODO: No idea how to test the transition hooks

    // Before enter
    expect(wrapper.vm.isActive).toBe(false)
    wrapper.vm.onBeforeEnter()
    expect(wrapper.vm.isActive).toBe(true)

    // Enter
    const el = document.createElement('div')
    expect(wrapper.vm.height).toBe(undefined)
    wrapper.vm.onEnter(el)
    await new Promise(resolve => window.requestAnimationFrame(resolve))
    expect(wrapper.vm.height).toBe('0px')

    // After enter
    wrapper.vm.onAfterEnter()
    expect(wrapper.vm.height).toBe(undefined)
    expect(wrapper.vm.isActive).toBe(false)

    // Before leave
    wrapper.vm.onBeforeLeave(el)
    expect(wrapper.vm.height).toBe('0px')
  })

  it('should filter children when value provided', async () => {
    const wrapper = mount(VWindow, {
      propsData: {
        value: 0
      },
      slots: {
        default: [
          { render: h => h('div', 'foo') },
          { render: h => h('div', 'bar') }
        ]
      }
    })

    const html = wrapper.html()
    expect(html).toMatchSnapshot()

    wrapper.setProps({ value: 1 })

    await wrapper.vm.$nextTick()

    const html2 = wrapper.html()
    expect(html2).toMatchSnapshot()
    expect(html2).not.toEqual(html)
  })

  it('should set reverse', async () => {
    const wrapper = mount(VWindow, {
      propsData: {
        value: 0
      },
      slots: {
        default: [
          { render: h => h('div', 'foo') },
          { render: h => h('div', 'bar') }
        ]
      }
    })

    wrapper.setProps({ value: 1 })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.internalReverse).toBe(false)

    wrapper.setProps({ value: 0 })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.internalReverse).toBe(true)

    wrapper.setProps({ value: 1, reverse: true })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.internalReverse).toBe(true)
  })
})
