import Vue from 'vue'

export default Vue.extend({
  name: 'colorable',

  props: {
    color: String
  },

  data () {
    return {
      defaultColor: null
    }
  },

  computed: {
    computedColor (): string {
      return this.color || this.defaultColor
    }
  },

  methods: {
    addBackgroundColorClassChecks<T, C extends string> (obj?: T, color?: C): T & Record<C, true> {
      const classes: any = Object.assign({}, obj)
      if (color === undefined) color = this.computedColor as any

      if (color) {
        classes[color] = true
      }

      return classes
    },
    addTextColorClassChecks (obj?: any, color?: string): any {
      const classes = Object.assign({}, obj)
      if (color === undefined) color = this.computedColor

      if (color) {
        const [colorName, colorModifier] = color.trim().split(' ')
        classes[colorName + '--text'] = true
        colorModifier && (classes['text--' + colorModifier] = true)
      }

      return classes
    }
  }
})
