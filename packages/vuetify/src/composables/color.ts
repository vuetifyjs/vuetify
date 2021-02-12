// Utilities
import { computed, isRef, toRef, ref, reactive } from 'vue'
import { isCssColor } from '@/util/colorUtils'

// Types
import type { Ref } from 'vue'

type ColorValue = string | null | undefined
type TextColorData = {
  classes: string | null
  styles: { color: string, 'caret-color': string } | null
}
type BackgroundColorData = {
  classes: string | null
  styles: { 'background-color': string } | null
}

export function useTextColor (color: Ref<ColorValue>): TextColorData
export function useTextColor <T extends Record<string, any>>(props: T, name: keyof T): TextColorData
export function useTextColor <T extends Record<string, any>> (props: T | Ref<ColorValue>, name?: keyof T): TextColorData {
  const color: Ref<ColorValue> = isRef(props) ? props : (name ? toRef(props, name) : ref(null))
  const cssColor = computed(() => isCssColor(color.value))

  const classes = computed(() => {
    if (!color.value || cssColor.value) return null

    return `text-${color.value}`
  })

  const styles = computed(() => {
    if (!color.value || !cssColor.value) return null

    return {
      color: color.value,
      'caret-color': color.value,
    }
  })

  return reactive({ classes, styles })
}

export function useBackgroundColor (color: Ref<ColorValue>): BackgroundColorData
export function useBackgroundColor <T extends Record<string, any>>(props: T, name: keyof T): BackgroundColorData
export function useBackgroundColor <T extends Record<string, any>> (props: T | Ref<ColorValue>, name?: keyof T): BackgroundColorData {
  const color: Ref<ColorValue> = isRef(props) ? props : (name ? toRef(props, name) : ref(null))
  const cssColor = computed(() => isCssColor(color.value))

  const classes = computed(() => {
    if (!color.value || cssColor.value) return null

    return `bg-${color.value}`
  })

  const styles = computed(() => {
    if (!color.value || !cssColor.value) return null

    return {
      'background-color': color.value,
    }
  })

  return reactive({ classes, styles })
}
