import GenerateRouteLink from '~mixins/route-link'

export default {
  name: 'v-tabs-item',

  inject: ['slider', 'tabClick'],

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
    this.callSlider()
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
    const { tag, data } = this.generateRouteLink()

    return h('li', {
      'class': 'tabs__li'
    }, [h(tag, data, this.$slots.default)])
  }
}
