import { test } from '~util/testing'
import VExpansionPanel from '~components/VExpansionPanel'

// TODO: Fix when next Vue release goes live
test.skip('VExpansionPanel.js', ({ mount }) => {
  it('should render component and match snapshot', () => {
    const wrapper = mount(VExpansionPanel)

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render an expanded component and match snapshot', () => {
    const wrapper = mount(VExpansionPanel, {
      propsData: {
        expand: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
