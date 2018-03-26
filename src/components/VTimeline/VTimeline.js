import '../../stylus/components/_timeline.styl'

import Themeable from '../../mixins/themeable'

export default {
  name: 'v-timeline',

  mixins: [Themeable],

  render (h) {
    return h('section', { staticClass: 'timeline' }, [
      h(
        'div',
        {
          staticClass: 'timeline__container',
          class: {
            ...this.themeClasses
          }
        },
        this.$slots.default
      )
    ])
  }
}
