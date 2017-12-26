import Touch from '../../directives/touch'

export default {
  name: 'v-tabs-items',

  directives: { Touch },

  props: {
    cycle: Boolean,
    touchless: Boolean
  },

  methods: {
    next (cycle) {
      let nextIndex = this.activeIndex + 1

      if (!this.tabItems[nextIndex]) {
        if (!cycle) return
        nextIndex = 0
      }

      this.activeIndex = nextIndex
    },
    prev (cycle) {
      let prevIndex = this.activeIndex - 1

      if (!this.tabItems[prevIndex]) {
        if (!cycle) return
        prevIndex = this.tabItems.length - 1
      }

      this.activeIndex = prevIndex
    },
    onSwipe (action) {
      this[action](this.cycle)
    },
    updateContent () {
      this.content.forEach(({ toggle }) => {
        toggle(this.target, this.reverse, this.isBooted)
      })
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
