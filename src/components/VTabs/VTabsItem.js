import GenerateRouteLink from '../../mixins/route-link'

export default {
  name: 'v-tabs-item',

  inject: ['slider', 'tabClick', 'registerTabItem', 'unregisterTabItem'],

  mixins: [GenerateRouteLink],

  data () {
    return {
      isActive: false
    }
  },

  props: {
    activeClass: {
      type: String,
      default: 'tabs__item--active'
    }
  },

  computed: {
    classes () {
      const classes = {
        'tabs__item': true,
        'tabs__item--disabled': this.disabled
      }

      classes[this.activeClass] = !this.to && this.isActive

      return classes
    },
    action () {
      const to = this.to || this.href

      if (!to || to === Object(to)) return this._uid

      return to.replace('#', '')
    }
  },

  watch: {
    $route () {
      this.to && this.callSlider()
    }
  },

  mounted () {
    this.registerTabItem(this.action, this.toggle, this.$el)
    this.callSlider()
  },

  beforeDestroy () {
    this.unregisterTabItem(this.action)
  },

  methods: {
    callSlider () {
      setTimeout(() => {
        this.$el.firstChild.classList.contains('tabs__item--active') &&
        this.slider(this.$el)
      }, 0)
    },
    click (e) {
      e.preventDefault()

      if (!this.to && !this.href) return

      if (!this.to) {
        this.tabClick(this.action)
      }

      this.callSlider()
    },

    toggle (action) {
      this.isActive = this.action === action

      this.$nextTick(() => {
        this.isActive && this.slider(this.$el)
      })
    }
  },

  render (h) {
    const link = this.generateRouteLink()
    const { data } = link

    // If disabled, use div as anchor tags do not support
    // being disabled
    const tag = this.disabled ? 'div' : link.tag

    return h('li', {
      'class': 'tabs__li'
    }, [h(tag, data, this.$slots.default)])
  }
}
