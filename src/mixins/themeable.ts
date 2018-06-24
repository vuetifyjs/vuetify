import Vue from 'vue'

export default Vue.extend({
  name: 'themeable',

  provide () {
    return {
      theme: this.theme$
    }
  },

  inject: {
    injectedTheme: {
      from: 'theme',
      default () {
        return this.$vuetify.theme
      }
    }
  },

  data: vm => ({
    theme$: (vm.dark || vm.light)
      ? { dark: vm.dark, light: vm.light }
      : vm.injectedTheme
  }),

  props: {
    dark: Boolean,
    light: Boolean
  },

  computed: {
    themeClasses (): any {
      return {
        'theme--light': !this.theme$.dark,
        'theme--dark': this.theme$.dark
      }
    }
  }
})
