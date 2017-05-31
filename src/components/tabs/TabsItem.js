import { closestParentTag } from '../../util/helpers'
import GenerateRouteLink from '../../mixins/route-link'

export default {
  name: 'tabs-item',

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
    },

    tabs () {
      return closestParentTag.call(this, 'v-tabs')
    }
  },

  methods: {
    click (e) {
      e.preventDefault()

      this.tabs.tabClick(this.action)
    },

    toggle (action) {
      this.isActive = this.action === action
      this.$nextTick(() => {
        this.isActive && this.tabs.slider(this.$el)
      })
    }
  },

  render (h) {
    const { tag, data } = this.generateRouteLink()

    return h('li', {}, [h(tag, data, [this.$slots.default])])
  }
}
