// Composables
import { useMutationObserver } from '../mutationObserver'

// Utilities
import { describe, expect, it } from '@jest/globals'
import { mount } from '@vue/test-utils'
import { h } from 'vue'

describe('mutationObserver', () => {
  it('should invoke callback on mounted', async () => {
    const callback = jest.fn()
    mount({
      setup () {
        const { mutationRef } = useMutationObserver(callback, { immediate: true })

        return () => h('div', { ref: mutationRef }, ['foo'])
      },
    })

    expect(callback).toHaveBeenCalled()
  })

  it('should not invoke callback on mounted', async () => {
    const callback = jest.fn()
    mount({
      setup () {
        const { mutationRef } = useMutationObserver(callback)

        return () => h('div', { ref: mutationRef }, ['foo'])
      },
    })

    expect(callback).not.toHaveBeenCalled()
  })
})
