// Styles
import './VExpansionPanel.sass'

// Extensions
import { BaseItemGroup } from '../VItemGroup/VItemGroup'

// Utilities
import { breaking } from '../../util/console'

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
        'v-expansion-panel': true,
        'v-expansion-panel--accordion': this.accordion,
        'v-expansion-panel--focusable': this.focusable,
        'v-expansion-panel--popout': this.popout,
        'v-expansion-panel--inset': this.inset
      }
    }
  },

  created () {
    /* istanbul ignore next */
    if (this.expand) breaking('expand', 'multiple')

    /* istanbul ignore next */
    if (
      Array.isArray(this.value) &&
      this.value.length > 0 &&
      typeof this.value[0] === 'boolean'
    ) {
      breaking('<v-expansion-panel :value="[true, false]">', '<v-expansion-panel :value="[0]">')
    }
  }
})
