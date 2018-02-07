import VDialog from '@/components/VDialog'
import VDialogContent from '@/components/VDialog/VDialogContent'
import { test } from '@/test'

test('VDialog', ({ mount, compileToFunctions, functionalContext }) => {
  it('should render component and match snapshot', () => {
    const wrapper = mount(VDialog, functionalContext())

    expect(wrapper.html()).toMatchSnapshot()
    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })

  it('should render a disabled component and match snapshot', () => {
    const wrapper = mount(VDialog, functionalContext({
      props: {
        disabled: true
      }
    }))

    expect(wrapper.html()).toMatchSnapshot()
    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })

  it('should render a persistent component and match snapshot', () => {
    const wrapper = mount(VDialog, functionalContext({
      props: {
        persistent: true
      }
    }))

    expect(wrapper.html()).toMatchSnapshot()
    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })

  it('should render a fullscreen component and match snapshot', () => {
    const wrapper = mount(VDialog, functionalContext({
      props: {
        fullscreen: true
      }
    }))

    expect(wrapper.html()).toMatchSnapshot()
    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })

  it('should render a lazy component and match snapshot', () => {
    const wrapper = mount(VDialog, functionalContext({
      props: {
        lazy: true
      }
    }))

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render a scrollable component and match snapshot', () => {
    const wrapper = mount(VDialog, functionalContext({
      props: {
        scrollable: true
      }
    }))

    expect(wrapper.html()).toMatchSnapshot()
    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })

  it('should render component with custom origin and match snapshot', () => {
    const wrapper = mount(VDialog, functionalContext({
      props: {
        origin: 'top right'
      }
    }))

    expect(wrapper.html()).toMatchSnapshot()
    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })

  it('should render component with custom width (max-width) and match snapshot', () => {
    const wrapper = mount(VDialog, functionalContext({
      props: {
        maxWidth: 100
      }
    }))

    expect(wrapper.html()).toMatchSnapshot()
    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })

  it('should render component with custom width and match snapshot', () => {
    const wrapper = mount(VDialog, functionalContext({
      props: {
        width: '50%'
      }
    }))

    expect(wrapper.html()).toMatchSnapshot()
    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })

  it('should render component with custom transition and match snapshot', () => {
    const wrapper = mount(VDialog, functionalContext({
      props: {
        transition: 'fade-transition'
      }
    }))

    expect(wrapper.html()).toMatchSnapshot()
    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })

  it('should open dialog on activator click', async () => {
    const input = jest.fn()
    const component = {
      render (h) {
        return h('div', [h(
          VDialog,
          { on: { input } },
          [h('span', { slot: 'activator', staticClass: 'dialog__activator' }, 'activator')]
        )])
      }
    }
    const wrapper = mount(component)
    const content = wrapper.find(VDialogContent)[0]

    expect(content.vm.isActive).toBe(false)
    wrapper.find('.v-dialog__activator')[0].trigger('click')
    expect(content.vm.isActive).toBe(true)
    await wrapper.vm.$nextTick()
    expect(input).toBeCalledWith(true)

    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })

  it('should not open disabled dialog on activator click', async () => {
    const input = jest.fn()
    const component = {
      render (h) {
        return h('div', [h(
          VDialog,
          {
            on: { input },
            props: { disabled: true }
          },
          [h('span', { slot: 'activator', staticClass: 'dialog__activator' }, 'activator')]
        )])
      }
    }
    const wrapper = mount(component)
    const content = wrapper.find(VDialogContent)[0]

    expect(content.vm.isActive).toBe(false)
    wrapper.find('.v-dialog__activator')[0].trigger('click')
    expect(content.vm.isActive).toBe(false)
    await wrapper.vm.$nextTick()
    expect(input).not.toBeCalled()

    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })

  it('should not change state on v-model update', async () => {
    const input = jest.fn()
    const component = {
      props: { value: Boolean },
      render (h) {
        return h('div', [h(
          VDialog,
          {
            on: { input },
            props: { value: this.value }
          },
          [h('span', { slot: 'activator', staticClass: 'dialog__activator' }, 'activator')]
        )])
      }
    }
    const wrapper = mount(component)
    const content = wrapper.find(VDialogContent)[0]

    expect(content.vm.isActive).toBe(false)

    wrapper.setProps({
      value: true
    })
    await wrapper.vm.$nextTick()
    expect(content.vm.isActive).toBe(true)

    wrapper.setProps({
      value: false
    })
    await wrapper.vm.$nextTick()
    expect(content.vm.isActive).toBe(false)

    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })

  it('should emit keydown event', async () => {
    const keydown = jest.fn()
    mount({
      render: h => h(VDialog, {
        props: { value: true },
        on: { keydown }
      })
    })

    window.dispatchEvent(new Event('keydown'))
    expect(keydown).toBeCalled()

    expect('Unable to locate target [data-app]').toHaveBeenTipped()
  })
})
