import Routable from '../../mixins/routable'

import mixins from '../../util/mixins'
import { VNode } from 'vue'

/* @vue/component */
export default mixins(Routable).extend({
  name: 'v-breadcrumbs-item',

  props: {
    // In a breadcrumb, the currently
    // active item should be dimmed
    activeClass: {
      type: String,
      default: 'v-breadcrumbs__item--disabled'
    }
  },

  computed: {
    classes (): object {
      return {
        'v-breadcrumbs__item': true,
        [this.activeClass]: this.disabled
      }
    }
  },

  render (h): VNode {
    const { tag, data } = this.generateRouteLink(this.classes)

    return h('li', [
      h(tag, data, this.$slots.default)
    ])
  }
})
