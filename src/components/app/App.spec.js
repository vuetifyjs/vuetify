import App from '~components/app/App'
import { test } from '~util/testing'

test('App.js', ({ mount, functionalContext }) => {
  it('should have an application class', () => {
    const wrapper = mount(App, functionalContext())

    expect(wrapper.hasClass('application')).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should have a toolbar and footer class', () => {
    const wrapper = mount(App, functionalContext({
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
    const wrapper = mount(App, functionalContext())

    expect(wrapper.hasAttribute('data-app', 'true')).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should allow a custom id', () => {
    const wrapper = mount(App, functionalContext({
      props: {
        id: 'inspire'
      }
    }))

    expect(wrapper.hasAttribute('id', 'inspire')).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
