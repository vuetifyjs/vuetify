import Vue from 'vue'

export default Vue.extend({
  name: 'sizeable',

  props: {
    large: Boolean,
    size: {
      type: [Number, String]
    },
    small: Boolean,
    xLarge: Boolean,
    xSmall: Boolean
  },

  computed: {
    sizeableClasses (): object {
      const medium = Boolean(
        !this.xSmall &&
        !this.small &&
        !this.large &&
        !this.xLarge
      )

      return {
        'v-size--x-small': this.xSmall,
        'v-size--small': this.small,
        'v-size--default': medium,
        'v-size--large': this.large,
        'v-size--x-large': this.xLarge
      }
    }
  }
})
