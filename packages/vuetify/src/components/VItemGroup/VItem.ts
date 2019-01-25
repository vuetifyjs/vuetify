// Mixins
import { factory as GroupableFactory } from '../../mixins/groupable'

// Utilities
import mixins from '../../util/mixins'
import { consoleWarn } from '../../util/console'

// Types
import Vue from 'vue'
import { VNode, VNodeChildrenArrayContents } from 'vue/types/vnode'

/* @vue/component */
export const BaseItem = Vue.extend({
  props: {
    activeClass: String,
    value: {
      required: false
    }
  },

  data: () => ({
    isActive: false
  }),

  methods: {
    toggle () {
      this.isActive = !this.isActive
    }
  },

  render (): VNode {
    if (!this.$scopedSlots.default) {
      consoleWarn('v-item is missing a default scopedSlot', this)

      return null as any
    }

    let element: VNode | VNodeChildrenArrayContents | string | undefined

    /* istanbul ignore else */
    if (this.$scopedSlots.default) {
      element = this.$scopedSlots.default({
        active: this.isActive,
        toggle: this.toggle
      })
    }

    if (!element || typeof element === 'string' || Array.isArray(element)) {
      consoleWarn('v-item should only contain a single element', this)

      return element as any
    }

    element.data = element.data || {}
    element.data!.class = [
      element.data!.class,
      { [this.activeClass]: this.isActive }
    ]

    return element
  }
})

export default mixins(
  BaseItem,
  GroupableFactory('itemGroup', 'v-item', 'v-item-group')
).extend({
  name: 'v-item'
})
