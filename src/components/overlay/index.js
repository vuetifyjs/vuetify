const Overlay = {
  props: {
    active: Boolean
  },

  computed: {
    classes () {
      return {
        'overlay': true,
        'overlay--active': this.active
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
