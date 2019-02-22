// Mixins
import { factory as GroupableFactory } from '../../mixins/groupable'
import Routable from '../../mixins/routable'
import Themeable from '../../mixins/themeable'

// Utilities
import { getObjectValueByPath } from '../../util/helpers'
import mixins from '../../util/mixins'

// Types
import { VNode } from 'vue/types'

export default mixins(
  Routable,
  // Must be after routable
  // to overwrite activeClass
  GroupableFactory('tabsBar'),
  Themeable
  /* @vue/component */
).extend({
  name: 'v-tab',

  props: {
    ripple: {
      type: [Boolean, Object],
      default: true
    }
  },

  computed: {
    classes (): object {
      return {
        'v-tabs__item': true,
        'v-tabs__item--disabled': this.disabled,
        ...this.groupClasses
      }
    },
    styles () {
      return {}
    },
    value (): any {
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

  methods: {
    click (e: Event): void {
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

  render (h): VNode {
    const { tag, data } = this.generateRouteLink(this.classes, this.styles)

    data.attrs = {
      ...data.attrs,
      'aria-selected': String(this.isActive),
      role: 'tab',
      tabindex: 0
    }
    data.on = {
      ...data.on,
      keydown: (e: KeyboardEvent) => {
        if (e.keyCode === 13) this.click(e)

        this.$emit('keydown', e)
      }
    }
    data.ref = 'link'

    return h(tag, data, this.$slots.default)
  }
})
