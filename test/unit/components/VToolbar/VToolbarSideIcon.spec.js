import { test } from '@/test'
import VIcon from '@/components/VIcon'
import { VToolbarSideIcon } from '@/components/VToolbar'

test('VToolbarSideIcon.js', ({ mount, functionalContext }) => {
  it('should create default icon when no slot used', () => {
    const context = functionalContext()
    const wrapper = mount(VToolbarSideIcon, context)

    expect(wrapper.find('i')[0].hasClass('material-icons')).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should create slot icon when present', () => {
    const iconWrapper = mount(VIcon, functionalContext({}, 'fa-add'))

    const context = functionalContext({}, iconWrapper.vNode)
    const wrapper = mount(VToolbarSideIcon, context)

    expect(wrapper.find('i')[0].hasClass('fa-add')).toBe(true)
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

    expect(wrapper.hasClass('theme--dark')).toBe(true)
  })

  it('should pass through css classes to button component', () => {
    const context = functionalContext({
      staticClass: 'hidden-sm-and-up'
    })
    const wrapper = mount(VToolbarSideIcon, context)

    expect(wrapper.hasClass('hidden-sm-and-up')).toBe(true)
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

    expect(wrapper.hasStyle('display', 'none')).toBe(true)
  })
})
