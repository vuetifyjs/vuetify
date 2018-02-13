export default {
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
    computedColor () {
      return this.color || this.defaultColor
    }
  },

  methods: {
    addBackgroundColorClassChecks (obj = {}, color = this.computedColor) {
      const classes = Object.assign({}, obj)

      if (color) {
        classes[color] = true
      }

      return classes
    },
    addTextColorClassChecks (obj = {}, color = this.computedColor) {
      const classes = Object.assign({}, obj)

      if (color) {
        const [colorName, colorModifier] = color.trim().split(' ')
        classes[colorName + '--text'] = true
        colorModifier && (classes['text--' + colorModifier] = true)
      }

      return classes
    }
  }
}
