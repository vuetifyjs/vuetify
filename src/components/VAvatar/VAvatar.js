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
    data.class = [
      data.class,
      Colorable.options.methods.addBackgroundColorClassChecks.call(props, {}, props.color)
    ]

    return h('div', data, children)
  }
}
