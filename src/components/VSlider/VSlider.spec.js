import { test } from '~util/testing'
import VSlider from './VSlider'

const warning = 'The v-slider component requires the presence of v-app or a non-body wrapping element with the [data-app] attribute.'

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

    expect(wrapper.element.getAttribute('tabindex')).toBe('-1')
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

    const keydown = keyCode => {
      const eventObject = document.createEvent('Event')
      eventObject.initEvent('keydown', true, true)
      eventObject.keyCode = keyCode
      wrapper.element.dispatchEvent(eventObject)
    }

    const input = jest.fn()
    wrapper.vm.$on('input', input)

    keydown(32) // space
    expect(input).not.toBeCalled()
    keydown(37) // left
    expect(input).toBeCalledWith(49)
    keydown(39) // right
    expect(input).toBeCalledWith(51)
    keydown(36) // home
    expect(input).toBeCalledWith(0)
    keydown(35) // end
    expect(input).toBeCalledWith(100)
    keydown(33) // pageUp
    expect(input).toBeCalledWith(40)
    keydown(34) // pageDown
    expect(input).toBeCalledWith(60)

    expect(warning).toHaveBeenTipped()
  })
})
