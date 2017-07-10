import { test } from '~util/testing'
import { createRenderer } from 'vue-server-renderer'
import Vue from 'vue/dist/vue.common'
import Vuetify from 'src/index'
import Alert from 'src/components/alerts/Alert'
import Icon from 'src/components/icons/Icon'

Alert.components = { 'v-icon': Icon }

test('Alert.vue', ({ mount }) => {
  it('should have an alert class', () => {
    const wrapper = mount(Alert)

    expect(wrapper.hasClass('alert')).toBe(true)
  })

  it('should have a close icon', () => {
    const wrapper = mount(Alert)
    wrapper.setProps({ dismissible: true })

    expect(wrapper.contains('.alert__dismissible')).toBe(true)
  })

  it('should be closed by default', () => {
    const wrapper = mount(Alert)

    expect(wrapper.data().isActive).toBe(false)
  })

  it('should emit input:false when close icon is clicked', () => {
    const wrapper = mount(Alert, {
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
  })

  it('should not be visible after being dismissed', done => {
    const wrapper = mount(Alert, {
      propsData: {
        value: true,
        dismissible: true
      }
    })

    wrapper.vm.$on('input', (val) => {
      wrapper.setProps({
        'value': false
      })
      wrapper.update()

      wrapper.vm.$nextTick(() => {
        expect(wrapper.hasStyle('display', 'none')).toBe(true)
        done()
      })
    })

    const icon = wrapper.find('.alert__dismissible')[0]
    icon.trigger('click')
  })

  it('should have a custom icon', () => {
    const wrapper = mount(Alert, {
      propsData: {
        value: true,
        icon: 'list'
      }
    })

    const icon = wrapper.find('.alert__icon')[0]

    expect(icon.text()).toBe('list')
  })

  it('should have no icon', () => {
    const wrapper = mount(Alert, {
      propsData: {
        success: true,
        hideIcon: true
      }
    })

    expect(wrapper.contains('.icon')).toBe(false)
  })
})
