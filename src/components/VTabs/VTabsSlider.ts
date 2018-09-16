import Colorable from '../../mixins/colorable'

/* @vue/component */
export default {
  name: 'v-tabs-slider',

  mixins: [Colorable],

  render (h) {
    return h('div', this.setBackgroundColor(this.color || 'accent', {
      staticClass: 'v-tabs__slider'
    }))
  }
}
