import VRangeSlider from '../VRangeSlider'
import {
  mount,
  MountOptions,
  Wrapper,
} from '@vue/test-utils'

describe('VRangeSlider.ts', () => {
  type Instance = InstanceType<typeof VRangeSlider>
  let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>

  let el
  beforeEach(() => {
    el = document.createElement('div')
    el.setAttribute('data-app', 'true')
    document.body.appendChild(el)

    mountFunction = (options?: MountOptions<Instance>) => {
      return mount(VRangeSlider, {
        ...options,
        mocks: {
          $vuetify: {
            rtl: false,
            theme: {
              dark: false,
            },
          },
        },
      })
    }
  })
  afterEach(() => {
    document.body.removeChild(el)
  })

  it('should provide a default value if non provided', async () => {
    const wrapper = mountFunction()

    expect(wrapper.vm.lazyValue).toEqual([0, 0])
  })

  it('should round values and swap order if needed', () => {
    const wrapper = mountFunction({
      propsData: {
        value: [0, 0],
      },
    })

    expect(wrapper.vm.lazyValue).toEqual([0, 0])

    const input = jest.fn()
    wrapper.vm.$on('input', input)

    wrapper.vm.internalValue = [1.01, 2.99]

    expect(input).toHaveBeenCalledWith([1, 3])

    wrapper.vm.internalValue = [4.5, 2.99]

    expect(input).toHaveBeenCalledWith([3, 5])

    wrapper.setData({ activeThumb: 1 })

    expect(wrapper.vm.activeThumb).toBe(1)

    wrapper.vm.internalValue = [5, 1.1]

    expect(input).toHaveBeenCalledWith([1, 5])
    expect(wrapper.vm.activeThumb).toBe(0)

    wrapper.setProps({ value: [1, 5] })
    wrapper.vm.internalValue = [1, 5]

    expect(input).not.toHaveBeenCalledWith()
  })

  it('should change value on key down', () => {
    const setInternalValue = jest.fn()
    const wrapper = mountFunction({
      methods: { setInternalValue },
    })
    const input = wrapper.find('.v-slider__thumb-container')

    expect(wrapper.vm.activeThumb).toBeNull()
    input.trigger('focus')
    expect(wrapper.vm.activeThumb).toBe(0)
    input.trigger('keydown.up')

    expect(setInternalValue).toHaveBeenCalledTimes(1)

    wrapper.setData({ activeThumb: null })
    expect(wrapper.vm.activeThumb).toBeNull()

    input.trigger('keydown.esc')

    expect(setInternalValue).toHaveBeenCalledTimes(1)
  })

  it('should return index of closest value', () => {
    const wrapper = mountFunction()

    expect(wrapper.vm.getIndexOfClosestValue([0, 25], 23)).toBe(1)
    expect(wrapper.vm.getIndexOfClosestValue([0, 25], 5)).toBe(0)
    expect(wrapper.vm.getIndexOfClosestValue([25, 28], 32)).toBe(1)
    expect(wrapper.vm.getIndexOfClosestValue([25, 28], 23)).toBe(0)
  })

  it('should call on drag', async () => {
    const wrapper = mountFunction()

    expect(wrapper.vm.isActive).toBeFalsy()
    expect(wrapper.vm.activeThumb).toBeNull()

    const container = wrapper.find('.v-slider__thumb-container')

    container.trigger('mousedown')

    expect(wrapper.vm.isActive).toBeTruthy()
    expect(wrapper.vm.activeThumb).toBe(0)
  })

  it('should set internal value', () => {
    const wrapper = mountFunction()

    expect(wrapper.vm.internalValue).toEqual([0, 0])

    wrapper.vm.setInternalValue(2)

    expect(wrapper.vm.internalValue).toEqual([0, 0])

    wrapper.setData({ activeThumb: 0 })
    wrapper.vm.setInternalValue(1)

    expect(wrapper.vm.internalValue).toEqual([0, 1])

    wrapper.vm.setInternalValue(5)

    expect(wrapper.vm.internalValue).toEqual([0, 5])

    wrapper.setProps({ value: [5, 10] })

    expect(wrapper.vm.internalValue).toEqual([5, 10])

    wrapper.vm.setInternalValue(100)

    expect(wrapper.vm.internalValue).toEqual([5, 100])

    wrapper.setData({ activeThumb: 1 })
    wrapper.vm.setInternalValue(25)

    expect(wrapper.vm.internalValue).toEqual([5, 25])
  })

  it('should render a vertical slider', async () => {
    const wrapper = mountFunction({
      propsData: {
        vertical: true,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render disabled slider', async () => {
    const wrapper = mountFunction({
      propsData: {
        disabled: true,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
  it('should not change to another handle', async () => {
    const setInternalValue = jest.fn()
    const mockParseMouseMoveResult = { value: 1, isInsideTrack: true }
    const wrapper = mountFunction({
      methods: { parseMouseMove: e => mockParseMouseMoveResult, setInternalValue },
      propsData: {
        min: 0,
        max: 1,
        value: [0, 1],
      },
    })
    wrapper.setData({ activeThumb: 0 })
    wrapper.vm.onMouseMove(null)

    expect(wrapper.vm.activeThumb).toEqual(0)
    expect(setInternalValue).toHaveBeenCalledWith(1)
  })

  // https://github.com/vuetifyjs/vuetify/issues/9818
  it('should accept falsy values', () => {
    [
      [undefined, undefined],
      [null, null],
      [false, false],
    ].forEach(value => {
      const wrapper = mountFunction({
        propsData: { value },
      })

      expect(wrapper.vm.internalValue).toEqual([0, 0])
    })
  })

  // https://github.com/vuetifyjs/vuetify/issues/6843
  it('should be uniq id', async () => {
    const wrapper = mountFunction()
    const [min, max] = wrapper.vm.genInput()

    expect(min.data.attrs.id).not.toEqual(max.data.attrs.id)
  })
})
