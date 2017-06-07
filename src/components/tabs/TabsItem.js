import GenerateRouteLink from '../../mixins/route-link'

export default {
  name: 'tabs-item',

  inject: ['slider', 'tabClick'],

  mixins: [GenerateRouteLink],

  data () {
    return {
      isActive: false,
      defaultActiveClass: 'tabs__item--active'
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
      return {
        'tabs__item': true,
        'tabs__item--active': !this.router && this.isActive,
        'tabs__item--disabled': this.disabled
      }
    },
    action () {
      const to = this.to || this.href

      if (to === Object(to)) return this._uid

      return to.replace('#', '')
    }
  },

  watch: {
    '$route' () {
      this.router && this.callSlider()
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

      !this.router &&
        this.tabClick(this.action) ||
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
    }, [h(tag, data, [this.$slots.default])])
  }
}
