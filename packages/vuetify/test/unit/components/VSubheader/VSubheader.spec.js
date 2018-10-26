import { test } from '@/test'
import VSubheader from '@/components/VSubheader'

test('VSubheader.js', ({ mount }) => {
  it('should have custom class', () => {
    const wrapper = mount({
      render: h => h(VSubheader, { staticClass: 'foo' })
    })

    expect(wrapper.element.classList.contains('foo')).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should be light', () => {
    const wrapper = mount(VSubheader, {
      propsData: { light: true }
    })

    expect(wrapper.element.classList.contains('theme--light')).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should be dark', () => {
    const wrapper = mount(VSubheader, {
      propsData: { dark: true }
    })

    expect(wrapper.element.classList.contains('theme--dark')).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should be inset', () => {
    const wrapper = mount(VSubheader, {
      propsData: { inset: true }
    })

    expect(wrapper.element.classList.contains('v-subheader--inset')).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
