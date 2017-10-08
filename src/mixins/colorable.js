export default {
  props: {
    color: String
  },
  methods: {
    addBackgroundColorClassChecks (classes, prop = 'color') {
      if (this[prop]) {
        classes[this[prop]] = true
      }
      return classes
    },
    addTextColorClassChecks (classes, prop = 'color') {
      const parts = this[prop] ? this[prop].trim().split(' ') : ['']
      let color = parts[0] + '--text'
      if (parts.length > 1) color += ' text--' + parts[1]
      classes[color] = !!this[prop]
      return classes
    }
  }
}
