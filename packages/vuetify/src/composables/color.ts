// Utilities
import { toValue } from 'vue'
import { destructComputed, hasLightForeground, isCssColor, isParsableColor, parseColor } from '@/util'

// Types
import type { CSSProperties, MaybeRefOrGetter, Ref } from 'vue'

export type ColorValue = string | false | null | undefined

export interface TextColorData {
  textColorClasses: Ref<string[]>
  textColorStyles: Ref<CSSProperties>
}

export interface BackgroundColorData {
  backgroundColorClasses: Ref<string[]>
  backgroundColorStyles: Ref<CSSProperties>
}

// Composables
export function useColor (colors: MaybeRefOrGetter<{ background?: ColorValue, text?: ColorValue }>) {
  return destructComputed(() => {
    const {
      class: colorClasses,
      style: colorStyles,
    } = computeColor(colors)

    return { colorClasses, colorStyles }
  })
}

export function useTextColor (color: MaybeRefOrGetter<ColorValue>): TextColorData {
  const {
    colorClasses: textColorClasses,
    colorStyles: textColorStyles,
  } = useColor(() => ({
    text: toValue(color),
  }))

  return { textColorClasses, textColorStyles }
}

export function useBackgroundColor (color: MaybeRefOrGetter<ColorValue>): BackgroundColorData {
  const {
    colorClasses: backgroundColorClasses,
    colorStyles: backgroundColorStyles,
  } = useColor(() => ({
    background: toValue(color),
  }))

  return { backgroundColorClasses, backgroundColorStyles }
}

export function computeColor (colors: MaybeRefOrGetter<{ background?: ColorValue, text?: ColorValue }>) {
  const _colors = toValue(colors)
  const classes: string[] = []
  const styles: CSSProperties = {}

  if (_colors.background) {
    if (isCssColor(_colors.background)) {
      styles.backgroundColor = _colors.background

      if (!_colors.text && isParsableColor(_colors.background)) {
        const backgroundColor = parseColor(_colors.background)
        if (backgroundColor.a == null || backgroundColor.a === 1) {
          classes.push(hasLightForeground(backgroundColor)
            ? 'v-theme-on-dark'
            : 'v-theme-on-light'
          )
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

  return { class: classes, style: styles }
}
