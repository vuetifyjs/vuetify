// https://github.com/vuetifyjs/vuetify/issues/20003
/**
 * This composable is designed to track whether the mouse is in a mousedown state at any given time. The original motivation is that
 * it is impossible to distinguish whether a blur event is triggered by mousedown, keydown, or via JavaScript.
 * This composable allows for conditional logic when a blur is triggered by mousedown.
 */

// Utilities
import { onMounted, onUnmounted, shallowRef } from 'vue'

export function useIsMousedown () {
  const isMousedown = shallowRef(false)
  function mousedown () {
    isMousedown.value = true
  }
  function mouseup () {
    isMousedown.value = false
  }
  onMounted(() => {
    document.body.addEventListener('mousedown', mousedown)
    document.body.addEventListener('mouseup', mouseup)
  })
  onUnmounted(() => {
    document.body.removeEventListener('mousedown', mousedown)
    document.body.removeEventListener('mouseup', mouseup)
  })

  return { isMousedown }
}
