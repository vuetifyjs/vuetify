// Styles
import '../../stylus/components/_avatars.styl'

// Mixins
import { convertToUnit } from '../../util/helpers'

// Types
import { VNode } from 'vue'
import { VPaper } from '../VPaper'

/* @vue/component */
export default VPaper.extend({
  name: 'v-avatar',

  props: {
    ...VPaper.options.props,
    // TODO: inherit these
    color: String,
    dark: Boolean,
    light: Boolean,
    elevation: [Number, String],

    size: {
      type: [Number, String],
      default: 48
    },
    tile: Boolean
  },

  render (h, ctx): VNode {
    const render = VPaper.options.render.call(null, h, ctx)
    const { props } = ctx

    render.data.staticClass += ' v-avatar'

    if (props.tile) render.data.staticClass += ' v-avatar--tile'

    if (props.height || props.width) return render

    const size = convertToUnit(props.size)

    render.data.style = {
      ...render.data.style,
      height: size,
      width: size
    }

    return render
  }
})
