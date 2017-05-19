export default {
  name: 'card-row',

  props: {
    actions: Boolean,
    height: {
      type: String,
      default: 'auto'
    },
    img: String,
    stackedActions: Boolean
  },

  computed: {
    classes () {
      return {
        'card__row': true,
        'card__row--actions': this.actions,
        'card__row--actions-stacked': this.stackedActions,
      }
    },

    styles () {
      const styles = {
        height: this.height
      }

      if (this.img) {
        styles.background = `url(${this.img}) center center / cover no-repeat`
      }

      return styles
    }
  },

  render (h) {
    let data = {
      'class': this.classes,
      style: this.styles
    }

    if (this.actions) data.ref = 'actions'

    return h('div', data, this.$slots.default)
  }
}
