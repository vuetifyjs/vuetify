import { test } from '@/test'
import VLabel from '@/components/VLabel'

test('VLabel', ({ mount, functionalContext }) => {
  it('should have custom color', () => {
    const wrapper = mount(VLabel, functionalContext({
      props: {
        color: 'pink',
        focused: true
      }
    }))

    expect(wrapper.element.classList.contains('pink--text')).toBe(true)
  })

  it('should position itself absolutely', () => {
    const wrapper = mount(VLabel, functionalContext({
      props: {
        absolute: true
      }
    }))

    expect(wrapper.element.style.position).toBe('absolute')
  })
})
