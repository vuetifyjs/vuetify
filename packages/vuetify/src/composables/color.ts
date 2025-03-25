// Utilities
import { computed, isRef, toValue } from 'vue'
import { destructComputed, destructComputedGetter, getForeground, isCssColor, isParsableColor, parseColor } from '@/util'

// Types
import type { CSSProperties, MaybeRefOrGetter, Ref } from 'vue'

type ColorValue = string | false | null | undefined

export interface TextColorData {
  textColorClasses: Ref<string[]>
  textColorStyles: Ref<CSSProperties>
}

export interface BackgroundColorData {
  backgroundColorClasses: Ref<string[]>
  backgroundColorStyles: Ref<CSSProperties>
}

export interface TextColorDataGetters {
  textColorClasses: () => string[]
  textColorStyles: () => CSSProperties
}

export interface BackgroundColorDataGetters {
  backgroundColorClasses: () => string[]
  backgroundColorStyles: () => CSSProperties
}

function getColorData (colors: { background?: ColorValue, text?: ColorValue }) {
  const classes: string[] = []
  const styles: CSSProperties = {}

  if (colors.background) {
    if (isCssColor(colors.background)) {
      styles.backgroundColor = colors.background

      if (!colors.text && isParsableColor(colors.background)) {
        const backgroundColor = parseColor(colors.background)
        if (backgroundColor.a == null || backgroundColor.a === 1) {
          const textColor = getForeground(backgroundColor)

          styles.color = textColor
          styles.caretColor = textColor
        }
      }
    } else {
      classes.push(`bg-${colors.background}`)
    }
  }

  if (colors.text) {
    if (isCssColor(colors.text)) {
      styles.color = colors.text
      styles.caretColor = colors.text
    } else {
      classes.push(`text-${colors.text}`)
    }
  }

  return { colorClasses: classes, colorStyles: styles }
}

function getColorValue <T extends Record<K, ColorValue>, K extends string> (
  props: T | Ref<ColorValue>,
  name?: K
): ColorValue {
  return isRef(props) ? props.value : (name ? props[name] : null)
}

// Composables
export function useColor (colors: Ref<{ background?: ColorValue, text?: ColorValue }>) {
  return destructComputed(() => getColorData(colors.value))
}

export function useTextColor (color: Ref<ColorValue>): TextColorData
export function useTextColor <T extends Record<K, ColorValue>, K extends string> (props: T, name: K): TextColorData
export function useTextColor <T extends Record<K, ColorValue>, K extends string> (
  props: T | Ref<ColorValue>,
  name?: K
): TextColorData {
  const colors = computed(() => ({ text: getColorValue(props, name) }))
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
  const colors = computed(() => ({ background: getColorValue(props, name) }))
  const {
    colorClasses: backgroundColorClasses,
    colorStyles: backgroundColorStyles,
  } = useColor(colors)

  return { backgroundColorClasses, backgroundColorStyles }
}

export function useColorFast (colors: MaybeRefOrGetter<{ background?: ColorValue, text?: ColorValue }>) {
  return destructComputedGetter(() => getColorData(toValue(colors)))
}

export function useTextColorFast (color: Ref<ColorValue>): TextColorDataGetters
export function useTextColorFast <T extends Record<K, ColorValue>, K extends string> (props: T, name: K): TextColorDataGetters
export function useTextColorFast <T extends Record<K, ColorValue>, K extends string> (
  props: T | Ref<ColorValue>,
  name?: K
): TextColorDataGetters {
  const {
    colorClasses: textColorClasses,
    colorStyles: textColorStyles,
  } = useColorFast(() => ({ text: getColorValue(props, name) }))

  return { textColorClasses, textColorStyles }
}

export function useBackgroundColorFast (color: Ref<ColorValue>): BackgroundColorDataGetters
export function useBackgroundColorFast <T extends Record<K, ColorValue>, K extends string> (props: T, name: K): BackgroundColorDataGetters
export function useBackgroundColorFast <T extends Record<K, ColorValue>, K extends string> (
  props: T | Ref<ColorValue>,
  name?: K
): BackgroundColorDataGetters {
  const {
    colorClasses: backgroundColorClasses,
    colorStyles: backgroundColorStyles,
  } = useColorFast(() => ({ background: getColorValue(props, name) }))

  return { backgroundColorClasses, backgroundColorStyles }
}
