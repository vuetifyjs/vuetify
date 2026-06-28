// Utilities
import { onMounted, onScopeDispose, shallowRef, watch } from 'vue'

// Types
import type { Ref } from 'vue'

export interface AutoDismissOptions {
  /** Called when the timeout (re)starts */
  onStart?: () => void
  /** Called when the pending timeout is cleared */
  onClear?: () => void
  /** Element scoping the focusout containment check, defaults to the event's currentTarget */
  getContentEl?: () => HTMLElement | null | undefined
}

/**
 * Toggles `isActive` off after `timeout` ms, pausing while hovered or focused.
 * A negative `timeout` never dismisses. Shared by VSnackbar and VAlert.
 */
export function useAutoDismiss (
  isActive: Ref<boolean>,
  timeout: () => number,
  options: AutoDismissOptions = {},
) {
  const isHovering = shallowRef(false)
  const isFocused = shallowRef(false)

  let activeTimeout = -1

  function startTimeout () {
    options.onClear?.()
    window.clearTimeout(activeTimeout)

    const value = timeout()

    if (!isActive.value || value < 0 || isHovering.value || isFocused.value) return

    options.onStart?.()

    activeTimeout = window.setTimeout(() => {
      isActive.value = false
    }, value)
  }

  function clearTimeout () {
    options.onClear?.()
    window.clearTimeout(activeTimeout)
  }

  function onPointerenter () {
    isHovering.value = true
    clearTimeout()
  }

  function onPointerleave () {
    isHovering.value = false
    if (!isFocused.value) startTimeout()
  }

  function onFocusin () {
    isFocused.value = true
    clearTimeout()
  }

  function onFocusout (e: FocusEvent) {
    const contentEl = options.getContentEl?.() ?? (e.currentTarget as HTMLElement | null)
    if (contentEl?.contains(e.relatedTarget as Node)) return

    isFocused.value = false
    if (!isHovering.value) startTimeout()
  }

  watch(isActive, startTimeout)
  watch(timeout, startTimeout)

  onMounted(() => {
    if (isActive.value) startTimeout()
  })

  onScopeDispose(() => {
    window.clearTimeout(activeTimeout)
  })

  return {
    isHovering,
    isFocused,
    startTimeout,
    clearTimeout,
    onPointerenter,
    onPointerleave,
    onFocusin,
    onFocusout,
  }
}
