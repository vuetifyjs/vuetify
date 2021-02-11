// Utilities
import { computed, isRef, toRef, ref } from 'vue'
import { isCssColor } from '@/util/colorUtils'

// Types
import type { Ref, ComputedRef } from 'vue'

type ColorValue = string | null | undefined
type TextColorData = {
  textColorStyles: ComputedRef<{ color: string, 'caret-color': string } | null>
  textColorClasses: ComputedRef<string | null>
}
type BackgroundColorData = {
  backgroundColorStyles: ComputedRef<{ 'background-color': string } | null>
  backgroundColorClasses: ComputedRef<string | null>
}

export function useTextColor (color: Ref<ColorValue>): TextColorData
export function useTextColor <T extends Record<string, any>>(props: T, name: keyof T): TextColorData
export function useTextColor <T extends Record<string, any>> (props: T | Ref<ColorValue>, name?: keyof T): TextColorData {
  const color: Ref<ColorValue> = isRef(props) ? props : (name ? toRef(props, name) : ref(null))
  const cssColor = computed(() => isCssColor(color.value))

  const textColorStyles = computed(() => {
    if (!color.value || !cssColor.value) return null

    return {
      color: color.value,
      'caret-color': color.value,
    }
  })

  const textColorClasses = computed(() => {
    if (!color.value || cssColor.value) return null

    return `text-${color.value}`
  })

  return { textColorClasses, textColorStyles }
}

export function useBackgroundColor (color: Ref<ColorValue>): BackgroundColorData
export function useBackgroundColor <T extends Record<string, any>>(props: T, name: keyof T): BackgroundColorData
export function useBackgroundColor <T extends Record<string, any>> (props: T | Ref<ColorValue>, name?: keyof T): BackgroundColorData {
  const color: Ref<ColorValue> = isRef(props) ? props : (name ? toRef(props, name) : ref(null))
  const cssColor = computed(() => isCssColor(color.value))

  const backgroundColorStyles = computed(() => {
    if (!color.value || !cssColor.value) return null

    return {
      'background-color': color.value,
    }
  })

  const backgroundColorClasses = computed(() => {
    if (!color.value || cssColor.value) return null

    return `bg-${color.value}`
  })

  return { backgroundColorClasses, backgroundColorStyles }
}
