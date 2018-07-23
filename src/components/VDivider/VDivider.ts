// Styles
import '../../stylus/components/_dividers.styl'

// Types
import { VNode } from 'vue'

// Mixins
import Themeable, { functionalThemeClasses } from '../../mixins/themeable'

export default Themeable.extend({
  name: 'v-divider',

  functional: true,

  props: {
    ...Themeable.options.props,
    inset: Boolean,
    vertical: Boolean
  },

  render (h, context): VNode {
    const { props, data } = context

    data.class = {
      'v-divider': true,
      'v-divider--inset': props.inset,
      'v-divider--vertical': props.vertical,
      ...functionalThemeClasses(context),
      ...data.class
    }

    return h('hr', data)
  }
})
