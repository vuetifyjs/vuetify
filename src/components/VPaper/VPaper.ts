import '../../stylus/components/_paper.styl'

import Vue, { VNode } from 'vue'

// Mixins
import Colorable, { addBackgroundColorClassChecks } from '../../mixins/colorable'
import Themeable, { getThemeClasses } from '../../mixins/themeable'
import Elevatable, { getElevationClasses } from '../../mixins/elevatable'

export default Vue.extend({
  name: 'v-paper',

  functional: true,

  props: {
    ...Colorable.options.props,
    ...Themeable.options.props,
    ...Elevatable.options.props,
    square: Boolean,
    tag: {
      type: String,
      default: 'div'
    }
  },

  render (h, context: any): VNode {
    const data = {
      class: addBackgroundColorClassChecks(context, {
        'v-paper': true,
        'v-paper--square': context.props.square,
        ...getThemeClasses(context),
        ...getElevationClasses(context)
      })
    }

    return h(context.tag, data, context.children)
  }
})
