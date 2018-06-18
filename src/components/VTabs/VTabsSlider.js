import Colorable from '../../mixins/colorable'

export default {
  name: 'v-tabs-slider',

  mixins: [Colorable],

  render (h) {
    return h('div', this.setBackground(this.color || 'accent', {
      staticClass: 'v-tabs__slider'
    }))
  }
}
