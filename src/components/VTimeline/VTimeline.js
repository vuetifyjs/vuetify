import '../../stylus/components/_timeline.styl'

import Themeable from '../../mixins/themeable'

export default {
  name: 'v-timeline',

  mixins: [Themeable],

  render (h) {
    return h(
      'ul',
      {
        staticClass: 'timeline',
        class: {
          ...this.themeClasses
        }
      },
      this.$slots.default
    )
  }
}
