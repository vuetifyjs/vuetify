// Mixins
import { factory as GroupableFactory } from '../../mixins/groupable'

// Utilities
import { consoleWarn } from '../../util/console'

// Types
import { defineComponent, cloneVNode } from 'vue'
import type { VNode } from 'vue'

export const BaseItem = defineComponent({
  props: {
    activeClass: String,
    value: {
      required: false,
    },
  },

  data: () => ({
    isActive: false,
  }),

  methods: {
    toggle () {
      this.isActive = !this.isActive
    },
  },

  render (): VNode {
    if (!this.$slots.default) {
      consoleWarn('v-item is missing a default scopedSlot', this)

      return null as any
    }

    let element: VNode | VNode[]

    /* istanbul ignore else */
    if (this.$slots.default) {
      element = this.$slots.default({
        active: this.isActive,
        toggle: this.toggle,
      })
    }

    if (Array.isArray(element) && element.length === 1) {
      element = element[0]
    }

    if (!element || Array.isArray(element) || !element.tag) {
      consoleWarn('v-item should only contain a single element', this)

      return element as any
    }

    return cloneVNode(element, {
      [this.activeClass]: this.isActive,
    })
  },
})

export default defineComponent({
  name: 'v-item',

  mixins: [
    BaseItem,
    GroupableFactory('itemGroup', 'v-item', 'v-item-group'),
  ],
})
