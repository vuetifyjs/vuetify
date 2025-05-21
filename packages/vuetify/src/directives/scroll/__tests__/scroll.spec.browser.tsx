// Directives
import Scroll from '../'

// Utilities
import { render, scroll } from '@test'
import { defineComponent } from 'vue'

describe('v-scroll', () => {
  function setup (selector = '') {
    const callback = vi.fn()
    const result = render(defineComponent({
      directives: { Scroll },
      setup () {
        return () => (
          <div data-testid="root" style="overflow: auto; height: 500px; margin-block: 500px">
            <div style="margin-block: 500px" v-scroll={[callback, selector]}>el</div>
          </div>
        )
      },
    }))

    const el = result.getByText('el')
    const root = result.getByTestId('root')

    return { callback, result, el, root }
  }

  it('listens to scroll on window', async () => {
    const { callback, root } = setup()

    await scroll({ top: 100 })
    expect(callback).toHaveBeenCalledTimes(1)

    callback.mockClear()
    await scroll({ top: 100 }, root)
    expect(callback).not.toHaveBeenCalled()
  })

  it('listens to scroll on selector', async () => {
    const { callback, root } = setup('[data-testid="root"]')

    await scroll({ top: 100 }, root)
    expect(callback).toHaveBeenCalledTimes(1)

    callback.mockClear()
    await scroll({ top: 100 })
    expect(callback).not.toHaveBeenCalled()
  })
})
