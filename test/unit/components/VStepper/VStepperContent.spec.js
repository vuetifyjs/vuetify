import { test } from '@/test'
import VStepperContent from '@/components/VStepper/VStepperContent'

test('VStepperContent.js', ({ mount }) => {
  it('should set height to auto', async () => {
    const wrapper = mount(VStepperContent, {
      attachToDocument: true,
      propsData: { step: 0 }
    })

    expect(wrapper.vm.isActive).toBe(null)
    expect(wrapper.vm.height).toBe(0)

    wrapper.setData({ isActive: true })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.isActive).toBe(true)
    expect(wrapper.vm.height).toBe('auto')
  })
})
