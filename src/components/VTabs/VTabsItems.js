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
    onSwipe (action) {
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
        left: () => this.onSwipe('next'),
        right: () => this.onSwipe('prev')
      }
    })

    return h('div', data, this.$slots.default)
  }
}
