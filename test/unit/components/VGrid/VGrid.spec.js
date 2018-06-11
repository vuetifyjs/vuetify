import { test } from '@/test'
import VFlex from '@/components/VGrid/VFlex'

test('VFlex', ({ mount, functionalContext }) => {
  it('should conditionally apply if boolean is used', () => {
    const wrapper = mount(VFlex, functionalContext({
      attrs: {
        foo: '',
        bar: false
      }
    }))

    expect(wrapper.hasAttribute('foo')).toBe(false)
    expect(wrapper.hasAttribute('bar')).toBe(false)
    expect(wrapper.hasClass('foo')).toBe(true)
    expect(wrapper.hasClass('bar')).toBe(false)
  })

  it('should pass the id attr', () => {
    const wrapper = mount(VFlex, functionalContext({
      attrs: {
        id: 'test'
      }
    }))

    expect(wrapper.find('#test')).toHaveLength(1)
  })

  // TODO: Remove once resolved
  // https://github.com/vuejs/vue/issues/7841
  it('should filter the slot attr', () => {
    const wrapper = mount(VFlex, functionalContext({
      attrs: { slot: 'content' }
    }))

    expect(wrapper.element.classList.contains('slot')).toBe(false)
  })
})
