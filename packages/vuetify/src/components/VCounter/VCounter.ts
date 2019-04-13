// Styles
import '../../stylus/components/_counters.styl'

// Mixins
import Themeable, { functionalThemeClasses } from '../../mixins/themeable'

// Types
import { VNode } from 'vue'
import mixins from '../../util/mixins'

/* @vue/component */
export default mixins(Themeable).extend({
  name: 'v-counter',

  functional: true,

  props: {
    value: {
      type: [Number, String],
      default: ''
    },
    max: [Number, String]
  },

  render (h, ctx): VNode {
    const { props } = ctx
    const max = parseInt(props.max, 10)
    const value = parseInt(props.value, 10)
    const content = max ? `${value} / ${max}` : String(props.value)
    const isGreater = max && (value > max)

    return h('div', {
      staticClass: 'v-counter',
      class: {
        'error--text': isGreater,
        ...functionalThemeClasses(ctx)
      }
    }, content)
  }
})
