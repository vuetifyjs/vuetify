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
      type: String,
      default: 'primary'
    },
    focused: Boolean,
    for: String,
    value: Boolean
  },

  render (h, { children, props }) {
    const data = {
      staticClass: 'v-label',
      'class': {
        'v-label--active': props.value
      },
      attrs: {
        for: props.for
      },
      style: {
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
