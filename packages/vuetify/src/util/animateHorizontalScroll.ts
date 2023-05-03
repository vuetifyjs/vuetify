import { easeOutQuart, type EasingFunction } from '@/services/goto/easing-patterns'

export const DEFAULT_DURATION = 200

const stopById: Map<string, VoidFunction> = new Map()

type Options = {
  container: HTMLElement
  left: number
  duration?: number
  transition?: EasingFunction
  rtl?: boolean
};

export function animateHorizontalScroll ({
  container,
  left,
  duration = DEFAULT_DURATION,
  transition = easeOutQuart,
  rtl = false,
}: Options) {
  const {
    scrollLeft,
    offsetWidth: containerWidth,
    scrollWidth,
    dataset: { scrollId },
  } = container

  const normalScrollLeft = rtl
    ? scrollWidth - containerWidth + scrollLeft
    : scrollLeft

  let path = left - normalScrollLeft

  if (path < 0) {
    const remainingPath = rtl ? -normalScrollLeft : -scrollLeft
    path = Math.max(path, remainingPath)
  } else if (path > 0) {
    const remainingPath = scrollWidth - (normalScrollLeft + containerWidth)
    path = Math.min(path, remainingPath)
  }

  if (path === 0) {
    return Promise.resolve()
  }

  if (scrollId && stopById.has(scrollId)) {
    stopById.get(scrollId)!()
  }

  const target = scrollLeft + path

  return new Promise<void>(resolve => {
    requestAnimationFrame(() => {
      if (duration === 0) {
        container.scrollLeft = target
        resolve()
        return
      }

      let isStopped = false
      const id = Math.random().toString()
      container.dataset.scrollId = id
      stopById.set(id, () => {
        isStopped = true
      })

      container.style.scrollSnapType = 'none'

      const startAt = Date.now()

      animate(() => {
        if (isStopped) return false

        const t = Math.min((Date.now() - startAt) / duration, 1)

        const currentPath = path * (1 - transition(t))
        container.scrollLeft = Math.round(target - currentPath)

        if (t >= 1) {
          container.style.scrollSnapType = ''
          delete container.dataset.scrollId
          stopById.delete(id)
          resolve()
        }

        return t < 1
      }, requestAnimationFrame)
    })
  })
}

export function animate (tick: Function, schedulerFn: typeof requestAnimationFrame) {
  schedulerFn(() => {
    if (tick()) {
      animate(tick, schedulerFn)
    }
  })
}
