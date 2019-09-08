// Libraries
import Vue from 'vue'

// Mixins
import Colorable from '../../mixins/colorable'

// Types
import { VNode } from 'vue/types'

/* @vue/component */
export default Vue.extend({
  name: 'v-tabs-slider',

  functional: true,

  props: {
    color: String,
  },

  render (h, { props }): VNode {
    return h('div', Colorable.options.methods.setBackgroundColor(props.color, {
      staticClass: 'v-tabs-slider',
    }))
  },
})
