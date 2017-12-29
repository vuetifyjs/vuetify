// Mixins
import Routable from '../../mixins/routable'
import {
  inject as RegistrableInject
} from '../../mixins/registrable'

export default {
  name: 'v-tab',

  mixins: [
    RegistrableInject('tabs', 'v-tab', 'v-tabs'),
    Routable
  ],

  inject: ['tabClick'],

  data () {
    return {
      isActive: false
    }
  },

  props: {
    activeClass: {
      type: String,
      default: 'tabs__item--active'
    },
    ripple: {
      type: [Boolean, Object],
      default: true
    }
  },

  computed: {
    classes () {
      return {
        'tabs__item': true,
        'tabs__item--disabled': this.disabled,
        [this.activeClass]: !this.to && this.isActive
      }
    },
    action () {
      const to = this.to || this.href

      if (!to || to === Object(to)) return this._uid

      return to.replace('#', '')
    }
  },

  watch: {
    $route: 'onRouteChange'
  },

  mounted () {
    this.tabs.register({
      id: this.action,
      toggle: this.toggle,
      el: this.$el
    })
  },

  beforeDestroy () {
    this.tabs.unregister(this.action)
  },

  methods: {
    click (e) {
      // If user provides an
      // actual link, do not
      // prevent default
      if (this.href &&
        this.href.indexOf('#') > -1
      ) e.preventDefault()

      this.$emit('click', e)

      if (!this.to && !this.href) return
      if (!this.to) this.tabClick(this.action)
    },
    onRouteChange () {
      if (!this.to) return

      this.$nextTick(() => {
        if (this.$el.firstChild.className.indexOf('tabs__item--active') > -1) {
          this.tabClick(this.action)
        }
      })
    },
    toggle (action) {
      this.isActive = this.action === action
    }
  },

  render (h) {
    const link = this.generateRouteLink()
    const { data } = link

    // If disabled, use div as anchor tags do not support
    // being disabled
    const tag = this.disabled ? 'div' : link.tag

    return h('div', {
      staticClass: 'tabs__div'
    }, [h(tag, data, this.$slots.default)])
  }
}
