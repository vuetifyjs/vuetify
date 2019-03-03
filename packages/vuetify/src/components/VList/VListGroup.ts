// Styles
import './VListGroup.sass'

// Components
import VIcon from '../VIcon'
import VList from './VList'
import VListItem from './VListItem'
import VListItemIcon from './VListItemIcon'

// Mixins
import Bootable from '../../mixins/bootable'
import Toggleable from '../../mixins/toggleable'
import { Registrable, inject as RegistrableInject } from '../../mixins/registrable'
import { Route } from 'vue-router'

// Directives
import Ripple from '../../directives/ripple'

// Transitions
import { VExpandTransition } from '../transitions'

// Utils
import mixins, { ExtractVue } from '../../util/mixins'
import { keyCodes } from '../../util/helpers'

// Types
import Vue, { VNode } from 'vue'

type VListInstance = InstanceType<typeof VList>

interface options extends Vue {
  list: VListInstance
  listClick: Function
  $refs: {
    group: HTMLElement
  }
  $route: Route
}

export default mixins<options &
/* eslint-disable indent */
  ExtractVue<[
    typeof Bootable,
    typeof Toggleable,
    Registrable<'list'>
  ]>
/* eslint-enable indent */
>(
  Bootable,
  RegistrableInject('list', 'v-list-group', 'v-list'),
  Toggleable
  /* @vue/component */
).extend({
  name: 'v-list-group',

  directives: { Ripple },

  inject: ['listClick'],

  props: {
    activeClass: {
      type: String,
      default: 'primary--text'
    },
    appendIcon: {
      type: String,
      default: '$vuetify.icons.expand'
    },
    disabled: Boolean,
    group: String,
    noAction: Boolean,
    prependIcon: String,
    ripple: {
      type: [Boolean, Object],
      default: true
    },
    subGroup: Boolean
  },

  data: () => ({
    groups: []
  }),

  computed: {
    groupClasses (): object {
      return {
        'v-list__group--active': this.isActive,
        'v-list__group--disabled': this.disabled
      }
    },
    headerClasses (): object {
      return {
        'v-list__group__header--active': this.isActive,
        'v-list__group__header--sub-group': this.subGroup
      }
    },
    itemsClasses (): object {
      return {
        'v-list__group__items--no-action': this.noAction && !this.subGroup
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

  mounted () {
    this.list.register(this)

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
    genIcon (icon: string | false): VNode {
      return this.$createElement(VIcon, icon)
    },
    genAppendIcon () {
      const icon = !this.subGroup ? this.appendIcon : false

      if (!icon && !this.$slots.appendIcon) return null

      return this.$createElement(VListItemIcon, {
        staticClass: 'v-list__group__header__append-icon'
      }, [
        this.$slots.appendIcon || this.genIcon(icon)
      ])
    },
    genGroup () {
      return this.$createElement(VListItem, {
        staticClass: 'v-list__group__header',
        class: this.headerClasses,
        directives: [{
          name: 'ripple',
          value: this.ripple
        }],
        on: {
          ...this.$listeners,
          click: this.click,
          keydown: (e: KeyboardEvent) => {
            if (e.keyCode === keyCodes.enter) this.click()
          }
        }
      }, [
        this.genPrependIcon(),
        this.$slots.activator,
        this.genAppendIcon()
      ])
    },
    genItems () {
      return this.$createElement('div', {
        staticClass: 'v-list__group__items',
        class: this.itemsClasses,
        directives: [{
          name: 'show',
          value: this.isActive
        }]
      }, this.showLazyContent(this.$slots.default))
    },
    genPrependIcon () {
      const icon = this.prependIcon
        ? this.prependIcon
        : this.subGroup
          ? '$vuetify.icons.subgroup'
          : false

      if (!icon && !this.$slots.prependIcon) return null

      return this.$createElement(VListItemIcon, {
        staticClass: 'v-list__group__header__prepend-icon',
        'class': {
          [this.activeClass]: this.isActive
        }
      }, [
        this.$slots.prependIcon || this.genIcon(icon)
      ])
    },
    toggle (uid: number) {
      this.isActive = this._uid === uid
    },
    matchRoute (to: string) {
      if (!this.group) return false
      return to.match(this.group) !== null
    }
  },

  render (h): VNode {
    return h('div', {
      staticClass: 'v-list__group',
      class: this.groupClasses
    }, [
      this.genGroup(),
      h(VExpandTransition, [this.genItems()])
    ])
  }
})
