import { mount } from 'avoriaz'
import VDivider from '~components/VDivider'
import { test, functionalContext } from '~util/testing'

test('VDivider.js', () => {
  it('should render component and match snapshot', () => {
    const wrapper = mount(VDivider, functionalContext())

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render an inset component and match snapshot', () => {
    const wrapper = mount(VDivider, functionalContext({
      propsData: {
        inset: true
      }
    }))

    expect(wrapper.html()).toMatchSnapshot()
  })
})
