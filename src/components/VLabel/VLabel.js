// Styles
import '../../stylus/components/_labels.styl'

// Mixins
import Colorable from '../../mixins/colorable'

export default {
  functional: true,

  name: 'v-label',

  props: {
    absolute: Boolean,
    color: {
      type: [Boolean, String],
      default: 'primary'
    },
    focused: Boolean,
    for: String,
    left: {
      type: [Number, String],
      default: 0
    },
    value: Boolean
  },

  render (h, { children, listeners, props }) {
    const data = {
      staticClass: 'v-label',
      'class': {
        'v-label--active': props.value
      },
      attrs: {
        for: props.for
      },
      on: listeners,
      style: {
        left: `${parseInt(props.left)}px`,
        position: props.absolute ? 'absolute' : 'relative'
      }
    }

    if (props.value) {
      data.style.transform = props.activeTransform
    }

    if (props.focused) {
      data.class = Colorable.methods.addTextColorClassChecks(data.class, props.color)
    }

    return h('label', data, children)
  }
}
