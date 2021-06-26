// Composables
import { useResizeObserver } from '../resizeObserver'

// Utilities
import { mount } from '@vue/test-utils'
import { describe, expect, it } from '@jest/globals'
import { h, nextTick } from '@vue/runtime-core'

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
