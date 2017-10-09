import { test } from '~util/testing'
import { mount } from 'avoriaz'
import VToolbar from '~components/VToolbar'

test('VToolbar.vue', () => {
  it('should render a colored toolbar', () => {
    const wrapper = mount(VToolbar, {
      propsData: {
        color: 'blue lighten-1'
      }
    })

    expect(wrapper.element.classList).toContain('blue')
    expect(wrapper.element.classList).toContain('lighten-1')
  })
})
