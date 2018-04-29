import VTooltip from '@/components/VTooltip'
import { test } from '@/test'

test('VTooltip.js', ({ mount, compileToFunctions }) => {
  it('should render component and match snapshot', async () => {
    const wrapper = mount(VTooltip, {
      propsData: {
        openDelay: 0
      },
      slots: {
        activator: [compileToFunctions('<span>activator</span>')],
        default: [compileToFunctions('<span>content</span>')]
      }
    })

    expect(wrapper.html()).toMatchSnapshot()

    wrapper.setProps({
      value: true
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.html()).toMatchSnapshot()

    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })

  it('should render component with custom lazy and match snapshot', () => {
    const wrapper = mount(VTooltip, {
      propsData: {
        lazy: true
      },
      slots: {
        activator: [compileToFunctions('<span>activator</span>')],
        default: [compileToFunctions('<span>content</span>')]
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with value=true and match snapshot', async () => {
    const wrapper = mount(VTooltip, {
      propsData: {
        value: true
      },
      slots: {
        activator: [compileToFunctions('<span>activator</span>')],
        default: [compileToFunctions('<span>content</span>')]
      }
    })

    expect(wrapper.data().isActive).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })

  it('should render component with zIndex prop and match snapshot', async () => {
    const wrapper = mount(VTooltip, {
      propsData: {
        zIndex: 42
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })

  it('should display tooltip after mouseenter and hide after mouseleave', async () => {
    jest.useFakeTimers()
    const wrapper = mount(VTooltip, {
      propsData: {
        openDelay: 123,
        closeDelay: 321
      },
      slots: {
        activator: [compileToFunctions('<span>activator</span>')],
        default: [compileToFunctions('<span>content</span>')]
      }
    })

    const activator = wrapper.find('.v-tooltip__content + span')[0]
    const cb = jest.fn()
    wrapper.instance().$on('input', cb)

    activator.trigger('mouseenter')
    jest.runAllTimers()
    await wrapper.vm.$nextTick()
    expect(setTimeout.mock.calls).toHaveLength(1)
    expect(setTimeout.mock.calls[0][1]).toBe(123)
    expect(cb).toBeCalledWith(true)

    activator.trigger('mouseleave')
    jest.runAllTimers()
    await wrapper.vm.$nextTick()
    expect(setTimeout.mock.calls).toHaveLength(2)
    expect(setTimeout.mock.calls[1][1]).toBe(321)
    expect(cb).toBeCalledWith(false)

    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })
})
