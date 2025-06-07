// Components
import { VInfiniteScroll } from '../VInfiniteScroll'

// Utilities
import { render } from '@test'
import { nextTick, ref } from 'vue'
import { createRange } from '@/util'

describe('VInfiniteScroll', () => {
  let mockIntersectionObserver: any
  const observedElements: Map<Element, IntersectionObserverCallback> = new Map()

  beforeEach(() => {
    observedElements.clear()
    mockIntersectionObserver = vi.fn(callback => ({
      observe: vi.fn(element => observedElements.set(element, callback)),
      unobserve: vi.fn(element => observedElements.delete(element)),
      disconnect: vi.fn(() => observedElements.clear()),
    }))
    vi.stubGlobal('IntersectionObserver', mockIntersectionObserver)
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.runOnlyPendingTimers()
    vi.useRealTimers()
    vi.unstubAllGlobals()
  })

  const simulateIntersection = (element: Element, isIntersecting: boolean) => {
    const callback = observedElements.get(element)
    if (callback) {
      callback([{ target: element, isIntersecting }] as any, mockIntersectionObserver)
    }
  }

  it.todo('should call load function when end sentinel intersects')

  it.todo('should work when using start side and start sentinel intersects')

  it.todo('should work when using both sides and sentinels intersect')

  it.todo('should support horizontal direction and load on end sentinel intersect')

  it.todo('should keep triggering load logic until VInfiniteScrollIntersect disappears or load fails')
})
