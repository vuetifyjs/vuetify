import { test } from '@/test'
import VPaper from '@/components/VPaper'

test('VPaper.vue', ({ mount }) => {
  it('should change elevation on mouseover', async () => {
    const wrapper = mount(VPaper, {
      propsData: {
        hover: 5
      }
    })

    expect(wrapper.vm.$el.classList.contains('elevation-0')).toBe(true)

    const listeners = wrapper.vm.$options.computed.listeners

    // Should not bind listeners if hover is undefined
    expect(listeners.call({ hover: undefined })).toEqual({})

    const events = listeners.call(wrapper.vm)

    events.mouseenter()

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.isMouseOver).toBe(true)
    expect(wrapper.vm.$el.classList.contains('elevation-5')).toBe(true)

    events.mouseleave()

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.isMouseOver).toBe(false)
    expect(wrapper.vm.$el.classList.contains('elevation-5')).toBe(false)
  })
})
