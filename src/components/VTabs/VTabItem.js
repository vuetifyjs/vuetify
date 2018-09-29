// Extensions
import VWindowItem from '../VWindow/VWindowItem'

// Mixins
import { deprecate } from '../../util/console'

/* @vue/component */
export default VWindowItem.extend({
  name: 'v-tab-item',

  props: {
    id: String
  },

  render (h) {
    const render = VWindowItem.options.render.call(this, h)

    // For backwards compatibility with v1.2
    /* istanbul ignore next */
    if (this.id) {
      deprecate('id', 'value', this)

      render.data.domProps = render.data.domProps || {}
      render.data.domProps.id = this.id
    }

    return render
  }
})
