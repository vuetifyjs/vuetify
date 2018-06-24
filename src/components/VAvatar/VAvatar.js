import '../../stylus/components/_avatars.styl'

// Mixins
import Colorable from '../../mixins/colorable'
import { convertToUnit } from '../../util/helpers'

/* @vue/component */
export default {
  name: 'v-avatar',

  functional: true,

  mixins: [Colorable],

  props: {
    size: {
      type: [Number, String],
      default: 48
    },
    tile: Boolean
  },

  render (h, { data, props, children }) {
    data.staticClass = (`v-avatar ${data.staticClass || ''}`).trim()
    data.style = data.style || {}

    if (props.tile) data.staticClass += ' v-avatar--tile'

    const size = convertToUnit(props.size)
    data.style.height = size
    data.style.width = size

    return h('div', Colorable.options.methods.setBackgroundColor(props.color, data), children)
  }
}
