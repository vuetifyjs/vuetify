import Vue, { VNode } from 'vue'
import VRowGroup from './VRowGroup'
import { PropValidator } from 'vue/types/options'
import { TableHeader } from './VDataTable'
import { VRowFunctional } from '.'
import VIcon from '../VIcon'

export default Vue.extend({
  name: 'v-row-expansion',

  functional: true,

  props: {
    expandIcon: {
      type: String,
      default: '$vuetify.icons.expand'
    },
    headers: Array as PropValidator<TableHeader[]>,
    item: Object,
    value: Boolean
  },

  render (h, { props, children, data }): VNode {
    const icon = h(VIcon, [props.expandIcon])

    return h(VRowGroup, {
      props: {
        open: props.value
      }
    }, [
      h(VRowFunctional, {
        staticClass: 'v-row-expansion',
        class: {
          'v-row-expansion--open': props.value
        },
        slot: 'header',
        props: {
          item: props.item,
          headers: props.headers
        },
        scopedSlots: {
          showExpand: p => h('div', {
            on: {
              click: () => {
                (data.on!.input as any)(!props.value)
              }
            }
          }, [icon]) as any
        }
      }),
      ...children
    ])
  }
})
