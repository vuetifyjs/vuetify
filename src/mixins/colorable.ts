import Vue from 'vue'

export default Vue.extend({
  name: 'colorable',

  props: {
    color: String
  },

  data () {
    return {
      defaultColor: undefined
    }
  },

  computed: {
    computedColor (): string | undefined {
      return this.color || this.defaultColor
    }
  },

  methods: {
    addBackgroundColorClassChecks<T, C extends string> (obj?: T, color?: C): T & Record<C, true> {
      const classes: any = Object.assign({}, obj)
      const selectedColor = color === undefined ? this.computedColor : color

      if (selectedColor) {
        classes[selectedColor] = true
      }

      return classes
    },
    addTextColorClassChecks (obj?: any, color?: string | null): any {
      const classes = Object.assign({}, obj)
      if (color === undefined) color = this.computedColor

      if (color) {
        const [colorName, colorModifier] = color.toString().trim().split(' ')
        classes[colorName + '--text'] = true
        colorModifier && (classes['text--' + colorModifier] = true)
      }

      return classes
    }
  }
})
