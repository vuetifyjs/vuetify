import { closestParentTag } from '../util/helpers'

export default {
  data () {
    return {
      active: false
    }
  },

  props: {
    disabled: Boolean,

    item: {
      type: Object,
      default () {
        return {
          href: 'javascript:;',
          text: '',
          icon: false,
          router: false
        }
      }
    },

    ripple: Boolean,

    router: Boolean
  },

  computed: {
    classes () {
      const classes = {}
      classes[`${this.className}--active`] = this.active
      classes[`${this.className}--disabled`] = this.disabled || this.item.disabled

      return classes
    },

    groupName () {
      return `${this.$options.name.replace(/([a-z]*)-[a-z]*/g, '$1')}-group`
    },

    groupUid () {
      const group = closestParentTag.call(this, `v-${this.groupName}`)

      return group ? group._uid : null
    },

    className () {
      return this.$options.name.replace(/-/g, '__')
    },

    rootName () {
      return this.$options.name.replace(/([a-z]*)-[a-z]*/g, '$1')
    },

    rootId () {
      const root = closestParentTag.call(this, `v-${this.rootName}`)

      return root ? root._uid : null
    }
  },

  methods: {
    click () {
      //
    }
  },

  render (createElement) {
    let el

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

    data.class[this.className] = true

    if (this.router || this.item.router) {
      el = 'router-link'
      data.props.to = this.item.href
      data.props.exact = this.item.href === '/'
      data.props.activeClass = `${this.className}--active`

      if (this.click) {
        data.nativeOn = { click: this.click }
      }
    } else {
      el = 'a'
      data.attrs.href = this.item.href

      if (this.click) {
        data.on = { click: this.click }
      }
    }

    const children = []

    if (this.item.icon && typeof this.item.icon === 'string') {
      children.push(createElement('v-icon', this.item.icon))
    }

    if (this.item.text) {
      children.push(createElement('span', this.item.text))
    }

    children.push(this.$slots.default)

    return createElement('li', {}, [
      createElement(el, data, children)
    ])
  }
}
