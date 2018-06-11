import { test } from '@/test'
import VRangeSlider from '@/components/VRangeSlider'

const warning = '[Vuetify] Missing v-app or a non-body wrapping element with the [data-app] attribute'

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

  it('should return index of closest value', () => {
    const wrapper = mount(VRangeSlider)

    expect(wrapper.vm.getIndexOfClosestValue([0, 25], 23)).toBe(1)
    expect(wrapper.vm.getIndexOfClosestValue([0, 25], 5)).toBe(0)
    expect(wrapper.vm.getIndexOfClosestValue([25, 28], 32)).toBe(1)
    expect(wrapper.vm.getIndexOfClosestValue([25, 28], 23)).toBe(0)

    expect(warning).toHaveBeenTipped()
  })

  it('should call on drag', async () => {
    const wrapper = mount(VRangeSlider)

    expect(wrapper.vm.isActive).toBe(false)
    expect(wrapper.vm.activeThumb).toBe(null)

    const container = wrapper.first('.v-slider__thumb-container')

    container.trigger('mousedown')

    expect(wrapper.vm.isActive).toBe(true)
    expect(wrapper.vm.activeThumb).toBe(0)

    expect(warning).toHaveBeenTipped()
  })

  it('should call mouse move and emit change on click', async () => {
    const onMouseMove = jest.fn()
    const wrapper = mount(VRangeSlider, {
      attachToDocument: true,
      methods: { onMouseMove }
    })

    const change = jest.fn()
    wrapper.vm.$on('change', change)

    expect(wrapper.vm.isActive).toBe(false)

    const input = wrapper.first('input')
    input.trigger('focus')

    expect(wrapper.vm.isActive).toBe(false)
    expect(change).not.toBeCalled()

    wrapper.setData({ isActive: true })
    input.trigger('click')

    expect(change).not.toBeCalled()

    wrapper.setData({ isActive: false })
    input.trigger('click')

    expect(change).toHaveBeenCalledTimes(1)
    expect(onMouseMove).toHaveBeenCalledTimes(1)
    expect(warning).toHaveBeenTipped()
  })

  it('should react to a track click', () => {
    const setInternalValue = jest.fn()
    const getIndexOfClosestValue = jest.fn()
    const wrapper = mount(VRangeSlider, {
      methods: {
        getIndexOfClosestValue,
        setInternalValue
      }
    })

    // Will return false for isInsideTrack
    wrapper.vm.onMouseMove({})

    expect(setInternalValue).not.toBeCalled()
    expect(getIndexOfClosestValue).not.toBeCalled()

    // Will return true for isInsideTrack
    wrapper.vm.onMouseMove({
      clientX: 0
    })

    expect(getIndexOfClosestValue).not.toBeCalled()
    expect(setInternalValue).toHaveBeenCalledTimes(1)

    wrapper.vm.onMouseMove({
      clientX: 0
    }, true)

    expect(getIndexOfClosestValue).toBeCalled()
    expect(setInternalValue).toHaveBeenCalledTimes(2)

    expect(warning).toHaveBeenTipped()
  })

  it('should set internal value', () => {
    const wrapper = mount(VRangeSlider)

    expect(wrapper.vm.internalValue).toEqual([0, 0])

    wrapper.vm.setInternalValue(2)

    expect(wrapper.vm.internalValue).toEqual([0, 0])

    wrapper.setData({ activeThumb: 0 })
    wrapper.vm.setInternalValue(1)

    expect(wrapper.vm.internalValue).toEqual([0, 1])

    wrapper.vm.setInternalValue(5)

    expect(wrapper.vm.internalValue).toEqual([0, 5])

    wrapper.setProps({ value: [5, 10]})

    expect(wrapper.vm.internalValue).toEqual([5, 10])

    wrapper.vm.setInternalValue(100)

    expect(wrapper.vm.internalValue).toEqual([5, 100])

    wrapper.setData({ activeThumb: 1 })
    wrapper.vm.setInternalValue(25)

    expect(wrapper.vm.internalValue).toEqual([5, 25])

    expect(warning).toHaveBeenTipped()
  })

  it('should return the proper styles', () => {
    const wrapper = mount(VRangeSlider)

    let styles = wrapper.vm.trackFillStyles

    expect(styles.left).toBe('0%')
    expect(styles.right).toBe('auto')
    expect(styles.width).toBe('calc(0% - 7px)')
    wrapper.vm.$vuetify.rtl = true

    styles = wrapper.vm.trackFillStyles
    expect(styles.left).toBe('auto')
    expect(styles.right).toBe('0%')
    expect(styles.width).toBe('calc(0% - 7px)')

    wrapper.vm.$vuetify.rtl = undefined

    expect(warning).toHaveBeenTipped()
  })
})
