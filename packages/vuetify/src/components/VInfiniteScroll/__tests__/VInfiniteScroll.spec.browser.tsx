// Components
import { VInfiniteScroll } from '../VInfiniteScroll'

// Utilities
import { page, render, screen, scroll, wait } from '@test'
import { ref } from 'vue'
import { createRange } from '@/util'

describe('VInfiniteScroll', () => {
  it('should call load function when scrolled', async () => {
    const onLoad = vi.fn()
    const items = createRange(50)

    render(() => (
      <VInfiniteScroll height="400" onLoad={ onLoad }>
        { items.map(item => (
          <div class="pa-2">{ item }</div>
        ))}
      </VInfiniteScroll>
    ))

    const container = screen.getByCSS('.v-infinite-scroll')

    await scroll({ top: container.scrollHeight }, container)
    expect(screen.queryAllByCSS('.v-infinite-scroll .v-progress-circular')).toHaveLength(1)
    expect(onLoad).toHaveBeenCalledOnce()
  })

  it('should work when using start side', async () => {
    const onLoad = vi.fn()
    const items = createRange(50)

    render(() => (
      <VInfiniteScroll height="400" onLoad={ onLoad } side="start">
        { items.map(item => (
          <div class="pa-2">{ item }</div>
        ))}
      </VInfiniteScroll>
    ))

    const container = screen.getByCSS('.v-infinite-scroll')

    await scroll({ top: 0 }, container)
    expect(screen.queryAllByCSS('.v-infinite-scroll .v-progress-circular')).toHaveLength(1)
    expect(onLoad).toHaveBeenCalledOnce()
  })

  it('should work when using both sides', async () => {
    const onLoad = vi.fn()
    const items = createRange(50)

    render(() => (
      <VInfiniteScroll height="400" onLoad={ onLoad } side="both">
        { items.map(item => (
          <div class="pa-2">{ item }</div>
        ))}
      </VInfiniteScroll>
    ))

    const container = screen.getByCSS('.v-infinite-scroll')

    await scroll({ top: 0 }, container)
    expect(screen.queryAllByCSS('.v-infinite-scroll .v-progress-circular')[0]).toBeVisible()
    expect(onLoad).toHaveBeenCalledTimes(1)

    await scroll({ top: container.scrollHeight }, container)
    expect(screen.queryAllByCSS('.v-infinite-scroll .v-progress-circular')[1]).toBeVisible()
    expect(onLoad).toHaveBeenCalledTimes(2)
  })

  it('should support horizontal direction', async () => {
    const onLoad = vi.fn()
    const items = createRange(50)

    render(() => (
      <VInfiniteScroll onLoad={ onLoad } direction="horizontal">
        { items.map(item => (
          <div class="pa-2">{ item }</div>
        ))}
      </VInfiniteScroll>
    ))
    const container = screen.getByCSS('.v-infinite-scroll')

    await scroll({ left: container.scrollWidth }, container)
    expect(screen.queryAllByCSS('.v-infinite-scroll .v-progress-circular')).toHaveLength(1)
    expect(onLoad).toHaveBeenCalledOnce()
  })

  // https://github.com/vuetifyjs/vuetify/issues/17358
  it('should keep triggering load logic until VInfiniteScrollIntersect disappears', async () => {
    await page.viewport(400, 200)

    const onLoad = vi.fn()
    const items = ref(Array.from({ length: 3 }, (k, v) => v + 1))

    const load = async ({ done }: any) => {
      onLoad()
      setTimeout(() => {
        items.value.push(...Array.from({ length: 3 }, (k, v) => v + items.value.at(-1)! + 1))
        done('ok')
      }, 100)
    }

    render(() => (
      <VInfiniteScroll onLoad={ load } mode="intersect">
        { items.value.map(item => (
          <div>Item #{ item }</div>
        ))}
      </VInfiniteScroll>
    ))

    expect(screen.queryAllByCSS('.v-infinite-scroll .v-progress-circular')).toHaveLength(1)
    await wait(300)
    expect(onLoad).toHaveBeenCalledTimes(2)
  })
})
