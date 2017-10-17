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
    addBackgroundColorClassChecks (classes, prop = 'computedColor') {
      if (this[prop]) {
        classes[this[prop]] = true
      }
      return classes
    },
    addTextColorClassChecks (classes, prop = 'computedColor') {
      if (this[prop]) {
        const parts = this[prop] ? this[prop].trim().split(' ') : ['']
        let color = parts[0] + '--text'
        if (parts.length > 1) color += ' text--' + parts[1]
        classes[color] = !!this[prop]
      }
      return classes
    }
  }
}
