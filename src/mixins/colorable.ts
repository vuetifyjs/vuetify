import Vue from 'vue'

export interface ClassesObject {
  [key: string]: boolean
}

export type ColorString = string | undefined | null | false

function addColor (
  classes: ClassesObject = {},
  color?: ColorString
): ClassesObject {
  const obj = { ...classes }

  if (color) obj[color] = true

  return obj
}

export function addBackgroundColorClassChecks (
  classes: ClassesObject = {},
  color?: ColorString
): ClassesObject {
  return addColor(classes, color)
}

export function addTextColorClassChecks (
  classes: ClassesObject = {},
  color?: ColorString
): ClassesObject {
  if (color) {
    const [colorName, colorModifier] = color.toString().trim().split(' ')

    color = `${colorName}--text`

    if (colorModifier) color += ` text--${colorModifier}`
  }

  return addColor(classes, color)
}

export default Vue.extend({
  name: 'colorable',

  props: {
    color: String
  },

  data: () => ({
    defaultColor: undefined as undefined | string
  }),

  computed: {
    computedColor (): string | undefined {
      return this.color || this.defaultColor
    }
  },

  methods: {
    addBackgroundColorClassChecks (
      classes?: ClassesObject,
      color?: ColorString
    ): ClassesObject {
      return addBackgroundColorClassChecks(
        classes,
        color === undefined ? this.computedColor : color
      )
    },
    addTextColorClassChecks (
      classes?: ClassesObject,
      color?: ColorString
    ): ClassesObject {
      return addTextColorClassChecks(
        classes,
        color === undefined ? this.computedColor : color
      )
    }
  }
})
