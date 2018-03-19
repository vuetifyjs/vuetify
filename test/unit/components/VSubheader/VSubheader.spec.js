import { test } from '@/test'
import VSubheader from '@/components/VSubheader'

test('VSubheader.js', ({ functionalContext, mount }) => {
  it('should have custom class', () => {
    const wrapper = mount(VSubheader, functionalContext({
      'class': 'foo'
    }))

    expect(wrapper.element.classList.contains('foo')).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()

    const wrapper2 = mount(VSubheader, functionalContext({
      props: { light: true }
    }))

    expect(wrapper2.element.classList.contains('theme--light')).toBe(true)
    expect(wrapper2.html()).toMatchSnapshot()

    const wrapper3 = mount(VSubheader, functionalContext({
      props: { dark: true }
    }))

    expect(wrapper3.element.classList.contains('theme--dark')).toBe(true)
    expect(wrapper3.html()).toMatchSnapshot()

    const wrapper4 = mount(VSubheader, functionalContext({
      props: { inset: true }
    }))

    expect(wrapper4.element.classList.contains('subheader--inset')).toBe(true)
    expect(wrapper4.html()).toMatchSnapshot()
  })
})
