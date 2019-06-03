// Extensions
import VWindow from '../VWindow/VWindow'

/* @vue/component */
export default VWindow.extend({
  name: 'v-tabs-items',

  props: {
    mandatory: {
      type: Boolean,
      default: false,
    },
  },
})
