import { easeOutQuart } from '@/services/goto/easing-patterns'

// Utilities
import { ref } from 'vue'
import { IN_BROWSER } from '@/util'

// Types
import type { Ref } from 'vue'
import type { EasingFunction } from '@/services/goto/easing-patterns'

export interface GotoProps {
  container: Ref<HTMLElement | undefined>
  duration?: number
  transition?: EasingFunction
  rtl?: Ref<boolean>
}

export type GotoAnimationProps = Partial<AnimationProps>

interface AnimationProps {
  offset: number
  duration: number
  transition: EasingFunction
  rtl: boolean
}

const DEFAULT_DURATION = 200

const stopById: Map<string, VoidFunction> = new Map()

export function useGoto ({ container, duration, rtl, transition }: GotoProps) {
  const mergeProps = (props: GotoAnimationProps): AnimationProps => {
    return {
      offset: props.offset ?? 0,
      duration: Math.max(
        props.duration || duration || DEFAULT_DURATION,
        1
      ),
      rtl: props.rtl || rtl?.value || false,
      transition: props.transition || transition || easeOutQuart,
    }
  }

  const scrolling = ref(false)

  async function horizontal (props: GotoAnimationProps) {
    if (!IN_BROWSER || !container.value) {
      return Promise.resolve()
    }

    scrolling.value = true

    if (await animateHorizontalScroll(container.value, mergeProps(props))) {
      scrolling.value = false
    }
  }

  async function vertical (props: GotoAnimationProps) {
    if (!IN_BROWSER || !container.value) {
      return Promise.resolve()
    }

    scrolling.value = true

    if (await animateVerticalScroll(container.value, mergeProps(props))) {
      scrolling.value = false
    }
  }

  return {
    scrolling,
    container,
    horizontal,
    vertical,
  }
}

function animateHorizontalScroll (
  container: HTMLElement,
  {
    offset,
    duration,
    transition,
    rtl,
  }: AnimationProps
) {
  const {
    scrollLeft,
    offsetWidth: containerWidth,
    scrollWidth,
    dataset: { scrollId },
  } = container

  const normalScrollLeft = rtl
    ? scrollWidth - containerWidth + scrollLeft
    : scrollLeft

  let path = offset - normalScrollLeft

  if (path < 0) {
    const remainingPath = rtl ? -normalScrollLeft : -scrollLeft
    path = Math.max(path, remainingPath)
  } else if (path > 0) {
    const remainingPath = scrollWidth - (normalScrollLeft + containerWidth)
    path = Math.min(path, remainingPath)
  }

  if (path === 0) {
    return Promise.resolve(true)
  }

  if (scrollId && stopById.has(scrollId)) {
    stopById.get(scrollId)!()
  }

  const target = scrollLeft + path

  return new Promise<boolean>(resolve => {
    requestAnimationFrame(() => {
      if (duration === 0) {
        container.scrollLeft = target
        resolve(true)
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
        if (isStopped) return resolve(false)

        const t = Math.min((Date.now() - startAt) / duration, 1)

        const currentPath = path * (1 - transition(t))
        container.scrollLeft = Math.round(target - currentPath)

        if (t >= 1) {
          container.style.scrollSnapType = ''
          delete container.dataset.scrollId
          stopById.delete(id)
          resolve(true)
        }

        return t < 1
      }, requestAnimationFrame)
    })
  })
}

function animateVerticalScroll (
  container: HTMLElement,
  {
    offset,
    duration,
    transition,
  }: AnimationProps
) {
  const {
    scrollTop,
    offsetHeight: containerHeight,
    scrollHeight,
    dataset: { scrollId },
  } = container

  let path = offset - scrollTop

  if (path < 0) {
    const remainingPath = -scrollTop
    path = Math.max(path, remainingPath)
  } else if (path > 0) {
    const remainingPath = scrollHeight - (scrollTop + containerHeight)
    path = Math.min(path, remainingPath)
  }

  if (path === 0) {
    return Promise.resolve(true)
  }

  if (scrollId && stopById.has(scrollId)) {
    stopById.get(scrollId)!()
  }

  const target = scrollTop + path

  return new Promise<boolean>(resolve => {
    requestAnimationFrame(() => {
      if (duration === 0) {
        container.scrollTop = target
        resolve(true)
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
        if (isStopped) return resolve(false)

        const t = Math.min((Date.now() - startAt) / duration, 1)

        const currentPath = path * (1 - transition(t))
        container.scrollTop = Math.round(target - currentPath)

        if (t >= 1) {
          container.style.scrollSnapType = ''
          delete container.dataset.scrollId
          stopById.delete(id)
          resolve(true)
        }

        return t < 1
      }, requestAnimationFrame)
    })
  })
}

export function animate (
  tick: Function,
  schedulerFn: typeof requestAnimationFrame
) {
  schedulerFn(() => {
    if (tick()) {
      animate(tick, schedulerFn)
    }
  })
}
