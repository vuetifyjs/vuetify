// Components
import VSlider from '../VSlider'

// Utilities
import {
  mount,
  Wrapper,
} from '@vue/test-utils'

/* eslint-disable max-statements */
describe('VSlider.ts', () => {
  type Instance = InstanceType<typeof VSlider>
  let mountFunction: (options?: object) => Wrapper<Instance>
  let el

  beforeEach(() => {
    el = document.createElement('div')
    el.setAttribute('data-app', 'true')
    document.body.appendChild(el)
    mountFunction = (options = {}) => {
      return mount(VSlider, {
        // https://github.com/vuejs/vue-test-utils/issues/1130
        sync: false,
        mocks: {
          $vuetify: {
            rtl: false,
          },
        },
        ...options,
      })
    }
  })

  afterEach(() => {
    document.body.removeChild(el)
  })

  it('should match a snapshot', () => {
    const wrapper = mountFunction()

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render vertical slider', async () => {
    const wrapper = mountFunction({
      propsData: {
        vertical: true,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with ticks and match a snapshot', async () => {
    const wrapper = mountFunction({
      propsData: {
        ticks: 'yes',
        step: 25,
      },
    })

    expect('Invalid prop: custom validator check failed for prop "ticks"').toHaveBeenWarned()

    wrapper.setProps({ ticks: true })
    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()

    wrapper.setProps({ ticks: 'always' })
    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with thumbLabel and match a snapshot', async () => {
    const wrapper = mountFunction({
      propsData: {
        thumbLabel: 'true',
      },
    })

    expect('Invalid prop: custom validator check failed for prop "thumbLabel"').toHaveBeenWarned()

    wrapper.setProps({ thumbLabel: true })
    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()

    wrapper.setProps({ thumbLabel: 'always' })
    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should set tabindex in disabled component', () => {
    const wrapper = mountFunction({
      propsData: {
        disabled: true,
      },
    })

    const slider = wrapper.find('.v-slider__thumb-container')

    expect(slider.element.getAttribute('tabindex')).toBe('-1')
  })

  it('should not allow values outside of min/max', async () => {
    const wrapper = mountFunction({
      propsData: {
        min: 2,
        max: 4,
      },
    })

    const input = jest.fn()
    wrapper.vm.$on('input', input)

    wrapper.setProps({ value: 0 })
    await wrapper.vm.$nextTick()
    expect(input).toHaveBeenCalledWith(2)

    wrapper.setProps({ value: 5 })
    await wrapper.vm.$nextTick()
    expect(input).toHaveBeenCalledWith(4)
  })

  it('should adjust value if min/max props change', async () => {
    const wrapper = mountFunction({
      propsData: {
        value: 5,
        min: 0,
        max: 10,
      },
    })

    const input = jest.fn()
    wrapper.vm.$on('input', input)

    wrapper.setProps({ min: 6 })
    await wrapper.vm.$nextTick()
    expect(input).toHaveBeenCalledWith(6)

    wrapper.setProps({ max: 4 })
    await wrapper.vm.$nextTick()
    expect(input).toHaveBeenCalledWith(4)
  })

  it('should round value with offset correct', async () => {
    const wrapper = mountFunction({
      propsData: {
        min: 3,
        max: 15,
        step: 3,
      },
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
    const wrapper = mountFunction({
      propsData: {
        value: 50,
      },
    })

    const input = jest.fn()
    wrapper.vm.$on('input', input)

    const slider = wrapper.find('.v-slider__thumb-container')

    slider.trigger('keydown.space')
    expect(input).not.toHaveBeenCalled()
    slider.trigger('keydown.left')
    expect(input).toHaveBeenCalledWith(49)
    slider.trigger('keydown.right')
    expect(input).toHaveBeenCalledWith(50)
    slider.trigger('keydown.home')
    expect(input).toHaveBeenCalledWith(0)
    slider.trigger('keydown.end')
    expect(input).toHaveBeenCalledWith(100)
    slider.trigger('keydown.pagedown')
    expect(input).toHaveBeenCalledWith(90)
    slider.trigger('keydown.pageup')
    expect(input).toHaveBeenCalledWith(100)

    wrapper.setProps({ step: 4 })
    slider.trigger('keydown.pagedown')
    expect(input).toHaveBeenCalledWith(60)
    wrapper.setProps({ step: 2 })
    slider.trigger('keydown.pageup')
    expect(input).toHaveBeenCalledWith(80)
    wrapper.setProps({ max: 1000 })
    slider.trigger('keydown.pageup')
    expect(input).toHaveBeenCalledWith(180)
    slider.trigger('keydown.pagedown')
    wrapper.setProps({ max: 100 })

    slider.trigger('keydown.left', {
      shiftKey: true,
    })
    expect(input).toHaveBeenCalledWith(74)

    slider.trigger('keydown.right', {
      ctrlKey: true,
    })
    expect(input).toHaveBeenCalledWith(78)
    expect(input).toHaveBeenCalledTimes(12)

    wrapper.setProps({ disabled: true })

    slider.trigger('keydown.left')

    expect(input).toHaveBeenCalledTimes(12)

    wrapper.setProps({ disabled: false })
    wrapper.vm.$vuetify.rtl = true

    slider.trigger('keydown.right', {
      shiftKey: true,
    })
    expect(input).toHaveBeenCalledWith(72)
    wrapper.vm.$vuetify.rtl = undefined
  })

  it('should add for to label', () => {
    const wrapper = mountFunction({
      attachToDocument: true,
      attrs: { id: 'foo' },
      propsData: {
        label: 'bar',
      },
    })

    const label = wrapper.find('.v-label')

    expect(label.element.getAttribute('for')).toBe('foo')

    const wrapper2 = mountFunction({
      attachToDocument: true,
      propsData: {
        label: 'bar',
      },
    })

    const label2 = wrapper2.find('.v-label')

    expect(label2.element.getAttribute('for')).toBe(`input-${(wrapper2.vm as any)._uid}`)
  })

  it('should deactivate', async () => {
    const wrapper = mountFunction({
      attachToDocument: true,
    })

    const container = wrapper.find('.v-slider__thumb-container')

    expect(wrapper.vm.isActive).toBe(false)

    container.trigger('mousedown')

    expect(wrapper.vm.isActive).toBe(true)
  })

  it('should react to touch', async () => {
    const wrapper = mountFunction({
      attachToDocument: true,
    })

    const container = wrapper.find('.v-slider__thumb-container')

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
      touches: [],
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.keyPressed).toBe(2)
    expect(wrapper.vm.isActive).toBe(true)
  })

  it('should reset keys pressed', () => {
    const wrapper = mountFunction()

    wrapper.setData({ keyPressed: 5 })

    expect(wrapper.vm.keyPressed).toBe(5)

    wrapper.vm.onKeyUp()

    expect(wrapper.vm.keyPressed).toBe(0)
  })

  it('should return a rounded value', () => {
    const wrapper = mountFunction({
      propsData: { step: 0 },
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

  it('should return a rounded value with offset', async () => {
    const wrapper = mountFunction({
      propsData: { step: 0 },
    })

    expect(wrapper.vm.roundValue(1.234)).toBe(1.234)

    wrapper.setProps({ step: 1 })
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.roundValue(1.234)).toBe(1)

    wrapper.setProps({ step: 4, min: 2 })
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.roundValue(5.667)).toBe(6)
    expect(wrapper.vm.roundValue(7.667)).toBe(6)

    wrapper.setProps({ step: 2.5, min: 5 })
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.roundValue(5.667)).toBe(5)
  })

  it('should return a rounded value bounded by min and max', async () => {
    const wrapper = mountFunction({
      propsData: {
        min: 5,
        max: 10,
      },
    })

    wrapper.setProps({ value: 1 })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.internalValue).toBe(5)

    wrapper.setProps({ value: 15 })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.internalValue).toBe(10)
  })

  it('should not update if value matches lazy value', async () => {
    const wrapper = mountFunction({
      propsData: {
        value: 10,
      },
    })

    const input = jest.fn()
    wrapper.vm.$on('input', input)
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.lazyValue).toBe(10)

    wrapper.vm.internalValue = 15

    expect(input).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.lazyValue).toBe(15)

    wrapper.vm.internalValue = 15

    expect(input).toHaveBeenCalledTimes(1)
  })

  it('should react to input events', async () => {
    const wrapper = mountFunction()
    const focus = jest.fn()
    const blur = jest.fn()

    wrapper.vm.$on('focus', focus)
    wrapper.vm.$on('blur', blur)

    const input = wrapper.find('.v-slider__thumb-container')

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
    const wrapper = mountFunction()

    const change = jest.fn()
    wrapper.vm.$on('change', change)
    const input = wrapper.find('.v-slider')

    input.trigger('click')

    expect(change).toHaveBeenCalledTimes(1)
  })

  it('should keep thumb-label when focused and clicked', async () => {
    const onBlur = jest.fn()
    const wrapper = mountFunction({
      propsData: {
        thumbLabel: true,
      },
    })

    const input = wrapper.find('.v-slider__thumb-container')
    const thumb = wrapper.find('.v-slider__thumb-container')

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

  it('should reverse label location when inverse', async () => {
    const wrapper = mountFunction({
      propsData: { label: 'foo' },
    })

    expect(wrapper.html()).toMatchSnapshot()

    wrapper.setProps({ inverseLabel: true })
    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should change track styles in rtl', async () => {
    const wrapper = mountFunction()

    expect(wrapper.html()).toMatchSnapshot()

    wrapper.setProps({ value: 50 })
    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()

    wrapper.setProps({ disabled: true })
    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()

    wrapper.vm.$vuetify.rtl = true
    wrapper.setProps({ value: 0, disabled: false })
    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()

    wrapper.setProps({ value: 50 })
    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()

    wrapper.setProps({ disabled: true })
    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should display label and have different aria-label', () => {
    const wrapper = mountFunction({
      propsData: { label: 'foo' },
      attrs: { 'aria-label': 'bar' },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should display tick labels', () => {
    const wrapper = mountFunction({
      propsData: {
        max: 1,
        tickLabels: ['foo', 'bar'],
      },
    })

    const ticks = wrapper.findAll('.v-slider__tick')

    expect(ticks).toHaveLength(2)
    expect((ticks.at(0).element.firstChild as HTMLElement).innerHTML).toBe('foo')
    expect((ticks.at(1).element.firstChild as HTMLElement).innerHTML).toBe('bar')
  })

  it('should not react to keydown if disabled', () => {
    const parseKeyDown = jest.fn()
    const wrapper = mountFunction({
      propsData: { disabled: true },
      methods: { parseKeyDown },
    })

    const input = wrapper.find('.v-slider__thumb-container')

    input.trigger('keydown.right')

    expect(parseKeyDown).not.toHaveBeenCalled()

    wrapper.setProps({
      disabled: false,
      readonly: true,
    })

    input.trigger('keydown.right')

    expect(parseKeyDown).not.toHaveBeenCalled()

    wrapper.setProps({
      disabled: false,
      readonly: false,
    })

    input.trigger('keydown.right')

    expect(parseKeyDown).toHaveBeenCalled()
  })

  it('should set value to min value if given a NaN value', () => {
    const input = jest.fn()
    const wrapper = mountFunction({
      propsData: {
        min: -20,
        max: 20,
        value: NaN,
      },
      listeners: {
        input,
      },
    })

    expect(wrapper.vm.internalValue).toBe(-20)
  })

  it('should correctly handle initial value of zero (#7320)', () => {
    const input = jest.fn()
    const wrapper = mountFunction({
      propsData: {
        min: -20,
        max: 20,
        value: 0,
      },
      listeners: {
        input,
      },
    })

    expect(input).not.toHaveBeenCalledWith(-20)
    expect(wrapper.html()).toMatchSnapshot()
  })

  // TODO: this fails without sync, nextTick doesn't help
  // https://github.com/vuejs/vue-test-utils/issues/1130
  it.skip('should correctly handle setting value to zero (#7320)', async () => {
    const input = jest.fn()
    const wrapper = mountFunction({
      propsData: {
        min: -20,
        max: 20,
        value: 10,
      },
      listeners: {
        input,
      },
    })

    wrapper.setProps({
      value: 0,
    })
    await wrapper.vm.$nextTick()

    expect(input).not.toHaveBeenCalledWith(-20)
    expect(wrapper.html()).toMatchSnapshot()
  })

  // https://github.com/vuetifyjs/vuetify/issues/10018
  it('should not fire event if value is provided and valid', async () => {
    const input = jest.fn()
    mountFunction({
      propsData: { value: 10, min: -20 },
      listeners: { input },
    })

    expect(input).not.toHaveBeenCalled()

    // Should set to min value if invalid
    mountFunction({
      propsData: { value: NaN, min: -20 },
      listeners: { input },
    })

    expect(input).toHaveBeenCalledWith(-20)
  })
})
