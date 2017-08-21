import { test } from '~util/testing'
import VAlert from '~components/VAlert'
import VIcon from '~components/VIcon'

VAlert.components = { VIcon }

test('VAlert.vue', ({ mount }) => {
  it('should have an alert class', () => {
    const wrapper = mount(VAlert)

    expect(wrapper.hasClass('alert')).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should have a close icon', () => {
    const wrapper = mount(VAlert)
    wrapper.setProps({ dismissible: true })

    expect(wrapper.contains('.alert__dismissible')).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should be closed by default', () => {
    const wrapper = mount(VAlert)

    expect(wrapper.data().isActive).toBe(false)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should emit input:false when close icon is clicked', () => {
    const wrapper = mount(VAlert, {
      propsData: {
        value: true,
        dismissible: true
      }
    })
    const icon = wrapper.find('.alert__dismissible')[0]
    const input = jest.fn()
    wrapper.instance().$on('input', input)
    icon.trigger('click')

    expect(input).toBeCalledWith(false)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should not be visible after being dismissed', done => {
    const wrapper = mount(VAlert, {
      propsData: {
        value: true,
        dismissible: true
      }
    })

    wrapper.vm.$on('input', (val) => {
      wrapper.setProps({
        value: false
      })
      wrapper.update()

      wrapper.vm.$nextTick(() => {
        expect(wrapper.hasStyle('display', 'none')).toBe(true)
        done()
      })
    })

    const icon = wrapper.find('.alert__dismissible')[0]
    icon.trigger('click')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should have a custom icon', () => {
    const wrapper = mount(VAlert, {
      propsData: {
        value: true,
        icon: 'list'
      }
    })

    const icon = wrapper.find('.alert__icon')[0]

    expect(icon.text()).toBe('list')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should have no icon', () => {
    const wrapper = mount(VAlert, {
      propsData: {
        success: true,
        hideIcon: true
      }
    })

    expect(wrapper.contains('.icon')).toBe(false)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
