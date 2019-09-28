// Styles
import '../../stylus/components/_subheaders.styl'

// Mixins
import BindsAttrs from '../../mixins/binds-attrs'
import Themeable from '../../mixins/themeable'
import mixins from '../../util/mixins'

// Types
import { VNode } from 'vue'

export default mixins(
  BindsAttrs,
  Themeable
  /* @vue/component */
).extend({
  name: 'v-subheader',

  props: {
    inset: Boolean
  },

  render (h): VNode {
    return h('div', {
      staticClass: 'v-subheader',
      class: {
        'v-subheader--inset': this.inset,
        ...this.themeClasses
      },
      attrs: this.attrs$,
      on: this.listeners$
    }, this.$slots.default)
  }
})
