// Composables
import { useResizeObserver } from '../resizeObserver'

// Utilities
import { mount } from '@vue/test-utils'
import { expect } from 'vitest'
import { h, nextTick } from 'vue'

describe('resizeObserver', () => {
  it('should make sure mock exists', async () => {
    const callback = vi.fn()
    mount({
      setup () {
        const { resizeRef } = useResizeObserver(callback)

        return () => h('div', { ref: resizeRef }, ['foo'])
      },
    })

    await nextTick()

    expect(callback).toHaveBeenCalled()
  })
})
