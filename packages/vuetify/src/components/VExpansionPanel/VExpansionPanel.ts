// Styles
import './VExpansionPanel.sass'

// Extensions
import { BaseItemGroup } from '../VItemGroup/VItemGroup'

// Utilities
import { deprecate } from '../../util/console'

// Types
import { VNode } from 'vue'

/* @vue/component */
export default BaseItemGroup.extend({
  name: 'v-expansion-panel',

  provide (): object {
    return {
      expansionPanel: this
    }
  },

  props: {
    accordion: Boolean,
    disabled: Boolean,
    readonly: Boolean,
    expand: Boolean,
    focusable: Boolean,
    inset: Boolean,
    popout: Boolean
  },

  computed: {
    classes (): object {
      return {
        ...BaseItemGroup.options.computed.classes.call(this),
        'v-expansion-panel--accordion': this.accordion,
        'v-expansion-panel--focusable': this.focusable,
        'v-expansion-panel--popout': this.popout,
        'v-expansion-panel--inset': this.inset
      }
    }
  },

  created () {
    if (this.expand) deprecate('expand', 'multiple')
  },

  render (h): VNode {
    return h('ul', {
      staticClass: 'v-expansion-panel',
      class: this.classes
    }, this.$slots.default)
  }
})
