// Styles
import './VChipGroup.sass'

// Extensions
import { BaseSlideGroup } from '../VSlideGroup/VSlideGroup'

// Mixins
import Colorable from '../../mixins/colorable'

// Utilities
import mixins from '../../util/mixins'

/* @vue/component */
export default mixins(
  BaseSlideGroup,
  Colorable
).extend({
  name: 'v-chip-group',

  provide () {
    return {
      chipGroup: this,
    }
  },

  props: {
    column: Boolean,
  },

  computed: {
    classes () {
      return {
        ...BaseSlideGroup.options.computed.classes.call(this),
        'v-chip-group': true,
        'v-chip-group--column': this.column,
      }
    },
  },

  watch: {
    column (val) {
      if (val) this.scrollOffset = 0

      this.$nextTick(this.onResize)
    },
  },

  methods: {
    genData () {
      return this.setTextColor(this.color, {
        ...BaseSlideGroup.options.methods.genData.call(this),
      })
    },
  },
})
