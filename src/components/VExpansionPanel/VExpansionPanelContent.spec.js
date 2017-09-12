import { test } from '~util/testing'
import VExpansionPanelContent from './VExpansionPanelContent'

// TODO: Fix when next Vue release goes live
test.skip('VExpansionPanelContent.js', ({ mount }) => {
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

  it('should render an expanded component with lazy prop and match snapshot', () => {
    const wrapper = mount(VExpansionPanelContent, {
      propsData: {
        lazy: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
