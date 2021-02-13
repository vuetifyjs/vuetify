// Utilities
import { computed, isRef } from 'vue'
import { isCssColor } from '@/util/colorUtils'

// Types
import type { Ref, CSSProperties } from 'vue'

type ColorValue = string | null | undefined

type TextColorData = {
  textColorClasses: Ref<string[]>
  textColorStyles: Ref<CSSProperties>
}

type BackgroundColorData = {
  backgroundColorClasses: Ref<string[]>
  backgroundColorStyles: Ref<CSSProperties>
}

export function useColor (colors: Ref<{ background?: ColorValue, text?: ColorValue }>) {
  const backgroundIsCssColor = computed(() => isCssColor(colors.value.background))
  const textIsCssColor = computed(() => isCssColor(colors.value.text))

  const colorClasses = computed(() => {
    const classes: string[] = []

    if (colors.value.background && !backgroundIsCssColor.value) {
      classes.push(`bg-${colors.value.background}`)
    }

    if (colors.value.text && !textIsCssColor.value) {
      classes.push(`text-${colors.value.text}`)
    }

    return classes
  })

  const colorStyles = computed(() => {
    const styles: CSSProperties = {}

    if (colors.value.background && backgroundIsCssColor.value) {
      styles.backgroundColor = colors.value.background
    }

    if (colors.value.text && textIsCssColor.value) {
      styles.color = colors.value.text
      styles.caretColor = colors.value.text
    }

    return styles
  })

  return { colorClasses, colorStyles }
}

export function useTextColor (color: Ref<ColorValue>): TextColorData
export function useTextColor <T extends Record<K, ColorValue>, K extends string> (props: T, name: K): TextColorData
export function useTextColor <T extends Record<K, ColorValue>, K extends string> (
  props: T | Ref<ColorValue>,
  name?: K
): TextColorData {
  const colors = computed(() => ({
    text: isRef(props) ? props.value : (name ? props[name] : null),
  }))

  const {
    colorClasses: textColorClasses,
    colorStyles: textColorStyles,
  } = useColor(colors)

  return { textColorClasses, textColorStyles }
}

export function useBackgroundColor (color: Ref<ColorValue>): BackgroundColorData
export function useBackgroundColor <T extends Record<K, ColorValue>, K extends string> (props: T, name: K): BackgroundColorData
export function useBackgroundColor <T extends Record<K, ColorValue>, K extends string> (
  props: T | Ref<ColorValue>,
  name?: K
): BackgroundColorData {
  const colors = computed(() => ({
    background: isRef(props) ? props.value : (name ? props[name] : null),
  }))

  const {
    colorClasses: backgroundColorClasses,
    colorStyles: backgroundColorStyles,
  } = useColor(colors)

  return { backgroundColorClasses, backgroundColorStyles }
}
