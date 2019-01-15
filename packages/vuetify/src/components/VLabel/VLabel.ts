// Styles
import '../../stylus/components/_labels.styl'

// Mixins
import Colorable from '../../mixins/colorable'
import Themeable, { functionalThemeClasses } from '../../mixins/themeable'

// Types
import { VNode, RenderContext } from 'vue'
import mixins from '../../util/mixins'

// Helpers
import { convertToUnit } from '../../util/helpers'

/* @vue/component */
export default mixins(Themeable).extend({
  name: 'v-label',

  functional: true,

  props: {
    absolute: Boolean,
    color: {
      type: [Boolean, String],
      default: 'primary'
    },
    disabled: Boolean,
    focused: Boolean,
    for: String,
    left: {
      type: [Number, String],
      default: 0
    },
    right: {
      type: [Number, String],
      default: 'auto'
    },
    value: Boolean
  },

  render (h, ctx: RenderContext): VNode {
    const { children, listeners, props } = ctx
    const data = {
      staticClass: 'v-label',
      'class': {
        'v-label--active': props.value,
        'v-label--is-disabled': props.disabled,
        ...functionalThemeClasses(ctx)
      },
      attrs: {
        for: props.for,
        'aria-hidden': !props.for
      },
      on: listeners,
      style: {
        left: convertToUnit(props.left),
        right: convertToUnit(props.right),
        position: props.absolute ? 'absolute' : 'relative'
      }
    }

    return h('label', Colorable.options.methods.setTextColor(props.focused && props.color, data), children)
  }
})
