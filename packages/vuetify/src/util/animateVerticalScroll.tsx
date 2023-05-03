import { easeOutQuart, type EasingFunction } from '@/services/goto/easing-patterns'
import { animate, DEFAULT_DURATION } from './animateHorizontalScroll'

const stopById: Map<string, VoidFunction> = new Map()

type Options = {
  container: HTMLElement
  top: number
  duration?: number
  transition?: EasingFunction
};

export function animateVerticalScroll ({
  container,
  top,
  duration = DEFAULT_DURATION,
  transition = easeOutQuart,
}: Options) {
  const {
    scrollTop,
    offsetHeight: containerHeight,
    scrollHeight,
    dataset: { scrollId },
  } = container

  let path = top - scrollTop

  if (path < 0) {
    const remainingPath = -scrollTop
    path = Math.max(path, remainingPath)
  } else if (path > 0) {
    const remainingPath = scrollHeight - (scrollTop + containerHeight)
    path = Math.min(path, remainingPath)
  }

  if (path === 0) {
    return Promise.resolve()
  }

  if (scrollId && stopById.has(scrollId)) {
    stopById.get(scrollId)!()
  }

  const target = scrollTop + path

  return new Promise<void>(resolve => {
    requestAnimationFrame(() => {
      if (duration === 0) {
        container.scrollTop = target
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
        container.scrollTop = Math.round(target - currentPath)

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
