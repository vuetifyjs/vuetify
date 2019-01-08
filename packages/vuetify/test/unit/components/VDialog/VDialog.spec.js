import VDialog from '@/components/VDialog'
import { test } from '@/test'

test('VDialog.js', ({ mount, compileToFunctions }) => {
  it('should render component and match snapshot', () => {
    const wrapper = mount(VDialog)

    expect(wrapper.html()).toMatchSnapshot()
    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })

  it('should render a disabled component and match snapshot', () => {
    const wrapper = mount(VDialog, {
      propsData: {
        disabled: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })

  it('should render a persistent component and match snapshot', () => {
    const wrapper = mount(VDialog, {
      propsData: {
        persistent: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })

  it('should render a fullscreen component and match snapshot', () => {
    const wrapper = mount(VDialog, {
      propsData: {
        fullscreen: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })

  it('should render a lazy component and match snapshot', () => {
    const wrapper = mount(VDialog, {
      propsData: {
        lazy: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render a scrollable component and match snapshot', () => {
    const wrapper = mount(VDialog, {
      propsData: {
        scrollable: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })

  it('should render component with custom origin and match snapshot', () => {
    const wrapper = mount(VDialog, {
      propsData: {
        origin: 'top right'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })

  it('should render component with custom width (max-width) and match snapshot', () => {
    const wrapper = mount(VDialog, {
      propsData: {
        maxWidth: 100
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })

  it('should render component with custom width and match snapshot', () => {
    const wrapper = mount(VDialog, {
      propsData: {
        width: '50%'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })

  it('should render component with custom transition and match snapshot', () => {
    const wrapper = mount(VDialog, {
      propsData: {
        transition: 'fade-transition'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })

  it('should open dialog on activator click', async () => {
    const input = jest.fn()
    const wrapper = mount(VDialog, {
      slots: {
        activator: [compileToFunctions('<span>activator</span>')]
      }
    })

    wrapper.vm.$on('input', input)

    expect(wrapper.vm.isActive).toBe(false)
    wrapper.find('.v-dialog__activator')[0].trigger('click')
    expect(wrapper.vm.isActive).toBe(true)
    await wrapper.vm.$nextTick()
    expect(input).toBeCalledWith(true)

    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })

  it('not should open disabed dialog on activator click', async () => {
    const input = jest.fn()
    const wrapper = mount(VDialog, {
      propsData: {
        disabled: true
      },
      slots: {
        activator: [compileToFunctions('<span>activator</span>')]
      }
    })

    wrapper.vm.$on('input', input)

    expect(wrapper.vm.isActive).toBe(false)
    wrapper.find('.v-dialog__activator')[0].trigger('click')
    expect(wrapper.vm.isActive).toBe(false)
    await wrapper.vm.$nextTick()
    expect(input).not.toBeCalled()

    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })

  it('not change state on v-model update', async () => {
    const wrapper = mount(VDialog, {
      propsData: {
        value: false
      },
      slots: {
        activator: [compileToFunctions('<span>activator</span>')]
      }
    })

    expect(wrapper.vm.isActive).toBe(false)

    wrapper.setProps({
      value: true
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.isActive).toBe(true)

    wrapper.setProps({
      value: false
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.isActive).toBe(false)

    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })

  it('should emit keydown event', async () => {
    const keydown = jest.fn()
    const component = {
      render: h => h(VDialog, {
        props: {
          value: true
        },
        on: {
          keydown
        }
      })
    }
    const wrapper = mount(component)

    await wrapper.vm.$nextTick()
    window.dispatchEvent(new Event('keydown'))
    expect(keydown).toBeCalled()

    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })

  // https://github.com/vuetifyjs/vuetify/issues/3101
  it('should always remove scrollbar when fullscreen', async () => {
    const wrapper = mount(VDialog)

    wrapper.setProps({ value: true })

    await wrapper.vm.$nextTick()

    expect(document.documentElement.className).not.toContain('overflow-y-hidden')

    wrapper.setProps({ fullscreen: true })

    await wrapper.vm.$nextTick()

    expect(document.documentElement.className).toContain('overflow-y-hidden')

    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })

  it('should not attach event handlers to the activator container if disabled', async () => {
    const wrapper = mount(VDialog, {
      propsData: {
        disabled: true
      },
      slots: {
        activator: [compileToFunctions('<button></button>')]
      }
    })

    const activator = wrapper.find('.v-dialog__activator')[0]
    expect(Object.keys(activator.vNode.data.on)).toHaveLength(0)

    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })
})
