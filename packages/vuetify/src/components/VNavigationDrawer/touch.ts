import { useVelocity } from '@/composables/touch'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import type { Ref } from 'vue'

export function useTouch ({ isActive, isTemporary, width }: {
  isActive: Ref<boolean>
  isTemporary: Ref<boolean>
  width: Ref<number>
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

  const { addMovement, endTouch, getVelocity } = useVelocity()
  let maybeDragging = false
  const isDragging = ref(false)
  const dragProgress = ref(0)
  const offset = ref(0)
  let start: [number, number] | undefined
  function onTouchstart (e: TouchEvent) {
    if (
      e.changedTouches[0].clientX < 25 ||
      (isActive.value && e.changedTouches[0].clientX < width.value) ||
      (isActive.value && isTemporary.value)
    ) {
      maybeDragging = true
      start = [e.changedTouches[0].clientX, e.changedTouches[0].clientY]
      offset.value = isActive.value ? e.changedTouches[0].clientX - width.value : e.changedTouches[0].clientX
      dragProgress.value = Math.min(1, (e.changedTouches[0].clientX - offset.value) / width.value)
      endTouch(e)
      addMovement(e)
    }
  }

  function onTouchmove (e: TouchEvent) {
    if (maybeDragging) {
      if (!e.cancelable) {
        maybeDragging = false
        return
      }

      const dx = Math.abs(e.changedTouches[0].clientX - start![0])
      const dy = Math.abs(e.changedTouches[0].clientY - start![1])

      if (dx > dy && dx > 3) {
        isDragging.value = true
        maybeDragging = false
      } else if (dy > 3) {
        maybeDragging = false
      }
    }

    if (!isDragging.value) return

    e.preventDefault()
    addMovement(e)

    const progress = (e.changedTouches[0].clientX - offset.value) / width.value
    dragProgress.value = Math.max(0, Math.min(1, progress))

    if (progress > 1) {
      offset.value = e.changedTouches[0].clientX - width.value
    }
  }

  function onTouchend (e: TouchEvent) {
    maybeDragging = false

    if (!isDragging.value) return

    addMovement(e)

    isDragging.value = false

    const velocity = getVelocity(e.changedTouches[0].identifier)
    if (Math.abs(velocity.x) > 400 && Math.abs(velocity.x) > Math.abs(velocity.y)) {
      isActive.value = velocity.direction === 'right'
    } else {
      isActive.value = dragProgress.value > 0.5
    }
  }

  const dragStyles = computed(() => {
    return isDragging.value ? {
      transform: `translateX(calc(-100% + ${dragProgress.value * width.value}px))`,
      // transition: 'none',
    } : undefined
  })

  return {
    isDragging,
    dragProgress,
    dragStyles,
  }
}
