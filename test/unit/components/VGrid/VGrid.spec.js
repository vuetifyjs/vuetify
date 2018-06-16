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

    expect(wrapper.attributes('foo')).not.toContain('foo')
    expect(wrapper.attributes('bar')).not.toContain('bar')

    expect(wrapper.classes('foo')).toContain('foo')
    expect(wrapper.classes('bar')).not.toContain('bar')
  })

  it('should pass the id attr', () => {
    const wrapper = mount(VFlex, functionalContext({
      attrs: {
        id: 'test'
      }
    }))

    expect(wrapper.findAll('#test')).toHaveLength(1)
  })

  // TODO: Remove once resolved
  // https://github.com/vuejs/vue/issues/7841
  it('should filter the slot attr', () => {
    const wrapper = mount(VFlex, functionalContext({
      attrs: { slot: 'content' }
    }))

    expect(wrapper.classes()).not.toContain('slot')
  })
})
