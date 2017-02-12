import { closestParentTag } from '../../util/helpers'

export default {
  name: 'tab-item',

  data () {
    return {
      isActive: false
    }
  },

  props: {
    href: {
      type: String,
      required: true
    },

    ripple: Boolean,

    router: Boolean
  },

  computed: {
    classes () {
      return {
        'tab__item': true,
        'tab__item--active': this.isActive
      }
    },

    target () {
      return this.href.replace('#', '')
    },

    tabs () {
      return closestParentTag.call(this, 'v-tabs')
    }
  },

  methods: {
    click (e) {
      this.tabs.tabClick(this.target)
    },

    toggle (target) {
      this.isActive = this.target === target
    }
  },

  render (h) {
    const data = {
      attrs: {},
      class: this.classes,
      props: {},
      directives: [
        {
          name: 'ripple',
          value: this.ripple || false
        }
      ]
    }

    let tag

    if (this.href && this.router) {
      tag = 'router-link'
      data.props.to = this.href
      data.props.exact = this.href === '/'
      data.props.activeClass = 'tab__item--active'
      data.nativeOn = { click: this.click }
    } else {
      tag = 'a'
      data.attrs.href = this.href || 'javascript:;'
      data.on = { click: this.click }
    }

    const tab = h(tag, data, [this.$slots.default])

    return h('li', {}, [tab])
  }
}
