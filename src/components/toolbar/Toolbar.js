import Themeable from '~mixins/themeable'

export default {
  mixins: [Themeable],

  props: {
    absolute: Boolean,
    card: Boolean,
    dense: Boolean,
    extended: Boolean,
    fixed: Boolean,
    flat: Boolean,
    floating: Boolean,
    prominent: Boolean
  },

  computed: {
    classes () {
      return {
        'toolbar': true,
        'elevation-0': this.flat,
        'toolbar--absolute': this.absolute,
        'toolbar--card': this.card,
        'toolbar--dense': this.dense,
        'toolbar--fixed': this.fixed,
        'toolbar--floating': this.floating,
        'toolbar--prominent': this.prominent,
        'theme--dark': this.dark,
        'theme--light': this.light
      }
    }
  },

  render (h) {
    const children = []
    const data = {
      'class': this.classes
    }

    children.push(h('div', {
      'class': 'toolbar__content'
    }, this.$slots.default))

    if (this.$slots.extension ||
      this.extended
    ) {
      children.push(h('div', {
        'class': 'toolbar__extension'
      }, this.$slots.extension))
    }

    return h('nav', data, children)
  }
}
