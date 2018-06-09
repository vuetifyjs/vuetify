import Vue from 'vue'

export default Vue.extend({
  name: 'themeable',

  props: {
    dark: Boolean,
    light: Boolean
  },

  computed: {
    themeClasses (): any {
      return {
        'theme--light': this.light,
        'theme--dark': this.dark
      }
    }
  }
})
