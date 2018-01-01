import Colorable from '../../mixins/colorable'

export default {
  name: 'v-tabs-slider',

  mixins: [Colorable],

  data: () => ({
    defaultColor: 'accent'
  }),

  render (h) {
    return h('div', {
      staticClass: 'tabs__slider',
      class: this.addBackgroundColorClassChecks()
    })
  }
}
