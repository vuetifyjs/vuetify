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
    avatar: Boolean,

    disabled: Boolean,

    item: {
      type: Object,
      default () {
        return {
          action: false,
          avatar: false,
          disabled: false,
          href: 'javascript:;',
          ripple: false,
          router: false,
          subtitle: false,
          title: false
        }
      }
    },

    ripple: Boolean,

    router: Boolean
  },

  computed: {
    classes () {
      return {
        'list__tile': true,
        'list__tile--avatar': this.avatar || this.item.avatar,
        'list__tile--disabled': this.disabled || this.item.disabled
      }
    },

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
            action: this.item.action,
            title: this.item.title,
            group: this.item.group
          },
          items: this.item.items,
          ripple: this.ripple,
          router: this.router
        }
      })
    }

    let el

    let data = {
      attrs: {},
      class: this.classes,
      props: {},
      directives: [
        {
          name: 'ripple',
          value: (this.ripple || this.item.ripple) || false
        }
      ]
    }

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

    let children = []

    if (this.item.avatar) {
      let avatar = []
      if (this.item.avatar.indexOf('.') !== -1) {
        avatar.push(
          createElement('img', { domProps: { src: this.item.avatar } })
        )
      } else {
        avatar.push(
          createElement('v-icon', this.item.avatar)
        )
      }

      children.push(createElement('v-list-tile-avatar', {}, avatar))
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
      let actions = []
      let actionText = false

      if (typeof this.item.action === 'object') {
        data['class'] = this.item.action.class || ''
        data.domProps = {
          innerText: this.item.action.icon
        }

        if (this.item.action.text) {
          actionText = createElement('v-list-tile-action-text', this.item.action.text)
        }
      } else {
        data = this.item.action
      }

      actions.push(createElement('v-icon', data))

      if (actionText) {
        actions.push(actionText)
      }

      let action = createElement('v-list-tile-action', {}, actions)

      if ((this.router || this.item.router) && !this.avatar) {
        children.splice(-1, 0, action)
      } else {
        children.push(action)
      }
    }

    children.push(this.$slots.default)

    return createElement(el, data, children)
  }
}