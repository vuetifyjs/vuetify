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
    swipeLeft () {
      this.next(this.cycle)
    },
    swipeRight () {
      this.prev(this.cycle)
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
        left: this.swipeLeft,
        right: this.swipeRight
      }
    })

    return h('div', data, this.$slots.default)
  }
}
