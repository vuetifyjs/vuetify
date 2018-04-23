import { test } from '@/test'
import VRangeSlider from '@/components/VRangeSlider'

const warning = '[Vuetify] Missing v-app or a non-body wrapping element with the [data-app] attribute in "v-range-slider"'

test('VRangeSlider.vue', ({ mount }) => {

  it('should emit array if using range prop', async () => {
    const wrapper = mount(VRangeSlider, {
      propsData: {
        value: [0, 50]
      },
      attachToDocument: true
    })

    const input = jest.fn()
    wrapper.vm.$on('input', input)

    wrapper.vm.onMouseMove({
      clientX: 6
    })

    expect(input).toHaveBeenCalledWith([50, 100])

    expect(warning).toHaveBeenTipped()
  })
})
