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
})
