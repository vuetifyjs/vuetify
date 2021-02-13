// Utilities
import { computed, isRef } from 'vue'
import { isCssColor } from '@/util/colorUtils'

// Types
import type { Ref } from 'vue'

type ColorStyles = {
  color?: string
  'caret-color'?: string
  'background-color'?: string
}

type ColorValue = string | null | undefined

type TextColorData = {
  textColorClasses: Ref<string[]>
  textColorStyles: Ref<Omit<ColorStyles, 'background-color'>>
}

type BackgroundColorData = {
  backgroundColorClasses: Ref<string[]>
  backgroundColorStyles: Ref<Pick<ColorStyles, 'background-color'>>
}

export function useColor (colors: Ref<{ background?: string | null, text?: string | null }>) {
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
    const styles: ColorStyles = {}

    if (colors.value.background && backgroundIsCssColor.value) {
      styles['background-color'] = colors.value.background
    }

    if (colors.value.text && textIsCssColor.value) {
      styles.color = colors.value.text
      styles['caret-color'] = colors.value.text
    }

    return styles
  })

  return { colorClasses, colorStyles }
}

export function useTextColor (color: Ref<ColorValue>): TextColorData
export function useTextColor <T extends Record<string, any>>(props: T, name: keyof T): TextColorData
export function useTextColor <T extends Record<string, any>> (props: T | Ref<ColorValue>, name?: keyof T): TextColorData {
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
export function useBackgroundColor <T extends Record<string, any>>(props: T, name: keyof T): BackgroundColorData
export function useBackgroundColor <T extends Record<string, any>> (props: T | Ref<ColorValue>, name?: keyof T): BackgroundColorData {
  const colors = computed(() => ({
    background: isRef(props) ? props.value : (name ? props[name] : null),
  }))

  const {
    colorClasses: backgroundColorClasses,
    colorStyles: backgroundColorStyles,
  } = useColor(colors)

  return { backgroundColorClasses, backgroundColorStyles }
}
