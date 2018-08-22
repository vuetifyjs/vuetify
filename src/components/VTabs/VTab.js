// Mixins
import Routable from '../../mixins/routable'
import {
  inject as RegistrableInject
} from '../../mixins/registrable'

// Utilities
import { getObjectValueByPath } from '../../util/helpers'

/* @vue/component */
export default {
  name: 'v-tab',

  mixins: [
    RegistrableInject('tabs', 'v-tab', 'v-tabs'),
    Routable
  ],

  inject: ['tabClick'],

  props: {
    activeClass: {
      type: String,
      default: 'v-tabs__item--active'
    },
    ripple: {
      type: [Boolean, Object],
      default: true
    }
  },

  data () {
    return {
      isActive: false
    }
  },

  computed: {
    classes () {
      return {
        'v-tabs__item': true,
        'v-tabs__item--disabled': this.disabled,
        [this.activeClass]: !this.to && this.isActive
      }
    },
    action () {
      let to = this.to || this.href

      if (this.$router &&
        this.to === Object(this.to)
      ) {
        const resolve = this.$router.resolve(
          this.to,
          this.$route,
          this.append
        )

        to = resolve.href
      }

      return typeof to === 'string'
        ? to.replace('#', '')
        : this
    }
  },

  watch: {
    $route: 'onRouteChange'
  },

  mounted () {
    this.tabs.register(this)
    this.onRouteChange()
  },

  beforeDestroy () {
    this.tabs.unregister(this)
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

      this.to || this.tabClick(this)
    },
    onRouteChange () {
      if (!this.to || !this.$refs.link) return

      const path = `_vnode.data.class.${this.activeClass}`

      this.$nextTick(() => {
        if (getObjectValueByPath(this.$refs.link, path)) {
          this.tabClick(this)
        }
      })
    },
    toggle (action) {
      this.isActive = (action === this) || (action === this.action)
    }
  },

  render (h) {
    const link = this.generateRouteLink()
    const { data } = link

    // If disabled, use div as anchor tags do not support
    // being disabled
    const tag = this.disabled ? 'div' : link.tag

    data.ref = 'link'

    return h('div', {
      staticClass: 'v-tabs__div'
    }, [h(tag, data, this.$slots.default)])
  }
}
