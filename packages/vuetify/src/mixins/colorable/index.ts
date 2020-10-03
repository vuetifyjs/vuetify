import { defineComponent } from 'vue'
import { consoleError } from '../../util/console'
import { isCssColor } from '../../util/colorUtils'

export default defineComponent({
  name: 'colorable',

  props: {
    color: String,
  },

  methods: {
    setBackgroundColor (color?: string | false, data: Dictionary = {}): Dictionary {
      if (isCssColor(color)) {
        data.style = Array<any>().concat(data.style, {
          'background-color': `${color}`,
          'border-color': `${color}`,
        })
      } else if (color) {
        data.class = Array<any>().concat(data.class, {
          [color]: true,
        })
      }

      return data
    },

    setTextColor (color?: string | false, data: Dictionary = {}): Dictionary {
      if (isCssColor(color)) {
        data.style = Array<any>().concat(data.style, {
          color: `${color}`,
          'caret-color': `${color}`,
        })
      } else if (color) {
        const [colorName, colorModifier] = color.toString().trim().split(' ', 2) as (string | undefined)[]
        data.class = Array<any>().concat(data.class, {
          [colorName + '--text']: true,
        })
        if (colorModifier) {
          data.class.push('text--' + colorModifier)
        }
      }
      return data
    },
  },
})
