import Routable from '../../mixins/routable'

import mixins from '../../util/mixins'
import { getSlot } from '../../util/helpers'
import { VNode } from 'vue'

/* @vue/component */
export default mixins(Routable).extend({
  name: 'v-breadcrumbs-item',

  props: {
    // In a breadcrumb, the currently
    // active item should be dimmed
    activeClass: {
      type: String,
      default: 'v-breadcrumbs__item--disabled',
    },
    ripple: {
      type: [Boolean, Object],
      default: false,
    },
  },

  computed: {
    classes (): object {
      return {
        'v-breadcrumbs__item': true,
        [this.activeClass]: this.disabled,
      }
    },
  },

  render (h): VNode {
    const { tag, data } = this.generateRouteLink()

    return h('li', [
      h(tag, {
        ...data,
        attrs: {
          ...data.attrs,
          'aria-current': this.isActive && this.isLink ? 'page' : undefined,
        },
      }, getSlot(this)),
    ])
  },
})
