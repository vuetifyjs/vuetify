/* @vue/component */
export default {
  name: 'v-list-tile-action',

  functional: true,

  render (h, { data, children }) {
    data.staticClass = data.staticClass ? `v-list__tile__action ${data.staticClass}` : 'v-list__tile__action'
    if ((children || []).length > 1) data.staticClass += ' v-list__tile__action--stack'

    return h('div', data, children)
  }
}
