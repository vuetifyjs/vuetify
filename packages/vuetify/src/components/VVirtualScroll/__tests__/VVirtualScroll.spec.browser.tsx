// Components
import { VVirtualScroll } from '../VVirtualScroll'

// Utilities
import { render, scroll, waitIdle } from '@test'
import { createRange } from '@/util'

describe('VVirtualScroll', () => {
  it('only renders visible items', async () => {
    const items = createRange(1000)

    const { container } = render(() => (
      <VVirtualScroll height="400" items={ items } itemHeight="24">
        {{
          default: ({ index }) => (
            <div>{ index }</div>
          ),
        }}
      </VVirtualScroll>
    ))

    const elements = container.querySelectorAll('.v-virtual-scroll__item')
    expect(elements.length).toBeGreaterThan(10)
    expect(elements.length).toBeLessThan(50)
  })

  it('reuses the same elements', async () => {
    const items = createRange(1000)

    const result = render(() => (
      <VVirtualScroll height="400" items={ items }>
        {{
          default: ({ item, index }) => (
            <div>{ index }</div>
          ),
        }}
      </VVirtualScroll>
    ))

    const root = result.container.querySelector('.v-virtual-scroll')!

    await waitIdle()
    const el = await result.findByText(16)
    await scroll({ top: 400, behavior: 'smooth' }, root)
    expect(await result.findByText(16)).toBe(el)

    await scroll({ top: 800, behavior: 'smooth' }, root)
    await scroll({ top: 200, behavior: 'smooth' }, root)
    expect(await result.findByText(16)).not.toBe(el)
  })
})
