export default {
  name: 'card',

  props: {
    height: {
      type: String,
      default: 'auto'
    },
    horizontal: Boolean,
    img: String,
    hover: Boolean,
    raised: Boolean
  },

  computed: {
    classes () {
      return {
        'card': true,
        'card--horizontal': this.horizontal,
        'card--hover': this.hover,
        'card--raised': this.raised,
      }
    },
  },

  render (h, context) {
    const data = {
      'class': this.classes,
      'style': {
        height: this.height,
      }
    }

    if (this.img) {
      data.style.background = `url(${this.img}) center center / cover no-repeat`
    }

    return h('div', data, this.$slots.default)
  }
}
