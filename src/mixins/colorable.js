import Themeable from './themeable'
import { genColorClasses } from '../util/helpers'

export default {
  mixins: [Themeable],

  props: {
    color: String,
    textColor: String
  },

  data () {
    return {
      defaultColor: null,
      defaultTextColor: null
    }
  },

  computed: {
    classes () {},
    _bgColor () {
      const bg = {}
      const bgColor = this.color || this.defaultColor

      if (bgColor) {
        bg[genColorClasses(bgColor, this.dark)] = true
      }

      return bg
    },
    _textColor () {
      const txt = {}
      const txtColor = this.textColor || this.defaultTextColor

      if (txtColor) {
        const parts = txtColor.trim().split(' ')
        let color = `${genColorClasses(parts[0], this.dark)}--text`

        if (parts.length > 1) color += ' text--' + parts[1]

        txt[color] = true
      }

      return txt
    },
    _computedClasses () {
      return Object.assign({},
        this.classes,
        this._bgColor,
        this._textColor,
        this._themeColor
      )
    }
  }
}
