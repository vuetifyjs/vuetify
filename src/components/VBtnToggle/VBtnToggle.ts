// Styles
import '../../stylus/components/_button-toggle.styl'

// Extensions
import { VItemGroup } from '../VItemGroup'

/* @vue/component */
export default VItemGroup.extend({
  name: 'v-btn-toggle',

  provide (): object {
    return {
      btnToggle: this
    }
  },

  props: {
    activeClass: {
      type: String,
      default: 'v-btn--active'
    }
  },

  computed: {
    classes (): Record<string, boolean> {
      return {
        ...VItemGroup.options.computed.classes.call(this),
        'v-btn-toggle': true,
        'v-btn-toggle--only-child': this.selectedItems.length === 1,
        'v-btn-toggle--selected': this.selectedItems.length > 0
      }
    }
  }
})
