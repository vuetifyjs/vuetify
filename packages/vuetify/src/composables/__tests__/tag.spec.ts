// Composables
import { makeTagProps } from '../tag'

// Utilities
import { describe, expect, it } from '@jest/globals'
import { mount } from '@vue/test-utils'
import { h } from 'vue'

// Types
import type { TagProps } from '../tag'

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
