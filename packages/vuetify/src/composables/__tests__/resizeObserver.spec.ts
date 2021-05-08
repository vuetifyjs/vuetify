// Composables
import { useResizeObserver } from '../resizeObserver'

// Utilities
import { mount } from '@vue/test-utils'
import { h } from '@vue/runtime-core'

describe('resizeObserver', () => {
  it('should invoke callback with html element', () => {
    const callback = jest.fn()
    mount({
      setup () {
        const { resizeRef } = useResizeObserver(callback)

        return () => h('div', { ref: resizeRef }, ['foo'])
      },
    })

    expect(callback).toHaveBeenCalled()
  })

  it('should invoke callback with component', () => {
    const Comp = {
      template: '<div/>',
    }

    const callback = jest.fn()
    mount({
      setup () {
        const { resizeRef } = useResizeObserver(callback)

        return () => h(Comp, { ref: resizeRef })
      },
    })

    expect(callback).toHaveBeenCalled()
  })
})
