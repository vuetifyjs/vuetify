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

  it('should render system bar with app prop', () => {
    const wrapper = mount(VSystemBar, {
      propsData: {
        app: true
      }
    })

    expect(`Cannot set property 'bar' of undefined`).toHaveBeenWarned()
    expect(wrapper.element.classList).toContain('system-bar--fixed')
  })
})
