// Utilities
import { h } from 'vue'
import { makeTagProps } from '..'
import { mount } from '@vue/test-utils'

// Types
import type { TagProps } from '..'

describe('tag.ts', () => {
  it('should use custom tag on rendered output', () => {
    const TestComponent = {
      props: makeTagProps(),
      render: (props: TagProps) => h(props.tag),
    }

    const wrapper = mount(TestComponent, {
      props: { tag: 'span' },
    })

    expect(wrapper.element.tagName).toBe('SPAN')
  })
})
