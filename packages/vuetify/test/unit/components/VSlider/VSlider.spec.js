import Vue from 'vue'
import { test } from '@/test'
import VSlider from '@/components/VSlider'


test('VSlider.vue', ({ mount }) => {
  let el
  beforeEach(() => {
    el = document.createElement('div')
    el.setAttribute('data-app', 'true')
    document.body.appendChild(el)
  })
  afterEach(() => {
    document.body.removeChild(el)
  })

  it('should match a snapshot', () => {
    const wrapper = mount(VSlider)

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render vertical slider', async () => {
    const wrapper = mount(VSlider, {
      propsData: {
        vertical: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with ticks and match a snapshot', async () => {
    const wrapper = mount(VSlider, {
      propsData: {
        ticks: 'yes',
        step: 25
      }
    })

    expect('Invalid prop: custom validator check failed for prop "ticks"').toHaveBeenWarned()

    wrapper.setProps({ ticks: true })

    expect(wrapper.html()).toMatchSnapshot()

    wrapper.setProps({ ticks: 'always' })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with thumbLabel and match a snapshot', () => {
    const wrapper = mount(VSlider, {
      propsData: {
        thumbLabel: 'true'
      }
    })

    expect('Invalid prop: custom validator check failed for prop "thumbLabel"').toHaveBeenWarned()

    wrapper.setProps({ thumbLabel: true })

    expect(wrapper.html()).toMatchSnapshot()

    wrapper.setProps({ thumbLabel: 'always' })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should set tabindex in disabled component', () => {
    const wrapper = mount(VSlider, {
      propsData: {
        disabled: true
      }
    })

    const slider = wrapper.first('.v-slider__thumb-container')

    expect(slider.element.getAttribute('tabindex')).toBe('-1')
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
  })

  it('should round value with offset correct', async () => {
    const wrapper = mount(VSlider, {
      propsData: {
        min: 3,
        max: 15,
        step: 3
      }
    })

    const input = jest.fn()
    wrapper.vm.$on('input', input)

    wrapper.setProps({ value: 5 })
    await wrapper.vm.$nextTick()
    expect(input).toHaveBeenLastCalledWith(6)

    wrapper.setProps({ value: 7 })
    await wrapper.vm.$nextTick()
    expect(input).toHaveBeenLastCalledWith(6)
  })

  it('should react to keydown event', async () => {
    const wrapper = mount(VSlider, {
      propsData: {
        value: 50
      }
    })

    const input = jest.fn()
    wrapper.vm.$on('input', input)

    const slider = wrapper.first('.v-slider__thumb-container')

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
    expect(input).toHaveBeenCalledTimes(12)

    wrapper.setProps({ disabled: true })

    slider.trigger('keydown.left')

    expect(input).toHaveBeenCalledTimes(12)

    wrapper.setProps({ disabled: false })
    wrapper.vm.$vuetify.rtl = true

    slider.trigger('keydown.right', {
      shiftKey: true
    })
    expect(input).toBeCalledWith(72)
    wrapper.vm.$vuetify.rtl = undefined
  })

  it('should add for to label', () => {
    const wrapper = mount(VSlider, {
      attachToDocument: true,
      attrs: { id: 'foo' },
      propsData: {
        label: 'bar'
      }
    })

    const label = wrapper.first('.v-label')

    expect(label.element.getAttribute('for')).toBe('foo')

    const wrapper2 = mount(VSlider, {
      attachToDocument: true,
      propsData: {
        label: 'bar'
      }
    })

    const label2 = wrapper2.first('.v-label')

    expect(label2.element.getAttribute('for')).toBe(null)
  })

  it('should deactivate', async () => {
    const wrapper = mount(VSlider, {
      attachToDocument: true
    })

    const container = wrapper.first('.v-slider__thumb-container')

    expect(wrapper.vm.isActive).toBe(false)

    container.trigger('mousedown')

    expect(wrapper.vm.isActive).toBe(true)
  })

  it('should react to touch', async () => {
    const wrapper = mount(VSlider, {
      attachToDocument: true
    })

    const container = wrapper.first('.v-slider__thumb-container')

    expect(wrapper.vm.keyPressed).toBe(0)
    expect(wrapper.vm.isActive).toBe(false)

    container.trigger('mousedown')

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.keyPressed).toBe(2)
    expect(wrapper.vm.isActive).toBe(true)

    el.dispatchEvent(new Event('mouseup'))

    expect(wrapper.vm.keyPressed).toBe(0)
    expect(wrapper.vm.isActive).toBe(false)

    container.trigger('mousedown', {
      touches: []
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.keyPressed).toBe(2)
    expect(wrapper.vm.isActive).toBe(true)
  })

  it.skip('should emit number', async () => {
    const wrapper = mount(VSlider, {
      propsData: {
        value: 0
      },
      attachToDocument: true
    })

    const input = jest.fn()
    wrapper.vm.$on('input', input)

    wrapper.vm.onMouseMove({
      clientX: 1
    })

    expect(input).toHaveBeenCalledWith(100)

    wrapper.vm.onMouseMove({
      touches: [{ clientX: 50 }]
    })

    expect(input).toHaveBeenCalledWith(100)

    wrapper.vm.$vuetify.rtl = true
    wrapper.vm.onMouseMove({
      clientX: 1
    })
    expect(input).toHaveBeenCalledWith(0)
    wrapper.vm.$vuetify.rtl = undefined
  })

  it('should reset keys pressed', () => {
    const wrapper = mount(VSlider)

    wrapper.setData({ keyPressed: 5 })

    expect(wrapper.vm.keyPressed).toBe(5)

    wrapper.vm.onKeyUp()

    expect(wrapper.vm.keyPressed).toBe(0)
  })

  it('should return a rounded value', () => {
    const wrapper = mount(VSlider, {
      propsData: { step: 0 }
    })

    expect(wrapper.vm.roundValue(1.234)).toBe(1.234)

    wrapper.setProps({ step: 1 })

    expect(wrapper.vm.roundValue(1.234)).toBe(1)

    wrapper.setProps({ step: 4 })

    expect(wrapper.vm.roundValue(5.667)).toBe(4)

    expect(wrapper.vm.roundValue(7.667)).toBe(8)

    wrapper.setProps({ step: 2.5 })

    expect(wrapper.vm.roundValue(5.667)).toBe(5)
  })

  it('should return a rounded value with offset', () => {
    const wrapper = mount(VSlider, {
      propsData: { step: 0 }
    })

    expect(wrapper.vm.roundValue(1.234)).toBe(1.234)

    wrapper.setProps({ step: 1, step: 2 })

    expect(wrapper.vm.roundValue(1.234)).toBe(2)

    wrapper.setProps({ step: 4, min: 2 })

    expect(wrapper.vm.roundValue(5.667)).toBe(6)

    expect(wrapper.vm.roundValue(7.667)).toBe(6)

    wrapper.setProps({ step: 2.5, min: 5 })

    expect(wrapper.vm.roundValue(5.667)).toBe(5)
  })

  it('should return a rounded value bounded by min and max', () => {
    const wrapper = mount(VSlider, {
      propsData: {
        min: 5,
        max: 10
      }
    })

    wrapper.setProps({ value: 1 })
    expect(wrapper.vm.internalValue).toBe(5)

    wrapper.setProps({ value: 15 })
    expect(wrapper.vm.internalValue).toBe(10)
  })

  it('should not update if value matches lazy value', () => {
    const wrapper = mount(VSlider, {
      propsData: {
        value: 10
      }
    })

    const input = jest.fn()
    wrapper.vm.$on('input', input)

    expect(wrapper.vm.lazyValue).toBe(10)

    wrapper.vm.internalValue = 15

    expect(input).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.lazyValue).toBe(15)

    wrapper.vm.internalValue = 15

    expect(input).toHaveBeenCalledTimes(1)
  })

  it('should react to input events', async () => {
    const wrapper = mount(VSlider)
    const focus = jest.fn()
    const blur = jest.fn()

    wrapper.vm.$on('focus', focus)
    wrapper.vm.$on('blur', blur)

    const input = wrapper.first('.v-slider__thumb-container')

    expect(wrapper.vm.isActive).toBe(false)
    expect(wrapper.vm.isFocused).toBe(false)

    input.trigger('focus')

    expect(wrapper.vm.isFocused).toBe(true)
    expect(focus).toHaveBeenCalledTimes(1)

    input.trigger('blur')

    expect(wrapper.vm.isFocused).toBe(false)
    expect(blur).toHaveBeenCalledTimes(1)
  })

  it('should call mousemove and emit change', () => {
    const wrapper = mount(VSlider)

    const change = jest.fn()
    wrapper.vm.$on('change', change)
    const input = wrapper.first('.v-slider')

    input.trigger('click')

    expect(change).toHaveBeenCalledTimes(1)
  })

  it('should keep thumb-label when focused and clicked', async () => {
    const onBlur = jest.fn()
    const wrapper = mount(VSlider, {
      propsData: {
        thumbLabel: true
      }
    })

    const input = wrapper.first('.v-slider__thumb-container')
    const thumb = wrapper.first('.v-slider__thumb-container')

    input.trigger('focus')

    expect(wrapper.vm.showThumbLabel).toBe(true)
    expect(wrapper.vm.isActive).toBe(false)
    expect(wrapper.vm.isFocused).toBe(true)

    // Clicking thumb label triggers blur
    thumb.trigger('mousedown')
    input.trigger('blur')

    expect(wrapper.vm.isActive).toBe(true)
    expect(wrapper.vm.isFocused).toBe(false)
  })

  it('should reverse label location when inverse', () => {
    const wrapper = mount(VSlider, {
      propsData: { label: 'foo' }
    })

    expect(wrapper.html()).toMatchSnapshot()

    wrapper.setProps({ inverseLabel: true })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should change track styles in rtl', () => {
    const wrapper = mount(VSlider)

    expect(wrapper.html()).toMatchSnapshot()

    wrapper.setProps({ value: 50 })

    expect(wrapper.html()).toMatchSnapshot()

    wrapper.setProps({ disabled: true })

    expect(wrapper.html()).toMatchSnapshot()

    wrapper.vm.$vuetify.rtl = true
    wrapper.setProps({ value: 0, disabled: false })

    expect(wrapper.html()).toMatchSnapshot()

    wrapper.setProps({ value: 50 })

    expect(wrapper.html()).toMatchSnapshot()

    wrapper.setProps({ disabled: true })

    expect(wrapper.html()).toMatchSnapshot()

    wrapper.vm.$vuetify.rtl = undefined
  })

  it('should display label and have different aria-label', () => {
    const wrapper = mount(VSlider, {
      propsData: { label: 'foo' },
      attrs: {'aria-label': 'bar'}
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should display tick labels', () => {
    const wrapper = mount(VSlider, {
      propsData: {
        max: 1,
        tickLabels: ['foo', 'bar']
      }
    })

    const ticks = wrapper.find('.v-slider__tick')

    expect(ticks.length).toBe(2)
    expect(ticks[0].element.firstChild.innerHTML).toBe('foo')
    expect(ticks[1].element.firstChild.innerHTML).toBe('bar')
  })

  it('should not react to keydown if disabled', () => {
    const parseKeyDown = jest.fn()
    const wrapper = mount(VSlider, {
      propsData: { disabled: true },
      methods: { parseKeyDown }
    })

    const input = wrapper.first('.v-slider__thumb-container')

    input.trigger('keydown.right')

    expect(parseKeyDown).not.toBeCalled()

    wrapper.setProps({
      disabled: false,
      readonly: true
    })

    input.trigger('keydown.right')

    expect(parseKeyDown).not.toBeCalled()

    wrapper.setProps({
      disabled: false,
      readonly: false
    })

    input.trigger('keydown.right')

    expect(parseKeyDown).toBeCalled()
  })
})
