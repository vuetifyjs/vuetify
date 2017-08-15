import VApp from '~components/VApp'
import { test } from '~util/testing'

test('VApp.js', ({ mount, functionalContext }) => {
  it('should have an application class', () => {
    const wrapper = mount(VApp, functionalContext())

    expect(wrapper.hasClass('application')).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should have a toolbar and footer class', () => {
    const wrapper = mount(VApp, functionalContext({
      props: {
        toolbar: true,
        footer: true,
        fixedFooter: true
      }
    }))

    expect(wrapper.hasClass('application--toolbar')).toBe(true)
    expect(wrapper.hasClass('application--footer')).toBe(true)
    expect(wrapper.hasClass('application--footer-fixed')).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should have data-app attribute', () => {
    const wrapper = mount(VApp, functionalContext())

    expect(wrapper.hasAttribute('data-app', 'true')).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should allow a custom id', () => {
    const wrapper = mount(VApp, functionalContext({
      props: {
        id: 'inspire'
      }
    }))

    expect(wrapper.hasAttribute('id', 'inspire')).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
