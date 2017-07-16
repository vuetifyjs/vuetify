import Themeable from '~mixins/themeable'

export default {
  functional: true,

  mixins: [Themeable],

  render (h, { data, props, children }) {
    data.staticClass = (`toolbar__side-icon ${data.staticClass || ''}`).trim()
    data.props = Object.assign({
      icon: true
    }, props)

    return h('v-btn', data, [h('v-icon', 'menu')])
  }
}
