import { closestParentTag } from '../../util/helpers'
import Eventable from '../../mixins/eventable'

export default {
  name: 'list-tile',

  data () {
    return {
      active: false,
      group: {}
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
    listUID () {
      return closestParentTag.call(this, 'v-list')
    }
  },

  methods: {
    click () {
      this.$vuetify.bus.pub('list-item:selected')
    }
  },

  render (createElement) {
    if (this.item.items) {
      return createElement('v-list-group', { 
        props: {
          item: {
            avatar: this.item.avatar,
            title: this.item.title,
            group: this.item.group
          },
          items: this.item.items,
          ripple: this.ripple,
          router: this.router
        }
      })
    }

    let el,
        list = []

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

    data.class['list__tile'] = true

    if (this.item.href && (this.router || this.item.router)) {
      el = 'router-link'
      data.props.to = this.item.href
      data.props.exact = this.item.href === '/'
      data.props.activeClass = 'list__tile--active'
      
      if (this.click) {
        data.nativeOn = { click: this.click }
      }
    } else {
      el = 'a'
      data.attrs.href = this.item.href || 'javascript:;'
      
      if (this.click) {
        data.on = { click: this.click }
      }
    }

    if (this.item.href == '#!') {
      console.log(this.item)
    }

    let children = []

    if (this.item.avatar) {
      let icon = createElement('v-icon', this.item.avatar)
      let avatar = createElement('v-list-tile-avatar', {}, [icon])

      children.push(avatar)
    }

    if (this.item.title) {
      let items = []
      items.push(createElement('v-list-tile-title', { domProps: { innerHTML: this.item.title } }))

      if (this.item.subtitle) {
        items.push(createElement('v-list-tile-sub-title', { domProps: { innerHTML: this.item.subtitle } }))
      }

      children.push(createElement('v-list-tile-content', {}, items))
    }

    if (this.item.action) {
      let data = {}

      if (typeof this.item.action === 'object') {
        data['class'] = this.item.action.class || ''
        data.domProps = {
          innerText: this.item.action.icon
        }
      } else {
        data = this.item.action
      }

      let icon = createElement('v-icon', data)
      let action = createElement('v-list-tile-action', {}, [icon])

      children.push(action)
    }

    children.push(this.$slots.default)

    list.push(createElement(el, data, children))

    return createElement('li', { 'class': { 'disabled': this.disabled || this.item.disabled } }, list)
  }
}