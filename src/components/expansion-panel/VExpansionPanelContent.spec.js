import { test } from '~util/testing'
import VExpansionPanelContent from '~components/expansion-panel/VExpansionPanelContent'
import { ripple } from '~directives/ripple'
import clickOutside from '~directives/click-outside'

VExpansionPanelContent.directives = {
  ripple,
  clickOutside
}

test('VExpansionPanelContent.js', ({ mount }) => {
  it('should render component and match snapshot', () => {
    const wrapper = mount(VExpansionPanelContent)

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render an expanded component and match snapshot', () => {
    const wrapper = mount(VExpansionPanelContent, {
      propsData: {
        ripple: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
