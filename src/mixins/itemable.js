import { closestParentTag } from '../util/helpers'

export default {
  props: {
    item: {
      type: Object,
      default () {
        return {
          href: '#!',
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
    groupName () {
      return `${this.$options.name.replace(/([a-z]*)-[a-z]*/g, '$1')}-group`
    },

    groupUid () {
      let group = closestParentTag.call(this, `v-${this.groupName}`)

      return group ? group._uid : null
    },

    rootName () {
      return this.$options.name.replace(/([a-z]*)-[a-z]*/g, '$1')
    },

    rootId () {
      let root = closestParentTag.call(this, `v-${this.rootName}`)

      return root ? root._uid : null
    }
  },

  methods: {
    click () {
      this.$vuetify.bus.pub(`${this.groupName}:close:${this.rootId}`, this.groupUid)
      this.$vuetify.bus.pub(`${this.rootName}:item-clicked:${this.rootId}`)
    }
  },

  render (createElement) {
    let el
    let name = this.$options.name.replace(/-/g, '__')

    let data = {
      attrs: {},
      class: {},
      props: {},
      directives: [
        {
          name: 'ripple',
          value: this.ripple || false
        }
      ]
    }

    data.class[name] = true

    if (this.router || this.item.router) {
      el = 'router-link'
      data.props.to = this.item.href
      data.props.exact = this.item.href === '/'
      data.props.activeClass = `${name}--active`
      
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

    let children = []

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