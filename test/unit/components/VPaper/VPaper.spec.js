import { test, functionalContext } from '@/test'
import VPaper from '@/components/VPaper'

test('VPaper.vue', ({ mount }) => {
  it('should render component', () => {
    const context = functionalContext()
    const wrapper = mount(VPaper, context)

    expect(wrapper.element.classList).toContain('v-paper')
    expect(wrapper.element.classList).toContain('elevation-0')
  })

  it('should render component with the proper elevation', () => {
    const context = functionalContext({
      props: {
        elevation: 10
      }
    })
    const wrapper = mount(VPaper, context)

    expect(wrapper.element.classList).toContain('v-paper')
    expect(wrapper.element.classList).toContain('elevation-10')
  })

  it('should render a squared paper', () => {
    const context = functionalContext({
      props: {
        square: true
      }
    })
    const wrapper = mount(VPaper, context)

    expect(wrapper.element.classList).toContain('v-paper--square')
  })

  it('should render a colored paper', () => {
    const context = functionalContext({
      props: {
        color: 'blue lighten-1'
      }
    })
    const wrapper = mount(VPaper, context)

    expect(wrapper.element.classList).toContain('blue')
    expect(wrapper.element.classList).toContain('lighten-1')
  })
})
