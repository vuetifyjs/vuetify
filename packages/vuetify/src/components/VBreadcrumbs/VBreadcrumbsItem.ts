import { defineComponent, h } from 'vue'
import Routable from '../../mixins/routable'

import type { VNode } from 'vue'

export default defineComponent({
  name: 'v-breadcrumbs-item',

  mixins: [Routable],

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

  render (): VNode {
    const { tag, data } = this.generateRouteLink()

    return h('li', [
      h(tag, {
        ...data,
        'aria-current': this.isActive && this.isLink ? 'page' : undefined,
      }, this.$slots.default?.()),
    ])
  },
})
