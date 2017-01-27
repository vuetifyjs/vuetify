import { closestParentTag } from '../../util/helpers'

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
          tag: false,
          title: false
        }
      }
    },

    ripple: Boolean,

    router: Boolean,

    tag: String,

    unshift: Boolean
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
      // this.$vuetify.bus.pub('list-item:selected')
    },

    createAvatar (h) {
      const avatar = []
      if (this.item.avatar.indexOf('.') !== -1) {
        avatar.push(
          h('img', { domProps: { src: this.item.avatar }})
        )
      } else {
        avatar.push(
          h('v-icon', this.item.avatar)
        )
      }

      return h('v-list-tile-avatar', {}, avatar)
    },

    createAction (h) {
      const actions = []
      let data = {}
      let actionText = false

      if (typeof this.item.action === 'object') {
        data['class'] = this.item.action.class || ''
        data.domProps = {
          innerText: this.item.action.icon
        }

        if (this.item.action.text) {
          actionText = h('v-list-tile-action-text', this.item.action.text)
        }
      } else {
        data = this.item.action
      }

      actions.push(h('v-icon', data))

      if (actionText) {
        actions.push(actionText)
      }

      return h('v-list-tile-action', {}, actions)
    },

    createContent (h) {
      const items = []

      items.push(h('v-list-tile-title', { domProps: { innerHTML: this.item.title }}))

      if (this.item.subtitle) {
        items.push(h('v-list-tile-sub-title', { domProps: { innerHTML: this.item.subtitle }}))
      }

      return h('v-list-tile-content', {}, items)
    },

    createGroup (h) {
      return h('v-list-group', {
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
  },

  render (createElement) {
    if (this.item.items) {
      return this.createGroup(createElement)
    }

    const children = []
    let avatar
    let action
    let content
    let tag

    if (this.item.avatar) {
      avatar = this.createAvatar(createElement)
    }

    if (this.item.title) {
      content = this.createContent(createElement)
    }

    if (this.item.action) {
      action = this.createAction(createElement)
    }

    const data = {
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

    if (this.item.tag || this.tag) {
      tag = this.item.tag || this.tag
    } else if (this.item.href && (this.router || this.item.router)) {
      tag = 'router-link'
      data.props.to = this.item.href
      data.props.exact = this.item.href === '/'
      data.props.activeClass = 'list__tile--active'

      if (this.click) {
        data.nativeOn = { click: this.click }
      }
    } else {
      tag = 'a'
      data.attrs.href = this.item.href || 'javascript:;'

      if (this.click) {
        data.on = { click: this.click }
      }
    }

    children.push(avatar)
    children.push(content)

    if (this.unshift || (this.item.action && this.item.action.unshift)) {
      children.unshift(action)
    } else {
      children.push(action)
    }

    children.push(this.$slots.default)

    return createElement(tag, data, children)
  }
}
