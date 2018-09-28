// Extensions
import { BaseWindowItem } from '../VWindow/VWindowItem'

// Mixins
import {
  factory as GroupableFactory
} from '../../mixins/groupable'
import { deprecate } from '../../util/console'

/* @vue/component */
export default {
  name: 'v-tab-item',

  mixins: [
    BaseWindowItem,
    GroupableFactory('windowGroup', 'v-tab-item', 'v-tabs-items')
  ],

  props: {
    id: String
  },

  render (h) {
    const render = BaseWindowItem.options.render.call(this, h)

    // For backwards compatibility with v1.2
    if (this.id) {
      deprecate('id', 'value', this)

      render.data.domProps = render.data.domProps || {}
      render.data.domProps.id = this.id
    }

    return render
  }
}
