import { ref } from 'vue'
import type { VField, VInput } from '@/components'

interface TextFieldProps {
  autofocus: boolean
  placeholder: string | undefined
}

export function useTextField (props: TextFieldProps) {
  const isFocused = ref(false)
  const inputRef = ref<HTMLInputElement>()
  const vInputRef = ref<VInput>()
  const vFieldRef = ref<VField>()
  function focus () {
    inputRef.value?.focus()
  }
  function blur () {
    inputRef.value?.blur()
  }
  function onFocus (e: FocusEvent) {
    isFocused.value = true
  }
  function onBlur (e: FocusEvent) {
    isFocused.value = false
  }
  function onIntersect (
    isIntersecting: boolean,
    entries: IntersectionObserverEntry[]
  ) {
    if (!props.autofocus || !isIntersecting) return

    focus()
  }
  function getInputProps () {
    return {
      ref: inputRef,
      autofocus: props.autofocus,
      placeholder: props.placeholder,
      size: 1,
      onFocus,
      onBlur,
    }
  }

  return {
    isFocused,
    inputRef,
    vInputRef,
    vFieldRef,
    focus,
    blur,
    onIntersect,
    getInputProps,
    intersectOptions: [{ handler: onIntersect }, null, ['once']],
  }
}
