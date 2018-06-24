import Vue from 'vue'
import { PropValidator } from 'vue/types/options'

interface Themeable extends Vue {
  theme: {
    isDark: boolean
  }
}

/* @vue/component */
export default Vue.extend<Themeable>().extend({
  name: 'themeable',

  provide (): object {
    return {
      theme: this.themeableProvide
    }
  },

  inject: {
    theme: {
      default: {
        isDark: false
      }
    }
  },

  props: {
    dark: {
      type: Boolean,
      default: null
    } as PropValidator<boolean | null>,
    light: {
      type: Boolean,
      default: null
    } as PropValidator<boolean | null>
  },

  data () {
    return {
      themeableProvide: {
        isDark: false
      }
    }
  },

  computed: {
    isDark (): boolean {
      if (this.dark === true) {
        // explicitly dark
        return true
      } else if (this.light === true) {
        // explicitly light
        return false
      } else {
        // inherit from parent, or default false if there is none
        return this.theme.isDark
      }
    },
    themeClasses (): Record<string, boolean> {
      return {
        'theme--dark': this.isDark,
        'theme--light': !this.isDark
      }
    }
  },

  watch: {
    isDark: {
      handler (newVal, oldVal) {
        if (newVal !== oldVal) {
          this.themeableProvide.isDark = this.isDark
        }
      },
      immediate: true
    }
  }
})
