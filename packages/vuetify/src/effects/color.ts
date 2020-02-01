import { computed, ComputedRef, isRef, Ref } from 'vue'

export interface ColorProps {
  color?: string
}

export const colorProps = (defaults: Partial<ColorProps> = {}) => ({
  color: {
    type: String,
    default: defaults.color,
  },
})

const isCssColor = (color: string): boolean => !!color && !!color.match(/^(#|(rgb|hsl)a?\()/)
const isProps = <T>(props: T | RefValue): props is T => !isRef(props)

type PropValue = string | null | undefined
type RefValue = Readonly<Ref<PropValue>>
type ColorData = { class: Record<string, boolean> } | { style: Record<string, string> } | {}

type TextColor = {
  textColor: ComputedRef<ColorData>
}

export function useTextColor (props: ColorProps | RefValue): TextColor
export function useTextColor<T extends Record<string, any>> (props: T, prop: keyof T): TextColor
export function useTextColor<T extends Record<string, any>> (props: T | RefValue, prop: keyof T = 'color'): TextColor {
  const textColor = computed(() => {
    const color: PropValue = isProps(props) ? props[prop] : props.value

    if (!color) return {}

    if (isCssColor(color)) {
      return {
        style: {
          color,
          'caret-color': color,
        },
      }
    }

    const [colorName, colorModifier] = color.toString().trim().split(' ', 2)

    return {
      class: {
        [`${colorName}--text`]: true,
        ...(colorModifier && { [`text--${colorModifier}`]: true }),
      },
    }
  })

  return { textColor }
}

type BackgroundColor = {
  backgroundColor: ComputedRef<ColorData>
}

export function useBackgroundColor (props: ColorProps | RefValue): BackgroundColor
export function useBackgroundColor<T extends Record<string, any>> (props: T, prop: keyof T): BackgroundColor
export function useBackgroundColor<T extends Record<string, any>> (props: T | RefValue, prop: keyof T = 'color'): BackgroundColor {
  const backgroundColor = computed(() => {
    const color: PropValue = isProps(props) ? props[prop] : props.value

    if (!color) return {}

    if (isCssColor(color)) {
      return {
        style: { 'background-color': color },
      }
    }

    return {
      class: { [color]: true },
    }
  })

  return { backgroundColor }
}
