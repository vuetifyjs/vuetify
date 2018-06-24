import Vue from 'vue'

export default Vue.extend({
  name: 'themeable',

  provide () {
    return {
      theme: this
    }
  },

  inject: {
    theme: {
      default: {
        dark: false,
        light: false
      }
    }
  },

  props: {
    dark: Boolean,
    light: Boolean
  },

  computed: {
    themeClasses (): any {
      return {
        'theme--dark': (this.dark && !this.light) || this.theme.dark,
        'theme--light': (this.light && !this.dark) || this.theme.light
      }
    }
  }
})
