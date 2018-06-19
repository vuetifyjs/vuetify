export default {
  name: 'v-cell',

  functional: true,

  props: {
    head: {
      type: Boolean
    }
  },

  render (h, { data, slots, props }) {
    const resolvedSlots = slots()
    const staticClass = `${props.head ? 'v-head' : 'v-cell'} ${data.staticClass || ''}`

    return h('div', {
      staticClass,
      class: data.class,
      on: data.nativeOn
    }, resolvedSlots.default)
  }
}
