import Vue, { VNode } from 'vue'

export default Vue.extend({
  name: 'row-group',

  functional: true,

  props: {
    value: {
      type: Boolean,
      default: true,
    },
    headerClass: {
      type: String,
      default: 'v-row-group__header',
    },
    contentClass: String,
    summaryClass: {
      type: String,
      default: 'v-row-group__summary',
    },
  },

  render (h, { slots, props }): VNode {
    const computedSlots = slots()
    const children = []

    if (computedSlots['column.header']) {
      children.push(h('tr', {
        staticClass: props.headerClass,
      }, computedSlots['column.header']))
    } else if (computedSlots['row.header']) {
      children.push(...computedSlots['row.header'])
    }

    if (computedSlots['row.content'] && props.value) children.push(...computedSlots['row.content'])

    if (computedSlots['column.summary']) {
      children.push(h('tr', {
        staticClass: props.summaryClass,
      }, computedSlots['column.summary']))
    } else if (computedSlots['row.summary']) {
      children.push(...computedSlots['row.summary'])
    }

    return children as any
  },
})
