require('../../stylus/components/_subheaders.styl')

import Themeable from '../../mixins/themeable'

export default {
  name: 'v-subheader',

  functional: true,

  mixins: [Themeable],

  props: {
    inset: Boolean
  },

  render (h, { data, children, props }) {
    data.staticClass = (`subheader ${data.staticClass || ''}`).trim()

    if (props.inset) data.staticClass += ' subheader--inset'
    if (props.light) data.staticClass += ' theme--light'
    if (props.dark) data.staticClass += ' theme--dark'

    return h('li', data, children)
  }
}
