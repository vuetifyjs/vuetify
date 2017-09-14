import { test } from '~util/testing'
import VFooter from './VFooter'

test('VFooter.js', ({ mount, functionalContext }) => {
  it('should render component and match snapshot', () => {
    const wrapper = mount(VFooter)

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render an absolute positioned component and match snapshot', () => {
    const wrapper = mount(VFooter, {
      propsData: {
        absolute: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render a fixed positioned component and match snapshot', () => {
    const wrapper = mount(VFooter, {
      propsData: {
        fixed: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render a fixed and absolute positioned and match snapshot', () => {
    const wrapper = mount(VFooter, {
      propsData: {
        absolute: true,
        fixed: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
