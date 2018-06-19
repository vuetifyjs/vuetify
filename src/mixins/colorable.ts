import Vue from 'vue'

const isCssColor = (color: string) => color.match(/^(#|(rgb|hsl)a?\()/)

export default Vue.extend({
  name: 'colorable',

  props: {
    color: String
  },

  methods: {
    setBackgroundColor<C extends string> (color: C, data: any): any {
      if (color && isCssColor(color)) {
        data['style'] = Object.assign({}, data['style'], {
          'background-color': `${color} !important`
        })
      } else if (color) {
        data['class'] = Object.assign({}, data['class'], {
          [color]: true
        })
      }

      return data
    },

    setTextColor<C extends string> (color: C, data: any): any {
      if (color && isCssColor(color)) {
        data['style'] = Object.assign({}, data['style'], {
          'color': `${color} !important`,
          'border-color': `${color} !important`
        })
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
