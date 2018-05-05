import { test } from '@/test'
import VOverflowBtn from '@/components/VOverflowBtn'

test('VOverflowBtn', ({ mount }) => {

  it('segmented - should warn when item has no callback', async () => {
    const items = [
      { text: 'Hello', callback: () => {} },
      { text: 'Hello' }
    ]

    const wrapper = mount(VOverflowBtn, {
      propsData: {
        segmented: true,
        items
      }
    })

    wrapper.vm.internalValue = items[1]

    await wrapper.vm.$nextTick()

    expect('Unable to locate target [data-app]').toHaveBeenTipped()
    expect('items must contain both a text and callback property').toHaveBeenTipped()
  })

})
