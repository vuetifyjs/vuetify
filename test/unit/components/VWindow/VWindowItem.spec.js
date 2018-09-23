import { test } from '@/test'
import { VWindow, VWindowItem } from '@/components/VWindow'

test('VWindowItem.ts', ({ mount }) => {
  it('should transition content', async () => {
    const wrapper = mount(VWindow, {
      slots: {
        default: [VWindowItem]
      }
    })

    // TODO: No idea how to test the transition hooks

    const item = wrapper.first(VWindowItem.options)
    // Before enter
    expect(wrapper.vm.isActive).toBe(false)
    item.vm.onBeforeEnter()
    expect(wrapper.vm.isActive).toBe(true)

    // Enter
    const el = document.createElement('div')
    expect(wrapper.vm.height).toBe(undefined)
    item.vm.onEnter(el)
    await new Promise(resolve => window.requestAnimationFrame(resolve))
    expect(wrapper.vm.height).toBe('0px')

    // After enter
    item.vm.onAfterEnter()
    expect(wrapper.vm.height).toBe(undefined)
    expect(wrapper.vm.isActive).toBe(false)

    // Before leave
    item.vm.onBeforeLeave(el)
    expect(wrapper.vm.height).toBe('0px')
  })

  it.skip('should filter children when value provided', async () => {
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
})
