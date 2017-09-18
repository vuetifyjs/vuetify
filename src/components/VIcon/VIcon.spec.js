import VIcon from '~components/VIcon'
import { test, functionalContext } from '~util/testing'
import { mount } from 'avoriaz'

test('VIcon.js', () => {
  it('should render component', () => {
    const context = functionalContext({}, 'add')
    const wrapper = mount(VIcon, context)

    expect(wrapper.text()).toBe('add')
    expect(wrapper.element.className).toBe('material-icons icon')
  })

  it('should render a disabled component', () => {
    const context = functionalContext({ props: { disabled: true } }, 'add')
    const wrapper = mount(VIcon, context)

    expect(wrapper.element.classList).toContain('icon--disabled')
  })

  it('should render a large size component', () => {
    const context = functionalContext({ props: { large: true } }, 'add')
    const wrapper = mount(VIcon, context)

    expect(wrapper.element.classList).toContain('icon--large')
  })

  it('should render a medium size component', () => {
    const context = functionalContext({ props: { medium: true } }, 'add')
    const wrapper = mount(VIcon, context)

    expect(wrapper.element.classList).toContain('icon--medium')
  })

  it('should render a xLarge size component', () => {
    const context = functionalContext({ props: { xLarge: true } }, 'add')
    const wrapper = mount(VIcon, context)

    expect(wrapper.element.classList).toContain('icon--x-large')
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

  it('should render correctly with deprecated prop fa', () => {
    const context = functionalContext({ props: { fa: true } }, 'add')
    const wrapper = mount(VIcon, context)

    expect(wrapper.text()).toBe('')
    expect(wrapper.element.className).toBe('fa icon fa-add')
    expect("'fa' and 'mdi' will be deprecated").toHaveBeenTipped()
  })

  it('should render correctly with deprecated prop mdi', () => {
    const context = functionalContext({ props: { mdi: true } }, 'add')
    const wrapper = mount(VIcon, context)

    expect(wrapper.text()).toBe('')
    expect(wrapper.element.className).toBe('mdi icon mdi-add')
    expect("'fa' and 'mdi' will be deprecated").toHaveBeenTipped()
  })

  it('should allow third-party icons when using <icon>- prefix', () => {
    const context = functionalContext({ props: {} }, 'fa-add')
    const wrapper = mount(VIcon, context)

    expect(wrapper.text()).toBe('')
    expect(wrapper.element.className).toBe('fa icon fa-add')
  })

  it('should allow the use of v-text', () => {
    const wrapper = mount(VIcon, functionalContext({
      domProps: { textContent: 'fa-home' }
    }))

    expect(wrapper.text()).toBe('')
    expect(wrapper.element.className).toBe('fa icon fa-home')
  })

  it('should allow the use of v-html', () => {
    const wrapper = mount(VIcon, functionalContext({
      domProps: { innerHTML: 'fa-home' }
    }))

    expect(wrapper.text()).toBe('')
    expect(wrapper.element.className).toBe('fa icon fa-home')
  })
})
