import '../../stylus/components/_subheaders.styl'

import Themeable from '../../mixins/themeable'

/* @vue/component */
export default {
  name: 'v-subheader',

  functional: true,

  mixins: [Themeable],

  props: {
    inset: Boolean
  },

  render (h, { data, children, props }) {
    data.staticClass = (`v-subheader ${data.staticClass || ''}`).trim()

    if (props.inset) data.staticClass += ' v-subheader--inset'
    if (props.light) data.staticClass += ' theme--light'
    if (props.dark) data.staticClass += ' theme--dark'

    return h('div', data, children)
  }
}
