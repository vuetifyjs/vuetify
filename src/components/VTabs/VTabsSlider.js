import Colorable from '../../mixins/colorable'

export default {
  name: 'v-tabs-slider',

  mixins: [Colorable],

  render (h) {
    return h('li', {
      staticClass: 'tabs__slider',
      class: this.addBackgroundColorClassChecks({})
    })
  }
}
