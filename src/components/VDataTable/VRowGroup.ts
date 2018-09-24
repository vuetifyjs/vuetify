import Vue, { VNode } from 'vue'

export default Vue.extend({
  name: 'v-row-group',

  functional: true,

  props: {
    open: {
      type: Boolean,
      default: true
    },
    headerClass: {
      type: String,
      default: 'v-row-group__header'
    },
    contentClass: String,
    summaryClass: {
      type: String,
      default: 'v-row-group__summary'
    }
  },

  render (h, { slots, props }): VNode {
    const computedSlots = slots()
    const children = []
    console.log(computedSlots)

    if (computedSlots.headerColumn) {
      children.push(h('tr', {
        staticClass: props.headerClass
      }, computedSlots.headerColumn))
    } else if (computedSlots.headerRow) {
      children.push(...computedSlots.headerRow)
    }

    if (computedSlots.content && props.open) children.push(...computedSlots.content)

    if (computedSlots.summaryColumn) {
      children.push(h('tr', {
        staticClass: props.summaryClass
      }, computedSlots.summaryColumn))
    } else if (computedSlots.summaryRow) {
      children.push(...computedSlots.summaryRow)
    }

    return children as any
  }
})
