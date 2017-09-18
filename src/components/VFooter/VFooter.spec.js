import { test, functionalContext } from '~util/testing'
import { mount } from 'avoriaz'
import VFooter from './VFooter'

test('VFooter.js', () => {
  it('should render component and match snapshot', () => {
    const wrapper = mount(VFooter)

    expect(wrapper.element.classList).toContain('footer')
  })

  it('should render an absolute positioned component and match snapshot', () => {
    const wrapper = mount(VFooter, {
      propsData: {
        absolute: true
      }
    })

    expect(wrapper.element.classList).toContain('footer--absolute')
  })

  it('should render a fixed positioned component and match snapshot', () => {
    const wrapper = mount(VFooter, {
      propsData: {
        fixed: true
      }
    })

    expect(wrapper.element.classList).toContain('footer--fixed')
  })

  it('should render a fixed and absolute positioned and match snapshot', () => {
    const wrapper = mount(VFooter, {
      propsData: {
        absolute: true,
        fixed: true
      }
    })

    expect(wrapper.element.classList).toContain('footer--absolute')
    expect(wrapper.element.classList).toContain('footer--fixed')
  })
})
