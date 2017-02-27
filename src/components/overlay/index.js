const Overlay = {
  props: {
    value: Boolean
  },

  computed: {
    classes () {
      return {
        'overlay': true,
        'overlay--active': this.value
      }
    }
  },

  render (h) {
    const data = {
      'class': this.classes
    }

    return h('div', data, [this.$slots.default])
  }
}

export default {
  Overlay
}
