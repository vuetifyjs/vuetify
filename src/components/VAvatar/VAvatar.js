require('../../stylus/components/_avatars.styl')

// Mixins
import Colorable from '../../mixins/colorable'

export default {
  name: 'v-avatar',

  functional: true,

  props: {
    color: String,
    size: {
      type: [Number, String],
      default: 48
    },
    tile: Boolean
  },

  render (h, { data, props, children }) {
    data.staticClass = (`avatar ${data.staticClass || ''}`).trim()
    data.style = data.style || {}

    if (props.tile) data.staticClass += ' avatar--tile'

    const size = `${parseInt(props.size)}px`
    data.style.height = size
    data.style.width = size
    data.class = Colorable.methods.addBackgroundColorClassChecks.call(props, {}, 'color')

    return h('div', data, children)
  }
}
