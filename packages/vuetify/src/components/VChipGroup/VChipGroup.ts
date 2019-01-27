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
    multiple: {
      type: Boolean,
      default: true
    },
    showArrows: {
      type: Boolean,
      default: true
    }
  },

  computed: {
    classes () {
      return {
        ...BaseSlideGroup.options.computed.classes.call(this),
        'v-chip-group': true
      }
    }
  }
})
