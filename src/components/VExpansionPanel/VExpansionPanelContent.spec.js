import { test } from '~util/testing'
import VExpansionPanelContent from './VExpansionPanelContent'

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
