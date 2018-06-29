import VDivider from '@/components/VDivider'
import { test } from '@/test'

test('VDivider.js', ({ mount, compileToFunctions, functionalContext }) => {
  it('should render component and match snapshot', () => {
    const wrapper = mount(VDivider, functionalContext())

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render an inset component', () => {
    const wrapper = mount(VDivider, functionalContext({
      props: { inset: true }
    }))

    expect(wrapper.hasClass('v-divider--inset')).toBe(true)
  })

  it('should render a light component', () => {
    const wrapper = mount(VDivider, functionalContext({
      props: { light: true }
    }))

    expect(wrapper.hasClass('theme--light')).toBe(true)
  })

  it('should render a dark component', () => {
    const wrapper = mount(VDivider, functionalContext({
      props: { dark: true }
    }))

    expect(wrapper.hasClass('theme--dark')).toBe(true)
  })

  it('should render a dark component', () => {
    const wrapper = mount(VDivider, functionalContext({
      props: { vertical: true }
    }))

    expect(wrapper.hasClass('v-divider--vertical')).toBe(true)
  })
})
