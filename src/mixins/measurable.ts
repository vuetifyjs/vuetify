import Vue from 'vue'

export default Vue.extend({
  name: 'measurable',

  props: {
    height: [Number, String],
    maxHeight: [Number, String],
    maxWidth: [Number, String],
    width: [Number, String]
  }
})
