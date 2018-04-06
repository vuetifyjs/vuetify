import Vue from 'vue'
import Component from 'vue-class-component'

declare type classObject = { [name: string]: boolean }

@Component({
  name: 'themeable',

  props: {
    dark: Boolean,
    light: Boolean
  }
})
export default class Themeable extends Vue {
  dark: boolean
  light: boolean

  get themeClasses (): classObject {
    return {
      'theme--light': this.light,
      'theme--dark': this.dark
    }
  }
}
