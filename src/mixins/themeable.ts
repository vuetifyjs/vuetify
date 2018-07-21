import Vue from 'vue'

export interface IThemeable {
  light?: boolean
  dark?: boolean
}

export const getThemeClasses = (context: IThemeable) => {
  return {
    'theme--light': context.light,
    'theme--dark': context.dark
  }
}

export default Vue.extend({
  name: 'themeable',

  props: {
    dark: Boolean,
    light: Boolean
  },

  computed: {
    themeClasses (): object {
      return getThemeClasses(this)
    }
  }
})
