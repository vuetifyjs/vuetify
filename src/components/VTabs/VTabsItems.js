import Touch from '../../directives/touch'

export default {
  name: 'v-tabs-items',

  directives: { Touch },

  inject: ['next', 'prev'],

  props: {
    cycle: Boolean,
    touchless: Boolean
  },

  methods: {
    onSwipe (e, action) {
      this[action](this.cycle)
    }
  },

  render (h) {
    const data = {
      staticClass: 'tabs__items',
      directives: []
    }

    !this.touchless && data.directives.push({
      name: 'touch',
      value: {
        left: e => this.onSwipe(e, 'next'),
        right: e => this.onSwipe(e, 'prev')
      }
    })

    return h('div', data, this.$slots.default)
  }
}
