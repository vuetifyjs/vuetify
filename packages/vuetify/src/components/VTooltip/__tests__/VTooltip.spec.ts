import VTooltip from '../VTooltip'
import {
  mount,
} from '@vue/test-utils'

describe('VTooltip', () => {
  type Instance = ExtractVue<typeof VTooltip>
  let mountFunction: (options?: object) => Wrapper<Instance>

  beforeEach(() => {
    document.body.setAttribute('data-app', 'true')

    mountFunction = (options = {}) => {
      return mount(VTooltip, options)
    }
  })

  it('should render component and match snapshot', async () => {
    const wrapper = mountFunction({
      propsData: {
        openDelay: 0,
      },
      scopedSlots: {
        activator: '<span>activator</span>',
      },
      slots: {
        default: '<span>content</span>',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()

    wrapper.setProps({
      value: true,
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with custom eager and match snapshot', () => {
    const wrapper = mountFunction({
      propsData: {
        eager: true,
      },
      scopedSlots: {
        activator: '<span>activator</span>',
      },
      slots: {
        default: '<span>content</span>',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with value=true and match snapshot', async () => {
    const wrapper = mountFunction({
      propsData: {
        value: true,
      },
      scopedSlots: {
        activator: '<span>activator</span>',
      },
      slots: {
        default: '<span>content</span>',
      },
    })

    expect(wrapper.vm.isActive).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with min/max width and match snapshot', async () => {
    const wrapper = mountFunction({
      propsData: {
        value: true,
        minWidth: 100,
        maxWidth: 200,
      },
      scopedSlots: {
        activator: '<span>activator</span>',
      },
      slots: {
        default: '<span>content</span>',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with zIndex prop and match snapshot', async () => {
    const wrapper = mountFunction({
      propsData: {
        zIndex: 42,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should display tooltip after mouseenter and hide after mouseleave', async () => {
    jest.useFakeTimers()
    const wrapper = mountFunction({
      propsData: {
        openDelay: 123,
        closeDelay: 321,
      },
      scopedSlots: {
        activator: '<span v-on="props.on" class="activator">activator</span>',
      },
      slots: {
        default: '<span class="content">content</span>',
      },
    })

    const activator = wrapper.find('.activator')
    const cb = jest.fn()
    wrapper.vm.$on('input', cb)

    activator.trigger('mouseenter')
    jest.runAllTimers()
    await wrapper.vm.$nextTick()
    expect((setTimeout as any).mock.calls[0][1]).toBe(123)
    expect(cb).toHaveBeenCalledWith(true)

    activator.trigger('mouseleave')
    jest.runAllTimers()
    await wrapper.vm.$nextTick()
    expect((setTimeout as any).mock.calls[1][1]).toBe(321)
    expect(cb).toHaveBeenCalledWith(false)
  })
})
