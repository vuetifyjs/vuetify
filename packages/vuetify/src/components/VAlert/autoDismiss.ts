// Composables
import { useElementIntersection } from '@/composables/intersectionObserver'
import { useTimer } from '@/composables/timer'

// Utilities
import { ref, shallowRef, toRef, toValue, watch } from 'vue'

// Types
import type { MaybeRefOrGetter, Ref } from 'vue'

export function useAutoDismiss (isActive: Ref<boolean>, timeout: MaybeRefOrGetter<number>) {
  const rootEl = ref<HTMLElement>()
  const isHovering = shallowRef(false)
  const isFocused = shallowRef(false)
  const { isIntersecting } = useElementIntersection(rootEl)
  const timer = useTimer(() => isActive.value = false, { duration: timeout })
  const isCounting = toRef(() => isActive.value && isIntersecting.value && !isHovering.value && !isFocused.value)
  const progress = toRef(() => toValue(timeout) > 0 ? timer.remaining.value / toValue(timeout) * 100 : 100)

  watch([isCounting, () => toValue(timeout)], () => isCounting.value ? timer.start() : timer.stop())
  // pointerleave/focusout never fire on the removed element
  watch(isActive, () => {
    isHovering.value = false
    isFocused.value = false
  })

  const events = {
    onPointerenter: () => isHovering.value = true,
    onPointerleave: () => isHovering.value = false,
    onFocusin: () => isFocused.value = true,
    onFocusout (e: FocusEvent) {
      if (!(e.currentTarget as HTMLElement).contains(e.relatedTarget as Node)) isFocused.value = false
    },
  }

  return { rootEl, progress, events }
}
