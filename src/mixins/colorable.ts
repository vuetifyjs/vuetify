import Vue from 'vue'

export interface IColorable {
  color: string;
  // TODO Probably remove this from the mixin
  computedColor?: string;
}

const addBackgroundColorClassChecks = <T, C extends string>(context: IColorable, currentClasses?: T, color?: C): T & Record<C, true> => {
  const classes: any = Object.assign({}, currentClasses)
  const selectedColor = color === undefined ? context.computedColor : color

  if (selectedColor) {
    classes[selectedColor] = true
  }

  return classes
}

const addTextColorClassChecks = (context: IColorable, currentClasses?: any, color?: string | null): any => {
  const classes = Object.assign({}, currentClasses)
  if (color === undefined) color = context.computedColor

  if (color) {
    const [colorName, colorModifier] = color.toString().trim().split(' ')
    classes[colorName + '--text'] = true
    colorModifier && (classes['text--' + colorModifier] = true)
  }

  return classes
}

export default Vue.extend({
  name: 'colorable',

  props: {
    color: String
  },

  data() {
    return {
      defaultColor: undefined
    }
  },

  computed: {
    computedColor(): string | undefined {
      return this.color || this.defaultColor
    }
  },

  methods: {
    addBackgroundColorClassChecks<T, C extends string> (obj?: T, color?: C): T & Record<C, true> {
      return addBackgroundColorClassChecks(this, obj, color)
    },
    addTextColorClassChecks(obj?: any, color?: string | null): Record<string, true> {
      return addTextColorClassChecks(this, obj, color)
    }
  }
})
