import { test } from '@/test'
import VSlider from '@/components/VSlider'

const warning = '[Vuetify] Missing v-app or a non-body wrapping element with the [data-app] attribute in "v-slider"'

test('Vslider.vue', ({ mount }) => {
  it('should match a snapshot', () => {
    const wrapper = mount(VSlider)

    expect(wrapper.html()).toMatchSnapshot()
    expect(warning).toHaveBeenTipped()
  })

  it('should render component with ticks and match a snapshot', () => {
    const wrapper = mount(VSlider, {
      propsData: {
        ticks: true,
        step: 25
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
    expect(warning).toHaveBeenTipped()
  })

  it('should render component with thumbLabel and match a snapshot', () => {
    const wrapper = mount(VSlider, {
      propsData: {
        thumbLabel: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
    expect(warning).toHaveBeenTipped()
  })

  it('should set tabindex in disabled component', () => {
    const wrapper = mount(VSlider, {
      propsData: {
        disabled: true
      }
    })

    const slider = wrapper.first('.v-slider')

    expect(slider.element.getAttribute('tabindex')).toBe('-1')
    expect(warning).toHaveBeenTipped()
  })

  it('should not allow values outside of min/max', async () => {
    const wrapper = mount(VSlider, {
      propsData: {
        min: 2,
        max: 4
      }
    })

    const input = jest.fn()
    wrapper.instance().$on('input', input)

    wrapper.setProps({ value: 0 })
    await wrapper.vm.$nextTick()
    expect(input).toBeCalledWith(2)

    wrapper.setProps({ value: 5 })
    await wrapper.vm.$nextTick()
    expect(input).toBeCalledWith(4)

    expect(warning).toHaveBeenTipped()
  })

  it('should adjust value if min/max props change', async () => {
    const wrapper = mount(VSlider, {
      propsData: {
        value: 5,
        min: 0,
        max: 10
      }
    })

    const input = jest.fn()
    wrapper.instance().$on('input', input)

    wrapper.setProps({ min: 6 })
    await wrapper.vm.$nextTick()
    expect(input).toBeCalledWith(6)

    wrapper.setProps({ max: 4 })
    await wrapper.vm.$nextTick()
    expect(input).toBeCalledWith(4)

    expect(warning).toHaveBeenTipped()
  })

  it('should be focused when active', async () => {
    const wrapper = mount(VSlider, {
      propsData: {
        value: 5,
        min: 0,
        max: 10
      }
    })

    wrapper.setData({ isActive: true })

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.isFocused).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
    expect(warning).toHaveBeenTipped()
  })

  it('should react to keydown event', async () => {
    const wrapper = mount(VSlider, {
      propsData: {
        value: 50
      }
    })

    const input = jest.fn()
    wrapper.vm.$on('input', input)

    const slider = wrapper.first('.v-slider')

    slider.trigger('keydown.space')
    expect(input).not.toBeCalled()
    slider.trigger('keydown.left')
    expect(input).toBeCalledWith(49)
    slider.trigger('keydown.right')
    expect(input).toBeCalledWith(51)
    slider.trigger('keydown.home')
    expect(input).toBeCalledWith(0)
    slider.trigger('keydown.end')
    expect(input).toBeCalledWith(100)
    slider.trigger('keydown.pageup')
    expect(input).toBeCalledWith(40)
    slider.trigger('keydown.pagedown')
    expect(input).toBeCalledWith(60)

    expect(warning).toHaveBeenTipped()
  })
})
