export default {
  props: {
    color: String
  },
  methods: {
    addBackgroundColorClassChecks (classes) {
      if (this.color) {
        classes[this.color] = true
      }
      return classes
    },
    addTextColorClassChecks (classes) {
      const parts = this.color ? this.color.trim().split(' ') : ['']
      let color = parts[0] + '--text'
      if (parts.length > 1) color += ' text--' + parts[1]
      classes[color] = !!this.color
      return classes
    }
  }
}
