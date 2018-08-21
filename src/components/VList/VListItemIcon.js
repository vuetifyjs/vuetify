/* @vue/component */
export default {
  name: 'v-list-tile-icon',

  functional: true,

  props: {
    left: Boolean,
    right: Boolean
  },

  render (h, { data, children, props }) {
    data.staticClass = (`v-list__item__icon ${data.staticClass || ''}`).trim()

    if (props.left) data.staticClass += ' v-list__item__icon--left'
    if (props.right) data.staticClass += ' v-list__item__icon--right'

    return h('div', data, children)
  }
}
