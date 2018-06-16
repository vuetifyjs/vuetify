import { test } from '@/test'
import VSubheader from '@/components/VSubheader'

test('VSubheader.js', ({ functionalContext, mount }) => {
  it('should have custom class', () => {
    const wrapper = mount(VSubheader, functionalContext({
      'class': 'foo'
    }))

    expect(wrapper.classes()).toContain('foo')
    expect(wrapper.html()).toMatchSnapshot()

    const wrapper2 = mount(VSubheader, functionalContext({
      props: { light: true }
    }))

    expect(wrapper2.classes()).toContain('theme--light')
    expect(wrapper2.html()).toMatchSnapshot()

    const wrapper3 = mount(VSubheader, functionalContext({
      props: { dark: true }
    }))

    expect(wrapper3.classes()).toContain('theme--dark')
    expect(wrapper3.html()).toMatchSnapshot()

    const wrapper4 = mount(VSubheader, functionalContext({
      props: { inset: true }
    }))

    expect(wrapper4.classes()).toContain('v-subheader--inset')
    expect(wrapper4.html()).toMatchSnapshot()
  })
})
