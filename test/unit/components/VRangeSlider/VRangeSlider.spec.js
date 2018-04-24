import { test } from '@/test'
import VRangeSlider from '@/components/VRangeSlider'

const warning = '[Vuetify] Missing v-app or a non-body wrapping element with the [data-app] attribute in "v-range-slider"'

test('VRangeSlider.vue', ({ mount }) => {

  it('should provide a default value if non provided', async () => {
    const wrapper = mount(VRangeSlider)

    expect(wrapper.vm.lazyValue).toEqual([0, 0])

    expect(warning).toHaveBeenTipped()
  })

  it('should round values and swap order if needed', () => {
    const wrapper = mount(VRangeSlider, {
      propsData: {
        value: [0, 0]
      }
    })

    expect(wrapper.vm.lazyValue).toEqual([0, 0])

    const input = jest.fn()
    wrapper.vm.$on('input', input)

    wrapper.vm.internalValue = [1.01, 2.99]

    expect(input).toBeCalledWith([1, 3])

    wrapper.vm.internalValue = [4.5, 2.99]

    expect(input).toBeCalledWith([3, 5])

    wrapper.setData({ activeThumb: 1 })

    expect(wrapper.vm.activeThumb).toBe(1)

    wrapper.vm.internalValue = [5, 1.1]

    expect(input).toBeCalledWith([1, 5])
    expect(wrapper.vm.activeThumb).toBe(0)

    wrapper.setProps({ value: [1, 5 ]})
    wrapper.vm.internalValue = [1, 5]

    expect(input).not.toBeCalledWith()

    expect(warning).toHaveBeenTipped()
  })

  it('should change value on key down', () => {
    const setInternalValue = jest.fn()
    const wrapper = mount(VRangeSlider, {
      methods: { setInternalValue }
    })
    const input = wrapper.first('input')

    expect(wrapper.vm.activeThumb).toBe(null)
    input.trigger('focus')
    expect(wrapper.vm.activeThumb).toBe(0)
    input.trigger('keydown.up')

    expect(setInternalValue).toHaveBeenCalledTimes(1)

    wrapper.setData({ activeThumb: null })
    expect(wrapper.vm.activeThumb).toBe(null)

    input.trigger('keydown.esc')

    expect(setInternalValue).toHaveBeenCalledTimes(1)

    expect(warning).toHaveBeenTipped()
  })
})
