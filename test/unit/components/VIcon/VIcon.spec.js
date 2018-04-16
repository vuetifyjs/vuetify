import VIcon from '@/components/VIcon'
import { test, functionalContext } from '@/test'

test('VIcon.js', ({ mount, compileToFunctions }) => {
  it('should render component', () => {
    const context = functionalContext({}, 'add')
    const wrapper = mount(VIcon, context)

    expect(wrapper.text()).toBe('add')
    expect(wrapper.element.className).toBe('icon material-icons')
  })

  it('should render a colored component', () => {
    const context = functionalContext({ props: { color: 'green lighten-1' } }, 'add')
    const wrapper = mount(VIcon, context)

    expect(wrapper.element.classList).toContain('green--text')
    expect(wrapper.element.classList).toContain('text--lighten-1')
  })

  it('should render a disabled component', () => {
    const context = functionalContext({ props: { disabled: true } }, 'add')
    const wrapper = mount(VIcon, context)

    expect(wrapper.element.classList).toContain('icon--disabled')
  })

  it('should not set font size if none provided', () => {
    const context = functionalContext({}, 'add')
    const wrapper = mount(VIcon, context)

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
      const context = functionalContext({ props: { [size]: true } }, 'add')
      const wrapper = mount(VIcon, context)

      expect(wrapper.element.style.fontSize).toBe(SIZE_MAP[size])
    })
  })

  it('should render a specific size with String type', () => {
    const context = functionalContext({ props: { size: '112px' } }, 'add')
    const wrapper = mount(VIcon, context)

    expect(wrapper.element.style.fontSize).toBe('112px')
  })

  it('should render a specific size with Number type', () => {
    const context = functionalContext({ props: { size: '112' } }, 'add')
    const wrapper = mount(VIcon, context)

    expect(wrapper.element.style.fontSize).toBe('112px')
 })

  it('should render a left aligned component', () => {
    const context = functionalContext({ props: { left: true } }, 'add')
    const wrapper = mount(VIcon, context)

    expect(wrapper.element.classList).toContain('icon--left')
  })

  it('should render a right aligned component', () => {
    const context = functionalContext({ props: { right: true } }, 'add')
    const wrapper = mount(VIcon, context)

    expect(wrapper.element.classList).toContain('icon--right')
  })

  it('should render a component with aria-hidden attr', () => {
    const context = functionalContext({ attrs: { 'aria-hidden': 'foo' } }, 'add')
    const wrapper = mount(VIcon, context)

    expect(wrapper.element.getAttribute('aria-hidden')).toBe('foo')
  })

  it('should allow third-party icons when using <icon>- prefix', () => {
    const context = functionalContext({ props: {} }, 'fa-add')
    const wrapper = mount(VIcon, context)

    expect(wrapper.text()).toBe('')
    expect(wrapper.element.className).toBe('icon fa fa-add')
  })

  it('should support font awesome 5 icons when using <icon>- prefix', () => {
    const context = functionalContext({ props: {} }, 'fab fa-facebook')
    const wrapper = mount(VIcon, context)

    expect(wrapper.text()).toBe('')
    expect(wrapper.element.className).toBe('icon fab fa-facebook')
  })

  it('should allow the use of v-text', () => {
    const wrapper = mount(VIcon, functionalContext({
      domProps: { textContent: 'fa-home' }
    }))

    expect(wrapper.text()).toBe('')
    expect(wrapper.element.className).toBe('icon fa fa-home')
  })

  it('should allow the use of v-html', () => {
    const wrapper = mount(VIcon, functionalContext({
      domProps: { innerHTML: 'fa-home' }
    }))

    expect(wrapper.text()).toBe('')
    expect(wrapper.element.className).toBe('icon fa fa-home')
  })

  it('set font size from helper prop', async () => {
    const iconFactory = size => mount(VIcon, functionalContext({
      props: { [size]: true }
    }))

    const small = iconFactory('small')
    expect(small.html()).toMatchSnapshot()

    const medium = iconFactory('medium')
    expect(medium.html()).toMatchSnapshot()

    const large = iconFactory('large')
    expect(large.html()).toMatchSnapshot()

    const xLarge = iconFactory('xLarge')
    expect(xLarge.html()).toMatchSnapshot()
  })

  it('should have proper classname', () => {
    const wrapper = mount(VIcon, functionalContext({
      props: {
        color: 'primary'
      },
      domProps: {
        innerHTML: 'fa-lock'
      }
    }))

    expect(wrapper.element.className).toBe('icon primary--text fa fa-lock')
  })
})
