import { test } from '@/test'
import VSystemBar from '@/components/VSystemBar'

test('VSystemBar.vue', ({ mount }) => {
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

    expect(wrapper.element.classList).toContain('v-system-bar--fixed')
  })

  it('should render system bar with absolute prop', () => {
    const wrapper = mount(VSystemBar, {
      propsData: {
        absolute: true
      }
    })

    expect(wrapper.element.classList).toContain('v-system-bar--absolute')
  })

  it('should update height when window prop change', async () => {
    const wrapper = mount(VSystemBar, {
      propsData: {
        app: true
      }
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

  it('should warn for improper height', () => {
    const wrapper = mount(VSystemBar, {
      propsData: {
        height: 'foo'
      }
    })

    expect('custom validator check failed for prop "height"').toHaveBeenWarned()
  })
})
