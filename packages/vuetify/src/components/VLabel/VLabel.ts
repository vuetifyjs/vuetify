// Styles
import './VLabel.sass'

// Mixins
import Colorable from '../../mixins/colorable'
import Themeable, { functionalThemeClasses } from '../../mixins/themeable'

// Types
import { VNode } from 'vue'
import mixins from '../../util/mixins'

// Helpers
import { convertToUnit } from '../../util/helpers'
import mergeData from '../../util/mergeData'

/* @vue/component */
export default mixins(Themeable).extend({
  name: 'v-label',

  functional: true,

  props: {
    absolute: Boolean,
    color: {
      type: String,
      default: 'primary',
    },
    disabled: Boolean,
    focused: Boolean,
    for: String,
    left: {
      type: [Number, String],
      default: 0,
    },
    right: {
      type: [Number, String],
      default: 'auto',
    },
    value: Boolean,
  },

  render (h, ctx): VNode {
    const { children, listeners, props, data } = ctx
    const newData = mergeData({
      staticClass: 'v-label',
      class: {
        'v-label--active': props.value,
        'v-label--is-disabled': props.disabled,
        ...functionalThemeClasses(ctx),
      },
      attrs: {
        for: props.for,
        'aria-hidden': !props.for,
      },
      on: listeners,
      style: {
        left: convertToUnit(props.left),
        right: convertToUnit(props.right),
        position: props.absolute ? 'absolute' : 'relative',
      },
      ref: 'label',
    }, data)

    return h('label', Colorable.options.methods.setTextColor(props.focused && props.color, newData), children)
  },
})
