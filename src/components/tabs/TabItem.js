import { closestParentTag } from '../../util/helpers'
import GenerateRouteLink from '../../mixins/route-link'

export default {
  name: 'tab-item',

  mixins: [GenerateRouteLink],

  data () {
    return {
      isActive: false,
      defaultActiveClass: 'tab__item--active'
    }
  },

  props: {
    activeClass: {
      type: String,
      default: 'tab__item--active'
    }
  },

  computed: {
    classes () {
      return {
        'tab__item': true,
        'tab__item--active': !this.router && this.isActive,
        'tab__item--disabled': this.disabled
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
    }
  },

  render (h) {
    const { tag, data } = this.generateRouteLink()

    return h('li', {}, [h(tag, data, [this.$slots.default])])
  }
}
