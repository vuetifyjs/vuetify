// Composables
import { useResizeObserver } from '../resizeObserver'

// Utilities
import { waitIdle } from '@test'
import { render, screen } from '@testing-library/vue'

describe('resizeObserver', () => {
  it('calls the callback after mount', async () => {
    const callback = vi.fn()
    render({
      setup () {
        const { resizeRef } = useResizeObserver(callback)

        return () => <div ref={ resizeRef }>foo</div>
      },
    })

    expect(screen.getByText('foo')).toBeInTheDocument()

    await waitIdle()

    expect(callback).toHaveBeenCalledTimes(1)
  })
})
