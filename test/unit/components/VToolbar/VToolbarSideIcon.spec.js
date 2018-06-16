import { test } from '@/test'
import VIcon from '@/components/VIcon'
import { VToolbarSideIcon } from '@/components/VToolbar'

test('VToolbarSideIcon.js', ({ mount, functionalContext }) => {
  it('should create default icon when no slot used', () => {
    const context = functionalContext()
    const wrapper = mount(VToolbarSideIcon, context)

    expect(wrapper.find('i').classes()).toContain('material-icons')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should create slot icon when present', () => {
    const iconWrapper = mount(VIcon, functionalContext({}, 'fa-add'))

    const context = functionalContext({}, iconWrapper.vNode)
    const wrapper = mount(VToolbarSideIcon, context)

    expect(wrapper.find('i').classes()).toContain('fa-add')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should pass through events properly', () => {
    const click = jest.fn()
    const context = functionalContext({
      on: { click }
    })
    const wrapper = mount(VToolbarSideIcon, context)

    wrapper.trigger('click')

    expect(click).toBeCalled()
  })

  it('should pass through props to button component', () => {
    const context = functionalContext({
      props: {
        dark: true
      }
    })
    const wrapper = mount(VToolbarSideIcon, context)

    expect(wrapper.classes()).toContain('theme--dark')
  })

  it('should pass through css classes to button component', () => {
    const context = functionalContext({
      staticClass: 'hidden-sm-and-up'
    })
    const wrapper = mount(VToolbarSideIcon, context)

    expect(wrapper.classes()).toContain('hidden-sm-and-up')
  })

  it('should pass through directives to button component', () => {
    const context = functionalContext({
      directives: [
        {
          name: 'show',
          value: false
        }
      ]
    })
    const wrapper = mount(VToolbarSideIcon, context)

    expect(wrapper.element.style.display).toBe('none')
  })
})
