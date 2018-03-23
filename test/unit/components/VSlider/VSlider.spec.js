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
    expect(input).toBeCalledWith(50)
    slider.trigger('keydown.home')
    expect(input).toBeCalledWith(0)
    slider.trigger('keydown.end')
    expect(input).toBeCalledWith(100)
    slider.trigger('keydown.pagedown')
    expect(input).toBeCalledWith(90)
    slider.trigger('keydown.pageup')
    expect(input).toBeCalledWith(100)

    wrapper.setProps({ step: 4 })
    slider.trigger('keydown.pagedown')
    expect(input).toBeCalledWith(60)
    wrapper.setProps({ step: 2 })
    slider.trigger('keydown.pageup')
    expect(input).toBeCalledWith(80)
    wrapper.setProps({ max: 1000 })
    slider.trigger('keydown.pageup')
    expect(input).toBeCalledWith(180)
    slider.trigger('keydown.pagedown')
    wrapper.setProps({ max: 100 })

    slider.trigger('keydown.left', {
      shiftKey: true
    })
    expect(input).toBeCalledWith(74)

    slider.trigger('keydown.right', {
      ctrlKey: true
    })
    expect(input).toBeCalledWith(78)

    expect(warning).toHaveBeenTipped()
  })

  it('should have the correct track padding', () => {
    const wrapper = mount(VSlider)

    expect(wrapper.vm.trackPadding).toBe(6)

    wrapper.setData({ isActive: true })

    expect(wrapper.vm.trackPadding).toBe(9)

    wrapper.setData({ disabled: true })

    expect(wrapper.vm.trackPadding).toBe(6)

    wrapper.setProps({ thumbLabel: true })

    expect(wrapper.vm.trackPadding).toBe(0)

    wrapper.setData({ isActive: false })

    expect(wrapper.vm.trackPadding).toBe(6)

    wrapper.setProps({ thumbLabel: false })

    expect(wrapper.vm.trackPadding).toBe(6)

    expect(warning).toHaveBeenTipped()
  })

  it('should add for to label', () => {
    const wrapper = mount(VSlider, {
      attrs: { id: 'foo' }
    })

    const label = wrapper.first('.v-label')

    expect(label.element.getAttribute('for')).toBe('foo')

    expect(warning).toHaveBeenTipped()
  })

  it('should deactivate', async () => {
    const wrapper = mount(VSlider, {
      attachToDocument: true
    })

    const slider = wrapper.first('.v-slider__thumb-container')

    expect(wrapper.vm.isActive).toBe(false)

    slider.trigger('mousedown')

    expect(wrapper.vm.isActive).toBe(true)

    expect(warning).toHaveBeenTipped()
  })

  it('should react to touch', () => {
    const wrapper = mount(VSlider, {
      attachToDocument: true
    })

    const app = document.createElement('span')
    document.body.appendChild(app)
    wrapper.setData({ app })

    const container = wrapper.first('.v-slider__thumb-container')

    expect(wrapper.vm.keyPressed).toBe(0)
    expect(wrapper.vm.isActive).toBe(false)

    container.trigger('mousedown')

    expect(wrapper.vm.keyPressed).toBe(2)
    expect(wrapper.vm.isActive).toBe(true)

    app.dispatchEvent(new Event('mouseup'))

    expect(wrapper.vm.keyPressed).toBe(0)
    expect(wrapper.vm.isActive).toBe(false)

    container.trigger('mousedown', {
      touches: []
    })

    expect(wrapper.vm.keyPressed).toBe(2)
    expect(wrapper.vm.isActive).toBe(true)

    expect(warning).toHaveBeenTipped()
  })

  it('should set inputValue', async () => {
    const wrapper = mount(VSlider, {
      attachToDocument: true
    })

    expect(wrapper.vm.lazyValue).toBe(0)

    wrapper.vm.onMouseMove({
      clientX: 6
    })

    expect(wrapper.vm.lazyValue).toBe(100)

    wrapper.vm.onMouseMove({
      touches: [{ clientX: 50 }]
    })

    expect(wrapper.vm.lazyValue).toBe(100)

    expect(warning).toHaveBeenTipped()
  })

  it('should reset keys pressed', () => {
    const wrapper = mount(VSlider)

    wrapper.setData({ keyPressed: 5 })

    expect(wrapper.vm.keyPressed).toBe(5)

    wrapper.vm.onKeyUp()

    expect(wrapper.vm.keyPressed).toBe(0)

    expect(warning).toHaveBeenTipped()
  })

  it('should call on mouse move', () => {
    const wrapper = mount(VSlider)
    const onMouseMove = jest.fn()
    wrapper.setMethods({ onMouseMove })

    wrapper.vm.onSliderMove('foo')

    expect(onMouseMove).toBeCalledWith('foo')

    wrapper.setData({ isActive: true })

    wrapper.vm.onSliderMove('bar')

    expect(onMouseMove).not.toBeCalledWith('bar')
    expect(onMouseMove).toHaveBeenCalledTimes(1)

    expect(warning).toHaveBeenTipped()
  })

  it('should return a rounded value', () => {
    const wrapper = mount(VSlider, {
      propsData: { step: 0 }
    })

    expect(wrapper.vm.roundValue(1.234)).toBe(1)

    wrapper.setProps({ step: 4 })

    expect(wrapper.vm.roundValue(5.667)).toBe(4)

    expect(wrapper.vm.roundValue(7.667)).toBe(8)

    wrapper.setProps({ step: 2.5 })

    expect(wrapper.vm.roundValue(5.667)).toBe(5)

    expect(warning).toHaveBeenTipped()
  })
})
