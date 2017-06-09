import { mount } from 'avoriaz'
import { createRenderer } from 'vue-server-renderer'
import Vue from 'vue/dist/vue.common'
import Vuetify from 'src/index'
import Alert from 'src/components/alerts/Alert'
import Icon from 'src/components/icons/Icon'

Alert.components = { 'v-icon': Icon }
Vue.use(Vuetify)

describe('Alert.vue', () => {
  it('should have an alert class', () => {
    const wrapper = mount(Alert)

    expect(wrapper.hasClass('alert')).toBe(true)
  })

  it('should render correct contents', () => {
    const wrapper = mount(Alert)
    const renderer = createRenderer()

    renderer.renderToString(wrapper.vm, (err, str) => {
      expect(str).toMatchSnapshot()
    })
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

  it('should close when close icon is clicked', () => {
    let isActive = true
    const wrapper = mount(Alert, {
      propsData: {
        value: isActive,
        dismissible: true
      }
    })
    const icon = wrapper.find('.alert__dismissible')[0]
    icon.dispatch('click')

    expect(isActive).toBe(false)
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
