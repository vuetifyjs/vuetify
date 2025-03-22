// Composables
import { useResizeObserver } from '../resizeObserver'

// Utilities
import { render, screen, waitIdle } from '@test'

describe('resizeObserver', () => {
  it('calls the callback after mount', async () => {
    const callback = vi.fn()
    render({
      setup () {
        const { resizeRef } = useResizeObserver(callback)

        return () => <div ref={ resizeRef }>foo</div>
      },
    })

    expect(screen.getByText('foo')).toBeVisible()

    await waitIdle()

    expect(callback).toHaveBeenCalledTimes(1)
  })
})
