import Vue, { VNode, ComponentOptions } from 'vue'

import { VCheckbox } from '../VCheckbox'

import { wrapInArray } from '../../util/helpers'

export default Vue.extend({
  name: 'v-cell-checkbox',

  functional: true,

  model: {
    prop: 'inputValue',
    event: 'change'
  },

  props: {
    inputValue: Boolean,
    head: Boolean
  },

  render (h, { data, props }): VNode {
    const checkbox = h(VCheckbox as ComponentOptions<Vue>, {
      props: {
        hideDetails: true,
        inputValue: props.inputValue,
        ...data.attrs
      },
      on: {
        change: (v: any) => wrapInArray(data.on!.change).forEach(f => f(v))
      }
    })

    return h(props.head ? 'th' : 'td', {
      staticClass: 'v-cell-checkbox'
    }, [checkbox])
  }
})
