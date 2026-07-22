// Components
import { VVirtualScroll } from '../VVirtualScroll'

// Utilities
import { render, screen, scroll, waitIdle } from '@test'
import { ref } from 'vue'
import { createRange } from '@/util'

describe('VVirtualScroll', () => {
  it('only renders visible items', async () => {
    const items = createRange(1000)

    render(() => (
      <VVirtualScroll height="400" items={ items } itemHeight="24">
        {{
          default: ({ index }) => (
            <div>{ index }</div>
          ),
        }}
      </VVirtualScroll>
    ))

    const elements = screen.getAllByCSS('.v-virtual-scroll__item')
    expect(elements.length).toBeGreaterThan(16) // 400/24=16.6
    expect(elements.length).toBeLessThan(50)
  })

  it('recalculates paddingBottom when an item collapses without scroll', async () => {
    const collapsed = ref(false)

    render(() => (
      <VVirtualScroll height="400" items={ createRange(50) }>
        {{
          default: ({ index }) => (
            <div style={{ height: index === 0 && collapsed.value ? '12px' : '48px' }}>
              { index }
            </div>
          ),
        }}
      </VVirtualScroll>
    ))

    await waitIdle()
    await waitIdle()

    collapsed.value = true

    await waitIdle()
    await waitIdle()
    await waitIdle()

    const container = screen.getByCSS('.v-virtual-scroll__container')
    const paddingBottom = parseFloat(container.style.paddingBottom)

    expect(paddingBottom).toBeLessThan(800)
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

    const root = screen.getByCSS('.v-virtual-scroll')

    await waitIdle()
    const el = await result.findByText(16)
    await scroll({ top: 400, behavior: 'smooth' }, root)
    await expect(result.findByText(16)).resolves.toBe(el)

    await scroll({ top: 800, behavior: 'smooth' }, root)
    await scroll({ top: 200, behavior: 'smooth' }, root)
    await expect(result.findByText(16)).resolves.not.toBe(el)
  })
})
