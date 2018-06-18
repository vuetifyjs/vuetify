import Vue from 'vue'

const isCssColor = (color: string) => color.match(/^(#|rgba?\(|hsla?\()/)

export default Vue.extend({
  name: 'colorable',

  props: {
    color: String
  },

  methods: {
    setBackground<C extends string> (color: C, data: any): any {
      if (color && isCssColor(color)) {
        data['style'] = data['style'] || {}
        data['style']['background-color'] = `${color} !important`
      } else if (color) {
        data['class'] = Object.assign({}, data['class'], {
          [color]: true
        })
      }

      return data
    },

    setText<C extends string> (color: C, data: any): any {
      if (color && isCssColor(color)) {
        data['style'] = data['style'] || {}
        data['style']['color'] = `${color} !important`
        data['style']['border-color'] = `${color} !important`
      } else if (color) {
        const [colorName, colorModifier] = color.toString().trim().split(' ')
        data['class'] = Object.assign({}, data['class'], {
          [colorName + '--text']: true
        })
        if (colorModifier) {
          data['class']['text--' + colorModifier] = !!colorModifier
        }
      }
      return data
    }
  }
})
