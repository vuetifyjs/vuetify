import { test } from '@/test'
import VAlert from '@/components/VAlert'

test('VAlert.vue', ({ mount }) => {
  it('should be closed by default', () => {
    const wrapper = mount(VAlert)

    expect(wrapper.vm.isActive).toBe(false)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should have a close icon', () => {
    const wrapper = mount(VAlert, {
      propsData: { dismissible: true }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with transition', async () => {
    const wrapper = mount(VAlert, {
      propsData: { transition: 'foo' }
    })

    wrapper.setProps({ value: true })
    await wrapper.vm.$nextTick()
    expect(wrapper.hasClass('foo-enter')).toBe(true)
  })

  it('should render component with outline prop', () => {
    const wrapper = mount(VAlert, {
      propsData: { outline: true }
    })

    expect(wrapper.hasClass('v-alert--outline')).toBe(true)
  })

  it('should be dismissible', async () => {
    const wrapper = mount(VAlert, {
      propsData: {
        value: true,
        dismissible: true
      }
    })

    const btn = wrapper.first('.v-alert__dismissible .v-btn')

    const input = jest.fn(value => wrapper.setProps({ value }))
    wrapper.vm.$on('input', input)

    btn.trigger('click')

    await wrapper.vm.$nextTick()

    expect(input).toBeCalledWith(false)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should have a custom icon', () => {
    const wrapper = mount(VAlert, {
      propsData: {
        value: true,
        icon: 'list'
      }
    })

    const icon = wrapper.first('.v-icon')

    expect(icon.text()).toBe('list')
  })

  it('should have no icon', () => {
    const wrapper = mount(VAlert)

    expect(wrapper.contains('.v-icon')).toBe(false)
  })

  it('should display contextual colors by type', async () => {
    const wrapper = mount(VAlert, {
      propsData: {
        type: 'error'
      }
    })

    expect(wrapper.vm.computedColor).toBe('error')

    wrapper.setProps({ 'type': 'success' })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.computedColor).toBe('success')

    wrapper.setProps({ 'type': 'warning' })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.computedColor).toBe('warning')

    wrapper.setProps({ 'type': 'info' })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.computedColor).toBe('info')
  })

  it('should allow overriding color for contextual alert', () => {
    const wrapper = mount(VAlert, {
      propsData: {
        type: 'error',
        color: 'primary'
      }
    })

    expect(wrapper.vm.computedColor).toBe('primary')
  })

  it('should allow overriding icon for contextual alert', () => {
    const wrapper = mount(VAlert, {
      propsData: {
        type: 'error',
        icon: 'block'
      }
    })

    const icon = wrapper.first('.v-icon')

    expect(icon.text()).toBe('block')
  })

  it('should return a custom isDark', () => {
    const wrapper = mount(VAlert)

    expect(wrapper.vm.isDark).toBe(false)

    wrapper.setProps({ type: 'info' })

    expect(wrapper.vm.isDark).toBe(true)

    wrapper.setProps({
      color: 'blue' ,
      type: undefined
    })

    expect(wrapper.vm.isDark).toBe(true)

    wrapper.setProps({
      color: undefined,
      light: true
    })

    expect(wrapper.vm.isDark).toBe(false)
  })
})
