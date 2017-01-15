import { closestParentTag } from '../../util/helpers'
import Eventable from '../../mixins/eventable'

export default {
  mixins: [Eventable],

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
    classes () {
      let classes = {}
      classes['list__tile--active'] = this.group ? this.active : false
      
      return classes
    },

    events () {
      return [
        [`list-tile:click:${this.list._uid}`, this.toggle],
        [`list-tile-group:click:${this.list._uid}`, this.close]
      ]
    },

    list () {
      return closestParentTag.call(this, 'v-list')
    }
  },

  methods: {
    click () {
      if (this.group) {
        this.$vuetify.bus.pub(`list-tile-group:toggle:${this.list._uid}`, this.group._uid)

        return this.toggle(this._uid)
      }

      if (this.parent) {
        this.$vuetify.bus.pub(`list-tile-group:open:${this.list._uid}`, this.parent._uid)
        this.$vuetify.bus.pub(`list-tile:selected:${this.list._uid}`)

        return this.open()
      }

      this.$vuetify.bus.pub(`list-tile-group:open:${this.list._uid}`, null)
      this.$vuetify.bus.pub(`list-tile:click:${this.list._uid}`, this._uid)
      this.$vuetify.bus.pub(`list-tile:selected:${this.list._uid}`)
    },

    open () {
      this.active = true
    },

    close (uid) {
      this.active = this._uid === uid
    },

    toggle (uid) {
      if (this._uid !== uid) {
        return this.active = false
      }

      this.active = !this.active
    }
  },

  mounted () {
    this.group = this.$children.find(i => i.$options._componentTag === 'v-list-group')
    this.parent = closestParentTag.call(this, 'v-list-group')

    if (this.group) {
      if (this.$el.querySelector('.list__tile--active')) {
        this.click()
      }

      this.$vuetify.bus.sub(`list-tile-group:closed:${this.group._uid}`, this.close)
    }
  },

  beforeDestroy () {
    if (this.group) {
      this.$vuetify.bus.unsub(`list-tile-group:closed:${this.group._uid}`, this.close)
    }
  },

  render (createElement) {
    let el,
        list = []

    let data = {
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

    let children = []

    if (this.item.avatar && typeof this.item.avatar === 'string') {
      let icon = createElement('v-icon', this.item.avatar)
      let avatar = createElement('v-list-tile-avatar', {}, [icon])

      children.push(avatar)
    }

    if (this.item.title) {
      let title = createElement('v-list-tile-title', { domProps: { innerHTML: this.item.title } })
      let content = createElement('v-list-tile-content', {}, [title])
      children.push(content)
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

    if (this.item.items) {
      let icon = createElement('v-icon', 'keyboard_arrow_down')
      children.push(createElement('v-list-tile-action', {}, [icon]))

      data.class['list__tile--toggle'] = true
    }

    children.push(this.$slots.default)

    list.push(createElement(el, data, children))

    if (this.item.items) {
      list.push(createElement('v-list-group', { 
        props: { 
          items: this.item.items,
          ripple: this.ripple,
          router: this.router
        }
      }))
    }

    return createElement('li', { 'class': { 'disabled': this.disabled || this.item.disabled } }, list)
  }
}