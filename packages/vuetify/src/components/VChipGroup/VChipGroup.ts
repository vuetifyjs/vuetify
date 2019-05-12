// Styles
import './VChipGroup.sass'

// Extensions
import { BaseSlideGroup } from '../VSlideGroup/VSlideGroup'

/* @vue/component */
export default BaseSlideGroup.extend({
  name: 'v-chip-group',

  provide () {
    return {
      chipGroup: this
    }
  },

  props: {
    activeClass: {
      type: String,
      default: 'grey lighten-1'
    },
    choice: Boolean,
    column: Boolean,
    outlined: Boolean
  },

  computed: {
    classes () {
      return {
        ...BaseSlideGroup.options.computed.classes.call(this),
        'v-chip-group': true,
        'v-chip-group--column': this.column
      }
    }
  },

  watch: {
    column (val) {
      if (val) this.scrollOffset = 0

      this.$nextTick(this.onResize)
    }
  }
})
