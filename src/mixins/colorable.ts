import Vue from 'vue'
import Component from 'vue-class-component'

declare type classObject = { [name: string]: boolean }

@Component({
  name: 'colorable',
  props: {
    color: String
  },
})
export default class Colorable extends Vue {
  color: string

  defaultColor: string = null

  get computedColor (): string {
    return this.color || this.defaultColor
  }

  addBackgroundColorClassChecks (obj: classObject = {}, color = this.computedColor): classObject {
    const classes = Object.assign({}, obj)

    if (color) {
      classes[color] = true
    }

    return classes
  }

  addTextColorClassChecks (obj: classObject = {}, color = this.computedColor): classObject {
    const classes = Object.assign({}, obj)

    if (color) {
      const [colorName, colorModifier] = color.trim().split(' ')
      classes[colorName + '--text'] = true
      colorModifier && (classes['text--' + colorModifier] = true)
    }

    return classes
  }
}
