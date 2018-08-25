import VDivider from '@/components/VDivider'
import { test } from '@/test'

test('VDivider.js', ({ mount }) => {
  it('should render component and match snapshot', () => {
    const wrapper = mount(VDivider)

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render an inset component', () => {
    const wrapper = mount(VDivider, {
      propsData: { inset: true }
    })

    expect(wrapper.hasClass('v-divider--inset')).toBe(true)
  })

  it('should render a light component', () => {
    const wrapper = mount(VDivider, {
      propsData: { light: true }
    })

    expect(wrapper.hasClass('theme--light')).toBe(true)
  })

  it('should render a dark component', () => {
    const wrapper = mount(VDivider, {
      propsData: { dark: true }
    })

    expect(wrapper.hasClass('theme--dark')).toBe(true)
  })

  it('should render a vertical component', () => {
    const wrapper = mount(VDivider, {
      propsData: { vertical: true }
    })

    expect(wrapper.hasClass('v-divider--vertical')).toBe(true)
  })
})
