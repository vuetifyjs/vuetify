// Styles
import '../../stylus/components/_counters.styl'

// Mixins
import Themeable, { functionalThemeClasses } from '../../mixins/themeable'

// Types
import { VNode, RenderContext } from 'vue'
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

  render (h, ctx: RenderContext): VNode {
    const { props } = ctx
    const max = parseInt(props.max, 10)
    const value = parseInt(props.value, 10)
    const content = max ? `${value} / ${max}` : props.value
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
