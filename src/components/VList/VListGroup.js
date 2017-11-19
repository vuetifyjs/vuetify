// Components
import VIcon from '../../components/VIcon'

// Mixins
import Bootable from '../../mixins/bootable'
import Toggleable from '../../mixins/toggleable'
import {
  inject as RegistrableInject
} from '../../mixins/registrable'

// Transitions
import { VExpandTransition } from '../transitions'

/**
 * List group
 *
 * @component
 */
export default {
  name: 'v-list-group',

  mixins: [
    Bootable,
    RegistrableInject('list', 'v-list-group', 'v-list'),
    Toggleable
  ],

  inject: ['listClick'],

  data: () => ({
    groups: []
  }),

  props: {
    activeClass: {
      type: String,
      default: 'primary--text'
    },
    disabled: Boolean,
    group: String,
    noAction: Boolean,
    subGroup: Boolean
  },

  computed: {
    groupClasses () {
      return {
        'list__group--active': this.isActive,
        'list__group--disabled': this.disabled
      }
    },
    headerClasses () {
      return {
        [this.activeClass]: this.isActive,
        'list__group__header--active': this.isActive,
        'list__group__header--sub-group': this.subGroup
      }
    },
    itemsClasses () {
      return {
        'list__group__items--no-action': this.noAction
      }
    }
  },

  watch: {
    isActive (val) {
      if (!this.subGroup && val) {
        this.listClick(this._uid)
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

  beforeMount () {
    this.list.register(this._uid, this.toggle)

    if (this.group &&
      this.$route &&
      this.value == null
    ) {
      this.isActive = this.matchRoute(this.$route.path)
    }
  },

  beforeDestroy () {
    this.list.unregister(this._uid)
  },

  methods: {
    click () {
      if (this.disabled) return

      this.isActive = !this.isActive
    },
    genIcon (icon) {
      return this.$createElement(VIcon, icon)
    },
    genDropdown () {
      if (this.subGroup) return null

      if (this.$slots.appendIcon) return this.$slots.appendIcon

      return this.$createElement('li', {
        staticClass: 'list__group__header__append-icon'
      }, [
        this.genIcon('keyboard_arrow_down')
      ])
    },
    genHeader () {
      return this.$createElement('ul', {
        staticClass: 'list__group__header',
        'class': this.headerClasses,
        on: Object.assign({}, {
          click: this.click
        }, this.$listeners),
        ref: 'item'
      }, [
        this.genSubGroup(),
        this.$slots.activator,
        this.genDropdown()
      ])
    },
    genItems () {
      return this.$createElement('ul', {
        staticClass: 'list__group__items',
        'class': this.itemsClasses,
        directives: [{
          name: 'show',
          value: this.isActive
        }],
        ref: 'group'
      }, this.showLazyContent(this.$slots.default))
    },
    genSubGroup () {
      if (!this.subGroup) return null

      if (this.$slots.prependIcon) return this.$slots.prependIcon

      return this.$createElement('li', {
        staticClass: 'list__group__header__prepend-icon'
      }, [
        this.genIcon('arrow_drop_down')
      ])
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
    return h('li', {
      staticClass: 'list__group',
      'class': this.groupClasses
    }, [
      this.genHeader(),
      h(VExpandTransition, [this.genItems()])
    ])
  }
}
