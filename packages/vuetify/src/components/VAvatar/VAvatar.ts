import './VAvatar.sass'

// Mixins
import Colorable from '../../mixins/colorable'
import { convertToUnit } from '../../util/helpers'

// Types
import { VNode } from 'vue'
import mixins from '../../util/mixins'

/* @vue/component */
export default mixins(Colorable).extend({
  name: 'v-avatar',

  functional: true,

  props: {
    // TODO: inherit these
    color: String,
    left: Boolean,
    right: Boolean,
    size: {
      type: [Number, String],
      default: 48
    },
    tile: Boolean
  },

  render (h, { data, props, children }): VNode {
    data.staticClass = (`v-avatar ${data.staticClass || ''}`).trim()

    if (props.tile) data.staticClass += ' v-avatar--tile'
    if (props.left) data.staticClass += ' v-avatar--left'
    if (props.right) data.staticClass += ' v-avatar--right'

    const size = convertToUnit(props.size)
    data.style = {
      height: size,
      width: size,
      ...data.style
    }

    return h('div', Colorable.options.methods.setBackgroundColor(props.color, data), children)
  }
})
