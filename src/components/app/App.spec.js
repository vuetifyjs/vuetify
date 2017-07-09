import { mount } from 'avoriaz'
import { functionalContext } from '~util/testing'
import App from 'src/components/app/App'

describe('App.js', () => {
  it('should have an application class', () => {
    const wrapper = mount(App, functionalContext())

    expect(wrapper.hasClass('application')).toBe(true)
  })

  it('should have a toolbar and footer class', () => {
    const context = functionalContext()
    context.context.props = {
      toolbar: true,
      footer: true,
      fixedFooter: true
    }
    const wrapper = mount(App, context)

    expect(wrapper.hasClass('application--toolbar')).toBe(true)
    expect(wrapper.hasClass('application--footer')).toBe(true)
    expect(wrapper.hasClass('application--footer-fixed')).toBe(true)
  })

  it('should have data-app attribute', () => {
    const wrapper = mount(App, functionalContext())

    expect(wrapper.hasAttribute('data-app', 'true')).toBe(true)
  })

  it('should allow a custom id', () => {
    const context = functionalContext()
    context.context.props.id = 'inspire'
    const wrapper = mount(App, context)

    expect(wrapper.hasAttribute('id', 'inspire')).toBe(true)
  })
})
