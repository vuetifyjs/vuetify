import Vue from 'vue'

export default Vue.extend({
  name: 'sizeable',

  props: {
    large: Boolean,
    medium: Boolean,
    size: {
      type: [Number, String]
    },
    small: Boolean,
    xLarge: Boolean,
    xSmall: Boolean
  },

  computed: {
    sizeableClasses (): object {
      return {
        'v-size--x-small': this.xSmall,
        'v-size--small': this.small,
        'v-size--medium': this.medium,
        'v-size--large': this.large,
        'v-size--x-large': this.xLarge
      }
    }
  }
})
