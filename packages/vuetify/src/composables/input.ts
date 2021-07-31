// Utilities
import { computed, ref } from 'vue'

// Types
import type { Ref } from 'vue'

export function useInput (isDirty: Ref<boolean>) {
  const inputRef = ref()
  const isFocused = ref(false)
  const isActive = computed(() => isFocused.value || isDirty.value)

  function onFocus () {
    isFocused.value = true
  }

  function onBlur () {
    isFocused.value = false
  }

  function focus () {
    inputRef.value?.focus?.()
  }

  function blur () {
    inputRef.value?.blur?.()
  }

  return {
    isFocused,
    isDirty,
    isActive,
    focus,
    blur,
    props: {
      ref: inputRef,
      onFocus,
      onBlur,
    },
    inputRef,
  }
}
