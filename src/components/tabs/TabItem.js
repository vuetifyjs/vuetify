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

    ripple: Boolean
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
      domProps: {
        href: 'javascript:;'
      },
      on: {
        click: this.click
      },
      directives: [
        {
          name: 'ripple',
          value: this.ripple || false
        },
        {
          name: 'click-outside'
        }
      ]
    }

    const tab = h('a', data, [this.$slots.default])

    return h('li', {}, [tab])
  }
}
