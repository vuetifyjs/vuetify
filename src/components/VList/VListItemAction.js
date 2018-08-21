/* @vue/component */
export default {
  name: 'v-list-tile-action',

  functional: true,

  props: {
    left: Boolean,
    right: Boolean
  },

  render (h, { data, children, props }) {
    data.staticClass = (`v-list__item__action ${data.staticClass || ''}`).trim()

    if (props.left) data.staticClass += ' v-list__item__action--left'
    if (props.right) data.staticClass += ' v-list__item__action--right'

    return h('div', data, children)
  }
}
