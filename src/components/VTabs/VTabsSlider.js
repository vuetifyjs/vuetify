import Colorable from '../../mixins/colorable'

/* @vue/component */
export default {
  name: 'v-tabs-slider',

  mixins: [Colorable],

  data: () => ({
    defaultColor: 'accent'
  }),

  render (h) {
    return h('div', {
      staticClass: 'v-tabs__slider',
      class: this.addBackgroundColorClassChecks()
    })
  }
}
