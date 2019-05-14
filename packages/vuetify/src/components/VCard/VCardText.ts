// Mixins
import Measurable from '../../mixins/measurable'

// Utilities
import { getSlot } from '../../util/helpers'

// Types
import { VNode } from 'vue'

/* @vue/component */
export default Measurable.extend({
  name: 'v-card-text',

  computed: {
    classes () {
      return {}
    },
    styles (): object {
      return this.measurableStyles
    }
  },

  render (h): VNode {
    return h('div', {
      staticClass: 'v-card__text',
      class: this.classes,
      style: this.styles
    }, getSlot(this))
  }
})
