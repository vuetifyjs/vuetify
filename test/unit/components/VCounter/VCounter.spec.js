import VCounter from '@/components/VCounter'
import { test, functionalContext } from '@/test'

test('VCounter.js', ({ mount }) => {
  it('should render component', () => {
    const context = functionalContext({ props: { value: 5, max: 10 }})
    const wrapper = mount(VCounter, context)

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component in error state', () => {
    const context = functionalContext({ props: { value: 15, max: 10 }})
    const wrapper = mount(VCounter, context)

    expect(wrapper.element.classList).toContain('error--text')
  })

  it('should render component if max is not provided', () => {
    const context = functionalContext({ props: { value: 15 }})
    const wrapper = mount(VCounter, context)

    expect(wrapper.element.textContent).toBe('15')
  })
})
