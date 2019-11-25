// Utilities
import { getVuetify } from '../../util/helpers'

// Types
import Vue from 'vue'
import { PropValidator, RenderContext } from 'vue/types/options'

/* eslint-disable-next-line no-use-before-define */
interface Themeable extends Vue {
  theme: { isDark: boolean }
}

export function functionalThemeClasses (context: RenderContext): object {
  const vm = {
    ...context.props,
    ...context.injections,
  }

  const isPropDark = Themeable.options.computed.isPropDark.call(vm)
  const isParentDark = Themeable.options.computed.isParentDark.call(vm)
  const isDark = isPropDark || isParentDark

  return Themeable.options.computed.themeClasses.call({ isDark })
}

/* @vue/component */
const Themeable = Vue.extend<Themeable>().extend({
  name: 'themeable',

  provide (): object {
    return { theme: this.themeableProvide }
  },

  inject: {
    theme: {
      default: { isDark: false },
    },
  },

  props: {
    dark: {
      type: Boolean,
      default: null,
    } as PropValidator<boolean | null>,
    light: {
      type: Boolean,
      default: null,
    } as PropValidator<boolean | null>,
  },

  data: () => ({
    themeableProvide: { isDark: false },
  }),

  computed: {
    // @deprecated - remove v3
    appIsDark (): boolean {
      return this.isAppDark
    },
    appThemeClasses (): Dictionary<boolean> {
      return {
        'theme--dark': this.isAppDark,
        'theme--light': !this.isAppDark,
      }
    },
    /** Used by menus and dialogs, inherits from v-app instead of the parent */
    isAppDark (): boolean {
      return getVuetify(this, 'theme.dark', false)
    },
    isDark (): boolean {
      return this.isPropDark || this.isParentDark
    },
    isDetachedDark (): boolean {
      return this.isPropDark || this.isAppDark
    },
    isPropDark (): boolean {
      return Boolean(this.dark && !this.light)
    },
    isParentDark (): boolean {
      return this.theme.isDark
    },
    themeClasses (): object {
      return {
        'theme--dark': this.isDark,
        'theme--light': !this.isDark,
      }
    },
    // @deprecated - remove v3
    rootIsDark (): boolean {
      return this.isAppDark
    },
    rootThemeClasses (): Dictionary<boolean> {
      return this.appThemeClasses
    },
  },

  watch: {
    isDark: {
      immediate: true,
      handler (newVal, oldVal) {
        if (newVal === oldVal) return

        this.themeableProvide.isDark = this.isDark
      },
    },
  },
})

export default Themeable
