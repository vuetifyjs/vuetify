import Vue from 'vue'

export default Vue.extend({
  name: 'clearable',

  props: {
    clearable: Boolean,
    resetValue: undefined as any,
  },
})
