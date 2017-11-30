import { test } from '~util/testing'
import { mount } from 'avoriaz'
import VSystemBar from '~components/VSystemBar'

test('VSystemBar.vue', () => {
  it('should render a colored system bar', () => {
    const wrapper = mount(VSystemBar, {
      propsData: {
        color: 'blue lighten-1'
      }
    })

    expect(wrapper.element.classList).toContain('blue')
    expect(wrapper.element.classList).toContain('lighten-1')
  })

  it('should render system bar with fixed prop', () => {
    const wrapper = mount(VSystemBar, {
      propsData: {
        fixed: true
      }
    })

    expect(wrapper.element.classList).toContain('system-bar--fixed')
  })

  it('should render system bar with absolute prop', () => {
    const wrapper = mount(VSystemBar, {
      propsData: {
        absolute: true
      }
    })

    expect(wrapper.element.classList).toContain('system-bar--absolute')
  })

  it('should update height when window prop change', async () => {
    const wrapper = mount(VSystemBar, {
      propsData: {
        app: true
      }
    })

    expect(wrapper.vm.$vuetify.application.bar).toBe(0)

    wrapper.setProps({
      fixed: false,
      absolute: true
    })
    expect(wrapper.vm.$vuetify.application.bar).toBe(24)

    wrapper.setProps({
      fixed: true,
      absolute: false
    })
    expect(wrapper.vm.$vuetify.application.bar).toBe(24)

    wrapper.setProps({
      window: true
    })
    expect(wrapper.vm.$vuetify.application.bar).toBe(32)

    wrapper.setProps({
      height: 90
    })
    expect(wrapper.vm.$vuetify.application.bar).toBe(90)
  })
})
