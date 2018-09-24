// Components
import { VRowFunctional, VRowGroup } from '.'
import VIcon from '../VIcon'

// Types
import Vue, { VNode } from 'vue'
import { PropValidator } from 'vue/types/options'
import TableHeader from './TableHeader'

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
