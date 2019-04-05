// Components
import VIcon from '../VIcon'
import VList from './VList'

// Mixins
import Bootable from '../../mixins/bootable'
import Toggleable from '../../mixins/toggleable'
import { Registrable, inject as RegistrableInject } from '../../mixins/registrable'
import { Route } from 'vue-router'

// Transitions
import { VExpandTransition } from '../transitions'

// Utils
import mixins, { ExtractVue } from '../../util/mixins'

// Types
import Vue, { VNode } from 'vue'

type VListInstance = InstanceType<typeof VList>

interface options extends Vue {
  list: VListInstance
  listClick: Function
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
        'v-list__group__items--no-action': this.noAction
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
    click (e: Event) {
      if (this.disabled) return

      this.$emit('click', e)

      this.isActive = !this.isActive
    },
    genIcon (icon: string | false): VNode {
      return this.$createElement(VIcon, icon)
    },
    genAppendIcon () {
      const icon = !this.subGroup ? this.appendIcon : false

      if (!icon && !this.$slots.appendIcon) return null

      return this.$createElement('div', {
        staticClass: 'v-list__group__header__append-icon'
      }, [
        this.$slots.appendIcon || this.genIcon(icon)
      ])
    },
    genGroup () {
      return this.$createElement('div', {
        staticClass: 'v-list__group__header',
        class: this.headerClasses,
        on: {
          ...this.$listeners,
          click: this.click
        },
        ref: 'item'
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
        }],
        ref: 'group'
      }, this.showLazyContent(this.$slots.default))
    },
    genPrependIcon () {
      const icon = this.prependIcon
        ? this.prependIcon
        : this.subGroup
          ? '$vuetify.icons.subgroup'
          : false

      if (!icon && !this.$slots.prependIcon) return null

      return this.$createElement('div', {
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
