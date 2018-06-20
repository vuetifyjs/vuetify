import Vue from 'vue'
import { VNodeData } from 'vue/types/vnode'

function isCssColor (color: string | undefined | null | false): boolean {
  return !!color && !!color.match(/^(#|(rgb|hsl)a?\()/)
}

export default Vue.extend({
  name: 'colorable',

  props: {
    color: String
  },

  methods: {
    setBackgroundColor (color: string | undefined | null | false, data: VNodeData = {}): VNodeData {
      if (isCssColor(color)) {
        data['style'] = Object.assign(data['style'] || {}, {
          'background-color': `${color} !important`
        })
      } else if (color) {
        data['class'] = Object.assign(data['class'] || {}, {
          [color]: true
        })
      }

      return data
    },

    setTextColor (color: string | undefined, data: VNodeData = {}): VNodeData {
      if (isCssColor(color)) {
        data['style'] = Object.assign(data['style'] || {}, {
          'color': `${color} !important`,
          'border-color': `${color} !important`
        })
      } else if (color) {
        const [colorName, colorModifier] = color.toString().trim().split(' ')
        data['class'] = Object.assign(data['class'] || {}, {
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
