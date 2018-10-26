import '../../stylus/components/_subheaders.styl'

import Themeable from '../../mixins/themeable'

/* @vue/component */
export default {
  name: 'v-subheader',

  mixins: [Themeable],

  props: {
    inset: Boolean
  },

  render (h) {
    return h('div', {
      staticClass: 'v-subheader',
      class: {
        'v-subheader--inset': this.inset,
        ...this.themeClasses
      },
      attrs: this.$attrs,
      on: this.$listeners
    }, this.$slots.default)
  }
}
