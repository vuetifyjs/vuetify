import { test } from '@/test'
import VAlert from '@/components/VAlert'
import VIcon from '@/components/VIcon'

test('VAlert.vue', ({ mount }) => {
  it('should be closed by default', async () => {
    const wrapper = mount(VAlert)

    expect(wrapper.vm.isActive).toBe(false)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should have a close icon', async () => {
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

  it('should render component with outline prop', async () => {
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

    const icon = wrapper.find('.v-alert__dismissible')[0]

    const input = jest.fn(value => wrapper.setProps({ value }))
    wrapper.vm.$on('input', input)

    icon.trigger('click')

    await wrapper.vm.$nextTick()

    expect(input).toBeCalledWith(false)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should have a custom icon', async () => {
    const wrapper = mount(VAlert, {
      propsData: {
        value: true,
        icon: 'list'
      }
    })

    const icon = wrapper.find('.v-alert__icon')[0]

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

  it('should allow overriding color for contextual alert', async () => {
    const wrapper = mount(VAlert, {
      propsData: {
        type: 'error',
        color: 'primary'
      }
    })

    expect(wrapper.vm.computedColor).toBe('primary')
  })

  it('should allow overriding icon for contextual alert', async () => {
    const wrapper = mount(VAlert, {
      propsData: {
        type: 'error',
        icon: 'block'
      }
    })

    const icon = wrapper.find('.v-alert__icon')[0]

    expect(icon.text()).toBe('block')
  })
})
