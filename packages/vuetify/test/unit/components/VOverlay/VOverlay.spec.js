import { test } from '@/test'
import VOverlay from '@/components/VOverlay'

test('VOverlay.vue', ({ mount }) => {
  it('should have a conditional opacity', async () => {
    const wrapper = mount(VOverlay)

    expect(wrapper.vm.computedOpacity).toBe(0)

    wrapper.setProps({ value: true })

    expect(wrapper.vm.computedOpacity).toBe(0.46)

    wrapper.setProps({ opacity: 0.55 })

    expect(wrapper.vm.computedOpacity).toBe(0.55)

    wrapper.setProps({ value: false })

    expect(wrapper.vm.computedOpacity).toBe(0)
  })
})
