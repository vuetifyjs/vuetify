// Mixins
import Colorable from '../../mixins/colorable'

// Utilities
import mixins from '../../util/mixins'

// Types
import { VNode } from 'vue/types'

/* @vue/component */
export default mixins(Colorable).extend({
  name: 'v-tabs-slider',

  render (h): VNode {
    return h('div', this.setBackgroundColor(this.color, {
      staticClass: 'v-tabs-slider',
    }))
  },
})
