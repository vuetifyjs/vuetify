export default {
  props: {
    color: String
  },
  methods: {
    addColorClassChecks (classes) {
      const parts = this.color ? this.color.trim().split(' ') : ['']
      let color = parts[0] + '--text'
      if (parts.length > 1) color += ' text--' + parts[1]
      classes[color] = !!this.color
      return classes
    }
  }
}
