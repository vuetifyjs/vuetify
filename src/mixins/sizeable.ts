import Vue from 'vue'

export default Vue.extend({
  props: {
    large: Boolean,
    medium: Boolean,
    size: {
      type: [Number, String]
    },
    small: Boolean,
    xLarge: Boolean
  }
})
