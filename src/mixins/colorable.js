export default {
  props: {
    color: String
  },

  data () {
    return {
      defaultColor: null
    }
  },

  computed: {
    computedColor () {
      return this.color || this.defaultColor
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
    addBackgroundColorClassChecks (classes = {}, prop = 'computedColor') {
      if (prop && this[prop]) {
        classes[this._genAppendedClass(this[prop])] = true
      }

      return classes
    },
    addTextColorClassChecks (classes = {}, prop = 'computedColor') {
      if (prop && this[prop]) {
        const parts = this[prop].trim().split(' ')

        let color = `${this._genAppendedClass(parts[0])}--text`

        if (parts.length > 1) color += ' text--' + parts[1]

        classes[color] = !!this[prop]
      }

      return classes
    }
  }
}
