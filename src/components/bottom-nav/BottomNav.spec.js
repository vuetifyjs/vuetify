import BottomNav from '~components/bottom-nav/BottomNav'
import { test } from '~util/testing'

test('BottomNav.js', ({ mount, functionalContext }) => {
  it('should have a bottom-nav class', () => {
    const wrapper = mount(BottomNav, functionalContext())

    expect(wrapper.hasClass('bottom-nav')).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should have prop classes', () => {
    const wrapper = mount(BottomNav, functionalContext({
      props: {
        absolute: true,
        shift: true
      }
    }))

    expect(wrapper.hasClass('bottom-nav--absolute')).toBe(true)
    expect(wrapper.hasClass('bottom-nav--shift')).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should be hidden with a false value', () => {
    const wrapper = mount(BottomNav, functionalContext({
      props: { value: false }
    }))

    expect(wrapper.hasClass('bottom-nav--active')).toBe(false)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should be visible with a true value', () => {
    const wrapper = mount(BottomNav, functionalContext({
      props: { value: true }
    }))

    expect(wrapper.hasClass('bottom-nav--active')).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
