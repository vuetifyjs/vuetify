import { test } from '~util/testing'
import VAlert from '~components/VAlert'
import VIcon from '~components/VIcon'

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

  it('should be dismissible', async () => {
    const wrapper = mount(VAlert, {
      propsData: {
        value: true,
        dismissible: true
      }
    })

    const icon = wrapper.find('.alert__dismissible')[0]

    const input = jest.fn(value => wrapper.setProps({ value }))
    wrapper.vm.$on('input', input)

    icon.trigger('click')
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

    const icon = wrapper.find('.alert__icon')[0]

    expect(icon.text()).toBe('list')
  })

  it('should have no icon', () => {
    const wrapper = mount(VAlert, {
      propsData: {
        hideIcon: true
      }
    })

    expect(wrapper.contains('.icon')).toBe(false)
  })
})
