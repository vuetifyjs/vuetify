// Composables
import { useVelocity } from '@/composables/touch'

// Utilities
import { computed, onBeforeUnmount, onMounted, shallowRef } from 'vue'

// Types
import type { Ref } from 'vue'

export function useTouch ({ isActive, isTemporary, width, touchless, position }: {
  isActive: Ref<boolean>
  isTemporary: Ref<boolean>
  width: Ref<number>
  touchless: Ref<boolean>
  position: Ref<'left' | 'right' | 'top' | 'bottom'>
}) {
  onMounted(() => {
    window.addEventListener('touchstart', onTouchstart, { passive: true })
    window.addEventListener('touchmove', onTouchmove, { passive: false })
    window.addEventListener('touchend', onTouchend, { passive: true })
  })

  onBeforeUnmount(() => {
    window.removeEventListener('touchstart', onTouchstart)
    window.removeEventListener('touchmove', onTouchmove)
    window.removeEventListener('touchend', onTouchend)
  })

  const isHorizontal = computed(() => ['left', 'right'].includes(position.value))

  const { addMovement, endTouch, getVelocity } = useVelocity()
  let maybeDragging = false
  const isDragging = shallowRef(false)
  const dragProgress = shallowRef(0)
  const offset = shallowRef(0)
  let start: [number, number] | undefined

  function getOffset (pos: number, active: boolean): number {
    return (
      position.value === 'left' ? pos
      : position.value === 'right' ? document.documentElement.clientWidth - pos
      : position.value === 'top' ? pos
      : position.value === 'bottom' ? document.documentElement.clientHeight - pos
      : oops()
    ) - (active ? width.value : 0)
  }

  function getProgress (pos: number, limit = true): number {
    const progress = (
      position.value === 'left' ? (pos - offset.value) / width.value
      : position.value === 'right' ? (document.documentElement.clientWidth - pos - offset.value) / width.value
      : position.value === 'top' ? (pos - offset.value) / width.value
      : position.value === 'bottom' ? (document.documentElement.clientHeight - pos - offset.value) / width.value
      : oops()
    )
    return limit ? Math.max(0, Math.min(1, progress)) : progress
  }

  function onTouchstart (e: TouchEvent) {
    if (touchless.value) return

    const touchX = e.changedTouches[0].clientX
    const touchY = e.changedTouches[0].clientY

    const touchZone = 25
    const inTouchZone: boolean =
      position.value === 'left' ? touchX < touchZone
      : position.value === 'right' ? touchX > document.documentElement.clientWidth - touchZone
      : position.value === 'top' ? touchY < touchZone
      : position.value === 'bottom' ? touchY > document.documentElement.clientHeight - touchZone
      : oops()

    const inElement: boolean = isActive.value && (
      position.value === 'left' ? touchX < width.value
      : position.value === 'right' ? touchX > document.documentElement.clientWidth - width.value
      : position.value === 'top' ? touchY < width.value
      : position.value === 'bottom' ? touchY > document.documentElement.clientHeight - width.value
      : oops()
    )

    if (
      inTouchZone ||
      inElement ||
      (isActive.value && isTemporary.value)
    ) {
      maybeDragging = true
      start = [touchX, touchY]

      offset.value = getOffset(isHorizontal.value ? touchX : touchY, isActive.value)
      dragProgress.value = getProgress(isHorizontal.value ? touchX : touchY)

      endTouch(e)
      addMovement(e)
    }
  }

  function onTouchmove (e: TouchEvent) {
    const touchX = e.changedTouches[0].clientX
    const touchY = e.changedTouches[0].clientY

    if (maybeDragging) {
      if (!e.cancelable) {
        maybeDragging = false
        return
      }

      const dx = Math.abs(touchX - start![0])
      const dy = Math.abs(touchY - start![1])

      const thresholdMet = isHorizontal.value
        ? dx > dy && dx > 3
        : dy > dx && dy > 3

      if (thresholdMet) {
        isDragging.value = true
        maybeDragging = false
      } else if ((isHorizontal.value ? dy : dx) > 3) {
        maybeDragging = false
      }
    }

    if (!isDragging.value) return

    e.preventDefault()
    addMovement(e)

    const progress = getProgress(isHorizontal.value ? touchX : touchY, false)
    dragProgress.value = Math.max(0, Math.min(1, progress))

    if (progress > 1) {
      offset.value = getOffset(isHorizontal.value ? touchX : touchY, true)
    } else if (progress < 0) {
      offset.value = getOffset(isHorizontal.value ? touchX : touchY, false)
    }
  }

  function onTouchend (e: TouchEvent) {
    maybeDragging = false

    if (!isDragging.value) return

    addMovement(e)

    isDragging.value = false

    const velocity = getVelocity(e.changedTouches[0].identifier)
    const vx = Math.abs(velocity.x)
    const vy = Math.abs(velocity.y)
    const thresholdMet = isHorizontal.value
      ? vx > vy && vx > 400
      : vy > vx && vy > 3

    if (thresholdMet) {
      isActive.value = velocity.direction === ({
        left: 'right',
        right: 'left',
        top: 'down',
        bottom: 'up',
      }[position.value] || oops())
    } else {
      isActive.value = dragProgress.value > 0.5
    }
  }

  const dragStyles = computed(() => {
    return isDragging.value ? {
      transform:
        position.value === 'left' ? `translateX(calc(-100% + ${dragProgress.value * width.value}px))`
        : position.value === 'right' ? `translateX(calc(100% - ${dragProgress.value * width.value}px))`
        : position.value === 'top' ? `translateY(calc(-100% + ${dragProgress.value * width.value}px))`
        : position.value === 'bottom' ? `translateY(calc(100% - ${dragProgress.value * width.value}px))`
        : oops(),
      transition: 'none',
    } : undefined
  })

  return {
    isDragging,
    dragProgress,
    dragStyles,
  }
}

function oops (): never {
  throw new Error()
}
