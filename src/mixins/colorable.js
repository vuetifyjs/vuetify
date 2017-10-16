export default {
  props: {
    color: String
  },

  computed: {
    computedColor () {
      return this.color || `accent--${this.dark ? 'dark' : 'light'}`
    }
  },

  methods: {
    _genAppendedClass (color) {
      if (![
        'primary',
        'secondary',
        'accent',
        'error',
        'info',
        'success',
        'warning'
      ].includes(color)) return color

      return `${color}--${this.dark ? 'dark' : 'light'}`
    },
    addBackgroundColorClassChecks (classes, prop = 'color') {
      if (this[prop]) {
        classes[this._genAppendedClass(this[prop])] = true
      }

      return classes
    },
    addTextColorClassChecks (classes, prop = 'color') {
      const parts = this[prop]
        ? this[prop].trim().split(' ')
        : [this.defaultColor]

      let color = `${this._genAppendedClass(parts[0])}--text`

      if (parts.length > 1) color += ' text--' + parts[1]

      classes[color] = !!this[prop] || this.defaultColor

      return classes
    }
  }
}
