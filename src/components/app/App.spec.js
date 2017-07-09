import { mount } from 'avoriaz'
import { functionalContext } from '~util/testing'
import App from '~components/app/App'

describe('App.js', () => {
  it('should have an application class', () => {
    const wrapper = mount(App, functionalContext())

    expect(wrapper.hasClass('application')).toBe(true)
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
  })

  it('should have data-app attribute', () => {
    const wrapper = mount(App, functionalContext())

    expect(wrapper.hasAttribute('data-app', 'true')).toBe(true)
  })

  it('should allow a custom id', () => {
    const wrapper = mount(App, functionalContext({
      props: {
        id: 'inspire'
      }
    }))

    expect(wrapper.hasAttribute('id', 'inspire')).toBe(true)
  })
})
