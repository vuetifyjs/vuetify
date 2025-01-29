// Directives
import Intersect from '../'

// Utilities
import { scroll, waitIdle } from '@test'
import { render, screen } from '@testing-library/vue'

describe('v-intersect', () => {
  it('binds event on mounted', async () => {
    const callback = vi.fn()

    render({
      directives: { Intersect },
      setup () {
        return () => <div v-intersect={ callback } style="height: 10px" />
      },
    })

    await waitIdle()

    expect(callback).toHaveBeenCalled()
  })

  // TODO: flaky, sometimes triggers with isIntersecting=false
  it.skip('does not callback on mount when quiet', async () => {
    const callback = vi.fn()

    render({
      directives: { Intersect },
      setup () {
        return () => <div v-intersect={[callback, null, ['quiet']]} style="height: 10px" />
      },
    })

    await waitIdle()

    expect(callback).not.toHaveBeenCalled()
  })

  describe('once', () => {
    async function setup (height: string, quiet: boolean) {
      const callback = vi.fn()

      render({
        directives: { Intersect },
        setup () {
          return () => (
            <>
              <div style={{ height }} />
              { quiet // directive modifiers are static
                ? <div v-intersect={[callback, null, ['once', 'quiet']]} style="height: 10px">el</div>
                : <div v-intersect={[callback, null, ['once']]} style="height: 10px">el</div>
              }
              <div style="height: 1000px" />
            </>
          )
        },
      })

      const el = screen.getByText('el')
      expect(Object.keys(el._observe!)).toHaveLength(1)

      await waitIdle()
      return { callback, el }
    }

    it.each([
      ['initially in', '100px', false, 1, 0, 1],
      ['initially out', '120vh', false, 0, 1, 1],
      // ['initially in - quiet', '100px', true, 0, 1, 1], // TODO: flaky
      // ['initially out - quiet', '120vh', true, 0, 1, 1],
    ])('%s', async (name, height, quiet, ...v) => {
      const { callback, el } = await setup(height, quiet)

      expect(callback).toHaveBeenCalledTimes(v[0])
      expect(Object.keys(el._observe!)).toHaveLength(v[1])

      el.scrollIntoView()
      await waitIdle()
      expect(callback).toHaveBeenCalledTimes(v[2])
      expect(Object.keys(el._observe!)).toHaveLength(0)
      callback.mockClear()

      await scroll({ top: 1000 })
      expect(callback).not.toHaveBeenCalled()

      el.scrollIntoView()
      await waitIdle()
      expect(callback).not.toHaveBeenCalled()
    })
  })
})
