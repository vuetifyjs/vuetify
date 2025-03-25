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

// Composables
export function useColor (colors: Ref<{ background?: ColorValue, text?: ColorValue }>) {
  return destructComputed(() => {
    const _colors = colors.value
    const classes: string[] = []
    const styles: CSSProperties = {}

    if (_colors.background) {
      if (isCssColor(_colors.background)) {
        styles.backgroundColor = _colors.background

        if (!_colors.text && isParsableColor(_colors.background)) {
          const backgroundColor = parseColor(_colors.background)
          if (backgroundColor.a == null || backgroundColor.a === 1) {
            const textColor = getForeground(backgroundColor)

            styles.color = textColor
            styles.caretColor = textColor
          }
        }
      } else {
        classes.push(`bg-${_colors.background}`)
      }
    }

    if (_colors.text) {
      if (isCssColor(_colors.text)) {
        styles.color = _colors.text
        styles.caretColor = _colors.text
      } else {
        classes.push(`text-${_colors.text}`)
      }
    }

    return { colorClasses: classes, colorStyles: styles }
  })
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

export function useColorFast (colors: MaybeRefOrGetter<{ background?: ColorValue, text?: ColorValue }>) {
  return destructComputedGetter(() => {
    const _colors = toValue(colors)
    const classes: string[] = []
    const styles: CSSProperties = {}

    if (_colors.background) {
      if (isCssColor(_colors.background)) {
        styles.backgroundColor = _colors.background

        if (!_colors.text && isParsableColor(_colors.background)) {
          const backgroundColor = parseColor(_colors.background)
          if (backgroundColor.a == null || backgroundColor.a === 1) {
            const textColor = getForeground(backgroundColor)

            styles.color = textColor
            styles.caretColor = textColor
          }
        }
      } else {
        classes.push(`bg-${_colors.background}`)
      }
    }

    if (_colors.text) {
      if (isCssColor(_colors.text)) {
        styles.color = _colors.text
        styles.caretColor = _colors.text
      } else {
        classes.push(`text-${_colors.text}`)
      }
    }

    return { colorClasses: classes, colorStyles: styles }
  })
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
  } = useColorFast(() => ({
    text: isRef(props) ? props.value : (name ? props[name] : null),
  }))

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
  } = useColorFast(() => ({
    background: isRef(props) ? props.value : (name ? props[name] : null),
  }))

  return { backgroundColorClasses, backgroundColorStyles }
}
