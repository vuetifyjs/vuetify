// Mixins
import {
  provide as RegistrableProvide
} from '../../mixins/registrable'

// Directives
import Touch from '../../directives/touch'

export default {
  name: 'v-tabs-items',

  mixins: [RegistrableProvide('tabs')],

  directives: { Touch },

  inject: {
    registerItems: {
      default: null
    },
    unregisterItems: {
      default: null
    }
  },

  data () {
    return {
      items: [],
      lazyValue: this.value,
      reverse: false
    }
  },

  props: {
    cycle: Boolean,
    touchless: Boolean,
    value: String
  },

  computed: {
    activeIndex () {
      return this.items.findIndex(item => item.id === this.lazyValue)
    },
    activeItem () {
      if (!this.items.length) return undefined

      return this.items[this.activeIndex]
    },
    inputValue: {
      get () {
        return this.lazyValue
      },
      set (val) {
        this.lazyValue = val

        !this.registerItems && this.$emit('input', val)
      }
    }
  },

  watch: {
    activeIndex (current, previous) {
      this.reverse = current < previous
      this.updateItems()
    },
    value (val) {
      this.lazyValue = val
    }
  },

  mounted () {
    this.registerItems && this.registerItems(this.changeModel)
  },

  beforeDestroy () {
    this.unregisterItems && this.unregisterItems()
  },

  methods: {
    changeModel (val) {
      this.inputValue = val
    },
    next (cycle) {
      let nextIndex = this.activeIndex + 1

      if (!this.items[nextIndex]) {
        if (!cycle) return
        nextIndex = 0
      }

      this.inputValue = items[nextIndex].id
    },
    prev (cycle) {
      let prevIndex = this.activeIndex - 1

      if (!this.items[prevIndex]) {
        if (!cycle) return
        prevIndex = this.items.length - 1
      }

      this.inputValue = this.items[prevIndex].id
    },
    onSwipe (action) {
      this[action](this.cycle)
    },
    register (options) {
      this.items.push(options)
    },
    unregister (id) {
      this.items = this.items.filter(item => item.id !== id)
    },
    updateItems () {
      this.items.forEach(({ toggle }) => {
        toggle(this.lazyValue, this.reverse, this.isBooted)
      })
      this.isBooted = true
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
