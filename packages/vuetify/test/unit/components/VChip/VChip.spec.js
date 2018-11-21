import VChip from '@/components/VChip'
import { test } from '@/test'

test('VChip.vue', ({ mount, compileToFunctions }) => {
  it('should have a v-chip class', () => {
    const wrapper = mount(VChip)

    expect(wrapper.hasClass('v-chip')).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should be removable', () => {
    const wrapper = mount(VChip, {
      propsData: { close: true }
    })

    const close = wrapper.find('.v-chip__close')[0]

    const input = jest.fn(value => wrapper.setProps({ value }))
    wrapper.vm.$on('input', input)

    expect(wrapper.html()).toMatchSnapshot()

    close.trigger('click')
    expect(input).toBeCalledWith(false)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render a colored chip', () => {
    const wrapper = mount(VChip, {
      propsData: {
        color: 'blue',
        textColor: 'green'
      }
    })

    expect(wrapper.element.classList).toContain('blue')
    expect(wrapper.element.classList).toContain('green--text')
  })

  it('should render a disabled chip', () => {
    const wrapper = mount(VChip, {
      propsData: {
        disabled: true
      }
    })

    expect(wrapper.element.classList).toContain('v-chip--disabled')

    wrapper.setProps({
      close: true
    })
    expect(wrapper.find('.v-chip__close')).toHaveLength(1)
  })

  it('should render a colored outline chip', () => {
    const wrapper = mount(VChip, {
      propsData: {
        outline: true,
        color: 'blue'
      }
    })

    expect(wrapper.element.classList).toContain('blue')
    expect(wrapper.element.classList).toContain('blue--text')
  })

  it('should render a colored outline chip with text color', () => {
    const wrapper = mount(VChip, {
      propsData: {
        outline: true,
        color: 'blue',
        textColor: 'green'
      }
    })

    expect(wrapper.element.classList).toContain('blue')
    expect(wrapper.element.classList).toContain('green--text')
  })
})
