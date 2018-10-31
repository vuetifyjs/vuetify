// Mixins
import { factory as GroupableFactory } from '../../mixins/groupable'
import Routable from '../../mixins/routable'
import Themeable from '../../mixins/themeable'

// Utilities
import { getObjectValueByPath } from '../../util/helpers'

/* @vue/component */
export default {
  name: 'v-tab',

  mixins: [
    Routable,
    // Must be after routable
    // to overwrite activeClass
    GroupableFactory('tabGroup'),
    Themeable
  ],

  props: {
    ripple: {
      type: [Boolean, Object],
      default: true
    }
  },

  computed: {
    classes () {
      return {
        'v-tabs__item': true,
        'v-tabs__item--disabled': this.disabled,
        ...this.groupClasses
      }
    },
    value () {
      let to = this.to || this.href || ''

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

      return to.replace('#', '')
    }
  },

  watch: {
    $route: 'onRouteChange'
  },

  mounted () {
    this.onRouteChange()
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

      this.to || this.toggle()
    },
    onRouteChange () {
      if (!this.to || !this.$refs.link) return

      const path = `_vnode.data.class.${this.activeClass}`

      this.$nextTick(() => {
        if (getObjectValueByPath(this.$refs.link, path)) {
          this.toggle()
        }
      })
    }
  },

  render (h) {
    const link = this.generateRouteLink(this.classes)
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
