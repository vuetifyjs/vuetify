import Vue from 'vue'

export default Vue.extend({
  name: 'sizeable',

  props: {
    large: Boolean,
    small: Boolean,
    xLarge: Boolean,
    xSmall: Boolean,
  },

  computed: {
    medium (): boolean {
      return Boolean(
        !this.xSmall &&
        !this.small &&
        !this.large &&
        !this.xLarge
      )
    },
    sizeableClasses (): object {
      return {
        'v-size--x-small': this.xSmall,
        'v-size--small': this.small,
        'v-size--default': this.medium,
        'v-size--large': this.large,
        'v-size--x-large': this.xLarge,
      }
    },
  },
})
