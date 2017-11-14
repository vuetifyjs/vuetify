import { VExpandTransition } from '../transitions'

import Bootable from '../../mixins/bootable'
import Toggleable from '../../mixins/toggleable'

export default {
  name: 'v-list-group',

  inject: ['listClick', 'listClose'],

  mixins: [Bootable, Toggleable],

  props: {
    group: String,
    noAction: Boolean
  },

  computed: {
    classes () {
      return {
        'list--group__header': true,
        'list--group__header--active': this.isActive,
        'list--group__header--no-action': this.noAction
      }
    }
  },

  watch: {
    isActive () {
      this.isBooted = true

      if (!this.isActive) {
        this.listClose(this._uid)
      }
    },
    $route (to) {
      const isActive = this.matchRoute(to.path)

      if (this.group) {
        if (isActive && this.isActive !== isActive) {
          this.listClick(this._uid)
        }
        this.isActive = isActive
      }
    }
  },

  mounted () {
    this.isBooted = this.isActive

    if (this.group) {
      this.isActive = this.matchRoute(this.$route.path)
    }

    if (this.isActive) {
      this.listClick(this._uid)
    }
  },

  methods: {
    click () {
      if (!this.$refs.item.querySelector('.list__tile--disabled')) {
        requestAnimationFrame(() => this.listClick(this._uid))
      }
    },
    toggle (uid) {
      this.isActive = this._uid === uid
    },
    matchRoute (to) {
      if (!this.group) return false
      return to.match(this.group) !== null
    }
  },

  render (h) {
    const group = h('ul', {
      'class': 'list list--group',
      directives: [{
        name: 'show',
        value: this.isActive
      }],
      ref: 'group'
    }, this.showLazyContent(this.$slots.default))

    const item = h('div', {
      'class': this.classes,
      on: Object.assign({}, { click: this.click }, this.$listeners),
      ref: 'item'
    }, [this.$slots.item])

    const transition = h(VExpandTransition, [group])

    return h('div', { 'class': 'list--group__container' }, [item, transition])
  }
}
