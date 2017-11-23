import { mount } from 'avoriaz'
import VDivider from '~components/VDivider'
import { test, functionalContext } from '~util/testing'

test('VDivider.js', () => {
  it('should render component and match snapshot', () => {
    const wrapper = mount(VDivider, functionalContext())

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render an inset component', () => {
    const wrapper = mount(VDivider, functionalContext({
      props: {
        inset: true
      }
    }))

    expect(wrapper.hasClass('divider--inset')).toBe(true)
  })

  it('should render a light component', () => {
    const wrapper = mount(VDivider, functionalContext({
      props: {
        light: true
      }
    }))

    expect(wrapper.hasClass('theme--light')).toBe(true)
  })

  it('should render a dark component', () => {
    const wrapper = mount(VDivider, functionalContext({
      props: {
        dark: true
      }
    }))

    expect(wrapper.hasClass('theme--dark')).toBe(true)
  })
})
