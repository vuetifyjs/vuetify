// Types
import Vue from 'vue'
import { ClassesObject } from './../../types'

export function addTheme (
  light: boolean,
  dark: boolean
): ClassesObject {
  return {
    'theme--dark': dark,
    'theme--light': light
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
      return addTheme(this.light, this.dark)
    }
  }
})
