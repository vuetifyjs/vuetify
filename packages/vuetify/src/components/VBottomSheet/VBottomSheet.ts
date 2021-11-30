import './VBottomSheet.sass'

// Extensions
import VDialog from '../VDialog/VDialog'

/* @vue/component */
export default VDialog.extend({
  name: 'v-bottom-sheet',

  props: {
    inset: Boolean,
    maxWidth: [String, Number],
    transition: {
      type: String,
      default: 'bottom-sheet-transition',
    },
  },

  computed: {
    classes (): object {
      return {
        ...VDialog.options.computed.classes.call(this),
        'v-bottom-sheet': true,
        'v-bottom-sheet--inset': this.inset,
      }
    },
  },
})
