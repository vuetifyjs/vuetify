import Vue, { VNode } from 'vue'

import VCell from './VCell'
import VCheckbox from '../VCheckbox'

export default Vue.extend({
  name: 'v-cell-checkbox',

  model: {
    prop: 'inputValue',
    event: 'change'
  },

  props: {
    inputValue: Boolean,
    head: Boolean
  },

  inheritAttrs: false,

  render (h): VNode {
    const checkbox = h((VCheckbox as any), { // TODO: fix when converted to ts
      props: {
        hideDetails: true,
        inputValue: this.inputValue,
        ...this.$attrs
      },
      on: {
        change: (v: any) => this.$emit('change', v)
      }
    })

    return h(VCell, {
      props: {
        head: this.head
      },
      staticClass: 'v-cell-checkbox'
    }, [checkbox])
  }
})
