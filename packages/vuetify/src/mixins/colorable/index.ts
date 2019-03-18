import Vue from 'vue'
import { VNodeData } from 'vue/types/vnode'

function isCssColor (color?: string | false): boolean {
  return !!color && !!color.match(/^(#|(rgb|hsl)a?\()/)
}

export default Vue.extend({
  name: 'colorable',

  props: {
    color: String
  },

  methods: {
    setBackgroundColor (color?: string | false, data: VNodeData = {}): VNodeData {
      if (isCssColor(color)) {
        data.style = {
          ...data.style,
          'background-color': `${color}`,
          'border-color': `${color}`
        }
      } else if (color) {
        data.class = {
          ...data.class,
          [color]: true
        }
      }

      return data
    },

    setTextColor (color?: string | false, data: VNodeData = {}): VNodeData {
      if (isCssColor(color)) {
        data.style = {
          ...data.style,
          'color': `${color}`,
          'caret-color': `${color}`
        }
      } else if (color) {
        const [colorName, colorModifier] = color.toString().trim().split(' ', 2) as (string | undefined)[]
        data.class = {
          ...data.class,
          [colorName + '--text']: true
        }
        if (colorModifier) {
          data.class['text--' + colorModifier] = true
        }
      }
      return data
    }
  }
})
