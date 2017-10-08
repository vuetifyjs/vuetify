import { test } from '~util/testing'
import { mount } from 'avoriaz'
import VSystemBar from '~components/VSystemBar'

test('VSystemBar.vue', () => {
  it('should render a colored toolbar', () => {
    const wrapper = mount(VSystemBar, {
      propsData: {
        color: 'blue lighten-1'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
