import VSpeedDial from '~components/buttons/VSpeedDial'
import clickOutside from '~directives/click-outside'
import { test } from '~util/testing'

VSpeedDial.directives = {
  clickOutside
}

test('VSpeedDial.js', ({ mount }) => {
  it('should render component and match snapshot', () => {
    const wrapper = mount(VSpeedDial)

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with custom transition and match snapshot', () => {
    const wrapper = mount(VSpeedDial, {
      propsData: {
        transition: 'dialog-transition'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with custom direction and match snapshot', () => {
    const wrapper = mount(VSpeedDial, {
      propsData: {
        direction: 'right'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
