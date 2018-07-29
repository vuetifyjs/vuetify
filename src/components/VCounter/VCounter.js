// Styles
import '../../stylus/components/_counters.styl'

// Mixins
import Themeable from '../../mixins/themeable'

/* @vue/component */
export default {
  name: 'v-counter',

  functional: true,

  mixins: [Themeable],

  props: {
    value: {
      type: [Number, String],
      default: ''
    },
    max: [Number, String]
  },

  render (h, { props }) {
    const max = parseInt(props.max, 10)
    const value = parseInt(props.value, 10)
    const content = max ? `${value} / ${max}` : props.value
    const isGreater = max && (value > max)

    return h('div', {
      staticClass: 'v-counter',
      class: {
        'error--text': isGreater,
        ...Themeable.options.computed.themeClasses.call(props)
      }
    }, content)
  }
}
