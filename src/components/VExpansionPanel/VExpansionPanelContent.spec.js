import { test } from '~util/testing'
import { mount } from 'avoriaz'
import VExpansionPanelContent from './VExpansionPanelContent'

// TODO: Fix when Vue has optional injects
test.skip('VExpansionPanelContent.js', () => {
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
