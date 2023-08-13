// Composables
import { useResizeObserver } from '../resizeObserver'

// Utilities
import { describe, expect, it } from '@jest/globals'
import { mount } from '@vue/test-utils'
import { h, nextTick } from 'vue'

describe('resizeObserver', () => {
  it('should make sure mock exists', async () => {
    const callback = jest.fn()
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
