import VIcon from '@/components/VIcon'
import { test, textComponent } from '@/test'

test('VIcon.js', ({ mount }) => {
  it('should render component', () => {
    const wrapper = mount(VIcon, {
      slots: {
        default: textComponent('add')
      }
    })

    expect(wrapper.text()).toBe('add')
    expect(wrapper.element.className).toBe('v-icon material-icons theme--light')
  })

  it('should render a colored component', () => {
    const wrapper = mount(VIcon, {
      propsData: { color: 'green lighten-1' },
      slots: { default: textComponent('add') }
    })

    expect(wrapper.element.classList).toContain('green--text')
    expect(wrapper.element.classList).toContain('text--lighten-1')
  })

  it('should render a disabled component', () => {
    const wrapper = mount(VIcon, {
      propsData: { disabled: true },
      slots: { default: textComponent('add') }
    })

    expect(wrapper.element.classList).toContain('v-icon--disabled')
  })

  it('should not set font size if none provided', () => {
    const wrapper = mount(VIcon, {
      slots: { default: textComponent('add') }
    })

    expect(wrapper.element.style.fontSize).toBe('')
  })

  it('should render a mapped size', () => {
    const SIZE_MAP = {
      small: '16px',
      medium: '28px',
      large: '36px',
      xLarge: '40px'
    }

    Object.keys(SIZE_MAP).forEach(size => {
      const wrapper = mount(VIcon, {
        propsData: { [size]: true },
        slots: { default: textComponent('add') }
      })

      expect(wrapper.element.style.fontSize).toBe(SIZE_MAP[size])
    })
  })

  it('should render a specific size with String type', () => {
    const wrapper = mount(VIcon, {
      propsData: { size: '112px' },
      slots: { default: textComponent('add') }
    })

    expect(wrapper.element.style.fontSize).toBe('112px')
  })

  it('should render a specific size with Number type', () => {
    const wrapper = mount(VIcon, {
      propsData: { size: '112' },
      slots: { default: textComponent('add') }
    })

    expect(wrapper.element.style.fontSize).toBe('112px')
 })

  it('should render a left aligned component', () => {
    const wrapper = mount(VIcon, {
      propsData: { left: true },
      slots: { default: textComponent('add') }
    })

    expect(wrapper.element.classList).toContain('v-icon--left')
  })

  it('should render a right aligned component', () => {
    const wrapper = mount(VIcon, {
      propsData: { right: true },
      slots: { default: textComponent('add') }
    })

    expect(wrapper.element.classList).toContain('v-icon--right')
  })

  it('should render a component with aria-hidden attr', () => {
    const wrapper = mount(VIcon, {
      attrs: { 'aria-hidden': 'foo' },
      slots: { default: textComponent('add') }
    })

    expect(wrapper.element.getAttribute('aria-hidden')).toBe('foo')
  })

  it('should allow third-party icons when using <icon>- prefix', () => {
    const wrapper = mount(VIcon, {
      slots: { default: textComponent('fa-add') }
    })

    expect(wrapper.text()).toBe('')
    expect(wrapper.element.className).toBe('v-icon fa fa-add theme--light')
  })

  it('should support font awesome 5 icons when using <icon>- prefix', () => {
    const wrapper = mount(VIcon, {
      slots: { default: textComponent('fab fa-facebook') }
    })

    expect(wrapper.text()).toBe('')
    expect(wrapper.element.className).toBe('v-icon fab fa-facebook theme--light')
  })

  // TODO: this.$vnode is undefined in tests
  it.skip('should allow the use of v-text', () => {
    const wrapper = mount(VIcon, {
      domProps: { textContent: 'fa-home' }
    })

    expect(wrapper.text()).toBe('')
    expect(wrapper.element.className).toBe('v-icon fa fa-home theme--light')
  })

  // TODO: this.$vnode is undefined in tests
  it.skip('should allow the use of v-html', () => {
    const wrapper = mount(VIcon, {
      domProps: { innerHTML: 'fa-home' }
    })

    expect(wrapper.text()).toBe('')
    expect(wrapper.element.className).toBe('v-icon fa fa-home theme--light')
  })

  it('should render MD left icon from $vuetify.icons.checkboxOn', () => {
    const wrapper = mount(VIcon, {
      slots: { default: textComponent('$vuetify.icons.checkboxOn') }
    })

    expect(wrapper.text()).toBe('check_box')
    expect(wrapper.element.className).toBe('v-icon material-icons theme--light')
  })

  it('should render MD left icon from $vuetify.icons.prev', () => {
    const wrapper = mount(VIcon, {
      slots: { default: textComponent('$vuetify.icons.prev') }
    })

    expect(wrapper.text()).toBe('chevron_left')
    expect(wrapper.element.className).toBe('v-icon material-icons theme--light')
  })

  it('set font size from helper prop', async () => {
    const iconFactory = size => mount(VIcon, {
      propsData: { [size]: true },
      slots: { default: textComponent('foo') }
    })

    const small = iconFactory('small')
    expect(small.html()).toMatchSnapshot()

    const medium = iconFactory('medium')
    expect(medium.html()).toMatchSnapshot()

    const large = iconFactory('large')
    expect(large.html()).toMatchSnapshot()

    const xLarge = iconFactory('xLarge')
    expect(xLarge.html()).toMatchSnapshot()
  })

  // TODO: this.$vnode is undefined in tests
  it.skip('should have proper classname', () => {
    const wrapper = mount(VIcon, {
      propsData: {
        color: 'primary'
      },
      domProps: {
        innerHTML: 'fa-lock'
      }
    })

    expect(wrapper.element.className).toBe('v-icon primary--text fa fa-lock theme--light')
  })
})
